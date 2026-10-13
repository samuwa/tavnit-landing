import type { HomeCopy } from "@/content/types";

/**
 * Home — English, compact. NOT rendered: "/" keeps its rich animated home
 * (src/app/page.tsx). This is the translation SOURCE for the new languages'
 * home (components/LocalizedHome.tsx, the structure of /es), written as a
 * neutral, global version of the English home: no market-specific claims,
 * no prices, the demo as the main call to action.
 */
const en: HomeCopy = {
  title: "Tavnit — Extract data from your documents with AI, review it, act on it",
  description:
    "Turn invoices, packing lists, contracts and forms into structured data, with no per-vendor templates. Your team reviews and approves before anything is recorded. API, email and MCP.",
  schemaName: "Tavnit",
  breadcrumbHome: "Home",
  readInEnglish: null,
  eyebrow: "AI document operations",
  h1: "Extract data from your documents with AI, review it with your team and act on it",
  lede:
    "Tavnit turns invoices, packing lists, contracts and forms into structured data — with no per-vendor templates. Your team reviews and approves before anything is recorded, and approved data reaches your systems by API, webhook or email.",
  ctaDemo: "Book a demo",
  ctaTry: "Try it free",
  ids: { howItWorks: "how-it-works", useCases: "use-cases", integrations: "integrations", faq: "faq" },
  problemHeading: "The problem",
  problems: [
    "The same fields, re-typed from a hundred different layouts, every month. Every supplier formats its invoice differently, and someone on your team copies it by hand into a spreadsheet or into the system.",
    "Template-based OCR tools work until a supplier changes its layout — and then they fail silently. “Chat with your PDF” tools make up numbers and have no review, no audit trail and no way out to your systems.",
    "A wrong total looks exactly like a right one. The real cost is not the hours of data entry: it is the error that reaches your books or your customs declaration without anyone seeing it.",
  ],
  stepsHeading: "How it works: extract, review, act",
  steps: [
    {
      title: "Extract",
      body: "You define the fields you need once — invoice number, supplier, line items with quantity and price — and Tavnit extracts them from any PDF, scan or photo, whatever the layout. No per-vendor templates.",
    },
    {
      title: "Review",
      body: "Cleaners clean and validate: date formats, currencies, line arithmetic, lookups against your master data. Anything that does not add up stops and goes to a named reviewer. Everything is recorded in an append-only audit trail.",
    },
    {
      title: "Act",
      body: "Approved data reaches your ERP or accounting by API or webhook, is stored in a queryable Bucket, fills PDF forms, or feeds an agent that works in a web portal for you.",
    },
  ],
  useCasesHeading: "Use cases",
  useCasesIntro:
    "Each page covers which fields matter in that type of document and what tends to go wrong — the parts that make one document type harder than another.",
  useCasesAll: "See all {count} use cases",
  integrationsHeading: "Works with what you already use",
  integrations: [
    "Email: forward the PDF to a Tavnit address and get the data back. Zero integration.",
    "REST API and webhooks: send documents from your system and receive the results the moment they finish. Recipes for Zapier, Make, n8n and Power Automate.",
    "MCP connector: connect Tavnit to claude.ai or Cursor and ask your assistant to process documents or query your extracted data.",
    "Buckets: built-in structured storage you can query in plain language and chart, without exporting anything.",
  ],
  integrationsAll: "All integrations",
  faqHeading: "Common questions",
  faqs: [
    {
      q: "Do I need to build a template for every supplier?",
      a: "No. You define the fields once in a Flow and Tavnit finds them in any layout. If a supplier changes the format of its invoice, you do not have to do anything.",
    },
    {
      q: "How do I keep a wrong value out of my system?",
      a: "With human review. You can require approval on every document, or only when a Cleaner rule spots something — for example, that quantity times unit price does not match the line total. The reviewer sees the document and the extracted data, corrects or approves, and every action is recorded in the audit trail.",
    },
    {
      q: "How do I send the documents?",
      a: "However you prefer: forward the email with the PDF attached to a Tavnit address, upload them in the app, or send them by API. Results go out by webhook, API or email, or are stored in a Bucket you can query and chart.",
    },
    {
      q: "Does it work in my language?",
      a: "Yes. Tavnit extracts documents written in any language, and you can return the data with the field names your system uses. The app itself is available in several languages.",
    },
    {
      q: "How much does it cost?",
      a: "Pricing is credit-based: 1 credit is 1 processed page. Book a demo and we will look at your volume and your real documents.",
    },
  ],
  finalHeading: "Try it on one of your documents",
  finalBody:
    "Bring a real invoice or packing list. In the demo we build your first Flow together and you watch the data come out live.",
};

export default en;
