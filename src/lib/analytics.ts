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
 * storage stays denied forever: the banner promises no advertising cookies.
 * We do run Google Ads (for Tavnit, not on this site); ad clicks are tied to
 * demo requests through src/lib/attribution.ts instead, with no cookie.
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

/* ---------- free tools: funnel events ---------- */

type LiteLocale = "en" | "es";
/** How the visitor identified themselves in the download dialog. */
export type LeadMethod = "signup" | "signin" | "google";

const LEAD_PENDING_KEY = "tavnit_lite_lead_pending";
const LEAD_PENDING_TTL_MS = 15 * 60 * 1000;
const PROCESSED_KEY = "tavnit_lite_processed";

/**
 * The conversion Google Ads imports from GA4: a visitor gave their email in a
 * free tool's download dialog. Called once per successful submission, by the
 * dialog itself; carries the tool and locale, never the email.
 */
export function trackToolLead(tool: string, locale: LiteLocale, method: LeadMethod) {
  trackEvent("generate_lead", {
    lead_type: "free_tool_download",
    tool_name: tool,
    page_locale: locale,
    method,
  });
}

/**
 * Google sign-in leaves the page before it succeeds, so the lead cannot be
 * counted at the click. The dialog leaves this marker instead and counts the
 * lead on the way back, once the session exists (see `takePendingToolLead`).
 */
export function markPendingToolLead(tool: string) {
  try {
    window.sessionStorage.setItem(LEAD_PENDING_KEY, JSON.stringify({ tool, at: Date.now() }));
  } catch {
    // Storage blocked: this lead goes uncounted rather than miscounted.
  }
}

export function clearPendingToolLead() {
  try {
    window.sessionStorage.removeItem(LEAD_PENDING_KEY);
  } catch {
    // ignore
  }
}

/**
 * True, once, when a Google sign-in was started from this tool's download
 * dialog in the last few minutes. The marker is removed on read, so a reload
 * (or a second dialog on the page) can never count the same lead twice.
 */
export function takePendingToolLead(tool: string): boolean {
  try {
    const raw = window.sessionStorage.getItem(LEAD_PENDING_KEY);
    if (!raw) return false;
    const v = JSON.parse(raw) as { tool?: string; at?: number };
    if (v.tool !== tool) return false;
    window.sessionStorage.removeItem(LEAD_PENDING_KEY);
    return typeof v.at === "number" && Date.now() - v.at < LEAD_PENDING_TTL_MS;
  } catch {
    return false;
  }
}

/**
 * Funnel step before the lead: a document finished processing. `resultId` is
 * the run's id, remembered for the tab so a result restored after a reload or
 * a sign-in round trip is not counted a second time. Not a conversion.
 */
export function trackDocumentProcessed(tool: string, locale: LiteLocale, resultId: string, sample: boolean) {
  const id = `${tool}:${resultId}`;
  try {
    const seen = JSON.parse(window.sessionStorage.getItem(PROCESSED_KEY) || "[]") as string[];
    if (seen.includes(id)) return;
    window.sessionStorage.setItem(PROCESSED_KEY, JSON.stringify([...seen, id].slice(-50)));
  } catch {
    // Storage blocked: count it; the in-memory guard in the caller still holds.
  }
  trackEvent("tool_document_processed", { tool_name: tool, page_locale: locale, sample });
}
