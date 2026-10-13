import type { DocsNavCopy } from "../types";

/**
 * French docs: sidebar, chrome and page titles. Product nouns stay English as
 * in the app (Flow, Collection, Cleaner, Bucket, Agent…); UI labels follow the
 * app's French dictionary (tavnit-nextjs src/lib/i18n/translations.fr.ts),
 * e.g. "Révision humaine" for the Human in the Loop page.
 */
const fr: DocsNavCopy = {
  docsName: "Documentation",
  home: "Accueil",
  description:
    "Documentation Tavnit : extraction de documents par IA, révision humaine, connecteur MCP pour assistants IA, API REST, déclencheurs e-mail et plus encore.",
  chrome: {
    back: "Retour à l'accueil",
    toggle: "Ouvrir ou fermer le menu",
    goHome: "Aller à l'accueil",
    contents: "Sommaire",
    close: "Fermer le menu",
    nav: "Documentation",
    languages: "Lire cette page dans une autre langue",
    englishOnly: "En anglais uniquement",
    copy: "Copier",
    copied: "Copié !",
    related: "Documentation associée",
    keepReading: "Pour aller plus loin",
  },
  groupLabels: {
    start: "Démarrer",
    orchestration: "Orchestration",
    input: "Entrée",
    processing: "Traitement",
    intelligence: "Intelligence",
    verticals: "Audio et réseaux sociaux",
    data: "Données et révision",
    integrate: "Intégrations",
    organization: "Organisation",
  },
  labels: {
    "getting-started": "Premiers pas",
    pipelines: "Pipelines",
    "pipeline-map": "Carte des Pipelines",
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
    "human-in-the-loop": "Révision humaine",
    "email-integration": "Intégration e-mail",
    "api-integration": "Intégration API",
    webhooks: "Webhooks",
    "mcp-connector": "Connecteur MCP",
    "user-roles": "Rôles utilisateur",
  },
  pages: {
    "getting-started": {
      heading: "Premiers pas",
      title: "Docs Tavnit : premiers pas avec l'extraction par IA",
      description:
        "Créez votre premier Flow dans Tavnit : définissez les champs, importez un document et récupérez des données structurées. Sans modèles et sans code.",
    },
    flows: {
      heading: "Flows",
      title: "Flows : définir ce que Tavnit extrait de chaque document",
      description:
        "Le schéma de données d'un Flow : champs de métadonnées et de tableau, types de données, indices d'extraction pour l'IA, champs composites et multivalués.",
    },
    "api-integration": {
      heading: "Intégration API",
      title: "API REST d'extraction de documents : Python, JS et no-code",
      description:
        "La référence de l'API REST Tavnit : tous les endpoints pour Flows, Collections, Splitters, Cleaners, Buckets, Agents, Pipelines et plus, avec recettes no-code.",
    },
    "email-integration": {
      heading: "Intégration e-mail",
      title: "Extraire automatiquement les données des pièces jointes",
      description:
        "Transférez vos documents à l'adresse d'un Flow, d'une Collection ou d'un Splitter, et chaque pièce jointe est extraite automatiquement.",
    },
    "mcp-connector": {
      heading: "Connecteur MCP",
      title: "Connecteur MCP : relier Tavnit à Claude et Cursor",
      description:
        "Pas à pas : générer l'URL du connecteur, l'ajouter dans claude.ai ou Cursor, la renouveler à temps et corriger les erreurs courantes.",
    },
    "human-in-the-loop": {
      heading: "Révision humaine (Human in the Loop)",
      title: "Révision humaine avec journal d'audit inaltérable",
      description:
        "Mettez un Flow en pause avant la livraison, à chaque Run ou seulement quand une règle le signale. Assignez des réviseurs, modifiez, approuvez ou rejetez.",
    },
  },
};

export default fr;
