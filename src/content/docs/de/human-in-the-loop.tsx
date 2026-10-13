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
 * /de/docs/human-in-the-loop — translated from
 * src/app/docs/human-in-the-loop/page.tsx. The app calls the area
 * "Manuelle Prüfung" in German; HITL stays as in the app's labels.
 */

/** Mirrors the visible numbered steps under "Prüfung für einen Flow einschalten". */
export const schema: DocsPageSchemaData = {
  howTo: {
    name: "Einem Tavnit-Flow einen manuellen Prüfschritt hinzufügen",
    description:
      "Schalten Sie für einen Flow die manuelle Prüfung ein und weisen Sie Prüfer zu, damit jeder Run zur Genehmigung anhält, bevor seine Ergebnisse weitergegeben werden.",
    steps: [
      {
        name: "Das Panel Manuelle Prüfung des Flows öffnen",
        text: "Öffnen Sie in der Tavnit-App die Seite Flows, dann den Flow, und wählen Sie in seiner Seitenleiste das Panel Manuelle Prüfung.",
      },
      {
        name: "Die Prüfung einschalten",
        text: "Schalten Sie die manuelle Prüfung ein. Ab dann halten neue Runs des Flows an, statt ihre Ergebnisse zuzustellen.",
      },
      {
        name: "Prüfer zuweisen",
        text: "Wählen Sie unter Prüfer ein oder mehrere Mitglieder Ihrer Organisation. Nur zugewiesene Prüfer können die angehaltenen Runs des Flows genehmigen oder ablehnen.",
      },
      {
        name: "Ein Dokument verarbeiten und die Warteschlange prüfen",
        text: "Verarbeiten Sie ein Dokument. Es sollte mit dem Status Wartet auf Prüfung in der Warteschlange Manuelle Prüfung jedes zugewiesenen Prüfers erscheinen.",
      },
    ],
  },
  primaryImage: {
    url: "/assets/docs-hitl-review-2026-08.jpg",
    caption:
      "Die Prüfansicht von Tavnit: ein bearbeitbares Datenraster neben dem Quelldokument, mit den Aktionen Genehmigen und Ablehnen.",
    width: 1327,
    height: 801,
  },
};

export default function HumanInTheLoopDe() {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        Manuelle Prüfung (Human in the Loop)
      </h1>

      <DocCard icon={<ClipboardCheck size={24} />} title="Was die manuelle Prüfung macht">
        <Lead>
          Die manuelle Prüfung setzt einen Kontrollpunkt zwischen Extraktion und Zustellung. Ein Run,
          der geprüft werden muss, hält nach Extraktion und Bereinigung mit dem Status{" "}
          <strong>Wartet auf Genehmigung</strong> an: Es wird keine E-Mail gesendet, kein Webhook
          ausgelöst, keine Bucket-Zeile geschrieben und kein verknüpfter Agent gestartet, bis eine
          namentlich zugewiesene prüfende Person ihn genehmigt.
        </Lead>
        <p>
          Das entscheidende Wort ist <em>bevor</em>. Die Prüfung ist keine Korrektur, die Sie
          anwenden, nachdem fehlerhafte Daten schon Ihr ERP erreicht haben; der Zustellschritt ist
          noch nicht gelaufen. Wenn die prüfende Person genehmigt, setzt der Run genau dort fort, wo er
          angehalten hat, mit ihren Änderungen.
        </p>
        <BulletList
          items={[
            "Hochwertige Daten, die geprüft werden müssen, bevor sie weitergehen",
            "Eine Compliance-Anforderung an einen dokumentierten manuellen Freigabeschritt",
            "Dokumente, bei denen die Extraktion meist stimmt, ein Fehler aber gelegentlich teuer ist",
            "Werte, die nur eine Person liefern kann, etwa eine interne Kostenstelle oder ein Freigabecode",
            "Neue Lieferanten oder neue Formate, bis Sie dem Flow vertrauen",
          ]}
        />
        <p>
          Flow-Runs sind der Hauptfall, aber dieselbe Warteschlange sammelt auch angehaltene{" "}
          <DocLink href="/docs/matchers">Abgleiche</DocLink>,{" "}
          <DocLink href="/docs/inspectors">Prüfungen von Inspectors</DocLink> und{" "}
          <DocLink href="/docs/fillers">Ausfüllungen</DocLink>. Siehe{" "}
          <em>Was sonst noch auf eine Prüfung wartet</em> weiter unten.
        </p>
      </DocCard>

      <DocCard icon={<Settings2 size={24} />} title="Drei Wege, wie ein Flow-Run angehalten wird">
        <Lead>
          Der Schalter auf Flow-Ebene ist ein Weg, Runs zur Prüfung zu schicken, nicht der einzige. Ein
          an den Flow angehängter <DocLink href="/docs/cleaners">Cleaner</DocLink> kann Runs selbst
          anhalten, auch wenn der Schalter aus ist. Treffen mehrere Auslöser auf denselben Run zu,
          werden ihre Prüferlisten zusammengeführt.
        </Lead>
        <DataTable
          head={["Auslöser", "Was angehalten wird", "Am besten für"]}
          rows={[
            [
              "Flow-Einstellung (Panel Manuelle Prüfung)",
              "Jeder Run des Flows, unabhängig davon, was extrahiert wurde.",
              "Einen Dokumenttyp, der immer eine Freigabe braucht, oder einen Flow, den Sie gerade erst aufgebaut haben und dem Sie noch nicht vertrauen.",
            ],
            [
              "Regel unter Bedingte Aktionen in einem Cleaner, mit der Aktion manuelle Prüfung (HITL)",
              "Nur die Runs, in denen eine Zeile auf die Regel zutraf, etwa ein Gesamtbetrag über einer Schwelle oder eine fehlende Steuernummer.",
              "Hohe Volumen, bei denen die meisten Runs in Ordnung sind und Sie nur die Ausnahmen sehen möchten.",
            ],
            [
              "Feld Manuelle Eingabe in einem Cleaner",
              "Jeder Run, der durch den Cleaner läuft, weil eine Person den Wert eintippen oder auswählen muss.",
              "Daten, die überhaupt nicht im Dokument stehen und von jemandem ergänzt werden müssen.",
            ],
          ]}
        />
        <InfoBox color="blue" icon={<Info size={20} />} title="Sie müssen nicht alles prüfen">
          Jeden Run zu prüfen untergräbt den Sinn einer automatisierten Extraktion. Der bedingte Weg ist
          meist der richtige: Fügen Sie im Cleaner ein Feld Bedingte Aktionen hinzu, geben Sie ihm eine
          Bedingung wie <em>Gesamtbetrag &gt; 10.000</em>, fügen Sie die Aktion für die manuelle
          Prüfung hinzu und wählen Sie ihre Prüfer. Nur passende Runs halten an. Der Schalter des Flows
          kann aus bleiben.
        </InfoBox>
        <p>
          Wenn eine Cleaner-Regel das Anhalten auslöst, speichert Tavnit, welche Zeilen und welche
          Felder zutrafen. Die Prüfansicht markiert genau diese Zellen, sodass die prüfende Person beim
          Grund für das Anhalten beginnt, statt die ganze Tabelle zu lesen. Wird die Regel von einem
          Feld Anomalieprüfung gespeist, sieht die prüfende Person auch, warum jeder Wert markiert wurde.
        </p>
      </DocCard>

      <DocCard icon={<Settings2 size={24} />} title="Prüfung für einen Flow einschalten">
        <Lead>
          Der Schalter des Flows befindet sich in den Einstellungen des Flows selbst. Nur ein
          Eigentümer oder Admin kann ihn ändern. Prüfer werden aus den Mitgliedern Ihrer Organisation
          ausgewählt.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f0">
              Öffnen Sie den Flow und wählen Sie in seiner Seitenleiste das Panel{" "}
              <strong>Manuelle Prüfung</strong>.
            </Fragment>,
            <Fragment key="f1">Schalten Sie die Prüfung ein.</Fragment>,
            <Fragment key="f2">
              Wählen Sie unter <strong>Prüfer</strong> ein oder mehrere Mitglieder Ihrer Organisation.
            </Fragment>,
            <Fragment key="f3">
              Verarbeiten Sie ein Dokument und bestätigen Sie, dass es mit dem Status{" "}
              <strong>Wartet auf Prüfung</strong> in der Warteschlange{" "}
              <strong>Manuelle Prüfung</strong> der Prüfer erscheint.
            </Fragment>,
          ]}
        />
        <WarningBox>
          Ist die Prüfung eingeschaltet, aber kein Prüfer zugewiesen, warnt das Panel{" "}
          <em>„Keine Prüfer ausgewählt — Genehmigungsanfragen erreichen niemanden.“</em> Angehaltene
          Runs hat dann niemand, der sie genehmigen kann. Weisen Sie mindestens einen Prüfer zu, bevor
          Sie Dokumente durchschicken.
        </WarningBox>
        <InfoBox
          color="violet"
          icon={<Info size={20} />}
          title="Mit angehängtem Cleaner sehen Prüfer bereinigte Daten"
        >
          Hat der Flow einen Cleaner, findet das Anhalten nach der Bereinigung statt; die geprüfte
          Tabelle ist also die bereinigte Ausgabe, mit umgerechneten Währungen, umformatierten
          Datumsangaben und berechneten Spalten. Genau das wird zugestellt, und genau das sollte
          geprüft werden.
        </InfoBox>
      </DocCard>

      <DocCard icon={<PenLine size={24} />} title="Felder Manuelle Eingabe">
        <Lead>
          Ein Feld Manuelle Eingabe ist eine Cleaner-Spalte, die nie extrahiert wird: Eine prüfende
          Person füllt sie in der Prüfansicht aus. Nutzen Sie es für eine Kostenstelle, ein Sachkonto,
          einen internen Freigabecode oder alles andere, was das Dokument Ihnen nicht sagen kann.
        </Lead>
        <DataTable
          head={["Option", "Was sie macht"]}
          rows={[
            ["Freitext", "Die prüfende Person tippt den Wert ein."],
            [
              "Menü",
              "Die prüfende Person wählt aus den unterschiedlichen Werten einer Bucket-Spalte (Options-Bucket und Options-Spalte), optional nach Bedingungen gefiltert, auch nach Bedingungen auf den Feldern der aktuellen Zeile.",
            ],
            [
              "Wert ist Pflicht",
              "Die Genehmigung ist gesperrt, bis jede Zeile einen Wert hat. Schalten Sie es aus, um leere Werte zu erlauben.",
            ],
            ["Prüfer", "Wer das Feld ausfüllen und genehmigen darf; wird mit den Prüfern des Flows zusammengeführt."],
          ]}
        />
        <p>
          Jeder Run, der durch einen Cleaner mit einem Feld Manuelle Eingabe läuft, hält zur Prüfung
          an, unabhängig davon, ob der Schalter des Flows an ist. In der Prüfansicht ist die Spalte mit{" "}
          <strong>Benötigt manuelle Eingabe</strong> und der Anzahl ausgefüllter Zeilen markiert, und
          Genehmigen bleibt gesperrt (
          <em>„Füllen Sie alle erforderlichen manuellen Eingaben aus, um zu genehmigen“</em>), bis jeder
          Pflichtwert eingetragen ist.
        </p>
      </DocCard>

      <DocCard icon={<Inbox size={24} />} title="Die Prüfwarteschlange">
        <Lead>
          Die Seite <strong>Manuelle Prüfung</strong> in der Seitenleiste listet alles, was auf Sie
          wartet, das Neueste zuerst. Sie zeigt nur Elemente, bei denen Sie Prüfer sind; Prüfer sehen
          die Warteschlangen der anderen nicht.
        </Lead>
        <BulletList
          items={[
            "Kennzahlen oben: Wartet auf Prüfung, Ältester offener, Ihre Rolle und Flows mit HITL",
            "Eine Karte pro Element: Dateiname und Flow bei einem Run, mit einem Chip Abgleich oder Ausfüllung bei diesen Arten, und der Status Wartet auf Prüfung",
            "Ein roter Punkt am Symbol in der Seitenleiste, sobald etwas auf Sie wartet. Er aktualisiert sich in Echtzeit, ohne dass Sie die Seite neu laden",
            "Zugewiesene Prüfer erhalten zudem eine E-Mail mit einem direkten Link, sobald ein Run, ein Abgleich, eine Prüfung oder eine Ausfüllung sie braucht",
          ]}
        />
      </DocCard>

      <DocCard icon={<SplitSquareHorizontal size={24} />} title="Einen Run prüfen">
        <Lead>
          Die Prüfansicht ist zweigeteilt: links die extrahierte Tabelle, rechts das Originaldokument.
          Sie prüfen einen Wert an der Quelle, ohne die Seite zu verlassen, korrigieren ihn direkt und
          genehmigen. Der Trenner lässt sich ziehen, und auf dem Smartphone wechseln Sie zwischen den
          beiden Bereichen.
        </Lead>
        <Screenshot
          src="/assets/docs-hitl-review-2026-08.jpg"
          alt="Die Tavnit-Prüfansicht für einen Run, der auf Prüfung wartet: links ein bearbeitbares Datenraster mit den Spalten Subtotal, Amount und Weight und Kontrollkästchen pro Zeile, rechts die Quellrechnung, im Kopfbereich die Schaltflächen Ablehnen und Genehmigen."
          caption="Ein Run, der auf Prüfung wartet. Das Raster links ist die bereinigte Ausgabe, die zugestellt wird; das Quelldokument liegt zum Abgleich daneben."
        />
        <DataTable
          head={["Im Datenraster können Sie", "So geht's"]}
          rows={[
            ["Einen Wert bearbeiten", "Doppelklicken Sie auf die Zelle und tippen Sie."],
            [
              "Viele Zellen auf einmal ändern",
              "Wählen Sie per Ziehen, Umschalt-Klick oder Klick auf eine Spaltenüberschrift aus, dann Auf Auswahl anwenden.",
            ],
            ["Eine Zeile aus der Ausgabe entfernen", "Entfernen Sie den Haken. Ausgeschlossene Zeilen werden nicht zugestellt."],
            [
              "Eine Spalte hinzufügen oder entfernen",
              "Nutzen Sie Spalte hinzufügen oder Spalte entfernen. Eine entfernte Spalte lässt sich vor dem Genehmigen wiederherstellen.",
            ],
            ["Sehen, was das Anhalten ausgelöst hat", "Zellen, auf die eine Cleaner-Regel zutraf, sind markiert."],
            ["Felder Manuelle Eingabe ausfüllen", "Tippen Sie den Wert ein oder wählen Sie ihn aus dem Menü."],
            ["Sehen, was Sie geändert haben", "Bearbeitete Zellen bleiben hervorgehoben, bis Sie genehmigen."],
          ]}
        />
        <BulletList
          items={[
            "Der Dokumentbereich zeigt PDFs mit Seitennavigation sowie Bilddateien; Tabellen lassen sich herunterladen",
            "An Breite anpassen, An Höhe anpassen und manueller Zoom; zum Verschieben ziehen",
            "Strg/Cmd + und − zum Zoomen, Strg/Cmd + 0 zum Zurücksetzen",
          ]}
        />
      </DocCard>

      <DocCard icon={<CheckCircle2 size={24} />} title="Genehmigen und ablehnen">
        <Lead>
          Beim Genehmigen fließen Ihre Änderungen in den Run ein, und er wird für die nachgelagerten
          Schritte freigegeben. Beim Ablehnen wird der Run abgebrochen und nichts zugestellt. Beide
          Entscheidungen sind für diesen Run endgültig: Das Anhalten ist eine einmalige Schranke, kein
          Zustand, den Sie hin- und herschalten können.
        </Lead>
        <DataTable
          head={["Entscheidung", "Was mit dem Run passiert", "Was zugestellt wird"]}
          rows={[
            [
              "Genehmigen",
              "Ihre bearbeitete Tabelle ersetzt die extrahierte Ausgabe, und der Run läuft bis Abgeschlossen weiter, mit dem Badge HITL genehmigt.",
              <Fragment key="f4">
                Alles, wofür der Flow konfiguriert ist: E-Mail-Ausgabe, Webhook,{" "}
                <DocLink href="/docs/buckets">Bucket</DocLink>-Export, Formularausfüllung und ein
                verknüpfter <DocLink href="/docs/agents">Agent</DocLink>, alles mit den genehmigten
                Daten.
              </Fragment>,
            ],
            [
              "Ablehnen",
              "Der Run wird Abgebrochen, mit dem Badge HITL abgelehnt, und Ihre Begründung (optional, aber empfohlen) wird gespeichert.",
              "Nichts. Keine E-Mail, kein Webhook, keine Bucket-Zeile, kein Agent-Run.",
            ],
          ]}
        />
        <InfoBox color="green" icon={<CheckCircle2 size={20} />} title="Die erste Entscheidung gilt">
          Es müssen nicht alle zugewiesenen Prüfer zustimmen. Die erste Genehmigung oder Ablehnung
          entscheidet den Run; hatte ein zweiter Prüfer ihn geöffnet, wird dessen Entscheidung
          abgewiesen, weil der Run nicht mehr auf Genehmigung wartet. Laden Sie die Warteschlange neu,
          um den aktuellen Stand zu sehen.
        </InfoBox>
        <p>
          Die Seite des Runs zeigt, wer entschieden hat (<strong>Genehmigt von</strong> oder{" "}
          <strong>Abgelehnt von</strong>).
        </p>
      </DocCard>

      <DocCard icon={<Layers size={24} />} title="Was sonst noch auf eine Prüfung wartet">
        <Lead>
          Matchers, Inspectors und Fillers haben eigene Prüfeinstellungen, und ihre angehaltenen
          Elemente landen in derselben Warteschlange, mit derselben Regel „die erste Entscheidung
          gilt“ und demselben Audit-Protokoll.
        </Lead>
        <DataTable
          head={["Element", "Wann es anhält", "Was die prüfende Person tut"]}
          rows={[
            [
              <DocLink key="o0" href="/docs/matchers">Abgleich</DocLink>,
              "Wenn für den Matcher die manuelle Prüfung eingeschaltet ist: bei jedem Abgleich.",
              "Prüft und korrigiert die KI-Zuordnung der Zeilen über Dokumente hinweg, kann Zeilen ausschließen und genehmigt oder lehnt dann ab.",
            ],
            [
              <DocLink key="o1" href="/docs/inspectors">Prüfung (Inspector)</DocLink>,
              "Wenn für den Inspector die manuelle Prüfung eingeschaltet ist oder eine nicht bestandene Prüfregel über ihre Fehleraktionen eine Prüfung anfordert.",
              "Erlässt nicht bestandene Prüfregeln mit einer Begründung und genehmigt dann, um das Ergebnis festzuschreiben, oder lehnt ab, um die Prüfung abzubrechen.",
            ],
            [
              <DocLink key="o2" href="/docs/fillers">Ausfüllung</DocLink>,
              "Wenn für den Filler die manuelle Prüfung eingeschaltet ist oder sobald ihm Felder vom Typ Manuelle Eingabe zugeordnet sind.",
              "Prüft die ausgefüllten Formulare, tippt die manuellen Werte ein und genehmigt dann, um die Formulare freizugeben, oder lehnt ab.",
            ],
          ]}
        />
      </DocCard>

      <DocCard icon={<Eye size={24} />} title="Wer prüfen kann">
        <Lead>
          Nur die als Prüfer zugewiesenen Personen können einen Flow-Run genehmigen oder ablehnen.
          Admin zu sein reicht allein nicht: Ein Admin, der nicht auf der Prüferliste steht, bekommt den
          Run nicht in seine Warteschlange und kann ihn nicht genehmigen.
        </Lead>
        <BulletList
          items={[
            "Die Prüferlisten eines Flows verwaltet ein Eigentümer oder ein Admin",
            "Die Aktion für die manuelle Prüfung in einem Cleaner und jedes Feld Manuelle Eingabe haben eigene Prüfer, die mit denen des Flows zusammengeführt werden",
            "Jedes Mitglied kann Prüfer sein, unabhängig von seiner Rolle",
            "Die Rolle Nur HITL ist für Prüfer gemacht: Diese Mitglieder sehen nur die Warteschlange Manuelle Prüfung und können prüfen, aber nichts anderes ausführen oder ändern",
          ]}
        />
        <p>
          Unter <DocLink href="/docs/user-roles">Benutzerrollen und Berechtigungen</DocLink> sehen Sie,
          was jede Rolle ändern darf.
        </p>
      </DocCard>

      <DocCard icon={<Shield size={24} />} title="Das unveränderliche Audit-Protokoll">
        <Lead>
          Jede Prüfaktion wird mit Zeitstempel und der Identität der prüfenden Person in ein dauerhaftes
          Protokoll geschrieben, an das nur angehängt werden kann. Einträge lassen sich weder bearbeiten
          noch löschen; die Aufzeichnung, wer was geändert hat und wie die Daten vorher aussahen,
          überdauert also die Prüfung.
        </Lead>
        <DataTable
          head={["Erfasstes Ereignis", "Wann es geschrieben wird"]}
          rows={[
            ["Prüfer benachrichtigt", "Der Run gelangt in die Prüfwarteschlange, und die Prüfer erhalten eine E-Mail."],
            ["Zelle bearbeitet", "Ein Wert wird geändert, mit altem und neuem Wert."],
            ["Zeile hinzugefügt / Zeile entfernt", "Die prüfende Person fügt eine Zeile hinzu oder schließt eine aus."],
            ["Spalte hinzugefügt / Spalte entfernt", "Die prüfende Person ändert die Form der Tabelle."],
            ["Genehmigt", "Die Entscheidung, die prüfende Person und die Anzahl der Änderungen."],
            ["Abgelehnt", "Die Entscheidung, die prüfende Person und die angegebene Begründung."],
          ]}
        />
        <InfoBox color="purple" icon={<Shield size={20} />} title="Auch die Daten vor der Prüfung bleiben erhalten">
          Tavnit speichert die Ausgabe so, wie sie war, bevor die prüfende Person sie angefasst hat,
          neben der genehmigten Version. Eine Prüferin oder ein Prüfer im Audit kann die Extraktion mit
          dem zugestellten Ergebnis vergleichen, ohne sie aus dem Ereignisprotokoll rekonstruieren zu
          müssen.
        </InfoBox>
      </DocCard>

      <DocCard icon={<HelpCircle size={24} />} title="Fehlerbehebung">
        <DataTable
          head={["Symptom", "Wahrscheinliche Ursache und Lösung"]}
          rows={[
            [
              "Runs halten an, obwohl der Schalter des Flows aus ist",
              "Der Cleaner des Flows hat eine Regel unter Bedingte Aktionen mit der Aktion für die manuelle Prüfung oder ein Feld Manuelle Eingabe.",
            ],
            [
              "Ein Run wartet auf Genehmigung, ist aber nicht in meiner Warteschlange",
              "Sie stehen nicht auf seiner Prüferliste. Bitten Sie einen Eigentümer oder Admin, Sie dem Flow hinzuzufügen (oder der Cleaner-Regel, die ihn angehalten hat).",
            ],
            [
              "Genehmigen wird abgewiesen, weil Sie kein konfigurierter Prüfer sind",
              "Nur zugewiesene Prüfer können entscheiden. Wurde kein Prüfer zugewiesen, fügen Sie im Flow einen hinzu; niemand sonst kann den Run freigeben.",
            ],
            [
              "Genehmigen wird abgewiesen, weil der Run nicht auf Genehmigung wartet",
              "Ein anderer Prüfer hat zuerst entschieden. Laden Sie die Warteschlange neu.",
            ],
            [
              "Genehmigen ist wegen fehlender manueller Eingaben gesperrt",
              "Ein Pflichtfeld Manuelle Eingabe ist in manchen Zeilen noch leer. Füllen Sie es aus oder machen Sie das Feld im Cleaner optional.",
            ],
            [
              "Der verknüpfte Agent ist nicht gelaufen",
              "Er läuft erst nach der Genehmigung. Ein abgelehnter Run startet ihn nie.",
            ],
          ]}
        />
        <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Eine Prüfung kostet Zeit">
          Ein angehaltener Run wartet so lange wie nötig. Wenn die Ergebnisse einen zeitkritischen
          Prozess speisen, sorgen Sie dafür, dass die Prüfer ihre Warteschlange oder ihre E-Mails im
          Blick behalten, oder beschränken Sie das Anhalten mit einer Cleaner-Regel auf die Ausnahmen.
        </InfoBox>
      </DocCard>

      <Related
        links={[
          {
            href: "/docs/cleaners",
            label: "Eine Prüfung bedingt mit einem Cleaner auslösen",
            description:
              "Bedingte Aktionen halten nur die Runs an, die gegen eine Regel verstoßen; Felder Manuelle Eingabe sammeln Werte von einer prüfenden Person.",
          },
          {
            href: "/docs/user-roles",
            label: "Benutzerrollen und Berechtigungen",
            description: "Wer Prüfer zuweisen kann und was die Rolle Nur HITL darf.",
          },
          {
            href: "/docs/agents",
            label: "Mit Agents auf genehmigte Daten reagieren",
            description: "Ein verknüpfter Agent startet erst, nachdem die prüfende Person genehmigt hat.",
          },
          {
            href: "/docs/webhooks",
            label: "Genehmigte Ergebnisse per Webhook zustellen",
            description: "Was nach einer Genehmigung ausgelöst wird und was bei einer Ablehnung nie ausgelöst wird.",
          },
          {
            href: "/docs/buckets",
            label: "Genehmigte Daten in Buckets speichern",
            description: "Die strukturierten Tabellen, die nur Zeilen erhalten, die eine prüfende Person freigegeben hat.",
          },
        ]}
      />
    </section>
  );
}
