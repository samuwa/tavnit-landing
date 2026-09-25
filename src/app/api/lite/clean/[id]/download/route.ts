import { NextResponse } from "next/server";
import { getSessionId } from "@/lib/lite/session";
import { getRunForSession, updateRun } from "@/lib/lite/store";
import { readSweep } from "@/lib/lite/product";
import { buildCsv, isCleanMeta, mergeSweep } from "@/lib/lite/clean-server";
import { buildXlsx } from "@/lib/lite/excel";
import { LITE_TOOLS, isLiteToolId } from "@/lib/lite/tools";
import { authConfigured, currentUser } from "@/lib/supabase/server";

/**
 * The cleaned file, as Excel (default) or CSV (?fmt=csv). Two gates, like
 * every download: the sweep belongs to this browser's session, and the
 * visitor is signed in to a Tavnit account.
 */

export const runtime = "nodejs";

const ID_RE = /^[A-Za-z0-9_-]{8,64}$/;

export async function GET(request: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  if (!ID_RE.test(id)) return NextResponse.json({ error: "not_found" }, { status: 404 });
  const sessionId = await getSessionId();
  if (!sessionId) return NextResponse.json({ error: "not_found" }, { status: 404 });
  const owned = await getRunForSession(id, sessionId, "sweep");
  if (!owned || !isCleanMeta(owned.meta)) return NextResponse.json({ error: "not_found" }, { status: 404 });

  if (!authConfigured()) return NextResponse.json({ error: "unavailable" }, { status: 503 });
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "auth_required" }, { status: 401 });

  let sweep;
  try {
    sweep = await readSweep(id);
  } catch {
    return NextResponse.json({ error: "backend" }, { status: 502 });
  }
  if (!sweep) return NextResponse.json({ error: "not_found" }, { status: 404 });
  if (sweep.status !== "completed") return NextResponse.json({ error: "not_ready" }, { status: 409 });

  const result = mergeSweep(owned.meta, sweep.output_json?.rows ?? []);
  const csv = new URL(request.url).searchParams.get("fmt") === "csv";
  const locale = owned.locale === "en" ? "en" : "es";
  const toolPath = isLiteToolId(owned.tool) ? LITE_TOOLS[owned.tool].paths[locale] : "/tools";
  const sourceName = owned.filename || "file";

  const bytes = csv
    ? buildCsv(result.columns, result.rows)
    : buildXlsx({
        columns: result.columns,
        rows: result.rows.map((r) => Object.fromEntries(result.columns.map((c, i) => [c, r[i]]))),
        locale,
        sourceName,
        toolPath,
      });

  await updateRun(id, { user_id: user.id, user_email: user.email, downloaded_at: new Date().toISOString() });

  const stem = sourceName.replace(/\.[^.]*$/, "").replace(/[^\p{L}\p{N} ._-]/gu, "").trim() || "file";
  const filename = `tavnit-${stem}.${csv ? "csv" : "xlsx"}`.slice(0, 120);
  const ascii = filename.replace(/[^\x20-\x7E]/g, "_").replace(/"/g, "");
  return new NextResponse(bytes as unknown as BodyInit, {
    status: 200,
    headers: {
      "Content-Type": csv ? "text/csv; charset=utf-8" : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(filename)}`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
