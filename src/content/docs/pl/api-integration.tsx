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
 * /pl/docs/api-integration — translated from components/docs/ApiIntegrationContent.tsx.
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

const FIELD_HEAD = ["Pole", "Wymagane", "Opis"];

export default function ApiIntegrationPl() {
  const hashNoCode = useSyncExternalStore(subscribeHash, hashIsNoCode, serverHash);
  const [chosenTab, setChosenTab] = useState<ApiTab | null>(null);
  const apiTab: ApiTab = chosenTab ?? (hashNoCode ? "no-code" : "code");
  const [lang, setLang] = useState<Lang>("python");

  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        Integracja z API
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
          Kod
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
      <div role="tabpanel" aria-label="Kod" className={apiTab === "code" ? undefined : "hidden"}>
        <DocCard icon={<Info size={24} />} title="Jak działa API">
          <p>
            REST API Tavnit pozwala twojemu własnemu kodowi robić to, co robisz w aplikacji: wysyłać
            dokumenty do Flow, Collection, Splittera lub Pipeline, uruchamiać Cleaners, Matchers,
            Inspectors, Fillers, Signals i agentów, czytać i zapisywać Buckets, zarządzać sprawami
            Subject oraz zatwierdzać lub odrzucać weryfikacje ręczne.
          </p>
          <BulletList
            items={[
              <Fragment key="b0">
                Bazowy URL: <InlineCode>https://run.tavnit.io/api</InlineCode>. Każda ścieżka poniżej
                jest względna wobec niego.
              </Fragment>,
              <Fragment key="b1">
                Każde żądanie przesyła twój klucz API w nagłówku <InlineCode>X-API-Key</InlineCode>.
              </Fragment>,
              <Fragment key="b2">
                Przetwarzanie jest asynchroniczne. Endpointy, które uruchamiają pracę, od razu
                odpowiadają <strong>202 Accepted</strong> z identyfikatorem, a praca wykonuje się w
                tle. Wynik dostajesz przez odpytywanie (Runs, Runs agentów, Catches, sprawy) albo na{" "}
                <DocLink href="/docs/webhooks">webhooku</DocLink> skonfigurowanym w danej funkcji.
              </Fragment>,
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Funkcje w wersji beta">
            Pipelines, Subjects, Matchers, Inspectors, Fillers, Signals i Nets są w wersji beta. Ich
            endpointy działają już dziś, ale szczegóły mogą się jeszcze zmienić.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Lock size={24} />} title="Uwierzytelnianie i identyfikatory">
          <h3 className="text-base font-semibold text-fg-2 mt-2 mb-1">Klucz API</h3>
          <p>
            Otwórz <strong>Integracje</strong> na pasku bocznym aplikacji. Karta{" "}
            <strong>Klucz API</strong> pokazuje twój klucz (tam możesz go odsłonić i skopiować).
            Każdy członek ma własny klucz w każdej organizacji, a żądanie działa jako ten członek w
            tej organizacji.
          </p>
          <WarningBox>
            Trzymaj swój klucz API w tajemnicy. <strong>Wygeneruj ponownie</strong> na tej samej
            karcie natychmiast unieważnia obecny klucz, a wszystko, co nadal go używa, przestaje
            działać.
          </WarningBox>
          <p>Żądanie bez ważnego klucza otrzymuje:</p>
          <CodeBlock
            lang="401"
            code={`{
  "success": false,
  "error": "Authentication required",
  "message": "Please provide a valid X-API-Key header"
}`}
          />

          <h3 className={H3}>Role</h3>
          <p>
            Klucz niesie twoją rolę. Członkowie z rolą <strong>Tylko HITL</strong> mogą korzystać
            wyłącznie z endpointów zatwierdzania i odrzucania weryfikacji ręcznej oraz z endpointów
            klucza API. Każdy endpoint przetwarzania i danych odmawia im, zwracając{" "}
            <strong>403</strong> i <InlineCode>Your role only permits HITL reviews</InlineCode>.
            Zobacz <DocLink href="/docs/user-roles">role użytkowników</DocLink>.
          </p>

          <h3 className={H3}>Identyfikatory</h3>
          <p>
            Każdy Flow, Collection, Splitter, Cleaner, Bucket, agent, Matcher, Inspector, Filler i
            Pipeline pokazuje swoje ID na stronie szczegółów, z przyciskiem kopiowania. Zasoby muszą
            należeć do organizacji twojego klucza: ID innej organizacji daje odpowiedź 403 lub 404.
          </p>
        </DocCard>

        <DocCard icon={<Download size={24} />} title="Wysyłanie plików">
          <p>Endpointy, które przyjmują dokument, akceptują go na jeden z dwóch sposobów:</p>
          <InfoBox color="purple" icon={<Paperclip size={20} />} title="Przesyłanie pliku jako multipart">
            Wyślij plik jako multipart/form-data w polu o nazwie file, a pozostałe pola jako pola
            formularza. Działa na każdym endpoincie plikowym.
          </InfoBox>
          <InfoBox color="violet" icon={<Code2 size={20} />} title="Base64 w treści JSON">
            Wyślij JSON z file_base64 (zawartość pliku) i filename (z rozszerzeniem) oraz pozostałymi
            polami. Przydatne, gdy narzędzie automatyzacji daje ci base64 zamiast pliku.
          </InfoBox>
          <DataTable
            head={["Endpoint", "Base64", "Akceptowane pliki"]}
            rows={[
              ["POST /runs/process", "Tak", "PDF, obrazy (PNG, JPG, JPEG, JFIF, TIF, TIFF, WEBP, BMP, GIF), arkusze kalkulacyjne (XLSX, XLS, CSV)"],
              ["POST /collections/process", "Tak", "Jak w przypadku Runs"],
              ["POST /splits/run", "Tak", "Jak w przypadku Runs"],
              ["POST /pipelines/{id}/execute", "Tak", "PDF i obrazy"],
              ["POST /signals/{id}/run", "Tak", "Audio: MP3, MP4, MPEG, MPGA, M4A, WAV, WEBM"],
              ["POST /sweeps/run", "Nie", "Arkusze kalkulacyjne: CSV, XLSX, XLS"],
              ["Inspectors, Fillers, Subjects i sprawy", "Nie", "Dokument jako plik multipart"],
            ]}
          />
          <p>Pojedyncze żądanie może mieć do 150 MB. Typ pliku jest ustalany na podstawie rozszerzenia w nazwie pliku.</p>
        </DocCard>

        <DocCard icon={<ListChecks size={24} />} title="Odpowiedzi i błędy">
          <p>
            Odpowiedzi to JSON z flagą <InlineCode>success</InlineCode>. Błędy zawierają tekst{" "}
            <InlineCode>error</InlineCode>, czasem <InlineCode>message</InlineCode>, oraz dodatkowe
            klucze wyjaśniające problem:
          </p>
          <CodeBlock lang="Przykład 409" code={API_ERROR_EXAMPLE} />
          <DataTable
            head={["Status", "Znaczenie"]}
            rows={[
              ["200 / 201", "Gotowe (odczyty, anulowania, zatwierdzenia) / utworzono (sprawy, wypełnienia, inspekcje)."],
              ["202", "Przyjęto: praca jest w kolejce. Zachowaj zwrócone id."],
              ["400", "Brakuje wymaganego pola lub jest ono nieprawidłowe, typ pliku nie jest obsługiwany albo zasób jest nieaktywny lub nieskonfigurowany."],
              ["401", "Brak lub nieprawidłowy X-API-Key."],
              ["402", "Twoja organizacja nie może teraz rozpocząć nowej pracy; skontaktuj się z zespołem Tavnit."],
              ["403", "Zasób należy do innej organizacji, twoja rola to Tylko HITL albo nie jesteś weryfikatorem tego elementu."],
              ["404", "ID nie istnieje w twojej organizacji."],
              ["409", "Konflikt z bieżącym stanem: nazwa Bucketu się nie zgadza, element jest już anulowany lub zakończony, sprawa jest zamknięta, slot jest już wypełniony."],
              ["429", "Zbyt wiele Runs czeka już na agenta."],
              ["500", "Nieoczekiwany błąd. Możesz bezpiecznie ponowić próbę później."],
            ]}
          />
        </DocCard>

        <DocCard icon={<Layers size={24} />} title="Przegląd endpointów">
          <DataTable
            head={["Funkcja", "Metoda i ścieżka", "Co robi"]}
            rows={[
              ["Flows", "POST /runs/process", "Wyodrębnia dokument za pomocą Flow"],
              ["Flows", "GET /runs/{run_id}", "Status Run i wyodrębnione dane"],
              ["Flows", "GET /runs/{run_id}/source-file", "Oryginalny dokument"],
              ["Collections", "POST /collections/process", "AI kieruje dokument do właściwego Flow lub Splittera"],
              ["Collections", "GET /collection-runs/{id}/source-file", "Oryginalny dokument"],
              ["Splitters", "POST /splits/run", "Dzieli plik z wieloma dokumentami"],
              ["Splitters", "GET /splits/{split_id}/source-file", "Oryginalny pakiet"],
              ["Cleaners", "POST /sweeps/run", "Czyści arkusz kalkulacyjny (sweep)"],
              ["Cleaners", "POST /cleaners/{cleaner_id}/process", "Czyści wiersze wysłane jako JSON"],
              ["Buckets", "POST /buckets/write", "Dopisuje lub zastępuje wiersze"],
              ["Buckets", "GET /buckets/read", "Odczytuje wiersze, stronicowane"],
              ["Agents", "POST /bots/{agent_id}/runs", "Uruchamia Run agenta"],
              ["Agents", "GET /bot-runs/{bot_run_id}", "Odpytuje jeden Run agenta"],
              ["Agents", "GET /bots/{agent_id}/runs", "Wyświetla Runs agenta"],
              ["Agents", "POST /bot-runs/{bot_run_id}/cancel", "Anuluje Run agenta"],
              ["Matchers", "POST /matchers/{matcher_id}/run", "Dopasowuje zakończone Runs"],
              ["Inspectors", "POST /inspectors/{inspector_id}/process", "Dodaje dokument do inspekcji"],
              ["Fillers", "POST /fillers/{filler_id}/fills", "Otwiera wypełnienie i dodaje dokumenty"],
              ["Pipelines", "POST /pipelines/{pipeline_id}/execute", "Wykonuje Pipeline"],
              ["Signals", "POST /signals/{signal_id}/run", "Strukturyzuje plik audio (Wave)"],
              ["Subjects", "POST /subjects/{subject_id}/process", "Kieruje dokument do sprawy"],
              ["Nets", "POST /nets/{net_id}/catch", "Uruchamia Catch"],
              ["Weryfikacja ręczna", "POST /runs/{run_id}/hitl/approve", "Zatwierdza lub odrzuca wstrzymane elementy"],
              ["Klucz API", "GET /me/api-key", "Odczytuje lub generuje ponownie twój klucz"],
            ]}
          />
          <p>Każda funkcja jest opisana szczegółowo poniżej, razem z jej pozostałymi endpointami.</p>
        </DocCard>

        {/* ── Flows ── */}
        <DocCard icon={<FileText size={24} />} title="Flows: przetwarzanie dokumentu">
          <p>Wyślij jeden dokument do Flow. Tavnit tworzy Run i wyodrębnia dane w tle.</p>
          <Endpoint method="POST" path="/runs/process" />
          <DataTable
            head={FIELD_HEAD}
            rows={[
              ["flow_id", "Tak", "Flow, który wyodrębnia dokument."],
              ["file", "Tak*", "Dokument (multipart)."],
              ["file_base64 + filename", "Tak*", "Zamiast file: zawartość w base64 i nazwa pliku z rozszerzeniem."],
              ["content_type", "Nie", "Typ MIME dla pliku w base64."],
              ["source", "Nie", "Etykieta zapisywana w Run: api (domyślnie), email, manual_upload lub collection."],
            ]}
            caption="* Wyślij albo file, albo file_base64 + filename."
          />
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python" code={PYTHON_CODE} />
          ) : (
            <CodeBlock lang="JavaScript" code={JAVASCRIPT_CODE} />
          )}
          <CodeBlock lang="Odpowiedź 202" code={RUN_PROCESS_RESPONSE} />
          <p>
            Błędy: 400 (brak pliku, brak flow_id, nieobsługiwany lub nieprawidłowy plik), 403 (Flow
            innej organizacji), 404 (nie znaleziono Flow). Odrzucone żądanie, jeśli to możliwe, i tak
            tworzy nieudany Run i zwraca jego <InlineCode>run_id</InlineCode>, dzięki czemu znajdziesz go
            w <strong>Runs</strong>.
          </p>

          <h3 className={H3}>Pobieranie Run i jego danych</h3>
          <Endpoint method="GET" path="/runs/{run_id}" />
          <p>
            Odpytuj, aż <InlineCode>status</InlineCode> będzie końcowy. Statusy:{" "}
            <InlineCode>queued</InlineCode>, <InlineCode>running</InlineCode>,{" "}
            <InlineCode>awaiting_approval</InlineCode> (wstrzymany do{" "}
            <DocLink href="/docs/human-in-the-loop">weryfikacji ręcznej</DocLink>),{" "}
            <InlineCode>completed</InlineCode>, <InlineCode>failed</InlineCode> i{" "}
            <InlineCode>cancelled</InlineCode>. <InlineCode>data</InlineCode> zawiera wyodrębnione
            wiersze i pozostaje <InlineCode>null</InlineCode>, dopóki Run nie zostanie zakończony,
            także wtedy, gdy czeka na zatwierdzenie. Gdy ustawione jest{" "}
            <InlineCode>columns</InlineCode>, użyj go do kolejności kolumn.{" "}
            <InlineCode>attempt</InlineCode> i <InlineCode>previous_attempts</InlineCode> pokazują
            automatyczne ponowienia. Dodaj <InlineCode>?include_document=true</InlineCode>, aby
            dostać także podpisany link do oryginalnego pliku. Działa to dla każdego Run, również
            dla Runs utworzonych przez Collections, Splitters, Pipelines i e-mail.
          </p>
          <CodeBlock lang="Odpowiedź 200" code={RUN_GET_RESPONSE} />
          {lang === "python" ? (
            <CodeBlock lang="Python (wysyłanie i odpytywanie)" code={PYTHON_RUN_POLL_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (wysyłanie i odpytywanie)" code={JAVASCRIPT_RUN_POLL_CODE} />
          )}

          <h3 className={H3}>Pobieranie oryginalnego dokumentu</h3>
          <Endpoint method="GET" path="/runs/{run_id}/source-file" />
          <p>
            Zwraca podpisany URL do pliku w postaci, w jakiej został przesłany, niezależnie od
            statusu Run. Opcjonalny parametr <InlineCode>expires_in</InlineCode> ustawia czas życia
            linku w sekundach (od 60 do 604800, domyślnie 7 dni). Z{" "}
            <InlineCode>?download=true</InlineCode> odpowiedzią jest sam plik.
          </p>
          <CodeBlock lang="Odpowiedź 200" code={SOURCE_FILE_RESPONSE} />
        </DocCard>

        {/* ── Collections ── */}
        <DocCard icon={<FolderInput size={24} />} title="Collections: niech AI pokieruje dokumentem">
          <p>
            Wyślij dokument bez wybierania Flow: AI wybiera najlepszy Flow lub Splitter z
            Collection. Używaj tego, gdy otrzymujesz dokumenty różnych typów.
          </p>
          <Endpoint method="POST" path="/collections/process" />
          <p>
            Ta sama treść co w <InlineCode>/runs/process</InlineCode>, z{" "}
            <InlineCode>collection_id</InlineCode> zamiast <InlineCode>flow_id</InlineCode> (albo
            umieść ID w ścieżce: <InlineCode>{"/collections/{collection_id}/process"}</InlineCode>).
            Collection musi być aktywna i mieć co najmniej jeden aktywny Flow lub Splitter, w
            przeciwnym razie wywołanie odpowiada 400.
          </p>
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python (Collections)" code={PYTHON_COLLECTIONS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Collections)" code={JAVASCRIPT_COLLECTIONS_CODE} />
          )}
          <CodeBlock lang="Odpowiedź 202" code={COLLECTION_PROCESS_RESPONSE} />
          <p>
            Wybrany Flow tworzy zwykły Run, a payload jego webhooka zawiera{" "}
            <InlineCode>collection_run_id</InlineCode>, dzięki czemu dopasujesz wynik do swojego
            żądania. Oryginał jest od razu dostępny pod{" "}
            <InlineCode>{"GET /collection-runs/{collection_run_id}/source-file"}</InlineCode> (te
            same opcje co plik źródłowy Run). Zobacz{" "}
            <DocLink href="/docs/collections">Collections</DocLink>.
          </p>
        </DocCard>

        {/* ── Splitters ── */}
        <DocCard icon={<Split size={24} />} title="Splitters: dzielenie pliku z wieloma dokumentami">
          <p>
            Wyślij plik zawierający kilka dokumentów. Splitter znajduje, gdzie każdy z nich się
            zaczyna i kończy, klasyfikuje go i wysyła każdą część tam, gdzie wskazuje jej typ
            dokumentu.
          </p>
          <Endpoint method="POST" path="/splits/run" />
          <p>
            Ta sama treść co w <InlineCode>/runs/process</InlineCode>, z{" "}
            <InlineCode>splitter_id</InlineCode>.
          </p>
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python (Splitters)" code={PYTHON_SPLITTERS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Splitters)" code={JAVASCRIPT_SPLITTERS_CODE} />
          )}
          <CodeBlock lang="Odpowiedź 202" code={SPLIT_RUN_RESPONSE} />
          <p>
            Części wysłane do Flows stają się osobnymi Runs, a ich webhooki zawierają{" "}
            <InlineCode>split_id</InlineCode>. Oryginalny pakiet jest pod{" "}
            <InlineCode>{"GET /splits/{split_id}/source-file"}</InlineCode>. Zobacz{" "}
            <DocLink href="/docs/splitters">Splitters</DocLink>.
          </p>
        </DocCard>

        {/* ── Cleaners ── */}
        <DocCard icon={<Wand2 size={24} />} title="Cleaners: uruchamianie czyszczenia (sweep)">
          <p>
            Sweep uruchamia Cleaner na wierszach danych, aby normalizować, klasyfikować, wyszukiwać
            lub wzbogacać wartości. Wyślij wiersze jako arkusz kalkulacyjny albo jako JSON.
          </p>
          <Endpoint method="POST" path="/sweeps/run" />
          <DataTable
            head={FIELD_HEAD}
            rows={[
              ["cleaner_id", "Tak", "Cleaner do uruchomienia."],
              ["file", "Tak", "CSV, XLSX lub XLS, tylko multipart. Nagłówki w pierwszym wierszu; każde pole bazowe wymagane przez Cleaner musi być kolumną, bez duplikatów."],
              ["sheet_name", "Nie", "Który arkusz skoroszytu odczytać (domyślnie: pierwszy)."],
            ]}
          />
          <Endpoint method="POST" path="/cleaners/{cleaner_id}/process" />
          <p>
            Wyślij JSON z <InlineCode>rows</InlineCode> (tablica obiektów) albo{" "}
            <InlineCode>file</InlineCode> jako multipart, jak wyżej.
          </p>
          <CodeBlock lang="Treść JSON" code={CLEANERS_JSON_EXAMPLE} />
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python (Cleaners)" code={PYTHON_CLEANERS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Cleaners)" code={JAVASCRIPT_CLEANERS_CODE} />
          )}
          <CodeBlock lang="Odpowiedź 202" code={SWEEP_RUN_RESPONSE} />
          <p>
            Cleaner z nieprawidłową konfiguracją odpowiada 400 z{" "}
            <InlineCode>validation_errors</InlineCode>. Zobacz{" "}
            <DocLink href="/docs/cleaners">Cleaners</DocLink>.
          </p>
        </DocCard>

        {/* ── Buckets ── */}
        <DocCard icon={<Database size={24} />} title="Buckets: zapisywanie i odczytywanie wierszy">
          <p>
            Wysyłaj wiersze do Bucketu z własnych systemów albo odczytuj to, co zapisały w nim twoje
            Flows. ID i nazwę Bucketu znajdziesz, klikając ikonę informacji na stronie Bucketu.
            Nazwa jest zabezpieczeniem: jeśli nie pasuje do ID, wywołanie odpowiada{" "}
            <strong>409</strong>.
          </p>
          <Endpoint method="POST" path="/buckets/write" />
          <DataTable
            head={FIELD_HEAD}
            rows={[
              ["bucket_id", "Tak", "Bucket."],
              ["bucket_name", "Tak", "Jego dokładna nazwa."],
              ["overwrite", "Tak", "Wartość logiczna. false dopisuje wiersze; true zastępuje wszystkie istniejące wiersze."],
              ["rows", "Tak", "Tablica obiektów, do 50 000 na żądanie."],
            ]}
          />
          <p>
            Wyślij treść jako <InlineCode>application/json</InlineCode>. Każdy wiersz musi mieć
            dokładnie kolumny Bucketu, według nazwy kolumny lub nazwy wyświetlanej: brakująca lub
            nieznana kolumna przerywa cały zapis z kodem 400 i listą{" "}
            <InlineCode>missing_columns</InlineCode> oraz <InlineCode>extra_columns</InlineCode>.
          </p>
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python (Buckets)" code={PYTHON_BUCKETS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Buckets)" code={JAVASCRIPT_BUCKETS_CODE} />
          )}
          <CodeBlock lang="Odpowiedź 202" code={BUCKET_WRITE_RESPONSE} />

          <h3 className={H3}>Odczytywanie wierszy</h3>
          <Endpoint method="GET" path="/buckets/read" />
          <p>
            Parametry zapytania: <InlineCode>bucket_id</InlineCode> i{" "}
            <InlineCode>bucket_name</InlineCode> (wymagane), <InlineCode>limit</InlineCode> (od 1
            do 1000, domyślnie 100) i <InlineCode>offset</InlineCode> (domyślnie 0). Przechodź
            przez strony za pomocą <InlineCode>offset</InlineCode>, dopóki{" "}
            <InlineCode>has_more</InlineCode> ma wartość true; <InlineCode>total_count</InlineCode>{" "}
            liczy wszystkie wiersze. Klucze <InlineCode>data</InlineCode> wiersza to nazwy kolumn;
            nazwy wyświetlane znajdziesz w <InlineCode>columns</InlineCode>. Zapisane linki do
            plików wracają jako świeże podpisane URL-e.
          </p>
          <CodeBlock lang="Żądanie" code={BUCKET_READ_REQUEST} />
          <CodeBlock lang="Odpowiedź 200" code={BUCKET_READ_RESPONSE} />
          <p>
            Zobacz <DocLink href="/docs/buckets">Buckets</DocLink>.
          </p>
        </DocCard>

        {/* ── Agents ── */}
        <DocCard icon={<Bot size={24} />} title="Agents: uruchamianie i odpytywanie Runs">
          <p>
            Uruchom agenta ze swojego kodu i odbierz to, co przechwycił. Agenci są włączani dla
            organizacji na prośbę: skontaktuj się z pomocą techniczną, aby ich włączyć.
          </p>
          <Endpoint method="POST" path="/bots/{agent_id}/runs" />
          <p>
            Opcjonalny JSON <InlineCode>{'{"inputs": {...}}'}</InlineCode> nadpisuje zmienne
            wejściowe agenta dla tego Run. Używane są tylko zmienne zadeklarowane przez agenta, a
            wartości sekretne nigdy nie są przyjmowane. Możesz też wywołać{" "}
            <InlineCode>POST /bots/runs</InlineCode> z <InlineCode>bot_id</InlineCode> w treści.
            Każde wywołanie uruchamia nowy Run.
          </p>
          <CodeBlock lang="Żądanie" code={AGENT_TRIGGER_REQUEST} />
          <p>
            <InlineCode>status</InlineCode> ma wartość <InlineCode>queued</InlineCode> albo{" "}
            <InlineCode>waiting</InlineCode>, gdy agent wykonuje jeden Run naraz i jest zajęty
            (Run startuje sam, gdy przyjdzie jego kolej). 409, gdy agent jest zarchiwizowany, 429,
            gdy zbyt wiele Runs już czeka.
          </p>

          <h3 className={H3}>Odpytywanie, lista i anulowanie</h3>
          <DataTable
            head={["Endpoint", "Co robi"]}
            rows={[
              ["GET /bot-runs/{bot_run_id}", "Jeden Run: status, czasy, dane wejściowe (bez sekretów) i wynik z podpisanymi linkami do plików. Dostępne też pod GET /bots/{agent_id}/runs/{bot_run_id}."],
              ["GET /bots/{agent_id}/runs", "Od najnowszych, bez danych wejściowych i wyniku. Zapytanie: status (queued, running, completed, failed, cancelled), limit (od 1 do 100, domyślnie 20), offset. Zwraca runs i total."],
              ["POST /bot-runs/{bot_run_id}/cancel", "Anuluje oczekujący, zakolejkowany lub trwający Run. 409, gdy Run już się zakończył. Dostępne też pod POST /bots/{agent_id}/runs/{bot_run_id}/cancel."],
            ]}
          />
          <CodeBlock lang="GET /bot-runs/{bot_run_id}" code={AGENT_RUN_RESPONSE} />
          <p>
            Zobacz <DocLink href="/docs/agents">Agents</DocLink>.
          </p>
        </DocCard>

        {/* ── Matchers ── */}
        <DocCard icon={<Target size={24} />} title="Matchers: dopasowywanie Runs">
          <p>Porównuj zakończone Runs Flow przypisanego do Matchera, na przykład faktury z zamówieniami zakupu.</p>
          <Endpoint method="POST" path="/matchers/{matcher_id}/run" />
          <DataTable
            head={FIELD_HEAD}
            rows={[
              ["run_ids", "Tak", "Dwa lub więcej zakończonych Runs Flow Matchera."],
              ["benchmark_run_id", "W trybie Wzorzec", "Run, z którym porównywane są pozostałe."],
            ]}
          />
          <CodeBlock lang="Żądanie" code={MATCHER_RUN_REQUEST} />
          <p>
            Nie ma endpointu API do odczytu dopasowania: wynik odbierzesz na webhooku lub w wyjściu
            e-mail Matchera albo w aplikacji. Zobacz <DocLink href="/docs/matchers">Matchers</DocLink>.
          </p>
        </DocCard>

        {/* ── Inspectors ── */}
        <DocCard icon={<ShieldCheck size={24} />} title="Inspectors: sprawdzanie zestawu dokumentów">
          <p>
            Inspekcja zbiera dokumenty, kieruje każdy z nich do slotu Inspectora, wyodrębnia go i
            ocenia listę kontrolną.
          </p>
          <Endpoint method="POST" path="/inspectors/{inspector_id}/process" />
          <p>
            <InlineCode>file</InlineCode> jako multipart. Bez <InlineCode>inspection_id</InlineCode>{" "}
            tworzona jest nowa inspekcja; przekaż zwrócone <InlineCode>inspection_id</InlineCode>,
            aby dodać do niej kolejne dokumenty (musi nadal zbierać dokumenty, w przeciwnym razie
            409). Inspector musi być aktywny.
          </p>
          <CodeBlock lang="Żądanie" code={INSPECTOR_PROCESS_REQUEST} />
          <DataTable
            head={["Endpoint", "Co robi"]}
            rows={[
              ["POST /inspectors/{inspector_id}/inspections", "Tworzy pustą inspekcję (201), do której dodasz dokumenty później."],
              ["POST /inspections/{inspection_id}/fire", "Kończy zbieranie i ocenia od razu. 400 z missing_inputs, gdy wymagany slot nie ma dokumentu."],
            ]}
          />
          <p>
            Wynik trafia na webhook lub wyjście e-mail Inspectora. Zobacz{" "}
            <DocLink href="/docs/inspectors">Inspectors</DocLink>.
          </p>
        </DocCard>

        {/* ── Fillers ── */}
        <DocCard icon={<FileOutput size={24} />} title="Fillers: wypełnianie formularzy PDF">
          <p>
            Wypełnienie zbiera dokumenty potrzebne Fillerowi, wyodrębnia je i wpisuje wartości do
            szablonów PDF Fillera.
          </p>
          <DataTable
            head={["Endpoint", "Co robi"]}
            rows={[
              ["POST /fillers/{filler_id}/fills", "Otwiera wypełnienie (201, zwraca fill_id). Filler potrzebuje szablonu i mapowań pól."],
              ["POST /fills/{fill_id}/route-upload", "Plik multipart; AI kieruje go do otwartego slotu (202)."],
              ["POST /fills/{fill_id}/inputs/{input_id}/upload", "Plik multipart dla konkretnego slotu; uruchamia Run tego slotu (202)."],
              ["POST /fills/{fill_id}/inputs/{input_id}/attach-run", "JSON run_id: użycie zakończonego Run w slocie (202)."],
              ["POST /fills/{fill_id}/fire", "Wypełnia od razu, zamiast czekać na wszystkie sloty. 400 z missing_inputs, gdy wymagany slot jest pusty."],
              ["POST /fillers/{filler_id}/templates", "Dodaje szablon PDF (plik multipart, opcjonalnie name). Jego pola zmapujesz w aplikacji."],
            ]}
          />
          <CodeBlock lang="Żądanie" code={FILLER_REQUEST} />
          <p>
            Wypełnione pliki PDF trafiają na webhook lub wyjście e-mail Fillera. Zobacz{" "}
            <DocLink href="/docs/fillers">Fillers</DocLink>.
          </p>
        </DocCard>

        {/* ── Pipelines ── */}
        <DocCard icon={<Route size={24} />} title="Pipelines: wykonanie">
          <p>Uruchom jedno wykonanie Pipeline z dokumentem.</p>
          <Endpoint method="POST" path="/pipelines/{pipeline_id}/execute" />
          <p>
            <InlineCode>file</InlineCode> jako multipart albo <InlineCode>file_base64</InlineCode> +{" "}
            <InlineCode>filename</InlineCode>; PDF lub obraz. 400, gdy Pipeline jest nieaktywny albo
            jego graf nie może zostać uruchomiony (z <InlineCode>validation_errors</InlineCode>).
          </p>
          <CodeBlock lang="Żądanie" code={PIPELINE_EXECUTE_REQUEST} />
          <p>
            Anulujesz przez <InlineCode>{"POST /pipelines/executions/{execution_id}/cancel"}</InlineCode>{" "}
            (409, gdy wykonanie nie trwa). Wyniki wychodzą przez węzły Wyjście Pipeline. Zobacz{" "}
            <DocLink href="/docs/pipelines">Pipelines</DocLink>.
          </p>
        </DocCard>

        {/* ── Signals ── */}
        <DocCard icon={<AudioLines size={24} />} title="Signals: strukturyzowanie pliku audio">
          <p>Wyślij nagranie, a Signal zamieni je w ustrukturyzowane dane (Wave).</p>
          <Endpoint method="POST" path="/signals/{signal_id}/run" />
          <p>
            <InlineCode>file</InlineCode> jako multipart albo base64. Audio do 150 MB i 8 godzin,
            z maksymalnie 2 godzinami wykrytej mowy.
          </p>
          <CodeBlock lang="Żądanie" code={SIGNAL_RUN_REQUEST} />
          <p>
            Wynik trafia na webhook Signal lub do aplikacji. Zobacz{" "}
            <DocLink href="/docs/signals">Signals</DocLink>.
          </p>
        </DocCard>

        {/* ── Subjects ── */}
        <DocCard icon={<Briefcase size={24} />} title="Subjects i sprawy">
          <p>Przypisuj dokumenty do spraw Subject i zarządzaj sprawami ze swojego kodu.</p>
          <DataTable
            head={["Endpoint", "Co robi"]}
            rows={[
              ["POST /subjects/{subject_id}/process", "Plik multipart; Tavnit kieruje go do sprawy (202, zwraca subject_doc_id)."],
              ["POST /cases/{case_id}/docs", "Plik multipart prosto do sprawy, bez kierowania. doc_type_id jest wymagane, chyba że Subject ma jeden typ dokumentu. Zwraca run_id (202). 409, gdy sprawa jest zamknięta lub ten typ dokumentu jest już wypełniony."],
              ["POST /subjects/{subject_id}/docs/{doc_id}/assign", "JSON case_id i doc_type_id: ręczne przypisanie wstrzymanego dokumentu (202)."],
              ["POST /subjects/{subject_id}/cases", "JSON name (wymagane, unikalne, do 200 znaków) i params (opcjonalny obiekt). Tworzy sprawę (201). 409, gdy nazwa już istnieje."],
              ["GET /subjects/{subject_id}/cases", "Zapytanie: state (open lub closed), status, search, limit (do 200, domyślnie 50), offset. Zwraca cases i total."],
              ["GET /cases/{case_id}", "Sprawa wraz z dokumentami, każdy z run_id do odpytywania pod GET /runs/{run_id}."],
              ["POST /cases/{case_id}/close", "Zamyka sprawę (200). Nowe dokumenty dla niej są wstrzymywane zamiast przypisywane. 409, gdy jest już zamknięta."],
              ["POST /cases/{case_id}/reopen", "Otwiera ją ponownie (200). 409, gdy jest otwarta."],
              ["POST /cases/{case_id}/inspections", "JSON subject_inspector_id: uruchamia powiązany Inspector na zakończonych Runs sprawy (202)."],
            ]}
          />
          <CodeBlock lang="Żądanie" code={CASE_REQUEST} />
          <CodeBlock lang="Odpowiedź 201" code={CASE_RESPONSE} />
          <p>
            Zobacz <DocLink href="/docs/subjects">Subjects</DocLink>.
          </p>
        </DocCard>

        {/* ── Nets ── */}
        <DocCard icon={<Radar size={24} />} title="Nets: uruchamianie Catch">
          <p>Nets są włączane dla organizacji. Bez dostępu te endpointy odpowiadają 403.</p>
          <Endpoint method="POST" path="/nets/{net_id}/catch" />
          <p>
            Bez treści Catch zaczyna tam, gdzie skończył się poprzedni. Wyślij{" "}
            <InlineCode>window_start</InlineCode> i/lub <InlineCode>window_end</InlineCode>{" "}
            (znaczniki czasu ISO), aby zamiast tego uzupełnić dane z wybranego zakresu. 409, gdy
            Net jest nieaktywny albo Catch kontynuujący od poprzedniego już trwa.
          </p>
          <CodeBlock lang="Żądanie" code={NET_CATCH_REQUEST} />
          <p>
            Odpytuj <InlineCode>{"GET /catches/{catch_id}"}</InlineCode>: status, etap, liczniki i,
            po zakończeniu, <InlineCode>output</InlineCode> z kolumnami i wierszami. Anulujesz przez{" "}
            <InlineCode>{"POST /catches/{catch_id}/cancel"}</InlineCode>. Zobacz{" "}
            <DocLink href="/docs/nets">Nets</DocLink>.
          </p>
        </DocCard>

        {/* ── HITL ── */}
        <DocCard icon={<UserCheck size={24} />} title="Weryfikacja ręczna: zatwierdzanie lub odrzucanie">
          <p>
            Elementy wstrzymane do weryfikacji możesz zatwierdzać lub odrzucać z własnych narzędzi.
            Działać może tylko skonfigurowany weryfikator danego Flow, Matchera, Inspectora lub
            Fillera (w przeciwnym razie 403), a element musi mieć status{" "}
            <InlineCode>awaiting_approval</InlineCode> (w przeciwnym razie 409). Te endpointy są
            dostępne dla roli Tylko HITL.
          </p>
          <DataTable
            head={["Endpoint", "Treść"]}
            rows={[
              ["POST /runs/{run_id}/hitl/approve", "output_json (wymagane): końcowe wiersze; diff (opcjonalna lista zmian). 400 z missing_fields, gdy wymagane pole do uzupełnienia przez człowieka jest puste."],
              ["POST /matches/{match_id}/hitl/approve", "groups (końcowe grupowanie), excluded, diff."],
              ["POST /inspections/{inspection_id}/hitl/approve", "waivers (item_id i reason dla każdego niezaliczonego elementu, z którego rezygnujesz), diff."],
              ["POST /fills/{fill_id}/hitl/approve", "values (wartości pól dla każdego szablonu), diff, allow_missing_human_fields."],
              [".../hitl/reject", "Te same ścieżki zakończone na /hitl/reject, z opcjonalnym reason."],
            ]}
          />
          <CodeBlock lang="Żądanie" code={HITL_RUN_APPROVE_REQUEST} />
          <p>
            Zatwierdzenie wznawia dostarczanie (webhook, e-mail, Bucket). Odrzucenie Run anuluje go.
            Zobacz <DocLink href="/docs/human-in-the-loop">Weryfikacja ręczna</DocLink>.
          </p>
        </DocCard>

        {/* ── API key ── */}
        <DocCard icon={<KeyRound size={24} />} title="Endpointy klucza API">
          <DataTable
            head={["Endpoint", "Co robi"]}
            rows={[
              ["GET /me/api-key", "Zwraca twój klucz dla organizacji."],
              ["POST /me/api-key/regenerate", "Wydaje nowy klucz i natychmiast unieważnia stary. Zaktualizuj każdą integrację."],
            ]}
          />
          <CodeBlock lang="Odpowiedź 200" code={API_KEY_RESPONSE} />
        </DocCard>
      </div>

      {/* ── No-Code tab ── */}
      <div role="tabpanel" aria-label="No-Code" className={apiTab === "no-code" ? undefined : "hidden"}>
        <DocCard icon={<Star size={24} />} title="Przegląd narzędzi automatyzacji">
          <p>
            Nie musisz pisać kodu, aby połączyć Tavnit ze swoimi procesami. Każda platforma
            automatyzacji, która potrafi wysłać żądanie HTTP, może uruchomić pracę w Tavnit, a każda
            platforma, która potrafi odebrać webhook, może przejąć wyniki.
          </p>
          <InfoBox color="purple" icon={<CircleDot size={20} />} title="Make">
            Wizualne scenariusze: moduł HTTP wywołuje Tavnit, a Custom webhook odbiera wyniki.
          </InfoBox>
          <InfoBox color="yellow" icon={<Zap size={20} />} title="Zapier">
            Webhooks by Zapier: Catch Hook odbiera wyniki, a akcja POST uruchamia Runs.
          </InfoBox>
          <InfoBox color="green" icon={<CircleDot size={20} />} title="n8n">
            Na własnym serwerze lub w chmurze: węzeł Webhook odbiera wyniki, a węzeł HTTP Request
            uruchamia Runs.
          </InfoBox>
          <InfoBox color="blue" icon={<CircleDot size={20} />} title="Power Automate">
            Akcja HTTP wywołuje API w ten sam sposób.
          </InfoBox>
          <p>
            Każde żądanie potrzebuje nagłówka <InlineCode>X-API-Key</InlineCode> z twoim kluczem z{" "}
            <strong>Integracje</strong>.
          </p>
        </DocCard>

        <DocCard icon={<Webhook size={24} />} title="Odbieranie wyników w automatyzacji">
          <NumberedList
            items={[
              "Na swojej platformie utwórz wyzwalacz webhook (Make: Custom webhook; Zapier: Webhooks by Zapier → Catch Hook; n8n: węzeł Webhook, POST) i skopiuj jego URL.",
              "W Tavnit wklej go jako webhook Flow (panel Webhook) lub węzła Wyjście w Pipeline.",
              "Przetwórz jeden dokument, aby platforma poznała payload, a potem zmapuj pola do Sheets, CRM, ERP i tak dalej.",
            ]}
          />
          <p>
            Payload jest opisany na <DocLink href="/docs/webhooks">stronie o webhookach</DocLink>.
          </p>
        </DocCard>

        <DocCard icon={<CircleDot size={24} />} title="Integracja z Make">
          <p>
            Make (dawniej Integromat) to wizualna platforma automatyzacji, która pozwala łączyć
            aplikacje i automatyzować procesy bez pisania kodu.
          </p>
          <a
            href="https://www.make.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-2 transition-colors text-sm font-medium mt-1"
          >
            Odwiedź Make <ExternalLink size={14} />
          </a>
        </DocCard>

        <DocCard icon={<Layers size={24} />} title="Pierwsze kroki z Make">
          <NumberedList
            items={[
              "Wejdź na make.com i załóż konto",
              "Kliknij „Create a new scenario” w swoim panelu",
              "Zobaczysz pusty obszar roboczy, na którym możesz dodawać moduły",
              "Wyszukaj „HTTP” i dodaj moduł „Make a request”",
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Czym jest scenariusz?">
            Scenariusz to zautomatyzowany proces w Make. Składa się z połączonych ze sobą modułów
            (aplikacji). Gdy jeden moduł się uruchamia lub odbiera dane, przekazuje je do
            następnego modułu.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Konfiguracja modułu HTTP">
          <p>
            Po dodaniu modułu HTTP skonfiguruj go tak, aby wysyłał dokumenty do Tavnit. Możesz użyć
            jednego z dwóch podejść:
          </p>

          <h3 className="text-base font-semibold text-accent mt-6 mb-3">
            Opcja 1: Multipart/form-data (gdy masz obiekt pliku)
          </h3>
          <NumberedList
            items={[
              "Dodaj do scenariusza moduł HTTP „Make a request”",
              <Fragment key="f14">
                Skonfiguruj żądanie:
                <BulletList
                  items={[
                    <>URL: <InlineCode>https://run.tavnit.io/api/runs/process</InlineCode></>,
                    "Method: POST",
                  ]}
                />
              </Fragment>,
              <Fragment key="f15">
                Na karcie Headers dodaj:
                <BulletList
                  items={[
                    "Header name: X-API-Key",
                    "Header value: YOUR_API_KEY",
                  ]}
                />
              </Fragment>,
              "Ustaw Body type na „multipart/form-data”",
              <Fragment key="f16">
                Dodaj pola formularza:
                <BulletList
                  items={[
                    "flow_id: YOUR_FLOW_ID",
                    "file: (zmapuj z poprzedniego modułu)",
                    "source: api (opcjonalnie)",
                  ]}
                />
              </Fragment>,
              "Uruchom scenariusz, aby go przetestować",
            ]}
          />

          <h3 className="text-base font-semibold text-[#6c42f0] mt-8 mb-3">
            Opcja 2: JSON + base64 (gdy masz ciąg base64)
          </h3>
          <p>Jeśli poprzedni moduł zwraca ciąg base64 zamiast pliku, użyj tego podejścia:</p>
          <NumberedList
            items={[
              "Ustaw Body type na „Raw” i wybierz „JSON (application/json)”",
              <Fragment key="f17">
                Na karcie Headers dodaj także:
                <BulletList
                  items={[
                    "Header name: Content-Type",
                    "Header value: application/json",
                  ]}
                />
              </Fragment>,
              "Ustaw treść JSON na:",
            ]}
          />
          <CodeBlock lang="JSON" code={JSON_BODY_EXAMPLE} />

          <InfoBox color="blue" icon={<Info size={20} />} title="Mapowanie zawartości base64">
            Zastąp {"{{previous_module.base64_content}}"} rzeczywistym mapowaniem z poprzedniego
            modułu. W Make kliknij w pole i wybierz wyjście base64 z modułu, który dostarcza twój
            plik. Zachowaj rozszerzenie w filename: Tavnit używa go do wykrycia typu pliku.
          </InfoBox>
          <p>
            Wywołanie od razu odpowiada <InlineCode>run_id</InlineCode>. Wyodrębnione dane
            przychodzą później na webhook Flow albo możesz je pobrać drugim modułem HTTP, wywołując{" "}
            <InlineCode>{"GET https://run.tavnit.io/api/runs/{run_id}"}</InlineCode>.
          </p>
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Inne platformy (Zapier, Power Automate, n8n)">
          <p>To samo podejście działa na każdej platformie automatyzacji obsługującej żądania HTTP:</p>
          <InfoBox color="purple" icon={<Paperclip size={20} />} title="Jeśli platforma daje ci obiekt pliku">
            Użyj multipart/form-data z polem &bdquo;file&rdquo; zawierającym plik oraz polem flow_id.
          </InfoBox>
          <InfoBox color="violet" icon={<Code2 size={20} />} title="Jeśli platforma daje ci ciąg base64">
            Użyj treści JSON z flow_id, filename i file_base64 (zawartość base64 z poprzedniego kroku).
          </InfoBox>
          <p>
            Obie metody wywołują ten sam endpoint i dają identyczne wyniki ekstrakcji. Aby
            przetwarzać pliki trafiające do Google Drive, OneDrive lub Dropbox, ustaw wyzwalacz
            &bdquo;New file in folder&rdquo; i wyślij plik metodą POST w ten sam sposób.
          </p>
        </DocCard>

        <DocCard icon={<FolderInput size={24} />} title="Korzystanie z API Collections">
          <p>
            Jeśli otrzymujesz dokumenty różnych typów i chcesz, aby AI kierowała każdy z nich do
            właściwego Flow, wywołaj Collection zamiast Flow.
          </p>
          <BulletList
            items={[
              <Fragment key="f18">URL: <InlineCode>https://run.tavnit.io/api/collections/process</InlineCode></Fragment>,
              <Fragment key="f19">Użyj <InlineCode>collection_id</InlineCode> zamiast <InlineCode>flow_id</InlineCode></Fragment>,
            ]}
          />
          <CodeBlock lang="JSON" code={COLLECTIONS_JSON_EXAMPLE} />
        </DocCard>

        <DocCard icon={<Split size={24} />} title="Korzystanie z API Splitters">
          <p>
            Jeśli otrzymujesz połączone pliki PDF z kilkoma dokumentami i musisz je rozdzielić,
            wywołaj Splitter.
          </p>
          <BulletList
            items={[
              <Fragment key="f22">URL: <InlineCode>https://run.tavnit.io/api/splits/run</InlineCode></Fragment>,
              <Fragment key="f23">Użyj <InlineCode>splitter_id</InlineCode> zamiast <InlineCode>flow_id</InlineCode></Fragment>,
            ]}
          />
          <CodeBlock lang="JSON" code={SPLITTERS_JSON_EXAMPLE} />
        </DocCard>

        <DocCard icon={<Route size={24} />} title="Uruchamianie Pipeline">
          <p>
            Aby uruchomić cały Pipeline zamiast pojedynczego Flow, wyślij plik metodą POST
            (<InlineCode>file</InlineCode> jako multipart albo JSON z{" "}
            <InlineCode>file_base64</InlineCode> + <InlineCode>filename</InlineCode>) na{" "}
            <InlineCode>https://run.tavnit.io/api/pipelines/YOUR_PIPELINE_ID/execute</InlineCode>{" "}
            z tym samym nagłówkiem. ID Pipeline umieszczasz w URL.
          </p>
        </DocCard>

        <DocCard icon={<Wand2 size={24} />} title="Korzystanie z API Cleaners">
          <p>
            Aby wyczyścić wiersze danych ze swojej automatyzacji, wyślij je jako JSON do Cleanera.
            Plik arkusza kalkulacyjnego trafia natomiast na{" "}
            <InlineCode>https://run.tavnit.io/api/sweeps/run</InlineCode>, jako multipart z{" "}
            <InlineCode>cleaner_id</InlineCode> (ten endpoint nie przyjmuje base64).
          </p>
          <BulletList
            items={[
              <Fragment key="f20">URL: <InlineCode>https://run.tavnit.io/api/cleaners/YOUR_CLEANER_ID/process</InlineCode></Fragment>,
              "Method: POST, Content-Type: application/json",
            ]}
          />
          <CodeBlock lang="JSON" code={CLEANERS_JSON_EXAMPLE} />
        </DocCard>

        <DocCard icon={<Database size={24} />} title="Korzystanie z API Buckets">
          <p>
            Aby wysłać wiersze do Bucketu bez wysyłania dokumentu, użyj endpointu zapisu. Każdy
            wiersz musi zawierać wszystkie kolumny Bucketu.
          </p>
          <BulletList
            items={[
              <Fragment key="f24">URL: <InlineCode>https://run.tavnit.io/api/buckets/write</InlineCode></Fragment>,
              "Method: POST, Content-Type: application/json",
              <Fragment key="f25">Nagłówek: <InlineCode>X-API-Key: YOUR_API_KEY</InlineCode></Fragment>,
            ]}
          />
          <CodeBlock lang="JSON" code={BUCKETS_JSON_EXAMPLE} />
          <InfoBox color="purple" icon={<Info size={20} />} title="Jak znaleźć ID i nazwę Bucketu">
            Otwórz stronę szczegółów Bucketu i kliknij ikonę informacji. Obie wartości skopiujesz
            jednym kliknięciem.
          </InfoBox>
        </DocCard>

        <DocCard icon={<ClipboardCheck size={24} />} title="Inne funkcje">
          <p>
            Agenci, Matchers, Inspectors, Fillers, Signals, Subjects i Nets uruchamiasz w ten sam
            sposób: żądaniem HTTP z nagłówkiem <InlineCode>X-API-Key</InlineCode>. Przełącz się na
            kartę <strong>Kod</strong>, aby zobaczyć pola każdego endpointu.
          </p>
        </DocCard>
      </div>

      <Related
        links={[
          {
            href: "/docs/webhooks",
            label: "Odbieranie wyników przez webhooki",
            description: "Payload, który Tavnit wysyła po zakończeniu Run, i jak zbudować odbiornik.",
          },
          {
            href: "/docs/mcp-connector",
            label: "Połącz asystenta AI przez konektor MCP",
            description: "Korzystaj z Tavnit w claude.ai, Cursor lub innym kliencie MCP.",
          },
          {
            href: "/docs/user-roles",
            label: "Role i uprawnienia użytkowników",
            description: "Dlaczego klucz z rolą Tylko HITL może weryfikować, ale nie przetwarzać.",
          },
        ]}
      />
    </section>
  );
}
