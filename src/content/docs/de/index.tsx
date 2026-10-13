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

/** /de/docs — translated from src/app/docs/page.tsx. */

/** Mirrors the visible numbered steps under "Schritt 1: einen Flow erstellen". */
export const schema: DocsPageSchemaData = {
  howTo: {
    name: "Strukturierte Daten mit Tavnit aus einem Dokument extrahieren",
    description:
      "Erstellen Sie einen Tavnit-Flow aus einer Vorlage, aus einem Beispieldokument oder von Grund auf, prüfen Sie seine Felder, verarbeiten Sie ein Dokument und lesen Sie das strukturierte Ergebnis — ohne Vorlagen zu zeichnen und ohne Code.",
    steps: [
      {
        name: "Den Erstellungsdialog öffnen",
        text: "Klicken Sie auf der Seite Flows auf Flow erstellen.",
      },
      {
        name: "Einen Ausgangspunkt wählen",
        text: "Wählen Sie Aus einer Vorlage (eine Tavnit-Vorlage oder eine Kopie eines Ihrer Flows), KI-Vorschlag (ein Beispiel-PDF oder -Bild hochladen, die KI entwirft die Felder) oder Neu beginnen.",
      },
      {
        name: "Den Flow benennen und beschreiben",
        text: "Geben Sie dem Flow einen Namen mit mindestens 3 Zeichen und eine Beschreibung mit mindestens 10 Zeichen, die sagt, welche Dokumente er verarbeitet.",
      },
      {
        name: "Das Datenschema prüfen",
        text: "Fügen Sie im Editor Felder hinzu, bearbeiten oder löschen Sie sie, bis das Schema genau Ihren Anforderungen entspricht. Ein neuer Flow ist bereits Aktiv.",
      },
      {
        name: "Ein Dokument verarbeiten",
        text: "Klicken Sie auf Ausführen, laden Sie ein echtes Dokument hoch und prüfen Sie das Ergebnis.",
      },
    ],
  },
  primaryImage: {
    url: "/assets/tour2-runs.jpg",
    caption:
      "Die Seite Runs in Tavnit: jedes verarbeitete Dokument mit seinem Flow, seiner Quelle und seinem Status.",
    width: 1327,
    height: 801,
  },
};

export default function GettingStartedDe() {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        Erste Schritte
      </h1>

      <DocCard icon={<Sparkles size={24} />} title="Was Tavnit macht">
        <Lead>
          Tavnit liest Dokumente und liefert Ihnen strukturierte Daten zurück. Sie beschreiben einmal
          die Felder, die Sie brauchen, schicken Rechnungen, Belege, Bestellungen, Kontoauszüge,
          Tabellen oder Formulare und erhalten typisierte Zeilen — ohne für jedes Layout eine Vorlage
          zu bauen oder Parsing-Code zu schreiben.
        </Lead>
        <p>
          Die Extraktion ist der Ausgangspunkt, nicht das ganze Produkt. Rund um sie herum kann
          Tavnit eingehende Dateien sortieren und aufteilen, die Zeilen bereinigen und anreichern,
          Dokumente miteinander vergleichen und prüfen, Formulare ausfüllen, für eine manuelle
          Prüfung anhalten, Ergebnisse in Tabellen speichern, sie an Ihre Systeme liefern und an
          einen Browser-Agent übergeben, der damit arbeitet. Diese Seite gibt Ihnen den Überblick und
          führt Sie durch Ihr erstes Dokument.
        </p>
        <InfoBox color="violet" icon={<FlaskConical size={20} />} title="Einige Bereiche sind in der Beta">
          Pipelines, Subjects, Matchers, Inspectors, Fillers, Signals und Nets tragen in der App das
          Label <strong>Beta</strong>. Sie können sie schon heute nutzen, ihre Ansichten und Optionen
          können sich aber noch ändern.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Compass size={24} />} title="Eine Karte von Tavnit">
        <Lead>
          Die Seitenleiste der App gruppiert jeden Bereich nach seiner Aufgabe, vom Empfangen der
          Dokumente bis zum Handeln mit den Daten. Die Dokumentation folgt denselben Gruppen, diese
          Tabelle dient also zugleich als Inhaltsverzeichnis.
        </Lead>
        <DataTable
          head={["Gruppe", "Bereich", "Was er macht"]}
          rows={[
            [
              "Eingabe",
              <Fragment key="m0">
                <DocLink href="/docs/collections">Collections</DocLink>
              </Fragment>,
              "Ein Postfach oder Endpunkt für gemischte Dokumente: Jedes wird klassifiziert und an den richtigen Flow geleitet.",
            ],
            [
              "Eingabe",
              <Fragment key="m1">
                <DocLink href="/docs/subjects">Subjects</DocLink>
              </Fragment>,
              "Bilden Sie eine Entität wie einen Einkauf oder einen Patienten ab und sammeln Sie ihre Dokumente per Referenz in Fällen.",
            ],
            [
              "Eingabe",
              <Fragment key="m2">
                <DocLink href="/docs/splitters">Splitters</DocLink>
              </Fragment>,
              "Teilen Sie eine Datei, die mehrere Dokumente enthält, in einzelne Dokumente und leiten Sie jedes weiter.",
            ],
            [
              "Verarbeitung",
              <Fragment key="m3">
                <DocLink href="/docs/flows">Flows</DocLink>
              </Fragment>,
              "Das Schema für einen Dokumenttyp: die zu extrahierenden Felder und alles, was daran hängt. Hier beginnt alles.",
            ],
            [
              "Verarbeitung",
              <Fragment key="m4">
                <DocLink href="/docs/cleaners">Cleaners</DocLink>
              </Fragment>,
              "Extrahierte Zeilen umformatieren, umrechnen, berechnen, nachschlagen und validieren sowie Aktionen auslösen, wenn etwas nicht stimmt.",
            ],
            [
              "Verarbeitung",
              <Fragment key="m5">
                <DocLink href="/docs/agents">Agents</DocLink>
              </Fragment>,
              "Browser-Agents, die auf einer Website eine in Alltagssprache formulierte Aufgabe erledigen, oft mit extrahierten Daten als Eingabe.",
            ],
            [
              "Intelligenz",
              <Fragment key="m6">
                <DocLink href="/docs/matchers">Matchers</DocLink>
              </Fragment>,
              "Datensätze Zeile für Zeile über Dokumente hinweg vergleichen — Angebote untereinander, eine Rechnung mit ihrer Bestellung.",
            ],
            [
              "Intelligenz",
              <Fragment key="m7">
                <DocLink href="/docs/inspectors">Inspectors</DocLink>
              </Fragment>,
              "Eine Checkliste über eine Gruppe zusammengehöriger Dokumente laufen lassen und ein Ergebnis „bestanden“ oder „nicht bestanden“ erhalten.",
            ],
            [
              "Intelligenz",
              <Fragment key="m8">
                <DocLink href="/docs/fillers">Fillers</DocLink>
              </Fragment>,
              "PDF-Formularvorlagen mit Daten aus Ihren Dokumenten ausfüllen.",
            ],
            [
              "Orchestrierung",
              <Fragment key="m9">
                <DocLink href="/docs/pipelines">Pipelines</DocLink>
              </Fragment>,
              "Schritte von Anfang bis Ende auf einer visuellen Arbeitsfläche verketten.",
            ],
            [
              "Orchestrierung",
              <Fragment key="m10">
                <DocLink href="/docs/pipeline-map">Pipeline-Karte</DocLink>
              </Fragment>,
              "Ein Bild davon, wie Dokumente durch Ihre Organisation fließen.",
            ],
            [
              "Daten & Aktivität",
              <Fragment key="m11">
                <DocLink href="/docs/buckets">Buckets</DocLink>
              </Fragment>,
              "Tabellen, in denen sich Ergebnisse über viele Runs ansammeln, bereit zum Abfragen, Visualisieren und Exportieren.",
            ],
            [
              "Daten & Aktivität",
              <Fragment key="m12">
                <DocLink href="/docs/flows#runs">Runs</DocLink>
              </Fragment>,
              "Der Verlauf jedes verarbeiteten Dokuments, mit Ergebnis, Quelldatei und Protokoll.",
            ],
            [
              "Daten & Aktivität",
              <Fragment key="m13">
                <DocLink href="/docs/human-in-the-loop">Manuelle Prüfung</DocLink>
              </Fragment>,
              "Eine Prüfwarteschlange, in der eine Person Ergebnisse genehmigt, bearbeitet oder ablehnt, bevor sie zugestellt werden.",
            ],
            [
              "Audio",
              <Fragment key="m14">
                <DocLink href="/docs/signals">Signals</DocLink>
              </Fragment>,
              "Aufgezeichnete Gespräche in strukturierte Zeilen verwandeln.",
            ],
            [
              "Social Media",
              <Fragment key="m15">
                <DocLink href="/docs/nets">Nets</DocLink>
              </Fragment>,
              "Social-Media-Beiträge in strukturierte Zeilen und Trends verwandeln.",
            ],
          ]}
        />
        <InfoBox color="blue" icon={<Info size={20} />} title="Agents, Signals oder Nets fehlen?">
          Diese drei Bereiche werden pro Organisation freigeschaltet. Wenn sie in Ihrer Seitenleiste
          fehlen, bitten Sie das Tavnit-Team, sie zu aktivieren.
        </InfoBox>
        <InfoBox color="violet" icon={<Info size={20} />} title="Was sortiert meine Dokumente?">
          Wenn jede Datei ein Dokument enthält, Sie aber seinen Typ nicht kennen, nutzen Sie eine{" "}
          <DocLink href="/docs/collections">Collection</DocLink>. Wenn eine Datei mehrere Dokumente
          enthält, nutzen Sie einen <DocLink href="/docs/splitters">Splitter</DocLink>. Wenn Dokumente
          zusammengehören — derselbe Einkauf, derselbe Patient —, nutzen Sie ein{" "}
          <DocLink href="/docs/subjects">Subject</DocLink>. Wenn Sie schon wissen, um welches Dokument
          es sich handelt, schicken Sie es direkt an den Flow und lassen alle drei weg.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Rocket size={24} />} title="Ihre ersten Minuten">
        <Lead>
          Eine neue Organisation startet mit einem kurzen Einrichtungspfad, Sie stehen also selten vor
          einer leeren Seite.
        </Lead>
        <BulletList
          items={[
            <Fragment key="o0">
              <strong>Willkommensfragen.</strong> Nachdem Sie Ihre Organisation erstellt haben, stellt
              Tavnit vier kurze Fragen: welche Dokumente Sie verarbeiten werden, was Sie erreichen
              möchten, wie Ihre Dokumente heute ankommen und wie viele Sie ungefähr pro Monat
              bearbeiten. Das dauert etwa 30 Sekunden, und Sie können die Fragen{" "}
              <strong>Überspringen</strong>.
            </Fragment>,
            <Fragment key="o1">
              <strong>Start-Flows mit einem Klick.</strong> Wenn Sie geantwortet haben, bietet die
              leere Seite Flows unter{" "}
              <em>„Basierend auf Ihren Antworten können wir Folgendes für Sie einrichten:“</em> die
              Vorlagen an, die zu Ihren Dokumenten passen. Klicken Sie auf{" "}
              <strong>Diese Flows erstellen</strong>, und sie werden für Sie angelegt, bereit zum
              Bearbeiten.
            </Fragment>,
            <Fragment key="o2">
              <strong>Startvorlagen.</strong> Tavnit liefert fertige Flows für Rechnungen,
              Bestellungen, Belege, Kontoauszüge, Lieferscheine, Laborbefunde, Verträge, Angebote,
              Gutschriften, Ausweisdokumente und Lebensläufe. Vorlagen, die zu Ihren Antworten passen,
              werden zuerst angezeigt.
            </Fragment>,
            <Fragment key="o3">
              <strong>Die Einstiegshilfe.</strong> Ein kleines Panel in der Ecke der App mit drei
              Registerkarten: <strong>Checkliste</strong> (Einrichtungsschritte, die sich selbst
              abhaken, sobald Sie sie erledigen), <strong>Diese Ansicht</strong> (Tipps für die Seite,
              auf der Sie gerade sind) und <strong>Funktionen</strong> (jeder Bereich, der Ihnen zur
              Verfügung steht). Wenn Sie es ausblenden, öffnen Sie es über das Menü{" "}
              <strong>Hilfe &amp; Support</strong> wieder.
            </Fragment>,
          ]}
        />
      </DocCard>

      <DocCard icon={<FilePlus size={24} />} title="Schritt 1: einen Flow erstellen">
        <Lead>
          Ein Flow ist das Schema für einen Dokumenttyp. Benennen Sie ihn nach dem Dokument, nicht
          nach dem Projekt — <em>Lieferantenrechnungen</em>, nicht <em>Automatisierung Q1</em> —, denn
          Name und Beschreibung sind auch das, womit eine Collection Dokumente an ihn weiterleitet.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f5">
              Klicken Sie auf der Seite <strong>Flows</strong> auf <strong>Flow erstellen</strong>.
            </Fragment>,
            <Fragment key="f6">
              Wählen Sie einen Ausgangspunkt: <strong>Aus einer Vorlage</strong> (eine Tavnit-Vorlage
              oder eine Kopie eines Ihrer eigenen Flows unter <strong>Meine Flows</strong>),{" "}
              <strong>KI-Vorschlag</strong> (ein Beispiel-PDF oder -Bild hochladen, die KI entwirft
              die Felder) oder <strong>Neu beginnen</strong>.
            </Fragment>,
            <Fragment key="f7">
              Geben Sie dem Flow einen Namen mit mindestens 3 Zeichen und eine Beschreibung mit
              mindestens 10 Zeichen, die sagt, welche Dokumente er verarbeitet.
            </Fragment>,
            <Fragment key="f8">
              Fügen Sie im Editor Felder hinzu, bearbeiten oder löschen Sie sie, bis das Schema genau
              Ihren Anforderungen entspricht. Ein neuer Flow ist bereits <strong>Aktiv</strong>.
            </Fragment>,
            <Fragment key="f9">
              Klicken Sie auf <strong>Ausführen</strong>, laden Sie ein echtes Dokument hoch und
              prüfen Sie das Ergebnis.
            </Fragment>,
          ]}
        />
        <p>
          <DocLink href="/docs/flows">Flows</DocLink> behandelt jeden dieser Schritte ausführlich —
          Feldarten, Datentypen, die Hinweise, die der KI sagen, wo sie suchen soll, und die
          Schaltfläche <strong>Diagnose</strong>, die Korrekturen vorschlägt, sobald ein Flow echte
          Runs hat.
        </p>
        <InfoBox color="blue" icon={<Info size={20} />} title="Die Beschreibung zählt">
          Die Beschreibung ist Pflicht, und sie lohnt sich doppelt: Sie hilft der KI, genauer zu
          extrahieren, und sie ist das, womit eine{" "}
          <DocLink href="/docs/collections">Collection</DocLink> Dokumente an den Flow weiterleitet.
          Eine vage Beschreibung verschlechtert beides.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Table2 size={24} />} title="Schritt 2: Metadatenfelder und Tabellenfelder">
        <Lead>
          Tavnit unterscheidet Werte, die einmal pro Dokument vorkommen, von Werten, die sich
          wiederholen. Diese eine Unterscheidung bestimmt die Form von allem, was danach kommt — Ihr
          Webhook-Payload, Ihre Bucket-Zeilen und Ihre CSV folgen ihr.
        </Lead>
        <DataTable
          head={["Feldart", "Kommt vor", "Auf einer Rechnung"]}
          rows={[
            [
              "Metadatenfeld",
              "Einmal pro Dokument",
              "Rechnungsnummer, Rechnungsdatum, Lieferant, Gesamtbetrag",
            ],
            [
              "Tabellenfeld",
              "Einmal pro Position",
              "Beschreibung, Menge, Einzelpreis, Betrag",
            ],
          ]}
        />
        <p>
          Jedes Feld hat außerdem einen Datentyp — Text, Zahl, Datum, Gemischt/Alphanumerisch oder
          Bild —, und der richtige Typ ist wichtiger, als es aussieht: Ein als Text typisierter
          Gesamtbetrag lässt sich nicht summieren, vergleichen oder in Diagrammen darstellen. Ein Flow
          nur mit Metadatenfeldern liefert eine einzige Zeile pro Dokument.{" "}
          <DocLink href="/docs/flows">Flows</DocLink> behandelt das vollständige Schema, einschließlich
          Extraktionshinweisen, zusammengesetzten Feldern und der Korrektur eines Felds, das falsch
          zurückkommt.
        </p>
      </DocCard>

      <DocCard icon={<Clock size={24} />} title="Schritt 3: Dokumente einsenden">
        <Lead>
          Vier Wege hinein, die alle dieselbe Art von Run erzeugen. Beginnen Sie mit einem manuellen
          Upload, um zu zeigen, dass der Flow funktioniert, und wechseln Sie dann zu dem Weg, auf dem
          Ihre Dokumente tatsächlich ankommen.
        </Lead>
        <DataTable
          head={["Weg", "Geeignet für", "Einrichtung"]}
          rows={[
            [
              "Upload in der App",
              "Tests und einzelne Dokumente",
              "Keine. Wählen Sie mehrere Dateien auf einmal, und jede wird zu einem eigenen Run",
            ],
            [
              <Fragment key="f10">
                <DocLink href="/docs/email-integration">E-Mail</DocLink>
              </Fragment>,
              "Dokumente, die schon in einem Postfach ankommen",
              "Den E-Mail-Trigger des Flows einschalten und E-Mails an seine Adresse weiterleiten",
            ],
            [
              <Fragment key="f11">
                <DocLink href="/docs/api-integration">REST-API</DocLink>
              </Fragment>,
              "Ihre eigenen Systeme und hohe Volumen",
              "Ein API-Schlüssel und ein POST",
            ],
            [
              <Fragment key="f12">
                <DocLink href="/docs/mcp-connector">MCP-Connector</DocLink>
              </Fragment>,
              "Spontane Arbeit aus einem KI-Assistenten heraus",
              "Auf Anfrage pro Organisation aktiviert, dann eine Connector-URL unter Integrationen",
            ],
          ]}
        />
        <p>
          Flows akzeptieren PDFs, Bilder (PNG, JPG, JPEG und JFIF) und Tabellen (XLSX, XLS und CSV).
          Bei einer Tabelle liest der Flow das erste sichtbare Blatt. Gescannte Dokumente werden
          automatisch erkannt und per OCR gelesen.
        </p>
        <Screenshot
          src="/assets/tour2-runs.jpg"
          alt="Die Seite Runs in Tavnit mit verarbeiteten Dokumenten, jeweils mit Flow, auslösender Person, Quelle und Status, über Kennzahlen zu abgeschlossenen, laufenden und allen Runs."
          caption="Jedes Dokument wird zu einem Run. Die Seite Runs zeigt, was verarbeitet wurde, wie es ankam und wie es endete."
        />
        <p>
          Öffnen Sie einen beliebigen Run, um die extrahierten Felder neben dem Quelldokument zu
          sehen, dazu das Protokoll der Verarbeitung. Dieses Protokoll ist die erste Anlaufstelle,
          wenn ein Ergebnis nicht Ihren Erwartungen entspricht.
        </p>
      </DocCard>

      <DocCard icon={<Map size={24} />} title="Wie es weitergeht">
        <Lead>
          Sobald die Extraktion funktioniert, hängt der nächste Schritt davon ab, was mit den Daten
          nicht stimmt oder was Sie mit ihnen tun müssen.
        </Lead>
        <DataTable
          head={["Wenn Sie …", "Lesen Sie"]}
          rows={[
            [
              "mehr Felder extrahieren oder ein falsch zurückkommendes Feld korrigieren möchten",
              <Fragment key="f17">
                <DocLink href="/docs/flows">Flows</DocLink>
              </Fragment>,
            ],
            [
              "Formate korrigieren, Währungen umrechnen, Summen berechnen oder fehlerhafte Zeilen markieren möchten",
              <Fragment key="f18">
                <DocLink href="/docs/cleaners">Cleaners</DocLink>
              </Fragment>,
            ],
            [
              "Ergebnisse von einer Person prüfen lassen möchten, bevor sie weitergehen",
              <Fragment key="f19">
                <DocLink href="/docs/human-in-the-loop">Manuelle Prüfung</DocLink>
              </Fragment>,
            ],
            [
              "die Daten in Ihre eigenen Systeme bringen möchten",
              <Fragment key="f20">
                <DocLink href="/docs/webhooks">Webhooks</DocLink> oder die{" "}
                <DocLink href="/docs/api-integration">REST-API</DocLink>
              </Fragment>,
            ],
            [
              "Ergebnisse gesammelt aufbewahren und abfragen möchten",
              <Fragment key="f21">
                <DocLink href="/docs/buckets">Buckets</DocLink>
              </Fragment>,
            ],
            [
              "Dokumente vergleichen oder gegen eine Liste von Regeln prüfen möchten",
              <Fragment key="f24">
                <DocLink href="/docs/matchers">Matchers</DocLink> und{" "}
                <DocLink href="/docs/inspectors">Inspectors</DocLink>
              </Fragment>,
            ],
            [
              "mehrere Schritte zu einem Prozess verbinden möchten",
              <Fragment key="f25">
                <DocLink href="/docs/pipelines">Pipelines</DocLink>
              </Fragment>,
            ],
            [
              "mit den Daten an anderer Stelle im Web handeln möchten",
              <Fragment key="f22">
                <DocLink href="/docs/agents">Agents</DocLink>
              </Fragment>,
            ],
            [
              "steuern möchten, wer was sehen und ändern darf",
              <Fragment key="f23">
                <DocLink href="/docs/user-roles">Benutzerrollen</DocLink>
              </Fragment>,
            ],
          ]}
        />
      </DocCard>

      <Related
        links={[
          {
            href: "/docs/flows",
            label: "Das Datenschema eines Flows im Detail aufbauen",
            description:
              "Feldarten, Datentypen, Extraktionshinweise, zusammengesetzte Felder, Runs und alles, was Sie an einen Flow anhängen können.",
          },
          {
            href: "/docs/api-integration",
            label: "Dokumente mit der Tavnit-REST-API verarbeiten",
            description:
              "Upload per Multipart und Base64, Authentifizierung per API-Schlüssel, Beispiele in Python und JavaScript sowie No-Code-Rezepte.",
          },
          {
            href: "/docs/email-integration",
            label: "Aus E-Mail-Anhängen extrahieren",
            description: "Geben Sie einem Flow sein eigenes Postfach und leiten Sie Dokumente dorthin weiter.",
          },
          {
            href: "/docs/pipeline-map",
            label: "Sehen, wie alles zusammenhängt",
            description:
              "Eine Live-Karte Ihrer Flows, Collections, Splitters, Cleaners und Buckets.",
          },
        ]}
      />
    </section>
  );
}
