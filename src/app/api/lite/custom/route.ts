import { NextResponse } from "next/server";
import {
  activateTool,
  createCustomFlow,
  customConfigured,
  dropFlow,
  findActiveTool,
  getDraft,
  isUuid,
  retireFlows,
  suggestsRemaining,
  toolView,
  type StoredField,
} from "@/lib/lite/custom-server";
import { isCustomDataType, resolveSelection, type CustomToolField } from "@/lib/lite/custom";
import { sameOrigin } from "@/lib/lite/origin";
import { clientIp, getSessionId, hashIp } from "@/lib/lite/session";
import { authConfigured, currentUser } from "@/lib/supabase/server";

/**
 * The visitor's custom tool.
 *
 * GET  — the tool this browser (or, signed in, this account) made, or
 *        null, plus how many column suggestions are left today.
 * POST — custom tool, step 2: turns a reviewed suggestion into the tool.
 *        JSON { draftId, name, fields: [{ key, name }] } — which suggested
 *        fields stay and what they are called. Everything else about a
 *        field (kind, type, the hints that steer the extraction) is read
 *        from the draft the suggest route stored for THIS session, never
 *        from the request. Creates the Flow in the Lite org, makes it the
 *        visitor's one tool and retires the tool it replaces.
 */

export const runtime = "nodejs";
export const maxDuration = 30;

const ERR = (code: string, status: number) => NextResponse.json({ error: code }, { status });

async function signedInUserId(): Promise<string | null> {
  if (!authConfigured()) return null;
  const user = await currentUser().catch(() => null);
  return user?.id ?? null;
}

export async function GET(request: Request) {
  if (!customConfigured()) return NextResponse.json({ tool: null, remaining: null, available: false });
  const sessionId = await getSessionId();
  const userId = await signedInUserId();
  try {
    const row = sessionId || userId ? await findActiveTool(sessionId, userId) : null;
    return NextResponse.json(
      { tool: row ? toolView(row) : null, remaining: await suggestsRemaining(sessionId, hashIp(clientIp(request))), available: true },
      { headers: { "Cache-Control": "private, no-store" } },
    );
  } catch {
    return ERR("unavailable", 503);
  }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return ERR("forbidden", 403);
  if (!customConfigured()) return ERR("unavailable", 503);

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return ERR("bad_request", 400);
  }
  if (!body || typeof body !== "object" || !isUuid(body.draftId)) return ERR("bad_request", 400);

  // The draft was made by this session's suggest call; no cookie, no draft.
  const sessionId = await getSessionId();
  if (!sessionId) return ERR("draft_expired", 410);

  let draft;
  try {
    draft = await getDraft(body.draftId, sessionId);
  } catch {
    return ERR("unavailable", 503);
  }
  const stored: StoredField[] = (draft?.suggestion?.fields ?? []).filter(
    (f): f is StoredField => Boolean(f) && typeof f.key === "string" && typeof f.name === "string" && isCustomDataType(f.data_type) && (f.kind === "metadata" || f.kind === "table"),
  );
  if (!draft || !stored.length) return ERR("draft_expired", 410);

  const resolved = resolveSelection(
    stored.map((f) => ({ key: f.key, kind: f.kind, name: f.name, dataType: f.data_type })),
    { name: body.name, fields: body.fields },
    draft.name || (draft.locale === "en" ? "My tool" : "Mi herramienta"),
  );
  if (!resolved.ok) return ERR(resolved.error, 400);

  const byKey = new Map(stored.map((f) => [f.key, f]));
  const userId = await signedInUserId();

  let flowId: string;
  try {
    flowId = await createCustomFlow({
      toolId: draft.id,
      name: resolved.name,
      locale: draft.locale,
      fields: resolved.fields.map((f) => ({ name: f.name, dataType: f.dataType, stored: byKey.get(f.key)! })),
    });
  } catch {
    return ERR("create_failed", 502);
  }

  const fields: CustomToolField[] = resolved.fields.map(({ name, kind, dataType }) => ({ name, kind, dataType }));
  let retired: string[] | null;
  try {
    retired = await activateTool({ id: draft.id, sessionId, userId, flowId, name: resolved.name, fields });
  } catch {
    await dropFlow(flowId);
    return ERR("create_failed", 502);
  }
  if (retired === null) {
    // Confirmed twice (double click, two tabs): the first one won.
    await dropFlow(flowId);
    return ERR("draft_expired", 410);
  }

  // The replaced tool's Flow leaves the org's lists now; the hourly cleanup
  // deletes it once its runs are purged (and retries this if it failed).
  await retireFlows(retired).catch(() => {});

  try {
    const row = await findActiveTool(sessionId, userId);
    if (row) return NextResponse.json({ ok: true, tool: toolView(row) });
  } catch {
    // fall through: the tool exists, describe it from what we just wrote
  }
  return NextResponse.json({
    ok: true,
    tool: { id: draft.id, name: resolved.name, locale: draft.locale === "en" ? "en" : "es", fields, createdAt: new Date().toISOString(), expiresAt: null },
  });
}
