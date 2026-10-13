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

/** /de/docs/flows — translated from src/app/docs/flows/page.tsx. */

/** Mirrors the visible numbered steps under "Das Schema aufbauen". */
export const schema: DocsPageSchemaData = {
  howTo: {
    name: "Einen Tavnit-Flow aufbauen, der strukturierte Daten aus einem Dokument extrahiert",
    description:
      "Erstellen Sie einen Flow, legen Sie seine Metadaten- und Tabellenfelder fest, fügen Sie Extraktionshinweise nur dort hinzu, wo sie nötig sind, und testen Sie ihn an einem echten Dokument.",
    steps: [
      {
        name: "Den Flow erstellen und beschreiben",
        text: "Klicken Sie auf der Seite Flows auf Flow erstellen und wählen Sie eine Vorlage, einen KI-Vorschlag oder einen leeren Flow. Geben Sie ihm einen Namen und eine Beschreibung der Dokumente, die er verarbeitet — die Beschreibung hilft der KI auch, genauer zu extrahieren.",
      },
      {
        name: "Metadatenfelder hinzufügen",
        text: "Fügen Sie für jeden Wert, der einmal pro Dokument vorkommt, ein Feld hinzu, etwa Rechnungsnummer, Rechnungsdatum oder Lieferant, und legen Sie seinen Datentyp fest.",
      },
      {
        name: "Tabellenfelder hinzufügen",
        text: "Fügen Sie für jede Spalte der sich wiederholenden Positionstabelle ein Feld hinzu, etwa Beschreibung, Menge, Einzelpreis und Betrag.",
      },
      {
        name: "Extraktionshinweise hinzufügen, wo nötig",
        text: "Fügen Sie Hinweise nur den Feldern hinzu, die sie brauchen: echte Beispielwerte, die Beschriftung, neben der ein Wert steht, den Seitenbereich, in dem er erscheint, oder die gedruckte Spaltenüberschrift.",
      },
      {
        name: "An einem echten Dokument testen",
        text: "Ein neuer Flow ist bereits Aktiv. Klicken Sie auf Ausführen, verarbeiten Sie ein echtes Dokument, vergleichen Sie das Ergebnis mit der Quelle und schärfen Sie die Hinweise jedes Felds nach, das falsch zurückkam.",
      },
    ],
  },
  primaryImage: {
    url: "/assets/docs-flow-schema-2026-08.jpg",
    caption:
      "Das Datenschema eines Tavnit-Flows, mit Metadatenfeldern und Tabellenfeldern nebeneinander.",
    width: 1327,
    height: 801,
  },
};

export default function FlowsDe() {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        Flows
      </h1>

      <DocCard icon={<Sparkles size={24} />} title="Was ein Flow ist">
        <Lead>
          Ein Flow ist die Definition eines Dokumenttyps: die Felder, die Sie extrahieren möchten, die
          Hinweise, die der KI sagen, wo sie sie findet, und alles, was nachgelagert daran hängt. Er
          ist das Objekt in Tavnit, das aus einem Dokument Daten macht — Collections, Subjects,
          Splitters und Cleaners gibt es nur, um zu speisen oder zu verfeinern, was ein Flow liefert.
        </Lead>
        <p>
          Es gibt keine Vorlage zu zeichnen und keine Koordinaten zuzuordnen. Sie beschreiben die
          Felder in einfachen Worten, und der Flow funktioniert über Layouts hinweg: Ein einziger Flow{" "}
          <em>Lieferantenrechnungen</em> kann zwanzig Lieferanten verarbeiten, deren Rechnungen sich
          überhaupt nicht ähneln. Deshalb entscheiden das Schema und seine Hinweise fast vollständig
          über die Qualität der Extraktion.
        </p>
        <Screenshot
          src="/assets/docs-flow-schema-2026-08.jpg"
          alt="Das Datenschema eines Tavnit-Flows namens Invoice Processor. Ein Panel Metadatenfelder listet neun Einzelwertfelder wie Invoice Number, Due Date und Total mit ihren Datentypen, daneben ein Panel Tabellenfelder mit Description, Quantity, Price und Amount. Die linke Leiste gruppiert Letzte Runs, E-Mail-Trigger, Collections, Cleaner, Agent, Formularvorlagen, E-Mail-Ausgabe, Webhook, Bucket-Export, manuelle Prüfung und Flow-ID."
          caption="Das Datenschema eines Flows. Metadatenfelder links, sich wiederholende Tabellenfelder rechts und in der Leiste alles, was sich an den Flow anhängen lässt."
        />
        <InfoBox color="blue" icon={<Info size={20} />} title="Nur das Schema ist Pflicht">
          Ein Flow braucht mindestens ein Feld. Alles andere in der Leiste — Cleaner, Agent, Webhook,
          E-Mail, Bucket-Export, Prüfung — ist optional und lässt sich später hinzufügen, ohne etwas
          neu aufzubauen. Eigentümer und Admins können Flows erstellen und bearbeiten.
        </InfoBox>
      </DocCard>

      <DocCard icon={<FilePlus size={24} />} title="Einen Flow erstellen">
        <Lead>
          Klicken Sie auf der Seite Flows auf <strong>Flow erstellen</strong>, und Tavnit fragt{" "}
          <em>„Wie möchten Sie beginnen?“</em>. Alle drei Wege führen zum selben bearbeitbaren Flow,
          wählen Sie also den, der Sie am schnellsten zu einem guten ersten Entwurf bringt.
        </Lead>
        <DataTable
          head={["Option", "Was sie macht", "Am besten, wenn"]}
          rows={[
            [
              "Aus einer Vorlage",
              <Fragment key="c0">
                Öffnet eine Galerie mit zwei Registerkarten. <strong>Tavnit-Vorlagen</strong> sind
                fertige Flows mit bereits ausgefüllten Feldern und Hinweisen; unter{" "}
                <strong>Meine Flows</strong> können Sie mit <strong>Kopie erstellen</strong> einen
                Ihrer eigenen aktiven Flows kopieren.
              </Fragment>,
              "Ihr Dokument ein gängiger Typ ist oder einem Flow ähnelt, den Sie schon haben.",
            ],
            [
              "KI-Vorschlag",
              "Laden Sie ein Beispiel-PDF oder -Bild hoch. Die KI liest es, erkennt die Felder und entwirft einen Namen, eine Beschreibung und ein Schema mit Hinweisen. Entfernen Sie die Haken bei allem, was Sie nicht brauchen, und bearbeiten Sie beliebige Felder, bevor Sie den Flow erstellen.",
              "Ihr Dokument spezifisch für Ihr Unternehmen ist und Sie einen Vorsprung möchten.",
            ],
            [
              "Neu beginnen",
              "Ein leeres Schema. Sie legen jedes Feld selbst fest.",
              "Sie genau wissen, was Sie brauchen, oder einen bestehenden Prozess nachbauen.",
            ],
          ]}
        />
        <p>
          Tavnit-Vorlagen gibt es für Rechnungen, Bestellungen, Belege, Kontoauszüge, Lieferscheine,
          Laborbefunde, Verträge, Angebote, Gutschriften, Ausweisdokumente und Lebensläufe. Wenn Sie
          bei der Einrichtung Ihrer Organisation die Willkommensfragen beantwortet haben, werden die
          Vorlagen, die zu Ihren Dokumenten passen, zuerst angezeigt, und die leere Seite Flows bietet
          an, sie alle mit einem Klick auf <strong>Diese Flows erstellen</strong> anzulegen.
        </p>
        <p>
          Jeder Weg endet mit einem Namen (mindestens 3 Zeichen) und einer Beschreibung (mindestens 10
          Zeichen). Der Flow öffnet sich im Editor mit einer kurzen Anleitung{" "}
          <em>„Richten Sie Ihren Flow ein“</em> und ist von Anfang an <strong>Aktiv</strong> — mit dem
          Schalter in der oberen Leiste deaktivieren Sie ihn. Ein inaktiver Flow kann nicht ausgeführt
          werden.
        </p>
        <InfoBox color="green" icon={<Info size={20} />} title="Ein KI-Vorschlag erzeugt keinen Run">
          Einen Flow aus einem Beispieldokument zu entwerfen erzeugt keinen Run. Betrachten Sie den
          Entwurf als Ausgangspunkt — löschen Sie, was Sie nicht verwenden werden, denn jedes
          zusätzliche Feld ist mehr zu prüfen und mehr, das schiefgehen kann.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Table2 size={24} />} title="Metadatenfelder und Tabellenfelder">
        <Lead>
          Jedes Feld gehört zu einer von zwei Arten, je nachdem, ob der Wert einmal pro Dokument oder
          einmal pro Zeile vorkommt. Das ist die folgenreichste Entscheidung im Schema: Sie bestimmt
          die Form Ihres Webhook-Payloads, Ihrer Bucket-Zeilen, Ihrer CSV und Ihrer Prüfansicht.
        </Lead>
        <DataTable
          head={["", "Metadatenfeld", "Tabellenfeld"]}
          rows={[
            ["Kommt vor", "Einmal pro Dokument", "Einmal pro Zeile einer sich wiederholenden Tabelle"],
            [
              "Auf einer Rechnung",
              "Rechnungsnummer, Rechnungsdatum, Lieferant, Gesamtbetrag",
              "Beschreibung, Menge, Einzelpreis, Betrag",
            ],
            [
              "In der Ausgabe",
              <Fragment key="f0">
                Das Objekt <InlineCode>metadata</InlineCode>
              </Fragment>,
              <Fragment key="f1">
                Ein Eintrag pro Zeile in <InlineCode>rows</InlineCode>
              </Fragment>,
            ],
            [
              "In einem Bucket",
              "Wird auf jede aus diesem Dokument exportierte Zeile übernommen",
              "Je eine Bucket-Zeile",
            ],
          ]}
        />
        <InfoBox color="violet" icon={<Info size={20} />} title="Die falsche Art ist der klassische Fehler">
          Wenn Sie eine Positionsspalte als Metadatenfeld anlegen, erhalten Sie einen Wert aus einer
          Tabelle mit zwanzig. Wenn Sie einen Rechnungsbetrag als Tabellenfeld anlegen, steht dieselbe
          Zahl in jeder Zeile. Im Zweifel fragen Sie sich, ob eine zweite Ausprägung des Werts jemals
          auf demselben Dokument vorkommen könnte.
        </InfoBox>
        <p>
          Ein Flow <strong>nur mit Metadatenfeldern</strong> — ein Ausweisdokument, ein Zertifikat,
          ein einseitiges Formular — liefert eine einzige Zeile pro Dokument mit diesen Werten. Das
          Ergebnis landet also wie bei jedem anderen Run in Ihrer Tabellenansicht, im Bucket, im
          Webhook und in der E-Mail.
        </p>
        <p>
          Ein Flow kann außerdem <strong>Systemspalten</strong> in jede ausgegebene Zeile schreiben —
          die Flow-ID, den Flow-Namen und die Run-ID. Schalten Sie sie ein, wenn mehrere Flows in
          denselben <DocLink href="/docs/buckets">Bucket</DocLink> schreiben und Sie wissen müssen, aus
          welchem Dokument eine Zeile stammt.
        </p>
      </DocCard>

      <DocCard icon={<Type size={24} />} title="Datentypen">
        <Lead>
          Jedes Feld hat einen Typ. Typen sind keine Kosmetik: Sie entscheiden, ob ein Wert richtig
          sortiert, summiert, in einer Cleaner-Regel verglichen und in Diagrammen dargestellt wird.
          Wer sie schon im Flow richtig setzt, spart in jeder späteren Phase Arbeit.
        </Lead>
        <DataTable
          head={["Typ", "Verwenden für", "Hinweise"]}
          rows={[
            ["Text", "Namen, Adressen, Beschreibungen, Referenzcodes", "Die sichere Voreinstellung."],
            [
              "Zahl",
              "Summen, Mengen, Preise, Sätze",
              "Pflicht, wenn Sie den Wert später summieren, vergleichen oder in Diagrammen darstellen möchten.",
            ],
            [
              "Datum",
              "Rechnungsdaten, Fälligkeitsdaten, Lieferdaten",
              <Fragment key="f2">
                Das Umformatieren in ein einheitliches Ausgabeformat ist Aufgabe eines{" "}
                <DocLink href="/docs/cleaners">Cleaners</DocLink>, nicht der Extraktion.
              </Fragment>,
            ],
            [
              "Gemischt/Alphanumerisch",
              "Werte aus Buchstaben und Ziffern — Teilenummern, Containernummern, Steuernummern",
              "Verwenden Sie diesen Typ statt Zahl, wenn führende Nullen oder Buchstaben erhalten bleiben müssen.",
            ],
            [
              "Bild",
              "Im Dokument abgedruckte Abbildungen: Fotos, Logos, Unterschriften, Stempel",
              "Wird extrahiert, sicher gespeichert und als zeitlich begrenzter Link zugestellt.",
            ],
          ]}
        />
        <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Wie gedruckt extrahieren, später normalisieren">
          Nutzen Sie den Typ nicht zum Umformatieren. Übernehmen Sie den Wert so, wie das Dokument ihn
          zeigt, und lassen Sie dann einen Cleaner Währungen umrechnen, Datumsangaben umformatieren
          und Dezimaltrennzeichen korrigieren. Eine Extraktion, die gleichzeitig transformiert, ist
          schwerer zu debuggen, wenn eine Zahl falsch zurückkommt.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Crosshair size={24} />} title="Extraktionshinweise">
        <Lead>
          Mit Hinweisen machen Sie ein Feld eindeutig, ohne eine Vorlage zu schreiben. Am wichtigsten
          sind sie, wenn ein Dokument mehrere ähnlich aussehende Werte enthält — drei Datumsangaben,
          zwei Summen, eine Bestell- und eine Rechnungsnummer im selben Kopfbereich.
        </Lead>
        <p>
          <strong>Für ein Metadatenfeld</strong> können Sie beliebige dieser Hinweise kombinieren:
        </p>
        <DataTable
          head={["Hinweis", "Was er der KI sagt", "Geeignet für"]}
          rows={[
            [
              "Beispielwerte",
              "Echte Werte aus Ihren Dokumenten.",
              "Fast alles. Der wertvollste Hinweis überhaupt — er zeigt Format, Länge und Form auf einmal.",
            ],
            [
              "Neben einer Beschriftung",
              <Fragment key="f3">
                Die gedruckte Beschriftung, neben der der Wert steht. Listen Sie die Varianten auf:{" "}
                <em>Rechnungsnummer, Rechnung Nr., Re.-Nr.</em>
              </Fragment>,
              "Kopffelder, die verschiedene Lieferanten unterschiedlich beschriften.",
            ],
            [
              "In einem bestimmten Seitenbereich",
              "Eine von neun Zonen — von oben links bis unten rechts.",
              "Werte, die immer in derselben Ecke stehen, etwa eine Belegnummer oben rechts.",
            ],
            [
              "Erwarteter Bereich",
              "Ein Minimum, ein Maximum oder beides. Gilt als Orientierung, nicht als harte Regel.",
              "Einen verrutschten Dezimalpunkt erkennen — eine Summe von 27.030, wo 270,30 gemeint war.",
            ],
            [
              "Weitere Hinweise",
              "Freitext für alles, was die Optionen oben nicht abdecken.",
              "Regeln wie „den Nettobetrag verwenden, nie den Bruttobetrag“.",
            ],
          ]}
        />
        <p>
          <strong>Für ein Tabellenfeld</strong> sind die Hinweise andere, weil die KI eine Spalte
          sucht statt eines Punkts auf der Seite:
        </p>
        <DataTable
          head={["Hinweis", "Was er der KI sagt"]}
          rows={[
            [
              "Quelltyp",
              "Tabelle für Daten in einer echten Tabelle mit Spalten; Freiform für zeilenartige Werte in unstrukturiertem Text, etwa in einem Vertrag.",
            ],
            [
              "Spaltenüberschriften",
              "Der Überschriftentext, wie er gedruckt ist. Listen Sie jede Variante Ihrer Lieferanten auf, damit ein Feld sie alle erfasst.",
            ],
            ["Erwarteter Bereich", "Ein Plausibilitätsbereich für die Zahlen in dieser Spalte."],
            ["Beispielwerte", "Echte Zellwerte aus Ihren Dokumenten."],
            [
              "Zusätzliche Informationen",
              "Was die Spalte tatsächlich darstellt, wenn die Überschrift allein mehrdeutig ist — „Einzelpreis vor Rabatt“.",
            ],
          ]}
        />
        <InfoBox color="green" icon={<Info size={20} />} title="Ohne Hinweise beginnen">
          Fügen Sie Felder hinzu, verarbeiten Sie ein echtes Dokument und ergänzen Sie Hinweise nur
          dort, wo das Ergebnis falsch war. Alles vorab mit Hinweisen zu versehen kostet Zeit bei
          Feldern, die nie mehrdeutig waren, und ein überspezifizierter Hinweis kann die Extraktion
          verschlechtern, weil er ein Layout ausschließt, mit dem Sie nicht gerechnet haben. Sobald der
          Flow einige Runs hat, kann <strong>Diagnose</strong> Hinweise für Sie vorschlagen.
        </InfoBox>
        <p>
          Beispielwerte werden bei Feldern vom Typ <strong>Datum</strong> und <strong>Bild</strong>{" "}
          ignoriert; schreiben Sie Hinweise zu Datumsangaben daher in das Feld für weitere Hinweise.
        </p>
      </DocCard>

      <DocCard icon={<Puzzle size={24} />} title="Zusammengesetzte Felder">
        <Lead>
          Manche Tabellenspalten enthalten mehrere Werte in einer Zelle — eine Aufschlüsselung nach
          Größe und Menge wie <em>S:2 M:5 L:3</em> in einem einzigen Kästchen. Ein zusammengesetztes
          Feld zerlegt diese Zelle in Unterfelder, sodass jeder Teil ein eigener Wert wird statt einer
          Zeichenkette, die Sie später parsen müssen.
        </Lead>
        <NumberedList
          items={[
            "Fügen Sie ein Tabellenfeld hinzu und schalten Sie „Zusammengesetztes Feld“ ein.",
            <Fragment key="f4">
              Legen Sie die Unterfelder fest, aus denen die Zelle besteht — zum Beispiel{" "}
              <InlineCode>size</InlineCode> als Text und <InlineCode>quantity</InlineCode> als Zahl.
            </Fragment>,
            "Fügen Sie Beispielwerte hinzu, die zeigen, wie die Gruppierung in Ihren Dokumenten aussieht.",
          ]}
        />
        <p>
          Unterfelder enthalten Einzelwerte, sie können also Text, Zahl, Datum oder
          Gemischt/Alphanumerisch sein — aber nicht Bild. Zusammengesetzte Felder gibt es nur bei
          Tabellenfeldern, denn es geht ja gerade darum, eine sich wiederholende Zelle aufzuschlüsseln.
        </p>
        <InfoBox color="blue" icon={<Boxes size={20} />} title="Mehrwertige Metadatenfelder">
          Das Gegenstück bei Metadaten ist <strong>Mehrere Werte akzeptieren</strong>. Schalten Sie es
          ein, wenn ein einzelnes Dokument berechtigterweise mehrere gleichartige Werte tragen kann —
          eine Reihe von Belegnummern, mehrere Bestellreferenzen —, und das Feld liefert eine Liste
          statt eines einzelnen Werts. Bei Bildfeldern ist es nicht verfügbar.
        </InfoBox>
      </DocCard>

      <DocCard icon={<ImageIcon size={24} />} title="Bilder extrahieren">
        <Lead>
          Ein Bildfeld holt statt Text eine Abbildung aus dem Dokument: ein Produktfoto, eine
          Unterschrift, einen Stempel, ein Logo. Ein Bildfeld in den Metadaten enthält ein Bild pro
          Dokument; ein Bildfeld in der Tabelle gibt jeder Zeile das Bild, das zu ihr gehört.
        </Lead>
        <BulletList
          items={[
            "Bilder werden privat gespeichert und kommen daher nachgelagert als zeitlich begrenzte Links an, nicht als Rohdaten",
            "Dieselbe Art von Link steht im Webhook-Payload, in der E-Mail-Ausgabe und in der CSV-Zelle; ein Export von der Run-Seite erzeugt frische Links",
            "Links in Zustellungen sind sieben Tage gültig — laden Sie das Bild herunter, statt den Link zu speichern",
            "Bildfelder können weder zusammengesetzt sein noch mehrere Werte akzeptieren, und Beispielwerte gelten für sie nicht",
          ]}
        />
      </DocCard>

      <DocCard icon={<FilePlus size={24} />} title="Das Schema aufbauen">
        <Lead>
          Legen Sie zuerst die Metadatenfelder an, dann die Tabellenfelder, dann die Hinweise. Testen
          Sie früh an einem echten Dokument — ein Schema, das auf dem Papier richtig aussieht, und
          eines, das Ihre tatsächlichen Unterlagen übersteht, sind zwei verschiedene Dinge.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f5">
              Klicken Sie auf <strong>Flow erstellen</strong> und wählen Sie eine Vorlage, einen
              KI-Vorschlag oder einen leeren Flow. Geben Sie ihm einen Namen, der das Dokument
              beschreibt (<em>Lieferantenrechnungen</em>), und eine echte Beschreibung — sie verbessert
              die Genauigkeit der Extraktion und ist das, womit eine{" "}
              <DocLink href="/docs/collections">Collection</DocLink> später zuordnet.
            </Fragment>,
            <Fragment key="f6">
              Klicken Sie unter <strong>Metadatenfelder</strong> für jeden Wert, der einmal pro
              Dokument vorkommt, auf <strong>Feld hinzufügen</strong> und legen Sie dabei den
              Datentyp fest.
            </Fragment>,
            <Fragment key="f7">
              Fügen Sie unter <strong>Tabellenfelder</strong> für jede Spalte der sich wiederholenden
              Positionstabelle ein Feld hinzu.
            </Fragment>,
            <Fragment key="f8">
              Fügen Sie <strong>Extraktionshinweise</strong> nur den Feldern hinzu, die sie brauchen.
            </Fragment>,
            <Fragment key="f9">
              Der Flow ist bereits <strong>Aktiv</strong>. Klicken Sie auf <strong>Ausführen</strong>,
              verarbeiten Sie ein echtes Dokument und vergleichen Sie das Ergebnis mit der Quelle.
            </Fragment>,
          ]}
        />
        <p>Ziehen Sie Felder an ihrem Griff, um sie neu anzuordnen.</p>
        <WarningBox>
          Das Umbenennen eines Felds ändert den Schlüssel in jedem nachgelagerten Verbraucher: im
          Webhook-Payload, in der Spaltenzuordnung des Buckets, in der CSV-Kopfzeile und in jedem{" "}
          <DocLink href="/docs/cleaners">Cleaner</DocLink>, der es liest. Prüfen Sie, was angehängt
          ist, bevor Sie ein Feld in einem Flow umbenennen, der bereits produktiv läuft.
        </WarningBox>
      </DocCard>

      <DocCard icon={<FileInput size={24} />} title="Welche Dateien ein Flow liest">
        <Lead>
          Ein Flow akzeptiert PDFs, Bilder und Tabellen, auf jedem Weg — Upload, E-Mail und API.
          Tavnit entscheidet selbst, wie jede Datei gelesen wird, Sie konfigurieren also nichts pro
          Format.
        </Lead>
        <DataTable
          head={["Datei", "Formate", "Wie sie gelesen wird"]}
          rows={[
            [
              "PDF",
              "PDF",
              "Digitale PDFs werden direkt gelesen. Gescannte PDFs werden automatisch erkannt und zuerst per OCR gelesen.",
            ],
            [
              "Bild",
              "PNG, JPG, JPEG, JFIF",
              "Wird wie eine gescannte Seite gelesen. JFIF ist die JPEG-Variante, die manche Windows-Browser standardmäßig speichern, und funktioniert wie jedes JPEG.",
            ],
            [
              "Tabelle",
              "XLSX, XLS, CSV",
              "Das erste sichtbare Blatt wird gelesen. Andere und ausgeblendete Blätter werden ignoriert, legen Sie die gewünschten Daten also auf das erste Blatt.",
            ],
          ]}
        />
        <p>
          Sehr große Blätter werden mit einer eindeutigen Fehlermeldung abgelehnt. Um jedes Blatt einer
          Arbeitsmappe als eigenes Dokument zu verarbeiten, schicken Sie sie stattdessen durch einen{" "}
          <DocLink href="/docs/splitters">Splitter</DocLink>.
        </p>
        <InfoBox color="blue" icon={<Info size={20} />} title="Schlechter Scan: OCR für Dateien erzwingen, die schlecht extrahiert werden">
          Gescannte Dokumente erhalten bereits automatisch OCR. Manche Dateien sehen digital aus,
          tragen aber eine beschädigte Textebene — ein Scan mit schlechtem eingebettetem Text, ein PDF
          aus einem ungewöhnlichen Programm. Öffnen Sie für diese in den Einstellungen des Flows{" "}
          <strong>Schlechter Scan</strong> und schalten Sie es ein: Jede Datei des Flows wird dann
          zuerst per OCR gelesen, und die Extraktion arbeitet mit dem wiederhergestellten Text. Ist OCR
          nicht verfügbar oder schlägt fehl, greift der Run automatisch auf die Standard-Pipeline
          zurück.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Braces size={24} />} title="Was Sie an einen Flow anhängen können">
        <Lead>
          Das Schema bestimmt, was herauskommt; der Rest des Flows bestimmt, was damit geschieht. Jedes
          Element unten ist unabhängig — hängen Sie nur an, was Sie brauchen, in beliebiger Reihenfolge,
          jederzeit.
        </Lead>
        <DataTable
          head={["Phase", "Element", "Was es macht"]}
          rows={[
            [
              "Eingänge",
              <Fragment key="f10">
                <DocLink href="/docs/email-integration">E-Mail-Trigger</DocLink>
              </Fragment>,
              "Gibt dem Flow eine eigene Postfachadresse, sodass weitergeleitete Dokumente (PDF, Bild oder Tabelle) automatisch verarbeitet werden.",
            ],
            [
              "Eingänge",
              <Fragment key="f11">
                <DocLink href="/docs/collections">Collections</DocLink>
              </Fragment>,
              "Listet die Collections auf, die Dokumente an diesen Flow weiterleiten können.",
            ],
            [
              "Verarbeitung",
              <Fragment key="f12">
                <DocLink href="/docs/cleaners">Cleaner</DocLink>
              </Fragment>,
              "Bereinigt die Zeilen jedes Runs: umformatieren, umrechnen, berechnen, nachschlagen und Regeln auslösen.",
            ],
            [
              "Verarbeitung",
              <Fragment key="f13">
                <DocLink href="/docs/agents">Agent</DocLink>
              </Fragment>,
              "Läuft nach der Extraktion und nutzt extrahierte Felder als Eingaben.",
            ],
            [
              "Verarbeitung",
              "Formularvorlagen",
              "Füllt eine PDF-Vorlage mit den extrahierten Werten eines Runs.",
            ],
            [
              "Ausgaben",
              <Fragment key="f14">
                <DocLink href="/docs/email-integration">E-Mail-Ausgabe</DocLink>
              </Fragment>,
              "Schickt die Ergebnisse nach jedem erfolgreichen Run per E-Mail an eine oder mehrere Adressen, optional mit JSON, CSV, ausgefüllten Formularen und dem Originaldokument als Anhang.",
            ],
            [
              "Ausgaben",
              <Fragment key="f15">
                <DocLink href="/docs/webhooks">Webhook</DocLink>
              </Fragment>,
              "Sendet die Ergebnisse per POST an Ihren Endpunkt. Nur HTTPS.",
            ],
            [
              "Ausgaben",
              <Fragment key="f16">
                <DocLink href="/docs/buckets">Bucket-Export</DocLink>
              </Fragment>,
              "Hängt die Zeilen jedes Runs an eine strukturierte Tabelle an, mit Feldern, die Spalten zugeordnet sind.",
            ],
            [
              "Einstellungen",
              <Fragment key="f17">
                <DocLink href="/docs/human-in-the-loop">Manuelle Prüfung</DocLink>
              </Fragment>,
              "Hält Runs für eine prüfende Person an, bevor irgendetwas zugestellt wird.",
            ],
            ["Einstellungen", "Schlechter Scan", "Erzwingt OCR für jede Datei des Flows (siehe oben)."],
            [
              "Einstellungen",
              "Flow-ID",
              <Fragment key="f18">
                Die Kennung, die Sie beim Aufruf der{" "}
                <DocLink href="/docs/api-integration">API</DocLink> übergeben.
              </Fragment>,
            ],
          ]}
        />
        <p>
          <strong>Optionen des E-Mail-Triggers.</strong> Sobald der Trigger eingeschaltet ist, zeigt
          das Panel die Postfachadresse des Flows und zwei Einstellungen.{" "}
          <strong>Zugelassene Absender</strong> beschränkt, wer per E-Mail einen Run starten kann;
          lassen Sie die Liste leer, um jeden Absender zu akzeptieren.{" "}
          <strong>E-Mail-Text verarbeiten</strong> extrahiert auch aus dem Nachrichtentext selbst,
          entweder <em>Nur wenn nichts angehängt ist</em> (die Voreinstellung, damit ein Begleittext
          nie einen zweiten Run startet) oder <em>Immer</em>. Die Adresse des Absenders wird bei jedem
          Run gespeichert und auf der Seite Runs angezeigt.{" "}
          <DocLink href="/docs/email-integration">E-Mail-Integration</DocLink> erklärt die Details.
        </p>
      </DocCard>

      <DocCard icon={<HeartPulse size={24} />} title="Einen Flow diagnostizieren">
        <Lead>
          Sobald ein Flow einige Dokumente verarbeitet hat, öffnet die Schaltfläche{" "}
          <strong>Diagnose</strong> in der oberen Leiste des Flows den <strong>Flow-Doktor</strong>.
          Er untersucht Ihre letzten abgeschlossenen Runs, findet die Felder, die immer wieder leer
          oder mit falschem Typ zurückkommen, und schlägt Korrekturen vor.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="d0">
              Öffnen Sie den Flow und klicken Sie auf <strong>Diagnose</strong>. Die Schaltfläche
              erscheint für Eigentümer und Admins, sobald der Flow mindestens ein Feld hat.
            </Fragment>,
            "Tavnit liest die letzten Runs, liest einige der Dokumente erneut, bei denen Felder fehlgeschlagen sind, und entwirft Korrekturen. Das dauert einen Moment.",
            <Fragment key="d1">
              Prüfen Sie das Ergebnis. Jedes problematische Feld zeigt, wie oft es leer war oder einen
              falschen Typ hatte, mit dem Hinweis <strong>Aktuell</strong> neben dem Hinweis{" "}
              <strong>Vorgeschlagen</strong>. Eventuell wird auch eine{" "}
              <strong>Vorgeschlagene Beschreibung</strong> angeboten.
            </Fragment>,
            <Fragment key="d2">
              Behalten oder bearbeiten Sie die Korrekturen, denen Sie zustimmen, und klicken Sie auf{" "}
              <strong>Änderungen anwenden</strong>. Bis dahin ändert sich nichts; wenn Sie das Panel
              schließen, werden die Vorschläge verworfen.
            </Fragment>,
          ]}
        />
        <p>
          Wenn alles in Ordnung ist, sehen Sie <em>„Die Extraktion sieht gesund aus“</em>. Diagnose
          läuft nur, wenn Sie darauf klicken. Verarbeiten Sie nach dem Anwenden der Korrekturen erneut
          ein echtes Dokument, um zu bestätigen, dass sie geholfen haben.
        </p>
      </DocCard>

      <div id="runs" className="scroll-mt-24">
        <DocCard icon={<Play size={24} />} title="Runs: was passiert, wenn ein Dokument verarbeitet wird">
          <Lead>
            Jedes Dokument wird zu einem Run, und jeder Run durchläuft dieselbe Abfolge. Wer die
            Reihenfolge kennt, weiß, wo er suchen muss, wenn etwas zu spät, falsch oder gar nicht
            ankommt.
          </Lead>
          <NumberedList
            items={[
              "Das Dokument wird gespeichert und der Run in die Warteschlange gestellt.",
              "Die Extraktion liest es und erzeugt Metadatenwerte und Tabellenzeilen.",
              "Ist ein Cleaner angehängt, bereinigt er diese Zeilen — Umrechnungen, berechnete Spalten, Nachschlagen.",
              "Bedingte Regeln greifen: Zeilen können verworfen, Benachrichtigungen gesendet, eine Prüfung angefordert werden.",
              "Ist eine Prüfung erforderlich, hält der Run an, und nichts wird zugestellt, bis eine prüfende Person genehmigt.",
              "Die Ausgaben laufen: E-Mail, Bucket-Export und Webhook. Danach wird der Run als abgeschlossen markiert, und ein verknüpfter Agent startet, falls vorhanden.",
            ]}
          />
          <DataTable
            head={["Run-Status", "Bedeutung"]}
            rows={[
              ["Ausstehend (in der Warteschlange)", "Gespeichert und wartet auf einen Worker."],
              ["Wird verarbeitet", "Wird extrahiert, bereinigt oder zugestellt. Die Run-Seite zeigt die aktuelle Phase."],
              [
                "Neuer Versuch",
                "Ein früherer Versuch ist aus einem vorübergehenden Grund fehlgeschlagen, und der Run wurde automatisch erneut eingereiht (siehe unten).",
              ],
              [
                "Wartet auf HITL-Prüfung",
                <Fragment key="f19">
                  Für eine <DocLink href="/docs/human-in-the-loop">manuelle Prüfung</DocLink>{" "}
                  angehalten. Noch wurde nichts zugestellt.
                </Fragment>,
              ],
              ["Abgeschlossen", "Die Extraktion ist fertig, und jede konfigurierte Ausgabe ist gelaufen."],
              [
                "Abgebrochen",
                "Jemand hat den Run abgebrochen, während er in der Warteschlange stand oder verarbeitet wurde, oder eine prüfende Person hat ihn abgelehnt. Es wird nichts mehr zugestellt.",
              ],
              ["Fehlgeschlagen", "Das Dokument konnte nicht verarbeitet werden. Das Protokoll des Runs nennt den Grund."],
            ]}
          />
        </DocCard>
      </div>

      <DocCard icon={<History size={24} />} title="Mit Runs arbeiten">
        <Lead>
          Die Seite <strong>Runs</strong> listet jeden Run Ihrer Organisation; jeder Flow hat zudem
          eine eigene Registerkarte <strong>Letzte Runs</strong>. Mit <strong>Filter</strong> grenzen
          Sie nach Status, Zeitraum, Flow, Benutzer, Quelle oder einer eingefügten Run-ID ein.
        </Lead>
        <DataTable
          head={["Aktion", "Wo", "Hinweise"]}
          rows={[
            [
              "Details ansehen",
              "Aktionsmenü des Runs oder Klick auf die Zeile",
              "Extrahierte Daten neben der Quelldatei, die Run-Informationen und das Verarbeitungsprotokoll.",
            ],
            [
              "CSV herunterladen",
              "Aktionsmenü des Runs",
              "Nur bei abgeschlossenen Runs. CSV exportieren und JSON exportieren gibt es auch auf der Run-Seite.",
            ],
            [
              "Datei herunterladen",
              "Aktionsmenü des Runs oder Herunterladen auf der Run-Seite",
              "Die Original-Quelldatei. Tabellen lassen sich nicht direkt in der Vorschau anzeigen, laden Sie sie zum Ansehen herunter.",
            ],
            [
              "Run abbrechen",
              "Aktionsmenü des Runs",
              "Nur bei Runs, die noch in der Warteschlange stehen oder laufen.",
            ],
          ]}
        />
        <p>
          Die Spalte <strong>Ausgelöst von</strong> zeigt, wer den Run gestartet hat — den Benutzer
          bei einem Upload oder die Absenderadresse bei einem Run, der per E-Mail ankam. Die Spalte{" "}
          <strong>Quelle</strong> zeigt, wie er ankam: manueller Upload, API, E-Mail und so weiter.
        </p>
      </DocCard>

      <DocCard icon={<RotateCcw size={24} />} title="Fehlgeschlagene Runs und automatische Wiederholungen">
        <Lead>
          Die meisten Fehler liegen am Dokument — eine unlesbare Datei oder ein nicht unterstützter
          Typ —, und eine Wiederholung würde nicht helfen. Einige jedoch nicht: Ein
          Verarbeitungs-Worker startet mitten im Run neu, oder ein KI-Anbieter hat eine vorübergehende
          Störung. Für diese Fälle kann eine Organisation Tavnit selbstständig wiederholen lassen.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="r0">
              Öffnen Sie <strong>Einstellungen</strong> → <strong>Organisation</strong> →{" "}
              <strong>Fehlgeschlagene Runs</strong>. Nur der Eigentümer sieht diese Registerkarte.
            </Fragment>,
            <Fragment key="r1">
              Schalten Sie <strong>Fehlgeschlagene Runs automatisch wiederholen</strong> ein.
            </Fragment>,
            <Fragment key="r2">
              Setzen Sie <strong>Maximale Wiederholungen pro Run</strong> auf 1, 2 oder 3.
            </Fragment>,
          ]}
        />
        <BulletList
          items={[
            "Ein wiederholter Run behält dieselbe Run-ID, sodass API-Abfragen, Webhooks und Links weiter funktionieren.",
            "Ausgaben werden erst ausgelöst, wenn ein Run abgeschlossen ist; eine Wiederholung stellt ein Dokument also nie doppelt zu.",
            "Nie wiederholt: ungültige Dateien, nicht unterstützte Typen, abgebrochene Runs, zur Prüfung angehaltene Runs und Runs, die vor mehr als einem Tag erstellt wurden.",
            "Ein Run, der durch den Neustart eines Workers verloren geht, wird automatisch erkannt. Mit eingeschalteter automatischer Wiederholung wird er erneut eingereiht; andernfalls wird er als Fehlgeschlagen markiert.",
            "Die Run-Seite listet Vorherige Versuche, jeweils als Worker verloren oder Fehlgeschlagen mit dem Fehler markiert, und die Liste der Runs zeigt ein Wiederholungs-Badge.",
          ]}
        />
        <p>
          Um über Runs informiert zu werden, die fehlschlagen, tragen Sie Adressen unter{" "}
          <strong>Benachrichtigungen bei fehlgeschlagenen Runs</strong> auf derselben Registerkarte
          ein.
        </p>
      </DocCard>

      <DocCard icon={<LifeBuoy size={24} />} title="Die Extraktionsqualität verbessern">
        <Lead>
          Wenn ein Feld falsch zurückkommt, liegt die Lösung fast immer in der Definition dieses Felds,
          nicht im Dokument. Beginnen Sie mit <strong>Diagnose</strong>, wenn der Flow Runs hat, und
          arbeiten Sie dann diese Liste ab — die ersten beiden Punkte lösen die meisten Fälle.
        </Lead>
        <DataTable
          head={["Symptom", "Wahrscheinliche Ursache", "Lösung"]}
          rows={[
            [
              "Der falsche von mehreren ähnlichen Werten",
              "Nichts unterscheidet sie.",
              "Ergänzen Sie die Beschriftung, neben der der Wert steht, oder den Seitenbereich, in dem er erscheint.",
            ],
            [
              "Ein Feld kommt leer zurück",
              "Der Feldname allein hat es nicht identifiziert.",
              "Ergänzen Sie zwei oder drei echte Beispielwerte — das reicht meist schon.",
            ],
            [
              "Nur eine Position, obwohl es viele gibt",
              "Es wurde als Metadatenfeld angelegt.",
              "Legen Sie es als Tabellenfeld neu an.",
            ],
            [
              "Derselbe Wert in jeder Zeile",
              "Ein Wert auf Dokumentebene wurde als Tabellenfeld angelegt.",
              "Legen Sie ihn als Metadatenfeld neu an.",
            ],
            [
              "Zahlen um den Faktor hundert verschoben",
              "Dezimal- und Tausendertrennzeichen wurden vertauscht gelesen.",
              "Legen Sie einen erwarteten Bereich fest und normalisieren Sie das Format in einem Cleaner.",
            ],
            [
              "Führende Nullen oder Buchstaben fehlen",
              "Das Feld ist als Zahl typisiert.",
              "Ändern Sie es auf Gemischt/Alphanumerisch.",
            ],
            [
              "Spalten werden verwechselt",
              "Zwei Spalten haben ähnliche Überschriften.",
              "Ergänzen Sie die gedruckten Spaltenüberschriften und beschreiben Sie die Spalte unter Zusätzliche Informationen.",
            ],
            [
              "Gut bei manchen Lieferanten, schlecht bei anderen",
              "Die Hinweise beschreiben das Layout eines einzigen Lieferanten.",
              "Ergänzen Sie die Beschriftungs- und Überschriftsvarianten der anderen Lieferanten im selben Feld.",
            ],
            [
              "Unleserlicher Text aus einer Datei, die digital aussieht",
              "Die eingebettete Textebene des PDFs ist beschädigt.",
              "Schalten Sie Schlechter Scan ein, damit der Flow sie per OCR liest.",
            ],
            [
              "Eine Tabelle kommt leer oder unvollständig zurück",
              "Die Daten stehen nicht auf dem ersten sichtbaren Blatt.",
              "Verschieben Sie sie auf das erste Blatt oder nutzen Sie einen Splitter für Arbeitsmappen mit mehreren Blättern.",
            ],
          ]}
        />
        <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Immer nur eine Sache ändern">
          Verarbeiten Sie nach jeder Änderung dasselbe Dokument erneut. Wenn Sie vier Hinweise auf
          einmal ändern und erneut verarbeiten, wissen Sie zwar, dass das Ergebnis besser wurde, aber
          nicht, welche Änderung es bewirkt hat — und eine der vier hat es vielleicht verschlechtert.
        </InfoBox>
        <InfoBox color="blue" icon={<Wand2 size={20} />} title="Die Daten korrigieren, nicht die Extraktion">
          Wenn der Wert stimmt, aber das Format nicht — Datumsangaben, Währungen, Einheiten,
          Groß- und Kleinschreibung —, lassen Sie den Flow, wie er ist, und fügen Sie einen{" "}
          <DocLink href="/docs/cleaners">Cleaner</DocLink> hinzu.
        </InfoBox>
      </DocCard>

      <Related
        links={[
          {
            href: "/docs/cleaners",
            label: "Normalisieren und anreichern, was ein Flow extrahiert",
            description:
              "Datumsangaben umformatieren, Währungen umrechnen, Summen berechnen und Zeilen markieren, die gegen eine Regel verstoßen.",
          },
          {
            href: "/docs/email-integration",
            label: "Dokumente per E-Mail an einen Flow senden",
            description:
              "Die Postfachadresse, zugelassene Absender, die Verarbeitung des E-Mail-Texts und die E-Mail-Ausgabe.",
          },
          {
            href: "/docs/collections",
            label: "Dokumente automatisch an den richtigen Flow leiten",
            description:
              "Warum Name und Beschreibung eines Flows über die Extraktionsgenauigkeit hinaus wichtig sind.",
          },
          {
            href: "/docs/api-integration",
            label: "Einen Flow aus Ihrem eigenen Code auslösen",
            description:
              "Die Flow-ID, die Authentifizierung per API-Schlüssel und Beispiele in Python und JavaScript.",
          },
          {
            href: "/docs/webhooks",
            label: "Den Payload eines Flows ansehen",
            description:
              "Wie Metadatenfelder und Tabellenfelder im JSON erscheinen, das Ihr Endpunkt erhält.",
          },
        ]}
      />
    </section>
  );
}
