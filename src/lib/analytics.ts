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

const PROCESSED_KEY = "tavnit_lite_processed";

/**
 * The conversion Google Ads imports from GA4: a visitor gave their email in a
 * free tool's download dialog and a session exists. Called once, by the
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
 * Auth that leaves the page (Google, or email sign-up that still needs a
 * confirmation link) cannot be counted at the click. The dialog leaves this
 * marker and counts the lead on the way back, once a session exists
 * (`takePendingToolLead`).
 *
 * Google returns in the same tab, so sessionStorage is enough. The
 * confirmation link usually opens a new tab, which does not share
 * sessionStorage, so the same payload is also kept in a first-party cookie.
 * A copy already counted in another tab is remembered in localStorage and
 * is not counted again.
 */
export type PendingLeadMethod = "google" | "signup";

const LEAD_PENDING_KEY = "tavnit_lite_lead_pending";
const LEAD_PENDING_COOKIE = "tavnit_lite_lead";
const LEAD_SEEN_KEY = "tavnit_lite_lead_seen";
/** Google OAuth is back in the same tab within seconds. */
const GOOGLE_PENDING_TTL_MS = 15 * 60 * 1000;
/** Long enough for a confirmation email opened later the same day. */
const SIGNUP_PENDING_TTL_MS = 24 * 60 * 60 * 1000;

interface PendingLead {
  tool: string;
  method: PendingLeadMethod;
  at: number;
  exp: number;
}

function pendingId(p: PendingLead): string {
  return `${p.tool}:${p.at}`;
}

function parsePending(raw: string | null): PendingLead | null {
  if (!raw) return null;
  try {
    const v = JSON.parse(raw) as { tool?: unknown; method?: unknown; at?: unknown; exp?: unknown };
    if (typeof v.tool !== "string" || !v.tool || typeof v.at !== "number") return null;
    const method: PendingLeadMethod = v.method === "signup" ? "signup" : "google";
    const exp =
      typeof v.exp === "number"
        ? v.exp
        : v.at + (method === "signup" ? SIGNUP_PENDING_TTL_MS : GOOGLE_PENDING_TTL_MS);
    return { tool: v.tool, method, at: v.at, exp };
  } catch {
    return null;
  }
}

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  for (const part of document.cookie.split("; ")) {
    const i = part.indexOf("=");
    if (i === -1 || part.slice(0, i) !== name) continue;
    try {
      return decodeURIComponent(part.slice(i + 1));
    } catch {
      return null;
    }
  }
  return null;
}

function writeLeadCookie(payload: PendingLead) {
  const maxAge = Math.max(1, Math.ceil((payload.exp - Date.now()) / 1000));
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${LEAD_PENDING_COOKIE}=${encodeURIComponent(JSON.stringify(payload))}; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure}`;
}

function clearLeadCookie() {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${LEAD_PENDING_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax${secure}`;
}

function readStoredPending(): PendingLead | null {
  try {
    return parsePending(window.sessionStorage.getItem(LEAD_PENDING_KEY));
  } catch {
    return null;
  }
}

function writeStoredPending(payload: PendingLead) {
  try {
    window.sessionStorage.setItem(LEAD_PENDING_KEY, JSON.stringify(payload));
  } catch {
    // The cookie still covers a return in another tab.
  }
}

function clearStoredPending() {
  try {
    window.sessionStorage.removeItem(LEAD_PENDING_KEY);
  } catch {
    // ignore
  }
}

function seenIds(): string[] {
  try {
    const raw = window.localStorage.getItem(LEAD_SEEN_KEY);
    const v = raw ? (JSON.parse(raw) as unknown) : [];
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function rememberSeen(id: string) {
  try {
    const next = [...seenIds().filter((x) => x !== id), id].slice(-30);
    window.localStorage.setItem(LEAD_SEEN_KEY, JSON.stringify(next));
  } catch {
    // This tab still drops its own copies below.
  }
}

function forgetPendingCopies() {
  clearStoredPending();
  try {
    clearLeadCookie();
  } catch {
    // ignore
  }
}

export function markPendingToolLead(tool: string, method: PendingLeadMethod = "google") {
  const ttl = method === "signup" ? SIGNUP_PENDING_TTL_MS : GOOGLE_PENDING_TTL_MS;
  const payload: PendingLead = { tool, method, at: Date.now(), exp: Date.now() + ttl };
  writeStoredPending(payload);
  try {
    writeLeadCookie(payload);
  } catch {
    // Session storage still covers the same-tab Google return.
  }
}

/** Drop a pending lead and remember it, so a later return cannot count it. */
export function clearPendingToolLead() {
  const cookie = parsePending(readCookie(LEAD_PENDING_COOKIE));
  const pending = cookie ?? readStoredPending();
  if (pending) rememberSeen(pendingId(pending));
  forgetPendingCopies();
}

/**
 * The pending method, once, for this tool. Removed on read. `null` when
 * there is no marker, it belongs to another tool, it expired, or another
 * tab already counted it.
 */
export function takePendingToolLead(tool: string): PendingLeadMethod | null {
  let cookie: PendingLead | null = null;
  try {
    cookie = parsePending(readCookie(LEAD_PENDING_COOKIE));
  } catch {
    cookie = null;
  }
  const session = readStoredPending();
  const pending = cookie?.tool === tool ? cookie : session?.tool === tool ? session : null;
  if (!pending) return null;
  const id = pendingId(pending);
  const seen = seenIds().includes(id);
  const expired = Date.now() > pending.exp;
  rememberSeen(id);
  forgetPendingCopies();
  if (seen || expired) return null;
  return pending.method;
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
