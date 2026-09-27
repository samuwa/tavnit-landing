import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  AlertTriangle,
  ArrowLeftRight,
  BarChart3,
  Coins,
  FilePlus,
  Info,
  Mail,
  Route,
  Split,
} from "lucide-react";
import {
  BulletList,
  DataTable,
  DocCard,
  DocLink,
  InfoBox,
  Lead,
  NumberedList,
  Related,
  Screenshot,
  WarningBox,
} from "@/components/docs/ui";

export const metadata = docMetadata("splitters", "es");

/** Refleja los pasos numerados visibles en "Crea un Splitter". */
const HOW_TO = {
  name: "Divide un PDF con varios documentos en archivos separados con Tavnit",
  description:
    "Crea un Splitter de Tavnit, describe los tipos de documento que debe reconocer y dale a cada uno un destino para que cada parte de un PDF combinado se procese por separado.",
  steps: [
    {
      name: "Crea el Splitter",
      text: "Abre \"Splitters\" en la app de Tavnit y crea uno nuevo, con un nombre que describa el tipo de paquete que recibirá.",
    },
    {
      name: "Describe cada tipo de documento",
      text: "Agrega un tipo de documento por cada clase de documento que aparece en el paquete, con un título y una descripción de cómo se ve en la página.",
    },
    {
      name: "Dale un destino a cada tipo",
      text: "Elige qué pasa con cada segmento que coincide: enviarlo a un Flow, enviarlo a una Collection, enviarlo por correo o no hacer nada.",
    },
    {
      name: "Ejecuta una división",
      text: "Sube un PDF combinado o envíalo a la dirección de correo del Splitter. Tavnit segmenta el archivo, clasifica cada segmento y lo envía a su destino.",
    },
    {
      name: "Revisa el historial de divisiones",
      text: "Abre la división completada para ver cada segmento, su rango de páginas, con qué tipo de documento coincidió y a dónde se envió.",
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
          caption:
            "Los tipos de documento de un Splitter de Tavnit, cada uno con su propio destino.",
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
            factura, una lista de empaque y una remisión firmada. Extraer eso como un solo documento
            da resultados sin sentido. Un Splitter lo convierte en tres documentos y cada uno llega
            al Flow correcto.
          </p>
          <InfoBox
            color="purple"
            icon={<ArrowLeftRight size={20} />}
            title="¿Splitter o Collection?"
          >
            Una <DocLink href="/es/documentacion/collections">Collection</DocLink> responde
            &ldquo;¿a qué Flow pertenece este <em>documento</em>?&rdquo;. Un Splitter responde
            &ldquo;¿cuántos documentos hay en este <em>archivo</em> y a dónde va cada uno?&rdquo;.
            Usa una Collection cuando cada archivo contiene un solo documento de tipo desconocido;
            usa un Splitter cuando un archivo contiene varios.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Info size={24} />} title="Cómo funciona la segmentación">
          <Lead>
            Cada página se examina en orden y se asigna a exactamente un segmento. Los segmentos
            nunca se superponen ni dejan huecos, así que cada página del archivo de entrada termina en
            algún lugar: no se pierden páginas sin aviso.
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
                "Siempre forman su propio segmento, aunque estén justo antes o después de un documento que coincide.",
              ],
              [
                "Un segmento no coincide con ninguno de tus tipos de documento",
                "Se genera de todos modos, marcado como sin coincidencia. Nunca se une a un segmento vecino solo para evitar un resultado sin coincidencia.",
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
            de cómo se ve y un destino. No hay muestras que subir ni reglas que escribir: la
            descripción es lo que el clasificador compara.
          </Lead>
          <NumberedList
            items={[
              <Fragment key="f0">
                Abre <strong>&ldquo;Splitters&rdquo;</strong> y crea uno nuevo, con el nombre del
                paquete que recibe: <em>Paquetes de entrega de proveedores</em> en lugar de{" "}
                <em>Splitter 2</em>.
              </Fragment>,
              <Fragment key="f1">
                Agrega un <strong>tipo de documento</strong> por cada clase de documento del paquete,
                con un título y una descripción de lo que aparece en la página.
              </Fragment>,
              <Fragment key="f2">Dale un destino a cada tipo (consulta la tabla de abajo).</Fragment>,
              <Fragment key="f3">Sube un PDF combinado o envíalo a la dirección de correo del Splitter.</Fragment>,
              <Fragment key="f4">
                Abre la división completada en <strong>&ldquo;Split History&rdquo;</strong> y revisa
                el rango de páginas y la coincidencia de cada segmento.
              </Fragment>,
            ]}
          />
          <Screenshot
            src="/assets/docs-splitter-doctypes-2026-08.jpg"
            alt="La página de detalle de un Splitter de Tavnit con dos tipos de documento configurados, uno con la etiqueta Send to flow: Invoice Processor y el otro Send to collection: Second collection, con Doc Types, Split History, Email Trigger y Splitter ID en el panel izquierdo."
            caption="Cada tipo de documento tiene su propio destino: un Flow, una Collection, una dirección de correo o ninguno."
          />
          <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Las descripciones hacen el trabajo">
            La descripción es lo único que distingue un tipo de documento de otro. Escribe lo que una
            persona miraría para diferenciarlos: &ldquo;lista de empaque: muestra cantidades sin
            precios, con un recuadro de firma al pie&rdquo; funciona mejor que &ldquo;lista de
            empaque&rdquo;.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Route size={24} />} title="A dónde va cada segmento">
          <Lead>
            Los destinos se configuran por tipo de documento, no por Splitter. Eso es lo que permite
            que un paquete se reparta: las facturas a un Flow de extracción, las remisiones a una
            Collection y todo lo demás por correo a una persona.
          </Lead>
          <DataTable
            head={["Destino", "Qué pasa con el segmento"]}
            rows={[
              [
                "Enviar a un Flow",
                <Fragment key="f5">
                  Se crea un Run de extracción normal para ese segmento, etiquetado con el Splitter del
                  que salió.
                </Fragment>,
              ],
              [
                "Enviar a una Collection",
                <Fragment key="f6">
                  La <DocLink href="/es/documentacion/collections">Collection</DocLink> vuelve a
                  clasificar el segmento y lo envía al Flow que coincida.
                </Fragment>,
              ],
              ["Enviar por correo", "El segmento se envía por correo como PDF a la dirección que indiques."],
              ["Nada", "El segmento se conserva en el resultado de la división, pero no se envía a ningún lado."],
            ]}
          />
          <InfoBox color="green" icon={<Info size={20} />} title="Los ciclos están bloqueados">
            Un Splitter puede alimentar una Collection, y una Collection puede enviar a un Splitter.
            Tavnit rechaza las configuraciones que formarían un ciclo y, durante la ejecución, un
            segmento nunca se envía de vuelta al Splitter que lo produjo. Así, un par mal configurado
            no puede hacer girar documentos en círculo y gastar créditos.
          </InfoBox>
          <p>
            Los segmentos enviados a un Flow llevan consigo su origen. El payload del webhook de ese
            Run incluye la división de la que salió y el tipo de documento con el que coincidió, para
            que puedas rastrear una fila hasta el rango de páginas en el paquete original. Consulta{" "}
            <DocLink href="/es/documentacion/webhooks">los payloads del webhook</DocLink>.
          </p>
        </DocCard>

        <DocCard icon={<Mail size={24} />} title="Cómo enviar archivos a un Splitter">
          <Lead>
            Un Splitter acepta archivos de tres formas: subidos en la app, enviados a la API o
            enviados por correo a su propia dirección. La vía del correo es la más útil: configura a
            un proveedor o un escáner para que envíe ahí y los paquetes se dividen sin que nadie abra
            Tavnit.
          </Lead>
          <NumberedList
            items={[
              "Abre el Splitter y activa su \"Email Trigger\".",
              "Copia la dirección y reenvíale los PDFs combinados.",
              "Cada archivo adjunto compatible se convierte en su propia división.",
            ]}
          />
          <p>
            Los tipos de archivo adjunto aceptados y los motivos por los que se puede omitir un
            archivo son los mismos que en todos lados. Consulta la{" "}
            <DocLink href="/es/documentacion/integracion-por-correo">integración por correo</DocLink>.
            Igual que con los Flows, si el disparador está desactivado, el correo se acepta y se
            descarta sin rebote.
          </p>
        </DocCard>

        <DocCard icon={<Coins size={24} />} title="Cuánto cuesta dividir">
          <Lead>
            Una división se cobra según la extensión del archivo de origen: un crédito por página del
            paquete, sin importar cuántos documentos salgan de él. Después, cada segmento paga su
            propio costo de extracción cuando llega a un Flow.
          </Lead>
          <DataTable
            head={["Cobro", "Cuándo"]}
            rows={[
              ["1 crédito por página del paquete", "Cuando se ejecuta la división."],
              [
                "El cobro de extracción del propio Flow",
                "Por segmento, cuando llega a un Flow.",
              ],
              [
                "1 crédito de enrutamiento por segmento",
                <Fragment key="f7">
                  Solo cuando el segmento se envía a una{" "}
                  <DocLink href="/es/documentacion/collections">Collection</DocLink> en lugar de
                  directamente a un Flow.
                </Fragment>,
              ],
            ]}
          />
          <p>
            Por eso, enviar segmentos directamente a un Flow es más barato que enrutarlos a través de
            una Collection. Usa el destino Collection cuando el tipo de documento realmente pueda ir
            a más de un Flow; si no, asigna el tipo directamente.
          </p>
        </DocCard>

        <DocCard icon={<BarChart3 size={24} />} title="Cómo leer el resultado de una división">
          <Lead>
            Abre una división completada desde <strong>&ldquo;Split History&rdquo;</strong> para ver
            qué decidió el Splitter. Cada segmento muestra su rango de páginas, el tipo de documento
            con el que coincidió, el motivo de la coincidencia y a dónde se envió.
          </Lead>
          <BulletList
            items={[
              "Cuántos documentos se encontraron y cuántos coincidieron con un tipo configurado",
              "El rango exacto de páginas de cada segmento, para que compares los límites con el original",
              "El motivo que dio el clasificador para cada coincidencia",
              "El Run o el Run de Collection que produjo cada segmento, con un enlace a sus resultados",
              "Los segmentos que no coincidieron con nada: lo primero que debes revisar cuando una división sale mal",
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Cómo corregir una mala división">
            Los límites incorrectos suelen indicar que dos tipos de documento tienen descripciones
            demasiado parecidas. Las coincidencias incorrectas suelen indicar que una descripción es
            demasiado vaga. En ambos casos, la solución está en las descripciones de los tipos de
            documento, no en el archivo.
          </InfoBox>
        </DocCard>

        <Related
          links={[
            {
              href: "/es/documentacion/collections",
              label: "Enruta documentos individuales con Collections",
              description:
                "La otra mitad de la clasificación, y un destino válido para los segmentos divididos.",
            },
            {
              href: "/es/documentacion/integracion-por-correo",
              label: "Dale a un Splitter su propia dirección de correo",
              description:
                "Formas de las direcciones, tipos de archivo adjunto aceptados y por qué se puede omitir un archivo adjunto.",
            },
            {
              href: "/es/documentacion/webhooks",
              label: "Rastrea un resultado hasta su paquete",
              description:
                "Las claves de procedencia de la división viajan en el payload del webhook del Run de cada segmento.",
            },
            {
              href: "/es/documentacion/mapa-del-pipeline",
              label: "Ve los Splitters en el Mapa del pipeline",
              description: "Cómo se conectan de principio a fin los Splitters, las Collections, los Flows y los Cleaners.",
            },
          ]}
        />
      </section>
    </>
  );
}
