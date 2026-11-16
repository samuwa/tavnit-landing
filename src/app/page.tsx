import SquaresBackground from "@/components/SquaresBackground";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PipelineStory from "@/components/PipelineStory";
import Features from "@/components/Features";
import PlatformOverview from "@/components/PlatformOverview";
import UseCases from "@/components/UseCases";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import { homeSchema } from "@/lib/schema";
import { isStripeEnabled } from "@/lib/platform";
import { faqsFor } from "@/lib/faqs";

export default async function Home() {
  // Pricing (section + nav/footer links) only shows while Stripe self-serve
  // is on platform-wide; otherwise prospects go through book-a-demo.
  const stripeOn = await isStripeEnabled();
  // The pricing FAQ follows the same gate, on the page and in the JSON-LD.
  const faqs = faqsFor(stripeOn);
  return (
    <>
      {/* Page-level JSON-LD (WebPage, BreadcrumbList, FAQPage). Site-wide
          entities live in the root layout. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema(faqs)) }}
      />

      <SquaresBackground />

      <Header showPricing={stripeOn} />
      <main role="main">
        {/* One question per section, in the order a visitor asks them:
            what is it, how does it work, is it real, what else is there,
            is it for me. The page used to answer "how does it work" five
            times (a feature grid, an integrations diagram, a demo
            screenshot and four use-case mock-ups, on top of the story). */}
        <Hero />
        <PipelineStory />
        <PlatformOverview />
        <Features />
        <UseCases />
        {stripeOn && <Pricing />}
        <FAQ faqs={faqs} />
        <FinalCTA />
      </main>
      <Footer showPricing={stripeOn} />
    </>
  );
}
