import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { LITE_TOOLS, isLiteToolId } from "@/lib/lite/tools";
import { LiteApiError, liteApiConfigured, resolveId, submitRun } from "@/lib/lite/api";
import { clientIp, getOrCreateSessionId, hashIp } from "@/lib/lite/session";
import { finalizeReservation, quotaSnapshot, releaseReservation, reserve, storeConfigured } from "@/lib/lite/store";
import { LiteValidationError, precheckUpload, validateUpload } from "@/lib/lite/validate";
import { isHumanSession, markHumanSession, verifyTurnstile } from "@/lib/lite/turnstile";

/**
 * Starts a free-tool run.
 *
 * multipart/form-data:
 *   tool      — a LiteToolId
 *   locale    — "en" | "es" (only stored, for the lead record)
 *   file      — the document (omit when sample is set)
 *   sample    — "1" (or a slot index, "0".."n") to run a bundled sample
 *               instead of an upload
 *   slot      — compare tools: which document this is (0 = the reference)
 *   cf-turnstile-response — Turnstile token (when the widget is configured)
 *   website   — honeypot; real users never see it
 *
 * Defence in depth, in order: same-origin check → honeypot → tool + config
 * → size and magic bytes → Turnstile → full parse (page count) → quota
 * reserved atomically (per session, per IP, global) → submit with the Lite
 * org's key → reservation bound to the run id, or released on failure.
 * Error codes are stable strings the client maps to copy.
 */

export const runtime = "nodejs";

const ERR = (code: string, status: number) => NextResponse.json({ error: code }, { status });

function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true; // non-browser or same-origin without Origin (older UAs)
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
    // Honeypot filled: pretend it worked, give nothing.
    return NextResponse.json({ ok: true, runId: null });
  }

  const toolId = form.get("tool");
  if (!isLiteToolId(toolId)) return ERR("bad_request", 400);
  const tool = LITE_TOOLS[toolId];
  const localeRaw = form.get("locale");
  const locale = localeRaw === "en" ? "en" : "es";
  if (tool.kind === "split") return ERR("bad_request", 400);
  const flowId = resolveId(tool.flow, locale);
  if (!flowId) return ERR("unavailable", 503);
  const sampleRaw = form.get("sample");
  const slotRaw = form.get("slot");
  const slot = typeof slotRaw === "string" && /^\d{1,2}$/.test(slotRaw) ? Number(slotRaw) : 0;
  const isSample = typeof sampleRaw === "string" && sampleRaw !== "" && sampleRaw !== "0" ? true : sampleRaw === "0";
  // "1" on a single-document tool means its one sample; on a compare tool the
  // sample for this slot.
  const sampleIndex = typeof sampleRaw === "string" && /^\d{1,2}$/.test(sampleRaw) && tool.kind === "compare" ? Number(sampleRaw) : slot;

  // ---- file -------------------------------------------------------------
  let bytes: Uint8Array;
  let rawName: string | null = null;
  if (isSample) {
    const samplePath = tool.samplePaths?.[tool.kind === "compare" ? sampleIndex : 0];
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

  // Cheap checks first; the PDF parse waits until the request is human.
  try {
    precheckUpload(bytes);
  } catch (e) {
    if (e instanceof LiteValidationError) return ERR(e.code, 400);
    return ERR("unreadable", 400);
  }

  // ---- who ----------------------------------------------------------------
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
    validated = await validateUpload(bytes, rawName, { maxPages: tool.maxPages });
  } catch (e) {
    if (e instanceof LiteValidationError) return ERR(e.code, 400);
    return ERR("unreadable", 400);
  }

  // ---- quota: claimed before the backend sees anything ---------------------
  let reservation;
  try {
    reservation = await reserve({
      session_id: sessionId,
      ip_hash: ipHash,
      tool: tool.id,
      locale,
      kind: "run",
      filename: validated.filename,
      byte_size: validated.bytes.length,
      pages: validated.pages,
      is_sample: isSample,
    });
  } catch {
    return ERR("unavailable", 503);
  }
  if (!reservation.ok) return ERR(reservation.code, reservation.code === "quota" ? 429 : 503);

  // ---- go -------------------------------------------------------------------
  let runId: string;
  try {
    ({ runId } = await submitRun({
      bytes: validated.bytes,
      filename: validated.filename,
      contentType: validated.contentType,
      flowId,
    }));
  } catch (e) {
    await releaseReservation(reservation.id);
    const status = e instanceof LiteApiError ? e.status : 502;
    return ERR(status === 503 ? "unavailable" : "backend", status);
  }

  try {
    await finalizeReservation(reservation.id, runId);
  } catch {
    // The run exists in the backend but the ownership row could not be bound
    // to it: the browser could never read the result, so report the error now
    // instead of letting the visitor poll into a 404.
    return ERR("unavailable", 503);
  }

  // For the "N left today" line only; the limit itself was enforced above.
  let remaining: number | null = null;
  try {
    const q = await quotaSnapshot(sessionId, ipHash);
    remaining = Math.max(q.limitPerDay - Math.max(q.session, q.ip), 0);
  } catch {
    remaining = null;
  }

  return NextResponse.json({ ok: true, runId, pages: validated.pages, remaining });
}
