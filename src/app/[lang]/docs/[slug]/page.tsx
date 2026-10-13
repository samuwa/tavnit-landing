import type { Metadata } from "next";
import { localeFromSegment } from "@/lib/locales";
import { pageLocale, type LangParams } from "../../_locale";
import { DocPage, TRANSLATABLE_URL_SLUGS, docPageMetadata, docSlugFromUrl, translatedUrlSlugs } from "../_doc";

/**
 * /<segment>/docs/<English slug>: one translated docs page. Only the pages
 * in the src/content/docs registry are built; any other slug (untranslated
 * page, or a language without docs) is a 404 (dynamicParams = false).
 */

type Params = LangParams & { slug: string };

export const dynamicParams = false;

export function generateStaticParams({ params }: { params: LangParams }): { slug: string }[] {
  const locale = localeFromSegment(params.lang);
  const slugs = locale ? translatedUrlSlugs(locale) : [];
  // Never [] for a language: Next then passes that parent through without a
  // slug, and the whole route stops prerendering (every language 404s). A
  // language without docs lists the translatable slugs instead; DocPage
  // renders each of them as a static 404 until the language is translated.
  return (slugs.length > 0 ? slugs : TRANSLATABLE_URL_SLUGS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const locale = await pageLocale(params);
  return docPageMetadata(locale, docSlugFromUrl((await params).slug));
}

export default async function LangDocPage({ params }: { params: Promise<Params> }) {
  const locale = await pageLocale(params);
  return <DocPage locale={locale} slug={docSlugFromUrl((await params).slug)} />;
}
