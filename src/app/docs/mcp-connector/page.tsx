import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import { AlertTriangle, Info, Plug, Settings2, Sparkles } from "lucide-react";
import { BulletList, DocCard, InfoBox, NumberedList } from "@/components/docs/ui";

export const metadata = docMetadata("mcp-connector");

export default function Page() {
  return (
    <>
      <DocsPageSchema slug="mcp-connector" />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          MCP Connector
        </h1>

        <DocCard icon={<Plug size={24} />} title="What is the MCP Connector?">
          <p>
            MCP (Model Context Protocol) is the open standard that lets AI assistants use external
            tools. Tavnit&apos;s MCP connector adds your Tavnit organization as a tool inside{" "}
            <strong>claude.ai</strong> (Pro and up), <strong>Cursor</strong>, or any other MCP
            client — so you can work with your documents and data by just asking your assistant.
          </p>
          <InfoBox color="blue" icon={<Info size={20} />} title="Don't see the connector card?">
            The MCP connector is rolling out gradually. If it isn&apos;t visible on your
            Integrations page yet, contact support to enable it for your organization.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Connecting Your Assistant">
          <NumberedList
            items={[
              "Open the Integrations page in the Tavnit app",
              'Find the "Custom Connector" card and generate a connector URL',
              "Copy the URL",
              "In claude.ai: Settings → Connectors → Add custom connector, then paste the URL",
              "In Cursor or another MCP client: add the URL as a remote MCP server",
            ]}
          />
          <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Treat the URL like a password">
            The connector URL grants access to your organization&apos;s data. Connector URLs expire
            and can be refreshed at any time — refreshing immediately invalidates the old URL, and
            any client using it stops working until you paste the new one.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Sparkles size={24} />} title="What Your Assistant Can Do">
          <BulletList
            items={[
              "Process documents through your flows and get structured results back",
              "Read and search your Buckets — ask questions about the data you've extracted",
            ]}
          />
          <p>
            For example: &ldquo;Run this invoice through my Supplier Invoices flow&rdquo; or
            &ldquo;What did we pay Acme Corp last month, according to my Invoices bucket?&rdquo;
          </p>
        </DocCard>
      </section>
    </>
  );
}
