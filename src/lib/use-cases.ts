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
  {
    slug: "bank-statements",
    label: "Bank Statements",
    badge: "Finance & Lending",
    h1: "Bank statement data extraction",
    title: "Bank Statement Extraction — PDF to Transaction Rows",
    description:
      "Turn statement PDFs from any bank into transaction rows — date, description, amount, running balance — ready to reconcile or assess.",
    summary: "Statement PDFs from any bank turned into transaction rows you can reconcile, categorise or assess.",
    lede: "Tavnit reads bank statement PDFs from any institution and returns every transaction as a row: date, description, debit or credit, and running balance. Because the balance is extracted too, the arithmetic can be checked rather than assumed — which is what makes the output safe to reconcile against.",
    problem: [
      "Every bank formats statements differently, and none of them format for machines. Columns shift, transactions wrap onto two lines, and the running balance is the only thing tying the sequence together. Anyone doing lending assessment, bookkeeping or reconciliation ends up re-keying or paying for a per-bank connector.",
      "Open banking solves this where it is available and the customer consents. For everything else — historical periods, business accounts, banks without an API, statements supplied as evidence — the PDF is the only source there is.",
    ],
    fields: [
      { name: "Account holder, number and sort code", note: "Usually on page one only, so it has to be carried across a multi-page statement." },
      { name: "Statement period", note: "Defines what the totals mean, and the thing most often missing when someone re-keys manually." },
      { name: "Transaction date", note: "Frequently abbreviated with no year — the year comes from the statement period, not the row." },
      { name: "Description or counterparty", note: "Truncated and abbreviated by the bank. A category Cleaner infers merchant and type from it." },
      { name: "Debit, credit and running balance", note: "Extract all three. The balance is what lets you verify no rows were dropped." },
      { name: "Opening and closing balance", note: "The checksum for the whole statement." },
    ],
    gotchas: [
      {
        title: "A dropped row is invisible without the balance",
        body: "If extraction misses one transaction, the remaining rows still look perfectly plausible. Extracting the running balance turns that into a detectable error: a formula Cleaner can check each row's balance equals the previous balance plus the movement, and flag the statement rather than let it through.",
      },
      {
        title: "Transactions wrap, and wrapped lines are not new transactions",
        body: "Long counterparty names spill onto a second line, and naive table reading turns one payment into two rows with a blank amount. Table fields treat a row as a row, so a wrapped description stays attached to its amount.",
      },
      {
        title: "Dates rarely carry a year",
        body: "Most statements print '14 Mar' and rely on the period at the top for the year. That is fine for a human and wrong for a database — particularly across a year boundary in a January statement. Extract the statement period and derive the full date from it with a formula Cleaner.",
      },
    ],
    pipeline: [
      { label: "Flows", href: "/docs/flows", why: "Transactions are table fields, so each one returns as its own typed row rather than a block of text." },
      { label: "Cleaners", href: "/docs/cleaners", why: "Derives full dates from the statement period, verifies running balances, and categorises counterparties." },
      { label: "Buckets", href: "/docs/buckets", why: "Transactions land as a queryable table — filter by counterparty, group by month, chart the balance." },
      { label: "Human in the Loop", href: "/docs/human-in-the-loop", why: "Routes only the statements that fail a balance check to a person, rather than reviewing all of them." },
    ],
    faqs: [
      { q: "Does it work with any bank?", a: "Yes. There is no per-bank template to configure — the same flow reads statements from any institution, including business accounts and historical periods that an open banking API would not cover." },
      { q: "How do I know no transactions were missed?", a: "Extract the running balance alongside each transaction, then use a formula Cleaner to verify each row reconciles to the previous one. A statement that fails the check gets flagged rather than silently passing." },
      { q: "Can transactions be categorised automatically?", a: "Yes. An AI category Cleaner assigns a category from the description, so bookkeeping starts from classified rows rather than raw bank text." },
    ],
  },
  {
    slug: "supplier-quotes",
    label: "Supplier Quotes",
    badge: "Procurement & Sourcing",
    h1: "Supplier quote comparison",
    title: "Compare Supplier Quotes and Benchmark Prices",
    description:
      "Extract line items from competing quotes and compare them automatically — matching equivalent items across suppliers and naming the best price per line.",
    summary: "Competing quotes extracted and compared line by line, with the best price named per item.",
    lede: "Tavnit extracts line items from competing supplier quotes, then Matchers pair equivalent items across suppliers and name a champion per line on price. You get a comparison table rather than three PDFs and a spreadsheet you built by hand.",
    problem: [
      "Comparing quotes is the part of sourcing that never gets easier. Three suppliers send three layouts, describe the same item three different ways, and quote different pack sizes. Someone builds a spreadsheet, retypes everything, and hopes they matched the right rows.",
      "The matching is the actual difficulty. 'M8 hex bolt 50mm', 'Bolt, hex, M8x50' and 'HEX BOLT M8 50MM zinc' are the same item, and no exact-match lookup will ever pair them.",
    ],
    fields: [
      { name: "Supplier identity", note: "The field that names each participant in the comparison. One quote, one supplier." },
      { name: "Item description", note: "The text that gets matched across suppliers. Extract it verbatim — normalising too early destroys the signal matching needs." },
      { name: "Unit price", note: "The numeric field the champion is decided on. Non-numeric entries like 'POA' are excluded and reported rather than silently ignored." },
      { name: "Quantity and unit of measure", note: "Used as matching context so a 12-pack does not get paired with a single unit." },
      { name: "Lead time", note: "Frequently the deciding factor when prices are close, and rarely captured in manual comparisons." },
      { name: "Validity date and payment terms", note: "A cheaper quote with worse terms is not always cheaper." },
    ],
    gotchas: [
      {
        title: "The same item is never described the same way twice",
        body: "This is why exact matching fails and why comparison stays manual almost everywhere. Matchers pair rows semantically rather than by string equality, with an LLM tiebreaker for the ambiguous pairs, so differently-worded descriptions of the same item still line up.",
      },
      {
        title: "Pack size silently breaks a comparison",
        body: "A quote for a box of 12 against a quote for one unit is not a price difference, it is a unit error — and it is the mistake that survives review because both numbers look reasonable. Context fields let you include quantity and unit of measure in the match, so unlike items stay unmatched instead of producing a wrong winner.",
      },
      {
        title: "Not every line has a comparable price",
        body: "Quotes contain 'POA', 'included' and blank cells. Rather than dropping those rows quietly, the comparison excludes them from the championship and records a warning against the row, so you can see what was not compared instead of assuming everything was.",
      },
    ],
    pipeline: [
      { label: "Flows", href: "/docs/flows", why: "One flow reads every supplier's quote layout into the same field structure — the precondition for comparing them at all." },
      { label: "Cleaners", href: "/docs/cleaners", why: "Converts currencies so quotes in different currencies are compared on the same basis." },
      { label: "Buckets", href: "/docs/buckets", why: "Keeps quotes over time, so today's price can be checked against what the same supplier quoted last quarter." },
    ],
    faqs: [
      { q: "How does it match items described differently by each supplier?", a: "Matching is semantic rather than exact: item descriptions are compared by meaning, with an LLM tiebreaker resolving the ambiguous pairs. 'M8 hex bolt 50mm' and 'Bolt, hex, M8x50' pair up without you maintaining a synonym list." },
      { q: "Can I benchmark against one supplier rather than compare all of them?", a: "Yes. Benchmark mode treats one quote as the baseline and compares every other against it, which is the right shape when you have an incumbent and are testing the market." },
      { q: "What happens to lines that cannot be compared?", a: "Rows with non-numeric prices are excluded from the championship and recorded as warnings against that row, so gaps in the comparison are visible rather than hidden." },
    ],
  },
  {
    slug: "compliance-checks",
    label: "Compliance Checks",
    badge: "Compliance & Risk",
    h1: "Document compliance checks",
    title: "Automated Document Compliance Checklists",
    description:
      "Check a set of documents against a branched checklist — is everything present, consistent and within policy — and produce a report you can hand to an auditor.",
    summary: "A document set checked against a branched checklist, producing an auditable pass/fail report.",
    lede: "Tavnit's Inspector checks a set of documents against a checklist you define. It routes each uploaded file to its expected slot, extracts what the rules need, and evaluates the checklist deterministically — so the same evidence always produces the same verdict, with a report attached.",
    problem: [
      "Compliance review is usually a person with a checklist and a folder, confirming that the right documents are present, that the values agree across them, and that nothing has expired. It is slow, it is inconsistent between reviewers, and the evidence for why something passed is whatever that person remembers.",
      "The failure mode is not usually a missed document. It is a value that disagrees between two documents nobody compared side by side.",
    ],
    fields: [
      { name: "Expected document slots", note: "What the set should contain. A missing required slot is itself a finding, not just an absence." },
      { name: "Identity and entity fields", note: "The values that must agree across documents — names, registration numbers, addresses." },
      { name: "Dates and expiry", note: "Certificates and licences expire. Whether something is in date is a rule, not a field." },
      { name: "Amounts and declared values", note: "Cross-document consistency checks live here: does the invoice value match the declaration?" },
      { name: "Signatures and stamps present", note: "Presence rather than content, and one of the more common manual checks." },
      { name: "Checklist outcome per item", note: "Pass, fail or not applicable, per rule, with the value that drove it." },
    ],
    gotchas: [
      {
        title: "The real check is between documents, not inside one",
        body: "Any tool can read a value off a certificate. The finding that matters is that the value on the certificate disagrees with the one on the invoice. Because an inspection collects a whole set before it evaluates, checklist rules can compare across documents rather than only within one.",
      },
      {
        title: "Checklists branch, and flat ones hide gaps",
        body: "Whether a rule applies usually depends on an earlier answer — if the goods are restricted, then a licence is required. A branched checklist expresses that directly, so an inspection asks for the licence only when it is actually needed and does not quietly mark it not-applicable.",
      },
      {
        title: "An auditor asks how you decided, not what you decided",
        body: "Evaluation is deterministic — the same documents produce the same result rather than a fresh judgement each time — and the outcome is written to a report. Combined with review, you can show which values were extracted, which rules fired and who approved the result.",
      },
    ],
    pipeline: [
      { label: "Collections", href: "/docs/collections", why: "Mixed evidence arriving in one place gets classified and routed to the right flow before any checking happens." },
      { label: "Flows", href: "/docs/flows", why: "Each document type has its own flow, so a rule can reference a named field rather than searching free text." },
      { label: "Human in the Loop", href: "/docs/human-in-the-loop", why: "A reviewer signs off the inspection, and the append-only trail records who accepted which finding." },
      { label: "Buckets", href: "/docs/buckets", why: "Outcomes over time become reportable — how many sets failed, on which rule, in which month." },
    ],
    faqs: [
      { q: "Can it compare values across different documents?", a: "Yes — that is the point. An inspection collects the whole document set before evaluating, so rules can check that a value on one document agrees with a value on another rather than only validating each in isolation." },
      { q: "Is the result repeatable?", a: "Checklist evaluation is deterministic. The same documents and the same checklist produce the same outcome, which is what makes the result defensible when someone asks why a set passed." },
      { q: "What if a required document is missing?", a: "A missing required input is itself a finding. The inspection reports it rather than completing with a gap, and files uploaded without a named slot are routed automatically or flagged as unmatched." },
    ],
  },
  {
    slug: "form-filling",
    label: "Form Filling",
    badge: "Operations & Trade",
    h1: "Automated PDF form filling",
    title: "Fill PDF Forms from Extracted Document Data",
    description:
      "Fill official PDF forms automatically from data extracted across several source documents, with approval before anything is issued.",
    summary: "Official PDF forms filled automatically from data spread across several source documents.",
    lede: "Tavnit fills fillable PDF forms from data extracted across several source documents at once. A declaration can be populated from an invoice, a packing list and a bill of lading in one pass, with a person approving the values before the filled PDF is issued.",
    problem: [
      "A surprising amount of office work is copying values from documents you received into a form somebody else requires. Customs declarations, insurance forms, grant applications, regulatory returns — the information already exists, spread across three or four PDFs, and a person moves it by hand.",
      "It is also where errors are least forgivable. A transcription slip on a form that goes to an authority is a rejection or a penalty, not an internal correction.",
    ],
    fields: [
      { name: "Source document set", note: "One slot per source flow. The form fills once every required slot has a completed run." },
      { name: "Field mappings", note: "Which extracted field populates which PDF field. Configured once per template, reused every time." },
      { name: "Cleaner outputs as sources", note: "A mapped value can come from a Cleaner rather than raw extraction, so converted or computed values land in the form." },
      { name: "Human-fill fields", note: "Values nobody extracts — a reference number, a signatory — supplied at approval time." },
      { name: "Multiple templates", note: "One set of source documents can fill several different forms in the same pass." },
    ],
    gotchas: [
      {
        title: "The data is spread across documents, not sitting in one",
        body: "This is why generic document tools do not solve form filling: they extract from one file at a time. Filling takes one run per source flow and populates the form from all of them together, so weights from a packing list and values from an invoice reach the same output.",
      },
      {
        title: "Documents arrive in whatever order they arrive",
        body: "You rarely receive the full set at once. A fill stays open, collecting runs as documents arrive, and fires when every required slot is satisfied. Files uploaded without saying which slot they belong to are classified and routed automatically, and anything unmatched can be assigned by hand.",
      },
      {
        title: "Some fields are never in the source documents",
        body: "Every real form has values that exist nowhere upstream — an internal reference, a declarant name, a signature block. Those are human-fill fields, supplied at the approval step, which is also the natural point to correct anything the extraction got wrong before the PDF is issued.",
      },
    ],
    pipeline: [
      { label: "Flows", href: "/docs/flows", why: "One flow per source document type; the form draws from all of them at once." },
      { label: "Cleaners", href: "/docs/cleaners", why: "Converts and computes values so what lands in the form is already in the required unit or format." },
      { label: "Human in the Loop", href: "/docs/human-in-the-loop", why: "Approval before issue, with corrections and human-supplied fields captured at the same step." },
      { label: "Email Integration", href: "/docs/email-integration", why: "Source documents forwarded to an address feed the fill without anyone opening the app." },
    ],
    faqs: [
      { q: "Can one form be filled from several documents?", a: "Yes. Each source document type gets its own slot, and the form is populated from all of them together — which is the normal case for declarations and claims." },
      { q: "What about fields that are not in any document?", a: "Those are human-fill fields, entered at the approval step alongside any corrections, so the final PDF is checked before it is issued." },
      { q: "Can one set of documents fill more than one form?", a: "Yes. A configuration can hold several templates, and every one is filled from the same set of runs in a single pass." },
    ],
  },
  {
    slug: "call-analytics",
    label: "Call Analytics",
    badge: "Sales & Support",
    h1: "Turn recorded conversations into data",
    title: "Call Analytics — Structure Recorded Conversations",
    description:
      "Turn sales, support and counter recordings into a table — who said what, which rules were met, and how each conversation was resolved.",
    summary: "Sales, support and counter recordings turned into a table of turns, rules and outcomes.",
    lede: "Tavnit Signals turns audio recordings into a flat table. It separates speakers, splits a recording into its distinct conversations, classifies each one, and evaluates your rules and extraction fields turn by turn — so a day of calls becomes rows you can filter rather than hours you have to listen to.",
    problem: [
      "Conversations are where most of what a company learns actually happens, and almost none of it is captured. Recordings exist, but reviewing them means listening, so in practice a manager samples a handful and generalises from those.",
      "Where QA does happen, it is a person with a scorecard filling in a form after each call — expensive, inconsistent between reviewers, and covering a fraction of the volume.",
    ],
    fields: [
      { name: "Interaction type", note: "One recording often contains several conversations. Each is classified — sale, support, return — or marked as other." },
      { name: "Speaker role", note: "Turns are attributed to expected participants such as salesperson or customer; unexpected voices are labelled other." },
      { name: "Turn-level rules", note: "Yes/no checks applied to every turn — was the promotion mentioned, was the disclaimer read." },
      { name: "Extraction fields", note: "Data pulled from each turn, such as products mentioned or objections raised." },
      { name: "Content categories", note: "Each turn labelled — objection, question, problem, solution, appreciation — so patterns are countable." },
      { name: "Conversation outcome", note: "Judged once over the whole conversation: was the sale closed, was the issue resolved." },
    ],
    gotchas: [
      {
        title: "One recording is not one conversation",
        body: "A shift recording from a counter or a support line contains many separate exchanges. Treating the file as a single conversation produces averages that describe nothing. Recordings are split into distinct interactions first, each classified and evaluated on its own — the audio equivalent of splitting a multi-document PDF.",
      },
      {
        title: "Turn-level and conversation-level questions are different questions",
        body: "'Was the discount mentioned' is asked of each turn and can be true several times. 'Was the sale resolved' is asked once of the whole exchange. Conflating them gives you a metric that counts mentions when you wanted outcomes, so the two are evaluated separately and the conversation-level answer repeats across that interaction's rows.",
      },
      {
        title: "Recording people has rules attached",
        body: "Consent and retention requirements for call recording vary by jurisdiction and are stricter than for documents. That is your obligation rather than something the pipeline decides — but per-bucket visibility and access grants let you keep transcripts and outcomes restricted to the people who need them.",
      },
    ],
    pipeline: [
      { label: "Buckets", href: "/docs/buckets", why: "Completed recordings export to a bucket automatically, so calls accumulate into something you can query and chart." },
      { label: "Webhooks", href: "/docs/webhooks", why: "Pushes the output table to your own systems as soon as a recording finishes processing." },
      { label: "User Roles", href: "/docs/user-roles", why: "Conversation data is sensitive; roles and per-bucket grants keep it to the people running the programme." },
    ],
    faqs: [
      { q: "What audio formats are supported?", a: "MP3, WAV and FLAC recordings can be uploaded and processed." },
      { q: "Can it handle a recording with many separate conversations?", a: "Yes. A recording is split into its distinct interactions first, and each is classified and evaluated separately — so a full shift at a counter produces per-conversation results rather than one blended average." },
      { q: "Can I score every call rather than a sample?", a: "Yes. Rules are evaluated on every turn of every processed recording, which is the practical difference from manual QA — coverage rather than a sample." },
    ],
  },
  {
    slug: "delivery-notes",
    label: "Delivery Notes",
    badge: "Logistics & Warehouse",
    h1: "Delivery note and proof of delivery capture",
    title: "Delivery Note Extraction and Goods-Received Checks",
    description:
      "Capture what was actually delivered from signed delivery notes and PODs, including handwritten annotations, and check it against what was ordered.",
    summary: "What was actually delivered captured from signed notes and PODs — handwriting included.",
    lede: "Tavnit reads delivery notes and proofs of delivery, including the handwritten annotations drivers and receivers add, and returns delivered quantities as structured rows. Because purchase orders are extracted into the same shape, checking delivered against ordered becomes a query.",
    problem: [
      "The delivery note is the only record of what physically arrived, and it is usually the worst-quality document in the chain: photographed in a yard, signed over the print, annotated by hand where quantities differed.",
      "It is also the document that matters most for disputes. If the invoice says twelve and the note says ten, the note is the evidence — assuming anyone captured what it said.",
    ],
    fields: [
      { name: "Delivery note and PO number", note: "The keys that tie the delivery back to what was ordered." },
      { name: "Delivered quantity per line", note: "The number that actually matters, and the one most often amended by hand." },
      { name: "Handwritten amendments", note: "Crossed-out quantities and margin notes carry the real figure. Ignoring them means capturing the wrong one." },
      { name: "Receiver name and signature present", note: "Presence of a signature is frequently the acceptance test." },
      { name: "Delivery date and time", note: "Drives SLA measurement and dispute timelines." },
      { name: "Condition or damage notes", note: "Free text, usually handwritten, and the basis of any claim." },
    ],
    gotchas: [
      {
        title: "The handwriting is the important part",
        body: "A printed delivery note says what was supposed to arrive. The handwritten amendment says what did. Extraction reads handwriting as well as print, which is the difference between capturing the shipment as planned and capturing the shipment as delivered.",
      },
      {
        title: "Photographed in a yard, not scanned in an office",
        body: "PODs arrive as phone photos at an angle, in poor light, sometimes with a thumb in frame. Extraction copes with most of it, but this is a document type where routing low-confidence results to a person is worth doing rather than trusting every capture.",
      },
      {
        title: "The value is in the comparison, not the capture",
        body: "A delivered quantity on its own tells you little. Extracting delivery notes into the same field structure as your purchase orders turns three-way matching into a query on the PO number rather than three documents held up to the light.",
      },
    ],
    pipeline: [
      { label: "Email Integration", href: "/docs/email-integration", why: "Drivers and carriers email photographed PODs; forwarding them in processes each on arrival." },
      { label: "Flows", href: "/docs/flows", why: "Delivered lines are table fields, matching the structure used for purchase orders." },
      { label: "Buckets", href: "/docs/buckets", why: "Holds deliveries and orders in one place, so discrepancies surface as a query rather than an audit." },
      { label: "Human in the Loop", href: "/docs/human-in-the-loop", why: "Reviews the poor captures and the amended quantities, where the cost of being wrong is a dispute." },
    ],
    faqs: [
      { q: "Can it read handwritten amendments?", a: "Yes. Handwriting is extracted alongside printed text, which matters here because the handwritten quantity is usually the accurate one." },
      { q: "Will it work with photos taken on a phone?", a: "Usually. Photos, angles and poor lighting are the norm for PODs. Conditional review is worth enabling so the marginal captures reach a person instead of passing silently." },
      { q: "Can deliveries be checked against orders?", a: "Extract both into the same field structure and the comparison is a query on the PO number in your Bucket, rather than a manual document-to-document check." },
    ],
  },
  {
    slug: "insurance-claims",
    label: "Insurance Claims",
    badge: "Insurance & Claims",
    h1: "Insurance claim document processing",
    title: "Insurance Claim Document Extraction",
    description:
      "Process claim forms and their supporting evidence together — estimates, invoices, reports and photos — into one structured, reviewable record.",
    summary: "Claim forms and supporting evidence processed together into one structured, reviewable record.",
    lede: "Tavnit processes a claim and the evidence supporting it as one set: the claim form, repair estimates, invoices and reports. Each document type is routed to its own flow, and the results assemble into a single record a handler can assess rather than a folder they have to read.",
    problem: [
      "A claim is never one document. It is a form plus whatever the claimant sent — estimates, receipts, a police report, photographs — arriving over days, in no order, by email.",
      "Handlers spend most of their time assembling rather than assessing: opening attachments, finding the amounts, checking that the figure claimed matches the figure on the estimate.",
    ],
    fields: [
      { name: "Claim and policy number", note: "The keys everything in the set joins on, and often the only thing consistent across documents." },
      { name: "Claimant and incident details", note: "Date, location and description of loss, usually spread between the form and a narrative." },
      { name: "Amount claimed", note: "What the form says. Worth extracting separately from what the evidence supports." },
      { name: "Supporting amounts", note: "Estimate and invoice totals — the figures the claimed amount should reconcile to." },
      { name: "Third-party details", note: "Other parties, insurers and reference numbers, needed for recovery." },
      { name: "Document type per attachment", note: "Knowing what each file is determines which flow reads it." },
    ],
    gotchas: [
      {
        title: "Evidence arrives late and out of order",
        body: "Assessment cannot start until the set is complete, and the set completes over days. Collections classify each attachment as it lands so the record builds incrementally, rather than someone re-reading the whole folder each time something new arrives.",
      },
      {
        title: "The claimed amount and the evidenced amount are different fields",
        body: "Extracting one number per claim loses the check that matters. Capture what was claimed and what the estimates and invoices actually total, and the discrepancy becomes a value you can filter on rather than something a handler has to notice.",
      },
      {
        title: "Claim files are personal, and often medical",
        body: "Claims routinely contain health information, identity documents and financial detail. Private Buckets with per-user access grants keep a claim visible to the handlers on it rather than to everyone in the organisation.",
      },
    ],
    pipeline: [
      { label: "Collections", href: "/docs/collections", why: "Classifies each attachment — form, estimate, invoice, report — and routes it to the flow built for it." },
      { label: "Email Integration", href: "/docs/email-integration", why: "Claims arrive by email; forwarding to a Collection address processes every attachment as it lands." },
      { label: "Cleaners", href: "/docs/cleaners", why: "Normalises dates and currencies, and computes the gap between claimed and evidenced amounts." },
      { label: "Human in the Loop", href: "/docs/human-in-the-loop", why: "Handlers approve or reject with a permanent record of the decision and who made it." },
    ],
    faqs: [
      { q: "Can it handle a claim with many different attachments?", a: "Yes. A Collection classifies each attachment and routes it to the right flow, so a claim form, an estimate and an invoice are each read by the flow built for that document type." },
      { q: "Can it flag claims where the numbers do not agree?", a: "Extract the claimed amount and the supporting totals as separate fields, then use a Cleaner to compute the difference. Claims that fail the check can be routed to review automatically." },
      { q: "How is sensitive claim data protected?", a: "Buckets can be private rather than organisation-visible, with per-user Viewer or Editor grants, so a claim is visible only to the handlers working it." },
    ],
  },
  {
    slug: "identity-verification",
    label: "Identity & Onboarding",
    badge: "KYC & Onboarding",
    h1: "Identity and onboarding document capture",
    title: "KYC Document Extraction for Client Onboarding",
    description:
      "Capture identity and proof-of-address documents during onboarding, check the details agree across them, and keep an auditable record of the decision.",
    summary: "Identity and address documents captured, cross-checked for consistency, and recorded auditably.",
    lede: "Tavnit reads the documents collected during onboarding — identity documents, proof of address, incorporation papers — and returns names, numbers, dates and addresses as structured fields. Because the whole set is processed together, whether the details agree across documents becomes a check rather than an assumption.",
    problem: [
      "Onboarding a client means collecting documents, reading them, and confirming they describe the same person or entity. The reading is tedious; the confirming is the part that carries risk, and it is done by eye.",
      "Volume makes it worse. A team that onboards steadily ends up with inconsistent standards between reviewers and no reliable record of what was checked when.",
    ],
    fields: [
      { name: "Full name as printed", note: "Extract verbatim. Ordering and transliteration differ between documents and that difference is the check." },
      { name: "Date of birth", note: "The single most useful cross-document consistency field." },
      { name: "Document number and type", note: "Passport, national ID, licence — each with its own numbering conventions." },
      { name: "Issue and expiry dates", note: "Expiry is a rule rather than a field: an expired document is a finding." },
      { name: "Address", note: "From proof-of-address documents, which need to agree with what the client declared." },
      { name: "Entity registration details", note: "For business onboarding — company number, registered office, directors." },
    ],
    gotchas: [
      {
        title: "Names do not match, and that is normal",
        body: "The same person appears as 'Jose Garcia Lopez', 'J. García' and 'GARCIA LOPEZ, JOSE' across three documents. Extract names verbatim rather than normalising during extraction, then compare deliberately — normalising too early throws away exactly the difference you need to assess.",
      },
      {
        title: "Photographed ID is the norm and quality varies",
        body: "Clients photograph documents on phones, with glare across the machine-readable zone as often as not. Review on onboarding is proportionate given what a mistake costs, and the audit trail then records who accepted which document.",
      },
      {
        title: "This is the most regulated data you will process",
        body: "Identity documents carry retention limits, erasure rights and access obligations that ordinary business documents do not. Private Buckets and per-user grants keep onboarding files to the compliance team, and the append-only trail evidences who accessed what.",
      },
    ],
    pipeline: [
      { label: "Collections", href: "/docs/collections", why: "Classifies whatever the client sent — passport, utility bill, incorporation certificate — and routes each to the right flow." },
      { label: "Flows", href: "/docs/flows", why: "One flow per document type, so a check can reference a named field rather than searching text." },
      { label: "Human in the Loop", href: "/docs/human-in-the-loop", why: "Sign-off on every onboarding, with a permanent record of who approved which document." },
      { label: "User Roles", href: "/docs/user-roles", why: "Restricts identity documents to the team that needs them rather than the whole organisation." },
    ],
    faqs: [
      { q: "Does it verify that a document is genuine?", a: "No. Tavnit extracts and structures what the documents say, and lets you check consistency across a set. Authenticity verification against issuing authorities is a separate specialism, and this does not replace it." },
      { q: "Can it check that details agree across documents?", a: "Yes. Process the set together and compare the extracted fields — name, date of birth, address — so a mismatch surfaces as a value rather than something a reviewer has to spot." },
      { q: "How is identity data kept restricted?", a: "Private Buckets with per-user access grants limit visibility to the compliance team, and the append-only audit trail records every view, edit and approval." },
    ],
  },
  {
    slug: "lease-agreements",
    label: "Leases & Property",
    badge: "Real Estate & Facilities",
    h1: "Lease agreement data extraction",
    title: "Lease Abstraction — Rent, Terms and Break Dates",
    description:
      "Abstract leases into structured records — rent, review dates, break clauses, service charges and repair obligations — across a whole portfolio.",
    summary: "Leases abstracted into structured records: rent, reviews, break dates and obligations.",
    lede: "Tavnit abstracts leases into structured records: parties, demised premises, term, rent and review dates, break clauses, service charge basis and repair obligations. A portfolio held as PDFs becomes a table where the next rent review is a filter rather than a reading exercise.",
    problem: [
      "Lease abstraction is a well-established manual job precisely because the answers are buried in drafting rather than printed in fields. Firms pay for it, repeatedly, and the resulting spreadsheet goes stale the moment a lease is varied.",
      "The cost of not having it is specific and expensive: a missed break date, an unexercised option, a rent review that passed without challenge.",
    ],
    fields: [
      { name: "Landlord, tenant and guarantor", note: "Legal entities rather than trading names, and frequently varied by later deeds." },
      { name: "Demised premises", note: "Described in prose and by plan reference, rarely as a clean address." },
      { name: "Term, commencement and expiry", note: "The spine of every other date in the document." },
      { name: "Rent and review dates", note: "Review basis — open market, indexed, stepped — matters as much as the amount." },
      { name: "Break clauses and conditions", note: "A break right with unmet conditions is not a break right. Extract both." },
      { name: "Service charge and repair obligations", note: "Where liability actually sits, and usually the longest clauses in the document." },
    ],
    gotchas: [
      {
        title: "Dates are defined, not stated",
        body: "A lease rarely prints the break date. It says the tenant may break on the fifth anniversary of the term commencement, giving six months' notice. Extract the commencement, the anniversary and the notice period as fields, then let a formula Cleaner compute the actual deadline — which is the date you needed.",
      },
      {
        title: "The operative document is often not the lease",
        body: "Deeds of variation, licences to alter and side letters change the position, and the original lease still reads as though they do not exist. Process each as its own run with its date captured, so the current position is derived from the full set rather than from whichever PDF someone opened.",
      },
      {
        title: "A conditional right read as unconditional is a liability",
        body: "Break clauses are routinely conditional on vacant possession or rent being paid up to date. Capturing the right without the conditions produces a portfolio table that is confidently wrong, which is worse than no table. Extract conditions as their own field and review them.",
      },
    ],
    pipeline: [
      { label: "Flows", href: "/docs/flows", why: "Extraction hints are essential here — the model needs to know what a break condition is, not just where to look." },
      { label: "Cleaners", href: "/docs/cleaners", why: "Computes review and break deadlines from commencement dates and notice periods." },
      { label: "Buckets", href: "/docs/buckets", why: "The portfolio as a table: which leases break next year, sorted by notice deadline." },
      { label: "Human in the Loop", href: "/docs/human-in-the-loop", why: "Review every abstraction. The cost of a wrong date here is measured in years of rent." },
    ],
    faqs: [
      { q: "Can it compute break and review dates?", a: "Yes. Extract the commencement date, the anniversary the right attaches to and the notice period, then a formula Cleaner derives the actual deadline — which is usually what you wanted rather than the clause itself." },
      { q: "What about deeds of variation?", a: "Process each document as its own run with its date captured as a field. The current position then comes from querying the whole set rather than assuming the newest file is authoritative." },
      { q: "Does it capture the conditions attached to a break clause?", a: "It should, and the page argues it must — a break right recorded without its conditions produces a portfolio table that reads as certain and is not. Extract conditions as their own field and review them." },
    ],
  },
  {
    slug: "timesheets",
    label: "Timesheets",
    badge: "Payroll & Staffing",
    h1: "Timesheet and shift record capture",
    title: "Timesheet Data Extraction for Payroll",
    description:
      "Capture hours from submitted timesheets — printed, handwritten or photographed — and check them against rules before they reach payroll.",
    summary: "Hours captured from printed, handwritten and photographed timesheets, checked before payroll.",
    lede: "Tavnit reads submitted timesheets, including handwritten and photographed ones, and returns worker, date, hours and cost code as rows. Rules can check the totals before anything reaches payroll, so the errors that turn into pay corrections get caught while they are still cheap.",
    problem: [
      "Payroll runs to a deadline, and timesheets arrive in whatever form each site or agency uses — a spreadsheet print, a paper sheet photographed at the end of a shift, a PDF from a subcontractor's own system.",
      "Someone re-keys them under time pressure, which is exactly the condition under which transcription errors happen. A wrong figure discovered after the run is a correction, an adjustment and an unhappy conversation.",
    ],
    fields: [
      { name: "Worker name or number", note: "Names on timesheets rarely match payroll records exactly — a lookup Cleaner maps them." },
      { name: "Date or week ending", note: "Determines which pay period the hours belong to, and is easy to misread across a period boundary." },
      { name: "Start, end and break times", note: "Extracting the components rather than just the total lets the total be verified." },
      { name: "Total hours", note: "Worth extracting as submitted and comparing to the computed total." },
      { name: "Overtime and premium hours", note: "Different rates, so misclassification is a pay error rather than a rounding one." },
      { name: "Cost code or project", note: "Drives job costing, and is the field most often left blank." },
    ],
    gotchas: [
      {
        title: "The stated total and the real total disagree more than you would expect",
        body: "People add up their own hours, and they get it wrong. Extracting start, end and break times as well as the stated total lets a formula Cleaner compute the hours and compare — the discrepancies that surface are usually genuine arithmetic mistakes rather than extraction errors.",
      },
      {
        title: "Handwritten timesheets are the hard case, and common",
        body: "Site and shift work still runs on paper photographed at the end of the day. Handwriting is extracted, but confidence varies, and this is a use case where routing uncertain captures to review beats discovering the problem in a payslip.",
      },
      {
        title: "Names on timesheets are not names in payroll",
        body: "'Dave S.', 'David Smith' and an employee number all refer to the same person, and payroll needs the number. A lookup Cleaner matches submitted names against your worker list during processing, so unmatched entries are flagged rather than guessed at.",
      },
    ],
    pipeline: [
      { label: "Email Integration", href: "/docs/email-integration", why: "Sites and agencies email sheets at the end of the week; forwarding processes them on arrival." },
      { label: "Splitters", href: "/docs/splitters", why: "A single PDF of a whole crew's sheets becomes one run per worker." },
      { label: "Cleaners", href: "/docs/cleaners", why: "Computes hours from times, matches names to payroll records, and flags totals that do not reconcile." },
      { label: "Human in the Loop", href: "/docs/human-in-the-loop", why: "Only the sheets that fail a check reach a person, which is what makes this viable on a payroll deadline." },
    ],
    faqs: [
      { q: "Can it read handwritten timesheets?", a: "Yes. Handwriting is extracted alongside printed text, though confidence varies with legibility — which is why routing uncertain sheets to review is worth enabling here." },
      { q: "Can it check the hours add up?", a: "Yes. Extract start, end and break times alongside the stated total, and a formula Cleaner computes the hours and flags any sheet where the two disagree." },
      { q: "What if names do not match our payroll system?", a: "A lookup Cleaner matches submitted names against your worker list during processing. Entries it cannot match are flagged rather than guessed, so nothing reaches payroll unattributed." },
    ],
  },
  {
    slug: "utility-bills",
    label: "Utility Bills",
    badge: "Facilities & ESG",
    h1: "Utility bill and meter data extraction",
    title: "Utility Bill Extraction for Cost and Emissions",
    description:
      "Extract consumption, tariffs and meter readings from utility bills across a property portfolio, for cost control and emissions reporting.",
    summary: "Consumption, tariffs and meter readings extracted across a portfolio, for cost and emissions reporting.",
    lede: "Tavnit reads electricity, gas, water and waste bills and returns consumption, tariff, meter readings and charges per site. A portfolio's bills become a table you can trend — which is what both cost control and emissions reporting actually require.",
    problem: [
      "Anyone managing more than a handful of sites receives bills from several suppliers in several formats, and the only thing that reliably happens to them is payment. The consumption data — the part with analytical value — stays in the PDF.",
      "Emissions reporting has made this urgent. Scope 1 and 2 reporting needs consumption in kWh by site and period, and for most organisations that data exists only as a stack of bills nobody has transcribed.",
    ],
    fields: [
      { name: "Supply address and meter number (MPAN/MPRN)", note: "The identifier that ties a bill to a site. Addresses alone are unreliable across suppliers." },
      { name: "Billing period", note: "Bills rarely align to calendar months, which matters when you aggregate by quarter." },
      { name: "Consumption with unit", note: "kWh, m³ or litres. The unit is as important as the number and is not always stated the same way." },
      { name: "Meter readings and estimate flag", note: "An estimated read is not a measurement, and treating it as one corrupts a trend." },
      { name: "Tariff and standing charge", note: "What separates a price change from a consumption change." },
      { name: "Total charges and tax", note: "For cost reconciliation against what was actually paid." },
    ],
    gotchas: [
      {
        title: "Estimated readings are not data",
        body: "Suppliers estimate when they cannot read a meter, then correct on the next actual read. A trend built without distinguishing the two shows a spike that never happened followed by a drop that never happened. Extract the estimate flag as its own field so estimates can be excluded or treated separately.",
      },
      {
        title: "Billing periods do not align to anything",
        body: "One supplier bills monthly, another every 28 days, a third quarterly, and none of them align to your reporting periods. Extract period start and end rather than a single date, so consumption can be apportioned across the periods you actually report on.",
      },
      {
        title: "Units differ, and gas is the trap",
        body: "Gas is frequently billed in cubic metres and reported in kWh, and the conversion depends on a calorific value printed on the bill. Extract the unit and the conversion factor rather than assuming, then let a unit Cleaner do the conversion — assuming a standard factor is where most emissions numbers quietly go wrong.",
      },
    ],
    pipeline: [
      { label: "Collections", href: "/docs/collections", why: "Bills from different utilities and suppliers arrive together and get routed to the right flow automatically." },
      { label: "Cleaners", href: "/docs/cleaners", why: "Converts units to a single reporting basis and computes period-apportioned consumption." },
      { label: "Buckets", href: "/docs/buckets", why: "Consumption by site and period as a chartable table — the format both finance and ESG reporting need." },
      { label: "Email Integration", href: "/docs/email-integration", why: "Suppliers email bills; forwarding them in builds the dataset without a data-entry project." },
    ],
    faqs: [
      { q: "Can it handle bills from different utilities and suppliers?", a: "Yes. A Collection classifies each bill and routes it to the right flow, so electricity, gas and water bills are each read by the flow built for them, whatever the supplier's layout." },
      { q: "Is the data usable for emissions reporting?", a: "It produces consumption by site and period with units captured, which is the input such reporting needs. Extract the estimate flag and the conversion factor rather than assuming a standard one — that assumption is where most emissions figures go wrong." },
      { q: "Can it separate a price rise from a consumption rise?", a: "Extract tariff and standing charge alongside consumption, and the two become separate columns you can trend independently." },
    ],
  },
];

export const USE_CASE_BY_SLUG = Object.fromEntries(
  USE_CASES.map((u) => [u.slug, u]),
) as Record<string, UseCase>;
