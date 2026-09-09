import type { Metadata } from "next";
import Link from "next/link";
import LegalDocument, { LegalSection } from "@/components/LegalDocument";
import { buildLocalizedPageSchema } from "@/lib/schema";
import { SITE_URL, SUPPORT_EMAIL } from "@/lib/site";
import { EN_LOCALE_OG, ES_LOCALE_OG, languageAlternates } from "@/lib/locale";

/**
 * Spanish translation of /privacy. Same sections, same facts, same date;
 * the English text governs if they disagree (stated in the intro). When
 * /privacy changes, change this file in the same commit.
 */

const DESCRIPTION =
  "Cómo maneja Tavnit los documentos y datos que envías a la plataforma: qué recopilamos, cómo se controla el acceso y qué opciones tienes.";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: DESCRIPTION,
  alternates: {
    canonical: "/es/privacidad",
    languages: languageAlternates("/privacy", "/es/privacidad"),
  },
  openGraph: {
    type: "website",
    url: "/es/privacidad",
    title: "Política de privacidad | Tavnit",
    description: DESCRIPTION,
    siteName: "Tavnit",
    locale: ES_LOCALE_OG,
    alternateLocale: [EN_LOCALE_OG],
    images: ["/opengraph-image"],
  },
};

const Mail = () => (
  <Link href={`mailto:${SUPPORT_EMAIL}`} className="text-[#3b82f6] hover:underline">
    {SUPPORT_EMAIL}
  </Link>
);

export default function SpanishPrivacyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildLocalizedPageSchema({
              path: "/es/privacidad",
              name: "Política de privacidad",
              headline: "Política de privacidad",
              description: DESCRIPTION,
              inLanguage: "es-PA",
              breadcrumb: [
                { name: "Inicio", url: `${SITE_URL}/es` },
                { name: "Política de privacidad", url: `${SITE_URL}/es/privacidad` },
              ],
            }),
          ),
        }}
      />
      <LegalDocument
        locale="es"
        alternatePath="/privacy"
        title="Política de privacidad"
        lastUpdated="2026-08-26"
        intro={
          <>
            Esta política explica qué datos recopila Tavnit, cómo se usan y qué controles tienes
            sobre ellos. Cubre el sitio de marketing en tavnit.io, la demostración interactiva en
            demo.tavnit.io y la aplicación de Tavnit. Para cualquier cosa que no se responda aquí,
            escribe a <Mail />. Esta traducción se ofrece para tu comodidad; si hay alguna
            discrepancia, prevalece la{" "}
            <Link href="/privacy" className="text-[#3b82f6] hover:underline" hrefLang="en" lang="en">
              versión en inglés
            </Link>
            .
          </>
        }
      >
        <LegalSection heading="Qué hace Tavnit con tus documentos">
          <p>
            Tavnit es un proceso documental. Defines un Flow que describe los campos que quieres,
            le envías un documento y recibes datos estructurados de vuelta. En el camino, la
            plataforma puede limpiar y enriquecer los resultados, separar PDFs combinados, enviar
            cada documento al Flow correcto, detenerse para revisión humana, guardar resultados y
            entregar datos a un agente de navegador con IA para que actúe sobre ellos.
          </p>
          <p>
            Cada uno de esos pasos opera sobre el contenido de los documentos que envías. Ese
            contenido se procesa para producir el resultado que pediste y para operar las
            funciones que tu organización configuró. Nada más.
          </p>
        </LegalSection>

        <LegalSection heading="Qué recopilamos">
          <p>
            <strong className="text-gray-200">Información de cuenta.</strong> Tu nombre, correo
            electrónico, organización y las credenciales con las que inicias sesión.
          </p>
          <p>
            <strong className="text-gray-200">Contenido de documentos.</strong> Los archivos que
            subes, envías por correo a la dirección de un Flow o mandas por la API, junto con los
            datos estructurados extraídos de ellos. Documentos como facturas, contratos, recibos,
            hojas de vida y documentación aduanera contienen habitualmente datos personales, así
            que tratamos todo el contenido de documentos como sensible por defecto.
          </p>
          <p>
            <strong className="text-gray-200">Registros de procesamiento.</strong> Runs, consumo
            de créditos, decisiones de revisión y la bitácora de auditoría de solo anexar que
            produce la revisión humana, que registra quién vio, editó, aprobó o rechazó cada Run.
          </p>
          <p>
            <strong className="text-gray-200">Datos técnicos.</strong> Los datos de registro
            estándar que se generan al usar el sitio o la aplicación, los reportes de error de la
            aplicación (ver abajo) y, solo si aceptas el aviso de cookies, analítica de uso en el
            sitio de marketing y la demostración.
          </p>
        </LegalSection>

        <LegalSection heading="Procesamiento por proveedores externos">
          <p>
            La extracción, el reconocimiento óptico de caracteres, el enriquecimiento y la
            automatización de navegador se realizan con la ayuda de proveedores de servicios
            externos. Esto significa que el contenido de los documentos se transmite a esos
            proveedores para ser procesado, bajo términos contractuales que los limitan a
            procesarlo en nuestro nombre.
          </p>
          <p>
            No publicamos aquí la identidad de cada proveedor, porque esa lista cambia a medida
            que la plataforma evoluciona. Si necesitas revisar nuestros subencargados actuales,
            por ejemplo para completar una evaluación de proveedores o una evaluación de impacto
            en protección de datos, solicita la lista a <Mail /> y te la enviaremos.
          </p>
          <p>
            Si procesas documentos regulados, confidenciales o de alto riesgo, contáctanos antes
            de enviarlos para que podamos confirmar por escrito si nuestros acuerdos actuales
            cumplen tus requisitos.
          </p>
        </LegalSection>

        <LegalSection heading="Cómo usamos tus datos">
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Ejecutar los flujos de extracción, limpieza, separación, enrutamiento, revisión y agentes que configures</li>
            <li>Guardar resultados en Buckets y entregarlos por API, webhook o correo según indiques</li>
            <li>Operar la revisión humana y mantener su bitácora de auditoría</li>
            <li>Medir el consumo de créditos y procesar la facturación</li>
            <li>Dar soporte, y detectar y prevenir abusos o incidentes de seguridad</li>
          </ul>
          <p>
            No vendemos tus datos. No usamos el contenido de tus documentos para publicidad.
          </p>
        </LegalSection>

        <LegalSection heading="Tus datos, tu control">
          <p>
            Los documentos que envías y los datos extraídos de ellos son tuyos. Nos otorgas
            únicamente la licencia necesaria para procesar, guardar y entregar ese contenido con el
            fin de operar el servicio para ti.
          </p>
          <p>
            Cuando tus documentos contienen datos personales de otras personas, tú sigues siendo
            responsable de esos datos y de tener una base legal para procesarlos. En ese esquema,
            tú eres el responsable del tratamiento y nosotros actuamos según tus instrucciones.
          </p>
          <p>
            Los resultados extraídos y los datos de los Buckets siguen disponibles para tu
            organización hasta que los borres o cierres tu cuenta. Las entradas de la bitácora de
            auditoría son de solo anexar por diseño, así que no se pueden editar después. Eso es
            lo que las hace útiles como registro.
          </p>
        </LegalSection>

        <LegalSection heading="A dónde van tus datos cuando tú lo indicas">
          <p>
            Varias funciones de Tavnit envían datos hacia afuera por instrucción tuya. Un webhook
            publica resultados en un endpoint que especificas. Una salida por correo los manda a
            una dirección que eliges. Un agente de navegador con IA visita una URL que
            proporcionas e interactúa con ese sitio. El conector MCP permite que un asistente de IA
            que hayas autorizado consulte tus Flows y Buckets.
          </p>
          <p>
            En cada caso, tú eliges el destino, y ese destino está fuera de nuestro control.
            Revisa esas configuraciones antes de enviar datos sensibles por ellas.
          </p>
        </LegalSection>

        <LegalSection heading="Control de acceso y seguridad">
          <p>
            Acceder a la aplicación requiere autenticación. El acceso por API requiere una clave
            secreta, y el conector MCP usa una URL de conector generada. Ambas son credenciales:
            una URL de conector da acceso a los datos de tu organización, y renovarla invalida de
            inmediato la URL anterior, de modo que cualquier cliente que aún la use deja de
            funcionar. Rota cualquiera de las dos en cualquier momento si crees que se ha
            expuesto.
          </p>
          <p>
            Dentro de una organización, los roles Owner, Admin y Member determinan lo que cada
            persona puede hacer. Los Buckets añaden una segunda capa: cada Bucket es visible para
            toda la organización o privado para su dueño y los usuarios a los que se les otorgó
            acceso explícitamente, y a cada usuario se le puede dar acceso Viewer o Editor a un
            Bucket específico, independientemente de su rol en la organización.
          </p>
          <p>
            Estos controles solo funcionan si los usas. Revisa los roles y el acceso a los
            Buckets cuando alguien entre o salga de tu equipo.
          </p>
        </LegalSection>

        <LegalSection heading="Tus derechos">
          <p>
            Según dónde vivas, puedes tener derecho a acceder, corregir, exportar o eliminar tus
            datos personales, a oponerte o restringir cómo se procesan, y a presentar una queja
            ante una autoridad de protección de datos. No vendemos datos personales.
          </p>
          <p>
            Para ejercer cualquiera de estos derechos, escribe a <Mail />. Si tu solicitud se
            refiere a datos personales dentro de un documento que otra organización envió a
            través de Tavnit, te dirigiremos a esa organización, porque es ella quien controla
            esos datos y no nosotros.
          </p>
        </LegalSection>

        <LegalSection heading="Cookies y analítica">
          <p>
            <strong className="text-gray-200">Sitio de marketing y demostración</strong>{" "}
            (tavnit.io, demo.tavnit.io). Usamos Google Analytics 4 para saber qué páginas, casos
            de uso y pasos de la demostración resultan útiles. Solo se activa después de que
            aceptas el aviso de cookies. Si lo rechazas, o no respondes, Google Analytics no
            coloca cookies ni guarda ningún identificador; solo recibimos señales agregadas y sin
            cookies que no pueden vincularse contigo. Cuando aceptas, Google coloca cookies de
            primera parte (<code>_ga</code>, <code>_ga_*</code>, hasta 2 años) con un
            identificador aleatorio, y recibimos las páginas que ves, los botones que pulsas, los
            pasos de la demostración que completas, tu ubicación aproximada derivada de una
            dirección IP truncada, y el tipo de dispositivo y navegador. Google procesa esto en
            nuestro nombre como proveedor de servicios bajo sus términos de tratamiento de datos.
            Hemos desactivado Google Signals y las funciones de publicidad, no compartimos los
            datos con Google para sus propios fines, y conservamos los datos a nivel de evento
            durante 14 meses.
          </p>
          <p>
            Puedes cambiar de opinión en cualquier momento desde{" "}
            <em>Preferencias de cookies</em> en el pie de página de tavnit.io o de la
            demostración. También puedes bloquear Google Analytics en todas partes con el{" "}
            <Link
              href="https://tools.google.com/dlpage/gaoptout"
              className="text-[#3b82f6] hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              complemento de exclusión de Google
            </Link>
            .
          </p>
          <p>
            <strong className="text-gray-200">La aplicación</strong> (app.tavnit.io). La
            aplicación usa únicamente las cookies y el almacenamiento local necesarios para
            iniciar tu sesión, mantenerla y recordar tu organización actual. No usa cookies de
            analítica. Sí envía reportes de error a Sentry, un servicio de monitoreo de errores,
            cuando algo falla: contienen los detalles técnicos del error junto con tus
            identificadores de usuario y organización para que podamos reproducirlo y
            corregirlo. Nunca contienen tu clave de API ni el contenido de tus documentos.
          </p>
        </LegalSection>

        <LegalSection heading="Cambios a esta política">
          <p>
            Actualizaremos esta política a medida que la plataforma cambie y revisaremos la fecha
            de arriba. Cuando un cambio afecte de forma sustancial cómo se manejan tus datos, se
            lo comunicaremos a los titulares de cuenta en lugar de confiar en que lo noten.
          </p>
        </LegalSection>

        <LegalSection heading="Contacto">
          <p>
            Preguntas sobre esta política, tus datos o nuestros subencargados actuales:{" "}
            <Mail />. Consulta también nuestros{" "}
            <Link href="/es/terminos" className="text-[#3b82f6] hover:underline">
              Términos de servicio
            </Link>
            .
          </p>
        </LegalSection>
      </LegalDocument>
    </>
  );
}
