/**
 * FAQ content, single-sourced.
 *
 * Consumed by both the rendered accordion (src/components/FAQ.tsx) and the
 * FAQPage JSON-LD (src/lib/schema.ts). Previously these were two hand-kept
 * copies, which meant the structured data could silently describe content the
 * page no longer showed — a schema/content mismatch Google penalises.
 */

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "What is Tavnit?",
    a: "Tavnit is an AI-powered document platform that turns PDFs and images into clean, structured data — and then puts that data to work. It extracts with AI, cleans and enriches the results, routes them through human review when you want it, stores everything in built-in databases, and can even send AI agents to act on the data across the web. All without code.",
  },
  {
    q: "What types of documents can Tavnit process?",
    a: "Any PDF or image-based document: invoices, contracts, receipts, expense reports, resumes, forms, purchase orders, customs paperwork, and more — including scans and handwriting.",
  },
  {
    q: "What are Tavnit Agents?",
    a: "Agents are AI-powered browser automation bots. You describe a mission in plain language and give a starting URL; the agent opens a real cloud browser, works through the website, and returns structured data matching your schema. You can watch every session live, and a flow can launch an agent automatically with its extracted fields as inputs.",
  },
  {
    q: "How does Human in the Loop work?",
    a: "Enable review on any flow and its runs pause before results are delivered. Assigned reviewers are notified by email, can edit results directly in the review screen, and approve or reject the run. Every view, edit, and decision is recorded in an append-only audit trail. You can also trigger review conditionally, only when a Cleaner rule flags a value.",
  },
  {
    q: "Can I use Tavnit from claude.ai or Cursor?",
    a: "Yes. Tavnit ships an MCP (Model Context Protocol) connector: generate a connector URL in the app and paste it into claude.ai (Pro and up), Cursor, or any MCP client. Your AI assistant can then process documents through your flows and query your Buckets directly.",
  },
  {
    q: "Does Tavnit have an API?",
    a: "Yes. Tavnit provides a full REST API with API key authentication, webhook notifications, email triggers, and Python and JavaScript examples — plus no-code recipes for Zapier, Make, n8n, and Power Automate.",
  },
  {
    q: "What are Tavnit Collections?",
    a: "Collections let you group multiple extraction flows under a single endpoint. AI automatically analyzes each incoming document and routes it to the correct flow for processing.",
  },
  {
    q: "What are Tavnit Cleaners?",
    a: "Cleaners are Tavnit's post-extraction transformation layer. They standardize formats, translate text, convert currencies and units, calculate fields, categorize with AI, match values against your reference data, and classify HS tariff codes.",
  },
  {
    q: "How much does Tavnit cost?",
    a: "Tavnit offers monthly subscription plans starting at $16/month for 100 credits (1 credit = 1 page). Plans include Starter ($16/mo), Growth ($77/mo), Pro ($138/mo), and Enterprise ($599/mo).",
  },
];
