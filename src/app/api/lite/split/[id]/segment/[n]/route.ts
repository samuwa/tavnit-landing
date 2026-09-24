import { NextResponse } from "next/server";
import { getSessionId } from "@/lib/lite/session";
import { getRunForSession, updateRun } from "@/lib/lite/store";
import { downloadLiteObject, readSplit } from "@/lib/lite/product";
import { authConfigured, currentUser } from "@/lib/supabase/server";
import { segmentName } from "@/lib/lite/split-view";

/** One cut document. Session ownership + signed-in visitor, like the Excel. */

export const runtime = "nodejs";

const ID_RE = /^[A-Za-z0-9_-]{8,64}$/;

export async function GET(_request: Request, ctx: { params: Promise<{ id: string; n: string }> }) {
  const { id, n } = await ctx.params;
  if (!ID_RE.test(id) || !/^\d{1,3}$/.test(n)) return NextResponse.json({ error: "not_found" }, { status: 404 });
  const sessionId = await getSessionId();
  if (!sessionId) return NextResponse.json({ error: "not_found" }, { status: 404 });
  const owned = await getRunForSession(id, sessionId, "split");
  if (!owned) return NextResponse.json({ error: "not_found" }, { status: 404 });
  if (!authConfigured()) return NextResponse.json({ error: "unavailable" }, { status: 503 });
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "auth_required" }, { status: 401 });

  const split = await readSplit(id).catch(() => null);
  const seg = split?.output_json?.[Number(n)];
  if (!split || split.status !== "completed" || !seg?.file_path) return NextResponse.json({ error: "not_found" }, { status: 404 });
  const obj = await downloadLiteObject(seg.file_path).catch(() => null);
  if (!obj) return NextResponse.json({ error: "not_found" }, { status: 404 });

  await updateRun(id, { user_id: user.id, user_email: user.email, downloaded_at: new Date().toISOString() });
  const ext = seg.file_path.split(".").pop()?.toLowerCase() || "pdf";
  const filename = segmentName(owned.filename || "document", Number(n), seg.matched_doc_title ?? null, ext);
  const ascii = filename.replace(/[^\x20-\x7E]/g, "_").replace(/"/g, "");
  return new NextResponse(obj.bytes as unknown as BodyInit, {
    status: 200,
    headers: {
      "Content-Type": obj.contentType,
      "Content-Disposition": `attachment; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(filename)}`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
