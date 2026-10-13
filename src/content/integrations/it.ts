import type { IntegrationsContent } from "@/content/types";

/** Integrations: the /integrations hub (cards included) and /integrations/mcp — Italiano (it). */
const it: IntegrationsContent = {
  hub: {
    title: "Integrazioni — API, email, webhook e MCP",
    description:
      "Tutti i modi per far entrare i documenti in Tavnit e farne uscire i dati: un connettore MCP per gli assistenti AI, un'API REST, l'inoltro via email, i webhook e le ricette per Zapier, Make e n8n.",
    ogTitle: "Integrazioni Tavnit",
    breadcrumbHome: "Home",
    h1: "Integrazioni",
    intro:
      "I documenti arrivano a Tavnit nel modo più comodo per chi li invia: caricati nell'app, inoltrati a un indirizzo, inviati a un endpoint o richiesti da un assistente AI. I dati estratti escono allo stesso modo.",
    introMore:
      "Ogni canale esegue gli stessi Flow, quindi lo schema, le regole di pulizia e i passaggi di revisione che hai configurato valgono qualunque sia la strada da cui arriva un documento.",
    whichHeading: "Quale ti conviene usare?",
    which: [
      "**Se a inviare i documenti sono delle persone** (per esempio una casella della contabilità che riceve le fatture dei fornitori), usa l'[email](/docs/email-integration). Nessuno deve imparare un nuovo strumento: inoltrano come fanno già.",
      "**Se a inviarli è un sistema**, usa l'[API REST](/docs/api-integration) e fatti restituire i risultati via [webhook](/docs/webhooks). Se preferisci non scrivere codice di raccordo, gli stessi endpoint funzionano da Zapier, Make, n8n e Power Automate.",
      "**Se lavori insieme a un assistente AI**, usa il [connettore MCP](/integrations/mcp). Dà a claude.ai o Cursor l'intera pipeline, non solo un punto d'ingresso: il tuo assistente può creare Flow di estrazione, aggiungere regole di pulizia, farci passare i documenti e interrogare ciò che hai già estratto, senza che tu debba spostare file a mano.",
    ],
    finalHeading: "Inizia con un solo documento",
    finalBody:
      "Crea un Flow, fai passare un documento e configura la consegna dei dati quando vedi il risultato. Crediti gratuiti per iniziare.",
    finalCta: "Inizia gratis",
  },
  items: [
    {
      label: "Connettore MCP",
      href: "/integrations/mcp",
      summary:
        "Aggiungi Tavnit a claude.ai, Cursor o qualsiasi client MCP. Il tuo assistente può creare Flow di estrazione, aggiungere regole di pulizia, farci passare i documenti e interrogare i dati estratti, tutto in chat.",
      own: true,
    },
    {
      label: "API REST",
      href: "/docs/api-integration",
      summary:
        "Invia documenti in modo programmatico con una chiave API. Caricamento multipart o base64, con esempi in Python e JavaScript.",
      own: false,
    },
    {
      label: "Email",
      href: "/docs/email-integration",
      summary:
        "Inoltra, anche in automatico, i documenti a un indirizzo dedicato e fai estrarre ogni allegato, con i risultati inviati via email a chi ne ha bisogno, senza mai aprire l'app.",
      own: false,
    },
    {
      label: "Webhook",
      href: "/docs/webhooks",
      summary:
        "Invia i risultati tipizzati al tuo endpoint appena un'esecuzione termina, così i dati estratti arrivano nei tuoi sistemi in automatico.",
      own: false,
    },
    {
      label: "Zapier, Make, n8n e Power Automate",
      href: "/docs/api-integration",
      summary:
        "Ricette no-code che chiamano gli stessi endpoint, per i team che preferiscono collegare tutto visivamente invece di scrivere codice.",
      own: false,
    },
    {
      label: "Bucket",
      href: "/docs/buckets",
      summary:
        "Conserva le righe estratte in un archivio strutturato integrato: modificale sul posto, interrogale e trasformale in grafici, oppure esportale in CSV ed Excel.",
      own: false,
    },
  ],
  mcp: {
    title: "Estrazione documenti via MCP per Claude e Cursor",
    description:
      "Collega Tavnit a claude.ai o Cursor tramite MCP. Il tuo assistente può creare Flow di estrazione, farci passare i documenti e interrogare i risultati, tipizzati e puliti.",
    ogTitle: "Server MCP per l'estrazione di documenti | Tavnit",
    schemaHeadline: "Server MCP per l'estrazione di documenti — Claude e Cursor",
    schemaName: "Connettore MCP",
    breadcrumbHome: "Home",
    breadcrumbHub: "Integrazioni",
    breadcrumbSelf: "Connettore MCP",
    badge: "Model Context Protocol",
    h1: "Dai al tuo assistente AI una vera pipeline documentale",
    lede:
      "Tavnit offre un server MCP. Collegalo a claude.ai o Cursor e il tuo assistente avrà a disposizione l'intera pipeline documentale: può creare Flow di estrazione, aggiungere regole di pulizia, farci passare i documenti e leggerne i risultati, cioè esattamente i campi che hai definito, puliti e tipizzati, invece di un'interpretazione del file che gli è stato passato.",
    ledeMore: "La configurazione è un URL da incollare nelle impostazioni del tuo assistente. Nessun SDK, nessun server da gestire, nessuna riga di codice.",
    ctaStart: "Inizia gratis",
    ctaSetup: "Guida alla configurazione",
    problemHeading: "Perché gli assistenti faticano con i documenti",
    problem: [
      "Gli assistenti AI sono bravi a ragionare e pessimi come pipeline di dati. Passagli una fattura scansionata e la leggeranno: probabilmente bene, a volte no, e in modo diverso la seconda volta. Non c'è uno schema, quindi i nomi dei campi cambiano da un'esecuzione all'altra. Non c'è convalida, quindi un totale letto male sembra identico a uno corretto. E non resta traccia di ciò che è successo, il che conta non appena il risultato tocca la contabilità o la conformità normativa.",
      "Va bene per una domanda occasionale, ma non regge come processo. Ciò di cui un assistente ha davvero bisogno è uno strumento che sappia già leggere i tuoi documenti.",
    ],
    compareHeading: "Incollare un PDF o chiamare un Flow",
    compareCapability: "Funzionalità",
    compareChat: "Incollando il file in chat",
    compareMcp: "Tramite il connettore MCP",
    compareRows: [
      ["Forma del risultato", "Quello che il modello restituisce quella volta", "I campi definiti dal tuo Flow, ogni volta"],
      ["Nomi dei campi", "Cambiano da un'esecuzione all'altra", "Fissati dal tuo schema"],
      ["Regole di pulizia", "Nessuna", "Cleaner applicati automaticamente"],
      ["Revisione umana", "Impossibile", "Opzionale, con audit trail"],
      ["Dove finiscono i risultati", "In chat", "Bucket, webhook, email o API"],
      ["Ripetibile su grandi volumi", "No", "Sì: stesso Flow, qualsiasi numero di documenti"],
    ],
    capabilitiesHeading: "Cosa può fare il tuo assistente una volta collegato",
    capabilities: [
      {
        title: "Creare un Flow descrivendolo",
        body: "Di' all'assistente cosa acquisire (fornitore, date, totali, righe) e creerà il Flow di estrazione nella tua organizzazione, pronto all'uso. Impostare una pipeline diventa un messaggio in chat, non un pomeriggio di configurazione.",
      },
      {
        title: "Aggiungere regole di pulizia",
        body: "Chiedi di convertire i totali in USD, normalizzare le date o confrontare i valori con dati di riferimento, e l'assistente crea il Cleaner e lo collega al Flow: le stesse regole si applicheranno poi a ogni documento futuro, da qualunque canale arrivi.",
      },
      {
        title: "Far passare un documento in un Flow",
        body: "Chiedi all'assistente di elaborare una fattura, un contratto o un modulo con uno dei tuoi Flow di estrazione. Ti restituisce i campi che hai definito, tipizzati e puliti, non un paragrafo che li descrive.",
      },
      {
        title: "Interrogare ciò che hai già estratto",
        body: "Fai domande sui tuoi Bucket (quanto hai pagato un fornitore lo scorso trimestre, quali contratti si rinnovano il mese prossimo) e la risposta arriva dai tuoi dati reali, non dalla memoria del modello.",
      },
    ],
    askHeading: "Cose che puoi chiedergli:",
    ask: [
      "Crea un Flow che acquisisca fornitore, date, totali e righe dalle nostre fatture di trasporto.",
      "Aggiungi a quel Flow un Cleaner che converta ogni totale in USD.",
      "Elabora questa fattura con il mio Flow Fatture fornitori e mostrami le righe.",
      "Quanto abbiamo pagato Acme Corp lo scorso trimestre, secondo il mio Bucket Fatture?",
      "Estrai le date di rinnovo da questi tre contratti e confrontale.",
      "Quali esecuzioni sono in attesa di revisione in questo momento?",
    ],
    fitsHeading: "Usa la pipeline che hai già costruito",
    fitsIntro:
      "Il connettore non è un motore di estrazione separato. Chiama gli stessi Flow del resto di Tavnit, che tu li abbia creati nell'app o che li abbia creati l'assistente per te: ogni regola che hai configurato continua quindi a valere anche quando a fare la richiesta è un assistente.",
    fits: [
      "Le [Collection](/docs/collections) continuano a classificare i documenti in arrivo e a indirizzarli al Flow giusto.",
      "I [Cleaner](/docs/cleaners) continuano a standardizzare i formati, convertire le valute e applicare le tue ricerche.",
      "La [revisione umana](/docs/human-in-the-loop) continua a mettere in pausa un'esecuzione quando lo hai richiesto: un assistente non può saltare il tuo passaggio di approvazione.",
      "I [Bucket](/docs/buckets) continuano a ricevere i risultati, quindi ciò che l'assistente estrae resta interrogabile in seguito.",
    ],
    scopeHeading: "Ambito e accesso",
    scopeCards: [
      {
        title: "I tuoi permessi, non di più",
        body: "Il connettore viene generato dalla tua chiave API e raggiunge solo l'organizzazione in cui l'hai creato. L'assistente eredita il tuo ruolo: non può fare nulla che tu non possa fare nell'app.",
      },
      {
        title: "Tratta l'URL come una credenziale",
        body: "Chiunque abbia l'URL del connettore può accedere ai tuoi Flow e Bucket. Gli URL hanno una scadenza, e rigenerarne uno invalida subito il valore precedente.",
      },
    ],
    scopeMore:
      "Tutti i dettagli nella [documentazione del connettore](/docs/mcp-connector) e nel [riferimento sui ruoli utente](/docs/user-roles). L'endpoint del server è `{mcpUrl}`.",
    setupHeading: "Come collegarlo",
    setupBody:
      "Genera un URL del connettore nella pagina Integrazioni di Tavnit, poi incollalo in claude.ai in Impostazioni → Connettori, oppure aggiungilo a Cursor come server MCP remoto. Bastano un paio di minuti e nessuna riga di codice.",
    setupLink: "Leggi la guida passo passo",
    faqHeading: "Domande frequenti",
    faqs: [
      {
        q: "In cosa è diverso dall'incollare un PDF in Claude?",
        a: "Incollando un PDF chiedi all'assistente di leggere un documento che non ha mai visto, in un formato che non è fatto per analizzare, senza schema e senza modo di verificare il risultato. Il connettore MCP fa passare il documento in un Flow di estrazione che hai definito tu, così ottieni ogni volta gli stessi campi con gli stessi nomi, gli stessi tipi, le stesse regole di pulizia e lo stesso passaggio di revisione. L'assistente riceve dati strutturati, non un'interpretazione.",
      },
      {
        q: "L'assistente può creare Flow e Cleaner o solo eseguirli?",
        a: "Entrambe le cose. Tramite il connettore, l'assistente può creare Flow di estrazione e regole di pulizia come faresti tu nell'app: descrivi in linguaggio naturale i campi, le tabelle e le trasformazioni che vuoi, e vengono creati nella tua organizzazione, pronti a girare su ogni documento futuro. La creazione segue il tuo ruolo: Owner e Admin possono creare, Member e Viewer restano in sola esecuzione o sola lettura.",
      },
      {
        q: "Con quali assistenti AI funziona?",
        a: "claude.ai con un piano Pro o superiore, Cursor e qualsiasi client che accetti l'URL di un server MCP remoto. MCP è un protocollo aperto, quindi il supporto non è legato a un fornitore specifico.",
      },
      {
        q: "Devo scrivere codice?",
        a: "No. Generi un URL del connettore in Tavnit e lo incolli nelle impostazioni del tuo assistente. Anche creare il Flow che richiama è no-code: descrivi i campi che vuoi e Tavnit li estrae.",
      },
      {
        q: "L'assistente può vedere tutto l'account della mia azienda?",
        a: "No. Il connettore viene generato dalla tua chiave API, quindi raggiunge solo l'organizzazione in cui avevi effettuato l'accesso, con i permessi del tuo ruolo. Un Member non può far fare a un assistente ciò che un Member non può fare nell'app, e i Bucket privati restano privati a meno che tu non abbia ricevuto l'accesso.",
      },
      {
        q: "Usare il connettore costa di più?",
        a: "No. I documenti elaborati tramite il connettore consumano crediti alla tariffa normale di un credito per pagina, come quando li carichi nell'app o chiami l'API. Non c'è alcun costo separato per l'accesso MCP.",
      },
      {
        q: "Cosa succede quando l'URL del connettore scade?",
        a: "Gli URL del connettore hanno una scadenza, e Tavnit mostra quando il tuo è stato creato e quando scade. Rigenerarlo produce un nuovo URL e invalida subito quello precedente, quindi qualsiasi client che usi ancora il vecchio smette di funzionare finché non incolli il nuovo valore.",
      },
    ],
    finalHeading: "Metti il tuo assistente al lavoro su documenti reali",
    finalBody:
      "Crea un Flow, genera un URL del connettore e inizia a fare domande. Crediti gratuiti per iniziare, senza carta di credito.",
    finalPricing: "Vedi i prezzi",
    finalDemo: "Prenota una demo",
  },
};

export default it;
