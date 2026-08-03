import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  AlertTriangle,
  AtSign,
  Code2,
  ExternalLink,
  Info,
  LifeBuoy,
  Mail,
  Paperclip,
  Send,
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
  WarningBox,
} from "@/components/docs/ui";

export const metadata = docMetadata("email-integration");

/** Mirrors the visible numbered steps under "Turn on the email trigger". */
const HOW_TO = {
  name: "Extract data from email attachments with a Tavnit email trigger",
  description:
    "Enable the email trigger on a Tavnit flow to get a dedicated inbox address, then forward documents to it. Every supported attachment becomes its own extraction run.",
  steps: [
    {
      name: "Open the flow",
      text: "Go to Flows in the Tavnit app and open the flow you want to receive documents.",
    },
    {
      name: "Enable the email trigger",
      text: "Find the Email Trigger section on the flow's detail page and switch it on. Tavnit assigns the flow a dedicated inbox address.",
    },
    {
      name: "Copy the address",
      text: "Copy the flow's email address. It is unique to that flow and does not change when you toggle the trigger off and on.",
    },
    {
      name: "Send a test document",
      text: "Email a single PDF to the address and watch the Runs page. A new run appears with source Email.",
    },
    {
      name: "Automate the forwarding",
      text: "Once the test works, add a rule in your mail client or shared inbox that forwards matching messages to the address automatically.",
    },
  ],
};

export default function Page() {
  return (
    <>
      <DocsPageSchema slug="email-integration" howTo={HOW_TO} />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Email Integration
        </h1>

        <DocCard icon={<Mail size={24} />} title="How email processing works">
          <Lead>
            Every Tavnit flow can have its own inbox address. When you enable the email trigger and
            send a document to that address, Tavnit takes each supported attachment, creates a
            separate extraction run for it, and processes it exactly as if you had uploaded it in the
            app.
          </Lead>
          <p>
            Nothing is installed and nothing polls your mailbox — you forward mail to the address and
            Tavnit reacts. That makes it the shortest path from &ldquo;invoices arrive by
            email&rdquo; to &ldquo;invoices arrive as structured rows&rdquo;, with no code involved.
          </p>
          <BulletList
            items={[
              "Forwarding invoices or receipts straight from your inbox",
              "A shared accounts-payable mailbox with an auto-forward rule",
              "Letting suppliers send documents in without giving them a Tavnit login",
              "Getting documents processed by people who never open the app",
            ]}
          />
        </DocCard>

        <DocCard icon={<ExternalLink size={24} />} title="Turn on the email trigger">
          <Lead>
            The trigger is off by default. Turn it on from the flow&apos;s detail page, copy the
            address it gives you, and send one document as a test before you point a forwarding rule
            at it.
          </Lead>
          <NumberedList
            items={[
              <Fragment key="f0">
                Go to <strong>Flows</strong> and open the flow you want to receive documents.
              </Fragment>,
              <Fragment key="f1">
                Find the <strong>Email Trigger</strong> section and switch it on.
              </Fragment>,
              "Copy the flow's email address.",
              <Fragment key="f2">
                Send one PDF to it and check the <strong>Runs</strong> page — a new run appears with
                the source <strong>Email</strong>.
              </Fragment>,
              "Once that works, add the forwarding rule in your mail client or shared inbox.",
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="One run per attachment">
            An email with three invoices attached produces three separate runs, each with its own
            result, its own credit charge and its own row in the Runs list. It does not produce one
            run containing three documents.
          </InfoBox>
          <WarningBox>
            If the trigger is switched off, mail sent to the address is accepted and discarded — the
            sender gets no bounce and no error. If documents seem to vanish, check the toggle first.
          </WarningBox>
        </DocCard>

        <DocCard icon={<AtSign size={24} />} title="Flows, Collections and Splitters each get an address">
          <Lead>
            The email trigger is not limited to flows. Collections and Splitters have their own
            inbox addresses too, which lets you point one address at a whole sorting stage instead of
            a single document type.
          </Lead>
          <DataTable
            head={["Send to", "Address shape", "What happens"]}
            rows={[
              [
                "A flow",
                <Fragment key="f3"><InlineCode>flow-name-&lt;id&gt;@mg.tavnit.io</InlineCode></Fragment>,
                "Each attachment is extracted by that flow.",
              ],
              [
                "A Collection",
                <Fragment key="f4"><InlineCode>name-&lt;id&gt;-collection@mg.tavnit.io</InlineCode></Fragment>,
                <Fragment key="f5">
                  Each attachment is classified and routed to the right flow — see{" "}
                  <DocLink href="/docs/collections">how Collections route documents</DocLink>.
                </Fragment>,
              ],
              [
                "A Splitter",
                <Fragment key="f6"><InlineCode>name-&lt;id&gt;-splitter@mg.tavnit.io</InlineCode></Fragment>,
                <Fragment key="f7">
                  Each attachment is broken into its separate documents first — see{" "}
                  <DocLink href="/docs/splitters">splitting multi-document PDFs</DocLink>.
                </Fragment>,
              ],
            ]}
            caption="Copy the exact address from the object's detail page; the shapes above are only there to help you tell them apart."
          />
          <InfoBox color="violet" icon={<Workflow size={20} />} title="Which address should suppliers use?">
            If a sender only ever sends one document type, give them the flow address. If they send a
            mix — invoices, purchase orders, delivery notes — give them the Collection address and let
            Tavnit sort it. If they send one PDF containing several documents, give them the Splitter
            address.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Paperclip size={24} />} title="What Tavnit accepts">
          <Lead>
            Tavnit reads PDF and common image attachments. Anything else in the message is ignored
            without failing the rest — one unsupported file does not stop the other attachments from
            being processed.
          </Lead>
          <DataTable
            head={["Accepted", "Extensions"]}
            rows={[
              ["PDF documents", <Fragment key="f8"><InlineCode>.pdf</InlineCode></Fragment>],
              [
                "Images",
                <Fragment key="f9"><InlineCode>.png .jpg .jpeg .tif .tiff .webp .bmp .gif</InlineCode></Fragment>,
              ],
            ]}
          />
          <p>
            An attachment is skipped rather than processed when any of these is true:
          </p>
          <DataTable
            head={["Reason skipped", "What it looks like"]}
            rows={[
              [
                "Unsupported file type",
                "Office documents, archives, .eml forwards and signature images all fall in here.",
              ],
              ["Empty attachment", "A zero-byte file, usually a broken forward."],
              [
                "Unreadable file",
                "The file has a valid extension but cannot be opened as a document — a truncated download or a renamed file.",
              ],
            ]}
          />
          <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="The subject and body are never read">
            Only attachments are processed. Notes in the message body, reference numbers in the
            subject line and inline images in the signature are all ignored. If a value matters, it
            has to be in the document.
          </InfoBox>
          <p>
            Your mail provider&apos;s attachment size limit applies before Tavnit ever sees the
            message. If a large scan bounces at the sending end, upload it in the app or post it to
            the <DocLink href="/docs/api-integration">REST API</DocLink> instead.
          </p>
        </DocCard>

        <DocCard icon={<Send size={24} />} title="Email the results back out">
          <Lead>
            Email Output is the return leg: when a run finishes successfully, Tavnit emails the
            result to the addresses you configure. It is independent of the email trigger — you can
            use either on its own, or both to make a full send-in, get-back-out loop.
          </Lead>
          <NumberedList
            items={[
              "Open the flow's detail page.",
              <Fragment key="f10">
                Find the <strong>Email Output</strong> section.
              </Fragment>,
              "Add one or more recipient addresses.",
              <Fragment key="f11">
                Choose what each message carries under <strong>Attachments</strong>, then save.
              </Fragment>,
            ]}
          />
          <DataTable
            head={["Option", "What arrives"]}
            rows={[
              [
                "JSON extraction",
                "The extracted result as formatted JSON in the message body.",
              ],
              [
                "CSV extraction",
                <Fragment key="f12">
                  The rows as a <InlineCode>rows.csv</InlineCode> attachment — the fastest way to get
                  results into a spreadsheet.
                </Fragment>,
              ],
              [
                "Original document",
                "The source PDF or image that was processed, attached alongside the results.",
              ],
              [
                "Form results",
                "The filled PDF, when the flow fills a form template.",
              ],
            ]}
          />
          <InfoBox color="purple" icon={<Code2 size={20} />} title="File fields arrive as links">
            Fields that hold a file or an image are not embedded in the JSON. They come through as
            time-limited links, because Tavnit keeps stored documents private — a raw storage path
            would not be fetchable from an inbox.
          </InfoBox>
          <BulletList
            items={[
              "Output email only fires on runs that complete successfully. A failed run sends nothing.",
              "The subject line carries the flow name plus a per-run detail, so mail clients do not collapse every run of a flow into one thread.",
              <Fragment key="f13">
                If the flow has <DocLink href="/docs/human-in-the-loop">human review</DocLink>{" "}
                enabled, the email waits until a reviewer approves the run.
              </Fragment>,
              <Fragment key="f14">
                For machine-to-machine delivery, a{" "}
                <DocLink href="/docs/webhooks">webhook</DocLink> is a better fit than email.
              </Fragment>,
            ]}
          />
        </DocCard>

        <DocCard icon={<Workflow size={24} />} title="Worked example: an accounts-payable inbox">
          <Lead>
            The common setup is a shared mailbox that already receives supplier invoices, forwarded
            into a Collection so each supplier&apos;s format lands in the right flow, with results
            emailed to the finance team and pushed into a Bucket.
          </Lead>
          <NumberedList
            items={[
              <Fragment key="f15">
                Build one flow per document type you receive — for example{" "}
                <em>Supplier Invoices</em> and <em>Delivery Notes</em> — and give each a clear
                description.
              </Fragment>,
              <Fragment key="f16">
                Put both flows in a <DocLink href="/docs/collections">Collection</DocLink> and enable
                the Collection&apos;s email trigger.
              </Fragment>,
              <Fragment key="f17">
                In the shared mailbox, forward any message with an attachment from your supplier
                domains to the Collection address.
              </Fragment>,
              <Fragment key="f18">
                On each flow, turn on <strong>Email Output</strong> with the CSV attachment for the
                finance team, and add a{" "}
                <DocLink href="/docs/buckets">Bucket export</DocLink> so the data accumulates in one
                table.
              </Fragment>,
              <Fragment key="f19">
                Add a <DocLink href="/docs/cleaners">Cleaner</DocLink> with a conditional action that
                sends anything over your approval threshold to{" "}
                <DocLink href="/docs/human-in-the-loop">human review</DocLink> before it is
                delivered.
              </Fragment>,
            ]}
          />
          <p>
            Nobody in finance has to open Tavnit. Invoices arrive where they always did, and the
            structured data comes back to the same inbox.
          </p>
        </DocCard>

        <DocCard icon={<LifeBuoy size={24} />} title="Troubleshooting">
          <Lead>
            Because inbound mail is accepted silently, a document that does not turn up leaves no
            error in your inbox. Work down this list — the cause is almost always the trigger toggle,
            the attachment type, or a forwarding rule that strips attachments.
          </Lead>
          <DataTable
            head={["Symptom", "Likely cause", "Fix"]}
            rows={[
              [
                "No run appears at all",
                "The email trigger is off, or the address belongs to a different flow.",
                "Re-check the toggle and copy the address again from the flow's detail page.",
              ],
              [
                "Some attachments processed, others not",
                "The missing ones are an unsupported type, empty, or unreadable.",
                "Check the extensions against the accepted list above.",
              ],
              [
                "Only the signature image was processed",
                "The real document was not attached — it was linked, or the forward dropped it.",
                "Forward as an attachment rather than inline, and check the rule preserves attachments.",
              ],
              [
                "Runs appear but fail",
                "The document itself is the problem, not the email path.",
                "Open the run and read its log; the failure is an extraction issue.",
              ],
              [
                "Results never arrive by email",
                "Email Output is unset, the run failed, or it is waiting for review.",
                "Check the run's status first, then the Email Output configuration.",
              ],
            ]}
          />
        </DocCard>

        <Related
          links={[
            {
              href: "/docs/collections",
              label: "Route mixed documents automatically with Collections",
              description:
                "Point one email address at several flows and let Tavnit pick the right one per document.",
            },
            {
              href: "/docs/splitters",
              label: "Split multi-document PDFs before extraction",
              description:
                "For senders who bundle several documents into a single attachment.",
            },
            {
              href: "/docs/webhooks",
              label: "Deliver results to your own systems with webhooks",
              description:
                "The machine-readable alternative to Email Output, with retry behaviour.",
            },
            {
              href: "/docs/api-integration",
              label: "Submit documents over the REST API",
              description:
                "For volumes and file sizes that email cannot carry, with explicit error handling.",
            },
          ]}
        />
      </section>
    </>
  );
}
