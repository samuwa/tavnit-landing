import type { Metadata } from "next";
import Link from "next/link";
import LegalDocument, { LegalSection } from "@/components/LegalDocument";
import { buildLocalizedPageSchema } from "@/lib/schema";
import {
  CREDIT_UNIT,
  EXTRA_CREDIT_MINIMUM,
  EXTRA_CREDIT_USD,
  PRICING,
  SITE_URL,
  SUPPORT_EMAIL,
} from "@/lib/site";
import { EN_LOCALE_OG, ES_LOCALE_OG, languageAlternates } from "@/lib/locale";
import { isStripeEnabled } from "@/lib/platform";

/**
 * Spanish translation of /terms. Same sections, same facts, same date;
 * the English text governs if they disagree (stated in the intro). When
 * /terms changes, change this file in the same commit.
 */

const DESCRIPTION =
  "Los términos que rigen el uso de Tavnit: responsabilidades sobre cuentas y credenciales, uso aceptable, facturación por créditos, propiedad de los datos y límites de la salida de IA.";

export const metadata: Metadata = {
  title: "Términos de servicio",
  description: DESCRIPTION,
  alternates: {
    canonical: "/es/terminos",
    languages: languageAlternates("/terms", "/es/terminos"),
  },
  openGraph: {
    type: "website",
    url: "/es/terminos",
    title: "Términos de servicio | Tavnit",
    description: DESCRIPTION,
    siteName: "Tavnit",
    locale: ES_LOCALE_OG,
    alternateLocale: [EN_LOCALE_OG],
    images: ["/opengraph-image"],
  },
};

const first = PRICING[0];
const last = PRICING[PRICING.length - 1];

const Mail = () => (
  <Link href={`mailto:${SUPPORT_EMAIL}`} className="text-[#3b82f6] hover:underline">
    {SUPPORT_EMAIL}
  </Link>
);

export default async function SpanishTermsPage() {
  // /pricing 307s home while Stripe self-serve is off; the English page links
  // it unconditionally, which is a pre-existing gap. Here the link is gated.
  const stripeOn = await isStripeEnabled();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildLocalizedPageSchema({
              path: "/es/terminos",
              name: "Términos de servicio",
              headline: "Términos de servicio",
              description: DESCRIPTION,
              inLanguage: "es-PA",
              breadcrumb: [
                { name: "Inicio", url: `${SITE_URL}/es` },
                { name: "Términos de servicio", url: `${SITE_URL}/es/terminos` },
              ],
            }),
          ),
        }}
      />
      <LegalDocument
        locale="es"
        alternatePath="/terms"
        title="Términos de servicio"
        lastUpdated="2026-08-03"
        intro={
          <>
            Estos términos rigen tu uso de Tavnit. Al crear una cuenta o usar el servicio, los
            aceptas. Si los aceptas en nombre de una organización, confirmas que tienes autoridad
            para obligar a esa organización. Esta traducción se ofrece para tu comodidad; si hay
            alguna discrepancia, prevalece la{" "}
            <Link href="/terms" className="text-[#3b82f6] hover:underline" hrefLang="en" lang="en">
              versión en inglés
            </Link>
            .
          </>
        }
      >
        <LegalSection heading="Qué hace el servicio">
          <p>
            Tavnit convierte documentos en datos estructurados. Defines un Flow que describe los
            campos que quieres, envías documentos por carga, correo o API, y recibes resultados
            tipificados. La plataforma también ofrece Collections para enviar cada documento al
            Flow correcto, Cleaners para transformar y enriquecer resultados, Splitters para
            separar PDFs combinados, Buckets para almacenamiento estructurado, revisión humana con
            bitácora de auditoría de solo anexar, agentes de navegador con IA y un conector MCP
            para asistentes de IA.
          </p>
          <p>
            Algunas capacidades, incluidos los agentes de navegador con IA y el conector MCP, se
            habilitan por organización y pueden no estar disponibles en todas las cuentas.
          </p>
        </LegalSection>

        <LegalSection heading="Cuentas y credenciales">
          <p>
            Eres responsable de la exactitud de la información de tu cuenta y de toda la actividad
            que ocurra bajo ella. Esto incluye expresamente las claves de API y las URLs del
            conector MCP, que dan acceso a los datos de tu organización y deben tratarse como
            secretos. Cualquiera de las dos puede rotarse en cualquier momento; renovar una URL de
            conector invalida de inmediato la anterior.
          </p>
          <p>
            Los Owners y Admins de la organización controlan los roles y el acceso por Bucket.
            Actuamos según los permisos que tu organización configura, así que mantener esas
            asignaciones al día es tu responsabilidad.
          </p>
        </LegalSection>

        <LegalSection heading="Tu contenido">
          <p>
            <strong className="text-gray-200">
              Los documentos que envías y los datos extraídos de ellos son tuyos.
            </strong>{" "}
            No reclamamos ninguna propiedad sobre tu contenido y nos otorgamos únicamente la
            licencia necesaria para procesarlo, guardarlo y entregarlo con el fin de operar el
            servicio para ti.
          </p>
          <p>
            Eres responsable de tener derecho a enviarnos los documentos que envías y de cualquier
            dato personal que contengan. Cómo se maneja ese contenido se describe en nuestra{" "}
            <Link href="/es/privacidad" className="text-[#3b82f6] hover:underline">
              Política de privacidad
            </Link>
            .
          </p>
        </LegalSection>

        <LegalSection heading="Uso aceptable">
          <p>No puedes usar Tavnit para:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Procesar documentos que no tienes derecho legal a procesar</li>
            <li>Infringir la ley, la propiedad intelectual o la privacidad de cualquier persona</li>
            <li>
              Dirigir agentes de navegador con IA a sitios a los que no estás autorizado a
              acceder, o de una forma que incumpla los términos o límites de uso de esos sitios
            </li>
            <li>Intentar eludir la medición de créditos, los controles de acceso o los límites de uso</li>
            <li>Revender el servicio sin un acuerdo por escrito</li>
          </ul>
          <p>
            Los Agents actúan según las misiones que les das y contra las URLs que proporcionas.
            Eres responsable de ambas.
          </p>
        </LegalSection>

        <LegalSection heading="Créditos y facturación">
          <p>
            Los planes se facturan mensualmente en USD y se cotizan por volumen de procesamiento,
            no por usuario: todos los planes incluyen Flows ilimitados y miembros de equipo
            ilimitados. {CREDIT_UNIT} de extracción y limpieza, así que una factura de tres páginas
            cuesta tres créditos.
          </p>
          <p>
            Los planes van actualmente desde ${first.monthlyUsd}/mes por{" "}
            {first.credits.toLocaleString("en-US")} créditos hasta ${last.monthlyUsd}/mes por{" "}
            {last.credits.toLocaleString("en-US")} créditos. Se pueden comprar créditos
            adicionales a ${EXTRA_CREDIT_USD.toFixed(2)} cada uno, con un mínimo de{" "}
            {EXTRA_CREDIT_MINIMUM} créditos, además de cualquier plan.{" "}
            {stripeOn ? (
              <>
                Los planes vigentes están en la{" "}
                <Link href="/pricing" className="text-[#3b82f6] hover:underline">
                  página de precios
                </Link>
                .
              </>
            ) : (
              <>
                Los planes se cotizan por organización;{" "}
                <Link href="/es/agendar" className="text-[#3b82f6] hover:underline">
                  agenda una demostración
                </Link>{" "}
                para ver el tuyo.
              </>
            )}
          </p>
          <p>
            Las ejecuciones de Agents se facturan por tiempo de sesión y no por página, porque un
            Agent trabaja en un sitio web en vivo en lugar de leer un documento fijo.
          </p>
        </LegalSection>

        <LegalSection heading="Exactitud de la salida de IA">
          <p>
            La extracción la realiza una IA y no se garantiza que sea correcta. La salida puede
            contener errores, y el riesgo es mayor con escaneos de mala calidad, escritura a mano,
            diseños poco habituales y tipos de documento desconocidos. Eres responsable de validar
            los resultados antes de basarte en ellos para decisiones financieras, legales, de
            cumplimiento u otras de consecuencia.
          </p>
          <p>
            La revisión humana existe precisamente porque la extracción automática necesita una
            comprobación. Recomendamos activarla, ya sea en cada Run o de forma condicional cuando
            una regla de un Cleaner marque un valor, en cualquier flujo donde un error salga caro.
          </p>
        </LegalSection>

        <LegalSection heading="Disponibilidad">
          <p>
            Procuramos mantener el servicio disponible y con buen rendimiento, pero no
            garantizamos operación ininterrumpida. El mantenimiento, los incidentes y las caídas
            de proveedores externos pueden interrumpir el procesamiento. Si tu organización
            requiere un nivel de servicio contractual, contáctanos antes de depender de la
            plataforma para trabajo con tiempos críticos.
          </p>
        </LegalSection>

        <LegalSection heading="Exenciones de responsabilidad y limitación">
          <p>
            En la máxima medida permitida por la ley, el servicio se ofrece &ldquo;tal cual&rdquo;
            y sin garantías de ningún tipo, expresas o implícitas, incluidas las de
            comerciabilidad, idoneidad para un fin determinado y no infracción.
          </p>
          <p>
            En la máxima medida permitida por la ley, no somos responsables de daños indirectos,
            incidentales, especiales o consecuentes, ni de lucro cesante o pérdida de datos
            derivados de tu uso del servicio.
          </p>
        </LegalSection>

        <LegalSection heading="Terminación">
          <p>
            Puedes dejar de usar el servicio o cerrar tu cuenta en cualquier momento. Podemos
            suspender o cancelar una cuenta que incumpla estos términos o cuando la ley nos lo
            exija. Exporta cualquier dato que quieras conservar antes de cerrar tu cuenta.
          </p>
        </LegalSection>

        <LegalSection heading="Cambios a estos términos">
          <p>
            Podemos actualizar estos términos a medida que el servicio evolucione y revisaremos la
            fecha de arriba. El uso continuado después de un cambio constituye aceptación, y
            notificaremos a los titulares de cuenta los cambios sustanciales.
          </p>
        </LegalSection>

        <LegalSection heading="Contacto">
          <p>
            Preguntas sobre estos términos: <Mail />.
          </p>
        </LegalSection>
      </LegalDocument>
    </>
  );
}
