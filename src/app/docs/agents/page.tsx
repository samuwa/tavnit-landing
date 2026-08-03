import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import { AlertTriangle, Bot, Code2, Info, MonitorPlay, Settings2, Workflow } from "lucide-react";
import { BulletList, DocCard, InfoBox, InlineCode, NumberedList } from "@/components/docs/ui";
import {
  API_BASE,
} from "@/components/docs/code-samples";

export const metadata = docMetadata("agents");

export default function Page() {
  return (
    <>
      <DocsPageSchema slug="agents" />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Agents
        </h1>

        <DocCard icon={<Bot size={24} />} title="What Are Agents?">
          <p>
            Agents are AI-powered browser automation bots. You describe a mission in plain
            language — for example, &ldquo;look up each part number on the supplier portal and capture
            its current unit price&rdquo; — and give the agent a starting URL. The agent opens a real
            cloud browser, navigates the website, fills forms, clicks buttons, and reads the results.
          </p>
          <p>
            Unlike scrapers, agents don&apos;t need selectors or scripts to maintain. They figure out
            the page as they go and return data that matches the output schema you define.
          </p>
          <InfoBox color="blue" icon={<Info size={20} />} title="Don't see Agents in your sidebar?">
            Agents are rolling out gradually. If the section isn&apos;t visible in your organization
            yet, contact support to enable it.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Anatomy of an Agent">
          <BulletList
            items={[
              <><strong>Mission</strong> — a plain-language instruction describing what the agent should accomplish.</>,
              <><strong>Start point</strong> — the URL where the agent begins.</>,
              <><strong>Input variables</strong> — values the mission can reference. Set them statically, or pull them from a flow run&apos;s extracted fields.</>,
              <><strong>Output captures</strong> — the schema of the data you want back. The agent&apos;s result is validated against it, so output is always typed and structured.</>,
              <><strong>Delivery</strong> — where results go: email, webhook, or straight into a Bucket.</>,
            ]}
          />
        </DocCard>

        <DocCard icon={<Workflow size={24} />} title="Chaining a Flow to an Agent">
          <p>
            The most powerful setup is extraction → action. When a flow finishes processing a
            document, it can launch an agent automatically, feeding extracted fields in as inputs:
          </p>
          <NumberedList
            items={[
              "Open your flow's settings",
              "Link an agent to the flow",
              "Map extracted fields to the agent's input variables",
              "Run the flow — when extraction completes, the agent takes over",
            ]}
          />
          <p>
            Example: extract part numbers from a purchase order, then send an agent to the supplier
            portal to look up live prices for each one.
          </p>
        </DocCard>

        <DocCard icon={<MonitorPlay size={24} />} title="Watching Runs Live">
          <p>
            Every agent run streams its progress step by step, and you can open a live view of the
            browser session to watch the agent work in real time. Finished runs keep a replay so
            you can audit exactly what the agent did.
          </p>
          <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Runtime limits">
            Agent runs have a maximum runtime and a request cap so they stay predictable, and
            runtime is billed in credits per minute. You can tighten both limits per agent.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Code2 size={24} />} title="Triggering via API">
          <p>
            Besides manual runs and flow chaining, you can start an agent programmatically with{" "}
            <InlineCode>{`POST ${API_BASE}/bots/<agent_id>/run`}</InlineCode> using your{" "}
            <InlineCode>X-API-Key</InlineCode> header.
          </p>
        </DocCard>
      </section>
    </>
  );
}
