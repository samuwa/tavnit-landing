import type { LiteTool } from "@/lib/lite/tools";

/** Receipt (photo) → Excel: header + items of a purchase receipt or ticket. */
const receiptToExcel: LiteTool = {
  id: "receipt-to-excel",
  kind: "extract",
  paths: { en: "/tools/receipt-to-excel", es: "/es/herramientas/recibos-a-excel" },
  related: { useCase: "expense-reports" },
  flow: {
    env: { es: "TAVNIT_LITE_RECEIPT_FLOW_ID", en: "TAVNIT_LITE_RECEIPT_FLOW_ID_EN" },
    value: { es: "9a1c4c22-8563-4e93-8ac2-aceee1c6d639", en: "d708a645-53b6-434e-b3f3-3bff8e52a094" },
  },
  columnOrder: {
    es: ["comercio", "ruc_comercio", "fecha", "hora", "numero_recibo", "metodo_pago", "moneda", "descripcion", "cantidad", "precio_unitario", "total_linea", "subtotal", "impuesto", "propina", "total"],
    en: ["merchant", "merchant_tax_id", "date", "time", "receipt_number", "payment_method", "currency", "description", "quantity", "unit_price", "line_total", "subtotal", "tax", "tip", "total"],
  },
  lineFields: {
    es: ["descripcion", "cantidad", "precio_unitario", "total_linea"],
    en: ["description", "quantity", "unit_price", "line_total"],
  },
  samplePaths: ["lite/sample-receipt.pdf"],
};

export default receiptToExcel;
