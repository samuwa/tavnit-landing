import SquaresBackground from "@/components/SquaresBackground";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/**
 * Shell for standalone marketing routes (/pricing, /privacy, /terms).
 *
 * The homepage sections are scroll-snap targets driven by `#hero`, `#problem`
 * and friends in globals.css. Those IDs don't exist here, so these pages scroll
 * normally while keeping the same background, header and footer.
 */
export default function MarketingPage({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SquaresBackground />
      <Header />
      <main role="main" className="relative z-10 pt-28 pb-16 md:pt-36 md:pb-24">
        {children}
      </main>
      <Footer />
    </>
  );
}
