"use client";

import { Fragment, useState, useSyncExternalStore } from "react";
import {
  AudioLines,
  Bot,
  Briefcase,
  CircleDot,
  ClipboardCheck,
  Code2,
  Database,
  Download,
  ExternalLink,
  FileOutput,
  FileText,
  FolderInput,
  Info,
  KeyRound,
  Layers,
  ListChecks,
  Lock,
  Paperclip,
  Radar,
  Route,
  Settings2,
  ShieldCheck,
  Split,
  Star,
  Target,
  UserCheck,
  Wand2,
  Webhook,
  Zap,
} from "lucide-react";
import {
  BulletList,
  CodeBlock,
  DataTable,
  DocCard,
  DocLink,
  InfoBox,
  InlineCode,
  NumberedList,
  Related,
  WarningBox,
} from "@/components/docs/ui";
import {
  AGENT_RUN_RESPONSE,
  AGENT_TRIGGER_REQUEST,
  API_ERROR_EXAMPLE,
  API_KEY_RESPONSE,
  BUCKET_READ_REQUEST,
  BUCKET_READ_RESPONSE,
  BUCKET_WRITE_RESPONSE,
  BUCKETS_JSON_EXAMPLE,
  CASE_REQUEST,
  CASE_RESPONSE,
  CLEANERS_JSON_EXAMPLE,
  COLLECTION_PROCESS_RESPONSE,
  COLLECTIONS_JSON_EXAMPLE,
  FILLER_REQUEST,
  HITL_RUN_APPROVE_REQUEST,
  INSPECTOR_PROCESS_REQUEST,
  JAVASCRIPT_BUCKETS_CODE,
  JAVASCRIPT_CLEANERS_CODE,
  JAVASCRIPT_CODE,
  JAVASCRIPT_COLLECTIONS_CODE,
  JAVASCRIPT_RUN_POLL_CODE,
  JAVASCRIPT_SPLITTERS_CODE,
  JSON_BODY_EXAMPLE,
  MATCHER_RUN_REQUEST,
  NET_CATCH_REQUEST,
  PIPELINE_EXECUTE_REQUEST,
  PYTHON_BUCKETS_CODE,
  PYTHON_CLEANERS_CODE,
  PYTHON_CODE,
  PYTHON_COLLECTIONS_CODE,
  PYTHON_RUN_POLL_CODE,
  PYTHON_SPLITTERS_CODE,
  RUN_GET_RESPONSE,
  RUN_PROCESS_RESPONSE,
  SIGNAL_RUN_REQUEST,
  SOURCE_FILE_RESPONSE,
  SPLIT_RUN_RESPONSE,
  SPLITTERS_JSON_EXAMPLE,
  SWEEP_RUN_RESPONSE,
} from "@/components/docs/code-samples";

type ApiTab = "code" | "no-code";
type Lang = "python" | "javascript";

/* La app enlaza directo a la pestaña sin código con #no-code. Leer el hash
 * con un store externo deja el render del servidor en "code" (sin desajuste de
 * hidratación) y además sigue los cambios de hash posteriores. */
function subscribeHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}
const hashIsNoCode = () => window.location.hash === "#no-code";
const serverHash = () => false;

const H3 = "text-base font-semibold text-fg-2 mt-6 mb-1";

function Endpoint({ method, path }: { method: string; path: string }) {
  return (
    <div className="my-3 flex flex-wrap items-center gap-2 font-mono text-[13px]">
      <span className="rounded bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] px-2 py-0.5 text-[11px] font-bold text-white">
        {method}
      </span>
      <span className="break-all text-fg-2">{path}</span>
    </div>
  );
}

function LangToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="flex gap-1 p-1 bg-tint/[0.04] rounded-lg w-fit my-4 border border-tint/[0.08]">
      {(["python", "javascript"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
            lang === l
              ? "bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white shadow-lg"
              : "text-fg-4 hover:text-fg hover:bg-tint/5"
          }`}
        >
          {l === "python" ? "Python" : "JavaScript"}
        </button>
      ))}
    </div>
  );
}

const FIELD_HEAD = ["Campo", "Obligatorio", "Descripción"];

/**
 * Contenido de la integración por API (español). Gemelo de ApiIntegrationContent:
 * referencia de los endpoints REST para clientes (pestaña Código) y recetas sin
 * código (pestaña Sin código).
 *
 * Ambos paneles se renderizan siempre y el inactivo se oculta con CSS, para que
 * la documentación sin código también exista en el HTML servido. El selector
 * Python/JavaScript sí es condicional: son ejemplos equivalentes.
 */
export default function ApiIntegrationContentEs() {
  const hashNoCode = useSyncExternalStore(subscribeHash, hashIsNoCode, serverHash);
  const [chosenTab, setChosenTab] = useState<ApiTab | null>(null);
  const apiTab: ApiTab = chosenTab ?? (hashNoCode ? "no-code" : "code");
  const [lang, setLang] = useState<Lang>("python");

  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        Integración por API
      </h1>

      {/* Subpestañas */}
      <div className="flex gap-1 p-1 bg-tint/[0.04] rounded-lg w-fit mb-8 border border-tint/[0.08]" role="tablist">
        <button
          role="tab"
          aria-selected={apiTab === "code"}
          onClick={() => setChosenTab("code")}
          className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
            apiTab === "code"
              ? "bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white shadow-lg"
              : "text-fg-4 hover:text-fg hover:bg-tint/5"
          }`}
        >
          Código
        </button>
        <button
          role="tab"
          aria-selected={apiTab === "no-code"}
          onClick={() => setChosenTab("no-code")}
          className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
            apiTab === "no-code"
              ? "bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white shadow-lg"
              : "text-fg-4 hover:text-fg hover:bg-tint/5"
          }`}
        >
          Sin código
        </button>
      </div>

      {/* ── Pestaña Código ── */}
      <div role="tabpanel" aria-label="Código" className={apiTab === "code" ? undefined : "hidden"}>
        <DocCard icon={<Info size={24} />} title="Cómo funciona la API">
          <p>
            La API REST de Tavnit permite que tu propio código haga lo mismo que haces en la app:
            enviar documentos a un Flow, una Colección, un Splitter o un Pipeline; ejecutar
            Cleaners, Matchers, Inspectores, Fillers, Signals y Agentes; leer y escribir Buckets;
            gestionar los casos de un Subject, y aprobar o rechazar revisiones humanas.
          </p>
          <BulletList
            items={[
              <Fragment key="b0">
                URL base: <InlineCode>https://run.tavnit.io/api</InlineCode>. Todas las rutas de
                abajo son relativas a ella.
              </Fragment>,
              <Fragment key="b1">
                Cada solicitud lleva tu API key en el encabezado <InlineCode>X-API-Key</InlineCode>.
              </Fragment>,
              <Fragment key="b2">
                El procesamiento es asíncrono. Los endpoints que inician trabajo responden de
                inmediato <strong>202 Accepted</strong> con un id, y el trabajo corre en segundo
                plano. Obtienes el resultado consultando (runs, runs de Agentes, Catches, casos) o en
                un <DocLink href="/es/documentacion/webhooks">webhook</DocLink> configurado en la
                función.
              </Fragment>,
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Funciones en Beta">
            Pipelines, Subjects, Matchers, Inspectores, Fillers, Signals y Nets están en Beta. Sus
            endpoints ya funcionan, pero algunos detalles todavía pueden cambiar.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Lock size={24} />} title="Autenticación e IDs">
          <h3 className="text-base font-semibold text-fg-2 mt-2 mb-1">API key</h3>
          <p>
            Abre <strong>Integraciones</strong> en la barra lateral de la app. La tarjeta{" "}
            <strong>Clave API</strong> muestra tu key (ahí puedes revelarla y copiarla). Cada miembro
            tiene su propia key en cada organización, y una solicitud actúa como ese miembro en esa
            organización.
          </p>
          <WarningBox>
            Mantén tu API key en secreto. <strong>Regenerar</strong>, en la misma tarjeta, invalida
            la key actual de inmediato, y todo lo que la siga usando deja de funcionar.
          </WarningBox>
          <p>Una solicitud sin una key válida recibe:</p>
          <CodeBlock
            lang="401"
            code={`{
  "success": false,
  "error": "Authentication required",
  "message": "Please provide a valid X-API-Key header"
}`}
          />

          <h3 className={H3}>Roles</h3>
          <p>
            La key lleva tu rol. Los miembros con el rol <strong>Solo HITL</strong> solo pueden usar
            los endpoints de aprobar y rechazar revisiones humanas y los de la API key. Todos los
            endpoints de procesamiento y de datos los rechazan con <strong>403</strong> y{" "}
            <InlineCode>Your role only permits HITL reviews</InlineCode>. Consulta{" "}
            <DocLink href="/es/documentacion/roles-de-usuario">roles de usuario</DocLink>.
          </p>

          <h3 className={H3}>IDs</h3>
          <p>
            Cada Flow, Colección, Splitter, Cleaner, Bucket, Agente, Matcher, Inspector, Filler y
            Pipeline muestra su ID en su página de detalle, con un botón para copiarlo. Los recursos
            deben pertenecer a la organización de tu key: el ID de otra organización responde 403 o
            404.
          </p>
        </DocCard>

        <DocCard icon={<Download size={24} />} title="Envío de archivos">
          <p>Los endpoints que reciben un documento lo aceptan de dos formas:</p>
          <InfoBox color="purple" icon={<Paperclip size={20} />} title="Subida multipart">
            Envía el archivo como multipart/form-data en un campo llamado file, con los demás campos
            como campos del formulario. Funciona en todos los endpoints de archivos.
          </InfoBox>
          <InfoBox color="violet" icon={<Code2 size={20} />} title="Base64 en un cuerpo JSON">
            Envía un JSON con file_base64 (el contenido del archivo) y filename (con su extensión),
            más los demás campos. Es útil cuando una herramienta de automatización te da base64 en
            lugar de un archivo.
          </InfoBox>
          <DataTable
            head={["Endpoint", "Base64", "Archivos aceptados"]}
            rows={[
              ["POST /runs/process", "Sí", "PDF, imágenes (PNG, JPG, JPEG, JFIF, TIF, TIFF, WEBP, BMP, GIF), hojas de cálculo (XLSX, XLS, CSV)"],
              ["POST /collections/process", "Sí", "Igual que runs"],
              ["POST /splits/run", "Sí", "Igual que runs"],
              ["POST /pipelines/{id}/execute", "Sí", "PDF e imágenes"],
              ["POST /signals/{id}/run", "Sí", "Audio: MP3, MP4, MPEG, MPGA, M4A, WAV, WEBM"],
              ["POST /sweeps/run", "No", "Hojas de cálculo: CSV, XLSX, XLS"],
              ["Inspectores, Fillers, Subjects y casos", "No", "El documento como archivo multipart"],
            ]}
          />
          <p>Una solicitud puede pesar hasta 150 MB. El tipo de archivo se toma de la extensión del nombre.</p>
        </DocCard>

        <DocCard icon={<ListChecks size={24} />} title="Respuestas y errores">
          <p>
            Las respuestas son JSON con un indicador <InlineCode>success</InlineCode>. Los errores
            traen un texto en <InlineCode>error</InlineCode>, a veces un{" "}
            <InlineCode>message</InlineCode> y claves adicionales que explican el problema:
          </p>
          <CodeBlock lang="Ejemplo 409" code={API_ERROR_EXAMPLE} />
          <DataTable
            head={["Código", "Significado"]}
            rows={[
              ["200 / 201", "Hecho (lecturas, cancelaciones, aprobaciones) / creado (casos, fills, inspecciones)."],
              ["202", "Aceptado: el trabajo quedó en cola. Guarda el id que devuelve."],
              ["400", "Falta un campo obligatorio o no es válido, el tipo de archivo no es compatible, o el recurso está inactivo o sin configurar."],
              ["401", "Falta la X-API-Key o no es válida."],
              ["402", "Tu organización no puede iniciar trabajo nuevo en este momento; contacta al equipo de Tavnit."],
              ["403", "El recurso es de otra organización, tu rol es Solo HITL o no eres revisor de ese elemento."],
              ["404", "El ID no existe en tu organización."],
              ["409", "Conflicto con el estado actual: nombre de Bucket que no coincide, ya cancelado o terminado, caso cerrado, espacio ya ocupado."],
              ["429", "Demasiados runs esperando turno en un Agente."],
              ["500", "Error inesperado. Puedes reintentar más tarde."],
            ]}
          />
        </DocCard>

        <DocCard icon={<Layers size={24} />} title="Referencia de endpoints">
          <DataTable
            head={["Función", "Método y ruta", "Qué hace"]}
            rows={[
              ["Flows", "POST /runs/process", "Extrae un documento con un Flow"],
              ["Flows", "GET /runs/{run_id}", "Estado del run y datos extraídos"],
              ["Flows", "GET /runs/{run_id}/source-file", "El documento original"],
              ["Colecciones", "POST /collections/process", "La IA dirige el documento al Flow o Splitter correcto"],
              ["Colecciones", "GET /collection-runs/{id}/source-file", "El documento original"],
              ["Splitters", "POST /splits/run", "Divide un archivo con varios documentos"],
              ["Splitters", "GET /splits/{split_id}/source-file", "El archivo original completo"],
              ["Cleaners", "POST /sweeps/run", "Sweep de una hoja de cálculo"],
              ["Cleaners", "POST /cleaners/{cleaner_id}/process", "Sweep de filas enviadas como JSON"],
              ["Buckets", "POST /buckets/write", "Agrega o reemplaza filas"],
              ["Buckets", "GET /buckets/read", "Lee filas, paginadas"],
              ["Agentes", "POST /bots/{agent_id}/runs", "Inicia un run del Agente"],
              ["Agentes", "GET /bot-runs/{bot_run_id}", "Consulta un run del Agente"],
              ["Agentes", "GET /bots/{agent_id}/runs", "Lista los runs de un Agente"],
              ["Agentes", "POST /bot-runs/{bot_run_id}/cancel", "Cancela un run del Agente"],
              ["Matchers", "POST /matchers/{matcher_id}/run", "Compara runs completados"],
              ["Inspectores", "POST /inspectors/{inspector_id}/process", "Agrega un documento a una inspección"],
              ["Fillers", "POST /fillers/{filler_id}/fills", "Abre un fill y agrega documentos"],
              ["Pipelines", "POST /pipelines/{pipeline_id}/execute", "Ejecuta un Pipeline"],
              ["Signals", "POST /signals/{signal_id}/run", "Estructura un archivo de audio (una Wave)"],
              ["Subjects", "POST /subjects/{subject_id}/process", "Dirige un documento a un caso"],
              ["Nets", "POST /nets/{net_id}/catch", "Inicia un Catch"],
              ["Revisión Humana", "POST /runs/{run_id}/hitl/approve", "Aprueba o rechaza elementos en pausa"],
              ["API key", "GET /me/api-key", "Lee o regenera tu key"],
            ]}
          />
          <p>Abajo se detalla cada función, con sus demás endpoints.</p>
        </DocCard>

        {/* ── Flows ── */}
        <DocCard icon={<FileText size={24} />} title="Flows: procesa un documento">
          <p>Envía un documento a un Flow. Tavnit crea un run y lo extrae en segundo plano.</p>
          <Endpoint method="POST" path="/runs/process" />
          <DataTable
            head={FIELD_HEAD}
            rows={[
              ["flow_id", "Sí", "El Flow que extrae el documento."],
              ["file", "Sí*", "El documento (multipart)."],
              ["file_base64 + filename", "Sí*", "En lugar de file: el contenido en base64 y el nombre del archivo con su extensión."],
              ["content_type", "No", "Tipo MIME de un archivo en base64."],
              ["source", "No", "Etiqueta que se guarda en el run: api (predeterminada), email, manual_upload o collection."],
            ]}
            caption="* Envía file o bien file_base64 + filename."
          />
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python" code={PYTHON_CODE} />
          ) : (
            <CodeBlock lang="JavaScript" code={JAVASCRIPT_CODE} />
          )}
          <CodeBlock lang="Respuesta 202" code={RUN_PROCESS_RESPONSE} />
          <p>
            Errores: 400 (sin archivo, sin flow_id, archivo no compatible o inválido), 403 (Flow de
            otra organización), 404 (Flow no encontrado). Una solicitud rechazada igual crea un run
            fallido cuando puede, y devuelve su <InlineCode>run_id</InlineCode> para que lo
            encuentres en <strong>Runs</strong>.
          </p>

          <h3 className={H3}>Consulta el run y sus datos</h3>
          <Endpoint method="GET" path="/runs/{run_id}" />
          <p>
            Consulta hasta que <InlineCode>status</InlineCode> sea final. Estados:{" "}
            <InlineCode>queued</InlineCode>, <InlineCode>running</InlineCode>,{" "}
            <InlineCode>awaiting_approval</InlineCode> (en pausa para{" "}
            <DocLink href="/es/documentacion/revision-humana">revisión humana</DocLink>),{" "}
            <InlineCode>completed</InlineCode>, <InlineCode>failed</InlineCode> y{" "}
            <InlineCode>cancelled</InlineCode>. <InlineCode>data</InlineCode> trae las filas
            extraídas y sigue en <InlineCode>null</InlineCode> hasta que el run se completa, incluso
            mientras espera aprobación. Si <InlineCode>columns</InlineCode> viene con valor, úsalo
            para el orden de las columnas. <InlineCode>attempt</InlineCode> y{" "}
            <InlineCode>previous_attempts</InlineCode> muestran los reintentos automáticos. Agrega{" "}
            <InlineCode>?include_document=true</InlineCode> para recibir también un enlace firmado
            al archivo original. Funciona con todos los runs, incluidos los creados por Colecciones,
            Splitters, Pipelines y correo.
          </p>
          <CodeBlock lang="Respuesta 200" code={RUN_GET_RESPONSE} />
          {lang === "python" ? (
            <CodeBlock lang="Python (enviar y consultar)" code={PYTHON_RUN_POLL_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (enviar y consultar)" code={JAVASCRIPT_RUN_POLL_CODE} />
          )}

          <h3 className={H3}>Obtén el documento original</h3>
          <Endpoint method="GET" path="/runs/{run_id}/source-file" />
          <p>
            Devuelve una URL firmada al archivo tal como se subió, sin importar el estado del run.{" "}
            <InlineCode>expires_in</InlineCode> (opcional) define la vigencia del enlace en segundos
            (de 60 a 604800; por defecto 7 días). Con <InlineCode>?download=true</InlineCode> la
            respuesta es el archivo en sí.
          </p>
          <CodeBlock lang="Respuesta 200" code={SOURCE_FILE_RESPONSE} />
        </DocCard>

        {/* ── Colecciones ── */}
        <DocCard icon={<FolderInput size={24} />} title="Colecciones: deja que la IA dirija el documento">
          <p>
            Envía un documento sin elegir el Flow: la IA escoge el mejor Flow o Splitter de la
            Colección. Úsalo cuando recibes tipos de documento mezclados.
          </p>
          <Endpoint method="POST" path="/collections/process" />
          <p>
            El mismo cuerpo que <InlineCode>/runs/process</InlineCode>, con{" "}
            <InlineCode>collection_id</InlineCode> en lugar de <InlineCode>flow_id</InlineCode> (o
            pon el ID en la ruta: <InlineCode>{"/collections/{collection_id}/process"}</InlineCode>).
            La Colección debe estar activa y tener al menos un Flow o Splitter activo; si no, la
            llamada responde 400.
          </p>
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python (Colecciones)" code={PYTHON_COLLECTIONS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Colecciones)" code={JAVASCRIPT_COLLECTIONS_CODE} />
          )}
          <CodeBlock lang="Respuesta 202" code={COLLECTION_PROCESS_RESPONSE} />
          <p>
            El Flow elegido crea un run normal, y el payload de su webhook incluye{" "}
            <InlineCode>collection_run_id</InlineCode> para que relaciones el resultado con tu
            solicitud. El original está disponible de inmediato en{" "}
            <InlineCode>{"GET /collection-runs/{collection_run_id}/source-file"}</InlineCode> (con
            las mismas opciones que el archivo original de un run). Consulta{" "}
            <DocLink href="/es/documentacion/colecciones">Colecciones</DocLink>.
          </p>
        </DocCard>

        {/* ── Splitters ── */}
        <DocCard icon={<Split size={24} />} title="Splitters: divide un archivo con varios documentos">
          <p>
            Envía un archivo que contiene varios documentos. El Splitter detecta dónde empieza y
            termina cada uno, lo clasifica y envía cada parte a donde indique su tipo de documento.
          </p>
          <Endpoint method="POST" path="/splits/run" />
          <p>
            El mismo cuerpo que <InlineCode>/runs/process</InlineCode>, con{" "}
            <InlineCode>splitter_id</InlineCode>.
          </p>
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python (Splitters)" code={PYTHON_SPLITTERS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Splitters)" code={JAVASCRIPT_SPLITTERS_CODE} />
          )}
          <CodeBlock lang="Respuesta 202" code={SPLIT_RUN_RESPONSE} />
          <p>
            Las partes enviadas a Flows se convierten en runs propios, y sus webhooks traen{" "}
            <InlineCode>split_id</InlineCode>. El archivo original completo está en{" "}
            <InlineCode>{"GET /splits/{split_id}/source-file"}</InlineCode>. Consulta{" "}
            <DocLink href="/es/documentacion/splitters">Splitters</DocLink>.
          </p>
        </DocCard>

        {/* ── Cleaners ── */}
        <DocCard icon={<Wand2 size={24} />} title="Cleaners: ejecuta un sweep">
          <p>
            Un sweep pasa un Cleaner por filas de datos para normalizar, clasificar, buscar o
            enriquecer valores. Envía las filas como hoja de cálculo o como JSON.
          </p>
          <Endpoint method="POST" path="/sweeps/run" />
          <DataTable
            head={FIELD_HEAD}
            rows={[
              ["cleaner_id", "Sí", "El Cleaner que se ejecuta."],
              ["file", "Sí", "CSV, XLSX o XLS, solo multipart. Encabezados en la primera fila; cada campo base que el Cleaner exige debe ser una columna, sin duplicados."],
              ["sheet_name", "No", "Qué hoja del libro leer (por defecto, la primera)."],
            ]}
          />
          <Endpoint method="POST" path="/cleaners/{cleaner_id}/process" />
          <p>
            Envía un JSON con <InlineCode>rows</InlineCode> (un arreglo de objetos), o un{" "}
            <InlineCode>file</InlineCode> multipart como el de arriba.
          </p>
          <CodeBlock lang="Cuerpo JSON" code={CLEANERS_JSON_EXAMPLE} />
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python (Cleaners)" code={PYTHON_CLEANERS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Cleaners)" code={JAVASCRIPT_CLEANERS_CODE} />
          )}
          <CodeBlock lang="Respuesta 202" code={SWEEP_RUN_RESPONSE} />
          <p>
            Un Cleaner con una configuración inválida responde 400 con <InlineCode>validation_errors</InlineCode>. Consulta{" "}
            <DocLink href="/es/documentacion/cleaners">Cleaners</DocLink>.
          </p>
        </DocCard>

        {/* ── Buckets ── */}
        <DocCard icon={<Database size={24} />} title="Buckets: escribe y lee filas">
          <p>
            Envía filas a un Bucket desde tus propios sistemas, o lee lo que tus Flows guardaron ahí.
            El ID y el nombre del Bucket aparecen al tocar el ícono de información en su página. El
            nombre es una verificación de seguridad: si no coincide con el ID, la llamada responde{" "}
            <strong>409</strong>.
          </p>
          <Endpoint method="POST" path="/buckets/write" />
          <DataTable
            head={FIELD_HEAD}
            rows={[
              ["bucket_id", "Sí", "El Bucket."],
              ["bucket_name", "Sí", "Su nombre exacto."],
              ["overwrite", "Sí", "Booleano. false agrega las filas; true reemplaza todas las filas existentes."],
              ["rows", "Sí", "Arreglo de objetos, hasta 50,000 por solicitud."],
            ]}
          />
          <p>
            Envía el cuerpo como <InlineCode>application/json</InlineCode>. Cada fila debe tener
            exactamente las columnas del Bucket, por nombre de columna o nombre visible: una columna
            faltante o desconocida cancela toda la escritura con 400 e indica{" "}
            <InlineCode>missing_columns</InlineCode> y <InlineCode>extra_columns</InlineCode>.
          </p>
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python (Buckets)" code={PYTHON_BUCKETS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Buckets)" code={JAVASCRIPT_BUCKETS_CODE} />
          )}
          <CodeBlock lang="Respuesta 202" code={BUCKET_WRITE_RESPONSE} />

          <h3 className={H3}>Lee filas</h3>
          <Endpoint method="GET" path="/buckets/read" />
          <p>
            Parámetros de consulta: <InlineCode>bucket_id</InlineCode> y{" "}
            <InlineCode>bucket_name</InlineCode> (obligatorios), <InlineCode>limit</InlineCode> (de
            1 a 1000; por defecto 100) y <InlineCode>offset</InlineCode> (por defecto 0). Avanza con{" "}
            <InlineCode>offset</InlineCode> mientras <InlineCode>has_more</InlineCode> sea true;{" "}
            <InlineCode>total_count</InlineCode> cuenta todas las filas. Las claves de{" "}
            <InlineCode>data</InlineCode> en cada fila son los nombres de columna; usa{" "}
            <InlineCode>columns</InlineCode> para los nombres visibles. Los enlaces a archivos
            guardados llegan como URLs firmadas nuevas.
          </p>
          <CodeBlock lang="Solicitud" code={BUCKET_READ_REQUEST} />
          <CodeBlock lang="Respuesta 200" code={BUCKET_READ_RESPONSE} />
          <p>
            Consulta <DocLink href="/es/documentacion/buckets">Buckets</DocLink>.
          </p>
        </DocCard>

        {/* ── Agentes ── */}
        <DocCard icon={<Bot size={24} />} title="Agentes: inicia y consulta runs">
          <p>
            Inicia un Agente desde tu código y recoge lo que capturó. Los Agentes se habilitan por
            organización a pedido: contacta a soporte para activarlos.
          </p>
          <Endpoint method="POST" path="/bots/{agent_id}/runs" />
          <p>
            El JSON opcional <InlineCode>{'{"inputs": {...}}'}</InlineCode> reemplaza las variables
            de entrada del Agente para este run. Solo se usan las variables que el Agente declara, y
            nunca se aceptan valores secretos. También puedes llamar a{" "}
            <InlineCode>POST /bots/runs</InlineCode> con <InlineCode>bot_id</InlineCode> en el
            cuerpo. Cada llamada inicia un run nuevo.
          </p>
          <CodeBlock lang="Solicitud" code={AGENT_TRIGGER_REQUEST} />
          <p>
            <InlineCode>status</InlineCode> es <InlineCode>queued</InlineCode>, o{" "}
            <InlineCode>waiting</InlineCode> cuando el Agente ejecuta un run a la vez y está ocupado
            (empieza solo cuando le llega el turno). 409 si el Agente está archivado, 429 si ya hay
            demasiados runs esperando.
          </p>

          <h3 className={H3}>Consulta, lista y cancela</h3>
          <DataTable
            head={["Endpoint", "Qué hace"]}
            rows={[
              ["GET /bot-runs/{bot_run_id}", "Un run: estado, tiempos, input (sin secretos) y output con enlaces firmados a archivos. También en GET /bots/{agent_id}/runs/{bot_run_id}."],
              ["GET /bots/{agent_id}/runs", "Del más reciente al más antiguo, sin input ni output. Consulta: status (queued, running, completed, failed, cancelled), limit (de 1 a 100; por defecto 20), offset. Devuelve runs y total."],
              ["POST /bot-runs/{bot_run_id}/cancel", "Cancela un run en espera, en cola o en ejecución. 409 si el run ya terminó. También en POST /bots/{agent_id}/runs/{bot_run_id}/cancel."],
            ]}
          />
          <CodeBlock lang="GET /bot-runs/{bot_run_id}" code={AGENT_RUN_RESPONSE} />
          <p>
            Consulta <DocLink href="/es/documentacion/agentes">Agentes</DocLink>.
          </p>
        </DocCard>

        {/* ── Matchers ── */}
        <DocCard icon={<Target size={24} />} title="Matchers: compara runs">
          <p>Compara runs completados del Flow del Matcher, por ejemplo facturas contra órdenes de compra.</p>
          <Endpoint method="POST" path="/matchers/{matcher_id}/run" />
          <DataTable
            head={FIELD_HEAD}
            rows={[
              ["run_ids", "Sí", "Dos o más runs completados del Flow del Matcher."],
              ["benchmark_run_id", "En modo benchmark", "El run contra el que se comparan los demás."],
            ]}
          />
          <CodeBlock lang="Solicitud" code={MATCHER_RUN_REQUEST} />
          <p>
            No hay un endpoint de API para leer un match: recibe el resultado en el webhook o la salida
            por correo del Matcher, o en la app. Consulta{" "}
            <DocLink href="/es/documentacion/matchers">Matchers</DocLink>.
          </p>
        </DocCard>

        {/* ── Inspectores ── */}
        <DocCard icon={<ShieldCheck size={24} />} title="Inspectores: revisa un conjunto de documentos">
          <p>
            Una inspección reúne documentos, dirige cada uno a un espacio del Inspector, lo extrae y
            evalúa la lista de verificación.
          </p>
          <Endpoint method="POST" path="/inspectors/{inspector_id}/process" />
          <p>
            <InlineCode>file</InlineCode> multipart. Sin <InlineCode>inspection_id</InlineCode> se
            crea una inspección nueva; envía el <InlineCode>inspection_id</InlineCode> devuelto para
            agregarle más documentos (debe seguir recibiendo archivos; si no, 409). El Inspector debe estar activo.
          </p>
          <CodeBlock lang="Solicitud" code={INSPECTOR_PROCESS_REQUEST} />
          <DataTable
            head={["Endpoint", "Qué hace"]}
            rows={[
              ["POST /inspectors/{inspector_id}/inspections", "Crea una inspección vacía (201) para agregarle documentos después."],
              ["POST /inspections/{inspection_id}/fire", "Deja de recibir archivos y evalúa ahora. 400 con missing_inputs si a un espacio obligatorio le falta documento."],
            ]}
          />
          <p>
            El resultado llega al webhook o a la salida por correo del Inspector. Consulta{" "}
            <DocLink href="/es/documentacion/inspectores">Inspectores</DocLink>.
          </p>
        </DocCard>

        {/* ── Fillers ── */}
        <DocCard icon={<FileOutput size={24} />} title="Fillers: llena formularios PDF">
          <p>
            Un fill reúne los documentos que necesita un Filler, los extrae y escribe los valores en
            las plantillas PDF del Filler.
          </p>
          <DataTable
            head={["Endpoint", "Qué hace"]}
            rows={[
              ["POST /fillers/{filler_id}/fills", "Abre un fill (201, devuelve fill_id). El Filler necesita una plantilla y el mapeo de campos."],
              ["POST /fills/{fill_id}/route-upload", "Archivo multipart; la IA lo dirige a un espacio libre (202)."],
              ["POST /fills/{fill_id}/inputs/{input_id}/upload", "Archivo multipart para un espacio concreto; inicia el run de ese espacio (202)."],
              ["POST /fills/{fill_id}/inputs/{input_id}/attach-run", "JSON run_id: reutiliza un run completado para un espacio (202)."],
              ["POST /fills/{fill_id}/fire", "Llena ahora en lugar de esperar todos los espacios. 400 con missing_inputs si un espacio obligatorio está vacío."],
              ["POST /fillers/{filler_id}/templates", "Agrega una plantilla PDF (archivo multipart, name opcional). Mapea sus campos en la app."],
            ]}
          />
          <CodeBlock lang="Solicitud" code={FILLER_REQUEST} />
          <p>
            Los PDF llenos llegan al webhook o a la salida por correo del Filler. Consulta{" "}
            <DocLink href="/es/documentacion/fillers">Fillers</DocLink>.
          </p>
        </DocCard>

        {/* ── Pipelines ── */}
        <DocCard icon={<Route size={24} />} title="Pipelines: ejecuta">
          <p>Inicia una ejecución de un Pipeline con un documento.</p>
          <Endpoint method="POST" path="/pipelines/{pipeline_id}/execute" />
          <p>
            <InlineCode>file</InlineCode> multipart o <InlineCode>file_base64</InlineCode> +{" "}
            <InlineCode>filename</InlineCode>; PDF o imagen. 400 si el Pipeline está
            inactivo o su grafo no puede ejecutarse (con <InlineCode>validation_errors</InlineCode>).
          </p>
          <CodeBlock lang="Solicitud" code={PIPELINE_EXECUTE_REQUEST} />
          <p>
            Cancela con{" "}
            <InlineCode>{"POST /pipelines/executions/{execution_id}/cancel"}</InlineCode> (409 si no
            está en ejecución). Los resultados salen por los nodos Salida del Pipeline. Consulta{" "}
            <DocLink href="/es/documentacion/pipelines">Pipelines</DocLink>.
          </p>
        </DocCard>

        {/* ── Signals ── */}
        <DocCard icon={<AudioLines size={24} />} title="Signals: estructura un archivo de audio">
          <p>Envía una grabación y el Signal la convierte en datos estructurados (una Wave).</p>
          <Endpoint method="POST" path="/signals/{signal_id}/run" />
          <p>
            <InlineCode>file</InlineCode> multipart o base64. Audio de hasta 150 MB y 8 horas, con
            un máximo de 2 horas de voz detectada.
          </p>
          <CodeBlock lang="Solicitud" code={SIGNAL_RUN_REQUEST} />
          <p>
            El resultado llega al webhook del Signal o a la app. Consulta{" "}
            <DocLink href="/es/documentacion/signals">Signals</DocLink>.
          </p>
        </DocCard>

        {/* ── Subjects ── */}
        <DocCard icon={<Briefcase size={24} />} title="Subjects y casos">
          <p>Archiva documentos en los casos de un Subject y gestiona los casos desde tu código.</p>
          <DataTable
            head={["Endpoint", "Qué hace"]}
            rows={[
              ["POST /subjects/{subject_id}/process", "Archivo multipart; Tavnit lo dirige a un caso (202, devuelve subject_doc_id)."],
              ["POST /cases/{case_id}/docs", "Archivo multipart directo a un caso, sin enrutamiento. doc_type_id es obligatorio salvo que el Subject tenga un solo tipo de documento. Devuelve el run_id (202). 409 si el caso está cerrado o ese tipo de documento ya está cubierto."],
              ["POST /subjects/{subject_id}/docs/{doc_id}/assign", "JSON case_id y doc_type_id: archiva a mano un documento retenido (202)."],
              ["POST /subjects/{subject_id}/cases", "JSON name (obligatorio, único, hasta 200 caracteres) y params (objeto opcional). Crea un caso (201). 409 si el nombre ya existe."],
              ["GET /subjects/{subject_id}/cases", "Consulta: state (open o closed), status, search, limit (hasta 200; por defecto 50), offset. Devuelve cases y total."],
              ["GET /cases/{case_id}", "El caso y sus documentos, cada uno con el run_id para consultar en GET /runs/{run_id}."],
              ["POST /cases/{case_id}/close", "Cierra el caso (200). Los documentos nuevos para él quedan retenidos en lugar de archivarse. 409 si ya está cerrado."],
              ["POST /cases/{case_id}/reopen", "Lo reabre (200). 409 si está abierto."],
              ["POST /cases/{case_id}/inspections", "JSON subject_inspector_id: ejecuta un Inspector vinculado sobre los runs completados del caso (202)."],
            ]}
          />
          <CodeBlock lang="Solicitud" code={CASE_REQUEST} />
          <CodeBlock lang="Respuesta 201" code={CASE_RESPONSE} />
          <p>
            Consulta <DocLink href="/es/documentacion/subjects">Subjects</DocLink>.
          </p>
        </DocCard>

        {/* ── Nets ── */}
        <DocCard icon={<Radar size={24} />} title="Nets: inicia un Catch">
          <p>Las Nets se habilitan por organización. Sin acceso, estos endpoints responden 403.</p>
          <Endpoint method="POST" path="/nets/{net_id}/catch" />
          <p>
            Sin cuerpo, el Catch continúa donde terminó el anterior. Envía{" "}
            <InlineCode>window_start</InlineCode> y/o <InlineCode>window_end</InlineCode> (fechas
            ISO) para recuperar un rango específico. 409 si la Net está inactiva o ya hay en curso un Catch que continúa desde el anterior.
          </p>
          <CodeBlock lang="Solicitud" code={NET_CATCH_REQUEST} />
          <p>
            Consulta <InlineCode>{"GET /catches/{catch_id}"}</InlineCode>: estado, etapa, conteos y,
            una vez completado, <InlineCode>output</InlineCode> con columnas y filas.
            Cancela con <InlineCode>{"POST /catches/{catch_id}/cancel"}</InlineCode>. Consulta{" "}
            <DocLink href="/es/documentacion/nets">Nets</DocLink>.
          </p>
        </DocCard>

        {/* ── Revisión Humana ── */}
        <DocCard icon={<UserCheck size={24} />} title="Revisión Humana: aprueba o rechaza">
          <p>
            Los elementos en pausa para revisión se pueden aprobar o rechazar desde tus propias
            herramientas. Solo puede hacerlo un revisor configurado de ese Flow, Matcher, Inspector o
            Filler (si no, 403), y el elemento debe estar en <InlineCode>awaiting_approval</InlineCode>{" "}
            (si no, 409). Estos endpoints están abiertos al rol Solo HITL.
          </p>
          <DataTable
            head={["Endpoint", "Cuerpo"]}
            rows={[
              ["POST /runs/{run_id}/hitl/approve", "output_json (obligatorio): las filas finales; diff (lista opcional de ediciones). 400 con missing_fields si falta un campo obligatorio de entrada humana."],
              ["POST /matches/{match_id}/hitl/approve", "groups (la agrupación final), excluded, diff."],
              ["POST /inspections/{inspection_id}/hitl/approve", "waivers (item_id y reason de cada punto fallido que se dispensa), diff."],
              ["POST /fills/{fill_id}/hitl/approve", "values (valores de campos por plantilla), diff, allow_missing_human_fields."],
              [".../hitl/reject", "Las mismas rutas terminadas en /hitl/reject, con un reason opcional."],
            ]}
          />
          <CodeBlock lang="Solicitud" code={HITL_RUN_APPROVE_REQUEST} />
          <p>
            Aprobar reanuda la entrega (webhook, correo, Bucket). Rechazar un run lo cancela.
            Consulta <DocLink href="/es/documentacion/revision-humana">Revisión Humana</DocLink>.
          </p>
        </DocCard>

        {/* ── API key ── */}
        <DocCard icon={<KeyRound size={24} />} title="Endpoints de la API key">
          <DataTable
            head={["Endpoint", "Qué hace"]}
            rows={[
              ["GET /me/api-key", "Devuelve tu key para la organización."],
              ["POST /me/api-key/regenerate", "Emite una key nueva e invalida la anterior al instante. Actualiza todas tus integraciones."],
            ]}
          />
          <CodeBlock lang="Respuesta 200" code={API_KEY_RESPONSE} />
        </DocCard>
      </div>

      {/* ── Pestaña Sin código ── */}
      <div role="tabpanel" aria-label="Sin código" className={apiTab === "no-code" ? undefined : "hidden"}>
        <DocCard icon={<Star size={24} />} title="Herramientas de automatización">
          <p>
            No necesitas escribir código para conectar Tavnit con tus flujos de trabajo. Cualquier
            plataforma de automatización que pueda enviar una solicitud HTTP puede iniciar trabajo en
            Tavnit, y cualquiera que pueda recibir un webhook puede recoger los resultados.
          </p>
          <InfoBox color="purple" icon={<CircleDot size={20} />} title="Make">
            Escenarios visuales: un módulo HTTP llama a Tavnit y un Custom webhook recibe los
            resultados.
          </InfoBox>
          <InfoBox color="yellow" icon={<Zap size={20} />} title="Zapier">
            Webhooks by Zapier: Catch Hook recibe los resultados y una acción POST inicia runs.
          </InfoBox>
          <InfoBox color="green" icon={<CircleDot size={20} />} title="n8n">
            En tu servidor o en la nube: un nodo Webhook recibe los resultados y un nodo HTTP
            Request inicia runs.
          </InfoBox>
          <InfoBox color="blue" icon={<CircleDot size={20} />} title="Power Automate">
            Una acción HTTP llama a la API de la misma forma.
          </InfoBox>
          <p>
            Cada solicitud necesita el encabezado <InlineCode>X-API-Key</InlineCode> con tu key de{" "}
            <strong>Integraciones</strong>.
          </p>
        </DocCard>

        <DocCard icon={<Webhook size={24} />} title="Recibe los resultados en tu automatización">
          <NumberedList
            items={[
              "En tu plataforma, crea un disparador de webhook (Make: Custom webhook; Zapier: Webhooks by Zapier → Catch Hook; n8n: nodo Webhook, POST) y copia su URL.",
              "En Tavnit, pégala como webhook de un Flow (panel Webhook) o de un nodo Salida de un Pipeline.",
              "Procesa un documento para que la plataforma aprenda el payload y luego mapea los campos a Sheets, un CRM, un ERP, etc.",
            ]}
          />
          <p>
            El payload se describe en la{" "}
            <DocLink href="/es/documentacion/webhooks">página de webhooks</DocLink>.
          </p>
        </DocCard>

        <DocCard icon={<CircleDot size={24} />} title="Integración con Make">
          <p>
            Make (antes Integromat) es una plataforma de automatización visual que te permite
            conectar apps y automatizar flujos de trabajo sin escribir código.
          </p>
          <a
            href="https://www.make.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-2 transition-colors text-sm font-medium mt-1"
          >
            Visita Make <ExternalLink size={14} />
          </a>
        </DocCard>

        <DocCard icon={<Layers size={24} />} title="Primeros pasos con Make">
          <NumberedList
            items={[
              "Ve a make.com y crea una cuenta",
              'Haz clic en "Create a new scenario" desde tu panel',
              "Verás un lienzo en blanco donde puedes agregar módulos",
              'Busca "HTTP" y agrega el módulo "Make a request"',
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="¿Qué es un escenario?">
            Un escenario es un flujo de trabajo automatizado en Make. Está formado por módulos (apps)
            conectados entre sí. Cuando un módulo se activa o recibe datos, se los pasa al siguiente
            módulo.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Configura el módulo HTTP">
          <p>
            Después de agregar el módulo HTTP, configúralo para enviar documentos a Tavnit. Puedes
            usar cualquiera de estos dos enfoques:
          </p>

          <h3 className="text-base font-semibold text-accent mt-6 mb-3">
            Opción 1: multipart/form-data (cuando tienes un objeto de archivo)
          </h3>
          <NumberedList
            items={[
              'Agrega un módulo HTTP "Make a request" a tu escenario',
              <Fragment key="f14">
                Configura la solicitud:
                <BulletList
                  items={[
                    <>URL: <InlineCode>https://run.tavnit.io/api/runs/process</InlineCode></>,
                    "Método: POST",
                  ]}
                />
              </Fragment>,
              <Fragment key="f15">
                En la pestaña Headers, agrega:
                <BulletList
                  items={[
                    "Nombre del encabezado: X-API-Key",
                    "Valor del encabezado: YOUR_API_KEY",
                  ]}
                />
              </Fragment>,
              'Configura el tipo de Body como "multipart/form-data"',
              <Fragment key="f16">
                Agrega los campos del formulario:
                <BulletList
                  items={[
                    "flow_id: YOUR_FLOW_ID",
                    "file: (mapéalo desde el módulo anterior)",
                    "source: api (opcional)",
                  ]}
                />
              </Fragment>,
              "Ejecuta tu escenario para probarlo",
            ]}
          />

          <h3 className="text-base font-semibold text-[#6c42f0] mt-8 mb-3">
            Opción 2: JSON + base64 (cuando tienes una cadena base64)
          </h3>
          <p>Si el módulo anterior entrega una cadena base64 en lugar de un archivo, usa este enfoque:</p>
          <NumberedList
            items={[
              'Configura el tipo de Body como "Raw" y selecciona "JSON (application/json)"',
              <Fragment key="f17">
                En la pestaña Headers, agrega también:
                <BulletList
                  items={[
                    "Nombre del encabezado: Content-Type",
                    "Valor del encabezado: application/json",
                  ]}
                />
              </Fragment>,
              "Define el cuerpo JSON así:",
            ]}
          />
          <CodeBlock lang="JSON" code={JSON_BODY_EXAMPLE} />

          <InfoBox color="blue" icon={<Info size={20} />} title="Cómo mapear el contenido base64">
            Reemplaza {"{{previous_module.base64_content}}"} por el mapeo real de tu módulo anterior.
            En Make, haz clic en el campo y selecciona la salida base64 del módulo que entrega tu
            archivo. Conserva la extensión en filename: Tavnit la usa para detectar el tipo de
            archivo.
          </InfoBox>
          <p>
            La llamada responde de inmediato con un <InlineCode>run_id</InlineCode>. Los datos
            extraídos llegan después al webhook del Flow, o puedes pedirlos con un segundo módulo
            HTTP que llame a{" "}
            <InlineCode>{"GET https://run.tavnit.io/api/runs/{run_id}"}</InlineCode>.
          </p>
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Otras plataformas (Zapier, Power Automate, n8n)">
          <p>El mismo enfoque funciona con cualquier plataforma de automatización que admita solicitudes HTTP:</p>
          <InfoBox color="purple" icon={<Paperclip size={20} />} title="Si tu plataforma te da un objeto de archivo">
            Usa multipart/form-data con un campo &ldquo;file&rdquo; que contenga el archivo, más el campo flow_id.
          </InfoBox>
          <InfoBox color="violet" icon={<Code2 size={20} />} title="Si tu plataforma te da una cadena base64">
            Usa un cuerpo JSON con flow_id, filename y file_base64 (el contenido base64 del paso anterior).
          </InfoBox>
          <p>
            Ambos métodos llaman al mismo endpoint y producen los mismos resultados de extracción.
            Para procesar archivos que llegan a Google Drive, OneDrive o Dropbox, dispara con
            &ldquo;Nuevo archivo en carpeta&rdquo; y envía el archivo por POST de la misma forma.
          </p>
        </DocCard>

        <DocCard icon={<FolderInput size={24} />} title="Uso de la API de Colecciones">
          <p>
            Si recibes distintos tipos de documento y quieres que la IA dirija cada uno al Flow
            correcto, llama a la Colección en lugar de a un Flow.
          </p>
          <BulletList
            items={[
              <Fragment key="f18">URL: <InlineCode>https://run.tavnit.io/api/collections/process</InlineCode></Fragment>,
              <Fragment key="f19">Usa <InlineCode>collection_id</InlineCode> en lugar de <InlineCode>flow_id</InlineCode></Fragment>,
            ]}
          />
          <CodeBlock lang="JSON" code={COLLECTIONS_JSON_EXAMPLE} />
        </DocCard>

        <DocCard icon={<Split size={24} />} title="Uso de la API de Splitters">
          <p>
            Si recibes PDFs combinados con varios documentos y necesitas separarlos, llama al
            Splitter.
          </p>
          <BulletList
            items={[
              <Fragment key="f22">URL: <InlineCode>https://run.tavnit.io/api/splits/run</InlineCode></Fragment>,
              <Fragment key="f23">Usa <InlineCode>splitter_id</InlineCode> en lugar de <InlineCode>flow_id</InlineCode></Fragment>,
            ]}
          />
          <CodeBlock lang="JSON" code={SPLITTERS_JSON_EXAMPLE} />
        </DocCard>

        <DocCard icon={<Route size={24} />} title="Inicia un Pipeline">
          <p>
            Para ejecutar un Pipeline completo en lugar de un solo Flow, envía el archivo por POST
            (<InlineCode>file</InlineCode> multipart, o JSON con <InlineCode>file_base64</InlineCode>{" "}
            + <InlineCode>filename</InlineCode>) a{" "}
            <InlineCode>https://run.tavnit.io/api/pipelines/YOUR_PIPELINE_ID/execute</InlineCode>{" "}
            con el mismo encabezado. El ID del Pipeline va en la URL.
          </p>
        </DocCard>

        <DocCard icon={<Wand2 size={24} />} title="Uso de la API de Cleaners">
          <p>
            Para limpiar filas de datos desde tu automatización, envíalas como JSON al Cleaner. Un
            archivo de hoja de cálculo va, en cambio, a{" "}
            <InlineCode>https://run.tavnit.io/api/sweeps/run</InlineCode> como multipart con{" "}
            <InlineCode>cleaner_id</InlineCode> (ese endpoint no acepta base64).
          </p>
          <BulletList
            items={[
              <Fragment key="f20">URL: <InlineCode>https://run.tavnit.io/api/cleaners/YOUR_CLEANER_ID/process</InlineCode></Fragment>,
              "Método: POST, Content-Type: application/json",
            ]}
          />
          <CodeBlock lang="JSON" code={CLEANERS_JSON_EXAMPLE} />
        </DocCard>

        <DocCard icon={<Database size={24} />} title="Uso de la API de Buckets">
          <p>
            Para enviar filas a un Bucket sin mandar un documento, usa el endpoint de escritura. Cada
            fila debe incluir todas las columnas del Bucket.
          </p>
          <BulletList
            items={[
              <Fragment key="f24">URL: <InlineCode>https://run.tavnit.io/api/buckets/write</InlineCode></Fragment>,
              "Método: POST, Content-Type: application/json",
              <Fragment key="f25">Encabezado: <InlineCode>X-API-Key: YOUR_API_KEY</InlineCode></Fragment>,
            ]}
          />
          <CodeBlock lang="JSON" code={BUCKETS_JSON_EXAMPLE} />
          <InfoBox color="purple" icon={<Info size={20} />} title="Dónde encontrar el ID y el nombre del Bucket">
            Abre la página de detalle del Bucket y toca el ícono de información. Ambos valores se copian con un solo toque.
          </InfoBox>
        </DocCard>

        <DocCard icon={<ClipboardCheck size={24} />} title="Otras funciones">
          <p>
            Agentes, Matchers, Inspectores, Fillers, Signals, Subjects y Nets se inician de la misma
            forma: una solicitud HTTP con el encabezado <InlineCode>X-API-Key</InlineCode>. Cambia a
            la pestaña <strong>Código</strong> para ver los campos de cada endpoint.
          </p>
        </DocCard>
      </div>

      <Related
        links={[
          {
            href: "/es/documentacion/webhooks",
            label: "Recibe resultados con webhooks",
            description: "El payload que Tavnit envía cuando un run termina y cómo construir un receptor.",
          },
          {
            href: "/es/documentacion/conector-mcp",
            label: "Conecta un asistente de IA con el conector MCP",
            description: "Usa Tavnit desde claude.ai, Cursor u otro cliente MCP.",
          },
          {
            href: "/es/documentacion/roles-de-usuario",
            label: "Roles de usuario y permisos",
            description: "Por qué una key Solo HITL puede revisar pero no procesar.",
          },
        ]}
      />
    </section>
  );
}
