import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { APP_URL } from "@/lib/site";
import { isLiteToolId } from "@/lib/lite/tools";
import { getOrCreateSessionId } from "@/lib/lite/session";
import { createHandoff, insertIntent, linkSessionIntents, storeConfigured, type IntentKind } from "@/lib/lite/store";
import { authConfigured, currentUser } from "@/lib/supabase/server";

/**
 * Records what a visitor tried on the free tools, so the product can start
 * them where they left off (see the 20260925180000 migration).
 *
 * JSON body: { tool, kind: "used" | "cta" | "download", feature?, locale?,
 *              payload?, handoff? }
 *  - `feature` is what they reached for ("flow", "webhook", "cleaner", …).
 *  - `handoff: true` (the "Try it in Tavnit" links) also mints a one-time
 *    token and answers { url } — the app URL carrying it.
 * Never blocks the visitor: on any failure the answer still carries the plain
 * app URL for a handoff.
 */

export const runtime = "nodejs";

const KINDS: IntentKind[] = ["used", "cta", "download"];
const FEATURE_RE = /^[a-z][a-z:-]{0,39}$/;

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

/** Keep only small, flat, plain values: a list of column names, a field name. */
function cleanPayload(raw: unknown): Record<string, unknown> {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(raw as Record<string, unknown>).slice(0, 10)) {
    if (!/^[a-z_]{1,30}$/.test(k)) continue;
    if (typeof v === "string") out[k] = v.slice(0, 120);
    else if (typeof v === "number" || typeof v === "boolean") out[k] = v;
    else if (Array.isArray(v)) out[k] = v.filter((x) => typeof x === "string").slice(0, 40).map((x) => (x as string).slice(0, 80));
  }
  return out;
}

export async function POST(request: Request) {
  const fallback = { url: APP_URL };
  if (!sameOrigin(request)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  const wantsHandoff = body.handoff === true;
  if (!storeConfigured()) return NextResponse.json(wantsHandoff ? fallback : { ok: false });

  const tool = typeof body.tool === "string" && (isLiteToolId(body.tool) || body.tool === "site") ? body.tool : null;
  const kind = KINDS.includes(body.kind as IntentKind) ? (body.kind as IntentKind) : null;
  if (!tool || !kind) return NextResponse.json({ error: "bad_request" }, { status: 400 });
  const feature = typeof body.feature === "string" && FEATURE_RE.test(body.feature) ? body.feature : null;
  const locale = body.locale === "en" ? "en" : "es";

  try {
    const sessionId = await getOrCreateSessionId();
    const user = authConfigured() ? await currentUser().catch(() => null) : null;
    await insertIntent({ session_id: sessionId, user_id: user?.id ?? null, tool, kind, feature, locale, payload: cleanPayload(body.payload) });
    if (user) await linkSessionIntents(sessionId, user.id);
    if (!wantsHandoff) return NextResponse.json({ ok: true });
    const token = randomBytes(24).toString("hex");
    await createHandoff(sessionId, token);
    const url = new URL(APP_URL);
    url.searchParams.set("lite", token);
    return NextResponse.json({ url: url.toString() });
  } catch {
    return NextResponse.json(wantsHandoff ? fallback : { ok: false });
  }
}
