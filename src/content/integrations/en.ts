import type { IntegrationsContent } from "@/content/types";
import { INTEGRATIONS } from "@/lib/integrations";

/**
 * Integrations — English: what /integrations and /integrations/mcp render,
 * and the translation SOURCE for the new languages. The hub cards are the
 * entries of src/lib/integrations.ts (labels, summaries and links).
 */
const en: IntegrationsContent = {
  hub: {
    title: "Integrations — API, Email, Webhooks and MCP",
    description:
      "Every way into Tavnit and back out: an MCP connector for AI assistants, a REST API, email forwarding, webhooks, and Zapier, Make and n8n recipes.",
    ogTitle: "Tavnit Integrations",
    breadcrumbHome: "Home",
    h1: "Integrations",
    intro:
      "Documents reach Tavnit however suits the team sending them — dropped in the app, forwarded to an address, posted to an endpoint, or requested by an AI assistant. Extracted data leaves the same way.",
    introMore:
      "Each route runs the same flows, so the schema, cleaning rules and review steps you configured apply no matter how a document arrives.",
    whichHeading: "Which one should you use?",
    which: [
      "**If people are sending the documents** — an accounts inbox receiving supplier invoices, say — use [email](/docs/email-integration). Nobody has to learn a new tool; they forward as they already do.",
      "**If a system is sending them**, use the [REST API](/docs/api-integration) and have results pushed back by [webhook](/docs/webhooks). If you would rather not write the glue code, the same endpoints work from Zapier, Make, n8n and Power Automate.",
      "**If you are working alongside an AI assistant**, use the [MCP connector](/integrations/mcp). It gives claude.ai or Cursor the whole pipeline, not just a way in: your assistant can build extraction flows, attach cleaning rules, run documents through them, and query what you have already extracted — without you moving files around by hand.",
    ],
    finalHeading: "Start with one document",
    finalBody:
      "Build a flow, send something through it, and wire up delivery once you can see the output. Free credits to begin.",
    finalCta: "Start free",
  },
  items: INTEGRATIONS,
  mcp: {
    title: "MCP Document Extraction for Claude and Cursor",
    description:
      "Connect Tavnit to claude.ai or Cursor over MCP. Your assistant can build extraction flows, run documents through them, and query the results — typed and cleaned.",
    ogTitle: "MCP Server for Document Extraction | Tavnit",
    schemaHeadline: "MCP Server for Document Extraction — Claude and Cursor",
    schemaName: "MCP Connector",
    breadcrumbHome: "Home",
    breadcrumbHub: "Integrations",
    breadcrumbSelf: "MCP Connector",
    badge: "Model Context Protocol",
    h1: "Give your AI assistant a real document pipeline",
    lede:
      "Tavnit runs an MCP server. Connect it to claude.ai or Cursor and your assistant gets the whole document pipeline: it can build extraction flows, attach cleaning rules, push documents through them, and read the results back — the exact fields you defined, cleaned and typed, instead of an interpretation of a file it was handed.",
    ledeMore: "Setup is a URL you paste into your assistant’s settings. No SDK, no server to run, no code.",
    ctaStart: "Start free",
    ctaSetup: "Setup guide",
    problemHeading: "Why assistants struggle with documents",
    problem: [
      "AI assistants are good at reasoning and bad at being a data pipeline. Hand one a scanned invoice and it will read it — probably correctly, sometimes not, and differently the second time. There is no schema, so field names drift between runs. There is no validation, so a misread total looks exactly like a correct one. And there is no record of what happened, which matters as soon as the output touches accounting or compliance.",
      "That is fine for a one-off question and unworkable as a process. What an assistant actually needs is a tool that already knows how to read your documents.",
    ],
    compareHeading: "Pasting a PDF vs. calling a flow",
    compareCapability: "Capability",
    compareChat: "Pasting the file into chat",
    compareMcp: "Through the MCP connector",
    compareRows: [
      ["Output shape", "Whatever the model returns that time", "The fields your flow defines, every time"],
      ["Field names", "Drift between runs", "Fixed by your schema"],
      ["Cleaning rules", "None", "Cleaners applied automatically"],
      ["Human review", "Not possible", "Optional, with an audit trail"],
      ["Where results land", "In the chat", "Buckets, webhook, email or API"],
      ["Repeatable at volume", "No", "Yes — same flow, any number of documents"],
    ],
    capabilitiesHeading: "What your assistant can do once connected",
    capabilities: [
      {
        title: "Build a flow by describing it",
        body: "Tell the assistant what to capture — vendor, dates, totals, line items — and it creates the extraction flow in your organisation, ready to run. Setting up a pipeline becomes a chat message, not an afternoon of configuration.",
      },
      {
        title: "Attach cleaning rules",
        body: "Ask for totals converted to USD, dates normalised, or values matched against reference data, and the assistant creates the Cleaner and attaches it to the flow — the same rules then run on every future document, however it arrives.",
      },
      {
        title: "Run a document through a flow",
        body: "Ask the assistant to process an invoice, contract or form through one of your extraction flows. It returns the fields you defined, typed and cleaned, not a paragraph describing them.",
      },
      {
        title: "Query what you have already extracted",
        body: "Ask questions against your Buckets — what you paid a vendor last quarter, which contracts renew next month — and the answer comes from your live data rather than the model's memory.",
      },
    ],
    askHeading: "Things you can ask it:",
    ask: [
      "Create a flow that captures the vendor, dates, totals and line items from our freight invoices.",
      "Add a cleaner to that flow that converts every total to USD.",
      "Run this invoice through my Supplier Invoices flow and show me the line items.",
      "What did we pay Acme Corp last quarter, according to my Invoices bucket?",
      "Extract the renewal dates from these three contracts and compare them.",
      "Which runs are waiting on review right now?",
    ],
    fitsHeading: "It uses the pipeline you already built",
    fitsIntro:
      "The connector is not a separate extraction engine. It calls the same flows as the rest of Tavnit — whether you built them in the app or the assistant created them for you — which means every rule you configured still applies when an assistant is the one making the request.",
    fits: [
      "[Collections](/docs/collections) still classify an incoming document and route it to the right flow.",
      "[Cleaners](/docs/cleaners) still standardise formats, convert currencies and apply your lookups.",
      "[Human-in-the-Loop](/docs/human-in-the-loop) review still pauses a run when you have asked it to — an assistant cannot skip your approval step.",
      "[Buckets](/docs/buckets) still receive the results, so what the assistant extracts is queryable afterwards.",
    ],
    scopeHeading: "Scope and access",
    scopeCards: [
      {
        title: "Your permissions, not more",
        body: "The connector is issued from your own API key and reaches only the organisation you generated it in. The assistant inherits your role — it cannot do anything you could not do in the app.",
      },
      {
        title: "Treat the URL as a credential",
        body: "Anyone holding the connector URL can reach your flows and Buckets. URLs are time-limited, and refreshing one invalidates the previous value immediately.",
      },
    ],
    scopeMore:
      "Full detail in the [connector documentation](/docs/mcp-connector) and [user roles reference](/docs/user-roles). The server endpoint is `{mcpUrl}`.",
    setupHeading: "Connecting it",
    setupBody:
      "Generate a connector URL on the Integrations page in Tavnit, then paste it into claude.ai under Settings → Connectors, or add it to Cursor as a remote MCP server. It takes a couple of minutes and needs no code.",
    setupLink: "Read the step-by-step setup guide",
    faqHeading: "Common questions",
    faqs: [
      {
        q: "How is this different from pasting a PDF into Claude?",
        a: "Pasting a PDF asks the assistant to read a document it has never seen, in a format it was not designed to parse, with no schema and no way to check the result. The MCP connector routes the document through an extraction flow you defined, so you get the same named fields every time, in the same types, with the same cleaning rules and the same review step applied. The assistant receives structured data rather than an interpretation.",
      },
      {
        q: "Can the assistant build flows and cleaners, or only run them?",
        a: "Both. Over the connector, the assistant can create extraction flows and cleaning rules the same way you would in the app: describe the fields, tables and transformations you want in plain language and they are created in your organisation, ready to run on every future document. Creation follows your role — Owners and Admins can build, Members and Viewers stay run-only or read-only.",
      },
      {
        q: "Which AI assistants work with it?",
        a: "claude.ai on a Pro plan or above, Cursor, and any client that accepts a remote MCP server URL. MCP is an open protocol, so support is not limited to a specific vendor.",
      },
      {
        q: "Do I need to write code?",
        a: "No. You generate a connector URL in Tavnit and paste it into your assistant's settings. Building the flow it calls is also no-code — you describe the fields you want and Tavnit extracts them.",
      },
      {
        q: "Can the assistant see everything in my company's account?",
        a: "No. The connector is issued from your own API key, so it reaches only the organisation you were signed in to, with your role's permissions. A Member cannot make an assistant do something a Member cannot do in the app, and private Buckets stay private unless you have been granted access.",
      },
      {
        q: "Does using the connector cost extra?",
        a: "No. Documents processed through the connector consume credits at the normal rate of one credit per page, the same as uploading through the app or calling the API. There is no separate charge for MCP access.",
      },
      {
        q: "What happens when the connector URL expires?",
        a: "Connector URLs are time-limited, and Tavnit shows when yours was created and when it expires. Refreshing issues a new URL and invalidates the previous one immediately, so any client still holding the old one stops working until you paste the new value.",
      },
    ],
    finalHeading: "Point your assistant at real documents",
    finalBody:
      "Build a flow, generate a connector URL, and start asking. Free credits to begin, and no card required.",
    finalPricing: "See pricing",
    finalDemo: "Book a demo",
  },
};

export default en;
