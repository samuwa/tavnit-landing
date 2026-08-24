import SquaresBackground from "@/components/SquaresBackground";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { isStripeEnabled } from "@/lib/platform";

/**
 * Shell for standalone marketing routes (/pricing, /privacy, /terms).
 *
 * The homepage sections are scroll-snap targets driven by `#hero`, `#problem`
 * and friends in globals.css. Those IDs don't exist here, so these pages scroll
 * normally while keeping the same background, header and footer.
 */
export default async function MarketingPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const stripeOn = await isStripeEnabled();
  return (
    <>
      <SquaresBackground />
      <Header showPricing={stripeOn} />
      <main role="main" className="relative z-10 pt-28 pb-16 md:pt-36 md:pb-24">
        {children}
      </main>
      <Footer showPricing={stripeOn} />
    </>
  );
}
