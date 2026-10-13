import type { Metadata } from "next";
import { pageLocale, type LangParams } from "../_locale";
import { DocPage, docPageMetadata } from "./_doc";

/** /<segment>/docs: getting started, in a language that has translated it (else 404). */

export async function generateMetadata({ params }: { params: Promise<LangParams> }): Promise<Metadata> {
  return docPageMetadata(await pageLocale(params), "getting-started");
}

export default async function LangDocsHome({ params }: { params: Promise<LangParams> }) {
  return <DocPage locale={await pageLocale(params)} slug="getting-started" />;
}
