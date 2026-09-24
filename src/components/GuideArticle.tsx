import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { Guide } from "@/lib/guides";
import type { Locale } from "@/lib/locale";
import { toolsForGuide } from "@/lib/lite/related";
import { APP_URL } from "@/lib/site";

/**
 * Body of a guide, shared by /guides/[slug] and /es/guias/[slug]. Same
 * reasoning as UseCaseArticle: the article is the data, the chrome is shared,
 * and the two routes differ only in metadata, schema and data source.
 */

const COPY = {
  en: {
    home: "Home",
    hub: "Guides",
    homeHref: "/",
    hubHref: "/guides",
    readOther: null,
    minRead: (m: number) => `${m} min read`,
    updated: "Updated",
    dateLocale: "en-US",
    faq: "Common questions",
    more: "More guides",
    finalTitle: "Try it on one document",
    finalBody: "Build a flow, send a real document through it, and see what comes back. Free credits to start.",
    finalCta: "Start free",
    finalHref: APP_URL,
    breadcrumbAria: "Breadcrumb",
  },
  es: {
    home: "Inicio",
    hub: "Guías",
    homeHref: "/es",
    hubHref: "/es/guias",
    readOther: "Read in English",
    minRead: (m: number) => `${m} min de lectura`,
    updated: "Actualizado el",
    dateLocale: "es-PA",
    faq: "Preguntas frecuentes",
    more: "Más guías",
    finalTitle: "Pruébalo con uno de tus documentos",
    finalBody: "Trae un documento real. En la demostración armamos tu primer Flow y ves los datos salir en vivo.",
    finalCta: "Agendar una demostración",
    finalHref: "/es/agendar",
    breadcrumbAria: "Ruta de navegación",
  },
} as const;

export type RelatedGuide = { h1: string; readingMinutes: number; href: string };


/** The free tool(s) built for this document type, from the Lite registry. */
const TRY_COPY: Record<Locale, { heading: string; body: string }> = {
  es: { heading: "Pruébalo gratis, sin registro", body: "Sube un documento y ve el resultado en pantalla." },
  en: { heading: "Try it free, no sign-up", body: "Upload one document and see the result on screen." },
};

export default function GuideArticle({
  g,
  locale,
  alternateHref,
  others,
}: {
  g: Guide;
  locale: Locale;
  alternateHref: string;
  others: RelatedGuide[];
}) {
  const t = COPY[locale];
  const dateFmt = new Intl.DateTimeFormat(t.dateLocale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  return (
    <article className="max-w-[760px] mx-auto px-4 sm:px-6">
      <nav aria-label={t.breadcrumbAria} className="mb-6 text-sm text-fg-5 flex flex-wrap items-center gap-x-2">
        <Link href={t.homeHref} className="hover:text-fg-3 transition-colors">{t.home}</Link>
        <span aria-hidden="true">/</span>
        <Link href={t.hubHref} className="hover:text-fg-3 transition-colors">{t.hub}</Link>
        {t.readOther && (
          <span className="ml-auto">
            <Link href={alternateHref} hrefLang="en" lang="en" className="hover:text-fg-3 transition-colors">
              {t.readOther}
            </Link>
          </span>
        )}
      </nav>

      <h1 className="text-3xl md:text-5xl font-extrabold text-fg mb-5 tracking-tight leading-tight">
        {g.h1}
      </h1>

      <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-fg-5 mb-8">
        <span className="inline-flex items-center gap-1">
          <Clock size={13} /> {t.minRead(g.readingMinutes)}
        </span>
        <time dateTime={g.updated}>
          {t.updated} {dateFmt.format(new Date(g.updated))}
        </time>
      </p>

      {/* Self-contained lead answer — the passage most likely to be extracted. */}
      <p className="text-lg text-fg-3 leading-relaxed mb-12">{g.lede}</p>

      {g.sections.map((section) => (
        <section key={section.heading} className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-fg mb-4">{section.heading}</h2>
          <div className="space-y-4 text-fg-4 leading-relaxed">
            {section.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            {section.bullets && (
              <ul className="list-disc pl-5 space-y-2 marker:text-accent">
                {section.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            )}
          </div>
        </section>
      ))}

      <section className="mb-14 glass-card rounded-2xl p-6 md:p-8 border border-[#3b82f6]/30">
        <h2 className="text-2xl font-bold text-fg mb-4">{g.tavnit.heading}</h2>
        <div className="space-y-4 text-fg-4 leading-relaxed mb-5">
          {g.tavnit.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {g.tavnit.links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="inline-flex items-center gap-1 text-sm text-accent font-medium hover:underline"
              >
                {l.label} <ArrowRight size={14} />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-14">
        <h2 className="text-2xl md:text-3xl font-bold text-fg mb-6">{t.faq}</h2>
        <dl className="space-y-4">
          {g.faqs.map((faq) => (
            <div key={faq.q} className="glass-card rounded-xl p-5">
              <dt className="text-base font-semibold text-fg mb-2">{faq.q}</dt>
              <dd className="text-sm text-fg-4 leading-relaxed">{faq.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      {others.length > 0 && (
        <section className="mb-14">
          <h2 className="text-xl font-bold text-fg mb-4">{t.more}</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {others.map((o) => (
              <Link
                key={o.href}
                href={o.href}
                className="glass-card glass-card-hover rounded-xl p-4 transition-all"
              >
                <span className="text-sm font-semibold text-fg">{o.h1}</span>
                <span className="block text-xs text-fg-5 mt-1 leading-relaxed">
                  {t.minRead(o.readingMinutes)}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {toolsForGuide(g.slug, locale).length > 0 && (
        <section className="mb-14 glass-card rounded-2xl p-6 border border-emerald-400/30">
          <h2 className="text-xl font-bold text-fg mb-2">{TRY_COPY[locale].heading}</h2>
          <p className="text-sm text-fg-4 mb-4">{TRY_COPY[locale].body}</p>
          <div className="flex flex-wrap gap-3">
            {toolsForGuide(g.slug, locale).map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/15 text-sm font-semibold text-fg hover:bg-white/5 transition-colors"
              >
                {tool.label} <ArrowRight size={15} />
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="glass-card rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-fg mb-3">{t.finalTitle}</h2>
        <p className="text-fg-4 mb-6 max-w-[520px] mx-auto leading-relaxed">{t.finalBody}</p>
        <Link
          href={t.finalHref}
          className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white font-semibold shadow-md hover:-translate-y-0.5 transition-all"
        >
          {t.finalCta} <ArrowRight size={17} />
        </Link>
      </div>
    </article>
  );
}
