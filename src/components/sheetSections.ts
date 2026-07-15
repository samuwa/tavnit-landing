export interface SheetSection {
  id: string;
  tab: string;
  cellRef: string;
  formula: string;
}

/* One entry per landing-page section, in page order. The cell reference
   walks diagonally down the sheet as the visitor scrolls. */
export const SHEET_SECTIONS: SheetSection[] = [
  { id: "hero", tab: "Home", cellRef: "A1", formula: "=TAVNIT(anything.pdf)  // documents → structured data" },
  { id: "problem", tab: "Problem", cellRef: "B2", formula: "=IFERROR(manual_entry, tavnit)" },
  { id: "how-it-works", tab: "How it works", cellRef: "C3", formula: "=PIPELINE(extract, review, act)" },
  { id: "features", tab: "Features", cellRef: "D4", formula: "=FEATURES()  // everything included" },
  { id: "extraction", tab: "Extraction", cellRef: "E5", formula: "=EXTRACT(document.pdf)  // any format, any layout" },
  { id: "human-in-the-loop", tab: "Review", cellRef: "F6", formula: "=REVIEW(run, your_team)  // human in the loop" },
  { id: "agents", tab: "Agents", cellRef: "G7", formula: '=AGENT("mission", start_url)  // browser automation' },
  { id: "platform-overview", tab: "Platform", cellRef: "H8", formula: "=PLATFORM(flows, buckets, charts)" },
  { id: "use-cases", tab: "Use cases", cellRef: "I9", formula: "=MATCH(your_workflow, use_cases, 0)" },
  { id: "integrations", tab: "Integrations", cellRef: "J10", formula: "=CONNECT(api, webhooks, mcp)" },
  { id: "pricing", tab: "Pricing", cellRef: "K11", formula: "=PRICE(pages)  // 1 credit = 1 page" },
  { id: "faq", tab: "FAQ", cellRef: "L12", formula: "=VLOOKUP(question, answers, 2)" },
  { id: "get-started", tab: "Start", cellRef: "M13", formula: "=SIGNUP()  // free credits to start" },
];
