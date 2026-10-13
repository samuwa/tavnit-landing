import Link from "next/link";
import { ArrowRight, ClipboardList, FileSignature, LifeBuoy, ShieldCheck, Wrench } from "lucide-react";
import MarketingPage from "@/components/MarketingPage";
import SectionEyebrow from "@/components/SectionEyebrow";
import { buildLocalizedPageSchema, ORG_ID } from "@/lib/schema";
import { SITE_URL, SUPPORT_EMAIL } from "@/lib/site";
import type { Metadata } from "next";
import { hreflangOf, localeHome, type Locale } from "@/lib/locales";
import { localizedPath, pageAlternates, pageOgLocales } from "@/lib/routes";
import { ENTERPRISE_COPY } from "@/content/enterprise";

/**
 * Enterprise services (/enterprise, /es/empresas, /<lang>/enterprise). The
 * words live in src/content/enterprise/<code>.ts.
 *
 * Deliberately low-key: it is not the main offer, so it is linked from the
 * footer, the sitemap and llms.txt only — never from the header or the
 * homepage. It must stay findable, though: the Business Advisory section
 * ("Asesoría Empresarial") describes a registered business activity, and
 * compliance needs a stable public URL for it. Hence the fixed anchors
 * (#business-advisory, #asesoria-empresarial) and the Service node in the
 * JSON-LD; do not rename either without updating whoever links to them.
 *
 * No numbers here (SLAs, certifications, prices) that are not true in the
 * product today.
 */

const EN_PATH = "/enterprise";

/** Stable anchors for the Business Advisory section (see above). The new
 *  languages keep the English one. */
export function advisoryAnchor(locale: Locale): string {
  return locale === "es" ? "asesoria-empresarial" : "business-advisory";
}

const SERVICE_ICONS = [FileSignature, Wrench, ShieldCheck, LifeBuoy];

/** The inline "read in the other language" link: English ↔ Spanish only. */
const OTHER_LANG: Partial<Record<Locale, { label: string; locale: Locale }>> = {
  en: { label: "Leer en español", locale: "es" },
  es: { label: "Read in English", locale: "en" },
};

export function enterpriseMetadata(locale: Locale): Metadata {
  const t = ENTERPRISE_COPY[locale];
  return {
    title: t.title,
    description: t.description,
    alternates: pageAlternates(EN_PATH, locale),
    openGraph: {
      type: "website",
      url: localizedPath(EN_PATH, locale),
      title: "Tavnit Enterprise",
      description: t.description,
      siteName: "Tavnit",
      ...pageOgLocales(EN_PATH, locale),
      images: ["/opengraph-image"],
    },
  };
}

export default function EnterpriseServices({ locale }: { locale: Locale }) {
  const t = ENTERPRISE_COPY[locale];
  const other = OTHER_LANG[locale];
  const path = localizedPath(EN_PATH, locale);
  const url = `${SITE_URL}${path}`;
  const anchor = advisoryAnchor(locale);
  const home = localeHome(locale);

  const advisoryService = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#${anchor}`,
    name: `${t.advisory.heading}: ${t.advisory.subheading}`,
    serviceType: t.advisory.heading,
    description: t.advisory.intro,
    provider: { "@id": ORG_ID },
    areaServed: "Worldwide",
    availableLanguage: ["Spanish", "English"],
    url: `${url}#${anchor}`,
    inLanguage: hreflangOf(locale),
  };

  return (
    <MarketingPage locale={locale} enPath={EN_PATH}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildLocalizedPageSchema({
              path,
              name: t.h1,
              headline: t.title,
              description: t.description,
              inLanguage: hreflangOf(locale),
              breadcrumb: [
                { name: t.home, url: `${SITE_URL}${home === "/" ? "" : home}` },
                { name: t.crumb, url },
              ],
            }),
          ),
        }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(advisoryService) }} />

      <div className="max-w-[860px] mx-auto px-4 sm:px-6">
        <nav aria-label={t.breadcrumbLabel} className="mb-6 text-sm text-fg-5 flex flex-wrap items-center gap-x-2">
          <Link href={home} className="hover:text-fg-3 transition-colors">{t.home}</Link>
          <span aria-hidden="true">/</span>
          <span className="text-fg-4">{t.crumb}</span>
          {other && (
            <span className="ml-auto">
              <Link href={localizedPath(EN_PATH, other.locale)} hrefLang={other.locale} lang={other.locale} className="hover:text-fg-3 transition-colors">
                {other.label}
              </Link>
            </span>
          )}
        </nav>

        <SectionEyebrow className="mb-4">{t.eyebrow}</SectionEyebrow>
        <h1 className="text-3xl md:text-5xl font-extrabold text-fg mb-5 tracking-tight">{t.h1}</h1>
        <p className="text-lg text-fg-3 leading-relaxed mb-12">{t.lead}</p>

        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-fg mb-6">{t.servicesHeading}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {t.services.map((s, i) => {
              const Icon = SERVICE_ICONS[i];
              return (
                <div key={s.title} className="glass-card rounded-xl p-5">
                  <Icon size={18} className="text-accent mb-3" aria-hidden />
                  <h3 className="text-base font-semibold text-fg mb-2">{s.title}</h3>
                  <p className="text-sm text-fg-4 leading-relaxed">{s.body}</p>
                  {s.links && (
                    <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                      {s.links.map((l) => (
                        <Link key={l.href} href={localizedPath(l.href, locale)} className="text-accent hover:underline">{l.label}</Link>
                      ))}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section id={anchor} className="mb-16 scroll-mt-28">
          <SectionEyebrow className="mb-4">{t.advisory.eyebrow}</SectionEyebrow>
          <h2 className="text-2xl md:text-3xl font-bold text-fg mb-2">{t.advisory.heading}</h2>
          <p className="text-lg text-fg-2 font-medium mb-5">{t.advisory.subheading}</p>
          <p className="text-fg-4 leading-relaxed mb-8">{t.advisory.intro}</p>

          <h3 className="text-xl font-semibold text-fg mb-4 flex items-center gap-2">
            <ClipboardList size={18} className="text-accent" aria-hidden />
            {t.advisory.scopeHeading}
          </h3>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-5 mb-10">
            {t.advisory.scope.map((item) => (
              <li key={item.title}>
                <p className="font-semibold text-fg-2 mb-1">{item.title}</p>
                <p className="text-sm text-fg-4 leading-relaxed">{item.body}</p>
              </li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold text-fg mb-3">{t.advisory.deliverablesHeading}</h3>
          <p className="text-fg-4 leading-relaxed">{t.advisory.deliverables}</p>
        </section>

        <div className="glass-card rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-fg mb-3">{t.ctaHeading}</h2>
          <p className="text-fg-4 mb-6 max-w-[520px] mx-auto leading-relaxed">{t.ctaBody}</p>
          <Link
            href={localizedPath("/schedule", locale)}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white font-semibold shadow-md hover:-translate-y-0.5 transition-all"
          >
            {t.ctaButton} <ArrowRight size={17} />
          </Link>
          <p className="mt-4 text-sm text-fg-5">
            {t.ctaEmail}{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="text-accent hover:underline">{SUPPORT_EMAIL}</a>
          </p>
        </div>
      </div>
    </MarketingPage>
  );
}
