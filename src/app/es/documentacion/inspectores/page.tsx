import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  CalendarClock,
  ClipboardCheck,
  Code,
  FileStack,
  FileText,
  FlaskConical,
  Info,
  Lightbulb,
  ListChecks,
  Play,
  Send,
  ShieldCheck,
  Sparkles,
  Users,
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

export const metadata = docMetadata("inspectors", "es");

export default function Page() {
  return (
    <>
      <DocsPageSchema slug="inspectors" locale="es" />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
          Inspectores
        </h1>

        <DocCard icon={<ShieldCheck size={24} />} title="¿Qué es un Inspector?">
          <Lead>
            Un Inspector es un checklist de cumplimiento para un conjunto de documentos
            relacionados. Listas los documentos que esperas, cada uno extraído por un flow, y armas
            un checklist de checks sobre sus valores. Cada inspección termina en un veredicto:
            mismas entradas, mismo veredicto, siempre.
          </Lead>
          <p>
            Un ejemplo típico es un embarque de importación: factura comercial, lista de empaque y
            conocimiento de embarque. El Inspector verifica que los totales cuadren, que el número de
            factura coincida entre documentos, que las fechas estén en orden y que nada esté
            vencido. Las reglas las evalúa un motor determinista, no una IA leyendo los documentos,
            así que el veredicto es reproducible y cada resultado se puede rastrear hasta los valores
            que lo produjeron.
          </p>
          <InfoBox color="violet" icon={<FlaskConical size={20} />} title="Beta">
            Los Inspectores están en beta. Están disponibles para todas las organizaciones y su
            funcionamiento todavía puede cambiar.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Lightbulb size={24} />} title="Cuándo usar un Inspector">
          <BulletList
            items={[
              "Verificaciones entre documentos antes de pagar o liberar algo: factura contra orden de compra y nota de entrega",
              "Revisión de expedientes de importación y exportación: las mismas referencias, cantidades y totales en todos los documentos",
              "Reglas de fechas y vencimientos: certificados vigentes hoy, documentos emitidos en el mes actual",
              "Formato de valores individuales: RUC o identificación fiscal, números de factura, monedas permitidas",
            ]}
          />
          <p>
            Si lo que necesitas es comparar precios línea por línea entre varias versiones del mismo
            tipo de documento, como cotizaciones de proveedores, usa un{" "}
            <DocLink href="/es/documentacion/matchers">Matcher</DocLink>.
          </p>
        </DocCard>

        <DocCard icon={<FileStack size={24} />} title="Crear un Inspector">
          <NumberedList
            items={[
              <Fragment key="c1">
                Ve a <strong>Inspectores</strong> y haz clic en <strong>Nuevo inspector</strong>.
                Ponle un nombre (al menos 3 caracteres) y una descripción opcional, y haz clic en{" "}
                <strong>Crear</strong>. Para partir de un inspector existente, usa{" "}
                <strong>Desde plantilla</strong>.
              </Fragment>,
              <Fragment key="c2">
                En <strong>Documentos esperados</strong>, haz clic en{" "}
                <strong>Agregar documento</strong> por cada documento que requiere el proceso: un{" "}
                <strong>Nombre del documento</strong> y el <strong>Flow de extracción</strong> que lo
                lee.
              </Fragment>,
              <Fragment key="c3">
                Arma el <strong>Checklist</strong> con <strong>Agregar check</strong>,{" "}
                <strong>Agregar rama</strong> o <strong>Sugerir checks</strong>.
              </Fragment>,
              <Fragment key="c4">
                Pruébalo en el panel <strong>Prueba en seco</strong> y haz clic en{" "}
                <strong>Guardar</strong> en el encabezado.
              </Fragment>,
              <Fragment key="c5">
                Asegúrate de que el inspector esté <strong>Activo</strong> (el switch del
                encabezado). Los inspectores inactivos no pueden iniciar nuevas inspecciones.
              </Fragment>,
            ]}
          />
          <p>Cada documento esperado tiene estas opciones:</p>
          <DataTable
            head={["Opción", "Qué hace"]}
            rows={[
              [
                <strong key="d1">Requerido / Opcional</strong>,
                "Los documentos requeridos deben llegar antes de que corra el checklist. Cuando falta un documento opcional, los checks que lo leen se omiten, nunca fallan.",
              ],
              [
                <strong key="d2">Flow de extracción</strong>,
                "El flow que extrae el documento. Sus campos quedan disponibles para el checklist. Debe ser un flow activo.",
              ],
              [
                <strong key="d3">Pista de enrutamiento</strong>,
                "Cómo se ve el documento. Ayuda a la IA a poner los archivos subidos en el slot correcto.",
              ],
              [
                <strong key="d4">Aceptar múltiples documentos</strong>,
                "Permite que varios archivos llenen el mismo slot, por ejemplo varias notas de entrega.",
              ],
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Flows con un Cleaner">
            Si el flow de un documento tiene un{" "}
            <DocLink href="/es/documentacion/cleaners">Cleaner</DocLink> vinculado, el checklist lee
            las columnas de salida del Cleaner, no los campos extraídos en bruto. Así puedes
            verificar una fecha normalizada, un monto convertido o un valor buscado.
          </InfoBox>
        </DocCard>

        <DocCard icon={<ListChecks size={24} />} title="Checks">
          <Lead>
            Un check lee los valores que extraen los flows de documentos y aprueba o falla de forma
            determinista. Los checks corren de arriba hacia abajo; arrástralos para reordenarlos, y
            el reporte sigue el mismo orden.
          </Lead>
          <DataTable
            head={["Parte del check", "Qué hace"]}
            rows={[
              [
                <strong key="k1">Nombre del check</strong>,
                "Aparece en el reporte, por ejemplo “Los totales cuadran con la lista de empaque”.",
              ],
              [
                <strong key="k2">Verifica que</strong>,
                "Una o más condiciones. Usa Agregar condición y Agregar grupo para combinarlas con AND / OR.",
              ],
              [
                <strong key="k3">Severidad</strong>,
                "Bloqueante, Advertencia o Info. Un bloqueante que falla rechaza toda la inspección; las advertencias la degradan a “aprobado con advertencias”; info nunca afecta el veredicto.",
              ],
              [
                <strong key="k4">Solo ejecutar este check cuando…</strong>,
                "Una condición de guarda opcional. Cuando no se cumple (o lee un documento opcional ausente) el check se omite, nunca falla.",
              ],
              [
                <strong key="k5">Si este check falla</strong>,
                "Acciones: Solicitar revisión (elige revisores), Enviar email (destinatarios separados por comas) o Llamar webhook.",
              ],
            ]}
          />
          <h3 className="text-base font-semibold text-fg pt-2">Ramas</h3>
          <p>
            Una rama divide el checklist según una condición. Su condición <strong>Cuando</strong>{" "}
            decide qué carril corre: <strong>Entonces verifica</strong> si se cumple,{" "}
            <strong>De lo contrario</strong> si no. Si la condición no puede evaluarse (documento
            ausente, valor inválido), corre el carril De lo contrario. Cada carril puede tener checks
            y otras ramas, y el nombre de la rama aparece en el reporte. Los checks del carril que no
            corrió se reportan como omitidos.
          </p>
          <InfoBox color="yellow" icon={<Info size={20} />} title="Bloqueantes sobre documentos opcionales">
            Un bloqueante que lee un documento opcional se omite cuando falta el documento, así que
            nunca puede rechazar la inspección. El builder lo marca; considera la severidad
            Advertencia o hacer el documento requerido.
          </InfoBox>
        </DocCard>

        <DocCard icon={<CalendarClock size={24} />} title="Condiciones y operadores">
          <p>
            Cada condición elige un <strong>Documento</strong> y un <strong>Campo</strong>, un
            operador y un valor. En una columna que se repite (de tabla) se compara el primer valor.
            En los campos de fecha puedes comparar solo un elemento de la fecha:{" "}
            <strong>Fecha completa</strong>, <strong>Solo fecha</strong>,{" "}
            <strong>Mes y año</strong> o <strong>Año</strong>.
          </p>
          <p>Los nombres de los operadores aparecen en inglés en la app:</p>
          <DataTable
            head={["Tipo de campo", "Operadores"]}
            rows={[
              [
                "Número",
                "Equals, Not equals, Greater than, Less than, Greater or equal, Less or equal, Is one of, Is not one of, Is empty, Is not empty",
              ],
              [
                "Fecha",
                "Equals, After, On or after, Before, On or before, Within range, Is empty, Is not empty",
              ],
              [
                "Texto",
                "Equals, Not equals, Contains, Does not contain, Starts with, Ends with, Matches pattern, Does not match pattern, Is one of, Is not one of, Is empty, Is not empty, además de los operadores de fecha y, en los checks, AI match y AI check",
              ],
            ]}
          />
          <p>El valor puede ser de cuatro tipos, que eliges con el selector que está al lado:</p>
          <DataTable
            head={["Valor", "Úsalo para"]}
            rows={[
              [
                <Fragment key="v1">
                  <strong>Valor literal</strong> (<InlineCode>#</InlineCode> /{" "}
                  <InlineCode>Abc</InlineCode>)
                </Fragment>,
                "Un valor fijo, como 0, USD o 2026-12-31. Las fechas se escriben AAAA-MM-DD (AAAA-MM o AAAA al comparar un mes o un año).",
              ],
              [
                <Fragment key="v2">
                  <strong>Campo de otro documento</strong> (<InlineCode>f(x)</InlineCode>)
                </Fragment>,
                "Verificaciones entre documentos, como que el total de la factura sea igual al de la orden de compra. Equals / Not equals numéricos aceptan una tolerancia en %, medida contra el valor de la derecha.",
              ],
              [
                <Fragment key="v3">
                  <strong>Porcentaje del campo de otro documento</strong> (
                  <InlineCode>%</InlineCode>)
                </Fragment>,
                "Solo números, como que el flete sea menor que el 10 % del total de la factura.",
              ],
              [
                <strong key="v4">Fecha dinámica</strong>,
                "Hoy, Mes actual o Año actual, resueltos en la zona horaria de tu organización al ejecutar la inspección. Una fecha completa contra Mes actual se compara por mes y año.",
              ],
            ]}
          />
          <BulletList
            items={[
              "Los números ignoran separadores de miles, espacios y símbolos de moneda. El texto se recorta y se compara sin distinguir mayúsculas.",
              "Dos valores que se leen como fechas se comparan como fechas, así que 09-05-1989 es igual a 09/05/1989. Por eso los campos de texto también pueden usar los operadores de fecha.",
              "On or after y On or before incluyen la fecha límite; After y Before no.",
              "Cuando un lado de una comparación entre campos está vacío, el check no da error: Equals solo se cumple si ambos están vacíos, y los operadores de orden como Greater than resultan falsos.",
              <Fragment key="b5">
                <strong>Matches pattern</strong> usa una expresión regular, sin distinguir
                mayúsculas, en cualquier parte del valor; agrega <InlineCode>^</InlineCode> y{" "}
                <InlineCode>$</InlineCode> para exigir el valor completo (
                <InlineCode>^INV-\d+$</InlineCode>). <strong>Is one of</strong> recibe una lista
                separada por comas y compara los números como números.
              </Fragment>,
            ]}
          />
        </DocCard>

        <DocCard icon={<Sparkles size={24} />} title="Condiciones con IA">
          <p>
            Algunos criterios no se pueden escribir como una regla. Los campos de texto ofrecen dos
            operadores con IA, disponibles solo en las condiciones de los checks (nunca en guardas ni
            en condiciones de rama):
          </p>
          <BulletList
            items={[
              <Fragment key="ai1">
                <strong>AI match</strong> compara un valor con el campo de otro documento según tus
                instrucciones, por ejemplo &ldquo;¿Son la misma persona? Los nombres pueden omitir un
                apellido u ordenarse distinto.&rdquo;
              </Fragment>,
              <Fragment key="ai2">
                <strong>AI check</strong> evalúa un solo valor, por ejemplo &ldquo;¿Esta dirección
                está dentro de Panamá?&rdquo;
              </Fragment>,
            ]}
          />
          <p>
            Defines las respuestas posibles (al menos dos) y marcas cuáles aprueban; se ven en verde.
            El modelo responde con exactamente una opción, y la opción elegida y su razonamiento
            quedan en el reporte. La respuesta queda fija en la inspección, así que el veredicto
            sigue siendo reproducible.
          </p>
        </DocCard>

        <DocCard icon={<Sparkles size={24} />} title="Sugerir checks">
          <p>
            Cuando ya tengas los documentos esperados, haz clic en <strong>Sugerir checks</strong>{" "}
            en el checklist. Si quieres, describe qué debe verificar el inspector (por ejemplo
            &ldquo;Verifica que el total de la factura coincida con la orden de compra&rdquo;) y haz
            clic en <strong>Sugerir checks</strong>. El asistente lee los campos de cada documento,
            con valores de muestra del último run completado del flow, y propone checks con su
            severidad y sus condiciones.
          </p>
          <p>
            Desmarca lo que no necesites, edita cualquier check con el lápiz y haz clic en{" "}
            <strong>Agregar checks</strong>. Todo queda editable.
          </p>
        </DocCard>

        <DocCard icon={<FlaskConical size={24} />} title="Prueba en seco">
          <p>
            El panel <strong>Prueba en seco</strong> prueba el checklist contra runs completados:
            elige un run de muestra para cada documento, o <strong>Sin documento (ausente)</strong>,
            y el veredicto se reevalúa al instante mientras editas. Usa el mismo motor de reglas que
            las inspecciones reales. Nada se guarda, y las condiciones con IA se asumen
            aprobadas porque el modelo solo corre durante inspecciones reales.
          </p>
        </DocCard>

        <DocCard icon={<Play size={24} />} title="Ejecutar una inspección">
          <NumberedList
            items={[
              <Fragment key="r1">
                Abre la pestaña <strong>Inspecciones</strong> del inspector y haz clic en{" "}
                <strong>Nueva inspección</strong>.
              </Fragment>,
              <Fragment key="r2">
                Suelta los documentos de una inspección (PDF, PNG, JPG, JPEG, JFIF) y haz clic en{" "}
                <strong>Iniciar inspección</strong>.
              </Fragment>,
              "La IA dirige cada archivo al slot de documento correcto, usando su primera página, el nombre del documento, la pista de enrutamiento y el flow, y ejecuta el flow de extracción de ese slot.",
              "Cuando cada documento requerido tiene un run completado, el checklist se evalúa y la página de la inspección muestra el veredicto y el reporte.",
            ]}
          />
          <p>
            En la página de la inspección puedes seguir agregando documentos mientras está
            recolectando. Un archivo que la IA no pudo ubicar queda como Sin emparejar: elige un slot
            en <strong>Assign to document…</strong> y haz clic en <strong>Assign</strong>.{" "}
            <strong>Cancel</strong> detiene una inspección sin evaluarla. (Esta página aún aparece
            en inglés en la app.)
          </p>
          <p>
            En <strong>Ajustes</strong> decides cuándo corre el checklist:{" "}
            <strong>Automático</strong> evalúa en cuanto cada documento requerido tiene un run
            completado; <strong>Manual</strong> sigue recolectando hasta que alguien hace clic en{" "}
            <strong>Fire now</strong>.
          </p>
          <DataTable
            head={["Estado", "Significado"]}
            rows={[
              ["Recolectando", "Acepta documentos. Los archivos se enrutan y sus runs extraen."],
              ["Esperando runs", "Ya se disparó y espera a que terminen los últimos runs."],
              ["En cola / En ejecución", "El checklist se está evaluando."],
              ["Esperando aprobación", "Un revisor debe aprobar antes de que el veredicto sea final."],
              ["Completado", "El veredicto y el reporte están listos."],
              ["Fallido", "Por ejemplo, el run de un documento requerido falló después de disparar la inspección."],
              ["Cancelado", "La canceló un usuario o se rechazó en la revisión."],
            ]}
          />
          <p>También puedes ejecutar inspecciones:</p>
          <BulletList
            items={[
              <Fragment key="w1">
                <strong>Desde un caso de Subject.</strong> Un inspector vinculado a un{" "}
                <DocLink href="/es/documentacion/subjects">Subject</DocLink> aparece en{" "}
                <strong>Checks</strong> en la página del caso. <strong>Run</strong> reutiliza los
                runs completados del caso, sin volver a subir ni extraer nada. Cada documento
                requerido necesita un run completado en el caso.
              </Fragment>,
              <Fragment key="w2">
                <strong>En un Pipeline</strong>, como un nodo después de los flows. Consulta{" "}
                <DocLink href="/es/documentacion/pipelines">Pipelines</DocLink>.
              </Fragment>,
              <Fragment key="w3">
                <strong>Por API</strong>, como se explica más abajo.
              </Fragment>,
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="La configuración queda fija en cada inspección">
            Una inspección conserva los documentos y el checklist con los que empezó. Los cambios al
            inspector aplican solo a las inspecciones nuevas.
          </InfoBox>
        </DocCard>

        <DocCard icon={<FileText size={24} />} title="Veredicto y reporte">
          <DataTable
            head={["Veredicto", "Cuándo"]}
            rows={[
              ["Rechazado", "Algún bloqueante falló o no pudo evaluarse (error)."],
              ["Aprobado con advertencias", "Ningún bloqueante falló, pero al menos una advertencia falló o dio error."],
              ["Aprobado", "Ningún bloqueante ni advertencia falló. Los checks Info nunca cambian el veredicto."],
            ]}
          />
          <p>
            El <strong>Reporte del checklist</strong> lista cada check en orden con su resultado (
            <strong>Aprobado</strong>, <strong>Fallido</strong>, <strong>Omitido</strong> o{" "}
            <strong>Error</strong>), los valores que se compararon y una breve explicación. Los checks
            omitidos dicen por qué: no se tomó la rama, no se cumplió la guarda o no se entregó el
            documento. Una inspección completada se puede descargar como reporte en PDF (
            <strong>PDF report</strong>).
          </p>
        </DocCard>

        <DocCard icon={<ClipboardCheck size={24} />} title="Revisión humana">
          <p>
            En <strong>Revisores y HITL</strong>, activa <strong>Revisión humana</strong> y elige a
            los revisores para pausar cada inspección antes de que el veredicto sea final. Un check
            que falla también puede pausar la inspección por su cuenta con la acción{" "}
            <strong>Solicitar revisión</strong>. Los revisores reciben un aviso por correo.
          </p>
          <NumberedList
            items={[
              "Abre la inspección pausada. El panel de revisión muestra los checks fallidos y una Vista previa del veredicto.",
              <Fragment key="h2">
                <strong>Exonera</strong> los checks fallidos que sean aceptables, con un motivo
                (obligatorio). Los checks exonerados ya no cuentan para el veredicto.
              </Fragment>,
              <Fragment key="h3">
                Haz clic en <strong>Aprobar</strong> para finalizar el veredicto y enviar las
                salidas, o en <strong>Rechazar</strong> para cancelar la inspección sin veredicto.
              </Fragment>,
            ]}
          />
          <p>
            Todos los roles, incluido Solo HITL, pueden revisar. Si hay revisores configurados, solo
            ellos pueden aprobar o rechazar. Consulta{" "}
            <DocLink href="/es/documentacion/revision-humana">Revisión Humana</DocLink>.
          </p>
        </DocCard>

        <DocCard icon={<Send size={24} />} title="Salidas">
          <BulletList
            items={[
              <Fragment key="o1">
                <strong>Notificación en la app</strong> con el veredicto para quien inició la
                inspección.
              </Fragment>,
              <Fragment key="o2">
                <strong>Salida por Email</strong>: recibe el veredicto y el resultado de cada check,
                con el reporte en PDF adjunto.
              </Fragment>,
              <Fragment key="o3">
                <strong>Webhook</strong>: envía por POST un JSON con{" "}
                <InlineCode>inspection_id</InlineCode>, <InlineCode>inspector_id</InlineCode>,{" "}
                <InlineCode>verdict</InlineCode> y el reporte completo en{" "}
                <InlineCode>output_json</InlineCode>. Consulta{" "}
                <DocLink href="/es/documentacion/webhooks">Webhooks</DocLink>.
              </Fragment>,
              <Fragment key="o4">
                Las acciones <strong>Enviar email</strong> y <strong>Llamar webhook</strong> de cada
                check se disparan por cada check fallido que no se exoneró.
              </Fragment>,
            ]}
          />
          <p>Con revisión humana, las salidas se envían después de aprobar.</p>
        </DocCard>

        <DocCard icon={<Code size={24} />} title="API">
          <p>
            Envía documentos a un inspector con tu API key. Copia el ID desde{" "}
            <strong>ID del Inspector</strong> en la página del inspector. Cada solicitud agrega un
            archivo; omite <InlineCode>inspection_id</InlineCode> en la primera para abrir una
            inspección nueva y luego envía el ID que recibes con las demás.
          </p>
          <CodeBlock
            lang="bash"
            code={`curl -X POST https://run.tavnit.io/api/inspectors/<inspector_id>/process \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -F "file=@commercial_invoice.pdf"

curl -X POST https://run.tavnit.io/api/inspectors/<inspector_id>/process \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -F "file=@packing_list.pdf" \\
  -F "inspection_id=<inspection_id>"`}
          />
          <BulletList
            items={[
              <Fragment key="a1">
                La respuesta es <InlineCode>202</InlineCode> con <InlineCode>inspection_id</InlineCode>{" "}
                e <InlineCode>inspection_file_id</InlineCode>. Un <InlineCode>402</InlineCode>{" "}
                significa que tu organización no puede iniciar trabajo nuevo en este momento; contacta
                al equipo de Tavnit.
              </Fragment>,
              <Fragment key="a2">
                Con la política Manual, termina con{" "}
                <InlineCode>POST https://run.tavnit.io/api/inspections/&lt;inspection_id&gt;/fire</InlineCode>
                . Devuelve <InlineCode>400</InlineCode> con <InlineCode>missing_inputs</InlineCode> si
                falta algún documento requerido.
              </Fragment>,
              "Configura un Webhook en el inspector para recibir el veredicto y el reporte.",
            ]}
          />
          <p>
            La autenticación está en <DocLink href="/es/documentacion/api">API</DocLink>.
          </p>
        </DocCard>

        <DocCard icon={<Users size={24} />} title="Permisos">
          <BulletList
            items={[
              "Los Administradores y Propietarios crean inspectores. Los Administradores, los Propietarios y quien creó el inspector pueden editarlo o eliminarlo.",
              "Todos los miembros, excepto Solo HITL, pueden ejecutar inspecciones.",
              "Todos los roles pueden revisar inspecciones pausadas.",
              "Eliminar un inspector también elimina sus inspecciones y sus reportes.",
            ]}
          />
        </DocCard>

        <DocCard icon={<Wrench size={24} />} title="Solución de problemas">
          <DataTable
            head={["Problema", "Qué hacer"]}
            rows={[
              [
                "Nueva inspección no está disponible",
                "El inspector está inactivo. Actívalo con el switch de Activo en el encabezado, o pídeselo a un administrador.",
              ],
              [
                "No puedes agregar documentos",
                "Los documentos necesitan un flow de extracción activo. Crea un flow primero y luego regresa.",
              ],
              [
                "Un archivo queda Sin emparejar",
                "La IA no pudo ubicarlo o su slot ya está lleno. Asígnalo a mano y agrega una pista de enrutamiento al documento para que los próximos archivos se dirijan bien.",
              ],
              [
                "La inspección nunca se evalúa",
                "Falta un documento requerido, su run todavía se está procesando o la política es Manual. Sube el archivo que falta o haz clic en Fire now.",
              ],
              [
                "Un check muestra Error",
                "No se pudo leer un valor (campo faltante, número o fecha que no se puede interpretar, patrón inválido). El reporte muestra los valores; corrige el campo en el flow o la condición.",
              ],
              [
                "Un bloqueante se omitió en vez de fallar",
                "Lee un documento opcional que no llegó, o su guarda no se cumplió. Haz el documento requerido si el check siempre debe correr.",
              ],
              [
                "Hay checks que referencian un documento eliminado",
                "Apunta las condiciones a otro documento; mientras tanto esos checks no corren.",
              ],
              [
                "Un check de fecha contra Hoy da un resultado inesperado",
                "Hoy se toma en la zona horaria de tu organización al momento de evaluar. Revisa el elemento de fecha y el operador (After frente a On or after).",
              ],
            ]}
          />
        </DocCard>

        <Related
          links={[
            {
              href: "/es/documentacion/flows",
              label: "Configura los flows que extraen cada documento",
              description: "Los campos que compara tu checklist salen de estos flows.",
            },
            {
              href: "/es/documentacion/cleaners",
              label: "Normaliza los valores antes de verificarlos",
              description: "Los Cleaners vinculados le dan al checklist fechas, montos y valores buscados ya limpios.",
            },
            {
              href: "/es/documentacion/subjects",
              label: "Ejecuta inspectores en casos de Subjects",
              description: "Vincula un inspector a un Subject y ejecútalo sobre los documentos de cada caso.",
            },
            {
              href: "/es/documentacion/matchers",
              label: "Compara líneas entre documentos",
              description: "Los Matchers emparejan ítems entre cotizaciones o facturas y eligen al campeón.",
            },
          ]}
        />
      </section>
    </>
  );
}
