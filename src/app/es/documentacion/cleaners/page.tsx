import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  AlertTriangle,
  ArrowLeftRight,
  Calculator,
  CalendarClock,
  Clock,
  Code,
  FilePlus,
  HelpCircle,
  Info,
  Package,
  PenLine,
  Radar,
  Send,
  Sigma,
  SlidersHorizontal,
  Sparkles,
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
            Un Cleaner es un conjunto de reglas que se aplica a filas de datos: las filas que un Flow
            extrajo o una hoja de cálculo que subes. Estandariza formatos, convierte monedas y
            unidades, traduce texto, calcula columnas nuevas, busca valores en tus propios datos,
            marca valores atípicos, recoge valores de un revisor y puede disparar acciones cuando una
            fila rompe una regla.
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
              ["Trabaja sobre", "Un documento", "Las filas que produjo un Flow, o un CSV o Excel que subes"],
              ["Produce", "Campos extraídos sin procesar", "Columnas normalizadas, enriquecidas y validadas"],
              [
                "Trabajo típico",
                "Leer la factura",
                "Convertir EUR a USD, cambiar el formato de las fechas, marcar el total que no cuadra",
              ],
              [
                "Se vincula a",
                "Nada: es el punto de partida",
                "Cualquier cantidad de Flows (cada Flow tiene como máximo un Cleaner), o se ejecuta solo",
              ],
            ]}
          />
          <p>
            Cada ejecución de un Cleaner sobre un lote de filas se llama <strong>limpieza</strong>{" "}
            (en inglés, <em>sweep</em>).
          </p>
        </DocCard>

        <DocCard icon={<FilePlus size={24} />} title="Crear un Cleaner">
          <Lead>
            Haz clic en <strong>Crear Cleaner</strong> en la página de Cleaners. Tavnit primero
            pregunta <em>&ldquo;¿De dónde vienen los datos?&rdquo;</em> y ofrece cuatro puntos de
            partida.
          </Lead>
          <DataTable
            head={["Opción", "Qué pasa"]}
            rows={[
              [
                <strong key="c0">Desde un flow</strong>,
                "Elige el Flow cuya salida recibirá este Cleaner. Sus campos de salida se convierten en los campos base, y el nombre se sugiere a partir del Flow.",
              ],
              [
                <strong key="c1">Desde un archivo</strong>,
                "Sube un CSV o Excel de ejemplo. Su fila de encabezados se convierte en los campos base.",
              ],
              [
                <strong key="c2">Desde plantilla</strong>,
                "Duplica uno de tus Cleaners existentes, con todos sus campos y ajustes, y edita la copia.",
              ],
              [
                <strong key="c3">Desde cero</strong>,
                "Abre el constructor completo y define todo a mano.",
              ],
            ]}
          />
          <p>
            Con <strong>Desde un flow</strong> y <strong>Desde un archivo</strong>, el siguiente paso
            también ofrece <strong>Sugerir reglas de limpieza con IA</strong>. Si lo dejas apagado, el
            Cleaner se crea solo con los campos base. Si lo activas, puedes describir qué quieres
            limpiar o calcular (por ejemplo <em>&ldquo;Normaliza los nombres de proveedores y deja el
            RUC sin guiones&rdquo;</em>) y luego hacer clic en <strong>Sugerir reglas</strong>.
          </p>
          <InfoBox color="violet" icon={<Sparkles size={20} />} title="Cómo funcionan las reglas sugeridas por IA">
            La IA estudia tus columnas y valores reales de ejemplo (en un Flow, filas de su último Run
            completado) y arma reglas como formato con IA, formatos de fecha y número, fórmulas,
            categorías, condicionales y conversiones. Puedes desmarcar cualquier sugerencia o abrirla
            en el mismo editor que usa el constructor; una regla marcada &ldquo;Necesita
            ajuste&rdquo; hay que corregirla antes de que sea válida. Sugerir reglas no consume
            créditos, y todo queda editable después de crear el Cleaner.
          </InfoBox>
          <p>
            <strong>Desde cero</strong> abre el constructor, donde le pones nombre al Cleaner y
            recorres las mismas secciones que tiene la página de detalle:
          </p>
          <NumberedList
            items={[
              <Fragment key="f0">
                <strong>Campos Base.</strong> Elige una <strong>Fuente de Datos</strong>:{" "}
                <strong>Manual</strong> para definir las columnas desde cero,{" "}
                <strong>Desde Flow</strong> para importar los campos de salida de un Flow, o{" "}
                <strong>Desde Archivo</strong> para leer la fila de encabezados de un CSV o Excel. Se
                necesita al menos un campo.
              </Fragment>,
              <Fragment key="f1">
                <strong>Campos calculados.</strong> Agrega cualquiera de los tipos de campo de la
                referencia de abajo. Es opcional: un Cleaner con solo campos base es un paso directo
                válido.
              </Fragment>,
              <Fragment key="f2">
                <strong>Salidas.</strong> Una dirección de correo y una URL de webhook para las
                limpiezas que el Cleaner ejecuta por su cuenta. Opcional.
              </Fragment>,
              <Fragment key="f3">
                <strong>Omitir Filas.</strong> Descarta las primeras N filas o las filas vacías de las
                cargas. Opcional.
              </Fragment>,
            ]}
          />
          <p>
            Para que cada Run de un Flow se limpie automáticamente, vincula el Cleaner a ese Flow:
            marca <strong>Vincular este Cleaner al Flow</strong> cuando construyes desde un Flow, o
            elige el Cleaner en el ajuste <strong>Cleaner</strong> del Flow. Un Flow solo puede tener
            un Cleaner; un Cleaner puede servir a varios Flows, que aparecen en{" "}
            <strong>Flows Vinculados</strong> en su página de detalle. Crear y editar Cleaners
            requiere el rol de Admin u Owner.
          </p>
          <InfoBox color="blue" icon={<Info size={20} />} title="Mantén los campos base al día con el Flow">
            Si cambian los campos de un Flow vinculado, usa <strong>Sincronizar desde Flow</strong>{" "}
            (o <strong>Resincronizar campos</strong> junto al Flow en Flows Vinculados). Te muestra
            qué es nuevo en el Flow, qué cambió de tipo y qué ya no existe, y aplica las diferencias.
            Eliminar una columna es opcional, y los campos calculados que la referencien deben
            actualizarse a mano.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Table2 size={24} />} title="Referencia de tipos de campo">
          <Lead>
            Cada columna de un Cleaner tiene un tipo que decide qué hace. La página de detalle los
            agrupa en su panel izquierdo bajo <strong>Entrada</strong> y <strong>Calculados</strong>,
            con un conteo para cada uno. Este es el conjunto completo, en el orden en que la app los
            muestra.
          </Lead>
          <Screenshot
            src="/assets/docs-cleaner-fields-2026-08.jpg"
            alt="La página de detalle de un Cleaner de Tavnit. El panel izquierdo lista los tipos de campo (Base Fields, AI Formatted, Date Format, Number Format, Calculated, Category, HS Code, Lookup, Bucket Check, Conditional Actions, Conditional, Currency, Translation, Unit Conv. y Summary) con un conteo al lado de cada uno, junto a la lista de campos base del Cleaner."
            caption="Los tipos de campo se agrupan en el panel izquierdo del Cleaner, con un conteo que muestra cuántos de cada uno usa este Cleaner."
          />
          <DataTable
            head={["Tipo de campo", "Qué produce"]}
            rows={[
              ["Campos Base", "Una columna de los datos de entrada, que pasa tal cual a la salida."],
              [
                "Formato IA",
                "Una reescritura con IA según tus instrucciones: normalizar el nombre de un proveedor, ordenar una dirección, estandarizar una descripción. Lee las columnas de entrada que elijas, o la fila completa.",
              ],
              [
                "Formateo Fecha",
                "Una columna de fecha convertida a un único formato de salida, con conversión opcional por IA para los valores que el formato de entrada no puede leer.",
              ],
              [
                "Formateo Número",
                "Una columna numérica con un número fijo de decimales (de 0 a 6) y los separadores de miles y decimales que elijas.",
              ],
              ["Calculado", "Un valor obtenido con una fórmula aritmética a partir de otras columnas de la misma fila."],
              [
                "Categoría",
                "Una clasificación con IA dentro de una lista fija de al menos dos opciones que tú defines: tipo de gasto, departamento, prioridad.",
              ],
              [
                "Código Arancelario",
                "Una clasificación arancelaria con IA según el arancel de Panamá (SA 2022).",
              ],
              [
                "Entrada Humana",
                <Fragment key="t0">
                  Una columna que un revisor llena durante la{" "}
                  <DocLink href="/es/documentacion/revision-humana">revisión humana</DocLink>, como
                  texto libre o desde un menú. Consulta más abajo.
                </Fragment>,
              ],
              [
                "Búsqueda",
                <Fragment key="t1">
                  Un valor tomado de un <DocLink href="/es/documentacion/buckets">Bucket</DocLink> al
                  cruzar esta fila con él (un precio de catálogo, un código de cliente), con un valor
                  de respaldo cuando nada coincide. Las condiciones de coincidencia pueden comparar
                  valores exactos o usar coincidencia por IA.
                </Fragment>,
              ],
              [
                "Verificación (Existe en Bucket)",
                "Un sí o no que indica si esta fila ya existe en un Bucket. Útil para eliminar duplicados.",
              ],
              [
                "Acciones Condicionales",
                "No es un valor: es una regla que dispara acciones cuando una fila coincide. Consulta más abajo.",
              ],
              [
                "Condicional",
                "Un valor si/si no: ramas si, si no si y si no que evalúan el contenido de la fila, cada una con su propio valor de salida.",
              ],
              [
                "Moneda",
                "Un monto convertido a una moneda de destino, con una tasa en vivo o una tasa fija que tú defines. La moneda de origen se puede detectar automáticamente.",
              ],
              [
                "Traducción",
                "Texto traducido a un idioma de destino, con la opción de conservar el formato y de omitir las filas que ya están en ese idioma.",
              ],
              [
                "Conv. Unidades",
                "Una medida convertida entre unidades: masa, longitud, volumen, temperatura, área, velocidad o tamaño de datos.",
              ],
              ["Resumen", "Un solo agregado calculado sobre todas las filas de la limpieza, escrito en cada fila."],
              [
                "Anomalías",
                "true/false para los valores que se alejan del resto de la limpieza. Determinista, sin IA.",
              ],
              [
                "Cálculo de Fechas",
                "Días, semanas, meses o años entre dos fechas, o una fecha desplazada desde hoy o desde una columna. Determinista, sin IA.",
              ],
            ]}
          />
          <InfoBox
            color="violet"
            icon={<ArrowLeftRight size={20} />}
            title="Reemplazar la columna o agregar una nueva"
          >
            La mayoría de los campos calculados tienen un modo de salida.{" "}
            <strong>Replace column</strong> sobrescribe una columna en su lugar: eliges la columna y
            el campo toma su nombre. <strong>New column</strong> conserva la original y escribe el
            resultado al lado, con el nombre que elijas. Conserva la original cuando un revisor
            necesite ver lo que el documento decía realmente, por ejemplo al convertir moneda.
          </InfoBox>
          <p>
            Cualquier campo se puede marcar como <strong>Excluir de la salida</strong>: sigue
            disponible para las columnas calculadas, pero no aparece en lo que entrega el Cleaner. Así
            usas un valor intermedio (un monto sin procesar, una clave de búsqueda) sin enviarlo
            más adelante.
          </p>
        </DocCard>

        <DocCard icon={<SlidersHorizontal size={24} />} title="Opciones de formato y conversión">
          <Lead>
            Los tipos de formato y conversión tienen cada uno un pequeño conjunto de ajustes. Estos
            son los que cambian el resultado.
          </Lead>
          <DataTable
            head={["Tipo de campo", "Ajustes"]}
            rows={[
              [
                "Formateo Fecha",
                "Formato de entrada (dd/mm/yyyy o mm/dd/yyyy) y de salida (yyyy-MM-dd, dd/MM/yyyy, MM/dd/yyyy o MMM d, yyyy). Activa la conversión por IA (AI conversion) y los valores que el formato de entrada no puede leer, en cualquier idioma o notación, se convierten con IA al formato de salida. Si agregas instrucciones especiales opcionales (por ejemplo “fecha de origen + 40 días”), todos los valores se procesan con IA.",
              ],
              ["Formateo Número", "Decimales, separador de miles (ninguno, coma, punto o espacio) y separador decimal."],
              [
                "Formato IA",
                "Las columnas de entrada que lee la IA (si no eliges ninguna, se usa la fila completa) e instrucciones que describen la transformación.",
              ],
              [
                "Categoría",
                "Las opciones, las columnas que evalúa la IA (si no eliges ninguna, se usa la fila completa) e instrucciones opcionales.",
              ],
              [
                "Moneda",
                "Moneda de origen (o detección automática), moneda de destino, y tasa en vivo o tasa fija. En modo en vivo, el editor muestra la tasa actual.",
              ],
              [
                "Traducción",
                "Idioma de origen y de destino, conservar el formato, y traducir solo si el texto no está ya en el idioma de destino.",
              ],
              ["Conv. Unidades", "Categoría, unidad de origen (o detección automática) y unidad de destino."],
            ]}
          />
        </DocCard>

        <DocCard icon={<Zap size={24} />} title="Acciones Condicionales">
          <Lead>
            Un campo de Acciones Condicionales es una regla: <em>cuando una fila cumple estas
            condiciones, haz estas cosas</em>. Es el único tipo de campo que cambia lo que pasa con
            los datos en lugar de lo que contiene una celda, y es la forma de que una falla de
            validación se convierta en algo más que un número en una tabla.
          </Lead>
          <DataTable
            head={["Acción", "Qué hace"]}
            rows={[
              [
                "Skip Row",
                "Elimina por completo la fila de la salida: la forma de filtrar subtotales, líneas vacías y encabezados basura.",
              ],
              [
                "Human in the Loop",
                <Fragment key="f6">
                  Pausa el Run del Flow para{" "}
                  <DocLink href="/es/documentacion/revision-humana">revisión humana</DocLink> y
                  asigna a los revisores que indiques en la acción. Las filas y los campos que
                  coinciden quedan marcados en la pantalla de revisión.
                </Fragment>,
              ],
              [
                "Send Email",
                "Envía una notificación a los destinatarios que indiques, con el asunto y el cuerpo que escribas. Un envío por regla y por limpieza, no uno por cada fila que coincide.",
              ],
              [
                "Send Webhook",
                "Envía una notificación por POST a la URL que indiques. Mismo comportamiento de un envío por regla.",
              ],
              [
                "Edit Bucket Row",
                <Fragment key="f7">
                  Escribe un valor de vuelta en la fila del{" "}
                  <DocLink href="/es/documentacion/buckets">Bucket</DocLink> que encontró un campo de
                  Búsqueda: marcar un pedido como recibido, descontar inventario, cambiar un estado.
                  La página de la limpieza lista cada celda modificada en Cambios en Buckets.
                </Fragment>,
              ],
            ]}
          />
          <p>
            Las condiciones se agrupan, y los grupos se combinan con AND u OR, así que puedes expresar
            cosas como <em>(total &gt; 10,000 O la moneda no es USD) Y el proveedor no está en la lista
            aprobada</em>. Las condiciones también pueden leer columnas calculadas, incluidos los
            campos de Resumen y de Anomalías. Una regla sin ninguna condición se dispara en todas las
            filas.
          </p>
          <InfoBox color="blue" icon={<Info size={20} />} title="Las notificaciones se envían aunque el Run se rechace">
            Las acciones de correo y webhook se envían en cuanto la regla coincide, antes de cualquier
            pausa de revisión. Es intencional: <em>avísame cuando esto pase</em> no debería depender
            de si un revisor aprueba el Run después. También se envían en las limpiezas
            independientes; la acción Human in the Loop solo aplica a los Runs de un Flow, porque una
            limpieza independiente no tiene paso de revisión.
          </InfoBox>
          <p>
            <strong>Ejemplo práctico.</strong> En un Cleaner de facturas, agrega un campo de Acciones
            Condicionales con dos reglas. La primera detecta las filas donde el total de la línea no
            es igual a cantidad × precio unitario y envía el Run a Human in the Loop. La segunda
            detecta cualquier factura por encima de tu umbral de aprobación y le envía un correo al
            responsable de finanzas. Todo lo demás pasa directo al Bucket sin que nadie lo toque.
          </p>
        </DocCard>

        <DocCard icon={<Calculator size={24} />} title="Campos calculados y fórmulas">
          <Lead>
            Un campo Calculado evalúa una expresión aritmética sobre la fila en la que está.
            Referencia otras columnas por nombre entre llaves y, si quieres, empieza la fórmula con un
            signo igual: tanto <InlineCode>{"={Quantity} * {Unit Price}"}</InlineCode> como{" "}
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
                "Una referencia a otra columna de la misma fila, incluidos otros campos Calculados y de Resumen. Los espacios en el nombre no son problema.",
              ],
              [
                "Números escritos como texto",
                <Fragment key="f10">
                  Se convierten automáticamente, así que{" "}
                  <InlineCode>&ldquo;1,234.50&rdquo;</InlineCode> se comporta como un número.
                </Fragment>,
              ],
              ["Celdas vacías", "Cuentan como cero, así que una columna opcional que falta no rompe la fila."],
              [
                "Formato del resultado",
                "Decimales y separadores opcionales para el resultado que se muestra (Format result). El valor sigue siendo numérico, así que los campos con formato siguen sirviendo en otras fórmulas.",
              ],
            ]}
          />
          <WarningBox>
            Las fórmulas son solo aritméticas: no hay funciones, ni operaciones de texto, ni
            condicionales. Para lógica si/si no usa un campo Condicional; para totales entre filas usa
            un campo de Resumen; para aritmética de fechas usa Cálculo de Fechas. Dividir entre cero
            deja esa celda vacía y registra un error en la fila, así que protege las columnas que
            pueden valer cero legítimamente.
          </WarningBox>
        </DocCard>

        <DocCard icon={<Sigma size={24} />} title="Campos de Resumen">
          <Lead>
            Los campos de Resumen agregan sobre todas las filas de la limpieza en lugar de calcular
            por fila, y escriben el resultado en cada fila. Responden &ldquo;¿cuál es el total de este
            documento?&rdquo; sin que tengas que sumar las filas más adelante.
          </Lead>
          <DataTable
            head={["Agregación", "Resultado"]}
            rows={[
              ["Sum", "Total de una columna numérica"],
              ["Average", "Promedio de una columna numérica"],
              ["Minimum / Maximum", "El valor más pequeño y el más grande"],
              ["Median", "Valor central de una columna numérica"],
              ["Count (non-empty)", "Cuántos valores tiene la columna"],
              ["Count distinct", "Cuántos valores distintos aparecen"],
            ]}
          />
          <BulletList
            items={[
              "Incluir solo las filas que coinciden: grupos de condiciones opcionales, para sumar solo las filas de una categoría o un estado.",
              "Formato del resultado: decimales y separadores opcionales, como en los campos Calculados. El valor sigue siendo numérico.",
              "Celdas con varios valores: cuando una columna tiene varios valores por fila (un campo de varios valores de un Flow, como cada línea de descuento de un recibo de sueldo), cada valor cuenta. Sum los suma todos, Count cuenta cada uno y Average divide entre la cantidad de valores.",
              "Los resultados de Resumen se pueden usar en fórmulas y en las condiciones de Acciones Condicionales.",
            ]}
          />
        </DocCard>

        <DocCard icon={<PenLine size={24} />} title="Campos de Entrada Humana">
          <Lead>
            Un campo de Entrada Humana es una columna que nadie extrae: un revisor escribe o elige su
            valor en la pantalla de revisión. Úsalo para información que no está en el documento, como
            el almacén al que va una entrega o un código de aprobación.
          </Lead>
          <BulletList
            items={[
              "Tipo de entrada: Free text (texto libre) o Menu. Un menú toma sus opciones de los valores distintos de una columna de un Bucket, opcionalmente filtrados por condiciones sobre otras columnas del Bucket o sobre los valores de la fila actual.",
              "Value is mandatory (valor obligatorio): si está activo, la aprobación se bloquea hasta que todas las filas tengan un valor. Desactívalo para permitir valores vacíos.",
              "Revisores: elige al menos uno. Se suman a los revisores del Run.",
            ]}
          />
          <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Todos los Runs del Flow pasan por revisión">
            Mientras un Cleaner tenga un campo de Entrada Humana en su salida, cada Run de un Flow que
            pase por ese Cleaner se pausa para revisión humana, sin importar cómo vengan los datos. Las
            limpiezas independientes no tienen paso de revisión y entregan la columna vacía. Un campo
            de Entrada Humana excluido de la salida no tiene efecto.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Radar size={24} />} title="Anomalías">
          <Lead>
            Un campo de Anomalías (Detección de Anomalías) marca las filas cuyo valor en una columna
            se aleja del resto de la limpieza: una cantidad muy distinta a las demás, o un código de
            una categoría que casi nadie más usa. Devuelve <InlineCode>true</InlineCode> cuando el
            valor se aleja del resto y <InlineCode>false</InlineCode> en otro caso. Es determinista y
            no usa IA.
          </Lead>
          <DataTable
            head={["Ajuste", "Qué hace"]}
            rows={[
              [
                "Columna a revisar",
                "Cualquier columna anterior, incluidas las calculadas como Código Arancelario o Calculado.",
              ],
              [
                "Detección",
                "Automático (las columnas numéricas usan detección de atípicos, el resto detección de valores raros), Valores numéricos atípicos o Valores raros.",
              ],
              [
                "Valores numéricos atípicos",
                "Compara cada valor con la mediana de la limpieza usando una dispersión robusta, así un atípico no puede esconderse. Ajusta el Umbral de sensibilidad (más alto significa menos marcas) y la Dirección: Ambos lados, Solo inusualmente bajos o Solo inusualmente altos.",
              ],
              [
                "Valores raros",
                "Marca los valores cuyo grupo queda por debajo del porcentaje de filas que definas (Raro por debajo de). Usa Comparar primeros N caracteres para agrupar códigos, por ejemplo 2 para capítulos del SA o 4 para partidas.",
              ],
              [
                "Comparar dentro de",
                "Opcionalmente, juzga cada valor solo contra las filas que comparten el valor de otra columna.",
              ],
              ["Mínimo de filas", "Las limpiezas con menos valores que este no marcan nada."],
            ]}
          />
          <p>
            Un campo de Anomalías solo produce una marca. Para actuar sobre ella, agrega una regla de
            Acciones Condicionales como <em>este campo es igual a true → Human in the Loop</em>.
            Luego la pantalla de revisión muestra el motivo de cada valor marcado.
          </p>
        </DocCard>

        <DocCard icon={<CalendarClock size={24} />} title="Cálculo de Fechas">
          <Lead>
            Un Cálculo de Fechas hace aritmética de fechas en cada fila, de forma determinista y sin
            IA. Tiene dos modos.
          </Lead>
          <DataTable
            head={["Cálculo", "Devuelve"]}
            rows={[
              [
                "Diferencia entre dos fechas",
                "Un número entero de unidades desde Inicio hasta Fin (Fin − Inicio), negativo cuando Fin es anterior. Inicio y Fin pueden ser cada uno una columna u Hoy, pero no ambos Hoy. Úsalo para los días que faltan para un vencimiento, o una edad.",
              ],
              [
                "Desplazar una fecha",
                "Una fecha (AAAA-MM-DD) movida hacia adelante o hacia atrás una cantidad entera de días, semanas, meses o años, desde una columna o desde Hoy. Una cantidad negativa la mueve hacia atrás.",
              ],
            ]}
          />
          <BulletList
            items={[
              "Unidades para una diferencia: Días, Semanas (solo semanas completas), Meses (completos), como una edad, Meses calendario (cambios de mes, sin importar el día) y Años (completos).",
              "Hoy es la fecha de tu organización cuando se procesan los datos.",
              "Una fecha vacía da una celda vacía. Combina el resultado con un campo Condicional (por ejemplo dias_para_vencer >= 30 → sí, si no → no) para marcar filas.",
            ]}
          />
        </DocCard>

        <DocCard icon={<Package size={24} />} title="Clasificación arancelaria">
          <Lead>
            El campo Código Arancelario asigna un código arancelario de aduana a cada fila a partir de
            la descripción del producto. Recorre el arancel de Panamá (SA 2022): sección, luego
            capítulo, luego partida y luego la línea arancelaria nacional, en lugar de buscar
            coincidencias entre la descripción y una lista de códigos.
          </Lead>
          <BulletList
            items={[
              "Benchmark Fields (campos de referencia): las columnas que lee el clasificador, normalmente la descripción del producto, a veces junto con el material o el uso. Si no eliges ninguna, se usa la fila completa.",
              "Instrucciones para la IA: los casos que tu catálogo clasifica mal, como qué hacer con kits, repuestos o mercancías que podrían ir en dos capítulos.",
              "Section preselect (recomendado): empieza la clasificación por las 22 secciones del SA antes de los capítulos.",
              "Output Format: solo el código (por ejemplo 0101.29.00.00.00) o el código con su descripción.",
              "Cada fila se clasifica de forma independiente, así que una fila difícil no afecta a las demás.",
            ]}
          />
          <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Es una clasificación, no un dictamen">
            La clasificación arancelaria es una decisión de criterio que toman las autoridades
            aduaneras. Trata el resultado como un primer paso sólido que hay que verificar, no como
            una declaración lista para presentar. Es un buen candidato para un campo de Anomalías
            sobre los primeros caracteres del código, o para{" "}
            <DocLink href="/es/documentacion/revision-humana">revisión humana</DocLink> antes de la
            entrega.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Send size={24} />} title="Dar forma a la salida y entregarla">
          <Lead>
            Después de las columnas calculadas, un Cleaner puede descartar filas basura, elegir y
            ordenar las columnas que entrega, pasar datos largos a formato ancho y enviar el resultado
            a una dirección de correo o a un webhook.
          </Lead>
          <DataTable
            head={["Ajuste", "Qué hace"]}
            rows={[
              [
                "Omitir Filas",
                "No omitir filas, omitir las primeras N filas u omitir las filas vacías de las cargas manuales antes de limpiar: para hojas de cálculo con filas de título encima del encabezado.",
              ],
              [
                "Campos de Salida",
                "Elige qué campos aparecen en la salida limpia y en qué orden: arrástralos para definir el orden de las columnas. Ese orden es el orden de las columnas en todos los lugares a donde va la salida. Al menos un campo debe quedar incluido.",
              ],
              [
                "Pivot",
                "Entrega las filas en formato ancho: una columna por cada valor distinto de una columna de etiquetas (por ejemplo, tallas), llena con los valores de otra columna. Consulta más abajo.",
              ],
              [
                "Salida por Email",
                "Envía el resultado limpio a esta dirección después de cada limpieza que el Cleaner ejecuta por su cuenta.",
              ],
              [
                "Webhook",
                <Fragment key="f11">
                  Envía el resultado limpio por POST a esta URL después de cada limpieza que el
                  Cleaner ejecuta por su cuenta. Solo HTTPS. Consulta{" "}
                  <DocLink href="/es/documentacion/webhooks">webhooks</DocLink>.
                </Fragment>,
              ],
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Qué limpiezas usan las salidas propias del Cleaner">
            La Salida por Email y el Webhook del Cleaner entregan las limpiezas que ejecuta por su
            cuenta: las cargas con Limpiar Dataset y las limpiezas por API. La limpieza de un Run de
            un Flow se entrega por la salida de email y el webhook de ese Flow, así nadie recibe el
            mismo documento dos veces.
          </InfoBox>
          <p>
            <strong>Pivot</strong> es el formato de entrega, no solo una vista. Elige la{" "}
            <strong>Columna a explotar</strong>, la columna de <strong>Valores desde</strong>, cómo{" "}
            <strong>Agrupar filas por</strong> (todas las demás columnas automáticamente, o las
            columnas que elijas) y qué hacer cuando una etiqueta se repite dentro de un grupo: sumar
            los valores, mantener el primer valor, o mantener el primer valor y marcar una
            advertencia. Las <strong>Columnas de resumen</strong> opcionales (Suma, Promedio, Mínimo,
            Máximo o Conteo) se calculan por fila sobre las columnas expandidas y aparecen en el
            extremo derecho. En <strong>Aplicar a</strong>, elige el payload del webhook, la salida
            por email y las descargas; con las descargas activadas, la página de la limpieza abre en
            la vista pivotada.
          </p>
          <InfoBox color="violet" icon={<Info size={20} />} title="El pivot no llega a los Buckets">
            Las filas almacenadas se mantienen en formato largo, y las exportaciones a Buckets siempre
            reciben las filas sin pivotar, así la tabla guardada conserva una fila por registro.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Clock size={24} />} title="Limpiezas y créditos">
          <Lead>
            Una limpieza es una ejecución de un Cleaner sobre un lote de filas. Cada limpieza se cobra
            según las celdas que limpió, no según la cantidad de documentos.
          </Lead>
          <DataTable
            head={["Cómo empieza una limpieza", "Cuándo usarla"]}
            rows={[
              [
                "Vinculada a un Flow",
                "Cada Run de ese Flow se limpia en cuanto termina la extracción. Es la configuración normal.",
              ],
              [
                "Limpiar Dataset",
                "Sube un archivo CSV, XLSX o XLS con el botón Limpiar del Cleaner (o Limpiar Dataset en la página de Cleaners): una lista de precios de un proveedor, una exportación de un sistema anterior.",
              ],
              ["API", "Envía un archivo o filas en JSON al Cleaner desde tus propios sistemas. Consulta más abajo."],
            ]}
          />
          <p>
            Los créditos de limpieza se cobran por cada 500 celdas no vacías de la salida limpia,
            redondeando hacia arriba, con un mínimo de un crédito. Las celdas vacías y los campos
            excluidos no cuentan, así que una tabla ancha con muchas columnas opcionales cuesta menos
            de lo que sugieren sus dimensiones; cada campo de Búsqueda suma una celda por fila. Los
            tipos de campo con IA no tienen un cargo aparte. Consulta{" "}
            <DocLink href="/es/documentacion/creditos">créditos</DocLink> para ver cómo encaja la
            limpieza con el resto de tu saldo.
          </p>
        </DocCard>

        <DocCard icon={<Table2 size={24} />} title="La página de una limpieza">
          <Lead>
            Abre cualquier limpieza desde el <strong>Historial de Limpiezas</strong> del Cleaner para
            ver exactamente qué hizo. La página se actualiza en vivo mientras la limpieza se procesa.
          </Lead>
          <BulletList
            items={[
              "Estado (Procesando, Completado, Fallido o Cancelado) con las Filas, los Créditos y el Origen de la limpieza.",
              "Advertencias: problemas por fila, como una fórmula que dividió entre cero o un valor que no se pudo leer como número. Cada problema queda ligado a la fila que lo causó, así una fila mala no hace fallar la limpieza.",
              "Información de la Limpieza: el Cleaner, cuándo se creó la limpieza, y el Run de Origen y el Flow cuando vino de un Flow.",
              "La tabla de datos, con un selector Limpiados / Pivotado / Sin Procesar para comparar la salida con lo que entró, y Expandir para verla a pantalla completa. Puedes seleccionar y copiar celdas.",
              "Exportación a CSV y JSON de la vista actual. Con un pivot aplicado a las descargas, la exportación tiene la forma pivotada.",
              "Salidas: un registro de cada entrega (correo, webhook, notificaciones) y si tuvo éxito.",
              "Cambios en Buckets: cada celda de Bucket que cambiaron las acciones Edit Bucket Row de la limpieza.",
            ]}
          />
        </DocCard>

        <DocCard icon={<Code size={24} />} title="Ejecutar un Cleaner desde la API">
          <Lead>
            Un Cleaner puede ejecutarse por su cuenta desde tus sistemas, sin ningún Flow de por
            medio. Copia su ID en el panel <strong>ID del Cleaner</strong> y autentícate con tu clave
            de API.
          </Lead>
          <DataTable
            head={["Endpoint", "Qué hace"]}
            rows={[
              [
                <InlineCode key="a0">POST /api/sweeps/run</InlineCode>,
                <Fragment key="a1">
                  Carga multipart de un archivo CSV o XLSX con <InlineCode>cleaner_id</InlineCode> y{" "}
                  <InlineCode>file</InlineCode> (<InlineCode>sheet_name</InlineCode> es opcional).
                </Fragment>,
              ],
              [
                <InlineCode key="a2">{"POST /api/cleaners/<cleaner_id>/process"}</InlineCode>,
                <Fragment key="a3">
                  Lo mismo, y además acepta las filas como JSON (
                  <InlineCode>{'{"rows": [...]}'}</InlineCode>) en lugar de un archivo.
                </Fragment>,
              ],
            ]}
          />
          <p>
            Ambos devuelven HTTP 202 con un <InlineCode>sweep_id</InlineCode>. Cuando la limpieza
            termina, la Salida por Email y el Webhook del propio Cleaner entregan las filas limpias.
            Consulta la <DocLink href="/es/documentacion/api">página de la API</DocLink> para la
            autenticación y la forma de la respuesta.
          </p>
        </DocCard>

        <DocCard icon={<ArrowLeftRight size={24} />} title="Dónde se ubica un Cleaner en el pipeline">
          <Lead>
            La limpieza ocurre después de la extracción y antes de la entrega. Ese orden importa: todo
            lo que viene después (la pantalla de revisión, el payload del webhook, las filas del
            Bucket, las variables de entrada de un Agente) ve la salida limpia, no la extracción sin
            procesar.
          </Lead>
          <NumberedList
            items={[
              "El Flow extrae las filas del documento.",
              "El Cleaner vinculado limpia esas filas: formatos, conversiones, búsquedas, columnas calculadas.",
              "Se disparan las Acciones Condicionales: se descartan filas, salen notificaciones y puede pedirse una revisión. Un campo de Entrada Humana siempre pide revisión.",
              <Fragment key="f12">
                Si se activó la revisión, el Run se pausa y un revisor ve la tabla{" "}
                <em>limpia</em>.
              </Fragment>,
              <Fragment key="f13">
                Al terminar, los resultados se entregan por las salidas del Flow: correo, webhook,{" "}
                <DocLink href="/es/documentacion/buckets">Bucket</DocLink>, llenado de formulario o
                un <DocLink href="/es/documentacion/agentes">Agente</DocLink> encadenado.
              </Fragment>,
            ]}
          />
          <p>
            El <DocLink href="/es/documentacion/mapa-del-pipeline">Mapa de Pipeline</DocLink> muestra
            esto para tu propio espacio de trabajo, incluidos los Flows que comparten un Cleaner.
          </p>
        </DocCard>

        <DocCard icon={<HelpCircle size={24} />} title="Solución de problemas">
          <DataTable
            head={["Problema", "Qué revisar"]}
            rows={[
              [
                "Una columna sale vacía",
                "Abre las Advertencias de la limpieza. Una Búsqueda sin coincidencia devuelve su valor de respaldo (o nada); una fórmula que dividió entre cero deja la celda vacía.",
              ],
              [
                "Falta una columna en la salida",
                "Puede estar excluida en Campos de Salida, o es una regla de Acciones Condicionales, que nunca produce una columna.",
              ],
              [
                "El webhook del Cleaner no se disparó en un Run de un Flow",
                "Es lo esperado: los Runs de un Flow se entregan por las salidas del propio Flow. La Salida por Email y el Webhook del Cleaner cubren las limpiezas de Limpiar Dataset y de la API.",
              ],
              [
                "Todos los Runs de un Flow pasan por revisión",
                "El Cleaner tiene un campo de Entrada Humana en su salida, o una regla de Acciones Condicionales sin condiciones envía todo a Human in the Loop.",
              ],
              [
                "Un campo calculado lee una columna que el Flow ya no produce",
                "Usa Sincronizar desde Flow y luego actualiza los campos calculados que referenciaban la columna eliminada.",
              ],
              ["Las filas del Bucket no están pivotadas", "Es lo esperado: las exportaciones a Buckets siempre reciben filas sin pivotar."],
            ]}
          />
        </DocCard>

        <Related
          links={[
            {
              href: "/es/documentacion/revision-humana",
              label: "Envía a revisión humana los Runs que rompen reglas",
              description:
                "La acción Human in the Loop, los campos de Entrada Humana y lo que puede cambiar un revisor.",
            },
            {
              href: "/es/documentacion/buckets",
              label: "Busca valores en Buckets y escribe de vuelta en ellos",
              description:
                "Las tablas estructuradas con las que trabajan Búsqueda, Verificación, los menús de Entrada Humana y Edit Bucket Row.",
            },
            {
              href: "/es/documentacion/creditos",
              label: "Entiende los créditos de limpieza",
              description: "Cómo encajan los cobros por celda de la limpieza con el resto de tu saldo.",
            },
            {
              href: "/es/documentacion/webhooks",
              label: "Entrega los resultados limpios a tus sistemas",
              description: "Forma del payload y comportamiento de reintentos de los webhooks de limpiezas y Runs.",
            },
          ]}
        />
      </section>
    </>
  );
}
