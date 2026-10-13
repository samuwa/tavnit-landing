import type { Metadata } from "next";
import GuidesHub, { guidesHubMetadata } from "@/components/GuidesHub";
import { pageLocale, type LangParams } from "../_locale";

export async function generateMetadata({ params }: { params: Promise<LangParams> }): Promise<Metadata> {
  return guidesHubMetadata(await pageLocale(params));
}

export default async function LangGuidesPage({ params }: { params: Promise<LangParams> }) {
  return <GuidesHub locale={await pageLocale(params)} />;
}
