import Link from "next/link";
import { Fragment } from "react";
import {
  AlertTriangle,
  Info,
  KeyRound,
  LifeBuoy,
  MessageSquare,
  Plug,
  RefreshCw,
  Settings2,
  Sparkles,
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
import { localizedPath } from "@/lib/routes";
import type { DocsPageSchemaData } from "../types";

/** /nl/docs/mcp-connector — translated from src/app/docs/mcp-connector/page.tsx. */

/** Mirrors the numbered steps rendered under "claude.ai koppelen". */
export const schema: DocsPageSchemaData = {
  howTo: {
    name: "Tavnit met de MCP-connector aan claude.ai koppelen",
    description:
      "Genereer een Tavnit-connector-URL op de pagina Integraties en voeg die in claude.ai toe als aangepaste connector, zodat je assistent met je Tavnit-gegevens kan werken.",
    steps: [
      {
        name: "Integraties openen in Tavnit",
        text: "Meld je aan in de Tavnit-app en open Integraties in de zijbalk. Controleer dat je in de organisatie zit waarvan de assistent de gegevens moet kunnen bereiken.",
      },
      {
        name: "De connector-URL genereren",
        text: "Kies in de kaart Aangepaste connector de optie Connector-URL genereren. Tavnit maakt de URL aan op basis van je API-sleutel en toont wanneer die is aangemaakt en wanneer hij verloopt.",
      },
      {
        name: "De URL kopiëren",
        text: "Kopieer de connector-URL met de kopieerknop. Behandel hem als een wachtwoord.",
      },
      {
        name: "Hem in claude.ai toevoegen als aangepaste connector",
        text: "Ga in claude.ai naar Settings, dan Connectors, dan Add custom connector, en plak de URL. Aangepaste connectors vereisen minimaal een Claude Pro-abonnement.",
      },
      {
        name: "De verbinding bevestigen",
        text: "Start een nieuwe chat en vraag de assistent welke Tavnit-tools hij heeft. Als hij ze opsomt, is de connector actief.",
      },
    ],
  },
};

export default function McpConnectorNl() {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        MCP-connector
      </h1>

      <DocCard icon={<Plug size={24} />} title="Wat de MCP-connector doet">
        <Lead>
          De MCP-connector voegt je Tavnit-organisatie als tool toe aan een AI-assistent. Zodra hij is
          gekoppeld, kun je de assistent in gewone taal vragen stellen over je Tavnit-gegevens, en hij
          antwoordt vanuit je live account in plaats van te gokken.
        </Lead>
        <p>
          MCP (Model Context Protocol) is de open standaard waarmee AI-assistenten externe tools
          aanroepen. Tavnit draait een MCP-server op <InlineCode>mcp.tavnit.io</InlineCode>, en de
          connector-URL is de toegangssleutel die een client naar je organisatie laat wijzen. Hij werkt
          met <strong>claude.ai</strong> (Pro en hoger), <strong>Cursor</strong> en elke andere client
          die de URL van een externe MCP-server accepteert.
        </p>
        <p>
          Waarvoor de connector bedoeld is, en hoe hij zich verhoudt tot het plakken van een bestand in
          een chat, lees je in het{" "}
          <Link href={localizedPath("/integrations/mcp", "nl")} className="text-accent hover:underline">
            overzicht van de MCP-connector
          </Link>
          .
        </p>
        <InfoBox color="blue" icon={<Info size={20} />} title="Op aanvraag ingeschakeld">
          De connector wordt per organisatie ingeschakeld. Zie je op de pagina Integraties geen kaart
          Aangepaste connector, neem dan contact op met support om hem voor je organisatie te laten
          inschakelen.
        </InfoBox>
      </DocCard>

      <DocCard icon={<KeyRound size={24} />} title="Voordat je begint">
        <Lead>
          Je hebt drie dingen nodig: een organisatie waarvoor de connector is ingeschakeld, je
          API-sleutel en een MCP-client. De connector wordt uitgegeven op basis van je eigen sleutel,
          dus hij bereikt alleen de organisatie waarin je zat toen je hem genereerde, en de assistent
          handelt met die sleutel.
        </Lead>
        <DataTable
          head={["Vereiste", "Waar het vandaan komt"]}
          rows={[
            [
              "Kaart Aangepaste connector",
              <Fragment key="f0">
                Op de pagina <strong>Integraties</strong>, alleen als de connector voor je organisatie
                is ingeschakeld. Vraag het aan support als hij ontbreekt.
              </Fragment>,
            ],
            [
              "Je API-sleutel",
              <Fragment key="f1">
                De kaart <strong>API-sleutel</strong> op dezelfde pagina: één sleutel per lid per
                organisatie. Staat er <em>No API key found. Please log in again.</em>, meld je dan af
                en weer aan.
              </Fragment>,
            ],
            [
              "Een MCP-client",
              <Fragment key="f2">
                claude.ai met een Pro-abonnement of hoger, Cursor, of elke client die de URL van een
                externe MCP-server accepteert.
              </Fragment>,
            ],
            [
              "Je rol",
              <Fragment key="f3">
                De assistent gebruikt je API-sleutel, dus hij kan alleen wat je sleutel kan. Een
                sleutel met de rol <strong>Alleen HITL</strong> wordt bijvoorbeeld door
                verwerkingsverzoeken geweigerd. Zie{" "}
                <DocLink href="/docs/user-roles">gebruikersrollen</DocLink> en{" "}
                <DocLink href="/docs/api-integration">de API-pagina</DocLink>.
              </Fragment>,
            ],
          ]}
        />
      </DocCard>

      <DocCard icon={<Settings2 size={24} />} title="claude.ai koppelen">
        <Lead>
          Genereer de URL in Tavnit en plak hem daarna in claude.ai als aangepaste connector. Er hoeft
          niets geïnstalleerd te worden en er is geen configuratiebestand om te bewerken.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f4">
              Open <strong>Integraties</strong> in de Tavnit-zijbalk. Controleer eerst de
              organisatiewisselaar: de connector is gebonden aan de organisatie waarin je op dat moment
              zit.
            </Fragment>,
            <Fragment key="f5">
              Kies in de kaart <strong>Aangepaste connector</strong> de optie{" "}
              <strong>Connector-URL genereren</strong>.
            </Fragment>,
            <Fragment key="f6">Kopieer de URL met de kopieerknop.</Fragment>,
            <Fragment key="f7">
              Ga in claude.ai naar <strong>Settings → Connectors → Add custom connector</strong> en
              plak de URL.
            </Fragment>,
            <Fragment key="f8">
              Open een nieuwe chat en vraag de assistent welke Tavnit-tools hij heeft. Als hij ze
              opsomt, is de connector actief.
            </Fragment>,
          ]}
        />
      </DocCard>

      <DocCard icon={<Settings2 size={24} />} title="Cursor of een andere MCP-client koppelen">
        <Lead>
          Elke client die externe MCP-servers ondersteunt, neemt dezelfde URL. Voeg hem toe als
          externe (URL-)server, niet als server op basis van een opdracht: er draait geen lokaal
          proces, omdat de connector naar een gehoste server wijst.
        </Lead>
        <NumberedList
          items={[
            "Genereer en kopieer de connector-URL op de pagina Integraties, zoals hierboven.",
            <Fragment key="f9">
              Open in Cursor de MCP-instellingen en voeg een nieuwe server toe van het type{" "}
              <strong>remote</strong> / URL.
            </Fragment>,
            <Fragment key="f10">
              Plak de connector-URL als server-URL. Een apart veld voor de API-sleutel is niet nodig:
              de URL bevat de toegangssleutel al.
            </Fragment>,
            "Laad de client opnieuw en controleer dat Tavnit in de lijst met tools verschijnt.",
          ]}
        />
        <InfoBox color="blue" icon={<Info size={20} />} title="Eén URL, meerdere clients">
          Je hebt steeds één connector-URL tegelijk, en die kun je in meer dan één client plakken. Ze
          handelen allemaal als jou in dezelfde organisatie, dus een vernieuwing verbreekt ze allemaal
          tegelijk.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Sparkles size={24} />} title="Wat je assistent kan doen">
        <Lead>
          Via de connector werkt de assistent met de Tavnit-gegevens van je organisatie, met je
          API-sleutel. Het bouwen en configureren van Flows, Cleaners, Pipelines en je team gebeurt
          nog steeds in de app.
        </Lead>
        <p>
          De tools die de connector biedt, worden door je MCP-client opgesomd, en de snelste manier om
          ze te zien is het aan de assistent te vragen. Stel je vraag in gewone taal en noem de Flow,
          Bucket of Run die je bedoelt zoals die in de app heet.
        </p>
        <InfoBox color="blue" icon={<Info size={20} />} title="Jouw gegevens, jouw organisatie">
          De connector bereikt alleen de organisatie waarin hij is gegenereerd. Wil je met een andere
          organisatie werken, schakel er dan in Tavnit naar over en genereer daar een URL. Werk dat
          vanuit de assistent wordt gestart, volgt je configuratie zoals elke andere Run: als een Flow
          om <DocLink href="/docs/human-in-the-loop">menselijke beoordeling</DocLink> vraagt, wacht
          de Run daar nog steeds op.
        </InfoBox>
      </DocCard>

      <DocCard icon={<RefreshCw size={24} />} title="Verlopen en vernieuwen">
        <Lead>
          Connector-URL&apos;s zijn beperkt geldig. De kaart Aangepaste connector toont wanneer de URL
          is aangemaakt en hoelang hij nog geldig is, en waarschuwt je in de laatste 24 uur. Vernieuwen
          geeft een nieuwe URL uit en maakt de oude meteen ongeldig.
        </Lead>
        <DataTable
          head={["Status", "Wat je ziet", "Wat je doet"]}
          rows={[
            [
              "Actief",
              <Fragment key="s0">De URL, <em>created …</em> en <em>expires in …d</em>.</Fragment>,
              "Niets.",
            ],
            [
              "Verloopt binnenkort (minder dan 24 uur)",
              <Fragment key="f16">
                De resterende tijd in uren of minuten, en een oranje melding:{" "}
                <em>Connector verloopt binnenkort — vernieuw nu om onderbreking te voorkomen.</em>
              </Fragment>,
              "Vernieuw en plak de nieuwe URL in elke client die hem gebruikt.",
            ],
            [
              "Verlopen",
              <Fragment key="f17">
                Een rode melding:{" "}
                <em>Deze connector is verlopen. Vernieuw om een nieuwe URL te genereren.</em>
              </Fragment>,
              "Vernieuw en plak opnieuw. Clients met de oude URL werken al niet meer.",
            ],
          ]}
        />
        <p>
          Om te vernieuwen kies je <strong>URL vernieuwen</strong> en bevestig je met{" "}
          <strong>Vernieuwen</strong> in het dialoogvenster <em>Connector-URL vernieuwen?</em>.
        </p>
        <WarningBox>
          Vernieuwen is geen rotatie die je gefaseerd kunt uitvoeren. Op het moment dat je bevestigt,
          werkt de vorige URL niet meer en faalt elke assistent die hem gebruikt tot je de nieuwe plakt.
          Vernieuw wanneer je de clients meteen kunt bijwerken.
        </WarningBox>
      </DocCard>

      <DocCard icon={<AlertTriangle size={24} />} title="Behandel de URL als een wachtwoord">
        <Lead>
          De connector-URL is een toegangssleutel. Iedereen die hem heeft, kan als jou bij de gegevens
          van je organisatie, zonder aan te melden. Je kunt hem veilig in de instellingen van een
          MCP-client plakken; het is niet veilig om hem te delen in een ticket, een chatbericht of een
          screenshot.
        </Lead>
        <BulletList
          items={[
            "Commit hem niet naar een repository en plak hem niet in een gedeeld document.",
            "Maak hem onleesbaar of snijd hem weg uit elke screenshot voordat je die deelt.",
            "Is hij uitgelekt, vernieuw hem dan meteen: dat maakt de gelekte URL ter plekke ongeldig.",
            "Een nieuwe API-sleutel genereren is een aparte actie op dezelfde pagina; doe dat ook als je denkt dat de sleutel zelf is uitgelekt.",
          ]}
        />
      </DocCard>

      <DocCard icon={<LifeBuoy size={24} />} title="Problemen oplossen">
        <Lead>
          De meeste problemen met de connector komen neer op een van vier dingen: de functie is niet
          ingeschakeld, de sessie is verlopen, de URL is verlopen, of de client gebruikt een URL die
          door een vernieuwing is vervangen.
        </Lead>
        <DataTable
          head={["Symptoom", "Oorzaak", "Oplossing"]}
          rows={[
            [
              "Geen kaart Aangepaste connector op Integraties",
              "De connector is niet ingeschakeld voor je organisatie.",
              "Neem contact op met support om hem te laten inschakelen.",
            ],
            [
              <Fragment key="f18"><InlineCode>Aangepaste connectors vereisen een geldige Tavnit-sessie. Probeer je af te melden en opnieuw aan te melden.</InlineCode></Fragment>,
              "Tavnit kon je sleutel niet valideren om de URL uit te geven of te lezen.",
              "Meld je af en weer aan, en genereer de URL opnieuw.",
            ],
            [
              "De assistent ziet Tavnit niet meer",
              "De URL is verlopen, of iemand heeft hem vernieuwd.",
              "Kijk op de kaart of er een melding over verlopen of bijna verlopen staat, vernieuw, en plak opnieuw in elke client.",
            ],
            [
              "De assistent ziet de verkeerde gegevens",
              "De URL is gegenereerd terwijl je in een andere organisatie zat.",
              "Wissel van organisatie in Tavnit, genereer een nieuwe URL en vervang de oude.",
            ],
            [
              "De assistent kan een actie niet uitvoeren",
              "Je rol staat het niet toe.",
              "Controleer je rol voordat je uitgaat van een fout in de connector.",
            ],
          ]}
        />
      </DocCard>

      <DocCard icon={<MessageSquare size={24} />} title="Wanneer je de connector gebruikt in plaats van de API">
        <Lead>
          Gebruik de connector voor conversationeel werk op het moment zelf: losse vragen, opgeslagen
          gegevens verkennen, snelle controles. Gebruik de REST API voor alles wat gepland is, in grote
          volumes draait of in een ander systeem is ingebouwd, waar je expliciete foutafhandeling en
          nieuwe pogingen nodig hebt.
        </Lead>
        <DataTable
          head={["Situatie", "Gebruik"]}
          rows={[
            ["Een collega vraagt wat een leverancier vorig kwartaal heeft gefactureerd", "MCP-connector"],
            ["Je wilt je gegevens in een chat verkennen", "MCP-connector"],
            ["Elke nacht alle facturen uit een leveranciersportaal", "REST API of een e-mailtrigger"],
            ["Je eigen product heeft de geëxtraheerde gegevens nodig", "REST API plus webhooks"],
          ]}
        />
      </DocCard>

      <Related
        links={[
          {
            href: "/docs/api-integration",
            label: "Referentie van de Tavnit REST API",
            description:
              "Elk endpoint, met authenticatie via API-sleutel, verzoekvelden, antwoorden en voorbeelden in Python en JavaScript.",
          },
          {
            href: "/docs/buckets",
            label: "Geëxtraheerde gegevens opslaan in Buckets",
            description: "De gestructureerde tabellen waarin je geëxtraheerde gegevens staan.",
          },
          {
            href: "/docs/user-roles",
            label: "Gebruikersrollen en rechten",
            description: "Wat Eigenaar, Beheerder, Lid en Alleen HITL elk kunnen doen.",
          },
        ]}
      />
    </section>
  );
}
