import { LayoutDashboard, FileSearch, Table2, LucideIcon } from "lucide-react";
import { DocPage } from "./DocumentShell";

/* Platform Overview section, typeset as a printed product-tour page: the
   heading + deck, a short table-of-contents chip row, then the three screens
   of the app — Dashboard, Run Details, Buckets — each set as a headed prose
   block with its own screenshot figure. The live CardSwap gallery is re-drawn
   as static bordered figures whose captions carry each screenshot's label.
   Same copy as the spreadsheet's Platform Overview. */

type Screen = {
  icon: LucideIcon;
  num: string;
  label: string;
  desc: string;
  caption: string;
};

const screens: Screen[] = [
  {
    icon: LayoutDashboard,
    num: "01",
    label: "Dashboard",
    desc: "Track documents, active flows, and recent runs from a single view.",
    caption: "Tavnit Dashboard",
  },
  {
    icon: FileSearch,
    num: "02",
    label: "Run Details",
    desc: "Inspect extracted fields, confidence scores, and export results instantly.",
    caption: "Flow Details - Document Extraction",
  },
  {
    icon: Table2,
    num: "03",
    label: "Buckets",
    desc: "Browse, filter, and export structured data across all documents.",
    caption: "Buckets - Tabulation View",
  },
];

const mono = { fontFamily: "var(--font-mono)" } as const;

export default function DocPlatform({ n, of }: { n: number; of: number }) {
  return (
    <DocPage id="platform-overview" n={n} of={of} ariaLabelledby="doc-platform-heading">
      <div className="doc-eyebrow">Product tour</div>

      <h2 id="doc-platform-heading">Platform Overview</h2>

      <p className="doc-lead">
        From dashboard to extraction to tabulation — see how Tavnit
        streamlines your workflow
      </p>

      <p>
        The tour follows a document along the path it takes through Tavnit —
        from the <strong>Dashboard</strong> where work begins, to the{" "}
        <strong>Run Details</strong> that extract it, to the{" "}
        <strong>Buckets</strong> where the structured result lands. Three
        screens cover the whole journey.
      </p>

      {/* Table of contents for the tour */}
      <div className="doc-meta">
        <span className="doc-chip">Dashboard</span>
        <span className="doc-chip">Run Details</span>
        <span className="doc-chip">Buckets</span>
      </div>

      <hr />

      {/* Each screen — headed prose block + its screenshot, re-drawn as a figure */}
      {screens.map((s, i) => (
        <div key={s.label} style={{ marginTop: i === 0 ? 0 : 30 }}>
          <h3
            style={{
              marginTop: 0,
              marginBottom: 8,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span
              className="rounded-lg bg-[#FFF6DE] border border-[#FFC53D]/50 flex items-center justify-center shrink-0"
              style={{ width: 40, height: 40 }}
              aria-hidden="true"
            >
              <s.icon size={20} className="text-[#B9820A]" />
            </span>
            <span
              style={{ ...mono, fontSize: 12, color: "var(--muted)", letterSpacing: "0.1em" }}
              aria-hidden="true"
            >
              {s.num}
            </span>
            <strong>{s.label}</strong>
          </h3>

          <p style={{ margin: "0 0 12px" }}>{s.desc}</p>

          {/* Screenshot, drawn as a static window figure */}
          <figure className="doc-figure">
            {/* Window chrome — traffic lights + app-area label */}
            <div
              className="flex items-center gap-2 border-b border-[#1B2E44]"
              style={{ background: "#0E1C2B", padding: "8px 12px" }}
            >
              <span className="flex items-center gap-1.5" aria-hidden="true">
                <span style={{ width: 9, height: 9, borderRadius: 999, background: "#E4626B", display: "inline-block" }} />
                <span style={{ width: 9, height: 9, borderRadius: 999, background: "#E7B04A", display: "inline-block" }} />
                <span style={{ width: 9, height: 9, borderRadius: 999, background: "#4FB98A", display: "inline-block" }} />
              </span>
              <span className="flex items-center gap-1.5" style={{ marginLeft: 6 }}>
                <s.icon size={12} className="text-[#9FB0C4]" aria-hidden="true" />
                <span className="text-[11px] font-medium tracking-wide text-[#EAF0F7]">
                  {s.label}
                </span>
              </span>
            </div>

            {/* Screenshot placeholder — faint UI skeleton */}
            <div
              className="doc-figure-body"
              style={{ background: "#FBFCFD", display: "flex", flexDirection: "column", gap: 9 }}
              aria-hidden="true"
            >
              <div style={{ display: "flex", gap: 9 }}>
                <div style={{ width: 74, height: 30, borderRadius: 6, background: "#EEF1F5" }} />
                <div style={{ flex: 1, height: 30, borderRadius: 6, background: "#F3F5F8" }} />
              </div>
              <div style={{ height: 10, width: "82%", borderRadius: 4, background: "#EEF1F5" }} />
              <div style={{ height: 10, width: "68%", borderRadius: 4, background: "#F0F3F6" }} />
              <div style={{ height: 10, width: "74%", borderRadius: 4, background: "#EEF1F5" }} />
              <div style={{ height: 10, width: "54%", borderRadius: 4, background: "#F0F3F6" }} />
            </div>

            <figcaption className="doc-figcaption">
              Figure {i + 1} — {s.caption}
            </figcaption>
          </figure>
        </div>
      ))}
    </DocPage>
  );
}
