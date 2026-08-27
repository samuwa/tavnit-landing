"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import Script from "next/script";
import { GA_ID, bannerStore, writeConsent, type ConsentChoice } from "@/lib/analytics";

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

function CookieBanner() {
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
      aria-label="Cookie preferences"
      className="fixed inset-x-3 bottom-3 sm:inset-x-auto sm:right-5 sm:bottom-5 sm:max-w-md z-[100] rounded-2xl border border-white/10 bg-[#0b0d16]/95 backdrop-blur-md p-5 shadow-2xl shadow-black/50 text-sm text-gray-300"
    >
      <p className="font-heading font-semibold text-white mb-1.5">Cookies on tavnit.io</p>
      <p className="leading-relaxed">
        We use Google Analytics to understand which pages and features are useful.
        It only runs if you accept. No advertising cookies, ever.{" "}
        <Link href="/privacy" className="text-[#8fa2ff] hover:text-white underline underline-offset-2">
          Privacy policy
        </Link>
      </p>
      <div className="mt-4 flex gap-2 justify-end">
        <button
          type="button"
          onClick={() => choose("denied")}
          className="px-4 py-2 rounded-lg border border-white/15 text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
        >
          Decline
        </button>
        <button
          type="button"
          onClick={() => choose("granted")}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white font-semibold hover:opacity-90 transition-opacity"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
