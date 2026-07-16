import Link from "next/link";
import {
  Plug,
  Code2,
  Mail,
  Zap,
  FileText,
  Send,
  Link2,
  ArrowRight,
} from "lucide-react";
import { DocPage } from "./DocumentShell";

/* Integrations section, typeset as a printed reference page: the eyebrow +
   heading + deck, a short table-of-contents chip row, then the four integration
   methods (REST API, Email, Webhooks, MCP) each set as a headed prose block with
   its own steps, endpoints table, code figure, and tag chips. The interactive
   selector rail + swipable mobile cards are re-drawn as static document prose.
   Same copy as the spreadsheet's Integrations section. */

const mono = { fontFamily: "var(--font-mono)" } as const;

const label = {
  ...mono,
  fontSize: 10.5,
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  color: "var(--muted)",
  margin: "18px 0 6px",
  fontWeight: 700,
};

/* POST endpoints exposed by the API. */
const apiEndpoints = [
  { path: "/runs/process", desc: "Extract a document with a flow" },
  { path: "/collections/process", desc: "Auto-route mixed documents" },
  { path: "/splits/run", desc: "Split multi-document PDFs" },
  { path: "/buckets/write", desc: "Write up to 50,000 rows" },
];

const apiTags = [
  "API key auth",
  "Multipart / JSON",
  "Python & JS examples",
  "Zapier · Make · n8n",
  "Real-time",
  "Python & JS SDKs",
];

const emailTriggerSteps = [
  "Enable Email Trigger on your flow",
  "Copy your flow's unique email address",
  "Forward PDFs/images as attachments",
];
const emailOutputSteps = [
  "Configure recipient email in flow settings",
  "Receive JSON results automatically",
];
const attachments = [".pdf", ".png", ".jpg", ".tiff", ".webp", "+ more"];
const emailTags = [
  "Unique address per flow",
  "Works with Collections",
  "One run per attachment",
  "Auto replies",
  "Unique email per flow",
  "Mixed doc routing",
];

const webhookFlow = [
  { Icon: FileText, label: "Document processed" },
  { Icon: Send, label: "Tavnit sends POST" },
  { Icon: Link2, label: "Your URL receives data" },
];
const webhookTags = [
  "Fires on completion",
  "JSON results",
  "Automatic retry",
  "Make & Zapier triggers",
  "Auto notifications",
  "Make & Zapier",
];

const mcpConnectSteps = [
  "Generate a connector URL in Integrations",
  "Paste it into claude.ai, Cursor, or any MCP client",
  "Ask your assistant to run flows and query your data",
];
const mcpAssistantSteps = [
  "Process documents through your flows",
  "Read and search your Buckets",
];
const mcpPrompts = [
  "“Run this invoice through my Supplier Invoices flow”",
  "“What did we pay Acme Corp last quarter?”",
];
const mcpTags = [
  "claude.ai (Pro+)",
  "Cursor",
  "Any MCP client",
  "Org-scoped access",
];

const curlExample = `curl -X POST /api/runs/process \\
  -H "X-API-Key: YOUR_KEY" \\
  -F "file=@invoice.pdf" \\
  -F "flow_id=YOUR_FLOW_ID"`;

const payloadExample = `{
  "vendor": "Acme Corp",
  "invoice_number": "INV-2043",
  "total": "1,420.00",
  "run_id": "4127a3f8-…",
  "flow_id": "9b2e51c0-…"
}`;

const codeClass =
  "bg-[#0E1C2B] text-[#EAF0F7] font-mono text-[12.5px] leading-relaxed p-4 overflow-x-auto m-0";
const cardLink =
  "inline-flex items-center gap-2 font-semibold text-[#B9820A] no-underline hover:text-[#0E1C2B] transition-colors";

function MethodHead({
  Icon,
  title,
  subtitle,
}: {
  Icon: typeof Code2;
  title: string;
  subtitle: string;
}) {
  return (
    <>
      <h3 style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 2 }}>
        <span
          className="rounded-lg bg-[#FFF6DE] border border-[#FFC53D]/50 flex items-center justify-center shrink-0"
          style={{ width: 38, height: 38 }}
          aria-hidden="true"
        >
          <Icon size={19} className="text-[#B9820A]" />
        </span>
        <strong>{title}</strong>
      </h3>
      <p style={{ ...mono, fontSize: 12.5, color: "var(--muted)", margin: "0 0 12px", letterSpacing: "0.03em" }}>
        {subtitle}
      </p>
    </>
  );
}

export default function DocIntegrations({ n, of }: { n: number; of: number }) {
  return (
    <DocPage id="integrations" n={n} of={of} ariaLabelledby="doc-integrations-heading">
      <div className="doc-eyebrow" style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <Plug size={13} aria-hidden="true" />
        Integrations
      </div>

      <h2 id="doc-integrations-heading">Multiple Ways to Integrate</h2>

      <p className="doc-lead">Choose the integration method that fits your workflow</p>

      <p>
        Tavnit connects to your systems four ways — a REST API, email, webhooks,
        and an MCP connector. Each carries the same extracted, cleaned data out of
        Tavnit and into wherever you work, so pick the one that fits how your team
        already operates.
      </p>

      {/* Table of contents for the methods */}
      <div className="doc-meta">
        <span className="doc-chip">REST API</span>
        <span className="doc-chip">Email Integration</span>
        <span className="doc-chip">Webhooks</span>
        <span className="doc-chip">MCP Connector</span>
      </div>

      <hr />

      {/* ── REST API ── */}
      <MethodHead Icon={Code2} title="REST API" subtitle="Full programmatic control" />

      <p style={{ margin: "0 0 4px" }}>
        Drive the whole pipeline from your own code. Send a document to a flow and
        get structured fields back.
      </p>

      <figure className="doc-figure">
        <pre className={codeClass}>
          <code>{curlExample}</code>
        </pre>
        <figcaption className="doc-figcaption">Figure — cURL · Quick Example</figcaption>
      </figure>

      <div style={label}>More Endpoints</div>
      <table className="doc-table" style={{ marginTop: 6 }}>
        <thead>
          <tr>
            <th>Method</th>
            <th>Endpoint</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {apiEndpoints.map((e) => (
            <tr key={e.path}>
              <td style={{ ...mono, fontWeight: 700, color: "var(--gold-deep)" }}>POST</td>
              <td style={mono}>{e.path}</td>
              <td>{e.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="doc-meta">
        {apiTags.map((t) => (
          <span key={t} className="doc-chip">
            {t}
          </span>
        ))}
      </div>

      <p style={{ marginTop: 12 }}>
        <Link href="/docs#api-integration" className={cardLink}>
          View API Docs
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </p>

      <hr />

      {/* ── Email Integration ── */}
      <MethodHead Icon={Mail} title="Email Integration" subtitle="Send & receive via email" />

      <div style={label}>Email Trigger</div>
      <ol style={{ marginTop: 0 }}>
        {emailTriggerSteps.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>

      <div style={label}>Email Output</div>
      <ul style={{ marginTop: 0 }}>
        {emailOutputSteps.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>

      <div style={label}>Accepted Attachments</div>
      <div className="doc-meta" style={{ marginTop: 2 }}>
        {attachments.map((ext) => (
          <span key={ext} className="doc-chip">
            {ext}
          </span>
        ))}
      </div>

      <p style={{ marginTop: 12 }}>
        Each attachment becomes its own run — forward a batch and get one result per
        document. Collections and Splitters have email addresses too, so mixed
        documents route themselves.
      </p>

      <div className="doc-meta">
        {emailTags.map((t) => (
          <span key={t} className="doc-chip">
            {t}
          </span>
        ))}
      </div>

      <p style={{ marginTop: 12 }}>
        <Link href="/docs#email-integration" className={cardLink}>
          Setup Email
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </p>

      <hr />

      {/* ── Webhooks ── */}
      <MethodHead Icon={Zap} title="Webhooks" subtitle="Real-time notifications" />

      <p style={{ margin: "0 0 6px" }}>
        When a run completes, Tavnit pushes the result straight to your endpoint:
      </p>
      <ol style={{ marginTop: 0 }}>
        {webhookFlow.map((step) => (
          <li key={step.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <step.Icon size={15} className="text-[#B9820A]" aria-hidden="true" />
            <span>{step.label}</span>
          </li>
        ))}
      </ol>

      <figure className="doc-figure">
        <pre className={codeClass}>
          <code>{payloadExample}</code>
        </pre>
        <figcaption className="doc-figcaption">Figure — Payload · Sent to your URL</figcaption>
      </figure>

      <p>
        Your extracted fields arrive at the top level, alongside the run and flow
        IDs. Set the URL in your flow&apos;s settings — deliveries retry
        automatically on transient connection failures.
      </p>

      <div className="doc-note">Configure webhook URL in flow settings</div>

      <div className="doc-meta">
        {webhookTags.map((t) => (
          <span key={t} className="doc-chip">
            {t}
          </span>
        ))}
      </div>

      <p style={{ marginTop: 12 }}>
        <Link href="/docs#webhooks" className={cardLink}>
          Configure Webhooks
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </p>

      <hr />

      {/* ── MCP Connector ── */}
      <MethodHead Icon={Plug} title="MCP Connector" subtitle="Your AI assistant, connected" />

      <div style={label}>Connect in Minutes</div>
      <ol style={{ marginTop: 0 }}>
        {mcpConnectSteps.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>

      <div style={label}>What Your Assistant Can Do</div>
      <ul style={{ marginTop: 0 }}>
        {mcpAssistantSteps.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>

      <div style={label}>Try Asking</div>
      {mcpPrompts.map((p) => (
        <blockquote key={p} className="doc-quote">
          {p}
        </blockquote>
      ))}

      <div className="doc-meta">
        {mcpTags.map((t) => (
          <span key={t} className="doc-chip">
            {t}
          </span>
        ))}
      </div>

      <p style={{ marginTop: 12 }}>
        <Link href="/docs#mcp-connector" className={cardLink}>
          Connect Your Assistant
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </p>
    </DocPage>
  );
}
