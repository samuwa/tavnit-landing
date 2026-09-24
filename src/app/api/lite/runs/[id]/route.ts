import { NextResponse } from "next/server";
import { LiteApiError, fetchRun } from "@/lib/lite/api";
import { getSessionId } from "@/lib/lite/session";
import { getRunForSession, updateRun } from "@/lib/lite/store";
import { normalizeRows } from "@/lib/lite/rows";
import { LITE_TOOLS, isLiteToolId } from "@/lib/lite/tools";

/**
 * Polls one run. Only the session that started it can read it: the run id
 * is looked up together with the session cookie, so a leaked or guessed id
 * returns 404 rather than someone else's invoice.
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

  let run;
  try {
    run = await fetchRun(id);
  } catch (e) {
    const status = e instanceof LiteApiError ? e.status : 502;
    return NextResponse.json(
      { error: status === 404 ? "not_found" : "backend" },
      { status: status === 404 ? 404 : 502 },
    );
  }

  if (run.status === "completed") {
    const table = normalizeRows(run.columns, run.rows ?? [], columnOrderFor(owned.tool, owned.locale));
    if (owned.status !== "completed") {
      await updateRun(id, {
        status: "completed",
        row_count: table.total,
        pages: run.pagesProcessed ?? owned.pages,
        finished_at: new Date().toISOString(),
      });
    }
    return NextResponse.json({
      status: "completed",
      columns: table.columns,
      rows: table.rows,
      total: table.total,
      truncated: table.truncated,
      pages: run.pagesProcessed ?? run.pagesDetected ?? owned.pages,
      mime: run.mimeType,
    });
  }

  if (run.status === "failed" || run.status === "cancelled") {
    if (owned.status !== run.status) {
      await updateRun(id, { status: run.status, finished_at: new Date().toISOString() });
    }
    return NextResponse.json({ status: "failed" });
  }

  // queued | running | awaiting_approval (a Lite flow never gates on review,
  // but if it did the visitor would just keep waiting; treat as running).
  return NextResponse.json({ status: "running", pages: run.pagesDetected ?? owned.pages });
}
