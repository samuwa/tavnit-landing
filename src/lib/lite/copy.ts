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
import numberFormat from "@/lib/lite/copy/number-format";
import dateFormat from "@/lib/lite/copy/date-format";

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
  "number-format": numberFormat,
  "date-format": dateFormat,
};

export const TOOL_COPY: Record<LiteToolId, Record<Locale, ToolCopy>> = Object.fromEntries(
  (Object.keys(DEFS) as LiteToolId[]).map((id) => [
    id,
    { es: buildToolCopy(BASE_ES, DEFS[id].es, LITE_LIMITS.runsPerDay), en: buildToolCopy(BASE_EN, DEFS[id].en, LITE_LIMITS.runsPerDay) },
  ]),
) as Record<LiteToolId, Record<Locale, ToolCopy>>;

export const HUB_COPY: Record<Locale, HubCopy> = {
  es: {
    title: "Herramientas gratis con IA: factura a Excel y más",
    description:
      "Herramientas gratis de un solo uso hechas con el mismo motor de Tavnit: convierte una factura en Excel y más. Sin plantillas, sin registro para ver el resultado.",
    h1: "Herramientas gratis",
    intro:
      "Cada herramienta hace una sola cosa con un documento y te muestra el resultado real. Son el mismo motor que usan las empresas que automatizan sus documentos con Tavnit, en versión de una a la vez.",
    breadcrumbHome: "Inicio",
    breadcrumbHub: "Herramientas",
    groups: { extract: "De documento a Excel", compare: "Comparar documentos", split: "Organizar escaneos", clean: "Limpiar hojas de cálculo" },
    outro: "Todas funcionan con el mismo motor que usan las empresas que automatizan sus documentos con Tavnit. Cuando quieras que pase solo, con todos tus documentos, está tu cuenta.",
    outroCta: "Crear cuenta gratis",
  },
  en: {
    title: "Free AI Document Tools: Invoice to Excel & More",
    description:
      "Free single-purpose tools built on Tavnit's own engine: turn an invoice into Excel and more. No templates, no sign-up to see the result.",
    h1: "Free tools",
    intro:
      "Each tool does one thing to one document and shows you the real result. They run on the same engine companies use to automate their documents with Tavnit, one at a time.",
    breadcrumbHome: "Home",
    breadcrumbHub: "Tools",
    groups: { extract: "Document to Excel", compare: "Compare documents", split: "Organise scans", clean: "Clean spreadsheets" },
    outro: "All of them run on the same engine companies use to automate their documents with Tavnit. When you want it to happen on its own, for all your documents, there is your account.",
    outroCta: "Create a free account",
  },
};

export interface ShellCopy {
  lite: string;
  tools: string;
  site: string;
  cta: string;
  ctaSignedIn: string;
  /** Header links to the main site. */
  nav: { product: string; productHref: string; useCases: string; useCasesHref: string; docs: string };
  demo: string;
  demoHref: string;
  signin: string;
  /** The tools menu. */
  allTools: string;
  /** Under "see all tools" in the menu card. */
  allToolsHint: string;
  groups: { extract: string; compare: string; split: string; clean: string };
  /** The account menu, once signed in. */
  account: { signedInAs: string; open: string; openHint: string; signOut: string; menu: string };
  /** The sign-in dialog opened from the header. */
  auth: { title: string; body: string; submitSignin: string; submitSignup: string };
  menu: string;
  close: string;
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
    cta: "Crear cuenta gratis",
    ctaSignedIn: "Ir a Tavnit",
    nav: { product: "Producto", productHref: "/es#como-funciona", useCases: "Casos de uso", useCasesHref: "/es/casos-de-uso", docs: "Docs" },
    demo: "Agendar demo",
    demoHref: "/es/agendar",
    signin: "Iniciar sesión",
    allTools: "Ver todas las herramientas",
    allToolsHint: "Gratis. Ves el resultado real sin registrarte; con tu cuenta te lo llevas.",
    groups: { extract: "De documento a Excel", compare: "Comparar documentos", split: "Organizar escaneos", clean: "Limpiar hojas de cálculo" },
    account: {
      signedInAs: "Conectado como",
      open: "Ir a Tavnit",
      openHint: "La plataforma completa: Flows, automatizaciones y todo tu volumen",
      signOut: "Cerrar sesión",
      menu: "Tu cuenta",
    },
    auth: {
      title: "Crea tu cuenta gratis",
      body: "La misma cuenta sirve aquí para descargar tus resultados y en Tavnit para automatizar todos tus documentos.",
      submitSignin: "Entrar",
      submitSignup: "Crear cuenta",
    },
    menu: "Menú",
    close: "Cerrar",
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
    cta: "Create free account",
    ctaSignedIn: "Go to Tavnit",
    nav: { product: "Product", productHref: "/#features", useCases: "Use cases", useCasesHref: "/use-cases", docs: "Docs" },
    demo: "Book a demo",
    demoHref: "/schedule",
    signin: "Sign in",
    allTools: "See all tools",
    allToolsHint: "Free. See the real result without signing up; take it with you with an account.",
    groups: { extract: "Document to Excel", compare: "Compare documents", split: "Organise scans", clean: "Clean spreadsheets" },
    account: {
      signedInAs: "Signed in as",
      open: "Go to Tavnit",
      openHint: "The full platform: Flows, automations and all your volume",
      signOut: "Sign out",
      menu: "Your account",
    },
    auth: {
      title: "Create your free account",
      body: "The same account downloads your results here and automates all your documents in Tavnit.",
      submitSignin: "Sign in",
      submitSignup: "Create account",
    },
    menu: "Menu",
    close: "Close",
    privacy: "Privacy",
    terms: "Terms",
    contact: "Contact",
    rights: "Tavnit. Free tools built on the product's own engine.",
    privacyHref: "/privacy",
    termsHref: "/terms",
  },
};

