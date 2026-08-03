import { execFileSync } from "node:child_process";
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { DOC_SECTIONS } from "@/components/docs/nav";
import { OWNED_INTEGRATIONS } from "@/lib/integrations";

/**
 * Only real, indexable URLs belong here.
 *
 * The original version listed /#features, /#pricing, /#use-cases and
 * /#integrations. Google discards fragment identifiers when normalising URLs,
 * so those four entries collapsed into duplicates of "/".
 *
 * The docs routes are generated from the same nav config the sidebar uses,
 * so a new documentation section is listed here automatically.
 */

/** Evaluated once per build; the fallback when git history is unavailable. */
const BUILD_DATE = new Date();

/**
 * Last commit date for the files that render a route.
 *
 * `lastModified` used to be the build timestamp for every URL, which claimed
 * /privacy and /terms changed on every deploy even though they had not been
 * touched since they were written. Google only leans on <lastmod> while a
 * site's values stay trustworthy, so stamping unchanged pages spends a signal
 * the docs section actually benefits from.
 *
 * Deliberately best-effort: a shallow clone or a build image without git falls
 * back to the build date, which is exactly the previous behaviour. It degrades,
 * it never fails the build.
 */
function lastCommitDate(...paths: string[]): Date {
  try {
    const iso = execFileSync(
      "git",
      ["log", "-1", "--format=%cI", "--", ...paths],
      { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
    ).trim();
    if (!iso) return BUILD_DATE;
    const date = new Date(iso);
    return Number.isNaN(date.getTime()) ? BUILD_DATE : date;
  } catch {
    return BUILD_DATE;
  }
}

/** Source files a docs route's rendered output actually depends on. */
function docsSources(href: string): string[] {
  const page =
    href === "/docs" ? "src/app/docs/page.tsx" : `src/app${href}/page.tsx`;
  // The shell, the shared primitives and the nav metadata all change what the
  // page renders, so a change to any of them is a change to the page.
  return [
    page,
    "src/components/docs/ui.tsx",
    "src/components/docs/nav.ts",
    "src/components/docs/DocsShell.tsx",
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      // Excludes src/components/docs: those only render /docs/*, so including
      // the whole components tree made the homepage claim it changed on every
      // documentation commit — reintroducing, for "/", exactly the inaccuracy
      // this function exists to remove.
      lastModified: lastCommitDate(
        "src/app/page.tsx",
        "src/components",
        ":(exclude)src/components/docs",
      ),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/pricing`,
      lastModified: lastCommitDate("src/app/pricing/page.tsx", "src/lib/site.ts"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/integrations`,
      lastModified: lastCommitDate("src/app/integrations", "src/lib/integrations.ts"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...OWNED_INTEGRATIONS.map((item) => ({
      url: `${SITE_URL}${item.href}`,
      lastModified: lastCommitDate(`src/app${item.href}/page.tsx`),
      changeFrequency: "monthly" as const,
      // Commercial intent: ranks these above the documentation that supports them.
      priority: 0.9,
    })),
    ...DOC_SECTIONS.map((section) => ({
      url: `${SITE_URL}${section.href}`,
      lastModified: lastCommitDate(...docsSources(section.href)),
      changeFrequency: "weekly" as const,
      // /docs is the section entry point; the rest sit a rung below.
      priority: section.href === "/docs" ? 0.8 : 0.7,
    })),
    // Legal pages are indexable — they are a trust/E-E-A-T signal — but rank
    // for nothing, so they sit at the bottom of the priority range.
    {
      url: `${SITE_URL}/privacy`,
      lastModified: lastCommitDate("src/app/privacy/page.tsx"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: lastCommitDate("src/app/terms/page.tsx"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
