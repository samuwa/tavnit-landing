import type { IntegrationsContent } from "@/content/types";

/**
 * Integrations: the /integrations hub (cards included) and /integrations/mcp — Deutsch (de).
 */
const de: IntegrationsContent = {
  hub: {
    title: "Integrationen — API, E-Mail, Webhooks und MCP",
    description:
      "Alle Wege zu Tavnit und wieder hinaus: ein MCP-Connector für KI-Assistenten, eine REST-API, E-Mail-Weiterleitung, Webhooks sowie Vorlagen für Zapier, Make und n8n.",
    ogTitle: "Tavnit-Integrationen",
    breadcrumbHome: "Startseite",
    h1: "Integrationen",
    intro:
      "Dokumente gelangen so zu Tavnit, wie es dem sendenden Team am besten passt – in der App abgelegt, an eine Adresse weitergeleitet, an einen Endpunkt gesendet oder von einem KI-Assistenten angefordert. Die extrahierten Daten verlassen Tavnit auf denselben Wegen.",
    introMore:
      "Jeder Weg nutzt dieselben Flows. Schema, Bereinigungsregeln und Prüfschritte, die Sie konfiguriert haben, gelten also unabhängig davon, wie ein Dokument ankommt.",
    whichHeading: "Welcher Weg ist der richtige?",
    which: [
      "**Wenn Menschen die Dokumente senden** – etwa ein Buchhaltungspostfach, das Lieferantenrechnungen empfängt –, nutzen Sie [E-Mail](/docs/email-integration). Niemand muss ein neues Tool lernen; alle leiten weiter wie bisher.",
      "**Wenn ein System sie sendet**, nutzen Sie die [REST-API](/docs/api-integration) und lassen sich die Ergebnisse per [Webhook](/docs/webhooks) zurückschicken. Wenn Sie keinen Verbindungscode schreiben möchten, funktionieren dieselben Endpunkte auch aus Zapier, Make, n8n und Power Automate.",
      "**Wenn Sie mit einem KI-Assistenten arbeiten**, nutzen Sie den [MCP-Connector](/integrations/mcp). Er gibt claude.ai oder Cursor die komplette Pipeline, nicht nur einen Eingang: Ihr Assistent kann Extraktions-Flows bauen, Bereinigungsregeln anhängen, Dokumente durchlaufen lassen und bereits extrahierte Daten abfragen – ohne dass Sie Dateien von Hand hin- und herschieben.",
    ],
    finalHeading: "Beginnen Sie mit einem Dokument",
    finalBody:
      "Bauen Sie einen Flow, schicken Sie etwas hindurch und richten Sie die Zustellung ein, sobald Sie das Ergebnis sehen. Kostenlose Credits für den Einstieg.",
    finalCta: "Kostenlos starten",
  },
  items: [
    {
      label: "MCP-Connector",
      href: "/integrations/mcp",
      summary:
        "Fügen Sie Tavnit zu claude.ai, Cursor oder einem anderen MCP-Client hinzu. Ihr Assistent kann Extraktions-Flows bauen, Bereinigungsregeln anhängen, Dokumente verarbeiten und die extrahierten Daten abfragen – alles per Chat.",
      own: true,
    },
    {
      label: "REST-API",
      href: "/docs/api-integration",
      summary:
        "Senden Sie Dokumente programmatisch mit einem API-Schlüssel. Upload als Multipart oder Base64, mit Beispielen in Python und JavaScript.",
      own: false,
    },
    {
      label: "E-Mail",
      href: "/docs/email-integration",
      summary:
        "Leiten Sie Dokumente manuell oder automatisch an eine eigene Adresse weiter, und jeder Anhang wird extrahiert – die Ergebnisse gehen per E-Mail an alle, die sie brauchen, ohne dass jemand die App öffnet.",
      own: false,
    },
    {
      label: "Webhooks",
      href: "/docs/webhooks",
      summary:
        "Senden Sie typisierte Ergebnisse an Ihren eigenen Endpunkt, sobald ein Durchlauf fertig ist, damit die extrahierten Daten automatisch in Ihren Systemen landen.",
      own: false,
    },
    {
      label: "Zapier, Make, n8n und Power Automate",
      href: "/docs/api-integration",
      summary:
        "No-Code-Vorlagen, die dieselben Endpunkte aufrufen – für Teams, die lieber visuell verbinden als Code schreiben.",
      own: false,
    },
    {
      label: "Buckets",
      href: "/docs/buckets",
      summary:
        "Speichern Sie extrahierte Zeilen im integrierten strukturierten Speicher – direkt bearbeiten, abfragen und visualisieren oder als CSV und Excel exportieren.",
      own: false,
    },
  ],
  mcp: {
    title: "MCP-Dokumentenextraktion für Claude und Cursor",
    description:
      "Verbinden Sie Tavnit per MCP mit claude.ai oder Cursor. Ihr Assistent kann Extraktions-Flows bauen, Dokumente verarbeiten und die Ergebnisse abfragen – typisiert und bereinigt.",
    ogTitle: "MCP-Server für Dokumentenextraktion | Tavnit",
    schemaHeadline: "MCP-Server für Dokumentenextraktion — Claude und Cursor",
    schemaName: "MCP-Connector",
    breadcrumbHome: "Startseite",
    breadcrumbHub: "Integrationen",
    breadcrumbSelf: "MCP-Connector",
    badge: "Model Context Protocol",
    h1: "Geben Sie Ihrem KI-Assistenten eine echte Dokumenten-Pipeline",
    lede:
      "Tavnit betreibt einen MCP-Server. Verbinden Sie ihn mit claude.ai oder Cursor, und Ihr Assistent erhält die komplette Dokumenten-Pipeline: Er kann Extraktions-Flows bauen, Bereinigungsregeln anhängen, Dokumente durchschicken und die Ergebnisse zurücklesen – genau die Felder, die Sie definiert haben, bereinigt und typisiert, statt einer Interpretation einer Datei, die man ihm gegeben hat.",
    ledeMore: "Die Einrichtung ist eine URL, die Sie in die Einstellungen Ihres Assistenten einfügen. Kein SDK, kein eigener Server, kein Code.",
    ctaStart: "Kostenlos starten",
    ctaSetup: "Einrichtungsanleitung",
    problemHeading: "Warum Assistenten mit Dokumenten kämpfen",
    problem: [
      "KI-Assistenten können gut schlussfolgern, taugen aber schlecht als Datenpipeline. Geben Sie einem Assistenten eine gescannte Rechnung, und er liest sie – wahrscheinlich richtig, manchmal nicht, und beim zweiten Mal anders. Es gibt kein Schema, also ändern sich die Feldnamen von Durchlauf zu Durchlauf. Es gibt keine Validierung, also sieht eine falsch gelesene Summe genauso aus wie eine richtige. Und es gibt kein Protokoll darüber, was passiert ist – was zählt, sobald das Ergebnis Buchhaltung oder Compliance berührt.",
      "Für eine einmalige Frage ist das in Ordnung, als Prozess ist es untauglich. Was ein Assistent wirklich braucht, ist ein Werkzeug, das Ihre Dokumente bereits lesen kann.",
    ],
    compareHeading: "PDF einfügen vs. einen Flow aufrufen",
    compareCapability: "Funktion",
    compareChat: "Datei in den Chat einfügen",
    compareMcp: "Über den MCP-Connector",
    compareRows: [
      ["Ausgabeformat", "Was das Modell diesmal zurückgibt", "Die Felder Ihres Flows, jedes Mal"],
      ["Feldnamen", "Ändern sich zwischen Durchläufen", "Durch Ihr Schema festgelegt"],
      ["Bereinigungsregeln", "Keine", "Cleaner werden automatisch angewendet"],
      ["Manuelle Prüfung", "Nicht möglich", "Optional, mit Audit-Trail"],
      ["Wohin die Ergebnisse gehen", "In den Chat", "Buckets, Webhook, E-Mail oder API"],
      ["Wiederholbar in großem Umfang", "Nein", "Ja – derselbe Flow, beliebig viele Dokumente"],
    ],
    capabilitiesHeading: "Was Ihr Assistent nach dem Verbinden kann",
    capabilities: [
      {
        title: "Einen Flow per Beschreibung bauen",
        body: "Sagen Sie dem Assistenten, was erfasst werden soll – Lieferant, Datumsangaben, Summen, Positionen –, und er legt den Extraktions-Flow in Ihrer Organisation an, startklar. Eine Pipeline einzurichten wird zu einer Chatnachricht statt zu einem Nachmittag voller Konfiguration.",
      },
      {
        title: "Bereinigungsregeln anhängen",
        body: "Bitten Sie darum, Summen in USD umzurechnen, Datumsangaben zu vereinheitlichen oder Werte mit Referenzdaten abzugleichen, und der Assistent erstellt den Cleaner und hängt ihn an den Flow – dieselben Regeln laufen dann bei jedem künftigen Dokument, egal wie es ankommt.",
      },
      {
        title: "Ein Dokument durch einen Flow schicken",
        body: "Bitten Sie den Assistenten, eine Rechnung, einen Vertrag oder ein Formular mit einem Ihrer Extraktions-Flows zu verarbeiten. Er liefert die von Ihnen definierten Felder zurück, typisiert und bereinigt – keinen Absatz, der sie beschreibt.",
      },
      {
        title: "Bereits extrahierte Daten abfragen",
        body: "Stellen Sie Fragen an Ihre Buckets – was Sie einem Lieferanten im letzten Quartal gezahlt haben, welche Verträge sich nächsten Monat verlängern –, und die Antwort kommt aus Ihren aktuellen Daten statt aus dem Gedächtnis des Modells.",
      },
    ],
    askHeading: "Was Sie fragen können:",
    ask: [
      "Erstelle einen Flow, der Lieferant, Datumsangaben, Summen und Positionen aus unseren Frachtrechnungen erfasst.",
      "Füge diesem Flow einen Cleaner hinzu, der jede Summe in USD umrechnet.",
      "Schick diese Rechnung durch meinen Flow „Lieferantenrechnungen“ und zeig mir die Positionen.",
      "Was haben wir laut meinem Bucket „Rechnungen“ im letzten Quartal an Acme Corp gezahlt?",
      "Extrahiere die Verlängerungsdaten aus diesen drei Verträgen und vergleiche sie.",
      "Welche Durchläufe warten gerade auf Prüfung?",
    ],
    fitsHeading: "Er nutzt die Pipeline, die Sie bereits gebaut haben",
    fitsIntro:
      "Der Connector ist keine separate Extraktions-Engine. Er ruft dieselben Flows auf wie der Rest von Tavnit – ob Sie sie in der App gebaut haben oder der Assistent sie für Sie erstellt hat. Jede Regel, die Sie konfiguriert haben, gilt also auch dann, wenn ein Assistent die Anfrage stellt.",
    fits: [
      "[Collections](/docs/collections) klassifizieren eingehende Dokumente weiterhin und leiten sie an den richtigen Flow.",
      "[Cleaner](/docs/cleaners) vereinheitlichen weiterhin Formate, rechnen Währungen um und wenden Ihre Abgleiche an.",
      "Die [manuelle Prüfung](/docs/human-in-the-loop) hält einen Durchlauf weiterhin an, wenn Sie es so festgelegt haben – ein Assistent kann Ihren Freigabeschritt nicht überspringen.",
      "[Buckets](/docs/buckets) empfangen weiterhin die Ergebnisse, sodass alles, was der Assistent extrahiert, anschließend abfragbar ist.",
    ],
    scopeHeading: "Umfang und Zugriff",
    scopeCards: [
      {
        title: "Ihre Berechtigungen, nicht mehr",
        body: "Der Connector wird aus Ihrem eigenen API-Schlüssel erzeugt und erreicht nur die Organisation, in der Sie ihn generiert haben. Der Assistent übernimmt Ihre Rolle – er kann nichts tun, was Sie in der App nicht auch könnten.",
      },
      {
        title: "Behandeln Sie die URL wie ein Passwort",
        body: "Wer die Connector-URL besitzt, kann auf Ihre Flows und Buckets zugreifen. URLs sind zeitlich begrenzt, und eine Erneuerung macht den vorherigen Wert sofort ungültig.",
      },
    ],
    scopeMore:
      "Alle Details in der [Connector-Dokumentation](/docs/mcp-connector) und der [Referenz zu Benutzerrollen](/docs/user-roles). Der Server-Endpunkt lautet `{mcpUrl}`.",
    setupHeading: "Verbinden",
    setupBody:
      "Erzeugen Sie auf der Seite „Integrationen“ in Tavnit eine Connector-URL und fügen Sie sie in claude.ai unter Einstellungen → Connectors ein oder fügen Sie sie in Cursor als Remote-MCP-Server hinzu. Das dauert ein paar Minuten und erfordert keinen Code.",
    setupLink: "Schritt-für-Schritt-Anleitung lesen",
    faqHeading: "Häufige Fragen",
    faqs: [
      {
        q: "Was ist der Unterschied dazu, ein PDF in Claude einzufügen?",
        a: "Wenn Sie ein PDF einfügen, soll der Assistent ein Dokument lesen, das er nie gesehen hat, in einem Format, für dessen Auswertung er nicht gebaut wurde – ohne Schema und ohne Möglichkeit, das Ergebnis zu prüfen. Der MCP-Connector schickt das Dokument durch einen von Ihnen definierten Extraktions-Flow. Sie erhalten jedes Mal dieselben benannten Felder in denselben Typen, mit denselben Bereinigungsregeln und demselben Prüfschritt. Der Assistent bekommt strukturierte Daten statt einer Interpretation.",
      },
      {
        q: "Kann der Assistent Flows und Cleaner bauen oder nur ausführen?",
        a: "Beides. Über den Connector kann der Assistent Extraktions-Flows und Bereinigungsregeln genauso erstellen wie Sie in der App: Beschreiben Sie die gewünschten Felder, Tabellen und Umwandlungen in natürlicher Sprache, und sie werden in Ihrer Organisation angelegt, bereit für jedes künftige Dokument. Das Erstellen richtet sich nach Ihrer Rolle – Owner und Admins können bauen, Members und Viewer bleiben beim Ausführen bzw. Lesen.",
      },
      {
        q: "Welche KI-Assistenten funktionieren damit?",
        a: "claude.ai ab dem Pro-Tarif, Cursor und jeder Client, der eine Remote-MCP-Server-URL akzeptiert. MCP ist ein offenes Protokoll, die Unterstützung ist also nicht auf einen bestimmten Anbieter beschränkt.",
      },
      {
        q: "Muss ich Code schreiben?",
        a: "Nein. Sie erzeugen in Tavnit eine Connector-URL und fügen sie in die Einstellungen Ihres Assistenten ein. Auch der Flow, den er aufruft, entsteht ohne Code – Sie beschreiben die gewünschten Felder, und Tavnit extrahiert sie.",
      },
      {
        q: "Kann der Assistent alles im Konto meines Unternehmens sehen?",
        a: "Nein. Der Connector wird aus Ihrem eigenen API-Schlüssel erzeugt und erreicht daher nur die Organisation, in der Sie angemeldet waren, mit den Berechtigungen Ihrer Rolle. Ein Member kann einen Assistenten nichts tun lassen, was ein Member in der App nicht tun kann, und private Buckets bleiben privat, sofern Ihnen kein Zugriff gewährt wurde.",
      },
      {
        q: "Kostet die Nutzung des Connectors extra?",
        a: "Nein. Über den Connector verarbeitete Dokumente verbrauchen Credits zum normalen Satz von einem Credit pro Seite – genau wie beim Hochladen in der App oder beim Aufruf der API. Für den MCP-Zugang gibt es keine separate Gebühr.",
      },
      {
        q: "Was passiert, wenn die Connector-URL abläuft?",
        a: "Connector-URLs sind zeitlich begrenzt, und Tavnit zeigt an, wann Ihre erstellt wurde und wann sie abläuft. Eine Erneuerung erzeugt eine neue URL und macht die vorherige sofort ungültig. Jeder Client, der noch die alte verwendet, funktioniert erst wieder, wenn Sie den neuen Wert einfügen.",
      },
    ],
    finalHeading: "Lassen Sie Ihren Assistenten mit echten Dokumenten arbeiten",
    finalBody:
      "Bauen Sie einen Flow, erzeugen Sie eine Connector-URL und legen Sie los. Kostenlose Credits für den Einstieg, keine Kreditkarte erforderlich.",
    finalPricing: "Preise ansehen",
    finalDemo: "Demo vereinbaren",
  },
};

export default de;
