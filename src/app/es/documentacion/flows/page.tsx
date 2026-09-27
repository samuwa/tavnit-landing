import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  AlertTriangle,
  Boxes,
  Braces,
  Crosshair,
  FilePlus,
  Image as ImageIcon,
  Info,
  LifeBuoy,
  Play,
  Puzzle,
  Sparkles,
  Table2,
  Type,
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

export const metadata = docMetadata("flows", "es");

/** Refleja los pasos numerados visibles en "Construye el esquema". */
const HOW_TO = {
  name: "Construye un Flow de Tavnit que extraiga datos estructurados de un documento",
  description:
    "Crea un Flow, define sus campos de metadatos y campos de tabla, agrega pistas de extracción para que la IA sepa dónde buscar y actívalo.",
  steps: [
    {
      name: "Crea el Flow y descríbelo",
      text: "En la página \"Flows\", crea un Flow. Dale un nombre y una descripción de los documentos que procesa; la descripción también ayuda a la IA a extraer con más precisión.",
    },
    {
      name: "Agrega campos de metadatos",
      text: "Agrega un campo por cada valor que aparece una vez por documento, como número de factura, fecha de emisión o proveedor, y define su tipo de datos.",
    },
    {
      name: "Agrega campos de tabla",
      text: "Agrega un campo por cada columna de la tabla de líneas que se repite, como descripción, cantidad, precio unitario e monto.",
    },
    {
      name: "Agrega pistas de extracción",
      text: "Para cualquier campo ambiguo, agrega pistas: valores de ejemplo reales, la etiqueta junto a la que aparece, la zona de la página donde está o el encabezado de columna impreso.",
    },
    {
      name: "Activa y prueba",
      text: "Cambia el Flow a \"Active\" y procesa un documento real. Compara el resultado con el original y ajusta las pistas de cualquier campo que haya salido mal.",
    },
  ],
};

export default function Page() {
  return (
    <>
      <DocsPageSchema
        slug="flows"
        locale="es"
        howTo={HOW_TO}
        primaryImage={{
          url: "/assets/docs-flow-schema-2026-08.jpg",
          caption:
            "El esquema de datos de un Flow de Tavnit, con los campos de metadatos y los campos de tabla definidos lado a lado.",
          width: 1327,
          height: 801,
        }}
      />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
          Flows
        </h1>

        <DocCard icon={<Sparkles size={24} />} title="Qué es un Flow">
          <Lead>
            Un Flow es la definición de un tipo de documento: los campos que quieres extraer, las
            pistas que le dicen a la IA dónde encontrarlos y todo lo que se conecta después. Es el
            único objeto de Tavnit que convierte un documento en datos. Las Collections, los
            Splitters y los Cleaners existen para alimentar o refinar lo que produce un Flow.
          </Lead>
          <p>
            No hay plantilla que dibujar ni coordenadas que mapear. Describes los campos con palabras
            simples y el Flow funciona con distintos diseños, así que un solo Flow de{" "}
            <em>Facturas de proveedores</em> puede procesar veinte proveedores cuyas facturas no se
            parecen en nada. Por eso mismo, el esquema y sus pistas son donde se gana o se pierde casi
            toda la calidad de la extracción.
          </p>
          <Screenshot
            src="/assets/docs-flow-schema-2026-08.jpg"
            alt="El esquema de datos de un Flow de Tavnit llamado Invoice Processor. Un panel &quot;Metadata Fields&quot; lista nueve campos de un solo valor, como Invoice Number, Due Date y Total, con sus tipos de datos, junto a un panel &quot;Table Fields&quot; con Description, Quantity, Price y Amount. La barra lateral izquierda agrupa Recent Runs, Email Trigger, Collections, Cleaner, Agent, Form Templates, Email Output, Webhook, Bucket Export, Human in the Loop y Flow ID."
            caption="El esquema de datos de un Flow. Campos de metadatos a la izquierda, campos de tabla repetidos a la derecha y todo lo que puedes asociar al Flow en la barra lateral."
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Solo el esquema es obligatorio">
            Un Flow necesita al menos un campo. Todo lo demás en la barra lateral (Cleaner, Agent,
            webhook, correo, exportación a Bucket, revisión) es opcional y se puede agregar después
            sin reconstruir nada.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Table2 size={24} />} title="Campos de metadatos y campos de tabla">
          <Lead>
            Cada campo es de uno de dos tipos, según si el valor aparece una vez por documento o una
            vez por línea. Es la decisión con más consecuencias del esquema: define la forma del
            payload de tu webhook, las filas de tu Bucket, tu CSV y tu pantalla de revisión.
          </Lead>
          <DataTable
            head={["", "Campo de metadatos", "Campo de tabla"]}
            rows={[
              ["Aparece", "Una vez por documento", "Una vez por fila de una tabla que se repite"],
              [
                "En una factura",
                "Número de factura, fecha de emisión, proveedor, total",
                "Descripción, cantidad, precio unitario, monto",
              ],
              [
                "En la salida",
                <Fragment key="f0">
                  El objeto <InlineCode>metadata</InlineCode>
                </Fragment>,
                <Fragment key="f1">
                  Una entrada por fila en <InlineCode>rows</InlineCode>
                </Fragment>,
              ],
              [
                "En un Bucket",
                "Se repite en cada fila exportada de ese documento",
                "Una fila del Bucket por cada uno",
              ],
            ]}
          />
          <InfoBox color="violet" icon={<Info size={20} />} title="Elegir mal el tipo es el error clásico">
            Si defines una columna de líneas como campo de metadatos, obtienes un solo valor de una
            tabla de veinte. Si defines el total de una factura como campo de tabla, se repite el
            mismo número en cada fila. Si tienes dudas, pregúntate si podría aparecer una segunda
            copia del valor en el mismo documento.
          </InfoBox>
          <p>
            Un Flow también puede agregar <strong>columnas de sistema</strong> a cada fila que
            produce: el ID del Flow, el nombre del Flow y el ID del Run. Actívalas cuando varios Flows
            escriben en un mismo <DocLink href="/es/documentacion/buckets">Bucket</DocLink> y
            necesitas saber de qué documento vino cada fila.
          </p>
        </DocCard>

        <DocCard icon={<Type size={24} />} title="Tipos de datos">
          <Lead>
            Cada campo tiene un tipo. Los tipos no son decorativos: deciden si un valor se ordena, se
            suma, se compara en una regla de un Cleaner y se grafica correctamente. Definirlos bien en
            el Flow te ahorra trabajo en cada etapa posterior.
          </Lead>
          <DataTable
            head={["Tipo", "Úsalo para", "Notas"]}
            rows={[
              ["Texto", "Nombres, direcciones, descripciones, códigos de referencia", "La opción segura por defecto."],
              [
                "Número",
                "Totales, cantidades, precios, tasas",
                "Necesario si quieres sumar, comparar o graficar el valor después.",
              ],
              [
                "Fecha",
                "Fechas de emisión, de vencimiento, de entrega",
                <Fragment key="f2">
                  Cambiar a un formato de salida uniforme es trabajo de un{" "}
                  <DocLink href="/es/documentacion/cleaners">Cleaner</DocLink>, no de la extracción.
                </Fragment>,
              ],
              [
                "Mixto / alfanumérico",
                "Valores que combinan letras y dígitos: números de parte, códigos de contenedor, identificaciones fiscales",
                "Úsalo en lugar de Número cuando deban conservarse los ceros a la izquierda o las letras.",
              ],
              [
                "Imagen",
                "Figuras impresas en el documento: fotos, logotipos, firmas, sellos",
                "Se extraen y se guardan de forma segura, y luego se entregan como un enlace temporal.",
              ],
            ]}
          />
          <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Extrae tal como está impreso, normaliza después">
            No uses el tipo para cambiar el formato. Extrae el valor como lo muestra el documento y
            deja que un Cleaner convierta monedas, reescriba fechas y corrija los separadores
            decimales. Una extracción que además transforma es más difícil de depurar cuando un
            número sale mal.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Crosshair size={24} />} title="Pistas de extracción">
          <Lead>
            Las pistas sirven para desambiguar un campo sin escribir una plantilla. Importan sobre
            todo cuando un documento tiene varios valores parecidos: tres fechas, dos totales, un
            número de orden y un número de factura en el mismo encabezado.
          </Lead>
          <p>
            <strong>Para un campo de metadatos</strong> puedes combinar cualquiera de estas:
          </p>
          <DataTable
            head={["Pista", "Qué le dice a la IA", "Ideal para"]}
            rows={[
              [
                "Valores de ejemplo",
                "Valores reales copiados de tus documentos.",
                "Casi todo. Es la pista más valiosa: muestra formato, longitud y forma a la vez.",
              ],
              [
                "Junto a una etiqueta",
                <Fragment key="f3">
                  La etiqueta impresa junto a la que aparece el valor. Lista las variantes:{" "}
                  <em>Invoice Number, Invoice #, Inv No</em>.
                </Fragment>,
                "Campos del encabezado que cada proveedor etiqueta de forma distinta.",
              ],
              [
                "En una zona específica de la página",
                "Una de nueve zonas, desde arriba a la izquierda hasta abajo a la derecha.",
                "Valores que siempre están en la misma esquina, como un número de documento arriba a la derecha.",
              ],
              [
                "Rango esperado",
                "Un mínimo, un máximo o ambos. Se toma como guía, no como regla estricta.",
                "Detectar un punto decimal mal leído: un total de 27,030 cuando debía ser 270.30.",
              ],
              [
                "Pistas adicionales",
                "Texto libre para todo lo que no cubren las opciones anteriores.",
                "Reglas como “usa el monto neto, nunca el bruto”.",
              ],
            ]}
          />
          <p>
            <strong>Para un campo de tabla</strong> las pistas son distintas, porque la IA busca una
            columna y no un punto en la página:
          </p>
          <DataTable
            head={["Pista", "Qué le dice a la IA"]}
            rows={[
              [
                "Tipo de origen",
                "Si los datos están en una tabla real con líneas o en texto libre que solo parece una lista. Elige texto libre cuando no hay una cuadrícula visible.",
              ],
              [
                "Encabezado de columna",
                "El texto del encabezado tal como está impreso. Lista todas las variantes que usan tus proveedores para que un solo campo las reconozca todas.",
              ],
              ["Rango esperado", "Un rango razonable para los números de esa columna."],
              ["Valores de ejemplo", "Valores de celdas reales de tus documentos."],
              [
                "Significado del campo",
                "Lo que realmente representa la columna, cuando el encabezado solo es ambiguo: “precio unitario antes del descuento”.",
              ],
            ]}
          />
          <InfoBox color="green" icon={<Info size={20} />} title="Empieza sin pistas">
            Agrega los campos, procesa un documento real y solo agrega pistas donde el resultado salió
            mal. Poner pistas a todo desde el principio te hace perder tiempo en campos que nunca
            fueron ambiguos, y una pista demasiado específica puede empeorar la extracción al
            descartar un diseño que no anticipaste.
          </InfoBox>
          <p>
            Los valores de ejemplo no se usan en los campos de tipo <strong>fecha</strong> ni{" "}
            <strong>imagen</strong>, así que pon cualquier indicación sobre fechas en el cuadro de
            pistas adicionales.
          </p>
        </DocCard>

        <DocCard icon={<Puzzle size={24} />} title="Campos compuestos">
          <Lead>
            Algunas columnas de tabla contienen varios valores en una sola celda, como un desglose de
            talla y cantidad del tipo <em>S:2 M:5 L:3</em> impreso en un solo recuadro. Un campo
            compuesto divide esa celda en subcampos para que cada parte sea su propio valor, en lugar
            de un texto que tengas que procesar después.
          </Lead>
          <NumberedList
            items={[
              "Agrega un campo de tabla y activa \"Composite Field\".",
              <Fragment key="f4">
                Define los subcampos que forman la celda, por ejemplo{" "}
                <InlineCode>size</InlineCode> como texto y <InlineCode>quantity</InlineCode> como
                número.
              </Fragment>,
              "Agrega valores de ejemplo que muestren cómo aparece la agrupación en tus documentos.",
            ]}
          />
          <p>
            Los subcampos contienen valores individuales, así que pueden ser texto, número, fecha o
            mixto, pero no imágenes. Los campos compuestos solo están disponibles en los campos de
            tabla, porque su objetivo es desglosar una celda que se repite.
          </p>
          <InfoBox color="blue" icon={<Boxes size={20} />} title="Campos de metadatos con varios valores">
            El equivalente en metadatos es <strong>&ldquo;Accept multiple values&rdquo;</strong>.
            Actívalo cuando un solo documento puede tener legítimamente varios elementos del mismo
            tipo, como un conjunto de números de recibo o varias referencias de órdenes de compra, y
            el campo devuelve una lista en lugar de un solo valor.
          </InfoBox>
        </DocCard>

        <DocCard icon={<ImageIcon size={24} />} title="Extraer imágenes">
          <Lead>
            Un campo de tipo imagen extrae una figura del documento en lugar de texto: una foto de
            producto, una firma, un sello, un logotipo. Un campo de metadatos de imagen guarda una
            imagen por documento; un campo de tabla de imagen le da a cada fila la imagen que le
            corresponde.
          </Lead>
          <BulletList
            items={[
              "Las imágenes se guardan de forma privada, así que llegan a las siguientes etapas como enlaces temporales y no como bytes sin procesar",
              "El mismo enlace aparece en el payload del webhook, en la salida por correo y en la celda del CSV",
              "Descarga la imagen pronto en lugar de guardar el enlace, porque vence",
              "Los campos de imagen no pueden ser compuestos y las pistas de valores de ejemplo no aplican a ellos",
            ]}
          />
        </DocCard>

        <DocCard icon={<FilePlus size={24} />} title="Construye el esquema">
          <Lead>
            Crea primero los campos de metadatos, luego los campos de tabla y después las pistas.
            Prueba pronto con un documento real: un esquema que se ve bien en papel y uno que
            funciona con tus documentos reales son cosas distintas.
          </Lead>
          <NumberedList
            items={[
              <Fragment key="f5">
                Crea el Flow. Dale un nombre que describa el documento (
                <em>Facturas de proveedores</em>) y una descripción real: mejora la precisión de la
                extracción y es lo que una{" "}
                <DocLink href="/es/documentacion/collections">Collection</DocLink> usa después para
                encontrar coincidencias.
              </Fragment>,
              <Fragment key="f6">
                Agrega un <strong>campo de metadatos</strong> por cada valor que aparece una vez por
                documento y define el tipo de datos sobre la marcha.
              </Fragment>,
              <Fragment key="f7">
                Agrega un <strong>campo de tabla</strong> por cada columna de la tabla de líneas
                que se repite.
              </Fragment>,
              <Fragment key="f8">
                Agrega <strong>pistas de extracción</strong> solo a los campos que las necesitan.
              </Fragment>,
              <Fragment key="f9">
                Cambia el Flow a <strong>&ldquo;Active&rdquo;</strong>, procesa un documento real y
                compara el resultado con el original.
              </Fragment>,
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Deja que el descubrimiento de campos haga el primer borrador">
            Si subes un documento de muestra durante la configuración, obtienes un conjunto sugerido
            de campos para editar, lo cual es más rápido y normalmente más completo que escribirlos de
            memoria. Tómalo como punto de partida: elimina lo que no vas a usar, porque cada campo
            extra es más que revisar y más que puede salir mal.
          </InfoBox>
          <WarningBox>
            Renombrar un campo cambia la clave en todo lo que lo consume después: el payload del
            webhook, el mapeo de columnas del Bucket, el encabezado del CSV y cualquier{" "}
            <DocLink href="/es/documentacion/cleaners">Cleaner</DocLink> que lo lea. Revisa qué está
            conectado antes de renombrar un campo en un Flow que ya está en uso.
          </WarningBox>
        </DocCard>

        <DocCard icon={<Braces size={24} />} title="Qué puedes asociar a un Flow">
          <Lead>
            El esquema decide qué sale; el resto del Flow decide qué pasa con eso. Cada elemento de
            abajo es independiente: asocia solo lo que necesites, en cualquier orden y en cualquier
            momento.
          </Lead>
          <DataTable
            head={["Etapa", "Elemento", "Qué hace"]}
            rows={[
              [
                "Entradas",
                <Fragment key="f10">
                  <DocLink href="/es/documentacion/integracion-por-correo">Email Trigger</DocLink>
                </Fragment>,
                "Le da al Flow su propia dirección de correo para que los adjuntos reenviados se procesen automáticamente.",
              ],
              [
                "Entradas",
                <Fragment key="f11">
                  <DocLink href="/es/documentacion/collections">Collections</DocLink>
                </Fragment>,
                "Lista las Collections que pueden enviar documentos a este Flow.",
              ],
              [
                "Procesamiento",
                <Fragment key="f12">
                  <DocLink href="/es/documentacion/cleaners">Cleaner</DocLink>
                </Fragment>,
                "Procesa las filas de cada Run: cambia formato, convierte, calcula, busca valores y dispara reglas.",
              ],
              [
                "Procesamiento",
                <Fragment key="f13">
                  <DocLink href="/es/documentacion/agents">Agent</DocLink>
                </Fragment>,
                "Se ejecuta después de la extracción y usa los campos extraídos como entradas.",
              ],
              [
                "Procesamiento",
                "Form Templates",
                "Llena una plantilla PDF con los valores extraídos.",
              ],
              [
                "Salidas",
                <Fragment key="f14">
                  <DocLink href="/es/documentacion/integracion-por-correo">Email Output</DocLink>
                </Fragment>,
                "Envía los resultados por correo a una o más direcciones cuando termina un Run.",
              ],
              [
                "Salidas",
                <Fragment key="f15">
                  <DocLink href="/es/documentacion/webhooks">Webhook</DocLink>
                </Fragment>,
                "Envía los resultados con un POST a tu endpoint. Solo HTTPS.",
              ],
              [
                "Salidas",
                <Fragment key="f16">
                  <DocLink href="/es/documentacion/buckets">Bucket Export</DocLink>
                </Fragment>,
                "Agrega las filas de cada Run a una tabla estructurada, con los campos asignados a columnas.",
              ],
              [
                "Configuración",
                <Fragment key="f17">
                  <DocLink href="/es/documentacion/revision-humana">Human in the Loop</DocLink>
                </Fragment>,
                "Pausa los Runs para que un revisor designado los apruebe antes de entregar nada.",
              ],
              [
                "Configuración",
                "Flow ID",
                <Fragment key="f18">
                  El identificador que envías al llamar a la{" "}
                  <DocLink href="/es/documentacion/api">API</DocLink>.
                </Fragment>,
              ],
            ]}
          />
        </DocCard>

        <DocCard icon={<Play size={24} />} title="Qué pasa cuando se ejecuta un Run">
          <Lead>
            Cada documento se convierte en un Run, y cada Run pasa por la misma secuencia. Conocer el
            orden te dice dónde buscar cuando algo llega tarde, llega mal o no llega.
          </Lead>
          <NumberedList
            items={[
              "El documento se guarda y el Run entra en la cola.",
              "La extracción lo lee y produce valores de metadatos y filas de tabla, con un costo de un crédito por página.",
              "Si hay un Cleaner asociado, procesa esas filas: conversiones, columnas calculadas, búsquedas.",
              "Se disparan las reglas condicionales: se pueden descartar filas, enviar notificaciones o pedir revisión.",
              "Si se requiere revisión, el Run se pausa y no se entrega nada hasta que un revisor lo apruebe.",
              "Las salidas se ejecutan en orden: correo, webhook, exportación a Bucket, llenado de formulario y luego cualquier Agent encadenado.",
            ]}
          />
          <DataTable
            head={["Estado del Run", "Significado"]}
            rows={[
              ["Queued", "Guardado y esperando un worker."],
              ["Processing / running", "En extracción, o reanudándose después de una aprobación."],
              [
                "Awaiting review",
                <Fragment key="f19">
                  En pausa para{" "}
                  <DocLink href="/es/documentacion/revision-humana">revisión humana</DocLink>. Todavía
                  no se ha entregado nada.
                </Fragment>,
              ],
              ["Completed", "La extracción terminó y se ejecutaron todas las salidas configuradas."],
              ["Cancelled", "Un revisor rechazó el Run, así que no se entregó nada."],
              ["Failed", "No se pudo procesar el documento. El registro del Run explica por qué."],
            ]}
          />
          <p>
            Todo lo que hizo un Run queda en su registro, incluidas las salidas que se ejecutaron y lo
            que devolvió cada una. Ese registro es el primer lugar donde buscar antes de suponer que un
            problema de entrega está de tu lado.
          </p>
        </DocCard>

        <DocCard icon={<LifeBuoy size={24} />} title="Mejorar la calidad de la extracción">
          <Lead>
            Cuando un campo sale mal, la solución casi siempre está en la definición de ese campo y no
            en el documento. Revisa estos casos en orden: los dos primeros resuelven la mayoría.
          </Lead>
          <DataTable
            head={["Síntoma", "Causa probable", "Solución"]}
            rows={[
              [
                "Sale el valor equivocado entre varios parecidos",
                "Nada los distingue.",
                "Agrega la etiqueta junto a la que aparece el valor o la zona de la página donde está.",
              ],
              [
                "Un campo sale vacío",
                "El nombre del campo por sí solo no bastó para identificarlo.",
                "Agrega dos o tres valores de ejemplo reales; normalmente basta con eso.",
              ],
              [
                "Solo sale una línea cuando hay muchas",
                "Se definió como campo de metadatos.",
                "Defínelo como campo de tabla.",
              ],
              [
                "El mismo valor se repite en cada fila",
                "Un valor del documento se definió como campo de tabla.",
                "Defínelo como campo de metadatos.",
              ],
              [
                "Números desfasados por un factor de cien",
                "Los separadores decimales y de miles se leyeron al revés.",
                "Define un rango esperado y normaliza el formato en un Cleaner.",
              ],
              [
                "Se pierden ceros a la izquierda o letras",
                "El campo tiene tipo Número.",
                "Cámbialo a Mixto / alfanumérico.",
              ],
              [
                "Se confunden unas columnas con otras",
                "Dos columnas tienen encabezados parecidos.",
                "Agrega el encabezado de columna impreso y el significado del campo.",
              ],
              [
                "Funciona bien con algunos proveedores y mal con otros",
                "Las pistas describen el diseño de un solo proveedor.",
                "Agrega al mismo campo las variantes de etiquetas y encabezados de los demás proveedores.",
              ],
            ]}
          />
          <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Cambia una cosa a la vez">
            Vuelve a procesar el mismo documento después de cada cambio. Si editas cuatro pistas a la
            vez y vuelves a procesar, sabrás que el resultado mejoró, pero no qué cambio lo logró, y
            una de las cuatro pudo haberlo empeorado.
          </InfoBox>
        </DocCard>

        <Related
          links={[
            {
              href: "/es/documentacion/cleaners",
              label: "Normaliza y enriquece lo que extrae un Flow",
              description:
                "Cambia el formato de fechas, convierte monedas, calcula totales y marca las filas que no cumplen una regla.",
            },
            {
              href: "/es/documentacion/collections",
              label: "Envía documentos al Flow correcto de forma automática",
              description:
                "Por qué el nombre y la descripción de un Flow importan más allá de la precisión de la extracción.",
            },
            {
              href: "/es/documentacion/api",
              label: "Dispara un Flow desde tu propio código",
              description:
                "El Flow ID, la autenticación con API key y ejemplos en Python y JavaScript.",
            },
            {
              href: "/es/documentacion/webhooks",
              label: "Mira el payload que produce un Flow",
              description:
                "Cómo aparecen los campos de metadatos y los campos de tabla en el JSON que recibe tu endpoint.",
            },
          ]}
        />
      </section>
    </>
  );
}
