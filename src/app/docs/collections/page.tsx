import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  AlertTriangle,
  ArrowLeftRight,
  Coins,
  Eye,
  FilePlus,
  FolderInput,
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
    "Group several extraction flows into a Collection so Tavnit classifies each incoming document and sends it to the right flow, with a Fallback Flow for anything it cannot place.",
  steps: [
    {
      name: "Create the Collection",
      text: "Open Collections in the Tavnit app, create a new Collection and give it a name that describes the source of the documents.",
    },
    {
      name: "Add the flows",
      text: "Add every flow that should be a possible destination. Each flow needs a clear name and description, because that is what the routing decision is made against.",
    },
    {
      name: "Set a Fallback Flow",
      text: "Choose a Fallback Flow for documents that do not match anything clearly. Leave it empty and unmatched documents are cancelled instead of processed.",
    },
    {
      name: "Send documents in",
      text: "Enable the Collection's email trigger, upload manually, or post to the API. Each document is classified and forwarded to the flow that matches it.",
    },
    {
      name: "Check the routing decisions",
      text: "Open the Collection's runs and read the routing reason recorded for each document, then sharpen any flow description that produced a wrong or ambiguous decision.",
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
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Collections
        </h1>

        <DocCard icon={<FolderInput size={24} />} title="What a Collection does">
          <Lead>
            A Collection groups several flows behind one entry point. When a document arrives, Tavnit
            looks at its first page, compares what it sees against the names and descriptions of the
            flows in the Collection, and forwards the document to the one that matches — so you can
            hand out a single address for documents you cannot sort in advance.
          </Lead>
          <p>
            The routing decision is made from the document itself: headers, titles, logos, layout, and
            identifying text such as company names and form numbers. It is a classification step, not
            an extraction step — once a destination is chosen, the document is processed by that flow
            exactly as if you had sent it there directly.
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
              ["A PDF that bundles several documents together", "A Splitter — or a Collection containing one"],
            ]}
          />
          <p>
            Routing costs a credit per document, so it is not free to route something you could have
            addressed directly. Where the caller knows the type, tell the flow.
          </p>
        </DocCard>

        <DocCard icon={<FilePlus size={24} />} title="Create a Collection">
          <Lead>
            A Collection is a name, a list of destinations, and a fallback. The work is in the
            destinations: routing quality depends almost entirely on how well each flow describes
            what it handles.
          </Lead>
          <NumberedList
            items={[
              <>
                Open <strong>Collections</strong> and create a new one. Name it after where the
                documents come from — <em>Acme supplier portal</em>, not <em>Collection 2</em>.
              </>,
              "Add every flow that should be a possible destination.",
              <>
                Set a <strong>Fallback Flow</strong> for documents that do not match anything
                clearly. Leave it empty and unroutable documents are cancelled instead.
              </>,
              "Send documents in by email, manual upload, or API.",
              "Open the Collection's runs and read the routing reasons, then sharpen any description that produced a wrong decision.",
            ]}
          />
        </DocCard>

        <DocCard icon={<PenLine size={24} />} title="Writing flow names and descriptions that route well">
          <Lead>
            The name and description of each flow are the only things the router compares the
            document against. A flow called <em>Flow 3</em> with no description cannot be routed to
            reliably, no matter how distinctive the document is.
          </Lead>
          <DataTable
            head={["Instead of", "Write"]}
            rows={[
              [
                <><em>Invoices</em></>,
                <><em>
                  Acme Corp supplier invoices — blue letterhead, &ldquo;TAX INVOICE&rdquo; in the
                  header, line items with part numbers
                </em></>,
              ],
              [
                <><em>Shipping</em></>,
                <><em>
                  Bill of lading from ocean carriers — container numbers, port of loading and
                  discharge
                </em></>,
              ],
              [
                <><em>Other docs</em></>,
                <><em>Delivery notes — no prices, signature block at the bottom</em></>,
              ],
            ]}
          />
          <BulletList
            items={[
              "Describe what is visible on page one, since that is what the router sees.",
              "Name the issuer when several flows handle the same document type for different suppliers.",
              "Say what a document type is not, when two of your flows are easily confused.",
              "Avoid two flows whose descriptions overlap — the router is instructed to abstain when the match is ambiguous rather than guess.",
            ]}
          />
        </DocCard>

        <DocCard icon={<Workflow size={24} />} title="What happens to each document">
          <Lead>
            Every document creates a Collection run that moves through a small set of states. Routing
            is decided once, from the first page, and the outcome is recorded with a written reason
            you can read afterwards.
          </Lead>
          <DataTable
            head={["Status", "Meaning"]}
            rows={[
              ["Pending", "The document is stored and waiting to be routed."],
              ["Routing", "The first page is being classified."],
              [
                "Routed",
                "A destination was chosen. The Collection run links to the flow run it created.",
              ],
              [
                "Cancelled",
                "No destination matched and no Fallback Flow was set, so nothing was processed.",
              ],
              [
                "Failed",
                "The document could not be routed at all — an unsupported file type, an unreadable file, a Collection with no active destinations, or an empty credit balance.",
              ],
            ]}
          />
          <Screenshot
            src="/assets/docs-collection-runs-2026-08.jpg"
            alt="The Recent Runs tab of a Tavnit Collection, with status filters for Routed, Routing, Pending, Failed and Cancelled, listing two PDFs that were both routed to the Invoice Processor flow."
            caption="A Collection's Recent Runs, filtered by routing outcome. Each entry records the destination the document was sent to."
          />
          <InfoBox color="violet" icon={<Info size={20} />} title="The Fallback Flow is the safety net">
            When the router cannot find a clear match it does not guess — it abstains. If a Fallback
            Flow is set, the document goes there and the run records that it fell back. If none is
            set, the run is cancelled and the document is not processed at all. Set one unless you
            genuinely want unknown documents dropped.
          </InfoBox>
          <WarningBox>
            Routing does not produce a confidence score. Each decision is recorded as a written
            reason citing what the router saw on the page — read those on the Collection&apos;s runs
            to work out why a document went where it did.
          </WarningBox>
        </DocCard>

        <DocCard icon={<Split size={24} />} title="Routing to a Splitter">
          <Lead>
            A Collection&apos;s destinations are not limited to flows. You can add a{" "}
            <DocLink href="/docs/splitters">Splitter</DocLink> as a destination, so a file that
            bundles several documents is split apart first and each part is routed onward — rather
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
            cycle. Tavnit refuses configurations that would loop, and at run time a segment produced
            by a Splitter is never routed back into that same Splitter — so a mis-set configuration
            cannot spin documents in a circle and burn credits.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Coins size={24} />} title="What routing costs">
          <Lead>
            Routing is charged one credit per document, taken when the Collection run starts and
            independent of the outcome. The classification runs whether or not it finds a match, so a
            cancelled run still costs its routing credit.
          </Lead>
          <DataTable
            head={["Charge", "When"]}
            rows={[
              ["1 credit", "Per document routed by a Collection — matched, defaulted or cancelled."],
              [
                "The flow's own charge",
                "On top, once the document reaches a flow and is extracted.",
              ],
            ]}
          />
          <p>
            If the balance is empty when a document arrives, the Collection run fails before routing
            and nothing is processed.
          </p>
        </DocCard>

        <DocCard icon={<Mail size={24} />} title="Sending documents to a Collection">
          <Lead>
            A Collection accepts documents the same three ways a flow does: its own email address,
            manual upload in the app, or the API. The routing behaviour is identical whichever you
            use — the run records which trigger it came from.
          </Lead>
          <NumberedList
            items={[
              "Open the Collection's settings.",
              <>
                Enable the <strong>Email Trigger</strong> and copy the Collection&apos;s address.
              </>,
              "Forward documents to it, or point a mailbox rule at it.",
            ]}
          />
          <p>
            The address is distinct from any flow address — see{" "}
            <DocLink href="/docs/email-integration">email integration</DocLink> for the address
            shapes, accepted attachment types and what happens to attachments that cannot be
            processed.
          </p>
        </DocCard>

        <DocCard icon={<Eye size={24} />} title="Reviewing routing decisions">
          <Lead>
            The Collection&apos;s runs list is where you tune routing. Every entry shows the
            document, where it was sent, and the reason the router gave — which is what tells you
            whether to fix a description or accept the decision.
          </Lead>
          <BulletList
            items={[
              "Which flow or splitter each document was sent to, and whether that was a match or a fallback to the default",
              "The written reason, citing what the router saw on the first page",
              "A link through to the resulting flow run and its extracted data",
            ]}
          />
          <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Fix descriptions, not documents">
            When routing goes wrong the fix is nearly always in the destination descriptions, not in
            the document. Two flows that both say &ldquo;invoices&rdquo; will keep producing
            ambiguous decisions until one of them says what makes it different.
          </InfoBox>
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
