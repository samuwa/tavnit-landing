import Link from "next/link";
import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  AlertTriangle,
  Info,
  KeyRound,
  LifeBuoy,
  MessageSquare,
  Plug,
  RefreshCw,
  Settings2,
  Sparkles,
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

export const metadata = docMetadata("mcp-connector");

/**
 * Mirrors the numbered steps rendered under "Connect claude.ai". HowTo markup
 * has to describe steps the page actually shows, so the two must stay in sync.
 */
const HOW_TO = {
  name: "Connect Tavnit to claude.ai with the MCP connector",
  description:
    "Generate a Tavnit connector URL on the Integrations page and add it to claude.ai as a custom connector, so your assistant can work with your Tavnit data.",
  steps: [
    {
      name: "Open Integrations in Tavnit",
      text: "Sign in to the Tavnit app and open Integrations from the sidebar. Check that you are in the organization whose data the assistant should reach.",
    },
    {
      name: "Generate the connector URL",
      text: "In the Custom Connector card, select Generate connector URL. Tavnit issues the URL from your API key and shows when it was created and when it expires.",
    },
    {
      name: "Copy the URL",
      text: "Copy the connector URL with the copy button. Treat it like a password.",
    },
    {
      name: "Add it as a custom connector in claude.ai",
      text: "In claude.ai go to Settings, then Connectors, then Add custom connector, and paste the URL. Custom connectors need a Claude Pro plan or above.",
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
            The MCP connector adds your Tavnit organization as a tool inside an AI assistant. Once
            it is connected, you can ask the assistant about your Tavnit data in plain language and
            it answers from your live account instead of guessing.
          </Lead>
          <p>
            MCP (Model Context Protocol) is the open standard that lets AI assistants call external
            tools. Tavnit runs an MCP server at <InlineCode>mcp.tavnit.io</InlineCode>, and the
            connector URL is the credential that points a client at your organization. It works with{" "}
            <strong>claude.ai</strong> (Pro and above), <strong>Cursor</strong>, and any other client
            that accepts a remote MCP server URL.
          </p>
          <p>
            For what the connector is for, and how it compares to pasting a file into a chat, see
            the{" "}
            <Link href="/integrations/mcp" className="text-accent hover:underline">
              MCP connector overview
            </Link>
            .
          </p>
          <InfoBox color="blue" icon={<Info size={20} />} title="Enabled on request">
            The connector is turned on per organization. If you don&apos;t see the Custom Connector
            card on the Integrations page, contact support to have it enabled for your
            organization.
          </InfoBox>
        </DocCard>

        <DocCard icon={<KeyRound size={24} />} title="Before you start">
          <Lead>
            You need three things: an organization with the connector enabled, your API key, and an
            MCP client. The connector is issued from your own key, so it reaches only the
            organization you were in when you generated it, and the assistant acts with that key.
          </Lead>
          <DataTable
            head={["Requirement", "Where it comes from"]}
            rows={[
              [
                "Custom Connector card",
                <Fragment key="f0">
                  On the <strong>Integrations</strong> page, only when the connector is enabled for
                  your organization. Ask support if it is missing.
                </Fragment>,
              ],
              [
                "Your API key",
                <Fragment key="f1">
                  The <strong>API Key</strong> card on the same page: one key per member per
                  organization. If it says <em>No API key found. Please log in again.</em>, sign out
                  and back in.
                </Fragment>,
              ],
              [
                "An MCP client",
                <Fragment key="f2">
                  claude.ai on a Pro plan or above, Cursor, or any client that accepts a remote MCP
                  server URL.
                </Fragment>,
              ],
              [
                "Your role",
                <Fragment key="f3">
                  The assistant uses your API key, so it can do only what your key can do. For
                  example, a key of the <strong>HITL Only</strong> role is refused by processing
                  requests. See <DocLink href="/docs/user-roles">user roles</DocLink> and{" "}
                  <DocLink href="/docs/api-integration">the API page</DocLink>.
                </Fragment>,
              ],
            ]}
          />
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Connect claude.ai">
          <Lead>
            Generate the URL in Tavnit, then paste it into claude.ai as a custom connector. There is
            nothing to install and no configuration file to edit.
          </Lead>
          <NumberedList
            items={[
              <Fragment key="f4">
                Open <strong>Integrations</strong> in the Tavnit sidebar. Check the organization
                switcher first: the connector is bound to whichever organization you are in.
              </Fragment>,
              <Fragment key="f5">
                In the <strong>Custom Connector</strong> card, select{" "}
                <strong>Generate connector URL</strong>.
              </Fragment>,
              <Fragment key="f6">Copy the URL with the copy button.</Fragment>,
              <Fragment key="f7">
                In claude.ai, go to <strong>Settings → Connectors → Add custom connector</strong> and
                paste the URL.
              </Fragment>,
              <Fragment key="f8">
                Open a new chat and ask the assistant which Tavnit tools it has. If it lists them, the
                connector is live.
              </Fragment>,
            ]}
          />
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Connect Cursor or another MCP client">
          <Lead>
            Any client that supports remote MCP servers takes the same URL. Add it as a remote (URL)
            server, not a command-based one: there is no local process to run, because the connector
            points at a hosted server.
          </Lead>
          <NumberedList
            items={[
              "Generate and copy the connector URL from the Integrations page, as above.",
              <Fragment key="f9">
                In Cursor, open the MCP settings and add a new server of the{" "}
                <strong>remote</strong> / URL type.
              </Fragment>,
              <Fragment key="f10">
                Paste the connector URL as the server URL. No separate API key field is needed: the
                URL already carries the credential.
              </Fragment>,
              "Reload the client and check that Tavnit appears in its tool list.",
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="One URL, several clients">
            You have one connector URL at a time, and you can paste it into more than one client.
            They all act as you in the same organization, so a refresh disconnects all of them at
            once.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Sparkles size={24} />} title="What your assistant can do">
          <Lead>
            Through the connector, the assistant works with your organization&apos;s Tavnit data
            using your API key. Building and configuring flows, Cleaners, pipelines and your team
            stays in the app.
          </Lead>
          <p>
            The tools the connector offers are listed by your MCP client, and the quickest way to see
            them is to ask the assistant. Ask in plain language and name the flow, Bucket or run you
            mean, the way it appears in the app.
          </p>
          <InfoBox color="blue" icon={<Info size={20} />} title="Your data, your organization">
            The connector only reaches the organization it was generated in. To work with another
            organization, switch to it in Tavnit and generate a URL there. Work started from the
            assistant follows your setup like any other run: if a flow asks for{" "}
            <DocLink href="/docs/human-in-the-loop">human review</DocLink>, the run still waits for it.
          </InfoBox>
        </DocCard>

        <DocCard icon={<RefreshCw size={24} />} title="Expiry and refreshing">
          <Lead>
            Connector URLs are time-limited. The Custom Connector card shows when the URL was created
            and how long it has left, and warns you in its last 24 hours. Refreshing issues a new URL
            and invalidates the old one immediately.
          </Lead>
          <DataTable
            head={["State", "What you see", "What to do"]}
            rows={[
              [
                "Active",
                <Fragment key="s0">The URL, <em>created …</em> and <em>expires in …d</em>.</Fragment>,
                "Nothing.",
              ],
              [
                "Expiring soon (under 24 hours)",
                <Fragment key="f16">The remaining time in hours or minutes, and an amber notice: <em>Connector expires soon — refresh now to avoid disruption.</em></Fragment>,
                "Refresh, then paste the new URL into every client using it.",
              ],
              [
                "Expired",
                <Fragment key="f17">A red notice: <em>This connector has expired. Refresh to generate a new URL.</em></Fragment>,
                "Refresh and re-paste. Clients using the old URL have already stopped working.",
              ],
            ]}
          />
          <p>
            To refresh, select <strong>Refresh URL</strong> and confirm with{" "}
            <strong>Refresh</strong> in the <em>Refresh connector URL?</em> dialog.
          </p>
          <WarningBox>
            Refreshing is not a rotation you can stage. The moment you confirm, the previous URL
            stops working and every assistant holding it fails until you paste the new one. Refresh
            when you can update the clients straight away.
          </WarningBox>
        </DocCard>

        <DocCard icon={<AlertTriangle size={24} />} title="Treat the URL like a password">
          <Lead>
            The connector URL is a credential. Anyone who has it can reach your organization&apos;s
            data as you, without signing in. It is safe to paste into an MCP client&apos;s settings;
            it is not safe to share in a ticket, a chat message or a screenshot.
          </Lead>
          <BulletList
            items={[
              "Do not commit it to a repository or paste it into a shared document.",
              "Blur or crop it out of any screenshot before sharing.",
              "If it leaks, refresh it immediately: that invalidates the exposed URL on the spot.",
              "Regenerating your API key is a separate action on the same page; do that too if you think the key itself is exposed.",
            ]}
          />
        </DocCard>

        <DocCard icon={<LifeBuoy size={24} />} title="Troubleshooting">
          <Lead>
            Most connector problems are one of four things: the feature is not enabled, the session
            has lapsed, the URL has expired, or the client is holding a URL that a refresh replaced.
          </Lead>
          <DataTable
            head={["Symptom", "Cause", "Fix"]}
            rows={[
              [
                "No Custom Connector card on Integrations",
                "The connector is not enabled for your organization.",
                "Contact support to have it turned on.",
              ],
              [
                <Fragment key="f18"><InlineCode>Custom connectors require a valid Tavnit session. Try signing out and back in.</InlineCode></Fragment>,
                "Tavnit could not validate your key to issue or read the URL.",
                "Sign out and back in, then generate the URL again.",
              ],
              [
                "The assistant stopped seeing Tavnit",
                "The URL expired, or someone refreshed it.",
                "Check the card for an expired or expiring notice, refresh, and re-paste into every client.",
              ],
              [
                "The assistant sees the wrong data",
                "The URL was generated while you were in a different organization.",
                "Switch organizations in Tavnit, generate a fresh URL, and replace the old one.",
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
            Use the connector for conversational, ad-hoc work: one-off questions, exploring stored
            data, quick checks. Use the REST API for anything scheduled, high-volume or embedded in
            another system, where you need explicit error handling and retries.
          </Lead>
          <DataTable
            head={["Situation", "Use"]}
            rows={[
              ["A colleague asks what a supplier billed last quarter", "MCP connector"],
              ["You want to explore your data in a chat", "MCP connector"],
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
