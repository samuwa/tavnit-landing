"use client";

import { reopenConsent } from "@/lib/analytics";

/** Footer link that re-opens the cookie banner so a visitor can change their mind. */
export default function CookieSettingsLink({ className }: { className?: string }) {
  return (
    <button type="button" onClick={reopenConsent} className={className}>
      Cookie settings
    </button>
  );
}
