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
    "Generate a Tavnit connector URL on the Integrations page and add it to claude.ai as a custom connector, so your assistant can run documents through your flows and query your Buckets.",
  steps: [
    {
      name: "Open Integrations in Tavnit",
      text: "Sign in to the Tavnit app and open Integrations from the sidebar. Confirm you are in the organization whose data you want the assistant to reach.",
    },
    {
      name: "Generate the connector URL",
      text: "Find the Custom Connector card and select Generate connector URL. Tavnit issues a URL from your own API key and shows when it was created and when it expires.",
    },
    {
      name: "Copy the URL",
      text: "Copy the connector URL to your clipboard. Treat it as a credential — anyone holding it can reach your organization's flows and Buckets.",
    },
    {
      name: "Add it as a custom connector in claude.ai",
      text: "In claude.ai go to Settings, then Connectors, then Add custom connector, and paste the URL. A Claude Pro plan or above is required.",
    },
    {
      name: "Confirm the connection",
      text: "Start a new chat and ask the assistant to list your flows. If it answers with your flow names, the connector is live.",
    },
  ],
};

export default function Page() {
  return (
    <>
      <DocsPageSchema slug="mcp-connector" howTo={HOW_TO} />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          MCP Connector
        </h1>

        <DocCard icon={<Plug size={24} />} title="What the MCP connector does">
          <Lead>
            The MCP connector adds your Tavnit organization as a tool inside an AI assistant. Once
            it is connected, you can ask the assistant to run a document through one of your flows
            or answer questions from a Bucket, and it works against your live Tavnit data instead of
            guessing.
          </Lead>
          <p>
            MCP (Model Context Protocol) is the open standard that lets AI assistants call external
            tools. Tavnit exposes an MCP endpoint, and the connector URL is the credential that
            points a client at your organization. It works with <strong>claude.ai</strong> (Pro and
            above), <strong>Cursor</strong>, and any other client that accepts a remote MCP server
            URL.
          </p>
          <InfoBox color="blue" icon={<Info size={20} />} title="Setup, not evaluation">
            This page covers connecting an assistant you already have to a Tavnit account you
            already have. It assumes you know what your flows and Buckets are for — if you are still
            setting those up, start with the extraction basics and come back.
          </InfoBox>
        </DocCard>

        <DocCard icon={<KeyRound size={24} />} title="Before you start">
          <Lead>
            You need three things: a Tavnit organization with the connector enabled, a personal API
            key, and an MCP client. The connector is issued from your own key, so it can only reach
            the organization you were signed in to when you generated it, with your role&apos;s
            permissions.
          </Lead>
          <DataTable
            head={["Requirement", "Where it comes from"]}
            rows={[
              [
                "Custom Connector card",
                <Fragment key="f0">
                  Visible on the <strong>Integrations</strong> page. The connector is rolling out
                  gradually — if the card is not there, ask support to enable it for your
                  organization.
                </Fragment>,
              ],
              [
                "A Tavnit API key",
                <Fragment key="f1">
                  Also on the Integrations page, one per member per organization. If it is missing,
                  sign out and back in.
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
                "A role that can act",
                <Fragment key="f3">
                  The assistant inherits your permissions. A Member cannot make the assistant do
                  something a Member cannot do in the app — see{" "}
                  <DocLink href="/docs/user-roles">user roles and permissions</DocLink>
                  .
                </Fragment>,
              ],
            ]}
          />
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Connect claude.ai">
          <Lead>
            Generate the URL in Tavnit, then paste it into claude.ai as a custom connector. The
            whole setup is five steps and takes about a minute; there is nothing to install and no
            configuration file to edit.
          </Lead>
          <NumberedList
            items={[
              <Fragment key="f4">
                Open <strong>Integrations</strong> in the Tavnit sidebar. Check the organization
                switcher first — the connector is bound to whichever organization you are in.
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
                Open a new chat and ask it to list your flows. Getting your real flow names back
                confirms the connection.
              </Fragment>,
            ]}
          />
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Connect Cursor or another MCP client">
          <Lead>
            Any client that supports remote MCP servers takes the same URL. In Cursor, add it as a
            remote MCP server rather than a command-based one — there is no local process to run,
            because the connector points at a hosted endpoint.
          </Lead>
          <NumberedList
            items={[
              "Generate and copy the connector URL from the Integrations page, as above.",
              <Fragment key="f9">
                In Cursor, open the MCP settings and add a new server of the{" "}
                <strong>remote</strong> / URL type.
              </Fragment>,
              <Fragment key="f10">
                Paste the connector URL as the server URL. No separate API key field is needed — the
                URL already carries the credential.
              </Fragment>,
              "Reload the client and check that Tavnit appears in its tool list.",
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="One URL, several clients">
            The same connector URL can be pasted into more than one client. They all act as the same
            member in the same organization, so a refresh disconnects all of them at once.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Sparkles size={24} />} title="What your assistant can do">
          <Lead>
            The connector exposes two capabilities: running documents through your flows, and
            reading the data you have already extracted. Everything else — building flows, editing
            Cleaners, managing the team — stays in the app.
          </Lead>
          <BulletList
            items={[
              <Fragment key="f11">
                <strong>Process documents through your flows</strong> and get the structured result
                back in the conversation.
              </Fragment>,
              <Fragment key="f12">
                <strong>Read and search your Buckets</strong> — ask questions about data you have
                already extracted, without exporting it first.
              </Fragment>,
            ]}
          />
          <p className="pt-1">Prompts that work well:</p>
          <DataTable
            head={["Ask this", "What happens"]}
            rows={[
              [
                <Fragment key="f13"><em>&ldquo;Run this invoice through my Supplier Invoices flow.&rdquo;</em></Fragment>,
                "The attached document is processed by that flow and the extracted fields come back in the chat.",
              ],
              [
                <Fragment key="f14"><em>&ldquo;What did we pay Acme Corp last month, from my Invoices bucket?&rdquo;</em></Fragment>,
                "The assistant queries the Bucket and answers from the stored rows.",
              ],
              [
                <Fragment key="f15"><em>&ldquo;Which flows do I have?&rdquo;</em></Fragment>,
                "A quick connectivity check — a real list means the connector is working.",
              ],
            ]}
          />
          <InfoBox
            color="yellow"
            icon={<AlertTriangle size={20} />}
            title="Runs through the connector still cost credits"
          >
            A document processed by the assistant is an ordinary flow run and is billed the same way
            as one you upload yourself. If a flow has{" "}
            <DocLink href="/docs/human-in-the-loop">human review</DocLink>{" "}
            enabled, the run pauses for a reviewer instead of returning results immediately.
          </InfoBox>
        </DocCard>

        <DocCard icon={<RefreshCw size={24} />} title="Expiry and refreshing">
          <Lead>
            Connector URLs are time-limited. The Custom Connector card shows when the URL was created
            and when it expires, and warns you as the expiry approaches. Refreshing issues a new URL
            and invalidates the old one immediately.
          </Lead>
          <DataTable
            head={["State", "What you see", "What to do"]}
            rows={[
              [
                "Active",
                "The URL plus a created date and a remaining-time label.",
                "Nothing.",
              ],
              [
                "Expiring soon",
                <Fragment key="f16">An amber notice: <em>Connector expires soon — refresh now to avoid disruption.</em></Fragment>,
                "Refresh, then paste the new URL into every client using it.",
              ],
              [
                "Expired",
                <Fragment key="f17">A red notice: <em>This connector has expired. Refresh to generate a new URL.</em></Fragment>,
                "Refresh and re-paste. Clients using the old URL have already stopped working.",
              ],
            ]}
          />
          <WarningBox>
            Refreshing is not a rotation you can stage. The moment you confirm it, the previous URL
            stops working and every assistant holding it fails until you paste the new one. Refresh
            when you can update the clients straight away.
          </WarningBox>
        </DocCard>

        <DocCard icon={<AlertTriangle size={24} />} title="Treat the URL like a password">
          <Lead>
            The connector URL is a bearer credential. Anyone who has it can reach your
            organization&apos;s flows and Buckets as you, without signing in. It is safe to paste
            into an MCP client&apos;s settings; it is not safe to share in a ticket, a chat message,
            or a screenshot.
          </Lead>
          <BulletList
            items={[
              "Do not commit it to a repository or paste it into a shared document.",
              "Blur or crop it out of any screenshot before sharing.",
              "If it leaks, refresh immediately — that invalidates the exposed URL on the spot.",
              "Regenerating your API key is a separate action on the same page; do that too if you think the key itself is exposed.",
            ]}
          />
        </DocCard>

        <DocCard icon={<LifeBuoy size={24} />} title="Troubleshooting">
          <Lead>
            Most connector problems are one of four things: the feature is not enabled, the session
            has lapsed, the URL has expired, or the client is holding a URL that was replaced by a
            refresh.
          </Lead>
          <DataTable
            head={["Symptom", "Cause", "Fix"]}
            rows={[
              [
                "No Custom Connector card on Integrations",
                "The connector is not enabled for your organization yet.",
                "Contact support to have it turned on.",
              ],
              [
                <Fragment key="f18"><InlineCode>Custom connectors require a valid Tavnit session</InlineCode></Fragment>,
                "Your sign-in has lapsed, so Tavnit cannot issue a URL.",
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
                "The connector inherits your permissions — check your role before assuming a connector fault.",
              ],
            ]}
          />
        </DocCard>

        <DocCard icon={<MessageSquare size={24} />} title="When to use the connector instead of the API">
          <Lead>
            Use the connector for conversational, ad-hoc work — one-off documents, questions about
            stored data, exploratory analysis. Use the REST API for anything scheduled, high-volume,
            or embedded in another system, where you need explicit error handling and retries.
          </Lead>
          <DataTable
            head={["Situation", "Use"]}
            rows={[
              ["A colleague asks what a supplier billed last quarter", "MCP connector"],
              ["One invoice landed in your inbox and you want it extracted now", "MCP connector"],
              ["Every invoice from a vendor portal, nightly", "REST API or an email trigger"],
              ["Your own product needs the extracted data", "REST API plus webhooks"],
            ]}
          />
        </DocCard>

        <Related
          links={[
            {
              href: "/docs/api-integration",
              label: "Process documents with the Tavnit REST API",
              description:
                "Multipart and base64 upload, API-key auth, Python and JavaScript examples.",
            },
            {
              href: "/docs/buckets",
              label: "Store extracted data in Buckets",
              description:
                "The structured tables the assistant reads when you ask it questions about your data.",
            },
            {
              href: "/docs/user-roles",
              label: "User roles and permissions",
              description:
                "What Owner, Admin and Member can each do — the same limits apply to the connector.",
            },
            {
              href: "/docs/human-in-the-loop",
              label: "Pause runs for human review",
              description:
                "Why a run started by an assistant might wait for a reviewer instead of returning results.",
            },
          ]}
        />
      </section>
    </>
  );
}
