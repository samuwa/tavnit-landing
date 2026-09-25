import { NextResponse } from "next/server";
import { zipSync } from "fflate";
import { LITE_TOOLS, isLiteToolId } from "@/lib/lite/tools";
import { sampleFixture } from "@/lib/lite/samples";
import { buildXlsx } from "@/lib/lite/excel";
import { compareSheet } from "@/lib/lite/compare-sheet";
import { segmentName } from "@/lib/lite/split-view";
import { TOOL_COPY } from "@/lib/lite/copy";
import { recordSampleDownload, samplePdf, slicePdf } from "@/lib/lite/sample-files";
import { authConfigured, currentUser } from "@/lib/supabase/server";

/**
 * Download of a sample's result, built from the recording: the Excel of an
 * extraction (without the columns the visitor removed, `?hide=a,b`), the
 * Excel of a comparison, or a zip of the documents a split cut. Same gate as
 * every download: a signed-in Tavnit account.
 */

export const runtime = "nodejs";

function file(bytes: Uint8Array, type: string, filename: string) {
  const ascii = filename.replace(/[^\x20-\x7E]/g, "_").replace(/"/g, "");
  return new NextResponse(bytes as unknown as BodyInit, {
    status: 200,
    headers: {
      "Content-Type": type,
      "Content-Disposition": `attachment; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(filename)}`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

const XLSX = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

export async function GET(request: Request, ctx: { params: Promise<{ tool: string }> }) {
  const { tool } = await ctx.params;
  if (!isLiteToolId(tool)) return NextResponse.json({ error: "not_found" }, { status: 404 });
  const url = new URL(request.url);
  const locale = url.searchParams.get("locale") === "en" ? "en" : "es";
  const f = sampleFixture(tool, locale);
  if (!f) return NextResponse.json({ error: "not_found" }, { status: 404 });

  if (!authConfigured()) return NextResponse.json({ error: "unavailable" }, { status: 503 });
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "auth_required" }, { status: 401 });

  const def = LITE_TOOLS[tool];
  const sourceName = def.samplePaths?.map((p) => p.split("/").pop()).join(" + ") ?? "sample";
  await recordSampleDownload(request, tool, locale, user);

  if (f.kind === "extract") {
    const hide = new Set((url.searchParams.get("hide") || "").split(",").map((c) => c.trim()).filter(Boolean));
    const kept = f.columns.filter((c) => !hide.has(c));
    const columns = kept.length ? kept : f.columns;
    const xlsx = buildXlsx({ columns, rows: f.rows, locale, sourceName, toolPath: def.paths[locale] });
    const stem = (def.samplePaths?.[0]?.split("/").pop() ?? "sample").replace(/\.[^.]*$/, "");
    return file(xlsx, XLSX, `tavnit-${stem}.xlsx`);
  }

  if (f.kind === "compare") {
    const copy = TOOL_COPY[tool][locale].compare;
    if (!copy) return NextResponse.json({ error: "unavailable" }, { status: 503 });
    const { columns, rows } = compareSheet(f.result, copy);
    const xlsx = buildXlsx({ columns, rows, locale, sourceName, toolPath: def.paths[locale] });
    return file(xlsx, XLSX, `tavnit-${f.result.kind === "po" ? "po-check" : "quotes"}-sample.xlsx`);
  }

  const bundle = await samplePdf(tool);
  if (!bundle) return NextResponse.json({ error: "not_found" }, { status: 404 });
  const base = def.samplePaths?.[0]?.split("/").pop() ?? "sample.pdf";
  const files: Record<string, Uint8Array> = {};
  for (const s of f.segments) {
    if (s.from === null) continue;
    files[segmentName(base, s.index, s.type, "pdf")] = await slicePdf(bundle, s.from, s.to ?? s.from);
  }
  return file(zipSync(files, { level: 0 }), "application/zip", `tavnit-${base.replace(/\.[^.]*$/, "")}.zip`);
}
