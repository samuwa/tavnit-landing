/**
 * Google Analytics 4 — landing site.
 *
 * One GA4 property is shared across tavnit.io, demo.tavnit.io and (later)
 * app.tavnit.io as separate data streams. Cross-domain linking is configured in
 * `Analytics.tsx`, so a visitor who jumps from the landing to the demo stays one
 * user rather than becoming a fresh session.
 *
 * Consent Mode v2: every storage type starts `denied`. GA still receives
 * cookieless pings (used for modelling) until the visitor accepts the cookie
 * banner, at which point analytics storage flips to `granted`. Advertising
 * storage stays denied forever — we don't run ads and don't want that data.
 *
 * The consent key is deliberately the same name and shape as the one the demo
 * uses (`tavnit_consent`), so the two sites make the same decision visible.
 */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

export const CONSENT_KEY = "tavnit_consent";
export const CONSENT_CHANGED_EVENT = "tavnit:consent-changed";
export const CONSENT_REOPEN_EVENT = "tavnit:consent-reopen";

export type ConsentChoice = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function readConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function writeConsent(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    // Private mode / blocked storage: the choice just won't persist.
  }
  window.gtag?.("consent", "update", {
    analytics_storage: choice,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT, { detail: choice }));
}

/** Re-show the cookie banner (footer "Cookie settings" link). */
export function reopenConsent() {
  window.dispatchEvent(new Event(CONSENT_REOPEN_EVENT));
}

/**
 * Banner visibility as an external store so the component can read it with
 * `useSyncExternalStore` (server snapshot = closed, so SSR markup matches).
 */
const listeners = new Set<() => void>();
let forcedOpen = false;
function notify() {
  listeners.forEach((l) => l());
}
if (typeof window !== "undefined") {
  window.addEventListener(CONSENT_REOPEN_EVENT, () => {
    forcedOpen = true;
    notify();
  });
  window.addEventListener(CONSENT_CHANGED_EVENT, () => {
    forcedOpen = false;
    notify();
  });
}
export const bannerStore = {
  subscribe(cb: () => void) {
    listeners.add(cb);
    return () => listeners.delete(cb);
  },
  getSnapshot: () => forcedOpen || readConsent() === null,
  getServerSnapshot: () => false,
};

/**
 * Fire a GA4 event. Safe to call before gtag loads or without a GA id — it
 * simply no-ops. Never pass personal data (names, emails, document content).
 */
export function trackEvent(name: string, params: Record<string, string | number | boolean> = {}) {
  if (!GA_ID || typeof window === "undefined") return;
  window.gtag?.("event", name, params);
}
