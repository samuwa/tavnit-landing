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
 * /de/docs/api-integration — translated from components/docs/ApiIntegrationContent.tsx.
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

const FIELD_HEAD = ["Feld", "Pflicht", "Beschreibung"];

export default function ApiIntegrationDe() {
  const hashNoCode = useSyncExternalStore(subscribeHash, hashIsNoCode, serverHash);
  const [chosenTab, setChosenTab] = useState<ApiTab | null>(null);
  const apiTab: ApiTab = chosenTab ?? (hashNoCode ? "no-code" : "code");
  const [lang, setLang] = useState<Lang>("python");

  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        API-Integration
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
        <DocCard icon={<Info size={24} />} title="So funktioniert die API">
          <p>
            Mit der Tavnit-REST-API kann Ihr eigener Code tun, was Sie in der App tun: Dokumente an
            einen Flow, eine Collection, einen Splitter oder eine Pipeline senden, Cleaners, Matchers,
            Inspectors, Fillers, Signals und Agents ausführen, Buckets lesen und schreiben, die Fälle
            eines Subjects verwalten und manuelle Prüfungen genehmigen oder ablehnen.
          </p>
          <BulletList
            items={[
              <Fragment key="b0">
                Basis-URL: <InlineCode>https://run.tavnit.io/api</InlineCode>. Jeder Pfad unten ist
                relativ dazu.
              </Fragment>,
              <Fragment key="b1">
                Jede Anfrage enthält Ihren API-Schlüssel im Header <InlineCode>X-API-Key</InlineCode>.
              </Fragment>,
              <Fragment key="b2">
                Die Verarbeitung ist asynchron. Endpunkte, die Arbeit starten, antworten sofort mit{" "}
                <strong>202 Accepted</strong> und einer ID, und die Arbeit läuft im Hintergrund. Das
                Ergebnis erhalten Sie per Abfrage (Runs, Agent-Runs, Catches, Fälle) oder über einen
                bei der Funktion konfigurierten <DocLink href="/docs/webhooks">Webhook</DocLink>.
              </Fragment>,
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Funktionen in der Beta">
            Pipelines, Subjects, Matchers, Inspectors, Fillers, Signals und Nets sind in der Beta. Ihre
            Endpunkte funktionieren schon heute, Details können sich aber noch ändern.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Lock size={24} />} title="Authentifizierung und IDs">
          <h3 className="text-base font-semibold text-fg-2 mt-2 mb-1">API-Schlüssel</h3>
          <p>
            Öffnen Sie <strong>Integrationen</strong> in der Seitenleiste der App. Die Karte{" "}
            <strong>API-Schlüssel</strong> zeigt Ihren Schlüssel (dort können Sie ihn einblenden und
            kopieren). Jedes Mitglied hat in jeder Organisation einen eigenen Schlüssel, und eine
            Anfrage handelt als dieses Mitglied in dieser Organisation.
          </p>
          <WarningBox>
            Halten Sie Ihren API-Schlüssel geheim. <strong>Neu erstellen</strong> auf derselben Karte
            macht den aktuellen Schlüssel sofort ungültig, und alles, was ihn noch nutzt, funktioniert
            nicht mehr.
          </WarningBox>
          <p>Eine Anfrage ohne gültigen Schlüssel erhält:</p>
          <CodeBlock
            lang="401"
            code={`{
  "success": false,
  "error": "Authentication required",
  "message": "Please provide a valid X-API-Key header"
}`}
          />

          <h3 className={H3}>Rollen</h3>
          <p>
            Der Schlüssel trägt Ihre Rolle. Mitglieder mit der Rolle <strong>Nur HITL</strong> können
            nur die Endpunkte zum Genehmigen und Ablehnen manueller Prüfungen sowie die Endpunkte für
            den API-Schlüssel nutzen. Jeder Verarbeitungs- und Datenendpunkt weist sie mit{" "}
            <strong>403</strong> und <InlineCode>Your role only permits HITL reviews</InlineCode> ab.
            Siehe <DocLink href="/docs/user-roles">Benutzerrollen</DocLink>.
          </p>

          <h3 className={H3}>IDs</h3>
          <p>
            Jeder Flow, jede Collection, jeder Splitter, Cleaner, Bucket, Agent, Matcher, Inspector,
            Filler und jede Pipeline zeigt ihre ID auf der Detailseite, mit einer Kopierschaltfläche.
            Ressourcen müssen zur Organisation Ihres Schlüssels gehören: Die ID einer anderen
            Organisation wird mit 403 oder 404 beantwortet.
          </p>
        </DocCard>

        <DocCard icon={<Download size={24} />} title="Dateien senden">
          <p>Endpunkte, die ein Dokument entgegennehmen, akzeptieren es auf eine von zwei Arten:</p>
          <InfoBox color="purple" icon={<Paperclip size={20} />} title="Multipart-Datei-Upload">
            Senden Sie die Datei als multipart/form-data in einem Feld namens file und die übrigen
            Felder als Formularfelder. Funktioniert bei jedem Datei-Endpunkt.
          </InfoBox>
          <InfoBox color="violet" icon={<Code2 size={20} />} title="Base64 in einem JSON-Body">
            Senden Sie JSON mit file_base64 (dem Dateiinhalt) und filename (mit Dateiendung) sowie den
            übrigen Feldern. Nützlich, wenn ein Automatisierungstool Ihnen Base64 statt einer Datei
            liefert.
          </InfoBox>
          <DataTable
            head={["Endpunkt", "Base64", "Akzeptierte Dateien"]}
            rows={[
              ["POST /runs/process", "Ja", "PDF, Bilder (PNG, JPG, JPEG, JFIF, TIF, TIFF, WEBP, BMP, GIF), Tabellen (XLSX, XLS, CSV)"],
              ["POST /collections/process", "Ja", "Wie bei Runs"],
              ["POST /splits/run", "Ja", "Wie bei Runs"],
              ["POST /pipelines/{id}/execute", "Ja", "PDF und Bilder"],
              ["POST /signals/{id}/run", "Ja", "Audio: MP3, MP4, MPEG, MPGA, M4A, WAV, WEBM"],
              ["POST /sweeps/run", "Nein", "Tabellen: CSV, XLSX, XLS"],
              ["Inspectors, Fillers, Subjects und Fälle", "Nein", "Das Dokument als Multipart-Datei"],
            ]}
          />
          <p>
            Eine einzelne Anfrage darf bis zu 150 MB groß sein. Der Dateityp wird aus der Endung des
            Dateinamens bestimmt.
          </p>
        </DocCard>

        <DocCard icon={<ListChecks size={24} />} title="Antworten und Fehler">
          <p>
            Antworten sind JSON mit einem Flag <InlineCode>success</InlineCode>. Fehler enthalten einen
            String <InlineCode>error</InlineCode>, manchmal eine <InlineCode>message</InlineCode> und
            zusätzliche Schlüssel, die das Problem erklären:
          </p>
          <CodeBlock lang="Beispiel 409" code={API_ERROR_EXAMPLE} />
          <DataTable
            head={["Status", "Bedeutung"]}
            rows={[
              ["200 / 201", "Erledigt (Lesen, Abbrechen, Genehmigungen) / erstellt (Fälle, Ausfüllungen, Prüfungen)."],
              ["202", "Angenommen: Die Arbeit ist eingereiht. Bewahren Sie die zurückgegebene ID auf."],
              ["400", "Ein Pflichtfeld fehlt oder ist ungültig, der Dateityp wird nicht unterstützt, oder die Ressource ist inaktiv oder nicht eingerichtet."],
              ["401", "X-API-Key fehlt oder ist ungültig."],
              ["402", "Ihre Organisation kann gerade keine neue Arbeit starten; wenden Sie sich an das Tavnit-Team."],
              ["403", "Die Ressource gehört zu einer anderen Organisation, Ihre Rolle ist Nur HITL, oder Sie sind kein Prüfer dieses Elements."],
              ["404", "Die ID existiert in Ihrer Organisation nicht."],
              ["409", "Konflikt mit dem aktuellen Zustand: Bucket-Name passt nicht, bereits abgebrochen oder beendet, Fall geschlossen, Platz bereits belegt."],
              ["429", "Es warten bereits zu viele Runs auf einen Agent."],
              ["500", "Unerwarteter Fehler. Ein späterer neuer Versuch ist unbedenklich."],
            ]}
          />
        </DocCard>

        <DocCard icon={<Layers size={24} />} title="Endpunkt-Referenz">
          <DataTable
            head={["Funktion", "Methode und Pfad", "Was er macht"]}
            rows={[
              ["Flows", "POST /runs/process", "Ein Dokument mit einem Flow extrahieren"],
              ["Flows", "GET /runs/{run_id}", "Run-Status und extrahierte Daten"],
              ["Flows", "GET /runs/{run_id}/source-file", "Das Originaldokument"],
              ["Collections", "POST /collections/process", "Die KI leitet ein Dokument an den richtigen Flow oder Splitter"],
              ["Collections", "GET /collection-runs/{id}/source-file", "Das Originaldokument"],
              ["Splitters", "POST /splits/run", "Eine Datei mit mehreren Dokumenten aufteilen"],
              ["Splitters", "GET /splits/{split_id}/source-file", "Das Originalbündel"],
              ["Cleaners", "POST /sweeps/run", "Eine Tabelle bereinigen"],
              ["Cleaners", "POST /cleaners/{cleaner_id}/process", "Als JSON gesendete Zeilen bereinigen"],
              ["Buckets", "POST /buckets/write", "Zeilen anhängen oder ersetzen"],
              ["Buckets", "GET /buckets/read", "Zeilen seitenweise lesen"],
              ["Agents", "POST /bots/{agent_id}/runs", "Einen Agent-Run starten"],
              ["Agents", "GET /bot-runs/{bot_run_id}", "Einen Agent-Run abfragen"],
              ["Agents", "GET /bots/{agent_id}/runs", "Die Runs eines Agents auflisten"],
              ["Agents", "POST /bot-runs/{bot_run_id}/cancel", "Einen Agent-Run abbrechen"],
              ["Matchers", "POST /matchers/{matcher_id}/run", "Abgeschlossene Runs abgleichen"],
              ["Inspectors", "POST /inspectors/{inspector_id}/process", "Einer Prüfung ein Dokument hinzufügen"],
              ["Fillers", "POST /fillers/{filler_id}/fills", "Eine Ausfüllung öffnen und Dokumente hinzufügen"],
              ["Pipelines", "POST /pipelines/{pipeline_id}/execute", "Eine Pipeline ausführen"],
              ["Signals", "POST /signals/{signal_id}/run", "Eine Audiodatei strukturieren (eine Wave)"],
              ["Subjects", "POST /subjects/{subject_id}/process", "Ein Dokument an einen Fall leiten"],
              ["Nets", "POST /nets/{net_id}/catch", "Einen Catch starten"],
              ["Manuelle Prüfung", "POST /runs/{run_id}/hitl/approve", "Angehaltene Elemente genehmigen oder ablehnen"],
              ["API-Schlüssel", "GET /me/api-key", "Ihren Schlüssel lesen oder neu erstellen"],
            ]}
          />
          <p>Jede Funktion wird unten mit ihren weiteren Endpunkten im Detail beschrieben.</p>
        </DocCard>

        {/* ── Flows ── */}
        <DocCard icon={<FileText size={24} />} title="Flows: ein Dokument verarbeiten">
          <p>
            Senden Sie ein Dokument an einen Flow. Tavnit erstellt einen Run und extrahiert es im
            Hintergrund.
          </p>
          <Endpoint method="POST" path="/runs/process" />
          <DataTable
            head={FIELD_HEAD}
            rows={[
              ["flow_id", "Ja", "Der Flow, der das Dokument extrahiert."],
              ["file", "Ja*", "Das Dokument (multipart)."],
              ["file_base64 + filename", "Ja*", "Statt file: der Base64-Inhalt und der Dateiname mit Endung."],
              ["content_type", "Nein", "MIME-Typ einer Base64-Datei."],
              ["source", "Nein", "Beim Run gespeichertes Label: api (Standard), email, manual_upload oder collection."],
            ]}
            caption="* Senden Sie entweder file oder file_base64 + filename."
          />
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python" code={PYTHON_CODE} />
          ) : (
            <CodeBlock lang="JavaScript" code={JAVASCRIPT_CODE} />
          )}
          <CodeBlock lang="Antwort 202" code={RUN_PROCESS_RESPONSE} />
          <p>
            Fehler: 400 (keine Datei, keine flow_id, nicht unterstützte oder ungültige Datei), 403
            (Flow einer anderen Organisation), 404 (Flow nicht gefunden). Eine abgewiesene Anfrage
            erstellt nach Möglichkeit trotzdem einen fehlgeschlagenen Run und gibt seine{" "}
            <InlineCode>run_id</InlineCode> zurück, damit Sie ihn unter <strong>Runs</strong> finden.
          </p>

          <h3 className={H3}>Den Run und seine Daten abrufen</h3>
          <Endpoint method="GET" path="/runs/{run_id}" />
          <p>
            Fragen Sie ab, bis <InlineCode>status</InlineCode> einen Endzustand hat. Status:{" "}
            <InlineCode>queued</InlineCode>, <InlineCode>running</InlineCode>,{" "}
            <InlineCode>awaiting_approval</InlineCode> (für eine{" "}
            <DocLink href="/docs/human-in-the-loop">manuelle Prüfung</DocLink> angehalten),{" "}
            <InlineCode>completed</InlineCode>, <InlineCode>failed</InlineCode> und{" "}
            <InlineCode>cancelled</InlineCode>. <InlineCode>data</InlineCode> enthält die extrahierten
            Zeilen und bleibt <InlineCode>null</InlineCode>, bis der Run abgeschlossen ist, auch
            während er auf Genehmigung wartet. Ist <InlineCode>columns</InlineCode> gesetzt, verwenden
            Sie es für die Spaltenreihenfolge. <InlineCode>attempt</InlineCode> und{" "}
            <InlineCode>previous_attempts</InlineCode> zeigen automatische Wiederholungen. Fügen Sie{" "}
            <InlineCode>?include_document=true</InlineCode> hinzu, um zusätzlich einen signierten Link
            zur Originaldatei zu erhalten. Das funktioniert bei jedem Run, auch bei Runs aus
            Collections, Splitters, Pipelines und E-Mail.
          </p>
          <CodeBlock lang="Antwort 200" code={RUN_GET_RESPONSE} />
          {lang === "python" ? (
            <CodeBlock lang="Python (senden und abfragen)" code={PYTHON_RUN_POLL_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (senden und abfragen)" code={JAVASCRIPT_RUN_POLL_CODE} />
          )}

          <h3 className={H3}>Das Originaldokument abrufen</h3>
          <Endpoint method="GET" path="/runs/{run_id}/source-file" />
          <p>
            Liefert eine signierte URL zur Datei, wie sie hochgeladen wurde, unabhängig vom Status des
            Runs. Das optionale <InlineCode>expires_in</InlineCode> legt die Gültigkeit des Links in
            Sekunden fest (60 bis 604800, Standard 7 Tage). Mit{" "}
            <InlineCode>?download=true</InlineCode> ist die Antwort die Datei selbst.
          </p>
          <CodeBlock lang="Antwort 200" code={SOURCE_FILE_RESPONSE} />
        </DocCard>

        {/* ── Collections ── */}
        <DocCard icon={<FolderInput size={24} />} title="Collections: die KI das Dokument weiterleiten lassen">
          <p>
            Senden Sie ein Dokument, ohne den Flow zu wählen: Die KI wählt den besten Flow oder
            Splitter der Collection. Nutzen Sie das, wenn Sie gemischte Dokumenttypen erhalten.
          </p>
          <Endpoint method="POST" path="/collections/process" />
          <p>
            Derselbe Body wie bei <InlineCode>/runs/process</InlineCode>, mit{" "}
            <InlineCode>collection_id</InlineCode> statt <InlineCode>flow_id</InlineCode> (oder die ID
            im Pfad: <InlineCode>{"/collections/{collection_id}/process"}</InlineCode>). Die
            Collection muss aktiv sein und mindestens einen aktiven Flow oder Splitter haben, sonst
            antwortet der Aufruf mit 400.
          </p>
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python (Collections)" code={PYTHON_COLLECTIONS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Collections)" code={JAVASCRIPT_COLLECTIONS_CODE} />
          )}
          <CodeBlock lang="Antwort 202" code={COLLECTION_PROCESS_RESPONSE} />
          <p>
            Der gewählte Flow erstellt einen normalen Run, und sein Webhook-Payload enthält{" "}
            <InlineCode>collection_run_id</InlineCode>, damit Sie das Ergebnis Ihrer Anfrage zuordnen
            können. Das Original ist sofort unter{" "}
            <InlineCode>{"GET /collection-runs/{collection_run_id}/source-file"}</InlineCode> verfügbar
            (dieselben Optionen wie bei der Quelldatei eines Runs). Siehe{" "}
            <DocLink href="/docs/collections">Collections</DocLink>.
          </p>
        </DocCard>

        {/* ── Splitters ── */}
        <DocCard icon={<Split size={24} />} title="Splitters: eine Datei mit mehreren Dokumenten aufteilen">
          <p>
            Senden Sie eine Datei, die mehrere Dokumente enthält. Der Splitter findet, wo jedes beginnt
            und endet, klassifiziert es und schickt jeden Teil dorthin, wo sein Dokumenttyp es vorgibt.
          </p>
          <Endpoint method="POST" path="/splits/run" />
          <p>
            Derselbe Body wie bei <InlineCode>/runs/process</InlineCode>, mit{" "}
            <InlineCode>splitter_id</InlineCode>.
          </p>
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python (Splitters)" code={PYTHON_SPLITTERS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Splitters)" code={JAVASCRIPT_SPLITTERS_CODE} />
          )}
          <CodeBlock lang="Antwort 202" code={SPLIT_RUN_RESPONSE} />
          <p>
            An Flows gesendete Teile werden zu eigenen Runs, und ihre Webhooks enthalten{" "}
            <InlineCode>split_id</InlineCode>. Das Originalbündel liegt unter{" "}
            <InlineCode>{"GET /splits/{split_id}/source-file"}</InlineCode>. Siehe{" "}
            <DocLink href="/docs/splitters">Splitters</DocLink>.
          </p>
        </DocCard>

        {/* ── Cleaners ── */}
        <DocCard icon={<Wand2 size={24} />} title="Cleaners: einen Durchlauf starten">
          <p>
            Ein Durchlauf (Sweep) lässt einen Cleaner über Datenzeilen laufen, um Werte zu
            normalisieren, zu klassifizieren, nachzuschlagen oder anzureichern. Senden Sie die Zeilen
            als Tabelle oder als JSON.
          </p>
          <Endpoint method="POST" path="/sweeps/run" />
          <DataTable
            head={FIELD_HEAD}
            rows={[
              ["cleaner_id", "Ja", "Der auszuführende Cleaner."],
              ["file", "Ja", "CSV, XLSX oder XLS, nur multipart. Überschriften in der ersten Zeile; jedes Basisfeld, das der Cleaner verlangt, muss eine Spalte sein, ohne Duplikate."],
              ["sheet_name", "Nein", "Welches Blatt einer Arbeitsmappe gelesen wird (Standard: das erste)."],
            ]}
          />
          <Endpoint method="POST" path="/cleaners/{cleaner_id}/process" />
          <p>
            Senden Sie JSON mit <InlineCode>rows</InlineCode> (einem Array von Objekten) oder eine
            Multipart-<InlineCode>file</InlineCode> wie oben.
          </p>
          <CodeBlock lang="JSON-Body" code={CLEANERS_JSON_EXAMPLE} />
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python (Cleaners)" code={PYTHON_CLEANERS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Cleaners)" code={JAVASCRIPT_CLEANERS_CODE} />
          )}
          <CodeBlock lang="Antwort 202" code={SWEEP_RUN_RESPONSE} />
          <p>
            Ein Cleaner mit ungültiger Einrichtung antwortet mit 400 und{" "}
            <InlineCode>validation_errors</InlineCode>. Siehe{" "}
            <DocLink href="/docs/cleaners">Cleaners</DocLink>.
          </p>
        </DocCard>

        {/* ── Buckets ── */}
        <DocCard icon={<Database size={24} />} title="Buckets: Zeilen schreiben und lesen">
          <p>
            Schreiben Sie Zeilen aus Ihren eigenen Systemen in einen Bucket oder lesen Sie, was Ihre
            Flows dort gespeichert haben. Bucket-ID und Name finden Sie über das Info-Symbol auf der
            Seite des Buckets. Der Name dient als Sicherheitsprüfung: Passt er nicht zur ID, antwortet
            der Aufruf mit <strong>409</strong>.
          </p>
          <Endpoint method="POST" path="/buckets/write" />
          <DataTable
            head={FIELD_HEAD}
            rows={[
              ["bucket_id", "Ja", "Der Bucket."],
              ["bucket_name", "Ja", "Sein genauer Name."],
              ["overwrite", "Ja", "Boolean. false hängt die Zeilen an; true ersetzt alle vorhandenen Zeilen."],
              ["rows", "Ja", "Array von Objekten, bis zu 50.000 pro Anfrage."],
            ]}
          />
          <p>
            Senden Sie den Body als <InlineCode>application/json</InlineCode>. Jede Zeile muss genau
            die Spalten des Buckets haben, per Spaltenname oder Anzeigename: Eine fehlende oder
            unbekannte Spalte bricht den gesamten Schreibvorgang mit 400 ab und listet{" "}
            <InlineCode>missing_columns</InlineCode> und <InlineCode>extra_columns</InlineCode> auf.
          </p>
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python (Buckets)" code={PYTHON_BUCKETS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Buckets)" code={JAVASCRIPT_BUCKETS_CODE} />
          )}
          <CodeBlock lang="Antwort 202" code={BUCKET_WRITE_RESPONSE} />

          <h3 className={H3}>Zeilen lesen</h3>
          <Endpoint method="GET" path="/buckets/read" />
          <p>
            Query-Parameter: <InlineCode>bucket_id</InlineCode> und{" "}
            <InlineCode>bucket_name</InlineCode> (Pflicht), <InlineCode>limit</InlineCode> (1 bis
            1000, Standard 100) und <InlineCode>offset</InlineCode> (Standard 0). Blättern Sie mit{" "}
            <InlineCode>offset</InlineCode>, solange <InlineCode>has_more</InlineCode> true ist;{" "}
            <InlineCode>total_count</InlineCode> zählt alle Zeilen. Die Schlüssel von{" "}
            <InlineCode>data</InlineCode> einer Zeile sind die Spaltennamen; für Anzeigenamen nutzen
            Sie <InlineCode>columns</InlineCode>. Gespeicherte Dateilinks kommen als frische signierte
            URLs zurück.
          </p>
          <CodeBlock lang="Anfrage" code={BUCKET_READ_REQUEST} />
          <CodeBlock lang="Antwort 200" code={BUCKET_READ_RESPONSE} />
          <p>
            Siehe <DocLink href="/docs/buckets">Buckets</DocLink>.
          </p>
        </DocCard>

        {/* ── Agents ── */}
        <DocCard icon={<Bot size={24} />} title="Agents: Runs auslösen und abfragen">
          <p>
            Starten Sie einen Agent aus Ihrem Code und holen Sie ab, was er erfasst hat. Agents werden
            auf Anfrage pro Organisation freigeschaltet: Wenden Sie sich dafür an den Support.
          </p>
          <Endpoint method="POST" path="/bots/{agent_id}/runs" />
          <p>
            Das optionale JSON <InlineCode>{'{"inputs": {...}}'}</InlineCode> überschreibt die
            Eingabevariablen des Agents für diesen Run. Es werden nur Variablen verwendet, die der
            Agent deklariert, und geheime Werte werden nie akzeptiert. Sie können auch{" "}
            <InlineCode>POST /bots/runs</InlineCode> mit <InlineCode>bot_id</InlineCode> im Body
            aufrufen. Jeder Aufruf startet einen neuen Run.
          </p>
          <CodeBlock lang="Anfrage" code={AGENT_TRIGGER_REQUEST} />
          <p>
            <InlineCode>status</InlineCode> ist <InlineCode>queued</InlineCode> oder{" "}
            <InlineCode>waiting</InlineCode>, wenn der Agent jeweils nur einen Run ausführt und
            beschäftigt ist (der Run startet von selbst, wenn er an der Reihe ist). 409, wenn der Agent
            archiviert ist, 429, wenn bereits zu viele Runs warten.
          </p>

          <h3 className={H3}>Abfragen, auflisten und abbrechen</h3>
          <DataTable
            head={["Endpunkt", "Was er macht"]}
            rows={[
              ["GET /bot-runs/{bot_run_id}", "Ein Run: Status, Zeiten, Eingaben (ohne Geheimnisse) und Ausgabe mit signierten Dateilinks. Auch unter GET /bots/{agent_id}/runs/{bot_run_id}."],
              ["GET /bots/{agent_id}/runs", "Neueste zuerst, ohne Eingaben und Ausgabe. Query: status (queued, running, completed, failed, cancelled), limit (1 bis 100, Standard 20), offset. Liefert runs und total."],
              ["POST /bot-runs/{bot_run_id}/cancel", "Bricht einen wartenden, eingereihten oder laufenden Run ab. 409, wenn der Run bereits beendet ist. Auch unter POST /bots/{agent_id}/runs/{bot_run_id}/cancel."],
            ]}
          />
          <CodeBlock lang="GET /bot-runs/{bot_run_id}" code={AGENT_RUN_RESPONSE} />
          <p>
            Siehe <DocLink href="/docs/agents">Agents</DocLink>.
          </p>
        </DocCard>

        {/* ── Matchers ── */}
        <DocCard icon={<Target size={24} />} title="Matchers: Runs abgleichen">
          <p>
            Vergleichen Sie abgeschlossene Runs des Flows des Matchers, zum Beispiel Rechnungen mit
            Bestellungen.
          </p>
          <Endpoint method="POST" path="/matchers/{matcher_id}/run" />
          <DataTable
            head={FIELD_HEAD}
            rows={[
              ["run_ids", "Ja", "Zwei oder mehr abgeschlossene Runs des Flows des Matchers."],
              ["benchmark_run_id", "Im Benchmark-Modus", "Der Run, mit dem die anderen verglichen werden."],
            ]}
          />
          <CodeBlock lang="Anfrage" code={MATCHER_RUN_REQUEST} />
          <p>
            Es gibt keinen API-Endpunkt zum Lesen eines Abgleichs: Sie erhalten das Ergebnis über den
            Webhook oder die E-Mail-Ausgabe des Matchers oder in der App. Siehe{" "}
            <DocLink href="/docs/matchers">Matchers</DocLink>.
          </p>
        </DocCard>

        {/* ── Inspectors ── */}
        <DocCard icon={<ShieldCheck size={24} />} title="Inspectors: eine Gruppe von Dokumenten prüfen">
          <p>
            Eine Prüfung sammelt Dokumente, ordnet jedes einem Platz des Inspectors zu, extrahiert es
            und wertet die Checkliste aus.
          </p>
          <Endpoint method="POST" path="/inspectors/{inspector_id}/process" />
          <p>
            Multipart-<InlineCode>file</InlineCode>. Ohne <InlineCode>inspection_id</InlineCode> wird
            eine neue Prüfung erstellt; übergeben Sie die zurückgegebene{" "}
            <InlineCode>inspection_id</InlineCode>, um ihr weitere Dokumente hinzuzufügen (sie muss
            noch sammeln, sonst 409). Der Inspector muss aktiv sein.
          </p>
          <CodeBlock lang="Anfrage" code={INSPECTOR_PROCESS_REQUEST} />
          <DataTable
            head={["Endpunkt", "Was er macht"]}
            rows={[
              ["POST /inspectors/{inspector_id}/inspections", "Erstellt eine leere Prüfung (201), der später Dokumente hinzugefügt werden."],
              ["POST /inspections/{inspection_id}/fire", "Beendet das Sammeln und wertet sofort aus. 400 mit missing_inputs, wenn ein Pflichtplatz kein Dokument hat."],
            ]}
          />
          <p>
            Das Ergebnis kommt über den Webhook oder die E-Mail-Ausgabe des Inspectors. Siehe{" "}
            <DocLink href="/docs/inspectors">Inspectors</DocLink>.
          </p>
        </DocCard>

        {/* ── Fillers ── */}
        <DocCard icon={<FileOutput size={24} />} title="Fillers: PDF-Formulare ausfüllen">
          <p>
            Eine Ausfüllung sammelt die Dokumente, die ein Filler braucht, extrahiert sie und schreibt
            die Werte in die PDF-Vorlagen des Fillers.
          </p>
          <DataTable
            head={["Endpunkt", "Was er macht"]}
            rows={[
              ["POST /fillers/{filler_id}/fills", "Öffnet eine Ausfüllung (201, liefert fill_id). Der Filler braucht eine Vorlage und Feldzuordnungen."],
              ["POST /fills/{fill_id}/route-upload", "Multipart-Datei; die KI ordnet sie einem offenen Platz zu (202)."],
              ["POST /fills/{fill_id}/inputs/{input_id}/upload", "Multipart-Datei für einen bestimmten Platz; startet den Run dieses Platzes (202)."],
              ["POST /fills/{fill_id}/inputs/{input_id}/attach-run", "JSON run_id: einen abgeschlossenen Run für einen Platz wiederverwenden (202)."],
              ["POST /fills/{fill_id}/fire", "Füllt sofort aus, statt auf jeden Platz zu warten. 400 mit missing_inputs, wenn ein Pflichtplatz leer ist."],
              ["POST /fillers/{filler_id}/templates", "Fügt ein Vorlagen-PDF hinzu (Multipart-Datei, optional name). Ordnen Sie seine Felder in der App zu."],
            ]}
          />
          <CodeBlock lang="Anfrage" code={FILLER_REQUEST} />
          <p>
            Die ausgefüllten PDFs kommen über den Webhook oder die E-Mail-Ausgabe des Fillers. Siehe{" "}
            <DocLink href="/docs/fillers">Fillers</DocLink>.
          </p>
        </DocCard>

        {/* ── Pipelines ── */}
        <DocCard icon={<Route size={24} />} title="Pipelines: ausführen">
          <p>Starten Sie eine Ausführung einer Pipeline mit einem Dokument.</p>
          <Endpoint method="POST" path="/pipelines/{pipeline_id}/execute" />
          <p>
            Multipart-<InlineCode>file</InlineCode> oder <InlineCode>file_base64</InlineCode> +{" "}
            <InlineCode>filename</InlineCode>; PDF oder Bild. 400, wenn die Pipeline inaktiv ist oder
            ihr Graph nicht ausführbar ist (mit <InlineCode>validation_errors</InlineCode>).
          </p>
          <CodeBlock lang="Anfrage" code={PIPELINE_EXECUTE_REQUEST} />
          <p>
            Abbrechen mit <InlineCode>{"POST /pipelines/executions/{execution_id}/cancel"}</InlineCode>{" "}
            (409, wenn sie nicht läuft). Ergebnisse verlassen die Pipeline über ihre Ausgabeknoten.
            Siehe <DocLink href="/docs/pipelines">Pipelines</DocLink>.
          </p>
        </DocCard>

        {/* ── Signals ── */}
        <DocCard icon={<AudioLines size={24} />} title="Signals: eine Audiodatei strukturieren">
          <p>Senden Sie eine Aufnahme, und das Signal macht daraus strukturierte Daten (eine Wave).</p>
          <Endpoint method="POST" path="/signals/{signal_id}/run" />
          <p>
            Multipart-<InlineCode>file</InlineCode> oder Base64. Audio bis 150 MB und 8 Stunden, mit
            höchstens 2 Stunden erkannter Sprache.
          </p>
          <CodeBlock lang="Anfrage" code={SIGNAL_RUN_REQUEST} />
          <p>
            Das Ergebnis kommt über den Webhook des Signals oder in der App. Siehe{" "}
            <DocLink href="/docs/signals">Signals</DocLink>.
          </p>
        </DocCard>

        {/* ── Subjects ── */}
        <DocCard icon={<Briefcase size={24} />} title="Subjects und Fälle">
          <p>Ordnen Sie Dokumente den Fällen eines Subjects zu und verwalten Sie Fälle aus Ihrem Code.</p>
          <DataTable
            head={["Endpunkt", "Was er macht"]}
            rows={[
              ["POST /subjects/{subject_id}/process", "Multipart-Datei; Tavnit leitet sie an einen Fall (202, liefert subject_doc_id)."],
              ["POST /cases/{case_id}/docs", "Multipart-Datei direkt in einen Fall, ohne Weiterleitung. doc_type_id ist Pflicht, außer das Subject hat nur einen Dokumenttyp. Liefert die run_id (202). 409, wenn der Fall geschlossen oder dieser Dokumenttyp bereits belegt ist."],
              ["POST /subjects/{subject_id}/docs/{doc_id}/assign", "JSON case_id und doc_type_id: ein zurückgehaltenes Dokument manuell zuordnen (202)."],
              ["POST /subjects/{subject_id}/cases", "JSON name (Pflicht, eindeutig, bis zu 200 Zeichen) und params (optionales Objekt). Erstellt einen Fall (201). 409, wenn der Name existiert."],
              ["GET /subjects/{subject_id}/cases", "Query: state (open oder closed), status, search, limit (bis 200, Standard 50), offset. Liefert cases und total."],
              ["GET /cases/{case_id}", "Der Fall mit seinen Dokumenten, jedes mit der run_id zum Abfragen unter GET /runs/{run_id}."],
              ["POST /cases/{case_id}/close", "Schließt den Fall (200). Neue Dokumente dafür werden zurückgehalten statt zugeordnet. 409, wenn er bereits geschlossen ist."],
              ["POST /cases/{case_id}/reopen", "Öffnet ihn wieder (200). 409, wenn er offen ist."],
              ["POST /cases/{case_id}/inspections", "JSON subject_inspector_id: lässt einen gebundenen Inspector über die abgeschlossenen Runs des Falls laufen (202)."],
            ]}
          />
          <CodeBlock lang="Anfrage" code={CASE_REQUEST} />
          <CodeBlock lang="Antwort 201" code={CASE_RESPONSE} />
          <p>
            Siehe <DocLink href="/docs/subjects">Subjects</DocLink>.
          </p>
        </DocCard>

        {/* ── Nets ── */}
        <DocCard icon={<Radar size={24} />} title="Nets: einen Catch starten">
          <p>Nets werden pro Organisation freigeschaltet. Ohne Zugriff antworten diese Endpunkte mit 403.</p>
          <Endpoint method="POST" path="/nets/{net_id}/catch" />
          <p>
            Ohne Body setzt der Catch dort fort, wo der letzte endete. Senden Sie{" "}
            <InlineCode>window_start</InlineCode> und/oder <InlineCode>window_end</InlineCode>
            {" "}(ISO-Zeitstempel), um stattdessen einen Zeitraum nachzuholen. 409, wenn das Net inaktiv
            ist oder bereits ein Catch läuft, der am letzten anknüpft.
          </p>
          <CodeBlock lang="Anfrage" code={NET_CATCH_REQUEST} />
          <p>
            Fragen Sie <InlineCode>{"GET /catches/{catch_id}"}</InlineCode> ab: Status, Phase,
            Zählerstände und nach Abschluss <InlineCode>output</InlineCode> mit Spalten und Zeilen.
            Abbrechen mit <InlineCode>{"POST /catches/{catch_id}/cancel"}</InlineCode>. Siehe{" "}
            <DocLink href="/docs/nets">Nets</DocLink>.
          </p>
        </DocCard>

        {/* ── HITL ── */}
        <DocCard icon={<UserCheck size={24} />} title="Manuelle Prüfung: genehmigen oder ablehnen">
          <p>
            Zur Prüfung angehaltene Elemente lassen sich aus Ihren eigenen Tools genehmigen oder
            ablehnen. Nur ein konfigurierter Prüfer dieses Flows, Matchers, Inspectors oder Fillers
            kann handeln (sonst 403), und das Element muss <InlineCode>awaiting_approval</InlineCode>{" "}
            sein (sonst 409). Diese Endpunkte stehen der Rolle Nur HITL offen.
          </p>
          <DataTable
            head={["Endpunkt", "Body"]}
            rows={[
              ["POST /runs/{run_id}/hitl/approve", "output_json (Pflicht): die endgültigen Zeilen; diff (optionale Liste der Änderungen). 400 mit missing_fields, wenn ein Pflichtfeld für manuelle Eingabe leer ist."],
              ["POST /matches/{match_id}/hitl/approve", "groups (die endgültige Gruppierung), excluded, diff."],
              ["POST /inspections/{inspection_id}/hitl/approve", "waivers (item_id und reason für jedes nicht bestandene Element, das erlassen wird), diff."],
              ["POST /fills/{fill_id}/hitl/approve", "values (Feldwerte pro Vorlage), diff, allow_missing_human_fields."],
              [".../hitl/reject", "Dieselben Pfade mit /hitl/reject am Ende, mit optionalem reason."],
            ]}
          />
          <CodeBlock lang="Anfrage" code={HITL_RUN_APPROVE_REQUEST} />
          <p>
            Eine Genehmigung setzt die Zustellung fort (Webhook, E-Mail, Bucket). Eine Ablehnung bricht
            einen Run ab. Siehe <DocLink href="/docs/human-in-the-loop">Manuelle Prüfung</DocLink>.
          </p>
        </DocCard>

        {/* ── API key ── */}
        <DocCard icon={<KeyRound size={24} />} title="Endpunkte für den API-Schlüssel">
          <DataTable
            head={["Endpunkt", "Was er macht"]}
            rows={[
              ["GET /me/api-key", "Liefert Ihren Schlüssel für die Organisation."],
              ["POST /me/api-key/regenerate", "Stellt einen neuen Schlüssel aus und macht den alten sofort ungültig. Passen Sie jede Integration an."],
            ]}
          />
          <CodeBlock lang="Antwort 200" code={API_KEY_RESPONSE} />
        </DocCard>
      </div>

      {/* ── No-Code tab ── */}
      <div role="tabpanel" aria-label="No-Code" className={apiTab === "no-code" ? undefined : "hidden"}>
        <DocCard icon={<Star size={24} />} title="Überblick über Automatisierungstools">
          <p>
            Sie müssen keinen Code schreiben, um Tavnit mit Ihren Abläufen zu verbinden. Jede
            Automatisierungsplattform, die eine HTTP-Anfrage senden kann, kann Arbeit in Tavnit starten,
            und jede Plattform, die einen Webhook empfangen kann, kann die Ergebnisse entgegennehmen.
          </p>
          <InfoBox color="purple" icon={<CircleDot size={20} />} title="Make">
            Visuelle Szenarien: Ein HTTP-Modul ruft Tavnit auf, und ein Custom webhook empfängt die
            Ergebnisse.
          </InfoBox>
          <InfoBox color="yellow" icon={<Zap size={20} />} title="Zapier">
            Webhooks by Zapier: Catch Hook empfängt die Ergebnisse, und eine POST-Aktion startet Runs.
          </InfoBox>
          <InfoBox color="green" icon={<CircleDot size={20} />} title="n8n">
            Selbst gehostet oder in der Cloud: Ein Webhook-Knoten empfängt die Ergebnisse, und ein
            HTTP-Request-Knoten startet Runs.
          </InfoBox>
          <InfoBox color="blue" icon={<CircleDot size={20} />} title="Power Automate">
            Eine HTTP-Aktion ruft die API auf dieselbe Weise auf.
          </InfoBox>
          <p>
            Jede Anfrage braucht den Header <InlineCode>X-API-Key</InlineCode> mit Ihrem Schlüssel
            aus <strong>Integrationen</strong>.
          </p>
        </DocCard>

        <DocCard icon={<Webhook size={24} />} title="Ergebnisse in Ihrer Automatisierung empfangen">
          <NumberedList
            items={[
              "Legen Sie auf Ihrer Plattform einen Webhook-Trigger an (Make: Custom webhook; Zapier: Webhooks by Zapier → Catch Hook; n8n: Webhook-Knoten, POST) und kopieren Sie seine URL.",
              "Fügen Sie sie in Tavnit als Webhook eines Flows (Panel Webhook) oder eines Ausgabeknotens einer Pipeline ein.",
              "Verarbeiten Sie ein Dokument, damit die Plattform den Payload kennenlernt, und ordnen Sie dann die Felder Google Sheets, einem CRM, einem ERP usw. zu.",
            ]}
          />
          <p>
            Der Payload ist auf der <DocLink href="/docs/webhooks">Webhooks-Seite</DocLink> beschrieben.
          </p>
        </DocCard>

        <DocCard icon={<CircleDot size={24} />} title="Make-Integration">
          <p>
            Make (früher Integromat) ist eine visuelle Automatisierungsplattform, mit der Sie Apps
            verbinden und Abläufe automatisieren können, ohne Code zu schreiben.
          </p>
          <a
            href="https://www.make.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-2 transition-colors text-sm font-medium mt-1"
          >
            Make besuchen <ExternalLink size={14} />
          </a>
        </DocCard>

        <DocCard icon={<Layers size={24} />} title="Erste Schritte mit Make">
          <NumberedList
            items={[
              "Öffnen Sie make.com und erstellen Sie ein Konto",
              "Klicken Sie in Ihrem Dashboard auf „Create a new scenario“",
              "Sie sehen eine leere Arbeitsfläche, auf der Sie Module hinzufügen können",
              "Suchen Sie nach „HTTP“ und fügen Sie das Modul „Make a request“ hinzu",
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Was ist ein Szenario?">
            Ein Szenario ist ein automatisierter Ablauf in Make. Es besteht aus miteinander verbundenen
            Modulen (Apps). Wenn ein Modul auslöst oder Daten empfängt, gibt es diese Daten an das
            nächste Modul weiter.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Das HTTP-Modul konfigurieren">
          <p>
            Sobald Sie das HTTP-Modul hinzugefügt haben, konfigurieren Sie es so, dass es Dokumente an
            Tavnit sendet. Sie können einen dieser beiden Ansätze verwenden:
          </p>

          <h3 className="text-base font-semibold text-accent mt-6 mb-3">
            Option 1: Multipart/form-data (wenn Sie ein Dateiobjekt haben)
          </h3>
          <NumberedList
            items={[
              "Fügen Sie Ihrem Szenario ein HTTP-Modul „Make a request“ hinzu",
              <Fragment key="f14">
                Konfigurieren Sie die Anfrage:
                <BulletList
                  items={[
                    <>URL: <InlineCode>https://run.tavnit.io/api/runs/process</InlineCode></>,
                    "Method: POST",
                  ]}
                />
              </Fragment>,
              <Fragment key="f15">
                Fügen Sie auf der Registerkarte Headers hinzu:
                <BulletList
                  items={[
                    "Header name: X-API-Key",
                    "Header value: YOUR_API_KEY",
                  ]}
                />
              </Fragment>,
              "Setzen Sie Body type auf „multipart/form-data“",
              <Fragment key="f16">
                Fügen Sie Formularfelder hinzu:
                <BulletList
                  items={[
                    "flow_id: YOUR_FLOW_ID",
                    "file: (aus dem vorherigen Modul zuordnen)",
                    "source: api (optional)",
                  ]}
                />
              </Fragment>,
              "Führen Sie Ihr Szenario zum Testen aus",
            ]}
          />

          <h3 className="text-base font-semibold text-[#6c42f0] mt-8 mb-3">
            Option 2: JSON + Base64 (wenn Sie einen Base64-String haben)
          </h3>
          <p>
            Wenn Ihr vorheriges Modul statt einer Datei einen Base64-String ausgibt, verwenden Sie diesen
            Ansatz:
          </p>
          <NumberedList
            items={[
              "Setzen Sie Body type auf „Raw“ und wählen Sie „JSON (application/json)“",
              <Fragment key="f17">
                Fügen Sie auf der Registerkarte Headers außerdem hinzu:
                <BulletList
                  items={[
                    "Header name: Content-Type",
                    "Header value: application/json",
                  ]}
                />
              </Fragment>,
              "Setzen Sie den JSON-Body auf:",
            ]}
          />
          <CodeBlock lang="JSON" code={JSON_BODY_EXAMPLE} />

          <InfoBox color="blue" icon={<Info size={20} />} title="Den Base64-Inhalt zuordnen">
            Ersetzen Sie {"{{previous_module.base64_content}}"} durch die tatsächliche Zuordnung aus
            Ihrem vorherigen Modul. Klicken Sie in Make in das Feld und wählen Sie die Base64-Ausgabe
            des Moduls, das Ihre Datei liefert. Behalten Sie die Endung in filename: Tavnit erkennt daran
            den Dateityp.
          </InfoBox>
          <p>
            Der Aufruf antwortet sofort mit einer <InlineCode>run_id</InlineCode>. Die extrahierten Daten
            kommen später über den Webhook des Flows, oder Sie rufen sie mit einem zweiten HTTP-Modul
            über <InlineCode>{"GET https://run.tavnit.io/api/runs/{run_id}"}</InlineCode> ab.
          </p>
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Andere Plattformen (Zapier, Power Automate, n8n)">
          <p>Derselbe Ansatz funktioniert mit jeder Automatisierungsplattform, die HTTP-Anfragen unterstützt:</p>
          <InfoBox color="purple" icon={<Paperclip size={20} />} title="Wenn Ihre Plattform ein Dateiobjekt liefert">
            Verwenden Sie multipart/form-data mit einem Feld „file“, das die Datei enthält, plus dem Feld
            flow_id.
          </InfoBox>
          <InfoBox color="violet" icon={<Code2 size={20} />} title="Wenn Ihre Plattform einen Base64-String liefert">
            Verwenden Sie einen JSON-Body mit flow_id, filename und file_base64 (dem Base64-Inhalt aus
            dem vorherigen Schritt).
          </InfoBox>
          <p>
            Beide Methoden rufen denselben Endpunkt auf und liefern identische Extraktionsergebnisse.
            Um Dateien zu verarbeiten, die in Google Drive, OneDrive oder Dropbox landen, lösen Sie bei
            „Neue Datei im Ordner“ aus und senden die Datei auf dieselbe Weise per POST.
          </p>
        </DocCard>

        <DocCard icon={<FolderInput size={24} />} title="Die Collections-API nutzen">
          <p>
            Wenn Sie verschiedene Dokumenttypen erhalten und die KI jedes an den richtigen Flow leiten
            soll, rufen Sie die Collection statt eines Flows auf.
          </p>
          <BulletList
            items={[
              <Fragment key="f18">URL: <InlineCode>https://run.tavnit.io/api/collections/process</InlineCode></Fragment>,
              <Fragment key="f19">Verwenden Sie <InlineCode>collection_id</InlineCode> statt <InlineCode>flow_id</InlineCode></Fragment>,
            ]}
          />
          <CodeBlock lang="JSON" code={COLLECTIONS_JSON_EXAMPLE} />
        </DocCard>

        <DocCard icon={<Split size={24} />} title="Die Splitters-API nutzen">
          <p>
            Wenn Sie zusammengefasste PDFs mit mehreren Dokumenten erhalten und diese getrennt werden
            müssen, rufen Sie den Splitter auf.
          </p>
          <BulletList
            items={[
              <Fragment key="f22">URL: <InlineCode>https://run.tavnit.io/api/splits/run</InlineCode></Fragment>,
              <Fragment key="f23">Verwenden Sie <InlineCode>splitter_id</InlineCode> statt <InlineCode>flow_id</InlineCode></Fragment>,
            ]}
          />
          <CodeBlock lang="JSON" code={SPLITTERS_JSON_EXAMPLE} />
        </DocCard>

        <DocCard icon={<Route size={24} />} title="Eine Pipeline starten">
          <p>
            Um eine ganze Pipeline statt eines einzelnen Flows auszuführen, senden Sie die Datei
            (Multipart-<InlineCode>file</InlineCode> oder JSON <InlineCode>file_base64</InlineCode> +{" "}
            <InlineCode>filename</InlineCode>) per POST an{" "}
            <InlineCode>https://run.tavnit.io/api/pipelines/YOUR_PIPELINE_ID/execute</InlineCode>{" "}
            mit demselben Header. Die Pipeline-ID steht in der URL.
          </p>
        </DocCard>

        <DocCard icon={<Wand2 size={24} />} title="Die Cleaners-API nutzen">
          <p>
            Um Datenzeilen aus Ihrer Automatisierung zu bereinigen, senden Sie sie als JSON an den
            Cleaner. Eine Tabellendatei geht stattdessen an{" "}
            <InlineCode>https://run.tavnit.io/api/sweeps/run</InlineCode>, als multipart mit{" "}
            <InlineCode>cleaner_id</InlineCode> (dieser Endpunkt nimmt kein Base64 an).
          </p>
          <BulletList
            items={[
              <Fragment key="f20">URL: <InlineCode>https://run.tavnit.io/api/cleaners/YOUR_CLEANER_ID/process</InlineCode></Fragment>,
              "Method: POST, Content-Type: application/json",
            ]}
          />
          <CodeBlock lang="JSON" code={CLEANERS_JSON_EXAMPLE} />
        </DocCard>

        <DocCard icon={<Database size={24} />} title="Die Buckets-API nutzen">
          <p>
            Um Zeilen in einen Bucket zu schreiben, ohne ein Dokument zu senden, verwenden Sie den
            Schreib-Endpunkt. Jede Zeile muss alle Spalten des Buckets enthalten.
          </p>
          <BulletList
            items={[
              <Fragment key="f24">URL: <InlineCode>https://run.tavnit.io/api/buckets/write</InlineCode></Fragment>,
              "Method: POST, Content-Type: application/json",
              <Fragment key="f25">Header: <InlineCode>X-API-Key: YOUR_API_KEY</InlineCode></Fragment>,
            ]}
          />
          <CodeBlock lang="JSON" code={BUCKETS_JSON_EXAMPLE} />
          <InfoBox color="purple" icon={<Info size={20} />} title="Bucket-ID und Namen finden">
            Öffnen Sie die Detailseite des Buckets und tippen Sie auf das Info-Symbol. Beide Werte lassen
            sich mit einem Tipp kopieren.
          </InfoBox>
        </DocCard>

        <DocCard icon={<ClipboardCheck size={24} />} title="Weitere Funktionen">
          <p>
            Agents, Matchers, Inspectors, Fillers, Signals, Subjects und Nets werden auf dieselbe Weise
            gestartet: eine HTTP-Anfrage mit dem Header <InlineCode>X-API-Key</InlineCode>. Wechseln Sie
            zur Registerkarte <strong>Code</strong>, um die Felder jedes Endpunkts zu sehen.
          </p>
        </DocCard>
      </div>

      <Related
        links={[
          {
            href: "/docs/webhooks",
            label: "Ergebnisse per Webhook empfangen",
            description: "Der Payload, den Tavnit sendet, wenn ein Run abgeschlossen ist, und wie Sie einen Empfänger bauen.",
          },
          {
            href: "/docs/mcp-connector",
            label: "Einen KI-Assistenten mit dem MCP-Connector verbinden",
            description: "Nutzen Sie Tavnit aus claude.ai, Cursor oder einem anderen MCP-Client.",
          },
          {
            href: "/docs/user-roles",
            label: "Benutzerrollen und Berechtigungen",
            description: "Warum ein Schlüssel der Rolle Nur HITL prüfen, aber nicht verarbeiten kann.",
          },
        ]}
      />
    </section>
  );
}
