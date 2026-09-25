import type { LiteTool } from "@/lib/lite/tools";

/** Currency converter: the visitor's amount columns through a currency
 *  Cleaner, one per target currency, rates of the day from the ECB
 *  (Frankfurter). Derived fields: in_n → out_n, added as a new column next
 *  to each source. Amounts are normalised by the landing and sent with the
 *  visitor's source currency code ("1234.56 EUR"), lib/lite/clean.ts. */
const currencyConverter: LiteTool = {
  id: "currency-converter",
  kind: "clean",
  paths: { en: "/tools/convert-currency-excel", es: "/es/herramientas/convertir-moneda-excel" },
  columnOrder: { es: [], en: [] },
  lineFields: { es: [], en: [] },
  samplePaths: ["lite/sample-prices.csv"],
  clean: {
    mode: "currency",
    cleaners: {
      USD: { env: "TAVNIT_LITE_CLEANER_CUR_USD", value: "33b11d72-617a-490f-9fc0-cf16b5af3897" },
      EUR: { env: "TAVNIT_LITE_CLEANER_CUR_EUR", value: "f1763fe8-1e6a-4e70-87e4-75590da84b25" },
      GBP: { env: "TAVNIT_LITE_CLEANER_CUR_GBP", value: "4764c580-89ce-4818-8ded-eb109eae4c89" },
      MXN: { env: "TAVNIT_LITE_CLEANER_CUR_MXN", value: "8cec58a7-0bac-4f43-83c6-1ebfc78f4ef9" },
      BRL: { env: "TAVNIT_LITE_CLEANER_CUR_BRL", value: "e0e11b6d-b7fa-489e-9d33-50ad210f313a" },
      CNY: { env: "TAVNIT_LITE_CLEANER_CUR_CNY", value: "128af014-8b11-4cb0-b02a-d0d35c682631" },
      AUD: { env: "TAVNIT_LITE_CLEANER_CUR_AUD", value: "681f265b-bd4f-4788-a546-abb358cf0060" },
      CAD: { env: "TAVNIT_LITE_CLEANER_CUR_CAD", value: "64802973-04b2-489d-b673-df7060e0446d" },
      CHF: { env: "TAVNIT_LITE_CLEANER_CUR_CHF", value: "7f5753ac-b349-4881-a801-d7658ac5d1c2" },
      CZK: { env: "TAVNIT_LITE_CLEANER_CUR_CZK", value: "132d978e-ae16-4c0f-bf0a-e4a8b9fa72d4" },
      DKK: { env: "TAVNIT_LITE_CLEANER_CUR_DKK", value: "e88a25fa-5380-4b12-94b3-0e7f97bdd180" },
      HKD: { env: "TAVNIT_LITE_CLEANER_CUR_HKD", value: "05c32f24-56c1-40cd-b236-44915fee04b2" },
      HUF: { env: "TAVNIT_LITE_CLEANER_CUR_HUF", value: "61f095a3-c753-4397-bcde-fe13c3c0db12" },
      IDR: { env: "TAVNIT_LITE_CLEANER_CUR_IDR", value: "45903e60-81eb-405a-a12c-ea3096d42004" },
      ILS: { env: "TAVNIT_LITE_CLEANER_CUR_ILS", value: "0e02af12-28a5-44d8-941d-aa5bdf1b088d" },
      INR: { env: "TAVNIT_LITE_CLEANER_CUR_INR", value: "0e2935d9-e564-4ae6-b517-75219b63d4e5" },
      ISK: { env: "TAVNIT_LITE_CLEANER_CUR_ISK", value: "1db7420e-55d2-471e-a6cf-4745de8ddccf" },
      JPY: { env: "TAVNIT_LITE_CLEANER_CUR_JPY", value: "d398808d-cba6-4f0b-8ded-c3861d501f52" },
      KRW: { env: "TAVNIT_LITE_CLEANER_CUR_KRW", value: "be8480d7-7870-4318-a360-69ec4fae6782" },
      MYR: { env: "TAVNIT_LITE_CLEANER_CUR_MYR", value: "392292be-d735-4767-93bf-c230c97feff3" },
      NOK: { env: "TAVNIT_LITE_CLEANER_CUR_NOK", value: "7d730094-d617-4dcb-9160-a89d33fc1b7b" },
      NZD: { env: "TAVNIT_LITE_CLEANER_CUR_NZD", value: "0e99ae28-ccf2-46a4-94e3-26c33d0c1499" },
      PHP: { env: "TAVNIT_LITE_CLEANER_CUR_PHP", value: "866d34d1-20ec-4bbc-91db-c40c4d328574" },
      PLN: { env: "TAVNIT_LITE_CLEANER_CUR_PLN", value: "7cf96045-503c-4518-a5ea-644fe0448ba5" },
      RON: { env: "TAVNIT_LITE_CLEANER_CUR_RON", value: "7693e62a-020d-4c77-8d60-c6edd5a0f876" },
      SEK: { env: "TAVNIT_LITE_CLEANER_CUR_SEK", value: "42681f4f-d9bb-4e04-bcf8-ec612895abbf" },
      SGD: { env: "TAVNIT_LITE_CLEANER_CUR_SGD", value: "f0491388-7e07-4028-ba66-932153df1caf" },
      THB: { env: "TAVNIT_LITE_CLEANER_CUR_THB", value: "99f69801-0b71-482a-8e00-b96802d91d31" },
      TRY: { env: "TAVNIT_LITE_CLEANER_CUR_TRY", value: "9d874ff3-dc63-49ae-9072-2e38c13d195a" },
      ZAR: { env: "TAVNIT_LITE_CLEANER_CUR_ZAR", value: "def85b5c-2471-4f96-b7e5-7fe671d99528" },
    },
  },
};

export default currencyConverter;
