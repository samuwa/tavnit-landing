import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  HelpCircle,
  Inbox,
  Info,
  Layers,
  PenLine,
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

/** Refleja los pasos numerados visibles en "Activar la revisión en un Flow". */
const HOW_TO = {
  name: "Agregar un paso de revisión humana a un Flow de Tavnit",
  description:
    "Activa la Revisión Humana en un Flow y asigna revisores para que cada Run se pause a la espera de aprobación antes de entregar sus resultados.",
  steps: [
    {
      name: "Abre el panel Revisión Humana del Flow",
      text: "Ve a Flows en la app de Tavnit, abre el Flow y selecciona el panel Revisión Humana en su barra lateral.",
    },
    {
      name: "Activa la revisión",
      text: "Activa el interruptor. Desde ese momento, los nuevos Runs del Flow se pausan en lugar de entregar sus resultados.",
    },
    {
      name: "Asigna revisores",
      text: "En Revisores, elige uno o más miembros de tu organización. Solo los revisores asignados pueden aprobar o rechazar los Runs pausados del Flow.",
    },
    {
      name: "Procesa un documento y revisa la cola",
      text: "Procesa un documento. Debería aparecer como Esperando revisión en la cola de Revisión Humana de cada revisor asignado.",
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
              "La pantalla de revisión humana de Tavnit: una tabla de datos editable junto al documento original, con las acciones Aprobar y Rechazar.",
            width: 1327,
            height: 801,
          }}
        />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
          Revisión Humana
        </h1>

        <DocCard icon={<ClipboardCheck size={24} />} title="Qué hace la Revisión Humana">
          <Lead>
            La Revisión Humana (Human in the Loop, HITL) pone un punto de control entre la extracción y
            la entrega. Un Run que necesita revisión se detiene después de la extracción y la limpieza
            con el estado <strong>Esperando aprobación</strong>: no se envía ningún email, no se
            dispara ningún webhook, no se escribe ninguna fila en un Bucket y no arranca ningún Agente
            vinculado hasta que un revisor designado lo apruebe.
          </Lead>
          <p>
            La palabra clave es <em>antes</em>. La revisión no es una corrección que aplicas después
            de que los datos malos ya llegaron a tu ERP; el paso de entrega todavía no se ha ejecutado.
            Cuando el revisor aprueba, el Run continúa exactamente desde donde se pausó, con sus
            ediciones.
          </p>
          <BulletList
            items={[
              "Datos de alto valor que deben verificarse antes de seguir adelante",
              "Un requisito de cumplimiento que exige un paso de aprobación manual documentado",
              "Documentos cuya extracción suele ser correcta, pero donde un error sale caro",
              "Valores que solo una persona puede aportar, como un centro de costo interno o un código de aprobación",
              "Proveedores o formatos nuevos, hasta que confíes en el Flow",
            ]}
          />
          <p>
            Los Runs de Flows son el caso principal, pero la misma cola también reúne los{" "}
            <DocLink href="/es/documentacion/matchers">Matches</DocLink>, las{" "}
            <DocLink href="/es/documentacion/inspectores">inspecciones</DocLink> y los{" "}
            <DocLink href="/es/documentacion/fillers">rellenados</DocLink> que están en pausa.
            Consulta <em>Otras cosas que esperan revisión</em> más abajo.
          </p>
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Tres maneras de pausar un Run de un Flow">
          <Lead>
            El interruptor del Flow es una manera de enviar Runs a revisión, pero no la única. Un{" "}
            <DocLink href="/es/documentacion/cleaners">Cleaner</DocLink> vinculado al Flow puede pausar
            Runs por su cuenta, aunque el interruptor esté apagado. Cuando varios disparadores aplican
            al mismo Run, sus listas de revisores se combinan.
          </Lead>
          <DataTable
            head={["Disparador", "Qué se pausa", "Ideal para"]}
            rows={[
              [
                "Configuración del Flow (panel Revisión Humana)",
                "Todos los Runs del Flow, sin importar lo que se extrajo.",
                "Un tipo de documento que siempre necesita visto bueno, o un Flow recién creado en el que todavía no confías.",
              ],
              [
                "Regla de Acciones Condicionales del Cleaner con la acción Human in the Loop",
                "Solo los Runs en los que una fila cumplió la regla, por ejemplo un total por encima de un umbral o un RUC faltante.",
                "Mucho volumen donde casi todos los Runs están bien y solo quieres revisar las excepciones.",
              ],
              [
                "Campo de Entrada Humana del Cleaner",
                "Todos los Runs que pasan por el Cleaner, porque una persona tiene que escribir o elegir el valor.",
                "Datos que no están en el documento y que alguien tiene que agregar.",
              ],
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="No tienes que revisarlo todo">
            Revisar cada Run anula el sentido de automatizar la extracción. Lo habitual es la vía
            condicional: en el Cleaner, agrega un campo de Acciones Condicionales, dale una condición
            como <em>total &gt; 10,000</em>, agrega la acción Human in the Loop y elige sus revisores.
            Solo se detienen los Runs que cumplen la condición. El interruptor del Flow puede quedarse
            apagado.
          </InfoBox>
          <p>
            Cuando una regla del Cleaner dispara la pausa, Tavnit registra qué filas y qué campos
            cumplieron la condición. La pantalla de revisión marca exactamente esas celdas, así el
            revisor empieza por el motivo de la pausa en lugar de leer toda la tabla. Si la regla se
            alimenta de un campo de Anomalías, el revisor también ve el motivo por el que se marcó cada
            valor.
          </p>
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Activar la revisión en un Flow">
          <Lead>
            El interruptor está en la configuración del propio Flow. Solo un Propietario o un
            Administrador puede cambiarlo. Los revisores se eligen entre los miembros de tu
            organización.
          </Lead>
          <NumberedList
            items={[
              <Fragment key="f0">
                Abre el Flow y selecciona el panel <strong>Revisión Humana</strong> en su barra
                lateral.
              </Fragment>,
              <Fragment key="f1">Activa el interruptor.</Fragment>,
              <Fragment key="f2">
                En <strong>Revisores</strong>, elige uno o más miembros de tu organización.
              </Fragment>,
              <Fragment key="f3">
                Procesa un documento y confirma que aparece como <strong>Esperando revisión</strong>{" "}
                en la cola de <strong>Revisión Humana</strong> de los revisores.
              </Fragment>,
            ]}
          />
          <WarningBox>
            Con la revisión activada y sin revisores asignados, el panel advierte{" "}
            <em>&ldquo;Sin revisores seleccionados — las aprobaciones no llegarán a nadie.&rdquo;</em>{" "}
            Los Runs pausados se quedan sin nadie que pueda aprobarlos. Asigna al menos un revisor
            antes de enviar documentos.
          </WarningBox>
          <InfoBox
            color="violet"
            icon={<Info size={20} />}
            title="Con un Cleaner vinculado, los revisores ven datos limpios"
          >
            Cuando el Flow tiene un Cleaner, la pausa ocurre después de la limpieza, así que la tabla
            en revisión es la salida limpia, con monedas convertidas, fechas reformateadas y columnas
            calculadas. Eso es lo que se va a entregar, así que es lo que conviene revisar.
          </InfoBox>
        </DocCard>

        <DocCard icon={<PenLine size={24} />} title="Campos de Entrada Humana">
          <Lead>
            Un campo de Entrada Humana es una columna del Cleaner que nunca se extrae: la completa un
            revisor en la pantalla de revisión. Úsalo para un centro de costo, una cuenta contable, un
            código de aprobación interno o cualquier dato que el documento no puede darte.
          </Lead>
          <DataTable
            head={["Opción", "Qué hace"]}
            rows={[
              ["Free text", "El revisor escribe el valor."],
              [
                "Menu",
                "El revisor elige entre los valores distintos de una columna de un Bucket (Options Bucket y Options Column), con filtros opcionales, incluidos filtros sobre los campos de la fila actual.",
              ],
              [
                "Value is mandatory",
                "Bloquea la aprobación hasta que todas las filas tengan un valor. Apágalo para permitir valores vacíos.",
              ],
              ["Revisores", "Quién puede completar el campo y aprobar; se combinan con los revisores del Flow."],
            ]}
          />
          <p>
            Todo Run que pasa por un Cleaner con un campo de Entrada Humana se pausa para revisión,
            esté o no activado el interruptor del Flow. En la pantalla de revisión, la columna aparece
            marcada como <strong>Requiere entrada humana</strong> con el conteo de filas completadas, y
            Aprobar queda bloqueado (<em>&ldquo;Completa todos los valores de entrada humana
            obligatorios para aprobar&rdquo;</em>) hasta que estén todos los valores obligatorios.
          </p>
        </DocCard>

        <DocCard icon={<Inbox size={24} />} title="La cola de revisión">
          <Lead>
            La página <strong>Revisión Humana</strong> de la barra lateral lista todo lo que te
            espera, del más reciente al más antiguo. Solo muestra los elementos en los que eres
            revisor; los revisores no ven las colas de los demás.
          </Lead>
          <BulletList
            items={[
              "Cifras resumen arriba: Esperando Revisión, Más Antigua Pendiente, Tu Rol y Flows con HITL",
              "Una tarjeta por elemento: el nombre del archivo y el Flow de un Run, con una etiqueta Match o Rellenado para esos tipos, y el estado Esperando revisión",
              "Un punto rojo en el ícono de la barra lateral siempre que algo te espera. Se actualiza en tiempo real, sin recargar la página",
              "Los revisores asignados también reciben un email con un enlace directo en cuanto un Run, un Match, una inspección o un rellenado los necesita",
            ]}
          />
        </DocCard>

        <DocCard icon={<SplitSquareHorizontal size={24} />} title="Revisar un Run">
          <Lead>
            La pantalla de revisión es una vista dividida: la tabla extraída a la izquierda y el
            documento original a la derecha. Verificas un valor contra el original sin salir de la
            página, lo corriges ahí mismo y apruebas. El divisor se puede arrastrar y, en el celular,
            cambias entre los dos paneles.
          </Lead>
          <Screenshot
            src="/assets/docs-hitl-review-2026-08.jpg"
            alt="La pantalla de revisión de Tavnit para un Run en espera de revisión: una tabla de datos editable a la izquierda con las columnas Subtotal, Amount y Weight y casillas por fila, la factura original a la derecha, y los botones Rechazar y Aprobar en el encabezado."
            caption="Un Run en espera de revisión. La tabla de la izquierda es la salida limpia que se va a entregar; el documento original está al lado para verificarla."
          />
          <DataTable
            head={["En la tabla de datos puedes", "Cómo"]}
            rows={[
              ["Editar un valor", "Doble clic en la celda y escribe."],
              [
                "Cambiar muchas celdas a la vez",
                "Selecciona arrastrando, con Shift+clic o haciendo clic en el encabezado de una columna, y luego Aplicar a seleccionadas.",
              ],
              ["Quitar una fila de la salida", "Desmárcala. Las filas excluidas no se entregan."],
              ["Agregar o quitar una columna", "Usa Agregar columna o Eliminar columna. Una columna eliminada se puede restaurar antes de aprobar."],
              ["Ver qué disparó la pausa", "Las celdas que cumplieron una regla del Cleaner aparecen marcadas."],
              ["Completar campos de Entrada Humana", "Escribe el valor o elígelo del menú."],
              ["Ver lo que cambiaste", "Las celdas editadas siguen resaltadas hasta que apruebas."],
            ]}
          />
          <BulletList
            items={[
              "El panel del documento muestra PDFs con navegación por páginas y también imágenes; las hojas de cálculo se pueden descargar",
              "Ajustar al ancho, Ajustar a la altura y zoom manual; arrastra para desplazarte",
              "Ctrl/Cmd + y − para hacer zoom, Ctrl/Cmd + 0 para restablecer",
            ]}
          />
        </DocCard>

        <DocCard icon={<CheckCircle2 size={24} />} title="Aprobar y rechazar">
          <Lead>
            Aprobar incorpora tus ediciones al Run y lo libera. Rechazar cancela el Run y no entrega
            nada. Ambas decisiones son definitivas para ese Run: la pausa es un control de una sola
            vez, no un estado que puedas alternar.
          </Lead>
          <DataTable
            head={["Decisión", "Qué pasa con el Run", "Qué se entrega"]}
            rows={[
              [
                "Aprobar",
                "Tu tabla editada reemplaza la salida extraída y el Run continúa hasta Completado, con la insignia HITL Aprobado.",
                <Fragment key="f4">
                  Todo lo que el Flow tiene configurado: email de salida, webhook, exportación al{" "}
                  <DocLink href="/es/documentacion/buckets">Bucket</DocLink>, llenado de formularios y
                  el <DocLink href="/es/documentacion/agentes">Agente</DocLink> vinculado, todo con los
                  datos aprobados.
                </Fragment>,
              ],
              [
                "Rechazar",
                "El Run pasa a Cancelado, con la insignia HITL Rechazado, y se registra tu razón (opcional pero recomendada).",
                "Nada. Ni email, ni webhook, ni fila en el Bucket, ni Run del Agente.",
              ],
            ]}
          />
          <InfoBox color="green" icon={<CheckCircle2 size={20} />} title="Gana la primera decisión">
            No hace falta que aprueben todos los revisores asignados. La primera aprobación o rechazo
            resuelve el Run; si otro revisor lo tenía abierto, su decisión se rechaza porque el Run ya
            no está esperando aprobación. Actualiza la cola para ver el estado actual.
          </InfoBox>
          <p>
            La página del Run muestra quién decidió (<strong>Aprobado por</strong> o{" "}
            <strong>Rechazado por</strong>).
          </p>
        </DocCard>

        <DocCard icon={<Layers size={24} />} title="Otras cosas que esperan revisión">
          <Lead>
            Los Matchers, los Inspectores y los Fillers tienen su propia configuración de revisión, y
            sus elementos pausados llegan a la misma cola, con la misma regla de que gana la primera
            decisión y el mismo registro de auditoría.
          </Lead>
          <DataTable
            head={["Elemento", "Cuándo se pausa", "Qué hace el revisor"]}
            rows={[
              [
                <DocLink key="o0" href="/es/documentacion/matchers">Match</DocLink>,
                "Cuando la revisión humana está activada en el Matcher: todos los Matches.",
                "Verifica y corrige el emparejamiento de filas entre documentos que hizo la IA, puede excluir filas, y luego aprueba o rechaza.",
              ],
              [
                <DocLink key="o1" href="/es/documentacion/inspectores">Inspección</DocLink>,
                "Cuando la revisión humana está activada en el Inspector, o cuando un check que falla pide revisión con sus acciones en caso de fallo.",
                "Exonera los checks que fallan indicando una razón y aprueba para cerrar el veredicto, o rechaza para cancelar la inspección.",
              ],
              [
                <DocLink key="o2" href="/es/documentacion/fillers">Rellenado</DocLink>,
                "Cuando la revisión humana está activada en el Filler, o siempre que tenga campos de Rellenado humano asignados.",
                "Revisa los formularios llenados, escribe los valores de Rellenado humano y aprueba para liberar los formularios, o rechaza.",
              ],
            ]}
          />
        </DocCard>

        <DocCard icon={<Eye size={24} />} title="Quién puede revisar">
          <Lead>
            Solo las personas asignadas como revisores pueden aprobar o rechazar un Run de un Flow. Ser
            Administrador no basta: un Administrador que no está en la lista de revisores no recibe el
            Run en su cola y no puede aprobarlo.
          </Lead>
          <BulletList
            items={[
              "Las listas de revisores del Flow las administra un Propietario o un Administrador",
              "La acción Human in the Loop de un Cleaner y cada campo de Entrada Humana tienen sus propios revisores, que se combinan con los del Flow",
              "Cualquier miembro puede ser revisor, sea cual sea su rol",
              "El rol Solo HITL está pensado para revisores: esos miembros solo ven la cola de Revisión Humana y pueden revisar, pero no pueden ejecutar ni cambiar nada más",
            ]}
          />
          <p>
            Consulta <DocLink href="/es/documentacion/roles-de-usuario">roles de usuario y
            permisos</DocLink> para ver qué puede cambiar cada rol.
          </p>
        </DocCard>

        <DocCard icon={<Shield size={24} />} title="El registro de auditoría inalterable">
          <Lead>
            Cada acción de revisión se escribe en un registro permanente, de solo anexar, con fecha y
            hora y la identidad del revisor. Las entradas no se pueden editar ni borrar, así que el
            registro de quién cambió qué, y de cómo estaban los datos antes de tocarlos, sobrevive a la
            revisión.
          </Lead>
          <DataTable
            head={["Evento registrado", "Cuándo se escribe"]}
            rows={[
              ["Revisores notificados", "El Run entra en la cola de revisión y se envía el email a los revisores."],
              ["Celda editada", "Se cambia un valor, con el valor anterior y el nuevo."],
              ["Fila agregada / fila eliminada", "El revisor agrega una fila o excluye una."],
              ["Columna agregada / columna eliminada", "El revisor cambia la forma de la tabla."],
              ["Aprobado", "La decisión, el revisor y cuántas ediciones se hicieron."],
              ["Rechazado", "La decisión, el revisor y la razón indicada."],
            ]}
          />
          <InfoBox color="purple" icon={<Shield size={20} />} title="También se guardan los datos previos a la revisión">
            Tavnit guarda la salida tal como estaba antes de que el revisor la tocara, junto a la
            versión aprobada. Un auditor puede comparar la extracción con el resultado entregado sin
            tener que reconstruirlo a partir del registro de eventos.
          </InfoBox>
        </DocCard>

        <DocCard icon={<HelpCircle size={24} />} title="Solución de problemas">
          <DataTable
            head={["Síntoma", "Causa probable y solución"]}
            rows={[
              [
                "Los Runs se pausan aunque el interruptor del Flow está apagado",
                "El Cleaner del Flow tiene una regla de Acciones Condicionales con la acción Human in the Loop, o un campo de Entrada Humana.",
              ],
              [
                "Un Run está Esperando aprobación pero no aparece en mi cola",
                "No estás en su lista de revisores. Pide a un Propietario o Administrador que te agregue en el Flow (o en la regla del Cleaner que lo pausó).",
              ],
              [
                "Al aprobar, se rechaza porque no eres revisor configurado",
                "Solo los revisores asignados pueden decidir. Si no se asignó ninguno, agrega uno en el Flow; nadie más puede liberar el Run.",
              ],
              [
                "Al aprobar, se rechaza porque el Run ya no espera aprobación",
                "Otro revisor decidió primero. Actualiza la cola.",
              ],
              [
                "Aprobar está bloqueado por falta de entrada humana",
                "Un campo de Entrada Humana obligatorio sigue vacío en algunas filas. Complétalas, o haz el campo opcional en el Cleaner.",
              ],
              [
                "El Agente vinculado no se ejecutó",
                "Solo se ejecuta después de la aprobación. Un Run rechazado nunca lo inicia.",
              ],
            ]}
          />
          <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="La revisión toma su tiempo">
            Un Run pausado espera lo que haga falta. Si los resultados alimentan un proceso con plazos,
            asegúrate de que los revisores estén pendientes de su cola o de su email, o limita la pausa
            a las excepciones con una regla del Cleaner.
          </InfoBox>
        </DocCard>

        <Related
          links={[
            {
              href: "/es/documentacion/cleaners",
              label: "Dispara la revisión de forma condicional con un Cleaner",
              description:
                "Las Acciones Condicionales pausan solo los Runs que rompen una regla; los campos de Entrada Humana recogen valores de un revisor.",
            },
            {
              href: "/es/documentacion/roles-de-usuario",
              label: "Roles de usuario y permisos",
              description: "Quién puede asignar revisores y qué puede hacer el rol Solo HITL.",
            },
            {
              href: "/es/documentacion/agentes",
              label: "Actúa sobre datos aprobados con Agentes",
              description: "Un Agente vinculado arranca solo después de que el revisor aprueba.",
            },
            {
              href: "/es/documentacion/webhooks",
              label: "Entrega los resultados aprobados con webhooks",
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
