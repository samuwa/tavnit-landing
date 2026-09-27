import type { Metadata } from "next";
import { docSection, type DocSlug } from "./nav";
import { EN_LOCALE_OG, ES_LOCALE_OG, languageAlternates, type Locale } from "@/lib/locale";

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
  // the same hreflang block or Google ignores the pair (see locale.ts).
  const pair = languageAlternates(docSection(slug, "en").href, docSection(slug, "es").href);
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
      locale: locale === "es" ? ES_LOCALE_OG : EN_LOCALE_OG,
      // Restated because a child segment's `openGraph` replaces the parent's
      // wholesale, which would otherwise drop the generated OG image.
      images: ["/opengraph-image"],
    },
  };
}
