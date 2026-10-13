import type { EnterpriseCopy } from "@/content/types";

/** Enterprise services (/enterprise) — Nederlands (nl). */
const nl: EnterpriseCopy = {
  title: "Enterprise-diensten — Implementatie, controle en bedrijfsadvies",
  description:
    "Tavnit Enterprise: een contract op jouw voorwaarden, implementatie met hands-on begeleiding, gebruikersrollen en audittrail, directe support, en bedrijfsadvies om de digitalisering van documenten en de gegevensinvoer te optimaliseren.",
  home: "Home",
  breadcrumbLabel: "Kruimelpad",
  crumb: "Enterprise",
  eyebrow: "Tavnit Enterprise",
  h1: "Enterprise-diensten",
  lead:
    "Voor organisaties die veel documenten verwerken of eigen voorwaarden nodig hebben: een contract, praktische hulp om Tavnit in productie te nemen en advies over het proces eromheen — bovenop het platform.",
  servicesHeading: "Wat Enterprise omvat",
  services: [
    {
      title: "Contract op jouw voorwaarden",
      body: "Volume, commerciële voorwaarden en betaling vastgelegd in een contract dat past bij jouw documenten, in plaats van een selfserviceabonnement.",
    },
    {
      title: "Implementatie met hands-on begeleiding",
      body: "We zetten samen met je de Flows, Cleaners, beoordelingsregels en integraties (API, webhooks, e-mail) op, met je echte documenten, en laten ze draaiend in productie achter.",
    },
    {
      title: "Controle en audit",
      body: "Gebruikersrollen, waaronder een rol die alleen beoordeelt, voorwaardelijke menselijke beoordeling en een audittrail die alleen kan worden aangevuld, met elke weergave, wijziging en goedkeuring.",
      links: [
        { label: "Gebruikersrollen", href: "/docs/user-roles" },
        { label: "Menselijke beoordeling", href: "/docs/human-in-the-loop" },
      ],
    },
    {
      title: "Directe support",
      body: "Een directe lijn met het team dat het product bouwt, in het Engels en het Spaans.",
    },
  ],
  advisory: {
    eyebrow: "Business Advisory",
    heading: "Bedrijfsadvies",
    subheading: "Optimalisatie van documentdigitalisering en gegevensinvoer",
    intro:
      "Naast het platform adviseren we bedrijven die willen opruimen en verbeteren hoe ze de informatie in hun documenten ontvangen, digitaliseren en vastleggen — of het eindresultaat nu met Tavnit wordt geautomatiseerd of niet.",
    scopeHeading: "Wat het omvat",
    scope: [
      { title: "Diagnose van het huidige proces", body: "Welke documenten binnenkomen, via welke kanalen en in welk volume; wie ze invoert, hoe lang dat duurt en waar de fouten vandaan komen." },
      { title: "Digitalisering", body: "Criteria voor scannen en vastleggen, ordening en naamgeving van bestanden, het scheiden van gemengde batches en de herleidbaarheid van de originelen." },
      { title: "Gegevensinvoer", body: "Welke velden echt nodig zijn, standaardnotaties voor datums, bedragen en valuta, validaties en controles tegen stamgegevens." },
      { title: "Controles", body: "Waar menselijke beoordeling nodig is, functiescheiding en de audittrail waar een auditor of toezichthouder om zal vragen." },
      { title: "Integratie", body: "Hoe de data in je ERP, boekhouding of spreadsheets terechtkomen, en welke stappen het automatiseren waard zijn en welke niet." },
      { title: "Uitrol en training", body: "Een gefaseerd implementatieplan en training voor de mensen die de data invoeren, controleren en gebruiken." },
    ],
    deliverablesHeading: "Opleveringen",
    deliverables:
      "Een schriftelijke diagnose van het huidige proces, het ontwerp van het voorgestelde proces met de bijbehorende controles, en een gefaseerd implementatieplan met indicatoren om het resultaat te meten — invoertijd per document, correctiepercentage, documenten die op beoordeling wachten.",
  },
  ctaHeading: "Neem contact met ons op",
  ctaBody: "Vertel ons over je documenten en je volume, dan vertellen wij welke van deze diensten bij je past.",
  ctaButton: "Plan een gesprek",
  ctaEmail: "of mail naar",
};

export default nl;
