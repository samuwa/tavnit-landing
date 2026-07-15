"use client";

import Header from "@/components/Header";
import Hero, { ROWS as HERO_ROWS } from "@/components/Hero";
import Footer from "@/components/Footer";
import SheetProvider from "@/components/sheet/SheetProvider";
import FormulaBar from "@/components/sheet/FormulaBar";
import ColumnHeader from "@/components/sheet/ColumnHeader";
import SheetSection from "@/components/sheet/SheetSection";
import Cell from "@/components/sheet/Cell";
import SheetTabs from "@/components/SheetTabs";

export default function Home() {
  // Continuous row numbering across every band.
  let row = 1;
  const heroStart = row;
  row += HERO_ROWS;
  const stubStart = row;

  return (
    <SheetProvider>
      <Header />
      <div className="sheet-wrap">
        <FormulaBar />
        <ColumnHeader />

        <Hero startRow={heroStart} />

        {/* remaining bands are wired in once each section is converted */}
        <SheetSection id="stub" startRow={stubStart} rows={4}>
          <Cell c={2} span={8} r={2} rowSpan={2} variant="k-title" formula="=NEXT_BANDS()">
            More sheet bands land here.
          </Cell>
        </SheetSection>
      </div>

      <div style={{ height: "var(--chrome-bottom)" }} aria-hidden />
      <SheetTabs />
      <Footer />
    </SheetProvider>
  );
}
