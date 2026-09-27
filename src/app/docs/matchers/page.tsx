import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  AlertTriangle,
  ClipboardCheck,
  Code,
  Coins,
  FilePlus,
  FlaskConical,
  Info,
  Lightbulb,
  Play,
  Scale,
  Send,
  Table2,
  Target,
  Trophy,
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

export const metadata = docMetadata("matchers");

export default function Page() {
  return (
    <>
      <DocsPageSchema slug="matchers" />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
          Matchers
        </h1>

        <DocCard icon={<Target size={24} />} title="What is a Matcher?">
          <Lead>
            A Matcher compares the line items of several documents side by side. It lines up the
            rows that describe the same item, even when each document words it differently, puts
            their prices or quantities in one table and marks the winner of every row.
          </Lead>
          <p>
            A Matcher sits on top of one <DocLink href="/docs/flows">flow</DocLink>. The flow does
            the extraction; the Matcher reads the results of two or more completed runs of that
            flow and builds one comparison. Each execution is called a <strong>Match</strong>. Three
            supplier quotes for the same request, for example, become one table with a price column
            per supplier and a <strong>Champion</strong> column naming the cheapest supplier on each
            line.
          </p>
          <InfoBox color="violet" icon={<FlaskConical size={20} />} title="Beta">
            Matchers are in beta. They are available to every organisation, and the way they work
            may still change.
          </InfoBox>
          <InfoBox color="blue" icon={<Info size={20} />} title="Try it without an account">
            The free <DocLink href="/tools/po-vs-invoice-check">PO vs invoice check</DocLink> and{" "}
            <DocLink href="/tools/compare-supplier-quotes">Compare supplier quotes</DocLink> tools on
            Tavnit Lite run on Matchers.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Lightbulb size={24} />} title="When to use a Matcher">
          <BulletList
            items={[
              "Comparing quotes from several suppliers for the same list of items and picking the cheapest per line",
              "Checking an invoice against its purchase order, line by line, to catch price differences",
              "Benchmarking new offers against a reference price list or a previous order",
              "Finding the highest value per item across documents, such as the best rebate or the largest quantity",
            ]}
          />
          <p>
            If you need pass or fail rules across different kinds of documents (dates, totals,
            references) rather than a line-by-line price table, use an{" "}
            <DocLink href="/docs/inspectors">Inspector</DocLink> instead.
          </p>
        </DocCard>

        <DocCard icon={<Table2 size={24} />} title="Field roles">
          <Lead>
            A Matcher is defined by the role each field of its flow plays. The options come from the
            flow you pick, filtered by what each role accepts.
          </Lead>
          <DataTable
            head={["Setting", "What it is", "Which fields qualify"]}
            rows={[
              [
                <strong key="r1">Identifier field</strong>,
                "Names each participant, for example Supplier. Every run becomes one participant. If a run has several values, the first is used.",
                "Metadata fields only",
              ],
              [
                <strong key="r2">Match field</strong>,
                "The text that is matched across runs, for example Item Description. Matching is by meaning, not exact text.",
                "Table fields",
              ],
              [
                <strong key="r3">Comparison field</strong>,
                "The number the champion rule evaluates, for example Unit Price.",
                "Numeric table fields",
              ],
              [
                <strong key="r4">Context fields (optional)</strong>,
                "Extra columns, such as unit of measure or pack size, shown to the AI so that unlike items don't merge.",
                "Any remaining field",
              ],
              [
                <strong key="r5">Champion rule</strong>,
                <Fragment key="r5b">
                  <strong>Lowest wins</strong> or <strong>Highest wins</strong>. Picks the winner
                  of each matched row. Ties name every winner.
                </Fragment>,
                "—",
              ],
            ]}
          />
          <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="The flow needs the right fields">
            The identifier must be a metadata field and the comparison field must be a numeric
            table field. If the flow has neither, the builder tells you so. Add the fields to the
            flow first (for example a <InlineCode>Supplier</InlineCode> metadata field and a{" "}
            <InlineCode>Unit Price</InlineCode> number column). Composite fields can&apos;t be used.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Scale size={24} />} title="Benchmark and Multilateral modes">
          <DataTable
            head={["Mode", "How it compares", "Which rows appear"]}
            rows={[
              [
                <strong key="m1">Benchmark</strong>,
                "One run is the benchmark and every other run is compared to it. You choose the benchmark run each time you run a match.",
                "One row per benchmark item. For each other participant, the best-matching item fills its columns. Items that match nothing in the benchmark are left out.",
              ],
              [
                <strong key="m2">Multilateral</strong>,
                "All runs are compared to each other, and the best mixed matches win.",
                "Every item appears. Items found in several runs share a row; an item that matches nothing gets its own row.",
              ],
            ]}
          />
          <p>
            Use <strong>Benchmark</strong> when one document is the reference (a purchase order, your
            price list, last year&apos;s contract). Use <strong>Multilateral</strong> when the
            documents are peers, such as quotes from competing suppliers.
          </p>
        </DocCard>

        <DocCard icon={<FilePlus size={24} />} title="Creating a Matcher">
          <NumberedList
            items={[
              <Fragment key="c1">
                Go to <strong>Matchers</strong> in the main navigation and click{" "}
                <strong>New Matcher</strong>.
              </Fragment>,
              <Fragment key="c2">
                Answer &ldquo;Which flow&apos;s runs will you compare?&rdquo;:{" "}
                <strong>From a flow</strong> (pick the flow and a name, then click{" "}
                <strong>Next</strong>), <strong>From an existing matcher</strong> (duplicates its
                configuration with <strong>Create copy</strong>) or <strong>Start from scratch</strong>.
              </Fragment>,
              <Fragment key="c3">
                In <strong>Matcher Info</strong>, check the name (at least 3 characters), add an
                optional description and confirm the <strong>Flow</strong>. All compared runs must
                belong to this flow.
              </Fragment>,
              <Fragment key="c4">
                In <strong>Fields</strong>, choose the <strong>Mode</strong>, the{" "}
                <strong>Identifier field</strong>, <strong>Match field</strong>,{" "}
                <strong>Comparison field</strong>, the <strong>Champion rule</strong> and any{" "}
                <strong>Context fields</strong>.
              </Fragment>,
              <Fragment key="c5">
                Optionally fill in <strong>Email Output</strong> and <strong>Webhook</strong> (the URL
                must start with <InlineCode>https://</InlineCode>), and switch on{" "}
                <strong>Human in the Loop</strong> if every match should wait for a reviewer.
              </Fragment>,
              <Fragment key="c6">
                Click <strong>Create Matcher</strong>. You land on the matcher&apos;s page, where
                you can pick reviewers and run your first match.
              </Fragment>,
            ]}
          />
          <p>
            On the matcher&apos;s page, <strong>Configuration</strong> lets you edit the mode and
            field roles later, <strong>Match History</strong> lists every match it has run, and{" "}
            <strong>Matcher ID</strong> shows the identifier you need for the API. Each match keeps
            a snapshot of the configuration it ran with, so editing the matcher doesn&apos;t change
            past results.
          </p>
        </DocCard>

        <DocCard icon={<Play size={24} />} title="Running a Match">
          <NumberedList
            items={[
              <Fragment key="p1">
                Make sure the documents have been processed by the matcher&apos;s flow and their
                runs are <strong>Completed</strong>.
              </Fragment>,
              <Fragment key="p2">
                On the matcher&apos;s page, click <strong>Run Match</strong>.
              </Fragment>,
              "Tick at least two completed runs of the flow.",
              <Fragment key="p4">
                For a Benchmark matcher, click the star on one of the selected runs to make it the{" "}
                <strong>Benchmark run</strong>.
              </Fragment>,
              <Fragment key="p5">
                Click <strong>Start Match</strong>. The match is queued and its page opens, showing
                progress until the comparison table is ready.
              </Fragment>,
            ]}
          />
          <p>You can also start matches in other ways:</p>
          <BulletList
            items={[
              <Fragment key="o1">
                <strong>By email.</strong> In <strong>Email Trigger</strong>, switch the trigger on
                and copy the <strong>Inbox Address</strong>. Email two or more documents (PDF or
                images) to it: each attachment becomes a run of the flow, and the match starts once
                they have all finished. The results are sent back as a reply in the same thread, with
                the table attached as CSV and a PDF report. Email-triggered matches always run in
                Multilateral mode. Use <strong>Allowed Senders</strong> to limit who can trigger it.
              </Fragment>,
              <Fragment key="o2">
                <strong>From a Subject case.</strong> When a matcher is bound to a{" "}
                <DocLink href="/docs/subjects">Subject</DocLink>, the case page lists it under{" "}
                <strong>Checks</strong> with a <strong>Run</strong> button that uses the case&apos;s
                completed runs of the matcher&apos;s flow.
              </Fragment>,
              <Fragment key="o3">
                <strong>In a Pipeline</strong>, as a node fed by the runs of upstream flows. See{" "}
                <DocLink href="/docs/pipelines">Pipelines</DocLink>.
              </Fragment>,
              <Fragment key="o4">
                <strong>Over the API</strong>, described below.
              </Fragment>,
            ]}
          />
          <DataTable
            head={["Status", "Meaning"]}
            rows={[
              ["Queued / Running", "The match is waiting for a worker or comparing rows across runs."],
              ["Waiting for documents", "An email-triggered match is waiting for its documents to finish processing."],
              ["Awaiting approval", "Human review is on and a reviewer must approve the pairing."],
              ["Completed", "The comparison table is ready and outputs have been sent."],
              ["Failed", "The match could not run. The error message says why."],
              ["Cancelled", "A reviewer rejected the match."],
            ]}
          />
        </DocCard>

        <DocCard icon={<Trophy size={24} />} title="Reading the result">
          <Lead>
            A completed match shows a <strong>Comparison Table</strong> with two columns per
            participant and a <strong>Champion</strong> column at the end.
          </Lead>
          <p>
            Participant columns are named after the fields and the identifier value: with a match
            field <InlineCode>Item Description</InlineCode>, a comparison field{" "}
            <InlineCode>Unit Price</InlineCode> and a supplier called ACME, you get{" "}
            <InlineCode>Item Description-ACME</InlineCode> and <InlineCode>Unit Price-ACME</InlineCode>.
            A blank pair means that participant had no matching item on that row. The winning
            participant&apos;s columns are highlighted.
          </p>
          <DataTable
            head={["Item Description-ACME", "Unit Price-ACME", "Item Description-Globex", "Unit Price-Globex", "Champion"]}
            rows={[
              ["Steel bolt M8 x 40", "0.42", "Bolt M8x40 zinc", "0.39", "Globex"],
              ["Hex nut M8", "0.10", "Nut, hex, M8", "0.10", "ACME, Globex"],
              ["Washer 8 mm", "0.05", "", "", "ACME"],
            ]}
            caption="An example Multilateral result with the Lowest wins rule. Tied rows name every winner."
          />
          <p>Above the table you will find:</p>
          <BulletList
            items={[
              <Fragment key="t1">
                <strong>Rows</strong>, <strong>Credits</strong> and <strong>Cells</strong>: the size
                of the result and what it cost.
              </Fragment>,
              <Fragment key="t2">
                <strong>Warnings</strong>: for example a run excluded because its identifier field
                was empty, two runs merged because they share an identifier, or a comparison value
                that isn&apos;t a number and was left out of the championship.
              </Fragment>,
              <Fragment key="t3">
                <strong>Match Info</strong>: matcher, mode, runs, creation time and, for email
                matches, the sender.
              </Fragment>,
              <Fragment key="t4">
                Exports: <strong>Export to Bucket</strong>, <strong>CSV</strong>,{" "}
                <strong>JSON</strong> and a <strong>PDF</strong> report.
              </Fragment>,
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="How rows are paired">
            Tavnit compares the match field (plus any context fields) by meaning. Confident pairs
            are accepted automatically; borderline ones are checked by an AI model that treats
            size, unit and pack differences as significant: a 12-pack is not the same item as a
            single unit. When in doubt, items stay apart. If two rows from the same participant
            end up in one group, the first one is used.
          </InfoBox>
        </DocCard>

        <DocCard icon={<ClipboardCheck size={24} />} title="Human review of matches">
          <p>
            Switch on <strong>Human in the Loop</strong> on the matcher and pick the reviewers.
            Every match then pauses at <strong>Awaiting approval</strong> before its results are
            released, and the reviewers are notified by email. Only the reviewers you pick can
            approve or reject.
          </p>
          <NumberedList
            items={[
              <Fragment key="h1">
                Open the match from <strong>Human in the Loop</strong> (or click{" "}
                <strong>Review</strong> on the match page).
              </Fragment>,
              <Fragment key="h2">
                The <strong>Match Review</strong> board shows one column per participant, with the
                AI&apos;s pairings drawn as lines and the source documents alongside.
              </Fragment>,
              "Click a card, then a card in another column, to connect them. Click a line to break a link. Use the X to exclude a row from the results entirely.",
              <Fragment key="h4">
                Click <strong>Approve</strong> or <strong>Reject</strong>.
              </Fragment>,
            ]}
          />
          <DataTable
            head={["Decision", "What happens"]}
            rows={[
              [
                "Approve",
                "The comparison table and Champion column are rebuilt from your corrected links, credits are charged, and outputs are sent.",
              ],
              ["Reject", "The match is cancelled with your reason. No credits are charged and no outputs are sent."],
            ]}
          />
          <p>
            Members with the <strong>HITL Only</strong> role can review but can&apos;t create
            matchers or run matches. See{" "}
            <DocLink href="/docs/human-in-the-loop">Human in the Loop</DocLink>.
          </p>
        </DocCard>

        <DocCard icon={<Send size={24} />} title="Outputs">
          <BulletList
            items={[
              <Fragment key="u1">
                <strong>In-app notification</strong> to whoever started the match.
              </Fragment>,
              <Fragment key="u2">
                <strong>Email Output</strong>: the address receives an email when a match completes,
                with the comparison table attached as CSV.
              </Fragment>,
              <Fragment key="u3">
                <strong>Webhook</strong>: a POST with the table as JSON (<InlineCode>columns</InlineCode>,{" "}
                <InlineCode>rows</InlineCode>, <InlineCode>row_warnings</InlineCode>,{" "}
                <InlineCode>warnings</InlineCode>) plus <InlineCode>match_id</InlineCode> and{" "}
                <InlineCode>matcher_id</InlineCode>. See <DocLink href="/docs/webhooks">Webhooks</DocLink>.
              </Fragment>,
            ]}
          />
          <p>With human review on, outputs are sent only after approval.</p>
        </DocCard>

        <DocCard icon={<Coins size={24} />} title="Cost">
          <p>
            A match is billed by <strong>cells</strong>: the non-empty values in the identifier,
            match, comparison and context fields of the runs it compares. Every 200 cells cost 1
            credit, rounded up, with a minimum of 1 credit per match.
          </p>
          <BulletList
            items={[
              "Benchmark: each run's cells are counted once.",
              "Multilateral: every run is compared with every other, so the cells are counted once per pairing, which is the total multiplied by the number of runs minus one. Three runs cost twice as much as the same three runs in Benchmark mode.",
              "Credits are checked before the match is queued and charged when it completes (or when a reviewer approves it). Failed and rejected matches are not charged.",
              "Extracting the documents is charged separately by the flow, as usual, including the runs created by the email trigger.",
            ]}
          />
          <p>
            See <DocLink href="/docs/credits">Credits</DocLink> for balances and how to add more.
          </p>
        </DocCard>

        <DocCard icon={<Code size={24} />} title="API">
          <p>
            Start a match from your own system with your API key. Copy the ID from{" "}
            <strong>Matcher ID</strong> on the matcher&apos;s page.
          </p>
          <CodeBlock
            lang="bash"
            code={`curl -X POST https://run.tavnit.io/api/matchers/<matcher_id>/run \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"run_ids": ["<run_a>", "<run_b>", "<run_c>"], "benchmark_run_id": "<run_a>"}'`}
          />
          <BulletList
            items={[
              <Fragment key="a1">
                <InlineCode>run_ids</InlineCode>: two or more completed runs of the matcher&apos;s
                flow.
              </Fragment>,
              <Fragment key="a2">
                <InlineCode>benchmark_run_id</InlineCode>: required for Benchmark matchers, and must
                be one of <InlineCode>run_ids</InlineCode>. Leave it out for Multilateral.
              </Fragment>,
              <Fragment key="a3">
                The response is <InlineCode>202</InlineCode> with <InlineCode>match_id</InlineCode>,{" "}
                <InlineCode>status</InlineCode> (<InlineCode>queued</InlineCode>),{" "}
                <InlineCode>cells_count</InlineCode> and <InlineCode>credits_required</InlineCode>.
                A <InlineCode>402</InlineCode> means the balance is too low; a{" "}
                <InlineCode>400</InlineCode> explains what is wrong with the request.
              </Fragment>,
              "Configure a Webhook on the matcher to receive the comparison table when the match completes.",
            ]}
          />
          <p>
            Authentication and the other endpoints are covered in{" "}
            <DocLink href="/docs/api-integration">API Integration</DocLink>.
          </p>
        </DocCard>

        <DocCard icon={<Info size={24} />} title="Limits and permissions">
          <BulletList
            items={[
              "2 to 10 runs per match, all completed and from the matcher's flow.",
              "Up to 5,000 result rows per run.",
              "Email trigger: at least two readable attachments and no more than 10.",
              "Every member except HITL Only can create, edit and delete matchers and run matches.",
            ]}
          />
        </DocCard>

        <DocCard icon={<Wrench size={24} />} title="Troubleshooting">
          <DataTable
            head={["Problem", "What to do"]}
            rows={[
              [
                "No options in Identifier field or Comparison field",
                "The flow has no metadata field or no number column. Add one to the flow, then come back.",
              ],
              [
                "A run is missing from the Run Match list",
                "Only completed runs of the matcher's flow are listed. Wait for the run to finish, or check it was processed by the same flow.",
              ],
              [
                "Warning: a run was excluded",
                "Its identifier field was empty. Fix the value on the run, or make the identifier field more reliable in the flow.",
              ],
              [
                "Two suppliers were merged into one participant",
                "Both runs extracted the same identifier value. Their rows are merged and the first row wins on conflicts.",
              ],
              [
                "Different items were paired, or the same item wasn't",
                "Add context fields such as unit of measure or pack size, or switch on human review to correct pairings before release.",
              ],
              [
                "A row has no champion",
                "None of the participants on that row has a numeric comparison value.",
              ],
              [
                "Running from a Subject case fails with a benchmark error",
                "The case's Run button doesn't choose a benchmark run. Use a Multilateral matcher for Subjects.",
              ],
              [
                "Nobody can approve a paused match",
                "Only the reviewers picked on the matcher can approve. Add reviewers in Human in the Loop.",
              ],
            ]}
          />
        </DocCard>

        <Related
          links={[
            {
              href: "/docs/flows",
              label: "Set up the flow a Matcher reads",
              description: "Metadata fields for the identifier and number columns for the comparison.",
            },
            {
              href: "/docs/inspectors",
              label: "Pass or fail checks across documents",
              description: "Inspectors run a deterministic checklist over a set of related documents.",
            },
            {
              href: "/docs/human-in-the-loop",
              label: "Review queues",
              description: "Where paused runs, matches and inspections wait for a reviewer.",
            },
            {
              href: "/docs/credits",
              label: "How credits are charged",
              description: "Per-cell pricing for matches alongside every other step.",
            },
          ]}
        />
      </section>
    </>
  );
}
