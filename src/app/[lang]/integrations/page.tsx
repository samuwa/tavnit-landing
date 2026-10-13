import type { Metadata } from "next";
import IntegrationsHub, { integrationsHubMetadata } from "@/components/IntegrationsHub";
import { pageLocale, type LangParams } from "../_locale";

export async function generateMetadata({ params }: { params: Promise<LangParams> }): Promise<Metadata> {
  return integrationsHubMetadata(await pageLocale(params));
}

export default async function LangIntegrationsPage({ params }: { params: Promise<LangParams> }) {
  return <IntegrationsHub locale={await pageLocale(params)} />;
}
