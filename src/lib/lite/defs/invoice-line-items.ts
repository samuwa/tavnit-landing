import type { LiteTool } from "@/lib/lite/tools";
import invoiceToExcel from "@/lib/lite/defs/invoice-to-excel";

/** Invoice line-item extractor: the same Flow as invoice → Excel behind a
 *  page written for the people who search for "line item extraction". */
const invoiceLineItems: LiteTool = {
  ...invoiceToExcel,
  id: "invoice-line-items",
  paths: { en: "/tools/invoice-line-item-extractor", es: "/es/herramientas/extraer-lineas-de-factura" },
};

export default invoiceLineItems;
