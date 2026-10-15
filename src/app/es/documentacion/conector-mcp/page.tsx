import Link from "next/link";
import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import { MCP_URL } from "@/lib/site";
import {
  AlertTriangle,
  Info,
  KeyRound,
  LifeBuoy,
  MessageSquare,
  Plug,
  ShieldCheck,
  Settings2,
  Sparkles,
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
  WarningBox,
} from "@/components/docs/ui";

export const metadata = docMetadata("mcp-connector", "es");

const SERVER_URL = `${MCP_URL}/mcp`;

/**
 * Refleja los pasos numerados de "Conecta claude.ai". El marcado HowTo debe
 * describir los pasos que la página muestra, así que ambos deben coincidir.
 */
const HOW_TO = {
  name: "Conecta Tavnit a claude.ai con el conector MCP",
  description:
    "Agrega Tavnit como conector en claude.ai, inicia sesión con tu cuenta de Tavnit, elige la organización en la que el asistente puede trabajar y aprueba. Sin claves ni URLs que copiar.",
  steps: [
    {
      name: "Abre la página Integraciones en Tavnit",
      text: "Inicia sesión en la app de Tavnit y abre Integraciones desde la barra lateral. La tarjeta Apps de IA muestra la URL del servidor y un botón Agregar a Claude.",
    },
    {
      name: "Agrega el conector en claude.ai",
      text: "Selecciona Agregar a Claude, o en claude.ai ve a Settings, luego a Connectors y luego a Add custom connector, e ingresa la URL del servidor. Deja vacíos los campos de cliente OAuth. Los conectores personalizados requieren un plan Claude Pro o superior.",
    },
    {
      name: "Inicia sesión y elige una organización",
      text: "Selecciona Connect. Se abre una página de Tavnit: inicia sesión si aún no lo has hecho, elige la organización en la que el asistente puede trabajar y aprueba.",
    },
    {
      name: "Confirma la conexión",
      text: "Inicia un chat nuevo y pregúntale al asistente qué herramientas de Tavnit tiene. Si te las enumera, el conector está activo.",
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
            El conector MCP agrega tu organización de Tavnit como un conjunto de herramientas
            dentro de un asistente de IA. Una vez conectado, describes lo que necesitas en lenguaje
            natural y el asistente lo diseña y configura en tu cuenta real: Flows, reglas de
            limpieza, Buckets, Pipelines, integraciones.
          </Lead>
          <p>
            MCP (Model Context Protocol) es el estándar abierto que permite a los asistentes de IA
            usar herramientas externas. Tavnit tiene un servidor MCP en{" "}
            <InlineCode>{SERVER_URL}</InlineCode>. El conector inicia sesión con tu cuenta de Tavnit
            (OAuth 2.1), así que no hay ninguna clave ni URL que copiar: el asistente actúa como tú,
            en la organización que elijas, con tu rol. Funciona con <strong>claude.ai</strong> (Pro
            o superior), <strong>Claude Code</strong>, <strong>Claude Desktop</strong>,{" "}
            <strong>Cursor</strong>, <strong>ChatGPT</strong> (planes de pago) y cualquier otro
            cliente que soporte servidores MCP remotos con OAuth.
          </p>
          <p>
            Para saber para qué sirve el conector y cómo se compara con pegar un archivo en un chat,
            consulta la{" "}
            <Link href="/es/integraciones/mcp" className="text-accent hover:underline">
              descripción general del conector MCP
            </Link>
            .
          </p>
          <InfoBox color="blue" icon={<Info size={20} />} title="Disponible para todas las organizaciones">
            El acceso MCP está activo en todas las organizaciones de Tavnit. Si la tarjeta Apps de
            IA no aparece en tu página Integraciones, un administrador lo desactivó para tu
            organización; contacta a soporte para restaurarlo.
          </InfoBox>
        </DocCard>

        <DocCard icon={<KeyRound size={24} />} title="Antes de empezar">
          <Lead>
            Necesitas una cuenta de Tavnit que pertenezca al menos a una organización, y un cliente
            MCP. Nada más: la conexión se aprueba con tu inicio de sesión, no con una clave.
          </Lead>
          <DataTable
            head={["Requisito", "De dónde sale"]}
            rows={[
              [
                "Una cuenta de Tavnit",
                <Fragment key="f0">
                  El mismo correo y contraseña (o inicio de sesión con Google) que usas en la app.
                  La página de consentimiento te pide iniciar sesión cuando aún no lo has hecho.
                </Fragment>,
              ],
              [
                "Una organización",
                <Fragment key="f1">
                  La eliges al aprobar la conexión. Solo se ofrecen las organizaciones a las que
                  perteneces y que tienen el acceso MCP activo.
                </Fragment>,
              ],
              [
                "Un cliente MCP",
                <Fragment key="f2">
                  claude.ai en plan Pro o superior, Claude Code, Claude Desktop, Cursor, ChatGPT en
                  un plan de pago, o cualquier cliente que soporte servidores MCP remotos con OAuth.
                </Fragment>,
              ],
              [
                "Tu rol",
                <Fragment key="f3">
                  El asistente hereda tu rol en la organización que elegiste, así que solo puede
                  hacer lo que tú puedes hacer. Consulta los{" "}
                  <DocLink href="/es/documentacion/roles-de-usuario">roles de usuario</DocLink>.
                </Fragment>,
              ],
            ]}
          />
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Conecta claude.ai">
          <Lead>
            Agrega Tavnit como conector y apruébalo con tu cuenta. No hay nada que instalar ni
            archivos de configuración que editar.
          </Lead>
          <NumberedList
            items={[
              <Fragment key="f4">
                Abre <strong>Integraciones</strong> en la barra lateral de Tavnit. La tarjeta{" "}
                <strong>Apps de IA</strong> muestra la URL del servidor y un botón{" "}
                <strong>Agregar a Claude</strong>.
              </Fragment>,
              <Fragment key="f5">
                Selecciona <strong>Agregar a Claude</strong>, o en claude.ai ve a{" "}
                <strong>Settings → Connectors → Add custom connector</strong> e ingresa la URL del
                servidor de abajo. Deja vacíos el id y el secreto de cliente OAuth.
              </Fragment>,
              <Fragment key="f6">
                Selecciona <strong>Connect</strong>. Se abre una página de Tavnit: inicia sesión si
                aún no lo has hecho, elige la organización en la que el asistente puede trabajar y
                aprueba.
              </Fragment>,
              <Fragment key="f7">
                Abre un chat nuevo y pregúntale al asistente qué herramientas de Tavnit tiene. Si te
                las enumera, el conector está activo.
              </Fragment>,
            ]}
          />
          <CodeBlock lang="text" code={SERVER_URL} />
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Conecta Cursor, Claude Code, ChatGPT u otro cliente">
          <Lead>
            Todos los clientes usan la misma URL del servidor y el mismo inicio de sesión. Agrégalo
            como servidor remoto (por URL), no como comando: no hay ningún proceso local que
            ejecutar.
          </Lead>
          <DataTable
            head={["Cliente", "Cómo"]}
            rows={[
              [
                "Cursor",
                <Fragment key="c0">
                  Selecciona <strong>Agregar a Cursor</strong> en la página Integraciones, o agrega{" "}
                  <InlineCode>{`{"mcpServers":{"tavnit":{"url":"${SERVER_URL}"}}}`}</InlineCode> a{" "}
                  <InlineCode>~/.cursor/mcp.json</InlineCode>. Luego abre Settings → Tools &amp; MCP
                  y selecciona <strong>Login</strong> en la entrada de Tavnit.
                </Fragment>,
              ],
              [
                "Claude Code",
                <Fragment key="c1">
                  Ejecuta <InlineCode>{`claude mcp add --transport http tavnit ${SERVER_URL}`}</InlineCode>,
                  luego <InlineCode>/mcp</InlineCode> → Tavnit → <strong>Authenticate</strong>.
                </Fragment>,
              ],
              [
                "Claude Desktop",
                <Fragment key="c2">
                  Settings → Connectors → <strong>Add custom connector</strong> con la URL del
                  servidor, y luego <strong>Connect</strong>.
                </Fragment>,
              ],
              [
                "ChatGPT",
                <Fragment key="c3">
                  Settings → Connectors → <strong>Add custom connector</strong> (puede requerir el
                  modo desarrollador). Ingresa la URL del servidor, elige <strong>OAuth</strong> y
                  deja vacíos los campos de cliente, luego <strong>Connect</strong>.
                </Fragment>,
              ],
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Un inicio de sesión por cliente">
            Cada cliente tiene su propia conexión, aprobada por separado. Todas actúan como tú, en
            la organización que elegiste para cada una, y cada una se puede revocar por su cuenta.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Sparkles size={24} />} title="Qué puede hacer tu asistente">
          <Lead>
            A través del conector, el asistente diseña, configura e integra: crea Flows y sus
            campos, agrega reglas de limpieza, configura Buckets, Inspectores, Fillers, Subjects y
            Pipelines, y conecta los resultados a webhooks, correo y herramientas sin código.
            También lee tus Runs y resultados para validar un diseño.
          </Lead>
          <p>
            El procesamiento se queda donde está: los documentos se suben y los Runs se inician en
            la app de Tavnit, por correo o a través de la API, y las revisiones se aprueban en la
            app. El conector nunca consume créditos.
          </p>
          <InfoBox color="blue" icon={<Info size={20} />} title="Tus datos, tu organización">
            Una conexión llega solo a la organización que elegiste al aprobarla. Para trabajar con
            otra organización, desconecta la app y vuelve a conectarla: te pedirá elegir de nuevo.
          </InfoBox>
        </DocCard>

        <DocCard icon={<ShieldCheck size={24} />} title="Administrar y revocar conexiones">
          <Lead>
            La lista <strong>Apps de IA conectadas</strong> de la página Integraciones muestra cada
            app que aprobaste, cuándo y para qué organización. Revocar una corta su acceso de
            inmediato.
          </Lead>
          <DataTable
            head={["Acción", "Qué pasa"]}
            rows={[
              [
                "Revocar",
                "El acceso de la app termina de inmediato. Su siguiente solicitud falla hasta que la vuelvas a conectar desde la app, que te pedirá iniciar sesión y elegir una organización.",
              ],
              [
                "Salir de una organización",
                "Las conexiones que apuntan a esa organización dejan de funcionar por sí solas.",
              ],
              [
                "Acceso MCP desactivado",
                "Todas las conexiones a esa organización dejan de funcionar hasta que se vuelva a activar.",
              ],
            ]}
          />
          <WarningBox>
            Revocar es inmediato y no se puede deshacer: hay que volver a conectar la app. Hazlo
            cuando puedas reconectarla enseguida, o cuando quieras cortar el acceso de forma
            definitiva.
          </WarningBox>
        </DocCard>

        <DocCard icon={<AlertTriangle size={24} />} title="Seguridad">
          <Lead>
            Las conexiones son OAuth 2.1 estándar: tokens de corta duración que el cliente renueva
            por su cuenta, aprobados en una página que tú controlas, revocables en cualquier
            momento.
          </Lead>
          <BulletList
            items={[
              "Nada que copiar ni guardar: no hay ninguna credencial que pegar en un cliente, así que no hay nada que se pueda filtrar en un ticket, un chat o una captura de pantalla.",
              "El asistente actúa con tu rol en la organización que elegiste, y nunca puede hacer más de lo que tú puedes en la app.",
              "El procesamiento, las revisiones y los créditos se quedan en la app; el conector solo diseña y configura.",
              "Tu API key es aparte. Los scripts y automatizaciones la siguen usando; el conector no.",
            ]}
          />
        </DocCard>

        <DocCard icon={<LifeBuoy size={24} />} title="Solución de problemas">
          <Lead>
            La mayoría de los problemas del conector son uno de cuatro: la conexión fue revocada,
            tu membresía o rol cambió, el acceso MCP está desactivado, o el cliente conserva una
            conexión antigua a otra organización.
          </Lead>
          <DataTable
            head={["Síntoma", "Causa", "Solución"]}
            rows={[
              [
                "No aparece la tarjeta Apps de IA en Integraciones",
                "El acceso MCP está desactivado para tu organización.",
                "Contacta a soporte para que lo activen.",
              ],
              [
                "La página de consentimiento dice que ninguna de tus organizaciones tiene acceso MCP",
                "Solo perteneces a organizaciones donde está desactivado.",
                "Pide al Owner de la organización o a soporte que lo activen.",
              ],
              [
                "El asistente dejó de ver Tavnit",
                "La conexión fue revocada, o tu membresía cambió.",
                "Elimina el conector en el cliente y agrégalo de nuevo.",
              ],
              [
                "El asistente ve los datos equivocados",
                "Elegiste otra organización al aprobar.",
                "Revoca la conexión en Integraciones, reconecta y elige la organización correcta.",
              ],
              [
                "El asistente no puede realizar una acción",
                "Tu rol no lo permite.",
                "Revisa tu rol antes de asumir una falla del conector.",
              ],
            ]}
          />
        </DocCard>

        <DocCard icon={<MessageSquare size={24} />} title="Cuándo usar el conector en lugar de la API">
          <Lead>
            Usa el conector para el trabajo conversacional: diseñar un Flow, agregar una regla,
            revisar resultados, conectar una integración. Usa la API REST para todo lo programado,
            de alto volumen o integrado en otro sistema, donde necesitas manejo explícito de errores
            y reintentos.
          </Lead>
          <DataTable
            head={["Situación", "Usa"]}
            rows={[
              ["Diseñar un Flow y sus reglas de limpieza describiéndolos", "Conector MCP"],
              ["Revisar por qué fallaron los Runs de la semana pasada", "Conector MCP"],
              ["Cada factura de un portal de proveedores, todas las noches", "API REST o un disparador por correo"],
              ["Tu propio producto necesita los datos extraídos", "API REST más webhooks"],
            ]}
          />
        </DocCard>

        <Related
          links={[
            {
              href: "/es/documentacion/api",
              label: "Referencia de la API REST de Tavnit",
              description:
                "Cada endpoint, con autenticación por API key, campos de la solicitud, respuestas y ejemplos en Python y JavaScript.",
            },
            {
              href: "/es/documentacion/buckets",
              label: "Guarda los datos extraídos en Buckets",
              description: "Las tablas estructuradas donde viven tus datos extraídos.",
            },
            {
              href: "/es/documentacion/roles-de-usuario",
              label: "Roles de usuario y permisos",
              description: "Qué puede hacer cada uno: Owner, Admin, Member y HITL Only.",
            },
          ]}
        />
      </section>
    </>
  );
}
