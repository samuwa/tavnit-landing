import type { IntegrationsContent } from "@/content/types";

/** Integrations: the /integrations hub (cards included) and /integrations/mcp — Nederlands (nl). */
const nl: IntegrationsContent = {
  hub: {
    title: "Integraties — API, e-mail, webhooks en MCP",
    description:
      "Elke weg naar Tavnit en weer terug: een MCP-connector voor AI-assistenten, een REST API, doorsturen per e-mail, webhooks en recepten voor Zapier, Make en n8n.",
    ogTitle: "Tavnit-integraties",
    breadcrumbHome: "Home",
    h1: "Integraties",
    intro:
      "Documenten komen bij Tavnit binnen op de manier die het team dat ze verstuurt het beste uitkomt — in de app gesleept, naar een adres doorgestuurd, naar een endpoint gepost of opgevraagd door een AI-assistent. Geëxtraheerde data gaan er op dezelfde manier weer uit.",
    introMore:
      "Elke route draait dezelfde Flows, dus het schema, de opschoonregels en de beoordelingsstappen die je hebt ingesteld, gelden ongeacht hoe een document binnenkomt.",
    whichHeading: "Welke moet je gebruiken?",
    which: [
      "**Als mensen de documenten versturen** — bijvoorbeeld een crediteureninbox die leveranciersfacturen ontvangt — gebruik dan [e-mail](/docs/email-integration). Niemand hoeft een nieuwe tool te leren; ze sturen door zoals ze dat al deden.",
      "**Als een systeem ze verstuurt**, gebruik dan de [REST API](/docs/api-integration) en laat de resultaten terugsturen via een [webhook](/docs/webhooks). Wil je liever geen koppelcode schrijven, dan werken dezelfde endpoints ook vanuit Zapier, Make, n8n en Power Automate.",
      "**Als je samenwerkt met een AI-assistent**, gebruik dan de [MCP-connector](/integrations/mcp). Die geeft claude.ai of Cursor de hele pipeline, niet alleen een ingang: je assistent kan extractie-Flows bouwen, opschoonregels koppelen, documenten erdoorheen halen en bevragen wat je al hebt geëxtraheerd — zonder dat jij met de hand bestanden heen en weer schuift.",
    ],
    finalHeading: "Begin met één document",
    finalBody:
      "Bouw een Flow, stuur er iets doorheen en koppel de levering pas als je de output hebt gezien. Gratis credits om mee te beginnen.",
    finalCta: "Gratis beginnen",
  },
  items: [
    {
      label: "MCP-connector",
      href: "/integrations/mcp",
      summary:
        "Voeg Tavnit toe aan claude.ai, Cursor of een andere MCP-client. Je assistent kan extractie-Flows bouwen, opschoonregels koppelen, documenten erdoorheen halen en de geëxtraheerde data bevragen — allemaal via de chat.",
      own: true,
    },
    {
      label: "REST API",
      href: "/docs/api-integration",
      summary:
        "Stuur documenten programmatisch in met een API-sleutel. Upload als multipart of base64, met voorbeelden in Python en JavaScript.",
      own: false,
    },
    {
      label: "E-mail",
      href: "/docs/email-integration",
      summary:
        "Stuur documenten (automatisch) door naar een eigen adres en laat elke bijlage extraheren — met de resultaten per e-mail terug naar wie ze nodig heeft, zonder de app te openen.",
      own: false,
    },
    {
      label: "Webhooks",
      href: "/docs/webhooks",
      summary:
        "Stuur getypeerde resultaten naar je eigen endpoint zodra een run klaar is, zodat geëxtraheerde data automatisch in je systemen landen.",
      own: false,
    },
    {
      label: "Zapier, Make, n8n en Power Automate",
      href: "/docs/api-integration",
      summary:
        "No-coderecepten die dezelfde endpoints aanroepen, voor teams die dit liever visueel in elkaar klikken dan code te schrijven.",
      own: false,
    },
    {
      label: "Buckets",
      href: "/docs/buckets",
      summary:
        "Bewaar geëxtraheerde rijen in ingebouwde gestructureerde opslag — bewerk ze ter plekke, bevraag ze, zet ze in grafieken of exporteer naar CSV en Excel.",
      own: false,
    },
  ],
  mcp: {
    title: "Documentextractie via MCP voor Claude en Cursor",
    description:
      "Koppel Tavnit via MCP aan claude.ai of Cursor. Je assistent kan extractie-Flows bouwen, documenten erdoorheen halen en de resultaten bevragen — getypeerd en opgeschoond.",
    ogTitle: "MCP-server voor documentextractie | Tavnit",
    schemaHeadline: "MCP-server voor documentextractie — Claude en Cursor",
    schemaName: "MCP-connector",
    breadcrumbHome: "Home",
    breadcrumbHub: "Integraties",
    breadcrumbSelf: "MCP-connector",
    badge: "Model Context Protocol",
    h1: "Geef je AI-assistent een echte documentpipeline",
    lede:
      "Tavnit draait een MCP-server. Koppel die aan claude.ai of Cursor en je assistent krijgt de hele documentpipeline: hij kan extractie-Flows bouwen, opschoonregels koppelen, documenten erdoorheen sturen en de resultaten teruglezen — precies de velden die jij hebt gedefinieerd, opgeschoond en getypeerd, in plaats van een interpretatie van een bestand dat hij toegeschoven kreeg.",
    ledeMore: "Instellen is een URL plakken in de instellingen van je assistent. Geen SDK, geen server om te draaien, geen code.",
    ctaStart: "Gratis beginnen",
    ctaSetup: "Installatiegids",
    problemHeading: "Waarom assistenten worstelen met documenten",
    problem: [
      "AI-assistenten zijn goed in redeneren en slecht in het zijn van een datapipeline. Geef er een een gescande factuur en hij leest die — waarschijnlijk correct, soms niet, en de tweede keer anders. Er is geen schema, dus veldnamen verschuiven tussen runs. Er is geen validatie, dus een verkeerd gelezen totaal ziet er precies zo uit als een correct totaal. En er wordt niet vastgelegd wat er gebeurde, wat ertoe doet zodra de output de boekhouding of compliance raakt.",
      "Voor een losse vraag is dat prima, als proces is het onwerkbaar. Wat een assistent eigenlijk nodig heeft, is een tool die al weet hoe hij jouw documenten moet lezen.",
    ],
    compareHeading: "Een pdf plakken vs. een Flow aanroepen",
    compareCapability: "Mogelijkheid",
    compareChat: "Het bestand in de chat plakken",
    compareMcp: "Via de MCP-connector",
    compareRows: [
      ["Vorm van de output", "Wat het model die keer teruggeeft", "De velden die je Flow definieert, elke keer"],
      ["Veldnamen", "Verschuiven tussen runs", "Vastgelegd door je schema"],
      ["Opschoonregels", "Geen", "Cleaners automatisch toegepast"],
      ["Menselijke beoordeling", "Niet mogelijk", "Optioneel, met audittrail"],
      ["Waar resultaten landen", "In de chat", "Buckets, webhook, e-mail of API"],
      ["Herhaalbaar op volume", "Nee", "Ja — dezelfde Flow, voor elk aantal documenten"],
    ],
    capabilitiesHeading: "Wat je assistent kan zodra hij gekoppeld is",
    capabilities: [
      {
        title: "Een Flow bouwen door hem te beschrijven",
        body: "Vertel de assistent wat hij moet vastleggen — leverancier, datums, totalen, factuurregels — en hij maakt de extractie-Flow aan in je organisatie, klaar om te draaien. Een pipeline opzetten wordt één chatbericht in plaats van een middag configureren.",
      },
      {
        title: "Opschoonregels koppelen",
        body: "Vraag om totalen omgerekend naar USD, genormaliseerde datums of waarden die worden afgestemd op referentiedata, en de assistent maakt de Cleaner aan en koppelt hem aan de Flow — dezelfde regels draaien daarna op elk toekomstig document, hoe het ook binnenkomt.",
      },
      {
        title: "Een document door een Flow halen",
        body: "Vraag de assistent om een factuur, contract of formulier door een van je extractie-Flows te halen. Hij geeft de velden terug die jij hebt gedefinieerd, getypeerd en opgeschoond, geen alinea die ze beschrijft.",
      },
      {
        title: "Bevragen wat je al hebt geëxtraheerd",
        body: "Stel vragen aan je Buckets — wat je vorig kwartaal aan een leverancier hebt betaald, welke contracten volgende maand worden verlengd — en het antwoord komt uit je actuele data in plaats van uit het geheugen van het model.",
      },
    ],
    askHeading: "Dingen die je kunt vragen:",
    ask: [
      "Maak een Flow die leverancier, datums, totalen en factuurregels uit onze vrachtfacturen haalt.",
      "Voeg aan die Flow een Cleaner toe die elk totaal omrekent naar USD.",
      "Haal deze factuur door mijn Flow ‘Leveranciersfacturen’ en laat me de factuurregels zien.",
      "Wat hebben we vorig kwartaal aan Acme Corp betaald, volgens mijn Bucket ‘Facturen’?",
      "Haal de verlengingsdata uit deze drie contracten en vergelijk ze.",
      "Welke runs wachten op dit moment op beoordeling?",
    ],
    fitsHeading: "Hij gebruikt de pipeline die je al hebt gebouwd",
    fitsIntro:
      "De connector is geen aparte extractie-engine. Hij roept dezelfde Flows aan als de rest van Tavnit — of je ze nu in de app hebt gebouwd of de assistent ze voor je heeft gemaakt — dus elke regel die je hebt ingesteld blijft gelden wanneer een assistent het verzoek doet.",
    fits: [
      "[Collections](/docs/collections) classificeren een binnenkomend document nog steeds en sturen het naar de juiste Flow.",
      "[Cleaners](/docs/cleaners) standaardiseren nog steeds notaties, rekenen valuta om en passen je opzoekingen toe.",
      "[Menselijke beoordeling](/docs/human-in-the-loop) pauzeert een run nog steeds wanneer je daarom hebt gevraagd — een assistent kan je goedkeuringsstap niet overslaan.",
      "[Buckets](/docs/buckets) ontvangen nog steeds de resultaten, dus wat de assistent extraheert, is achteraf te bevragen.",
    ],
    scopeHeading: "Bereik en toegang",
    scopeCards: [
      {
        title: "Jouw rechten, niet meer",
        body: "De connector wordt uitgegeven op basis van je eigen API-sleutel en bereikt alleen de organisatie waarin je hem hebt aangemaakt. De assistent erft je rol — hij kan niets wat jij in de app niet zou kunnen.",
      },
      {
        title: "Behandel de URL als een inloggegeven",
        body: "Iedereen die de connector-URL heeft, kan bij je Flows en Buckets. URL's zijn beperkt geldig, en een URL vernieuwen maakt de vorige meteen ongeldig.",
      },
    ],
    scopeMore:
      "Alle details in de [connectordocumentatie](/docs/mcp-connector) en het [overzicht van gebruikersrollen](/docs/user-roles). Het server-endpoint is `{mcpUrl}`.",
    setupHeading: "Koppelen",
    setupBody:
      "Maak een connector-URL aan op de pagina Integraties in Tavnit en plak die in claude.ai onder Settings → Connectors, of voeg hem in Cursor toe als externe MCP-server. Het kost een paar minuten en er is geen code voor nodig.",
    setupLink: "Lees de stapsgewijze installatiegids",
    faqHeading: "Veelgestelde vragen",
    faqs: [
      {
        q: "Wat is het verschil met een pdf in Claude plakken?",
        a: "Met een geplakte pdf vraag je de assistent een document te lezen dat hij nooit eerder heeft gezien, in een formaat waarvoor hij niet is ontworpen, zonder schema en zonder manier om het resultaat te controleren. De MCP-connector stuurt het document door een extractie-Flow die jij hebt gedefinieerd, zodat je elke keer dezelfde benoemde velden krijgt, met dezelfde typen, dezelfde opschoonregels en dezelfde beoordelingsstap. De assistent ontvangt gestructureerde data in plaats van een interpretatie.",
      },
      {
        q: "Kan de assistent Flows en Cleaners bouwen, of alleen draaien?",
        a: "Allebei. Via de connector kan de assistent extractie-Flows en opschoonregels aanmaken zoals jij dat in de app zou doen: beschrijf in gewone taal de velden, tabellen en transformaties die je wilt, en ze worden in je organisatie aangemaakt, klaar om op elk toekomstig document te draaien. Aanmaken volgt je rol — Owners en Admins kunnen bouwen, Members en Viewers kunnen alleen draaien of alleen lezen.",
      },
      {
        q: "Met welke AI-assistenten werkt het?",
        a: "claude.ai met een Pro-abonnement of hoger, Cursor en elke client die een externe MCP-server-URL accepteert. MCP is een open protocol, dus de ondersteuning is niet beperkt tot één leverancier.",
      },
      {
        q: "Moet ik code schrijven?",
        a: "Nee. Je maakt een connector-URL aan in Tavnit en plakt die in de instellingen van je assistent. De Flow die hij aanroept bouw je ook zonder code — je beschrijft de velden die je wilt en Tavnit haalt ze eruit.",
      },
      {
        q: "Kan de assistent alles in het account van mijn bedrijf zien?",
        a: "Nee. De connector wordt uitgegeven op basis van je eigen API-sleutel, dus hij bereikt alleen de organisatie waarin je was ingelogd, met de rechten van je rol. Een Member kan een assistent niets laten doen wat een Member in de app niet kan, en privé-Buckets blijven privé tenzij je toegang hebt gekregen.",
      },
      {
        q: "Kost het gebruik van de connector extra?",
        a: "Nee. Documenten die via de connector worden verwerkt, verbruiken credits tegen het normale tarief van één credit per pagina, net als uploaden via de app of de API aanroepen. Er zijn geen aparte kosten voor MCP-toegang.",
      },
      {
        q: "Wat gebeurt er als de connector-URL verloopt?",
        a: "Connector-URL's zijn beperkt geldig, en Tavnit laat zien wanneer de jouwe is aangemaakt en wanneer hij verloopt. Vernieuwen geeft een nieuwe URL uit en maakt de vorige meteen ongeldig, dus een client die nog de oude heeft, werkt pas weer als je de nieuwe waarde plakt.",
      },
    ],
    finalHeading: "Zet je assistent aan het werk met echte documenten",
    finalBody:
      "Bouw een Flow, maak een connector-URL aan en begin met vragen. Gratis credits om mee te beginnen, geen creditcard nodig.",
    finalPricing: "Bekijk de prijzen",
    finalDemo: "Plan een demo",
  },
};

export default nl;
