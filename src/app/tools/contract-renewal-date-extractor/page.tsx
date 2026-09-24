import LiteToolPage, { liteToolMetadata } from "@/components/lite/LiteToolPage";

/**
 * Free tool: contract key dates (English). A metadata-only Flow inside the
 * "Tavnit Lite" org; everything visible lives in src/lib/lite/copy/contract-dates.ts.
 * Spanish twin: /es/herramientas/fechas-de-renovacion-de-contratos.
 */

export const metadata = liteToolMetadata("contract-dates", "en");

export default function ContractDatesPage() {
  return <LiteToolPage toolId="contract-dates" locale="en" />;
}
