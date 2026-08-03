/**
 * Use-case pages.
 *
 * These target the queries people actually type — their problem, not our
 * feature names. "invoice data extraction software" has real commercial volume;
 * "Cleaners" has none. Feature-level explanation stays in /docs, so nothing here
 * competes with it: each page links down to the docs rather than restating them.
 *
 * Single source of truth for the hub, the sitemap, the footer and each page's
 * metadata — same pattern as src/components/docs/nav.ts and src/lib/integrations.ts,
 * so a new use case cannot be added without also being linked.
 *
 * `fields` and `gotchas` are the differentiating content. If a new entry cannot
 * fill those with something specific to that document type, it does not deserve
 * a page — it is a template with a noun swapped, and Google treats it that way.
 */

export type UseCase = {
  slug: string;
  /** Sidebar/nav label. */
  label: string;
  /** Audience chip. */
  badge: string;
  h1: string;
  title: string;
  description: string;
  /** One-card summary for the hub. */
  summary: string;
  /** Self-contained 40–60 word answer. */
  lede: string;
  /** Why this is painful, in the reader's terms. */
  problem: string[];
  /** Fields worth pulling from this document type. */
  fields: { name: string; note: string }[];
  /** What actually makes this document type hard. The real differentiator. */
  gotchas: { title: string; body: string }[];
  /** Which parts of the pipeline earn their keep here, and why. */
  pipeline: { label: string; href: string; why: string }[];
  faqs: { q: string; a: string }[];
};

export const USE_CASES: UseCase[] = [
  {
    slug: "invoice-processing",
    label: "Invoice Processing",
    badge: "Finance & AP",
    h1: "Automated invoice data extraction",
    title: "Invoice Data Extraction Software with Line Items",
    description:
      "Extract vendor, invoice number, dates, totals and full line items from supplier invoices in any layout, with review before anything reaches your ledger.",
    summary:
      "Vendor, number, dates, totals and line items pulled from any supplier layout — with review before it reaches your ledger.",
    lede: "Tavnit reads supplier invoices in any layout and returns vendor, invoice number, dates, tax, totals and every line item as typed fields. No per-vendor template to build. Nothing posts to your ledger until a reviewer approves it, and every approval is recorded.",
    problem: [
      "Accounts payable is the classic version of this problem: the same eight fields, re-typed from a hundred different layouts, every month. Each supplier formats differently, some send scans, some send photos of scans, and the ones who change their template do it without warning.",
      "Template-based tools handle the first problem badly — you configure a layout per vendor, and every new supplier is a setup task. The moment a vendor redesigns their invoice, the template silently breaks and the errors flow downstream into your ledger.",
    ],
    fields: [
      { name: "Vendor name and address", note: "Often differs from the trading name you have on file — a lookup Cleaner can match it to your supplier list." },
      { name: "Invoice number", note: "Typed as text, not a number. Leading zeros and prefixes matter and get destroyed by numeric parsing." },
      { name: "Issue and due dates", note: "Formats vary by country. A date Cleaner normalises DD/MM and MM/DD to one output format." },
      { name: "Line items", note: "A repeating table: description, quantity, unit price, amount. The part most tools either skip or flatten." },
      { name: "Subtotal, tax, discount, total", note: "Worth extracting all four so the arithmetic can be checked rather than trusted." },
      { name: "Currency", note: "A currency Cleaner can convert to your reporting currency at the same time." },
      { name: "PO number", note: "Where present, this is what lets you match the invoice to a purchase order automatically." },
    ],
    gotchas: [
      {
        title: "Line items are where extraction usually fails",
        body: "Header fields are easy. A table that runs across a page break, has merged cells, or mixes descriptions across two lines is where most tools return something plausible and wrong. Table fields in a flow handle repeating rows as rows, so a five-line invoice returns five records rather than one blob of text.",
      },
      {
        title: "A wrong total looks exactly like a right one",
        body: "There is no visual difference between a correctly read €1,240.00 and a misread €1,240.00 that was actually €1,249.00. This is the argument for conditional review: a Cleaner rule can check that line items sum to the subtotal and route only the failures to a human, so you are not reviewing everything to catch the few that matter.",
      },
      {
        title: "Multiple invoices arrive in one PDF",
        body: "A supplier statement or a scanned batch often contains several invoices in a single file. A Splitter separates them first, so each becomes its own run with its own extracted record instead of one merged mess.",
      },
    ],
    pipeline: [
      { label: "Email Integration", href: "/docs/email-integration", why: "Suppliers already email invoices. Auto-forward the AP inbox and every attachment is processed without anyone opening the app." },
      { label: "Splitters", href: "/docs/splitters", why: "Separates batched or stapled scans into individual invoices before extraction." },
      { label: "Cleaners", href: "/docs/cleaners", why: "Normalises dates, converts currency, matches vendors against your supplier list, and flags arithmetic that does not add up." },
      { label: "Human in the Loop", href: "/docs/human-in-the-loop", why: "Holds a run for approval — every invoice, or only the ones a rule flagged — with an append-only record of who approved what." },
      { label: "Webhooks", href: "/docs/webhooks", why: "Pushes the approved record straight into your accounting system the moment it clears review." },
    ],
    faqs: [
      { q: "Does it handle scanned and photographed invoices?", a: "Yes. Scans, photos and image-based PDFs all go through OCR before extraction. Quality still matters — a sharp scan extracts more reliably than a phone photo at an angle — which is why review exists for the marginal cases." },
      { q: "Do I need to set up a template per supplier?", a: "No. You define the fields you want once, and the same flow reads invoices from any supplier in any layout. Adding a new vendor requires no configuration." },
      { q: "Can it extract line items, not just totals?", a: "Yes. Line items are defined as table fields, so a repeating table returns one record per row with description, quantity, unit price and amount typed separately." },
      { q: "How does it handle different currencies?", a: "Currency is extracted as its own field, and a Cleaner can convert amounts to your reporting currency during processing so downstream systems receive one consistent unit." },
    ],
  },
  {
    slug: "contract-analysis",
    label: "Contract Analysis",
    badge: "Legal & Procurement",
    h1: "Contract data extraction",
    title: "Contract Data Extraction — Terms and Renewal Dates",
    description:
      "Pull parties, effective and renewal dates, payment terms, notice periods and liability caps out of a contract portfolio, into a table you can actually query.",
    summary:
      "Parties, renewal dates, notice periods and payment terms pulled from a contract portfolio into a queryable table.",
    lede: "Tavnit reads executed contracts and returns the terms that carry obligations — parties, effective and renewal dates, notice periods, payment terms, liability caps — as structured fields. The portfolio becomes a table you can query instead of a folder you have to read.",
    problem: [
      "Most organisations cannot answer basic questions about their own contracts. Which agreements auto-renew next quarter? What is our aggregate liability exposure? Which suppliers have 90-day notice periods? The answers exist, spread across hundreds of PDFs nobody has time to open.",
      "The cost is not the reading — it is the renewals that pass unnoticed, and the terms that get discovered during a dispute rather than before one.",
    ],
    fields: [
      { name: "Parties and signing entities", note: "The legal entity is often not the trading name, and both are worth capturing." },
      { name: "Effective and expiry dates", note: "The pair that drives every renewal question you will want to ask later." },
      { name: "Auto-renewal and notice period", note: "The two fields that decide whether a renewal is a choice or a surprise." },
      { name: "Payment terms and amounts", note: "Net-30, milestones, escalators. Frequently in prose rather than a table." },
      { name: "Liability cap and indemnities", note: "Usually a clause, not a number. Worth extracting as text plus a parsed value where one exists." },
      { name: "Governing law and jurisdiction", note: "Short, easy to extract, and tedious to find manually across a portfolio." },
      { name: "Termination rights", note: "For convenience, for cause, and the notice each requires." },
    ],
    gotchas: [
      {
        title: "The answer is in prose, not a field",
        body: "An invoice puts the total in a box. A contract buries the notice period in the middle of a clause, sometimes in words rather than digits. Extraction hints let you tell the flow what the term means and where it tends to appear, rather than hoping a label matches.",
      },
      {
        title: "Amendments change the answer",
        body: "The operative terms are frequently in an amendment, not the original. Treat each document as its own run and keep the executed date as a field, so the current position is a query rather than an assumption about which file is newest.",
      },
      {
        title: "Getting this wrong is expensive, so review is not optional",
        body: "A misread renewal date is a contract you did not exit in time. This is a use case where review on every run is proportionate, and where the append-only audit trail matters as much as the extraction — you can show who confirmed a term and when.",
      },
    ],
    pipeline: [
      { label: "Flows", href: "/docs/flows", why: "Extraction hints tell the AI what a term means, which matters far more here than on documents with labelled fields." },
      { label: "Human in the Loop", href: "/docs/human-in-the-loop", why: "Review on every run, with a permanent record of who confirmed each term." },
      { label: "Buckets", href: "/docs/buckets", why: "Turns the portfolio into a queryable table — which agreements renew next quarter, sorted by notice period." },
      { label: "Cleaners", href: "/docs/cleaners", why: "Normalises date formats and can compute a notice deadline from an expiry date and notice period." },
    ],
    faqs: [
      { q: "Can it handle contracts with no consistent structure?", a: "Yes — that is the normal case. There is no template to configure. You describe the terms you want and the flow locates them wherever they appear, which is why extraction hints matter more here than on structured documents." },
      { q: "What about amendments and side letters?", a: "Process each as its own run with the executed date captured as a field. The current position then comes from querying your Bucket rather than from guessing which PDF is most recent." },
      { q: "Is the extracted data queryable?", a: "Yes. Results land in a Bucket as typed columns, so you can filter, sort and chart across the whole portfolio without exporting anything." },
    ],
  },
  {
    slug: "resume-screening",
    label: "Resume Screening",
    badge: "HR & Recruiting",
    h1: "Resume parsing and screening",
    title: "Resume Parsing Software — Structured Candidate Data",
    description:
      "Turn resumes in any format into consistent candidate records — contact, skills, titles, dates, education — so screening is a filter, not a read.",
    summary:
      "Resumes in any format turned into consistent candidate records, so screening becomes a filter rather than a read.",
    lede: "Tavnit reads resumes in any layout and returns consistent candidate records: contact details, skills, job titles with dates, education and certifications. Because every candidate is described in the same fields, screening becomes filtering a table rather than opening two hundred PDFs.",
    problem: [
      "Resumes are the least standardised document most teams handle. Two columns or one, tables or prose, a design-led layout with the dates in a sidebar. A human reads any of them; software usually reads about half.",
      "The real cost is inconsistency. When a hundred resumes are each summarised slightly differently, comparing candidates on the same criteria stops being possible, and screening quietly becomes whoever the first reviewer happened to like.",
    ],
    fields: [
      { name: "Name and contact details", note: "Frequently in a header, a sidebar or an image — one of the more common extraction failures." },
      { name: "Job titles with employers and dates", note: "A repeating table, not a single value. Table fields keep each role as its own row." },
      { name: "Total years of experience", note: "Rarely stated. A formula Cleaner can compute it from the role dates rather than trusting a claim." },
      { name: "Skills", note: "Best extracted verbatim, then normalised — a category Cleaner can map 'JS', 'JavaScript' and 'ES6' to one value." },
      { name: "Education and certifications", note: "Institution, qualification, year. Another repeating structure." },
      { name: "Location and work authorisation", note: "Often the first hard filter, and often buried in the header." },
    ],
    gotchas: [
      {
        title: "Two-column layouts break naive readers",
        body: "A design-led resume with a sidebar reads top-to-bottom as interleaved nonsense to anything doing simple text extraction. Layout-aware extraction keeps the sidebar and the main column separate, which is why contact details in a sidebar still land in the right field.",
      },
      {
        title: "Skills need normalising or the filter is useless",
        body: "Extracted verbatim, you get 'JS', 'JavaScript', 'Javascript (ES6)' and 'JAVASCRIPT' as four distinct values, and filtering on any one misses the others. A category Cleaner maps variants onto a controlled vocabulary so the filter actually returns everyone qualified.",
      },
      {
        title: "This is personal data, and the rules are stricter",
        body: "Resumes are personal data by definition, and in several jurisdictions candidate data carries retention limits and a right to erasure. Bucket visibility and per-user access grants let you keep candidate records restricted to the people running the process rather than visible organisation-wide.",
      },
    ],
    pipeline: [
      { label: "Flows", href: "/docs/flows", why: "Table fields keep each role and each qualification as its own row rather than one text blob." },
      { label: "Cleaners", href: "/docs/cleaners", why: "Normalises skill names onto a controlled vocabulary and computes total experience from role dates." },
      { label: "Buckets", href: "/docs/buckets", why: "Candidate records as a filterable table, with per-bucket access so applicant data is not visible org-wide." },
      { label: "Email Integration", href: "/docs/email-integration", why: "Applications that arrive by email get processed on arrival, attachments included." },
    ],
    faqs: [
      { q: "Does it handle two-column and designed resumes?", a: "Yes. Extraction is layout-aware rather than reading raw text top to bottom, so sidebars and multi-column layouts do not interleave into nonsense." },
      { q: "Can it standardise skill names?", a: "Yes. Extract verbatim, then use a category Cleaner to map variants onto a controlled vocabulary so filtering on a skill returns every candidate who has it." },
      { q: "How is candidate data kept private?", a: "Buckets can be private rather than organisation-visible, with per-user Viewer or Editor grants. Candidate records stay restricted to the people running the process." },
    ],
  },
  {
    slug: "expense-reports",
    label: "Expense Reports",
    badge: "Finance & Employees",
    h1: "Receipt and expense report processing",
    title: "Receipt OCR and Expense Report Automation",
    description:
      "Turn photographed receipts into categorised expense lines — merchant, date, amount, tax and category — so reimbursement is a review, not data entry.",
    summary:
      "Photographed receipts turned into categorised expense lines, so reimbursement is a review rather than data entry.",
    lede: "Tavnit reads receipts — including crumpled ones photographed in bad light — and returns merchant, date, amount, tax and category as typed fields. Expenses arrive categorised and checkable, so approving a report is a review rather than a transcription job.",
    problem: [
      "Expense processing fails at both ends. Employees put off submitting because filling the form is tedious, and finance then re-types what was submitted because the form was filled inconsistently. Reimbursements slip, and nobody enjoys any part of it.",
      "Receipts are also the worst-quality documents most companies process: thermal paper that has faded, photographed at an angle, folded, sometimes partly in another language.",
    ],
    fields: [
      { name: "Merchant name", note: "Often a stylised logo rather than text — one of the harder fields on a receipt." },
      { name: "Transaction date and time", note: "Time matters more than people expect for per-diem and duplicate detection." },
      { name: "Total, tax and tip", note: "Separating tax matters for reclaim; separating tip matters for policy." },
      { name: "Payment method and last four digits", note: "What lets you reconcile against a card statement automatically." },
      { name: "Expense category", note: "Best inferred by an AI category Cleaner from merchant and line items rather than asked of the employee." },
      { name: "Currency", note: "Travel expenses arrive in whatever currency was spent; conversion belongs in the pipeline." },
    ],
    gotchas: [
      {
        title: "Receipt quality is genuinely bad",
        body: "Faded thermal paper, glare, folds and angles are the norm rather than the exception. Extraction handles most of it, but this is a document type where conditional review earns its place: flag low-confidence or out-of-policy amounts for a human and let the clean ones pass.",
      },
      {
        title: "Categorisation is the actual work",
        body: "Reading the total is easy. Deciding whether a restaurant charge is client entertainment or a team meal is the part that consumes finance time. An AI category Cleaner assigns a category from the merchant and line items, so the employee is not guessing and finance is correcting rather than classifying.",
      },
      {
        title: "Duplicates are common and expensive",
        body: "The same receipt submitted twice — once photographed, once as a PDF from the merchant — is a routine source of over-reimbursement. Extracting merchant, exact amount and timestamp gives you enough to detect it in the Bucket rather than discovering it in an audit.",
      },
    ],
    pipeline: [
      { label: "Email Integration", href: "/docs/email-integration", why: "Employees forward receipts to an address instead of learning an app. Digital receipts can be auto-forwarded on arrival." },
      { label: "Cleaners", href: "/docs/cleaners", why: "Assigns a category by AI, converts foreign currency and standardises merchant names." },
      { label: "Human in the Loop", href: "/docs/human-in-the-loop", why: "Conditional review — only expenses over a threshold or outside policy reach an approver." },
      { label: "Buckets", href: "/docs/buckets", why: "Expenses as a table you can group, chart and check for duplicates before paying." },
    ],
    faqs: [
      { q: "Can it read a photo of a crumpled receipt?", a: "Usually. Photos, faded thermal paper and folded receipts all go through OCR, though quality sets the ceiling — which is why conditional review exists for the ones the pipeline is least sure about." },
      { q: "Can expenses be categorised automatically?", a: "Yes. An AI category Cleaner assigns a category from the merchant and line items, so finance corrects the occasional edge case rather than classifying everything." },
      { q: "What about foreign currency on travel expenses?", a: "Currency is its own extracted field, and a conversion Cleaner can restate amounts in your reporting currency during processing." },
    ],
  },
  {
    slug: "purchase-orders",
    label: "Purchase Orders",
    badge: "Procurement & Ops",
    h1: "Purchase order processing",
    title: "Purchase Order Automation and PO Matching",
    description:
      "Extract PO numbers, ship-to details and full line items from incoming purchase orders, so orders reach your system already matched and checkable.",
    summary:
      "PO numbers, ship-to details and line items extracted from incoming orders, ready to match against invoices.",
    lede: "Tavnit reads incoming purchase orders and returns PO number, buyer, ship-to details, requested dates and every line item as typed fields. Because invoices are extracted into the same shape, matching an invoice to its PO becomes a query rather than a manual comparison.",
    problem: [
      "Purchase orders arrive as PDF attachments from customers who each use their own ERP output, and somebody re-keys them into your order system. The re-keying is the bottleneck, and it is also where quantity and SKU errors enter — the two errors that turn into a shipping problem.",
      "The second half of the problem is matching. When the invoice eventually arrives, someone compares two documents by eye to confirm that what was ordered is what was billed.",
    ],
    fields: [
      { name: "PO number", note: "The key everything else joins on. Text, not numeric — prefixes and leading zeros are significant." },
      { name: "Buyer and ship-to address", note: "Frequently different, and the difference matters for fulfilment." },
      { name: "Line items with SKU and quantity", note: "A repeating table. Customer part numbers often differ from yours, which is a lookup problem." },
      { name: "Unit price and extended amount", note: "Both, so the arithmetic can be verified rather than assumed." },
      { name: "Requested delivery date", note: "Sometimes per line rather than per order." },
      { name: "Payment and incoterms", note: "Short fields with outsized downstream consequences." },
    ],
    gotchas: [
      {
        title: "Customer part numbers are not your part numbers",
        body: "A PO lists what the buyer calls the item. Your system knows a different SKU. A lookup Cleaner matches customer part numbers against your reference data during processing, so the order arrives already translated rather than needing manual mapping.",
      },
      {
        title: "Matching is the point, and it only works if shapes agree",
        body: "Three-way matching falls apart when the PO and the invoice are extracted into different field names. Using the same field naming across both flows is what makes matching a query on the PO number rather than a document comparison.",
      },
      {
        title: "Quantity errors are the expensive ones",
        body: "A wrong price is an invoicing correction. A wrong quantity is a shipment. A formula Cleaner checking that unit price times quantity equals the extended amount catches a large share of misreads before anything is picked.",
      },
    ],
    pipeline: [
      { label: "Collections", href: "/docs/collections", why: "Customers send POs, invoices and delivery notes to the same address. Collections classifies each and routes it to the right flow." },
      { label: "Cleaners", href: "/docs/cleaners", why: "Maps customer part numbers to your SKUs by lookup, and verifies line arithmetic." },
      { label: "Buckets", href: "/docs/buckets", why: "Holds POs and invoices in the same shape, so matching is a query on the PO number." },
      { label: "API Integration", href: "/docs/api-integration", why: "Pushes confirmed orders into your ERP without a manual step." },
    ],
    faqs: [
      { q: "Can it match invoices to purchase orders?", a: "Extract both into the same field structure and matching becomes a query on the PO number in your Bucket. Tavnit produces the structured data that makes matching possible; the comparison then runs against your own data rather than against two PDFs." },
      { q: "What if the customer uses their own part numbers?", a: "A lookup Cleaner matches customer part numbers against your reference data during processing, so orders arrive already translated to your SKUs." },
      { q: "Do line items come through separately?", a: "Yes. Line items are table fields, so each row returns SKU, quantity, unit price and extended amount as separate typed values." },
    ],
  },
  {
    slug: "customs-trade",
    label: "Customs & Trade",
    badge: "Logistics & Trade",
    h1: "Customs document automation",
    title: "Customs Automation with HS Code Classification",
    description:
      "Extract commercial invoices, packing lists and bills of lading, and classify goods to HS tariff codes during processing rather than after it.",
    summary:
      "Commercial invoices, packing lists and bills of lading extracted — with HS tariff classification built into the pipeline.",
    lede: "Tavnit reads customs paperwork — commercial invoices, packing lists, bills of lading, certificates of origin — and returns shipper, consignee, goods descriptions, weights and values as typed fields. An HS code Cleaner classifies goods to tariff codes during processing, so declarations are prepared from structured data rather than retyped.",
    problem: [
      "A single shipment generates a stack of documents that repeat the same facts in different layouts, and a customs declaration requires them reconciled and correct. The work is transcription plus classification, done under time pressure, where an error means a delayed shipment or a penalty.",
      "Classification is the specialist part. Deciding the tariff code for a given description is judgement work that most extraction tools do not attempt at all, leaving it as a manual step after the automation finishes.",
    ],
    fields: [
      { name: "Shipper and consignee", note: "Full legal names and addresses, which drive the declaration." },
      { name: "Goods description per line", note: "The text the tariff classification is derived from — worth extracting verbatim." },
      { name: "HS tariff code", note: "Classified from the description by a Cleaner during processing rather than looked up afterwards." },
      { name: "Quantity, net and gross weight", note: "Weights are on the packing list while values are on the invoice, so the pair has to be reconciled." },
      { name: "Country of origin", note: "Drives duty rates and preferential treatment. Frequently per line rather than per shipment." },
      { name: "Incoterms and declared value", note: "Determines what is dutiable and who is responsible for what." },
      { name: "Container and B/L numbers", note: "The keys that let you tie the document set back to one shipment." },
    ],
    gotchas: [
      {
        title: "Classification is the hard part, and it is built in",
        body: "Most document tools stop at extraction and leave tariff classification as manual work. Tavnit ships an HS code Cleaner that classifies goods from the extracted description during the run, so the specialist step happens inside the pipeline rather than after it.",
      },
      {
        title: "One shipment, several documents, one truth",
        body: "The commercial invoice carries values, the packing list carries weights, the bill of lading carries the container. A Collection routes each document type to its own flow, and a shared Bucket keyed on the shipment reference reassembles them into a single picture.",
      },
      {
        title: "Errors here are penalties, not corrections",
        body: "A misdeclared code or value is a customs issue rather than an accounting one. This is a use case where review on every declaration is proportionate, and where the append-only audit trail is genuinely useful when you are asked to show how a classification was arrived at.",
      },
    ],
    pipeline: [
      { label: "Collections", href: "/docs/collections", why: "Routes invoices, packing lists and bills of lading from one inbox to the right flow automatically." },
      { label: "Cleaners", href: "/docs/cleaners", why: "Classifies goods to HS tariff codes, converts currencies and standardises weights and units." },
      { label: "Splitters", href: "/docs/splitters", why: "Shipment paperwork usually arrives as one combined PDF. Splitters separate it before extraction." },
      { label: "Human in the Loop", href: "/docs/human-in-the-loop", why: "Review each declaration before submission, with a record of who approved which classification." },
    ],
    faqs: [
      { q: "Does it actually assign HS tariff codes?", a: "Yes. An HS code Cleaner classifies goods from the extracted description during the run, so classification happens inside the pipeline rather than as a manual step afterwards. Declarations remain your responsibility, which is why review before submission is recommended." },
      { q: "Can it handle a full shipment document set?", a: "Yes. A Collection routes commercial invoices, packing lists and bills of lading to their own flows, and results keyed on the shipment reference reassemble into one record." },
      { q: "What if the paperwork arrives as one combined PDF?", a: "A Splitter separates the combined file into its constituent documents first, so each is extracted by the flow built for it." },
    ],
  },
];

export const USE_CASE_BY_SLUG = Object.fromEntries(
  USE_CASES.map((u) => [u.slug, u]),
) as Record<string, UseCase>;
