import type { Metadata } from "next";
import Link from "next/link";
import LiteShell from "@/components/lite/LiteShell";
import { buildLocalizedPageSchema } from "@/lib/schema";
import { APP_URL, SITE_URL } from "@/lib/site";
import { EN_LOCALE_OG, ES_LOCALE_OG, languageAlternates, type Locale } from "@/lib/locale";
import { ArrowRight, WandSparkles } from "lucide-react";
import { LITE_CUSTOM_TOOL_ID, LITE_HUB_PATHS, LITE_TOOLS, LITE_TOOL_IDS, type LiteToolKind } from "@/lib/lite/tools";
import { KIND_ICON, KIND_ORDER, TOOL_ICONS } from "@/components/lite/tool-icons";
import { HUB_COPY, TOOL_COPY } from "@/lib/lite/copy";
import { CUSTOM_COPY } from "@/lib/lite/custom-copy";

/**
 * Hub for the free tools (/tools and /es/herramientas): a grid of small
 * "apps", the way iLovePDF lays its tools out, grouped by what they do.
 * One card per tool from the registry; adding a tool adds a card and a
 * sitemap entry without touching this file (only the icon table below
 * needs a line, else the kind's default icon is used).
 *
 * The Custom Tool is the exception: it is the hook of the free tools, so it
 * sits above the grid as a feature card of its own instead of in a group.
 */

const TILE: Record<LiteToolKind, string> = {
  extract: "bg-[var(--lite-blue-soft)] text-[var(--lite-blue)] group-hover:bg-[var(--lite-blue)] group-hover:text-white",
  compare: "bg-[var(--lite-violet-soft)] text-[var(--lite-violet)] group-hover:bg-[var(--lite-violet)] group-hover:text-white",
  split: "bg-[#eef1f4] text-[var(--lite-ink)] group-hover:bg-[var(--lite-ink)] group-hover:text-white",
  clean: "bg-[#fdf3e3] text-[#a4580b] group-hover:bg-[#a4580b] group-hover:text-white",
};

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
    kind: LITE_TOOLS[id].kind,
    href: LITE_TOOLS[id].paths[locale],
    label: TOOL_COPY[id][locale].label,
    h1: TOOL_COPY[id][locale].h1,
    description: TOOL_COPY[id][locale].description,
    Icon: TOOL_ICONS[id] ?? KIND_ICON[LITE_TOOLS[id].kind],
  }));
  const grid = items.filter((i) => !LITE_TOOLS[i.id].custom);
  const groups = KIND_ORDER.map((kind) => ({ kind, title: copy.groups[kind], items: grid.filter((i) => i.kind === kind) })).filter((g) => g.items.length);
  const custom = CUSTOM_COPY[locale];
  const customHref = LITE_TOOLS[LITE_CUSTOM_TOOL_ID].paths[locale];

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

      <div className="mx-auto max-w-[1080px] px-4 sm:px-6">
        <header className="mx-auto max-w-[680px] text-center">
          <h1 className="lite-display text-[2.6rem] leading-[1.05] sm:text-6xl">{copy.h1}</h1>
          <p className="mx-auto mt-5 max-w-[560px] text-lg leading-relaxed text-[var(--lite-muted)]">{copy.intro}</p>
        </header>

        <section aria-labelledby="lite-custom-heading" className="lite-pop mt-12">
          <Link
            href={customHref}
            className="group relative block overflow-hidden rounded-3xl p-[1.5px] shadow-[0_18px_50px_-20px_rgba(108,66,240,0.55)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lite-violet)]/60"
            style={{ backgroundImage: "linear-gradient(120deg, var(--lite-violet) 0%, var(--lite-blue) 100%)" }}
          >
            <div className="grid gap-8 rounded-[calc(1.5rem-1.5px)] bg-[var(--lite-white)] p-6 sm:p-9 md:grid-cols-[1.25fr_1fr] md:items-center">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--lite-violet-soft)] px-3 py-1 text-xs font-semibold text-[var(--lite-violet)]">
                  <WandSparkles size={13} aria-hidden />
                  {custom.badge}
                </span>
                <span id="lite-custom-heading" className="lite-display mt-4 block text-3xl leading-tight sm:text-[2.6rem]">
                  {custom.hub.title}
                </span>
                <span className="mt-3 block max-w-[520px] text-base leading-relaxed text-[var(--lite-muted)]">{custom.hub.body}</span>
                <span
                  className="lite-press mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-6 font-semibold text-white shadow-md shadow-[#6c42f0]/30"
                  style={{ backgroundImage: "linear-gradient(120deg, var(--lite-violet) 0%, var(--lite-blue) 100%)" }}
                >
                  {custom.hub.cta}
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </div>
              <div className="rounded-2xl border border-[var(--lite-line)] bg-[#faf9ff] p-5">
                <ol className="space-y-4">
                  {custom.hub.steps.map((step, i) => (
                    <li key={step} className="flex items-center gap-3 text-sm font-semibold">
                      <span
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold text-white"
                        style={{ backgroundImage: "linear-gradient(120deg, var(--lite-violet) 0%, var(--lite-blue) 100%)" }}
                      >
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Link>
        </section>

        {groups.map((g) => (
          <section key={g.kind} aria-labelledby={`lite-group-${g.kind}`} className="mt-14">
            <h2 id={`lite-group-${g.kind}`} className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--lite-muted)]">
              {g.title}
            </h2>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((t, i) => (
                <li key={t.id} className="lite-pop" style={{ animationDelay: `${i * 50}ms` }}>
                  <Link
                    href={t.href}
                    className="group flex h-full flex-col rounded-2xl border border-[var(--lite-line)] bg-[var(--lite-white)] p-5 transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-[var(--lite-blue)] hover:shadow-[0_10px_30px_-12px_rgba(59,130,246,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lite-blue)]/50"
                  >
                    <span className={`grid h-12 w-12 place-items-center rounded-xl transition-colors ${TILE[t.kind]}`}>
                      <t.Icon size={24} strokeWidth={1.9} aria-hidden />
                    </span>
                    <span className="mt-4 block font-heading text-lg font-bold leading-snug">{t.label}</span>
                    <span className="mt-1.5 line-clamp-2 block text-sm leading-relaxed text-[var(--lite-muted)]">{t.h1}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section className="mx-auto mt-20 max-w-[620px] text-center">
          <p className="text-base leading-relaxed text-[var(--lite-muted)]">{copy.outro}</p>
          <Link
            href={APP_URL}
            className="lite-brand lite-press mt-6 inline-flex min-h-12 items-center justify-center rounded-lg px-6 font-semibold text-white shadow-md shadow-[#3b82f6]/25 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lite-blue)]/50"
          >
            {copy.outroCta}
          </Link>
        </section>
      </div>
    </LiteShell>
  );
}
