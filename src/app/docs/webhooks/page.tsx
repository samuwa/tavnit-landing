import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  AlertTriangle,
  Braces,
  CheckCircle2,
  Info,
  LifeBuoy,
  MessageSquare,
  RefreshCw,
  Send,
  Settings2,
  Workflow,
  Zap,
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
  Screenshot,
  WarningBox,
} from "@/components/docs/ui";
import {
  WEBHOOK_PROVENANCE_KEYS,
  WEBHOOK_RECEIVER_JS,
  WEBHOOK_RECEIVER_PYTHON,
  WEBHOOK_RUN_PAYLOAD,
} from "@/components/docs/code-samples";

export const metadata = docMetadata("webhooks");

/** Payload an agent run POSTs to its webhook delivery. */
const AGENT_WEBHOOK_PAYLOAD = `{
  "bot_id": "...",
  "bot_run_id": "...",
  "status": "completed",
  "flow_run_id": "...",   // only when a flow run triggered the agent
  "inputs": { "supplier_name": "Acme Ltd" },
  "output": { ... }
}`;

/** Payload a pipeline Output node POSTs to a plain webhook, Zapier, Make or n8n. */
const PIPELINE_OUTPUT_PAYLOAD = `{
  "pipeline_id": "...",
  "execution_id": "...",
  "pipeline_name": "Supplier intake",
  "original_filename": "bundle.pdf",
  "outputs": [
    { "node": "Invoice Processor", "node_type": "flow", "output": { ... } }
  ]
}`;

/** Mirrors the visible numbered steps under "Set up a flow webhook". */
const HOW_TO = {
  name: "Send Tavnit extraction results to a webhook",
  description:
    "Add an HTTPS endpoint to a Tavnit flow so every completed run POSTs its extracted rows to your system automatically.",
  steps: [
    {
      name: "Get an endpoint URL",
      text: "Create a webhook trigger in Make, Zapier, n8n or Power Automate, or expose an HTTPS endpoint on your own server. The URL must start with https://.",
    },
    {
      name: "Open the flow",
      text: "Go to Flows in the Tavnit app and open the flow whose results you want delivered.",
    },
    {
      name: "Paste the URL into the Webhook panel",
      text: "Open the Webhook panel on the flow's detail page, paste the endpoint URL and save.",
    },
    {
      name: "Send one document through",
      text: "Process a test document and check that your endpoint received a POST. The run's log records whether delivery succeeded and the status code it got back.",
    },
  ],
};

export default function Page() {
  return (
    <>
      <DocsPageSchema
        slug="webhooks"
        howTo={HOW_TO}
        primaryImage={{
          url: "/assets/tour2-flow-details-b.jpg",
          caption:
            "A Tavnit flow detail page, with Webhook among the output options in the left rail.",
          width: 1327,
          height: 801,
        }}
      />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
          Webhooks
        </h1>

        <DocCard icon={<Zap size={24} />} title="What a webhook does">
          <Lead>
            A webhook pushes results to you instead of making you ask for them. Set an HTTPS endpoint
            on a flow, and every time a run completes, Tavnit sends that run&apos;s extracted rows to
            your URL as a JSON POST, usually within seconds of the run finishing.
          </Lead>
          <p>
            The alternative is polling: calling the API on a timer to ask whether anything finished.
            Polling costs you requests, adds latency, and gets worse as volume grows. A webhook
            arrives once, when there is something to deliver.
          </p>
          <DataTable
            head={["Use a webhook when", "Use something else when"]}
            rows={[
              [
                "You want results in your own system the moment they exist",
                <Fragment key="f0">
                  A person needs to read them:{" "}
                  <DocLink href="/docs/email-integration">email output</DocLink> is better
                </Fragment>,
              ],
              [
                "You are wiring Tavnit into Make, Zapier, n8n or Power Automate",
                <Fragment key="f1">
                  You want the data queryable inside Tavnit: use a{" "}
                  <DocLink href="/docs/buckets">Bucket</DocLink>
                </Fragment>,
              ],
              [
                "Volume is high enough that polling is wasteful",
                "You are fetching a specific known run: call the API directly",
              ],
            ]}
          />
        </DocCard>

        <DocCard icon={<Workflow size={24} />} title="Which features can send webhooks">
          <Lead>
            Flows are the most common source, but most features that produce a result can POST it
            to a URL. Each one is configured on its own detail page and sends its own payload.
          </Lead>
          <DataTable
            head={["Source", "Where you set it", "Fires when"]}
            rows={[
              ["Flow", "Webhook panel", "A run completes successfully (after approval, if review is on)"],
              [
                <Fragment key="f2"><DocLink href="/docs/cleaners">Cleaner</DocLink></Fragment>,
                "Webhook panel",
                "A sweep the Cleaner runs on its own finishes (Clean Dataset and API sweeps). Flow runs deliver through the flow's webhook instead.",
              ],
              [
                "Cleaner conditional action",
                "A webhook action in Conditional Actions",
                "A rule matches: once per rule per run, not once per row",
              ],
              [
                <Fragment key="f3"><DocLink href="/docs/agents">Agent</DocLink></Fragment>,
                "Delivery, Webhook option",
                "An agent run completes",
              ],
              [
                <Fragment key="f4"><DocLink href="/docs/matchers">Matcher</DocLink></Fragment>,
                "Webhook panel",
                "A match completes",
              ],
              [
                <Fragment key="f5"><DocLink href="/docs/inspectors">Inspector</DocLink></Fragment>,
                "Webhook panel, and Call webhook under If this check fails",
                "An inspection finishes; the per-check action fires for each failed check",
              ],
              [
                <Fragment key="f6"><DocLink href="/docs/fillers">Filler</DocLink></Fragment>,
                "Webhook panel",
                "A fill completes",
              ],
              [
                <Fragment key="f7"><DocLink href="/docs/signals">Signal</DocLink></Fragment>,
                "Webhook panel",
                "A Wave finishes",
              ],
              [
                <Fragment key="f8"><DocLink href="/docs/nets">Net</DocLink></Fragment>,
                "Webhook panel",
                "A Catch finishes with at least one row",
              ],
              [
                <Fragment key="f9"><DocLink href="/docs/pipelines">Pipeline</DocLink></Fragment>,
                "An Output node set to Webhook, Zapier, Make, n8n, Slack, Teams or Google Chat",
                "The execution reaches the Output node",
              ],
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="HTTPS only">
            Payloads contain your document data, so use an <InlineCode>https://</InlineCode>{" "}
            endpoint. The Webhook panels refuse to save a plain <InlineCode>http://</InlineCode>{" "}
            URL.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Set up a flow webhook">
          <Lead>
            Flow webhooks are configured per flow. You need an HTTPS endpoint that accepts a POST
            with a JSON body.
          </Lead>
          <NumberedList
            items={[
              <Fragment key="f10">
                Get an endpoint URL. Automation platforms hand you one when you create a{" "}
                <em>webhook trigger</em>; otherwise expose your own HTTPS route.
              </Fragment>,
              <Fragment key="f11">
                Open the flow in <strong>Flows</strong>.
              </Fragment>,
              <Fragment key="f12">
                Open the <strong>Webhook</strong> panel, paste the URL and save.
              </Fragment>,
              <Fragment key="f13">
                Process one test document and confirm the POST arrived. The run&apos;s log records
                whether delivery succeeded and what status code came back.
              </Fragment>,
            ]}
          />
          <Screenshot
            src="/assets/tour2-flow-details-b.jpg"
            alt="A Tavnit flow detail page for Invoice Processor, showing the left rail with Email Trigger, Collections, Cleaner, Agent, Form Templates, Email Output, Webhook, Bucket Export and Human in the Loop, next to the flow's metadata and table fields."
            caption="Webhook sits with the other output options in a flow's left rail, alongside Email Output and Bucket Export."
          />
        </DocCard>

        <DocCard icon={<Braces size={24} />} title="What a flow payload looks like">
          <Lead>
            The body is the run&apos;s output plus its identifiers. Repeating line items arrive under{" "}
            <InlineCode>rows</InlineCode>, single-value fields under{" "}
            <InlineCode>metadata</InlineCode>, and <InlineCode>run_id</InlineCode> and{" "}
            <InlineCode>flow_id</InlineCode> tell you which run produced them.
          </Lead>
          <CodeBlock lang="JSON: flow webhook body" code={WEBHOOK_RUN_PAYLOAD} />
          <p>
            The field names inside <InlineCode>rows</InlineCode> and{" "}
            <InlineCode>metadata</InlineCode> are the ones you defined on the flow, so the payload
            changes shape when you change the schema. If a{" "}
            <DocLink href="/docs/cleaners">Cleaner</DocLink> is attached, what you receive is the{" "}
            <em>cleaned</em> output: converted currencies, computed columns and all. If the Cleaner
            has a pivot applied to the webhook payload, the rows arrive in the pivoted, wide format.
          </p>
          <DataTable
            head={["Key", "Always present", "What it is"]}
            rows={[
              [<Fragment key="f14"><InlineCode>run_id</InlineCode></Fragment>, "Yes", "The run that produced this result."],
              [<Fragment key="f15"><InlineCode>flow_id</InlineCode></Fragment>, "Yes", "The flow that processed the document."],
              [
                <Fragment key="f16"><InlineCode>rows</InlineCode></Fragment>,
                "Yes",
                "One entry per extracted line item. An empty array is valid: some documents have no table.",
              ],
              [
                <Fragment key="f17"><InlineCode>metadata</InlineCode></Fragment>,
                "Yes",
                "Single-value fields that describe the document as a whole.",
              ],
              [
                <Fragment key="f18"><InlineCode>collection_run_id</InlineCode></Fragment>,
                "No",
                <Fragment key="f19">
                  Present when a <DocLink href="/docs/collections">Collection</DocLink> routed the
                  document to this flow.
                </Fragment>,
              ],
              [
                <Fragment key="f20"><InlineCode>split_id</InlineCode>, <InlineCode>splitter_doc_title</InlineCode></Fragment>,
                "No",
                <Fragment key="f21">
                  Present when a <DocLink href="/docs/splitters">Splitter</DocLink> produced this
                  segment.
                </Fragment>,
              ],
            ]}
          />
          <CodeBlock lang="JSON: provenance keys" code={WEBHOOK_PROVENANCE_KEYS} />
          <InfoBox color="purple" icon={<Info size={20} />} title="Files arrive as links, not bytes">
            Fields holding a file or an image are not embedded in the JSON. They come through as
            time-limited URLs, because stored documents are private: a raw storage path would not be
            fetchable from your server. Download them promptly rather than storing the link.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Braces size={24} />} title="Payloads from other sources">
          <Lead>
            Every source sends JSON, but the keys differ. Most carry the source&apos;s result plus
            the ids you need to look it up in Tavnit.
          </Lead>
          <DataTable
            head={["Source", "Keys in the body"]}
            rows={[
              [
                "Cleaner sweep",
                <Fragment key="f22">
                  The cleaned output, plus <InlineCode>sweep_id</InlineCode>,{" "}
                  <InlineCode>cleaner_id</InlineCode>, and <InlineCode>run_id</InlineCode> when an
                  API sweep re-cleans a run.
                </Fragment>,
              ],
              [
                "Cleaner conditional action",
                <Fragment key="f23">
                  <InlineCode>content</InlineCode> (the message you composed, which can include the
                  matching rows), <InlineCode>receivers</InlineCode>,{" "}
                  <InlineCode>run_id</InlineCode>, <InlineCode>flow_id</InlineCode>,{" "}
                  <InlineCode>flow_name</InlineCode>, <InlineCode>sweep_id</InlineCode> and{" "}
                  <InlineCode>matched_rows</InlineCode> (how many rows matched).
                </Fragment>,
              ],
              [
                "Agent",
                <Fragment key="f24">
                  <InlineCode>bot_id</InlineCode>, <InlineCode>bot_run_id</InlineCode>,{" "}
                  <InlineCode>status</InlineCode>, <InlineCode>inputs</InlineCode>,{" "}
                  <InlineCode>output</InlineCode>, and <InlineCode>flow_run_id</InlineCode> when a
                  flow run triggered the agent.
                </Fragment>,
              ],
              [
                "Matcher",
                <Fragment key="f25">
                  The match result, plus <InlineCode>match_id</InlineCode> and{" "}
                  <InlineCode>matcher_id</InlineCode>.
                </Fragment>,
              ],
              [
                "Inspector",
                <Fragment key="f26">
                  <InlineCode>inspection_id</InlineCode>, <InlineCode>inspector_id</InlineCode>,{" "}
                  <InlineCode>verdict</InlineCode> and the full report in{" "}
                  <InlineCode>output_json</InlineCode>. A per-check webhook sends the failed check
                  in <InlineCode>item</InlineCode> instead of the report.
                </Fragment>,
              ],
              [
                "Filler",
                <Fragment key="f27">
                  <InlineCode>fill_id</InlineCode>, <InlineCode>filler_id</InlineCode>,{" "}
                  <InlineCode>status</InlineCode>, <InlineCode>filled_forms</InlineCode> (plus{" "}
                  <InlineCode>filled_form_path</InlineCode> for the first form) and the field values
                  in <InlineCode>output_json</InlineCode>.
                </Fragment>,
              ],
              [
                "Signal",
                <Fragment key="f28">
                  The Wave&apos;s result, plus <InlineCode>wave_id</InlineCode> and{" "}
                  <InlineCode>signal_id</InlineCode>.
                </Fragment>,
              ],
              [
                "Net",
                <Fragment key="f29">
                  <InlineCode>columns</InlineCode>, <InlineCode>rows</InlineCode>,{" "}
                  <InlineCode>catch_id</InlineCode>, <InlineCode>net_id</InlineCode>,{" "}
                  <InlineCode>window_start</InlineCode>, <InlineCode>window_end</InlineCode> and a{" "}
                  <InlineCode>stats</InlineCode> summary.
                </Fragment>,
              ],
              [
                "Pipeline Output",
                <Fragment key="f30">
                  <InlineCode>pipeline_id</InlineCode>, <InlineCode>execution_id</InlineCode>,{" "}
                  <InlineCode>pipeline_name</InlineCode>, <InlineCode>original_filename</InlineCode>{" "}
                  and <InlineCode>outputs</InlineCode>, one entry per upstream node.
                </Fragment>,
              ],
            ]}
          />
          <CodeBlock lang="JSON: agent webhook body" code={AGENT_WEBHOOK_PAYLOAD} />
          <p>
            An agent webhook always includes the agent&apos;s input variables (secrets are never
            included) so your receiver can join the captured output back onto its own records. The{" "}
            <InlineCode>flow_run_id</InlineCode> tells you which document the agent was working
            from when a flow run started it.
          </p>
          <p>
            A conditional action is dispatched as soon as the rule matches, before any{" "}
            <DocLink href="/docs/human-in-the-loop">review pause</DocLink>. That is deliberate:{" "}
            <em>alert me when this happens</em> should not wait on a reviewer. The flow webhook, by
            contrast, only fires after a reviewer approves.
          </p>
        </DocCard>

        <DocCard icon={<MessageSquare size={24} />} title="Pipeline Output to Slack, Teams and Google Chat">
          <Lead>
            In a <DocLink href="/docs/pipelines">Pipeline</DocLink>, an Output node sends the
            results of the nodes feeding it to a destination you pick: Email, Slack, Teams, Google
            Chat, Webhook, Zapier, Make or n8n.
          </Lead>
          <BulletList
            items={[
              "Slack, Teams and Google Chat receive a readable message with the key fields, posted through the incoming-webhook URL you paste from that app.",
              "Webhook, Zapier, Make and n8n receive the raw JSON shown below.",
              "If a flow in the pipeline already sends its own webhook, the pipeline warns you that an Output would post the same result twice.",
            ]}
          />
          <CodeBlock lang="JSON: pipeline Output body" code={PIPELINE_OUTPUT_PAYLOAD} />
        </DocCard>

        <DocCard icon={<RefreshCw size={24} />} title="Delivery, timeouts and retries">
          <Lead>
            Every source uses the same delivery rules. Tavnit waits up to 10 seconds for your
            endpoint to respond. A connection failure or timeout is retried once after a short
            pause; an HTTP error response is not retried, because your server was reached and
            answered.
          </Lead>
          <DataTable
            head={["What your endpoint does", "What Tavnit does"]}
            rows={[
              ["Responds 2xx within 10 seconds", "Delivery is recorded as sent. Done."],
              [
                "Connection refused, dropped, or times out",
                "Retried once after a short pause. If the retry also fails, delivery is marked failed.",
              ],
              [
                "Responds 4xx or 5xx",
                "Not retried. The status code is recorded so you can see what your server said.",
              ],
            ]}
          />
          <WarningBox>
            There is no long retry queue and no dead-letter replay. If your endpoint is down for an
            hour, those deliveries are lost: the runs still succeeded and their data is still in
            Tavnit, but you will have to fetch it over the API or re-deliver it another way. For
            anything you cannot afford to miss, pair the webhook with a{" "}
            <DocLink href="/docs/buckets">Bucket</DocLink> so there is always a durable copy.
          </WarningBox>
          <InfoBox
            color="green"
            icon={<CheckCircle2 size={20} />}
            title="A failed webhook never fails the run"
          >
            Delivery is best-effort and separate from processing. If your endpoint is unreachable,
            the run still completes, the data is still stored, and every other output (email, Bucket
            export, form fill) still fires. The exception is a pipeline Output node: a failed
            delivery marks that node as failed so you can see it on the execution.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Send size={24} />} title="Writing a receiver">
          <Lead>
            The single most important rule: acknowledge fast, then work. Ten seconds sounds
            generous until your handler writes to a slow database. Return 200 as soon as you have the
            payload safely queued, and do the real processing afterwards.
          </Lead>
          <CodeBlock lang="Python (Flask)" code={WEBHOOK_RECEIVER_PYTHON} />
          <CodeBlock lang="JavaScript (Express)" code={WEBHOOK_RECEIVER_JS} />
          <BulletList
            items={[
              "Accept a reasonably large body: a long invoice with many line items is not small.",
              "Treat delivery as at-least-once. A retry after a timeout can deliver the same result twice, so make your handler idempotent by keying on run_id (or the source's own id).",
              "Do not assume a fixed schema. Read fields by name and tolerate ones you do not recognise, so adding a flow field does not break your receiver.",
              "Log the raw body on failure. It is the only copy of what arrived.",
            ]}
          />
          <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Keep the URL secret">
            The endpoint URL is the only thing standing between the internet and your extracted data.
            Automation platforms embed a secret token in the path for exactly this reason. Do not
            publish it, and rotate it if it leaks.
          </InfoBox>
        </DocCard>

        <DocCard icon={<LifeBuoy size={24} />} title="Troubleshooting">
          <Lead>
            Start at the run, not at your server. Every run logs whether webhook delivery was
            attempted, whether it succeeded, and what status code or error came back, which
            immediately tells you whether the problem is Tavnit-side or yours.
          </Lead>
          <DataTable
            head={["Symptom", "Likely cause", "Fix"]}
            rows={[
              [
                "Nothing arrives, no attempt logged",
                "No webhook URL is set on that flow, or the run failed before delivery.",
                "Check the flow's Webhook panel and the run's status.",
              ],
              [
                "The URL was rejected when saving",
                <Fragment key="f31">
                  It does not start with <InlineCode>https://</InlineCode>.
                </Fragment>,
                "Use an HTTPS endpoint. Plain HTTP is not accepted.",
              ],
              [
                "The Cleaner webhook never fires for flow runs",
                "Cleaner webhooks only fire for sweeps the Cleaner runs on its own.",
                "Use the flow's Webhook panel; it already carries the cleaned output.",
              ],
              [
                "Delivery logged as failed with a status code",
                "Your endpoint returned 4xx or 5xx. It was reached, so there was no retry.",
                "Read your own server's logs: the payload is usually fine and the handler threw.",
              ],
              [
                "Delivery logged as failed with a timeout",
                "Your handler took longer than 10 seconds.",
                "Acknowledge first and process asynchronously, as above.",
              ],
              [
                "The same run arrived twice",
                "A retry followed a timeout on a request your server actually processed.",
                <Fragment key="f32">
                  De-duplicate on <InlineCode>run_id</InlineCode>.
                </Fragment>,
              ],
              [
                "Results arrive much later than expected",
                <Fragment key="f33">
                  The flow has <DocLink href="/docs/human-in-the-loop">human review</DocLink> enabled.
                </Fragment>,
                "The webhook fires on approval, not on extraction. That is by design.",
              ],
            ]}
          />
        </DocCard>

        <Related
          links={[
            {
              href: "/docs/api-integration",
              label: "Process documents with the REST API",
              description:
                "The other half of an integration: how documents get in, with Python and JavaScript examples.",
            },
            {
              href: "/docs/buckets",
              label: "Keep a durable copy in Buckets",
              description:
                "Insurance against a missed delivery, and queryable without calling the API.",
            },
            {
              href: "/docs/pipelines",
              label: "Send pipeline results to chat and automation tools",
              description: "Output nodes post to Slack, Teams, Google Chat, Zapier, Make, n8n or any webhook.",
            },
            {
              href: "/docs/cleaners",
              label: "Fire a webhook when a rule breaks",
              description:
                "Conditional Actions send alerts independently of the flow's own webhook.",
            },
          ]}
        />
      </section>
    </>
  );
}
