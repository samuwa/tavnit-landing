import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  AlertTriangle,
  ArrowLeftRight,
  Coins,
  Eye,
  FilePlus,
  FolderInput,
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
  Lead,
  NumberedList,
  Related,
  Screenshot,
  WarningBox,
} from "@/components/docs/ui";

export const metadata = docMetadata("collections", "es");

/** Refleja los pasos numerados visibles en "Crear una Collection". */
const HOW_TO = {
  name: "Enruta documentos mixtos automáticamente con una Collection de Tavnit",
  description:
    "Agrupa varios Flows de extracción en una Collection para que Tavnit clasifique cada documento que llega y lo envíe al Flow correcto, con un Flow de respaldo para lo que no pueda ubicar.",
  steps: [
    {
      name: "Crea la Collection",
      text: "Abre Collections en la app de Tavnit, crea una Collection nueva y ponle un nombre que describa el origen de los documentos.",
    },
    {
      name: "Agrega los Flows",
      text: "Agrega cada Flow que deba ser un destino posible. Cada Flow necesita un nombre y una descripción claros, porque la decisión de enrutamiento se toma con base en ellos.",
    },
    {
      name: "Define un Flow de respaldo",
      text: "Elige un Flow de respaldo para los documentos que no coincidan claramente con nada. Si lo dejas vacío, los documentos sin coincidencia se cancelan en lugar de procesarse.",
    },
    {
      name: "Envía los documentos",
      text: "Activa el disparador por correo de la Collection, sube archivos a mano o envíalos por la API. Cada documento se clasifica y se reenvía al Flow que le corresponde.",
    },
    {
      name: "Revisa las decisiones de enrutamiento",
      text: "Abre los Runs de la Collection y lee el motivo de enrutamiento registrado para cada documento; luego mejora la descripción de cualquier Flow que haya producido una decisión equivocada o ambigua.",
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
              "La pestaña Recent Runs de una Collection de Tavnit, con el resultado del enrutamiento de cada documento.",
            width: 1327,
            height: 801,
          }}
        />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
          Collections
        </h1>

        <DocCard icon={<FolderInput size={24} />} title="Qué hace una Collection">
          <Lead>
            Una Collection agrupa varios Flows detrás de un solo punto de entrada. Cuando llega un
            documento, Tavnit mira su primera página, compara lo que ve con los nombres y las
            descripciones de los Flows de la Collection y reenvía el documento al que coincide. Así
            puedes dar una sola dirección para documentos que no puedes clasificar de antemano.
          </Lead>
          <p>
            La decisión de enrutamiento se toma a partir del propio documento: encabezados, títulos,
            logotipos, diseño y texto identificador como nombres de empresas y números de formulario.
            Es un paso de clasificación, no de extracción: una vez elegido el destino, ese Flow
            procesa el documento exactamente como si se lo hubieras enviado directamente.
          </p>
        </DocCard>

        <DocCard icon={<ArrowLeftRight size={24} />} title="¿Collection o Flow directo?">
          <Lead>
            Envía los documentos directo a un Flow cuando ya sabes qué son. Usa una Collection cuando
            el remitente es un solo canal pero el contenido varía, y decidir qué Flow aplica sería de
            otro modo el trabajo manual de alguien.
          </Lead>
          <DataTable
            head={["Situación", "Enviar a"]}
            rows={[
              ["Un proveedor, un tipo de documento, siempre el mismo diseño", "El Flow directamente"],
              ["Un portal de proveedores que emite facturas, órdenes de compra y recibos", "Una Collection"],
              ["Un buzón compartido donde puede llegar cualquier cosa", "Una Collection"],
              ["Una llamada a la API que ya conoce el tipo de documento", "El Flow directamente"],
              ["Un PDF que junta varios documentos", "Un Splitter, o una Collection que contenga uno"],
            ]}
          />
          <p>
            El enrutamiento cuesta un crédito por documento, así que enrutar algo que podrías haber
            enviado directamente no es gratis. Si quien envía conoce el tipo, díselo al Flow.
          </p>
        </DocCard>

        <DocCard icon={<FilePlus size={24} />} title="Crear una Collection">
          <Lead>
            Una Collection es un nombre, una lista de destinos y un respaldo. El trabajo está en los
            destinos: la calidad del enrutamiento depende casi por completo de qué tan bien describe
            cada Flow lo que maneja.
          </Lead>
          <NumberedList
            items={[
              <Fragment key="f0">
                Abre <strong>Collections</strong> y crea una nueva. Ponle el nombre del origen de los
                documentos: <em>Portal de proveedores Acme</em>, no <em>Collection 2</em>.
              </Fragment>,
              "Agrega cada Flow que deba ser un destino posible.",
              <Fragment key="f1">
                Define un <strong>Fallback Flow</strong> (Flow de respaldo) para los documentos que
                no coincidan claramente con nada. Si lo dejas vacío, los documentos que no se pueden
                enrutar se cancelan.
              </Fragment>,
              "Envía los documentos por correo, subida manual o API.",
              "Abre los Runs de la Collection y lee los motivos de enrutamiento; luego mejora cualquier descripción que haya producido una decisión equivocada.",
            ]}
          />
        </DocCard>

        <DocCard icon={<PenLine size={24} />} title="Nombres y descripciones de Flows que enrutan bien">
          <Lead>
            El nombre y la descripción de cada Flow son lo único con lo que el enrutador compara el
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
              "Describe lo que se ve en la primera página, porque eso es lo que ve el enrutador.",
              "Nombra al emisor cuando varios Flows manejan el mismo tipo de documento para distintos proveedores.",
              "Di qué no es un tipo de documento cuando dos de tus Flows se confunden fácilmente.",
              "Evita dos Flows con descripciones que se traslapan: el enrutador tiene instrucciones de abstenerse cuando la coincidencia es ambigua en lugar de adivinar.",
            ]}
          />
        </DocCard>

        <DocCard icon={<Workflow size={24} />} title="Qué pasa con cada documento">
          <Lead>
            Cada documento crea un Run de Collection que pasa por un pequeño conjunto de estados. El
            enrutamiento se decide una sola vez, a partir de la primera página, y el resultado se
            registra con un motivo escrito que puedes leer después.
          </Lead>
          <DataTable
            head={["Estado", "Significado"]}
            rows={[
              ["Pending", "El documento está guardado y esperando ser enrutado."],
              ["Routing", "Se está clasificando la primera página."],
              [
                "Routed",
                "Se eligió un destino. El Run de la Collection enlaza al Run del Flow que creó.",
              ],
              [
                "Cancelled",
                "Ningún destino coincidió y no había un Flow de respaldo, así que no se procesó nada.",
              ],
              [
                "Failed",
                "El documento no se pudo enrutar: un tipo de archivo no compatible, un archivo ilegible, una Collection sin destinos activos o un saldo de créditos en cero.",
              ],
            ]}
          />
          <Screenshot
            src="/assets/docs-collection-runs-2026-08.jpg"
            alt="La pestaña Recent Runs de una Collection de Tavnit, con filtros de estado para Routed, Routing, Pending, Failed y Cancelled, que lista dos PDF enrutados al Flow Invoice Processor."
            caption="Los Recent Runs de una Collection, filtrados por resultado del enrutamiento. Cada entrada registra el destino al que se envió el documento."
          />
          <InfoBox color="violet" icon={<Info size={20} />} title="El Flow de respaldo es la red de seguridad">
            Cuando el enrutador no encuentra una coincidencia clara, no adivina: se abstiene. Si hay
            un Flow de respaldo, el documento va ahí y el Run registra que usó el respaldo. Si no hay
            ninguno, el Run se cancela y el documento no se procesa. Define uno, a menos que de
            verdad quieras descartar los documentos desconocidos.
          </InfoBox>
          <WarningBox>
            El enrutamiento no produce una puntuación de confianza. Cada decisión se registra como un
            motivo escrito que cita lo que el enrutador vio en la página. Léelos en los Runs de la
            Collection para entender por qué un documento fue a donde fue.
          </WarningBox>
        </DocCard>

        <DocCard icon={<Split size={24} />} title="Enrutar a un Splitter">
          <Lead>
            Los destinos de una Collection no se limitan a Flows. Puedes agregar un{" "}
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
            Un Splitter puede alimentar una Collection y una Collection puede alimentar un Splitter,
            lo que podría formar un ciclo. Tavnit rechaza las configuraciones que generarían un ciclo,
            y durante la ejecución un segmento producido por un Splitter nunca se enruta de vuelta a
            ese mismo Splitter. Así, una configuración mal hecha no puede hacer girar documentos en
            círculo y gastar créditos.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Coins size={24} />} title="Cuánto cuesta el enrutamiento">
          <Lead>
            El enrutamiento cuesta un crédito por documento, que se cobra cuando empieza el Run de la
            Collection, sin importar el resultado. La clasificación se ejecuta encuentre o no una
            coincidencia, así que un Run cancelado también cuesta su crédito de enrutamiento.
          </Lead>
          <DataTable
            head={["Cargo", "Cuándo"]}
            rows={[
              ["1 crédito", "Por cada documento que enruta una Collection: con coincidencia, enviado al respaldo o cancelado."],
              [
                "El cargo propio del Flow",
                "Adicional, cuando el documento llega a un Flow y se extrae.",
              ],
            ]}
          />
          <p>
            Si el saldo está en cero cuando llega un documento, el Run de la Collection falla antes
            de enrutar y no se procesa nada.
          </p>
        </DocCard>

        <DocCard icon={<Mail size={24} />} title="Enviar documentos a una Collection">
          <Lead>
            Una Collection acepta documentos de las mismas tres formas que un Flow: su propia
            dirección de correo, la subida manual en la app o la API. El enrutamiento funciona igual
            sin importar cuál uses; el Run registra de qué disparador vino.
          </Lead>
          <NumberedList
            items={[
              "Abre la configuración de la Collection.",
              <Fragment key="f8">
                Activa <strong>Email Trigger</strong> y copia la dirección de la Collection.
              </Fragment>,
              "Reenvía documentos a ella o apunta una regla de tu buzón hacia ella.",
            ]}
          />
          <p>
            La dirección es distinta de la de cualquier Flow. Consulta{" "}
            <DocLink href="/es/documentacion/integracion-por-correo">integración por correo</DocLink>{" "}
            para ver los formatos de dirección, los tipos de adjunto aceptados y qué pasa con los
            adjuntos que no se pueden procesar.
          </p>
        </DocCard>

        <DocCard icon={<Eye size={24} />} title="Revisar las decisiones de enrutamiento">
          <Lead>
            La lista de Runs de la Collection es donde ajustas el enrutamiento. Cada entrada muestra
            el documento, a dónde se envió y el motivo que dio el enrutador, que es lo que te dice si
            debes corregir una descripción o aceptar la decisión.
          </Lead>
          <BulletList
            items={[
              "A qué Flow o Splitter se envió cada documento, y si fue una coincidencia o un envío al respaldo",
              "El motivo escrito, que cita lo que el enrutador vio en la primera página",
              "Un enlace al Run del Flow resultante y sus datos extraídos",
            ]}
          />
          <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Corrige las descripciones, no los documentos">
            Cuando el enrutamiento falla, la solución casi siempre está en las descripciones de los
            destinos, no en el documento. Dos Flows que dicen &ldquo;facturas&rdquo; seguirán
            produciendo decisiones ambiguas hasta que uno de ellos diga qué lo hace diferente.
          </InfoBox>
        </DocCard>

        <Related
          links={[
            {
              href: "/es/documentacion/splitters",
              label: "Divide los PDF con varios documentos antes de enrutar",
              description:
                "Cómo un Splitter separa un archivo combinado y cómo funciona como destino de una Collection.",
            },
            {
              href: "/es/documentacion/integracion-por-correo",
              label: "Dale a una Collection su propio buzón",
              description:
                "Formatos de dirección, tipos de adjunto aceptados y por qué un adjunto podría omitirse.",
            },
            {
              href: "/es/documentacion/api",
              label: "Envía documentos por la API REST",
              description: "Envía documentos a una Collection de forma programática en lugar de por correo.",
            },
            {
              href: "/es/documentacion/mapa-del-pipeline",
              label: "Ve tus Collections en el Mapa del pipeline",
              description:
                "Cómo se conectan las Collections, los Splitters, los Flows y la entrega en todo el espacio de trabajo.",
            },
          ]}
        />
      </section>
    </>
  );
}
