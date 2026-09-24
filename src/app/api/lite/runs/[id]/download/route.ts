import { NextResponse } from "next/server";
import { LiteApiError, fetchRun } from "@/lib/lite/api";
import { getSessionId } from "@/lib/lite/session";
import { getRunForSession, updateRun } from "@/lib/lite/store";
import { normalizeRows } from "@/lib/lite/rows";
import { buildXlsx } from "@/lib/lite/excel";
import { LITE_TOOLS, isLiteToolId } from "@/lib/lite/tools";
import { authConfigured, currentUser } from "@/lib/supabase/server";

/**
 * The Excel download. Two gates, both server-side:
 *  1. the run belongs to this browser's session (same as polling);
 *  2. the visitor is signed in to a Tavnit account — the product decision
 *     behind the free tools: the result is free to look at, taking it with
 *     you means becoming a user. 401 with `auth_required` tells the page
 *     to open the sign-in dialog and retry.
 */

export const runtime = "nodejs";

const ID_RE = /^[A-Za-z0-9_-]{8,64}$/;

function columnOrderFor(tool: string, locale: string): string[] {
  if (!isLiteToolId(tool)) return [];
  return LITE_TOOLS[tool].columnOrder[locale === "en" ? "en" : "es"];
}

export async function GET(_request: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  if (!ID_RE.test(id)) return NextResponse.json({ error: "not_found" }, { status: 404 });

  const sessionId = await getSessionId();
  if (!sessionId) return NextResponse.json({ error: "not_found" }, { status: 404 });
  const owned = await getRunForSession(id, sessionId);
  if (!owned) return NextResponse.json({ error: "not_found" }, { status: 404 });

  if (!authConfigured()) return NextResponse.json({ error: "unavailable" }, { status: 503 });
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "auth_required" }, { status: 401 });

  let run;
  try {
    run = await fetchRun(id);
  } catch (e) {
    const status = e instanceof LiteApiError && e.status === 404 ? 404 : 502;
    return NextResponse.json({ error: status === 404 ? "not_found" : "backend" }, { status });
  }
  if (run.status !== "completed") {
    return NextResponse.json({ error: "not_ready" }, { status: 409 });
  }

  const table = normalizeRows(run.columns, run.rows ?? [], columnOrderFor(owned.tool, owned.locale));
  const locale = owned.locale === "en" ? "en" : "es";
  const toolPath = isLiteToolId(owned.tool) ? LITE_TOOLS[owned.tool].paths[locale] : "/tools";
  const sourceName = owned.filename || "document";

  const xlsx = buildXlsx({
    columns: table.columns,
    rows: table.rows,
    locale,
    sourceName,
    toolPath,
  });

  await updateRun(id, {
    user_id: user.id,
    user_email: user.email,
    downloaded_at: new Date().toISOString(),
  });

  const base = sourceName.replace(/\.[^.]*$/, "").replace(/[^\p{L}\p{N} ._-]/gu, "").trim() || "document";
  const filename = `tavnit-${base}.xlsx`.slice(0, 120);
  // RFC 5987 for non-ASCII names, plus a plain ASCII fallback.
  const ascii = filename.replace(/[^\x20-\x7E]/g, "_").replace(/"/g, "");

  return new NextResponse(xlsx as unknown as BodyInit, {
    status: 200,
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(filename)}`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
