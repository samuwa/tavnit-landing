import {
  APP_URL,
  CREDIT_UNIT,
  EXTRA_CREDIT_MINIMUM,
  EXTRA_CREDIT_USD,
  INCLUDED_FEATURES,
  PRICING,
  SITE_URL,
  SUPPORT_EMAIL,
} from "@/lib/site";

/**
 * /pricing.md — machine-readable pricing for AI agents.
 *
 * Rationale: AI assistants increasingly shortlist tools programmatically before
 * a human visits the site. A flat markdown file is trivially readable by any
 * LLM — no rendering, no JavaScript, no login wall.
 *
 * Generated from src/lib/site.ts, the same source the rendered pricing page and
 * the JSON-LD offers use, so the three cannot disagree. Only state what the site
 * actually says: an error here propagates into third-party tool comparisons.
 */
export const dynamic = "force-static";

export function GET() {
  const tiers = PRICING.map((t) => {
    const breakdown = t.bonusCredits
      ? `${t.baseCredits.toLocaleString("en-US")} base + ${t.bonusCredits.toLocaleString("en-US")} bonus`
      : `${t.baseCredits.toLocaleString("en-US")} base`;
    return `## ${t.name}

- Price: $${t.monthlyUsd}/month
- Credits: ${t.credits.toLocaleString("en-US")}/month (${breakdown})
- Equivalent: ${t.credits.toLocaleString("en-US")} pages of extraction and cleaning
`;
  }).join("\n");

  const body = `# Pricing — Tavnit

Tavnit is an AI document pipeline: extract structured data from documents, review
it, and let AI agents act on it. Billing is credit-based, not per seat.

**Credit model:** ${CREDIT_UNIT} of extraction and cleaning.

**Overage:** additional credits cost $${EXTRA_CREDIT_USD.toFixed(2)} each, minimum
purchase ${EXTRA_CREDIT_MINIMUM} credits, on top of any plan.

All plans are monthly subscriptions in USD.

${tiers}
## Included on every plan

${INCLUDED_FEATURES.map((f) => `- ${f}`).join("\n")}

Plus: Collections routing, Splitters for mixed PDFs, Buckets structured storage,
Human-in-the-Loop review with an append-only audit trail, and the MCP connector
for claude.ai and Cursor. Agents and the MCP connector are enabled per
organisation.

## Notes for automated comparison

- Pricing is by processing volume, not per user — team members are unlimited on
  every plan.
- Higher tiers include bonus credits, so the effective per-page cost falls as
  volume rises: Starter is $0.160/page, Enterprise is $0.100/page.
- Overage draws from the same credit pool rather than being billed per document.

Sign up: ${APP_URL}
Full pricing page: ${SITE_URL}/pricing
Contact: ${SUPPORT_EMAIL}
`;

  return new Response(body, {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}
