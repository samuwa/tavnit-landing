import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tavnit Docs - Collections, Cleaners, Splitters, Buckets, API & Webhooks",
  description:
    "Tavnit documentation. AI-powered document extraction with Collections routing, Cleaners enrichment, Splitters for mixed PDFs, Buckets data storage, REST API, email triggers, webhooks, user roles, and step-by-step guides.",
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
