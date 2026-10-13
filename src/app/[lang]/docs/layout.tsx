import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DocsShell from "@/components/docs/DocsShell";
import { DOCS_EMBED_SCRIPT } from "@/components/docs/embed";
import { docsDescription, docsShellData } from "@/components/docs/i18n";
import { docsRootSchema } from "@/lib/schema";
import { docsLocales } from "@/content/docs";
import { pageLocale, type LangParams } from "../_locale";

/**
 * Docs in the new languages: /<segment>/docs/<English slug>, the twin of
 * src/app/docs/layout.tsx and src/app/es/documentacion/layout.tsx. Only the
 * pages translated into the language exist (src/content/docs registry);
 * the sidebar lists every docs page and sends the untranslated ones to
 * their English URL with an "EN" badge. A language without docs is a 404.
 *
 * The app frames these pages (`?embed=1`, components/docs/embed.ts); their
 * frame-ancestors header is in next.config.ts.
 */

export async function generateMetadata({ params }: { params: Promise<LangParams> }): Promise<Metadata> {
  const locale = await pageLocale(params);
  const description = docsDescription(locale);
  return description ? { description } : {};
}

export default async function LangDocsLayout({ children, params }: { children: React.ReactNode; params: Promise<LangParams> }) {
  const locale = await pageLocale(params);
  if (!docsLocales().includes(locale)) notFound();
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: DOCS_EMBED_SCRIPT }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(docsRootSchema(locale)) }}
      />
      <DocsShell data={docsShellData(locale)}>{children}</DocsShell>
    </>
  );
}
