"use client";

import Link from "next/link";
import { DocumentCanvas, DocPage } from "./DocumentShell";
import DocHero from "./DocHero";
import DocProblem from "./DocProblem";
import DocHowItWorks from "./DocHowItWorks";
import DocFeatures from "./DocFeatures";
import DocExtraction from "./DocExtraction";
import DocHumanInTheLoop from "./DocHumanInTheLoop";
import DocAgents from "./DocAgents";
import DocPlatform from "./DocPlatform";
import DocUseCases from "./DocUseCases";
import DocIntegrations from "./DocIntegrations";
import DocPricing from "./DocPricing";
import DocFAQ from "./DocFAQ";
import DocFinalCTA from "./DocFinalCTA";

/* The document view: a stack of paper pages inside the PDF reader, in the same
   narrative order as the spreadsheet bands. */
const PAGES = [
  DocHero,
  DocProblem,
  DocHowItWorks,
  DocFeatures,
  DocExtraction,
  DocHumanInTheLoop,
  DocAgents,
  DocPlatform,
  DocUseCases,
  DocIntegrations,
  DocPricing,
  DocFAQ,
  DocFinalCTA,
];

export default function DocumentSite() {
  const of = PAGES.length + 1; // + colophon
  return (
    <DocumentCanvas pages={of}>
      {PAGES.map((P, i) => (
        <P key={i} n={i + 1} of={of} />
      ))}

      {/* Colophon / document footer */}
      <DocPage id="colophon" n={of} of={of}>
        <div className="doc-eyebrow">Colophon</div>
        <h2>Tavnit</h2>
        <p className="doc-lead">
          AI document operations — extract, clean, review, and act on data from any document.
        </p>
        <div className="doc-cols">
          <div>
            <h3>Company</h3>
            <ul>
              <li><Link href="mailto:support@tavnit.com">Contact</Link></li>
              <li><Link href="#agents">Agents</Link></li>
              <li><Link href="#human-in-the-loop">Human in the Loop</Link></li>
              <li><Link href="#faq">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3>Resources</h3>
            <ul>
              <li><Link href="#use-cases">Use Cases</Link></li>
              <li><Link href="/docs">Documentation</Link></li>
              <li><Link href="https://github.com/tavnit">GitHub</Link></li>
              <li><Link href="https://app.tavnit.io">Sign In</Link></li>
            </ul>
          </div>
        </div>
        <hr />
        <p style={{ fontSize: 13, color: "var(--muted)" }}>
          &copy; 2026 Tavnit. All rights reserved. · support@tavnit.com
        </p>
      </DocPage>
    </DocumentCanvas>
  );
}
