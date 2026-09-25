import { NextResponse } from "next/server";
import { isLiteToolId } from "@/lib/lite/tools";
import { sampleFixture } from "@/lib/lite/samples";

/**
 * The recorded result of a tool's sample (see lib/lite/samples). Public and
 * identical for everyone, so it caches; nothing runs, nothing is counted.
 */

export const runtime = "nodejs";

export async function GET(request: Request, ctx: { params: Promise<{ tool: string }> }) {
  const { tool } = await ctx.params;
  if (!isLiteToolId(tool)) return NextResponse.json({ error: "not_found" }, { status: 404 });
  const locale = new URL(request.url).searchParams.get("locale") === "en" ? "en" : "es";
  const f = sampleFixture(tool, locale);
  if (!f) return NextResponse.json({ error: "not_found" }, { status: 404 });
  return NextResponse.json(f, { headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" } });
}
