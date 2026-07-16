import Link from "next/link";
import { ArrowRight, Zap, Mail, Code2, Plug } from "lucide-react";
import { DocPage } from "./DocumentShell";

/* Closing page of the document — the final call to action, typeset as the
   last leaf of the whitepaper: an eyebrow, the headline, a lead paragraph,
   the two primary actions set as document buttons, and the integration strip
   redrawn as a row of meta chips. Same copy as the spreadsheet's FinalCTA. */

const integrations = [
  { Icon: Code2, label: "REST API" },
  { Icon: Mail, label: "Email Triggers" },
  { Icon: Zap, label: "Webhooks" },
  { Icon: Plug, label: "MCP Connector" },
];

export default function DocFinalCTA({ n, of }: { n: number; of: number }) {
  return (
    <DocPage id="get-started" n={n} of={of} ariaLabelledby="doc-cta-heading">
      <div className="doc-eyebrow">Get started</div>

      <h2 id="doc-cta-heading">Stop Re-Typing. Start Automating.</h2>

      <p className="doc-lead">
        Create your first extraction flow in minutes. Upload a document and
        watch structured data appear — cleaned, reviewed, and ready to act.
      </p>

      <div
        style={{ display: "flex", gap: 12, flexWrap: "wrap", margin: "22px 0 6px" }}
      >
        <Link
          href="https://app.tavnit.io"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#FFC53D] text-[#0E1C2B] rounded-lg text-[15px] font-bold shadow-[0_2px_0_#B9820A] hover:brightness-105 transition-all no-underline"
        >
          Get Started Free
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
        <Link
          href="/docs"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#1B2E44] rounded-lg text-[15px] font-medium shadow-[inset_0_0_0_1px_#C9CFD8] hover:bg-[#FFF6DE] hover:text-[#0E1C2B] transition-all no-underline"
        >
          View Documentation
        </Link>
      </div>

      <hr />

      <p>
        Once your data is out, it flows wherever your team already works —
        Tavnit connects through a REST API, inbound email, outbound webhooks,
        and an MCP connector.
      </p>

      <div className="doc-meta">
        {integrations.map(({ Icon, label }) => (
          <span key={label} className="doc-chip inline-flex items-center gap-1.5">
            <Icon size={13} className="text-[#B9820A]" aria-hidden="true" />
            {label}
          </span>
        ))}
      </div>
    </DocPage>
  );
}
