import { Fragment } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  HelpCircle,
  Inbox,
  Info,
  Layers,
  PenLine,
  Settings2,
  Shield,
  SplitSquareHorizontal,
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
  WarningBox,
} from "@/components/docs/ui";
import type { DocsPageSchemaData } from "../types";

/**
 * /nl/docs/human-in-the-loop — translated from
 * src/app/docs/human-in-the-loop/page.tsx. The app calls the area
 * "Menselijke beoordeling" in Dutch; HITL stays as in the app's labels.
 */

/** Mirrors the visible numbered steps under "Beoordeling inschakelen voor een Flow". */
export const schema: DocsPageSchemaData = {
  howTo: {
    name: "Een menselijke beoordelingsstap toevoegen aan een Tavnit-Flow",
    description:
      "Schakel menselijke beoordeling in voor een Flow en wijs beoordelaars toe, zodat elke Run pauzeert voor goedkeuring voordat de resultaten verder worden geleverd.",
    steps: [
      {
        name: "Het paneel Menselijke beoordeling van de Flow openen",
        text: "Ga in de Tavnit-app naar Flows, open de Flow en kies in de zijbalk het paneel Menselijke beoordeling.",
      },
      {
        name: "Beoordeling inschakelen",
        text: "Zet Menselijke beoordeling aan. Vanaf dat moment pauzeren nieuwe Runs van de Flow in plaats van hun resultaten te leveren.",
      },
      {
        name: "Beoordelaars toewijzen",
        text: "Kies onder Beoordelaars een of meer leden van je organisatie. Alleen toegewezen beoordelaars kunnen de gepauzeerde Runs van de Flow goedkeuren of afwijzen.",
      },
      {
        name: "Een document verwerken en de wachtrij controleren",
        text: "Verwerk één document. Het moet verschijnen met de status Wacht op beoordeling in de wachtrij Menselijke beoordeling van elke toegewezen beoordelaar.",
      },
    ],
  },
  primaryImage: {
    url: "/assets/docs-hitl-review-2026-08.jpg",
    caption:
      "Het beoordelingsscherm van Tavnit: een bewerkbaar dataraster naast het brondocument, met de acties Goedkeuren en Afwijzen.",
    width: 1327,
    height: 801,
  },
};

export default function HumanInTheLoopNl() {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        Menselijke beoordeling (Human in the Loop)
      </h1>

      <DocCard icon={<ClipboardCheck size={24} />} title="Wat menselijke beoordeling doet">
        <Lead>
          Menselijke beoordeling zet een controlepunt tussen extractie en levering. Een Run die
          beoordeeld moet worden, stopt na extractie en opschoning met de status{" "}
          <strong>Wacht op goedkeuring</strong>: er wordt geen e-mail verstuurd, geen webhook
          uitgevoerd, geen Bucket-rij geschreven en geen gekoppelde Agent gestart tot een aangewezen
          beoordelaar de Run goedkeurt.
        </Lead>
        <p>
          Het belangrijke woord is <em>vóór</em>. Beoordeling is geen correctie die je toepast nadat
          foute data je ERP al heeft bereikt; de leveringsstap heeft nog niet gedraaid. Als de
          beoordelaar goedkeurt, gaat de Run precies verder waar hij pauzeerde, met diens wijzigingen.
        </p>
        <BulletList
          items={[
            "Waardevolle data die gecontroleerd moet worden voordat ze verder gaat",
            "Een compliance-eis voor een gedocumenteerde handmatige goedkeuringsstap",
            "Documenten waarbij de extractie meestal klopt, maar een fout af en toe duur is",
            "Waarden die alleen een mens kan aanleveren, zoals een interne kostenplaats of een goedkeuringscode",
            "Nieuwe leveranciers of nieuwe formaten, tot je de Flow vertrouwt",
          ]}
        />
        <p>
          Flow-Runs zijn het belangrijkste geval, maar dezelfde wachtrij verzamelt ook gepauzeerde{" "}
          <DocLink href="/docs/matchers">matches</DocLink>,{" "}
          <DocLink href="/docs/inspectors">inspecties</DocLink> en{" "}
          <DocLink href="/docs/fillers">invullingen</DocLink>. Zie{" "}
          <em>Andere dingen die op beoordeling wachten</em> hieronder.
        </p>
      </DocCard>

      <DocCard icon={<Settings2 size={24} />} title="Drie manieren waarop een Flow-Run pauzeert">
        <Lead>
          De schakelaar op Flow-niveau is één manier om Runs ter beoordeling te sturen, niet de
          enige. Een <DocLink href="/docs/cleaners">Cleaner</DocLink> die aan de Flow is gekoppeld,
          kan Runs zelf pauzeren, ook als de schakelaar uit staat. Als meerdere triggers op dezelfde
          Run van toepassing zijn, worden hun lijsten met beoordelaars samengevoegd.
        </Lead>
        <DataTable
          head={["Trigger", "Wat pauzeert", "Het beste voor"]}
          rows={[
            [
              "Flow-instelling (paneel Menselijke beoordeling)",
              "Elke Run van de Flow, ongeacht wat er is geëxtraheerd.",
              "Een documenttype dat altijd een akkoord nodig heeft, of een Flow die je net hebt gebouwd en nog niet vertrouwt.",
            ],
            [
              "Cleaner-regel bij Voorwaardelijke acties met de actie Menselijke beoordeling",
              "Alleen de Runs waarin een rij aan de regel voldeed, bijvoorbeeld een totaal boven een drempel of een ontbrekend btw-nummer.",
              "Grote volumes waarbij de meeste Runs in orde zijn en je alleen naar de uitzonderingen wilt kijken.",
            ],
            [
              "Cleaner-veld Handmatige invoer",
              "Elke Run die door de Cleaner gaat, omdat iemand de waarde moet typen of kiezen.",
              "Data die helemaal niet in het document staat en door iemand moet worden toegevoegd.",
            ],
          ]}
        />
        <InfoBox color="blue" icon={<Info size={20} />} title="Je hoeft niet alles te beoordelen">
          Elke Run beoordelen ondermijnt het nut van geautomatiseerde extractie. De voorwaardelijke
          route is meestal de juiste: voeg in de Cleaner een veld Voorwaardelijke acties toe, geef het
          een voorwaarde zoals <em>total &gt; 10,000</em>, voeg de actie Menselijke beoordeling toe en
          kies de beoordelaars. Alleen Runs die voldoen, stoppen. De schakelaar van de Flow kan uit
          blijven.
        </InfoBox>
        <p>
          Wanneer een Cleaner-regel de pauze veroorzaakt, legt Tavnit vast welke rijen en welke velden
          voldeden. Het beoordelingsscherm markeert precies die cellen, zodat de beoordelaar begint bij
          de reden waarom de Run werd vastgehouden in plaats van de hele tabel te lezen. Wordt de regel
          gevoed door een veld Anomaliecontrole, dan ziet de beoordelaar ook waarom elke waarde is
          gemarkeerd.
        </p>
      </DocCard>

      <DocCard icon={<Settings2 size={24} />} title="Beoordeling inschakelen voor een Flow">
        <Lead>
          De schakelaar staat in de eigen instellingen van de Flow. Alleen een Owner of Admin kan hem
          wijzigen. Beoordelaars kies je uit de leden van je organisatie.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f0">
              Open de Flow en kies in de zijbalk het paneel <strong>Menselijke beoordeling</strong>.
            </Fragment>,
            <Fragment key="f1">Zet de beoordeling aan.</Fragment>,
            <Fragment key="f2">
              Kies onder <strong>Beoordelaars</strong> een of meer leden van je organisatie.
            </Fragment>,
            <Fragment key="f3">
              Verwerk één document en controleer dat het verschijnt als{" "}
              <strong>Wacht op beoordeling</strong> in de wachtrij{" "}
              <strong>Menselijke beoordeling</strong> van de beoordelaars.
            </Fragment>,
          ]}
        />
        <WarningBox>
          Staat beoordeling aan zonder toegewezen beoordelaars, dan waarschuwt het paneel{" "}
          <em>&ldquo;Geen beoordelaars geselecteerd — goedkeuringsverzoeken bereiken niemand.&rdquo;</em>{" "}
          Gepauzeerde Runs hebben dan niemand die ze kan goedkeuren. Wijs minstens één beoordelaar toe
          voordat je documenten instuurt.
        </WarningBox>
        <InfoBox
          color="violet"
          icon={<Info size={20} />}
          title="Met een gekoppelde Cleaner zien beoordelaars opgeschoonde data"
        >
          Heeft de Flow een Cleaner, dan volgt de pauze na de opschoning, dus de tabel die wordt
          beoordeeld is de opgeschoonde output, met omgerekende valuta, geherformatteerde datums en
          berekende kolommen. Dat is wat er geleverd wordt, dus dat is precies wat je moet
          controleren.
        </InfoBox>
      </DocCard>

      <DocCard icon={<PenLine size={24} />} title="Velden Handmatige invoer">
        <Lead>
          Een veld Handmatige invoer is een Cleaner-kolom die nooit wordt geëxtraheerd: een
          beoordelaar vult hem in op het beoordelingsscherm. Gebruik het voor een kostenplaats, een
          grootboekrekening, een interne goedkeuringscode of iets anders dat het document je niet kan
          vertellen.
        </Lead>
        <DataTable
          head={["Optie", "Wat het doet"]}
          rows={[
            ["Vrije tekst", "De beoordelaar typt de waarde."],
            [
              "Menu",
              "De beoordelaar kiest uit de unieke waarden van een Bucket-kolom (Options Bucket en Options Column), optioneel gefilterd op voorwaarden, ook op voorwaarden over de velden van de huidige rij.",
            ],
            [
              "Waarde is verplicht",
              "Goedkeuren is geblokkeerd tot elke rij een waarde heeft. Zet het uit om lege waarden toe te staan.",
            ],
            ["Beoordelaars", "Wie het veld mag invullen en goedkeuren; samengevoegd met de beoordelaars van de Flow."],
          ]}
        />
        <p>
          Elke Run die door een Cleaner met een veld Handmatige invoer gaat, pauzeert voor
          beoordeling, of de schakelaar van de Flow nu aan staat of niet. Op het beoordelingsscherm is
          de kolom gemarkeerd met <strong>Menselijke invoer nodig</strong> en het aantal ingevulde
          rijen, en Goedkeuren blijft geblokkeerd (
          <em>&ldquo;Vul alle vereiste menselijke invoerwaarden in om goed te keuren&rdquo;</em>) tot
          elke verplichte waarde is ingevuld.
        </p>
      </DocCard>

      <DocCard icon={<Inbox size={24} />} title="De beoordelingswachtrij">
        <Lead>
          De pagina <strong>Menselijke beoordeling</strong> in de zijbalk toont alles wat op jou
          wacht, nieuwste eerst. Ze toont alleen items waarvan jij beoordelaar bent; beoordelaars zien
          elkaars wachtrijen niet.
        </Lead>
        <BulletList
          items={[
            "Kerncijfers bovenaan: Wacht op beoordeling, Oudste openstaande, Jouw rol en Flows met HITL",
            "Eén kaart per item: de bestandsnaam en de Flow voor een Run, met een label Match of Invulling voor die soorten, en de status Wacht op beoordeling",
            "Een rode stip op het pictogram in de zijbalk zodra er iets op je wacht. Die wordt in realtime bijgewerkt, zonder de pagina te vernieuwen",
            "Toegewezen beoordelaars krijgen ook een e-mail met een directe link zodra een Run, match, inspectie of invulling hen nodig heeft",
          ]}
        />
      </DocCard>

      <DocCard icon={<SplitSquareHorizontal size={24} />} title="Een Run beoordelen">
        <Lead>
          Het beoordelingsscherm is een gesplitste weergave: de geëxtraheerde tabel links, het
          originele document rechts. Je controleert een waarde tegen de bron zonder de pagina te
          verlaten, corrigeert haar ter plekke en keurt goed. De scheidingslijn is versleepbaar, en op
          mobiel schakel je tussen de twee panelen.
        </Lead>
        <Screenshot
          src="/assets/docs-hitl-review-2026-08.jpg"
          alt="Het beoordelingsscherm van Tavnit voor een Run die wacht op beoordeling: links een bewerkbaar dataraster met de kolommen Subtotal, Amount en Weight en selectievakjes per rij, rechts de bronfactuur, en de knoppen Afwijzen en Goedkeuren in de kop."
          caption="Een Run die wacht op beoordeling. Het raster links is de opgeschoonde output die geleverd wordt; het brondocument staat ernaast om te controleren."
        />
        <DataTable
          head={["In het dataraster kun je", "Hoe"]}
          rows={[
            ["Een waarde bewerken", "Dubbelklik op de cel en typ."],
            [
              "Veel cellen tegelijk wijzigen",
              "Selecteer door te slepen, met Shift te klikken of op een kolomkop te klikken, en kies dan Toepassen op selectie.",
            ],
            ["Een rij uit de output halen", "Vink hem uit. Uitgesloten rijen worden niet geleverd."],
            ["Een kolom toevoegen of verwijderen", "Gebruik Kolom toevoegen of Kolom verwijderen. Een verwijderde kolom kun je herstellen zolang je nog niet hebt goedgekeurd."],
            ["Zien wat de pauze veroorzaakte", "Cellen waar een Cleaner-regel op aansloeg, zijn gemarkeerd."],
            ["Velden Handmatige invoer invullen", "Typ de waarde, of kies haar uit het menu."],
            ["Zien wat je hebt gewijzigd", "Bewerkte cellen blijven gemarkeerd tot je goedkeurt."],
          ]}
        />
        <BulletList
          items={[
            "Het documentpaneel toont PDF's met paginanavigatie en ook afbeeldingsbestanden; spreadsheets kun je downloaden",
            "Passend in breedte, Passend in hoogte en handmatig zoomen; sleep om te verschuiven",
            "Ctrl/Cmd + en − om te zoomen, Ctrl/Cmd + 0 om terug te zetten",
          ]}
        />
      </DocCard>

      <DocCard icon={<CheckCircle2 size={24} />} title="Goedkeuren en afwijzen">
        <Lead>
          Goedkeuren verwerkt je wijzigingen in de Run en geeft hem vrij voor de volgende stappen.
          Afwijzen annuleert de Run en levert niets. Beide beslissingen zijn definitief voor die Run:
          de pauze is een eenmalige poort, geen toestand die je heen en weer kunt schakelen.
        </Lead>
        <DataTable
          head={["Beslissing", "Wat er met de Run gebeurt", "Wat er wordt geleverd"]}
          rows={[
            [
              "Goedkeuren",
              "Je bewerkte tabel vervangt de geëxtraheerde output en de Run gaat verder tot Voltooid, met een badge HITL goedgekeurd.",
              <Fragment key="f4">
                Alles wat de Flow moet doen: e-mailoutput, webhook,{" "}
                <DocLink href="/docs/buckets">Bucket</DocLink>-export, formulieren invullen en een
                gekoppelde <DocLink href="/docs/agents">Agent</DocLink>, allemaal met de goedgekeurde
                data.
              </Fragment>,
            ],
            [
              "Afwijzen",
              "De Run wordt Geannuleerd, met een badge HITL afgewezen, en je reden (optioneel maar aanbevolen) wordt vastgelegd.",
              "Niets. Geen e-mail, geen webhook, geen Bucket-rij, geen Agent-Run.",
            ],
          ]}
        />
        <InfoBox color="green" icon={<CheckCircle2 size={20} />} title="De eerste beslissing telt">
          Niet elke toegewezen beoordelaar hoeft akkoord te geven. De eerste goedkeuring of afwijzing
          beslist over de Run; had een tweede beoordelaar hem open, dan wordt diens beslissing
          geweigerd omdat de Run niet meer op goedkeuring wacht. Vernieuw de wachtrij om de huidige
          stand te zien.
        </InfoBox>
        <p>
          De pagina van de Run toont wie besliste (<strong>Goedgekeurd door</strong> of{" "}
          <strong>Afgewezen door</strong>).
        </p>
      </DocCard>

      <DocCard icon={<Layers size={24} />} title="Andere dingen die op beoordeling wachten">
        <Lead>
          Matchers, Inspectors en Fillers hebben hun eigen beoordelingsinstellingen, en hun
          gepauzeerde items komen in dezelfde wachtrij terecht, met dezelfde regel dat de eerste
          beslissing telt en hetzelfde audit-logboek.
        </Lead>
        <DataTable
          head={["Item", "Wanneer het pauzeert", "Wat de beoordelaar doet"]}
          rows={[
            [
              <DocLink key="o0" href="/docs/matchers">Match</DocLink>,
              "Als menselijke beoordeling voor de Matcher aan staat: elke match.",
              "Controleert en corrigeert hoe de AI rijen over documenten heen heeft gekoppeld, kan rijen uitsluiten, en keurt dan goed of af.",
            ],
            [
              <DocLink key="o1" href="/docs/inspectors">Inspectie</DocLink>,
              "Als menselijke beoordeling voor de Inspector aan staat, of als een falende controle via haar acties bij falen om beoordeling vraagt.",
              "Ziet falende controles met een reden door de vingers, en keurt dan goed om het oordeel vast te leggen, of wijst af om de inspectie te annuleren.",
            ],
            [
              <DocLink key="o2" href="/docs/fillers">Invulling</DocLink>,
              "Als menselijke beoordeling voor de Filler aan staat, of zodra er velden Handmatig invullen zijn toegewezen.",
              "Controleert de ingevulde formulieren, typt de waarden voor Handmatig invullen, en keurt dan goed om de formulieren vrij te geven, of wijst af.",
            ],
          ]}
        />
      </DocCard>

      <DocCard icon={<Eye size={24} />} title="Wie kan beoordelen">
        <Lead>
          Alleen de mensen die als beoordelaar zijn toegewezen, kunnen een Flow-Run goedkeuren of
          afwijzen. Admin zijn is op zichzelf niet genoeg: een Admin die niet op de lijst met
          beoordelaars staat, krijgt de Run niet in zijn wachtrij en kan hem niet goedkeuren.
        </Lead>
        <BulletList
          items={[
            "De lijsten met beoordelaars van een Flow worden beheerd door een Owner of een Admin",
            "De actie Menselijke beoordeling van een Cleaner en elk veld Handmatige invoer hebben hun eigen beoordelaars, samengevoegd met die van de Flow",
            "Elk lid kan beoordelaar zijn, ongeacht de rol",
            "De rol Alleen HITL is gemaakt voor beoordelaars: die leden zien alleen de wachtrij Menselijke beoordeling en kunnen beoordelen, maar kunnen verder niets uitvoeren of wijzigen",
          ]}
        />
        <p>
          Zie <DocLink href="/docs/user-roles">gebruikersrollen en rechten</DocLink> voor wat elke rol
          kan wijzigen.
        </p>
      </DocCard>

      <DocCard icon={<Shield size={24} />} title="Het onwijzigbare audit-logboek">
        <Lead>
          Elke beoordelingsactie wordt met een tijdstempel en de identiteit van de beoordelaar
          vastgelegd in een permanent logboek waaraan alleen kan worden toegevoegd. Items kunnen niet
          worden bewerkt of verwijderd, dus het verslag van wie wat heeft gewijzigd, en hoe de data er
          uitzag voordat iemand eraan kwam, blijft na de beoordeling bewaard.
        </Lead>
        <DataTable
          head={["Vastgelegde gebeurtenis", "Wanneer ze wordt geschreven"]}
          rows={[
            ["Beoordelaars op de hoogte gebracht", "De Run komt in de beoordelingswachtrij en de beoordelaars krijgen een e-mail."],
            ["Cel bewerkt", "Een waarde wordt gewijzigd, met de oude en de nieuwe waarde."],
            ["Rij toegevoegd / rij verwijderd", "De beoordelaar voegt een rij toe of sluit er een uit."],
            ["Kolom toegevoegd / kolom verwijderd", "De beoordelaar verandert de vorm van de tabel."],
            ["Goedgekeurd", "De beslissing, de beoordelaar en hoeveel wijzigingen er zijn gedaan."],
            ["Afgewezen", "De beslissing, de beoordelaar en de opgegeven reden."],
          ]}
        />
        <InfoBox color="purple" icon={<Shield size={20} />} title="Ook de data van vóór de beoordeling blijft bewaard">
          Tavnit bewaart de output zoals die was voordat de beoordelaar eraan kwam, naast de
          goedgekeurde versie. Een auditor kan de extractie vergelijken met het geleverde resultaat
          zonder die te reconstrueren uit het gebeurtenissenlogboek.
        </InfoBox>
      </DocCard>

      <DocCard icon={<HelpCircle size={24} />} title="Problemen oplossen">
        <DataTable
          head={["Symptoom", "Waarschijnlijke oorzaak en oplossing"]}
          rows={[
            [
              "Runs pauzeren terwijl de schakelaar van de Flow uit staat",
              "De Cleaner van de Flow heeft een regel bij Voorwaardelijke acties met de actie Menselijke beoordeling, of een veld Handmatige invoer.",
            ],
            [
              "Een Run wacht op goedkeuring maar staat niet in mijn wachtrij",
              "Je staat niet op de lijst met beoordelaars. Vraag een Owner of Admin om je aan de Flow toe te voegen (of aan de Cleaner-regel die hem pauzeerde).",
            ],
            [
              "Goedkeuren wordt geweigerd omdat je geen ingestelde beoordelaar bent",
              "Alleen toegewezen beoordelaars kunnen beslissen. Is er geen beoordelaar toegewezen, voeg er dan een toe aan de Flow; niemand anders kan de Run vrijgeven.",
            ],
            [
              "Goedkeuren wordt geweigerd omdat de Run niet op goedkeuring wacht",
              "Een andere beoordelaar besliste eerst. Vernieuw de wachtrij.",
            ],
            [
              "Goedkeuren is geblokkeerd wegens ontbrekende menselijke invoer",
              "Een verplicht veld Handmatige invoer is in sommige rijen nog leeg. Vul ze in, of maak het veld optioneel in de Cleaner.",
            ],
            [
              "De gekoppelde Agent is niet gestart",
              "Die start pas na goedkeuring. Een afgewezen Run start hem nooit.",
            ],
          ]}
        />
        <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Beoordeling kost tijd">
          Een gepauzeerde Run wacht zo lang als nodig is. Voeden de resultaten een tijdgevoelig
          proces, zorg er dan voor dat beoordelaars hun wachtrij of hun e-mail in de gaten houden, of
          beperk de pauze met een Cleaner-regel tot de uitzonderingen.
        </InfoBox>
      </DocCard>

      <Related
        links={[
          {
            href: "/docs/cleaners",
            label: "Beoordeling voorwaardelijk starten met een Cleaner",
            description:
              "Voorwaardelijke acties pauzeren alleen de Runs die een regel overtreden; velden Handmatige invoer verzamelen waarden van een beoordelaar.",
          },
          {
            href: "/docs/user-roles",
            label: "Gebruikersrollen en rechten",
            description: "Wie beoordelaars kan toewijzen, en wat de rol Alleen HITL kan doen.",
          },
          {
            href: "/docs/agents",
            label: "Met Agents handelen op goedgekeurde data",
            description: "Een gekoppelde Agent start pas nadat de beoordelaar heeft goedgekeurd.",
          },
          {
            href: "/docs/webhooks",
            label: "Goedgekeurde resultaten leveren met webhooks",
            description: "Wat er wordt uitgevoerd zodra een beoordelaar goedkeurt, en wat nooit wordt uitgevoerd bij een afwijzing.",
          },
          {
            href: "/docs/buckets",
            label: "Goedgekeurde data opslaan in Buckets",
            description: "De gestructureerde tabellen die alleen rijen ontvangen waarvoor een beoordelaar akkoord heeft gegeven.",
          },
        ]}
      />
    </section>
  );
}
