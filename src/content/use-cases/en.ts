import type { UseCasesContent } from "@/content/types";
import { USE_CASES } from "@/lib/use-cases";

/**
 * Use cases — English. The translation SOURCE for the new languages: the
 * hub copy below is what /use-cases renders, and `items` are the pages in
 * src/lib/use-cases.ts (the English data stays there, next to its type).
 */
const en: UseCasesContent = {
  hub: {
    title: "Use Cases — Invoices, Contracts, Resumes and More",
    description:
      "How teams use Tavnit by document type — invoices, contracts, resumes, receipts, purchase orders and customs paperwork, with what each one gets wrong.",
    ogTitle: "Tavnit Use Cases",
    breadcrumbHome: "Home",
    breadcrumb: "Use Cases",
    h1: "Use cases",
    intro:
      "The pipeline is the same whatever you send it — extract, clean, review, act. What changes is which fields matter, and what tends to go wrong.",
    introMore:
      "Each page below covers the fields worth pulling from that document type, the parts that reliably break, and which stage of the pipeline earns its keep.",
    notSeeingHeading: "Not seeing your document type?",
    notSeeing:
      "These are the types teams ask about most, not a list of what Tavnit supports. There is no per-document-type configuration to build — you describe the fields you want and the same extraction reads any PDF or image, including scans and handwriting.",
    notSeeingMore:
      "Delivery notes, bank statements, insurance claims, medical forms, certificates and application forms all work the same way. Start from the [getting started guide](/docs) and define the fields that matter to you.",
    finalHeading: "Start with one document",
    finalBody:
      "Build a flow, send something real through it, and judge the output before wiring anything up. Free credits to begin.",
    finalCta: "Start free",
  },
  items: USE_CASES,
};

export default en;
