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
      ar: { env: "TAVNIT_LITE_CLEANER_TR_AR", value: "10ad217b-17db-4f52-855c-336a8da91fed" },
      bg: { env: "TAVNIT_LITE_CLEANER_TR_BG", value: "fe9cf34a-f18b-4736-9432-081a3692eedc" },
      bn: { env: "TAVNIT_LITE_CLEANER_TR_BN", value: "1949d19e-a094-40a5-aa56-1352998d6221" },
      ca: { env: "TAVNIT_LITE_CLEANER_TR_CA", value: "21ab5711-56e8-45d3-9919-b84a67802d16" },
      cs: { env: "TAVNIT_LITE_CLEANER_TR_CS", value: "f3869559-9872-4a24-9e09-eb4f53f9e623" },
      da: { env: "TAVNIT_LITE_CLEANER_TR_DA", value: "194b0148-339d-464c-aff3-bf43db83d898" },
      el: { env: "TAVNIT_LITE_CLEANER_TR_EL", value: "ac77c53a-113a-42c7-9d53-1afffa726295" },
      et: { env: "TAVNIT_LITE_CLEANER_TR_ET", value: "3eb4db3e-7665-4990-9f3e-6f37e942d053" },
      fa: { env: "TAVNIT_LITE_CLEANER_TR_FA", value: "b5bdaa72-0b09-4086-860f-ed35d28dbc8b" },
      fi: { env: "TAVNIT_LITE_CLEANER_TR_FI", value: "71d39d45-eafc-4a6d-aeef-5abd581329a7" },
      he: { env: "TAVNIT_LITE_CLEANER_TR_HE", value: "f6263c61-46e8-4620-bbd5-1f3b00a9062e" },
      hi: { env: "TAVNIT_LITE_CLEANER_TR_HI", value: "008137c9-78f7-4184-b095-38d01b5b523c" },
      hr: { env: "TAVNIT_LITE_CLEANER_TR_HR", value: "4b6ba158-393f-4ae9-ab76-68c6d5f7a683" },
      hu: { env: "TAVNIT_LITE_CLEANER_TR_HU", value: "a51212bf-7624-4eb9-b515-4b433614cd61" },
      id: { env: "TAVNIT_LITE_CLEANER_TR_ID", value: "73ebf597-ef47-4df6-a59b-887ef9452e07" },
      it: { env: "TAVNIT_LITE_CLEANER_TR_IT", value: "05e6c99f-a281-4b08-abea-dfe87583c5b3" },
      ja: { env: "TAVNIT_LITE_CLEANER_TR_JA", value: "e6250d5c-a815-4694-b923-ce94e9e69e01" },
      ko: { env: "TAVNIT_LITE_CLEANER_TR_KO", value: "05269e1c-cb1f-43e0-b323-957d61a56b47" },
      lt: { env: "TAVNIT_LITE_CLEANER_TR_LT", value: "93039e9e-b7d4-427d-ac80-31fc1afc6a2a" },
      lv: { env: "TAVNIT_LITE_CLEANER_TR_LV", value: "3b3d4661-d248-4be5-aedb-826d052e1451" },
      ms: { env: "TAVNIT_LITE_CLEANER_TR_MS", value: "70e14054-6a0c-49ab-9090-e03aaf7229c1" },
      nl: { env: "TAVNIT_LITE_CLEANER_TR_NL", value: "dca5affb-0cb4-4c23-af36-31ceeb893392" },
      no: { env: "TAVNIT_LITE_CLEANER_TR_NO", value: "568829b4-bdb8-460f-b197-77d212900c33" },
      pl: { env: "TAVNIT_LITE_CLEANER_TR_PL", value: "a215ffeb-6638-47c3-a989-fe2d6fe97ab5" },
      ro: { env: "TAVNIT_LITE_CLEANER_TR_RO", value: "fe686cfc-41c1-4f49-b2ab-b76c388b3af1" },
      ru: { env: "TAVNIT_LITE_CLEANER_TR_RU", value: "ad988548-1a95-491a-ac84-b80eb67aa960" },
      sk: { env: "TAVNIT_LITE_CLEANER_TR_SK", value: "286494cd-2983-4117-9097-dc3147d8fbc4" },
      sl: { env: "TAVNIT_LITE_CLEANER_TR_SL", value: "5dcdedb6-97c9-4920-b2d4-d7523cb8b302" },
      sr: { env: "TAVNIT_LITE_CLEANER_TR_SR", value: "6fcacb6a-5f06-41e0-bc24-f48ee4e550fc" },
      sv: { env: "TAVNIT_LITE_CLEANER_TR_SV", value: "603dfece-87eb-47c7-9e96-f24a7700ce0a" },
      sw: { env: "TAVNIT_LITE_CLEANER_TR_SW", value: "61656dec-ff92-4d79-8b32-2dcc382e06ac" },
      th: { env: "TAVNIT_LITE_CLEANER_TR_TH", value: "da052137-08e1-41b1-85d3-43729550719b" },
      tl: { env: "TAVNIT_LITE_CLEANER_TR_TL", value: "514ca51d-0f32-4d4d-b66a-7b6ae920967e" },
      tr: { env: "TAVNIT_LITE_CLEANER_TR_TR", value: "824f46d7-00de-43d8-8e4b-d28e8833fb54" },
      uk: { env: "TAVNIT_LITE_CLEANER_TR_UK", value: "76842858-adbf-4550-8897-8b20dd5b2a15" },
      ur: { env: "TAVNIT_LITE_CLEANER_TR_UR", value: "48997f94-5c51-4ac8-ab73-80987806b6cf" },
      vi: { env: "TAVNIT_LITE_CLEANER_TR_VI", value: "cf34cbd6-f320-4e82-b481-91a4fc7022a4" },
    },
  },
};

export default translateColumns;
