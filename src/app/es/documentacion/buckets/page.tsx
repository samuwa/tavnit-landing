import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  AlertTriangle,
  ArrowLeftRight,
  BarChart3,
  Code,
  Database,
  FileDown,
  FilePlus,
  FileUp,
  Fingerprint,
  HelpCircle,
  Info,
  Lock,
  MessageSquare,
  Search,
  Shield,
  Sparkles,
  Table2,
  Users,
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
            "Un Bucket de Tavnit abierto en la cuadrícula de datos, con columnas tipadas y los controles Filtro, Ordenar, fila de función, Gráfico y Exportar.",
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
            Un Bucket es una tabla estructurada que vive dentro de Tavnit. Los Flows, Signals, Nets,
            Agentes y Pipelines escriben filas en ella automáticamente, puedes agregar filas mediante
            la API o desde un archivo CSV o Excel, y puedes filtrar, ordenar, graficar y hacerle
            preguntas al resultado sin exportarlo a ningún lado.
          </Lead>
          <p>
            Un Run de un Flow guarda el resultado de <em>un</em> documento. Un Bucket es donde se
            acumulan los resultados de todos los Runs, así que la pregunta cambia de &ldquo;¿qué decía
            esta factura?&rdquo; a &ldquo;¿cuánto nos han facturado este trimestre?&rdquo;. Cada fila
            debe coincidir con las columnas del Bucket, y eso es lo que mantiene útil ese total.
          </p>
          <Screenshot
            src="/assets/docs-bucket-grid-2026-08.jpg"
            alt="Un Bucket de Tavnit llamado Data Set abierto en la vista de cuadrícula. Las columnas tipadas age, sex, bmi, children, smoker, region y charges contienen 1,339 filas, con los controles Insertar, Filtro, Ordenar, fila de función, Gráfico y Exportar en la barra de herramientas y, en el panel izquierdo, una lista de columnas y los Flows conectados."
            caption="Un Bucket en la cuadrícula. El tipo de cada columna aparece junto a su nombre, y el número de filas y la paginación están en la parte inferior."
            width={1327}
            height={692}
          />
          <InfoBox color="purple" icon={<Workflow size={20} />} title="Flows + Buckets">
            Activa <strong>Exportar a Bucket</strong> en un Flow y mapea sus campos de salida a las
            columnas del Bucket. A partir de ahí, cada Run exitoso agrega sus filas, así que los
            resultados de muchos documentos se van reuniendo en una sola tabla.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Info size={24} />} title="Cuándo usar Buckets">
          <p>Los Buckets son ideales para:</p>
          <BulletList
            items={[
              "Reunir en una sola tabla los resultados de extracción de muchos Runs de Flows",
              "Guardar datos de referencia (listas de precios, catálogos, listas de clientes) contra los que los Cleaners buscan valores",
              "Sincronizar datos con sistemas externos mediante la API, en ambos sentidos",
              "Juntar la salida estructurada de Signals, Nets y Agentes con tus datos de documentos",
              "Responder preguntas sobre tus datos en lenguaje natural, sin una hoja de cálculo",
            ]}
          />
          <InfoBox color="blue" icon={<ArrowLeftRight size={20} />} title="Buckets vs. Runs de Flows">
            Los Runs de Flows guardan el resultado de cada documento. Los Buckets reúnen datos de
            muchos Runs y de otras fuentes en una sola tabla que puedes consultar, graficar y
            exportar.
          </InfoBox>
        </DocCard>

        <DocCard icon={<FilePlus size={24} />} title="Crear un Bucket">
          <p>Los Propietarios y Administradores pueden crear Buckets:</p>
          <NumberedList
            items={[
              'Ve a Buckets en la barra lateral y haz clic en "Crear Bucket" (o empieza "Desde plantilla")',
              "Escribe un nombre y, si quieres, una descripción, y elige un ícono y un color",
              'Haz clic en "Crear Bucket". Tavnit te ofrece "Gestionar Acceso" para definir quién puede verlo, o "Abrir Bucket" para ir directo a la cuadrícula',
              'Agrega columnas: en la cuadrícula usa "Insertar" → "Insertar Column", o importa un archivo CSV o Excel y deja que Tavnit cree las columnas por ti',
              'Para llenarlo desde un Flow, abre el Flow, activa "Exportar a Bucket", vincula este Bucket y mapea los campos del Flow a sus columnas',
            ]}
          />
          <p>
            Cada columna tiene un nombre y un tipo de dato: <strong>Text</strong>,{" "}
            <strong>Number</strong>, <strong>Date</strong>, <strong>Checkbox</strong> o{" "}
            <strong>Dropdown</strong> (una lista fija de al menos dos opciones). Los tipos son los que
            permiten que el ordenamiento, los filtros, las agregaciones y los gráficos funcionen bien,
            así que vale la pena corregir en el origen una columna numérica que llega como texto.
          </p>
          <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Los nombres de columna importan">
            Al escribir mediante la API, cada fila debe usar los nombres de columna del Bucket. Una
            fila con una columna que el Bucket no tiene cancela toda la escritura con un error de
            columnas que no coinciden, así que elige nombres claros y consistentes desde el inicio.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Fingerprint size={24} />} title="Encontrar el ID y el nombre de tu Bucket">
          <p>
            Para usar la API de Buckets necesitas el ID y el nombre de tu Bucket. Ambos están en la
            página de detalles del Bucket:
          </p>
          <NumberedList
            items={[
              'Ve a Buckets y haz clic en "Ver Detalles" en el Bucket que quieres usar',
              "Copia el nombre del Bucket desde el encabezado (tiene un botón para copiar)",
              'Abre "Bucket ID" en "Características" y copia el ID',
            ]}
          />
          <p>
            La página de detalles también tiene la pestaña <strong>Esquema</strong> (cada columna, su
            tipo y sus marcas), la pestaña <strong>Historial de Escritura</strong> (cada escritura, su
            origen y cuántas filas agregó) y <strong>Flows Vinculados</strong>, los Flows que exportan
            a este Bucket.
          </p>
          <InfoBox color="green" icon={<Shield size={20} />} title="Verificación de seguridad">
            La API exige bucket_id y bucket_name para evitar leer o escribir por accidente en el
            Bucket equivocado. Si el nombre no coincide con el ID, la solicitud se rechaza.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Workflow size={24} />} title="De dónde vienen los datos">
          <Lead>
            Nada en un Bucket supone que los datos vinieron de un documento. Todas las fuentes de
            abajo escriben en la misma tabla, y por eso un Bucket sirve tanto como datos de referencia
            como de destino.
          </Lead>
          <DataTable
            head={["Fuente", "Cómo funciona", "Uso típico"]}
            rows={[
              [
                <Fragment key="f0">
                  <DocLink href="/es/documentacion/flows">Exportar a Bucket</DocLink> en un Flow
                </Fragment>,
                "Cada Run exitoso agrega sus filas, con los campos extraídos mapeados a las columnas del Bucket.",
                "Acumular en una tabla cada factura que procesas.",
              ],
              [
                <Fragment key="f1">
                  Una acción de un <DocLink href="/es/documentacion/cleaners">Cleaner</DocLink>
                </Fragment>,
                "Una acción edita un valor en una fila existente del Bucket que encontró un Lookup.",
                "Marcar un pedido como recibido o descontar existencias.",
              ],
              [
                <Fragment key="f2">
                  Un <DocLink href="/es/documentacion/agentes">Agente</DocLink>
                </Fragment>,
                "Un Agente con entrega a Bucket escribe sus capturas en el Bucket después de cada Run.",
                "Registrar precios vigentes de proveedores obtenidos de un portal.",
              ],
              [
                <Fragment key="f3">
                  <DocLink href="/es/documentacion/signals">Signals</DocLink> y{" "}
                  <DocLink href="/es/documentacion/nets">Nets</DocLink>
                </Fragment>,
                "Un Signal puede exportar las filas que estructura de cada grabación; una Net puede exportar las filas de cada captura completada.",
                "Llevar el resultado de llamadas o publicaciones en redes junto a los datos de documentos.",
              ],
              [
                <Fragment key="f4">
                  Un <DocLink href="/es/documentacion/pipelines">Pipeline</DocLink>
                </Fragment>,
                "Un nodo Bucket en el lienzo guarda lo que producen los pasos anteriores.",
                "Terminar un Pipeline de varios pasos en una tabla.",
              ],
              [
                <Fragment key="f5">
                  La <DocLink href="/es/documentacion/api">API REST</DocLink>
                </Fragment>,
                "Agrega filas, o reemplaza las filas de la tabla, con una sola solicitud.",
                "Sincronizar una lista de precios o un catálogo de clientes desde otro sistema.",
              ],
              [
                "Importación de CSV o Excel",
                "Sube un archivo .csv, .xlsx o .xls desde la cuadrícula.",
                "Cargar una hoja de cálculo existente una sola vez.",
              ],
              [
                "La propia cuadrícula",
                "Cualquiera con acceso de edición puede agregar filas y escribir, pegar o borrar valores.",
                "Correcciones rápidas y entradas manuales.",
              ],
            ]}
          />
          <InfoBox color="violet" icon={<ArrowLeftRight size={20} />} title="Los Buckets también se leen">
            Un Bucket no es solo un destino. Los campos <strong>Lookup</strong> de un Cleaner sacan
            valores de él para enriquecer una fila, y los campos <strong>Bucket Check</strong>{" "}
            preguntan si una fila ya existe, que es como funciona la deduplicación. Carga tu catálogo
            en un Bucket y todos tus Flows podrán compararse con él.
          </InfoBox>
          <InfoBox color="blue" icon={<Info size={20} />} title="Las exportaciones nunca van pivotadas">
            Si un Cleaner reorganiza las filas en formato ancho para la entrega, el Bucket igual
            recibe las filas originales en formato largo. Los datos guardados mantienen una fila por
            registro para que los totales y las búsquedas sigan siendo correctos.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Table2 size={24} />} title="Trabajar con los datos">
          <Lead>
            La cuadrícula se parece más a una hoja de cálculo que a un informe de solo lectura.
            Puedes editar en el lugar, copiar y pegar celdas, filtrar y ordenar, y paginar tablas
            grandes, así que un Bucket con miles de filas sigue siendo cómodo de usar en el navegador.
          </Lead>
          <DataTable
            head={["Control", "Qué hace"]}
            rows={[
              ["Insertar", "Agrega una fila o una columna, importa un archivo CSV o Excel, o abre Prompting."],
              ["Filtro", "Reduce la vista a las filas que cumplen las condiciones que definas en cualquier columna."],
              ["Ordenar", "Ordena las filas por una columna, de forma ascendente o descendente."],
              [
                <Fragment key="f6">
                  <InlineCode>f(x)</InlineCode>
                </Fragment>,
                "Muestra una fila de función bajo la cuadrícula con la suma, el promedio, el mínimo, el máximo o el conteo de cada columna, calculados sobre la página actual.",
              ],
              ["Gráfico", "Crea un gráfico con los datos (ver Gráficos más abajo)."],
              ["Chat", "Abre un panel lateral para hacer preguntas sobre los datos (ver más abajo)."],
              ["Exportar", "Descarga todas las filas del Bucket como archivo CSV."],
              ["Deshacer / Rehacer", "Retrocede y avanza entre las ediciones hechas en la cuadrícula."],
            ]}
          />
          <p>
            Quien tiene acceso de solo lectura ve la misma cuadrícula con un aviso de solo lectura:
            puede filtrar, ordenar, graficar y exportar, pero no editar.
          </p>
        </DocCard>

        <DocCard icon={<Search size={24} />} title="Búsqueda IA en una columna">
          <Lead>
            La coincidencia exacta falla cuando lo mismo se escribe de formas distintas: &ldquo;Acme
            Corp.&rdquo;, &ldquo;ACME Corporation&rdquo;, &ldquo;acme&rdquo;. La Búsqueda IA permite
            que un Cleaner encuentre coincidencias por significado.
          </Lead>
          <NumberedList
            items={[
              'Abre el Bucket, haz clic en el encabezado de una columna de texto y elige "Editar Column"',
              'Activa "Búsqueda IA"',
              "Define la similitud mínima (de 1 a 100 %, 90 % por defecto). Por debajo de ese umbral, la búsqueda devuelve vacío en lugar de una coincidencia débil",
              'Haz clic en "Guardar Cambios". Tavnit indexa los valores de la columna en segundo plano',
            ]}
          />
          <p>
            Una vez activada, un <DocLink href="/es/documentacion/cleaners">Lookup</DocLink> de un
            Cleaner puede usar el operador <strong>AI Match</strong> contra esa columna para encontrar
            la fila más parecida aunque el texto no coincida exactamente. La Búsqueda IA solo está
            disponible en columnas de texto.
          </p>
        </DocCard>

        <DocCard icon={<Sparkles size={24} />} title="Prompting: pregunta en lenguaje natural">
          <Lead>
            Prompting responde preguntas como &ldquo;¿Cuál es el monto total facturado por cada
            proveedor este año?&rdquo; directamente desde el Bucket, y muestra cómo llegó a la
            respuesta.
          </Lead>
          <NumberedList
            items={[
              'En la cuadrícula, abre "Insertar" → "Prompting"',
              'En "Configurar Prompting", elige las columnas de texto que quieres indexar y haz clic en "Activar". Tavnit agrupa sus valores distintos en categorías para que las preguntas puedan filtrar por significado',
              'Escribe tu pregunta en "Haz una Pregunta" (hasta 2,000 caracteres) y haz clic en "Preguntar"',
            ]}
          />
          <p>
            Cada respuesta incluye los <strong>Supuestos</strong> que hizo, los{" "}
            <strong>Valores coincidentes</strong> que incluyó o excluyó, el resultado con un{" "}
            <strong>Desglose</strong> cuando corresponde, y <strong>Filas de muestra</strong> para que
            revises los datos detrás de ella. Las preguntas anteriores quedan en{" "}
            <strong>Historial</strong>.
          </p>
          <InfoBox color="blue" icon={<Info size={20} />} title="Acceso">
            Para configurar Prompting necesitas acceso de edición al Bucket.
          </InfoBox>
        </DocCard>

        <DocCard icon={<MessageSquare size={24} />} title="Chatea con los datos">
          <p>
            El botón <strong>Chat</strong> de la cuadrícula abre un panel lateral donde puedes
            conversar sobre el Bucket: totales, desgloses o pedidos del tipo &ldquo;muéstrame&rdquo;.
            Cuando una respuesta se refiere a un conjunto de filas, haz clic en{" "}
            <strong>Ver en la tabla</strong> para filtrar la cuadrícula a esas filas, y en{" "}
            <strong>Quitar vista</strong> para volver. Los chats se guardan, así que puedes retomar
            uno más tarde o empezar un <strong>Nuevo chat</strong>.
          </p>
          <BulletList
            items={[
              "El chat necesita Prompting activado en al menos una columna de texto del Bucket",
              "Cada organización tiene un cupo diario de mensajes, que se muestra en el panel y se restablece al día siguiente",
              "Los mensajes tienen un límite de 2,000 caracteres",
            ]}
          />
          <InfoBox color="yellow" icon={<Info size={20} />} title="Se activa a pedido">
            El chat de Buckets se activa por organización. Si no ves el botón Chat, contacta a
            soporte para activarlo.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Lock size={24} />} title="Control de acceso">
          <p>
            Cada Bucket tiene una configuración de visibilidad y admite permisos por miembro, para
            que controles exactamente quién puede ver o editar tus datos. Los Propietarios y
            Administradores lo gestionan desde <strong>Acceso</strong> en la página de detalles.
          </p>
          <InfoBox color="blue" icon={<Users size={20} />} title="Visible en la Org (por defecto)">
            Todos los miembros de tu organización pueden ver el Bucket. Por defecto los
            Administradores pueden editar y los Miembros solo pueden ver; puedes cambiarlo persona
            por persona.
          </InfoBox>
          <InfoBox color="yellow" icon={<Lock size={20} />} title="Privado">
            Solo el Propietario y los usuarios con acceso explícito pueden ver este Bucket. Solo el
            Propietario de la organización puede hacer privado un Bucket, y los Administradores y
            Miembros sin un permiso explícito pierden el acceso de inmediato.
          </InfoBox>
          <p>A cada persona se le puede dar uno de dos niveles de acceso:</p>
          <BulletList
            items={[
              "Solo lectura: puede abrir el Bucket y leer sus datos",
              "Editor: además puede agregar, editar y eliminar filas",
            ]}
          />
          <p>
            En un Bucket privado hay una tercera opción, <strong>Sin acceso</strong>. Los
            Propietarios siempre tienen acceso completo. Los Administradores pueden definir el acceso
            de los Miembros; solo el Propietario puede cambiar el acceso de un Administrador.
            Modificar columnas y la configuración del Bucket sigue siendo de Propietarios y
            Administradores, sin importar el permiso. Consulta{" "}
            <DocLink href="/es/documentacion/roles-de-usuario">Roles de usuario</DocLink> para ver el
            modelo completo.
          </p>
        </DocCard>

        <DocCard icon={<BarChart3 size={24} />} title="Gráficos">
          <p>
            Puedes graficar los datos del Bucket directamente para ver tendencias y totales sin
            exportarlos a otra herramienta.
          </p>
          <NumberedList
            items={[
              'Haz clic en "Gráfico" en la barra de herramientas de la cuadrícula',
              "Elige un tipo de gráfico: Barras, Línea, Circular o Dispersión (Tavnit marca el que mejor se ajusta a tus datos)",
              "Elige el campo por el que agrupar, y si quieres contar filas o agregar un campo numérico (Suma, Conteo, Promedio, Mínimo o Máximo)",
              "Si quieres, ordena, limita al Top 5, 10, 15 o 20, y define un título, tema de color, leyenda y cuadrícula",
              'Revisa la vista previa y haz clic en "Descargar como PNG" para guardarlo',
            ]}
          />
          <InfoBox color="purple" icon={<BarChart3 size={20} />} title="Buckets grandes">
            Los gráficos usan todas las filas en Buckets de hasta 10,000 filas. Por encima de eso,
            Tavnit grafica una muestra de unas 10,000 filas y te lo indica. Los gráficos no se guardan
            con el Bucket: descarga el PNG si lo necesitas después.
          </InfoBox>
        </DocCard>

        <DocCard icon={<FileDown size={24} />} title="Importar y exportar">
          <InfoBox color="green" icon={<FileUp size={20} />} title="Importar CSV / Excel">
            Elige &ldquo;Insertar&rdquo; → &ldquo;Importar CSV / Excel&rdquo; y selecciona un archivo
            .csv, .xlsx o .xls. Tavnit empareja las columnas del archivo con las del Bucket por
            nombre; para las demás puedes mapear cada una a una columna existente, crearla como
            columna nueva u omitirla, y luego hacer clic en &ldquo;Importar&rdquo; (o &ldquo;Crear e
            Importar&rdquo;).
          </InfoBox>
          <InfoBox color="blue" icon={<FileDown size={20} />} title="Exportar a CSV">
            &ldquo;Exportar&rdquo; descarga todas las filas del Bucket como archivo CSV, sin importar
            los filtros que tengas en pantalla. Sirve para enviar datos a otras herramientas o
            guardar una copia de respaldo.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Code size={24} />} title="API de Buckets">
          <p>
            Hay dos endpoints que funcionan con tu clave API (encabezado{" "}
            <InlineCode>X-API-Key</InlineCode>). Ambos exigen <InlineCode>bucket_id</InlineCode> y{" "}
            <InlineCode>bucket_name</InlineCode>.
          </p>
          <DataTable
            head={["Endpoint", "Qué hace"]}
            rows={[
              [
                <Fragment key="f7">
                  <InlineCode>POST /api/buckets/write</InlineCode>
                </Fragment>,
                "Agrega filas (overwrite: false) o reemplaza las filas de la tabla (overwrite: true). Hasta 50,000 filas por solicitud.",
              ],
              [
                <Fragment key="f8">
                  <InlineCode>GET /api/buckets/read</InlineCode>
                </Fragment>,
                "Devuelve las columnas y una página de filas, con total_count y has_more. Usa limit (100 por defecto, máximo 1,000) y offset para paginar.",
              ],
            ]}
          />
          <p>
            Los ejemplos completos de solicitud y respuesta están en la{" "}
            <DocLink href="/es/documentacion/api">página de la API</DocLink>.
          </p>
        </DocCard>

        <DocCard icon={<HelpCircle size={24} />} title="Solución de problemas">
          <DataTable
            head={["Problema", "Qué revisar"]}
            rows={[
              [
                "La cuadrícula dice que es de solo lectura",
                "Tienes acceso de solo lectura. Pide a un Propietario o Administrador que te dé acceso de Editor en este Bucket.",
              ],
              [
                "Una escritura por API se rechaza porque las columnas no coinciden",
                "Una fila usa un nombre de columna que el Bucket no tiene. Compara tus claves con la pestaña Esquema.",
              ],
              [
                "Una llamada a la API se rechaza porque el Bucket no coincide",
                "bucket_name no coincide con el Bucket de ese bucket_id. Copia ambos de nuevo desde la página de detalles.",
              ],
              [
                "Un Flow se ejecuta pero no aparecen filas",
                "Revisa que Exportar a Bucket esté activado en el Flow y que sus campos estén mapeados a columnas. Solo los Runs exitosos exportan.",
              ],
              [
                "No aparece el botón Chat",
                "El chat de Buckets se activa por organización; contacta a soporte.",
              ],
              [
                "El chat dice que no está listo",
                "Primero activa Prompting en al menos una columna de texto.",
              ],
            ]}
          />
        </DocCard>

        <Related
          links={[
            {
              href: "/es/documentacion/cleaners",
              label: "Busca valores en un Bucket y escribe de vuelta en él",
              description:
                "Lookup, AI Match, Bucket Check y la acción de editar filas: los tipos de campo que leen y actualizan filas guardadas.",
            },
            {
              href: "/es/documentacion/api",
              label: "Lee y escribe filas con la API REST",
              description:
                "Los endpoints de Buckets, con ejemplos y la verificación de seguridad con bucket_id y bucket_name.",
            },
            {
              href: "/es/documentacion/roles-de-usuario",
              label: "Quién puede ver y editar un Bucket",
              description:
                "Cómo la visibilidad y los permisos de cada Bucket se suman a los roles de la organización.",
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
