import { NextResponse } from "next/server";
import { LITE_TOOLS, isLiteToolId } from "@/lib/lite/tools";
import { sampleFixture } from "@/lib/lite/samples";
import { segmentName } from "@/lib/lite/split-view";
import { recordSampleDownload, samplePdf, slicePdf } from "@/lib/lite/sample-files";
import { authConfigured, currentUser } from "@/lib/supabase/server";

/** One document cut from the split sample, sliced from the bundled PDF by the recorded page range. */

export const runtime = "nodejs";

export async function GET(request: Request, ctx: { params: Promise<{ tool: string; n: string }> }) {
  const { tool, n } = await ctx.params;
  if (!isLiteToolId(tool) || !/^\d{1,3}$/.test(n)) return NextResponse.json({ error: "not_found" }, { status: 404 });
  const locale = new URL(request.url).searchParams.get("locale") === "en" ? "en" : "es";
  const f = sampleFixture(tool, locale);
  const seg = f?.kind === "split" ? f.segments[Number(n)] : undefined;
  if (!seg || seg.from === null) return NextResponse.json({ error: "not_found" }, { status: 404 });

  if (!authConfigured()) return NextResponse.json({ error: "unavailable" }, { status: 503 });
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "auth_required" }, { status: 401 });

  const bundle = await samplePdf(tool);
  if (!bundle) return NextResponse.json({ error: "not_found" }, { status: 404 });
  await recordSampleDownload(request, tool, locale, user);
  const bytes = await slicePdf(bundle, seg.from, seg.to ?? seg.from);
  const filename = segmentName(LITE_TOOLS[tool].samplePaths?.[0]?.split("/").pop() ?? "sample.pdf", seg.index, seg.type, "pdf");
  const ascii = filename.replace(/[^\x20-\x7E]/g, "_").replace(/"/g, "");
  return new NextResponse(bytes as unknown as BodyInit, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(filename)}`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
