import Link from "next/link";
import { Fraunces } from "next/font/google";
import { hreflangOf, type Locale } from "@/lib/locales";
import { BASE_COPY, SHELL_COPY, TOOL_COPY } from "@/lib/lite/copy";
import { LITE_HUB_PATHS, LITE_TOOLS, LITE_TOOL_IDS } from "@/lib/lite/tools";
import { languageLinksFor, localizedPath } from "@/lib/routes";
import { SUPPORT_EMAIL } from "@/lib/site";
import LiteHeader, { type ShellLinks } from "@/components/lite/LiteHeader";

/** Main-site links from the Lite header: Spanish routes, the new languages'
 *  own pages where the [lang] tree has them, English otherwise. */
function shellLinks(locale: Locale): ShellLinks {
  if (locale === "es") return { product: "/es#como-funciona", useCases: "/es/casos-de-uso", docs: "/es/documentacion", demo: "/es/agendar" };
  return {
    product: locale === "en" ? "/#features" : localizedPath("/#how-it-works", locale),
    useCases: localizedPath("/use-cases", locale),
    docs: "/docs",
    demo: localizedPath("/schedule", locale),
  };
}

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
  subsets: ["latin", "latin-ext"],
  weight: ["500"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export default function LiteShell({
  children,
  locale,
  enPath,
}: {
  children: React.ReactNode;
  locale: Locale;
  /** English path of this page (the route registry key, src/lib/routes.ts). */
  enPath: string;
}) {
  const t = SHELL_COPY[locale];
  return (
    <div lang={hreflangOf(locale)} className={`lite ${display.variable} flex min-h-svh flex-col font-body antialiased`}>
      <LiteHeader
        locale={locale}
        languages={languageLinksFor(enPath)}
        links={shellLinks(locale)}
        hubPath={localizedPath(LITE_HUB_PATHS.en, locale)}
        tools={LITE_TOOL_IDS.map((id) => ({ id, kind: LITE_TOOLS[id].kind, href: localizedPath(LITE_TOOLS[id].paths.en, locale), label: TOOL_COPY[id][locale].label }))}
        t={t}
        authCopy={BASE_COPY[locale].auth}
      />

      <main role="main" className="flex-1 pb-24 pt-12 sm:pt-16">
        {children}
      </main>

      <footer className="border-t border-[var(--lite-line)]">
        <div className="mx-auto flex max-w-[1080px] flex-col gap-3 px-4 py-6 text-xs text-[var(--lite-muted)] sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {t.rights}
          </p>
          <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Legal">
            <Link href={localizedPath("/privacy", locale)} className="hover:text-[var(--lite-ink)]">{t.privacy}</Link>
            <Link href={localizedPath("/terms", locale)} className="hover:text-[var(--lite-ink)]">{t.terms}</Link>
            <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-[var(--lite-ink)]">{t.contact}</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
