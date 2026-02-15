"use client";

import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import PlatformOverview from "@/components/PlatformOverview";
import UseCases from "@/components/UseCases";
import Integrations from "@/components/Integrations";
import Pricing from "@/components/Pricing";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Squares = dynamic(() => import("@/components/Squares"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      {/* Fixed Squares background */}
      <div className="fixed inset-0 -z-10 bg-[#0a0a1a]">
        <Squares
          direction="diagonal"
          speed={0.17}
          borderColor="#271E37"
          squareSize={45}
          hoverFillColor="#222"
        />
      </div>

      <Header />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <Features />
        <PlatformOverview />
        <UseCases />
        <Integrations />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
