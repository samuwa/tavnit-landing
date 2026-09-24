import type { CompareFields } from "@/lib/lite/tools";
import type { Cell } from "@/lib/lite/rows";

/**
 * Turns a Matcher result into what the two compare tools show. Pure, shared
 * by the API route (which also writes the Excel from it) and the page.
 *
 * The Matcher's output_json has one column pair per participant:
 * "<match>-<Id>" and "<comparison>-<Id>", plus "Champion" ("Id", "Id1, Id2"
 * on ties, or null). <Id> is the participant's identifier: the first
 * non-empty value of the identifier field in that run, so the same rule is
 * applied here to tell the participants apart. Quantities and line totals
 * are not in the Matcher output; they are looked up in the run's own rows
 * by the matched text.
 */

export interface CompareDoc {
  runId: string;
  /** slot the visitor put it in (0 = the reference for a PO check) */
  slot: number;
  file: string;
  /** identifier value (document number, supplier) */
  label: string;
  rows: Record<string, Cell>[];
}

export type PoStatus = "ok" | "price" | "qty" | "both" | "missing" | "extra";

export interface PoLine {
  description: string;
  ref: { qty: number | null; price: number | null; total: number | null } | null;
  doc: { description: string | null; qty: number | null; price: number | null; total: number | null } | null;
  status: PoStatus;
}

export interface PoResult {
  kind: "po";
  /** [reference, the other document] */
  docs: { runId: string; slot: number; file: string; label: string }[];
  lines: PoLine[];
  summary: Record<PoStatus, number>;
  totals: { ref: number; doc: number };
}

export interface QuoteLine {
  description: string;
  prices: (number | null)[];
  /** indexes into suppliers */
  champion: number[];
}

export interface QuoteResult {
  kind: "quotes";
  suppliers: { runId: string; slot: number; file: string; label: string }[];
  lines: QuoteLine[];
  /** lines won per supplier (ties count for each) */
  wins: number[];
}

export type CompareResult = PoResult | QuoteResult;

function num(v: unknown): number | null {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string") {
    const n = Number(v.replace(/[^0-9.,-]/g, "").replace(/,(?=\d{3}(\D|$))/g, "").replace(",", "."));
    return Number.isFinite(n) && v.trim() !== "" ? n : null;
  }
  return null;
}

function text(v: unknown): string | null {
  if (v === null || v === undefined) return null;
  const s = String(v).trim();
  return s ? s : null;
}

/** The Matcher's rule: first non-empty value of the identifier field. */
export function identifierOf(rows: Record<string, Cell>[], field: string, fallback: string): string {
  for (const r of rows) {
    const t = text(r[field]);
    if (t) return t;
  }
  return fallback;
}

/** Finds the row whose match text equals `t`, skipping rows already used. */
function takeRow(rows: Record<string, Cell>[], field: string, t: string | null, used: Set<number>): Record<string, Cell> | null {
  if (!t) return null;
  const norm = (x: unknown) => (text(x) ?? "").toLowerCase();
  const target = t.toLowerCase();
  for (let i = 0; i < rows.length; i++) {
    if (!used.has(i) && norm(rows[i][field]) === target) {
      used.add(i);
      return rows[i];
    }
  }
  return null;
}

const PRICE_TOL = 0.005; // 0.5 %
const ABS_TOL = 0.011;

function same(a: number | null, b: number | null): boolean {
  if (a === null || b === null) return a === b;
  return Math.abs(a - b) <= Math.max(ABS_TOL, Math.abs(a) * PRICE_TOL);
}

export function buildPoResult(
  output: { columns?: string[]; rows?: Record<string, unknown>[] } | null,
  docs: CompareDoc[],
  fields: CompareFields,
): PoResult {
  const ref = docs.find((d) => d.slot === 0) ?? docs[0];
  const other = docs.find((d) => d !== ref) ?? docs[1];
  const rows = output?.rows ?? [];
  const usedRef = new Set<number>();
  const usedDoc = new Set<number>();
  const q = fields.quantity;
  const lt = fields.lineTotal;
  const lines: PoLine[] = [];
  for (const r of rows) {
    const refText = text(r[`${fields.match}-${ref.label}`]);
    const docText = text(r[`${fields.match}-${other.label}`]);
    const refRow = takeRow(ref.rows, fields.match, refText, usedRef);
    const docRow = takeRow(other.rows, fields.match, docText, usedDoc);
    const refPrice = num(r[`${fields.comparison}-${ref.label}`]) ?? (refRow ? num(refRow[fields.comparison]) : null);
    const docPrice = num(r[`${fields.comparison}-${other.label}`]) ?? (docRow ? num(docRow[fields.comparison]) : null);
    const refQty = refRow && q ? num(refRow[q]) : null;
    const docQty = docRow && q ? num(docRow[q]) : null;
    const refTotal = refRow && lt ? num(refRow[lt]) : null;
    const docTotal = docRow && lt ? num(docRow[lt]) : null;
    let status: PoStatus;
    if (!docText && docPrice === null) status = "missing";
    else {
      const priceOff = !same(refPrice, docPrice);
      const qtyOff = refQty !== null && docQty !== null && !same(refQty, docQty);
      status = priceOff && qtyOff ? "both" : priceOff ? "price" : qtyOff ? "qty" : "ok";
    }
    lines.push({
      description: refText ?? docText ?? "",
      ref: refText || refRow ? { qty: refQty, price: refPrice, total: refTotal } : null,
      doc: docText || docRow ? { description: docText, qty: docQty, price: docPrice, total: docTotal } : null,
      status,
    });
  }
  // Lines on the other document the Matcher paired with nothing.
  other.rows.forEach((row, i) => {
    if (usedDoc.has(i)) return;
    const d = text(row[fields.match]);
    if (!d) return;
    lines.push({
      description: d,
      ref: null,
      doc: { description: d, qty: q ? num(row[q]) : null, price: num(row[fields.comparison]), total: lt ? num(row[lt]) : null },
      status: "extra",
    });
  });
  const summary: Record<PoStatus, number> = { ok: 0, price: 0, qty: 0, both: 0, missing: 0, extra: 0 };
  for (const l of lines) summary[l.status]++;
  const sum = (d: CompareDoc) => (lt ? d.rows.reduce((a, r) => a + (num(r[lt]) ?? 0), 0) : 0);
  return {
    kind: "po",
    docs: [ref, other].map(({ runId, slot, file, label }) => ({ runId, slot, file, label })),
    lines,
    summary,
    totals: { ref: Math.round(sum(ref) * 100) / 100, doc: Math.round(sum(other) * 100) / 100 },
  };
}

export function buildQuoteResult(
  output: { columns?: string[]; rows?: Record<string, unknown>[] } | null,
  docs: CompareDoc[],
  fields: CompareFields,
): QuoteResult {
  const suppliers = [...docs].sort((a, b) => a.slot - b.slot);
  const rows = output?.rows ?? [];
  const lines: QuoteLine[] = rows.map((r) => {
    let description = "";
    const prices = suppliers.map((s) => {
      const t = text(r[`${fields.match}-${s.label}`]);
      if (t && !description) description = t;
      return num(r[`${fields.comparison}-${s.label}`]);
    });
    // "Id" or "Id1, Id2" on ties; identifiers themselves may contain commas
    // ("Ferretería Colón, S.A."), so look for each label inside the string.
    const champ = text(r.Champion);
    const champion = champ ? suppliers.map((_, i) => i).filter((i) => champ === suppliers[i].label || champ.includes(suppliers[i].label)) : [];
    return { description, prices, champion };
  });
  const wins = suppliers.map((_, i) => lines.filter((l) => l.champion.includes(i)).length);
  return {
    kind: "quotes",
    suppliers: suppliers.map(({ runId, slot, file, label }) => ({ runId, slot, file, label })),
    lines,
    wins,
  };
}
