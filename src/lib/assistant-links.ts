/**
 * "Set up Tavnit with Claude / ChatGPT" links.
 *
 * The MCP service authenticates with OAuth 2.1 on the Tavnit project, so an
 * AI app only needs the server URL: the app sends the visitor to
 * app.tavnit.io/oauth/consent, where they sign in — or create their account
 * and organisation and come straight back — pick the org and approve.
 *
 * Mirror of `src/lib/mcp-links.ts` in tavnit-nextjs (the in-app Integrations
 * page builds the same links) — change them together.
 *
 * - Claude: the Add custom connector dialog with name + URL prefilled
 *   (claude.com/docs/connectors/building/directory-vs-custom).
 * - ChatGPT: no prefill link is documented; the entry point is its connector
 *   settings, where the user pastes the URL and chooses OAuth — so the
 *   landing copies the URL to the clipboard on the way.
 */
import { MCP_URL } from "@/lib/site";

export const MCP_CONNECTOR_NAME = "Tavnit";

/** The MCP endpoint AI apps connect to. */
export const MCP_SERVER_URL = `${MCP_URL.replace(/\/+$/, "")}/mcp`;

export function claudeAddConnectorUrl(serverUrl = MCP_SERVER_URL): string {
  const params = new URLSearchParams({
    modal: "add-custom-connector",
    connectorName: MCP_CONNECTOR_NAME,
    connectorUrl: serverUrl,
  });
  return `https://claude.ai/customize/connectors?${params.toString()}`;
}

export const CHATGPT_CONNECTORS_URL = "https://chatgpt.com/#settings/Connectors";
