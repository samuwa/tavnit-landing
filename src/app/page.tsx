"use client";

import ViewModeProvider, { useViewMode, ViewMode } from "@/components/view/ViewModeProvider";
import WipeStage from "@/components/view/WipeStage";
import SheetSite from "@/components/SheetSite";
import DocumentSite from "@/components/document/DocumentSite";

function Site({ mode }: { mode: ViewMode }) {
  return mode === "document" ? <DocumentSite /> : <SheetSite />;
}

function Workbook() {
  const { mode, leaving } = useViewMode();
  return (
    <>
      <Site mode={mode} />
      {leaving && (
        <WipeStage>
          <Site mode={leaving} />
        </WipeStage>
      )}
    </>
  );
}

export default function Home() {
  return (
    <ViewModeProvider>
      <Workbook />
    </ViewModeProvider>
  );
}
