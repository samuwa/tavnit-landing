import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import { CheckCircle2, ClipboardCheck, Eye, Info, Settings2, Shield } from "lucide-react";
import { BulletList, DocCard, InfoBox, NumberedList } from "@/components/docs/ui";

export const metadata = docMetadata("human-in-the-loop");

export default function Page() {
  return (
    <>
      <DocsPageSchema slug="human-in-the-loop" />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Human in the Loop
        </h1>

        <DocCard icon={<ClipboardCheck size={24} />} title="What is Human in the Loop?">
          <p>
            Human in the Loop (HITL) adds a review checkpoint to your pipeline. When it&apos;s enabled
            on a flow, each run pauses in an <strong>awaiting approval</strong> state after extraction
            and cleaning — before anything is delivered downstream. No email goes out, no webhook
            fires, no Bucket is written until a reviewer approves.
          </p>
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Setting It Up">
          <NumberedList
            items={[
              "Open the flow you want reviewed",
              "Enable Human in the Loop in the flow's settings",
              "Choose one or more reviewers from your team",
              "Save — every new run now pauses for review",
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Review only when something looks off">
            You don&apos;t have to review every run. Cleaner conditional fields can trigger review
            dynamically — for example, only when a total fails validation or a value falls outside
            an expected range.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Eye size={24} />} title="Reviewing a Run">
          <p>
            Reviewers are notified by email the moment a run needs attention, and the review queue
            shows everything waiting. In the review screen you can:
          </p>
          <BulletList
            items={[
              "Edit any cell directly — fix a misread total or date in place",
              "Add or remove rows and columns",
              "Approve the run — your edits are folded in and delivery resumes",
              "Reject the run with a reason — it's cancelled and nothing is delivered",
            ]}
          />
          <InfoBox color="green" icon={<CheckCircle2 size={20} />} title="First approval wins">
            If several reviewers are assigned, the first decision counts — you don&apos;t need
            everyone to sign off.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Shield size={24} />} title="Append-Only Audit Trail">
          <p>
            Every event in a review — reviewer notified, run opened, cell edited, row added,
            approved, rejected — is written to a permanent, append-only audit log. Nothing can be
            deleted or rewritten, so you always know exactly who changed what and when.
          </p>
        </DocCard>
      </section>
    </>
  );
}
