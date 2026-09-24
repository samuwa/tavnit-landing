import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileSpreadsheet, GitCompareArrows, Layers } from "lucide-react";
import LiteShell from "@/components/lite/LiteShell";
import { buildLocalizedPageSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import { EN_LOCALE_OG, ES_LOCALE_OG, languageAlternates, type Locale } from "@/lib/locale";
import { LITE_HUB_PATHS, LITE_TOOLS, LITE_TOOL_IDS } from "@/lib/lite/tools";
import { HUB_COPY, TOOL_COPY } from "@/lib/lite/copy";

/**
 * Hub for the free tools (/tools and /es/herramientas). One card per tool
 * from the registry; adding a tool adds a card and a sitemap entry without
 * touching this file.
 */

export function liteHubMetadata(locale: Locale): Metadata {
  const copy = HUB_COPY[locale];
  const path = LITE_HUB_PATHS[locale];
  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: languageAlternates(LITE_HUB_PATHS.en, LITE_HUB_PATHS.es),
    },
    openGraph: {
      type: "website",
      url: path,
      title: copy.title,
      description: copy.description,
      siteName: "Tavnit",
      locale: locale === "es" ? ES_LOCALE_OG : EN_LOCALE_OG,
      alternateLocale: [locale === "es" ? EN_LOCALE_OG : ES_LOCALE_OG],
      images: ["/opengraph-image"],
    },
  };
}

export default function LiteHubPage({ locale }: { locale: Locale }) {
  const copy = HUB_COPY[locale];
  const path = LITE_HUB_PATHS[locale];
  const homePath = locale === "es" ? "/es" : "/";
  const items = LITE_TOOL_IDS.map((id) => ({
    id,
    href: LITE_TOOLS[id].paths[locale],
    kind: LITE_TOOLS[id].kind,
    label: TOOL_COPY[id][locale].label,
    h1: TOOL_COPY[id][locale].h1,
    description: TOOL_COPY[id][locale].description,
  }));

  return (
    <LiteShell locale={locale} alternatePath={LITE_HUB_PATHS[locale === "es" ? "en" : "es"]}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildLocalizedPageSchema({
              path,
              name: copy.h1,
              headline: copy.h1,
              description: copy.description,
              inLanguage: locale === "es" ? "es-PA" : "en-US",
              breadcrumb: [
                { name: copy.breadcrumbHome, url: `${SITE_URL}${homePath}` },
                { name: copy.breadcrumbHub, url: `${SITE_URL}${path}` },
              ],
              items: items.map((i) => ({ name: i.label, url: `${SITE_URL}${i.href}` })),
            }),
          ),
        }}
      />

      <div className="mx-auto max-w-[760px] px-4 sm:px-6">
        <h1 className="font-heading text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          {copy.h1}
        </h1>
        <p className="mt-4 max-w-[600px] text-lg leading-relaxed text-[var(--lite-muted)]">{copy.intro}</p>

        <div className="mt-10 space-y-4">
          {items.map((t) => (
            <Link
              key={t.id}
              href={t.href}
              className="flex items-start gap-5 rounded-2xl border border-[var(--lite-line)] bg-[var(--lite-white)] p-6 transition-colors hover:border-[var(--lite-blue)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lite-blue)]/50"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[var(--lite-blue-soft)] text-[var(--lite-blue)]">
                {t.kind === "compare" ? <GitCompareArrows size={22} aria-hidden /> : t.kind === "split" ? <Layers size={22} aria-hidden /> : <FileSpreadsheet size={22} aria-hidden />}
              </span>
              <span className="min-w-0">
                <span className="block font-heading text-xl font-bold">{t.h1}</span>
                <span className="mt-2 block text-sm leading-relaxed text-[var(--lite-muted)]">{t.description}</span>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[var(--lite-blue-ink)]">
                  {t.label}
                  <ArrowRight size={14} aria-hidden />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </LiteShell>
  );
}
