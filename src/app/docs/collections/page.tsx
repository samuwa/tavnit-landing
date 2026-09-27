import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  AlertTriangle,
  ArrowLeftRight,
  Code,
  Coins,
  Eye,
  FilePlus,
  FolderInput,
  HelpCircle,
  Info,
  Mail,
  PenLine,
  ShieldCheck,
  Split,
  Workflow,
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

export const metadata = docMetadata("collections");

/** Mirrors the visible numbered steps under "Create a Collection". */
const HOW_TO = {
  name: "Route mixed documents automatically with a Tavnit Collection",
  description:
    "Group several extraction flows (and optionally Splitters) into a Collection so Tavnit classifies each incoming document and sends it to the right destination, with a default flow for anything it cannot place.",
  steps: [
    {
      name: "Create the Collection",
      text: "Open Collections in the Tavnit app, click Create Collection and give it a name (and optionally a description) that describes where the documents come from.",
    },
    {
      name: "Select the flows",
      text: "Tick every active flow that should be a possible destination. At least one is needed, and each flow needs a clear name and description, because that is what the routing decision is made against.",
    },
    {
      name: "Add Splitters (optional)",
      text: "Tick any Splitter that should receive files bundling several documents, so they are split apart and each part is routed on its own.",
    },
    {
      name: "Choose the Default Behavior",
      text: "Decide what happens when a document matches nothing clearly: Cancel the run, or Send to a default flow picked from the Collection's flows.",
    },
    {
      name: "Turn on the Email Trigger (optional)",
      text: "Enable the Email Trigger if documents will arrive by email. The inbox address is generated once the Collection is created.",
    },
    {
      name: "Send documents and check the results",
      text: "Upload documents with Run, email them, or post them to the API, then check Recent Runs to see where each one went and sharpen any flow description that produced a wrong decision.",
    },
  ],
};

export default function Page() {
  return (
    <>
      <DocsPageSchema
          slug="collections"
          howTo={HOW_TO}
          primaryImage={{
            url: "/assets/docs-collection-runs-2026-08.jpg",
            caption:
              "The Recent Runs tab of a Tavnit Collection, showing each document's routing outcome.",
            width: 1327,
            height: 801,
          }}
        />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
          Collections
        </h1>

        <DocCard icon={<FolderInput size={24} />} title="What a Collection does">
          <Lead>
            A Collection groups several flows (and, optionally, Splitters) behind one entry point.
            When a document arrives, Tavnit looks at its first page, compares what it sees against
            the names and descriptions of the destinations in the Collection, and forwards the
            document to the one that matches, so you can hand out a single address for documents you
            cannot sort in advance.
          </Lead>
          <p>
            The routing decision is made from the document itself: headers, titles, logos, layout,
            and identifying text such as company names and form numbers. It is a classification step,
            not an extraction step. Once a destination is chosen, the document is processed by that
            flow exactly as if you had sent it there directly.
          </p>
        </DocCard>

        <DocCard icon={<ArrowLeftRight size={24} />} title="Collection or direct flow?">
          <Lead>
            Send documents straight to a flow when you already know what they are. Use a Collection
            when the sender is one channel but the contents vary, and deciding which flow applies
            would otherwise be somebody&apos;s manual job.
          </Lead>
          <DataTable
            head={["Situation", "Send to"]}
            rows={[
              ["One supplier, one document type, always the same layout", "The flow directly"],
              ["A vendor portal that emits invoices, POs and receipts", "A Collection"],
              ["A shared inbox where anything might arrive", "A Collection"],
              ["An API caller that already knows the document type", "The flow directly"],
              ["A PDF that bundles several documents together", "A Splitter, or a Collection containing one"],
            ]}
          />
          <p>
            Routing costs a credit per document, so it is not free to route something you could have
            addressed directly. Where the caller knows the type, tell the flow.
          </p>
        </DocCard>

        <DocCard icon={<FilePlus size={24} />} title="Create a Collection">
          <Lead>
            A Collection is a name, a list of destinations, and a default behavior. The work is in the
            destinations: routing quality depends almost entirely on how well each flow describes
            what it handles.
          </Lead>
          <NumberedList
            items={[
              <Fragment key="f0">
                Open <strong>Collections</strong> and click <strong>Create Collection</strong>. Name
                it after where the documents come from (<em>Acme supplier portal</em>, not{" "}
                <em>Collection 2</em>) and optionally add a description.
              </Fragment>,
              <Fragment key="f1">
                Under <strong>Flows</strong>, tick every active flow that should be a possible
                destination. At least one is needed.
              </Fragment>,
              <Fragment key="f2">
                Under <strong>Splitters</strong>, optionally tick any Splitter that should receive
                files bundling several documents.
              </Fragment>,
              <Fragment key="f3">
                Under <strong>Default Behavior</strong>, choose what happens when the AI can&apos;t
                determine the right flow: <strong>Cancel the run</strong>, or{" "}
                <strong>Send to a default flow</strong> picked from the Collection&apos;s flows.
              </Fragment>,
              <Fragment key="f4">
                Optionally turn on the <strong>Email Trigger</strong>. The inbox address is
                generated once the Collection is created.
              </Fragment>,
              <Fragment key="f5">
                Send documents in (with <strong>Run</strong>, by email or through the API), then
                check <strong>Recent Runs</strong> and sharpen any description that produced a wrong
                decision.
              </Fragment>,
            ]}
          />
          <p>
            Everything can be changed later from the Collection&apos;s detail page, where the left
            rail holds <strong>Flows</strong>, <strong>Splitters</strong>,{" "}
            <strong>Recent Runs</strong>, <strong>Email Trigger</strong>,{" "}
            <strong>Fallback Flow</strong> (the Default Behavior setting) and{" "}
            <strong>Collection ID</strong>. The switch in the top bar makes the Collection active or
            inactive; inactive Collections reject new runs. Admins and Owners can create
            Collections; the creator, Admins and Owners can edit and delete them.
          </p>
        </DocCard>

        <DocCard icon={<PenLine size={24} />} title="Writing flow names and descriptions that route well">
          <Lead>
            The name and description of each destination are the only things the router compares the
            document against. A flow called <em>Flow 3</em> with no description cannot be routed to
            reliably, no matter how distinctive the document is.
          </Lead>
          <DataTable
            head={["Instead of", "Write"]}
            rows={[
              [
                <Fragment key="f2"><em>Invoices</em></Fragment>,
                <Fragment key="f3"><em>
                  Acme Corp supplier invoices — blue letterhead, &ldquo;TAX INVOICE&rdquo; in the
                  header, line items with part numbers
                </em></Fragment>,
              ],
              [
                <Fragment key="f4"><em>Shipping</em></Fragment>,
                <Fragment key="f5"><em>
                  Bill of lading from ocean carriers — container numbers, port of loading and
                  discharge
                </em></Fragment>,
              ],
              [
                <Fragment key="f6"><em>Other docs</em></Fragment>,
                <Fragment key="f7"><em>Delivery notes — no prices, signature block at the bottom</em></Fragment>,
              ],
            ]}
          />
          <BulletList
            items={[
              "Describe what is visible on page one, since that is what the router sees. For a spreadsheet, that is the top of its first visible sheet.",
              "Name the issuer when several flows handle the same document type for different suppliers.",
              "Say what a document type is not, when two of your flows are easily confused.",
              "Avoid two flows whose descriptions overlap: the router is instructed to abstain when the match is ambiguous rather than guess.",
            ]}
          />
        </DocCard>

        <DocCard icon={<Workflow size={24} />} title="What happens to each document">
          <Lead>
            Every document creates a Collection run that moves through a small set of states. Routing
            is decided once, from the first page, and the decision is recorded with a written reason.
          </Lead>
          <DataTable
            head={["Status", "Meaning"]}
            rows={[
              ["Queued", "The document is stored and waiting to be routed."],
              ["Routing", "The first page is being classified."],
              [
                "Routed",
                "A destination was chosen. The Collection run links to the flow run (or the Splitter's split) it created.",
              ],
              [
                "Cancelled",
                "No destination matched and the Default Behavior is Cancel the run, so nothing was processed. You can also cancel a run yourself while it is still routing.",
              ],
              [
                "Failed",
                "The document could not be routed at all: an unsupported or unreadable file, a Collection with no active destinations, or an empty credit balance.",
              ],
            ]}
          />
          <Screenshot
            src="/assets/docs-collection-runs-2026-08.jpg"
            alt="The Recent Runs tab of a Tavnit Collection, with status filters for Routed, Routing, Pending, Failed and Cancelled, listing two PDFs that were both routed to the Invoice Processor flow."
            caption="A Collection's Recent Runs, filtered by routing outcome. Each entry records the destination the document was sent to."
          />
          <InfoBox color="violet" icon={<Info size={20} />} title="The default flow is the safety net">
            When the router cannot find a clear match it does not guess: it abstains. With{" "}
            <strong>Send to a default flow</strong>, the document goes to that flow (marked{" "}
            <strong>Default</strong> in the Collection&apos;s flow list) and the reason records that
            it fell back. With <strong>Cancel the run</strong>, the run ends as Cancelled with the
            reason &ldquo;No clear match and no default flow configured&rdquo;, and the document is
            not processed. Pick a default flow unless you genuinely want unknown documents dropped.
          </InfoBox>
          <WarningBox>
            Routing does not produce a confidence score. Each decision is recorded as a written
            reason citing what the router saw on the page.
          </WarningBox>
        </DocCard>

        <DocCard icon={<Split size={24} />} title="Routing to a Splitter">
          <Lead>
            A Collection&apos;s destinations are not limited to flows. You can add a{" "}
            <DocLink href="/docs/splitters">Splitter</DocLink> as a destination, so a file that
            bundles several documents is split apart first and each part is routed onward, rather
            than being extracted as though it were one document.
          </Lead>
          <BulletList
            items={[
              "Splitter destinations are described to the router as splitters, so it only picks one when the file clearly bundles multiple documents.",
              "A single document is always sent to a flow, never to a splitter.",
              "Each part produced by the splitter continues through the pipeline on its own.",
            ]}
          />
          <InfoBox color="green" icon={<ShieldCheck size={20} />} title="Loops are blocked">
            A Splitter can feed a Collection and a Collection can feed a Splitter, which could form a
            cycle. A Splitter that already sends documents to this Collection appears greyed out in
            the Splitters list and cannot be added, and at run time a segment produced by a Splitter
            is never routed back into that same Splitter, so a mis-set configuration cannot spin
            documents in a circle and burn credits.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Coins size={24} />} title="What routing costs">
          <Lead>
            Routing is charged one credit per document. The credit is taken once the file has been
            accepted and before it is classified, so it is independent of the outcome: a cancelled
            run still costs its routing credit.
          </Lead>
          <DataTable
            head={["Charge", "When"]}
            rows={[
              ["1 credit", "Per document routed by a Collection: matched, sent to the default flow or cancelled."],
              [
                "The flow's own charge",
                "On top, once the document reaches a flow and is extracted. The run's credit breakdown shows Routing and Extraction separately.",
              ],
            ]}
          />
          <p>
            A file rejected before routing (unsupported type, unreadable file, no active
            destinations) is not charged. If the balance is empty when a document arrives, the
            Collection run fails before routing and nothing is processed. See{" "}
            <DocLink href="/docs/credits">credits</DocLink>.
          </p>
        </DocCard>

        <DocCard icon={<Mail size={24} />} title="Sending documents to a Collection">
          <Lead>
            A Collection accepts documents three ways: upload in the app, its own email address, or
            the API. The routing behaviour is identical whichever you use, and each run records which
            source it came from.
          </Lead>
          <DataTable
            head={["File type", "How it is routed"]}
            rows={[
              ["PDF", "From an image of the first page."],
              ["PNG, JPG, JPEG", "From the image itself."],
              [
                "XLSX, XLS, CSV",
                "From the first visible sheet, rendered as a page. A flow then extracts from that sheet; a Splitter handles one document per visible sheet.",
              ],
            ]}
          />
          <p>
            <strong>Upload in the app.</strong> Click <strong>Run</strong> in the Collection&apos;s
            top bar (it is disabled while the Collection is inactive). The{" "}
            <strong>New Collection Run</strong> dialog accepts several files at once, and each file
            becomes its own Collection run.
          </p>
          <p>
            <strong>Email.</strong> Open <strong>Email Trigger</strong>, turn it on and copy the{" "}
            <strong>Inbox Address</strong>. Each attachment becomes its own Collection run. Two
            optional settings sit under the address:
          </p>
          <BulletList
            items={[
              <Fragment key="e0">
                <strong>Allowed Senders</strong>: only these addresses can trigger a run. Leave it
                empty to accept email from any sender.
              </Fragment>,
              <Fragment key="e1">
                <strong>Process Email Body</strong>: route the message itself, not only its
                attachments. Choose <strong>Only when nothing is attached</strong> (a cover note next
                to an attached document is skipped, so one email never starts two runs) or{" "}
                <strong>Always</strong> (the body is processed alongside every attachment, each in
                its own run). The body is converted to a PDF first, so it appears in review like any
                other document; images in the message are not read.
              </Fragment>,
            ]}
          />
          <p>
            The address is distinct from any flow address. See{" "}
            <DocLink href="/docs/email-integration">email integration</DocLink> for the address
            shapes and what happens to attachments that cannot be processed.
          </p>
        </DocCard>

        <DocCard icon={<Code size={24} />} title="Collections over the API">
          <Lead>
            Copy the ID from the <strong>Collection ID</strong> panel and send documents with your
            API key. The call returns as soon as the file is stored, before routing.
          </Lead>
          <DataTable
            head={["Endpoint", "What it does"]}
            rows={[
              [
                <InlineCode key="a0">{"POST /api/collections/<collection_id>/process"}</InlineCode>,
                <Fragment key="a1">
                  Submits one document (multipart <InlineCode>file</InlineCode>, or{" "}
                  <InlineCode>file_base64</InlineCode> with <InlineCode>filename</InlineCode>).
                  Returns HTTP 202 with a <InlineCode>collection_run_id</InlineCode>. An inactive
                  Collection or one with no active destinations is rejected.
                </Fragment>,
              ],
              [
                <InlineCode key="a2">{"GET /api/collection-runs/<collection_run_id>/source-file"}</InlineCode>,
                <Fragment key="a3">
                  Retrieves the document you submitted, available immediately: no need to wait for
                  routing or to know which flow or Splitter it went to. Returns JSON with a
                  short-lived signed <InlineCode>url</InlineCode>, or the file itself with{" "}
                  <InlineCode>?download=true</InlineCode>.
                </Fragment>,
              ],
            ]}
          />
          <p>
            See the <DocLink href="/docs/api-integration">API page</DocLink> for authentication,
            full request and response shapes, and how to follow the resulting flow run.
          </p>
        </DocCard>

        <DocCard icon={<Eye size={24} />} title="Reviewing routing decisions">
          <Lead>
            <strong>Recent Runs</strong> is where you check and tune routing. It updates live, can be
            filtered by status, and lists each document with its time, source, the sender for email
            runs, and the flow or Splitter it was sent to.
          </Lead>
          <BulletList
            items={[
              "Click a routed run to open the flow run (or the split) it created, with its extracted data and a credit breakdown that includes the routing credit.",
              "Click a run that did not reach a destination to open the Collection Run dialog: status, document, source, the written routing reason and any error message. A run that is still pending or routing can be cancelled from there with Cancel Run.",
              "A run that fell back to the default flow shows that flow as its destination; its reason starts with “No clear match. Using default flow.”",
            ]}
          />
          <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Fix descriptions, not documents">
            When routing goes wrong the fix is nearly always in the destination descriptions, not in
            the document. Two flows that both say &ldquo;invoices&rdquo; will keep producing
            ambiguous decisions until one of them says what makes it different.
          </InfoBox>
        </DocCard>

        <DocCard icon={<HelpCircle size={24} />} title="Troubleshooting">
          <DataTable
            head={["Problem", "What to check"]}
            rows={[
              [
                "Documents end up Cancelled",
                "The router found no clear match and the Default Behavior is Cancel the run. Sharpen the flow descriptions, or choose Send to a default flow.",
              ],
              [
                "Too many documents go to the default flow",
                "Two or more destinations describe the same thing, or none describes what is on page one. Open a few of these runs and compare with the descriptions.",
              ],
              [
                "Run is disabled",
                "The Collection is inactive. Turn it back on with the switch in the top bar.",
              ],
              [
                "An emailed document never shows up",
                "Check that the Email Trigger is on, that the sender is in Allowed Senders (if the list is not empty), and that the file type is supported.",
              ],
              [
                "A Splitter cannot be added",
                "It already sends documents to this Collection; adding it would create a loop.",
              ],
              [
                "A run Failed with a credit error",
                "The balance was empty when the document arrived. Contact the team to add credits, then send the document again.",
              ],
            ]}
          />
        </DocCard>

        <Related
          links={[
            {
              href: "/docs/splitters",
              label: "Split multi-document PDFs before routing",
              description:
                "How a Splitter breaks a bundled file apart, and how it works as a Collection destination.",
            },
            {
              href: "/docs/email-integration",
              label: "Give a Collection its own inbox",
              description:
                "Address shapes, accepted attachment types, and why an attachment might be skipped.",
            },
            {
              href: "/docs/api-integration",
              label: "Submit documents over the REST API",
              description: "Send documents to a Collection programmatically instead of by email.",
            },
            {
              href: "/docs/pipeline-map",
              label: "See your Collections in the Pipeline Map",
              description:
                "How Collections, Splitters, flows and delivery connect across the workspace.",
            },
          ]}
        />
      </section>
    </>
  );
}
