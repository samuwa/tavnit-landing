import type { Locale } from "@/lib/locale";

/**
 * Registry of Tavnit Lite tools.
 *
 * A Lite tool is a preconfigured resource (today: a Flow) that lives inside
 * the dedicated "Tavnit Lite" org in the product, exposed on the public site
 * as a single-purpose page in each language. This file is shared by server
 * and client code, so it holds no secrets: the org API key and the flow ids
 * come from the environment and are only read in server modules.
 *
 * Adding a tool = one entry here + one copy block in copy.ts + two thin
 * pages. The API routes, quota, ownership and Excel export are generic.
 */

export type LiteToolId = "invoice-to-excel";

export interface LiteTool {
  id: LiteToolId;
  /** Env vars holding the flow id in the Lite org, one per language (the
   *  field names are the column names the visitor sees). A missing English
   *  id falls back to the Spanish flow. */
  flowEnv: Record<Locale, string>;
  paths: Record<Locale, string>;
  /** Column order for the table and the Excel: the flow's fields, header
   *  first, then line items. The backend returns rows with keys sorted
   *  alphabetically when the flow stamps no order, and "cantidad" before
   *  "proveedor" reads like a database, not an invoice. Unknown columns
   *  (a renamed field) still show, after these. */
  columnOrder: Record<Locale, string[]>;
  /** Bundled sample document (under /public) so visitors can try without a file. */
  samplePath?: string;
}

export const LITE_TOOLS: Record<LiteToolId, LiteTool> = {
  "invoice-to-excel": {
    id: "invoice-to-excel",
    flowEnv: { es: "TAVNIT_LITE_INVOICE_FLOW_ID", en: "TAVNIT_LITE_INVOICE_FLOW_ID_EN" },
    paths: { en: "/tools/invoice-to-excel", es: "/es/herramientas/factura-a-excel" },
    columnOrder: {
      es: ["proveedor", "ruc_proveedor", "numero_factura", "fecha", "moneda", "descripcion", "cantidad", "unidad", "precio_unitario", "total_linea", "subtotal", "impuesto", "total"],
      en: ["vendor", "vendor_tax_id", "invoice_number", "invoice_date", "currency", "description", "quantity", "unit", "unit_price", "line_total", "subtotal", "tax", "total"],
    },
    samplePath: "lite/sample-invoice.pdf",
  },
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
  /** Runs per anonymous session and per IP per UTC day. */
  runsPerDay: 3,
  /** Pages per document (credits are charged per page in the Lite org). */
  maxPages: 5,
  maxBytes: 10 * 1024 * 1024,
  /** Rows returned to the browser / written to the Excel. */
  maxRows: 500,
  /** Global runs per day across all visitors — env LITE_DAILY_CAP overrides. */
  dailyCapDefault: 500,
} as const;

export const LITE_ACCEPT = "application/pdf,image/png,image/jpeg";
