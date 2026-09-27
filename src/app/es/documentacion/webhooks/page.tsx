import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  AlertTriangle,
  Braces,
  CheckCircle2,
  Info,
  LifeBuoy,
  MessageSquare,
  RefreshCw,
  Send,
  Settings2,
  Workflow,
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

/** Payload que un Run de Agente envía a su entrega por webhook. */
const AGENT_WEBHOOK_PAYLOAD = `{
  "bot_id": "...",
  "bot_run_id": "...",
  "status": "completed",
  "flow_run_id": "...",   // solo cuando un Run de Flow disparó al Agente
  "inputs": { "supplier_name": "Acme Ltd" },
  "output": { ... }
}`;

/** Payload que un nodo Salida de un Pipeline envía a un webhook, Zapier, Make o n8n. */
const PIPELINE_OUTPUT_PAYLOAD = `{
  "pipeline_id": "...",
  "execution_id": "...",
  "pipeline_name": "Supplier intake",
  "original_filename": "bundle.pdf",
  "outputs": [
    { "node": "Invoice Processor", "node_type": "flow", "output": { ... } }
  ]
}`;

/** Refleja los pasos numerados visibles en "Configura el webhook de un Flow". */
const HOW_TO = {
  name: "Envía los resultados de extracción de Tavnit a un webhook",
  description:
    "Agrega un endpoint HTTPS a un Flow de Tavnit para que cada Run completado envíe por POST sus filas extraídas a tu sistema automáticamente.",
  steps: [
    {
      name: "Consigue la URL de un endpoint",
      text: "Crea un disparador de webhook en Make, Zapier, n8n o Power Automate, o expón un endpoint HTTPS en tu propio servidor. La URL debe comenzar con https://.",
    },
    {
      name: "Abre el Flow",
      text: "Ve a Flows en la app de Tavnit y abre el Flow cuyos resultados quieres recibir.",
    },
    {
      name: "Pega la URL en el panel Webhook",
      text: "Abre el panel Webhook en la página de detalle del Flow, pega la URL del endpoint y guarda.",
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
            endpoint HTTPS en un Flow y, cada vez que un Run termina, Tavnit envía las filas
            extraídas de ese Run a tu URL como un POST con JSON, normalmente pocos segundos después
            de que el Run termina.
          </Lead>
          <p>
            La alternativa es el sondeo: llamar a la API cada cierto tiempo para preguntar si algo
            terminó. El sondeo consume solicitudes, agrega demora y empeora a medida que crece el
            volumen. Un webhook llega una sola vez, cuando hay algo que entregar.
          </p>
          <DataTable
            head={["Usa un webhook cuando", "Usa otra opción cuando"]}
            rows={[
              [
                "Quieres los resultados en tu propio sistema en cuanto existen",
                <Fragment key="f0">
                  Una persona necesita leerlos: la{" "}
                  <DocLink href="/es/documentacion/integracion-por-correo">salida por email</DocLink>{" "}
                  es mejor
                </Fragment>,
              ],
              [
                "Estás conectando Tavnit con Make, Zapier, n8n o Power Automate",
                <Fragment key="f1">
                  Quieres consultar los datos dentro de Tavnit: usa un{" "}
                  <DocLink href="/es/documentacion/buckets">Bucket</DocLink>
                </Fragment>,
              ],
              [
                "El volumen es tan alto que el sondeo resulta un desperdicio",
                "Buscas un Run concreto que ya conoces: llama a la API directamente",
              ],
            ]}
          />
        </DocCard>

        <DocCard icon={<Workflow size={24} />} title="Qué funciones pueden enviar webhooks">
          <Lead>
            Los Flows son el origen más común, pero la mayoría de las funciones que producen un
            resultado pueden enviarlo por POST a una URL. Cada una se configura en su propia página
            de detalle y envía su propio payload.
          </Lead>
          <DataTable
            head={["Origen", "Dónde se configura", "Cuándo se dispara"]}
            rows={[
              [
                "Flow",
                "Panel Webhook",
                "Un Run termina con éxito (después de la aprobación, si la revisión está activa)",
              ],
              [
                <Fragment key="f2"><DocLink href="/es/documentacion/cleaners">Cleaner</DocLink></Fragment>,
                "Panel Webhook",
                "Termina una limpieza que el Cleaner ejecuta por su cuenta (Limpiar Conjunto de Datos y limpiezas por API). Los Runs de un Flow se entregan por el webhook del Flow.",
              ],
              [
                "Acción condicional de un Cleaner",
                "Una acción de webhook en Acciones Condicionales",
                "Se cumple una regla: una vez por regla por Run, no una vez por fila",
              ],
              [
                <Fragment key="f3"><DocLink href="/es/documentacion/agentes">Agente</DocLink></Fragment>,
                "Entrega, opción Webhook",
                "Un Run del Agente termina",
              ],
              [
                <Fragment key="f4"><DocLink href="/es/documentacion/matchers">Matcher</DocLink></Fragment>,
                "Panel Webhook",
                "Un Match termina",
              ],
              [
                <Fragment key="f5"><DocLink href="/es/documentacion/inspectores">Inspector</DocLink></Fragment>,
                "Panel Webhook, y Llamar webhook en Si este check falla",
                "Termina una Inspección; la acción por check se dispara por cada check que falla",
              ],
              [
                <Fragment key="f6"><DocLink href="/es/documentacion/fillers">Filler</DocLink></Fragment>,
                "Panel Webhook",
                "Un Fill termina",
              ],
              [
                <Fragment key="f7"><DocLink href="/es/documentacion/signals">Signal</DocLink></Fragment>,
                "Panel Webhook",
                "Termina una Wave",
              ],
              [
                <Fragment key="f8"><DocLink href="/es/documentacion/nets">Net</DocLink></Fragment>,
                "Panel Webhook",
                "Termina un Catch con al menos una fila",
              ],
              [
                <Fragment key="f9"><DocLink href="/es/documentacion/pipelines">Pipeline</DocLink></Fragment>,
                "Un nodo Salida configurado como Webhook, Zapier, Make, n8n, Slack, Teams o Google Chat",
                "La ejecución llega al nodo Salida",
              ],
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Solo HTTPS">
            Los payloads contienen los datos de tus documentos, así que usa un endpoint{" "}
            <InlineCode>https://</InlineCode>. Los paneles Webhook no permiten guardar una URL{" "}
            <InlineCode>http://</InlineCode>.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Configura el webhook de un Flow">
          <Lead>
            Los webhooks de Flow se configuran por Flow. Necesitas un endpoint HTTPS que acepte un
            POST con un cuerpo JSON.
          </Lead>
          <NumberedList
            items={[
              <Fragment key="f10">
                Consigue la URL de un endpoint. Las plataformas de automatización te dan una al crear
                un <em>disparador de webhook</em>; si no, expón tu propia ruta HTTPS.
              </Fragment>,
              <Fragment key="f11">
                Abre el Flow en <strong>Flows</strong>.
              </Fragment>,
              <Fragment key="f12">
                Abre el panel <strong>Webhook</strong>, pega la URL y guarda.
              </Fragment>,
              <Fragment key="f13">
                Procesa un documento de prueba y confirma que llegó el POST. El registro del Run
                indica si la entrega tuvo éxito y qué código de estado se recibió.
              </Fragment>,
            ]}
          />
          <Screenshot
            src="/assets/tour2-flow-details-b.jpg"
            alt="La página de detalle de un Flow de Tavnit llamado Invoice Processor, con el panel izquierdo que muestra Email Trigger, Collections, Cleaner, Agent, Form Templates, Email Output, Webhook, Bucket Export y Human in the Loop, junto a los campos de metadatos y los campos de tabla del Flow."
            caption="Webhook está con las demás opciones de salida en el panel izquierdo de un Flow, junto a la Salida por Email y Exportar a Bucket."
          />
        </DocCard>

        <DocCard icon={<Braces size={24} />} title="Cómo es el payload de un Flow">
          <Lead>
            El cuerpo es la salida del Run más sus identificadores. Las partidas repetidas llegan en{" "}
            <InlineCode>rows</InlineCode>, los campos de valor único en{" "}
            <InlineCode>metadata</InlineCode>, y <InlineCode>run_id</InlineCode> y{" "}
            <InlineCode>flow_id</InlineCode> te dicen qué Run los produjo.
          </Lead>
          <CodeBlock lang="JSON: cuerpo del webhook de un Flow" code={WEBHOOK_RUN_PAYLOAD} />
          <p>
            Los nombres de campo dentro de <InlineCode>rows</InlineCode> y{" "}
            <InlineCode>metadata</InlineCode> son los que definiste en el Flow, así que el payload
            cambia de forma cuando cambias el esquema. Si hay un{" "}
            <DocLink href="/es/documentacion/cleaners">Cleaner</DocLink> conectado, recibes la
            salida <em>limpia</em>: monedas convertidas, columnas calculadas y todo lo demás. Si el
            Cleaner tiene un pivote aplicado al payload del webhook, las filas llegan en el formato
            pivotado (ancho).
          </p>
          <DataTable
            head={["Clave", "Siempre presente", "Qué es"]}
            rows={[
              [<Fragment key="f14"><InlineCode>run_id</InlineCode></Fragment>, "Sí", "El Run que produjo este resultado."],
              [<Fragment key="f15"><InlineCode>flow_id</InlineCode></Fragment>, "Sí", "El Flow que procesó el documento."],
              [
                <Fragment key="f16"><InlineCode>rows</InlineCode></Fragment>,
                "Sí",
                "Una entrada por cada partida extraída. Un arreglo vacío es válido: algunos documentos no tienen tabla.",
              ],
              [
                <Fragment key="f17"><InlineCode>metadata</InlineCode></Fragment>,
                "Sí",
                "Campos de valor único que describen el documento completo.",
              ],
              [
                <Fragment key="f18"><InlineCode>collection_run_id</InlineCode></Fragment>,
                "No",
                <Fragment key="f19">
                  Aparece cuando una{" "}
                  <DocLink href="/es/documentacion/colecciones">Colección</DocLink> enrutó el
                  documento a este Flow.
                </Fragment>,
              ],
              [
                <Fragment key="f20"><InlineCode>split_id</InlineCode>, <InlineCode>splitter_doc_title</InlineCode></Fragment>,
                "No",
                <Fragment key="f21">
                  Aparece cuando un <DocLink href="/es/documentacion/splitters">Splitter</DocLink>{" "}
                  produjo este segmento.
                </Fragment>,
              ],
            ]}
          />
          <CodeBlock lang="JSON: claves de procedencia" code={WEBHOOK_PROVENANCE_KEYS} />
          <InfoBox color="purple" icon={<Info size={20} />} title="Los archivos llegan como enlaces, no como bytes">
            Los campos que contienen un archivo o una imagen no se incrustan en el JSON. Llegan como
            URLs temporales, porque los documentos almacenados son privados: una ruta de
            almacenamiento sin firmar no se podría descargar desde tu servidor. Descárgalos pronto en
            lugar de guardar el enlace.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Braces size={24} />} title="Payloads de otros orígenes">
          <Lead>
            Todos los orígenes envían JSON, pero las claves cambian. La mayoría incluye el resultado
            del origen más los identificadores que necesitas para encontrarlo en Tavnit.
          </Lead>
          <DataTable
            head={["Origen", "Claves en el cuerpo"]}
            rows={[
              [
                "Limpieza de un Cleaner",
                <Fragment key="f22">
                  La salida limpia, más <InlineCode>sweep_id</InlineCode>,{" "}
                  <InlineCode>cleaner_id</InlineCode>, y <InlineCode>run_id</InlineCode> cuando una
                  limpieza por API vuelve a limpiar un Run.
                </Fragment>,
              ],
              [
                "Acción condicional de un Cleaner",
                <Fragment key="f23">
                  <InlineCode>content</InlineCode> (el mensaje que redactaste, que puede incluir las
                  filas que coinciden), <InlineCode>receivers</InlineCode>,{" "}
                  <InlineCode>run_id</InlineCode>, <InlineCode>flow_id</InlineCode>,{" "}
                  <InlineCode>flow_name</InlineCode>, <InlineCode>sweep_id</InlineCode> y{" "}
                  <InlineCode>matched_rows</InlineCode> (cuántas filas coincidieron).
                </Fragment>,
              ],
              [
                "Agente",
                <Fragment key="f24">
                  <InlineCode>bot_id</InlineCode>, <InlineCode>bot_run_id</InlineCode>,{" "}
                  <InlineCode>status</InlineCode>, <InlineCode>inputs</InlineCode>,{" "}
                  <InlineCode>output</InlineCode>, y <InlineCode>flow_run_id</InlineCode> cuando un
                  Run de Flow disparó al Agente.
                </Fragment>,
              ],
              [
                "Matcher",
                <Fragment key="f25">
                  El resultado del Match, más <InlineCode>match_id</InlineCode> y{" "}
                  <InlineCode>matcher_id</InlineCode>.
                </Fragment>,
              ],
              [
                "Inspector",
                <Fragment key="f26">
                  <InlineCode>inspection_id</InlineCode>, <InlineCode>inspector_id</InlineCode>,{" "}
                  <InlineCode>verdict</InlineCode> y el informe completo en{" "}
                  <InlineCode>output_json</InlineCode>. Un webhook por check envía el check fallido
                  en <InlineCode>item</InlineCode> en lugar del informe.
                </Fragment>,
              ],
              [
                "Filler",
                <Fragment key="f27">
                  <InlineCode>fill_id</InlineCode>, <InlineCode>filler_id</InlineCode>,{" "}
                  <InlineCode>status</InlineCode>, <InlineCode>filled_forms</InlineCode> (más{" "}
                  <InlineCode>filled_form_path</InlineCode> para el primer formulario) y los valores
                  de los campos en <InlineCode>output_json</InlineCode>.
                </Fragment>,
              ],
              [
                "Signal",
                <Fragment key="f28">
                  El resultado de la Wave, más <InlineCode>wave_id</InlineCode> y{" "}
                  <InlineCode>signal_id</InlineCode>.
                </Fragment>,
              ],
              [
                "Net",
                <Fragment key="f29">
                  <InlineCode>columns</InlineCode>, <InlineCode>rows</InlineCode>,{" "}
                  <InlineCode>catch_id</InlineCode>, <InlineCode>net_id</InlineCode>,{" "}
                  <InlineCode>window_start</InlineCode>, <InlineCode>window_end</InlineCode> y un
                  resumen en <InlineCode>stats</InlineCode>.
                </Fragment>,
              ],
              [
                "Salida de un Pipeline",
                <Fragment key="f30">
                  <InlineCode>pipeline_id</InlineCode>, <InlineCode>execution_id</InlineCode>,{" "}
                  <InlineCode>pipeline_name</InlineCode>, <InlineCode>original_filename</InlineCode>{" "}
                  y <InlineCode>outputs</InlineCode>, con una entrada por cada nodo anterior.
                </Fragment>,
              ],
            ]}
          />
          <CodeBlock lang="JSON: cuerpo del webhook de un Agente" code={AGENT_WEBHOOK_PAYLOAD} />
          <p>
            El webhook de un Agente siempre incluye sus variables de entrada (nunca los secretos)
            para que tu receptor pueda unir la salida capturada con sus propios registros. El{" "}
            <InlineCode>flow_run_id</InlineCode> te dice de qué documento partía el Agente cuando lo
            inició un Run de Flow.
          </p>
          <p>
            Una acción condicional se envía en cuanto se cumple la regla, antes de cualquier{" "}
            <DocLink href="/es/documentacion/revision-humana">pausa de revisión</DocLink>. Es
            intencional: <em>avísame cuando pase esto</em> no debería esperar a un revisor. El
            webhook del Flow, en cambio, solo se dispara después de que un revisor aprueba.
          </p>
        </DocCard>

        <DocCard icon={<MessageSquare size={24} />} title="Salida de un Pipeline a Slack, Teams y Google Chat">
          <Lead>
            En un <DocLink href="/es/documentacion/pipelines">Pipeline</DocLink>, un nodo Salida
            envía los resultados de los nodos que lo alimentan al destino que elijas: Email, Slack,
            Teams, Google Chat, Webhook, Zapier, Make o n8n.
          </Lead>
          <BulletList
            items={[
              "Slack, Teams y Google Chat reciben un mensaje legible con los campos clave, publicado mediante la URL de webhook entrante que copias de esa app.",
              "Webhook, Zapier, Make y n8n reciben el JSON sin procesar que se muestra abajo.",
              "Si un Flow del Pipeline ya envía su propio webhook, el Pipeline te avisa que una Salida publicaría el mismo resultado dos veces.",
            ]}
          />
          <CodeBlock lang="JSON: cuerpo de la Salida de un Pipeline" code={PIPELINE_OUTPUT_PAYLOAD} />
        </DocCard>

        <DocCard icon={<RefreshCw size={24} />} title="Entrega, tiempos de espera y reintentos">
          <Lead>
            Todos los orígenes siguen las mismas reglas de entrega. Tavnit espera hasta 10 segundos
            a que tu endpoint responda. Una falla de conexión o un tiempo agotado se reintenta una
            vez tras una pausa breve; una respuesta HTTP de error no se reintenta, porque tu
            servidor fue alcanzado y respondió.
          </Lead>
          <DataTable
            head={["Qué hace tu endpoint", "Qué hace Tavnit"]}
            rows={[
              ["Responde 2xx en menos de 10 segundos", "La entrega queda registrada como enviada. Listo."],
              [
                "Rechaza la conexión, la corta o se agota el tiempo",
                "Se reintenta una vez tras una pausa breve. Si el reintento también falla, la entrega queda marcada como fallida.",
              ],
              [
                "Responde 4xx o 5xx",
                "No se reintenta. El código de estado queda registrado para que veas qué respondió tu servidor.",
              ],
            ]}
          />
          <WarningBox>
            No hay una cola de reintentos larga ni reenvío posterior de entregas fallidas. Si tu
            endpoint está caído durante una hora, esas entregas se pierden: los Runs igual tuvieron
            éxito y sus datos siguen en Tavnit, pero tendrás que obtenerlos por la API o
            reenviarlos de otra forma. Para lo que no te puedes permitir perder, combina el webhook
            con un <DocLink href="/es/documentacion/buckets">Bucket</DocLink> para tener siempre una
            copia duradera.
          </WarningBox>
          <InfoBox
            color="green"
            icon={<CheckCircle2 size={20} />}
            title="Un webhook fallido nunca hace fallar el Run"
          >
            La entrega es de mejor esfuerzo y está separada del procesamiento. Si tu endpoint no
            responde, el Run igual termina, los datos se guardan y todas las demás salidas (email,
            exportación a Bucket, llenado de formularios) se ejecutan. La excepción es el nodo
            Salida de un Pipeline: una entrega fallida marca ese nodo como fallido para que lo veas
            en la ejecución.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Send size={24} />} title="Cómo escribir un receptor">
          <Lead>
            La regla más importante: confirma rápido y después trabaja. Diez segundos parecen
            suficientes hasta que tu manejador escribe en una base de datos lenta. Responde 200 en
            cuanto tengas el payload a salvo en una cola y haz el procesamiento real después.
          </Lead>
          <CodeBlock lang="Python (Flask)" code={WEBHOOK_RECEIVER_PYTHON} />
          <CodeBlock lang="JavaScript (Express)" code={WEBHOOK_RECEIVER_JS} />
          <BulletList
            items={[
              "Acepta cuerpos razonablemente grandes: una factura larga con muchas partidas no es pequeña.",
              "Trata la entrega como “al menos una vez”. Un reintento después de un tiempo agotado puede entregar el mismo resultado dos veces, así que haz tu manejador idempotente usando run_id (o el identificador propio del origen) como clave.",
              "No asumas un esquema fijo. Lee los campos por nombre y tolera los que no reconozcas, para que agregar un campo al Flow no rompa tu receptor.",
              "Registra el cuerpo sin procesar cuando algo falle. Es la única copia de lo que llegó.",
            ]}
          />
          <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Mantén la URL en secreto">
            La URL del endpoint es lo único que separa a internet de tus datos extraídos. Las
            plataformas de automatización incluyen un token secreto en la ruta justamente por eso. No
            la publiques y cámbiala si se filtra.
          </InfoBox>
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
                "El Flow no tiene URL de webhook, o el Run falló antes de la entrega.",
                "Revisa el panel Webhook del Flow y el estado del Run.",
              ],
              [
                "La URL fue rechazada al guardar",
                <Fragment key="f31">
                  No comienza con <InlineCode>https://</InlineCode>.
                </Fragment>,
                "Usa un endpoint HTTPS. No se acepta HTTP sin cifrar.",
              ],
              [
                "El webhook del Cleaner nunca se dispara en los Runs de un Flow",
                "Los webhooks de Cleaner solo se disparan en las limpiezas que el Cleaner ejecuta por su cuenta.",
                "Usa el panel Webhook del Flow; ya incluye la salida limpia.",
              ],
              [
                "Entrega registrada como fallida con un código de estado",
                "Tu endpoint respondió 4xx o 5xx. Fue alcanzado, así que no hubo reintento.",
                "Revisa los registros de tu servidor: normalmente el payload está bien y el manejador lanzó un error.",
              ],
              [
                "Entrega registrada como fallida por tiempo agotado",
                "Tu manejador tardó más de 10 segundos.",
                "Confirma primero y procesa de forma asíncrona, como se explicó arriba.",
              ],
              [
                "El mismo Run llegó dos veces",
                "Hubo un reintento después de un tiempo agotado en una solicitud que tu servidor sí procesó.",
                <Fragment key="f32">
                  Elimina duplicados usando <InlineCode>run_id</InlineCode>.
                </Fragment>,
              ],
              [
                "Los resultados llegan mucho más tarde de lo esperado",
                <Fragment key="f33">
                  El Flow tiene activada la{" "}
                  <DocLink href="/es/documentacion/revision-humana">Revisión Humana</DocLink>.
                </Fragment>,
                "El webhook se dispara al aprobar, no al extraer. Es así por diseño.",
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
                "Un respaldo ante una entrega perdida, que puedes consultar sin llamar a la API.",
            },
            {
              href: "/es/documentacion/pipelines",
              label: "Envía resultados de un Pipeline a herramientas de chat y automatización",
              description:
                "Los nodos Salida publican en Slack, Teams, Google Chat, Zapier, Make, n8n o cualquier webhook.",
            },
            {
              href: "/es/documentacion/cleaners",
              label: "Dispara un webhook cuando se incumple una regla",
              description:
                "Las Acciones Condicionales envían alertas independientes del webhook del Flow.",
            },
          ]}
        />
      </section>
    </>
  );
}
