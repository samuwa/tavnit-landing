import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  AlertTriangle,
  BarChart3,
  Clock,
  Coins,
  Gift,
  HelpCircle,
  Mail,
  PiggyBank,
  Receipt,
  Wallet,
} from "lucide-react";
import {
  BulletList,
  DataTable,
  DocCard,
  DocLink,
  InfoBox,
  Lead,
  Related,
  WarningBox,
} from "@/components/docs/ui";

export const metadata = docMetadata("credits");

export default function Page() {
  return (
    <>
      <DocsPageSchema slug="credits" />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
          Credits &amp; Billing
        </h1>

        <DocCard icon={<Wallet size={24} />} title="How credits work">
          <Lead>
            Tavnit bills in credits. Your organisation has one shared balance, and each operation
            that does work — reading pages, routing a document, browsing with an agent — takes
            credits from it. This page is the single list of every price.
          </Lead>
          <BulletList
            items={[
              "The balance belongs to the organisation, not to a user. Everyone's runs draw from it.",
              "Prices are per unit of work — pages, documents, cells, minutes — never per seat.",
              "The balance never goes below zero. When it cannot cover an operation, Tavnit refuses or pauses that operation (see below).",
              "Credits used are not refunded when a run fails or is cancelled.",
            ]}
          />
        </DocCard>

        <DocCard icon={<Coins size={24} />} title="What each operation costs">
          <DataTable
            head={["Operation", "Price", "Notes"]}
            rows={[
              [
                <DocLink key="p1" href="/docs/flows">Flow extraction</DocLink>,
                "1 credit per page",
                "An image counts as one page; a spreadsheet counts by page-equivalents of its first visible sheet. The page count is what matters, not how many rows come out.",
              ],
              [
                <DocLink key="p2" href="/docs/collections">Collection routing</DocLink>,
                "1 credit per document",
                "Charged whatever the router decides, on top of the flow's extraction.",
              ],
              [
                <DocLink key="p3" href="/docs/subjects">Subject routing</DocLink>,
                "Free, or 1 credit per document",
                "Finding the Case by reference or name is free. 1 credit only when the Subject has several document types and AI picks the type.",
              ],
              [
                <DocLink key="p4" href="/docs/splitters">Split</DocLink>,
                "1 credit per page of the source file",
                "However many documents come out. Each segment then pays its own extraction (and routing, if sent to a Collection).",
              ],
              [
                <DocLink key="p5" href="/docs/cleaners">Cleaner sweep</DocLink>,
                "1 credit per 500 non-empty cells",
                "Rounded up, minimum 1. Counted on the sweep's output.",
              ],
              [
                <DocLink key="p6" href="/docs/agents">Agent run</DocLink>,
                "3 credits per minute",
                "Browser time rounded up to the next minute, minimum 1 minute, charged whether the run succeeds or fails.",
              ],
              [
                <DocLink key="p7" href="/docs/matchers">Matcher</DocLink>,
                "1 credit per 200 cells compared",
                "Rounded up, minimum 1. Only the columns the matcher uses count; when every run is compared with every other, each pairing counts.",
              ],
              [
                <DocLink key="p8" href="/docs/inspectors">Inspector</DocLink>,
                "Checklist free; 1 credit per AI comparison",
                "Plain rules cost nothing. Each AI comparison that is evaluated costs 1 credit. Documents uploaded to an inspection pay 1 routing credit each, plus extraction.",
              ],
              [
                <DocLink key="p9" href="/docs/fillers">Filler</DocLink>,
                "Filling free; 1 credit per routed document",
                "Writing the PDFs is free. Documents dropped with Upload & route pay 1 routing credit each, plus extraction.",
              ],
              [
                <DocLink key="p10" href="/docs/signals">Signals (waves)</DocLink>,
                "1 credit per minute of speech",
                "Per started minute of detected speech, minimum 1. Silence cut before transcription is never billed.",
              ],
              [
                <DocLink key="p11" href="/docs/nets">Nets (catches)</DocLink>,
                "Per volume, minimum 1",
                "1 credit per 50 new posts fetched, + 1 per 10 rows kept (posts and comments), + 1 per 5 images read, + 1 per 60 seconds of audio, each part rounded up; minimum 1 if anything was fetched. Failed or cancelled Catches are free, and so are Net tests (40 per organisation per 24 hours).",
              ],
              [
                <DocLink key="p12" href="/docs/pipelines">Pipeline</DocLink>,
                "No charge of its own",
                "Each step pays its own feature price. Drafting a Pipeline with the AI is free; starting a run needs a positive balance.",
              ],
              [
                "Bucket Prompting",
                "1 credit per question",
                "Indexing a column for Prompting costs 1 credit per 500 values indexed, minimum 1.",
              ],
            ]}
          />
          <InfoBox color="green" icon={<Gift size={20} />} title="Free">
            <strong>Human review</strong> (approving, correcting, rejecting), the{" "}
            <strong>AI assistants</strong> that suggest fields, rules, checks and pipeline layouts,
            filling PDF forms, attaching existing runs, and manually assigning held or unmatched
            documents cost no credits.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Clock size={24} />} title="When you are charged">
          <DataTable
            head={["Operation", "Checked", "Charged"]}
            rows={[
              [
                "Flow run",
                "When the run starts",
                "At the start, for the page count. An automatic retry of the same run never pays twice.",
              ],
              ["Collection, inspection or fill routing", "On upload", "When routing starts, whatever the outcome"],
              ["Split, sweep", "Before starting, from an estimate", "When it finishes"],
              ["Matcher", "Before starting", "When it completes — or, with human review on, when a reviewer approves. A rejected match is not charged."],
              ["Agent run", "At least 3 credits to start", "When the run ends, for the minutes used"],
              ["Wave", "Before transcription", "Only if it succeeds"],
              ["Catch", "Before the expensive steps", "Only if it succeeds"],
            ]}
          />
          <p>
            A flow run that pauses for <DocLink href="/docs/human-in-the-loop">human review</DocLink>{" "}
            has already paid for its extraction. Work that runs after approval — a linked Cleaner,
            for instance — is charged then.
          </p>
        </DocCard>

        <DocCard icon={<AlertTriangle size={24} />} title="When the balance runs out">
          <Lead>
            Nothing runs on credit. Operations that cannot be paid for are refused up front, or
            stop cleanly before doing paid work.
          </Lead>
          <DataTable
            head={["Operation", "What happens"]}
            rows={[
              ["Flow run", "Fails with “Insufficient credits”. It is not retried automatically."],
              ["Collection run", "Fails before routing; nothing is processed."],
              ["Subject document", "Held for manual assignment instead of failing (only when AI classification is needed)."],
              ["Split, sweep, matcher, wave, pipeline, Filler or inspection upload", "Refused when you start it; the app shows an Insufficient Credits dialog. A wave can also fail before transcription if its speech minutes cost more than the balance."],
              ["Agent run", "Won't start below 3 credits; scheduled runs are skipped. If credits run out mid-run, the remaining balance is taken and the run notes the partial charge."],
              ["Scheduled catch", "Skipped or failed with “Insufficient credits”."],
            ]}
          />
          <WarningBox>
            Emailed and scheduled work doesn&apos;t wait for a top-up. Keep an eye on the balance
            if you rely on email intake or schedules.
          </WarningBox>
        </DocCard>

        <DocCard icon={<BarChart3 size={24} />} title="Where to see your balance and usage">
          <DataTable
            head={["Where", "What you see"]}
            rows={[
              [
                <Fragment key="w1">
                  <strong>Settings → Billing &amp; Usage</strong> (Owners only)
                </Fragment>,
                "The balance and credits used this month; View details opens Credit Usage for this month or all time, split into extraction, cleaning, splitting and routing. Also your plan, Bucket storage (100 MB per organisation) and the transaction history.",
              ],
              [
                <Fragment key="w2">
                  <strong>Dashboard</strong>
                </Fragment>,
                "The Available Credits tile. When the balance is almost empty it shows a Contact us button.",
              ],
              [
                <Fragment key="w3">
                  <strong>Runs</strong>
                </Fragment>,
                "The Credits Used tile.",
              ],
              [
                "Each feature's own pages",
                "Agent runs, matches, waves and catches show the credits each one used.",
              ],
            ]}
          />
        </DocCard>

        <DocCard icon={<Mail size={24} />} title="Getting more credits">
          <p>
            Self-serve purchase is not open at the moment. To add credits, contact the Tavnit team —
            the <strong>Contact us</strong> button on the Billing &amp; Usage tab, on the
            Dashboard and in the Insufficient Credits dialog opens an email to us.
          </p>
          <p>
            For prices and volume options, see <DocLink href="/pricing">pricing</DocLink> or{" "}
            <DocLink href="/schedule">book a call</DocLink>.
          </p>
        </DocCard>

        <DocCard icon={<PiggyBank size={24} />} title="Spending fewer credits">
          <BulletList
            items={[
              "Send documents straight to a flow when you already know their type — routing adds a credit per document.",
              "Split bundles before extraction only when they really contain several documents.",
              "Give Subjects a single document type where you can, or upload straight into a Case: routing is then free.",
              "Set a short maximum runtime on agents you are still tuning.",
              "Attach existing runs to Fillers and Subject checks instead of uploading documents again.",
            ]}
          />
        </DocCard>

        <DocCard icon={<HelpCircle size={24} />} title="FAQ">
          <DataTable
            head={["Question", "Answer"]}
            rows={[
              [
                "Is a failed run refunded?",
                "No. Extraction is charged when the run starts, and credits used are not refunded.",
              ],
              [
                "Does a cancelled run cost anything?",
                "Yes, the credits already used. A cancelled agent run pays for the minutes it ran.",
              ],
              [
                "Do automatic retries cost extra?",
                "No. A run retried under the same run ID is only charged once.",
              ],
              [
                "Who can see billing?",
                "Only the organisation Owner sees the Billing & Usage tab. Other members see the balance on the Dashboard.",
              ],
              [
                "Does the API or the MCP connector cost more?",
                "No. Work started over the API or MCP costs the same as in the app.",
              ],
            ]}
          />
          <InfoBox color="blue" icon={<Receipt size={20} />} title="Prices on each feature page">
            Every feature page repeats its own prices in a &ldquo;cost&rdquo; section. If they ever
            differ from this page, this page is the reference.
          </InfoBox>
        </DocCard>

        <Related
          links={[
            {
              href: "/docs",
              label: "Getting started",
              description: "Create your first flow and process a document.",
            },
            {
              href: "/docs/user-roles",
              label: "Who can manage billing",
              description: "What Owners, Admins, Members and HITL Only users can do.",
            },
            {
              href: "/docs/agents",
              label: "Agent limits and runtime",
              description: "Maximum runtime and step caps that bound what a run can cost.",
            },
            {
              href: "/docs/api-integration",
              label: "Start work over the REST API",
              description: "Runs started over the API cost the same as in the app.",
            },
          ]}
        />
      </section>
    </>
  );
}
