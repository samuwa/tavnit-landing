import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tavnit Docs - Agents, Human in the Loop, MCP, Collections, Cleaners & API",
  description:
    "Tavnit documentation. AI-powered document extraction with browser-automation Agents, Human-in-the-Loop review, an MCP connector for AI assistants, Collections routing, Cleaners enrichment, Splitters for mixed PDFs, Buckets data storage, REST API, email triggers, webhooks, user roles, and step-by-step guides.",
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
