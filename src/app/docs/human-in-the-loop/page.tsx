import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  Inbox,
  Info,
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
      name: "Open the flow's settings",
      text: "Go to Flows in the Tavnit app, open the flow, and find the Human in the Loop panel in its settings.",
    },
    {
      name: "Switch review on",
      text: "Toggle Human in the Loop on. From that point, new runs of the flow pause instead of delivering their results.",
    },
    {
      name: "Assign reviewers",
      text: "Pick one or more org members as reviewers. Only assigned reviewers can see or act on the flow's paused runs, so a flow with review on and no reviewers assigned will stall.",
    },
    {
      name: "Run a document and check the queue",
      text: "Process one document. It should appear with the status Awaiting review in the Human in the Loop queue of every assigned reviewer.",
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
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Human in the Loop
        </h1>

        <DocCard icon={<ClipboardCheck size={24} />} title="What Human in the Loop does">
          <Lead>
            Human in the Loop puts a review checkpoint between extraction and delivery. A run that
            needs review stops in an <strong>awaiting review</strong> state after extraction and
            cleaning: no email is sent, no webhook fires and no Bucket row is written until a named
            reviewer approves it.
          </Lead>
          <p>
            The important word is <em>before</em>. Review is not a correction you apply after bad
            data has already reached your ERP — the delivery step has not run yet. When the reviewer
            approves, the run resumes from exactly where it paused, carrying their edits.
          </p>
          <BulletList
            items={[
              "High-value data that must be verified before it moves downstream",
              "A compliance requirement for a documented manual approval step",
              "Documents where extraction is usually right but occasionally expensive to get wrong",
              "New suppliers or new formats, until you trust the flow",
            ]}
          />
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Two ways a run gets paused">
          <Lead>
            A run can be sent for review in two ways: the flow-level switch pauses every run, or a
            conditional action inside a Cleaner pauses only the runs that match a rule. Both can be
            active at once, and when they are, the two reviewer lists are combined.
          </Lead>
          <DataTable
            head={["Trigger", "What pauses", "Best for"]}
            rows={[
              [
                "Flow setting",
                "Every run of the flow, regardless of what was extracted.",
                "A document type that always needs sign-off, or a flow you have just built and do not trust yet.",
              ],
              [
                "Cleaner conditional action",
                "Only the runs where a row matched your rule — for example a total above a threshold or a missing tax ID.",
                "High volume where most runs are fine and you only want eyes on the exceptions.",
              ],
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="You do not have to review everything">
            Reviewing every run defeats the point of automating extraction. The conditional route is
            usually the right one: set up a{" "}
            <DocLink href="/docs/cleaners">Cleaner</DocLink> with a Conditional Actions field, give
            it a condition such as <em>total &gt; 10,000</em>, and add the review action. Only
            matching runs stop.
          </InfoBox>
          <p>
            When a Cleaner triggers the pause, Tavnit records which rows and which fields matched.
            The review screen flags exactly those cells, so the reviewer starts at the reason the run
            was held rather than reading the whole table.
          </p>
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Turn on review for a flow">
          <Lead>
            Review is configured per flow, in the flow&apos;s own settings. Only an Owner or Admin
            can change it. Reviewers are picked from your organization&apos;s members.
          </Lead>
          <NumberedList
            items={[
              <Fragment key="f0">
                Open the flow and find the <strong>Human in the Loop</strong> panel in its settings.
              </Fragment>,
              <Fragment key="f1">Toggle review on.</Fragment>,
              <Fragment key="f2">Select one or more reviewers from your org members.</Fragment>,
              <Fragment key="f3">
                Process one document and confirm it lands in the reviewers&apos;{" "}
                <strong>Human in the Loop</strong> queue.
              </Fragment>,
            ]}
          />
          <WarningBox>
            A flow with review switched on and no reviewers assigned will pause runs that nobody can
            approve. The app warns you when you save in that state — assign at least one reviewer
            before you send documents through.
          </WarningBox>
          <InfoBox
            color="violet"
            icon={<Info size={20} />}
            title="With a Cleaner attached, reviewers see cleaned data"
          >
            When the flow has a Cleaner, the pause happens after cleaning, so the table under review
            is the cleaned output — converted currencies, reformatted dates, computed columns and
            all. That is what will be delivered, so it is the right thing to check.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Inbox size={24} />} title="The review queue">
          <Lead>
            Assigned reviewers get an email the moment a run needs attention, and the{" "}
            <strong>Human in the Loop</strong> page in the sidebar lists everything waiting. It is
            filtered to runs assigned to you — reviewers do not see each other&apos;s queues.
          </Lead>
          <BulletList
            items={[
              "Summary figures at the top: how many runs are waiting, how long the oldest has been waiting, your role, and how many flows are contributing",
              "One card per run with the filename, the flow it came from, when it arrived and its status",
              "Newest first",
              "A dot on the sidebar icon whenever something is waiting for you, refreshed automatically",
            ]}
          />
        </DocCard>

        <DocCard icon={<SplitSquareHorizontal size={24} />} title="Reviewing a run">
          <Lead>
            The review screen is a split view: the extracted table on the left, the original document
            on the right. You check a value against the source without leaving the page, correct it
            in place, and approve. The divider is draggable, and on mobile you toggle between the two
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
                "Select by dragging, Shift-clicking, or clicking a column header, then apply one value to the selection.",
              ],
              ["Drop a row from the output", "Untick it — excluded rows are not delivered."],
              ["Add or remove a column", "Use the toolbar. A removed column can be restored before you approve."],
              ["See what triggered the pause", "Rows a Cleaner rule matched are flagged."],
              ["See what you changed", "Edited cells stay highlighted until you approve."],
            ]}
          />
          <BulletList
            items={[
              "The document panel handles PDFs with page navigation as well as image files",
              "Fit-to-width, fit-to-height and manual zoom; drag to pan",
              "Ctrl/Cmd + and − to zoom, Ctrl/Cmd + 0 to reset",
            ]}
          />
        </DocCard>

        <DocCard icon={<CheckCircle2 size={24} />} title="Approving and rejecting">
          <Lead>
            Approving folds your edits into the run and releases it downstream. Rejecting cancels the
            run and delivers nothing. Both decisions are final for that run: the pause is a
            one-time gate, not a state you can toggle back and forth.
          </Lead>
          <DataTable
            head={["Decision", "What happens to the run", "What is delivered"]}
            rows={[
              [
                "Approve",
                "Your edited table replaces the extracted output and the run resumes to completion.",
                <Fragment key="f4">
                  Everything the flow is configured to do, in order: email output, webhook,{" "}
                  <DocLink href="/docs/buckets">Bucket</DocLink> export, form filling.
                </Fragment>,
              ],
              [
                "Reject",
                "The run is cancelled and your reason is recorded.",
                "Nothing. No email, no webhook, no Bucket row.",
              ],
            ]}
          />
          <InfoBox color="green" icon={<CheckCircle2 size={20} />} title="The first decision wins">
            You do not need every assigned reviewer to sign off. The first approval or rejection
            resolves the run; if a second reviewer had it open, their decision is refused because the
            run is no longer awaiting review. Refresh the queue to see the current state.
          </InfoBox>
          <InfoBox
            color="yellow"
            icon={<AlertTriangle size={20} />}
            title="Approval can fail on credits"
          >
            Some downstream steps consume credits when the run resumes. If the balance has run out
            while the run was waiting, the approval is refused rather than half-completed. Top up and
            approve again.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Eye size={24} />} title="Who can review">
          <Lead>
            Only members explicitly assigned as reviewers on a flow can see or act on that
            flow&apos;s paused runs. Being an Admin is not enough on its own — an Admin who is not on
            the reviewer list does not get the run in their queue and cannot approve it.
          </Lead>
          <BulletList
            items={[
              "Reviewer lists are managed per flow, by an Owner or an Admin",
              "A Cleaner's review action carries its own reviewer list, which is combined with the flow's",
              "A reviewer's queue shows only the runs they are assigned to",
            ]}
          />
          <p>
            See <DocLink href="/docs/user-roles">user roles and permissions</DocLink> for what each
            role can change.
          </p>
        </DocCard>

        <DocCard icon={<Shield size={24} />} title="The append-only audit trail">
          <Lead>
            Every action in a review is written to a permanent, append-only log with a timestamp and
            the reviewer&apos;s identity. Entries cannot be edited or deleted, so the record of who
            changed what — and what the data looked like before they touched it — survives the
            review.
          </Lead>
          <DataTable
            head={["Recorded event", "When it is written"]}
            rows={[
              ["Reviewers notified", "The run enters the review queue."],
              ["Run viewed", "A reviewer opens the review screen."],
              ["Cell edited", "A value is changed, with the old and new value."],
              ["Row added / row removed", "The reviewer adds or drops a row."],
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

        <Related
          links={[
            {
              href: "/docs/cleaners",
              label: "Trigger review conditionally with a Cleaner",
              description:
                "Conditional Actions let you pause only the runs that break a rule, instead of all of them.",
            },
            {
              href: "/docs/user-roles",
              label: "User roles and permissions",
              description: "Who can assign reviewers, and what a reviewer can do elsewhere in Tavnit.",
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
