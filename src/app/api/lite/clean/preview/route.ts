import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { LITE_LIMITS, LITE_TOOLS, isLiteToolId } from "@/lib/lite/tools";
import { SheetError, readSheet } from "@/lib/lite/sheet";
import { guessCurrency, guessDateOrder, guessDecimal, suggestColumns, valuesOf } from "@/lib/lite/clean";
import { sameOrigin } from "@/lib/lite/origin";

/**
 * Step 1 of a spreadsheet tool: read the file and say what is in it — the
 * header, the first rows, the columns that look like the tool's kind, and
 * how their values seem to be written. Nothing runs, nothing is stored,
 * nothing counts against the quota; the file is read in memory and dropped.
 */

export const runtime = "nodejs";

const ERR = (code: string, status: number) => NextResponse.json({ error: code }, { status });
const PREVIEW_ROWS = 6;

export async function POST(request: Request) {
  if (!sameOrigin(request)) return ERR("forbidden", 403);
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return ERR("bad_request", 400);
  }
  const toolId = form.get("tool");
  if (!isLiteToolId(toolId)) return ERR("bad_request", 400);
  const tool = LITE_TOOLS[toolId];
  if (tool.kind !== "clean" || !tool.clean) return ERR("bad_request", 400);
  const locale = form.get("locale") === "en" ? "en" : "es";

  let bytes: Uint8Array;
  let name: string;
  if (form.get("sample") === "1" && tool.samplePaths?.[0]) {
    try {
      bytes = new Uint8Array(await readFile(path.join(process.cwd(), "public", tool.samplePaths[0])));
      name = path.basename(tool.samplePaths[0]);
    } catch {
      return ERR("unavailable", 503);
    }
  } else {
    const file = form.get("file");
    if (!(file instanceof Blob)) return ERR("bad_request", 400);
    if (file.size === 0) return ERR("empty", 400);
    if (file.size > LITE_LIMITS.maxBytes) return ERR("too_large", 400);
    bytes = new Uint8Array(await file.arrayBuffer());
    name = file instanceof File ? file.name : "file.csv";
  }

  let sheet;
  try {
    sheet = readSheet(bytes);
  } catch (e) {
    return ERR(e instanceof SheetError ? e.code : "unreadable", 400);
  }
  const texts = sheet.rows.map((r) => r.map((c) => c.text));
  const mode = tool.clean.mode;
  const suggested = suggestColumns(sheet.columns, texts, mode);
  const values = valuesOf(sheet.columns, texts, suggested);
  const input =
    mode === "number" || mode === "currency"
      ? guessDecimal(values, locale === "es" ? "comma" : "dot")
      : mode === "date"
        ? guessDateOrder(values, locale === "es" ? "dmy" : "mdy")
        : "";
  const source = mode === "currency" ? guessCurrency(values, "USD") : undefined;

  return NextResponse.json({
    file: name,
    columns: sheet.columns,
    rows: texts.slice(0, PREVIEW_ROWS),
    total: texts.length,
    suggested,
    input,
    source,
  });
}
