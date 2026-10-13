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

/** /de/docs/mcp-connector — translated from src/app/docs/mcp-connector/page.tsx. */

/** Mirrors the numbered steps rendered under "claude.ai verbinden". */
export const schema: DocsPageSchemaData = {
  howTo: {
    name: "Tavnit mit dem MCP-Connector an claude.ai anbinden",
    description:
      "Erstellen Sie auf der Seite Integrationen eine Tavnit-Connector-URL und fügen Sie sie in claude.ai als benutzerdefinierten Connector hinzu, damit Ihr Assistent mit Ihren Tavnit-Daten arbeiten kann.",
    steps: [
      {
        name: "Integrationen in Tavnit öffnen",
        text: "Melden Sie sich in der Tavnit-App an und öffnen Sie Integrationen in der Seitenleiste. Prüfen Sie, dass Sie sich in der Organisation befinden, deren Daten der Assistent erreichen soll.",
      },
      {
        name: "Die Connector-URL erstellen",
        text: "Wählen Sie in der Karte Benutzerdefinierter Connector die Option Connector-URL erstellen. Tavnit stellt die URL aus Ihrem API-Schlüssel aus und zeigt, wann sie erstellt wurde und wann sie abläuft.",
      },
      {
        name: "Die URL kopieren",
        text: "Kopieren Sie die Connector-URL mit der Kopierschaltfläche. Behandeln Sie sie wie ein Passwort.",
      },
      {
        name: "Sie in claude.ai als benutzerdefinierten Connector hinzufügen",
        text: "Öffnen Sie in claude.ai Settings, dann Connectors, dann Add custom connector, und fügen Sie die URL ein. Benutzerdefinierte Connectoren erfordern mindestens einen Claude-Pro-Plan.",
      },
      {
        name: "Die Verbindung bestätigen",
        text: "Starten Sie einen neuen Chat und fragen Sie den Assistenten, welche Tavnit-Tools er hat. Wenn er sie auflistet, ist der Connector aktiv.",
      },
    ],
  },
};

export default function McpConnectorDe() {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        MCP-Connector
      </h1>

      <DocCard icon={<Plug size={24} />} title="Was der MCP-Connector macht">
        <Lead>
          Der MCP-Connector fügt Ihre Tavnit-Organisation als Tool in einen KI-Assistenten ein. Sobald
          er verbunden ist, können Sie den Assistenten in Alltagssprache zu Ihren Tavnit-Daten fragen,
          und er antwortet aus Ihrem Live-Konto, statt zu raten.
        </Lead>
        <p>
          MCP (Model Context Protocol) ist der offene Standard, über den KI-Assistenten externe Tools
          aufrufen. Tavnit betreibt einen MCP-Server unter <InlineCode>mcp.tavnit.io</InlineCode>, und
          die Connector-URL ist die Zugangsberechtigung, die einen Client auf Ihre Organisation
          verweist. Er funktioniert mit <strong>claude.ai</strong> (ab Pro), <strong>Cursor</strong>{" "}
          und jedem anderen Client, der die URL eines entfernten MCP-Servers akzeptiert.
        </p>
        <p>
          Wofür der Connector gedacht ist und wie er sich vom Einfügen einer Datei in einen Chat
          unterscheidet, lesen Sie in der{" "}
          <Link href={localizedPath("/integrations/mcp", "de")} className="text-accent hover:underline">
            Übersicht zum MCP-Connector
          </Link>
          .
        </p>
        <InfoBox color="blue" icon={<Info size={20} />} title="Auf Anfrage aktiviert">
          Der Connector wird pro Organisation freigeschaltet. Wenn Sie auf der Seite Integrationen
          keine Karte Benutzerdefinierter Connector sehen, bitten Sie den Support, ihn für Ihre
          Organisation zu aktivieren.
        </InfoBox>
      </DocCard>

      <DocCard icon={<KeyRound size={24} />} title="Bevor Sie beginnen">
        <Lead>
          Sie brauchen drei Dinge: eine Organisation mit aktiviertem Connector, Ihren API-Schlüssel
          und einen MCP-Client. Der Connector wird aus Ihrem eigenen Schlüssel ausgestellt; er erreicht
          also nur die Organisation, in der Sie sich beim Erstellen befanden, und der Assistent handelt
          mit diesem Schlüssel.
        </Lead>
        <DataTable
          head={["Voraussetzung", "Woher sie kommt"]}
          rows={[
            [
              "Karte Benutzerdefinierter Connector",
              <Fragment key="f0">
                Auf der Seite <strong>Integrationen</strong>, nur wenn der Connector für Ihre
                Organisation aktiviert ist. Fragen Sie den Support, wenn sie fehlt.
              </Fragment>,
            ],
            [
              "Ihr API-Schlüssel",
              <Fragment key="f1">
                Die Karte <strong>API-Schlüssel</strong> auf derselben Seite: ein Schlüssel pro Mitglied
                und Organisation. Wenn dort <em>No API key found. Please log in again.</em> steht,
                melden Sie sich ab und wieder an.
              </Fragment>,
            ],
            [
              "Ein MCP-Client",
              <Fragment key="f2">
                claude.ai ab dem Pro-Plan, Cursor oder jeder Client, der die URL eines entfernten
                MCP-Servers akzeptiert.
              </Fragment>,
            ],
            [
              "Ihre Rolle",
              <Fragment key="f3">
                Der Assistent nutzt Ihren API-Schlüssel und kann daher nur, was Ihr Schlüssel kann. Ein
                Schlüssel der Rolle <strong>Nur HITL</strong> wird zum Beispiel von
                Verarbeitungsanfragen abgewiesen. Siehe{" "}
                <DocLink href="/docs/user-roles">Benutzerrollen</DocLink> und{" "}
                <DocLink href="/docs/api-integration">die API-Seite</DocLink>.
              </Fragment>,
            ],
          ]}
        />
      </DocCard>

      <DocCard icon={<Settings2 size={24} />} title="claude.ai verbinden">
        <Lead>
          Erstellen Sie die URL in Tavnit und fügen Sie sie dann in claude.ai als benutzerdefinierten
          Connector ein. Es gibt nichts zu installieren und keine Konfigurationsdatei zu bearbeiten.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f4">
              Öffnen Sie <strong>Integrationen</strong> in der Tavnit-Seitenleiste. Prüfen Sie zuerst
              den Organisationswechsler: Der Connector ist an die Organisation gebunden, in der Sie
              sich gerade befinden.
            </Fragment>,
            <Fragment key="f5">
              Wählen Sie in der Karte <strong>Benutzerdefinierter Connector</strong> die Option{" "}
              <strong>Connector-URL erstellen</strong>.
            </Fragment>,
            <Fragment key="f6">Kopieren Sie die URL mit der Kopierschaltfläche.</Fragment>,
            <Fragment key="f7">
              Öffnen Sie in claude.ai <strong>Settings → Connectors → Add custom connector</strong>{" "}
              und fügen Sie die URL ein.
            </Fragment>,
            <Fragment key="f8">
              Öffnen Sie einen neuen Chat und fragen Sie den Assistenten, welche Tavnit-Tools er hat.
              Wenn er sie auflistet, ist der Connector aktiv.
            </Fragment>,
          ]}
        />
      </DocCard>

      <DocCard icon={<Settings2 size={24} />} title="Cursor oder einen anderen MCP-Client verbinden">
        <Lead>
          Jeder Client, der entfernte MCP-Server unterstützt, nimmt dieselbe URL. Fügen Sie sie als
          entfernten Server (URL) hinzu, nicht als befehlsbasierten: Es gibt keinen lokalen Prozess zu
          starten, denn der Connector verweist auf einen gehosteten Server.
        </Lead>
        <NumberedList
          items={[
            "Erstellen und kopieren Sie die Connector-URL auf der Seite Integrationen wie oben beschrieben.",
            <Fragment key="f9">
              Öffnen Sie in Cursor die MCP-Einstellungen und fügen Sie einen neuen Server vom Typ{" "}
              <strong>remote</strong> / URL hinzu.
            </Fragment>,
            <Fragment key="f10">
              Fügen Sie die Connector-URL als Server-URL ein. Ein separates Feld für den API-Schlüssel
              ist nicht nötig: Die URL enthält die Zugangsberechtigung bereits.
            </Fragment>,
            "Laden Sie den Client neu und prüfen Sie, dass Tavnit in seiner Tool-Liste erscheint.",
          ]}
        />
        <InfoBox color="blue" icon={<Info size={20} />} title="Eine URL, mehrere Clients">
          Sie haben jeweils eine Connector-URL und können sie in mehr als einen Client einfügen. Alle
          handeln als Sie in derselben Organisation; eine Aktualisierung trennt also alle gleichzeitig.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Sparkles size={24} />} title="Was Ihr Assistent tun kann">
        <Lead>
          Über den Connector arbeitet der Assistent mit Ihrem API-Schlüssel an den Tavnit-Daten Ihrer
          Organisation. Das Aufbauen und Konfigurieren von Flows, Cleaners, Pipelines und Ihrem Team
          bleibt in der App.
        </Lead>
        <p>
          Die Tools, die der Connector anbietet, listet Ihr MCP-Client auf, und am schnellsten sehen
          Sie sie, indem Sie den Assistenten fragen. Fragen Sie in Alltagssprache und nennen Sie den
          Flow, den Bucket oder den Run so, wie er in der App heißt.
        </p>
        <InfoBox color="blue" icon={<Info size={20} />} title="Ihre Daten, Ihre Organisation">
          Der Connector erreicht nur die Organisation, in der er erstellt wurde. Um mit einer anderen
          Organisation zu arbeiten, wechseln Sie in Tavnit dorthin und erstellen dort eine URL. Arbeit,
          die aus dem Assistenten heraus gestartet wird, folgt Ihrer Einrichtung wie jeder andere Run:
          Verlangt ein Flow eine{" "}
          <DocLink href="/docs/human-in-the-loop">manuelle Prüfung</DocLink>, wartet der Run weiterhin
          darauf.
        </InfoBox>
      </DocCard>

      <DocCard icon={<RefreshCw size={24} />} title="Ablauf und Aktualisierung">
        <Lead>
          Connector-URLs sind zeitlich begrenzt. Die Karte Benutzerdefinierter Connector zeigt, wann
          die URL erstellt wurde und wie lange sie noch gilt, und warnt Sie in ihren letzten 24
          Stunden. Eine Aktualisierung stellt eine neue URL aus und macht die alte sofort ungültig.
        </Lead>
        <DataTable
          head={["Zustand", "Was Sie sehen", "Was zu tun ist"]}
          rows={[
            [
              "Aktiv",
              <Fragment key="s0">Die URL, das Erstellungsdatum und die verbleibenden Tage bis zum Ablauf.</Fragment>,
              "Nichts.",
            ],
            [
              "Läuft bald ab (unter 24 Stunden)",
              <Fragment key="f16">
                Die verbleibende Zeit in Stunden oder Minuten und ein gelber Hinweis:{" "}
                <em>Der Connector läuft bald ab — aktualisieren Sie jetzt, um Unterbrechungen zu vermeiden.</em>
              </Fragment>,
              "Aktualisieren und die neue URL in jeden Client einfügen, der sie nutzt.",
            ],
            [
              "Abgelaufen",
              <Fragment key="f17">
                Ein roter Hinweis:{" "}
                <em>Dieser Connector ist abgelaufen. Aktualisieren Sie, um eine neue URL zu erstellen.</em>
              </Fragment>,
              "Aktualisieren und neu einfügen. Clients mit der alten URL funktionieren bereits nicht mehr.",
            ],
          ]}
        />
        <p>
          Zum Aktualisieren wählen Sie <strong>URL aktualisieren</strong> und bestätigen im Dialog{" "}
          <em>Connector-URL aktualisieren?</em> mit <strong>Aktualisieren</strong>.
        </p>
        <WarningBox>
          Eine Aktualisierung ist keine Rotation, die Sie gestaffelt vorbereiten können. Sobald Sie
          bestätigen, funktioniert die vorherige URL nicht mehr, und jeder Assistent, der sie nutzt,
          schlägt fehl, bis Sie die neue einfügen. Aktualisieren Sie, wenn Sie die Clients sofort
          anpassen können.
        </WarningBox>
      </DocCard>

      <DocCard icon={<AlertTriangle size={24} />} title="Behandeln Sie die URL wie ein Passwort">
        <Lead>
          Die Connector-URL ist eine Zugangsberechtigung. Wer sie hat, erreicht die Daten Ihrer
          Organisation als Sie, ohne sich anzumelden. Sie in die Einstellungen eines MCP-Clients
          einzufügen ist sicher; sie in einem Ticket, einer Chatnachricht oder einem Screenshot zu
          teilen ist es nicht.
        </Lead>
        <BulletList
          items={[
            "Committen Sie sie nicht in ein Repository und fügen Sie sie nicht in ein gemeinsames Dokument ein.",
            "Verpixeln Sie sie oder schneiden Sie sie aus jedem Screenshot heraus, bevor Sie ihn teilen.",
            "Wenn sie offengelegt wurde, aktualisieren Sie sie sofort: Damit wird die betroffene URL auf der Stelle ungültig.",
            "Das Neuerstellen Ihres API-Schlüssels ist eine separate Aktion auf derselben Seite; tun Sie auch das, wenn Sie vermuten, dass der Schlüssel selbst offengelegt wurde.",
          ]}
        />
      </DocCard>

      <DocCard icon={<LifeBuoy size={24} />} title="Fehlerbehebung">
        <Lead>
          Die meisten Probleme mit dem Connector haben eine von vier Ursachen: Die Funktion ist nicht
          aktiviert, die Sitzung ist abgelaufen, die URL ist abgelaufen, oder der Client hält eine URL,
          die durch eine Aktualisierung ersetzt wurde.
        </Lead>
        <DataTable
          head={["Symptom", "Ursache", "Lösung"]}
          rows={[
            [
              "Keine Karte Benutzerdefinierter Connector unter Integrationen",
              "Der Connector ist für Ihre Organisation nicht aktiviert.",
              "Bitten Sie den Support, ihn freizuschalten.",
            ],
            [
              <Fragment key="f18"><InlineCode>Benutzerdefinierte Connectoren erfordern eine gültige Tavnit-Sitzung. Melden Sie sich ab und wieder an.</InlineCode></Fragment>,
              "Tavnit konnte Ihren Schlüssel nicht validieren, um die URL auszustellen oder zu lesen.",
              "Melden Sie sich ab und wieder an und erstellen Sie die URL erneut.",
            ],
            [
              "Der Assistent sieht Tavnit nicht mehr",
              "Die URL ist abgelaufen, oder jemand hat sie aktualisiert.",
              "Prüfen Sie die Karte auf einen Hinweis „abgelaufen“ oder „läuft bald ab“, aktualisieren Sie und fügen Sie die URL in jeden Client neu ein.",
            ],
            [
              "Der Assistent sieht die falschen Daten",
              "Die URL wurde erstellt, während Sie sich in einer anderen Organisation befanden.",
              "Wechseln Sie in Tavnit die Organisation, erstellen Sie eine neue URL und ersetzen Sie die alte.",
            ],
            [
              "Der Assistent kann eine Aktion nicht ausführen",
              "Ihre Rolle erlaubt es nicht.",
              "Prüfen Sie Ihre Rolle, bevor Sie von einem Fehler des Connectors ausgehen.",
            ],
          ]}
        />
      </DocCard>

      <DocCard icon={<MessageSquare size={24} />} title="Wann der Connector statt der API sinnvoll ist">
        <Lead>
          Nutzen Sie den Connector für dialogorientierte, spontane Arbeit: einmalige Fragen, das
          Erkunden gespeicherter Daten, schnelle Prüfungen. Nutzen Sie die REST-API für alles, was
          geplant läuft, große Volumen hat oder in ein anderes System eingebettet ist und explizite
          Fehlerbehandlung und Wiederholungen braucht.
        </Lead>
        <DataTable
          head={["Situation", "Verwenden"]}
          rows={[
            ["Eine Kollegin fragt, was ein Lieferant im letzten Quartal berechnet hat", "MCP-Connector"],
            ["Sie möchten Ihre Daten in einem Chat erkunden", "MCP-Connector"],
            ["Jede Rechnung aus einem Lieferantenportal, jede Nacht", "REST-API oder ein E-Mail-Trigger"],
            ["Ihr eigenes Produkt braucht die extrahierten Daten", "REST-API plus Webhooks"],
          ]}
        />
      </DocCard>

      <Related
        links={[
          {
            href: "/docs/api-integration",
            label: "Referenz der Tavnit-REST-API",
            description:
              "Jeder Endpunkt, mit Authentifizierung per API-Schlüssel, Anfragefeldern, Antworten und Beispielen in Python und JavaScript.",
          },
          {
            href: "/docs/buckets",
            label: "Extrahierte Daten in Buckets speichern",
            description: "Die strukturierten Tabellen, in denen Ihre extrahierten Daten liegen.",
          },
          {
            href: "/docs/user-roles",
            label: "Benutzerrollen und Berechtigungen",
            description: "Was Eigentümer, Admin, Mitglied und Nur HITL jeweils dürfen.",
          },
        ]}
      />
    </section>
  );
}
