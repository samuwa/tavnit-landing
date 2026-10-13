import type { Metadata } from "next";
import Link from "next/link";
import LiteShell from "@/components/lite/LiteShell";
import LiteTool from "@/components/lite/LiteTool";
import LiteCompare from "@/components/lite/LiteCompare";
import LiteSplit from "@/components/lite/LiteSplit";
import LiteClean from "@/components/lite/LiteClean";
import LiteFaq from "@/components/lite/LiteFaq";
import { LiteIntentProvider } from "@/components/lite/intent";
import { Download, Files, GitCompareArrows, ListChecks, ScanSearch, ScanText, Scissors, Upload, type LucideIcon } from "lucide-react";
import type { LiteToolKind } from "@/lib/lite/tools";

/** One icon per "how it works" step: put in, Tavnit reads, take out. */
const HOW_ICONS: Record<LiteToolKind, LucideIcon[]> = {
  extract: [Upload, ScanText, Download],
  compare: [Files, ScanText, GitCompareArrows],
  split: [Upload, ScanSearch, Scissors],
  clean: [Upload, ListChecks, Download],
};
import { buildLocalizedPageSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import { engineLocale, hreflangOf, localeHome, type Locale } from "@/lib/locales";
import { localizedPath, pageAlternates, pageOgLocales } from "@/lib/routes";
import { LITE_HUB_PATHS, LITE_TOOLS, type LiteToolId } from "@/lib/lite/tools";
import { HUB_COPY, RELATED_COPY, TOOL_COPY } from "@/lib/lite/copy";
import { pagesForTool } from "@/lib/lite/related";

/**
 * One free-tool page, any language. The routes per tool are thin wrappers
 * (/tools/<slug>, /es/herramientas/<slug-es>, /<lang>/tools/<slug>) so the
 * hreflang set is guaranteed to match: every twin calls alternatesFor()
 * with the tool's English path.
 *
 * Two locales meet here: the PAGE locale (copy, links, sign-up language)
 * and the ENGINE locale, engineLocale(locale) — the Flow, Matcher, sample
 * and column names the tool runs, Spanish or English.
 *
 * Layout: one centred column. The tool is the page; what follows (how it
 * works, questions) is short and quiet. The "and then what?" diagram is
 * rendered by the tool itself, only once a result exists.
 */

export function liteToolMetadata(toolId: LiteToolId, locale: Locale): Metadata {
  const tool = LITE_TOOLS[toolId];
  const copy = TOOL_COPY[toolId][locale];
  const path = localizedPath(tool.paths.en, locale);
  return {
    title: copy.title,
    description: copy.description,
    alternates: pageAlternates(tool.paths.en, locale),
    openGraph: {
      type: "website",
      url: path,
      title: copy.title,
      description: copy.description,
      siteName: "Tavnit",
      ...pageOgLocales(tool.paths.en, locale),
      // No `images` here: each tool route ships its own opengraph-image.tsx.
    },
  };
}

export default function LiteToolPage({ toolId, locale }: { toolId: LiteToolId; locale: Locale }) {
  const tool = LITE_TOOLS[toolId];
  const copy = TOOL_COPY[toolId][locale];
  const hub = HUB_COPY[locale];
  const engine = engineLocale(locale);
  const path = localizedPath(tool.paths.en, locale);
  const hubPath = localizedPath(LITE_HUB_PATHS.en, locale);
  const homePath = localeHome(locale);

  const schema = buildLocalizedPageSchema({
    path,
    name: copy.label,
    headline: copy.h1,
    description: copy.description,
    inLanguage: hreflangOf(locale),
    breadcrumb: [
      { name: hub.breadcrumbHome, url: `${SITE_URL}${homePath}` },
      { name: hub.breadcrumbHub, url: `${SITE_URL}${hubPath}` },
      { name: copy.label, url: `${SITE_URL}${path}` },
    ],
    faqs: copy.faqs,
  });
  (schema["@graph"] as object[]).push({
    "@type": "WebApplication",
    "@id": `${SITE_URL}${path}#app`,
    name: copy.label,
    url: `${SITE_URL}${path}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    inLanguage: hreflangOf(locale),
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@id": `${SITE_URL}/#organization` },
  });

  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || null;
  const related = pagesForTool(toolId, locale);
  const relatedCopy = RELATED_COPY[locale];

  return (
    <LiteShell locale={locale} enPath={tool.paths.en}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="mx-auto max-w-[960px] px-4 sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[var(--lite-muted)]">
          <Link href={hubPath} className="hover:text-[var(--lite-ink)]">
            {hub.breadcrumbHub}
          </Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <span>{copy.label}</span>
        </nav>

        <LiteIntentProvider tool={toolId} locale={locale}>
        {tool.kind === "compare" && tool.compare ? (
          <LiteCompare
            toolId={toolId}
            locale={locale}
            copy={copy}
            turnstileSiteKey={turnstileSiteKey}
            minDocs={tool.compare.minDocs}
            maxDocs={tool.compare.maxDocs}
            sampleNames={(tool.samplePaths ?? []).map((p) => p.split("/").pop() ?? p)}
            columns={tool.columnOrder[engine]}
            lineFields={tool.lineFields[engine]}
          />
        ) : tool.kind === "clean" && tool.clean ? (
          <LiteClean
            toolId={toolId}
            locale={locale}
            copy={copy}
            mode={tool.clean.mode}
            outputs={Object.keys(tool.clean.cleaners)}
            turnstileSiteKey={turnstileSiteKey}
            hasSample={Boolean(tool.samplePaths?.length)}
          />
        ) : tool.kind === "split" ? (
          <LiteSplit
            toolId={toolId}
            locale={locale}
            copy={copy}
            turnstileSiteKey={turnstileSiteKey}
            hasSample={Boolean(tool.samplePaths?.length)}
            sampleName={tool.samplePaths?.[0]?.split("/").pop() ?? "sample.pdf"}
          />
        ) : (
          <LiteTool
            toolId={toolId}
            locale={locale}
            copy={copy}
            turnstileSiteKey={turnstileSiteKey}
            hasSample={Boolean(tool.samplePaths?.length)}
            sampleUrl={tool.samplePaths?.[0] ? `/${tool.samplePaths[0]}` : undefined}
          />
        )}
        </LiteIntentProvider>

        <section aria-labelledby="lite-how-heading" className="mt-28">
          <h2 id="lite-how-heading" className="lite-display text-3xl sm:text-4xl">
            {copy.how.heading}
          </h2>
          <ol className="lite-sheet relative mt-8 grid overflow-hidden rounded-2xl border border-[var(--lite-line)] bg-[var(--lite-white)] sm:grid-cols-3">
            {copy.how.steps.map((s, i) => {
              const Icon = HOW_ICONS[tool.kind][i] ?? HOW_ICONS.extract[i] ?? Upload;
              return (
                <li
                  key={s.title}
                  className="relative flex flex-col p-6 sm:p-7 [&:not(:first-child)]:border-t [&:not(:first-child)]:border-[var(--lite-line)] sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:border-t-0"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="bg-clip-text text-[2.75rem] italic leading-none text-transparent"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 500,
                        backgroundImage: "linear-gradient(120deg, var(--lite-blue) 0%, var(--lite-violet) 90%)",
                      }}
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-[var(--lite-line)] bg-[#f6f8fb] text-[var(--lite-ink)]">
                      <Icon size={18} strokeWidth={1.8} aria-hidden />
                    </span>
                  </div>
                  {/* the step's progress: a hairline that fills one third more each step */}
                  <span className="mt-5 block h-px w-full bg-[var(--lite-line)]" aria-hidden>
                    <span className="lite-brand block h-px" style={{ width: `${((i + 1) / copy.how.steps.length) * 100}%` }} />
                  </span>
                  <h3 className="mt-5 font-heading text-lg font-bold leading-snug">
                    <span className="sr-only">{i + 1}. </span>
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--lite-muted)]">{s.body}</p>
                </li>
              );
            })}
          </ol>
        </section>

        <section aria-labelledby="lite-faq-heading" className="mt-24">
          <h2 id="lite-faq-heading" className="lite-display text-3xl sm:text-4xl">
            {copy.faqHeading}
          </h2>
          <LiteFaq items={copy.faqs} />
        </section>

        {(related.useCase || related.guide) && (
          <section aria-labelledby="lite-related-heading" className="mt-24">
            <h2 id="lite-related-heading" className="lite-display text-3xl sm:text-4xl">
              {relatedCopy.heading}
            </h2>
            <p className="mt-4 max-w-[640px] text-sm leading-relaxed text-[var(--lite-muted)]">{relatedCopy.lead}</p>
            <ul className="mt-6 space-y-3 text-sm">
              {related.useCase && (
                <li>
                  <span className="text-[var(--lite-muted)]">{relatedCopy.useCase} </span>
                  <Link href={related.useCase.href} className="font-semibold text-[var(--lite-blue)] underline underline-offset-4">
                    {related.useCase.label}
                  </Link>
                </li>
              )}
              {related.guide && (
                <li>
                  <span className="text-[var(--lite-muted)]">{relatedCopy.guide} </span>
                  <Link href={related.guide.href} className="font-semibold text-[var(--lite-blue)] underline underline-offset-4">
                    {related.guide.label}
                  </Link>
                </li>
              )}
            </ul>
          </section>
        )}
      </div>
    </LiteShell>
  );
}
