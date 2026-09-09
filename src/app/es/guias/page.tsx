import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import MarketingPage from "@/components/MarketingPage";
import { buildLocalizedPageSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import { GUIDES } from "@/lib/guides";
import { GUIDES_ES, GUIDE_ES_BY_SLUG, esGuidePath } from "@/lib/guides.es";
import { EN_LOCALE_OG, ES_LOCALE_OG, languageAlternates } from "@/lib/locale";

const TITLE = "Guías — Clasificación arancelaria, conciliación de facturas y más";
const DESCRIPTION =
  "Guías en español sobre los problemas detrás de la automatización documental: clasificación arancelaria en Panamá, conciliación de facturas con órdenes de compra y más.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/es/guias",
    languages: languageAlternates("/guides", "/es/guias"),
  },
  openGraph: {
    type: "website",
    url: "/es/guias",
    title: "Guías de Tavnit",
    description: DESCRIPTION,
    siteName: "Tavnit",
    locale: ES_LOCALE_OG,
    alternateLocale: [EN_LOCALE_OG],
    images: ["/opengraph-image"],
  },
};

export default function SpanishGuidesHub() {
  // English-only guides are listed after the Spanish ones, labelled as such,
  // so the hub is not two cards long and the reader knows what to expect.
  const englishOnly = GUIDES.filter((g) => !GUIDE_ES_BY_SLUG[g.slug]);

  return (
    <MarketingPage locale="es" alternatePath="/guides">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildLocalizedPageSchema({
              path: "/es/guias",
              name: "Guías",
              headline: "Guías de automatización documental",
              description: DESCRIPTION,
              inLanguage: "es-PA",
              breadcrumb: [
                { name: "Inicio", url: `${SITE_URL}/es` },
                { name: "Guías", url: `${SITE_URL}/es/guias` },
              ],
              items: GUIDES_ES.map((g) => ({ name: g.h1, url: `${SITE_URL}${esGuidePath(g)}` })),
            }),
          ),
        }}
      />

      <div className="max-w-[860px] mx-auto px-4 sm:px-6">
        <nav aria-label="Ruta de navegación" className="mb-6 text-sm text-gray-500 flex flex-wrap items-center gap-x-2">
          <Link href="/es" className="hover:text-gray-300 transition-colors">Inicio</Link>
          <span aria-hidden="true">/</span>
          <span className="text-gray-400">Guías</span>
          <span className="ml-auto">
            <Link href="/guides" hrefLang="en" lang="en" className="hover:text-gray-300 transition-colors">
              Read in English
            </Link>
          </span>
        </nav>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-5 tracking-tight leading-tight">
          Guías de automatización documental
        </h1>
        <p className="text-lg text-gray-300 leading-relaxed mb-12 max-w-[680px]">
          Los problemas detrás del producto, explicados por sí mismos: cómo funciona de verdad la
          clasificación arancelaria, qué verifica la conciliación de una factura con su orden de
          compra. Neutrales hasta la última sección, donde decimos qué automatiza Tavnit.
        </p>

        <div className="space-y-4">
          {GUIDES_ES.map((g) => (
            <Link
              key={g.slug}
              href={esGuidePath(g)}
              className="glass-card glass-card-hover rounded-2xl p-6 block transition-all"
            >
              <h2 className="text-xl font-bold text-white mb-2">{g.h1}</h2>
              <p className="text-sm text-gray-400 leading-relaxed mb-3">{g.description}</p>
              <span className="inline-flex items-center gap-4 text-xs text-gray-500">
                <span className="inline-flex items-center gap-1">
                  <Clock size={13} /> {g.readingMinutes} min de lectura
                </span>
                <span className="inline-flex items-center gap-1 text-[#3b82f6] font-medium">
                  Leer <ArrowRight size={13} />
                </span>
              </span>
            </Link>
          ))}
        </div>

        {englishOnly.length > 0 && (
          <section className="mt-14">
            <h2 className="text-xl font-bold text-white mb-2">Guías en inglés</h2>
            <p className="text-sm text-gray-500 mb-4">
              Todavía no tienen versión en español.
            </p>
            <ul className="space-y-2">
              {englishOnly.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/guides/${g.slug}`}
                    hrefLang="en"
                    lang="en"
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {g.h1}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </MarketingPage>
  );
}
