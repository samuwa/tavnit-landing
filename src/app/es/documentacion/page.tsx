import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  Clock,
  Coins,
  Compass,
  FilePlus,
  FlaskConical,
  Info,
  Map,
  Rocket,
  Sparkles,
  Table2,
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
} from "@/components/docs/ui";

export const metadata = docMetadata("getting-started", "es");

/** Refleja los pasos numerados visibles en "Paso 1: crea un Flow". */
const HOW_TO = {
  name: "Extrae datos estructurados de un documento con Tavnit",
  description:
    "Crea un Flow de Tavnit desde una plantilla, desde un documento de ejemplo o desde cero, revisa sus campos, procesa un documento y lee el resultado estructurado, sin plantillas que dibujar y sin código.",
  steps: [
    {
      name: "Abre el diálogo de creación",
      text: "En la página \"Flows\", haz clic en \"Crear Flow\".",
    },
    {
      name: "Elige un punto de partida",
      text: "Elige \"Desde plantilla\" (una plantilla de Tavnit o una copia de uno de tus Flows), \"Sugerencia con IA\" (sube un PDF o una imagen de ejemplo y la IA arma los campos) o \"Desde cero\".",
    },
    {
      name: "Ponle nombre y descripción",
      text: "Dale al Flow un nombre de al menos 3 caracteres y una descripción de al menos 10 que diga qué documentos procesa.",
    },
    {
      name: "Revisa el esquema de datos",
      text: "En el builder, agrega, edita o elimina campos hasta que el esquema sea exactamente lo que necesitas. Un Flow nuevo ya está \"Activo\".",
    },
    {
      name: "Procesa un documento",
      text: "Haz clic en \"Run\", sube un documento real y revisa el resultado.",
    },
  ],
};

export default function Page() {
  return (
    <>
      <DocsPageSchema
        slug="getting-started"
        locale="es"
        howTo={HOW_TO}
        primaryImage={{
          url: "/assets/tour2-runs.jpg",
          caption:
            "La página \"Runs\" de Tavnit, con cada documento procesado, su Flow, su origen y su estado.",
          width: 1327,
          height: 801,
        }}
      />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
          Primeros pasos
        </h1>

        <DocCard icon={<Sparkles size={24} />} title="Qué hace Tavnit">
          <Lead>
            Tavnit lee documentos y te devuelve datos estructurados. Describes una sola vez los
            campos que quieres, le envías facturas, recibos, órdenes de compra, estados de cuenta,
            hojas de cálculo o formularios, y obtienes filas con tipos definidos, sin crear una
            plantilla por cada diseño ni escribir código de parsing.
          </Lead>
          <p>
            La extracción es el punto de partida, no todo el producto. A su alrededor, Tavnit puede
            clasificar y separar los archivos que llegan, limpiar y enriquecer las filas, comparar y
            verificar documentos entre sí, rellenar formularios, pausar para que una persona revise,
            guardar resultados en tablas, entregarlos a tus sistemas y pasárselos a un Agente de
            navegador que actúe con ellos. Esta página te da el mapa y te acompaña con tu primer
            documento.
          </p>
          <InfoBox color="violet" icon={<FlaskConical size={20} />} title="Algunas áreas están en Beta">
            Pipelines, Subjects, Matchers, Inspectores, Fillers, Signals y Nets llevan la etiqueta{" "}
            <strong>Beta</strong> en la app. Puedes usarlas hoy, pero sus pantallas y opciones todavía
            pueden cambiar.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Compass size={24} />} title="Un mapa de Tavnit">
          <Lead>
            La barra lateral de la app agrupa cada área según su función, desde que entran los
            documentos hasta que actúas con los datos. La documentación sigue los mismos grupos, así
            que esta tabla también sirve como índice.
          </Lead>
          <DataTable
            head={["Grupo", "Área", "Qué hace"]}
            rows={[
              [
                "Entrada",
                <Fragment key="m0">
                  <DocLink href="/es/documentacion/colecciones">Colecciones</DocLink>
                </Fragment>,
                "Una bandeja o endpoint para documentos mezclados: cada uno se clasifica y se envía al Flow correcto.",
              ],
              [
                "Entrada",
                <Fragment key="m1">
                  <DocLink href="/es/documentacion/subjects">Subjects</DocLink>
                </Fragment>,
                "Modela una entidad, como una compra o un paciente, y agrupa sus documentos en casos por referencia.",
              ],
              [
                "Entrada",
                <Fragment key="m2">
                  <DocLink href="/es/documentacion/splitters">Splitters</DocLink>
                </Fragment>,
                "Corta un archivo que contiene varios documentos en documentos independientes y envía cada uno a su destino.",
              ],
              [
                "Procesamiento",
                <Fragment key="m3">
                  <DocLink href="/es/documentacion/flows">Flows</DocLink>
                </Fragment>,
                "El esquema de un tipo de documento: los campos a extraer y todo lo que se les asocia. Todo empieza aquí.",
              ],
              [
                "Procesamiento",
                <Fragment key="m4">
                  <DocLink href="/es/documentacion/cleaners">Cleaners</DocLink>
                </Fragment>,
                "Cambian formato, convierten, calculan, buscan y validan las filas extraídas, y disparan acciones cuando algo se ve mal.",
              ],
              [
                "Procesamiento",
                <Fragment key="m5">
                  <DocLink href="/es/documentacion/agentes">Agentes</DocLink>
                </Fragment>,
                "Agentes de navegador que cumplen una misión en lenguaje natural en un sitio web, muchas veces con datos extraídos como entrada.",
              ],
              [
                "Inteligencia",
                <Fragment key="m6">
                  <DocLink href="/es/documentacion/matchers">Matchers</DocLink>
                </Fragment>,
                "Comparan registros línea por línea entre documentos: cotizaciones entre sí, una factura contra su orden.",
              ],
              [
                "Inteligencia",
                <Fragment key="m7">
                  <DocLink href="/es/documentacion/inspectores">Inspectores</DocLink>
                </Fragment>,
                "Aplican una lista de verificación a un conjunto de documentos relacionados y dan un veredicto de aprobado o reprobado.",
              ],
              [
                "Inteligencia",
                <Fragment key="m8">
                  <DocLink href="/es/documentacion/fillers">Fillers</DocLink>
                </Fragment>,
                "Rellenan plantillas de formularios PDF con datos extraídos de tus documentos.",
              ],
              [
                "Orquestación",
                <Fragment key="m9">
                  <DocLink href="/es/documentacion/pipelines">Pipelines</DocLink>
                </Fragment>,
                "Encadenan pasos de principio a fin en un lienzo visual.",
              ],
              [
                "Orquestación",
                <Fragment key="m10">
                  <DocLink href="/es/documentacion/mapa-del-pipeline">Mapa de Pipeline</DocLink>
                </Fragment>,
                "Una sola imagen de cómo se mueven los documentos en tu organización.",
              ],
              [
                "Datos y actividad",
                <Fragment key="m11">
                  <DocLink href="/es/documentacion/buckets">Buckets</DocLink>
                </Fragment>,
                "Tablas donde los resultados se acumulan entre Runs, listas para consultar, graficar y exportar.",
              ],
              [
                "Datos y actividad",
                <Fragment key="m12">
                  <DocLink href="/es/documentacion/flows#runs">Runs</DocLink>
                </Fragment>,
                "El historial de cada documento procesado, con su resultado, su archivo original y su registro.",
              ],
              [
                "Datos y actividad",
                <Fragment key="m13">
                  <DocLink href="/es/documentacion/revision-humana">Revisión Humana</DocLink>
                </Fragment>,
                "Una cola de revisión donde una persona aprueba, edita o rechaza resultados antes de que se entreguen.",
              ],
              [
                "Audio",
                <Fragment key="m14">
                  <DocLink href="/es/documentacion/signals">Signals</DocLink>
                </Fragment>,
                "Convierten conversaciones grabadas en filas estructuradas.",
              ],
              [
                "Social",
                <Fragment key="m15">
                  <DocLink href="/es/documentacion/nets">Nets</DocLink>
                </Fragment>,
                "Convierten publicaciones de redes sociales en filas estructuradas y tendencias.",
              ],
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="¿No ves Agentes, Signals o Nets?">
            Estas tres áreas se activan por organización. Si no aparecen en tu barra lateral,
            contacta al equipo de Tavnit para que las habilite.
          </InfoBox>
          <InfoBox color="violet" icon={<Info size={20} />} title="¿Cuál ordena mis documentos?">
            Si cada archivo contiene un documento pero no sabes de qué tipo es, usa una{" "}
            <DocLink href="/es/documentacion/colecciones">Colección</DocLink>. Si un archivo
            contiene varios documentos, usa un{" "}
            <DocLink href="/es/documentacion/splitters">Splitter</DocLink>. Si los documentos van
            juntos (la misma compra, el mismo paciente), usa un{" "}
            <DocLink href="/es/documentacion/subjects">Subject</DocLink>. Si ya sabes qué documento
            es, envíalo directo al Flow y sáltate los tres.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Rocket size={24} />} title="Tus primeros minutos">
          <Lead>
            Una organización nueva empieza con un recorrido corto de configuración, así que casi
            nunca te encuentras con una pantalla vacía.
          </Lead>
          <BulletList
            items={[
              <Fragment key="o0">
                <strong>Preguntas de bienvenida.</strong> Después de crear tu organización, Tavnit te
                hace cuatro preguntas rápidas: qué documentos procesarás, qué quieres lograr, cómo
                llegan tus documentos hoy y aproximadamente cuántos manejas al mes. Toman unos 30
                segundos y puedes elegir <strong>Omitir</strong>.
              </Fragment>,
              <Fragment key="o1">
                <strong>Flows iniciales en un clic.</strong> Si respondiste, la página de Flows vacía
                te ofrece las plantillas que coinciden con tus documentos bajo{" "}
                <em>“Según tus respuestas, podemos dejarte listos:”</em>. Haz clic en{" "}
                <strong>Crear estos flows</strong> y se crean por ti, listos para editar.
              </Fragment>,
              <Fragment key="o2">
                <strong>Plantillas iniciales.</strong> Tavnit incluye Flows listos para facturas,
                órdenes de compra, recibos, estados de cuenta, guías de remisión, resultados de
                laboratorio, contratos, cotizaciones, notas de crédito, documentos de identidad y
                currículums. Las plantillas que coinciden con tus respuestas aparecen primero.
              </Fragment>,
              <Fragment key="o3">
                <strong>La guía de primeros pasos.</strong> Un panel pequeño en una esquina de la app
                con tres pestañas: <strong>Checklist</strong> (pasos de configuración que se marcan
                solos a medida que los completas), <strong>Esta pantalla</strong> (consejos para la
                página en la que estás) y <strong>Funciones</strong> (todas las áreas disponibles para
                ti). Si la ocultas, puedes reabrirla desde el menú <strong>Ayuda y Soporte</strong>.
              </Fragment>,
            ]}
          />
        </DocCard>

        <DocCard icon={<FilePlus size={24} />} title="Paso 1: crea un Flow">
          <Lead>
            Un Flow es el esquema de un tipo de documento. Nómbralo según el documento y no según el
            proyecto (<em>Facturas de proveedores</em>, no <em>Automatización Q1</em>), porque el
            nombre y la descripción también son lo que usa una Colección para enviarle documentos.
          </Lead>
          <NumberedList
            items={[
              <Fragment key="f5">
                En la página <strong>Flows</strong>, haz clic en <strong>Crear Flow</strong>.
              </Fragment>,
              <Fragment key="f6">
                Elige un punto de partida: <strong>Desde plantilla</strong> (una plantilla de Tavnit
                o una copia de uno de tus propios Flows en <strong>Mis Flows</strong>),{" "}
                <strong>Sugerencia con IA</strong> (sube un PDF o una imagen de ejemplo y la IA arma
                los campos) o <strong>Desde cero</strong>.
              </Fragment>,
              <Fragment key="f7">
                Dale al Flow un nombre de al menos 3 caracteres y una descripción de al menos 10 que
                diga qué documentos procesa.
              </Fragment>,
              <Fragment key="f8">
                En el builder, agrega, edita o elimina campos hasta que el esquema sea exactamente lo
                que necesitas. Un Flow nuevo ya está <strong>Activo</strong>.
              </Fragment>,
              <Fragment key="f9">
                Haz clic en <strong>Run</strong>, sube un documento real y revisa el resultado.
              </Fragment>,
            ]}
          />
          <p>
            <DocLink href="/es/documentacion/flows">Flows</DocLink> explica cada uno de estos pasos a
            fondo: tipos de campo, tipos de datos, las pistas que le dicen a la IA dónde buscar y el
            botón <strong>Diagnosticar</strong>, que propone correcciones cuando el Flow ya tiene
            Runs reales.
          </p>
          <InfoBox color="blue" icon={<Info size={20} />} title="La descripción importa">
            La descripción es obligatoria y cumple dos funciones: ayuda a la IA a extraer con más
            precisión y es lo que permite que una{" "}
            <DocLink href="/es/documentacion/colecciones">Colección</DocLink> envíe documentos al
            Flow. Una descripción vaga empeora ambas cosas.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Table2 size={24} />} title="Paso 2: campos de metadatos y campos de tabla">
          <Lead>
            Tavnit distingue los valores que aparecen una vez por documento de los valores que se
            repiten. Esa sola distinción define la forma de todo lo que viene después: el payload de
            tu webhook, las filas de tu Bucket y tu CSV la siguen.
          </Lead>
          <DataTable
            head={["Tipo de campo", "Aparece", "En una factura"]}
            rows={[
              [
                "Campo de metadatos",
                "Una vez por documento",
                "Número de factura, fecha de emisión, proveedor, total",
              ],
              [
                "Campo de tabla",
                "Una vez por línea",
                "Descripción, cantidad, precio unitario, importe",
              ],
            ]}
          />
          <p>
            Cada campo también tiene un tipo de dato (Text, Number, Date, Mixed/Alphanumeric o
            Image; el editor de campos muestra estos nombres en inglés), y acertar importa más de lo
            que parece: un total con tipo texto no se puede sumar, comparar ni graficar. Un Flow que
            solo tiene campos de metadatos devuelve una sola fila por documento.{" "}
            <DocLink href="/es/documentacion/flows">Flows</DocLink> cubre el esquema completo,
            incluidas las pistas de extracción, los campos compuestos y cómo corregir un campo que
            sale mal.
          </p>
        </DocCard>

        <DocCard icon={<Clock size={24} />} title="Paso 3: envía documentos">
          <Lead>
            Hay cuatro vías de entrada y todas producen el mismo tipo de Run. Empieza con una subida
            manual para comprobar que el Flow funciona y luego cambia a la vía que coincida con cómo
            te llegan los documentos en realidad.
          </Lead>
          <DataTable
            head={["Vía", "Ideal para", "Configuración"]}
            rows={[
              [
                "Subir en la app",
                "Pruebas y documentos puntuales",
                "Ninguna. Selecciona varios archivos a la vez y cada uno se convierte en su propio Run",
              ],
              [
                <Fragment key="f10">
                  <DocLink href="/es/documentacion/integracion-por-correo">Correo</DocLink>
                </Fragment>,
                "Documentos que ya llegan a una bandeja de entrada",
                "Activa el \"Disparador por Email\" del Flow y reenvía los correos a su dirección",
              ],
              [
                <Fragment key="f11">
                  <DocLink href="/es/documentacion/api">API REST</DocLink>
                </Fragment>,
                "Tus propios sistemas y volúmenes altos",
                "Una API key y un POST",
              ],
              [
                <Fragment key="f12">
                  <DocLink href="/es/documentacion/conector-mcp">Conector MCP</DocLink>
                </Fragment>,
                "Trabajo puntual desde un asistente de IA",
                "Se habilita por organización a pedido; luego, una URL de conector desde Integraciones",
              ],
            ]}
          />
          <p>
            Los Flows aceptan PDF, imágenes (PNG, JPG, JPEG y JFIF) y hojas de cálculo (XLSX, XLS y
            CSV). En una hoja de cálculo, el Flow lee la primera hoja visible. Los documentos
            escaneados se detectan y se leen con OCR automáticamente.
          </p>
          <Screenshot
            src="/assets/tour2-runs.jpg"
            alt="La página Runs de Tavnit con documentos procesados, cada uno con su Flow, quién lo inició, su origen y su estado, debajo de indicadores de Runs completados, Runs en ejecución, créditos usados y total de Runs."
            caption="Cada documento se convierte en un Run. La página Runs muestra qué se procesó, cómo llegó y cómo terminó."
          />
          <p>
            Abre cualquier Run para ver los campos extraídos junto al documento original, además del
            registro de lo que pasó durante el procesamiento. Ese registro es el primer lugar donde
            buscar cuando un resultado no es el que esperabas.
          </p>
        </DocCard>

        <DocCard icon={<Coins size={24} />} title="Cuánto cuesta">
          <Lead>
            Tavnit cobra en créditos de un único saldo por organización. La extracción se cobra por
            página, así que un PDF de diez páginas cuesta diez créditos, produzca una fila o
            doscientas. Cada una de las demás funciones tiene su propia tarifa.
          </Lead>
          <BulletList
            items={[
              "Extracción: 1 crédito por página. Una hoja de cálculo se cobra según su equivalente en páginas.",
              "El enrutamiento, la separación, la limpieza, los Agentes, los Matchers y las demás funciones tienen su propia tarifa, detallada en la página de créditos.",
              "Los pasos se suman: un documento que se separa, se enruta y luego se extrae paga los tres, así que enviarlo directo a su Flow es el hábito más económico cuando ya sabes su tipo.",
              "Armar un Flow con \"Sugerencia con IA\" y usar \"Diagnosticar\" en un Flow son gratis.",
              "Un Run necesita un saldo de créditos positivo para empezar. Los créditos ya usados no se reembolsan si un Run se cancela o falla.",
            ]}
          />
          <p>
            Consulta <DocLink href="/es/documentacion/creditos">Créditos y facturación</DocLink> para
            ver la lista completa de precios. Para agregar créditos a tu organización, contacta al
            equipo de Tavnit.
          </p>
        </DocCard>

        <DocCard icon={<Map size={24} />} title="Hacia dónde seguir">
          <Lead>
            Cuando la extracción ya funciona, el siguiente paso depende de qué está mal en los datos o
            de qué necesitas hacer con ellos.
          </Lead>
          <DataTable
            head={["Si necesitas…", "Lee"]}
            rows={[
              [
                "Extraer más campos o corregir uno que sale mal",
                <Fragment key="f17">
                  <DocLink href="/es/documentacion/flows">Flows</DocLink>
                </Fragment>,
              ],
              [
                "Corregir formatos, convertir monedas, calcular totales o marcar filas con problemas",
                <Fragment key="f18">
                  <DocLink href="/es/documentacion/cleaners">Cleaners</DocLink>
                </Fragment>,
              ],
              [
                "Que una persona revise los resultados antes de que se envíen",
                <Fragment key="f19">
                  <DocLink href="/es/documentacion/revision-humana">Revisión Humana</DocLink>
                </Fragment>,
              ],
              [
                "Llevar los datos a tus propios sistemas",
                <Fragment key="f20">
                  <DocLink href="/es/documentacion/webhooks">Webhooks</DocLink> o la{" "}
                  <DocLink href="/es/documentacion/api">API REST</DocLink>
                </Fragment>,
              ],
              [
                "Guardar los resultados juntos y consultarlos",
                <Fragment key="f21">
                  <DocLink href="/es/documentacion/buckets">Buckets</DocLink>
                </Fragment>,
              ],
              [
                "Comparar documentos o verificarlos contra una lista de reglas",
                <Fragment key="f24">
                  <DocLink href="/es/documentacion/matchers">Matchers</DocLink> e{" "}
                  <DocLink href="/es/documentacion/inspectores">Inspectores</DocLink>
                </Fragment>,
              ],
              [
                "Conectar varios pasos en un solo proceso",
                <Fragment key="f25">
                  <DocLink href="/es/documentacion/pipelines">Pipelines</DocLink>
                </Fragment>,
              ],
              [
                "Actuar con los datos en otro sitio web",
                <Fragment key="f22">
                  <DocLink href="/es/documentacion/agentes">Agentes</DocLink>
                </Fragment>,
              ],
              [
                "Controlar quién puede ver y cambiar qué",
                <Fragment key="f23">
                  <DocLink href="/es/documentacion/roles-de-usuario">Roles de usuario</DocLink>
                </Fragment>,
              ],
            ]}
          />
        </DocCard>

        <Related
          links={[
            {
              href: "/es/documentacion/flows",
              label: "Construye a fondo el esquema de datos de un Flow",
              description:
                "Tipos de campo, tipos de datos, pistas de extracción, campos compuestos, Runs y todo lo que puedes asociar a un Flow.",
            },
            {
              href: "/es/documentacion/creditos",
              label: "Mira cuánto cuesta cada función",
              description: "Las tarifas en créditos de cada paso y cuándo se cobran.",
            },
            {
              href: "/es/documentacion/api",
              label: "Procesa documentos con la API REST de Tavnit",
              description:
                "Subida multipart y base64, autenticación con API key, ejemplos en Python y JavaScript, y recetas sin código.",
            },
            {
              href: "/es/documentacion/integracion-por-correo",
              label: "Extrae datos de archivos adjuntos de correo",
              description: "Dale a un Flow su propia bandeja de entrada y reenvíale documentos.",
            },
            {
              href: "/es/documentacion/mapa-del-pipeline",
              label: "Mira cómo se conecta todo",
              description:
                "Un mapa en vivo de tus Flows, Colecciones, Splitters, Cleaners y Buckets.",
            },
          ]}
        />
      </section>
    </>
  );
}
