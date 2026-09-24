import "server-only";

import { LiteApiError, fetchRun } from "@/lib/lite/api";
import { normalizeRows } from "@/lib/lite/rows";
import { readMatch } from "@/lib/lite/product";
import { getRunForSession, updateRun, type LiteRunRow } from "@/lib/lite/store";
import { LITE_TOOLS, isLiteToolId } from "@/lib/lite/tools";
import { buildPoResult, buildQuoteResult, identifierOf, type CompareDoc, type CompareResult } from "@/lib/lite/compare";

/**
 * The state of one comparison for the session that owns it: pending, failed,
 * or the interpreted result. Shared by the poll route and the Excel route.
 */

export type CompareState =
  | { status: "running" }
  | { status: "failed"; error: string | null }
  | { status: "completed"; result: CompareResult; owned: LiteRunRow };

export async function compareState(matchId: string, sessionId: string): Promise<CompareState | null> {
  const owned = await getRunForSession(matchId, sessionId, "match");
  if (!owned || !isLiteToolId(owned.tool)) return null;
  const tool = LITE_TOOLS[owned.tool];
  if (tool.kind !== "compare" || !tool.compare) return null;
  const locale = owned.locale === "en" ? "en" : "es";

  const match = await readMatch(matchId);
  if (!match) return null;
  if (match.status === "failed" || match.status === "cancelled") {
    if (owned.status !== "failed") await updateRun(matchId, { status: "failed", finished_at: new Date().toISOString() });
    return { status: "failed", error: match.error_message };
  }
  if (match.status !== "completed") return { status: "running" };

  // Slot order is the order the page submitted the runs; for a PO check the
  // benchmark run is slot 0 by contract.
  const runIds = Array.isArray(match.run_ids) ? match.run_ids.map(String) : [];
  const ordered = match.benchmark_run_id ? [match.benchmark_run_id, ...runIds.filter((r) => r !== match.benchmark_run_id)] : runIds;
  const fields = tool.compare.fields[locale];
  const docs: CompareDoc[] = [];
  for (const [slot, runId] of ordered.entries()) {
    const own = await getRunForSession(runId, sessionId, "run");
    let run;
    try {
      run = await fetchRun(runId);
    } catch (e) {
      if (e instanceof LiteApiError && e.status === 404) return { status: "failed", error: "run_gone" };
      throw e;
    }
    const table = normalizeRows(run.columns, run.rows ?? [], tool.columnOrder[locale]);
    docs.push({
      runId,
      slot,
      file: own?.filename ?? `doc-${slot + 1}`,
      label: identifierOf(table.rows, fields.identifier, `#${slot + 1}`),
      rows: table.rows,
    });
  }
  const result = tool.compare.mode === "benchmark" ? buildPoResult(match.output_json, docs, fields) : buildQuoteResult(match.output_json, docs, fields);
  if (owned.status !== "completed") {
    await updateRun(matchId, { status: "completed", row_count: result.lines.length, finished_at: new Date().toISOString() });
  }
  return { status: "completed", result, owned };
}
