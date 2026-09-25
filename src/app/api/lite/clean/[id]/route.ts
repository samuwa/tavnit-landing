import { NextResponse } from "next/server";
import { getSessionId } from "@/lib/lite/session";
import { getRunForSession, updateRun } from "@/lib/lite/store";
import { readSweep } from "@/lib/lite/product";
import { isCleanMeta, mergeSweep } from "@/lib/lite/clean-server";

/**
 * Polls a spreadsheet tool's sweep. Only the session that started it can
 * read it (sweep id + session cookie). Once the Cleaner is done, the
 * visitor's file is rebuilt around its output and the first rows come back
 * for the page; the download has all of them.
 */

export const runtime = "nodejs";

const ID_RE = /^[A-Za-z0-9_-]{8,64}$/;
const SHOWN = 100;

export async function GET(_request: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  if (!ID_RE.test(id)) return NextResponse.json({ error: "not_found" }, { status: 404 });
  const sessionId = await getSessionId();
  if (!sessionId) return NextResponse.json({ error: "not_found" }, { status: 404 });
  const owned = await getRunForSession(id, sessionId, "sweep");
  if (!owned || !isCleanMeta(owned.meta)) return NextResponse.json({ error: "not_found" }, { status: 404 });

  let sweep;
  try {
    sweep = await readSweep(id);
  } catch {
    return NextResponse.json({ error: "backend" }, { status: 502 });
  }
  if (!sweep) return NextResponse.json({ error: "not_found" }, { status: 404 });

  if (sweep.status === "failed") {
    if (owned.status !== "failed") await updateRun(id, { status: "failed", finished_at: new Date().toISOString() });
    return NextResponse.json({ status: "failed" });
  }
  if (sweep.status !== "completed") return NextResponse.json({ status: "running" });

  const result = mergeSweep(owned.meta, sweep.output_json?.rows ?? []);
  if (owned.status !== "completed") {
    await updateRun(id, { status: "completed", finished_at: new Date().toISOString() });
  }
  return NextResponse.json({
    status: "completed",
    file: owned.filename,
    columns: result.columns,
    rows: result.rows.slice(0, SHOWN),
    changed: result.changed.slice(0, SHOWN),
    total: result.rows.length,
    cleaned: result.cleaned,
    changedCells: result.changedCells,
  });
}
