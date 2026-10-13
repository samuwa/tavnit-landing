import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LiteToolPage, { liteToolMetadata } from "@/components/lite/LiteToolPage";
import { LITE_TOOL_IDS, liteToolByEnSlug, liteToolSlug } from "@/lib/lite/tools";
import { pageLocale, type LangParams } from "../../_locale";

/**
 * Free tools in the new languages: /<lang>/tools/<English slug>. The page
 * is translated (src/content/tools/<code>.ts); the tool itself runs the
 * English engine (engineLocale(): Flow, sample, column names).
 */

type Params = LangParams & { tool: string };

export const dynamicParams = false;

export function generateStaticParams(): { tool: string }[] {
  return LITE_TOOL_IDS.map((id) => ({ tool: liteToolSlug(id) }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const locale = await pageLocale(params);
  const id = liteToolByEnSlug((await params).tool);
  return id ? liteToolMetadata(id, locale) : {};
}

export default async function LangToolPage({ params }: { params: Promise<Params> }) {
  const locale = await pageLocale(params);
  const id = liteToolByEnSlug((await params).tool);
  if (!id) notFound();
  return <LiteToolPage toolId={id} locale={locale} />;
}
