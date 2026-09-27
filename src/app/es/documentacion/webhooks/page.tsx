import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  AlertTriangle,
  Braces,
  CheckCircle2,
  Info,
  LifeBuoy,
  RefreshCw,
  Send,
  Settings2,
  Zap,
} from "lucide-react";
import {
  BulletList,
  CodeBlock,
  DataTable,
  DocCard,
  DocLink,
  InfoBox,
  InlineCode,
  Lead,
  NumberedList,
  Related,
  Screenshot,
  WarningBox,
} from "@/components/docs/ui";
import {
  WEBHOOK_PROVENANCE_KEYS,
  WEBHOOK_RECEIVER_JS,
  WEBHOOK_RECEIVER_PYTHON,
  WEBHOOK_RUN_PAYLOAD,
} from "@/components/docs/code-samples";

export const metadata = docMetadata("webhooks", "es");

/** Refleja los pasos numerados visibles en "Configura un webhook". */
const HOW_TO = {
  name: "Envía los resultados de extracción de Tavnit a un webhook",
  description:
    "Agrega un endpoint HTTPS a un Flow de Tavnit para que cada Run completado envíe automáticamente por POST sus filas extraídas a tu sistema.",
  steps: [
    {
      name: "Consigue la URL de un endpoint",
      text: "Crea un disparador de webhook en Make, Zapier, n8n o Power Automate, o expón un endpoint HTTPS en tu propio servidor. La URL debe empezar con https://.",
    },
    {
      name: "Abre el Flow",
      text: "Ve a \"Flows\" en la app de Tavnit y abre el Flow cuyos resultados quieres recibir.",
    },
    {
      name: "Pega la URL en el panel \"Webhook\"",
      text: "Busca la sección \"Webhook\" en la página de detalle del Flow, pega la URL del endpoint y guarda.",
    },
    {
      name: "Procesa un documento de prueba",
      text: "Procesa un documento de prueba y verifica que tu endpoint recibió un POST. El registro del Run indica si la entrega tuvo éxito y qué código de estado recibió.",
    },
  ],
};

export default function Page() {
  return (
    <>
      <DocsPageSchema
        slug="webhooks"
        locale="es"
        howTo={HOW_TO}
        primaryImage={{
          url: "/assets/tour2-flow-details-b.jpg",
          caption:
            "La página de detalle de un Flow de Tavnit, con Webhook entre las opciones de salida del panel izquierdo.",
          width: 1327,
          height: 801,
        }}
      />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
          Webhooks
        </h1>

        <DocCard icon={<Zap size={24} />} title="Qué hace un webhook">
          <Lead>
            Un webhook te envía los resultados en lugar de obligarte a pedirlos. Configura un
            endpoint HTTPS en un Flow y, cada vez que un Run termine, Tavnit enviará las filas
            extraídas de ese Run a tu URL como un POST con JSON, normalmente menos de un segundo
            después de que termine el Run.
          </Lead>
          <p>
            La alternativa es el sondeo: llamar a la API cada cierto tiempo para preguntar si algo
            terminó. El sondeo te cuesta solicitudes, agrega latencia y empeora a medida que crece el
            volumen. Un webhook llega una sola vez, cuando hay algo que entregar.
          </p>
          <DataTable
            head={["Usa un webhook cuando", "Usa otra opción cuando"]}
            rows={[
              [
                "Quieres los resultados en tu propio sistema en cuanto existen",
                <Fragment key="f0">
                  Una persona necesita leerlos: la{" "}
                  <DocLink href="/es/documentacion/integracion-por-correo">salida por correo</DocLink> es mejor
                </Fragment>,
              ],
              [
                "Estás conectando Tavnit con Make, Zapier, n8n o Power Automate",
                <Fragment key="f1">
                  Quieres poder consultar los datos dentro de Tavnit: usa un{" "}
                  <DocLink href="/es/documentacion/buckets">Bucket</DocLink>
                </Fragment>,
              ],
              [
                "El volumen es tan alto que el sondeo es un desperdicio",
                "Buscas un Run específico que ya conoces: llama directamente a la API",
              ],
            ]}
          />
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Configura un webhook">
          <Lead>
            Los webhooks se configuran por Flow. Necesitas un endpoint HTTPS que acepte un POST con
            un cuerpo JSON. Tavnit rechaza las URLs con <InlineCode>http://</InlineCode> simple,
            porque el payload contiene los datos extraídos de tus documentos.
          </Lead>
          <NumberedList
            items={[
              <Fragment key="f2">
                Consigue la URL de un endpoint. Las plataformas de automatización te dan una cuando
                creas un <em>disparador de webhook</em>; si no, expón tu propia ruta HTTPS.
              </Fragment>,
              <Fragment key="f3">
                Abre el Flow en <strong>&ldquo;Flows&rdquo;</strong>.
              </Fragment>,
              <Fragment key="f4">
                Busca el panel <strong>&ldquo;Webhook&rdquo;</strong>, pega la URL y guarda.
              </Fragment>,
              <Fragment key="f5">
                Procesa un documento de prueba y confirma que llegó el POST. El registro del Run
                indica si la entrega tuvo éxito y qué código de estado se recibió.
              </Fragment>,
            ]}
          />
          <Screenshot
            src="/assets/tour2-flow-details-b.jpg"
            alt="La página de detalle de un Flow de Tavnit llamado Invoice Processor, con el panel izquierdo que muestra Email Trigger, Collections, Cleaner, Agent, Form Templates, Email Output, Webhook, Bucket Export y Human in the Loop, junto a los campos de metadatos y los campos de tabla del Flow."
            caption="Webhook está con las demás opciones de salida en el panel izquierdo de un Flow, junto a Email Output y Bucket Export."
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Los Cleaners tienen su propio webhook">
            Un <DocLink href="/es/documentacion/cleaners">Cleaner</DocLink> puede enviar por POST sus
            resultados de cada sweep de forma independiente del Flow, también solo por HTTPS. Usa el
            webhook del Flow para los resultados por documento; usa el webhook del Cleaner cuando
            quieras el conjunto de datos limpio después de cada sweep.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Braces size={24} />} title="Cómo se ve el payload">
          <Lead>
            El cuerpo es la salida del Run más sus identificadores. Las líneas repetidas llegan en{" "}
            <InlineCode>rows</InlineCode>, los campos de un solo valor en{" "}
            <InlineCode>metadata</InlineCode>, y <InlineCode>run_id</InlineCode> y{" "}
            <InlineCode>flow_id</InlineCode> te indican qué Run los produjo.
          </Lead>
          <CodeBlock lang="JSON — cuerpo del webhook del Flow" code={WEBHOOK_RUN_PAYLOAD} />
          <p>
            Los nombres de campo dentro de <InlineCode>rows</InlineCode> y{" "}
            <InlineCode>metadata</InlineCode> son los que definiste en el Flow, así que el payload
            cambia de forma cuando cambias el esquema. Si hay un{" "}
            <DocLink href="/es/documentacion/cleaners">Cleaner</DocLink> conectado, lo que recibes
            es la salida <em>limpia</em>, con monedas convertidas, columnas calculadas y todo lo
            demás.
          </p>
          <DataTable
            head={["Clave", "Siempre presente", "Qué es"]}
            rows={[
              [<Fragment key="f6"><InlineCode>run_id</InlineCode></Fragment>, "Sí", "El Run que produjo este resultado."],
              [<Fragment key="f7"><InlineCode>flow_id</InlineCode></Fragment>, "Sí", "El Flow que procesó el documento."],
              [
                <Fragment key="f8"><InlineCode>rows</InlineCode></Fragment>,
                "Sí",
                "Una entrada por cada línea extraída. Un arreglo vacío es válido: algunos documentos no tienen tabla.",
              ],
              [
                <Fragment key="f9"><InlineCode>metadata</InlineCode></Fragment>,
                "Sí",
                "Campos de un solo valor que describen el documento en su conjunto.",
              ],
              [
                <Fragment key="f10"><InlineCode>collection_run_id</InlineCode></Fragment>,
                "No",
                <Fragment key="f11">
                  Presente cuando una <DocLink href="/es/documentacion/collections">Collection</DocLink>{" "}
                  enrutó el documento a este Flow.
                </Fragment>,
              ],
              [
                <Fragment key="f12"><InlineCode>split_id</InlineCode>, <InlineCode>splitter_doc_title</InlineCode></Fragment>,
                "No",
                <Fragment key="f13">
                  Presente cuando un <DocLink href="/es/documentacion/splitters">Splitter</DocLink>{" "}
                  produjo este segmento.
                </Fragment>,
              ],
            ]}
          />
          <CodeBlock lang="JSON — claves de procedencia" code={WEBHOOK_PROVENANCE_KEYS} />
          <InfoBox color="purple" icon={<Info size={20} />} title="Los archivos llegan como enlaces, no como bytes">
            Los campos que contienen un archivo o una imagen no se incrustan en el JSON. Llegan como
            URLs temporales, porque los documentos almacenados son privados: una ruta de
            almacenamiento sin procesar no se podría abrir desde tu servidor. Descárgalos pronto en
            lugar de guardar el enlace.
          </InfoBox>
        </DocCard>

        <DocCard icon={<RefreshCw size={24} />} title="Entrega, tiempos de espera y reintentos">
          <Lead>
            Tavnit espera hasta 10 segundos a que tu endpoint responda. Una falla de conexión o un
            tiempo de espera agotado se reintenta una vez tras una breve pausa; una respuesta HTTP de
            error no se reintenta, porque tu servidor sí se alcanzó y respondió.
          </Lead>
          <DataTable
            head={["Qué hace tu endpoint", "Qué hace Tavnit"]}
            rows={[
              ["Responde 2xx en menos de 10 segundos", "La entrega se registra como enviada. Listo."],
              [
                "La conexión se rechaza, se corta o se agota el tiempo de espera",
                "Se reintenta una vez tras una breve pausa. Si el reintento también falla, la entrega se marca como fallida.",
              ],
              [
                "Responde 4xx o 5xx",
                "No se reintenta. El código de estado se registra en el Run para que veas qué respondió tu servidor.",
              ],
            ]}
          />
          <WarningBox>
            No hay una cola de reintentos larga ni reenvío desde una cola de mensajes fallidos. Si tu
            endpoint está caído durante una hora, esas entregas se pierden: los Runs igual tuvieron
            éxito y sus datos siguen en Tavnit, pero tendrás que obtenerlos por la API o volver a
            entregarlos de otra forma. Para todo lo que no te puedes permitir perder, combina el
            webhook con un <DocLink href="/es/documentacion/buckets">Bucket</DocLink> para tener
            siempre una copia duradera.
          </WarningBox>
          <InfoBox
            color="green"
            icon={<CheckCircle2 size={20} />}
            title="Un webhook fallido nunca hace fallar el Run"
          >
            La entrega es de mejor esfuerzo y está separada del procesamiento. Si tu endpoint no está
            disponible, el Run igual se completa, los datos igual se guardan y todas las demás
            salidas (correo, exportación al Bucket, llenado de formularios) se ejecutan igual.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Send size={24} />} title="Cómo escribir un receptor">
          <Lead>
            La regla más importante: confirma rápido y después trabaja. Diez segundos parecen
            suficientes hasta que tu manejador escribe en una base de datos lenta. Devuelve 200 en
            cuanto tengas el payload guardado de forma segura en una cola, y haz el procesamiento real
            después.
          </Lead>
          <CodeBlock lang="Python (Flask)" code={WEBHOOK_RECEIVER_PYTHON} />
          <CodeBlock lang="JavaScript (Express)" code={WEBHOOK_RECEIVER_JS} />
          <BulletList
            items={[
              "Acepta un cuerpo razonablemente grande: una factura larga con muchas líneas no es pequeña.",
              "Trata la entrega como \"al menos una vez\". Un reintento tras un tiempo de espera agotado puede entregar el mismo Run dos veces, así que haz tu manejador idempotente usando run_id como clave.",
              "No supongas un esquema fijo. Lee los campos por nombre y tolera los que no reconozcas, para que agregar un campo al Flow no rompa tu receptor.",
              "Registra el cuerpo sin procesar cuando algo falle. Es la única copia de lo que llegó.",
            ]}
          />
          <InfoBox
            color="yellow"
            icon={<AlertTriangle size={20} />}
            title="Mantén la URL en secreto"
          >
            La URL del endpoint es lo único que separa a internet de tus datos extraídos. Las
            plataformas de automatización incluyen un token secreto en la ruta justamente por eso. No
            la publiques y cámbiala si se filtra.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Zap size={24} />} title="Webhooks desde reglas de Cleaners y Agents">
          <Lead>
            Los Flows no son lo único que puede llamarte. Una acción condicional de un Cleaner puede
            disparar un webhook cuando una fila rompe una regla, y un Agent puede entregar su salida
            capturada a uno. Son configuraciones separadas con payloads separados.
          </Lead>
          <DataTable
            head={["Origen", "Se dispara cuando", "Contiene"]}
            rows={[
              ["Webhook del Flow", "Un Run se completa con éxito", "Las filas y los metadatos del Run"],
              [
                <Fragment key="f14">
                  Webhook del <DocLink href="/es/documentacion/cleaners">Cleaner</DocLink>
                </Fragment>,
                "Termina un sweep",
                "El conjunto de datos limpio",
              ],
              [
                "Acción condicional del Cleaner",
                "Una fila coincide con tu regla: una vez por regla por Run, no una vez por fila",
                "Una notificación que tú redactas, con las filas que coinciden",
              ],
              [
                <Fragment key="f15">
                  Entrega del <DocLink href="/es/documentacion/agents">Agent</DocLink>
                </Fragment>,
                "Termina un Run del Agent",
                "El Agent, el Run, su estado y la salida capturada",
              ],
            ]}
          />
          <p>
            Una notificación disparada por una regla se envía en cuanto la regla coincide, antes de
            cualquier{" "}
            <DocLink href="/es/documentacion/revision-humana">pausa de revisión</DocLink>. Es
            intencional: <em>avísame cuando esto pase</em> no debería esperar a un revisor. El
            webhook del Flow, en cambio, solo se dispara después de que un revisor aprueba.
          </p>
        </DocCard>

        <DocCard icon={<LifeBuoy size={24} />} title="Solución de problemas">
          <Lead>
            Empieza por el Run, no por tu servidor. Cada Run registra si se intentó la entrega del
            webhook, si tuvo éxito y qué código de estado o error se recibió, lo que te dice de
            inmediato si el problema está del lado de Tavnit o del tuyo.
          </Lead>
          <DataTable
            head={["Síntoma", "Causa probable", "Solución"]}
            rows={[
              [
                "No llega nada y no hay intento registrado",
                "El Flow no tiene una URL de webhook configurada, o el Run falló antes de la entrega.",
                "Revisa el panel \"Webhook\" del Flow y el estado del Run.",
              ],
              [
                "La URL se rechazó al guardar",
                <Fragment key="f16">
                  No empieza con <InlineCode>https://</InlineCode>.
                </Fragment>,
                "Usa un endpoint HTTPS. No se acepta HTTP simple.",
              ],
              [
                "Entrega registrada como fallida con un código de estado",
                "Tu endpoint devolvió 4xx o 5xx. Se alcanzó, así que no hubo reintento.",
                "Lee los registros de tu propio servidor: normalmente el payload está bien y el manejador lanzó un error.",
              ],
              [
                "Entrega registrada como fallida por tiempo de espera",
                "Tu manejador tardó más de 10 segundos.",
                "Confirma primero y procesa de forma asíncrona, como se explicó arriba.",
              ],
              [
                "El mismo Run llegó dos veces",
                "Hubo un reintento después de un tiempo de espera agotado en una solicitud que tu servidor sí procesó.",
                <Fragment key="f17">
                  Elimina duplicados usando <InlineCode>run_id</InlineCode>.
                </Fragment>,
              ],
              [
                "Los resultados llegan mucho más tarde de lo esperado",
                <Fragment key="f18">
                  El Flow tiene activada la{" "}
                  <DocLink href="/es/documentacion/revision-humana">revisión humana</DocLink>.
                </Fragment>,
                "El webhook se dispara con la aprobación, no con la extracción. Es así por diseño.",
              ],
            ]}
          />
        </DocCard>

        <Related
          links={[
            {
              href: "/es/documentacion/api",
              label: "Procesa documentos con la API REST",
              description:
                "La otra mitad de una integración: cómo entran los documentos, con ejemplos en Python y JavaScript.",
            },
            {
              href: "/es/documentacion/buckets",
              label: "Guarda una copia duradera en Buckets",
              description:
                "Un respaldo ante una entrega perdida, y que puedes consultar sin llamar a la API.",
            },
            {
              href: "/es/documentacion/revision-humana",
              label: "Por qué un webhook puede dispararse tarde",
              description: "La revisión pausa la entrega hasta que un revisor asignado aprueba el Run.",
            },
            {
              href: "/es/documentacion/cleaners",
              label: "Dispara un webhook cuando se rompe una regla",
              description:
                "Las acciones condicionales envían alertas de forma independiente del webhook del propio Flow.",
            },
          ]}
        />
      </section>
    </>
  );
}
