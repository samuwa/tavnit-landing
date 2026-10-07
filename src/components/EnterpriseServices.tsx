import Link from "next/link";
import { ArrowRight, ClipboardList, FileSignature, LifeBuoy, ShieldCheck, Wrench } from "lucide-react";
import MarketingPage from "@/components/MarketingPage";
import SectionEyebrow from "@/components/SectionEyebrow";
import { buildLocalizedPageSchema, ORG_ID } from "@/lib/schema";
import { SITE_URL, SUPPORT_EMAIL } from "@/lib/site";
import type { Locale } from "@/lib/locale";

/**
 * Enterprise services (/enterprise, /es/empresas).
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

export const ENTERPRISE_PATHS: Record<Locale, string> = { en: "/enterprise", es: "/es/empresas" };
export const ADVISORY_ANCHOR: Record<Locale, string> = { en: "business-advisory", es: "asesoria-empresarial" };

const SERVICE_ICONS = [FileSignature, Wrench, ShieldCheck, LifeBuoy];

const COPY = {
  en: {
    title: "Enterprise Services — Implementation, Control and Business Advisory",
    description:
      "Tavnit Enterprise: contracts on your terms, hands-on implementation, user roles and audit trail, direct support, and Business Advisory to optimise document digitisation and data entry processes.",
    home: "Home",
    homeHref: "/",
    breadcrumbLabel: "Breadcrumb",
    crumb: "Enterprise",
    otherLang: "Leer en español",
    otherLangCode: "es",
    eyebrow: "Tavnit Enterprise",
    h1: "Enterprise services",
    lead:
      "For organisations that process a high volume of documents or need terms of their own: a contract, hands-on help putting Tavnit into production, and advice on the process around it — on top of the platform.",
    servicesHeading: "What Enterprise includes",
    services: [
      {
        title: "Contract on your terms",
        body: "Volume, commercial terms and payment agreed in a contract sized to your documents, instead of a self-serve plan.",
      },
      {
        title: "Hands-on implementation",
        body: "We set up the Flows, Cleaners, review rules and integrations (API, webhooks, email) with you, on your real documents, and leave them running in production.",
      },
      {
        title: "Control and audit",
        body: "User roles, including a reviewer-only role, conditional human review, and an append-only audit trail of every view, edit and approval.",
        links: [
          { label: "User roles", href: "/docs/user-roles" },
          { label: "Human in the loop", href: "/docs/human-in-the-loop" },
        ],
      },
      {
        title: "Direct support",
        body: "A direct line to the team that builds the product, in English and Spanish.",
      },
    ],
    advisory: {
      eyebrow: "Business Advisory",
      heading: "Business Advisory",
      subheading: "Optimisation of document digitisation and data entry processes",
      intro:
        "Besides the platform, we advise companies that want to tidy up and improve how they receive, digitise and record the information in their documents — whether or not the end result is automated with Tavnit.",
      scopeHeading: "What it covers",
      scope: [
        { title: "Diagnosis of the current process", body: "Which documents arrive, through which channels and in what volume; who captures them, how long it takes and where the errors come from." },
        { title: "Digitisation", body: "Scanning and capture criteria, file organisation and naming, separating mixed batches, and keeping the originals traceable." },
        { title: "Data entry", body: "Which fields are actually needed, standard formats for dates, amounts and currencies, validations, and checks against master data." },
        { title: "Controls", body: "Where human review is needed, segregation of duties, and the audit trail an auditor or regulator will ask for." },
        { title: "Integration", body: "How the data reaches your ERP, accounting or spreadsheets, and which steps are worth automating and which are not." },
        { title: "Rollout and training", body: "A staged implementation plan and training for the people who capture, review and use the data." },
      ],
      deliverablesHeading: "Deliverables",
      deliverables:
        "A written diagnosis of the current process, the design of the proposed process with its controls, and a staged implementation plan with indicators to measure the result — capture time per document, correction rate, documents pending review.",
    },
    ctaHeading: "Talk to us",
    ctaBody: "Tell us about your documents and your volume, and we will tell you which of these services fits.",
    ctaButton: "Book a meeting",
    ctaHref: "/schedule",
    ctaEmail: "or write to",
    schemaLang: "en-US",
  },
  es: {
    title: "Servicios Enterprise — Implementación, control y Asesoría Empresarial",
    description:
      "Tavnit Enterprise: contrato a la medida, implementación acompañada, roles de usuario y bitácora de auditoría, soporte directo, y Asesoría Empresarial para la optimización de procesos de digitalización de documentos y entrada de datos.",
    home: "Inicio",
    homeHref: "/es",
    breadcrumbLabel: "Ruta de navegación",
    crumb: "Enterprise",
    otherLang: "Read in English",
    otherLangCode: "en",
    eyebrow: "Tavnit Enterprise",
    h1: "Servicios Enterprise",
    lead:
      "Para organizaciones que procesan un volumen alto de documentos o necesitan condiciones propias: un contrato, acompañamiento para poner Tavnit en producción y asesoría sobre el proceso que lo rodea — además de la plataforma.",
    servicesHeading: "Qué incluye Enterprise",
    services: [
      {
        title: "Contrato a la medida",
        body: "Volumen, condiciones comerciales y forma de pago acordados en un contrato según tus documentos, en lugar de un plan de autoservicio.",
      },
      {
        title: "Implementación acompañada",
        body: "Configuramos contigo los Flows, Cleaners, reglas de revisión e integraciones (API, webhooks, correo) con tus documentos reales, y los dejamos funcionando en producción.",
      },
      {
        title: "Control y auditoría",
        body: "Roles de usuario, incluido un rol solo de revisión, revisión humana condicional y una bitácora de auditoría inalterable de cada vista, edición y aprobación.",
        links: [
          { label: "Roles de usuario", href: "/es/documentacion/roles-de-usuario" },
          { label: "Revisión humana", href: "/es/documentacion/revision-humana" },
        ],
      },
      {
        title: "Soporte directo",
        body: "Un canal directo con el equipo que construye el producto, en español e inglés.",
      },
    ],
    advisory: {
      eyebrow: "Asesoría Empresarial",
      heading: "Asesoría Empresarial",
      subheading: "Optimización de procesos de digitalización de documentos y entrada de datos",
      intro:
        "Además de la plataforma, asesoramos a empresas que quieren ordenar y mejorar cómo reciben, digitalizan y registran la información de sus documentos — se automatice o no el resultado con Tavnit.",
      scopeHeading: "Qué abarca",
      scope: [
        { title: "Diagnóstico del proceso actual", body: "Qué documentos llegan, por qué canales y en qué volumen; quién los captura, cuánto tiempo toma y de dónde vienen los errores." },
        { title: "Digitalización", body: "Criterios de escaneo y captura, organización y nombre de los archivos, separación de lotes mixtos y trazabilidad de los originales." },
        { title: "Entrada de datos", body: "Qué campos se necesitan de verdad, formatos estándar para fechas, montos y monedas, validaciones y cruces contra datos maestros." },
        { title: "Controles", body: "Dónde hace falta revisión humana, segregación de funciones y la trazabilidad que pedirá un auditor o un regulador." },
        { title: "Integración", body: "Cómo llegan los datos a tu ERP, a la contabilidad o a tus hojas de cálculo, y qué pasos conviene automatizar y cuáles no." },
        { title: "Implementación y capacitación", body: "Un plan de implementación por etapas y capacitación para quienes capturan, revisan y usan los datos." },
      ],
      deliverablesHeading: "Entregables",
      deliverables:
        "Un diagnóstico escrito del proceso actual, el diseño del proceso propuesto con sus controles y un plan de implementación por etapas, con indicadores para medir el resultado — tiempo de captura por documento, tasa de corrección, documentos pendientes de revisión.",
    },
    ctaHeading: "Hablemos",
    ctaBody: "Cuéntanos qué documentos manejas y en qué volumen, y te decimos cuál de estos servicios te conviene.",
    ctaButton: "Agendar una reunión",
    ctaHref: "/es/agendar",
    ctaEmail: "o escríbenos a",
    schemaLang: "es-PA",
  },
} as const;

export function enterpriseMetadataCopy(locale: Locale) {
  return { title: COPY[locale].title, description: COPY[locale].description };
}

export default function EnterpriseServices({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  const other: Locale = locale === "es" ? "en" : "es";
  const path = ENTERPRISE_PATHS[locale];
  const url = `${SITE_URL}${path}`;
  const anchor = ADVISORY_ANCHOR[locale];

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
    inLanguage: t.schemaLang,
  };

  return (
    <MarketingPage locale={locale} alternatePath={ENTERPRISE_PATHS[other]}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildLocalizedPageSchema({
              path,
              name: t.h1,
              headline: t.title,
              description: t.description,
              inLanguage: t.schemaLang,
              breadcrumb: [
                { name: t.home, url: `${SITE_URL}${t.homeHref === "/" ? "" : t.homeHref}` },
                { name: t.crumb, url },
              ],
            }),
          ),
        }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(advisoryService) }} />

      <div className="max-w-[860px] mx-auto px-4 sm:px-6">
        <nav aria-label={t.breadcrumbLabel} className="mb-6 text-sm text-fg-5 flex flex-wrap items-center gap-x-2">
          <Link href={t.homeHref} className="hover:text-fg-3 transition-colors">{t.home}</Link>
          <span aria-hidden="true">/</span>
          <span className="text-fg-4">{t.crumb}</span>
          <span className="ml-auto">
            <Link href={ENTERPRISE_PATHS[other]} hrefLang={t.otherLangCode} lang={t.otherLangCode} className="hover:text-fg-3 transition-colors">
              {t.otherLang}
            </Link>
          </span>
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
                  {"links" in s && (
                    <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                      {s.links.map((l) => (
                        <Link key={l.href} href={l.href} className="text-accent hover:underline">{l.label}</Link>
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
            href={t.ctaHref}
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
