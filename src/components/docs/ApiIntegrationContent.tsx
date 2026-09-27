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

const FIELD_HEAD = ["Field", "Required", "Description"];

/**
 * API Integration content: a reference of the customer-facing REST endpoints
 * (Code tab) plus the no-code recipes (No-Code tab).
 *
 * Both tab panels are always rendered and the inactive one is hidden with CSS
 * rather than unmounted, so the No-Code documentation exists in the served
 * HTML too. The Python/JavaScript toggle is a true conditional: those are
 * equivalent code samples, not distinct content.
 */
export default function ApiIntegrationContent() {
  const hashNoCode = useSyncExternalStore(subscribeHash, hashIsNoCode, serverHash);
  const [chosenTab, setChosenTab] = useState<ApiTab | null>(null);
  const apiTab: ApiTab = chosenTab ?? (hashNoCode ? "no-code" : "code");
  const [lang, setLang] = useState<Lang>("python");

  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        API Integration
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
        <DocCard icon={<Info size={24} />} title="How the API works">
          <p>
            The Tavnit REST API lets your own code do what you do in the app: send documents to a
            flow, collection, splitter or pipeline, run cleaners, matchers, inspectors, fillers,
            signals and agents, read and write Buckets, manage Subject cases, and approve or reject
            human reviews.
          </p>
          <BulletList
            items={[
              <Fragment key="b0">
                Base URL: <InlineCode>https://run.tavnit.io/api</InlineCode>. Every path below is
                relative to it.
              </Fragment>,
              <Fragment key="b1">
                Every request carries your API key in the <InlineCode>X-API-Key</InlineCode> header.
              </Fragment>,
              <Fragment key="b2">
                Processing is asynchronous. Endpoints that start work answer{" "}
                <strong>202 Accepted</strong> with an id right away and the work runs in the
                background. You get the result by polling (runs, agent runs, Catches, cases) or on a{" "}
                <DocLink href="/docs/webhooks">webhook</DocLink> configured on the feature.
              </Fragment>,
              <Fragment key="b3">
                API work costs the same credits as the same work in the app. See{" "}
                <DocLink href="/docs/credits">Credits</DocLink>.
              </Fragment>,
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Beta features">
            Pipelines, Subjects, Matchers, Inspectors, Fillers, Signals and Nets are in Beta. Their
            endpoints work today, but details can still change.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Lock size={24} />} title="Authentication and IDs">
          <h3 className="text-base font-semibold text-fg-2 mt-2 mb-1">API key</h3>
          <p>
            Open <strong>Integrations</strong> in the app sidebar. The <strong>API Key</strong> card
            shows your key (reveal and copy it there). Each member has their own key in each
            organization, and a request acts as that member in that organization.
          </p>
          <WarningBox>
            Keep your API key secret. <strong>Regenerate</strong> on the same card invalidates the
            current key immediately, and anything still using it stops working.
          </WarningBox>
          <p>A request without a valid key gets:</p>
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
            The key carries your role. Members with the <strong>HITL Only</strong> role can only
            use the human-review approve and reject endpoints and the API key endpoints. Every
            processing and data endpoint refuses them with <strong>403</strong> and{" "}
            <InlineCode>Your role only permits HITL reviews</InlineCode>. See{" "}
            <DocLink href="/docs/user-roles">user roles</DocLink>.
          </p>

          <h3 className={H3}>IDs</h3>
          <p>
            Each flow, collection, splitter, cleaner, bucket, agent, matcher, inspector, filler and
            pipeline shows its ID on its detail page, with a copy button. Resources must belong to
            the organization of your key: another organization&apos;s ID answers 403 or 404.
          </p>
        </DocCard>

        <DocCard icon={<Download size={24} />} title="Sending files">
          <p>Endpoints that take a document accept it in one of two ways:</p>
          <InfoBox color="purple" icon={<Paperclip size={20} />} title="Multipart file upload">
            Send the file as multipart/form-data in a field named file, with the other fields as
            form fields. Works on every file endpoint.
          </InfoBox>
          <InfoBox color="violet" icon={<Code2 size={20} />} title="Base64 in a JSON body">
            Send JSON with file_base64 (the file content) and filename (with its extension), plus
            the other fields. Useful when an automation tool gives you base64 instead of a file.
          </InfoBox>
          <DataTable
            head={["Endpoint", "Base64", "Files accepted"]}
            rows={[
              ["POST /runs/process", "Yes", "PDF, images (PNG, JPG, JPEG, JFIF, TIF, TIFF, WEBP, BMP, GIF), spreadsheets (XLSX, XLS, CSV)"],
              ["POST /collections/process", "Yes", "Same as runs"],
              ["POST /splits/run", "Yes", "Same as runs"],
              ["POST /pipelines/{id}/execute", "Yes", "PDF and images"],
              ["POST /signals/{id}/run", "Yes", "Audio: MP3, MP4, MPEG, MPGA, M4A, WAV, WEBM"],
              ["POST /sweeps/run", "No", "Spreadsheets: CSV, XLSX, XLS"],
              ["Inspectors, fillers, subjects and cases", "No", "The document as a multipart file"],
            ]}
          />
          <p>A single request can be up to 150 MB. The file type is taken from the filename&apos;s extension.</p>
        </DocCard>

        <DocCard icon={<ListChecks size={24} />} title="Responses and errors">
          <p>
            Responses are JSON with a <InlineCode>success</InlineCode> flag. Errors carry an{" "}
            <InlineCode>error</InlineCode> string, sometimes a <InlineCode>message</InlineCode>, and
            extra keys that explain the problem:
          </p>
          <CodeBlock lang="402 example" code={API_ERROR_EXAMPLE} />
          <DataTable
            head={["Status", "Meaning"]}
            rows={[
              ["200 / 201", "Done (reads, cancels, approvals) / created (cases, fills, inspections)."],
              ["202", "Accepted: the work is queued. Keep the returned id."],
              ["400", "A required field is missing or invalid, the file type is not supported, or the resource is inactive or not set up."],
              ["401", "Missing or invalid X-API-Key."],
              ["402", "Not enough credits to start. The body says how many are needed and how many are available."],
              ["403", "The resource belongs to another organization, your role is HITL Only, or you are not a reviewer of that item."],
              ["404", "The ID does not exist in your organization."],
              ["409", "Conflict with the current state: bucket name mismatch, already cancelled or finished, case closed, slot already filled."],
              ["429", "Too many runs already waiting for an agent."],
              ["500", "Unexpected error. Safe to retry later."],
            ]}
          />
        </DocCard>

        <DocCard icon={<Layers size={24} />} title="Endpoint reference">
          <DataTable
            head={["Feature", "Method and path", "What it does"]}
            rows={[
              ["Flows", "POST /runs/process", "Extract a document with a flow"],
              ["Flows", "GET /runs/{run_id}", "Run status and extracted data"],
              ["Flows", "GET /runs/{run_id}/source-file", "The original document"],
              ["Collections", "POST /collections/process", "AI routes a document to the right flow or splitter"],
              ["Collections", "GET /collection-runs/{id}/source-file", "The original document"],
              ["Splitters", "POST /splits/run", "Split a multi-document file"],
              ["Splitters", "GET /splits/{split_id}/source-file", "The original bundle"],
              ["Cleaners", "POST /sweeps/run", "Sweep a spreadsheet"],
              ["Cleaners", "POST /cleaners/{cleaner_id}/process", "Sweep rows sent as JSON"],
              ["Buckets", "POST /buckets/write", "Append or replace rows"],
              ["Buckets", "GET /buckets/read", "Read rows, paginated"],
              ["Agents", "POST /bots/{agent_id}/runs", "Start an agent run"],
              ["Agents", "GET /bot-runs/{bot_run_id}", "Poll one agent run"],
              ["Agents", "GET /bots/{agent_id}/runs", "List an agent's runs"],
              ["Agents", "POST /bot-runs/{bot_run_id}/cancel", "Cancel an agent run"],
              ["Matchers", "POST /matchers/{matcher_id}/run", "Match completed runs"],
              ["Inspectors", "POST /inspectors/{inspector_id}/process", "Add a document to an inspection"],
              ["Fillers", "POST /fillers/{filler_id}/fills", "Open a fill and add documents"],
              ["Pipelines", "POST /pipelines/{pipeline_id}/execute", "Execute a pipeline"],
              ["Signals", "POST /signals/{signal_id}/run", "Structure an audio file (a Wave)"],
              ["Subjects", "POST /subjects/{subject_id}/process", "Route a document to a case"],
              ["Nets", "POST /nets/{net_id}/catch", "Start a Catch"],
              ["Human review", "POST /runs/{run_id}/hitl/approve", "Approve or reject paused items"],
              ["API key", "GET /me/api-key", "Read or regenerate your key"],
            ]}
          />
          <p>Each feature is detailed below, with its other endpoints.</p>
        </DocCard>

        {/* ── Flows ── */}
        <DocCard icon={<FileText size={24} />} title="Flows: process a document">
          <p>Send one document to a flow. Tavnit creates a run and extracts it in the background.</p>
          <Endpoint method="POST" path="/runs/process" />
          <DataTable
            head={FIELD_HEAD}
            rows={[
              ["flow_id", "Yes", "The flow that extracts the document."],
              ["file", "Yes*", "The document (multipart)."],
              ["file_base64 + filename", "Yes*", "Instead of file: base64 content and the filename with its extension."],
              ["content_type", "No", "MIME type for a base64 file."],
              ["source", "No", "Label stored on the run: api (default), email, manual_upload or collection."],
            ]}
            caption="* Send either file or file_base64 + filename."
          />
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python" code={PYTHON_CODE} />
          ) : (
            <CodeBlock lang="JavaScript" code={JAVASCRIPT_CODE} />
          )}
          <CodeBlock lang="202 response" code={RUN_PROCESS_RESPONSE} />
          <p>
            Errors: 400 (no file, no flow_id, unsupported or invalid file), 403 (flow of another
            organization), 404 (flow not found). A rejected request still creates a failed run when
            it can, and returns its <InlineCode>run_id</InlineCode> so you can find it in{" "}
            <strong>Runs</strong>.
          </p>

          <h3 className={H3}>Get the run and its data</h3>
          <Endpoint method="GET" path="/runs/{run_id}" />
          <p>
            Poll until <InlineCode>status</InlineCode> is terminal. Statuses:{" "}
            <InlineCode>queued</InlineCode>, <InlineCode>running</InlineCode>,{" "}
            <InlineCode>awaiting_approval</InlineCode> (paused for{" "}
            <DocLink href="/docs/human-in-the-loop">human review</DocLink>),{" "}
            <InlineCode>completed</InlineCode>, <InlineCode>failed</InlineCode> and{" "}
            <InlineCode>cancelled</InlineCode>. <InlineCode>data</InlineCode> holds the extracted
            rows and stays <InlineCode>null</InlineCode> until the run is completed, including while
            it waits for approval. When <InlineCode>columns</InlineCode> is set, use it for the
            column order. <InlineCode>attempt</InlineCode> and{" "}
            <InlineCode>previous_attempts</InlineCode> show automatic retries. Add{" "}
            <InlineCode>?include_document=true</InlineCode> to also get a signed link to the
            original file. This works for every run, including runs created by collections,
            splitters, pipelines and email.
          </p>
          <CodeBlock lang="200 response" code={RUN_GET_RESPONSE} />
          {lang === "python" ? (
            <CodeBlock lang="Python (submit and poll)" code={PYTHON_RUN_POLL_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (submit and poll)" code={JAVASCRIPT_RUN_POLL_CODE} />
          )}

          <h3 className={H3}>Get the original document</h3>
          <Endpoint method="GET" path="/runs/{run_id}/source-file" />
          <p>
            Returns a signed URL to the file as uploaded, whatever the run&apos;s status. Optional{" "}
            <InlineCode>expires_in</InlineCode> sets the link lifetime in seconds (60 to 604800,
            default 7 days). With <InlineCode>?download=true</InlineCode> the response is the file
            itself.
          </p>
          <CodeBlock lang="200 response" code={SOURCE_FILE_RESPONSE} />
        </DocCard>

        {/* ── Collections ── */}
        <DocCard icon={<FolderInput size={24} />} title="Collections: let AI route the document">
          <p>
            Send a document without choosing the flow: AI picks the best flow or splitter of the
            collection. Use it when you receive mixed document types.
          </p>
          <Endpoint method="POST" path="/collections/process" />
          <p>
            Same body as <InlineCode>/runs/process</InlineCode>, with{" "}
            <InlineCode>collection_id</InlineCode> instead of <InlineCode>flow_id</InlineCode> (or
            put the ID in the path: <InlineCode>{"/collections/{collection_id}/process"}</InlineCode>).
            The collection must be active and have at least one active flow or splitter, otherwise
            the call answers 400.
          </p>
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python (Collections)" code={PYTHON_COLLECTIONS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Collections)" code={JAVASCRIPT_COLLECTIONS_CODE} />
          )}
          <CodeBlock lang="202 response" code={COLLECTION_PROCESS_RESPONSE} />
          <p>
            The chosen flow creates a normal run, and its webhook payload includes{" "}
            <InlineCode>collection_run_id</InlineCode> so you can match the result to your request.
            The original is available right away at{" "}
            <InlineCode>{"GET /collection-runs/{collection_run_id}/source-file"}</InlineCode> (same
            options as the run source file). See <DocLink href="/docs/collections">Collections</DocLink>.
          </p>
        </DocCard>

        {/* ── Splitters ── */}
        <DocCard icon={<Split size={24} />} title="Splitters: split a multi-document file">
          <p>
            Send a file that contains several documents. The splitter finds where each one starts
            and ends, classifies it, and sends each part where its document type says.
          </p>
          <Endpoint method="POST" path="/splits/run" />
          <p>
            Same body as <InlineCode>/runs/process</InlineCode>, with{" "}
            <InlineCode>splitter_id</InlineCode>. The pages are counted up front and your balance
            must cover them (402 otherwise).
          </p>
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python (Splitters)" code={PYTHON_SPLITTERS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Splitters)" code={JAVASCRIPT_SPLITTERS_CODE} />
          )}
          <CodeBlock lang="202 response" code={SPLIT_RUN_RESPONSE} />
          <p>
            Parts sent to flows become runs of their own, and their webhooks carry{" "}
            <InlineCode>split_id</InlineCode>. The original bundle is at{" "}
            <InlineCode>{"GET /splits/{split_id}/source-file"}</InlineCode>. See{" "}
            <DocLink href="/docs/splitters">Splitters</DocLink>.
          </p>
        </DocCard>

        {/* ── Cleaners ── */}
        <DocCard icon={<Wand2 size={24} />} title="Cleaners: run a sweep">
          <p>
            A sweep runs a cleaner over rows of data to normalize, classify, look up or enrich
            values. Send the rows as a spreadsheet or as JSON.
          </p>
          <Endpoint method="POST" path="/sweeps/run" />
          <DataTable
            head={FIELD_HEAD}
            rows={[
              ["cleaner_id", "Yes", "The cleaner to run."],
              ["file", "Yes", "CSV, XLSX or XLS, multipart only. Headers on the first row; every base field the cleaner requires must be a column, without duplicates."],
              ["sheet_name", "No", "Which sheet of a workbook to read (default: the first)."],
            ]}
          />
          <Endpoint method="POST" path="/cleaners/{cleaner_id}/process" />
          <p>
            Send JSON with <InlineCode>rows</InlineCode> (an array of objects), or a multipart{" "}
            <InlineCode>file</InlineCode> as above.
          </p>
          <CodeBlock lang="JSON body" code={CLEANERS_JSON_EXAMPLE} />
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python (Cleaners)" code={PYTHON_CLEANERS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Cleaners)" code={JAVASCRIPT_CLEANERS_CODE} />
          )}
          <CodeBlock lang="202 response" code={SWEEP_RUN_RESPONSE} />
          <p>
            Credits are estimated from the number of cells and checked before the sweep is queued
            (402 if short). A cleaner with an invalid setup answers 400 with{" "}
            <InlineCode>validation_errors</InlineCode>. See{" "}
            <DocLink href="/docs/cleaners">Cleaners</DocLink>.
          </p>
        </DocCard>

        {/* ── Buckets ── */}
        <DocCard icon={<Database size={24} />} title="Buckets: write and read rows">
          <p>
            Push rows into a bucket from your own systems, or read what your flows stored there. Find
            the bucket ID and name by tapping the info icon on the bucket&apos;s page. The name is a
            safety check: if it does not match the ID, the call answers <strong>409</strong>.
          </p>
          <Endpoint method="POST" path="/buckets/write" />
          <DataTable
            head={FIELD_HEAD}
            rows={[
              ["bucket_id", "Yes", "The bucket."],
              ["bucket_name", "Yes", "Its exact name."],
              ["overwrite", "Yes", "Boolean. false appends the rows; true replaces all existing rows."],
              ["rows", "Yes", "Array of objects, up to 50,000 per request."],
            ]}
          />
          <p>
            Send the body as <InlineCode>application/json</InlineCode>. Every row must have exactly
            the bucket&apos;s columns, by column name or display name: a missing or unknown column
            aborts the whole write with 400, listing <InlineCode>missing_columns</InlineCode> and{" "}
            <InlineCode>extra_columns</InlineCode>.
          </p>
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python (Buckets)" code={PYTHON_BUCKETS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Buckets)" code={JAVASCRIPT_BUCKETS_CODE} />
          )}
          <CodeBlock lang="202 response" code={BUCKET_WRITE_RESPONSE} />

          <h3 className={H3}>Read rows</h3>
          <Endpoint method="GET" path="/buckets/read" />
          <p>
            Query parameters: <InlineCode>bucket_id</InlineCode> and{" "}
            <InlineCode>bucket_name</InlineCode> (required), <InlineCode>limit</InlineCode> (1 to
            1000, default 100) and <InlineCode>offset</InlineCode> (default 0). Page through with{" "}
            <InlineCode>offset</InlineCode> while <InlineCode>has_more</InlineCode> is true;{" "}
            <InlineCode>total_count</InlineCode> counts every row. Row <InlineCode>data</InlineCode>{" "}
            keys are the column names; use <InlineCode>columns</InlineCode> for display names. Stored
            file links come back as fresh signed URLs.
          </p>
          <CodeBlock lang="Request" code={BUCKET_READ_REQUEST} />
          <CodeBlock lang="200 response" code={BUCKET_READ_RESPONSE} />
          <p>
            See <DocLink href="/docs/buckets">Buckets</DocLink>.
          </p>
        </DocCard>

        {/* ── Agents ── */}
        <DocCard icon={<Bot size={24} />} title="Agents: trigger and poll runs">
          <p>
            Start an agent from your code and collect what it captured. Agents are enabled per
            organization on request: contact support to turn them on.
          </p>
          <Endpoint method="POST" path="/bots/{agent_id}/runs" />
          <p>
            Optional JSON <InlineCode>{'{"inputs": {...}}'}</InlineCode> overrides the
            agent&apos;s input variables for this run. Only variables the agent declares are used,
            and secret values are never accepted. You can also call{" "}
            <InlineCode>POST /bots/runs</InlineCode> with <InlineCode>bot_id</InlineCode> in the
            body. Your balance must cover at least one browser minute (402 otherwise); the real
            minutes are charged when the run ends. Every call starts a new, billed run.
          </p>
          <CodeBlock lang="Request" code={AGENT_TRIGGER_REQUEST} />
          <p>
            <InlineCode>status</InlineCode> is <InlineCode>queued</InlineCode>, or{" "}
            <InlineCode>waiting</InlineCode> when the agent runs one run at a time and is busy (it
            starts by itself when its turn comes). 409 when the agent is archived, 429 when too many
            runs are already waiting.
          </p>

          <h3 className={H3}>Poll, list and cancel</h3>
          <DataTable
            head={["Endpoint", "What it does"]}
            rows={[
              ["GET /bot-runs/{bot_run_id}", "One run: status, timings, credits charged, input (secrets removed) and output with signed file links. Also at GET /bots/{agent_id}/runs/{bot_run_id}."],
              ["GET /bots/{agent_id}/runs", "Newest first, without input and output. Query: status (queued, running, completed, failed, cancelled), limit (1 to 100, default 20), offset. Returns runs and total."],
              ["POST /bot-runs/{bot_run_id}/cancel", "Cancels a waiting, queued or running run. Minutes already used are billed. 409 when the run already finished. Also at POST /bots/{agent_id}/runs/{bot_run_id}/cancel."],
            ]}
          />
          <CodeBlock lang="GET /bot-runs/{bot_run_id}" code={AGENT_RUN_RESPONSE} />
          <p>
            See <DocLink href="/docs/agents">Agents</DocLink>.
          </p>
        </DocCard>

        {/* ── Matchers ── */}
        <DocCard icon={<Target size={24} />} title="Matchers: match runs">
          <p>Compare completed runs of the matcher&apos;s flow, for example invoices against purchase orders.</p>
          <Endpoint method="POST" path="/matchers/{matcher_id}/run" />
          <DataTable
            head={FIELD_HEAD}
            rows={[
              ["run_ids", "Yes", "Two or more completed runs of the matcher's flow."],
              ["benchmark_run_id", "In benchmark mode", "The run the others are compared against."],
            ]}
          />
          <CodeBlock lang="Request" code={MATCHER_RUN_REQUEST} />
          <p>
            Credits depend on the number of cells compared and are checked first (402). There is no
            API endpoint to read a match: get the result on the matcher&apos;s webhook or email
            output, or in the app. See <DocLink href="/docs/matchers">Matchers</DocLink>.
          </p>
        </DocCard>

        {/* ── Inspectors ── */}
        <DocCard icon={<ShieldCheck size={24} />} title="Inspectors: check a set of documents">
          <p>
            An inspection collects documents, routes each one into a slot of the inspector,
            extracts it and evaluates the checklist.
          </p>
          <Endpoint method="POST" path="/inspectors/{inspector_id}/process" />
          <p>
            Multipart <InlineCode>file</InlineCode>. Without <InlineCode>inspection_id</InlineCode> a
            new inspection is created; pass the returned <InlineCode>inspection_id</InlineCode> to
            add more documents to it (it must still be collecting, 409 otherwise). Each document
            costs the routing credit up front (402 if short), plus its extraction. The inspector
            must be active.
          </p>
          <CodeBlock lang="Request" code={INSPECTOR_PROCESS_REQUEST} />
          <DataTable
            head={["Endpoint", "What it does"]}
            rows={[
              ["POST /inspectors/{inspector_id}/inspections", "Creates an empty inspection (201) to add documents to later."],
              ["POST /inspections/{inspection_id}/fire", "Stops collecting and evaluates now. 400 with missing_inputs when a required slot has no document."],
            ]}
          />
          <p>
            The result arrives on the inspector&apos;s webhook or email output. See{" "}
            <DocLink href="/docs/inspectors">Inspectors</DocLink>.
          </p>
        </DocCard>

        {/* ── Fillers ── */}
        <DocCard icon={<FileOutput size={24} />} title="Fillers: fill PDF forms">
          <p>
            A fill gathers the documents a filler needs, extracts them and writes the values into
            the filler&apos;s PDF templates.
          </p>
          <DataTable
            head={["Endpoint", "What it does"]}
            rows={[
              ["POST /fillers/{filler_id}/fills", "Opens a fill (201, returns fill_id). The filler needs a template and field mappings."],
              ["POST /fills/{fill_id}/route-upload", "Multipart file; AI routes it into an open slot (202). Costs the routing credit."],
              ["POST /fills/{fill_id}/inputs/{input_id}/upload", "Multipart file for a specific slot; starts that slot's run (202)."],
              ["POST /fills/{fill_id}/inputs/{input_id}/attach-run", "JSON run_id: reuse a completed run for a slot (202)."],
              ["POST /fills/{fill_id}/fire", "Fills now instead of waiting for every slot. 400 with missing_inputs when a required slot is empty."],
              ["POST /fillers/{filler_id}/templates", "Adds a template PDF (multipart file, optional name). Map its fields in the app."],
            ]}
          />
          <CodeBlock lang="Request" code={FILLER_REQUEST} />
          <p>
            The filled PDFs arrive on the filler&apos;s webhook or email output. See{" "}
            <DocLink href="/docs/fillers">Fillers</DocLink>.
          </p>
        </DocCard>

        {/* ── Pipelines ── */}
        <DocCard icon={<Route size={24} />} title="Pipelines: execute">
          <p>Start one execution of a pipeline with a document.</p>
          <Endpoint method="POST" path="/pipelines/{pipeline_id}/execute" />
          <p>
            Multipart <InlineCode>file</InlineCode> or <InlineCode>file_base64</InlineCode> +{" "}
            <InlineCode>filename</InlineCode>; PDF or image. Your balance must cover at least 1
            credit (402 otherwise), and each step then charges its own credits. 400 when the
            pipeline is inactive or its graph cannot run (with{" "}
            <InlineCode>validation_errors</InlineCode>).
          </p>
          <CodeBlock lang="Request" code={PIPELINE_EXECUTE_REQUEST} />
          <p>
            Cancel with <InlineCode>{"POST /pipelines/executions/{execution_id}/cancel"}</InlineCode>{" "}
            (409 when it is not running). Results leave through the pipeline&apos;s Output nodes. See{" "}
            <DocLink href="/docs/pipelines">Pipelines</DocLink>.
          </p>
        </DocCard>

        {/* ── Signals ── */}
        <DocCard icon={<AudioLines size={24} />} title="Signals: structure an audio file">
          <p>Send a recording and the signal turns it into structured data (a Wave).</p>
          <Endpoint method="POST" path="/signals/{signal_id}/run" />
          <p>
            Multipart <InlineCode>file</InlineCode> or base64. Audio up to 150 MB and 8 hours, with
            at most 2 hours of detected speech. Billing is 1 credit per minute of detected speech
            (minimum 1); silence is not billed. <InlineCode>estimated_max_credits</InlineCode> is
            the upper bound from the raw duration. Your balance must cover at least 1 credit (402).
          </p>
          <CodeBlock lang="Request" code={SIGNAL_RUN_REQUEST} />
          <p>
            The result arrives on the signal&apos;s webhook or in the app. See{" "}
            <DocLink href="/docs/signals">Signals</DocLink>.
          </p>
        </DocCard>

        {/* ── Subjects ── */}
        <DocCard icon={<Briefcase size={24} />} title="Subjects and cases">
          <p>File documents into the cases of a Subject, and manage cases from your code.</p>
          <DataTable
            head={["Endpoint", "What it does"]}
            rows={[
              ["POST /subjects/{subject_id}/process", "Multipart file; Tavnit routes it to a case (202, returns subject_doc_id)."],
              ["POST /cases/{case_id}/docs", "Multipart file straight into a case, no routing. doc_type_id is required unless the subject has one document type. Returns the run_id (202). 409 when the case is closed or that document type is already filled."],
              ["POST /subjects/{subject_id}/docs/{doc_id}/assign", "JSON case_id and doc_type_id: file a held document by hand (202)."],
              ["POST /subjects/{subject_id}/cases", "JSON name (required, unique, up to 200 characters) and params (optional object). Creates a case (201). 409 when the name exists."],
              ["GET /subjects/{subject_id}/cases", "Query: state (open or closed), status, search, limit (up to 200, default 50), offset. Returns cases and total."],
              ["GET /cases/{case_id}", "The case plus its documents, each with the run_id to poll at GET /runs/{run_id}."],
              ["POST /cases/{case_id}/close", "Closes the case (200). New documents for it are held instead of filed. 409 when already closed."],
              ["POST /cases/{case_id}/reopen", "Reopens it (200). 409 when it is open."],
              ["POST /cases/{case_id}/inspections", "JSON subject_inspector_id: runs a bound inspector over the case's completed runs (202)."],
            ]}
          />
          <CodeBlock lang="Request" code={CASE_REQUEST} />
          <CodeBlock lang="201 response" code={CASE_RESPONSE} />
          <p>
            See <DocLink href="/docs/subjects">Subjects</DocLink>.
          </p>
        </DocCard>

        {/* ── Nets ── */}
        <DocCard icon={<Radar size={24} />} title="Nets: start a Catch">
          <p>Nets are enabled per organization. Without access, these endpoints answer 403.</p>
          <Endpoint method="POST" path="/nets/{net_id}/catch" />
          <p>
            Without a body, the Catch picks up where the last one ended. Send{" "}
            <InlineCode>window_start</InlineCode> and/or <InlineCode>window_end</InlineCode> (ISO
            timestamps) to backfill a range instead. Credits are charged when the Catch completes,
            and nothing is charged for a failed or cancelled Catch. 402 when credits are short, 409
            when the Net is inactive or a Catch that continues from the last one is already in
            progress.
          </p>
          <CodeBlock lang="Request" code={NET_CATCH_REQUEST} />
          <p>
            Poll <InlineCode>{"GET /catches/{catch_id}"}</InlineCode>: status, stage, counts, credits
            and, once completed, <InlineCode>output</InlineCode> with columns and rows. Cancel with{" "}
            <InlineCode>{"POST /catches/{catch_id}/cancel"}</InlineCode>. See{" "}
            <DocLink href="/docs/nets">Nets</DocLink>.
          </p>
        </DocCard>

        {/* ── HITL ── */}
        <DocCard icon={<UserCheck size={24} />} title="Human review: approve or reject">
          <p>
            Items paused for review can be approved or rejected from your own tools. Only a
            configured reviewer of that flow, matcher, inspector or filler can act (403 otherwise),
            and the item must be <InlineCode>awaiting_approval</InlineCode> (409 otherwise). These
            endpoints are open to the HITL Only role.
          </p>
          <DataTable
            head={["Endpoint", "Body"]}
            rows={[
              ["POST /runs/{run_id}/hitl/approve", "output_json (required): the final rows; diff (optional list of edits). 400 with missing_fields when a required human input field is empty."],
              ["POST /matches/{match_id}/hitl/approve", "groups (the final grouping), excluded, diff."],
              ["POST /inspections/{inspection_id}/hitl/approve", "waivers (item_id and reason for each failed item to waive), diff."],
              ["POST /fills/{fill_id}/hitl/approve", "values (field values per template), diff, allow_missing_human_fields."],
              [".../hitl/reject", "The same paths ending in /hitl/reject, with an optional reason."],
            ]}
          />
          <CodeBlock lang="Request" code={HITL_RUN_APPROVE_REQUEST} />
          <p>
            Approving resumes delivery (webhook, email, bucket). Rejecting a run cancels it. See{" "}
            <DocLink href="/docs/human-in-the-loop">Human-in-the-loop</DocLink>.
          </p>
        </DocCard>

        {/* ── API key ── */}
        <DocCard icon={<KeyRound size={24} />} title="API key endpoints">
          <DataTable
            head={["Endpoint", "What it does"]}
            rows={[
              ["GET /me/api-key", "Returns your key for the organization."],
              ["POST /me/api-key/regenerate", "Issues a new key and invalidates the old one at once. Update every integration."],
            ]}
          />
          <CodeBlock lang="200 response" code={API_KEY_RESPONSE} />
        </DocCard>
      </div>

      {/* ── No-Code tab ── */}
      <div role="tabpanel" aria-label="No-Code" className={apiTab === "no-code" ? undefined : "hidden"}>
        <DocCard icon={<Star size={24} />} title="Automation Tools Overview">
          <p>
            You don&apos;t need to write code to connect Tavnit to your workflows. Any automation
            platform that can send an HTTP request can start work in Tavnit, and any platform that
            can receive a webhook can take the results.
          </p>
          <InfoBox color="purple" icon={<CircleDot size={20} />} title="Make">
            Visual scenarios: an HTTP module calls Tavnit and a Custom webhook receives the results.
          </InfoBox>
          <InfoBox color="yellow" icon={<Zap size={20} />} title="Zapier">
            Webhooks by Zapier: Catch Hook receives the results and a POST action starts runs.
          </InfoBox>
          <InfoBox color="green" icon={<CircleDot size={20} />} title="n8n">
            Self-hosted or cloud: a Webhook node receives the results and an HTTP Request node
            starts runs.
          </InfoBox>
          <InfoBox color="blue" icon={<CircleDot size={20} />} title="Power Automate">
            An HTTP action calls the API the same way.
          </InfoBox>
          <p>
            Every request needs the <InlineCode>X-API-Key</InlineCode> header with your key from{" "}
            <strong>Integrations</strong>.
          </p>
        </DocCard>

        <DocCard icon={<Webhook size={24} />} title="Receive results in your automation">
          <NumberedList
            items={[
              "In your platform, create a webhook trigger (Make: Custom webhook; Zapier: Webhooks by Zapier → Catch Hook; n8n: Webhook node, POST) and copy its URL.",
              "In Tavnit, paste it as the webhook of a flow (Webhook panel) or of a pipeline Output node.",
              "Process one document so the platform learns the payload, then map the fields to Sheets, a CRM, an ERP and so on.",
            ]}
          />
          <p>
            The payload is described on the <DocLink href="/docs/webhooks">webhooks page</DocLink>.
          </p>
        </DocCard>

        <DocCard icon={<CircleDot size={24} />} title="Make Integration">
          <p>
            Make (formerly Integromat) is a visual automation platform that lets you connect apps
            and automate workflows without writing any code.
          </p>
          <a
            href="https://www.make.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-2 transition-colors text-sm font-medium mt-1"
          >
            Visit Make <ExternalLink size={14} />
          </a>
        </DocCard>

        <DocCard icon={<Layers size={24} />} title="Getting Started with Make">
          <NumberedList
            items={[
              "Go to make.com and create an account",
              'Click "Create a new scenario" from your dashboard',
              "You'll see a blank canvas where you can add modules",
              'Search for "HTTP" and add the "Make a request" module',
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="What is a Scenario?">
            A scenario is an automated workflow in Make. It consists of modules (apps) connected
            together. When one module triggers or receives data, it passes that data to the next module.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Configure the HTTP Module">
          <p>
            Once you&apos;ve added the HTTP module, configure it to send documents to Tavnit. You can use
            either of these two approaches:
          </p>

          <h3 className="text-base font-semibold text-accent mt-6 mb-3">
            Option 1: Multipart/form-data (when you have a File object)
          </h3>
          <NumberedList
            items={[
              'Add an HTTP "Make a request" module to your scenario',
              <Fragment key="f14">
                Configure the request:
                <BulletList
                  items={[
                    <>URL: <InlineCode>https://run.tavnit.io/api/runs/process</InlineCode></>,
                    "Method: POST",
                  ]}
                />
              </Fragment>,
              <Fragment key="f15">
                In the Headers tab, add:
                <BulletList
                  items={[
                    "Header name: X-API-Key",
                    "Header value: YOUR_API_KEY",
                  ]}
                />
              </Fragment>,
              'Set Body type to "multipart/form-data"',
              <Fragment key="f16">
                Add form fields:
                <BulletList
                  items={[
                    "flow_id: YOUR_FLOW_ID",
                    "file: (map from previous module)",
                    "source: api (optional)",
                  ]}
                />
              </Fragment>,
              "Run your scenario to test",
            ]}
          />

          <h3 className="text-base font-semibold text-[#6c42f0] mt-8 mb-3">
            Option 2: JSON + base64 (when you have a base64 string)
          </h3>
          <p>If your previous module outputs a base64 string instead of a file, use this approach:</p>
          <NumberedList
            items={[
              'Set Body type to "Raw" and select "JSON (application/json)"',
              <Fragment key="f17">
                In the Headers tab, also add:
                <BulletList
                  items={[
                    "Header name: Content-Type",
                    "Header value: application/json",
                  ]}
                />
              </Fragment>,
              "Set the JSON body to:",
            ]}
          />
          <CodeBlock lang="JSON" code={JSON_BODY_EXAMPLE} />

          <InfoBox color="blue" icon={<Info size={20} />} title="Mapping the base64 content">
            Replace {"{{previous_module.base64_content}}"} with the actual mapping from your previous
            module. In Make, click in the field and select the base64 output from the module that
            provides your file. Keep the extension in filename: Tavnit uses it to detect the file type.
          </InfoBox>
          <p>
            The call answers right away with a <InlineCode>run_id</InlineCode>. The extracted data
            arrives later on the flow&apos;s webhook, or you can fetch it with a second HTTP module
            calling <InlineCode>{"GET https://run.tavnit.io/api/runs/{run_id}"}</InlineCode>.
          </p>
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Other Platforms (Zapier, Power Automate, n8n)">
          <p>The same approach works for any automation platform that supports HTTP requests:</p>
          <InfoBox color="purple" icon={<Paperclip size={20} />} title="If your platform gives you a file object">
            Use multipart/form-data with a &ldquo;file&rdquo; field containing the file, plus the flow_id field.
          </InfoBox>
          <InfoBox color="violet" icon={<Code2 size={20} />} title="If your platform gives you a base64 string">
            Use a JSON body with flow_id, filename, and file_base64 (the base64 content from the previous step).
          </InfoBox>
          <p>
            Both methods call the same endpoint and produce identical extraction results. To process
            files that land in Google Drive, OneDrive or Dropbox, trigger on &ldquo;New file in
            folder&rdquo; and POST the file the same way.
          </p>
        </DocCard>

        <DocCard icon={<FolderInput size={24} />} title="Using the Collections API">
          <p>
            If you receive different types of documents and want AI to route each one to the right
            flow, call the collection instead of a flow.
          </p>
          <BulletList
            items={[
              <Fragment key="f18">URL: <InlineCode>https://run.tavnit.io/api/collections/process</InlineCode></Fragment>,
              <Fragment key="f19">Use <InlineCode>collection_id</InlineCode> instead of <InlineCode>flow_id</InlineCode></Fragment>,
            ]}
          />
          <CodeBlock lang="JSON" code={COLLECTIONS_JSON_EXAMPLE} />
        </DocCard>

        <DocCard icon={<Split size={24} />} title="Using the Splitters API">
          <p>
            If you receive combined PDFs with several documents and need them separated, call the
            splitter.
          </p>
          <BulletList
            items={[
              <Fragment key="f22">URL: <InlineCode>https://run.tavnit.io/api/splits/run</InlineCode></Fragment>,
              <Fragment key="f23">Use <InlineCode>splitter_id</InlineCode> instead of <InlineCode>flow_id</InlineCode></Fragment>,
            ]}
          />
          <CodeBlock lang="JSON" code={SPLITTERS_JSON_EXAMPLE} />
        </DocCard>

        <DocCard icon={<Route size={24} />} title="Starting a pipeline">
          <p>
            To run a whole pipeline instead of a single flow, POST the file (multipart{" "}
            <InlineCode>file</InlineCode>, or JSON <InlineCode>file_base64</InlineCode> +{" "}
            <InlineCode>filename</InlineCode>) to{" "}
            <InlineCode>https://run.tavnit.io/api/pipelines/YOUR_PIPELINE_ID/execute</InlineCode>{" "}
            with the same header. The pipeline ID goes in the URL.
          </p>
        </DocCard>

        <DocCard icon={<Wand2 size={24} />} title="Using the Cleaners API">
          <p>
            To clean rows of data from your automation, send them as JSON to the cleaner. A
            spreadsheet file goes to <InlineCode>https://run.tavnit.io/api/sweeps/run</InlineCode>{" "}
            instead, as multipart with <InlineCode>cleaner_id</InlineCode> (that endpoint does not
            take base64).
          </p>
          <BulletList
            items={[
              <Fragment key="f20">URL: <InlineCode>https://run.tavnit.io/api/cleaners/YOUR_CLEANER_ID/process</InlineCode></Fragment>,
              "Method: POST, Content-Type: application/json",
            ]}
          />
          <CodeBlock lang="JSON" code={CLEANERS_JSON_EXAMPLE} />
        </DocCard>

        <DocCard icon={<Database size={24} />} title="Using the Buckets API">
          <p>
            To push rows into a bucket without sending a document, use the write endpoint. Each row
            must contain every column of the bucket.
          </p>
          <BulletList
            items={[
              <Fragment key="f24">URL: <InlineCode>https://run.tavnit.io/api/buckets/write</InlineCode></Fragment>,
              "Method: POST, Content-Type: application/json",
              <Fragment key="f25">Header: <InlineCode>X-API-Key: YOUR_API_KEY</InlineCode></Fragment>,
            ]}
          />
          <CodeBlock lang="JSON" code={BUCKETS_JSON_EXAMPLE} />
          <InfoBox color="purple" icon={<Info size={20} />} title="Finding your Bucket ID & Name">
            Open the bucket&apos;s detail page and tap the info icon. Both values are copyable with a single tap.
          </InfoBox>
        </DocCard>

        <DocCard icon={<ClipboardCheck size={24} />} title="Other features">
          <p>
            Agents, matchers, inspectors, fillers, signals, subjects and Nets are started the same
            way: an HTTP request with the <InlineCode>X-API-Key</InlineCode> header. Switch to the{" "}
            <strong>Code</strong> tab for each endpoint&apos;s fields.
          </p>
        </DocCard>
      </div>

      <Related
        links={[
          {
            href: "/docs/webhooks",
            label: "Receive results with webhooks",
            description: "The payload Tavnit posts when a run completes, and how to build a receiver.",
          },
          {
            href: "/docs/credits",
            label: "How credits are charged",
            description: "What each kind of work costs and what happens when the balance runs out.",
          },
          {
            href: "/docs/mcp-connector",
            label: "Connect an AI assistant with the MCP connector",
            description: "Use Tavnit from claude.ai, Cursor or another MCP client.",
          },
          {
            href: "/docs/user-roles",
            label: "User roles and permissions",
            description: "Why a HITL Only key can review but not process.",
          },
        ]}
      />
    </section>
  );
}
