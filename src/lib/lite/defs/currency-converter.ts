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
    },
  },
};

export default currencyConverter;
