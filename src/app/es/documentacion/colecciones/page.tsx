import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  AlertTriangle,
  ArrowLeftRight,
  Code,
  Eye,
  FilePlus,
  FolderInput,
  HelpCircle,
  Info,
  Mail,
  PenLine,
  ShieldCheck,
  Split,
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
  Screenshot,
  WarningBox,
} from "@/components/docs/ui";

export const metadata = docMetadata("collections", "es");

/** Refleja los pasos numerados visibles en "Crear una Colección". */
const HOW_TO = {
  name: "Enruta documentos mixtos automáticamente con una Colección de Tavnit",
  description:
    "Agrupa varios Flows de extracción (y, si quieres, Splitters) en una Colección para que Tavnit clasifique cada documento que llega y lo envíe al destino correcto, con un Flow predeterminado para lo que no pueda ubicar.",
  steps: [
    {
      name: "Crea la Colección",
      text: "Abre Colecciones en la app de Tavnit, haz clic en Crear Colección y ponle un nombre (y, si quieres, una descripción) que indique de dónde vienen los documentos.",
    },
    {
      name: "Selecciona los Flows",
      text: "Marca cada Flow activo que deba ser un destino posible. Se necesita al menos uno, y cada Flow necesita un nombre y una descripción claros, porque la decisión de enrutamiento se toma con base en ellos.",
    },
    {
      name: "Agrega Splitters (opcional)",
      text: "Marca los Splitters que deban recibir archivos que juntan varios documentos, para que se separen y cada parte se enrute por su cuenta.",
    },
    {
      name: "Elige el Comportamiento Predeterminado",
      text: "Decide qué pasa cuando un documento no coincide claramente con nada: Cancelar el Run, o Enviar a un Flow predeterminado elegido entre los Flows de la Colección.",
    },
    {
      name: "Activa el Disparador por Email (opcional)",
      text: "Activa el Disparador por Email si los documentos llegarán por correo. La dirección se genera cuando se crea la Colección.",
    },
    {
      name: "Envía documentos y revisa los resultados",
      text: "Sube documentos con Run, envíalos por correo o por la API, y luego revisa Runs Recientes para ver a dónde fue cada uno y mejorar la descripción de cualquier Flow que haya producido una decisión equivocada.",
    },
  ],
};

export default function Page() {
  return (
    <>
      <DocsPageSchema
          slug="collections"
          locale="es"
          howTo={HOW_TO}
          primaryImage={{
            url: "/assets/docs-collection-runs-2026-08.jpg",
            caption:
              "La pestaña Runs Recientes de una Colección de Tavnit, con el resultado del enrutamiento de cada documento.",
            width: 1327,
            height: 801,
          }}
        />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
          Colecciones
        </h1>

        <DocCard icon={<FolderInput size={24} />} title="Qué hace una Colección">
          <Lead>
            Una Colección agrupa varios Flows (y, si quieres, Splitters) detrás de un solo punto de
            entrada. Cuando llega un documento, Tavnit mira su primera página, compara lo que ve con
            los nombres y las descripciones de los destinos de la Colección y reenvía el documento al
            que coincide. Así puedes dar una sola dirección para documentos que no puedes clasificar
            de antemano.
          </Lead>
          <p>
            La decisión de enrutamiento se toma a partir del propio documento: encabezados, títulos,
            logotipos, diseño y texto identificador como nombres de empresas y números de formulario.
            Es un paso de clasificación, no de extracción: una vez elegido el destino, ese Flow
            procesa el documento exactamente como si se lo hubieras enviado directamente.
          </p>
        </DocCard>

        <DocCard icon={<ArrowLeftRight size={24} />} title="¿Colección o Flow directo?">
          <Lead>
            Envía los documentos directo a un Flow cuando ya sabes qué son. Usa una Colección cuando
            el remitente es un solo canal pero el contenido varía, y decidir qué Flow aplica sería de
            otro modo el trabajo manual de alguien.
          </Lead>
          <DataTable
            head={["Situación", "Enviar a"]}
            rows={[
              ["Un proveedor, un tipo de documento, siempre el mismo diseño", "El Flow directamente"],
              ["Un portal de proveedores que emite facturas, órdenes de compra y recibos", "Una Colección"],
              ["Un buzón compartido donde puede llegar cualquier cosa", "Una Colección"],
              ["Una llamada a la API que ya conoce el tipo de documento", "El Flow directamente"],
              ["Un PDF que junta varios documentos", "Un Splitter, o una Colección que contenga uno"],
            ]}
          />
          <p>
            Si quien envía conoce el tipo, díselo al Flow.
          </p>
        </DocCard>

        <DocCard icon={<FilePlus size={24} />} title="Crear una Colección">
          <Lead>
            Una Colección es un nombre, una lista de destinos y un comportamiento predeterminado. El
            trabajo está en los destinos: la calidad del enrutamiento depende casi por completo de qué
            tan bien describe cada Flow lo que maneja.
          </Lead>
          <NumberedList
            items={[
              <Fragment key="f0">
                Abre <strong>Colecciones</strong> y haz clic en <strong>Crear Colección</strong>.
                Ponle el nombre del origen de los documentos (<em>Portal de proveedores Acme</em>, no{" "}
                <em>Colección 2</em>) y, si quieres, agrega una descripción.
              </Fragment>,
              <Fragment key="f1">
                En <strong>Flows</strong>, marca cada Flow activo que deba ser un destino posible. Se
                necesita al menos uno.
              </Fragment>,
              <Fragment key="f2">
                En <strong>Splitters</strong>, marca opcionalmente los Splitters que deban recibir
                archivos que juntan varios documentos.
              </Fragment>,
              <Fragment key="f3">
                En <strong>Comportamiento Predeterminado</strong>, elige qué sucede cuando la IA no
                puede determinar el Flow correcto: <strong>Cancelar el Run</strong>, o{" "}
                <strong>Enviar a un Flow predeterminado</strong> elegido entre los Flows de la
                Colección.
              </Fragment>,
              <Fragment key="f4">
                Opcionalmente, activa el <strong>Disparador por Email</strong>. La dirección se genera
                cuando se crea la Colección.
              </Fragment>,
              <Fragment key="f5">
                Envía documentos (con <strong>Run</strong>, por correo o por la API) y luego revisa{" "}
                <strong>Runs Recientes</strong> para mejorar cualquier descripción que haya producido
                una decisión equivocada.
              </Fragment>,
            ]}
          />
          <p>
            Todo se puede cambiar después desde la página de detalle de la Colección, cuyo panel
            izquierdo tiene <strong>Flows</strong>, <strong>Splitters</strong>,{" "}
            <strong>Runs Recientes</strong>, <strong>Disparador por Email</strong>,{" "}
            <strong>Flow de Respaldo</strong> (el ajuste de Comportamiento Predeterminado) e{" "}
            <strong>ID de la Colección</strong>. El interruptor de la barra superior activa o
            desactiva la Colección; las colecciones inactivas rechazan nuevos Runs. Los Admins y
            Owners pueden crear Colecciones; quien la creó, los Admins y los Owners pueden editarla y
            eliminarla.
          </p>
        </DocCard>

        <DocCard icon={<PenLine size={24} />} title="Nombres y descripciones de Flows que enrutan bien">
          <Lead>
            El nombre y la descripción de cada destino son lo único con lo que el enrutador compara el
            documento. Un Flow llamado <em>Flow 3</em> sin descripción no puede recibir documentos de
            forma confiable, por muy distintivo que sea el documento.
          </Lead>
          <DataTable
            head={["En lugar de", "Escribe"]}
            rows={[
              [
                <Fragment key="f2"><em>Facturas</em></Fragment>,
                <Fragment key="f3"><em>
                  Facturas del proveedor Acme Corp: membrete azul, &ldquo;TAX INVOICE&rdquo; en el
                  encabezado, líneas con números de parte
                </em></Fragment>,
              ],
              [
                <Fragment key="f4"><em>Envíos</em></Fragment>,
                <Fragment key="f5"><em>
                  Conocimientos de embarque de navieras: números de contenedor, puerto de carga y de
                  descarga
                </em></Fragment>,
              ],
              [
                <Fragment key="f6"><em>Otros documentos</em></Fragment>,
                <Fragment key="f7"><em>Notas de entrega: sin precios, bloque de firma al final</em></Fragment>,
              ],
            ]}
          />
          <BulletList
            items={[
              "Describe lo que se ve en la primera página, porque eso es lo que ve el enrutador. En una hoja de cálculo, es la parte superior de su primera hoja visible.",
              "Nombra al emisor cuando varios Flows manejan el mismo tipo de documento para distintos proveedores.",
              "Di qué no es un tipo de documento cuando dos de tus Flows se confunden fácilmente.",
              "Evita dos Flows con descripciones que se traslapan: el enrutador tiene instrucciones de abstenerse cuando la coincidencia es ambigua en lugar de adivinar.",
            ]}
          />
        </DocCard>

        <DocCard icon={<Workflow size={24} />} title="Qué pasa con cada documento">
          <Lead>
            Cada documento crea un Run de Colección que pasa por un pequeño conjunto de estados. El
            enrutamiento se decide una sola vez, a partir de la primera página, y la decisión se
            registra con un motivo escrito.
          </Lead>
          <DataTable
            head={["Estado", "Significado"]}
            rows={[
              ["En cola", "El documento está guardado y esperando ser enrutado."],
              ["Enrutando", "Se está clasificando la primera página."],
              [
                "Enrutado",
                "Se eligió un destino. El Run de Colección enlaza al Run del Flow (o a la separación del Splitter) que creó.",
              ],
              [
                "Cancelado",
                "Ningún destino coincidió y el Comportamiento Predeterminado es Cancelar el Run, así que no se procesó nada. También puedes cancelar un Run tú mismo mientras se está enrutando.",
              ],
              [
                "Fallido",
                "El documento no se pudo enrutar: un archivo no compatible o ilegible, o una Colección sin destinos activos.",
              ],
            ]}
          />
          <Screenshot
            src="/assets/docs-collection-runs-2026-08.jpg"
            alt="La pestaña Runs Recientes de una Colección de Tavnit, con filtros de estado para Routed, Routing, Pending, Failed y Cancelled, que lista dos PDF enrutados al Flow Invoice Processor."
            caption="Los Runs Recientes de una Colección, filtrados por resultado del enrutamiento. Cada entrada registra el destino al que se envió el documento."
          />
          <InfoBox color="violet" icon={<Info size={20} />} title="El Flow predeterminado es la red de seguridad">
            Cuando el enrutador no encuentra una coincidencia clara, no adivina: se abstiene. Con{" "}
            <strong>Enviar a un Flow predeterminado</strong>, el documento va a ese Flow (marcado como{" "}
            <strong>Predeterminado</strong> en la lista de Flows de la Colección) y el motivo registra
            que se usó el respaldo. Con <strong>Cancelar el Run</strong>, el Run termina como
            Cancelado con el motivo &ldquo;No clear match and no default flow configured&rdquo; y el
            documento no se procesa. Elige un Flow predeterminado, a menos que de verdad quieras
            descartar los documentos desconocidos.
          </InfoBox>
          <WarningBox>
            El enrutamiento no produce una puntuación de confianza. Cada decisión se registra como un
            motivo escrito que cita lo que el enrutador vio en la página.
          </WarningBox>
        </DocCard>

        <DocCard icon={<Split size={24} />} title="Enrutar a un Splitter">
          <Lead>
            Los destinos de una Colección no se limitan a Flows. Puedes agregar un{" "}
            <DocLink href="/es/documentacion/splitters">Splitter</DocLink> como destino, para que un
            archivo que junta varios documentos se divida primero y cada parte se enrute después, en
            lugar de extraerse como si fuera un solo documento.
          </Lead>
          <BulletList
            items={[
              "Los destinos Splitter se le describen al enrutador como Splitters, así que solo elige uno cuando el archivo claramente junta varios documentos.",
              "Un documento individual siempre se envía a un Flow, nunca a un Splitter.",
              "Cada parte que produce el Splitter sigue por el pipeline por su cuenta.",
            ]}
          />
          <InfoBox color="green" icon={<ShieldCheck size={20} />} title="Los ciclos están bloqueados">
            Un Splitter puede alimentar una Colección y una Colección puede alimentar un Splitter, lo
            que podría formar un ciclo. Un Splitter que ya envía documentos a esta Colección aparece
            atenuado en la lista de Splitters y no se puede agregar, y durante la ejecución un
            segmento producido por un Splitter nunca se enruta de vuelta a ese mismo Splitter. Así,
            una configuración mal hecha no puede hacer girar documentos en círculo.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Mail size={24} />} title="Enviar documentos a una Colección">
          <Lead>
            Una Colección acepta documentos de tres formas: subida en la app, su propia dirección de
            correo o la API. El enrutamiento funciona igual sin importar cuál uses, y cada Run
            registra de qué origen vino.
          </Lead>
          <DataTable
            head={["Tipo de archivo", "Cómo se enruta"]}
            rows={[
              ["PDF", "A partir de una imagen de la primera página."],
              ["PNG, JPG, JPEG", "A partir de la propia imagen."],
              [
                "XLSX, XLS, CSV",
                "A partir de la primera hoja visible, convertida en una página. Luego un Flow extrae de esa hoja; un Splitter trata cada hoja visible como un documento.",
              ],
            ]}
          />
          <p>
            <strong>Subida en la app.</strong> Haz clic en <strong>Run</strong> en la barra superior
            de la Colección (está desactivado mientras la Colección esté inactiva). El diálogo{" "}
            <strong>Nuevo Run de Colección</strong> acepta varios archivos a la vez, y cada archivo se
            convierte en su propio Run de Colección.
          </p>
          <p>
            <strong>Correo.</strong> Abre <strong>Disparador por Email</strong>, actívalo y copia la{" "}
            <strong>Dirección de Bandeja</strong>. Cada adjunto se convierte en su propio Run de
            Colección. Debajo de la dirección hay dos ajustes opcionales:
          </p>
          <BulletList
            items={[
              <Fragment key="e0">
                <strong>Remitentes Permitidos</strong>: solo estas direcciones pueden disparar un Run.
                Deja la lista vacía para aceptar correos de cualquier remitente.
              </Fragment>,
              <Fragment key="e1">
                <strong>Procesar Cuerpo del Correo</strong>: enruta el mensaje en sí, no solo sus
                adjuntos. Elige <strong>Solo cuando no hay adjuntos</strong> (una nota que acompaña a
                un documento adjunto se omite, así un correo nunca inicia dos Runs) o{" "}
                <strong>Siempre</strong> (el cuerpo se procesa junto a cada adjunto, cada uno en su
                propio Run). Primero el cuerpo se convierte en PDF, así aparece en la revisión como
                cualquier otro documento; las imágenes del mensaje no se leen.
              </Fragment>,
            ]}
          />
          <p>
            La dirección es distinta de la de cualquier Flow. Consulta{" "}
            <DocLink href="/es/documentacion/integracion-por-correo">integración por correo</DocLink>{" "}
            para ver los formatos de dirección y qué pasa con los adjuntos que no se pueden procesar.
          </p>
        </DocCard>

        <DocCard icon={<Code size={24} />} title="Colecciones por la API">
          <Lead>
            Copia el ID en el panel <strong>ID de la Colección</strong> y envía documentos con tu
            clave de API. La llamada responde en cuanto el archivo queda guardado, antes de enrutar.
          </Lead>
          <DataTable
            head={["Endpoint", "Qué hace"]}
            rows={[
              [
                <InlineCode key="a0">{"POST /api/collections/<collection_id>/process"}</InlineCode>,
                <Fragment key="a1">
                  Envía un documento (<InlineCode>file</InlineCode> en multipart, o{" "}
                  <InlineCode>file_base64</InlineCode> con <InlineCode>filename</InlineCode>).
                  Devuelve HTTP 202 con un <InlineCode>collection_run_id</InlineCode>. Una Colección
                  inactiva o sin destinos activos se rechaza.
                </Fragment>,
              ],
              [
                <InlineCode key="a2">{"GET /api/collection-runs/<collection_run_id>/source-file"}</InlineCode>,
                <Fragment key="a3">
                  Recupera el documento que enviaste, disponible de inmediato: no hace falta esperar
                  al enrutamiento ni saber a qué Flow o Splitter fue. Devuelve JSON con una{" "}
                  <InlineCode>url</InlineCode> firmada de corta duración, o el propio archivo con{" "}
                  <InlineCode>?download=true</InlineCode>.
                </Fragment>,
              ],
            ]}
          />
          <p>
            Consulta la <DocLink href="/es/documentacion/api">página de la API</DocLink> para la
            autenticación, las formas completas de solicitud y respuesta, y cómo seguir el Run del
            Flow resultante.
          </p>
        </DocCard>

        <DocCard icon={<Eye size={24} />} title="Revisar las decisiones de enrutamiento">
          <Lead>
            <strong>Runs Recientes</strong> es donde revisas y ajustas el enrutamiento. Se actualiza
            en vivo, se puede filtrar por estado y lista cada documento con su hora, su origen, el
            remitente en los Runs por correo y el Flow o Splitter al que se envió.
          </Lead>
          <BulletList
            items={[
              "Haz clic en un Run enrutado para abrir el Run del Flow (o la separación) que creó, con sus datos extraídos.",
              "Haz clic en un Run que no llegó a un destino para abrir el diálogo Run de Colección: estado, documento, origen, la razón de enrutamiento escrita y cualquier mensaje de error. Un Run que todavía está pendiente o enrutándose se puede cancelar desde ahí con Cancelar Run.",
              "Un Run que usó el Flow predeterminado muestra ese Flow como destino; su motivo empieza con “No clear match. Using default flow.”",
            ]}
          />
          <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Corrige las descripciones, no los documentos">
            Cuando el enrutamiento falla, la solución casi siempre está en las descripciones de los
            destinos, no en el documento. Dos Flows que dicen &ldquo;facturas&rdquo; seguirán
            produciendo decisiones ambiguas hasta que uno de ellos diga qué lo hace diferente.
          </InfoBox>
        </DocCard>

        <DocCard icon={<HelpCircle size={24} />} title="Solución de problemas">
          <DataTable
            head={["Problema", "Qué revisar"]}
            rows={[
              [
                "Los documentos terminan como Cancelado",
                "El enrutador no encontró una coincidencia clara y el Comportamiento Predeterminado es Cancelar el Run. Mejora las descripciones de los Flows, o elige Enviar a un Flow predeterminado.",
              ],
              [
                "Demasiados documentos van al Flow predeterminado",
                "Dos o más destinos describen lo mismo, o ninguno describe lo que hay en la primera página. Abre algunos de esos Runs y compáralos con las descripciones.",
              ],
              [
                "Run está desactivado",
                "La Colección está inactiva. Vuelve a activarla con el interruptor de la barra superior.",
              ],
              [
                "Un documento enviado por correo nunca aparece",
                "Revisa que el Disparador por Email esté activo, que el remitente esté en Remitentes Permitidos (si la lista no está vacía) y que el tipo de archivo sea compatible.",
              ],
              [
                "No se puede agregar un Splitter",
                "Ya envía documentos a esta Colección; agregarlo crearía un bucle.",
              ],
            ]}
          />
        </DocCard>

        <Related
          links={[
            {
              href: "/es/documentacion/splitters",
              label: "Divide los PDF con varios documentos antes de enrutar",
              description:
                "Cómo un Splitter separa un archivo combinado y cómo funciona como destino de una Colección.",
            },
            {
              href: "/es/documentacion/integracion-por-correo",
              label: "Dale a una Colección su propio buzón",
              description:
                "Formatos de dirección, tipos de adjunto aceptados y por qué un adjunto podría omitirse.",
            },
            {
              href: "/es/documentacion/api",
              label: "Envía documentos por la API REST",
              description: "Envía documentos a una Colección de forma programática en lugar de por correo.",
            },
            {
              href: "/es/documentacion/mapa-del-pipeline",
              label: "Ve tus Colecciones en el Mapa de Pipeline",
              description:
                "Cómo se conectan las Colecciones, los Splitters, los Flows y la entrega en todo el espacio de trabajo.",
            },
          ]}
        />
      </section>
    </>
  );
}
