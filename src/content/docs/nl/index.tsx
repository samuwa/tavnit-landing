import { Fragment } from "react";
import {
  Clock,
  Compass,
  FilePlus,
  FlaskConical,
  Info,
  Map,
  Rocket,
  Sparkles,
  Table2,
} from "lucide-react";
import {
  BulletList,
  DataTable,
  DocCard,
  DocLink,
  InfoBox,
  Lead,
  NumberedList,
  Related,
  Screenshot,
} from "@/components/docs/ui";
import type { DocsPageSchemaData } from "../types";

/** /nl/docs — translated from src/app/docs/page.tsx. */

/** Mirrors the visible numbered steps under "Stap 1: een Flow maken". */
export const schema: DocsPageSchemaData = {
  howTo: {
    name: "Gestructureerde data uit een document halen met Tavnit",
    description:
      "Maak een Tavnit-Flow vanuit een sjabloon, vanuit een voorbeelddocument of vanaf nul, controleer de velden, verwerk een document en lees het gestructureerde resultaat — zonder sjablonen te tekenen en zonder code.",
    steps: [
      {
        name: "Het aanmaakvenster openen",
        text: "Klik op de pagina Flows op Flow maken.",
      },
      {
        name: "Een startpunt kiezen",
        text: "Kies Vanuit een sjabloon (een Tavnit-sjabloon of een kopie van een van je Flows), AI-suggestie (upload een voorbeeld-PDF of -afbeelding en de AI stelt de velden op) of Vanaf nul beginnen.",
      },
      {
        name: "De Flow een naam en beschrijving geven",
        text: "Geef de Flow een naam van minstens 3 tekens en een beschrijving van minstens 10 tekens die zegt welke documenten hij verwerkt.",
      },
      {
        name: "Het dataschema controleren",
        text: "Voeg in de editor velden toe, bewerk of verwijder ze tot het schema precies is wat je nodig hebt. Een nieuwe Flow is al Actief.",
      },
      {
        name: "Een document verwerken",
        text: "Klik op Uitvoeren, upload één echt document en controleer het resultaat.",
      },
    ],
  },
  primaryImage: {
    url: "/assets/tour2-runs.jpg",
    caption:
      "De pagina Runs in Tavnit, met elk verwerkt document, de Flow, de bron en de status.",
    width: 1327,
    height: 801,
  },
};

export default function GettingStartedNl() {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        Aan de slag
      </h1>

      <DocCard icon={<Sparkles size={24} />} title="Wat Tavnit doet">
        <Lead>
          Tavnit leest documenten en geeft je gestructureerde data terug. Je beschrijft één keer de
          velden die je wilt, stuurt facturen, bonnen, inkooporders, afschriften, spreadsheets of
          formulieren in en krijgt getypeerde rijen terug — zonder per lay-out een sjabloon te bouwen
          of parsingcode te schrijven.
        </Lead>
        <p>
          Extractie is het startpunt, niet het hele product. Daaromheen kan Tavnit binnenkomende
          bestanden sorteren en splitsen, de rijen opschonen en verrijken, documenten met elkaar
          vergelijken en controleren, formulieren invullen, pauzeren zodat iemand meekijkt,
          resultaten in tabellen opslaan, ze aan je systemen leveren en ze overdragen aan een
          browser-agent die ermee aan de slag gaat. Deze pagina geeft je het overzicht en begeleidt je
          bij je eerste document.
        </p>
        <InfoBox color="violet" icon={<FlaskConical size={20} />} title="Sommige onderdelen zijn in bèta">
          Pipelines, Subjects, Matchers, Inspectors, Fillers, Signals en Nets hebben in de app het
          label <strong>Bèta</strong>. Je kunt ze vandaag al gebruiken, maar hun schermen en opties
          kunnen nog veranderen.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Compass size={24} />} title="Een kaart van Tavnit">
        <Lead>
          De zijbalk van de app groepeert elk onderdeel naar de taak die het doet, van documenten
          binnenhalen tot handelen op basis van de data. De documentatie volgt dezelfde groepen, dus
          deze tabel is meteen ook een inhoudsopgave.
        </Lead>
        <DataTable
          head={["Groep", "Onderdeel", "Wat het doet"]}
          rows={[
            [
              "Invoer",
              <Fragment key="m0">
                <DocLink href="/docs/collections">Collections</DocLink>
              </Fragment>,
              "Eén inbox of endpoint voor gemengde documenten: elk document wordt geclassificeerd en naar de juiste Flow gestuurd.",
            ],
            [
              "Invoer",
              <Fragment key="m1">
                <DocLink href="/docs/subjects">Subjects</DocLink>
              </Fragment>,
              "Modelleer een entiteit zoals een aankoop of een patiënt en verzamel de documenten op referentie in dossiers.",
            ],
            [
              "Invoer",
              <Fragment key="m2">
                <DocLink href="/docs/splitters">Splitters</DocLink>
              </Fragment>,
              "Knip één bestand met meerdere documenten op in losse documenten en stuur elk ervan door.",
            ],
            [
              "Verwerking",
              <Fragment key="m3">
                <DocLink href="/docs/flows">Flows</DocLink>
              </Fragment>,
              "Het schema voor één documenttype: de velden die je wilt extraheren en alles wat eraan vastzit. Hier begint alles.",
            ],
            [
              "Verwerking",
              <Fragment key="m4">
                <DocLink href="/docs/cleaners">Cleaners</DocLink>
              </Fragment>,
              "Geëxtraheerde rijen herformatteren, omrekenen, berekenen, opzoeken en valideren, en acties starten als er iets niet klopt.",
            ],
            [
              "Verwerking",
              <Fragment key="m5">
                <DocLink href="/docs/agents">Agents</DocLink>
              </Fragment>,
              "Browser-agents die een in gewone taal beschreven opdracht op een website uitvoeren, vaak met geëxtraheerde data als invoer.",
            ],
            [
              "Intelligentie",
              <Fragment key="m6">
                <DocLink href="/docs/matchers">Matchers</DocLink>
              </Fragment>,
              "Records regel voor regel vergelijken over documenten heen — offertes onderling, een factuur met de bijbehorende order.",
            ],
            [
              "Intelligentie",
              <Fragment key="m7">
                <DocLink href="/docs/inspectors">Inspectors</DocLink>
              </Fragment>,
              "Een checklist over een set samenhorende documenten laten lopen en een oordeel “geslaagd” of “niet geslaagd” krijgen.",
            ],
            [
              "Intelligentie",
              <Fragment key="m8">
                <DocLink href="/docs/fillers">Fillers</DocLink>
              </Fragment>,
              "PDF-formuliersjablonen invullen met data uit je documenten.",
            ],
            [
              "Orkestratie",
              <Fragment key="m9">
                <DocLink href="/docs/pipelines">Pipelines</DocLink>
              </Fragment>,
              "Stappen van begin tot eind aan elkaar koppelen op een visueel canvas.",
            ],
            [
              "Orkestratie",
              <Fragment key="m10">
                <DocLink href="/docs/pipeline-map">Pipeline-kaart</DocLink>
              </Fragment>,
              "Eén beeld van hoe documenten door je organisatie bewegen.",
            ],
            [
              "Data & activiteit",
              <Fragment key="m11">
                <DocLink href="/docs/buckets">Buckets</DocLink>
              </Fragment>,
              "Tabellen waarin resultaten zich over Runs heen opstapelen, klaar om te bevragen, in grafieken te zetten en te exporteren.",
            ],
            [
              "Data & activiteit",
              <Fragment key="m12">
                <DocLink href="/docs/flows#runs">Runs</DocLink>
              </Fragment>,
              "De geschiedenis van elk verwerkt document, met het resultaat, het bronbestand en het logboek.",
            ],
            [
              "Data & activiteit",
              <Fragment key="m13">
                <DocLink href="/docs/human-in-the-loop">Menselijke beoordeling</DocLink>
              </Fragment>,
              "Een beoordelingswachtrij waarin iemand resultaten goedkeurt, bewerkt of afwijst voordat ze worden geleverd.",
            ],
            [
              "Audio",
              <Fragment key="m14">
                <DocLink href="/docs/signals">Signals</DocLink>
              </Fragment>,
              "Opgenomen gesprekken omzetten in gestructureerde rijen.",
            ],
            [
              "Sociaal",
              <Fragment key="m15">
                <DocLink href="/docs/nets">Nets</DocLink>
              </Fragment>,
              "Socialemediaberichten omzetten in gestructureerde rijen en trends.",
            ],
          ]}
        />
        <InfoBox color="blue" icon={<Info size={20} />} title="Zie je Agents, Signals of Nets niet?">
          Deze drie onderdelen worden per organisatie ingeschakeld. Ontbreken ze in je zijbalk, neem
          dan contact op met het Tavnit-team om ze te laten activeren.
        </InfoBox>
        <InfoBox color="violet" icon={<Info size={20} />} title="Welke sorteert mijn documenten?">
          Bevat elk bestand één document maar weet je het type niet, gebruik dan een{" "}
          <DocLink href="/docs/collections">Collection</DocLink>. Bevat één bestand meerdere
          documenten, gebruik dan een <DocLink href="/docs/splitters">Splitter</DocLink>. Horen
          documenten bij elkaar — dezelfde aankoop, dezelfde patiënt — gebruik dan een{" "}
          <DocLink href="/docs/subjects">Subject</DocLink>. Weet je al welk document het is, stuur het
          dan rechtstreeks naar de Flow en sla alle drie over.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Rocket size={24} />} title="Je eerste minuten">
        <Lead>
          Een nieuwe organisatie begint met een kort instelpad, dus je staat zelden voor een leeg
          scherm.
        </Lead>
        <BulletList
          items={[
            <Fragment key="o0">
              <strong>Welkomstvragen.</strong> Nadat je je organisatie hebt aangemaakt, stelt Tavnit
              vier korte vragen: welke documenten je gaat verwerken, wat je wilt bereiken, hoe je
              documenten nu binnenkomen en hoeveel je er ongeveer per maand verwerkt. Dat kost
              ongeveer 30 seconden, en je kunt ze <strong>Overslaan</strong>.
            </Fragment>,
            <Fragment key="o1">
              <strong>Start-Flows met één klik.</strong> Als je de vragen hebt beantwoord, toont de
              lege pagina Flows de sjablonen die bij je documenten passen onder{" "}
              <em>&ldquo;Op basis van je antwoorden kunnen we deze voor je instellen:&rdquo;</em>.
              Klik op <strong>Deze Flows maken</strong> en ze worden voor je aangemaakt, klaar om te
              bewerken.
            </Fragment>,
            <Fragment key="o2">
              <strong>Startsjablonen.</strong> Tavnit levert kant-en-klare Flows voor facturen,
              inkooporders, bonnen, bankafschriften, pakbonnen, labuitslagen, contracten, offertes,
              creditnota&apos;s, identiteitsdocumenten en cv&apos;s. Sjablonen die bij je antwoorden
              passen, worden eerst getoond.
            </Fragment>,
            <Fragment key="o3">
              <strong>De startgids.</strong> Een klein paneel in de hoek van de app met drie
              tabbladen: <strong>Checklist</strong> (instelstappen die zichzelf afvinken zodra je ze
              voltooit), <strong>Dit scherm</strong> (tips voor de pagina waar je bent) en{" "}
              <strong>Functies</strong> (elk onderdeel dat voor jou beschikbaar is). Verberg je het,
              open het dan opnieuw via het menu <strong>Hulp &amp; ondersteuning</strong>.
            </Fragment>,
          ]}
        />
      </DocCard>

      <DocCard icon={<FilePlus size={24} />} title="Stap 1: een Flow maken">
        <Lead>
          Een Flow is het schema voor één documenttype. Noem hem naar het document, niet naar het
          project — <em>Leveranciersfacturen</em>, niet <em>Automatisering Q1</em> — want de naam en
          de beschrijving zijn ook wat een Collection gebruikt om documenten naar hem door te sturen.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f5">
              Klik op de pagina <strong>Flows</strong> op <strong>Flow maken</strong>.
            </Fragment>,
            <Fragment key="f6">
              Kies een startpunt: <strong>Vanuit een sjabloon</strong> (een Tavnit-sjabloon, of een
              kopie van een van je eigen Flows onder <strong>Mijn Flows</strong>),{" "}
              <strong>AI-suggestie</strong> (upload een voorbeeld-PDF of -afbeelding en de AI stelt de
              velden op) of <strong>Vanaf nul beginnen</strong>.
            </Fragment>,
            <Fragment key="f7">
              Geef de Flow een naam van minstens 3 tekens en een beschrijving van minstens 10 tekens
              die zegt welke documenten hij verwerkt.
            </Fragment>,
            <Fragment key="f8">
              Voeg in de editor velden toe, bewerk of verwijder ze tot het schema precies is wat je
              nodig hebt. Een nieuwe Flow is al <strong>Actief</strong>.
            </Fragment>,
            <Fragment key="f9">
              Klik op <strong>Uitvoeren</strong>, upload één echt document en controleer het
              resultaat.
            </Fragment>,
          ]}
        />
        <p>
          <DocLink href="/docs/flows">Flows</DocLink> behandelt elk van deze stappen uitgebreid —
          veldsoorten, datatypes, de hints die de AI vertellen waar te kijken, en de knop{" "}
          <strong>Diagnose</strong> die correcties voorstelt zodra een Flow echte Runs heeft.
        </p>
        <InfoBox color="blue" icon={<Info size={20} />} title="De beschrijving telt">
          De beschrijving is verplicht, en ze verdient haar plek twee keer: ze helpt de AI
          nauwkeuriger te extraheren, en ze is wat een{" "}
          <DocLink href="/docs/collections">Collection</DocLink> in staat stelt documenten naar de
          Flow te sturen. Een vage beschrijving maakt allebei slechter.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Table2 size={24} />} title="Stap 2: metadatavelden en tabelvelden">
        <Lead>
          Tavnit maakt onderscheid tussen waarden die één keer per document voorkomen en waarden die
          zich herhalen. Dat ene onderscheid bepaalt de vorm van alles wat volgt — je
          webhook-payload, je Bucket-rijen en je CSV volgen het allemaal.
        </Lead>
        <DataTable
          head={["Veldsoort", "Komt voor", "Op een factuur"]}
          rows={[
            [
              "Metadataveld",
              "Eén keer per document",
              "Factuurnummer, factuurdatum, leverancier, totaal",
            ],
            [
              "Tabelveld",
              "Eén keer per regel",
              "Omschrijving, aantal, stuksprijs, bedrag",
            ],
          ]}
        />
        <p>
          Elk veld heeft ook een datatype — Tekst, Getal, Datum, Gemengd/Alfanumeriek of Afbeelding —
          en het juiste type kiezen is belangrijker dan het lijkt: een totaal dat als tekst is
          getypeerd, valt niet op te tellen, te vergelijken of in een grafiek te zetten. Een Flow met
          alleen metadatavelden levert één rij per document op.{" "}
          <DocLink href="/docs/flows">Flows</DocLink> behandelt het volledige schema, inclusief
          extractiehints, samengestelde velden en hoe je een veld corrigeert dat verkeerd terugkomt.
        </p>
      </DocCard>

      <DocCard icon={<Clock size={24} />} title="Stap 3: documenten insturen">
        <Lead>
          Vier manieren om documenten in te sturen, die allemaal hetzelfde soort Run opleveren. Begin
          met een handmatige upload om te bewijzen dat de Flow werkt, en stap dan over op de route die
          past bij hoe documenten je echt bereiken.
        </Lead>
        <DataTable
          head={["Route", "Geschikt voor", "Instellen"]}
          rows={[
            [
              "Uploaden in de app",
              "Testen, en losse documenten",
              "Niets. Selecteer meerdere bestanden tegelijk en elk wordt een eigen Run",
            ],
            [
              <Fragment key="f10">
                <DocLink href="/docs/email-integration">E-mail</DocLink>
              </Fragment>,
              "Documenten die al in een inbox binnenkomen",
              "Zet de E-mailtrigger van de Flow aan en stuur mail door naar het adres ervan",
            ],
            [
              <Fragment key="f11">
                <DocLink href="/docs/api-integration">REST API</DocLink>
              </Fragment>,
              "Je eigen systemen, en grote volumes",
              "Een API-sleutel en een POST",
            ],
            [
              <Fragment key="f12">
                <DocLink href="/docs/mcp-connector">MCP-connector</DocLink>
              </Fragment>,
              "Ad-hocwerk vanuit een AI-assistent",
              "Op aanvraag per organisatie ingeschakeld, daarna een connector-URL via Integraties",
            ],
          ]}
        />
        <p>
          Flows accepteren PDF&apos;s, afbeeldingen (PNG, JPG, JPEG en JFIF) en spreadsheets (XLSX,
          XLS en CSV). Bij een spreadsheet leest de Flow het eerste zichtbare werkblad. Gescande
          documenten worden automatisch herkend en met OCR gelezen.
        </p>
        <Screenshot
          src="/assets/tour2-runs.jpg"
          alt="De pagina Runs in Tavnit met verwerkte documenten, elk met de Flow, wie de Run startte, de bron en de status, boven overzichtstegels voor voltooide, lopende en alle Runs."
          caption="Elk document wordt een Run. De pagina Runs laat zien wat er is verwerkt, hoe het binnenkwam en hoe het afliep."
        />
        <p>
          Open een willekeurige Run om de geëxtraheerde velden naast het brondocument te zien, plus
          het logboek van wat er tijdens de verwerking gebeurde. Dat logboek is de eerste plek om te
          kijken als een resultaat niet is wat je verwachtte.
        </p>
      </DocCard>

      <DocCard icon={<Map size={24} />} title="Hoe verder">
        <Lead>
          Zodra de extractie werkt, hangt de volgende stap af van wat er mis is met de data of wat je
          ermee moet doen.
        </Lead>
        <DataTable
          head={["Als je…", "Lees"]}
          rows={[
            [
              "meer velden wilt extraheren, of een veld wilt corrigeren dat verkeerd terugkomt",
              <Fragment key="f17">
                <DocLink href="/docs/flows">Flows</DocLink>
              </Fragment>,
            ],
            [
              "formaten wilt corrigeren, valuta wilt omrekenen, totalen wilt berekenen of foute rijen wilt markeren",
              <Fragment key="f18">
                <DocLink href="/docs/cleaners">Cleaners</DocLink>
              </Fragment>,
            ],
            [
              "resultaten door iemand wilt laten controleren voordat ze ergens heen gaan",
              <Fragment key="f19">
                <DocLink href="/docs/human-in-the-loop">Menselijke beoordeling</DocLink>
              </Fragment>,
            ],
            [
              "de data in je eigen systemen wilt krijgen",
              <Fragment key="f20">
                <DocLink href="/docs/webhooks">Webhooks</DocLink> of de{" "}
                <DocLink href="/docs/api-integration">REST API</DocLink>
              </Fragment>,
            ],
            [
              "resultaten bij elkaar wilt houden en wilt bevragen",
              <Fragment key="f21">
                <DocLink href="/docs/buckets">Buckets</DocLink>
              </Fragment>,
            ],
            [
              "documenten wilt vergelijken, of ze wilt toetsen aan een lijst regels",
              <Fragment key="f24">
                <DocLink href="/docs/matchers">Matchers</DocLink> en{" "}
                <DocLink href="/docs/inspectors">Inspectors</DocLink>
              </Fragment>,
            ],
            [
              "meerdere stappen tot één proces wilt verbinden",
              <Fragment key="f25">
                <DocLink href="/docs/pipelines">Pipelines</DocLink>
              </Fragment>,
            ],
            [
              "elders op het web iets met de data wilt doen",
              <Fragment key="f22">
                <DocLink href="/docs/agents">Agents</DocLink>
              </Fragment>,
            ],
            [
              "wilt bepalen wie wat mag zien en wijzigen",
              <Fragment key="f23">
                <DocLink href="/docs/user-roles">Gebruikersrollen</DocLink>
              </Fragment>,
            ],
          ]}
        />
      </DocCard>

      <Related
        links={[
          {
            href: "/docs/flows",
            label: "Het dataschema van een Flow uitgebreid opbouwen",
            description:
              "Veldsoorten, datatypes, extractiehints, samengestelde velden, Runs en alles wat je aan een Flow kunt koppelen.",
          },
          {
            href: "/docs/api-integration",
            label: "Documenten verwerken met de Tavnit REST API",
            description:
              "Uploaden via multipart en base64, authenticatie met een API-sleutel, voorbeelden in Python en JavaScript, plus no-code-recepten.",
          },
          {
            href: "/docs/email-integration",
            label: "Extraheren uit e-mailbijlagen",
            description: "Geef een Flow een eigen inbox en stuur er documenten naartoe door.",
          },
          {
            href: "/docs/pipeline-map",
            label: "Zien hoe alles samenhangt",
            description:
              "Een live kaart van je Flows, Collections, Splitters, Cleaners en Buckets.",
          },
        ]}
      />
    </section>
  );
}
