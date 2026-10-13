import type { HomeCopy } from "@/content/types";

/** Home (components/LocalizedHome.tsx) — Nederlands (nl). */
const nl: HomeCopy = {
  title: "Tavnit — Haal met AI data uit je documenten, controleer ze en zet ze aan het werk",
  description:
    "Zet facturen, paklijsten, contracten en formulieren om in gestructureerde data, zonder sjabloon per leverancier. Je team controleert en keurt goed voordat er iets wordt geboekt. API, e-mail en MCP.",
  schemaName: "Tavnit in het Nederlands",
  breadcrumbHome: "Home",
  readInEnglish: "Read this page in English",
  eyebrow: "Documentverwerking met AI",
  h1: "Haal met AI data uit je documenten, controleer ze met je team en zet ze aan het werk",
  lede:
    "Tavnit zet facturen, paklijsten, contracten en formulieren om in gestructureerde data — zonder sjabloon per leverancier. Je team controleert en keurt goed voordat er iets wordt geboekt, en goedgekeurde data komen via API, webhook of e-mail in je systemen terecht.",
  ctaDemo: "Plan een demo",
  ctaTry: "Gratis proberen",
  ids: { howItWorks: "how-it-works", useCases: "use-cases", integrations: "integrations", faq: "faq" },
  problemHeading: "Het probleem",
  problems: [
    "Elke maand dezelfde velden overtypen uit honderd verschillende lay-outs. Elke leverancier maakt zijn factuur anders op, en iemand in je team neemt alles met de hand over in een spreadsheet of in het systeem.",
    "OCR-tools met sjablonen werken tot een leverancier zijn lay-out aanpast — en dan gaan ze stilletjes de mist in. ‘Chat met je pdf’-tools verzinnen cijfers en hebben geen controle, geen audittrail en geen koppeling met je systemen.",
    "Een fout totaalbedrag ziet er precies zo uit als een goed totaalbedrag. De echte kosten zitten niet in de uren invoerwerk, maar in de fout die ongemerkt in je boekhouding of je douaneaangifte belandt.",
  ],
  stepsHeading: "Zo werkt het: extraheren, controleren, handelen",
  steps: [
    {
      title: "Extraheren",
      body: "Je legt één keer vast welke velden je nodig hebt — factuurnummer, leverancier, factuurregels met aantal en prijs — en Tavnit haalt ze uit elke pdf, scan of foto, ongeacht de lay-out. Geen sjablonen per leverancier.",
    },
    {
      title: "Controleren",
      body: "Cleaners schonen op en valideren: datumnotaties, valuta, regelberekeningen, opzoekingen in je stamgegevens. Wat niet klopt, wordt tegengehouden en gaat naar een vaste beoordelaar. Alles wordt vastgelegd in een audittrail die alleen kan worden aangevuld.",
    },
    {
      title: "Handelen",
      body: "Goedgekeurde data gaan via API of webhook naar je ERP of boekhouding, worden opgeslagen in een doorzoekbare Bucket, vullen pdf-formulieren in of voeden een agent die namens jou in een webportaal werkt.",
    },
  ],
  useCasesHeading: "Toepassingen",
  useCasesIntro:
    "Elke pagina laat zien welke velden ertoe doen bij dat type document en wat er meestal misgaat — precies wat het ene documenttype lastiger maakt dan het andere.",
  useCasesAll: "Bekijk alle {count} toepassingen",
  integrationsHeading: "Werkt met wat je al gebruikt",
  integrations: [
    "E-mail: stuur de pdf door naar een Tavnit-adres en krijg de data terug. Geen integratie nodig.",
    "REST API en webhooks: stuur documenten vanuit je eigen systeem en ontvang de resultaten zodra ze klaar zijn. Recepten voor Zapier, Make, n8n en Power Automate.",
    "MCP-connector: koppel Tavnit aan claude.ai of Cursor en vraag je assistent om documenten te verwerken of je geëxtraheerde data te bevragen.",
    "Buckets: ingebouwde gestructureerde opslag die je in gewone taal kunt bevragen en in grafieken kunt zetten, zonder iets te exporteren.",
  ],
  integrationsAll: "Alle integraties",
  faqHeading: "Veelgestelde vragen",
  faqs: [
    {
      q: "Moet ik voor elke leverancier een sjabloon bouwen?",
      a: "Nee. Je definieert de velden één keer in een Flow en Tavnit vindt ze in elke lay-out. Past een leverancier de opmaak van zijn factuur aan, dan hoef jij niets te doen.",
    },
    {
      q: "Hoe houd ik een foute waarde uit mijn systeem?",
      a: "Met menselijke beoordeling. Je kunt goedkeuring verplicht stellen voor elk document, of alleen wanneer een Cleaner-regel iets opmerkt — bijvoorbeeld dat aantal maal stukprijs niet overeenkomt met het regeltotaal. De beoordelaar ziet het document en de geëxtraheerde data, corrigeert of keurt goed, en elke handeling wordt vastgelegd in de audittrail.",
    },
    {
      q: "Hoe stuur ik de documenten in?",
      a: "Zoals jij wilt: stuur de e-mail met de pdf als bijlage door naar een Tavnit-adres, upload ze in de app of stuur ze via de API. Resultaten gaan eruit via webhook, API of e-mail, of worden opgeslagen in een Bucket die je kunt bevragen en in grafieken kunt zetten.",
    },
    {
      q: "Werkt het in mijn taal?",
      a: "Ja. Tavnit extraheert documenten in elke taal, en je kunt de data teruggeven met de veldnamen die jouw systeem gebruikt. De app zelf is in meerdere talen beschikbaar.",
    },
    {
      q: "Wat kost het?",
      a: "De prijs is gebaseerd op credits: 1 credit is 1 verwerkte pagina. Plan een demo, dan kijken we samen naar je volume en je echte documenten.",
    },
  ],
  finalHeading: "Probeer het met een van je eigen documenten",
  finalBody:
    "Neem een echte factuur of paklijst mee. In de demo bouwen we samen je eerste Flow en zie je de data live tevoorschijn komen.",
};

export default nl;
