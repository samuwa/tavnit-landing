"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowRight, Languages, X } from "lucide-react";
import { hreflangOf, readAutoLangCookie, readLangCookie, writeLangCookie, type Locale } from "@/lib/locales";
import type { LanguageLinks } from "@/lib/routes";

/**
 * "This page is available in Deutsch → [Switch] [×]".
 *
 * Detection never redirects (Googlebot crawls from the US and must see every
 * page as it is): src/proxy.ts only stores what it would have chosen in the
 * `tavnit_lang_auto` cookie. This bar offers it, worded in the DETECTED
 * language, when all of these hold:
 *  - the visitor has made no explicit choice yet (no `tavnit_lang`);
 *  - the detected language differs from this page's;
 *  - this page has a twin in the detected language.
 * Switch records the choice and goes to the twin; × records the CURRENT
 * language as the choice, so the bar never comes back (on this site or, via
 * the shared cookie, in the app).
 *
 * Read on the client only (the server snapshot is "nothing to suggest"):
 * the HTML is the same for every visitor (static, cacheable), and the bar
 * appears after hydration.
 */

const noSubscribe = () => () => {};

const COPY: Record<Locale, { text: string; switch: string; dismiss: string }> = {
  en: { text: "This page is available in English.", switch: "Switch", dismiss: "Dismiss" },
  es: { text: "Esta página está disponible en español.", switch: "Cambiar", dismiss: "Cerrar" },
  "pt-BR": { text: "Esta página está disponível em português.", switch: "Mudar", dismiss: "Fechar" },
  fr: { text: "Cette page est disponible en français.", switch: "Changer", dismiss: "Fermer" },
  de: { text: "Diese Seite gibt es auch auf Deutsch.", switch: "Wechseln", dismiss: "Schließen" },
  it: { text: "Questa pagina è disponibile in italiano.", switch: "Cambia", dismiss: "Chiudi" },
  nl: { text: "Deze pagina is ook beschikbaar in het Nederlands.", switch: "Wisselen", dismiss: "Sluiten" },
  pl: { text: "Ta strona jest dostępna po polsku.", switch: "Przełącz", dismiss: "Zamknij" },
  tr: { text: "Bu sayfa Türkçe olarak da mevcut.", switch: "Geç", dismiss: "Kapat" },
  "zh-Hans": { text: "此页面提供简体中文版本。", switch: "切换", dismiss: "关闭" },
  ja: { text: "このページは日本語でもご覧いただけます。", switch: "切り替える", dismiss: "閉じる" },
  ko: { text: "이 페이지는 한국어로도 제공됩니다.", switch: "전환", dismiss: "닫기" },
};

export default function LanguageSuggestion({
  locale,
  languages,
  tone = "site",
  className = "top-[4.5rem]",
}: {
  /** The language of the page being viewed. */
  locale: Locale;
  languages: LanguageLinks;
  /** "lite": the free tools' light paper theme. */
  tone?: "site" | "lite";
  /** Vertical placement under the page's header. */
  className?: string;
}) {
  const [dismissed, setDismissed] = useState(false);
  const suggested = useSyncExternalStore(
    noSubscribe,
    () => {
      if (readLangCookie()) return null;
      const auto = readAutoLangCookie();
      return auto && auto !== locale && languages.available.includes(auto) ? auto : null;
    },
    () => null,
  );

  if (!suggested || dismissed) return null;
  const t = COPY[suggested];
  const lang = hreflangOf(suggested);

  return (
    <div
      role="region"
      aria-label={t.text}
      lang={lang}
      className={`fixed inset-x-3 z-40 mx-auto flex max-w-xl items-center gap-3 rounded-xl border py-2 pl-3.5 pr-2 text-sm shadow-xl backdrop-blur-md ${
        tone === "lite"
          ? "border-[var(--lite-line)] bg-white/95 text-[var(--lite-ink)] shadow-[#1c2321]/10"
          : "border-tint/10 bg-panel/95 text-fg-3 shadow-black/30"
      } ${className}`}
    >
      <Languages size={16} className={`flex-shrink-0 ${tone === "lite" ? "text-[var(--lite-blue)]" : "text-accent"}`} aria-hidden />
      <p className="min-w-0 flex-1 leading-snug">{t.text}</p>
      <Link
        href={languages.links[suggested]}
        hrefLang={lang}
        onClick={() => writeLangCookie(suggested)}
        className="inline-flex flex-shrink-0 items-center gap-1 rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] px-3 py-1.5 text-xs font-semibold text-white transition-[filter] hover:brightness-110"
      >
        {t.switch}
        <ArrowRight size={13} aria-hidden />
      </Link>
      <button
        type="button"
        onClick={() => {
          writeLangCookie(locale);
          setDismissed(true);
        }}
        aria-label={t.dismiss}
        title={t.dismiss}
        className={`grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg transition-colors ${
          tone === "lite" ? "text-[var(--lite-muted)] hover:bg-[#eef1f4] hover:text-[var(--lite-ink)]" : "text-fg-5 hover:bg-tint/10 hover:text-fg"
        }`}
      >
        <X size={15} aria-hidden />
      </button>
    </div>
  );
}
