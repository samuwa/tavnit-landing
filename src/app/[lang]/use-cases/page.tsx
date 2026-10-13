import type { Metadata } from "next";
import UseCasesHub, { metadataForUseCasesHub } from "@/components/UseCasesHub";
import { pageLocale, type LangParams } from "../_locale";

export async function generateMetadata({ params }: { params: Promise<LangParams> }): Promise<Metadata> {
  return metadataForUseCasesHub(await pageLocale(params));
}

export default async function LangUseCasesPage({ params }: { params: Promise<LangParams> }) {
  return <UseCasesHub locale={await pageLocale(params)} />;
}
