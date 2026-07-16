import {
  AlertCircle,
  AlertTriangle,
  Shield,
  Zap,
  Target,
  Eye,
  LucideIcon,
} from "lucide-react";
import { DocPage } from "./DocumentShell";

/* Problem section, typeset as a printed comparison sheet: each documented
   pain point on the left, its Tavnit resolution on the right. Same copy as the
   spreadsheet's problem/solution cards — laid out as a whitepaper table. */

type Entry = { Icon: LucideIcon; title: string; description: string };

const pairs: { problem: Entry; solution: Entry }[] = [
  {
    problem: {
      Icon: AlertCircle,
      title: "Hours lost to manual data entry",
      description:
        "Your team re-types the same fields from PDFs into spreadsheets — every day, across dozens of document types",
    },
    solution: {
      Icon: Zap,
      title: "Instant automated extraction",
      description:
        "Tavnit extracts structured data from any document in seconds — no templates, no manual work",
    },
  },
  {
    problem: {
      Icon: AlertTriangle,
      title: "Errors multiply at scale",
      description:
        "One typo in an invoice number cascades downstream. Different formats, handwriting, and layouts make mistakes inevitable",
    },
    solution: {
      Icon: Target,
      title: "99.9% accuracy, every time",
      description:
        "AI-powered validation catches errors before they propagate. Consistent output regardless of input format",
    },
  },
  {
    problem: {
      Icon: Shield,
      title: "No visibility or control",
      description:
        "No audit trail, no approval workflow, no way to know if extracted data was reviewed or who handled it",
    },
    solution: {
      Icon: Eye,
      title: "Human review, fully audited",
      description:
        "Pause any run for review. Assigned reviewers correct and approve results before delivery — every edit recorded in an append-only audit trail",
    },
  },
];

function CellBody({ entry, tone }: { entry: Entry; tone: "problem" | "solution" }) {
  const { Icon, title, description } = entry;
  const color = tone === "problem" ? "#B4530E" : "#17A67B";
  const titleColor = tone === "problem" ? "#0E1C2B" : "#0C6B4C";
  return (
    <span style={{ display: "flex", gap: 9, alignItems: "flex-start" }}>
      <Icon
        size={16}
        strokeWidth={1.75}
        aria-hidden="true"
        style={{ color, flexShrink: 0, marginTop: 2 }}
      />
      <span>
        <strong style={{ display: "block", marginBottom: 3, color: titleColor }}>
          {title}
        </strong>
        <span style={{ color: "#4A5563" }}>{description}</span>
      </span>
    </span>
  );
}

export default function DocProblem({ n, of }: { n: number; of: number }) {
  return (
    <DocPage id="problem" n={n} of={of} ariaLabelledby="doc-problem-heading">
      <div className="doc-eyebrow">The problem</div>

      <h2 id="doc-problem-heading">Still Manually Extracting Data from Documents?</h2>

      <p className="doc-lead">
        Manual document processing quietly drains hours, multiplies errors, and leaves
        teams without oversight. The comparison below pairs each pain point with how
        Tavnit resolves it.
      </p>

      <table className="doc-table">
        <thead>
          <tr>
            <th style={{ width: "50%" }}>The problem</th>
            <th style={{ width: "50%" }}>With Tavnit</th>
          </tr>
        </thead>
        <tbody>
          {pairs.map((pair, i) => (
            <tr key={i}>
              <td>
                <CellBody entry={pair.problem} tone="problem" />
              </td>
              <td>
                <CellBody entry={pair.solution} tone="solution" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="doc-note">
        Every problem on the left maps to a capability on the right — no templates to
        build, and an append-only audit trail behind every result.
      </div>
    </DocPage>
  );
}
