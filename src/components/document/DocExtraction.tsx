import Link from "next/link";
import { Sparkles, LayoutGrid, ScanText, Wand2, ArrowRight } from "lucide-react";
import { DocPage } from "./DocumentShell";

/* AI Extraction section, typeset as a printed capabilities page: the eyebrow +
   heading + deck, the three differentiators set as headed prose blocks, and the
   live extraction demo re-drawn as a static "sample run" figure — the same run
   metadata, extracted fields, delivery summary, and export formats the animated
   demo cycles through, frozen onto the page as a table and callouts. Same copy
   as the spreadsheet's Extraction showcase. */

type Highlight = {
  Icon: typeof LayoutGrid;
  title: string;
  desc: string;
};

const highlights: Highlight[] = [
  {
    Icon: LayoutGrid,
    title: "No templates to build",
    desc: "Create a flow by describing what to capture, in plain language. Field hints and validation keep output consistent across layouts.",
  },
  {
    Icon: ScanText,
    title: "Reads what humans read",
    desc: "Multi-page PDFs, photos, scans, handwriting, and mixed languages — powered by multiple leading AI models.",
  },
  {
    Icon: Wand2,
    title: "Cleaned before it lands",
    desc: "Cleaners normalize dates and numbers, translate, convert currencies, and enrich values before anything is stored.",
  },
];

/* The fields the demo lights up, one per step, then cleans in place. */
const fields = [
  { name: "vendor", raw: "ACME CORP LLC.", clean: "Acme Corp", confidence: "99%" },
  { name: "invoice_number", raw: "INV-2043", clean: "INV-2043", confidence: "98%" },
  { name: "date", raw: "03/15/26", clean: "2026-03-15", confidence: "97%" },
  { name: "total", raw: "1.420,00", clean: "1,420.00", confidence: "99%" },
];

const mono = { fontFamily: "var(--font-mono)" } as const;

export default function DocExtraction({ n, of }: { n: number; of: number }) {
  return (
    <DocPage id="extraction" n={n} of={of} ariaLabelledby="doc-extraction-heading">
      <div
        className="doc-eyebrow"
        style={{ display: "flex", alignItems: "center", gap: 7 }}
      >
        <Sparkles size={13} aria-hidden="true" />
        AI Extraction
      </div>

      <h2 id="doc-extraction-heading">
        Any document in.
        <br />
        Clean, <span className="gradient-text">structured data</span> out.
      </h2>

      <p className="doc-lead">
        Tavnit reads your documents the way a person would — then hands
        you validated fields with a confidence score on every value,
        already cleaned and formatted.
      </p>

      {/* The three differentiators, as headed prose blocks */}
      {highlights.map((h) => (
        <div key={h.title} style={{ marginTop: 20 }}>
          <h3
            style={{
              marginTop: 0,
              marginBottom: 5,
              display: "flex",
              alignItems: "center",
              gap: 9,
            }}
          >
            <h.Icon size={18} className="text-[#B9820A]" aria-hidden="true" />
            <strong>{h.title}</strong>
          </h3>
          <p style={{ margin: 0 }}>{h.desc}</p>
        </div>
      ))}

      <hr />

      {/* The live demo, re-drawn as a static sample run */}
      <p>
        A single run makes the point. Below, one supplier invoice is read,
        cleaned, and delivered — the same pass the demo runs on repeat.
      </p>

      <figure className="doc-figure">
        <div className="doc-figure-body">
          {/* Run header — filename, flow, and the states each run moves through */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 14,
              flexWrap: "wrap",
            }}
          >
            <div>
              <strong style={{ fontSize: 15 }}>Invoice_2043.pdf</strong>
              <div
                style={{ ...mono, fontSize: 11.5, color: "var(--muted)", marginTop: 3 }}
              >
                Run #4127 · Flow: Supplier invoices
              </div>
            </div>
            <div className="doc-meta" style={{ margin: 0 }}>
              <span className="doc-chip">Extracting</span>
              <span className="doc-chip">Cleaning</span>
              <span className="doc-chip">Complete</span>
            </div>
          </div>

          {/* Extracted fields — raw values normalized in place, with confidence */}
          <div
            style={{
              ...mono,
              fontSize: 10.5,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--muted)",
              margin: "18px 0 -8px",
            }}
          >
            Extracted fields
          </div>
          <table className="doc-table" style={{ marginBottom: 0 }}>
            <thead>
              <tr>
                <th>Field</th>
                <th>Raw value</th>
                <th>Cleaned value</th>
                <th style={{ textAlign: "right" }}>Confidence</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((f) => (
                <tr key={f.name}>
                  <td style={mono}>{f.name}</td>
                  <td style={mono}>{f.raw}</td>
                  <td style={{ ...mono, color: "var(--jade-deep, #0C6B4C)" }}>
                    {f.clean}
                  </td>
                  <td className="doc-td-num">{f.confidence}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Delivery summary — the finished strip, and its waiting state */}
          <div className="doc-note" style={{ margin: "18px 0 0" }}>
            <strong style={{ color: "inherit" }}>
              ✓ 4 fields · 99% avg confidence → Bucket · Invoices
            </strong>
            <div style={{ marginTop: 4 }}>
              Until the run finishes, the delivery strip reads
              &ldquo;Waiting for extraction…&rdquo;.
            </div>
          </div>

          {/* Export formats offered on the finished bucket */}
          <div
            style={{
              ...mono,
              fontSize: 10.5,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--muted)",
              margin: "16px 0 -8px",
            }}
          >
            Export
          </div>
          <div className="doc-meta">
            <span className="doc-chip">CSV</span>
            <span className="doc-chip">JSON</span>
            <span className="doc-chip">Excel</span>
          </div>
        </div>
        <figcaption className="doc-figcaption">
          Figure — A sample extraction run: raw values in, cleaned fields out.
        </figcaption>
      </figure>

      <p style={{ marginTop: 22 }}>
        <Link
          href="https://app.tavnit.io"
          className="inline-flex items-center gap-2 font-semibold text-[#B9820A] no-underline hover:text-[#0E1C2B] transition-colors"
        >
          Create your first flow
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </p>
    </DocPage>
  );
}
