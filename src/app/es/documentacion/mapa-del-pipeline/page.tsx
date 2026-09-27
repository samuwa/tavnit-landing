import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  Database,
  Filter,
  Info,
  Layers,
  LayoutGrid,
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
            "El Mapa del pipeline de Tavnit en la vista Columns, con Splitters y Collections que alimentan un Flow, luego Cleaners y luego Buckets.",
          width: 1327,
          height: 801,
        }}
      />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
          Mapa del pipeline
        </h1>

        <DocCard icon={<Workflow size={24} />} title="Qué muestra el Mapa del pipeline">
          <Lead>
            El Mapa del pipeline dibuja cada objeto de tu espacio de trabajo como un nodo y cada
            conexión entre ellos como una línea. Responde preguntas que cuesta mucho contestar
            navegando por las páginas de detalle: qué alimenta a este Flow, qué Cleaner comparten
            estos dos Flows y a qué Bucket no le escribe nada.
          </Lead>
          <p>
            Ábrelo desde &ldquo;Pipeline Map&rdquo; en la barra lateral. Es una página completa, no
            una ventana superpuesta, y lee tu configuración en vivo, así que siempre está al día; no
            es un diagrama que alguien dibujó una vez y dejó de actualizar.
          </p>
          <Screenshot
            src="/assets/docs-pipeline-map-2026-08.jpg"
            alt="El Mapa del pipeline de Tavnit en la vista Columns. Una columna Input tiene dos Splitters y dos Collections, una columna Processing tiene un Flow y dos Cleaners, una columna Audio tiene un Signal y una columna Data and Activity tiene tres Buckets, con líneas que muestran cómo se mueven los documentos entre ellos."
            caption="Vista Columns. Los documentos se mueven de izquierda a derecha: entrada, procesamiento y luego almacenamiento."
          />
        </DocCard>

        <DocCard icon={<Layers size={24} />} title="Cómo leer el mapa">
          <Lead>
            Los nodos se agrupan en etapas que siguen la dirección en la que realmente viajan los
            documentos: todo lo que trae un documento está a la izquierda, todo lo que lo procesa
            está en el centro y todo lo que guarda el resultado está a la derecha.
          </Lead>
          <DataTable
            head={["Etapa", "Contiene", "Qué significa una línea que llega a ella"]}
            rows={[
              [
                "Input",
                <Fragment key="f0">
                  <DocLink href="/es/documentacion/splitters">Splitters</DocLink> y{" "}
                  <DocLink href="/es/documentacion/collections">Collections</DocLink>
                </Fragment>,
                "Los documentos llegan aquí primero, para dividirse o clasificarse.",
              ],
              [
                "Processing",
                <Fragment key="f1">
                  Flows y <DocLink href="/es/documentacion/cleaners">Cleaners</DocLink>
                </Fragment>,
                "Este Flow recibe documentos de esa Collection o ese Splitter; este Cleaner barre la salida de ese Flow.",
              ],
              [
                "Data & activity",
                <Fragment key="f2">
                  <DocLink href="/es/documentacion/buckets">Buckets</DocLink>
                </Fragment>,
                "Este Flow o este Cleaner escribe sus resultados en ese Bucket.",
              ],
            ]}
          />
          <p>
            Cada grupo muestra un conteo y se puede ordenar: <em>Connected First</em> sube los
            nodos conectados para que los que no tienen conexión resalten al final. Al hacer clic en
            cualquier nodo se abre su página de detalle.
          </p>
        </DocCard>

        <DocCard icon={<LayoutGrid size={24} />} title="Tres vistas">
          <Lead>
            El mismo grafo se puede dibujar de tres formas. Cambia entre ellas desde la barra de
            herramientas; ninguna cambia tu configuración, solo cómo se acomoda en la pantalla.
          </Lead>
          <DataTable
            head={["Vista", "Ideal para"]}
            rows={[
              [
                "Columns",
                "La predeterminada. Leer el pipeline de izquierda a derecha como una secuencia de etapas: la vista más clara para explicarle la configuración a otra persona.",
              ],
              [
                "Lanes",
                "Seguir un solo camino por el espacio de trabajo cuando muchos objetos comparten la misma etapa.",
              ],
              [
                "Orbits",
                "Detectar los centros más concurridos: en torno a qué Flow o Bucket se agrupa todo lo demás.",
              ],
            ]}
          />
        </DocCard>

        <DocCard icon={<Filter size={24} />} title="Encontrar cosas en un espacio de trabajo grande">
          <Lead>
            Cuando un espacio de trabajo tiene unas cuantas docenas de objetos, el grafo completo ya
            no cabe en la pantalla. La barra de herramientas tiene lo necesario para eso: búsqueda,
            filtros, zoom y un control para ajustar todo a la pantalla de una vez.
          </Lead>
          <BulletList
            items={[
              "Busca nodos por nombre para ir directo a uno",
              "Filtra el mapa para ver solo los tipos de objeto que te interesan: la barra de herramientas muestra cuántos filtros están activos, con un botón \"Clear all\" para quitarlos con un clic",
              "Acerca y aleja la vista, o usa \"Fit\" para encuadrar todo el grafo",
              "Exporta el mapa como imagen cuando lo necesites en un documento o una revisión",
            ]}
          />
          <InfoBox color="blue" icon={<Search size={20} />} title="Encontrar objetos huérfanos">
            Ordena cada grupo con <em>Connected First</em> y revisa el final de cada columna. Un Flow
            sin Cleaner y sin Bucket está tirando sus resultados, a menos que algo los recoja por la
            API; un Bucket al que no apunta nada solo recibe datos escritos a mano.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Info size={24} />} title="Cuándo vale la pena abrir el mapa">
          <Lead>
            El mapa es una herramienta de diagnóstico, no algo que uses a diario. Demuestra su valor
            en los momentos en que necesitas entender la forma del espacio de trabajo, no el
            contenido de un Run.
          </Lead>
          <BulletList
            items={[
              "Antes de borrar algo: el mapa muestra qué más está conectado a eso",
              "Cuando un documento termina en el lugar equivocado y necesitas ver el camino de enrutamiento que siguió",
              "Al incorporar a alguien, como explicación en una sola pantalla de cómo encaja el espacio de trabajo",
              "Después de una configuración grande, para comprobar que nada quedó sin conectar",
              "Cuando dos equipos configuraron Flows por su cuenta y quieres encontrar trabajo duplicado",
            ]}
          />
          <InfoBox color="violet" icon={<Database size={20} />} title="Estructura, no volumen">
            El mapa muestra cómo están conectadas las cosas, no cuánto fluye por ellas. Para
            volúmenes, créditos y fallas, usa la lista de la página &ldquo;Runs&rdquo; y el historial
            de actividad de cada objeto.
          </InfoBox>
        </DocCard>

        <Related
          links={[
            {
              href: "/es/documentacion/collections",
              label: "Cómo enrutan documentos las Collections",
              description: "El paso de clasificación que produce los enlaces de la etapa Input en el mapa.",
            },
            {
              href: "/es/documentacion/cleaners",
              label: "Cómo transforman los Cleaners los datos extraídos",
              description: "Por qué varios Flows suelen compartir un mismo nodo de Cleaner.",
            },
            {
              href: "/es/documentacion/buckets",
              label: "Dónde se guardan los resultados extraídos",
              description: "Los Buckets del lado derecho y qué escribe en ellos.",
            },
            {
              href: "/es/documentacion/splitters",
              label: "Dividir PDF con varios documentos",
              description: "El otro objeto de la etapa Input y cómo se encadena con las Collections.",
            },
          ]}
        />
      </section>
    </>
  );
}
