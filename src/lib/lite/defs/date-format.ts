import type { LiteTool } from "@/lib/lite/tools";

/** Date format: the visitor's date columns through a date-formatting
 *  Cleaner, one per output format. Numeric dates are turned into ISO by the
 *  landing with the visitor's day/month order; dates written in words go as
 *  they are and the Cleaner's AI conversion reads them. */
const dateFormat: LiteTool = {
  id: "date-format",
  kind: "clean",
  paths: { en: "/tools/fix-date-format-excel", es: "/es/herramientas/cambiar-formato-de-fecha-excel" },
  columnOrder: { es: [], en: [] },
  lineFields: { es: [], en: [] },
  samplePaths: ["lite/sample-dates.csv"],
  clean: {
    mode: "date",
    cleaners: {
      iso: { env: "TAVNIT_LITE_CLEANER_DATE_ISO", value: "e4a0006f-ed7d-4bd8-b831-8ebaa4f6e8fc" },
      dmy: { env: "TAVNIT_LITE_CLEANER_DATE_DMY", value: "85f5fb7c-c4e5-4d35-8def-18f86b670be0" },
      mdy: { env: "TAVNIT_LITE_CLEANER_DATE_MDY", value: "f77f582b-96ae-4fe6-9f45-928808ccd2f9" },
    },
  },
};

export default dateFormat;
