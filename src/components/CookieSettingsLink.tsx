"use client";

import { reopenConsent } from "@/lib/analytics";
import type { Locale } from "@/lib/locales";

const LABEL: Record<Locale, string> = {
  en: "Cookie settings",
  es: "Preferencias de cookies",
  "pt-BR": "Preferências de cookies",
  fr: "Paramètres des cookies",
  de: "Cookie-Einstellungen",
  it: "Impostazioni dei cookie",
  nl: "Cookie-instellingen",
  pl: "Ustawienia plików cookie",
  tr: "Çerez ayarları",
  "zh-Hans": "Cookie 设置",
  ja: "Cookie の設定",
  ko: "쿠키 설정",
};

/** Footer link that re-opens the cookie banner so a visitor can change their mind. */
export default function CookieSettingsLink({
  className,
  locale = "en",
}: {
  className?: string;
  locale?: Locale;
}) {
  return (
    <button type="button" onClick={reopenConsent} className={className}>
      {LABEL[locale]}
    </button>
  );
}
