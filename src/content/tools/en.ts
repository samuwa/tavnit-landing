import type { LiteLocaleCopy } from "@/lib/lite/copy-base";

/**
 * Free tools copy — English (the translation source for every new language).
 *
 * One file per language: `base` is one complete tool written with document
 * tokens ({doc}, {a_doc}, {Doc}…, filled from each tool's `vocab`; {limit}
 * is the daily quota); `tools` supplies each tool's words and only the
 * strings that differ from the base; `hub`, `shell` and `related` are the
 * hub page, the Lite header/footer and the "when it is every document" block;
 * `og` is the subtitle of each tool's social card. Assembled by
 * src/lib/lite/copy.ts. Column names, flows and samples are NOT here: they
 * belong to the engine (src/lib/lite/defs, engineLocale()).
 */

const INVOICE_VOCAB = {
  doc: "invoice",
  docs: "invoices",
  a_doc: "an invoice",
  the_doc: "the invoice",
  the_docs: "the invoices",
  your_doc: "your invoice",
  your_docs: "your invoices",
  all_your_docs: "all your invoices",
  all_docs: "all invoices",
  each_doc: "every invoice",
  another_doc: "another invoice",
  this_doc: "this invoice",
};

const copy: LiteLocaleCopy = {
  base: {
    title: "{Doc} to Excel, free: extract line items from any {doc} with AI",
    description:
      "Upload {a_doc} as PDF or photo and get its line items as an Excel table: description, quantity, unit price and total. Free, no templates, no sign-up to see the result.",
    label: "{Doc} to Excel",
    h1: "Turn {a_doc} into Excel",
    intro:
      "Upload the PDF or photo. Tavnit reads the header and every line of the table and hands it back as a spreadsheet. No per-vendor templates: the same tool works on {all_your_docs}.",
    trust: ["PDF, JPG or PNG · up to 5 pages", "{limit} free documents a day", "Everything deleted after 24 h"],
    drop: {
      title: "Drop {your_doc} here",
      hint: "or choose a file from your computer",
      choose: "Choose file",
      sample: "Try it with a sample {doc}",
      formats: "PDF, JPG or PNG · up to 4 MB and 5 pages",
    },
    stages: [
      "Uploading the document",
      "Reading the header",
      "Finding the line-item table",
      "Ordering the columns",
      "Almost there",
    ],
    result: {
      heading: "Done: {file}",
      rowWord: ["row", "rows"],
      pageWord: ["page", "pages"],
      summary: "{rows} · {pages}",
      truncated: "Showing {shown} of {total} rows. The Excel holds the same {shown}.",
      readyIn: "ready in {s} s",
      sum: "Sum",
      viewer: "Your document",
      openDocument: "View the document",
      closeDocument: "Close",
      retention: "deletes itself after 24 h",
      hideColumn: "Remove column",
      hiddenCols: ["1 column removed. The Excel leaves it out.", "{n} columns removed. The Excel leaves them out."],
      restoreAll: "Restore all",
      restoreOne: "Restore {col}",
      ghostColumn: "+ Your field",
      ghostHint: "In Tavnit you add the fields you want: PO number, due date, cost centre…",
      flowNote: "These {fields} columns are the fields of a fixed {doc} Flow. In your account, you choose the fields.",
      flowNoteCta: "See how",
      download: "Download Excel",
      downloading: "Preparing the file",
      another: "Process {another_doc}",
      empty: "We could not find a line-item table in this document. Try {a_doc} with quantities and prices per line.",
    },
    errors: {
      empty: "The file is empty.",
      too_large: "The file is over 4 MB. Compress it or upload only {the_doc} pages.",
      unsupported: "Only PDF, JPG or PNG files are accepted.",
      unreadable: "We could not open this PDF. If it is password-protected, remove the password and try again.",
      too_many_pages: "The free version processes up to 5 pages per document.",
      captcha: "We could not confirm you are not a bot. Reload the page and try again.",
      quota: "You have used your {limit} free documents for today. They come back tomorrow, or create an account to keep going.",
      daily_cap: "The free tool has reached today's capacity. Come back tomorrow, or create an account and continue now.",
      unavailable: "The tool is not available right now. Try again in a few minutes.",
      backend: "Something failed while processing the document. Try again.",
      failed: "We could not extract this document. Try {another_doc}, or the sample.",
      timeout: "This is taking longer than usual. Wait a moment and try again.",
      forbidden: "This action is not allowed from here.",
      bad_request: "The file is missing or could not be read.",
    },
    auth: {
      title: "Create a free account to download",
      body: "The Excel downloads right away. With an account you can also do this on {all_your_docs} in one go.",
      google: "Continue with Google",
      or: "or with your email",
      signin: "Sign in",
      signup: "Create account",
      name: "Name",
      email: "Email",
      password: "Password",
      submitSignin: "Sign in and download",
      submitSignup: "Create account and download",
      switchToSignin: "I already have an account",
      switchToSignup: "I don't have an account yet",
      checkEmail:
        "We sent you an email to confirm the account. Open it, and when you come back the Excel is ready to download.",
      existing: "That email already has an account. Sign in to download.",
      forgot: "Forgot my password",
      close: "Close",
      generic: "We could not complete the sign-up. Check the email and password and try again.",
    },
    next: {
      heading: "And then what?",
      lead: "That was one {doc}. With an account, the same happens to {each_doc} that arrives, and the lines do not stop at an Excel: they keep going on their own.",
      source: "{Your_doc}",
      node: "Tavnit",
      nodeSub: "Extraction Flow",
      items: [
        {
          short: "Lands in your inbox",
          via: "email",
          title: "The result lands in your inbox",
          body: "When extraction finishes, Tavnit emails the addresses you set on the Flow, with the rows attached as rows.csv. With review on, the email waits for approval.",
          linkLabel: "Email output",
          href: "/docs/email-integration",
          scene: [{ label: "Extraction finishes" }, { label: "Tavnit composes the email" }, { label: "It reaches whoever you choose", result: "rows.csv attached" }],
        },
        {
          short: "Lands in your ERP",
          via: "webhook",
          title: "Lands in your ERP through a webhook",
          body: "When a run completes, Tavnit POSTs the rows and the run_id to the URL you give it. Zapier, Make and n8n receive it with their webhook trigger; nothing native needed.",
          linkLabel: "Webhooks",
          href: "/docs/webhooks",
          scene: [{ label: "The extracted rows" }, { label: "One POST with rows and run_id" }, { label: "They appear in your system", result: "6 lines, nobody typed" }],
        },
        {
          short: "Review before posting",
          via: "review",
          title: "A person approves before it posts",
          body: "Turn review on for the Flow and every run pauses. The reviewer sees the editable table next to the original document: fixes cells, excludes rows, adds columns, and approves or rejects. Only on approval do the email, webhook and Bucket go out; every decision is on record. A review-only role exists for people who should see nothing else.",
          linkLabel: "Human in the loop",
          href: "/docs/human-in-the-loop",
          scene: [{ label: "The run pauses for review" }, { label: "A person fixes it next to the document" }, { label: "Approved: only then delivered", result: "1 cell fixed · on record" }],
        },
        {
          short: "Compare quotes",
          via: "Matcher",
          title: "Compare several quotes line by line",
          body: "A Matcher takes several runs of the same Flow, say three supplier quotes, pairs the lines by description and marks the cheapest per line in a Champion column.",
          linkLabel: "Supplier quotes",
          href: "/use-cases/supplier-quotes",
          scene: [{ label: "Three quotes, one Flow" }, { label: "The Matcher pairs the lines" }, { label: "Champion column: best per line", result: "Supplier B wins 4 of 5" }],
        },
        {
          short: "Rules and validations",
          via: "Cleaner",
          title: "A Cleaner cleans and validates every row",
          body: "Date format, number format, calculated fields, currency conversion at published rates, and conditional actions: when a line fails, send it for review, email or webhook.",
          linkLabel: "Cleaners",
          href: "/docs/cleaners",
          scene: [{ label: "The data as it arrives" }, { label: "The Cleaner applies your rules" }, { label: "Clean, with failures flagged", result: "date, number and sum in order" }],
        },
        {
          short: "An Agent opens the portal",
          via: "Agent",
          title: "An Agent logs into the supplier portal",
          body: "You write the mission in plain words, with a start URL and credentials in a vault the model never sees. When extraction completes, the Agent starts on its own with the document's fields and brings back what you asked for, typed: price, lead time, files.",
          linkLabel: "Agents",
          href: "/docs/agents",
          scene: [{ label: "Extraction finishes" }, { label: "The Agent browses the portal" }, { label: "Brings the data back, typed", result: "price 18.50 · lead time 5 days" }],
        },
        {
          short: "Questions over your data",
          via: "Bucket",
          title: "Ask {your_docs} questions",
          body: "Rows are stored in a Bucket. You ask in plain language; Tavnit turns the question into a plan (sum, filter, month), runs it on the database and answers with the figure. The model never does the arithmetic.",
          linkLabel: "Buckets",
          href: "/docs/buckets",
          scene: [{ label: "\"How much did we buy from Istmo in August?\"" }, { label: "A plan: sum · supplier · month" }, { label: "The figure, computed in the database", result: "$12,480 across 4 {docs}" }],
        },
      ],
      hint: "Tap an option, or the Tavnit chip, to see what happens.",
      flow: {
        title: "The Flow: you decide the columns",
        body: "A Flow is the definition of one document type: the list of fields you want out, each with a name, a data type and whether it appears once per document or once per line, plus a hint on where to look when needed. Switch it on and every document that arrives is read for exactly those fields; the table that comes out has one column per field. This tool uses a fixed {doc} Flow with {fields} fields. In your account you add, remove and rename fields, and create Flows for any other document. No templates, no coordinates.",
        linkLabel: "How a Flow is defined",
        href: "/docs/flows",
        scene: [{ label: "You define the fields in two groups: document and table" }, { label: "It reads the header once and the table row by row" }, { label: "One row per line: document values repeat, table values change", result: "5 fields → 5 columns" }],
        name: "{Doc}",
        kinds: ["Document fields", "Table fields"],
        add: { name: "purchase_order", type: "Text", hint: "Next to \"PO\" · e.g. PO-2291", save: "Save", value: "PO-2291" },
        activate: "Active",
      },
      inputs: {
        show: "How does {your_doc} get in?",
        hide: "Hide inputs",
        items: [
          {
            short: "By email",
            via: "one address per Flow",
            title: "Forward the email and that is it",
            body: "Every Flow has its own address, like {doc}-lite-<id>@mg.tavnit.io. Forward the email with {the_doc} attached and each attachment becomes a run. Subject and body are never read.",
            linkLabel: "Email intake",
            href: "/docs/email-integration",
            scene: [{ label: "You forward the email with the attachment" }, { label: "It reaches the Flow's address" }, { label: "Each attachment is a run", result: "1 attachment → 1 run" }],
          },
          {
            short: "Manual upload",
            via: "from the app",
            title: "Upload it from the app",
            body: "Drop the PDF or photo on the Flow and the run starts right away. Same as what you did here, with your account and no daily limit.",
            linkLabel: "Flows",
            href: "/docs/flows",
            scene: [{ label: "You drop the file on the Flow" }, { label: "The run starts" }, { label: "Rows in seconds", result: "like here, no cap" }],
          },
          {
            short: "API",
            via: "POST /api/runs/process",
            title: "From your system, through the API",
            body: "One POST to /api/runs/process with the file and the flow_id, using your API key. It answers 202 with the run_id; you GET /api/runs/<id> until it is completed and the rows come back.",
            linkLabel: "API",
            href: "/docs/api-integration",
            scene: [{ label: "POST with the file and the flow_id" }, { label: "202: run_id, queued" }, { label: "GET until completed", result: "status: completed · 6 rows" }],
          },
          {
            short: "Zapier · Make · n8n",
            via: "one HTTP call",
            title: "From Zapier, Make or n8n",
            body: "There is no native app and none is needed: an HTTP step (Custom Request in Zapier, Make a request in Make) sends the file to /api/runs/process. The rows come back through a webhook into the same tool's trigger.",
            linkLabel: "Integrations",
            href: "/integrations",
            scene: [{ label: "An HTTP step in your scenario" }, { label: "Tavnit processes it" }, { label: "The webhook returns the rows", result: "back in Zapier, Make or n8n" }],
          },
          {
            short: "Several in one PDF",
            via: "a Splitter splits them",
            title: "Several documents in one PDF",
            body: "A Splitter finds where each document begins, classifies each segment against the types you describe and sends each to its Flow. One scan with three {docs} ends as three runs.",
            linkLabel: "Splitters",
            href: "/docs/splitters",
            scene: [{ label: "One PDF with three {docs}" }, { label: "The Splitter cuts and classifies" }, { label: "Three runs, one per {doc}", result: "3 segments · 3 runs" }],
          },
        ],
      },
      replay: "Play again",
      tryIt: "Try this in Tavnit",
      tryItSignedIn: "Do this in my account",
      primary: "Create a free account",
      primarySignedIn: "Go to Tavnit",
      sameLogin: "You already have an account. Sign in to Tavnit with the same login ({email}); it will ask once more because it is a different site.",
      secondary: "Book a demo",
    },
    cleaners: {
      heading: "With a Cleaner you could…",
      lead: "Simple rules that run on their own over {each_doc} after extraction. Four ideas using your own data:",
      tag: "Cleaners",
      ideas: [
        { icon: "date", title: "One way to write the date", from: "{date}", to: "{iso}", note: "{each_doc}, the same format" },
        { icon: "sum", title: "Lines must add up to the subtotal", from: "lines {sum}", to: "subtotal {subtotal}", note: "if it does not match, nobody pays it unseen", check: "sum" },
        { icon: "money", title: "Convert to your currency", from: "{total} {currency}", to: "your currency", note: "at the rate on {the_doc} date" },
        { icon: "approve", title: "Approval above an amount", from: "total {total}", to: "approve before paying", note: "when it exceeds {threshold}" },
      ],
      ok: "Matches",
      off: "To review",
      outro: "Cleaners are built in Tavnit with the fields you care about. These are just examples.",
      cta: "Create a free account and try them",
      ctaSignedIn: "Open Tavnit and try them",
      learn: "What a Cleaner is",
    },
    after: {
      title: "Your Excel is ready",
      lead: "It came out of a fixed Flow with {fields} fields. In your account you choose the fields, and this is what it looks like when Tavnit handles {each_doc}:",
      close: "Close",
      saved: "saved to your downloads",
    },
    how: {
      heading: "How it works",
      steps: [
        {
          title: "Upload {the_doc}",
          body: "PDF, photo or scan. Any vendor, any language, any layout.",
        },
        {
          title: "Tavnit reads it",
          body: "It finds the header (vendor, number, date, totals) and the line-item table with quantities and prices.",
        },
        {
          title: "Review and download",
          body: "The table shows on screen. With a free account you take it home as Excel.",
        },
      ],
    },
    faqHeading: "Common questions",
    faqs: [
      {
        q: "What does the free version include?",
        a: "{limit} documents a day, with the full result on screen. Downloading the Excel takes a Tavnit account, which has no cost.",
      },
      {
        q: "Which formats does it accept?",
        a: "PDF (text or scanned), JPG and PNG, up to 4 MB and 5 pages. If {your_doc} is longer, upload it in parts or create an account.",
      },
      {
        q: "Can I choose other columns?",
        a: "Not here: this tool uses a fixed {doc} Flow with 13 fields. In your account you create your own Flows, for {docs} or any other document, with the fields you need: per document (PO number, due date, cost centre) or per line (product code, discount). No templates: you describe the field and, when needed, give it a hint on where to look.",
      },
      {
        q: "Do I need to set up a template per vendor?",
        a: "No. Tavnit does not use templates: it reads each document as it comes, even if the vendor redesigns its {doc} tomorrow.",
      },
      {
        q: "What happens to my file?",
        a: "It is processed in a Tavnit account dedicated to the free tools and used for nothing else. After 24 hours the file and the extracted rows delete themselves, automatically; we only keep the fact that a run happened, without the document or its contents. If you want it gone sooner, email support@tavnit.io.",
      },
      {
        q: "Why does the download need an account?",
        a: "Because the free version is meant for trying it out. With an account you can run the same extraction on {all_your_docs}, receive them by email and send the result to your system.",
      },
      {
        q: "Does it work with {docs} from any country?",
        a: "Yes. It handles {docs} in English, Spanish and other languages, with or without itemised tax. It is tested on {docs} from the US, Panama, Mexico and Colombia, among others.",
      },
      {
        q: "How do I make it automatic?",
        a: "Create an account, build a Flow with the fields you want and forward {docs} to its email address, or connect it through the API, webhooks, Zapier, Make or n8n. The result lands in your ERP or Google Sheets with nobody typing.",
      },
    ],
  },

  hub: {
    title: "Free AI Document Tools: Invoice to Excel & More",
    description:
      "Free single-purpose tools built on Tavnit's own engine: turn an invoice into Excel and more. No templates, no sign-up to see the result.",
    h1: "Free tools",
    intro:
      "Each tool does one thing to one document and shows you the real result. They run on the same engine companies use to automate their documents with Tavnit, one at a time.",
    breadcrumbHome: "Home",
    breadcrumbHub: "Tools",
    groups: { extract: "Document to Excel", compare: "Compare documents", split: "Organise scans", clean: "Clean spreadsheets" },
    outro: "All of them run on the same engine companies use to automate their documents with Tavnit. When you want it to happen on its own, for all your documents, there is your account.",
    outroCta: "Create a free account",
  },

  shell: {
    lite: "Lite",
    tools: "Tools",
    site: "About Tavnit",
    cta: "Create free account",
    ctaSignedIn: "Go to Tavnit",
    nav: { product: "Product", useCases: "Use cases", docs: "Docs" },
    demo: "Book a demo",
    signin: "Sign in",
    allTools: "See all tools",
    allToolsHint: "Free. See the real result without signing up; take it with you with an account.",
    groups: { extract: "Document to Excel", compare: "Compare documents", split: "Organise scans", clean: "Clean spreadsheets" },
    account: {
      signedInAs: "Signed in as",
      open: "Go to Tavnit",
      openHint: "The full platform: Flows, automations and all your volume",
      signOut: "Sign out",
      menu: "Your account",
    },
    auth: {
      title: "Create your free account",
      body: "The same account downloads your results here and automates all your documents in Tavnit.",
      submitSignin: "Sign in",
      submitSignup: "Create account",
    },
    menu: "Menu",
    close: "Close",
    privacy: "Privacy",
    terms: "Terms",
    contact: "Contact",
    rights: "Tavnit. Free tools built on the product's own engine.",
  },

  related: {
    heading: "When it is every document, not one",
    lead: "This tool runs one document at a time. The same engine can take them in by email or API, route them through your team\u2019s review and deliver them to your systems.",
    useCase: "How it is automated:",
    guide: "Guide:",
  },

  tools: {
    /** Invoice → Excel. The base copy was written for this tool, so only the
     *  words — plus a <title> short enough not to be cut in search results. */
    "invoice-to-excel": {
      vocab: INVOICE_VOCAB,
      overrides: { title: "Invoice to Excel Converter, Free: AI Reads Line Items" },
    },
    /**
     * Invoice line item extractor. Same Flow and the same words as invoice →
     * Excel; a different page, written for the people who search "line item
     * extraction": what a line item is, one row per line, the header repeated
     * on every row, and what to do with the rows afterwards.
     */
    "invoice-line-items": {
      vocab: INVOICE_VOCAB,
      overrides: {
        title: "Free Invoice Line Item Extractor: Rows to Excel",
        description:
          "Extract invoice line items (description, quantity, unit price and amount) as Excel rows, with vendor, number and date on every row. PDF or photo, no templates, no sign-up to see the result.",
        label: "Invoice line item extractor",
        h1: "Extract the line items from an invoice",
        intro:
          "Every row of the invoice's table (description, quantity, unit, unit price and amount) becomes a row, and the header (vendor, number, date, totals) is repeated on each one. That is how accounting and accounts payable need line items to post them, reconcile them or check them against a purchase order. Works on PDFs, scans and photos, with no per-vendor templates.",
        drop: {
          title: "Drop the invoice whose line items you need",
          sample: "Try it with a six-line invoice",
        },
        stages: [
          "Uploading the invoice",
          "Reading the header",
          "Detecting the line-item table",
          "Splitting out each row",
          "Almost there",
        ],
        result: {
          flowNote: "These {fields} columns are the fields of a fixed invoice Flow: header and line items. In your account, you choose the fields.",
        },
        how: {
          heading: "How it works",
          steps: [
            {
              title: "Upload the invoice",
              body: "Text PDF, scan or photo. One page or several, up to 5.",
            },
            {
              title: "Tavnit splits out the lines",
              body: "It finds the table even without ruled borders, reads each row (description, quantity, unit, price, amount) and attaches the header to it.",
            },
            {
              title: "Review and download",
              body: "One row per line item on screen. With a free account you take it home as Excel, minus any columns you do not need.",
            },
          ],
        },
        faqs: [
          {
            q: "What is an invoice line item?",
            a: "Each row of the detail table: one product or service with its description, quantity, unit, unit price and amount. The footer totals (subtotal, tax, total) are not line items; they come out as header fields repeated on every row.",
          },
          {
            q: "Why do the vendor and number appear on every row?",
            a: "So that each row stands on its own: you can filter, sum or paste the lines of many invoices into one sheet without losing which invoice they came from. It is the shape an ERP, a pivot table or a reconciliation expects.",
          },
          {
            q: "Does it work when the table spans several pages?",
            a: "Yes. Tavnit follows the table from one page to the next and returns all the lines in sequence, without repeating the column header as if it were a row. The free version handles up to 5 pages.",
          },
          {
            q: "What about wrapped descriptions or merged cells?",
            a: "A description that continues on the next row is joined to its line; a merged cell is applied to the lines it covers. We do not depend on the table's rules but on reading which quantity, price and amount belong to each description.",
          },
          {
            q: "How are per-line discounts and taxes handled?",
            a: "Each line's amount comes out as printed. A discount or tax the invoice shows as its own row is not turned into a line item; it is treated as a document total. If your invoices itemise tax per line, an account lets you add that field to the Flow.",
          },
          {
            q: "Can I check the lines against my purchase order?",
            a: "Yes, with the free PO vs invoice check (/tools/po-vs-invoice-check): upload both documents and it flags lines with a different price or quantity, lines that are missing and lines that were added.",
          },
          {
            q: "Do I need a template per vendor?",
            a: "No. Tavnit reads each invoice as it comes; if the vendor redesigns it tomorrow, it still works. That is also why it handles invoices from different countries and languages alike.",
          },
          {
            q: "How do I do this for hundreds of invoices?",
            a: "With an account you create a Flow with these same fields (or your own) and forward invoices to its email address, or send them through the API. Each invoice comes out as rows into your ERP, Google Sheets or a Bucket, with nobody typing.",
          },
        ],
      },
    },
    /**
     * PO vs invoice check. Two documents through one "purchase document" Flow,
     * then the Matcher pairs every PO line with the invoice line that means the
     * same thing and the page shows the differences: price, quantity, missing
     * on the invoice, not on the PO. The base's document word stays "factura"
     * because that is what the shared blocks (email intake, review, agents…)
     * talk about; everything the visitor sees first is overridden here.
     */
    "po-invoice-check": {
      vocab: {
        doc: "invoice",
        docs: "invoices",
        a_doc: "an invoice",
        the_doc: "the invoice",
        the_docs: "the invoices",
        your_doc: "your invoice",
        your_docs: "your invoices",
        all_your_docs: "all your invoices",
        all_docs: "all invoices",
        each_doc: "every invoice",
        another_doc: "another invoice",
        this_doc: "this invoice",
      },
      overrides: {
        title: "Free PO vs Invoice Checker: Line-by-Line Match",
        description:
          "Upload the purchase order and the invoice and Tavnit matches them line by line: price differences, quantity differences, lines missing on the invoice and lines not on the PO. Free, no templates, no sign-up to see the result.",
        label: "PO vs invoice check",
        h1: "Check an invoice against its purchase order",
        intro:
          "Upload the purchase order and the invoice, as PDF or photo. Tavnit reads both, pairs every PO line with the invoice line that means the same thing even when the text differs, and flags where the price changed, where the quantity changed, what is missing on the invoice and what was never on the PO.",
        trust: ["A PO and an invoice · PDF or photo", "{limit} free documents a day", "Everything deleted after 24 h"],
        drop: {
          title: "Drop the document here",
          sample: "Try it with a sample PO and invoice",
          formats: "PDF, JPG or PNG · up to 4 MB and 5 pages per document",
        },
        stages: ["Uploading the documents", "Reading the purchase order", "Reading the invoice", "Pairing the lines", "Almost there"],
        result: {
          another: "Compare other documents",
          download: "Download the comparison as Excel",
          flowNote: "These {fields} columns are the fields of a fixed purchase-document Flow. In your account, you choose the fields.",
          ghostHint: "In Tavnit you add the fields you want: cost centre, receipt number, project…",
        },
        errors: {
          no_lines: "We found no lines with quantities and prices in one of the two documents. Check that they are a purchase order and an invoice with an item table.",
          not_ready: "We are still reading the documents. Wait a moment and try again.",
          failed: "We could not read one of the documents. Try other files, or the samples.",
          too_large: "One of the files is over 4 MB. Compress it or upload only the document pages.",
        },
        next: {
          lead: "That was one PO and one invoice. With an account, every invoice that arrives is checked against its purchase order on its own, and the result does not stop at an Excel: it keeps going.",
          source: "Your PO and invoice",
          flow: {
            name: "Purchase document",
            add: { name: "receipt_number", type: "Text", hint: 'Next to "Receipt" · e.g. REC-1187', save: "Save", value: "REC-1187" },
          },
          inputs: { show: "How do your documents get in?" },
        },
        cleaners: {
          heading: "With a Cleaner you could…",
          lead: "Simple rules that run on their own over every check. Four ideas:",
          ideas: [
            { icon: "alert", title: "Block the invoice when a price rises more than 2 %", from: "PO price 22.40", to: "invoice 23.90", note: "the difference is flagged before anyone pays it" },
            { icon: "approve", title: "Approval when the quantity differs", from: "PO 300 units", to: "invoice 280", note: "purchasing confirms a partial delivery or an error" },
            { icon: "mail", title: "Email purchasing with the differences", from: "check done", to: "email to purchasing@", note: "only when there is something to review" },
            { icon: "sum", title: "Invoice total against PO total", from: "PO 5,189.07", to: "invoice 4,960.63", note: "if it does not match, it stops before posting" },
          ],
          outro: "Cleaners are built in Tavnit with the fields you care about. These are just examples.",
        },
        after: {
          lead: "It came out of a fixed Flow with {fields} fields and a Matcher. In your account you choose the fields, and this is what it looks like when Tavnit checks every invoice that arrives:",
        },
        how: {
          heading: "How it works",
          steps: [
            { title: "Upload both documents", body: "The purchase order and the invoice, as PDF or photo. Any vendor, any language, any layout." },
            { title: "Tavnit reads both with one Flow", body: "Header (number, date, supplier, totals) and every line with its quantity and price, on both." },
            { title: "The Matcher pairs the lines", body: "Each PO line is joined to the invoice line that means the same, and price and quantity are compared. With your account you take the comparison home as Excel." },
          ],
        },
        faqs: [
          {
            q: "What does the free version include?",
            a: "{limit} documents a day (one check uses two), with the full result on screen. Downloading the comparison as Excel takes a Tavnit account, which has no cost.",
          },
          {
            q: "How does it pair lines when the text is not identical?",
            a: "A Tavnit Matcher compares descriptions by meaning, not letter by letter: \"Long grain rice 20 lb\" and \"RICE L/GRAIN PREMIUM 20LB\" are the same line. When two descriptions are close but unclear, a second step decides whether it is the same item.",
          },
          {
            q: "What tolerance does it use for prices?",
            a: "A price is flagged as different when it moves more than 0.5 % or more than one cent. Quantities are compared exactly. With your account you set your own tolerance with a Cleaner.",
          },
          {
            q: "What do \"Missing on the invoice\" and \"Not on the PO\" mean?",
            a: "\"Missing on the invoice\" is a purchase-order line the supplier did not bill (partial or pending delivery). \"Not on the PO\" is a billed line nobody ordered on that PO.",
          },
          {
            q: "Can I do a three-way match with the goods receipt?",
            a: "Not here: the free version compares two documents. With your account you add the goods receipt as a third document of the same Flow and the Matcher checks all three, or you build Cleaner rules so the invoice is not posted until the receipt matches.",
          },
          {
            q: "Which formats does it accept?",
            a: "PDF (text or scanned), JPG and PNG, up to 4 MB and 5 pages per document. It works with purchase orders from an ERP and invoices from any vendor.",
          },
          {
            q: "What happens to my files?",
            a: "They are processed in a Tavnit account dedicated to the free tools and used for nothing else. After 24 hours the files and the comparison delete themselves; we only keep the fact that a run happened, without the documents or their contents.",
          },
          {
            q: "How do I make it automatic?",
            a: "Create an account, build a Flow for your purchase documents and a Matcher on top of it. Invoices arrive by email or API, get paired with their PO, and the differences go out by email, webhook or into your ERP with nobody typing.",
          },
        ],
        compare: {
          slots: [
            { title: "Purchase order", hint: "PDF or photo of the PO", sample: "Sample PO" },
            { title: "Invoice", hint: "PDF or photo of the invoice", sample: "Sample invoice" },
          ],
          run: "Compare",
          sampleAll: "Try it with a sample PO and invoice",
          stages: ["Reading the purchase order and the invoice", "Sorting the lines", "The Matcher pairs the lines", "Almost there"],
          heading: "Comparison ready",
          summary: "{n} · {ref} vs {doc}",
          labels: {
            description: "Description",
            quantity: "Qty",
            price: "Price",
            total: "Total",
            status: "Status",
            ref: "PO",
            doc: "Invoice",
            supplier: "Supplier",
            champion: "Champion",
            wins: "{n} lines won",
            lines: ["line", "lines"],
          },
          status: {
            ok: "Matches",
            price: "Price differs",
            qty: "Quantity differs",
            both: "Price and quantity differ",
            missing: "Missing on the invoice",
            extra: "Not on the PO",
          },
          empty: "We could not pair any lines. Check that both documents have an item table with quantities and prices.",
          another: "Compare other documents",
          download: "Download the comparison as Excel",
        },
      },
    },
    /**
     * Split a scanned PDF into its documents. The one Lite tool that is a
     * Splitter, not a Flow: the result is a list of documents, each with its
     * page range and type, downloadable one by one or as a zip. The shared
     * blocks (auth, errors, the "and then what?" outcomes) stay; what talks
     * about rows and columns is overridden here.
     */
    "split-scanned-pdf": {
      vocab: {
        doc: "scanned PDF",
        docs: "scanned PDFs",
        a_doc: "a scanned PDF",
        the_doc: "the PDF",
        the_docs: "the PDFs",
        your_doc: "your PDF",
        your_docs: "your PDFs",
        all_your_docs: "all your PDFs",
        all_docs: "all PDFs",
        each_doc: "every PDF",
        another_doc: "another PDF",
        this_doc: "this PDF",
      },
      overrides: {
        title: "Split a Scanned PDF into Documents, Free (AI)",
        description:
          "Upload one PDF with several documents scanned together (invoices, purchase orders, receipts, contracts) and get each document back on its own, classified by type. Free, no page marking.",
        label: "Split a scanned PDF",
        h1: "Split a scanned PDF into its documents",
        intro:
          "You fed ten papers through the scanner and got one PDF. Upload it: Tavnit reads every page, finds where each document begins and hands them back one by one, each with its type (invoice, purchase order, receipt, packing list, bill of lading, contract…). No splitting by page count, nothing to mark by hand.",
        trust: ["One PDF · up to 12 pages", "{limit} free documents a day", "Everything deleted after 24 h"],
        drop: {
          title: "Drop your scanned PDF here",
          hint: "one PDF with several documents inside",
          choose: "Choose file",
          sample: "Try it with a sample scan",
          formats: "PDF · up to 4 MB and 12 pages",
        },
        stages: ["Uploading the PDF", "Reading every page", "Finding where each document starts", "Classifying", "Almost there"],
        result: {
          retention: "deletes itself after 24 h",
          downloading: "Preparing the file",
          another: "Split another PDF",
          empty: "We did not find more than one document in this PDF.",
          flowNote: "These types belong to this tool's fixed Splitter. In your account, you define the types.",
        },
        errors: {
          too_large: "The file is over 4 MB. Compress it or split the scan in two.",
          too_many_pages: "The free version splits up to 12 pages per PDF. With an account there is no limit.",
          unsupported: "We only accept PDF, JPG or PNG. To split documents, upload the PDF from the scanner.",
          failed: "We could not split this PDF. Try another scan, or the sample.",
          empty: "The file is empty.",
        },
        next: {
          lead: "That was one PDF. With an account, every document the Splitter cuts goes to its own Flow: the invoice to invoice extraction, the purchase order to its own, the receipt to the expense report. Nobody separates or classifies by hand again.",
          source: "Your PDF",
          flow: {
            title: "From the Splitter to the Flow: each document to its extraction",
            body: "A Splitter finds where each document begins and classifies it against the types you describe in words. This tool uses a fixed Splitter with eight types and no outputs: it just hands you the documents. In your account you define your own types and, for each one, where it goes: to a Flow that extracts its fields (as below, with {fields} fields), to an email or to a Collection. No templates, no coordinates.",
            linkLabel: "How a Splitter works",
            href: "/docs/splitters",
          },
          inputs: {
            show: "How does your PDF get in?",
          },
        },
        cleaners: {
          heading: "After the split, in Tavnit…",
          lead: "Each document type can have its own destination, with nobody sorting by hand. Four examples:",
          ideas: [
            { icon: "text", title: "Every invoice to its Flow and on to the ERP", from: "invoice (pp. 1–2)", to: "Invoice Flow → ERP", note: "extracted and posted untouched" },
            { icon: "mail", title: "Receipts to the expense report", from: "receipt (p. 5)", to: "expenses@yourcompany", note: "each receipt reaches whoever reconciles it" },
            { icon: "calendar", title: "Contracts to the legal archive with their dates", from: "contract (pp. 6–7)", to: "Contract Flow", note: "expiry and renewal, in one table" },
            { icon: "alert", title: "A heads-up when something is not recognised", from: "unclassified page", to: "human review", note: "nothing gets lost or misfiled" },
          ],
          outro: "Destinations are set in Tavnit per document type. These are just examples.",
          cta: "Create a free account and set it up",
          ctaSignedIn: "Open Tavnit and set it up",
          learn: "What a Splitter is",
        },
        after: {
          title: "Your documents are ready",
          lead: "They came out of a fixed Splitter with eight types. In your account you define the types, and each document goes on to its Flow by itself:",
          close: "Close",
        },
        how: {
          heading: "How it works",
          steps: [
            { title: "Upload the scan", body: "One PDF with several documents inside, exactly as it came off the scanner. Any order, any number of pages per document." },
            { title: "Tavnit splits and classifies it", body: "It reads every page, detects where each document starts and assigns it a type: invoice, purchase order, receipt, packing list, bill of lading, contract, credit note or other." },
            { title: "Download each document", body: "You see the list with page ranges and types. With a free account you take each PDF separately, or all of them in a zip." },
          ],
        },
        faqs: [
          {
            q: "How does it know where one document ends and the next begins?",
            a: "The AI looks at all the pages together, the way a person would: changes of header, of company, of page numbering, of layout. It does not count pages or look for markers, which is why it works when one invoice runs two pages and the receipt is a single one.",
          },
          {
            q: "Which document types does it recognise?",
            a: "Here, eight: invoice, purchase order, receipt, packing list, bill of lading, contract, credit note and other. With an account you define your own types by describing them in words, and for each one you decide where it goes: to a Flow that extracts its data, to an email or to a Collection.",
          },
          {
            q: "What does the free version include?",
            a: "{limit} documents a day, with the full result on screen. Downloading the separated PDFs takes a Tavnit account, which has no cost.",
          },
          {
            q: "How many pages can I upload?",
            a: "Up to 12 pages per PDF in the free version, up to 4 MB. With an account there is no page limit and you can email scans straight to the Splitter.",
          },
          {
            q: "Does it work with poor scans or mixed languages?",
            a: "Yes. It handles skewed, greyscale and stamped scans, and documents in English, Spanish or other languages mixed in the same PDF. If a page cannot be read it is marked as unclassified rather than given a made-up type.",
          },
          {
            q: "What happens to my file?",
            a: "It is processed in a Tavnit account dedicated to the free tools and used for nothing else. After 24 hours the PDF and the separated documents delete themselves, automatically; we only keep the fact that a run happened, without the file or its contents. If you want it gone sooner, email support@tavnit.io.",
          },
          {
            q: "Why does the download need an account?",
            a: "Because the free version is meant for trying it out. With an account you can split every scan, send each document to its Flow and receive the extracted data in your ERP or by email.",
          },
          {
            q: "How do I make it automatic?",
            a: "Create an account, build a Splitter with your document types and forward scans to its email address, or connect it through the API. Every document it cuts goes to its Flow on its own, and from there to your ERP, Google Sheets or an inbox.",
          },
        ],
        split: {
          heading: "Done: {file}",
          summary: "{n} in {pages}",
          segmentWord: ["document", "documents"],
          pageWord: ["page", "pages"],
          pages: "pp. {from}–{to}",
          pageOne: "p. {from}",
          unmatched: "Unclassified",
          type: "Type",
          reason: "Why",
          download: "Download",
          downloadAll: "Download all (zip)",
          stages: ["Uploading the PDF", "Reading every page", "Finding where each document starts", "Classifying", "Almost there"],
          empty: "We did not find more than one document in this PDF.",
          another: "Split another PDF",
        },
      },
    },
    /**
     * Packing list → Excel. Shipment header (shipper, consignee, ports, totals)
     * once per document and one row per goods line with packages, net and gross
     * weight and dimensions. Searches targeted: "packing list to excel",
     * "packing list extraction", "packing list a excel", "lista de empaque a
     * excel". Everything not overridden here comes from the base copy with the
     * words below filled in.
     */
    "packing-list-to-excel": {
      vocab: {
        doc: "packing list",
        docs: "packing lists",
        a_doc: "a packing list",
        the_doc: "the packing list",
        the_docs: "the packing lists",
        your_doc: "your packing list",
        your_docs: "your packing lists",
        all_your_docs: "all your packing lists",
        all_docs: "all packing lists",
        each_doc: "every packing list",
        another_doc: "another packing list",
        this_doc: "this packing list",
      },
      overrides: {
        title: "Packing List to Excel, Free: AI Extracts Every Line",
        description:
          "Upload a packing list as PDF or photo and get every line as an Excel table: description, quantity, packages, net and gross weight, dimensions, with shipper, consignee and ports. Free, no templates, no sign-up to see the result.",
        label: "Packing list to Excel",
        h1: "Turn a packing list into Excel",
        intro:
          "Upload the PDF or photo. Tavnit reads the shipment header (shipper, consignee, ports, totals) and every goods line with its packages, weights and dimensions, and hands it back as a spreadsheet. No per-supplier templates: the same tool works on the packing lists of all your shipments.",
        drop: {
          title: "Drop your packing list here",
          sample: "Try it with a sample packing list",
        },
        stages: ["Uploading the document", "Reading the shipment header", "Finding the goods lines", "Ordering the columns", "Almost there"],
        result: {
          empty: "We could not find goods lines in this document. Try a packing list with packages, weights or quantities per line.",
          flowNote: "These {fields} columns are the fields of a fixed packing list Flow. In your account, you choose the fields.",
          ghostHint: "In Tavnit you add the fields you want: container, marks, HS code, B/L number…",
        },
        next: {
          lead: "That was one packing list. With an account, the same happens to every packing list that arrives, and the lines do not stop at an Excel: they keep going on their own.",
          source: "Your packing list",
          flow: {
            name: "Packing list",
            add: { name: "container", type: "Text", hint: "Next to \"Container\" · e.g. MSKU-4417", save: "Save", value: "MSKU-4417" },
          },
          inputs: { show: "How does your packing list get in?" },
        },
        cleaners: {
          lead: "Simple rules that run on their own over every packing list after extraction. Four ideas using your own data:",
          ideas: [
            { icon: "date", title: "One way to write the date", from: "{date}", to: "{iso}", note: "every packing list, the same format" },
            { icon: "alert", title: "Gross weight must exceed net", from: "net > gross", to: "to review", note: "a line the wrong way round is never declared unseen" },
            { icon: "calendar", title: "Heads-up before sailing", from: "shipment date", to: "reminder 2 days before", note: "to your customs broker and logistics" },
            { icon: "mail", title: "Copy to the customs broker", from: "extracted packing list", to: "email with the Excel", note: "together with the related invoice" },
          ],
        },
        after: {
          lead: "It came out of a fixed Flow with {fields} fields. In your account you choose the fields, and this is what it looks like when Tavnit handles every packing list:",
        },
        how: {
          steps: [
            { title: "Upload the packing list", body: "PDF, photo or scan. Any shipper, any language, any layout." },
            {
              title: "Tavnit reads it",
              body: "It finds the header (shipper, consignee, ports, totals) and the goods table with packages, net weight, gross weight and dimensions per line.",
            },
            { title: "Review and download", body: "The table shows on screen. With a free account you take it home as Excel." },
          ],
        },
        faqs: [
          {
            q: "What does the free version include?",
            a: "{limit} documents a day, with the full result on screen. Downloading the Excel takes a Tavnit account, which has no cost.",
          },
          {
            q: "Which formats does it accept?",
            a: "PDF (text or scanned), JPG and PNG, up to 4 MB and 5 pages. If your packing list is longer, upload it in parts or create an account.",
          },
          {
            q: "Which columns does it extract from a packing list?",
            a: "Per document: shipper, consignee, number, date, related invoice, port of loading, port of discharge and the totals of packages and weights. Per line: description, quantity, unit, packages, net weight, gross weight and dimensions. Document values repeat on every row so the table filters on its own.",
          },
          {
            q: "Can I choose other columns?",
            a: "Not here: this tool uses a fixed packing list Flow with 17 fields. In your account you create your own Flows, for packing lists or any other document, with the fields you need: per document (container, seal, B/L number, incoterm) or per line (marks, HS code, volume). No templates: you describe the field and, when needed, give it a hint on where to look.",
          },
          {
            q: "Does it work with packing lists from any country?",
            a: "Yes. It handles packing lists in English, Spanish and other languages, with weights in kg or lb and measurements in cm or inches, exactly as printed. It is tested on shipments from Panama, Colombia, Mexico, China and the US, among others.",
          },
          {
            q: "Do I need to set up a template per supplier?",
            a: "No. Tavnit does not use templates: it reads each document as it comes, even if the shipper changes its packing list layout tomorrow.",
          },
          {
            q: "What happens to my file?",
            a: "It is processed in a Tavnit account dedicated to the free tools and used for nothing else. After 24 hours the file and the extracted rows delete themselves, automatically; we only keep the fact that a run happened, without the document or its contents. If you want it gone sooner, email support@tavnit.io.",
          },
          {
            q: "How do I make it automatic?",
            a: "Create an account, build a Flow with the fields you want and forward packing lists to its email address, or connect it through the API, webhooks, Zapier, Make or n8n. Every shipment lands in your customs system, your ERP or Google Sheets with nobody typing.",
          },
        ],
      },
    },
    /**
     * Bill of lading → Excel. The words ("BL" in Spanish, where the trade says
     * BL far more than "conocimiento de embarque"; "bill of lading" in English)
     * and everything that is specific to an ocean B/L: header fields, one row
     * per container line, customs and forwarder use cases.
     */
    "bill-of-lading-to-excel": {
      vocab: {
        doc: "bill of lading",
        docs: "bills of lading",
        a_doc: "a bill of lading",
        the_doc: "the bill of lading",
        the_docs: "the bills of lading",
        your_doc: "your bill of lading",
        your_docs: "your bills of lading",
        all_your_docs: "all your bills of lading",
        all_docs: "all bills of lading",
        each_doc: "every bill of lading",
        another_doc: "another bill of lading",
        this_doc: "this bill of lading",
      },
      overrides: {
        title: "Bill of Lading to Excel, Free: Extract B/L Data",
        description:
          "Upload a bill of lading (B/L) as PDF or photo and get its data as an Excel table: B/L number, carrier, shipper, consignee, vessel, ports, and one row per container with seal, goods, packages, weight and volume. Free, no templates, no sign-up to see the result.",
        label: "Bill of lading to Excel",
        h1: "Turn a bill of lading into Excel",
        intro:
          "Upload the PDF or photo of the B/L. Tavnit reads the header (B/L number, carrier, shipper, consignee, vessel, voyage, ports, shipped-on-board date) and every cargo line with its container, seal, packages, gross weight and volume, and hands it back as a spreadsheet. No per-carrier templates: the same Flow reads MSC, Maersk, Hapag-Lloyd or any NVOCC.",
        drop: {
          title: "Drop your bill of lading here",
          sample: "Try it with a sample B/L",
        },
        stages: ["Uploading the document", "Reading the B/L header", "Finding the cargo lines", "Ordering the columns", "Almost there"],
        result: {
          empty: "We could not find cargo lines in this document. Try a bill of lading that has the container and goods table.",
          flowNote: "These {fields} columns are the fields of a fixed bill of lading Flow. In your account, you choose the fields.",
          ghostHint: "In Tavnit you add the fields you want: incoterm, place of delivery, booking number, ETA…",
          another: "Process another bill of lading",
        },
        errors: {
          too_large: "The file is over 4 MB. Compress it or upload only the B/L pages.",
        },
        next: {
          lead: "That was one bill of lading. With an account, the same happens to every B/L that arrives from every carrier and agent, and the data does not stop at an Excel: it keeps going on its own into your customs or freight system.",
          source: "Your B/L",
          flow: {
            name: "Bill of lading",
            add: { name: "incoterm", type: "Text", hint: "Next to \"Incoterm\" · e.g. CIF Manzanillo", save: "Save", value: "CIF" },
          },
          inputs: { show: "How does your B/L get in?" },
        },
        cleaners: {
          lead: "Simple rules that run on their own over every bill of lading after extraction. Four ideas using your own data:",
          ideas: [
            { icon: "date", title: "One way to write the shipped-on-board date", from: "{date}", to: "{iso}", note: "every B/L, the same format" },
            { icon: "alert", title: "Gross weight out of range", from: "gross weight per container", to: "flag above 26,000 kg", note: "so nobody books a truck that cannot take it" },
            { icon: "calendar", title: "Heads-up before arrival", from: "on-board date + transit time", to: "reminder 5 days ahead", note: "so the entry is filed before the vessel berths" },
            { icon: "mail", title: "Straight to the customs broker", from: "extracted B/L", to: "email with the table attached", note: "to the brokerage, with nobody forwarding anything" },
          ],
        },
        after: {
          lead: "It came out of a fixed Flow with {fields} fields. In your account you choose the fields, and this is what it looks like when Tavnit handles every bill of lading:",
        },
        how: {
          steps: [
            { title: "Upload the B/L", body: "PDF, photo or scan. Any carrier, any agent, any form layout." },
            { title: "Tavnit reads it", body: "It finds the header (B/L number, parties, vessel, voyage, ports, on-board date, freight terms) and the cargo table: one line per container with seal, goods, packages, weight and volume." },
            { title: "Review and download", body: "The table shows on screen. With a free account you take it home as Excel." },
          ],
        },
        faqs: [
          {
            q: "What does the free version include?",
            a: "{limit} documents a day, with the full result on screen. Downloading the Excel takes a Tavnit account, which has no cost.",
          },
          {
            q: "What does it extract from a bill of lading?",
            a: "From the header: B/L number, carrier, shipper, consignee, notify party, vessel, voyage, port of loading, port of discharge, shipped-on-board date, freight terms and the list of containers. From the cargo table, one row per line: container, seal, description of goods, number and kind of packages, gross weight and volume. Header values repeat on every row so the sheet filters and sums cleanly.",
          },
          {
            q: "Can I choose other columns?",
            a: "Not here: this tool uses a fixed bill of lading Flow with 19 fields. In your account you create your own Flows, for B/Ls or any other document, with the fields you need: per document (incoterm, place of delivery, booking number, ETA) or per line (HS code, marks, reefer temperature). No templates: you describe the field and, when needed, give it a hint on where to look.",
          },
          {
            q: "Which formats does it accept?",
            a: "PDF (text or scanned), JPG and PNG, up to 4 MB and 5 pages. If your B/L is longer, or several B/Ls sit in one scan, upload them in parts or create an account.",
          },
          {
            q: "Does it work with any carrier's B/L?",
            a: "Yes. It does not use templates: it reads each B/L as it comes, whether a carrier master B/L, a forwarder's house B/L or a sea waybill, in English or Spanish. It is tested on MSC, Maersk, Hapag-Lloyd, CMA CGM, Evergreen and NVOCC layouts.",
          },
          {
            q: "What happens to my file?",
            a: "It is processed in a Tavnit account dedicated to the free tools and used for nothing else. After 24 hours the file and the extracted rows delete themselves, automatically; we only keep the fact that a run happened, without the document or its contents. If you want it gone sooner, email support@tavnit.io.",
          },
          {
            q: "Why does the download need an account?",
            a: "Because the free version is meant for trying it out. With an account you can run the same extraction on all your bills of lading, receive the result by email and send it to your customs or freight system.",
          },
          {
            q: "How do I make it automatic?",
            a: "Create an account, build a Flow with the fields you want and forward B/Ls to its email address (the one the carrier or forwarder sends them to), or connect it through the API, webhooks, Zapier, Make or n8n. The data lands in your customs system, your ERP or Google Sheets with nobody typing.",
          },
        ],
      },
    },
    /**
     * Compare supplier quotes. Two or three quotes for the same request go
     * through the quote Flow; the Matcher pairs the lines across suppliers
     * (semantically, so "cemento gris 42.5 kg" meets "cemento Portland tipo I
     * gris") and marks the cheapest unit price per line as Champion. Nothing
     * here is an invoice, so most of the base is overridden.
     */
    "quote-comparison": {
      vocab: {
        doc: "quote",
        docs: "quotes",
        a_doc: "a quote",
        the_doc: "the quote",
        the_docs: "the quotes",
        your_doc: "your quote",
        your_docs: "your quotes",
        all_your_docs: "all your quotes",
        all_docs: "all quotes",
        each_doc: "every quote",
        another_doc: "another quote",
        this_doc: "this quote",
      },
      overrides: {
        title: "Compare Supplier Quotes, Free: Line-by-Line Table",
        description:
          "Upload two or three quotes as PDF or photo and get one comparison table: every line with each supplier's price and the cheapest marked. Free, no templates, no sign-up to see the result.",
        label: "Compare supplier quotes",
        h1: "Compare supplier quotes",
        intro:
          "Upload two or three quotes for the same request. Tavnit reads each one, pairs the lines even when every supplier words them differently, and builds one table with each price and the cheapest option per line. No templates, no spreadsheet by hand.",
        trust: ["2 or 3 quotes · PDF or photo", "{limit} free documents a day", "Everything deleted after 24 h"],
        drop: {
          title: "Drop a quote here",
          hint: "PDF or photo",
          sample: "Try it with three sample quotes",
          formats: "PDF, JPG or PNG · up to 4 MB and 5 pages per quote",
        },
        stages: ["Reading the quotes", "Sorting the lines", "The Matcher pairs the lines", "Almost there"],
        result: {
          flowNote: "Each quote goes through a fixed Flow with {fields} fields and the Matcher crosses them. In your account, you choose the fields.",
          ghostHint: "In Tavnit you add the fields you want: brand, warranty, lead time per line…",
          download: "Download the comparison as Excel",
          another: "Compare other quotes",
          empty: "We could not find priced lines in this quote. Try one with items, quantities and prices per line.",
        },
        errors: {
          too_large: "One of the quotes is over 4 MB. Compress it or upload only the pages with the lines.",
          failed: "We could not read one of the quotes. Try another, or the samples.",
          no_lines: "One of the quotes has no priced lines, so there is nothing to compare. Check that each has items with a unit price.",
          not_ready: "We are still reading the quotes. Give it a moment and try again.",
        },
        auth: {
          title: "Create your free account to download the table",
          body: "The Excel downloads right away. With an account you can also compare more than three quotes, and do it for every tender that comes in.",
        },
        next: {
          lead: "That was three quotes by hand. With an account, every quote that arrives by email enters its Flow, the Matcher crosses them on its own and the table keeps going: to purchasing, to the ERP or to whoever approves.",
          source: "Your quotes",
          flow: {
            name: "Quote",
            add: { name: "brand", type: "Text", hint: 'Next to "Brand" or in the description', save: "Save", value: "Argos" },
          },
          inputs: { show: "How do your quotes get in?" },
        },
        cleaners: {
          lead: "Simple rules that run on their own over every quote after it is read. Four ideas:",
          ideas: [
            { icon: "date", title: "One way to write the date", from: "{date}", to: "{iso}", note: "every quote, the same format" },
            { icon: "alert", title: "Alert when a supplier goes up more than 5%", from: "today's price", to: "vs. the last quote", note: "per line, before awarding" },
            { icon: "approve", title: "Approve the award", from: "comparison table", to: "whoever decides", note: "only on approval does the PO go out" },
            { icon: "calendar", title: "Remember the quote's validity", from: "valid until {date}", to: "reminder 5 days before", note: "so the price is not lost" },
          ],
        },
        after: {
          title: "Your comparison table is ready",
          lead: "It came out of a fixed Flow with {fields} fields and a Matcher. In your account you choose the fields, and this is what it looks like when Tavnit crosses every quote:",
        },
        how: {
          steps: [
            { title: "Upload two or three quotes", body: "PDF or photo, for the same request. Any supplier, any layout, any way of describing each item." },
            { title: "Tavnit reads and crosses them", body: "It extracts the lines of each and the Matcher pairs the items even when they are worded differently. The cheapest per line is marked as Champion." },
            { title: "Review and download", body: "The table shows on screen. With a free account you take it home as Excel." },
          ],
        },
        faqs: [
          {
            q: "What does the free version include?",
            a: "{limit} documents a day (a comparison of three quotes counts as three), with the full table on screen. Downloading the Excel takes a Tavnit account, which has no cost.",
          },
          {
            q: "How does it pair lines when every supplier words them differently?",
            a: "With a Tavnit Matcher. It compares the meaning of each description, not the exact text: \"grey cement 42.5 kg\" and \"Portland cement type I grey, 42.5 kg bag\" land on the same row. When in doubt, a second step decides whether they are the same item.",
          },
          {
            q: "What does Champion mean?",
            a: "The supplier with the lowest unit price on that line. On a tie, both appear. Lines only one supplier quoted have no competition and are shown too.",
          },
          {
            q: "Can I compare more than three quotes?",
            a: "Not here: the free version takes up to three. In your account the Matcher compares up to ten runs of the same Flow, and you can send the table by email or to your ERP.",
          },
          {
            q: "Can I choose other columns?",
            a: "Not here: this tool uses a fixed quote Flow. In your account you create your own Flow with the fields you need (brand, warranty, lead time per line) and set the Matcher to compare whichever field you want: price, lead time or any number.",
          },
          {
            q: "Which formats does it accept?",
            a: "PDF (text or scanned), JPG and PNG, up to 4 MB and 5 pages per quote.",
          },
          {
            q: "What happens to my files?",
            a: "They are processed in a Tavnit account dedicated to the free tools and used for nothing else. After 24 hours the files, the extracted lines and the table delete themselves; we only keep the fact that a run happened.",
          },
          {
            q: "How do I make it automatic?",
            a: "Create an account, build a quote Flow with your fields and a Matcher on top. Forward quotes to the Matcher's email address and, once they are all in, the comparison table comes out on its own: by email, by webhook or into your ERP.",
          },
        ],
        compare: {
          slots: [
            { title: "Quote A", hint: "PDF or photo", sample: "Sample quote A" },
            { title: "Quote B", hint: "PDF or photo", sample: "Sample quote B" },
            { title: "Quote C", hint: "PDF or photo", sample: "Sample quote C", optional: true },
          ],
          run: "Compare",
          sampleAll: "Try it with three sample quotes",
          stages: ["Reading the quotes", "Sorting the lines", "The Matcher pairs the lines", "Almost there"],
          heading: "Comparison table ready",
          summary: "{n} · {ref}",
          labels: {
            description: "Description",
            quantity: "Quantity",
            price: "Unit price",
            total: "Total",
            status: "Status",
            ref: "A",
            doc: "B",
            supplier: "Supplier",
            champion: "Champion",
            wins: "{n} lines won",
            lines: ["line", "lines"],
          },
          status: { ok: "Matches", price: "Different price", qty: "Different quantity", both: "Price and quantity differ", missing: "Not quoted", extra: "Only in this quote" },
          empty: "The Matcher found no comparable lines across the quotes. Check that they are for the same request and have items with a unit price.",
          another: "Compare other quotes",
          download: "Download the comparison as Excel",
        },
      },
    },
    /**
     * Contract key dates. One row per contract (a metadata-only Flow), so the
     * copy talks about dates and parties, never about line items.
     */
    "contract-dates": {
      vocab: {
        doc: "contract",
        docs: "contracts",
        a_doc: "a contract",
        the_doc: "the contract",
        the_docs: "the contracts",
        your_doc: "your contract",
        your_docs: "your contracts",
        all_your_docs: "all your contracts",
        all_docs: "all contracts",
        each_doc: "every contract",
        another_doc: "another contract",
        this_doc: "this contract",
      },
      overrides: {
        title: "Contract Renewal Date Extractor, Free (AI)",
        description:
          "Upload a contract as PDF and get its key dates in one Excel row: parties, start, end, auto-renewal, notice period and the deadline to give notice. Free, no templates, no sign-up to see the result.",
        label: "Contract dates",
        h1: "Extract the key dates from a contract",
        intro:
          "Upload the PDF. Tavnit reads the contract and hands back one row with the parties, the signature date, start and end of the term, whether it auto-renews, the notice period and the last day to say you are not renewing. Works on service, lease, supply and license agreements, in whatever format they come.",
        drop: {
          title: "Drop your contract here",
          sample: "Try it with a sample contract",
        },
        stages: ["Uploading the document", "Reading the parties", "Finding the term and renewal", "Working out the notice deadline", "Almost there"],
        result: {
          empty: "We could not find parties or dates in this document. Try a signed contract with a term clause.",
          flowNote: "These {fields} columns are the fields of a fixed contract Flow. In your account, you choose the fields.",
          ghostHint: "In Tavnit you add the fields you want: internal owner, cost centre, penalty clause…",
          another: "Process another contract",
        },
        next: {
          lead: "That was one contract. With an account, the same happens to every contract that arrives, and the dates do not stop at an Excel: they raise the alarm before the deadline.",
          source: "Your contract",
          inputs: { show: "How does your contract get in?" },
          flow: {
            name: "Contract",
            add: { name: "owner", type: "Text", hint: "Who signs it on our side", save: "Save", value: "M. Perez" },
          },
        },
        cleaners: {
          lead: "Simple rules that run on their own over every contract after it is read. Four ideas using your own data:",
          ideas: [
            { icon: "date", title: "One way to write the date", from: "{date}", to: "{iso}", note: "every contract, the same format" },
            { icon: "calendar", title: "Reminder 60 days before the end", from: "end_date", to: "reminder in time", note: "before the notice deadline passes" },
            { icon: "alert", title: "Auto-renewal: review first", from: "auto_renewal = Yes", to: "to review", note: "so no contract renews without someone looking" },
            { icon: "mail", title: "Email the owner", from: "contract read", to: "email with the row", note: "whoever signed it gets the dates" },
          ],
        },
        after: {
          lead: "It came out of a fixed Flow with {fields} fields. In your account you choose the fields, and this is what it looks like when Tavnit reads every contract:",
        },
        how: {
          steps: [
            { title: "Upload the contract", body: "PDF, text or scanned. Any kind of contract, whoever drafted it." },
            { title: "Tavnit reads it", body: "It finds the parties, the signature, the term, the renewal clause and the notice period, and works out the deadline to give notice." },
            { title: "Review and download", body: "The row shows on screen. With a free account you take it home as Excel." },
          ],
        },
        faqs: [
          {
            q: "What does the free version include?",
            a: "{limit} contracts a day, with the full result on screen. Downloading the Excel takes a Tavnit account, which has no cost.",
          },
          {
            q: "Which dates and details does it extract?",
            a: "The parties, the signature date, start and end of the term, the term length, whether it auto-renews, the notice period, the deadline to give non-renewal notice, the value with its currency and the governing law. Whatever the contract does not say stays empty: no date is ever invented.",
          },
          {
            q: "Why is the result a single row?",
            a: "Because a contract has one term, one signature date and one set of parties. With an account you can run a whole folder of contracts and get a table with one row per contract, ready to sort by end date.",
          },
          {
            q: "Which formats does it accept?",
            a: "PDF (text or scanned), JPG and PNG, up to 4 MB and 5 pages. If your contract is longer, upload the pages with the term and renewal clauses, or create an account.",
          },
          {
            q: "Can I choose other columns?",
            a: "Not here: this tool uses a fixed contract Flow with 14 fields. In your account you create your own Flows, for contracts or any other document, with the fields you need: internal owner, penalty clause, guarantee. No templates: you describe the field and, when needed, give it a hint on where to look.",
          },
          {
            q: "What happens to my file?",
            a: "It is processed in a Tavnit account dedicated to the free tools and used for nothing else. After 24 hours the file and the extracted row delete themselves, automatically; we only keep the fact that a run happened, without the document or its contents. If you want it gone sooner, email support@tavnit.io.",
          },
          {
            q: "Does it work with contracts from any country?",
            a: "Yes. It handles contracts in English, Spanish and other languages, with any date format. It is tested on contracts from the US, Panama, Mexico and Colombia, among others.",
          },
          {
            q: "How do I get a warning before the end date?",
            a: "Create an account, build a Flow with the fields you want and forward contracts to its email address, or connect it through the API, webhooks, Zapier, Make or n8n. A Cleaner compares the notice deadline with today and sends the email or webhook to whoever has to decide.",
          },
        ],
      },
    },
    /**
     * Receipt → Excel. Mostly photos of thermal tickets: restaurants, pharmacies,
     * taxis, supermarkets. What differs from the invoice base is the vocabulary,
     * the SEO text, the sample, the Cleaner ideas (expenses, not payables) and the
     * questions people actually ask about receipts.
     */
    "receipt-to-excel": {
      vocab: {
        doc: "receipt",
        docs: "receipts",
        a_doc: "a receipt",
        the_doc: "the receipt",
        the_docs: "the receipts",
        your_doc: "your receipt",
        your_docs: "your receipts",
        all_your_docs: "all your receipts",
        all_docs: "all receipts",
        each_doc: "every receipt",
        another_doc: "another receipt",
        this_doc: "this receipt",
      },
      overrides: {
        title: "Receipt to Excel, Free: Photo to Spreadsheet",
        description:
          "Upload a photo or PDF of a receipt and get its lines in Excel: merchant, date, items, quantities, tax, tip and total. Free, no templates, no sign-up to see the result. Receipt OCR to spreadsheet in seconds.",
        label: "Receipt to Excel",
        h1: "Turn a receipt into Excel",
        intro:
          "Snap a photo of the receipt or upload the PDF. Tavnit reads the merchant, the date, every item with its price and the totals, and hands it back as a spreadsheet. Faded, skewed or crumpled thermal tickets work too: there is no template to set up.",
        drop: {
          title: "Drop the photo of your receipt here",
          sample: "Try it with a sample receipt",
        },
        stages: ["Uploading the receipt", "Reading the merchant and date", "Finding the items", "Ordering the columns", "Almost there"],
        result: {
          empty: "We could not find any items on this receipt. Try a sharper photo with the whole ticket in frame and no shadows.",
          flowNote: "These {fields} columns are the fields of a fixed receipt Flow. In your account, you choose the fields.",
          ghostHint: "In Tavnit you add the fields you want: cost centre, who spent it, project, category…",
        },
        next: {
          lead: "That was one receipt. With an account, the same happens to every receipt that arrives, and the lines do not stop at an Excel: they keep going on their own.",
          source: "Your receipt",
          inputs: { show: "How does your receipt get in?" },
          flow: {
            name: "Receipt",
            add: { name: "cost_center", type: "Text", hint: "Who spent it, or the project", save: "Save", value: "Sales" },
          },
        },
        cleaners: {
          lead: "Simple rules that run on their own over every receipt after it is read. Four ideas using your own data:",
          ideas: [
            { icon: "date", title: "One way to write the date", from: "{date}", to: "{iso}", note: "every receipt, the same format for the expense report" },
            { icon: "sum", title: "Items must add up to the subtotal", from: "items {sum}", to: "subtotal {subtotal}", note: "if it does not match, the photo read badly and someone checks it", check: "sum" },
            { icon: "approve", title: "Approval above an amount", from: "total {total}", to: "approve before reimbursing", note: "when it exceeds {threshold}" },
            { icon: "money", title: "Convert to your currency", from: "{total} {currency}", to: "your currency", note: "at the rate on the receipt date, for travel" },
          ],
        },
        after: {
          lead: "It came out of a fixed Flow with {fields} fields. In your account you choose the fields, and this is what it looks like when Tavnit handles every receipt of a trip or a month:",
        },
        how: {
          steps: [
            { title: "Upload the receipt", body: "A phone photo or a PDF. Any merchant, any language, however faded the ticket." },
            { title: "Tavnit reads it", body: "It finds the merchant, the date, the number, every item with its price, and the subtotal, tax, tip and total." },
            { title: "Review and download", body: "The table shows on screen. With a free account you take it home as Excel." },
          ],
        },
        faqs: [
          {
            q: "What does the free version include?",
            a: "{limit} receipts a day, with the full result on screen. Downloading the Excel takes a Tavnit account, which has no cost.",
          },
          {
            q: "Does it work with a photo from my phone?",
            a: "Yes, that is the normal case. JPG, PNG and PDF up to 4 MB. It helps to have the whole ticket in frame, even light and no fingers over it; a skewed or slightly blurry shot still reads.",
          },
          {
            q: "Which formats does it accept?",
            a: "JPG, PNG and PDF (text or scanned), up to 4 MB and 5 pages. A long supermarket receipt fits in one photo.",
          },
          {
            q: "Do I need to set up a template per merchant?",
            a: "No. Tavnit does not use templates: it reads each receipt as it comes, whether it is a restaurant, a pharmacy, a taxi or a gas station.",
          },
          {
            q: "Can I choose other columns?",
            a: "Not here: this tool uses a fixed receipt Flow with 15 fields. In your account you create your own Flows with the fields you need: per document (cost centre, who spent it, project, category) or per line (product code). No templates: you describe the field and, when needed, give it a hint on where to look.",
          },
          {
            q: "What happens to my file?",
            a: "It is processed in a Tavnit account dedicated to the free tools and used for nothing else. After 24 hours the photo and the extracted rows delete themselves, automatically; we only keep the fact that a run happened, without the document or its contents. If you want it gone sooner, email support@tavnit.io.",
          },
          {
            q: "I have fifty receipts from a trip. One at a time?",
            a: "Here, yes. With an account you send them all at once: forward them by email to the Flow, drop them in bulk or connect through the API, and every receipt comes out as rows in the same Excel, Google Sheets or your expense system.",
          },
          {
            q: "How do I make it automatic?",
            a: "Create an account, build a Flow with the fields you want and forward receipt photos to its email address, or connect it through the API, webhooks, Zapier, Make or n8n. The expense report builds itself.",
          },
        ],
      },
    },
    /**
     * Number format. A spreadsheet in, the chosen columns out in one number
     * format. The search it answers in Spanish is the everyday LatAm one: a file
     * exported with "1.234,56" that Excel reads as text, or the other way round.
     */
    "number-format": {
      vocab: {
        doc: "spreadsheet",
        docs: "spreadsheets",
        a_doc: "a spreadsheet",
        the_doc: "the spreadsheet",
        the_docs: "the spreadsheets",
        your_doc: "your spreadsheet",
        your_docs: "your spreadsheets",
        all_your_docs: "all your spreadsheets",
        all_docs: "all spreadsheets",
        each_doc: "every spreadsheet",
        another_doc: "another spreadsheet",
        this_doc: "this spreadsheet",
      },
      overrides: {
        title: "Fix Number Format in Excel or CSV, Free",
        description:
          "Upload an Excel or CSV file with numbers like 1.234,56 or 1,234.56 and get them back in one format, ready to add up. You pick the columns and the format. Free, no sign-up to see the result.",
        label: "Fix number format",
        h1: "Fix the number format in your spreadsheet",
        intro:
          "Upload the Excel or CSV file. Pick which columns hold numbers and how you want them: 1234.56, 1,234.56 or 1.234,56. Tavnit converts every one and hands your file back with the same columns in the same order.",
        trust: ["CSV or Excel · up to 500 rows", "{limit} free files a day", "Everything is deleted after 24 h"],
        drop: {
          title: "Drop your Excel or CSV file here",
          hint: "or choose a file from your computer",
          choose: "Choose file",
          sample: "Try a sample file",
          formats: "CSV or .xlsx · up to 4 MB and 500 rows",
        },
        errors: {
          unsupported: "Only CSV or Excel (.xlsx) files.",
          xls: "This is an old Excel file (.xls). Open it in Excel and save it as .xlsx or .csv.",
          too_many_rows: "The free version handles up to 500 rows. Upload part of the file.",
          too_many_columns: "Pick up to 10 columns at a time.",
          no_columns: "Pick at least one column.",
          nothing_to_clean: "We found no numbers to convert in those columns.",
          empty: "The file is empty or has no rows under the header.",
          unreadable: "We could not read the file. If it is an Excel file, save it again as .xlsx.",
          failed: "We could not convert this file. Try again, or try the sample file.",
        },
        how: {
          heading: "How it works",
          steps: [
            { title: "Upload the file", body: "A CSV or an Excel file, comma or semicolon separated." },
            { title: "Pick columns and format", body: "We tick the columns that look like numbers. You say whether your decimals use a comma or a point, and how you want them." },
            { title: "Review and download", body: "The cells that changed are highlighted. With your free account you take the file as Excel or CSV." },
          ],
        },
        faqs: [
          { q: "Why won't Excel add up my numbers?", a: "Because it reads them as text. It happens when the file comes from a system or a country that writes decimals differently from yours: 1.234,56 in an Excel set up for 1,234.56, or the reverse. Putting them in one format makes them numbers again." },
          { q: "How do you know whether my decimals use a comma or a point?", a: "We guess from your values: if 1.234,56 appears, the decimal is the comma. When it cannot be told, 1.234 on its own for instance, you choose. That choice decides how every number is read." },
          { q: "Which format should I pick?", a: "1234.56, with no thousands separator, is the one every system, formula and import reads without trouble. 1,234.56 and 1.234,56 are for showing the file to people, depending on your country." },
          { q: "What happens to cells that are not numbers?", a: "They stay as they were. A percentage (15%), text (N/A) or an empty cell is left alone: only what is clearly a number changes." },
          { q: "What formats does it accept?", a: "CSV separated by commas, semicolons or tabs, and Excel .xlsx, up to 4 MB and 500 rows. If you have an old Excel file (.xls), save it as .xlsx." },
          { q: "What happens to my file?", a: "It is used only for this conversion and deleted after 24 hours along with the result. Only your browser can see the result." },
          { q: "How do I make this happen on its own?", a: "In Tavnit the same rule is a Cleaner: it runs by itself on every document you extract or every file that arrives by email or API, alongside dates, currencies and checks." },
        ],
        clean: {
          setup: {
            heading: "Pick the columns and the format",
            fileSummary: "{rows} · {cols}",
            columnsLabel: "Columns with numbers",
            columnsHint: "Up to {max}. We ticked the ones that look like numbers.",
            tooMany: "You can pick up to {max} columns at a time.",
            inputLabel: "In your file, decimals use a",
            inputOptions: { comma: "comma · 1.234,56", dot: "point · 1,234.56" },
            outputLabel: "I want the numbers as",
            outputOptions: { plain: "1234.56 · for formulas and systems", us: "1,234.56", latam: "1.234,56" },
            preview: "First rows",
            run: "Convert",
            change: "Change file",
          },
          stages: ["Uploading the file", "Reading the columns", "Converting the numbers", "Building your file"],
          heading: "Done: {file}",
          summary: "{cells} changed in {cols}",
          cellWord: ["cell", "cells"],
          columnWord: ["column", "columns"],
          unchanged: "No cell needed changing: they were already in that format.",
          highlight: "The cells that changed are in blue.",
          shown: "Showing {shown} of {total} rows. The download has all of them.",
          download: "Download",
          downloadXlsx: "Excel (.xlsx)",
          downloadCsv: "CSV (.csv)",
          another: "Convert another file",
          automate: {
            heading: "Make it happen with every file",
            body: "In Tavnit this rule is a Cleaner. You set it up once and it runs by itself on every invoice you extract or every file that arrives by email or API, alongside dates, currencies and checks.",
            cta: "Create a free account",
            docs: "What is a Cleaner",
          },
        },
      },
    },
    /**
     * Date format. A spreadsheet in, the chosen date columns out in one format.
     * Numeric dates are read with the visitor's day/month order; dates written in
     * words go through the Cleaner's AI conversion, which is the part a formula
     * cannot do.
     */
    "date-format": {
      vocab: {
        doc: "spreadsheet",
        docs: "spreadsheets",
        a_doc: "a spreadsheet",
        the_doc: "the spreadsheet",
        the_docs: "the spreadsheets",
        your_doc: "your spreadsheet",
        your_docs: "your spreadsheets",
        all_your_docs: "all your spreadsheets",
        all_docs: "all spreadsheets",
        each_doc: "every spreadsheet",
        another_doc: "another spreadsheet",
        this_doc: "this spreadsheet",
      },
      overrides: {
        title: "Fix Date Format in Excel or CSV, Free",
        description:
          "Upload an Excel or CSV file with mixed dates (03/04/2024, March 12 2024, 2024-03-12) and get them all back in one format. You pick the columns and the format. Free, no sign-up to see the result.",
        label: "Fix date format",
        h1: "Put every date in your spreadsheet in one format",
        intro:
          "Upload the Excel or CSV file. Pick which columns are dates and how you want them: 2024-03-12, 12/03/2024 or 03/12/2024. Tavnit converts every one, dates written in words included, and hands your file back with the same columns.",
        trust: ["CSV or Excel · up to 500 rows", "{limit} free files a day", "Everything is deleted after 24 h"],
        drop: {
          title: "Drop your Excel or CSV file here",
          hint: "or choose a file from your computer",
          choose: "Choose file",
          sample: "Try a sample file",
          formats: "CSV or .xlsx · up to 4 MB and 500 rows",
        },
        errors: {
          unsupported: "Only CSV or Excel (.xlsx) files.",
          xls: "This is an old Excel file (.xls). Open it in Excel and save it as .xlsx or .csv.",
          too_many_rows: "The free version handles up to 500 rows. Upload part of the file.",
          too_many_columns: "Pick up to 10 columns at a time.",
          no_columns: "Pick at least one column.",
          nothing_to_clean: "We found no dates to convert in those columns.",
          empty: "The file is empty or has no rows under the header.",
          unreadable: "We could not read the file. If it is an Excel file, save it again as .xlsx.",
          failed: "We could not convert this file. Try again, or try the sample file.",
        },
        how: {
          heading: "How it works",
          steps: [
            { title: "Upload the file", body: "A CSV or an Excel file, with dates as they come: slashes, dashes, dots or words." },
            { title: "Pick columns and format", body: "We tick the columns that look like dates. You say whether your file puts the day or the month first, and how you want them." },
            { title: "Review and download", body: "The cells that changed are highlighted. With your free account you take the file as Excel or CSV." },
          ],
        },
        faqs: [
          { q: "How do you know whether 03/04/2024 is 3 April or 4 March?", a: "One date on its own cannot tell you. So we ask whether your file puts the day or the month first, and suggest the answer when the column has a date like 15/04/2024 that reads only one way." },
          { q: "Does it understand dates written in words?", a: "Yes. \"March 5th 2024\", \"12 de marzo de 2024\" or \"1 Apr 2024\" are read with AI, which is what an Excel formula cannot do. Numeric dates are read with rules, no AI." },
          { q: "Which format should I pick?", a: "2024-03-12 (year, month, day) is the one every system reads without confusion and the one that sorts correctly. 03/12/2024 is the US habit; 12/03/2024 is usual in Europe and Latin America." },
          { q: "What happens to cells that are not dates?", a: "They stay as they were, like empty cells. When a date cannot be read with confidence we leave it as it came rather than guess." },
          { q: "What if my Excel file already stores them as dates?", a: "We take them as they are, without re-reading them, and only change the format." },
          { q: "What happens to my file?", a: "It is used only for this conversion and deleted after 24 hours along with the result. Only your browser can see the result." },
          { q: "How do I make this happen on its own?", a: "In Tavnit the same rule is a Cleaner: it runs by itself on every document you extract or every file that arrives by email or API, alongside numbers, currencies and checks." },
        ],
        clean: {
          setup: {
            heading: "Pick the columns and the format",
            fileSummary: "{rows} · {cols}",
            columnsLabel: "Columns with dates",
            columnsHint: "Up to {max}. We ticked the ones that look like dates.",
            tooMany: "You can pick up to {max} columns at a time.",
            inputLabel: "In your file, numeric dates put first",
            inputOptions: { dmy: "the day · 31/12/2024", mdy: "the month · 12/31/2024" },
            outputLabel: "I want the dates as",
            outputOptions: { iso: "2024-03-12 · year, month, day", dmy: "12/03/2024 · day, month, year", mdy: "03/12/2024 · month, day, year" },
            preview: "First rows",
            run: "Convert",
            change: "Change file",
          },
          stages: ["Uploading the file", "Reading the columns", "Converting the dates", "Reading dates written in words", "Building your file"],
          heading: "Done: {file}",
          summary: "{cells} changed in {cols}",
          cellWord: ["cell", "cells"],
          columnWord: ["column", "columns"],
          unchanged: "No cell needed changing: they were already in that format.",
          highlight: "The cells that changed are in blue.",
          shown: "Showing {shown} of {total} rows. The download has all of them.",
          download: "Download",
          downloadXlsx: "Excel (.xlsx)",
          downloadCsv: "CSV (.csv)",
          another: "Convert another file",
          automate: {
            heading: "Make it happen with every file",
            body: "In Tavnit this rule is a Cleaner. You set it up once and it runs by itself on every invoice, contract or file that comes in, alongside numbers, currencies and checks.",
            cta: "Create a free account",
            docs: "What is a Cleaner",
          },
        },
      },
    },
    /**
     * Currency converter. A spreadsheet in, a converted column next to each
     * amount column out, at the day's reference rate. The rates come from the
     * European Central Bank through Frankfurter (the engine's source), so the
     * copy says plainly which currencies are there and which are not.
     */
    "currency-converter": {
      vocab: {
        doc: "spreadsheet",
        docs: "spreadsheets",
        a_doc: "a spreadsheet",
        the_doc: "the spreadsheet",
        the_docs: "the spreadsheets",
        your_doc: "your spreadsheet",
        your_docs: "your spreadsheets",
        all_your_docs: "all your spreadsheets",
        all_docs: "all spreadsheets",
        each_doc: "every spreadsheet",
        another_doc: "another spreadsheet",
        this_doc: "this spreadsheet",
      },
      overrides: {
        title: "Convert Currency in Excel at Today's Rate, Free",
        description:
          "Upload an Excel or CSV file with prices or amounts and get each column converted to dollars, euros, pounds or any of 30 currencies at the day's reference rate. Free, no sign-up to see the result.",
        label: "Convert currency",
        h1: "Convert the amounts in your spreadsheet to another currency",
        intro:
          "Upload the Excel or CSV file. Pick the amount columns, the currency they are in and the one you want. Tavnit adds the converted column next to each one at the day's rate and hands your whole file back.",
        trust: ["CSV or Excel · up to 500 rows", "{limit} free files a day", "Everything is deleted after 24 h"],
        drop: {
          title: "Drop your Excel or CSV file here",
          hint: "or choose a file from your computer",
          choose: "Choose file",
          sample: "Try a sample file",
          formats: "CSV or .xlsx · up to 4 MB and 500 rows",
        },
        errors: {
          unsupported: "Only CSV or Excel (.xlsx) files.",
          xls: "This is an old Excel file (.xls). Open it in Excel and save it as .xlsx or .csv.",
          too_many_rows: "The free version handles up to 500 rows. Upload part of the file.",
          too_many_columns: "Pick up to 10 columns at a time.",
          no_columns: "Pick at least one column.",
          nothing_to_clean: "We found no amounts to convert in those columns.",
          empty: "The file is empty or has no rows under the header.",
          unreadable: "We could not read the file. If it is an Excel file, save it again as .xlsx.",
          failed: "We could not convert this file. Try again, or try the sample file.",
        },
        how: {
          heading: "How it works",
          steps: [
            { title: "Upload the file", body: "A CSV or an Excel file with prices, totals or any column of amounts." },
            { title: "Pick the currencies", body: "We tick the columns that look like amounts. You say which currency they are in, how their decimals are written and what to convert them to." },
            { title: "Review and download", body: "Each converted column sits next to the original. With your free account you take the file as Excel or CSV." },
          ],
        },
        faqs: [
          { q: "What exchange rate does it use?", a: "The day's reference rate published by the European Central Bank. It is the same for the whole file and is a reference, not your bank's buying or selling rate." },
          { q: "Which currencies can I convert?", a: "US dollar (USD), euro (EUR), pound (GBP), Mexican peso (MXN), real (BRL), yuan (CNY), Canadian dollar, yen, Swiss franc and the rest of the currencies the European Central Bank publishes, 30 in all. You can convert from any of them to any of them." },
          { q: "Does it work with Colombian pesos, soles, Chilean pesos or balboas?", a: "Not yet: those currencies are not in the European Central Bank's rates. In Panama, where the balboa is at par with the dollar, you can pick USD." },
          { q: "What happens to my original columns?", a: "They stay as they were. The conversion is added as a new column next to them, for example \"Price (USD)\", so you can compare." },
          { q: "What happens to cells that are not amounts?", a: "They stay empty in the converted column. Text, a percentage or an empty cell is not converted." },
          { q: "What happens to my file?", a: "It is used only for this conversion and deleted after 24 hours along with the result. Only your browser can see the result." },
          { q: "How do I make this happen on its own?", a: "In Tavnit, currency conversion is a Cleaner: it runs by itself on every invoice you extract or every file that arrives by email or API, alongside dates, numbers and checks." },
        ],
        clean: {
          setup: {
            heading: "Pick the columns and the currencies",
            fileSummary: "{rows} · {cols}",
            columnsLabel: "Columns with amounts",
            columnsHint: "Up to {max}. We ticked the ones that look like amounts.",
            tooMany: "You can pick up to {max} columns at a time.",
            sourceLabel: "The amounts are in",
            sourceHint: "Currencies with a European Central Bank rate.",
            inputLabel: "Decimals use a",
            inputOptions: { comma: "comma · 1.234,56", dot: "point · 1,234.56" },
            outputPopular: "Most used",
            outputAll: "All currencies",
            outputLabel: "Convert to",
            outputOptions: {},
            preview: "First rows",
            run: "Convert",
            change: "Change file",
          },
          stages: ["Uploading the file", "Reading the amounts", "Getting the day's rate", "Converting", "Building your file"],
          heading: "Done: {file}",
          summary: "{cells} converted in {cols}",
          cellWord: ["cell", "cells"],
          columnWord: ["column", "columns"],
          unchanged: "We found no amounts to convert in those columns.",
          highlight: "The converted columns are in blue.",
          shown: "Showing {shown} of {total} rows. The download has all of them.",
          download: "Download",
          downloadXlsx: "Excel (.xlsx)",
          downloadCsv: "CSV (.csv)",
          another: "Convert another file",
          automate: {
            heading: "Make it happen with every invoice",
            body: "In Tavnit currency conversion is a Cleaner. You set it up once and every invoice or quote in another currency arrives converted, alongside dates, numbers and checks.",
            cta: "Create a free account",
            docs: "What is a Cleaner",
          },
        },
      },
    },
    /**
     * Translate columns. A spreadsheet in, a translated column next to each
     * chosen text column out. Every cell goes through a model, so the free
     * allowance is 200 rows instead of 500.
     */
    "translate-columns": {
      vocab: {
        doc: "spreadsheet",
        docs: "spreadsheets",
        a_doc: "a spreadsheet",
        the_doc: "the spreadsheet",
        the_docs: "the spreadsheets",
        your_doc: "your spreadsheet",
        your_docs: "your spreadsheets",
        all_your_docs: "all your spreadsheets",
        all_docs: "all spreadsheets",
        each_doc: "every spreadsheet",
        another_doc: "another spreadsheet",
        this_doc: "this spreadsheet",
      },
      overrides: {
        title: "Translate Excel Columns, Free",
        description:
          "Upload an Excel or CSV file and translate the columns you pick into more than 40 languages: English, Spanish, Portuguese, Chinese and more. Each translation is added next to its column. Free, no sign-up to see the result.",
        label: "Translate columns",
        h1: "Translate the columns of your spreadsheet",
        intro:
          "Upload the Excel or CSV file. Pick which columns to translate and into which language. Tavnit detects the source language and adds the translation next to each column, leaving the rest of your file alone.",
        trust: ["CSV or Excel · up to 200 rows", "{limit} free files a day", "Everything is deleted after 24 h"],
        drop: {
          title: "Drop your Excel or CSV file here",
          hint: "or choose a file from your computer",
          choose: "Choose file",
          sample: "Try a sample file",
          formats: "CSV or .xlsx · up to 4 MB and 200 rows",
        },
        errors: {
          unsupported: "Only CSV or Excel (.xlsx) files.",
          xls: "This is an old Excel file (.xls). Open it in Excel and save it as .xlsx or .csv.",
          too_many_rows: "Free translation handles up to 200 rows. Upload part of the file.",
          too_many_columns: "Pick up to 10 columns at a time.",
          no_columns: "Pick at least one column.",
          nothing_to_clean: "We found no text to translate in those columns.",
          empty: "The file is empty or has no rows under the header.",
          unreadable: "We could not read the file. If it is an Excel file, save it again as .xlsx.",
          failed: "We could not translate this file. Try again, or try the sample file.",
        },
        how: {
          heading: "How it works",
          steps: [
            { title: "Upload the file", body: "A CSV or an Excel file with descriptions, instructions, comments or any text column." },
            { title: "Pick columns and language", body: "We tick the columns with text. You pick the language; the source language is detected for you." },
            { title: "Review and download", body: "Each translation sits next to its original column. With your free account you take the file as Excel or CSV." },
          ],
        },
        faqs: [
          { q: "Which languages can I pick?", a: "More than 40: English, Spanish, Portuguese, French, German, Chinese, Italian, Japanese, Korean, Arabic, Russian, Hindi, Turkish, Vietnamese and many more. The source language is detected cell by cell, so it works even when your file mixes languages." },
          { q: "What happens to codes, numbers and proper names?", a: "They are kept. The translation respects formatting, units and codes; a cell already in the target language is left as it is." },
          { q: "Why is the limit 200 rows?", a: "Because every cell is translated with a language model. The free version handles up to 200 rows per file; an account has no such limit." },
          { q: "What happens to my original columns?", a: "They stay as they were. The translation is added as a new column next to them, for example \"Description (ES)\"." },
          { q: "Can I use it for product descriptions in customs?", a: "Yes, it is a common use: putting the descriptions of a commercial invoice or packing list into English or Spanish before classifying the goods." },
          { q: "What happens to my file?", a: "It is used only for this translation and deleted after 24 hours along with the result. Only your browser can see the result." },
          { q: "How do I make this happen on its own?", a: "In Tavnit, translation is a Cleaner: it runs by itself on every document you extract or every file that arrives by email or API, alongside dates, numbers and currencies." },
        ],
        clean: {
          setup: {
            heading: "Pick the columns and the language",
            fileSummary: "{rows} · {cols}",
            columnsLabel: "Columns with text",
            columnsHint: "Up to {max}. We ticked the ones with text.",
            tooMany: "You can pick up to {max} columns at a time.",
            inputLabel: "",
            inputOptions: {},
            outputPopular: "Most used",
            outputAll: "All languages",
            outputLabel: "Translate into",
            outputOptions: {},
            preview: "First rows",
            run: "Translate",
            change: "Change file",
          },
          stages: ["Uploading the file", "Reading the columns", "Detecting the language", "Translating", "Building your file"],
          heading: "Done: {file}",
          summary: "{cells} translated in {cols}",
          cellWord: ["cell", "cells"],
          columnWord: ["column", "columns"],
          unchanged: "We found no text to translate in those columns.",
          highlight: "The translated columns are in blue.",
          shown: "Showing {shown} of {total} rows. The download has all of them.",
          download: "Download",
          downloadXlsx: "Excel (.xlsx)",
          downloadCsv: "CSV (.csv)",
          another: "Translate another file",
          automate: {
            heading: "Make it happen with every document",
            body: "In Tavnit translation is a Cleaner. You set it up once and every invoice, packing list or file that comes in arrives with its descriptions already translated.",
            cta: "Create a free account",
            docs: "What is a Cleaner",
          },
        },
      },
    },
  },

  og: {
    "invoice-to-excel": "Free. No templates. Your invoice's line items as a spreadsheet.",
    "invoice-line-items": "Free. One row per line item, header on every row. No templates.",
    "po-invoice-check": "Free. Every PO line against the invoice: price, quantity, missing and extra lines.",
    "split-scanned-pdf": "Free. One scan in, every document out, each one classified.",
    "packing-list-to-excel": "Free. No templates. Every line of your packing list as a spreadsheet.",
    "bill-of-lading-to-excel": "Free. No templates. Parties, vessel, ports and one row per container.",
    "quote-comparison": "Free. Two or three quotes, one table, the cheapest per line marked.",
    "contract-dates": "Free. Parties, term, auto-renewal and notice deadline, in one row.",
    "receipt-to-excel": "Free. Snap a receipt, get its items as a spreadsheet.",
    "number-format": "Free. Any column of numbers, one format: 1234.56, 1,234.56 or 1.234,56.",
    "date-format": "Free. Mixed dates in, one format out, even dates written in words.",
    "currency-converter": "Free. Any column of prices, converted at the day's reference rate.",
    "translate-columns": "Free. Any text column, translated into any of 40+ languages.",
  },
};

export default copy;
