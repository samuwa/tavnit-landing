"use client";

import { DocumentCanvas, DocPage } from "./DocumentShell";
import DocHero from "./DocHero";

/* The document view: a stack of paper pages inside the PDF reader. Each page
   component receives its page number and the total. (More pages added as the
   document sections are built.) */
const PAGES = [DocHero] as const;

export default function DocumentSite() {
  const of = PAGES.length + 1;
  return (
    <DocumentCanvas pages={of}>
      {PAGES.map((P, i) => (
        <P key={i} n={i + 1} of={of} />
      ))}

      {/* temporary page to validate the reader + transition */}
      <DocPage id="stub" n={PAGES.length + 1} of={of}>
        <h2>More pages land here.</h2>
        <p className="doc-lead">
          The rest of the document is being typeset. Hit Extract to see the spreadsheet.
        </p>
      </DocPage>
    </DocumentCanvas>
  );
}
