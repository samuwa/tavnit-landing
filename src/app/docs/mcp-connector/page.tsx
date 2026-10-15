import Link from "next/link";
import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import { MCP_URL } from "@/lib/site";
import {
  AlertTriangle,
  Info,
  KeyRound,
  LifeBuoy,
  MessageSquare,
  Plug,
  ShieldCheck,
  Settings2,
  Sparkles,
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

export const metadata = docMetadata("mcp-connector");

const SERVER_URL = `${MCP_URL}/mcp`;

/**
 * Mirrors the numbered steps rendered under "Connect claude.ai". HowTo markup
 * has to describe steps the page actually shows, so the two must stay in sync.
 */
const HOW_TO = {
  name: "Connect Tavnit to claude.ai with the MCP connector",
  description:
    "Add Tavnit as a connector in claude.ai, sign in with your Tavnit account, pick the organization the assistant may work in and approve. No key or URL to copy.",
  steps: [
    {
      name: "Open the Integrations page in Tavnit",
      text: "Sign in to the Tavnit app and open Integrations from the sidebar. The AI apps card shows the server URL and an Add to Claude button.",
    },
    {
      name: "Add the connector in claude.ai",
      text: "Select Add to Claude, or in claude.ai go to Settings, then Connectors, then Add custom connector, and enter the server URL. Leave the OAuth client fields empty. Custom connectors need a Claude Pro plan or above.",
    },
    {
      name: "Sign in and pick an organization",
      text: "Select Connect. A Tavnit page opens: sign in if you are not already, choose the organization the assistant may work in, and approve.",
    },
    {
      name: "Confirm the connection",
      text: "Start a new chat and ask the assistant which Tavnit tools it has. If it lists them, the connector is live.",
    },
  ],
};

export default function Page() {
  return (
    <>
      <DocsPageSchema slug="mcp-connector" howTo={HOW_TO} />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
          MCP Connector
        </h1>

        <DocCard icon={<Plug size={24} />} title="What the MCP connector does">
          <Lead>
            The MCP connector adds your Tavnit organization as a set of tools inside an AI
            assistant. Once connected, you describe what you need in plain language and the
            assistant designs and configures it in your live account: flows, cleaning rules,
            buckets, pipelines, integrations.
          </Lead>
          <p>
            MCP (Model Context Protocol) is the open standard that lets AI assistants call external
            tools. Tavnit runs an MCP server at <InlineCode>{SERVER_URL}</InlineCode>. The
            connector signs you in with your Tavnit account (OAuth 2.1), so there is no key or URL
            to copy: the assistant acts as you, in the organization you pick, with your role. It
            works with <strong>claude.ai</strong> (Pro and above), <strong>Claude Code</strong>,{" "}
            <strong>Claude Desktop</strong>, <strong>Cursor</strong>, <strong>ChatGPT</strong>{" "}
            (paid plans) and any other client that supports remote MCP servers with OAuth.
          </p>
          <p>
            For what the connector is for, and how it compares to pasting a file into a chat, see
            the{" "}
            <Link href="/integrations/mcp" className="text-accent hover:underline">
              MCP connector overview
            </Link>
            .
          </p>
          <InfoBox color="blue" icon={<Info size={20} />} title="Available to every organization">
            MCP access is on for every Tavnit organization. If the AI apps card is missing from your
            Integrations page, an administrator has switched it off for your organization; contact
            support to have it restored.
          </InfoBox>
        </DocCard>

        <DocCard icon={<KeyRound size={24} />} title="Before you start">
          <Lead>
            You need a Tavnit account that belongs to at least one organization, and an MCP
            client. That is all: the connection is approved with your sign-in, not with a key.
          </Lead>
          <DataTable
            head={["Requirement", "Where it comes from"]}
            rows={[
              [
                "A Tavnit account",
                <Fragment key="f0">
                  The same email and password (or Google sign-in) you use for the app. The
                  consent page asks you to sign in when you are not already.
                </Fragment>,
              ],
              [
                "An organization",
                <Fragment key="f1">
                  You pick one when you approve the connection. Only organizations you belong to,
                  with MCP access on, are offered.
                </Fragment>,
              ],
              [
                "An MCP client",
                <Fragment key="f2">
                  claude.ai on a Pro plan or above, Claude Code, Claude Desktop, Cursor, ChatGPT on
                  a paid plan, or any client that supports remote MCP servers with OAuth.
                </Fragment>,
              ],
              [
                "Your role",
                <Fragment key="f3">
                  The assistant inherits your role in the organization you picked, so it can do
                  only what you can do. See <DocLink href="/docs/user-roles">user roles</DocLink>.
                </Fragment>,
              ],
            ]}
          />
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Connect claude.ai">
          <Lead>
            Add Tavnit as a connector and approve it with your account. There is nothing to
            install and no configuration file to edit.
          </Lead>
          <NumberedList
            items={[
              <Fragment key="f4">
                Open <strong>Integrations</strong> in the Tavnit sidebar. The <strong>AI apps</strong>{" "}
                card shows the server URL and an <strong>Add to Claude</strong> button.
              </Fragment>,
              <Fragment key="f5">
                Select <strong>Add to Claude</strong>, or in claude.ai go to{" "}
                <strong>Settings → Connectors → Add custom connector</strong> and enter the server
                URL below. Leave the OAuth client id and secret empty.
              </Fragment>,
              <Fragment key="f6">
                Select <strong>Connect</strong>. A Tavnit page opens: sign in if you are not
                already, choose the organization the assistant may work in, and approve.
              </Fragment>,
              <Fragment key="f7">
                Open a new chat and ask the assistant which Tavnit tools it has. If it lists them,
                the connector is live.
              </Fragment>,
            ]}
          />
          <CodeBlock lang="text" code={SERVER_URL} />
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Connect Cursor, Claude Code, ChatGPT or another client">
          <Lead>
            Every client takes the same server URL and runs the same sign-in. Add it as a remote
            (URL) server, not a command-based one: there is no local process to run.
          </Lead>
          <DataTable
            head={["Client", "How"]}
            rows={[
              [
                "Cursor",
                <Fragment key="c0">
                  Select <strong>Add to Cursor</strong> on the Integrations page, or add{" "}
                  <InlineCode>{`{"mcpServers":{"tavnit":{"url":"${SERVER_URL}"}}}`}</InlineCode> to{" "}
                  <InlineCode>~/.cursor/mcp.json</InlineCode>. Then open Settings → Tools &amp; MCP
                  and select <strong>Login</strong> on the Tavnit entry.
                </Fragment>,
              ],
              [
                "Claude Code",
                <Fragment key="c1">
                  Run <InlineCode>{`claude mcp add --transport http tavnit ${SERVER_URL}`}</InlineCode>,
                  then <InlineCode>/mcp</InlineCode> → Tavnit → <strong>Authenticate</strong>.
                </Fragment>,
              ],
              [
                "Claude Desktop",
                <Fragment key="c2">
                  Settings → Connectors → <strong>Add custom connector</strong> with the server
                  URL, then <strong>Connect</strong>.
                </Fragment>,
              ],
              [
                "ChatGPT",
                <Fragment key="c3">
                  Settings → Connectors → <strong>Add custom connector</strong> (developer mode may
                  need to be on). Enter the server URL, choose <strong>OAuth</strong> and leave the
                  client fields empty, then <strong>Connect</strong>.
                </Fragment>,
              ],
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="One sign-in per client">
            Each client gets its own connection, approved separately. They all act as you, in the
            organization you picked for each one, and each can be revoked on its own.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Sparkles size={24} />} title="What your assistant can do">
          <Lead>
            Through the connector, the assistant designs, configures and integrates: it creates
            flows and their fields, adds cleaning rules, sets up buckets, inspectors, fillers,
            subjects and pipelines, and wires results to webhooks, email and no-code tools. It
            also reads your runs and results to validate a design.
          </Lead>
          <p>
            Processing itself stays where it is: documents are uploaded and runs started in the
            Tavnit app, by email or through the API, and reviews are approved in the app. The
            connector never spends credits.
          </p>
          <InfoBox color="blue" icon={<Info size={20} />} title="Your data, your organization">
            A connection reaches only the organization you picked when you approved it. To work
            with another organization, disconnect the app and connect it again: you will be asked
            to pick again.
          </InfoBox>
        </DocCard>

        <DocCard icon={<ShieldCheck size={24} />} title="Managing and revoking connections">
          <Lead>
            The <strong>Connected AI apps</strong> list on the Integrations page shows every app
            you approved, when, and for which organization. Revoking one cuts its access at once.
          </Lead>
          <DataTable
            head={["Action", "What happens"]}
            rows={[
              [
                "Revoke",
                "The app's access ends immediately. Its next request fails until you connect it again from the app, which asks you to sign in and pick an organization.",
              ],
              [
                "Leave an organization",
                "Connections pointing at that organization stop working on their own.",
              ],
              [
                "MCP access switched off",
                "Every connection to that organization stops working until it is switched on again.",
              ],
            ]}
          />
          <WarningBox>
            Revoking is immediate and there is no undo: the app has to be connected again. Do it
            when you can reconnect straight away, or when you mean to cut access for good.
          </WarningBox>
        </DocCard>

        <DocCard icon={<AlertTriangle size={24} />} title="Security">
          <Lead>
            Connections are standard OAuth 2.1: short-lived tokens the client refreshes on its
            own, approved on a page you control, revocable at any time.
          </Lead>
          <BulletList
            items={[
              "Nothing to copy or store: there is no credential to paste into a client, so there is nothing to leak in a ticket, a chat or a screenshot.",
              "The assistant acts with your role in the organization you picked, and can never do more than you can in the app.",
              "Processing, reviews and credits stay in the app; the connector designs and configures only.",
              "Your API key is separate. Scripts and automations keep using it; the connector does not.",
            ]}
          />
        </DocCard>

        <DocCard icon={<LifeBuoy size={24} />} title="Troubleshooting">
          <Lead>
            Most connector problems are one of four things: the connection was revoked, your
            membership or role changed, MCP access is off, or the client holds an old connection
            to another organization.
          </Lead>
          <DataTable
            head={["Symptom", "Cause", "Fix"]}
            rows={[
              [
                "No AI apps card on Integrations",
                "MCP access is switched off for your organization.",
                "Contact support to have it turned on.",
              ],
              [
                "The consent page says none of your organizations has MCP access",
                "You belong only to organizations where it is off.",
                "Ask the organization's owner or support to enable it.",
              ],
              [
                "The assistant stopped seeing Tavnit",
                "The connection was revoked, or your membership changed.",
                "Remove the connector in the client and add it again.",
              ],
              [
                "The assistant sees the wrong data",
                "You picked a different organization when you approved.",
                "Revoke the connection on Integrations, reconnect and pick the right organization.",
              ],
              [
                "The assistant cannot perform an action",
                "Your role does not allow it.",
                "Check your role before assuming a connector fault.",
              ],
            ]}
          />
        </DocCard>

        <DocCard icon={<MessageSquare size={24} />} title="When to use the connector instead of the API">
          <Lead>
            Use the connector for conversational work: designing a flow, adding a rule, checking
            results, wiring an integration. Use the REST API for anything scheduled, high-volume
            or embedded in another system, where you need explicit error handling and retries.
          </Lead>
          <DataTable
            head={["Situation", "Use"]}
            rows={[
              ["Design a flow and its cleaning rules by describing them", "MCP connector"],
              ["Check why last week's runs failed", "MCP connector"],
              ["Every invoice from a vendor portal, nightly", "REST API or an email trigger"],
              ["Your own product needs the extracted data", "REST API plus webhooks"],
            ]}
          />
        </DocCard>

        <Related
          links={[
            {
              href: "/docs/api-integration",
              label: "Tavnit REST API reference",
              description:
                "Every endpoint, with API-key auth, request fields, responses and Python and JavaScript examples.",
            },
            {
              href: "/docs/buckets",
              label: "Store extracted data in Buckets",
              description:
                "The structured tables your extracted data lives in.",
            },
            {
              href: "/docs/user-roles",
              label: "User roles and permissions",
              description:
                "What Owner, Admin, Member and HITL Only can each do.",
            },
          ]}
        />
      </section>
    </>
  );
}
