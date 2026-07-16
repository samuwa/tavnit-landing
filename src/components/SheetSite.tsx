"use client";

import Header from "@/components/Header";
import Hero, { ROWS as HeroRows } from "@/components/Hero";
import Problem, { ROWS as ProblemRows } from "@/components/Problem";
import HowItWorks, { ROWS as HowItWorksRows } from "@/components/HowItWorks";
import Features, { ROWS as FeaturesRows } from "@/components/Features";
import ExtractionShowcase, { ROWS as ExtractionRows } from "@/components/ExtractionShowcase";
import HumanInTheLoop, { ROWS as HitlRows } from "@/components/HumanInTheLoop";
import AgentsShowcase, { ROWS as AgentsRows } from "@/components/AgentsShowcase";
import PlatformOverview, { ROWS as PlatformRows } from "@/components/PlatformOverview";
import UseCases, { ROWS as UseCasesRows } from "@/components/UseCases";
import Integrations, { ROWS as IntegrationsRows } from "@/components/Integrations";
import Pricing, { ROWS as PricingRows } from "@/components/Pricing";
import FAQ, { ROWS as FaqRows } from "@/components/FAQ";
import FinalCTA, { ROWS as FinalCtaRows } from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import SheetProvider from "@/components/sheet/SheetProvider";
import FormulaBar from "@/components/sheet/FormulaBar";
import ColumnHeader from "@/components/sheet/ColumnHeader";
import SheetTabs from "@/components/SheetTabs";

/* The spreadsheet view: the whole page as one workbook. Bands are placed in
   document order and the running row counter chains the row numbers
   continuously from band to band. */
const BANDS = [
  { C: Hero, rows: HeroRows },
  { C: Problem, rows: ProblemRows },
  { C: HowItWorks, rows: HowItWorksRows },
  { C: Features, rows: FeaturesRows },
  { C: ExtractionShowcase, rows: ExtractionRows },
  { C: HumanInTheLoop, rows: HitlRows },
  { C: AgentsShowcase, rows: AgentsRows },
  { C: PlatformOverview, rows: PlatformRows },
  { C: UseCases, rows: UseCasesRows },
  { C: Integrations, rows: IntegrationsRows },
  { C: Pricing, rows: PricingRows },
  { C: FAQ, rows: FaqRows },
  { C: FinalCTA, rows: FinalCtaRows },
] as const;

export default function SheetSite() {
  let row = 1;
  const placed = BANDS.map(({ C, rows }, i) => {
    const startRow = row;
    row += rows;
    return <C key={i} startRow={startRow} />;
  });

  return (
    <SheetProvider>
      <Header />
      <div className="sheet-wrap">
        <FormulaBar />
        <ColumnHeader />
        {placed}
      </div>

      <div style={{ height: "var(--chrome-bottom)" }} aria-hidden />
      <SheetTabs />
      <Footer />
    </SheetProvider>
  );
}
