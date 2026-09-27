import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  AlertTriangle,
  Boxes,
  Braces,
  Crosshair,
  FileInput,
  FilePlus,
  HeartPulse,
  History,
  Image as ImageIcon,
  Info,
  LifeBuoy,
  Play,
  Puzzle,
  RotateCcw,
  Sparkles,
  Table2,
  Type,
  Wand2,
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
    "Crea un Flow, define sus campos de metadatos y de tabla, agrega pistas de extracción solo donde hagan falta y pruébalo con un documento real.",
  steps: [
    {
      name: "Crea el Flow y descríbelo",
      text: "En la página \"Flows\", haz clic en \"Crear Flow\" y elige una plantilla, una sugerencia con IA o un Flow desde cero. Ponle un nombre y una descripción de los documentos que procesa; la descripción también ayuda a la IA a extraer con más precisión.",
    },
    {
      name: "Agrega campos de metadatos",
      text: "Agrega un campo por cada valor que aparece una vez por documento, como el número de factura, la fecha de emisión o el proveedor, y define su tipo de dato.",
    },
    {
      name: "Agrega campos de tabla",
      text: "Agrega un campo por cada columna de la tabla repetitiva de líneas, como descripción, cantidad, precio unitario e importe.",
    },
    {
      name: "Agrega pistas de extracción donde hagan falta",
      text: "Agrega pistas solo a los campos que las necesitan: valores de ejemplo reales, la etiqueta junto a la que aparece el valor, la zona de la página donde está o el encabezado de columna impreso.",
    },
    {
      name: "Prueba con un documento real",
      text: "Un Flow nuevo ya está \"Activo\". Haz clic en \"Run\", procesa un documento real, compara el resultado con el original y ajusta las pistas de cualquier campo que haya salido mal.",
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
            objeto de Tavnit que convierte un documento en datos; las Colecciones, los Subjects, los
            Splitters y los Cleaners existen para alimentar o refinar lo que produce un Flow.
          </Lead>
          <p>
            No hay que dibujar plantillas ni mapear coordenadas. Describes los campos en lenguaje
            simple y el Flow funciona con distintos diseños, así que un solo Flow de{" "}
            <em>Facturas de proveedores</em> puede procesar veinte proveedores cuyas facturas no se
            parecen en nada. Por eso mismo, el esquema y sus pistas son donde se gana o se pierde casi
            toda la calidad de la extracción.
          </p>
          <Screenshot
            src="/assets/docs-flow-schema-2026-08.jpg"
            alt="El esquema de datos de un Flow de Tavnit llamado Invoice Processor. Un panel de campos de metadatos lista nueve campos de valor único, como Invoice Number, Due Date y Total, con sus tipos de dato, junto a un panel de campos de tabla con Description, Quantity, Price y Amount. La barra lateral agrupa Runs recientes, disparador por email, Colecciones, Cleaner, Agente, plantillas de formulario, salida por email, webhook, exportación a Bucket, revisión humana e ID del Flow."
            caption="El esquema de datos de un Flow. Campos de metadatos a la izquierda, campos de tabla repetitivos a la derecha y todo lo que puedes asociar al Flow en la barra lateral."
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Solo el esquema es obligatorio">
            Un Flow necesita al menos un campo. Todo lo demás en la barra lateral (Cleaner, Agente,
            webhook, correo, exportación a Bucket, revisión) es opcional y se puede agregar después
            sin reconstruir nada. Los Propietarios y Administradores pueden crear y editar Flows.
          </InfoBox>
        </DocCard>

        <DocCard icon={<FilePlus size={24} />} title="Crea un Flow">
          <Lead>
            Haz clic en <strong>Crear Flow</strong> en la página Flows y Tavnit te pregunta{" "}
            <em>“¿Cómo quieres empezar?”</em>. Los tres caminos terminan en el mismo Flow editable,
            así que elige el que te dé un buen primer borrador más rápido.
          </Lead>
          <DataTable
            head={["Opción", "Qué hace", "Conviene cuando"]}
            rows={[
              [
                "Desde plantilla",
                <Fragment key="c0">
                  Abre una galería con dos pestañas. <strong>Plantillas de Tavnit</strong> son Flows
                  listos, con campos y pistas ya completados; en <strong>Mis Flows</strong> puedes
                  usar <strong>Crear Copia</strong> sobre uno de tus propios Flows activos.
                </Fragment>,
                "Tu documento es de un tipo común o se parece a un Flow que ya tienes.",
              ],
              [
                "Sugerencia con IA",
                "Sube un PDF o una imagen de ejemplo. La IA lo lee, detecta los campos y arma un nombre, una descripción y un esquema con pistas. Desmarca lo que no necesites y edita cualquier campo antes de crear el Flow.",
                "Tu documento es propio de tu negocio y quieres una ventaja inicial.",
              ],
              [
                "Desde cero",
                "Un esquema vacío. Defines cada campo tú mismo.",
                "Sabes exactamente lo que necesitas o estás reconstruyendo un proceso existente.",
              ],
            ]}
          />
          <p>
            Las plantillas de Tavnit cubren facturas, órdenes de compra, recibos, estados de cuenta,
            guías de remisión, resultados de laboratorio, contratos, cotizaciones, notas de crédito,
            documentos de identidad y currículums. Si respondiste las preguntas de bienvenida al
            crear tu organización, las plantillas que coinciden con tus documentos aparecen primero, y
            la página de Flows vacía te ofrece crearlas todas en un clic con{" "}
            <strong>Crear estos flows</strong>.
          </p>
          <p>
            Todos los caminos terminan con un nombre (al menos 3 caracteres) y una descripción (al
            menos 10 caracteres). El Flow se abre en el builder con una guía corta,{" "}
            <em>“Configura tu flow”</em>, y queda <strong>Activo</strong> desde el inicio; usa el
            interruptor de la barra superior para desactivarlo. Un Flow inactivo no se puede
            ejecutar.
          </p>
          <InfoBox color="green" icon={<Info size={20} />} title="La sugerencia con IA es gratis">
            Armar un Flow a partir de un documento de ejemplo no crea un Run ni consume créditos.
            Toma el borrador como punto de partida: elimina lo que no vayas a usar, porque cada campo
            extra es más que revisar y más que puede fallar.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Table2 size={24} />} title="Campos de metadatos y campos de tabla">
          <Lead>
            Cada campo es de uno de dos tipos, según si el valor aparece una vez por documento o una
            vez por línea. Es la decisión con más consecuencias del esquema: define la forma del
            payload de tu webhook, de las filas de tu Bucket, de tu CSV y de tu pantalla de revisión.
          </Lead>
          <DataTable
            head={["", "Campo de metadatos", "Campo de tabla"]}
            rows={[
              ["Aparece", "Una vez por documento", "Una vez por fila de una tabla repetitiva"],
              [
                "En una factura",
                "Número de factura, fecha de emisión, proveedor, total",
                "Descripción, cantidad, precio unitario, importe",
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
                "Una fila de Bucket por cada una",
              ],
            ]}
          />
          <InfoBox color="violet" icon={<Info size={20} />} title="Elegir mal el tipo es el error clásico">
            Si defines una columna de líneas como campo de metadatos, obtienes un solo valor de una
            tabla de veinte. Si defines el total de la factura como campo de tabla, el mismo número se
            repite en cada fila. Si dudas, pregúntate si podría aparecer una segunda copia del valor
            en el mismo documento.
          </InfoBox>
          <p>
            Un Flow con <strong>solo campos de metadatos</strong> (un documento de identidad, un
            certificado, un formulario de una página) devuelve una sola fila por documento con esos
            valores, así que el resultado llega igual a tu vista de tabla, Bucket, webhook y correo,
            como cualquier otro Run.
          </p>
          <p>
            Un Flow también puede agregar <strong>Columnas del Sistema</strong> a cada fila que
            produce: el ID del Flow, el nombre del Flow y el ID del Run. Actívalas cuando varios Flows
            escriben en un mismo <DocLink href="/es/documentacion/buckets">Bucket</DocLink> y
            necesitas saber de qué documento viene cada fila.
          </p>
        </DocCard>

        <DocCard icon={<Type size={24} />} title="Tipos de datos">
          <Lead>
            Cada campo tiene un tipo. Los tipos no son decorativos: deciden si un valor se ordena, se
            suma, se compara en una regla de un Cleaner y se grafica correctamente. Definirlos bien
            en el Flow ahorra trabajo en cada etapa posterior.
          </Lead>
          <p>
            El editor de campos muestra los nombres de los tipos en inglés, así que la tabla los cita
            tal como aparecen en pantalla.
          </p>
          <DataTable
            head={["Tipo", "Úsalo para", "Notas"]}
            rows={[
              [
                "Text",
                "Nombres, direcciones, descripciones, códigos de referencia",
                "La opción segura por defecto.",
              ],
              [
                "Number",
                "Totales, cantidades, precios, tasas",
                "Necesario si luego quieres sumar, comparar o graficar el valor.",
              ],
              [
                "Date",
                "Fechas de emisión, de vencimiento, de entrega",
                <Fragment key="f2">
                  Pasar a un formato de salida uniforme es trabajo de un{" "}
                  <DocLink href="/es/documentacion/cleaners">Cleaner</DocLink>, no de la extracción.
                </Fragment>,
              ],
              [
                "Mixed/Alphanumeric",
                "Valores que mezclan letras y dígitos: números de parte, códigos de contenedor, identificaciones fiscales",
                "Úsalo en lugar de Number cuando los ceros a la izquierda o las letras deben conservarse.",
              ],
              [
                "Image",
                "Figuras impresas en el documento: fotos, logotipos, firmas, sellos",
                "Se extraen y se guardan de forma segura, y se entregan como un enlace temporal.",
              ],
            ]}
          />
          <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Extrae tal como está impreso y normaliza después">
            No uses el tipo para cambiar el formato. Extrae el valor como lo muestra el documento y
            deja que un Cleaner convierta monedas, reescriba fechas y corrija separadores decimales.
            Una extracción que además transforma es más difícil de depurar cuando un número sale mal.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Crosshair size={24} />} title="Pistas de extracción">
          <Lead>
            Las pistas te permiten desambiguar un campo sin escribir una plantilla. Importan sobre
            todo cuando un documento tiene varios valores parecidos: tres fechas, dos totales, un
            número de orden y un número de factura en el mismo encabezado.
          </Lead>
          <p>
            <strong>En un campo de metadatos</strong> puedes combinar cualquiera de estas:
          </p>
          <DataTable
            head={["Pista", "Qué le dice a la IA", "Útil para"]}
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
                "Campos de encabezado que cada proveedor etiqueta distinto.",
              ],
              [
                "En una zona de la página",
                "Una de nueve zonas, de arriba a la izquierda a abajo a la derecha.",
                "Valores que siempre están en la misma esquina, como un número de documento arriba a la derecha.",
              ],
              [
                "Rango esperado",
                "Un mínimo, un máximo o ambos. Funciona como guía, no como regla estricta.",
                "Detectar una coma decimal mal leída: un total de 27,030 cuando era 270.30.",
              ],
              [
                "Pistas adicionales",
                "Texto libre para lo que no cubren las opciones anteriores.",
                "Reglas como “usa el monto neto, nunca el bruto”.",
              ],
            ]}
          />
          <p>
            <strong>En un campo de tabla</strong> las pistas son distintas, porque la IA ubica una
            columna y no un punto de la página:
          </p>
          <DataTable
            head={["Pista", "Qué le dice a la IA"]}
            rows={[
              [
                "Source Type",
                "Table para datos en una tabla real con columnas; Free-form para valores con forma de lista dentro de texto no estructurado, como un contrato.",
              ],
              [
                "Column Headers",
                "El texto del encabezado tal como está impreso. Lista todas las variantes que usan tus proveedores para que un solo campo las reconozca todas.",
              ],
              ["Rango esperado", "Un rango razonable para los números de esa columna."],
              ["Valores de ejemplo", "Valores reales de celdas de tus documentos."],
              [
                "Additional Info",
                "Lo que realmente representa la columna cuando el encabezado solo no basta: “precio unitario antes del descuento”.",
              ],
            ]}
          />
          <InfoBox color="green" icon={<Info size={20} />} title="Empieza sin pistas">
            Agrega los campos, procesa un documento real y agrega pistas solo donde el resultado salió
            mal. Poner pistas a todo desde el inicio consume tiempo en campos que nunca fueron ambiguos,
            y una pista demasiado específica puede empeorar la extracción al descartar un diseño que
            no anticipaste. Cuando el Flow tenga algunos Runs, <strong>Diagnosticar</strong> puede
            proponerte pistas.
          </InfoBox>
          <p>
            Los valores de ejemplo no aplican a los campos <strong>Date</strong> ni{" "}
            <strong>Image</strong>, así que pon cualquier indicación sobre fechas en el cuadro de
            pistas adicionales.
          </p>
        </DocCard>

        <DocCard icon={<Puzzle size={24} />} title="Campos compuestos">
          <Lead>
            Algunas columnas de tabla tienen varios valores en una sola celda, como un desglose de
            tallas y cantidades del tipo <em>S:2 M:5 L:3</em> impreso en un mismo recuadro. Un campo
            compuesto divide esa celda en subcampos, así cada parte queda como un valor propio y no
            como un texto que tengas que procesar después.
          </Lead>
          <NumberedList
            items={[
              "Agrega un campo de tabla y activa Composite Field.",
              <Fragment key="f4">
                Define los subcampos que forman la celda, por ejemplo <InlineCode>size</InlineCode>{" "}
                como texto y <InlineCode>quantity</InlineCode> como número.
              </Fragment>,
              "Agrega valores de ejemplo que muestren cómo aparece la agrupación en tus documentos.",
            ]}
          />
          <p>
            Los subcampos contienen valores individuales, así que pueden ser Text, Number, Date o
            Mixed/Alphanumeric, pero no Image. Los campos compuestos solo existen en los campos de
            tabla, porque su razón de ser es desarmar una celda que se repite.
          </p>
          <InfoBox color="blue" icon={<Boxes size={20} />} title="Campos de metadatos con varios valores">
            El equivalente en metadatos es <strong>Accept multiple values</strong>. Actívalo cuando un
            mismo documento puede tener legítimamente varios elementos del mismo tipo (un conjunto de
            números de recibo, varias referencias de órdenes de compra) y el campo devolverá una
            lista en lugar de un solo valor. No está disponible en campos Image.
          </InfoBox>
        </DocCard>

        <DocCard icon={<ImageIcon size={24} />} title="Extraer imágenes">
          <Lead>
            Un campo Image extrae una figura del documento en lugar de texto: la foto de un producto,
            una firma, un sello, un logotipo. Un campo de imagen de metadatos guarda una imagen por
            documento; un campo de imagen de tabla le da a cada fila la imagen que le corresponde.
          </Lead>
          <BulletList
            items={[
              "Las imágenes se guardan de forma privada, así que llegan como enlaces temporales y no como bytes",
              "El mismo tipo de enlace aparece en el payload del webhook, en la salida por correo y en la celda del CSV; una exportación desde la página del Run genera enlaces nuevos",
              "Los enlaces de las entregas son válidos por siete días: descarga la imagen en lugar de guardar el enlace",
              "Los campos Image no pueden ser compuestos ni aceptar varios valores, y las pistas de valores de ejemplo no aplican",
            ]}
          />
        </DocCard>

        <DocCard icon={<FilePlus size={24} />} title="Construye el esquema">
          <Lead>
            Construye primero los campos de metadatos, luego los de tabla y al final las pistas.
            Prueba pronto con un documento real: un esquema que se ve bien en papel y uno que resiste
            tus documentos reales son cosas distintas.
          </Lead>
          <NumberedList
            items={[
              <Fragment key="f5">
                Haz clic en <strong>Crear Flow</strong> y elige una plantilla, una sugerencia con IA o
                un Flow desde cero. Dale un nombre que describa el documento (
                <em>Facturas de proveedores</em>) y una descripción real: mejora la precisión de la
                extracción y es lo que una{" "}
                <DocLink href="/es/documentacion/colecciones">Colección</DocLink> usa después para
                enrutar.
              </Fragment>,
              <Fragment key="f6">
                En <strong>Campos de Metadatos</strong>, haz clic en <strong>Agregar Campo</strong>{" "}
                por cada valor que aparece una vez por documento y define el tipo de dato a medida que
                avanzas.
              </Fragment>,
              <Fragment key="f7">
                En <strong>Campos de Tabla</strong>, agrega un campo por cada columna de la tabla
                repetitiva de líneas.
              </Fragment>,
              <Fragment key="f8">
                Agrega <strong>pistas de extracción</strong> solo a los campos que las necesitan.
              </Fragment>,
              <Fragment key="f9">
                El Flow ya está <strong>Activo</strong>. Haz clic en <strong>Run</strong>, procesa un
                documento real y compara el resultado con el original.
              </Fragment>,
            ]}
          />
          <p>Arrastra los campos por su asa para cambiar su orden.</p>
          <WarningBox>
            Renombrar un campo cambia la clave en todo lo que lo consume: el payload del webhook, el
            mapeo de columnas del Bucket, el encabezado del CSV y cualquier{" "}
            <DocLink href="/es/documentacion/cleaners">Cleaner</DocLink> que lo lea. Revisa qué está
            conectado antes de renombrar un campo en un Flow que ya está en uso.
          </WarningBox>
        </DocCard>

        <DocCard icon={<FileInput size={24} />} title="Qué archivos lee un Flow">
          <Lead>
            Un Flow acepta PDF, imágenes y hojas de cálculo por cualquier vía: subida, correo y API.
            Tavnit decide cómo leer cada archivo, así que no tienes que configurar nada por formato.
          </Lead>
          <DataTable
            head={["Archivo", "Formatos", "Cómo se lee"]}
            rows={[
              [
                "PDF",
                "PDF",
                "Los PDF digitales se leen directamente. Los PDF escaneados se detectan automáticamente y se leen primero con OCR.",
              ],
              [
                "Imagen",
                "PNG, JPG, JPEG, JFIF",
                "Se leen como una página escaneada. JFIF es la variante de JPEG que algunos navegadores de Windows usan al guardar, y funciona como cualquier JPEG.",
              ],
              [
                "Hoja de cálculo",
                "XLSX, XLS, CSV",
                "Se lee la primera hoja visible. Las demás hojas y las ocultas se ignoran, así que pon los datos que quieres en la primera hoja. Los créditos se cobran según el equivalente en páginas de la hoja.",
              ],
            ]}
          />
          <p>
            Las hojas muy grandes se rechazan con un error claro antes de cobrar créditos. Para
            procesar cada hoja de un libro como un documento propio, envíalo a un{" "}
            <DocLink href="/es/documentacion/splitters">Splitter</DocLink>.
          </p>
          <InfoBox color="blue" icon={<Info size={20} />} title="Escaneo Deficiente: fuerza el OCR en archivos que se extraen mal">
            Los documentos escaneados ya pasan por OCR automáticamente. Algunos archivos parecen
            digitales pero traen una capa de texto dañada: un escaneo con una transcripción incrustada
            de mala calidad, un PDF exportado desde una herramienta rara. Para esos casos, abre{" "}
            <strong>Escaneo Deficiente</strong> en los ajustes del Flow y actívalo: cada archivo del
            Flow se lee primero con OCR y la extracción trabaja sobre el texto recuperado. Si el OCR
            no está disponible o falla, el Run vuelve automáticamente al proceso estándar. Escaneo
            Deficiente no cuesta créditos extra.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Braces size={24} />} title="Qué puedes asociar a un Flow">
          <Lead>
            El esquema decide qué sale; el resto del Flow decide qué pasa con eso. Cada elemento es
            independiente: asocia solo lo que necesites, en cualquier orden y en cualquier momento.
          </Lead>
          <DataTable
            head={["Etapa", "Elemento", "Qué hace"]}
            rows={[
              [
                "Entradas",
                <Fragment key="f10">
                  <DocLink href="/es/documentacion/integracion-por-correo">
                    Disparador por Email
                  </DocLink>
                </Fragment>,
                "Le da al Flow su propia dirección de bandeja para que los documentos reenviados (PDF, imagen u hoja de cálculo) se procesen automáticamente.",
              ],
              [
                "Entradas",
                <Fragment key="f11">
                  <DocLink href="/es/documentacion/colecciones">Colecciones</DocLink>
                </Fragment>,
                "Lista las Colecciones que pueden enviar documentos a este Flow.",
              ],
              [
                "Procesamiento",
                <Fragment key="f12">
                  <DocLink href="/es/documentacion/cleaners">Cleaner</DocLink>
                </Fragment>,
                "Hace una limpieza de las filas de cada Run: cambia formato, convierte, calcula, busca y dispara reglas.",
              ],
              [
                "Procesamiento",
                <Fragment key="f13">
                  <DocLink href="/es/documentacion/agentes">Agente</DocLink>
                </Fragment>,
                "Se ejecuta después de la extracción, con los campos extraídos como entradas.",
              ],
              [
                "Procesamiento",
                "Plantillas de Formulario",
                "Rellena una plantilla PDF con los valores extraídos de un Run.",
              ],
              [
                "Salidas",
                <Fragment key="f14">
                  <DocLink href="/es/documentacion/integracion-por-correo">Salida por Email</DocLink>
                </Fragment>,
                "Envía los resultados por correo a una o más direcciones después de cada Run exitoso, con adjuntos opcionales en JSON, CSV, formularios completados y el documento original.",
              ],
              [
                "Salidas",
                <Fragment key="f15">
                  <DocLink href="/es/documentacion/webhooks">Webhook</DocLink>
                </Fragment>,
                "Envía los resultados por POST a tu endpoint. Solo HTTPS.",
              ],
              [
                "Salidas",
                <Fragment key="f16">
                  <DocLink href="/es/documentacion/buckets">Exportar a Bucket</DocLink>
                </Fragment>,
                "Agrega las filas de cada Run a una tabla estructurada, con los campos mapeados a columnas.",
              ],
              [
                "Ajustes",
                <Fragment key="f17">
                  <DocLink href="/es/documentacion/revision-humana">Revisión Humana</DocLink>
                </Fragment>,
                "Pausa los Runs para que un revisor los apruebe antes de entregar nada.",
              ],
              [
                "Ajustes",
                "Escaneo Deficiente",
                "Fuerza el OCR en todos los archivos del Flow (ver arriba).",
              ],
              [
                "Ajustes",
                "ID del Flow",
                <Fragment key="f18">
                  El identificador que envías al llamar a la{" "}
                  <DocLink href="/es/documentacion/api">API</DocLink>.
                </Fragment>,
              ],
            ]}
          />
          <p>
            <strong>Opciones del Disparador por Email.</strong> Con el disparador activado, el panel
            muestra la dirección de bandeja del Flow y dos ajustes.{" "}
            <strong>Remitentes Permitidos</strong> limita quién puede iniciar un Run por correo; deja
            la lista vacía para aceptar cualquier remitente.{" "}
            <strong>Procesar Cuerpo del Correo</strong> también extrae del texto del mensaje, ya sea{" "}
            <em>Solo cuando no hay adjuntos</em> (la opción por defecto, para que una nota de
            presentación nunca inicie un segundo Run) o <em>Siempre</em>. La dirección del remitente
            queda registrada en cada Run y se muestra en la página Runs.{" "}
            <DocLink href="/es/documentacion/integracion-por-correo">Integración por correo</DocLink>{" "}
            explica los detalles.
          </p>
        </DocCard>

        <DocCard icon={<HeartPulse size={24} />} title="Diagnostica un Flow">
          <Lead>
            Cuando un Flow ya procesó algunos documentos, el botón <strong>Diagnosticar</strong> de la
            barra superior del Flow abre el <strong>Doctor del flow</strong>. Estudia tus Runs
            completados recientes, encuentra los campos que salen vacíos o con el tipo equivocado una
            y otra vez, y propone correcciones.
          </Lead>
          <NumberedList
            items={[
              <Fragment key="d0">
                Abre el Flow y haz clic en <strong>Diagnosticar</strong>. El botón aparece para
                Propietarios y Administradores cuando el Flow tiene al menos un campo.
              </Fragment>,
              "Tavnit lee los Runs recientes, vuelve a leer algunos de los documentos donde fallaron campos y redacta correcciones. Tarda unos momentos.",
              <Fragment key="d1">
                Revisa el resultado. Cada campo con problemas muestra con qué frecuencia salió vacío o
                con el tipo incorrecto, con su pista en dos versiones, <strong>Actual</strong> y{" "}
                <strong>Propuesto</strong>. También puede ofrecerte una{" "}
                <strong>Descripción sugerida</strong>.
              </Fragment>,
              <Fragment key="d2">
                Conserva o edita las correcciones con las que estés de acuerdo y haz clic en{" "}
                <strong>Aplicar</strong>. Nada cambia hasta que aplicas; si cierras el panel, las
                propuestas se descartan.
              </Fragment>,
            ]}
          />
          <p>
            Si todo está bien, verás <em>“La extracción se ve saludable”</em>. Diagnosticar es gratis
            y solo se ejecuta cuando haces clic. Después de aplicar correcciones, vuelve a procesar un
            documento real para confirmar que ayudaron.
          </p>
        </DocCard>

        <div id="runs" className="scroll-mt-24">
          <DocCard icon={<Play size={24} />} title="Runs: qué pasa cuando se procesa un documento">
            <Lead>
              Cada documento se convierte en un Run, y cada Run sigue la misma secuencia. Conocer el
              orden te dice dónde buscar cuando algo llega tarde, llega mal o no llega.
            </Lead>
            <NumberedList
              items={[
                "El documento se guarda y el Run queda en cola.",
                "La extracción lo lee y produce valores de metadatos y filas de tabla, a un crédito por página.",
                "Si hay un Cleaner asociado, hace la limpieza de esas filas: conversiones, columnas calculadas, búsquedas.",
                "Se disparan las reglas condicionales: se pueden descartar filas, enviar notificaciones o pedir revisión.",
                "Si se requiere revisión, el Run se pausa y no se entrega nada hasta que un revisor lo apruebe.",
                "Se ejecutan las salidas: correo, exportación a Bucket y webhook. Luego el Run se marca como completado y, si hay un Agente asociado, arranca.",
              ]}
            />
            <DataTable
              head={["Estado del Run", "Significado"]}
              rows={[
                ["Pendiente (en cola)", "Guardado y esperando un worker."],
                [
                  "Procesando",
                  "Se está extrayendo, limpiando o entregando. La página del Run muestra la etapa actual.",
                ],
                [
                  "Reintentando",
                  "Un intento anterior falló por un motivo temporal y el Run se volvió a encolar automáticamente (ver más abajo).",
                ],
                [
                  "Esperando revisión HITL",
                  <Fragment key="f19">
                    En pausa para{" "}
                    <DocLink href="/es/documentacion/revision-humana">revisión humana</DocLink>.
                    Todavía no se entregó nada.
                  </Fragment>,
                ],
                ["Completado", "La extracción terminó y se ejecutaron todas las salidas configuradas."],
                [
                  "Cancelado",
                  "Alguien canceló el Run mientras estaba en cola o procesándose, o un revisor lo rechazó. No se entrega nada más.",
                ],
                ["Fallido", "El documento no se pudo procesar. El registro del Run explica por qué."],
              ]}
            />
          </DocCard>
        </div>

        <DocCard icon={<History size={24} />} title="Trabajar con Runs">
          <Lead>
            La página <strong>Runs</strong> lista todos los Runs de tu organización; cada Flow también
            tiene su pestaña <strong>Runs Recientes</strong>. Usa <strong>Filtrar</strong> para
            acotar por estado, rango de fechas, Flow, usuario, origen o un ID de Run pegado.
          </Lead>
          <DataTable
            head={["Acción", "Dónde", "Notas"]}
            rows={[
              [
                "Ver Detalles",
                "Menú de acciones del Run, o clic en la fila",
                "Los datos extraídos junto al archivo original, la información del Run y el registro del procesamiento.",
              ],
              [
                "Descargar CSV",
                "Menú de acciones del Run",
                "Solo Runs completados. En la página del Run también están Exportar CSV y Exportar JSON.",
              ],
              [
                "Descargar Archivo",
                "Menú de acciones del Run, o Descargar en la página del Run",
                "El archivo original. Las hojas de cálculo no tienen vista previa, así que descárgalas para verlas.",
              ],
              [
                "Cancelar Run",
                "Menú de acciones del Run",
                "Solo para Runs en cola o en ejecución. Los créditos ya usados no se reembolsan.",
              ],
            ]}
          />
          <p>
            La columna <strong>Iniciado Por</strong> muestra quién inició el Run: el usuario en una
            subida, o la dirección del remitente en un Run que llegó por correo. La columna{" "}
            <strong>Origen</strong> indica cómo llegó: carga manual, API, correo, etc.
          </p>
        </DocCard>

        <DocCard icon={<RotateCcw size={24} />} title="Runs fallidos y reintentos automáticos">
          <Lead>
            La mayoría de los fallos son culpa del documento (un archivo ilegible, un tipo no
            soportado, falta de créditos) y reintentar no ayudaría. Algunos no: un worker de
            procesamiento se reinicia a mitad del Run o un proveedor de IA tiene una caída temporal.
            Para esos casos, una organización puede hacer que Tavnit reintente por su cuenta.
          </Lead>
          <NumberedList
            items={[
              <Fragment key="r0">
                Ve a <strong>Configuración</strong> → <strong>Organización</strong> →{" "}
                <strong>Runs fallidos</strong>. Solo el Propietario ve esta pestaña.
              </Fragment>,
              <Fragment key="r1">
                Activa <strong>Reintentar automáticamente los runs fallidos</strong>.
              </Fragment>,
              <Fragment key="r2">
                Define <strong>Reintentos máximos por run</strong> en 1, 2 o 3.
              </Fragment>,
            ]}
          />
          <BulletList
            items={[
              "Un Run reintentado conserva el mismo ID, así que las consultas a la API, los webhooks y los enlaces siguen funcionando.",
              "Los créditos se cobran una sola vez por Run, sin importar cuántos intentos haga falta.",
              "Las salidas solo se disparan cuando un Run se completa, así que un reintento nunca entrega un documento dos veces.",
              "Nunca se reintentan: archivos inválidos, tipos no soportados, falta de créditos, Runs cancelados, Runs en pausa para revisión y Runs creados hace más de un día.",
              "Un Run que se pierde por el reinicio de un worker se detecta automáticamente. Con el reintento automático activado vuelve a la cola; con él desactivado, se marca como Fallido.",
              "La página del Run lista los Intentos anteriores, cada uno marcado como Worker perdido o Falló con su error, y la lista de Runs muestra una insignia de reintento.",
            ]}
          />
          <p>
            Para enterarte de los Runs que terminan fallando, agrega direcciones en{" "}
            <strong>Notificaciones de Fallo de Run</strong>, en la misma pestaña.
          </p>
        </DocCard>

        <DocCard icon={<LifeBuoy size={24} />} title="Mejorar la calidad de la extracción">
          <Lead>
            Cuando un campo sale mal, la solución casi siempre está en la definición del campo y no en
            el documento. Si el Flow ya tiene Runs, empieza con <strong>Diagnosticar</strong>; luego
            revisa estos casos en orden: los dos primeros resuelven la mayoría.
          </Lead>
          <DataTable
            head={["Síntoma", "Causa probable", "Solución"]}
            rows={[
              [
                "Sale el valor equivocado entre varios parecidos",
                "Nada los distingue.",
                "Agrega la etiqueta junto a la que aparece el valor, o la zona de la página donde está.",
              ],
              [
                "Un campo sale vacío",
                "El nombre del campo no bastó para identificarlo.",
                "Agrega dos o tres valores de ejemplo reales; suele ser suficiente.",
              ],
              [
                "Solo una línea cuando hay muchas",
                "Se definió como campo de metadatos.",
                "Defínelo como campo de tabla.",
              ],
              [
                "El mismo valor repetido en cada fila",
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
                "El campo tiene tipo Number.",
                "Cámbialo a Mixed/Alphanumeric.",
              ],
              [
                "Se confunden columnas entre sí",
                "Dos columnas tienen encabezados parecidos.",
                "Agrega los encabezados impresos en Column Headers y describe la columna en Additional Info.",
              ],
              [
                "Bien con algunos proveedores, mal con otros",
                "Las pistas describen el diseño de un solo proveedor.",
                "Agrega al mismo campo las variantes de etiqueta y encabezado de los otros proveedores.",
              ],
              [
                "Texto ilegible de un archivo que parece digital",
                "La capa de texto incrustada del PDF está dañada.",
                "Activa Escaneo Deficiente para que el Flow lo lea con OCR.",
              ],
              [
                "Una hoja de cálculo sale vacía o incompleta",
                "Los datos no están en la primera hoja visible.",
                "Muévelos a la primera hoja, o usa un Splitter para libros con varias hojas.",
              ],
            ]}
          />
          <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Cambia una cosa a la vez">
            Vuelve a procesar el mismo documento después de cada cambio. Si editas cuatro pistas a la
            vez, sabrás que el resultado mejoró pero no cuál cambio lo logró, y alguno de los cuatro
            pudo haberlo empeorado.
          </InfoBox>
          <InfoBox color="blue" icon={<Wand2 size={20} />} title="Corrige los datos, no la extracción">
            Si el valor es correcto pero el formato no (fechas, monedas, unidades, mayúsculas), deja
            el Flow como está y agrega un{" "}
            <DocLink href="/es/documentacion/cleaners">Cleaner</DocLink>.
          </InfoBox>
        </DocCard>

        <Related
          links={[
            {
              href: "/es/documentacion/cleaners",
              label: "Normaliza y enriquece lo que extrae un Flow",
              description:
                "Cambia el formato de fechas, convierte monedas, calcula totales y marca filas que rompen una regla.",
            },
            {
              href: "/es/documentacion/integracion-por-correo",
              label: "Envía documentos a un Flow por correo",
              description:
                "La dirección de bandeja, los remitentes permitidos, el procesamiento del cuerpo del correo y la salida por email.",
            },
            {
              href: "/es/documentacion/colecciones",
              label: "Envía documentos al Flow correcto automáticamente",
              description:
                "Por qué el nombre y la descripción de un Flow importan más allá de la precisión de la extracción.",
            },
            {
              href: "/es/documentacion/api",
              label: "Ejecuta un Flow desde tu propio código",
              description:
                "El ID del Flow, la autenticación con API key y ejemplos en Python y JavaScript.",
            },
            {
              href: "/es/documentacion/webhooks",
              label: "Mira el payload que produce un Flow",
              description:
                "Cómo aparecen los campos de metadatos y de tabla en el JSON que recibe tu endpoint.",
            },
            {
              href: "/es/documentacion/creditos",
              label: "Entiende cuánto cuestan los Runs",
              description:
                "Los créditos por página de la extracción y las tarifas de cada una de las demás funciones.",
            },
          ]}
        />
      </section>
    </>
  );
}
