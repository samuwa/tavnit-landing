import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  Clock,
  Coins,
  Compass,
  FilePlus,
  Info,
  Map,
  Sparkles,
  Table2,
} from "lucide-react";
import {
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
    "Create a Tavnit flow that defines the fields you want, upload a document, and get structured rows back — no templates and no code.",
  steps: [
    {
      name: "Create a flow",
      text: "On the Flows page, create a new flow and give it a name that describes the document type it will handle.",
    },
    {
      name: "Define the fields",
      text: "Upload a sample document so Tavnit can suggest fields, then add, rename or remove them until the schema matches what you actually need.",
    },
    {
      name: "Activate the flow",
      text: "Switch the flow to Active so it can accept documents.",
    },
    {
      name: "Process a document",
      text: "Upload a document in the app, email it to the flow's address, or post it to the API. A run appears on the Runs page.",
    },
    {
      name: "Read the result",
      text: "Open the run to see the extracted metadata fields and table rows next to the source document.",
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
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Getting Started
        </h1>

        <DocCard icon={<Sparkles size={24} />} title="What Tavnit does">
          <Lead>
            Tavnit reads documents and gives you structured data back. You describe the fields you
            want once, send it invoices, receipts, purchase orders or forms, and get typed rows out —
            without building a template per layout or writing any parsing code.
          </Lead>
          <p>
            Extraction is the starting point rather than the whole product. Once the data exists, it
            can be normalised, checked by a person, stored, delivered to your systems, or handed to
            an agent that acts on it. The rest of these docs cover those stages; this page covers the
            first one.
          </p>
        </DocCard>

        <DocCard icon={<Compass size={24} />} title="The vocabulary">
          <Lead>
            Six words cover almost everything in Tavnit. Learn what each one owns and the rest of the
            documentation reads much faster — most confusion comes from mixing up flows, Collections
            and Splitters, which do three different jobs.
          </Lead>
          <DataTable
            head={["Term", "What it is", "Read more"]}
            rows={[
              [
                "Flow",
                "The schema for one document type: the fields you want extracted, plus the rules and outputs attached to it. Everything starts here.",
                <>
                  <DocLink href="/docs/flows">Flows</DocLink>
                </>,
              ],
              [
                "Run",
                "One document processed by one flow. Runs hold the extracted result and the log of what happened.",
                "This page",
              ],
              [
                "Collection",
                "Groups several flows so incoming documents of unknown type are classified and routed to the right one.",
                <>
                  <DocLink href="/docs/collections">Collections</DocLink>
                </>,
              ],
              [
                "Splitter",
                "Breaks one file that holds several documents into separate parts, then sends each part onward.",
                <>
                  <DocLink href="/docs/splitters">Splitters</DocLink>
                </>,
              ],
              [
                "Cleaner",
                "Rules applied to extracted rows: reformat, convert, compute, look up, and trigger actions when something looks wrong.",
                <>
                  <DocLink href="/docs/cleaners">Cleaners</DocLink>
                </>,
              ],
              [
                "Bucket",
                "A structured table where results accumulate across runs, queryable and chartable inside Tavnit.",
                <>
                  <DocLink href="/docs/buckets">Buckets</DocLink>
                </>,
              ],
            ]}
          />
          <InfoBox color="violet" icon={<Info size={20} />} title="Which one sorts my documents?">
            If each file holds one document but you do not know its type, use a{" "}
            <DocLink href="/docs/collections">Collection</DocLink>. If one file holds several
            documents, use a <DocLink href="/docs/splitters">Splitter</DocLink>. If you already know
            what the document is, send it straight to the flow and skip both.
          </InfoBox>
        </DocCard>

        <DocCard icon={<FilePlus size={24} />} title="Step 1: create a flow">
          <Lead>
            A flow is the schema for one document type. Name it after the document rather than the
            project — <em>Supplier invoices</em>, not <em>Q1 automation</em> — because that name and
            description are what a Collection later uses to route documents to it.
          </Lead>
          <NumberedList
            items={[
              <>
                On the <strong>Flows</strong> page, create a new flow and name it.
              </>,
              <>
                Upload a sample document. Tavnit suggests the fields it can see, which is faster than
                typing them from scratch.
              </>,
              <>Add, rename or delete fields until the schema is exactly what you need.</>,
              <>
                Switch the flow to <strong>Active</strong>.
              </>,
              <>Send one document through and check the result.</>,
            ]}
          />
          <p>
            <DocLink href="/docs/flows">Flows</DocLink> walks through each of these steps properly —
            field kinds, data types and the hints that tell the AI where to look.
          </p>
          <InfoBox color="blue" icon={<Info size={20} />} title="Write a description too">
            The description is optional for extraction but load-bearing for routing. A flow with a
            clear description can be dropped into a{" "}
            <DocLink href="/docs/collections">Collection</DocLink> later; one called{" "}
            <em>Flow 3</em> with no description cannot be routed to reliably.
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
            Each field also has a type — text, number, date, mixed or image — and getting it right
            matters more than it looks: a total typed as text will not sum, compare or chart.{" "}
            <DocLink href="/docs/flows">Flows</DocLink> covers the full schema in depth, including
            extraction hints, composite fields and how to fix a field that comes back wrong.
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
              ["Upload in the app", "Testing, and one-off documents", "Nothing"],
              [
                <>
                  <DocLink href="/docs/email-integration">Email</DocLink>
                </>,
                "Documents that already arrive in an inbox",
                "Enable the trigger, forward mail to the address",
              ],
              [
                <>
                  <DocLink href="/docs/api-integration">REST API</DocLink>
                </>,
                "Your own systems, and high volume",
                "An API key and a POST",
              ],
              [
                <>
                  <DocLink href="/docs/mcp-connector">MCP connector</DocLink>
                </>,
                "Ad-hoc work from an AI assistant",
                "Generate a connector URL",
              ],
            ]}
          />
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
            Tavnit bills in credits. Extraction is charged per page, so a ten-page PDF costs ten
            credits whether it produces one row or two hundred. The other operations have their own
            rates.
          </Lead>
          <DataTable
            head={["Operation", "Cost"]}
            rows={[
              ["Extracting a document", "1 credit per page"],
              [
                <>
                  <DocLink href="/docs/collections">Collection</DocLink> routing
                </>,
                "1 credit per document, charged whether or not a match is found",
              ],
              [
                <>
                  <DocLink href="/docs/splitters">Splitting</DocLink> a bundle
                </>,
                "1 credit per page of the source file",
              ],
              [
                <>
                  <DocLink href="/docs/cleaners">Cleaning</DocLink> a sweep
                </>,
                "1 credit per 500 non-empty cells, rounded up",
              ],
              [
                <>
                  <DocLink href="/docs/agents">Agent</DocLink> runtime
                </>,
                "3 credits per minute of browser time, rounded up, charged even if the run fails",
              ],
            ]}
          />
          <InfoBox color="yellow" icon={<Info size={20} />} title="Chained steps stack">
            A document that is split, routed by a Collection and then extracted pays for all three.
            That is usually still worth it, but it is why sending a document straight to the flow —
            when you already know its type — is the cheaper habit.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Map size={24} />} title="Where to go next">
          <Lead>
            Once extraction works, the next step depends on what is wrong with the data or what you
            need to do with it. These are the three most common directions.
          </Lead>
          <DataTable
            head={["If you need to…", "Read"]}
            rows={[
              [
                "Extract more fields, or fix one that comes back wrong",
                <>
                  <DocLink href="/docs/flows">Flows</DocLink>
                </>,
              ],
              [
                "Fix formats, convert currencies, compute totals, or flag bad rows",
                <>
                  <DocLink href="/docs/cleaners">Cleaners</DocLink>
                </>,
              ],
              [
                "Have a person check results before they go anywhere",
                <>
                  <DocLink href="/docs/human-in-the-loop">Human in the Loop</DocLink>
                </>,
              ],
              [
                "Get the data into your own systems",
                <>
                  <DocLink href="/docs/webhooks">Webhooks</DocLink> or the{" "}
                  <DocLink href="/docs/api-integration">REST API</DocLink>
                </>,
              ],
              [
                "Keep results together and query them",
                <>
                  <DocLink href="/docs/buckets">Buckets</DocLink>
                </>,
              ],
              [
                "Act on the data somewhere else on the web",
                <>
                  <DocLink href="/docs/agents">Agents</DocLink>
                </>,
              ],
              [
                "Control who can see and change what",
                <>
                  <DocLink href="/docs/user-roles">User roles</DocLink>
                </>,
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
                "Field kinds, data types, extraction hints, composite fields, and everything you can attach to a flow.",
            },
            {
              href: "/docs/api-integration",
              label: "Process documents with the Tavnit REST API",
              description:
                "Multipart and base64 upload, API-key auth, Python and JavaScript examples, plus no-code recipes.",
            },
            {
              href: "/docs/cleaners",
              label: "Clean and enrich extracted data",
              description:
                "The field types that reformat, convert, compute and validate what a flow extracted.",
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
