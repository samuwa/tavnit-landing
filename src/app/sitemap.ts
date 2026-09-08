import { execFileSync } from "node:child_process";
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { DOC_SECTIONS } from "@/components/docs/nav";
import { OWNED_INTEGRATIONS } from "@/lib/integrations";
import { isStripeEnabled } from "@/lib/platform";
import { USE_CASES } from "@/lib/use-cases";
import { GUIDES } from "@/lib/guides";

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

/**
 * Last commit date for the files that render a route.
 *
 * `lastModified` used to be the build timestamp for every URL, which claimed
 * /privacy and /terms changed on every deploy even though they had not been
 * touched since they were written. Google only leans on <lastmod> while a
 * site's values stay trustworthy, so stamping unchanged pages spends a signal
 * the docs section actually benefits from.
 *
 * Deliberately best-effort, and it degrades by omission: when git is not
 * available the entry simply has no <lastmod>. This route is dynamic (it reads
 * the Stripe toggle), so on Vercel it renders inside a serverless function
 * where there is no .git directory. The old fallback stamped `new Date()` on
 * every URL — the production sitemap showed all 38 entries changed at the
 * moment of the request, which is exactly the untrustworthy signal Google says
 * makes it stop reading <lastmod> for the whole site. No date beats a wrong one.
 */
function lastCommitDate(...paths: string[]): Date | undefined {
  try {
    const iso = execFileSync(
      "git",
      ["log", "-1", "--format=%cI", "--", ...paths],
      { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
    ).trim();
    if (!iso) return undefined;
    const date = new Date(iso);
    return Number.isNaN(date.getTime()) ? undefined : date;
  } catch {
    return undefined;
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // /pricing redirects home while Stripe self-serve is off (platform_config);
  // keep it out of the sitemap in that state.
  const stripeOn = await isStripeEnabled();
  const entries: MetadataRoute.Sitemap = [
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
      url: `${SITE_URL}/schedule`,
      lastModified: lastCommitDate(
        "src/app/schedule/page.tsx",
        "src/components/ScheduleMeeting.tsx",
      ),
      changeFrequency: "monthly",
      // Commercial intent, same tier as pricing.
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/use-cases`,
      lastModified: lastCommitDate("src/app/use-cases", "src/lib/use-cases.ts"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...USE_CASES.map((uc) => ({
      url: `${SITE_URL}/use-cases/${uc.slug}`,
      lastModified: lastCommitDate("src/app/use-cases", "src/lib/use-cases.ts"),
      changeFrequency: "monthly" as const,
      // Commercial intent, same tier as the integration pages.
      priority: 0.9,
    })),
    // Spanish landing pages. Only the customs page has an English twin; the
    // pairs are declared via alternates.languages on both sides.
    {
      url: `${SITE_URL}/es`,
      lastModified: lastCommitDate("src/app/es/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/es/aduanas`,
      lastModified: lastCommitDate("src/app/es/aduanas/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/guides`,
      lastModified: lastCommitDate("src/app/guides", "src/lib/guides.ts"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...GUIDES.map((g) => ({
      url: `${SITE_URL}/guides/${g.slug}`,
      lastModified: new Date(g.updated),
      changeFrequency: "monthly" as const,
      // Informational; sits below the commercial pages it links to.
      priority: 0.7,
    })),
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
  return stripeOn
    ? entries
    : entries.filter((e) => e.url !== `${SITE_URL}/pricing`);
}
