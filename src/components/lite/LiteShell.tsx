import Image from "next/image";
import Link from "next/link";
import { Fraunces } from "next/font/google";
import type { Locale } from "@/lib/locale";
import { SHELL_COPY } from "@/lib/lite/copy";
import { LITE_HUB_PATHS } from "@/lib/lite/tools";
import { SUPPORT_EMAIL } from "@/lib/site";
import { AccountLink } from "@/components/lite/session";

/**
 * Light chrome for the free tools.
 *
 * The rest of the site is dark glass; Lite is a utility for someone who has
 * an invoice in hand and wants a spreadsheet, so it gets its own quiet shell:
 * warm paper background, a one-line header, a one-line footer. One typeface
 * with character (Fraunces) is reserved for the page title; everything else
 * stays in the site's sans. The header keeps the brand mark (the blue T
 * cropped from the site logo) with a text wordmark, because the logo's
 * wordmark is white.
 */

const display = Fraunces({
  subsets: ["latin"],
  weight: ["500"],
  style: ["normal"],
  variable: "--font-display",
  display: "swap",
});

export default function LiteShell({
  children,
  locale,
  alternatePath,
}: {
  children: React.ReactNode;
  locale: Locale;
  alternatePath: string;
}) {
  const t = SHELL_COPY[locale];
  const other: Locale = locale === "es" ? "en" : "es";
  return (
    <div lang={locale} className={`lite ${display.variable} flex min-h-svh flex-col font-body antialiased`}>
      <header className="sticky top-0 z-40 border-b border-[var(--lite-line)] bg-[var(--lite-paper)]/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[960px] items-center justify-between gap-4 px-4 sm:px-6">
          <Link
            href={LITE_HUB_PATHS[locale]}
            className="flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lite-blue)]/50"
          >
            <span className="relative block h-7 w-[26px] overflow-hidden" aria-hidden>
              <Image
                src="/assets/tavnit_logo.png"
                alt=""
                width={1287}
                height={444}
                className="absolute left-0 top-0 h-7 w-auto max-w-none"
                priority
              />
            </span>
            <span className="font-heading text-lg font-bold tracking-tight text-[var(--lite-ink)]">
              Tavnit
            </span>
            <span className="rounded-md bg-[var(--lite-violet-soft)] px-1.5 py-0.5 font-heading text-xs font-bold text-[var(--lite-violet)]">
              {t.lite}
            </span>
          </Link>

          <nav className="flex items-center gap-2 sm:gap-4" aria-label="Lite">
            <Link
              href={LITE_HUB_PATHS[locale]}
              className="hidden rounded-md px-2 py-1 text-sm font-medium text-[var(--lite-muted)] hover:text-[var(--lite-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lite-blue)]/50 sm:inline"
            >
              {t.tools}
            </Link>
            <Link
              href={locale === "es" ? "/es" : "/"}
              className="hidden rounded-md px-2 py-1 text-sm font-medium text-[var(--lite-muted)] hover:text-[var(--lite-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lite-blue)]/50 sm:inline"
            >
              {t.site}
            </Link>
            <Link
              href={alternatePath}
              hrefLang={other}
              lang={other}
              className="rounded-md px-2 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--lite-muted)] hover:text-[var(--lite-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lite-blue)]/50"
            >
              {other}
            </Link>
            <AccountLink
              guest={t.cta}
              member={t.ctaSignedIn}
              className="lite-brand lite-press inline-flex min-h-10 items-center rounded-lg px-4 text-sm font-semibold text-white shadow-sm shadow-[#3b82f6]/30 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lite-blue)]/50"
            />
          </nav>
        </div>
      </header>

      <main role="main" className="flex-1 pb-24 pt-12 sm:pt-16">
        {children}
      </main>

      <footer className="border-t border-[var(--lite-line)]">
        <div className="mx-auto flex max-w-[960px] flex-col gap-3 px-4 py-6 text-xs text-[var(--lite-muted)] sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {t.rights}
          </p>
          <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Legal">
            <Link href={t.privacyHref} className="hover:text-[var(--lite-ink)]">{t.privacy}</Link>
            <Link href={t.termsHref} className="hover:text-[var(--lite-ink)]">{t.terms}</Link>
            <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-[var(--lite-ink)]">{t.contact}</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
