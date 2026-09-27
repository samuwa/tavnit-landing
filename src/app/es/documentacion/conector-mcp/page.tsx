import Link from "next/link";
import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  AlertTriangle,
  Info,
  KeyRound,
  LifeBuoy,
  MessageSquare,
  Plug,
  RefreshCw,
  Settings2,
  Sparkles,
} from "lucide-react";
import {
  BulletList,
  DataTable,
  DocCard,
  DocLink,
  InfoBox,
  InlineCode,
  Lead,
  NumberedList,
  Related,
  WarningBox,
} from "@/components/docs/ui";

export const metadata = docMetadata("mcp-connector", "es");

/**
 * Refleja los pasos numerados de "Conecta claude.ai". El marcado HowTo debe
 * describir los pasos que la página muestra, así que ambos deben coincidir.
 */
const HOW_TO = {
  name: "Conecta Tavnit a claude.ai con el conector MCP",
  description:
    "Genera una URL de conector de Tavnit en la página \"Integrations\" y agrégala a claude.ai como conector personalizado, para que tu asistente procese documentos con tus Flows y consulte tus Buckets.",
  steps: [
    {
      name: "Abre \"Integrations\" en Tavnit",
      text: "Inicia sesión en la app de Tavnit y abre \"Integrations\" desde la barra lateral. Confirma que estás en la organización cuyos datos quieres que el asistente consulte.",
    },
    {
      name: "Genera la URL del conector",
      text: "Busca la tarjeta \"Custom Connector\" y selecciona \"Generate connector URL\". Tavnit emite una URL a partir de tu propia API key y muestra cuándo se creó y cuándo vence.",
    },
    {
      name: "Copia la URL",
      text: "Copia la URL del conector al portapapeles. Trátala como una credencial: cualquiera que la tenga puede acceder a los Flows y Buckets de tu organización.",
    },
    {
      name: "Agrégala como conector personalizado en claude.ai",
      text: "En claude.ai ve a \"Settings\", luego a \"Connectors\" y luego a \"Add custom connector\", y pega la URL. Se requiere un plan Claude Pro o superior.",
    },
    {
      name: "Confirma la conexión",
      text: "Inicia un chat nuevo y pídele al asistente que liste tus Flows. Si responde con los nombres de tus Flows, el conector está activo.",
    },
  ],
};

export default function Page() {
  return (
    <>
      <DocsPageSchema slug="mcp-connector" locale="es" howTo={HOW_TO} />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
          Conector MCP
        </h1>

        <DocCard icon={<Plug size={24} />} title="Qué hace el conector MCP">
          <Lead>
            El conector MCP agrega tu organización de Tavnit como una herramienta dentro de un
            asistente de IA. Una vez conectado, puedes pedirle al asistente que procese un documento
            con uno de tus Flows o que responda preguntas a partir de un Bucket, y trabaja con tus
            datos reales de Tavnit en lugar de adivinar.
          </Lead>
          <p>
            MCP (Model Context Protocol) es el estándar abierto que permite a los asistentes de IA
            usar herramientas externas. Tavnit expone un endpoint MCP, y la URL del conector es la
            credencial que dirige a un cliente hacia tu organización. Funciona con{" "}
            <strong>claude.ai</strong> (Pro o superior), <strong>Cursor</strong> y cualquier otro
            cliente que acepte la URL de un servidor MCP remoto.
          </p>
          <p>
            Para saber para qué sirve el conector y cómo se compara con pegar un archivo en un chat,
            consulta la{" "}
            <Link href="/es/integraciones/mcp" className="text-accent hover:underline">
              descripción general del conector MCP
            </Link>
            .
          </p>
          <InfoBox color="blue" icon={<Info size={20} />} title="Configuración, no evaluación">
            Esta página explica cómo conectar un asistente que ya tienes a una cuenta de Tavnit que
            ya tienes. Supone que sabes para qué sirven tus Flows y Buckets. Si todavía los estás
            configurando, empieza por los conceptos básicos de extracción y vuelve después.
          </InfoBox>
        </DocCard>

        <DocCard icon={<KeyRound size={24} />} title="Antes de empezar">
          <Lead>
            Necesitas tres cosas: una organización de Tavnit con el conector habilitado, una API key
            personal y un cliente MCP. El conector se emite a partir de tu propia key, así que solo
            puede acceder a la organización en la que tenías la sesión iniciada al generarlo, con los
            permisos de tu rol.
          </Lead>
          <DataTable
            head={["Requisito", "De dónde sale"]}
            rows={[
              [
                "Tarjeta \"Custom Connector\"",
                <Fragment key="f0">
                  Aparece en la página <strong>&ldquo;Integrations&rdquo;</strong>. El conector se
                  está habilitando de forma gradual. Si no ves la tarjeta, pide a soporte que lo
                  active para tu organización.
                </Fragment>,
              ],
              [
                "Una API key de Tavnit",
                <Fragment key="f1">
                  También en la página &ldquo;Integrations&rdquo;, una por miembro y por
                  organización. Si no aparece, cierra sesión y vuelve a iniciarla.
                </Fragment>,
              ],
              [
                "Un cliente MCP",
                <Fragment key="f2">
                  claude.ai con un plan Pro o superior, Cursor o cualquier cliente que acepte la URL
                  de un servidor MCP remoto.
                </Fragment>,
              ],
              [
                "Un rol con permisos para actuar",
                <Fragment key="f3">
                  El asistente hereda tus permisos. Un Member no puede hacer que el asistente haga
                  algo que un Member no puede hacer en la app. Consulta{" "}
                  <DocLink href="/es/documentacion/roles-de-usuario">roles de usuario y permisos</DocLink>
                  .
                </Fragment>,
              ],
            ]}
          />
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Conecta claude.ai">
          <Lead>
            Genera la URL en Tavnit y pégala en claude.ai como conector personalizado. Todo el
            proceso son cinco pasos y toma alrededor de un minuto. No hay nada que instalar ni
            archivos de configuración que editar.
          </Lead>
          <NumberedList
            items={[
              <Fragment key="f4">
                Abre <strong>&ldquo;Integrations&rdquo;</strong> en la barra lateral de Tavnit.
                Revisa primero el selector de organización: el conector queda vinculado a la
                organización en la que estés.
              </Fragment>,
              <Fragment key="f5">
                En la tarjeta <strong>&ldquo;Custom Connector&rdquo;</strong>, selecciona{" "}
                <strong>&ldquo;Generate connector URL&rdquo;</strong>.
              </Fragment>,
              <Fragment key="f6">Copia la URL con el botón de copiar.</Fragment>,
              <Fragment key="f7">
                En claude.ai, ve a <strong>&ldquo;Settings → Connectors → Add custom connector&rdquo;</strong>{" "}
                y pega la URL.
              </Fragment>,
              <Fragment key="f8">
                Abre un chat nuevo y pídele que liste tus Flows. Si recibes los nombres reales de tus
                Flows, la conexión funciona.
              </Fragment>,
            ]}
          />
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Conecta Cursor u otro cliente MCP">
          <Lead>
            Cualquier cliente compatible con servidores MCP remotos acepta la misma URL. En Cursor,
            agrégala como servidor MCP remoto y no como uno basado en comandos: no hay ningún proceso
            local que ejecutar, porque el conector apunta a un endpoint alojado.
          </Lead>
          <NumberedList
            items={[
              "Genera y copia la URL del conector desde la página \"Integrations\", como se explicó arriba.",
              <Fragment key="f9">
                En Cursor, abre la configuración de MCP y agrega un servidor nuevo de tipo{" "}
                <strong>remoto</strong> / URL.
              </Fragment>,
              <Fragment key="f10">
                Pega la URL del conector como URL del servidor. No necesitas un campo aparte para la
                API key: la URL ya incluye la credencial.
              </Fragment>,
              "Recarga el cliente y comprueba que Tavnit aparece en su lista de herramientas.",
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Una URL, varios clientes">
            Puedes pegar la misma URL del conector en más de un cliente. Todos actúan como el mismo
            miembro en la misma organización, así que al renovarla se desconectan todos a la vez.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Sparkles size={24} />} title="Qué puede hacer tu asistente">
          <Lead>
            El conector ofrece dos capacidades: procesar documentos con tus Flows y leer los datos
            que ya extrajiste. Todo lo demás (crear Flows, editar Cleaners, administrar el equipo)
            se hace en la app.
          </Lead>
          <BulletList
            items={[
              <Fragment key="f11">
                <strong>Procesar documentos con tus Flows</strong> y recibir el resultado
                estructurado en la conversación.
              </Fragment>,
              <Fragment key="f12">
                <strong>Leer y buscar en tus Buckets</strong>: haz preguntas sobre datos que ya
                extrajiste, sin exportarlos primero.
              </Fragment>,
            ]}
          />
          <p className="pt-1">Instrucciones que funcionan bien:</p>
          <DataTable
            head={["Pide esto", "Qué pasa"]}
            rows={[
              [
                <Fragment key="f13"><em>&ldquo;Procesa esta factura con mi Flow Supplier Invoices.&rdquo;</em></Fragment>,
                "Ese Flow procesa el documento adjunto y los campos extraídos aparecen en el chat.",
              ],
              [
                <Fragment key="f14"><em>&ldquo;¿Cuánto le pagamos a Acme Corp el mes pasado, según mi Bucket Invoices?&rdquo;</em></Fragment>,
                "El asistente consulta el Bucket y responde a partir de las filas guardadas.",
              ],
              [
                <Fragment key="f15"><em>&ldquo;¿Qué Flows tengo?&rdquo;</em></Fragment>,
                "Una comprobación rápida de conexión: si recibes una lista real, el conector funciona.",
              ],
            ]}
          />
          <InfoBox
            color="yellow"
            icon={<AlertTriangle size={20} />}
            title="Los Runs por el conector también consumen créditos"
          >
            Un documento procesado por el asistente es un Run normal del Flow y se cobra igual que
            uno que subes tú. Si un Flow tiene la{" "}
            <DocLink href="/es/documentacion/revision-humana">revisión humana</DocLink>{" "}
            activada, el Run se pausa hasta que lo apruebe un revisor en lugar de devolver los
            resultados de inmediato.
          </InfoBox>
        </DocCard>

        <DocCard icon={<RefreshCw size={24} />} title="Vencimiento y renovación">
          <Lead>
            Las URLs del conector tienen un tiempo limitado. La tarjeta &ldquo;Custom
            Connector&rdquo; muestra cuándo se creó la URL y cuándo vence, y te avisa cuando se
            acerca el vencimiento. Al renovarla se emite una URL nueva y la anterior deja de
            funcionar de inmediato.
          </Lead>
          <DataTable
            head={["Estado", "Qué ves", "Qué hacer"]}
            rows={[
              [
                "Activa",
                "La URL con su fecha de creación y una etiqueta con el tiempo restante.",
                "Nada.",
              ],
              [
                "Por vencer",
                <Fragment key="f16">Un aviso ámbar: <em>Connector expires soon — refresh now to avoid disruption.</em></Fragment>,
                "Renuévala y pega la URL nueva en cada cliente que la use.",
              ],
              [
                "Vencida",
                <Fragment key="f17">Un aviso rojo: <em>This connector has expired. Refresh to generate a new URL.</em></Fragment>,
                "Renuévala y vuelve a pegarla. Los clientes con la URL anterior ya dejaron de funcionar.",
              ],
            ]}
          />
          <WarningBox>
            La renovación no es una rotación que puedas preparar con anticipación. En cuanto la
            confirmas, la URL anterior deja de funcionar y todos los asistentes que la usan fallan
            hasta que pegues la nueva. Renuévala cuando puedas actualizar los clientes enseguida.
          </WarningBox>
        </DocCard>

        <DocCard icon={<AlertTriangle size={24} />} title="Trata la URL como una contraseña">
          <Lead>
            La URL del conector es una credencial de portador. Cualquiera que la tenga puede acceder
            a los Flows y Buckets de tu organización como si fueras tú, sin iniciar sesión. Es seguro
            pegarla en la configuración de un cliente MCP; no es seguro compartirla en un ticket, un
            mensaje de chat o una captura de pantalla.
          </Lead>
          <BulletList
            items={[
              "No la subas a un repositorio ni la pegues en un documento compartido.",
              "Difumínala o recórtala de cualquier captura de pantalla antes de compartirla.",
              "Si se filtra, renuévala de inmediato: así la URL expuesta deja de funcionar al instante.",
              "Regenerar tu API key es una acción aparte en la misma página; hazlo también si crees que la key quedó expuesta.",
            ]}
          />
        </DocCard>

        <DocCard icon={<LifeBuoy size={24} />} title="Solución de problemas">
          <Lead>
            La mayoría de los problemas con el conector se deben a una de cuatro causas: la función
            no está habilitada, la sesión caducó, la URL venció o el cliente usa una URL que fue
            reemplazada al renovarla.
          </Lead>
          <DataTable
            head={["Síntoma", "Causa", "Solución"]}
            rows={[
              [
                "No aparece la tarjeta \"Custom Connector\" en \"Integrations\"",
                "El conector todavía no está habilitado para tu organización.",
                "Contacta a soporte para que lo activen.",
              ],
              [
                <Fragment key="f18"><InlineCode>Custom connectors require a valid Tavnit session</InlineCode></Fragment>,
                "Tu sesión caducó, así que Tavnit no puede emitir una URL.",
                "Cierra sesión, vuelve a iniciarla y genera la URL de nuevo.",
              ],
              [
                "El asistente dejó de ver Tavnit",
                "La URL venció o alguien la renovó.",
                "Busca en la tarjeta un aviso de vencida o por vencer, renuévala y vuelve a pegarla en cada cliente.",
              ],
              [
                "El asistente ve datos equivocados",
                "La URL se generó mientras estabas en otra organización.",
                "Cambia de organización en Tavnit, genera una URL nueva y reemplaza la anterior.",
              ],
              [
                "El asistente no puede realizar una acción",
                "Tu rol no lo permite.",
                "El conector hereda tus permisos. Revisa tu rol antes de suponer que el conector falla.",
              ],
            ]}
          />
        </DocCard>

        <DocCard icon={<MessageSquare size={24} />} title="Cuándo usar el conector en lugar de la API">
          <Lead>
            Usa el conector para trabajo conversacional y puntual: documentos sueltos, preguntas
            sobre datos guardados, análisis exploratorio. Usa la API REST para todo lo programado,
            de alto volumen o integrado en otro sistema, donde necesitas manejo explícito de errores
            y reintentos.
          </Lead>
          <DataTable
            head={["Situación", "Usa"]}
            rows={[
              ["Un colega pregunta cuánto facturó un proveedor el trimestre pasado", "Conector MCP"],
              ["Te llegó una factura al correo y quieres extraerla ahora", "Conector MCP"],
              ["Todas las facturas del portal de un proveedor, cada noche", "API REST o un disparador por correo"],
              ["Tu propio producto necesita los datos extraídos", "API REST más webhooks"],
            ]}
          />
        </DocCard>

        <Related
          links={[
            {
              href: "/es/documentacion/api",
              label: "Procesa documentos con la API REST de Tavnit",
              description:
                "Subida multipart y base64, autenticación con API key, ejemplos en Python y JavaScript.",
            },
            {
              href: "/es/documentacion/buckets",
              label: "Guarda los datos extraídos en Buckets",
              description:
                "Las tablas estructuradas que lee el asistente cuando le haces preguntas sobre tus datos.",
            },
            {
              href: "/es/documentacion/roles-de-usuario",
              label: "Roles de usuario y permisos",
              description:
                "Qué puede hacer cada rol (Owner, Admin y Member). Los mismos límites aplican al conector.",
            },
            {
              href: "/es/documentacion/revision-humana",
              label: "Pausa Runs para revisión humana",
              description:
                "Por qué un Run iniciado por un asistente podría esperar a un revisor en lugar de devolver resultados.",
            },
          ]}
        />
      </section>
    </>
  );
}
