import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  Inbox,
  Info,
  Settings2,
  Shield,
  SplitSquareHorizontal,
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

export const metadata = docMetadata("human-in-the-loop", "es");

/** Refleja los pasos numerados visibles en "Activa la revisión en un Flow". */
const HOW_TO = {
  name: "Agrega un paso de revisión humana a un Flow de Tavnit",
  description:
    "Activa la revisión humana en un Flow y asigna revisores para que cada Run se detenga a esperar aprobación antes de entregar sus resultados.",
  steps: [
    {
      name: "Abre la configuración del Flow",
      text: "Ve a \"Flows\" en la app de Tavnit, abre el Flow y busca el panel \"Human in the Loop\" en su configuración.",
    },
    {
      name: "Activa la revisión",
      text: "Activa \"Human in the Loop\". A partir de ese momento, los nuevos Runs del Flow se detienen en lugar de entregar sus resultados.",
    },
    {
      name: "Asigna revisores",
      text: "Elige uno o más miembros de la organización como revisores. Solo los revisores asignados pueden ver o actuar sobre los Runs detenidos del Flow, así que un Flow con la revisión activa y sin revisores asignados se queda atascado.",
    },
    {
      name: "Procesa un documento y revisa la cola",
      text: "Procesa un documento. Debe aparecer con el estado \"Awaiting review\" en la cola \"Human in the Loop\" de cada revisor asignado.",
    },
  ],
};

export default function Page() {
  return (
    <>
      <DocsPageSchema
          slug="human-in-the-loop"
          locale="es"
          howTo={HOW_TO}
          primaryImage={{
            url: "/assets/docs-hitl-review-2026-08.jpg",
            caption:
              "La pantalla de revisión humana de Tavnit: una cuadrícula de datos editable junto al documento original, con las acciones Approve y Reject.",
            width: 1327,
            height: 801,
          }}
        />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
          Revisión humana
        </h1>

        <DocCard icon={<ClipboardCheck size={24} />} title="Qué hace la revisión humana">
          <Lead>
            La revisión humana pone un punto de control entre la extracción y la entrega. Un Run que
            necesita revisión se detiene en estado <strong>en espera de revisión</strong> después de
            la extracción y la limpieza: no se envía ningún correo, no se dispara ningún webhook y no
            se escribe ninguna fila en un Bucket hasta que un revisor designado lo aprueba.
          </Lead>
          <p>
            La palabra clave es <em>antes</em>. La revisión no es una corrección que aplicas después
            de que los datos malos ya llegaron a tu ERP: el paso de entrega todavía no se ha
            ejecutado. Cuando el revisor aprueba, el Run continúa exactamente desde donde se detuvo,
            con sus cambios incluidos.
          </p>
          <BulletList
            items={[
              "Datos de alto valor que deben verificarse antes de avanzar",
              "Un requisito de cumplimiento que exige un paso de aprobación manual documentado",
              "Documentos en los que la extracción suele acertar, pero un error ocasional sale caro",
              "Proveedores o formatos nuevos, hasta que confíes en el Flow",
            ]}
          />
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Dos formas de detener un Run">
          <Lead>
            Un Run puede enviarse a revisión de dos formas: el interruptor a nivel del Flow detiene
            todos los Runs, o una acción condicional dentro de un Cleaner detiene solo los Runs que
            cumplen una regla. Ambas pueden estar activas a la vez y, en ese caso, las dos listas de
            revisores se combinan.
          </Lead>
          <DataTable
            head={["Disparador", "Qué se detiene", "Ideal para"]}
            rows={[
              [
                "Configuración del Flow",
                "Todos los Runs del Flow, sin importar lo que se extrajo.",
                "Un tipo de documento que siempre requiere aprobación, o un Flow que acabas de crear y en el que todavía no confías.",
              ],
              [
                "Acción condicional de un Cleaner",
                "Solo los Runs en los que una fila cumplió tu regla, por ejemplo un total por encima de un límite o un identificador fiscal faltante.",
                "Mucho volumen, donde la mayoría de los Runs están bien y solo quieres revisar las excepciones.",
              ],
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="No tienes que revisarlo todo">
            Revisar cada Run anula el sentido de automatizar la extracción. La ruta condicional suele
            ser la correcta: configura un{" "}
            <DocLink href="/es/documentacion/cleaners">Cleaner</DocLink> con un campo &ldquo;Conditional
            Actions&rdquo;, dale una condición como <em>total &gt; 10,000</em> y agrega la acción de
            revisión. Solo se detienen los Runs que coinciden.
          </InfoBox>
          <p>
            Cuando un Cleaner provoca la pausa, Tavnit registra qué filas y qué campos coincidieron.
            La pantalla de revisión marca exactamente esas celdas, así que el revisor empieza por el
            motivo de la pausa en lugar de leer toda la tabla.
          </p>
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Activa la revisión en un Flow">
          <Lead>
            La revisión se configura por Flow, en la configuración del propio Flow. Solo un Owner o un
            Admin puede cambiarla. Los revisores se eligen entre los miembros de tu organización.
          </Lead>
          <NumberedList
            items={[
              <Fragment key="f0">
                Abre el Flow y busca el panel <strong>Human in the Loop</strong> en su configuración.
              </Fragment>,
              <Fragment key="f1">Activa la revisión.</Fragment>,
              <Fragment key="f2">Elige uno o más revisores entre los miembros de tu organización.</Fragment>,
              <Fragment key="f3">
                Procesa un documento y confirma que llega a la cola{" "}
                <strong>Human in the Loop</strong> de los revisores.
              </Fragment>,
            ]}
          />
          <WarningBox>
            Un Flow con la revisión activa y sin revisores asignados detendrá Runs que nadie puede
            aprobar. La app te avisa cuando guardas en ese estado: asigna al menos un revisor antes de
            enviar documentos.
          </WarningBox>
          <InfoBox
            color="violet"
            icon={<Info size={20} />}
            title="Con un Cleaner, los revisores ven los datos limpios"
          >
            Cuando el Flow tiene un Cleaner, la pausa ocurre después de la limpieza, así que la tabla
            en revisión es la salida limpia: monedas convertidas, fechas con nuevo formato, columnas
            calculadas y todo lo demás. Eso es lo que se entregará, así que es lo que conviene revisar.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Inbox size={24} />} title="La cola de revisión">
          <Lead>
            Los revisores asignados reciben un correo en cuanto un Run necesita atención, y la página{" "}
            <strong>Human in the Loop</strong> de la barra lateral muestra todo lo pendiente. Está
            filtrada a los Runs asignados a ti: los revisores no ven las colas de los demás.
          </Lead>
          <BulletList
            items={[
              "Cifras de resumen arriba: cuántos Runs esperan, cuánto tiempo lleva esperando el más antiguo, tu rol y cuántos Flows aportan Runs",
              "Una tarjeta por Run con el nombre del archivo, el Flow de origen, cuándo llegó y su estado",
              "Los más recientes primero",
              "Un punto en el ícono de la barra lateral cuando hay algo esperándote, que se actualiza automáticamente",
            ]}
          />
        </DocCard>

        <DocCard icon={<SplitSquareHorizontal size={24} />} title="Revisar un Run">
          <Lead>
            La pantalla de revisión es una vista dividida: la tabla extraída a la izquierda y el
            documento original a la derecha. Comparas un valor con el original sin salir de la página,
            lo corriges ahí mismo y apruebas. El divisor se puede arrastrar y, en el celular, cambias
            entre los dos paneles.
          </Lead>
          <Screenshot
            src="/assets/docs-hitl-review-2026-08.jpg"
            alt="La pantalla de revisión de Tavnit para un Run en espera de revisión: a la izquierda, una cuadrícula de datos editable con las columnas Subtotal, Amount y Weight y casillas por fila; a la derecha, la factura original; y en el encabezado, los botones Reject y Approve."
            caption="Un Run en espera de revisión. La cuadrícula de la izquierda es la salida limpia que se entregará; el documento original está al lado para compararlo."
          />
          <DataTable
            head={["En la cuadrícula de datos puedes", "Cómo"]}
            rows={[
              ["Editar un valor", "Haz doble clic en la celda y escribe."],
              [
                "Cambiar muchas celdas a la vez",
                "Selecciona arrastrando, con Shift y clic, o haciendo clic en el encabezado de una columna, y aplica un mismo valor a la selección.",
              ],
              ["Quitar una fila de la salida", "Desmárcala: las filas excluidas no se entregan."],
              ["Agregar o quitar una columna", "Usa la barra de herramientas. Puedes restaurar una columna quitada antes de aprobar."],
              ["Ver qué provocó la pausa", "Las filas que cumplieron una regla del Cleaner aparecen marcadas."],
              ["Ver lo que cambiaste", "Las celdas editadas quedan resaltadas hasta que apruebas."],
            ]}
          />
          <BulletList
            items={[
              "El panel del documento muestra PDFs con navegación por páginas, además de imágenes",
              "Ajuste al ancho, ajuste al alto y zoom manual; arrastra para desplazarte",
              "Ctrl/Cmd + y − para hacer zoom, Ctrl/Cmd + 0 para restablecer",
            ]}
          />
        </DocCard>

        <DocCard icon={<CheckCircle2 size={24} />} title="Aprobar y rechazar">
          <Lead>
            Aprobar incorpora tus cambios al Run y lo libera para que continúe. Rechazar cancela el
            Run y no entrega nada. Ambas decisiones son definitivas para ese Run: la pausa es un
            control de una sola vez, no un estado que puedas activar y desactivar.
          </Lead>
          <DataTable
            head={["Decisión", "Qué le pasa al Run", "Qué se entrega"]}
            rows={[
              [
                "Aprobar",
                "Tu tabla editada reemplaza la salida extraída y el Run continúa hasta terminar.",
                <Fragment key="f4">
                  Todo lo que el Flow tiene configurado, en orden: salida por correo, webhook,
                  exportación al <DocLink href="/es/documentacion/buckets">Bucket</DocLink>, llenado de
                  formularios.
                </Fragment>,
              ],
              [
                "Rechazar",
                "El Run se cancela y se registra tu motivo.",
                "Nada. Ni correo, ni webhook, ni fila en el Bucket.",
              ],
            ]}
          />
          <InfoBox color="green" icon={<CheckCircle2 size={20} />} title="Gana la primera decisión">
            No necesitas que todos los revisores asignados aprueben. La primera aprobación o rechazo
            resuelve el Run; si otro revisor lo tenía abierto, su decisión se rechaza porque el Run ya
            no está en espera de revisión. Actualiza la cola para ver el estado actual.
          </InfoBox>
          <InfoBox
            color="yellow"
            icon={<AlertTriangle size={20} />}
            title="La aprobación puede fallar por créditos"
          >
            Algunos pasos posteriores consumen créditos cuando el Run continúa. Si el saldo se agotó
            mientras el Run esperaba, la aprobación se rechaza en lugar de completarse a medias.
            Recarga créditos y vuelve a aprobar.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Eye size={24} />} title="Quién puede revisar">
          <Lead>
            Solo los miembros asignados explícitamente como revisores de un Flow pueden ver o actuar
            sobre los Runs detenidos de ese Flow. Ser Admin no basta: un Admin que no está en la lista
            de revisores no recibe el Run en su cola y no puede aprobarlo.
          </Lead>
          <BulletList
            items={[
              "Las listas de revisores se administran por Flow, y las gestiona un Owner o un Admin",
              "La acción de revisión de un Cleaner tiene su propia lista de revisores, que se combina con la del Flow",
              "La cola de un revisor muestra solo los Runs que tiene asignados",
            ]}
          />
          <p>
            Consulta <DocLink href="/es/documentacion/roles-de-usuario">roles y permisos de
            usuario</DocLink> para saber qué puede cambiar cada rol.
          </p>
        </DocCard>

        <DocCard icon={<Shield size={24} />} title="El registro de auditoría inalterable">
          <Lead>
            Cada acción de una revisión se escribe en un registro permanente, en el que solo se
            agregan entradas, con fecha y hora y la identidad del revisor. Las entradas no se pueden
            editar ni eliminar, así que el historial de quién cambió qué (y cómo se veían los datos
            antes de que los tocara) se conserva después de la revisión.
          </Lead>
          <DataTable
            head={["Evento registrado", "Cuándo se escribe"]}
            rows={[
              ["Revisores notificados", "El Run entra en la cola de revisión."],
              ["Run visto", "Un revisor abre la pantalla de revisión."],
              ["Celda editada", "Se cambia un valor, con el valor anterior y el nuevo."],
              ["Fila agregada / fila quitada", "El revisor agrega o quita una fila."],
              ["Columna agregada / columna quitada", "El revisor cambia la forma de la tabla."],
              ["Aprobado", "La decisión, el revisor y cuántos cambios se hicieron."],
              ["Rechazado", "La decisión, el revisor y el motivo indicado."],
            ]}
          />
          <InfoBox color="purple" icon={<Shield size={20} />} title="También se guardan los datos previos a la revisión">
            Tavnit guarda la salida tal como estaba antes de que el revisor la tocara, junto a la
            versión aprobada. Un auditor puede comparar la extracción con el resultado entregado sin
            reconstruirla a partir del registro de eventos.
          </InfoBox>
        </DocCard>

        <Related
          links={[
            {
              href: "/es/documentacion/cleaners",
              label: "Activa la revisión de forma condicional con un Cleaner",
              description:
                "Las acciones condicionales te permiten detener solo los Runs que rompen una regla, en lugar de todos.",
            },
            {
              href: "/es/documentacion/roles-de-usuario",
              label: "Roles y permisos de usuario",
              description: "Quién puede asignar revisores y qué puede hacer un revisor en el resto de Tavnit.",
            },
            {
              href: "/es/documentacion/webhooks",
              label: "Entrega resultados aprobados con webhooks",
              description: "Qué se dispara cuando un revisor aprueba y qué nunca se dispara si rechaza.",
            },
            {
              href: "/es/documentacion/buckets",
              label: "Guarda los datos aprobados en Buckets",
              description: "Las tablas estructuradas que solo reciben filas que un revisor aprobó.",
            },
          ]}
        />
      </section>
    </>
  );
}
