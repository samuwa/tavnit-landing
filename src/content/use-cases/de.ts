import type { UseCasesContent } from "@/content/types";

/**
 * Use cases: the /use-cases hub copy and every use-case page — Deutsch (de).
 * Slugs and hrefs stay English (they are URLs).
 */
const de: UseCasesContent = {
  hub: {
    title: "Anwendungsfälle — Rechnungen, Verträge, Lebensläufe und mehr",
    description:
      "Wie Teams Tavnit nach Dokumenttyp einsetzen – Rechnungen, Verträge, Lebensläufe, Belege, Bestellungen und Zollpapiere, jeweils mit dem, was dabei typischerweise schiefgeht.",
    ogTitle: "Tavnit-Anwendungsfälle",
    breadcrumbHome: "Startseite",
    breadcrumb: "Anwendungsfälle",
    h1: "Anwendungsfälle",
    intro:
      "Die Pipeline ist immer dieselbe, egal was Sie hineinschicken – extrahieren, bereinigen, prüfen, handeln. Was sich ändert, ist, welche Felder zählen und was typischerweise schiefgeht.",
    introMore:
      "Jede der folgenden Seiten zeigt, welche Felder sich bei diesem Dokumenttyp zu extrahieren lohnen, welche Stellen zuverlässig Probleme machen und welche Stufe der Pipeline sich dort bezahlt macht.",
    notSeeingHeading: "Ihr Dokumenttyp ist nicht dabei?",
    notSeeing:
      "Das sind die Typen, nach denen Teams am häufigsten fragen – keine Liste dessen, was Tavnit unterstützt. Es gibt keine Konfiguration pro Dokumenttyp: Sie beschreiben die gewünschten Felder, und dieselbe Extraktion liest jedes PDF und jedes Bild, auch Scans und Handschrift.",
    notSeeingMore:
      "Lieferscheine, Kontoauszüge, Versicherungsfälle, medizinische Formulare, Zertifikate und Antragsformulare funktionieren genauso. Starten Sie mit der [Einstiegsanleitung](/docs) und definieren Sie die Felder, die für Sie zählen.",
    finalHeading: "Beginnen Sie mit einem Dokument",
    finalBody:
      "Bauen Sie einen Flow, schicken Sie ein echtes Dokument hindurch und beurteilen Sie das Ergebnis, bevor Sie irgendetwas anbinden. Kostenlose Credits für den Einstieg.",
    finalCta: "Kostenlos starten",
  },
  items: [
    {
      slug: "invoice-processing",
      label: "Rechnungsverarbeitung",
      badge: "Finanzen & Kreditoren",
      h1: "Automatisierte Datenextraktion aus Rechnungen",
      title: "Software zur Rechnungsdatenextraktion mit Positionen",
      description:
        "Extrahieren Sie Lieferant, Rechnungsnummer, Datumsangaben, Summen und alle Positionen aus Lieferantenrechnungen in jedem Layout – mit Prüfung, bevor etwas in Ihre Buchhaltung gelangt.",
      summary:
        "Lieferant, Nummer, Datumsangaben, Summen und Positionen aus jedem Lieferantenlayout – mit Prüfung, bevor etwas in die Buchhaltung gelangt.",
      lede: "Tavnit liest Lieferantenrechnungen in jedem Layout und liefert Lieferant, Rechnungsnummer, Datumsangaben, Steuern, Summen und jede einzelne Position als typisierte Felder. Keine Vorlage pro Lieferant. Nichts wird verbucht, bevor eine prüfende Person freigibt, und jede Freigabe wird protokolliert.",
      problem: [
        "Die Kreditorenbuchhaltung ist der Klassiker dieses Problems: jeden Monat dieselben acht Felder, abgetippt aus hundert verschiedenen Layouts. Jeder Lieferant formatiert anders, manche schicken Scans, manche Fotos von Scans, und wer seine Vorlage ändert, tut es ohne Vorwarnung.",
        "Vorlagenbasierte Tools lösen schon das erste Problem schlecht – Sie konfigurieren ein Layout pro Lieferant, und jeder neue Lieferant ist eine Einrichtungsaufgabe. Sobald ein Lieferant seine Rechnung umgestaltet, bricht die Vorlage unbemerkt, und die Fehler fließen weiter in Ihre Buchhaltung.",
      ],
      fields: [
        { name: "Name und Anschrift des Lieferanten", note: "Weicht oft vom hinterlegten Handelsnamen ab – ein Lookup-Cleaner kann ihn Ihrer Lieferantenliste zuordnen." },
        { name: "Rechnungsnummer", note: "Als Text erfasst, nicht als Zahl. Führende Nullen und Präfixe sind wichtig und gehen bei numerischer Auswertung verloren." },
        { name: "Rechnungs- und Fälligkeitsdatum", note: "Formate unterscheiden sich je nach Land. Ein Datums-Cleaner vereinheitlicht TT/MM und MM/TT auf ein Ausgabeformat." },
        { name: "Positionen", note: "Eine sich wiederholende Tabelle: Beschreibung, Menge, Einzelpreis, Betrag. Der Teil, den die meisten Tools entweder auslassen oder plattdrücken." },
        { name: "Zwischensumme, Steuer, Rabatt, Gesamtsumme", note: "Es lohnt sich, alle vier zu extrahieren, damit die Rechnung geprüft statt einfach geglaubt wird." },
        { name: "Währung", note: "Ein Währungs-Cleaner kann gleichzeitig in Ihre Berichtswährung umrechnen." },
        { name: "Bestellnummer", note: "Wo vorhanden, lässt sich die Rechnung damit automatisch einer Bestellung zuordnen." },
      ],
      gotchas: [
        {
          title: "An den Positionen scheitert die Extraktion meistens",
          body: "Kopffelder sind einfach. Eine Tabelle, die über einen Seitenumbruch läuft, verbundene Zellen hat oder Beschreibungen über zwei Zeilen verteilt, ist der Punkt, an dem die meisten Tools etwas Plausibles und Falsches liefern. Tabellenfelder in einem Flow behandeln wiederkehrende Zeilen als Zeilen – eine Rechnung mit fünf Positionen liefert fünf Datensätze statt eines Textblocks.",
        },
        {
          title: "Eine falsche Summe sieht genauso aus wie eine richtige",
          body: "Es gibt keinen sichtbaren Unterschied zwischen korrekt gelesenen 1.240,00 € und falsch gelesenen 1.240,00 €, die eigentlich 1.249,00 € waren. Das ist das Argument für bedingte Prüfung: Eine Cleaner-Regel kann prüfen, ob sich die Positionen zur Zwischensumme addieren, und nur die Abweichungen an einen Menschen leiten – Sie müssen also nicht alles prüfen, um die wenigen relevanten Fälle zu finden.",
        },
        {
          title: "Mehrere Rechnungen kommen in einem PDF",
          body: "Ein Lieferantenkontoauszug oder ein gescannter Stapel enthält oft mehrere Rechnungen in einer Datei. Ein Splitter trennt sie zuerst, sodass jede ein eigener Durchlauf mit eigenem extrahierten Datensatz wird statt eines vermischten Durcheinanders.",
        },
      ],
      pipeline: [
        { label: "E-Mail-Integration", href: "/docs/email-integration", why: "Lieferanten schicken Rechnungen ohnehin per E-Mail. Leiten Sie das Kreditorenpostfach automatisch weiter, und jeder Anhang wird verarbeitet, ohne dass jemand die App öffnet." },
        { label: "Splitter", href: "/docs/splitters", why: "Trennt gestapelte oder zusammengeheftete Scans vor der Extraktion in einzelne Rechnungen." },
        { label: "Cleaner", href: "/docs/cleaners", why: "Vereinheitlicht Datumsangaben, rechnet Währungen um, gleicht Lieferanten mit Ihrer Lieferantenliste ab und markiert Rechnungen, die nicht aufgehen." },
        { label: "Manuelle Prüfung", href: "/docs/human-in-the-loop", why: "Hält einen Durchlauf zur Freigabe an – jede Rechnung oder nur die von einer Regel markierten –, mit unveränderlichem Protokoll, wer was freigegeben hat." },
        { label: "Webhooks", href: "/docs/webhooks", why: "Schickt den freigegebenen Datensatz direkt in Ihr Buchhaltungssystem, sobald er die Prüfung durchlaufen hat." },
      ],
      faqs: [
        { q: "Funktioniert es mit gescannten und fotografierten Rechnungen?", a: "Ja. Scans, Fotos und bildbasierte PDFs durchlaufen vor der Extraktion eine OCR. Die Qualität spielt trotzdem eine Rolle – ein scharfer Scan wird zuverlässiger extrahiert als ein schräges Handyfoto –, und genau für diese Grenzfälle gibt es die Prüfung." },
        { q: "Muss ich für jeden Lieferanten eine Vorlage einrichten?", a: "Nein. Sie definieren die gewünschten Felder einmal, und derselbe Flow liest Rechnungen jedes Lieferanten in jedem Layout. Ein neuer Lieferant erfordert keinerlei Konfiguration." },
        { q: "Kann es Positionen extrahieren, nicht nur Summen?", a: "Ja. Positionen werden als Tabellenfelder definiert, sodass eine wiederkehrende Tabelle einen Datensatz pro Zeile liefert – mit Beschreibung, Menge, Einzelpreis und Betrag als getrennte, typisierte Werte." },
        { q: "Wie geht es mit verschiedenen Währungen um?", a: "Die Währung wird als eigenes Feld extrahiert, und ein Cleaner kann Beträge während der Verarbeitung in Ihre Berichtswährung umrechnen, sodass nachgelagerte Systeme eine einheitliche Einheit erhalten." },
      ],
    },
    {
      slug: "contract-analysis",
      label: "Vertragsanalyse",
      badge: "Recht & Einkauf",
      h1: "Datenextraktion aus Verträgen",
      title: "Vertragsdaten extrahieren — Konditionen und Verlängerungsfristen",
      description:
        "Holen Sie Vertragsparteien, Beginn- und Verlängerungsdaten, Zahlungsbedingungen, Kündigungsfristen und Haftungsobergrenzen aus Ihrem Vertragsbestand – in eine Tabelle, die Sie tatsächlich abfragen können.",
      summary:
        "Parteien, Verlängerungsdaten, Kündigungsfristen und Zahlungsbedingungen aus dem Vertragsbestand in einer abfragbaren Tabelle.",
      lede: "Tavnit liest unterzeichnete Verträge und liefert die Konditionen, aus denen Pflichten entstehen – Parteien, Beginn- und Verlängerungsdaten, Kündigungsfristen, Zahlungsbedingungen, Haftungsobergrenzen – als strukturierte Felder. Aus dem Vertragsbestand wird eine Tabelle, die Sie abfragen, statt eines Ordners, den Sie lesen müssen.",
      problem: [
        "Die meisten Organisationen können grundlegende Fragen zu ihren eigenen Verträgen nicht beantworten. Welche Vereinbarungen verlängern sich im nächsten Quartal automatisch? Wie hoch ist unser gesamtes Haftungsrisiko? Welche Lieferanten haben 90 Tage Kündigungsfrist? Die Antworten existieren – verteilt über Hunderte von PDFs, die niemand öffnen kann.",
        "Die Kosten liegen nicht im Lesen, sondern in den Verlängerungen, die unbemerkt verstreichen, und in den Klauseln, die man erst im Streitfall entdeckt statt vorher.",
      ],
      fields: [
        { name: "Parteien und unterzeichnende Gesellschaften", note: "Die juristische Person ist oft nicht der Handelsname – beide lohnen sich zu erfassen." },
        { name: "Beginn- und Ablaufdatum", note: "Das Paar, das jede spätere Frage zur Verlängerung bestimmt." },
        { name: "Automatische Verlängerung und Kündigungsfrist", note: "Die zwei Felder, die entscheiden, ob eine Verlängerung eine Entscheidung ist oder eine Überraschung." },
        { name: "Zahlungsbedingungen und Beträge", note: "Netto 30, Meilensteine, Preisgleitklauseln. Häufig im Fließtext statt in einer Tabelle." },
        { name: "Haftungsobergrenze und Freistellungen", note: "Meist eine Klausel, keine Zahl. Am besten als Text plus ausgewertetem Wert, wo es einen gibt." },
        { name: "Anwendbares Recht und Gerichtsstand", note: "Kurz, leicht zu extrahieren und mühsam, im ganzen Bestand von Hand zu finden." },
        { name: "Kündigungsrechte", note: "Ordentlich, aus wichtigem Grund, und die jeweils erforderliche Frist." },
      ],
      gotchas: [
        {
          title: "Die Antwort steht im Fließtext, nicht in einem Feld",
          body: "Eine Rechnung setzt die Summe in ein Kästchen. Ein Vertrag versteckt die Kündigungsfrist mitten in einer Klausel, manchmal in Worten statt in Ziffern. Mit Extraktionshinweisen erklären Sie dem Flow, was eine Klausel bedeutet und wo sie typischerweise steht, statt auf ein passendes Label zu hoffen.",
        },
        {
          title: "Nachträge ändern die Antwort",
          body: "Die maßgeblichen Konditionen stehen häufig in einem Nachtrag, nicht im Original. Behandeln Sie jedes Dokument als eigenen Durchlauf und erfassen Sie das Unterzeichnungsdatum als Feld – dann ist der aktuelle Stand eine Abfrage statt einer Annahme darüber, welche Datei die neueste ist.",
        },
        {
          title: "Fehler sind hier teuer, also ist Prüfung Pflicht",
          body: "Ein falsch gelesenes Verlängerungsdatum ist ein Vertrag, aus dem Sie nicht rechtzeitig herausgekommen sind. Hier ist eine Prüfung bei jedem Durchlauf angemessen, und der unveränderliche Audit-Trail zählt so viel wie die Extraktion – Sie können zeigen, wer eine Klausel wann bestätigt hat.",
        },
      ],
      pipeline: [
        { label: "Flows", href: "/docs/flows", why: "Extraktionshinweise erklären der KI, was eine Klausel bedeutet – hier viel wichtiger als bei Dokumenten mit beschrifteten Feldern." },
        { label: "Manuelle Prüfung", href: "/docs/human-in-the-loop", why: "Prüfung bei jedem Durchlauf, mit dauerhaftem Protokoll, wer welche Klausel bestätigt hat." },
        { label: "Buckets", href: "/docs/buckets", why: "Macht aus dem Vertragsbestand eine abfragbare Tabelle – welche Vereinbarungen sich im nächsten Quartal verlängern, sortiert nach Kündigungsfrist." },
        { label: "Cleaner", href: "/docs/cleaners", why: "Vereinheitlicht Datumsformate und kann aus Ablaufdatum und Kündigungsfrist den Kündigungsstichtag berechnen." },
      ],
      faqs: [
        { q: "Kommt es mit Verträgen ohne einheitliche Struktur zurecht?", a: "Ja – das ist der Normalfall. Es gibt keine Vorlage zu konfigurieren. Sie beschreiben die gewünschten Klauseln, und der Flow findet sie, wo immer sie stehen. Deshalb sind Extraktionshinweise hier wichtiger als bei strukturierten Dokumenten." },
        { q: "Was ist mit Nachträgen und Nebenabreden?", a: "Verarbeiten Sie jedes Dokument als eigenen Durchlauf und erfassen Sie das Unterzeichnungsdatum als Feld. Der aktuelle Stand ergibt sich dann aus einer Abfrage Ihres Buckets statt aus der Vermutung, welches PDF das neueste ist." },
        { q: "Sind die extrahierten Daten abfragbar?", a: "Ja. Die Ergebnisse landen als typisierte Spalten in einem Bucket, sodass Sie über den gesamten Bestand filtern, sortieren und Diagramme erstellen können, ohne etwas zu exportieren." },
      ],
    },
    {
      slug: "resume-screening",
      label: "Lebenslauf-Screening",
      badge: "HR & Recruiting",
      h1: "Lebensläufe auslesen und sichten",
      title: "Software zum Auslesen von Lebensläufen — strukturierte Bewerberdaten",
      description:
        "Verwandeln Sie Lebensläufe in jedem Format in einheitliche Bewerberdatensätze – Kontakt, Fähigkeiten, Positionen, Zeiträume, Ausbildung –, damit die Vorauswahl ein Filter ist statt einer Lektüre.",
      summary:
        "Lebensläufe in jedem Format als einheitliche Bewerberdatensätze, damit die Vorauswahl ein Filter wird statt einer Lektüre.",
      lede: "Tavnit liest Lebensläufe in jedem Layout und liefert einheitliche Bewerberdatensätze: Kontaktdaten, Fähigkeiten, Positionen mit Zeiträumen, Ausbildung und Zertifikate. Weil jede Person in denselben Feldern beschrieben ist, wird die Vorauswahl zum Filtern einer Tabelle statt zum Öffnen von zweihundert PDFs.",
      problem: [
        "Lebensläufe sind die am wenigsten standardisierten Dokumente, mit denen die meisten Teams zu tun haben. Ein- oder zweispaltig, Tabellen oder Fließtext, ein gestaltetes Layout mit den Zeiträumen in einer Seitenleiste. Ein Mensch liest jeden davon; Software meist nur etwa die Hälfte.",
        "Die eigentlichen Kosten entstehen durch Uneinheitlichkeit. Wenn hundert Lebensläufe jeweils etwas anders zusammengefasst werden, lassen sich Kandidatinnen und Kandidaten nicht mehr nach denselben Kriterien vergleichen – und die Vorauswahl hängt stillschweigend davon ab, wen die erste prüfende Person gerade mochte.",
      ],
      fields: [
        { name: "Name und Kontaktdaten", note: "Oft in einer Kopfzeile, einer Seitenleiste oder einem Bild – einer der häufigeren Extraktionsfehler." },
        { name: "Positionen mit Arbeitgebern und Zeiträumen", note: "Eine sich wiederholende Tabelle, kein Einzelwert. Tabellenfelder halten jede Station als eigene Zeile." },
        { name: "Gesamte Berufserfahrung in Jahren", note: "Selten angegeben. Ein Formel-Cleaner kann sie aus den Zeiträumen berechnen, statt einer Behauptung zu vertrauen." },
        { name: "Fähigkeiten", note: "Am besten wörtlich extrahiert und dann vereinheitlicht – ein Kategorie-Cleaner kann „JS“, „JavaScript“ und „ES6“ auf einen Wert abbilden." },
        { name: "Ausbildung und Zertifikate", note: "Einrichtung, Abschluss, Jahr. Eine weitere wiederkehrende Struktur." },
        { name: "Wohnort und Arbeitserlaubnis", note: "Oft der erste harte Filter – und oft in der Kopfzeile versteckt." },
      ],
      gotchas: [
        {
          title: "Zweispaltige Layouts überfordern naive Leser",
          body: "Ein gestalteter Lebenslauf mit Seitenleiste wird für alles, was einfach Text von oben nach unten ausliest, zu verschachteltem Unsinn. Eine layoutbewusste Extraktion hält Seitenleiste und Hauptspalte getrennt – deshalb landen Kontaktdaten aus der Seitenleiste trotzdem im richtigen Feld.",
        },
        {
          title: "Ohne Vereinheitlichung der Fähigkeiten ist der Filter nutzlos",
          body: "Wörtlich extrahiert erhalten Sie „JS“, „JavaScript“, „Javascript (ES6)“ und „JAVASCRIPT“ als vier verschiedene Werte, und ein Filter auf einen davon verfehlt die anderen. Ein Kategorie-Cleaner bildet Varianten auf ein kontrolliertes Vokabular ab, damit der Filter wirklich alle Qualifizierten findet.",
        },
        {
          title: "Das sind personenbezogene Daten, und die Regeln sind strenger",
          body: "Lebensläufe sind per Definition personenbezogene Daten, und in mehreren Rechtsordnungen gelten für Bewerberdaten Aufbewahrungsfristen und ein Recht auf Löschung. Mit der Sichtbarkeit von Buckets und Zugriffsrechten pro Person bleiben Bewerberdaten auf die Personen beschränkt, die den Prozess führen, statt organisationsweit sichtbar zu sein.",
        },
      ],
      pipeline: [
        { label: "Flows", href: "/docs/flows", why: "Tabellenfelder halten jede Station und jede Qualifikation als eigene Zeile statt als einen Textblock." },
        { label: "Cleaner", href: "/docs/cleaners", why: "Bildet Fähigkeiten auf ein kontrolliertes Vokabular ab und berechnet die Berufserfahrung aus den Zeiträumen." },
        { label: "Buckets", href: "/docs/buckets", why: "Bewerberdatensätze als filterbare Tabelle, mit Zugriff pro Bucket, damit Bewerberdaten nicht organisationsweit sichtbar sind." },
        { label: "E-Mail-Integration", href: "/docs/email-integration", why: "Bewerbungen, die per E-Mail eintreffen, werden samt Anhängen sofort verarbeitet." },
      ],
      faqs: [
        { q: "Kommt es mit zweispaltigen und gestalteten Lebensläufen zurecht?", a: "Ja. Die Extraktion ist layoutbewusst, statt Rohtext von oben nach unten zu lesen, sodass Seitenleisten und mehrspaltige Layouts nicht zu Unsinn verschachtelt werden." },
        { q: "Kann es Bezeichnungen von Fähigkeiten vereinheitlichen?", a: "Ja. Wörtlich extrahieren und dann mit einem Kategorie-Cleaner Varianten auf ein kontrolliertes Vokabular abbilden – so liefert ein Filter auf eine Fähigkeit alle, die sie haben." },
        { q: "Wie bleiben Bewerberdaten vertraulich?", a: "Buckets können privat statt organisationsweit sichtbar sein, mit Viewer- oder Editor-Rechten pro Person. Bewerberdaten bleiben auf die Personen beschränkt, die den Prozess führen." },
      ],
    },
    {
      slug: "expense-reports",
      label: "Spesenabrechnungen",
      badge: "Finanzen & Mitarbeitende",
      h1: "Belege und Spesenabrechnungen verarbeiten",
      title: "Beleg-OCR und automatisierte Spesenabrechnung",
      description:
        "Verwandeln Sie fotografierte Belege in kategorisierte Spesenpositionen – Händler, Datum, Betrag, Steuer und Kategorie –, damit die Erstattung eine Prüfung ist statt Datenerfassung.",
      summary:
        "Fotografierte Belege als kategorisierte Spesenpositionen, damit die Erstattung eine Prüfung wird statt Datenerfassung.",
      lede: "Tavnit liest Belege – auch zerknitterte, bei schlechtem Licht fotografierte – und liefert Händler, Datum, Betrag, Steuer und Kategorie als typisierte Felder. Spesen kommen kategorisiert und überprüfbar an, sodass die Freigabe einer Abrechnung eine Prüfung ist statt einer Abtipparbeit.",
      problem: [
        "Die Spesenabrechnung scheitert an beiden Enden. Mitarbeitende schieben die Einreichung auf, weil das Formular mühsam ist, und die Finanzabteilung tippt das Eingereichte dann erneut ab, weil es uneinheitlich ausgefüllt wurde. Erstattungen verzögern sich, und niemand hat an irgendeinem Teil davon Freude.",
        "Belege sind zudem die Dokumente mit der schlechtesten Qualität, die die meisten Unternehmen verarbeiten: verblasstes Thermopapier, schräg fotografiert, gefaltet, manchmal teilweise in einer anderen Sprache.",
      ],
      fields: [
        { name: "Händlername", note: "Oft ein stilisiertes Logo statt Text – eines der schwierigeren Felder auf einem Beleg." },
        { name: "Datum und Uhrzeit der Transaktion", note: "Die Uhrzeit ist für Tagespauschalen und Duplikaterkennung wichtiger, als man denkt." },
        { name: "Gesamtbetrag, Steuer und Trinkgeld", note: "Die Steuer getrennt zu erfassen ist für den Vorsteuerabzug wichtig, das Trinkgeld für die Richtlinie." },
        { name: "Zahlungsart und letzte vier Ziffern", note: "Damit lässt sich automatisch mit der Kartenabrechnung abstimmen." },
        { name: "Spesenkategorie", note: "Am besten von einem KI-Kategorie-Cleaner aus Händler und Positionen abgeleitet, statt die Mitarbeitenden zu fragen." },
        { name: "Währung", note: "Reisekosten kommen in der Währung an, in der ausgegeben wurde; die Umrechnung gehört in die Pipeline." },
      ],
      gotchas: [
        {
          title: "Die Qualität von Belegen ist wirklich schlecht",
          body: "Verblasstes Thermopapier, Spiegelungen, Knicke und schräge Winkel sind die Regel, nicht die Ausnahme. Die Extraktion kommt mit dem Großteil zurecht, aber hier lohnt sich bedingte Prüfung besonders: Unsichere oder richtlinienwidrige Beträge gehen an einen Menschen, die sauberen laufen durch.",
        },
        {
          title: "Die Kategorisierung ist die eigentliche Arbeit",
          body: "Den Gesamtbetrag zu lesen ist leicht. Zu entscheiden, ob eine Restaurantrechnung Kundenbewirtung oder ein Teamessen ist, kostet die Finanzabteilung die Zeit. Ein KI-Kategorie-Cleaner vergibt eine Kategorie anhand von Händler und Positionen – die Mitarbeitenden müssen nicht raten, und die Finanzabteilung korrigiert, statt zu klassifizieren.",
        },
        {
          title: "Duplikate sind häufig und teuer",
          body: "Derselbe Beleg zweimal eingereicht – einmal als Foto, einmal als PDF vom Händler – ist eine alltägliche Ursache für Überzahlungen. Händler, exakter Betrag und Zeitstempel reichen aus, um das im Bucket zu erkennen, statt es erst bei einer Prüfung zu entdecken.",
        },
      ],
      pipeline: [
        { label: "E-Mail-Integration", href: "/docs/email-integration", why: "Mitarbeitende leiten Belege an eine Adresse weiter, statt eine App zu lernen. Digitale Belege lassen sich beim Eintreffen automatisch weiterleiten." },
        { label: "Cleaner", href: "/docs/cleaners", why: "Vergibt per KI eine Kategorie, rechnet Fremdwährungen um und vereinheitlicht Händlernamen." },
        { label: "Manuelle Prüfung", href: "/docs/human-in-the-loop", why: "Bedingte Prüfung – nur Spesen über einem Schwellenwert oder außerhalb der Richtlinie landen bei einer freigebenden Person." },
        { label: "Buckets", href: "/docs/buckets", why: "Spesen als Tabelle, die Sie gruppieren, visualisieren und vor der Auszahlung auf Duplikate prüfen können." },
      ],
      faqs: [
        { q: "Kann es das Foto eines zerknitterten Belegs lesen?", a: "In der Regel ja. Fotos, verblasstes Thermopapier und gefaltete Belege durchlaufen alle eine OCR, wobei die Qualität die Obergrenze setzt – genau deshalb gibt es die bedingte Prüfung für die Fälle, bei denen sich die Pipeline am wenigsten sicher ist." },
        { q: "Lassen sich Spesen automatisch kategorisieren?", a: "Ja. Ein KI-Kategorie-Cleaner vergibt eine Kategorie anhand von Händler und Positionen, sodass die Finanzabteilung gelegentliche Sonderfälle korrigiert, statt alles selbst zu klassifizieren." },
        { q: "Was ist mit Fremdwährungen bei Reisekosten?", a: "Die Währung ist ein eigenes extrahiertes Feld, und ein Umrechnungs-Cleaner kann Beträge während der Verarbeitung in Ihrer Berichtswährung ausweisen." },
      ],
    },
    {
      slug: "purchase-orders",
      label: "Bestellungen",
      badge: "Einkauf & Kreditoren",
      h1: "Software für den Bestellabgleich: Rechnungen automatisch mit Bestellungen abgleichen",
      title: "Automatisierter Bestellabgleich — Rechnungen und Bestellungen",
      description:
        "Software für den Bestellabgleich: Bestellungen und Rechnungen in dieselben Felder extrahieren, Positionen automatisch zuordnen und nur Abweichungen an eine prüfende Person leiten.",
      summary:
        "Bestellungen und Rechnungen in einer gemeinsamen Struktur, Position für Position zugeordnet – nur Abweichungen gehen an eine prüfende Person.",
      lede: "Tavnit liest Bestellungen und die darauf folgenden Rechnungen, extrahiert Bestellnummer, Lieferant, Artikelnummern, Mengen und Preise als typisierte Felder und ordnet Rechnungspositionen automatisch den Bestellpositionen zu – auch wenn der Lieferant einen Artikel anders beschreibt. Der Abgleich auf Kopfebene ist ein Lookup über die Bestellnummer, der Abgleich auf Positionsebene ein Matcher-Vergleich; alles, was nicht übereinstimmt, geht an eine benannte prüfende Person statt in Ihre Buchhaltung.",
      problem: [
        "Der Bestellabgleich prüft, ob das Berechnete dem Bestellten entspricht. In den meisten Teams geschieht er noch per Augenmaß: Jemand aus der Kreditorenbuchhaltung öffnet das Rechnungs-PDF, sucht die Bestellung und vergleicht Mengen und Preise Zeile für Zeile. Das ist langsam, und genau dort rutschen die zwei teuren Fehler durch – eine falsche Menge und ein falscher Einzelpreis –, weil sie genauso aussehen wie richtige.",
        "Automatisierte Abgleichsfunktionen in ERP-Systemen setzen voraus, dass beide Dokumente bereits strukturiert sind. Das sind sie nicht. Die Bestellung stammt aus Ihrem System, die Rechnung aber aus dem des Lieferanten – als PDF, mit dessen Artikelnummern und dessen Layout. Sie in eine vergleichbare Form zu bringen, ist die ungelöste Hälfte des Problems, und genau diese Hälfte übernimmt Tavnit.",
      ],
      fields: [
        { name: "Bestellnummer", note: "Der Schlüssel, über den alles verknüpft wird. Als Text extrahieren – Präfixe und führende Nullen sind relevant, und Lieferanten setzen sie an unterschiedliche Stellen der Rechnung." },
        { name: "Lieferant und Käufer", note: "Der Lieferantenname auf der Rechnung stimmt selten wörtlich mit dem Lieferantenstamm überein. Ein Lookup-Cleaner ordnet ihn Ihrer Lieferanten-ID zu." },
        { name: "Positionen: Beschreibung, Artikelnummer, Menge", note: "Eine wiederkehrende Tabelle auf beiden Dokumenten. Lieferantenartikelnummern weichen meist von Ihren ab, Beschreibungen sind anders formuliert – das macht den Positionsabgleich schwer." },
        { name: "Einzelpreis und Gesamtbetrag", note: "Beide, damit Einzelpreis × Menge schon auf der Rechnung selbst geprüft werden kann, bevor sie mit der Bestellung verglichen wird." },
        { name: "Rechnungs- und Bestellsumme", note: "Abgleich auf Kopfebene. Stimmt die Summe, aber eine Position nicht, wurden Menge und Preis vertauscht – genau der Fall, den eine reine Summenprüfung übersieht." },
        { name: "Lieferdatum und Lieferscheinnummer", note: "Das dritte Dokument im 3-Wege-Abgleich. Lieferscheine werden genauso extrahiert; siehe die Seite zu Lieferscheinen." },
        { name: "Zahlungsbedingungen und Währung", note: "Kurze Felder mit großen Folgen, wenn die Rechnung von der Bestellung abweicht." },
      ],
      gotchas: [
        {
          title: "2-Wege, 3-Wege: Der Abgleich funktioniert nur, wenn die Strukturen übereinstimmen",
          body: "Ein 2-Wege-Abgleich vergleicht die Rechnung mit der Bestellung; ein 3-Wege-Abgleich zieht den Wareneingangsbeleg hinzu. Beide scheitern, wenn die Dokumente in unterschiedliche Feldnamen extrahiert werden. Erst wenn Bestellungen, Rechnungen und Lieferscheine durch Flows mit demselben Feldschema laufen – Bestellnummer, Artikelnummer, Menge, Einzelpreis –, wird der Abgleich zum Vergleich statt zur Dokumentenlektüre.",
        },
        {
          title: "Lieferantenartikelnummern sind nicht Ihre Artikelnummern",
          body: "Die Bestellung führt Ihre Artikelnummer, die Rechnung die des Lieferanten. Ein Lookup-Cleaner ordnet Lieferantenartikelnummern während der Verarbeitung anhand Ihrer Referenzdaten Ihren Artikelnummern zu, sodass die Rechnung bereits übersetzt ankommt. Wo es keine Referenz gibt, ordnet ein Matcher Positionen nach der Bedeutung der Beschreibung zu – inhaltlich, nicht exakt –, mit einem LLM als Schiedsrichter für Grenzfälle.",
        },
        {
          title: "Abgleich auf Positionsebene, nicht nur über Summen",
          body: "Legen Sie den Bestell-Durchlauf als Referenz fest und die Rechnung als den damit verglichenen Durchlauf. Der Matcher ordnet jede Rechnungsposition einer Bestellposition zu und stellt Menge und Einzelpreis nebeneinander; nicht zugeordnete Positionen werden als Warnungen gelistet statt stillschweigend verworfen. Eine reine Summenprüfung würde eine Rechnung durchlassen, die den richtigen Betrag für die falschen Artikel berechnet.",
        },
        {
          title: "Nur die Ausnahmen sollten bei einem Menschen landen",
          body: "Eine Prüfung jeder Rechnung bildet den manuellen Prozess nach. Ein Formel-Cleaner prüft auf der Rechnung selbst, ob Einzelpreis × Menge den Positionsbetrag ergibt, und eine Bedingung markiert Positionen außerhalb Ihrer Toleranz. Die manuelle Prüfung wird nur für markierte Durchläufe ausgelöst – die prüfende Person sieht die drei abweichenden Rechnungen, nicht die dreihundert passenden.",
        },
      ],
      pipeline: [
        { label: "Collections", href: "/docs/collections", why: "Lieferanten schicken Bestellbestätigungen, Rechnungen und Lieferscheine an eine Adresse. Collections klassifizieren jedes Dokument und leiten es an den richtigen Flow." },
        { label: "Cleaner", href: "/docs/cleaners", why: "Ordnet Lieferantenartikelnummern und Lieferantennamen per Lookup Ihren Stammdaten zu, prüft die Positionsrechnung und markiert Werte außerhalb der Toleranz." },
        { label: "Buckets", href: "/docs/buckets", why: "Hält Bestellungen und Rechnungen in derselben Struktur, sodass der Abgleich auf Kopfebene eine Abfrage über die Bestellnummer ist." },
        { label: "Manuelle Prüfung", href: "/docs/human-in-the-loop", why: "Nur markierte Rechnungen warten auf eine benannte prüfende Person, mit unveränderlichem Audit-Trail, wer was freigegeben hat." },
        { label: "API-Integration", href: "/docs/api-integration", why: "Übergibt abgeglichene, freigegebene Rechnungen ohne manuellen Schritt an Ihr ERP- oder Kreditorensystem." },
      ],
      faqs: [
        { q: "Was ist der Bestellabgleich?", a: "Der Bestellabgleich prüft, ob eine Rechnung mit der Bestellung übereinstimmt, auf die sie sich bezieht – derselbe Lieferant, dieselben Artikel, dieselben Mengen und Preise. Ein 2-Wege-Abgleich vergleicht Rechnung und Bestellung; ein 3-Wege-Abgleich prüft zusätzlich den Wareneingangsbeleg. Es ist die Kontrolle, die verhindert, dass ein Lieferant für etwas bezahlt wird, das nicht bestellt oder nicht geliefert wurde." },
        { q: "Kann Tavnit Rechnungen automatisch mit Bestellungen abgleichen?", a: "Ja. Extrahieren Sie beide in dieselbe Feldstruktur, und der Abgleich auf Kopfebene wird zur Abfrage über die Bestellnummer in Ihrem Bucket. Für den Abgleich auf Positionsebene nimmt ein Matcher im Benchmark-Modus die Bestellung als Referenz und ordnet ihr jede Rechnungsposition zu, mit Menge und Einzelpreis nebeneinander. Nicht zuordenbare Positionen werden als Warnungen gelistet." },
        { q: "Was, wenn der Lieferant eigene Artikelnummern oder Beschreibungen verwendet?", a: "Liegen Referenzdaten vor, ordnet ein Lookup-Cleaner Lieferantenartikelnummern während der Verarbeitung Ihren Artikelnummern zu. Liegen keine vor, ordnet der Matcher Positionen nach der Bedeutung der Beschreibung zu statt nach exaktem Text, mit einem LLM als Schiedsrichter für Grenzfälle – so landen „Blue widget 10pk“ und „WIDGET-BLU x10“ in derselben Zeile." },
        { q: "Was passiert, wenn eine Rechnung nicht übereinstimmt?", a: "Sie wird angehalten. Ein Bedingungs-Cleaner markiert den Durchlauf, und die manuelle Prüfung leitet ihn an eine benannte prüfende Person, die Rechnung, extrahierte Werte und die Abweichung sieht. Passende Rechnungen laufen per API oder Webhook direkt in Ihr ERP. Jede Ansicht, Änderung und Freigabe wird in einem unveränderlichen Audit-Trail festgehalten." },
        { q: "Unterstützt es den 3-Wege-Abgleich mit Lieferscheinen?", a: "Lieferscheine und Wareneingangsbelege werden genauso extrahiert wie Bestellungen und Rechnungen – einschließlich handschriftlicher Mengen auf unterschriebenen Abliefernachweisen – und zwar in dieselbe Feldstruktur. Der dritte Teil des Abgleichs ist also ein dritter Durchlauf, der mit der Bestellung verglichen wird." },
        { q: "Müssen wir unser ERP ändern?", a: "Nein. Tavnit arbeitet ihm vorgelagert: Dokumente kommen per E-Mail oder API an, werden extrahiert und abgeglichen, und freigegebene Ergebnisse gehen per REST-API oder Webhook an Ihr ERP- oder Kreditorensystem. Für Teams, die keinen Code schreiben möchten, gibt es Vorlagen für Zapier, Make und n8n." },
        { q: "Kommen die Positionen einzeln an?", a: "Ja. Positionen sind Tabellenfelder, sodass jede Zeile Artikelnummer, Beschreibung, Menge, Einzelpreis und Gesamtbetrag als getrennte, typisierte Werte liefert – erst das macht einen Vergleich auf Positionsebene überhaupt möglich." },
      ],
    },
    {
      slug: "customs-trade",
      label: "Zoll & Handel",
      badge: "Logistik & Handel",
      h1: "Automatisierung von Zolldokumenten",
      title: "Zollautomatisierung mit HS-Code-Einreihung",
      description:
        "Extrahieren Sie Handelsrechnungen, Packlisten und Konnossemente und reihen Sie Waren schon während der Verarbeitung in HS-Zolltarifnummern ein, nicht erst danach.",
      summary:
        "Handelsrechnungen, Packlisten und Konnossemente extrahiert – mit HS-Einreihung direkt in der Pipeline.",
      lede: "Tavnit liest Zollpapiere – Handelsrechnungen, Packlisten, Konnossemente, Ursprungszeugnisse – und liefert Versender, Empfänger, Warenbeschreibungen, Gewichte und Werte als typisierte Felder. Ein HS-Code-Cleaner reiht die Waren während der Verarbeitung in Zolltarifnummern ein, sodass Anmeldungen aus strukturierten Daten vorbereitet werden statt abgetippt.",
      problem: [
        "Eine einzige Sendung erzeugt einen Stapel Dokumente, die dieselben Fakten in unterschiedlichen Layouts wiederholen, und eine Zollanmeldung verlangt, dass sie abgestimmt und korrekt sind. Die Arbeit besteht aus Abtippen plus Einreihen, unter Zeitdruck, und ein Fehler bedeutet eine verzögerte Sendung oder eine Strafe.",
        "Die Einreihung ist der Spezialistenteil. Die Zolltarifnummer für eine Beschreibung festzulegen, ist Ermessensarbeit, an die sich die meisten Extraktionstools gar nicht erst heranwagen – sie bleibt ein manueller Schritt, nachdem die Automatisierung fertig ist.",
      ],
      fields: [
        { name: "Versender und Empfänger", note: "Vollständige Firmennamen und Anschriften, die die Anmeldung bestimmen." },
        { name: "Warenbeschreibung je Position", note: "Der Text, aus dem die Einreihung abgeleitet wird – lohnt sich wörtlich zu extrahieren." },
        { name: "HS-Zolltarifnummer", note: "Wird von einem Cleaner während der Verarbeitung aus der Beschreibung eingereiht, statt danach nachgeschlagen zu werden." },
        { name: "Menge, Netto- und Bruttogewicht", note: "Gewichte stehen auf der Packliste, Werte auf der Rechnung – beides muss abgestimmt werden." },
        { name: "Ursprungsland", note: "Bestimmt Zollsätze und Präferenzbehandlung. Häufig je Position statt je Sendung angegeben." },
        { name: "Incoterms und angemeldeter Wert", note: "Legt fest, was zollpflichtig ist und wer wofür verantwortlich ist." },
        { name: "Container- und B/L-Nummern", note: "Die Schlüssel, mit denen sich die Dokumente einer Sendung zuordnen lassen." },
      ],
      gotchas: [
        {
          title: "Die Einreihung ist der schwierige Teil – und sie ist eingebaut",
          body: "Die meisten Dokumententools hören bei der Extraktion auf und überlassen die Zolltarif-Einreihung der Handarbeit. Tavnit bringt einen HS-Code-Cleaner mit, der Waren im selben Durchlauf anhand der extrahierten Beschreibung einreiht – der Spezialistenschritt findet also innerhalb der Pipeline statt, nicht danach.",
        },
        {
          title: "Eine Sendung, mehrere Dokumente, eine Wahrheit",
          body: "Die Handelsrechnung enthält die Werte, die Packliste die Gewichte, das Konnossement den Container. Eine Collection leitet jeden Dokumenttyp an seinen eigenen Flow, und ein gemeinsamer Bucket mit der Sendungsreferenz als Schlüssel setzt alles zu einem Gesamtbild zusammen.",
        },
        {
          title: "Fehler bedeuten hier Strafen, keine Korrekturen",
          body: "Ein falsch angemeldeter Code oder Wert ist ein Zollproblem, kein Buchhaltungsproblem. Hier ist eine Prüfung jeder Anmeldung angemessen, und der unveränderliche Audit-Trail ist wirklich nützlich, wenn Sie darlegen müssen, wie eine Einreihung zustande kam.",
        },
      ],
      pipeline: [
        { label: "Collections", href: "/docs/collections", why: "Leitet Rechnungen, Packlisten und Konnossemente aus einem Postfach automatisch an den richtigen Flow." },
        { label: "Cleaner", href: "/docs/cleaners", why: "Reiht Waren in HS-Zolltarifnummern ein, rechnet Währungen um und vereinheitlicht Gewichte und Einheiten." },
        { label: "Splitter", href: "/docs/splitters", why: "Versandpapiere kommen meist als ein zusammengefasstes PDF. Splitter trennen es vor der Extraktion." },
        { label: "Manuelle Prüfung", href: "/docs/human-in-the-loop", why: "Prüfen Sie jede Anmeldung vor der Einreichung, mit Protokoll, wer welche Einreihung freigegeben hat." },
      ],
      faqs: [
        { q: "Vergibt es wirklich HS-Zolltarifnummern?", a: "Ja. Ein HS-Code-Cleaner reiht Waren im selben Durchlauf anhand der extrahierten Beschreibung ein, sodass die Einreihung innerhalb der Pipeline stattfindet statt als manueller Schritt danach. Die Anmeldung bleibt Ihre Verantwortung, deshalb empfehlen wir eine Prüfung vor der Einreichung." },
        { q: "Kommt es mit dem kompletten Dokumentensatz einer Sendung zurecht?", a: "Ja. Eine Collection leitet Handelsrechnungen, Packlisten und Konnossemente an ihre eigenen Flows, und die über die Sendungsreferenz verknüpften Ergebnisse ergeben einen gemeinsamen Datensatz." },
        { q: "Was, wenn die Papiere als ein zusammengefasstes PDF ankommen?", a: "Ein Splitter trennt die Datei zuerst in ihre einzelnen Dokumente, sodass jedes von dem dafür gebauten Flow extrahiert wird." },
      ],
    },
    {
      slug: "bank-statements",
      label: "Kontoauszüge",
      badge: "Finanzen & Kreditvergabe",
      h1: "Datenextraktion aus Kontoauszügen",
      title: "Kontoauszüge extrahieren — vom PDF zu Transaktionszeilen",
      description:
        "Verwandeln Sie Kontoauszug-PDFs jeder Bank in Transaktionszeilen – Datum, Verwendungszweck, Betrag, laufender Saldo –, bereit für Abstimmung oder Bonitätsprüfung.",
      summary: "Kontoauszug-PDFs jeder Bank als Transaktionszeilen, die Sie abstimmen, kategorisieren oder bewerten können.",
      lede: "Tavnit liest Kontoauszug-PDFs jedes Instituts und liefert jede Transaktion als Zeile: Datum, Verwendungszweck, Soll oder Haben und laufender Saldo. Weil auch der Saldo extrahiert wird, lässt sich die Rechnung prüfen statt annehmen – und genau das macht das Ergebnis für die Abstimmung verlässlich.",
      problem: [
        "Jede Bank formatiert Kontoauszüge anders, und keine formatiert sie für Maschinen. Spalten verschieben sich, Transaktionen brechen auf zwei Zeilen um, und der laufende Saldo ist das Einzige, was die Abfolge zusammenhält. Wer Kreditwürdigkeit prüft, Bücher führt oder abstimmt, tippt am Ende alles ab oder bezahlt für einen Connector pro Bank.",
        "Open Banking löst das, wo es verfügbar ist und der Kunde zustimmt. Für alles andere – frühere Zeiträume, Geschäftskonten, Banken ohne API, Kontoauszüge als Nachweis – ist das PDF die einzige Quelle.",
      ],
      fields: [
        { name: "Kontoinhaber, Kontonummer und Bankleitzahl", note: "Meist nur auf Seite eins, muss also über einen mehrseitigen Auszug mitgeführt werden." },
        { name: "Abrechnungszeitraum", note: "Legt fest, was die Summen bedeuten – und fehlt am häufigsten, wenn jemand von Hand abtippt." },
        { name: "Buchungsdatum", note: "Oft abgekürzt und ohne Jahr – das Jahr ergibt sich aus dem Abrechnungszeitraum, nicht aus der Zeile." },
        { name: "Verwendungszweck oder Gegenpartei", note: "Von der Bank gekürzt und abgekürzt. Ein Kategorie-Cleaner leitet daraus Händler und Art ab." },
        { name: "Soll, Haben und laufender Saldo", note: "Alle drei extrahieren. Am Saldo erkennen Sie, dass keine Zeile verloren ging." },
        { name: "Anfangs- und Endsaldo", note: "Die Prüfsumme für den gesamten Auszug." },
      ],
      gotchas: [
        {
          title: "Eine verlorene Zeile ist ohne Saldo unsichtbar",
          body: "Übersieht die Extraktion eine Transaktion, wirken die übrigen Zeilen trotzdem völlig plausibel. Wird der laufende Saldo extrahiert, wird daraus ein erkennbarer Fehler: Ein Formel-Cleaner prüft, ob der Saldo jeder Zeile dem vorherigen Saldo plus der Bewegung entspricht, und markiert den Auszug, statt ihn durchzulassen.",
        },
        {
          title: "Transaktionen brechen um – und umgebrochene Zeilen sind keine neuen Transaktionen",
          body: "Lange Namen von Gegenparteien laufen in eine zweite Zeile, und naives Tabellenlesen macht aus einer Zahlung zwei Zeilen mit leerem Betrag. Tabellenfelder behandeln eine Zeile als Zeile, sodass ein umgebrochener Verwendungszweck bei seinem Betrag bleibt.",
        },
        {
          title: "Datumsangaben haben selten ein Jahr",
          body: "Die meisten Auszüge drucken „14. März“ und verlassen sich für das Jahr auf den Zeitraum oben. Für Menschen ist das in Ordnung, für eine Datenbank falsch – besonders über einen Jahreswechsel hinweg in einem Januar-Auszug. Extrahieren Sie den Abrechnungszeitraum und leiten Sie das vollständige Datum mit einem Formel-Cleaner daraus ab.",
        },
      ],
      pipeline: [
        { label: "Flows", href: "/docs/flows", why: "Transaktionen sind Tabellenfelder, sodass jede als eigene typisierte Zeile zurückkommt statt als Textblock." },
        { label: "Cleaner", href: "/docs/cleaners", why: "Leitet vollständige Datumsangaben aus dem Abrechnungszeitraum ab, prüft laufende Salden und kategorisiert Gegenparteien." },
        { label: "Buckets", href: "/docs/buckets", why: "Transaktionen landen als abfragbare Tabelle – nach Gegenpartei filtern, nach Monat gruppieren, den Saldo als Diagramm darstellen." },
        { label: "Manuelle Prüfung", href: "/docs/human-in-the-loop", why: "Leitet nur die Auszüge, die eine Saldoprüfung nicht bestehen, an einen Menschen, statt alle zu prüfen." },
      ],
      faqs: [
        { q: "Funktioniert es mit jeder Bank?", a: "Ja. Es gibt keine Vorlage pro Bank – derselbe Flow liest Auszüge jedes Instituts, auch Geschäftskonten und frühere Zeiträume, die eine Open-Banking-API nicht abdecken würde." },
        { q: "Woher weiß ich, dass keine Transaktion fehlt?", a: "Extrahieren Sie zu jeder Transaktion den laufenden Saldo und prüfen Sie mit einem Formel-Cleaner, ob jede Zeile zur vorherigen passt. Ein Auszug, der die Prüfung nicht besteht, wird markiert, statt unbemerkt durchzurutschen." },
        { q: "Lassen sich Transaktionen automatisch kategorisieren?", a: "Ja. Ein KI-Kategorie-Cleaner vergibt anhand des Verwendungszwecks eine Kategorie, sodass die Buchhaltung mit klassifizierten Zeilen beginnt statt mit rohem Banktext." },
      ],
    },
    {
      slug: "supplier-quotes",
      label: "Lieferantenangebote",
      badge: "Einkauf & Beschaffung",
      h1: "Lieferantenangebote vergleichen",
      title: "Lieferantenangebote vergleichen und Preise benchmarken",
      description:
        "Extrahieren Sie Positionen aus konkurrierenden Angeboten und vergleichen Sie sie automatisch – gleichwertige Artikel werden lieferantenübergreifend zugeordnet und der beste Preis je Position benannt.",
      summary: "Konkurrierende Angebote extrahiert und Position für Position verglichen, mit dem besten Preis je Artikel.",
      lede: "Tavnit extrahiert Positionen aus konkurrierenden Lieferantenangeboten; anschließend ordnen Matcher gleichwertige Artikel lieferantenübergreifend zu und küren je Position einen Preissieger. Sie erhalten eine Vergleichstabelle statt drei PDFs und einer von Hand gebauten Tabelle.",
      problem: [
        "Angebote zu vergleichen ist der Teil der Beschaffung, der nie einfacher wird. Drei Lieferanten schicken drei Layouts, beschreiben denselben Artikel auf drei verschiedene Arten und bieten unterschiedliche Packungsgrößen an. Jemand baut eine Tabelle, tippt alles ab und hofft, die richtigen Zeilen zugeordnet zu haben.",
        "Die eigentliche Schwierigkeit ist die Zuordnung. „M8 hex bolt 50mm“, „Bolt, hex, M8x50“ und „HEX BOLT M8 50MM zinc“ sind derselbe Artikel, und kein exakter Abgleich wird sie je zusammenbringen.",
      ],
      fields: [
        { name: "Lieferant", note: "Das Feld, das jeden Teilnehmer des Vergleichs benennt. Ein Angebot, ein Lieferant." },
        { name: "Artikelbeschreibung", note: "Der Text, der lieferantenübergreifend zugeordnet wird. Wörtlich extrahieren – zu frühe Vereinheitlichung zerstört das Signal, das die Zuordnung braucht." },
        { name: "Einzelpreis", note: "Das numerische Feld, über das der Sieger entschieden wird. Nicht-numerische Einträge wie „auf Anfrage“ werden ausgeschlossen und gemeldet statt stillschweigend ignoriert." },
        { name: "Menge und Mengeneinheit", note: "Dient als Kontext für die Zuordnung, damit ein 12er-Pack nicht einem Einzelstück zugeordnet wird." },
        { name: "Lieferzeit", note: "Bei ähnlichen Preisen oft das entscheidende Kriterium – und in manuellen Vergleichen selten erfasst." },
        { name: "Gültigkeitsdatum und Zahlungsbedingungen", note: "Ein günstigeres Angebot mit schlechteren Bedingungen ist nicht immer günstiger." },
      ],
      gotchas: [
        {
          title: "Derselbe Artikel wird nie zweimal gleich beschrieben",
          body: "Deshalb scheitert der exakte Abgleich, und deshalb bleibt der Vergleich fast überall Handarbeit. Matcher ordnen Zeilen inhaltlich statt per Zeichenkettengleichheit zu, mit einem LLM als Schiedsrichter für mehrdeutige Paare – so passen auch unterschiedlich formulierte Beschreibungen desselben Artikels zusammen.",
        },
        {
          title: "Die Packungsgröße verfälscht einen Vergleich unbemerkt",
          body: "Ein Angebot für einen Karton à 12 gegenüber einem für ein Stück ist kein Preisunterschied, sondern ein Einheitenfehler – und genau dieser Fehler übersteht jede Prüfung, weil beide Zahlen plausibel aussehen. Mit Kontextfeldern beziehen Sie Menge und Mengeneinheit in die Zuordnung ein, sodass ungleiche Artikel unzugeordnet bleiben, statt einen falschen Sieger zu erzeugen.",
        },
        {
          title: "Nicht jede Position hat einen vergleichbaren Preis",
          body: "Angebote enthalten „auf Anfrage“, „inklusive“ und leere Zellen. Statt diese Zeilen stillschweigend zu verwerfen, schließt der Vergleich sie aus der Siegerermittlung aus und vermerkt eine Warnung an der Zeile – so sehen Sie, was nicht verglichen wurde, statt anzunehmen, dass alles verglichen wurde.",
        },
      ],
      pipeline: [
        { label: "Flows", href: "/docs/flows", why: "Ein Flow liest das Angebotslayout jedes Lieferanten in dieselbe Feldstruktur – die Voraussetzung dafür, sie überhaupt vergleichen zu können." },
        { label: "Cleaner", href: "/docs/cleaners", why: "Rechnet Währungen um, damit Angebote in verschiedenen Währungen auf derselben Basis verglichen werden." },
        { label: "Buckets", href: "/docs/buckets", why: "Bewahrt Angebote über die Zeit auf, sodass sich der heutige Preis mit dem vergleichen lässt, was derselbe Lieferant im letzten Quartal angeboten hat." },
      ],
      faqs: [
        { q: "Wie ordnet es Artikel zu, die jeder Lieferant anders beschreibt?", a: "Die Zuordnung ist inhaltlich statt exakt: Artikelbeschreibungen werden nach ihrer Bedeutung verglichen, und ein LLM entscheidet die mehrdeutigen Paare. „M8 hex bolt 50mm“ und „Bolt, hex, M8x50“ finden zusammen, ohne dass Sie eine Synonymliste pflegen." },
        { q: "Kann ich gegen einen Lieferanten benchmarken, statt alle zu vergleichen?", a: "Ja. Der Benchmark-Modus behandelt ein Angebot als Referenz und vergleicht alle anderen damit – die richtige Form, wenn Sie einen Bestandslieferanten haben und den Markt testen." },
        { q: "Was passiert mit Positionen, die sich nicht vergleichen lassen?", a: "Zeilen mit nicht-numerischen Preisen werden aus der Siegerermittlung ausgeschlossen und als Warnungen an der Zeile vermerkt, sodass Lücken im Vergleich sichtbar sind statt verborgen." },
      ],
    },
    {
      slug: "compliance-checks",
      label: "Compliance-Prüfungen",
      badge: "Compliance & Risiko",
      h1: "Compliance-Prüfung von Dokumenten",
      title: "Automatisierte Compliance-Checklisten für Dokumente",
      description:
        "Prüfen Sie einen Dokumentensatz anhand einer verzweigten Checkliste – ist alles vorhanden, stimmig und richtlinienkonform – und erstellen Sie einen Bericht, den Sie Wirtschaftsprüfern vorlegen können.",
      summary: "Ein Dokumentensatz, geprüft anhand einer verzweigten Checkliste, mit nachvollziehbarem Bestanden/Nicht-bestanden-Bericht.",
      lede: "Der Inspector von Tavnit prüft einen Dokumentensatz anhand einer Checkliste, die Sie festlegen. Er ordnet jede hochgeladene Datei ihrem vorgesehenen Platz zu, extrahiert, was die Regeln brauchen, und wertet die Checkliste deterministisch aus – dieselben Nachweise führen also immer zum selben Ergebnis, samt Bericht.",
      problem: [
        "Compliance-Prüfung ist meist ein Mensch mit einer Checkliste und einem Ordner, der bestätigt, dass die richtigen Dokumente vorliegen, die Werte übereinstimmen und nichts abgelaufen ist. Das ist langsam, von Prüfer zu Prüfer uneinheitlich, und der Nachweis, warum etwas bestanden hat, ist das, woran sich diese Person erinnert.",
        "Der typische Fehler ist meist kein fehlendes Dokument. Es ist ein Wert, der zwischen zwei Dokumenten abweicht, die niemand nebeneinandergelegt hat.",
      ],
      fields: [
        { name: "Erwartete Dokumentplätze", note: "Was der Satz enthalten sollte. Ein fehlender Pflichtplatz ist selbst ein Befund, nicht bloß eine Lücke." },
        { name: "Identitäts- und Firmenangaben", note: "Die Werte, die dokumentübergreifend übereinstimmen müssen – Namen, Registernummern, Anschriften." },
        { name: "Datumsangaben und Ablauf", note: "Zertifikate und Lizenzen laufen ab. Ob etwas gültig ist, ist eine Regel, kein Feld." },
        { name: "Beträge und angemeldete Werte", note: "Hier liegen die dokumentübergreifenden Konsistenzprüfungen: Stimmt der Rechnungswert mit der Anmeldung überein?" },
        { name: "Unterschriften und Stempel vorhanden", note: "Vorhandensein statt Inhalt – und eine der häufigeren manuellen Prüfungen." },
        { name: "Ergebnis je Checklistenpunkt", note: "Bestanden, nicht bestanden oder nicht zutreffend, je Regel, mit dem ausschlaggebenden Wert." },
      ],
      gotchas: [
        {
          title: "Die eigentliche Prüfung findet zwischen Dokumenten statt, nicht in einem",
          body: "Jedes Tool kann einen Wert von einem Zertifikat ablesen. Der relevante Befund ist, dass der Wert auf dem Zertifikat von dem auf der Rechnung abweicht. Weil eine Inspektion den ganzen Satz sammelt, bevor sie auswertet, können Checklistenregeln Dokumente miteinander vergleichen statt nur jedes für sich.",
        },
        {
          title: "Checklisten verzweigen sich, und flache Listen verbergen Lücken",
          body: "Ob eine Regel greift, hängt meist von einer früheren Antwort ab – wenn die Waren beschränkt sind, ist eine Lizenz erforderlich. Eine verzweigte Checkliste bildet das direkt ab, sodass eine Inspektion die Lizenz nur dann verlangt, wenn sie tatsächlich nötig ist, statt sie stillschweigend als nicht zutreffend zu markieren.",
        },
        {
          title: "Prüfer fragen, wie Sie entschieden haben, nicht was",
          body: "Die Auswertung ist deterministisch – dieselben Dokumente führen zum selben Ergebnis statt jedes Mal zu einem neuen Urteil –, und das Ergebnis wird in einen Bericht geschrieben. Zusammen mit der Prüfung können Sie zeigen, welche Werte extrahiert wurden, welche Regeln gegriffen haben und wer das Ergebnis freigegeben hat.",
        },
      ],
      pipeline: [
        { label: "Collections", href: "/docs/collections", why: "Gemischte Nachweise, die an einem Ort eintreffen, werden klassifiziert und an den richtigen Flow geleitet, bevor geprüft wird." },
        { label: "Flows", href: "/docs/flows", why: "Jeder Dokumenttyp hat seinen eigenen Flow, sodass eine Regel auf ein benanntes Feld verweisen kann, statt Freitext zu durchsuchen." },
        { label: "Manuelle Prüfung", href: "/docs/human-in-the-loop", why: "Eine prüfende Person zeichnet die Inspektion ab, und der unveränderliche Trail hält fest, wer welchen Befund akzeptiert hat." },
        { label: "Buckets", href: "/docs/buckets", why: "Ergebnisse über die Zeit werden auswertbar – wie viele Sätze an welcher Regel in welchem Monat gescheitert sind." },
      ],
      faqs: [
        { q: "Kann es Werte über verschiedene Dokumente hinweg vergleichen?", a: "Ja – genau darum geht es. Eine Inspektion sammelt den gesamten Dokumentensatz, bevor sie auswertet, sodass Regeln prüfen können, ob ein Wert auf einem Dokument mit einem Wert auf einem anderen übereinstimmt, statt jedes isoliert zu validieren." },
        { q: "Ist das Ergebnis reproduzierbar?", a: "Die Auswertung der Checkliste ist deterministisch. Dieselben Dokumente und dieselbe Checkliste führen zum selben Ergebnis – das macht es belastbar, wenn jemand fragt, warum ein Satz bestanden hat." },
        { q: "Was, wenn ein Pflichtdokument fehlt?", a: "Ein fehlender Pflichtinput ist selbst ein Befund. Die Inspektion meldet ihn, statt mit einer Lücke abzuschließen, und Dateien, die ohne benannten Platz hochgeladen werden, werden automatisch zugeordnet oder als nicht zugeordnet markiert." },
      ],
    },
    {
      slug: "form-filling",
      label: "Formulare ausfüllen",
      badge: "Betrieb & Handel",
      h1: "PDF-Formulare automatisch ausfüllen",
      title: "PDF-Formulare aus extrahierten Dokumentdaten ausfüllen",
      description:
        "Füllen Sie amtliche PDF-Formulare automatisch mit Daten aus mehreren Quelldokumenten aus – mit Freigabe, bevor etwas ausgestellt wird.",
      summary: "Amtliche PDF-Formulare, automatisch ausgefüllt mit Daten aus mehreren Quelldokumenten.",
      lede: "Tavnit füllt ausfüllbare PDF-Formulare mit Daten, die aus mehreren Quelldokumenten gleichzeitig extrahiert wurden. Eine Anmeldung lässt sich in einem Durchgang aus Rechnung, Packliste und Konnossement befüllen, und ein Mensch gibt die Werte frei, bevor das ausgefüllte PDF ausgestellt wird.",
      problem: [
        "Ein überraschend großer Teil der Büroarbeit besteht darin, Werte aus erhaltenen Dokumenten in ein Formular zu übertragen, das jemand anderes verlangt. Zollanmeldungen, Versicherungsformulare, Förderanträge, behördliche Meldungen – die Informationen existieren bereits, verteilt über drei oder vier PDFs, und ein Mensch überträgt sie von Hand.",
        "Gerade hier werden Fehler am wenigsten verziehen. Ein Übertragungsfehler auf einem Formular für eine Behörde ist eine Ablehnung oder eine Strafe, keine interne Korrektur.",
      ],
      fields: [
        { name: "Satz an Quelldokumenten", note: "Ein Platz pro Quell-Flow. Das Formular wird ausgefüllt, sobald jeder Pflichtplatz einen abgeschlossenen Durchlauf hat." },
        { name: "Feldzuordnungen", note: "Welches extrahierte Feld welches PDF-Feld befüllt. Einmal pro Vorlage konfiguriert, jedes Mal wiederverwendet." },
        { name: "Cleaner-Ergebnisse als Quellen", note: "Ein zugeordneter Wert kann aus einem Cleaner statt aus der reinen Extraktion stammen, sodass umgerechnete oder berechnete Werte im Formular landen." },
        { name: "Manuell auszufüllende Felder", note: "Werte, die niemand extrahiert – eine Referenznummer, ein Unterzeichner –, werden bei der Freigabe ergänzt." },
        { name: "Mehrere Vorlagen", note: "Ein Satz Quelldokumente kann im selben Durchgang mehrere verschiedene Formulare ausfüllen." },
      ],
      gotchas: [
        {
          title: "Die Daten sind über Dokumente verteilt, nicht in einem",
          body: "Deshalb lösen generische Dokumententools das Ausfüllen von Formularen nicht: Sie extrahieren immer nur aus einer Datei. Das Ausfüllen nimmt einen Durchlauf pro Quell-Flow und befüllt das Formular aus allen zusammen – so landen Gewichte aus der Packliste und Werte aus der Rechnung im selben Ergebnis.",
        },
        {
          title: "Dokumente kommen in der Reihenfolge, in der sie eben kommen",
          body: "Selten erhalten Sie den kompletten Satz auf einmal. Ein Ausfüllvorgang bleibt offen, sammelt Durchläufe, während Dokumente eintreffen, und wird ausgelöst, sobald jeder Pflichtplatz belegt ist. Dateien, die ohne Angabe ihres Platzes hochgeladen werden, werden automatisch klassifiziert und zugeordnet; nicht Zugeordnetes lässt sich von Hand zuweisen.",
        },
        {
          title: "Manche Felder stehen in keinem Quelldokument",
          body: "Jedes echte Formular hat Werte, die vorher nirgends existieren – eine interne Referenz, der Name des Anmelders, ein Unterschriftsblock. Das sind manuell auszufüllende Felder, die beim Freigabeschritt ergänzt werden – zugleich der natürliche Moment, alles zu korrigieren, was die Extraktion falsch erfasst hat, bevor das PDF ausgestellt wird.",
        },
      ],
      pipeline: [
        { label: "Flows", href: "/docs/flows", why: "Ein Flow pro Quelldokumenttyp; das Formular zieht aus allen gleichzeitig." },
        { label: "Cleaner", href: "/docs/cleaners", why: "Rechnet Werte um und berechnet sie, sodass im Formular bereits die geforderte Einheit bzw. das geforderte Format steht." },
        { label: "Manuelle Prüfung", href: "/docs/human-in-the-loop", why: "Freigabe vor der Ausstellung, mit Korrekturen und manuell ergänzten Feldern im selben Schritt." },
        { label: "E-Mail-Integration", href: "/docs/email-integration", why: "An eine Adresse weitergeleitete Quelldokumente speisen den Ausfüllvorgang, ohne dass jemand die App öffnet." },
      ],
      faqs: [
        { q: "Kann ein Formular aus mehreren Dokumenten ausgefüllt werden?", a: "Ja. Jeder Quelldokumenttyp erhält seinen eigenen Platz, und das Formular wird aus allen zusammen befüllt – bei Anmeldungen und Schadensmeldungen der Normalfall." },
        { q: "Was ist mit Feldern, die in keinem Dokument stehen?", a: "Das sind manuell auszufüllende Felder. Sie werden beim Freigabeschritt zusammen mit etwaigen Korrekturen eingetragen, sodass das finale PDF geprüft ist, bevor es ausgestellt wird." },
        { q: "Kann ein Dokumentensatz mehr als ein Formular ausfüllen?", a: "Ja. Eine Konfiguration kann mehrere Vorlagen enthalten, und jede wird in einem einzigen Durchgang aus denselben Durchläufen ausgefüllt." },
      ],
    },
    {
      slug: "call-analytics",
      label: "Gesprächsanalyse",
      badge: "Vertrieb & Support",
      h1: "Aufgezeichnete Gespräche in Daten verwandeln",
      title: "Gesprächsanalyse — aufgezeichnete Gespräche strukturieren",
      description:
        "Verwandeln Sie Aufzeichnungen aus Vertrieb, Support und Kundenschalter in eine Tabelle – wer was gesagt hat, welche Regeln erfüllt wurden und wie jedes Gespräch ausging.",
      summary: "Aufzeichnungen aus Vertrieb, Support und Kundenschalter als Tabelle von Redebeiträgen, Regeln und Ergebnissen.",
      lede: "Tavnit Signals verwandelt Audioaufnahmen in eine flache Tabelle. Es trennt die Sprecher, teilt eine Aufnahme in ihre einzelnen Gespräche, klassifiziert jedes davon und wertet Ihre Regeln und Extraktionsfelder Redebeitrag für Redebeitrag aus – ein Tag voller Anrufe wird so zu Zeilen, die Sie filtern, statt zu Stunden, die Sie anhören müssen.",
      problem: [
        "In Gesprächen erfährt ein Unternehmen das meiste – und fast nichts davon wird festgehalten. Aufnahmen gibt es, aber sie auszuwerten heißt zuhören, also hört sich eine Führungskraft in der Praxis eine Handvoll an und verallgemeinert daraus.",
        "Wo Qualitätssicherung stattfindet, füllt ein Mensch nach jedem Gespräch einen Bewertungsbogen aus – teuer, von Person zu Person uneinheitlich und nur für einen Bruchteil des Volumens.",
      ],
      fields: [
        { name: "Art der Interaktion", note: "Eine Aufnahme enthält oft mehrere Gespräche. Jedes wird klassifiziert – Verkauf, Support, Rückgabe – oder als Sonstiges markiert." },
        { name: "Sprecherrolle", note: "Redebeiträge werden erwarteten Teilnehmern wie Verkäufer oder Kunde zugeordnet; unerwartete Stimmen werden als Sonstige markiert." },
        { name: "Regeln je Redebeitrag", note: "Ja/Nein-Prüfungen für jeden Redebeitrag – wurde die Aktion erwähnt, wurde der Hinweis vorgelesen." },
        { name: "Extraktionsfelder", note: "Daten aus jedem Redebeitrag, etwa erwähnte Produkte oder vorgebrachte Einwände." },
        { name: "Inhaltskategorien", note: "Jeder Redebeitrag wird eingeordnet – Einwand, Frage, Problem, Lösung, Dank –, sodass Muster zählbar werden." },
        { name: "Gesprächsergebnis", note: "Einmal über das ganze Gespräch beurteilt: Wurde der Verkauf abgeschlossen, wurde das Problem gelöst?" },
      ],
      gotchas: [
        {
          title: "Eine Aufnahme ist nicht ein Gespräch",
          body: "Die Schichtaufnahme eines Kundenschalters oder einer Support-Hotline enthält viele einzelne Gespräche. Wer die Datei als ein Gespräch behandelt, erhält Durchschnittswerte, die nichts beschreiben. Aufnahmen werden zuerst in einzelne Interaktionen geteilt, die jeweils für sich klassifiziert und ausgewertet werden – das Audio-Gegenstück zum Aufteilen eines PDFs mit mehreren Dokumenten.",
        },
        {
          title: "Fragen je Redebeitrag und je Gespräch sind verschiedene Fragen",
          body: "„Wurde der Rabatt erwähnt?“ wird für jeden Redebeitrag gestellt und kann mehrmals zutreffen. „Wurde der Verkauf abgeschlossen?“ wird einmal für das ganze Gespräch gestellt. Wer beides vermischt, erhält eine Kennzahl, die Erwähnungen zählt, wo Ergebnisse gemeint waren. Deshalb werden beide getrennt ausgewertet, und die Antwort auf Gesprächsebene wiederholt sich in allen Zeilen dieser Interaktion.",
        },
        {
          title: "Für Aufnahmen von Menschen gelten Regeln",
          body: "Einwilligungs- und Aufbewahrungspflichten für Gesprächsaufzeichnungen unterscheiden sich je nach Rechtsordnung und sind strenger als bei Dokumenten. Das ist Ihre Pflicht und nichts, was die Pipeline entscheidet – aber mit Sichtbarkeit und Zugriffsrechten pro Bucket bleiben Transkripte und Ergebnisse auf die Personen beschränkt, die sie brauchen.",
        },
      ],
      pipeline: [
        { label: "Buckets", href: "/docs/buckets", why: "Fertige Aufnahmen werden automatisch in einen Bucket exportiert, sodass sich Gespräche zu etwas summieren, das Sie abfragen und visualisieren können." },
        { label: "Webhooks", href: "/docs/webhooks", why: "Schickt die Ergebnistabelle an Ihre eigenen Systeme, sobald eine Aufnahme fertig verarbeitet ist." },
        { label: "Benutzerrollen", href: "/docs/user-roles", why: "Gesprächsdaten sind sensibel; Rollen und Rechte pro Bucket beschränken sie auf die Personen, die das Programm betreuen." },
      ],
      faqs: [
        { q: "Welche Audioformate werden unterstützt?", a: "Aufnahmen in MP3, WAV und FLAC lassen sich hochladen und verarbeiten." },
        { q: "Kommt es mit einer Aufnahme voller einzelner Gespräche zurecht?", a: "Ja. Eine Aufnahme wird zuerst in ihre einzelnen Interaktionen geteilt, und jede wird separat klassifiziert und ausgewertet – eine ganze Schicht am Schalter liefert also Ergebnisse je Gespräch statt eines vermischten Durchschnitts." },
        { q: "Kann ich jedes Gespräch bewerten statt nur einer Stichprobe?", a: "Ja. Regeln werden auf jeden Redebeitrag jeder verarbeiteten Aufnahme angewendet – der praktische Unterschied zur manuellen Qualitätssicherung: vollständige Abdeckung statt Stichprobe." },
      ],
    },
    {
      slug: "delivery-notes",
      label: "Lieferscheine",
      badge: "Logistik & Lager",
      h1: "Lieferscheine und Abliefernachweise erfassen",
      title: "Lieferscheine extrahieren und Wareneingang prüfen",
      description:
        "Erfassen Sie aus unterschriebenen Lieferscheinen und Abliefernachweisen, was tatsächlich geliefert wurde – einschließlich handschriftlicher Vermerke – und gleichen Sie es mit der Bestellung ab.",
      summary: "Was tatsächlich geliefert wurde, erfasst aus unterschriebenen Lieferscheinen und Abliefernachweisen – Handschrift inklusive.",
      lede: "Tavnit liest Lieferscheine und Abliefernachweise, einschließlich der handschriftlichen Vermerke von Fahrern und Empfängern, und liefert die gelieferten Mengen als strukturierte Zeilen. Weil Bestellungen in dieselbe Struktur extrahiert werden, wird der Abgleich von Geliefertem und Bestelltem zur Abfrage.",
      problem: [
        "Der Lieferschein ist der einzige Nachweis dessen, was physisch angekommen ist – und meist das Dokument mit der schlechtesten Qualität in der ganzen Kette: auf dem Hof fotografiert, über den Druck unterschrieben, von Hand ergänzt, wo Mengen abwichen.",
        "Zugleich ist es das Dokument, das bei Streitigkeiten am meisten zählt. Steht auf der Rechnung zwölf und auf dem Lieferschein zehn, ist der Lieferschein der Beweis – vorausgesetzt, jemand hat erfasst, was darauf steht.",
      ],
      fields: [
        { name: "Lieferschein- und Bestellnummer", note: "Die Schlüssel, die die Lieferung mit der Bestellung verbinden." },
        { name: "Gelieferte Menge je Position", note: "Die Zahl, auf die es wirklich ankommt – und die am häufigsten von Hand geändert wird." },
        { name: "Handschriftliche Änderungen", note: "Durchgestrichene Mengen und Randnotizen enthalten die echte Zahl. Wer sie ignoriert, erfasst die falsche." },
        { name: "Name des Empfängers und Unterschrift vorhanden", note: "Eine vorhandene Unterschrift ist häufig das Abnahmekriterium." },
        { name: "Lieferdatum und -uhrzeit", note: "Bestimmt die SLA-Messung und Fristen bei Streitigkeiten." },
        { name: "Zustands- oder Schadensvermerke", note: "Freitext, meist handschriftlich, und die Grundlage jeder Reklamation." },
      ],
      gotchas: [
        {
          title: "Die Handschrift ist das Wichtige",
          body: "Ein gedruckter Lieferschein sagt, was ankommen sollte. Die handschriftliche Änderung sagt, was tatsächlich ankam. Die Extraktion liest Handschrift ebenso wie Druck – das ist der Unterschied zwischen der Sendung wie geplant und der Sendung wie geliefert.",
        },
        {
          title: "Auf dem Hof fotografiert, nicht im Büro gescannt",
          body: "Abliefernachweise kommen als schräge Handyfotos bei schlechtem Licht, manchmal mit einem Daumen im Bild. Die Extraktion kommt mit dem meisten zurecht, aber bei diesem Dokumenttyp lohnt es sich, unsichere Ergebnisse an einen Menschen zu leiten, statt jeder Erfassung zu vertrauen.",
        },
        {
          title: "Der Wert liegt im Vergleich, nicht in der Erfassung",
          body: "Eine gelieferte Menge allein sagt wenig. Werden Lieferscheine in dieselbe Feldstruktur extrahiert wie Ihre Bestellungen, wird der 3-Wege-Abgleich zur Abfrage über die Bestellnummer statt zu drei Dokumenten, die man gegen das Licht hält.",
        },
      ],
      pipeline: [
        { label: "E-Mail-Integration", href: "/docs/email-integration", why: "Fahrer und Spediteure schicken fotografierte Abliefernachweise per E-Mail; durch Weiterleitung wird jeder beim Eintreffen verarbeitet." },
        { label: "Flows", href: "/docs/flows", why: "Gelieferte Positionen sind Tabellenfelder – in derselben Struktur wie bei Bestellungen." },
        { label: "Buckets", href: "/docs/buckets", why: "Hält Lieferungen und Bestellungen an einem Ort, sodass Abweichungen per Abfrage auffallen statt erst bei einer Prüfung." },
        { label: "Manuelle Prüfung", href: "/docs/human-in-the-loop", why: "Prüft schlechte Erfassungen und geänderte Mengen – dort, wo ein Fehler einen Streitfall kostet." },
      ],
      faqs: [
        { q: "Kann es handschriftliche Änderungen lesen?", a: "Ja. Handschrift wird zusammen mit gedrucktem Text extrahiert – hier besonders wichtig, weil die handschriftliche Menge meist die richtige ist." },
        { q: "Funktioniert es mit Handyfotos?", a: "In der Regel ja. Fotos, schräge Winkel und schlechtes Licht sind bei Abliefernachweisen normal. Es lohnt sich, die bedingte Prüfung zu aktivieren, damit Grenzfälle bei einem Menschen landen, statt unbemerkt durchzulaufen." },
        { q: "Lassen sich Lieferungen mit Bestellungen abgleichen?", a: "Extrahieren Sie beide in dieselbe Feldstruktur, und der Vergleich ist eine Abfrage über die Bestellnummer in Ihrem Bucket statt eines manuellen Abgleichs von Dokument zu Dokument." },
      ],
    },
    {
      slug: "insurance-claims",
      label: "Versicherungsfälle",
      badge: "Versicherung & Schaden",
      h1: "Dokumente zu Versicherungsfällen verarbeiten",
      title: "Datenextraktion aus Schadensunterlagen",
      description:
        "Verarbeiten Sie Schadensmeldungen und ihre Nachweise gemeinsam – Kostenvoranschläge, Rechnungen, Berichte und Fotos – zu einem strukturierten, prüfbaren Datensatz.",
      summary: "Schadensmeldungen und Nachweise gemeinsam verarbeitet zu einem strukturierten, prüfbaren Datensatz.",
      lede: "Tavnit verarbeitet einen Schadensfall und seine Nachweise als einen Satz: Schadensmeldung, Kostenvoranschläge, Rechnungen und Berichte. Jeder Dokumenttyp wird an seinen eigenen Flow geleitet, und die Ergebnisse ergeben einen einzigen Datensatz, den Sachbearbeiter bewerten können, statt einen Ordner, den sie lesen müssen.",
      problem: [
        "Ein Schadensfall ist nie ein einzelnes Dokument. Er besteht aus einem Formular plus allem, was die anspruchstellende Person schickt – Kostenvoranschläge, Quittungen, ein Polizeibericht, Fotos –, eintreffend über Tage, ungeordnet, per E-Mail.",
        "Sachbearbeiter verbringen die meiste Zeit mit Zusammentragen statt mit Bewerten: Anhänge öffnen, Beträge suchen, prüfen, ob der geforderte Betrag dem auf dem Kostenvoranschlag entspricht.",
      ],
      fields: [
        { name: "Schaden- und Versicherungsscheinnummer", note: "Die Schlüssel, über die alles im Satz verknüpft wird – und oft das Einzige, was über alle Dokumente hinweg gleich ist." },
        { name: "Anspruchsteller und Schadenhergang", note: "Datum, Ort und Beschreibung des Schadens, meist verteilt auf Formular und Schilderung." },
        { name: "Geforderter Betrag", note: "Was im Formular steht. Lohnt sich getrennt von dem zu erfassen, was die Nachweise belegen." },
        { name: "Belegte Beträge", note: "Summen aus Kostenvoranschlägen und Rechnungen – die Zahlen, mit denen der geforderte Betrag übereinstimmen sollte." },
        { name: "Angaben zu Dritten", note: "Andere Beteiligte, Versicherer und Aktenzeichen, die für den Regress gebraucht werden." },
        { name: "Dokumenttyp je Anhang", note: "Zu wissen, was jede Datei ist, bestimmt, welcher Flow sie liest." },
      ],
      gotchas: [
        {
          title: "Nachweise kommen spät und ungeordnet",
          body: "Die Bewertung kann erst beginnen, wenn der Satz vollständig ist, und er wird über Tage vollständig. Collections klassifizieren jeden Anhang beim Eintreffen, sodass der Datensatz schrittweise wächst, statt dass jemand bei jedem neuen Dokument den ganzen Ordner erneut liest.",
        },
        {
          title: "Geforderter und belegter Betrag sind verschiedene Felder",
          body: "Wer nur eine Zahl pro Schadensfall extrahiert, verliert die entscheidende Prüfung. Erfassen Sie, was gefordert wurde und worauf sich Kostenvoranschläge und Rechnungen tatsächlich summieren – dann wird die Abweichung zu einem Wert, nach dem Sie filtern können, statt zu etwas, das Sachbearbeitern auffallen muss.",
        },
        {
          title: "Schadensakten sind persönlich – und oft medizinisch",
          body: "Schadensfälle enthalten regelmäßig Gesundheitsdaten, Ausweisdokumente und Finanzangaben. Private Buckets mit Zugriffsrechten pro Person halten einen Fall für die zuständigen Sachbearbeiter sichtbar statt für die ganze Organisation.",
        },
      ],
      pipeline: [
        { label: "Collections", href: "/docs/collections", why: "Klassifiziert jeden Anhang – Formular, Kostenvoranschlag, Rechnung, Bericht – und leitet ihn an den dafür gebauten Flow." },
        { label: "E-Mail-Integration", href: "/docs/email-integration", why: "Schadensfälle kommen per E-Mail; die Weiterleitung an eine Collection-Adresse verarbeitet jeden Anhang beim Eintreffen." },
        { label: "Cleaner", href: "/docs/cleaners", why: "Vereinheitlicht Datumsangaben und Währungen und berechnet die Differenz zwischen gefordertem und belegtem Betrag." },
        { label: "Manuelle Prüfung", href: "/docs/human-in-the-loop", why: "Sachbearbeiter genehmigen oder lehnen ab, mit dauerhaftem Protokoll der Entscheidung und wer sie getroffen hat." },
      ],
      faqs: [
        { q: "Kommt es mit einem Schadensfall mit vielen verschiedenen Anhängen zurecht?", a: "Ja. Eine Collection klassifiziert jeden Anhang und leitet ihn an den richtigen Flow, sodass Schadensmeldung, Kostenvoranschlag und Rechnung jeweils von dem Flow gelesen werden, der für diesen Dokumenttyp gebaut ist." },
        { q: "Kann es Fälle markieren, bei denen die Zahlen nicht übereinstimmen?", a: "Extrahieren Sie den geforderten Betrag und die belegten Summen als getrennte Felder und berechnen Sie die Differenz mit einem Cleaner. Fälle, die die Prüfung nicht bestehen, können automatisch zur Prüfung geleitet werden." },
        { q: "Wie werden sensible Schadensdaten geschützt?", a: "Buckets können privat statt organisationsweit sichtbar sein, mit Viewer- oder Editor-Rechten pro Person, sodass ein Fall nur für die zuständigen Sachbearbeiter sichtbar ist." },
      ],
    },
    {
      slug: "identity-verification",
      label: "Identität & Onboarding",
      badge: "KYC & Onboarding",
      h1: "Identitäts- und Onboarding-Dokumente erfassen",
      title: "KYC-Dokumentenextraktion für das Kunden-Onboarding",
      description:
        "Erfassen Sie Ausweis- und Adressnachweise beim Onboarding, prüfen Sie, ob die Angaben übereinstimmen, und bewahren Sie einen nachvollziehbaren Nachweis der Entscheidung auf.",
      summary: "Ausweis- und Adressdokumente erfasst, auf Konsistenz geprüft und nachvollziehbar protokolliert.",
      lede: "Tavnit liest die beim Onboarding gesammelten Dokumente – Ausweise, Adressnachweise, Gründungsunterlagen – und liefert Namen, Nummern, Datumsangaben und Anschriften als strukturierte Felder. Weil der ganze Satz gemeinsam verarbeitet wird, ist die Übereinstimmung der Angaben eine Prüfung statt einer Annahme.",
      problem: [
        "Einen Kunden aufzunehmen heißt, Dokumente zu sammeln, sie zu lesen und zu bestätigen, dass sie dieselbe Person oder Gesellschaft beschreiben. Das Lesen ist mühsam; das Bestätigen ist der riskante Teil – und es geschieht per Augenmaß.",
        "Das Volumen verschärft das Problem. Ein Team, das laufend Kunden aufnimmt, hat am Ende uneinheitliche Maßstäbe zwischen den Prüfenden und keinen verlässlichen Nachweis, was wann geprüft wurde.",
      ],
      fields: [
        { name: "Vollständiger Name wie gedruckt", note: "Wörtlich extrahieren. Reihenfolge und Transliteration unterscheiden sich zwischen Dokumenten – und genau dieser Unterschied ist die Prüfung." },
        { name: "Geburtsdatum", note: "Das nützlichste Einzelfeld für die dokumentübergreifende Konsistenz." },
        { name: "Dokumentnummer und -art", note: "Reisepass, Personalausweis, Führerschein – jeweils mit eigener Nummernlogik." },
        { name: "Ausstellungs- und Ablaufdatum", note: "Der Ablauf ist eine Regel, kein Feld: Ein abgelaufenes Dokument ist ein Befund." },
        { name: "Anschrift", note: "Aus Adressnachweisen, die mit den Angaben des Kunden übereinstimmen müssen." },
        { name: "Registerangaben der Gesellschaft", note: "Für das Firmen-Onboarding – Registernummer, eingetragener Sitz, Geschäftsführung." },
      ],
      gotchas: [
        {
          title: "Namen stimmen nicht überein – und das ist normal",
          body: "Dieselbe Person erscheint in drei Dokumenten als „Jose Garcia Lopez“, „J. García“ und „GARCIA LOPEZ, JOSE“. Extrahieren Sie Namen wörtlich, statt sie schon bei der Extraktion zu vereinheitlichen, und vergleichen Sie dann bewusst – zu frühe Vereinheitlichung wirft genau den Unterschied weg, den Sie bewerten müssen.",
        },
        {
          title: "Fotografierte Ausweise sind die Regel, und die Qualität schwankt",
          body: "Kunden fotografieren Dokumente mit dem Handy, und ebenso oft liegt eine Spiegelung über der maschinenlesbaren Zone. Angesichts der Kosten eines Fehlers ist eine Prüfung beim Onboarding angemessen, und der Audit-Trail hält dann fest, wer welches Dokument akzeptiert hat.",
        },
        {
          title: "Das sind die am stärksten regulierten Daten, die Sie verarbeiten",
          body: "Für Ausweisdokumente gelten Aufbewahrungsfristen, Löschrechte und Zugriffspflichten, die gewöhnliche Geschäftsdokumente nicht haben. Private Buckets und Rechte pro Person halten Onboarding-Unterlagen beim Compliance-Team, und der unveränderliche Trail belegt, wer worauf zugegriffen hat.",
        },
      ],
      pipeline: [
        { label: "Collections", href: "/docs/collections", why: "Klassifiziert, was der Kunde geschickt hat – Reisepass, Versorgerrechnung, Gründungsurkunde – und leitet jedes Dokument an den richtigen Flow." },
        { label: "Flows", href: "/docs/flows", why: "Ein Flow pro Dokumenttyp, sodass eine Prüfung auf ein benanntes Feld verweisen kann, statt Text zu durchsuchen." },
        { label: "Manuelle Prüfung", href: "/docs/human-in-the-loop", why: "Abzeichnung jedes Onboardings, mit dauerhaftem Protokoll, wer welches Dokument freigegeben hat." },
        { label: "Benutzerrollen", href: "/docs/user-roles", why: "Beschränkt Ausweisdokumente auf das Team, das sie braucht, statt auf die ganze Organisation." },
      ],
      faqs: [
        { q: "Prüft es, ob ein Dokument echt ist?", a: "Nein. Tavnit extrahiert und strukturiert, was in den Dokumenten steht, und ermöglicht Konsistenzprüfungen über einen Satz hinweg. Die Echtheitsprüfung bei den ausstellenden Behörden ist eine eigene Disziplin, die dadurch nicht ersetzt wird." },
        { q: "Kann es prüfen, ob die Angaben über Dokumente hinweg übereinstimmen?", a: "Ja. Verarbeiten Sie den Satz gemeinsam und vergleichen Sie die extrahierten Felder – Name, Geburtsdatum, Anschrift –, sodass eine Abweichung als Wert sichtbar wird, statt dass sie jemand entdecken muss." },
        { q: "Wie bleibt der Zugriff auf Identitätsdaten beschränkt?", a: "Private Buckets mit Zugriffsrechten pro Person beschränken die Sichtbarkeit auf das Compliance-Team, und der unveränderliche Audit-Trail hält jede Ansicht, Änderung und Freigabe fest." },
      ],
    },
    {
      slug: "lease-agreements",
      label: "Miet- & Immobilienverträge",
      badge: "Immobilien & Facility Management",
      h1: "Datenextraktion aus Mietverträgen",
      title: "Mietvertragsauswertung — Miete, Laufzeiten und Kündigungsoptionen",
      description:
        "Werten Sie Mietverträge zu strukturierten Datensätzen aus – Miete, Anpassungstermine, Sonderkündigungsrechte, Nebenkosten und Instandhaltungspflichten – für den gesamten Bestand.",
      summary: "Mietverträge als strukturierte Datensätze: Miete, Anpassungen, Kündigungstermine und Pflichten.",
      lede: "Tavnit wertet Mietverträge zu strukturierten Datensätzen aus: Parteien, Mietgegenstand, Laufzeit, Miete und Anpassungstermine, Sonderkündigungsrechte, Nebenkostenumlage und Instandhaltungspflichten. Aus einem Bestand an PDFs wird eine Tabelle, in der die nächste Mietanpassung ein Filter ist statt einer Leseübung.",
      problem: [
        "Die Auswertung von Mietverträgen ist gerade deshalb eine etablierte Handarbeit, weil die Antworten in Vertragsformulierungen vergraben sind statt in Feldern zu stehen. Unternehmen bezahlen dafür, immer wieder, und die resultierende Tabelle ist veraltet, sobald ein Vertrag geändert wird.",
        "Die Kosten, sie nicht zu haben, sind konkret und hoch: ein verpasster Kündigungstermin, eine nicht ausgeübte Option, eine Mietanpassung, die ohne Widerspruch durchging.",
      ],
      fields: [
        { name: "Vermieter, Mieter und Bürge", note: "Juristische Personen statt Handelsnamen, und häufig durch spätere Nachträge geändert." },
        { name: "Mietgegenstand", note: "In Prosa und per Planverweis beschrieben, selten als saubere Adresse." },
        { name: "Laufzeit, Beginn und Ende", note: "Das Rückgrat aller anderen Daten im Dokument." },
        { name: "Miete und Anpassungstermine", note: "Die Anpassungsgrundlage – Marktmiete, Index, Staffel – zählt so viel wie der Betrag." },
        { name: "Sonderkündigungsrechte und Bedingungen", note: "Ein Kündigungsrecht mit unerfüllten Bedingungen ist kein Kündigungsrecht. Beides extrahieren." },
        { name: "Nebenkosten und Instandhaltungspflichten", note: "Wo die Haftung tatsächlich liegt – meist die längsten Klauseln im Dokument." },
      ],
      gotchas: [
        {
          title: "Termine werden definiert, nicht genannt",
          body: "Ein Mietvertrag nennt den Kündigungstermin selten direkt. Er sagt, der Mieter könne zum fünften Jahrestag des Mietbeginns mit sechs Monaten Frist kündigen. Extrahieren Sie Mietbeginn, Jahrestag und Kündigungsfrist als Felder und lassen Sie einen Formel-Cleaner die tatsächliche Frist berechnen – das ist das Datum, das Sie brauchten.",
        },
        {
          title: "Das maßgebliche Dokument ist oft nicht der Mietvertrag",
          body: "Nachträge, Umbaugenehmigungen und Nebenabreden ändern die Lage, und der ursprüngliche Vertrag liest sich, als gäbe es sie nicht. Verarbeiten Sie jedes Dokument als eigenen Durchlauf mit erfasstem Datum, sodass sich der aktuelle Stand aus dem gesamten Satz ergibt statt aus dem PDF, das gerade jemand geöffnet hat.",
        },
        {
          title: "Ein bedingtes Recht, als unbedingt gelesen, ist ein Risiko",
          body: "Sonderkündigungsrechte sind regelmäßig an Bedingungen geknüpft, etwa geräumte Übergabe oder vollständig gezahlte Miete. Wer das Recht ohne die Bedingungen erfasst, erhält eine Bestandstabelle, die selbstsicher falsch ist – schlimmer als gar keine Tabelle. Extrahieren Sie die Bedingungen als eigenes Feld und prüfen Sie sie.",
        },
      ],
      pipeline: [
        { label: "Flows", href: "/docs/flows", why: "Extraktionshinweise sind hier unverzichtbar – das Modell muss wissen, was eine Kündigungsbedingung ist, nicht nur, wo es suchen soll." },
        { label: "Cleaner", href: "/docs/cleaners", why: "Berechnet Anpassungs- und Kündigungsfristen aus Mietbeginn und Kündigungsfrist." },
        { label: "Buckets", href: "/docs/buckets", why: "Der Bestand als Tabelle: welche Verträge nächstes Jahr kündbar sind, sortiert nach Kündigungsfrist." },
        { label: "Manuelle Prüfung", href: "/docs/human-in-the-loop", why: "Prüfen Sie jede Auswertung. Ein falsches Datum kostet hier Jahresmieten." },
      ],
      faqs: [
        { q: "Kann es Kündigungs- und Anpassungstermine berechnen?", a: "Ja. Extrahieren Sie Mietbeginn, den Jahrestag, an den das Recht anknüpft, und die Kündigungsfrist; ein Formel-Cleaner leitet daraus die tatsächliche Frist ab – meist genau das, was Sie wollten, statt der Klausel selbst." },
        { q: "Was ist mit Nachträgen?", a: "Verarbeiten Sie jedes Dokument als eigenen Durchlauf und erfassen Sie sein Datum als Feld. Der aktuelle Stand ergibt sich dann aus einer Abfrage des gesamten Satzes, statt anzunehmen, dass die neueste Datei maßgeblich ist." },
        { q: "Erfasst es die Bedingungen eines Sonderkündigungsrechts?", a: "Das sollte es, und diese Seite sagt: Es muss – ein Kündigungsrecht ohne seine Bedingungen ergibt eine Bestandstabelle, die sicher wirkt und es nicht ist. Extrahieren Sie die Bedingungen als eigenes Feld und prüfen Sie sie." },
      ],
    },
    {
      slug: "timesheets",
      label: "Stundenzettel",
      badge: "Lohn & Personal",
      h1: "Stundenzettel und Schichtnachweise erfassen",
      title: "Datenextraktion aus Stundenzetteln für die Lohnabrechnung",
      description:
        "Erfassen Sie Stunden aus eingereichten Stundenzetteln – gedruckt, handschriftlich oder fotografiert – und prüfen Sie sie anhand von Regeln, bevor sie in die Lohnabrechnung gehen.",
      summary: "Stunden aus gedruckten, handschriftlichen und fotografierten Stundenzetteln erfasst und vor der Lohnabrechnung geprüft.",
      lede: "Tavnit liest eingereichte Stundenzettel, auch handschriftliche und fotografierte, und liefert Mitarbeitende, Datum, Stunden und Kostenstelle als Zeilen. Regeln können die Summen prüfen, bevor etwas in die Lohnabrechnung gelangt – so werden Fehler, die später zu Lohnkorrekturen führen, abgefangen, solange sie noch billig sind.",
      problem: [
        "Die Lohnabrechnung läuft gegen eine Frist, und Stundenzettel kommen in der Form, die jeder Standort oder jede Agentur nutzt – ausgedruckte Tabellen, ein Papierbogen, am Schichtende fotografiert, ein PDF aus dem System eines Subunternehmers.",
        "Jemand tippt sie unter Zeitdruck ab – genau unter den Bedingungen, unter denen Übertragungsfehler passieren. Eine falsche Zahl, die nach dem Abrechnungslauf entdeckt wird, bedeutet eine Korrektur, eine Nachberechnung und ein unangenehmes Gespräch.",
      ],
      fields: [
        { name: "Name oder Personalnummer", note: "Namen auf Stundenzetteln stimmen selten exakt mit den Lohndaten überein – ein Lookup-Cleaner ordnet sie zu." },
        { name: "Datum oder Wochenende", note: "Bestimmt, zu welcher Abrechnungsperiode die Stunden gehören, und wird an Periodengrenzen leicht falsch gelesen." },
        { name: "Beginn, Ende und Pausen", note: "Wer die Bestandteile statt nur der Summe extrahiert, kann die Summe überprüfen." },
        { name: "Gesamtstunden", note: "Lohnt sich wie eingereicht zu extrahieren und mit der berechneten Summe zu vergleichen." },
        { name: "Überstunden und Zuschlagsstunden", note: "Unterschiedliche Sätze – eine falsche Einordnung ist ein Lohnfehler, kein Rundungsfehler." },
        { name: "Kostenstelle oder Projekt", note: "Steuert die Projektkostenrechnung und ist das Feld, das am häufigsten leer bleibt." },
      ],
      gotchas: [
        {
          title: "Angegebene und tatsächliche Summe weichen öfter ab, als man denkt",
          body: "Menschen addieren ihre eigenen Stunden und verrechnen sich. Werden Beginn, Ende und Pausen zusätzlich zur angegebenen Summe extrahiert, kann ein Formel-Cleaner die Stunden berechnen und vergleichen – die gefundenen Abweichungen sind meist echte Rechenfehler statt Extraktionsfehler.",
        },
        {
          title: "Handschriftliche Stundenzettel sind der schwierige Fall – und häufig",
          body: "Baustellen- und Schichtarbeit läuft immer noch über Papier, das am Ende des Tages fotografiert wird. Handschrift wird extrahiert, aber die Sicherheit schwankt; hier ist es besser, unsichere Erfassungen zur Prüfung zu leiten, als das Problem erst auf einer Lohnabrechnung zu entdecken.",
        },
        {
          title: "Namen auf Stundenzetteln sind nicht die Namen in der Lohnabrechnung",
          body: "„Dave S.“, „David Smith“ und eine Personalnummer meinen dieselbe Person, und die Lohnabrechnung braucht die Nummer. Ein Lookup-Cleaner gleicht eingereichte Namen während der Verarbeitung mit Ihrer Mitarbeiterliste ab, sodass nicht zuordenbare Einträge markiert statt geraten werden.",
        },
      ],
      pipeline: [
        { label: "E-Mail-Integration", href: "/docs/email-integration", why: "Standorte und Agenturen schicken die Bögen am Wochenende per E-Mail; durch Weiterleitung werden sie beim Eintreffen verarbeitet." },
        { label: "Splitter", href: "/docs/splitters", why: "Aus einem PDF mit den Bögen einer ganzen Kolonne wird ein Durchlauf pro Person." },
        { label: "Cleaner", href: "/docs/cleaners", why: "Berechnet Stunden aus Uhrzeiten, ordnet Namen den Lohndaten zu und markiert Summen, die nicht aufgehen." },
        { label: "Manuelle Prüfung", href: "/docs/human-in-the-loop", why: "Nur die Bögen, die eine Prüfung nicht bestehen, landen bei einem Menschen – das macht es bei einer Lohnfrist überhaupt machbar." },
      ],
      faqs: [
        { q: "Kann es handschriftliche Stundenzettel lesen?", a: "Ja. Handschrift wird zusammen mit gedrucktem Text extrahiert, wobei die Sicherheit von der Lesbarkeit abhängt – deshalb lohnt es sich hier, unsichere Bögen zur Prüfung zu leiten." },
        { q: "Kann es prüfen, ob die Stunden aufgehen?", a: "Ja. Extrahieren Sie Beginn, Ende und Pausen zusätzlich zur angegebenen Summe; ein Formel-Cleaner berechnet die Stunden und markiert jeden Bogen, bei dem beides abweicht." },
        { q: "Was, wenn Namen nicht mit unserem Lohnsystem übereinstimmen?", a: "Ein Lookup-Cleaner gleicht eingereichte Namen während der Verarbeitung mit Ihrer Mitarbeiterliste ab. Einträge, die er nicht zuordnen kann, werden markiert statt geraten, sodass nichts ohne Zuordnung in die Lohnabrechnung gelangt." },
      ],
    },
    {
      slug: "utility-bills",
      label: "Versorgerrechnungen",
      badge: "Facility Management & ESG",
      h1: "Daten aus Versorgerrechnungen und Zählerständen extrahieren",
      title: "Versorgerrechnungen extrahieren für Kosten und Emissionen",
      description:
        "Extrahieren Sie Verbrauch, Tarife und Zählerstände aus Versorgerrechnungen eines ganzen Immobilienbestands – für Kostenkontrolle und Emissionsberichterstattung.",
      summary: "Verbrauch, Tarife und Zählerstände aus dem gesamten Bestand, für Kosten- und Emissionsberichte.",
      lede: "Tavnit liest Strom-, Gas-, Wasser- und Abfallrechnungen und liefert Verbrauch, Tarif, Zählerstände und Kosten je Standort. Aus den Rechnungen eines Bestands wird eine Tabelle, deren Entwicklung Sie verfolgen können – genau das, was Kostenkontrolle und Emissionsberichterstattung tatsächlich brauchen.",
      problem: [
        "Wer mehr als eine Handvoll Standorte verwaltet, erhält Rechnungen von mehreren Versorgern in mehreren Formaten, und das Einzige, was zuverlässig mit ihnen passiert, ist die Bezahlung. Die Verbrauchsdaten – der Teil mit analytischem Wert – bleiben im PDF.",
        "Die Emissionsberichterstattung hat das dringlich gemacht. Scope-1- und Scope-2-Berichte brauchen den Verbrauch in kWh je Standort und Zeitraum, und in den meisten Organisationen existieren diese Daten nur als Stapel von Rechnungen, die niemand abgetippt hat.",
      ],
      fields: [
        { name: "Lieferadresse und Zählernummer (MPAN/MPRN)", note: "Die Kennung, die eine Rechnung einem Standort zuordnet. Adressen allein sind versorgerübergreifend unzuverlässig." },
        { name: "Abrechnungszeitraum", note: "Rechnungen decken sich selten mit Kalendermonaten – wichtig, wenn Sie nach Quartalen aggregieren." },
        { name: "Verbrauch mit Einheit", note: "kWh, m³ oder Liter. Die Einheit ist so wichtig wie die Zahl und wird nicht immer gleich angegeben." },
        { name: "Zählerstände und Schätzkennzeichen", note: "Ein geschätzter Stand ist keine Messung, und wer ihn wie eine behandelt, verfälscht die Entwicklung." },
        { name: "Tarif und Grundpreis", note: "Trennt eine Preisänderung von einer Verbrauchsänderung." },
        { name: "Gesamtkosten und Steuern", note: "Für den Kostenabgleich mit dem tatsächlich Bezahlten." },
      ],
      gotchas: [
        {
          title: "Geschätzte Zählerstände sind keine Daten",
          body: "Versorger schätzen, wenn sie einen Zähler nicht ablesen können, und korrigieren bei der nächsten echten Ablesung. Eine Entwicklung, die beides nicht unterscheidet, zeigt einen Ausschlag, den es nie gab, gefolgt von einem Einbruch, den es nie gab. Extrahieren Sie das Schätzkennzeichen als eigenes Feld, damit Schätzungen ausgeschlossen oder gesondert behandelt werden können.",
        },
        {
          title: "Abrechnungszeiträume passen zu nichts",
          body: "Ein Versorger rechnet monatlich ab, ein anderer alle 28 Tage, ein dritter quartalsweise – und keiner passt zu Ihren Berichtszeiträumen. Extrahieren Sie Beginn und Ende des Zeitraums statt eines einzelnen Datums, damit sich der Verbrauch auf die Zeiträume aufteilen lässt, über die Sie tatsächlich berichten.",
        },
        {
          title: "Einheiten unterscheiden sich, und Gas ist die Falle",
          body: "Gas wird häufig in Kubikmetern abgerechnet und in kWh berichtet, und die Umrechnung hängt von einem Brennwert ab, der auf der Rechnung steht. Extrahieren Sie Einheit und Umrechnungsfaktor, statt sie anzunehmen, und überlassen Sie die Umrechnung einem Einheiten-Cleaner – mit einem angenommenen Standardfaktor gehen die meisten Emissionszahlen unbemerkt schief.",
        },
      ],
      pipeline: [
        { label: "Collections", href: "/docs/collections", why: "Rechnungen verschiedener Sparten und Versorger kommen gemeinsam an und werden automatisch an den richtigen Flow geleitet." },
        { label: "Cleaner", href: "/docs/cleaners", why: "Rechnet Einheiten auf eine einheitliche Berichtsbasis um und teilt den Verbrauch auf Zeiträume auf." },
        { label: "Buckets", href: "/docs/buckets", why: "Verbrauch je Standort und Zeitraum als visualisierbare Tabelle – das Format, das Finanz- und ESG-Berichte brauchen." },
        { label: "E-Mail-Integration", href: "/docs/email-integration", why: "Versorger schicken Rechnungen per E-Mail; durch Weiterleitung entsteht der Datensatz ohne Erfassungsprojekt." },
      ],
      faqs: [
        { q: "Kommt es mit Rechnungen verschiedener Sparten und Versorger zurecht?", a: "Ja. Eine Collection klassifiziert jede Rechnung und leitet sie an den richtigen Flow, sodass Strom-, Gas- und Wasserrechnungen jeweils vom dafür gebauten Flow gelesen werden, unabhängig vom Layout des Versorgers." },
        { q: "Sind die Daten für die Emissionsberichterstattung nutzbar?", a: "Sie liefern den Verbrauch je Standort und Zeitraum samt Einheiten – genau der Input, den solche Berichte brauchen. Extrahieren Sie das Schätzkennzeichen und den Umrechnungsfaktor, statt einen Standardwert anzunehmen – an dieser Annahme scheitern die meisten Emissionszahlen." },
        { q: "Lässt sich eine Preiserhöhung von einem Mehrverbrauch unterscheiden?", a: "Extrahieren Sie Tarif und Grundpreis zusätzlich zum Verbrauch, und beides wird zu getrennten Spalten, deren Entwicklung Sie unabhängig voneinander verfolgen können." },
      ],
    },
  ],
};

export default de;
