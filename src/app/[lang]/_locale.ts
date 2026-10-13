import { notFound } from "next/navigation";
import { NEW_LOCALES, localeFromSegment, segmentOf, type NewLocale } from "@/lib/locales";

/**
 * The [lang] segment is the URL segment of a NEW language (`de`, `pt-br`,
 * `zh-hans` — see lib/locales.ts), never `es` (the static src/app/es tree
 * outranks this dynamic one) and never `en` (English lives at the root).
 */

export type LangParams = { lang: string };

/** generateStaticParams of the [lang] layout: the ten new languages. */
export function langParams(): LangParams[] {
  return NEW_LOCALES.map((l) => ({ lang: segmentOf(l) }));
}

/** The page's language, or a 404 for any other segment. */
export async function pageLocale(params: Promise<LangParams>): Promise<NewLocale> {
  const { lang } = await params;
  const locale = localeFromSegment(lang);
  if (!locale) notFound();
  return locale;
}
