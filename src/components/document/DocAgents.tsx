import Link from "next/link";
import {
  Bot,
  GitBranch,
  MonitorPlay,
  PackageCheck,
  ArrowRight,
  LucideIcon,
} from "lucide-react";
import { DocPage } from "./DocumentShell";

/* Agents section, typeset as a printed capabilities brief: the "New · Agents"
   eyebrow, the headline (keeping the gold "acts" word), the plain-language
   deck, the three agent highlights as headed prose blocks, then a figure that
   documents a live agent browser session — its step log and typed output —
   drawn from the spreadsheet's demo copy. Closes on the create-agent CTA. */

type Highlight = { icon: LucideIcon; title: string; desc: string };

const highlights: Highlight[] = [
  {
    icon: GitBranch,
    title: "Chain to any flow",
    desc: "A finished extraction can launch an agent automatically, feeding extracted fields in as inputs.",
  },
  {
    icon: MonitorPlay,
    title: "Watch it work, live",
    desc: "Every run streams a live view of the browser session — follow each step as it happens.",
  },
  {
    icon: PackageCheck,
    title: "Typed results, delivered",
    desc: "Agents return data that matches your schema, delivered by email, webhook, or straight into a Bucket.",
  },
];

/* The agent's real tools, mirrored from the live demo: goto, observe, fill,
   click, capture — each with the action it performed on the supplier portal. */
const agentSteps: { verb: string; detail: string }[] = [
  { verb: "goto", detail: "portal.acme-suppliers.com" },
  { verb: "observe", detail: "search form · 12 elements found" },
  { verb: "fill", detail: 'Part number → "PN-4471"' },
  { verb: "click", detail: '"Search"' },
  { verb: "capture", detail: "unit_price, lead_time_days" },
];

export default function DocAgents({ n, of }: { n: number; of: number }) {
  return (
    <DocPage id="agents" n={n} of={of} ariaLabelledby="doc-agents-heading">
      <div
        className="doc-eyebrow inline-flex items-center gap-2"
        style={{ display: "inline-flex" }}
      >
        <Bot size={13} aria-hidden="true" />
        New · Agents
      </div>

      <h2 id="doc-agents-heading">
        Extraction was step one.
        <br />
        Now your data <span className="gradient-text">acts</span>.
      </h2>

      <p className="doc-lead">
        Describe a mission in plain language. A Tavnit Agent opens a real
        browser, works through the website, and brings back structured results —
        no scripts, no scrapers to maintain.
      </p>

      {/* The three agent highlights, set as headed prose blocks */}
      <div style={{ margin: "24px 0 8px" }}>
        {highlights.map((h) => (
          <div key={h.title} style={{ display: "flex", gap: 14, marginBottom: 18 }}>
            <div
              className="flex items-center justify-center flex-shrink-0"
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                background: "var(--gold-wash)",
                border: "1px solid rgba(255,197,61,0.5)",
                color: "#B9820A",
              }}
              aria-hidden="true"
            >
              <h.icon size={18} />
            </div>
            <div>
              <h3 style={{ marginTop: 3, marginBottom: 4 }}>
                <strong>{h.title}</strong>
              </h3>
              <p style={{ margin: 0 }}>{h.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Figure — a documented agent browser session (from the live demo) */}
      <figure className="doc-figure" style={{ margin: "22px 0" }}>
        <div className="doc-figure-body">
          <div className="doc-meta" style={{ margin: "0 0 14px" }}>
            <span className="doc-chip">portal.acme-suppliers.com/parts</span>
            <span className="doc-chip inline-flex items-center gap-1.5">
              <span
                aria-hidden="true"
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#17A67B",
                  display: "inline-block",
                }}
              />
              Live
            </span>
          </div>

          <table className="doc-table" style={{ margin: "0 0 16px" }}>
            <thead>
              <tr>
                <th style={{ width: "26%" }}>Agent steps</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {agentSteps.map((s) => (
                <tr key={s.verb}>
                  <td className="font-mono" style={{ color: "#B9820A", fontWeight: 700 }}>
                    {s.verb}
                  </td>
                  <td className="font-mono">{s.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div
            className="flex items-center justify-between"
            style={{
              border: "1px solid var(--grid-strong)",
              borderRadius: 6,
              padding: "9px 12px",
              marginBottom: 16,
            }}
          >
            <span className="font-mono" style={{ fontSize: 13 }}>
              PN-4471 · Hex bolt M8
            </span>
            <span className="font-mono" style={{ fontSize: 13, color: "#0C6B4C" }}>
              $12.40 · 5 days
            </span>
          </div>

          <div
            className="flex items-center justify-between"
            style={{ marginBottom: 8 }}
          >
            <span
              className="font-mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--ink-soft)",
              }}
            >
              Structured output
            </span>
            <span
              className="font-mono"
              style={{ fontSize: 12, fontWeight: 600, color: "#0C6B4C" }}
            >
              → delivered to Bucket
            </span>
          </div>

          <pre className="bg-[#0E1C2B] text-[#EAF0F7] font-mono text-[13px] leading-relaxed p-4 rounded-md overflow-x-auto m-0">
            <code>{'{ "part": "PN-4471", "unit_price": 12.40, "lead_time_days": 5 }'}</code>
          </pre>
        </div>
        <figcaption className="doc-figcaption">
          Figure — A Tavnit Agent working a supplier portal, from goto to typed output.
        </figcaption>
      </figure>

      <div className="doc-callout">
        <div className="doc-callout-k">Get started</div>
        <p style={{ margin: "0 0 12px" }}>
          Point an agent at a mission and let it bring back structured results.
        </p>
        <Link
          href="https://app.tavnit.io"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#FFC53D] text-[#0E1C2B] rounded-lg text-[15px] font-bold shadow-[0_2px_0_#B9820A] hover:brightness-105 transition-all no-underline"
        >
          Create your first agent
          <ArrowRight size={18} />
        </Link>
      </div>
    </DocPage>
  );
}
