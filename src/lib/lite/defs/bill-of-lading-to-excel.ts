import type { LiteTool } from "@/lib/lite/tools";

/** Bill of lading → Excel: the header of an ocean B/L (parties, vessel,
 *  ports, dates) and one row per cargo line (container, seal, goods,
 *  packages, weight, volume). */
const billOfLadingToExcel: LiteTool = {
  id: "bill-of-lading-to-excel",
  kind: "extract",
  paths: { en: "/tools/bill-of-lading-to-excel", es: "/es/herramientas/bl-a-excel" },
  flow: {
    env: { es: "TAVNIT_LITE_BL_FLOW_ID", en: "TAVNIT_LITE_BL_FLOW_ID_EN" },
    value: { es: "d93ac748-3fcc-4092-93f1-c4a62bba1b0f", en: "fe48e725-0762-4062-a53a-53f32f438508" },
  },
  columnOrder: {
    es: [
      "numero_bl", "naviera", "embarcador", "consignatario", "notificar_a", "buque", "viaje",
      "puerto_carga", "puerto_descarga", "fecha_embarque", "flete",
      "contenedor", "sello", "descripcion", "bultos", "tipo_bulto", "peso_bruto", "volumen",
      "contenedores",
    ],
    en: [
      "bl_number", "carrier", "shipper", "consignee", "notify_party", "vessel", "voyage",
      "port_of_loading", "port_of_discharge", "shipped_on_board_date", "freight",
      "container", "seal", "description", "packages", "package_type", "gross_weight", "volume",
      "containers",
    ],
  },
  lineFields: {
    es: ["contenedor", "sello", "descripcion", "bultos", "tipo_bulto", "peso_bruto", "volumen"],
    en: ["container", "seal", "description", "packages", "package_type", "gross_weight", "volume"],
  },
  samplePaths: ["lite/sample-bill-of-lading.pdf"],
};

export default billOfLadingToExcel;
