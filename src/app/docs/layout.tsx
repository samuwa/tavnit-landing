import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tavnit Docs - API Reference, Email Triggers & Webhook Integration Guide",
  description:
    "Tavnit developer documentation. REST API for PDF data extraction, email triggers for automated processing, webhook integration, Python and JavaScript SDKs, and step-by-step automation guides.",
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
