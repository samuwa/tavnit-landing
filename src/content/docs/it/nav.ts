import type { DocsNavCopy } from "../types";

/**
 * Italian docs: sidebar, chrome and page titles. Product nouns stay English as
 * in the README (Flow, Collection, Cleaner, Bucket, Agent…); UI labels follow
 * the app's Italian dictionary (tavnit-nextjs src/lib/i18n/translations.it.ts),
 * e.g. "Revisione umana" for the Human in the Loop page.
 */
const it: DocsNavCopy = {
  docsName: "Documentazione",
  home: "Home",
  description:
    "Documentazione di Tavnit: estrazione di dati dai documenti con l'AI, revisione umana, connettore MCP per assistenti AI, API REST, trigger email e altro.",
  chrome: {
    back: "Torna alla home",
    toggle: "Apri o chiudi il menu",
    goHome: "Vai alla home",
    contents: "Contenuti",
    close: "Chiudi il menu",
    nav: "Documentazione",
    languages: "Leggi questa pagina in un'altra lingua",
    englishOnly: "Solo in inglese",
    copy: "Copia",
    copied: "Copiato!",
    related: "Documentazione correlata",
    keepReading: "Continua a leggere",
  },
  groupLabels: {
    start: "Per iniziare",
    orchestration: "Orchestrazione",
    input: "Input",
    processing: "Elaborazione",
    intelligence: "Intelligenza",
    verticals: "Audio e social",
    data: "Dati e revisione",
    integrate: "Integrazioni",
    organization: "Organizzazione",
  },
  labels: {
    "getting-started": "Primi passi",
    pipelines: "Pipelines",
    "pipeline-map": "Mappa Pipeline",
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
    "human-in-the-loop": "Revisione umana",
    "email-integration": "Integrazione email",
    "api-integration": "Integrazione API",
    webhooks: "Webhooks",
    "mcp-connector": "Connettore MCP",
    "user-roles": "Ruoli utente",
  },
  pages: {
    "getting-started": {
      heading: "Primi passi",
      title: "Documentazione: primi passi con l'estrazione AI",
      description:
        "Configura il tuo primo Flow in Tavnit: definisci i campi che ti servono, carica un documento e ricevi dati strutturati. Niente modelli, niente codice.",
    },
    flows: {
      heading: "Flows",
      title: "Flows: definisci cosa estrae Tavnit da ogni documento",
      description:
        "Lo schema dati di un Flow: campi di metadati e di tabella, tipi di dati, suggerimenti di estrazione per l'AI e campi compositi e multivalore.",
    },
    "api-integration": {
      heading: "Integrazione API",
      title: "API REST per l'estrazione di documenti: Python, JS e no-code",
      description:
        "Il riferimento dell'API REST di Tavnit: ogni endpoint per Flows, Collections, Splitters, Cleaners, Buckets, Agents, Pipelines e altro, con ricette no-code.",
    },
    "email-integration": {
      heading: "Integrazione email",
      title: "Estrai dati dagli allegati email in automatico",
      description:
        "Inoltra i documenti all'indirizzo di un Flow, di una Collection o di uno Splitter e ogni allegato viene estratto in automatico. Tipi di file, scarti, output.",
    },
    "mcp-connector": {
      heading: "Connettore MCP",
      title: "Connettore MCP: collega Tavnit a Claude e Cursor",
      description:
        "Configurazione passo passo del connettore MCP di Tavnit: genera un URL, aggiungilo a claude.ai o Cursor, gestisci i rinnovi e risolvi gli errori comuni.",
    },
    "human-in-the-loop": {
      heading: "Revisione umana (Human in the Loop)",
      title: "Revisione umana con una traccia di audit completa",
      description:
        "Ferma un Flow per una revisione umana prima della consegna, sempre o solo se un Cleaner lo segnala. Assegna revisori, modifica, approva o rifiuta.",
    },
  },
};

export default it;
