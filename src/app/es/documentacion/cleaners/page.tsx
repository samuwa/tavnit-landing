import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  AlertTriangle,
  ArrowLeftRight,
  Calculator,
  Clock,
  FilePlus,
  Info,
  Package,
  Send,
  Sigma,
  Table2,
  Wand2,
  Zap,
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
  WarningBox,
} from "@/components/docs/ui";

export const metadata = docMetadata("cleaners", "es");

export default function Page() {
  return (
    <>
      <DocsPageSchema
          slug="cleaners"
          locale="es"
          primaryImage={{
            url: "/assets/docs-cleaner-fields-2026-08.jpg",
            caption:
              "La página de detalle de un Cleaner de Tavnit, con todos los tipos de campo en el panel izquierdo y un conteo para cada uno.",
            width: 1327,
            height: 801,
          }}
        />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
          Cleaners
        </h1>

        <DocCard icon={<Wand2 size={24} />} title="Qué hace un Cleaner">
          <Lead>
            Un Cleaner es un conjunto de reglas que se aplica a las filas que un Flow ya extrajo.
            Estandariza formatos, convierte monedas y unidades, traduce texto, calcula columnas
            nuevas, busca valores en tus propios datos y puede disparar acciones cuando una fila
            rompe una regla.
          </Lead>
          <p>
            La extracción responde &ldquo;¿qué dice este documento?&rdquo;. Un Cleaner responde
            &ldquo;¿qué forma debe tener esto antes de entrar a nuestros sistemas?&rdquo;: un solo
            formato de fecha, una sola moneda, números de parte vinculados a tu catálogo, un total
            que cuadra.
          </p>
          <DataTable
            head={["", "Un Flow", "Un Cleaner"]}
            rows={[
              ["Trabaja sobre", "Un documento", "Las filas que produjo un Flow"],
              ["Produce", "Campos extraídos sin procesar", "Columnas normalizadas, enriquecidas y validadas"],
              [
                "Trabajo típico",
                "Leer la factura",
                "Convertir EUR a USD, cambiar el formato de las fechas, marcar el total que no cuadra",
              ],
              ["Se vincula a", "Nada: es el punto de partida", "Uno o más Flows, o se ejecuta solo"],
            ]}
          />
        </DocCard>

        <DocCard icon={<FilePlus size={24} />} title="Crear un Cleaner">
          <Lead>
            Un Cleaner se construye empezando por los campos base. Los campos base son las columnas
            que entran; todo lo demás se calcula sobre ellos. Puedes definirlos a mano, importarlos
            desde un Flow o leerlos de la fila de encabezados de una hoja de cálculo.
          </Lead>
          <NumberedList
            items={[
              <Fragment key="f0">
                Ve a <strong>Cleaners</strong> y crea uno nuevo. Ponle el nombre de los datos, no del
                documento: <em>Líneas de factura</em> en lugar de <em>Cleaner 3</em>.
              </Fragment>,
              <Fragment key="f1">
                Elige una fuente de datos para los campos base: <strong>Manual</strong> para
                definirlos desde cero, <strong>From Flow</strong> para importar los campos de salida
                de un Flow existente, o <strong>From File</strong> para leerlos de la fila de
                encabezados de un CSV o Excel.
              </Fragment>,
              <Fragment key="f2">
                Agrega campos calculados: los tipos de enriquecimiento de la tabla de abajo. Este paso
                es opcional; un Cleaner con solo campos base es un paso directo válido.
              </Fragment>,
              <Fragment key="f3">
                Configura la salida del sweep: una dirección de correo, una URL de webhook o
                ninguna. También es opcional.
              </Fragment>,
              <Fragment key="f4">
                Vincula el Cleaner a un Flow para que cada Run nuevo se barra automáticamente, o
                déjalo independiente y ejecútalo sobre conjuntos de datos que subas.
              </Fragment>,
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Mantén los campos base al día con el Flow">
            Si importaste los campos base desde un Flow y luego cambias los campos de ese Flow, usa{" "}
            <strong>Sync from Flow</strong> en el Cleaner. Te muestra qué es nuevo, qué cambió de
            tipo y qué ya no existe, y aplica las diferencias, en lugar de dejar al Cleaner leyendo
            columnas que ya no se producen.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Table2 size={24} />} title="Referencia de tipos de campo">
          <Lead>
            Cada columna de un Cleaner tiene un tipo que decide qué hace. Los campos base pasan los
            valores tal cual; los demás tipos calculan un valor a partir de la fila, de tus Buckets o
            de un criterio de IA. Este es el conjunto completo.
          </Lead>
          <Screenshot
            src="/assets/docs-cleaner-fields-2026-08.jpg"
            alt="La página de detalle de un Cleaner de Tavnit. El panel izquierdo lista todos los tipos de campo (Base Fields, AI Formatted, Date Format, Number Format, Calculated, Category, HS Code, Lookup, Bucket Check, Conditional Actions, Conditional, Currency, Translation, Unit Conv. y Summary) con un conteo al lado de cada uno, junto a la lista de campos base del Cleaner."
            caption="Los tipos de campo se agrupan en el panel izquierdo del Cleaner, con un conteo que muestra cuántos de cada uno usa este Cleaner."
          />
          <DataTable
            head={["Tipo de campo", "Qué produce"]}
            rows={[
              ["Base", "Una columna de los datos de entrada, que pasa tal cual a la salida."],
              [
                "AI Formatted",
                "Una reescritura con IA de una columna base: normalizar el nombre de un proveedor, ordenar una dirección, estandarizar una descripción.",
              ],
              [
                "Date Format",
                "Una columna de fecha convertida a un único formato de salida, sin importar cómo llegó.",
              ],
              [
                "Number Format",
                "Una columna numérica con un número fijo de decimales y los separadores que elijas.",
              ],
              [
                "Calculated",
                "Un valor obtenido con una fórmula a partir de otras columnas de la misma fila.",
              ],
              [
                "Category",
                "Una clasificación con IA dentro de una lista fija de opciones que tú defines: tipo de gasto, departamento, prioridad.",
              ],
              [
                "HS Code",
                "Una clasificación arancelaria con IA según el arancel de Panamá (SA 2022).",
              ],
              [
                "Lookup",
                <Fragment key="f5">
                  Un valor tomado de un <DocLink href="/es/documentacion/buckets">Bucket</DocLink> al
                  cruzar esta fila con él: un precio de catálogo, un código de cliente.
                </Fragment>,
              ],
              [
                "Bucket Check",
                "Un sí o no que indica si esta fila ya existe en un Bucket. Útil para eliminar duplicados.",
              ],
              [
                "Conditional Actions",
                "No es un valor: es una regla que dispara acciones cuando una fila coincide. Consulta más abajo.",
              ],
              [
                "Conditional",
                "Un valor si/si no: se ramifica según el contenido de la fila y devuelve un valor distinto en cada rama.",
              ],
              [
                "Currency",
                "Un monto convertido a una moneda de destino con las tasas publicadas vigentes.",
              ],
              ["Translation", "Texto traducido a un idioma de destino."],
              [
                "Unit Conversion",
                "Una medida convertida entre unidades: masa, longitud, volumen, área, velocidad o tamaño de datos.",
              ],
              [
                "Summary",
                "Un agregado calculado sobre todas las filas del sweep, no por fila.",
              ],
            ]}
          />
          <InfoBox
            color="violet"
            icon={<ArrowLeftRight size={20} />}
            title="Reemplazar la columna o agregar una nueva"
          >
            Los campos calculados tienen un modo de salida. <strong>Replace</strong> sobrescribe la
            columna de origen; <strong>new column</strong> conserva la original y escribe el
            resultado a su lado. Conserva la original cuando un revisor necesite ver lo que decía
            realmente el documento, por ejemplo al convertir moneda.
          </InfoBox>
          <p>
            Un campo puede excluirse de la salida y seguir disponible para las columnas calculadas.
            Así usas un valor intermedio, como un monto sin procesar o una clave de búsqueda, sin
            enviarlo a los sistemas siguientes.
          </p>
        </DocCard>

        <DocCard icon={<Zap size={24} />} title="Conditional Actions">
          <Lead>
            Un campo Conditional Actions es una regla: <em>cuando una fila cumple estas condiciones,
            haz estas cosas</em>. Es el único tipo de campo que cambia lo que le pasa al Run en lugar
            de lo que contiene una celda, y es la forma de convertir un error de validación en algo
            más que un número en una tabla.
          </Lead>
          <DataTable
            head={["Acción", "Qué hace"]}
            rows={[
              [
                "Skip row",
                "Quita por completo la fila de la salida: la forma de filtrar subtotales, líneas en blanco y encabezados sobrantes.",
              ],
              [
                "Send for review",
                <Fragment key="f6">
                  Pausa el Run para{" "}
                  <DocLink href="/es/documentacion/revision-humana">revisión humana</DocLink> y lo
                  asigna a los revisores que indiques en la acción. Las filas y los campos que
                  coinciden quedan marcados en la pantalla de revisión.
                </Fragment>,
              ],
              [
                "Email",
                "Envía una notificación a las direcciones que indiques, con el asunto y el cuerpo que escribas. Un envío por regla por Run, no uno por cada fila que coincide.",
              ],
              [
                "Webhook",
                "Envía una notificación por POST a la URL que indiques. Mismo comportamiento de un envío por regla.",
              ],
              [
                "Edit a Bucket row",
                <Fragment key="f7">
                  Escribe un valor de vuelta en una fila de un{" "}
                  <DocLink href="/es/documentacion/buckets">Bucket</DocLink> que encontró un campo
                  Lookup: marcar un pedido como recibido, descontar inventario, cambiar un estado.
                </Fragment>,
              ],
            ]}
          />
          <p>
            Las condiciones se agrupan, y los grupos se combinan con AND u OR, así que puedes
            expresar cosas como{" "}
            <em>(total &gt; 10,000 O la moneda no es USD) Y el proveedor no está en la lista
            aprobada</em>. Una regla sin ninguna condición se dispara en todas las filas.
          </p>
          <InfoBox color="blue" icon={<Info size={20} />} title="Las notificaciones se envían aunque el Run sea rechazado">
            Las acciones de correo y webhook se envían en cuanto la regla coincide, antes de
            cualquier pausa para revisión. Es intencional: <em>avísame cuando pase esto</em> no debe
            depender de si un revisor aprueba el Run después.
          </InfoBox>
          <p>
            <strong>Ejemplo práctico.</strong> En un Cleaner de facturas, agrega un campo
            Conditional Actions con dos reglas. La primera encuentra las filas donde el total de la
            línea no es igual a cantidad × precio unitario y envía el Run a revisión. La segunda
            encuentra cualquier factura por encima de tu umbral de aprobación y le envía un correo
            al responsable de finanzas. Todo lo demás pasa directo al Bucket sin que nadie lo toque.
          </p>
        </DocCard>

        <DocCard icon={<Calculator size={24} />} title="Campos calculados y fórmulas">
          <Lead>
            Un campo Calculated evalúa una expresión aritmética sobre su fila. Haz referencia a otras
            columnas por su nombre entre llaves, y si quieres empieza la fórmula con un signo igual:
            tanto <InlineCode>{"={Quantity} * {Unit Price}"}</InlineCode> como{" "}
            <InlineCode>{"{Quantity} * {Unit Price}"}</InlineCode> funcionan.
          </Lead>
          <DataTable
            head={["Compatible", "Notas"]}
            rows={[
              [
                <Fragment key="f8"><InlineCode>+ − * / % **</InlineCode></Fragment>,
                "Suma, resta, multiplicación, división, residuo, potencia. Los paréntesis agrupan como siempre.",
              ],
              [
                <Fragment key="f9"><InlineCode>{"{Field Name}"}</InlineCode></Fragment>,
                "Una referencia a otra columna de la misma fila. Los espacios en el nombre no son problema.",
              ],
              [
                "Números escritos como texto",
                <Fragment key="f10">
                  Se convierten automáticamente, así que{" "}
                  <InlineCode>&ldquo;1,234.50&rdquo;</InlineCode> se comporta como un número.
                </Fragment>,
              ],
              [
                "Celdas vacías",
                "Cuentan como cero, así que una columna opcional que falta no hace fallar la fila.",
              ],
            ]}
          />
          <WarningBox>
            Las fórmulas son solo aritméticas: no hay funciones, ni operaciones de texto, ni
            condicionales. Para lógica si/si no usa un campo Conditional; para totales entre filas
            usa un campo Summary. Dividir entre cero hace fallar esa fila en lugar de devolver un
            vacío sin avisar, así que protege las columnas que pueden valer cero legítimamente.
          </WarningBox>
        </DocCard>

        <DocCard icon={<Sigma size={24} />} title="Campos Summary">
          <Lead>
            Los campos Summary agregan sobre todas las filas del sweep en lugar de calcular por
            fila. Responden &ldquo;¿cuál es el total de este documento?&rdquo; sin que tengas que
            sumar las filas después.
          </Lead>
          <DataTable
            head={["Agregación", "Resultado"]}
            rows={[
              ["Sum", "Total de una columna numérica"],
              ["Average", "Promedio de una columna numérica"],
              ["Median", "Valor central de una columna numérica"],
              ["Min / Max", "El valor más pequeño y el más grande"],
              ["Count", "Cuántas filas tienen un valor en esa columna"],
              ["Count unique", "Cuántos valores distintos aparecen"],
            ]}
          />
        </DocCard>

        <DocCard icon={<Package size={24} />} title="Clasificación HS Code">
          <Lead>
            El campo HS Code asigna un código arancelario a cada fila a partir de la descripción del
            producto. Recorre el arancel de Panamá (SA 2022) de arriba abajo (sección, luego
            capítulo, luego partida, luego fracción arancelaria nacional) aplicando las notas legales
            de cada capítulo en lugar de comparar la descripción con una lista de códigos.
          </Lead>
          <BulletList
            items={[
              "Elige qué columnas lee el clasificador: normalmente la descripción del producto, a veces junto con el material o el uso. Si no eliges ninguna, se usa toda la fila.",
              "Agrega instrucciones para los casos en que tu catálogo se equivoca: cómo tratar kits, repuestos o mercancías que podrían ir en dos capítulos.",
              "Cada fila se clasifica por separado, así que una fila difícil no afecta a las demás.",
            ]}
          />
          <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Es una clasificación, no un dictamen">
            La clasificación arancelaria es un criterio que deciden las autoridades aduaneras. Toma
            el resultado como una primera propuesta sólida que hay que revisar, no como una
            declaración lista para presentar. Es un buen caso para{" "}
            <DocLink href="/es/documentacion/revision-humana">revisión humana</DocLink> antes de la
            entrega.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Send size={24} />} title="Dar forma a la salida y entregarla">
          <Lead>
            Entre las columnas calculadas y la entrega, un Cleaner puede descartar filas sobrantes,
            pasar datos de formato largo a ancho, elegir qué columnas se envían y mandar el resultado
            a una dirección de correo o a un webhook.
          </Lead>
          <DataTable
            head={["Ajuste", "Qué hace"]}
            rows={[
              [
                "Skip rows",
                "Descarta las primeras N filas o todas las filas vacías de un archivo subido a mano antes de limpiar: para hojas de cálculo con filas de título sobre el encabezado.",
              ],
              [
                "Pivot",
                "Pasa las filas a formato ancho en la entrega: una columna por cada etiqueta distinta, más columnas de resumen por fila opcionales. Las filas guardadas se quedan en formato largo.",
              ],
              [
                "Output fields",
                "Elige qué columnas aparecen en la salida. Las columnas excluidas siguen disponibles para los campos calculados.",
              ],
              [
                "Email output",
                "Envía el resultado limpio a una dirección después de cada sweep.",
              ],
              [
                "Webhook",
                <Fragment key="f11">
                  Envía por POST el resultado limpio a una URL después de cada sweep. Solo HTTPS;
                  consulta <DocLink href="/es/documentacion/webhooks">webhooks</DocLink>.
                </Fragment>,
              ],
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Pivot no llega a los Buckets">
            Pivot se aplica al payload del webhook, a la salida por correo y a las descargas. Las
            exportaciones a Buckets siempre reciben las filas sin pivotar, así que la tabla guardada
            mantiene una fila por registro.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Clock size={24} />} title="Sweeps y créditos">
          <Lead>
            Un sweep es una ejecución de un Cleaner sobre un lote de filas. Los sweeps se
            ejecutan automáticamente cuando termina un Flow vinculado, o cuando lo pides al subir un
            conjunto de datos para limpiar. Cada sweep se cobra según el número de celdas no vacías
            que procesó, no según el número de documentos.
          </Lead>
          <DataTable
            head={["Cómo empieza un sweep", "Cuándo usarlo"]}
            rows={[
              [
                "Vinculado a un Flow",
                "Cada Run de ese Flow se barre en cuanto termina la extracción. Es la configuración normal.",
              ],
              [
                "Subida manual",
                "Limpiar un archivo CSV o Excel que no vino de un Flow: la lista de precios de un proveedor, una exportación de un sistema antiguo.",
              ],
            ]}
          />
          <p>
            Los créditos de limpieza se cobran por cada 500 celdas no vacías, redondeando hacia
            arriba, con un mínimo de un crédito. Las celdas vacías no se cuentan, así que una tabla
            ancha con muchas columnas opcionales cuesta menos de lo que sugieren sus dimensiones.
            Cada sweep registra las celdas procesadas y los créditos que usó.
          </p>
          <p>
            Abre un sweep desde <strong>Sweep History</strong> en el Cleaner para ver las filas que
            produjo, los créditos que consumió y los errores por fila: una fórmula que dividió entre
            cero, una búsqueda que no encontró nada, un valor que no pasó la validación. Los errores
            se asocian a la fila que los causó, así que una sola fila mala no hace fallar el sweep.
          </p>
        </DocCard>

        <DocCard icon={<ArrowLeftRight size={24} />} title="Dónde se ubica un Cleaner en el pipeline">
          <Lead>
            La limpieza ocurre después de la extracción y antes de la entrega. Ese orden importa: todo
            lo que viene después (la pantalla de revisión, el payload del webhook, las filas del
            Bucket, las variables de entrada de un Agent) ve la salida limpia, no la extracción sin
            procesar.
          </Lead>
          <NumberedList
            items={[
              "El Flow extrae filas del documento.",
              "El Cleaner vinculado barre esas filas: formatos, conversiones, búsquedas, columnas calculadas.",
              "Se disparan las Conditional Actions: se descartan filas, salen notificaciones y puede solicitarse revisión.",
              <Fragment key="f12">
                Si se activó la revisión, el Run se pausa y un revisor ve la tabla{" "}
                <em>limpia</em>.
              </Fragment>,
              <Fragment key="f13">
                Al terminar, se entregan los resultados: correo, webhook,{" "}
                <DocLink href="/es/documentacion/buckets">Bucket</DocLink>, llenado de formulario o
                un <DocLink href="/es/documentacion/agents">Agent</DocLink> encadenado.
              </Fragment>,
            ]}
          />
          <p>
            El <DocLink href="/es/documentacion/mapa-del-pipeline">Mapa del pipeline</DocLink>{" "}
            muestra esto para tu propio espacio de trabajo, incluidos los Flows que comparten un
            Cleaner.
          </p>
        </DocCard>

        <Related
          links={[
            {
              href: "/es/documentacion/revision-humana",
              label: "Envía a revisión humana los Runs que rompen reglas",
              description:
                "La acción de revisión en Conditional Actions y lo que un revisor puede cambiar.",
            },
            {
              href: "/es/documentacion/buckets",
              label: "Busca valores en Buckets y escribe de vuelta en ellos",
              description:
                "Las tablas estructuradas con las que trabajan Lookup, Bucket Check y la acción de editar filas.",
            },
            {
              href: "/es/documentacion/agents",
              label: "Deja que un Agent actúe sobre datos limpios",
              description:
                "Los Agents leen la salida limpia de un Flow, así que normalizar los valores primero mejora las búsquedas.",
            },
            {
              href: "/es/documentacion/webhooks",
              label: "Entrega los resultados limpios a tus sistemas",
              description: "Forma del payload y comportamiento de reintentos para los webhooks de sweeps y de Runs.",
            },
          ]}
        />
      </section>
    </>
  );
}
