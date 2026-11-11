import type { LiteTool } from "@/lib/lite/tools";

/**
 * The Custom Tool: the visitor's own extractor. Unlike every other tool it
 * has no fixed Flow — the assistant reads a sample document, proposes the
 * columns, and the landing creates a Flow for that visitor in the Lite org
 * (lib/lite/custom.ts, custom-server.ts). So there is no flow id, column
 * order or sample here: they come from the visitor's tool at run time.
 */
const customExtractor: LiteTool = {
  id: "custom-extractor",
  kind: "extract",
  custom: true,
  paths: { en: "/tools/custom-extractor", es: "/es/herramientas/extractor-a-la-medida" },
  columnOrder: { es: [], en: [] },
  lineFields: { es: [], en: [] },
};

export default customExtractor;
