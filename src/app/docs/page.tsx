import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  Clock,
  Coins,
  Compass,
  FilePlus,
  FlaskConical,
  Info,
  Map,
  Rocket,
  Sparkles,
  Table2,
} from "lucide-react";
import {
  BulletList,
  DataTable,
  DocCard,
  DocLink,
  InfoBox,
  Lead,
  NumberedList,
  Related,
  Screenshot,
} from "@/components/docs/ui";

export const metadata = docMetadata("getting-started");

/** Mirrors the visible numbered steps under "Step 1: create a flow". */
const HOW_TO = {
  name: "Extract structured data from a document with Tavnit",
  description:
    "Create a Tavnit flow from a template, from a sample document or from scratch, check its fields, process a document and read the structured result — no templates to draw and no code.",
  steps: [
    {
      name: "Open the create dialog",
      text: "On the Flows page, click Create Flow.",
    },
    {
      name: "Pick a starting point",
      text: "Choose From a template (a Tavnit template or a copy of one of your flows), AI suggestion (upload a sample PDF or image and the AI drafts the fields), or Start from scratch.",
    },
    {
      name: "Name and describe the flow",
      text: "Give the flow a name of at least 3 characters and a description of at least 10 that says which documents it handles.",
    },
    {
      name: "Review the data schema",
      text: "In the builder, add, edit or delete fields until the schema is exactly what you need. A new flow is already Active.",
    },
    {
      name: "Process a document",
      text: "Click Run, upload one real document and check the result.",
    },
  ],
};

export default function Page() {
  return (
    <>
      <DocsPageSchema
        slug="getting-started"
        howTo={HOW_TO}
        primaryImage={{
          url: "/assets/tour2-runs.jpg",
          caption:
            "The Tavnit Runs page, listing every processed document with its flow, source and status.",
          width: 1327,
          height: 801,
        }}
      />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
          Getting Started
        </h1>

        <DocCard icon={<Sparkles size={24} />} title="What Tavnit does">
          <Lead>
            Tavnit reads documents and gives you structured data back. You describe the fields you
            want once, send it invoices, receipts, purchase orders, statements, spreadsheets or
            forms, and get typed rows out — without building a template per layout or writing any
            parsing code.
          </Lead>
          <p>
            Extraction is the starting point rather than the whole product. Around it, Tavnit can
            sort and split incoming files, clean and enrich the rows, compare and check documents
            against each other, fill forms, pause for a person to review, store results in tables,
            deliver them to your systems, and hand them to a browser agent that acts on them. This
            page gives you the map and walks you through your first document.
          </p>
          <InfoBox color="violet" icon={<FlaskConical size={20} />} title="Some areas are in Beta">
            Pipelines, Subjects, Matchers, Inspectors, Fillers, Signals and Nets carry a{" "}
            <strong>Beta</strong> label in the app. You can use them today, but their screens and
            options may still change.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Compass size={24} />} title="A map of Tavnit">
          <Lead>
            The app&apos;s sidebar groups every area by the job it does, from getting documents in to
            acting on the data. The docs follow the same groups, so this table doubles as a table of
            contents.
          </Lead>
          <DataTable
            head={["Group", "Area", "What it does"]}
            rows={[
              [
                "Input",
                <Fragment key="m0">
                  <DocLink href="/docs/collections">Collections</DocLink>
                </Fragment>,
                "One inbox or endpoint for mixed documents: each one is classified and routed to the right flow.",
              ],
              [
                "Input",
                <Fragment key="m1">
                  <DocLink href="/docs/subjects">Subjects</DocLink>
                </Fragment>,
                "Model an entity such as a purchase or a patient, and gather its documents into cases by reference.",
              ],
              [
                "Input",
                <Fragment key="m2">
                  <DocLink href="/docs/splitters">Splitters</DocLink>
                </Fragment>,
                "Cut one file that holds several documents into separate documents and send each one onward.",
              ],
              [
                "Processing",
                <Fragment key="m3">
                  <DocLink href="/docs/flows">Flows</DocLink>
                </Fragment>,
                "The schema for one document type: the fields to extract and everything attached to them. Everything starts here.",
              ],
              [
                "Processing",
                <Fragment key="m4">
                  <DocLink href="/docs/cleaners">Cleaners</DocLink>
                </Fragment>,
                "Reformat, convert, compute, look up and validate extracted rows, and trigger actions when something looks wrong.",
              ],
              [
                "Processing",
                <Fragment key="m5">
                  <DocLink href="/docs/agents">Agents</DocLink>
                </Fragment>,
                "Browser agents that carry out a plain-language mission on a website, often using extracted data as input.",
              ],
              [
                "Intelligence",
                <Fragment key="m6">
                  <DocLink href="/docs/matchers">Matchers</DocLink>
                </Fragment>,
                "Compare records line by line across documents — quotes against each other, an invoice against its order.",
              ],
              [
                "Intelligence",
                <Fragment key="m7">
                  <DocLink href="/docs/inspectors">Inspectors</DocLink>
                </Fragment>,
                "Run a checklist over a set of related documents and get a pass or fail verdict.",
              ],
              [
                "Intelligence",
                <Fragment key="m8">
                  <DocLink href="/docs/fillers">Fillers</DocLink>
                </Fragment>,
                "Fill PDF form templates with data extracted from your documents.",
              ],
              [
                "Orchestration",
                <Fragment key="m9">
                  <DocLink href="/docs/pipelines">Pipelines</DocLink>
                </Fragment>,
                "Chain steps end to end on a visual canvas.",
              ],
              [
                "Orchestration",
                <Fragment key="m10">
                  <DocLink href="/docs/pipeline-map">Pipeline Map</DocLink>
                </Fragment>,
                "One picture of how documents move through your organization.",
              ],
              [
                "Data & activity",
                <Fragment key="m11">
                  <DocLink href="/docs/buckets">Buckets</DocLink>
                </Fragment>,
                "Tables where results accumulate across runs, ready to query, chart and export.",
              ],
              [
                "Data & activity",
                <Fragment key="m12">
                  <DocLink href="/docs/flows#runs">Runs</DocLink>
                </Fragment>,
                "The history of every processed document, with its result, source file and log.",
              ],
              [
                "Data & activity",
                <Fragment key="m13">
                  <DocLink href="/docs/human-in-the-loop">Human in the Loop</DocLink>
                </Fragment>,
                "A review queue where a person approves, edits or rejects results before they are delivered.",
              ],
              [
                "Audio",
                <Fragment key="m14">
                  <DocLink href="/docs/signals">Signals</DocLink>
                </Fragment>,
                "Turn recorded conversations into structured rows.",
              ],
              [
                "Social",
                <Fragment key="m15">
                  <DocLink href="/docs/nets">Nets</DocLink>
                </Fragment>,
                "Turn social media posts into structured rows and trends.",
              ],
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Not seeing Agents, Signals or Nets?">
            These three areas are switched on per organization. If they are missing from your
            sidebar, contact the Tavnit team to have them enabled.
          </InfoBox>
          <InfoBox color="violet" icon={<Info size={20} />} title="Which one sorts my documents?">
            If each file holds one document but you do not know its type, use a{" "}
            <DocLink href="/docs/collections">Collection</DocLink>. If one file holds several
            documents, use a <DocLink href="/docs/splitters">Splitter</DocLink>. If documents belong
            together — the same purchase, the same patient — use a{" "}
            <DocLink href="/docs/subjects">Subject</DocLink>. If you already know what the document
            is, send it straight to the flow and skip all three.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Rocket size={24} />} title="Your first minutes">
          <Lead>
            A new organization starts with a short setup path, so you rarely face an empty screen.
          </Lead>
          <BulletList
            items={[
              <Fragment key="o0">
                <strong>Welcome questions.</strong> After you create your organization, Tavnit asks
                four quick questions: what documents you will process, what you want to accomplish,
                how your documents arrive today and roughly how many you handle a month. They take
                about 30 seconds, and you can <strong>Skip</strong> them.
              </Fragment>,
              <Fragment key="o1">
                <strong>One-click starter flows.</strong> If you answered, the empty Flows page
                offers the templates that match your documents under{" "}
                <em>“Based on your answers, we can set these up for you”</em>. Click{" "}
                <strong>Create these flows</strong> and they are created for you, ready to edit.
              </Fragment>,
              <Fragment key="o2">
                <strong>Starter templates.</strong> Tavnit ships ready-made flows for invoices,
                purchase orders, receipts, bank statements, delivery notes, lab results, contracts,
                quotes, credit notes, ID documents and resumes. Templates that match your answers
                are shown first.
              </Fragment>,
              <Fragment key="o3">
                <strong>The getting-started guide.</strong> A small panel in the corner of the app
                with three tabs: <strong>Checklist</strong> (setup steps that tick themselves off as
                you complete them), <strong>This screen</strong> (tips for the page you are on) and{" "}
                <strong>Features</strong> (every area available to you). If you hide it, reopen it
                from the <strong>Help &amp; Support</strong> menu.
              </Fragment>,
            ]}
          />
        </DocCard>

        <DocCard icon={<FilePlus size={24} />} title="Step 1: create a flow">
          <Lead>
            A flow is the schema for one document type. Name it after the document rather than the
            project — <em>Supplier invoices</em>, not <em>Q1 automation</em> — because the name and
            description are also what a Collection uses to route documents to it.
          </Lead>
          <NumberedList
            items={[
              <Fragment key="f5">
                On the <strong>Flows</strong> page, click <strong>Create Flow</strong>.
              </Fragment>,
              <Fragment key="f6">
                Pick a starting point: <strong>From a template</strong> (a Tavnit template, or a copy
                of one of your own flows under <strong>My flows</strong>),{" "}
                <strong>AI suggestion</strong> (upload a sample PDF or image and the AI drafts the
                fields), or <strong>Start from scratch</strong>.
              </Fragment>,
              <Fragment key="f7">
                Give the flow a name of at least 3 characters and a description of at least 10 that
                says which documents it handles.
              </Fragment>,
              <Fragment key="f8">
                In the builder, add, edit or delete fields until the schema is exactly what you
                need. A new flow is already <strong>Active</strong>.
              </Fragment>,
              <Fragment key="f9">
                Click <strong>Run</strong>, upload one real document and check the result.
              </Fragment>,
            ]}
          />
          <p>
            <DocLink href="/docs/flows">Flows</DocLink> covers each of these steps in depth — field
            kinds, data types, the hints that tell the AI where to look, and the{" "}
            <strong>Diagnose</strong> button that proposes fixes once a flow has real runs.
          </p>
          <InfoBox color="blue" icon={<Info size={20} />} title="The description matters">
            The description is required, and it earns its place twice: it helps the AI extract more
            accurately, and it is what lets a{" "}
            <DocLink href="/docs/collections">Collection</DocLink> route documents to the flow. A
            vague description makes both worse.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Table2 size={24} />} title="Step 2: metadata fields and table fields">
          <Lead>
            Tavnit distinguishes values that appear once per document from values that repeat. That
            single distinction decides the shape of everything downstream — your webhook payload,
            your Bucket rows and your CSV all follow it.
          </Lead>
          <DataTable
            head={["Field kind", "Appears", "On an invoice"]}
            rows={[
              [
                "Metadata field",
                "Once per document",
                "Invoice number, issue date, supplier, total",
              ],
              [
                "Table field",
                "Once per line item",
                "Description, quantity, unit price, amount",
              ],
            ]}
          />
          <p>
            Each field also has a data type — Text, Number, Date, Mixed/Alphanumeric or Image — and
            getting it right matters more than it looks: a total typed as text will not sum, compare
            or chart. A flow with only metadata fields returns a single row per document.{" "}
            <DocLink href="/docs/flows">Flows</DocLink> covers the full schema, including extraction
            hints, composite fields and how to fix a field that comes back wrong.
          </p>
        </DocCard>

        <DocCard icon={<Clock size={24} />} title="Step 3: send documents in">
          <Lead>
            Four ways in, all producing the same kind of run. Start with a manual upload to prove the
            flow works, then switch to whichever route matches how documents actually reach you.
          </Lead>
          <DataTable
            head={["Route", "Good for", "Setup"]}
            rows={[
              [
                "Upload in the app",
                "Testing, and one-off documents",
                "Nothing. Select several files at once and each becomes its own run",
              ],
              [
                <Fragment key="f10">
                  <DocLink href="/docs/email-integration">Email</DocLink>
                </Fragment>,
                "Documents that already arrive in an inbox",
                "Turn on the flow's Email Trigger and forward mail to its address",
              ],
              [
                <Fragment key="f11">
                  <DocLink href="/docs/api-integration">REST API</DocLink>
                </Fragment>,
                "Your own systems, and high volume",
                "An API key and a POST",
              ],
              [
                <Fragment key="f12">
                  <DocLink href="/docs/mcp-connector">MCP connector</DocLink>
                </Fragment>,
                "Ad-hoc work from an AI assistant",
                "Enabled per organization on request, then a connector URL from Integrations",
              ],
            ]}
          />
          <p>
            Flows accept PDFs, images (PNG, JPG, JPEG and JFIF) and spreadsheets (XLSX, XLS and CSV).
            For a spreadsheet, the flow reads the first visible sheet. Scanned documents are detected
            and read with OCR automatically.
          </p>
          <Screenshot
            src="/assets/tour2-runs.jpg"
            alt="The Tavnit Runs page listing processed documents, each with its flow, who triggered it, its source and its status, above summary tiles for completed runs, running runs, credits used and total runs."
            caption="Every document becomes a run. The Runs page shows what was processed, how it arrived, and how it ended."
          />
          <p>
            Open any run to see the extracted fields beside the source document, plus the log of what
            happened during processing. That log is the first place to look when a result is not what
            you expected.
          </p>
        </DocCard>

        <DocCard icon={<Coins size={24} />} title="What things cost">
          <Lead>
            Tavnit bills in credits from one balance per organization. Extraction is charged per
            page, so a ten-page PDF costs ten credits whether it produces one row or two hundred.
            Every other feature has its own rate.
          </Lead>
          <BulletList
            items={[
              "Extraction: 1 credit per page. A spreadsheet is charged by its page equivalent.",
              "Routing, splitting, cleaning, agents, matching and the other features each have their own rate, listed on the Credits page.",
              "Steps stack: a document that is split, routed and then extracted pays for all three, so sending a document straight to its flow is the cheaper habit when you know its type.",
              "Drafting a flow with AI suggestion and running Diagnose on a flow are free.",
              "A run needs a positive credit balance to start. Credits already used are not refunded when a run is cancelled or fails.",
            ]}
          />
          <p>
            See <DocLink href="/docs/credits">Credits &amp; Billing</DocLink> for the full price
            list. To add credits to your organization, contact the Tavnit team.
          </p>
        </DocCard>

        <DocCard icon={<Map size={24} />} title="Where to go next">
          <Lead>
            Once extraction works, the next step depends on what is wrong with the data or what you
            need to do with it.
          </Lead>
          <DataTable
            head={["If you need to…", "Read"]}
            rows={[
              [
                "Extract more fields, or fix one that comes back wrong",
                <Fragment key="f17">
                  <DocLink href="/docs/flows">Flows</DocLink>
                </Fragment>,
              ],
              [
                "Fix formats, convert currencies, compute totals, or flag bad rows",
                <Fragment key="f18">
                  <DocLink href="/docs/cleaners">Cleaners</DocLink>
                </Fragment>,
              ],
              [
                "Have a person check results before they go anywhere",
                <Fragment key="f19">
                  <DocLink href="/docs/human-in-the-loop">Human in the Loop</DocLink>
                </Fragment>,
              ],
              [
                "Get the data into your own systems",
                <Fragment key="f20">
                  <DocLink href="/docs/webhooks">Webhooks</DocLink> or the{" "}
                  <DocLink href="/docs/api-integration">REST API</DocLink>
                </Fragment>,
              ],
              [
                "Keep results together and query them",
                <Fragment key="f21">
                  <DocLink href="/docs/buckets">Buckets</DocLink>
                </Fragment>,
              ],
              [
                "Compare documents, or check them against a list of rules",
                <Fragment key="f24">
                  <DocLink href="/docs/matchers">Matchers</DocLink> and{" "}
                  <DocLink href="/docs/inspectors">Inspectors</DocLink>
                </Fragment>,
              ],
              [
                "Connect several steps into one process",
                <Fragment key="f25">
                  <DocLink href="/docs/pipelines">Pipelines</DocLink>
                </Fragment>,
              ],
              [
                "Act on the data somewhere else on the web",
                <Fragment key="f22">
                  <DocLink href="/docs/agents">Agents</DocLink>
                </Fragment>,
              ],
              [
                "Control who can see and change what",
                <Fragment key="f23">
                  <DocLink href="/docs/user-roles">User roles</DocLink>
                </Fragment>,
              ],
            ]}
          />
        </DocCard>

        <Related
          links={[
            {
              href: "/docs/flows",
              label: "Build a flow's data schema in depth",
              description:
                "Field kinds, data types, extraction hints, composite fields, runs and everything you can attach to a flow.",
            },
            {
              href: "/docs/credits",
              label: "See what each feature costs",
              description: "Credit rates for every step, and when you are charged.",
            },
            {
              href: "/docs/api-integration",
              label: "Process documents with the Tavnit REST API",
              description:
                "Multipart and base64 upload, API-key auth, Python and JavaScript examples, plus no-code recipes.",
            },
            {
              href: "/docs/email-integration",
              label: "Extract from email attachments",
              description: "Give a flow its own inbox and forward documents to it.",
            },
            {
              href: "/docs/pipeline-map",
              label: "See how everything connects",
              description:
                "A live map of your flows, Collections, Splitters, Cleaners and Buckets.",
            },
          ]}
        />
      </section>
    </>
  );
}
