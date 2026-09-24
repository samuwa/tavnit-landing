import type { LiteTool } from "@/lib/lite/tools";

/** Packing list → Excel: shipment header and one row per goods line. */
const packingListToExcel: LiteTool = {
  id: "packing-list-to-excel",
  kind: "extract",
  paths: { en: "/tools/packing-list-to-excel", es: "/es/herramientas/packing-list-a-excel" },
  related: { useCase: "customs-trade", guide: "hs-code-classification-explained" },
  flow: {
    env: { es: "TAVNIT_LITE_PACKING_FLOW_ID", en: "TAVNIT_LITE_PACKING_FLOW_ID_EN" },
    value: { es: "66894dc3-f46e-4a81-a27f-19dbd0bde093", en: "7c89abd1-2474-4d4e-ae75-359361165b05" },
  },
  columnOrder: {
    es: [
      "exportador",
      "consignatario",
      "numero_packing_list",
      "fecha",
      "factura_relacionada",
      "puerto_carga",
      "puerto_descarga",
      "descripcion",
      "cantidad",
      "unidad",
      "bultos",
      "peso_neto",
      "peso_bruto",
      "dimensiones",
      "total_bultos",
      "peso_neto_total",
      "peso_bruto_total",
    ],
    en: [
      "shipper",
      "consignee",
      "packing_list_number",
      "date",
      "related_invoice",
      "port_of_loading",
      "port_of_discharge",
      "description",
      "quantity",
      "unit",
      "packages",
      "net_weight",
      "gross_weight",
      "dimensions",
      "total_packages",
      "total_net_weight",
      "total_gross_weight",
    ],
  },
  lineFields: {
    es: ["descripcion", "cantidad", "unidad", "bultos", "peso_neto", "peso_bruto", "dimensiones"],
    en: ["description", "quantity", "unit", "packages", "net_weight", "gross_weight", "dimensions"],
  },
  samplePaths: ["lite/sample-packing-list.pdf"],
};

export default packingListToExcel;
