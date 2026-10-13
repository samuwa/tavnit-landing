import SquaresBackground from "@/components/SquaresBackground";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { isStripeEnabled } from "@/lib/platform";
import { hreflangOf, type Locale } from "@/lib/locales";
import { languageLinksFor } from "@/lib/routes";

/**
 * Shell for standalone marketing routes (/pricing, /privacy, /terms, /es/*,
 * /<lang>/*).
 *
 * The homepage sections are scroll-snap targets driven by `#hero`, `#problem`
 * and friends in globals.css. Those IDs don't exist here, so these pages scroll
 * normally while keeping the same background, header and footer.
 *
 * `locale` switches the header and footer strings and routes, and sets
 * `lang` on everything visible (the root layout owns <html lang="en">; a
 * per-locale root layout would mean route groups and moving the whole tree).
 * `enPath` is the ENGLISH path of this page — the key of the route registry
 * (src/lib/routes.ts): the language switcher links every twin of it, and the
 * suggestion bar offers the visitor's detected language when a twin exists.
 * It must be the same path the page passes to `alternatesFor()`.
 */
export default async function MarketingPage({
  children,
  locale = "en",
  enPath,
}: {
  children: React.ReactNode;
  locale?: Locale;
  enPath: string;
}) {
  const stripeOn = await isStripeEnabled();
  const languages = languageLinksFor(enPath);
  return (
    <>
      <SquaresBackground />
      <div lang={hreflangOf(locale)}>
        <Header showPricing={stripeOn} locale={locale} languages={languages} />
        <main role="main" className="relative z-10 pt-28 pb-16 md:pt-36 md:pb-24">
          {children}
        </main>
        <Footer showPricing={stripeOn} locale={locale} />
      </div>
    </>
  );
}
