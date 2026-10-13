import type { Metadata } from "next";
import LocalizedHome, { localizedHomeMetadata } from "@/components/LocalizedHome";
import { pageLocale, type LangParams } from "./_locale";

export async function generateMetadata({ params }: { params: Promise<LangParams> }): Promise<Metadata> {
  return localizedHomeMetadata(await pageLocale(params));
}

export default async function LangHomePage({ params }: { params: Promise<LangParams> }) {
  return <LocalizedHome locale={await pageLocale(params)} />;
}
