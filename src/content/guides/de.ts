import type { GuidesContent } from "@/content/types";

/**
 * Guides: the /guides hub copy and every guide — Deutsch (de).
 */
const de: GuidesContent = {
  hub: {
    title: "Leitfäden — Bestellabgleich, Rechnungspositionen, HS-Codes und Dokumentenautomatisierung",
    description:
      "Verständliche Leitfäden zu den Problemen hinter der Dokumentenautomatisierung: Rechnungen mit Bestellungen abgleichen, Rechnungspositionen extrahieren, HS-Codes einreihen und mehr.",
    ogTitle: "Tavnit-Leitfäden",
    ogDescription:
      "Verständliche Leitfäden zu Bestellabgleich, Positionsextraktion, HS-Code-Einreihung und den übrigen Aufgaben der Dokumentenverarbeitung.",
    breadcrumbHome: "Startseite",
    name: "Leitfäden",
    h1: "Leitfäden zur Dokumentenautomatisierung",
    intro:
      "Die Probleme hinter dem Produkt, für sich erklärt: was der Bestellabgleich prüft, warum Rechnungstabellen schwer zu extrahieren sind, wie die Zolltarif-Einreihung wirklich funktioniert. Anbieterneutral bis zum letzten Abschnitt, in dem wir sagen, was Tavnit automatisiert.",
    minRead: "{m} Min. Lesezeit",
    read: "Lesen",
  },
  items: [
    {
      slug: "how-to-match-invoices-to-purchase-orders",
      title: "Rechnungen mit Bestellungen abgleichen (2-Wege- und 3-Wege-Abgleich)",
      h1: "Wie Sie Rechnungen mit Bestellungen abgleichen",
      description:
        "Was der Bestellabgleich ist, wie sich 2-Wege- und 3-Wege-Abgleich unterscheiden, wo der manuelle Abgleich scheitert und wie Sie ihn automatisieren, ohne Ihr ERP zu ersetzen.",
      lede: "Der Abgleich von Rechnung und Bestellung prüft, ob eine Lieferantenrechnung mit der Bestellung übereinstimmt, auf die sie sich bezieht: derselbe Lieferant, dieselben Artikel, dieselben Mengen, dieselben Preise. Der 2-Wege-Abgleich vergleicht Rechnung und Bestellung; der 3-Wege-Abgleich zieht zusätzlich den Wareneingangsbeleg heran. Es ist die Kontrolle, die verhindert, dass ein Unternehmen für Dinge bezahlt, die es nicht bestellt oder nicht erhalten hat.",
      published: "2026-09-08",
      updated: "2026-09-08",
      readingMinutes: 7,
      sections: [
        {
          heading: "Was der Bestellabgleich tatsächlich prüft",
          paragraphs: [
            "Eine Bestellung ist ein Kaufversprechen, eine Rechnung eine Zahlungsaufforderung. Der Abgleich beantwortet eine einzige Frage – verlangt diese Rechnung genau das, was wir vereinbart haben? – entlang von vier Dimensionen: Lieferant, Artikel, Mengen und Einzelpreise. Eine fünfte, die Summen, ergibt sich aus den anderen vier und ist für sich allein das am wenigsten nützliche Prüfkriterium.",
            "Summen sind eine schwache Prüfung, weil sie öfter zufällig übereinstimmen, als man denkt. Eine Rechnung über zehn Stück zu 12 $ statt zwölf Stück zu 10 $ hat die richtige Summe und sonst alles falsch. Ein Abgleich auf Kopfebene erkennt die Rechnung ohne Bestellung; nur ein Abgleich auf Positionsebene erkennt die Rechnung mit den falschen Positionen.",
          ],
        },
        {
          heading: "2-Wege- versus 3-Wege-Abgleich",
          paragraphs: [
            "Der 2-Wege-Abgleich vergleicht die Rechnung mit der Bestellung. Er bestätigt, dass Sie den Kauf zu diesem Preis vereinbart haben – nicht aber, dass die Ware angekommen ist. Deshalb wird er meist für Dienstleistungen, Abonnements und geringwertige Güter eingesetzt, bei denen ein Wareneingangsschritt mehr kostet, als er an Risiko abdeckt.",
            "Der 3-Wege-Abgleich zieht den Wareneingangsbeleg hinzu – Lieferschein, Packzettel oder Lagerquittung, die festhalten, was physisch angekommen ist. Jetzt muss die Rechnung sowohl mit der Bestellung als auch mit dem Wareneingang übereinstimmen. Ein Lieferant, der acht liefert und zehn berechnet, fällt hier auf und nirgendwo sonst. Für physische Güter ist das der Standard, und die meisten Prüfungsrahmen erwarten ihn oberhalb einer Wesentlichkeitsgrenze.",
            "Manche Teams sprechen vom 4-Wege-Abgleich und ergänzen einen Prüf- oder Abnahmebeleg. Das ist dieselbe Idee mit einem Dokument mehr, und es gelten dieselben Mechanismen.",
          ],
        },
        {
          heading: "Warum der manuelle Abgleich scheitert",
          paragraphs: [
            "Die Bestellung ist strukturiert – sie stammt aus Ihrem eigenen System. Die Rechnung nicht. Sie kommt als PDF aus dem System des Lieferanten, in dessen Layout, mit dessen Artikelnummern und dessen Beschreibung jedes Artikels. Bevor irgendein Vergleich möglich ist, muss jemand dieses PDF lesen und in dieselbe Form wie die Bestellung bringen. In den meisten Kreditorenteams ist diese Übertragung ein Mensch mit zwei offenen Fenstern.",
            "Genau dort entstehen die Fehler. Der Vergleich selbst ist nicht schwer; das schafft eine Tabellenkalkulation. Schwer ist die Übertragung, weil sie repetitiv ist, die Layouts je Lieferant verschieden sind und eine falsche Menge genauso aussieht wie eine richtige. Das Abgleichsproblem, das die meisten Unternehmen erleben, ist kein Fehler der Abgleichslogik. Es ist ein Fehler in der Datenerfassung davor.",
          ],
          bullets: [
            "Lieferantenartikelnummern weichen von internen Artikelnummern ab, also braucht die Zuordnung der Positionen eine Mapping-Tabelle, die niemand pflegt.",
            "Beschreibungen sind anders formuliert – „Blue widget 10pk“ gegenüber „WIDGET-BLU x10“ –, sodass ein exakter Textabgleich bei identischen Artikeln scheitert.",
            "Mengeneinheit und Packungsgröße verändern die Rechnung: 1 Karton à 12 gegenüber 12 Stück.",
            "Teillieferungen und aufgeteilte Rechnungen bedeuten, dass eine Bestellung zu mehreren Rechnungen gehört – der Abgleich ist n:1.",
            "Fracht, Zuschläge und Steuern stehen auf der Rechnung, aber nicht in der Bestellung, und müssen als zulässige Abweichungen statt als Unstimmigkeiten eingestuft werden.",
          ],
        },
        {
          heading: "Toleranzen: festlegen, was als Abweichung zählt",
          paragraphs: [
            "Kein realer Abgleich ist exakt. Preise werden angeboten, bevor sich ein Wechselkurs bewegt; Lieferanten runden; Fracht wird geschätzt. Ein Abgleichsprozess, der jede Rechnung mit einem Cent Differenz anhält, wird innerhalb eines Monats abgeschaltet. Die Lösung ist eine Toleranzrichtlinie: eine im Voraus vereinbarte Regel, wie viel Abweichung je Dimension zulässig ist, bevor die Rechnung angehalten wird.",
            "Typische Richtlinien erlauben eine kleine prozentuale oder absolute Abweichung beim Einzelpreis, keine Abweichung bei der Menge physischer Güter und einen gesonderten Spielraum für Fracht- und Zuschlagspositionen. Entscheidend ist, dass die Regel schriftlich festgehalten ist und vom System angewendet wird – nicht von dem, der an diesem Tag gerade abgleicht. Rechnungen innerhalb der Toleranz laufen durch; die übrigen werden angehalten und gehen an einen Menschen.",
          ],
        },
        {
          heading: "Schritt für Schritt automatisieren",
          paragraphs: [
            "Automatisierung beginnt nicht mit Abgleichssoftware. Sie beginnt damit, beide Dokumente in dieselbe strukturierte Form zu bringen, sodass der Vergleich eine Abfrage ist statt einer Lektüre.",
          ],
          bullets: [
            "Definieren Sie ein Feldschema für Bestelldokumente: Bestellnummer, Lieferant, Artikelnummer der Position, Beschreibung, Menge, Einzelpreis, Positionsbetrag, Summe. Verwenden Sie es gleichermaßen für Bestellungen, Rechnungen und Lieferscheine.",
            "Extrahieren Sie jede eingehende Rechnung in dieses Schema. Diesen Schritt überspringen die meisten Teams – und er ist es, der alles Weitere erst möglich macht.",
            "Ordnen Sie Lieferantenartikelnummern über einen Abgleich mit Ihrem Artikelstamm Ihren eigenen Artikelnummern zu; wo kein Mapping existiert, ordnen Sie Positionen nach der inhaltlichen Ähnlichkeit der Beschreibung zu statt nach exaktem Text.",
            "Prüfen Sie die Rechnung zuerst in sich: Ergibt Einzelpreis mal Menge den Positionsbetrag, und summieren sich die Positionen zur Gesamtsumme? Rechenfehler sind am billigsten zu finden und am peinlichsten zu bezahlen.",
            "Gleichen Sie die Kopffelder über die Bestellnummer ab und danach die Positionen innerhalb der gefundenen Bestellung. Wenden Sie Ihre Toleranzrichtlinie je Dimension an.",
            "Leiten Sie nur die Ausnahmen an eine prüfende Person weiter – mit Rechnung, Bestellung und der konkreten Abweichung vor Augen. Übereinstimmungen gehen direkt ins ERP.",
            "Führen Sie einen Audit-Trail darüber, wer was wann freigegeben hat. Wirtschaftsprüfer fragen danach – und der Lieferant ebenfalls, wenn er eine Kürzung beanstandet.",
          ],
        },
      ],
      tavnit: {
        heading: "Wo Tavnit ins Spiel kommt",
        paragraphs: [
          "Tavnit übernimmt die Extraktion und die Strukturierung. Bestellungen, Rechnungen und Lieferscheine kommen per E-Mail oder API an und werden in dieselben typisierten Felder extrahiert, unabhängig vom Layout des Lieferanten. Ein Lookup-Cleaner ordnet Lieferantenartikelnummern Ihren Artikelnummern zu; ein Formel-Cleaner prüft die Positionsrechnung; eine Bedingung markiert alles außerhalb Ihrer Toleranz.",
          "Für den Abgleich auf Positionsebene nimmt ein Matcher den Bestell-Durchlauf als Referenz und ordnet ihm jede Rechnungsposition zu – inhaltlich, mit einem LLM als Schiedsrichter für Grenzfälle –, stellt Menge und Einzelpreis nebeneinander und listet nicht zugeordnete Positionen als Warnungen auf. Markierte Rechnungen warten auf eine benannte prüfende Person, mit unveränderlichem Audit-Trail; der Rest geht per API oder Webhook an Ihr ERP.",
        ],
        links: [
          { label: "Software für den Bestellabgleich", href: "/use-cases/purchase-orders" },
          { label: "Rechnungsverarbeitung", href: "/use-cases/invoice-processing" },
          { label: "Lieferscheine und Wareneingangsprüfung", href: "/use-cases/delivery-notes" },
        ],
      },
      faqs: [
        { q: "Was ist der Unterschied zwischen 2-Wege- und 3-Wege-Abgleich?", a: "Der 2-Wege-Abgleich vergleicht die Rechnung mit der Bestellung – haben wir den Kauf zu diesem Preis vereinbart? Der 3-Wege-Abgleich vergleicht zusätzlich mit dem Wareneingangsbeleg – ist die Ware tatsächlich angekommen? Für physische Güter ist der 3-Wege-Abgleich Standard; der 2-Wege-Abgleich ist bei Dienstleistungen und geringwertigen Einkäufen üblich." },
        { q: "Lässt sich der Bestellabgleich vollständig automatisieren?", a: "Der Vergleich ja. Was sich der Automatisierung widersetzt, ist, das Rechnungs-PDF des Lieferanten in dieselbe strukturierte Form wie Ihre Bestellung zu bringen, denn Layout, Artikelnummern und Beschreibungen sind bei jedem Lieferanten anders. Ist die Extraktion automatisiert, wird der Abgleich zur Abfrage, und nur die Ausnahmen brauchen einen Menschen." },
        { q: "Welche Toleranz sollte ich für den Bestellabgleich festlegen?", a: "Eine allgemeingültige Zahl gibt es nicht. Die meisten Richtlinien erlauben eine kleine prozentuale oder absolute Abweichung beim Einzelpreis, keine Abweichung bei der Menge physischer Güter und behandeln Fracht und Zuschläge als gesonderte zulässige Positionen. Wichtig ist, dass die Regel schriftlich festgehalten ist und vom System konsequent angewendet wird." },
      ],
    },
    {
      slug: "line-item-extraction-from-invoices",
      title: "Rechnungspositionen extrahieren: was es ist und warum es schwer ist",
      h1: "Positionsextraktion aus Rechnungen",
      description:
        "Warum das Extrahieren von Rechnungspositionen schwerer ist als das Extrahieren von Summen, was eine gute Positionsextraktion liefert und wie Sie Tabellendaten aus jedem Lieferantenlayout ohne Vorlagen gewinnen.",
      lede: "Die Positionsextraktion holt die sich wiederholende Tabelle aus einer Rechnung – jede Produkt- oder Leistungsposition mit Beschreibung, Artikelnummer, Menge, Einzelpreis und Betrag – als strukturierte Zeilen heraus, statt nur der Kopffelder wie Lieferant, Datum und Summe. Sie macht Bestellabgleich, Ausgabenanalyse und Bestandsabstimmung erst möglich – und sie ist der Teil, an dem die meisten OCR-Tools scheitern.",
      published: "2026-09-08",
      updated: "2026-09-08",
      readingMinutes: 6,
      sections: [
        {
          heading: "Kopffelder versus Positionen",
          paragraphs: [
            "Jede Rechnung hat eine Handvoll Kopffelder – Lieferant, Rechnungsnummer, Datum, Fälligkeitsdatum, Währung, Summe –, die einmal vorkommen und leicht zu finden sind. Dann kommt eine Tabelle. Sie kann drei Zeilen haben oder dreihundert; sie kann sich über mehrere Seiten erstrecken; sie kann andere Spalten haben als die Tabelle jedes anderen Lieferanten. Die Kopfdaten sagen Ihnen, wie viel Sie zahlen müssen. Die Positionen sagen Ihnen, wofür Sie zahlen – und genau das fragt jeder nachgelagerte Prozess.",
            "Die Ausgabenanalyse braucht Positionskategorien. Der Bestellabgleich braucht Positionsmengen und -preise. Die Lagerhaltung braucht Artikelnummern je Position. Die Steuer braucht Steuersätze je Position. Eine Rechnung ohne ihre Positionen ist eine Zahlungsanweisung ohne Inhalt.",
          ],
        },
        {
          heading: "Warum Tabellen der schwierige Teil sind",
          paragraphs: [
            "Eine Summe ist ein einzelner Wert an einer vorhersehbaren Stelle der Seite. Eine Tabelle ist eine Struktur, und diese Struktur ist überall anders. Klassisches OCR liest Zeichen und Positionen; es weiß nicht, dass die Zahl unter „Menge“ zur Beschreibung zwei Zellen weiter links gehört, dass die Beschreibung in eine zweite Zeile umgebrochen wurde oder dass die letzten drei Zeilen Zwischensummen und keine Artikel sind.",
          ],
          bullets: [
            "Die Spalten variieren je Lieferant: Manche haben Artikelnummer und Beschreibung, manche nur eine Beschreibung, manche teilen den Einzelpreis in netto und brutto.",
            "Mehrzeilige Beschreibungen brechen um, und für einen positionsbasierten Parser sieht die zweite Zeile wie eine neue Zeile aus.",
            "Tabellen erstrecken sich über mehrere Seiten, mit oder ohne wiederholte Kopfzeile und mit laufenden Summen am Ende jeder Seite.",
            "Nicht-Artikelzeilen – Zwischensummen, Rabatte, Fracht, Steuern, „Übertrag“ – stehen mitten in der Tabelle und müssen eingeordnet statt als Produkte extrahiert werden.",
            "Verbundene Zellen, rechtsbündige Zahlen, die in die Nachbarspalte rutschen, und schief eingescannte Seiten bringen jede koordinatenbasierte Auswertung durcheinander.",
            "Einheiten und Packungsgrößen verstecken sich in der Beschreibung („pro Karton à 12“) statt in einer eigenen Spalte.",
          ],
        },
        {
          heading: "Vorlagenbasierte versus vorlagenfreie Extraktion",
          paragraphs: [
            "Vorlagenbasierte Tools lösen Tabellen, indem Sie für jedes Lieferantenlayout den Tabellenbereich und die Spalten einzeichnen. Das funktioniert – für diesen Lieferanten, bis er sein Rechnungsformat ändert. Ab dann entstehen unbemerkt falsche Zeilen, bis es jemand merkt. Der Pflegeaufwand wächst mit der Zahl Ihrer Lieferanten, weshalb Teams mit Hunderten von Lieferanten diese Tools wieder aufgeben.",
            "Die vorlagenfreie Extraktion nutzt ein Modell, das versteht, was eine Rechnungsposition ist – so wie ein Mensch –, und liefert Zeilen nach einem Schema, das Sie einmal definieren: Beschreibung, Menge, Einzelpreis, Betrag, unabhängig vom Layout. Der Haken: Ein Modell kann sich verlesen. Deshalb sollte das Ergebnis geprüft statt blind übernommen werden – mit Rechenprüfungen je Zeile und manueller Prüfung, wenn eine Prüfung fehlschlägt.",
          ],
        },
        {
          heading: "So sieht eine gute Positionsextraktion aus",
          paragraphs: [
            "Das Ergebnis sollte eine Tabelle sein, kein Text: eine Zeile pro Artikel, eine typisierte Spalte pro Feld, Zahlen als Zahlen und Datumsangaben als Datum. Jede Zeile sollte die Felder enthalten, die Ihr nachgelagerter Prozess braucht, und nichts, was in den Kopf gehört. Nicht-Artikelzeilen sollten ausgeschlossen oder markiert werden, nicht untergemischt. Und das Ergebnis sollte überprüfbar sein: Wenn Einzelpreis mal Menge nicht den Positionsbetrag ergibt, ist die Zeile falsch und sollte das auch anzeigen.",
          ],
          bullets: [
            "Beschreibung – wörtlich, denn daraus leitet sich jeder spätere Abgleich und jede Kategorisierung ab.",
            "Artikelnummer – die des Lieferanten und, falls ein Abgleich sie auflösen kann, Ihre eigene.",
            "Menge und Mengeneinheit – als getrennte Felder.",
            "Einzelpreis und Positionsbetrag – beide, damit die Rechnung geprüft werden kann.",
            "Steuersatz oder Steuerschlüssel je Position, wo die Rechtsordnung es verlangt.",
            "Ein Prüfstatus je Zeile: Rechnung bestanden oder markiert, mit Begründung.",
          ],
        },
      ],
      tavnit: {
        heading: "Wo Tavnit ins Spiel kommt",
        paragraphs: [
          "In Tavnit sind Positionen Tabellenfelder eines Flows: Sie benennen die Spalten einmal, und jede Rechnung jedes Lieferanten wird als typisierte Zeilen in diese Spalten extrahiert – ohne Vorlage pro Lieferant. Ein Formel-Cleaner prüft Einzelpreis mal Menge je Zeile; ein Lookup-Cleaner ordnet Lieferantenartikelnummern Ihren Artikelnummern zu; ein Kategorie-Cleaner vergibt Ausgabenkategorien. Zeilen, die eine Prüfung nicht bestehen, leiten den Durchlauf an eine prüfende Person. Die Ergebnisse landen in einem Bucket, den Sie abfragen oder visualisieren können, oder gehen per API oder Webhook direkt in Ihre Systeme.",
        ],
        links: [
          { label: "Datenextraktion aus Rechnungen", href: "/use-cases/invoice-processing" },
          { label: "Flows — Tabellenfelder definieren", href: "/docs/flows" },
          { label: "Cleaner — Formel- und Lookup-Felder", href: "/docs/cleaners" },
        ],
      },
      faqs: [
        { q: "Kann OCR Positionen aus Rechnungen extrahieren?", a: "Reines OCR extrahiert Zeichen und ihre Positionen; es versteht keine Tabellenstruktur und liefert daher Text, der noch in Zeilen zerlegt werden muss. Eine zuverlässige Positionsextraktion braucht eine Ebene, die versteht, was eine Rechnungsposition ist – entweder eine Vorlage pro Lieferant oder ein Modell, das über Layouts hinweg verallgemeinert." },
        { q: "Wie extrahiere ich Rechnungstabellen ohne Vorlage pro Lieferant?", a: "Mit einem Extraktionsmodell, das Zeilen nach einem von Ihnen definierten Schema liefert – Beschreibung, Menge, Einzelpreis, Betrag –, unabhängig vom Layout. Prüfen Sie dann jede Zeile rechnerisch und leiten Sie Fehler an eine prüfende Person weiter. Genau das leisten die Tabellenfelder in Tavnit." },
        { q: "Wie sollten mehrseitige Rechnungstabellen behandelt werden?", a: "Die Extraktion sollte die Tabelle seitenübergreifend als eine logische Tabelle behandeln, wiederholte Kopfzeilen und laufende Seitensummen ignorieren und einen einzigen Satz Zeilen liefern. Prüfen Sie, ob sich die Zeilen zur Rechnungssumme addieren, um sicherzugehen, dass an keinem Seitenumbruch etwas verloren ging." },
      ],
    },
    {
      slug: "hs-code-classification-explained",
      title: "HS-Code-Einreihung erklärt — und wie man sie automatisiert",
      h1: "HS-Code-Einreihung: was sie ist und wie man sie automatisiert",
      description:
        "Wie das Harmonisierte System funktioniert, warum Zolltarif-Einreihung Ermessenssache ist, welche Rolle die Allgemeinen Vorschriften spielen und wie eine verantwortungsvolle Automatisierung aussieht.",
      lede: "Bei der HS-Code-Einreihung erhält jedes gehandelte Produkt einen Code aus dem Harmonisierten System – der internationalen Nomenklatur, anhand derer Zollbehörden Zollsätze, Steuern und Kontrollen bestimmen. Die ersten sechs Stellen gelten weltweit; die Länder erweitern sie auf acht, zehn oder mehr Stellen für nationale Tarifpositionen. Ein falscher Code bedeutet den falschen Zoll, eine verzögerte Sendung oder eine Strafe.",
      published: "2026-09-08",
      updated: "2026-09-08",
      readingMinutes: 7,
      sections: [
        {
          heading: "Wie das Harmonisierte System aufgebaut ist",
          paragraphs: [
            "Das Harmonisierte System wird von der Weltzollorganisation gepflegt und etwa alle fünf Jahre überarbeitet; die aktuelle Ausgabe ist das HS 2022. Es gliedert sich in 21 Abschnitte, 97 Kapitel (2 Stellen), Positionen (4 Stellen) und Unterpositionen (6 Stellen). Diese sechs Stellen sind in jedem Mitgliedsland identisch – das macht das System harmonisiert. Jenseits der sechs Stellen fügt jedes Land eigene Untergliederungen hinzu – nationale Tarifpositionen –, an die die tatsächlichen Zollsätze und inländischen Steuern geknüpft sind.",
            "Panamas Arancel Nacional de Importación etwa erweitert die HS-2022-Nomenklatur auf rund 9.700 nationale Tarifpositionen, jede mit ihrem Einfuhrzoll (DAI), ihrer Umsatzsteuer (ITBMS) und gegebenenfalls ihrer Verbrauchsteuer (ISC). Eine Einreihung ist mit sechs Stellen nicht abgeschlossen; sie ist abgeschlossen, wenn sie bei der nationalen Position landet, die bestimmt, was geschuldet wird.",
          ],
        },
        {
          heading: "Warum Einreihung Ermessen ist, kein Nachschlagen",
          paragraphs: [
            "Wäre die Einreihung ein Nachschlagen im Wörterbuch – Produktname rein, Code raus –, wäre sie seit Jahrzehnten automatisiert. Das ist sie nicht, denn die Nomenklatur reiht Waren danach ein, woraus sie bestehen, was sie tun und wie sie aufgemacht sind, und eine einzige Produktbeschreibung kann plausibel unter mehrere Positionen fallen. Ist ein beheizbarer Autositzbezug eine Textilware, ein Fahrzeugteil oder ein elektrisches Heizgerät? Jede Variante hat einen anderen Satz.",
            "Entscheidungshilfe bieten die Allgemeinen Vorschriften für die Auslegung des Harmonisierten Systems (AV). Vorschrift 1 besagt, dass die Positionstexte sowie die rechtsverbindlichen Abschnitts- und Kapitelanmerkungen maßgebend sind. Vorschrift 2 behandelt unvollständige Waren und Mischungen. Vorschrift 3 regelt Waren, die unter zwei oder mehr Positionen fallen könnten – zuerst die genaueste Warenbezeichnung, dann der wesentliche Charakter, dann die in der Nummernfolge zuletzt stehende Position. Die Vorschriften 4 bis 6 betreffen nicht anderweitig erfasste Waren, Verpackungen und die Einreihung auf Unterpositionsebene. Eine belastbare Einreihung nennt die Vorschrift, auf die sie sich stützt.",
            "Hinzu kommen die rechtsverbindlichen Anmerkungen: Kapitel- und Abschnittsanmerkungen, die bestimmte Waren einer Position zuordnen oder von ihr ausschließen – ganz gleich, was der Positionstext zu sagen scheint. Ein Klassifikator, der Positionstitel liest und die Anmerkungen ignoriert, liegt bei einer vorhersehbaren Gruppe von Produkten selbstsicher falsch.",
          ],
        },
        {
          heading: "Wo die Einreihung in der Praxis schiefgeht",
          paragraphs: [
            "Die meisten Fehleinreihungen sind keine schwierigen Fälle nach AV 3. Es sind gewöhnliche Produkte, die schlecht beschrieben sind. Auf der Handelsrechnung steht „Teile“, „Muster“ oder ein Markenname, und wer einreiht, rät entweder oder muss nachfragen. Die Beschreibung ist der Rohstoff der Einreihung – und meist der schwächste Input des ganzen Prozesses.",
          ],
          bullets: [
            "Vage Beschreibungen auf der Handelsrechnung – eine Marke oder Modellnummer ohne Angabe, was der Artikel ist oder woraus er besteht.",
            "Gemischte Sendungen, bei denen eine Rechnungsposition mehrere unterschiedliche Produkte umfasst, die verschieden einzureihen sind.",
            "Verlassen auf den vom Lieferanten angegebenen HS-Code, der nach dem Tarif eines anderen Landes und womöglich zu einem anderen Zweck eingereiht wurde.",
            "Wiederverwenden des Vorjahrescodes, nachdem eine neue HS-Ausgabe das Produkt verschoben hat.",
            "Ignorieren der Kapitelanmerkungen und Einreihen allein nach dem Positionstitel.",
            "Keine Dokumentation, warum ein Code gewählt wurde – also reihen drei Personen dasselbe Produkt auf drei Arten ein.",
          ],
        },
        {
          heading: "Wie verantwortungsvolle Automatisierung aussieht",
          paragraphs: [
            "Ziel ist keine Maschine, die unbeaufsichtigt einreiht. Das Zollrecht legt die Verantwortung für die Anmeldung beim Einführer oder beim zugelassenen Zollagenten, und daran wird sich nichts ändern. Ziel ist ein System, das eine Einreihung samt Begründung vorschlägt, sobald die Versandpapiere verarbeitet werden – sodass die Fachkraft prüft, statt zu recherchieren.",
          ],
          bullets: [
            "Gehen Sie von der extrahierten Warenbeschreibung aus, wörtlich, plus allen Angaben zu Material, Funktion und Zusammensetzung auf Rechnung oder Packliste.",
            "Reihen Sie nach dem nationalen Tarif ein – allen nationalen Positionen mit ihren Sätzen –, nicht nur nach dem sechsstelligen HS, und nach der aktuellen Ausgabe.",
            "Wenden Sie die rechtsverbindlichen Kapitel- und Abschnittsanmerkungen sowie die AV an und halten Sie fest, welche Vorschrift und welche Anmerkung den Ausschlag gab.",
            "Liefern Sie einen Code, eine Konfidenz und die Begründung; leiten Sie Positionen mit geringer Konfidenz oder hohem Wert vor der Anmeldung zur Prüfung an einen Zollagenten.",
            "Führen Sie einen Audit-Trail je Einreihung. Wenn der Zoll zwei Jahre später einen Code hinterfragt, ist die Begründung Ihre Verteidigung.",
            "Lernen Sie aus den Korrekturen des Zollagenten: Ein einmal eingereihtes Produkt sollte beim nächsten Mal genauso eingereiht werden.",
          ],
        },
      ],
      tavnit: {
        heading: "Wo Tavnit ins Spiel kommt",
        paragraphs: [
          "Tavnit extrahiert die Versandpapiere – Handelsrechnung, Packliste, Konnossement, Ursprungszeugnis – in typisierte Felder; anschließend reiht ein HS-Code-Cleaner im selben Durchlauf jede Warenposition anhand ihrer extrahierten Beschreibung ein. Für Panama arbeitet der Klassifikator mit dem offiziellen Arancel Nacional (VII Enmienda, HS 2022) samt nationalen Positionen und DAI-, ITBMS- und ISC-Sätzen und wendet die rechtsverbindlichen Kapitelanmerkungen und die AV an. Das Ergebnis ist eine nationale Tarifposition mit Begründung statt einer sechsstelligen Vermutung.",
          "Einreihungen durchlaufen die manuelle Prüfung, bevor etwas eingereicht wird, mit einem unveränderlichen Audit-Trail darüber, wer welchen Code freigegeben hat. Die strukturierten, eingereihten Daten können dann das Anmeldeformular vorausfüllen, statt erneut abgetippt zu werden.",
        ],
        links: [
          { label: "Zollautomatisierung mit HS-Einreihung", href: "/use-cases/customs-trade" },
          { label: "Aduanas y clasificación arancelaria (Panamá) — auf Spanisch", href: "/es/aduanas" },
          { label: "Cleaner — Feldtyp HS-Code", href: "/docs/cleaners" },
        ],
      },
      faqs: [
        { q: "Was ist der Unterschied zwischen einem HS-Code und einer Zolltarifnummer?", a: "Der HS-Code ist der sechsstellige internationale Code, den die Weltzollorganisation festlegt. Eine Zolltarifnummer ist die nationale Erweiterung davon – acht, zehn oder mehr Stellen –, an die die nationalen Zoll- und Steuersätze geknüpft sind. Panamas Arancel Nacional, der TARIC der EU und der US-amerikanische HTS sind allesamt nationale Tarife auf Basis des HS." },
        { q: "Kann KI HS-Codes zuverlässig einreihen?", a: "Sie kann gute Einreihungen vorschlagen, wenn sie von einer guten Produktbeschreibung ausgeht, mit dem vollständigen nationalen Tarif samt rechtsverbindlichen Anmerkungen arbeitet und ihre Begründung erklärt. Unbeaufsichtigt Anmeldungen einreichen sollte sie nicht: Verantwortungsvoll ist ein Vorschlag mit Konfidenz und Begründung, den ein zugelassener Zollagent bei geringer Konfidenz oder hohem Wert prüft." },
        { q: "Kann ich einfach den HS-Code verwenden, den mein Lieferant auf die Rechnung geschrieben hat?", a: "Betrachten Sie ihn als Hinweis, nicht als Antwort. Der Lieferant hat nach dem Tarif seines eigenen Landes eingereiht, womöglich für Exportkontrollen statt für den Einfuhrzoll und vielleicht nach einer älteren HS-Ausgabe. Für den Code in der Einfuhranmeldung ist der Einführer oder der Zollagent verantwortlich." },
      ],
    },
  ],
};

export default de;
