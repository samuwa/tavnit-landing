"use client";

import { ReactNode } from "react";
import Image from "next/image";
import { Search, ZoomIn, ZoomOut, Download, Zap, PanelLeft } from "lucide-react";
import { useViewMode } from "../view/ViewModeProvider";

/* PDF-reader chrome: a fixed toolbar (filename, page count, zoom, download,
   and the gold "Extract to spreadsheet" action), a gray reader canvas, and the
   centered stack of white paper pages passed as children. */

export function DocToolbar({ pages }: { pages: number }) {
  return (
    <div className="doc-toolbar">
      <div className="doc-toolbar-left">
        <button className="doc-tool-btn doc-tool-icon" aria-label="Outline">
          <PanelLeft size={16} />
        </button>
        <Image
          src="/assets/tavnit_logo.png"
          alt="Tavnit"
          width={160}
          height={55}
          className="h-6 w-auto ml-1 opacity-90 [filter:brightness(0)_invert(1)]"
          priority
        />
        <span className="doc-filename">tavnit-overview.pdf</span>
      </div>

      <div className="doc-toolbar-center">
        <button className="doc-tool-btn doc-tool-icon" aria-label="Zoom out">
          <ZoomOut size={15} />
        </button>
        <span className="doc-pagecount">1 / {pages}</span>
        <button className="doc-tool-btn doc-tool-icon" aria-label="Zoom in">
          <ZoomIn size={15} />
        </button>
        <button className="doc-tool-btn doc-tool-icon" aria-label="Find">
          <Search size={15} />
        </button>
      </div>

      <div className="doc-toolbar-right">
        <button className="doc-tool-btn doc-tool-icon" aria-label="Download">
          <Download size={15} />
        </button>
      </div>
    </div>
  );
}

/* Prominent floating action — the primary way to extract the document into the
   spreadsheet. Sits in the right gutter next to the pages and follows scroll. */
export function DocExtractFab() {
  const { toggle } = useViewMode();
  return (
    <button className="doc-fab" onClick={toggle}>
      <Zap size={18} />
      <span>Extract to spreadsheet</span>
    </button>
  );
}

export function DocumentCanvas({ pages, children }: { pages: number; children: ReactNode }) {
  return (
    <div className="doc-canvas">
      <DocToolbar pages={pages} />
      <div className="doc-scroll">{children}</div>
      <DocExtractFab />
    </div>
  );
}

/* One sheet of paper. `n`/`of` render the page-number footer. */
export function DocPage({
  id,
  n,
  of,
  children,
  ariaLabelledby,
  className = "",
}: {
  id?: string;
  n: number;
  of: number;
  children: ReactNode;
  ariaLabelledby?: string;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={ariaLabelledby} className={"doc-page " + className}>
      <div className="doc">{children}</div>
      <div className="doc-pagefoot">
        <span>Tavnit — Document Data Platform</span>
        <span>
          Page {n} of {of}
        </span>
      </div>
    </section>
  );
}
