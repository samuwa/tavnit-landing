import type { UseCasesContent } from "@/content/types";

/** Use cases: the /use-cases hub copy and every use-case page — Nederlands (nl). */
const nl: UseCasesContent = {
  hub: {
    title: "Toepassingen — Facturen, contracten, cv's en meer",
    description:
      "Hoe teams Tavnit gebruiken per documenttype — facturen, contracten, cv's, bonnetjes, inkooporders en douanedocumenten, met wat er bij elk type misgaat.",
    ogTitle: "Tavnit-toepassingen",
    breadcrumbHome: "Home",
    breadcrumb: "Toepassingen",
    h1: "Toepassingen",
    intro:
      "De pipeline is dezelfde, wat je er ook in stopt — extraheren, opschonen, controleren, handelen. Wat verandert, is welke velden ertoe doen en wat er meestal misgaat.",
    introMore:
      "Elke pagina hieronder behandelt de velden die het waard zijn om uit dat documenttype te halen, de onderdelen die steevast stukgaan en welke stap van de pipeline zich daar terugbetaalt.",
    notSeeingHeading: "Staat jouw documenttype er niet bij?",
    notSeeing:
      "Dit zijn de typen waar teams het vaakst naar vragen, geen lijst van wat Tavnit ondersteunt. Er is geen configuratie per documenttype om te bouwen — je beschrijft de velden die je wilt en dezelfde extractie leest elke pdf of afbeelding, ook scans en handschrift.",
    notSeeingMore:
      "Afleverbonnen, bankafschriften, schadeclaims, medische formulieren, certificaten en aanvraagformulieren werken allemaal op dezelfde manier. Begin met de [handleiding om te starten](/docs) en definieer de velden die voor jou belangrijk zijn.",
    finalHeading: "Begin met één document",
    finalBody:
      "Bouw een Flow, stuur er iets echts doorheen en beoordeel de output voordat je iets koppelt. Gratis credits om mee te beginnen.",
    finalCta: "Gratis beginnen",
  },
  items: [
    {
      slug: "invoice-processing",
      label: "Factuurverwerking",
      badge: "Finance & crediteuren",
      h1: "Geautomatiseerde extractie van factuurgegevens",
      title: "Software voor factuurextractie met factuurregels",
      description:
        "Haal leverancier, factuurnummer, datums, totalen en alle factuurregels uit leveranciersfacturen in elke lay-out, met controle voordat er iets in je grootboek komt.",
      summary:
        "Leverancier, nummer, datums, totalen en factuurregels uit elke leverancierslay-out — met controle voordat het in je grootboek komt.",
      lede: "Tavnit leest leveranciersfacturen in elke lay-out en geeft leverancier, factuurnummer, datums, btw, totalen en elke factuurregel terug als getypeerde velden. Geen sjabloon per leverancier om te bouwen. Er wordt niets in je grootboek geboekt tot een beoordelaar het goedkeurt, en elke goedkeuring wordt vastgelegd.",
      problem: [
        "Crediteurenadministratie is het schoolvoorbeeld van dit probleem: elke maand dezelfde acht velden overtypen uit honderd verschillende lay-outs. Elke leverancier maakt zijn factuur anders op, sommigen sturen scans, sommigen foto's van scans, en wie zijn sjabloon wijzigt, doet dat zonder waarschuwing.",
        "Tools met sjablonen gaan slecht om met dat eerste probleem — je configureert een lay-out per leverancier, en elke nieuwe leverancier is een installatieklus. Zodra een leverancier zijn factuur herontwerpt, breekt het sjabloon stilletjes en stromen de fouten door naar je grootboek.",
      ],
      fields: [
        { name: "Naam en adres van de leverancier", note: "Wijkt vaak af van de handelsnaam die jij hebt vastgelegd — een opzoek-Cleaner kan die koppelen aan je leverancierslijst." },
        { name: "Factuurnummer", note: "Getypeerd als tekst, niet als getal. Voorloopnullen en prefixen doen ertoe en gaan verloren bij numeriek parsen." },
        { name: "Factuur- en vervaldatum", note: "Notaties verschillen per land. Een datum-Cleaner zet DD/MM en MM/DD om naar één uitvoerformaat." },
        { name: "Factuurregels", note: "Een herhalende tabel: omschrijving, aantal, stukprijs, bedrag. Het deel dat de meeste tools overslaan of platslaan." },
        { name: "Subtotaal, btw, korting, totaal", note: "Het loont om alle vier te extraheren, zodat de berekening gecontroleerd kan worden in plaats van vertrouwd." },
        { name: "Valuta", note: "Een valuta-Cleaner kan meteen omrekenen naar je rapportagevaluta." },
        { name: "Inkoopordernummer", note: "Waar het aanwezig is, kun je de factuur hiermee automatisch aan een inkooporder koppelen." },
      ],
      gotchas: [
        {
          title: "Bij factuurregels gaat extractie meestal mis",
          body: "Kopvelden zijn makkelijk. Een tabel die over een paginawissel loopt, samengevoegde cellen heeft of omschrijvingen over twee regels verdeelt, is waar de meeste tools iets aannemelijks en fouts teruggeven. Tabelvelden in een Flow behandelen herhalende rijen als rijen, dus een factuur met vijf regels levert vijf records op in plaats van één brij tekst.",
        },
        {
          title: "Een fout totaal ziet er precies zo uit als een goed totaal",
          body: "Er is geen zichtbaar verschil tussen een correct gelezen € 1.240,00 en een verkeerd gelezen € 1.240,00 die eigenlijk € 1.249,00 was. Dat is het argument voor voorwaardelijke beoordeling: een Cleaner-regel kan controleren of de factuurregels optellen tot het subtotaal en alleen de afwijkingen naar een mens sturen, zodat je niet alles hoeft te beoordelen om de paar gevallen te vangen die ertoe doen.",
        },
        {
          title: "Meerdere facturen komen binnen in één pdf",
          body: "Een leveranciersoverzicht of een gescande batch bevat vaak meerdere facturen in één bestand. Een Splitter haalt ze eerst uit elkaar, zodat elke factuur een eigen run met een eigen geëxtraheerd record wordt in plaats van één samengevoegde puinhoop.",
        },
      ],
      pipeline: [
        { label: "E-mailintegratie", href: "/docs/email-integration", why: "Leveranciers mailen hun facturen al. Stuur de crediteureninbox automatisch door en elke bijlage wordt verwerkt zonder dat iemand de app opent." },
        { label: "Splitters", href: "/docs/splitters", why: "Haalt gebundelde of geniete scans vóór de extractie uit elkaar in losse facturen." },
        { label: "Cleaners", href: "/docs/cleaners", why: "Normaliseert datums, rekent valuta om, koppelt leveranciers aan je leverancierslijst en markeert berekeningen die niet kloppen." },
        { label: "Menselijke beoordeling", href: "/docs/human-in-the-loop", why: "Houdt een run vast voor goedkeuring — elke factuur, of alleen de facturen die een regel markeerde — met een vastlegging die alleen kan worden aangevuld van wie wat heeft goedgekeurd." },
        { label: "Webhooks", href: "/docs/webhooks", why: "Stuurt het goedgekeurde record direct naar je boekhoudsysteem zodra de beoordeling rond is." },
      ],
      faqs: [
        { q: "Werkt het met gescande en gefotografeerde facturen?", a: "Ja. Scans, foto's en pdf's op basis van afbeeldingen gaan vóór de extractie allemaal door OCR. Kwaliteit blijft ertoe doen — een scherpe scan wordt betrouwbaarder geëxtraheerd dan een scheve telefoonfoto — en daarom bestaat er beoordeling voor de twijfelgevallen." },
        { q: "Moet ik een sjabloon per leverancier instellen?", a: "Nee. Je definieert één keer de velden die je wilt, en dezelfde Flow leest facturen van elke leverancier in elke lay-out. Een nieuwe leverancier toevoegen vraagt geen configuratie." },
        { q: "Kan het factuurregels extraheren, niet alleen totalen?", a: "Ja. Factuurregels worden gedefinieerd als tabelvelden, dus een herhalende tabel levert één record per rij op, met omschrijving, aantal, stukprijs en bedrag apart getypeerd." },
        { q: "Hoe gaat het om met verschillende valuta?", a: "Valuta wordt als apart veld geëxtraheerd, en een Cleaner kan bedragen tijdens de verwerking omrekenen naar je rapportagevaluta, zodat systemen verderop één consistente eenheid ontvangen." },
      ],
    },
    {
      slug: "contract-analysis",
      label: "Contractanalyse",
      badge: "Juridisch & inkoop",
      h1: "Gegevens uit contracten extraheren",
      title: "Contractgegevens extraheren — voorwaarden en verlengingsdata",
      description:
        "Haal partijen, ingangs- en verlengingsdata, betalingsvoorwaarden, opzegtermijnen en aansprakelijkheidslimieten uit een contractportefeuille, naar een tabel die je echt kunt bevragen.",
      summary:
        "Partijen, verlengingsdata, opzegtermijnen en betalingsvoorwaarden uit een contractportefeuille, in een doorzoekbare tabel.",
      lede: "Tavnit leest getekende contracten en geeft de voorwaarden terug waar verplichtingen aan vastzitten — partijen, ingangs- en verlengingsdata, opzegtermijnen, betalingsvoorwaarden, aansprakelijkheidslimieten — als gestructureerde velden. De portefeuille wordt een tabel die je kunt bevragen in plaats van een map die je moet doorlezen.",
      problem: [
        "De meeste organisaties kunnen geen basisvragen over hun eigen contracten beantwoorden. Welke overeenkomsten worden volgend kwartaal stilzwijgend verlengd? Wat is onze totale aansprakelijkheid? Welke leveranciers hebben een opzegtermijn van 90 dagen? De antwoorden bestaan, verspreid over honderden pdf's die niemand de tijd heeft om te openen.",
        "De kosten zitten niet in het lezen — maar in de verlengingen die ongemerkt voorbijgaan, en in de voorwaarden die tijdens een geschil boven water komen in plaats van ervoor.",
      ],
      fields: [
        { name: "Partijen en ondertekenende entiteiten", note: "De juridische entiteit is vaak niet de handelsnaam, en het loont om beide vast te leggen." },
        { name: "Ingangs- en einddatum", note: "Het paar dat elke verlengingsvraag bepaalt die je later wilt stellen." },
        { name: "Stilzwijgende verlenging en opzegtermijn", note: "De twee velden die bepalen of een verlenging een keuze is of een verrassing." },
        { name: "Betalingsvoorwaarden en bedragen", note: "30 dagen netto, mijlpalen, indexeringen. Vaak in lopende tekst in plaats van in een tabel." },
        { name: "Aansprakelijkheidslimiet en vrijwaringen", note: "Meestal een clausule, geen getal. Het loont om die als tekst te extraheren, plus een geparste waarde als die er is." },
        { name: "Toepasselijk recht en bevoegde rechter", note: "Kort, makkelijk te extraheren en vervelend om handmatig in een hele portefeuille op te zoeken." },
        { name: "Opzeggingsrechten", note: "Zonder opgave van redenen, wegens tekortkoming, en de termijn die elk vereist." },
      ],
      gotchas: [
        {
          title: "Het antwoord staat in lopende tekst, niet in een veld",
          body: "Een factuur zet het totaal in een vakje. Een contract verstopt de opzegtermijn midden in een clausule, soms in woorden in plaats van cijfers. Met extractiehints vertel je de Flow wat de voorwaarde betekent en waar die meestal staat, in plaats van te hopen dat een label overeenkomt.",
        },
        {
          title: "Wijzigingen veranderen het antwoord",
          body: "De geldende voorwaarden staan vaak in een wijzigingsovereenkomst, niet in het origineel. Behandel elk document als een eigen run en leg de ondertekeningsdatum vast als veld, zodat de actuele stand een query is in plaats van een aanname over welk bestand het nieuwste is.",
        },
        {
          title: "Fouten zijn hier duur, dus beoordeling is geen optie maar een must",
          body: "Een verkeerd gelezen verlengingsdatum is een contract waar je niet op tijd uit bent gestapt. Dit is een toepassing waarbij beoordeling van elke run in verhouding staat, en waarbij de audittrail die alleen kan worden aangevuld net zo belangrijk is als de extractie — je kunt laten zien wie een voorwaarde wanneer heeft bevestigd.",
        },
      ],
      pipeline: [
        { label: "Flows", href: "/docs/flows", why: "Extractiehints vertellen de AI wat een voorwaarde betekent, en dat doet er hier veel meer toe dan bij documenten met gelabelde velden." },
        { label: "Menselijke beoordeling", href: "/docs/human-in-the-loop", why: "Beoordeling van elke run, met een blijvende vastlegging van wie elke voorwaarde heeft bevestigd." },
        { label: "Buckets", href: "/docs/buckets", why: "Maakt van de portefeuille een doorzoekbare tabel — welke overeenkomsten volgend kwartaal worden verlengd, gesorteerd op opzegtermijn." },
        { label: "Cleaners", href: "/docs/cleaners", why: "Normaliseert datumnotaties en kan uit een einddatum en een opzegtermijn de uiterste opzegdatum berekenen." },
      ],
      faqs: [
        { q: "Kan het omgaan met contracten zonder vaste structuur?", a: "Ja — dat is de normale situatie. Er is geen sjabloon om te configureren. Je beschrijft de voorwaarden die je wilt en de Flow vindt ze waar ze ook staan. Daarom doen extractiehints er hier meer toe dan bij gestructureerde documenten." },
        { q: "En wijzigingsovereenkomsten en side letters?", a: "Verwerk elk ervan als een eigen run met de ondertekeningsdatum als veld. De actuele stand komt dan uit een query op je Bucket in plaats van uit gissen welke pdf het recentst is." },
        { q: "Zijn de geëxtraheerde gegevens te bevragen?", a: "Ja. Resultaten komen als getypeerde kolommen in een Bucket, dus je kunt over de hele portefeuille filteren, sorteren en grafieken maken zonder iets te exporteren." },
      ],
    },
    {
      slug: "resume-screening",
      label: "Cv-screening",
      badge: "HR & werving",
      h1: "Cv's parsen en screenen",
      title: "Software om cv's te parsen — gestructureerde kandidaatgegevens",
      description:
        "Zet cv's in elk formaat om in consistente kandidaatrecords — contactgegevens, vaardigheden, functies, data, opleiding — zodat screenen filteren wordt in plaats van lezen.",
      summary:
        "Cv's in elk formaat omgezet in consistente kandidaatrecords, zodat screenen filteren wordt in plaats van lezen.",
      lede: "Tavnit leest cv's in elke lay-out en geeft consistente kandidaatrecords terug: contactgegevens, vaardigheden, functietitels met data, opleiding en certificeringen. Omdat elke kandidaat in dezelfde velden wordt beschreven, wordt screenen het filteren van een tabel in plaats van tweehonderd pdf's openen.",
      problem: [
        "Cv's zijn het minst gestandaardiseerde document dat de meeste teams verwerken. Twee kolommen of één, tabellen of lopende tekst, een vormgegeven lay-out met de data in een zijbalk. Een mens leest ze allemaal; software leest er meestal ongeveer de helft.",
        "De echte kosten zitten in inconsistentie. Als honderd cv's elk net iets anders worden samengevat, kun je kandidaten niet meer op dezelfde criteria vergelijken, en wordt screenen ongemerkt een kwestie van wie de eerste beoordelaar toevallig leuk vond.",
      ],
      fields: [
        { name: "Naam en contactgegevens", note: "Staan vaak in een kop, een zijbalk of een afbeelding — een van de vaakste extractiefouten." },
        { name: "Functietitels met werkgevers en data", note: "Een herhalende tabel, geen enkele waarde. Tabelvelden houden elke functie als een eigen rij." },
        { name: "Totaal aantal jaren ervaring", note: "Wordt zelden vermeld. Een formule-Cleaner kan het uit de data van de functies berekenen in plaats van een bewering te vertrouwen." },
        { name: "Vaardigheden", note: "Het best letterlijk geëxtraheerd en daarna genormaliseerd — een categorie-Cleaner kan 'JS', 'JavaScript' en 'ES6' op één waarde zetten." },
        { name: "Opleiding en certificeringen", note: "Instelling, kwalificatie, jaar. Weer een herhalende structuur." },
        { name: "Locatie en werkvergunning", note: "Vaak het eerste harde filter, en vaak verstopt in de kop." },
      ],
      gotchas: [
        {
          title: "Lay-outs met twee kolommen breken naïeve lezers",
          body: "Een vormgegeven cv met een zijbalk wordt van boven naar beneden gelezen tot door elkaar gehusselde onzin door alles wat eenvoudige tekstextractie doet. Extractie die de lay-out begrijpt, houdt de zijbalk en de hoofdkolom gescheiden, en daarom komen contactgegevens in een zijbalk toch in het juiste veld terecht.",
        },
        {
          title: "Vaardigheden moeten worden genormaliseerd, anders is het filter nutteloos",
          body: "Letterlijk geëxtraheerd krijg je 'JS', 'JavaScript', 'Javascript (ES6)' en 'JAVASCRIPT' als vier verschillende waarden, en filteren op één ervan mist de andere. Een categorie-Cleaner zet varianten om naar een vaste woordenlijst, zodat het filter echt iedereen teruggeeft die geschikt is.",
        },
        {
          title: "Dit zijn persoonsgegevens, en de regels zijn strenger",
          body: "Cv's zijn per definitie persoonsgegevens, en in verschillende rechtsgebieden gelden voor kandidaatgegevens bewaartermijnen en een recht op verwijdering. Met de zichtbaarheid van Buckets en toegangsrechten per gebruiker houd je kandidaatrecords beperkt tot de mensen die het proces uitvoeren in plaats van zichtbaar voor de hele organisatie.",
        },
      ],
      pipeline: [
        { label: "Flows", href: "/docs/flows", why: "Tabelvelden houden elke functie en elke kwalificatie als een eigen rij in plaats van één blok tekst." },
        { label: "Cleaners", href: "/docs/cleaners", why: "Zet vaardigheden om naar een vaste woordenlijst en berekent de totale ervaring uit de data van de functies." },
        { label: "Buckets", href: "/docs/buckets", why: "Kandidaatrecords als filterbare tabel, met toegang per Bucket zodat sollicitantgegevens niet voor de hele organisatie zichtbaar zijn." },
        { label: "E-mailintegratie", href: "/docs/email-integration", why: "Sollicitaties die per e-mail binnenkomen, worden bij aankomst verwerkt, bijlagen inbegrepen." },
      ],
      faqs: [
        { q: "Werkt het met cv's in twee kolommen en vormgegeven cv's?", a: "Ja. De extractie houdt rekening met de lay-out in plaats van ruwe tekst van boven naar beneden te lezen, dus zijbalken en lay-outs met meerdere kolommen raken niet tot onzin verweven." },
        { q: "Kan het namen van vaardigheden standaardiseren?", a: "Ja. Extraheer letterlijk en gebruik daarna een categorie-Cleaner om varianten naar een vaste woordenlijst om te zetten, zodat filteren op een vaardigheid elke kandidaat teruggeeft die haar heeft." },
        { q: "Hoe blijven kandidaatgegevens privé?", a: "Buckets kunnen privé zijn in plaats van zichtbaar voor de hele organisatie, met Viewer- of Editor-rechten per gebruiker. Kandidaatrecords blijven beperkt tot de mensen die het proces uitvoeren." },
      ],
    },
    {
      slug: "expense-reports",
      label: "Onkostendeclaraties",
      badge: "Finance & medewerkers",
      h1: "Bonnetjes en onkostendeclaraties verwerken",
      title: "OCR voor bonnetjes en automatisering van onkostendeclaraties",
      description:
        "Zet gefotografeerde bonnetjes om in gecategoriseerde onkostenregels — winkel, datum, bedrag, btw en categorie — zodat vergoeden een kwestie van beoordelen wordt in plaats van invoerwerk.",
      summary:
        "Gefotografeerde bonnetjes omgezet in gecategoriseerde onkostenregels, zodat vergoeden beoordelen wordt in plaats van invoerwerk.",
      lede: "Tavnit leest bonnetjes — ook verfrommelde, in slecht licht gefotografeerd — en geeft winkel, datum, bedrag, btw en categorie terug als getypeerde velden. Onkosten komen gecategoriseerd en controleerbaar binnen, zodat het goedkeuren van een declaratie een beoordeling is in plaats van overtypwerk.",
      problem: [
        "Onkostenverwerking loopt aan beide kanten vast. Medewerkers stellen indienen uit omdat het formulier invullen saai is, en finance typt daarna opnieuw over wat is ingediend, omdat het formulier inconsistent is ingevuld. Vergoedingen lopen vertraging op, en niemand vindt ook maar één onderdeel ervan leuk.",
        "Bonnetjes zijn bovendien de documenten van de slechtste kwaliteit die de meeste bedrijven verwerken: vervaagd thermisch papier, scheef gefotografeerd, gevouwen, soms deels in een andere taal.",
      ],
      fields: [
        { name: "Naam van de winkel", note: "Vaak een gestileerd logo in plaats van tekst — een van de lastigere velden op een bonnetje." },
        { name: "Datum en tijd van de transactie", note: "De tijd doet er meer toe dan mensen denken, voor dagvergoedingen en het opsporen van dubbele declaraties." },
        { name: "Totaal, btw en fooi", note: "De btw apart houden is belangrijk voor terugvordering; de fooi apart houden is belangrijk voor het beleid." },
        { name: "Betaalmethode en laatste vier cijfers", note: "Hiermee kun je automatisch afstemmen met een creditcardafschrift." },
        { name: "Onkostencategorie", note: "Het best afgeleid door een AI-categorie-Cleaner uit de winkel en de regels, in plaats van het aan de medewerker te vragen." },
        { name: "Valuta", note: "Reiskosten komen binnen in de valuta waarin ze zijn gemaakt; omrekenen hoort in de pipeline." },
      ],
      gotchas: [
        {
          title: "De kwaliteit van bonnetjes is echt slecht",
          body: "Vervaagd thermisch papier, schittering, vouwen en scheve hoeken zijn eerder regel dan uitzondering. De extractie kan er grotendeels mee overweg, maar dit is een documenttype waarbij voorwaardelijke beoordeling haar plek verdient: markeer bedragen met een lage betrouwbaarheid of buiten het beleid voor een mens en laat de schone doorgaan.",
        },
        {
          title: "Categoriseren is het eigenlijke werk",
          body: "Het totaal lezen is makkelijk. Bepalen of een restaurantrekening relatiegeschenk of teamuitje is, is wat finance tijd kost. Een AI-categorie-Cleaner wijst een categorie toe op basis van de winkel en de regels, zodat de medewerker niet hoeft te gokken en finance corrigeert in plaats van classificeert.",
        },
        {
          title: "Dubbele declaraties komen vaak voor en zijn duur",
          body: "Hetzelfde bonnetje dat twee keer wordt ingediend — één keer als foto, één keer als pdf van de winkel — is een gebruikelijke bron van te veel vergoeding. Door winkel, exact bedrag en tijdstip te extraheren, heb je genoeg om het in de Bucket op te sporen in plaats van het bij een audit te ontdekken.",
        },
      ],
      pipeline: [
        { label: "E-mailintegratie", href: "/docs/email-integration", why: "Medewerkers sturen bonnetjes door naar een adres in plaats van een app te leren. Digitale bonnetjes kunnen bij ontvangst automatisch worden doorgestuurd." },
        { label: "Cleaners", href: "/docs/cleaners", why: "Wijst met AI een categorie toe, rekent vreemde valuta om en standaardiseert winkelnamen." },
        { label: "Menselijke beoordeling", href: "/docs/human-in-the-loop", why: "Voorwaardelijke beoordeling — alleen onkosten boven een drempel of buiten het beleid komen bij een goedkeurder." },
        { label: "Buckets", href: "/docs/buckets", why: "Onkosten als tabel die je kunt groeperen, in grafieken kunt zetten en vóór betaling op dubbelingen kunt controleren." },
      ],
      faqs: [
        { q: "Kan het een foto van een verfrommeld bonnetje lezen?", a: "Meestal wel. Foto's, vervaagd thermisch papier en gevouwen bonnetjes gaan allemaal door OCR, al bepaalt de kwaliteit het plafond — en daarom bestaat er voorwaardelijke beoordeling voor de bonnetjes waarover de pipeline het minst zeker is." },
        { q: "Kunnen onkosten automatisch worden gecategoriseerd?", a: "Ja. Een AI-categorie-Cleaner wijst een categorie toe op basis van de winkel en de regels, zodat finance af en toe een randgeval corrigeert in plaats van alles te classificeren." },
        { q: "En vreemde valuta bij reiskosten?", a: "Valuta is een apart geëxtraheerd veld, en een omrekenings-Cleaner kan bedragen tijdens de verwerking in je rapportagevaluta uitdrukken." },
      ],
    },
    {
      slug: "purchase-orders",
      label: "Inkooporders",
      badge: "Inkoop & crediteuren",
      h1: "Software voor PO-matching: facturen automatisch koppelen aan inkooporders",
      title: "Geautomatiseerde PO-matching — facturen tegen inkooporders",
      description:
        "Software voor PO-matching: extraheer inkooporders en facturen naar dezelfde velden, koppel factuurregels automatisch en stuur alleen afwijkingen naar een beoordelaar.",
      summary:
        "Inkooporders en facturen in één vorm geëxtraheerd, regel voor regel gekoppeld, en alleen de afwijkingen naar een beoordelaar.",
      lede: "Tavnit leest inkooporders en de facturen die erop volgen, extraheert inkoopordernummer, leverancier, SKU's, aantallen en prijzen als getypeerde velden en koppelt factuurregels automatisch aan inkooporderregels — ook als de leverancier een artikel anders omschrijft. Matching op kopniveau is een opzoeking op het inkoopordernummer; matching op regelniveau is een vergelijking door een Matcher; alles wat niet klopt, gaat naar een vaste beoordelaar in plaats van naar je grootboek.",
      problem: [
        "PO-matching is de controle of wat er is gefactureerd ook is wat er is besteld. In de meeste teams gebeurt dat nog op het oog: een crediteurenmedewerker opent de factuur-pdf, zoekt de inkooporder op en vergelijkt aantallen en prijzen regel voor regel. Het is traag, en het is precies waar de twee dure fouten — een fout aantal en een foute stukprijs — erdoorheen glippen, omdat ze er precies zo uitzien als goede.",
        "Tools voor geautomatiseerde PO-matching in ERP-systemen gaan ervan uit dat beide documenten al gestructureerd zijn. Dat zijn ze niet. De inkooporder kwam uit jouw systeem, maar de factuur uit dat van de leverancier, als pdf, met zijn artikelnummers en zijn lay-out. Die in een vergelijkbare vorm krijgen, is de onopgeloste helft van het probleem, en dat is de helft die Tavnit oplost.",
      ],
      fields: [
        { name: "Inkoopordernummer", note: "De sleutel waarop alles wordt gekoppeld. Extraheer het als tekst — prefixen en voorloopnullen tellen mee, en leveranciers zetten het op verschillende plekken op de factuur." },
        { name: "Leverancier en koper", note: "De eigen naam van de leverancier op de factuur komt zelden letterlijk overeen met de leveranciersrecord. Een opzoek-Cleaner koppelt die aan je leveranciers-ID." },
        { name: "Factuurregels: omschrijving, SKU, aantal", note: "Een herhalende tabel op beide documenten. Artikelnummers van leveranciers wijken meestal af van de jouwe; omschrijvingen zijn anders geformuleerd — dat maakt regelmatching lastig." },
        { name: "Stukprijs en regelbedrag", note: "Allebei, zodat stukprijs × aantal op de factuur zelf kan worden gecontroleerd voordat die met de inkooporder wordt vergeleken." },
        { name: "Totalen van factuur en inkooporder", note: "Matching op kopniveau. Een totaal dat klopt terwijl een regel afwijkt, is een verwisseling van aantal en prijs — het geval dat een controle op alleen het totaal mist." },
        { name: "Leverdatum en referentie van de afleverbon", note: "Het derde document in een three-way match. Afleverbonnen worden op dezelfde manier geëxtraheerd; zie de pagina over afleverbonnen." },
        { name: "Betalingsvoorwaarden en valuta", note: "Korte velden met grote gevolgen als de factuur afwijkt van de inkooporder." },
      ],
      gotchas: [
        {
          title: "Two-way, three-way: de match werkt alleen als de vormen overeenkomen",
          body: "Een two-way match vergelijkt de factuur met de inkooporder; een three-way match voegt de ontvangstbon toe. Allebei vallen ze uit elkaar als de documenten naar verschillende veldnamen worden geëxtraheerd. Door inkooporders, facturen en afleverbonnen door Flows te halen die hetzelfde veldschema delen — inkoopordernummer, SKU, aantal, stukprijs — wordt matchen een vergelijking in plaats van documenten lezen.",
        },
        {
          title: "Artikelnummers van leveranciers zijn niet jouw artikelnummers",
          body: "Op de inkooporder staat jouw SKU; op de factuur die van de leverancier. Een opzoek-Cleaner koppelt tijdens de verwerking artikelnummers van leveranciers aan je SKU's op basis van je referentiedata, zodat de factuur al vertaald binnenkomt. Waar geen referentie bestaat, koppelt een Matcher regels op de betekenis van de omschrijving — semantisch, niet exact — met een LLM als scheidsrechter bij twijfelgevallen.",
        },
        {
          title: "Matching op regelniveau, niet alleen op totalen",
          body: "Stel de inkooporder-run in als benchmark en de factuur als de run die ermee wordt vergeleken. De Matcher koppelt elke factuurregel aan een inkooporderregel en zet aantal en stukprijs naast elkaar, waarbij niet-gekoppelde regels als waarschuwing worden vermeld in plaats van stilletjes te verdwijnen. Een controle op alleen het totaal zou een factuur doorlaten die het juiste bedrag rekent voor de verkeerde artikelen.",
        },
        {
          title: "Alleen de uitzonderingen moeten bij een mens komen",
          body: "Elke factuur beoordelen brengt het handmatige proces terug. Een formule-Cleaner controleert of stukprijs × aantal op de factuur zelf gelijk is aan het regelbedrag, en een voorwaarde markeert regels buiten je tolerantie. Menselijke beoordeling wordt alleen gestart voor gemarkeerde runs, zodat de beoordelaar de drie facturen ziet die afwijken, niet de driehonderd die kloppen.",
        },
      ],
      pipeline: [
        { label: "Collections", href: "/docs/collections", why: "Leveranciers sturen inkooporders, facturen en afleverbonnen naar één adres. Collections classificeert elk document en stuurt het naar de juiste Flow." },
        { label: "Cleaners", href: "/docs/cleaners", why: "Koppelt artikelnummers en leveranciersnamen via een opzoeking aan je stamgegevens, controleert regelberekeningen en markeert waarden buiten de tolerantie." },
        { label: "Buckets", href: "/docs/buckets", why: "Bewaart inkooporders en facturen in dezelfde vorm, zodat matching op kopniveau een query op het inkoopordernummer is." },
        { label: "Menselijke beoordeling", href: "/docs/human-in-the-loop", why: "Alleen gemarkeerde facturen wachten op een vaste beoordelaar, met een audittrail die alleen kan worden aangevuld van wie wat heeft goedgekeurd." },
        { label: "API-integratie", href: "/docs/api-integration", why: "Stuurt gematchte, goedgekeurde facturen zonder handmatige stap naar je ERP- of crediteurensysteem." },
      ],
      faqs: [
        { q: "Wat is PO-matching?", a: "PO-matching is de controle of een factuur overeenkomt met de inkooporder waarop ze factureert — dezelfde leverancier, dezelfde artikelen, dezelfde aantallen en prijzen. Een two-way match vergelijkt factuur en inkooporder; een three-way match controleert ook de ontvangstbon. Het is de controle die voorkomt dat een leverancier wordt betaald voor iets wat niet is besteld of niet is geleverd." },
        { q: "Kan Tavnit facturen automatisch matchen met inkooporders?", a: "Ja. Extraheer beide naar dezelfde veldstructuur en matching op kopniveau wordt een query op het inkoopordernummer in je Bucket. Voor matching op regelniveau neemt een Matcher in benchmarkmodus de inkooporder als uitgangspunt en koppelt elke factuurregel daaraan, met aantal en stukprijs naast elkaar. Regels die niet te koppelen zijn, worden als waarschuwing vermeld." },
        { q: "Wat als de leverancier eigen artikelnummers of omschrijvingen gebruikt?", a: "Als je referentiedata hebt, koppelt een opzoek-Cleaner tijdens de verwerking artikelnummers van leveranciers aan je SKU's. Heb je die niet, dan koppelt de Matcher regels op de betekenis van de omschrijving in plaats van de exacte tekst, met een LLM als scheidsrechter bij twijfelgevallen, zodat \"Blue widget 10pk\" en \"WIDGET-BLU x10\" op dezelfde rij uitkomen." },
        { q: "Wat gebeurt er als een factuur niet klopt?", a: "Die wordt tegengehouden. Een voorwaarde-Cleaner markeert de run en menselijke beoordeling stuurt hem naar een vaste beoordelaar, die de factuur, de geëxtraheerde waarden en het verschil ziet. Kloppende facturen gaan direct via API of webhook naar je ERP. Elke weergave, wijziging en goedkeuring wordt vastgelegd in een audittrail die alleen kan worden aangevuld." },
        { q: "Doet het three-way matching met afleverbonnen?", a: "Afleverbonnen en ontvangstbonnen worden op dezelfde manier geëxtraheerd als inkooporders en facturen — ook handgeschreven aantallen op getekende afleverbewijzen — naar dezelfde veldvorm, dus het derde been van de match is een derde run die met de inkooporder wordt vergeleken." },
        { q: "Moeten we ons ERP aanpassen?", a: "Nee. Tavnit zit ervoor: documenten komen binnen via e-mail of API, worden geëxtraheerd en gematcht, en goedgekeurde resultaten gaan via REST API of webhook naar je ERP- of crediteurensysteem. Er zijn recepten voor Zapier, Make en n8n voor teams die liever geen code schrijven." },
        { q: "Komen factuurregels apart binnen?", a: "Ja. Factuurregels zijn tabelvelden, dus elke rij geeft SKU, omschrijving, aantal, stukprijs en regelbedrag terug als aparte getypeerde waarden — en dat maakt vergelijken op regelniveau überhaupt mogelijk." },
      ],
    },
    {
      slug: "customs-trade",
      label: "Douane & handel",
      badge: "Logistiek & handel",
      h1: "Douanedocumenten automatiseren",
      title: "Douaneautomatisering met HS-codeclassificatie",
      description:
        "Extraheer handelsfacturen, paklijsten en cognossementen, en deel goederen in onder HS-tariefcodes tijdens de verwerking in plaats van erna.",
      summary:
        "Handelsfacturen, paklijsten en cognossementen geëxtraheerd — met HS-tariefindeling ingebouwd in de pipeline.",
      lede: "Tavnit leest douanepapieren — handelsfacturen, paklijsten, cognossementen, certificaten van oorsprong — en geeft afzender, ontvanger, goederenomschrijvingen, gewichten en waarden terug als getypeerde velden. Een HS-code-Cleaner deelt goederen tijdens de verwerking in onder tariefcodes, zodat aangiftes worden opgesteld vanuit gestructureerde data in plaats van te worden overgetypt.",
      problem: [
        "Eén zending levert een stapel documenten op die dezelfde feiten in verschillende lay-outs herhalen, en een douaneaangifte vraagt dat ze op elkaar zijn afgestemd en kloppen. Het werk is overtypen plus classificeren, onder tijdsdruk, en een fout betekent een vertraagde zending of een boete.",
        "Classificeren is het specialistische deel. De tariefcode bepalen bij een gegeven omschrijving is oordeelswerk waar de meeste extractietools zich niet eens aan wagen, zodat het een handmatige stap blijft nadat de automatisering klaar is.",
      ],
      fields: [
        { name: "Afzender en ontvanger", note: "Volledige juridische namen en adressen, die de aangifte bepalen." },
        { name: "Goederenomschrijving per regel", note: "De tekst waaruit de tariefindeling wordt afgeleid — het loont om die letterlijk te extraheren." },
        { name: "HS-tariefcode", note: "Tijdens de verwerking door een Cleaner uit de omschrijving afgeleid in plaats van achteraf opgezocht." },
        { name: "Aantal, netto- en brutogewicht", note: "Gewichten staan op de paklijst en waarden op de factuur, dus die twee moeten op elkaar worden afgestemd." },
        { name: "Land van oorsprong", note: "Bepaalt rechten en preferentiële behandeling. Vaak per regel in plaats van per zending." },
        { name: "Incoterms en aangegeven waarde", note: "Bepaalt wat belastbaar is en wie waarvoor verantwoordelijk is." },
        { name: "Container- en B/L-nummers", note: "De sleutels waarmee je de documentenset terugkoppelt aan één zending." },
      ],
      gotchas: [
        {
          title: "Classificeren is het lastige deel, en het zit ingebouwd",
          body: "De meeste documenttools stoppen bij extractie en laten tariefindeling als handwerk over. Tavnit levert een HS-code-Cleaner die goederen tijdens de run indeelt op basis van de geëxtraheerde omschrijving, zodat de specialistische stap binnen de pipeline gebeurt in plaats van erna.",
        },
        {
          title: "Eén zending, meerdere documenten, één waarheid",
          body: "De handelsfactuur bevat de waarden, de paklijst de gewichten, het cognossement de container. Een Collection stuurt elk documenttype naar een eigen Flow, en een gedeelde Bucket met de zendingsreferentie als sleutel voegt ze weer samen tot één beeld.",
        },
        {
          title: "Fouten zijn hier boetes, geen correcties",
          body: "Een verkeerd aangegeven code of waarde is een douanekwestie, geen boekhoudkwestie. Dit is een toepassing waarbij beoordeling van elke aangifte in verhouding staat, en waarbij de audittrail die alleen kan worden aangevuld echt nuttig is als je moet laten zien hoe een classificatie tot stand kwam.",
        },
      ],
      pipeline: [
        { label: "Collections", href: "/docs/collections", why: "Stuurt facturen, paklijsten en cognossementen vanuit één inbox automatisch naar de juiste Flow." },
        { label: "Cleaners", href: "/docs/cleaners", why: "Deelt goederen in onder HS-tariefcodes, rekent valuta om en standaardiseert gewichten en eenheden." },
        { label: "Splitters", href: "/docs/splitters", why: "Zendingsdocumenten komen meestal binnen als één gecombineerde pdf. Splitters halen die vóór de extractie uit elkaar." },
        { label: "Menselijke beoordeling", href: "/docs/human-in-the-loop", why: "Beoordeel elke aangifte vóór indiening, met een vastlegging van wie welke classificatie heeft goedgekeurd." },
      ],
      faqs: [
        { q: "Kent het echt HS-tariefcodes toe?", a: "Ja. Een HS-code-Cleaner deelt goederen tijdens de run in op basis van de geëxtraheerde omschrijving, zodat classificeren binnen de pipeline gebeurt in plaats van als handmatige stap achteraf. Aangiftes blijven jouw verantwoordelijkheid, en daarom raden we beoordeling vóór indiening aan." },
        { q: "Kan het een volledige documentenset van een zending aan?", a: "Ja. Een Collection stuurt handelsfacturen, paklijsten en cognossementen naar hun eigen Flows, en resultaten met de zendingsreferentie als sleutel worden samengevoegd tot één record." },
        { q: "Wat als de papieren binnenkomen als één gecombineerde pdf?", a: "Een Splitter haalt het gecombineerde bestand eerst uit elkaar in de afzonderlijke documenten, zodat elk ervan wordt geëxtraheerd door de Flow die ervoor is gebouwd." },
      ],
    },
    {
      slug: "bank-statements",
      label: "Bankafschriften",
      badge: "Finance & kredietverlening",
      h1: "Gegevens uit bankafschriften extraheren",
      title: "Bankafschriften extraheren — van pdf naar transactierijen",
      description:
        "Zet afschrift-pdf's van elke bank om in transactierijen — datum, omschrijving, bedrag, lopend saldo — klaar om af te stemmen of te beoordelen.",
      summary: "Afschrift-pdf's van elke bank omgezet in transactierijen die je kunt afstemmen, categoriseren of beoordelen.",
      lede: "Tavnit leest bankafschriften als pdf van elke instelling en geeft elke transactie terug als rij: datum, omschrijving, debet of credit en lopend saldo. Omdat het saldo ook wordt geëxtraheerd, kan de berekening worden gecontroleerd in plaats van aangenomen — en dat maakt de output veilig om mee af te stemmen.",
      problem: [
        "Elke bank maakt afschriften anders op, en geen enkele maakt ze op voor machines. Kolommen verschuiven, transacties lopen door op twee regels, en het lopende saldo is het enige wat de reeks bij elkaar houdt. Wie kredietbeoordeling, boekhouding of afstemming doet, typt uiteindelijk alles over of betaalt voor een connector per bank.",
        "Open banking lost dit op waar het beschikbaar is en de klant toestemming geeft. Voor al het andere — historische periodes, zakelijke rekeningen, banken zonder API, afschriften die als bewijs worden aangeleverd — is de pdf de enige bron die er is.",
      ],
      fields: [
        { name: "Rekeninghouder, rekeningnummer en bankcode", note: "Staan meestal alleen op pagina één, dus ze moeten over een afschrift van meerdere pagina's worden meegenomen." },
        { name: "Afschriftperiode", note: "Bepaalt wat de totalen betekenen, en ontbreekt het vaakst als iemand handmatig overtypt." },
        { name: "Transactiedatum", note: "Vaak afgekort zonder jaartal — het jaar komt uit de afschriftperiode, niet uit de rij." },
        { name: "Omschrijving of tegenpartij", note: "Door de bank ingekort en afgekort. Een categorie-Cleaner leidt er winkel en type uit af." },
        { name: "Debet, credit en lopend saldo", note: "Extraheer alle drie. Met het saldo kun je controleren dat er geen rijen zijn weggevallen." },
        { name: "Begin- en eindsaldo", note: "De controlesom voor het hele afschrift." },
      ],
      gotchas: [
        {
          title: "Een weggevallen rij is onzichtbaar zonder het saldo",
          body: "Als de extractie één transactie mist, zien de overige rijen er nog steeds volkomen aannemelijk uit. Door het lopende saldo te extraheren, wordt dat een opspoorbare fout: een formule-Cleaner kan controleren of het saldo van elke rij gelijk is aan het vorige saldo plus de mutatie, en het afschrift markeren in plaats van het door te laten.",
        },
        {
          title: "Transacties lopen door, en doorlopende regels zijn geen nieuwe transacties",
          body: "Lange namen van tegenpartijen lopen door op een tweede regel, en naïef tabellezen maakt van één betaling twee rijen met een leeg bedrag. Tabelvelden behandelen een rij als een rij, dus een doorlopende omschrijving blijft bij haar bedrag.",
        },
        {
          title: "Datums hebben zelden een jaartal",
          body: "De meeste afschriften drukken '14 mrt' af en vertrouwen op de periode bovenaan voor het jaar. Dat is prima voor een mens en fout voor een database — vooral rond een jaarwisseling in een afschrift van januari. Extraheer de afschriftperiode en leid de volledige datum ervan af met een formule-Cleaner.",
        },
      ],
      pipeline: [
        { label: "Flows", href: "/docs/flows", why: "Transacties zijn tabelvelden, dus elke transactie komt terug als eigen getypeerde rij in plaats van een blok tekst." },
        { label: "Cleaners", href: "/docs/cleaners", why: "Leidt volledige datums af uit de afschriftperiode, controleert lopende saldi en categoriseert tegenpartijen." },
        { label: "Buckets", href: "/docs/buckets", why: "Transacties komen binnen als doorzoekbare tabel — filter op tegenpartij, groepeer per maand, zet het saldo in een grafiek." },
        { label: "Menselijke beoordeling", href: "/docs/human-in-the-loop", why: "Stuurt alleen de afschriften die een saldocontrole niet doorstaan naar een mens, in plaats van ze allemaal te beoordelen." },
      ],
      faqs: [
        { q: "Werkt het met elke bank?", a: "Ja. Er is geen sjabloon per bank om te configureren — dezelfde Flow leest afschriften van elke instelling, ook zakelijke rekeningen en historische periodes die een open-banking-API niet zou dekken." },
        { q: "Hoe weet ik dat er geen transacties zijn gemist?", a: "Extraheer het lopende saldo bij elke transactie en gebruik daarna een formule-Cleaner om te controleren dat elke rij aansluit op de vorige. Een afschrift dat de controle niet doorstaat, wordt gemarkeerd in plaats van stilletjes door te gaan." },
        { q: "Kunnen transacties automatisch worden gecategoriseerd?", a: "Ja. Een AI-categorie-Cleaner wijst een categorie toe op basis van de omschrijving, zodat de boekhouding begint met geclassificeerde rijen in plaats van ruwe banktekst." },
      ],
    },
    {
      slug: "supplier-quotes",
      label: "Offertes van leveranciers",
      badge: "Inkoop & sourcing",
      h1: "Offertes van leveranciers vergelijken",
      title: "Offertes van leveranciers vergelijken en prijzen benchmarken",
      description:
        "Extraheer offerteregels uit concurrerende offertes en vergelijk ze automatisch — gelijkwaardige artikelen over leveranciers heen koppelen en per regel de beste prijs aanwijzen.",
      summary: "Concurrerende offertes geëxtraheerd en regel voor regel vergeleken, met per artikel de beste prijs.",
      lede: "Tavnit extraheert de regels uit concurrerende offertes van leveranciers, waarna Matchers gelijkwaardige artikelen over leveranciers heen koppelen en per regel een winnaar op prijs aanwijzen. Je krijgt een vergelijkingstabel in plaats van drie pdf's en een spreadsheet die je met de hand hebt gebouwd.",
      problem: [
        "Offertes vergelijken is het deel van sourcing dat nooit makkelijker wordt. Drie leveranciers sturen drie lay-outs, omschrijven hetzelfde artikel op drie manieren en offreren verschillende verpakkingsgroottes. Iemand bouwt een spreadsheet, typt alles over en hoopt dat hij de juiste rijen heeft gekoppeld.",
        "Het koppelen is de eigenlijke moeilijkheid. 'M8 hex bolt 50mm', 'Bolt, hex, M8x50' en 'HEX BOLT M8 50MM zinc' zijn hetzelfde artikel, en geen enkele opzoeking op exacte overeenkomst zal ze ooit koppelen.",
      ],
      fields: [
        { name: "Identiteit van de leverancier", note: "Het veld dat elke deelnemer in de vergelijking benoemt. Eén offerte, één leverancier." },
        { name: "Artikelomschrijving", note: "De tekst die over leveranciers heen wordt gekoppeld. Extraheer haar letterlijk — te vroeg normaliseren vernietigt het signaal dat matching nodig heeft." },
        { name: "Stukprijs", note: "Het numerieke veld waarop de winnaar wordt bepaald. Niet-numerieke waarden zoals 'op aanvraag' worden uitgesloten en gemeld in plaats van stilletjes genegeerd." },
        { name: "Aantal en eenheid", note: "Gebruikt als context bij het koppelen, zodat een 12-pack niet aan een losse eenheid wordt gekoppeld." },
        { name: "Levertijd", note: "Vaak de doorslag als prijzen dicht bij elkaar liggen, en zelden vastgelegd in handmatige vergelijkingen." },
        { name: "Geldigheidsdatum en betalingsvoorwaarden", note: "Een goedkopere offerte met slechtere voorwaarden is niet altijd goedkoper." },
      ],
      gotchas: [
        {
          title: "Hetzelfde artikel wordt nooit twee keer hetzelfde omschreven",
          body: "Daarom faalt exact matchen en blijft vergelijken bijna overal handwerk. Matchers koppelen rijen semantisch in plaats van op gelijke tekst, met een LLM als scheidsrechter bij twijfelachtige paren, zodat verschillend geformuleerde omschrijvingen van hetzelfde artikel toch op één lijn komen.",
        },
        {
          title: "Verpakkingsgrootte breekt een vergelijking ongemerkt",
          body: "Een offerte voor een doos van 12 tegenover een offerte voor één stuk is geen prijsverschil, maar een eenheidsfout — en het is de fout die de beoordeling overleeft omdat beide getallen redelijk lijken. Met contextvelden neem je aantal en eenheid mee in de match, zodat ongelijke artikelen ongekoppeld blijven in plaats van een verkeerde winnaar op te leveren.",
        },
        {
          title: "Niet elke regel heeft een vergelijkbare prijs",
          body: "Offertes bevatten 'op aanvraag', 'inbegrepen' en lege cellen. In plaats van die rijen stilletjes te laten vallen, sluit de vergelijking ze uit van de winnaarsbepaling en registreert ze een waarschuwing bij de rij, zodat je ziet wat niet is vergeleken in plaats van aan te nemen dat alles is vergeleken.",
        },
      ],
      pipeline: [
        { label: "Flows", href: "/docs/flows", why: "Eén Flow leest de offertelay-out van elke leverancier naar dezelfde veldstructuur — de voorwaarde om ze überhaupt te kunnen vergelijken." },
        { label: "Cleaners", href: "/docs/cleaners", why: "Rekent valuta om, zodat offertes in verschillende valuta op dezelfde basis worden vergeleken." },
        { label: "Buckets", href: "/docs/buckets", why: "Bewaart offertes door de tijd heen, zodat de prijs van vandaag kan worden vergeleken met wat dezelfde leverancier vorig kwartaal offreerde." },
      ],
      faqs: [
        { q: "Hoe koppelt het artikelen die elke leverancier anders omschrijft?", a: "Matching is semantisch in plaats van exact: artikelomschrijvingen worden op betekenis vergeleken, met een LLM als scheidsrechter bij twijfelachtige paren. 'M8 hex bolt 50mm' en 'Bolt, hex, M8x50' worden gekoppeld zonder dat jij een synoniemenlijst hoeft bij te houden." },
        { q: "Kan ik benchmarken tegen één leverancier in plaats van ze allemaal te vergelijken?", a: "Ja. De benchmarkmodus neemt één offerte als uitgangspunt en vergelijkt alle andere daarmee, en dat is de juiste opzet als je een vaste leverancier hebt en de markt aftast." },
        { q: "Wat gebeurt er met regels die niet te vergelijken zijn?", a: "Rijen met niet-numerieke prijzen worden uitgesloten van de winnaarsbepaling en als waarschuwing bij die rij geregistreerd, zodat gaten in de vergelijking zichtbaar zijn in plaats van verborgen." },
      ],
    },
    {
      slug: "compliance-checks",
      label: "Compliancecontroles",
      badge: "Compliance & risico",
      h1: "Compliancecontroles op documenten",
      title: "Geautomatiseerde compliancechecklists voor documenten",
      description:
        "Controleer een documentenset aan de hand van een vertakte checklist — is alles aanwezig, consistent en binnen het beleid — en lever een rapport op dat je aan een auditor kunt geven.",
      summary: "Een documentenset gecontroleerd aan de hand van een vertakte checklist, met een controleerbaar rapport van geslaagd/niet geslaagd.",
      lede: "De Inspector van Tavnit controleert een documentenset aan de hand van een checklist die jij definieert. Hij stuurt elk geüpload bestand naar het vak waar het hoort, extraheert wat de regels nodig hebben en evalueert de checklist deterministisch — zodat hetzelfde bewijs altijd tot hetzelfde oordeel leidt, met een rapport erbij.",
      problem: [
        "Compliancebeoordeling is meestal iemand met een checklist en een map, die nagaat of de juiste documenten aanwezig zijn, of de waarden ertussen kloppen en of er niets is verlopen. Het is traag, het verschilt per beoordelaar, en het bewijs waarom iets is goedgekeurd, is wat die persoon zich herinnert.",
        "Wat meestal misgaat, is niet een gemist document. Het is een waarde die verschilt tussen twee documenten die niemand naast elkaar heeft gelegd.",
      ],
      fields: [
        { name: "Verwachte documentvakken", note: "Wat de set moet bevatten. Een ontbrekend verplicht vak is op zichzelf een bevinding, niet alleen een afwezigheid." },
        { name: "Identiteits- en entiteitsvelden", note: "De waarden die over documenten heen moeten kloppen — namen, registratienummers, adressen." },
        { name: "Datums en vervaldatum", note: "Certificaten en vergunningen verlopen. Of iets nog geldig is, is een regel, geen veld." },
        { name: "Bedragen en aangegeven waarden", note: "Hier zitten de consistentiecontroles tussen documenten: komt de factuurwaarde overeen met de aangifte?" },
        { name: "Handtekeningen en stempels aanwezig", note: "Aanwezigheid in plaats van inhoud, en een van de vaakste handmatige controles." },
        { name: "Uitkomst per checklistpunt", note: "Geslaagd, niet geslaagd of niet van toepassing, per regel, met de waarde die de doorslag gaf." },
      ],
      gotchas: [
        {
          title: "De echte controle zit tussen documenten, niet in één document",
          body: "Elke tool kan een waarde van een certificaat aflezen. De bevinding die ertoe doet, is dat de waarde op het certificaat verschilt van die op de factuur. Omdat een inspectie eerst een hele set verzamelt voordat ze evalueert, kunnen checklistregels over documenten heen vergelijken in plaats van alleen binnen één document.",
        },
        {
          title: "Checklists vertakken, en platte checklists verbergen gaten",
          body: "Of een regel van toepassing is, hangt meestal af van een eerder antwoord — als de goederen aan beperkingen onderhevig zijn, is een vergunning vereist. Een vertakte checklist drukt dat direct uit, zodat een inspectie alleen om de vergunning vraagt als die echt nodig is, en haar niet stilletjes als niet van toepassing markeert.",
        },
        {
          title: "Een auditor vraagt hoe je hebt besloten, niet wat je hebt besloten",
          body: "De evaluatie is deterministisch — dezelfde documenten leveren hetzelfde resultaat op in plaats van elke keer een nieuw oordeel — en de uitkomst wordt in een rapport vastgelegd. Samen met beoordeling kun je laten zien welke waarden zijn geëxtraheerd, welke regels zijn afgegaan en wie het resultaat heeft goedgekeurd.",
        },
      ],
      pipeline: [
        { label: "Collections", href: "/docs/collections", why: "Gemengd bewijs dat op één plek binnenkomt, wordt geclassificeerd en naar de juiste Flow gestuurd voordat er iets wordt gecontroleerd." },
        { label: "Flows", href: "/docs/flows", why: "Elk documenttype heeft een eigen Flow, zodat een regel naar een benoemd veld kan verwijzen in plaats van in vrije tekst te zoeken." },
        { label: "Menselijke beoordeling", href: "/docs/human-in-the-loop", why: "Een beoordelaar tekent de inspectie af, en de trail die alleen kan worden aangevuld legt vast wie welke bevinding heeft geaccepteerd." },
        { label: "Buckets", href: "/docs/buckets", why: "Uitkomsten door de tijd heen worden rapporteerbaar — hoeveel sets niet slaagden, op welke regel, in welke maand." },
      ],
      faqs: [
        { q: "Kan het waarden in verschillende documenten met elkaar vergelijken?", a: "Ja — daar draait het om. Een inspectie verzamelt de hele documentenset voordat ze evalueert, dus regels kunnen controleren of een waarde in het ene document overeenkomt met een waarde in het andere, in plaats van elk document alleen op zichzelf te valideren." },
        { q: "Is het resultaat herhaalbaar?", a: "De evaluatie van de checklist is deterministisch. Dezelfde documenten en dezelfde checklist leveren dezelfde uitkomst op, en dat maakt het resultaat verdedigbaar als iemand vraagt waarom een set is geslaagd." },
        { q: "Wat als een verplicht document ontbreekt?", a: "Een ontbrekende verplichte input is op zichzelf een bevinding. De inspectie meldt die in plaats van met een gat af te ronden, en bestanden die zonder benoemd vak zijn geüpload, worden automatisch toegewezen of gemarkeerd als niet gekoppeld." },
      ],
    },
    {
      slug: "form-filling",
      label: "Formulieren invullen",
      badge: "Operations & handel",
      h1: "Pdf-formulieren automatisch invullen",
      title: "Pdf-formulieren invullen met geëxtraheerde documentgegevens",
      description:
        "Vul officiële pdf-formulieren automatisch in met gegevens die uit meerdere brondocumenten zijn geëxtraheerd, met goedkeuring voordat er iets wordt uitgegeven.",
      summary: "Officiële pdf-formulieren automatisch ingevuld met gegevens die over meerdere brondocumenten verspreid staan.",
      lede: "Tavnit vult invulbare pdf-formulieren in met gegevens die tegelijk uit meerdere brondocumenten zijn geëxtraheerd. Een aangifte kan in één keer worden gevuld vanuit een factuur, een paklijst en een cognossement, waarbij iemand de waarden goedkeurt voordat de ingevulde pdf wordt uitgegeven.",
      problem: [
        "Een verrassend groot deel van het kantoorwerk bestaat uit waarden overnemen uit documenten die je hebt ontvangen in een formulier dat iemand anders verlangt. Douaneaangiftes, verzekeringsformulieren, subsidieaanvragen, opgaven aan toezichthouders — de informatie bestaat al, verspreid over drie of vier pdf's, en iemand verplaatst haar met de hand.",
        "Het is ook waar fouten het minst worden vergeven. Een overtypfout op een formulier dat naar een overheidsinstantie gaat, is een afwijzing of een boete, geen interne correctie.",
      ],
      fields: [
        { name: "Set brondocumenten", note: "Eén vak per bron-Flow. Het formulier wordt ingevuld zodra elk verplicht vak een afgeronde run heeft." },
        { name: "Veldkoppelingen", note: "Welk geëxtraheerd veld welk pdf-veld vult. Eén keer per sjabloon ingesteld, elke keer hergebruikt." },
        { name: "Cleaner-uitvoer als bron", note: "Een gekoppelde waarde kan uit een Cleaner komen in plaats van uit de ruwe extractie, zodat omgerekende of berekende waarden in het formulier terechtkomen." },
        { name: "Handmatig in te vullen velden", note: "Waarden die niemand extraheert — een referentienummer, een ondertekenaar — die bij de goedkeuring worden ingevuld." },
        { name: "Meerdere sjablonen", note: "Eén set brondocumenten kan in één keer meerdere verschillende formulieren vullen." },
      ],
      gotchas: [
        {
          title: "De gegevens staan verspreid over documenten, niet in één",
          body: "Daarom lossen generieke documenttools het invullen van formulieren niet op: ze extraheren uit één bestand tegelijk. Invullen gebruikt één run per bron-Flow en vult het formulier vanuit al die runs samen, zodat gewichten van een paklijst en waarden van een factuur in dezelfde uitvoer terechtkomen.",
        },
        {
          title: "Documenten komen binnen in de volgorde waarin ze binnenkomen",
          body: "Je ontvangt zelden de hele set tegelijk. Een invulling blijft openstaan en verzamelt runs naarmate documenten binnenkomen, en wordt uitgevoerd zodra elk verplicht vak is gevuld. Bestanden die zijn geüpload zonder te zeggen bij welk vak ze horen, worden automatisch geclassificeerd en toegewezen, en wat niet te koppelen is, kun je met de hand toewijzen.",
        },
        {
          title: "Sommige velden staan nooit in de brondocumenten",
          body: "Elk echt formulier heeft waarden die nergens eerder in het proces bestaan — een interne referentie, de naam van de aangever, een handtekeningblok. Dat zijn handmatig in te vullen velden, ingevuld bij de goedkeuringsstap, en dat is ook het natuurlijke moment om te corrigeren wat de extractie fout had voordat de pdf wordt uitgegeven.",
        },
      ],
      pipeline: [
        { label: "Flows", href: "/docs/flows", why: "Eén Flow per type brondocument; het formulier put uit allemaal tegelijk." },
        { label: "Cleaners", href: "/docs/cleaners", why: "Rekent waarden om en berekent ze, zodat wat in het formulier terechtkomt al in de vereiste eenheid of notatie staat." },
        { label: "Menselijke beoordeling", href: "/docs/human-in-the-loop", why: "Goedkeuring vóór uitgifte, met correcties en handmatig ingevulde velden in dezelfde stap." },
        { label: "E-mailintegratie", href: "/docs/email-integration", why: "Brondocumenten die naar een adres worden doorgestuurd, voeden de invulling zonder dat iemand de app opent." },
      ],
      faqs: [
        { q: "Kan één formulier vanuit meerdere documenten worden ingevuld?", a: "Ja. Elk type brondocument krijgt een eigen vak, en het formulier wordt vanuit al die documenten samen ingevuld — wat bij aangiftes en claims de normale situatie is." },
        { q: "En velden die in geen enkel document staan?", a: "Dat zijn handmatig in te vullen velden, ingevuld bij de goedkeuringsstap samen met eventuele correcties, zodat de uiteindelijke pdf is gecontroleerd voordat hij wordt uitgegeven." },
        { q: "Kan één set documenten meer dan één formulier vullen?", a: "Ja. Een configuratie kan meerdere sjablonen bevatten, en elk ervan wordt in één keer gevuld vanuit dezelfde set runs." },
      ],
    },
    {
      slug: "call-analytics",
      label: "Gespreksanalyse",
      badge: "Sales & support",
      h1: "Maak van opgenomen gesprekken data",
      title: "Gespreksanalyse — structuur in opgenomen gesprekken",
      description:
        "Maak van opnames van sales, support en de balie een tabel — wie wat zei, aan welke regels werd voldaan en hoe elk gesprek afliep.",
      summary: "Opnames van sales, support en de balie omgezet in een tabel van beurten, regels en uitkomsten.",
      lede: "Tavnit Signals zet audio-opnames om in een platte tabel. Het scheidt sprekers, splitst een opname op in de afzonderlijke gesprekken, classificeert elk gesprek en evalueert je regels en extractievelden beurt voor beurt — zodat een dag aan gesprekken rijen wordt die je kunt filteren in plaats van uren die je moet beluisteren.",
      problem: [
        "In gesprekken gebeurt het meeste van wat een bedrijf leert, en bijna niets daarvan wordt vastgelegd. De opnames bestaan, maar ze doornemen betekent luisteren, dus in de praktijk luistert een manager er een handvol terug en generaliseert op basis daarvan.",
        "Waar wel kwaliteitscontrole gebeurt, is het iemand met een scorekaart die na elk gesprek een formulier invult — duur, inconsistent tussen beoordelaars en voor een fractie van het volume.",
      ],
      fields: [
        { name: "Type interactie", note: "Eén opname bevat vaak meerdere gesprekken. Elk ervan wordt geclassificeerd — verkoop, support, retour — of als overig gemarkeerd." },
        { name: "Rol van de spreker", note: "Beurten worden toegeschreven aan verwachte deelnemers zoals verkoper of klant; onverwachte stemmen krijgen het label overig." },
        { name: "Regels per beurt", note: "Ja/nee-controles op elke beurt — werd de actie genoemd, werd de disclaimer voorgelezen." },
        { name: "Extractievelden", note: "Gegevens uit elke beurt, zoals genoemde producten of geuite bezwaren." },
        { name: "Inhoudscategorieën", note: "Elke beurt gelabeld — bezwaar, vraag, probleem, oplossing, waardering — zodat patronen te tellen zijn." },
        { name: "Uitkomst van het gesprek", note: "Eén keer beoordeeld over het hele gesprek: is de verkoop gesloten, is het probleem opgelost." },
      ],
      gotchas: [
        {
          title: "Eén opname is niet één gesprek",
          body: "Een dienstopname van een balie of een supportlijn bevat veel afzonderlijke gesprekken. Als je het bestand als één gesprek behandelt, krijg je gemiddelden die niets beschrijven. Opnames worden eerst in afzonderlijke interacties gesplitst, die elk apart worden geclassificeerd en geëvalueerd — de audioversie van een pdf met meerdere documenten opsplitsen.",
        },
        {
          title: "Vragen op beurtniveau en op gespreksniveau zijn verschillende vragen",
          body: "'Werd de korting genoemd' wordt aan elke beurt gevraagd en kan meerdere keren waar zijn. 'Is de verkoop afgerond' wordt één keer aan het hele gesprek gevraagd. Als je ze door elkaar haalt, krijg je een maatstaf die vermeldingen telt terwijl je uitkomsten wilde. Daarom worden ze apart geëvalueerd en herhaalt het antwoord op gespreksniveau zich over de rijen van die interactie.",
        },
        {
          title: "Aan het opnemen van mensen zijn regels verbonden",
          body: "Eisen voor toestemming en bewaring bij gespreksopnames verschillen per rechtsgebied en zijn strenger dan voor documenten. Dat is jouw verplichting, niet iets wat de pipeline beslist — maar met zichtbaarheid en toegangsrechten per Bucket houd je transcripties en uitkomsten beperkt tot de mensen die ze nodig hebben.",
        },
      ],
      pipeline: [
        { label: "Buckets", href: "/docs/buckets", why: "Afgeronde opnames worden automatisch naar een Bucket geëxporteerd, zodat gesprekken zich opstapelen tot iets wat je kunt bevragen en in grafieken kunt zetten." },
        { label: "Webhooks", href: "/docs/webhooks", why: "Stuurt de uitvoertabel naar je eigen systemen zodra een opname klaar is met verwerken." },
        { label: "Gebruikersrollen", href: "/docs/user-roles", why: "Gespreksgegevens zijn gevoelig; rollen en rechten per Bucket houden ze bij de mensen die het programma uitvoeren." },
      ],
      faqs: [
        { q: "Welke audioformaten worden ondersteund?", a: "Opnames in MP3, WAV en FLAC kunnen worden geüpload en verwerkt." },
        { q: "Kan het een opname met veel afzonderlijke gesprekken aan?", a: "Ja. Een opname wordt eerst in haar afzonderlijke interacties gesplitst, en elke interactie wordt apart geclassificeerd en geëvalueerd — zodat een volledige dienst aan een balie resultaten per gesprek oplevert in plaats van één vermengd gemiddelde." },
        { q: "Kan ik elk gesprek scoren in plaats van een steekproef?", a: "Ja. Regels worden geëvalueerd op elke beurt van elke verwerkte opname, en dat is het praktische verschil met handmatige kwaliteitscontrole — volledige dekking in plaats van een steekproef." },
      ],
    },
    {
      slug: "delivery-notes",
      label: "Afleverbonnen",
      badge: "Logistiek & magazijn",
      h1: "Afleverbonnen en afleverbewijzen vastleggen",
      title: "Afleverbonnen extraheren en ontvangst controleren",
      description:
        "Leg vast wat er echt is geleverd op basis van getekende afleverbonnen en afleverbewijzen, inclusief handgeschreven aantekeningen, en controleer dat tegen wat er is besteld.",
      summary: "Vastgelegd wat er echt is geleverd, op basis van getekende bonnen en afleverbewijzen — handschrift inbegrepen.",
      lede: "Tavnit leest afleverbonnen en afleverbewijzen, inclusief de handgeschreven aantekeningen die chauffeurs en ontvangers toevoegen, en geeft geleverde aantallen terug als gestructureerde rijen. Omdat inkooporders in dezelfde vorm worden geëxtraheerd, wordt geleverd tegen besteld controleren een query.",
      problem: [
        "De afleverbon is de enige vastlegging van wat er fysiek is aangekomen, en meestal het document van de slechtste kwaliteit in de keten: gefotografeerd op een terrein, over de print heen getekend, met de hand aangevuld waar aantallen afweken.",
        "Het is ook het document dat het meest telt bij geschillen. Als de factuur twaalf zegt en de bon tien, is de bon het bewijs — mits iemand heeft vastgelegd wat erop stond.",
      ],
      fields: [
        { name: "Afleverbon- en inkoopordernummer", note: "De sleutels die de levering terugkoppelen aan wat er is besteld." },
        { name: "Geleverd aantal per regel", note: "Het getal dat er echt toe doet, en het getal dat het vaakst met de hand wordt aangepast." },
        { name: "Handgeschreven wijzigingen", note: "Doorgestreepte aantallen en aantekeningen in de marge bevatten het echte cijfer. Wie ze negeert, legt het verkeerde vast." },
        { name: "Naam van de ontvanger en handtekening aanwezig", note: "De aanwezigheid van een handtekening is vaak de acceptatietoets." },
        { name: "Datum en tijd van levering", note: "Bepaalt de meting van SLA's en de termijnen bij geschillen." },
        { name: "Aantekeningen over staat of schade", note: "Vrije tekst, meestal handgeschreven, en de basis voor elke claim." },
      ],
      gotchas: [
        {
          title: "Het handschrift is het belangrijke deel",
          body: "Een gedrukte afleverbon zegt wat er had moeten aankomen. De handgeschreven wijziging zegt wat er wel aankwam. De extractie leest zowel handschrift als drukwerk, en dat is het verschil tussen de zending vastleggen zoals gepland en de zending vastleggen zoals geleverd.",
        },
        {
          title: "Gefotografeerd op een terrein, niet gescand op kantoor",
          body: "Afleverbewijzen komen binnen als scheve telefoonfoto's, in slecht licht, soms met een duim in beeld. De extractie kan er grotendeels mee overweg, maar dit is een documenttype waarbij het de moeite loont om resultaten met een lage betrouwbaarheid naar een mens te sturen in plaats van elke vastlegging te vertrouwen.",
        },
        {
          title: "De waarde zit in de vergelijking, niet in het vastleggen",
          body: "Een geleverd aantal op zich zegt weinig. Door afleverbonnen naar dezelfde veldstructuur te extraheren als je inkooporders, wordt three-way matching een query op het inkoopordernummer in plaats van drie documenten die je tegen het licht houdt.",
        },
      ],
      pipeline: [
        { label: "E-mailintegratie", href: "/docs/email-integration", why: "Chauffeurs en vervoerders mailen gefotografeerde afleverbewijzen; door ze door te sturen, wordt elk ervan bij aankomst verwerkt." },
        { label: "Flows", href: "/docs/flows", why: "Geleverde regels zijn tabelvelden, met dezelfde structuur als die voor inkooporders." },
        { label: "Buckets", href: "/docs/buckets", why: "Bewaart leveringen en bestellingen op één plek, zodat afwijkingen boven water komen via een query in plaats van een audit." },
        { label: "Menselijke beoordeling", href: "/docs/human-in-the-loop", why: "Beoordeelt de slechte vastleggingen en de aangepaste aantallen, waar een fout een geschil kost." },
      ],
      faqs: [
        { q: "Kan het handgeschreven wijzigingen lezen?", a: "Ja. Handschrift wordt samen met gedrukte tekst geëxtraheerd, en dat doet er hier toe omdat het handgeschreven aantal meestal het juiste is." },
        { q: "Werkt het met foto's die met een telefoon zijn gemaakt?", a: "Meestal wel. Foto's, scheve hoeken en slecht licht zijn de norm bij afleverbewijzen. Het loont om voorwaardelijke beoordeling in te schakelen, zodat de twijfelachtige vastleggingen bij een mens komen in plaats van stilletjes door te gaan." },
        { q: "Kunnen leveringen worden gecontroleerd tegen bestellingen?", a: "Extraheer beide naar dezelfde veldstructuur en de vergelijking is een query op het inkoopordernummer in je Bucket, in plaats van een handmatige controle van document tegen document." },
      ],
    },
    {
      slug: "insurance-claims",
      label: "Schadeclaims",
      badge: "Verzekeringen & claims",
      h1: "Documenten bij schadeclaims verwerken",
      title: "Documenten van schadeclaims extraheren",
      description:
        "Verwerk claimformulieren en het onderbouwende bewijs samen — offertes, facturen, rapporten en foto's — tot één gestructureerd record dat je kunt beoordelen.",
      summary: "Claimformulieren en onderbouwend bewijs samen verwerkt tot één gestructureerd record dat je kunt beoordelen.",
      lede: "Tavnit verwerkt een claim en het bewijs dat haar onderbouwt als één set: het claimformulier, reparatieoffertes, facturen en rapporten. Elk documenttype wordt naar een eigen Flow gestuurd, en de resultaten komen samen in één record dat een behandelaar kan beoordelen in plaats van een map die hij moet doorlezen.",
      problem: [
        "Een claim is nooit één document. Het is een formulier plus alles wat de claimant heeft gestuurd — offertes, bonnetjes, een politierapport, foto's — en dat komt over meerdere dagen binnen, in willekeurige volgorde, per e-mail.",
        "Behandelaars besteden het grootste deel van hun tijd aan verzamelen in plaats van beoordelen: bijlagen openen, de bedragen zoeken, nagaan of het geclaimde bedrag overeenkomt met het bedrag op de offerte.",
      ],
      fields: [
        { name: "Claim- en polisnummer", note: "De sleutels waarop alles in de set wordt gekoppeld, en vaak het enige wat in alle documenten gelijk is." },
        { name: "Gegevens van claimant en incident", note: "Datum, locatie en omschrijving van de schade, meestal verdeeld over het formulier en een verhaal." },
        { name: "Geclaimd bedrag", note: "Wat het formulier zegt. Het loont om dat apart te extraheren van wat het bewijs onderbouwt." },
        { name: "Onderbouwende bedragen", note: "Totalen van offertes en facturen — de bedragen waarop het geclaimde bedrag zou moeten aansluiten." },
        { name: "Gegevens van derden", note: "Andere partijen, verzekeraars en referentienummers, nodig voor verhaal." },
        { name: "Documenttype per bijlage", note: "Weten wat elk bestand is, bepaalt welke Flow het leest." },
      ],
      gotchas: [
        {
          title: "Bewijs komt laat en in willekeurige volgorde binnen",
          body: "De beoordeling kan pas beginnen als de set compleet is, en de set wordt over meerdere dagen compleet. Collections classificeren elke bijlage zodra ze binnenkomt, zodat het record stap voor stap wordt opgebouwd in plaats van dat iemand de hele map opnieuw leest elke keer dat er iets nieuws binnenkomt.",
        },
        {
          title: "Het geclaimde bedrag en het onderbouwde bedrag zijn verschillende velden",
          body: "Wie één bedrag per claim extraheert, verliest de controle die ertoe doet. Leg vast wat er is geclaimd en wat de offertes en facturen werkelijk optellen, en het verschil wordt een waarde waarop je kunt filteren in plaats van iets wat een behandelaar moet opmerken.",
        },
        {
          title: "Claimdossiers zijn persoonlijk, en vaak medisch",
          body: "Claims bevatten regelmatig gezondheidsinformatie, identiteitsbewijzen en financiële details. Privé-Buckets met toegangsrechten per gebruiker houden een claim zichtbaar voor de behandelaars die eraan werken in plaats van voor iedereen in de organisatie.",
        },
      ],
      pipeline: [
        { label: "Collections", href: "/docs/collections", why: "Classificeert elke bijlage — formulier, offerte, factuur, rapport — en stuurt haar naar de Flow die ervoor is gebouwd." },
        { label: "E-mailintegratie", href: "/docs/email-integration", why: "Claims komen per e-mail binnen; door ze door te sturen naar het adres van een Collection, wordt elke bijlage bij aankomst verwerkt." },
        { label: "Cleaners", href: "/docs/cleaners", why: "Normaliseert datums en valuta, en berekent het verschil tussen geclaimde en onderbouwde bedragen." },
        { label: "Menselijke beoordeling", href: "/docs/human-in-the-loop", why: "Behandelaars keuren goed of af, met een blijvende vastlegging van de beslissing en wie die nam." },
      ],
      faqs: [
        { q: "Kan het een claim met veel verschillende bijlagen aan?", a: "Ja. Een Collection classificeert elke bijlage en stuurt haar naar de juiste Flow, zodat een claimformulier, een offerte en een factuur elk worden gelezen door de Flow die voor dat documenttype is gebouwd." },
        { q: "Kan het claims markeren waarbij de cijfers niet kloppen?", a: "Extraheer het geclaimde bedrag en de onderbouwende totalen als aparte velden en gebruik daarna een Cleaner om het verschil te berekenen. Claims die de controle niet doorstaan, kunnen automatisch naar beoordeling worden gestuurd." },
        { q: "Hoe worden gevoelige claimgegevens beschermd?", a: "Buckets kunnen privé zijn in plaats van zichtbaar voor de hele organisatie, met Viewer- of Editor-rechten per gebruiker, zodat een claim alleen zichtbaar is voor de behandelaars die eraan werken." },
      ],
    },
    {
      slug: "identity-verification",
      label: "Identiteit & onboarding",
      badge: "KYC & onboarding",
      h1: "Identiteits- en onboardingdocumenten vastleggen",
      title: "KYC-documenten extraheren voor klantonboarding",
      description:
        "Leg identiteitsbewijzen en adresbewijzen vast tijdens de onboarding, controleer of de gegevens erin overeenkomen en bewaar een controleerbare vastlegging van de beslissing.",
      summary: "Identiteits- en adresdocumenten vastgelegd, op consistentie gecontroleerd en controleerbaar vastgelegd.",
      lede: "Tavnit leest de documenten die tijdens de onboarding worden verzameld — identiteitsbewijzen, adresbewijzen, oprichtingsstukken — en geeft namen, nummers, datums en adressen terug als gestructureerde velden. Omdat de hele set samen wordt verwerkt, wordt de vraag of de gegevens over documenten heen overeenkomen een controle in plaats van een aanname.",
      problem: [
        "Een klant onboarden betekent documenten verzamelen, ze lezen en bevestigen dat ze dezelfde persoon of entiteit beschrijven. Het lezen is saai; het bevestigen is het deel waar het risico zit, en dat gebeurt op het oog.",
        "Volume maakt het erger. Een team dat gestaag klanten onboardt, krijgt uiteindelijk verschillende normen per beoordelaar en geen betrouwbare vastlegging van wat wanneer is gecontroleerd.",
      ],
      fields: [
        { name: "Volledige naam zoals afgedrukt", note: "Letterlijk extraheren. Volgorde en transliteratie verschillen tussen documenten, en dat verschil is precies de controle." },
        { name: "Geboortedatum", note: "Het allernuttigste veld voor consistentie tussen documenten." },
        { name: "Documentnummer en -type", note: "Paspoort, identiteitskaart, rijbewijs — elk met eigen nummeringsconventies." },
        { name: "Datum van afgifte en vervaldatum", note: "Vervaldatum is een regel, geen veld: een verlopen document is een bevinding." },
        { name: "Adres", note: "Uit adresbewijzen, die moeten overeenkomen met wat de klant heeft opgegeven." },
        { name: "Registratiegegevens van de entiteit", note: "Bij zakelijke onboarding — inschrijvingsnummer, statutaire zetel, bestuurders." },
      ],
      gotchas: [
        {
          title: "Namen komen niet overeen, en dat is normaal",
          body: "Dezelfde persoon staat als 'Jose Garcia Lopez', 'J. García' en 'GARCIA LOPEZ, JOSE' op drie documenten. Extraheer namen letterlijk in plaats van ze tijdens de extractie te normaliseren, en vergelijk daarna bewust — te vroeg normaliseren gooit precies het verschil weg dat je moet beoordelen.",
        },
        {
          title: "Gefotografeerde identiteitsbewijzen zijn de norm, en de kwaliteit wisselt",
          body: "Klanten fotograferen documenten met hun telefoon, en net zo vaak wel als niet zit er schittering over de machineleesbare zone. Beoordeling bij onboarding staat in verhouding tot wat een fout kost, en de audittrail legt dan vast wie welk document heeft geaccepteerd.",
        },
        {
          title: "Dit zijn de meest gereguleerde gegevens die je verwerkt",
          body: "Voor identiteitsbewijzen gelden bewaartermijnen, verwijderingsrechten en toegangsverplichtingen die gewone zakelijke documenten niet hebben. Privé-Buckets en rechten per gebruiker houden onboardingdossiers bij het complianceteam, en de trail die alleen kan worden aangevuld toont aan wie wat heeft ingezien.",
        },
      ],
      pipeline: [
        { label: "Collections", href: "/docs/collections", why: "Classificeert wat de klant ook stuurt — paspoort, energierekening, oprichtingsakte — en stuurt elk document naar de juiste Flow." },
        { label: "Flows", href: "/docs/flows", why: "Eén Flow per documenttype, zodat een controle naar een benoemd veld kan verwijzen in plaats van in tekst te zoeken." },
        { label: "Menselijke beoordeling", href: "/docs/human-in-the-loop", why: "Aftekenen van elke onboarding, met een blijvende vastlegging van wie welk document heeft goedgekeurd." },
        { label: "Gebruikersrollen", href: "/docs/user-roles", why: "Beperkt identiteitsbewijzen tot het team dat ze nodig heeft in plaats van de hele organisatie." },
      ],
      faqs: [
        { q: "Controleert het of een document echt is?", a: "Nee. Tavnit extraheert en structureert wat de documenten zeggen, en laat je de consistentie binnen een set controleren. Echtheidscontrole bij de uitgevende instanties is een apart specialisme, en dit vervangt dat niet." },
        { q: "Kan het controleren of gegevens over documenten heen overeenkomen?", a: "Ja. Verwerk de set samen en vergelijk de geëxtraheerde velden — naam, geboortedatum, adres — zodat een afwijking als waarde boven water komt in plaats van iets wat een beoordelaar moet opmerken." },
        { q: "Hoe blijven identiteitsgegevens afgeschermd?", a: "Privé-Buckets met toegangsrechten per gebruiker beperken de zichtbaarheid tot het complianceteam, en de audittrail die alleen kan worden aangevuld legt elke weergave, wijziging en goedkeuring vast." },
      ],
    },
    {
      slug: "lease-agreements",
      label: "Huurcontracten & vastgoed",
      badge: "Vastgoed & facilitair",
      h1: "Gegevens uit huurovereenkomsten extraheren",
      title: "Huurcontracten samenvatten — huur, looptijd en opzegdata",
      description:
        "Vat huurovereenkomsten samen in gestructureerde records — huur, herzieningsdata, breekclausules, servicekosten en onderhoudsverplichtingen — over een hele portefeuille.",
      summary: "Huurovereenkomsten samengevat in gestructureerde records: huur, herzieningen, breekdata en verplichtingen.",
      lede: "Tavnit vat huurovereenkomsten samen in gestructureerde records: partijen, het gehuurde, looptijd, huur en herzieningsdata, breekclausules, de grondslag voor servicekosten en onderhoudsverplichtingen. Een portefeuille die als pdf's wordt bewaard, wordt een tabel waarin de volgende huurherziening een filter is in plaats van een leesoefening.",
      problem: [
        "Huurcontracten samenvatten is een gevestigde handmatige klus, juist omdat de antwoorden in juridische formuleringen verstopt zitten in plaats van in velden te staan. Bedrijven betalen er keer op keer voor, en de spreadsheet die eruit komt, is verouderd zodra een huurovereenkomst wordt gewijzigd.",
        "Wat het kost om het niet te hebben, is concreet en duur: een gemiste breekdatum, een niet uitgeoefende optie, een huurherziening die zonder bezwaar voorbijging.",
      ],
      fields: [
        { name: "Verhuurder, huurder en borg", note: "Juridische entiteiten in plaats van handelsnamen, en vaak gewijzigd door latere akten." },
        { name: "Het gehuurde", note: "Beschreven in lopende tekst en met een verwijzing naar een tekening, zelden als een net adres." },
        { name: "Looptijd, ingangsdatum en einddatum", note: "De ruggengraat van elke andere datum in het document." },
        { name: "Huur en herzieningsdata", note: "De grondslag van de herziening — markthuur, geïndexeerd, gestaffeld — doet er net zoveel toe als het bedrag." },
        { name: "Breekclausules en voorwaarden", note: "Een breekrecht met onvervulde voorwaarden is geen breekrecht. Extraheer allebei." },
        { name: "Servicekosten en onderhoudsverplichtingen", note: "Waar de aansprakelijkheid echt ligt, en meestal de langste clausules in het document." },
      ],
      gotchas: [
        {
          title: "Datums worden gedefinieerd, niet vermeld",
          body: "Een huurovereenkomst drukt zelden de breekdatum af. Er staat dat de huurder mag opzeggen per de vijfde verjaardag van de ingangsdatum, met een opzegtermijn van zes maanden. Extraheer de ingangsdatum, de verjaardag en de opzegtermijn als velden en laat een formule-Cleaner de werkelijke uiterste datum berekenen — de datum die je eigenlijk nodig had.",
        },
        {
          title: "Het geldende document is vaak niet de huurovereenkomst",
          body: "Wijzigingsakten, toestemmingen voor verbouwing en side letters veranderen de stand van zaken, en de oorspronkelijke huurovereenkomst leest nog steeds alsof ze niet bestaan. Verwerk elk document als een eigen run met de datum vastgelegd, zodat de actuele stand wordt afgeleid uit de volledige set in plaats van uit de pdf die iemand toevallig opende.",
        },
        {
          title: "Een voorwaardelijk recht gelezen als onvoorwaardelijk is een risico",
          body: "Breekclausules zijn routinematig afhankelijk van een leeg opgeleverd pand of een huur die tot op heden is betaald. Wie het recht vastlegt zonder de voorwaarden, krijgt een portefeuilletabel die vol overtuiging fout is, en dat is erger dan geen tabel. Extraheer voorwaarden als eigen veld en beoordeel ze.",
        },
      ],
      pipeline: [
        { label: "Flows", href: "/docs/flows", why: "Extractiehints zijn hier onmisbaar — het model moet weten wat een breekvoorwaarde is, niet alleen waar het moet zoeken." },
        { label: "Cleaners", href: "/docs/cleaners", why: "Berekent uiterste data voor herzieningen en opzeggingen uit ingangsdata en opzegtermijnen." },
        { label: "Buckets", href: "/docs/buckets", why: "De portefeuille als tabel: welke huurovereenkomsten volgend jaar kunnen worden opgezegd, gesorteerd op uiterste opzegdatum." },
        { label: "Menselijke beoordeling", href: "/docs/human-in-the-loop", why: "Beoordeel elke samenvatting. De kosten van een foute datum worden hier in jaren huur gemeten." },
      ],
      faqs: [
        { q: "Kan het breek- en herzieningsdata berekenen?", a: "Ja. Extraheer de ingangsdatum, de verjaardag waaraan het recht is gekoppeld en de opzegtermijn, en een formule-Cleaner leidt de werkelijke uiterste datum af — wat je meestal wilde in plaats van de clausule zelf." },
        { q: "En wijzigingsakten?", a: "Verwerk elk document als een eigen run met de datum als veld. De actuele stand komt dan uit een query op de hele set in plaats van uit de aanname dat het nieuwste bestand doorslaggevend is." },
        { q: "Legt het de voorwaarden van een breekclausule vast?", a: "Dat zou het moeten doen, en deze pagina stelt dat het moet — een breekrecht dat zonder voorwaarden wordt vastgelegd, levert een portefeuilletabel op die zeker lijkt en dat niet is. Extraheer voorwaarden als eigen veld en beoordeel ze." },
      ],
    },
    {
      slug: "timesheets",
      label: "Urenstaten",
      badge: "Salarisadministratie & personeel",
      h1: "Urenstaten en dienstregistraties vastleggen",
      title: "Gegevens uit urenstaten extraheren voor de salarisadministratie",
      description:
        "Leg uren vast uit ingediende urenstaten — gedrukt, handgeschreven of gefotografeerd — en controleer ze aan de hand van regels voordat ze bij de salarisadministratie komen.",
      summary: "Uren vastgelegd uit gedrukte, handgeschreven en gefotografeerde urenstaten, gecontroleerd vóór de salarisverwerking.",
      lede: "Tavnit leest ingediende urenstaten, ook handgeschreven en gefotografeerde, en geeft medewerker, datum, uren en kostenplaats terug als rijen. Regels kunnen de totalen controleren voordat er iets bij de salarisadministratie komt, zodat fouten die anders salariscorrecties worden, worden gevangen terwijl ze nog goedkoop zijn.",
      problem: [
        "De salarisverwerking heeft een deadline, en urenstaten komen binnen in de vorm die elke locatie of elk uitzendbureau gebruikt — een geprinte spreadsheet, een papieren formulier dat aan het eind van een dienst wordt gefotografeerd, een pdf uit het eigen systeem van een onderaannemer.",
        "Iemand typt ze onder tijdsdruk over, en dat is precies de situatie waarin overtypfouten ontstaan. Een fout cijfer dat na de verwerking wordt ontdekt, betekent een correctie, een aanpassing en een vervelend gesprek.",
      ],
      fields: [
        { name: "Naam of nummer van de medewerker", note: "Namen op urenstaten komen zelden exact overeen met de salarisgegevens — een opzoek-Cleaner koppelt ze." },
        { name: "Datum of weekeinde", note: "Bepaalt in welke loonperiode de uren vallen, en wordt rond een periodegrens makkelijk verkeerd gelezen." },
        { name: "Begin-, eind- en pauzetijden", note: "Door de onderdelen te extraheren in plaats van alleen het totaal, kan het totaal worden gecontroleerd." },
        { name: "Totaal aantal uren", note: "Het loont om dat zoals ingediend te extraheren en te vergelijken met het berekende totaal." },
        { name: "Overuren en toeslaguren", note: "Andere tarieven, dus een verkeerde indeling is een salarisfout, geen afrondingsverschil." },
        { name: "Kostenplaats of project", note: "Bepaalt de projectkostenberekening, en is het veld dat het vaakst leeg blijft." },
      ],
      gotchas: [
        {
          title: "Het opgegeven totaal en het echte totaal verschillen vaker dan je zou verwachten",
          body: "Mensen tellen hun eigen uren op, en dat gaat mis. Door naast het opgegeven totaal ook begin-, eind- en pauzetijden te extraheren, kan een formule-Cleaner de uren berekenen en vergelijken — de verschillen die boven water komen, zijn meestal echte rekenfouten en geen extractiefouten.",
        },
        {
          title: "Handgeschreven urenstaten zijn het lastige geval, en ze komen vaak voor",
          body: "Werk op locatie en in ploegendienst draait nog steeds op papier dat aan het eind van de dag wordt gefotografeerd. Handschrift wordt geëxtraheerd, maar de betrouwbaarheid wisselt, en dit is een toepassing waarbij onzekere vastleggingen naar beoordeling sturen beter is dan het probleem op een loonstrook ontdekken.",
        },
        {
          title: "Namen op urenstaten zijn geen namen in de salarisadministratie",
          body: "'Dave S.', 'David Smith' en een personeelsnummer verwijzen allemaal naar dezelfde persoon, en de salarisadministratie heeft het nummer nodig. Een opzoek-Cleaner koppelt ingediende namen tijdens de verwerking aan je medewerkerslijst, zodat niet-gekoppelde regels worden gemarkeerd in plaats van gegokt.",
        },
      ],
      pipeline: [
        { label: "E-mailintegratie", href: "/docs/email-integration", why: "Locaties en uitzendbureaus mailen aan het eind van de week hun staten; door ze door te sturen, worden ze bij aankomst verwerkt." },
        { label: "Splitters", href: "/docs/splitters", why: "Eén pdf met de staten van een hele ploeg wordt één run per medewerker." },
        { label: "Cleaners", href: "/docs/cleaners", why: "Berekent uren uit tijden, koppelt namen aan salarisgegevens en markeert totalen die niet aansluiten." },
        { label: "Menselijke beoordeling", href: "/docs/human-in-the-loop", why: "Alleen de staten die een controle niet doorstaan, komen bij een mens, en dat maakt dit haalbaar met een salarisdeadline." },
      ],
      faqs: [
        { q: "Kan het handgeschreven urenstaten lezen?", a: "Ja. Handschrift wordt samen met gedrukte tekst geëxtraheerd, al hangt de betrouwbaarheid af van de leesbaarheid — en daarom loont het om onzekere staten hier naar beoordeling te sturen." },
        { q: "Kan het controleren of de uren kloppen?", a: "Ja. Extraheer begin-, eind- en pauzetijden naast het opgegeven totaal, en een formule-Cleaner berekent de uren en markeert elke staat waarbij de twee verschillen." },
        { q: "Wat als namen niet overeenkomen met ons salarissysteem?", a: "Een opzoek-Cleaner koppelt ingediende namen tijdens de verwerking aan je medewerkerslijst. Regels die hij niet kan koppelen, worden gemarkeerd in plaats van gegokt, zodat er niets zonder toewijzing bij de salarisadministratie komt." },
      ],
    },
    {
      slug: "utility-bills",
      label: "Energierekeningen",
      badge: "Facilitair & ESG",
      h1: "Gegevens uit energierekeningen en meterstanden extraheren",
      title: "Energierekeningen extraheren voor kosten en emissies",
      description:
        "Extraheer verbruik, tarieven en meterstanden uit energierekeningen van een vastgoedportefeuille, voor kostenbeheersing en emissierapportage.",
      summary: "Verbruik, tarieven en meterstanden geëxtraheerd over een portefeuille, voor kosten- en emissierapportage.",
      lede: "Tavnit leest rekeningen voor elektriciteit, gas, water en afval en geeft verbruik, tarief, meterstanden en kosten per locatie terug. De rekeningen van een portefeuille worden een tabel waarin je trends kunt volgen — en dat is wat zowel kostenbeheersing als emissierapportage eigenlijk vragen.",
      problem: [
        "Wie meer dan een handvol locaties beheert, ontvangt rekeningen van meerdere leveranciers in meerdere formaten, en het enige wat er betrouwbaar mee gebeurt, is betalen. De verbruiksgegevens — het deel met analytische waarde — blijven in de pdf.",
        "Emissierapportage heeft dit urgent gemaakt. Rapportage over scope 1 en 2 vraagt om verbruik in kWh per locatie en periode, en bij de meeste organisaties bestaan die gegevens alleen als een stapel rekeningen die niemand heeft overgetypt.",
      ],
      fields: [
        { name: "Leveringsadres en meternummer (MPAN/MPRN)", note: "De identificatie die een rekening aan een locatie koppelt. Adressen alleen zijn onbetrouwbaar tussen leveranciers." },
        { name: "Factuurperiode", note: "Rekeningen vallen zelden samen met kalendermaanden, en dat doet ertoe als je per kwartaal optelt." },
        { name: "Verbruik met eenheid", note: "kWh, m³ of liters. De eenheid is net zo belangrijk als het getal en wordt niet altijd op dezelfde manier vermeld." },
        { name: "Meterstanden en schattingsindicator", note: "Een geschatte stand is geen meting, en hem als meting behandelen verstoort een trend." },
        { name: "Tarief en vastrecht", note: "Wat een prijswijziging onderscheidt van een verbruikswijziging." },
        { name: "Totale kosten en belasting", note: "Voor kostenafstemming met wat er werkelijk is betaald." },
      ],
      gotchas: [
        {
          title: "Geschatte standen zijn geen data",
          body: "Leveranciers schatten als ze een meter niet kunnen aflezen en corrigeren bij de volgende werkelijke stand. Een trend die geen onderscheid maakt tussen de twee, laat een piek zien die nooit plaatsvond, gevolgd door een daling die nooit plaatsvond. Extraheer de schattingsindicator als eigen veld, zodat schattingen kunnen worden uitgesloten of apart behandeld.",
        },
        {
          title: "Factuurperiodes sluiten nergens op aan",
          body: "De ene leverancier factureert maandelijks, een andere elke 28 dagen, een derde per kwartaal, en geen van alle sluit aan op jouw rapportageperiodes. Extraheer begin en einde van de periode in plaats van één datum, zodat het verbruik kan worden verdeeld over de periodes waarover je echt rapporteert.",
        },
        {
          title: "Eenheden verschillen, en gas is de valkuil",
          body: "Gas wordt vaak in kubieke meters gefactureerd en in kWh gerapporteerd, en de omrekening hangt af van een calorische waarde die op de rekening staat. Extraheer de eenheid en de omrekenfactor in plaats van ze aan te nemen, en laat een eenheden-Cleaner de omrekening doen — een standaardfactor aannemen is waar de meeste emissiecijfers ongemerkt de mist in gaan.",
        },
      ],
      pipeline: [
        { label: "Collections", href: "/docs/collections", why: "Rekeningen van verschillende nutsvoorzieningen en leveranciers komen samen binnen en worden automatisch naar de juiste Flow gestuurd." },
        { label: "Cleaners", href: "/docs/cleaners", why: "Rekent eenheden om naar één rapportagebasis en berekent het verbruik verdeeld over periodes." },
        { label: "Buckets", href: "/docs/buckets", why: "Verbruik per locatie en periode als tabel voor grafieken — het formaat dat zowel finance als ESG-rapportage nodig heeft." },
        { label: "E-mailintegratie", href: "/docs/email-integration", why: "Leveranciers mailen rekeningen; door ze door te sturen, bouw je de dataset op zonder een invoerproject." },
      ],
      faqs: [
        { q: "Kan het rekeningen van verschillende nutsvoorzieningen en leveranciers aan?", a: "Ja. Een Collection classificeert elke rekening en stuurt haar naar de juiste Flow, zodat rekeningen voor elektriciteit, gas en water elk worden gelezen door de Flow die ervoor is gebouwd, wat de lay-out van de leverancier ook is." },
        { q: "Zijn de gegevens bruikbaar voor emissierapportage?", a: "Het levert verbruik per locatie en periode op, met de eenheden vastgelegd, en dat is de input die zulke rapportage nodig heeft. Extraheer de schattingsindicator en de omrekenfactor in plaats van een standaardfactor aan te nemen — die aanname is waar de meeste emissiecijfers misgaan." },
        { q: "Kan het een prijsstijging onderscheiden van een verbruiksstijging?", a: "Extraheer tarief en vastrecht naast het verbruik, en die worden aparte kolommen waarvan je de trends afzonderlijk kunt volgen." },
      ],
    },
  ],
};

export default nl;
