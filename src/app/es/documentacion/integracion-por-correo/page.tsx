import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  AlertTriangle,
  AtSign,
  Code2,
  ExternalLink,
  Info,
  LifeBuoy,
  Mail,
  Paperclip,
  Send,
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
  name: "Extrae datos de archivos adjuntos con el disparador por correo de Tavnit",
  description:
    "Activa el disparador por correo en un Flow de Tavnit para obtener una dirección de correo propia y reenvíale documentos. Cada archivo adjunto compatible se convierte en su propio Run de extracción.",
  steps: [
    {
      name: "Abre el Flow",
      text: "Ve a \"Flows\" en la app de Tavnit y abre el Flow que quieres que reciba documentos.",
    },
    {
      name: "Activa el disparador por correo",
      text: "Busca la sección \"Email Trigger\" en la página de detalle del Flow y actívala. Tavnit le asigna al Flow una dirección de correo propia.",
    },
    {
      name: "Copia la dirección",
      text: "Copia la dirección de correo del Flow. Es única para ese Flow y no cambia si desactivas y vuelves a activar el disparador.",
    },
    {
      name: "Envía un documento de prueba",
      text: "Envía un solo PDF a la dirección y revisa la página \"Runs\". Aparece un nuevo Run con el origen \"Email\".",
    },
    {
      name: "Automatiza el reenvío",
      text: "Cuando la prueba funcione, agrega una regla en tu cliente de correo o buzón compartido que reenvíe automáticamente los mensajes que coincidan a la dirección.",
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
            Cada Flow de Tavnit puede tener su propia dirección de correo. Cuando activas el
            disparador por correo y envías un documento a esa dirección, Tavnit toma cada archivo
            adjunto compatible, crea un Run de extracción separado para cada uno y lo procesa
            exactamente como si lo hubieras subido en la app.
          </Lead>
          <p>
            No hay nada que instalar y nada revisa tu buzón: tú reenvías el correo a la dirección y
            Tavnit reacciona. Es el camino más corto de &ldquo;las facturas llegan por
            correo&rdquo; a &ldquo;las facturas llegan como filas estructuradas&rdquo;, sin nada de
            código.
          </p>
          <BulletList
            items={[
              "Reenviar facturas o recibos directamente desde tu bandeja de entrada",
              "Un buzón compartido de cuentas por pagar con una regla de reenvío automático",
              "Permitir que los proveedores envíen documentos sin darles acceso a Tavnit",
              "Procesar documentos de personas que nunca abren la app",
            ]}
          />
        </DocCard>

        <DocCard icon={<ExternalLink size={24} />} title="Activa el disparador por correo">
          <Lead>
            El disparador está desactivado de forma predeterminada. Actívalo desde la página de
            detalle del Flow, copia la dirección que te da y envía un documento de prueba antes de
            apuntar una regla de reenvío hacia ella.
          </Lead>
          <NumberedList
            items={[
              <Fragment key="f0">
                Ve a <strong>&ldquo;Flows&rdquo;</strong> y abre el Flow que quieres que reciba
                documentos.
              </Fragment>,
              <Fragment key="f1">
                Busca la sección <strong>&ldquo;Email Trigger&rdquo;</strong> y actívala.
              </Fragment>,
              "Copia la dirección de correo del Flow.",
              <Fragment key="f2">
                Envía un PDF a esa dirección y revisa la página <strong>&ldquo;Runs&rdquo;</strong>:
                aparece un nuevo Run con el origen <strong>&ldquo;Email&rdquo;</strong>.
              </Fragment>,
              "Cuando funcione, agrega la regla de reenvío en tu cliente de correo o buzón compartido.",
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Un Run por archivo adjunto">
            Un correo con tres facturas adjuntas genera tres Runs separados, cada uno con su propio
            resultado, su propio cobro de créditos y su propia fila en la lista de Runs. No genera un
            solo Run con tres documentos.
          </InfoBox>
          <WarningBox>
            Si el disparador está desactivado, el correo enviado a la dirección se acepta y se
            descarta: el remitente no recibe ningún rebote ni error. Si los documentos parecen
            desaparecer, revisa primero el interruptor.
          </WarningBox>
        </DocCard>

        <DocCard icon={<AtSign size={24} />} title="Flows, Collections y Splitters tienen cada uno su dirección">
          <Lead>
            El disparador por correo no se limita a los Flows. Las Collections y los Splitters también
            tienen sus propias direcciones de correo, así que puedes apuntar una dirección a toda una
            etapa de clasificación en lugar de a un solo tipo de documento.
          </Lead>
          <DataTable
            head={["Enviar a", "Forma de la dirección", "Qué pasa"]}
            rows={[
              [
                "Un Flow",
                <Fragment key="f3"><InlineCode>flow-name-&lt;id&gt;@mg.tavnit.io</InlineCode></Fragment>,
                "Ese Flow extrae cada archivo adjunto.",
              ],
              [
                "Una Collection",
                <Fragment key="f4"><InlineCode>name-&lt;id&gt;-collection@mg.tavnit.io</InlineCode></Fragment>,
                <Fragment key="f5">
                  Cada archivo adjunto se clasifica y se envía al Flow correcto. Consulta{" "}
                  <DocLink href="/es/documentacion/collections">cómo las Collections enrutan documentos</DocLink>.
                </Fragment>,
              ],
              [
                "Un Splitter",
                <Fragment key="f6"><InlineCode>name-&lt;id&gt;-splitter@mg.tavnit.io</InlineCode></Fragment>,
                <Fragment key="f7">
                  Primero, cada archivo adjunto se divide en sus documentos separados. Consulta{" "}
                  <DocLink href="/es/documentacion/splitters">cómo dividir PDFs con varios documentos</DocLink>.
                </Fragment>,
              ],
            ]}
            caption="Copia la dirección exacta desde la página de detalle de cada elemento; las formas de arriba solo sirven para distinguirlas."
          />
          <InfoBox color="violet" icon={<Workflow size={20} />} title="¿Qué dirección deben usar los proveedores?">
            Si un remitente solo envía un tipo de documento, dale la dirección del Flow. Si envía una
            mezcla (facturas, órdenes de compra, remisiones), dale la dirección de la Collection y
            deja que Tavnit los clasifique. Si envía un PDF que contiene varios documentos, dale la
            dirección del Splitter.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Paperclip size={24} />} title="Qué acepta Tavnit">
          <Lead>
            Tavnit lee archivos adjuntos PDF y de imagen comunes. Todo lo demás en el mensaje se
            ignora sin afectar al resto: un archivo no compatible no impide que se procesen los demás
            archivos adjuntos.
          </Lead>
          <DataTable
            head={["Se acepta", "Extensiones"]}
            rows={[
              ["Documentos PDF", <Fragment key="f8"><InlineCode>.pdf</InlineCode></Fragment>],
              [
                "Imágenes",
                <Fragment key="f9"><InlineCode>.png .jpg .jpeg .tif .tiff .webp .bmp .gif</InlineCode></Fragment>,
              ],
            ]}
          />
          <p>
            Un archivo adjunto se omite en lugar de procesarse cuando se cumple cualquiera de estas
            condiciones:
          </p>
          <DataTable
            head={["Motivo de la omisión", "Cómo se ve"]}
            rows={[
              [
                "Tipo de archivo no compatible",
                "Aquí entran los documentos de Office, los archivos comprimidos, los reenvíos .eml y las imágenes de firma.",
              ],
              ["Archivo adjunto vacío", "Un archivo de cero bytes, normalmente un reenvío dañado."],
              [
                "Archivo ilegible",
                "El archivo tiene una extensión válida pero no se puede abrir como documento: una descarga incompleta o un archivo renombrado.",
              ],
            ]}
          />
          <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="El asunto y el cuerpo nunca se leen">
            Solo se procesan los archivos adjuntos. Las notas en el cuerpo del mensaje, los números de
            referencia en el asunto y las imágenes incrustadas en la firma se ignoran. Si un valor
            importa, tiene que estar en el documento.
          </InfoBox>
          <p>
            El límite de tamaño de archivos adjuntos de tu proveedor de correo se aplica antes de que
            Tavnit vea el mensaje. Si un escaneo grande rebota al enviarlo, súbelo en la app o envíalo
            a la <DocLink href="/es/documentacion/api">API REST</DocLink>.
          </p>
        </DocCard>

        <DocCard icon={<Send size={24} />} title="Recibe los resultados por correo">
          <Lead>
            Email Output es el camino de regreso: cuando un Run termina con éxito, Tavnit envía el
            resultado por correo a las direcciones que configures. Es independiente del disparador
            por correo: puedes usar cualquiera de los dos por separado, o ambos para cerrar el ciclo
            completo de enviar y recibir.
          </Lead>
          <NumberedList
            items={[
              "Abre la página de detalle del Flow.",
              <Fragment key="f10">
                Busca la sección <strong>&ldquo;Email Output&rdquo;</strong>.
              </Fragment>,
              "Agrega una o más direcciones de destinatarios.",
              <Fragment key="f11">
                Elige qué lleva cada mensaje en <strong>&ldquo;Attachments&rdquo;</strong> y guarda.
              </Fragment>,
            ]}
          />
          <DataTable
            head={["Opción", "Qué llega"]}
            rows={[
              [
                "JSON extraction",
                "El resultado extraído como JSON con formato en el cuerpo del mensaje.",
              ],
              [
                "CSV extraction",
                <Fragment key="f12">
                  Las filas como archivo adjunto <InlineCode>rows.csv</InlineCode>: la forma más
                  rápida de llevar los resultados a una hoja de cálculo.
                </Fragment>,
              ],
              [
                "Original document",
                "El PDF o la imagen de origen que se procesó, adjunto junto con los resultados.",
              ],
              [
                "Form results",
                "El PDF completado, cuando el Flow llena una plantilla de formulario.",
              ],
            ]}
          />
          <InfoBox color="purple" icon={<Code2 size={20} />} title="Los campos de archivo llegan como enlaces">
            Los campos que contienen un archivo o una imagen no se incrustan en el JSON. Llegan como
            enlaces temporales, porque Tavnit mantiene privados los documentos almacenados: una ruta
            de almacenamiento sin procesar no se podría abrir desde una bandeja de entrada.
          </InfoBox>
          <BulletList
            items={[
              "El correo de salida solo se envía en los Runs que terminan con éxito. Un Run fallido no envía nada.",
              "El asunto incluye el nombre del Flow y un detalle propio de cada Run, para que los clientes de correo no agrupen todos los Runs de un Flow en una sola conversación.",
              <Fragment key="f13">
                Si el Flow tiene activada la{" "}
                <DocLink href="/es/documentacion/revision-humana">revisión humana</DocLink>, el correo
                espera hasta que un revisor apruebe el Run.
              </Fragment>,
              <Fragment key="f14">
                Para la entrega entre sistemas, un{" "}
                <DocLink href="/es/documentacion/webhooks">webhook</DocLink> es mejor opción que el
                correo.
              </Fragment>,
            ]}
          />
        </DocCard>

        <DocCard icon={<Workflow size={24} />} title="Ejemplo práctico: un buzón de cuentas por pagar">
          <Lead>
            La configuración más común es un buzón compartido que ya recibe facturas de proveedores,
            reenviado a una Collection para que el formato de cada proveedor llegue al Flow correcto,
            con los resultados enviados por correo al equipo de finanzas y exportados a un Bucket.
          </Lead>
          <NumberedList
            items={[
              <Fragment key="f15">
                Crea un Flow por cada tipo de documento que recibes, por ejemplo{" "}
                <em>Supplier Invoices</em> y <em>Delivery Notes</em>, y dale a cada uno una
                descripción clara.
              </Fragment>,
              <Fragment key="f16">
                Pon ambos Flows en una <DocLink href="/es/documentacion/collections">Collection</DocLink>{" "}
                y activa el disparador por correo de la Collection.
              </Fragment>,
              <Fragment key="f17">
                En el buzón compartido, reenvía a la dirección de la Collection cualquier mensaje con
                archivos adjuntos que venga de los dominios de tus proveedores.
              </Fragment>,
              <Fragment key="f18">
                En cada Flow, activa <strong>&ldquo;Email Output&rdquo;</strong> con el archivo
                adjunto CSV para el equipo de finanzas y agrega una{" "}
                <DocLink href="/es/documentacion/buckets">exportación a un Bucket</DocLink> para que
                los datos se acumulen en una sola tabla.
              </Fragment>,
              <Fragment key="f19">
                Agrega un <DocLink href="/es/documentacion/cleaners">Cleaner</DocLink> con una acción
                condicional que envíe todo lo que supere tu umbral de aprobación a{" "}
                <DocLink href="/es/documentacion/revision-humana">revisión humana</DocLink> antes de
                entregarlo.
              </Fragment>,
            ]}
          />
          <p>
            Nadie en finanzas tiene que abrir Tavnit. Las facturas llegan a donde siempre llegaron, y
            los datos estructurados vuelven a la misma bandeja de entrada.
          </p>
        </DocCard>

        <DocCard icon={<LifeBuoy size={24} />} title="Solución de problemas">
          <Lead>
            Como el correo entrante se acepta sin avisar, un documento que no aparece no deja ningún
            error en tu bandeja de entrada. Revisa esta lista en orden: la causa casi siempre es el
            interruptor del disparador, el tipo de archivo adjunto o una regla de reenvío que elimina
            los archivos adjuntos.
          </Lead>
          <DataTable
            head={["Síntoma", "Causa probable", "Solución"]}
            rows={[
              [
                "No aparece ningún Run",
                "El disparador por correo está desactivado, o la dirección pertenece a otro Flow.",
                "Revisa el interruptor y vuelve a copiar la dirección desde la página de detalle del Flow.",
              ],
              [
                "Algunos archivos adjuntos se procesaron y otros no",
                "Los que faltan son de un tipo no compatible, están vacíos o son ilegibles.",
                "Compara las extensiones con la lista de formatos aceptados de arriba.",
              ],
              [
                "Solo se procesó la imagen de la firma",
                "El documento real no se adjuntó: se envió como enlace o el reenvío lo eliminó.",
                "Reenvía como archivo adjunto y no incrustado, y verifica que la regla conserve los archivos adjuntos.",
              ],
              [
                "Los Runs aparecen pero fallan",
                "El problema es el documento en sí, no el camino del correo.",
                "Abre el Run y lee su registro; la falla es un problema de extracción.",
              ],
              [
                "Los resultados nunca llegan por correo",
                "Email Output no está configurado, el Run falló o está esperando revisión.",
                "Revisa primero el estado del Run y luego la configuración de Email Output.",
              ],
            ]}
          />
        </DocCard>

        <Related
          links={[
            {
              href: "/es/documentacion/collections",
              label: "Enruta documentos mixtos automáticamente con Collections",
              description:
                "Apunta una dirección de correo a varios Flows y deja que Tavnit elija el correcto para cada documento.",
            },
            {
              href: "/es/documentacion/splitters",
              label: "Divide PDFs con varios documentos antes de la extracción",
              description:
                "Para remitentes que juntan varios documentos en un solo archivo adjunto.",
            },
            {
              href: "/es/documentacion/webhooks",
              label: "Entrega resultados a tus propios sistemas con webhooks",
              description:
                "La alternativa legible por máquinas a Email Output, con reintentos.",
            },
            {
              href: "/es/documentacion/api",
              label: "Envía documentos por la API REST",
              description:
                "Para volúmenes y tamaños de archivo que el correo no puede manejar, con manejo explícito de errores.",
            },
          ]}
        />
      </section>
    </>
  );
}
