import type { Metadata } from "next";
import DocsShell from "@/components/docs/DocsShell";
import { docsRootSchema } from "@/lib/schema";

/**
 * Docs shell layout.
 *
 * Title/description/canonical now live on each individual route (see
 * src/components/docs/meta.ts). What stays here is the persistent chrome and
 * the docs-wide schema; per-page metadata overrides the defaults below.
 */
export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Tavnit documentation. AI-powered document extraction with browser-automation Agents, Human-in-the-Loop review, an MCP connector for AI assistants, Collections routing, Cleaners enrichment, Splitters for mixed PDFs, Buckets data storage, REST API, email triggers, webhooks and user roles.",
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(docsRootSchema()) }}
      />
      <DocsShell>{children}</DocsShell>
    </>
  );
}
