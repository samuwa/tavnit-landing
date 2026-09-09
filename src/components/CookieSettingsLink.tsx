"use client";

import { reopenConsent } from "@/lib/analytics";
import type { Locale } from "@/lib/locale";

const LABEL: Record<Locale, string> = { en: "Cookie settings", es: "Preferencias de cookies" };

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
