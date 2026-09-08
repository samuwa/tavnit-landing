import { APP_URL, FEATURES, GITHUB_URL, LINKEDIN_URL, MCP_URL, SITE_URL, SUPPORT_EMAIL } from "@/lib/site";
import { DOC_SECTIONS } from "@/components/docs/nav";
import { INTEGRATIONS } from "@/lib/integrations";
import { isStripeEnabled } from "@/lib/platform";
import { USE_CASES } from "@/lib/use-cases";
import { GUIDES } from "@/lib/guides";

/**
 * /llms.txt — see https://llmstxt.org
 *
 * Served as a route (not a static file in public/) so it is generated from the
 * same constants as the page metadata and schema, and cannot drift.
 *
 * Calibration: this is protocol-layer hygiene, not a ranking signal. Google
 * states explicitly that no AI-specific file is required for AI Overviews or
 * AI Mode. Non-Google engines do parse it, and it costs nothing to serve.
 *
 * Every URL listed here must resolve. A dead link in llms.txt is worse than an
 * omission: the crawler that follows it learns the file is unreliable. Both
 * pricing entries were dead while the Stripe self-serve toggle was off —
 * /pricing 307s to the homepage and /pricing.md returns 404 — so the pricing
 * section is now gated on the same toggle as the pricing surfaces themselves.
 */
// Revalidated rather than force-static so the platform_config Stripe toggle
// takes effect without a deploy, exactly as /pricing.md does.
export const revalidate = 300;

export async function GET() {
  const stripeOn = await isStripeEnabled();

  // Pricing is only discoverable when self-serve is actually on. When it is
  // off, say so in prose rather than linking a page that redirects away.
  const pricingLines = stripeOn
    ? `- [Pricing](${SITE_URL}/pricing): plans, credit model, pricing FAQ.
- [Pricing (machine-readable)](${SITE_URL}/pricing.md): same data as markdown.`
    : `- [Book a demo](${SITE_URL}/schedule): pricing is quoted per organisation; self-serve checkout is not currently open.`;

  const billingLines = stripeOn
    ? `Credit-based. 1 credit = 1 page of document processing. Agent runs bill
separately at 3 credits per minute. See ${SITE_URL}/pricing.md for tiers.`
    : `Credit-based. 1 credit = 1 page of document processing. Agent runs bill
separately at 3 credits per minute. Plans are quoted per organisation — contact
${SUPPORT_EMAIL} or book a demo at ${SITE_URL}/schedule.`;

  const body = `# Tavnit

> AI document pipeline: extract structured data from PDFs and images, clean and
> enrich it, route it through human review, then let AI browser agents act on it.
> Positioning: extract, review, act.

Tavnit is a no-code platform for document operations. Upload or email a document
(invoice, contract, receipt, resume, purchase order, customs paperwork), and
Tavnit extracts it into a schema you define, applies transformation rules,
optionally pauses for a named human reviewer with a full audit trail, and
delivers typed results by API, webhook, or into built-in storage.

It differs from conventional document-extraction tools in three ways:

1. **Agents.** Extraction is not the end state. A flow can hand its extracted
   fields to an AI browser agent that opens a real cloud browser, works through a
   website, and returns structured results. Sessions are watchable live.
2. **Human in the Loop.** Review can be required on any flow, or triggered
   conditionally when a Cleaner rule flags a value. Every view, edit, and
   approval is written to an append-only audit trail.
3. **MCP connector.** Tavnit exposes a Model Context Protocol server at
   ${MCP_URL}. Paste a generated connector URL into claude.ai (Pro and up),
   Cursor, or any MCP client, and the assistant can run documents through your
   flows and query your stored data directly.

## Core concepts

- **Flows** — an extraction schema plus the rules applied to its results.
- **Collections** — group several flows behind one endpoint; AI classifies each
  incoming document and routes it to the right flow.
- **Cleaners** — post-extraction transforms: standardise formats, translate,
  convert currencies and units, compute fields, categorise with AI, match against
  reference data, and classify HS tariff codes.
- **Splitters** — break mixed multi-document PDFs into their constituent files.
- **Buckets** — built-in structured storage for extracted results, queryable and
  chartable.
- **Agents** — AI browser automation driven by a plain-language mission.

## Capabilities

${FEATURES.map((f) => `- ${f}`).join("\n")}

## Key pages

- [Homepage](${SITE_URL}/): product overview, pipeline, use cases.
- [Use cases](${SITE_URL}/use-cases): what Tavnit extracts, by document type.
- [Integrations](${SITE_URL}/integrations): how data gets in and out.
${pricingLines}
- [Application](${APP_URL}): sign-up and workspace.
- [MCP server](${MCP_URL}): Model Context Protocol endpoint.
- [En español](${SITE_URL}/es): Spanish-language overview, with a dedicated page on customs and Panama tariff classification at ${SITE_URL}/es/aduanas.

## Guides

Explanatory articles on the problems Tavnit is used for — vendor-neutral where
the topic is, specific about Tavnit where it is not.

${GUIDES.map((g) => `- [${g.h1}](${SITE_URL}/guides/${g.slug}): ${g.description}`).join("\n")}

## Use cases

Each page documents the fields worth extracting from that document type and the
specific failure modes that make it hard — the detail an assistant needs to say
whether Tavnit fits a given job, rather than that it exists.

${USE_CASES.map((uc) => `- [${uc.label}](${SITE_URL}/use-cases/${uc.slug}): ${uc.summary}`).join("\n")}

## Integrations

${INTEGRATIONS.map((i) => `- [${i.label}](${SITE_URL}${i.href}): ${i.summary}`).join("\n")}

## Documentation

${DOC_SECTIONS.map((s) => `- [${s.label}](${SITE_URL}${s.href}): ${s.description}`).join("\n")}

## Integration surface

REST API with API-key auth, webhook notifications, inbound email triggers,
Python and JavaScript examples, and no-code recipes for Zapier, Make, n8n, and
Power Automate. Agents and the MCP connector are gated per organisation.

## Billing model

${billingLines}

## Contact and profiles

- Email: ${SUPPORT_EMAIL}
- LinkedIn: ${LINKEDIN_URL}
- GitHub: ${GITHUB_URL}
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}
