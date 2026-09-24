import { NextResponse } from "next/server";
import { LiteApiError, fetchRun, liteApiConfigured, resolveId, runMatcher } from "@/lib/lite/api";
import { clientIp, getSessionId, hashIp } from "@/lib/lite/session";
import { finalizeReservation, getRunForSession, releaseReservation, reserve, storeConfigured } from "@/lib/lite/store";
import { isHumanSession, turnstileConfigured } from "@/lib/lite/turnstile";
import { LITE_TOOLS, isLiteToolId } from "@/lib/lite/tools";

/**
 * Starts a comparison: the visitor's completed runs (all theirs, all of this
 * tool) go to the tool's Matcher. Costs no quota: the documents already did.
 *
 * JSON body: { tool, runIds: string[] }  — runIds in slot order; for a PO
 * check slot 0 is the PO and becomes the Matcher's benchmark run.
 */

export const runtime = "nodejs";

const ERR = (code: string, status: number) => NextResponse.json({ error: code }, { status });
const ID_RE = /^[A-Za-z0-9_-]{8,64}$/;

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

  let body: { tool?: unknown; runIds?: unknown };
  try {
    body = (await request.json()) as { tool?: unknown; runIds?: unknown };
  } catch {
    return ERR("bad_request", 400);
  }
  if (!isLiteToolId(body.tool)) return ERR("bad_request", 400);
  const tool = LITE_TOOLS[body.tool];
  if (tool.kind !== "compare" || !tool.compare) return ERR("bad_request", 400);
  const runIds = Array.isArray(body.runIds) ? body.runIds.filter((r): r is string => typeof r === "string" && ID_RE.test(r)) : [];
  if (new Set(runIds).size !== runIds.length) return ERR("bad_request", 400);
  if (runIds.length < tool.compare.minDocs || runIds.length > tool.compare.maxDocs) return ERR("bad_request", 400);

  const sessionId = await getSessionId();
  if (!sessionId) return ERR("not_found", 404);
  // The documents were uploaded through Turnstile; a comparison without that
  // session mark is a script replaying run ids.
  if (turnstileConfigured() && !(await isHumanSession(sessionId))) return ERR("captcha", 400);
  let locale: "es" | "en" = "es";
  for (const runId of runIds) {
    const owned = await getRunForSession(runId, sessionId, "run");
    if (!owned || owned.tool !== tool.id) return ERR("not_found", 404);
    locale = owned.locale === "en" ? "en" : "es";
    try {
      const run = await fetchRun(runId);
      if (run.status !== "completed") return ERR("not_ready", 409);
      if (!run.rows || run.rows.length === 0) return ERR("no_lines", 422);
    } catch (e) {
      const status = e instanceof LiteApiError && e.status === 404 ? 404 : 502;
      return ERR(status === 404 ? "not_found" : "backend", status);
    }
  }

  const matcherId = resolveId(tool.compare.matcher, locale);
  if (!matcherId) return ERR("unavailable", 503);

  // A comparison runs the Matcher, which costs credits: it draws on its own
  // daily limit per session and IP (it used to be unlimited — the same two
  // documents could be compared again and again).
  const ipHash = hashIp(clientIp(request));
  let reservation;
  try {
    reservation = await reserve({
      session_id: sessionId,
      ip_hash: ipHash,
      tool: tool.id,
      locale,
      kind: "match",
      filename: null,
      byte_size: null,
      pages: null,
      is_sample: false,
    });
  } catch {
    return ERR("unavailable", 503);
  }
  if (!reservation.ok) return ERR(reservation.code, 429);

  let matchId: string;
  try {
    ({ matchId } = await runMatcher({
      matcherId,
      runIds,
      benchmarkRunId: tool.compare.mode === "benchmark" ? runIds[0] : undefined,
    }));
  } catch (e) {
    await releaseReservation(reservation.id);
    const status = e instanceof LiteApiError ? e.status : 502;
    if (status === 400) return ERR("no_lines", 422);
    return ERR(status === 503 ? "unavailable" : "backend", status);
  }

  try {
    await finalizeReservation(reservation.id, matchId);
  } catch {
    return ERR("unavailable", 503);
  }
  return NextResponse.json({ ok: true, matchId });
}
