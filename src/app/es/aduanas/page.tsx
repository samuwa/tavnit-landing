import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, TriangleAlert } from "lucide-react";
import MarketingPage from "@/components/MarketingPage";
import { buildLocalizedPageSchema } from "@/lib/schema";
import { APP_URL, SITE_URL } from "@/lib/site";

/**
 * Spanish customs page — the Spanish twin of /use-cases/customs-trade.
 *
 * This is the one page where the Spanish version is not a translation but the
 * primary: the HS classifier is built over Panama's Arancel Nacional, and the
 * buyers — corredores de aduana, agencias, importadores — search in Spanish.
 * Nobody else is writing about automating classification against the VII
 * Enmienda; this page is meant to own that query space.
 *
 * Facts about the classifier (VII Enmienda, HS 2022, 9,671 national lines,
 * DAI/ITBMS/ISC, legal chapter notes, GRI) come from
 * .agents/product-marketing.md — keep them in step with it.
 */

const TITLE = "Automatización aduanera con clasificación arancelaria para Panamá";
const DESCRIPTION =
  "Extrae facturas comerciales, listas de empaque y BL, y clasifica la mercancía en el Arancel Nacional de Panamá (VII Enmienda, SA 2022) con DAI, ITBMS e ISC — con revisión del corredor antes de declarar.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/es/aduanas",
    // Reciprocal with /use-cases/customs-trade — see generateMetadata there.
    languages: {
      en: `${SITE_URL}/use-cases/customs-trade`,
      es: `${SITE_URL}/es/aduanas`,
      "x-default": `${SITE_URL}/use-cases/customs-trade`,
    },
  },
  openGraph: {
    type: "article",
    url: "/es/aduanas",
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Tavnit",
    locale: "es_PA",
    alternateLocale: ["en_US"],
    images: ["/opengraph-image"],
  },
};

const PROBLEM = [
  "Un solo embarque genera una pila de documentos que repiten los mismos datos en formatos distintos — factura comercial, lista de empaque, conocimiento de embarque, certificado de origen — y la declaración exige que estén conciliados y correctos. El trabajo es transcripción más clasificación, contra reloj, donde un error es un embarque retenido o una multa.",
  "La clasificación es la parte especializada. Decidir la fracción arancelaria a partir de una descripción es un juicio técnico que la mayoría de las herramientas de extracción ni siquiera intenta: se queda como paso manual después de que la automatización termina. Y la descripción en la factura del proveedor suele ser el insumo más débil de todo el proceso.",
];

const FIELDS = [
  { name: "Embarcador y consignatario", note: "Nombre legal completo y dirección; son los que van a la declaración." },
  { name: "Descripción de la mercancía por línea", note: "El texto del que se deriva la clasificación. Conviene extraerlo textual, sin resumir." },
  { name: "Fracción arancelaria", note: "Clasificada por un Cleaner durante el procesamiento, contra el Arancel Nacional vigente, no buscada a mano después." },
  { name: "DAI, ITBMS e ISC aplicables", note: "Vienen con la línea arancelaria nacional. Una clasificación a seis dígitos no está terminada: falta la línea que determina lo que se paga." },
  { name: "Cantidad, peso neto y bruto", note: "Los pesos están en la lista de empaque y los valores en la factura; hay que conciliar ambos." },
  { name: "País de origen", note: "Determina la tasa y el trato preferencial. Con frecuencia es por línea, no por embarque." },
  { name: "Incoterm y valor declarado", note: "Define qué es gravable y quién responde por qué." },
  { name: "Número de contenedor y de BL", note: "Las llaves que permiten volver a unir todo el juego de documentos con un solo embarque." },
];

const GOTCHAS = [
  {
    title: "La clasificación es lo difícil, y aquí está integrada",
    body: "Tavnit incluye un Cleaner de clasificación arancelaria construido sobre el Arancel Nacional de Importación de Panamá — VII Enmienda, Sistema Armonizado 2022 — con sus 9,671 líneas arancelarias nacionales y las tasas de DAI, ITBMS e ISC de cada una. Aplica las notas legales de sección y capítulo y las Reglas Generales de Interpretación, y devuelve la fracción con su razonamiento, no una adivinanza a seis dígitos.",
  },
  {
    title: "Un embarque, varios documentos, una sola verdad",
    body: "La factura comercial trae los valores, la lista de empaque los pesos, el BL el contenedor. Una Collection identifica cada tipo de documento y lo envía a su propio Flow; un Bucket compartido, con el número de embarque como llave, vuelve a unirlos en un solo registro.",
  },
  {
    title: "Aquí los errores son multas, no correcciones",
    body: "Una fracción o un valor mal declarado es un problema aduanero, no contable. Es un caso donde la revisión en cada declaración está justificada: el corredor ve la clasificación propuesta con su razonamiento, la confirma o la corrige, y la bitácora de auditoría inalterable registra quién aprobó qué. Cuando la aduana pregunta por una fracción dos años después, ese razonamiento es la defensa.",
  },
  {
    title: "El código del proveedor no es tu código",
    body: "El proveedor clasificó bajo el arancel de su país, quizás para control de exportaciones y quizás con una enmienda anterior. Sirve como pista, no como respuesta. La responsabilidad de la fracción en la declaración de importación es del importador y del corredor.",
  },
];

const PIPELINE = [
  { label: "Correo electrónico", href: "/docs/email-integration", why: "El juego de documentos llega por correo, como siempre. Lo reenvías a una dirección de Tavnit y el proceso arranca solo." },
  { label: "Splitters", href: "/docs/splitters", why: "La documentación del embarque suele venir en un solo PDF combinado. El Splitter la separa antes de extraer." },
  { label: "Collections", href: "/docs/collections", why: "Identifica factura, lista de empaque y BL y envía cada uno al Flow correcto." },
  { label: "Cleaners", href: "/docs/cleaners", why: "Clasifica la mercancía en el Arancel Nacional, convierte monedas y estandariza pesos y unidades." },
  { label: "Revisión humana", href: "/docs/human-in-the-loop", why: "El corredor revisa cada clasificación antes de declarar, con registro de quién aprobó qué." },
  { label: "Llenado de formularios", href: "/use-cases/form-filling", why: "Los datos extraídos y aprobados pre-llenan el formulario de declaración en lugar de re-tipearse." },
];

const FAQS = [
  {
    q: "¿Realmente asigna la fracción arancelaria?",
    a: "Sí. Un Cleaner de clasificación arancelaria clasifica cada línea de mercancía a partir de la descripción extraída, durante el mismo procesamiento, contra el Arancel Nacional de Panamá vigente (VII Enmienda, SA 2022). Devuelve la línea arancelaria nacional con DAI, ITBMS e ISC y el razonamiento — qué regla y qué nota legal decidieron el caso. La declaración sigue siendo responsabilidad del corredor, por eso recomendamos revisión antes de presentar.",
  },
  {
    q: "¿Qué pasa cuando la descripción en la factura es vaga?",
    a: "Es el caso más común de error en clasificación. El Cleaner usa toda la información disponible en la factura y la lista de empaque — material, función, composición, marca y modelo — y cuando la confianza es baja, marca la línea para que el corredor la resuelva en lugar de adivinar.",
  },
  {
    q: "¿Procesa el juego completo de documentos del embarque?",
    a: "Sí. Una Collection envía factura comercial, lista de empaque y conocimiento de embarque a su propio Flow, y los resultados se reúnen en un solo registro usando el número de embarque como llave.",
  },
  {
    q: "¿Y si los documentos llegan en un solo PDF?",
    a: "Un Splitter separa el archivo combinado en sus documentos individuales antes de la extracción, para que cada uno pase por el Flow diseñado para él.",
  },
  {
    q: "¿Funciona para otros países además de Panamá?",
    a: "La extracción de documentos de embarque funciona para cualquier país. El clasificador arancelario está construido sobre el Arancel Nacional de Panamá; para otras jurisdicciones, la clasificación a seis dígitos del Sistema Armonizado es común y la extensión nacional se puede configurar. Cuéntanos tu caso en la demostración.",
  },
  {
    q: "¿Cómo trabajan los corredores de aduana con Tavnit?",
    a: "Normalmente reenvían el correo del cliente con la documentación a una dirección de Tavnit. Minutos después tienen el juego de documentos extraído, cada línea clasificada con su razonamiento, y una cola de revisión con solo lo que requiere criterio. Lo aprobado pre-llena la declaración o sale por API hacia su sistema.",
  },
];

export default function SpanishCustomsPage() {
  return (
    <MarketingPage>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildLocalizedPageSchema({
              path: "/es/aduanas",
              name: "Aduanas y clasificación arancelaria",
              headline: TITLE,
              description: DESCRIPTION,
              inLanguage: "es-PA",
              breadcrumb: [
                { name: "Inicio", url: SITE_URL },
                { name: "Español", url: `${SITE_URL}/es` },
                { name: "Aduanas", url: `${SITE_URL}/es/aduanas` },
              ],
              faqs: FAQS,
            }),
          ),
        }}
      />

      <div lang="es" className="max-w-[860px] mx-auto px-4 sm:px-6">
        <nav aria-label="Ruta de navegación" className="mb-6 text-sm text-gray-500 flex flex-wrap items-center gap-x-2">
          <Link href="/es" className="hover:text-gray-300 transition-colors">Español</Link>
          <span aria-hidden="true">/</span>
          <span className="text-gray-400">Aduanas</span>
          <span className="ml-auto">
            <Link href="/use-cases/customs-trade" className="hover:text-gray-300 transition-colors">
              Read in English
            </Link>
          </span>
        </nav>

        <span className="inline-block text-xs font-semibold text-[#3b82f6] bg-[#3b82f6]/10 px-2.5 py-1 rounded-md mb-4">
          Logística y comercio exterior · Panamá
        </span>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-5 tracking-tight leading-tight">
          Automatización aduanera con clasificación arancelaria para Panamá
        </h1>

        {/* Respuesta autocontenida — el pasaje con más probabilidad de ser citado. */}
        <p className="text-lg text-gray-300 leading-relaxed mb-10">
          Tavnit lee la documentación del embarque — factura comercial, lista de empaque, conocimiento
          de embarque, certificado de origen — y devuelve embarcador, consignatario, descripciones,
          pesos y valores como campos tipificados. Un Cleaner clasifica cada línea de mercancía en el
          Arancel Nacional de Panamá (VII Enmienda, SA 2022) durante el mismo procesamiento, con DAI,
          ITBMS e ISC y el razonamiento de la clasificación, para que el corredor revise en lugar de
          investigar.
        </p>

        <div className="flex flex-wrap gap-3 mb-16">
          <Link
            href="/schedule"
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

        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Por qué duele</h2>
          <div className="space-y-4 text-gray-400 leading-relaxed">
            {PROBLEM.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">Qué se extrae</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 pr-4 font-semibold text-gray-300 whitespace-nowrap">Campo</th>
                  <th className="text-left py-3 font-semibold text-gray-300">Por qué requiere cuidado</th>
                </tr>
              </thead>
              <tbody className="text-gray-400">
                {FIELDS.map((f) => (
                  <tr key={f.name} className="border-b border-white/5 align-top">
                    <td className="py-3 pr-4 font-medium text-gray-200">{f.name}</td>
                    <td className="py-3 leading-relaxed">{f.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">Lo que hace difícil la aduana</h2>
          <div className="space-y-4">
            {GOTCHAS.map((g) => (
              <div key={g.title} className="glass-card rounded-xl p-5">
                <div className="flex items-center gap-2.5 mb-2">
                  <TriangleAlert size={18} className="text-amber-400 flex-shrink-0" />
                  <h3 className="text-base font-semibold text-white">{g.title}</h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">{g.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">Cómo lo resuelve el proceso</h2>
          <ul className="space-y-3">
            {PIPELINE.map((step) => (
              <li key={step.label} className="flex gap-3 leading-relaxed">
                <Check size={18} className="text-emerald-400 flex-shrink-0 mt-1" />
                <span className="text-gray-400">
                  <Link href={step.href} className="text-[#3b82f6] font-medium hover:underline">
                    {step.label}
                  </Link>{" "}
                  — {step.why}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-500 mt-4">La documentación técnica enlazada está en inglés.</p>
        </section>

        <section className="mb-16">
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
          <h2 className="text-2xl font-bold text-white mb-3">Pruébalo con un embarque real</h2>
          <p className="text-gray-400 mb-6 max-w-[540px] mx-auto leading-relaxed">
            Trae la factura comercial y la lista de empaque de un embarque reciente. En la demostración
            ves la extracción y la clasificación arancelaria en vivo, con tus propios documentos.
          </p>
          <Link
            href="/schedule"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white font-semibold shadow-md hover:-translate-y-0.5 transition-all"
          >
            Agendar una demostración <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </MarketingPage>
  );
}
