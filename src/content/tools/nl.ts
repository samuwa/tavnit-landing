import type { LiteLocaleCopy } from "@/lib/lite/copy-base";

/**
 * Free tools copy — Nederlands (nl). Translated from ./en.ts; same keys, same
 * {tokens}. Column names, flows and samples stay with the English engine
 * (src/lib/lite/defs, engineLocale()).
 */

const INVOICE_VOCAB = {
  doc: "factuur",
  docs: "facturen",
  a_doc: "een factuur",
  the_doc: "de factuur",
  the_docs: "de facturen",
  your_doc: "je factuur",
  your_docs: "je facturen",
  all_your_docs: "al je facturen",
  all_docs: "alle facturen",
  each_doc: "elke factuur",
  another_doc: "een andere factuur",
  this_doc: "deze factuur",
};

const SPREADSHEET_VOCAB = {
  doc: "spreadsheet",
  docs: "spreadsheets",
  a_doc: "een spreadsheet",
  the_doc: "de spreadsheet",
  the_docs: "de spreadsheets",
  your_doc: "je spreadsheet",
  your_docs: "je spreadsheets",
  all_your_docs: "al je spreadsheets",
  all_docs: "alle spreadsheets",
  each_doc: "elke spreadsheet",
  another_doc: "een andere spreadsheet",
  this_doc: "deze spreadsheet",
};

const nl: LiteLocaleCopy = {
  base: {
    title: "{Doc} naar Excel, gratis: haal de regels uit elke {doc} met AI",
    description:
      "Upload {a_doc} als PDF of foto en krijg de regels als Excel-tabel: omschrijving, aantal, stukprijs en totaal. Gratis, zonder sjablonen en zonder account om het resultaat te zien.",
    label: "{Doc} naar Excel",
    h1: "Zet {a_doc} om naar Excel",
    intro:
      "Upload de PDF of foto. Tavnit leest de kop en elke regel van de tabel en geeft alles terug als spreadsheet. Geen sjablonen per leverancier: dezelfde tool werkt voor {all_your_docs}.",
    trust: ["PDF, JPG of PNG · tot 5 pagina's", "{limit} gratis documenten per dag", "Alles na 24 uur verwijderd"],
    drop: {
      title: "Sleep {your_doc} hierheen",
      hint: "of kies een bestand op je computer",
      choose: "Bestand kiezen",
      sample: "Probeer het met een voorbeeld",
      formats: "PDF, JPG of PNG · tot 4 MB en 5 pagina's",
    },
    stages: [
      "Document uploaden",
      "De kop lezen",
      "De regeltabel zoeken",
      "Kolommen ordenen",
      "Bijna klaar",
    ],
    result: {
      heading: "Klaar: {file}",
      rowWord: ["rij", "rijen"],
      pageWord: ["pagina", "pagina's"],
      summary: "{rows} · {pages}",
      truncated: "{shown} van {total} rijen getoond. De Excel bevat dezelfde {shown}.",
      readyIn: "klaar in {s} s",
      sum: "Som",
      viewer: "Je document",
      openDocument: "Document bekijken",
      closeDocument: "Sluiten",
      retention: "wordt na 24 uur verwijderd",
      hideColumn: "Kolom verwijderen",
      hiddenCols: ["1 kolom verwijderd. De Excel laat hem weg.", "{n} kolommen verwijderd. De Excel laat ze weg."],
      restoreAll: "Alles herstellen",
      restoreOne: "{col} herstellen",
      ghostColumn: "+ Jouw veld",
      ghostHint: "In Tavnit voeg je de velden toe die je wilt: inkoopordernummer, vervaldatum, kostenplaats…",
      flowNote: "Deze {fields} kolommen zijn de velden van een vaste Flow voor {docs}. In je account kies je zelf de velden.",
      flowNoteCta: "Zo werkt het",
      download: "Excel downloaden",
      downloading: "Bestand wordt voorbereid",
      another: "Verwerk {another_doc}",
      empty: "We vonden geen regeltabel in dit document. Probeer {a_doc} met aantallen en prijzen per regel.",
    },
    errors: {
      empty: "Het bestand is leeg.",
      too_large: "Het bestand is groter dan 4 MB. Comprimeer het of upload alleen de pagina's van {the_doc}.",
      unsupported: "Alleen PDF-, JPG- of PNG-bestanden worden geaccepteerd.",
      unreadable: "We konden deze PDF niet openen. Staat er een wachtwoord op? Verwijder het en probeer het opnieuw.",
      too_many_pages: "De gratis versie verwerkt tot 5 pagina's per document.",
      captcha: "We konden niet bevestigen dat je geen bot bent. Herlaad de pagina en probeer het opnieuw.",
      quota: "Je hebt je {limit} gratis documenten voor vandaag gebruikt. Morgen kun je weer, of maak een account aan om door te gaan.",
      daily_cap: "De gratis tool heeft de capaciteit van vandaag bereikt. Kom morgen terug, of maak een account aan en ga nu verder.",
      unavailable: "De tool is nu niet beschikbaar. Probeer het over een paar minuten opnieuw.",
      backend: "Er ging iets mis bij het verwerken van het document. Probeer het opnieuw.",
      failed: "We konden dit document niet uitlezen. Probeer {another_doc} of het voorbeeld.",
      timeout: "Dit duurt langer dan normaal. Wacht even en probeer het opnieuw.",
      forbidden: "Deze actie is hier niet toegestaan.",
      bad_request: "Het bestand ontbreekt of kon niet worden gelezen.",
    },
    auth: {
      title: "Maak een gratis account aan om te downloaden",
      body: "De Excel wordt meteen gedownload. Met een account doe je dit ook voor {all_your_docs} in één keer.",
      google: "Doorgaan met Google",
      or: "of met je e-mailadres",
      signin: "Inloggen",
      signup: "Account aanmaken",
      name: "Naam",
      email: "E-mail",
      password: "Wachtwoord",
      submitSignin: "Inloggen en downloaden",
      submitSignup: "Account aanmaken en downloaden",
      switchToSignin: "Ik heb al een account",
      switchToSignup: "Ik heb nog geen account",
      checkEmail:
        "We hebben je een e-mail gestuurd om je account te bevestigen. Open hem; als je terugkomt, staat de Excel klaar om te downloaden.",
      existing: "Er bestaat al een account met dit e-mailadres. Log in om te downloaden.",
      forgot: "Wachtwoord vergeten",
      close: "Sluiten",
      generic: "We konden de registratie niet afronden. Controleer je e-mailadres en wachtwoord en probeer het opnieuw.",
    },
    next: {
      heading: "En dan?",
      lead: "Dat was één {doc}. Met een account gebeurt hetzelfde met {each_doc} die binnenkomt, en de regels stoppen niet bij een Excel: ze gaan vanzelf verder.",
      source: "{Your_doc}",
      node: "Tavnit",
      nodeSub: "Extractie-Flow",
      items: [
        {
          short: "In je inbox",
          via: "e-mail",
          title: "Het resultaat landt in je inbox",
          body: "Zodra de extractie klaar is, mailt Tavnit de adressen die je in de Flow hebt ingesteld, met de rijen als bijlage in rows.csv. Staat beoordeling aan, dan wacht de e-mail op goedkeuring.",
          linkLabel: "E-mailoutput",
          href: "/docs/email-integration",
          scene: [{ label: "De extractie is klaar" }, { label: "Tavnit stelt de e-mail op" }, { label: "Hij komt aan bij wie jij kiest", result: "rows.csv als bijlage" }],
        },
        {
          short: "In je ERP",
          via: "webhook",
          title: "Via een webhook in je ERP",
          body: "Als een run klaar is, stuurt Tavnit de rijen en de run_id met een POST naar de URL die je opgeeft. Zapier, Make en n8n ontvangen dat met hun webhook-trigger; er is niets native nodig.",
          linkLabel: "Webhooks",
          href: "/docs/webhooks",
          scene: [{ label: "De uitgelezen rijen" }, { label: "Eén POST met rijen en run_id" }, { label: "Ze verschijnen in je systeem", result: "6 regels, niemand typte" }],
        },
        {
          short: "Eerst beoordelen",
          via: "beoordeling",
          title: "Een mens keurt goed voordat het wordt geboekt",
          body: "Zet beoordeling aan voor de Flow en elke run pauzeert. De beoordelaar ziet de bewerkbare tabel naast het originele document: corrigeert cellen, sluit rijen uit, voegt kolommen toe en keurt goed of af. Pas na goedkeuring gaan de e-mail, de webhook en de Bucket de deur uit; elke beslissing wordt vastgelegd. Er is een rol die alleen beoordeelt, voor mensen die verder niets mogen zien.",
          linkLabel: "Menselijke beoordeling",
          href: "/docs/human-in-the-loop",
          scene: [{ label: "De run pauzeert voor beoordeling" }, { label: "Iemand corrigeert naast het document" }, { label: "Goedgekeurd: pas dan geleverd", result: "1 cel gecorrigeerd · vastgelegd" }],
        },
        {
          short: "Offertes vergelijken",
          via: "Matcher",
          title: "Vergelijk meerdere offertes regel voor regel",
          body: "Een Matcher neemt meerdere runs van dezelfde Flow, bijvoorbeeld drie offertes van leveranciers, koppelt de regels op omschrijving en markeert de goedkoopste per regel in een Champion-kolom.",
          linkLabel: "Offertes van leveranciers",
          href: "/use-cases/supplier-quotes",
          scene: [{ label: "Drie offertes, één Flow" }, { label: "De Matcher koppelt de regels" }, { label: "Champion-kolom: de beste per regel", result: "Leverancier B wint 4 van 5" }],
        },
        {
          short: "Regels en controles",
          via: "Cleaner",
          title: "Een Cleaner schoont en controleert elke rij",
          body: "Datumnotatie, getalnotatie, berekende velden, valutaomrekening tegen gepubliceerde koersen en voorwaardelijke acties: faalt een regel, stuur hem dan ter beoordeling, per e-mail of via een webhook.",
          linkLabel: "Cleaners",
          href: "/docs/cleaners",
          scene: [{ label: "De data zoals ze binnenkomen" }, { label: "De Cleaner past je regels toe" }, { label: "Schoon, met afwijkingen gemarkeerd", result: "datum, getal en som op orde" }],
        },
        {
          short: "Een Agent opent het portaal",
          via: "Agent",
          title: "Een Agent logt in op het leveranciersportaal",
          body: "Je beschrijft de opdracht in gewone taal, met een start-URL en inloggegevens in een kluis die het model nooit ziet. Zodra de extractie klaar is, start de Agent vanzelf met de velden van het document en brengt terug wat je vroeg, netjes getypeerd: prijs, levertijd, bestanden.",
          linkLabel: "Agents",
          href: "/docs/agents",
          scene: [{ label: "De extractie is klaar" }, { label: "De Agent bezoekt het portaal" }, { label: "Brengt de data getypeerd terug", result: "prijs 18,50 · levertijd 5 dagen" }],
        },
        {
          short: "Vragen over je data",
          via: "Bucket",
          title: "Stel vragen over {your_docs}",
          body: "De rijen worden opgeslagen in een Bucket. Je vraagt in gewone taal; Tavnit maakt van de vraag een plan (optellen, filteren, maand), voert het uit op de database en antwoordt met het getal. Het model rekent nooit zelf.",
          linkLabel: "Buckets",
          href: "/docs/buckets",
          scene: [{ label: "\"Hoeveel kochten we in augustus bij Istmo?\"" }, { label: "Een plan: som · leverancier · maand" }, { label: "Het getal, berekend in de database", result: "$12.480 over 4 {docs}" }],
        },
      ],
      hint: "Tik op een optie, of op het Tavnit-blok, om te zien wat er gebeurt.",
      flow: {
        title: "De Flow: jij bepaalt de kolommen",
        body: "Een Flow is de definitie van één documenttype: de lijst velden die je eruit wilt halen, elk met een naam, een datatype en of het één keer per document of één keer per regel voorkomt, plus zo nodig een hint waar het staat. Zet hem aan en elk binnenkomend document wordt gelezen op precies die velden; de tabel die eruit komt heeft één kolom per veld. Deze tool gebruikt een vaste Flow voor {docs} met {fields} velden. In je account voeg je velden toe, verwijder je ze of geef je ze een andere naam, en maak je Flows voor elk ander document. Geen sjablonen, geen coördinaten.",
        linkLabel: "Hoe je een Flow definieert",
        href: "/docs/flows",
        scene: [{ label: "Je definieert de velden in twee groepen: document en tabel" }, { label: "De kop wordt één keer gelezen, de tabel rij voor rij" }, { label: "Eén rij per regel: documentwaarden herhalen zich, tabelwaarden wisselen", result: "5 velden → 5 kolommen" }],
        name: "{Doc}",
        kinds: ["Documentvelden", "Tabelvelden"],
        add: { name: "purchase_order", type: "Tekst", hint: "Naast \"PO\" · bijv. PO-2291", save: "Opslaan", value: "PO-2291" },
        activate: "Actief",
      },
      inputs: {
        show: "Hoe komt {your_doc} binnen?",
        hide: "Invoer verbergen",
        items: [
          {
            short: "Per e-mail",
            via: "één adres per Flow",
            title: "Stuur de e-mail door en klaar",
            body: "Elke Flow heeft een eigen e-mailadres op @mg.tavnit.io. Stuur de e-mail met {the_doc} als bijlage door en elke bijlage wordt een run. Onderwerp en tekst worden nooit gelezen.",
            linkLabel: "Invoer per e-mail",
            href: "/docs/email-integration",
            scene: [{ label: "Je stuurt de e-mail met bijlage door" }, { label: "Hij komt aan op het adres van de Flow" }, { label: "Elke bijlage is een run", result: "1 bijlage → 1 run" }],
          },
          {
            short: "Handmatig uploaden",
            via: "vanuit de app",
            title: "Upload vanuit de app",
            body: "Sleep de PDF of foto op de Flow en de run start meteen. Net als wat je hier deed, maar met je account en zonder daglimiet.",
            linkLabel: "Flows",
            href: "/docs/flows",
            scene: [{ label: "Je sleept het bestand op de Flow" }, { label: "De run start" }, { label: "Rijen in seconden", result: "zoals hier, zonder limiet" }],
          },
          {
            short: "API",
            via: "POST /api/runs/process",
            title: "Vanuit je systeem, via de API",
            body: "Eén POST naar /api/runs/process met het bestand en de flow_id, met je API-sleutel. Het antwoord is 202 met de run_id; je doet GET /api/runs/<id> tot hij completed is en de rijen terugkomen.",
            linkLabel: "API",
            href: "/docs/api-integration",
            scene: [{ label: "POST met het bestand en de flow_id" }, { label: "202: run_id, in de wachtrij" }, { label: "GET tot completed", result: "status: completed · 6 rijen" }],
          },
          {
            short: "Zapier · Make · n8n",
            via: "één HTTP-aanroep",
            title: "Vanuit Zapier, Make of n8n",
            body: "Er is geen native app en die is ook niet nodig: een HTTP-stap (Custom Request in Zapier, Make a request in Make) stuurt het bestand naar /api/runs/process. De rijen komen via een webhook terug in de trigger van dezelfde tool.",
            linkLabel: "Integraties",
            href: "/integrations",
            scene: [{ label: "Een HTTP-stap in je scenario" }, { label: "Tavnit verwerkt het" }, { label: "De webhook stuurt de rijen terug", result: "terug in Zapier, Make of n8n" }],
          },
          {
            short: "Meerdere in één PDF",
            via: "een Splitter splitst ze",
            title: "Meerdere documenten in één PDF",
            body: "Een Splitter vindt waar elk document begint, classificeert elk deel volgens de typen die jij beschrijft en stuurt het naar de juiste Flow. Eén scan met drie {docs} wordt drie runs.",
            linkLabel: "Splitters",
            href: "/docs/splitters",
            scene: [{ label: "Eén PDF met drie {docs}" }, { label: "De Splitter knipt en classificeert" }, { label: "Drie runs, één per document", result: "3 delen · 3 runs" }],
          },
        ],
      },
      replay: "Opnieuw afspelen",
      tryIt: "Probeer dit in Tavnit",
      tryItSignedIn: "Doe dit in mijn account",
      primary: "Maak een gratis account aan",
      primarySignedIn: "Naar Tavnit",
      sameLogin: "Je hebt al een account. Log in bij Tavnit met dezelfde gegevens ({email}); er wordt nog één keer om gevraagd omdat het een andere site is.",
      secondary: "Plan een demo",
    },
    cleaners: {
      heading: "Met een Cleaner zou je…",
      lead: "Eenvoudige regels die na de extractie vanzelf over {each_doc} lopen. Vier ideeën met je eigen data:",
      tag: "Cleaners",
      ideas: [
        { icon: "date", title: "Eén manier om de datum te schrijven", from: "{date}", to: "{iso}", note: "{each_doc} in hetzelfde formaat" },
        { icon: "sum", title: "Regels moeten optellen tot het subtotaal", from: "regels {sum}", to: "subtotaal {subtotal}", note: "klopt het niet, dan betaalt niemand het ongezien", check: "sum" },
        { icon: "money", title: "Omrekenen naar je eigen valuta", from: "{total} {currency}", to: "je eigen valuta", note: "tegen de koers op de datum van {the_doc}" },
        { icon: "approve", title: "Goedkeuring boven een bedrag", from: "totaal {total}", to: "goedkeuren vóór betaling", note: "als het boven {threshold} komt" },
      ],
      ok: "Klopt",
      off: "Te beoordelen",
      outro: "Cleaners bouw je in Tavnit met de velden die voor jou tellen. Dit zijn maar voorbeelden.",
      cta: "Maak een gratis account aan en probeer ze",
      ctaSignedIn: "Open Tavnit en probeer ze",
      learn: "Wat een Cleaner is",
    },
    after: {
      title: "Je Excel staat klaar",
      lead: "Hij kwam uit een vaste Flow met {fields} velden. In je account kies je zelf de velden, en zo ziet het eruit als Tavnit {each_doc} verwerkt:",
      close: "Sluiten",
      saved: "opgeslagen in je downloads",
    },
    how: {
      heading: "Zo werkt het",
      steps: [
        {
          title: "Upload {the_doc}",
          body: "PDF, foto of scan. Elke leverancier, elke taal, elke opmaak.",
        },
        {
          title: "Tavnit leest het",
          body: "Het vindt de kop (leverancier, nummer, datum, totalen) en de regeltabel met aantallen en prijzen.",
        },
        {
          title: "Controleren en downloaden",
          body: "De tabel verschijnt op het scherm. Met een gratis account neem je hem mee als Excel.",
        },
      ],
    },
    faqHeading: "Veelgestelde vragen",
    faqs: [
      {
        q: "Wat zit er in de gratis versie?",
        a: "{limit} documenten per dag, met het volledige resultaat op het scherm. Voor het downloaden van de Excel heb je een Tavnit-account nodig, en dat is gratis.",
      },
      {
        q: "Welke formaten worden geaccepteerd?",
        a: "PDF (tekst of gescand), JPG en PNG, tot 4 MB en 5 pagina's. Is {your_doc} langer, upload hem dan in delen of maak een account aan.",
      },
      {
        q: "Kan ik andere kolommen kiezen?",
        a: "Hier niet: deze tool gebruikt een vaste Flow voor {docs} met 13 velden. In je account maak je je eigen Flows, voor {docs} of elk ander document, met de velden die je nodig hebt: per document (inkoopordernummer, vervaldatum, kostenplaats) of per regel (productcode, korting). Geen sjablonen: je beschrijft het veld en geeft zo nodig een hint waar het staat.",
      },
      {
        q: "Moet ik per leverancier een sjabloon instellen?",
        a: "Nee. Tavnit gebruikt geen sjablonen: het leest elk document zoals het binnenkomt, ook als de leverancier morgen een nieuwe opmaak kiest.",
      },
      {
        q: "Wat gebeurt er met mijn bestand?",
        a: "Het wordt verwerkt in een Tavnit-account dat speciaal voor de gratis tools is en nergens anders voor wordt gebruikt. Na 24 uur worden het bestand en de uitgelezen rijen automatisch verwijderd; we bewaren alleen dat er een run heeft plaatsgevonden, zonder het document of de inhoud. Wil je dat het eerder weg is, mail dan naar support@tavnit.io.",
      },
      {
        q: "Waarom heb ik een account nodig om te downloaden?",
        a: "Omdat de gratis versie bedoeld is om het uit te proberen. Met een account voer je dezelfde extractie uit op {all_your_docs}, ontvang je ze per e-mail en stuur je het resultaat naar je eigen systeem.",
      },
      {
        q: "Werkt het met {docs} uit elk land?",
        a: "Ja. Het verwerkt {docs} in het Engels, Spaans en andere talen, met of zonder btw per regel. Het is getest op {docs} uit onder meer de VS, Panama, Mexico en Colombia.",
      },
      {
        q: "Hoe maak ik het automatisch?",
        a: "Maak een account aan, bouw een Flow met de velden die je wilt en stuur {docs} door naar het e-mailadres van de Flow, of koppel hem via de API, webhooks, Zapier, Make of n8n. Het resultaat komt in je ERP of Google Sheets zonder dat iemand iets typt.",
      },
    ],
  },

  hub: {
    title: "Gratis AI-documenttools: factuur naar Excel en meer",
    description:
      "Gratis tools met één doel, gebouwd op de eigen engine van Tavnit: zet een factuur om naar Excel en meer. Geen sjablonen, geen account nodig om het resultaat te zien.",
    h1: "Gratis tools",
    intro:
      "Elke tool doet één ding met één document en laat je het echte resultaat zien. Ze draaien op dezelfde engine die bedrijven gebruiken om hun documenten met Tavnit te automatiseren, alleen één voor één.",
    breadcrumbHome: "Home",
    breadcrumbHub: "Tools",
    groups: { extract: "Document naar Excel", compare: "Documenten vergelijken", split: "Scans ordenen", clean: "Spreadsheets opschonen" },
    outro: "Ze draaien allemaal op dezelfde engine die bedrijven gebruiken om hun documenten met Tavnit te automatiseren. Wil je dat het vanzelf gebeurt, voor al je documenten? Daar is je account voor.",
    outroCta: "Maak een gratis account aan",
  },

  shell: {
    lite: "Lite",
    tools: "Tools",
    site: "Over Tavnit",
    cta: "Gratis account aanmaken",
    ctaSignedIn: "Naar Tavnit",
    nav: { product: "Product", useCases: "Toepassingen", docs: "Docs" },
    demo: "Plan een demo",
    signin: "Inloggen",
    allTools: "Alle tools bekijken",
    allToolsHint: "Gratis. Zie het echte resultaat zonder account; neem het mee met een account.",
    groups: { extract: "Document naar Excel", compare: "Documenten vergelijken", split: "Scans ordenen", clean: "Spreadsheets opschonen" },
    account: {
      signedInAs: "Ingelogd als",
      open: "Naar Tavnit",
      openHint: "Het volledige platform: Flows, automatiseringen en al je volume",
      signOut: "Uitloggen",
      menu: "Je account",
    },
    auth: {
      title: "Maak je gratis account aan",
      body: "Met hetzelfde account download je hier je resultaten en automatiseer je al je documenten in Tavnit.",
      submitSignin: "Inloggen",
      submitSignup: "Account aanmaken",
    },
    menu: "Menu",
    close: "Sluiten",
    privacy: "Privacy",
    terms: "Voorwaarden",
    contact: "Contact",
    rights: "Tavnit. Gratis tools gebouwd op de eigen engine van het product.",
  },

  related: {
    heading: "Als het om elk document gaat, niet om één",
    lead: "Deze tool verwerkt één document tegelijk. Dezelfde engine kan ze per e-mail of API ontvangen, langs de beoordeling van je team leiden en in je systemen afleveren.",
    useCase: "Zo automatiseer je het:",
    guide: "Gids:",
  },

  tools: {
    /** Invoice → Excel. The base copy was written for this tool, so only the
     *  words — plus a <title> short enough not to be cut in search results. */
    "invoice-to-excel": {
      vocab: INVOICE_VOCAB,
      overrides: { title: "Factuur naar Excel, gratis: AI leest elke factuurregel" },
    },
    /** Invoice line item extractor: same Flow and words as invoice → Excel. */
    "invoice-line-items": {
      vocab: INVOICE_VOCAB,
      overrides: {
        title: "Gratis factuurregels uitlezen: regels naar Excel",
        description:
          "Haal factuurregels (omschrijving, aantal, stukprijs en bedrag) op als Excel-rijen, met leverancier, nummer en datum op elke rij. PDF of foto, geen sjablonen, geen account nodig om het resultaat te zien.",
        label: "Factuurregels uitlezen",
        h1: "Haal de regels uit een factuur",
        intro:
          "Elke rij van de factuurtabel (omschrijving, aantal, eenheid, stukprijs en bedrag) wordt een rij, en de kop (leverancier, nummer, datum, totalen) staat op elke rij herhaald. Zo heeft de boekhouding en crediteurenadministratie factuurregels nodig om ze te boeken, af te stemmen of te controleren tegen een inkooporder. Werkt met PDF's, scans en foto's, zonder sjablonen per leverancier.",
        drop: {
          title: "Sleep de factuur hierheen waarvan je de regels nodig hebt",
          sample: "Probeer het met een factuur van zes regels",
        },
        stages: [
          "De factuur uploaden",
          "De kop lezen",
          "De regeltabel herkennen",
          "Elke rij apart zetten",
          "Bijna klaar",
        ],
        result: {
          flowNote: "Deze {fields} kolommen zijn de velden van een vaste factuur-Flow: kop en regels. In je account kies je zelf de velden.",
        },
        how: {
          heading: "Zo werkt het",
          steps: [
            {
              title: "Upload de factuur",
              body: "Tekst-PDF, scan of foto. Eén pagina of meerdere, tot 5.",
            },
            {
              title: "Tavnit zet de regels apart",
              body: "Het vindt de tabel ook zonder lijnen, leest elke rij (omschrijving, aantal, eenheid, prijs, bedrag) en koppelt de kop eraan.",
            },
            {
              title: "Controleren en downloaden",
              body: "Eén rij per factuurregel op het scherm. Met een gratis account neem je hem mee als Excel, zonder de kolommen die je niet nodig hebt.",
            },
          ],
        },
        faqs: [
          {
            q: "Wat is een factuurregel?",
            a: "Elke rij van de detailtabel: één product of dienst met omschrijving, aantal, eenheid, stukprijs en bedrag. De totalen onderaan (subtotaal, btw, totaal) zijn geen factuurregels; die komen terug als kopvelden die op elke rij worden herhaald.",
          },
          {
            q: "Waarom staan leverancier en nummer op elke rij?",
            a: "Zodat elke rij op zichzelf staat: je kunt de regels van veel facturen filteren, optellen of in één blad plakken zonder te verliezen van welke factuur ze komen. Dat is de vorm die een ERP, een draaitabel of een afstemming verwacht.",
          },
          {
            q: "Werkt het als de tabel over meerdere pagina's loopt?",
            a: "Ja. Tavnit volgt de tabel van de ene pagina naar de volgende en geeft alle regels op volgorde terug, zonder de kolomkop te herhalen alsof het een rij is. De gratis versie verwerkt tot 5 pagina's.",
          },
          {
            q: "En omschrijvingen over twee regels of samengevoegde cellen?",
            a: "Een omschrijving die op de volgende rij doorloopt, wordt bij haar regel gevoegd; een samengevoegde cel geldt voor de regels die ze beslaat. We zijn niet afhankelijk van de lijnen van de tabel, maar lezen welk aantal, welke prijs en welk bedrag bij elke omschrijving horen.",
          },
          {
            q: "Hoe worden kortingen en btw per regel verwerkt?",
            a: "Het bedrag van elke regel komt eruit zoals het gedrukt staat. Een korting of btw die de factuur als aparte rij toont, wordt geen factuurregel; die geldt als documenttotaal. Vermelden je facturen de btw per regel, dan voeg je dat veld met een account toe aan de Flow.",
          },
          {
            q: "Kan ik de regels controleren tegen mijn inkooporder?",
            a: "Ja, met de gratis controle inkooporder vs. factuur (/tools/po-vs-invoice-check): upload beide documenten en hij markeert regels met een andere prijs of een ander aantal, regels die ontbreken en regels die zijn toegevoegd.",
          },
          {
            q: "Heb ik een sjabloon per leverancier nodig?",
            a: "Nee. Tavnit leest elke factuur zoals ze binnenkomt; als de leverancier morgen een nieuwe opmaak kiest, werkt het nog steeds. Daarom verwerkt het ook facturen uit verschillende landen en talen op dezelfde manier.",
          },
          {
            q: "Hoe doe ik dit voor honderden facturen?",
            a: "Met een account maak je een Flow met dezelfde velden (of je eigen) en stuur je facturen door naar het e-mailadres van de Flow, of je stuurt ze via de API. Elke factuur komt als rijen in je ERP, Google Sheets of een Bucket, zonder dat iemand iets typt.",
          },
        ],
      },
    },
    /** PO vs invoice check: two documents through one "purchase document" Flow, then the Matcher. */
    "po-invoice-check": {
      vocab: INVOICE_VOCAB,
      overrides: {
        title: "Gratis inkooporder vs. factuur controleren, per regel",
        description:
          "Upload de inkooporder en de factuur en Tavnit vergelijkt ze regel voor regel: prijsverschillen, verschillen in aantal, regels die op de factuur ontbreken en regels die niet op de inkooporder staan. Gratis, geen sjablonen, geen account nodig om het resultaat te zien.",
        label: "Inkooporder vs. factuur",
        h1: "Controleer een factuur tegen de inkooporder",
        intro:
          "Upload de inkooporder en de factuur, als PDF of foto. Tavnit leest beide, koppelt elke orderregel aan de factuurregel die hetzelfde betekent, ook als de tekst verschilt, en markeert waar de prijs is veranderd, waar het aantal afwijkt, wat op de factuur ontbreekt en wat nooit op de inkooporder stond.",
        trust: ["Een inkooporder en een factuur · PDF of foto", "{limit} gratis documenten per dag", "Alles na 24 uur verwijderd"],
        drop: {
          title: "Sleep het document hierheen",
          sample: "Probeer het met een voorbeeldorder en -factuur",
          formats: "PDF, JPG of PNG · tot 4 MB en 5 pagina's per document",
        },
        stages: ["De documenten uploaden", "De inkooporder lezen", "De factuur lezen", "De regels koppelen", "Bijna klaar"],
        result: {
          another: "Andere documenten vergelijken",
          download: "Vergelijking downloaden als Excel",
          flowNote: "Deze {fields} kolommen zijn de velden van een vaste Flow voor inkoopdocumenten. In je account kies je zelf de velden.",
          ghostHint: "In Tavnit voeg je de velden toe die je wilt: kostenplaats, ontvangstnummer, project…",
        },
        errors: {
          no_lines: "In een van de twee documenten vonden we geen regels met aantallen en prijzen. Controleer of het een inkooporder en een factuur met een artikeltabel zijn.",
          not_ready: "We zijn de documenten nog aan het lezen. Wacht even en probeer het opnieuw.",
          failed: "We konden een van de documenten niet lezen. Probeer andere bestanden, of de voorbeelden.",
          too_large: "Een van de bestanden is groter dan 4 MB. Comprimeer het of upload alleen de pagina's van het document.",
        },
        next: {
          lead: "Dat was één inkooporder en één factuur. Met een account wordt elke binnenkomende factuur vanzelf tegen haar inkooporder gecontroleerd, en het resultaat stopt niet bij een Excel: het gaat verder.",
          source: "Je inkooporder en factuur",
          flow: {
            name: "Inkoopdocument",
            add: { name: "receipt_number", type: "Tekst", hint: 'Naast "Ontvangst" · bijv. REC-1187', save: "Opslaan", value: "REC-1187" },
          },
          inputs: { show: "Hoe komen je documenten binnen?" },
        },
        cleaners: {
          heading: "Met een Cleaner zou je…",
          lead: "Eenvoudige regels die vanzelf over elke controle lopen. Vier ideeën:",
          ideas: [
            { icon: "alert", title: "Blokkeer de factuur als een prijs meer dan 2 % stijgt", from: "orderprijs 22,40", to: "factuur 23,90", note: "het verschil wordt gemarkeerd voordat iemand het betaalt" },
            { icon: "approve", title: "Goedkeuring als het aantal afwijkt", from: "order 300 stuks", to: "factuur 280", note: "inkoop bevestigt een deellevering of een fout" },
            { icon: "mail", title: "Mail inkoop met de verschillen", from: "controle klaar", to: "e-mail naar inkoop@", note: "alleen als er iets te beoordelen is" },
            { icon: "sum", title: "Factuurtotaal tegen ordertotaal", from: "order 5.189,07", to: "factuur 4.960,63", note: "klopt het niet, dan stopt het vóór het boeken" },
          ],
          outro: "Cleaners bouw je in Tavnit met de velden die voor jou tellen. Dit zijn maar voorbeelden.",
        },
        after: {
          lead: "Hij kwam uit een vaste Flow met {fields} velden en een Matcher. In je account kies je zelf de velden, en zo ziet het eruit als Tavnit elke binnenkomende factuur controleert:",
        },
        how: {
          heading: "Zo werkt het",
          steps: [
            { title: "Upload beide documenten", body: "De inkooporder en de factuur, als PDF of foto. Elke leverancier, elke taal, elke opmaak." },
            { title: "Tavnit leest beide met één Flow", body: "Kop (nummer, datum, leverancier, totalen) en elke regel met aantal en prijs, in beide documenten." },
            { title: "De Matcher koppelt de regels", body: "Elke orderregel wordt gekoppeld aan de factuurregel die hetzelfde betekent, en prijs en aantal worden vergeleken. Met je account neem je de vergelijking mee als Excel." },
          ],
        },
        faqs: [
          {
            q: "Wat zit er in de gratis versie?",
            a: "{limit} documenten per dag (één controle telt voor twee), met het volledige resultaat op het scherm. Voor het downloaden van de vergelijking als Excel heb je een Tavnit-account nodig, en dat is gratis.",
          },
          {
            q: "Hoe koppelt het regels als de tekst niet identiek is?",
            a: "Een Matcher van Tavnit vergelijkt omschrijvingen op betekenis, niet letter voor letter: \"Langkorrelige rijst 20 lb\" en \"RICE L/GRAIN PREMIUM 20LB\" zijn dezelfde regel. Liggen twee omschrijvingen dicht bij elkaar maar is het niet duidelijk, dan beslist een tweede stap of het om hetzelfde artikel gaat.",
          },
          {
            q: "Welke tolerantie geldt voor prijzen?",
            a: "Een prijs wordt als afwijkend gemarkeerd als hij meer dan 0,5 % of meer dan één cent verschilt. Aantallen worden exact vergeleken. Met je account stel je met een Cleaner je eigen tolerantie in.",
          },
          {
            q: "Wat betekenen \"Ontbreekt op factuur\" en \"Niet op order\"?",
            a: "\"Ontbreekt op factuur\" is een orderregel die de leverancier niet heeft gefactureerd (deellevering of levering die nog komt). \"Niet op order\" is een gefactureerde regel die niemand op die inkooporder heeft besteld.",
          },
          {
            q: "Kan ik een three-way match doen met de ontvangstbon?",
            a: "Hier niet: de gratis versie vergelijkt twee documenten. Met je account voeg je de ontvangstbon toe als derde document van dezelfde Flow en controleert de Matcher alle drie, of je bouwt Cleaner-regels zodat de factuur pas wordt geboekt als de ontvangst klopt.",
          },
          {
            q: "Welke formaten worden geaccepteerd?",
            a: "PDF (tekst of gescand), JPG en PNG, tot 4 MB en 5 pagina's per document. Het werkt met inkooporders uit een ERP en facturen van elke leverancier.",
          },
          {
            q: "Wat gebeurt er met mijn bestanden?",
            a: "Ze worden verwerkt in een Tavnit-account dat speciaal voor de gratis tools is en nergens anders voor wordt gebruikt. Na 24 uur worden de bestanden en de vergelijking automatisch verwijderd; we bewaren alleen dat er een run heeft plaatsgevonden, zonder de documenten of de inhoud.",
          },
          {
            q: "Hoe maak ik het automatisch?",
            a: "Maak een account aan, bouw een Flow voor je inkoopdocumenten en daarbovenop een Matcher. Facturen komen binnen per e-mail of API, worden aan hun inkooporder gekoppeld, en de verschillen gaan per e-mail, webhook of naar je ERP zonder dat iemand iets typt.",
          },
        ],
        compare: {
          slots: [
            { title: "Inkooporder", hint: "PDF of foto van de order", sample: "Voorbeeldorder" },
            { title: "Factuur", hint: "PDF of foto van de factuur", sample: "Voorbeeldfactuur" },
          ],
          run: "Vergelijken",
          sampleAll: "Probeer het met een voorbeeldorder en -factuur",
          stages: ["De inkooporder en de factuur lezen", "De regels sorteren", "De Matcher koppelt de regels", "Bijna klaar"],
          heading: "Vergelijking klaar",
          summary: "{n} · {ref} vs. {doc}",
          labels: {
            description: "Omschrijving",
            quantity: "Aantal",
            price: "Prijs",
            total: "Totaal",
            status: "Status",
            ref: "Order",
            doc: "Factuur",
            supplier: "Leverancier",
            champion: "Champion",
            wins: "{n} regels gewonnen",
            lines: ["regel", "regels"],
          },
          status: {
            ok: "Klopt",
            price: "Prijs wijkt af",
            qty: "Aantal wijkt af",
            both: "Prijs en aantal wijken af",
            missing: "Ontbreekt op factuur",
            extra: "Niet op order",
          },
          empty: "We konden geen regels koppelen. Controleer of beide documenten een artikeltabel met aantallen en prijzen hebben.",
          another: "Andere documenten vergelijken",
          download: "Vergelijking downloaden als Excel",
        },
      },
    },
    /** Split a scanned PDF into its documents (a Splitter, not a Flow). */
    "split-scanned-pdf": {
      vocab: {
        doc: "gescande PDF",
        docs: "gescande PDF's",
        a_doc: "een gescande PDF",
        the_doc: "de PDF",
        the_docs: "de PDF's",
        your_doc: "je PDF",
        your_docs: "je PDF's",
        all_your_docs: "al je PDF's",
        all_docs: "alle PDF's",
        each_doc: "elke PDF",
        another_doc: "een andere PDF",
        this_doc: "deze PDF",
      },
      overrides: {
        title: "Gescande PDF splitsen in documenten, gratis (AI)",
        description:
          "Upload één PDF met meerdere samen gescande documenten (facturen, inkooporders, bonnen, contracten) en krijg elk document apart terug, geclassificeerd op type. Gratis, zonder pagina's te markeren.",
        label: "Gescande PDF splitsen",
        h1: "Splits een gescande PDF in losse documenten",
        intro:
          "Je haalde tien papieren door de scanner en kreeg één PDF. Upload hem: Tavnit leest elke pagina, vindt waar elk document begint en geeft ze één voor één terug, elk met zijn type (factuur, inkooporder, bon, paklijst, cognossement, contract…). Niet splitsen op aantal pagina's, niets handmatig markeren.",
        trust: ["Eén PDF · tot 12 pagina's", "{limit} gratis documenten per dag", "Alles na 24 uur verwijderd"],
        drop: {
          title: "Sleep je gescande PDF hierheen",
          hint: "één PDF met meerdere documenten erin",
          choose: "Bestand kiezen",
          sample: "Probeer het met een voorbeeldscan",
          formats: "PDF · tot 4 MB en 12 pagina's",
        },
        stages: ["De PDF uploaden", "Elke pagina lezen", "Zoeken waar elk document begint", "Classificeren", "Bijna klaar"],
        result: {
          retention: "wordt na 24 uur verwijderd",
          downloading: "Bestand wordt voorbereid",
          another: "Nog een PDF splitsen",
          empty: "We vonden niet meer dan één document in deze PDF.",
          flowNote: "Deze typen horen bij de vaste Splitter van deze tool. In je account bepaal je zelf de typen.",
        },
        errors: {
          too_large: "Het bestand is groter dan 4 MB. Comprimeer het of splits de scan in tweeën.",
          too_many_pages: "De gratis versie splitst tot 12 pagina's per PDF. Met een account is er geen limiet.",
          unsupported: "We accepteren alleen PDF, JPG of PNG. Upload de PDF van de scanner om documenten te splitsen.",
          failed: "We konden deze PDF niet splitsen. Probeer een andere scan, of het voorbeeld.",
          empty: "Het bestand is leeg.",
        },
        next: {
          lead: "Dat was één PDF. Met een account gaat elk document dat de Splitter knipt naar zijn eigen Flow: de factuur naar de factuurextractie, de inkooporder naar de zijne, de bon naar de onkostendeclaratie. Niemand hoeft nog met de hand te scheiden of te sorteren.",
          source: "Je PDF",
          flow: {
            title: "Van de Splitter naar de Flow: elk document naar zijn extractie",
            body: "Een Splitter vindt waar elk document begint en classificeert het volgens de typen die jij in woorden beschrijft. Deze tool gebruikt een vaste Splitter met acht typen en zonder outputs: hij geeft je alleen de documenten. In je account bepaal je je eigen typen en per type waar het heen gaat: naar een Flow die de velden uitleest (zoals hieronder, met {fields} velden), naar een e-mailadres of naar een Collection. Geen sjablonen, geen coördinaten.",
            linkLabel: "Hoe een Splitter werkt",
            href: "/docs/splitters",
          },
          inputs: {
            show: "Hoe komt je PDF binnen?",
          },
        },
        cleaners: {
          heading: "Na het splitsen, in Tavnit…",
          lead: "Elk documenttype kan zijn eigen bestemming hebben, zonder dat iemand met de hand sorteert. Vier voorbeelden:",
          ideas: [
            { icon: "text", title: "Elke factuur naar haar Flow en door naar het ERP", from: "factuur (p. 1–2)", to: "Factuur-Flow → ERP", note: "uitgelezen en geboekt zonder handwerk" },
            { icon: "mail", title: "Bonnen naar de onkostendeclaratie", from: "bon (p. 5)", to: "onkosten@jouwbedrijf", note: "elke bon komt bij wie hem afstemt" },
            { icon: "calendar", title: "Contracten met hun datums naar het juridisch archief", from: "contract (p. 6–7)", to: "Contract-Flow", note: "einddatum en verlenging in één tabel" },
            { icon: "alert", title: "Een seintje als iets niet wordt herkend", from: "niet-geclassificeerde pagina", to: "menselijke beoordeling", note: "niets raakt kwijt of komt verkeerd terecht" },
          ],
          outro: "Bestemmingen stel je in Tavnit per documenttype in. Dit zijn maar voorbeelden.",
          cta: "Maak een gratis account aan en stel het in",
          ctaSignedIn: "Open Tavnit en stel het in",
          learn: "Wat een Splitter is",
        },
        after: {
          title: "Je documenten staan klaar",
          lead: "Ze kwamen uit een vaste Splitter met acht typen. In je account bepaal je zelf de typen, en elk document gaat vanzelf door naar zijn Flow:",
          close: "Sluiten",
        },
        how: {
          heading: "Zo werkt het",
          steps: [
            { title: "Upload de scan", body: "Eén PDF met meerdere documenten erin, precies zoals hij uit de scanner kwam. Elke volgorde, elk aantal pagina's per document." },
            { title: "Tavnit splitst en classificeert", body: "Het leest elke pagina, herkent waar elk document begint en kent het een type toe: factuur, inkooporder, bon, paklijst, cognossement, contract, creditnota of overig." },
            { title: "Download elk document", body: "Je ziet de lijst met paginabereiken en typen. Met een gratis account neem je elke PDF apart mee, of alles samen in een zip." },
          ],
        },
        faqs: [
          {
            q: "Hoe weet het waar een document eindigt en het volgende begint?",
            a: "De AI bekijkt alle pagina's samen, zoals een mens dat zou doen: een andere kop, een ander bedrijf, andere paginanummering, een andere opmaak. Het telt geen pagina's en zoekt geen markeringen, en daarom werkt het ook als een factuur twee pagina's beslaat en de bon er maar één.",
          },
          {
            q: "Welke documenttypen herkent het?",
            a: "Hier acht: factuur, inkooporder, bon, paklijst, cognossement, contract, creditnota en overig. Met een account definieer je je eigen typen door ze in woorden te beschrijven, en per type bepaal je waar het heen gaat: naar een Flow die de data uitleest, naar een e-mailadres of naar een Collection.",
          },
          {
            q: "Wat zit er in de gratis versie?",
            a: "{limit} documenten per dag, met het volledige resultaat op het scherm. Voor het downloaden van de losse PDF's heb je een Tavnit-account nodig, en dat is gratis.",
          },
          {
            q: "Hoeveel pagina's kan ik uploaden?",
            a: "In de gratis versie tot 12 pagina's per PDF, tot 4 MB. Met een account is er geen paginalimiet en kun je scans rechtstreeks naar de Splitter mailen.",
          },
          {
            q: "Werkt het met slechte scans of gemengde talen?",
            a: "Ja. Het kan overweg met scheve scans, grijswaarden en stempels, en met documenten in het Engels, Spaans of andere talen door elkaar in dezelfde PDF. Kan een pagina niet worden gelezen, dan wordt ze als niet-geclassificeerd gemarkeerd in plaats van een verzonnen type te krijgen.",
          },
          {
            q: "Wat gebeurt er met mijn bestand?",
            a: "Het wordt verwerkt in een Tavnit-account dat speciaal voor de gratis tools is en nergens anders voor wordt gebruikt. Na 24 uur worden de PDF en de losse documenten automatisch verwijderd; we bewaren alleen dat er een run heeft plaatsgevonden, zonder het bestand of de inhoud. Wil je dat het eerder weg is, mail dan naar support@tavnit.io.",
          },
          {
            q: "Waarom heb ik een account nodig om te downloaden?",
            a: "Omdat de gratis versie bedoeld is om het uit te proberen. Met een account splits je elke scan, stuur je elk document naar zijn Flow en ontvang je de uitgelezen data in je ERP of per e-mail.",
          },
          {
            q: "Hoe maak ik het automatisch?",
            a: "Maak een account aan, bouw een Splitter met je documenttypen en stuur scans door naar het e-mailadres ervan, of koppel hem via de API. Elk document dat hij knipt gaat vanzelf naar zijn Flow, en van daaruit naar je ERP, Google Sheets of een inbox.",
          },
        ],
        split: {
          heading: "Klaar: {file}",
          summary: "{n} in {pages}",
          segmentWord: ["document", "documenten"],
          pageWord: ["pagina", "pagina's"],
          pages: "p. {from}–{to}",
          pageOne: "p. {from}",
          unmatched: "Niet geclassificeerd",
          type: "Type",
          reason: "Waarom",
          download: "Downloaden",
          downloadAll: "Alles downloaden (zip)",
          stages: ["De PDF uploaden", "Elke pagina lezen", "Zoeken waar elk document begint", "Classificeren", "Bijna klaar"],
          empty: "We vonden niet meer dan één document in deze PDF.",
          another: "Nog een PDF splitsen",
        },
      },
    },
    /** Packing list → Excel. */
    "packing-list-to-excel": {
      vocab: {
        doc: "paklijst",
        docs: "paklijsten",
        a_doc: "een paklijst",
        the_doc: "de paklijst",
        the_docs: "de paklijsten",
        your_doc: "je paklijst",
        your_docs: "je paklijsten",
        all_your_docs: "al je paklijsten",
        all_docs: "alle paklijsten",
        each_doc: "elke paklijst",
        another_doc: "een andere paklijst",
        this_doc: "deze paklijst",
      },
      overrides: {
        title: "Paklijst naar Excel, gratis: AI leest elke regel",
        description:
          "Upload een paklijst als PDF of foto en krijg elke regel als Excel-tabel: omschrijving, aantal, colli, netto- en brutogewicht, afmetingen, met afzender, ontvanger en havens. Gratis, geen sjablonen, geen account nodig om het resultaat te zien.",
        label: "Paklijst naar Excel",
        h1: "Zet een paklijst om naar Excel",
        intro:
          "Upload de PDF of foto. Tavnit leest de kop van de zending (afzender, ontvanger, havens, totalen) en elke goederenregel met colli, gewichten en afmetingen, en geeft alles terug als spreadsheet. Geen sjablonen per leverancier: dezelfde tool werkt voor de paklijsten van al je zendingen.",
        drop: {
          title: "Sleep je paklijst hierheen",
          sample: "Probeer het met een voorbeeldpaklijst",
        },
        stages: ["Document uploaden", "De kop van de zending lezen", "De goederenregels zoeken", "Kolommen ordenen", "Bijna klaar"],
        result: {
          empty: "We vonden geen goederenregels in dit document. Probeer een paklijst met colli, gewichten of aantallen per regel.",
          flowNote: "Deze {fields} kolommen zijn de velden van een vaste paklijst-Flow. In je account kies je zelf de velden.",
          ghostHint: "In Tavnit voeg je de velden toe die je wilt: container, merken, HS-code, B/L-nummer…",
        },
        next: {
          lead: "Dat was één paklijst. Met een account gebeurt hetzelfde met elke paklijst die binnenkomt, en de regels stoppen niet bij een Excel: ze gaan vanzelf verder.",
          source: "Je paklijst",
          flow: {
            name: "Paklijst",
            add: { name: "container", type: "Tekst", hint: "Naast \"Container\" · bijv. MSKU-4417", save: "Opslaan", value: "MSKU-4417" },
          },
          inputs: { show: "Hoe komt je paklijst binnen?" },
        },
        cleaners: {
          lead: "Eenvoudige regels die na de extractie vanzelf over elke paklijst lopen. Vier ideeën met je eigen data:",
          ideas: [
            { icon: "date", title: "Eén manier om de datum te schrijven", from: "{date}", to: "{iso}", note: "elke paklijst in hetzelfde formaat" },
            { icon: "alert", title: "Brutogewicht moet hoger zijn dan netto", from: "netto > bruto", to: "te beoordelen", note: "een omgedraaide regel wordt nooit ongezien aangegeven" },
            { icon: "calendar", title: "Seintje vóór vertrek", from: "verzenddatum", to: "herinnering 2 dagen vooraf", note: "naar je douane-expediteur en logistiek" },
            { icon: "mail", title: "Kopie naar de douane-expediteur", from: "uitgelezen paklijst", to: "e-mail met de Excel", note: "samen met de bijbehorende factuur" },
          ],
        },
        after: {
          lead: "Hij kwam uit een vaste Flow met {fields} velden. In je account kies je zelf de velden, en zo ziet het eruit als Tavnit elke paklijst verwerkt:",
        },
        how: {
          steps: [
            { title: "Upload de paklijst", body: "PDF, foto of scan. Elke afzender, elke taal, elke opmaak." },
            {
              title: "Tavnit leest het",
              body: "Het vindt de kop (afzender, ontvanger, havens, totalen) en de goederentabel met colli, nettogewicht, brutogewicht en afmetingen per regel.",
            },
            { title: "Controleren en downloaden", body: "De tabel verschijnt op het scherm. Met een gratis account neem je hem mee als Excel." },
          ],
        },
        faqs: [
          {
            q: "Wat zit er in de gratis versie?",
            a: "{limit} documenten per dag, met het volledige resultaat op het scherm. Voor het downloaden van de Excel heb je een Tavnit-account nodig, en dat is gratis.",
          },
          {
            q: "Welke formaten worden geaccepteerd?",
            a: "PDF (tekst of gescand), JPG en PNG, tot 4 MB en 5 pagina's. Is je paklijst langer, upload hem dan in delen of maak een account aan.",
          },
          {
            q: "Welke kolommen haalt het uit een paklijst?",
            a: "Per document: afzender, ontvanger, nummer, datum, bijbehorende factuur, laadhaven, loshaven en de totalen van colli en gewichten. Per regel: omschrijving, aantal, eenheid, colli, nettogewicht, brutogewicht en afmetingen. Documentwaarden worden op elke rij herhaald, zodat de tabel zich vanzelf laat filteren.",
          },
          {
            q: "Kan ik andere kolommen kiezen?",
            a: "Hier niet: deze tool gebruikt een vaste paklijst-Flow met 17 velden. In je account maak je je eigen Flows, voor paklijsten of elk ander document, met de velden die je nodig hebt: per document (container, zegel, B/L-nummer, incoterm) of per regel (merken, HS-code, volume). Geen sjablonen: je beschrijft het veld en geeft zo nodig een hint waar het staat.",
          },
          {
            q: "Werkt het met paklijsten uit elk land?",
            a: "Ja. Het verwerkt paklijsten in het Engels, Spaans en andere talen, met gewichten in kg of lb en maten in cm of inch, precies zoals ze gedrukt staan. Het is getest op zendingen uit onder meer Panama, Colombia, Mexico, China en de VS.",
          },
          {
            q: "Moet ik per leverancier een sjabloon instellen?",
            a: "Nee. Tavnit gebruikt geen sjablonen: het leest elk document zoals het binnenkomt, ook als de afzender morgen de opmaak van zijn paklijst verandert.",
          },
          {
            q: "Wat gebeurt er met mijn bestand?",
            a: "Het wordt verwerkt in een Tavnit-account dat speciaal voor de gratis tools is en nergens anders voor wordt gebruikt. Na 24 uur worden het bestand en de uitgelezen rijen automatisch verwijderd; we bewaren alleen dat er een run heeft plaatsgevonden, zonder het document of de inhoud. Wil je dat het eerder weg is, mail dan naar support@tavnit.io.",
          },
          {
            q: "Hoe maak ik het automatisch?",
            a: "Maak een account aan, bouw een Flow met de velden die je wilt en stuur paklijsten door naar het e-mailadres van de Flow, of koppel hem via de API, webhooks, Zapier, Make of n8n. Elke zending komt in je douanesysteem, je ERP of Google Sheets zonder dat iemand iets typt.",
          },
        ],
      },
    },
    /** Bill of lading → Excel ("cognossement" or simply B/L in Dutch trade). */
    "bill-of-lading-to-excel": {
      vocab: {
        doc: "cognossement",
        docs: "cognossementen",
        a_doc: "een cognossement",
        the_doc: "het cognossement",
        the_docs: "de cognossementen",
        your_doc: "je cognossement",
        your_docs: "je cognossementen",
        all_your_docs: "al je cognossementen",
        all_docs: "alle cognossementen",
        each_doc: "elk cognossement",
        another_doc: "een ander cognossement",
        this_doc: "dit cognossement",
      },
      overrides: {
        title: "Cognossement (B/L) naar Excel, gratis: B/L-data uitlezen",
        description:
          "Upload een cognossement (B/L) als PDF of foto en krijg de gegevens als Excel-tabel: B/L-nummer, rederij, afzender, ontvanger, schip, havens en één rij per container met zegel, goederen, colli, gewicht en volume. Gratis, geen sjablonen, geen account nodig om het resultaat te zien.",
        label: "Cognossement naar Excel",
        h1: "Zet een cognossement om naar Excel",
        intro:
          "Upload de PDF of foto van de B/L. Tavnit leest de kop (B/L-nummer, rederij, afzender, ontvanger, schip, reis, havens, shipped-on-board-datum) en elke ladingregel met container, zegel, colli, brutogewicht en volume, en geeft alles terug als spreadsheet. Geen sjablonen per rederij: dezelfde Flow leest MSC, Maersk, Hapag-Lloyd of elke NVOCC.",
        drop: {
          title: "Sleep je cognossement hierheen",
          sample: "Probeer het met een voorbeeld-B/L",
        },
        stages: ["Document uploaden", "De kop van de B/L lezen", "De ladingregels zoeken", "Kolommen ordenen", "Bijna klaar"],
        result: {
          empty: "We vonden geen ladingregels in dit document. Probeer een cognossement met de tabel van containers en goederen.",
          flowNote: "Deze {fields} kolommen zijn de velden van een vaste Flow voor cognossementen. In je account kies je zelf de velden.",
          ghostHint: "In Tavnit voeg je de velden toe die je wilt: incoterm, plaats van levering, boekingsnummer, ETA…",
          another: "Verwerk nog een cognossement",
        },
        errors: {
          too_large: "Het bestand is groter dan 4 MB. Comprimeer het of upload alleen de pagina's van de B/L.",
        },
        next: {
          lead: "Dat was één cognossement. Met een account gebeurt hetzelfde met elke B/L die binnenkomt, van elke rederij en elke agent, en de data stoppen niet bij een Excel: ze gaan vanzelf door naar je douane- of vrachtsysteem.",
          source: "Je B/L",
          flow: {
            name: "Cognossement",
            add: { name: "incoterm", type: "Tekst", hint: "Naast \"Incoterm\" · bijv. CIF Manzanillo", save: "Opslaan", value: "CIF" },
          },
          inputs: { show: "Hoe komt je B/L binnen?" },
        },
        cleaners: {
          lead: "Eenvoudige regels die na de extractie vanzelf over elk cognossement lopen. Vier ideeën met je eigen data:",
          ideas: [
            { icon: "date", title: "Eén manier om de shipped-on-board-datum te schrijven", from: "{date}", to: "{iso}", note: "elke B/L in hetzelfde formaat" },
            { icon: "alert", title: "Brutogewicht buiten bereik", from: "brutogewicht per container", to: "markeren boven 26.000 kg", note: "zodat niemand een truck boekt die het niet aankan" },
            { icon: "calendar", title: "Seintje vóór aankomst", from: "on-board-datum + transittijd", to: "herinnering 5 dagen vooraf", note: "zodat de aangifte klaarstaat voordat het schip aanmeert" },
            { icon: "mail", title: "Direct naar de douane-expediteur", from: "uitgelezen B/L", to: "e-mail met de tabel als bijlage", note: "naar het douanekantoor, zonder dat iemand iets doorstuurt" },
          ],
        },
        after: {
          lead: "Hij kwam uit een vaste Flow met {fields} velden. In je account kies je zelf de velden, en zo ziet het eruit als Tavnit elk cognossement verwerkt:",
        },
        how: {
          steps: [
            { title: "Upload de B/L", body: "PDF, foto of scan. Elke rederij, elke agent, elke opmaak van het formulier." },
            { title: "Tavnit leest het", body: "Het vindt de kop (B/L-nummer, partijen, schip, reis, havens, on-board-datum, vrachtcondities) en de ladingtabel: één regel per container met zegel, goederen, colli, gewicht en volume." },
            { title: "Controleren en downloaden", body: "De tabel verschijnt op het scherm. Met een gratis account neem je hem mee als Excel." },
          ],
        },
        faqs: [
          {
            q: "Wat zit er in de gratis versie?",
            a: "{limit} documenten per dag, met het volledige resultaat op het scherm. Voor het downloaden van de Excel heb je een Tavnit-account nodig, en dat is gratis.",
          },
          {
            q: "Wat haalt het uit een cognossement?",
            a: "Uit de kop: B/L-nummer, rederij, afzender, ontvanger, notify party, schip, reis, laadhaven, loshaven, shipped-on-board-datum, vrachtcondities en de lijst met containers. Uit de ladingtabel, één rij per regel: container, zegel, goederenomschrijving, aantal en soort colli, brutogewicht en volume. Kopwaarden worden op elke rij herhaald, zodat het blad zich netjes laat filteren en optellen.",
          },
          {
            q: "Kan ik andere kolommen kiezen?",
            a: "Hier niet: deze tool gebruikt een vaste Flow voor cognossementen met 19 velden. In je account maak je je eigen Flows, voor B/L's of elk ander document, met de velden die je nodig hebt: per document (incoterm, plaats van levering, boekingsnummer, ETA) of per regel (HS-code, merken, reefertemperatuur). Geen sjablonen: je beschrijft het veld en geeft zo nodig een hint waar het staat.",
          },
          {
            q: "Welke formaten worden geaccepteerd?",
            a: "PDF (tekst of gescand), JPG en PNG, tot 4 MB en 5 pagina's. Is je B/L langer, of zitten er meerdere B/L's in één scan, upload ze dan in delen of maak een account aan.",
          },
          {
            q: "Werkt het met de B/L van elke rederij?",
            a: "Ja. Het gebruikt geen sjablonen: het leest elke B/L zoals hij binnenkomt, of het nu een master B/L van de rederij is, een house B/L van een expediteur of een sea waybill, in het Engels of Spaans. Het is getest op lay-outs van MSC, Maersk, Hapag-Lloyd, CMA CGM, Evergreen en NVOCC's.",
          },
          {
            q: "Wat gebeurt er met mijn bestand?",
            a: "Het wordt verwerkt in een Tavnit-account dat speciaal voor de gratis tools is en nergens anders voor wordt gebruikt. Na 24 uur worden het bestand en de uitgelezen rijen automatisch verwijderd; we bewaren alleen dat er een run heeft plaatsgevonden, zonder het document of de inhoud. Wil je dat het eerder weg is, mail dan naar support@tavnit.io.",
          },
          {
            q: "Waarom heb ik een account nodig om te downloaden?",
            a: "Omdat de gratis versie bedoeld is om het uit te proberen. Met een account voer je dezelfde extractie uit op al je cognossementen, ontvang je het resultaat per e-mail en stuur je het naar je douane- of vrachtsysteem.",
          },
          {
            q: "Hoe maak ik het automatisch?",
            a: "Maak een account aan, bouw een Flow met de velden die je wilt en stuur B/L's door naar het e-mailadres van de Flow (het adres waar de rederij of expediteur ze naartoe stuurt), of koppel hem via de API, webhooks, Zapier, Make of n8n. De data komen in je douanesysteem, je ERP of Google Sheets zonder dat iemand iets typt.",
          },
        ],
      },
    },
    /** Compare supplier quotes: the Matcher pairs the lines across suppliers. */
    "quote-comparison": {
      vocab: {
        doc: "offerte",
        docs: "offertes",
        a_doc: "een offerte",
        the_doc: "de offerte",
        the_docs: "de offertes",
        your_doc: "je offerte",
        your_docs: "je offertes",
        all_your_docs: "al je offertes",
        all_docs: "alle offertes",
        each_doc: "elke offerte",
        another_doc: "een andere offerte",
        this_doc: "deze offerte",
      },
      overrides: {
        title: "Offertes van leveranciers vergelijken, gratis: per regel",
        description:
          "Upload twee of drie offertes als PDF of foto en krijg één vergelijkingstabel: elke regel met de prijs van elke leverancier en de goedkoopste gemarkeerd. Gratis, geen sjablonen, geen account nodig om het resultaat te zien.",
        label: "Offertes vergelijken",
        h1: "Vergelijk offertes van leveranciers",
        intro:
          "Upload twee of drie offertes voor dezelfde aanvraag. Tavnit leest ze allemaal, koppelt de regels ook als elke leverancier ze anders omschrijft, en bouwt één tabel met elke prijs en de goedkoopste optie per regel. Geen sjablonen, geen spreadsheet met de hand.",
        trust: ["2 of 3 offertes · PDF of foto", "{limit} gratis documenten per dag", "Alles na 24 uur verwijderd"],
        drop: {
          title: "Sleep een offerte hierheen",
          hint: "PDF of foto",
          sample: "Probeer het met drie voorbeeldoffertes",
          formats: "PDF, JPG of PNG · tot 4 MB en 5 pagina's per offerte",
        },
        stages: ["De offertes lezen", "De regels sorteren", "De Matcher koppelt de regels", "Bijna klaar"],
        result: {
          flowNote: "Elke offerte gaat door een vaste Flow met {fields} velden en de Matcher legt ze naast elkaar. In je account kies je zelf de velden.",
          ghostHint: "In Tavnit voeg je de velden toe die je wilt: merk, garantie, levertijd per regel…",
          download: "Vergelijking downloaden als Excel",
          another: "Andere offertes vergelijken",
          empty: "We vonden geen regels met prijzen in deze offerte. Probeer er een met artikelen, aantallen en prijzen per regel.",
        },
        errors: {
          too_large: "Een van de offertes is groter dan 4 MB. Comprimeer hem of upload alleen de pagina's met de regels.",
          failed: "We konden een van de offertes niet lezen. Probeer een andere, of de voorbeelden.",
          no_lines: "Een van de offertes heeft geen regels met prijzen, dus er valt niets te vergelijken. Controleer of elke offerte artikelen met een stukprijs bevat.",
          not_ready: "We zijn de offertes nog aan het lezen. Wacht even en probeer het opnieuw.",
        },
        auth: {
          title: "Maak je gratis account aan om de tabel te downloaden",
          body: "De Excel wordt meteen gedownload. Met een account vergelijk je ook meer dan drie offertes, en doe je dat voor elke aanvraag die binnenkomt.",
        },
        next: {
          lead: "Dat waren drie offertes met de hand. Met een account gaat elke offerte die per e-mail binnenkomt haar Flow in, legt de Matcher ze vanzelf naast elkaar en gaat de tabel verder: naar inkoop, naar het ERP of naar wie goedkeurt.",
          source: "Je offertes",
          flow: {
            name: "Offerte",
            add: { name: "brand", type: "Tekst", hint: 'Naast "Merk" of in de omschrijving', save: "Opslaan", value: "Argos" },
          },
          inputs: { show: "Hoe komen je offertes binnen?" },
        },
        cleaners: {
          lead: "Eenvoudige regels die vanzelf over elke offerte lopen zodra die gelezen is. Vier ideeën:",
          ideas: [
            { icon: "date", title: "Eén manier om de datum te schrijven", from: "{date}", to: "{iso}", note: "elke offerte in hetzelfde formaat" },
            { icon: "alert", title: "Alarm als een leverancier meer dan 5% duurder wordt", from: "prijs van vandaag", to: "vs. de vorige offerte", note: "per regel, vóór de gunning" },
            { icon: "approve", title: "Keur de gunning goed", from: "vergelijkingstabel", to: "wie beslist", note: "pas na goedkeuring gaat de inkooporder de deur uit" },
            { icon: "calendar", title: "Onthoud hoe lang de offerte geldig is", from: "geldig tot {date}", to: "herinnering 5 dagen vooraf", note: "zodat de prijs niet verloren gaat" },
          ],
        },
        after: {
          title: "Je vergelijkingstabel staat klaar",
          lead: "Hij kwam uit een vaste Flow met {fields} velden en een Matcher. In je account kies je zelf de velden, en zo ziet het eruit als Tavnit elke offerte naast de andere legt:",
        },
        how: {
          steps: [
            { title: "Upload twee of drie offertes", body: "PDF of foto, voor dezelfde aanvraag. Elke leverancier, elke opmaak, elke manier om een artikel te omschrijven." },
            { title: "Tavnit leest en vergelijkt ze", body: "Het haalt de regels uit elke offerte en de Matcher koppelt de artikelen, ook als ze anders omschreven zijn. De goedkoopste per regel wordt als Champion gemarkeerd." },
            { title: "Controleren en downloaden", body: "De tabel verschijnt op het scherm. Met een gratis account neem je hem mee als Excel." },
          ],
        },
        faqs: [
          {
            q: "Wat zit er in de gratis versie?",
            a: "{limit} documenten per dag (een vergelijking van drie offertes telt voor drie), met de volledige tabel op het scherm. Voor het downloaden van de Excel heb je een Tavnit-account nodig, en dat is gratis.",
          },
          {
            q: "Hoe koppelt het regels als elke leverancier ze anders omschrijft?",
            a: "Met een Matcher van Tavnit. Die vergelijkt de betekenis van elke omschrijving, niet de exacte tekst: \"grijs cement 42,5 kg\" en \"Portlandcement type I grijs, zak 42,5 kg\" komen op dezelfde rij. Bij twijfel beslist een tweede stap of het om hetzelfde artikel gaat.",
          },
          {
            q: "Wat betekent Champion?",
            a: "De leverancier met de laagste stukprijs op die regel. Bij gelijke prijs verschijnen beide. Regels die maar één leverancier heeft geoffreerd, hebben geen concurrentie en worden ook getoond.",
          },
          {
            q: "Kan ik meer dan drie offertes vergelijken?",
            a: "Hier niet: de gratis versie neemt er maximaal drie. In je account vergelijkt de Matcher tot tien runs van dezelfde Flow, en kun je de tabel per e-mail of naar je ERP sturen.",
          },
          {
            q: "Kan ik andere kolommen kiezen?",
            a: "Hier niet: deze tool gebruikt een vaste offerte-Flow. In je account maak je je eigen Flow met de velden die je nodig hebt (merk, garantie, levertijd per regel) en stel je de Matcher in om te vergelijken op het veld dat je wilt: prijs, levertijd of elk ander getal.",
          },
          {
            q: "Welke formaten worden geaccepteerd?",
            a: "PDF (tekst of gescand), JPG en PNG, tot 4 MB en 5 pagina's per offerte.",
          },
          {
            q: "Wat gebeurt er met mijn bestanden?",
            a: "Ze worden verwerkt in een Tavnit-account dat speciaal voor de gratis tools is en nergens anders voor wordt gebruikt. Na 24 uur worden de bestanden, de uitgelezen regels en de tabel automatisch verwijderd; we bewaren alleen dat er een run heeft plaatsgevonden.",
          },
          {
            q: "Hoe maak ik het automatisch?",
            a: "Maak een account aan, bouw een offerte-Flow met je velden en daarbovenop een Matcher. Stuur offertes door naar het e-mailadres van de Matcher en zodra ze allemaal binnen zijn, komt de vergelijkingstabel er vanzelf uit: per e-mail, via een webhook of in je ERP.",
          },
        ],
        compare: {
          slots: [
            { title: "Offerte A", hint: "PDF of foto", sample: "Voorbeeldofferte A" },
            { title: "Offerte B", hint: "PDF of foto", sample: "Voorbeeldofferte B" },
            { title: "Offerte C", hint: "PDF of foto", sample: "Voorbeeldofferte C", optional: true },
          ],
          run: "Vergelijken",
          sampleAll: "Probeer het met drie voorbeeldoffertes",
          stages: ["De offertes lezen", "De regels sorteren", "De Matcher koppelt de regels", "Bijna klaar"],
          heading: "Vergelijkingstabel klaar",
          summary: "{n} · {ref}",
          labels: {
            description: "Omschrijving",
            quantity: "Aantal",
            price: "Stukprijs",
            total: "Totaal",
            status: "Status",
            ref: "A",
            doc: "B",
            supplier: "Leverancier",
            champion: "Champion",
            wins: "{n} regels gewonnen",
            lines: ["regel", "regels"],
          },
          status: { ok: "Klopt", price: "Andere prijs", qty: "Ander aantal", both: "Prijs en aantal wijken af", missing: "Niet geoffreerd", extra: "Alleen in deze offerte" },
          empty: "De Matcher vond geen vergelijkbare regels in de offertes. Controleer of ze voor dezelfde aanvraag zijn en artikelen met een stukprijs bevatten.",
          another: "Andere offertes vergelijken",
          download: "Vergelijking downloaden als Excel",
        },
      },
    },
    /** Contract key dates: one row per contract (a metadata-only Flow). */
    "contract-dates": {
      vocab: {
        doc: "contract",
        docs: "contracten",
        a_doc: "een contract",
        the_doc: "het contract",
        the_docs: "de contracten",
        your_doc: "je contract",
        your_docs: "je contracten",
        all_your_docs: "al je contracten",
        all_docs: "alle contracten",
        each_doc: "elk contract",
        another_doc: "een ander contract",
        this_doc: "dit contract",
      },
      overrides: {
        title: "Verlengingsdatum uit contracten halen, gratis (AI)",
        description:
          "Upload een contract als PDF en krijg de belangrijkste datums in één Excel-rij: partijen, begin, einde, stilzwijgende verlenging, opzegtermijn en de uiterste datum om op te zeggen. Gratis, geen sjablonen, geen account nodig om het resultaat te zien.",
        label: "Contractdatums",
        h1: "Haal de belangrijkste datums uit een contract",
        intro:
          "Upload de PDF. Tavnit leest het contract en geeft één rij terug met de partijen, de datum van ondertekening, begin en einde van de looptijd, of het stilzwijgend wordt verlengd, de opzegtermijn en de laatste dag om te laten weten dat je niet verlengt. Werkt met dienstverlenings-, huur-, leverings- en licentieovereenkomsten, in welk formaat ze ook komen.",
        drop: {
          title: "Sleep je contract hierheen",
          sample: "Probeer het met een voorbeeldcontract",
        },
        stages: ["Document uploaden", "De partijen lezen", "Looptijd en verlenging zoeken", "De opzegdatum berekenen", "Bijna klaar"],
        result: {
          empty: "We vonden geen partijen of datums in dit document. Probeer een ondertekend contract met een bepaling over de looptijd.",
          flowNote: "Deze {fields} kolommen zijn de velden van een vaste contract-Flow. In je account kies je zelf de velden.",
          ghostHint: "In Tavnit voeg je de velden toe die je wilt: interne eigenaar, kostenplaats, boeteclausule…",
          another: "Verwerk nog een contract",
        },
        next: {
          lead: "Dat was één contract. Met een account gebeurt hetzelfde met elk contract dat binnenkomt, en de datums stoppen niet bij een Excel: ze slaan alarm vóór de deadline.",
          source: "Je contract",
          inputs: { show: "Hoe komt je contract binnen?" },
          flow: {
            name: "Contract",
            add: { name: "owner", type: "Tekst", hint: "Wie het aan onze kant ondertekent", save: "Opslaan", value: "M. Perez" },
          },
        },
        cleaners: {
          lead: "Eenvoudige regels die vanzelf over elk contract lopen zodra het gelezen is. Vier ideeën met je eigen data:",
          ideas: [
            { icon: "date", title: "Eén manier om de datum te schrijven", from: "{date}", to: "{iso}", note: "elk contract in hetzelfde formaat" },
            { icon: "calendar", title: "Herinnering 60 dagen vóór het einde", from: "end_date", to: "herinnering op tijd", note: "voordat de opzegtermijn verstrijkt" },
            { icon: "alert", title: "Stilzwijgende verlenging: eerst beoordelen", from: "auto_renewal = Yes", to: "te beoordelen", note: "zodat geen contract verlengt zonder dat iemand kijkt" },
            { icon: "mail", title: "Mail de eigenaar", from: "contract gelezen", to: "e-mail met de rij", note: "wie het ondertekende krijgt de datums" },
          ],
        },
        after: {
          lead: "Hij kwam uit een vaste Flow met {fields} velden. In je account kies je zelf de velden, en zo ziet het eruit als Tavnit elk contract leest:",
        },
        how: {
          steps: [
            { title: "Upload het contract", body: "PDF, als tekst of gescand. Elk soort contract, wie het ook heeft opgesteld." },
            { title: "Tavnit leest het", body: "Het vindt de partijen, de ondertekening, de looptijd, de verlengingsclausule en de opzegtermijn, en berekent de uiterste datum om op te zeggen." },
            { title: "Controleren en downloaden", body: "De rij verschijnt op het scherm. Met een gratis account neem je hem mee als Excel." },
          ],
        },
        faqs: [
          {
            q: "Wat zit er in de gratis versie?",
            a: "{limit} contracten per dag, met het volledige resultaat op het scherm. Voor het downloaden van de Excel heb je een Tavnit-account nodig, en dat is gratis.",
          },
          {
            q: "Welke datums en gegevens haalt het eruit?",
            a: "De partijen, de datum van ondertekening, begin en einde van de looptijd, de duur, of het stilzwijgend wordt verlengd, de opzegtermijn, de uiterste datum om op te zeggen, de waarde met valuta en het toepasselijk recht. Wat niet in het contract staat, blijft leeg: er wordt nooit een datum verzonnen.",
          },
          {
            q: "Waarom is het resultaat één rij?",
            a: "Omdat een contract één looptijd, één ondertekeningsdatum en één set partijen heeft. Met een account verwerk je een hele map contracten en krijg je een tabel met één rij per contract, klaar om op einddatum te sorteren.",
          },
          {
            q: "Welke formaten worden geaccepteerd?",
            a: "PDF (tekst of gescand), JPG en PNG, tot 4 MB en 5 pagina's. Is je contract langer, upload dan de pagina's met de bepalingen over looptijd en verlenging, of maak een account aan.",
          },
          {
            q: "Kan ik andere kolommen kiezen?",
            a: "Hier niet: deze tool gebruikt een vaste contract-Flow met 14 velden. In je account maak je je eigen Flows, voor contracten of elk ander document, met de velden die je nodig hebt: interne eigenaar, boeteclausule, garantie. Geen sjablonen: je beschrijft het veld en geeft zo nodig een hint waar het staat.",
          },
          {
            q: "Wat gebeurt er met mijn bestand?",
            a: "Het wordt verwerkt in een Tavnit-account dat speciaal voor de gratis tools is en nergens anders voor wordt gebruikt. Na 24 uur worden het bestand en de uitgelezen rij automatisch verwijderd; we bewaren alleen dat er een run heeft plaatsgevonden, zonder het document of de inhoud. Wil je dat het eerder weg is, mail dan naar support@tavnit.io.",
          },
          {
            q: "Werkt het met contracten uit elk land?",
            a: "Ja. Het verwerkt contracten in het Engels, Spaans en andere talen, met elke datumnotatie. Het is getest op contracten uit onder meer de VS, Panama, Mexico en Colombia.",
          },
          {
            q: "Hoe krijg ik een waarschuwing vóór de einddatum?",
            a: "Maak een account aan, bouw een Flow met de velden die je wilt en stuur contracten door naar het e-mailadres van de Flow, of koppel hem via de API, webhooks, Zapier, Make of n8n. Een Cleaner vergelijkt de uiterste opzegdatum met vandaag en stuurt de e-mail of webhook naar wie moet beslissen.",
          },
        ],
      },
    },
    /** Receipt → Excel: mostly phone photos of thermal tickets. */
    "receipt-to-excel": {
      vocab: {
        doc: "kassabon",
        docs: "kassabonnen",
        a_doc: "een kassabon",
        the_doc: "de kassabon",
        the_docs: "de kassabonnen",
        your_doc: "je kassabon",
        your_docs: "je kassabonnen",
        all_your_docs: "al je kassabonnen",
        all_docs: "alle kassabonnen",
        each_doc: "elke kassabon",
        another_doc: "een andere kassabon",
        this_doc: "deze kassabon",
      },
      overrides: {
        title: "Kassabon naar Excel, gratis: van foto naar spreadsheet",
        description:
          "Upload een foto of PDF van een kassabon en krijg de regels in Excel: winkel, datum, artikelen, aantallen, btw, fooi en totaal. Gratis, geen sjablonen, geen account nodig om het resultaat te zien. Bon-OCR naar spreadsheet in seconden.",
        label: "Kassabon naar Excel",
        h1: "Zet een kassabon om naar Excel",
        intro:
          "Maak een foto van de bon of upload de PDF. Tavnit leest de winkel, de datum, elk artikel met zijn prijs en de totalen, en geeft alles terug als spreadsheet. Ook vervaagde, scheve of verfrommelde thermische bonnetjes werken: er is geen sjabloon om in te stellen.",
        drop: {
          title: "Sleep de foto van je kassabon hierheen",
          sample: "Probeer het met een voorbeeldbon",
        },
        stages: ["De bon uploaden", "Winkel en datum lezen", "De artikelen zoeken", "Kolommen ordenen", "Bijna klaar"],
        result: {
          empty: "We vonden geen artikelen op deze bon. Probeer een scherpere foto met de hele bon in beeld en zonder schaduwen.",
          flowNote: "Deze {fields} kolommen zijn de velden van een vaste Flow voor kassabonnen. In je account kies je zelf de velden.",
          ghostHint: "In Tavnit voeg je de velden toe die je wilt: kostenplaats, wie het uitgaf, project, categorie…",
        },
        next: {
          lead: "Dat was één kassabon. Met een account gebeurt hetzelfde met elke bon die binnenkomt, en de regels stoppen niet bij een Excel: ze gaan vanzelf verder.",
          source: "Je kassabon",
          inputs: { show: "Hoe komt je kassabon binnen?" },
          flow: {
            name: "Kassabon",
            add: { name: "cost_center", type: "Tekst", hint: "Wie het uitgaf, of het project", save: "Opslaan", value: "Sales" },
          },
        },
        cleaners: {
          lead: "Eenvoudige regels die vanzelf over elke bon lopen zodra die gelezen is. Vier ideeën met je eigen data:",
          ideas: [
            { icon: "date", title: "Eén manier om de datum te schrijven", from: "{date}", to: "{iso}", note: "elke bon in hetzelfde formaat voor de onkostendeclaratie" },
            { icon: "sum", title: "Artikelen moeten optellen tot het subtotaal", from: "artikelen {sum}", to: "subtotaal {subtotal}", note: "klopt het niet, dan is de foto slecht gelezen en kijkt iemand het na", check: "sum" },
            { icon: "approve", title: "Goedkeuring boven een bedrag", from: "totaal {total}", to: "goedkeuren vóór vergoeding", note: "als het boven {threshold} komt" },
            { icon: "money", title: "Omrekenen naar je eigen valuta", from: "{total} {currency}", to: "je eigen valuta", note: "tegen de koers op de datum van de bon, voor reizen" },
          ],
        },
        after: {
          lead: "Hij kwam uit een vaste Flow met {fields} velden. In je account kies je zelf de velden, en zo ziet het eruit als Tavnit elke bon van een reis of een maand verwerkt:",
        },
        how: {
          steps: [
            { title: "Upload de kassabon", body: "Een foto met je telefoon of een PDF. Elke winkel, elke taal, hoe vervaagd de bon ook is." },
            { title: "Tavnit leest het", body: "Het vindt de winkel, de datum, het nummer, elk artikel met zijn prijs, en het subtotaal, de btw, de fooi en het totaal." },
            { title: "Controleren en downloaden", body: "De tabel verschijnt op het scherm. Met een gratis account neem je hem mee als Excel." },
          ],
        },
        faqs: [
          {
            q: "Wat zit er in de gratis versie?",
            a: "{limit} kassabonnen per dag, met het volledige resultaat op het scherm. Voor het downloaden van de Excel heb je een Tavnit-account nodig, en dat is gratis.",
          },
          {
            q: "Werkt het met een foto van mijn telefoon?",
            a: "Ja, dat is de normale situatie. JPG, PNG en PDF tot 4 MB. Het helpt als de hele bon in beeld is, met gelijkmatig licht en zonder vingers erop; een scheve of licht onscherpe foto wordt nog steeds gelezen.",
          },
          {
            q: "Welke formaten worden geaccepteerd?",
            a: "JPG, PNG en PDF (tekst of gescand), tot 4 MB en 5 pagina's. Een lange supermarktbon past op één foto.",
          },
          {
            q: "Moet ik per winkel een sjabloon instellen?",
            a: "Nee. Tavnit gebruikt geen sjablonen: het leest elke bon zoals hij binnenkomt, of het nu van een restaurant, een apotheek, een taxi of een tankstation is.",
          },
          {
            q: "Kan ik andere kolommen kiezen?",
            a: "Hier niet: deze tool gebruikt een vaste Flow voor kassabonnen met 15 velden. In je account maak je je eigen Flows met de velden die je nodig hebt: per document (kostenplaats, wie het uitgaf, project, categorie) of per regel (productcode). Geen sjablonen: je beschrijft het veld en geeft zo nodig een hint waar het staat.",
          },
          {
            q: "Wat gebeurt er met mijn bestand?",
            a: "Het wordt verwerkt in een Tavnit-account dat speciaal voor de gratis tools is en nergens anders voor wordt gebruikt. Na 24 uur worden de foto en de uitgelezen rijen automatisch verwijderd; we bewaren alleen dat er een run heeft plaatsgevonden, zonder het document of de inhoud. Wil je dat het eerder weg is, mail dan naar support@tavnit.io.",
          },
          {
            q: "Ik heb vijftig bonnen van een reis. Eén voor één?",
            a: "Hier wel. Met een account stuur je ze allemaal tegelijk: mail ze door naar de Flow, sleep ze in één keer erin of koppel via de API, en elke bon komt als rijen in dezelfde Excel, in Google Sheets of in je declaratiesysteem.",
          },
          {
            q: "Hoe maak ik het automatisch?",
            a: "Maak een account aan, bouw een Flow met de velden die je wilt en stuur foto's van bonnen door naar het e-mailadres van de Flow, of koppel hem via de API, webhooks, Zapier, Make of n8n. De onkostendeclaratie maakt zichzelf.",
          },
        ],
      },
    },
    /** Number format: the chosen columns out in one number format. */
    "number-format": {
      vocab: SPREADSHEET_VOCAB,
      overrides: {
        title: "Getalnotatie in Excel of CSV corrigeren, gratis",
        description:
          "Upload een Excel- of CSV-bestand met getallen als 1.234,56 of 1,234.56 en krijg ze terug in één notatie, klaar om op te tellen. Jij kiest de kolommen en de notatie. Gratis, geen account nodig om het resultaat te zien.",
        label: "Getalnotatie corrigeren",
        h1: "Corrigeer de getalnotatie in je spreadsheet",
        intro:
          "Upload het Excel- of CSV-bestand. Kies welke kolommen getallen bevatten en hoe je ze wilt: 1234.56, 1,234.56 of 1.234,56. Tavnit zet ze allemaal om en geeft je bestand terug met dezelfde kolommen in dezelfde volgorde.",
        trust: ["CSV of Excel · tot 500 rijen", "{limit} gratis bestanden per dag", "Alles wordt na 24 uur verwijderd"],
        drop: {
          title: "Sleep je Excel- of CSV-bestand hierheen",
          hint: "of kies een bestand op je computer",
          choose: "Bestand kiezen",
          sample: "Probeer een voorbeeldbestand",
          formats: "CSV of .xlsx · tot 4 MB en 500 rijen",
        },
        errors: {
          unsupported: "Alleen CSV- of Excel-bestanden (.xlsx).",
          xls: "Dit is een oud Excel-bestand (.xls). Open het in Excel en sla het op als .xlsx of .csv.",
          too_many_rows: "De gratis versie verwerkt tot 500 rijen. Upload een deel van het bestand.",
          too_many_columns: "Kies maximaal 10 kolommen tegelijk.",
          no_columns: "Kies minstens één kolom.",
          nothing_to_clean: "We vonden geen getallen om om te zetten in die kolommen.",
          empty: "Het bestand is leeg of heeft geen rijen onder de kop.",
          unreadable: "We konden het bestand niet lezen. Is het een Excel-bestand, sla het dan opnieuw op als .xlsx.",
          failed: "We konden dit bestand niet omzetten. Probeer het opnieuw, of probeer het voorbeeldbestand.",
        },
        how: {
          heading: "Zo werkt het",
          steps: [
            { title: "Upload het bestand", body: "Een CSV- of Excel-bestand, gescheiden door komma's of puntkomma's." },
            { title: "Kies kolommen en notatie", body: "We vinken de kolommen aan die op getallen lijken. Jij zegt of je decimalen een komma of een punt gebruiken, en hoe je ze wilt hebben." },
            { title: "Controleren en downloaden", body: "De gewijzigde cellen zijn gemarkeerd. Met je gratis account neem je het bestand mee als Excel of CSV." },
          ],
        },
        faqs: [
          { q: "Waarom telt Excel mijn getallen niet op?", a: "Omdat Excel ze als tekst leest. Dat gebeurt als het bestand uit een systeem of land komt dat decimalen anders schrijft dan jij: 1.234,56 in een Excel die op 1,234.56 is ingesteld, of andersom. Zet je ze in één notatie, dan worden het weer getallen." },
          { q: "Hoe weten jullie of mijn decimalen een komma of een punt gebruiken?", a: "We leiden het af uit je waarden: staat er 1.234,56, dan is de komma het decimaalteken. Als het niet te zeggen is, bijvoorbeeld bij alleen 1.234, kies jij. Die keuze bepaalt hoe elk getal wordt gelezen." },
          { q: "Welke notatie moet ik kiezen?", a: "1234.56, zonder scheidingsteken voor duizendtallen, leest elk systeem, elke formule en elke import zonder problemen. 1,234.56 en 1.234,56 zijn om het bestand aan mensen te laten zien, afhankelijk van je land." },
          { q: "Wat gebeurt er met cellen die geen getal zijn?", a: "Die blijven zoals ze waren. Een percentage (15%), tekst (N/A) of een lege cel blijft ongemoeid: alleen wat duidelijk een getal is, verandert." },
          { q: "Welke formaten worden geaccepteerd?", a: "CSV gescheiden door komma's, puntkomma's of tabs, en Excel .xlsx, tot 4 MB en 500 rijen. Heb je een oud Excel-bestand (.xls), sla het dan op als .xlsx." },
          { q: "Wat gebeurt er met mijn bestand?", a: "Het wordt alleen voor deze omzetting gebruikt en na 24 uur samen met het resultaat verwijderd. Alleen jouw browser kan het resultaat zien." },
          { q: "Hoe laat ik dit vanzelf gebeuren?", a: "In Tavnit is dezelfde regel een Cleaner: die loopt vanzelf over elk document dat je uitleest of elk bestand dat per e-mail of API binnenkomt, samen met datums, valuta en controles." },
        ],
        clean: {
          setup: {
            heading: "Kies de kolommen en de notatie",
            fileSummary: "{rows} · {cols}",
            columnsLabel: "Kolommen met getallen",
            columnsHint: "Maximaal {max}. We hebben de kolommen aangevinkt die op getallen lijken.",
            tooMany: "Je kunt maximaal {max} kolommen tegelijk kiezen.",
            inputLabel: "In je bestand gebruiken decimalen een",
            inputOptions: { comma: "komma · 1.234,56", dot: "punt · 1,234.56" },
            outputLabel: "Ik wil de getallen als",
            outputOptions: { plain: "1234.56 · voor formules en systemen", us: "1,234.56", latam: "1.234,56" },
            preview: "Eerste rijen",
            run: "Omzetten",
            change: "Ander bestand",
          },
          stages: ["Het bestand uploaden", "De kolommen lezen", "De getallen omzetten", "Je bestand opbouwen"],
          heading: "Klaar: {file}",
          summary: "{cells} gewijzigd in {cols}",
          cellWord: ["cel", "cellen"],
          columnWord: ["kolom", "kolommen"],
          unchanged: "Geen enkele cel hoefde te veranderen: ze stonden al in die notatie.",
          highlight: "De gewijzigde cellen zijn blauw.",
          shown: "{shown} van {total} rijen getoond. De download bevat ze allemaal.",
          download: "Downloaden",
          downloadXlsx: "Excel (.xlsx)",
          downloadCsv: "CSV (.csv)",
          another: "Nog een bestand omzetten",
          automate: {
            heading: "Laat het bij elk bestand gebeuren",
            body: "In Tavnit is deze regel een Cleaner. Je stelt hem één keer in en hij loopt vanzelf over elke factuur die je uitleest of elk bestand dat per e-mail of API binnenkomt, samen met datums, valuta en controles.",
            cta: "Maak een gratis account aan",
            docs: "Wat is een Cleaner",
          },
        },
      },
    },
    /** Date format: the chosen date columns out in one format. */
    "date-format": {
      vocab: SPREADSHEET_VOCAB,
      overrides: {
        title: "Datumnotatie in Excel of CSV corrigeren, gratis",
        description:
          "Upload een Excel- of CSV-bestand met door elkaar geschreven datums (03/04/2024, March 12 2024, 2024-03-12) en krijg ze allemaal terug in één notatie. Jij kiest de kolommen en de notatie. Gratis, geen account nodig om het resultaat te zien.",
        label: "Datumnotatie corrigeren",
        h1: "Zet elke datum in je spreadsheet in één notatie",
        intro:
          "Upload het Excel- of CSV-bestand. Kies welke kolommen datums bevatten en hoe je ze wilt: 2024-03-12, 12/03/2024 of 03/12/2024. Tavnit zet ze allemaal om, ook datums die in woorden zijn geschreven, en geeft je bestand terug met dezelfde kolommen.",
        trust: ["CSV of Excel · tot 500 rijen", "{limit} gratis bestanden per dag", "Alles wordt na 24 uur verwijderd"],
        drop: {
          title: "Sleep je Excel- of CSV-bestand hierheen",
          hint: "of kies een bestand op je computer",
          choose: "Bestand kiezen",
          sample: "Probeer een voorbeeldbestand",
          formats: "CSV of .xlsx · tot 4 MB en 500 rijen",
        },
        errors: {
          unsupported: "Alleen CSV- of Excel-bestanden (.xlsx).",
          xls: "Dit is een oud Excel-bestand (.xls). Open het in Excel en sla het op als .xlsx of .csv.",
          too_many_rows: "De gratis versie verwerkt tot 500 rijen. Upload een deel van het bestand.",
          too_many_columns: "Kies maximaal 10 kolommen tegelijk.",
          no_columns: "Kies minstens één kolom.",
          nothing_to_clean: "We vonden geen datums om om te zetten in die kolommen.",
          empty: "Het bestand is leeg of heeft geen rijen onder de kop.",
          unreadable: "We konden het bestand niet lezen. Is het een Excel-bestand, sla het dan opnieuw op als .xlsx.",
          failed: "We konden dit bestand niet omzetten. Probeer het opnieuw, of probeer het voorbeeldbestand.",
        },
        how: {
          heading: "Zo werkt het",
          steps: [
            { title: "Upload het bestand", body: "Een CSV- of Excel-bestand, met datums zoals ze binnenkomen: met schuine strepen, streepjes, punten of in woorden." },
            { title: "Kies kolommen en notatie", body: "We vinken de kolommen aan die op datums lijken. Jij zegt of je bestand de dag of de maand eerst zet, en hoe je ze wilt hebben." },
            { title: "Controleren en downloaden", body: "De gewijzigde cellen zijn gemarkeerd. Met je gratis account neem je het bestand mee als Excel of CSV." },
          ],
        },
        faqs: [
          { q: "Hoe weten jullie of 03/04/2024 3 april of 4 maart is?", a: "Uit één losse datum valt dat niet op te maken. Daarom vragen we of je bestand de dag of de maand eerst zet, en stellen we het antwoord voor als de kolom een datum bevat zoals 15/04/2024, die maar op één manier te lezen is." },
          { q: "Begrijpt het datums die in woorden zijn geschreven?", a: "Ja. \"March 5th 2024\", \"12 de marzo de 2024\" of \"1 apr 2024\" worden met AI gelezen, en dat is precies wat een Excel-formule niet kan. Numerieke datums worden met regels gelezen, zonder AI." },
          { q: "Welke notatie moet ik kiezen?", a: "2024-03-12 (jaar, maand, dag) leest elk systeem zonder verwarring, en het is de notatie die correct sorteert. 03/12/2024 is de Amerikaanse gewoonte; 12/03/2024 is gebruikelijk in Europa en Latijns-Amerika." },
          { q: "Wat gebeurt er met cellen die geen datum zijn?", a: "Die blijven zoals ze waren, net als lege cellen. Kan een datum niet met zekerheid worden gelezen, dan laten we hem staan zoals hij was in plaats van te gokken." },
          { q: "En als mijn Excel-bestand ze al als datum opslaat?", a: "Dan nemen we ze over zoals ze zijn, zonder ze opnieuw te lezen, en veranderen we alleen de notatie." },
          { q: "Wat gebeurt er met mijn bestand?", a: "Het wordt alleen voor deze omzetting gebruikt en na 24 uur samen met het resultaat verwijderd. Alleen jouw browser kan het resultaat zien." },
          { q: "Hoe laat ik dit vanzelf gebeuren?", a: "In Tavnit is dezelfde regel een Cleaner: die loopt vanzelf over elk document dat je uitleest of elk bestand dat per e-mail of API binnenkomt, samen met getallen, valuta en controles." },
        ],
        clean: {
          setup: {
            heading: "Kies de kolommen en de notatie",
            fileSummary: "{rows} · {cols}",
            columnsLabel: "Kolommen met datums",
            columnsHint: "Maximaal {max}. We hebben de kolommen aangevinkt die op datums lijken.",
            tooMany: "Je kunt maximaal {max} kolommen tegelijk kiezen.",
            inputLabel: "In je bestand staat bij numerieke datums eerst",
            inputOptions: { dmy: "de dag · 31/12/2024", mdy: "de maand · 12/31/2024" },
            outputLabel: "Ik wil de datums als",
            outputOptions: { iso: "2024-03-12 · jaar, maand, dag", dmy: "12/03/2024 · dag, maand, jaar", mdy: "03/12/2024 · maand, dag, jaar" },
            preview: "Eerste rijen",
            run: "Omzetten",
            change: "Ander bestand",
          },
          stages: ["Het bestand uploaden", "De kolommen lezen", "De datums omzetten", "Datums in woorden lezen", "Je bestand opbouwen"],
          heading: "Klaar: {file}",
          summary: "{cells} gewijzigd in {cols}",
          cellWord: ["cel", "cellen"],
          columnWord: ["kolom", "kolommen"],
          unchanged: "Geen enkele cel hoefde te veranderen: ze stonden al in die notatie.",
          highlight: "De gewijzigde cellen zijn blauw.",
          shown: "{shown} van {total} rijen getoond. De download bevat ze allemaal.",
          download: "Downloaden",
          downloadXlsx: "Excel (.xlsx)",
          downloadCsv: "CSV (.csv)",
          another: "Nog een bestand omzetten",
          automate: {
            heading: "Laat het bij elk bestand gebeuren",
            body: "In Tavnit is deze regel een Cleaner. Je stelt hem één keer in en hij loopt vanzelf over elke factuur, elk contract of elk bestand dat binnenkomt, samen met getallen, valuta en controles.",
            cta: "Maak een gratis account aan",
            docs: "Wat is een Cleaner",
          },
        },
      },
    },
    /** Currency converter at the day's ECB reference rate. */
    "currency-converter": {
      vocab: SPREADSHEET_VOCAB,
      overrides: {
        title: "Valuta omrekenen in Excel tegen de koers van vandaag, gratis",
        description:
          "Upload een Excel- of CSV-bestand met prijzen of bedragen en krijg elke kolom omgerekend naar dollars, euro's, ponden of een van 30 valuta, tegen de referentiekoers van de dag. Gratis, geen account nodig om het resultaat te zien.",
        label: "Valuta omrekenen",
        h1: "Reken de bedragen in je spreadsheet om naar een andere valuta",
        intro:
          "Upload het Excel- of CSV-bestand. Kies de kolommen met bedragen, de valuta waarin ze staan en de valuta die je wilt. Tavnit zet naast elke kolom de omgerekende kolom, tegen de koers van de dag, en geeft je hele bestand terug.",
        trust: ["CSV of Excel · tot 500 rijen", "{limit} gratis bestanden per dag", "Alles wordt na 24 uur verwijderd"],
        drop: {
          title: "Sleep je Excel- of CSV-bestand hierheen",
          hint: "of kies een bestand op je computer",
          choose: "Bestand kiezen",
          sample: "Probeer een voorbeeldbestand",
          formats: "CSV of .xlsx · tot 4 MB en 500 rijen",
        },
        errors: {
          unsupported: "Alleen CSV- of Excel-bestanden (.xlsx).",
          xls: "Dit is een oud Excel-bestand (.xls). Open het in Excel en sla het op als .xlsx of .csv.",
          too_many_rows: "De gratis versie verwerkt tot 500 rijen. Upload een deel van het bestand.",
          too_many_columns: "Kies maximaal 10 kolommen tegelijk.",
          no_columns: "Kies minstens één kolom.",
          nothing_to_clean: "We vonden geen bedragen om om te rekenen in die kolommen.",
          empty: "Het bestand is leeg of heeft geen rijen onder de kop.",
          unreadable: "We konden het bestand niet lezen. Is het een Excel-bestand, sla het dan opnieuw op als .xlsx.",
          failed: "We konden dit bestand niet omrekenen. Probeer het opnieuw, of probeer het voorbeeldbestand.",
        },
        how: {
          heading: "Zo werkt het",
          steps: [
            { title: "Upload het bestand", body: "Een CSV- of Excel-bestand met prijzen, totalen of een andere kolom met bedragen." },
            { title: "Kies de valuta", body: "We vinken de kolommen aan die op bedragen lijken. Jij zegt in welke valuta ze staan, hoe de decimalen geschreven zijn en waarnaar ze moeten worden omgerekend." },
            { title: "Controleren en downloaden", body: "Elke omgerekende kolom staat naast het origineel. Met je gratis account neem je het bestand mee als Excel of CSV." },
          ],
        },
        faqs: [
          { q: "Welke wisselkoers wordt gebruikt?", a: "De referentiekoers van de dag die de Europese Centrale Bank publiceert. Die is voor het hele bestand dezelfde en is een referentie, niet de aan- of verkoopkoers van je bank." },
          { q: "Welke valuta kan ik omrekenen?", a: "Amerikaanse dollar (USD), euro (EUR), pond (GBP), Mexicaanse peso (MXN), real (BRL), yuan (CNY), Canadese dollar, yen, Zwitserse frank en de rest van de valuta die de Europese Centrale Bank publiceert, 30 in totaal. Je kunt van elk daarvan naar elk ander omrekenen." },
          { q: "Werkt het met Colombiaanse peso's, soles, Chileense peso's of balboa's?", a: "Nog niet: die valuta staan niet in de koersen van de Europese Centrale Bank. In Panama, waar de balboa één op één met de dollar staat, kun je USD kiezen." },
          { q: "Wat gebeurt er met mijn originele kolommen?", a: "Die blijven zoals ze waren. De omrekening wordt als nieuwe kolom ernaast toegevoegd, bijvoorbeeld \"Price (USD)\", zodat je kunt vergelijken." },
          { q: "Wat gebeurt er met cellen die geen bedrag zijn?", a: "Die blijven leeg in de omgerekende kolom. Tekst, een percentage of een lege cel wordt niet omgerekend." },
          { q: "Wat gebeurt er met mijn bestand?", a: "Het wordt alleen voor deze omrekening gebruikt en na 24 uur samen met het resultaat verwijderd. Alleen jouw browser kan het resultaat zien." },
          { q: "Hoe laat ik dit vanzelf gebeuren?", a: "In Tavnit is valutaomrekening een Cleaner: die loopt vanzelf over elke factuur die je uitleest of elk bestand dat per e-mail of API binnenkomt, samen met datums, getallen en controles." },
        ],
        clean: {
          setup: {
            heading: "Kies de kolommen en de valuta",
            fileSummary: "{rows} · {cols}",
            columnsLabel: "Kolommen met bedragen",
            columnsHint: "Maximaal {max}. We hebben de kolommen aangevinkt die op bedragen lijken.",
            tooMany: "Je kunt maximaal {max} kolommen tegelijk kiezen.",
            sourceLabel: "De bedragen staan in",
            sourceHint: "Valuta met een koers van de Europese Centrale Bank.",
            inputLabel: "Decimalen gebruiken een",
            inputOptions: { comma: "komma · 1.234,56", dot: "punt · 1,234.56" },
            outputPopular: "Meest gebruikt",
            outputAll: "Alle valuta",
            outputLabel: "Omrekenen naar",
            outputOptions: {},
            preview: "Eerste rijen",
            run: "Omrekenen",
            change: "Ander bestand",
          },
          stages: ["Het bestand uploaden", "De bedragen lezen", "De koers van de dag ophalen", "Omrekenen", "Je bestand opbouwen"],
          heading: "Klaar: {file}",
          summary: "{cells} omgerekend in {cols}",
          cellWord: ["cel", "cellen"],
          columnWord: ["kolom", "kolommen"],
          unchanged: "We vonden geen bedragen om om te rekenen in die kolommen.",
          highlight: "De omgerekende kolommen zijn blauw.",
          shown: "{shown} van {total} rijen getoond. De download bevat ze allemaal.",
          download: "Downloaden",
          downloadXlsx: "Excel (.xlsx)",
          downloadCsv: "CSV (.csv)",
          another: "Nog een bestand omrekenen",
          automate: {
            heading: "Laat het bij elke factuur gebeuren",
            body: "In Tavnit is valutaomrekening een Cleaner. Je stelt hem één keer in en elke factuur of offerte in een andere valuta komt al omgerekend binnen, samen met datums, getallen en controles.",
            cta: "Maak een gratis account aan",
            docs: "Wat is een Cleaner",
          },
        },
      },
    },
    /** Translate columns: a translated column next to each chosen text column. */
    "translate-columns": {
      vocab: SPREADSHEET_VOCAB,
      overrides: {
        title: "Excel-kolommen vertalen, gratis",
        description:
          "Upload een Excel- of CSV-bestand en vertaal de kolommen die je kiest naar meer dan 40 talen: Engels, Spaans, Portugees, Chinees en meer. Elke vertaling wordt naast haar kolom gezet. Gratis, geen account nodig om het resultaat te zien.",
        label: "Kolommen vertalen",
        h1: "Vertaal de kolommen van je spreadsheet",
        intro:
          "Upload het Excel- of CSV-bestand. Kies welke kolommen je wilt vertalen en naar welke taal. Tavnit herkent de brontaal en zet de vertaling naast elke kolom, zonder de rest van je bestand aan te raken.",
        trust: ["CSV of Excel · tot 200 rijen", "{limit} gratis bestanden per dag", "Alles wordt na 24 uur verwijderd"],
        drop: {
          title: "Sleep je Excel- of CSV-bestand hierheen",
          hint: "of kies een bestand op je computer",
          choose: "Bestand kiezen",
          sample: "Probeer een voorbeeldbestand",
          formats: "CSV of .xlsx · tot 4 MB en 200 rijen",
        },
        errors: {
          unsupported: "Alleen CSV- of Excel-bestanden (.xlsx).",
          xls: "Dit is een oud Excel-bestand (.xls). Open het in Excel en sla het op als .xlsx of .csv.",
          too_many_rows: "De gratis vertaling verwerkt tot 200 rijen. Upload een deel van het bestand.",
          too_many_columns: "Kies maximaal 10 kolommen tegelijk.",
          no_columns: "Kies minstens één kolom.",
          nothing_to_clean: "We vonden geen tekst om te vertalen in die kolommen.",
          empty: "Het bestand is leeg of heeft geen rijen onder de kop.",
          unreadable: "We konden het bestand niet lezen. Is het een Excel-bestand, sla het dan opnieuw op als .xlsx.",
          failed: "We konden dit bestand niet vertalen. Probeer het opnieuw, of probeer het voorbeeldbestand.",
        },
        how: {
          heading: "Zo werkt het",
          steps: [
            { title: "Upload het bestand", body: "Een CSV- of Excel-bestand met omschrijvingen, instructies, opmerkingen of een andere tekstkolom." },
            { title: "Kies kolommen en taal", body: "We vinken de kolommen met tekst aan. Jij kiest de taal; de brontaal wordt voor je herkend." },
            { title: "Controleren en downloaden", body: "Elke vertaling staat naast haar originele kolom. Met je gratis account neem je het bestand mee als Excel of CSV." },
          ],
        },
        faqs: [
          { q: "Welke talen kan ik kiezen?", a: "Meer dan 40: Engels, Spaans, Portugees, Frans, Duits, Chinees, Italiaans, Japans, Koreaans, Arabisch, Russisch, Hindi, Turks, Vietnamees en nog veel meer. De brontaal wordt per cel herkend, dus het werkt ook als je bestand talen door elkaar gebruikt." },
          { q: "Wat gebeurt er met codes, getallen en eigennamen?", a: "Die blijven behouden. De vertaling respecteert opmaak, eenheden en codes; een cel die al in de doeltaal staat, blijft zoals ze is." },
          { q: "Waarom is de limiet 200 rijen?", a: "Omdat elke cel met een taalmodel wordt vertaald. De gratis versie verwerkt tot 200 rijen per bestand; een account heeft die limiet niet." },
          { q: "Wat gebeurt er met mijn originele kolommen?", a: "Die blijven zoals ze waren. De vertaling wordt als nieuwe kolom ernaast toegevoegd, bijvoorbeeld \"Description (ES)\"." },
          { q: "Kan ik het gebruiken voor productomschrijvingen bij de douane?", a: "Ja, dat is een veelvoorkomend gebruik: de omschrijvingen van een handelsfactuur of paklijst in het Engels of Spaans zetten voordat je de goederen classificeert." },
          { q: "Wat gebeurt er met mijn bestand?", a: "Het wordt alleen voor deze vertaling gebruikt en na 24 uur samen met het resultaat verwijderd. Alleen jouw browser kan het resultaat zien." },
          { q: "Hoe laat ik dit vanzelf gebeuren?", a: "In Tavnit is vertalen een Cleaner: die loopt vanzelf over elk document dat je uitleest of elk bestand dat per e-mail of API binnenkomt, samen met datums, getallen en valuta." },
        ],
        clean: {
          setup: {
            heading: "Kies de kolommen en de taal",
            fileSummary: "{rows} · {cols}",
            columnsLabel: "Kolommen met tekst",
            columnsHint: "Maximaal {max}. We hebben de kolommen met tekst aangevinkt.",
            tooMany: "Je kunt maximaal {max} kolommen tegelijk kiezen.",
            inputLabel: "",
            inputOptions: {},
            outputPopular: "Meest gebruikt",
            outputAll: "Alle talen",
            outputLabel: "Vertalen naar",
            outputOptions: {},
            preview: "Eerste rijen",
            run: "Vertalen",
            change: "Ander bestand",
          },
          stages: ["Het bestand uploaden", "De kolommen lezen", "De taal herkennen", "Vertalen", "Je bestand opbouwen"],
          heading: "Klaar: {file}",
          summary: "{cells} vertaald in {cols}",
          cellWord: ["cel", "cellen"],
          columnWord: ["kolom", "kolommen"],
          unchanged: "We vonden geen tekst om te vertalen in die kolommen.",
          highlight: "De vertaalde kolommen zijn blauw.",
          shown: "{shown} van {total} rijen getoond. De download bevat ze allemaal.",
          download: "Downloaden",
          downloadXlsx: "Excel (.xlsx)",
          downloadCsv: "CSV (.csv)",
          another: "Nog een bestand vertalen",
          automate: {
            heading: "Laat het bij elk document gebeuren",
            body: "In Tavnit is vertalen een Cleaner. Je stelt hem één keer in en elke factuur, paklijst of elk bestand dat binnenkomt, heeft de omschrijvingen al vertaald.",
            cta: "Maak een gratis account aan",
            docs: "Wat is een Cleaner",
          },
        },
      },
    },
  },

  og: {
    "invoice-to-excel": "Gratis. Geen sjablonen. De regels van je factuur als spreadsheet.",
    "invoice-line-items": "Gratis. Eén rij per factuurregel, de kop op elke rij. Geen sjablonen.",
    "po-invoice-check": "Gratis. Elke orderregel tegen de factuur: prijs, aantal, ontbrekende en extra regels.",
    "split-scanned-pdf": "Gratis. Eén scan erin, elk document eruit, elk geclassificeerd.",
    "packing-list-to-excel": "Gratis. Geen sjablonen. Elke regel van je paklijst als spreadsheet.",
    "bill-of-lading-to-excel": "Gratis. Geen sjablonen. Partijen, schip, havens en één rij per container.",
    "quote-comparison": "Gratis. Twee of drie offertes, één tabel, de goedkoopste per regel gemarkeerd.",
    "contract-dates": "Gratis. Partijen, looptijd, stilzwijgende verlenging en opzegdatum in één rij.",
    "receipt-to-excel": "Gratis. Fotografeer een bon en krijg de artikelen als spreadsheet.",
    "number-format": "Gratis. Elke kolom met getallen in één notatie: 1234.56, 1,234.56 of 1.234,56.",
    "date-format": "Gratis. Gemengde datums erin, één notatie eruit, ook datums in woorden.",
    "currency-converter": "Gratis. Elke kolom met prijzen, omgerekend tegen de referentiekoers van de dag.",
    "translate-columns": "Gratis. Elke tekstkolom, vertaald naar een van meer dan 40 talen.",
  },
};

export default nl;
