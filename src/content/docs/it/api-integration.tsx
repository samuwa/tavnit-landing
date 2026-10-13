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

/**
 * /it/docs/api-integration — translated from components/docs/ApiIntegrationContent.tsx.
 * A client module (tab and language state), so it exports no `schema`; the
 * English page has none either. Code samples are shared and stay English.
 */

type ApiTab = "code" | "no-code";
type Lang = "python" | "javascript";

/* The app deep-links to the No-Code tab with #no-code. Reading the hash
 * through an external store keeps the server render on "code" (no hydration
 * mismatch) and also follows later hash changes. */
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


const FIELD_HEAD = ["Campo", "Obbligatorio", "Descrizione"];

export default function ApiIntegrationIt() {
  const hashNoCode = useSyncExternalStore(subscribeHash, hashIsNoCode, serverHash);
  const [chosenTab, setChosenTab] = useState<ApiTab | null>(null);
  const apiTab: ApiTab = chosenTab ?? (hashNoCode ? "no-code" : "code");
  const [lang, setLang] = useState<Lang>("python");

  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        Integrazione API
      </h1>

      {/* Sub-tabs */}
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
          Code
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
          No-Code
        </button>
      </div>

      {/* ── Code tab ── */}
      <div role="tabpanel" aria-label="Code" className={apiTab === "code" ? undefined : "hidden"}>
        <DocCard icon={<Info size={24} />} title="Come funziona l'API">
          <p>
            L&apos;API REST di Tavnit permette al tuo codice di fare ciò che fai nell&apos;app:
            inviare documenti a un Flow, una Collection, uno Splitter o una Pipeline, eseguire
            Cleaners, Matchers, Inspectors, Fillers, Signals e Agents, leggere e scrivere Buckets,
            gestire i casi di un Subject e approvare o rifiutare le revisioni umane.
          </p>
          <BulletList
            items={[
              <Fragment key="b0">
                URL di base: <InlineCode>https://run.tavnit.io/api</InlineCode>. Ogni percorso qui
                sotto è relativo a questo URL.
              </Fragment>,
              <Fragment key="b1">
                Ogni richiesta porta la tua chiave API nell&apos;header{" "}
                <InlineCode>X-API-Key</InlineCode>.
              </Fragment>,
              <Fragment key="b2">
                L&apos;elaborazione è asincrona. Gli endpoint che avviano un lavoro rispondono subito{" "}
                <strong>202 Accepted</strong> con un ID e il lavoro prosegue in background. Ottieni il
                risultato con il polling (Run, Run degli Agent, Catch, casi) oppure tramite un{" "}
                <DocLink href="/docs/webhooks">webhook</DocLink> configurato sulla funzionalità.
              </Fragment>,
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Funzionalità in Beta">
            Pipelines, Subjects, Matchers, Inspectors, Fillers, Signals e Nets sono in Beta. I loro
            endpoint funzionano già oggi, ma alcuni dettagli possono ancora cambiare.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Lock size={24} />} title="Autenticazione e ID">
          <h3 className="text-base font-semibold text-fg-2 mt-2 mb-1">Chiave API</h3>
          <p>
            Apri <strong>Integrazioni</strong> nella barra laterale dell&apos;app. La scheda{" "}
            <strong>Chiave API</strong> mostra la tua chiave (lì puoi visualizzarla e copiarla).
            Ogni membro ha la propria chiave in ogni organizzazione, e una richiesta agisce come
            quel membro in quell&apos;organizzazione.
          </p>
          <WarningBox>
            Tieni segreta la tua chiave API. <strong>Rigenera</strong>, nella stessa scheda, invalida
            subito la chiave attuale, e tutto ciò che la usa ancora smette di funzionare.
          </WarningBox>
          <p>Una richiesta senza una chiave valida riceve:</p>
          <CodeBlock
            lang="401"
            code={`{
  "success": false,
  "error": "Authentication required",
  "message": "Please provide a valid X-API-Key header"
}`}
          />

          <h3 className={H3}>Ruoli</h3>
          <p>
            La chiave porta con sé il tuo ruolo. I membri con il ruolo <strong>Solo HITL</strong>{" "}
            possono usare solo gli endpoint di approvazione e rifiuto delle revisioni umane e gli
            endpoint della chiave API. Ogni endpoint di elaborazione e di dati li respinge con{" "}
            <strong>403</strong> e <InlineCode>Your role only permits HITL reviews</InlineCode>.
            Vedi <DocLink href="/docs/user-roles">ruoli utente</DocLink>.
          </p>

          <h3 className={H3}>ID</h3>
          <p>
            Ogni Flow, Collection, Splitter, Cleaner, Bucket, Agent, Matcher, Inspector, Filler e
            Pipeline mostra il proprio ID nella pagina di dettaglio, con un pulsante per copiarlo. Le
            risorse devono appartenere all&apos;organizzazione della tua chiave: l&apos;ID di
            un&apos;altra organizzazione riceve 403 o 404.
          </p>
        </DocCard>

        <DocCard icon={<Download size={24} />} title="Inviare file">
          <p>Gli endpoint che ricevono un documento lo accettano in uno di due modi:</p>
          <InfoBox color="purple" icon={<Paperclip size={20} />} title="Caricamento file multipart">
            Invia il file come multipart/form-data in un campo chiamato file, con gli altri campi
            come campi del modulo. Funziona su ogni endpoint che riceve file.
          </InfoBox>
          <InfoBox color="violet" icon={<Code2 size={20} />} title="Base64 in un body JSON">
            Invia un JSON con file_base64 (il contenuto del file) e filename (con l&apos;estensione),
            più gli altri campi. Utile quando uno strumento di automazione ti fornisce base64 invece
            di un file.
          </InfoBox>
          <DataTable
            head={["Endpoint", "Base64", "File accettati"]}
            rows={[
              ["POST /runs/process", "Sì", "PDF, immagini (PNG, JPG, JPEG, JFIF, TIF, TIFF, WEBP, BMP, GIF), fogli di calcolo (XLSX, XLS, CSV)"],
              ["POST /collections/process", "Sì", "Come per i Run"],
              ["POST /splits/run", "Sì", "Come per i Run"],
              ["POST /pipelines/{id}/execute", "Sì", "PDF e immagini"],
              ["POST /signals/{id}/run", "Sì", "Audio: MP3, MP4, MPEG, MPGA, M4A, WAV, WEBM"],
              ["POST /sweeps/run", "No", "Fogli di calcolo: CSV, XLSX, XLS"],
              ["Inspectors, Fillers, Subjects e casi", "No", "Il documento come file multipart"],
            ]}
          />
          <p>
            Una singola richiesta può arrivare a 150 MB. Il tipo di file viene ricavato
            dall&apos;estensione del nome del file.
          </p>
        </DocCard>

        <DocCard icon={<ListChecks size={24} />} title="Risposte ed errori">
          <p>
            Le risposte sono JSON con un flag <InlineCode>success</InlineCode>. Gli errori portano
            una stringa <InlineCode>error</InlineCode>, a volte un <InlineCode>message</InlineCode>,
            e chiavi aggiuntive che spiegano il problema:
          </p>
          <CodeBlock lang="Esempio 409" code={API_ERROR_EXAMPLE} />
          <DataTable
            head={["Stato", "Significato"]}
            rows={[
              ["200 / 201", "Fatto (letture, annullamenti, approvazioni) / creato (casi, compilazioni, ispezioni)."],
              ["202", "Accettato: il lavoro è in coda. Conserva l'ID restituito."],
              ["400", "Un campo obbligatorio manca o non è valido, il tipo di file non è supportato, oppure la risorsa è inattiva o non configurata."],
              ["401", "X-API-Key mancante o non valida."],
              ["402", "La tua organizzazione al momento non può avviare nuovi lavori; contatta il team di Tavnit."],
              ["403", "La risorsa appartiene a un'altra organizzazione, il tuo ruolo è Solo HITL, oppure non sei revisore di quell'elemento."],
              ["404", "L'ID non esiste nella tua organizzazione."],
              ["409", "Conflitto con lo stato attuale: nome del Bucket non corrispondente, già annullato o terminato, caso chiuso, slot già occupato."],
              ["429", "Troppi Run già in attesa per un Agent."],
              ["500", "Errore imprevisto. Puoi riprovare più tardi senza rischi."],
            ]}
          />
        </DocCard>

        <DocCard icon={<Layers size={24} />} title="Riferimento degli endpoint">
          <DataTable
            head={["Funzionalità", "Metodo e percorso", "Cosa fa"]}
            rows={[
              ["Flows", "POST /runs/process", "Estrae un documento con un Flow"],
              ["Flows", "GET /runs/{run_id}", "Stato del Run e dati estratti"],
              ["Flows", "GET /runs/{run_id}/source-file", "Il documento originale"],
              ["Collections", "POST /collections/process", "L'AI instrada un documento al Flow o allo Splitter giusto"],
              ["Collections", "GET /collection-runs/{id}/source-file", "Il documento originale"],
              ["Splitters", "POST /splits/run", "Divide un file con più documenti"],
              ["Splitters", "GET /splits/{split_id}/source-file", "Il pacchetto originale"],
              ["Cleaners", "POST /sweeps/run", "Esegue uno sweep su un foglio di calcolo"],
              ["Cleaners", "POST /cleaners/{cleaner_id}/process", "Esegue uno sweep su righe inviate come JSON"],
              ["Buckets", "POST /buckets/write", "Aggiunge o sostituisce righe"],
              ["Buckets", "GET /buckets/read", "Legge le righe, con paginazione"],
              ["Agents", "POST /bots/{agent_id}/runs", "Avvia un Run di un Agent"],
              ["Agents", "GET /bot-runs/{bot_run_id}", "Interroga un Run di un Agent"],
              ["Agents", "GET /bots/{agent_id}/runs", "Elenca i Run di un Agent"],
              ["Agents", "POST /bot-runs/{bot_run_id}/cancel", "Annulla un Run di un Agent"],
              ["Matchers", "POST /matchers/{matcher_id}/run", "Confronta Run completati"],
              ["Inspectors", "POST /inspectors/{inspector_id}/process", "Aggiunge un documento a un'ispezione"],
              ["Fillers", "POST /fillers/{filler_id}/fills", "Apre una compilazione e aggiunge documenti"],
              ["Pipelines", "POST /pipelines/{pipeline_id}/execute", "Esegue una Pipeline"],
              ["Signals", "POST /signals/{signal_id}/run", "Struttura un file audio (un Wave)"],
              ["Subjects", "POST /subjects/{subject_id}/process", "Instrada un documento a un caso"],
              ["Nets", "POST /nets/{net_id}/catch", "Avvia un Catch"],
              ["Revisione umana", "POST /runs/{run_id}/hitl/approve", "Approva o rifiuta elementi in pausa"],
              ["Chiave API", "GET /me/api-key", "Legge o rigenera la tua chiave"],
            ]}
          />
          <p>Ogni funzionalità è descritta in dettaglio qui sotto, con i suoi altri endpoint.</p>
        </DocCard>

        {/* ── Flows ── */}
        <DocCard icon={<FileText size={24} />} title="Flows: elaborare un documento">
          <p>Invia un documento a un Flow. Tavnit crea un Run e lo estrae in background.</p>
          <Endpoint method="POST" path="/runs/process" />
          <DataTable
            head={FIELD_HEAD}
            rows={[
              ["flow_id", "Sì", "Il Flow che estrae il documento."],
              ["file", "Sì*", "Il documento (multipart)."],
              ["file_base64 + filename", "Sì*", "Al posto di file: il contenuto in base64 e il nome del file con l'estensione."],
              ["content_type", "No", "Tipo MIME di un file in base64."],
              ["source", "No", "Etichetta salvata sul Run: api (predefinita), email, manual_upload o collection."],
            ]}
            caption="* Invia file oppure file_base64 + filename."
          />
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python" code={PYTHON_CODE} />
          ) : (
            <CodeBlock lang="JavaScript" code={JAVASCRIPT_CODE} />
          )}
          <CodeBlock lang="Risposta 202" code={RUN_PROCESS_RESPONSE} />
          <p>
            Errori: 400 (nessun file, nessun flow_id, file non supportato o non valido), 403 (Flow
            di un&apos;altra organizzazione), 404 (Flow non trovato). Quando può, una richiesta
            respinta crea comunque un Run fallito e ne restituisce il{" "}
            <InlineCode>run_id</InlineCode>, così puoi trovarlo in <strong>Runs</strong>.
          </p>

          <h3 className={H3}>Ottenere il Run e i suoi dati</h3>
          <Endpoint method="GET" path="/runs/{run_id}" />
          <p>
            Interroga finché <InlineCode>status</InlineCode> non è terminale. Stati:{" "}
            <InlineCode>queued</InlineCode>, <InlineCode>running</InlineCode>,{" "}
            <InlineCode>awaiting_approval</InlineCode> (in pausa per la{" "}
            <DocLink href="/docs/human-in-the-loop">revisione umana</DocLink>),{" "}
            <InlineCode>completed</InlineCode>, <InlineCode>failed</InlineCode> e{" "}
            <InlineCode>cancelled</InlineCode>. <InlineCode>data</InlineCode> contiene le righe
            estratte e resta <InlineCode>null</InlineCode> finché il Run non è completato, anche
            mentre attende l&apos;approvazione. Quando <InlineCode>columns</InlineCode> è presente,
            usalo per l&apos;ordine delle colonne. <InlineCode>attempt</InlineCode> e{" "}
            <InlineCode>previous_attempts</InlineCode> mostrano i tentativi automatici. Aggiungi{" "}
            <InlineCode>?include_document=true</InlineCode> per ottenere anche un link firmato al
            file originale. Funziona per ogni Run, compresi quelli creati da Collections, Splitters,
            Pipelines ed email.
          </p>
          <CodeBlock lang="Risposta 200" code={RUN_GET_RESPONSE} />
          {lang === "python" ? (
            <CodeBlock lang="Python (invio e polling)" code={PYTHON_RUN_POLL_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (invio e polling)" code={JAVASCRIPT_RUN_POLL_CODE} />
          )}

          <h3 className={H3}>Ottenere il documento originale</h3>
          <Endpoint method="GET" path="/runs/{run_id}/source-file" />
          <p>
            Restituisce un URL firmato al file così come è stato caricato, qualunque sia lo stato
            del Run. Il parametro facoltativo <InlineCode>expires_in</InlineCode> imposta la durata
            del link in secondi (da 60 a 604800, predefinito 7 giorni). Con{" "}
            <InlineCode>?download=true</InlineCode> la risposta è il file stesso.
          </p>
          <CodeBlock lang="Risposta 200" code={SOURCE_FILE_RESPONSE} />
        </DocCard>

        {/* ── Collections ── */}
        <DocCard icon={<FolderInput size={24} />} title="Collections: lascia che l'AI instradi il documento">
          <p>
            Invia un documento senza scegliere il Flow: l&apos;AI sceglie il Flow o lo Splitter
            migliore della Collection. Usala quando ricevi tipi di documenti diversi.
          </p>
          <Endpoint method="POST" path="/collections/process" />
          <p>
            Stesso body di <InlineCode>/runs/process</InlineCode>, con{" "}
            <InlineCode>collection_id</InlineCode> al posto di <InlineCode>flow_id</InlineCode> (oppure
            metti l&apos;ID nel percorso:{" "}
            <InlineCode>{"/collections/{collection_id}/process"}</InlineCode>). La Collection deve
            essere attiva e avere almeno un Flow o uno Splitter attivo, altrimenti la chiamata
            risponde 400.
          </p>
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python (Collections)" code={PYTHON_COLLECTIONS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Collections)" code={JAVASCRIPT_COLLECTIONS_CODE} />
          )}
          <CodeBlock lang="Risposta 202" code={COLLECTION_PROCESS_RESPONSE} />
          <p>
            Il Flow scelto crea un normale Run, e il payload del suo webhook include{" "}
            <InlineCode>collection_run_id</InlineCode>, così puoi associare il risultato alla tua
            richiesta. L&apos;originale è disponibile subito su{" "}
            <InlineCode>{"GET /collection-runs/{collection_run_id}/source-file"}</InlineCode> (stesse
            opzioni del file sorgente di un Run). Vedi{" "}
            <DocLink href="/docs/collections">Collections</DocLink>.
          </p>
        </DocCard>

        {/* ── Splitters ── */}
        <DocCard icon={<Split size={24} />} title="Splitters: dividere un file con più documenti">
          <p>
            Invia un file che contiene più documenti. Lo Splitter trova dove inizia e finisce
            ciascuno, lo classifica e invia ogni parte dove indica il suo tipo di documento.
          </p>
          <Endpoint method="POST" path="/splits/run" />
          <p>
            Stesso body di <InlineCode>/runs/process</InlineCode>, con{" "}
            <InlineCode>splitter_id</InlineCode>.
          </p>
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python (Splitters)" code={PYTHON_SPLITTERS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Splitters)" code={JAVASCRIPT_SPLITTERS_CODE} />
          )}
          <CodeBlock lang="Risposta 202" code={SPLIT_RUN_RESPONSE} />
          <p>
            Le parti inviate ai Flow diventano Run a sé, e i loro webhook portano{" "}
            <InlineCode>split_id</InlineCode>. Il pacchetto originale si trova su{" "}
            <InlineCode>{"GET /splits/{split_id}/source-file"}</InlineCode>. Vedi{" "}
            <DocLink href="/docs/splitters">Splitters</DocLink>.
          </p>
        </DocCard>

        {/* ── Cleaners ── */}
        <DocCard icon={<Wand2 size={24} />} title="Cleaners: eseguire uno sweep">
          <p>
            Uno sweep esegue un Cleaner su righe di dati per normalizzare, classificare, cercare o
            arricchire i valori. Invia le righe come foglio di calcolo o come JSON.
          </p>
          <Endpoint method="POST" path="/sweeps/run" />
          <DataTable
            head={FIELD_HEAD}
            rows={[
              ["cleaner_id", "Sì", "Il Cleaner da eseguire."],
              ["file", "Sì", "CSV, XLSX o XLS, solo multipart. Intestazioni nella prima riga; ogni campo base richiesto dal Cleaner deve essere una colonna, senza duplicati."],
              ["sheet_name", "No", "Quale foglio della cartella di lavoro leggere (predefinito: il primo)."],
            ]}
          />
          <Endpoint method="POST" path="/cleaners/{cleaner_id}/process" />
          <p>
            Invia un JSON con <InlineCode>rows</InlineCode> (un array di oggetti), oppure un{" "}
            <InlineCode>file</InlineCode> multipart come sopra.
          </p>
          <CodeBlock lang="Body JSON" code={CLEANERS_JSON_EXAMPLE} />
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python (Cleaners)" code={PYTHON_CLEANERS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Cleaners)" code={JAVASCRIPT_CLEANERS_CODE} />
          )}
          <CodeBlock lang="Risposta 202" code={SWEEP_RUN_RESPONSE} />
          <p>
            Un Cleaner con una configurazione non valida risponde 400 con{" "}
            <InlineCode>validation_errors</InlineCode>. Vedi{" "}
            <DocLink href="/docs/cleaners">Cleaners</DocLink>.
          </p>
        </DocCard>

        {/* ── Buckets ── */}
        <DocCard icon={<Database size={24} />} title="Buckets: scrivere e leggere righe">
          <p>
            Inserisci righe in un Bucket dai tuoi sistemi, oppure leggi ciò che i tuoi Flow vi hanno
            salvato. Trovi l&apos;ID e il nome del Bucket toccando l&apos;icona delle informazioni
            nella pagina del Bucket. Il nome è un controllo di sicurezza: se non corrisponde
            all&apos;ID, la chiamata risponde <strong>409</strong>.
          </p>
          <Endpoint method="POST" path="/buckets/write" />
          <DataTable
            head={FIELD_HEAD}
            rows={[
              ["bucket_id", "Sì", "Il Bucket."],
              ["bucket_name", "Sì", "Il suo nome esatto."],
              ["overwrite", "Sì", "Booleano. false aggiunge le righe; true sostituisce tutte le righe esistenti."],
              ["rows", "Sì", "Array di oggetti, fino a 50.000 per richiesta."],
            ]}
          />
          <p>
            Invia il body come <InlineCode>application/json</InlineCode>. Ogni riga deve avere
            esattamente le colonne del Bucket, per nome della colonna o nome visualizzato: una
            colonna mancante o sconosciuta interrompe l&apos;intera scrittura con 400, elencando{" "}
            <InlineCode>missing_columns</InlineCode> e <InlineCode>extra_columns</InlineCode>.
          </p>
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python (Buckets)" code={PYTHON_BUCKETS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Buckets)" code={JAVASCRIPT_BUCKETS_CODE} />
          )}
          <CodeBlock lang="Risposta 202" code={BUCKET_WRITE_RESPONSE} />

          <h3 className={H3}>Leggere le righe</h3>
          <Endpoint method="GET" path="/buckets/read" />
          <p>
            Parametri di query: <InlineCode>bucket_id</InlineCode> e{" "}
            <InlineCode>bucket_name</InlineCode> (obbligatori), <InlineCode>limit</InlineCode> (da 1
            a 1000, predefinito 100) e <InlineCode>offset</InlineCode> (predefinito 0). Scorri le
            pagine con <InlineCode>offset</InlineCode> finché <InlineCode>has_more</InlineCode> è
            true; <InlineCode>total_count</InlineCode> conta tutte le righe. Le chiavi di{" "}
            <InlineCode>data</InlineCode> di ogni riga sono i nomi delle colonne; usa{" "}
            <InlineCode>columns</InlineCode> per i nomi visualizzati. I link ai file salvati tornano
            come nuovi URL firmati.
          </p>
          <CodeBlock lang="Richiesta" code={BUCKET_READ_REQUEST} />
          <CodeBlock lang="Risposta 200" code={BUCKET_READ_RESPONSE} />
          <p>
            Vedi <DocLink href="/docs/buckets">Buckets</DocLink>.
          </p>
        </DocCard>

        {/* ── Agents ── */}
        <DocCard icon={<Bot size={24} />} title="Agents: avviare e interrogare i Run">
          <p>
            Avvia un Agent dal tuo codice e raccogli ciò che ha catturato. Gli Agents vengono
            abilitati per organizzazione su richiesta: contatta il supporto per attivarli.
          </p>
          <Endpoint method="POST" path="/bots/{agent_id}/runs" />
          <p>
            Il JSON facoltativo <InlineCode>{'{"inputs": {...}}'}</InlineCode> sostituisce le
            variabili di input dell&apos;Agent per questo Run. Vengono usate solo le variabili che
            l&apos;Agent dichiara, e i valori segreti non vengono mai accettati. Puoi anche chiamare{" "}
            <InlineCode>POST /bots/runs</InlineCode> con <InlineCode>bot_id</InlineCode> nel body.
            Ogni chiamata avvia un nuovo Run.
          </p>
          <CodeBlock lang="Richiesta" code={AGENT_TRIGGER_REQUEST} />
          <p>
            <InlineCode>status</InlineCode> è <InlineCode>queued</InlineCode>, oppure{" "}
            <InlineCode>waiting</InlineCode> quando l&apos;Agent esegue un Run alla volta ed è
            occupato (parte da solo quando arriva il suo turno). 409 quando l&apos;Agent è
            archiviato, 429 quando troppi Run sono già in attesa.
          </p>

          <h3 className={H3}>Interrogare, elencare e annullare</h3>
          <DataTable
            head={["Endpoint", "Cosa fa"]}
            rows={[
              ["GET /bot-runs/{bot_run_id}", "Un Run: stato, tempi, input (senza i segreti) e output con link firmati ai file. Disponibile anche su GET /bots/{agent_id}/runs/{bot_run_id}."],
              ["GET /bots/{agent_id}/runs", "Dal più recente, senza input e output. Query: status (queued, running, completed, failed, cancelled), limit (da 1 a 100, predefinito 20), offset. Restituisce runs e total."],
              ["POST /bot-runs/{bot_run_id}/cancel", "Annulla un Run in attesa, in coda o in esecuzione. 409 quando il Run è già terminato. Disponibile anche su POST /bots/{agent_id}/runs/{bot_run_id}/cancel."],
            ]}
          />
          <CodeBlock lang="GET /bot-runs/{bot_run_id}" code={AGENT_RUN_RESPONSE} />
          <p>
            Vedi <DocLink href="/docs/agents">Agents</DocLink>.
          </p>
        </DocCard>

        {/* ── Matchers ── */}
        <DocCard icon={<Target size={24} />} title="Matchers: confrontare i Run">
          <p>
            Confronta i Run completati del Flow del Matcher, per esempio fatture con ordini
            d&apos;acquisto.
          </p>
          <Endpoint method="POST" path="/matchers/{matcher_id}/run" />
          <DataTable
            head={FIELD_HEAD}
            rows={[
              ["run_ids", "Sì", "Due o più Run completati del Flow del Matcher."],
              ["benchmark_run_id", "In modalità benchmark", "Il Run con cui vengono confrontati gli altri."],
            ]}
          />
          <CodeBlock lang="Richiesta" code={MATCHER_RUN_REQUEST} />
          <p>
            Non esiste un endpoint API per leggere un confronto: ottieni il risultato tramite
            l&apos;output webhook o email del Matcher, oppure nell&apos;app. Vedi{" "}
            <DocLink href="/docs/matchers">Matchers</DocLink>.
          </p>
        </DocCard>

        {/* ── Inspectors ── */}
        <DocCard icon={<ShieldCheck size={24} />} title="Inspectors: verificare un insieme di documenti">
          <p>
            Un&apos;ispezione raccoglie documenti, instrada ciascuno in uno slot dell&apos;Inspector,
            lo estrae e valuta la checklist.
          </p>
          <Endpoint method="POST" path="/inspectors/{inspector_id}/process" />
          <p>
            <InlineCode>file</InlineCode> multipart. Senza <InlineCode>inspection_id</InlineCode>{" "}
            viene creata una nuova ispezione; passa l&apos;<InlineCode>inspection_id</InlineCode>{" "}
            restituito per aggiungervi altri documenti (deve essere ancora in fase di raccolta,
            altrimenti 409). L&apos;Inspector deve essere attivo.
          </p>
          <CodeBlock lang="Richiesta" code={INSPECTOR_PROCESS_REQUEST} />
          <DataTable
            head={["Endpoint", "Cosa fa"]}
            rows={[
              ["POST /inspectors/{inspector_id}/inspections", "Crea un'ispezione vuota (201) a cui aggiungere documenti in seguito."],
              ["POST /inspections/{inspection_id}/fire", "Interrompe la raccolta e valuta subito. 400 con missing_inputs quando uno slot obbligatorio non ha documenti."],
            ]}
          />
          <p>
            Il risultato arriva tramite l&apos;output webhook o email dell&apos;Inspector. Vedi{" "}
            <DocLink href="/docs/inspectors">Inspectors</DocLink>.
          </p>
        </DocCard>

        {/* ── Fillers ── */}
        <DocCard icon={<FileOutput size={24} />} title="Fillers: compilare moduli PDF">
          <p>
            Una compilazione raccoglie i documenti di cui un Filler ha bisogno, li estrae e scrive i
            valori nei modelli PDF del Filler.
          </p>
          <DataTable
            head={["Endpoint", "Cosa fa"]}
            rows={[
              ["POST /fillers/{filler_id}/fills", "Apre una compilazione (201, restituisce fill_id). Il Filler ha bisogno di un modello e delle mappature dei campi."],
              ["POST /fills/{fill_id}/route-upload", "File multipart; l'AI lo instrada in uno slot libero (202)."],
              ["POST /fills/{fill_id}/inputs/{input_id}/upload", "File multipart per uno slot specifico; avvia il Run di quello slot (202)."],
              ["POST /fills/{fill_id}/inputs/{input_id}/attach-run", "JSON run_id: riutilizza un Run completato per uno slot (202)."],
              ["POST /fills/{fill_id}/fire", "Compila subito invece di attendere tutti gli slot. 400 con missing_inputs quando uno slot obbligatorio è vuoto."],
              ["POST /fillers/{filler_id}/templates", "Aggiunge un modello PDF (file multipart, name facoltativo). Mappa i suoi campi nell'app."],
            ]}
          />
          <CodeBlock lang="Richiesta" code={FILLER_REQUEST} />
          <p>
            I PDF compilati arrivano tramite l&apos;output webhook o email del Filler. Vedi{" "}
            <DocLink href="/docs/fillers">Fillers</DocLink>.
          </p>
        </DocCard>

        {/* ── Pipelines ── */}
        <DocCard icon={<Route size={24} />} title="Pipelines: eseguire">
          <p>Avvia un&apos;esecuzione di una Pipeline con un documento.</p>
          <Endpoint method="POST" path="/pipelines/{pipeline_id}/execute" />
          <p>
            <InlineCode>file</InlineCode> multipart oppure <InlineCode>file_base64</InlineCode> +{" "}
            <InlineCode>filename</InlineCode>; PDF o immagine. 400 quando la Pipeline è inattiva o
            il suo grafo non può essere eseguito (con <InlineCode>validation_errors</InlineCode>).
          </p>
          <CodeBlock lang="Richiesta" code={PIPELINE_EXECUTE_REQUEST} />
          <p>
            Annulla con{" "}
            <InlineCode>{"POST /pipelines/executions/{execution_id}/cancel"}</InlineCode> (409 quando
            non è in esecuzione). I risultati escono dai nodi Output della Pipeline. Vedi{" "}
            <DocLink href="/docs/pipelines">Pipelines</DocLink>.
          </p>
        </DocCard>

        {/* ── Signals ── */}
        <DocCard icon={<AudioLines size={24} />} title="Signals: strutturare un file audio">
          <p>Invia una registrazione e il Signal la trasforma in dati strutturati (un Wave).</p>
          <Endpoint method="POST" path="/signals/{signal_id}/run" />
          <p>
            <InlineCode>file</InlineCode> multipart o base64. Audio fino a 150 MB e 8 ore, con al
            massimo 2 ore di parlato rilevato.
          </p>
          <CodeBlock lang="Richiesta" code={SIGNAL_RUN_REQUEST} />
          <p>
            Il risultato arriva tramite il webhook del Signal o nell&apos;app. Vedi{" "}
            <DocLink href="/docs/signals">Signals</DocLink>.
          </p>
        </DocCard>

        {/* ── Subjects ── */}
        <DocCard icon={<Briefcase size={24} />} title="Subjects e casi">
          <p>Archivia documenti nei casi di un Subject e gestisci i casi dal tuo codice.</p>
          <DataTable
            head={["Endpoint", "Cosa fa"]}
            rows={[
              ["POST /subjects/{subject_id}/process", "File multipart; Tavnit lo instrada a un caso (202, restituisce subject_doc_id)."],
              ["POST /cases/{case_id}/docs", "File multipart direttamente in un caso, senza instradamento. doc_type_id è obbligatorio, a meno che il Subject non abbia un solo tipo di documento. Restituisce il run_id (202). 409 quando il caso è chiuso o quel tipo di documento è già presente."],
              ["POST /subjects/{subject_id}/docs/{doc_id}/assign", "JSON case_id e doc_type_id: archivia a mano un documento trattenuto (202)."],
              ["POST /subjects/{subject_id}/cases", "JSON name (obbligatorio, univoco, fino a 200 caratteri) e params (oggetto facoltativo). Crea un caso (201). 409 quando il nome esiste già."],
              ["GET /subjects/{subject_id}/cases", "Query: state (open o closed), status, search, limit (fino a 200, predefinito 50), offset. Restituisce cases e total."],
              ["GET /cases/{case_id}", "Il caso con i suoi documenti, ciascuno con il run_id da interrogare su GET /runs/{run_id}."],
              ["POST /cases/{case_id}/close", "Chiude il caso (200). I nuovi documenti per quel caso vengono trattenuti invece che archiviati. 409 quando è già chiuso."],
              ["POST /cases/{case_id}/reopen", "Lo riapre (200). 409 quando è aperto."],
              ["POST /cases/{case_id}/inspections", "JSON subject_inspector_id: esegue un Inspector collegato sui Run completati del caso (202)."],
            ]}
          />
          <CodeBlock lang="Richiesta" code={CASE_REQUEST} />
          <CodeBlock lang="Risposta 201" code={CASE_RESPONSE} />
          <p>
            Vedi <DocLink href="/docs/subjects">Subjects</DocLink>.
          </p>
        </DocCard>

        {/* ── Nets ── */}
        <DocCard icon={<Radar size={24} />} title="Nets: avviare un Catch">
          <p>I Nets vengono abilitati per organizzazione. Senza accesso, questi endpoint rispondono 403.</p>
          <Endpoint method="POST" path="/nets/{net_id}/catch" />
          <p>
            Senza body, il Catch riprende da dove è finito l&apos;ultimo. Invia{" "}
            <InlineCode>window_start</InlineCode> e/o <InlineCode>window_end</InlineCode> (timestamp
            ISO) per recuperare invece un intervallo passato. 409 quando il Net è inattivo o quando è
            già in corso un Catch che prosegue dall&apos;ultimo.
          </p>
          <CodeBlock lang="Richiesta" code={NET_CATCH_REQUEST} />
          <p>
            Interroga <InlineCode>{"GET /catches/{catch_id}"}</InlineCode>: stato, fase, conteggi e,
            una volta completato, <InlineCode>output</InlineCode> con colonne e righe. Annulla con{" "}
            <InlineCode>{"POST /catches/{catch_id}/cancel"}</InlineCode>. Vedi{" "}
            <DocLink href="/docs/nets">Nets</DocLink>.
          </p>
        </DocCard>

        {/* ── HITL ── */}
        <DocCard icon={<UserCheck size={24} />} title="Revisione umana: approvare o rifiutare">
          <p>
            Gli elementi in pausa per la revisione possono essere approvati o rifiutati dai tuoi
            strumenti. Solo un revisore configurato di quel Flow, Matcher, Inspector o Filler può
            agire (altrimenti 403), e l&apos;elemento deve essere{" "}
            <InlineCode>awaiting_approval</InlineCode> (altrimenti 409). Questi endpoint sono aperti
            al ruolo Solo HITL.
          </p>
          <DataTable
            head={["Endpoint", "Body"]}
            rows={[
              ["POST /runs/{run_id}/hitl/approve", "output_json (obbligatorio): le righe finali; diff (elenco facoltativo di modifiche). 400 con missing_fields quando un campo obbligatorio a input umano è vuoto."],
              ["POST /matches/{match_id}/hitl/approve", "groups (il raggruppamento finale), excluded, diff."],
              ["POST /inspections/{inspection_id}/hitl/approve", "waivers (item_id e reason per ogni elemento fallito da esonerare), diff."],
              ["POST /fills/{fill_id}/hitl/approve", "values (valori dei campi per modello), diff, allow_missing_human_fields."],
              [".../hitl/reject", "Gli stessi percorsi terminanti in /hitl/reject, con un reason facoltativo."],
            ]}
          />
          <CodeBlock lang="Richiesta" code={HITL_RUN_APPROVE_REQUEST} />
          <p>
            L&apos;approvazione riprende la consegna (webhook, email, Bucket). Il rifiuto di un Run
            lo annulla. Vedi <DocLink href="/docs/human-in-the-loop">Revisione umana</DocLink>.
          </p>
        </DocCard>

        {/* ── API key ── */}
        <DocCard icon={<KeyRound size={24} />} title="Endpoint della chiave API">
          <DataTable
            head={["Endpoint", "Cosa fa"]}
            rows={[
              ["GET /me/api-key", "Restituisce la tua chiave per l'organizzazione."],
              ["POST /me/api-key/regenerate", "Emette una nuova chiave e invalida subito quella vecchia. Aggiorna ogni integrazione."],
            ]}
          />
          <CodeBlock lang="Risposta 200" code={API_KEY_RESPONSE} />
        </DocCard>
      </div>

      {/* ── No-Code tab ── */}
      <div role="tabpanel" aria-label="No-Code" className={apiTab === "no-code" ? undefined : "hidden"}>
        <DocCard icon={<Star size={24} />} title="Panoramica degli strumenti di automazione">
          <p>
            Non serve scrivere codice per collegare Tavnit ai tuoi flussi di lavoro. Qualsiasi
            piattaforma di automazione in grado di inviare una richiesta HTTP può avviare lavori in
            Tavnit, e qualsiasi piattaforma in grado di ricevere un webhook può ricevere i risultati.
          </p>
          <InfoBox color="purple" icon={<CircleDot size={20} />} title="Make">
            Scenari visuali: un modulo HTTP chiama Tavnit e un Custom webhook riceve i risultati.
          </InfoBox>
          <InfoBox color="yellow" icon={<Zap size={20} />} title="Zapier">
            Webhooks by Zapier: Catch Hook riceve i risultati e un&apos;azione POST avvia i Run.
          </InfoBox>
          <InfoBox color="green" icon={<CircleDot size={20} />} title="n8n">
            Self-hosted o cloud: un nodo Webhook riceve i risultati e un nodo HTTP Request avvia i
            Run.
          </InfoBox>
          <InfoBox color="blue" icon={<CircleDot size={20} />} title="Power Automate">
            Un&apos;azione HTTP chiama l&apos;API allo stesso modo.
          </InfoBox>
          <p>
            Ogni richiesta ha bisogno dell&apos;header <InlineCode>X-API-Key</InlineCode> con la tua
            chiave da <strong>Integrazioni</strong>.
          </p>
        </DocCard>

        <DocCard icon={<Webhook size={24} />} title="Ricevere i risultati nella tua automazione">
          <NumberedList
            items={[
              "Nella tua piattaforma, crea un trigger webhook (Make: Custom webhook; Zapier: Webhooks by Zapier → Catch Hook; n8n: nodo Webhook, POST) e copiane l'URL.",
              "In Tavnit, incollalo come webhook di un Flow (pannello Webhook) o di un nodo Output di una Pipeline.",
              "Elabora un documento perché la piattaforma impari il payload, poi mappa i campi verso Sheets, un CRM, un ERP e così via.",
            ]}
          />
          <p>
            Il payload è descritto nella <DocLink href="/docs/webhooks">pagina dei webhook</DocLink>.
          </p>
        </DocCard>

        <DocCard icon={<CircleDot size={24} />} title="Integrazione con Make">
          <p>
            Make (in passato Integromat) è una piattaforma di automazione visuale che ti permette di
            collegare app e automatizzare flussi di lavoro senza scrivere codice.
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

        <DocCard icon={<Layers size={24} />} title="Primi passi con Make">
          <NumberedList
            items={[
              "Vai su make.com e crea un account",
              'Fai clic su "Create a new scenario" nella tua dashboard',
              "Vedrai un'area di lavoro vuota in cui aggiungere i moduli",
              'Cerca "HTTP" e aggiungi il modulo "Make a request"',
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Che cos'è uno scenario?">
            Uno scenario è un flusso di lavoro automatizzato in Make. È composto da moduli (app)
            collegati tra loro. Quando un modulo si attiva o riceve dati, li passa al modulo
            successivo.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Configurare il modulo HTTP">
          <p>
            Dopo aver aggiunto il modulo HTTP, configuralo per inviare documenti a Tavnit. Puoi usare
            uno di questi due approcci:
          </p>

          <h3 className="text-base font-semibold text-accent mt-6 mb-3">
            Opzione 1: multipart/form-data (quando hai un oggetto File)
          </h3>
          <NumberedList
            items={[
              'Aggiungi un modulo HTTP "Make a request" al tuo scenario',
              <Fragment key="f14">
                Configura la richiesta:
                <BulletList
                  items={[
                    <>URL: <InlineCode>https://run.tavnit.io/api/runs/process</InlineCode></>,
                    "Method: POST",
                  ]}
                />
              </Fragment>,
              <Fragment key="f15">
                Nella scheda Headers, aggiungi:
                <BulletList
                  items={[
                    "Nome dell'header: X-API-Key",
                    "Valore dell'header: YOUR_API_KEY",
                  ]}
                />
              </Fragment>,
              'Imposta Body type su "multipart/form-data"',
              <Fragment key="f16">
                Aggiungi i campi del modulo:
                <BulletList
                  items={[
                    "flow_id: YOUR_FLOW_ID",
                    "file: (mappato dal modulo precedente)",
                    "source: api (facoltativo)",
                  ]}
                />
              </Fragment>,
              "Esegui lo scenario per provarlo",
            ]}
          />

          <h3 className="text-base font-semibold text-[#6c42f0] mt-8 mb-3">
            Opzione 2: JSON + base64 (quando hai una stringa base64)
          </h3>
          <p>Se il modulo precedente produce una stringa base64 invece di un file, usa questo approccio:</p>
          <NumberedList
            items={[
              'Imposta Body type su "Raw" e seleziona "JSON (application/json)"',
              <Fragment key="f17">
                Nella scheda Headers, aggiungi anche:
                <BulletList
                  items={[
                    "Nome dell'header: Content-Type",
                    "Valore dell'header: application/json",
                  ]}
                />
              </Fragment>,
              "Imposta il body JSON su:",
            ]}
          />
          <CodeBlock lang="JSON" code={JSON_BODY_EXAMPLE} />

          <InfoBox color="blue" icon={<Info size={20} />} title="Mappare il contenuto base64">
            Sostituisci {"{{previous_module.base64_content}}"} con la mappatura effettiva dal modulo
            precedente. In Make, fai clic nel campo e seleziona l&apos;output base64 del modulo che
            fornisce il tuo file. Mantieni l&apos;estensione in filename: Tavnit la usa per
            riconoscere il tipo di file.
          </InfoBox>
          <p>
            La chiamata risponde subito con un <InlineCode>run_id</InlineCode>. I dati estratti
            arrivano più tardi sul webhook del Flow, oppure puoi recuperarli con un secondo modulo
            HTTP che chiama <InlineCode>{"GET https://run.tavnit.io/api/runs/{run_id}"}</InlineCode>.
          </p>
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Altre piattaforme (Zapier, Power Automate, n8n)">
          <p>Lo stesso approccio funziona con qualsiasi piattaforma di automazione che supporti le richieste HTTP:</p>
          <InfoBox color="purple" icon={<Paperclip size={20} />} title="Se la tua piattaforma ti fornisce un oggetto file">
            Usa multipart/form-data con un campo &ldquo;file&rdquo; che contiene il file, più il campo flow_id.
          </InfoBox>
          <InfoBox color="violet" icon={<Code2 size={20} />} title="Se la tua piattaforma ti fornisce una stringa base64">
            Usa un body JSON con flow_id, filename e file_base64 (il contenuto base64 del passaggio precedente).
          </InfoBox>
          <p>
            Entrambi i metodi chiamano lo stesso endpoint e producono risultati di estrazione
            identici. Per elaborare i file che arrivano in Google Drive, OneDrive o Dropbox, usa come
            trigger &ldquo;New file in folder&rdquo; e invia il file con POST allo stesso modo.
          </p>
        </DocCard>

        <DocCard icon={<FolderInput size={24} />} title="Usare l'API delle Collections">
          <p>
            Se ricevi tipi di documenti diversi e vuoi che l&apos;AI instradi ciascuno al Flow
            giusto, chiama la Collection invece di un Flow.
          </p>
          <BulletList
            items={[
              <Fragment key="f18">URL: <InlineCode>https://run.tavnit.io/api/collections/process</InlineCode></Fragment>,
              <Fragment key="f19">Usa <InlineCode>collection_id</InlineCode> al posto di <InlineCode>flow_id</InlineCode></Fragment>,
            ]}
          />
          <CodeBlock lang="JSON" code={COLLECTIONS_JSON_EXAMPLE} />
        </DocCard>

        <DocCard icon={<Split size={24} />} title="Usare l'API degli Splitters">
          <p>
            Se ricevi PDF combinati con più documenti e devi separarli, chiama lo Splitter.
          </p>
          <BulletList
            items={[
              <Fragment key="f22">URL: <InlineCode>https://run.tavnit.io/api/splits/run</InlineCode></Fragment>,
              <Fragment key="f23">Usa <InlineCode>splitter_id</InlineCode> al posto di <InlineCode>flow_id</InlineCode></Fragment>,
            ]}
          />
          <CodeBlock lang="JSON" code={SPLITTERS_JSON_EXAMPLE} />
        </DocCard>

        <DocCard icon={<Route size={24} />} title="Avviare una Pipeline">
          <p>
            Per eseguire un&apos;intera Pipeline invece di un singolo Flow, invia il file con POST
            (<InlineCode>file</InlineCode> multipart, oppure JSON <InlineCode>file_base64</InlineCode>{" "}
            + <InlineCode>filename</InlineCode>) a{" "}
            <InlineCode>https://run.tavnit.io/api/pipelines/YOUR_PIPELINE_ID/execute</InlineCode>{" "}
            con lo stesso header. L&apos;ID della Pipeline va nell&apos;URL.
          </p>
        </DocCard>

        <DocCard icon={<Wand2 size={24} />} title="Usare l'API dei Cleaners">
          <p>
            Per pulire righe di dati dalla tua automazione, inviale come JSON al Cleaner. Un file di
            foglio di calcolo va invece a{" "}
            <InlineCode>https://run.tavnit.io/api/sweeps/run</InlineCode>, come multipart con{" "}
            <InlineCode>cleaner_id</InlineCode> (quell&apos;endpoint non accetta base64).
          </p>
          <BulletList
            items={[
              <Fragment key="f20">URL: <InlineCode>https://run.tavnit.io/api/cleaners/YOUR_CLEANER_ID/process</InlineCode></Fragment>,
              "Method: POST, Content-Type: application/json",
            ]}
          />
          <CodeBlock lang="JSON" code={CLEANERS_JSON_EXAMPLE} />
        </DocCard>

        <DocCard icon={<Database size={24} />} title="Usare l'API dei Buckets">
          <p>
            Per inserire righe in un Bucket senza inviare un documento, usa l&apos;endpoint di
            scrittura. Ogni riga deve contenere tutte le colonne del Bucket.
          </p>
          <BulletList
            items={[
              <Fragment key="f24">URL: <InlineCode>https://run.tavnit.io/api/buckets/write</InlineCode></Fragment>,
              "Method: POST, Content-Type: application/json",
              <Fragment key="f25">Header: <InlineCode>X-API-Key: YOUR_API_KEY</InlineCode></Fragment>,
            ]}
          />
          <CodeBlock lang="JSON" code={BUCKETS_JSON_EXAMPLE} />
          <InfoBox color="purple" icon={<Info size={20} />} title="Trovare l'ID e il nome del Bucket">
            Apri la pagina di dettaglio del Bucket e tocca l&apos;icona delle informazioni. Entrambi i
            valori si copiano con un solo tocco.
          </InfoBox>
        </DocCard>

        <DocCard icon={<ClipboardCheck size={24} />} title="Altre funzionalità">
          <p>
            Agents, Matchers, Inspectors, Fillers, Signals, Subjects e Nets si avviano allo stesso
            modo: una richiesta HTTP con l&apos;header <InlineCode>X-API-Key</InlineCode>. Passa alla
            scheda <strong>Code</strong> per i campi di ogni endpoint.
          </p>
        </DocCard>
      </div>

      <Related
        links={[
          {
            href: "/docs/webhooks",
            label: "Ricevere i risultati con i webhook",
            description: "Il payload che Tavnit invia quando un Run è completato, e come costruire un ricevitore.",
          },
          {
            href: "/docs/mcp-connector",
            label: "Collegare un assistente AI con il connettore MCP",
            description: "Usa Tavnit da claude.ai, Cursor o un altro client MCP.",
          },
          {
            href: "/docs/user-roles",
            label: "Ruoli utente e permessi",
            description: "Perché una chiave Solo HITL può revisionare ma non elaborare.",
          },
        ]}
      />
    </section>
  );
}
