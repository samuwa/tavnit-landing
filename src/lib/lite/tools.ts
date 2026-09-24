import type { Locale } from "@/lib/locale";
import invoiceToExcel from "@/lib/lite/defs/invoice-to-excel";
import invoiceLineItems from "@/lib/lite/defs/invoice-line-items";
import poInvoiceCheck from "@/lib/lite/defs/po-invoice-check";
import splitScannedPdf from "@/lib/lite/defs/split-scanned-pdf";
import packingListToExcel from "@/lib/lite/defs/packing-list-to-excel";
import billOfLadingToExcel from "@/lib/lite/defs/bill-of-lading-to-excel";
import quoteComparison from "@/lib/lite/defs/quote-comparison";
import contractDates from "@/lib/lite/defs/contract-dates";
import receiptToExcel from "@/lib/lite/defs/receipt-to-excel";

/**
 * Registry of Tavnit Lite tools.
 *
 * A Lite tool is a preconfigured resource inside the dedicated "Tavnit Lite"
 * org in the product — a Flow, a Matcher on top of a Flow, or a Splitter —
 * exposed on the public site as a single-purpose page in each language.
 * This file is shared by server and client code, so it holds no secrets:
 * the org API key comes from the environment and is only read in server
 * modules. Resource ids are not secrets; each tool's definition file
 * (./defs/<tool>.ts) carries them, and an env var of the same name
 * overrides them per environment.
 *
 * Adding a tool = one definition file here + one copy file in ./copy + two
 * thin pages. Routes, quota, ownership and Excel export are generic per kind.
 */

export type LiteToolId =
  | "invoice-to-excel"
  | "invoice-line-items"
  | "po-invoice-check"
  | "split-scanned-pdf"
  | "packing-list-to-excel"
  | "bill-of-lading-to-excel"
  | "quote-comparison"
  | "contract-dates"
  | "receipt-to-excel";

/**
 *  extract — one document through a Flow, out comes a table (Excel).
 *  compare — two or more documents through the same Flow, then a Matcher
 *            pairs their lines (PO vs invoice, quotes side by side).
 *  split   — one bundle through a Splitter, out come the documents inside.
 */
export type LiteToolKind = "extract" | "compare" | "split";

/** An id per language: the value in code, and the env var that overrides it. */
export interface LocalizedId {
  env: Record<Locale, string>;
  /** Filled in once the resource exists in the Lite org; null until then. */
  value: Record<Locale, string | null>;
}

/** Field names of a compare tool's flow, as the Matcher needs them. */
export interface CompareFields {
  /** metadata field that names each document (document number, supplier) */
  identifier: string;
  /** table field the lines are paired on (description) */
  match: string;
  /** numeric table field compared (unit price) */
  comparison: string;
  /** table fields shown next to the comparison when present */
  quantity?: string;
  lineTotal?: string;
}

export interface LiteTool {
  id: LiteToolId;
  kind: LiteToolKind;
  paths: Record<Locale, string>;
  /** The commercial pages this tool feeds, by English slug; the Spanish
   *  twins resolve through the data files (see ./related.ts). A tool page
   *  links to them and they link back with "try it free", so a visitor who
   *  arrives on the tool can find the product and vice versa. */
  related?: { useCase?: string; guide?: string };
  /** The Flow in the Lite org (extract and compare tools). Its field names
   *  are the column names the visitor sees; a missing English id falls back
   *  to the Spanish flow. */
  flow?: LocalizedId;
  /** Column order for the table and the Excel: the flow's fields, header
   *  first, then line items. The backend returns rows with keys sorted
   *  alphabetically when the flow stamps no order. Unknown columns (a
   *  renamed field) still show, after these. */
  columnOrder: Record<Locale, string[]>;
  /** The flow's table fields (one value per line); the rest of the columns
   *  are metadata fields, repeated on every row. */
  lineFields: Record<Locale, string[]>;
  /** Bundled sample document(s) under /public so visitors can try without a
   *  file. Compare tools list one per slot, in slot order. */
  samplePaths?: string[];
  /** Pages per document for this tool (default LITE_LIMITS.maxPages). */
  maxPages?: number;
  /** compare tools only */
  compare?: {
    /** The Matcher in the Lite org, one per language (same flow as `flow`). */
    matcher: LocalizedId;
    /** How many documents the visitor uploads. */
    minDocs: number;
    maxDocs: number;
    /** benchmark: slot 0 is the reference (the PO); multilateral: all against all. */
    mode: "benchmark" | "multilateral";
    /** The flow's field names the Matcher is configured with, per language. */
    fields: Record<Locale, CompareFields>;
  };
  /** split tools only */
  split?: {
    /** The Splitter in the Lite org (language-neutral: it classifies by description). */
    splitter: { env: string; value: string | null };
  };
}

export const LITE_TOOLS: Record<LiteToolId, LiteTool> = {
  "invoice-to-excel": invoiceToExcel,
  "invoice-line-items": invoiceLineItems,
  "po-invoice-check": poInvoiceCheck,
  "split-scanned-pdf": splitScannedPdf,
  "packing-list-to-excel": packingListToExcel,
  "bill-of-lading-to-excel": billOfLadingToExcel,
  "quote-comparison": quoteComparison,
  "contract-dates": contractDates,
  "receipt-to-excel": receiptToExcel,
};

export const LITE_TOOL_IDS = Object.keys(LITE_TOOLS) as LiteToolId[];

export function isLiteToolId(v: unknown): v is LiteToolId {
  return typeof v === "string" && v in LITE_TOOLS;
}

/** Hub pages. */
export const LITE_HUB_PATHS: Record<Locale, string> = {
  en: "/tools",
  es: "/es/herramientas",
};

/**
 * Free-tier limits. They are the product decision, not a technical one: the
 * result is the real thing, what is capped is volume.
 */
export const LITE_LIMITS = {
  /** Documents per anonymous session and per IP per UTC day (a comparison
   *  of two documents counts two) — env LITE_RUNS_PER_DAY overrides. */
  runsPerDay: 5,
  /** Pages per document (credits are charged per page in the Lite org). */
  maxPages: 5,
  /** Pages per bundle for the splitter: splitting one page is no demo. */
  maxPagesSplit: 12,
  maxBytes: 10 * 1024 * 1024,
  /** Rows returned to the browser / written to the Excel. */
  maxRows: 500,
  /** Global documents per day across all visitors — env LITE_DAILY_CAP overrides. */
  dailyCapDefault: 500,
} as const;

export const LITE_ACCEPT = "application/pdf,image/png,image/jpeg";
