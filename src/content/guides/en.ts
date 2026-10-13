import type { GuidesContent } from "@/content/types";
import { GUIDES } from "@/lib/guides";

/**
 * Guides — English. The translation SOURCE for the new languages: the hub
 * copy below is what /guides renders, and `items` are the articles in
 * src/lib/guides.ts (the English data stays there, next to its type).
 */
const en: GuidesContent = {
  hub: {
    title: "Guides — PO Matching, Line Items, HS Codes and Document Automation",
    description:
      "Plain-language guides to the problems behind document automation: matching invoices to purchase orders, extracting invoice line items, classifying HS codes, and more.",
    ogTitle: "Tavnit Guides",
    ogDescription:
      "Plain-language guides to PO matching, line-item extraction, HS code classification and the rest of document operations.",
    breadcrumbHome: "Home",
    name: "Guides",
    h1: "Guides to document automation",
    intro:
      "The problems behind the product, explained on their own terms: what PO matching checks, why invoice tables are hard to extract, how tariff classification really works. Vendor-neutral until the last section, where we say what Tavnit automates.",
    minRead: "{m} min read",
    read: "Read",
  },
  items: GUIDES,
};

export default en;
