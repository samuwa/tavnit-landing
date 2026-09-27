import Link from "next/link";
import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  AlertTriangle,
  Coins,
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
    "Genera una URL de conector de Tavnit en la página Integraciones y agrégala a claude.ai como conector personalizado, para que tu asistente trabaje con tus datos de Tavnit.",
  steps: [
    {
      name: "Abre Integraciones en Tavnit",
      text: "Inicia sesión en la app de Tavnit y abre Integraciones desde la barra lateral. Confirma que estás en la organización cuyos datos debe consultar el asistente.",
    },
    {
      name: "Genera la URL del conector",
      text: "En la tarjeta Conector Personalizado, selecciona Generar URL del conector. Tavnit emite la URL a partir de tu API key y muestra cuándo se creó y cuándo vence.",
    },
    {
      name: "Copia la URL",
      text: "Copia la URL del conector con el botón de copiar. Trátala como una contraseña.",
    },
    {
      name: "Agrégala como conector personalizado en claude.ai",
      text: "En claude.ai ve a Settings, luego a Connectors y luego a Add custom connector, y pega la URL. Los conectores personalizados requieren un plan Claude Pro o superior.",
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
            El conector MCP agrega tu organización de Tavnit como una herramienta dentro de un
            asistente de IA. Una vez conectado, puedes preguntarle al asistente sobre tus datos de
            Tavnit en lenguaje natural, y te responde a partir de tu cuenta real en lugar de
            adivinar.
          </Lead>
          <p>
            MCP (Model Context Protocol) es el estándar abierto que permite a los asistentes de IA
            usar herramientas externas. Tavnit tiene un servidor MCP en{" "}
            <InlineCode>mcp.tavnit.io</InlineCode>, y la URL del conector es la credencial que
            dirige a un cliente hacia tu organización. Funciona con <strong>claude.ai</strong> (Pro
            o superior), <strong>Cursor</strong> y cualquier otro cliente que acepte la URL de un
            servidor MCP remoto.
          </p>
          <p>
            Para saber para qué sirve el conector y cómo se compara con pegar un archivo en un chat,
            consulta la{" "}
            <Link href="/es/integraciones/mcp" className="text-accent hover:underline">
              descripción general del conector MCP
            </Link>
            .
          </p>
          <InfoBox color="blue" icon={<Info size={20} />} title="Se habilita a pedido">
            El conector se activa por organización. Si no ves la tarjeta Conector Personalizado en
            la página Integraciones, contacta a soporte para que lo habiliten en tu organización.
          </InfoBox>
        </DocCard>

        <DocCard icon={<KeyRound size={24} />} title="Antes de empezar">
          <Lead>
            Necesitas tres cosas: una organización con el conector habilitado, tu API key y un
            cliente MCP. El conector se emite a partir de tu propia key, así que solo llega a la
            organización en la que estabas al generarlo, y el asistente actúa con esa key.
          </Lead>
          <DataTable
            head={["Requisito", "De dónde sale"]}
            rows={[
              [
                "Tarjeta “Conector Personalizado”",
                <Fragment key="f0">
                  En la página <strong>Integraciones</strong>, solo cuando el conector está
                  habilitado para tu organización. Si no aparece, pídelo a soporte.
                </Fragment>,
              ],
              [
                "Tu API key",
                <Fragment key="f1">
                  La tarjeta <strong>Clave API</strong> de la misma página: una key por miembro y por
                  organización. Si dice{" "}
                  <em>No se encontró clave API. Por favor inicia sesión nuevamente.</em>, cierra
                  sesión y vuelve a iniciarla.
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
                "Tu rol",
                <Fragment key="f3">
                  El asistente usa tu API key, así que solo puede hacer lo que tu key permite. Por
                  ejemplo, las solicitudes de procesamiento rechazan la key de un rol{" "}
                  <strong>Solo HITL</strong>. Consulta{" "}
                  <DocLink href="/es/documentacion/roles-de-usuario">roles de usuario</DocLink> y{" "}
                  <DocLink href="/es/documentacion/api">la página de la API</DocLink>.
                </Fragment>,
              ],
            ]}
          />
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Conecta claude.ai">
          <Lead>
            Genera la URL en Tavnit y pégala en claude.ai como conector personalizado. No hay nada
            que instalar ni archivos de configuración que editar.
          </Lead>
          <NumberedList
            items={[
              <Fragment key="f4">
                Abre <strong>Integraciones</strong> en la barra lateral de Tavnit. Revisa primero el
                selector de organización: el conector queda vinculado a la organización en la que
                estés.
              </Fragment>,
              <Fragment key="f5">
                En la tarjeta <strong>Conector Personalizado</strong>, selecciona{" "}
                <strong>Generar URL del conector</strong>.
              </Fragment>,
              <Fragment key="f6">Copia la URL con el botón de copiar.</Fragment>,
              <Fragment key="f7">
                En claude.ai, ve a <strong>Settings → Connectors → Add custom connector</strong> y
                pega la URL.
              </Fragment>,
              <Fragment key="f8">
                Abre un chat nuevo y pregúntale al asistente qué herramientas de Tavnit tiene. Si te
                las enumera, el conector está activo.
              </Fragment>,
            ]}
          />
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Conecta Cursor u otro cliente MCP">
          <Lead>
            Cualquier cliente compatible con servidores MCP remotos acepta la misma URL. Agrégala
            como servidor remoto (por URL), no como uno basado en comandos: no hay ningún proceso
            local que ejecutar, porque el conector apunta a un servidor alojado.
          </Lead>
          <NumberedList
            items={[
              "Genera y copia la URL del conector desde la página Integraciones, como arriba.",
              <Fragment key="f9">
                En Cursor, abre la configuración de MCP y agrega un servidor nuevo de tipo{" "}
                <strong>remoto</strong> / URL.
              </Fragment>,
              <Fragment key="f10">
                Pega la URL del conector como URL del servidor. No hace falta un campo aparte para la
                API key: la URL ya lleva la credencial.
              </Fragment>,
              "Recarga el cliente y confirma que Tavnit aparece en su lista de herramientas.",
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Una URL, varios clientes">
            Tienes una sola URL de conector a la vez y puedes pegarla en más de un cliente. Todos
            actúan como tú en la misma organización, así que al actualizarla se desconectan todos a
            la vez.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Sparkles size={24} />} title="Qué puede hacer tu asistente">
          <Lead>
            A través del conector, el asistente trabaja con los datos de Tavnit de tu organización
            usando tu API key. Crear y configurar Flows, Cleaners, Pipelines y tu equipo sigue
            haciéndose en la app.
          </Lead>
          <p>
            Tu cliente MCP muestra las herramientas que ofrece el conector, y la forma más rápida de
            verlas es preguntarle al asistente. Pregunta en lenguaje natural y nombra el Flow, el
            Bucket o el run al que te refieres tal como aparece en la app.
          </p>
          <InfoBox color="blue" icon={<Info size={20} />} title="Tus datos, tu organización">
            El conector solo llega a la organización en la que se generó. Para trabajar con otra
            organización, cámbiate a ella en Tavnit y genera una URL ahí.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Coins size={24} />} title="Créditos">
          <Lead>
            El trabajo que se hace a través del conector se cobra igual que el mismo trabajo hecho
            de cualquier otra forma: consume los créditos de tu organización con normalidad.
          </Lead>
          <p>
            Cualquier run iniciado a través del conector es un run normal: cuesta lo mismo que desde
            la app o la API, y si su Flow tiene la{" "}
            <DocLink href="/es/documentacion/revision-humana">revisión humana</DocLink> activada,
            igual se pausa para un revisor. Consulta{" "}
            <DocLink href="/es/documentacion/creditos">Créditos</DocLink> para ver cuánto cuesta cada
            tipo de trabajo.
          </p>
        </DocCard>

        <DocCard icon={<RefreshCw size={24} />} title="Vencimiento y actualización">
          <Lead>
            Las URLs del conector tienen una vigencia limitada. La tarjeta Conector Personalizado
            muestra cuándo se creó la URL y cuánto le queda, y te avisa en sus últimas 24 horas. Al
            actualizarla se emite una URL nueva y la anterior queda invalidada de inmediato.
          </Lead>
          <DataTable
            head={["Estado", "Lo que ves", "Qué hacer"]}
            rows={[
              [
                "Activa",
                "La URL, la fecha de creación y los días que le quedan.",
                "Nada.",
              ],
              [
                "Vence pronto (menos de 24 horas)",
                <Fragment key="f16">El tiempo restante en horas o minutos y un aviso ámbar: <em>El conector expira pronto — actualiza ahora para evitar interrupciones.</em></Fragment>,
                "Actualízala y pega la URL nueva en cada cliente que la use.",
              ],
              [
                "Vencida",
                <Fragment key="f17">Un aviso rojo: <em>Este conector ha expirado. Actualiza para generar una nueva URL.</em></Fragment>,
                "Actualízala y vuelve a pegarla. Los clientes con la URL anterior ya dejaron de funcionar.",
              ],
            ]}
          />
          <p>
            Para actualizarla, selecciona <strong>Actualizar URL</strong> y confirma con{" "}
            <strong>Actualizar</strong> en el diálogo <em>¿Actualizar URL del conector?</em>.
          </p>
          <WarningBox>
            Actualizar no es una rotación que puedas escalonar. En cuanto confirmas, la URL anterior
            deja de funcionar y todos los asistentes que la usan fallan hasta que pegues la nueva.
            Actualízala cuando puedas cambiar los clientes enseguida.
          </WarningBox>
        </DocCard>

        <DocCard icon={<AlertTriangle size={24} />} title="Trata la URL como una contraseña">
          <Lead>
            La URL del conector es una credencial. Cualquiera que la tenga puede acceder a los datos
            de tu organización como si fuera tú, sin iniciar sesión. Es seguro pegarla en la
            configuración de un cliente MCP; no lo es compartirla en un ticket, un mensaje de chat o
            una captura de pantalla.
          </Lead>
          <BulletList
            items={[
              "No la subas a un repositorio ni la pegues en un documento compartido.",
              "Difumínala o recórtala de cualquier captura de pantalla antes de compartirla.",
              "Si se filtra, actualízala de inmediato: eso invalida la URL expuesta al instante.",
              "Regenerar tu API key es una acción aparte en la misma página; hazlo también si crees que la key quedó expuesta.",
            ]}
          />
        </DocCard>

        <DocCard icon={<LifeBuoy size={24} />} title="Solución de problemas">
          <Lead>
            Casi todos los problemas del conector se deben a una de cuatro cosas: la función no está
            habilitada, la sesión caducó, la URL venció o el cliente tiene una URL que se reemplazó
            al actualizarla.
          </Lead>
          <DataTable
            head={["Síntoma", "Causa", "Solución"]}
            rows={[
              [
                "No aparece la tarjeta Conector Personalizado en Integraciones",
                "El conector no está habilitado para tu organización.",
                "Contacta a soporte para que lo activen.",
              ],
              [
                <Fragment key="f18"><InlineCode>Los conectores personalizados requieren una sesión válida de Tavnit. Intenta cerrar sesión y volver a iniciarla.</InlineCode></Fragment>,
                "Tavnit no pudo validar tu key para emitir o leer la URL.",
                "Cierra sesión, vuelve a iniciarla y genera la URL de nuevo.",
              ],
              [
                "El asistente dejó de ver Tavnit",
                "La URL venció o alguien la actualizó.",
                "Revisa si la tarjeta muestra un aviso de vencida o por vencer, actualízala y vuelve a pegarla en cada cliente.",
              ],
              [
                "El asistente ve datos equivocados",
                "La URL se generó cuando estabas en otra organización.",
                "Cámbiate de organización en Tavnit, genera una URL nueva y reemplaza la anterior.",
              ],
              [
                "El asistente no puede realizar una acción",
                "Tu rol o tus créditos no lo permiten.",
                "Revisa tu rol y tu saldo de créditos antes de suponer que falla el conector.",
              ],
            ]}
          />
        </DocCard>

        <DocCard icon={<MessageSquare size={24} />} title="Cuándo usar el conector en lugar de la API">
          <Lead>
            Usa el conector para trabajo conversacional y puntual: preguntas sueltas, explorar datos
            guardados, revisiones rápidas. Usa la API REST para todo lo programado, de alto volumen o
            integrado en otro sistema, donde necesitas manejo de errores y reintentos explícitos.
          </Lead>
          <DataTable
            head={["Situación", "Usa"]}
            rows={[
              ["Un colega pregunta cuánto facturó un proveedor el trimestre pasado", "Conector MCP"],
              ["Quieres explorar tus datos en un chat", "Conector MCP"],
              ["Todas las facturas de un portal de proveedores, cada noche", "API REST o un disparador por correo"],
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
                "Todos los endpoints, con autenticación por API key, campos, respuestas y ejemplos en Python y JavaScript.",
            },
            {
              href: "/es/documentacion/buckets",
              label: "Guarda datos extraídos en Buckets",
              description:
                "Las tablas estructuradas donde viven tus datos extraídos.",
            },
            {
              href: "/es/documentacion/roles-de-usuario",
              label: "Roles de usuario y permisos",
              description:
                "Lo que pueden hacer Propietario, Administrador, Miembro y Solo HITL.",
            },
            {
              href: "/es/documentacion/creditos",
              label: "Cómo se cobran los créditos",
              description:
                "El trabajo del conector consume créditos como cualquier otro run.",
            },
          ]}
        />
      </section>
    </>
  );
}
