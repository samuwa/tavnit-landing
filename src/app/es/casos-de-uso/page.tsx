import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MarketingPage from "@/components/MarketingPage";
import { buildLocalizedPageSchema } from "@/lib/schema";
import { USE_CASES_ES, esUseCasePath } from "@/lib/use-cases.es";
import { SITE_URL } from "@/lib/site";
import { EN_LOCALE_OG, ES_LOCALE_OG, languageAlternates } from "@/lib/locale";

const TITLE = "Casos de uso — Facturas, aduanas, órdenes de compra y más";
const DESCRIPTION =
  "Cómo usan Tavnit los equipos según el tipo de documento: facturas, documentación aduanera, órdenes de compra, cotizaciones, contratos y más — y qué suele salir mal en cada uno.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/es/casos-de-uso",
    languages: languageAlternates("/use-cases", "/es/casos-de-uso"),
  },
  openGraph: {
    type: "website",
    url: "/es/casos-de-uso",
    title: "Casos de uso de Tavnit",
    description: DESCRIPTION,
    siteName: "Tavnit",
    locale: ES_LOCALE_OG,
    alternateLocale: [EN_LOCALE_OG],
    images: ["/opengraph-image"],
  },
};

export default function SpanishUseCasesHub() {
  return (
    <MarketingPage locale="es" alternatePath="/use-cases">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildLocalizedPageSchema({
              path: "/es/casos-de-uso",
              name: "Casos de uso de Tavnit",
              headline: TITLE,
              description: DESCRIPTION,
              inLanguage: "es-PA",
              breadcrumb: [
                { name: "Inicio", url: `${SITE_URL}/es` },
                { name: "Casos de uso", url: `${SITE_URL}/es/casos-de-uso` },
              ],
              items: USE_CASES_ES.map((u) => ({ name: u.label, url: `${SITE_URL}${esUseCasePath(u)}` })),
            }),
          ),
        }}
      />

      <div className="max-w-[900px] mx-auto px-4 sm:px-6">
        <nav aria-label="Ruta de navegación" className="mb-6 text-sm text-gray-500 flex flex-wrap items-center gap-x-2">
          <Link href="/es" className="hover:text-gray-300 transition-colors">Inicio</Link>
          <span aria-hidden="true">/</span>
          <span className="text-gray-400">Casos de uso</span>
          <span className="ml-auto">
            <Link href="/use-cases" hrefLang="en" lang="en" className="hover:text-gray-300 transition-colors">
              Read in English
            </Link>
          </span>
        </nav>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-5 tracking-tight">
          Casos de uso
        </h1>
        <p className="text-lg text-gray-300 leading-relaxed mb-4">
          El proceso es el mismo sea cual sea el documento — extraer, limpiar, revisar, actuar.
          Lo que cambia es qué campos importan y qué suele salir mal.
        </p>
        <p className="text-gray-400 leading-relaxed mb-12">
          Cada página cubre los campos que vale la pena extraer de ese tipo de documento, las
          partes que fallan con más frecuencia y qué etapa del proceso se gana su lugar.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-14">
          {USE_CASES_ES.map((uc) => (
            <Link
              key={uc.slug}
              href={esUseCasePath(uc)}
              className="glass-card glass-card-hover rounded-xl p-5 flex flex-col transition-all"
            >
              <span className="text-[11px] font-semibold text-[#93c5fd] uppercase tracking-wider mb-2">
                {uc.badge}
              </span>
              <div className="flex items-start justify-between gap-3 mb-2">
                <h2 className="text-base font-semibold text-white">{uc.label}</h2>
                <ArrowRight size={16} className="text-[#3b82f6] flex-shrink-0 mt-1" />
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">{uc.summary}</p>
            </Link>
          ))}
        </div>

        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            ¿No ves tu tipo de documento?
          </h2>
          <p className="text-gray-400 leading-relaxed mb-3">
            Estos son los tipos por los que más preguntan los equipos, no una lista de lo que
            Tavnit soporta. No hay configuración por tipo de documento: describes los campos que
            quieres y la misma extracción lee cualquier PDF o imagen, incluidos escaneos y
            escritura a mano.
          </p>
          <p className="text-gray-400 leading-relaxed">
            Certificados, formularios de solicitud, planillas, actas y cualquier otro documento
            funcionan igual. Cuéntanos tu caso en una{" "}
            <Link href="/es/agendar" className="text-[#3b82f6] hover:underline">
              demostración
            </Link>{" "}
            o empieza desde la{" "}
            <Link href="/docs" className="text-[#3b82f6] hover:underline">
              guía de inicio (en inglés)
            </Link>
            .
          </p>
        </section>

        <div className="glass-card rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Empieza con un documento</h2>
          <p className="text-gray-400 mb-6 max-w-[540px] mx-auto leading-relaxed">
            Trae uno de tus documentos reales. En la demostración armamos el Flow y ves los datos
            salir en vivo antes de conectar nada.
          </p>
          <Link
            href="/es/agendar"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white font-semibold shadow-md hover:-translate-y-0.5 transition-all"
          >
            Agendar una demostración <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </MarketingPage>
  );
}
