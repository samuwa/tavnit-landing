import { LITE_LIMITS } from "@/lib/lite/tools";

/**
 * Turns the backend's row payload into a fixed table the browser and the
 * Excel writer both consume. Column order comes from the run's `columns`
 * when it stamps one, otherwise from the union of row keys in first-seen
 * order. Cell values are kept as numbers when they are numbers and turned
 * into short strings otherwise — nothing nested reaches the UI.
 */

export type Cell = string | number | null;

export interface Table {
  columns: string[];
  rows: Record<string, Cell>[];
  total: number;
  truncated: boolean;
}

function toCell(v: unknown): Cell {
  if (v === null || v === undefined) return null;
  if (typeof v === "number") return Number.isFinite(v) ? v : null;
  if (typeof v === "boolean") return v ? "true" : "false";
  if (typeof v === "string") return v.length > 2000 ? `${v.slice(0, 2000)}…` : v;
  try {
    const s = JSON.stringify(v);
    return s.length > 2000 ? `${s.slice(0, 2000)}…` : s;
  } catch {
    return String(v);
  }
}

export function normalizeRows(
  columns: string[] | null,
  rows: Record<string, unknown>[],
  preferred: string[] = [],
): Table {
  let cols = columns && columns.length ? columns.slice(0, 100) : [];
  if (!cols.length) {
    const seen = new Set<string>();
    for (const r of rows) {
      for (const k of Object.keys(r)) {
        if (!seen.has(k)) {
          seen.add(k);
          cols.push(k);
          if (cols.length >= 100) break;
        }
      }
      if (cols.length >= 100) break;
    }
  }
  cols = cols.map((c) => String(c).slice(0, 120));
  if (preferred.length) {
    const rank = new Map(preferred.map((c, i) => [c, i]));
    cols = [...cols].sort((a, b) => (rank.get(a) ?? 1e9) - (rank.get(b) ?? 1e9));
  }

  const limited = rows.slice(0, LITE_LIMITS.maxRows);
  const out = limited.map((r) => {
    const o: Record<string, Cell> = {};
    for (const c of cols) o[c] = toCell(r[c]);
    return o;
  });

  return {
    columns: cols,
    rows: out,
    total: rows.length,
    truncated: rows.length > limited.length,
  };
}
