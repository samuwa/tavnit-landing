import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  AlertTriangle,
  ClipboardCheck,
  Code,
  Coins,
  FilePlus,
  FileText,
  HelpCircle,
  Info,
  Layers,
  ListChecks,
  PenLine,
  Send,
  Sparkles,
  Upload,
  Users,
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

export const metadata = docMetadata("fillers");

export default function Page() {
  return (
    <>
      <DocsPageSchema slug="fillers" />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
          Fillers
        </h1>

        <DocCard icon={<FileText size={24} />} title="What is a Filler?">
          <Lead>
            A Filler completes PDF forms for you. It pairs one or more fillable PDF templates with
            input slots — each slot extracted by a flow — and maps every form field to a value from
            those slots. Each <strong>Fill</strong> produces one completed copy of every template.
          </Lead>
          <p>
            Think of a customs declaration that needs data from a commercial invoice and a bill of
            lading. The invoice and the bill of lading are two inputs, each read by its own{" "}
            <DocLink href="/docs/flows">flow</DocLink>; the declaration is the template. Drop the
            two documents on a new Fill and Tavnit hands you the declaration, filled in.
          </p>
          <InfoBox color="violet" icon={<Sparkles size={20} />} title="Beta">
            Fillers is a Beta feature. It is visible to every organisation, and its screens may
            still change.
          </InfoBox>
          <InfoBox color="blue" icon={<Info size={20} />} title="Filling itself is deterministic">
            AI reads the source documents (through their flows) and can sort uploads into slots.
            Writing values into the form is a plain copy of the mapped values — no AI, and no
            credits.
          </InfoBox>
        </DocCard>

        <DocCard icon={<FilePlus size={24} />} title="Setting up a Filler">
          <NumberedList
            items={[
              <Fragment key="f1">
                Open <strong>Fillers</strong>, click <strong>&ldquo;New Filler&rdquo;</strong> and
                name it after the form it fills (at least 3 characters). A description is optional.
              </Fragment>,
              <Fragment key="f2">
                On the <strong>Setup</strong> tab, add the <strong>Inputs</strong>: one slot per
                source document. Click <strong>Add input</strong>, give it a name (e.g.
                &ldquo;Commercial Invoice&rdquo;) and choose its <strong>Extraction flow</strong>.
                Mark it <strong>Required</strong> or <strong>Optional</strong>.
              </Fragment>,
              <Fragment key="f3">
                Under <strong>Template PDFs</strong>, click <strong>Add PDF</strong> and upload
                each fillable form this Filler completes. Tavnit reports how many fillable fields it
                detected.
              </Fragment>,
              <Fragment key="f4">
                Under <strong>Field mappings</strong>, click <strong>Edit mappings</strong> on each
                template and connect its fields to the inputs (see below), then{" "}
                <strong>Save mappings</strong>.
              </Fragment>,
              <Fragment key="f5">
                Click <strong>Save</strong> in the header. When the checklist shows{" "}
                <strong>Ready to fill</strong>, start Fills from the <strong>Fills</strong> tab.
              </Fragment>,
            ]}
          />
          <DataTable
            head={["Input setting", "Effect"]}
            rows={[
              ["Required", "The fill waits for this input before filling the form."],
              ["Optional", "If the input is missing, its fields are simply left blank."],
            ]}
          />
        </DocCard>

        <DocCard icon={<ListChecks size={24} />} title="Mapping PDF fields">
          <Lead>
            The mapping dialog lists every fillable field in the template. For each one, pick an
            input and a field of that input&apos;s flow. Unmapped fields stay blank.
          </Lead>
          <BulletList
            items={[
              <Fragment key="m1">
                <strong>Single fields</strong> take the first non-empty value of the mapped field
                in the input&apos;s results.
              </Fragment>,
              <Fragment key="m2">
                <strong>Table columns</strong>: forms often repeat a line per item
                (<InlineCode>item1_qty</InlineCode>, <InlineCode>item2_qty</InlineCode>…). Tavnit
                detects these groups; map the column once and each row of the document&apos;s
                results fills its own line, in order. Choose{" "}
                <strong>Map each row&apos;s field individually</strong> to break a group apart.
              </Fragment>,
              <Fragment key="m3">
                When the input&apos;s flow is linked to a{" "}
                <DocLink href="/docs/cleaners">Cleaner</DocLink>, the dialog offers the
                Cleaner&apos;s output columns — including calculated and lookup fields — because
                that is what the flow&apos;s runs end up containing.
              </Fragment>,
              <Fragment key="m4">
                <strong>Human fill</strong> marks a single field as one a person types during
                review, with an optional checklist label. See Human review below.
              </Fragment>,
            ]}
          />
          <p>
            Checkboxes are ticked when the mapped value is <InlineCode>yes</InlineCode>,{" "}
            <InlineCode>true</InlineCode>, <InlineCode>on</InlineCode>, <InlineCode>1</InlineCode>,{" "}
            <InlineCode>x</InlineCode> or <InlineCode>checked</InlineCode>.
          </p>
        </DocCard>

        <DocCard icon={<Upload size={24} />} title="Running a Fill">
          <Lead>
            A Fill collects one completed run per input, then fills every template. You can feed it
            three ways, and mix them.
          </Lead>
          <DataTable
            head={["Way in", "What happens"]}
            rows={[
              [
                <Fragment key="r1">
                  <strong>Upload &amp; route</strong> in the <strong>New fill</strong> dialog, or{" "}
                  <strong>Add documents</strong> on the Fill
                </Fragment>,
                "Drop all the documents at once. AI reads each first page and routes it to an open slot, then that slot's flow processes it. You watch the routing live; files with no clear match wait for you to pick a slot.",
              ],
              [
                <Fragment key="r2">
                  <strong>Upload file</strong> on a slot
                </Fragment>,
                "You name the slot, so nothing is routed. The file starts a run of the slot's flow.",
              ],
              [
                <Fragment key="r3">
                  <strong>Attach run</strong> on a slot
                </Fragment>,
                "Reuse a completed run of the slot's flow that already exists — nothing is extracted again.",
              ],
            ]}
          />
          <p>
            Uploads must be PDF or image files (PNG, JPG, JPEG). <strong>Start empty fill</strong>{" "}
            opens a Fill with no documents so you can feed the slots one by one.
          </p>
          <p>
            When the Fill fires depends on the setting <strong>When does the form fill?</strong> on
            the Filler&apos;s Settings tab:
          </p>
          <DataTable
            head={["Setting", "Behaviour"]}
            rows={[
              ["Automatic", "Fills as soon as every required input has a completed run."],
              [
                "Manual",
                "Keeps collecting documents until someone clicks Fill now. Useful when optional inputs may still arrive.",
              ],
            ]}
          />
          <p>
            <strong>Fill now</strong> also works on an automatic Filler: if runs are still
            processing, the Fill waits for them and then fills. <strong>Cancel</strong> stops
            collecting; runs already attached are kept.
          </p>
          <InfoBox color="blue" icon={<Info size={20} />} title="A Fill keeps the setup it started with">
            Inputs, templates and mappings are frozen when the Fill is created. Editing the Filler
            afterwards affects new Fills only — an input added later cannot receive documents on an
            existing Fill.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Layers size={24} />} title="Fill statuses">
          <DataTable
            head={["Status", "Meaning"]}
            rows={[
              ["Collecting", "Waiting for documents or runs in its slots."],
              ["Waiting for runs", "Fired, but some assigned runs are still processing."],
              ["Queued / Running", "Filling the templates."],
              ["Awaiting HITL review", "Filled and held until a reviewer approves it."],
              ["Completed", "The filled PDFs are ready and the outputs have been sent."],
              [
                "Failed",
                "Something stopped it — typically a required input whose run failed. The reason is shown on the Fill.",
              ],
              ["Cancelled", "Stopped before the form was filled."],
            ]}
          />
          <p>
            While collecting, a failed run just leaves its slot empty: upload a replacement or attach
            another run. Once the Fill is waiting for runs, a failed required input fails the Fill.
          </p>
        </DocCard>

        <DocCard icon={<ClipboardCheck size={24} />} title="Human review">
          <p>
            Turn on review in the Filler&apos;s <strong>Human in the Loop</strong> tab and choose
            the reviewers. Every Fill then pauses as <strong>Awaiting HITL review</strong> with the
            forms already filled, and nothing is sent until a reviewer approves.
          </p>
          <BulletList
            items={[
              "The reviewer sees the filled form next to the source documents, can correct any value, and types the Human fill fields — clicking a field jumps to its box on the form.",
              "Approving re-fills the forms with the reviewer's values and releases the outputs. Human fields left blank can still be approved; they are recorded in the Fill's audit trail.",
              <Fragment key="h3">
                Mapping any <strong>Human fill</strong> field makes every Fill pause for review,
                even with the switch off, because a person has to type it.
              </Fragment>,
            ]}
          />
          <p>
            Paused Fills appear in the reviewers&apos;{" "}
            <DocLink href="/docs/human-in-the-loop">Human in the Loop</DocLink> queue.
          </p>
        </DocCard>

        <DocCard icon={<Send size={24} />} title="Outputs">
          <BulletList
            items={[
              <Fragment key="o1">
                On the Fill page: <strong>Download filled PDF</strong> per template, or{" "}
                <strong>Download all</strong>, plus a <strong>Field values</strong> table showing
                each PDF field, its value and where it came from.
              </Fragment>,
              <Fragment key="o2">
                <strong>Email Output</strong>: the address receives every filled PDF as an
                attachment.
              </Fragment>,
              <Fragment key="o3">
                <strong>Webhook</strong>: POSTs JSON with the fill result and field values — see{" "}
                <DocLink href="/docs/webhooks">webhooks</DocLink>.
              </Fragment>,
              "An in-app notification for the person who started the Fill.",
            ]}
          />
          <p>
            A Filler can also be a step in a <DocLink href="/docs/pipelines">Pipeline</DocLink>,
            fed by the flows before it.
          </p>
        </DocCard>

        <DocCard icon={<Code size={24} />} title="API">
          <p>
            Copy the <strong>Filler ID</strong> from its tab and call the{" "}
            <DocLink href="/docs/api-integration">REST API</DocLink> with your{" "}
            <InlineCode>X-API-Key</InlineCode>:
          </p>
          <DataTable
            head={["Endpoint", "What it does"]}
            rows={[
              [
                <InlineCode key="a1">POST /api/fillers/&lt;filler_id&gt;/fills</InlineCode>,
                "Create an empty Fill; returns its fill_id.",
              ],
              [
                <InlineCode key="a2">POST /api/fills/&lt;fill_id&gt;/route-upload</InlineCode>,
                "Upload a document and let Tavnit route it to a slot.",
              ],
              [
                <InlineCode key="a3">POST /api/fills/&lt;fill_id&gt;/inputs/&lt;input_id&gt;/upload</InlineCode>,
                "Upload a document to a named slot.",
              ],
              [
                <InlineCode key="a4">POST /api/fills/&lt;fill_id&gt;/inputs/&lt;input_id&gt;/attach-run</InlineCode>,
                "Attach an existing completed run (run_id).",
              ],
              [
                <InlineCode key="a5">POST /api/fills/&lt;fill_id&gt;/fire</InlineCode>,
                "Stop collecting and fill now.",
              ],
            ]}
          />
          <p>The filled PDFs reach you through the Filler&apos;s email or webhook output.</p>
        </DocCard>

        <DocCard icon={<Coins size={24} />} title="What Fillers cost">
          <DataTable
            head={["Charge", "When"]}
            rows={[
              ["Free", "Filling the templates, attaching existing runs, assigning an unmatched file by hand."],
              [
                "1 credit per document",
                "For each document routed with Upload & route or Add documents — charged whatever the routing decides.",
              ],
              ["The flow's extraction charge", "For each document a slot's flow processes."],
            ]}
          />
          <p>
            Uploads are refused when the balance cannot cover them. See{" "}
            <DocLink href="/docs/credits">Credits &amp; Billing</DocLink>.
          </p>
        </DocCard>

        <DocCard icon={<Users size={24} />} title="Who can do what">
          <BulletList
            items={[
              "Admins and Owners create Fillers. The creator of a Filler can also edit or delete it.",
              "Every member except HITL Only users can run Fills.",
              "An inactive Filler cannot start new Fills. Turn it on with the Active switch in the page header.",
            ]}
          />
        </DocCard>

        <DocCard icon={<PenLine size={24} />} title="Template requirements and limits">
          <BulletList
            items={[
              "Templates must be PDFs with fillable (AcroForm) fields. A flat or scanned PDF has nothing to write into — Tavnit warns you, and fills would stay empty.",
              "Forms built with Adobe LiveCycle (XFA) are supported: Tavnit fills their AcroForm fields and removes the XFA layer so the values show in any viewer.",
              "Replacing a template's PDF keeps its mappings. Use a PDF with the same field names, or remap.",
              "Removing a template deletes its mappings; completed Fills keep their filled copies.",
            ]}
          />
          <WarningBox>
            Each slot takes exactly one run. If a form needs data from two invoices, add two inputs.
          </WarningBox>
        </DocCard>

        <DocCard icon={<HelpCircle size={24} />} title="Troubleshooting">
          <DataTable
            head={["Problem", "What to do"]}
            rows={[
              [
                "“This PDF has no fillable form fields”",
                "The template is flat. Recreate it as a fillable PDF, or use the official fillable version of the form.",
              ],
              [
                "A field comes out blank",
                "Check it is mapped, that the input's run completed, and that the flow actually extracted a value. Optional inputs leave their fields blank when absent.",
              ],
              [
                "“Missing required inputs”",
                "A required slot has no run yet. Upload a document or attach a run, then fill again.",
              ],
              [
                "A routed file stays unmatched",
                "Pick the slot by hand with Assign to slot…. Clear flow names help the router.",
              ],
              [
                "“Run belongs to a different flow”",
                "Attach a completed run of the slot's own extraction flow.",
              ],
              [
                "The Fill is stuck on Awaiting HITL review",
                "Check the Filler's reviewers, or open it from the Human in the Loop queue.",
              ],
            ]}
          />
          <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Change the Filler, then start a new Fill">
            Fixing a mapping does not change Fills that already exist, because each Fill keeps the
            setup it started with.
          </InfoBox>
        </DocCard>

        <Related
          links={[
            {
              href: "/docs/flows",
              label: "Build the flows that feed each input",
              description: "Define the fields each source document should produce.",
            },
            {
              href: "/docs/human-in-the-loop",
              label: "Review filled forms before they go out",
              description: "How reviewers approve, correct and release paused work.",
            },
            {
              href: "/docs/pipelines",
              label: "Run a Filler inside a Pipeline",
              description: "Chain splitters, flows and fillers on one canvas.",
            },
            {
              href: "/docs/credits",
              label: "What everything costs",
              description: "Every credit price in Tavnit, in one table.",
            },
          ]}
        />
      </section>
    </>
  );
}
