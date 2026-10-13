import type { EnterpriseCopy } from "@/content/types";

/** Enterprise services (/enterprise) — Deutsch (de). */
const de: EnterpriseCopy = {
  title: "Enterprise-Services — Implementierung, Kontrolle und Business Advisory",
  description:
    "Tavnit Enterprise: Verträge zu Ihren Konditionen, praktische Implementierung, Benutzerrollen und Audit-Trail, direkter Support sowie Business Advisory zur Optimierung von Digitalisierung und Datenerfassung Ihrer Dokumente.",
  home: "Startseite",
  breadcrumbLabel: "Brotkrumennavigation",
  crumb: "Enterprise",
  eyebrow: "Tavnit Enterprise",
  h1: "Enterprise-Services",
  lead:
    "Für Organisationen, die viele Dokumente verarbeiten oder eigene Konditionen brauchen: ein Vertrag, praktische Unterstützung beim Produktivbetrieb von Tavnit und Beratung zum Prozess rundherum – zusätzlich zur Plattform.",
  servicesHeading: "Was Enterprise umfasst",
  services: [
    {
      title: "Vertrag zu Ihren Konditionen",
      body: "Volumen, kommerzielle Bedingungen und Zahlung werden in einem Vertrag vereinbart, der zu Ihren Dokumenten passt – statt eines Self-Service-Tarifs.",
    },
    {
      title: "Praktische Implementierung",
      body: "Wir richten Flows, Cleaner, Prüfregeln und Integrationen (API, Webhooks, E-Mail) gemeinsam mit Ihnen anhand Ihrer echten Dokumente ein und übergeben sie lauffähig im Produktivbetrieb.",
    },
    {
      title: "Kontrolle und Audit",
      body: "Benutzerrollen – darunter eine reine Prüferrolle –, bedingte manuelle Prüfung und ein unveränderlicher Audit-Trail jeder Ansicht, Änderung und Freigabe.",
      links: [
        { label: "Benutzerrollen", href: "/docs/user-roles" },
        { label: "Manuelle Prüfung", href: "/docs/human-in-the-loop" },
      ],
    },
    {
      title: "Direkter Support",
      body: "Ein direkter Draht zu dem Team, das das Produkt entwickelt – auf Englisch und Spanisch.",
    },
  ],
  advisory: {
    eyebrow: "Business Advisory",
    heading: "Business Advisory",
    subheading: "Optimierung von Dokumentendigitalisierung und Datenerfassung",
    intro:
      "Neben der Plattform beraten wir Unternehmen, die ordnen und verbessern möchten, wie sie die Informationen in ihren Dokumenten empfangen, digitalisieren und erfassen – unabhängig davon, ob das Ergebnis am Ende mit Tavnit automatisiert wird.",
    scopeHeading: "Was die Beratung abdeckt",
    scope: [
      { title: "Analyse des aktuellen Prozesses", body: "Welche Dokumente über welche Kanäle und in welchem Volumen eintreffen; wer sie erfasst, wie lange das dauert und wo die Fehler entstehen." },
      { title: "Digitalisierung", body: "Kriterien für Scannen und Erfassung, Ablage und Benennung von Dateien, Trennung gemischter Stapel und Nachvollziehbarkeit der Originale." },
      { title: "Datenerfassung", body: "Welche Felder tatsächlich gebraucht werden, Standardformate für Datum, Beträge und Währungen, Validierungen und Abgleiche mit Stammdaten." },
      { title: "Kontrollen", body: "Wo manuelle Prüfung nötig ist, Funktionstrennung und der Audit-Trail, den Wirtschaftsprüfer oder Aufsichtsbehörden verlangen werden." },
      { title: "Integration", body: "Wie die Daten in Ihr ERP, Ihre Buchhaltung oder Ihre Tabellen gelangen und welche Schritte sich zu automatisieren lohnen – und welche nicht." },
      { title: "Einführung und Schulung", body: "Ein stufenweiser Implementierungsplan und Schulungen für alle, die die Daten erfassen, prüfen und nutzen." },
    ],
    deliverablesHeading: "Ergebnisse",
    deliverables:
      "Eine schriftliche Analyse des aktuellen Prozesses, das Design des vorgeschlagenen Prozesses samt Kontrollen und ein stufenweiser Implementierungsplan mit Kennzahlen zur Erfolgsmessung – Erfassungszeit pro Dokument, Korrekturquote, Dokumente in der Prüfung.",
  },
  ctaHeading: "Sprechen Sie mit uns",
  ctaBody: "Erzählen Sie uns von Ihren Dokumenten und Ihrem Volumen, und wir sagen Ihnen, welcher dieser Services passt.",
  ctaButton: "Termin vereinbaren",
  ctaEmail: "oder schreiben Sie an",
};

export default de;
