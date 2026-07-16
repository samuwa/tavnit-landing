"use client";

import { ReactNode, useEffect, useRef } from "react";
import { useViewMode } from "./ViewModeProvider";

/* Full-viewport overlay that paints the OUTGOING mode on top of the (already
   live) incoming mode and scans it away top→bottom with a glowing beam, so the
   document visibly "extracts" into the spreadsheet (and back). Rendered only
   while `leaving` is set. `children` is the outgoing mode's site. */

export default function WipeStage({ children }: { children: ReactNode }) {
  const { endWipe } = useViewMode();
  const ref = useRef<HTMLDivElement>(null);
  const done = useRef(false);

  useEffect(() => {
    // Fallback in case animationend doesn't fire (e.g. element replaced).
    const t = setTimeout(() => {
      if (!done.current) endWipe();
    }, 1400);
    return () => clearTimeout(t);
  }, [endWipe]);

  return (
    <div className="wipe-stage" aria-hidden>
      {/* The outgoing site, contained (transform) so its fixed chrome clips
          with the scan, then wiped away from the top down. */}
      <div
        ref={ref}
        className="wipe-old"
        onAnimationEnd={() => {
          done.current = true;
          endWipe();
        }}
      >
        {children}
      </div>
      {/* Scanner beam sweeping down at the reveal boundary */}
      <div className="wipe-beam">
        <div className="wipe-beam-line" />
      </div>
    </div>
  );
}
