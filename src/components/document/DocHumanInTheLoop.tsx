import {
  ClipboardCheck,
  BellRing,
  PencilLine,
  SlidersHorizontal,
  History,
  Check,
  X,
  LucideIcon,
} from "lucide-react";
import { DocPage } from "./DocumentShell";

/* Human-in-the-loop section, typeset as a printed review-controls brief: the
   "Human in the Loop" eyebrow, the headline (keeping the gold "final say"),
   the plain-language deck, the four review guarantees as headed prose blocks,
   then a figure that documents a real review screen — the editable run, its
   approve/reject actions, and the append-only audit trail — drawn from the
   spreadsheet's demo copy. Same strings as the spreadsheet section. */

type Highlight = { icon: LucideIcon; title: string; desc: string };

const highlights: Highlight[] = [
  {
    icon: BellRing,
    title: "Named reviewers",
    desc: "Assign reviewers per flow — they get an email the moment a run needs eyes.",
  },
  {
    icon: PencilLine,
    title: "Edit in place",
    desc: "Correct cells, add rows, or fix columns right in the review screen — no re-processing.",
  },
  {
    icon: SlidersHorizontal,
    title: "Review only what needs it",
    desc: "Pause every run, or let Cleaner rules trigger review only when a value looks off.",
  },
  {
    icon: History,
    title: "Append-only audit trail",
    desc: "Every view, edit, approval, and rejection is recorded permanently. Nothing changes silently.",
  },
];

/* The audit trail, from the live review demo: each event with the moment it
   was recorded. `edit`/`approved` tint the marker in the document figure. */
const auditEvents: { label: string; time: string; edit?: boolean; approved?: boolean }[] = [
  { label: "Reviewer notified", time: "09:41" },
  { label: "Maria opened the run", time: "09:52" },
  { label: "Cell edited · total_amount", time: "09:53", edit: true },
  { label: "Approved by Maria", time: "09:54", approved: true },
];

export default function DocHumanInTheLoop({ n, of }: { n: number; of: number }) {
  return (
    <DocPage id="human-in-the-loop" n={n} of={of} ariaLabelledby="doc-hitl-heading">
      <div
        className="doc-eyebrow inline-flex items-center gap-2"
        style={{ display: "inline-flex" }}
      >
        <ClipboardCheck size={13} aria-hidden="true" />
        Human in the Loop
      </div>

      <h2 id="doc-hitl-heading">
        AI does the work.
        <br />
        Your team has the <span className="gradient-text">final say</span>.
      </h2>

      <p className="doc-lead">
        Turn on review for any flow and runs pause before anything moves
        downstream. Reviewers fix mistakes in place and approve with one
        click — with a complete record of who did what.
      </p>

      {/* The four review guarantees, set as headed prose blocks */}
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

      {/* Figure — a documented review screen, from the live demo */}
      <figure className="doc-figure" style={{ margin: "22px 0" }}>
        <div className="doc-figure-body">
          {/* Run header */}
          <div
            className="flex items-center justify-between"
            style={{ gap: 12, marginBottom: 14, flexWrap: "wrap" }}
          >
            <div>
              <div style={{ fontWeight: 700, color: "var(--ink)" }}>Invoice_2043.pdf</div>
              <div
                className="font-mono"
                style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}
              >
                Run #4128 · Flow: Supplier invoices
              </div>
            </div>
            <span
              className="font-mono inline-flex items-center"
              style={{
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontWeight: 700,
                color: "#B9820A",
                background: "var(--gold-wash)",
                border: "1px solid rgba(255,197,61,0.5)",
                borderRadius: 4,
                padding: "4px 10px",
              }}
            >
              Awaiting approval
            </span>
          </div>

          {/* Editable run — the corrected Total shown as a tracked change */}
          <table className="doc-table" style={{ margin: "0 0 14px" }}>
            <thead>
              <tr>
                <th>Vendor</th>
                <th>Invoice #</th>
                <th style={{ width: "34%" }}>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Acme Corp</td>
                <td className="font-mono">INV-2043</td>
                <td className="doc-td-num">
                  <span style={{ color: "var(--muted)", textDecoration: "line-through", marginRight: 8 }}>
                    1,240.00
                  </span>
                  <span style={{ color: "#0C6B4C", fontWeight: 700 }}>1,420.00</span>
                </td>
              </tr>
              <tr>
                <td>Acme Corp</td>
                <td className="font-mono">INV-2044</td>
                <td className="doc-td-num">380.50</td>
              </tr>
            </tbody>
          </table>

          {/* Actions — documented, non-interactive */}
          <div className="flex" style={{ gap: 10, marginBottom: 16 }} aria-hidden="true">
            <span
              className="inline-flex items-center justify-center"
              style={{
                gap: 6,
                flex: 1,
                padding: "8px 0",
                borderRadius: 6,
                background: "#17A67B",
                color: "#fff",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              <Check size={14} />
              Approve run
            </span>
            <span
              className="inline-flex items-center justify-center"
              style={{
                gap: 6,
                padding: "8px 18px",
                borderRadius: 6,
                background: "#fff",
                border: "1px solid rgba(180,83,14,0.4)",
                color: "#B4530E",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              <X size={14} />
              Reject
            </span>
          </div>

          {/* Audit trail */}
          <div
            className="font-mono"
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: 8,
            }}
          >
            Audit trail · append-only
          </div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {auditEvents.map((e) => (
              <li
                key={e.label}
                className="flex items-center"
                style={{
                  gap: 10,
                  padding: "6px 0",
                  borderTop: "1px solid var(--grid)",
                  fontSize: 13.5,
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    flexShrink: 0,
                    background: e.approved ? "#17A67B" : e.edit ? "#FFC53D" : "#C9CFD8",
                  }}
                />
                <span
                  style={{
                    color: e.approved ? "#0C6B4C" : "var(--ink-soft)",
                    fontWeight: e.approved ? 600 : 400,
                  }}
                >
                  {e.label}
                </span>
                <span className="font-mono" style={{ marginLeft: "auto", color: "var(--muted)" }}>
                  {e.time}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <figcaption className="doc-figcaption">
          Figure — A paused run awaiting approval: the corrected Total, the approve/reject
          actions, and the append-only audit trail.
        </figcaption>
      </figure>

      <div className="doc-note">
        Because the trail is append-only, a corrected value never erases what came before —
        every edit, approval, and rejection stays permanently attached to the run it belongs to.
      </div>
    </DocPage>
  );
}
