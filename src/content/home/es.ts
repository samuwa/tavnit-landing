import type { HomeCopy } from "@/content/types";

/**
 * Home — Spanish (/es). Tavnit's primary market is Spanish-speaking —
 * Panama first, then the rest of Latin America. Register follows
 * .agents/product-marketing.md: "tú", concrete, product nouns kept in
 * English (Flow, Cleaner, Bucket).
 */
const es: HomeCopy = {
  title: "Tavnit — Extrae datos de tus documentos con IA, revísalos y actúa",
  description:
    "Convierte facturas, listas de empaque, contratos y formularios en datos estructurados, sin plantillas por proveedor. Tu equipo revisa y aprueba antes de que nada se registre. API, correo y MCP.",
  schemaName: "Tavnit en español",
  breadcrumbHome: "Inicio",
  readInEnglish: "Read this page in English",
  eyebrow: "Operaciones documentales con IA",
  h1: "Extrae datos de tus documentos con IA, revísalos con tu equipo y actúa sobre ellos",
  lede:
    "Tavnit convierte facturas, listas de empaque, contratos y formularios en datos estructurados — sin plantillas por proveedor. Tu equipo revisa y aprueba antes de que nada se registre, y los datos aprobados llegan a tus sistemas por API, webhook o correo.",
  ctaDemo: "Agendar una demostración",
  ctaTry: "Probar gratis",
  ids: { howItWorks: "como-funciona", useCases: "casos-de-uso", integrations: "integraciones", faq: "preguntas" },
  problemHeading: "El problema",
  problems: [
    "Los mismos campos, re-tipeados desde cien diseños distintos, todos los meses. Cada proveedor exporta su factura de una forma diferente y alguien en tu equipo la pasa a mano a una hoja de cálculo o al sistema.",
    "Las herramientas de OCR con plantillas funcionan hasta que el proveedor cambia el formato — y entonces fallan en silencio. Las herramientas de “chatea con tu PDF” inventan cifras y no tienen revisión, ni auditoría, ni salida hacia tus sistemas.",
    "Un total equivocado se ve exactamente igual que uno correcto. El costo real no son las horas de captura: es el error que llega a la contabilidad o a la declaración aduanera sin que nadie lo vea.",
  ],
  stepsHeading: "Cómo funciona: extraer, revisar, actuar",
  steps: [
    {
      title: "Extraer",
      body: "Defines una vez los campos que necesitas — número de factura, proveedor, líneas con cantidad y precio — y Tavnit los extrae de cualquier PDF, escaneo o foto, sin importar el diseño. Sin plantillas por proveedor.",
    },
    {
      title: "Revisar",
      body: "Los Cleaners limpian y validan: formatos de fecha, monedas, aritmética de líneas, búsquedas contra tus datos maestros. Lo que no cuadra se detiene y va a un revisor con nombre. Todo queda en una bitácora de auditoría inalterable.",
    },
    {
      title: "Actuar",
      body: "Los datos aprobados llegan a tu ERP o contabilidad por API o webhook, se guardan en un Bucket consultable, llenan formularios PDF, o alimentan a un agente que trabaja en un portal web por ti.",
    },
  ],
  useCasesHeading: "Casos de uso",
  useCasesIntro:
    "Empezamos por aduanas, porque es donde un error cuesta más. Cada página cubre qué campos importan en ese tipo de documento y qué suele salir mal.",
  useCasesAll: "Ver los {count} casos de uso",
  integrationsHeading: "Se integra con lo que ya usas",
  integrations: [
    "Correo electrónico: reenvía el PDF a una dirección de Tavnit y recibe los datos de vuelta. Cero integración.",
    "API REST y webhooks: envía documentos desde tu sistema y recibe los resultados en el momento en que terminan. Recetas para Zapier, Make, n8n y Power Automate.",
    "Conector MCP: conecta Tavnit a claude.ai o Cursor y pide a tu asistente que procese documentos o consulte tus datos extraídos.",
    "Buckets: almacenamiento estructurado incorporado, consultable en lenguaje natural y graficable, sin exportar nada.",
  ],
  integrationsAll: "Todas las integraciones",
  faqHeading: "Preguntas frecuentes",
  faqs: [
    {
      q: "¿Necesito crear una plantilla por cada proveedor?",
      a: "No. Defines los campos una sola vez en un Flow y Tavnit los encuentra en cualquier diseño. Si un proveedor cambia el formato de su factura, no tienes que hacer nada.",
    },
    {
      q: "¿Cómo evito que un dato equivocado llegue a mi sistema?",
      a: "Con revisión humana. Puedes exigir aprobación en todos los documentos, o solo cuando una regla de un Cleaner detecta algo — por ejemplo, que cantidad por precio unitario no cuadra con el total de la línea. El revisor ve el documento y el dato extraído, corrige o aprueba, y cada acción queda en la bitácora de auditoría.",
    },
    {
      q: "¿Cómo envío los documentos?",
      a: "Como prefieras: reenvías el correo con el PDF adjunto a una dirección de Tavnit, los subes en la aplicación, o los envías por API. Los resultados salen por webhook, API, correo, o se guardan en un Bucket que puedes consultar y graficar.",
    },
    {
      q: "¿Funciona en español?",
      a: "Sí. La aplicación es completamente bilingüe (español e inglés) y extrae documentos en cualquier idioma. Puedes trabajar con facturas en español y devolver los datos con los nombres de campo que use tu sistema.",
    },
    {
      q: "¿Cuánto cuesta?",
      a: "El modelo es por créditos: 1 crédito equivale a 1 página procesada. Los planes se cotizan por organización; agenda una demostración y vemos tu volumen y tus documentos reales.",
    },
  ],
  finalHeading: "Pruébalo con uno de tus documentos",
  finalBody:
    "Trae una factura o una lista de empaque real. En la demostración armamos tu primer Flow y ves los datos salir en vivo.",
};

export default es;
