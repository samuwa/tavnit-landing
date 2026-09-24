import type { LiteTool } from "@/lib/lite/tools";

/** Contract key dates: parties, term, renewal and notice, one row per contract
 *  (a metadata-only Flow: no table fields, so no line items and no sums). */
const contractDates: LiteTool = {
  id: "contract-dates",
  kind: "extract",
  paths: { en: "/tools/contract-renewal-date-extractor", es: "/es/herramientas/fechas-de-renovacion-de-contratos" },
  flow: {
    env: { es: "TAVNIT_LITE_CONTRACT_FLOW_ID", en: "TAVNIT_LITE_CONTRACT_FLOW_ID_EN" },
    value: { es: "362045dc-1e57-4f45-9d0d-3f20ea90aede", en: "96dce8f8-9da0-4554-bb8f-dc47026f5d16" },
  },
  columnOrder: {
    es: ["titulo_contrato", "tipo_contrato", "parte_a", "parte_b", "fecha_firma", "fecha_inicio", "fecha_fin", "plazo", "renovacion_automatica", "fecha_limite_aviso", "preaviso", "valor", "moneda", "ley_aplicable"],
    en: ["contract_title", "contract_type", "party_a", "party_b", "signature_date", "start_date", "end_date", "term", "auto_renewal", "notice_deadline", "notice_period", "value", "currency", "governing_law"],
  },
  lineFields: { es: [], en: [] },
  samplePaths: ["lite/sample-contract.pdf"],
};

export default contractDates;
