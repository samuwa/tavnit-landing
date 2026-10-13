"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { GA_ID, bannerStore, writeConsent, type ConsentChoice } from "@/lib/analytics";
import { hreflangOf, localeFromSegment, type Locale } from "@/lib/locales";

/** Inline in <head> before anything else — see root layout. */
export const CONSENT_DEFAULT_SCRIPT = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});
try{if(localStorage.getItem('tavnit_consent')==='granted'){gtag('consent','update',{analytics_storage:'granted'});}}catch(e){}`;

/**
 * GA4 loader + cookie banner. Rendered once in the root layout.
 *
 * Order matters: the consent defaults must be on the dataLayer before gtag.js
 * evaluates, which is why `CONSENT_DEFAULT_SCRIPT` is inlined in <head> by the
 * root layout and the library itself loads `afterInteractive` here.
 */
export default function Analytics() {
  if (!GA_ID) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`gtag('js',new Date());
gtag('config','${GA_ID}',{anonymize_ip:true,linker:{domains:['tavnit.io','demo.tavnit.io','app.tavnit.io']}});`}
      </Script>
      <CookieBanner />
    </>
  );
}

const BANNER_COPY: Record<Locale, { title: string; body: string; privacy: string; decline: string; accept: string; aria: string }> = {
  en: {
    title: "Cookies on tavnit.io",
    body: "We use Google Analytics to understand which pages and features are useful. It only runs if you accept. No advertising cookies, ever.",
    privacy: "Privacy policy",
    decline: "Decline",
    accept: "Accept",
    aria: "Cookie preferences",
  },
  es: {
    title: "Cookies en tavnit.io",
    body: "Usamos Google Analytics para saber qué páginas y funciones son útiles. Solo se activa si aceptas. Nunca cookies de publicidad.",
    privacy: "Política de privacidad",
    decline: "Rechazar",
    accept: "Aceptar",
    aria: "Preferencias de cookies",
  },
  "pt-BR": {
    title: "Cookies no tavnit.io",
    body: "Usamos o Google Analytics para entender quais páginas e recursos são úteis. Ele só é ativado se você aceitar. Nunca usamos cookies de publicidade.",
    privacy: "Política de privacidade",
    decline: "Recusar",
    accept: "Aceitar",
    aria: "Preferências de cookies",
  },
  fr: {
    title: "Cookies sur tavnit.io",
    body: "Nous utilisons Google Analytics pour savoir quelles pages et fonctionnalités sont utiles. Il ne s’active que si vous acceptez. Jamais de cookies publicitaires.",
    privacy: "Politique de confidentialité",
    decline: "Refuser",
    accept: "Accepter",
    aria: "Préférences de cookies",
  },
  de: {
    title: "Cookies auf tavnit.io",
    body: "Wir nutzen Google Analytics, um zu verstehen, welche Seiten und Funktionen hilfreich sind. Es läuft nur, wenn Sie zustimmen. Niemals Werbe-Cookies.",
    privacy: "Datenschutzerklärung",
    decline: "Ablehnen",
    accept: "Akzeptieren",
    aria: "Cookie-Einstellungen",
  },
  it: {
    title: "Cookie su tavnit.io",
    body: "Usiamo Google Analytics per capire quali pagine e funzioni sono utili. Si attiva solo se accetti. Mai cookie pubblicitari.",
    privacy: "Informativa sulla privacy",
    decline: "Rifiuta",
    accept: "Accetta",
    aria: "Preferenze sui cookie",
  },
  nl: {
    title: "Cookies op tavnit.io",
    body: "We gebruiken Google Analytics om te begrijpen welke pagina’s en functies nuttig zijn. Het werkt alleen als je akkoord gaat. Nooit advertentiecookies.",
    privacy: "Privacybeleid",
    decline: "Weigeren",
    accept: "Accepteren",
    aria: "Cookievoorkeuren",
  },
  pl: {
    title: "Pliki cookie na tavnit.io",
    body: "Korzystamy z Google Analytics, aby wiedzieć, które strony i funkcje są przydatne. Działa tylko po Twojej zgodzie. Nigdy nie używamy reklamowych plików cookie.",
    privacy: "Polityka prywatności",
    decline: "Odrzuć",
    accept: "Akceptuję",
    aria: "Ustawienia plików cookie",
  },
  tr: {
    title: "tavnit.io’da çerezler",
    body: "Hangi sayfaların ve özelliklerin işe yaradığını anlamak için Google Analytics kullanıyoruz. Yalnızca kabul ederseniz çalışır. Asla reklam çerezi kullanmayız.",
    privacy: "Gizlilik politikası",
    decline: "Reddet",
    accept: "Kabul et",
    aria: "Çerez tercihleri",
  },
  "zh-Hans": {
    title: "tavnit.io 上的 Cookie",
    body: "我们使用 Google Analytics 了解哪些页面和功能有用。只有在您同意后才会启用。我们从不使用广告 Cookie。",
    privacy: "隐私政策",
    decline: "拒绝",
    accept: "接受",
    aria: "Cookie 偏好设置",
  },
  ja: {
    title: "tavnit.io の Cookie について",
    body: "どのページや機能が役立っているかを把握するため、Google Analytics を使用しています。同意された場合にのみ動作し、広告用 Cookie は一切使用しません。",
    privacy: "プライバシーポリシー",
    decline: "拒否する",
    accept: "同意する",
    aria: "Cookie の設定",
  },
  ko: {
    title: "tavnit.io의 쿠키",
    body: "어떤 페이지와 기능이 유용한지 파악하기 위해 Google Analytics를 사용합니다. 동의하신 경우에만 작동하며, 광고 쿠키는 절대 사용하지 않습니다.",
    privacy: "개인정보처리방침",
    decline: "거부",
    accept: "동의",
    aria: "쿠키 환경설정",
  },
};

/** The page's language from its path: /es/…, /<segment>/…, else English. */
function pathLocale(pathname: string | null): Locale {
  const first = (pathname ?? "/").split("/")[1] ?? "";
  if (first === "es") return "es";
  return localeFromSegment(first) ?? "en";
}

function CookieBanner() {
  // The banner is mounted once in the root layout, so it cannot take a locale
  // prop; the path is the only signal (/es/…, /<segment>/…).
  const locale = pathLocale(usePathname());
  const copy = BANNER_COPY[locale];
  // Server snapshot is "closed", so returning visitors never see a flash and
  // SSR/CSR markup stay identical; the client snapshot reads localStorage.
  const open = useSyncExternalStore(
    bannerStore.subscribe,
    bannerStore.getSnapshot,
    bannerStore.getServerSnapshot,
  );

  if (!open) return null;

  const choose = (choice: ConsentChoice) => writeConsent(choice);

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={copy.aria}
      lang={hreflangOf(locale)}
      className="fixed inset-x-3 bottom-3 sm:inset-x-auto sm:right-5 sm:bottom-5 sm:max-w-md z-[100] rounded-2xl border border-tint/10 bg-panel/95 backdrop-blur-md p-5 shadow-2xl shadow-black/50 text-sm text-fg-3"
    >
      <p className="font-heading font-semibold text-fg mb-1.5">{copy.title}</p>
      <p className="leading-relaxed">
        {copy.body}{" "}
        <Link href={locale === "es" ? "/es/privacidad" : "/privacy"} className="text-accent-2 hover:text-fg underline underline-offset-2">
          {copy.privacy}
        </Link>
      </p>
      <div className="mt-4 flex gap-2 justify-end">
        <button
          type="button"
          onClick={() => choose("denied")}
          className="px-4 py-2 rounded-lg border border-tint/15 text-fg-3 hover:bg-tint/5 hover:text-fg transition-colors"
        >
          {copy.decline}
        </button>
        <button
          type="button"
          onClick={() => choose("granted")}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white font-semibold hover:opacity-90 transition-opacity"
        >
          {copy.accept}
        </button>
      </div>
    </div>
  );
}
