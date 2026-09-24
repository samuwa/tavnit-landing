import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { LITE_LIMITS, LITE_TOOLS, isLiteToolId } from "@/lib/lite/tools";
import { LiteApiError, liteApiConfigured, resolveSingleId, runSplit } from "@/lib/lite/api";
import { clientIp, getOrCreateSessionId, hashIp } from "@/lib/lite/session";
import { finalizeReservation, quotaSnapshot, releaseReservation, reserve, storeConfigured } from "@/lib/lite/store";
import { LiteValidationError, precheckUpload, validateUpload } from "@/lib/lite/validate";
import { isHumanSession, markHumanSession, verifyTurnstile } from "@/lib/lite/turnstile";

/**
 * Starts a split: one bundle (a scan with several documents) through the
 * tool's Splitter. Same defences and the same quota as a run: a bundle is
 * one document of the visitor's daily allowance, whatever its page count
 * (up to the tool's own limit).
 */

export const runtime = "nodejs";

const ERR = (code: string, status: number) => NextResponse.json({ error: code }, { status });

function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

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
    return NextResponse.json({ ok: true, splitId: null });
  }

  const toolId = form.get("tool");
  if (!isLiteToolId(toolId)) return ERR("bad_request", 400);
  const tool = LITE_TOOLS[toolId];
  if (tool.kind !== "split" || !tool.split) return ERR("bad_request", 400);
  const locale = form.get("locale") === "en" ? "en" : "es";
  const splitterId = resolveSingleId(tool.split.splitter);
  if (!splitterId) return ERR("unavailable", 503);
  const isSample = form.get("sample") === "1";

  let bytes: Uint8Array;
  let rawName: string | null = null;
  if (isSample) {
    const samplePath = tool.samplePaths?.[0];
    if (!samplePath) return ERR("bad_request", 400);
    try {
      bytes = new Uint8Array(await readFile(path.join(process.cwd(), "public", samplePath)));
      rawName = path.basename(samplePath);
    } catch {
      return ERR("unavailable", 503);
    }
  } else {
    const file = form.get("file");
    if (!(file instanceof Blob)) return ERR("bad_request", 400);
    bytes = new Uint8Array(await file.arrayBuffer());
    rawName = file instanceof File ? file.name : null;
  }

  try {
    precheckUpload(bytes);
  } catch (e) {
    if (e instanceof LiteValidationError) return ERR(e.code, 400);
    return ERR("unreadable", 400);
  }

  const ip = clientIp(request);
  const ipHash = hashIp(ip);
  const sessionId = await getOrCreateSessionId();
  const token = form.get("cf-turnstile-response");
  if (!(await isHumanSession(sessionId))) {
    if (!(await verifyTurnstile(typeof token === "string" ? token : null, ip))) return ERR("captcha", 400);
    await markHumanSession(sessionId);
  }

  let validated;
  try {
    validated = await validateUpload(bytes, rawName, { maxPages: tool.maxPages ?? LITE_LIMITS.maxPagesSplit });
  } catch (e) {
    if (e instanceof LiteValidationError) return ERR(e.code, 400);
    return ERR("unreadable", 400);
  }

  let reservation;
  try {
    reservation = await reserve({
      session_id: sessionId,
      ip_hash: ipHash,
      tool: tool.id,
      locale,
      kind: "split",
      filename: validated.filename,
      byte_size: validated.bytes.length,
      pages: validated.pages,
      is_sample: isSample,
    });
  } catch {
    return ERR("unavailable", 503);
  }
  if (!reservation.ok) return ERR(reservation.code, reservation.code === "quota" ? 429 : 503);

  let splitId: string;
  try {
    ({ splitId } = await runSplit({ splitterId, bytes: validated.bytes, filename: validated.filename, contentType: validated.contentType }));
  } catch (e) {
    await releaseReservation(reservation.id);
    const status = e instanceof LiteApiError ? e.status : 502;
    return ERR(status === 503 ? "unavailable" : "backend", status);
  }

  try {
    await finalizeReservation(reservation.id, splitId);
  } catch {
    return ERR("unavailable", 503);
  }

  let remaining: number | null = null;
  try {
    const q = await quotaSnapshot(sessionId, ipHash);
    remaining = Math.max(q.limitPerDay - Math.max(q.session, q.ip), 0);
  } catch {
    remaining = null;
  }
  return NextResponse.json({ ok: true, splitId, pages: validated.pages, remaining });
}
