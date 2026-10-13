import { langParams, pageLocale, type LangParams } from "./_locale";

/**
 * The ten new languages: /<segment>/<English path> (lib/locales.ts,
 * lib/routes.ts). Pages here render the shared components with the
 * language's content (src/content/*); every route folder must be
 * registered in NEW_LOCALE_PATHS (lib/routes.ts) so it gets hreflang,
 * sitemap entries and switcher links.
 *
 * Only the listed languages are built; any other first segment that no
 * static route claims is a 404 (dynamicParams = false). The root layout
 * keeps <html lang="en">; MarketingPage / LiteShell set `lang` on the
 * content.
 */

export const dynamicParams = false;

export function generateStaticParams(): LangParams[] {
  return langParams();
}

export default async function LangLayout({ children, params }: { children: React.ReactNode; params: Promise<LangParams> }) {
  await pageLocale(params);
  return children;
}
