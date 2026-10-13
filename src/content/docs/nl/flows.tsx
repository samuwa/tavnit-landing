import { Fragment } from "react";
import {
  AlertTriangle,
  Boxes,
  Braces,
  Crosshair,
  FileInput,
  FilePlus,
  HeartPulse,
  History,
  Image as ImageIcon,
  Info,
  LifeBuoy,
  Play,
  Puzzle,
  RotateCcw,
  Sparkles,
  Table2,
  Type,
  Wand2,
} from "lucide-react";
import {
  BulletList,
  DataTable,
  DocCard,
  DocLink,
  InfoBox,
  InlineCode,
  Lead,
  NumberedList,
  Related,
  Screenshot,
  WarningBox,
} from "@/components/docs/ui";
import type { DocsPageSchemaData } from "../types";

/** /nl/docs/flows — translated from src/app/docs/flows/page.tsx. */

/** Mirrors the visible numbered steps under "Het schema opbouwen". */
export const schema: DocsPageSchemaData = {
  howTo: {
    name: "Een Tavnit-Flow bouwen die gestructureerde data uit een document haalt",
    description:
      "Maak een Flow, definieer de metadata- en tabelvelden, voeg alleen extractiehints toe waar ze nodig zijn en test hem op een echt document.",
    steps: [
      {
        name: "De Flow maken en beschrijven",
        text: "Klik op de pagina Flows op Flow maken en kies een sjabloon, een AI-suggestie of een lege Flow. Geef hem een naam en een beschrijving van de documenten die hij verwerkt — de beschrijving helpt de AI ook om nauwkeuriger te extraheren.",
      },
      {
        name: "Metadatavelden toevoegen",
        text: "Voeg een veld toe voor elke waarde die één keer per document voorkomt, zoals factuurnummer, factuurdatum of leverancier, en stel het datatype in.",
      },
      {
        name: "Tabelvelden toevoegen",
        text: "Voeg een veld toe voor elke kolom van de terugkerende tabel met regels, zoals omschrijving, aantal, stuksprijs en bedrag.",
      },
      {
        name: "Extractiehints toevoegen waar nodig",
        text: "Voeg alleen hints toe aan de velden die ze nodig hebben: echte voorbeeldwaarden, het label waar een waarde naast staat, het paginagebied waarin ze verschijnt of de gedrukte kolomkop.",
      },
      {
        name: "Testen op een echt document",
        text: "Een nieuwe Flow is al Actief. Klik op Uitvoeren, verwerk één echt document, vergelijk het resultaat met de bron en scherp de hints aan van elk veld dat verkeerd terugkwam.",
      },
    ],
  },
  primaryImage: {
    url: "/assets/docs-flow-schema-2026-08.jpg",
    caption:
      "Het dataschema van een Tavnit-Flow, met metadatavelden en tabelvelden naast elkaar.",
    width: 1327,
    height: 801,
  },
};

export default function FlowsNl() {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        Flows
      </h1>

      <DocCard icon={<Sparkles size={24} />} title="Wat een Flow is">
        <Lead>
          Een Flow is de definitie van één documenttype: de velden die je geëxtraheerd wilt hebben, de
          hints die de AI vertellen waar ze te vinden zijn, en alles wat daarna volgt. Het is het
          object in Tavnit dat een document in data omzet — Collections, Subjects, Splitters en
          Cleaners bestaan allemaal om te voeden of te verfijnen wat een Flow oplevert.
        </Lead>
        <p>
          Er is geen sjabloon om te tekenen en er zijn geen coördinaten om in te stellen. Je
          beschrijft de velden in gewone woorden en de Flow werkt over lay-outs heen, zodat één Flow{" "}
          <em>Leveranciersfacturen</em> twintig leveranciers aankan waarvan de facturen totaal niet op
          elkaar lijken. Daarom wordt bijna alle extractiekwaliteit ook gewonnen of verloren in het
          schema en de hints.
        </p>
        <Screenshot
          src="/assets/docs-flow-schema-2026-08.jpg"
          alt="Het dataschema van een Tavnit-Flow met de naam Invoice Processor. Een paneel Metadatavelden toont negen velden met één waarde, zoals Invoice Number, Due Date en Total, met hun datatypes, naast een paneel Tabelvelden met Description, Quantity, Price en Amount. De linkerbalk groepeert Recente Runs, E-mailtrigger, Collections, Cleaner, Agent, Formuliersjablonen, E-mailoutput, Webhook, Bucket-export, Menselijke beoordeling en Flow-ID."
          caption="Het dataschema van een Flow. Metadatavelden links, terugkerende tabelvelden rechts, en alles wat je aan de Flow kunt koppelen in de zijbalk."
        />
        <InfoBox color="blue" icon={<Info size={20} />} title="Alleen het schema is verplicht">
          Een Flow heeft minstens één veld nodig. Al het andere in de zijbalk — Cleaner, Agent,
          webhook, e-mail, Bucket-export, beoordeling — is optioneel en kan later worden toegevoegd
          zonder iets opnieuw te bouwen. Owners en Admins kunnen Flows maken en bewerken.
        </InfoBox>
      </DocCard>

      <DocCard icon={<FilePlus size={24} />} title="Een Flow maken">
        <Lead>
          Klik op de pagina Flows op <strong>Flow maken</strong> en Tavnit vraagt{" "}
          <em>&ldquo;Hoe wil je beginnen?&rdquo;</em>. Alle drie de routes eindigen in dezelfde
          bewerkbare Flow, dus kies wat je het snelst bij een goed eerste concept brengt.
        </Lead>
        <DataTable
          head={["Optie", "Wat het doet", "Het beste als"]}
          rows={[
            [
              "Vanuit een sjabloon",
              <Fragment key="c0">
                Opent een galerij met twee tabbladen. <strong>Tavnit-sjablonen</strong> zijn
                kant-en-klare Flows waarin velden en hints al zijn ingevuld; met{" "}
                <strong>Mijn Flows</strong> kun je een <strong>Kopie maken</strong> van een van je
                eigen actieve Flows.
              </Fragment>,
              "Je document is een gangbaar type, of lijkt op een Flow die je al hebt.",
            ],
            [
              "AI-suggestie",
              "Upload een voorbeeld-PDF of -afbeelding. De AI leest die, herkent de velden en stelt een naam, een beschrijving en een schema met hints op. Vink uit wat je niet nodig hebt en bewerk velden voordat je de Flow maakt.",
              "Je document is specifiek voor je bedrijf en je wilt een vliegende start.",
            ],
            [
              "Vanaf nul beginnen",
              "Een leeg schema. Je definieert elk veld zelf.",
              "Je weet precies wat je nodig hebt, of je bouwt een bestaand proces na.",
            ],
          ]}
        />
        <p>
          Tavnit-sjablonen dekken facturen, inkooporders, bonnen, bankafschriften, pakbonnen,
          labuitslagen, contracten, offertes, creditnota&apos;s, identiteitsdocumenten en cv&apos;s. Als
          je bij het opzetten van je organisatie de welkomstvragen hebt beantwoord, worden de
          sjablonen die bij je documenten passen eerst getoond, en biedt de lege pagina Flows aan om
          ze allemaal in één klik te maken met <strong>Deze Flows maken</strong>.
        </p>
        <p>
          Elke route eindigt met een naam (minstens 3 tekens) en een beschrijving (minstens 10
          tekens). De Flow opent in de editor met een korte gids <em>&ldquo;Stel je Flow in&rdquo;</em>,
          en hij is vanaf het begin <strong>Actief</strong> — gebruik de schakelaar in de bovenbalk om
          hem te deactiveren. Een inactieve Flow kan niet worden uitgevoerd.
        </p>
        <InfoBox color="green" icon={<Info size={20} />} title="Een AI-suggestie maakt geen Run aan">
          Een Flow opstellen vanuit een voorbeelddocument maakt geen Run aan. Zie het concept als
          startpunt — verwijder wat je niet gaat gebruiken, want elk extra veld is meer om te
          controleren en meer dat mis kan gaan.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Table2 size={24} />} title="Metadatavelden en tabelvelden">
        <Lead>
          Elk veld is een van twee soorten, afhankelijk van of de waarde één keer per document of één
          keer per regel voorkomt. Dit is de keuze in het schema met de meeste gevolgen: ze bepaalt de
          vorm van je webhook-payload, je Bucket-rijen, je CSV en je beoordelingsscherm.
        </Lead>
        <DataTable
          head={["", "Metadataveld", "Tabelveld"]}
          rows={[
            ["Komt voor", "Eén keer per document", "Eén keer per rij van een terugkerende tabel"],
            [
              "Op een factuur",
              "Factuurnummer, factuurdatum, leverancier, totaal",
              "Omschrijving, aantal, stuksprijs, bedrag",
            ],
            [
              "In de output",
              <Fragment key="f0">
                Het object <InlineCode>metadata</InlineCode>
              </Fragment>,
              <Fragment key="f1">
                Eén item per rij in <InlineCode>rows</InlineCode>
              </Fragment>,
            ],
            [
              "In een Bucket",
              "Herhaald op elke rij die uit dat document wordt geëxporteerd",
              "Elk één Bucket-rij",
            ],
          ]}
        />
        <InfoBox color="violet" icon={<Info size={20} />} title="De verkeerde soort kiezen is de klassieke fout">
          Definieer je een kolom van de regels als metadataveld, dan krijg je één waarde uit een tabel
          van twintig. Definieer je een factuurtotaal als tabelveld, dan wordt hetzelfde getal op elke
          rij herhaald. Twijfel je, vraag je dan af of er ooit een tweede exemplaar van de waarde op
          hetzelfde document kan staan.
        </InfoBox>
        <p>
          Een Flow met <strong>alleen metadatavelden</strong> — een identiteitsdocument, een
          certificaat, een formulier van één pagina — levert één rij per document op met die waarden,
          zodat het resultaat net als bij elke andere Run in je tabelweergave, Bucket, webhook en
          e-mail terechtkomt.
        </p>
        <p>
          Een Flow kan ook <strong>Systeemkolommen</strong> toevoegen aan elke rij die hij oplevert —
          de Flow-ID, de Flow-naam en de Run-ID. Zet ze aan wanneer meerdere Flows naar één{" "}
          <DocLink href="/docs/buckets">Bucket</DocLink> schrijven en je moet weten uit welk document
          een rij komt.
        </p>
      </DocCard>

      <DocCard icon={<Type size={24} />} title="Datatypes">
        <Lead>
          Elk veld heeft een type. Types zijn niet cosmetisch: ze bepalen of een waarde correct
          sorteert, optelt, vergeleken wordt in een Cleaner-regel en in een grafiek verschijnt. Ze bij
          de Flow goed instellen bespaart werk in elke latere fase.
        </Lead>
        <DataTable
          head={["Type", "Gebruik voor", "Opmerkingen"]}
          rows={[
            ["Tekst", "Namen, adressen, omschrijvingen, referentiecodes", "De veilige standaard."],
            [
              "Getal",
              "Totalen, aantallen, prijzen, tarieven",
              "Nodig als je de waarde later wilt optellen, vergelijken of in een grafiek wilt zetten.",
            ],
            [
              "Datum",
              "Factuurdata, vervaldata, leverdata",
              <Fragment key="f2">
                Herformatteren naar een consistent outputformaat is een taak voor een{" "}
                <DocLink href="/docs/cleaners">Cleaner</DocLink>, niet voor de extractie.
              </Fragment>,
            ],
            [
              "Gemengd/Alfanumeriek",
              "Waarden die letters en cijfers combineren — onderdeelnummers, containercodes, btw-nummers",
              "Gebruik dit in plaats van Getal wanneer voorloopnullen of letters behouden moeten blijven.",
            ],
            [
              "Afbeelding",
              "Afbeeldingen in het document: foto's, logo's, handtekeningen, stempels",
              "Veilig geëxtraheerd en opgeslagen, en daarna geleverd als tijdelijk geldige link.",
            ],
          ]}
        />
        <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Extraheer zoals gedrukt, normaliseer later">
          Gebruik het type niet om te herformatteren. Haal de waarde op zoals het document haar toont,
          en laat daarna een Cleaner valuta omrekenen, datums herschrijven en decimaaltekens
          corrigeren. Extractie die ook transformeert, is lastiger te debuggen als een getal verkeerd
          terugkomt.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Crosshair size={24} />} title="Extractiehints">
        <Lead>
          Met hints maak je een veld eenduidig zonder een sjabloon te schrijven. Ze zijn het
          belangrijkst wanneer een document meerdere waarden bevat die op elkaar lijken — drie datums,
          twee totalen, een ordernummer en een factuurnummer in hetzelfde kopblok.
        </Lead>
        <p>
          <strong>Voor een metadataveld</strong> kun je elk van deze combineren:
        </p>
        <DataTable
          head={["Hint", "Wat hij de AI vertelt", "Geschikt voor"]}
          rows={[
            [
              "Voorbeeldwaarden",
              "Echte waarden, gekopieerd uit je documenten.",
              "Bijna alles. De waardevolste hint — hij laat format, lengte en vorm in één keer zien.",
            ],
            [
              "Naast een label",
              <Fragment key="f3">
                Het gedrukte label waar de waarde naast staat. Noem de varianten:{" "}
                <em>Invoice Number, Invoice #, Inv No</em>.
              </Fragment>,
              "Kopvelden die verschillende leveranciers verschillend labelen.",
            ],
            [
              "In een specifiek paginagebied",
              "Een van negen zones — van linksboven tot rechtsonder.",
              "Waarden die altijd in dezelfde hoek staan, zoals een documentnummer rechtsboven.",
            ],
            [
              "Verwacht bereik",
              "Een minimum, een maximum of allebei. Geldt als richtlijn, niet als harde regel.",
              "Een verkeerd gelezen decimaalteken opvangen — een totaal van 27,030 waar 270.30 bedoeld was.",
            ],
            [
              "Aanvullende hints",
              "Vrije tekst voor alles wat de opties hierboven niet dekken.",
              "Regels als “gebruik het nettobedrag, nooit het brutobedrag”.",
            ],
          ]}
        />
        <p>
          <strong>Voor een tabelveld</strong> zijn de hints anders, omdat de AI een kolom zoekt in
          plaats van een punt op de pagina:
        </p>
        <DataTable
          head={["Hint", "Wat hij de AI vertelt"]}
          rows={[
            [
              "Brontype",
              "Tabel voor data in een echte tabel met kolommen; Vrije vorm voor rijachtige waarden in ongestructureerde tekst, zoals een contract.",
            ],
            [
              "Kolomkoppen",
              "De koptekst zoals gedrukt. Noem elke variant die je leveranciers gebruiken, zodat één veld ze allemaal herkent.",
            ],
            ["Verwacht bereik", "Een plausibel bereik voor de getallen in die kolom."],
            ["Voorbeeldwaarden", "Echte celwaarden uit je documenten."],
            [
              "Aanvullende info",
              "Wat de kolom eigenlijk voorstelt, wanneer de kop alleen dubbelzinnig is — “stuksprijs vóór korting”.",
            ],
          ]}
        />
        <InfoBox color="green" icon={<Info size={20} />} title="Begin zonder hints">
          Voeg velden toe, verwerk één echt document en voeg alleen hints toe waar het resultaat fout
          was. Alles vooraf van hints voorzien kost tijd op velden die nooit dubbelzinnig waren, en een
          te specifieke hint kan de extractie verslechteren doordat hij een lay-out uitsluit waar je
          niet op had gerekend. Zodra de Flow een paar Runs heeft, kan <strong>Diagnose</strong> hints
          voor je voorstellen.
        </InfoBox>
        <p>
          Voorbeeldwaarden worden overgeslagen voor velden van het type <strong>Datum</strong> en{" "}
          <strong>Afbeelding</strong>, dus zet richtlijnen voor datums in het vak voor aanvullende
          hints.
        </p>
      </DocCard>

      <DocCard icon={<Puzzle size={24} />} title="Samengestelde velden">
        <Lead>
          Sommige tabelkolommen bevatten meerdere waarden in één cel — een verdeling van maat en
          aantal zoals <em>S:2 M:5 L:3</em>, gedrukt in één vak. Een samengesteld veld splitst die cel
          in subvelden, zodat elk deel een eigen waarde wordt in plaats van een tekenreeks die je later
          moet ontleden.
        </Lead>
        <NumberedList
          items={[
            "Voeg een tabelveld toe en zet Samengesteld veld aan.",
            <Fragment key="f4">
              Definieer de subvelden waaruit de cel bestaat — bijvoorbeeld{" "}
              <InlineCode>size</InlineCode> als tekst en <InlineCode>quantity</InlineCode> als getal.
            </Fragment>,
            "Voeg voorbeeldwaarden toe die laten zien hoe de groepering in je documenten verschijnt.",
          ]}
        />
        <p>
          Subvelden bevatten één waarde, dus ze kunnen Tekst, Getal, Datum of Gemengd/Alfanumeriek zijn
          — maar geen Afbeelding. Samengestelde velden zijn alleen beschikbaar voor tabelvelden, omdat
          het juist draait om het uitpakken van een terugkerende cel.
        </p>
        <InfoBox color="blue" icon={<Boxes size={20} />} title="Metadatavelden met meerdere waarden">
          Het equivalent voor metadata is <strong>Meerdere waarden accepteren</strong>. Zet het aan
          wanneer één document terecht meerdere van hetzelfde kan bevatten — een reeks bonnummers,
          meerdere inkoopreferenties — en het veld levert een lijst op in plaats van één waarde. Het is
          niet beschikbaar voor afbeeldingsvelden.
        </InfoBox>
      </DocCard>

      <DocCard icon={<ImageIcon size={24} />} title="Afbeeldingen extraheren">
        <Lead>
          Een afbeeldingsveld haalt een afbeelding uit het document in plaats van tekst: een
          productfoto, een handtekening, een stempel, een logo. Een afbeeldingsveld bij de metadata
          bevat één afbeelding per document; een afbeeldingsveld in de tabel geeft elke rij de
          afbeelding die erbij hoort.
        </Lead>
        <BulletList
          items={[
            "Afbeeldingen worden privé opgeslagen en komen daarom verderop aan als tijdelijk geldige links in plaats van ruwe bytes",
            "Hetzelfde soort link verschijnt in de webhook-payload, de e-mailoutput en de CSV-cel; een export vanaf de Run-pagina maakt nieuwe links aan",
            "Links in leveringen zijn zeven dagen geldig — download de afbeelding in plaats van de link op te slaan",
            "Afbeeldingsvelden kunnen niet samengesteld zijn of meerdere waarden accepteren, en hints met voorbeeldwaarden gelden er niet voor",
          ]}
        />
      </DocCard>

      <DocCard icon={<FilePlus size={24} />} title="Het schema opbouwen">
        <Lead>
          Bouw eerst de metadatavelden, dan de tabelvelden, dan de hints. Test vroeg op een echt
          document — een schema dat er op papier goed uitziet en een schema dat je echte papierwerk
          overleeft, zijn twee verschillende dingen.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f5">
              Klik op <strong>Flow maken</strong> en kies een sjabloon, een AI-suggestie of een lege
              Flow. Geef hem een naam die het document beschrijft (<em>Leveranciersfacturen</em>) en
              een echte beschrijving — die verbetert de extractienauwkeurigheid en is waar een{" "}
              <DocLink href="/docs/collections">Collection</DocLink> later op matcht.
            </Fragment>,
            <Fragment key="f6">
              Klik onder <strong>Metadatavelden</strong> op <strong>Veld toevoegen</strong> voor elke
              waarde die één keer per document voorkomt, en stel meteen het datatype in.
            </Fragment>,
            <Fragment key="f7">
              Voeg onder <strong>Tabelvelden</strong> een veld toe voor elke kolom van de terugkerende
              tabel met regels.
            </Fragment>,
            <Fragment key="f8">
              Voeg alleen <strong>extractiehints</strong> toe aan de velden die ze nodig hebben.
            </Fragment>,
            <Fragment key="f9">
              De Flow is al <strong>Actief</strong>. Klik op <strong>Uitvoeren</strong>, verwerk één
              echt document en vergelijk het resultaat met de bron.
            </Fragment>,
          ]}
        />
        <p>Sleep velden aan hun greep om de volgorde te wijzigen.</p>
        <WarningBox>
          Een veld hernoemen verandert de sleutel bij elke afnemer verderop: de webhook-payload, de
          kolomtoewijzing van de Bucket, de CSV-kop en elke{" "}
          <DocLink href="/docs/cleaners">Cleaner</DocLink> die het veld leest. Controleer wat er
          gekoppeld is voordat je een veld hernoemt in een Flow die al in gebruik is.
        </WarningBox>
      </DocCard>

      <DocCard icon={<FileInput size={24} />} title="Welke bestanden een Flow leest">
        <Lead>
          Een Flow accepteert PDF&apos;s, afbeeldingen en spreadsheets, via elke route — upload, e-mail
          en API. Tavnit bepaalt zelf hoe elk bestand wordt gelezen, dus je stelt per formaat niets
          in.
        </Lead>
        <DataTable
          head={["Bestand", "Formaten", "Hoe het wordt gelezen"]}
          rows={[
            [
              "PDF",
              "PDF",
              "Digitale PDF's worden direct gelezen. Gescande PDF's worden automatisch herkend en eerst met OCR gelezen.",
            ],
            [
              "Afbeelding",
              "PNG, JPG, JPEG, JFIF",
              "Gelezen als een gescande pagina. JFIF is de JPEG-variant die sommige Windows-browsers standaard opslaan, en werkt als elke JPEG.",
            ],
            [
              "Spreadsheet",
              "XLSX, XLS, CSV",
              "Het eerste zichtbare werkblad wordt gelezen. Andere en verborgen werkbladen worden genegeerd, dus zet de data die je wilt op het eerste werkblad.",
            ],
          ]}
        />
        <p>
          Zeer grote werkbladen worden geweigerd met een duidelijke foutmelding. Wil je elk werkblad van
          een werkmap als apart document verwerken, stuur hem dan door een{" "}
          <DocLink href="/docs/splitters">Splitter</DocLink>.
        </p>
        <InfoBox color="blue" icon={<Info size={20} />} title="Slechte scan: OCR afdwingen voor bestanden die slecht extraheren">
          Gescande documenten krijgen al automatisch OCR. Sommige bestanden lijken digitaal maar hebben
          een kapotte tekstlaag — een scan met een slechte ingebedde transcriptie, een PDF die uit een
          vreemd programma is geëxporteerd. Open daarvoor <strong>Slechte scan</strong> in de
          instellingen van de Flow en zet het aan: elk bestand in de Flow wordt dan eerst met OCR
          gelezen, en de extractie werkt met de herstelde tekst. Is OCR niet beschikbaar of mislukt
          het, dan valt de Run automatisch terug op de standaardverwerking.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Braces size={24} />} title="Wat je aan een Flow kunt koppelen">
        <Lead>
          Het schema bepaalt wat eruit komt; de rest van de Flow bepaalt wat ermee gebeurt. Elk
          onderdeel hieronder staat op zichzelf — koppel alleen wat je nodig hebt, in elke volgorde,
          op elk moment.
        </Lead>
        <DataTable
          head={["Fase", "Koppeling", "Wat het doet"]}
          rows={[
            [
              "Invoer",
              <Fragment key="f10">
                <DocLink href="/docs/email-integration">E-mailtrigger</DocLink>
              </Fragment>,
              "Geeft de Flow een eigen inboxadres, zodat doorgestuurde documenten (PDF, afbeelding of spreadsheet) automatisch worden verwerkt.",
            ],
            [
              "Invoer",
              <Fragment key="f11">
                <DocLink href="/docs/collections">Collections</DocLink>
              </Fragment>,
              "Toont de Collections die documenten naar deze Flow kunnen sturen.",
            ],
            [
              "Verwerking",
              <Fragment key="f12">
                <DocLink href="/docs/cleaners">Cleaner</DocLink>
              </Fragment>,
              "Verwerkt de rijen van elke Run: herformatteren, omrekenen, berekenen, opzoeken en regels uitvoeren.",
            ],
            [
              "Verwerking",
              <Fragment key="f13">
                <DocLink href="/docs/agents">Agent</DocLink>
              </Fragment>,
              "Start na de extractie, met geëxtraheerde velden als invoer.",
            ],
            [
              "Verwerking",
              "Formuliersjablonen",
              "Vult een PDF-sjabloon in met de geëxtraheerde waarden van een Run.",
            ],
            [
              "Output",
              <Fragment key="f14">
                <DocLink href="/docs/email-integration">E-mailoutput</DocLink>
              </Fragment>,
              "Mailt de resultaten na elke geslaagde Run naar een of meer adressen, optioneel met JSON, CSV, ingevulde formulieren en het originele document als bijlage.",
            ],
            [
              "Output",
              <Fragment key="f15">
                <DocLink href="/docs/webhooks">Webhook</DocLink>
              </Fragment>,
              "Stuurt de resultaten met een POST naar je endpoint. Alleen HTTPS.",
            ],
            [
              "Output",
              <Fragment key="f16">
                <DocLink href="/docs/buckets">Bucket-export</DocLink>
              </Fragment>,
              "Voegt de rijen van elke Run toe aan een gestructureerde tabel, met velden toegewezen aan kolommen.",
            ],
            [
              "Instellingen",
              <Fragment key="f17">
                <DocLink href="/docs/human-in-the-loop">Menselijke beoordeling</DocLink>
              </Fragment>,
              "Pauzeert Runs voor een beoordelaar voordat er iets wordt geleverd.",
            ],
            ["Instellingen", "Slechte scan", "Dwingt OCR af voor elk bestand in de Flow (zie hierboven)."],
            [
              "Instellingen",
              "Flow-ID",
              <Fragment key="f18">
                De identificatie die je meegeeft wanneer je de{" "}
                <DocLink href="/docs/api-integration">API</DocLink> aanroept.
              </Fragment>,
            ],
          ]}
        />
        <p>
          <strong>Opties van de E-mailtrigger.</strong> Zodra de trigger aan staat, toont het paneel
          het inboxadres van de Flow en twee instellingen. <strong>Toegestane afzenders</strong>{" "}
          beperkt wie per e-mail een Run kan starten; laat het leeg om elke afzender te accepteren.{" "}
          <strong>E-mailtekst verwerken</strong> extraheert ook uit de tekst van het bericht zelf,
          ofwel <em>Alleen als er niets is bijgevoegd</em> (de standaard, zodat een begeleidend
          bericht nooit een tweede Run start) ofwel <em>Altijd</em>. Het adres van de afzender wordt
          bij elke Run vastgelegd en op de pagina Runs getoond.{" "}
          <DocLink href="/docs/email-integration">E-mailintegratie</DocLink> behandelt de details.
        </p>
      </DocCard>

      <DocCard icon={<HeartPulse size={24} />} title="Een Flow diagnosticeren">
        <Lead>
          Zodra een Flow een aantal documenten heeft verwerkt, opent de knop <strong>Diagnose</strong>{" "}
          in de bovenbalk van de Flow de <strong>Flow-dokter</strong>. Die bestudeert je recente
          voltooide Runs, vindt de velden die steeds leeg of met het verkeerde type terugkomen, en
          stelt correcties voor.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="d0">
              Open de Flow en klik op <strong>Diagnose</strong>. De knop verschijnt voor Owners en
              Admins zodra de Flow minstens één veld heeft.
            </Fragment>,
            "Tavnit leest de recente Runs, leest een paar documenten opnieuw waarin velden faalden, en stelt correcties op. Dit duurt even.",
            <Fragment key="d1">
              Bekijk het resultaat. Elk probleemveld toont hoe vaak het leeg was of het verkeerde type
              had, met de hint <strong>Huidig</strong> naast de hint <strong>Voorgesteld</strong>. Er
              kan ook een <strong>Voorgestelde beschrijving</strong> bij zitten.
            </Fragment>,
            <Fragment key="d2">
              Behoud of bewerk de correcties waarmee je het eens bent en klik op{" "}
              <strong>Toepassen</strong>. Er verandert niets tot je toepast; het paneel sluiten gooit
              de voorstellen weg.
            </Fragment>,
          ]}
        />
        <p>
          Als alles in orde lijkt, zie je <em>&ldquo;Extractie ziet er gezond uit&rdquo;</em>. Diagnose
          draait alleen wanneer je erop klikt. Verwerk na het toepassen van correcties opnieuw een echt
          document om te bevestigen dat ze hebben geholpen.
        </p>
      </DocCard>

      <div id="runs" className="scroll-mt-24">
        <DocCard icon={<Play size={24} />} title="Runs: wat er gebeurt als een document wordt verwerkt">
          <Lead>
            Elk document wordt een Run, en elke Run doorloopt dezelfde volgorde. Als je die volgorde
            kent, weet je waar je moet kijken wanneer iets te laat aankomt, verkeerd aankomt of helemaal
            niet aankomt.
          </Lead>
          <NumberedList
            items={[
              "Het document wordt opgeslagen en de Run komt in de wachtrij.",
              "De extractie leest het en levert metadatawaarden en tabelrijen op.",
              "Als er een Cleaner is gekoppeld, verwerkt die de rijen — omrekeningen, berekende kolommen, opzoekingen.",
              "Voorwaardelijke regels worden uitgevoerd: rijen kunnen worden verwijderd, meldingen verstuurd, een beoordeling aangevraagd.",
              "Als beoordeling verplicht is, pauzeert de Run en wordt er niets geleverd tot een beoordelaar goedkeurt.",
              "De outputs draaien: e-mail, Bucket-export en webhook. Daarna wordt de Run als voltooid gemarkeerd en start een eventueel gekoppelde Agent.",
            ]}
          />
          <DataTable
            head={["Run-status", "Betekenis"]}
            rows={[
              ["In afwachting (in wachtrij)", "Opgeslagen en wacht op een worker."],
              ["Verwerken", "Wordt geëxtraheerd, opgeschoond of geleverd. De Run-pagina toont de huidige fase."],
              [
                "Opnieuw proberen",
                "Een eerdere poging is om een tijdelijke reden mislukt en de Run is automatisch opnieuw in de wachtrij gezet (zie hieronder).",
              ],
              [
                "Wacht op HITL-beoordeling",
                <Fragment key="f19">
                  Gepauzeerd voor <DocLink href="/docs/human-in-the-loop">menselijke beoordeling</DocLink>.
                  Er is nog niets geleverd.
                </Fragment>,
              ],
              ["Voltooid", "De extractie is klaar en elke ingestelde output heeft gedraaid."],
              [
                "Geannuleerd",
                "Iemand heeft de Run geannuleerd terwijl die in de wachtrij stond of werd verwerkt, of een beoordelaar heeft hem afgewezen. Er wordt niets meer geleverd.",
              ],
              ["Mislukt", "Het document kon niet worden verwerkt. Het logboek van de Run vertelt waarom."],
            ]}
          />
        </DocCard>
      </div>

      <DocCard icon={<History size={24} />} title="Werken met Runs">
        <Lead>
          De pagina <strong>Runs</strong> toont elke Run in je organisatie; elke Flow heeft ook een
          eigen tabblad <strong>Recente Runs</strong>. Gebruik <strong>Filteren</strong> om te
          verfijnen op status, datumbereik, Flow, gebruiker, bron of een geplakte Run-ID.
        </Lead>
        <DataTable
          head={["Actie", "Waar", "Opmerkingen"]}
          rows={[
            [
              "Details bekijken",
              "Menu Run-acties, of klik op de rij",
              "Geëxtraheerde data naast het bronbestand, de Run-informatie en het verwerkingslogboek.",
            ],
            [
              "CSV downloaden",
              "Menu Run-acties",
              "Alleen voltooide Runs. CSV exporteren en JSON exporteren staan ook op de Run-pagina.",
            ],
            [
              "Bestand downloaden",
              "Menu Run-acties, of Downloaden op de Run-pagina",
              "Het originele bronbestand. Spreadsheets kunnen niet inline worden bekeken, dus download ze om ze te zien.",
            ],
            [
              "Run annuleren",
              "Menu Run-acties",
              "Alleen voor Runs die nog in de wachtrij staan of bezig zijn.",
            ],
          ]}
        />
        <p>
          De kolom <strong>Gestart door</strong> toont wie de Run startte — de gebruiker bij een
          upload, of het adres van de afzender bij een Run die per e-mail binnenkwam. De kolom{" "}
          <strong>Bron</strong> vertelt hoe hij binnenkwam: handmatige upload, API, e-mail enzovoort.
        </p>
      </DocCard>

      <DocCard icon={<RotateCcw size={24} />} title="Mislukte Runs en automatische nieuwe pogingen">
        <Lead>
          De meeste fouten liggen aan het document — een onleesbaar bestand of een niet-ondersteund
          type — en een nieuwe poging helpt dan niet. Een paar liggen er niet aan: een
          verwerkingsworker herstart midden in een Run, of een AI-provider heeft een tijdelijke
          storing. Daarvoor kan een organisatie Tavnit het zelf opnieuw laten proberen.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="r0">
              Ga naar <strong>Instellingen</strong> → <strong>Organisatie</strong> →{" "}
              <strong>Mislukte Runs</strong>. Alleen de Owner ziet dit tabblad.
            </Fragment>,
            <Fragment key="r1">
              Zet <strong>Mislukte Runs automatisch opnieuw proberen</strong> aan.
            </Fragment>,
            <Fragment key="r2">
              Stel <strong>Maximaal aantal pogingen per Run</strong> in op 1, 2 of 3.
            </Fragment>,
          ]}
        />
        <BulletList
          items={[
            "Een opnieuw geprobeerde Run houdt dezelfde Run-ID, dus API-polling, webhooks en links blijven werken.",
            "Outputs worden alleen uitgevoerd wanneer een Run voltooid is, dus een nieuwe poging levert een document nooit twee keer.",
            "Nooit opnieuw geprobeerd: ongeldige bestanden, niet-ondersteunde types, geannuleerde Runs, Runs die voor beoordeling zijn gepauzeerd en Runs die meer dan een dag geleden zijn aangemaakt.",
            "Een Run die verloren gaat door een herstart van een worker wordt automatisch gedetecteerd. Met automatisch opnieuw proberen aan komt hij opnieuw in de wachtrij; staat het uit, dan wordt hij als Mislukt gemarkeerd.",
            "De Run-pagina toont Eerdere pogingen, elk gemarkeerd als Worker verloren of Mislukt met de foutmelding, en de lijst Runs toont een badge voor nieuwe pogingen.",
          ]}
        />
        <p>
          Wil je horen over Runs die mislukken, voeg dan adressen toe onder{" "}
          <strong>Meldingen bij mislukte Runs</strong> in hetzelfde tabblad.
        </p>
      </DocCard>

      <DocCard icon={<LifeBuoy size={24} />} title="De extractiekwaliteit verbeteren">
        <Lead>
          Als een veld verkeerd terugkomt, zit de oplossing bijna altijd in de definitie van dat veld
          en niet in het document. Begin met <strong>Diagnose</strong> als de Flow Runs heeft, en werk
          daarna deze lijst af — de eerste twee lossen de meeste gevallen op.
        </Lead>
        <DataTable
          head={["Symptoom", "Waarschijnlijke oorzaak", "Oplossing"]}
          rows={[
            [
              "De verkeerde van meerdere vergelijkbare waarden",
              "Niets onderscheidt ze.",
              "Voeg het label toe waar de waarde naast staat, of het paginagebied waarin ze verschijnt.",
            ],
            [
              "Een veld komt leeg terug",
              "De veldnaam alleen identificeerde het niet.",
              "Voeg twee of drie echte voorbeeldwaarden toe — meestal is dat op zich al genoeg.",
            ],
            [
              "Maar één regel, terwijl er veel zijn",
              "Het is gedefinieerd als metadataveld.",
              "Definieer het opnieuw als tabelveld.",
            ],
            [
              "Dezelfde waarde herhaald op elke rij",
              "Een waarde op documentniveau is gedefinieerd als tabelveld.",
              "Definieer het opnieuw als metadataveld.",
            ],
            [
              "Getallen die een factor honderd afwijken",
              "Decimaal- en duizendtalscheidingstekens zijn andersom gelezen.",
              "Stel een verwacht bereik in en normaliseer het formaat in een Cleaner.",
            ],
            [
              "Voorloopnullen of letters verdwijnen",
              "Het veld is getypeerd als Getal.",
              "Wijzig het naar Gemengd/Alfanumeriek.",
            ],
            [
              "Kolommen worden met elkaar verward",
              "Twee kolommen hebben vergelijkbare koppen.",
              "Voeg de gedrukte kolomkoppen toe en beschrijf de kolom in Aanvullende info.",
            ],
            [
              "Goed bij sommige leveranciers, slecht bij andere",
              "De hints beschrijven de lay-out van één leverancier.",
              "Voeg de label- en kopvarianten van de andere leveranciers toe aan hetzelfde veld.",
            ],
            [
              "Onleesbare tekst uit een bestand dat digitaal lijkt",
              "De ingebedde tekstlaag van de PDF is kapot.",
              "Zet Slechte scan aan zodat de Flow het met OCR leest.",
            ],
            [
              "Een spreadsheet komt leeg of onvolledig terug",
              "De data staat niet op het eerste zichtbare werkblad.",
              "Verplaats ze naar het eerste werkblad, of gebruik een Splitter voor werkmappen met meerdere werkbladen.",
            ],
          ]}
        />
        <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Verander één ding tegelijk">
          Verwerk hetzelfde document opnieuw na elke wijziging. Pas je vier hints tegelijk aan en
          verwerk je opnieuw, dan weet je dat het resultaat beter werd, maar niet door welke wijziging
          — en een van de vier kan het juist slechter hebben gemaakt.
        </InfoBox>
        <InfoBox color="blue" icon={<Wand2 size={20} />} title="Corrigeer de data, niet de extractie">
          Is de waarde goed maar het formaat niet — datums, valuta, eenheden, hoofdletters — laat de
          Flow dan met rust en voeg een <DocLink href="/docs/cleaners">Cleaner</DocLink> toe.
        </InfoBox>
      </DocCard>

      <Related
        links={[
          {
            href: "/docs/cleaners",
            label: "Normaliseer en verrijk wat een Flow extraheert",
            description:
              "Datums herformatteren, valuta omrekenen, totalen berekenen en rijen markeren die een regel overtreden.",
          },
          {
            href: "/docs/email-integration",
            label: "Documenten per e-mail naar een Flow sturen",
            description:
              "Het inboxadres, toegestane afzenders, verwerking van de e-mailtekst en de e-mailoutput.",
          },
          {
            href: "/docs/collections",
            label: "Documenten automatisch naar de juiste Flow sturen",
            description:
              "Waarom de naam en beschrijving van een Flow verder reiken dan extractienauwkeurigheid.",
          },
          {
            href: "/docs/api-integration",
            label: "Een Flow starten vanuit je eigen code",
            description:
              "De Flow-ID, authenticatie met een API-sleutel, en voorbeelden in Python en JavaScript.",
          },
          {
            href: "/docs/webhooks",
            label: "De payload bekijken die een Flow oplevert",
            description:
              "Hoe metadatavelden en tabelvelden verschijnen in de JSON die je endpoint ontvangt.",
          },
        ]}
      />
    </section>
  );
}
