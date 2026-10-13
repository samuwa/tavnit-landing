import type { DocsNavCopy } from "../types";

/**
 * Dutch docs: sidebar, chrome and page titles. Product nouns stay English as
 * in the README (Flow, Collection, Cleaner, Bucket, Agent…); UI labels follow
 * the app's Dutch dictionary (tavnit-nextjs src/lib/i18n/translations.nl.ts),
 * e.g. "Menselijke beoordeling" for the Human in the Loop page.
 */
const nl: DocsNavCopy = {
  docsName: "Documentatie",
  home: "Home",
  description:
    "Tavnit-documentatie: AI-gestuurde documentextractie, menselijke beoordeling, MCP-connector voor AI-assistenten, REST API, e-mailtriggers en meer.",
  chrome: {
    back: "Terug naar home",
    toggle: "Menu openen of sluiten",
    goHome: "Naar de homepage",
    contents: "Inhoud",
    close: "Menu sluiten",
    nav: "Documentatie",
    languages: "Deze pagina in een andere taal lezen",
    englishOnly: "Alleen in het Engels",
    copy: "Kopiëren",
    copied: "Gekopieerd!",
    related: "Gerelateerde documentatie",
    keepReading: "Lees verder",
  },
  groupLabels: {
    start: "Aan de slag",
    orchestration: "Orkestratie",
    input: "Invoer",
    processing: "Verwerking",
    intelligence: "Intelligentie",
    verticals: "Audio & sociaal",
    data: "Data & beoordeling",
    integrate: "Integraties",
    organization: "Organisatie",
  },
  labels: {
    "getting-started": "Aan de slag",
    pipelines: "Pipelines",
    "pipeline-map": "Pipeline-kaart",
    collections: "Collections",
    subjects: "Subjects",
    splitters: "Splitters",
    flows: "Flows",
    cleaners: "Cleaners",
    agents: "Agents",
    matchers: "Matchers",
    inspectors: "Inspectors",
    fillers: "Fillers",
    signals: "Signals",
    nets: "Nets",
    buckets: "Buckets",
    "human-in-the-loop": "Menselijke beoordeling",
    "email-integration": "E-mailintegratie",
    "api-integration": "API-integratie",
    webhooks: "Webhooks",
    "mcp-connector": "MCP-connector",
    "user-roles": "Gebruikersrollen",
  },
  pages: {
    "getting-started": {
      heading: "Aan de slag",
      title: "Tavnit-docs: aan de slag met AI-documentextractie",
      description:
        "Zet je eerste extractie-Flow in Tavnit op: bepaal de velden die je wilt, upload een document en krijg gestructureerde data terug. Zonder sjablonen of code.",
    },
    flows: {
      heading: "Flows",
      title: "Flows: bepaal wat Tavnit uit elk document haalt",
      description:
        "Bouw het dataschema van een Flow: metadata- en tabelvelden, datatypes, extractiehints die de AI vertellen waar te kijken, en samengestelde velden.",
    },
    "api-integration": {
      heading: "API-integratie",
      title: "REST API voor documentextractie: Python, JS en no-code",
      description:
        "De referentie van de Tavnit REST API: elk endpoint voor Flows, Collections, Splitters, Cleaners, Buckets, Agents, Pipelines en meer, plus no-code-recepten.",
    },
    "email-integration": {
      heading: "E-mailintegratie",
      title: "Data automatisch uit e-mailbijlagen halen",
      description:
        "Stuur documenten door naar het adres van een Flow, Collection of Splitter en elke bijlage wordt automatisch geëxtraheerd. Bestandstypen, skipredenen, output.",
    },
    "mcp-connector": {
      heading: "MCP-connector",
      title: "MCP-connector: verbind Tavnit met Claude en Cursor",
      description:
        "Stap voor stap: maak een connector-URL, voeg hem toe in claude.ai of Cursor, vernieuw hem op tijd en los veelvoorkomende fouten op.",
    },
    "human-in-the-loop": {
      heading: "Menselijke beoordeling (Human in the Loop)",
      title: "Menselijke beoordeling met een onwijzigbaar audit-logboek",
      description:
        "Pauzeer een Flow voor menselijke beoordeling vóór levering, bij elke Run of alleen bij gemarkeerde. Wijs beoordelaars toe, bewerk, keur goed of af.",
    },
  },
};

export default nl;
