"use client";

import { useEffect, useState } from "react";
import { SHEET_SECTIONS } from "./sheetSections";

/* Index of the section currently under the upper half of the viewport.
   Drives the formula bar, sheet tabs, and status bar in sync. */
export default function useActiveSection(): number {
  const [active, setActive] = useState(0);

  useEffect(() => {
    let frame: number | null = null;

    const update = () => {
      frame = null;
      const probe = window.innerHeight * 0.45;
      let current = 0;
      for (let i = 0; i < SHEET_SECTIONS.length; i++) {
        const el = document.getElementById(SHEET_SECTIONS[i].id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= probe) current = i;
      }
      setActive(current);
    };

    const onScroll = () => {
      if (frame === null) {
        frame = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return active;
}
