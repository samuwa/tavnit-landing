import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  AlertTriangle,
  Bot,
  Code2,
  Download,
  Gauge,
  Info,
  MonitorPlay,
  Send,
  Settings2,
  Workflow,
} from "lucide-react";
import {
  BulletList,
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
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Agents
        </h1>

        <DocCard icon={<Bot size={24} />} title="What agents are">
          <Lead>
            An agent is a browser automation you describe in plain language instead of scripting. You
            give it a mission and a starting URL; it opens a real cloud browser, works through the
            site — navigating, filling forms, clicking, reading — and returns data that matches the
            output schema you defined.
          </Lead>
          <p>
            The difference from a scraper is maintenance. A scraper is a list of CSS selectors that
            breaks when the site is redesigned. An agent reads the page it is on and works out what to
            do, so a moved button or a renamed field does not require a code change.
          </p>
          <InfoBox color="blue" icon={<Info size={20} />} title="Don't see Agents in your sidebar?">
            Agents are rolling out gradually. If the section is not visible in your organization yet,
            contact support to enable it.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Anatomy of an agent">
          <Lead>
            An agent is five pieces of configuration: what to do, where to start, what it knows going
            in, what it must bring back, and where that goes. Everything else is handled for you.
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
                "The URL the agent opens first.",
                <Fragment key="f1"><InlineCode>https://portal.acme-supply.com/login</InlineCode></Fragment>,
              ],
              [
                "Variables",
                "Values the mission can refer to. Either fixed literals or pulled from a flow run's extracted fields.",
                <Fragment key="f2"><InlineCode>part_number</InlineCode></Fragment>,
              ],
              [
                "Captures",
                "The typed schema of what you want back. The agent's answer is validated against it, so the output is always structured.",
                <Fragment key="f3"><InlineCode>unit_price</InlineCode></Fragment>,
              ],
              [
                "Delivery",
                "Where the captured output goes when the run finishes.",
                "Email, webhook, or a Bucket row",
              ],
            ]}
          />
          <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="The mission is the product">
            Nearly every disappointing agent run traces back to a vague mission. Name the exact
            buttons and page titles, say what to do when a lookup returns nothing, and say when to
            stop. A mission that reads like a runbook works; one that reads like a wish does not.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Code2 size={24} />} title="Output captures: the schema the agent must fill">
          <Lead>
            Captures declare the shape of the result. Each one has a name and a type, and nested
            structures are supported, so an agent can return a list of objects rather than a blob of
            text you have to parse afterwards.
          </Lead>
          <DataTable
            head={["Capture type", "Returns", "Use it for"]}
            rows={[
              ["Text", "A string", "Names, statuses, reference numbers, free text"],
              ["Number", "A decimal", "Prices, quantities, rates"],
              ["Integer", "A whole number", "Counts, stock levels"],
              ["Boolean", "True or false", "In stock, approved, exists"],
              ["Date", "A date as text", "Delivery dates, expiry dates"],
              ["Object", "A nested group of fields", "One record with several attributes"],
              ["List", "A repeating structure", "A table of results — one entry per row"],
              [
                "File",
                "A downloaded file",
                "Invoices, statements or reports the agent has to fetch",
              ],
            ]}
          />
          <InfoBox color="violet" icon={<Info size={20} />} title="Partial results are kept, not discarded">
            Every capture is optional. If the agent finds four of five values, the run returns the
            four it found rather than failing outright — you keep the partial result and can see
            exactly what is missing.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Workflow size={24} />} title="Chaining a flow to an agent">
          <Lead>
            The strongest setup is extract, then act. A flow pulls fields out of a document, and the
            agent uses those fields as its inputs — so the document you received drives what happens
            on someone else&apos;s website, with no copying by hand.
          </Lead>
          <NumberedList
            items={[
              "Open the flow's settings.",
              "Link the agent to the flow.",
              "Map extracted fields onto the agent's input variables.",
              "Run the flow — when extraction completes, the agent takes over automatically.",
            ]}
          />
          <p>
            Variables come from one of two places, and you can mix them in a single agent:
          </p>
          <DataTable
            head={["Variable source", "Where the value comes from"]}
            rows={[
              [
                "Static",
                "A fixed value stored on the agent — a portal username, a fixed warehouse code.",
              ],
              [
                "From a flow run",
                <Fragment key="f4">
                  A field from the triggering run&apos;s output. If the flow has a{" "}
                  <DocLink href="/docs/cleaners">Cleaner</DocLink>, the value is taken from the{" "}
                  <em>cleaned</em> output — so conversions and computed columns are already applied.
                </Fragment>,
              ],
            ]}
          />
          <p>
            <strong>Worked example.</strong> A purchase order arrives by{" "}
            <DocLink href="/docs/email-integration">email</DocLink>. The flow extracts one row per
            line item with a part number. A Cleaner normalises the part numbers. The linked agent
            then logs into the supplier portal, looks up each part, captures the live unit price and
            lead time, and writes the results into a{" "}
            <DocLink href="/docs/buckets">Bucket</DocLink> next to what the PO said — so the
            discrepancy is visible before anyone approves the order.
          </p>
        </DocCard>

        <DocCard icon={<Download size={24} />} title="Downloading files">
          <Lead>
            Give an agent a file-typed capture and it can fetch documents as well as read them — a
            statement behind a login, an invoice PDF from a portal. Files are collected during the
            run and stored when it finishes, then delivered as time-limited links.
          </Lead>
          <DataTable
            head={["Limit", "Value"]}
            rows={[
              ["Largest single file", "25 MB"],
              ["Total files per run", "100 MB"],
              ["How files reach you", "A link in the delivered output, valid for a limited period"],
            ]}
          />
          <p>
            Exceeding a limit does not kill the run — the agent is told the file was too large and
            carries on with the rest of the mission.
          </p>
        </DocCard>

        <DocCard icon={<MonitorPlay size={24} />} title="Watching a run">
          <Lead>
            Every agent run streams its steps as they happen, and you can open a live view of the
            browser session to watch it work. Finished runs keep a replay, so you can see exactly
            what the agent did rather than inferring it from the output.
          </Lead>
          <BulletList
            items={[
              "A step-by-step log of what the agent did, in order",
              "The captured output, and any captured files",
              "Run metrics: duration and credits used",
              "A live session while the run is in progress, and a replay afterwards",
              "Run and session identifiers, for support requests",
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Debug from the replay, not the output">
            When an agent returns the wrong value, the replay usually shows why in seconds — it
            logged into the wrong tenant, or the search returned no results and it guessed. Fix the
            mission, not the schema.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Gauge size={24} />} title="Limits and credits">
          <Lead>
            Agent runs are bounded so a mission that goes wrong cannot run forever. Two limits apply
            — a maximum runtime and a cap on how many steps the agent may take — and both can be
            tightened per agent.
          </Lead>
          <DataTable
            head={["Limit", "Default", "What happens when it is hit"]}
            rows={[
              ["Maximum runtime", "10 minutes", "The run is stopped and marked failed."],
              [
                "Step cap",
                "25 steps",
                "The agent stops taking actions; the run ends without a complete result.",
              ],
              [
                "Cost",
                "3 credits per minute",
                "Wall-clock time is rounded up to the next whole minute, with a one-minute minimum.",
              ],
            ]}
          />
          <WarningBox>
            Runtime is billed whether the run succeeds or fails. A mission that loops until it hits
            the ten-minute ceiling still costs the full ten minutes. Set a shorter maximum runtime on
            agents you are still tuning, and test with a low limit before raising it.
          </WarningBox>
          <p>
            Starting a run requires a positive credit balance. The exact cost is not known in advance
            — it depends how long the browsing takes — so Tavnit checks that you have credits before
            it starts and charges the actual minutes when the run ends.
          </p>
        </DocCard>

        <DocCard icon={<Send size={24} />} title="Where results go">
          <Lead>
            An agent&apos;s captured output can be delivered three ways, or left in the app for you
            to read. Delivery happens once the run completes, and file captures are turned into
            fetchable links first.
          </Lead>
          <DataTable
            head={["Delivery", "What arrives"]}
            rows={[
              ["Email", "The captured output as formatted JSON, to the addresses you configure."],
              [
                "Webhook",
                <Fragment key="f5">
                  A POST to your endpoint with the agent, the run, its status and the captured
                  output — see <DocLink href="/docs/webhooks">webhooks</DocLink>.
                </Fragment>,
              ],
              [
                "Bucket",
                <Fragment key="f6">
                  One row per run in a <DocLink href="/docs/buckets">Bucket</DocLink>, with captures
                  mapped onto columns.
                </Fragment>,
              ],
              ["None", "The result stays on the run's page in the app."],
            ]}
          />
          <p>
            Delivery can optionally include the input variables the run was given, which makes a
            Bucket row self-describing: what was asked, and what came back.
          </p>
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Permissions and lifecycle">
          <Lead>
            Creating, editing and deleting agents is restricted to Owners and Admins; members with a
            suitable role can trigger runs. Agents can be deactivated instead of deleted, and an
            agent that is wired into an active flow cannot be deleted at all.
          </Lead>
          <BulletList
            items={[
              "Only Owners and Admins can create, edit or delete an agent",
              "An inactive agent cannot be run",
              "An agent linked to an active flow must be unlinked before it can be deleted",
              <Fragment key="f7">
                Runs can also be started from an AI assistant via the{" "}
                <DocLink href="/docs/mcp-connector">MCP connector</DocLink>, or from a linked flow
              </Fragment>,
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Triggering from your own code">
            Agents are designed to be triggered from the app, from a linked flow, or from an AI
            assistant. If you need to start one from your own system, the agent&apos;s ID is on its
            detail page — but the practical route for most integrations is to trigger the{" "}
            <DocLink href="/docs/api-integration">flow</DocLink> and let the chained agent follow,
            rather than calling the agent directly.
          </InfoBox>
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
              description: "The payload an agent run delivers, and how retries behave.",
            },
            {
              href: "/docs/pipeline-map",
              label: "See flows and agents as one pipeline",
              description: "A visual map of how documents move from extraction through to action.",
            },
          ]}
        />
      </section>
    </>
  );
}
