import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  Clock,
  Coins,
  Compass,
  FilePlus,
  Info,
  Map,
  Sparkles,
  Table2,
} from "lucide-react";
import {
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
    "Crea un Flow de Tavnit que defina los campos que quieres, sube un documento y recibe filas estructuradas, sin plantillas y sin código.",
  steps: [
    {
      name: "Crea un Flow",
      text: "En la página \"Flows\", crea un Flow nuevo y ponle un nombre que describa el tipo de documento que va a procesar.",
    },
    {
      name: "Define los campos",
      text: "Sube un documento de muestra para que Tavnit sugiera campos. Luego agrega, renombra o elimina campos hasta que el esquema coincida con lo que realmente necesitas.",
    },
    {
      name: "Activa el Flow",
      text: "Cambia el Flow a \"Active\" para que pueda recibir documentos.",
    },
    {
      name: "Procesa un documento",
      text: "Sube un documento en la app, envíalo por correo a la dirección del Flow o envíalo a la API. Aparece un Run en la página \"Runs\".",
    },
    {
      name: "Revisa el resultado",
      text: "Abre el Run para ver los campos de metadatos y las filas de tabla extraídos junto al documento original.",
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
            campos que quieres, le envías facturas, recibos, órdenes de compra o formularios, y
            obtienes filas con tipos definidos, sin crear una plantilla por cada diseño ni escribir
            código de parsing.
          </Lead>
          <p>
            La extracción es el punto de partida, no todo el producto. Una vez que los datos existen,
            se pueden normalizar, pasar por la revisión de una persona, guardar, enviar a tus
            sistemas o entregar a un Agent que actúe con ellos. El resto de esta documentación cubre
            esas etapas; esta página cubre la primera.
          </p>
        </DocCard>

        <DocCard icon={<Compass size={24} />} title="El vocabulario">
          <Lead>
            Seis palabras cubren casi todo en Tavnit. Aprende de qué se encarga cada una y el resto
            de la documentación se lee mucho más rápido. La mayor parte de la confusión viene de
            mezclar Flows, Collections y Splitters, que hacen tres trabajos distintos.
          </Lead>
          <DataTable
            head={["Término", "Qué es", "Más información"]}
            rows={[
              [
                "Flow",
                "El esquema de un tipo de documento: los campos que quieres extraer, más las reglas y salidas asociadas. Todo empieza aquí.",
                <Fragment key="f0">
                  <DocLink href="/es/documentacion/flows">Flows</DocLink>
                </Fragment>,
              ],
              [
                "Run",
                "Un documento procesado por un Flow. Los Runs guardan el resultado extraído y el registro de lo que pasó.",
                "Esta página",
              ],
              [
                "Collection",
                "Agrupa varios Flows para que los documentos de tipo desconocido se clasifiquen y se envíen al Flow correcto.",
                <Fragment key="f1">
                  <DocLink href="/es/documentacion/collections">Collections</DocLink>
                </Fragment>,
              ],
              [
                "Splitter",
                "Divide un archivo que contiene varios documentos en partes separadas y luego envía cada parte a su destino.",
                <Fragment key="f2">
                  <DocLink href="/es/documentacion/splitters">Splitters</DocLink>
                </Fragment>,
              ],
              [
                "Cleaner",
                "Reglas que se aplican a las filas extraídas: cambiar formato, convertir, calcular, buscar valores y disparar acciones cuando algo se ve mal.",
                <Fragment key="f3">
                  <DocLink href="/es/documentacion/cleaners">Cleaners</DocLink>
                </Fragment>,
              ],
              [
                "Bucket",
                "Una tabla estructurada donde se acumulan los resultados de muchos Runs, que puedes consultar y graficar dentro de Tavnit.",
                <Fragment key="f4">
                  <DocLink href="/es/documentacion/buckets">Buckets</DocLink>
                </Fragment>,
              ],
            ]}
          />
          <InfoBox color="violet" icon={<Info size={20} />} title="¿Cuál ordena mis documentos?">
            Si cada archivo contiene un documento pero no sabes de qué tipo es, usa una{" "}
            <DocLink href="/es/documentacion/collections">Collection</DocLink>. Si un archivo
            contiene varios documentos, usa un{" "}
            <DocLink href="/es/documentacion/splitters">Splitter</DocLink>. Si ya sabes qué documento
            es, envíalo directo al Flow y sáltate ambos.
          </InfoBox>
        </DocCard>

        <DocCard icon={<FilePlus size={24} />} title="Paso 1: crea un Flow">
          <Lead>
            Un Flow es el esquema de un tipo de documento. Nómbralo según el documento y no según el
            proyecto (<em>Facturas de proveedores</em>, no <em>Automatización Q1</em>), porque ese
            nombre y la descripción son lo que una Collection usa después para enviarle documentos.
          </Lead>
          <NumberedList
            items={[
              <Fragment key="f5">
                En la página <strong>&ldquo;Flows&rdquo;</strong>, crea un Flow nuevo y ponle nombre.
              </Fragment>,
              <Fragment key="f6">
                Sube un documento de muestra. Tavnit sugiere los campos que puede ver, lo cual es más
                rápido que escribirlos desde cero.
              </Fragment>,
              <Fragment key="f7">Agrega, renombra o elimina campos hasta que el esquema sea exactamente lo que necesitas.</Fragment>,
              <Fragment key="f8">
                Cambia el Flow a <strong>&ldquo;Active&rdquo;</strong>.
              </Fragment>,
              <Fragment key="f9">Procesa un documento y revisa el resultado.</Fragment>,
            ]}
          />
          <p>
            <DocLink href="/es/documentacion/flows">Flows</DocLink> explica cada uno de estos pasos
            en detalle: tipos de campo, tipos de datos y las pistas que le dicen a la IA dónde buscar.
          </p>
          <InfoBox color="blue" icon={<Info size={20} />} title="Escribe también una descripción">
            La descripción es opcional para la extracción, pero clave para el enrutamiento. Un Flow
            con una descripción clara se puede agregar después a una{" "}
            <DocLink href="/es/documentacion/collections">Collection</DocLink>; uno llamado{" "}
            <em>Flow 3</em> sin descripción no se puede enrutar de forma confiable.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Table2 size={24} />} title="Paso 2: campos de metadatos y campos de tabla">
          <Lead>
            Tavnit distingue los valores que aparecen una vez por documento de los que se repiten.
            Esa sola distinción define la forma de todo lo que sigue: el payload de tu webhook, las
            filas de tu Bucket y tu CSV siguen esa estructura.
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
                "Descripción, cantidad, precio unitario, monto",
              ],
            ]}
          />
          <p>
            Cada campo también tiene un tipo (texto, número, fecha, mixto o imagen) y elegirlo bien
            importa más de lo que parece: un total con tipo texto no se puede sumar, comparar ni
            graficar. <DocLink href="/es/documentacion/flows">Flows</DocLink> cubre el esquema
            completo en detalle, incluidas las pistas de extracción, los campos compuestos y cómo
            corregir un campo que sale mal.
          </p>
        </DocCard>

        <DocCard icon={<Clock size={24} />} title="Paso 3: envía documentos">
          <Lead>
            Hay cuatro formas de enviar documentos y todas producen el mismo tipo de Run. Empieza
            subiendo un archivo a mano para comprobar que el Flow funciona y luego cambia a la vía
            que coincida con cómo te llegan realmente los documentos.
          </Lead>
          <DataTable
            head={["Vía", "Ideal para", "Configuración"]}
            rows={[
              ["Subir en la app", "Pruebas y documentos sueltos", "Ninguna"],
              [
                <Fragment key="f10">
                  <DocLink href="/es/documentacion/integracion-por-correo">Correo</DocLink>
                </Fragment>,
                "Documentos que ya llegan a una bandeja de entrada",
                "Activa el disparador y reenvía el correo a la dirección",
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
                "Genera una URL de conector",
              ],
            ]}
          />
          <Screenshot
            src="/assets/tour2-runs.jpg"
            alt="La página &quot;Runs&quot; de Tavnit con la lista de documentos procesados, cada uno con su Flow, quién lo disparó, su origen y su estado, debajo de indicadores de Runs completados, Runs en curso, créditos usados y total de Runs."
            caption="Cada documento se convierte en un Run. La página &quot;Runs&quot; muestra qué se procesó, cómo llegó y cómo terminó."
          />
          <p>
            Abre cualquier Run para ver los campos extraídos junto al documento original, además del
            registro de lo que pasó durante el procesamiento. Ese registro es el primer lugar donde
            buscar cuando un resultado no es lo que esperabas.
          </p>
        </DocCard>

        <DocCard icon={<Coins size={24} />} title="Cuánto cuesta cada cosa">
          <Lead>
            Tavnit cobra en créditos. La extracción se cobra por página, así que un PDF de diez
            páginas cuesta diez créditos, produzca una fila o doscientas. Las demás operaciones
            tienen sus propias tarifas.
          </Lead>
          <DataTable
            head={["Operación", "Costo"]}
            rows={[
              ["Extraer un documento", "1 crédito por página"],
              [
                <Fragment key="f13">
                  Enrutamiento con{" "}
                  <DocLink href="/es/documentacion/collections">Collection</DocLink>
                </Fragment>,
                "1 crédito por documento, se cobra haya o no coincidencia",
              ],
              [
                <Fragment key="f14">
                  <DocLink href="/es/documentacion/splitters">Dividir</DocLink> un paquete
                </Fragment>,
                "1 crédito por página del archivo original",
              ],
              [
                <Fragment key="f15">
                  <DocLink href="/es/documentacion/cleaners">Limpiar</DocLink> con un sweep
                </Fragment>,
                "1 crédito por cada 500 celdas no vacías, redondeado hacia arriba",
              ],
              [
                <Fragment key="f16">
                  Tiempo de ejecución de un{" "}
                  <DocLink href="/es/documentacion/agents">Agent</DocLink>
                </Fragment>,
                "3 créditos por minuto de navegador, redondeado hacia arriba, se cobra aunque el Run falle",
              ],
            ]}
          />
          <InfoBox color="yellow" icon={<Info size={20} />} title="Los pasos encadenados se suman">
            Un documento que se divide, se enruta con una Collection y luego se extrae paga los tres
            pasos. Normalmente vale la pena, pero por eso enviar el documento directo al Flow, cuando
            ya sabes de qué tipo es, es el hábito más económico.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Map size={24} />} title="Qué sigue">
          <Lead>
            Cuando la extracción ya funciona, el siguiente paso depende de qué está mal en los datos
            o de qué necesitas hacer con ellos. Estas son las direcciones más comunes.
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
                "Corregir formatos, convertir monedas, calcular totales o marcar filas con errores",
                <Fragment key="f18">
                  <DocLink href="/es/documentacion/cleaners">Cleaners</DocLink>
                </Fragment>,
              ],
              [
                "Que una persona revise los resultados antes de enviarlos",
                <Fragment key="f19">
                  <DocLink href="/es/documentacion/revision-humana">Revisión humana</DocLink>
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
                "Mantener los resultados juntos y consultarlos",
                <Fragment key="f21">
                  <DocLink href="/es/documentacion/buckets">Buckets</DocLink>
                </Fragment>,
              ],
              [
                "Actuar con los datos en otro sitio web",
                <Fragment key="f22">
                  <DocLink href="/es/documentacion/agents">Agents</DocLink>
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
                "Tipos de campo, tipos de datos, pistas de extracción, campos compuestos y todo lo que puedes asociar a un Flow.",
            },
            {
              href: "/es/documentacion/api",
              label: "Procesa documentos con la API REST de Tavnit",
              description:
                "Subida multipart y base64, autenticación con API key, ejemplos en Python y JavaScript, y recetas sin código.",
            },
            {
              href: "/es/documentacion/cleaners",
              label: "Limpia y enriquece los datos extraídos",
              description:
                "Los tipos de campo que cambian formato, convierten, calculan y validan lo que extrajo un Flow.",
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
                "Un mapa en vivo de tus Flows, Collections, Splitters, Cleaners y Buckets.",
            },
          ]}
        />
      </section>
    </>
  );
}
