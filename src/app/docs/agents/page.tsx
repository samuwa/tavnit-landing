import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  AlertTriangle,
  Bot,
  CalendarClock,
  Code2,
  Download,
  Gauge,
  HelpCircle,
  Info,
  KeyRound,
  Layers,
  Mail,
  MonitorPlay,
  PlusCircle,
  Send,
  Settings2,
  Terminal,
  Users,
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
  WarningBox,
} from "@/components/docs/ui";

export const metadata = docMetadata("agents");

export default function Page() {
  return (
    <>
      <DocsPageSchema slug="agents" />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
          Agents
        </h1>

        <DocCard icon={<Bot size={24} />} title="What agents are">
          <Lead>
            An agent is a browser automation you describe in plain language instead of scripting. You
            give it a mission and a starting URL; it opens a real cloud browser, works through the
            site (navigating, filling forms, clicking, reading, downloading) and returns data that
            matches the output schema you defined.
          </Lead>
          <p>
            The difference from a scraper is maintenance. A scraper is a list of CSS selectors that
            breaks when the site is redesigned. An agent reads the page it is on and works out what to
            do, so a moved button or a renamed field does not require a code change.
          </p>
          <p>
            Use a <DocLink href="/docs/flows">flow</DocLink> when the data is in a document you
            received. Use an agent when the data lives on a website, or when something has to be done
            on a website with data you already have.
          </p>
          <InfoBox color="blue" icon={<Info size={20} />} title="Don't see Agents in your sidebar?">
            Agents are enabled per organization, on request. If the section is not in your sidebar,
            contact support to have it turned on for your organization.
          </InfoBox>
        </DocCard>

        <DocCard icon={<PlusCircle size={24} />} title="Create an agent">
          <Lead>
            Agents live under <strong>Agents</strong> in the sidebar. You can start from a blank
            agent or build one from an existing flow, so the flow&apos;s output fields arrive already
            set up as input variables.
          </Lead>
          <DataTable
            head={["Button", "What you get"]}
            rows={[
              [
                <strong key="c0">Create Agent</strong>,
                "A blank agent with just a name. You configure everything on the next screen.",
              ],
              [
                <strong key="c1">New from flow</strong>,
                "Pick a flow and click Build Agent. The new agent gets one input variable per output field of the flow, each set to read that field from the flow run.",
              ],
            ]}
          />
          <NumberedList
            items={[
              <Fragment key="s0">
                Click <strong>Create Agent</strong> (or <strong>New from flow</strong>) and give the
                agent a name.
              </Fragment>,
              <Fragment key="s1">
                On the agent&apos;s <strong>Configuration</strong> tab, write the{" "}
                <strong>Mission</strong> and the <strong>Starting URL</strong>.
              </Fragment>,
              <Fragment key="s2">
                Add the <strong>Variables</strong> the mission needs and the{" "}
                <strong>Captures</strong> you want back.
              </Fragment>,
              <Fragment key="s3">
                Click <strong>Save</strong>, then <strong>Test run</strong> and watch the run live.
              </Fragment>,
              <Fragment key="s4">
                When the result is right, set up <strong>Delivery</strong> and switch the agent to
                active in the top bar.
              </Fragment>,
            ]}
          />
          <p>
            A new agent starts as a draft. The active switch in the top bar controls whether it runs
            on its schedule. Duplicating an agent copies its configuration, but not its secret values
            or its schedule, so a copy never starts firing on its own.
          </p>
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Anatomy of an agent">
          <Lead>
            An agent is five pieces of configuration: what to do, where to start, what it knows going
            in, what it must bring back, and where that goes.
          </Lead>
          <DataTable
            head={["Part", "What it is", "Example"]}
            rows={[
              [
                "Mission",
                "A plain-language instruction. Write it as you would brief a colleague, including how to handle the awkward cases.",
                <Fragment key="f0"><em>
                  &ldquo;Log in with the provided credentials, open Orders, and record the current
                  unit price for each part number.&rdquo;
                </em></Fragment>,
              ],
              [
                "Start point",
                "The URL the agent opens first. Web is the only start point type today; Desktop is shown as coming soon.",
                <Fragment key="f1"><InlineCode>https://portal.acme-supply.com/login</InlineCode></Fragment>,
              ],
              [
                "Variables",
                "Values the mission can refer to: fixed values, secrets, or fields pulled from a flow run.",
                <Fragment key="f2"><InlineCode>part_number</InlineCode></Fragment>,
              ],
              [
                "Captures",
                "The typed schema of what you want back. The agent's answer is validated against it, so the output is always structured.",
                <Fragment key="f3"><InlineCode>unit_price</InlineCode></Fragment>,
              ],
              [
                "Delivery",
                "Where the captured output goes when the run finishes. You can turn on several at once.",
                "Email, webhook, Bucket, Subject",
              ],
            ]}
          />
          <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="The mission is the product">
            Nearly every disappointing agent run traces back to a vague mission. Name the exact
            buttons and page titles, say what to do when a lookup returns nothing, and say when to
            stop. A mission that reads like a runbook works; one that reads like a wish does not.
          </InfoBox>
        </DocCard>

        <DocCard icon={<KeyRound size={24} />} title="Variables and secrets">
          <Lead>
            Each variable has a name, a type (text, number, boolean, date, object or list) and a
            source. The mission refers to variables by name.
          </Lead>
          <DataTable
            head={["Source", "Where the value comes from"]}
            rows={[
              [
                "Static",
                "A fixed value stored on the agent: a portal username, a warehouse code. API calls can override static values per run.",
              ],
              [
                "From flow run",
                <Fragment key="v0">
                  A field of the triggering flow run&apos;s output. If the flow has a{" "}
                  <DocLink href="/docs/cleaners">Cleaner</DocLink>, the value is taken from the{" "}
                  <em>cleaned</em> output, so conversions and computed columns are already applied.
                  These variables only get a value when a flow (or a pipeline) triggers the agent.
                </Fragment>,
              ],
            ]}
          />
          <p>
            <strong>Secret variables.</strong> A static text variable can be flagged{" "}
            <strong>Secret</strong>, for a portal password for example. Its value is stored encrypted
            and never appears in the agent configuration, run inputs, outputs or step log.
          </p>
          <BulletList
            items={[
              "Only Owners and Admins, who are the only ones who can edit an agent, can set or clear a secret",
              "Secrets must be at least 6 characters; once saved, the field shows that a value exists without showing it",
              "The agent types the secret into the page by name, without ever seeing the value",
              "A secret can only be typed on the starting URL's site (the same host or one of its subdomains)",
              "If a secret value shows up in the page text, it is masked as *** in the steps and output",
            ]}
          />
          <WarningBox>
            The live view and the session replay show whatever the page renders. Only password-type
            inputs are masked by the browser, so a secret typed into an ordinary text field can be
            visible there.
          </WarningBox>
        </DocCard>

        <DocCard icon={<Code2 size={24} />} title="Output captures: the schema the agent must fill">
          <Lead>
            Captures declare the shape of the result. Each one has a name, a type and an optional
            description, and nested structures are supported, so an agent can return a list of
            objects rather than a blob of text you have to parse afterwards.
          </Lead>
          <DataTable
            head={["Capture type", "Returns", "Use it for"]}
            rows={[
              ["text", "A string", "Names, statuses, reference numbers, free text"],
              ["number", "A number", "Prices, quantities, rates"],
              ["boolean", "True or false", "In stock, approved, exists"],
              ["date", "A date as text", "Delivery dates, expiry dates"],
              ["object", "A nested group of fields", "One record with several attributes"],
              ["list", "A repeating structure", "A table of results, one entry per row"],
              ["file", "A downloaded file", "Invoices, statements or reports the agent has to fetch"],
            ]}
          />
          <InfoBox color="violet" icon={<Info size={20} />} title="Partial results are kept, not discarded">
            Every capture is optional. If the agent finds four of five values, the run returns the
            four it found rather than failing outright, so you keep the partial result and can see
            exactly what is missing.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Download size={24} />} title="Downloading files">
          <Lead>
            Give an agent a file-typed capture and it can fetch documents as well as read them: a
            statement behind a login, an invoice PDF from a portal. It can download a file from a
            link, or click a download button and keep whatever file the site sends back.
          </Lead>
          <DataTable
            head={["Limit", "Value"]}
            rows={[
              ["Largest single file", "25 MB"],
              ["Total files per run", "100 MB"],
              ["Where files are kept", "Stored with the run; download them from the run page under Captured files"],
              ["Links in deliveries", "Email and webhook payloads carry a link to each file, valid for 7 days"],
            ]}
          />
          <p>
            Exceeding a limit does not stop the run: the agent is told the file was too large and
            carries on with the rest of the mission. If a site answers a download with a web page
            instead of a file (a login screen, for instance), the agent is told so rather than saving
            the page as if it were the document.
          </p>
        </DocCard>

        <DocCard icon={<Mail size={24} />} title="Mailbox: codes sent by email">
          <Lead>
            Some portals email a one-time login code or a confirmation link. Connect a mailbox and the
            agent can wait for that email, read the code or link, and carry on. It is set up under{" "}
            <strong>Settings → Mailbox</strong>.
          </Lead>
          <DataTable
            head={["Setting", "What it does"]}
            rows={[
              ["Connect a mailbox", "Turns the feature on for this agent."],
              ["Sender to wait for", "Required. The address (or name) the code comes from. Mail from anyone else is ignored."],
              ["Subject contains (optional)", "Narrows the match further, for example code."],
              ["Mailbox address — from variable", "The input variable that holds the mailbox address."],
              ["App password — from variable", "The input variable that holds the mailbox's app password."],
              ["IMAP host / IMAP port", "Defaults to imap.gmail.com and 993. Change them for other providers."],
            ]}
          />
          <BulletList
            items={[
              "The mailbox is read over IMAP in read-only mode; nothing is marked as read or changed",
              "Only a message that arrives after the run started counts, the newest match wins, and each message is used at most once",
              "The agent waits up to 5 minutes for the email, checking every 10 seconds",
              "If nothing arrives, the agent is told so, and your mission decides what happens next (resend the code, or stop)",
              "For Gmail or Google Workspace, turn on 2-step verification and create an app password",
            ]}
          />
          <p>
            Say it in the mission, too: <em>&ldquo;After submitting the login form, wait for the
            verification email and enter the code.&rdquo;</em>
          </p>
        </DocCard>

        <DocCard icon={<Workflow size={24} />} title="Chaining a flow to an agent">
          <Lead>
            The strongest setup is extract, then act. A flow pulls fields out of a document, and the
            agent uses those fields as its inputs, so the document you received drives what happens
            on someone else&apos;s website with no copying by hand.
          </Lead>
          <NumberedList
            items={[
              <Fragment key="l0">
                On the agent, add variables with the source <strong>From flow run</strong> and pick
                the flow field each one reads (or use <strong>New from flow</strong> to create them
                all at once).
              </Fragment>,
              <Fragment key="l1">
                Open the flow and select the <strong>Agent</strong> panel in its sidebar.
              </Fragment>,
              <Fragment key="l2">
                Click <strong>Link Agent</strong> and choose the agent.
              </Fragment>,
              "Run the flow. When the run completes, the agent starts automatically with the flow's output as its input.",
            ]}
          />
          <BulletList
            items={[
              "The agent receives the cleaned output when the flow has a Cleaner",
              <Fragment key="l3">
                If the flow uses <DocLink href="/docs/human-in-the-loop">Human in the Loop</DocLink>,
                the agent runs only after a reviewer approves, with the approved data; a rejected run
                never reaches the agent
              </Fragment>,
              "Deliveries and webhooks of an agent run started by a flow carry that flow run's ID",
              <Fragment key="l4">
                In a <DocLink href="/docs/pipelines">pipeline</DocLink>, an Agent node does the same
                thing on a canvas, fed by a flow node
              </Fragment>,
            ]}
          />
          <p>
            <strong>Worked example.</strong> A purchase order arrives by{" "}
            <DocLink href="/docs/email-integration">email</DocLink>. The flow extracts the supplier
            and the part numbers, and a Cleaner normalises them. The linked agent logs into the
            supplier portal, looks up the parts, captures the live unit price and lead time, and
            writes the results into a <DocLink href="/docs/buckets">Bucket</DocLink> next to what the
            PO said, so the discrepancy is visible before anyone approves the order.
          </p>
        </DocCard>

        <DocCard icon={<Send size={24} />} title="Where results go">
          <Lead>
            An agent can deliver each completed run to several places at once. Turn on as many
            deliveries as you need on the <strong>Delivery</strong> tab; they run independently, so
            one failing never stops the others. With none turned on, results stay on the run page to
            view or download.
          </Lead>
          <DataTable
            head={["Delivery", "What arrives"]}
            rows={[
              [
                "Email",
                "The captured output as formatted JSON, to the recipients you list.",
              ],
              [
                "Webhook",
                <Fragment key="d0">
                  A POST to your URL with the captured output and the run&apos;s input variables. See{" "}
                  <DocLink href="/docs/webhooks">webhooks</DocLink>.
                </Fragment>,
              ],
              [
                "Bucket",
                <Fragment key="d1">
                  One row per run in a <DocLink href="/docs/buckets">Bucket</DocLink>, with captures
                  mapped onto columns (<strong>Map captures → bucket columns</strong>).
                </Fragment>,
              ],
              [
                "Subject",
                <Fragment key="d2">
                  Files the captured documents into cases of a{" "}
                  <DocLink href="/docs/subjects">Subject</DocLink>: pick the list capture with one
                  row per case (or the whole output as one case), the field that names the case, and
                  a document type for each file capture. Re-running the agent never creates a
                  duplicate case; by default it only adds the documents a case is still missing.
                </Fragment>,
              ],
            ]}
          />
          <p>
            Email and Bucket deliveries have an <strong>Include input variables in the delivered
            payload</strong> option, which makes a Bucket row self-describing: what was asked, and
            what came back. The webhook always includes them.
          </p>
          <p>
            <strong>The webhook payload</strong> carries <InlineCode>bot_id</InlineCode>,{" "}
            <InlineCode>bot_run_id</InlineCode>, <InlineCode>status</InlineCode>,{" "}
            <InlineCode>inputs</InlineCode> (the run&apos;s resolved input variables, secrets
            excluded), <InlineCode>output</InlineCode> (the captures, with a link for each file) and,
            when a flow run triggered the agent, <InlineCode>flow_run_id</InlineCode>, so your
            system can attach the result to the document it came from.
          </p>
          <CodeBlock
            lang="JSON"
            code={`{
  "bot_id": "3f2a...",
  "bot_run_id": "9c41...",
  "status": "completed",
  "flow_run_id": "b7e0...",
  "inputs": { "part_number": "AX-2210" },
  "output": { "unit_price": 18.4, "lead_time": "3 weeks" }
}`}
          />
          <p>
            If a delivery fails, the run is marked <strong>Completed with warnings</strong> and the
            run page lists the <strong>Delivery errors</strong>. The agent&apos;s creator also gets
            an in-app notification.
          </p>
        </DocCard>

        <DocCard icon={<CalendarClock size={24} />} title="Running an agent">
          <Lead>
            An agent can be started five ways. However it starts, it goes through the same credit
            check, limits and deliveries.
          </Lead>
          <DataTable
            head={["Trigger", "How"]}
            rows={[
              ["Test run", "The Test run button on the agent (or Run on the agents list). Uses the static variables."],
              ["Schedule", "Settings → Schedule, described below."],
              ["Linked flow", "Every completed run of a flow with this agent linked, as above."],
              [
                "Pipeline",
                <Fragment key="r0">
                  An Agent node in a <DocLink href="/docs/pipelines">pipeline</DocLink>.
                </Fragment>,
              ],
              ["API", "A POST from your own system, described below."],
            ]}
          />
          <p>
            <strong>Schedule.</strong> Turn on <strong>Run on a schedule</strong> and pick a
            frequency: <strong>Every hour</strong>, <strong>Every day</strong>,{" "}
            <strong>Weekdays (Mon–Fri)</strong>, <strong>Every week</strong> or{" "}
            <strong>Custom cron</strong> (five fields: minute, hour, day of month, month, day of
            week, for example <InlineCode>30 8 * * 1-5</InlineCode>). Times are in your
            organization&apos;s timezone, and the settings panel shows the next run.
          </p>
          <BulletList
            items={[
              "Scheduled runs use the static variables and secrets saved on the agent",
              "The schedule only fires while the agent is active",
              "Runs start within about a minute of the scheduled time, later if all workers are busy",
              "A missed window is not replayed: after a delay the agent fires once, not once per missed slot",
              "A scheduled run that can't start (the previous run is still going, or there are not enough credits) appears as a failed run that says why",
              "Failures of scheduled and API runs send the agent's creator an in-app notification, since nobody is watching the run page",
            ]}
          />
        </DocCard>

        <DocCard icon={<Layers size={24} />} title="Concurrency: one run at a time">
          <Lead>
            By default, overlapping triggers run in parallel. Many portals don&apos;t like two
            sessions for the same user at once, so an agent can be set to run one run at a time under{" "}
            <strong>Settings → Concurrency</strong>.
          </Lead>
          <DataTable
            head={["Setting", "Effect"]}
            rows={[
              [
                "Run one at a time",
                "While a run is queued or running, new triggers wait their turn and start one after another, oldest first.",
              ],
              [
                "Minimum time between runs (minutes)",
                "0 to 1440. Counted from the end of one run to the start of the next. It is a minimum: the next run also waits for a free worker.",
              ],
            ]}
          />
          <BulletList
            items={[
              "A run waiting for its turn shows the status Waiting; it holds no worker and is not billed",
              "Up to 20 runs can wait per agent; beyond that, new triggers are refused (the API answers 429)",
              "A run that waits more than 24 hours is marked failed",
              "Only one scheduled run waits at a time, so a slow agent on a fast schedule can't pile up",
            ]}
          />
        </DocCard>

        <DocCard icon={<MonitorPlay size={24} />} title="Watching a run">
          <Lead>
            Every run streams its steps as they happen, and you can open a live view of the browser
            session to watch it work. Finished runs keep a replay, so you can see exactly what the
            agent did rather than inferring it from the output.
          </Lead>
          <DataTable
            head={["Status", "Meaning"]}
            rows={[
              ["Waiting", "Queued behind another run of an agent set to run one at a time."],
              ["Queued", "Accepted and waiting for a worker."],
              ["Running", "The browser session is open."],
              ["Completed", "Finished and delivered. Completed with warnings means a delivery failed."],
              ["Failed", "The run hit an error or a limit; the run page says which."],
              ["Cancelled", "Someone stopped the run."],
            ]}
          />
          <BulletList
            items={[
              "Steps: a log of what the agent did, in order",
              "Captured output and Captured files, with downloads",
              "Summary: duration, credits used, LLM calls and tokens",
              "Watch live session while it runs, View session replay afterwards",
              "Identifiers (run ID and session ID) for support requests",
            ]}
          />
          <p>
            <strong>Cancel run</strong> stops a waiting, queued or running run. The browser session
            ends within a few seconds and nothing is delivered. Browser minutes already used are still
            billed.
          </p>
          <InfoBox color="blue" icon={<Info size={20} />} title="Debug from the replay, not the output">
            When an agent returns the wrong value, the replay usually shows why in seconds: it logged
            into the wrong tenant, or the search returned no results and it guessed. Fix the mission,
            not the schema.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Gauge size={24} />} title="Limits and credits">
          <Lead>
            Runs are bounded so a mission that goes wrong cannot run forever. Two limits apply, both
            set per agent under <strong>Settings → Limits</strong>. Leave a field empty to use the
            default.
          </Lead>
          <DataTable
            head={["Limit", "Default", "Range", "When it is hit"]}
            rows={[
              ["Max runtime (minutes)", "10 minutes", "1 to 20 minutes", "The browser is closed and the run is marked failed."],
              [
                "LLM request limit",
                "25",
                "5 to 500",
                "The agent stops and the run is marked failed. Raise it for missions that cover many pages.",
              ],
            ]}
          />
          <p>
            <strong>Cost:</strong> 3 credits per minute of browser time. Time is rounded up to the
            next whole minute, with a one-minute minimum. See{" "}
            <DocLink href="/docs/credits">credits</DocLink>.
          </p>
          <WarningBox>
            Browser time is billed whether the run completes, fails or is cancelled. A mission that
            loops until it hits a 20-minute ceiling costs the full 20 minutes. Keep the max runtime
            low on agents you are still tuning.
          </WarningBox>
          <p>
            Starting a run needs at least one minute&apos;s worth of credits (3). The exact cost is
            not known in advance, so Tavnit checks the balance before starting and charges the actual
            minutes when the run ends. If the balance runs out in the meantime, whatever is left is
            charged and the run page notes the shortfall. To add credits, contact the Tavnit team.
          </p>
        </DocCard>

        <DocCard icon={<Terminal size={24} />} title="Triggering from the API">
          <Lead>
            Your own systems can start an agent and poll for the result with your API key, sent as{" "}
            <InlineCode>X-API-Key</InlineCode> to <InlineCode>https://run.tavnit.io/api</InlineCode>.
            The agent&apos;s ID is on its <strong>Agent ID</strong> panel.
          </Lead>
          <DataTable
            head={["Request", "What it does"]}
            rows={[
              [
                <InlineCode key="a0">{"POST /bots/{agent_id}/runs"}</InlineCode>,
                <Fragment key="a1">
                  Starts a run. Optional body <InlineCode>{`{"inputs": {...}}`}</InlineCode>{" "}
                  overrides static variables; secrets can&apos;t be passed. Returns 202 with{" "}
                  <InlineCode>bot_run_id</InlineCode> and a status of queued or waiting.
                </Fragment>,
              ],
              [
                <InlineCode key="a2">{"GET /bot-runs/{bot_run_id}"}</InlineCode>,
                "Status, timings, credits charged, inputs and output (with file links).",
              ],
              [
                <InlineCode key="a3">{"GET /bots/{agent_id}/runs"}</InlineCode>,
                "The agent's runs, newest first, filterable by status.",
              ],
              [
                <InlineCode key="a4">{"POST /bot-runs/{bot_run_id}/cancel"}</InlineCode>,
                "Cancels a waiting, queued or running run.",
              ],
            ]}
          />
          <p>
            Every API call starts a new, billed run. Insufficient credits return 402. For the full
            request and response reference, see the{" "}
            <DocLink href="/docs/api-integration">API page</DocLink>. If you would rather not call the
            agent directly, trigger the linked flow and let the agent follow.
          </p>
        </DocCard>

        <DocCard icon={<Users size={24} />} title="Permissions">
          <Lead>
            Only Owners and Admins can create, edit, duplicate or delete an agent, which includes
            setting secrets. Members can run agents and read their runs. HITL Only members have no
            access to agents.
          </Lead>
          <p>
            See <DocLink href="/docs/user-roles">user roles and permissions</DocLink> for the full
            matrix.
          </p>
        </DocCard>

        <DocCard icon={<HelpCircle size={24} />} title="Troubleshooting">
          <DataTable
            head={["Symptom", "Likely cause and fix"]}
            rows={[
              [
                "The run failed with a runtime message",
                "It hit Max runtime. Check the replay for where it got stuck; tighten the mission, or raise the limit if the task is genuinely long.",
              ],
              [
                "The run stopped halfway through a long list",
                "The LLM request limit (default 25) ran out. Raise it under Settings → Limits.",
              ],
              [
                "A From flow run variable is empty",
                "The run was not started by a flow, or the field name doesn't exist in the flow's (cleaned) output.",
              ],
              [
                "A secret was not typed",
                "The page was on a different site from the starting URL, or the secret was never saved (it shows Not set).",
              ],
              [
                "The agent never received the email code",
                "Check the sender, the optional subject filter, and the app password; the email must arrive after the run started.",
              ],
              [
                "Completed with warnings",
                "A delivery failed (a bad webhook URL, a missing bucket). The run page lists the delivery errors.",
              ],
              [
                "The status stays Waiting",
                "The agent runs one at a time and another run, or the minimum gap, is ahead of it.",
              ],
              [
                "A scheduled run shows as failed without running",
                "The previous run was still in progress, or there were not enough credits. The run's message says which.",
              ],
            ]}
          />
        </DocCard>

        <Related
          links={[
            {
              href: "/docs/cleaners",
              label: "Clean extracted data before an agent uses it",
              description:
                "Agents read the cleaned output of a flow, so normalising values first improves what the agent can look up.",
            },
            {
              href: "/docs/buckets",
              label: "Store agent results in Buckets",
              description: "Map captures onto columns and accumulate one row per run.",
            },
            {
              href: "/docs/webhooks",
              label: "Push agent output to your systems",
              description: "How webhook deliveries work and what to expect on your endpoint.",
            },
            {
              href: "/docs/pipelines",
              label: "Put agents in a pipeline",
              description: "Chain flows, agents and other steps on a canvas.",
            },
            {
              href: "/docs/credits",
              label: "Credits",
              description: "How browser minutes are billed alongside the rest of Tavnit.",
            },
          ]}
        />
      </section>
    </>
  );
}
