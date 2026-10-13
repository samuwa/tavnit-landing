import type { GuidesContent } from "@/content/types";

/** Guides: the /guides hub copy and every guide — Nederlands (nl). */
const nl: GuidesContent = {
  hub: {
    title: "Gidsen — PO-matching, factuurregels, HS-codes en documentautomatisering",
    description:
      "Gidsen in begrijpelijke taal over de problemen achter documentautomatisering: facturen matchen met inkooporders, factuurregels extraheren, HS-codes classificeren en meer.",
    ogTitle: "Tavnit-gidsen",
    ogDescription:
      "Gidsen in begrijpelijke taal over PO-matching, het extraheren van factuurregels, HS-codeclassificatie en de rest van documentverwerking.",
    breadcrumbHome: "Home",
    name: "Gidsen",
    h1: "Gidsen over documentautomatisering",
    intro:
      "De problemen achter het product, op hun eigen merites uitgelegd: wat PO-matching controleert, waarom factuurtabellen lastig te extraheren zijn, hoe tariefindeling echt werkt. Leveranciersneutraal tot de laatste sectie, waar we vertellen wat Tavnit automatiseert.",
    minRead: "{m} min lezen",
    read: "Lezen",
  },
  items: [
    {
      slug: "how-to-match-invoices-to-purchase-orders",
      title: "Facturen matchen met inkooporders (two-way en three-way)",
      h1: "Zo match je facturen met inkooporders",
      description:
        "Wat PO-matching is, hoe two-way en three-way matching verschillen, waar handmatig matchen misgaat en hoe je het automatiseert zonder je ERP te vervangen.",
      lede: "Bij het matchen van facturen met inkooporders (PO's) controleer je of een leveranciersfactuur overeenkomt met de inkooporder waarop ze factureert: dezelfde leverancier, dezelfde artikelen, dezelfde aantallen, dezelfde prijzen. Two-way matching vergelijkt factuur en inkooporder; three-way matching voegt de ontvangstbon toe. Het is de controle die voorkomt dat een bedrijf betaalt voor iets wat het niet heeft besteld of niet heeft ontvangen.",
      published: "2026-09-08",
      updated: "2026-09-08",
      readingMinutes: 7,
      sections: [
        {
          heading: "Wat PO-matching eigenlijk controleert",
          paragraphs: [
            "Een inkooporder is een belofte om te kopen; een factuur is een verzoek om betaald te worden. Door ze te matchen beantwoord je één vraag — vraagt deze factuur precies om wat we hebben afgesproken? — langs vier dimensies: de leverancier, de artikelen, de aantallen en de stukprijzen. Een vijfde, de totalen, volgt uit de andere vier en is op zichzelf het minst nuttige om te controleren.",
            "Totalen zijn een zwakke controle omdat ze vaker toevallig overeenkomen dan je zou verwachten. Een factuur die tien stuks à $12 rekent in plaats van twaalf stuks à $10, heeft het juiste totaal en verder alles fout. Matching op kopniveau vangt de factuur zonder inkooporder; alleen matching op regelniveau vangt de factuur met de verkeerde regels.",
          ],
        },
        {
          heading: "Two-way versus three-way matching",
          paragraphs: [
            "Two-way matching vergelijkt de factuur met de inkooporder. Het bevestigt dat je hebt afgesproken dit te kopen, tegen deze prijs. Het bevestigt niet dat je het hebt ontvangen. Daarom wordt het meestal gebruikt voor diensten, abonnementen en goederen van lage waarde, waar een ontvangststap meer kost dan het risico.",
            "Three-way matching voegt de ontvangstbon toe — de afleverbon, pakbon of magazijnontvangst die vastlegt wat er fysiek is aangekomen. Nu moet de factuur kloppen met zowel wat er is besteld als wat er is ontvangen. Een leverancier die er acht levert en er tien factureert, wordt hier betrapt en nergens anders. Het is de standaard voor fysieke goederen, en de meeste auditkaders verwachten het boven een materialiteitsdrempel.",
            "Sommige teams spreken van four-way matching, met een inspectie- of kwaliteitsacceptatierapport erbij. Het is hetzelfde idee met één document meer, en dezelfde werkwijze geldt.",
          ],
        },
        {
          heading: "Waarom handmatig matchen misgaat",
          paragraphs: [
            "De inkooporder is gestructureerd — die komt uit je eigen systeem. De factuur niet. Die kwam als pdf uit het systeem van de leverancier, in de lay-out van de leverancier, met de artikelnummers van de leverancier en diens omschrijving van elk artikel. Voordat er iets vergeleken kan worden, moet iemand die pdf lezen en vertalen naar dezelfde vorm als de inkooporder. In de meeste crediteurenteams is die vertaling iemand met twee vensters open.",
            "Daar sluipen de fouten erin. De vergelijking zelf is niet moeilijk; een spreadsheet kan het. Het overnemen is moeilijk, omdat het repetitief is, de lay-outs per leverancier verschillen en een fout aantal er precies zo uitziet als een goed aantal. Het matchingprobleem dat de meeste bedrijven ervaren, is geen fout in de matchinglogica. Het is een fout in de gegevensinvoer die eraan voorafgaat.",
          ],
          bullets: [
            "Artikelnummers van leveranciers wijken af van interne SKU's, dus regels koppelen vraagt om een opzoektabel die niemand bijhoudt.",
            "Omschrijvingen zijn anders geformuleerd — \"Blue widget 10pk\" tegenover \"WIDGET-BLU x10\" — dus matchen op exacte tekst faalt bij artikelen die hetzelfde zijn.",
            "Eenheid en verpakkingsgrootte veranderen de berekening: 1 doos van 12 tegenover 12 stuks.",
            "Deelleveringen en gesplitste facturen betekenen dat één inkooporder bij meerdere facturen hoort en de match veel-op-één is.",
            "Vracht, toeslagen en belastingen staan op de factuur maar niet op de inkooporder, en moeten worden aangemerkt als aanvaardbare verschillen in plaats van als afwijkingen.",
          ],
        },
        {
          heading: "Toleranties: bepalen wat telt als afwijking",
          paragraphs: [
            "Geen enkele match in de praktijk is exact. Prijzen worden geoffreerd voordat een valuta beweegt; leveranciers ronden af; vracht wordt geschat. Een matchingproces dat elke factuur met een verschil van één cent tegenhoudt, staat binnen een maand uit. De oplossing is een tolerantiebeleid: een vooraf afgesproken regel over hoeveel afwijking per dimensie aanvaardbaar is voordat de factuur wordt vastgehouden.",
            "Gangbaar beleid staat een kleine procentuele of absolute afwijking op de stukprijs toe, nul afwijking op aantallen bij fysieke goederen en een aparte marge voor vracht- en toeslagregels. Waar het om gaat, is dat de regel op papier staat en door het systeem wordt toegepast, niet bepaald door wie er die dag matcht. Facturen binnen de tolerantie gaan door; die erbuiten worden tegengehouden en gaan naar een mens.",
          ],
        },
        {
          heading: "Zo automatiseer je het, stap voor stap",
          paragraphs: [
            "Automatisering begint niet met matchingsoftware. Het begint ermee dat je beide documenten in dezelfde gestructureerde vorm krijgt, zodat de vergelijking een query is in plaats van leeswerk.",
          ],
          bullets: [
            "Definieer één veldschema voor orderdocumenten: inkoopordernummer, leverancier, SKU per regel, omschrijving, aantal, stukprijs, regelbedrag, totaal. Gebruik het voor inkooporders, facturen en afleverbonnen.",
            "Extraheer elke binnenkomende factuur naar dat schema. Dit is de stap die de meeste teams overslaan, en de stap die alles daarna mogelijk maakt.",
            "Normaliseer artikelnummers van leveranciers naar je SKU's met een opzoeking in je artikelbestand; waar geen koppeling bestaat, koppel je regels op de betekenis van de omschrijving in plaats van op exacte tekst.",
            "Controleer de factuur eerst op zichzelf: is stukprijs maal aantal gelijk aan het regelbedrag, en tellen de regels op tot het totaal? Rekenfouten zijn het goedkoopst om te vangen en het pijnlijkst om te betalen.",
            "Match de kopvelden op het inkoopordernummer en match daarna de regels binnen de gevonden inkooporder. Pas je tolerantiebeleid per dimensie toe.",
            "Stuur alleen de uitzonderingen naar een beoordelaar, met de factuur, de inkooporder en het concrete verschil voor zich. Boek de matches direct in het ERP.",
            "Houd een audittrail bij van wie wat wanneer heeft goedgekeurd. Auditors vragen erom, en de leverancier ook als hij een korting op de betaling betwist.",
          ],
        },
      ],
      tavnit: {
        heading: "Waar Tavnit past",
        paragraphs: [
          "Tavnit doet de extractie en het in vorm brengen. Inkooporders, facturen en afleverbonnen komen binnen via e-mail of API en worden naar dezelfde getypeerde velden geëxtraheerd, wat de lay-out van de leverancier ook is. Een opzoek-Cleaner koppelt artikelnummers van leveranciers aan je SKU's; een formule-Cleaner controleert de regelberekeningen; een voorwaarde markeert alles wat buiten je tolerantie valt.",
          "Voor matching op regelniveau neemt een Matcher de inkooporder-run als benchmark en koppelt elke factuurregel daaraan — op betekenis, met een LLM als scheidsrechter bij twijfelgevallen — waarbij aantal en stukprijs naast elkaar worden gezet en niet-gekoppelde regels als waarschuwing worden vermeld. Gemarkeerde facturen wachten op een vaste beoordelaar, met een audittrail die alleen kan worden aangevuld; de rest gaat via API of webhook naar je ERP.",
        ],
        links: [
          { label: "Software voor PO-matching", href: "/use-cases/purchase-orders" },
          { label: "Factuurverwerking", href: "/use-cases/invoice-processing" },
          { label: "Afleverbonnen en ontvangstcontroles", href: "/use-cases/delivery-notes" },
        ],
      },
      faqs: [
        { q: "Wat is het verschil tussen two-way en three-way matching?", a: "Two-way matching vergelijkt de factuur met de inkooporder — hebben we afgesproken dit tegen deze prijs te kopen? Three-way matching vergelijkt ook met de ontvangstbon — is het echt aangekomen? Three-way is de standaard voor fysieke goederen; two-way is gebruikelijk voor diensten en aankopen van lage waarde." },
        { q: "Kan PO-matching volledig worden geautomatiseerd?", a: "De vergelijking wel. Wat zich tegen automatisering verzet, is de factuur-pdf van de leverancier in dezelfde gestructureerde vorm krijgen als je inkooporder, omdat lay-out, artikelnummers en omschrijvingen per leverancier verschillen. Zodra de extractie geautomatiseerd is, is matchen een query en hebben alleen de uitzonderingen een mens nodig." },
        { q: "Welke tolerantie moet ik instellen voor PO-matching?", a: "Er is geen universeel getal. Het meeste beleid staat een kleine procentuele of absolute afwijking op de stukprijs toe, nul afwijking op aantallen bij fysieke goederen, en behandelt vracht en toeslagen als aparte aanvaardbare regels. Het belangrijkste is dat de regel op papier staat en consequent door het systeem wordt toegepast." },
      ],
    },
    {
      slug: "line-item-extraction-from-invoices",
      title: "Factuurregels extraheren: wat het is en waarom het lastig is",
      h1: "Factuurregels extraheren",
      description:
        "Waarom factuurregels extraheren lastiger is dan totalen extraheren, wat een goede extractie van factuurregels oplevert en hoe je tabeldata uit elke leverancierslay-out haalt zonder sjablonen.",
      lede: "Bij het extraheren van factuurregels haal je de herhalende tabel uit een factuur — elke product- of dienstregel met omschrijving, SKU, aantal, stukprijs en bedrag — naar gestructureerde rijen, in plaats van alleen de kopvelden zoals leverancier, datum en totaal. Het maakt PO-matching, uitgavenanalyse en voorraadafstemming mogelijk, en het is het deel dat de meeste OCR-tools fout doen.",
      published: "2026-09-08",
      updated: "2026-09-08",
      readingMinutes: 6,
      sections: [
        {
          heading: "Kopvelden versus factuurregels",
          paragraphs: [
            "Elke factuur heeft een handvol kopvelden — leverancier, factuurnummer, datum, vervaldatum, valuta, totaal — die één keer voorkomen en makkelijk te vinden zijn. Daarnaast heeft ze een tabel. Die tabel kan drie regels tellen of driehonderd; ze kan over meerdere pagina's lopen; ze kan andere kolommen hebben dan de tabel van elke andere leverancier. De kop vertelt je hoeveel je moet betalen. De regels vertellen je waarvoor je betaalt, en dat is de vraag die elk vervolgproces eigenlijk stelt.",
            "Uitgavenanalyse heeft categorieën per regel nodig. PO-matching heeft aantallen en prijzen per regel nodig. Voorraadbeheer heeft SKU's per regel nodig. Belasting heeft tarieven per regel nodig. Een factuur die zonder regels is geëxtraheerd, is een betaalopdracht zonder inhoud.",
          ],
        },
        {
          heading: "Waarom tabellen het lastige deel zijn",
          paragraphs: [
            "Een totaal is één waarde op een voorspelbare plek op de pagina. Een tabel is een structuur, en die structuur is overal anders. Klassieke OCR leest tekens en posities; het weet niet dat het getal onder \"Aantal\" hoort bij de omschrijving twee cellen links ervan, of dat de omschrijving doorliep op een tweede regel, of dat de laatste drie rijen subtotalen zijn en geen artikelen.",
          ],
          bullets: [
            "De kolommen verschillen per leverancier: sommige hebben SKU en omschrijving, sommige alleen een omschrijving, sommige splitsen de stukprijs in netto en bruto.",
            "Omschrijvingen van meerdere regels lopen door, en voor een parser die op posities werkt, lijkt de tweede regel een nieuwe rij.",
            "Tabellen lopen over pagina's, met of zonder herhaalde koppen, en met lopende totalen onderaan elke pagina.",
            "Rijen die geen artikel zijn — subtotalen, kortingen, vracht, btw, \"vervolg\" — staan midden in de tabel en moeten worden geclassificeerd, niet als product geëxtraheerd.",
            "Samengevoegde cellen, rechts uitgelijnde getallen die in de volgende kolom terechtkomen en scheve scans breken allemaal het parsen op coördinaten.",
            "Eenheden en verpakkingsgroottes zitten verstopt in de omschrijving (\"per doos van 12\") in plaats van in een eigen kolom.",
          ],
        },
        {
          heading: "Met sjablonen versus zonder sjablonen",
          paragraphs: [
            "Tools met sjablonen lossen tabellen op door je voor elke leverancierslay-out het tabelgebied en de kolommen te laten aangeven. Dat werkt — voor die leverancier, tot die zijn factuuropmaak wijzigt, en dan levert het stilletjes foute rijen op tot iemand het merkt. De onderhoudslast groeit mee met je aantal leveranciers, en daarom laten teams met honderden leveranciers deze tools vallen.",
            "Extractie zonder sjablonen gebruikt een model dat begrijpt wat een factuurregel is, net zoals een mens dat doet, en rijen teruggeeft volgens een schema dat je één keer definieert — omschrijving, aantal, stukprijs, bedrag — ongeacht de lay-out. De keerzijde is dat een model zich kan vergissen. Daarom moet de output worden gecontroleerd in plaats van blind vertrouwd: rekencontroles op elke rij, en menselijke beoordeling als een controle faalt.",
          ],
        },
        {
          heading: "Hoe goede output van factuurregels eruitziet",
          paragraphs: [
            "De output moet een tabel zijn, geen tekst: één rij per artikel, één getypeerde kolom per veld, met getallen als getallen en datums als datums. Elke rij moet de velden bevatten die je vervolgproces nodig heeft en niets wat bij de kop hoort. Rijen die geen artikel zijn, moeten worden uitgesloten of gemarkeerd, niet ertussen gemengd. En de output moet controleerbaar zijn: als stukprijs maal aantal niet gelijk is aan het regelbedrag, is die rij fout en moet ze dat ook aangeven.",
          ],
          bullets: [
            "Omschrijving — letterlijk, omdat elke latere matching of categorisering ervan wordt afgeleid.",
            "SKU of artikelnummer — dat van de leverancier, plus je eigen nummer als een opzoeking het kan vinden.",
            "Aantal en eenheid — als aparte velden.",
            "Stukprijs en regelbedrag — allebei, zodat de berekening kan worden gecontroleerd.",
            "Btw-tarief of -code per regel, waar de regelgeving dat vereist.",
            "Een controlestatus per rij: berekening geslaagd, of gemarkeerd met de reden.",
          ],
        },
      ],
      tavnit: {
        heading: "Waar Tavnit past",
        paragraphs: [
          "In Tavnit zijn factuurregels tabelvelden in een Flow: je benoemt de kolommen één keer, en elke factuur van elke leverancier wordt naar die kolommen geëxtraheerd als getypeerde rijen, zonder sjabloon per leverancier. Een formule-Cleaner controleert per rij of stukprijs maal aantal klopt; een opzoek-Cleaner koppelt artikelnummers van leveranciers aan je SKU's; een categorie-Cleaner wijst uitgavencategorieën toe. Rijen die een controle niet doorstaan, sturen de run naar een beoordelaar. Resultaten komen in een Bucket die je kunt bevragen of in grafieken kunt zetten, of gaan via API of webhook direct naar je systemen.",
        ],
        links: [
          { label: "Factuurgegevens extraheren", href: "/use-cases/invoice-processing" },
          { label: "Flows — tabelvelden definiëren", href: "/docs/flows" },
          { label: "Cleaners — formule- en opzoekvelden", href: "/docs/cleaners" },
        ],
      },
      faqs: [
        { q: "Kan OCR factuurregels uit facturen halen?", a: "Gewone OCR haalt tekens en hun posities op; het begrijpt geen tabelstructuur, dus het levert tekst op die nog naar rijen moet worden omgezet. Betrouwbare extractie van factuurregels vraagt om een laag die begrijpt wat een factuurregel is: een sjabloon per leverancier of een model dat over lay-outs heen generaliseert." },
        { q: "Hoe haal ik factuurtabellen eruit zonder sjabloon per leverancier?", a: "Gebruik een extractiemodel dat rijen teruggeeft volgens een schema dat jij definieert — omschrijving, aantal, stukprijs, bedrag — ongeacht de lay-out, controleer daarna elke rij met een rekencontrole en stuur fouten naar een beoordelaar. Dat is wat de tabelvelden van Tavnit doen." },
        { q: "Hoe ga je om met factuurtabellen over meerdere pagina's?", a: "De extractie moet de tabel behandelen als één logische tabel over de pagina's heen, herhaalde koppen en lopende totalen per pagina negeren en één set rijen teruggeven. Controleer of de rijen optellen tot het factuurtotaal, zodat je zeker weet dat er bij een paginawissel niets is weggevallen." },
      ],
    },
    {
      slug: "hs-code-classification-explained",
      title: "HS-codeclassificatie uitgelegd — en hoe je het automatiseert",
      h1: "HS-codeclassificatie: wat het is en hoe je het automatiseert",
      description:
        "Hoe het Geharmoniseerd Systeem werkt, waarom tariefindeling oordeelswerk is, waar de Algemene Indelingsregels om de hoek komen kijken en hoe verantwoorde automatisering eruitziet.",
      lede: "Bij HS-codeclassificatie krijgt elk verhandeld product een code uit het Geharmoniseerd Systeem (HS), de internationale nomenclatuur die douaneautoriteiten gebruiken om invoerrechten, belastingen en controles te bepalen. De eerste zes cijfers zijn wereldwijd gelijk; landen breiden ze uit naar acht, tien of meer cijfers voor nationale tariefposten. Een verkeerde code betekent het verkeerde recht, een vertraagde zending of een boete.",
      published: "2026-09-08",
      updated: "2026-09-08",
      readingMinutes: 7,
      sections: [
        {
          heading: "Hoe het Geharmoniseerd Systeem is opgebouwd",
          paragraphs: [
            "Het Geharmoniseerd Systeem wordt beheerd door de Werelddouaneorganisatie en ongeveer om de vijf jaar herzien; de huidige editie is HS 2022. Het is ingedeeld in 21 afdelingen, 97 hoofdstukken (2 cijfers), posten (4 cijfers) en onderverdelingen (6 cijfers). Die zes cijfers zijn in elk lidland identiek, en dat maakt het systeem geharmoniseerd. Na zes cijfers voegt elk land zijn eigen onderverdelingen toe — nationale tariefposten — waaraan de daadwerkelijke rechten en nationale belastingen zijn gekoppeld.",
            "Het Arancel Nacional de Importación van Panama breidt de HS 2022-nomenclatuur bijvoorbeeld uit tot ongeveer 9.700 nationale tariefposten, elk met een eigen invoerrecht (DAI), omzetbelasting (ITBMS) en, waar van toepassing, selectieve verbruiksbelasting (ISC). Een classificatie is niet klaar bij zes cijfers; ze is klaar wanneer ze uitkomt op de nationale post die bepaalt wat er verschuldigd is.",
          ],
        },
        {
          heading: "Waarom classificeren oordeelswerk is, geen opzoekwerk",
          paragraphs: [
            "Als classificeren opzoeken in een woordenboek was — productnaam erin, code eruit — dan was het tientallen jaren geleden al geautomatiseerd. Dat is het niet, omdat de nomenclatuur goederen indeelt naar waarvan ze gemaakt zijn, wat ze doen en hoe ze worden aangeboden, en één productomschrijving geloofwaardig onder meerdere posten kan vallen. Is een verwarmde autostoelhoes een textielartikel, een voertuigonderdeel of een elektrisch verwarmingsapparaat? Elk heeft een ander tarief.",
            "De beslissende regels zijn de Algemene Regels voor de interpretatie van het Geharmoniseerd Systeem (de GRI). Regel 1 zegt dat de posten en de juridische aantekeningen bij afdelingen en hoofdstukken doorslaggevend zijn. Regel 2 gaat over onvolledige goederen en mengsels. Regel 3 behandelt goederen die onder twee of meer posten kunnen vallen — eerst de meest specifieke omschrijving, dan het wezenlijke karakter, dan de post die numeriek als laatste komt. Regels 4 tot en met 6 gaan over goederen die nergens anders onder vallen, verpakking en indeling op het niveau van onderverdelingen. Een verdedigbare classificatie noemt de regel waarop ze steunt.",
            "Dan zijn er de juridische aantekeningen: aantekeningen bij hoofdstukken en afdelingen die specifieke goederen in of uitsluiten van een post, ongeacht wat de tekst van de post lijkt te zeggen. Een classificeerder die de titels van posten leest en de aantekeningen negeert, zit bij een voorspelbare reeks producten vol overtuiging fout.",
          ],
        },
        {
          heading: "Waar classificatie in de praktijk misgaat",
          paragraphs: [
            "De meeste foute classificaties zijn geen moeilijke GRI 3-gevallen. Het zijn gewone producten die slecht zijn omschreven. Op de handelsfactuur staat \"onderdelen\" of \"monsters\" of een merknaam, en wie classificeert, gokt of moet navraag doen. De omschrijving is de grondstof van classificatie, en meestal de zwakste input in het proces.",
          ],
          bullets: [
            "Vage omschrijvingen op de handelsfactuur — een merk of modelnummer zonder vermelding van wat het artikel is of waarvan het is gemaakt.",
            "Gemengde zendingen waarbij één factuurregel meerdere verschillende producten omvat die anders worden ingedeeld.",
            "Vertrouwen op de HS-code die de leverancier heeft opgegeven, terwijl die volgens het tarief van een ander land is ingedeeld en mogelijk voor een ander doel.",
            "De code van vorig jaar hergebruiken nadat een nieuwe HS-editie het product heeft verplaatst.",
            "De aantekeningen bij hoofdstukken negeren en alleen op de titel van de post classificeren.",
            "Niet vastleggen waarom een code is gekozen, zodat hetzelfde product door drie mensen op drie manieren wordt ingedeeld.",
          ],
        },
        {
          heading: "Hoe verantwoorde automatisering eruitziet",
          paragraphs: [
            "Het doel is geen machine die zonder toezicht classificeert. De douanewetgeving legt de aangifte bij de importeur of de erkende douane-expediteur, en dat blijft zo. Het doel is een systeem dat een classificatie met onderbouwing voorstelt op het moment dat de zendingsdocumenten worden verwerkt, zodat de specialist beoordeelt in plaats van uitzoekt.",
          ],
          bullets: [
            "Begin bij de geëxtraheerde goederenomschrijving, letterlijk, plus eventuele gegevens over materiaal, functie en samenstelling op de factuur of paklijst.",
            "Classificeer volgens het nationale tarief — alle nationale posten met hun tarieven — en niet alleen de zescijferige HS-code, en volgens de actuele editie.",
            "Pas de juridische aantekeningen bij hoofdstukken en afdelingen en de GRI toe, en leg vast welke regel en welke aantekening de doorslag gaven.",
            "Geef een code, een betrouwbaarheid en de onderbouwing terug; stuur regels met een lage betrouwbaarheid of hoge waarde ter beoordeling naar een expediteur voordat de aangifte wordt ingediend.",
            "Houd per classificatie een audittrail bij. Als de douane twee jaar later een code ter discussie stelt, is de onderbouwing je verdediging.",
            "Leer van de correcties van de expediteur: een product dat één keer is ingedeeld, moet de volgende keer op dezelfde manier worden ingedeeld.",
          ],
        },
      ],
      tavnit: {
        heading: "Waar Tavnit past",
        paragraphs: [
          "Tavnit extraheert de documentenset van een zending — handelsfactuur, paklijst, cognossement, certificaat van oorsprong — naar getypeerde velden, waarna een HS-code-Cleaner elke goederenregel in dezelfde run indeelt op basis van de geëxtraheerde omschrijving. Voor Panama werkt de classificeerder met het officiële Arancel Nacional (VII Enmienda, HS 2022) met zijn nationale posten en DAI-, ITBMS- en ISC-tarieven, en past hij de juridische aantekeningen bij hoofdstukken en de GRI toe. De output is dus een nationale tariefpost met onderbouwing in plaats van een zescijferige gok.",
          "Classificaties gaan langs menselijke beoordeling voordat er iets wordt ingediend, met een audittrail die alleen kan worden aangevuld en die vastlegt wie welke code heeft goedgekeurd. De gestructureerde, ingedeelde data kunnen daarna het aangifteformulier vooraf invullen in plaats van dat alles opnieuw wordt overgetypt.",
        ],
        links: [
          { label: "Douaneautomatisering met HS-classificatie", href: "/use-cases/customs-trade" },
          { label: "Aduanas y clasificación arancelaria (Panamá) — in het Spaans", href: "/es/aduanas" },
          { label: "Cleaners — veldtype HS-code", href: "/docs/cleaners" },
        ],
      },
      faqs: [
        { q: "Wat is het verschil tussen een HS-code en een tariefcode?", a: "De HS-code is de zescijferige internationale code die door de Werelddouaneorganisatie is vastgesteld. Een tariefcode is de uitbreiding daarvan door een land — acht, tien of meer cijfers — waaraan de nationale rechten en belastingtarieven zijn gekoppeld. Het Arancel Nacional van Panama, het Taric van de EU en de HTS van de VS zijn allemaal nationale tarieven die op het HS zijn gebouwd." },
        { q: "Kan AI HS-codes nauwkeurig classificeren?", a: "Het kan goede classificaties voorstellen als het werkt vanuit een goede productomschrijving, met het volledige nationale tarief en de juridische aantekeningen, en zijn onderbouwing geeft. Het mag geen aangiftes zonder toezicht indienen: de verantwoorde aanpak is een voorstel met betrouwbaarheid en onderbouwing, beoordeeld door een erkende expediteur bij regels met een lage betrouwbaarheid of hoge waarde." },
        { q: "Kan ik gewoon de HS-code gebruiken die mijn leverancier op de factuur heeft gezet?", a: "Behandel die als hint, niet als antwoord. De leverancier heeft ingedeeld volgens het tarief van zijn eigen land, mogelijk voor exportcontrole in plaats van invoerrechten, en mogelijk volgens een oudere HS-editie. De importeur of expediteur is verantwoordelijk voor de code op de invoeraangifte." },
      ],
    },
  ],
};

export default nl;
