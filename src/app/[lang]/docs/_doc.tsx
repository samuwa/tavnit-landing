import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import { DOC_BY_SLUG, DOC_SECTIONS, type DocSlug } from "@/components/docs/nav";
import { localizedDocMetadata } from "@/components/docs/meta";
import type { NewLocale } from "@/lib/locales";
import { isTranslatedDoc, loadDocPage, translatedDocSlugs } from "@/content/docs";
import { TRANSLATED_DOC_SLUGS } from "@/content/docs/types";

/** Shared by /<segment>/docs (getting started) and /<segment>/docs/<slug>. */

/** URL slug (the English one) → docs page, for every page under /docs/. */
const SLUG_BY_URL = new Map<string, DocSlug>(
  DOC_SECTIONS.filter((s) => s.href.startsWith("/docs/")).map((s) => [s.href.slice("/docs/".length), s.slug]),
);

export function docSlugFromUrl(urlSlug: string): DocSlug | undefined {
  return SLUG_BY_URL.get(urlSlug);
}

const urlSlug = (slug: DocSlug) => DOC_BY_SLUG[slug].href.slice("/docs/".length);

/** Every translatable page's URL slug (getting started excluded: it is /docs itself). */
export const TRANSLATABLE_URL_SLUGS: string[] = TRANSLATED_DOC_SLUGS.filter((s) => s !== "getting-started").map(urlSlug);

/** The URL slugs translated into a language (getting started excluded). */
export function translatedUrlSlugs(locale: NewLocale): string[] {
  return translatedDocSlugs(locale)
    .filter((s) => s !== "getting-started")
    .map(urlSlug);
}

export function docPageMetadata(locale: NewLocale, slug: DocSlug | undefined): Metadata {
  return slug && isTranslatedDoc(locale, slug) ? localizedDocMetadata(slug, locale) : {};
}

export async function DocPage({ locale, slug }: { locale: NewLocale; slug: DocSlug | undefined }) {
  if (!slug || !isTranslatedDoc(locale, slug)) notFound();
  const mod = await loadDocPage(locale, slug);
  if (!mod) notFound();
  const Body = mod.default;
  const schema = mod.schema;
  return (
    <>
      <DocsPageSchema slug={slug} locale={locale} howTo={schema?.howTo} primaryImage={schema?.primaryImage} />
      <Body />
    </>
  );
}
