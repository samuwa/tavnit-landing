import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  Database,
  Filter,
  GitBranch,
  HelpCircle,
  Info,
  Layers,
  LayoutGrid,
  MousePointerClick,
  Route,
  Search,
  Workflow,
} from "lucide-react";
import {
  BulletList,
  DataTable,
  DocCard,
  DocLink,
  InfoBox,
  Lead,
  Related,
  Screenshot,
} from "@/components/docs/ui";

export const metadata = docMetadata("pipeline-map", "es");

export default function Page() {
  return (
    <>
      <DocsPageSchema
        slug="pipeline-map"
        locale="es"
        primaryImage={{
          url: "/assets/docs-pipeline-map-2026-08.jpg",
          caption:
            "El Mapa de Pipeline de Tavnit en la vista Columnas, con Splitters y Colecciones que alimentan un Flow, luego Cleaners y luego Buckets.",
          width: 1327,
          height: 801,
        }}
      />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
          Mapa de Pipeline
        </h1>

        <DocCard icon={<Workflow size={24} />} title="Qué muestra el Mapa de Pipeline">
          <Lead>
            El Mapa de Pipeline dibuja cada objeto de tu espacio de trabajo como un nodo y cada
            conexión configurada entre ellos como una línea. Responde preguntas que cuesta mucho
            contestar recorriendo páginas de detalle: qué alimenta este Flow, qué Cleaner comparten
            estos dos Flows y en qué Bucket no está escribiendo nada.
          </Lead>
          <p>
            Ábrelo desde <strong>Mapa de Pipeline</strong> en la barra lateral. Es una página propia
            (en <strong>/pipeline-map</strong>) que ocupa toda la pantalla, con una flecha para volver
            al Panel. Lee tu configuración en vivo, así que siempre está al día, en lugar de ser un
            diagrama que alguien dibujó una vez y dejó de actualizar.
          </p>
          <Screenshot
            src="/assets/docs-pipeline-map-2026-08.jpg"
            alt="El Mapa de Pipeline de Tavnit en la vista Columnas. Una columna de entrada tiene dos Splitters y dos Colecciones, una de procesamiento tiene un Flow y dos Cleaners, una de audio tiene un Signal y una de datos y actividad tiene tres Buckets, con líneas que muestran cómo se mueven los documentos entre ellos."
            caption="Vista Columnas. Los documentos se mueven de izquierda a derecha: entrada, procesamiento y luego almacenamiento."
          />
        </DocCard>

        <DocCard icon={<Layers size={24} />} title="Nodos y capas">
          <Lead>
            El mapa muestra diez tipos de objeto, agrupados en las mismas capas que la barra lateral
            y ordenados como viajan los documentos: lo que trae un documento a la izquierda, lo que lo
            procesa y lo valida en el medio, y lo que guarda el resultado a la derecha.
          </Lead>
          <DataTable
            head={["Capa", "Nodos"]}
            rows={[
              [
                "Entrada",
                <Fragment key="f0">
                  <DocLink href="/es/documentacion/splitters">Splitters</DocLink> y{" "}
                  <DocLink href="/es/documentacion/colecciones">Colecciones</DocLink>
                </Fragment>,
              ],
              [
                "Procesamiento",
                <Fragment key="f1">
                  <DocLink href="/es/documentacion/flows">Flows</DocLink>,{" "}
                  <DocLink href="/es/documentacion/cleaners">Cleaners</DocLink> y{" "}
                  <DocLink href="/es/documentacion/agentes">Agentes</DocLink>
                </Fragment>,
              ],
              [
                "Inteligencia",
                <Fragment key="f2">
                  <DocLink href="/es/documentacion/matchers">Matchers</DocLink>,{" "}
                  <DocLink href="/es/documentacion/inspectores">Inspectores</DocLink> y{" "}
                  <DocLink href="/es/documentacion/fillers">Fillers</DocLink>
                </Fragment>,
              ],
              [
                "Audio",
                <Fragment key="f3">
                  <DocLink href="/es/documentacion/signals">Signals</DocLink>
                </Fragment>,
              ],
              [
                "Datos y actividad",
                <Fragment key="f4">
                  <DocLink href="/es/documentacion/buckets">Buckets</DocLink>
                </Fragment>,
              ],
            ]}
          />
          <p>
            Los Flows, Splitters, Cleaners, Agentes, Signals y Buckets archivados no aparecen. Los
            Agentes y los Signals solo aparecen si están activados para tu organización. Los Subjects,
            las Nets, los Pipelines y los Runs individuales no se dibujan en el mapa.
          </p>
        </DocCard>

        <DocCard icon={<GitBranch size={24} />} title="Cómo se dibujan las líneas">
          <Lead>
            Cada línea sale de una configuración que hiciste en otra parte. Pasa el cursor sobre un
            nodo y cada una de sus líneas muestra la relación que representa.
          </Lead>
          <DataTable
            head={["Línea", "Etiqueta", "De dónde sale"]}
            rows={[
              ["Colección → Flow", "rutea a", "El Flow está en la Colección, o es su Flow de respaldo."],
              ["Colección → Splitter", "rutea a", "El Splitter está en la Colección."],
              ["Splitter → Flow o Colección", "envía documentos a", "Un tipo de documento del Splitter se envía a ese Flow o Colección."],
              ["Flow → Cleaner", "limpia con", "La limpieza de datos del Flow usa ese Cleaner."],
              ["Flow → Bucket", "exporta a", "Exportar a Bucket del Flow apunta a ese Bucket."],
              ["Flow → Agente", "dispara", "El Flow está vinculado a ese Agente."],
              ["Flow → Matcher", "comparado por", "El Matcher compara los Runs de ese Flow."],
              ["Flow → Inspector", "validado por", "El Flow es una de las entradas del Inspector."],
              ["Flow → Filler", "alimenta a", "El Flow es una de las entradas del Filler."],
              ["Agente → Bucket", "entrega en", "El Agente tiene una entrega a Bucket."],
              ["Signal → Bucket", "exporta a", "El Signal exporta a ese Bucket."],
              ["Cleaner → Bucket", "escribe en", "El Cleaner tiene un campo Bucket Check sobre ese Bucket."],
            ]}
          />
          <p>
            Las líneas de un Flow se vuelven más gruesas cuantos más Runs tuvo en los últimos 7 días,
            y pulsan un momento cuando empieza un Run nuevo, así puedes ver qué caminos están activos
            sin salir del mapa.
          </p>
        </DocCard>

        <DocCard icon={<LayoutGrid size={24} />} title="Tres vistas">
          <Lead>
            El mismo grafo se puede dibujar de tres formas. Cambia entre ellas desde la barra de
            herramientas o con las teclas 1, 2 y 3; ninguna cambia tu configuración, solo cómo se
            acomoda en pantalla. El mapa recuerda la última vista que usaste.
          </Lead>
          <DataTable
            head={["Vista", "Cómo se ve", "Ideal para"]}
            rows={[
              [
                "Columnas",
                "La vista por defecto. Una columna por tipo de nodo dentro de la franja de su capa, cada una con su conteo y su propio orden. Cada columna muestra hasta 30 nodos y luego un control “Ver todos”.",
                "Leer todo el cableado de izquierda a derecha y explicarle la configuración a otra persona.",
              ],
              [
                "Rutas",
                "Una fila por Flow o Signal: lo que lo alimenta a la izquierda y a dónde envía a la derecha, agrupado por relación. Los nodos que no tocan ningún Flow ni Signal aparecen en “Sin conexiones”.",
                "Seguir un Flow de punta a punta cuando muchos objetos comparten la misma etapa.",
              ],
              [
                "Órbitas",
                "Cada Flow o Signal conectado es un centro con sus vecinos directos en anillos alrededor, entradas a la izquierda y salidas a la derecha. Primero aparecen los más conectados.",
                "Detectar los centros más concurridos, el Flow alrededor del cual se agrupa todo lo demás.",
              ],
            ]}
          />
        </DocCard>

        <DocCard icon={<MousePointerClick size={24} />} title="Explorar un nodo">
          <BulletList
            items={[
              "Pasa el cursor sobre un nodo para ver su tarjeta: si está activo, su dirección de disparador de email, la salida por email, el webhook, la revisión humana, la entrega del Agente, el modo de completado (Inspectores y Fillers) o si es privado (Buckets), además de su número de conexiones y su fecha de creación",
              "Haz clic en un nodo para enfocarlo: sus conexiones directas se iluminan y la tarjeta queda fija con un botón “Abrir”. Haz clic de nuevo, presiona Esc o haz clic en un espacio vacío para “Salir del foco”",
              "Haz doble clic en un nodo, o presiona Enter con el nodo enfocado, para abrir su página de detalle",
              "Con un nodo enfocado, haz Shift+clic en otro nodo para resaltar el camino más corto entre ambos",
              "Haz clic derecho en un nodo para ver “Abrir”, “Enfocar”, “Ocultar elemento” (ese tipo de nodo) y “Ocultar capa”",
              "Usa las flechas del teclado para moverte entre nodos y / para ir a la búsqueda",
            ]}
          />
        </DocCard>

        <DocCard icon={<Filter size={24} />} title="Encontrar cosas en un espacio de trabajo grande">
          <Lead>
            Cuando un espacio de trabajo tiene unas cuantas decenas de objetos, el grafo completo ya
            no cabe en pantalla. La barra de herramientas tiene lo necesario para eso.
          </Lead>
          <BulletList
            items={[
              "“Buscar nodos...” para encontrar uno por nombre. Los resultados de la búsqueda siempre se muestran, aunque superen el límite de la columna",
              "“Filtros” abre un panel con Capas y Elementos para ocultar, filtros de Configuración (Activo, Revisión humana, Webhook, Email) y Opciones: “Solo conectados” y “Ocultar no coincidentes”. Sin esta última, los nodos que no coinciden se atenúan en lugar de desaparecer. “Limpiar todo” lo restablece todo",
              "Ordena cada columna por Conectados Primero, Nombre A-Z, Nombre Z-A o Último Creado, u ordena todas las columnas a la vez",
              "En Columnas, acerca y aleja (o usa la rueda del mouse) y haz clic en “Ajustar” para encuadrar todo el grafo; un minimapa en la esquina muestra dónde estás",
              "“Exportar SVG” descarga la vista actual de Columnas u Órbitas como imagen",
              "Cambia entre modo claro y modo oscuro para el mapa",
            ]}
          />
          <p>
            Tus filtros y tu orden se guardan en tu navegador. La barra de direcciones conserva la
            vista, la búsqueda y el nodo enfocado, así que puedes compartir un enlace que abre el mapa
            encuadrado igual. En pantallas pequeñas el mapa muestra una lista compacta por capa en
            lugar del lienzo.
          </p>
          <InfoBox color="blue" icon={<Search size={20} />} title="Encontrar huérfanos">
            Ordena por <em>Conectados Primero</em> y revisa el final de cada columna, o activa{" "}
            <em>Solo conectados</em> para ver qué queda. Un Flow sin Cleaner ni Bucket está
            descartando sus resultados, salvo que algo los recoja mediante la API o un webhook; un
            Bucket al que nada apunta solo recibe datos a mano o por la API.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Route size={24} />} title="Mapa de Pipeline y Pipelines">
          <p>
            El mapa muestra las conexiones que ya existen en la configuración de cada función. Un{" "}
            <DocLink href="/es/documentacion/pipelines">Pipeline</DocLink> es otra cosa: un lienzo que
            armas a propósito para encadenar pasos y ejecutarlos como uno solo. Los Pipelines no se
            dibujan en el mapa; usa el mapa para entender cómo está conectado tu espacio de trabajo, y
            los Pipelines para orquestar una secuencia concreta.
          </p>
        </DocCard>

        <DocCard icon={<Info size={24} />} title="Cuándo vale la pena abrir el mapa">
          <Lead>
            El mapa es una herramienta de diagnóstico más que algo de uso diario. Resulta útil cuando
            necesitas entender la forma del espacio de trabajo, no el contenido de un Run.
          </Lead>
          <BulletList
            items={[
              "Antes de eliminar algo: el mapa muestra qué más está conectado a eso",
              "Cuando un documento termina en el lugar equivocado y necesitas ver la ruta que siguió",
              "Al incorporar a alguien, como una explicación en una sola pantalla de cómo encaja todo",
              "Después de una configuración grande, para comprobar que nada quedó sin conectar",
              "Cuando dos equipos configuraron Flows por separado y quieres encontrar trabajo duplicado",
            ]}
          />
          <InfoBox color="violet" icon={<Database size={20} />} title="Estructura, no resultados">
            Salvo el grosor de las líneas, el mapa muestra cómo están conectadas las cosas, no lo que
            pasó por ellas. Para resultados individuales, créditos y fallos, usa Runs y el historial de
            cada objeto.
          </InfoBox>
        </DocCard>

        <DocCard icon={<HelpCircle size={24} />} title="Solución de problemas">
          <DataTable
            head={["Problema", "Qué revisar"]}
            rows={[
              [
                "El mapa dice que no hay nada que mapear",
                "Primero crea un Flow, un Bucket o un Cleaner; el mapa solo dibuja objetos que existen.",
              ],
              [
                "Falta un objeto",
                "Revisa que no esté archivado, que su capa o tipo no esté oculto en Filtros y que “Solo conectados” u “Ocultar no coincidentes” no lo estén quitando. Los Agentes y Signals solo aparecen si están activados para tu organización.",
              ],
              [
                "Una columna termina en “+N”",
                "Cada columna muestra 30 nodos. Haz clic en “Ver todos” o busca el nombre.",
              ],
              [
                "No aparecen el zoom ni Ajustar",
                "Solo están disponibles en la vista Columnas.",
              ],
            ]}
          />
        </DocCard>

        <Related
          links={[
            {
              href: "/es/documentacion/pipelines",
              label: "Arma un Pipeline en un lienzo",
              description: "Encadena Splitters, Flows, Agentes, Buckets y más en una sola ejecución.",
            },
            {
              href: "/es/documentacion/colecciones",
              label: "Cómo enrutan documentos las Colecciones",
              description: "El paso de clasificación que produce las líneas “rutea a” del mapa.",
            },
            {
              href: "/es/documentacion/cleaners",
              label: "Cómo transforman los Cleaners los datos extraídos",
              description: "Por qué varios Flows suelen compartir un mismo nodo Cleaner.",
            },
            {
              href: "/es/documentacion/buckets",
              label: "Dónde se guardan los resultados",
              description: "Los Buckets del lado derecho y qué escribe en ellos.",
            },
          ]}
        />
      </section>
    </>
  );
}
