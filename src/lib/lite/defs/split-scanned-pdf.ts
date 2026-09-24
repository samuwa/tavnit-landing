import type { LiteTool } from "@/lib/lite/tools";

/** Split a scanned bundle into its documents with a Splitter (language
 *  neutral: it classifies by the document descriptions). */
const splitScannedPdf: LiteTool = {
  id: "split-scanned-pdf",
  kind: "split",
  paths: { en: "/tools/split-scanned-pdf", es: "/es/herramientas/separar-pdf-escaneado" },
  columnOrder: { es: [], en: [] },
  lineFields: { es: [], en: [] },
  samplePaths: ["lite/sample-bundle.pdf"],
  maxPages: 12,
  split: {
    splitter: { env: "TAVNIT_LITE_SPLITTER_ID", value: "5f692a95-d6a7-4752-b09a-ff81d176f856" },
  },
};

export default splitScannedPdf;
