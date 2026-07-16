import { CheckCircle2, ArrowRight } from "lucide-react";
import { DocPage } from "./DocumentShell";

/* Use Cases section, typeset as a printed "field guide" to real-world
   workflows. Same copy as the spreadsheet's use-case panels: the heading and
   deck, an index of the four workflows, then each workflow as a numbered
   subsection — industry chip, title, The Problem / The Solution prose, and the
   result as a jade success note. No tabs, no live demos: a static document. */

type UseCase = {
  id: string;
  tab: string;
  badge: string;
  title: string;
  problem: string;
  solution: string;
  result: string;
};

const useCases: UseCase[] = [
  {
    id: "invoice",
    tab: "Invoice Processing",
    badge: "Finance Teams",
    title: "Invoice Processing",
    problem:
      "Processing 100+ invoices monthly means hours of manual data entry, prone to errors and delays.",
    solution:
      "Extract vendor, invoice number, date, line items → cleaned and categorized automatically → stored in a searchable Bucket",
    result: "90% time savings, zero data entry errors",
  },
  {
    id: "contract",
    tab: "Contract Analysis",
    badge: "Legal & Procurement",
    title: "Contract Analysis",
    problem:
      "Reviewing contract terms across thousands of documents is time-consuming and error-prone.",
    solution:
      "Extract key terms, parties, dates, obligations → stored in Buckets with visual dashboards",
    result: "Query entire contract portfolio in seconds",
  },
  {
    id: "form",
    tab: "Resume Screening",
    badge: "HR & Recruiting",
    title: "Resume Screening",
    problem:
      "Manually reviewing hundreds of resumes wastes valuable time and creates inconsistencies.",
    solution:
      "Extract candidate name, skills, experience, education → AI-powered skill categorization via Cleaners → structured database",
    result: "Screen 100+ resumes in minutes with consistent criteria",
  },
  {
    id: "expense",
    tab: "Expense Reports",
    badge: "Finance & Employees",
    title: "Expense Report Processing",
    problem:
      "Collecting receipts and categorizing expenses is tedious and delays reimbursements.",
    solution:
      "Upload receipts → extract merchant, amount, category → auto-categorized by Cleaners, stored in Buckets",
    result: "Expense reports in minutes, not hours",
  },
];

const kicker = {
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--ink-soft)",
  fontWeight: 700,
  margin: "16px 0 4px",
} as const;

const num = {
  fontFamily: "var(--font-mono)",
  fontSize: 12,
  color: "var(--gold-deep)",
} as const;

export default function DocUseCases({ n, of }: { n: number; of: number }) {
  return (
    <DocPage id="use-cases" n={n} of={of} ariaLabelledby="doc-use-cases-heading">
      <div className="doc-eyebrow">Use cases</div>

      <h2 id="doc-use-cases-heading">Built for Real-World Workflows</h2>

      <p className="doc-lead">
        See how teams use Tavnit to automate document processing
      </p>

      {/* Index of the four workflows covered on this page */}
      <div className="doc-meta">
        {useCases.map((uc) => (
          <span key={uc.id} className="doc-chip">
            {uc.tab}
          </span>
        ))}
      </div>

      {/* Each workflow as a numbered subsection */}
      {useCases.map((uc, i) => (
        <div key={uc.id}>
          {i > 0 && <hr />}

          <div style={{ marginTop: i === 0 ? 20 : 0 }}>
            <span className="doc-chip">{uc.badge}</span>
          </div>

          <h3 style={{ display: "flex", alignItems: "baseline", gap: 9 }}>
            <span style={num}>{String(i + 1).padStart(2, "0")}</span>
            <strong>{uc.title}</strong>
          </h3>

          <div style={kicker}>The Problem</div>
          <p style={{ margin: 0 }}>{uc.problem}</p>

          <div style={kicker} className="inline-flex items-center gap-1.5">
            The Solution
            <ArrowRight size={12} className="text-[#B9820A]" aria-hidden="true" />
          </div>
          <p style={{ margin: 0 }}>{uc.solution}</p>

          <div
            className="doc-note"
            style={{ display: "flex", alignItems: "center", gap: 10 }}
          >
            <CheckCircle2
              size={17}
              className="text-[#17A67B]"
              aria-hidden="true"
              style={{ flexShrink: 0 }}
            />
            <span>{uc.result}</span>
          </div>
        </div>
      ))}
    </DocPage>
  );
}
