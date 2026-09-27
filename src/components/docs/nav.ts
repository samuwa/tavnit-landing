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
  | "user-roles"
  | "credits"
  | "subjects"
  | "matchers"
  | "inspectors"
  | "fillers"
  | "pipelines"
  | "signals"
  | "nets";

/**
 * Sidebar groups, the same layers as the app's own sidebar (input,
 * processing, intelligence, data...) so the docs teach the product's map.
 */
export type DocGroup =
  | "start"
  | "orchestration"
  | "input"
  | "processing"
  | "intelligence"
  | "verticals"
  | "data"
  | "integrate"
  | "organization";

export const DOC_GROUP_LABELS: Record<Locale, Record<DocGroup, string>> = {
  en: {
    start: "Get started",
    orchestration: "Orchestration",
    input: "Input",
    processing: "Processing",
    intelligence: "Intelligence",
    verticals: "Audio & social",
    data: "Data & review",
    integrate: "Integrations",
    organization: "Organization",
  },
  es: {
    start: "Empezar",
    orchestration: "Orquestación",
    input: "Entrada",
    processing: "Procesamiento",
    intelligence: "Inteligencia",
    verticals: "Audio y social",
    data: "Datos y revisión",
    integrate: "Integraciones",
    organization: "Organización",
  },
};

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
  group: DocGroup;
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
    group: "start",
    label: "Getting Started",
    heading: "Getting Started",
    href: "/docs",
    title: "Docs — Getting Started with AI Document Extraction",
    description:
      "Set up your first Tavnit extraction flow: define the fields you want, upload a document, and get structured data back. No templates and no code required.",
    footerColumn: "documentation",
  },
  {
    slug: "credits",
    group: "start",
    label: "Credits & Billing",
    heading: "Credits & Billing",
    href: "/docs/credits",
    title: "Credits — What Each Tavnit Feature Costs and How Billing Works",
    description:
      "How Tavnit credits work: the price of each step (extraction, routing, splits, sweeps, agents, matchers and more), when you are charged and how to top up.",
    footerColumn: "documentation",
  },
  {
    slug: "pipelines",
    group: "orchestration",
    label: "Pipelines",
    heading: "Pipelines",
    href: "/docs/pipelines",
    title: "Pipelines — Chain Tavnit Steps End to End on a Canvas",
    description:
      "Connect splitters, collections, flows, agents, buckets, matchers, inspectors and fillers on one canvas, or describe the pipeline in plain language.",
    footerColumn: "documentation",
  },
  {
    slug: "pipeline-map",
    group: "orchestration",
    label: "Pipeline Map",
    heading: "Pipeline Map",
    href: "/docs/pipeline-map",
    title: "Pipeline Map — Visualise Your Document Workflow End to End",
    description:
      "See how documents move through Splitters, Collections, flows, Cleaners, agents, matchers, inspectors, fillers, Signals and Buckets in one map.",
    footerColumn: "documentation",
  },
  {
    slug: "collections",
    group: "input",
    label: "Collections",
    heading: "Collections",
    href: "/docs/collections",
    title: "Collections — Automatic Document Routing to the Right Flow",
    description:
      "Group flows and Splitters behind one endpoint. Tavnit classifies each document from its first page and routes it, with a Fallback Flow for the rest.",
    footerColumn: "documentation",
  },
  {
    slug: "subjects",
    group: "input",
    label: "Subjects",
    heading: "Subjects",
    href: "/docs/subjects",
    title: "Subjects — Group Documents into Cases Automatically",
    description:
      "Model entities like purchases or patients, collect their documents into Cases by reference ID or intake email, and run checks on each case.",
    footerColumn: "documentation",
  },
  {
    slug: "splitters",
    group: "input",
    label: "Splitters",
    heading: "Splitters",
    href: "/docs/splitters",
    title: "Splitters — Break Multi-Document PDFs into Separate Files",
    description:
      "Split a combined PDF containing several documents into its individual files automatically, then process each one through the right flow.",
    footerColumn: "integrations",
  },
  {
    slug: "flows",
    group: "processing",
    label: "Flows",
    heading: "Flows",
    href: "/docs/flows",
    title: "Flows — Define What Tavnit Extracts from Each Document",
    description:
      "Build a flow's data schema: metadata and table fields, data types, extraction hints that tell the AI where to look, and composite and multi-value fields.",
    footerColumn: "documentation",
  },
  {
    slug: "cleaners",
    group: "processing",
    label: "Cleaners",
    heading: "Cleaners",
    href: "/docs/cleaners",
    title: "Cleaners — Field Type Reference for Extracted Data",
    description:
      "Every Cleaner field type, from AI formatting, dates and formulas to lookups, currency, HS codes, Human Input, anomaly checks and date calculations.",
    footerColumn: "documentation",
  },
  {
    slug: "agents",
    group: "processing",
    label: "Agents",
    heading: "Agents",
    href: "/docs/agents",
    title: "AI Browser Agents — Act on Your Extracted Document Data",
    description:
      "Give an agent a plain-language mission and a starting URL. Capture types, chaining agents to flows, file downloads, runtime limits and credit costs.",
    footerColumn: "documentation",
  },
  {
    slug: "matchers",
    group: "intelligence",
    label: "Matchers",
    heading: "Matchers",
    href: "/docs/matchers",
    title: "Matchers — Compare Quotes, Invoices and Orders Line by Line",
    description:
      "Match line items across documents semantically, compare prices or quantities, pick a champion and review the result. Benchmark and multilateral modes.",
    footerColumn: "documentation",
  },
  {
    slug: "inspectors",
    group: "intelligence",
    label: "Inspectors",
    heading: "Inspectors",
    href: "/docs/inspectors",
    title: "Inspectors — Deterministic Compliance Checks Across Documents",
    description:
      "Build a checklist over a set of related documents and get a pass or fail verdict every time: dates, cross-document comparisons, patterns and AI checks.",
    footerColumn: "documentation",
  },
  {
    slug: "fillers",
    group: "intelligence",
    label: "Fillers",
    heading: "Fillers",
    href: "/docs/fillers",
    title: "Fillers — Fill PDF Forms from Extracted Document Data",
    description:
      "Map fillable PDF templates to data extracted from your documents and produce completed forms automatically, with optional human review.",
    footerColumn: "documentation",
  },
  {
    slug: "signals",
    group: "verticals",
    label: "Signals",
    heading: "Signals",
    href: "/docs/signals",
    title: "Signals — Turn Recorded Conversations into Structured Data",
    description:
      "Configure a Signal to structure audio conversations into rows: members, recorders, the Waves each recording produces and where the data goes.",
    footerColumn: "documentation",
  },
  {
    slug: "nets",
    group: "verticals",
    label: "Nets",
    heading: "Nets",
    href: "/docs/nets",
    title: "Nets — Structure Social Media Posts into Data (Beta)",
    description:
      "Point a Net at social media sources, test it, and turn each catch of posts into structured rows and trends you can store and analyse.",
    footerColumn: "documentation",
  },
  {
    slug: "buckets",
    group: "data",
    label: "Buckets",
    heading: "Buckets",
    href: "/docs/buckets",
    title: "Buckets — Structured Storage for Extracted Document Data",
    description:
      "Store extracted results in built-in structured tables, append rows over the API, control per-bucket access, and chart the data without exporting it.",
    footerColumn: "documentation",
  },
  {
    slug: "human-in-the-loop",
    group: "data",
    label: "Human in the Loop",
    heading: "Human in the Loop",
    href: "/docs/human-in-the-loop",
    title: "Human-in-the-Loop Review with an Append-Only Audit Trail",
    description:
      "Pause a flow for human review before results are delivered — every run, or only those a Cleaner rule flags. Assign reviewers, edit, approve or reject.",
    footerColumn: "documentation",
  },
  {
    slug: "email-integration",
    group: "integrate",
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
    group: "integrate",
    label: "API Integration",
    heading: "API Integration",
    href: "/docs/api-integration",
    title: "Document Extraction REST API — Python, JavaScript and No-Code",
    description:
      "The Tavnit REST API reference: every endpoint for flows, collections, splitters, cleaners, buckets, agents, pipelines and more, plus no-code recipes.",
    footerColumn: "integrations",
  },
  {
    slug: "webhooks",
    group: "integrate",
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
    group: "integrate",
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
    group: "organization",
    label: "User Roles",
    heading: "User Roles",
    href: "/docs/user-roles",
    title: "User Roles — Owner, Admin, Member and HITL Only Permissions",
    description:
      "Owner, Admin, Member and HITL Only: what each role can do in every feature, invitations, API keys, and how per-bucket visibility and grants layer on top.",
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
    group: "start",
    label: "Primeros pasos",
    heading: "Primeros pasos",
    href: "/es/documentacion",
    title: "Documentación de Tavnit: primeros pasos con la extracción",
    description:
      "Crea tu primer Flow en Tavnit: define los campos que quieres, sube un documento y recibe los datos estructurados. Sin plantillas y sin programar.",
    footerColumn: "documentation",
  },
  {
    slug: "credits",
    group: "start",
    label: "Créditos y facturación",
    heading: "Créditos y facturación",
    href: "/es/documentacion/creditos",
    title: "Créditos: cuánto cuesta cada función de Tavnit",
    description:
      "Cómo funcionan los créditos de Tavnit: el precio de cada paso (extracción, enrutamiento, Splitters, limpiezas, Agentes y más), cuándo se cobra y cómo recargar.",
    footerColumn: "documentation",
  },
  {
    slug: "pipelines",
    group: "orchestration",
    label: "Pipelines",
    heading: "Pipelines",
    href: "/es/documentacion/pipelines",
    title: "Pipelines: encadena los pasos de Tavnit en un lienzo",
    description:
      "Conecta Splitters, Colecciones, Flows, Agentes, Buckets, Matchers, Inspectores y Fillers en un lienzo, o describe el pipeline en lenguaje natural.",
    footerColumn: "documentation",
  },
  {
    slug: "pipeline-map",
    group: "orchestration",
    label: "Mapa de Pipeline",
    heading: "Mapa de Pipeline",
    href: "/es/documentacion/mapa-del-pipeline",
    title: "Mapa de Pipeline: todo tu flujo de documentos en un vistazo",
    description:
      "Mira cómo pasan los documentos por Splitters, Colecciones, Flows, Cleaners, Agentes, Matchers, Inspectores, Fillers, Signals y Buckets en un solo mapa.",
    footerColumn: "documentation",
  },
  {
    slug: "collections",
    group: "input",
    label: "Colecciones",
    heading: "Colecciones",
    href: "/es/documentacion/colecciones",
    title: "Colecciones: envía cada documento al Flow correcto",
    description:
      "Agrupa Flows y Splitters detrás de un solo punto de entrada. Tavnit clasifica cada documento por su primera página y lo enruta, con un Flow de respaldo.",
    footerColumn: "documentation",
  },
  {
    slug: "subjects",
    group: "input",
    label: "Subjects",
    heading: "Subjects",
    href: "/es/documentacion/subjects",
    title: "Subjects: agrupa documentos en expedientes automáticamente",
    description:
      "Modela entidades como compras o pacientes, reúne sus documentos en expedientes por número de referencia o correo de entrada y revisa cada uno.",
    footerColumn: "documentation",
  },
  {
    slug: "splitters",
    group: "input",
    label: "Splitters",
    heading: "Splitters",
    href: "/es/documentacion/splitters",
    title: "Splitters: separa un PDF con varios documentos",
    description:
      "Separa automáticamente un PDF que junta varios documentos en archivos individuales y procesa cada uno con el Flow que le corresponde.",
    footerColumn: "integrations",
  },
  {
    slug: "flows",
    group: "processing",
    label: "Flows",
    heading: "Flows",
    href: "/es/documentacion/flows",
    title: "Flows: define qué extrae Tavnit de cada documento",
    description:
      "Arma el esquema de un Flow: campos de metadatos y de tabla, tipos de datos, pistas de extracción para la IA y campos compuestos o de varios valores.",
    footerColumn: "documentation",
  },
  {
    slug: "cleaners",
    group: "processing",
    label: "Cleaners",
    heading: "Cleaners",
    href: "/es/documentacion/cleaners",
    title: "Cleaners: referencia de tipos de campo para tus datos",
    description:
      "Todos los tipos de campo de un Cleaner: formato con IA, fechas y números, fórmulas, categorías, búsquedas, conversión de moneda y unidades, códigos HS.",
    footerColumn: "documentation",
  },
  {
    slug: "agents",
    group: "processing",
    label: "Agentes",
    heading: "Agentes",
    href: "/es/documentacion/agentes",
    title: "Agentes: agentes de IA que actúan con tus datos",
    description:
      "Dale a un Agente una misión y una URL de inicio. Variables, secretos, capturas, entregas, horarios, límites y cómo encadenarlo a un Flow.",
    footerColumn: "documentation",
  },
  {
    slug: "matchers",
    group: "intelligence",
    label: "Matchers",
    heading: "Matchers",
    href: "/es/documentacion/matchers",
    title: "Matchers: compara cotizaciones y facturas línea por línea",
    description:
      "Empareja líneas entre documentos por significado, compara precios o cantidades, elige al ganador y revisa el resultado. Modos benchmark y multilateral.",
    footerColumn: "documentation",
  },
  {
    slug: "inspectors",
    group: "intelligence",
    label: "Inspectores",
    heading: "Inspectores",
    href: "/es/documentacion/inspectores",
    title: "Inspectores: revisiones de cumplimiento entre documentos",
    description:
      "Arma una lista de verificación sobre un grupo de documentos y obtén siempre un veredicto aprobado o rechazado: fechas, comparaciones, patrones y IA.",
    footerColumn: "documentation",
  },
  {
    slug: "fillers",
    group: "intelligence",
    label: "Fillers",
    heading: "Fillers",
    href: "/es/documentacion/fillers",
    title: "Fillers: llena formularios PDF con los datos extraídos",
    description:
      "Conecta plantillas PDF rellenables con los datos extraídos de tus documentos y obtén formularios completos automáticamente, con revisión humana opcional.",
    footerColumn: "documentation",
  },
  {
    slug: "signals",
    group: "verticals",
    label: "Signals",
    heading: "Signals",
    href: "/es/documentacion/signals",
    title: "Signals: convierte conversaciones grabadas en datos",
    description:
      "Configura un Signal para estructurar conversaciones de audio en filas: participantes, grabadoras, las Waves de cada grabación y a dónde van los datos.",
    footerColumn: "documentation",
  },
  {
    slug: "nets",
    group: "verticals",
    label: "Nets",
    heading: "Nets",
    href: "/es/documentacion/nets",
    title: "Nets: estructura publicaciones de redes sociales (beta)",
    description:
      "Apunta un Net a fuentes de redes sociales, pruébalo y convierte cada captura de publicaciones en filas y tendencias que puedes guardar y analizar.",
    footerColumn: "documentation",
  },
  {
    slug: "buckets",
    group: "data",
    label: "Buckets",
    heading: "Buckets",
    href: "/es/documentacion/buckets",
    title: "Buckets: tablas para guardar los datos extraídos",
    description:
      "Guarda los resultados en tablas estructuradas dentro de Tavnit, agrega filas por API, controla el acceso a cada Bucket y grafica sin exportar.",
    footerColumn: "documentation",
  },
  {
    slug: "human-in-the-loop",
    group: "data",
    label: "Revisión Humana",
    heading: "Revisión Humana",
    href: "/es/documentacion/revision-humana",
    title: "Revisión humana con un historial de auditoría completo",
    description:
      "Detén un Flow para que una persona revise antes de entregar resultados, siempre o solo cuando un Cleaner lo marca. Asigna revisores, edita, aprueba o rechaza.",
    footerColumn: "documentation",
  },
  {
    slug: "email-integration",
    group: "integrate",
    label: "Integración por correo",
    heading: "Integración por correo",
    href: "/es/documentacion/integracion-por-correo",
    title: "Extrae datos de adjuntos de correo automáticamente",
    description:
      "Reenvía documentos a la dirección de un Flow, Colección, Splitter u otra función y cada adjunto se procesa solo. Tipos de archivo, remitentes y resultados.",
    footerColumn: "integrations",
  },
  {
    slug: "api-integration",
    group: "integrate",
    label: "Integración por API",
    heading: "Integración por API",
    href: "/es/documentacion/api",
    title: "API REST de extracción de documentos: Python, JS y no-code",
    description:
      "Referencia de la API REST de Tavnit: cada endpoint de Flows, Colecciones, Splitters, Cleaners, Buckets, Agentes, Pipelines y más, con recetas no-code.",
    footerColumn: "integrations",
  },
  {
    slug: "webhooks",
    group: "integrate",
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
    group: "integrate",
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
    group: "organization",
    label: "Roles de usuario",
    heading: "Roles de usuario",
    href: "/es/documentacion/roles-de-usuario",
    title: "Roles de usuario: Propietario, Administrador, Miembro, HITL",
    description:
      "Propietario, Administrador, Miembro y Solo HITL: qué puede hacer cada rol en cada función, invitaciones, API keys y permisos por Bucket.",
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
