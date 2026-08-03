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
