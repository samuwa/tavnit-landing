/**
 * Docs navigation + per-route SEO metadata.
 *
 * Single source of truth for: the sidebar order, each route's href, the
 * title/description each page emits, and which footer column links to it.
 * Pure data (no JSX) so it can be imported by both the client shell and the
 * server metadata of each route.
 *
 * `getting-started` intentionally lives at /docs rather than /docs/getting-started:
 * /docs is the URL already in the sitemap and holds whatever authority the docs
 * have, so it keeps it instead of redirecting it away.
 */

import type { Locale } from "@/lib/locale";

export type DocSlug =
  | "getting-started"
  | "flows"
  | "collections"
  | "cleaners"
  | "splitters"
  | "buckets"
  | "agents"
  | "human-in-the-loop"
  | "pipeline-map"
  | "email-integration"
  | "api-integration"
  | "webhooks"
  | "mcp-connector"
  | "user-roles";

/**
 * Which footer column links to this page.
 *
 * Required, not optional, on purpose. The footer used to hold its own hardcoded
 * copy of the docs list, so adding /docs/flows to this file put it in the
 * sidebar, sitemap and llms.txt but left it unlinked from the homepage. Making
 * every section declare a column means a new route cannot be silently orphaned
 * — TypeScript refuses to compile until it is placed.
 */
export type FooterColumn = "documentation" | "integrations";

export type DocSection = {
  slug: DocSlug;
  /** Sidebar label — short. */
  label: string;
  /** On-page <h1>. */
  heading: string;
  href: string;
  /**
   * <title>, emitted verbatim. Docs routes opt out of the root layout's
   * "%s | Tavnit" template (see meta.ts), so nothing is appended — keep each
   * one self-sufficient and under ~60 characters.
   */
  title: string;
  /** <meta name="description">. Keep under 160 characters or SERPs truncate it. */
  description: string;
  footerColumn: FooterColumn;
};

export const DOC_SECTIONS: DocSection[] = [
  {
    slug: "getting-started",
    label: "Getting Started",
    heading: "Getting Started",
    href: "/docs",
    title: "Docs — Getting Started with AI Document Extraction",
    description:
      "Set up your first Tavnit extraction flow: define the fields you want, upload a document, and get structured data back. No templates and no code required.",
    footerColumn: "documentation",
  },
  {
    slug: "flows",
    label: "Flows",
    heading: "Flows",
    href: "/docs/flows",
    title: "Flows — Define What Tavnit Extracts from Each Document",
    description:
      "Build a flow's data schema: metadata and table fields, data types, extraction hints that tell the AI where to look, and composite and multi-value fields.",
    footerColumn: "documentation",
  },
  {
    slug: "collections",
    label: "Collections",
    heading: "Collections",
    href: "/docs/collections",
    title: "Collections — Automatic Document Routing to the Right Flow",
    description:
      "Group flows and Splitters behind one endpoint. Tavnit classifies each document from its first page and routes it, with a Fallback Flow for the rest.",
    footerColumn: "documentation",
  },
  {
    slug: "cleaners",
    label: "Cleaners",
    heading: "Cleaners",
    href: "/docs/cleaners",
    title: "Cleaners — Field Type Reference for Extracted Data",
    description:
      "Every Cleaner field type: AI formatting, date and number formats, formulas, categories, lookups, currency and unit conversion, HS codes and conditions.",
    footerColumn: "documentation",
  },
  {
    slug: "splitters",
    label: "Splitters",
    heading: "Splitters",
    href: "/docs/splitters",
    title: "Splitters — Break Multi-Document PDFs into Separate Files",
    description:
      "Split a combined PDF containing several documents into its individual files automatically, then process each one through the right flow.",
    footerColumn: "integrations",
  },
  {
    slug: "buckets",
    label: "Buckets",
    heading: "Buckets",
    href: "/docs/buckets",
    title: "Buckets — Structured Storage for Extracted Document Data",
    description:
      "Store extracted results in built-in structured tables, append rows over the API, control per-bucket access, and chart the data without exporting it.",
    footerColumn: "documentation",
  },
  {
    slug: "agents",
    label: "Agents",
    heading: "Agents",
    href: "/docs/agents",
    title: "AI Browser Agents — Act on Your Extracted Document Data",
    description:
      "Give an agent a plain-language mission and a starting URL. Capture types, chaining agents to flows, file downloads, runtime limits and credit costs.",
    footerColumn: "documentation",
  },
  {
    slug: "human-in-the-loop",
    label: "Human in the Loop",
    heading: "Human in the Loop",
    href: "/docs/human-in-the-loop",
    title: "Human-in-the-Loop Review with an Append-Only Audit Trail",
    description:
      "Pause a flow for human review before results are delivered — every run, or only those a Cleaner rule flags. Assign reviewers, edit, approve or reject.",
    footerColumn: "documentation",
  },
  {
    slug: "pipeline-map",
    label: "Pipeline Map",
    heading: "Pipeline Map",
    href: "/docs/pipeline-map",
    title: "Pipeline Map — Visualise Your Document Workflow End to End",
    description:
      "See how documents move through flows, Collections, Cleaners, Splitters, review and delivery in a single visual map of your workspace.",
    footerColumn: "documentation",
  },
  {
    slug: "email-integration",
    label: "Email Integration",
    heading: "Email Integration",
    href: "/docs/email-integration",
    title: "Extract Data from Email Attachments Automatically",
    description:
      "Forward documents to a Tavnit flow, Collection or Splitter address and have every attachment extracted automatically. File types, skip reasons, output.",
    footerColumn: "integrations",
  },
  {
    slug: "api-integration",
    label: "API Integration",
    heading: "API Integration",
    href: "/docs/api-integration",
    title: "Document Extraction REST API — Python, JavaScript and No-Code",
    description:
      "Process documents with the Tavnit REST API: multipart or base64 upload, API-key auth, Python and JavaScript examples, plus Zapier, Make and n8n recipes.",
    footerColumn: "integrations",
  },
  {
    slug: "webhooks",
    label: "Webhooks",
    heading: "Webhooks",
    href: "/docs/webhooks",
    title: "Webhooks — Deliver Extracted Data to Your Systems",
    description:
      "Push extraction results to your own endpoint the moment a run completes, with retry behaviour and payload structure documented.",
    footerColumn: "integrations",
  },
  {
    slug: "mcp-connector",
    label: "MCP Connector",
    heading: "MCP Connector",
    href: "/docs/mcp-connector",
    title: "MCP Connector Setup — Connect Tavnit to Claude and Cursor",
    description:
      "Step-by-step setup for the Tavnit MCP connector: generate a connector URL, add it to claude.ai or Cursor, handle refreshes, and fix common errors.",
    footerColumn: "integrations",
  },
  {
    slug: "user-roles",
    label: "User Roles",
    heading: "User Roles",
    href: "/docs/user-roles",
    title: "User Roles — Owner, Admin and Member Permissions",
    description:
      "Owner, Admin and Member roles, what each can do across flows, Cleaners, Buckets and billing, and how per-bucket visibility and access grants layer on top.",
    footerColumn: "integrations",
  },
];

export const DOC_BY_SLUG = Object.fromEntries(
  DOC_SECTIONS.map((s) => [s.slug, s]),
) as Record<DocSlug, DocSection>;

/**
 * The Spanish docs, under /es/documentacion with Spanish slugs like the rest
 * of the Spanish site (see src/lib/locale.ts). Same slugs, same order, same
 * footer columns: only the words and the URLs change. Product names stay in
 * English (Flow, Collection, Cleaner, Splitter, Bucket, Agent, Run) because
 * that is what the app shows; "Human in the Loop" is "Revisión humana", as on
 * the rest of the Spanish site.
 */
export const DOC_SECTIONS_ES: DocSection[] = [
  {
    slug: "getting-started",
    label: "Primeros pasos",
    heading: "Primeros pasos",
    href: "/es/documentacion",
    title: "Documentación de Tavnit: primeros pasos con la extracción",
    description:
      "Crea tu primer Flow en Tavnit: define los campos que quieres, sube un documento y recibe los datos estructurados. Sin plantillas y sin programar.",
    footerColumn: "documentation",
  },
  {
    slug: "flows",
    label: "Flows",
    heading: "Flows",
    href: "/es/documentacion/flows",
    title: "Flows: define qué extrae Tavnit de cada documento",
    description:
      "Arma el esquema de un Flow: campos de metadatos y de tabla, tipos de datos, pistas de extracción para la IA y campos compuestos o de varios valores.",
    footerColumn: "documentation",
  },
  {
    slug: "collections",
    label: "Collections",
    heading: "Collections",
    href: "/es/documentacion/collections",
    title: "Collections: envía cada documento al Flow correcto",
    description:
      "Agrupa Flows y Splitters detrás de un solo punto de entrada. Tavnit clasifica cada documento por su primera página y lo enruta, con un Flow de respaldo.",
    footerColumn: "documentation",
  },
  {
    slug: "cleaners",
    label: "Cleaners",
    heading: "Cleaners",
    href: "/es/documentacion/cleaners",
    title: "Cleaners: referencia de tipos de campo para tus datos",
    description:
      "Todos los tipos de campo de un Cleaner: formato con IA, fechas y números, fórmulas, categorías, búsquedas, conversión de moneda y unidades, códigos HS.",
    footerColumn: "documentation",
  },
  {
    slug: "splitters",
    label: "Splitters",
    heading: "Splitters",
    href: "/es/documentacion/splitters",
    title: "Splitters: separa un PDF con varios documentos",
    description:
      "Separa automáticamente un PDF que junta varios documentos en archivos individuales y procesa cada uno con el Flow que le corresponde.",
    footerColumn: "integrations",
  },
  {
    slug: "buckets",
    label: "Buckets",
    heading: "Buckets",
    href: "/es/documentacion/buckets",
    title: "Buckets: tablas para guardar los datos extraídos",
    description:
      "Guarda los resultados en tablas estructuradas dentro de Tavnit, agrega filas por API, controla el acceso a cada Bucket y grafica sin exportar.",
    footerColumn: "documentation",
  },
  {
    slug: "agents",
    label: "Agents",
    heading: "Agents",
    href: "/es/documentacion/agents",
    title: "Agents: agentes de IA que actúan con tus datos",
    description:
      "Dale a un Agent una misión en lenguaje natural y una URL de inicio. Tipos de captura, Agents encadenados a Flows, descargas, límites y costo en créditos.",
    footerColumn: "documentation",
  },
  {
    slug: "human-in-the-loop",
    label: "Revisión humana",
    heading: "Revisión humana",
    href: "/es/documentacion/revision-humana",
    title: "Revisión humana con un historial de auditoría completo",
    description:
      "Detén un Flow para que una persona revise antes de entregar resultados, siempre o solo cuando un Cleaner lo marca. Asigna revisores, edita, aprueba o rechaza.",
    footerColumn: "documentation",
  },
  {
    slug: "pipeline-map",
    label: "Mapa del pipeline",
    heading: "Mapa del pipeline",
    href: "/es/documentacion/mapa-del-pipeline",
    title: "Mapa del pipeline: todo tu flujo de documentos en un vistazo",
    description:
      "Mira cómo pasan los documentos por Flows, Collections, Cleaners, Splitters, revisión y entrega en un solo mapa visual de tu espacio de trabajo.",
    footerColumn: "documentation",
  },
  {
    slug: "email-integration",
    label: "Integración por correo",
    heading: "Integración por correo",
    href: "/es/documentacion/integracion-por-correo",
    title: "Extrae datos de adjuntos de correo automáticamente",
    description:
      "Reenvía documentos a la dirección de un Flow, Collection o Splitter y cada adjunto se extrae solo. Tipos de archivo, motivos de omisión y resultados.",
    footerColumn: "integrations",
  },
  {
    slug: "api-integration",
    label: "Integración por API",
    heading: "Integración por API",
    href: "/es/documentacion/api",
    title: "API REST de extracción de documentos: Python, JS y no-code",
    description:
      "Procesa documentos con la API REST de Tavnit: subida multipart o base64, autenticación con API key, ejemplos en Python y JavaScript, y Zapier, Make y n8n.",
    footerColumn: "integrations",
  },
  {
    slug: "webhooks",
    label: "Webhooks",
    heading: "Webhooks",
    href: "/es/documentacion/webhooks",
    title: "Webhooks: envía los datos extraídos a tus sistemas",
    description:
      "Recibe los resultados en tu propio endpoint en cuanto termina un Run, con los reintentos y la estructura del payload documentados.",
    footerColumn: "integrations",
  },
  {
    slug: "mcp-connector",
    label: "Conector MCP",
    heading: "Conector MCP",
    href: "/es/documentacion/conector-mcp",
    title: "Conector MCP: conecta Tavnit con Claude y Cursor",
    description:
      "Configura paso a paso el conector MCP de Tavnit: genera la URL del conector, agrégala a claude.ai o Cursor, renuévala y resuelve los errores comunes.",
    footerColumn: "integrations",
  },
  {
    slug: "user-roles",
    label: "Roles de usuario",
    heading: "Roles de usuario",
    href: "/es/documentacion/roles-de-usuario",
    title: "Roles de usuario: permisos de Owner, Admin y Member",
    description:
      "Los roles Owner, Admin y Member, qué puede hacer cada uno en Flows, Cleaners, Buckets y facturación, y cómo se suman los permisos por Bucket.",
    footerColumn: "integrations",
  },
];

export const DOC_BY_SLUG_ES = Object.fromEntries(
  DOC_SECTIONS_ES.map((s) => [s.slug, s]),
) as Record<DocSlug, DocSection>;

/** The docs list for a locale, in sidebar order. */
export function docSections(locale: Locale): DocSection[] {
  return locale === "es" ? DOC_SECTIONS_ES : DOC_SECTIONS;
}

export function docSection(slug: DocSlug, locale: Locale): DocSection {
  return (locale === "es" ? DOC_BY_SLUG_ES : DOC_BY_SLUG)[slug];
}

/** Docs home for a locale. */
export const DOCS_HOME: Record<Locale, string> = { en: "/docs", es: "/es/documentacion" };

/** Docs routes for a given footer column, in sidebar order. */
export function docsForFooterColumn(column: FooterColumn, locale: Locale = "en"): DocSection[] {
  return docSections(locale).filter((s) => s.footerColumn === column);
}
