import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";
import { PDFDocument } from "pdf-lib";
import { randomBytes } from "node:crypto";
import { LITE_TOOLS, type LiteToolId } from "@/lib/lite/tools";
import { clientIp, getOrCreateSessionId, hashIp } from "@/lib/lite/session";
import { insertRun, sampleDownloadRecordedToday, updateRun } from "@/lib/lite/store";

/** The bundled sample PDF of a tool, from /public. */
export async function samplePdf(tool: LiteToolId, index = 0): Promise<Uint8Array | null> {
  const p = LITE_TOOLS[tool].samplePaths?.[index];
  if (!p) return null;
  try {
    return new Uint8Array(await readFile(path.join(process.cwd(), "public", p)));
  } catch {
    return null;
  }
}

/** Pages from..to (1-based, inclusive) of a PDF as a new PDF: a split segment. */
export async function slicePdf(bytes: Uint8Array, from: number, to: number): Promise<Uint8Array> {
  const src = await PDFDocument.load(bytes);
  const out = await PDFDocument.create();
  const last = Math.min(to, src.getPageCount());
  const idx = Array.from({ length: Math.max(0, last - from + 1) }, (_, i) => from - 1 + i);
  for (const page of await out.copyPages(src, idx)) out.addPage(page);
  return out.save();
}

/**
 * A download of a sample result is still a lead: the same lite_runs row a
 * real run leaves, marked as a sample, with who downloaded it. No engine run
 * behind it, so nothing for the cleanup to delete beyond the row itself.
 */
export async function recordSampleDownload(
  request: Request,
  tool: LiteToolId,
  locale: "es" | "en",
  user: { id: string; email?: string | null },
): Promise<void> {
  try {
    // One lead row per person, tool and UTC day is enough to know who they
    // are and what they looked at; without this, a download loop would write
    // a row per request.
    if (await sampleDownloadRecordedToday(user.id, tool)) return;
    const sessionId = await getOrCreateSessionId();
    const runId = `sample-${randomBytes(12).toString("hex")}`;
    await insertRun({
      run_id: runId,
      tool,
      locale,
      session_id: sessionId,
      ip_hash: hashIp(clientIp(request)),
      filename: LITE_TOOLS[tool].samplePaths?.[0]?.split("/").pop() ?? null,
      byte_size: null,
      pages: null,
      is_sample: true,
      kind: "run",
    });
    await updateRun(runId, { status: "completed", user_id: user.id, user_email: user.email ?? null, downloaded_at: new Date().toISOString() });
  } catch {
    // The file still goes out; losing the lead row is not worth a failed download.
  }
}
