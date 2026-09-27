import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import { AlertTriangle, ArrowLeftRight, BarChart3, Database, FileDown, FilePlus, FileUp, Fingerprint, Info, Lock, Shield, Table2, Users, Workflow } from "lucide-react";
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
} from "@/components/docs/ui";

export const metadata = docMetadata("buckets", "es");

export default function Page() {
  return (
    <>
      <DocsPageSchema
        slug="buckets"
        locale="es"
        primaryImage={{
          url: "/assets/docs-bucket-grid-2026-08.jpg",
          caption:
            "Un Bucket de Tavnit abierto en la cuadrícula de datos, con columnas tipadas y los controles Filter, Sort, fórmula, Graph y Export.",
          width: 1327,
          height: 692,
        }}
      />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
          Buckets
        </h1>

        <DocCard icon={<Database size={24} />} title="¿Qué son los Buckets?">
          <Lead>
            Un Bucket es una tabla estructurada que vive dentro de Tavnit. Los Flows escriben en ella
            sus filas extraídas automáticamente, puedes agregar filas mediante la API o desde un CSV, y
            puedes filtrar, ordenar, calcular y graficar el resultado sin exportarlo a ningún lado.
          </Lead>
          <p>
            Un Run de un Flow guarda el resultado de <em>un</em> documento. Un Bucket es donde se
            acumulan los resultados de todos los Runs, así que la pregunta cambia de &ldquo;¿qué decía
            esta factura?&rdquo; a &ldquo;¿cuánto nos han facturado este trimestre?&rdquo;. Cada fila
            debe coincidir con las columnas del Bucket, y eso es lo que mantiene útil ese total.
          </p>
          <Screenshot
            src="/assets/docs-bucket-grid-2026-08.jpg"
            alt="Un Bucket de Tavnit llamado Data Set abierto en la vista de cuadrícula. Las columnas tipadas age, sex, bmi, children, smoker, region y charges contienen 1,339 filas, con los controles Insert, Filter, Sort, fórmula, Graph y Export en la barra de herramientas y, en el panel izquierdo, una lista de columnas y los Flows conectados."
            caption="Un Bucket en la cuadrícula. El tipo de cada columna aparece junto a su nombre, y el número de filas y la paginación están en la parte inferior."
            width={1327}
            height={692}
          />
          <InfoBox color="purple" icon={<Workflow size={20} />} title="Flows + Buckets">
            Puedes vincular Flows a Buckets para que los datos extraídos se escriban automáticamente en
            el Bucket después de procesar cada documento. Así reúnes en un solo lugar los resultados de
            muchos Runs.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Info size={24} />} title="Cuándo usar Buckets">
          <p>Los Buckets son ideales para:</p>
          <BulletList
            items={[
              "Reunir en una sola tabla los resultados de extracción de muchos Runs de Flows",
              "Crear conjuntos de datos que combinen datos de documentos con fuentes externas",
              "Sincronizar datos de sistemas externos mediante la API",
              "Crear un almacén central de datos en el que escriban varios Flows",
            ]}
          />
          <InfoBox color="blue" icon={<ArrowLeftRight size={20} />} title="Buckets vs. Runs de Flows">
            Los Runs de Flows guardan los resultados de documentos individuales. Los Buckets reúnen
            datos de muchos Runs y de fuentes externas en una tabla unificada que puedes exportar o
            consultar.
          </InfoBox>
        </DocCard>

        <DocCard icon={<FilePlus size={24} />} title="Crear un Bucket">
          <p>Sigue estos pasos para crear un Bucket:</p>
          <NumberedList
            items={[
              'Ve a la página "Buckets" desde la navegación principal',
              'Haz clic en "New Bucket" y ponle un nombre',
              "Define las columnas (nombre y tipo de dato de cada una)",
              "Opcionalmente, vincula los Flows que deben escribir datos en este Bucket",
              "Guarda tu Bucket",
            ]}
          />
          <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Los nombres de las columnas importan">
            Cuando usas la API, cada fila que envías debe tener exactamente los mismos nombres de
            columna que tu Bucket. Elige nombres claros y consistentes desde el principio.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Fingerprint size={24} />} title="Encuentra el ID y el nombre de tu Bucket">
          <p>Para usar la API de Buckets necesitas el ID y el nombre de tu Bucket. Ambos están en el cuadro de información del Bucket:</p>
          <NumberedList
            items={[
              'Ve a la página "Buckets"',
              "Toca el ícono de información del Bucket que quieres usar",
              "Copia el Bucket ID y el Bucket Name (ambos se copian con un solo toque)",
            ]}
          />
          <InfoBox color="green" icon={<Shield size={20} />} title="Verificación de seguridad">
            La API exige tanto bucket_id como bucket_name para evitar escrituras accidentales en el
            Bucket equivocado. Si el nombre no coincide con el ID, la solicitud se rechaza.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Workflow size={24} />} title="Cuatro formas de ingresar datos">
          <Lead>
            Nada en un Bucket supone que los datos vienen de un documento. Las exportaciones de Flows,
            las acciones de Cleaners, los Agents, la API y la importación de CSV escriben en la misma
            tabla, y por eso un Bucket sirve tanto de datos de referencia como de destino.
          </Lead>
          <DataTable
            head={["Fuente", "Cómo funciona", "Uso típico"]}
            rows={[
              [
                "Exportación a Bucket en un Flow",
                "Cada Run terminado agrega sus filas, con los campos extraídos asignados a las columnas del Bucket.",
                "Acumular en una tabla cada factura que procesas.",
              ],
              [
                <Fragment key="f0">
                  Una acción de un <DocLink href="/es/documentacion/cleaners">Cleaner</DocLink>
                </Fragment>,
                "Una acción condicional escribe un valor en una fila existente del Bucket que encontró un Lookup.",
                "Marcar un pedido como recibido o descontar existencias.",
              ],
              [
                <Fragment key="f1">
                  Un <DocLink href="/es/documentacion/agents">Agent</DocLink>
                </Fragment>,
                "Una fila por Run del Agent, con las capturas asignadas a columnas.",
                "Registrar precios vigentes de proveedores obtenidos de un portal.",
              ],
              [
                <Fragment key="f2">
                  La <DocLink href="/es/documentacion/api">API REST</DocLink> o una importación de CSV
                </Fragment>,
                "Agrega filas directamente, por solicitud o subiendo un archivo.",
                "Cargar una lista de precios o un catálogo de clientes para buscar valores en él.",
              ],
            ]}
          />
          <InfoBox color="violet" icon={<ArrowLeftRight size={20} />} title="Los Buckets se leen además de escribirse">
            Un Bucket no es solo un destino. Los campos <strong>Lookup</strong> de un Cleaner toman
            valores de un Bucket para enriquecer una fila, y los campos <strong>Bucket Check</strong>{" "}
            verifican si una fila ya existe, que es como funciona la eliminación de duplicados. Carga tu
            catálogo en un Bucket y cualquier Flow podrá compararse con él.
          </InfoBox>
          <InfoBox color="blue" icon={<Info size={20} />} title="Las exportaciones siempre llegan sin pivotear">
            Si un Cleaner convierte las filas a formato ancho para la entrega, el Bucket sigue
            recibiendo las filas originales en formato largo. Los datos guardados conservan una fila
            por registro para que los totales y las búsquedas sigan siendo correctos.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Table2 size={24} />} title="Trabajar con los datos">
          <Lead>
            La cuadrícula se parece más a una hoja de cálculo que a un reporte de solo lectura. Puedes
            editar ahí mismo, filtrar y ordenar, agregar columnas calculadas y recorrer tablas grandes
            por páginas: un Bucket con miles de filas sigue siendo fácil de usar en el navegador.
          </Lead>
          <DataTable
            head={["Control", "Qué hace"]}
            rows={[
              ["Insert", "Agrega filas o columnas a la tabla."],
              ["Filter", "Reduce la vista a las filas que cumplen las condiciones que definas."],
              ["Sort", "Ordena por una o más columnas."],
              [
                <Fragment key="f3">
                  <InlineCode>f(x)</InlineCode>
                </Fragment>,
                "Agrega una columna calculada a partir de las demás.",
              ],
              ["Graph", "Grafica los datos ahí mismo (ver más abajo)."],
              ["Export", "Descarga las filas actuales como CSV."],
              ["Undo / redo", "Deshace o rehace los cambios hechos en la cuadrícula."],
            ]}
          />
          <p>
            Cada columna tiene un tipo (texto, número, fecha o booleano) que aparece junto a su nombre.
            Los tipos son los que permiten que el orden, los totales y las gráficas funcionen bien, así
            que conviene corregir en el origen una columna numérica que llegó como texto, en lugar de
            hacerlo en la cuadrícula.
          </p>
        </DocCard>

        <DocCard icon={<Lock size={24} />} title="Control de acceso">
          <p>
            Cada Bucket tiene una configuración de visibilidad y admite permisos de acceso por miembro,
            así que puedes controlar exactamente quién puede ver o editar tus datos.
          </p>
          <InfoBox color="blue" icon={<Users size={20} />} title="Toda la organización (predeterminado)">
            Todos los miembros de tu organización pueden ver el Bucket. Los Admins y Owners siempre
            pueden editarlo.
          </InfoBox>
          <InfoBox color="yellow" icon={<Lock size={20} />} title="Privado">
            Solo los usuarios a quienes se les dio acceso explícitamente pueden ver o editar este
            Bucket. Solo los Admins y Owners pueden hacer privado un Bucket.
          </InfoBox>
          <p>Permisos por miembro (para Buckets privados o un control más detallado):</p>
          <BulletList
            items={[
              "View: puede abrir el Bucket y leer sus datos",
              "Edit: puede agregar, actualizar y eliminar filas",
              "Admin: puede cambiar columnas y visibilidad, y administrar el acceso de otros miembros",
            ]}
          />
        </DocCard>

        <DocCard icon={<BarChart3 size={24} />} title="Gráficas">
          <p>
            Puedes crear gráficas directamente con los datos del Bucket para ver tendencias y totales
            sin exportarlos a otra herramienta.
          </p>
          <InfoBox color="purple" icon={<BarChart3 size={20} />} title="Tipos de gráfica disponibles">
            Hay gráficas de barras, de líneas, circulares y de dispersión. Cada gráfica se guarda con
            el Bucket y la puede ver cualquiera que tenga acceso a él.
          </InfoBox>
          <p>Para crear una gráfica:</p>
          <NumberedList
            items={[
              "Abre la página de detalle del Bucket",
              'Haz clic en "Add Chart" en la sección de gráficas',
              "Elige el tipo de gráfica y selecciona los campos del eje x y del eje y",
              "En las gráficas de barras y de líneas, elige una agregación (suma, promedio, conteo)",
              "Guarda: la gráfica aparece de inmediato y se actualiza con los datos nuevos",
            ]}
          />
        </DocCard>

        <DocCard icon={<FileDown size={24} />} title="Importar y exportar CSV">
          <p>Los Buckets permiten importar datos desde archivos CSV y exportar todas las filas a CSV.</p>
          <InfoBox color="green" icon={<FileUp size={20} />} title="Importar desde CSV">
            Sube un archivo CSV y Tavnit asignará sus columnas a las columnas de tu Bucket. Los nombres
            de las columnas del CSV deben coincidir exactamente con los del Bucket.
          </InfoBox>
          <InfoBox color="blue" icon={<FileDown size={20} />} title="Exportar a CSV">
            Descarga todas las filas actuales como archivo CSV desde la página de detalle del Bucket.
            Es útil para enviar datos a otras herramientas o crear respaldos sin conexión.
          </InfoBox>
          <p>Tanto la importación como la exportación están en la barra de herramientas, arriba de la tabla de datos del Bucket.</p>
        </DocCard>

        <Related
          links={[
            {
              href: "/es/documentacion/cleaners",
              label: "Busca valores en un Bucket y escribe en él",
              description:
                "Lookup, Bucket Check y la acción de editar filas: los tipos de campo que leen y actualizan las filas guardadas.",
            },
            {
              href: "/es/documentacion/api",
              label: "Agrega filas mediante la API REST",
              description:
                "El endpoint de Buckets, con ejemplos en Python y JavaScript y la verificación de seguridad con bucket_id y bucket_name.",
            },
            {
              href: "/es/documentacion/roles-de-usuario",
              label: "Quién puede ver y editar un Bucket",
              description:
                "Cómo la visibilidad y los permisos de acceso de cada Bucket se suman a los roles de la organización.",
            },
            {
              href: "/es/documentacion/conector-mcp",
              label: "Pregúntale a un asistente de IA sobre tu Bucket",
              description:
                "El conector MCP permite que Claude o Cursor consulten las filas guardadas en una conversación.",
            },
          ]}
        />
      </section>
    </>
  );
}
