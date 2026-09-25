import "server-only";

import {
  CLEAN_SLOTS,
  MODE_MAX_ROWS,
  PLACEHOLDER,
  isAppendMode,
  isMissing,
  normalizeDate,
  normalizeNumber,
  type CleanMode,
  type DateInput,
  type NumberInput,
} from "@/lib/lite/clean";
import type { Sheet, SheetCell } from "@/lib/lite/sheet";

/**
 * The server half of the spreadsheet tools (see lib/lite/clean.ts for why
 * the landing does part of the work).
 *
 * prepareSweep turns the visitor's sheet into the CSV the fixed Cleaner
 * expects: exactly col_1..col_10, one per selected column in order, every
 * cell either a normalised value or the placeholder. Only the selected
 * columns travel: the rest never leave the landing, which keeps the credit
 * cost to the cells being cleaned and keeps identifiers and free text away
 * from pandas' type guessing.
 *
 * Two shapes of Cleaner. number/date rewrite col_n in place. currency and
 * translate are derived fields: they read in_n and write out_n, which the
 * engine keeps only because in_1..in_10 are declared on the Cleaner too (a
 * sweep drops every column the Cleaner does not define before derived
 * fields run). Their result goes in a new column next to the source,
 * "Price (USD)", "Description (EN)".
 *
 * The CleanMeta that comes out is stored on the lite_runs row for the 24
 * hours the result lives, and mergeSweep rebuilds the visitor's file from
 * it: their header, their rows, their column order, with only the cells
 * that were actually sent replaced by the Cleaner's output.
 */

export interface CleanMeta {
  v: 1;
  mode: CleanMode;
  output: string;
  columns: string[];
  /** Original cell text, row by row. */
  rows: string[][];
  /** Column indexes that were cleaned, in slot order (slot i = col_{i+1}). */
  selected: number[];
  /** Per row, one "1"/"0" per selected column: was the cell sent (not a placeholder). */
  mask: string[];
  /** Derived Cleaners: the result is a new column "<name> (<suffix>)" after each source. */
  append?: { suffix: string };
}

export class CleanPrepError extends Error {
  constructor(public readonly code: "no_columns" | "too_many_columns" | "nothing_to_clean" | "too_many_rows") {
    super(code);
  }
}

function csvField(v: string): string {
  return /[",\n\r]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
}

export interface PrepareOptions {
  /** number/currency: how decimals are written; date: day or month first. */
  input?: NumberInput | DateInput;
  /** currency: the amounts' currency, written next to each value for the engine's detection. */
  source?: string;
  /** The Cleaner variant (output format, target currency or language). */
  output: string;
  /** Shown in the new column's name for derived Cleaners ("USD", "EN"). */
  suffix?: string;
}

export function prepareSweep(
  sheet: Sheet,
  mode: CleanMode,
  selectedNames: string[],
  opts: PrepareOptions,
): { csv: Uint8Array; meta: CleanMeta; sentCells: number } {
  const selected = selectedNames.map((n) => sheet.columns.indexOf(n));
  if (!selected.length || selected.some((i) => i < 0)) throw new CleanPrepError("no_columns");
  if (selected.length > CLEAN_SLOTS) throw new CleanPrepError("too_many_columns");
  if (sheet.rows.length > MODE_MAX_ROWS[mode]) throw new CleanPrepError("too_many_rows");

  const derived = isAppendMode(mode);
  const placeholder = PLACEHOLDER[mode];
  const header = Array.from({ length: CLEAN_SLOTS }, (_, i) => (derived ? `in_${i + 1}` : `col_${i + 1}`));
  const lines = [header.join(",")];
  const mask: string[] = [];
  let sentCells = 0;

  const valueFor = (cell: SheetCell | undefined): string | null => {
    if (!cell || isMissing(cell.text)) return null;
    switch (mode) {
      case "number":
        // An .xlsx number is already a machine number, whatever the visitor said about commas.
        return cell.kind === "number" ? cell.text : cell.kind === "text" ? normalizeNumber(cell.text, opts.input as NumberInput) : null;
      case "date":
        return cell.kind === "date" ? cell.text : cell.kind === "text" ? normalizeDate(cell.text, opts.input as DateInput) : null;
      case "currency": {
        // "1234.56 EUR": the engine's parser drops commas, and reads the
        // source currency from an ISO code next to the amount.
        const n = cell.kind === "number" ? cell.text : cell.kind === "text" ? normalizeNumber(cell.text, opts.input as NumberInput) : null;
        return n === null ? null : `${n} ${opts.source}`;
      }
      case "translate":
        return cell.text.trim() ? cell.text : null;
    }
  };

  for (const row of sheet.rows) {
    let bits = "";
    const out = header.map((_, slot) => {
      const ci = selected[slot];
      if (ci === undefined) return placeholder;
      const value = valueFor(row[ci]);
      if (value === null || isMissing(value)) {
        bits += "0";
        return placeholder;
      }
      bits += "1";
      sentCells++;
      return csvField(value);
    });
    mask.push(bits);
    lines.push(out.join(","));
  }
  if (!sentCells) throw new CleanPrepError("nothing_to_clean");

  const meta: CleanMeta = {
    v: 1,
    mode,
    output: opts.output,
    columns: sheet.columns,
    rows: sheet.rows.map((r) => r.map((c) => c.text)),
    selected,
    mask,
    ...(derived ? { append: { suffix: opts.suffix ?? opts.output.toUpperCase() } } : {}),
  };
  return { csv: new TextEncoder().encode(lines.join("\n") + "\n"), meta, sentCells };
}

export function isCleanMeta(v: unknown): v is CleanMeta {
  const m = v as CleanMeta | null;
  return !!m && m.v === 1 && Array.isArray(m.columns) && Array.isArray(m.rows) && Array.isArray(m.selected) && Array.isArray(m.mask);
}

export type CleanValue = string | number;

export interface CleanResult {
  columns: string[];
  rows: CleanValue[][];
  /** Names of the cleaned columns. */
  cleaned: string[];
  /** Cells whose value differs from the original. */
  changedCells: number;
  /** Per row, the indexes of changed cells (for highlighting). */
  changed: number[][];
}

/** The visitor's file with the cleaned cells swapped in, or the new columns added. */
export function mergeSweep(meta: CleanMeta, outputRows: Record<string, unknown>[]): CleanResult {
  let changedCells = 0;
  const changed: number[][] = [];
  const read = (r: number, slot: number): CleanValue | null => {
    const v = outputRows[r]?.[meta.append ? `out_${slot + 1}` : `col_${slot + 1}`];
    if (v === null || v === undefined) return null;
    if (typeof v === "number") return Number.isFinite(v) ? v : null;
    const t = String(v);
    return t.trim() === "" ? null : t;
  };

  if (!meta.append) {
    const rows = meta.rows.map((orig, r) => {
      const out: CleanValue[] = orig.slice();
      const marks: number[] = [];
      const bits = meta.mask[r] ?? "";
      meta.selected.forEach((ci, slot) => {
        if (bits[slot] !== "1") return;
        const value = read(r, slot);
        if (value === null) return;
        out[ci] = value;
        if (String(value) !== orig[ci]) {
          changedCells++;
          marks.push(ci);
        }
      });
      changed.push(marks);
      return out;
    });
    return { columns: meta.columns, rows, cleaned: meta.selected.map((i) => meta.columns[i]), changedCells, changed };
  }

  // Derived: a new column right after each source, in the visitor's order.
  const suffix = meta.append.suffix;
  const slotOf = new Map(meta.selected.map((ci, slot) => [ci, slot]));
  const columns: string[] = [];
  const layout: { src: number; slot: number | null }[] = [];
  meta.columns.forEach((name, ci) => {
    columns.push(name);
    layout.push({ src: ci, slot: null });
    const slot = slotOf.get(ci);
    if (slot !== undefined) {
      columns.push(`${name} (${suffix})`);
      layout.push({ src: ci, slot });
    }
  });
  const rows = meta.rows.map((orig, r) => {
    const bits = meta.mask[r] ?? "";
    const marks: number[] = [];
    const out = layout.map(({ src, slot }, i): CleanValue => {
      if (slot === null) return orig[src] ?? "";
      if (bits[slot] !== "1") return "";
      const value = read(r, slot);
      if (value === null) return "";
      changedCells++;
      marks.push(i);
      return value;
    });
    changed.push(marks);
    return out;
  });
  const cleaned = columns.filter((_, i) => layout[i].slot !== null);
  return { columns, rows, cleaned, changedCells, changed };
}

/** RFC 4180 CSV with a BOM (Excel opens it as UTF-8) and formula-injection guard. */
export function buildCsv(columns: string[], rows: CleanValue[][]): Uint8Array {
  const cell = (v: CleanValue) => {
    let s = typeof v === "number" ? String(v) : v;
    if (typeof v === "string" && /^[=+\-@\t\r]/.test(s) && !/^-?\d/.test(s)) s = `'${s}`;
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const text = [columns.map(cell), ...rows.map((r) => r.map(cell))].map((r) => r.join(",")).join("\r\n") + "\r\n";
  return new TextEncoder().encode("﻿" + text);
}
