import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  AlertTriangle,
  Boxes,
  Braces,
  Crosshair,
  FilePlus,
  Image as ImageIcon,
  Info,
  LifeBuoy,
  Play,
  Puzzle,
  Sparkles,
  Table2,
  Type,
} from "lucide-react";
import {
  BulletList,
  DataTable,
  DocCard,
  DocLink,
  InfoBox,
  InlineCode,
  Lead,
  NumberedList,
  Related,
  Screenshot,
  WarningBox,
} from "@/components/docs/ui";

export const metadata = docMetadata("flows");

/** Mirrors the visible numbered steps under "Build the schema". */
const HOW_TO = {
  name: "Build a Tavnit flow that extracts structured data from a document",
  description:
    "Create a flow, define its metadata and table fields, add extraction hints so the AI knows where to look, and activate it.",
  steps: [
    {
      name: "Create the flow and describe it",
      text: "On the Flows page, create a flow. Give it a name and a description of the documents it handles — the description also helps the AI extract more accurately.",
    },
    {
      name: "Add metadata fields",
      text: "Add a field for each value that appears once per document, such as invoice number, issue date or supplier, and set its data type.",
    },
    {
      name: "Add table fields",
      text: "Add a field for each column of the repeating line-item table, such as description, quantity, unit price and amount.",
    },
    {
      name: "Add extraction hints",
      text: "For any field that is ambiguous, add hints: real example values, the label it sits next to, the area of the page it appears in, or the printed column header.",
    },
    {
      name: "Activate and test",
      text: "Switch the flow to Active and process one real document. Compare the result against the source and tighten the hints on any field that came back wrong.",
    },
  ],
};

export default function Page() {
  return (
    <>
      <DocsPageSchema
        slug="flows"
        howTo={HOW_TO}
        primaryImage={{
          url: "/assets/docs-flow-schema-2026-08.jpg",
          caption:
            "A Tavnit flow's data schema, with metadata fields and table fields defined side by side.",
          width: 1327,
          height: 801,
        }}
      />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Flows
        </h1>

        <DocCard icon={<Sparkles size={24} />} title="What a flow is">
          <Lead>
            A flow is the definition of one document type: the fields you want extracted, the hints
            that tell the AI where to find them, and everything attached downstream. It is the only
            object in Tavnit that turns a document into data — Collections, Splitters and Cleaners
            all exist to feed or refine what a flow produces.
          </Lead>
          <p>
            There is no template to draw and no coordinates to map. You describe the fields in plain
            terms and the flow works across layouts, so one <em>Supplier invoices</em> flow can
            handle twenty vendors whose invoices look nothing alike. That is also why the schema and
            its hints are where nearly all extraction quality is won or lost.
          </p>
          <Screenshot
            src="/assets/docs-flow-schema-2026-08.jpg"
            alt="The data schema of a Tavnit flow named Invoice Processor. A Metadata Fields panel lists nine single-value fields such as Invoice Number, Due Date and Total with their data types, next to a Table Fields panel listing Description, Quantity, Price and Amount. The left rail groups Recent Runs, Email Trigger, Collections, Cleaner, Agent, Form Templates, Email Output, Webhook, Bucket Export, Human in the Loop and Flow ID."
            caption="A flow's data schema. Metadata fields on the left, repeating table fields on the right, and everything attachable to the flow in the rail."
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Only the schema is required">
            A flow needs at least one field. Everything else in the rail — Cleaner, agent, webhook,
            email, Bucket export, review — is optional and can be added later without rebuilding
            anything.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Table2 size={24} />} title="Metadata fields and table fields">
          <Lead>
            Every field is one of two kinds, decided by whether the value appears once per document
            or once per line. This is the most consequential choice in the schema: it determines the
            shape of your webhook payload, your Bucket rows, your CSV and your review screen.
          </Lead>
          <DataTable
            head={["", "Metadata field", "Table field"]}
            rows={[
              ["Appears", "Once per document", "Once per row of a repeating table"],
              [
                "On an invoice",
                "Invoice number, issue date, supplier, total",
                "Description, quantity, unit price, amount",
              ],
              [
                "In the output",
                <>
                  The <InlineCode>metadata</InlineCode> object
                </>,
                <>
                  One entry per row in <InlineCode>rows</InlineCode>
                </>,
              ],
              [
                "In a Bucket",
                "Repeated onto every row exported from that document",
                "One Bucket row each",
              ],
            ]}
          />
          <InfoBox color="violet" icon={<Info size={20} />} title="Getting the kind wrong is the classic mistake">
            Defining a line-item column as a metadata field gets you one value from a table of
            twenty. Defining an invoice total as a table field repeats the same number on every row.
            If you are unsure, ask whether a second copy of the value could ever appear on the same
            document.
          </InfoBox>
          <p>
            A flow can also stamp <strong>system columns</strong> onto every row it outputs — the
            flow ID, the flow name and the run ID. Turn these on when several flows write into one{" "}
            <DocLink href="/docs/buckets">Bucket</DocLink> and you need to know which document a row
            came from.
          </p>
        </DocCard>

        <DocCard icon={<Type size={24} />} title="Data types">
          <Lead>
            Each field carries a type. Types are not cosmetic: they decide whether a value sorts,
            sums, compares in a Cleaner rule and charts correctly. Setting them right at the flow
            saves work at every later stage.
          </Lead>
          <DataTable
            head={["Type", "Use for", "Notes"]}
            rows={[
              ["Text", "Names, addresses, descriptions, reference codes", "The safe default."],
              [
                "Number",
                "Totals, quantities, prices, rates",
                "Required if you want to sum, compare or chart the value later.",
              ],
              [
                "Date",
                "Issue dates, due dates, delivery dates",
                <>
                  Reformatting to a consistent output format is a{" "}
                  <DocLink href="/docs/cleaners">Cleaner</DocLink> job, not an extraction one.
                </>,
              ],
              [
                "Mixed / alphanumeric",
                "Values that blend letters and digits — part numbers, container codes, tax IDs",
                "Use this rather than Number when leading zeros or letters must survive.",
              ],
              [
                "Image",
                "Figures printed in the document: photos, logos, signatures, stamps",
                "Extracted and stored securely, then delivered as a time-limited link.",
              ],
            ]}
          />
          <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Extract as printed, normalise later">
            Do not use the type to reformat. Pull the value the way the document shows it, then let a
            Cleaner convert currencies, restate dates and fix decimal separators. Extraction that
            also transforms is harder to debug when a number comes back wrong.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Crosshair size={24} />} title="Extraction hints">
          <Lead>
            Hints are how you disambiguate a field without writing a template. They matter most when
            a document contains several values that look alike — three dates, two totals, an order
            number and an invoice number in the same header block.
          </Lead>
          <p>
            <strong>For a metadata field</strong> you can combine any of these:
          </p>
          <DataTable
            head={["Hint", "What it tells the AI", "Good for"]}
            rows={[
              [
                "Example values",
                "Real values copied from your documents.",
                "Almost everything. The single highest-value hint — it shows format, length and shape at once.",
              ],
              [
                "Next to a label",
                <>
                  The printed label the value sits beside. List the variants:{" "}
                  <em>Invoice Number, Invoice #, Inv No</em>.
                </>,
                "Header fields that different vendors label differently.",
              ],
              [
                "In a specific page area",
                "One of nine zones — top-left through bottom-right.",
                "Values that are always in the same corner, like a document number top-right.",
              ],
              [
                "Expected range",
                "A minimum, a maximum, or both. Treated as guidance, not a hard rule.",
                "Catching a decimal-point misread — a total of 27,030 where 270.30 was meant.",
              ],
              [
                "Additional hints",
                "Free text for anything the options above do not cover.",
                "Rules like “use the net figure, never the gross one”.",
              ],
            ]}
          />
          <p>
            <strong>For a table field</strong> the hints are different, because the AI is locating a
            column rather than a point on the page:
          </p>
          <DataTable
            head={["Hint", "What it tells the AI"]}
            rows={[
              [
                "Source type",
                "Whether the data sits in a real ruled table or in free-form text that only reads like a list. Set free-form when there is no visible grid.",
              ],
              [
                "Column header",
                "The header text as printed. List every variant your vendors use so one field matches them all.",
              ],
              ["Expected range", "A sanity range for the numbers in that column."],
              ["Example values", "Real cell values from your documents."],
              [
                "Field meaning",
                "What the column actually represents, when the header alone is ambiguous — “unit price before discount”.",
              ],
            ]}
          />
          <InfoBox color="green" icon={<Info size={20} />} title="Start without hints">
            Add fields, run one real document, and only add hints where the result was wrong.
            Hinting everything up front costs time on fields that were never ambiguous, and an
            over-specified hint can make extraction worse by ruling out a layout you did not
            anticipate.
          </InfoBox>
          <p>
            Example values are skipped for <strong>date</strong> and <strong>image</strong> fields,
            so put any date guidance in the additional-hints box instead.
          </p>
        </DocCard>

        <DocCard icon={<Puzzle size={24} />} title="Composite fields">
          <Lead>
            Some table columns hold several values in one cell — a size-and-quantity breakdown like{" "}
            <em>S:2 M:5 L:3</em> printed in a single box. A composite field splits that cell into
            sub-fields so each part becomes its own value instead of a string you have to parse
            later.
          </Lead>
          <NumberedList
            items={[
              "Add a table field and switch Composite Field on.",
              <>
                Define the sub-fields that make up the cell — for example{" "}
                <InlineCode>size</InlineCode> as text and <InlineCode>quantity</InlineCode> as a
                number.
              </>,
              "Add example values showing how the grouping appears in your documents.",
            ]}
          />
          <p>
            Sub-fields hold single values, so they can be text, number, date or mixed — but not
            images. Composite fields are only available on table fields, because the whole point is
            unpacking a repeating cell.
          </p>
          <InfoBox color="blue" icon={<Boxes size={20} />} title="Multi-value metadata fields">
            The metadata equivalent is <strong>Accept multiple values</strong>. Turn it on when a
            single document can legitimately carry several of the same thing — a set of receipt
            numbers, several purchase-order references — and the field returns a list instead of one
            value.
          </InfoBox>
        </DocCard>

        <DocCard icon={<ImageIcon size={24} />} title="Extracting images">
          <Lead>
            An image-typed field pulls a figure out of the document rather than text: a product
            photo, a signature, a stamp, a logo. A metadata image field holds one image per
            document; a table image field gives each row the image belonging to it.
          </Lead>
          <BulletList
            items={[
              "Images are stored privately, so they arrive downstream as time-limited links rather than raw bytes",
              "The same link appears in the webhook payload, the email output and the CSV cell",
              "Download promptly rather than storing the link — it expires",
              "Image fields cannot be composite, and example-value hints do not apply to them",
            ]}
          />
        </DocCard>

        <DocCard icon={<FilePlus size={24} />} title="Build the schema">
          <Lead>
            Build metadata fields first, then table fields, then hints. Test against a real document
            early — a schema that looks right on paper and a schema that survives your actual
            paperwork are different things.
          </Lead>
          <NumberedList
            items={[
              <>
                Create the flow. Give it a name that describes the document (
                <em>Supplier invoices</em>) and a real description — it improves extraction accuracy
                and is what a <DocLink href="/docs/collections">Collection</DocLink> matches on
                later.
              </>,
              <>
                Add a <strong>metadata field</strong> for each value that appears once per document,
                setting the data type as you go.
              </>,
              <>
                Add a <strong>table field</strong> for each column of the repeating line-item table.
              </>,
              <>
                Add <strong>extraction hints</strong> only to the fields that need them.
              </>,
              <>
                Switch the flow to <strong>Active</strong>, process one real document, and compare
                the result against the source.
              </>,
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Let field discovery do the first draft">
            Uploading a sample document during setup gets you a suggested set of fields to edit,
            which is faster and usually more complete than typing them from memory. Treat it as a
            starting point — delete what you will not use, because every extra field is more to
            review and more that can go wrong.
          </InfoBox>
          <WarningBox>
            Renaming a field changes the key in every downstream consumer: the webhook payload, the
            Bucket column mapping, the CSV header and any{" "}
            <DocLink href="/docs/cleaners">Cleaner</DocLink> that reads it. Check what is attached
            before renaming a field on a flow that is already running.
          </WarningBox>
        </DocCard>

        <DocCard icon={<Braces size={24} />} title="What you can attach to a flow">
          <Lead>
            The schema decides what comes out; the rest of the flow decides what happens to it. Each
            item below is independent — attach only what you need, in any order, at any time.
          </Lead>
          <DataTable
            head={["Stage", "Attachment", "What it does"]}
            rows={[
              [
                "Inputs",
                <>
                  <DocLink href="/docs/email-integration">Email Trigger</DocLink>
                </>,
                "Gives the flow its own inbox address so forwarded attachments are processed automatically.",
              ],
              [
                "Inputs",
                <>
                  <DocLink href="/docs/collections">Collections</DocLink>
                </>,
                "Lists the Collections that can route documents to this flow.",
              ],
              [
                "Processing",
                <>
                  <DocLink href="/docs/cleaners">Cleaner</DocLink>
                </>,
                "Sweeps every run's rows: reformat, convert, compute, look up, and fire rules.",
              ],
              [
                "Processing",
                <>
                  <DocLink href="/docs/agents">Agent</DocLink>
                </>,
                "Runs after extraction, using extracted fields as its inputs.",
              ],
              [
                "Processing",
                "Form Templates",
                "Fills a PDF template from the extracted values.",
              ],
              [
                "Outputs",
                <>
                  <DocLink href="/docs/email-integration">Email Output</DocLink>
                </>,
                "Emails results to one or more addresses when a run completes.",
              ],
              [
                "Outputs",
                <>
                  <DocLink href="/docs/webhooks">Webhook</DocLink>
                </>,
                "POSTs results to your endpoint. HTTPS only.",
              ],
              [
                "Outputs",
                <>
                  <DocLink href="/docs/buckets">Bucket Export</DocLink>
                </>,
                "Appends each run's rows to a structured table, with fields mapped onto columns.",
              ],
              [
                "Settings",
                <>
                  <DocLink href="/docs/human-in-the-loop">Human in the Loop</DocLink>
                </>,
                "Pauses runs for a named reviewer before anything is delivered.",
              ],
              [
                "Settings",
                "Flow ID",
                <>
                  The identifier you pass when calling the{" "}
                  <DocLink href="/docs/api-integration">API</DocLink>.
                </>,
              ],
            ]}
          />
        </DocCard>

        <DocCard icon={<Play size={24} />} title="What happens when a run executes">
          <Lead>
            Every document becomes a run, and every run moves through the same sequence. Knowing the
            order tells you where to look when something arrives late, arrives wrong, or does not
            arrive at all.
          </Lead>
          <NumberedList
            items={[
              "The document is stored and the run is queued.",
              "Extraction reads it and produces metadata values and table rows, charged at one credit per page.",
              "If a Cleaner is attached, it sweeps those rows — conversions, computed columns, lookups.",
              "Conditional rules fire: rows can be dropped, notifications sent, review requested.",
              "If review is required, the run pauses and nothing is delivered until a reviewer approves.",
              "Outputs run in order: email, webhook, Bucket export, form fill, then any chained agent.",
            ]}
          />
          <DataTable
            head={["Run status", "Meaning"]}
            rows={[
              ["Queued", "Stored and waiting for a worker."],
              ["Processing / running", "Being extracted, or resuming after an approval."],
              [
                "Awaiting review",
                <>
                  Paused for <DocLink href="/docs/human-in-the-loop">human review</DocLink>. Nothing
                  has been delivered yet.
                </>,
              ],
              ["Completed", "Extraction finished and every configured output has run."],
              ["Cancelled", "A reviewer rejected the run, so nothing was delivered."],
              ["Failed", "The document could not be processed. The run's log says why."],
            ]}
          />
          <p>
            Everything a run did is recorded in its log, including which outputs fired and what each
            one returned. That log is the first place to look before assuming a delivery problem is
            on your side.
          </p>
        </DocCard>

        <DocCard icon={<LifeBuoy size={24} />} title="Improving extraction quality">
          <Lead>
            When a field comes back wrong, the fix is nearly always in that field&apos;s definition
            rather than in the document. Work through these in order — the first two solve most
            cases.
          </Lead>
          <DataTable
            head={["Symptom", "Likely cause", "Fix"]}
            rows={[
              [
                "The wrong one of several similar values",
                "Nothing distinguishes them.",
                "Add the label the value sits next to, or the page area it appears in.",
              ],
              [
                "A field comes back empty",
                "The field name alone did not identify it.",
                "Add two or three real example values — usually enough on its own.",
              ],
              [
                "Only one line item, when there are many",
                "It was defined as a metadata field.",
                "Redefine it as a table field.",
              ],
              [
                "The same value repeated on every row",
                "A document-level value was defined as a table field.",
                "Redefine it as a metadata field.",
              ],
              [
                "Numbers off by a factor of a hundred",
                "Decimal and thousands separators read the wrong way round.",
                "Set an expected range, and normalise the format in a Cleaner.",
              ],
              [
                "Leading zeros or letters dropped",
                "The field is typed as Number.",
                "Change it to Mixed / alphanumeric.",
              ],
              [
                "Columns confused with each other",
                "Two columns have similar headers.",
                "Add the printed column header, and the field meaning.",
              ],
              [
                "Good on some vendors, poor on others",
                "The hints describe one vendor's layout.",
                "Add the other vendors' label and header variants to the same field.",
              ],
            ]}
          />
          <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Change one thing at a time">
            Re-run the same document after each change. Editing four hints at once and re-running
            tells you the result improved but not which change did it — and one of the four may have
            made things worse.
          </InfoBox>
        </DocCard>

        <Related
          links={[
            {
              href: "/docs/cleaners",
              label: "Normalise and enrich what a flow extracts",
              description:
                "Reformat dates, convert currencies, compute totals and flag rows that break a rule.",
            },
            {
              href: "/docs/collections",
              label: "Route documents to the right flow automatically",
              description:
                "Why a flow's name and description matter beyond extraction accuracy.",
            },
            {
              href: "/docs/api-integration",
              label: "Trigger a flow from your own code",
              description:
                "The Flow ID, API-key auth, and Python and JavaScript examples.",
            },
            {
              href: "/docs/webhooks",
              label: "See the payload a flow produces",
              description:
                "How metadata fields and table fields appear in the JSON your endpoint receives.",
            },
          ]}
        />
      </section>
    </>
  );
}
