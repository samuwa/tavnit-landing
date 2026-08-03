/**
 * Docs navigation + per-route SEO metadata.
 *
 * Single source of truth for: the sidebar order, each route's href, and the
 * title/description each page emits. Pure data (no JSX) so it can be imported
 * by both the client shell and the server `generateMetadata` of each route.
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

export type DocSection = {
  slug: DocSlug;
  /** Sidebar label — short. */
  label: string;
  /** On-page <h1>. */
  heading: string;
  href: string;
  /** <title>; the root layout appends " | Tavnit". */
  title: string;
  description: string;
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
  },
  {
    slug: "flows",
    label: "Flows",
    heading: "Flows",
    href: "/docs/flows",
    title: "Flows — Define What Tavnit Extracts from Each Document",
    description:
      "Build a flow's data schema: metadata and table fields, data types, extraction hints that tell the AI where to look, composite and multi-value fields, and every feature you can attach.",
  },
  {
    slug: "collections",
    label: "Collections",
    heading: "Collections",
    href: "/docs/collections",
    title: "Collections — Automatic Document Routing to the Right Flow",
    description:
      "Group extraction flows and Splitters behind one endpoint. Tavnit classifies each document from its first page and routes it, with a Fallback Flow for anything it cannot place.",
  },
  {
    slug: "cleaners",
    label: "Cleaners",
    heading: "Cleaners",
    href: "/docs/cleaners",
    title: "Cleaners — Field Type Reference for Extracted Data",
    description:
      "Every Cleaner field type explained: AI formatting, date and number formats, formulas, categories, lookups, currency and unit conversion, summaries, HS codes and conditional actions.",
  },
  {
    slug: "splitters",
    label: "Splitters",
    heading: "Splitters",
    href: "/docs/splitters",
    title: "Splitters — Break Multi-Document PDFs into Separate Files",
    description:
      "Split a combined PDF containing several documents into its individual files automatically, then process each one through the right flow.",
  },
  {
    slug: "buckets",
    label: "Buckets",
    heading: "Buckets",
    href: "/docs/buckets",
    title: "Buckets — Structured Storage for Extracted Document Data",
    description:
      "Store extracted results in built-in structured tables, append rows over the API, control per-bucket access, and chart the data without exporting it.",
  },
  {
    slug: "agents",
    label: "Agents",
    heading: "Agents",
    href: "/docs/agents",
    title: "AI Browser Agents — Act on Your Extracted Document Data",
    description:
      "Give an agent a plain-language mission and a starting URL. Capture types, chaining an agent to a flow, file downloads, runtime limits and per-minute credit costs.",
  },
  {
    slug: "human-in-the-loop",
    label: "Human in the Loop",
    heading: "Human in the Loop",
    href: "/docs/human-in-the-loop",
    title: "Human-in-the-Loop Review with an Append-Only Audit Trail",
    description:
      "Pause a flow for human review before results are delivered — every run, or only the ones a Cleaner rule flags. Assign reviewers, edit in place, approve or reject, and log every action.",
  },
  {
    slug: "pipeline-map",
    label: "Pipeline Map",
    heading: "Pipeline Map",
    href: "/docs/pipeline-map",
    title: "Pipeline Map — Visualise Your Document Workflow End to End",
    description:
      "See how documents move through flows, Collections, Cleaners, Splitters, review and delivery in a single visual map of your workspace.",
  },
  {
    slug: "email-integration",
    label: "Email Integration",
    heading: "Email Integration",
    href: "/docs/email-integration",
    title: "Extract Data from Email Attachments Automatically",
    description:
      "Forward documents to a Tavnit flow, Collection or Splitter address and have every attachment extracted automatically. Accepted file types, skip reasons, and email output.",
  },
  {
    slug: "api-integration",
    label: "API Integration",
    heading: "API Integration",
    href: "/docs/api-integration",
    title: "Document Extraction REST API — Python, JavaScript and No-Code",
    description:
      "Process documents programmatically with the Tavnit REST API. Multipart or base64 upload, API-key auth, Python and JavaScript examples, plus Zapier, Make, n8n and Power Automate recipes.",
  },
  {
    slug: "webhooks",
    label: "Webhooks",
    heading: "Webhooks",
    href: "/docs/webhooks",
    title: "Webhooks — Deliver Extracted Data to Your Systems",
    description:
      "Push extraction results to your own endpoint the moment a run completes, with retry behaviour and payload structure documented.",
  },
  {
    slug: "mcp-connector",
    label: "MCP Connector",
    heading: "MCP Connector",
    href: "/docs/mcp-connector",
    title: "MCP Connector Setup — Connect Tavnit to Claude and Cursor",
    description:
      "Step-by-step setup for the Tavnit MCP connector: generate a connector URL, add it to claude.ai or Cursor, handle expiry and refreshes, and fix the common connection errors.",
  },
  {
    slug: "user-roles",
    label: "User Roles",
    heading: "User Roles",
    href: "/docs/user-roles",
    title: "User Roles and Permissions",
    description:
      "Owner, Admin and Member roles, what each can do across flows, Cleaners, Buckets and billing, and how per-bucket visibility and access grants layer on top.",
  },
];

export const DOC_BY_SLUG = Object.fromEntries(
  DOC_SECTIONS.map((s) => [s.slug, s]),
) as Record<DocSlug, DocSection>;
