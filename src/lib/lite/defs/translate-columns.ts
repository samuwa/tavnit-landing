import type { LiteTool } from "@/lib/lite/tools";

/** Translate columns: the visitor's text columns through a translation
 *  Cleaner, one per target language (the source language is detected).
 *  Derived fields: in_n → out_n, added as a new column next to each source.
 *  Every cell goes through a model, so the free limit is lower (200 rows). */
const translateColumns: LiteTool = {
  id: "translate-columns",
  kind: "clean",
  paths: { en: "/tools/translate-excel-columns", es: "/es/herramientas/traducir-excel" },
  columnOrder: { es: [], en: [] },
  lineFields: { es: [], en: [] },
  samplePaths: ["lite/sample-products.csv"],
  clean: {
    mode: "translate",
    cleaners: {
      en: { env: "TAVNIT_LITE_CLEANER_TR_EN", value: "79981315-2c66-48a0-9943-323eaff3e196" },
      es: { env: "TAVNIT_LITE_CLEANER_TR_ES", value: "f9d6f8cc-fe61-484c-9362-6cc7b2fabf20" },
      pt: { env: "TAVNIT_LITE_CLEANER_TR_PT", value: "f99b91a1-ae9d-48cd-a968-4faa1b231aab" },
      fr: { env: "TAVNIT_LITE_CLEANER_TR_FR", value: "0f90807b-513c-4960-8f89-47bef9249f86" },
      de: { env: "TAVNIT_LITE_CLEANER_TR_DE", value: "d28334a2-92fe-44ba-8221-42aeb4b6b6de" },
      zh: { env: "TAVNIT_LITE_CLEANER_TR_ZH", value: "7be2d396-69e2-43da-9c51-11e5151aa8d5" },
    },
  },
};

export default translateColumns;
