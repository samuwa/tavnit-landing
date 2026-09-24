import type { LiteTool } from "@/lib/lite/tools";

/** PO vs invoice check: both documents go through one "purchase document"
 *  Flow, then a benchmark Matcher pairs the invoice lines to the PO lines
 *  (slot 0 = the PO, the Matcher's benchmark run). The identifier field is
 *  the document's own number, so the two participants never collide. */
const poInvoiceCheck: LiteTool = {
  id: "po-invoice-check",
  kind: "compare",
  paths: { en: "/tools/po-vs-invoice-check", es: "/es/herramientas/comparar-factura-con-orden-de-compra" },
  flow: {
    env: { es: "TAVNIT_LITE_PURCHASE_FLOW_ID", en: "TAVNIT_LITE_PURCHASE_FLOW_ID_EN" },
    value: { es: "c7ceb372-091f-42cf-806a-935130bed96e", en: "be5e1230-9163-435d-a6b3-76c7ba11da6c" },
  },
  columnOrder: {
    es: ["tipo_documento", "numero", "fecha", "proveedor", "comprador", "moneda", "descripcion", "cantidad", "unidad", "precio_unitario", "total_linea", "subtotal", "impuesto", "total"],
    en: ["document_type", "number", "date", "supplier", "buyer", "currency", "description", "quantity", "unit", "unit_price", "line_total", "subtotal", "tax", "total"],
  },
  lineFields: {
    es: ["descripcion", "cantidad", "unidad", "precio_unitario", "total_linea"],
    en: ["description", "quantity", "unit", "unit_price", "line_total"],
  },
  samplePaths: ["lite/sample-po.pdf", "lite/sample-po-invoice.pdf"],
  compare: {
    matcher: {
      env: { es: "TAVNIT_LITE_PURCHASE_MATCHER_ID", en: "TAVNIT_LITE_PURCHASE_MATCHER_ID_EN" },
      value: { es: "951b84c3-853b-4bfe-a42b-abc77ac4a16b", en: "0c6cb6b6-fd57-4b97-8383-115db5c3ae53" },
    },
    minDocs: 2,
    maxDocs: 2,
    mode: "benchmark",
    fields: {
      es: { identifier: "numero", match: "descripcion", comparison: "precio_unitario", quantity: "cantidad", lineTotal: "total_linea" },
      en: { identifier: "number", match: "description", comparison: "unit_price", quantity: "quantity", lineTotal: "line_total" },
    },
  },
};

export default poInvoiceCheck;
