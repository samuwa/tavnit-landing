import { INTEGRATIONS, type Integration } from "@/lib/integrations";

/**
 * Spanish strings for the integrations hub, keyed by the English entry's
 * label so the list cannot drift: an integration added to integrations.ts
 * without a Spanish twin fails the type check below rather than silently
 * rendering in English.
 *
 * Only the MCP page has a Spanish marketing page (/es/integraciones/mcp); the
 * rest link to the English docs, as the English hub does.
 */
const ES: Record<Integration["label"], { label: string; summary: string; href?: string }> = {
  "MCP Connector": {
    label: "Conector MCP",
    href: "/es/integraciones/mcp",
    summary:
      "Conecta Tavnit a claude.ai, Cursor o cualquier cliente MCP. Tu asistente puede crear Flows de extracción, añadir Cleaners, procesar documentos y consultar los datos extraídos — todo por chat.",
  },
  "REST API": {
    label: "API REST",
    summary:
      "Envía documentos desde tu sistema con una API key. Carga multipart o base64, con ejemplos en Python y JavaScript (docs en inglés).",
  },
  Email: {
    label: "Correo electrónico",
    summary:
      "Reenvía o auto-reenvía documentos a una dirección dedicada y cada adjunto se extrae — con los resultados de vuelta por correo a quien los necesite, sin abrir la aplicación.",
  },
  Webhooks: {
    label: "Webhooks",
    summary:
      "Recibe los resultados tipificados en tu propio endpoint en el momento en que termina un Run, para que los datos lleguen a tus sistemas solos.",
  },
  "Zapier, Make, n8n and Power Automate": {
    label: "Zapier, Make, n8n y Power Automate",
    summary:
      "Recetas sin código que llaman a los mismos endpoints, para equipos que prefieren conectar esto visualmente en lugar de escribir código.",
  },
  Buckets: {
    label: "Buckets",
    summary:
      "Guarda las filas extraídas en almacenamiento estructurado incorporado — edítalas, consúltalas y grafícalas, o expórtalas a CSV y Excel.",
  },
};

export type IntegrationEs = Integration & { labelEs: string; summaryEs: string; hrefEs: string };

export const INTEGRATIONS_ES: IntegrationEs[] = INTEGRATIONS.map((i) => {
  const es = ES[i.label];
  if (!es) throw new Error(`No Spanish strings for integration "${i.label}"`);
  return { ...i, labelEs: es.label, summaryEs: es.summary, hrefEs: es.href ?? i.href };
});
