"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { Check, Settings2 } from "lucide-react";
import type { Locale } from "@/lib/locale";
import { applyTheme, hasSavedTheme, useTheme, type Theme } from "@/lib/theme";

const COPY: Record<
  Locale,
  { button: string; theme: string; light: string; dark: string; language: string }
> = {
  en: { button: "Display and language", theme: "Theme", light: "Light", dark: "Dark", language: "Language" },
  es: { button: "Apariencia e idioma", theme: "Tema", light: "Claro", dark: "Oscuro", language: "Idioma" },
};

const LANGUAGE_NAME: Record<Locale, string> = { en: "English", es: "Español" };

/**
 * One gear button for theme and language, replacing the sun/moon button and
 * the EN/ES pills that sat side by side in the header. Both are set once and
 * rarely touched, so they do not need a permanent place in the bar.
 *
 * The panel stays in the DOM while closed (the `hidden` attribute), so the
 * other-language link is still a plain crawlable <a> with hrefLang — the
 * language switch never depended on JavaScript and still does not. No
 * redirect by Accept-Language; hreflang does the routing.
 *
 * While the visitor has not chosen a theme, the page follows the OS live.
 */
export default function SiteSettings({
  locale,
  alternateHref,
  className = "",
}: {
  locale: Locale;
  alternateHref: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const root = useRef<HTMLDivElement>(null);
  // The header renders one for desktop and one for mobile; ids must differ.
  const panelId = useId();
  const t = COPY[locale];
  const other: Locale = locale === "en" ? "es" : "en";

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const follow = () => {
      if (!hasSavedTheme()) applyTheme(mq.matches ? "light" : "dark", false);
    };
    mq.addEventListener("change", follow);
    return () => mq.removeEventListener("change", follow);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const option = (active: boolean) =>
    `flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors ${
      active ? "bg-tint/10 text-fg font-semibold" : "text-fg-3 hover:bg-tint/5 hover:text-fg"
    }`;

  const themeButton = (value: Theme, label: string) => (
    <button
      type="button"
      className={option(theme === value)}
      aria-pressed={theme === value}
      onClick={() => applyTheme(value)}
    >
      {label}
      {theme === value && <Check size={15} aria-hidden />}
    </button>
  );

  return (
    <div ref={root} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={t.button}
        title={t.button}
        className="inline-flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold uppercase tracking-wide text-fg-4 transition-colors hover:bg-tint/5 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/50"
      >
        <Settings2 size={17} aria-hidden />
        <span>{locale}</span>
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-tint/10 bg-bg/95 p-2 shadow-xl shadow-black/30 backdrop-blur-xl"
      >
        <p className="px-3 pb-1 pt-1 text-[11px] font-semibold uppercase tracking-wider text-fg-5">{t.theme}</p>
        {themeButton("light", t.light)}
        {themeButton("dark", t.dark)}

        <div className="my-2 border-t border-tint/10" />

        <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-fg-5">{t.language}</p>
        <span className={option(true)} aria-current="true">
          {LANGUAGE_NAME[locale]}
          <Check size={15} aria-hidden />
        </span>
        <Link href={alternateHref} hrefLang={other} lang={other} className={option(false)} onClick={() => setOpen(false)}>
          {LANGUAGE_NAME[other]}
        </Link>
      </div>
    </div>
  );
}
