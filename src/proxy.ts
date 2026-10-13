/**
 * Language detection — the only job of the proxy (mirror of the app's
 * src/proxy.ts). It NEVER redirects: every URL serves the same page to
 * everyone, which is what lets Googlebot (crawling from the US with an
 * English Accept-Language) index all twelve languages, and hreflang route
 * searchers to theirs. It only:
 *  - proposes a language in the host-only `tavnit_lang_auto` cookie, once,
 *    from the visitor's country (Vercel's `x-vercel-ip-country`, set at the
 *    edge) and Accept-Language — the LanguageSuggestion bar offers it when
 *    the page has a twin in that language;
 *  - re-issues the explicit `tavnit_lang` choice from a server Set-Cookie on
 *    page navigations, because Safari caps JS-written cookies at 7 days
 *    (Domain=tavnit.io in production, so the app sees the same choice).
 */
import { NextResponse, type NextRequest } from "next/server";
import {
  AUTO_LANG_COOKIE,
  AUTO_LANG_COOKIE_MAX_AGE,
  LANG_COOKIE,
  LANG_COOKIE_MAX_AGE,
  cookieLanguage,
  resolveLanguage,
  sharedCookieDomain,
} from "@/lib/locales";

export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const secure = request.nextUrl.protocol === "https:";

  if (!request.cookies.get(AUTO_LANG_COOKIE)) {
    const detected = resolveLanguage(
      request.headers.get("x-vercel-ip-country"),
      request.headers.get("accept-language"),
    );
    response.cookies.set(AUTO_LANG_COOKIE, detected, {
      path: "/",
      maxAge: AUTO_LANG_COOKIE_MAX_AGE,
      sameSite: "lax",
      secure,
    });
  }

  const explicit = cookieLanguage(request.cookies.get(LANG_COOKIE)?.value);
  if (explicit && request.headers.get("sec-fetch-dest") === "document") {
    response.cookies.set(LANG_COOKIE, explicit, {
      path: "/",
      maxAge: LANG_COOKIE_MAX_AGE,
      sameSite: "lax",
      secure,
      domain: sharedCookieDomain(request.nextUrl.hostname),
    });
  }

  return response;
}

export const config = {
  matcher: [
    {
      // Pages only: no Next internals, API routes, metadata routes or static
      // files (images, fonts, the PDFs and samples under /public).
      source:
        "/((?!_next/|api/|.*\\.(?:js|mjs|css|map|png|jpe?g|gif|svg|ico|webp|avif|woff2?|ttf|txt|xml|json|pdf|webmanifest|md)$|.*opengraph-image|.*twitter-image).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
