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

/** Docs routes for a given footer column, in sidebar order. */
export function docsForFooterColumn(column: FooterColumn): DocSection[] {
  return DOC_SECTIONS.filter((s) => s.footerColumn === column);
}
