import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  AlertTriangle,
  ArrowLeftRight,
  BarChart3,
  Download,
  FilePlus,
  FileSpreadsheet,
  Info,
  Mail,
  Route,
  Sparkles,
  Split,
} from "lucide-react";
import {
  BulletList,
  CodeBlock,
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

export const metadata = docMetadata("splitters");

const SPLIT_SOURCE_FILE = `curl "https://run.tavnit.io/api/splits/<split_id>/source-file" \\
  -H "X-API-Key: tvnt_your_key_here"

# Or stream the file itself
curl "https://run.tavnit.io/api/splits/<split_id>/source-file?download=true" \\
  -H "X-API-Key: tvnt_your_key_here" -OJ`;

/** Mirrors the visible numbered steps under "Create a Splitter". */
const HOW_TO = {
  name: "Split a multi-document file into separate documents with Tavnit",
  description:
    "Create a Tavnit Splitter, describe the document types it should recognise, and give each one a destination so every part of a bundled PDF or workbook is processed separately.",
  steps: [
    {
      name: "Create the Splitter",
      text: "Open Splitters in the Tavnit app, click Create Splitter and give it a Splitter Name that describes the bundles it will receive.",
    },
    {
      name: "Describe each document type",
      text: "Click Add Document Type for each kind of document in the bundle, with a title and a description of what it looks like, or click Suggest with AI and upload a sample bundle.",
    },
    {
      name: "Set the output automation",
      text: "Under Output automation, choose what happens to each matched document: None, Send to flow, Send to collection or Send by email.",
    },
    {
      name: "Run a split",
      text: "Click Split and upload one or more PDFs or spreadsheets, or send them to the Splitter's email address. Tavnit segments each file, classifies each segment and dispatches it.",
    },
    {
      name: "Check the result",
      text: "Open the split from Split History to see each document, its page range, the type it matched and where it was sent.",
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
          caption: "A Tavnit Splitter's document types, each with its own onward destination.",
          width: 1327,
          height: 801,
        }}
      />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
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
            Splitters also accept spreadsheets, where each sheet becomes its own document.
          </p>
          <InfoBox color="purple" icon={<ArrowLeftRight size={20} />} title="Splitter or Collection?">
            A <DocLink href="/docs/collections">Collection</DocLink> answers &ldquo;which flow does
            this <em>document</em> belong to?&rdquo;. A Splitter answers &ldquo;how many documents
            are in this <em>file</em>, and where does each one go?&rdquo;. Use a Collection when each
            file holds one document of unknown type; use a Splitter when one file holds several.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Info size={24} />} title="How segmentation works">
          <Lead>
            Every page is examined in order and assigned to exactly one segment. Segments never
            overlap and never leave a gap, so every page of the input ends up somewhere: there is no
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
                "Treated as a real boundary: a new segment starts.",
              ],
              [
                "Attachments, photos, quotes and screenshots",
                "Always their own segment, even when they sit immediately before or after a matched document.",
              ],
              [
                "A segment matches none of your document types",
                "Still produced, listed under Other Documents. It is never merged into a neighbour just to avoid an unmatched result.",
              ],
            ]}
          />
          <WarningBox>
            There is no confidence score. A segment either matches one document type or it matches
            none: the classifier is instructed to answer &ldquo;no match&rdquo; rather than guess.
            Unmatched segments are where you should look first when a split does not do what you
            expected.
          </WarningBox>
        </DocCard>

        <DocCard icon={<FilePlus size={24} />} title="Create a Splitter">
          <Lead>
            A Splitter is a list of document types. Each one has a title, a description of what it
            looks like, and an optional destination. There are no rules to write: the description is
            what the classifier matches against.
          </Lead>
          <NumberedList
            items={[
              <Fragment key="f0">
                Open <strong>Splitters</strong>, click <strong>Create Splitter</strong> and enter a{" "}
                <strong>Splitter Name</strong> for the bundle it receives, such as{" "}
                <em>Supplier delivery packets</em> rather than <em>Splitter 2</em>.
              </Fragment>,
              <Fragment key="f1">
                Click <strong>Add Document Type</strong> for each kind of document in the bundle,
                with a title and a description of what appears on the page. At least one type is
                required. Or click <strong>Suggest with AI</strong> (below) to draft them from a
                sample.
              </Fragment>,
              <Fragment key="f2">
                Under <strong>Output automation</strong>, choose a destination for each type (see the
                table below).
              </Fragment>,
              <Fragment key="f3">
                Click <strong>Split</strong> and upload a bundle, or send one to the Splitter&apos;s
                email address.
              </Fragment>,
              <Fragment key="f4">
                Open the completed split in <strong>Split History</strong> and check each
                document&apos;s page range and match.
              </Fragment>,
            ]}
          />
          <Screenshot
            src="/assets/docs-splitter-doctypes-2026-08.jpg"
            alt="A Tavnit Splitter detail page showing two configured document types, one labelled Send to flow: Invoice Processor and the other Send to collection: Second collection, with Doc Types, Split History, Email Trigger and Splitter ID in the left rail."
            caption="Each document type carries its own destination: a flow, a Collection, an email address, or nothing."
          />
          <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Descriptions do the work">
            The description is the only thing distinguishing one document type from another. Write
            what a person would look at to tell them apart, and say what it is <em>not</em>:
            &ldquo;packing slip: lists quantities with no prices, signature box at the foot. NOT the
            invoice&rdquo; beats &ldquo;packing slip&rdquo;.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Sparkles size={24} />} title="Let the AI suggest document types">
          <Lead>
            If you have a real bundle to hand, the assistant can draft the document types for you.
            It reads a sample, proposes one type per distinct document it finds, and writes
            descriptions meant to tell them apart.
          </Lead>
          <NumberedList
            items={[
              <Fragment key="f5">
                While creating the Splitter, click <strong>Suggest with AI</strong> next to Document
                Types.
              </Fragment>,
              "Optionally describe what kinds of bundles the Splitter will receive. It helps the assistant name the types the way your team does.",
              <Fragment key="f6">
                Upload a sample bundle: a PDF that mixes several documents, up to 25 pages.
              </Fragment>,
              <Fragment key="f7">
                Review the proposals. Each shows the pages it was found on; untick the ones you do not
                want (pages marked <strong>Not a document type</strong> are left out) and edit titles
                and descriptions inline.
              </Fragment>,
              <Fragment key="f8">
                Click <strong>Add N documents</strong> (N is how many you kept) to append them to the Splitter, then set their
                destinations.
              </Fragment>,
            ]}
          />
          <p>
            Analysing the sample does not run a split. Nothing is saved until you create the
            Splitter.
          </p>
        </DocCard>

        <DocCard icon={<Route size={24} />} title="Where each document goes">
          <Lead>
            Destinations are set per document type, not per Splitter. That is what lets one bundle
            fan out: invoices to an extraction flow, delivery notes to a Collection, everything else
            emailed to a person.
          </Lead>
          <DataTable
            head={["Output automation", "What happens to the segment"]}
            rows={[
              [
                "Send to flow",
                "A normal extraction run is created for that segment, tagged with the split and document type it came from.",
              ],
              [
                "Send to collection",
                <Fragment key="f9">
                  The segment is classified again by the{" "}
                  <DocLink href="/docs/collections">Collection</DocLink> and routed to whichever flow
                  matches.
                </Fragment>,
              ],
              [
                "Send by email",
                "The segment is emailed as an attachment (a PDF, or a single-sheet spreadsheet for workbooks) to the one address you enter.",
              ],
              ["None", "The segment is kept in the split result, ready to download, but not sent anywhere."],
            ]}
          />
          <p>
            Segments that match no document type are never dispatched. They stay in the split
            result under Other Documents, where you can download them.
          </p>
          <InfoBox color="green" icon={<Info size={20} />} title="Loops are blocked">
            A Splitter can feed a Collection, and a Collection can route to a Splitter. In the
            Collection picker, any Collection that routes back to this Splitter is disabled and
            labelled <strong>routes to this splitter</strong>, and at run time a segment is never
            sent into a Collection that would return it to the same Splitter, so a mis-set pair
            cannot spin documents in a circle.
          </InfoBox>
          <p>
            Runs created from a segment carry their origin with them. The webhook payload for such a
            run includes the split it came from and the document type it matched, so you can trace
            a row back to the original bundle. See{" "}
            <DocLink href="/docs/webhooks">webhook payloads</DocLink>.
          </p>
          <p>
            When a Splitter runs inside a <DocLink href="/docs/pipelines">Pipeline</DocLink>, the
            pipeline&apos;s connections decide where each document type goes, and the Splitter&apos;s
            own output automation does not fire, so nothing is sent twice.
          </p>
        </DocCard>

        <DocCard icon={<FileSpreadsheet size={24} />} title="Splitting spreadsheets">
          <Lead>
            In a workbook, the sheets are the boundaries. Every visible, non-empty sheet becomes its
            own document; the AI only decides which document type each sheet is.
          </Lead>
          <BulletList
            items={[
              <Fragment key="f10">
                Accepted formats: <InlineCode>.xlsx</InlineCode>, <InlineCode>.xls</InlineCode> and{" "}
                <InlineCode>.csv</InlineCode>. A CSV is a single sheet.
              </Fragment>,
              "Hidden and empty sheets are ignored. A workbook with no visible, non-empty sheet is rejected.",
              "Each sheet is sent onward as a single-sheet spreadsheet, so the flow that receives it gets real spreadsheet input.",
              "In the split result, the page range of a sheet reads as its position in the workbook.",
              "Very large sheets are rejected with an error.",
            ]}
          />
        </DocCard>

        <DocCard icon={<Mail size={24} />} title="Sending files to a Splitter">
          <Lead>
            A Splitter accepts files three ways: uploaded in the app, posted to the API, or emailed
            to its own address. Every file becomes its own split.
          </Lead>
          <DataTable
            head={["Route", "How it works"]}
            rows={[
              [
                "Upload in the app",
                <Fragment key="f11">
                  Click <strong>Split</strong>, pick the Splitter in <strong>Split Document</strong>{" "}
                  and drop one or more PDFs or spreadsheets. Each file starts its own split.
                </Fragment>,
              ],
              [
                "API",
                <Fragment key="f12">
                  Post the file with the Splitter ID to <InlineCode>/splits/run</InlineCode>. The API
                  also accepts images. Copy the ID from the <strong>Splitter ID</strong> panel; see{" "}
                  <DocLink href="/docs/api-integration">the API page</DocLink>.
                </Fragment>,
              ],
              [
                "Email",
                <Fragment key="f13">
                  Open the <strong>Email Trigger</strong> panel, switch it on and forward bundles to
                  the <strong>Inbox Address</strong>. Each PDF, image or spreadsheet attachment
                  becomes its own split. Use Allowed Senders to restrict who can send.
                </Fragment>,
              ],
            ]}
          />
          <p>
            Accepted attachment types, the reasons a file may be skipped and duplicate protection
            are the same as everywhere else. See{" "}
            <DocLink href="/docs/email-integration">email integration</DocLink>. If the trigger is
            switched off, the mail is accepted and discarded without a bounce.
          </p>
        </DocCard>

        <DocCard icon={<BarChart3 size={24} />} title="Reading a split result">
          <Lead>
            Open a split from <strong>Split History</strong> to see what the Splitter decided. The
            split is processing until the banner shows it as completed or failed; a failed split
            shows the error.
          </Lead>
          <BulletList
            items={[
              "Pages and Docs Found for the whole file",
              "Where the file came from, and the sender when it arrived by email",
              "Detected Documents: each segment that matched a type, with its page range, its destination and its delivery status",
              "Other Documents: segments that matched nothing, the first place to look when a split goes wrong",
              "View Run on any segment sent to a flow, and Download on every segment",
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Fixing a bad split">
            Wrong boundaries usually mean two document types are described too similarly. Wrong
            matches usually mean a description is too vague. In both cases the fix is in the
            document type descriptions, not in the file.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Download size={24} />} title="Getting the original file back">
          <Lead>
            Tavnit keeps the bundle exactly as it was uploaded. Download it from the{" "}
            <strong>Original File</strong> link in Split Details, or fetch it over the API by split
            ID.
          </Lead>
          <CodeBlock lang="Shell" code={SPLIT_SOURCE_FILE} />
          <p>
            The default response is JSON with a signed, time-limited <InlineCode>url</InlineCode>{" "}
            (7 days unless you pass a shorter <InlineCode>expires_in</InlineCode> in seconds);{" "}
            <InlineCode>download=true</InlineCode> returns the file itself. This returns the whole
            bundle, not the segments: each segment sent to a flow is a run of its own, with its own
            source file.
          </p>
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
