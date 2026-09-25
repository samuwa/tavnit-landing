import "server-only";

import { strFromU8, unzipSync } from "fflate";
import { CLEAN_MAX_COLUMNS, CLEAN_MAX_ROWS } from "@/lib/lite/clean";

/**
 * Reads the visitor's spreadsheet for the clean tools: CSV (comma, semicolon
 * or tab separated, as Excel exports them in each locale) or .xlsx. Legacy
 * .xls is refused with its own message rather than half-read.
 *
 * Cells come back as text plus what they already are. An .xlsx cell stored
 * as a number is a number whatever the visitor says about commas, and one
 * with a date style is a date; both are rendered in machine form ("1234.5",
 * "2024-03-12") so the normalisers never re-read them as text.
 *
 * No library with open advisories: fflate (already used for the Excel
 * export) and a small XML reader over the four parts a worksheet needs.
 */

export type CellKind = "text" | "number" | "date";
export interface SheetCell {
  text: string;
  kind: CellKind;
}
export interface Sheet {
  columns: string[];
  rows: SheetCell[][];
}

export type SheetErrorCode = "unsupported" | "unreadable" | "empty" | "too_many_rows" | "too_many_columns" | "xls";
export class SheetError extends Error {
  constructor(public readonly code: SheetErrorCode) {
    super(code);
  }
}

export type SheetFormat = "csv" | "xlsx";

/** From the bytes, never the name: zip → xlsx, OLE → legacy xls, text → CSV. */
export function sniffSheet(bytes: Uint8Array): SheetFormat {
  if (bytes.length < 2) throw new SheetError("empty");
  if (bytes[0] === 0x50 && bytes[1] === 0x4b) return "xlsx";
  if (bytes[0] === 0xd0 && bytes[1] === 0xcf && bytes[2] === 0x11 && bytes[3] === 0xe0) throw new SheetError("xls");
  // Anything with NUL bytes near the start is binary, not a CSV.
  const head = bytes.subarray(0, Math.min(bytes.length, 4096));
  for (const b of head) if (b === 0) throw new SheetError("unsupported");
  return "csv";
}

export function readSheet(bytes: Uint8Array): Sheet {
  const format = sniffSheet(bytes);
  const grid = format === "xlsx" ? readXlsx(bytes) : readCsv(decodeText(bytes));
  return toSheet(grid);
}

/* ---------------------------------------------------------------- CSV ---- */

function decodeText(bytes: Uint8Array): string {
  let text: string;
  try {
    text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    // Excel on Windows still writes CSV in the ANSI code page.
    text = new TextDecoder("windows-1252").decode(bytes);
  }
  return text.replace(/^﻿/, "");
}

function detectDelimiter(text: string): string {
  const firstLine = text.slice(0, text.search(/\r?\n/) >= 0 ? text.search(/\r?\n/) : text.length);
  let best = ",";
  let bestCount = -1;
  for (const d of [",", ";", "\t", "|"]) {
    let count = 0;
    let quoted = false;
    for (const ch of firstLine) {
      if (ch === '"') quoted = !quoted;
      else if (ch === d && !quoted) count++;
    }
    if (count > bestCount) {
      best = d;
      bestCount = count;
    }
  }
  return best;
}

function readCsv(text: string): SheetCell[][] {
  const delim = detectDelimiter(text);
  const rows: SheetCell[][] = [];
  let row: SheetCell[] = [];
  let field = "";
  let quoted = false;
  let i = 0;
  const push = () => {
    row.push({ text: field, kind: "text" });
    field = "";
  };
  while (i < text.length) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        quoted = false;
      } else field += ch;
      i++;
      continue;
    }
    if (ch === '"' && field === "") {
      quoted = true;
    } else if (ch === delim) {
      push();
    } else if (ch === "\n" || ch === "\r") {
      push();
      rows.push(row);
      row = [];
      if (ch === "\r" && text[i + 1] === "\n") i++;
      if (rows.length > CLEAN_MAX_ROWS + 1) throw new SheetError("too_many_rows");
    } else field += ch;
    i++;
  }
  if (field !== "" || row.length) {
    push();
    rows.push(row);
  }
  return rows;
}

/* --------------------------------------------------------------- XLSX ---- */

const XML_ENTITY: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" };

function unescapeXml(s: string): string {
  return s.replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos);/gi, (_, e: string) => {
    if (e[0] === "#") {
      const code = e[1] === "x" || e[1] === "X" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : "";
    }
    return XML_ENTITY[e.toLowerCase()] ?? "";
  });
}

/** Text of every <t> in an element (a shared or inline string, rich runs included). */
function textOf(xml: string): string {
  let out = "";
  const re = /<t(?:\s[^>]*)?>([\s\S]*?)<\/t>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml))) out += unescapeXml(m[1]);
  return out;
}

const BUILTIN_DATE_FORMATS = new Set([14, 15, 16, 17, 18, 19, 20, 21, 22, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 45, 46, 47, 50, 51, 52, 53, 54, 55, 56, 57, 58]);

/** Style indexes (cellXfs order) whose number format is a date. */
function dateStyles(stylesXml: string | null): Set<number> {
  const out = new Set<number>();
  if (!stylesXml) return out;
  const custom = new Map<number, string>();
  for (const m of stylesXml.matchAll(/<numFmt\b[^>]*numFmtId="(\d+)"[^>]*formatCode="([^"]*)"/g)) {
    custom.set(Number(m[1]), unescapeXml(m[2]));
  }
  const isDateCode = (code: string) => {
    const bare = code.replace(/"[^"]*"|\[[^\]]*\]|\\./g, "");
    return /[dmy]/i.test(bare) && !/0\.0|#/.test(bare);
  };
  const xfs = /<cellXfs\b[^>]*>([\s\S]*?)<\/cellXfs>/.exec(stylesXml)?.[1] ?? "";
  let i = 0;
  for (const m of xfs.matchAll(/<xf\b([^>]*)\/?>/g)) {
    const id = Number(/numFmtId="(\d+)"/.exec(m[1])?.[1] ?? "0");
    if (BUILTIN_DATE_FORMATS.has(id) || (custom.has(id) && isDateCode(custom.get(id)!))) out.add(i);
    i++;
  }
  return out;
}

function serialToIso(serial: number): string {
  // Excel's 1900 date system, with its phantom 29 Feb 1900 folded in.
  const ms = Math.round((serial - 25569) * 86400 * 1000);
  const d = new Date(ms);
  const date = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
  const secs = d.getUTCHours() * 3600 + d.getUTCMinutes() * 60 + d.getUTCSeconds();
  if (!secs) return date;
  return `${date} ${String(d.getUTCHours()).padStart(2, "0")}:${String(d.getUTCMinutes()).padStart(2, "0")}`;
}

function colIndex(ref: string): number {
  const letters = /^[A-Z]+/.exec(ref)?.[0] ?? "A";
  let n = 0;
  for (const ch of letters) n = n * 26 + (ch.charCodeAt(0) - 64);
  return n - 1;
}

function readXlsx(bytes: Uint8Array): SheetCell[][] {
  let files: Record<string, Uint8Array>;
  try {
    // Only the parts a worksheet needs, and none that inflate past 20 MB:
    // a zip bomb stops here instead of in memory.
    files = unzipSync(bytes, {
      filter: (f) =>
        f.originalSize < 20 * 1024 * 1024 &&
        (f.name === "xl/workbook.xml" ||
          f.name === "xl/_rels/workbook.xml.rels" ||
          f.name === "xl/sharedStrings.xml" ||
          f.name === "xl/styles.xml" ||
          f.name.startsWith("xl/worksheets/sheet")),
    });
  } catch {
    throw new SheetError("unreadable");
  }
  const str = (name: string) => (files[name] ? strFromU8(files[name]) : null);

  // The first sheet in workbook order, through its relationship id.
  const workbook = str("xl/workbook.xml");
  const rels = str("xl/_rels/workbook.xml.rels");
  let sheetPath = "xl/worksheets/sheet1.xml";
  const firstRid = workbook ? /<sheet\b[^>]*r:id="([^"]+)"/.exec(workbook)?.[1] : undefined;
  if (firstRid && rels) {
    const target = new RegExp(`<Relationship\\b[^>]*Id="${firstRid}"[^>]*Target="([^"]+)"`).exec(rels)?.[1]
      ?? new RegExp(`<Relationship\\b[^>]*Target="([^"]+)"[^>]*Id="${firstRid}"`).exec(rels)?.[1];
    if (target) sheetPath = target.startsWith("/") ? target.slice(1) : `xl/${target.replace(/^\.\//, "")}`;
  }
  const sheet = str(sheetPath);
  if (!sheet) throw new SheetError("unreadable");

  const shared: string[] = [];
  const sst = str("xl/sharedStrings.xml");
  if (sst) for (const m of sst.matchAll(/<si>([\s\S]*?)<\/si>/g)) shared.push(textOf(m[1]));
  const dates = dateStyles(str("xl/styles.xml"));

  const rows: SheetCell[][] = [];
  for (const rm of sheet.matchAll(/<row\b[^>]*>([\s\S]*?)<\/row>|<row\b[^>]*\/>/g)) {
    const row: SheetCell[] = [];
    const body = rm[1] ?? "";
    for (const cm of body.matchAll(/<c\b([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g)) {
      const attrs = cm[1];
      const inner = cm[2] ?? "";
      const ref = /\br="([A-Z]+\d+)"/.exec(attrs)?.[1];
      const idx = ref ? colIndex(ref) : row.length;
      if (idx >= CLEAN_MAX_COLUMNS) throw new SheetError("too_many_columns");
      const t = /\bt="([^"]+)"/.exec(attrs)?.[1];
      const s = Number(/\bs="(\d+)"/.exec(attrs)?.[1] ?? "-1");
      const v = /<v>([\s\S]*?)<\/v>/.exec(inner)?.[1];
      let cell: SheetCell;
      if (t === "s") cell = { text: shared[Number(v)] ?? "", kind: "text" };
      else if (t === "inlineStr") cell = { text: textOf(inner), kind: "text" };
      else if (t === "str" || t === "e") cell = { text: v !== undefined ? unescapeXml(v) : "", kind: "text" };
      else if (t === "b") cell = { text: v === "1" ? "TRUE" : "FALSE", kind: "text" };
      else if (v !== undefined && v !== "") {
        const n = Number(v);
        if (Number.isFinite(n) && dates.has(s)) cell = { text: serialToIso(n), kind: "date" };
        else if (Number.isFinite(n)) cell = { text: String(n), kind: "number" };
        else cell = { text: unescapeXml(v), kind: "text" };
      } else cell = { text: "", kind: "text" };
      while (row.length < idx) row.push({ text: "", kind: "text" });
      row[idx] = cell;
    }
    rows.push(row);
    if (rows.length > CLEAN_MAX_ROWS + 1) throw new SheetError("too_many_rows");
  }
  return rows;
}

/* ------------------------------------------------------------- shared ---- */

/** First non-empty row is the header; trailing empty rows and columns go. */
function toSheet(grid: SheetCell[][]): Sheet {
  const nonEmpty = (r: SheetCell[]) => r.some((c) => c.text.trim() !== "");
  const start = grid.findIndex(nonEmpty);
  if (start < 0) throw new SheetError("empty");
  const body = grid.slice(start + 1);
  while (body.length && !nonEmpty(body[body.length - 1])) body.pop();
  if (!body.length) throw new SheetError("empty");
  if (body.length > CLEAN_MAX_ROWS) throw new SheetError("too_many_rows");

  const headerCells = grid[start];
  const width = Math.max(headerCells.length, ...body.map((r) => r.length));
  if (width > CLEAN_MAX_COLUMNS) throw new SheetError("too_many_columns");

  // Headers must be unique and non-empty to be chosen by name.
  const seen = new Map<string, number>();
  const columns = Array.from({ length: width }, (_, i) => {
    const base = (headerCells[i]?.text ?? "").trim() || `Col ${i + 1}`;
    const n = (seen.get(base) ?? 0) + 1;
    seen.set(base, n);
    return n === 1 ? base : `${base} (${n})`;
  });
  const rows = body.map((r) => Array.from({ length: width }, (_, i) => r[i] ?? { text: "", kind: "text" as const }));
  return { columns, rows };
}
