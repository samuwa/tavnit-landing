import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  AlertTriangle,
  Bot,
  CalendarClock,
  Code2,
  Download,
  Gauge,
  HelpCircle,
  Info,
  KeyRound,
  Layers,
  Mail,
  MonitorPlay,
  PlusCircle,
  Send,
  Settings2,
  Terminal,
  Users,
  Workflow,
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
  WarningBox,
} from "@/components/docs/ui";

export const metadata = docMetadata("agents", "es");

export default function Page() {
  return (
    <>
      <DocsPageSchema slug="agents" locale="es" />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
          Agentes
        </h1>

        <DocCard icon={<Bot size={24} />} title="Qué son los Agentes">
          <Lead>
            Un Agente es una automatización de navegador que describes en lenguaje natural en lugar de
            programarla. Le das una misión y una URL de inicio; abre un navegador real en la nube,
            recorre el sitio (navega, llena formularios, hace clic, lee, descarga) y devuelve datos
            que coinciden con el esquema de salida que definiste.
          </Lead>
          <p>
            La diferencia con un scraper está en el mantenimiento. Un scraper es una lista de
            selectores CSS que se rompe cuando rediseñan el sitio. Un Agente lee la página en la que
            está y decide qué hacer, así que un botón que cambió de lugar o un campo con otro nombre no
            requiere cambiar código.
          </p>
          <p>
            Usa un <DocLink href="/es/documentacion/flows">Flow</DocLink> cuando los datos están en un
            documento que recibiste. Usa un Agente cuando los datos viven en un sitio web, o cuando hay
            que hacer algo en un sitio web con datos que ya tienes.
          </p>
          <InfoBox color="blue" icon={<Info size={20} />} title="¿No ves Agentes en tu barra lateral?">
            Los Agentes se habilitan por organización, a pedido. Si la sección no aparece en tu barra
            lateral, contacta a soporte para que la activen en tu organización.
          </InfoBox>
        </DocCard>

        <DocCard icon={<PlusCircle size={24} />} title="Crear un Agente">
          <Lead>
            Los Agentes están en <strong>Agentes</strong>, en la barra lateral. Puedes empezar con un
            Agente en blanco o construirlo a partir de un Flow existente, para que los campos de salida
            del Flow lleguen ya configurados como variables de entrada.
          </Lead>
          <DataTable
            head={["Botón", "Qué obtienes"]}
            rows={[
              [
                <strong key="c0">Crear Agente</strong>,
                "Un Agente en blanco, solo con nombre. Configuras todo en la siguiente pantalla.",
              ],
              [
                <strong key="c1">Nuevo desde Flow</strong>,
                "Eliges un Flow y haces clic en Construir Agente. El nuevo Agente recibe una variable de entrada por cada campo de salida del Flow, cada una configurada para leer ese campo del Run del Flow.",
              ],
            ]}
          />
          <NumberedList
            items={[
              <Fragment key="s0">
                Haz clic en <strong>Crear Agente</strong> (o <strong>Nuevo desde Flow</strong>) y
                ponle nombre al Agente.
              </Fragment>,
              <Fragment key="s1">
                En la pestaña <strong>Configuración</strong> del Agente, escribe la{" "}
                <strong>Misión</strong> y la <strong>URL de inicio</strong>.
              </Fragment>,
              <Fragment key="s2">
                Agrega las <strong>Variables</strong> que necesita la misión y las{" "}
                <strong>Capturas</strong> que quieres de vuelta.
              </Fragment>,
              <Fragment key="s3">
                Haz clic en <strong>Guardar</strong>, luego en <strong>Run de prueba</strong>, y mira
                el Run en vivo.
              </Fragment>,
              <Fragment key="s4">
                Cuando el resultado sea correcto, configura la <strong>Entrega</strong> y activa el
                Agente con el interruptor de la barra superior.
              </Fragment>,
            ]}
          />
          <p>
            Un Agente nuevo empieza como borrador. El interruptor de activación de la barra superior
            controla si se ejecuta según su programación. Al duplicar un Agente se copia su
            configuración, pero no los valores secretos ni la programación, así que una copia nunca se
            pone a ejecutarse sola.
          </p>
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Anatomía de un Agente">
          <Lead>
            Un Agente se configura con cinco piezas: qué hacer, dónde empezar, qué sabe de antemano, qué
            debe traer de vuelta y a dónde va eso.
          </Lead>
          <DataTable
            head={["Parte", "Qué es", "Ejemplo"]}
            rows={[
              [
                "Misión",
                "Una instrucción en lenguaje natural. Escríbela como si le explicaras la tarea a un colega, incluido cómo manejar los casos difíciles.",
                <Fragment key="f0"><em>
                  &ldquo;Inicia sesión con las credenciales proporcionadas, abre Pedidos y registra
                  el precio unitario actual de cada número de parte.&rdquo;
                </em></Fragment>,
              ],
              [
                "Punto de inicio",
                "La URL que el Agente abre primero. Hoy el único tipo de punto de inicio es Web; Escritorio aparece como Próximamente.",
                <Fragment key="f1"><InlineCode>https://portal.acme-supply.com/login</InlineCode></Fragment>,
              ],
              [
                "Variables",
                "Valores a los que la misión puede referirse: valores fijos, secretos o campos tomados del Run de un Flow.",
                <Fragment key="f2"><InlineCode>part_number</InlineCode></Fragment>,
              ],
              [
                "Capturas",
                "El esquema tipado de lo que quieres de vuelta. La respuesta del Agente se valida contra él, así que la salida siempre es estructurada.",
                <Fragment key="f3"><InlineCode>unit_price</InlineCode></Fragment>,
              ],
              [
                "Entrega",
                "A dónde va la salida capturada cuando termina el Run. Puedes activar varias a la vez.",
                "Email, Webhook, Bucket, Subject",
              ],
            ]}
          />
          <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="La misión es el producto">
            Casi todos los Runs decepcionantes de un Agente se deben a una misión vaga. Nombra los
            botones y los títulos de página exactos, di qué hacer cuando una búsqueda no devuelve nada
            y di cuándo detenerse. Una misión que se lee como un procedimiento funciona; una que se lee
            como un deseo, no.
          </InfoBox>
        </DocCard>

        <DocCard icon={<KeyRound size={24} />} title="Variables y secretos">
          <Lead>
            Cada variable tiene un nombre, un tipo (text, number, boolean, date, object o list) y un
            origen. La misión se refiere a las variables por su nombre.
          </Lead>
          <DataTable
            head={["Origen", "De dónde sale el valor"]}
            rows={[
              [
                "Static",
                "Un valor fijo guardado en el Agente: un usuario del portal, un código de bodega. Las llamadas a la API pueden reemplazar los valores estáticos en cada Run.",
              ],
              [
                "From flow run",
                <Fragment key="v0">
                  Un campo de la salida del Run del Flow que disparó al Agente. Si el Flow tiene un{" "}
                  <DocLink href="/es/documentacion/cleaners">Cleaner</DocLink>, el valor se toma de la
                  salida <em>limpia</em>, así que las conversiones y las columnas calculadas ya están
                  aplicadas. Estas variables solo reciben valor cuando un Flow (o un Pipeline) dispara
                  al Agente.
                </Fragment>,
              ],
            ]}
          />
          <p>
            <strong>Variables secretas.</strong> Una variable estática de texto se puede marcar como{" "}
            <strong>Secreto</strong>, por ejemplo para la contraseña de un portal. Su valor se guarda
            cifrado y nunca aparece en la configuración del Agente, en las entradas o salidas del Run
            ni en el registro de pasos.
          </p>
          <BulletList
            items={[
              "Solo Propietarios y Administradores, los únicos que pueden editar un Agente, pueden definir o borrar un secreto",
              "Los secretos deben tener al menos 6 caracteres; una vez guardado, el campo indica que hay un valor sin mostrarlo",
              "El Agente escribe el secreto en la página por su nombre, sin ver nunca el valor",
              "Un secreto solo se puede escribir en el sitio de la URL de inicio (el mismo host o uno de sus subdominios)",
              "Si el valor de un secreto aparece en el texto de la página, se enmascara como *** en los pasos y en la salida",
            ]}
          />
          <WarningBox>
            La vista en vivo y la repetición de sesión muestran lo que la página renderice. El navegador
            solo oculta los campos de tipo contraseña, así que un secreto escrito en un campo de texto
            normal puede verse ahí.
          </WarningBox>
        </DocCard>

        <DocCard icon={<Code2 size={24} />} title="Capturas: el esquema que el Agente debe llenar">
          <Lead>
            Las capturas declaran la forma del resultado. Cada una tiene un nombre, un tipo y una
            descripción opcional, y admiten estructuras anidadas, así que un Agente puede devolver una
            lista de objetos en lugar de un bloque de texto que tengas que procesar después.
          </Lead>
          <DataTable
            head={["Tipo de captura", "Devuelve", "Úsalo para"]}
            rows={[
              ["text", "Un texto", "Nombres, estados, números de referencia, texto libre"],
              ["number", "Un número", "Precios, cantidades, tasas"],
              ["boolean", "Verdadero o falso", "En stock, aprobado, existe"],
              ["date", "Una fecha como texto", "Fechas de entrega, fechas de vencimiento"],
              ["object", "Un grupo anidado de campos", "Un registro con varios atributos"],
              ["list", "Una estructura que se repite", "Una tabla de resultados, una entrada por fila"],
              ["file", "Un archivo descargado", "Facturas, estados de cuenta o reportes que el Agente debe traer"],
            ]}
          />
          <InfoBox color="violet" icon={<Info size={20} />} title="Los resultados parciales se conservan">
            Todas las capturas son opcionales. Si el Agente encuentra cuatro de cinco valores, el Run
            devuelve los cuatro que encontró en lugar de fallar por completo, así conservas el resultado
            parcial y ves exactamente qué falta.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Download size={24} />} title="Descargar archivos">
          <Lead>
            Dale a un Agente una captura de tipo file y podrá traer documentos además de leerlos: un
            estado de cuenta detrás de un inicio de sesión, el PDF de una factura en un portal. Puede
            descargar un archivo desde un enlace, o hacer clic en un botón de descarga y quedarse con el
            archivo que devuelva el sitio.
          </Lead>
          <DataTable
            head={["Límite", "Valor"]}
            rows={[
              ["Archivo individual más grande", "25 MB"],
              ["Total de archivos por Run", "100 MB"],
              ["Dónde quedan los archivos", "Se guardan con el Run; descárgalos desde la página del Run, en Archivos capturados"],
              ["Enlaces en las entregas", "Los payloads de email y webhook llevan un enlace a cada archivo, válido por 7 días"],
            ]}
          />
          <p>
            Superar un límite no detiene el Run: al Agente se le avisa que el archivo era demasiado
            grande y sigue con el resto de la misión. Si un sitio responde a una descarga con una página
            web en lugar de un archivo (una pantalla de inicio de sesión, por ejemplo), el Agente recibe
            ese aviso en vez de guardar la página como si fuera el documento.
          </p>
        </DocCard>

        <DocCard icon={<Mail size={24} />} title="Buzón: códigos que llegan por correo">
          <Lead>
            Algunos portales envían por correo un código de acceso de un solo uso o un enlace de
            confirmación. Conecta un buzón y el Agente podrá esperar ese correo, leer el código o el
            enlace y continuar. Se configura en <strong>Ajustes → Buzón</strong> (el panel{" "}
            <strong>Configuración</strong> del grupo <strong>Ajustes</strong>).
          </Lead>
          <DataTable
            head={["Opción", "Qué hace"]}
            rows={[
              ["Conectar un buzón", "Activa la función para este Agente."],
              ["Remitente a esperar", "Obligatorio. La dirección (o el nombre) de quien envía el código. Se ignora el correo de cualquier otro remitente."],
              ["El asunto contiene (opcional)", "Afina la coincidencia, por ejemplo código."],
              ["Dirección del buzón — desde variable", "La variable de entrada que contiene la dirección del buzón."],
              ["Contraseña de aplicación — desde variable", "La variable de entrada que contiene la contraseña de aplicación del buzón."],
              ["Servidor IMAP / Puerto IMAP", "Por defecto imap.gmail.com y 993. Cámbialos para otros proveedores."],
            ]}
          />
          <BulletList
            items={[
              "El buzón se lee por IMAP en modo de solo lectura; nada se marca como leído ni se modifica",
              "Solo cuenta un mensaje que llegue después de iniciado el Run, gana la coincidencia más reciente y cada mensaje se usa una sola vez",
              "El Agente espera el correo hasta 5 minutos, revisando cada 10 segundos",
              "Si no llega nada, el Agente recibe el aviso y tu misión decide qué hacer (reenviar el código o detenerse)",
              "Para Gmail o Google Workspace, activa la verificación en dos pasos y crea una contraseña de aplicación",
            ]}
          />
          <p>
            Dilo también en la misión: <em>&ldquo;Después de enviar el formulario de acceso, espera el
            correo de verificación e ingresa el código.&rdquo;</em>
          </p>
        </DocCard>

        <DocCard icon={<Workflow size={24} />} title="Encadenar un Flow con un Agente">
          <Lead>
            La configuración más potente es extraer y luego actuar. Un Flow saca campos de un documento
            y el Agente usa esos campos como entradas, así que el documento que recibiste determina lo
            que pasa en el sitio web de otro, sin copiar nada a mano.
          </Lead>
          <NumberedList
            items={[
              <Fragment key="l0">
                En el Agente, agrega variables con el origen <strong>From flow run</strong> y elige el
                campo del Flow que lee cada una (o usa <strong>Nuevo desde Flow</strong> para crearlas
                todas de una vez).
              </Fragment>,
              <Fragment key="l1">
                Abre el Flow y selecciona el panel <strong>Agente</strong> en su barra lateral.
              </Fragment>,
              <Fragment key="l2">
                Haz clic en <strong>Vincular Agente</strong> y elige el Agente.
              </Fragment>,
              "Ejecuta el Flow. Cuando el Run termina, el Agente arranca automáticamente con la salida del Flow como entrada.",
            ]}
          />
          <BulletList
            items={[
              "El Agente recibe la salida limpia cuando el Flow tiene un Cleaner",
              <Fragment key="l3">
                Si el Flow usa <DocLink href="/es/documentacion/revision-humana">Revisión Humana</DocLink>,
                el Agente se ejecuta solo después de que un revisor aprueba, con los datos aprobados; un
                Run rechazado nunca llega al Agente
              </Fragment>,
              "Las entregas y los webhooks de un Run de Agente iniciado por un Flow llevan el ID de ese Run del Flow",
              <Fragment key="l4">
                En un <DocLink href="/es/documentacion/pipelines">Pipeline</DocLink>, un nodo Agente
                hace lo mismo sobre un lienzo, alimentado por un nodo de Flow
              </Fragment>,
            ]}
          />
          <p>
            <strong>Ejemplo.</strong> Llega una orden de compra por{" "}
            <DocLink href="/es/documentacion/integracion-por-correo">correo</DocLink>. El Flow extrae
            el proveedor y los números de parte, y un Cleaner los normaliza. El Agente vinculado entra
            al portal del proveedor, busca las partes, captura el precio unitario vigente y el plazo de
            entrega, y escribe los resultados en un{" "}
            <DocLink href="/es/documentacion/buckets">Bucket</DocLink> junto a lo que decía la orden,
            así la diferencia se ve antes de que alguien la apruebe.
          </p>
        </DocCard>

        <DocCard icon={<Send size={24} />} title="A dónde van los resultados">
          <Lead>
            Un Agente puede entregar cada Run completado a varios destinos a la vez. Activa todas las
            entregas que necesites en la pestaña <strong>Entrega</strong>; se ejecutan de forma
            independiente, así que si una falla las demás siguen. Si no activas ninguna, los resultados
            quedan en la página del Run para verlos o descargarlos.
          </Lead>
          <DataTable
            head={["Entrega", "Qué llega"]}
            rows={[
              [
                "Email",
                "La salida capturada como JSON formateado, a los destinatarios que indiques.",
              ],
              [
                "Webhook",
                <Fragment key="d0">
                  Un POST a tu URL con la salida capturada y las variables de entrada del Run. Consulta{" "}
                  <DocLink href="/es/documentacion/webhooks">webhooks</DocLink>.
                </Fragment>,
              ],
              [
                "Bucket",
                <Fragment key="d1">
                  Una fila por Run en un <DocLink href="/es/documentacion/buckets">Bucket</DocLink>,
                  con las capturas asignadas a columnas (<strong>Asignar capturas → columnas del
                  bucket</strong>).
                </Fragment>,
              ],
              [
                "Subject",
                <Fragment key="d2">
                  Archiva los documentos capturados en casos de un{" "}
                  <DocLink href="/es/documentacion/subjects">Subject</DocLink>: eliges la captura de
                  tipo lista con una fila por caso (o la salida completa como un solo caso), el campo
                  que nombra el caso y un tipo de documento para cada captura de archivo. Volver a
                  ejecutar el Agente nunca crea un caso duplicado; por defecto solo agrega los
                  documentos que le faltan al caso.
                </Fragment>,
              ],
            ]}
          />
          <p>
            Las entregas por Email y Bucket tienen la opción <strong>Incluir las variables de entrada
            en el payload entregado</strong>, que hace que una fila del Bucket se explique sola: qué se
            pidió y qué volvió. El webhook siempre las incluye.
          </p>
          <p>
            <strong>El payload del webhook</strong> lleva <InlineCode>bot_id</InlineCode>,{" "}
            <InlineCode>bot_run_id</InlineCode>, <InlineCode>status</InlineCode>,{" "}
            <InlineCode>inputs</InlineCode> (las variables de entrada resueltas del Run, sin los
            secretos), <InlineCode>output</InlineCode> (las capturas, con un enlace por archivo) y,
            cuando el Run de un Flow disparó al Agente, <InlineCode>flow_run_id</InlineCode>, para
            que tu sistema pueda asociar el resultado al documento del que salió.
          </p>
          <CodeBlock
            lang="JSON"
            code={`{
  "bot_id": "3f2a...",
  "bot_run_id": "9c41...",
  "status": "completed",
  "flow_run_id": "b7e0...",
  "inputs": { "part_number": "AX-2210" },
  "output": { "unit_price": 18.4, "lead_time": "3 weeks" }
}`}
          />
          <p>
            Si una entrega falla, el Run queda como <strong>Completado con advertencias</strong> y su
            página muestra los <strong>Errores de entrega</strong>. Quien creó el Agente recibe además
            una notificación en la app.
          </p>
        </DocCard>

        <DocCard icon={<CalendarClock size={24} />} title="Ejecutar un Agente">
          <Lead>
            Un Agente puede arrancar de cinco maneras. Arranque como arranque, pasa por los mismos
            límites y las mismas entregas.
          </Lead>
          <DataTable
            head={["Disparador", "Cómo"]}
            rows={[
              ["Run de prueba", "El botón Run de prueba del Agente (o Run en la lista de Agentes). Usa las variables estáticas."],
              ["Programación", "Ajustes → Programación, que se describe abajo."],
              ["Flow vinculado", "Cada Run completado de un Flow que tenga este Agente vinculado, como se explicó arriba."],
              [
                "Pipeline",
                <Fragment key="r0">
                  Un nodo Agente en un <DocLink href="/es/documentacion/pipelines">Pipeline</DocLink>.
                </Fragment>,
              ],
              ["API", "Un POST desde tu propio sistema, que se describe abajo."],
            ]}
          />
          <p>
            <strong>Programación.</strong> Activa <strong>Ejecutar de forma programada</strong> y elige
            una frecuencia: <strong>Cada hora</strong>, <strong>Cada día</strong>,{" "}
            <strong>Días hábiles (lun–vie)</strong>, <strong>Cada semana</strong> o{" "}
            <strong>Cron personalizado</strong> (cinco campos: minuto, hora, día del mes, mes, día de la
            semana; por ejemplo <InlineCode>30 8 * * 1-5</InlineCode>). Las horas están en la zona
            horaria de tu organización, y el panel muestra el <strong>Próximo Run</strong>.
          </p>
          <BulletList
            items={[
              "Los Runs programados usan las variables estáticas y los secretos guardados en el Agente",
              "La programación solo se ejecuta mientras el Agente está activo",
              "Los Runs arrancan aproximadamente un minuto después de la hora programada, o más tarde si todos los workers están ocupados",
              "Una ventana perdida no se repite: tras un retraso, el Agente se ejecuta una vez, no una por cada horario perdido",
              "Un Run programado que no puede arrancar (el Run anterior sigue en curso o tu organización no puede iniciar trabajo nuevo en este momento) aparece como un Run fallido que explica el motivo",
              "Las fallas de los Runs programados y por API generan una notificación en la app para quien creó el Agente, ya que nadie está mirando la página del Run",
            ]}
          />
        </DocCard>

        <DocCard icon={<Layers size={24} />} title="Concurrencia: un Run a la vez">
          <Lead>
            Por defecto, los disparadores que se solapan se ejecutan en paralelo. A muchos portales no
            les gustan dos sesiones del mismo usuario a la vez, así que un Agente se puede configurar
            para ejecutar un Run a la vez en <strong>Ajustes → Concurrencia</strong>.
          </Lead>
          <DataTable
            head={["Opción", "Efecto"]}
            rows={[
              [
                "Ejecutar de uno en uno",
                "Mientras un Run está en cola o en ejecución, los nuevos disparadores esperan su turno y arrancan uno tras otro, el más antiguo primero.",
              ],
              [
                "Tiempo mínimo entre Runs (minutos)",
                "De 0 a 1440. Se cuenta desde el final de un Run hasta el inicio del siguiente. Es un mínimo: el siguiente Run también espera un worker libre.",
              ],
            ]}
          />
          <BulletList
            items={[
              "Un Run que espera su turno muestra el estado En espera; no ocupa un worker",
              "Pueden esperar hasta 20 Runs por Agente; a partir de ahí se rechazan los nuevos disparadores (la API responde 429)",
              "Un Run que espera más de 24 horas se marca como fallido",
              "Solo espera un Run programado a la vez, así que un Agente lento con una programación frecuente no acumula Runs",
            ]}
          />
        </DocCard>

        <DocCard icon={<MonitorPlay size={24} />} title="Seguir un Run">
          <Lead>
            Cada Run transmite sus pasos a medida que ocurren, y puedes abrir una vista en vivo de la
            sesión del navegador para verlo trabajar. Los Runs terminados guardan una repetición, así
            ves exactamente qué hizo el Agente en lugar de deducirlo de la salida.
          </Lead>
          <DataTable
            head={["Estado", "Significado"]}
            rows={[
              ["En espera", "En fila detrás de otro Run de un Agente configurado para ejecutar de uno en uno."],
              ["En cola", "Aceptado y esperando un worker."],
              ["En ejecución", "La sesión del navegador está abierta."],
              ["Completado", "Terminado y entregado. Completado con advertencias significa que una entrega falló."],
              ["Fallido", "El Run tuvo un error o alcanzó un límite; la página del Run dice cuál."],
              ["Cancelado", "Alguien detuvo el Run."],
            ]}
          />
          <BulletList
            items={[
              "Pasos: un registro de lo que hizo el Agente, en orden",
              "Salida capturada y Archivos capturados, con descargas",
              "Resumen: duración, llamadas LLM y tokens",
              "Ver sesión en vivo mientras se ejecuta y Ver repetición de sesión después",
              "Identificadores (ID del Run e ID de Sesión) para las solicitudes de soporte",
            ]}
          />
          <p>
            <strong>Cancelar Run</strong> detiene un Run en espera, en cola o en ejecución. La sesión
            del navegador termina en pocos segundos y no se entrega nada.
          </p>
          <InfoBox color="blue" icon={<Info size={20} />} title="Depura con la repetición, no con la salida">
            Cuando un Agente devuelve un valor incorrecto, la repetición suele mostrar el porqué en
            segundos: entró a la cuenta equivocada, o la búsqueda no dio resultados y adivinó. Corrige la
            misión, no el esquema.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Gauge size={24} />} title="Límites">
          <Lead>
            Los Runs tienen topes para que una misión que sale mal no se ejecute para siempre. Hay dos
            límites, ambos configurables por Agente en <strong>Ajustes → Límites</strong>. Deja un campo
            vacío para usar el valor predeterminado.
          </Lead>
          <DataTable
            head={["Límite", "Predeterminado", "Rango", "Qué pasa al alcanzarlo"]}
            rows={[
              ["Duración máxima (minutos)", "10 minutos", "De 1 a 20 minutos", "Se cierra el navegador y el Run se marca como fallido."],
              [
                "Límite de solicitudes LLM",
                "25",
                "De 5 a 500",
                "El Agente se detiene y el Run se marca como fallido. Súbelo para misiones que recorren muchas páginas.",
              ],
            ]}
          />
        </DocCard>

        <DocCard icon={<Terminal size={24} />} title="Disparar desde la API">
          <Lead>
            Tus propios sistemas pueden iniciar un Agente y consultar el resultado con tu API key,
            enviada como <InlineCode>X-API-Key</InlineCode> a{" "}
            <InlineCode>https://run.tavnit.io/api</InlineCode>. El ID del Agente está en su panel{" "}
            <strong>ID del Agente</strong>.
          </Lead>
          <DataTable
            head={["Solicitud", "Qué hace"]}
            rows={[
              [
                <InlineCode key="a0">{"POST /bots/{agent_id}/runs"}</InlineCode>,
                <Fragment key="a1">
                  Inicia un Run. El body opcional <InlineCode>{`{"inputs": {...}}`}</InlineCode>{" "}
                  reemplaza variables estáticas; los secretos no se pueden enviar. Responde 202 con{" "}
                  <InlineCode>bot_run_id</InlineCode> y un estado queued o waiting.
                </Fragment>,
              ],
              [
                <InlineCode key="a2">{"GET /bot-runs/{bot_run_id}"}</InlineCode>,
                "Estado, tiempos, entradas y salida (con enlaces a los archivos).",
              ],
              [
                <InlineCode key="a3">{"GET /bots/{agent_id}/runs"}</InlineCode>,
                "Los Runs del Agente, del más reciente al más antiguo, con filtro por estado.",
              ],
              [
                <InlineCode key="a4">{"POST /bot-runs/{bot_run_id}/cancel"}</InlineCode>,
                "Cancela un Run en espera, en cola o en ejecución.",
              ],
            ]}
          />
          <p>
            Cada llamada a la API inicia un Run nuevo. Un 402 significa que tu organización no puede
            iniciar trabajo nuevo en este momento; contacta al equipo de Tavnit. Para la referencia completa de solicitudes y respuestas, consulta la{" "}
            <DocLink href="/es/documentacion/api">página de la API</DocLink>. Si prefieres no llamar al
            Agente directamente, dispara el Flow vinculado y deja que el Agente lo siga.
          </p>
        </DocCard>

        <DocCard icon={<Users size={24} />} title="Permisos">
          <Lead>
            Solo Propietarios y Administradores pueden crear, editar, duplicar o eliminar un Agente, lo
            que incluye definir secretos. Los Miembros pueden ejecutar Agentes y ver sus Runs. Los
            miembros Solo HITL no tienen acceso a los Agentes.
          </Lead>
          <p>
            Consulta <DocLink href="/es/documentacion/roles-de-usuario">roles de usuario y
            permisos</DocLink> para la matriz completa.
          </p>
        </DocCard>

        <DocCard icon={<HelpCircle size={24} />} title="Solución de problemas">
          <DataTable
            head={["Síntoma", "Causa probable y solución"]}
            rows={[
              [
                "El Run falló con un mensaje de duración",
                "Alcanzó la Duración máxima. Revisa en la repetición dónde se trabó; ajusta la misión, o sube el límite si la tarea de verdad es larga.",
              ],
              [
                "El Run se detuvo a mitad de una lista larga",
                "Se agotó el Límite de solicitudes LLM (25 por defecto). Súbelo en Ajustes → Límites.",
              ],
              [
                "Una variable From flow run está vacía",
                "El Run no lo inició un Flow, o el nombre del campo no existe en la salida (limpia) del Flow.",
              ],
              [
                "Un secreto no se escribió",
                "La página estaba en un sitio distinto al de la URL de inicio, o el secreto nunca se guardó (aparece Sin definir).",
              ],
              [
                "El Agente nunca recibió el código por correo",
                "Revisa el remitente, el filtro opcional de asunto y la contraseña de aplicación; el correo debe llegar después de iniciado el Run.",
              ],
              [
                "Completado con advertencias",
                "Falló una entrega (una URL de webhook incorrecta, un Bucket que no existe). La página del Run lista los errores de entrega.",
              ],
              [
                "El estado se queda En espera",
                "El Agente ejecuta de uno en uno y tiene delante otro Run, o el tiempo mínimo entre Runs.",
              ],
              [
                "Un Run programado aparece como fallido sin haberse ejecutado",
                "El Run anterior seguía en curso o tu organización no podía iniciar trabajo nuevo en ese momento. El mensaje del Run dice cuál.",
              ],
            ]}
          />
        </DocCard>

        <Related
          links={[
            {
              href: "/es/documentacion/cleaners",
              label: "Limpia los datos extraídos antes de que un Agente los use",
              description:
                "Los Agentes leen la salida limpia de un Flow, así que normalizar los valores primero mejora lo que el Agente puede buscar.",
            },
            {
              href: "/es/documentacion/buckets",
              label: "Guarda los resultados de los Agentes en Buckets",
              description: "Asigna capturas a columnas y acumula una fila por Run.",
            },
            {
              href: "/es/documentacion/webhooks",
              label: "Envía la salida de los Agentes a tus sistemas",
              description: "Cómo funcionan las entregas por webhook y qué esperar en tu endpoint.",
            },
            {
              href: "/es/documentacion/pipelines",
              label: "Pon Agentes en un Pipeline",
              description: "Encadena Flows, Agentes y otros pasos sobre un lienzo.",
            },
          ]}
        />
      </section>
    </>
  );
}
