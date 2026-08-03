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
    slug: "collections",
    label: "Collections",
    heading: "Collections",
    href: "/docs/collections",
    title: "Collections — Automatic Document Routing to the Right Flow",
    description:
      "Group multiple extraction flows behind a single endpoint. Tavnit classifies each incoming document with AI and routes it to the correct flow automatically.",
  },
  {
    slug: "cleaners",
    label: "Cleaners",
    heading: "Cleaners",
    href: "/docs/cleaners",
    title: "Cleaners — Transform and Enrich Extracted Data",
    description:
      "Standardise formats, translate text, convert currencies and units, compute fields, categorise with AI, match against reference data, and classify HS tariff codes after extraction.",
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
      "Give an agent a plain-language mission and a starting URL. It opens a real cloud browser, works through the site, and returns structured results matching your schema.",
  },
  {
    slug: "human-in-the-loop",
    label: "Human in the Loop",
    heading: "Human in the Loop",
    href: "/docs/human-in-the-loop",
    title: "Human-in-the-Loop Review with an Append-Only Audit Trail",
    description:
      "Pause any flow for human review before results are delivered. Assign named reviewers, edit results in place, approve or reject, and record every action in an append-only audit trail.",
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
      "Forward invoices and other documents to a Tavnit address and have the attachments extracted automatically, with results returned by email, webhook or API.",
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
    title: "MCP Connector — Use Tavnit from Claude and Cursor",
    description:
      "Connect Tavnit to claude.ai, Cursor or any MCP client. Generate a connector URL and let your AI assistant run documents through your flows and query your Buckets directly.",
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
