/**
 * /guides — explanatory articles.
 *
 * Why this exists: Search Console shows the site earns impressions for
 * informational queries it has no page for — "matching invoices to purchase
 * orders", "line item extraction from invoices", "automate tariff
 * classification", "what is the best api for splitting receipts". The
 * use-case pages are commercial; they explain what Tavnit does with a document
 * type, not what the underlying problem is. A guide answers the question first
 * and only then says where Tavnit fits, which is the only way an informational
 * query ever converts.
 *
 * Rules, so this does not turn into a content farm:
 *  - One guide per question people actually type. If the query is not in
 *    Search Console (or an obvious sibling of one that is), it does not get a
 *    guide.
 *  - Vendor-neutral until the last section. The reader should be able to act
 *    on the guide without Tavnit; the closing section says what Tavnit
 *    automates and links the relevant use case.
 *  - `datePublished` is fixed here and never regenerated; dateModified tracks
 *    the build. Bump `updated` only when the body changes.
 *
 * Single source of truth for the hub, the sitemap, the footer and llms.txt —
 * same pattern as src/lib/use-cases.ts.
 */

export type GuideSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Guide = {
  slug: string;
  /** SEO title (template appends " | Tavnit"). */
  title: string;
  h1: string;
  description: string;
  /** Self-contained 40–60 word answer, rendered as the lede. */
  lede: string;
  /** ISO date. Fixed; feeds Article.datePublished. */
  published: string;
  /** ISO date of the last substantive edit. */
  updated: string;
  readingMinutes: number;
  sections: GuideSection[];
  /** Where Tavnit fits. Rendered last, visually distinct. */
  tavnit: { heading: string; paragraphs: string[]; links: { label: string; href: string }[] };
  faqs: { q: string; a: string }[];
};

export const GUIDES: Guide[] = [
  {
    slug: "how-to-match-invoices-to-purchase-orders",
    title: "How to Match Invoices to Purchase Orders (2-Way and 3-Way)",
    h1: "How to match invoices to purchase orders",
    description:
      "What PO matching is, how two-way and three-way matching differ, where manual matching fails, and how to automate it without replacing your ERP.",
    lede: "Invoice-to-PO matching checks that a supplier invoice agrees with the purchase order it bills against: same supplier, same items, same quantities, same prices. Two-way matching compares invoice to PO; three-way matching adds the goods-received note. It is the control that stops a company paying for things it did not order or did not receive.",
    published: "2026-09-08",
    updated: "2026-09-08",
    readingMinutes: 7,
    sections: [
      {
        heading: "What PO matching actually checks",
        paragraphs: [
          "A purchase order is a promise to buy; an invoice is a request to be paid. Matching them answers one question — is this invoice asking for exactly what we agreed to? — across four dimensions: the supplier, the items, the quantities, and the unit prices. A fifth, the totals, is a consequence of the other four and is the least useful thing to check on its own.",
          "The reason totals are a weak check is that they agree by accident more often than you would expect. An invoice that bills ten units at $12 instead of twelve units at $10 has the right total and the wrong everything else. Header-level matching catches the invoice with no PO; only line-level matching catches the invoice with the wrong lines.",
        ],
      },
      {
        heading: "Two-way versus three-way matching",
        paragraphs: [
          "Two-way matching compares the invoice against the purchase order. It confirms you agreed to buy this, at this price. It does not confirm you received it, which is why it is usually reserved for services, subscriptions, and low-value goods where the cost of a receiving step outweighs the risk.",
          "Three-way matching adds the goods-received note — the delivery note, packing slip, or warehouse receipt that records what physically arrived. Now the invoice has to agree with both what was ordered and what was received. A supplier that ships eight and bills ten is caught here and nowhere else. It is the standard for physical goods, and most audit frameworks expect it above a materiality threshold.",
          "Some teams talk about four-way matching, adding an inspection or quality-acceptance record. It is the same idea with one more document, and the same mechanics apply.",
        ],
      },
      {
        heading: "Why manual matching breaks",
        paragraphs: [
          "The purchase order is structured — it came out of your own system. The invoice is not. It arrived as a PDF from the supplier's system, in the supplier's layout, with the supplier's part numbers and the supplier's description of each item. Before any comparison can happen, someone has to read that PDF and translate it into the same shape as the PO. In most accounts-payable teams that translation is a person with two windows open.",
          "That is where the errors get in. The comparison itself is not hard; a spreadsheet can do it. The transcription is hard, because it is repetitive, the layouts differ per supplier, and a wrong quantity looks exactly like a right one. The matching failure most companies experience is not a failure of matching logic. It is a failure of data entry upstream of it.",
        ],
        bullets: [
          "Supplier part numbers differ from internal SKUs, so line pairing needs a lookup table nobody maintains.",
          "Descriptions differ in wording — \"Blue widget 10pk\" against \"WIDGET-BLU x10\" — so exact-text matching fails on items that are the same.",
          "Unit of measure and pack size change the arithmetic: 1 case of 12 versus 12 units.",
          "Partial deliveries and split invoices mean one PO maps to several invoices and the match is many-to-one.",
          "Freight, surcharges and taxes appear on the invoice but not on the PO, and need to be classified as acceptable differences rather than mismatches.",
        ],
      },
      {
        heading: "Tolerances: deciding what counts as a mismatch",
        paragraphs: [
          "No real-world match is exact. Prices are quoted before a currency moves; suppliers round; freight is estimated. A matching process that stops every invoice with a one-cent difference will be switched off within a month. The fix is a tolerance policy: a rule, agreed in advance, for how much variance is acceptable per dimension before the invoice is held.",
          "Typical policies allow a small percentage or absolute variance on unit price, zero variance on quantity for physical goods, and a separate allowance for freight and surcharge lines. What matters is that the rule is written down and applied by the system, not decided by whoever is matching that day. The invoices inside tolerance flow through; the ones outside it stop and go to a person.",
        ],
      },
      {
        heading: "How to automate it, step by step",
        paragraphs: [
          "Automation does not start with matching software. It starts with getting both documents into the same structured shape, so that the comparison is a query rather than a read.",
        ],
        bullets: [
          "Define one field schema for order documents: PO number, supplier, line SKU, description, quantity, unit price, line amount, total. Use it for POs, invoices and delivery notes alike.",
          "Extract every incoming invoice into that schema. This is the step most teams skip, and it is the step that makes everything downstream possible.",
          "Normalise supplier part numbers to your SKUs with a lookup against your item master; where no mapping exists, pair lines by semantic similarity of the description rather than exact text.",
          "Verify the invoice against itself first: does unit price times quantity equal the line amount, and do the lines sum to the total? Arithmetic errors are the cheapest to catch and the most embarrassing to pay.",
          "Match header fields on the PO number, then match lines within the matched PO. Apply your tolerance policy per dimension.",
          "Route only the exceptions to a reviewer, with the invoice, the PO and the specific disagreement in front of them. Post the matches straight to the ERP.",
          "Keep an audit trail of who approved what and when. Auditors ask for it; so does the supplier when they dispute a short payment.",
        ],
      },
    ],
    tavnit: {
      heading: "Where Tavnit fits",
      paragraphs: [
        "Tavnit does the extraction and the shaping. Purchase orders, invoices and delivery notes arrive by email or API and are extracted into the same typed fields, whatever the supplier's layout. A lookup Cleaner maps supplier part numbers to your SKUs; a formula Cleaner checks line arithmetic; a condition flags anything outside your tolerance.",
        "For line-level matching, a Matcher takes the PO run as the benchmark and pairs each invoice line to it — semantically, with an LLM tiebreaker for borderline pairs — laying quantity and unit price side by side and listing unmatched lines as warnings. Flagged invoices pause for a named reviewer with an append-only audit trail; the rest go to your ERP by API or webhook.",
      ],
      links: [
        { label: "PO matching software", href: "/use-cases/purchase-orders" },
        { label: "Invoice processing", href: "/use-cases/invoice-processing" },
        { label: "Delivery notes and goods-received checks", href: "/use-cases/delivery-notes" },
      ],
    },
    faqs: [
      { q: "What is the difference between two-way and three-way matching?", a: "Two-way matching compares the invoice to the purchase order — did we agree to buy this at this price? Three-way matching also compares against the goods-received note — did it actually arrive? Three-way is the standard for physical goods; two-way is common for services and low-value purchases." },
      { q: "Can PO matching be fully automated?", a: "The comparison can be. The part that resists automation is getting the supplier's invoice PDF into the same structured shape as your PO, because every supplier's layout, part numbers and descriptions differ. Once extraction is automated, matching is a query, and only the exceptions need a human." },
      { q: "What tolerance should I set for PO matching?", a: "There is no universal number. Most policies allow a small percentage or absolute variance on unit price, zero variance on quantity for physical goods, and treat freight and surcharges as separate acceptable lines. The important thing is that the rule is written down and applied consistently by the system." },
    ],
  },
  {
    slug: "line-item-extraction-from-invoices",
    title: "Line Item Extraction from Invoices: What It Is and Why It Is Hard",
    h1: "Line item extraction from invoices",
    description:
      "Why extracting invoice line items is harder than extracting totals, what a good line-item extraction returns, and how to get table data from any supplier layout without templates.",
    lede: "Line item extraction pulls the repeating table from an invoice — each product or service line with its description, SKU, quantity, unit price and amount — into structured rows, rather than just the header fields like vendor, date and total. It is what makes PO matching, spend analysis and inventory reconciliation possible, and it is the part most OCR tools get wrong.",
    published: "2026-09-08",
    updated: "2026-09-08",
    readingMinutes: 6,
    sections: [
      {
        heading: "Header fields versus line items",
        paragraphs: [
          "Every invoice has a handful of header fields — vendor, invoice number, date, due date, currency, total — that appear once and are easy to locate. Then it has a table. The table can be three lines or three hundred; it can span pages; it can have a different set of columns from every other supplier's table. Extracting the header tells you how much to pay. Extracting the lines tells you what you are paying for, which is the question every downstream process actually asks.",
          "Spend analysis needs line categories. PO matching needs line quantities and prices. Inventory needs line SKUs. Tax needs line-level rates. An invoice extracted without its lines is a payment instruction with no content.",
        ],
      },
      {
        heading: "Why tables are the hard part",
        paragraphs: [
          "A total is a single value in a predictable neighbourhood of the page. A table is a structure, and the structure is different everywhere. Classic OCR reads characters and positions; it does not know that the number under \"Qty\" belongs to the description two cells to its left, or that the description wrapped onto a second line, or that the last three rows are subtotals rather than items.",
        ],
        bullets: [
          "Column sets vary per supplier: some have SKU and description, some have only description, some split unit price into net and gross.",
          "Multi-line descriptions wrap, and the second line looks like a new row to a position-based parser.",
          "Tables span pages, with headers repeated or not, and running totals at the bottom of each.",
          "Non-item rows — subtotals, discounts, freight, tax, \"continued\" — sit inside the table and must be classified, not extracted as products.",
          "Merged cells, right-aligned numbers drifting into the next column, and scanned skew all break coordinate-based parsing.",
          "Units and pack sizes hide in the description (\"per case of 12\") rather than in their own column.",
        ],
      },
      {
        heading: "Template-based versus template-free extraction",
        paragraphs: [
          "Template-based tools solve tables by having you draw the table region and columns for each supplier's layout. It works — for that supplier, until they change their invoice format, at which point it silently produces wrong rows until someone notices. The maintenance cost scales with your supplier count, which is why teams with hundreds of vendors abandon these tools.",
          "Template-free extraction uses a model that understands what an invoice line is, in the same way a person does, and returns rows against a schema you define once — description, quantity, unit price, amount — regardless of the layout. The trade-off is that a model can misread, which is why the output should be verified rather than trusted: arithmetic checks on each row, and human review when a check fails.",
        ],
      },
      {
        heading: "What good line-item output looks like",
        paragraphs: [
          "The output should be a table, not text: one row per item, one typed column per field, with numbers as numbers and dates as dates. Each row should carry the fields your downstream process needs and nothing that belongs to the header. Non-item rows should be excluded or flagged, not mixed in. And the output should be verifiable: if unit price times quantity does not equal the line amount, that row is wrong and should say so.",
        ],
        bullets: [
          "Description — verbatim, because it is what any later matching or categorisation is derived from.",
          "SKU or part number — the supplier's, plus your own if a lookup can resolve it.",
          "Quantity and unit of measure — as separate fields.",
          "Unit price and line amount — both, so the arithmetic can be checked.",
          "Tax rate or code per line, where the jurisdiction requires it.",
          "A row-level verification status: arithmetic passed, or flagged with the reason.",
        ],
      },
    ],
    tavnit: {
      heading: "Where Tavnit fits",
      paragraphs: [
        "In Tavnit, line items are table fields on a flow: you name the columns once, and every invoice from every supplier is extracted into those columns as typed rows, with no per-vendor template. A formula Cleaner verifies unit price times quantity per row; a lookup Cleaner resolves supplier part numbers to your SKUs; a category Cleaner assigns spend categories. Rows that fail a check route the run to a reviewer. Results land in a Bucket you can query or chart, or go straight to your systems by API or webhook.",
      ],
      links: [
        { label: "Invoice data extraction", href: "/use-cases/invoice-processing" },
        { label: "Flows — defining table fields", href: "/docs/flows" },
        { label: "Cleaners — formula and lookup fields", href: "/docs/cleaners" },
      ],
    },
    faqs: [
      { q: "Can OCR extract line items from invoices?", a: "Plain OCR extracts characters and their positions; it does not understand table structure, so it produces text that still has to be parsed into rows. Reliable line-item extraction needs a layer that understands what an invoice line is, either a per-supplier template or a model that generalises across layouts." },
      { q: "How do I extract invoice tables without a template per supplier?", a: "Use an extraction model that returns rows against a schema you define — description, quantity, unit price, amount — regardless of layout, then verify each row with an arithmetic check and route failures to a reviewer. This is what Tavnit's table fields do." },
      { q: "How should multi-page invoice tables be handled?", a: "The extraction should treat the table as one logical table across pages, ignoring repeated headers and per-page running totals, and return a single set of rows. Check that the rows sum to the invoice total to confirm nothing was dropped at a page break." },
    ],
  },
  {
    slug: "hs-code-classification-explained",
    title: "HS Code Classification Explained — and How to Automate It",
    h1: "HS code classification: what it is and how to automate it",
    description:
      "How the Harmonized System works, why tariff classification is judgement work, where the General Rules of Interpretation come in, and what automating it responsibly looks like.",
    lede: "HS code classification assigns each traded product a code from the Harmonized System, the international nomenclature that customs authorities use to determine duty rates, taxes, and controls. The first six digits are global; countries extend them to eight, ten or more digits for national tariff lines. Getting the code wrong means the wrong duty, a delayed shipment, or a penalty.",
    published: "2026-09-08",
    updated: "2026-09-08",
    readingMinutes: 7,
    sections: [
      {
        heading: "How the Harmonized System is built",
        paragraphs: [
          "The Harmonized System is maintained by the World Customs Organization and revised roughly every five years; the current edition is HS 2022. It is organised as 21 sections, 97 chapters (2 digits), headings (4 digits) and subheadings (6 digits). Those six digits are identical in every member country, which is what makes the system harmonised. Beyond six digits each country adds its own subdivisions — national tariff lines — to which the actual duty rates and domestic taxes attach.",
          "Panama's Arancel Nacional de Importación, for example, extends the HS 2022 nomenclature into roughly 9,700 national tariff lines, each carrying its import duty (DAI), sales tax (ITBMS) and, where applicable, selective consumption tax (ISC). A classification is not finished at six digits; it is finished when it lands on the national line that determines what is owed.",
        ],
      },
      {
        heading: "Why classification is judgement, not lookup",
        paragraphs: [
          "If classification were a dictionary lookup — product name in, code out — it would have been automated decades ago. It is not, because the nomenclature classifies goods by what they are made of, what they do, and how they are presented, and a single product description can plausibly fit several headings. Is a heated car seat cover a textile article, a vehicle part, or an electrical heating apparatus? Each has a different rate.",
          "The tiebreakers are the General Rules for the Interpretation of the Harmonized System, the GRI. Rule 1 says headings and the legal section and chapter notes govern. Rule 2 covers incomplete goods and mixtures. Rule 3 handles goods that could fall under two or more headings — most specific description first, then essential character, then the heading that comes last in numerical order. Rules 4 to 6 deal with goods not elsewhere covered, packaging, and subheading-level classification. A defensible classification cites the rule it relied on.",
          "Then there are the legal notes: chapter and section notes that include or exclude specific goods from a heading regardless of what the heading text seems to say. A classifier that reads heading titles and ignores the notes will be confidently wrong on a predictable set of products.",
        ],
      },
      {
        heading: "Where classification goes wrong in practice",
        paragraphs: [
          "Most misclassification is not a hard GRI 3 case. It is a routine product described badly. The commercial invoice says \"parts\" or \"samples\" or a brand name, and the person classifying either guesses or stops to ask. The description is the raw material of classification, and it is usually the weakest input in the process.",
        ],
        bullets: [
          "Vague descriptions on the commercial invoice — a brand or model number with no statement of what the item is or is made of.",
          "Mixed shipments where one invoice line covers several distinct products that classify differently.",
          "Relying on the supplier's declared HS code, which was classified under a different country's tariff and possibly for a different purpose.",
          "Reusing last year's code after an HS edition change moved the product.",
          "Ignoring the chapter notes and classifying from the heading title alone.",
          "No record of why a code was chosen, so the same product is classified three ways by three people.",
        ],
      },
      {
        heading: "What responsible automation looks like",
        paragraphs: [
          "The goal is not a machine that classifies unsupervised. Customs law places the declaration on the importer or the licensed broker, and it will keep doing so. The goal is a system that proposes a classification with its reasoning, at the moment the shipment paperwork is processed, so the specialist reviews rather than researches.",
        ],
        bullets: [
          "Start from the extracted goods description, verbatim, plus any material, function and composition details on the invoice or packing list.",
          "Classify against the national tariff — the full set of national lines with their rates — not just the six-digit HS, and against the current edition.",
          "Apply the legal chapter and section notes and the GRI, and record which rule and which note decided the case.",
          "Return a code, a confidence, and the reasoning; route low-confidence or high-value lines to a broker for review before the declaration is filed.",
          "Keep an audit trail per classification. When customs queries a code two years later, the reasoning is the defence.",
          "Learn from the broker's corrections: a product classified once should be classified the same way next time.",
        ],
      },
    ],
    tavnit: {
      heading: "Where Tavnit fits",
      paragraphs: [
        "Tavnit extracts the shipment document set — commercial invoice, packing list, bill of lading, certificate of origin — into typed fields, then an HS code Cleaner classifies each goods line from its extracted description during the same run. For Panama, the classifier works over the official Arancel Nacional (VII Enmienda, HS 2022) with its national lines and DAI, ITBMS and ISC rates, applying the legal chapter notes and the GRI, so the output is a national tariff line with reasoning rather than a six-digit guess.",
        "Classifications route through Human-in-the-Loop review before anything is filed, with an append-only audit trail of who approved which code. The structured, classified data can then pre-fill the declaration form rather than being retyped into it.",
      ],
      links: [
        { label: "Customs automation with HS classification", href: "/use-cases/customs-trade" },
        { label: "Aduanas y clasificación arancelaria (Panamá) — en español", href: "/es/aduanas" },
        { label: "Cleaners — HS code field type", href: "/docs/cleaners" },
      ],
    },
    faqs: [
      { q: "What is the difference between an HS code and a tariff code?", a: "The HS code is the six-digit international code defined by the World Customs Organization. A tariff code is a country's extension of it — eight, ten or more digits — to which the national duty and tax rates attach. Panama's Arancel Nacional, the EU's TARIC and the US HTS are all national tariffs built on the HS." },
      { q: "Can AI classify HS codes accurately?", a: "It can propose classifications well when it works from a good product description, against the full national tariff with its legal notes, and explains its reasoning. It should not file declarations unsupervised: the responsible approach is a proposal with confidence and reasoning, reviewed by a licensed broker for low-confidence or high-value lines." },
      { q: "Can I just use the HS code my supplier put on the invoice?", a: "Treat it as a hint, not an answer. The supplier classified under their own country's tariff, possibly for export controls rather than import duty, and possibly under an older HS edition. The importer or broker is responsible for the code on the import declaration." },
    ],
  },
];

export const GUIDE_BY_SLUG: Record<string, Guide> = Object.fromEntries(
  GUIDES.map((g) => [g.slug, g]),
);
