import type { EnterpriseCopy } from "@/content/types";

/** Enterprise services — Spanish — what /es/empresas renders. */
const es: EnterpriseCopy = {
  title: "Servicios Enterprise — Implementación, control y Asesoría Empresarial",
  description:
    "Tavnit Enterprise: contrato a la medida, implementación acompañada, roles de usuario y bitácora de auditoría, soporte directo, y Asesoría Empresarial para la optimización de procesos de digitalización de documentos y entrada de datos.",
  home: "Inicio",
  breadcrumbLabel: "Ruta de navegación",
  crumb: "Enterprise",
  eyebrow: "Tavnit Enterprise",
  h1: "Servicios Enterprise",
  lead:
    "Para organizaciones que procesan un volumen alto de documentos o necesitan condiciones propias: un contrato, acompañamiento para poner Tavnit en producción y asesoría sobre el proceso que lo rodea — además de la plataforma.",
  servicesHeading: "Qué incluye Enterprise",
  services: [
    {
      title: "Contrato a la medida",
      body: "Volumen, condiciones comerciales y forma de pago acordados en un contrato según tus documentos, en lugar de un plan de autoservicio.",
    },
    {
      title: "Implementación acompañada",
      body: "Configuramos contigo los Flows, Cleaners, reglas de revisión e integraciones (API, webhooks, correo) con tus documentos reales, y los dejamos funcionando en producción.",
    },
    {
      title: "Control y auditoría",
      body: "Roles de usuario, incluido un rol solo de revisión, revisión humana condicional y una bitácora de auditoría inalterable de cada vista, edición y aprobación.",
      links: [
        { label: "Roles de usuario", href: "/es/documentacion/roles-de-usuario" },
        { label: "Revisión humana", href: "/es/documentacion/revision-humana" },
      ],
    },
    {
      title: "Soporte directo",
      body: "Un canal directo con el equipo que construye el producto, en español e inglés.",
    },
  ],
  advisory: {
    eyebrow: "Asesoría Empresarial",
    heading: "Asesoría Empresarial",
    subheading: "Optimización de procesos de digitalización de documentos y entrada de datos",
    intro:
      "Además de la plataforma, asesoramos a empresas que quieren ordenar y mejorar cómo reciben, digitalizan y registran la información de sus documentos — se automatice o no el resultado con Tavnit.",
    scopeHeading: "Qué abarca",
    scope: [
      { title: "Diagnóstico del proceso actual", body: "Qué documentos llegan, por qué canales y en qué volumen; quién los captura, cuánto tiempo toma y de dónde vienen los errores." },
      { title: "Digitalización", body: "Criterios de escaneo y captura, organización y nombre de los archivos, separación de lotes mixtos y trazabilidad de los originales." },
      { title: "Entrada de datos", body: "Qué campos se necesitan de verdad, formatos estándar para fechas, montos y monedas, validaciones y cruces contra datos maestros." },
      { title: "Controles", body: "Dónde hace falta revisión humana, segregación de funciones y la trazabilidad que pedirá un auditor o un regulador." },
      { title: "Integración", body: "Cómo llegan los datos a tu ERP, a la contabilidad o a tus hojas de cálculo, y qué pasos conviene automatizar y cuáles no." },
      { title: "Implementación y capacitación", body: "Un plan de implementación por etapas y capacitación para quienes capturan, revisan y usan los datos." },
    ],
    deliverablesHeading: "Entregables",
    deliverables:
      "Un diagnóstico escrito del proceso actual, el diseño del proceso propuesto con sus controles y un plan de implementación por etapas, con indicadores para medir el resultado — tiempo de captura por documento, tasa de corrección, documentos pendientes de revisión.",
  },
  ctaHeading: "Hablemos",
  ctaBody: "Cuéntanos qué documentos manejas y en qué volumen, y te decimos cuál de estos servicios te conviene.",
  ctaButton: "Agendar una reunión",
  ctaEmail: "o escríbenos a",
};

export default es;
