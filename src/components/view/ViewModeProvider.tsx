"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

/* The site presents the SAME content two ways:
     - "document": a PDF-style paper document (the raw source)
     - "sheet":    the spreadsheet (the extracted, structured data)
   Toggling runs a scan-line wipe (WipeStage). During the wipe the new mode is
   already the live base; the OLD mode is painted on top and scanned away. */

export type ViewMode = "document" | "sheet";

interface Ctx {
  mode: ViewMode;
  leaving: ViewMode | null; // the mode being scanned away (drives WipeStage)
  toggle: () => void;
  endWipe: () => void;
}

const ViewCtx = createContext<Ctx>({
  mode: "document",
  leaving: null,
  toggle: () => {},
  endWipe: () => {},
});

export function useViewMode() {
  return useContext(ViewCtx);
}

export default function ViewModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ViewMode>("document");
  const [leaving, setLeaving] = useState<ViewMode | null>(null);

  const toggle = useCallback(() => {
    setMode((current) => {
      const next: ViewMode = current === "document" ? "sheet" : "document";
      const reduce =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Re-extract from the top of the page.
      if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "auto" });

      if (!reduce) {
        // Paint the outgoing mode on top and scan it away in one commit.
        setLeaving(current);
      }
      return next;
    });
  }, []);

  const endWipe = useCallback(() => setLeaving(null), []);

  return (
    <ViewCtx.Provider value={{ mode, leaving, toggle, endWipe }}>
      {children}
    </ViewCtx.Provider>
  );
}
