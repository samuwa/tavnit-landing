/**
 * The spreadsheet tools (kind "clean"): number format and date format.
 *
 * A fixed Cleaner in the Lite org does the formatting, over ten generic
 * columns col_1..col_10. This module is the part the landing does around it,
 * shared by the server routes and the page:
 *
 *  - guess which of the visitor's columns hold numbers or dates, and how
 *    they are written (comma or point decimals, day or month first);
 *  - normalise each selected cell to what the Cleaner can read. The engine's
 *    number parser drops every comma, so "1.234,56" would become 1.23456;
 *    its date parser only reads ISO without a format. So numbers are sent as
 *    plain "1234.56" and numeric dates as "2024-03-12"; dates written in
 *    words ("12 de marzo de 2024") go as they are and the Cleaner's AI
 *    conversion reads them;
 *  - pick what goes in a cell the Cleaner must not see. The sweep rejects a
 *    file with empty cells, or cells pandas reads as missing ("N/A", "null"):
 *    they become NaN and the sweep row fails to save. Those cells get a
 *    neutral placeholder, and the visitor's original value is put back when
 *    the file is rebuilt.
 *
 * Pure functions only: safe on the server and in the browser.
 */

export type CleanMode = "number" | "date";
export type NumberInput = "comma" | "dot";
export type DateInput = "dmy" | "mdy";
export type NumberOutput = "plain" | "us" | "latam";
export type DateOutput = "iso" | "dmy" | "mdy";

export const CLEAN_SLOTS = 10;
export const CLEAN_MAX_ROWS = 500;
export const CLEAN_MAX_COLUMNS = 100;

export const NUMBER_OUTPUTS: NumberOutput[] = ["plain", "us", "latam"];
export const DATE_OUTPUTS: DateOutput[] = ["iso", "dmy", "mdy"];

/** What the Cleaner receives in a slot or cell it must not change. */
export const PLACEHOLDER: Record<CleanMode, string> = { number: "0", date: "1970-01-01" };

/** Strings pandas.read_csv turns into NaN by default: never send them. */
const PANDAS_NA = new Set([
  "", "#n/a", "#n/a n/a", "#na", "-1.#ind", "-1.#qnan", "-nan", "1.#ind", "1.#qnan",
  "<na>", "n/a", "na", "null", "nan", "none",
]);

export function isMissing(text: string): boolean {
  return PANDAS_NA.has(text.trim().toLowerCase());
}

/* ------------------------------------------------------------ numbers ---- */

const CURRENCY = /[$€£¥₡₲₱₹]|B\/\.|US\$|USD|EUR|MXN|COP|PEN|CLP|PAB|S\/\.?/gi;

/** Digits with separators, an optional sign and currency around them. */
function numberCore(text: string): { neg: boolean; body: string } | null {
  let t = text.trim();
  if (!t) return null;
  let neg = false;
  if (/^\(.*\)$/.test(t)) {
    neg = true;
    t = t.slice(1, -1);
  }
  // A percentage stays as it is: "15%" formatted as "15.00" would change its meaning.
  if (t.endsWith("%")) return null;
  t = t.replace(CURRENCY, "").trim();
  if (t.endsWith("-")) {
    neg = !neg;
    t = t.slice(0, -1).trim();
  }
  if (t.startsWith("-")) {
    neg = !neg;
    t = t.slice(1).trim();
  } else if (t.startsWith("+")) {
    t = t.slice(1).trim();
  }
  t = t.replace(/[\s  ']/g, "");
  if (!/^\d[\d.,]*$/.test(t) || !/\d$/.test(t)) return null;
  return { neg, body: t };
}

export function isNumberLike(text: string): boolean {
  return numberCore(text) !== null;
}

/** Plain machine number ("1234.56", "-15") for the Cleaner, or null when unreadable. */
export function normalizeNumber(text: string, decimal: NumberInput): string | null {
  const core = numberCore(text);
  if (!core) return null;
  const dec = decimal === "comma" ? "," : ".";
  const thou = decimal === "comma" ? "." : ",";
  let b = core.body;
  // The other separator is only ever grouping.
  b = b.split(thou).join("");
  const parts = b.split(dec);
  if (parts.length > 2) return null;
  const [int, frac] = parts;
  if (!/^\d+$/.test(int) || (frac !== undefined && !/^\d+$/.test(frac))) return null;
  const out = frac !== undefined ? `${int}.${frac}` : int;
  const n = Number(out);
  if (!Number.isFinite(n)) return null;
  return (core.neg && n !== 0 ? "-" : "") + out.replace(/^0+(?=\d)/, "");
}

/**
 * Comma or point decimals, by vote over a column's values. A value with both
 * separators is decisive (the last one is the decimal); "1,5" or "1.5" with
 * one or two digits after it points that way; "1.234" alone is ambiguous
 * and does not vote.
 */
export function guessDecimal(values: string[], fallback: NumberInput): NumberInput {
  let comma = 0;
  let dot = 0;
  for (const v of values) {
    const core = numberCore(v);
    if (!core) continue;
    const b = core.body;
    const lc = b.lastIndexOf(",");
    const ld = b.lastIndexOf(".");
    if (lc >= 0 && ld >= 0) {
      if (lc > ld) comma += 2;
      else dot += 2;
      continue;
    }
    const sep = lc >= 0 ? "," : ld >= 0 ? "." : null;
    if (!sep) continue;
    const pieces = b.split(sep);
    const tail = pieces[pieces.length - 1];
    if (pieces.length > 2) {
      // "1.234.567" / "1,234,567": the repeated one is grouping.
      if (sep === ",") dot++;
      else comma++;
    } else if (tail.length !== 3) {
      if (sep === ",") comma++;
      else dot++;
    }
  }
  if (comma === dot) return fallback;
  return comma > dot ? "comma" : "dot";
}

/* -------------------------------------------------------------- dates ---- */

const MONTH_WORD =
  /\b(ene|enero|feb|febrero|mar|marzo|abr|abril|may|mayo|jun|junio|jul|julio|ago|agosto|sep|sept|septiembre|set|setiembre|oct|octubre|nov|noviembre|dic|diciembre|jan|january|february|march|apr|april|june|july|aug|august|september|october|november|dec|december)\b/i;

const NUMERIC_DATE = /^(\d{1,4})[/.\-](\d{1,2})[/.\-](\d{1,4})(?:[ T].*)?$/;

export function isDateLike(text: string): boolean {
  const t = text.trim();
  if (!t) return false;
  const m = NUMERIC_DATE.exec(t);
  if (m) {
    const [a, , c] = [m[1], m[2], m[3]];
    return a.length === 4 || c.length === 4 || c.length === 2;
  }
  return MONTH_WORD.test(t) && /\d/.test(t) && t.length <= 40;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function iso(y: number, m: number, d: number): string | null {
  if (m < 1 || m > 12 || d < 1 || d > 31) return null;
  const dt = new Date(Date.UTC(y, m - 1, d));
  if (dt.getUTCMonth() !== m - 1 || dt.getUTCDate() !== d) return null;
  return `${y}-${pad(m)}-${pad(d)}`;
}

function fullYear(y: number, raw: string): number {
  if (raw.length === 4) return y;
  return y < 70 ? 2000 + y : 1900 + y;
}

/**
 * What the date Cleaner receives for one cell: ISO for numeric dates (read
 * with the visitor's day/month order), the text itself for dates written in
 * words (the Cleaner's AI reads those), or null when it is not a date.
 */
export function normalizeDate(text: string, order: DateInput): string | null {
  const t = text.trim();
  if (!t || isMissing(t)) return null;
  const m = NUMERIC_DATE.exec(t);
  if (m) {
    const [ra, rb, rc] = [m[1], m[2], m[3]];
    const [a, b, c] = [Number(ra), Number(rb), Number(rc)];
    if (ra.length === 4) return iso(a, b, c); // yyyy-mm-dd
    if (rc.length !== 4 && rc.length !== 2) return null;
    const y = fullYear(c, rc);
    return order === "dmy" ? iso(y, b, a) : iso(y, a, b);
  }
  if (MONTH_WORD.test(t) && /\d/.test(t) && t.length <= 40) return t;
  return null;
}

/** Day or month first, from values where one of the two parts is over 12. */
export function guessDateOrder(values: string[], fallback: DateInput): DateInput {
  let dmy = 0;
  let mdy = 0;
  for (const v of values) {
    const m = NUMERIC_DATE.exec(v.trim());
    if (!m || m[1].length === 4) continue;
    const a = Number(m[1]);
    const b = Number(m[2]);
    if (a > 12 && b <= 12) dmy++;
    else if (b > 12 && a <= 12) mdy++;
  }
  if (dmy === mdy) return fallback;
  return dmy > mdy ? "dmy" : "mdy";
}

/* ---------------------------------------------------------- detection ---- */

/** Columns worth offering: most non-empty values look like the mode's kind. */
export function suggestColumns(columns: string[], rows: string[][], mode: CleanMode): string[] {
  const test = mode === "number" ? isNumberLike : isDateLike;
  const out: string[] = [];
  columns.forEach((name, i) => {
    let seen = 0;
    let hit = 0;
    for (const r of rows) {
      const v = (r[i] ?? "").trim();
      if (!v || isMissing(v)) continue;
      seen++;
      if (test(v)) hit++;
    }
    // Numbers: a column of plain ids ("1001", "1002") is numbers too, which
    // is fine: formatting them is the visitor's call, the box can be unticked.
    if (seen > 0 && hit / seen >= 0.6) out.push(name);
  });
  return out.slice(0, CLEAN_SLOTS);
}

/** The selected columns' values, for guessing how they are written. */
export function valuesOf(columns: string[], rows: string[][], selected: string[]): string[] {
  const idx = selected.map((c) => columns.indexOf(c)).filter((i) => i >= 0);
  const out: string[] = [];
  for (const r of rows) for (const i of idx) if (r[i]) out.push(r[i]);
  return out;
}

/* ------------------------------------------------------------ outputs ---- */

export function isNumberOutput(v: unknown): v is NumberOutput {
  return typeof v === "string" && (NUMBER_OUTPUTS as string[]).includes(v);
}
export function isDateOutput(v: unknown): v is DateOutput {
  return typeof v === "string" && (DATE_OUTPUTS as string[]).includes(v);
}

/** Example shown next to each output choice. */
export const OUTPUT_EXAMPLE: Record<NumberOutput | DateOutput, string> = {
  plain: "1234.56",
  us: "1,234.56",
  latam: "1.234,56",
  iso: "2024-03-12",
  dmy: "12/03/2024",
  mdy: "03/12/2024",
};
