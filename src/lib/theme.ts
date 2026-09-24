"use client";

import { useSyncExternalStore } from "react";
import { THEME_KEY } from "@/lib/theme-script";

export { THEME_KEY };

/**
 * Color theme: "dark" (the site's native palette) or "light" (the Lite
 * ledger-paper palette). The choice lives on <html data-theme> so CSS can
 * resolve every token without JavaScript; this module is the one place that
 * reads and writes it.
 *
 * Resolution order, applied before first paint by THEME_INIT_SCRIPT in the
 * root layout: the visitor's saved choice, then the OS setting, then dark.
 */

export type Theme = "light" | "dark";

const EVENT = "tavnit-theme";

export function readTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

/** Applies a theme; `persist` false follows the OS without overriding a saved choice. */
export function applyTheme(theme: Theme, persist = true) {
  document.documentElement.setAttribute("data-theme", theme);
  if (persist) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // Private mode or blocked storage: the choice lasts for this page view.
    }
  }
  window.dispatchEvent(new Event(EVENT));
}

export function hasSavedTheme(): boolean {
  try {
    const t = localStorage.getItem(THEME_KEY);
    return t === "light" || t === "dark";
  } catch {
    return false;
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => {
    window.removeEventListener(EVENT, onChange);
    observer.disconnect();
  };
}

/** Current theme, for the few components that paint with JS (canvas). Server snapshot is dark. */
export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, readTheme, () => "dark");
}
