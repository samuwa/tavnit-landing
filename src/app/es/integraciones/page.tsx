import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MarketingPage from "@/components/MarketingPage";
import { buildLocalizedPageSchema } from "@/lib/schema";
import { INTEGRATIONS_ES } from "@/lib/integrations.es";
import { SITE_URL } from "@/lib/site";
import { EN_LOCALE_OG, ES_LOCALE_OG, languageAlternates } from "@/lib/locale";

const TITLE = "Integraciones — API, correo, webhooks y MCP";
const DESCRIPTION =
  "Todas las formas de entrar y salir de Tavnit: un conector MCP para asistentes de IA, API REST, reenvío por correo, webhooks y recetas para Zapier, Make y n8n.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/es/integraciones",
    languages: languageAlternates("/integrations", "/es/integraciones"),
  },
  openGraph: {
    type: "website",
    url: "/es/integraciones",
    title: "Integraciones de Tavnit",
    description: DESCRIPTION,
    siteName: "Tavnit",
    locale: ES_LOCALE_OG,
    alternateLocale: [EN_LOCALE_OG],
    images: ["/opengraph-image"],
  },
};

export default function SpanishIntegrationsPage() {
  return (
    <MarketingPage locale="es" alternatePath="/integrations">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildLocalizedPageSchema({
              path: "/es/integraciones",
              name: "Integraciones de Tavnit",
              headline: TITLE,
              description: DESCRIPTION,
              inLanguage: "es-PA",
              breadcrumb: [
                { name: "Inicio", url: `${SITE_URL}/es` },
                { name: "Integraciones", url: `${SITE_URL}/es/integraciones` },
              ],
              items: INTEGRATIONS_ES.map((i) => ({ name: i.labelEs, url: `${SITE_URL}${i.hrefEs}` })),
            }),
          ),
        }}
      />

      <div className="max-w-[860px] mx-auto px-4 sm:px-6">
        <nav aria-label="Ruta de navegación" className="mb-6 text-sm text-gray-500 flex flex-wrap items-center gap-x-2">
          <Link href="/es" className="hover:text-gray-300 transition-colors">Inicio</Link>
          <span aria-hidden="true">/</span>
          <span className="text-gray-400">Integraciones</span>
          <span className="ml-auto">
            <Link href="/integrations" hrefLang="en" lang="en" className="hover:text-gray-300 transition-colors">
              Read in English
            </Link>
          </span>
        </nav>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-5 tracking-tight">
          Integraciones
        </h1>
        <p className="text-lg text-gray-300 leading-relaxed mb-4">
          Los documentos llegan a Tavnit como le convenga al equipo que los envía — subidos en la
          aplicación, reenviados a una dirección de correo, publicados en un endpoint o pedidos
          por un asistente de IA. Los datos extraídos salen por el mismo camino.
        </p>
        <p className="text-gray-400 leading-relaxed mb-12">
          Cada vía ejecuta los mismos Flows, así que el esquema, las reglas de limpieza y los
          pasos de revisión que configuraste aplican sin importar cómo llegue el documento.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-14">
          {INTEGRATIONS_ES.map((item) => (
            <Link
              key={item.label}
              href={item.hrefEs}
              className="glass-card glass-card-hover rounded-xl p-5 flex flex-col transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h2 className="text-base font-semibold text-white">{item.labelEs}</h2>
                <ArrowRight size={16} className="text-[#3b82f6] flex-shrink-0 mt-1" />
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">{item.summaryEs}</p>
            </Link>
          ))}
        </div>

        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">¿Cuál te conviene?</h2>
          <div className="space-y-3 text-gray-400 leading-relaxed">
            <p>
              <strong className="text-gray-200">Si son personas las que envían los documentos</strong>{" "}
              — por ejemplo, la bandeja de cuentas por pagar que recibe facturas de proveedores —
              usa el{" "}
              <Link href="/docs/email-integration" className="text-[#3b82f6] hover:underline">correo electrónico</Link>.
              Nadie tiene que aprender una herramienta nueva; reenvían como ya lo hacen.
            </p>
            <p>
              <strong className="text-gray-200">Si es un sistema el que los envía</strong>, usa la{" "}
              <Link href="/docs/api-integration" className="text-[#3b82f6] hover:underline">API REST</Link>{" "}
              y recibe los resultados por{" "}
              <Link href="/docs/webhooks" className="text-[#3b82f6] hover:underline">webhook</Link>.
              Si prefieres no escribir el código intermedio, los mismos endpoints funcionan desde
              Zapier, Make, n8n y Power Automate.
            </p>
            <p>
              <strong className="text-gray-200">Si trabajas con un asistente de IA</strong>, usa el{" "}
              <Link href="/es/integraciones/mcp" className="text-[#3b82f6] hover:underline">conector MCP</Link>.
              Le da a claude.ai o Cursor el proceso completo, no solo una entrada: tu asistente
              puede crear Flows de extracción, añadir reglas de limpieza, procesar documentos y
              consultar lo que ya extrajiste — sin que muevas archivos a mano.
            </p>
          </div>
          <p className="text-xs text-gray-500 mt-4">La documentación técnica enlazada está en inglés.</p>
        </section>

        <div className="glass-card rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Empieza con un documento</h2>
          <p className="text-gray-400 mb-6 max-w-[520px] mx-auto leading-relaxed">
            Trae un documento real a la demostración: armamos el Flow, lo procesamos en vivo y
            vemos por dónde conviene conectar la salida a tus sistemas.
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
