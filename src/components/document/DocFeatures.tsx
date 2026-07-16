import {
  Sparkles,
  LayoutGrid,
  GitBranch,
  Lightbulb,
  Bot,
  UserCheck,
  Plug,
  Database,
  Code2,
  Users,
  LucideIcon,
} from "lucide-react";
import { DocPage } from "./DocumentShell";

/* Features section, typeset as a printed capabilities brief: the platform
   heading and deck, the flagship AI Extraction capability set as a lead
   callout, then the remaining capabilities laid out as a two-column list of
   headed prose blocks. Same copy as the spreadsheet's desktop feature cards. */

type Feature = { icon: LucideIcon; title: string; desc: string };

const restFeatures: Feature[] = [
  {
    icon: LayoutGrid,
    title: "Flow Builder",
    desc: "No-code extraction pipelines with field hints, validation, and output mapping.",
  },
  {
    icon: GitBranch,
    title: "Routing & Splitting",
    desc: "Collections auto-route mixed documents to the right flow. Splitters break multi-document PDFs apart first.",
  },
  {
    icon: Lightbulb,
    title: "AI Data Cleaning",
    desc: "Cleaners format, translate, convert currencies and units, calculate fields, match against reference data — even classify HS tariff codes.",
  },
  {
    icon: Bot,
    title: "AI Agents",
    desc: "Browser-automation agents act on extracted data across the web — watch every session live.",
  },
  {
    icon: UserCheck,
    title: "Human in the Loop",
    desc: "Pause runs for review. Edit results in place, approve or reject — every action in an append-only audit trail.",
  },
  {
    icon: Plug,
    title: "MCP Connector",
    desc: "Add Tavnit to claude.ai, Cursor, or any MCP client — your AI assistant can run flows and query your data.",
  },
  {
    icon: Database,
    title: "Buckets & Analytics",
    desc: "Structured tables with charts, filters, CSV/Excel export, and AI-powered semantic search across columns.",
  },
  {
    icon: Code2,
    title: "API, Email & Webhooks",
    desc: "REST API, email triggers, webhook callbacks, PDF form filling, and Zapier/Make compatibility.",
  },
  {
    icon: Users,
    title: "Teams & Roles",
    desc: "Owner, Admin, Member, Viewer roles with org-level permissions and unlimited seats.",
  },
];

export default function DocFeatures({ n, of }: { n: number; of: number }) {
  return (
    <DocPage id="features" n={n} of={of} ariaLabelledby="doc-features-heading">
      <div className="doc-eyebrow">The platform</div>

      <h2 id="doc-features-heading">The Complete Document Automation Platform</h2>

      <p className="doc-lead">
        Extract, clean, review, store, and act — all in one pipeline
      </p>

      {/* Flagship capability — AI Extraction, set as a lead callout */}
      <div className="doc-callout">
        <div className="doc-callout-k">Featured capability</div>
        <h3
          style={{
            marginTop: 0,
            marginBottom: 6,
            display: "flex",
            alignItems: "center",
            gap: 9,
          }}
        >
          <Sparkles size={18} className="text-[#B9820A]" aria-hidden="true" />
          <strong>AI Extraction</strong>
        </h3>
        <p style={{ margin: 0 }}>
          {"Powered by multiple leading AI models to extract tables, metadata, handwriting, and complex layouts from any document. Includes confidence scoring, field-level validation, and support for multi-page and multi-language documents."}
        </p>
      </div>

      {/* Remaining capabilities — two-column list of headed prose blocks */}
      <div className="doc-cols" style={{ marginTop: 24 }}>
        {restFeatures.map((f) => (
          <div key={f.title}>
            <h3
              style={{
                marginTop: 0,
                marginBottom: 5,
                display: "flex",
                alignItems: "center",
                gap: 9,
              }}
            >
              <f.icon size={17} className="text-[#B9820A]" aria-hidden="true" />
              <strong>{f.title}</strong>
            </h3>
            <p style={{ margin: 0 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </DocPage>
  );
}
