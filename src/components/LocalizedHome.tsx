import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Mail, Plug, ShieldCheck, Sparkles } from "lucide-react";
import MarketingPage from "@/components/MarketingPage";
import SectionEyebrow from "@/components/SectionEyebrow";
import { buildLocalizedPageSchema } from "@/lib/schema";
import { APP_URL, SITE_URL } from "@/lib/site";
import { hreflangOf, localeHome, localeInfo, type Locale } from "@/lib/locales";
import { alternatesFor, localizedPath, pageOgLocales } from "@/lib/routes";
import { USE_CASES_ES, esUseCasePath } from "@/lib/use-cases.es";
import { USE_CASE_CONTENT } from "@/content/use-cases";
import { HOME_COPY } from "@/content/home";

/**
 * The compact home page: /es and the ten new languages (/de, /ja, …).
 * English keeps its rich animated home at "/" (src/app/page.tsx); this is
 * the structure of the original Spanish page, driven by a typed `HomeCopy`
 * (src/content/home/<code>.ts; ./en.ts there is the translation source).
 *
 * Every link is an English path through localizedPath(), so each language
 * links its own pages where they exist. Featured use cases come from the
 * language's use-case data (Spanish: its own slugs).
 */

export type HomeLocale = Exclude<Locale, "en">;

const STEP_ICONS = [Sparkles, ShieldCheck, Plug];
const INTEGRATION_ICONS = [Mail, Plug, Sparkles, Check];

/** The six highest-demand document types; the hub has all. */
const FEATURED = 6;

export function localizedHomeMetadata(locale: HomeLocale): Metadata {
  const t = HOME_COPY[locale];
  const path = localeHome(locale);
  return {
    title: { absolute: t.title },
    description: t.description,
    alternates: { canonical: path, languages: alternatesFor("/") },
    openGraph: {
      type: "website",
      url: path,
      title: t.title,
      description: t.description,
      siteName: "Tavnit",
      ...pageOgLocales("/", locale),
      images: ["/opengraph-image"],
    },
  };
}

function featuredUseCases(locale: HomeLocale): { items: { key: string; label: string; summary: string; href: string }[]; total: number } {
  if (locale === "es") {
    return {
      items: USE_CASES_ES.slice(0, FEATURED).map((uc) => ({ key: uc.slug, label: uc.label, summary: uc.summary, href: esUseCasePath(uc) })),
      total: USE_CASES_ES.length,
    };
  }
  const all = USE_CASE_CONTENT[locale].items;
  return {
    items: all.slice(0, FEATURED).map((uc) => ({
      key: uc.slug,
      label: uc.label,
      summary: uc.summary,
      href: localizedPath(`/use-cases/${uc.slug}`, locale),
    })),
    total: all.length,
  };
}

export default function LocalizedHome({ locale }: { locale: HomeLocale }) {
  const t = HOME_COPY[locale];
  const path = localeHome(locale);
  const demo = localizedPath("/schedule", locale);
  const useCases = featuredUseCases(locale);

  return (
    <MarketingPage locale={locale} enPath="/">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildLocalizedPageSchema({
              path,
              name: t.schemaName,
              headline: t.title,
              description: t.description,
              inLanguage: hreflangOf(locale),
              breadcrumb: [
                { name: t.breadcrumbHome, url: SITE_URL },
                { name: localeInfo(locale).nativeName, url: `${SITE_URL}${path}` },
              ],
              faqs: t.faqs,
            }),
          ),
        }}
      />

      <div className="max-w-[900px] mx-auto px-4 sm:px-6">
        {t.readInEnglish && (
          <p className="text-sm text-fg-5 mb-6">
            <Link href="/" hrefLang="en" lang="en" className="hover:text-fg-3 transition-colors">
              {t.readInEnglish}
            </Link>
          </p>
        )}

        <SectionEyebrow className="mb-4">{t.eyebrow}</SectionEyebrow>

        <h1 className="text-3xl md:text-5xl font-extrabold text-fg mb-5 tracking-tight leading-tight">{t.h1}</h1>

        <p className="text-lg text-fg-3 leading-relaxed mb-10 max-w-[720px]">{t.lede}</p>

        <div className="flex flex-wrap gap-3 mb-20">
          <Link
            href={demo}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white font-semibold shadow-md hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#3b82f6]/20 transition-all"
          >
            {t.ctaDemo} <ArrowRight size={17} />
          </Link>
          <Link
            href={APP_URL}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-tint/15 text-fg-3 font-semibold hover:bg-tint/5 hover:text-fg transition-all"
          >
            {t.ctaTry}
          </Link>
        </div>

        <section className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-fg mb-5">{t.problemHeading}</h2>
          <div className="space-y-4 text-fg-4 leading-relaxed max-w-[760px]">
            {t.problems.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        <section id={t.ids.howItWorks} className="mb-20 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-fg mb-6">{t.stepsHeading}</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {t.steps.map((s, i) => {
              const Icon = STEP_ICONS[i];
              return (
                <div key={s.title} className="glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-9 h-9 rounded-lg bg-[#3b82f6]/15 text-accent inline-flex items-center justify-center">
                      <Icon size={18} />
                    </span>
                    <h3 className="text-lg font-bold text-fg">
                      <span className="text-fg-5 mr-2">{i + 1}.</span>
                      {s.title}
                    </h3>
                  </div>
                  <p className="text-sm text-fg-4 leading-relaxed">{s.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section id={t.ids.useCases} className="mb-20 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-fg mb-3">{t.useCasesHeading}</h2>
          <p className="text-fg-4 mb-6 max-w-[720px] leading-relaxed">{t.useCasesIntro}</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {useCases.items.map((uc) => (
              <Link key={uc.key} href={uc.href} className="glass-card glass-card-hover rounded-xl p-5 transition-all">
                <span className="block text-base font-semibold text-fg mb-1.5">{uc.label}</span>
                <span className="block text-sm text-fg-4 leading-relaxed">{uc.summary}</span>
              </Link>
            ))}
          </div>
          <p className="mt-5 text-sm">
            <Link
              href={localizedPath("/use-cases", locale)}
              className="inline-flex items-center gap-1 text-accent font-medium hover:underline"
            >
              {t.useCasesAll.replace("{count}", String(useCases.total))} <ArrowRight size={14} />
            </Link>
          </p>
        </section>

        <section id={t.ids.integrations} className="mb-20 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-fg mb-5">{t.integrationsHeading}</h2>
          <ul className="space-y-3 max-w-[760px]">
            {t.integrations.map((text, i) => {
              const Icon = INTEGRATION_ICONS[i];
              return (
                <li key={i} className="flex gap-3 leading-relaxed text-fg-4">
                  <Icon size={18} className="text-ok flex-shrink-0 mt-1" />
                  <span>{text}</span>
                </li>
              );
            })}
          </ul>
          <p className="mt-5 text-sm">
            <Link
              href={localizedPath("/integrations", locale)}
              className="inline-flex items-center gap-1 text-accent font-medium hover:underline"
            >
              {t.integrationsAll} <ArrowRight size={14} />
            </Link>
          </p>
        </section>

        <section id={t.ids.faq} className="mb-16 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-fg mb-6">{t.faqHeading}</h2>
          <dl className="space-y-4">
            {t.faqs.map((faq) => (
              <div key={faq.q} className="glass-card rounded-xl p-5">
                <dt className="text-base font-semibold text-fg mb-2">{faq.q}</dt>
                <dd className="text-sm text-fg-4 leading-relaxed">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="glass-card rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-fg mb-3">{t.finalHeading}</h2>
          <p className="text-fg-4 mb-6 max-w-[540px] mx-auto leading-relaxed">{t.finalBody}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href={demo}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white font-semibold shadow-md hover:-translate-y-0.5 transition-all"
            >
              {t.ctaDemo} <ArrowRight size={17} />
            </Link>
            <Link
              href={APP_URL}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-lg border border-tint/15 text-fg-3 font-semibold hover:bg-tint/5 hover:text-fg transition-all"
            >
              {t.ctaTry}
            </Link>
          </div>
        </div>
      </div>
    </MarketingPage>
  );
}
