import type { LiteTool } from "@/lib/lite/tools";

/** Supplier quotes side by side: each quote through one "quote" Flow, then
 *  a multilateral Matcher pairs the lines and marks the Champion. */
const quoteComparison: LiteTool = {
  id: "quote-comparison",
  kind: "compare",
  paths: { en: "/tools/compare-supplier-quotes", es: "/es/herramientas/comparar-cotizaciones" },
  related: { useCase: "supplier-quotes" },
  flow: {
    env: { es: "TAVNIT_LITE_QUOTE_FLOW_ID", en: "TAVNIT_LITE_QUOTE_FLOW_ID_EN" },
    value: { es: "a42ada9c-1cfd-485b-b9af-b1747edd300f", en: "80b9fab0-5322-4e48-a004-dbcedc09223c" },
  },
  columnOrder: {
    es: ["proveedor", "numero_cotizacion", "fecha", "validez", "moneda", "condiciones_pago", "tiempo_entrega", "descripcion", "cantidad", "unidad", "precio_unitario", "total_linea", "total"],
    en: ["supplier", "quote_number", "date", "valid_until", "currency", "payment_terms", "lead_time", "description", "quantity", "unit", "unit_price", "line_total", "total"],
  },
  lineFields: {
    es: ["descripcion", "cantidad", "unidad", "precio_unitario", "total_linea"],
    en: ["description", "quantity", "unit", "unit_price", "line_total"],
  },
  samplePaths: ["lite/sample-quote-a.pdf", "lite/sample-quote-b.pdf", "lite/sample-quote-c.pdf"],
  compare: {
    matcher: {
      env: { es: "TAVNIT_LITE_QUOTE_MATCHER_ID", en: "TAVNIT_LITE_QUOTE_MATCHER_ID_EN" },
      value: { es: "397abda0-99fe-412c-b709-feb774ea91db", en: "704f121a-4366-489f-bacf-d448d2480ab5" },
    },
    minDocs: 2,
    maxDocs: 3,
    mode: "multilateral",
    fields: {
      es: { identifier: "proveedor", match: "descripcion", comparison: "precio_unitario", quantity: "cantidad", lineTotal: "total_linea" },
      en: { identifier: "supplier", match: "description", comparison: "unit_price", quantity: "quantity", lineTotal: "line_total" },
    },
  },
};

export default quoteComparison;
