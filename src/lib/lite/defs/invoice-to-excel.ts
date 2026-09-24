import type { LiteTool } from "@/lib/lite/tools";

/** Invoice → Excel: header + line items of any invoice. The first tool; the
 *  base copy was written for it. */
const invoiceToExcel: LiteTool = {
  id: "invoice-to-excel",
  kind: "extract",
  paths: { en: "/tools/invoice-to-excel", es: "/es/herramientas/factura-a-excel" },
  flow: { env: { es: "TAVNIT_LITE_INVOICE_FLOW_ID", en: "TAVNIT_LITE_INVOICE_FLOW_ID_EN" }, value: { es: "105a016a-c21d-4b07-9b29-89399bd00cf4", en: "d20676f1-4183-4dd0-bac6-a32727d4d7f5" } },
  columnOrder: {
    es: ["proveedor", "ruc_proveedor", "numero_factura", "fecha", "moneda", "descripcion", "cantidad", "unidad", "precio_unitario", "total_linea", "subtotal", "impuesto", "total"],
    en: ["vendor", "vendor_tax_id", "invoice_number", "invoice_date", "currency", "description", "quantity", "unit", "unit_price", "line_total", "subtotal", "tax", "total"],
  },
  lineFields: {
    es: ["descripcion", "cantidad", "unidad", "precio_unitario", "total_linea"],
    en: ["description", "quantity", "unit", "unit_price", "line_total"],
  },
  samplePaths: ["lite/sample-invoice.pdf"],
};

export default invoiceToExcel;
