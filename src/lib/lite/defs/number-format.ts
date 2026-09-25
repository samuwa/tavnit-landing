import type { LiteTool } from "@/lib/lite/tools";

/** Number format: the visitor's number columns through a number-formatting
 *  Cleaner, one per output format. Comma or point decimals are read by the
 *  landing first (lib/lite/clean.ts): the engine's parser drops commas. */
const numberFormat: LiteTool = {
  id: "number-format",
  kind: "clean",
  paths: { en: "/tools/fix-number-format-excel", es: "/es/herramientas/convertir-comas-a-puntos-excel" },
  columnOrder: { es: [], en: [] },
  lineFields: { es: [], en: [] },
  samplePaths: ["lite/sample-numbers.csv"],
  clean: {
    mode: "number",
    cleaners: {
      plain: { env: "TAVNIT_LITE_CLEANER_NUM_PLAIN", value: "ae6142e5-d82b-4770-9f73-42ded6129b5f" },
      us: { env: "TAVNIT_LITE_CLEANER_NUM_US", value: "665e70df-f246-43b7-8315-1eefcfeca5d4" },
      latam: { env: "TAVNIT_LITE_CLEANER_NUM_LATAM", value: "83042443-e913-4b2d-baac-25eddf25231b" },
    },
  },
};

export default numberFormat;
