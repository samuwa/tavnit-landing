import type { Metadata } from "next";
import { DOC_BY_SLUG, type DocSlug } from "./nav";

/**
 * Per-route docs metadata.
 *
 * Every docs route needs its own canonical. Before the route split there was
 * exactly one docs URL and it inherited the root layout's canonical, which
 * pointed at the homepage — telling Google the whole docs section was a
 * duplicate of "/". Each page now self-canonicalises.
 */
export function docMetadata(slug: DocSlug): Metadata {
  const section = DOC_BY_SLUG[slug];
  return {
    title: section.title,
    description: section.description,
    alternates: { canonical: section.href },
    openGraph: {
      type: "article",
      url: section.href,
      title: section.title,
      description: section.description,
      siteName: "Tavnit",
      locale: "en_US",
      // Restated because a child segment's `openGraph` replaces the parent's
      // wholesale, which would otherwise drop the generated OG image.
      images: ["/opengraph-image"],
    },
  };
}
