import type { Metadata } from "next";
import McpIntegration, { mcpMetadata } from "@/components/McpIntegration";
import { pageLocale, type LangParams } from "../../_locale";

export async function generateMetadata({ params }: { params: Promise<LangParams> }): Promise<Metadata> {
  return mcpMetadata(await pageLocale(params));
}

export default async function LangMcpPage({ params }: { params: Promise<LangParams> }) {
  return <McpIntegration locale={await pageLocale(params)} />;
}
