import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  HelpCircle,
  Inbox,
  Info,
  Layers,
  PenLine,
  Settings2,
  Shield,
  SplitSquareHorizontal,
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

export const metadata = docMetadata("human-in-the-loop");

/** Mirrors the visible numbered steps under "Turn on review for a flow". */
const HOW_TO = {
  name: "Add a human review step to a Tavnit flow",
  description:
    "Enable Human in the Loop on a flow and assign reviewers so every run pauses for approval before its results are delivered downstream.",
  steps: [
    {
      name: "Open the flow's Human in the Loop panel",
      text: "Go to Flows in the Tavnit app, open the flow, and select the Human in the Loop panel in its sidebar.",
    },
    {
      name: "Switch review on",
      text: "Toggle Human in the Loop on. From that point, new runs of the flow pause instead of delivering their results.",
    },
    {
      name: "Assign reviewers",
      text: "Under Reviewers, pick one or more members of your organization. Only assigned reviewers can approve or reject the flow's paused runs.",
    },
    {
      name: "Run a document and check the queue",
      text: "Process one document. It should appear as Awaiting review in the Human in the Loop queue of every assigned reviewer.",
    },
  ],
};

export default function Page() {
  return (
    <>
      <DocsPageSchema
          slug="human-in-the-loop"
          howTo={HOW_TO}
          primaryImage={{
            url: "/assets/docs-hitl-review-2026-08.jpg",
            caption:
              "The Tavnit human review screen: an editable data grid beside the source document, with Approve and Reject actions.",
            width: 1327,
            height: 801,
          }}
        />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
          Human in the Loop
        </h1>

        <DocCard icon={<ClipboardCheck size={24} />} title="What Human in the Loop does">
          <Lead>
            Human in the Loop puts a review checkpoint between extraction and delivery. A run that
            needs review stops after extraction and cleaning with the status{" "}
            <strong>Awaiting approval</strong>: no email is sent, no webhook fires, no Bucket row is
            written and no linked agent starts until a named reviewer approves it.
          </Lead>
          <p>
            The important word is <em>before</em>. Review is not a correction you apply after bad
            data has already reached your ERP; the delivery step has not run yet. When the reviewer
            approves, the run resumes from exactly where it paused, carrying their edits.
          </p>
          <BulletList
            items={[
              "High-value data that must be verified before it moves downstream",
              "A compliance requirement for a documented manual approval step",
              "Documents where extraction is usually right but occasionally expensive to get wrong",
              "Values only a person can supply, such as an internal cost center or an approval code",
              "New suppliers or new formats, until you trust the flow",
            ]}
          />
          <p>
            Flow runs are the main case, but the same queue also collects paused{" "}
            <DocLink href="/docs/matchers">matches</DocLink>,{" "}
            <DocLink href="/docs/inspectors">inspections</DocLink> and{" "}
            <DocLink href="/docs/fillers">fills</DocLink>. See{" "}
            <em>Other things that wait for review</em> below.
          </p>
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Three ways a flow run gets paused">
          <Lead>
            The flow-level switch is one way to send runs for review, not the only one. A{" "}
            <DocLink href="/docs/cleaners">Cleaner</DocLink> attached to the flow can pause runs on
            its own, even with the switch off. When several triggers apply to the same run, their
            reviewer lists are combined.
          </Lead>
          <DataTable
            head={["Trigger", "What pauses", "Best for"]}
            rows={[
              [
                "Flow setting (Human in the Loop panel)",
                "Every run of the flow, regardless of what was extracted.",
                "A document type that always needs sign-off, or a flow you have just built and do not trust yet.",
              ],
              [
                "Cleaner Conditional Actions rule with the Human in the Loop action",
                "Only the runs where a row matched the rule, for example a total above a threshold or a missing tax ID.",
                "High volume where most runs are fine and you only want eyes on the exceptions.",
              ],
              [
                "Cleaner Human Input field",
                "Every run that goes through the Cleaner, because a person has to type or pick the value.",
                "Data that is not in the document at all and has to be added by someone.",
              ],
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="You do not have to review everything">
            Reviewing every run defeats the point of automating extraction. The conditional route is
            usually the right one: in the Cleaner, add a Conditional Actions field, give it a
            condition such as <em>total &gt; 10,000</em>, add the Human in the Loop action and pick
            its reviewers. Only matching runs stop. The flow switch can stay off.
          </InfoBox>
          <p>
            When a Cleaner rule triggers the pause, Tavnit records which rows and which fields
            matched. The review screen flags exactly those cells, so the reviewer starts at the reason
            the run was held rather than reading the whole table. If the rule is fed by an Anomaly
            Check field, the reviewer also sees why each value was flagged.
          </p>
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Turn on review for a flow">
          <Lead>
            The flow switch lives in the flow&apos;s own settings. Only an Owner or Admin can change
            it. Reviewers are picked from your organization&apos;s members.
          </Lead>
          <NumberedList
            items={[
              <Fragment key="f0">
                Open the flow and select the <strong>Human in the Loop</strong> panel in its sidebar.
              </Fragment>,
              <Fragment key="f1">Toggle review on.</Fragment>,
              <Fragment key="f2">
                Under <strong>Reviewers</strong>, pick one or more members of your organization.
              </Fragment>,
              <Fragment key="f3">
                Process one document and confirm it appears as <strong>Awaiting review</strong> in
                the reviewers&apos; <strong>Human in the Loop</strong> queue.
              </Fragment>,
            ]}
          />
          <WarningBox>
            With review switched on and no reviewers assigned, the panel warns{" "}
            <em>&ldquo;No reviewers selected — approvals won&apos;t reach anyone.&rdquo;</em> Paused
            runs then have nobody who can approve them. Assign at least one reviewer before you send
            documents through.
          </WarningBox>
          <InfoBox
            color="violet"
            icon={<Info size={20} />}
            title="With a Cleaner attached, reviewers see cleaned data"
          >
            When the flow has a Cleaner, the pause happens after cleaning, so the table under review
            is the cleaned output, with converted currencies, reformatted dates and computed columns.
            That is what will be delivered, so it is the right thing to check.
          </InfoBox>
        </DocCard>

        <DocCard icon={<PenLine size={24} />} title="Human Input fields">
          <Lead>
            A Human Input field is a Cleaner column that is never extracted: a reviewer fills it in on
            the review screen. Use it for a cost center, a GL account, an internal approval code, or
            anything else the document cannot tell you.
          </Lead>
          <DataTable
            head={["Option", "What it does"]}
            rows={[
              ["Free text", "The reviewer types the value."],
              [
                "Menu",
                "The reviewer picks from the distinct values of a Bucket column (Options Bucket and Options Column), optionally filtered by conditions, including conditions on the current row's fields.",
              ],
              [
                "Value is mandatory",
                "Approval is blocked until every row has a value. Turn it off to allow blanks.",
              ],
              ["Reviewers", "Who may fill the field and approve; combined with the flow's reviewers."],
            ]}
          />
          <p>
            Every run that goes through a Cleaner with a Human Input field pauses for review, whether
            or not the flow switch is on. On the review screen the column is marked{" "}
            <strong>Needs human input</strong> with a count of rows filled, and Approve stays blocked
            (<em>&ldquo;Fill all required human input values to approve&rdquo;</em>) until every
            mandatory value is in.
          </p>
        </DocCard>

        <DocCard icon={<Inbox size={24} />} title="The review queue">
          <Lead>
            The <strong>Human in the Loop</strong> page in the sidebar lists everything waiting for
            you, newest first. It shows only items you are a reviewer on; reviewers do not see each
            other&apos;s queues.
          </Lead>
          <BulletList
            items={[
              "Summary figures at the top: Awaiting Review, Oldest Pending, Your Role, and Flows With HITL",
              "One card per item: the file name and flow for a run, with a Match or Fill chip for those kinds, and the status Awaiting review",
              "A red dot on the sidebar icon whenever something is waiting for you. It updates in real time, without refreshing the page",
              "Assigned reviewers also get an email with a direct link the moment a run, match, inspection or fill needs them",
            ]}
          />
        </DocCard>

        <DocCard icon={<SplitSquareHorizontal size={24} />} title="Reviewing a run">
          <Lead>
            The review screen is a split view: the extracted table on the left, the original document
            on the right. You check a value against the source without leaving the page, correct it
            in place, and approve. The divider is draggable, and on mobile you switch between the two
            panels.
          </Lead>
          <Screenshot
            src="/assets/docs-hitl-review-2026-08.jpg"
            alt="The Tavnit review screen for a run awaiting review: an editable data grid on the left showing Subtotal, Amount and Weight columns with row checkboxes, the source invoice rendered on the right, and Reject and Approve buttons in the header."
            caption="A run awaiting review. The grid on the left is the cleaned output that will be delivered; the source document sits alongside it for checking."
          />
          <DataTable
            head={["In the data grid you can", "How"]}
            rows={[
              ["Edit a value", "Double-click the cell and type."],
              [
                "Change many cells at once",
                "Select by dragging, Shift-clicking, or clicking a column header, then Apply to selected.",
              ],
              ["Drop a row from the output", "Untick it. Excluded rows are not delivered."],
              ["Add or remove a column", "Use Add column or Remove column. A removed column can be restored before you approve."],
              ["See what triggered the pause", "Cells a Cleaner rule matched are flagged."],
              ["Fill Human Input fields", "Type the value, or pick it from the menu."],
              ["See what you changed", "Edited cells stay highlighted until you approve."],
            ]}
          />
          <BulletList
            items={[
              "The document panel shows PDFs with page navigation as well as image files; spreadsheets can be downloaded",
              "Fit to width, Fit to height and manual zoom; drag to pan",
              "Ctrl/Cmd + and − to zoom, Ctrl/Cmd + 0 to reset",
            ]}
          />
        </DocCard>

        <DocCard icon={<CheckCircle2 size={24} />} title="Approving and rejecting">
          <Lead>
            Approving folds your edits into the run and releases it downstream. Rejecting cancels the
            run and delivers nothing. Both decisions are final for that run: the pause is a one-time
            gate, not a state you can toggle back and forth.
          </Lead>
          <DataTable
            head={["Decision", "What happens to the run", "What is delivered"]}
            rows={[
              [
                "Approve",
                "Your edited table replaces the extracted output and the run resumes to Completed, with a HITL Approved badge.",
                <Fragment key="f4">
                  Everything the flow is configured to do: email output, webhook,{" "}
                  <DocLink href="/docs/buckets">Bucket</DocLink> export, form filling and a linked{" "}
                  <DocLink href="/docs/agents">agent</DocLink>, all with the approved data.
                </Fragment>,
              ],
              [
                "Reject",
                "The run becomes Cancelled, with a HITL Rejected badge, and your reason (optional but recommended) is recorded.",
                "Nothing. No email, no webhook, no Bucket row, no agent run.",
              ],
            ]}
          />
          <InfoBox color="green" icon={<CheckCircle2 size={20} />} title="The first decision wins">
            You do not need every assigned reviewer to sign off. The first approval or rejection
            resolves the run; if a second reviewer had it open, their decision is refused because the
            run is no longer awaiting approval. Refresh the queue to see the current state.
          </InfoBox>
          <p>
            The run&apos;s page shows who decided (<strong>Approved by</strong> or{" "}
            <strong>Rejected by</strong>).
          </p>
        </DocCard>

        <DocCard icon={<Layers size={24} />} title="Other things that wait for review">
          <Lead>
            Matchers, Inspectors and Fillers have their own review settings, and their paused items
            land in the same queue, with the same first-decision-wins rule and the same audit trail.
          </Lead>
          <DataTable
            head={["Item", "When it pauses", "What the reviewer does"]}
            rows={[
              [
                <DocLink key="o0" href="/docs/matchers">Match</DocLink>,
                "When human review is turned on for the Matcher: every match.",
                "Checks and corrects the AI pairing of rows across documents, can exclude rows, then approves or rejects.",
              ],
              [
                <DocLink key="o1" href="/docs/inspectors">Inspection</DocLink>,
                "When human review is on for the Inspector, or when a failing check requests review through its on-fail actions.",
                "Waives failing checks with a reason, then approves to finalise the verdict, or rejects to cancel the inspection.",
              ],
              [
                <DocLink key="o2" href="/docs/fillers">Fill</DocLink>,
                "When human review is on for the Filler, or whenever it has Human fill fields mapped.",
                "Reviews the filled forms, types the Human fill values, then approves to release the forms, or rejects.",
              ],
            ]}
          />
        </DocCard>

        <DocCard icon={<Eye size={24} />} title="Who can review">
          <Lead>
            Only the people assigned as reviewers can approve or reject a flow run. Being an Admin is
            not enough on its own: an Admin who is not on the reviewer list does not get the run in
            their queue and cannot approve it.
          </Lead>
          <BulletList
            items={[
              "Flow reviewer lists are managed by an Owner or an Admin",
              "A Cleaner's Human in the Loop action and each Human Input field carry their own reviewers, combined with the flow's",
              "Any member can be a reviewer, whatever their role",
              "The HITL Only role is made for reviewers: those members see only the Human in the Loop queue and can review, but cannot run or change anything else",
            ]}
          />
          <p>
            See <DocLink href="/docs/user-roles">user roles and permissions</DocLink> for what each
            role can change.
          </p>
        </DocCard>

        <DocCard icon={<Shield size={24} />} title="The append-only audit trail">
          <Lead>
            Every review action is written to a permanent, append-only log with a timestamp and the
            reviewer&apos;s identity. Entries cannot be edited or deleted, so the record of who
            changed what, and what the data looked like before they touched it, survives the review.
          </Lead>
          <DataTable
            head={["Recorded event", "When it is written"]}
            rows={[
              ["Reviewers notified", "The run enters the review queue and the reviewers are emailed."],
              ["Cell edited", "A value is changed, with the old and new value."],
              ["Row added / row removed", "The reviewer adds a row or excludes one."],
              ["Column added / column removed", "The reviewer changes the table's shape."],
              ["Approved", "The decision, the reviewer, and how many edits were made."],
              ["Rejected", "The decision, the reviewer, and the reason given."],
            ]}
          />
          <InfoBox color="purple" icon={<Shield size={20} />} title="The pre-review data is kept too">
            Tavnit stores the output as it was before the reviewer touched it, alongside the approved
            version. An auditor can compare the extraction against the delivered result without
            reconstructing it from the event log.
          </InfoBox>
        </DocCard>

        <DocCard icon={<HelpCircle size={24} />} title="Troubleshooting">
          <DataTable
            head={["Symptom", "Likely cause and fix"]}
            rows={[
              [
                "Runs pause although the flow switch is off",
                "The flow's Cleaner has a Conditional Actions rule with the Human in the Loop action, or a Human Input field.",
              ],
              [
                "A run is Awaiting approval but not in my queue",
                "You are not on its reviewer list. Ask an Owner or Admin to add you to the flow (or to the Cleaner rule that paused it).",
              ],
              [
                "Approve is refused as not a configured reviewer",
                "Only assigned reviewers can decide. If no reviewer was assigned, add one on the flow; nobody else can release the run.",
              ],
              [
                "Approve is refused because the run is not awaiting approval",
                "Another reviewer decided first. Refresh the queue.",
              ],
              [
                "Approve is blocked with missing human input",
                "A mandatory Human Input field is still empty in some rows. Fill them, or make the field optional in the Cleaner.",
              ],
              [
                "The linked agent did not run",
                "It runs only after approval. A rejected run never starts it.",
              ],
            ]}
          />
          <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Review is not free of time">
            A paused run waits as long as it takes. If results feed a time-sensitive process, make
            sure reviewers watch their queue or their email, or narrow the pause to the exceptions
            with a Cleaner rule.
          </InfoBox>
        </DocCard>

        <Related
          links={[
            {
              href: "/docs/cleaners",
              label: "Trigger review conditionally with a Cleaner",
              description:
                "Conditional Actions pause only the runs that break a rule; Human Input fields collect values from a reviewer.",
            },
            {
              href: "/docs/user-roles",
              label: "User roles and permissions",
              description: "Who can assign reviewers, and what the HITL Only role can do.",
            },
            {
              href: "/docs/agents",
              label: "Act on approved data with agents",
              description: "A linked agent starts only after the reviewer approves.",
            },
            {
              href: "/docs/webhooks",
              label: "Deliver approved results with webhooks",
              description: "What fires once a reviewer approves, and what never fires if they reject.",
            },
            {
              href: "/docs/buckets",
              label: "Store approved data in Buckets",
              description: "The structured tables that only receive rows a reviewer signed off on.",
            },
          ]}
        />
      </section>
    </>
  );
}
