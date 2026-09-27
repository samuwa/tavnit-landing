import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  AlertTriangle,
  AtSign,
  Code2,
  Copy,
  ExternalLink,
  FileSpreadsheet,
  Info,
  LifeBuoy,
  Mail,
  Paperclip,
  Send,
  ShieldCheck,
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
      text: "Open the Email Trigger panel on the flow's detail page and switch it on. The flow's Inbox Address appears.",
    },
    {
      name: "Copy the address",
      text: "Click Copy next to the Inbox Address. Optionally add Allowed Senders or turn on Process Email Body in the same panel.",
    },
    {
      name: "Send a test document",
      text: "Email a single PDF to the address and watch the Runs page. A new run appears with the source Email.",
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
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
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
            Nothing is installed and nothing polls your mailbox: you forward mail to the address and
            Tavnit reacts. That makes it the shortest path from &ldquo;invoices arrive by
            email&rdquo; to &ldquo;invoices arrive as structured rows&rdquo;, with no code involved.
            Collections, Splitters, Pipelines, Matchers and Subjects have their own addresses too.
          </p>
          <BulletList
            items={[
              "Forwarding invoices or receipts straight from your inbox",
              "A shared accounts-payable mailbox with an auto-forward rule",
              "Letting suppliers send documents in without giving them a Tavnit login",
              "Extracting data that arrives in the message itself, such as order confirmations with no attachment",
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
                Open the <strong>Email Trigger</strong> panel and switch it on. The flow&apos;s{" "}
                <strong>Inbox Address</strong> appears.
              </Fragment>,
              <Fragment key="f2">
                Click <strong>Copy</strong> next to the address. In the same panel you can add{" "}
                <strong>Allowed Senders</strong> or turn on <strong>Process Email Body</strong>{" "}
                (both explained below).
              </Fragment>,
              <Fragment key="f3">
                Send one PDF to it and check the <strong>Runs</strong> page. A new run appears with
                the source <strong>Email</strong>, and the sender&apos;s address is recorded on the
                run.
              </Fragment>,
              "Once that works, add the forwarding rule in your mail client or shared inbox.",
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="One run per attachment">
            An email with three invoices attached produces three separate runs, each with its own
            result and its own row in the Runs list. It does not produce one
            run containing three documents.
          </InfoBox>
          <WarningBox>
            Mail sent to an address whose trigger is switched off (or to an inactive Collection) is
            accepted and discarded: the sender gets no bounce and no error. If documents seem to
            vanish, check the toggle first.
          </WarningBox>
        </DocCard>

        <DocCard icon={<ShieldCheck size={24} />} title="Allowed Senders">
          <Lead>
            By default any sender can trigger a run by emailing the address. Add addresses to{" "}
            <strong>Allowed Senders</strong> in the Email Trigger panel and only those senders are
            accepted; mail from anyone else is silently discarded.
          </Lead>
          <BulletList
            items={[
              "Entries are full email addresses, not domains. Matching ignores letter case and display names.",
              "Leave the list empty to accept email from any sender.",
              "The list is available on the email trigger of flows, Collections, Splitters, Pipelines, Matchers and Subjects.",
              <Fragment key="f4">
                When you forward through a shared mailbox, the sender Tavnit sees is usually the
                mailbox doing the forwarding, so that is the address to allow.
              </Fragment>,
            ]}
          />
        </DocCard>

        <DocCard icon={<Mail size={24} />} title="Process the email body">
          <Lead>
            Some data never arrives as an attachment: an order confirmation, a booking notice, a
            supplier writing the quantities in the message. Turn on{" "}
            <strong>Process Email Body</strong> and Tavnit converts the message body to a PDF and
            processes it like any other document. It is available on flows and Collections.
          </Lead>
          <DataTable
            head={["Mode", "What happens"]}
            rows={[
              [
                <Fragment key="f5"><strong>Only when nothing is attached</strong> (default)</Fragment>,
                "The body is processed only when the email has no document attachment. A “see attached” cover note next to an invoice is skipped, so one email never starts two runs.",
              ],
              [
                <Fragment key="f6"><strong>Always</strong></Fragment>,
                "The body is processed alongside every attachment, each in its own run.",
              ],
            ]}
          />
          <BulletList
            items={[
              "The body PDF appears in review like any other document, and the run is marked as coming from the email body.",
              "Quoted reply chains and signatures are dropped where the mail provider can identify them.",
              "Images inside the message are not read. Inline signature images do not count as attachments when deciding whether the body should be processed.",
              "A body with almost no text (“ok”, “thanks”, an empty forward) is not processed.",
            ]}
          />
        </DocCard>

        <DocCard icon={<AtSign size={24} />} title="Which features have an email address">
          <Lead>
            The email trigger is not limited to flows. Point an address at a whole sorting stage, a
            pipeline or a comparison instead of a single document type.
          </Lead>
          <DataTable
            head={["Send to", "Address shape", "What happens"]}
            rows={[
              [
                "A flow",
                <Fragment key="f7"><InlineCode>flow-name-&lt;id&gt;@mg.tavnit.io</InlineCode></Fragment>,
                "Each attachment is extracted by that flow.",
              ],
              [
                "A Collection",
                <Fragment key="f8"><InlineCode>name-&lt;id&gt;-collection@mg.tavnit.io</InlineCode></Fragment>,
                <Fragment key="f9">
                  Each attachment is classified and routed to the right flow or Splitter. See{" "}
                  <DocLink href="/docs/collections">how Collections route documents</DocLink>.
                </Fragment>,
              ],
              [
                "A Splitter",
                <Fragment key="f10"><InlineCode>&lt;id&gt;-splitter@mg.tavnit.io</InlineCode></Fragment>,
                <Fragment key="f11">
                  Each attachment is broken into its separate documents first. See{" "}
                  <DocLink href="/docs/splitters">splitting multi-document files</DocLink>.
                </Fragment>,
              ],
              [
                "A Pipeline",
                <Fragment key="f12"><InlineCode>&lt;id&gt;-pipeline@mg.tavnit.io</InlineCode></Fragment>,
                <Fragment key="f13">
                  Each PDF or image attachment starts one execution. See{" "}
                  <DocLink href="/docs/pipelines">Pipelines</DocLink>.
                </Fragment>,
              ],
              [
                "A Matcher",
                <Fragment key="f14"><InlineCode>&lt;id&gt;-matcher@mg.tavnit.io</InlineCode></Fragment>,
                <Fragment key="f15">
                  All the PDF or image attachments of one email are compared together in a single
                  match (always in multilateral mode), and the result is replied in the same
                  thread. See <DocLink href="/docs/matchers">Matchers</DocLink>.
                </Fragment>,
              ],
              [
                "A Subject",
                <Fragment key="f16"><InlineCode>&lt;id&gt;-subject@mg.tavnit.io</InlineCode></Fragment>,
                <Fragment key="f17">
                  Each attachment is filed into the right case by a reference in the subject line,
                  body or filename, or by the case&apos;s own plus-address. See{" "}
                  <DocLink href="/docs/subjects">Subjects</DocLink>.
                </Fragment>,
              ],
            ]}
            caption="Copy the exact address from the feature's Email Trigger panel; the shapes above only help you tell them apart."
          />
          <InfoBox color="violet" icon={<Workflow size={20} />} title="Which address should suppliers use?">
            If a sender only ever sends one document type, give them the flow address. If they send a
            mix (invoices, purchase orders, delivery notes), give them the Collection address and let
            Tavnit sort it. If they send one PDF containing several documents, give them the Splitter
            address.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Paperclip size={24} />} title="What Tavnit accepts">
          <Lead>
            Flows, Collections, Splitters and Subjects read PDFs, common images and spreadsheets.
            Pipelines and Matchers read PDFs and images only. Anything else in the message is
            skipped without failing the rest: one unsupported file does not stop the other
            attachments from being processed.
          </Lead>
          <DataTable
            head={["Accepted", "Extensions"]}
            rows={[
              ["PDF documents", <Fragment key="f18"><InlineCode>.pdf</InlineCode></Fragment>],
              [
                "Images",
                <Fragment key="f19"><InlineCode>.png .jpg .jpeg .jfif .tif .tiff .webp .bmp .gif</InlineCode></Fragment>,
              ],
              [
                "Spreadsheets (not Pipelines or Matchers)",
                <Fragment key="f20"><InlineCode>.xlsx .xls .csv</InlineCode></Fragment>,
              ],
            ]}
          />
          <p>An attachment is skipped rather than processed when any of these is true:</p>
          <DataTable
            head={["Reason skipped", "What it looks like"]}
            rows={[
              [
                "Unsupported file type",
                "Word documents, archives, .eml forwards and anything without a recognised extension.",
              ],
              ["Empty attachment", "A zero-byte file, usually a broken forward."],
              [
                "Unreadable file",
                "The file has a valid extension but cannot be opened: a truncated download, a renamed file, or a spreadsheet that does not parse.",
              ],
            ]}
          />
          <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Signature images count as attachments">
            A logo in an email signature often arrives as an image attachment, and a flow will
            process it like any other image. If that creates unwanted runs, forward only the
            documents, or use Allowed Senders and a forwarding rule that strips inline images.
          </InfoBox>
          <p>
            Your mail provider&apos;s attachment size limit applies before Tavnit ever sees the
            message. If a large scan bounces at the sending end, upload it in the app or post it to
            the <DocLink href="/docs/api-integration">REST API</DocLink> instead.
          </p>
        </DocCard>

        <DocCard icon={<FileSpreadsheet size={24} />} title="How spreadsheets are handled">
          <Lead>
            A spreadsheet attachment is treated as a document, not as a table to import. What
            happens depends on where you send it.
          </Lead>
          <DataTable
            head={["Sent to", "What Tavnit does"]}
            rows={[
              [
                "A flow",
                "Extracts from the first visible sheet.",
              ],
              [
                "A Collection",
                "Classifies the file by its first sheet, then hands it to the chosen flow, which reads the first visible sheet.",
              ],
              [
                "A Splitter",
                "Treats every visible, non-empty sheet as its own document, classifies each one and sends it onward as a single-sheet file.",
              ],
            ]}
          />
          <p>
            Very large sheets are rejected with an error. To load a
            spreadsheet as structured rows instead, use a{" "}
            <DocLink href="/docs/cleaners">Cleaner</DocLink> sweep.
          </p>
        </DocCard>

        <DocCard icon={<Copy size={24} />} title="Duplicate protection">
          <Lead>
            Mail servers sometimes deliver the same message more than once, for example after a
            timeout. Tavnit recognises a redelivered message to the same address and does not
            process it again, so a retry never creates duplicate runs.
          </Lead>
          <BulletList
            items={[
              "Tavnit acknowledges the message within seconds and processes the attachments in the background, so an email with many attachments is safe to send.",
              "If processing is interrupted, it resumes where it stopped instead of starting over.",
              "One message sent to two different Tavnit addresses is processed once at each address.",
              "Sending the same file again in a new email is a new message and is processed again.",
            ]}
          />
        </DocCard>

        <DocCard icon={<Send size={24} />} title="Email the results back out">
          <Lead>
            Email Output is the return leg: when a run finishes successfully, Tavnit emails the
            result to the addresses you configure. It is independent of the email trigger: you can
            use either on its own, or both to make a full send-in, get-back-out loop.
          </Lead>
          <NumberedList
            items={[
              "Open the flow's detail page.",
              <Fragment key="f21">
                Open the <strong>Email Output</strong> panel.
              </Fragment>,
              <Fragment key="f22">
                Add one or more <strong>Recipient Addresses</strong>.
              </Fragment>,
              <Fragment key="f23">
                Choose what each message carries under <strong>Attachments</strong>, then save.
              </Fragment>,
            ]}
          />
          <DataTable
            head={["Option", "What arrives"]}
            rows={[
              ["JSON extraction", "The extracted result as formatted JSON in the message body."],
              [
                "CSV extraction",
                <Fragment key="f24">
                  The rows as a <InlineCode>rows.csv</InlineCode> attachment, the fastest way to get
                  results into a spreadsheet.
                </Fragment>,
              ],
              ["Form results", "The filled PDFs, when the flow fills a form template."],
              [
                "Original document",
                "The source file (PDF, image or spreadsheet) that was processed, attached alongside the results.",
              ],
            ]}
          />
          <InfoBox color="purple" icon={<Code2 size={20} />} title="File fields arrive as links">
            Fields that hold a file or an image are not embedded in the JSON. They come through as
            time-limited links, because Tavnit keeps stored documents private: a raw storage path
            would not be fetchable from an inbox.
          </InfoBox>
          <BulletList
            items={[
              "Output email only fires on runs that complete successfully. A failed run sends nothing.",
              "The subject line carries the flow name plus a per-run detail, so mail clients do not collapse every run of a flow into one thread.",
              <Fragment key="f25">
                If the flow has <DocLink href="/docs/human-in-the-loop">human review</DocLink>{" "}
                enabled, the email waits until a reviewer approves the run.
              </Fragment>,
              <Fragment key="f26">
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
              <Fragment key="f27">
                Build one flow per document type you receive, for example{" "}
                <em>Supplier Invoices</em> and <em>Delivery Notes</em>, and give each a clear
                description.
              </Fragment>,
              <Fragment key="f28">
                Put both flows in a <DocLink href="/docs/collections">Collection</DocLink> and enable
                the Collection&apos;s email trigger. Add the shared mailbox to Allowed Senders.
              </Fragment>,
              <Fragment key="f29">
                In the shared mailbox, forward any message with an attachment from your supplier
                domains to the Collection address.
              </Fragment>,
              <Fragment key="f30">
                On each flow, turn on <strong>Email Output</strong> with the CSV attachment for the
                finance team, and add a{" "}
                <DocLink href="/docs/buckets">Bucket export</DocLink> so the data accumulates in one
                table.
              </Fragment>,
              <Fragment key="f31">
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
            error in your inbox. Work down this list: the cause is almost always the trigger toggle,
            Allowed Senders, the attachment type, or a forwarding rule that strips attachments.
          </Lead>
          <DataTable
            head={["Symptom", "Likely cause", "Fix"]}
            rows={[
              [
                "No run appears at all",
                "The email trigger is off, the address belongs to a different flow, or the sender is not in Allowed Senders.",
                "Re-check the toggle and the Allowed Senders list, and copy the address again from the Email Trigger panel.",
              ],
              [
                "Some attachments processed, others not",
                "The missing ones are an unsupported type, empty, or unreadable.",
                "Check the extensions against the accepted list above.",
              ],
              [
                "Only the signature image was processed",
                "The real document was not attached: it was linked, or the forward dropped it.",
                "Forward as an attachment rather than inline, and check the rule preserves attachments.",
              ],
              [
                "An email with no attachment did nothing",
                "Process Email Body is off, or the body had almost no text.",
                "Turn on Process Email Body in the Email Trigger panel (flows and Collections).",
              ],
              [
                "The cover note produced its own run",
                "Process Email Body is set to Always.",
                "Switch the mode to Only when nothing is attached.",
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
              label: "Split multi-document files before extraction",
              description: "For senders who bundle several documents into a single attachment.",
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
