import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  AlertTriangle,
  Code2,
  Coins,
  FlaskConical,
  GitBranch,
  HelpCircle,
  Info,
  Lock,
  Network,
  PlayCircle,
  Route,
  Send,
  Settings,
  Sparkles,
  Upload,
  Workflow,
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

export const metadata = docMetadata("pipelines");

const EXECUTE_CURL = `curl -X POST https://run.tavnit.io/api/pipelines/PIPELINE_ID/execute \\
  -H "X-API-Key: $TAVNIT_API_KEY" \\
  -F "file=@document.pdf"`;

const EXECUTE_RESPONSE = `{
  "success": true,
  "execution_id": "…",
  "pipeline_id": "…",
  "org_id": "…",
  "status": "running"
}`;

const CANCEL_CURL = `curl -X POST https://run.tavnit.io/api/pipelines/executions/EXECUTION_ID/cancel \\
  -H "X-API-Key: $TAVNIT_API_KEY"`;

const OUTPUT_PAYLOAD = `{
  "pipeline_id": "…",
  "execution_id": "…",
  "pipeline_name": "Invoice intake",
  "original_filename": "document.pdf",
  "outputs": [
    {
      "node": "Invoices",
      "node_type": "flow",
      "output": { "invoice_number": "…", "total": 1250.5 }
    }
  ]
}`;

export default function Page() {
  return (
    <>
      <DocsPageSchema slug="pipelines" />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
          Pipelines
        </h1>

        <DocCard icon={<Route size={24} />} title="What is a Pipeline?">
          <Lead>
            A Pipeline chains the features you already configured (Splitters, Collections, flows,
            agents, Matchers, Inspectors, Fillers and Buckets) into one end-to-end process that you
            draw on a canvas. You send in one document; the Pipeline carries it through every step
            and delivers the result where you want it.
          </Lead>
          <p>
            Each node on the canvas points at a feature that already exists. The Pipeline does not
            copy its configuration: when you improve a flow&apos;s fields or an Inspector&apos;s
            checks, every Pipeline that uses it picks up the change. What the Pipeline adds is the{" "}
            <em>order</em>: which step receives the document, which runs follow, and where the output
            goes.
          </p>
          <InfoBox color="violet" icon={<FlaskConical size={20} />} title="Beta">
            Pipelines are in beta. They are available to every organisation, and the canvas and its
            node types may still change.
          </InfoBox>
          <InfoBox color="blue" icon={<Network size={20} />} title="Pipelines vs the Pipeline Map">
            The Pipeline Map is a read-only picture of the connections configured on the features
            themselves (a flow&apos;s Bucket export, a Collection&apos;s flows, a Splitter&apos;s
            document types). A Pipeline is a graph you build and run on purpose, with its own entry,
            executions and outputs.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Info size={24} />} title="When to use a Pipeline">
          <BulletList
            items={[
              "A bundle has to be split, each document extracted by its own flow, and the results checked together",
              "Extracted data should go on to an agent, a Matcher comparison or an Inspector checklist without anyone clicking through",
              "You want one inbox address or one API call that runs the whole process, not one per feature",
              "The result should land in Slack, Teams, Google Chat, an automation platform or an inbox as the final step",
            ]}
          />
          <p>
            If a single flow with its own webhook, email or Bucket export already does the job, you
            don&apos;t need a Pipeline. Features keep working on their own.
          </p>
        </DocCard>

        <DocCard icon={<Workflow size={24} />} title="Node types">
          <Lead>
            Every canvas starts with one <strong>Entry</strong> node. You add the rest from{" "}
            <strong>&ldquo;Add node&rdquo;</strong>, which groups them by the stage they play:
            &ldquo;Receive &amp; route&rdquo;, &ldquo;Extract&rdquo;, &ldquo;Process &amp;
            check&rdquo; and &ldquo;Deliver&rdquo;.
          </Lead>
          <DataTable
            head={["Node", "What it does", "Can connect to"]}
            rows={[
              ["Entry", "Every execution starts here with the uploaded document.", "Splitter, Collection, Flow"],
              [
                <Fragment key="n1">
                  <DocLink href="/docs/splitters">Splitter</DocLink>
                </Fragment>,
                "Cuts a bundle into its documents and sends each one on.",
                "Flow, Splitter, Collection",
              ],
              [
                <Fragment key="n2">
                  <DocLink href="/docs/collections">Collection</DocLink>
                </Fragment>,
                "Routes an unknown document to the right flow.",
                "Flow, Output",
              ],
              [
                <Fragment key="n3">
                  <DocLink href="/docs/flows">Flow</DocLink>
                </Fragment>,
                "Extracts structured fields from a document.",
                "Agent, Bucket write, Output, Matcher, Inspector, Filler",
              ],
              [
                <Fragment key="n4">
                  <DocLink href="/docs/agents">Agent</DocLink>
                </Fragment>,
                "Acts on the extracted data in a browser.",
                "Agent, Bucket write, Output",
              ],
              [
                <Fragment key="n5">
                  <DocLink href="/docs/matchers">Matcher</DocLink>
                </Fragment>,
                "Compares a run against previous ones.",
                "Agent, Bucket write, Output",
              ],
              [
                <Fragment key="n6">
                  <DocLink href="/docs/inspectors">Inspector</DocLink>
                </Fragment>,
                "Runs a checklist across one or more runs.",
                "Agent, Bucket write, Output",
              ],
              [
                <Fragment key="n7">
                  <DocLink href="/docs/fillers">Filler</DocLink>
                </Fragment>,
                "Fills a template with data from the runs.",
                "Output",
              ],
              [
                <Fragment key="n8">
                  Bucket write (<DocLink href="/docs/buckets">Buckets</DocLink>)
                </Fragment>,
                "Stores the extracted rows in a Bucket, with field mappings you define on the node.",
                "Nothing (end of a branch)",
              ],
              ["Output", "Sends the result to email, Slack, Teams, Google Chat, Zapier, Make, n8n or a webhook.", "Nothing (end of a branch)"],
            ]}
          />
          <p>
            When a node is selected, <strong>&ldquo;Add node&rdquo;</strong> dims the kinds that
            can&apos;t follow it and wires the new node automatically. Picking a flow also suggests
            the Matchers, Inspectors and Fillers whose inputs already expect runs of that flow
            (&ldquo;Connected to this flow&rdquo;), added pre-wired. Agent nodes need{" "}
            <DocLink href="/docs/agents">agents</DocLink>, which are enabled per organisation on
            request.
          </p>
          <InfoBox color="blue" icon={<GitBranch size={20} />} title="Ports and slots">
            A connection out of a Splitter asks which document type travels it (or &ldquo;Any
            document&rdquo;). A connection into an Inspector or a Filler asks which input slot
            receives the run. A benchmark-mode Matcher needs one of its inputs chosen as the{" "}
            <strong>&ldquo;Benchmark input&rdquo;</strong>, and only accepts runs of its own flow.
          </InfoBox>
        </DocCard>

        <DocCard icon={<GitBranch size={24} />} title="Building a Pipeline">
          <NumberedList
            items={[
              <Fragment key="s1">
                Open <strong>&ldquo;Pipelines&rdquo;</strong> in the sidebar and click{" "}
                <strong>&ldquo;New Pipeline&rdquo;</strong>. Give it a name and, optionally, a
                description.
              </Fragment>,
              "The canvas opens with its Entry node. Select it and choose how documents arrive (see Sources below).",
              <Fragment key="s3">
                Click <strong>&ldquo;Add node&rdquo;</strong>, pick a step, then pick which of your
                features to use. Or drag from the handle on the right of a node onto another node to
                connect them.
              </Fragment>,
              "Select a node to open its panel: its linked feature, what it receives from and sends to, and its settings (the Bucket write's field mappings, the Output's destination, the Matcher's benchmark input).",
              <Fragment key="s5">
                Fix anything listed under <strong>&ldquo;Fix these before running&rdquo;</strong>{" "}
                until the chip reads <strong>&ldquo;Ready to run&rdquo;</strong>, then click{" "}
                <strong>&ldquo;Save&rdquo;</strong>.
              </Fragment>,
              <Fragment key="s6">
                Click <strong>&ldquo;Run pipeline&rdquo;</strong> and upload a document to test it.
              </Fragment>,
            ]}
          />
          <p>
            The canvas has <strong>&ldquo;Tidy up&rdquo;</strong> (automatic layout), undo and{" "}
            <strong>&ldquo;Redo&rdquo;</strong>, <strong>&ldquo;Duplicate&rdquo;</strong>,
            shift-click and shift-drag multi-selection, and an <strong>&ldquo;Overview&rdquo;</strong>{" "}
            minimap on larger graphs. Scroll to pan, ⌘ + scroll to zoom, and Delete removes the
            selection. Unsaved edits are kept in your browser and restored if you come back.
          </p>
          <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Runs use the saved pipeline">
            Executions always run the last saved version of the graph. If you have unsaved changes,
            save them before clicking &ldquo;Run pipeline&rdquo;. An execution keeps a frozen copy
            of the graph it started with, so later edits never change a run in progress.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Sparkles size={24} />} title="Draft a Pipeline with AI">
          <Lead>
            Instead of placing nodes by hand, click <strong>&ldquo;Draft with AI&rdquo;</strong> on
            the canvas and describe the process in a sentence, for example: &ldquo;When invoices
            arrive: extract them with the Invoices flow, run the control checklist, and store the
            rows in the Invoices DB bucket.&rdquo;
          </Lead>
          <BulletList
            items={[
              "The assistant reads the features your organisation already has, designs the graph and validates the connections, then lays the draft on the canvas.",
              <Fragment key="a2">
                If a step needs a feature you don&apos;t have yet (a flow, Splitter, Inspector or
                Bucket), the node is marked <strong>&ldquo;New&rdquo;</strong> and its panel shows
                what will be created. <strong>&ldquo;Create this feature&rdquo;</strong> (or{" "}
                &ldquo;Create N features&rdquo;) builds them for real; review them and save.
              </Fragment>,
              <Fragment key="a3">
                <strong>&ldquo;Keep&rdquo;</strong> accepts the draft;{" "}
                <strong>&ldquo;Discard&rdquo;</strong> restores the canvas as it was before. A draft
                replaces every node and connection on the canvas, so you are asked first if one
                already exists.
              </Fragment>,
            ]}
          />
          <p>Drafting is free: it does not run anything or use credits.</p>
        </DocCard>

        <DocCard icon={<Upload size={24} />} title="Sources: how documents get in">
          <p>Select the Entry node to see its three sources.</p>
          <DataTable
            head={["Source", "How it works"]}
            rows={[
              [
                "Manual upload",
                "Always on. “Run pipeline” accepts one PDF or image (PNG, JPG, JPEG, JFIF) per execution.",
              ],
              [
                "Email",
                <Fragment key="e1">
                  Turn it on to get an inbox address of the form{" "}
                  <InlineCode>{"<pipeline-id>-pipeline@mg.tavnit.io"}</InlineCode>. Each attachment
                  starts its own execution. You can restrict which senders are accepted. See{" "}
                  <DocLink href="/docs/email-integration">Email integration</DocLink>.
                </Fragment>,
              ],
              [
                "API",
                <Fragment key="e2">
                  Always on. POST the document with your API key; the panel has a ready-to-copy
                  snippet. See <DocLink href="#api">API</DocLink> below.
                </Fragment>,
              ],
            ]}
          />
          <p>
            The email trigger, the <strong>&ldquo;Pipeline ID&rdquo;</strong> and the{" "}
            <strong>&ldquo;Active&rdquo;</strong> switch are also on the{" "}
            <strong>&ldquo;Settings&rdquo;</strong> tab. Inactive pipelines reject new executions from
            every source.
          </p>
        </DocCard>

        <DocCard icon={<Send size={24} />} title="Outputs: where the result goes">
          <Lead>
            An <strong>Output</strong> node sends everything its upstream steps produced. Pick a
            destination in the node&apos;s panel:
          </Lead>
          <DataTable
            head={["Destination", "What you enter", "What arrives"]}
            rows={[
              ["Email", "“Recipient emails”", "An email titled “Pipeline output: <name>” with the result as JSON."],
              ["Slack", "An Incoming Webhooks URL for the channel", "A message with the document and its key fields."],
              ["Teams", "The URL of a Teams Workflow that posts to a channel when a webhook request is received", "An Adaptive Card with the key fields."],
              ["Google Chat", "An incoming webhook URL from the space settings", "A card with the key fields."],
              ["Webhook, Zapier, Make, n8n", "The webhook URL from your endpoint or scenario", "The JSON payload below."],
            ]}
          />
          <CodeBlock lang="JSON — Output payload" code={OUTPUT_PAYLOAD} />
          <p>
            The panel shows an <strong>&ldquo;Example payload&rdquo;</strong> built from the upstream
            flow&apos;s fields; the real one carries the extracted values. Files in the output arrive
            as time-limited links. The chat destinations show up to eight key fields from the first
            upstream result.
          </p>
          <InfoBox color="green" icon={<Info size={20} />} title="Completion notice">
            When an execution you started finishes successfully, you also get an in-app
            &ldquo;Pipeline completed&rdquo; notification.
          </InfoBox>
        </DocCard>

        <DocCard icon={<AlertTriangle size={24} />} title="Wiring warnings">
          <Lead>
            A feature keeps its own behaviour inside a Pipeline: a flow still fires its own webhook,
            email, Bucket export, Cleaner, human review and linked agent. The canvas points out where
            that overlaps with what you drew.
          </Lead>
          <BulletList
            items={[
              "A Bucket write into the same Bucket the upstream flow already exports to would store the rows twice.",
              "A webhook Output after a flow that already sends a webhook would post the result twice.",
              "An email Output after a flow that already emails its results would send a second email.",
            ]}
          />
          <p>
            These appear as warnings under <strong>&ldquo;Worth a look — it will still run&rdquo;</strong>.
            They never block a run. Cards also carry small marks for what the feature delivers on its
            own (&ldquo;Webhook&rdquo;, email recipients, &ldquo;Human review&rdquo;, agent delivery),
            listed in the node panel under <strong>&ldquo;Also delivers to&rdquo;</strong>.
          </p>
          <p>
            A flow node&apos;s panel also shows <strong>&ldquo;Also used in&rdquo;</strong>: the
            Collections, Splitters and other Pipelines that depend on the same flow, so you know what
            else an edit to it affects.
          </p>
          <InfoBox color="blue" icon={<Info size={20} />} title="Human review pauses the execution">
            If a flow sends runs to <DocLink href="/docs/human-in-the-loop">human review</DocLink>,
            the execution waits at that node until the run is approved, then continues.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Lock size={24} />} title="Rules the canvas enforces">
          <p>
            &ldquo;Run pipeline&rdquo; and the API refuse a graph that breaks any of these; the
            canvas badges the node at fault.
          </p>
          <BulletList
            items={[
              "Exactly one Entry node, with no inbound connections. No cycles and no self-connections.",
              "Every other node needs an inbound connection and a linked feature (an Output needs a recipient or a webhook URL).",
              "Flows, Splitters and Collections take one document from one source: the Entry, a Splitter, or (for flows) a Collection.",
              "Every connection into an Inspector or Filler needs an input slot; a Filler can't receive two connections into the same slot.",
              "At most 50 nodes per Pipeline.",
            ]}
          />
          <p>
            Matchers, Inspectors and Fillers (and any node fed by more than one source) wait until
            everything upstream has finished, then run once. After a Splitter, each matched document
            becomes its own branch, and the steps after it run once per branch.
          </p>
        </DocCard>

        <DocCard icon={<PlayCircle size={24} />} title="Executions">
          <Lead>
            Each document that enters a Pipeline creates one execution. The{" "}
            <strong>&ldquo;Executions&rdquo;</strong> tab lists them with the document, time, source,
            sender, duration and status.
          </Lead>
          <DataTable
            head={["Execution status", "Meaning"]}
            rows={[
              ["Pending / Running", "The execution is in progress."],
              ["Completed", "Every node finished without a failure."],
              ["Failed", "At least one node failed or was cancelled; the error names the first one."],
              ["Cancelled", "Someone stopped the execution."],
            ]}
          />
          <p>
            Open an execution to see the canvas as it ran, tinted by node status, with progress
            (&ldquo;X of Y nodes done&rdquo;) and live updates. Each node shows Pending, Waiting,
            Queued, Running, Completed, Failed, Skipped or Cancelled, with a chip per branch after a
            Splitter. Select a node and use <strong>&ldquo;View result&rdquo;</strong> to open the run,
            split, match, inspection or fill it produced.
          </p>
          <p>
            <strong>&ldquo;Cancel execution&rdquo;</strong> stops the rest of the graph: nodes that
            haven&apos;t started are cancelled, while feature runs already in progress finish on their
            own.
          </p>
        </DocCard>

        <DocCard icon={<Coins size={24} />} title="Cost">
          <p>
            A Pipeline has no price of its own. Each step pays exactly what the feature costs when you
            use it directly: a flow run pays per page, an agent by its runtime, an Inspector its AI
            comparisons, and so on. Bucket writes and Outputs are free. Starting an execution only
            needs a positive credit balance.
          </p>
          <p>
            See <DocLink href="/docs/credits">Credits</DocLink> for what each feature costs.
          </p>
        </DocCard>

        <DocCard icon={<Code2 size={24} />} title="API">
          <span id="api" />
          <p>
            Copy the ID from <strong>&ldquo;Pipeline ID&rdquo;</strong> on the Settings tab. Start an
            execution by posting the document as multipart <InlineCode>file</InlineCode> (or as JSON
            with <InlineCode>file_base64</InlineCode> and <InlineCode>filename</InlineCode>):
          </p>
          <CodeBlock lang="bash — start an execution" code={EXECUTE_CURL} />
          <CodeBlock lang="JSON — 202 response" code={EXECUTE_RESPONSE} />
          <p>
            A definition that isn&apos;t executable returns 400 with{" "}
            <InlineCode>validation_errors</InlineCode>; an empty balance returns 402; an inactive
            Pipeline returns 400. Follow progress on the Executions tab. To stop an execution:
          </p>
          <CodeBlock lang="bash — cancel an execution" code={CANCEL_CURL} />
          <p>
            Cancelling an execution that already finished returns 409. Authentication and error
            handling are the same as the rest of the{" "}
            <DocLink href="/docs/api-integration">REST API</DocLink>.
          </p>
        </DocCard>

        <DocCard icon={<Settings size={24} />} title="Who can do what">
          <DataTable
            head={["Action", "Roles"]}
            rows={[
              ["Create, edit and delete Pipelines", "Owner, Admin"],
              ["Run a Pipeline", "Owner, Admin, Member"],
            ]}
          />
          <p>
            Deleting a Pipeline removes it and its canvas; past executions keep their records. See{" "}
            <DocLink href="/docs/user-roles">User roles</DocLink>.
          </p>
        </DocCard>

        <DocCard icon={<HelpCircle size={24} />} title="Troubleshooting">
          <DataTable
            head={["Symptom", "What to check"]}
            rows={[
              ["“Run pipeline” says to save first", "You have unsaved canvas changes. Save, then run."],
              ["A node says it “needs a document source”", "Flows, Splitters and Collections must be fed by the Entry, a Splitter, or (flows only) a Collection, not by a flow or agent."],
              ["The execution is stuck on one node", "Check whether the run is waiting in human review, or open the node's result to see the feature's own status."],
              ["Results were stored or sent twice", "Look for wiring warnings: the upstream flow already has its own Bucket export, webhook or email."],
              ["A branch shows Skipped", "Its upstream step failed or produced nothing for that branch, so the steps after it had nothing to run on."],
              ["Email to the pipeline address does nothing", "Check that the email trigger is on, the Pipeline is active and the sender is allowed."],
            ]}
          />
        </DocCard>

        <Related
          links={[
            {
              href: "/docs/pipeline-map",
              label: "See how your features connect on the Pipeline Map",
              description: "The read-only map of every flow, Splitter, Collection, Cleaner and Bucket in your workspace.",
            },
            {
              href: "/docs/splitters",
              label: "Split bundles into documents",
              description: "Document types, page detection and routing, the usual first step after the Entry.",
            },
            {
              href: "/docs/inspectors",
              label: "Check runs with an Inspector",
              description: "Input slots and checklists that a Pipeline can feed from several flows at once.",
            },
            {
              href: "/docs/api-integration",
              label: "Authenticate with the REST API",
              description: "API keys, the base URL and error codes shared by every endpoint.",
            },
          ]}
        />
      </section>
    </>
  );
}
