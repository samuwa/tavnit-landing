import type { LiteLocaleCopy } from "@/lib/lite/copy-base";

/**
 * Free tools: base tool copy, hub, Lite header/footer, every tool and its social card — Deutsch (de).
 *
 * Translated from ./en.ts. German grammar note: the vocab tokens ({a_doc},
 * {the_doc}, {your_doc}, {each_doc}, {another_doc}…) hold ACCUSATIVE forms
 * ("einen Vertrag", "den Beleg"), and the base copy only uses them where the
 * accusative fits (direct objects, "für", "an", "auf"). Bare {doc}/{docs} are
 * never used after a dative preposition (that would need "Verträgen").
 */

const INVOICE_VOCAB = {
  doc: "Rechnung",
  docs: "Rechnungen",
  a_doc: "eine Rechnung",
  the_doc: "die Rechnung",
  the_docs: "die Rechnungen",
  your_doc: "Ihre Rechnung",
  your_docs: "Ihre Rechnungen",
  all_your_docs: "alle Ihre Rechnungen",
  all_docs: "alle Rechnungen",
  each_doc: "jede Rechnung",
  another_doc: "eine weitere Rechnung",
  this_doc: "diese Rechnung",
};

const de: LiteLocaleCopy = {
  base: {
    title: "{Doc} in Excel, kostenlos: Positionen per KI auslesen",
    description:
      "Laden Sie {a_doc} als PDF oder Foto hoch und erhalten Sie die Positionen als Excel-Tabelle: Beschreibung, Menge, Einzelpreis und Gesamtbetrag. Kostenlos, ohne Vorlagen, ohne Registrierung bis zum Ergebnis.",
    label: "{Doc} in Excel",
    h1: "Verwandeln Sie {a_doc} in eine Excel-Tabelle",
    intro:
      "Laden Sie das PDF oder Foto hoch. Tavnit liest den Kopf und jede Zeile der Tabelle und gibt alles als Tabelle zurück. Keine Vorlagen pro Lieferant: Dasselbe Tool funktioniert für {all_your_docs}.",
    trust: ["PDF, JPG oder PNG · bis 5 Seiten", "{limit} kostenlose Dokumente pro Tag", "Nach 24 h wird alles gelöscht"],
    drop: {
      title: "Legen Sie {your_doc} hier ab",
      hint: "oder wählen Sie eine Datei auf Ihrem Computer",
      choose: "Datei wählen",
      sample: "Mit einem Beispiel ausprobieren",
      formats: "PDF, JPG oder PNG · bis 4 MB und 5 Seiten",
    },
    stages: [
      "Dokument wird hochgeladen",
      "Kopfdaten werden gelesen",
      "Positionstabelle wird gesucht",
      "Spalten werden geordnet",
      "Gleich fertig",
    ],
    result: {
      heading: "Fertig: {file}",
      rowWord: ["Zeile", "Zeilen"],
      pageWord: ["Seite", "Seiten"],
      summary: "{rows} · {pages}",
      truncated: "{shown} von {total} Zeilen werden angezeigt. Die Excel-Datei enthält dieselben {shown}.",
      readyIn: "fertig in {s} s",
      sum: "Summe",
      viewer: "Ihr Dokument",
      openDocument: "Dokument ansehen",
      closeDocument: "Schließen",
      retention: "wird nach 24 h automatisch gelöscht",
      hideColumn: "Spalte entfernen",
      hiddenCols: ["1 Spalte entfernt. Die Excel-Datei lässt sie weg.", "{n} Spalten entfernt. Die Excel-Datei lässt sie weg."],
      restoreAll: "Alle wiederherstellen",
      restoreOne: "{col} wiederherstellen",
      ghostColumn: "+ Ihr Feld",
      ghostHint: "In Tavnit fügen Sie die Felder hinzu, die Sie brauchen: Bestellnummer, Fälligkeitsdatum, Kostenstelle…",
      flowNote: "Diese {fields} Spalten sind die Felder eines festen Flows für {docs}. In Ihrem Konto wählen Sie die Felder selbst.",
      flowNoteCta: "So geht's",
      download: "Excel herunterladen",
      downloading: "Datei wird vorbereitet",
      another: "{Another_doc} verarbeiten",
      empty: "In diesem Dokument haben wir keine Positionstabelle gefunden. Probieren Sie {a_doc} mit Mengen und Preisen pro Zeile.",
    },
    errors: {
      empty: "Die Datei ist leer.",
      too_large: "Die Datei ist größer als 4 MB. Komprimieren Sie sie oder laden Sie nur die relevanten Seiten hoch.",
      unsupported: "Es werden nur PDF-, JPG- oder PNG-Dateien akzeptiert.",
      unreadable: "Wir konnten dieses PDF nicht öffnen. Falls es passwortgeschützt ist, entfernen Sie das Passwort und versuchen Sie es erneut.",
      too_many_pages: "Die kostenlose Version verarbeitet bis zu 5 Seiten pro Dokument.",
      captcha: "Wir konnten nicht bestätigen, dass Sie kein Bot sind. Laden Sie die Seite neu und versuchen Sie es noch einmal.",
      quota: "Sie haben Ihre {limit} kostenlosen Dokumente für heute aufgebraucht. Morgen stehen sie wieder bereit – oder Sie erstellen ein Konto und machen gleich weiter.",
      daily_cap: "Das kostenlose Tool hat seine heutige Kapazität erreicht. Kommen Sie morgen wieder oder erstellen Sie ein Konto und machen Sie jetzt weiter.",
      unavailable: "Das Tool ist gerade nicht verfügbar. Versuchen Sie es in ein paar Minuten erneut.",
      backend: "Bei der Verarbeitung des Dokuments ist ein Fehler aufgetreten. Versuchen Sie es erneut.",
      failed: "Wir konnten dieses Dokument nicht auslesen. Probieren Sie {another_doc} oder das Beispiel.",
      timeout: "Das dauert länger als üblich. Warten Sie einen Moment und versuchen Sie es erneut.",
      forbidden: "Diese Aktion ist von hier aus nicht erlaubt.",
      bad_request: "Die Datei fehlt oder konnte nicht gelesen werden.",
    },
    auth: {
      title: "Kostenloses Konto erstellen und herunterladen",
      body: "Die Excel-Datei wird sofort heruntergeladen. Mit einem Konto erledigen Sie das außerdem für {all_your_docs} auf einmal.",
      google: "Weiter mit Google",
      or: "oder mit Ihrer E-Mail-Adresse",
      signin: "Anmelden",
      signup: "Konto erstellen",
      name: "Name",
      email: "E-Mail",
      password: "Passwort",
      submitSignin: "Anmelden und herunterladen",
      submitSignup: "Konto erstellen und herunterladen",
      switchToSignin: "Ich habe bereits ein Konto",
      switchToSignup: "Ich habe noch kein Konto",
      checkEmail:
        "Wir haben Ihnen eine E-Mail zur Bestätigung des Kontos geschickt. Öffnen Sie sie – wenn Sie zurückkommen, steht die Excel-Datei zum Download bereit.",
      existing: "Für diese E-Mail-Adresse gibt es bereits ein Konto. Melden Sie sich an, um herunterzuladen.",
      forgot: "Passwort vergessen",
      close: "Schließen",
      generic: "Die Registrierung konnte nicht abgeschlossen werden. Prüfen Sie E-Mail-Adresse und Passwort und versuchen Sie es erneut.",
    },
    next: {
      heading: "Und dann?",
      lead: "Das war ein einzelnes Dokument. Mit einem Konto verarbeitet Tavnit {each_doc} gleich beim Eingang, und die Zeilen enden nicht in einer Excel-Datei: Sie laufen von selbst weiter.",
      source: "{Your_doc}",
      node: "Tavnit",
      nodeSub: "Extraktions-Flow",
      items: [
        {
          short: "Landet in Ihrem Postfach",
          via: "E-Mail",
          title: "Das Ergebnis landet in Ihrem Postfach",
          body: "Sobald die Extraktion fertig ist, schickt Tavnit eine E-Mail an die Adressen, die Sie im Flow hinterlegt haben – mit den Zeilen als rows.csv im Anhang. Ist die Prüfung aktiv, wartet die E-Mail auf die Freigabe.",
          linkLabel: "E-Mail-Ausgabe",
          href: "/docs/email-integration",
          scene: [{ label: "Die Extraktion ist fertig" }, { label: "Tavnit verfasst die E-Mail" }, { label: "Sie geht an, wen Sie wollen", result: "rows.csv im Anhang" }],
        },
        {
          short: "Landet in Ihrem ERP",
          via: "Webhook",
          title: "Per Webhook direkt in Ihr ERP",
          body: "Ist ein Lauf abgeschlossen, sendet Tavnit die Zeilen und die run_id per POST an die URL, die Sie angeben. Zapier, Make und n8n empfangen das mit ihrem Webhook-Trigger; eine native App ist nicht nötig.",
          linkLabel: "Webhooks",
          href: "/docs/webhooks",
          scene: [{ label: "Die extrahierten Zeilen" }, { label: "Ein POST mit rows und run_id" }, { label: "Sie erscheinen in Ihrem System", result: "6 Zeilen, niemand hat getippt" }],
        },
        {
          short: "Prüfen vor dem Buchen",
          via: "Prüfung",
          title: "Ein Mensch gibt frei, bevor gebucht wird",
          body: "Aktivieren Sie die Prüfung für den Flow, und jeder Lauf hält an. Die prüfende Person sieht die bearbeitbare Tabelle neben dem Originaldokument: Sie korrigiert Zellen, schließt Zeilen aus, ergänzt Spalten und gibt frei oder lehnt ab. Erst nach der Freigabe gehen E-Mail, Webhook und Bucket raus; jede Entscheidung wird protokolliert. Für Personen, die sonst nichts sehen sollen, gibt es eine reine Prüfer-Rolle.",
          linkLabel: "Manuelle Prüfung",
          href: "/docs/human-in-the-loop",
          scene: [{ label: "Der Lauf wartet auf die Prüfung" }, { label: "Ein Mensch korrigiert neben dem Dokument" }, { label: "Freigegeben: erst dann zugestellt", result: "1 Zelle korrigiert · protokolliert" }],
        },
        {
          short: "Angebote vergleichen",
          via: "Matcher",
          title: "Mehrere Angebote Zeile für Zeile vergleichen",
          body: "Ein Matcher nimmt mehrere Läufe desselben Flows, etwa drei Lieferantenangebote, ordnet die Zeilen anhand der Beschreibung einander zu und markiert in einer Champion-Spalte das günstigste Angebot pro Zeile.",
          linkLabel: "Lieferantenangebote",
          href: "/use-cases/supplier-quotes",
          scene: [{ label: "Drei Angebote, ein Flow" }, { label: "Der Matcher ordnet die Zeilen zu" }, { label: "Champion-Spalte: das Beste pro Zeile", result: "Lieferant B gewinnt 4 von 5" }],
        },
        {
          short: "Regeln und Prüfungen",
          via: "Cleaner",
          title: "Ein Cleaner bereinigt und prüft jede Zeile",
          body: "Datumsformat, Zahlenformat, berechnete Felder, Währungsumrechnung zu veröffentlichten Kursen und bedingte Aktionen: Fällt eine Zeile durch, geht sie in die Prüfung, per E-Mail oder per Webhook raus.",
          linkLabel: "Cleaners",
          href: "/docs/cleaners",
          scene: [{ label: "Die Daten, wie sie ankommen" }, { label: "Der Cleaner wendet Ihre Regeln an" }, { label: "Sauber, Fehler markiert", result: "Datum, Zahl und Summe stimmen" }],
        },
        {
          short: "Ein Agent öffnet das Portal",
          via: "Agent",
          title: "Ein Agent meldet sich im Lieferantenportal an",
          body: "Sie beschreiben den Auftrag in einfachen Worten, mit einer Start-URL und Zugangsdaten in einem Tresor, den das Modell nie sieht. Ist die Extraktion abgeschlossen, startet der Agent von selbst mit den Feldern des Dokuments und bringt typisiert zurück, was Sie verlangt haben: Preis, Lieferzeit, Dateien.",
          linkLabel: "Agents",
          href: "/docs/agents",
          scene: [{ label: "Die Extraktion ist fertig" }, { label: "Der Agent navigiert im Portal" }, { label: "Bringt die Daten typisiert zurück", result: "Preis 18.50 · Lieferzeit 5 Tage" }],
        },
        {
          short: "Fragen an Ihre Daten",
          via: "Bucket",
          title: "Stellen Sie Fragen an {your_docs}",
          body: "Die Zeilen werden in einem Bucket gespeichert. Sie fragen in normaler Sprache; Tavnit macht aus der Frage einen Plan (Summe, Filter, Monat), führt ihn in der Datenbank aus und antwortet mit der Zahl. Das Modell rechnet nie selbst.",
          linkLabel: "Buckets",
          href: "/docs/buckets",
          scene: [{ label: "„Wie viel haben wir im August bei Istmo eingekauft?“" }, { label: "Ein Plan: Summe · Lieferant · Monat" }, { label: "Die Zahl, in der Datenbank berechnet", result: "$12,480, verteilt auf 4 {docs}" }],
        },
      ],
      hint: "Tippen Sie auf eine Option oder auf den Tavnit-Chip, um zu sehen, was passiert.",
      flow: {
        title: "Der Flow: Sie bestimmen die Spalten",
        body: "Ein Flow ist die Definition eines Dokumenttyps: die Liste der Felder, die Sie herausholen wollen, jedes mit Name, Datentyp und der Angabe, ob es einmal pro Dokument oder einmal pro Zeile vorkommt, bei Bedarf mit einem Hinweis, wo es zu finden ist. Schalten Sie ihn ein, und jedes eingehende Dokument wird genau auf diese Felder hin gelesen; die resultierende Tabelle hat eine Spalte pro Feld. Dieses Tool nutzt einen festen Flow für {docs} mit {fields} Feldern. In Ihrem Konto fügen Sie Felder hinzu, entfernen oder benennen sie um und erstellen Flows für jedes andere Dokument. Keine Vorlagen, keine Koordinaten.",
        linkLabel: "So wird ein Flow definiert",
        href: "/docs/flows",
        scene: [{ label: "Sie definieren die Felder in zwei Gruppen: Dokument und Tabelle" }, { label: "Der Kopf wird einmal gelesen, die Tabelle Zeile für Zeile" }, { label: "Eine Zeile pro Position: Dokumentwerte wiederholen sich, Tabellenwerte ändern sich", result: "5 Felder → 5 Spalten" }],
        name: "{Doc}",
        kinds: ["Dokumentfelder", "Tabellenfelder"],
        add: { name: "purchase_order", type: "Text", hint: "Neben „PO“ · z. B. PO-2291", save: "Speichern", value: "PO-2291" },
        activate: "Aktiv",
      },
      inputs: {
        show: "Wie bringen Sie {your_doc} zu Tavnit?",
        hide: "Eingänge ausblenden",
        items: [
          {
            short: "Per E-Mail",
            via: "eine Adresse pro Flow",
            title: "E-Mail weiterleiten, fertig",
            body: "Jeder Flow hat seine eigene E-Mail-Adresse unter @mg.tavnit.io. Leiten Sie die E-Mail samt Anhang weiter, und jeder Anhang wird zu einem Lauf. Betreff und Text werden nie gelesen.",
            linkLabel: "E-Mail-Eingang",
            href: "/docs/email-integration",
            scene: [{ label: "Sie leiten die E-Mail mit Anhang weiter" }, { label: "Sie erreicht die Adresse des Flows" }, { label: "Jeder Anhang wird ein Lauf", result: "1 Anhang → 1 Lauf" }],
          },
          {
            short: "Manueller Upload",
            via: "aus der App",
            title: "Direkt in der App hochladen",
            body: "Ziehen Sie das PDF oder Foto auf den Flow, und der Lauf startet sofort. Genau wie hier, nur mit Ihrem Konto und ohne Tageslimit.",
            linkLabel: "Flows",
            href: "/docs/flows",
            scene: [{ label: "Sie ziehen die Datei auf den Flow" }, { label: "Der Lauf startet" }, { label: "Zeilen in Sekunden", result: "wie hier, ohne Limit" }],
          },
          {
            short: "API",
            via: "POST /api/runs/process",
            title: "Aus Ihrem System, über die API",
            body: "Ein POST an /api/runs/process mit der Datei und der flow_id, authentifiziert mit Ihrem API-Key. Die Antwort ist 202 mit der run_id; Sie fragen GET /api/runs/<id> ab, bis der Status completed ist und die Zeilen zurückkommen.",
            linkLabel: "API",
            href: "/docs/api-integration",
            scene: [{ label: "POST mit Datei und flow_id" }, { label: "202: run_id, in der Warteschlange" }, { label: "GET bis completed", result: "status: completed · 6 Zeilen" }],
          },
          {
            short: "Zapier · Make · n8n",
            via: "ein HTTP-Aufruf",
            title: "Aus Zapier, Make oder n8n",
            body: "Es gibt keine native App, und es braucht auch keine: Ein HTTP-Schritt (Custom Request in Zapier, Make a request in Make) sendet die Datei an /api/runs/process. Die Zeilen kommen per Webhook in den Trigger desselben Tools zurück.",
            linkLabel: "Integrationen",
            href: "/integrations",
            scene: [{ label: "Ein HTTP-Schritt in Ihrem Szenario" }, { label: "Tavnit verarbeitet die Datei" }, { label: "Der Webhook liefert die Zeilen zurück", result: "zurück in Zapier, Make oder n8n" }],
          },
          {
            short: "Mehrere in einem PDF",
            via: "ein Splitter trennt sie",
            title: "Mehrere Dokumente in einem PDF",
            body: "Ein Splitter erkennt, wo jedes Dokument beginnt, ordnet jeden Abschnitt den Typen zu, die Sie beschreiben, und schickt ihn an seinen Flow. Enthält ein Scan drei {docs}, entstehen daraus drei Läufe.",
            linkLabel: "Splitters",
            href: "/docs/splitters",
            scene: [{ label: "Ein PDF, drei {docs}" }, { label: "Der Splitter trennt und klassifiziert" }, { label: "Drei Läufe, einer pro {doc}", result: "3 Abschnitte · 3 Läufe" }],
          },
        ],
      },
      replay: "Noch einmal abspielen",
      tryIt: "In Tavnit ausprobieren",
      tryItSignedIn: "In meinem Konto umsetzen",
      primary: "Kostenloses Konto erstellen",
      primarySignedIn: "Zu Tavnit",
      sameLogin: "Sie haben bereits ein Konto. Melden Sie sich bei Tavnit mit denselben Zugangsdaten an ({email}); Sie werden noch einmal gefragt, weil es eine andere Website ist.",
      secondary: "Demo buchen",
    },
    cleaners: {
      heading: "Mit einem Cleaner könnten Sie…",
      lead: "Einfache Regeln, die nach der Extraktion von selbst für {each_doc} laufen. Vier Ideen mit Ihren eigenen Daten:",
      tag: "Cleaners",
      ideas: [
        { icon: "date", title: "Ein einheitliches Datumsformat", from: "{date}", to: "{iso}", note: "immer dasselbe Format" },
        { icon: "sum", title: "Die Zeilen müssen die Zwischensumme ergeben", from: "Zeilen {sum}", to: "Zwischensumme {subtotal}", note: "stimmt es nicht, zahlt niemand ungeprüft", check: "sum" },
        { icon: "money", title: "In Ihre Währung umrechnen", from: "{total} {currency}", to: "Ihre Währung", note: "zum Kurs am Belegdatum" },
        { icon: "approve", title: "Freigabe ab einem Betrag", from: "Gesamt {total}", to: "vor der Zahlung freigeben", note: "wenn {threshold} überschritten wird" },
      ],
      ok: "Stimmt",
      off: "Zu prüfen",
      outro: "Cleaners werden in Tavnit mit den Feldern gebaut, die Ihnen wichtig sind. Das hier sind nur Beispiele.",
      cta: "Kostenloses Konto erstellen und ausprobieren",
      ctaSignedIn: "Tavnit öffnen und ausprobieren",
      learn: "Was ist ein Cleaner?",
    },
    after: {
      title: "Ihre Excel-Datei ist fertig",
      lead: "Sie stammt aus einem festen Flow mit {fields} Feldern. In Ihrem Konto wählen Sie die Felder selbst – und so sieht es aus, wenn Tavnit {each_doc} verarbeitet:",
      close: "Schließen",
      saved: "in Ihren Downloads gespeichert",
    },
    how: {
      heading: "So funktioniert es",
      steps: [
        {
          title: "{The_doc} hochladen",
          body: "PDF, Foto oder Scan. Jeder Lieferant, jede Sprache, jedes Layout.",
        },
        {
          title: "Tavnit liest das Dokument",
          body: "Es findet den Kopf (Lieferant, Nummer, Datum, Summen) und die Positionstabelle mit Mengen und Preisen.",
        },
        {
          title: "Prüfen und herunterladen",
          body: "Die Tabelle erscheint auf dem Bildschirm. Mit einem kostenlosen Konto nehmen Sie sie als Excel-Datei mit.",
        },
      ],
    },
    faqHeading: "Häufige Fragen",
    faqs: [
      {
        q: "Was umfasst die kostenlose Version?",
        a: "{limit} Dokumente pro Tag, mit dem vollständigen Ergebnis auf dem Bildschirm. Für den Excel-Download brauchen Sie ein Tavnit-Konto, das nichts kostet.",
      },
      {
        q: "Welche Formate werden akzeptiert?",
        a: "PDF (mit Text oder gescannt), JPG und PNG, bis 4 MB und 5 Seiten. Ist Ihr Dokument länger, laden Sie es in Teilen hoch oder erstellen Sie ein Konto.",
      },
      {
        q: "Kann ich andere Spalten wählen?",
        a: "Hier nicht: Dieses Tool nutzt einen festen Flow für {docs} mit 13 Feldern. In Ihrem Konto erstellen Sie eigene Flows, für {docs} oder jedes andere Dokument, mit den Feldern, die Sie brauchen: pro Dokument (Bestellnummer, Fälligkeitsdatum, Kostenstelle) oder pro Zeile (Artikelnummer, Rabatt). Keine Vorlagen: Sie beschreiben das Feld und geben bei Bedarf einen Hinweis, wo es steht.",
      },
      {
        q: "Muss ich für jeden Lieferanten eine Vorlage einrichten?",
        a: "Nein. Tavnit arbeitet ohne Vorlagen: Es liest jedes Dokument so, wie es kommt – auch wenn der Lieferant sein Layout morgen ändert.",
      },
      {
        q: "Was passiert mit meiner Datei?",
        a: "Sie wird in einem Tavnit-Konto verarbeitet, das ausschließlich für die kostenlosen Tools bestimmt ist und für nichts anderes genutzt wird. Nach 24 Stunden werden die Datei und die extrahierten Zeilen automatisch gelöscht; wir speichern nur, dass ein Lauf stattgefunden hat, ohne das Dokument oder seinen Inhalt. Wenn Sie die Löschung früher wünschen, schreiben Sie an support@tavnit.io.",
      },
      {
        q: "Warum braucht der Download ein Konto?",
        a: "Weil die kostenlose Version zum Ausprobieren gedacht ist. Mit einem Konto führen Sie dieselbe Extraktion für {all_your_docs} aus, empfangen sie per E-Mail und senden das Ergebnis an Ihr System.",
      },
      {
        q: "Funktioniert es für {docs} aus jedem Land?",
        a: "Ja. Es verarbeitet {docs} auf Englisch, Spanisch und in anderen Sprachen, mit oder ohne ausgewiesene Steuer. Getestet haben wir es unter anderem für {docs} aus den USA, Panama, Mexiko und Kolumbien.",
      },
      {
        q: "Wie automatisiere ich das?",
        a: "Erstellen Sie ein Konto, bauen Sie einen Flow mit den gewünschten Feldern und leiten Sie {docs} an seine E-Mail-Adresse weiter – oder binden Sie ihn über die API, Webhooks, Zapier, Make oder n8n an. Das Ergebnis landet in Ihrem ERP oder in Google Sheets, ohne dass jemand tippt.",
      },
    ],
  },

  hub: {
    title: "Kostenlose KI-Dokumenttools: Rechnung in Excel & mehr",
    description:
      "Kostenlose Tools für je eine Aufgabe, gebaut auf der Engine von Tavnit: Rechnungen in Excel umwandeln und mehr. Ohne Vorlagen, ohne Registrierung bis zum Ergebnis.",
    h1: "Kostenlose Tools",
    intro:
      "Jedes Tool erledigt eine Aufgabe mit einem Dokument und zeigt Ihnen das echte Ergebnis. Sie laufen auf derselben Engine, mit der Unternehmen ihre Dokumente in Tavnit automatisieren – nur eines nach dem anderen.",
    breadcrumbHome: "Startseite",
    breadcrumbHub: "Tools",
    groups: { extract: "Dokument in Excel", compare: "Dokumente vergleichen", split: "Scans ordnen", clean: "Tabellen bereinigen" },
    outro: "Alle laufen auf derselben Engine, mit der Unternehmen ihre Dokumente in Tavnit automatisieren. Wenn es von selbst und für alle Ihre Dokumente passieren soll, gibt es Ihr Konto.",
    outroCta: "Kostenloses Konto erstellen",
  },

  shell: {
    lite: "Lite",
    tools: "Tools",
    site: "Über Tavnit",
    cta: "Kostenloses Konto",
    ctaSignedIn: "Zu Tavnit",
    nav: { product: "Produkt", useCases: "Anwendungsfälle", docs: "Doku" },
    demo: "Demo buchen",
    signin: "Anmelden",
    allTools: "Alle Tools ansehen",
    allToolsHint: "Kostenlos. Das echte Ergebnis ohne Registrierung sehen; mit einem Konto mitnehmen.",
    groups: { extract: "Dokument in Excel", compare: "Dokumente vergleichen", split: "Scans ordnen", clean: "Tabellen bereinigen" },
    account: {
      signedInAs: "Angemeldet als",
      open: "Zu Tavnit",
      openHint: "Die komplette Plattform: Flows, Automatisierungen und Ihr gesamtes Volumen",
      signOut: "Abmelden",
      menu: "Ihr Konto",
    },
    auth: {
      title: "Erstellen Sie Ihr kostenloses Konto",
      body: "Mit demselben Konto laden Sie hier Ihre Ergebnisse herunter und automatisieren alle Ihre Dokumente in Tavnit.",
      submitSignin: "Anmelden",
      submitSignup: "Konto erstellen",
    },
    menu: "Menü",
    close: "Schließen",
    privacy: "Datenschutz",
    terms: "AGB",
    contact: "Kontakt",
    rights: "Tavnit. Kostenlose Tools auf der Engine des Produkts.",
  },

  related: {
    heading: "Wenn es um alle Dokumente geht, nicht um eines",
    lead: "Dieses Tool verarbeitet ein Dokument nach dem anderen. Dieselbe Engine kann sie per E-Mail oder API annehmen, durch die Prüfung Ihres Teams leiten und an Ihre Systeme liefern.",
    useCase: "So wird es automatisiert:",
    guide: "Leitfaden:",
  },

  tools: {
    /** Invoice → Excel. The base copy was written for this tool, so only the
     *  words — plus a <title> short enough not to be cut in search results. */
    "invoice-to-excel": {
      vocab: INVOICE_VOCAB,
      overrides: { title: "Rechnung in Excel umwandeln, kostenlos: KI liest Positionen" },
    },
    /**
     * Invoice line item extractor. Same Flow and the same words as invoice →
     * Excel; a different page, written for the people who search "line item
     * extraction": what a line item is, one row per line, the header repeated
     * on every row, and what to do with the rows afterwards.
     */
    "invoice-line-items": {
      vocab: INVOICE_VOCAB,
      overrides: {
        title: "Rechnungspositionen auslesen, kostenlos: Zeilen in Excel",
        description:
          "Lesen Sie Rechnungspositionen (Beschreibung, Menge, Einzelpreis und Betrag) als Excel-Zeilen aus, mit Lieferant, Nummer und Datum in jeder Zeile. PDF oder Foto, ohne Vorlagen, ohne Registrierung bis zum Ergebnis.",
        label: "Rechnungspositionen auslesen",
        h1: "Die Positionen einer Rechnung auslesen",
        intro:
          "Jede Zeile der Rechnungstabelle (Beschreibung, Menge, Einheit, Einzelpreis und Betrag) wird zu einer Zeile, und der Kopf (Lieferant, Nummer, Datum, Summen) wiederholt sich in jeder davon. Genau so brauchen Buchhaltung und Kreditorenbuchhaltung die Positionen, um sie zu buchen, abzustimmen oder mit einer Bestellung abzugleichen. Funktioniert mit PDFs, Scans und Fotos, ohne Vorlagen pro Lieferant.",
        drop: {
          title: "Legen Sie die Rechnung ab, deren Positionen Sie brauchen",
          sample: "Mit einer Rechnung mit sechs Zeilen ausprobieren",
        },
        stages: [
          "Rechnung wird hochgeladen",
          "Kopfdaten werden gelesen",
          "Positionstabelle wird erkannt",
          "Jede Zeile wird getrennt",
          "Gleich fertig",
        ],
        result: {
          flowNote: "Diese {fields} Spalten sind die Felder eines festen Rechnungs-Flows: Kopf und Positionen. In Ihrem Konto wählen Sie die Felder selbst.",
        },
        how: {
          heading: "So funktioniert es",
          steps: [
            {
              title: "Rechnung hochladen",
              body: "PDF mit Text, Scan oder Foto. Eine Seite oder mehrere, bis zu 5.",
            },
            {
              title: "Tavnit trennt die Zeilen",
              body: "Es findet die Tabelle auch ohne Linien, liest jede Zeile (Beschreibung, Menge, Einheit, Preis, Betrag) und hängt den Kopf an.",
            },
            {
              title: "Prüfen und herunterladen",
              body: "Eine Zeile pro Position auf dem Bildschirm. Mit einem kostenlosen Konto nehmen Sie sie als Excel-Datei mit, ohne die Spalten, die Sie nicht brauchen.",
            },
          ],
        },
        faqs: [
          {
            q: "Was ist eine Rechnungsposition?",
            a: "Jede Zeile der Detailtabelle: ein Produkt oder eine Leistung mit Beschreibung, Menge, Einheit, Einzelpreis und Betrag. Die Summen in der Fußzeile (Zwischensumme, Steuer, Gesamtbetrag) sind keine Positionen; sie erscheinen als Kopffelder, die sich in jeder Zeile wiederholen.",
          },
          {
            q: "Warum stehen Lieferant und Nummer in jeder Zeile?",
            a: "Damit jede Zeile für sich steht: Sie können die Positionen vieler Rechnungen filtern, summieren oder in ein Blatt kopieren, ohne zu verlieren, aus welcher Rechnung sie stammen. Genau diese Form erwarten ein ERP, eine Pivot-Tabelle oder ein Abgleich.",
          },
          {
            q: "Funktioniert es, wenn die Tabelle über mehrere Seiten geht?",
            a: "Ja. Tavnit verfolgt die Tabelle von einer Seite zur nächsten und gibt alle Zeilen der Reihe nach zurück, ohne den Spaltenkopf als Zeile zu wiederholen. Die kostenlose Version verarbeitet bis zu 5 Seiten.",
          },
          {
            q: "Was ist mit umbrochenen Beschreibungen oder verbundenen Zellen?",
            a: "Eine Beschreibung, die in der nächsten Zeile weitergeht, wird ihrer Position zugeordnet; eine verbundene Zelle gilt für alle Zeilen, die sie abdeckt. Wir verlassen uns nicht auf die Linien der Tabelle, sondern lesen, welche Menge, welcher Preis und welcher Betrag zu welcher Beschreibung gehören.",
          },
          {
            q: "Wie werden Rabatte und Steuern pro Zeile behandelt?",
            a: "Der Betrag jeder Zeile wird so übernommen, wie er gedruckt ist. Ein Rabatt oder eine Steuer, die die Rechnung als eigene Zeile ausweist, wird nicht zur Position, sondern als Dokumentsumme behandelt. Weisen Ihre Rechnungen die Steuer pro Zeile aus, können Sie dieses Feld mit einem Konto zum Flow hinzufügen.",
          },
          {
            q: "Kann ich die Zeilen mit meiner Bestellung abgleichen?",
            a: "Ja, mit dem kostenlosen Abgleich Bestellung vs. Rechnung (/tools/po-vs-invoice-check): Laden Sie beide Dokumente hoch, und das Tool markiert Zeilen mit abweichendem Preis oder abweichender Menge, fehlende und hinzugekommene Zeilen.",
          },
          {
            q: "Brauche ich eine Vorlage pro Lieferant?",
            a: "Nein. Tavnit liest jede Rechnung so, wie sie kommt; gestaltet der Lieferant sie morgen um, funktioniert es trotzdem. Deshalb verarbeitet es auch Rechnungen aus verschiedenen Ländern und Sprachen gleich gut.",
          },
          {
            q: "Wie mache ich das für Hunderte von Rechnungen?",
            a: "Mit einem Konto erstellen Sie einen Flow mit genau diesen Feldern (oder Ihren eigenen) und leiten Rechnungen an seine E-Mail-Adresse weiter oder senden sie über die API. Jede Rechnung landet als Zeilen in Ihrem ERP, in Google Sheets oder in einem Bucket, ohne dass jemand tippt.",
          },
        ],
      },
    },
    /**
     * PO vs invoice check. Two documents through one "purchase document" Flow,
     * then the Matcher pairs every PO line with the invoice line that means the
     * same thing and the page shows the differences: price, quantity, missing
     * on the invoice, not on the PO. The base's document word stays "invoice"
     * because that is what the shared blocks (email intake, review, agents…)
     * talk about; everything the visitor sees first is overridden here.
     */
    "po-invoice-check": {
      vocab: INVOICE_VOCAB,
      overrides: {
        title: "Bestellung vs. Rechnung prüfen, kostenlos: Zeile für Zeile",
        description:
          "Laden Sie die Bestellung und die Rechnung hoch, und Tavnit gleicht sie Zeile für Zeile ab: Preisabweichungen, Mengenabweichungen, Zeilen, die auf der Rechnung fehlen, und Zeilen, die nicht bestellt wurden. Kostenlos, ohne Vorlagen, ohne Registrierung bis zum Ergebnis.",
        label: "Bestellung vs. Rechnung",
        h1: "Eine Rechnung mit ihrer Bestellung abgleichen",
        intro:
          "Laden Sie die Bestellung und die Rechnung als PDF oder Foto hoch. Tavnit liest beide, ordnet jede Bestellzeile der Rechnungszeile zu, die dasselbe meint – auch wenn der Text abweicht – und markiert, wo sich der Preis geändert hat, wo die Menge abweicht, was auf der Rechnung fehlt und was nie bestellt wurde.",
        trust: ["Eine Bestellung und eine Rechnung · PDF oder Foto", "{limit} kostenlose Dokumente pro Tag", "Nach 24 h wird alles gelöscht"],
        drop: {
          title: "Legen Sie das Dokument hier ab",
          sample: "Mit Beispiel-Bestellung und -Rechnung ausprobieren",
          formats: "PDF, JPG oder PNG · bis 4 MB und 5 Seiten pro Dokument",
        },
        stages: ["Dokumente werden hochgeladen", "Bestellung wird gelesen", "Rechnung wird gelesen", "Zeilen werden zugeordnet", "Gleich fertig"],
        result: {
          another: "Andere Dokumente vergleichen",
          download: "Vergleich als Excel herunterladen",
          flowNote: "Diese {fields} Spalten sind die Felder eines festen Flows für Einkaufsdokumente. In Ihrem Konto wählen Sie die Felder selbst.",
          ghostHint: "In Tavnit fügen Sie die Felder hinzu, die Sie brauchen: Kostenstelle, Wareneingangsnummer, Projekt…",
        },
        errors: {
          no_lines: "In einem der beiden Dokumente haben wir keine Zeilen mit Mengen und Preisen gefunden. Prüfen Sie, ob es sich um eine Bestellung und eine Rechnung mit Positionstabelle handelt.",
          not_ready: "Wir lesen die Dokumente noch. Warten Sie einen Moment und versuchen Sie es erneut.",
          failed: "Eines der Dokumente konnten wir nicht lesen. Probieren Sie andere Dateien oder die Beispiele.",
          too_large: "Eine der Dateien ist größer als 4 MB. Komprimieren Sie sie oder laden Sie nur die Seiten des Dokuments hoch.",
        },
        next: {
          lead: "Das waren eine Bestellung und eine Rechnung. Mit einem Konto wird jede eingehende Rechnung von selbst mit ihrer Bestellung abgeglichen, und das Ergebnis endet nicht in einer Excel-Datei: Es läuft weiter.",
          source: "Ihre Bestellung und Rechnung",
          flow: {
            name: "Einkaufsdokument",
            add: { name: "receipt_number", type: "Text", hint: "Neben „Receipt“ · z. B. REC-1187", save: "Speichern", value: "REC-1187" },
          },
          inputs: { show: "Wie bringen Sie Ihre Dokumente zu Tavnit?" },
        },
        cleaners: {
          heading: "Mit einem Cleaner könnten Sie…",
          lead: "Einfache Regeln, die bei jedem Abgleich von selbst laufen. Vier Ideen:",
          ideas: [
            { icon: "alert", title: "Rechnung sperren, wenn ein Preis um mehr als 2 % steigt", from: "Bestellpreis 22.40", to: "Rechnung 23.90", note: "die Abweichung wird markiert, bevor jemand zahlt" },
            { icon: "approve", title: "Freigabe bei abweichender Menge", from: "Bestellung 300 Stück", to: "Rechnung 280", note: "der Einkauf bestätigt Teillieferung oder Fehler" },
            { icon: "mail", title: "E-Mail mit den Abweichungen an den Einkauf", from: "Abgleich erledigt", to: "E-Mail an einkauf@", note: "nur wenn es etwas zu prüfen gibt" },
            { icon: "sum", title: "Rechnungssumme gegen Bestellsumme", from: "Bestellung 5,189.07", to: "Rechnung 4,960.63", note: "stimmt es nicht, stoppt es vor dem Buchen" },
          ],
          outro: "Cleaners werden in Tavnit mit den Feldern gebaut, die Ihnen wichtig sind. Das hier sind nur Beispiele.",
        },
        after: {
          lead: "Sie stammt aus einem festen Flow mit {fields} Feldern und einem Matcher. In Ihrem Konto wählen Sie die Felder selbst – und so sieht es aus, wenn Tavnit jede eingehende Rechnung prüft:",
        },
        how: {
          heading: "So funktioniert es",
          steps: [
            { title: "Beide Dokumente hochladen", body: "Die Bestellung und die Rechnung, als PDF oder Foto. Jeder Lieferant, jede Sprache, jedes Layout." },
            { title: "Tavnit liest beide mit einem Flow", body: "Kopf (Nummer, Datum, Lieferant, Summen) und jede Zeile mit Menge und Preis, bei beiden." },
            { title: "Der Matcher ordnet die Zeilen zu", body: "Jede Bestellzeile wird mit der Rechnungszeile verbunden, die dasselbe meint, und Preis und Menge werden verglichen. Mit Ihrem Konto nehmen Sie den Vergleich als Excel-Datei mit." },
          ],
        },
        faqs: [
          {
            q: "Was umfasst die kostenlose Version?",
            a: "{limit} Dokumente pro Tag (ein Abgleich verbraucht zwei), mit dem vollständigen Ergebnis auf dem Bildschirm. Für den Download des Vergleichs als Excel brauchen Sie ein Tavnit-Konto, das nichts kostet.",
          },
          {
            q: "Wie werden Zeilen zugeordnet, wenn der Text nicht identisch ist?",
            a: "Ein Tavnit-Matcher vergleicht Beschreibungen nach ihrer Bedeutung, nicht Buchstabe für Buchstabe: „Long grain rice 20 lb“ und „RICE L/GRAIN PREMIUM 20LB“ sind dieselbe Zeile. Sind zwei Beschreibungen ähnlich, aber nicht eindeutig, entscheidet ein zweiter Schritt, ob es derselbe Artikel ist.",
          },
          {
            q: "Welche Toleranz gilt bei Preisen?",
            a: "Ein Preis gilt als abweichend, wenn er sich um mehr als 0,5 % oder mehr als einen Cent unterscheidet. Mengen werden exakt verglichen. Mit Ihrem Konto legen Sie Ihre eigene Toleranz mit einem Cleaner fest.",
          },
          {
            q: "Was bedeuten „Fehlt auf der Rechnung“ und „Nicht in der Bestellung“?",
            a: "„Fehlt auf der Rechnung“ ist eine Bestellzeile, die der Lieferant nicht berechnet hat (Teil- oder ausstehende Lieferung). „Nicht in der Bestellung“ ist eine berechnete Zeile, die in dieser Bestellung niemand bestellt hat.",
          },
          {
            q: "Ist ein Drei-Wege-Abgleich mit dem Wareneingang möglich?",
            a: "Hier nicht: Die kostenlose Version vergleicht zwei Dokumente. Mit Ihrem Konto fügen Sie den Wareneingangsschein als drittes Dokument desselben Flows hinzu und der Matcher prüft alle drei – oder Sie bauen Cleaner-Regeln, damit die Rechnung erst gebucht wird, wenn der Wareneingang passt.",
          },
          {
            q: "Welche Formate werden akzeptiert?",
            a: "PDF (mit Text oder gescannt), JPG und PNG, bis 4 MB und 5 Seiten pro Dokument. Es funktioniert mit Bestellungen aus einem ERP und Rechnungen jedes Lieferanten.",
          },
          {
            q: "Was passiert mit meinen Dateien?",
            a: "Sie werden in einem Tavnit-Konto verarbeitet, das ausschließlich für die kostenlosen Tools bestimmt ist und für nichts anderes genutzt wird. Nach 24 Stunden werden die Dateien und der Vergleich gelöscht; wir speichern nur, dass ein Lauf stattgefunden hat, ohne die Dokumente oder ihren Inhalt.",
          },
          {
            q: "Wie automatisiere ich das?",
            a: "Erstellen Sie ein Konto, bauen Sie einen Flow für Ihre Einkaufsdokumente und darauf einen Matcher. Rechnungen kommen per E-Mail oder API herein, werden ihrer Bestellung zugeordnet, und die Abweichungen gehen per E-Mail, Webhook oder direkt in Ihr ERP – ohne dass jemand tippt.",
          },
        ],
        compare: {
          slots: [
            { title: "Bestellung", hint: "PDF oder Foto der Bestellung", sample: "Beispiel-Bestellung" },
            { title: "Rechnung", hint: "PDF oder Foto der Rechnung", sample: "Beispiel-Rechnung" },
          ],
          run: "Vergleichen",
          sampleAll: "Mit Beispiel-Bestellung und -Rechnung ausprobieren",
          stages: ["Bestellung und Rechnung werden gelesen", "Zeilen werden sortiert", "Der Matcher ordnet die Zeilen zu", "Gleich fertig"],
          heading: "Vergleich fertig",
          summary: "{n} · {ref} vs. {doc}",
          labels: {
            description: "Beschreibung",
            quantity: "Menge",
            price: "Preis",
            total: "Gesamt",
            status: "Status",
            ref: "Bestellung",
            doc: "Rechnung",
            supplier: "Lieferant",
            champion: "Champion",
            wins: "{n} Zeilen gewonnen",
            lines: ["Zeile", "Zeilen"],
          },
          status: {
            ok: "Stimmt",
            price: "Preis weicht ab",
            qty: "Menge weicht ab",
            both: "Preis und Menge weichen ab",
            missing: "Fehlt auf der Rechnung",
            extra: "Nicht in der Bestellung",
          },
          empty: "Wir konnten keine Zeilen zuordnen. Prüfen Sie, ob beide Dokumente eine Positionstabelle mit Mengen und Preisen haben.",
          another: "Andere Dokumente vergleichen",
          download: "Vergleich als Excel herunterladen",
        },
      },
    },
    /**
     * Split a scanned PDF into its documents. The one Lite tool that is a
     * Splitter, not a Flow: the result is a list of documents, each with its
     * page range and type, downloadable one by one or as a zip. The shared
     * blocks (auth, errors, the "and then what?" outcomes) stay; what talks
     * about rows and columns is overridden here.
     */
    "split-scanned-pdf": {
      vocab: {
        doc: "gescanntes PDF",
        docs: "gescannte PDFs",
        a_doc: "ein gescanntes PDF",
        the_doc: "das PDF",
        the_docs: "die PDFs",
        your_doc: "Ihr PDF",
        your_docs: "Ihre PDFs",
        all_your_docs: "alle Ihre PDFs",
        all_docs: "alle PDFs",
        each_doc: "jedes PDF",
        another_doc: "ein weiteres PDF",
        this_doc: "dieses PDF",
      },
      overrides: {
        title: "Gescanntes PDF in Dokumente aufteilen, kostenlos (KI)",
        description:
          "Laden Sie ein PDF mit mehreren zusammen gescannten Dokumenten hoch (Rechnungen, Bestellungen, Belege, Verträge) und erhalten Sie jedes Dokument einzeln zurück, nach Typ klassifiziert. Kostenlos, ohne Seiten zu markieren.",
        label: "Gescanntes PDF aufteilen",
        h1: "Ein gescanntes PDF in seine Dokumente aufteilen",
        intro:
          "Sie haben zehn Blätter durch den Scanner gejagt und ein einziges PDF bekommen. Laden Sie es hoch: Tavnit liest jede Seite, erkennt, wo jedes Dokument beginnt, und gibt sie Ihnen einzeln zurück, jedes mit seinem Typ (Rechnung, Bestellung, Beleg, Packliste, Konnossement, Vertrag…). Kein Aufteilen nach Seitenzahl, nichts von Hand zu markieren.",
        trust: ["Ein PDF · bis 12 Seiten", "{limit} kostenlose Dokumente pro Tag", "Nach 24 h wird alles gelöscht"],
        drop: {
          title: "Legen Sie Ihr gescanntes PDF hier ab",
          hint: "ein PDF mit mehreren Dokumenten darin",
          choose: "Datei wählen",
          sample: "Mit einem Beispiel-Scan ausprobieren",
          formats: "PDF · bis 4 MB und 12 Seiten",
        },
        stages: ["PDF wird hochgeladen", "Jede Seite wird gelesen", "Dokumentanfänge werden gesucht", "Wird klassifiziert", "Gleich fertig"],
        result: {
          retention: "wird nach 24 h automatisch gelöscht",
          downloading: "Datei wird vorbereitet",
          another: "Weiteres PDF aufteilen",
          empty: "In diesem PDF haben wir nicht mehr als ein Dokument gefunden.",
          flowNote: "Diese Typen gehören zum festen Splitter dieses Tools. In Ihrem Konto legen Sie die Typen selbst fest.",
        },
        errors: {
          too_large: "Die Datei ist größer als 4 MB. Komprimieren Sie sie oder teilen Sie den Scan in zwei Teile.",
          too_many_pages: "Die kostenlose Version teilt bis zu 12 Seiten pro PDF auf. Mit einem Konto gibt es kein Limit.",
          unsupported: "Wir akzeptieren nur PDF, JPG oder PNG. Um Dokumente aufzuteilen, laden Sie das PDF aus dem Scanner hoch.",
          failed: "Wir konnten dieses PDF nicht aufteilen. Probieren Sie einen anderen Scan oder das Beispiel.",
          empty: "Die Datei ist leer.",
        },
        next: {
          lead: "Das war ein PDF. Mit einem Konto geht jedes Dokument, das der Splitter heraustrennt, an seinen eigenen Flow: die Rechnung in die Rechnungsextraktion, die Bestellung in ihre, der Beleg in die Spesenabrechnung. Niemand trennt oder sortiert mehr von Hand.",
          source: "Ihr PDF",
          flow: {
            title: "Vom Splitter zum Flow: jedes Dokument in seine Extraktion",
            body: "Ein Splitter erkennt, wo jedes Dokument beginnt, und ordnet es den Typen zu, die Sie in Worten beschreiben. Dieses Tool nutzt einen festen Splitter mit acht Typen und ohne Ausgaben: Er gibt Ihnen nur die Dokumente zurück. In Ihrem Konto definieren Sie eigene Typen und legen für jeden fest, wohin er geht: an einen Flow, der seine Felder extrahiert (wie unten, mit {fields} Feldern), an eine E-Mail-Adresse oder an eine Collection. Keine Vorlagen, keine Koordinaten.",
            linkLabel: "So funktioniert ein Splitter",
            href: "/docs/splitters",
          },
          inputs: {
            show: "Wie bringen Sie Ihr PDF zu Tavnit?",
          },
        },
        cleaners: {
          heading: "Nach dem Aufteilen, in Tavnit…",
          lead: "Jeder Dokumenttyp kann sein eigenes Ziel haben, ohne dass jemand von Hand sortiert. Vier Beispiele:",
          ideas: [
            { icon: "text", title: "Jede Rechnung in ihren Flow und weiter ins ERP", from: "Rechnung (S. 1–2)", to: "Rechnungs-Flow → ERP", note: "extrahiert und gebucht, ohne Handarbeit" },
            { icon: "mail", title: "Belege in die Spesenabrechnung", from: "Beleg (S. 5)", to: "spesen@ihrefirma", note: "jeder Beleg erreicht, wer ihn abrechnet" },
            { icon: "calendar", title: "Verträge mit ihren Fristen ins Rechtsarchiv", from: "Vertrag (S. 6–7)", to: "Vertrags-Flow", note: "Ablauf und Verlängerung in einer Tabelle" },
            { icon: "alert", title: "Ein Hinweis, wenn etwas nicht erkannt wird", from: "nicht klassifizierte Seite", to: "Manuelle Prüfung", note: "nichts geht verloren oder landet falsch" },
          ],
          outro: "Ziele werden in Tavnit pro Dokumenttyp festgelegt. Das hier sind nur Beispiele.",
          cta: "Kostenloses Konto erstellen und einrichten",
          ctaSignedIn: "Tavnit öffnen und einrichten",
          learn: "Was ist ein Splitter?",
        },
        after: {
          title: "Ihre Dokumente sind fertig",
          lead: "Sie stammen aus einem festen Splitter mit acht Typen. In Ihrem Konto legen Sie die Typen fest, und jedes Dokument geht von selbst an seinen Flow:",
          close: "Schließen",
        },
        how: {
          heading: "So funktioniert es",
          steps: [
            { title: "Scan hochladen", body: "Ein PDF mit mehreren Dokumenten darin, genau so, wie es aus dem Scanner kam. Beliebige Reihenfolge, beliebig viele Seiten pro Dokument." },
            { title: "Tavnit teilt auf und klassifiziert", body: "Es liest jede Seite, erkennt, wo jedes Dokument beginnt, und weist ihm einen Typ zu: Rechnung, Bestellung, Beleg, Packliste, Konnossement, Vertrag, Gutschrift oder Sonstiges." },
            { title: "Jedes Dokument herunterladen", body: "Sie sehen die Liste mit Seitenbereichen und Typen. Mit einem kostenlosen Konto laden Sie jedes PDF einzeln herunter oder alle zusammen als ZIP." },
          ],
        },
        faqs: [
          {
            q: "Woher weiß es, wo ein Dokument endet und das nächste beginnt?",
            a: "Die KI betrachtet alle Seiten zusammen, so wie ein Mensch es tun würde: Wechsel im Briefkopf, im Unternehmen, in der Seitennummerierung, im Layout. Sie zählt keine Seiten und sucht keine Markierungen – deshalb funktioniert es auch, wenn eine Rechnung zwei Seiten hat und der Beleg nur eine.",
          },
          {
            q: "Welche Dokumenttypen erkennt es?",
            a: "Hier acht: Rechnung, Bestellung, Beleg, Packliste, Konnossement, Vertrag, Gutschrift und Sonstiges. Mit einem Konto definieren Sie eigene Typen, indem Sie sie in Worten beschreiben, und legen für jeden fest, wohin er geht: an einen Flow, der seine Daten extrahiert, an eine E-Mail-Adresse oder an eine Collection.",
          },
          {
            q: "Was umfasst die kostenlose Version?",
            a: "{limit} Dokumente pro Tag, mit dem vollständigen Ergebnis auf dem Bildschirm. Für den Download der getrennten PDFs brauchen Sie ein Tavnit-Konto, das nichts kostet.",
          },
          {
            q: "Wie viele Seiten kann ich hochladen?",
            a: "In der kostenlosen Version bis zu 12 Seiten pro PDF und bis 4 MB. Mit einem Konto gibt es kein Seitenlimit, und Sie können Scans direkt per E-Mail an den Splitter schicken.",
          },
          {
            q: "Funktioniert es mit schlechten Scans oder gemischten Sprachen?",
            a: "Ja. Es kommt mit schiefen, graustufigen und abgestempelten Scans zurecht, ebenso mit Dokumenten auf Englisch, Spanisch oder in anderen Sprachen im selben PDF. Kann eine Seite nicht gelesen werden, wird sie als nicht klassifiziert markiert, statt einen erfundenen Typ zu bekommen.",
          },
          {
            q: "Was passiert mit meiner Datei?",
            a: "Sie wird in einem Tavnit-Konto verarbeitet, das ausschließlich für die kostenlosen Tools bestimmt ist und für nichts anderes genutzt wird. Nach 24 Stunden werden das PDF und die getrennten Dokumente automatisch gelöscht; wir speichern nur, dass ein Lauf stattgefunden hat, ohne die Datei oder ihren Inhalt. Wenn Sie die Löschung früher wünschen, schreiben Sie an support@tavnit.io.",
          },
          {
            q: "Warum braucht der Download ein Konto?",
            a: "Weil die kostenlose Version zum Ausprobieren gedacht ist. Mit einem Konto teilen Sie jeden Scan auf, schicken jedes Dokument an seinen Flow und erhalten die extrahierten Daten in Ihrem ERP oder per E-Mail.",
          },
          {
            q: "Wie automatisiere ich das?",
            a: "Erstellen Sie ein Konto, bauen Sie einen Splitter mit Ihren Dokumenttypen und leiten Sie Scans an seine E-Mail-Adresse weiter – oder binden Sie ihn über die API an. Jedes Dokument, das er heraustrennt, geht von selbst an seinen Flow und von dort in Ihr ERP, in Google Sheets oder in ein Postfach.",
          },
        ],
        split: {
          heading: "Fertig: {file}",
          summary: "{n} auf {pages}",
          segmentWord: ["Dokument", "Dokumente"],
          pageWord: ["Seite", "Seiten"],
          pages: "S. {from}–{to}",
          pageOne: "S. {from}",
          unmatched: "Nicht klassifiziert",
          type: "Typ",
          reason: "Warum",
          download: "Herunterladen",
          downloadAll: "Alle herunterladen (ZIP)",
          stages: ["PDF wird hochgeladen", "Jede Seite wird gelesen", "Dokumentanfänge werden gesucht", "Wird klassifiziert", "Gleich fertig"],
          empty: "In diesem PDF haben wir nicht mehr als ein Dokument gefunden.",
          another: "Weiteres PDF aufteilen",
        },
      },
    },
    /**
     * Packing list → Excel. Shipment header (shipper, consignee, ports, totals)
     * once per document and one row per goods line with packages, net and gross
     * weight and dimensions. Everything not overridden here comes from the base
     * copy with the words below filled in.
     */
    "packing-list-to-excel": {
      vocab: {
        doc: "Packliste",
        docs: "Packlisten",
        a_doc: "eine Packliste",
        the_doc: "die Packliste",
        the_docs: "die Packlisten",
        your_doc: "Ihre Packliste",
        your_docs: "Ihre Packlisten",
        all_your_docs: "alle Ihre Packlisten",
        all_docs: "alle Packlisten",
        each_doc: "jede Packliste",
        another_doc: "eine weitere Packliste",
        this_doc: "diese Packliste",
      },
      overrides: {
        title: "Packliste in Excel, kostenlos: KI liest jede Zeile",
        description:
          "Laden Sie eine Packliste als PDF oder Foto hoch und erhalten Sie jede Zeile als Excel-Tabelle: Beschreibung, Menge, Packstücke, Netto- und Bruttogewicht, Abmessungen, mit Versender, Empfänger und Häfen. Kostenlos, ohne Vorlagen, ohne Registrierung bis zum Ergebnis.",
        label: "Packliste in Excel",
        h1: "Verwandeln Sie eine Packliste in eine Excel-Tabelle",
        intro:
          "Laden Sie das PDF oder Foto hoch. Tavnit liest den Sendungskopf (Versender, Empfänger, Häfen, Summen) und jede Warenzeile mit Packstücken, Gewichten und Abmessungen und gibt alles als Tabelle zurück. Keine Vorlagen pro Lieferant: Dasselbe Tool funktioniert für die Packlisten all Ihrer Sendungen.",
        drop: {
          title: "Legen Sie Ihre Packliste hier ab",
          sample: "Mit einer Beispiel-Packliste ausprobieren",
        },
        stages: ["Dokument wird hochgeladen", "Sendungskopf wird gelesen", "Warenzeilen werden gesucht", "Spalten werden geordnet", "Gleich fertig"],
        result: {
          empty: "In diesem Dokument haben wir keine Warenzeilen gefunden. Probieren Sie eine Packliste mit Packstücken, Gewichten oder Mengen pro Zeile.",
          flowNote: "Diese {fields} Spalten sind die Felder eines festen Flows für Packlisten. In Ihrem Konto wählen Sie die Felder selbst.",
          ghostHint: "In Tavnit fügen Sie die Felder hinzu, die Sie brauchen: Container, Markierungen, HS-Code, B/L-Nummer…",
        },
        next: {
          lead: "Das war eine Packliste. Mit einem Konto verarbeitet Tavnit jede eingehende Packliste genauso, und die Zeilen enden nicht in einer Excel-Datei: Sie laufen von selbst weiter.",
          source: "Ihre Packliste",
          flow: {
            name: "Packliste",
            add: { name: "container", type: "Text", hint: "Neben „Container“ · z. B. MSKU-4417", save: "Speichern", value: "MSKU-4417" },
          },
          inputs: { show: "Wie bringen Sie Ihre Packliste zu Tavnit?" },
        },
        cleaners: {
          lead: "Einfache Regeln, die nach der Extraktion von selbst für jede Packliste laufen. Vier Ideen mit Ihren eigenen Daten:",
          ideas: [
            { icon: "date", title: "Ein einheitliches Datumsformat", from: "{date}", to: "{iso}", note: "jede Packliste im selben Format" },
            { icon: "alert", title: "Brutto muss über netto liegen", from: "netto > brutto", to: "zu prüfen", note: "eine vertauschte Zeile wird nie ungesehen deklariert" },
            { icon: "calendar", title: "Hinweis vor dem Auslaufen", from: "Versanddatum", to: "Erinnerung 2 Tage vorher", note: "an Ihren Zollagenten und die Logistik" },
            { icon: "mail", title: "Kopie an den Zollagenten", from: "extrahierte Packliste", to: "E-Mail mit der Excel-Datei", note: "zusammen mit der zugehörigen Rechnung" },
          ],
        },
        after: {
          lead: "Sie stammt aus einem festen Flow mit {fields} Feldern. In Ihrem Konto wählen Sie die Felder selbst – und so sieht es aus, wenn Tavnit jede Packliste verarbeitet:",
        },
        how: {
          steps: [
            { title: "Packliste hochladen", body: "PDF, Foto oder Scan. Jeder Versender, jede Sprache, jedes Layout." },
            {
              title: "Tavnit liest sie aus",
              body: "Es findet den Kopf (Versender, Empfänger, Häfen, Summen) und die Warentabelle mit Packstücken, Nettogewicht, Bruttogewicht und Abmessungen pro Zeile.",
            },
            { title: "Prüfen und herunterladen", body: "Die Tabelle erscheint auf dem Bildschirm. Mit einem kostenlosen Konto nehmen Sie sie als Excel-Datei mit." },
          ],
        },
        faqs: [
          {
            q: "Was umfasst die kostenlose Version?",
            a: "{limit} Dokumente pro Tag, mit dem vollständigen Ergebnis auf dem Bildschirm. Für den Excel-Download brauchen Sie ein Tavnit-Konto, das nichts kostet.",
          },
          {
            q: "Welche Formate werden akzeptiert?",
            a: "PDF (mit Text oder gescannt), JPG und PNG, bis 4 MB und 5 Seiten. Ist Ihre Packliste länger, laden Sie sie in Teilen hoch oder erstellen Sie ein Konto.",
          },
          {
            q: "Welche Spalten werden aus einer Packliste extrahiert?",
            a: "Pro Dokument: Versender, Empfänger, Nummer, Datum, zugehörige Rechnung, Verladehafen, Löschhafen sowie die Summen von Packstücken und Gewichten. Pro Zeile: Beschreibung, Menge, Einheit, Packstücke, Nettogewicht, Bruttogewicht und Abmessungen. Die Dokumentwerte wiederholen sich in jeder Zeile, damit sich die Tabelle direkt filtern lässt.",
          },
          {
            q: "Kann ich andere Spalten wählen?",
            a: "Hier nicht: Dieses Tool nutzt einen festen Flow für Packlisten mit 17 Feldern. In Ihrem Konto erstellen Sie eigene Flows, für Packlisten oder jedes andere Dokument, mit den Feldern, die Sie brauchen: pro Dokument (Container, Plombe, B/L-Nummer, Incoterm) oder pro Zeile (Markierungen, HS-Code, Volumen). Keine Vorlagen: Sie beschreiben das Feld und geben bei Bedarf einen Hinweis, wo es steht.",
          },
          {
            q: "Funktioniert es für Packlisten aus jedem Land?",
            a: "Ja. Es verarbeitet Packlisten auf Englisch, Spanisch und in anderen Sprachen, mit Gewichten in kg oder lb und Maßen in cm oder Zoll, genau wie gedruckt. Getestet haben wir es unter anderem für Sendungen aus Panama, Kolumbien, Mexiko, China und den USA.",
          },
          {
            q: "Muss ich für jeden Lieferanten eine Vorlage einrichten?",
            a: "Nein. Tavnit arbeitet ohne Vorlagen: Es liest jedes Dokument so, wie es kommt – auch wenn der Versender das Layout seiner Packliste morgen ändert.",
          },
          {
            q: "Was passiert mit meiner Datei?",
            a: "Sie wird in einem Tavnit-Konto verarbeitet, das ausschließlich für die kostenlosen Tools bestimmt ist und für nichts anderes genutzt wird. Nach 24 Stunden werden die Datei und die extrahierten Zeilen automatisch gelöscht; wir speichern nur, dass ein Lauf stattgefunden hat, ohne das Dokument oder seinen Inhalt. Wenn Sie die Löschung früher wünschen, schreiben Sie an support@tavnit.io.",
          },
          {
            q: "Wie automatisiere ich das?",
            a: "Erstellen Sie ein Konto, bauen Sie einen Flow mit den gewünschten Feldern und leiten Sie Packlisten an seine E-Mail-Adresse weiter – oder binden Sie ihn über die API, Webhooks, Zapier, Make oder n8n an. Jede Sendung landet in Ihrem Zollsystem, Ihrem ERP oder in Google Sheets, ohne dass jemand tippt.",
          },
        ],
      },
    },
    /**
     * Bill of lading → Excel. Everything that is specific to an ocean B/L:
     * header fields, one row per container line, customs and forwarder use
     * cases. German trade says "Konnossement" or simply "B/L".
     */
    "bill-of-lading-to-excel": {
      vocab: {
        doc: "Konnossement",
        docs: "Konnossemente",
        a_doc: "ein Konnossement",
        the_doc: "das Konnossement",
        the_docs: "die Konnossemente",
        your_doc: "Ihr Konnossement",
        your_docs: "Ihre Konnossemente",
        all_your_docs: "alle Ihre Konnossemente",
        all_docs: "alle Konnossemente",
        each_doc: "jedes Konnossement",
        another_doc: "ein weiteres Konnossement",
        this_doc: "dieses Konnossement",
      },
      overrides: {
        title: "Konnossement in Excel, kostenlos: B/L-Daten auslesen",
        description:
          "Laden Sie ein Konnossement (B/L) als PDF oder Foto hoch und erhalten Sie seine Daten als Excel-Tabelle: B/L-Nummer, Reederei, Ablader, Empfänger, Schiff, Häfen und eine Zeile pro Container mit Plombe, Ware, Packstücken, Gewicht und Volumen. Kostenlos, ohne Vorlagen, ohne Registrierung bis zum Ergebnis.",
        label: "Konnossement in Excel",
        h1: "Verwandeln Sie ein Konnossement in eine Excel-Tabelle",
        intro:
          "Laden Sie das PDF oder Foto des B/L hoch. Tavnit liest den Kopf (B/L-Nummer, Reederei, Ablader, Empfänger, Schiff, Reise, Häfen, An-Bord-Datum) und jede Ladungszeile mit Container, Plombe, Packstücken, Bruttogewicht und Volumen und gibt alles als Tabelle zurück. Keine Vorlagen pro Reederei: Derselbe Flow liest MSC, Maersk, Hapag-Lloyd oder jeden NVOCC.",
        drop: {
          title: "Legen Sie Ihr Konnossement hier ab",
          sample: "Mit einem Beispiel-B/L ausprobieren",
        },
        stages: ["Dokument wird hochgeladen", "B/L-Kopf wird gelesen", "Ladungszeilen werden gesucht", "Spalten werden geordnet", "Gleich fertig"],
        result: {
          empty: "In diesem Dokument haben wir keine Ladungszeilen gefunden. Probieren Sie ein Konnossement mit Container- und Warentabelle.",
          flowNote: "Diese {fields} Spalten sind die Felder eines festen Flows für Konnossemente. In Ihrem Konto wählen Sie die Felder selbst.",
          ghostHint: "In Tavnit fügen Sie die Felder hinzu, die Sie brauchen: Incoterm, Lieferort, Buchungsnummer, ETA…",
          another: "Weiteres Konnossement verarbeiten",
        },
        errors: {
          too_large: "Die Datei ist größer als 4 MB. Komprimieren Sie sie oder laden Sie nur die Seiten des B/L hoch.",
        },
        next: {
          lead: "Das war ein Konnossement. Mit einem Konto verarbeitet Tavnit jedes eingehende B/L jeder Reederei und jedes Agenten genauso, und die Daten enden nicht in einer Excel-Datei: Sie laufen von selbst weiter in Ihr Zoll- oder Speditionssystem.",
          source: "Ihr B/L",
          flow: {
            name: "Konnossement",
            add: { name: "incoterm", type: "Text", hint: "Neben „Incoterm“ · z. B. CIF Manzanillo", save: "Speichern", value: "CIF" },
          },
          inputs: { show: "Wie bringen Sie Ihr B/L zu Tavnit?" },
        },
        cleaners: {
          lead: "Einfache Regeln, die nach der Extraktion von selbst für jedes Konnossement laufen. Vier Ideen mit Ihren eigenen Daten:",
          ideas: [
            { icon: "date", title: "Ein einheitliches Format für das An-Bord-Datum", from: "{date}", to: "{iso}", note: "jedes B/L im selben Format" },
            { icon: "alert", title: "Bruttogewicht außerhalb des Rahmens", from: "Bruttogewicht pro Container", to: "Markierung über 26,000 kg", note: "damit niemand einen Lkw bucht, der es nicht tragen kann" },
            { icon: "calendar", title: "Hinweis vor der Ankunft", from: "An-Bord-Datum + Transitzeit", to: "Erinnerung 5 Tage vorher", note: "damit die Zollanmeldung steht, bevor das Schiff anlegt" },
            { icon: "mail", title: "Direkt an den Zollagenten", from: "extrahiertes B/L", to: "E-Mail mit der Tabelle im Anhang", note: "an die Zollagentur, ohne dass jemand etwas weiterleitet" },
          ],
        },
        after: {
          lead: "Sie stammt aus einem festen Flow mit {fields} Feldern. In Ihrem Konto wählen Sie die Felder selbst – und so sieht es aus, wenn Tavnit jedes Konnossement verarbeitet:",
        },
        how: {
          steps: [
            { title: "B/L hochladen", body: "PDF, Foto oder Scan. Jede Reederei, jeder Agent, jedes Formularlayout." },
            { title: "Tavnit liest es aus", body: "Es findet den Kopf (B/L-Nummer, Parteien, Schiff, Reise, Häfen, An-Bord-Datum, Frachtbedingungen) und die Ladungstabelle: eine Zeile pro Container mit Plombe, Ware, Packstücken, Gewicht und Volumen." },
            { title: "Prüfen und herunterladen", body: "Die Tabelle erscheint auf dem Bildschirm. Mit einem kostenlosen Konto nehmen Sie sie als Excel-Datei mit." },
          ],
        },
        faqs: [
          {
            q: "Was umfasst die kostenlose Version?",
            a: "{limit} Dokumente pro Tag, mit dem vollständigen Ergebnis auf dem Bildschirm. Für den Excel-Download brauchen Sie ein Tavnit-Konto, das nichts kostet.",
          },
          {
            q: "Was wird aus einem Konnossement extrahiert?",
            a: "Aus dem Kopf: B/L-Nummer, Reederei, Ablader, Empfänger, Notify-Adresse, Schiff, Reise, Verladehafen, Löschhafen, An-Bord-Datum, Frachtbedingungen und die Liste der Container. Aus der Ladungstabelle eine Zeile pro Position: Container, Plombe, Warenbeschreibung, Anzahl und Art der Packstücke, Bruttogewicht und Volumen. Die Kopfwerte wiederholen sich in jeder Zeile, damit sich das Blatt sauber filtern und summieren lässt.",
          },
          {
            q: "Kann ich andere Spalten wählen?",
            a: "Hier nicht: Dieses Tool nutzt einen festen Flow für Konnossemente mit 19 Feldern. In Ihrem Konto erstellen Sie eigene Flows, für B/Ls oder jedes andere Dokument, mit den Feldern, die Sie brauchen: pro Dokument (Incoterm, Lieferort, Buchungsnummer, ETA) oder pro Zeile (HS-Code, Markierungen, Reefer-Temperatur). Keine Vorlagen: Sie beschreiben das Feld und geben bei Bedarf einen Hinweis, wo es steht.",
          },
          {
            q: "Welche Formate werden akzeptiert?",
            a: "PDF (mit Text oder gescannt), JPG und PNG, bis 4 MB und 5 Seiten. Ist Ihr B/L länger oder stecken mehrere B/Ls in einem Scan, laden Sie sie in Teilen hoch oder erstellen Sie ein Konto.",
          },
          {
            q: "Funktioniert es mit dem B/L jeder Reederei?",
            a: "Ja. Es arbeitet ohne Vorlagen: Es liest jedes B/L so, wie es kommt, ob Master-B/L einer Reederei, House-B/L eines Spediteurs oder Seefrachtbrief, auf Englisch oder Spanisch. Getestet ist es mit Layouts von MSC, Maersk, Hapag-Lloyd, CMA CGM, Evergreen und NVOCCs.",
          },
          {
            q: "Was passiert mit meiner Datei?",
            a: "Sie wird in einem Tavnit-Konto verarbeitet, das ausschließlich für die kostenlosen Tools bestimmt ist und für nichts anderes genutzt wird. Nach 24 Stunden werden die Datei und die extrahierten Zeilen automatisch gelöscht; wir speichern nur, dass ein Lauf stattgefunden hat, ohne das Dokument oder seinen Inhalt. Wenn Sie die Löschung früher wünschen, schreiben Sie an support@tavnit.io.",
          },
          {
            q: "Warum braucht der Download ein Konto?",
            a: "Weil die kostenlose Version zum Ausprobieren gedacht ist. Mit einem Konto führen Sie dieselbe Extraktion für alle Ihre Konnossemente aus, erhalten das Ergebnis per E-Mail und senden es an Ihr Zoll- oder Speditionssystem.",
          },
          {
            q: "Wie automatisiere ich das?",
            a: "Erstellen Sie ein Konto, bauen Sie einen Flow mit den gewünschten Feldern und leiten Sie B/Ls an seine E-Mail-Adresse weiter (die, an die Reederei oder Spediteur sie schicken) – oder binden Sie ihn über die API, Webhooks, Zapier, Make oder n8n an. Die Daten landen in Ihrem Zollsystem, Ihrem ERP oder in Google Sheets, ohne dass jemand tippt.",
          },
        ],
      },
    },
    /**
     * Compare supplier quotes. Two or three quotes for the same request go
     * through the quote Flow; the Matcher pairs the lines across suppliers
     * (semantically) and marks the cheapest unit price per line as Champion.
     * Nothing here is an invoice, so most of the base is overridden.
     */
    "quote-comparison": {
      vocab: {
        doc: "Angebot",
        docs: "Angebote",
        a_doc: "ein Angebot",
        the_doc: "das Angebot",
        the_docs: "die Angebote",
        your_doc: "Ihr Angebot",
        your_docs: "Ihre Angebote",
        all_your_docs: "alle Ihre Angebote",
        all_docs: "alle Angebote",
        each_doc: "jedes Angebot",
        another_doc: "ein weiteres Angebot",
        this_doc: "dieses Angebot",
      },
      overrides: {
        title: "Lieferantenangebote vergleichen, kostenlos: Zeile für Zeile",
        description:
          "Laden Sie zwei oder drei Angebote als PDF oder Foto hoch und erhalten Sie eine Vergleichstabelle: jede Zeile mit dem Preis jedes Lieferanten, das günstigste markiert. Kostenlos, ohne Vorlagen, ohne Registrierung bis zum Ergebnis.",
        label: "Lieferantenangebote vergleichen",
        h1: "Lieferantenangebote vergleichen",
        intro:
          "Laden Sie zwei oder drei Angebote für dieselbe Anfrage hoch. Tavnit liest jedes davon, ordnet die Zeilen einander zu – auch wenn jeder Lieferant sie anders formuliert – und baut eine Tabelle mit jedem Preis und der günstigsten Option pro Zeile. Ohne Vorlagen, ohne Tabelle von Hand.",
        trust: ["2 oder 3 Angebote · PDF oder Foto", "{limit} kostenlose Dokumente pro Tag", "Nach 24 h wird alles gelöscht"],
        drop: {
          title: "Legen Sie ein Angebot hier ab",
          hint: "PDF oder Foto",
          sample: "Mit drei Beispielangeboten ausprobieren",
          formats: "PDF, JPG oder PNG · bis 4 MB und 5 Seiten pro Angebot",
        },
        stages: ["Angebote werden gelesen", "Zeilen werden sortiert", "Der Matcher ordnet die Zeilen zu", "Gleich fertig"],
        result: {
          flowNote: "Jedes Angebot durchläuft einen festen Flow mit {fields} Feldern, und der Matcher gleicht sie ab. In Ihrem Konto wählen Sie die Felder selbst.",
          ghostHint: "In Tavnit fügen Sie die Felder hinzu, die Sie brauchen: Marke, Garantie, Lieferzeit pro Zeile…",
          download: "Vergleich als Excel herunterladen",
          another: "Andere Angebote vergleichen",
          empty: "In diesem Angebot haben wir keine Zeilen mit Preisen gefunden. Probieren Sie eines mit Artikeln, Mengen und Preisen pro Zeile.",
        },
        errors: {
          too_large: "Eines der Angebote ist größer als 4 MB. Komprimieren Sie es oder laden Sie nur die Seiten mit den Zeilen hoch.",
          failed: "Eines der Angebote konnten wir nicht lesen. Probieren Sie ein anderes oder die Beispiele.",
          no_lines: "Eines der Angebote hat keine Zeilen mit Preisen, es gibt also nichts zu vergleichen. Prüfen Sie, ob jedes Artikel mit Einzelpreis enthält.",
          not_ready: "Wir lesen die Angebote noch. Warten Sie einen Moment und versuchen Sie es erneut.",
        },
        auth: {
          title: "Kostenloses Konto erstellen und Tabelle herunterladen",
          body: "Die Excel-Datei wird sofort heruntergeladen. Mit einem Konto vergleichen Sie außerdem mehr als drei Angebote – und das für jede Ausschreibung, die hereinkommt.",
        },
        next: {
          lead: "Das waren drei Angebote von Hand. Mit einem Konto landet jedes Angebot, das per E-Mail kommt, in seinem Flow, der Matcher gleicht sie von selbst ab und die Tabelle läuft weiter: an den Einkauf, ins ERP oder an die Person, die freigibt.",
          source: "Ihre Angebote",
          flow: {
            name: "Angebot",
            add: { name: "brand", type: "Text", hint: "Neben „Marke“ oder in der Beschreibung", save: "Speichern", value: "Argos" },
          },
          inputs: { show: "Wie bringen Sie Ihre Angebote zu Tavnit?" },
        },
        cleaners: {
          lead: "Einfache Regeln, die von selbst für jedes Angebot laufen, sobald es gelesen ist. Vier Ideen:",
          ideas: [
            { icon: "date", title: "Ein einheitliches Datumsformat", from: "{date}", to: "{iso}", note: "jedes Angebot im selben Format" },
            { icon: "alert", title: "Alarm, wenn ein Lieferant um mehr als 5 % teurer wird", from: "heutiger Preis", to: "vs. letztes Angebot", note: "pro Zeile, vor der Vergabe" },
            { icon: "approve", title: "Die Vergabe freigeben", from: "Vergleichstabelle", to: "an die entscheidende Person", note: "erst nach der Freigabe geht die Bestellung raus" },
            { icon: "calendar", title: "An die Gültigkeit des Angebots erinnern", from: "gültig bis {date}", to: "Erinnerung 5 Tage vorher", note: "damit der Preis nicht verfällt" },
          ],
        },
        after: {
          title: "Ihre Vergleichstabelle ist fertig",
          lead: "Sie stammt aus einem festen Flow mit {fields} Feldern und einem Matcher. In Ihrem Konto wählen Sie die Felder selbst – und so sieht es aus, wenn Tavnit jedes Angebot abgleicht:",
        },
        how: {
          steps: [
            { title: "Zwei oder drei Angebote hochladen", body: "PDF oder Foto, für dieselbe Anfrage. Jeder Lieferant, jedes Layout, jede Art, einen Artikel zu beschreiben." },
            { title: "Tavnit liest und gleicht sie ab", body: "Es extrahiert die Zeilen jedes Angebots, und der Matcher ordnet die Artikel einander zu, auch wenn sie unterschiedlich formuliert sind. Das günstigste pro Zeile wird als Champion markiert." },
            { title: "Prüfen und herunterladen", body: "Die Tabelle erscheint auf dem Bildschirm. Mit einem kostenlosen Konto nehmen Sie sie als Excel-Datei mit." },
          ],
        },
        faqs: [
          {
            q: "Was umfasst die kostenlose Version?",
            a: "{limit} Dokumente pro Tag (ein Vergleich von drei Angeboten zählt als drei), mit der vollständigen Tabelle auf dem Bildschirm. Für den Excel-Download brauchen Sie ein Tavnit-Konto, das nichts kostet.",
          },
          {
            q: "Wie werden Zeilen zugeordnet, wenn jeder Lieferant sie anders formuliert?",
            a: "Mit einem Tavnit-Matcher. Er vergleicht die Bedeutung jeder Beschreibung, nicht den exakten Text: „grey cement 42.5 kg“ und „Portland cement type I grey, 42.5 kg bag“ landen in derselben Zeile. Im Zweifel entscheidet ein zweiter Schritt, ob es derselbe Artikel ist.",
          },
          {
            q: "Was bedeutet Champion?",
            a: "Der Lieferant mit dem niedrigsten Einzelpreis in dieser Zeile. Bei Gleichstand erscheinen beide. Zeilen, die nur ein Lieferant angeboten hat, haben keine Konkurrenz und werden ebenfalls angezeigt.",
          },
          {
            q: "Kann ich mehr als drei Angebote vergleichen?",
            a: "Hier nicht: Die kostenlose Version nimmt bis zu drei. In Ihrem Konto vergleicht der Matcher bis zu zehn Läufe desselben Flows, und Sie können die Tabelle per E-Mail oder an Ihr ERP senden.",
          },
          {
            q: "Kann ich andere Spalten wählen?",
            a: "Hier nicht: Dieses Tool nutzt einen festen Flow für Angebote. In Ihrem Konto erstellen Sie einen eigenen Flow mit den Feldern, die Sie brauchen (Marke, Garantie, Lieferzeit pro Zeile), und stellen den Matcher so ein, dass er das Feld vergleicht, das Sie wollen: Preis, Lieferzeit oder jede andere Zahl.",
          },
          {
            q: "Welche Formate werden akzeptiert?",
            a: "PDF (mit Text oder gescannt), JPG und PNG, bis 4 MB und 5 Seiten pro Angebot.",
          },
          {
            q: "Was passiert mit meinen Dateien?",
            a: "Sie werden in einem Tavnit-Konto verarbeitet, das ausschließlich für die kostenlosen Tools bestimmt ist und für nichts anderes genutzt wird. Nach 24 Stunden werden die Dateien, die extrahierten Zeilen und die Tabelle gelöscht; wir speichern nur, dass ein Lauf stattgefunden hat.",
          },
          {
            q: "Wie automatisiere ich das?",
            a: "Erstellen Sie ein Konto, bauen Sie einen Flow für Angebote mit Ihren Feldern und darauf einen Matcher. Leiten Sie Angebote an die E-Mail-Adresse des Matchers weiter – sobald alle da sind, entsteht die Vergleichstabelle von selbst: per E-Mail, per Webhook oder direkt in Ihrem ERP.",
          },
        ],
        compare: {
          slots: [
            { title: "Angebot A", hint: "PDF oder Foto", sample: "Beispielangebot A" },
            { title: "Angebot B", hint: "PDF oder Foto", sample: "Beispielangebot B" },
            { title: "Angebot C", hint: "PDF oder Foto", sample: "Beispielangebot C", optional: true },
          ],
          run: "Vergleichen",
          sampleAll: "Mit drei Beispielangeboten ausprobieren",
          stages: ["Angebote werden gelesen", "Zeilen werden sortiert", "Der Matcher ordnet die Zeilen zu", "Gleich fertig"],
          heading: "Vergleichstabelle fertig",
          summary: "{n} · {ref}",
          labels: {
            description: "Beschreibung",
            quantity: "Menge",
            price: "Einzelpreis",
            total: "Gesamt",
            status: "Status",
            ref: "A",
            doc: "B",
            supplier: "Lieferant",
            champion: "Champion",
            wins: "{n} Zeilen gewonnen",
            lines: ["Zeile", "Zeilen"],
          },
          status: { ok: "Stimmt", price: "Anderer Preis", qty: "Andere Menge", both: "Preis und Menge weichen ab", missing: "Nicht angeboten", extra: "Nur in diesem Angebot" },
          empty: "Der Matcher hat keine vergleichbaren Zeilen zwischen den Angeboten gefunden. Prüfen Sie, ob sie zur selben Anfrage gehören und Artikel mit Einzelpreis enthalten.",
          another: "Andere Angebote vergleichen",
          download: "Vergleich als Excel herunterladen",
        },
      },
    },
    /**
     * Contract key dates. One row per contract (a metadata-only Flow), so the
     * copy talks about dates and parties, never about line items. "Vertrag" is
     * masculine: the vocab holds accusative forms ("einen Vertrag").
     */
    "contract-dates": {
      vocab: {
        doc: "Vertrag",
        docs: "Verträge",
        a_doc: "einen Vertrag",
        the_doc: "den Vertrag",
        the_docs: "die Verträge",
        your_doc: "Ihren Vertrag",
        your_docs: "Ihre Verträge",
        all_your_docs: "alle Ihre Verträge",
        all_docs: "alle Verträge",
        each_doc: "jeden Vertrag",
        another_doc: "einen weiteren Vertrag",
        this_doc: "diesen Vertrag",
      },
      overrides: {
        title: "Verlängerungsfristen aus Verträgen auslesen, kostenlos (KI)",
        description:
          "Laden Sie einen Vertrag als PDF hoch und erhalten Sie seine wichtigsten Daten in einer Excel-Zeile: Parteien, Beginn, Ende, automatische Verlängerung, Kündigungsfrist und den letzten Tag zur Kündigung. Kostenlos, ohne Vorlagen, ohne Registrierung bis zum Ergebnis.",
        label: "Vertragsdaten",
        h1: "Die wichtigsten Daten aus einem Vertrag auslesen",
        intro:
          "Laden Sie das PDF hoch. Tavnit liest den Vertrag und gibt eine Zeile zurück mit den Parteien, dem Unterschriftsdatum, Beginn und Ende der Laufzeit, ob er sich automatisch verlängert, der Kündigungsfrist und dem letzten Tag, an dem Sie die Verlängerung noch ablehnen können. Funktioniert mit Dienstleistungs-, Miet-, Liefer- und Lizenzverträgen, in welchem Format sie auch kommen.",
        drop: {
          title: "Legen Sie Ihren Vertrag hier ab",
          sample: "Mit einem Beispielvertrag ausprobieren",
        },
        stages: ["Dokument wird hochgeladen", "Parteien werden gelesen", "Laufzeit und Verlängerung werden gesucht", "Kündigungsfrist wird berechnet", "Gleich fertig"],
        result: {
          empty: "In diesem Dokument haben wir keine Parteien oder Daten gefunden. Probieren Sie einen unterschriebenen Vertrag mit Laufzeitklausel.",
          flowNote: "Diese {fields} Spalten sind die Felder eines festen Flows für Verträge. In Ihrem Konto wählen Sie die Felder selbst.",
          ghostHint: "In Tavnit fügen Sie die Felder hinzu, die Sie brauchen: interne verantwortliche Person, Kostenstelle, Vertragsstrafe…",
          another: "Weiteren Vertrag verarbeiten",
        },
        next: {
          lead: "Das war ein Vertrag. Mit einem Konto verarbeitet Tavnit jeden eingehenden Vertrag genauso, und die Daten enden nicht in einer Excel-Datei: Sie schlagen Alarm, bevor die Frist abläuft.",
          source: "Ihr Vertrag",
          inputs: { show: "Wie bringen Sie Ihren Vertrag zu Tavnit?" },
          flow: {
            name: "Vertrag",
            add: { name: "owner", type: "Text", hint: "Wer bei uns unterschreibt", save: "Speichern", value: "M. Perez" },
          },
        },
        cleaners: {
          lead: "Einfache Regeln, die von selbst für jeden Vertrag laufen, sobald er gelesen ist. Vier Ideen mit Ihren eigenen Daten:",
          ideas: [
            { icon: "date", title: "Ein einheitliches Datumsformat", from: "{date}", to: "{iso}", note: "jeder Vertrag im selben Format" },
            { icon: "calendar", title: "Erinnerung 60 Tage vor Ablauf", from: "end_date", to: "rechtzeitige Erinnerung", note: "bevor die Kündigungsfrist verstreicht" },
            { icon: "alert", title: "Automatische Verlängerung: erst prüfen", from: "auto_renewal = Yes", to: "zu prüfen", note: "damit sich kein Vertrag verlängert, ohne dass jemand hinsieht" },
            { icon: "mail", title: "E-Mail an die verantwortliche Person", from: "Vertrag gelesen", to: "E-Mail mit der Zeile", note: "wer unterschrieben hat, bekommt die Daten" },
          ],
        },
        after: {
          lead: "Sie stammt aus einem festen Flow mit {fields} Feldern. In Ihrem Konto wählen Sie die Felder selbst – und so sieht es aus, wenn Tavnit jeden Vertrag liest:",
        },
        how: {
          steps: [
            { title: "Vertrag hochladen", body: "PDF, mit Text oder gescannt. Jede Vertragsart, egal wer sie aufgesetzt hat." },
            { title: "Tavnit liest ihn", body: "Es findet die Parteien, die Unterschrift, die Laufzeit, die Verlängerungsklausel und die Kündigungsfrist und berechnet den letzten Tag zur Kündigung." },
            { title: "Prüfen und herunterladen", body: "Die Zeile erscheint auf dem Bildschirm. Mit einem kostenlosen Konto nehmen Sie sie als Excel-Datei mit." },
          ],
        },
        faqs: [
          {
            q: "Was umfasst die kostenlose Version?",
            a: "{limit} Verträge pro Tag, mit dem vollständigen Ergebnis auf dem Bildschirm. Für den Excel-Download brauchen Sie ein Tavnit-Konto, das nichts kostet.",
          },
          {
            q: "Welche Daten und Angaben werden extrahiert?",
            a: "Die Parteien, das Unterschriftsdatum, Beginn und Ende der Laufzeit, die Laufzeitdauer, ob er sich automatisch verlängert, die Kündigungsfrist, der letzte Tag zur Kündigung, der Vertragswert mit Währung und das anwendbare Recht. Was der Vertrag nicht sagt, bleibt leer: Es wird nie ein Datum erfunden.",
          },
          {
            q: "Warum ist das Ergebnis nur eine Zeile?",
            a: "Weil ein Vertrag eine Laufzeit, ein Unterschriftsdatum und einen Satz Parteien hat. Mit einem Konto verarbeiten Sie einen ganzen Ordner voller Verträge und erhalten eine Tabelle mit einer Zeile pro Vertrag, bereit zum Sortieren nach Enddatum.",
          },
          {
            q: "Welche Formate werden akzeptiert?",
            a: "PDF (mit Text oder gescannt), JPG und PNG, bis 4 MB und 5 Seiten. Ist Ihr Vertrag länger, laden Sie die Seiten mit den Laufzeit- und Verlängerungsklauseln hoch oder erstellen Sie ein Konto.",
          },
          {
            q: "Kann ich andere Spalten wählen?",
            a: "Hier nicht: Dieses Tool nutzt einen festen Flow für Verträge mit 14 Feldern. In Ihrem Konto erstellen Sie eigene Flows, für Verträge oder jedes andere Dokument, mit den Feldern, die Sie brauchen: interne verantwortliche Person, Vertragsstrafe, Sicherheit. Keine Vorlagen: Sie beschreiben das Feld und geben bei Bedarf einen Hinweis, wo es steht.",
          },
          {
            q: "Was passiert mit meiner Datei?",
            a: "Sie wird in einem Tavnit-Konto verarbeitet, das ausschließlich für die kostenlosen Tools bestimmt ist und für nichts anderes genutzt wird. Nach 24 Stunden werden die Datei und die extrahierte Zeile automatisch gelöscht; wir speichern nur, dass ein Lauf stattgefunden hat, ohne das Dokument oder seinen Inhalt. Wenn Sie die Löschung früher wünschen, schreiben Sie an support@tavnit.io.",
          },
          {
            q: "Funktioniert es für Verträge aus jedem Land?",
            a: "Ja. Es verarbeitet Verträge auf Englisch, Spanisch und in anderen Sprachen, mit jedem Datumsformat. Getestet haben wir es unter anderem für Verträge aus den USA, Panama, Mexiko und Kolumbien.",
          },
          {
            q: "Wie werde ich vor dem Enddatum gewarnt?",
            a: "Erstellen Sie ein Konto, bauen Sie einen Flow mit den gewünschten Feldern und leiten Sie Verträge an seine E-Mail-Adresse weiter – oder binden Sie ihn über die API, Webhooks, Zapier, Make oder n8n an. Ein Cleaner vergleicht die Kündigungsfrist mit dem heutigen Datum und schickt die E-Mail oder den Webhook an die Person, die entscheiden muss.",
          },
        ],
      },
    },
    /**
     * Receipt → Excel. Mostly photos of thermal tickets: restaurants, pharmacies,
     * taxis, supermarkets. "Beleg" is masculine: the vocab holds accusative
     * forms ("einen Beleg").
     */
    "receipt-to-excel": {
      vocab: {
        doc: "Beleg",
        docs: "Belege",
        a_doc: "einen Beleg",
        the_doc: "den Beleg",
        the_docs: "die Belege",
        your_doc: "Ihren Beleg",
        your_docs: "Ihre Belege",
        all_your_docs: "alle Ihre Belege",
        all_docs: "alle Belege",
        each_doc: "jeden Beleg",
        another_doc: "einen weiteren Beleg",
        this_doc: "diesen Beleg",
      },
      overrides: {
        title: "Beleg in Excel, kostenlos: vom Foto zur Tabelle",
        description:
          "Laden Sie ein Foto oder PDF eines Kassenbelegs hoch und erhalten Sie seine Zeilen in Excel: Händler, Datum, Artikel, Mengen, Steuer, Trinkgeld und Gesamtbetrag. Kostenlos, ohne Vorlagen, ohne Registrierung bis zum Ergebnis. Beleg-OCR in eine Tabelle, in Sekunden.",
        label: "Beleg in Excel",
        h1: "Verwandeln Sie einen Beleg in eine Excel-Tabelle",
        intro:
          "Fotografieren Sie den Beleg oder laden Sie das PDF hoch. Tavnit liest den Händler, das Datum, jeden Artikel mit Preis und die Summen und gibt alles als Tabelle zurück. Auch verblasste, schiefe oder zerknitterte Thermobons funktionieren: Es gibt keine Vorlage einzurichten.",
        drop: {
          title: "Legen Sie das Foto Ihres Belegs hier ab",
          sample: "Mit einem Beispielbeleg ausprobieren",
        },
        stages: ["Beleg wird hochgeladen", "Händler und Datum werden gelesen", "Artikel werden gesucht", "Spalten werden geordnet", "Gleich fertig"],
        result: {
          empty: "Auf diesem Beleg haben wir keine Artikel gefunden. Probieren Sie ein schärferes Foto, auf dem der ganze Bon ohne Schatten zu sehen ist.",
          flowNote: "Diese {fields} Spalten sind die Felder eines festen Flows für Belege. In Ihrem Konto wählen Sie die Felder selbst.",
          ghostHint: "In Tavnit fügen Sie die Felder hinzu, die Sie brauchen: Kostenstelle, wer es ausgegeben hat, Projekt, Kategorie…",
        },
        next: {
          lead: "Das war ein Beleg. Mit einem Konto verarbeitet Tavnit jeden eingehenden Beleg genauso, und die Zeilen enden nicht in einer Excel-Datei: Sie laufen von selbst weiter.",
          source: "Ihr Beleg",
          inputs: { show: "Wie bringen Sie Ihren Beleg zu Tavnit?" },
          flow: {
            name: "Beleg",
            add: { name: "cost_center", type: "Text", hint: "Wer es ausgegeben hat oder das Projekt", save: "Speichern", value: "Sales" },
          },
        },
        cleaners: {
          lead: "Einfache Regeln, die von selbst für jeden Beleg laufen, sobald er gelesen ist. Vier Ideen mit Ihren eigenen Daten:",
          ideas: [
            { icon: "date", title: "Ein einheitliches Datumsformat", from: "{date}", to: "{iso}", note: "jeder Beleg im selben Format für die Spesenabrechnung" },
            { icon: "sum", title: "Die Artikel müssen die Zwischensumme ergeben", from: "Artikel {sum}", to: "Zwischensumme {subtotal}", note: "stimmt es nicht, wurde das Foto schlecht gelesen und jemand prüft es", check: "sum" },
            { icon: "approve", title: "Freigabe ab einem Betrag", from: "Gesamt {total}", to: "vor der Erstattung freigeben", note: "wenn {threshold} überschritten wird" },
            { icon: "money", title: "In Ihre Währung umrechnen", from: "{total} {currency}", to: "Ihre Währung", note: "zum Kurs am Belegdatum, für Reisen" },
          ],
        },
        after: {
          lead: "Sie stammt aus einem festen Flow mit {fields} Feldern. In Ihrem Konto wählen Sie die Felder selbst – und so sieht es aus, wenn Tavnit alle Belege einer Reise oder eines Monats verarbeitet:",
        },
        how: {
          steps: [
            { title: "Beleg hochladen", body: "Ein Handyfoto oder ein PDF. Jeder Händler, jede Sprache, egal wie verblasst der Bon ist." },
            { title: "Tavnit liest ihn", body: "Es findet den Händler, das Datum, die Nummer, jeden Artikel mit Preis sowie Zwischensumme, Steuer, Trinkgeld und Gesamtbetrag." },
            { title: "Prüfen und herunterladen", body: "Die Tabelle erscheint auf dem Bildschirm. Mit einem kostenlosen Konto nehmen Sie sie als Excel-Datei mit." },
          ],
        },
        faqs: [
          {
            q: "Was umfasst die kostenlose Version?",
            a: "{limit} Belege pro Tag, mit dem vollständigen Ergebnis auf dem Bildschirm. Für den Excel-Download brauchen Sie ein Tavnit-Konto, das nichts kostet.",
          },
          {
            q: "Funktioniert es mit einem Foto vom Handy?",
            a: "Ja, das ist der Normalfall. JPG, PNG und PDF bis 4 MB. Es hilft, wenn der ganze Bon im Bild ist, gleichmäßig beleuchtet und ohne Finger darauf; ein schiefes oder leicht unscharfes Foto wird trotzdem gelesen.",
          },
          {
            q: "Welche Formate werden akzeptiert?",
            a: "JPG, PNG und PDF (mit Text oder gescannt), bis 4 MB und 5 Seiten. Ein langer Supermarktbon passt auf ein Foto.",
          },
          {
            q: "Muss ich für jeden Händler eine Vorlage einrichten?",
            a: "Nein. Tavnit arbeitet ohne Vorlagen: Es liest jeden Beleg so, wie er kommt, ob vom Restaurant, aus der Apotheke, vom Taxi oder von der Tankstelle.",
          },
          {
            q: "Kann ich andere Spalten wählen?",
            a: "Hier nicht: Dieses Tool nutzt einen festen Flow für Belege mit 15 Feldern. In Ihrem Konto erstellen Sie eigene Flows mit den Feldern, die Sie brauchen: pro Dokument (Kostenstelle, wer es ausgegeben hat, Projekt, Kategorie) oder pro Zeile (Artikelnummer). Keine Vorlagen: Sie beschreiben das Feld und geben bei Bedarf einen Hinweis, wo es steht.",
          },
          {
            q: "Was passiert mit meiner Datei?",
            a: "Sie wird in einem Tavnit-Konto verarbeitet, das ausschließlich für die kostenlosen Tools bestimmt ist und für nichts anderes genutzt wird. Nach 24 Stunden werden das Foto und die extrahierten Zeilen automatisch gelöscht; wir speichern nur, dass ein Lauf stattgefunden hat, ohne das Dokument oder seinen Inhalt. Wenn Sie die Löschung früher wünschen, schreiben Sie an support@tavnit.io.",
          },
          {
            q: "Ich habe fünfzig Belege von einer Reise. Einen nach dem anderen?",
            a: "Hier ja. Mit einem Konto schicken Sie alle auf einmal: per E-Mail an den Flow, gesammelt per Drag-and-drop oder über die API – und jeder Beleg landet als Zeilen in derselben Excel-Datei, in Google Sheets oder in Ihrem Spesensystem.",
          },
          {
            q: "Wie automatisiere ich das?",
            a: "Erstellen Sie ein Konto, bauen Sie einen Flow mit den gewünschten Feldern und leiten Sie Belegfotos an seine E-Mail-Adresse weiter – oder binden Sie ihn über die API, Webhooks, Zapier, Make oder n8n an. Die Spesenabrechnung erstellt sich von selbst.",
          },
        ],
      },
    },
    /**
     * Number format. A spreadsheet in, the chosen columns out in one number
     * format: a file exported with "1.234,56" that Excel reads as text, or the
     * other way round.
     */
    "number-format": {
      vocab: {
        doc: "Tabelle",
        docs: "Tabellen",
        a_doc: "eine Tabelle",
        the_doc: "die Tabelle",
        the_docs: "die Tabellen",
        your_doc: "Ihre Tabelle",
        your_docs: "Ihre Tabellen",
        all_your_docs: "alle Ihre Tabellen",
        all_docs: "alle Tabellen",
        each_doc: "jede Tabelle",
        another_doc: "eine weitere Tabelle",
        this_doc: "diese Tabelle",
      },
      overrides: {
        title: "Zahlenformat in Excel oder CSV korrigieren, kostenlos",
        description:
          "Laden Sie eine Excel- oder CSV-Datei mit Zahlen wie 1.234,56 oder 1,234.56 hoch und erhalten Sie sie in einem einheitlichen Format zurück, bereit zum Summieren. Sie wählen die Spalten und das Format. Kostenlos, ohne Registrierung bis zum Ergebnis.",
        label: "Zahlenformat korrigieren",
        h1: "Korrigieren Sie das Zahlenformat in Ihrer Tabelle",
        intro:
          "Laden Sie die Excel- oder CSV-Datei hoch. Wählen Sie, welche Spalten Zahlen enthalten und wie Sie sie haben möchten: 1234.56, 1,234.56 oder 1.234,56. Tavnit wandelt jede Zahl um und gibt Ihnen die Datei mit denselben Spalten in derselben Reihenfolge zurück.",
        trust: ["CSV oder Excel · bis 500 Zeilen", "{limit} kostenlose Dateien pro Tag", "Nach 24 h wird alles gelöscht"],
        drop: {
          title: "Legen Sie Ihre Excel- oder CSV-Datei hier ab",
          hint: "oder wählen Sie eine Datei auf Ihrem Computer",
          choose: "Datei wählen",
          sample: "Beispieldatei ausprobieren",
          formats: "CSV oder .xlsx · bis 4 MB und 500 Zeilen",
        },
        errors: {
          unsupported: "Nur CSV- oder Excel-Dateien (.xlsx).",
          xls: "Das ist eine alte Excel-Datei (.xls). Öffnen Sie sie in Excel und speichern Sie sie als .xlsx oder .csv.",
          too_many_rows: "Die kostenlose Version verarbeitet bis zu 500 Zeilen. Laden Sie einen Teil der Datei hoch.",
          too_many_columns: "Wählen Sie bis zu 10 Spalten auf einmal.",
          no_columns: "Wählen Sie mindestens eine Spalte.",
          nothing_to_clean: "In diesen Spalten haben wir keine Zahlen zum Umwandeln gefunden.",
          empty: "Die Datei ist leer oder hat unter der Kopfzeile keine Zeilen.",
          unreadable: "Wir konnten die Datei nicht lesen. Wenn es eine Excel-Datei ist, speichern Sie sie erneut als .xlsx.",
          failed: "Wir konnten diese Datei nicht umwandeln. Versuchen Sie es erneut oder probieren Sie die Beispieldatei.",
        },
        how: {
          heading: "So funktioniert es",
          steps: [
            { title: "Datei hochladen", body: "Eine CSV- oder Excel-Datei, durch Komma oder Semikolon getrennt." },
            { title: "Spalten und Format wählen", body: "Wir markieren die Spalten, die nach Zahlen aussehen. Sie geben an, ob Ihre Dezimalstellen ein Komma oder einen Punkt verwenden und wie Sie sie haben möchten." },
            { title: "Prüfen und herunterladen", body: "Geänderte Zellen werden hervorgehoben. Mit Ihrem kostenlosen Konto nehmen Sie die Datei als Excel oder CSV mit." },
          ],
        },
        faqs: [
          { q: "Warum summiert Excel meine Zahlen nicht?", a: "Weil es sie als Text liest. Das passiert, wenn die Datei aus einem System oder Land stammt, das Dezimalzahlen anders schreibt als Ihres: 1.234,56 in einem Excel, das auf 1,234.56 eingestellt ist, oder umgekehrt. Ein einheitliches Format macht sie wieder zu Zahlen." },
          { q: "Woher wissen Sie, ob meine Dezimalstellen ein Komma oder einen Punkt verwenden?", a: "Wir leiten es aus Ihren Werten ab: Kommt 1.234,56 vor, ist das Komma das Dezimalzeichen. Lässt es sich nicht erkennen, etwa bei 1.234 allein, entscheiden Sie. Diese Wahl bestimmt, wie jede Zahl gelesen wird." },
          { q: "Welches Format soll ich wählen?", a: "1234.56 ohne Tausendertrennzeichen ist das Format, das jedes System, jede Formel und jeder Import problemlos liest. 1,234.56 und 1.234,56 sind dafür da, die Datei Menschen zu zeigen – je nach Land." },
          { q: "Was passiert mit Zellen, die keine Zahlen sind?", a: "Sie bleiben, wie sie waren. Ein Prozentsatz (15 %), Text (N/A) oder eine leere Zelle wird nicht angefasst: Nur was eindeutig eine Zahl ist, ändert sich." },
          { q: "Welche Formate werden akzeptiert?", a: "CSV, getrennt durch Kommas, Semikolons oder Tabs, und Excel .xlsx, bis 4 MB und 500 Zeilen. Haben Sie eine alte Excel-Datei (.xls), speichern Sie sie als .xlsx." },
          { q: "Was passiert mit meiner Datei?", a: "Sie wird nur für diese Umwandlung verwendet und nach 24 Stunden zusammen mit dem Ergebnis gelöscht. Nur Ihr Browser kann das Ergebnis sehen." },
          { q: "Wie läuft das von selbst?", a: "In Tavnit ist dieselbe Regel ein Cleaner: Er läuft automatisch für jedes Dokument, das Sie extrahieren, oder jede Datei, die per E-Mail oder API eingeht – zusammen mit Datumsangaben, Währungen und Prüfungen." },
        ],
        clean: {
          setup: {
            heading: "Spalten und Format wählen",
            fileSummary: "{rows} · {cols}",
            columnsLabel: "Spalten mit Zahlen",
            columnsHint: "Bis zu {max}. Wir haben die markiert, die nach Zahlen aussehen.",
            tooMany: "Sie können bis zu {max} Spalten auf einmal wählen.",
            inputLabel: "In Ihrer Datei ist das Dezimalzeichen ein",
            inputOptions: { comma: "Komma · 1.234,56", dot: "Punkt · 1,234.56" },
            outputLabel: "Ich möchte die Zahlen als",
            outputOptions: { plain: "1234.56 · für Formeln und Systeme", us: "1,234.56", latam: "1.234,56" },
            preview: "Erste Zeilen",
            run: "Umwandeln",
            change: "Datei wechseln",
          },
          stages: ["Datei wird hochgeladen", "Spalten werden gelesen", "Zahlen werden umgewandelt", "Ihre Datei wird erstellt"],
          heading: "Fertig: {file}",
          summary: "{cells} geändert in {cols}",
          cellWord: ["Zelle", "Zellen"],
          columnWord: ["Spalte", "Spalten"],
          unchanged: "Keine Zelle musste geändert werden: Sie hatten bereits dieses Format.",
          highlight: "Geänderte Zellen sind blau markiert.",
          shown: "{shown} von {total} Zeilen werden angezeigt. Der Download enthält alle.",
          download: "Herunterladen",
          downloadXlsx: "Excel (.xlsx)",
          downloadCsv: "CSV (.csv)",
          another: "Weitere Datei umwandeln",
          automate: {
            heading: "Lassen Sie es bei jeder Datei passieren",
            body: "In Tavnit ist diese Regel ein Cleaner. Sie richten ihn einmal ein, und er läuft automatisch für jede Rechnung, die Sie extrahieren, oder jede Datei, die per E-Mail oder API eingeht – zusammen mit Datumsangaben, Währungen und Prüfungen.",
            cta: "Kostenloses Konto erstellen",
            docs: "Was ist ein Cleaner?",
          },
        },
      },
    },
    /**
     * Date format. A spreadsheet in, the chosen date columns out in one format.
     * Numeric dates are read with the visitor's day/month order; dates written in
     * words go through the Cleaner's AI conversion.
     */
    "date-format": {
      vocab: {
        doc: "Tabelle",
        docs: "Tabellen",
        a_doc: "eine Tabelle",
        the_doc: "die Tabelle",
        the_docs: "die Tabellen",
        your_doc: "Ihre Tabelle",
        your_docs: "Ihre Tabellen",
        all_your_docs: "alle Ihre Tabellen",
        all_docs: "alle Tabellen",
        each_doc: "jede Tabelle",
        another_doc: "eine weitere Tabelle",
        this_doc: "diese Tabelle",
      },
      overrides: {
        title: "Datumsformat in Excel oder CSV korrigieren, kostenlos",
        description:
          "Laden Sie eine Excel- oder CSV-Datei mit gemischten Datumsangaben hoch (03/04/2024, March 12 2024, 2024-03-12) und erhalten Sie alle in einem einheitlichen Format zurück. Sie wählen die Spalten und das Format. Kostenlos, ohne Registrierung bis zum Ergebnis.",
        label: "Datumsformat korrigieren",
        h1: "Bringen Sie jedes Datum Ihrer Tabelle in ein Format",
        intro:
          "Laden Sie die Excel- oder CSV-Datei hoch. Wählen Sie, welche Spalten Datumsangaben enthalten und wie Sie sie haben möchten: 2024-03-12, 12/03/2024 oder 03/12/2024. Tavnit wandelt jedes Datum um, auch ausgeschriebene, und gibt Ihnen die Datei mit denselben Spalten zurück.",
        trust: ["CSV oder Excel · bis 500 Zeilen", "{limit} kostenlose Dateien pro Tag", "Nach 24 h wird alles gelöscht"],
        drop: {
          title: "Legen Sie Ihre Excel- oder CSV-Datei hier ab",
          hint: "oder wählen Sie eine Datei auf Ihrem Computer",
          choose: "Datei wählen",
          sample: "Beispieldatei ausprobieren",
          formats: "CSV oder .xlsx · bis 4 MB und 500 Zeilen",
        },
        errors: {
          unsupported: "Nur CSV- oder Excel-Dateien (.xlsx).",
          xls: "Das ist eine alte Excel-Datei (.xls). Öffnen Sie sie in Excel und speichern Sie sie als .xlsx oder .csv.",
          too_many_rows: "Die kostenlose Version verarbeitet bis zu 500 Zeilen. Laden Sie einen Teil der Datei hoch.",
          too_many_columns: "Wählen Sie bis zu 10 Spalten auf einmal.",
          no_columns: "Wählen Sie mindestens eine Spalte.",
          nothing_to_clean: "In diesen Spalten haben wir keine Datumsangaben zum Umwandeln gefunden.",
          empty: "Die Datei ist leer oder hat unter der Kopfzeile keine Zeilen.",
          unreadable: "Wir konnten die Datei nicht lesen. Wenn es eine Excel-Datei ist, speichern Sie sie erneut als .xlsx.",
          failed: "Wir konnten diese Datei nicht umwandeln. Versuchen Sie es erneut oder probieren Sie die Beispieldatei.",
        },
        how: {
          heading: "So funktioniert es",
          steps: [
            { title: "Datei hochladen", body: "Eine CSV- oder Excel-Datei, mit Datumsangaben, wie sie kommen: mit Schrägstrichen, Bindestrichen, Punkten oder in Worten." },
            { title: "Spalten und Format wählen", body: "Wir markieren die Spalten, die nach Datumsangaben aussehen. Sie geben an, ob in Ihrer Datei der Tag oder der Monat zuerst steht und wie Sie sie haben möchten." },
            { title: "Prüfen und herunterladen", body: "Geänderte Zellen werden hervorgehoben. Mit Ihrem kostenlosen Konto nehmen Sie die Datei als Excel oder CSV mit." },
          ],
        },
        faqs: [
          { q: "Woher wissen Sie, ob 03/04/2024 der 3. April oder der 4. März ist?", a: "Ein einzelnes Datum verrät es nicht. Deshalb fragen wir, ob in Ihrer Datei der Tag oder der Monat zuerst steht, und schlagen die Antwort vor, wenn die Spalte ein Datum wie 15/04/2024 enthält, das sich nur auf eine Weise lesen lässt." },
          { q: "Versteht es ausgeschriebene Datumsangaben?", a: "Ja. „March 5th 2024“, „12 de marzo de 2024“ oder „1 Apr 2024“ werden mit KI gelesen – genau das, was eine Excel-Formel nicht kann. Numerische Datumsangaben werden mit Regeln gelesen, ohne KI." },
          { q: "Welches Format soll ich wählen?", a: "2024-03-12 (Jahr, Monat, Tag) ist das Format, das jedes System ohne Verwechslung liest und das korrekt sortiert. 03/12/2024 ist in den USA üblich; 12/03/2024 in Europa und Lateinamerika." },
          { q: "Was passiert mit Zellen, die keine Datumsangaben sind?", a: "Sie bleiben, wie sie waren, ebenso leere Zellen. Lässt sich ein Datum nicht sicher lesen, lassen wir es lieber unverändert, statt zu raten." },
          { q: "Was, wenn meine Excel-Datei sie bereits als Datum speichert?", a: "Dann übernehmen wir sie, wie sie sind, ohne sie neu zu lesen, und ändern nur das Format." },
          { q: "Was passiert mit meiner Datei?", a: "Sie wird nur für diese Umwandlung verwendet und nach 24 Stunden zusammen mit dem Ergebnis gelöscht. Nur Ihr Browser kann das Ergebnis sehen." },
          { q: "Wie läuft das von selbst?", a: "In Tavnit ist dieselbe Regel ein Cleaner: Er läuft automatisch für jedes Dokument, das Sie extrahieren, oder jede Datei, die per E-Mail oder API eingeht – zusammen mit Zahlen, Währungen und Prüfungen." },
        ],
        clean: {
          setup: {
            heading: "Spalten und Format wählen",
            fileSummary: "{rows} · {cols}",
            columnsLabel: "Spalten mit Datumsangaben",
            columnsHint: "Bis zu {max}. Wir haben die markiert, die nach Datumsangaben aussehen.",
            tooMany: "Sie können bis zu {max} Spalten auf einmal wählen.",
            inputLabel: "In Ihrer Datei steht bei numerischen Datumsangaben zuerst",
            inputOptions: { dmy: "der Tag · 31/12/2024", mdy: "der Monat · 12/31/2024" },
            outputLabel: "Ich möchte die Datumsangaben als",
            outputOptions: { iso: "2024-03-12 · Jahr, Monat, Tag", dmy: "12/03/2024 · Tag, Monat, Jahr", mdy: "03/12/2024 · Monat, Tag, Jahr" },
            preview: "Erste Zeilen",
            run: "Umwandeln",
            change: "Datei wechseln",
          },
          stages: ["Datei wird hochgeladen", "Spalten werden gelesen", "Datumsangaben werden umgewandelt", "Ausgeschriebene Datumsangaben werden gelesen", "Ihre Datei wird erstellt"],
          heading: "Fertig: {file}",
          summary: "{cells} geändert in {cols}",
          cellWord: ["Zelle", "Zellen"],
          columnWord: ["Spalte", "Spalten"],
          unchanged: "Keine Zelle musste geändert werden: Sie hatten bereits dieses Format.",
          highlight: "Geänderte Zellen sind blau markiert.",
          shown: "{shown} von {total} Zeilen werden angezeigt. Der Download enthält alle.",
          download: "Herunterladen",
          downloadXlsx: "Excel (.xlsx)",
          downloadCsv: "CSV (.csv)",
          another: "Weitere Datei umwandeln",
          automate: {
            heading: "Lassen Sie es bei jeder Datei passieren",
            body: "In Tavnit ist diese Regel ein Cleaner. Sie richten ihn einmal ein, und er läuft automatisch für jede Rechnung, jeden Vertrag und jede Datei, die eingeht – zusammen mit Zahlen, Währungen und Prüfungen.",
            cta: "Kostenloses Konto erstellen",
            docs: "Was ist ein Cleaner?",
          },
        },
      },
    },
    /**
     * Currency converter. A spreadsheet in, a converted column next to each
     * amount column out, at the day's reference rate (European Central Bank
     * rates through Frankfurter, the engine's source).
     */
    "currency-converter": {
      vocab: {
        doc: "Tabelle",
        docs: "Tabellen",
        a_doc: "eine Tabelle",
        the_doc: "die Tabelle",
        the_docs: "die Tabellen",
        your_doc: "Ihre Tabelle",
        your_docs: "Ihre Tabellen",
        all_your_docs: "alle Ihre Tabellen",
        all_docs: "alle Tabellen",
        each_doc: "jede Tabelle",
        another_doc: "eine weitere Tabelle",
        this_doc: "diese Tabelle",
      },
      overrides: {
        title: "Währung in Excel zum Tageskurs umrechnen, kostenlos",
        description:
          "Laden Sie eine Excel- oder CSV-Datei mit Preisen oder Beträgen hoch und lassen Sie jede Spalte zum Referenzkurs des Tages in Dollar, Euro, Pfund oder eine von 30 Währungen umrechnen. Kostenlos, ohne Registrierung bis zum Ergebnis.",
        label: "Währung umrechnen",
        h1: "Rechnen Sie die Beträge Ihrer Tabelle in eine andere Währung um",
        intro:
          "Laden Sie die Excel- oder CSV-Datei hoch. Wählen Sie die Betragsspalten, ihre Währung und die Zielwährung. Tavnit fügt neben jeder Spalte die umgerechnete Spalte zum Tageskurs ein und gibt Ihnen die komplette Datei zurück.",
        trust: ["CSV oder Excel · bis 500 Zeilen", "{limit} kostenlose Dateien pro Tag", "Nach 24 h wird alles gelöscht"],
        drop: {
          title: "Legen Sie Ihre Excel- oder CSV-Datei hier ab",
          hint: "oder wählen Sie eine Datei auf Ihrem Computer",
          choose: "Datei wählen",
          sample: "Beispieldatei ausprobieren",
          formats: "CSV oder .xlsx · bis 4 MB und 500 Zeilen",
        },
        errors: {
          unsupported: "Nur CSV- oder Excel-Dateien (.xlsx).",
          xls: "Das ist eine alte Excel-Datei (.xls). Öffnen Sie sie in Excel und speichern Sie sie als .xlsx oder .csv.",
          too_many_rows: "Die kostenlose Version verarbeitet bis zu 500 Zeilen. Laden Sie einen Teil der Datei hoch.",
          too_many_columns: "Wählen Sie bis zu 10 Spalten auf einmal.",
          no_columns: "Wählen Sie mindestens eine Spalte.",
          nothing_to_clean: "In diesen Spalten haben wir keine Beträge zum Umrechnen gefunden.",
          empty: "Die Datei ist leer oder hat unter der Kopfzeile keine Zeilen.",
          unreadable: "Wir konnten die Datei nicht lesen. Wenn es eine Excel-Datei ist, speichern Sie sie erneut als .xlsx.",
          failed: "Wir konnten diese Datei nicht umrechnen. Versuchen Sie es erneut oder probieren Sie die Beispieldatei.",
        },
        how: {
          heading: "So funktioniert es",
          steps: [
            { title: "Datei hochladen", body: "Eine CSV- oder Excel-Datei mit Preisen, Summen oder einer beliebigen Spalte mit Beträgen." },
            { title: "Währungen wählen", body: "Wir markieren die Spalten, die nach Beträgen aussehen. Sie geben an, in welcher Währung sie sind, wie ihre Dezimalstellen geschrieben werden und wohin umgerechnet werden soll." },
            { title: "Prüfen und herunterladen", body: "Jede umgerechnete Spalte steht neben dem Original. Mit Ihrem kostenlosen Konto nehmen Sie die Datei als Excel oder CSV mit." },
          ],
        },
        faqs: [
          { q: "Welchen Wechselkurs verwendet es?", a: "Den von der Europäischen Zentralbank veröffentlichten Referenzkurs des Tages. Er gilt für die gesamte Datei und ist ein Referenzwert, nicht der An- oder Verkaufskurs Ihrer Bank." },
          { q: "Welche Währungen kann ich umrechnen?", a: "US-Dollar (USD), Euro (EUR), Pfund (GBP), mexikanischer Peso (MXN), Real (BRL), Yuan (CNY), kanadischer Dollar, Yen, Schweizer Franken und die übrigen Währungen, die die Europäische Zentralbank veröffentlicht, insgesamt 30. Sie können von jeder in jede umrechnen." },
          { q: "Funktioniert es mit kolumbianischen Pesos, Soles, chilenischen Pesos oder Balboas?", a: "Noch nicht: Diese Währungen sind nicht in den Kursen der Europäischen Zentralbank enthalten. In Panama, wo der Balboa 1:1 an den Dollar gekoppelt ist, können Sie USD wählen." },
          { q: "Was passiert mit meinen ursprünglichen Spalten?", a: "Sie bleiben, wie sie waren. Die Umrechnung wird als neue Spalte daneben eingefügt, zum Beispiel „Preis (USD)“, damit Sie vergleichen können." },
          { q: "Was passiert mit Zellen, die keine Beträge sind?", a: "Sie bleiben in der umgerechneten Spalte leer. Text, ein Prozentsatz oder eine leere Zelle wird nicht umgerechnet." },
          { q: "Was passiert mit meiner Datei?", a: "Sie wird nur für diese Umrechnung verwendet und nach 24 Stunden zusammen mit dem Ergebnis gelöscht. Nur Ihr Browser kann das Ergebnis sehen." },
          { q: "Wie läuft das von selbst?", a: "In Tavnit ist die Währungsumrechnung ein Cleaner: Er läuft automatisch für jede Rechnung, die Sie extrahieren, oder jede Datei, die per E-Mail oder API eingeht – zusammen mit Datumsangaben, Zahlen und Prüfungen." },
        ],
        clean: {
          setup: {
            heading: "Spalten und Währungen wählen",
            fileSummary: "{rows} · {cols}",
            columnsLabel: "Spalten mit Beträgen",
            columnsHint: "Bis zu {max}. Wir haben die markiert, die nach Beträgen aussehen.",
            tooMany: "Sie können bis zu {max} Spalten auf einmal wählen.",
            sourceLabel: "Die Beträge sind in",
            sourceHint: "Währungen mit einem Kurs der Europäischen Zentralbank.",
            inputLabel: "Das Dezimalzeichen ist ein",
            inputOptions: { comma: "Komma · 1.234,56", dot: "Punkt · 1,234.56" },
            outputPopular: "Häufig verwendet",
            outputAll: "Alle Währungen",
            outputLabel: "Umrechnen in",
            outputOptions: {},
            preview: "Erste Zeilen",
            run: "Umrechnen",
            change: "Datei wechseln",
          },
          stages: ["Datei wird hochgeladen", "Beträge werden gelesen", "Tageskurs wird abgerufen", "Wird umgerechnet", "Ihre Datei wird erstellt"],
          heading: "Fertig: {file}",
          summary: "{cells} umgerechnet in {cols}",
          cellWord: ["Zelle", "Zellen"],
          columnWord: ["Spalte", "Spalten"],
          unchanged: "In diesen Spalten haben wir keine Beträge zum Umrechnen gefunden.",
          highlight: "Die umgerechneten Spalten sind blau markiert.",
          shown: "{shown} von {total} Zeilen werden angezeigt. Der Download enthält alle.",
          download: "Herunterladen",
          downloadXlsx: "Excel (.xlsx)",
          downloadCsv: "CSV (.csv)",
          another: "Weitere Datei umrechnen",
          automate: {
            heading: "Lassen Sie es bei jeder Rechnung passieren",
            body: "In Tavnit ist die Währungsumrechnung ein Cleaner. Sie richten ihn einmal ein, und jede Rechnung oder jedes Angebot in einer anderen Währung kommt bereits umgerechnet an – zusammen mit Datumsangaben, Zahlen und Prüfungen.",
            cta: "Kostenloses Konto erstellen",
            docs: "Was ist ein Cleaner?",
          },
        },
      },
    },
    /**
     * Translate columns. A spreadsheet in, a translated column next to each
     * chosen text column out. Every cell goes through a model, so the free
     * allowance is 200 rows instead of 500.
     */
    "translate-columns": {
      vocab: {
        doc: "Tabelle",
        docs: "Tabellen",
        a_doc: "eine Tabelle",
        the_doc: "die Tabelle",
        the_docs: "die Tabellen",
        your_doc: "Ihre Tabelle",
        your_docs: "Ihre Tabellen",
        all_your_docs: "alle Ihre Tabellen",
        all_docs: "alle Tabellen",
        each_doc: "jede Tabelle",
        another_doc: "eine weitere Tabelle",
        this_doc: "diese Tabelle",
      },
      overrides: {
        title: "Excel-Spalten übersetzen, kostenlos",
        description:
          "Laden Sie eine Excel- oder CSV-Datei hoch und übersetzen Sie die gewählten Spalten in mehr als 40 Sprachen: Englisch, Spanisch, Portugiesisch, Chinesisch und mehr. Jede Übersetzung wird neben ihrer Spalte eingefügt. Kostenlos, ohne Registrierung bis zum Ergebnis.",
        label: "Spalten übersetzen",
        h1: "Übersetzen Sie die Spalten Ihrer Tabelle",
        intro:
          "Laden Sie die Excel- oder CSV-Datei hoch. Wählen Sie, welche Spalten übersetzt werden sollen und in welche Sprache. Tavnit erkennt die Ausgangssprache und fügt die Übersetzung neben jeder Spalte ein; der Rest Ihrer Datei bleibt unberührt.",
        trust: ["CSV oder Excel · bis 200 Zeilen", "{limit} kostenlose Dateien pro Tag", "Nach 24 h wird alles gelöscht"],
        drop: {
          title: "Legen Sie Ihre Excel- oder CSV-Datei hier ab",
          hint: "oder wählen Sie eine Datei auf Ihrem Computer",
          choose: "Datei wählen",
          sample: "Beispieldatei ausprobieren",
          formats: "CSV oder .xlsx · bis 4 MB und 200 Zeilen",
        },
        errors: {
          unsupported: "Nur CSV- oder Excel-Dateien (.xlsx).",
          xls: "Das ist eine alte Excel-Datei (.xls). Öffnen Sie sie in Excel und speichern Sie sie als .xlsx oder .csv.",
          too_many_rows: "Die kostenlose Übersetzung verarbeitet bis zu 200 Zeilen. Laden Sie einen Teil der Datei hoch.",
          too_many_columns: "Wählen Sie bis zu 10 Spalten auf einmal.",
          no_columns: "Wählen Sie mindestens eine Spalte.",
          nothing_to_clean: "In diesen Spalten haben wir keinen Text zum Übersetzen gefunden.",
          empty: "Die Datei ist leer oder hat unter der Kopfzeile keine Zeilen.",
          unreadable: "Wir konnten die Datei nicht lesen. Wenn es eine Excel-Datei ist, speichern Sie sie erneut als .xlsx.",
          failed: "Wir konnten diese Datei nicht übersetzen. Versuchen Sie es erneut oder probieren Sie die Beispieldatei.",
        },
        how: {
          heading: "So funktioniert es",
          steps: [
            { title: "Datei hochladen", body: "Eine CSV- oder Excel-Datei mit Beschreibungen, Anweisungen, Kommentaren oder einer beliebigen Textspalte." },
            { title: "Spalten und Sprache wählen", body: "Wir markieren die Spalten mit Text. Sie wählen die Sprache; die Ausgangssprache wird automatisch erkannt." },
            { title: "Prüfen und herunterladen", body: "Jede Übersetzung steht neben ihrer Originalspalte. Mit Ihrem kostenlosen Konto nehmen Sie die Datei als Excel oder CSV mit." },
          ],
        },
        faqs: [
          { q: "Welche Sprachen kann ich wählen?", a: "Mehr als 40: Englisch, Spanisch, Portugiesisch, Französisch, Deutsch, Chinesisch, Italienisch, Japanisch, Koreanisch, Arabisch, Russisch, Hindi, Türkisch, Vietnamesisch und viele mehr. Die Ausgangssprache wird Zelle für Zelle erkannt, daher funktioniert es auch, wenn Ihre Datei Sprachen mischt." },
          { q: "Was passiert mit Codes, Zahlen und Eigennamen?", a: "Sie bleiben erhalten. Die Übersetzung respektiert Formatierung, Einheiten und Codes; eine Zelle, die schon in der Zielsprache ist, bleibt unverändert." },
          { q: "Warum liegt das Limit bei 200 Zeilen?", a: "Weil jede Zelle mit einem Sprachmodell übersetzt wird. Die kostenlose Version verarbeitet bis zu 200 Zeilen pro Datei; mit einem Konto gibt es dieses Limit nicht." },
          { q: "Was passiert mit meinen ursprünglichen Spalten?", a: "Sie bleiben, wie sie waren. Die Übersetzung wird als neue Spalte daneben eingefügt, zum Beispiel „Beschreibung (EN)“." },
          { q: "Kann ich es für Warenbeschreibungen beim Zoll nutzen?", a: "Ja, das ist ein häufiger Einsatz: die Beschreibungen einer Handelsrechnung oder Packliste ins Englische oder Spanische bringen, bevor die Waren tarifiert werden." },
          { q: "Was passiert mit meiner Datei?", a: "Sie wird nur für diese Übersetzung verwendet und nach 24 Stunden zusammen mit dem Ergebnis gelöscht. Nur Ihr Browser kann das Ergebnis sehen." },
          { q: "Wie läuft das von selbst?", a: "In Tavnit ist die Übersetzung ein Cleaner: Er läuft automatisch für jedes Dokument, das Sie extrahieren, oder jede Datei, die per E-Mail oder API eingeht – zusammen mit Datumsangaben, Zahlen und Währungen." },
        ],
        clean: {
          setup: {
            heading: "Spalten und Sprache wählen",
            fileSummary: "{rows} · {cols}",
            columnsLabel: "Spalten mit Text",
            columnsHint: "Bis zu {max}. Wir haben die mit Text markiert.",
            tooMany: "Sie können bis zu {max} Spalten auf einmal wählen.",
            inputLabel: "",
            inputOptions: {},
            outputPopular: "Häufig verwendet",
            outputAll: "Alle Sprachen",
            outputLabel: "Übersetzen in",
            outputOptions: {},
            preview: "Erste Zeilen",
            run: "Übersetzen",
            change: "Datei wechseln",
          },
          stages: ["Datei wird hochgeladen", "Spalten werden gelesen", "Sprache wird erkannt", "Wird übersetzt", "Ihre Datei wird erstellt"],
          heading: "Fertig: {file}",
          summary: "{cells} übersetzt in {cols}",
          cellWord: ["Zelle", "Zellen"],
          columnWord: ["Spalte", "Spalten"],
          unchanged: "In diesen Spalten haben wir keinen Text zum Übersetzen gefunden.",
          highlight: "Die übersetzten Spalten sind blau markiert.",
          shown: "{shown} von {total} Zeilen werden angezeigt. Der Download enthält alle.",
          download: "Herunterladen",
          downloadXlsx: "Excel (.xlsx)",
          downloadCsv: "CSV (.csv)",
          another: "Weitere Datei übersetzen",
          automate: {
            heading: "Lassen Sie es bei jedem Dokument passieren",
            body: "In Tavnit ist die Übersetzung ein Cleaner. Sie richten ihn einmal ein, und jede Rechnung, Packliste oder Datei, die eingeht, kommt mit bereits übersetzten Beschreibungen an.",
            cta: "Kostenloses Konto erstellen",
            docs: "Was ist ein Cleaner?",
          },
        },
      },
    },
  },

  og: {
    "invoice-to-excel": "Kostenlos. Ohne Vorlagen. Die Positionen Ihrer Rechnung als Tabelle.",
    "invoice-line-items": "Kostenlos. Eine Zeile pro Position, der Kopf in jeder Zeile. Ohne Vorlagen.",
    "po-invoice-check": "Kostenlos. Jede Bestellzeile gegen die Rechnung: Preis, Menge, fehlende und zusätzliche Zeilen.",
    "split-scanned-pdf": "Kostenlos. Ein Scan rein, jedes Dokument raus, jedes klassifiziert.",
    "packing-list-to-excel": "Kostenlos. Ohne Vorlagen. Jede Zeile Ihrer Packliste als Tabelle.",
    "bill-of-lading-to-excel": "Kostenlos. Ohne Vorlagen. Parteien, Schiff, Häfen und eine Zeile pro Container.",
    "quote-comparison": "Kostenlos. Zwei oder drei Angebote, eine Tabelle, das günstigste pro Zeile markiert.",
    "contract-dates": "Kostenlos. Parteien, Laufzeit, automatische Verlängerung und Kündigungsfrist in einer Zeile.",
    "receipt-to-excel": "Kostenlos. Beleg fotografieren, Artikel als Tabelle erhalten.",
    "number-format": "Kostenlos. Jede Zahlenspalte in einem Format: 1234.56, 1,234.56 oder 1.234,56.",
    "date-format": "Kostenlos. Gemischte Datumsangaben rein, ein Format raus – auch ausgeschriebene.",
    "currency-converter": "Kostenlos. Jede Preisspalte, umgerechnet zum Referenzkurs des Tages.",
    "translate-columns": "Kostenlos. Jede Textspalte, übersetzt in eine von über 40 Sprachen.",
  },
};

export default de;
