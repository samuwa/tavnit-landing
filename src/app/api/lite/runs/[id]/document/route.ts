import { NextResponse } from "next/server";
import { LiteApiError, fetchRunSource } from "@/lib/lite/api";
import { getSessionId } from "@/lib/lite/session";
import { getRunForSession } from "@/lib/lite/store";
import { LITE_LIMITS } from "@/lib/lite/tools";

/**
 * The visitor's own upload, for the side-by-side view.
 *
 * Same ownership gate as polling (run id + session cookie), then the file
 * is fetched from the backend's signed storage URL server-side and streamed
 * back inline. The storage URL never reaches the browser, the response is
 * private and uncacheable, and only the three types the upload accepted
 * are served (anything else is refused rather than sniffed).
 */

export const runtime = "nodejs";

const ID_RE = /^[A-Za-z0-9_-]{8,64}$/;
const ALLOWED = new Set(["application/pdf", "image/png", "image/jpeg"]);

export async function GET(_request: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  if (!ID_RE.test(id)) return NextResponse.json({ error: "not_found" }, { status: 404 });

  const sessionId = await getSessionId();
  if (!sessionId) return NextResponse.json({ error: "not_found" }, { status: 404 });
  const owned = await getRunForSession(id, sessionId);
  if (!owned) return NextResponse.json({ error: "not_found" }, { status: 404 });

  let source;
  try {
    source = await fetchRunSource(id);
  } catch (e) {
    const status = e instanceof LiteApiError && e.status === 404 ? 404 : 502;
    return NextResponse.json({ error: status === 404 ? "not_found" : "backend" }, { status });
  }
  if (!ALLOWED.has(source.mimeType)) return NextResponse.json({ error: "not_found" }, { status: 404 });
  if (source.byteSize !== null && source.byteSize > LITE_LIMITS.maxBytes) {
    return NextResponse.json({ error: "too_large" }, { status: 413 });
  }

  let upstream: Response;
  try {
    upstream = await fetch(source.url, { cache: "no-store", signal: AbortSignal.timeout(30_000) });
  } catch {
    return NextResponse.json({ error: "backend" }, { status: 502 });
  }
  if (!upstream.ok || !upstream.body) return NextResponse.json({ error: "backend" }, { status: 502 });

  const bytes = new Uint8Array(await upstream.arrayBuffer());
  if (bytes.length > LITE_LIMITS.maxBytes) return NextResponse.json({ error: "too_large" }, { status: 413 });

  return new NextResponse(bytes as unknown as BodyInit, {
    status: 200,
    headers: {
      "Content-Type": source.mimeType,
      "Content-Length": String(bytes.length),
      "Content-Disposition": "inline",
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
      // The PDF is rendered in an iframe on the same origin only.
      "Content-Security-Policy": "frame-ancestors 'self'; sandbox",
      "X-Frame-Options": "SAMEORIGIN",
    },
  });
}
