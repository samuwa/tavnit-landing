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
 * /nl/docs/api-integration — translated from components/docs/ApiIntegrationContent.tsx.
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


const FIELD_HEAD = ["Veld", "Verplicht", "Beschrijving"];

export default function ApiIntegrationNl() {
  const hashNoCode = useSyncExternalStore(subscribeHash, hashIsNoCode, serverHash);
  const [chosenTab, setChosenTab] = useState<ApiTab | null>(null);
  const apiTab: ApiTab = chosenTab ?? (hashNoCode ? "no-code" : "code");
  const [lang, setLang] = useState<Lang>("python");

  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        API-integratie
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
        <DocCard icon={<Info size={24} />} title="Hoe de API werkt">
          <p>
            Met de Tavnit REST API kan je eigen code doen wat jij in de app doet: documenten naar een
            Flow, Collection, Splitter of Pipeline sturen, Cleaners, Matchers, Inspectors, Fillers,
            Signals en Agents uitvoeren, Buckets lezen en schrijven, de cases van een Subject beheren,
            en menselijke beoordelingen goedkeuren of afwijzen.
          </p>
          <BulletList
            items={[
              <Fragment key="b0">
                Basis-URL: <InlineCode>https://run.tavnit.io/api</InlineCode>. Elk pad hieronder is
                daar relatief aan.
              </Fragment>,
              <Fragment key="b1">
                Elk verzoek bevat je API-sleutel in de header <InlineCode>X-API-Key</InlineCode>.
              </Fragment>,
              <Fragment key="b2">
                Verwerking is asynchroon. Endpoints die werk starten, antwoorden meteen met{" "}
                <strong>202 Accepted</strong> en een ID, en het werk draait op de achtergrond. Het
                resultaat krijg je door te pollen (Runs, Agent-Runs, Catches, cases) of via een{" "}
                <DocLink href="/docs/webhooks">webhook</DocLink> die op de functie is ingesteld.
              </Fragment>,
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Bètafuncties">
            Pipelines, Subjects, Matchers, Inspectors, Fillers, Signals en Nets zijn in bèta. Hun
            endpoints werken nu al, maar details kunnen nog veranderen.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Lock size={24} />} title="Authenticatie en ID's">
          <h3 className="text-base font-semibold text-fg-2 mt-2 mb-1">API-sleutel</h3>
          <p>
            Open <strong>Integraties</strong> in de zijbalk van de app. De kaart{" "}
            <strong>API-sleutel</strong> toont je sleutel (maak hem daar zichtbaar en kopieer hem).
            Elk lid heeft in elke organisatie een eigen sleutel, en een verzoek handelt als dat lid in
            die organisatie.
          </p>
          <WarningBox>
            Houd je API-sleutel geheim. <strong>Opnieuw genereren</strong> op dezelfde kaart maakt de
            huidige sleutel meteen ongeldig, en alles wat hem nog gebruikt, werkt niet meer.
          </WarningBox>
          <p>Een verzoek zonder geldige sleutel krijgt:</p>
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
            De sleutel draagt je rol. Leden met de rol <strong>Alleen HITL</strong> kunnen alleen de
            endpoints voor goedkeuren en afwijzen van menselijke beoordelingen en de endpoints voor de
            API-sleutel gebruiken. Elk verwerkings- en gegevensendpoint weigert hen met{" "}
            <strong>403</strong> en <InlineCode>Your role only permits HITL reviews</InlineCode>. Zie{" "}
            <DocLink href="/docs/user-roles">gebruikersrollen</DocLink>.
          </p>

          <h3 className={H3}>ID&apos;s</h3>
          <p>
            Elke Flow, Collection, Splitter, Cleaner, Bucket, Agent, Matcher, Inspector, Filler en
            Pipeline toont zijn ID op zijn detailpagina, met een kopieerknop. Resources moeten bij de
            organisatie van je sleutel horen: het ID van een andere organisatie geeft 403 of 404.
          </p>
        </DocCard>

        <DocCard icon={<Download size={24} />} title="Bestanden versturen">
          <p>Endpoints die een document aannemen, accepteren het op een van twee manieren:</p>
          <InfoBox color="purple" icon={<Paperclip size={20} />} title="Multipart-bestandsupload">
            Stuur het bestand als multipart/form-data in een veld met de naam file, met de andere
            velden als formuliervelden. Werkt op elk bestandsendpoint.
          </InfoBox>
          <InfoBox color="violet" icon={<Code2 size={20} />} title="Base64 in een JSON-body">
            Stuur JSON met file_base64 (de inhoud van het bestand) en filename (met de extensie),
            plus de andere velden. Handig als een automatiseringstool je base64 geeft in plaats van een
            bestand.
          </InfoBox>
          <DataTable
            head={["Endpoint", "Base64", "Geaccepteerde bestanden"]}
            rows={[
              ["POST /runs/process", "Ja", "PDF, afbeeldingen (PNG, JPG, JPEG, JFIF, TIF, TIFF, WEBP, BMP, GIF), spreadsheets (XLSX, XLS, CSV)"],
              ["POST /collections/process", "Ja", "Zelfde als bij Runs"],
              ["POST /splits/run", "Ja", "Zelfde als bij Runs"],
              ["POST /pipelines/{id}/execute", "Ja", "PDF en afbeeldingen"],
              ["POST /signals/{id}/run", "Ja", "Audio: MP3, MP4, MPEG, MPGA, M4A, WAV, WEBM"],
              ["POST /sweeps/run", "Nee", "Spreadsheets: CSV, XLSX, XLS"],
              ["Inspectors, Fillers, Subjects en cases", "Nee", "Het document als multipart-bestand"],
            ]}
          />
          <p>
            Eén verzoek mag maximaal 150 MB zijn. Het bestandstype wordt afgeleid uit de extensie van
            de bestandsnaam.
          </p>
        </DocCard>

        <DocCard icon={<ListChecks size={24} />} title="Antwoorden en fouten">
          <p>
            Antwoorden zijn JSON met een vlag <InlineCode>success</InlineCode>. Fouten bevatten een
            string <InlineCode>error</InlineCode>, soms een <InlineCode>message</InlineCode>, en
            extra sleutels die het probleem uitleggen:
          </p>
          <CodeBlock lang="Voorbeeld 409" code={API_ERROR_EXAMPLE} />
          <DataTable
            head={["Status", "Betekenis"]}
            rows={[
              ["200 / 201", "Klaar (lezen, annuleren, goedkeuringen) / aangemaakt (cases, fills, inspecties)."],
              ["202", "Geaccepteerd: het werk staat in de wachtrij. Bewaar het teruggegeven ID."],
              ["400", "Een verplicht veld ontbreekt of is ongeldig, het bestandstype wordt niet ondersteund, of de resource is inactief of niet ingesteld."],
              ["401", "X-API-Key ontbreekt of is ongeldig."],
              ["402", "Je organisatie kan op dit moment geen nieuw werk starten; neem contact op met het Tavnit-team."],
              ["403", "De resource hoort bij een andere organisatie, je rol is Alleen HITL, of je bent geen beoordelaar van dat item."],
              ["404", "Het ID bestaat niet in je organisatie."],
              ["409", "Conflict met de huidige status: Bucket-naam komt niet overeen, al geannuleerd of afgerond, case gesloten, slot al gevuld."],
              ["429", "Er wachten al te veel Runs op een Agent."],
              ["500", "Onverwachte fout. Later opnieuw proberen is veilig."],
            ]}
          />
        </DocCard>

        <DocCard icon={<Layers size={24} />} title="Overzicht van endpoints">
          <DataTable
            head={["Functie", "Methode en pad", "Wat het doet"]}
            rows={[
              ["Flows", "POST /runs/process", "Een document met een Flow extraheren"],
              ["Flows", "GET /runs/{run_id}", "Status van de Run en geëxtraheerde gegevens"],
              ["Flows", "GET /runs/{run_id}/source-file", "Het originele document"],
              ["Collections", "POST /collections/process", "AI leidt een document naar de juiste Flow of Splitter"],
              ["Collections", "GET /collection-runs/{id}/source-file", "Het originele document"],
              ["Splitters", "POST /splits/run", "Een bestand met meerdere documenten splitsen"],
              ["Splitters", "GET /splits/{split_id}/source-file", "De originele bundel"],
              ["Cleaners", "POST /sweeps/run", "Een Sweep over een spreadsheet"],
              ["Cleaners", "POST /cleaners/{cleaner_id}/process", "Een Sweep over rijen die als JSON zijn verstuurd"],
              ["Buckets", "POST /buckets/write", "Rijen toevoegen of vervangen"],
              ["Buckets", "GET /buckets/read", "Rijen lezen, gepagineerd"],
              ["Agents", "POST /bots/{agent_id}/runs", "Een Agent-Run starten"],
              ["Agents", "GET /bot-runs/{bot_run_id}", "Eén Agent-Run pollen"],
              ["Agents", "GET /bots/{agent_id}/runs", "De Runs van een Agent opsommen"],
              ["Agents", "POST /bot-runs/{bot_run_id}/cancel", "Een Agent-Run annuleren"],
              ["Matchers", "POST /matchers/{matcher_id}/run", "Voltooide Runs matchen"],
              ["Inspectors", "POST /inspectors/{inspector_id}/process", "Een document aan een inspectie toevoegen"],
              ["Fillers", "POST /fillers/{filler_id}/fills", "Een fill openen en documenten toevoegen"],
              ["Pipelines", "POST /pipelines/{pipeline_id}/execute", "Een Pipeline uitvoeren"],
              ["Signals", "POST /signals/{signal_id}/run", "Een audiobestand structureren (een Wave)"],
              ["Subjects", "POST /subjects/{subject_id}/process", "Een document naar een case leiden"],
              ["Nets", "POST /nets/{net_id}/catch", "Een Catch starten"],
              ["Menselijke beoordeling", "POST /runs/{run_id}/hitl/approve", "Gepauzeerde items goedkeuren of afwijzen"],
              ["API-sleutel", "GET /me/api-key", "Je sleutel lezen of opnieuw genereren"],
            ]}
          />
          <p>Elke functie wordt hieronder uitgewerkt, met haar andere endpoints.</p>
        </DocCard>

        {/* ── Flows ── */}
        <DocCard icon={<FileText size={24} />} title="Flows: een document verwerken">
          <p>Stuur één document naar een Flow. Tavnit maakt een Run aan en extraheert het op de achtergrond.</p>
          <Endpoint method="POST" path="/runs/process" />
          <DataTable
            head={FIELD_HEAD}
            rows={[
              ["flow_id", "Ja", "De Flow die het document extraheert."],
              ["file", "Ja*", "Het document (multipart)."],
              ["file_base64 + filename", "Ja*", "In plaats van file: de base64-inhoud en de bestandsnaam met extensie."],
              ["content_type", "Nee", "MIME-type voor een base64-bestand."],
              ["source", "Nee", "Label dat op de Run wordt opgeslagen: api (standaard), email, manual_upload of collection."],
            ]}
            caption="* Stuur óf file óf file_base64 + filename."
          />
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python" code={PYTHON_CODE} />
          ) : (
            <CodeBlock lang="JavaScript" code={JAVASCRIPT_CODE} />
          )}
          <CodeBlock lang="Antwoord 202" code={RUN_PROCESS_RESPONSE} />
          <p>
            Fouten: 400 (geen bestand, geen flow_id, niet-ondersteund of ongeldig bestand), 403 (Flow
            van een andere organisatie), 404 (Flow niet gevonden). Een geweigerd verzoek maakt waar
            mogelijk toch een mislukte Run aan en geeft de <InlineCode>run_id</InlineCode> terug,
            zodat je hem kunt terugvinden in <strong>Runs</strong>.
          </p>

          <h3 className={H3}>De Run en zijn gegevens ophalen</h3>
          <Endpoint method="GET" path="/runs/{run_id}" />
          <p>
            Poll tot <InlineCode>status</InlineCode> een eindstatus heeft. Statussen:{" "}
            <InlineCode>queued</InlineCode>, <InlineCode>running</InlineCode>,{" "}
            <InlineCode>awaiting_approval</InlineCode> (gepauzeerd voor{" "}
            <DocLink href="/docs/human-in-the-loop">menselijke beoordeling</DocLink>),{" "}
            <InlineCode>completed</InlineCode>, <InlineCode>failed</InlineCode> en{" "}
            <InlineCode>cancelled</InlineCode>. <InlineCode>data</InlineCode> bevat de geëxtraheerde
            rijen en blijft <InlineCode>null</InlineCode> tot de Run is voltooid, ook zolang hij op
            goedkeuring wacht. Is <InlineCode>columns</InlineCode> gezet, gebruik dat dan voor de
            volgorde van de kolommen. <InlineCode>attempt</InlineCode> en{" "}
            <InlineCode>previous_attempts</InlineCode> tonen automatische nieuwe pogingen. Voeg{" "}
            <InlineCode>?include_document=true</InlineCode> toe om ook een ondertekende link naar het
            originele bestand te krijgen. Dit werkt voor elke Run, ook voor Runs die door Collections,
            Splitters, Pipelines en e-mail zijn aangemaakt.
          </p>
          <CodeBlock lang="Antwoord 200" code={RUN_GET_RESPONSE} />
          {lang === "python" ? (
            <CodeBlock lang="Python (versturen en pollen)" code={PYTHON_RUN_POLL_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (versturen en pollen)" code={JAVASCRIPT_RUN_POLL_CODE} />
          )}

          <h3 className={H3}>Het originele document ophalen</h3>
          <Endpoint method="GET" path="/runs/{run_id}/source-file" />
          <p>
            Geeft een ondertekende URL naar het bestand zoals het is geüpload, ongeacht de status van de
            Run. Met het optionele <InlineCode>expires_in</InlineCode> stel je de geldigheid van de link
            in seconden in (60 tot 604800, standaard 7 dagen). Met{" "}
            <InlineCode>?download=true</InlineCode> is het antwoord het bestand zelf.
          </p>
          <CodeBlock lang="Antwoord 200" code={SOURCE_FILE_RESPONSE} />
        </DocCard>

        {/* ── Collections ── */}
        <DocCard icon={<FolderInput size={24} />} title="Collections: laat AI het document routeren">
          <p>
            Stuur een document zonder de Flow te kiezen: AI kiest de beste Flow of Splitter van de
            Collection. Gebruik dit als je gemengde documenttypen ontvangt.
          </p>
          <Endpoint method="POST" path="/collections/process" />
          <p>
            Zelfde body als <InlineCode>/runs/process</InlineCode>, met{" "}
            <InlineCode>collection_id</InlineCode> in plaats van <InlineCode>flow_id</InlineCode> (of
            zet het ID in het pad: <InlineCode>{"/collections/{collection_id}/process"}</InlineCode>).
            De Collection moet actief zijn en minstens één actieve Flow of Splitter hebben, anders
            antwoordt de aanroep met 400.
          </p>
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python (Collections)" code={PYTHON_COLLECTIONS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Collections)" code={JAVASCRIPT_COLLECTIONS_CODE} />
          )}
          <CodeBlock lang="Antwoord 202" code={COLLECTION_PROCESS_RESPONSE} />
          <p>
            De gekozen Flow maakt een normale Run aan, en de webhook-payload daarvan bevat{" "}
            <InlineCode>collection_run_id</InlineCode>, zodat je het resultaat aan je verzoek kunt
            koppelen. Het origineel is meteen beschikbaar op{" "}
            <InlineCode>{"GET /collection-runs/{collection_run_id}/source-file"}</InlineCode> (zelfde
            opties als het bronbestand van een Run). Zie{" "}
            <DocLink href="/docs/collections">Collections</DocLink>.
          </p>
        </DocCard>

        {/* ── Splitters ── */}
        <DocCard icon={<Split size={24} />} title="Splitters: een bestand met meerdere documenten splitsen">
          <p>
            Stuur een bestand dat meerdere documenten bevat. De Splitter vindt waar elk document begint
            en eindigt, classificeert het en stuurt elk deel naar de plek die bij zijn documenttype
            hoort.
          </p>
          <Endpoint method="POST" path="/splits/run" />
          <p>
            Zelfde body als <InlineCode>/runs/process</InlineCode>, met{" "}
            <InlineCode>splitter_id</InlineCode>.
          </p>
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python (Splitters)" code={PYTHON_SPLITTERS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Splitters)" code={JAVASCRIPT_SPLITTERS_CODE} />
          )}
          <CodeBlock lang="Antwoord 202" code={SPLIT_RUN_RESPONSE} />
          <p>
            Delen die naar Flows gaan, worden eigen Runs, en hun webhooks bevatten{" "}
            <InlineCode>split_id</InlineCode>. De originele bundel staat op{" "}
            <InlineCode>{"GET /splits/{split_id}/source-file"}</InlineCode>. Zie{" "}
            <DocLink href="/docs/splitters">Splitters</DocLink>.
          </p>
        </DocCard>

        {/* ── Cleaners ── */}
        <DocCard icon={<Wand2 size={24} />} title="Cleaners: een Sweep uitvoeren">
          <p>
            Een Sweep laat een Cleaner over rijen gegevens lopen om waarden te normaliseren, te
            classificeren, op te zoeken of te verrijken. Stuur de rijen als spreadsheet of als JSON.
          </p>
          <Endpoint method="POST" path="/sweeps/run" />
          <DataTable
            head={FIELD_HEAD}
            rows={[
              ["cleaner_id", "Ja", "De Cleaner die moet draaien."],
              ["file", "Ja", "CSV, XLSX of XLS, alleen multipart. Kopteksten op de eerste rij; elk basisveld dat de Cleaner vereist, moet een kolom zijn, zonder duplicaten."],
              ["sheet_name", "Nee", "Welk blad van een werkmap gelezen wordt (standaard: het eerste)."],
            ]}
          />
          <Endpoint method="POST" path="/cleaners/{cleaner_id}/process" />
          <p>
            Stuur JSON met <InlineCode>rows</InlineCode> (een array van objecten), of een
            multipart-<InlineCode>file</InlineCode> zoals hierboven.
          </p>
          <CodeBlock lang="JSON-body" code={CLEANERS_JSON_EXAMPLE} />
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python (Cleaners)" code={PYTHON_CLEANERS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Cleaners)" code={JAVASCRIPT_CLEANERS_CODE} />
          )}
          <CodeBlock lang="Antwoord 202" code={SWEEP_RUN_RESPONSE} />
          <p>
            Een Cleaner met een ongeldige configuratie antwoordt met 400 en{" "}
            <InlineCode>validation_errors</InlineCode>. Zie{" "}
            <DocLink href="/docs/cleaners">Cleaners</DocLink>.
          </p>
        </DocCard>

        {/* ── Buckets ── */}
        <DocCard icon={<Database size={24} />} title="Buckets: rijen schrijven en lezen">
          <p>
            Zet rijen vanuit je eigen systemen in een Bucket, of lees wat je Flows daar hebben
            opgeslagen. Het ID en de naam van de Bucket vind je door op het info-icoon op de pagina van
            de Bucket te tikken. De naam is een veiligheidscontrole: komt hij niet overeen met het ID,
            dan antwoordt de aanroep met <strong>409</strong>.
          </p>
          <Endpoint method="POST" path="/buckets/write" />
          <DataTable
            head={FIELD_HEAD}
            rows={[
              ["bucket_id", "Ja", "De Bucket."],
              ["bucket_name", "Ja", "De exacte naam ervan."],
              ["overwrite", "Ja", "Boolean. false voegt de rijen toe; true vervangt alle bestaande rijen."],
              ["rows", "Ja", "Array van objecten, maximaal 50.000 per verzoek."],
            ]}
          />
          <p>
            Stuur de body als <InlineCode>application/json</InlineCode>. Elke rij moet precies de
            kolommen van de Bucket hebben, op kolomnaam of weergavenaam: een ontbrekende of onbekende
            kolom breekt het hele schrijven af met 400, met een lijst van{" "}
            <InlineCode>missing_columns</InlineCode> en <InlineCode>extra_columns</InlineCode>.
          </p>
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python (Buckets)" code={PYTHON_BUCKETS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Buckets)" code={JAVASCRIPT_BUCKETS_CODE} />
          )}
          <CodeBlock lang="Antwoord 202" code={BUCKET_WRITE_RESPONSE} />

          <h3 className={H3}>Rijen lezen</h3>
          <Endpoint method="GET" path="/buckets/read" />
          <p>
            Queryparameters: <InlineCode>bucket_id</InlineCode> en{" "}
            <InlineCode>bucket_name</InlineCode> (verplicht), <InlineCode>limit</InlineCode> (1 tot
            1000, standaard 100) en <InlineCode>offset</InlineCode> (standaard 0). Blader door met{" "}
            <InlineCode>offset</InlineCode> zolang <InlineCode>has_more</InlineCode> true is;{" "}
            <InlineCode>total_count</InlineCode> telt alle rijen. De sleutels van{" "}
            <InlineCode>data</InlineCode> in een rij zijn de kolomnamen; gebruik{" "}
            <InlineCode>columns</InlineCode> voor de weergavenamen. Opgeslagen bestandslinks komen
            terug als nieuwe ondertekende URL&apos;s.
          </p>
          <CodeBlock lang="Verzoek" code={BUCKET_READ_REQUEST} />
          <CodeBlock lang="Antwoord 200" code={BUCKET_READ_RESPONSE} />
          <p>
            Zie <DocLink href="/docs/buckets">Buckets</DocLink>.
          </p>
        </DocCard>

        {/* ── Agents ── */}
        <DocCard icon={<Bot size={24} />} title="Agents: Runs starten en pollen">
          <p>
            Start een Agent vanuit je code en haal op wat hij heeft vastgelegd. Agents worden op
            aanvraag per organisatie ingeschakeld: neem contact op met support om ze aan te zetten.
          </p>
          <Endpoint method="POST" path="/bots/{agent_id}/runs" />
          <p>
            Met de optionele JSON <InlineCode>{'{"inputs": {...}}'}</InlineCode> overschrijf je de
            invoervariabelen van de Agent voor deze Run. Alleen variabelen die de Agent declareert,
            worden gebruikt, en geheime waarden worden nooit geaccepteerd. Je kunt ook{" "}
            <InlineCode>POST /bots/runs</InlineCode> aanroepen met <InlineCode>bot_id</InlineCode> in
            de body. Elke aanroep start een nieuwe Run.
          </p>
          <CodeBlock lang="Verzoek" code={AGENT_TRIGGER_REQUEST} />
          <p>
            <InlineCode>status</InlineCode> is <InlineCode>queued</InlineCode>, of{" "}
            <InlineCode>waiting</InlineCode> als de Agent één Run tegelijk draait en bezet is (de Run
            start vanzelf wanneer hij aan de beurt is). 409 als de Agent is gearchiveerd, 429 als er al
            te veel Runs wachten.
          </p>

          <h3 className={H3}>Pollen, opsommen en annuleren</h3>
          <DataTable
            head={["Endpoint", "Wat het doet"]}
            rows={[
              ["GET /bot-runs/{bot_run_id}", "Eén Run: status, tijden, invoer (zonder geheimen) en uitvoer met ondertekende bestandslinks. Ook op GET /bots/{agent_id}/runs/{bot_run_id}."],
              ["GET /bots/{agent_id}/runs", "Nieuwste eerst, zonder invoer en uitvoer. Query: status (queued, running, completed, failed, cancelled), limit (1 tot 100, standaard 20), offset. Geeft runs en total terug."],
              ["POST /bot-runs/{bot_run_id}/cancel", "Annuleert een wachtende, ingeplande of lopende Run. 409 als de Run al klaar is. Ook op POST /bots/{agent_id}/runs/{bot_run_id}/cancel."],
            ]}
          />
          <CodeBlock lang="GET /bot-runs/{bot_run_id}" code={AGENT_RUN_RESPONSE} />
          <p>
            Zie <DocLink href="/docs/agents">Agents</DocLink>.
          </p>
        </DocCard>

        {/* ── Matchers ── */}
        <DocCard icon={<Target size={24} />} title="Matchers: Runs matchen">
          <p>
            Vergelijk voltooide Runs van de Flow van de Matcher, bijvoorbeeld facturen met
            inkooporders.
          </p>
          <Endpoint method="POST" path="/matchers/{matcher_id}/run" />
          <DataTable
            head={FIELD_HEAD}
            rows={[
              ["run_ids", "Ja", "Twee of meer voltooide Runs van de Flow van de Matcher."],
              ["benchmark_run_id", "In benchmarkmodus", "De Run waarmee de andere worden vergeleken."],
            ]}
          />
          <CodeBlock lang="Verzoek" code={MATCHER_RUN_REQUEST} />
          <p>
            Er is geen API-endpoint om een match te lezen: je krijgt het resultaat via de webhook- of
            e-mailoutput van de Matcher, of in de app. Zie{" "}
            <DocLink href="/docs/matchers">Matchers</DocLink>.
          </p>
        </DocCard>

        {/* ── Inspectors ── */}
        <DocCard icon={<ShieldCheck size={24} />} title="Inspectors: een set documenten controleren">
          <p>
            Een inspectie verzamelt documenten, leidt elk document naar een slot van de Inspector,
            extraheert het en evalueert de checklist.
          </p>
          <Endpoint method="POST" path="/inspectors/{inspector_id}/process" />
          <p>
            Multipart-<InlineCode>file</InlineCode>. Zonder <InlineCode>inspection_id</InlineCode>{" "}
            wordt een nieuwe inspectie aangemaakt; geef het teruggegeven{" "}
            <InlineCode>inspection_id</InlineCode> mee om er meer documenten aan toe te voegen (de
            inspectie moet nog aan het verzamelen zijn, anders 409). De Inspector moet actief zijn.
          </p>
          <CodeBlock lang="Verzoek" code={INSPECTOR_PROCESS_REQUEST} />
          <DataTable
            head={["Endpoint", "Wat het doet"]}
            rows={[
              ["POST /inspectors/{inspector_id}/inspections", "Maakt een lege inspectie aan (201) om later documenten aan toe te voegen."],
              ["POST /inspections/{inspection_id}/fire", "Stopt met verzamelen en evalueert nu. 400 met missing_inputs als een verplicht slot geen document heeft."],
            ]}
          />
          <p>
            Het resultaat komt binnen via de webhook- of e-mailoutput van de Inspector. Zie{" "}
            <DocLink href="/docs/inspectors">Inspectors</DocLink>.
          </p>
        </DocCard>

        {/* ── Fillers ── */}
        <DocCard icon={<FileOutput size={24} />} title="Fillers: PDF-formulieren invullen">
          <p>
            Een fill verzamelt de documenten die een Filler nodig heeft, extraheert ze en schrijft de
            waarden in de PDF-sjablonen van de Filler.
          </p>
          <DataTable
            head={["Endpoint", "Wat het doet"]}
            rows={[
              ["POST /fillers/{filler_id}/fills", "Opent een fill (201, geeft fill_id terug). De Filler heeft een sjabloon en veldkoppelingen nodig."],
              ["POST /fills/{fill_id}/route-upload", "Multipart-bestand; AI leidt het naar een open slot (202)."],
              ["POST /fills/{fill_id}/inputs/{input_id}/upload", "Multipart-bestand voor een specifiek slot; start de Run van dat slot (202)."],
              ["POST /fills/{fill_id}/inputs/{input_id}/attach-run", "JSON run_id: een voltooide Run hergebruiken voor een slot (202)."],
              ["POST /fills/{fill_id}/fire", "Vult nu in in plaats van op elk slot te wachten. 400 met missing_inputs als een verplicht slot leeg is."],
              ["POST /fillers/{filler_id}/templates", "Voegt een sjabloon-PDF toe (multipart-bestand, optionele name). Koppel de velden ervan in de app."],
            ]}
          />
          <CodeBlock lang="Verzoek" code={FILLER_REQUEST} />
          <p>
            De ingevulde PDF&apos;s komen binnen via de webhook- of e-mailoutput van de Filler. Zie{" "}
            <DocLink href="/docs/fillers">Fillers</DocLink>.
          </p>
        </DocCard>

        {/* ── Pipelines ── */}
        <DocCard icon={<Route size={24} />} title="Pipelines: uitvoeren">
          <p>Start één uitvoering van een Pipeline met een document.</p>
          <Endpoint method="POST" path="/pipelines/{pipeline_id}/execute" />
          <p>
            Multipart-<InlineCode>file</InlineCode> of <InlineCode>file_base64</InlineCode> +{" "}
            <InlineCode>filename</InlineCode>; PDF of afbeelding. 400 als de Pipeline inactief is of
            haar graaf niet kan draaien (met <InlineCode>validation_errors</InlineCode>).
          </p>
          <CodeBlock lang="Verzoek" code={PIPELINE_EXECUTE_REQUEST} />
          <p>
            Annuleer met{" "}
            <InlineCode>{"POST /pipelines/executions/{execution_id}/cancel"}</InlineCode> (409 als de
            uitvoering niet loopt). Resultaten verlaten de Pipeline via haar Output-nodes. Zie{" "}
            <DocLink href="/docs/pipelines">Pipelines</DocLink>.
          </p>
        </DocCard>

        {/* ── Signals ── */}
        <DocCard icon={<AudioLines size={24} />} title="Signals: een audiobestand structureren">
          <p>Stuur een opname en het Signal zet die om in gestructureerde gegevens (een Wave).</p>
          <Endpoint method="POST" path="/signals/{signal_id}/run" />
          <p>
            Multipart-<InlineCode>file</InlineCode> of base64. Audio tot 150 MB en 8 uur, met maximaal
            2 uur gedetecteerde spraak.
          </p>
          <CodeBlock lang="Verzoek" code={SIGNAL_RUN_REQUEST} />
          <p>
            Het resultaat komt binnen via de webhook van het Signal of in de app. Zie{" "}
            <DocLink href="/docs/signals">Signals</DocLink>.
          </p>
        </DocCard>

        {/* ── Subjects ── */}
        <DocCard icon={<Briefcase size={24} />} title="Subjects en cases">
          <p>Berg documenten op in de cases van een Subject en beheer cases vanuit je code.</p>
          <DataTable
            head={["Endpoint", "Wat het doet"]}
            rows={[
              ["POST /subjects/{subject_id}/process", "Multipart-bestand; Tavnit leidt het naar een case (202, geeft subject_doc_id terug)."],
              ["POST /cases/{case_id}/docs", "Multipart-bestand rechtstreeks in een case, zonder routering. doc_type_id is verplicht, tenzij het Subject één documenttype heeft. Geeft de run_id terug (202). 409 als de case gesloten is of dat documenttype al gevuld is."],
              ["POST /subjects/{subject_id}/docs/{doc_id}/assign", "JSON case_id en doc_type_id: een vastgehouden document handmatig opbergen (202)."],
              ["POST /subjects/{subject_id}/cases", "JSON name (verplicht, uniek, maximaal 200 tekens) en params (optioneel object). Maakt een case aan (201). 409 als de naam al bestaat."],
              ["GET /subjects/{subject_id}/cases", "Query: state (open of closed), status, search, limit (maximaal 200, standaard 50), offset. Geeft cases en total terug."],
              ["GET /cases/{case_id}", "De case plus zijn documenten, elk met de run_id om te pollen op GET /runs/{run_id}."],
              ["POST /cases/{case_id}/close", "Sluit de case (200). Nieuwe documenten ervoor worden vastgehouden in plaats van opgeborgen. 409 als hij al gesloten is."],
              ["POST /cases/{case_id}/reopen", "Heropent hem (200). 409 als hij open is."],
              ["POST /cases/{case_id}/inspections", "JSON subject_inspector_id: laat een gekoppelde Inspector over de voltooide Runs van de case lopen (202)."],
            ]}
          />
          <CodeBlock lang="Verzoek" code={CASE_REQUEST} />
          <CodeBlock lang="Antwoord 201" code={CASE_RESPONSE} />
          <p>
            Zie <DocLink href="/docs/subjects">Subjects</DocLink>.
          </p>
        </DocCard>

        {/* ── Nets ── */}
        <DocCard icon={<Radar size={24} />} title="Nets: een Catch starten">
          <p>Nets worden per organisatie ingeschakeld. Zonder toegang antwoorden deze endpoints met 403.</p>
          <Endpoint method="POST" path="/nets/{net_id}/catch" />
          <p>
            Zonder body gaat de Catch verder waar de vorige eindigde. Stuur{" "}
            <InlineCode>window_start</InlineCode> en/of <InlineCode>window_end</InlineCode>{" "}
            (ISO-tijdstempels) om in plaats daarvan een periode achteraf op te halen. 409 als de Net
            inactief is of als er al een Catch loopt die verdergaat vanaf de vorige.
          </p>
          <CodeBlock lang="Verzoek" code={NET_CATCH_REQUEST} />
          <p>
            Poll <InlineCode>{"GET /catches/{catch_id}"}</InlineCode>: status, fase, aantallen en, zodra
            de Catch voltooid is, <InlineCode>output</InlineCode> met kolommen en rijen. Annuleer met{" "}
            <InlineCode>{"POST /catches/{catch_id}/cancel"}</InlineCode>. Zie{" "}
            <DocLink href="/docs/nets">Nets</DocLink>.
          </p>
        </DocCard>

        {/* ── HITL ── */}
        <DocCard icon={<UserCheck size={24} />} title="Menselijke beoordeling: goedkeuren of afwijzen">
          <p>
            Items die voor beoordeling zijn gepauzeerd, kun je vanuit je eigen tools goedkeuren of
            afwijzen. Alleen een ingestelde beoordelaar van die Flow, Matcher, Inspector of Filler kan
            dat doen (anders 403), en het item moet op <InlineCode>awaiting_approval</InlineCode> staan
            (anders 409). Deze endpoints zijn open voor de rol Alleen HITL.
          </p>
          <DataTable
            head={["Endpoint", "Body"]}
            rows={[
              ["POST /runs/{run_id}/hitl/approve", "output_json (verplicht): de definitieve rijen; diff (optionele lijst met wijzigingen). 400 met missing_fields als een verplicht veld voor menselijke invoer leeg is."],
              ["POST /matches/{match_id}/hitl/approve", "groups (de definitieve groepering), excluded, diff."],
              ["POST /inspections/{inspection_id}/hitl/approve", "waivers (item_id en reason voor elk mislukt item dat je vrijstelt), diff."],
              ["POST /fills/{fill_id}/hitl/approve", "values (veldwaarden per sjabloon), diff, allow_missing_human_fields."],
              [".../hitl/reject", "Dezelfde paden, eindigend op /hitl/reject, met een optionele reason."],
            ]}
          />
          <CodeBlock lang="Verzoek" code={HITL_RUN_APPROVE_REQUEST} />
          <p>
            Goedkeuren hervat de levering (webhook, e-mail, Bucket). Een Run afwijzen annuleert hem. Zie{" "}
            <DocLink href="/docs/human-in-the-loop">Menselijke beoordeling</DocLink>.
          </p>
        </DocCard>

        {/* ── API key ── */}
        <DocCard icon={<KeyRound size={24} />} title="Endpoints voor de API-sleutel">
          <DataTable
            head={["Endpoint", "Wat het doet"]}
            rows={[
              ["GET /me/api-key", "Geeft je sleutel voor de organisatie terug."],
              ["POST /me/api-key/regenerate", "Geeft een nieuwe sleutel uit en maakt de oude meteen ongeldig. Werk elke integratie bij."],
            ]}
          />
          <CodeBlock lang="Antwoord 200" code={API_KEY_RESPONSE} />
        </DocCard>
      </div>

      {/* ── No-Code tab ── */}
      <div role="tabpanel" aria-label="No-Code" className={apiTab === "no-code" ? undefined : "hidden"}>
        <DocCard icon={<Star size={24} />} title="Overzicht van automatiseringstools">
          <p>
            Je hoeft geen code te schrijven om Tavnit met je workflows te verbinden. Elk
            automatiseringsplatform dat een HTTP-verzoek kan versturen, kan werk in Tavnit starten, en
            elk platform dat een webhook kan ontvangen, kan de resultaten aannemen.
          </p>
          <InfoBox color="purple" icon={<CircleDot size={20} />} title="Make">
            Visuele scenario&apos;s: een HTTP-module roept Tavnit aan en een Custom webhook ontvangt de
            resultaten.
          </InfoBox>
          <InfoBox color="yellow" icon={<Zap size={20} />} title="Zapier">
            Webhooks by Zapier: Catch Hook ontvangt de resultaten en een POST-actie start Runs.
          </InfoBox>
          <InfoBox color="green" icon={<CircleDot size={20} />} title="n8n">
            Zelf gehost of in de cloud: een Webhook-node ontvangt de resultaten en een HTTP
            Request-node start Runs.
          </InfoBox>
          <InfoBox color="blue" icon={<CircleDot size={20} />} title="Power Automate">
            Een HTTP-actie roept de API op dezelfde manier aan.
          </InfoBox>
          <p>
            Elk verzoek heeft de header <InlineCode>X-API-Key</InlineCode> nodig met je sleutel uit{" "}
            <strong>Integraties</strong>.
          </p>
        </DocCard>

        <DocCard icon={<Webhook size={24} />} title="Resultaten ontvangen in je automatisering">
          <NumberedList
            items={[
              "Maak in je platform een webhooktrigger aan (Make: Custom webhook; Zapier: Webhooks by Zapier → Catch Hook; n8n: Webhook-node, POST) en kopieer de URL ervan.",
              "Plak die in Tavnit als webhook van een Flow (paneel Webhook) of van een Output-node van een Pipeline.",
              "Verwerk één document zodat het platform de payload leert kennen, en koppel daarna de velden aan Sheets, een CRM, een ERP enzovoort.",
            ]}
          />
          <p>
            De payload wordt beschreven op de <DocLink href="/docs/webhooks">pagina over webhooks</DocLink>.
          </p>
        </DocCard>

        <DocCard icon={<CircleDot size={24} />} title="Integratie met Make">
          <p>
            Make (voorheen Integromat) is een visueel automatiseringsplatform waarmee je apps kunt
            verbinden en workflows kunt automatiseren zonder code te schrijven.
          </p>
          <a
            href="https://www.make.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-2 transition-colors text-sm font-medium mt-1"
          >
            Naar Make <ExternalLink size={14} />
          </a>
        </DocCard>

        <DocCard icon={<Layers size={24} />} title="Aan de slag met Make">
          <NumberedList
            items={[
              "Ga naar make.com en maak een account aan",
              "Klik in je dashboard op „Create a new scenario”",
              "Je ziet een leeg canvas waarop je modules kunt toevoegen",
              "Zoek naar „HTTP” en voeg de module „Make a request” toe",
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Wat is een scenario?">
            Een scenario is een geautomatiseerde workflow in Make. Het bestaat uit modules (apps) die
            met elkaar verbonden zijn. Als een module start of gegevens ontvangt, geeft die module de
            gegevens door aan de volgende.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="De HTTP-module configureren">
          <p>
            Zodra je de HTTP-module hebt toegevoegd, configureer je hem zo dat hij documenten naar
            Tavnit stuurt. Je kunt een van deze twee aanpakken gebruiken:
          </p>

          <h3 className="text-base font-semibold text-accent mt-6 mb-3">
            Optie 1: Multipart/form-data (als je een bestandsobject hebt)
          </h3>
          <NumberedList
            items={[
              "Voeg een HTTP-module „Make a request” toe aan je scenario",
              <Fragment key="f14">
                Configureer het verzoek:
                <BulletList
                  items={[
                    <>URL: <InlineCode>https://run.tavnit.io/api/runs/process</InlineCode></>,
                    "Method: POST",
                  ]}
                />
              </Fragment>,
              <Fragment key="f15">
                Voeg op het tabblad Headers toe:
                <BulletList
                  items={[
                    "Header name: X-API-Key",
                    "Header value: YOUR_API_KEY",
                  ]}
                />
              </Fragment>,
              "Zet Body type op „multipart/form-data”",
              <Fragment key="f16">
                Voeg formuliervelden toe:
                <BulletList
                  items={[
                    "flow_id: YOUR_FLOW_ID",
                    "file: (koppelen vanuit de vorige module)",
                    "source: api (optioneel)",
                  ]}
                />
              </Fragment>,
              "Voer je scenario uit om te testen",
            ]}
          />

          <h3 className="text-base font-semibold text-[#6c42f0] mt-8 mb-3">
            Optie 2: JSON + base64 (als je een base64-string hebt)
          </h3>
          <p>
            Geeft je vorige module een base64-string in plaats van een bestand, gebruik dan deze
            aanpak:
          </p>
          <NumberedList
            items={[
              "Zet Body type op „Raw” en kies „JSON (application/json)”",
              <Fragment key="f17">
                Voeg op het tabblad Headers ook toe:
                <BulletList
                  items={[
                    "Header name: Content-Type",
                    "Header value: application/json",
                  ]}
                />
              </Fragment>,
              "Zet de JSON-body op:",
            ]}
          />
          <CodeBlock lang="JSON" code={JSON_BODY_EXAMPLE} />

          <InfoBox color="blue" icon={<Info size={20} />} title="De base64-inhoud koppelen">
            Vervang {"{{previous_module.base64_content}}"} door de werkelijke koppeling uit je vorige
            module. Klik in Make in het veld en kies de base64-uitvoer van de module die je bestand
            levert. Houd de extensie in filename: Tavnit gebruikt die om het bestandstype te herkennen.
          </InfoBox>
          <p>
            De aanroep antwoordt meteen met een <InlineCode>run_id</InlineCode>. De geëxtraheerde
            gegevens komen later binnen via de webhook van de Flow, of je haalt ze op met een tweede
            HTTP-module die <InlineCode>{"GET https://run.tavnit.io/api/runs/{run_id}"}</InlineCode>{" "}
            aanroept.
          </p>
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Andere platforms (Zapier, Power Automate, n8n)">
          <p>Dezelfde aanpak werkt met elk automatiseringsplatform dat HTTP-verzoeken ondersteunt:</p>
          <InfoBox color="purple" icon={<Paperclip size={20} />} title="Als je platform je een bestandsobject geeft">
            Gebruik multipart/form-data met een veld &bdquo;file&rdquo; dat het bestand bevat, plus het
            veld flow_id.
          </InfoBox>
          <InfoBox color="violet" icon={<Code2 size={20} />} title="Als je platform je een base64-string geeft">
            Gebruik een JSON-body met flow_id, filename en file_base64 (de base64-inhoud uit de vorige
            stap).
          </InfoBox>
          <p>
            Beide methoden roepen hetzelfde endpoint aan en leveren identieke extractieresultaten op.
            Wil je bestanden verwerken die in Google Drive, OneDrive of Dropbox binnenkomen, start dan
            op &bdquo;Nieuw bestand in map&rdquo; en stuur het bestand op dezelfde manier met POST.
          </p>
        </DocCard>

        <DocCard icon={<FolderInput size={24} />} title="De Collections-API gebruiken">
          <p>
            Ontvang je verschillende soorten documenten en wil je dat AI elk document naar de juiste
            Flow leidt, roep dan de Collection aan in plaats van een Flow.
          </p>
          <BulletList
            items={[
              <Fragment key="f18">URL: <InlineCode>https://run.tavnit.io/api/collections/process</InlineCode></Fragment>,
              <Fragment key="f19">Gebruik <InlineCode>collection_id</InlineCode> in plaats van <InlineCode>flow_id</InlineCode></Fragment>,
            ]}
          />
          <CodeBlock lang="JSON" code={COLLECTIONS_JSON_EXAMPLE} />
        </DocCard>

        <DocCard icon={<Split size={24} />} title="De Splitters-API gebruiken">
          <p>
            Ontvang je samengevoegde PDF&apos;s met meerdere documenten die je gescheiden nodig hebt,
            roep dan de Splitter aan.
          </p>
          <BulletList
            items={[
              <Fragment key="f22">URL: <InlineCode>https://run.tavnit.io/api/splits/run</InlineCode></Fragment>,
              <Fragment key="f23">Gebruik <InlineCode>splitter_id</InlineCode> in plaats van <InlineCode>flow_id</InlineCode></Fragment>,
            ]}
          />
          <CodeBlock lang="JSON" code={SPLITTERS_JSON_EXAMPLE} />
        </DocCard>

        <DocCard icon={<Route size={24} />} title="Een Pipeline starten">
          <p>
            Om een hele Pipeline uit te voeren in plaats van één Flow, stuur je het bestand met POST
            (multipart-<InlineCode>file</InlineCode>, of JSON <InlineCode>file_base64</InlineCode> +{" "}
            <InlineCode>filename</InlineCode>) naar{" "}
            <InlineCode>https://run.tavnit.io/api/pipelines/YOUR_PIPELINE_ID/execute</InlineCode>{" "}
            met dezelfde header. Het ID van de Pipeline staat in de URL.
          </p>
        </DocCard>

        <DocCard icon={<Wand2 size={24} />} title="De Cleaners-API gebruiken">
          <p>
            Om rijen gegevens vanuit je automatisering op te schonen, stuur je ze als JSON naar de
            Cleaner. Een spreadsheetbestand gaat in plaats daarvan naar{" "}
            <InlineCode>https://run.tavnit.io/api/sweeps/run</InlineCode>, als multipart met{" "}
            <InlineCode>cleaner_id</InlineCode> (dat endpoint accepteert geen base64).
          </p>
          <BulletList
            items={[
              <Fragment key="f20">URL: <InlineCode>https://run.tavnit.io/api/cleaners/YOUR_CLEANER_ID/process</InlineCode></Fragment>,
              "Method: POST, Content-Type: application/json",
            ]}
          />
          <CodeBlock lang="JSON" code={CLEANERS_JSON_EXAMPLE} />
        </DocCard>

        <DocCard icon={<Database size={24} />} title="De Buckets-API gebruiken">
          <p>
            Om rijen in een Bucket te zetten zonder een document te versturen, gebruik je het
            schrijf-endpoint. Elke rij moet alle kolommen van de Bucket bevatten.
          </p>
          <BulletList
            items={[
              <Fragment key="f24">URL: <InlineCode>https://run.tavnit.io/api/buckets/write</InlineCode></Fragment>,
              "Method: POST, Content-Type: application/json",
              <Fragment key="f25">Header: <InlineCode>X-API-Key: YOUR_API_KEY</InlineCode></Fragment>,
            ]}
          />
          <CodeBlock lang="JSON" code={BUCKETS_JSON_EXAMPLE} />
          <InfoBox color="purple" icon={<Info size={20} />} title="Het ID en de naam van je Bucket vinden">
            Open de detailpagina van de Bucket en tik op het info-icoon. Beide waarden kun je met één
            tik kopiëren.
          </InfoBox>
        </DocCard>

        <DocCard icon={<ClipboardCheck size={24} />} title="Andere functies">
          <p>
            Agents, Matchers, Inspectors, Fillers, Signals, Subjects en Nets worden op dezelfde manier
            gestart: een HTTP-verzoek met de header <InlineCode>X-API-Key</InlineCode>. Ga naar het
            tabblad <strong>Code</strong> voor de velden van elk endpoint.
          </p>
        </DocCard>
      </div>

      <Related
        links={[
          {
            href: "/docs/webhooks",
            label: "Resultaten ontvangen met webhooks",
            description: "De payload die Tavnit verstuurt als een Run is voltooid, en hoe je een ontvanger bouwt.",
          },
          {
            href: "/docs/mcp-connector",
            label: "Een AI-assistent koppelen met de MCP-connector",
            description: "Gebruik Tavnit vanuit claude.ai, Cursor of een andere MCP-client.",
          },
          {
            href: "/docs/user-roles",
            label: "Gebruikersrollen en rechten",
            description: "Waarom een sleutel met de rol Alleen HITL kan beoordelen maar niet verwerken.",
          },
        ]}
      />
    </section>
  );
}
