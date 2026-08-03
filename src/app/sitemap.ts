import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { DOC_SECTIONS } from "@/components/docs/nav";

/**
 * Only real, indexable URLs belong here.
 *
 * The original version listed /#features, /#pricing, /#use-cases and
 * /#integrations. Google discards fragment identifiers when normalising URLs,
 * so those four entries collapsed into duplicates of "/".
 *
 * The 13 docs routes are generated from the same nav config the sidebar uses,
 * so a new documentation section is listed here automatically.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/pricing`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...DOC_SECTIONS.map((section) => ({
      url: `${SITE_URL}${section.href}`,
      lastModified,
      changeFrequency: "weekly" as const,
      // /docs is the section entry point; the rest sit a rung below.
      priority: section.href === "/docs" ? 0.8 : 0.7,
    })),
    // Legal pages are indexable — they are a trust/E-E-A-T signal — but rank
    // for nothing, so they sit at the bottom of the priority range.
    {
      url: `${SITE_URL}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
