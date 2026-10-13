import type { DocsNavCopy } from "../types";

/**
 * German docs: sidebar, chrome and page titles. Product nouns stay English as
 * in the app (Flow, Collection, Cleaner, Bucket, Agent…); UI labels follow the
 * app's German dictionary (tavnit-nextjs src/lib/i18n/translations.de.ts),
 * e.g. "Manuelle Prüfung" for the Human in the Loop page.
 */
const de: DocsNavCopy = {
  docsName: "Dokumentation",
  home: "Startseite",
  description:
    "Tavnit-Dokumentation: KI-gestützte Dokumentenextraktion, manuelle Prüfung, MCP-Connector für KI-Assistenten, REST-API, E-Mail-Trigger und mehr.",
  chrome: {
    back: "Zurück zur Startseite",
    toggle: "Menü öffnen oder schließen",
    goHome: "Zur Startseite",
    contents: "Inhalt",
    close: "Menü schließen",
    nav: "Dokumentation",
    languages: "Diese Seite in einer anderen Sprache lesen",
    englishOnly: "Nur auf Englisch",
    copy: "Kopieren",
    copied: "Kopiert!",
    related: "Verwandte Dokumentation",
    keepReading: "Weiterlesen",
  },
  groupLabels: {
    start: "Einstieg",
    orchestration: "Orchestrierung",
    input: "Eingabe",
    processing: "Verarbeitung",
    intelligence: "Intelligenz",
    verticals: "Audio & Social Media",
    data: "Daten & Prüfung",
    integrate: "Integrationen",
    organization: "Organisation",
  },
  labels: {
    "getting-started": "Erste Schritte",
    pipelines: "Pipelines",
    "pipeline-map": "Pipeline-Karte",
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
    "human-in-the-loop": "Manuelle Prüfung",
    "email-integration": "E-Mail-Integration",
    "api-integration": "API-Integration",
    webhooks: "Webhooks",
    "mcp-connector": "MCP-Connector",
    "user-roles": "Benutzerrollen",
  },
  pages: {
    "getting-started": {
      heading: "Erste Schritte",
      title: "Tavnit-Doku: Erste Schritte mit der KI-Dokumentenextraktion",
      description:
        "Richten Sie Ihren ersten Flow in Tavnit ein: Felder festlegen, ein Dokument hochladen, strukturierte Daten erhalten. Ohne Vorlagen und ohne Code.",
    },
    flows: {
      heading: "Flows",
      title: "Flows: festlegen, was Tavnit aus jedem Dokument extrahiert",
      description:
        "Das Datenschema eines Flows: Metadaten- und Tabellenfelder, Datentypen, Extraktionshinweise für die KI sowie zusammengesetzte und mehrwertige Felder.",
    },
    "api-integration": {
      heading: "API-Integration",
      title: "REST-API für Dokumentenextraktion: Python, JS und No-Code",
      description:
        "Die Referenz der Tavnit-REST-API: alle Endpunkte für Flows, Collections, Splitters, Cleaners, Buckets, Agents, Pipelines und mehr, mit No-Code-Rezepten.",
    },
    "email-integration": {
      heading: "E-Mail-Integration",
      title: "Daten aus E-Mail-Anhängen automatisch extrahieren",
      description:
        "Leiten Sie Dokumente an die Adresse eines Flows, einer Collection oder eines Splitters weiter, und jeder Anhang wird automatisch extrahiert.",
    },
    "mcp-connector": {
      heading: "MCP-Connector",
      title: "MCP-Connector: Tavnit mit Claude und Cursor verbinden",
      description:
        "Schritt für Schritt: Connector-URL erstellen, in claude.ai oder Cursor hinzufügen, rechtzeitig aktualisieren und häufige Fehler beheben.",
    },
    "human-in-the-loop": {
      heading: "Manuelle Prüfung (Human in the Loop)",
      title: "Manuelle Prüfung mit lückenlosem Audit-Protokoll",
      description:
        "Halten Sie einen Flow vor der Zustellung zur Prüfung an, bei jedem Run oder nur bei markierten. Prüfer zuweisen, bearbeiten, genehmigen oder ablehnen.",
    },
  },
};

export default de;
