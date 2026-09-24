import { NextResponse } from "next/server";
import { zipSync } from "fflate";
import { getSessionId } from "@/lib/lite/session";
import { getRunForSession, updateRun } from "@/lib/lite/store";
import { downloadLiteObject, readSplit } from "@/lib/lite/product";
import { authConfigured, currentUser } from "@/lib/supabase/server";
import { segmentName } from "@/lib/lite/split-view";

/** Every cut document in one zip. Same gates as a single segment. */

export const runtime = "nodejs";

const ID_RE = /^[A-Za-z0-9_-]{8,64}$/;

export async function GET(_request: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  if (!ID_RE.test(id)) return NextResponse.json({ error: "not_found" }, { status: 404 });
  const sessionId = await getSessionId();
  if (!sessionId) return NextResponse.json({ error: "not_found" }, { status: 404 });
  const owned = await getRunForSession(id, sessionId, "split");
  if (!owned) return NextResponse.json({ error: "not_found" }, { status: 404 });
  if (!authConfigured()) return NextResponse.json({ error: "unavailable" }, { status: 503 });
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "auth_required" }, { status: 401 });

  const split = await readSplit(id).catch(() => null);
  if (!split || split.status !== "completed" || !split.output_json?.length) return NextResponse.json({ error: "not_found" }, { status: 404 });

  const files: Record<string, Uint8Array> = {};
  for (const [i, seg] of split.output_json.entries()) {
    if (!seg.file_path) continue;
    const obj = await downloadLiteObject(seg.file_path).catch(() => null);
    if (!obj) continue;
    const ext = seg.file_path.split(".").pop()?.toLowerCase() || "pdf";
    files[segmentName(owned.filename || "document", i, seg.matched_doc_title ?? null, ext)] = obj.bytes;
  }
  if (!Object.keys(files).length) return NextResponse.json({ error: "not_found" }, { status: 404 });
  const zip = zipSync(files, { level: 0 }); // PDFs are already compressed

  await updateRun(id, { user_id: user.id, user_email: user.email, downloaded_at: new Date().toISOString() });
  const stem = (owned.filename || "documents").replace(/\.[^.]*$/, "").replace(/[^\p{L}\p{N} ._-]/gu, "").trim() || "documents";
  const filename = `tavnit-${stem}.zip`.slice(0, 120);
  const ascii = filename.replace(/[^\x20-\x7E]/g, "_").replace(/"/g, "");
  return new NextResponse(zip as unknown as BodyInit, {
    status: 200,
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(filename)}`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
