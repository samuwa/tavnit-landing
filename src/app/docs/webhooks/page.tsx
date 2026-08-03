import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  AlertTriangle,
  Braces,
  CheckCircle2,
  Info,
  LifeBuoy,
  RefreshCw,
  Send,
  Settings2,
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

/** Mirrors the visible numbered steps under "Set up a webhook". */
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
      text: "Find the Webhook section on the flow's detail page and paste the endpoint URL, then save.",
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
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Webhooks
        </h1>

        <DocCard icon={<Zap size={24} />} title="What a webhook does">
          <Lead>
            A webhook pushes results to you instead of making you ask for them. Set an HTTPS endpoint
            on a flow, and every time a run completes, Tavnit sends that run&apos;s extracted rows to
            your URL as a JSON POST — usually within a second of the run finishing.
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
                <>
                  A person needs to read them —{" "}
                  <DocLink href="/docs/email-integration">email output</DocLink> is better
                </>,
              ],
              [
                "You are wiring Tavnit into Make, Zapier, n8n or Power Automate",
                <>
                  You want the data queryable inside Tavnit — use a{" "}
                  <DocLink href="/docs/buckets">Bucket</DocLink>
                </>,
              ],
              [
                "Volume is high enough that polling is wasteful",
                "You are fetching a specific known run — call the API directly",
              ],
            ]}
          />
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Set up a webhook">
          <Lead>
            Webhooks are configured per flow. You need an HTTPS endpoint that accepts a POST with a
            JSON body — Tavnit rejects plain <InlineCode>http://</InlineCode> URLs, because the
            payload contains your extracted document data.
          </Lead>
          <NumberedList
            items={[
              <>
                Get an endpoint URL. Automation platforms hand you one when you create a{" "}
                <em>webhook trigger</em>; otherwise expose your own HTTPS route.
              </>,
              <>
                Open the flow in <strong>Flows</strong>.
              </>,
              <>
                Find the <strong>Webhook</strong> panel, paste the URL and save.
              </>,
              <>
                Process one test document and confirm the POST arrived. The run&apos;s log records
                whether delivery succeeded and what status code came back.
              </>,
            ]}
          />
          <Screenshot
            src="/assets/tour2-flow-details-b.jpg"
            alt="A Tavnit flow detail page for Invoice Processor, showing the left rail with Email Trigger, Collections, Cleaner, Agent, Form Templates, Email Output, Webhook, Bucket Export and Human in the Loop, next to the flow's metadata and table fields."
            caption="Webhook sits with the other output options in a flow's left rail, alongside Email Output and Bucket Export."
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Cleaners have their own webhook">
            A <DocLink href="/docs/cleaners">Cleaner</DocLink> can POST its swept results
            independently of the flow, also HTTPS only. Use the flow webhook for per-document
            results; use the Cleaner webhook when you want the cleaned dataset after each sweep.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Braces size={24} />} title="What the payload looks like">
          <Lead>
            The body is the run&apos;s output plus its identifiers. Repeating line items arrive under{" "}
            <InlineCode>rows</InlineCode>, single-value fields under{" "}
            <InlineCode>metadata</InlineCode>, and <InlineCode>run_id</InlineCode> and{" "}
            <InlineCode>flow_id</InlineCode> tell you which run produced them.
          </Lead>
          <CodeBlock lang="JSON — flow webhook body" code={WEBHOOK_RUN_PAYLOAD} />
          <p>
            The field names inside <InlineCode>rows</InlineCode> and{" "}
            <InlineCode>metadata</InlineCode> are the ones you defined on the flow, so the payload
            changes shape when you change the schema. If a{" "}
            <DocLink href="/docs/cleaners">Cleaner</DocLink> is attached, what you receive is the{" "}
            <em>cleaned</em> output — converted currencies, computed columns and all.
          </p>
          <DataTable
            head={["Key", "Always present", "What it is"]}
            rows={[
              [<><InlineCode>run_id</InlineCode></>, "Yes", "The run that produced this result."],
              [<><InlineCode>flow_id</InlineCode></>, "Yes", "The flow that processed the document."],
              [
                <><InlineCode>rows</InlineCode></>,
                "Yes",
                "One entry per extracted line item. An empty array is valid — some documents have no table.",
              ],
              [
                <><InlineCode>metadata</InlineCode></>,
                "Yes",
                "Single-value fields that describe the document as a whole.",
              ],
              [
                <><InlineCode>collection_run_id</InlineCode></>,
                "No",
                <>
                  Present when a <DocLink href="/docs/collections">Collection</DocLink> routed the
                  document to this flow.
                </>,
              ],
              [
                <><InlineCode>split_id</InlineCode>, <InlineCode>splitter_doc_title</InlineCode></>,
                "No",
                <>
                  Present when a <DocLink href="/docs/splitters">Splitter</DocLink> produced this
                  segment.
                </>,
              ],
            ]}
          />
          <CodeBlock lang="JSON — provenance keys" code={WEBHOOK_PROVENANCE_KEYS} />
          <InfoBox color="purple" icon={<Info size={20} />} title="Files arrive as links, not bytes">
            Fields holding a file or an image are not embedded in the JSON. They come through as
            time-limited URLs, because stored documents are private — a raw storage path would not be
            fetchable from your server. Download them promptly rather than storing the link.
          </InfoBox>
        </DocCard>

        <DocCard icon={<RefreshCw size={24} />} title="Delivery, timeouts and retries">
          <Lead>
            Tavnit waits up to 10 seconds for your endpoint to respond. A connection failure or
            timeout is retried once after a short pause; an HTTP error response is not retried,
            because your server was reached and answered.
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
                "Not retried. The status code is recorded on the run so you can see what your server said.",
              ],
            ]}
          />
          <WarningBox>
            There is no long retry queue and no dead-letter replay. If your endpoint is down for an
            hour, those deliveries are lost — the runs still succeeded and their data is still in
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
            the run still completes, the data is still stored, and every other output — email, Bucket
            export, form fill — still fires.
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
              "Accept a reasonably large body — a long invoice with many line items is not small.",
              "Treat delivery as at-least-once. A retry after a timeout can deliver the same run twice, so make your handler idempotent by keying on run_id.",
              "Do not assume a fixed schema. Read fields by name and tolerate ones you do not recognise, so adding a flow field does not break your receiver.",
              "Log the raw body on failure. It is the only copy of what arrived.",
            ]}
          />
          <InfoBox
            color="yellow"
            icon={<AlertTriangle size={20} />}
            title="Keep the URL secret"
          >
            The endpoint URL is the only thing standing between the internet and your extracted data.
            Automation platforms embed a secret token in the path for exactly this reason. Do not
            publish it, and rotate it if it leaks.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Zap size={24} />} title="Webhooks from Cleaner rules and agents">
          <Lead>
            Flows are not the only thing that can call you. A Cleaner conditional action can fire a
            webhook when a row breaks a rule, and an agent can deliver its captured output to one.
            These are separate configurations with separate payloads.
          </Lead>
          <DataTable
            head={["Source", "Fires when", "Carries"]}
            rows={[
              ["Flow webhook", "A run completes successfully", "The run's rows and metadata"],
              [
                <>
                  <DocLink href="/docs/cleaners">Cleaner</DocLink> webhook
                </>,
                "A sweep finishes",
                "The cleaned dataset",
              ],
              [
                "Cleaner conditional action",
                "A row matches your rule — once per rule per run, not once per row",
                "A notification you compose, with the matching rows",
              ],
              [
                <>
                  <DocLink href="/docs/agents">Agent</DocLink> delivery
                </>,
                "An agent run finishes",
                "The agent, the run, its status and the captured output",
              ],
            ]}
          />
          <p>
            A rule-triggered notification is dispatched as soon as the rule matches — before any{" "}
            <DocLink href="/docs/human-in-the-loop">review pause</DocLink>. That is deliberate:{" "}
            <em>alert me when this happens</em> should not wait on a reviewer. The flow webhook, by
            contrast, only fires after a reviewer approves.
          </p>
        </DocCard>

        <DocCard icon={<LifeBuoy size={24} />} title="Troubleshooting">
          <Lead>
            Start at the run, not at your server. Every run logs whether webhook delivery was
            attempted, whether it succeeded, and what status code or error came back — which
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
                <>
                  It does not start with <InlineCode>https://</InlineCode>.
                </>,
                "Use an HTTPS endpoint. Plain HTTP is not accepted.",
              ],
              [
                "Delivery logged as failed with a status code",
                "Your endpoint returned 4xx or 5xx. It was reached, so there was no retry.",
                "Read your own server's logs — the payload is usually fine and the handler threw.",
              ],
              [
                "Delivery logged as failed with a timeout",
                "Your handler took longer than 10 seconds.",
                "Acknowledge first and process asynchronously, as above.",
              ],
              [
                "The same run arrived twice",
                "A retry followed a timeout on a request your server actually processed.",
                <>
                  De-duplicate on <InlineCode>run_id</InlineCode>.
                </>,
              ],
              [
                "Results arrive much later than expected",
                <>
                  The flow has <DocLink href="/docs/human-in-the-loop">human review</DocLink> enabled.
                </>,
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
                "The other half of an integration — how documents get in, with Python and JavaScript examples.",
            },
            {
              href: "/docs/buckets",
              label: "Keep a durable copy in Buckets",
              description:
                "Insurance against a missed delivery, and queryable without calling the API.",
            },
            {
              href: "/docs/human-in-the-loop",
              label: "Why a webhook might fire late",
              description: "Review pauses delivery until a named reviewer approves the run.",
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
