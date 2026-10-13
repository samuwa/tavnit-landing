import type { Metadata } from "next";
import LiteHubPage, { liteHubMetadata } from "@/components/lite/LiteHubPage";
import { pageLocale, type LangParams } from "../_locale";

export async function generateMetadata({ params }: { params: Promise<LangParams> }): Promise<Metadata> {
  return liteHubMetadata(await pageLocale(params));
}

export default async function LangToolsHubPage({ params }: { params: Promise<LangParams> }) {
  return <LiteHubPage locale={await pageLocale(params)} />;
}
