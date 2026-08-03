import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  AlertTriangle,
  ArrowLeftRight,
  BarChart3,
  Coins,
  FilePlus,
  Info,
  Mail,
  Route,
  Split,
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

export const metadata = docMetadata("splitters");

/** Mirrors the visible numbered steps under "Create a Splitter". */
const HOW_TO = {
  name: "Split a multi-document PDF into separate files with Tavnit",
  description:
    "Create a Tavnit Splitter, describe the document types it should recognise, and give each one a destination so every part of a bundled PDF is processed separately.",
  steps: [
    {
      name: "Create the Splitter",
      text: "Open Splitters in the Tavnit app and create a new one, naming it after the kind of bundle it will receive.",
    },
    {
      name: "Describe each document type",
      text: "Add a document type for each kind of document that appears in the bundle, with a title and a description of what it looks like on the page.",
    },
    {
      name: "Give each type a destination",
      text: "Choose what happens to each matched segment: send it to a flow, send it to a Collection, email it, or do nothing.",
    },
    {
      name: "Run a split",
      text: "Upload a bundled PDF, or send one to the Splitter's email address. Tavnit segments the file, classifies each segment, and dispatches it.",
    },
    {
      name: "Check the split history",
      text: "Open the completed split to see each segment, its page range, which document type it matched, and where it was sent.",
    },
  ],
};

export default function Page() {
  return (
    <>
      <DocsPageSchema
        slug="splitters"
        howTo={HOW_TO}
        primaryImage={{
          url: "/assets/docs-splitter-doctypes-2026-08.jpg",
          caption:
            "A Tavnit Splitter's document types, each with its own onward destination.",
          width: 1327,
          height: 801,
        }}
      />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Splitters
        </h1>

        <DocCard icon={<Split size={24} />} title="What a Splitter does">
          <Lead>
            A Splitter takes one file that contains several documents and breaks it into its
            separate parts. It reads every page, works out where one document ends and the next
            begins, classifies each segment against the document types you described, and sends each
            part onward on its own.
          </Lead>
          <p>
            The common case is a scanner or a supplier that emails one PDF holding an invoice, a
            packing slip and a signed delivery note. Extracting that as a single document produces
            nonsense. A Splitter turns it into three documents that each reach the right flow.
          </p>
          <InfoBox
            color="purple"
            icon={<ArrowLeftRight size={20} />}
            title="Splitter or Collection?"
          >
            A <DocLink href="/docs/collections">Collection</DocLink> answers &ldquo;which flow does
            this <em>document</em> belong to?&rdquo;. A Splitter answers &ldquo;how many documents
            are in this <em>file</em>, and where does each one go?&rdquo;. Use a Collection when each
            file holds one document of unknown type; use a Splitter when one file holds several.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Info size={24} />} title="How segmentation works">
          <Lead>
            Every page is examined in order and assigned to exactly one segment. Segments never
            overlap and never leave a gap, so every page of the input ends up somewhere — there is no
            silent page loss.
          </Lead>
          <p>The rules Tavnit applies when deciding where a document ends:</p>
          <DataTable
            head={["Situation", "What happens"]}
            rows={[
              [
                "Headers and logos repeat on every page",
                "Not treated as a new document. A repeated letterhead across a five-page invoice is still one invoice.",
              ],
              [
                "The title, issuer, party, document number, format or date changes",
                "Treated as a real boundary — a new segment starts.",
              ],
              [
                "Attachments, photos, quotes and screenshots",
                "Always their own segment, even when they sit immediately before or after a matched document.",
              ],
              [
                "A segment matches none of your document types",
                "Still produced, marked unmatched. It is never merged into a neighbour just to avoid an unmatched result.",
              ],
            ]}
          />
          <WarningBox>
            There is no confidence score. A segment either matches one document type or it matches
            none — the classifier is instructed to answer &ldquo;no match&rdquo; rather than guess.
            Unmatched segments are where you should look first when a split does not do what you
            expected.
          </WarningBox>
        </DocCard>

        <DocCard icon={<FilePlus size={24} />} title="Create a Splitter">
          <Lead>
            A Splitter is a list of document types. Each one has a title, a description of what it
            looks like, and a destination. There are no samples to upload and no rules to write —
            the description is what the classifier matches against.
          </Lead>
          <NumberedList
            items={[
              <>
                Open <strong>Splitters</strong> and create a new one, named after the bundle it
                receives — <em>Supplier delivery packets</em> rather than <em>Splitter 2</em>.
              </>,
              <>
                Add a <strong>document type</strong> for each kind of document in the bundle, with a
                title and a description of what appears on the page.
              </>,
              <>Give each type a destination (see the table below).</>,
              <>Upload a bundled PDF, or send one to the Splitter&apos;s email address.</>,
              <>
                Open the completed split in <strong>Split History</strong> and check each
                segment&apos;s page range and match.
              </>,
            ]}
          />
          <Screenshot
            src="/assets/docs-splitter-doctypes-2026-08.jpg"
            alt="A Tavnit Splitter detail page showing two configured document types, one labelled Send to flow: Invoice Processor and the other Send to collection: Second collection, with Doc Types, Split History, Email Trigger and Splitter ID in the left rail."
            caption="Each document type carries its own destination — a flow, a Collection, an email address, or nothing."
          />
          <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Descriptions do the work">
            The description is the only thing distinguishing one document type from another. Write
            what a person would look at to tell them apart: &ldquo;packing slip — lists quantities
            with no prices, signature box at the foot&rdquo; beats &ldquo;packing slip&rdquo;.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Route size={24} />} title="Where each segment goes">
          <Lead>
            Destinations are set per document type, not per Splitter. That is what lets one bundle
            fan out — invoices to an extraction flow, delivery notes to a Collection, everything else
            emailed to a person.
          </Lead>
          <DataTable
            head={["Destination", "What happens to the segment"]}
            rows={[
              [
                "Send to a flow",
                <>
                  A normal extraction run is created for that segment, tagged with the Splitter it
                  came from.
                </>,
              ],
              [
                "Send to a Collection",
                <>
                  The segment is classified again by the{" "}
                  <DocLink href="/docs/collections">Collection</DocLink> and routed to whichever flow
                  matches.
                </>,
              ],
              ["Email it", "The segment is emailed as a PDF to an address you specify."],
              ["Nothing", "The segment is kept in the split result but not dispatched anywhere."],
            ]}
          />
          <InfoBox color="green" icon={<Info size={20} />} title="Loops are blocked">
            A Splitter can feed a Collection, and a Collection can route to a Splitter. Tavnit
            refuses configurations that would form a cycle, and at run time a segment is never routed
            back into the Splitter that produced it — so a mis-set pair cannot spin documents in a
            circle and burn credits.
          </InfoBox>
          <p>
            Segments dispatched to a flow carry their origin with them. The webhook payload for such
            a run includes the split it came from and the document type it matched, so you can trace
            a row back to the page range in the original bundle — see{" "}
            <DocLink href="/docs/webhooks">webhook payloads</DocLink>.
          </p>
        </DocCard>

        <DocCard icon={<Mail size={24} />} title="Sending files to a Splitter">
          <Lead>
            A Splitter accepts files three ways: uploaded in the app, posted to the API, or emailed
            to its own address. The email route is the useful one — point a supplier or a scanner at
            it and bundles are broken up without anyone opening Tavnit.
          </Lead>
          <NumberedList
            items={[
              "Open the Splitter and enable its Email Trigger.",
              "Copy the address and forward bundled PDFs to it.",
              "Each supported attachment becomes its own split.",
            ]}
          />
          <p>
            Accepted attachment types and the reasons a file may be skipped are the same as
            everywhere else — see{" "}
            <DocLink href="/docs/email-integration">email integration</DocLink>. As with flows, if
            the trigger is switched off the mail is accepted and discarded without a bounce.
          </p>
        </DocCard>

        <DocCard icon={<Coins size={24} />} title="What splitting costs">
          <Lead>
            A split is charged by the length of the source file: one credit per page of the bundle,
            regardless of how many documents come out of it. Each segment then pays its own
            extraction cost when it reaches a flow.
          </Lead>
          <DataTable
            head={["Charge", "When"]}
            rows={[
              ["1 credit per page of the bundle", "When the split runs."],
              [
                "The flow's own extraction charge",
                "Per segment, once it reaches a flow.",
              ],
              [
                "1 routing credit per segment",
                <>
                  Only when the segment is sent to a{" "}
                  <DocLink href="/docs/collections">Collection</DocLink> rather than straight to a
                  flow.
                </>,
              ],
            ]}
          />
          <p>
            Sending segments straight to a flow is therefore cheaper than routing them through a
            Collection. Use the Collection destination when the document type genuinely could go to
            more than one flow; otherwise map the type directly.
          </p>
        </DocCard>

        <DocCard icon={<BarChart3 size={24} />} title="Reading a split result">
          <Lead>
            Open a completed split from <strong>Split History</strong> to see what the Splitter
            decided. Each segment lists its page range, the document type it matched, the reason for
            the match, and where it was dispatched.
          </Lead>
          <BulletList
            items={[
              "How many documents were found, and how many matched a configured type",
              "The exact page range of each segment, so you can check the boundaries against the original",
              "The reason the classifier gave for each match",
              "The run or Collection run each segment produced, with a link through to its results",
              "Segments that matched nothing — the first place to look when a split goes wrong",
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Fixing a bad split">
            Wrong boundaries usually mean two document types are described too similarly. Wrong
            matches usually mean a description is too vague. In both cases the fix is in the
            document type descriptions, not in the file.
          </InfoBox>
        </DocCard>

        <Related
          links={[
            {
              href: "/docs/collections",
              label: "Route single documents with Collections",
              description:
                "The other half of the sorting story, and a valid destination for split segments.",
            },
            {
              href: "/docs/email-integration",
              label: "Give a Splitter its own inbox",
              description:
                "Address shapes, accepted attachment types, and why an attachment might be skipped.",
            },
            {
              href: "/docs/webhooks",
              label: "Trace a result back to its bundle",
              description:
                "Split provenance keys travel with the webhook payload of every segment's run.",
            },
            {
              href: "/docs/pipeline-map",
              label: "See Splitters in the Pipeline Map",
              description: "How Splitters, Collections, flows and Cleaners connect end to end.",
            },
          ]}
        />
      </section>
    </>
  );
}
