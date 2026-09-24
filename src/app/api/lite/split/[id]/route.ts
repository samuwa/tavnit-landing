import { NextResponse } from "next/server";
import { getSessionId } from "@/lib/lite/session";
import { getRunForSession, updateRun } from "@/lib/lite/store";
import { readSplit } from "@/lib/lite/product";
import { toView } from "@/lib/lite/split-view";

/**
 * Polls one split. The segments come back as the Splitter stored them:
 * page range, the document type it matched (or none) and its one-line
 * description; the files themselves are served by ../segment/[n].
 */

export const runtime = "nodejs";

const ID_RE = /^[A-Za-z0-9_-]{8,64}$/;

export async function GET(_request: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  if (!ID_RE.test(id)) return NextResponse.json({ error: "not_found" }, { status: 404 });
  const sessionId = await getSessionId();
  if (!sessionId) return NextResponse.json({ error: "not_found" }, { status: 404 });
  const owned = await getRunForSession(id, sessionId, "split");
  if (!owned) return NextResponse.json({ error: "not_found" }, { status: 404 });

  let split;
  try {
    split = await readSplit(id);
  } catch {
    return NextResponse.json({ error: "backend" }, { status: 502 });
  }
  if (!split) return NextResponse.json({ error: "not_found" }, { status: 404 });

  if (split.status === "completed") {
    const segments = toView(split.output_json);
    if (owned.status !== "completed") {
      await updateRun(id, { status: "completed", row_count: segments.length, pages: split.pages_count ?? owned.pages, finished_at: new Date().toISOString() });
    }
    return NextResponse.json({ status: "completed", segments, pages: split.pages_count ?? owned.pages, file: owned.filename });
  }
  if (split.status === "failed") {
    if (owned.status !== "failed") await updateRun(id, { status: "failed", finished_at: new Date().toISOString() });
    return NextResponse.json({ status: "failed" });
  }
  return NextResponse.json({ status: "running", pages: split.pages_count ?? owned.pages });
}
