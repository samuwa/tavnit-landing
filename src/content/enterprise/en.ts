import type { EnterpriseCopy } from "@/content/types";

/** Enterprise services — English — what /enterprise renders and the translation SOURCE for the new languages. */
const en: EnterpriseCopy = {
  title: "Enterprise Services — Implementation, Control and Business Advisory",
  description:
    "Tavnit Enterprise: contracts on your terms, hands-on implementation, user roles and audit trail, direct support, and Business Advisory to optimise document digitisation and data entry processes.",
  home: "Home",
  breadcrumbLabel: "Breadcrumb",
  crumb: "Enterprise",
  eyebrow: "Tavnit Enterprise",
  h1: "Enterprise services",
  lead:
    "For organisations that process a high volume of documents or need terms of their own: a contract, hands-on help putting Tavnit into production, and advice on the process around it — on top of the platform.",
  servicesHeading: "What Enterprise includes",
  services: [
    {
      title: "Contract on your terms",
      body: "Volume, commercial terms and payment agreed in a contract sized to your documents, instead of a self-serve plan.",
    },
    {
      title: "Hands-on implementation",
      body: "We set up the Flows, Cleaners, review rules and integrations (API, webhooks, email) with you, on your real documents, and leave them running in production.",
    },
    {
      title: "Control and audit",
      body: "User roles, including a reviewer-only role, conditional human review, and an append-only audit trail of every view, edit and approval.",
      links: [
        { label: "User roles", href: "/docs/user-roles" },
        { label: "Human in the loop", href: "/docs/human-in-the-loop" },
      ],
    },
    {
      title: "Direct support",
      body: "A direct line to the team that builds the product, in English and Spanish.",
    },
  ],
  advisory: {
    eyebrow: "Business Advisory",
    heading: "Business Advisory",
    subheading: "Optimisation of document digitisation and data entry processes",
    intro:
      "Besides the platform, we advise companies that want to tidy up and improve how they receive, digitise and record the information in their documents — whether or not the end result is automated with Tavnit.",
    scopeHeading: "What it covers",
    scope: [
      { title: "Diagnosis of the current process", body: "Which documents arrive, through which channels and in what volume; who captures them, how long it takes and where the errors come from." },
      { title: "Digitisation", body: "Scanning and capture criteria, file organisation and naming, separating mixed batches, and keeping the originals traceable." },
      { title: "Data entry", body: "Which fields are actually needed, standard formats for dates, amounts and currencies, validations, and checks against master data." },
      { title: "Controls", body: "Where human review is needed, segregation of duties, and the audit trail an auditor or regulator will ask for." },
      { title: "Integration", body: "How the data reaches your ERP, accounting or spreadsheets, and which steps are worth automating and which are not." },
      { title: "Rollout and training", body: "A staged implementation plan and training for the people who capture, review and use the data." },
    ],
    deliverablesHeading: "Deliverables",
    deliverables:
      "A written diagnosis of the current process, the design of the proposed process with its controls, and a staged implementation plan with indicators to measure the result — capture time per document, correction rate, documents pending review.",
  },
  ctaHeading: "Talk to us",
  ctaBody: "Tell us about your documents and your volume, and we will tell you which of these services fits.",
  ctaButton: "Book a meeting",
  ctaEmail: "or write to",
};

export default en;
