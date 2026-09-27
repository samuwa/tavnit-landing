import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  AlertTriangle,
  AtSign,
  Code2,
  Copy,
  ExternalLink,
  FileSpreadsheet,
  Info,
  LifeBuoy,
  Mail,
  Paperclip,
  Send,
  ShieldCheck,
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

export const metadata = docMetadata("email-integration", "es");

/** Refleja los pasos numerados visibles en "Activa el disparador por correo". */
const HOW_TO = {
  name: "Extrae datos de adjuntos de correo con el disparador por email de Tavnit",
  description:
    "Activa el disparador por email en un Flow de Tavnit para obtener una dirección de bandeja dedicada y reenvíale documentos. Cada adjunto compatible se convierte en su propio Run de extracción.",
  steps: [
    {
      name: "Abre el Flow",
      text: "Ve a Flows en la app de Tavnit y abre el Flow que debe recibir los documentos.",
    },
    {
      name: "Activa el disparador por email",
      text: "Abre el panel Disparador por Email en la página de detalle del Flow y actívalo. Aparece la Dirección de Bandeja del Flow.",
    },
    {
      name: "Copia la dirección",
      text: "Haz clic en Copiar junto a la Dirección de Bandeja. Si quieres, agrega Remitentes Permitidos o activa Procesar Cuerpo del Correo en el mismo panel.",
    },
    {
      name: "Envía un documento de prueba",
      text: "Envía un solo PDF a la dirección y revisa la página de Runs. Aparece un Run nuevo con el origen Correo Electrónico.",
    },
    {
      name: "Automatiza el reenvío",
      text: "Cuando la prueba funcione, crea una regla en tu cliente de correo o buzón compartido que reenvíe automáticamente los mensajes a esa dirección.",
    },
  ],
};

export default function Page() {
  return (
    <>
      <DocsPageSchema slug="email-integration" locale="es" howTo={HOW_TO} />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
          Integración por correo
        </h1>

        <DocCard icon={<Mail size={24} />} title="Cómo funciona el procesamiento por correo">
          <Lead>
            Cada Flow de Tavnit puede tener su propia dirección de bandeja. Cuando activas el
            disparador por email y envías un documento a esa dirección, Tavnit toma cada adjunto
            compatible, crea un Run de extracción independiente para cada uno y lo procesa exactamente
            igual que si lo hubieras subido en la app.
          </Lead>
          <p>
            No hay nada que instalar ni nada que revise tu buzón: tú reenvías el correo a la
            dirección y Tavnit reacciona. Es el camino más corto entre &ldquo;las facturas llegan por
            correo&rdquo; y &ldquo;las facturas llegan como filas estructuradas&rdquo;, sin escribir
            código. Las Colecciones, los Splitters, los Pipelines, los Matchers y los Subjects
            también tienen su propia dirección.
          </p>
          <BulletList
            items={[
              "Reenviar facturas o recibos directamente desde tu bandeja de entrada",
              "Un buzón compartido de cuentas por pagar con una regla de reenvío automático",
              "Permitir que los proveedores envíen documentos sin darles acceso a Tavnit",
              "Extraer datos que vienen en el propio mensaje, como confirmaciones de pedido sin adjunto",
            ]}
          />
        </DocCard>

        <DocCard icon={<ExternalLink size={24} />} title="Activa el disparador por correo">
          <Lead>
            El disparador viene apagado. Actívalo desde la página de detalle del Flow, copia la
            dirección que te asigna y envía un documento de prueba antes de configurar una regla de
            reenvío.
          </Lead>
          <NumberedList
            items={[
              <Fragment key="f0">
                Ve a <strong>Flows</strong> y abre el Flow que debe recibir los documentos.
              </Fragment>,
              <Fragment key="f1">
                Abre el panel <strong>Disparador por Email</strong> y actívalo. Aparece la{" "}
                <strong>Dirección de Bandeja</strong> del Flow.
              </Fragment>,
              <Fragment key="f2">
                Haz clic en <strong>Copiar</strong> junto a la dirección. En el mismo panel puedes
                agregar <strong>Remitentes Permitidos</strong> o activar{" "}
                <strong>Procesar Cuerpo del Correo</strong> (ambos se explican más abajo).
              </Fragment>,
              <Fragment key="f3">
                Envía un PDF y revisa la página de <strong>Runs</strong>. Aparece un Run nuevo con
                el origen <strong>Correo Electrónico</strong>, y la dirección del remitente queda
                registrada en el Run.
              </Fragment>,
              "Cuando funcione, crea la regla de reenvío en tu cliente de correo o buzón compartido.",
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Un Run por adjunto">
            Un correo con tres facturas adjuntas genera tres Runs separados, cada uno con su propio
            resultado, su propio cobro de créditos y su propia fila en la lista de Runs. No genera un
            solo Run con tres documentos.
          </InfoBox>
          <WarningBox>
            El correo enviado a una dirección con el disparador apagado (o a una Colección inactiva)
            se acepta y se descarta: el remitente no recibe rebote ni error. Si los documentos
            parecen desaparecer, revisa primero el interruptor.
          </WarningBox>
        </DocCard>

        <DocCard icon={<ShieldCheck size={24} />} title="Remitentes Permitidos">
          <Lead>
            Por defecto, cualquier remitente puede iniciar un Run enviando un correo a la dirección.
            Agrega direcciones en <strong>Remitentes Permitidos</strong> dentro del panel del
            disparador y solo se aceptarán esos remitentes; el correo de cualquier otra persona se
            descarta sin aviso.
          </Lead>
          <BulletList
            items={[
              "Cada entrada es una dirección de correo completa, no un dominio. La comparación ignora mayúsculas y nombres para mostrar.",
              "Deja la lista vacía para aceptar correos de cualquier remitente.",
              "La lista está disponible en el disparador por email de Flows, Colecciones, Splitters, Pipelines, Matchers y Subjects.",
              <Fragment key="f4">
                Si reenvías desde un buzón compartido, el remitente que ve Tavnit suele ser el buzón
                que hace el reenvío, así que esa es la dirección que debes permitir.
              </Fragment>,
            ]}
          />
        </DocCard>

        <DocCard icon={<Mail size={24} />} title="Procesa el cuerpo del correo">
          <Lead>
            Algunos datos nunca llegan como adjunto: una confirmación de pedido, un aviso de reserva,
            un proveedor que escribe las cantidades en el mensaje. Activa{" "}
            <strong>Procesar Cuerpo del Correo</strong> y Tavnit convierte el cuerpo del mensaje en
            un PDF y lo procesa como cualquier otro documento. Está disponible en Flows y
            Colecciones.
          </Lead>
          <DataTable
            head={["Modo", "Qué pasa"]}
            rows={[
              [
                <Fragment key="f5"><strong>Solo cuando no hay adjuntos</strong> (predeterminado)</Fragment>,
                "El cuerpo se procesa solo cuando el correo no trae un documento adjunto. Una nota tipo “te envío el adjunto” junto a una factura se omite, así un correo nunca inicia dos Runs.",
              ],
              [
                <Fragment key="f6"><strong>Siempre</strong></Fragment>,
                "El cuerpo se procesa junto a cada adjunto, cada uno en su propio Run.",
              ],
            ]}
          />
          <BulletList
            items={[
              "El PDF del cuerpo aparece en la revisión como cualquier otro documento, y el Run queda marcado como proveniente del cuerpo del correo.",
              "Las cadenas de respuestas citadas y las firmas se eliminan cuando el proveedor de correo puede identificarlas.",
              "Las imágenes dentro del mensaje no se leen. Las imágenes insertadas en la firma no cuentan como adjuntos al decidir si se procesa el cuerpo.",
              "Un cuerpo casi sin texto (“ok”, “gracias”, un reenvío vacío) no se procesa.",
            ]}
          />
        </DocCard>

        <DocCard icon={<AtSign size={24} />} title="Qué funciones tienen dirección de correo">
          <Lead>
            El disparador por email no se limita a los Flows. Puedes apuntar una dirección a toda una
            etapa de clasificación, a un pipeline o a una comparación, en lugar de a un solo tipo de
            documento.
          </Lead>
          <DataTable
            head={["Enviar a", "Forma de la dirección", "Qué pasa"]}
            rows={[
              [
                "Un Flow",
                <Fragment key="f7"><InlineCode>flow-name-&lt;id&gt;@mg.tavnit.io</InlineCode></Fragment>,
                "Ese Flow extrae cada adjunto.",
              ],
              [
                "Una Colección",
                <Fragment key="f8"><InlineCode>name-&lt;id&gt;-collection@mg.tavnit.io</InlineCode></Fragment>,
                <Fragment key="f9">
                  Cada adjunto se clasifica y se envía al Flow o Splitter correcto. Consulta{" "}
                  <DocLink href="/es/documentacion/colecciones">cómo enrutan documentos las Colecciones</DocLink>.
                </Fragment>,
              ],
              [
                "Un Splitter",
                <Fragment key="f10"><InlineCode>&lt;id&gt;-splitter@mg.tavnit.io</InlineCode></Fragment>,
                <Fragment key="f11">
                  Cada adjunto se divide primero en sus documentos separados. Consulta{" "}
                  <DocLink href="/es/documentacion/splitters">cómo dividir archivos con varios documentos</DocLink>.
                </Fragment>,
              ],
              [
                "Un Pipeline",
                <Fragment key="f12"><InlineCode>&lt;id&gt;-pipeline@mg.tavnit.io</InlineCode></Fragment>,
                <Fragment key="f13">
                  Cada adjunto PDF o imagen inicia una ejecución. Consulta{" "}
                  <DocLink href="/es/documentacion/pipelines">Pipelines</DocLink>.
                </Fragment>,
              ],
              [
                "Un Matcher",
                <Fragment key="f14"><InlineCode>&lt;id&gt;-matcher@mg.tavnit.io</InlineCode></Fragment>,
                <Fragment key="f15">
                  Todos los adjuntos PDF o imagen de un correo se comparan juntos en un solo Match
                  (siempre en modo multilateral), y el resultado se responde en el mismo hilo.
                  Consulta <DocLink href="/es/documentacion/matchers">Matchers</DocLink>.
                </Fragment>,
              ],
              [
                "Un Subject",
                <Fragment key="f16"><InlineCode>&lt;id&gt;-subject@mg.tavnit.io</InlineCode></Fragment>,
                <Fragment key="f17">
                  Cada adjunto se archiva en el caso correcto según una referencia en el asunto, el
                  cuerpo o el nombre del archivo, o según la dirección propia del caso (con
                  etiqueta +). Consulta <DocLink href="/es/documentacion/subjects">Subjects</DocLink>.
                </Fragment>,
              ],
            ]}
            caption="Copia la dirección exacta desde el panel del disparador por email de cada función; estas formas solo sirven para distinguirlas."
          />
          <InfoBox color="violet" icon={<Workflow size={20} />} title="¿Qué dirección deben usar los proveedores?">
            Si un remitente siempre envía un solo tipo de documento, dale la dirección del Flow. Si
            envía una mezcla (facturas, órdenes de compra, guías de remisión), dale la dirección de
            la Colección y deja que Tavnit la clasifique. Si envía un solo PDF con varios documentos,
            dale la dirección del Splitter.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Paperclip size={24} />} title="Qué acepta Tavnit">
          <Lead>
            Los Flows, las Colecciones, los Splitters y los Subjects leen PDFs, imágenes comunes y
            hojas de cálculo. Los Pipelines y los Matchers solo leen PDFs e imágenes. Cualquier otro
            archivo del mensaje se omite sin afectar al resto: un archivo no compatible no impide que
            se procesen los demás adjuntos.
          </Lead>
          <DataTable
            head={["Aceptado", "Extensiones"]}
            rows={[
              ["Documentos PDF", <Fragment key="f18"><InlineCode>.pdf</InlineCode></Fragment>],
              [
                "Imágenes",
                <Fragment key="f19"><InlineCode>.png .jpg .jpeg .jfif .tif .tiff .webp .bmp .gif</InlineCode></Fragment>,
              ],
              [
                "Hojas de cálculo (no en Pipelines ni Matchers)",
                <Fragment key="f20"><InlineCode>.xlsx .xls .csv</InlineCode></Fragment>,
              ],
            ]}
          />
          <p>Un adjunto se omite en lugar de procesarse cuando se cumple alguna de estas condiciones:</p>
          <DataTable
            head={["Motivo de la omisión", "Cómo se ve"]}
            rows={[
              [
                "Tipo de archivo no compatible",
                "Documentos de Word, archivos comprimidos, reenvíos .eml y cualquier archivo sin una extensión reconocida.",
              ],
              ["Adjunto vacío", "Un archivo de cero bytes, normalmente un reenvío dañado."],
              [
                "Archivo ilegible",
                "Tiene una extensión válida pero no se puede abrir: una descarga incompleta, un archivo renombrado o una hoja de cálculo que no se puede leer.",
              ],
            ]}
          />
          <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Las imágenes de la firma cuentan como adjuntos">
            El logotipo de una firma de correo suele llegar como un adjunto de imagen, y un Flow lo
            procesa como cualquier otra imagen. Si eso genera Runs no deseados, reenvía solo los
            documentos, o usa Remitentes Permitidos y una regla de reenvío que elimine las imágenes
            insertadas.
          </InfoBox>
          <p>
            El límite de tamaño de adjuntos de tu proveedor de correo se aplica antes de que Tavnit
            reciba el mensaje. Si un escaneo grande rebota al enviarlo, súbelo en la app o envíalo a
            la <DocLink href="/es/documentacion/api">API REST</DocLink>.
          </p>
        </DocCard>

        <DocCard icon={<FileSpreadsheet size={24} />} title="Cómo se manejan las hojas de cálculo">
          <Lead>
            Una hoja de cálculo adjunta se trata como un documento, no como una tabla para importar.
            Lo que pasa depende de a dónde la envíes.
          </Lead>
          <DataTable
            head={["Enviada a", "Qué hace Tavnit"]}
            rows={[
              [
                "Un Flow",
                "Extrae de la primera hoja visible. El Run se cobra en equivalentes de página, según cuántas páginas ocuparía la hoja impresa.",
              ],
              [
                "Una Colección",
                "Clasifica el archivo por su primera hoja y luego lo pasa al Flow elegido, que lee la primera hoja visible.",
              ],
              [
                "Un Splitter",
                "Trata cada hoja visible y no vacía como un documento propio, clasifica cada una y la envía a su destino como un archivo de una sola hoja.",
              ],
            ]}
          />
          <p>
            Las hojas muy grandes se rechazan con un error antes de cobrar créditos. Para cargar una
            hoja de cálculo como filas estructuradas, usa una limpieza de un{" "}
            <DocLink href="/es/documentacion/cleaners">Cleaner</DocLink>.
          </p>
        </DocCard>

        <DocCard icon={<Copy size={24} />} title="Protección contra duplicados">
          <Lead>
            A veces los servidores de correo entregan el mismo mensaje más de una vez, por ejemplo
            después de un tiempo de espera agotado. Tavnit reconoce un mensaje reentregado a la misma
            dirección y no lo vuelve a procesar, así que un reintento nunca genera Runs ni cobros
            duplicados.
          </Lead>
          <BulletList
            items={[
              "Tavnit confirma la recepción del mensaje en segundos y procesa los adjuntos en segundo plano, así que puedes enviar un correo con muchos adjuntos sin problema.",
              "Si el procesamiento se interrumpe, continúa donde se quedó en lugar de empezar de nuevo.",
              "Un mensaje enviado a dos direcciones distintas de Tavnit se procesa una vez en cada dirección.",
              "Enviar el mismo archivo otra vez en un correo nuevo es un mensaje nuevo y se procesa de nuevo.",
            ]}
          />
        </DocCard>

        <DocCard icon={<Send size={24} />} title="Recibe los resultados por correo">
          <Lead>
            La Salida por Email es el camino de vuelta: cuando un Run termina con éxito, Tavnit envía
            el resultado a las direcciones que configures. Es independiente del disparador por
            email: puedes usar cualquiera de los dos por separado, o ambos para cerrar el ciclo de
            enviar y recibir.
          </Lead>
          <NumberedList
            items={[
              "Abre la página de detalle del Flow.",
              <Fragment key="f21">
                Abre el panel <strong>Salida por Email</strong>.
              </Fragment>,
              <Fragment key="f22">
                Agrega una o más <strong>Direcciones de Destinatarios</strong>.
              </Fragment>,
              <Fragment key="f23">
                Elige qué lleva cada mensaje en <strong>Adjuntos</strong> y guarda.
              </Fragment>,
            ]}
          />
          <DataTable
            head={["Opción", "Qué llega"]}
            rows={[
              ["Extracción JSON", "El resultado extraído como JSON con formato en el cuerpo del mensaje."],
              [
                "Extracción CSV",
                <Fragment key="f24">
                  Las filas como un adjunto <InlineCode>rows.csv</InlineCode>, la forma más rápida de
                  llevar los resultados a una hoja de cálculo.
                </Fragment>,
              ],
              [
                "Resultados de formulario",
                "Los PDFs completados, cuando el Flow llena una plantilla de formulario.",
              ],
              [
                "Documento original",
                "El archivo de origen (PDF, imagen u hoja de cálculo) que se procesó, adjunto junto a los resultados.",
              ],
            ]}
          />
          <InfoBox color="purple" icon={<Code2 size={20} />} title="Los campos de archivo llegan como enlaces">
            Los campos que contienen un archivo o una imagen no se incrustan en el JSON. Llegan como
            enlaces temporales, porque Tavnit mantiene privados los documentos almacenados: una ruta
            de almacenamiento sin firmar no se podría abrir desde una bandeja de entrada.
          </InfoBox>
          <BulletList
            items={[
              "El correo de salida solo se envía cuando el Run termina con éxito. Un Run fallido no envía nada.",
              "El asunto incluye el nombre del Flow más un detalle propio de cada Run, para que los clientes de correo no agrupen todos los Runs de un Flow en una sola conversación.",
              <Fragment key="f25">
                Si el Flow tiene activada la{" "}
                <DocLink href="/es/documentacion/revision-humana">Revisión Humana</DocLink>, el
                correo espera hasta que un revisor apruebe el Run.
              </Fragment>,
              <Fragment key="f26">
                Para entregas entre sistemas, un{" "}
                <DocLink href="/es/documentacion/webhooks">webhook</DocLink> encaja mejor que el
                correo.
              </Fragment>,
            ]}
          />
        </DocCard>

        <DocCard icon={<Workflow size={24} />} title="Ejemplo práctico: una bandeja de cuentas por pagar">
          <Lead>
            La configuración más común es un buzón compartido que ya recibe facturas de proveedores,
            reenviado a una Colección para que el formato de cada proveedor llegue al Flow correcto,
            con los resultados enviados por correo al equipo de finanzas y guardados en un Bucket.
          </Lead>
          <NumberedList
            items={[
              <Fragment key="f27">
                Crea un Flow por cada tipo de documento que recibes, por ejemplo{" "}
                <em>Facturas de proveedores</em> y <em>Guías de remisión</em>, y dale a cada uno una
                descripción clara.
              </Fragment>,
              <Fragment key="f28">
                Pon ambos Flows en una{" "}
                <DocLink href="/es/documentacion/colecciones">Colección</DocLink> y activa el
                disparador por email de la Colección. Agrega el buzón compartido a Remitentes
                Permitidos.
              </Fragment>,
              <Fragment key="f29">
                En el buzón compartido, reenvía a la dirección de la Colección cualquier mensaje con
                adjunto que venga de los dominios de tus proveedores.
              </Fragment>,
              <Fragment key="f30">
                En cada Flow, activa la <strong>Salida por Email</strong> con el adjunto CSV para el
                equipo de finanzas, y agrega una{" "}
                <DocLink href="/es/documentacion/buckets">exportación a Bucket</DocLink> para que los
                datos se acumulen en una sola tabla.
              </Fragment>,
              <Fragment key="f31">
                Agrega un <DocLink href="/es/documentacion/cleaners">Cleaner</DocLink> con una acción
                condicional que envíe a{" "}
                <DocLink href="/es/documentacion/revision-humana">Revisión Humana</DocLink> todo lo
                que supere tu umbral de aprobación antes de entregarlo.
              </Fragment>,
            ]}
          />
          <p>
            Nadie en finanzas tiene que abrir Tavnit. Las facturas llegan donde siempre, y los datos
            estructurados vuelven a la misma bandeja.
          </p>
        </DocCard>

        <DocCard icon={<LifeBuoy size={24} />} title="Solución de problemas">
          <Lead>
            Como el correo entrante se acepta sin aviso, un documento que no aparece no deja ningún
            error en tu bandeja. Revisa esta lista en orden: la causa casi siempre es el interruptor
            del disparador, los Remitentes Permitidos, el tipo de adjunto o una regla de reenvío que
            elimina los adjuntos.
          </Lead>
          <DataTable
            head={["Síntoma", "Causa probable", "Solución"]}
            rows={[
              [
                "No aparece ningún Run",
                "El disparador está apagado, la dirección pertenece a otro Flow o el remitente no está en Remitentes Permitidos.",
                "Revisa el interruptor y la lista de Remitentes Permitidos, y vuelve a copiar la dirección desde el panel del disparador.",
              ],
              [
                "Algunos adjuntos se procesaron y otros no",
                "Los que faltan son de un tipo no compatible, están vacíos o son ilegibles.",
                "Compara las extensiones con la lista de archivos aceptados.",
              ],
              [
                "Solo se procesó la imagen de la firma",
                "El documento real no venía adjunto: era un enlace o el reenvío lo eliminó.",
                "Reenvía como adjunto y no insertado, y verifica que la regla conserve los adjuntos.",
              ],
              [
                "Un correo sin adjuntos no hizo nada",
                "Procesar Cuerpo del Correo está apagado, o el cuerpo casi no tenía texto.",
                "Activa Procesar Cuerpo del Correo en el panel del disparador (Flows y Colecciones).",
              ],
              [
                "La nota del correo generó su propio Run",
                "Procesar Cuerpo del Correo está en modo Siempre.",
                "Cambia el modo a Solo cuando no hay adjuntos.",
              ],
              [
                "Los Runs aparecen pero fallan",
                "El problema es el documento, no el correo.",
                "Abre el Run y lee su registro; la falla está en la extracción.",
              ],
              [
                "Los resultados nunca llegan por correo",
                "La Salida por Email no está configurada, el Run falló o está esperando revisión.",
                "Revisa primero el estado del Run y luego la configuración de la Salida por Email.",
              ],
            ]}
          />
        </DocCard>

        <Related
          links={[
            {
              href: "/es/documentacion/colecciones",
              label: "Enruta documentos mixtos automáticamente con Colecciones",
              description:
                "Apunta una dirección de correo a varios Flows y deja que Tavnit elija el correcto para cada documento.",
            },
            {
              href: "/es/documentacion/splitters",
              label: "Divide archivos con varios documentos antes de extraer",
              description: "Para remitentes que juntan varios documentos en un solo adjunto.",
            },
            {
              href: "/es/documentacion/webhooks",
              label: "Entrega resultados a tus sistemas con webhooks",
              description:
                "La alternativa legible por máquinas a la Salida por Email, con reintentos.",
            },
            {
              href: "/es/documentacion/api",
              label: "Envía documentos por la API REST",
              description:
                "Para volúmenes y tamaños de archivo que el correo no admite, con manejo explícito de errores.",
            },
          ]}
        />
      </section>
    </>
  );
}
