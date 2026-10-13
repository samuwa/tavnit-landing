import type { HomeCopy } from "@/content/types";

/**
 * Home (components/LocalizedHome.tsx) — Deutsch (de). Anrede „Sie“;
 * Produktnamen (Flow, Cleaner, Bucket …) bleiben Englisch wie in der App.
 */
const de: HomeCopy = {
  title: "Tavnit — Daten aus Dokumenten mit KI extrahieren, prüfen und nutzen",
  description:
    "Verwandeln Sie Rechnungen, Packlisten, Verträge und Formulare in strukturierte Daten – ohne Vorlagen pro Lieferant. Ihr Team prüft und gibt frei, bevor etwas verbucht wird. API, E-Mail und MCP.",
  schemaName: "Tavnit auf Deutsch",
  breadcrumbHome: "Startseite",
  readInEnglish: "Read this page in English",
  eyebrow: "Dokumentenverarbeitung mit KI",
  h1: "Daten aus Ihren Dokumenten mit KI extrahieren, im Team prüfen und direkt nutzen",
  lede:
    "Tavnit verwandelt Rechnungen, Packlisten, Verträge und Formulare in strukturierte Daten – ganz ohne Vorlagen pro Lieferant. Ihr Team prüft und gibt frei, bevor etwas verbucht wird, und die freigegebenen Daten gelangen per API, Webhook oder E-Mail in Ihre Systeme.",
  ctaDemo: "Demo vereinbaren",
  ctaTry: "Kostenlos testen",
  ids: { howItWorks: "how-it-works", useCases: "use-cases", integrations: "integrations", faq: "faq" },
  problemHeading: "Das Problem",
  problems: [
    "Jeden Monat dieselben Felder, abgetippt aus hundert verschiedenen Layouts. Jeder Lieferant gestaltet seine Rechnung anders, und jemand in Ihrem Team überträgt sie von Hand in eine Tabelle oder ins System.",
    "Vorlagenbasierte OCR-Tools funktionieren, bis ein Lieferant sein Layout ändert – dann versagen sie unbemerkt. „Chatten Sie mit Ihrem PDF“-Tools erfinden Zahlen und bieten weder Prüfung noch Audit-Trail noch einen Weg in Ihre Systeme.",
    "Eine falsche Summe sieht genauso aus wie eine richtige. Die eigentlichen Kosten sind nicht die Stunden der Datenerfassung, sondern der Fehler, der unbemerkt in Ihre Buchhaltung oder Ihre Zollanmeldung gelangt.",
  ],
  stepsHeading: "So funktioniert es: extrahieren, prüfen, handeln",
  steps: [
    {
      title: "Extrahieren",
      body: "Sie legen die benötigten Felder einmal fest – Rechnungsnummer, Lieferant, Positionen mit Menge und Preis – und Tavnit extrahiert sie aus jedem PDF, Scan oder Foto, unabhängig vom Layout. Keine Vorlagen pro Lieferant.",
    },
    {
      title: "Prüfen",
      body: "Cleaner bereinigen und validieren: Datumsformate, Währungen, Positionsrechnungen, Abgleiche mit Ihren Stammdaten. Was nicht stimmt, wird angehalten und an eine benannte prüfende Person weitergeleitet. Alles wird in einem unveränderlichen Audit-Trail festgehalten.",
    },
    {
      title: "Handeln",
      body: "Freigegebene Daten gelangen per API oder Webhook in Ihr ERP oder Ihre Buchhaltung, werden in einem abfragbaren Bucket gespeichert, füllen PDF-Formulare aus oder versorgen einen Agent, der für Sie in einem Webportal arbeitet.",
    },
  ],
  useCasesHeading: "Anwendungsfälle",
  useCasesIntro:
    "Jede Seite zeigt, welche Felder bei diesem Dokumenttyp wichtig sind und was typischerweise schiefgeht – genau das, was einen Dokumenttyp schwieriger macht als einen anderen.",
  useCasesAll: "Alle {count} Anwendungsfälle ansehen",
  integrationsHeading: "Funktioniert mit dem, was Sie bereits nutzen",
  integrations: [
    "E-Mail: Leiten Sie das PDF an eine Tavnit-Adresse weiter und erhalten Sie die Daten zurück. Keinerlei Integrationsaufwand.",
    "REST-API und Webhooks: Senden Sie Dokumente aus Ihrem System und erhalten Sie die Ergebnisse, sobald sie fertig sind. Vorlagen für Zapier, Make, n8n und Power Automate.",
    "MCP-Connector: Verbinden Sie Tavnit mit claude.ai oder Cursor und lassen Sie Ihren Assistenten Dokumente verarbeiten oder Ihre extrahierten Daten abfragen.",
    "Buckets: integrierter strukturierter Speicher, den Sie in natürlicher Sprache abfragen und als Diagramm darstellen können – ohne etwas zu exportieren.",
  ],
  integrationsAll: "Alle Integrationen",
  faqHeading: "Häufige Fragen",
  faqs: [
    {
      q: "Muss ich für jeden Lieferanten eine Vorlage erstellen?",
      a: "Nein. Sie definieren die Felder einmal in einem Flow, und Tavnit findet sie in jedem Layout. Ändert ein Lieferant das Format seiner Rechnung, müssen Sie nichts tun.",
    },
    {
      q: "Wie verhindere ich, dass ein falscher Wert in mein System gelangt?",
      a: "Mit manueller Prüfung. Sie können für jedes Dokument eine Freigabe verlangen oder nur dann, wenn eine Cleaner-Regel etwas entdeckt – etwa, dass Menge mal Einzelpreis nicht der Positionssumme entspricht. Die prüfende Person sieht das Dokument und die extrahierten Daten, korrigiert oder gibt frei, und jede Aktion wird im Audit-Trail festgehalten.",
    },
    {
      q: "Wie sende ich die Dokumente?",
      a: "Ganz wie Sie möchten: Leiten Sie die E-Mail mit dem PDF-Anhang an eine Tavnit-Adresse weiter, laden Sie sie in der App hoch oder senden Sie sie per API. Die Ergebnisse gehen per Webhook, API oder E-Mail hinaus oder werden in einem Bucket gespeichert, den Sie abfragen und visualisieren können.",
    },
    {
      q: "Funktioniert es in meiner Sprache?",
      a: "Ja. Tavnit extrahiert Dokumente in jeder Sprache, und Sie können die Daten mit den Feldnamen zurückgeben, die Ihr System verwendet. Die App selbst ist in mehreren Sprachen verfügbar.",
    },
    {
      q: "Was kostet es?",
      a: "Die Preise basieren auf Credits: 1 Credit entspricht 1 verarbeiteten Seite. Vereinbaren Sie eine Demo, und wir sehen uns Ihr Volumen und Ihre echten Dokumente an.",
    },
  ],
  finalHeading: "Testen Sie es mit einem Ihrer Dokumente",
  finalBody:
    "Bringen Sie eine echte Rechnung oder Packliste mit. In der Demo bauen wir gemeinsam Ihren ersten Flow, und Sie sehen live, wie die Daten herauskommen.",
};

export default de;
