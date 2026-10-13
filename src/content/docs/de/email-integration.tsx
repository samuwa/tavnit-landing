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

/** /de/docs/email-integration — translated from src/app/docs/email-integration/page.tsx. */

/** Mirrors the visible numbered steps under "Den E-Mail-Trigger einschalten". */
export const schema: DocsPageSchemaData = {
  howTo: {
    name: "Daten aus E-Mail-Anhängen mit einem Tavnit-E-Mail-Trigger extrahieren",
    description:
      "Schalten Sie den E-Mail-Trigger eines Tavnit-Flows ein, um eine eigene Postfachadresse zu erhalten, und leiten Sie Dokumente dorthin weiter. Jeder unterstützte Anhang wird zu einem eigenen Extraktions-Run.",
    steps: [
      {
        name: "Den Flow öffnen",
        text: "Öffnen Sie in der Tavnit-App die Seite Flows und den Flow, der Dokumente empfangen soll.",
      },
      {
        name: "Den E-Mail-Trigger einschalten",
        text: "Öffnen Sie auf der Detailseite des Flows das Panel E-Mail-Trigger und schalten Sie es ein. Die Postfachadresse des Flows erscheint.",
      },
      {
        name: "Die Adresse kopieren",
        text: "Klicken Sie neben der Postfachadresse auf Kopieren. Fügen Sie im selben Panel optional Zugelassene Absender hinzu oder schalten Sie E-Mail-Text verarbeiten ein.",
      },
      {
        name: "Ein Testdokument senden",
        text: "Senden Sie ein einzelnes PDF an die Adresse und beobachten Sie die Seite Runs. Ein neuer Run mit der Quelle E-Mail erscheint.",
      },
      {
        name: "Die Weiterleitung automatisieren",
        text: "Sobald der Test funktioniert, legen Sie in Ihrem E-Mail-Programm oder gemeinsamen Postfach eine Regel an, die passende Nachrichten automatisch an die Adresse weiterleitet.",
      },
    ],
  },
};

export default function EmailIntegrationDe() {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        E-Mail-Integration
      </h1>

      <DocCard icon={<Mail size={24} />} title="So funktioniert die E-Mail-Verarbeitung">
        <Lead>
          Jeder Tavnit-Flow kann eine eigene Postfachadresse haben. Wenn Sie den E-Mail-Trigger
          einschalten und ein Dokument an diese Adresse senden, nimmt Tavnit jeden unterstützten
          Anhang, erstellt dafür einen eigenen Extraktions-Run und verarbeitet ihn genau so, als hätten
          Sie ihn in der App hochgeladen.
        </Lead>
        <p>
          Es wird nichts installiert und nichts fragt Ihr Postfach ab: Sie leiten E-Mails an die
          Adresse weiter, und Tavnit reagiert. Das ist der kürzeste Weg von „Rechnungen kommen per
          E-Mail“ zu „Rechnungen kommen als strukturierte Zeilen“, ganz ohne Code. Collections,
          Splitters, Pipelines, Matchers und Subjects haben ebenfalls eigene Adressen.
        </p>
        <BulletList
          items={[
            "Rechnungen oder Belege direkt aus Ihrem Postfach weiterleiten",
            "Ein gemeinsames Kreditorenpostfach mit einer automatischen Weiterleitungsregel",
            "Lieferanten Dokumente einsenden lassen, ohne ihnen ein Tavnit-Login zu geben",
            "Daten extrahieren, die in der Nachricht selbst stehen, etwa Auftragsbestätigungen ohne Anhang",
          ]}
        />
      </DocCard>

      <DocCard icon={<ExternalLink size={24} />} title="Den E-Mail-Trigger einschalten">
        <Lead>
          Der Trigger ist standardmäßig aus. Schalten Sie ihn auf der Detailseite des Flows ein,
          kopieren Sie die angezeigte Adresse und senden Sie ein Dokument als Test, bevor Sie eine
          Weiterleitungsregel darauf richten.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f0">
              Öffnen Sie <strong>Flows</strong> und den Flow, der Dokumente empfangen soll.
            </Fragment>,
            <Fragment key="f1">
              Öffnen Sie das Panel <strong>E-Mail-Trigger</strong> und schalten Sie es ein. Die{" "}
              <strong>Postfachadresse</strong> des Flows erscheint.
            </Fragment>,
            <Fragment key="f2">
              Klicken Sie neben der Adresse auf <strong>Kopieren</strong>. Im selben Panel können Sie{" "}
              <strong>Zugelassene Absender</strong> hinzufügen oder{" "}
              <strong>E-Mail-Text verarbeiten</strong> einschalten (beides unten erklärt).
            </Fragment>,
            <Fragment key="f3">
              Senden Sie ein PDF an die Adresse und prüfen Sie die Seite <strong>Runs</strong>. Ein
              neuer Run mit der Quelle <strong>E-Mail</strong> erscheint, und die Adresse des
              Absenders wird beim Run gespeichert.
            </Fragment>,
            "Sobald das funktioniert, legen Sie die Weiterleitungsregel in Ihrem E-Mail-Programm oder gemeinsamen Postfach an.",
          ]}
        />
        <InfoBox color="blue" icon={<Info size={20} />} title="Ein Run pro Anhang">
          Eine E-Mail mit drei angehängten Rechnungen erzeugt drei getrennte Runs, jeder mit eigenem
          Ergebnis und eigener Zeile in der Liste der Runs. Sie erzeugt nicht einen Run mit drei
          Dokumenten.
        </InfoBox>
        <WarningBox>
          E-Mails an eine Adresse, deren Trigger ausgeschaltet ist (oder an eine inaktive Collection),
          werden angenommen und verworfen: Der Absender erhält weder eine Unzustellbarkeitsnachricht
          noch einen Fehler. Wenn Dokumente scheinbar verschwinden, prüfen Sie zuerst den Schalter.
        </WarningBox>
      </DocCard>

      <DocCard icon={<ShieldCheck size={24} />} title="Zugelassene Absender">
        <Lead>
          Standardmäßig kann jeder Absender einen Run auslösen, indem er an die Adresse schreibt.
          Tragen Sie im Panel E-Mail-Trigger Adressen unter <strong>Zugelassene Absender</strong> ein,
          und nur diese Absender werden akzeptiert; E-Mails von allen anderen werden stillschweigend
          verworfen.
        </Lead>
        <BulletList
          items={[
            "Einträge sind vollständige E-Mail-Adressen, keine Domains. Der Abgleich ignoriert Groß- und Kleinschreibung sowie Anzeigenamen.",
            "Lassen Sie die Liste leer, um E-Mails von jedem Absender zu akzeptieren.",
            "Die Liste gibt es beim E-Mail-Trigger von Flows, Collections, Splitters, Pipelines, Matchers und Subjects.",
            <Fragment key="f4">
              Wenn Sie über ein gemeinsames Postfach weiterleiten, sieht Tavnit als Absender meist das
              weiterleitende Postfach — das ist also die Adresse, die Sie zulassen müssen.
            </Fragment>,
          ]}
        />
      </DocCard>

      <DocCard icon={<Mail size={24} />} title="Den E-Mail-Text verarbeiten">
        <Lead>
          Manche Daten kommen nie als Anhang: eine Auftragsbestätigung, eine Buchungsmitteilung, ein
          Lieferant, der die Mengen in die Nachricht schreibt. Schalten Sie{" "}
          <strong>E-Mail-Text verarbeiten</strong> ein, und Tavnit wandelt den Nachrichtentext in ein
          PDF um und verarbeitet es wie jedes andere Dokument. Die Option gibt es bei Flows und
          Collections.
        </Lead>
        <DataTable
          head={["Modus", "Was passiert"]}
          rows={[
            [
              <Fragment key="f5"><strong>Nur wenn nichts angehängt ist</strong> (Voreinstellung)</Fragment>,
              "Der Text wird nur verarbeitet, wenn die E-Mail keinen Dokumentanhang hat. Ein Begleittext „siehe Anhang“ neben einer Rechnung wird übersprungen, damit eine E-Mail nie zwei Runs startet.",
            ],
            [
              <Fragment key="f6"><strong>Immer</strong></Fragment>,
              "Der Text wird zusätzlich zu jedem Anhang verarbeitet, jeweils in einem eigenen Run.",
            ],
          ]}
        />
        <BulletList
          items={[
            "Das PDF des Nachrichtentexts erscheint in der Prüfung wie jedes andere Dokument, und der Run wird als aus dem E-Mail-Text stammend gekennzeichnet.",
            "Zitierte Antwortverläufe und Signaturen werden entfernt, sofern der E-Mail-Anbieter sie erkennen kann.",
            "Bilder in der Nachricht werden nicht gelesen. Eingebettete Signaturbilder zählen nicht als Anhänge, wenn entschieden wird, ob der Text verarbeitet werden soll.",
            "Ein Text mit fast keinem Inhalt („ok“, „danke“, eine leere Weiterleitung) wird nicht verarbeitet.",
          ]}
        />
      </DocCard>

      <DocCard icon={<AtSign size={24} />} title="Welche Funktionen eine E-Mail-Adresse haben">
        <Lead>
          Der E-Mail-Trigger ist nicht auf Flows beschränkt. Richten Sie eine Adresse auf eine ganze
          Sortierstufe, eine Pipeline oder einen Vergleich statt auf einen einzelnen Dokumenttyp.
        </Lead>
        <DataTable
          head={["Senden an", "Form der Adresse", "Was passiert"]}
          rows={[
            [
              "Einen Flow",
              <Fragment key="f7"><InlineCode>flow-name-&lt;id&gt;@mg.tavnit.io</InlineCode></Fragment>,
              "Jeder Anhang wird von diesem Flow extrahiert.",
            ],
            [
              "Eine Collection",
              <Fragment key="f8"><InlineCode>name-&lt;id&gt;-collection@mg.tavnit.io</InlineCode></Fragment>,
              <Fragment key="f9">
                Jeder Anhang wird klassifiziert und an den richtigen Flow oder Splitter geleitet. Siehe{" "}
                <DocLink href="/docs/collections">wie Collections Dokumente weiterleiten</DocLink>.
              </Fragment>,
            ],
            [
              "Einen Splitter",
              <Fragment key="f10"><InlineCode>&lt;id&gt;-splitter@mg.tavnit.io</InlineCode></Fragment>,
              <Fragment key="f11">
                Jeder Anhang wird zuerst in seine einzelnen Dokumente zerlegt. Siehe{" "}
                <DocLink href="/docs/splitters">Dateien mit mehreren Dokumenten aufteilen</DocLink>.
              </Fragment>,
            ],
            [
              "Eine Pipeline",
              <Fragment key="f12"><InlineCode>&lt;id&gt;-pipeline@mg.tavnit.io</InlineCode></Fragment>,
              <Fragment key="f13">
                Jeder PDF- oder Bildanhang startet eine Ausführung. Siehe{" "}
                <DocLink href="/docs/pipelines">Pipelines</DocLink>.
              </Fragment>,
            ],
            [
              "Einen Matcher",
              <Fragment key="f14"><InlineCode>&lt;id&gt;-matcher@mg.tavnit.io</InlineCode></Fragment>,
              <Fragment key="f15">
                Alle PDF- oder Bildanhänge einer E-Mail werden gemeinsam in einem einzigen Abgleich
                verglichen (immer im multilateralen Modus), und das Ergebnis wird im selben Verlauf
                beantwortet. Siehe <DocLink href="/docs/matchers">Matchers</DocLink>.
              </Fragment>,
            ],
            [
              "Ein Subject",
              <Fragment key="f16"><InlineCode>&lt;id&gt;-subject@mg.tavnit.io</InlineCode></Fragment>,
              <Fragment key="f17">
                Jeder Anhang wird anhand einer Referenz in Betreffzeile, Text oder Dateiname oder über
                die eigene Plus-Adresse des Falls dem richtigen Fall zugeordnet. Siehe{" "}
                <DocLink href="/docs/subjects">Subjects</DocLink>.
              </Fragment>,
            ],
          ]}
          caption="Kopieren Sie die genaue Adresse aus dem Panel E-Mail-Trigger der jeweiligen Funktion; die Formen oben helfen nur, sie auseinanderzuhalten."
        />
        <InfoBox color="violet" icon={<Workflow size={20} />} title="Welche Adresse sollen Lieferanten verwenden?">
          Wenn ein Absender immer nur einen Dokumenttyp schickt, geben Sie ihm die Adresse des Flows.
          Wenn er einen Mix schickt (Rechnungen, Bestellungen, Lieferscheine), geben Sie ihm die
          Adresse der Collection und lassen Tavnit sortieren. Wenn er ein PDF mit mehreren Dokumenten
          schickt, geben Sie ihm die Adresse des Splitters.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Paperclip size={24} />} title="Was Tavnit akzeptiert">
        <Lead>
          Flows, Collections, Splitters und Subjects lesen PDFs, gängige Bilder und Tabellen.
          Pipelines und Matchers lesen nur PDFs und Bilder. Alles andere in der Nachricht wird
          übersprungen, ohne den Rest scheitern zu lassen: Eine nicht unterstützte Datei hält die
          anderen Anhänge nicht von der Verarbeitung ab.
        </Lead>
        <DataTable
          head={["Akzeptiert", "Dateiendungen"]}
          rows={[
            ["PDF-Dokumente", <Fragment key="f18"><InlineCode>.pdf</InlineCode></Fragment>],
            [
              "Bilder",
              <Fragment key="f19"><InlineCode>.png .jpg .jpeg .jfif .tif .tiff .webp .bmp .gif</InlineCode></Fragment>,
            ],
            [
              "Tabellen (nicht bei Pipelines oder Matchers)",
              <Fragment key="f20"><InlineCode>.xlsx .xls .csv</InlineCode></Fragment>,
            ],
          ]}
        />
        <p>Ein Anhang wird übersprungen statt verarbeitet, wenn einer dieser Punkte zutrifft:</p>
        <DataTable
          head={["Grund für das Überspringen", "Wie es aussieht"]}
          rows={[
            [
              "Nicht unterstützter Dateityp",
              "Word-Dokumente, Archive, als .eml weitergeleitete Nachrichten und alles ohne erkannte Dateiendung.",
            ],
            ["Leerer Anhang", "Eine Datei mit null Byte, meist eine fehlerhafte Weiterleitung."],
            [
              "Unlesbare Datei",
              "Die Datei hat eine gültige Endung, lässt sich aber nicht öffnen: ein abgebrochener Download, eine umbenannte Datei oder eine Tabelle, die sich nicht parsen lässt.",
            ],
          ]}
        />
        <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Signaturbilder zählen als Anhänge">
          Ein Logo in einer E-Mail-Signatur kommt oft als Bildanhang an, und ein Flow verarbeitet es
          wie jedes andere Bild. Wenn dadurch unerwünschte Runs entstehen, leiten Sie nur die
          Dokumente weiter oder nutzen Sie Zugelassene Absender und eine Weiterleitungsregel, die
          eingebettete Bilder entfernt.
        </InfoBox>
        <p>
          Die Größenbeschränkung Ihres E-Mail-Anbieters für Anhänge greift, bevor Tavnit die Nachricht
          überhaupt sieht. Wenn ein großer Scan beim Versand zurückkommt, laden Sie ihn in der App hoch
          oder senden Sie ihn stattdessen an die{" "}
          <DocLink href="/docs/api-integration">REST-API</DocLink>.
        </p>
      </DocCard>

      <DocCard icon={<FileSpreadsheet size={24} />} title="Wie Tabellen behandelt werden">
        <Lead>
          Ein Tabellenanhang wird als Dokument behandelt, nicht als Tabelle zum Importieren. Was
          passiert, hängt davon ab, wohin Sie ihn senden.
        </Lead>
        <DataTable
          head={["Gesendet an", "Was Tavnit macht"]}
          rows={[
            ["Einen Flow", "Extrahiert aus dem ersten sichtbaren Blatt."],
            [
              "Eine Collection",
              "Klassifiziert die Datei anhand ihres ersten Blatts und übergibt sie dann dem gewählten Flow, der das erste sichtbare Blatt liest.",
            ],
            [
              "Einen Splitter",
              "Behandelt jedes sichtbare, nicht leere Blatt als eigenes Dokument, klassifiziert jedes und leitet es als Datei mit einem Blatt weiter.",
            ],
          ]}
        />
        <p>
          Sehr große Blätter werden mit einer Fehlermeldung abgelehnt. Um eine Tabelle stattdessen als
          strukturierte Zeilen zu laden, nutzen Sie einen Durchlauf eines{" "}
          <DocLink href="/docs/cleaners">Cleaners</DocLink>.
        </p>
      </DocCard>

      <DocCard icon={<Copy size={24} />} title="Schutz vor Duplikaten">
        <Lead>
          Mailserver stellen dieselbe Nachricht manchmal mehrfach zu, etwa nach einer Zeitüberschreitung.
          Tavnit erkennt eine erneut zugestellte Nachricht an dieselbe Adresse und verarbeitet sie
          nicht noch einmal; eine Wiederholung erzeugt also nie doppelte Runs.
        </Lead>
        <BulletList
          items={[
            "Tavnit bestätigt die Nachricht innerhalb von Sekunden und verarbeitet die Anhänge im Hintergrund; eine E-Mail mit vielen Anhängen können Sie also bedenkenlos senden.",
            "Wird die Verarbeitung unterbrochen, setzt sie dort fort, wo sie aufgehört hat, statt von vorn zu beginnen.",
            "Eine Nachricht, die an zwei verschiedene Tavnit-Adressen geht, wird an jeder Adresse einmal verarbeitet.",
            "Wenn Sie dieselbe Datei in einer neuen E-Mail erneut senden, ist das eine neue Nachricht, und sie wird erneut verarbeitet.",
          ]}
        />
      </DocCard>

      <DocCard icon={<Send size={24} />} title="Die Ergebnisse per E-Mail zurückschicken">
        <Lead>
          Die E-Mail-Ausgabe ist der Rückweg: Wenn ein Run erfolgreich endet, schickt Tavnit das
          Ergebnis per E-Mail an die konfigurierten Adressen. Sie ist unabhängig vom E-Mail-Trigger:
          Sie können jede der beiden allein nutzen oder beide zusammen für einen vollständigen Kreislauf
          aus Einsenden und Zurückerhalten.
        </Lead>
        <NumberedList
          items={[
            "Öffnen Sie die Detailseite des Flows.",
            <Fragment key="f21">
              Öffnen Sie das Panel <strong>E-Mail-Ausgabe</strong>.
            </Fragment>,
            <Fragment key="f22">
              Fügen Sie eine oder mehrere <strong>Empfängeradressen</strong> hinzu.
            </Fragment>,
            <Fragment key="f23">
              Wählen Sie unter <strong>Anhänge</strong>, was jede Nachricht enthält, und speichern Sie.
            </Fragment>,
          ]}
        />
        <DataTable
          head={["Option", "Was ankommt"]}
          rows={[
            ["JSON-Extraktion", "Das extrahierte Ergebnis als formatiertes JSON im Nachrichtentext."],
            [
              "CSV-Extraktion",
              <Fragment key="f24">
                Die Zeilen als Anhang <InlineCode>rows.csv</InlineCode>, der schnellste Weg, Ergebnisse
                in eine Tabellenkalkulation zu bringen.
              </Fragment>,
            ],
            ["Formularergebnisse", "Die ausgefüllten PDFs, wenn der Flow eine Formularvorlage ausfüllt."],
            [
              "Originaldokument",
              "Die verarbeitete Quelldatei (PDF, Bild oder Tabelle), neben den Ergebnissen angehängt.",
            ],
          ]}
        />
        <InfoBox color="purple" icon={<Code2 size={20} />} title="Dateifelder kommen als Links an">
          Felder, die eine Datei oder ein Bild enthalten, werden nicht in das JSON eingebettet. Sie
          kommen als zeitlich begrenzte Links an, weil Tavnit gespeicherte Dokumente privat hält: Ein
          reiner Speicherpfad wäre aus einem Postfach heraus nicht abrufbar.
        </InfoBox>
        <BulletList
          items={[
            "Die Ausgabe-E-Mail wird nur bei Runs gesendet, die erfolgreich abgeschlossen werden. Ein fehlgeschlagener Run sendet nichts.",
            "Die Betreffzeile enthält den Flow-Namen und ein Detail des jeweiligen Runs, damit E-Mail-Programme nicht jeden Run eines Flows zu einem Verlauf zusammenfassen.",
            <Fragment key="f25">
              Ist für den Flow eine <DocLink href="/docs/human-in-the-loop">manuelle Prüfung</DocLink>{" "}
              aktiviert, wartet die E-Mail, bis eine prüfende Person den Run genehmigt.
            </Fragment>,
            <Fragment key="f26">
              Für die Zustellung von Maschine zu Maschine eignet sich ein{" "}
              <DocLink href="/docs/webhooks">Webhook</DocLink> besser als E-Mail.
            </Fragment>,
          ]}
        />
      </DocCard>

      <DocCard icon={<Workflow size={24} />} title="Praxisbeispiel: ein Kreditorenpostfach">
        <Lead>
          Die übliche Einrichtung ist ein gemeinsames Postfach, das bereits Lieferantenrechnungen
          empfängt und sie an eine Collection weiterleitet, damit das Format jedes Lieferanten im
          richtigen Flow landet, mit Ergebnissen, die per E-Mail an die Buchhaltung gehen und in einen
          Bucket geschrieben werden.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f27">
              Legen Sie für jeden Dokumenttyp, den Sie erhalten, einen Flow an, zum Beispiel{" "}
              <em>Lieferantenrechnungen</em> und <em>Lieferscheine</em>, und geben Sie jedem eine klare
              Beschreibung.
            </Fragment>,
            <Fragment key="f28">
              Nehmen Sie beide Flows in eine <DocLink href="/docs/collections">Collection</DocLink> auf
              und schalten Sie den E-Mail-Trigger der Collection ein. Tragen Sie das gemeinsame Postfach
              unter Zugelassene Absender ein.
            </Fragment>,
            <Fragment key="f29">
              Leiten Sie im gemeinsamen Postfach jede Nachricht mit Anhang von Ihren
              Lieferanten-Domains an die Adresse der Collection weiter.
            </Fragment>,
            <Fragment key="f30">
              Schalten Sie bei jedem Flow die <strong>E-Mail-Ausgabe</strong> mit dem CSV-Anhang für
              die Buchhaltung ein und fügen Sie einen{" "}
              <DocLink href="/docs/buckets">Bucket-Export</DocLink> hinzu, damit sich die Daten in einer
              Tabelle sammeln.
            </Fragment>,
            <Fragment key="f31">
              Fügen Sie einen <DocLink href="/docs/cleaners">Cleaner</DocLink> mit einer bedingten
              Aktion hinzu, die alles über Ihrer Freigabegrenze vor der Zustellung zur{" "}
              <DocLink href="/docs/human-in-the-loop">manuellen Prüfung</DocLink> schickt.
            </Fragment>,
          ]}
        />
        <p>
          Niemand in der Buchhaltung muss Tavnit öffnen. Rechnungen kommen dort an, wo sie immer
          ankamen, und die strukturierten Daten kommen in dasselbe Postfach zurück.
        </p>
      </DocCard>

      <DocCard icon={<LifeBuoy size={24} />} title="Fehlerbehebung">
        <Lead>
          Weil eingehende E-Mails stillschweigend angenommen werden, hinterlässt ein Dokument, das
          nicht auftaucht, keinen Fehler in Ihrem Postfach. Gehen Sie diese Liste durch: Die Ursache ist
          fast immer der Schalter des Triggers, die zugelassenen Absender, der Anhangstyp oder eine
          Weiterleitungsregel, die Anhänge entfernt.
        </Lead>
        <DataTable
          head={["Symptom", "Wahrscheinliche Ursache", "Lösung"]}
          rows={[
            [
              "Es erscheint überhaupt kein Run",
              "Der E-Mail-Trigger ist aus, die Adresse gehört zu einem anderen Flow, oder der Absender steht nicht unter Zugelassene Absender.",
              "Prüfen Sie den Schalter und die Liste der zugelassenen Absender und kopieren Sie die Adresse erneut aus dem Panel E-Mail-Trigger.",
            ],
            [
              "Manche Anhänge wurden verarbeitet, andere nicht",
              "Die fehlenden haben einen nicht unterstützten Typ, sind leer oder unlesbar.",
              "Vergleichen Sie die Dateiendungen mit der Liste oben.",
            ],
            [
              "Nur das Signaturbild wurde verarbeitet",
              "Das eigentliche Dokument war nicht angehängt: Es war verlinkt, oder die Weiterleitung hat es verloren.",
              "Leiten Sie als Anhang statt eingebettet weiter und prüfen Sie, ob die Regel Anhänge erhält.",
            ],
            [
              "Eine E-Mail ohne Anhang hat nichts bewirkt",
              "E-Mail-Text verarbeiten ist aus, oder der Text hatte fast keinen Inhalt.",
              "Schalten Sie E-Mail-Text verarbeiten im Panel E-Mail-Trigger ein (Flows und Collections).",
            ],
            [
              "Der Begleittext hat einen eigenen Run erzeugt",
              "E-Mail-Text verarbeiten steht auf Immer.",
              "Stellen Sie den Modus auf Nur wenn nichts angehängt ist.",
            ],
            [
              "Runs erscheinen, schlagen aber fehl",
              "Das Problem ist das Dokument selbst, nicht der E-Mail-Weg.",
              "Öffnen Sie den Run und lesen Sie sein Protokoll; der Fehler liegt in der Extraktion.",
            ],
            [
              "Ergebnisse kommen nie per E-Mail an",
              "Die E-Mail-Ausgabe ist nicht eingerichtet, der Run ist fehlgeschlagen, oder er wartet auf eine Prüfung.",
              "Prüfen Sie zuerst den Status des Runs, dann die Konfiguration der E-Mail-Ausgabe.",
            ],
          ]}
        />
      </DocCard>

      <Related
        links={[
          {
            href: "/docs/collections",
            label: "Gemischte Dokumente automatisch mit Collections weiterleiten",
            description:
              "Richten Sie eine E-Mail-Adresse auf mehrere Flows, und Tavnit wählt pro Dokument den richtigen.",
          },
          {
            href: "/docs/splitters",
            label: "Dateien mit mehreren Dokumenten vor der Extraktion aufteilen",
            description: "Für Absender, die mehrere Dokumente in einem einzigen Anhang bündeln.",
          },
          {
            href: "/docs/webhooks",
            label: "Ergebnisse per Webhook an Ihre eigenen Systeme liefern",
            description:
              "Die maschinenlesbare Alternative zur E-Mail-Ausgabe, mit Wiederholungsverhalten.",
          },
          {
            href: "/docs/api-integration",
            label: "Dokumente über die REST-API einreichen",
            description:
              "Für Volumen und Dateigrößen, die E-Mail nicht transportieren kann, mit expliziter Fehlerbehandlung.",
          },
        ]}
      />
    </section>
  );
}
