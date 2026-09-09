import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, LayoutGrid, Lock, Plug, Repeat, ShieldCheck, Sparkles, Wand2, X } from "lucide-react";
import MarketingPage from "@/components/MarketingPage";
import { buildLocalizedPageSchema } from "@/lib/schema";
import { APP_URL, MCP_URL, SITE_URL } from "@/lib/site";
import { EN_LOCALE_OG, ES_LOCALE_OG, languageAlternates } from "@/lib/locale";
import { isStripeEnabled } from "@/lib/platform";

/**
 * Spanish twin of /integrations/mcp. Same split as the English page: this is
 * the evaluation-intent page ("qué herramienta deja a mi asistente trabajar
 * con mis documentos"); setup lives in /docs/mcp-connector, in English.
 * Facts about roles, credits, URL expiry and clients mirror the English copy
 * exactly — check that page before changing a claim here.
 */

const TITLE = "Extracción de documentos por MCP para Claude y Cursor";
const DESCRIPTION =
  "Conecta Tavnit a claude.ai o Cursor por MCP. Tu asistente puede crear Flows de extracción, procesar documentos con ellos y consultar los resultados — tipificados y limpios.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/es/integraciones/mcp",
    languages: languageAlternates("/integrations/mcp", "/es/integraciones/mcp"),
  },
  openGraph: {
    type: "website",
    url: "/es/integraciones/mcp",
    title: "Servidor MCP para extracción de documentos | Tavnit",
    description: DESCRIPTION,
    siteName: "Tavnit",
    locale: ES_LOCALE_OG,
    alternateLocale: [EN_LOCALE_OG],
    images: ["/opengraph-image"],
  },
};

const faqs = [
  {
    q: "¿En qué se diferencia de pegar un PDF en Claude?",
    a: "Pegar un PDF le pide al asistente que lea un documento que nunca ha visto, en un formato que no fue diseñado para interpretar, sin esquema y sin forma de verificar el resultado. El conector MCP pasa el documento por un Flow de extracción que tú definiste, así que obtienes los mismos campos con nombre cada vez, con los mismos tipos, las mismas reglas de limpieza y el mismo paso de revisión. El asistente recibe datos estructurados, no una interpretación.",
  },
  {
    q: "¿El asistente puede crear Flows y Cleaners, o solo ejecutarlos?",
    a: "Ambas cosas. A través del conector, el asistente puede crear Flows de extracción y reglas de limpieza igual que lo harías en la aplicación: describes en lenguaje natural los campos, tablas y transformaciones que quieres y se crean en tu organización, listos para correr con cada documento futuro. La creación respeta tu rol — Owners y Admins pueden crear; Members y Viewers se quedan en solo ejecutar o solo leer.",
  },
  {
    q: "¿Con qué asistentes de IA funciona?",
    a: "claude.ai en plan Pro o superior, Cursor y cualquier cliente que acepte la URL de un servidor MCP remoto. MCP es un protocolo abierto, así que el soporte no está limitado a un proveedor.",
  },
  {
    q: "¿Necesito escribir código?",
    a: "No. Generas una URL de conector en Tavnit y la pegas en la configuración de tu asistente. Construir el Flow que llama tampoco requiere código — describes los campos que quieres y Tavnit los extrae.",
  },
  {
    q: "¿El asistente puede ver todo lo que hay en la cuenta de mi empresa?",
    a: "No. El conector se emite desde tu propia API key, así que llega solo a la organización en la que iniciaste sesión, con los permisos de tu rol. Un Member no puede hacer que un asistente haga algo que un Member no puede hacer en la aplicación, y los Buckets privados siguen siendo privados salvo que te hayan dado acceso.",
  },
  {
    q: "¿Usar el conector cuesta extra?",
    a: "No. Los documentos procesados a través del conector consumen créditos a la tarifa normal de un crédito por página, igual que subirlos en la aplicación o llamar a la API. No hay un cargo aparte por el acceso MCP.",
  },
  {
    q: "¿Qué pasa cuando la URL del conector vence?",
    a: "Las URLs de conector tienen tiempo de vida limitado, y Tavnit muestra cuándo se creó la tuya y cuándo vence. Al renovarla se emite una URL nueva y la anterior se invalida de inmediato, así que cualquier cliente que aún tenga la vieja deja de funcionar hasta que pegues el valor nuevo.",
  },
];

const capabilities = [
  {
    icon: <LayoutGrid size={20} />,
    title: "Crea un Flow describiéndolo",
    body: "Dile al asistente qué capturar — proveedor, fechas, totales, líneas — y crea el Flow de extracción en tu organización, listo para correr. Montar un proceso pasa a ser un mensaje de chat, no una tarde de configuración.",
  },
  {
    icon: <Wand2 size={20} />,
    title: "Añade reglas de limpieza",
    body: "Pide totales convertidos a USD, fechas normalizadas o valores cruzados contra tus datos de referencia, y el asistente crea el Cleaner y lo asocia al Flow — las mismas reglas corren después con cada documento, llegue como llegue.",
  },
  {
    icon: <Sparkles size={20} />,
    title: "Procesa un documento con un Flow",
    body: "Pídele al asistente que pase una factura, un contrato o un formulario por uno de tus Flows de extracción. Devuelve los campos que definiste, tipificados y limpios, no un párrafo que los describe.",
  },
  {
    icon: <Repeat size={20} />,
    title: "Consulta lo que ya extrajiste",
    body: "Haz preguntas sobre tus Buckets — cuánto le pagaste a un proveedor el trimestre pasado, qué contratos se renuevan el mes que viene — y la respuesta sale de tus datos reales, no de la memoria del modelo.",
  },
];

export default async function SpanishMcpIntegrationPage() {
  const stripeOn = await isStripeEnabled();
  return (
    <MarketingPage locale="es" alternatePath="/integrations/mcp">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildLocalizedPageSchema({
              path: "/es/integraciones/mcp",
              name: "Conector MCP",
              headline: "Servidor MCP para extracción de documentos — Claude y Cursor",
              description: DESCRIPTION,
              inLanguage: "es-PA",
              breadcrumb: [
                { name: "Inicio", url: `${SITE_URL}/es` },
                { name: "Integraciones", url: `${SITE_URL}/es/integraciones` },
                { name: "Conector MCP", url: `${SITE_URL}/es/integraciones/mcp` },
              ],
              faqs,
            }),
          ),
        }}
      />

      <div className="max-w-[860px] mx-auto px-4 sm:px-6">
        <nav aria-label="Ruta de navegación" className="mb-6 text-sm text-gray-500 flex flex-wrap items-center gap-x-2">
          <Link href="/es" className="hover:text-gray-300 transition-colors">Inicio</Link>
          <span aria-hidden="true">/</span>
          <Link href="/es/integraciones" className="hover:text-gray-300 transition-colors">Integraciones</Link>
          <span aria-hidden="true">/</span>
          <span className="text-gray-400">Conector MCP</span>
          <span className="ml-auto">
            <Link href="/integrations/mcp" hrefLang="en" lang="en" className="hover:text-gray-300 transition-colors">
              Read in English
            </Link>
          </span>
        </nav>

        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3b82f6] bg-[#3b82f6]/10 px-2.5 py-1 rounded-md">
            <Plug size={13} /> Model Context Protocol
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-5 tracking-tight leading-tight">
          Dale a tu asistente de IA un proceso documental de verdad
        </h1>

        {/* Respuesta autocontenida — el pasaje con más probabilidad de ser citado. */}
        <p className="text-lg text-gray-300 leading-relaxed mb-4">
          Tavnit corre un servidor MCP. Conéctalo a claude.ai o Cursor y tu asistente recibe el
          proceso documental completo: puede crear Flows de extracción, añadir reglas de limpieza,
          pasar documentos por ellos y leer los resultados — exactamente los campos que definiste,
          limpios y tipificados, en lugar de una interpretación del archivo que le entregaron.
        </p>
        <p className="text-gray-400 leading-relaxed mb-10">
          La configuración es una URL que pegas en los ajustes de tu asistente. Sin SDK, sin
          servidor propio, sin código.
        </p>

        <div className="flex flex-wrap gap-3 mb-16">
          <Link
            href={APP_URL}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white font-semibold shadow-md hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#3b82f6]/20 transition-all"
          >
            Probar gratis <ArrowRight size={17} />
          </Link>
          <Link
            href="/docs/mcp-connector"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#3b82f6]/50 text-[#3b82f6] font-semibold hover:bg-[#3b82f6] hover:text-white transition-all"
          >
            Guía de configuración (en inglés)
          </Link>
        </div>

        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Por qué a los asistentes les cuestan los documentos
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Los asistentes de IA razonan bien y funcionan mal como tubería de datos. Dale una
            factura escaneada y la leerá — probablemente bien, a veces no, y distinto la segunda
            vez. No hay esquema, así que los nombres de campo cambian entre ejecuciones. No hay
            validación, así que un total mal leído se ve exactamente igual que uno correcto. Y no
            queda registro de lo que pasó, que es lo que importa en cuanto la salida toca la
            contabilidad o el cumplimiento.
          </p>
          <p className="text-gray-400 leading-relaxed">
            Eso sirve para una pregunta puntual y no sirve como proceso. Lo que el asistente
            necesita es una herramienta que ya sepa leer tus documentos.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">
            Pegar un PDF vs. llamar a un Flow
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 pr-4"><span className="sr-only">Capacidad</span></th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-300">Pegar el archivo en el chat</th>
                  <th className="text-left py-3 pl-4 font-semibold text-white">A través del conector MCP</th>
                </tr>
              </thead>
              <tbody className="text-gray-400">
                {[
                  ["Forma de la salida", "Lo que el modelo devuelva esa vez", "Los campos que define tu Flow, cada vez"],
                  ["Nombres de campo", "Cambian entre ejecuciones", "Fijos por tu esquema"],
                  ["Reglas de limpieza", "Ninguna", "Cleaners aplicados automáticamente"],
                  ["Revisión humana", "No es posible", "Opcional, con bitácora de auditoría"],
                  ["Dónde quedan los resultados", "En el chat", "Buckets, webhook, correo o API"],
                  ["Repetible a volumen", "No", "Sí — el mismo Flow, cualquier cantidad de documentos"],
                ].map(([label, a, b]) => (
                  <tr key={label} className="border-b border-white/5 align-top">
                    <td className="py-3 pr-4 font-medium text-gray-300 whitespace-nowrap">{label}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-start gap-2">
                        <X size={15} className="text-red-400/70 flex-shrink-0 mt-0.5" />
                        {a}
                      </span>
                    </td>
                    <td className="py-3 pl-4">
                      <span className="inline-flex items-start gap-2">
                        <Check size={15} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                        {b}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">
            Qué puede hacer tu asistente una vez conectado
          </h2>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {capabilities.map((c) => (
              <div key={c.title} className="glass-card rounded-xl p-5">
                <div className="flex items-center gap-2.5 mb-2 text-[#93c5fd]">
                  {c.icon}
                  <h3 className="text-base font-semibold text-white">{c.title}</h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
          <div className="glass-card rounded-xl p-5">
            <p className="text-sm text-gray-500 mb-3 font-medium">Cosas que puedes pedirle:</p>
            <ul className="space-y-2 text-sm text-gray-300">
              {[
                "Crea un Flow que capture proveedor, fechas, totales y líneas de nuestras facturas de flete.",
                "Añade a ese Flow un Cleaner que convierta todos los totales a USD.",
                "Pasa esta factura por mi Flow de Facturas de Proveedores y muéstrame las líneas.",
                "¿Cuánto le pagamos a Acme Corp el trimestre pasado, según mi Bucket de facturas?",
                "Extrae las fechas de renovación de estos tres contratos y compáralas.",
                "¿Qué Runs están esperando revisión ahora mismo?",
              ].map((q) => (
                <li key={q} className="flex gap-2.5">
                  <span className="text-[#3b82f6] flex-shrink-0" aria-hidden="true">&rsaquo;</span>
                  <span className="italic">&ldquo;{q}&rdquo;</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Usa el proceso que ya construiste
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            El conector no es un motor de extracción aparte. Llama a los mismos Flows que el resto
            de Tavnit — los hayas creado en la aplicación o los haya creado el asistente por ti —
            así que cada regla que configuraste sigue aplicando cuando el que pide es un asistente.
          </p>
          <ul className="space-y-2.5 text-gray-400">
            {[
              [<Link key="c" href="/docs/collections" className="text-[#3b82f6] hover:underline">Collections</Link>, "siguen clasificando cada documento entrante y enviándolo al Flow correcto."],
              [<Link key="cl" href="/docs/cleaners" className="text-[#3b82f6] hover:underline">Cleaners</Link>, "siguen estandarizando formatos, convirtiendo monedas y aplicando tus búsquedas."],
              [<Link key="h" href="/docs/human-in-the-loop" className="text-[#3b82f6] hover:underline">Revisión humana</Link>, "sigue deteniendo un Run cuando lo pediste — un asistente no puede saltarse tu paso de aprobación."],
              [<Link key="b" href="/docs/buckets" className="text-[#3b82f6] hover:underline">Buckets</Link>, "siguen recibiendo los resultados, así que lo que el asistente extrae queda consultable después."],
            ].map(([link, tail], i) => (
              <li key={i} className="flex gap-2.5 leading-relaxed">
                <Check size={17} className="text-emerald-400 flex-shrink-0 mt-1" />
                <span>{link} {tail}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-500 mt-4">La documentación técnica enlazada está en inglés.</p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Alcance y acceso</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="glass-card rounded-xl p-5">
              <div className="flex items-center gap-2.5 mb-2 text-[#93c5fd]">
                <ShieldCheck size={19} />
                <h3 className="text-base font-semibold text-white">Tus permisos, ni uno más</h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                El conector se emite desde tu propia API key y llega solo a la organización en la
                que lo generaste. El asistente hereda tu rol — no puede hacer nada que tú no
                pudieras hacer en la aplicación.
              </p>
            </div>
            <div className="glass-card rounded-xl p-5">
              <div className="flex items-center gap-2.5 mb-2 text-[#93c5fd]">
                <Lock size={19} />
                <h3 className="text-base font-semibold text-white">Trata la URL como una credencial</h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Quien tenga la URL del conector puede llegar a tus Flows y Buckets. Las URLs tienen
                tiempo de vida limitado, y renovar una invalida la anterior de inmediato.
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Detalle completo en la{" "}
            <Link href="/docs/mcp-connector" className="text-[#3b82f6] hover:underline">
              documentación del conector
            </Link>{" "}
            y la{" "}
            <Link href="/docs/user-roles" className="text-[#3b82f6] hover:underline">
              referencia de roles de usuario
            </Link>
            . El endpoint del servidor es <code className="text-gray-300">{MCP_URL}</code>.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Cómo conectarlo</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Genera una URL de conector en la página de Integraciones de Tavnit y pégala en
            claude.ai bajo Settings &rarr; Connectors, o añádela a Cursor como servidor MCP remoto.
            Toma un par de minutos y no requiere código.
          </p>
          <Link
            href="/docs/mcp-connector"
            className="inline-flex items-center gap-2 text-[#3b82f6] font-semibold hover:underline"
          >
            Leer la guía paso a paso (en inglés) <ArrowRight size={16} />
          </Link>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Preguntas frecuentes</h2>
          <dl className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="glass-card rounded-xl p-5">
                <dt className="text-base font-semibold text-white mb-2">{faq.q}</dt>
                <dd className="text-sm text-gray-400 leading-relaxed">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="glass-card rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Apunta tu asistente a documentos reales
          </h2>
          <p className="text-gray-400 mb-6 max-w-[520px] mx-auto leading-relaxed">
            Crea un Flow, genera una URL de conector y empieza a preguntar. Créditos gratis para
            empezar, sin tarjeta.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href={APP_URL}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white font-semibold shadow-md hover:-translate-y-0.5 transition-all"
            >
              Probar gratis <ArrowRight size={17} />
            </Link>
            <Link
              href={stripeOn ? "/pricing" : "/es/agendar"}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-lg border border-white/15 text-gray-300 font-semibold hover:bg-white/5 hover:text-white transition-all"
            >
              {stripeOn ? "Ver precios" : "Agendar una demostración"}
            </Link>
          </div>
        </div>
      </div>
    </MarketingPage>
  );
}
