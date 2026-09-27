import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  AlertTriangle,
  ClipboardCheck,
  Code,
  Coins,
  FilePlus,
  FileText,
  HelpCircle,
  Info,
  Layers,
  ListChecks,
  PenLine,
  Send,
  Sparkles,
  Upload,
  Users,
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
  WarningBox,
} from "@/components/docs/ui";

export const metadata = docMetadata("fillers", "es");

export default function Page() {
  return (
    <>
      <DocsPageSchema slug="fillers" locale="es" />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
          Fillers
        </h1>

        <DocCard icon={<FileText size={24} />} title="¿Qué es un Filler?">
          <Lead>
            Un Filler completa formularios PDF por ti. Combina una o más plantillas PDF rellenables
            con entradas (slots), cada una extraída por un Flow, y asigna a cada campo del
            formulario un valor de esas entradas. Cada <strong>fill</strong> produce una copia
            completada de cada plantilla.
          </Lead>
          <p>
            Piensa en una declaración aduanera que necesita datos de una factura comercial y de un
            conocimiento de embarque. La factura y el conocimiento de embarque son dos entradas,
            cada una leída por su propio <DocLink href="/es/documentacion/flows">Flow</DocLink>; la
            declaración es la plantilla. Suelta los dos documentos en un fill nuevo y Tavnit te
            entrega la declaración llena.
          </p>
          <InfoBox color="violet" icon={<Sparkles size={20} />} title="Beta">
            Fillers es una función Beta. Está visible para todas las organizaciones y sus pantallas
            todavía pueden cambiar.
          </InfoBox>
          <InfoBox color="blue" icon={<Info size={20} />} title="El rellenado en sí es determinista">
            La IA lee los documentos de origen (a través de sus Flows) y puede ordenar las subidas
            en sus entradas. Escribir los valores en el formulario es una copia directa de los
            valores asignados: sin IA y sin créditos.
          </InfoBox>
        </DocCard>

        <DocCard icon={<FilePlus size={24} />} title="Configurar un Filler">
          <NumberedList
            items={[
              <Fragment key="f1">
                Abre <strong>Fillers</strong>, haz clic en <strong>&ldquo;Nuevo Filler&rdquo;</strong>{" "}
                y nómbralo según el formulario que rellena (al menos 3 caracteres). La descripción
                es opcional.
              </Fragment>,
              <Fragment key="f2">
                En la pestaña <strong>Configuración</strong>, agrega las <strong>Entradas</strong>:
                una por documento de origen. Haz clic en <strong>Agregar entrada</strong>, ponle un
                nombre (p. ej., &ldquo;Factura Comercial&rdquo;) y elige su{" "}
                <strong>Flow de extracción</strong>. Márcala como <strong>Requerida</strong> u{" "}
                <strong>Opcional</strong>.
              </Fragment>,
              <Fragment key="f3">
                En <strong>Plantillas PDF</strong>, haz clic en <strong>Agregar PDF</strong> y sube
                cada formulario rellenable que este Filler completa. Tavnit indica cuántos campos
                rellenables detectó.
              </Fragment>,
              <Fragment key="f4">
                En <strong>Asignación de campos</strong>, haz clic en{" "}
                <strong>Editar asignaciones</strong> en cada plantilla, conecta sus campos con las
                entradas (lo vemos abajo) y luego <strong>Guardar asignaciones</strong>.
              </Fragment>,
              <Fragment key="f5">
                Haz clic en <strong>Guardar</strong> en el encabezado. Cuando la lista de pasos
                muestre <strong>Listo para llenar</strong>, inicia fills desde la pestaña{" "}
                <strong>Fills</strong>.
              </Fragment>,
            ]}
          />
          <DataTable
            head={["Ajuste de la entrada", "Efecto"]}
            rows={[
              ["Requerida", "El fill espera esta entrada antes de rellenar el formulario."],
              ["Opcional", "Si la entrada falta, sus campos simplemente quedan en blanco."],
            ]}
          />
        </DocCard>

        <DocCard icon={<ListChecks size={24} />} title="Asignar los campos del PDF">
          <Lead>
            El diálogo de asignación lista todos los campos rellenables de la plantilla. Para cada
            uno, elige una entrada y un campo del Flow de esa entrada. Los campos sin asignar quedan
            en blanco.
          </Lead>
          <BulletList
            items={[
              <Fragment key="m1">
                Los <strong>Campos individuales</strong> toman el primer valor no vacío del campo
                asignado en los resultados de la entrada.
              </Fragment>,
              <Fragment key="m2">
                <strong>Columnas de tabla</strong>: los formularios suelen repetir una línea por
                artículo (<InlineCode>item1_qty</InlineCode>, <InlineCode>item2_qty</InlineCode>…).
                Tavnit detecta estos grupos; asigna la columna una vez y cada fila de los resultados
                del documento llena su propia línea, en orden. Elige{" "}
                <strong>Asignar el campo de cada fila individualmente</strong> para separar un
                grupo.
              </Fragment>,
              <Fragment key="m3">
                Cuando el Flow de la entrada está vinculado a un{" "}
                <DocLink href="/es/documentacion/cleaners">Cleaner</DocLink>, el diálogo ofrece las
                columnas de salida del Cleaner, incluidos los campos calculados y de búsqueda,
                porque eso es lo que terminan conteniendo los Runs del Flow.
              </Fragment>,
              <Fragment key="m4">
                <strong>Rellenado humano</strong> marca un campo individual como uno que una persona
                escribe durante la revisión, con una etiqueta opcional para la lista. Lo vemos en
                Revisión humana, más abajo.
              </Fragment>,
            ]}
          />
          <p>
            Las casillas de verificación se marcan cuando el valor asignado es{" "}
            <InlineCode>yes</InlineCode>, <InlineCode>true</InlineCode>, <InlineCode>on</InlineCode>
            , <InlineCode>1</InlineCode>, <InlineCode>x</InlineCode> o{" "}
            <InlineCode>checked</InlineCode>.
          </p>
        </DocCard>

        <DocCard icon={<Upload size={24} />} title="Ejecutar un fill">
          <Lead>
            Un fill reúne un Run completado por entrada y luego rellena cada plantilla. Puedes
            alimentarlo de tres formas y combinarlas.
          </Lead>
          <DataTable
            head={["Forma de entrada", "Qué pasa"]}
            rows={[
              [
                <Fragment key="r1">
                  <strong>Subir y enrutar</strong> en el diálogo <strong>Nuevo fill</strong>, o{" "}
                  <strong>Añadir documentos</strong> en el fill
                </Fragment>,
                "Suelta todos los documentos a la vez. La IA lee la primera página de cada uno y lo enruta a una entrada libre, y luego el Flow de esa entrada lo procesa. Ves el enrutado en vivo; los archivos sin coincidencia clara esperan a que elijas la entrada.",
              ],
              [
                <Fragment key="r2">
                  <strong>Subir archivo</strong> en una entrada
                </Fragment>,
                "Tú indicas la entrada, así que no se enruta nada. El archivo inicia un Run del Flow de esa entrada.",
              ],
              [
                <Fragment key="r3">
                  <strong>Adjuntar run</strong> en una entrada
                </Fragment>,
                "Reutiliza un Run completado del Flow de la entrada que ya existe; no se vuelve a extraer nada.",
              ],
            ]}
          />
          <p>
            Las subidas deben ser archivos PDF o de imagen (PNG, JPG, JPEG).{" "}
            <strong>Iniciar fill vacío</strong> abre un fill sin documentos para que alimentes las
            entradas una por una.
          </p>
          <p>
            El momento en que se dispara el fill depende del ajuste{" "}
            <strong>¿Cuándo se rellena el formulario?</strong> en la pestaña Ajustes del Filler:
          </p>
          <DataTable
            head={["Ajuste", "Comportamiento"]}
            rows={[
              ["Automático", "Rellena en cuanto cada entrada requerida tenga un Run completado."],
              [
                "Manual",
                "Sigue recopilando documentos hasta que alguien haga clic en Rellenar ahora. Útil cuando todavía pueden llegar entradas opcionales.",
              ],
            ]}
          />
          <p>
            <strong>Rellenar ahora</strong> también funciona en un Filler automático: si todavía hay
            Runs procesándose, el fill los espera y luego rellena. <strong>Cancelar</strong> deja de
            recopilar; los Runs ya adjuntados se conservan.
          </p>
          <InfoBox color="blue" icon={<Info size={20} />} title="Un fill conserva la configuración con la que empezó">
            Las entradas, plantillas y asignaciones se congelan al crear el fill. Editar el Filler
            después solo afecta a los fills nuevos: una entrada agregada más tarde no puede recibir
            documentos en un fill existente.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Layers size={24} />} title="Estados de un fill">
          <DataTable
            head={["Estado", "Significado"]}
            rows={[
              ["Recopilando", "Esperando documentos o Runs en sus entradas."],
              ["Esperando runs", "Ya se disparó, pero algunos Runs asignados siguen procesándose."],
              ["En cola / En ejecución", "Rellenando las plantillas."],
              ["Esperando revisión HITL", "Rellenado y retenido hasta que un revisor lo apruebe."],
              ["Completado", "Los PDFs rellenados están listos y las salidas se enviaron."],
              [
                "Fallido",
                "Algo lo detuvo, normalmente una entrada requerida cuyo Run falló. El motivo aparece en el fill.",
              ],
              ["Cancelado", "Se detuvo antes de rellenar el formulario."],
            ]}
          />
          <p>
            Mientras recopila, un Run fallido solo deja su entrada vacía: sube un reemplazo o
            adjunta otro Run. Cuando el fill ya está esperando Runs, una entrada requerida fallida
            hace fallar el fill.
          </p>
        </DocCard>

        <DocCard icon={<ClipboardCheck size={24} />} title="Revisión humana">
          <p>
            Activa la revisión en la pestaña <strong>Revisión Humana</strong> del Filler y elige a
            los revisores. Cada fill se pausa entonces como <strong>Esperando revisión HITL</strong>{" "}
            con los formularios ya rellenados, y no se envía nada hasta que un revisor lo apruebe.
          </p>
          <BulletList
            items={[
              "El revisor ve el formulario rellenado junto a los documentos de origen, puede corregir cualquier valor y escribe los campos de Rellenado humano; al hacer clic en un campo salta a su casilla en el formulario.",
              "Al aprobar, los formularios se vuelven a rellenar con los valores del revisor y se liberan las salidas. Se puede aprobar con campos humanos en blanco; quedan registrados en el historial de auditoría del fill.",
              <Fragment key="h3">
                Asignar cualquier campo de <strong>Rellenado humano</strong> hace que cada fill se
                pause para revisión aunque el interruptor esté apagado, porque una persona tiene que
                escribirlo.
              </Fragment>,
            ]}
          />
          <p>
            Los fills pausados aparecen en la cola de{" "}
            <DocLink href="/es/documentacion/revision-humana">Revisión Humana</DocLink> de los
            revisores.
          </p>
        </DocCard>

        <DocCard icon={<Send size={24} />} title="Salidas">
          <BulletList
            items={[
              <Fragment key="o1">
                En la página del fill: <strong>Descargar PDF rellenado</strong> por plantilla, o{" "}
                <strong>Descargar todos</strong>, además de una tabla de{" "}
                <strong>Valores de los campos</strong> con cada campo del PDF, su valor y su origen.
              </Fragment>,
              <Fragment key="o2">
                <strong>Salida por Email</strong>: la dirección recibe cada PDF rellenado como
                adjunto.
              </Fragment>,
              <Fragment key="o3">
                <strong>Webhook</strong>: envía por POST un JSON con el resultado y los valores de
                los campos; consulta los{" "}
                <DocLink href="/es/documentacion/webhooks">webhooks</DocLink>.
              </Fragment>,
              "Una notificación en la app para la persona que inició el fill.",
            ]}
          />
          <p>
            Un Filler también puede ser un paso de un{" "}
            <DocLink href="/es/documentacion/pipelines">Pipeline</DocLink>, alimentado por los Flows
            anteriores.
          </p>
        </DocCard>

        <DocCard icon={<Code size={24} />} title="API">
          <p>
            Copia el <strong>ID del Filler</strong> desde su pestaña y llama a la{" "}
            <DocLink href="/es/documentacion/api">API REST</DocLink> con tu{" "}
            <InlineCode>X-API-Key</InlineCode>:
          </p>
          <DataTable
            head={["Endpoint", "Qué hace"]}
            rows={[
              [
                <InlineCode key="a1">POST /api/fillers/&lt;filler_id&gt;/fills</InlineCode>,
                "Crea un fill vacío; devuelve su fill_id.",
              ],
              [
                <InlineCode key="a2">POST /api/fills/&lt;fill_id&gt;/route-upload</InlineCode>,
                "Sube un documento y deja que Tavnit lo enrute a una entrada.",
              ],
              [
                <InlineCode key="a3">POST /api/fills/&lt;fill_id&gt;/inputs/&lt;input_id&gt;/upload</InlineCode>,
                "Sube un documento a una entrada concreta.",
              ],
              [
                <InlineCode key="a4">POST /api/fills/&lt;fill_id&gt;/inputs/&lt;input_id&gt;/attach-run</InlineCode>,
                "Adjunta un Run completado existente (run_id).",
              ],
              [
                <InlineCode key="a5">POST /api/fills/&lt;fill_id&gt;/fire</InlineCode>,
                "Deja de recopilar y rellena ahora.",
              ],
            ]}
          />
          <p>Los PDFs rellenados te llegan por la salida de correo o de webhook del Filler.</p>
        </DocCard>

        <DocCard icon={<Coins size={24} />} title="Cuánto cuestan los Fillers">
          <DataTable
            head={["Cargo", "Cuándo"]}
            rows={[
              ["Gratis", "Rellenar las plantillas, adjuntar Runs existentes, asignar a mano un archivo sin coincidencia."],
              [
                "1 crédito por documento",
                "Por cada documento enrutado con Subir y enrutar o Añadir documentos; se cobra sin importar lo que decida el enrutado.",
              ],
              ["El cargo de extracción del Flow", "Por cada documento que procesa el Flow de una entrada."],
            ]}
          />
          <p>
            Las subidas se rechazan cuando el saldo no alcanza. Consulta{" "}
            <DocLink href="/es/documentacion/creditos">Créditos y facturación</DocLink>.
          </p>
        </DocCard>

        <DocCard icon={<Users size={24} />} title="Quién puede hacer qué">
          <BulletList
            items={[
              "Los Administradores y Propietarios crean Fillers. Quien creó un Filler también puede editarlo o eliminarlo.",
              "Todos los miembros excepto los usuarios Solo HITL pueden ejecutar fills.",
              "Un Filler inactivo no puede iniciar fills nuevos. Actívalo con el interruptor Activo en el encabezado de la página.",
            ]}
          />
        </DocCard>

        <DocCard icon={<PenLine size={24} />} title="Requisitos de las plantillas y límites">
          <BulletList
            items={[
              "Las plantillas deben ser PDFs con campos rellenables (AcroForm). Un PDF plano o escaneado no tiene dónde escribir: Tavnit te avisa, y los fills quedarían vacíos.",
              "Los formularios creados con Adobe LiveCycle (XFA) son compatibles: Tavnit llena sus campos AcroForm y quita la capa XFA para que los valores se vean en cualquier visor.",
              "Reemplazar el PDF de una plantilla conserva sus asignaciones. Usa un PDF con los mismos nombres de campo, o vuelve a asignarlos.",
              "Quitar una plantilla elimina sus asignaciones; los fills completados conservan sus copias rellenadas.",
            ]}
          />
          <WarningBox>
            Cada entrada recibe exactamente un Run. Si un formulario necesita datos de dos facturas,
            agrega dos entradas.
          </WarningBox>
        </DocCard>

        <DocCard icon={<HelpCircle size={24} />} title="Solución de problemas">
          <DataTable
            head={["Problema", "Qué hacer"]}
            rows={[
              [
                "“Este PDF no tiene campos de formulario rellenables”",
                "La plantilla es plana. Vuelve a crearla como PDF rellenable o usa la versión rellenable oficial del formulario.",
              ],
              [
                "Un campo sale en blanco",
                "Comprueba que esté asignado, que el Run de la entrada se haya completado y que el Flow realmente haya extraído un valor. Las entradas opcionales dejan sus campos en blanco si faltan.",
              ],
              [
                "“Faltan entradas requeridas”",
                "Una entrada requerida aún no tiene Run. Sube un documento o adjunta un Run y vuelve a rellenar.",
              ],
              [
                "Un archivo enrutado queda sin coincidencia",
                "Elige la entrada a mano con Asignar a slot…. Los nombres claros de los Flows ayudan al enrutador.",
              ],
              [
                "“Run belongs to a different flow”",
                "Adjunta un Run completado del propio Flow de extracción de la entrada.",
              ],
              [
                "El fill sigue en Esperando revisión HITL",
                "Revisa los revisores del Filler o ábrelo desde la cola de Revisión Humana.",
              ],
            ]}
          />
          <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Cambia el Filler y luego inicia un fill nuevo">
            Corregir una asignación no cambia los fills que ya existen, porque cada fill conserva la
            configuración con la que empezó.
          </InfoBox>
        </DocCard>

        <Related
          links={[
            {
              href: "/es/documentacion/flows",
              label: "Crea los Flows que alimentan cada entrada",
              description: "Define los campos que debe producir cada documento de origen.",
            },
            {
              href: "/es/documentacion/revision-humana",
              label: "Revisa los formularios rellenados antes de enviarlos",
              description: "Cómo los revisores aprueban, corrigen y liberan el trabajo pausado.",
            },
            {
              href: "/es/documentacion/pipelines",
              label: "Ejecuta un Filler dentro de un Pipeline",
              description: "Encadena Splitters, Flows y Fillers en un mismo lienzo.",
            },
            {
              href: "/es/documentacion/creditos",
              label: "Cuánto cuesta todo",
              description: "Todos los precios en créditos de Tavnit, en una sola tabla.",
            },
          ]}
        />
      </section>
    </>
  );
}
