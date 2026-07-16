"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { DocPage } from "./DocumentShell";

/* Cover page of the document. Same hero copy, presented as a title page. */
export default function DocHero({ n, of }: { n: number; of: number }) {
  return (
    <DocPage id="hero" n={n} of={of} ariaLabelledby="hero-heading" className="doc-cover">
      <div className="doc-eyebrow">Tavnit.io — document data pipeline</div>

      <h1 id="hero-heading" className="doc-cover-title">
        Documents to <span className="gradient-text">Structured Data</span>
        <span className="sr-only"> — AI-Powered PDF Extraction In Seconds</span>
      </h1>

      <p className="doc-lead" style={{ marginBottom: 22 }}>
        <span aria-hidden="true">... In Seconds. </span>
        Extract, clean, and store data from any document — then review it with your team and
        let AI agents act on it. No code required.
      </p>

      <div className="doc-callout">
        <div className="doc-callout-k">Try it — it is actually real</div>
        <p style={{ margin: 0 }}>
          Hit <strong>Extract to spreadsheet</strong> in the toolbar above and watch this
          document turn into structured, cleaned rows — the whole point of Tavnit.
        </p>
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", margin: "22px 0 6px" }}>
        <Link
          href="https://app.tavnit.io"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#FFC53D] text-[#0E1C2B] rounded-lg text-[15px] font-bold shadow-[0_2px_0_#B9820A] hover:brightness-105 transition-all no-underline"
        >
          Start Free Trial
          <ArrowRight size={18} />
        </Link>
        <Link
          href="#how-it-works"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#1B2E44] rounded-lg text-[15px] font-medium shadow-[inset_0_0_0_1px_#C9CFD8] hover:bg-[#FFF6DE] transition-all no-underline"
        >
          See How It Works
        </Link>
      </div>

      <div className="doc-meta">
        <span className="doc-chip inline-flex items-center gap-1.5">
          <CheckCircle2 size={13} className="text-[#17A67B]" /> Free credits to start
        </span>
        <span className="doc-chip inline-flex items-center gap-1.5">
          <CheckCircle2 size={13} className="text-[#17A67B]" /> 100,000+ documents processed
        </span>
        <span className="doc-chip inline-flex items-center gap-1.5">
          <CheckCircle2 size={13} className="text-[#17A67B]" /> Setup in under 5 minutes
        </span>
      </div>
    </DocPage>
  );
}
