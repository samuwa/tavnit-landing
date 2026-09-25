import Link from "next/link";
import { ArrowRight, Check, TriangleAlert } from "lucide-react";
import type { UseCase } from "@/lib/use-cases";
import type { Locale } from "@/lib/locale";
import { toolsForUseCase } from "@/lib/lite/related";
import { APP_URL } from "@/lib/site";
import SectionEyebrow from "@/components/SectionEyebrow";

/**
 * Body of a use-case page, shared by /use-cases/[slug] and the Spanish
 * routes. The data (`fields`, `gotchas`, FAQs) is what makes each page
 * specific; the chrome around it is the same in both languages, so it lives
 * once here and the two routes only differ in metadata, schema and which
 * data file they read.
 *
 * The CTA differs by market on purpose. English pages lead with self-serve
 * ("Start free"); Spanish pages lead with the demo, because Panama and
 * Latin America are sold through a demo and self-serve checkout is closed.
 */

const COPY = {
  en: {
    home: "Home",
    hub: "Use Cases",
    readOther: null,
    primaryCta: "Start free",
    primaryHref: APP_URL,
    seePricing: "See pricing",
    bookDemo: "Book a demo",
    demoHref: "/schedule",
    painful: "Why this is painful",
    extract: "What to extract",
    field: "Field",
    care: "Why it needs care",
    hard: (label: string) => `What makes ${label.toLowerCase()} hard`,
    pipeline: "How the pipeline handles it",
    docsNote: null,
    faq: "Common questions",
    others: "Other document types",
    finalTitle: "Try it on one document",
    finalBody: (label: string) =>
      `Build a flow, send a real ${label.toLowerCase().replace(/s$/, "")} through it, and see what comes back. Free credits to start.`,
    finalCta: "Start free",
    finalHref: APP_URL,
    breadcrumbAria: "Breadcrumb",
  },
  es: {
    home: "Inicio",
    hub: "Casos de uso",
    readOther: "Read in English",
    primaryCta: "Agendar una demostración",
    primaryHref: "/es/agendar",
    seePricing: "Ver precios",
    bookDemo: "Probar gratis",
    demoHref: APP_URL,
    painful: "Por qué duele",
    extract: "Qué se extrae",
    field: "Campo",
    care: "Por qué requiere cuidado",
    hard: () => "Dónde se complica",
    pipeline: "Cómo lo resuelve el proceso",
    docsNote: "La documentación técnica enlazada está en inglés.",
    faq: "Preguntas frecuentes",
    others: "Otros tipos de documento",
    finalTitle: "Pruébalo con uno de tus documentos",
    finalBody: () =>
      "Trae un documento real. En la demostración armamos tu primer Flow y ves los datos salir en vivo, con tus propios archivos.",
    finalCta: "Agendar una demostración",
    finalHref: "/es/agendar",
    breadcrumbAria: "Ruta de navegación",
  },
} as const;

export type RelatedUseCase = { label: string; badge: string; href: string };


/** The free tool(s) built for this document type, from the Lite registry. */
const TRY_COPY: Record<Locale, { heading: string; body: string }> = {
  es: { heading: "Pruébalo gratis, sin registro", body: "Sube un documento y ve el resultado en pantalla." },
  en: { heading: "Try it free, no sign-up", body: "Upload one document and see the result on screen." },
};

export default function UseCaseArticle({
  uc,
  locale,
  homeHref,
  hubHref,
  alternateHref,
  others,
  stripeOn,
}: {
  uc: UseCase;
  locale: Locale;
  homeHref: string;
  hubHref: string;
  /** This page in the other language, for the inline "Read in …" link. */
  alternateHref: string;
  others: RelatedUseCase[];
  stripeOn: boolean;
}) {
  const t = COPY[locale];
  // /pricing 307s to the homepage while Stripe self-serve is off; the
  // secondary CTA must not link into a redirect in that state.
  const secondaryHref = stripeOn ? "/pricing" : t.demoHref;
  const secondaryLabel = stripeOn ? t.seePricing : t.bookDemo;

  return (
    <div className="max-w-[860px] mx-auto px-4 sm:px-6">
      <nav aria-label={t.breadcrumbAria} className="mb-6 text-sm text-fg-5 flex flex-wrap items-center gap-x-2">
        <Link href={homeHref} className="hover:text-fg-3 transition-colors">{t.home}</Link>
        <span aria-hidden="true">/</span>
        <Link href={hubHref} className="hover:text-fg-3 transition-colors">{t.hub}</Link>
        <span aria-hidden="true">/</span>
        <span className="text-fg-4">{uc.label}</span>
        {t.readOther && (
          <span className="ml-auto">
            <Link href={alternateHref} hrefLang="en" lang="en" className="hover:text-fg-3 transition-colors">
              {t.readOther}
            </Link>
          </span>
        )}
      </nav>

      <SectionEyebrow className="mb-4">{uc.badge}</SectionEyebrow>

      <h1 className="text-3xl md:text-5xl font-extrabold text-fg mb-5 tracking-tight leading-tight">
        {uc.h1}
      </h1>

      {/* Self-contained lead answer — the passage most likely to be extracted. */}
      <p className="text-lg text-fg-3 leading-relaxed mb-10">{uc.lede}</p>

      <div className="flex flex-wrap gap-3 mb-16">
        <Link
          href={t.primaryHref}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white font-semibold shadow-md hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#3b82f6]/20 transition-all"
        >
          {t.primaryCta} <ArrowRight size={17} />
        </Link>
        <Link
          href={secondaryHref}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-tint/15 text-fg-3 font-semibold hover:bg-tint/5 hover:text-fg transition-all"
        >
          {secondaryLabel}
        </Link>
      </div>

      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-fg mb-4">{t.painful}</h2>
        <div className="space-y-4 text-fg-4 leading-relaxed">
          {uc.problem.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-fg mb-5">{t.extract}</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-tint/10">
                <th className="text-left py-3 pr-4 font-semibold text-fg-3 whitespace-nowrap">{t.field}</th>
                <th className="text-left py-3 font-semibold text-fg-3">{t.care}</th>
              </tr>
            </thead>
            <tbody className="text-fg-4">
              {uc.fields.map((f) => (
                <tr key={f.name} className="border-b border-tint/5 align-top">
                  <td className="py-3 pr-4 font-medium text-fg-2">{f.name}</td>
                  <td className="py-3 leading-relaxed">{f.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-fg mb-5">{t.hard(uc.label)}</h2>
        <div className="space-y-4">
          {uc.gotchas.map((g) => (
            <div key={g.title} className="glass-card rounded-xl p-5">
              <div className="flex items-center gap-2.5 mb-2">
                <TriangleAlert size={18} className="text-amber-400 flex-shrink-0" />
                <h3 className="text-base font-semibold text-fg">{g.title}</h3>
              </div>
              <p className="text-sm text-fg-4 leading-relaxed">{g.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-fg mb-5">{t.pipeline}</h2>
        <ul className="space-y-3">
          {uc.pipeline.map((step) => (
            <li key={step.label} className="flex gap-3 leading-relaxed">
              <Check size={18} className="text-ok flex-shrink-0 mt-1" />
              <span className="text-fg-4">
                <Link href={step.href} className="text-accent font-medium hover:underline">
                  {step.label}
                </Link>{" "}
                — {step.why}
              </span>
            </li>
          ))}
        </ul>
        {t.docsNote && <p className="text-xs text-fg-5 mt-4">{t.docsNote}</p>}
      </section>

      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-fg mb-6">{t.faq}</h2>
        <dl className="space-y-4">
          {uc.faqs.map((faq) => (
            <div key={faq.q} className="glass-card rounded-xl p-5">
              <dt className="text-base font-semibold text-fg mb-2">{faq.q}</dt>
              <dd className="text-sm text-fg-4 leading-relaxed">{faq.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      {others.length > 0 && (
        <section className="mb-14">
          <h2 className="text-xl font-bold text-fg mb-4">{t.others}</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {others.map((o) => (
              <Link
                key={o.href}
                href={o.href}
                className="glass-card glass-card-hover rounded-xl p-4 transition-all"
              >
                <span className="text-sm font-semibold text-fg">{o.label}</span>
                <span className="block text-xs text-fg-5 mt-1 leading-relaxed">{o.badge}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {toolsForUseCase(uc.slug, locale).length > 0 && (
        <section className="mb-14 glass-card rounded-2xl p-6 border border-emerald-400/30">
          <h2 className="text-xl font-bold text-fg mb-2">{TRY_COPY[locale].heading}</h2>
          <p className="text-sm text-fg-4 mb-4">{TRY_COPY[locale].body}</p>
          <div className="flex flex-wrap gap-3">
            {toolsForUseCase(uc.slug, locale).map((tool) => (
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
        <p className="text-fg-4 mb-6 max-w-[520px] mx-auto leading-relaxed">{t.finalBody(uc.label)}</p>
        <Link
          href={t.finalHref}
          className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white font-semibold shadow-md hover:-translate-y-0.5 transition-all"
        >
          {t.finalCta} <ArrowRight size={17} />
        </Link>
      </div>
    </div>
  );
}
