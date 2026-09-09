import SquaresBackground from "@/components/SquaresBackground";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { isStripeEnabled } from "@/lib/platform";
import type { Locale } from "@/lib/locale";

/**
 * Shell for standalone marketing routes (/pricing, /privacy, /terms, /es/*).
 *
 * The homepage sections are scroll-snap targets driven by `#hero`, `#problem`
 * and friends in globals.css. Those IDs don't exist here, so these pages scroll
 * normally while keeping the same background, header and footer.
 *
 * `locale` switches the header and footer to Spanish strings and Spanish
 * routes, and sets lang="es" on everything visible (the root layout owns
 * <html lang="en">; a per-locale root layout would mean route groups and
 * moving the whole tree). `alternatePath` is the other language's URL for
 * this page — it feeds the EN/ES switch in the header and must be the same
 * URL the page declares in `alternates.languages`.
 */
export default async function MarketingPage({
  children,
  locale = "en",
  alternatePath,
}: {
  children: React.ReactNode;
  locale?: Locale;
  alternatePath?: string;
}) {
  const stripeOn = await isStripeEnabled();
  const alternate = alternatePath ?? (locale === "es" ? "/" : "/es");
  return (
    <>
      <SquaresBackground />
      <div lang={locale}>
        <Header showPricing={stripeOn} locale={locale} alternateHref={alternate} />
        <main role="main" className="relative z-10 pt-28 pb-16 md:pt-36 md:pb-24">
          {children}
        </main>
        <Footer showPricing={stripeOn} locale={locale} />
      </div>
    </>
  );
}
