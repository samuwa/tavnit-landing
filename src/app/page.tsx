"use client";

import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import HowItWorks from "@/components/HowItWorks";
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
import SheetTabs from "@/components/SheetTabs";

const Squares = dynamic(() => import("@/components/Squares"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      {/* Fixed Squares background — animated spreadsheet grid on paper */}
      <div className="fixed inset-0 -z-10 bg-[#FBFBF9]">
        <Squares
          direction="diagonal"
          speed={0.17}
          borderColor="#E7E9EE"
          squareSize={45}
          hoverFillColor="#FFF6DE"
          vignetteColor="#FBFBF9"
        />
      </div>

      <Header />
      <main role="main">
        <Hero />
        <Problem />
        <HowItWorks />
        <Features />
        <ExtractionShowcase />
        <HumanInTheLoop />
        <AgentsShowcase />
        <PlatformOverview />
        <UseCases />
        <Integrations />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      {/* Spacer so the footer clears the fixed sheet-tab / status bars */}
      <div style={{ height: "var(--chrome-bottom)" }} aria-hidden />
      <SheetTabs />
    </>
  );
}
