import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Mail, Plug, ShieldCheck, Sparkles } from "lucide-react";
import MarketingPage from "@/components/MarketingPage";
import { buildLocalizedPageSchema } from "@/lib/schema";
import { APP_URL, SITE_URL } from "@/lib/site";
import { USE_CASES_ES, esUseCasePath } from "@/lib/use-cases.es";

/**
 * Spanish landing page.
 *
 * Tavnit's primary market is Spanish-speaking — Panama first, then the rest of
 * Latin America — and the product itself is fully bilingual, yet the site had
 * no Spanish at all. Search Console confirmed the gap: Panama is the top
 * country by clicks (all on the brand name) and there is not one Spanish
 * query in three months of data, because there was nothing for one to land on.
 *
 * It pairs with "/" via hreflang and is the entry point of the Spanish site:
 * use cases, integrations, guides and the demo form all have Spanish routes
 * (see src/lib/locale.ts). Docs and legal pages stay English. MarketingPage
 * sets lang="es" because the root layout owns <html lang="en"> and a
 * per-route root layout would mean restructuring the whole app tree.
 *
 * Register follows .agents/product-marketing.md: "tú", concrete, product
 * nouns kept in English (Flow, Cleaner, Bucket).
 */

const TITLE = "Tavnit — Extrae datos de tus documentos con IA, revísalos y actúa";
const DESCRIPTION =
  "Convierte facturas, listas de empaque, contratos y formularios en datos estructurados, sin plantillas por proveedor. Tu equipo revisa y aprueba antes de que nada se registre. API, correo y MCP.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: "/es",
    languages: {
      en: `${SITE_URL}/`,
      es: `${SITE_URL}/es`,
      "x-default": `${SITE_URL}/`,
    },
  },
  openGraph: {
    type: "website",
    url: "/es",
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Tavnit",
    locale: "es_PA",
    alternateLocale: ["en_US"],
    images: ["/opengraph-image"],
  },
};

const PROBLEMS = [
  "Los mismos campos, re-tipeados desde cien diseños distintos, todos los meses. Cada proveedor exporta su factura de una forma diferente y alguien en tu equipo la pasa a mano a una hoja de cálculo o al sistema.",
  "Las herramientas de OCR con plantillas funcionan hasta que el proveedor cambia el formato — y entonces fallan en silencio. Las herramientas de “chatea con tu PDF” inventan cifras y no tienen revisión, ni auditoría, ni salida hacia tus sistemas.",
  "Un total equivocado se ve exactamente igual que uno correcto. El costo real no son las horas de captura: es el error que llega a la contabilidad o a la declaración aduanera sin que nadie lo vea.",
];

const STEPS = [
  {
    icon: Sparkles,
    title: "Extraer",
    body: "Defines una vez los campos que necesitas — número de factura, proveedor, líneas con cantidad y precio — y Tavnit los extrae de cualquier PDF, escaneo o foto, sin importar el diseño. Sin plantillas por proveedor.",
  },
  {
    icon: ShieldCheck,
    title: "Revisar",
    body: "Los Cleaners limpian y validan: formatos de fecha, monedas, aritmética de líneas, búsquedas contra tus datos maestros. Lo que no cuadra se detiene y va a un revisor con nombre. Todo queda en una bitácora de auditoría inalterable.",
  },
  {
    icon: Plug,
    title: "Actuar",
    body: "Los datos aprobados llegan a tu ERP o contabilidad por API o webhook, se guardan en un Bucket consultable, llenan formularios PDF, o alimentan a un agente que trabaja en un portal web por ti.",
  },
];

/** The six highest-demand document types for this market; the hub has all. */
const FEATURED_USE_CASES = USE_CASES_ES.slice(0, 6);

const FAQS = [
  {
    q: "¿Necesito crear una plantilla por cada proveedor?",
    a: "No. Defines los campos una sola vez en un Flow y Tavnit los encuentra en cualquier diseño. Si un proveedor cambia el formato de su factura, no tienes que hacer nada.",
  },
  {
    q: "¿Cómo evito que un dato equivocado llegue a mi sistema?",
    a: "Con revisión humana. Puedes exigir aprobación en todos los documentos, o solo cuando una regla de un Cleaner detecta algo — por ejemplo, que cantidad por precio unitario no cuadra con el total de la línea. El revisor ve el documento y el dato extraído, corrige o aprueba, y cada acción queda en la bitácora de auditoría.",
  },
  {
    q: "¿Cómo envío los documentos?",
    a: "Como prefieras: reenvías el correo con el PDF adjunto a una dirección de Tavnit, los subes en la aplicación, o los envías por API. Los resultados salen por webhook, API, correo, o se guardan en un Bucket que puedes consultar y graficar.",
  },
  {
    q: "¿Funciona en español?",
    a: "Sí. La aplicación es completamente bilingüe (español e inglés) y extrae documentos en cualquier idioma. Puedes trabajar con facturas en español y devolver los datos con los nombres de campo que use tu sistema.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "El modelo es por créditos: 1 crédito equivale a 1 página procesada. Los planes se cotizan por organización; agenda una demostración y vemos tu volumen y tus documentos reales.",
  },
];

export default function SpanishLandingPage() {
  return (
    <MarketingPage locale="es" alternatePath="/">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildLocalizedPageSchema({
              path: "/es",
              name: "Tavnit en español",
              headline: TITLE,
              description: DESCRIPTION,
              inLanguage: "es",
              breadcrumb: [
                { name: "Inicio", url: SITE_URL },
                { name: "Español", url: `${SITE_URL}/es` },
              ],
              faqs: FAQS,
            }),
          ),
        }}
      />

      <div className="max-w-[900px] mx-auto px-4 sm:px-6">
        <p className="text-sm text-gray-500 mb-6">
          <Link href="/" hrefLang="en" lang="en" className="hover:text-gray-300 transition-colors">
            Read this page in English
          </Link>
        </p>

        <span className="inline-block text-xs font-semibold text-[#3b82f6] bg-[#3b82f6]/10 px-2.5 py-1 rounded-md mb-4">
          Operaciones documentales con IA
        </span>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-5 tracking-tight leading-tight">
          Extrae datos de tus documentos con IA, revísalos con tu equipo y actúa sobre ellos
        </h1>

        <p className="text-lg text-gray-300 leading-relaxed mb-10 max-w-[720px]">
          Tavnit convierte facturas, listas de empaque, contratos y formularios en datos
          estructurados — sin plantillas por proveedor. Tu equipo revisa y aprueba antes de que
          nada se registre, y los datos aprobados llegan a tus sistemas por API, webhook o correo.
        </p>

        <div className="flex flex-wrap gap-3 mb-20">
          <Link
            href="/es/agendar"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white font-semibold shadow-md hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#3b82f6]/20 transition-all"
          >
            Agendar una demostración <ArrowRight size={17} />
          </Link>
          <Link
            href={APP_URL}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/15 text-gray-300 font-semibold hover:bg-white/5 hover:text-white transition-all"
          >
            Probar gratis
          </Link>
        </div>

        <section className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">El problema</h2>
          <div className="space-y-4 text-gray-400 leading-relaxed max-w-[760px]">
            {PROBLEMS.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Cómo funciona: extraer, revisar, actuar</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {STEPS.map((s, i) => (
              <div key={s.title} className="glass-card rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-9 h-9 rounded-lg bg-[#3b82f6]/15 text-[#3b82f6] inline-flex items-center justify-center">
                    <s.icon size={18} />
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    <span className="text-gray-500 mr-2">{i + 1}.</span>
                    {s.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="casos-de-uso" className="mb-20 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Casos de uso</h2>
          <p className="text-gray-400 mb-6 max-w-[720px] leading-relaxed">
            Empezamos por aduanas, porque es donde un error cuesta más. Cada página cubre qué
            campos importan en ese tipo de documento y qué suele salir mal.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {FEATURED_USE_CASES.map((uc) => (
              <Link
                key={uc.slug}
                href={esUseCasePath(uc)}
                className="glass-card glass-card-hover rounded-xl p-5 transition-all"
              >
                <span className="block text-base font-semibold text-white mb-1.5">{uc.label}</span>
                <span className="block text-sm text-gray-400 leading-relaxed">{uc.summary}</span>
              </Link>
            ))}
          </div>
          <p className="mt-5 text-sm">
            <Link href="/es/casos-de-uso" className="inline-flex items-center gap-1 text-[#3b82f6] font-medium hover:underline">
              Ver los {USE_CASES_ES.length} casos de uso <ArrowRight size={14} />
            </Link>
          </p>
        </section>

        <section id="integraciones" className="mb-20 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">Se integra con lo que ya usas</h2>
          <ul className="space-y-3 max-w-[760px]">
            {[
              { icon: Mail, text: "Correo electrónico: reenvía el PDF a una dirección de Tavnit y recibe los datos de vuelta. Cero integración." },
              { icon: Plug, text: "API REST y webhooks: envía documentos desde tu sistema y recibe los resultados en el momento en que terminan. Recetas para Zapier, Make, n8n y Power Automate." },
              { icon: Sparkles, text: "Conector MCP: conecta Tavnit a claude.ai o Cursor y pide a tu asistente que procese documentos o consulte tus datos extraídos." },
              { icon: Check, text: "Buckets: almacenamiento estructurado incorporado, consultable en lenguaje natural y graficable, sin exportar nada." },
            ].map((item, i) => (
              <li key={i} className="flex gap-3 leading-relaxed text-gray-400">
                <item.icon size={18} className="text-emerald-400 flex-shrink-0 mt-1" />
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm">
            <Link href="/es/integraciones" className="inline-flex items-center gap-1 text-[#3b82f6] font-medium hover:underline">
              Todas las integraciones <ArrowRight size={14} />
            </Link>
          </p>
        </section>

        <section id="preguntas" className="mb-16 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Preguntas frecuentes</h2>
          <dl className="space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.q} className="glass-card rounded-xl p-5">
                <dt className="text-base font-semibold text-white mb-2">{faq.q}</dt>
                <dd className="text-sm text-gray-400 leading-relaxed">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="glass-card rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Pruébalo con uno de tus documentos</h2>
          <p className="text-gray-400 mb-6 max-w-[540px] mx-auto leading-relaxed">
            Trae una factura o una lista de empaque real. En la demostración armamos tu primer Flow y
            ves los datos salir en vivo.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/es/agendar"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white font-semibold shadow-md hover:-translate-y-0.5 transition-all"
            >
              Agendar una demostración <ArrowRight size={17} />
            </Link>
            <Link
              href={APP_URL}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-lg border border-white/15 text-gray-300 font-semibold hover:bg-white/5 hover:text-white transition-all"
            >
              Probar gratis
            </Link>
          </div>
        </div>
      </div>
    </MarketingPage>
  );
}
