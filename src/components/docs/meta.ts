import type { Metadata } from "next";
import { docSection, type DocSlug } from "./nav";
import { ogLocale, type EngineLocale as Locale, type NewLocale } from "@/lib/locales";
import { alternatesFor, pageOgLocales } from "@/lib/routes";
import { localeDocSection } from "./i18n";

/**
 * Per-route docs metadata.
 *
 * Every docs route needs its own canonical. Before the route split there was
 * exactly one docs URL and it inherited the root layout's canonical, which
 * pointed at the homepage — telling Google the whole docs section was a
 * duplicate of "/". Each page now self-canonicalises.
 */
export function docMetadata(slug: DocSlug, locale: Locale = "en"): Metadata {
  const section = docSection(slug, locale);
  // Every docs page has a twin in the other language. Both sides must emit
  // the same hreflang block or Google ignores the pair (see lib/routes.ts).
  const pair = alternatesFor(docSection(slug, "en").href);
  return {
    // `absolute` on purpose. The root layout defines a `%s | Tavnit` template,
    // but a layout title only templates its *immediate* children — so /docs
    // inherited the suffix while the twelve /docs/<slug> routes did not, and
    // the section rendered with two different title conventions. Each title in
    // nav.ts is already written to sit at 49–61 characters, which is the whole
    // visible width in a SERP; appending the brand would push most of them into
    // truncation. Opting every docs route out of the template makes the section
    // consistent and keeps the descriptive tail visible.
    title: { absolute: section.title },
    description: section.description,
    alternates: { canonical: section.href, languages: pair },
    openGraph: {
      type: "article",
      url: section.href,
      title: section.title,
      description: section.description,
      siteName: "Tavnit",
      locale: ogLocale(locale),
      // Restated because a child segment's `openGraph` replaces the parent's
      // wholesale, which would otherwise drop the generated OG image.
      images: ["/opengraph-image"],
    },
  };
}

/**
 * Metadata of a translated docs page in a new language (/<segment>/docs/…):
 * the localized strings, the self-canonical, and the same hreflang block as
 * every twin of the page (English, Spanish and the other translations).
 */
export function localizedDocMetadata(slug: DocSlug, locale: NewLocale): Metadata {
  const section = localeDocSection(slug, locale);
  if (!section) return {};
  const enPath = docSection(slug, "en").href;
  return {
    title: { absolute: section.title },
    description: section.description,
    alternates: { canonical: section.href, languages: alternatesFor(enPath) },
    openGraph: {
      type: "article",
      url: section.href,
      title: section.title,
      description: section.description,
      siteName: "Tavnit",
      ...pageOgLocales(enPath, locale),
      images: ["/opengraph-image"],
    },
  };
}
