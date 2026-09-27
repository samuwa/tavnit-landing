import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  AlertTriangle,
  ArrowLeftRight,
  BarChart3,
  Download,
  FilePlus,
  FileSpreadsheet,
  Info,
  Mail,
  Route,
  Sparkles,
  Split,
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

export const metadata = docMetadata("splitters", "es");

const SPLIT_SOURCE_FILE = `curl "https://run.tavnit.io/api/splits/<split_id>/source-file" \\
  -H "X-API-Key: tvnt_your_key_here"

# O descarga el archivo directamente
curl "https://run.tavnit.io/api/splits/<split_id>/source-file?download=true" \\
  -H "X-API-Key: tvnt_your_key_here" -OJ`;

/** Refleja los pasos numerados visibles en "Crea un Splitter". */
const HOW_TO = {
  name: "Divide un archivo con varios documentos en documentos separados con Tavnit",
  description:
    "Crea un Splitter de Tavnit, describe los tipos de documento que debe reconocer y asigna a cada uno un destino para que cada parte de un PDF o libro de cálculo se procese por separado.",
  steps: [
    {
      name: "Crea el Splitter",
      text: "Abre Splitters en la app de Tavnit, haz clic en Crear Splitter y ponle un Nombre del Splitter que describa los paquetes que recibirá.",
    },
    {
      name: "Describe cada tipo de documento",
      text: "Haz clic en Agregar Tipo de Documento por cada tipo de documento del paquete, con un título y una descripción de cómo se ve, o haz clic en Sugerir con IA y sube un paquete de ejemplo.",
    },
    {
      name: "Configura la automatización de salida",
      text: "En Automatización de salida, elige qué pasa con cada documento identificado: Ninguno, Enviar a Flow, Enviar a colección o Enviar por email.",
    },
    {
      name: "Ejecuta una división",
      text: "Haz clic en Dividir y sube uno o más PDFs u hojas de cálculo, o envíalos a la dirección de correo del Splitter. Tavnit segmenta cada archivo, clasifica cada segmento y lo envía a su destino.",
    },
    {
      name: "Revisa el resultado",
      text: "Abre la división desde el Historial de Divisiones para ver cada documento, su rango de páginas, el tipo con el que coincidió y a dónde se envió.",
    },
  ],
};

export default function Page() {
  return (
    <>
      <DocsPageSchema
        slug="splitters"
        locale="es"
        howTo={HOW_TO}
        primaryImage={{
          url: "/assets/docs-splitter-doctypes-2026-08.jpg",
          caption: "Los tipos de documento de un Splitter de Tavnit, cada uno con su propio destino.",
          width: 1327,
          height: 801,
        }}
      />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
          Splitters
        </h1>

        <DocCard icon={<Split size={24} />} title="Qué hace un Splitter">
          <Lead>
            Un Splitter toma un archivo que contiene varios documentos y lo divide en sus partes
            separadas. Lee cada página, determina dónde termina un documento y empieza el siguiente,
            clasifica cada segmento según los tipos de documento que describiste y envía cada parte a
            su destino por separado.
          </Lead>
          <p>
            El caso típico es un escáner o un proveedor que envía por correo un solo PDF con una
            factura, una lista de empaque y una guía de remisión firmada. Extraer eso como un solo
            documento da resultados sin sentido. Un Splitter lo convierte en tres documentos y cada
            uno llega al Flow correcto. Los Splitters también aceptan hojas de cálculo, donde cada
            hoja se convierte en su propio documento.
          </p>
          <InfoBox color="purple" icon={<ArrowLeftRight size={20} />} title="¿Splitter o Colección?">
            Una <DocLink href="/es/documentacion/colecciones">Colección</DocLink> responde
            &ldquo;¿a qué Flow pertenece este <em>documento</em>?&rdquo;. Un Splitter responde
            &ldquo;¿cuántos documentos hay en este <em>archivo</em> y a dónde va cada uno?&rdquo;.
            Usa una Colección cuando cada archivo contiene un solo documento de tipo desconocido; usa
            un Splitter cuando un archivo contiene varios.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Info size={24} />} title="Cómo funciona la segmentación">
          <Lead>
            Cada página se examina en orden y se asigna a exactamente un segmento. Los segmentos
            nunca se superponen ni dejan huecos, así que cada página del archivo termina en algún
            lugar: no se pierden páginas sin aviso.
          </Lead>
          <p>Las reglas que aplica Tavnit para decidir dónde termina un documento:</p>
          <DataTable
            head={["Situación", "Qué pasa"]}
            rows={[
              [
                "Los encabezados y logotipos se repiten en cada página",
                "No se considera un documento nuevo. Un membrete repetido en una factura de cinco páginas sigue siendo una sola factura.",
              ],
              [
                "Cambia el título, el emisor, la contraparte, el número de documento, el formato o la fecha",
                "Se considera un límite real: empieza un nuevo segmento.",
              ],
              [
                "Anexos, fotos, cotizaciones y capturas de pantalla",
                "Siempre forman su propio segmento, aunque estén justo antes o después de un documento identificado.",
              ],
              [
                "Un segmento no coincide con ninguno de tus tipos de documento",
                "Se genera de todos modos y aparece en Otros Documentos. Nunca se une a un segmento vecino solo para evitar un resultado sin coincidencia.",
              ],
            ]}
          />
          <WarningBox>
            No hay puntaje de confianza. Un segmento coincide con un tipo de documento o no coincide
            con ninguno: el clasificador tiene la instrucción de responder &ldquo;sin
            coincidencia&rdquo; en lugar de adivinar. Los segmentos sin coincidencia son lo primero
            que debes revisar cuando una división no hace lo que esperabas.
          </WarningBox>
        </DocCard>

        <DocCard icon={<FilePlus size={24} />} title="Crea un Splitter">
          <Lead>
            Un Splitter es una lista de tipos de documento. Cada uno tiene un título, una descripción
            de cómo se ve y un destino opcional. No hay reglas que escribir: la descripción es lo que
            usa el clasificador para decidir.
          </Lead>
          <NumberedList
            items={[
              <Fragment key="f0">
                Abre <strong>Splitters</strong>, haz clic en <strong>Crear Splitter</strong> y escribe
                un <strong>Nombre del Splitter</strong> según el paquete que recibe, por ejemplo{" "}
                <em>Paquetes de entrega de proveedores</em> en lugar de <em>Splitter 2</em>.
              </Fragment>,
              <Fragment key="f1">
                Haz clic en <strong>Agregar Tipo de Documento</strong> por cada tipo de documento del
                paquete, con un título y una descripción de lo que aparece en la página. Se necesita
                al menos uno. También puedes hacer clic en <strong>Sugerir con IA</strong> (ver más
                abajo) para redactarlos a partir de un ejemplo.
              </Fragment>,
              <Fragment key="f2">
                En <strong>Automatización de salida</strong>, elige un destino para cada tipo (ver la
                tabla más abajo).
              </Fragment>,
              <Fragment key="f3">
                Haz clic en <strong>Dividir</strong> y sube un paquete, o envíalo a la dirección de
                correo del Splitter.
              </Fragment>,
              <Fragment key="f4">
                Abre la división terminada en el <strong>Historial de Divisiones</strong> y revisa
                el rango de páginas y la coincidencia de cada documento.
              </Fragment>,
            ]}
          />
          <Screenshot
            src="/assets/docs-splitter-doctypes-2026-08.jpg"
            alt="La página de detalle de un Splitter de Tavnit con dos tipos de documento configurados, uno con la etiqueta Send to flow: Invoice Processor y otro con Send to collection: Second collection, y en el panel izquierdo Doc Types, Split History, Email Trigger y Splitter ID."
            caption="Cada tipo de documento tiene su propio destino: un Flow, una Colección, una dirección de correo o ninguno."
          />
          <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Las descripciones hacen el trabajo">
            La descripción es lo único que distingue un tipo de documento de otro. Escribe lo que una
            persona miraría para diferenciarlos y di lo que <em>no</em> es: &ldquo;lista de empaque:
            muestra cantidades sin precios, recuadro de firma al pie. NO es la factura&rdquo; funciona
            mucho mejor que &ldquo;lista de empaque&rdquo;.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Sparkles size={24} />} title="Deja que la IA sugiera los tipos de documento">
          <Lead>
            Si tienes a mano un paquete real, el asistente puede redactar los tipos de documento por
            ti. Lee un ejemplo, propone un tipo por cada documento distinto que encuentra y escribe
            descripciones pensadas para diferenciarlos.
          </Lead>
          <NumberedList
            items={[
              <Fragment key="f5">
                Mientras creas el Splitter, haz clic en <strong>Sugerir con IA</strong> junto a Tipos
                de Documento.
              </Fragment>,
              "Si quieres, describe qué tipo de paquetes recibirá el Splitter. Ayuda al asistente a nombrar los tipos como lo hace tu equipo.",
              <Fragment key="f6">
                Sube un paquete de ejemplo: un PDF que mezcle varios documentos, de hasta 25 páginas.
              </Fragment>,
              <Fragment key="f7">
                Revisa las propuestas. Cada una muestra las páginas donde se encontró; desmarca las que
                no quieras (las páginas marcadas como <strong>No es un tipo de documento</strong>{" "}
                quedan fuera) y edita los títulos y descripciones en la misma fila.
              </Fragment>,
              <Fragment key="f8">
                Haz clic en <strong>Agregar N documentos</strong> (N es la cantidad que conservaste)
                para añadirlos al Splitter y luego configura sus destinos.
              </Fragment>,
            ]}
          />
          <p>
            Analizar el ejemplo no ejecuta una división. No se guarda nada hasta que creas el
            Splitter.
          </p>
        </DocCard>

        <DocCard icon={<Route size={24} />} title="A dónde va cada documento">
          <Lead>
            Los destinos se configuran por tipo de documento, no por Splitter. Eso permite que un
            solo paquete se reparta: las facturas a un Flow de extracción, las guías de remisión a una
            Colección y todo lo demás por correo a una persona.
          </Lead>
          <DataTable
            head={["Automatización de salida", "Qué pasa con el segmento"]}
            rows={[
              [
                "Enviar a Flow",
                "Se crea un Run de extracción normal para ese segmento, etiquetado con la división y el tipo de documento de donde vino.",
              ],
              [
                "Enviar a colección",
                <Fragment key="f9">
                  La <DocLink href="/es/documentacion/colecciones">Colección</DocLink> vuelve a
                  clasificar el segmento y lo envía al Flow que corresponda.
                </Fragment>,
              ],
              [
                "Enviar por email",
                "El segmento se envía como adjunto (un PDF, o una hoja de cálculo de una sola hoja en el caso de libros) a la dirección que indiques.",
              ],
              [
                "Ninguno",
                "El segmento se conserva en el resultado de la división, listo para descargar, pero no se envía a ningún lado.",
              ],
            ]}
          />
          <p>
            Los segmentos que no coinciden con ningún tipo de documento nunca se envían. Quedan en el
            resultado de la división, en Otros Documentos, donde puedes descargarlos.
          </p>
          <InfoBox color="green" icon={<Info size={20} />} title="Los ciclos están bloqueados">
            Un Splitter puede alimentar a una Colección, y una Colección puede enrutar a un Splitter.
            En el selector de Colecciones, cualquier Colección que enrute de vuelta a este Splitter
            aparece deshabilitada con la etiqueta <strong>enruta a este Splitter</strong>, y al
            ejecutarse un segmento nunca se envía a una Colección que lo devolvería al mismo Splitter.
            Así, una configuración errónea no puede hacer girar documentos en círculo.
          </InfoBox>
          <p>
            Los Runs creados a partir de un segmento conservan su origen. El payload del webhook de
            esos Runs incluye la división de la que vinieron y el tipo de documento con el que
            coincidieron, para que puedas rastrear una fila hasta el paquete original. Consulta{" "}
            <DocLink href="/es/documentacion/webhooks">los payloads de webhook</DocLink>.
          </p>
          <p>
            Cuando un Splitter se ejecuta dentro de un{" "}
            <DocLink href="/es/documentacion/pipelines">Pipeline</DocLink>, las conexiones del
            Pipeline deciden a dónde va cada tipo de documento y la automatización de salida del
            Splitter no se ejecuta, así que nada se envía dos veces.
          </p>
        </DocCard>

        <DocCard icon={<FileSpreadsheet size={24} />} title="Dividir hojas de cálculo">
          <Lead>
            En un libro de cálculo, las hojas son los límites. Cada hoja visible y no vacía se
            convierte en su propio documento; la IA solo decide a qué tipo de documento corresponde
            cada hoja.
          </Lead>
          <BulletList
            items={[
              <Fragment key="f10">
                Formatos aceptados: <InlineCode>.xlsx</InlineCode>, <InlineCode>.xls</InlineCode> y{" "}
                <InlineCode>.csv</InlineCode>. Un CSV es una sola hoja.
              </Fragment>,
              "Las hojas ocultas y vacías se ignoran. Un libro sin ninguna hoja visible y no vacía se rechaza.",
              "Cada hoja se envía a su destino como una hoja de cálculo de una sola hoja, así el Flow que la recibe obtiene una hoja de cálculo real.",
              "En el resultado de la división, el rango de páginas de una hoja indica su posición en el libro.",
              "Las hojas muy grandes se rechazan con un error.",
            ]}
          />
        </DocCard>

        <DocCard icon={<Mail size={24} />} title="Cómo enviar archivos a un Splitter">
          <Lead>
            Un Splitter acepta archivos de tres formas: subidos en la app, enviados a la API o por
            correo a su propia dirección. Cada archivo se convierte en su propia división.
          </Lead>
          <DataTable
            head={["Vía", "Cómo funciona"]}
            rows={[
              [
                "Subida en la app",
                <Fragment key="f11">
                  Haz clic en <strong>Dividir</strong>, elige el Splitter en{" "}
                  <strong>Dividir Documento</strong> y suelta uno o más PDFs u hojas de cálculo. Cada
                  archivo inicia su propia división.
                </Fragment>,
              ],
              [
                "API",
                <Fragment key="f12">
                  Envía el archivo con el ID del Splitter a <InlineCode>/splits/run</InlineCode>. La
                  API también acepta imágenes. Copia el ID desde el panel{" "}
                  <strong>ID del Splitter</strong>; consulta{" "}
                  <DocLink href="/es/documentacion/api">la página de la API</DocLink>.
                </Fragment>,
              ],
              [
                "Correo",
                <Fragment key="f13">
                  Abre el panel <strong>Disparador por Email</strong>, actívalo y reenvía los
                  paquetes a la <strong>Dirección de Bandeja</strong>. Cada adjunto PDF, imagen u
                  hoja de cálculo se convierte en su propia división. Usa Remitentes Permitidos para
                  limitar quién puede enviar.
                </Fragment>,
              ],
            ]}
          />
          <p>
            Los tipos de adjunto aceptados, los motivos por los que se puede omitir un archivo y la
            protección contra duplicados son los mismos que en el resto de Tavnit. Consulta{" "}
            <DocLink href="/es/documentacion/integracion-por-correo">integración por correo</DocLink>.
            Si el disparador está apagado, el correo se acepta y se descarta sin rebote.
          </p>
        </DocCard>

        <DocCard icon={<BarChart3 size={24} />} title="Cómo leer el resultado de una división">
          <Lead>
            Abre una división desde el <strong>Historial de Divisiones</strong> para ver qué decidió
            el Splitter. La división está en proceso hasta que el aviso la muestra como completada o
            fallida; una división fallida muestra el error.
          </Lead>
          <BulletList
            items={[
              "Páginas y Docs Encontrados del archivo completo",
              "De dónde vino el archivo y, si llegó por correo, el remitente",
              "Documentos Detectados: cada segmento que coincidió con un tipo, con su rango de páginas, su destino y el estado de su envío",
              "Otros Documentos: los segmentos sin coincidencia, lo primero que debes revisar cuando una división sale mal",
              "Ver Run en cualquier segmento enviado a un Flow, y Descargar en todos los segmentos",
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Cómo corregir una mala división">
            Los límites equivocados suelen significar que dos tipos de documento están descritos de
            forma demasiado parecida. Las coincidencias equivocadas suelen significar que una
            descripción es demasiado vaga. En ambos casos la solución está en las descripciones de
            los tipos de documento, no en el archivo.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Download size={24} />} title="Cómo recuperar el archivo original">
          <Lead>
            Tavnit conserva el paquete exactamente como se subió. Descárgalo desde el enlace{" "}
            <strong>Archivo Original</strong> en los Detalles de División, u obtenlo por la API con
            el ID de la división.
          </Lead>
          <CodeBlock lang="Shell" code={SPLIT_SOURCE_FILE} />
          <p>
            La respuesta predeterminada es un JSON con una <InlineCode>url</InlineCode> firmada y
            temporal (7 días, salvo que indiques un <InlineCode>expires_in</InlineCode> menor en
            segundos); <InlineCode>download=true</InlineCode> devuelve el archivo directamente.
            Devuelve el paquete completo, no los segmentos: cada segmento enviado a un Flow es un Run
            propio, con su propio archivo de origen.
          </p>
        </DocCard>

        <Related
          links={[
            {
              href: "/es/documentacion/colecciones",
              label: "Enruta documentos individuales con Colecciones",
              description:
                "La otra mitad de la clasificación, y un destino válido para los segmentos de una división.",
            },
            {
              href: "/es/documentacion/integracion-por-correo",
              label: "Dale a un Splitter su propia bandeja de entrada",
              description:
                "Formas de las direcciones, tipos de adjunto aceptados y por qué se puede omitir un adjunto.",
            },
            {
              href: "/es/documentacion/mapa-del-pipeline",
              label: "Mira los Splitters en el Mapa de Pipeline",
              description: "Cómo se conectan de principio a fin los Splitters, las Colecciones, los Flows y los Cleaners.",
            },
          ]}
        />
      </section>
    </>
  );
}
