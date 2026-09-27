import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  AlertTriangle,
  ClipboardCheck,
  Code,
  Coins,
  FilePlus,
  FlaskConical,
  Info,
  Lightbulb,
  Play,
  Scale,
  Send,
  Table2,
  Target,
  Trophy,
  Wrench,
} from "lucide-react";
import {
  BulletList,
  CodeBlock,
  DataTable,
  DocCard,
  DocLink,
  InfoBox,
  InlineCode,
  Lead,
  NumberedList,
  Related,
} from "@/components/docs/ui";

export const metadata = docMetadata("matchers", "es");

export default function Page() {
  return (
    <>
      <DocsPageSchema slug="matchers" locale="es" />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
          Matchers
        </h1>

        <DocCard icon={<Target size={24} />} title="¿Qué es un Matcher?">
          <Lead>
            Un Matcher compara lado a lado las líneas de varios documentos. Empareja las filas que
            describen el mismo ítem, aunque cada documento lo escriba distinto, pone sus precios o
            cantidades en una sola tabla y marca al ganador de cada fila.
          </Lead>
          <p>
            Un Matcher trabaja sobre un <DocLink href="/es/documentacion/flows">flow</DocLink>. El
            flow hace la extracción; el Matcher lee los resultados de dos o más runs completados de
            ese flow y arma una sola comparación. Cada ejecución se llama <strong>Match</strong>. Por
            ejemplo, tres cotizaciones de proveedores para el mismo pedido se convierten en una tabla
            con una columna de precio por proveedor y una columna <strong>Campeón</strong> que
            indica el proveedor más barato en cada línea.
          </p>
          <InfoBox color="violet" icon={<FlaskConical size={20} />} title="Beta">
            Los Matchers están en beta. Están disponibles para todas las organizaciones y su
            funcionamiento todavía puede cambiar.
          </InfoBox>
          <InfoBox color="blue" icon={<Info size={20} />} title="Pruébalo sin cuenta">
            Las herramientas gratis{" "}
            <DocLink href="/es/herramientas/comparar-factura-con-orden-de-compra">
              Comparar factura con orden de compra
            </DocLink>{" "}
            y{" "}
            <DocLink href="/es/herramientas/comparar-cotizaciones">Comparar cotizaciones</DocLink>{" "}
            de Tavnit Lite funcionan con Matchers.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Lightbulb size={24} />} title="Cuándo usar un Matcher">
          <BulletList
            items={[
              "Comparar cotizaciones de varios proveedores para la misma lista de ítems y elegir la más barata por línea",
              "Revisar una factura contra su orden de compra, línea por línea, para detectar diferencias de precio",
              "Comparar ofertas nuevas contra una lista de precios de referencia o un pedido anterior",
              "Encontrar el valor más alto por ítem entre documentos, como el mejor descuento o la mayor cantidad",
            ]}
          />
          <p>
            Si necesitas reglas de aprobado o rechazado entre distintos tipos de documentos
            (fechas, totales, referencias) en lugar de una tabla de precios línea por línea, usa un{" "}
            <DocLink href="/es/documentacion/inspectores">Inspector</DocLink>.
          </p>
        </DocCard>

        <DocCard icon={<Table2 size={24} />} title="Roles de campo">
          <Lead>
            Un Matcher se define por el rol que cumple cada campo de su flow. Las opciones salen del
            flow que eliges, filtradas según lo que acepta cada rol.
          </Lead>
          <DataTable
            head={["Ajuste", "Qué es", "Qué campos sirven"]}
            rows={[
              [
                <strong key="r1">Campo identificador</strong>,
                "Nombra a cada participante, por ejemplo Proveedor. Cada run se convierte en un participante. Si un run tiene varios valores, se usa el primero.",
                "Solo campos de metadata",
              ],
              [
                <strong key="r2">Campo de emparejamiento</strong>,
                "El texto que se empareja entre runs, por ejemplo Descripción del Ítem. El emparejamiento es por significado, no por texto exacto.",
                "Campos de tabla",
              ],
              [
                <strong key="r3">Campo de comparación</strong>,
                "El número que evalúa la regla del campeón, por ejemplo Precio Unitario.",
                "Campos de tabla numéricos",
              ],
              [
                <strong key="r4">Campos de contexto (opcional)</strong>,
                "Columnas extra, como unidad de medida o empaque, que ve la IA para no mezclar ítems distintos.",
                "Cualquier campo restante",
              ],
              [
                <strong key="r5">Regla del campeón</strong>,
                <Fragment key="r5b">
                  <strong>Gana el más bajo</strong> o <strong>Gana el más alto</strong>. Elige al
                  ganador de cada fila emparejada. Si hay empate, aparecen todos los ganadores.
                </Fragment>,
                "—",
              ],
            ]}
          />
          <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="El flow necesita los campos correctos">
            El identificador debe ser un campo de metadata y el campo de comparación, un campo de
            tabla numérico. Si el flow no tiene ninguno de los dos, el builder te lo avisa. Agrega
            primero los campos al flow (por ejemplo un campo de metadata{" "}
            <InlineCode>Proveedor</InlineCode> y una columna numérica{" "}
            <InlineCode>Precio Unitario</InlineCode>). Los campos compuestos no se pueden usar.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Scale size={24} />} title="Modos Benchmark y Multilateral">
          <DataTable
            head={["Modo", "Cómo compara", "Qué filas aparecen"]}
            rows={[
              [
                <strong key="m1">Benchmark</strong>,
                "Un run es el benchmark y todos los demás se comparan contra él. Eliges el run benchmark cada vez que ejecutas un match.",
                "Una fila por cada ítem del benchmark. Para cada otro participante, el ítem que mejor coincide llena sus columnas. Los ítems que no coinciden con nada del benchmark quedan fuera.",
              ],
              [
                <strong key="m2">Multilateral</strong>,
                "Todos los runs se comparan entre sí y ganan las mejores combinaciones.",
                "Aparecen todos los ítems. Los que se encuentran en varios runs comparten fila; un ítem sin pareja tiene su propia fila.",
              ],
            ]}
          />
          <p>
            Usa <strong>Benchmark</strong> cuando un documento es la referencia (una orden de
            compra, tu lista de precios, el contrato del año pasado). Usa{" "}
            <strong>Multilateral</strong> cuando los documentos son pares, como cotizaciones de
            proveedores que compiten entre sí.
          </p>
        </DocCard>

        <DocCard icon={<FilePlus size={24} />} title="Crear un Matcher">
          <NumberedList
            items={[
              <Fragment key="c1">
                Ve a <strong>Matchers</strong> en el menú principal y haz clic en{" "}
                <strong>Nuevo Matcher</strong>.
              </Fragment>,
              <Fragment key="c2">
                Responde &ldquo;¿Qué flow vas a comparar?&rdquo;: <strong>Desde un flow</strong>{" "}
                (elige el flow y un nombre, y haz clic en <strong>Siguiente</strong>),{" "}
                <strong>Desde un matcher existente</strong> (duplica su configuración con{" "}
                <strong>Crear copia</strong>) o <strong>Desde cero</strong>.
              </Fragment>,
              <Fragment key="c3">
                En <strong>Información del Matcher</strong>, revisa el nombre (al menos 3
                caracteres), agrega una descripción opcional y confirma el <strong>Flow</strong>.
                Todos los runs comparados deben pertenecer a este flow.
              </Fragment>,
              <Fragment key="c4">
                En <strong>Campos</strong>, elige el <strong>Modo</strong>, el{" "}
                <strong>Campo identificador</strong>, el <strong>Campo de emparejamiento</strong>, el{" "}
                <strong>Campo de comparación</strong>, la <strong>Regla del campeón</strong> y los{" "}
                <strong>Campos de contexto</strong> que necesites.
              </Fragment>,
              <Fragment key="c5">
                Si quieres, completa <strong>Salida por Email</strong> y <strong>Webhook</strong> (la
                URL debe comenzar con <InlineCode>https://</InlineCode>), y activa{" "}
                <strong>Revisión Humana</strong> si cada match debe esperar a un revisor.
              </Fragment>,
              <Fragment key="c6">
                Haz clic en <strong>Crear Matcher</strong>. Llegas a la página del matcher, donde
                puedes elegir revisores y ejecutar tu primer match.
              </Fragment>,
            ]}
          />
          <p>
            En la página del matcher, <strong>Configuración</strong> te deja editar después el modo y
            los roles de campo, <strong>Historial de Matches</strong> lista cada match que ha
            ejecutado e <strong>ID del Matcher</strong> muestra el identificador que necesitas para
            la API. Cada match guarda una copia de la configuración con la que corrió, así que editar
            el matcher no cambia los resultados anteriores.
          </p>
        </DocCard>

        <DocCard icon={<Play size={24} />} title="Ejecutar un Match">
          <NumberedList
            items={[
              <Fragment key="p1">
                Asegúrate de que los documentos se hayan procesado con el flow del matcher y que sus
                runs estén en <strong>Completado</strong>.
              </Fragment>,
              <Fragment key="p2">
                En la página del matcher, haz clic en <strong>Ejecutar Match</strong>.
              </Fragment>,
              "Marca al menos dos runs completados del flow.",
              <Fragment key="p4">
                En un matcher Benchmark, haz clic en la estrella de uno de los runs seleccionados
                para convertirlo en el <strong>Run benchmark</strong>.
              </Fragment>,
              <Fragment key="p5">
                Haz clic en <strong>Iniciar Match</strong>. El match entra en cola y se abre su
                página, que muestra el progreso hasta que la tabla de comparación está lista.
              </Fragment>,
            ]}
          />
          <p>También puedes iniciar matches de otras formas:</p>
          <BulletList
            items={[
              <Fragment key="o1">
                <strong>Por correo.</strong> En <strong>Disparador por Email</strong>, activa el
                disparador y copia la <strong>Dirección de Bandeja</strong>. Envía dos o más
                documentos (PDF o imágenes) a esa dirección: cada adjunto se convierte en un run del
                flow y el match comienza cuando todos terminan. Los resultados llegan como respuesta
                en el mismo hilo, con la tabla adjunta en CSV y un reporte en PDF. Los matches
                iniciados por correo siempre corren en modo Multilateral. Usa{" "}
                <strong>Remitentes Permitidos</strong> para limitar quién puede dispararlo.
              </Fragment>,
              <Fragment key="o2">
                <strong>Desde un caso de Subject.</strong> Cuando un matcher está vinculado a un{" "}
                <DocLink href="/es/documentacion/subjects">Subject</DocLink>, la página del caso lo
                muestra en <strong>Checks</strong> con un botón <strong>Run</strong> que usa los runs
                completados del caso que pertenecen al flow del matcher.
              </Fragment>,
              <Fragment key="o3">
                <strong>En un Pipeline</strong>, como un nodo que recibe los runs de los flows
                anteriores. Consulta <DocLink href="/es/documentacion/pipelines">Pipelines</DocLink>.
              </Fragment>,
              <Fragment key="o4">
                <strong>Por API</strong>, como se explica más abajo.
              </Fragment>,
            ]}
          />
          <DataTable
            head={["Estado", "Significado"]}
            rows={[
              ["En cola / En ejecución", "El match espera un worker o está comparando filas entre runs."],
              ["Esperando documentos", "Un match iniciado por correo espera a que sus documentos terminen de procesarse."],
              ["Esperando aprobación", "La revisión humana está activa y un revisor debe aprobar el emparejamiento."],
              ["Completado", "La tabla de comparación está lista y las salidas se enviaron."],
              ["Fallido", "El match no pudo ejecutarse. El mensaje de error explica por qué."],
              ["Cancelado", "Un revisor rechazó el match."],
            ]}
          />
        </DocCard>

        <DocCard icon={<Trophy size={24} />} title="Leer el resultado">
          <Lead>
            Un match completado muestra una <strong>Tabla de Comparación</strong> con dos columnas
            por participante y una columna <strong>Campeón</strong> al final.
          </Lead>
          <p>
            Las columnas de cada participante llevan el nombre de los campos y el valor del
            identificador: con un campo de emparejamiento <InlineCode>Item Description</InlineCode>,
            un campo de comparación <InlineCode>Unit Price</InlineCode> y un proveedor llamado ACME,
            obtienes <InlineCode>Item Description-ACME</InlineCode> y{" "}
            <InlineCode>Unit Price-ACME</InlineCode>. Un par vacío significa que ese participante no
            tenía un ítem equivalente en esa fila. Las columnas del participante ganador se
            resaltan. En CSV, JSON y la API, la columna del campeón se llama{" "}
            <InlineCode>Champion</InlineCode>.
          </p>
          <DataTable
            head={["Item Description-ACME", "Unit Price-ACME", "Item Description-Globex", "Unit Price-Globex", "Campeón"]}
            rows={[
              ["Steel bolt M8 x 40", "0.42", "Bolt M8x40 zinc", "0.39", "Globex"],
              ["Hex nut M8", "0.10", "Nut, hex, M8", "0.10", "ACME, Globex"],
              ["Washer 8 mm", "0.05", "", "", "ACME"],
            ]}
            caption="Un resultado Multilateral de ejemplo con la regla Gana el más bajo. Las filas empatadas muestran a todos los ganadores."
          />
          <p>Encima de la tabla encontrarás:</p>
          <BulletList
            items={[
              <Fragment key="t1">
                <strong>Filas</strong>, <strong>Créditos</strong> y <strong>Celdas</strong>: el
                tamaño del resultado y lo que costó.
              </Fragment>,
              <Fragment key="t2">
                <strong>Advertencias</strong>: por ejemplo, un run excluido porque su campo
                identificador estaba vacío, dos runs combinados porque comparten identificador o un
                valor de comparación que no es numérico y quedó fuera de la competencia.
              </Fragment>,
              <Fragment key="t3">
                <strong>Información del Match</strong>: matcher, modo, runs, fecha de creación y,
                en los matches por correo, el remitente.
              </Fragment>,
              <Fragment key="t4">
                Exportaciones: <strong>Exportar a Bucket</strong>, <strong>CSV</strong>,{" "}
                <strong>JSON</strong> y un reporte en <strong>PDF</strong>.
              </Fragment>,
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Cómo se emparejan las filas">
            Tavnit compara el campo de emparejamiento (más los campos de contexto) por significado.
            Las parejas claras se aceptan automáticamente; las dudosas las revisa un modelo de IA
            que considera importantes las diferencias de tamaño, unidad y empaque: un paquete de 12
            no es el mismo ítem que una unidad suelta. Ante la duda, los ítems quedan separados. Si
            dos filas del mismo participante terminan en un mismo grupo, se usa la primera.
          </InfoBox>
        </DocCard>

        <DocCard icon={<ClipboardCheck size={24} />} title="Revisión humana de matches">
          <p>
            Activa <strong>Revisión Humana</strong> en el matcher y elige a los revisores. Desde
            entonces cada match se pausa en <strong>Esperando aprobación</strong> antes de liberar
            sus resultados, y los revisores reciben un aviso por correo. Solo los revisores que
            elijas pueden aprobar o rechazar.
          </p>
          <NumberedList
            items={[
              <Fragment key="h1">
                Abre el match desde <strong>Revisión Humana</strong> (o haz clic en{" "}
                <strong>Revisar</strong> en la página del match).
              </Fragment>,
              <Fragment key="h2">
                El tablero <strong>Revisión de Match</strong> muestra una columna por participante,
                con los emparejamientos de la IA dibujados como líneas y los documentos originales al
                lado.
              </Fragment>,
              "Haz clic en una tarjeta y luego en una tarjeta de otra columna para conectarlas. Haz clic en una línea para romper un enlace. Usa la X para excluir una fila de los resultados por completo.",
              <Fragment key="h4">
                Haz clic en <strong>Aprobar</strong> o <strong>Rechazar</strong>.
              </Fragment>,
            ]}
          />
          <DataTable
            head={["Decisión", "Qué pasa"]}
            rows={[
              [
                "Aprobar",
                "La tabla de comparación y la columna Campeón se reconstruyen a partir de tus enlaces corregidos, se cobran los créditos y se envían las salidas.",
              ],
              ["Rechazar", "El match se cancela con tu motivo. No se cobran créditos ni se envían salidas."],
            ]}
          />
          <p>
            Los miembros con el rol <strong>Solo HITL</strong> pueden revisar, pero no crear
            matchers ni ejecutar matches. Consulta{" "}
            <DocLink href="/es/documentacion/revision-humana">Revisión Humana</DocLink>.
          </p>
        </DocCard>

        <DocCard icon={<Send size={24} />} title="Salidas">
          <BulletList
            items={[
              <Fragment key="u1">
                <strong>Notificación en la app</strong> para quien inició el match.
              </Fragment>,
              <Fragment key="u2">
                <strong>Salida por Email</strong>: la dirección recibe un correo cuando un match se
                completa, con la tabla de comparación adjunta en CSV.
              </Fragment>,
              <Fragment key="u3">
                <strong>Webhook</strong>: un POST con la tabla en JSON (
                <InlineCode>columns</InlineCode>, <InlineCode>rows</InlineCode>,{" "}
                <InlineCode>row_warnings</InlineCode>, <InlineCode>warnings</InlineCode>) más{" "}
                <InlineCode>match_id</InlineCode> y <InlineCode>matcher_id</InlineCode>. Consulta{" "}
                <DocLink href="/es/documentacion/webhooks">Webhooks</DocLink>.
              </Fragment>,
            ]}
          />
          <p>Con la revisión humana activa, las salidas se envían solo después de aprobar.</p>
        </DocCard>

        <DocCard icon={<Coins size={24} />} title="Costo">
          <p>
            Un match se cobra por <strong>celdas</strong>: los valores no vacíos de los campos
            identificador, de emparejamiento, de comparación y de contexto de los runs que compara.
            Cada 200 celdas cuestan 1 crédito, redondeando hacia arriba, con un mínimo de 1 crédito
            por match.
          </p>
          <BulletList
            items={[
              "Benchmark: las celdas de cada run se cuentan una vez.",
              "Multilateral: cada run se compara con todos los demás, así que las celdas se cuentan una vez por pareja, es decir, el total multiplicado por el número de runs menos uno. Tres runs cuestan el doble que los mismos tres runs en modo Benchmark.",
              "Los créditos se verifican antes de poner el match en cola y se cobran cuando se completa (o cuando un revisor lo aprueba). Los matches fallidos o rechazados no se cobran.",
              "La extracción de los documentos la cobra el flow por separado, como siempre, incluidos los runs que crea el disparador por correo.",
            ]}
          />
          <p>
            Consulta <DocLink href="/es/documentacion/creditos">Créditos</DocLink> para ver saldos y
            cómo agregar más.
          </p>
        </DocCard>

        <DocCard icon={<Code size={24} />} title="API">
          <p>
            Inicia un match desde tu propio sistema con tu API key. Copia el ID desde{" "}
            <strong>ID del Matcher</strong> en la página del matcher.
          </p>
          <CodeBlock
            lang="bash"
            code={`curl -X POST https://run.tavnit.io/api/matchers/<matcher_id>/run \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"run_ids": ["<run_a>", "<run_b>", "<run_c>"], "benchmark_run_id": "<run_a>"}'`}
          />
          <BulletList
            items={[
              <Fragment key="a1">
                <InlineCode>run_ids</InlineCode>: dos o más runs completados del flow del matcher.
              </Fragment>,
              <Fragment key="a2">
                <InlineCode>benchmark_run_id</InlineCode>: obligatorio en matchers Benchmark, y debe
                ser uno de los <InlineCode>run_ids</InlineCode>. Omítelo en Multilateral.
              </Fragment>,
              <Fragment key="a3">
                La respuesta es <InlineCode>202</InlineCode> con <InlineCode>match_id</InlineCode>,{" "}
                <InlineCode>status</InlineCode> (<InlineCode>queued</InlineCode>),{" "}
                <InlineCode>cells_count</InlineCode> y <InlineCode>credits_required</InlineCode>. Un{" "}
                <InlineCode>402</InlineCode> significa que el saldo no alcanza; un{" "}
                <InlineCode>400</InlineCode> explica qué está mal en la solicitud.
              </Fragment>,
              "Configura un Webhook en el matcher para recibir la tabla de comparación cuando el match se complete.",
            ]}
          />
          <p>
            La autenticación y los demás endpoints están en{" "}
            <DocLink href="/es/documentacion/api">API</DocLink>.
          </p>
        </DocCard>

        <DocCard icon={<Info size={24} />} title="Límites y permisos">
          <BulletList
            items={[
              "De 2 a 10 runs por match, todos completados y del flow del matcher.",
              "Hasta 5,000 filas de resultado por run.",
              "Disparador por correo: al menos dos adjuntos legibles y no más de 10.",
              "Todos los miembros, excepto Solo HITL, pueden crear, editar y eliminar matchers y ejecutar matches.",
            ]}
          />
        </DocCard>

        <DocCard icon={<Wrench size={24} />} title="Solución de problemas">
          <DataTable
            head={["Problema", "Qué hacer"]}
            rows={[
              [
                "No hay opciones en Campo identificador o Campo de comparación",
                "El flow no tiene un campo de metadata o una columna numérica. Agrégalo al flow y vuelve.",
              ],
              [
                "Falta un run en la lista de Ejecutar Match",
                "Solo se listan los runs completados del flow del matcher. Espera a que termine o verifica que se procesó con el mismo flow.",
              ],
              [
                "Advertencia: se excluyó un run",
                "Su campo identificador estaba vacío. Corrige el valor en el run o haz más confiable el campo identificador en el flow.",
              ],
              [
                "Dos proveedores se combinaron en un solo participante",
                "Ambos runs extrajeron el mismo valor de identificador. Sus filas se combinan y, si hay conflicto, gana la primera fila.",
              ],
              [
                "Se emparejaron ítems distintos, o no se emparejó el mismo ítem",
                "Agrega campos de contexto como unidad de medida o empaque, o activa la revisión humana para corregir los emparejamientos antes de liberar el resultado.",
              ],
              [
                "Una fila no tiene campeón",
                "Ningún participante de esa fila tiene un valor de comparación numérico.",
              ],
              [
                "Ejecutar desde un caso de Subject falla con un error de benchmark",
                "El botón Run del caso no elige un run benchmark. Usa un matcher Multilateral con Subjects.",
              ],
              [
                "Nadie puede aprobar un match pausado",
                "Solo los revisores elegidos en el matcher pueden aprobar. Agrega revisores en Revisión Humana.",
              ],
            ]}
          />
        </DocCard>

        <Related
          links={[
            {
              href: "/es/documentacion/flows",
              label: "Configura el flow que lee un Matcher",
              description: "Campos de metadata para el identificador y columnas numéricas para la comparación.",
            },
            {
              href: "/es/documentacion/inspectores",
              label: "Verificaciones de aprobado o rechazado entre documentos",
              description: "Los Inspectores corren un checklist determinista sobre un conjunto de documentos relacionados.",
            },
            {
              href: "/es/documentacion/revision-humana",
              label: "Colas de revisión",
              description: "Donde los runs, matches e inspecciones pausados esperan a un revisor.",
            },
            {
              href: "/es/documentacion/creditos",
              label: "Cómo se cobran los créditos",
              description: "El precio por celda de los matches junto con el de cada paso.",
            },
          ]}
        />
      </section>
    </>
  );
}
