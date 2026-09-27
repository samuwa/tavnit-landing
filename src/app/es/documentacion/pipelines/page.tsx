import { Fragment } from "react";
import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import {
  AlertTriangle,
  Code2,
  FlaskConical,
  GitBranch,
  HelpCircle,
  Info,
  Lock,
  Network,
  PlayCircle,
  Route,
  Send,
  Settings,
  Sparkles,
  Upload,
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
} from "@/components/docs/ui";

export const metadata = docMetadata("pipelines", "es");

const EXECUTE_CURL = `curl -X POST https://run.tavnit.io/api/pipelines/PIPELINE_ID/execute \\
  -H "X-API-Key: $TAVNIT_API_KEY" \\
  -F "file=@document.pdf"`;

const EXECUTE_RESPONSE = `{
  "success": true,
  "execution_id": "…",
  "pipeline_id": "…",
  "org_id": "…",
  "status": "running"
}`;

const CANCEL_CURL = `curl -X POST https://run.tavnit.io/api/pipelines/executions/EXECUTION_ID/cancel \\
  -H "X-API-Key: $TAVNIT_API_KEY"`;

const OUTPUT_PAYLOAD = `{
  "pipeline_id": "…",
  "execution_id": "…",
  "pipeline_name": "Entrada de facturas",
  "original_filename": "document.pdf",
  "outputs": [
    {
      "node": "Facturas",
      "node_type": "flow",
      "output": { "invoice_number": "…", "total": 1250.5 }
    }
  ]
}`;

export default function Page() {
  return (
    <>
      <DocsPageSchema slug="pipelines" locale="es" />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
          Pipelines
        </h1>

        <DocCard icon={<Route size={24} />} title="¿Qué es un Pipeline?">
          <Lead>
            Un Pipeline encadena las funciones que ya configuraste (Splitters, Colecciones, Flows,
            Agentes, Matchers, Inspectores, Fillers y Buckets) en un solo proceso de punta a punta
            que dibujas en un lienzo. Envías un documento; el Pipeline lo lleva por cada paso y
            entrega el resultado donde tú quieras.
          </Lead>
          <p>
            Cada nodo del lienzo apunta a una función que ya existe. El Pipeline no copia su
            configuración: cuando mejoras los campos de un Flow o las verificaciones de un Inspector,
            todos los Pipelines que lo usan toman el cambio. Lo que el Pipeline agrega es el{" "}
            <em>orden</em>: qué paso recibe el documento, qué ejecuciones siguen y a dónde va el
            resultado.
          </p>
          <InfoBox color="violet" icon={<FlaskConical size={20} />} title="Beta">
            Los Pipelines están en beta. Están disponibles para todas las organizaciones, y el lienzo
            y sus tipos de nodo todavía pueden cambiar.
          </InfoBox>
          <InfoBox color="blue" icon={<Network size={20} />} title="Pipelines vs. Mapa de Pipeline">
            El Mapa de Pipeline es una imagen de solo lectura de las conexiones configuradas en las
            propias funciones (la exportación a Bucket de un Flow, los Flows de una Colección, los
            tipos de documento de un Splitter). Un Pipeline es un grafo que construyes y ejecutas a
            propósito, con su propia entrada, ejecuciones y salidas.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Info size={24} />} title="Cuándo usar un Pipeline">
          <BulletList
            items={[
              "Hay que dividir un paquete, extraer cada documento con su propio Flow y revisar los resultados en conjunto",
              "Los datos extraídos deben pasar a un Agente, a una comparación de un Matcher o al checklist de un Inspector sin que nadie haga clic",
              "Quieres una sola dirección de correo o una sola llamada a la API que ejecute todo el proceso, no una por función",
              "El resultado debe llegar a Slack, Teams, Google Chat, una plataforma de automatización o un buzón como paso final",
            ]}
          />
          <p>
            Si un solo Flow con su propio webhook, correo o exportación a Bucket ya resuelve el
            trabajo, no necesitas un Pipeline. Las funciones siguen funcionando por su cuenta.
          </p>
        </DocCard>

        <DocCard icon={<Workflow size={24} />} title="Tipos de nodo">
          <Lead>
            Todo lienzo empieza con un nodo de <strong>Entrada</strong>. Los demás se agregan desde{" "}
            <strong>&ldquo;Agregar nodo&rdquo;</strong>, que los agrupa según la etapa que cumplen:
            &ldquo;Recibir y enrutar&rdquo;, &ldquo;Extraer&rdquo;, &ldquo;Procesar y
            verificar&rdquo; y &ldquo;Entregar&rdquo;.
          </Lead>
          <DataTable
            head={["Nodo", "Qué hace", "Puede conectarse a"]}
            rows={[
              ["Entrada", "Cada ejecución empieza aquí con el documento subido.", "Splitter, Colección, Flow"],
              [
                <Fragment key="n1">
                  <DocLink href="/es/documentacion/splitters">Splitter</DocLink>
                </Fragment>,
                "Divide un paquete en sus documentos y envía cada uno.",
                "Flow, Splitter, Colección",
              ],
              [
                <Fragment key="n2">
                  <DocLink href="/es/documentacion/colecciones">Colección</DocLink>
                </Fragment>,
                "Enruta un documento desconocido al Flow correcto.",
                "Flow, Salida",
              ],
              [
                <Fragment key="n3">
                  <DocLink href="/es/documentacion/flows">Flow</DocLink>
                </Fragment>,
                "Extrae campos estructurados de un documento.",
                "Agente, Escritura a bucket, Salida, Matcher, Inspector, Filler",
              ],
              [
                <Fragment key="n4">
                  <DocLink href="/es/documentacion/agentes">Agente</DocLink>
                </Fragment>,
                "Actúa sobre los datos extraídos en un navegador.",
                "Agente, Escritura a bucket, Salida",
              ],
              [
                <Fragment key="n5">
                  <DocLink href="/es/documentacion/matchers">Matcher</DocLink>
                </Fragment>,
                "Compara un run contra los anteriores.",
                "Agente, Escritura a bucket, Salida",
              ],
              [
                <Fragment key="n6">
                  <DocLink href="/es/documentacion/inspectores">Inspector</DocLink>
                </Fragment>,
                "Ejecuta un checklist sobre uno o más runs.",
                "Agente, Escritura a bucket, Salida",
              ],
              [
                <Fragment key="n7">
                  <DocLink href="/es/documentacion/fillers">Filler</DocLink>
                </Fragment>,
                "Rellena una plantilla con datos de los runs.",
                "Salida",
              ],
              [
                <Fragment key="n8">
                  Escritura a bucket (<DocLink href="/es/documentacion/buckets">Buckets</DocLink>)
                </Fragment>,
                "Guarda las filas extraídas en un Bucket, con el mapeo de campos que defines en el nodo.",
                "Nada (fin de una rama)",
              ],
              ["Salida", "Envía el resultado a email, Slack, Teams, Google Chat, Zapier, Make, n8n o un webhook.", "Nada (fin de una rama)"],
            ]}
          />
          <p>
            Cuando hay un nodo seleccionado, <strong>&ldquo;Agregar nodo&rdquo;</strong> atenúa los
            tipos que no pueden ir después de él y conecta el nuevo nodo automáticamente. Al elegir
            un Flow también se sugieren los Matchers, Inspectores y Fillers cuyas entradas ya esperan
            runs de ese Flow (&ldquo;Conectados a este flow&rdquo;), que se agregan ya conectados. Los
            nodos de Agente requieren los{" "}
            <DocLink href="/es/documentacion/agentes">Agentes</DocLink>, que se activan por
            organización a solicitud.
          </p>
          <InfoBox color="blue" icon={<GitBranch size={20} />} title="Puertos y ranuras">
            Una conexión que sale de un Splitter pregunta qué tipo de documento viaja por ella (o
            &ldquo;Cualquier documento&rdquo;). Una conexión que entra a un Inspector o a un Filler
            pregunta qué ranura de entrada recibe el run. Un Matcher en modo de referencia necesita
            que una de sus entradas sea la <strong>&ldquo;Entrada de referencia&rdquo;</strong>, y
            solo acepta runs de su propio Flow.
          </InfoBox>
        </DocCard>

        <DocCard icon={<GitBranch size={24} />} title="Construir un Pipeline">
          <NumberedList
            items={[
              <Fragment key="s1">
                Abre <strong>&ldquo;Pipelines&rdquo;</strong> en la barra lateral y haz clic en{" "}
                <strong>&ldquo;Nuevo Pipeline&rdquo;</strong>. Ponle un nombre y, si quieres, una
                descripción.
              </Fragment>,
              "El lienzo se abre con su nodo de Entrada. Selecciónalo y elige cómo llegan los documentos (ver Fuentes más abajo).",
              <Fragment key="s3">
                Haz clic en <strong>&ldquo;Agregar nodo&rdquo;</strong>, elige un paso y luego cuál
                de tus funciones usar. O arrastra desde el punto a la derecha de un nodo hasta otro
                nodo para conectarlos.
              </Fragment>,
              "Selecciona un nodo para abrir su panel: su función vinculada, de qué recibe y a qué envía, y sus ajustes (el mapeo de campos de la Escritura a bucket, el destino de la Salida, la entrada de referencia del Matcher).",
              <Fragment key="s5">
                Corrige lo que aparezca en <strong>&ldquo;Corrige esto antes de ejecutar&rdquo;</strong>{" "}
                hasta que el indicador diga <strong>&ldquo;Listo para ejecutar&rdquo;</strong>, y
                haz clic en <strong>&ldquo;Guardar&rdquo;</strong>.
              </Fragment>,
              <Fragment key="s6">
                Haz clic en <strong>&ldquo;Ejecutar pipeline&rdquo;</strong> y sube un documento para
                probarlo.
              </Fragment>,
            ]}
          />
          <p>
            El lienzo tiene <strong>&ldquo;Ordenar&rdquo;</strong> (acomodo automático), deshacer y{" "}
            <strong>&ldquo;Rehacer&rdquo;</strong>, <strong>&ldquo;Duplicar&rdquo;</strong>, selección
            múltiple con Mayús + clic y Mayús + arrastre, y un minimapa{" "}
            <strong>&ldquo;Vista general&rdquo;</strong> en grafos grandes. Haz scroll para desplazarte,
            ⌘ + scroll para hacer zoom, y Supr elimina la selección. Los cambios sin guardar se
            conservan en tu navegador y se recuperan si vuelves.
          </p>
          <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Las ejecuciones usan el pipeline guardado">
            Las ejecuciones siempre corren la última versión guardada del grafo. Si tienes cambios sin
            guardar, guárdalos antes de hacer clic en &ldquo;Ejecutar pipeline&rdquo;. Cada ejecución
            conserva una copia congelada del grafo con el que empezó, así que las ediciones
            posteriores nunca cambian una ejecución en curso.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Sparkles size={24} />} title="Diseñar un Pipeline con IA">
          <Lead>
            En lugar de colocar nodos a mano, haz clic en{" "}
            <strong>&ldquo;Diseñar con IA&rdquo;</strong> en el lienzo y describe el proceso en una
            frase, por ejemplo: &ldquo;Cuando lleguen facturas: extráelas con el flow de Facturas,
            corre el checklist de control y guarda las filas en el bucket Facturas DB.&rdquo;
          </Lead>
          <BulletList
            items={[
              "El asistente lee las funciones que ya tiene tu organización, diseña el grafo y valida las conexiones, y luego coloca el borrador en el lienzo.",
              <Fragment key="a2">
                Si un paso necesita una función que aún no tienes (un Flow, Splitter, Inspector o
                Bucket), el nodo se marca como <strong>&ldquo;Nuevo&rdquo;</strong> y su panel muestra
                qué se creará. <strong>&ldquo;Crear esta función&rdquo;</strong> (o &ldquo;Crear N
                funciones&rdquo;) las crea de verdad; revísalas y guarda.
              </Fragment>,
              <Fragment key="a3">
                <strong>&ldquo;Conservar&rdquo;</strong> acepta el borrador;{" "}
                <strong>&ldquo;Descartar&rdquo;</strong> deja el lienzo como estaba antes. Un borrador
                reemplaza todos los nodos y conexiones del lienzo, así que se te pregunta primero si
                ya hay uno.
              </Fragment>,
            ]}
          />
          <p>Diseñar con IA no ejecuta nada.</p>
        </DocCard>

        <DocCard icon={<Upload size={24} />} title="Fuentes: cómo entran los documentos">
          <p>Selecciona el nodo de Entrada para ver sus tres fuentes.</p>
          <DataTable
            head={["Fuente", "Cómo funciona"]}
            rows={[
              [
                "Subida manual",
                "Siempre activa. “Ejecutar pipeline” acepta un PDF o una imagen (PNG, JPG, JPEG, JFIF) por ejecución.",
              ],
              [
                "Correo",
                <Fragment key="e1">
                  Actívala para obtener una dirección de entrada con la forma{" "}
                  <InlineCode>{"<pipeline-id>-pipeline@mg.tavnit.io"}</InlineCode>. Cada adjunto
                  inicia su propia ejecución. Puedes restringir qué remitentes se aceptan. Consulta{" "}
                  <DocLink href="/es/documentacion/integracion-por-correo">Integración por correo</DocLink>.
                </Fragment>,
              ],
              [
                "API",
                <Fragment key="e2">
                  Siempre activa. Envía el documento por POST con tu API key; el panel tiene un
                  snippet listo para copiar. Consulta <DocLink href="#api">API</DocLink> más abajo.
                </Fragment>,
              ],
            ]}
          />
          <p>
            El disparador por correo, el <strong>&ldquo;ID del pipeline&rdquo;</strong> y el interruptor{" "}
            <strong>&ldquo;Activo&rdquo;</strong> también están en la pestaña{" "}
            <strong>&ldquo;Configuración&rdquo;</strong>. Los pipelines inactivos rechazan nuevas
            ejecuciones desde cualquier fuente.
          </p>
        </DocCard>

        <DocCard icon={<Send size={24} />} title="Salidas: a dónde va el resultado">
          <Lead>
            Un nodo de <strong>Salida</strong> envía todo lo que produjeron los pasos anteriores.
            Elige un destino en el panel del nodo:
          </Lead>
          <DataTable
            head={["Destino", "Qué ingresas", "Qué llega"]}
            rows={[
              ["Email", "“Correos destinatarios”", "Un correo con el asunto “Pipeline output: <nombre>” y el resultado en JSON."],
              ["Slack", "Una URL de Incoming Webhooks del canal", "Un mensaje con el documento y sus campos clave."],
              ["Teams", "La URL de un Workflow de Teams que publique en un canal al recibir una solicitud de webhook", "Una Adaptive Card con los campos clave."],
              ["Google Chat", "Una URL de webhook entrante de los ajustes del espacio", "Una tarjeta con los campos clave."],
              ["Webhook, Zapier, Make, n8n", "La URL del webhook de tu endpoint o escenario", "El payload JSON de abajo."],
            ]}
          />
          <CodeBlock lang="JSON — payload de la Salida" code={OUTPUT_PAYLOAD} />
          <p>
            El panel muestra un <strong>&ldquo;Payload de ejemplo&rdquo;</strong> construido con los
            campos del Flow anterior; el real lleva los valores extraídos. Los archivos del resultado
            llegan como enlaces temporales. Los destinos de chat muestran hasta ocho campos clave del
            primer resultado anterior.
          </p>
          <InfoBox color="green" icon={<Info size={20} />} title="Aviso de finalización">
            Cuando una ejecución que iniciaste termina bien, también recibes una notificación en la
            app.
          </InfoBox>
        </DocCard>

        <DocCard icon={<AlertTriangle size={24} />} title="Avisos de conexión">
          <Lead>
            Una función conserva su propio comportamiento dentro de un Pipeline: un Flow sigue
            enviando su propio webhook, correo, exportación a Bucket, Cleaner, revisión humana y
            Agente vinculado. El lienzo te señala dónde eso se cruza con lo que dibujaste.
          </Lead>
          <BulletList
            items={[
              "Una Escritura a bucket en el mismo Bucket al que ya exporta el Flow anterior guardaría las filas dos veces.",
              "Una Salida por webhook después de un Flow que ya envía un webhook enviaría el resultado dos veces.",
              "Una Salida por correo después de un Flow que ya envía sus resultados por correo mandaría un segundo correo.",
            ]}
          />
          <p>
            Estos aparecen como avisos en{" "}
            <strong>&ldquo;Vale la pena revisar — igual se ejecuta&rdquo;</strong>. Nunca bloquean
            una ejecución. Las tarjetas también llevan pequeñas marcas de lo que la función entrega
            por su cuenta (&ldquo;Webhook&rdquo;, correos, &ldquo;Revisión humana&rdquo;, entrega de
            un Agente), que el panel del nodo lista en <strong>&ldquo;También entrega a&rdquo;</strong>.
          </p>
          <p>
            El panel de un nodo de Flow también muestra <strong>&ldquo;Usado también en&rdquo;</strong>:
            las Colecciones, Splitters y otros Pipelines que dependen del mismo Flow, para que sepas
            qué más afecta un cambio en él.
          </p>
          <InfoBox color="blue" icon={<Info size={20} />} title="La revisión humana pausa la ejecución">
            Si un Flow envía sus runs a{" "}
            <DocLink href="/es/documentacion/revision-humana">Revisión Humana</DocLink>, la ejecución
            espera en ese nodo hasta que el run se aprueba, y luego continúa.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Lock size={24} />} title="Reglas que aplica el lienzo">
          <p>
            &ldquo;Ejecutar pipeline&rdquo; y la API rechazan un grafo que rompa alguna de estas
            reglas; el lienzo marca el nodo con el problema.
          </p>
          <BulletList
            items={[
              "Exactamente un nodo de Entrada, sin conexiones entrantes. Sin ciclos y sin nodos conectados a sí mismos.",
              "Todos los demás nodos necesitan una conexión entrante y una función vinculada (una Salida necesita un destinatario o una URL de webhook).",
              "Flows, Splitters y Colecciones reciben un documento de una sola fuente: la Entrada, un Splitter o (en el caso de los Flows) una Colección.",
              "Cada conexión hacia un Inspector o Filler necesita una ranura de entrada; un Filler no puede recibir dos conexiones en la misma ranura.",
              "Máximo 50 nodos por Pipeline.",
            ]}
          />
          <p>
            Los Matchers, Inspectores y Fillers (y cualquier nodo alimentado por más de una fuente)
            esperan a que termine todo lo anterior y se ejecutan una sola vez. Después de un Splitter,
            cada documento encontrado se vuelve su propia rama, y los pasos siguientes se ejecutan una
            vez por rama.
          </p>
        </DocCard>

        <DocCard icon={<PlayCircle size={24} />} title="Ejecuciones">
          <Lead>
            Cada documento que entra a un Pipeline crea una ejecución. La pestaña{" "}
            <strong>&ldquo;Ejecuciones&rdquo;</strong> las lista con el documento, la hora, el origen,
            el remitente, la duración y el estado.
          </Lead>
          <DataTable
            head={["Estado de la ejecución", "Significado"]}
            rows={[
              ["Pendiente / En ejecución", "La ejecución está en curso."],
              ["Completado", "Todos los nodos terminaron sin fallas."],
              ["Fallido", "Al menos un nodo falló o fue cancelado; el error indica el primero."],
              ["Cancelado", "Alguien detuvo la ejecución."],
            ]}
          />
          <p>
            Abre una ejecución para ver el lienzo tal como corrió, coloreado por el estado de cada
            nodo, con el progreso (&ldquo;X de Y nodos listos&rdquo;) y actualizaciones en vivo. Cada
            nodo muestra Pendiente, En espera, En cola, En ejecución, Completado, Fallido, Omitido o
            Cancelado, con un indicador por rama después de un Splitter. Selecciona un nodo y usa{" "}
            <strong>&ldquo;Ver resultado&rdquo;</strong> para abrir el run, la división, el match, la
            inspección o el llenado que produjo.
          </p>
          <p>
            <strong>&ldquo;Cancelar ejecución&rdquo;</strong> detiene el resto del grafo: los nodos que
            no han empezado se cancelan, y las ejecuciones de funciones que ya estaban en curso
            terminan por su cuenta.
          </p>
        </DocCard>

        <DocCard icon={<Code2 size={24} />} title="API">
          <span id="api" />
          <p>
            Copia el ID desde <strong>&ldquo;ID del pipeline&rdquo;</strong> en la pestaña
            Configuración. Inicia una ejecución enviando el documento como multipart{" "}
            <InlineCode>file</InlineCode> (o como JSON con <InlineCode>file_base64</InlineCode> y{" "}
            <InlineCode>filename</InlineCode>):
          </p>
          <CodeBlock lang="bash — iniciar una ejecución" code={EXECUTE_CURL} />
          <CodeBlock lang="JSON — respuesta 202" code={EXECUTE_RESPONSE} />
          <p>
            Una definición que no se puede ejecutar devuelve 400 con{" "}
            <InlineCode>validation_errors</InlineCode>; un 402 significa que tu organización no puede iniciar trabajo nuevo en este momento (contacta al equipo de Tavnit); un Pipeline
            inactivo devuelve 400. Sigue el progreso en la pestaña Ejecuciones. Para detener una
            ejecución:
          </p>
          <CodeBlock lang="bash — cancelar una ejecución" code={CANCEL_CURL} />
          <p>
            Cancelar una ejecución que ya terminó devuelve 409. La autenticación y el manejo de errores
            son los mismos que en el resto de la{" "}
            <DocLink href="/es/documentacion/api">API REST</DocLink>.
          </p>
        </DocCard>

        <DocCard icon={<Settings size={24} />} title="Quién puede hacer qué">
          <DataTable
            head={["Acción", "Roles"]}
            rows={[
              ["Crear, editar y eliminar Pipelines", "Propietario, Administrador"],
              ["Ejecutar un Pipeline", "Propietario, Administrador, Miembro"],
            ]}
          />
          <p>
            Eliminar un Pipeline borra el pipeline y su lienzo; las ejecuciones pasadas conservan sus
            registros. Consulta <DocLink href="/es/documentacion/roles-de-usuario">Roles de usuario</DocLink>.
          </p>
        </DocCard>

        <DocCard icon={<HelpCircle size={24} />} title="Solución de problemas">
          <DataTable
            head={["Síntoma", "Qué revisar"]}
            rows={[
              ["“Ejecutar pipeline” pide guardar primero", "Tienes cambios sin guardar en el lienzo. Guarda y luego ejecuta."],
              ["Un nodo dice que “needs a document source”", "Los Flows, Splitters y Colecciones deben recibir de la Entrada, de un Splitter o (solo Flows) de una Colección, no de un Flow ni de un Agente."],
              ["La ejecución se queda en un nodo", "Revisa si el run está esperando en Revisión Humana, o abre el resultado del nodo para ver el estado de la función."],
              ["Los resultados se guardaron o enviaron dos veces", "Busca avisos de conexión: el Flow anterior ya tiene su propia exportación a Bucket, webhook o correo."],
              ["Una rama aparece como Omitido", "El paso anterior falló o no produjo nada para esa rama, así que los pasos siguientes no tenían sobre qué ejecutarse."],
              ["Un correo a la dirección del pipeline no hace nada", "Verifica que el disparador por correo esté activado, que el Pipeline esté activo y que el remitente esté permitido."],
            ]}
          />
        </DocCard>

        <Related
          links={[
            {
              href: "/es/documentacion/mapa-del-pipeline",
              label: "Mira cómo se conectan tus funciones en el Mapa de Pipeline",
              description: "El mapa de solo lectura de cada Flow, Splitter, Colección, Cleaner y Bucket de tu espacio de trabajo.",
            },
            {
              href: "/es/documentacion/splitters",
              label: "Divide paquetes en documentos",
              description: "Tipos de documento, detección de páginas y enrutamiento: el primer paso habitual después de la Entrada.",
            },
            {
              href: "/es/documentacion/inspectores",
              label: "Revisa runs con un Inspector",
              description: "Ranuras de entrada y checklists que un Pipeline puede alimentar desde varios Flows a la vez.",
            },
            {
              href: "/es/documentacion/api",
              label: "Autentícate con la API REST",
              description: "API keys, la URL base y los códigos de error comunes a todos los endpoints.",
            },
          ]}
        />
      </section>
    </>
  );
}
