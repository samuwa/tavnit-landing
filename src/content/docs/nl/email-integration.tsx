import { Fragment } from "react";
import {
  AlertTriangle,
  AtSign,
  Code2,
  Copy,
  ExternalLink,
  FileSpreadsheet,
  Info,
  LifeBuoy,
  Mail,
  Paperclip,
  Send,
  ShieldCheck,
  Workflow,
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
  WarningBox,
} from "@/components/docs/ui";
import type { DocsPageSchemaData } from "../types";

/** /nl/docs/email-integration — translated from src/app/docs/email-integration/page.tsx. */

/** Mirrors the visible numbered steps under "De e-mailtrigger inschakelen". */
export const schema: DocsPageSchemaData = {
  howTo: {
    name: "Gegevens uit e-mailbijlagen extraheren met een Tavnit-e-mailtrigger",
    description:
      "Schakel de e-mailtrigger van een Tavnit-Flow in om een eigen inboxadres te krijgen en stuur er documenten naartoe door. Elke ondersteunde bijlage wordt een eigen extractie-Run.",
    steps: [
      {
        name: "De Flow openen",
        text: "Ga in de Tavnit-app naar Flows en open de Flow die documenten moet ontvangen.",
      },
      {
        name: "De e-mailtrigger inschakelen",
        text: "Open het paneel E-mailtrigger op de detailpagina van de Flow en zet het aan. Het Inboxadres van de Flow verschijnt.",
      },
      {
        name: "Het adres kopiëren",
        text: "Klik op Kopiëren naast het Inboxadres. Voeg in hetzelfde paneel eventueel Toegestane afzenders toe of zet E-mailtekst verwerken aan.",
      },
      {
        name: "Een testdocument sturen",
        text: "Mail één PDF naar het adres en houd de pagina Runs in de gaten. Er verschijnt een nieuwe Run met de bron E-mail.",
      },
      {
        name: "Het doorsturen automatiseren",
        text: "Werkt de test, voeg dan in je mailprogramma of gedeelde inbox een regel toe die passende berichten automatisch naar het adres doorstuurt.",
      },
    ],
  },
};

export default function EmailIntegrationNl() {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        E-mailintegratie
      </h1>

      <DocCard icon={<Mail size={24} />} title="Hoe e-mailverwerking werkt">
        <Lead>
          Elke Tavnit-Flow kan een eigen inboxadres hebben. Als je de e-mailtrigger inschakelt en een
          document naar dat adres stuurt, neemt Tavnit elke ondersteunde bijlage, maakt er een aparte
          extractie-Run voor aan en verwerkt die precies alsof je hem in de app had geüpload.
        </Lead>
        <p>
          Er wordt niets geïnstalleerd en niets controleert je mailbox: jij stuurt mail door naar het
          adres en Tavnit reageert. Dat maakt het de kortste weg van &bdquo;facturen komen per
          e-mail binnen&rdquo; naar &bdquo;facturen komen binnen als gestructureerde rijen&rdquo;,
          zonder code. Collections, Splitters, Pipelines, Matchers en Subjects hebben ook hun eigen
          adressen.
        </p>
        <BulletList
          items={[
            "Facturen of bonnen rechtstreeks vanuit je inbox doorsturen",
            "Een gedeelde crediteurenmailbox met een regel voor automatisch doorsturen",
            "Leveranciers documenten laten insturen zonder ze een Tavnit-login te geven",
            "Gegevens extraheren die in het bericht zelf staan, zoals orderbevestigingen zonder bijlage",
          ]}
        />
      </DocCard>

      <DocCard icon={<ExternalLink size={24} />} title="De e-mailtrigger inschakelen">
        <Lead>
          De trigger staat standaard uit. Zet hem aan op de detailpagina van de Flow, kopieer het
          adres dat je krijgt en stuur één document als test voordat je er een doorstuurregel op
          richt.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f0">
              Ga naar <strong>Flows</strong> en open de Flow die documenten moet ontvangen.
            </Fragment>,
            <Fragment key="f1">
              Open het paneel <strong>E-mailtrigger</strong> en zet het aan. Het{" "}
              <strong>Inboxadres</strong> van de Flow verschijnt.
            </Fragment>,
            <Fragment key="f2">
              Klik op <strong>Kopiëren</strong> naast het adres. In hetzelfde paneel kun je{" "}
              <strong>Toegestane afzenders</strong> toevoegen of{" "}
              <strong>E-mailtekst verwerken</strong> aanzetten (beide hieronder uitgelegd).
            </Fragment>,
            <Fragment key="f3">
              Stuur er één PDF naartoe en kijk op de pagina <strong>Runs</strong>. Er verschijnt een
              nieuwe Run met de bron <strong>E-mail</strong>, en het adres van de afzender wordt op de
              Run vastgelegd.
            </Fragment>,
            "Werkt dat, voeg dan de doorstuurregel toe in je mailprogramma of gedeelde inbox.",
          ]}
        />
        <InfoBox color="blue" icon={<Info size={20} />} title="Eén Run per bijlage">
          Een e-mail met drie bijgevoegde facturen levert drie aparte Runs op, elk met een eigen
          resultaat en een eigen regel in de lijst Runs. Het levert geen één Run met drie documenten
          op.
        </InfoBox>
        <WarningBox>
          Mail naar een adres waarvan de trigger uitstaat (of naar een inactieve Collection) wordt
          geaccepteerd en weggegooid: de afzender krijgt geen bounce en geen foutmelding. Lijken
          documenten te verdwijnen, controleer dan eerst de schakelaar.
        </WarningBox>
      </DocCard>

      <DocCard icon={<ShieldCheck size={24} />} title="Toegestane afzenders">
        <Lead>
          Standaard kan elke afzender een Run starten door naar het adres te mailen. Voeg in het
          paneel E-mailtrigger adressen toe aan <strong>Toegestane afzenders</strong> en alleen die
          afzenders worden geaccepteerd; mail van anderen wordt zonder melding weggegooid.
        </Lead>
        <BulletList
          items={[
            "Items zijn volledige e-mailadressen, geen domeinen. Bij het vergelijken worden hoofdletters en weergavenamen genegeerd.",
            "Laat de lijst leeg om e-mail van elke afzender te accepteren.",
            "De lijst is beschikbaar op de e-mailtrigger van Flows, Collections, Splitters, Pipelines, Matchers en Subjects.",
            <Fragment key="f4">
              Stuur je door via een gedeelde mailbox, dan is de afzender die Tavnit ziet meestal de
              mailbox die doorstuurt, dus dat is het adres dat je moet toestaan.
            </Fragment>,
          ]}
        />
      </DocCard>

      <DocCard icon={<Mail size={24} />} title="De e-mailtekst verwerken">
        <Lead>
          Sommige gegevens komen nooit als bijlage binnen: een orderbevestiging, een
          boekingsmelding, een leverancier die de aantallen in het bericht zet. Zet{" "}
          <strong>E-mailtekst verwerken</strong> aan en Tavnit zet de tekst van het bericht om naar
          een PDF en verwerkt die zoals elk ander document. Het is beschikbaar op Flows en
          Collections.
        </Lead>
        <DataTable
          head={["Modus", "Wat er gebeurt"]}
          rows={[
            [
              <Fragment key="f5"><strong>Alleen als er niets is bijgevoegd</strong> (standaard)</Fragment>,
              "De tekst wordt alleen verwerkt als de e-mail geen documentbijlage heeft. Een begeleidend „zie bijlage” naast een factuur wordt overgeslagen, zodat één e-mail nooit twee Runs start.",
            ],
            [
              <Fragment key="f6"><strong>Altijd</strong></Fragment>,
              "De tekst wordt naast elke bijlage verwerkt, elk in een eigen Run.",
            ],
          ]}
        />
        <BulletList
          items={[
            "De PDF van de tekst verschijnt bij de beoordeling zoals elk ander document, en de Run wordt gemarkeerd als afkomstig uit de e-mailtekst.",
            "Geciteerde antwoordketens en handtekeningen worden weggelaten waar de mailprovider ze kan herkennen.",
            "Afbeeldingen in het bericht worden niet gelezen. Ingesloten handtekeningafbeeldingen tellen niet als bijlagen bij de beslissing of de tekst verwerkt moet worden.",
            "Een tekst met bijna geen inhoud („ok”, „bedankt”, een lege doorgestuurde mail) wordt niet verwerkt.",
          ]}
        />
      </DocCard>

      <DocCard icon={<AtSign size={24} />} title="Welke functies een e-mailadres hebben">
        <Lead>
          De e-mailtrigger is niet beperkt tot Flows. Richt een adres op een hele sorteerstap, een
          Pipeline of een vergelijking in plaats van op één documenttype.
        </Lead>
        <DataTable
          head={["Stuur naar", "Vorm van het adres", "Wat er gebeurt"]}
          rows={[
            [
              "Een Flow",
              <Fragment key="f7"><InlineCode>flow-name-&lt;id&gt;@mg.tavnit.io</InlineCode></Fragment>,
              "Elke bijlage wordt door die Flow geëxtraheerd.",
            ],
            [
              "Een Collection",
              <Fragment key="f8"><InlineCode>name-&lt;id&gt;-collection@mg.tavnit.io</InlineCode></Fragment>,
              <Fragment key="f9">
                Elke bijlage wordt geclassificeerd en naar de juiste Flow of Splitter geleid. Zie{" "}
                <DocLink href="/docs/collections">hoe Collections documenten routeren</DocLink>.
              </Fragment>,
            ],
            [
              "Een Splitter",
              <Fragment key="f10"><InlineCode>&lt;id&gt;-splitter@mg.tavnit.io</InlineCode></Fragment>,
              <Fragment key="f11">
                Elke bijlage wordt eerst in haar afzonderlijke documenten opgesplitst. Zie{" "}
                <DocLink href="/docs/splitters">bestanden met meerdere documenten splitsen</DocLink>.
              </Fragment>,
            ],
            [
              "Een Pipeline",
              <Fragment key="f12"><InlineCode>&lt;id&gt;-pipeline@mg.tavnit.io</InlineCode></Fragment>,
              <Fragment key="f13">
                Elke PDF- of afbeeldingsbijlage start één uitvoering. Zie{" "}
                <DocLink href="/docs/pipelines">Pipelines</DocLink>.
              </Fragment>,
            ],
            [
              "Een Matcher",
              <Fragment key="f14"><InlineCode>&lt;id&gt;-matcher@mg.tavnit.io</InlineCode></Fragment>,
              <Fragment key="f15">
                Alle PDF- of afbeeldingsbijlagen van één e-mail worden samen vergeleken in één match
                (altijd in multilaterale modus), en het resultaat wordt in dezelfde thread
                beantwoord. Zie <DocLink href="/docs/matchers">Matchers</DocLink>.
              </Fragment>,
            ],
            [
              "Een Subject",
              <Fragment key="f16"><InlineCode>&lt;id&gt;-subject@mg.tavnit.io</InlineCode></Fragment>,
              <Fragment key="f17">
                Elke bijlage wordt in de juiste case opgeborgen aan de hand van een referentie in de
                onderwerpregel, de tekst of de bestandsnaam, of via het eigen plus-adres van de case.
                Zie <DocLink href="/docs/subjects">Subjects</DocLink>.
              </Fragment>,
            ],
          ]}
          caption="Kopieer het exacte adres uit het paneel E-mailtrigger van de functie; de vormen hierboven helpen je alleen ze uit elkaar te houden."
        />
        <InfoBox color="violet" icon={<Workflow size={20} />} title="Welk adres moeten leveranciers gebruiken?">
          Stuurt een afzender altijd maar één documenttype, geef hem dan het adres van de Flow.
          Stuurt hij een mix (facturen, inkooporders, pakbonnen), geef hem dan het adres van de
          Collection en laat Tavnit het sorteren. Stuurt hij één PDF met meerdere documenten, geef hem
          dan het adres van de Splitter.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Paperclip size={24} />} title="Wat Tavnit accepteert">
        <Lead>
          Flows, Collections, Splitters en Subjects lezen PDF&apos;s, gangbare afbeeldingen en
          spreadsheets. Pipelines en Matchers lezen alleen PDF&apos;s en afbeeldingen. Al het andere in
          het bericht wordt overgeslagen zonder dat de rest mislukt: één niet-ondersteund bestand
          houdt de verwerking van de andere bijlagen niet tegen.
        </Lead>
        <DataTable
          head={["Geaccepteerd", "Extensies"]}
          rows={[
            ["PDF-documenten", <Fragment key="f18"><InlineCode>.pdf</InlineCode></Fragment>],
            [
              "Afbeeldingen",
              <Fragment key="f19"><InlineCode>.png .jpg .jpeg .jfif .tif .tiff .webp .bmp .gif</InlineCode></Fragment>,
            ],
            [
              "Spreadsheets (niet bij Pipelines of Matchers)",
              <Fragment key="f20"><InlineCode>.xlsx .xls .csv</InlineCode></Fragment>,
            ],
          ]}
        />
        <p>Een bijlage wordt overgeslagen in plaats van verwerkt als een van deze punten geldt:</p>
        <DataTable
          head={["Reden van overslaan", "Hoe het eruitziet"]}
          rows={[
            [
              "Niet-ondersteund bestandstype",
              "Word-documenten, archieven, doorgestuurde .eml-berichten en alles zonder herkende extensie.",
            ],
            ["Lege bijlage", "Een bestand van nul bytes, meestal een kapotte doorgestuurde mail."],
            [
              "Onleesbaar bestand",
              "Het bestand heeft een geldige extensie maar kan niet worden geopend: een afgebroken download, een hernoemd bestand of een spreadsheet die niet te verwerken is.",
            ],
          ]}
        />
        <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Handtekeningafbeeldingen tellen als bijlagen">
          Een logo in een e-mailhandtekening komt vaak binnen als afbeeldingsbijlage, en een Flow
          verwerkt die zoals elke andere afbeelding. Levert dat ongewenste Runs op, stuur dan alleen de
          documenten door, of gebruik Toegestane afzenders en een doorstuurregel die ingesloten
          afbeeldingen verwijdert.
        </InfoBox>
        <p>
          De limiet voor bijlagegrootte van je mailprovider geldt al voordat Tavnit het bericht ziet.
          Wordt een grote scan aan de verzendkant teruggestuurd, upload hem dan in de app of stuur hem
          naar de <DocLink href="/docs/api-integration">REST API</DocLink>.
        </p>
      </DocCard>

      <DocCard icon={<FileSpreadsheet size={24} />} title="Hoe spreadsheets worden verwerkt">
        <Lead>
          Een spreadsheetbijlage wordt behandeld als een document, niet als een tabel om te
          importeren. Wat er gebeurt, hangt af van waar je hem naartoe stuurt.
        </Lead>
        <DataTable
          head={["Gestuurd naar", "Wat Tavnit doet"]}
          rows={[
            ["Een Flow", "Extraheert uit het eerste zichtbare blad."],
            [
              "Een Collection",
              "Classificeert het bestand op basis van het eerste blad en geeft het daarna aan de gekozen Flow, die het eerste zichtbare blad leest.",
            ],
            [
              "Een Splitter",
              "Behandelt elk zichtbaar, niet-leeg blad als een eigen document, classificeert elk blad en stuurt het door als bestand met één blad.",
            ],
          ]}
        />
        <p>
          Zeer grote bladen worden met een foutmelding geweigerd. Wil je een spreadsheet in plaats
          daarvan als gestructureerde rijen inladen, gebruik dan een Sweep van een{" "}
          <DocLink href="/docs/cleaners">Cleaner</DocLink>.
        </p>
      </DocCard>

      <DocCard icon={<Copy size={24} />} title="Bescherming tegen duplicaten">
        <Lead>
          Mailservers leveren hetzelfde bericht soms meer dan eens af, bijvoorbeeld na een time-out.
          Tavnit herkent een opnieuw afgeleverd bericht aan hetzelfde adres en verwerkt het niet
          nogmaals, dus een nieuwe poging levert nooit dubbele Runs op.
        </Lead>
        <BulletList
          items={[
            "Tavnit bevestigt het bericht binnen enkele seconden en verwerkt de bijlagen op de achtergrond, dus je kunt gerust een e-mail met veel bijlagen sturen.",
            "Wordt de verwerking onderbroken, dan gaat ze verder waar ze stopte in plaats van opnieuw te beginnen.",
            "Eén bericht dat naar twee verschillende Tavnit-adressen is gestuurd, wordt op elk adres één keer verwerkt.",
            "Hetzelfde bestand opnieuw sturen in een nieuwe e-mail is een nieuw bericht en wordt opnieuw verwerkt.",
          ]}
        />
      </DocCard>

      <DocCard icon={<Send size={24} />} title="De resultaten terugmailen">
        <Lead>
          E-mailoutput is de terugweg: als een Run succesvol klaar is, mailt Tavnit het resultaat naar
          de adressen die je instelt. Het staat los van de e-mailtrigger: je kunt elk van beide
          afzonderlijk gebruiken, of allebei voor een volledige kringloop van insturen en terugkrijgen.
        </Lead>
        <NumberedList
          items={[
            "Open de detailpagina van de Flow.",
            <Fragment key="f21">
              Open het paneel <strong>E-mailoutput</strong>.
            </Fragment>,
            <Fragment key="f22">
              Voeg een of meer <strong>Ontvangersadressen</strong> toe.
            </Fragment>,
            <Fragment key="f23">
              Kies onder <strong>Bijlagen</strong> wat elk bericht bevat en sla op.
            </Fragment>,
          ]}
        />
        <DataTable
          head={["Optie", "Wat er binnenkomt"]}
          rows={[
            ["JSON-extractie", "Het geëxtraheerde resultaat als opgemaakte JSON in de tekst van het bericht."],
            [
              "CSV-extractie",
              <Fragment key="f24">
                De rijen als bijlage <InlineCode>rows.csv</InlineCode>, de snelste manier om resultaten
                in een spreadsheet te krijgen.
              </Fragment>,
            ],
            ["Formulierresultaten", "De ingevulde PDF's, als de Flow een formuliersjabloon invult."],
            [
              "Origineel document",
              "Het bronbestand (PDF, afbeelding of spreadsheet) dat is verwerkt, naast de resultaten bijgevoegd.",
            ],
          ]}
        />
        <InfoBox color="purple" icon={<Code2 size={20} />} title="Bestandsvelden komen binnen als links">
          Velden met een bestand of afbeelding worden niet in de JSON ingesloten. Ze komen binnen als
          links met een beperkte geldigheid, omdat Tavnit opgeslagen documenten privé houdt: een kaal
          opslagpad zou vanuit een inbox niet op te halen zijn.
        </InfoBox>
        <BulletList
          items={[
            "Uitgaande e-mail wordt alleen verstuurd voor Runs die succesvol zijn voltooid. Een mislukte Run verstuurt niets.",
            "De onderwerpregel bevat de naam van de Flow plus een detail per Run, zodat mailprogramma's niet alle Runs van een Flow in één thread samenvoegen.",
            <Fragment key="f25">
              Heeft de Flow <DocLink href="/docs/human-in-the-loop">menselijke beoordeling</DocLink>{" "}
              ingeschakeld, dan wacht de e-mail tot een beoordelaar de Run goedkeurt.
            </Fragment>,
            <Fragment key="f26">
              Voor levering van machine naar machine is een{" "}
              <DocLink href="/docs/webhooks">webhook</DocLink> geschikter dan e-mail.
            </Fragment>,
          ]}
        />
      </DocCard>

      <DocCard icon={<Workflow size={24} />} title="Uitgewerkt voorbeeld: een crediteureninbox">
        <Lead>
          De gebruikelijke opzet is een gedeelde mailbox die al facturen van leveranciers ontvangt en
          die doorstuurt naar een Collection, zodat het formaat van elke leverancier in de juiste Flow
          terechtkomt, met de resultaten gemaild naar het financeteam en weggeschreven naar een
          Bucket.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f27">
              Bouw één Flow per documenttype dat je ontvangt, bijvoorbeeld{" "}
              <em>Leveranciersfacturen</em> en <em>Pakbonnen</em>, en geef elk een duidelijke
              beschrijving.
            </Fragment>,
            <Fragment key="f28">
              Zet beide Flows in een <DocLink href="/docs/collections">Collection</DocLink> en schakel
              de e-mailtrigger van de Collection in. Voeg de gedeelde mailbox toe aan Toegestane
              afzenders.
            </Fragment>,
            <Fragment key="f29">
              Stuur in de gedeelde mailbox elk bericht met een bijlage van de domeinen van je
              leveranciers door naar het adres van de Collection.
            </Fragment>,
            <Fragment key="f30">
              Zet bij elke Flow <strong>E-mailoutput</strong> aan met de CSV-bijlage voor het
              financeteam, en voeg een{" "}
              <DocLink href="/docs/buckets">Bucket-export</DocLink> toe zodat de gegevens zich in één
              tabel verzamelen.
            </Fragment>,
            <Fragment key="f31">
              Voeg een <DocLink href="/docs/cleaners">Cleaner</DocLink> toe met een voorwaardelijke
              actie die alles boven je goedkeuringsdrempel naar{" "}
              <DocLink href="/docs/human-in-the-loop">menselijke beoordeling</DocLink> stuurt
              voordat het wordt geleverd.
            </Fragment>,
          ]}
        />
        <p>
          Niemand bij finance hoeft Tavnit te openen. Facturen komen binnen waar ze altijd al
          binnenkwamen, en de gestructureerde gegevens komen terug in dezelfde inbox.
        </p>
      </DocCard>

      <DocCard icon={<LifeBuoy size={24} />} title="Problemen oplossen">
        <Lead>
          Omdat inkomende mail zonder melding wordt geaccepteerd, laat een document dat niet opduikt
          geen foutmelding in je inbox achter. Loop deze lijst af: de oorzaak is bijna altijd de
          schakelaar van de trigger, Toegestane afzenders, het type bijlage of een doorstuurregel die
          bijlagen verwijdert.
        </Lead>
        <DataTable
          head={["Symptoom", "Waarschijnlijke oorzaak", "Oplossing"]}
          rows={[
            [
              "Er verschijnt helemaal geen Run",
              "De e-mailtrigger staat uit, het adres hoort bij een andere Flow, of de afzender staat niet in Toegestane afzenders.",
              "Controleer de schakelaar en de lijst Toegestane afzenders opnieuw, en kopieer het adres nogmaals uit het paneel E-mailtrigger.",
            ],
            [
              "Sommige bijlagen verwerkt, andere niet",
              "De ontbrekende zijn van een niet-ondersteund type, leeg of onleesbaar.",
              "Vergelijk de extensies met de lijst van geaccepteerde bestanden hierboven.",
            ],
            [
              "Alleen de handtekeningafbeelding is verwerkt",
              "Het echte document was niet bijgevoegd: het was gelinkt, of het doorsturen heeft het laten vallen.",
              "Stuur door als bijlage in plaats van inline, en controleer dat de regel bijlagen behoudt.",
            ],
            [
              "Een e-mail zonder bijlage deed niets",
              "E-mailtekst verwerken staat uit, of de tekst bevatte bijna niets.",
              "Zet E-mailtekst verwerken aan in het paneel E-mailtrigger (Flows en Collections).",
            ],
            [
              "Het begeleidende bericht leverde een eigen Run op",
              "E-mailtekst verwerken staat op Altijd.",
              "Zet de modus op Alleen als er niets is bijgevoegd.",
            ],
            [
              "Runs verschijnen maar mislukken",
              "Het probleem zit in het document zelf, niet in de e-mailroute.",
              "Open de Run en lees het logboek; de fout is een extractieprobleem.",
            ],
            [
              "Resultaten komen nooit per e-mail binnen",
              "E-mailoutput is niet ingesteld, de Run is mislukt, of hij wacht op beoordeling.",
              "Controleer eerst de status van de Run, daarna de instellingen van E-mailoutput.",
            ],
          ]}
        />
      </DocCard>

      <Related
        links={[
          {
            href: "/docs/collections",
            label: "Gemengde documenten automatisch routeren met Collections",
            description:
              "Richt één e-mailadres op meerdere Flows en laat Tavnit per document de juiste kiezen.",
          },
          {
            href: "/docs/splitters",
            label: "Bestanden met meerdere documenten splitsen vóór de extractie",
            description: "Voor afzenders die meerdere documenten in één bijlage bundelen.",
          },
          {
            href: "/docs/webhooks",
            label: "Resultaten met webhooks aan je eigen systemen leveren",
            description:
              "Het machineleesbare alternatief voor E-mailoutput, met nieuwe pogingen bij fouten.",
          },
          {
            href: "/docs/api-integration",
            label: "Documenten insturen via de REST API",
            description:
              "Voor volumes en bestandsgroottes die e-mail niet aankan, met expliciete foutafhandeling.",
          },
        ]}
      />
    </section>
  );
}
