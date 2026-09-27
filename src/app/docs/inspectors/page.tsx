import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  CalendarClock,
  ClipboardCheck,
  Code,
  Coins,
  FileStack,
  FileText,
  FlaskConical,
  Info,
  Lightbulb,
  ListChecks,
  Play,
  Send,
  ShieldCheck,
  Sparkles,
  Users,
  Wrench,
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
} from "@/components/docs/ui";

export const metadata = docMetadata("inspectors");

export default function Page() {
  return (
    <>
      <DocsPageSchema slug="inspectors" />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
          Inspectors
        </h1>

        <DocCard icon={<ShieldCheck size={24} />} title="What is an Inspector?">
          <Lead>
            An Inspector is a compliance checklist for a set of related documents. You list the
            documents you expect, each one extracted by a flow, and build a checklist of checks over
            their values. Every inspection ends in a verdict: same inputs, same verdict, every time.
          </Lead>
          <p>
            A typical example is an import shipment: a commercial invoice, a packing list and a bill
            of lading. The Inspector checks that the totals agree, that the invoice number matches
            across documents, that the dates are in order and that nothing has expired. The rules are
            evaluated by a deterministic engine, not by an AI reading the documents, so the verdict
            is reproducible and every result can be traced back to the values that produced it.
          </p>
          <InfoBox color="violet" icon={<FlaskConical size={20} />} title="Beta">
            Inspectors are in beta. They are available to every organisation, and the way they work
            may still change.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Lightbulb size={24} />} title="When to use an Inspector">
          <BulletList
            items={[
              "Cross-document checks before paying or releasing something: invoice against purchase order and delivery note",
              "Import and export file reviews: the same references, quantities and totals across every document",
              "Expiry and date rules: certificates still valid today, documents issued in the current month",
              "Format checks on single values: tax IDs, invoice numbers, allowed currencies",
            ]}
          />
          <p>
            If what you need is a line-by-line price comparison across several versions of the same
            document, such as supplier quotes, use a <DocLink href="/docs/matchers">Matcher</DocLink>{" "}
            instead.
          </p>
        </DocCard>

        <DocCard icon={<FileStack size={24} />} title="Creating an Inspector">
          <NumberedList
            items={[
              <Fragment key="c1">
                Go to <strong>Inspectors</strong> and click <strong>New inspector</strong>. Give it a
                name (at least 3 characters) and an optional description, then click{" "}
                <strong>Create</strong>. To start from an existing inspector, use{" "}
                <strong>From template</strong> instead.
              </Fragment>,
              <Fragment key="c2">
                In <strong>Expected documents</strong>, click <strong>Add document</strong> for each
                document the process needs: a <strong>Document name</strong> and the{" "}
                <strong>Extraction flow</strong> that reads it.
              </Fragment>,
              <Fragment key="c3">
                Build the <strong>Checklist</strong> with <strong>Add check</strong>,{" "}
                <strong>Add branch</strong> or <strong>Suggest checks</strong>.
              </Fragment>,
              <Fragment key="c4">
                Test it in the <strong>Dry run</strong> panel, then click <strong>Save</strong> in the
                header.
              </Fragment>,
              <Fragment key="c5">
                Make sure the inspector is <strong>Active</strong> (the switch in the header).
                Inactive inspectors can&apos;t start new inspections.
              </Fragment>,
            ]}
          />
          <p>Each expected document has these options:</p>
          <DataTable
            head={["Option", "What it does"]}
            rows={[
              [
                <strong key="d1">Required / Optional</strong>,
                "Required documents must arrive before the checklist runs. When an optional document is absent, the checks that read it are skipped, never failed.",
              ],
              [
                <strong key="d2">Extraction flow</strong>,
                "The flow that extracts the document. Its fields become available to the checklist. It must be an active flow.",
              ],
              [
                <strong key="d3">Routing hint</strong>,
                "What the document looks like. Helps the AI put uploaded files into the right slot.",
              ],
              [
                <strong key="d4">Accept multiple documents</strong>,
                "Lets several files fill the same slot, for example several delivery notes.",
              ],
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Flows with a Cleaner">
            If a document&apos;s flow has a <DocLink href="/docs/cleaners">Cleaner</DocLink> linked,
            the checklist reads the Cleaner&apos;s output columns, not the raw extracted fields. That
            is how you check a normalised date, a converted amount or a looked-up value.
          </InfoBox>
        </DocCard>

        <DocCard icon={<ListChecks size={24} />} title="Checks">
          <Lead>
            A check reads values the document flows extract and passes or fails deterministically.
            Checks run top to bottom; drag them to reorder, and the report follows the same order.
          </Lead>
          <DataTable
            head={["Part of a check", "What it does"]}
            rows={[
              [<strong key="k1">Check name</strong>, "Shown in the report, for example “Totals reconcile with the packing list”."],
              [
                <strong key="k2">Check that</strong>,
                "One or more conditions. Use Add condition and Add group to combine them with AND / OR.",
              ],
              [
                <strong key="k3">Severity</strong>,
                "Blocker, Warning or Info. A failing blocker fails the whole inspection; warnings downgrade it to “pass with warnings”; info never affects the verdict.",
              ],
              [
                <strong key="k4">Only run this check when…</strong>,
                "An optional guard. When the guard doesn't hold (or reads an absent optional document) the check is skipped, never failed.",
              ],
              [
                <strong key="k5">If this check fails</strong>,
                "Actions: Request review (pick reviewers), Send email (recipients, comma separated) or Call webhook.",
              ],
            ]}
          />
          <h3 className="text-base font-semibold text-fg pt-2">Branches</h3>
          <p>
            A branch splits the checklist on a condition. Its <strong>When</strong> condition decides
            which lane runs: <strong>Then check</strong> when it holds, <strong>Otherwise</strong>{" "}
            when it doesn&apos;t. If the condition can&apos;t be evaluated (absent document, bad
            value), the Otherwise lane runs. Each lane can hold checks and further branches, and the
            branch name appears in the report. Checks in the lane that didn&apos;t run are reported
            as skipped.
          </p>
          <InfoBox color="yellow" icon={<Info size={20} />} title="Blockers on optional documents">
            A blocker that reads an optional document is skipped when the document is missing, so it
            can never fail the inspection. The builder flags it; consider Warning severity or making
            the document required.
          </InfoBox>
        </DocCard>

        <DocCard icon={<CalendarClock size={24} />} title="Conditions and operators">
          <p>
            Each condition picks a <strong>Document</strong> and a <strong>Field</strong>, an
            operator and a value. For a repeating (table) column, the first value is compared. Date
            fields can compare only one element of the date: <strong>Full date</strong>,{" "}
            <strong>Date only</strong>, <strong>Month + year</strong> or <strong>Year</strong>.
          </p>
          <DataTable
            head={["Field type", "Operators"]}
            rows={[
              [
                "Number",
                "Equals, Not equals, Greater than, Less than, Greater or equal, Less or equal, Is one of, Is not one of, Is empty, Is not empty",
              ],
              [
                "Date",
                "Equals, After, On or after, Before, On or before, Within range, Is empty, Is not empty",
              ],
              [
                "Text",
                "Equals, Not equals, Contains, Does not contain, Starts with, Ends with, Matches pattern, Does not match pattern, Is one of, Is not one of, Is empty, Is not empty, plus the date operators and, in checks, AI match and AI check",
              ],
            ]}
          />
          <p>The value can be one of four kinds, chosen with the toggle next to it:</p>
          <DataTable
            head={["Value", "Use it for"]}
            rows={[
              [
                <Fragment key="v1">
                  <strong>Literal value</strong> (<InlineCode>#</InlineCode> /{" "}
                  <InlineCode>Abc</InlineCode>)
                </Fragment>,
                "A fixed value, such as 0, USD or 2026-12-31. Dates are written YYYY-MM-DD (YYYY-MM or YYYY when comparing a month or a year).",
              ],
              [
                <Fragment key="v2">
                  <strong>Another document&apos;s field</strong> (<InlineCode>f(x)</InlineCode>)
                </Fragment>,
                "Cross-document checks, such as the invoice total equals the purchase order total. Numeric Equals / Not equals accept a tolerance in %, measured against the right-hand value.",
              ],
              [
                <Fragment key="v3">
                  <strong>Percentage of another document&apos;s field</strong> (
                  <InlineCode>%</InlineCode>)
                </Fragment>,
                "Numbers only, such as the freight is less than 10% of the invoice total.",
              ],
              [
                <strong key="v4">Dynamic date</strong>,
                "Today, Current month or Current year, resolved in your organisation's timezone when the inspection runs. A full date against Current month compares by month and year.",
              ],
            ]}
          />
          <BulletList
            items={[
              "Numbers ignore thousands separators, spaces and currency symbols. Text is trimmed and compared without regard to case.",
              "Two values that both read as dates are compared as dates, so 09-05-1989 equals 09/05/1989. Text fields can use the date operators for the same reason.",
              "On or after and On or before include the boundary date; After and Before don't.",
              "When one side of a field-to-field comparison is blank, the check doesn't error: Equals holds only if both are blank, and ordering operators such as Greater than are false.",
              <Fragment key="b5">
                <strong>Matches pattern</strong> uses a regular expression, case-insensitive,
                anywhere in the value; add <InlineCode>^</InlineCode> and <InlineCode>$</InlineCode>{" "}
                to match the whole value (<InlineCode>^INV-\d+$</InlineCode>).{" "}
                <strong>Is one of</strong> takes a comma-separated list and compares numbers as
                numbers.
              </Fragment>,
            ]}
          />
        </DocCard>

        <DocCard icon={<Sparkles size={24} />} title="AI conditions">
          <p>
            Some judgements can&apos;t be written as a rule. Text fields offer two AI operators,
            available in check conditions only (never in guards or branch conditions):
          </p>
          <BulletList
            items={[
              <Fragment key="ai1">
                <strong>AI match</strong> compares a value with another document&apos;s field, with
                your instructions, for example &ldquo;Are these the same person? Names may omit a
                surname or be ordered differently.&rdquo;
              </Fragment>,
              <Fragment key="ai2">
                <strong>AI check</strong> judges a single value, for example &ldquo;Is this address
                inside Panama?&rdquo;
              </Fragment>,
            ]}
          />
          <p>
            You define the possible answers (at least two) and mark which ones pass; they show in
            green. The model answers with exactly one option, and the chosen option and its reasoning
            are recorded in the report. The answer is frozen with the inspection, so the verdict
            itself stays reproducible.
          </p>
        </DocCard>

        <DocCard icon={<Sparkles size={24} />} title="Suggest checks">
          <p>
            Once the expected documents are in place, click <strong>Suggest checks</strong> in the
            checklist. Optionally describe what the inspector should verify (for example
            &ldquo;Check that the invoice total matches the purchase order&rdquo;), then click{" "}
            <strong>Suggest checks</strong>. The assistant reads the fields of each document, with
            sample values from the flow&apos;s latest completed run, and drafts checks with their
            severity and conditions.
          </p>
          <p>
            Uncheck what you don&apos;t need, edit any check with the pencil, and click{" "}
            <strong>Add checks</strong>. Everything stays editable. Suggestions are free.
          </p>
        </DocCard>

        <DocCard icon={<FlaskConical size={24} />} title="Dry run">
          <p>
            The <strong>Dry run</strong> panel tests the checklist against completed runs: pick a
            sample run for each document, or <strong>No document (absent)</strong>, and the verdict
            re-evaluates instantly as you edit. It uses the same rule engine as real inspections.
            Nothing is saved or charged, and AI conditions are assumed to pass because the model only
            runs during real inspections.
          </p>
        </DocCard>

        <DocCard icon={<Play size={24} />} title="Running an inspection">
          <NumberedList
            items={[
              <Fragment key="r1">
                Open the inspector&apos;s <strong>Inspections</strong> tab and click{" "}
                <strong>New inspection</strong>.
              </Fragment>,
              <Fragment key="r2">
                Drop the documents for one inspection (PDF, PNG, JPG, JPEG, JFIF) and click{" "}
                <strong>Start inspection</strong>.
              </Fragment>,
              "AI routes each file into the right document slot, using its first page, the document name, the routing hint and the flow, and runs the slot's extraction flow.",
              "When every required document has a completed run, the checklist evaluates and the inspection page shows the verdict and the report.",
            ]}
          />
          <p>
            On the inspection page you can keep adding documents while it is collecting. A file the
            AI couldn&apos;t place is marked Unmatched: choose a slot in{" "}
            <strong>Assign to document…</strong> and click <strong>Assign</strong>.{" "}
            <strong>Cancel</strong> stops an inspection without evaluating it.
          </p>
          <p>
            <strong>Settings</strong> decides when the checklist runs: <strong>Automatic</strong>{" "}
            evaluates as soon as every required document has a completed run;{" "}
            <strong>Manual</strong> keeps collecting until someone clicks <strong>Fire now</strong>.
          </p>
          <DataTable
            head={["Status", "Meaning"]}
            rows={[
              ["Collecting", "Accepting documents. Files are routed and their runs extract."],
              ["Waiting for runs", "Fired, waiting for the last runs to finish."],
              ["Queued / Running", "The checklist is being evaluated."],
              ["Awaiting approval", "A reviewer must approve before the verdict is final."],
              ["Completed", "The verdict and report are ready."],
              ["Failed", "For example, a required document's run failed after the inspection was fired."],
              ["Cancelled", "Cancelled by a user, or rejected in review."],
            ]}
          />
          <p>You can also run inspections:</p>
          <BulletList
            items={[
              <Fragment key="w1">
                <strong>From a Subject case.</strong> An inspector bound to a{" "}
                <DocLink href="/docs/subjects">Subject</DocLink> appears under{" "}
                <strong>Checks</strong> on the case page. <strong>Run</strong> reuses the
                case&apos;s completed runs, with no re-upload or re-extraction. Every required
                document needs a completed run in the case.
              </Fragment>,
              <Fragment key="w2">
                <strong>In a Pipeline</strong>, as a node after the flows. See{" "}
                <DocLink href="/docs/pipelines">Pipelines</DocLink>.
              </Fragment>,
              <Fragment key="w3">
                <strong>Over the API</strong>, described below.
              </Fragment>,
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Configuration is frozen per inspection">
            An inspection keeps the documents and checklist it started with. Edits to the inspector
            apply to new inspections only.
          </InfoBox>
        </DocCard>

        <DocCard icon={<FileText size={24} />} title="Verdict and report">
          <DataTable
            head={["Verdict", "When"]}
            rows={[
              ["Fail", "Any blocker failed or couldn't be evaluated (error)."],
              ["Pass with warnings", "No blocker failed, but at least one warning failed or errored."],
              ["Pass", "No blocker or warning failed. Info checks never change the verdict."],
            ]}
          />
          <p>
            The <strong>Checklist report</strong> lists every check in order with its result (
            <strong>Pass</strong>, <strong>Fail</strong>, <strong>Skipped</strong> or{" "}
            <strong>Error</strong>), the values that were compared and a short explanation. Skipped
            checks say why: the branch wasn&apos;t taken, the guard wasn&apos;t met, or the document
            wasn&apos;t provided. A completed inspection can be downloaded as a{" "}
            <strong>PDF report</strong>.
          </p>
        </DocCard>

        <DocCard icon={<ClipboardCheck size={24} />} title="Human review">
          <p>
            In <strong>Reviewers &amp; HITL</strong>, switch on <strong>Human review</strong> and
            pick reviewers to pause every inspection before the verdict is final. A failing check can
            also pause the inspection on its own with the <strong>Request review</strong> action.
            Reviewers are notified by email.
          </p>
          <NumberedList
            items={[
              "Open the paused inspection. The review panel shows the failing checks and a Verdict preview.",
              <Fragment key="h2">
                <strong>Waive</strong> any failing check that is acceptable, with a reason (required).
                Waived checks no longer count towards the verdict.
              </Fragment>,
              <Fragment key="h3">
                Click <strong>Approve</strong> to finalise the verdict and send the outputs, or{" "}
                <strong>Reject</strong> to cancel the inspection without a verdict.
              </Fragment>,
            ]}
          />
          <p>
            Every role, including HITL Only, can review. When reviewers are configured, only they can
            approve or reject. See <DocLink href="/docs/human-in-the-loop">Human in the Loop</DocLink>.
          </p>
        </DocCard>

        <DocCard icon={<Send size={24} />} title="Outputs">
          <BulletList
            items={[
              <Fragment key="o1">
                <strong>In-app notification</strong> with the verdict for whoever started the
                inspection.
              </Fragment>,
              <Fragment key="o2">
                <strong>Email Output</strong>: receives the verdict and each check&apos;s result, with
                the PDF report attached.
              </Fragment>,
              <Fragment key="o3">
                <strong>Webhook</strong>: POSTs JSON with <InlineCode>inspection_id</InlineCode>,{" "}
                <InlineCode>inspector_id</InlineCode>, <InlineCode>verdict</InlineCode> and the full
                report in <InlineCode>output_json</InlineCode>. See{" "}
                <DocLink href="/docs/webhooks">Webhooks</DocLink>.
              </Fragment>,
              <Fragment key="o4">
                Per-check <strong>Send email</strong> and <strong>Call webhook</strong> actions fire
                for each failed check that wasn&apos;t waived.
              </Fragment>,
            ]}
          />
          <p>With human review, outputs are sent after approval.</p>
        </DocCard>

        <DocCard icon={<Coins size={24} />} title="Cost">
          <DataTable
            head={["Step", "Credits"]}
            rows={[
              ["Routing each uploaded file into a slot", "1 credit per file, whatever the outcome"],
              ["Extracting each routed document", "The flow's usual extraction charge"],
              ["Evaluating the checklist", "Free"],
              ["Each AI match or AI check condition that is reached", "1 credit per condition, per inspection"],
              ["Suggest checks and Dry run", "Free"],
            ]}
          />
          <p>
            Inspections run from a Subject case reuse existing runs, so only AI conditions are
            charged. See <DocLink href="/docs/credits">Credits</DocLink> for balances and how to add
            more.
          </p>
        </DocCard>

        <DocCard icon={<Code size={24} />} title="API">
          <p>
            Send documents to an inspector with your API key. Copy the ID from{" "}
            <strong>Inspector ID</strong> on the inspector&apos;s page. Each request adds one file;
            leave out <InlineCode>inspection_id</InlineCode> on the first one to open a new
            inspection, then pass the returned ID with the others.
          </p>
          <CodeBlock
            lang="bash"
            code={`curl -X POST https://run.tavnit.io/api/inspectors/<inspector_id>/process \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -F "file=@commercial_invoice.pdf"

curl -X POST https://run.tavnit.io/api/inspectors/<inspector_id>/process \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -F "file=@packing_list.pdf" \\
  -F "inspection_id=<inspection_id>"`}
          />
          <BulletList
            items={[
              <Fragment key="a1">
                The response is <InlineCode>202</InlineCode> with <InlineCode>inspection_id</InlineCode>{" "}
                and <InlineCode>inspection_file_id</InlineCode>. A <InlineCode>402</InlineCode> means
                there isn&apos;t enough balance for the routing credit.
              </Fragment>,
              <Fragment key="a2">
                With the Manual policy, finish with{" "}
                <InlineCode>POST https://run.tavnit.io/api/inspections/&lt;inspection_id&gt;/fire</InlineCode>
                . It returns <InlineCode>400</InlineCode> with <InlineCode>missing_inputs</InlineCode>{" "}
                if a required document hasn&apos;t arrived.
              </Fragment>,
              "Configure a Webhook on the inspector to receive the verdict and report.",
            ]}
          />
          <p>
            Authentication is covered in <DocLink href="/docs/api-integration">API Integration</DocLink>.
          </p>
        </DocCard>

        <DocCard icon={<Users size={24} />} title="Permissions">
          <BulletList
            items={[
              "Admins and Owners create inspectors. Admins, Owners and the inspector's creator can edit or delete it.",
              "Every member except HITL Only can run inspections.",
              "Every role can review paused inspections.",
              "Deleting an inspector also deletes its inspections and their reports.",
            ]}
          />
        </DocCard>

        <DocCard icon={<Wrench size={24} />} title="Troubleshooting">
          <DataTable
            head={["Problem", "What to do"]}
            rows={[
              [
                "New inspection is unavailable",
                "The inspector is inactive. Turn it on with the Active switch in the header, or ask an admin.",
              ],
              [
                "You can't add documents",
                "Documents need an active extraction flow. Create a flow first, then come back.",
              ],
              [
                "A file stays Unmatched",
                "The AI couldn't place it, or its slot is already filled. Assign it by hand, and add a routing hint to the document so future files route correctly.",
              ],
              [
                "The inspection never evaluates",
                "A required document is still missing, its run is still processing, or the policy is Manual. Upload the missing file or click Fire now.",
              ],
              [
                "A check shows Error",
                "A value couldn't be read (missing field, unparsable number or date, invalid pattern). The report shows the values; fix the field in the flow or the condition.",
              ],
              [
                "A blocker was skipped instead of failing",
                "It reads an optional document that was absent, or its guard didn't hold. Make the document required if the check must always run.",
              ],
              [
                "Checks reference a removed document",
                "Point the conditions at another document; until then those checks don't run.",
              ],
              [
                "A date check against Today gives an unexpected result",
                "Today is taken in your organisation's timezone at evaluation time. Check the date element and the operator (After vs On or after).",
              ],
            ]}
          />
        </DocCard>

        <Related
          links={[
            {
              href: "/docs/flows",
              label: "Set up the flows that extract each document",
              description: "The fields your checklist compares come from these flows.",
            },
            {
              href: "/docs/cleaners",
              label: "Normalise values before they are checked",
              description: "Linked Cleaners give the checklist clean dates, amounts and looked-up values.",
            },
            {
              href: "/docs/subjects",
              label: "Run inspectors on Subject cases",
              description: "Bind an inspector to a Subject and run it over each case's documents.",
            },
            {
              href: "/docs/matchers",
              label: "Compare line items across documents",
              description: "Matchers line up items across quotes or invoices and pick a champion.",
            },
          ]}
        />
      </section>
    </>
  );
}
