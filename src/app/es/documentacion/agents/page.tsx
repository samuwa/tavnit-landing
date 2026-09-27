import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  AlertTriangle,
  Bot,
  Code2,
  Download,
  Gauge,
  Info,
  MonitorPlay,
  Send,
  Settings2,
  Workflow,
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

export const metadata = docMetadata("agents", "es");

export default function Page() {
  return (
    <>
      <DocsPageSchema slug="agents" locale="es" />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
          Agents
        </h1>

        <DocCard icon={<Bot size={24} />} title="Qué son los Agents">
          <Lead>
            Un Agent es una automatización de navegador que describes en lenguaje natural en lugar de
            programarla. Le das una misión y una URL de inicio; abre un navegador real en la nube,
            recorre el sitio (navega, llena formularios, hace clic, lee) y devuelve datos que
            coinciden con el esquema de salida que definiste.
          </Lead>
          <p>
            La diferencia con un scraper está en el mantenimiento. Un scraper es una lista de
            selectores CSS que se rompe cuando rediseñan el sitio. Un Agent lee la página en la que
            está y decide qué hacer, así que un botón que cambió de lugar o un campo con otro nombre no
            requiere cambiar código.
          </p>
          <InfoBox color="blue" icon={<Info size={20} />} title="¿No ves Agents en tu barra lateral?">
            Los Agents se están habilitando de forma gradual. Si la sección todavía no aparece en tu
            organización, contacta a soporte para activarla.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Anatomía de un Agent">
          <Lead>
            Un Agent se configura con cinco piezas: qué hacer, dónde empezar, qué sabe de antemano, qué
            debe traer de vuelta y a dónde va eso. Todo lo demás se hace por ti.
          </Lead>
          <DataTable
            head={["Parte", "Qué es", "Ejemplo"]}
            rows={[
              [
                "Misión",
                "Una instrucción en lenguaje natural. Escríbela como si le explicaras la tarea a un colega, incluido cómo manejar los casos difíciles.",
                <Fragment key="f0"><em>
                  &ldquo;Inicia sesión con las credenciales proporcionadas, abre Orders y registra el
                  precio unitario actual de cada número de parte.&rdquo;
                </em></Fragment>,
              ],
              [
                "Punto de inicio",
                "La URL que el Agent abre primero.",
                <Fragment key="f1"><InlineCode>https://portal.acme-supply.com/login</InlineCode></Fragment>,
              ],
              [
                "Variables",
                "Valores a los que la misión puede referirse. Pueden ser literales fijos o venir de los campos extraídos en un Run de un Flow.",
                <Fragment key="f2"><InlineCode>part_number</InlineCode></Fragment>,
              ],
              [
                "Capturas",
                "El esquema tipado de lo que quieres obtener. La respuesta del Agent se valida contra él, así que la salida siempre es estructurada.",
                <Fragment key="f3"><InlineCode>unit_price</InlineCode></Fragment>,
              ],
              [
                "Entrega",
                "A dónde va la salida capturada cuando termina el Run.",
                "Correo, webhook o una fila de un Bucket",
              ],
            ]}
          />
          <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="La misión es el producto">
            Casi todos los Runs decepcionantes de un Agent vienen de una misión vaga. Nombra los
            botones y los títulos de página exactos, di qué hacer cuando una búsqueda no devuelve nada
            y di cuándo detenerse. Una misión que se lee como un manual de procedimientos funciona; una
            que se lee como un deseo, no.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Code2 size={24} />} title="Capturas de salida: el esquema que el Agent debe llenar">
          <Lead>
            Las capturas declaran la forma del resultado. Cada una tiene un nombre y un tipo, y se
            admiten estructuras anidadas, así que un Agent puede devolver una lista de objetos en lugar
            de un bloque de texto que tengas que analizar después.
          </Lead>
          <DataTable
            head={["Tipo de captura", "Devuelve", "Úsalo para"]}
            rows={[
              ["Text", "Una cadena de texto", "Nombres, estados, números de referencia, texto libre"],
              ["Number", "Un decimal", "Precios, cantidades, tarifas"],
              ["Integer", "Un número entero", "Conteos, niveles de inventario"],
              ["Boolean", "Verdadero o falso", "En existencia, aprobado, existe"],
              ["Date", "Una fecha como texto", "Fechas de entrega, fechas de vencimiento"],
              ["Object", "Un grupo anidado de campos", "Un registro con varios atributos"],
              ["List", "Una estructura repetida", "Una tabla de resultados, una entrada por fila"],
              [
                "File",
                "Un archivo descargado",
                "Facturas, estados de cuenta o reportes que el Agent tiene que descargar",
              ],
            ]}
          />
          <InfoBox color="violet" icon={<Info size={20} />} title="Los resultados parciales se conservan, no se descartan">
            Todas las capturas son opcionales. Si el Agent encuentra cuatro de cinco valores, el Run
            devuelve los cuatro que encontró en lugar de fallar por completo: conservas el resultado
            parcial y ves exactamente qué falta.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Workflow size={24} />} title="Encadenar un Flow con un Agent">
          <Lead>
            La configuración más potente es extraer y luego actuar. Un Flow saca campos de un
            documento y el Agent usa esos campos como entradas. Así, el documento que recibiste decide
            lo que pasa en el sitio web de otra empresa, sin copiar nada a mano.
          </Lead>
          <NumberedList
            items={[
              "Abre la configuración del Flow.",
              "Vincula el Agent al Flow.",
              "Asigna los campos extraídos a las variables de entrada del Agent.",
              "Ejecuta el Flow: cuando termina la extracción, el Agent continúa automáticamente.",
            ]}
          />
          <p>
            Las variables vienen de uno de dos lugares, y puedes combinarlos en un mismo Agent:
          </p>
          <DataTable
            head={["Origen de la variable", "De dónde viene el valor"]}
            rows={[
              [
                "Estática",
                "Un valor fijo guardado en el Agent: un usuario del portal, un código de almacén fijo.",
              ],
              [
                "De un Run de un Flow",
                <Fragment key="f4">
                  Un campo de la salida del Run que lo disparó. Si el Flow tiene un{" "}
                  <DocLink href="/es/documentacion/cleaners">Cleaner</DocLink>, el valor se toma de la
                  salida <em>limpia</em>, así que las conversiones y columnas calculadas ya están
                  aplicadas.
                </Fragment>,
              ],
            ]}
          />
          <p>
            <strong>Ejemplo práctico.</strong> Llega una orden de compra por{" "}
            <DocLink href="/es/documentacion/integracion-por-correo">correo</DocLink>. El Flow extrae
            una fila por línea con un número de parte. Un Cleaner normaliza los números de parte.
            Luego, el Agent vinculado inicia sesión en el portal del proveedor, busca cada parte,
            captura el precio unitario vigente y el tiempo de entrega, y escribe los resultados en un{" "}
            <DocLink href="/es/documentacion/buckets">Bucket</DocLink> junto a lo que decía la orden.
            Así, la diferencia se ve antes de que alguien apruebe el pedido.
          </p>
        </DocCard>

        <DocCard icon={<Download size={24} />} title="Descargar archivos">
          <Lead>
            Dale a un Agent una captura de tipo archivo y podrá descargar documentos además de
            leerlos: un estado de cuenta detrás de un inicio de sesión, una factura en PDF de un
            portal. Los archivos se reúnen durante el Run, se guardan cuando termina y se entregan
            como enlaces con vigencia limitada.
          </Lead>
          <DataTable
            head={["Límite", "Valor"]}
            rows={[
              ["Archivo individual más grande", "25 MB"],
              ["Total de archivos por Run", "100 MB"],
              ["Cómo te llegan los archivos", "Un enlace en la salida entregada, válido por un tiempo limitado"],
            ]}
          />
          <p>
            Superar un límite no detiene el Run: se le avisa al Agent que el archivo era demasiado
            grande y sigue con el resto de la misión.
          </p>
        </DocCard>

        <DocCard icon={<MonitorPlay size={24} />} title="Ver un Run">
          <Lead>
            Cada Run de un Agent transmite sus pasos a medida que ocurren, y puedes abrir una vista en
            vivo de la sesión del navegador para verlo trabajar. Los Runs terminados guardan una
            repetición, así que ves exactamente qué hizo el Agent en lugar de deducirlo de la salida.
          </Lead>
          <BulletList
            items={[
              "Un registro paso a paso de lo que hizo el Agent, en orden",
              "La salida capturada y los archivos capturados",
              "Métricas del Run: duración y créditos usados",
              "Una sesión en vivo mientras el Run está en curso, y una repetición después",
              "Identificadores del Run y de la sesión, para solicitudes de soporte",
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Depura con la repetición, no con la salida">
            Cuando un Agent devuelve un valor incorrecto, la repetición suele mostrar el motivo en
            segundos: inició sesión en la cuenta equivocada, o la búsqueda no dio resultados y adivinó.
            Corrige la misión, no el esquema.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Gauge size={24} />} title="Límites y créditos">
          <Lead>
            Los Runs de un Agent tienen límites para que una misión que sale mal no se ejecute para
            siempre. Se aplican dos límites (un tiempo máximo de ejecución y un tope de pasos que el
            Agent puede dar) y puedes reducir ambos en cada Agent.
          </Lead>
          <DataTable
            head={["Límite", "Predeterminado", "Qué pasa cuando se alcanza"]}
            rows={[
              ["Tiempo máximo de ejecución", "10 minutos", "El Run se detiene y se marca como fallido."],
              [
                "Tope de pasos",
                "25 pasos",
                "El Agent deja de actuar; el Run termina sin un resultado completo.",
              ],
              [
                "Costo",
                "3 créditos por minuto",
                "El tiempo real se redondea al siguiente minuto completo, con un mínimo de un minuto.",
              ],
            ]}
          />
          <WarningBox>
            El tiempo de ejecución se cobra tanto si el Run tiene éxito como si falla. Una misión que
            se queda en un ciclo hasta llegar al tope de diez minutos cuesta los diez minutos
            completos. Define un tiempo máximo más corto en los Agents que todavía estás ajustando y
            prueba con un límite bajo antes de subirlo.
          </WarningBox>
          <p>
            Para iniciar un Run necesitas un saldo de créditos positivo. El costo exacto no se conoce
            de antemano (depende de cuánto tarde la navegación), así que Tavnit verifica que tengas
            créditos antes de empezar y cobra los minutos reales cuando termina el Run.
          </p>
        </DocCard>

        <DocCard icon={<Send size={24} />} title="A dónde van los resultados">
          <Lead>
            La salida capturada de un Agent se puede entregar de tres formas, o quedarse en la app
            para que la leas. La entrega ocurre cuando termina el Run, y las capturas de archivos se
            convierten antes en enlaces descargables.
          </Lead>
          <DataTable
            head={["Entrega", "Qué llega"]}
            rows={[
              ["Correo", "La salida capturada como JSON con formato, a las direcciones que configures."],
              [
                "Webhook",
                <Fragment key="f5">
                  Un POST a tu endpoint con el Agent, el Run, su estado y la salida capturada. Consulta{" "}
                  <DocLink href="/es/documentacion/webhooks">webhooks</DocLink>.
                </Fragment>,
              ],
              [
                "Bucket",
                <Fragment key="f6">
                  Una fila por Run en un <DocLink href="/es/documentacion/buckets">Bucket</DocLink>, con
                  las capturas asignadas a columnas.
                </Fragment>,
              ],
              ["Ninguna", "El resultado se queda en la página del Run en la app."],
            ]}
          />
          <p>
            Opcionalmente, la entrega puede incluir las variables de entrada que recibió el Run. Así,
            cada fila del Bucket se explica sola: qué se pidió y qué se obtuvo.
          </p>
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Permisos y ciclo de vida">
          <Lead>
            Crear, editar y eliminar Agents está reservado a Owners y Admins; los miembros con un rol
            adecuado pueden iniciar Runs. Los Agents se pueden desactivar en lugar de eliminarse, y un
            Agent conectado a un Flow activo no se puede eliminar.
          </Lead>
          <BulletList
            items={[
              "Solo Owners y Admins pueden crear, editar o eliminar un Agent",
              "Un Agent inactivo no se puede ejecutar",
              "Un Agent vinculado a un Flow activo debe desvincularse antes de poder eliminarse",
              <Fragment key="f7">
                Los Runs también se pueden iniciar desde un asistente de IA mediante el{" "}
                <DocLink href="/es/documentacion/conector-mcp">conector MCP</DocLink>, o desde un Flow
                vinculado
              </Fragment>,
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Iniciar un Agent desde tu propio código">
            Los Agents están pensados para iniciarse desde la app, desde un Flow vinculado o desde un
            asistente de IA. Si necesitas iniciar uno desde tu propio sistema, el ID del Agent está en
            su página de detalle, pero en la mayoría de las integraciones lo práctico es disparar el{" "}
            <DocLink href="/es/documentacion/api">Flow</DocLink> y dejar que el Agent encadenado siga,
            en lugar de llamar al Agent directamente.
          </InfoBox>
        </DocCard>

        <Related
          links={[
            {
              href: "/es/documentacion/cleaners",
              label: "Limpia los datos extraídos antes de que los use un Agent",
              description:
                "Los Agents leen la salida limpia de un Flow, así que normalizar los valores primero mejora lo que el Agent puede buscar.",
            },
            {
              href: "/es/documentacion/buckets",
              label: "Guarda los resultados de los Agents en Buckets",
              description: "Asigna las capturas a columnas y acumula una fila por Run.",
            },
            {
              href: "/es/documentacion/webhooks",
              label: "Envía la salida de los Agents a tus sistemas",
              description: "El payload que entrega un Run de un Agent y cómo funcionan los reintentos.",
            },
            {
              href: "/es/documentacion/mapa-del-pipeline",
              label: "Ve los Flows y los Agents como un solo pipeline",
              description: "Un mapa visual de cómo avanzan los documentos desde la extracción hasta la acción.",
            },
          ]}
        />
      </section>
    </>
  );
}
