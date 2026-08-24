import SquaresBackground from "@/components/SquaresBackground";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import HowItWorks from "@/components/HowItWorks";
import LiveDemo from "@/components/LiveDemo";
import Features from "@/components/Features";
import ExtractionShowcase from "@/components/ExtractionShowcase";
import AgentsShowcase from "@/components/AgentsShowcase";
import HumanInTheLoop from "@/components/HumanInTheLoop";
import PlatformOverview from "@/components/PlatformOverview";
import UseCases from "@/components/UseCases";
import Integrations from "@/components/Integrations";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import { homeSchema } from "@/lib/schema";
import { isStripeEnabled } from "@/lib/platform";

export default async function Home() {
  // Pricing (section + nav/footer links) only shows while Stripe self-serve
  // is on platform-wide; otherwise prospects go through book-a-demo.
  const stripeOn = await isStripeEnabled();
  return (
    <>
      {/* Page-level JSON-LD (WebPage, BreadcrumbList, FAQPage). Site-wide
          entities live in the root layout. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema()) }}
      />

      <SquaresBackground />

      <Header showPricing={stripeOn} />
      <main role="main">
        <Hero />
        <Problem />
        <HowItWorks />
        <LiveDemo />
        <Features />
        <ExtractionShowcase />
        <HumanInTheLoop />
        <AgentsShowcase />
        <PlatformOverview />
        <UseCases />
        <Integrations />
        {stripeOn && <Pricing />}
        <FAQ />
        <FinalCTA />
      </main>
      <Footer showPricing={stripeOn} />
    </>
  );
}
