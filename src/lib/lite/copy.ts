import type { Locale } from "@/lib/locale";
import { LITE_LIMITS, type LiteToolId } from "@/lib/lite/tools";
import { BASE_EN, BASE_ES, buildToolCopy, type HubCopy, type ToolCopy, type ToolCopyDef } from "@/lib/lite/copy-base";
import invoiceToExcel from "@/lib/lite/copy/invoice-to-excel";
import invoiceLineItems from "@/lib/lite/copy/invoice-line-items";
import poInvoiceCheck from "@/lib/lite/copy/po-invoice-check";
import splitScannedPdf from "@/lib/lite/copy/split-scanned-pdf";
import packingListToExcel from "@/lib/lite/copy/packing-list-to-excel";
import billOfLadingToExcel from "@/lib/lite/copy/bill-of-lading-to-excel";
import quoteComparison from "@/lib/lite/copy/quote-comparison";
import contractDates from "@/lib/lite/copy/contract-dates";
import receiptToExcel from "@/lib/lite/copy/receipt-to-excel";

/**
 * Copy for the free tools. The base (copy-base.ts) is one complete tool
 * written with document tokens; each tool under ./copy/ supplies its words
 * and only the strings that differ. HUB_COPY and SHELL_COPY are shared.
 */

export type { HubCopy, ToolCopy, ToolCopyDef } from "@/lib/lite/copy-base";
export { AUTH_SIGNUP_CTA_APP } from "@/lib/lite/copy-base";

const DEFS: Record<LiteToolId, Record<Locale, ToolCopyDef>> = {
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

export const TOOL_COPY: Record<LiteToolId, Record<Locale, ToolCopy>> = Object.fromEntries(
  (Object.keys(DEFS) as LiteToolId[]).map((id) => [
    id,
    { es: buildToolCopy(BASE_ES, DEFS[id].es, LITE_LIMITS.runsPerDay), en: buildToolCopy(BASE_EN, DEFS[id].en, LITE_LIMITS.runsPerDay) },
  ]),
) as Record<LiteToolId, Record<Locale, ToolCopy>>;

export const HUB_COPY: Record<Locale, HubCopy> = {
  es: {
    title: "Herramientas gratis: factura a Excel y más, con la IA de Tavnit",
    description:
      "Herramientas gratis de un solo uso hechas con el mismo motor de Tavnit: convierte una factura en Excel y más. Sin plantillas, sin registro para ver el resultado.",
    h1: "Herramientas gratis",
    intro:
      "Cada herramienta hace una sola cosa con un documento y te muestra el resultado real. Son el mismo motor que usan las empresas que automatizan sus documentos con Tavnit, en versión de una a la vez.",
    breadcrumbHome: "Inicio",
    breadcrumbHub: "Herramientas",
  },
  en: {
    title: "Free tools: invoice to Excel and more, powered by Tavnit's AI",
    description:
      "Free single-purpose tools built on Tavnit's own engine: turn an invoice into Excel and more. No templates, no sign-up to see the result.",
    h1: "Free tools",
    intro:
      "Each tool does one thing to one document and shows you the real result. They run on the same engine companies use to automate their documents with Tavnit, one at a time.",
    breadcrumbHome: "Home",
    breadcrumbHub: "Tools",
  },
};

export interface ShellCopy {
  lite: string;
  tools: string;
  site: string;
  cta: string;
  ctaSignedIn: string;
  privacy: string;
  terms: string;
  contact: string;
  rights: string;
  privacyHref: string;
  termsHref: string;
}

export const SHELL_COPY: Record<Locale, ShellCopy> = {
  es: {
    lite: "Lite",
    tools: "Herramientas",
    site: "Conoce Tavnit",
    cta: "Crear cuenta",
    ctaSignedIn: "Abrir mi cuenta",
    privacy: "Privacidad",
    terms: "Términos",
    contact: "Contacto",
    rights: "Tavnit. Herramientas gratis hechas con el mismo motor del producto.",
    privacyHref: "/es/privacidad",
    termsHref: "/es/terminos",
  },
  en: {
    lite: "Lite",
    tools: "Tools",
    site: "About Tavnit",
    cta: "Create account",
    ctaSignedIn: "Open my account",
    privacy: "Privacy",
    terms: "Terms",
    contact: "Contact",
    rights: "Tavnit. Free tools built on the product's own engine.",
    privacyHref: "/privacy",
    termsHref: "/terms",
  },
};

