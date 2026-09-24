"use client";

import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import type { Locale } from "@/lib/locale";
import { applyTheme, hasSavedTheme, readTheme } from "@/lib/theme";

const LABEL: Record<Locale, string> = {
  en: "Switch between light and dark theme",
  es: "Cambiar entre tema claro y oscuro",
};

/**
 * Sun/moon button for the header. Both icons are in the markup and CSS picks
 * one from <html data-theme> (.show-light / .show-dark in globals.css), so the
 * server render is right in either theme and nothing flips after hydration.
 *
 * While the visitor has not chosen, the page follows the OS setting live.
 */
export default function ThemeToggle({ locale = "en", className = "" }: { locale?: Locale; className?: string }) {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const follow = () => {
      if (!hasSavedTheme()) applyTheme(mq.matches ? "light" : "dark", false);
    };
    mq.addEventListener("change", follow);
    return () => mq.removeEventListener("change", follow);
  }, []);

  return (
    <button
      type="button"
      onClick={() => applyTheme(readTheme() === "light" ? "dark" : "light")}
      aria-label={LABEL[locale]}
      title={LABEL[locale]}
      className={`inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-tint/10 text-fg-4 transition-colors hover:border-tint/20 hover:bg-tint/5 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/50 ${className}`}
    >
      <Sun size={17} className="show-dark" aria-hidden />
      <Moon size={17} className="show-light" aria-hidden />
    </button>
  );
}
