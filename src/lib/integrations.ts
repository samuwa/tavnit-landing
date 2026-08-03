/**
 * Integrations hub config.
 *
 * Same pattern as src/components/docs/nav.ts: one source of truth for the hub
 * listing, the sitemap and the footer, so a new integration page cannot be
 * added without also being linked.
 *
 * Two kinds of entry:
 *  - `own: true`  — a marketing page under /integrations/<slug>. Targets buying
 *    intent ("which tool lets my agent read documents"), and links down to the
 *    matching /docs page for setup.
 *  - `own: false` — the integration is documented but has no marketing page, so
 *    the hub links straight to /docs. Do not create a thin /integrations page
 *    that only restates the doc.
 */

export type Integration = {
  label: string;
  href: string;
  /** One line for the hub card. */
  summary: string;
  own: boolean;
};

export const INTEGRATIONS: Integration[] = [
  {
    label: "MCP Connector",
    href: "/integrations/mcp",
    summary:
      "Add Tavnit to claude.ai, Cursor or any MCP client so your assistant can run documents through your flows and query your extracted data directly.",
    own: true,
  },
  {
    label: "REST API",
    href: "/docs/api-integration",
    summary:
      "Send documents programmatically with an API key. Multipart or base64 upload, with Python and JavaScript examples.",
    own: false,
  },
  {
    label: "Email",
    href: "/docs/email-integration",
    summary:
      "Forward or auto-forward documents to a dedicated address and have every attachment extracted without anyone opening the app.",
    own: false,
  },
  {
    label: "Webhooks",
    href: "/docs/webhooks",
    summary:
      "Push typed results to your own endpoint the moment a run finishes, so extracted data lands in your systems automatically.",
    own: false,
  },
  {
    label: "Zapier, Make, n8n and Power Automate",
    href: "/docs/api-integration",
    summary:
      "No-code recipes that call the same endpoints, for teams that would rather wire this up visually than write code.",
    own: false,
  },
  {
    label: "Buckets",
    href: "/docs/buckets",
    summary:
      "Keep extracted rows in built-in structured storage, query them, chart them, or export to CSV.",
    own: false,
  },
];

/** Pages that live under /integrations and therefore belong in the sitemap. */
export const OWNED_INTEGRATIONS = INTEGRATIONS.filter((i) => i.own);
