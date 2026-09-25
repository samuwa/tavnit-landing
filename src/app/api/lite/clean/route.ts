import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { LITE_LIMITS, LITE_TOOLS, isLiteToolId } from "@/lib/lite/tools";
import { LiteApiError, liteApiConfigured, resolveSingleId, runSweep } from "@/lib/lite/api";
import { clientIp, getOrCreateSessionId, hashIp } from "@/lib/lite/session";
import { finalizeReservation, releaseReservation, reserve, setRunMeta, storeConfigured } from "@/lib/lite/store";
import { isHumanSession, markHumanSession, verifyTurnstile } from "@/lib/lite/turnstile";
import { SheetError, readSheet, sniffSheet } from "@/lib/lite/sheet";
import { CLEAN_SLOTS, isDateOutput, isNumberOutput } from "@/lib/lite/clean";
import { CleanPrepError, prepareSweep } from "@/lib/lite/clean-server";
import { safeFilename } from "@/lib/lite/validate";
import { sameOrigin } from "@/lib/lite/origin";

/**
 * Runs a spreadsheet tool: the visitor's file, the columns they picked and
 * the formats, through the tool's fixed Cleaner.
 *
 * multipart/form-data: tool, locale, file (or sample=1), columns (JSON array
 * of header names, 1..10), input (comma|dot, or dmy|mdy), output (the
 * Cleaner variant), cf-turnstile-response, website (honeypot).
 *
 * Same defences as the document tools, in the same order: same origin →
 * honeypot → tool → size and file type from the bytes → Turnstile → full
 * read → quota reserved atomically (kind "sweep", one file = one unit) →
 * the Cleaner, with only the picked columns → reservation bound to the
 * sweep id, or released → the file's layout stored for the rebuild.
 */

export const runtime = "nodejs";

const ERR = (code: string, status: number) => NextResponse.json({ error: code }, { status });

export async function POST(request: Request) {
  if (!sameOrigin(request)) return ERR("forbidden", 403);
  if (!liteApiConfigured() || !storeConfigured()) return ERR("unavailable", 503);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return ERR("bad_request", 400);
  }
  if (typeof form.get("website") === "string" && (form.get("website") as string).trim() !== "") {
    return NextResponse.json({ ok: true, sweepId: null });
  }

  const toolId = form.get("tool");
  if (!isLiteToolId(toolId)) return ERR("bad_request", 400);
  const tool = LITE_TOOLS[toolId];
  if (tool.kind !== "clean" || !tool.clean) return ERR("bad_request", 400);
  const mode = tool.clean.mode;
  const locale = form.get("locale") === "en" ? "en" : "es";

  const inputRaw = form.get("input");
  const input = mode === "number" ? (inputRaw === "dot" ? "dot" : inputRaw === "comma" ? "comma" : null) : inputRaw === "mdy" ? "mdy" : inputRaw === "dmy" ? "dmy" : null;
  const output = form.get("output");
  if (!input || !(mode === "number" ? isNumberOutput(output) : isDateOutput(output))) return ERR("bad_request", 400);
  const cleanerId = resolveSingleId(tool.clean.cleaners[output as string]);
  if (!cleanerId) return ERR("unavailable", 503);

  let columns: string[];
  try {
    const parsed = JSON.parse(String(form.get("columns") ?? "[]")) as unknown;
    columns = Array.isArray(parsed) ? parsed.filter((c): c is string => typeof c === "string" && c.length <= 200) : [];
  } catch {
    return ERR("bad_request", 400);
  }
  if (!columns.length) return ERR("no_columns", 400);
  if (columns.length > CLEAN_SLOTS) return ERR("too_many_columns", 400);

  // ---- file: cheap checks before the captcha, the full read after ---------
  const isSample = form.get("sample") === "1";
  let bytes: Uint8Array;
  let rawName: string;
  if (isSample) {
    if (!tool.samplePaths?.[0]) return ERR("bad_request", 400);
    try {
      bytes = new Uint8Array(await readFile(path.join(process.cwd(), "public", tool.samplePaths[0])));
      rawName = path.basename(tool.samplePaths[0]);
    } catch {
      return ERR("unavailable", 503);
    }
  } else {
    const file = form.get("file");
    if (!(file instanceof Blob)) return ERR("bad_request", 400);
    if (file.size === 0) return ERR("empty", 400);
    if (file.size > LITE_LIMITS.maxBytes) return ERR("too_large", 400);
    bytes = new Uint8Array(await file.arrayBuffer());
    rawName = file instanceof File ? file.name : "file.csv";
  }
  let format;
  try {
    format = sniffSheet(bytes);
  } catch (e) {
    return ERR(e instanceof SheetError ? e.code : "unsupported", 400);
  }

  const ip = clientIp(request);
  const ipHash = hashIp(ip);
  const sessionId = await getOrCreateSessionId();
  const token = form.get("cf-turnstile-response");
  if (!(await isHumanSession(sessionId))) {
    if (!(await verifyTurnstile(typeof token === "string" ? token : null, ip))) return ERR("captcha", 400);
    await markHumanSession(sessionId);
  }

  let sheet;
  try {
    sheet = readSheet(bytes);
  } catch (e) {
    return ERR(e instanceof SheetError ? e.code : "unreadable", 400);
  }
  let prepared;
  try {
    prepared = prepareSweep(sheet, mode, columns, input, output as string);
  } catch (e) {
    return ERR(e instanceof CleanPrepError ? e.code : "bad_request", 400);
  }
  const ext = format === "xlsx" ? ".xlsx" : ".csv";
  const filename = safeFilename(rawName, "pdf").replace(/\.pdf$/, ext);

  // ---- quota ----------------------------------------------------------------
  let reservation;
  try {
    reservation = await reserve({
      session_id: sessionId,
      ip_hash: ipHash,
      tool: tool.id,
      locale,
      kind: "sweep",
      filename,
      byte_size: bytes.length,
      pages: null,
      is_sample: isSample,
    });
  } catch {
    return ERR("unavailable", 503);
  }
  if (!reservation.ok) return ERR(reservation.code, reservation.code === "quota" ? 429 : 503);

  // ---- the Cleaner ------------------------------------------------------------
  let sweepId: string;
  try {
    ({ sweepId } = await runSweep({ cleanerId, csv: prepared.csv, filename: "lite.csv" }));
  } catch (e) {
    await releaseReservation(reservation.id);
    const status = e instanceof LiteApiError ? e.status : 502;
    return ERR(status === 503 ? "unavailable" : "backend", status);
  }
  try {
    await finalizeReservation(reservation.id, sweepId);
    await setRunMeta(sweepId, prepared.meta, sheet.rows.length);
  } catch {
    return ERR("unavailable", 503);
  }

  return NextResponse.json({ ok: true, sweepId, rows: sheet.rows.length, file: filename });
}
