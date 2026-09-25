"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from "react";
import { APP_URL } from "@/lib/site";
import type { Locale } from "@/lib/locale";

/**
 * What the visitor tried, sent to /api/lite/intent so the product can start
 * them where they left off: the tool they used ("used"), and what they
 * reached for when they clicked through to Tavnit ("cta", with a one-time
 * handoff token on the link). Best-effort everywhere: a failed call never
 * stops the visitor, the link still goes to the app.
 */

type Payload = Record<string, unknown>;

interface IntentApi {
  tool: string;
  locale: Locale;
  /** Extra context sent with the next click (e.g. the columns removed). */
  setPayload: (p: Payload) => void;
  getPayload: () => Payload;
}

const Ctx = createContext<IntentApi | null>(null);

export function LiteIntentProvider({ tool, locale, children }: { tool: string; locale: Locale; children: React.ReactNode }) {
  const payload = useRef<Payload>({});
  const api = useMemo<IntentApi>(
    () => ({
      tool,
      locale,
      setPayload: (p) => {
        payload.current = p;
      },
      getPayload: () => payload.current,
    }),
    [tool, locale],
  );
  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useLiteIntent() {
  return useContext(Ctx);
}

function send(body: Record<string, unknown>, keepalive = false) {
  return fetch("/api/lite/intent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    keepalive,
  });
}

/** Records, once per result, that the visitor used this tool. */
export function useMarkUsed(done: boolean, key: string | null, extra?: Payload) {
  const ctx = useLiteIntent();
  const sent = useRef<string | null>(null);
  useEffect(() => {
    if (!ctx || !done || !key || sent.current === key) return;
    sent.current = key;
    void send({ tool: ctx.tool, kind: "used", locale: ctx.locale, payload: extra ?? {} }, true).catch(() => {});
  }, [ctx, done, key, extra]);
}

/**
 * A link to Tavnit that says why the visitor is going: `feature` is what
 * they reached for ("flow", "webhook", "cleaner", …). Plain href for
 * no-JS and middle-clicks; a normal click records the intent, mints the
 * handoff token and then navigates.
 */
export function TavnitLink({
  feature,
  className,
  children,
  role,
}: {
  feature?: string;
  className?: string;
  children: React.ReactNode;
  role?: string;
}) {
  const ctx = useLiteIntent();
  const onClick = useCallback(
    async (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      let url = APP_URL;
      try {
        const res = await send({
          tool: ctx?.tool ?? "site",
          kind: "cta",
          feature: feature ?? null,
          locale: ctx?.locale ?? (document.documentElement.lang === "en" ? "en" : "es"),
          payload: ctx?.getPayload() ?? {},
          handoff: true,
        });
        const body = (await res.json()) as { url?: string };
        if (body.url && body.url.startsWith(APP_URL)) url = body.url;
      } catch {
        // go anyway
      }
      window.location.assign(url);
    },
    [ctx, feature],
  );
  return (
    <a href={APP_URL} onClick={onClick} className={className} role={role}>
      {children}
    </a>
  );
}
