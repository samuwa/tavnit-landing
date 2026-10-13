"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { Check, Settings2 } from "lucide-react";
import { LOCALES, hreflangOf, writeLangCookie, type Locale } from "@/lib/locales";
import type { LanguageLinks } from "@/lib/routes";
import { applyTheme, hasSavedTheme, useTheme, type Theme } from "@/lib/theme";

const COPY: Record<
  Locale,
  { button: string; theme: string; light: string; dark: string; language: string }
> = {
  en: { button: "Display and language", theme: "Theme", light: "Light", dark: "Dark", language: "Language" },
  es: { button: "Apariencia e idioma", theme: "Tema", light: "Claro", dark: "Oscuro", language: "Idioma" },
  "pt-BR": { button: "Aparência e idioma", theme: "Tema", light: "Claro", dark: "Escuro", language: "Idioma" },
  fr: { button: "Affichage et langue", theme: "Thème", light: "Clair", dark: "Sombre", language: "Langue" },
  de: { button: "Darstellung und Sprache", theme: "Design", light: "Hell", dark: "Dunkel", language: "Sprache" },
  it: { button: "Aspetto e lingua", theme: "Tema", light: "Chiaro", dark: "Scuro", language: "Lingua" },
  nl: { button: "Weergave en taal", theme: "Thema", light: "Licht", dark: "Donker", language: "Taal" },
  pl: { button: "Wygląd i język", theme: "Motyw", light: "Jasny", dark: "Ciemny", language: "Język" },
  tr: { button: "Görünüm ve dil", theme: "Tema", light: "Açık", dark: "Koyu", language: "Dil" },
  "zh-Hans": { button: "显示和语言", theme: "主题", light: "浅色", dark: "深色", language: "语言" },
  ja: { button: "表示と言語", theme: "テーマ", light: "ライト", dark: "ダーク", language: "言語" },
  ko: { button: "화면 및 언어", theme: "테마", light: "라이트", dark: "다크", language: "언어" },
};

/**
 * One gear button for theme and language, replacing the sun/moon button and
 * the EN/ES pills that sat side by side in the header. Both are set once and
 * rarely touched, so they do not need a permanent place in the bar.
 *
 * The panel stays in the DOM while closed (the `hidden` attribute), so the
 * twelve language links are plain crawlable <a>s with hrefLang — each goes
 * to this page's twin in that language, or to that language's home when the
 * page has none (`languages`, computed on the server by languageLinksFor()).
 * The switch never depended on JavaScript and still does not; with it, a
 * click also records the explicit choice (`tavnit_lang`, shared with the
 * app). Nothing redirects by Accept-Language or country: hreflang routes
 * searchers, and detection only ever proposes (LanguageSuggestion).
 *
 * While the visitor has not chosen a theme, the page follows the OS live.
 */
export default function SiteSettings({
  locale,
  languages,
  className = "",
}: {
  locale: Locale;
  languages: LanguageLinks;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const root = useRef<HTMLDivElement>(null);
  // The header renders one for desktop and one for mobile; ids must differ.
  const panelId = useId();
  const t = COPY[locale];

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
        className="absolute right-0 top-full mt-2 w-72 max-w-[calc(100vw-2rem)] rounded-xl border border-tint/10 bg-bg/95 p-2 shadow-xl shadow-black/30 backdrop-blur-xl"
      >
        <p className="px-3 pb-1 pt-1 text-[11px] font-semibold uppercase tracking-wider text-fg-5">{t.theme}</p>
        {themeButton("light", t.light)}
        {themeButton("dark", t.dark)}

        <div className="my-2 border-t border-tint/10" />

        <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-fg-5">{t.language}</p>
        <ul className="grid grid-cols-2 gap-0.5">
          {LOCALES.map(({ code, nativeName }) => (
            <li key={code}>
              <Link
                href={languages.links[code]}
                hrefLang={hreflangOf(code)}
                lang={hreflangOf(code)}
                aria-current={code === locale ? "true" : undefined}
                className={`flex w-full items-center justify-between gap-1 rounded-md px-2.5 py-1.5 text-[13px] transition-colors ${
                  code === locale ? "bg-tint/10 font-semibold text-fg" : "text-fg-3 hover:bg-tint/5 hover:text-fg"
                }`}
                onClick={() => {
                  writeLangCookie(code);
                  setOpen(false);
                }}
              >
                <span className="truncate">{nativeName}</span>
                {code === locale && <Check size={14} aria-hidden className="flex-shrink-0" />}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
