import type { UseCasesContent } from "@/content/types";
import type { UseCase } from "@/lib/use-cases";

/** Use cases: the /use-cases hub copy and every use-case page — Italiano (it). */
const items: UseCase[] = [
  {
    slug: "invoice-processing",
    label: "Elaborazione fatture",
    badge: "Finanza e contabilità fornitori",
    h1: "Estrazione automatica dei dati dalle fatture",
    title: "Software di estrazione dati dalle fatture, righe incluse",
    description:
      "Estrai fornitore, numero fattura, date, totali e tutte le righe dalle fatture dei fornitori in qualsiasi layout, con una revisione prima che qualcosa arrivi in contabilità.",
    summary:
      "Fornitore, numero, date, totali e righe estratti da qualsiasi layout, con una revisione prima che arrivino in contabilità.",
    lede: "Tavnit legge le fatture dei fornitori in qualsiasi layout e restituisce fornitore, numero fattura, date, imposte, totali e ogni riga come campi tipizzati. Nessun template da costruire per ogni fornitore. Nulla viene registrato in contabilità finché un revisore non lo approva, e ogni approvazione resta tracciata.",
    problem: [
      "La contabilità fornitori è la versione classica di questo problema: gli stessi otto campi, ridigitati ogni mese da cento layout diversi. Ogni fornitore impagina a modo suo, alcuni mandano scansioni, altri foto di scansioni, e quelli che cambiano template lo fanno senza avvisare.",
      "Gli strumenti basati su template gestiscono male il primo problema: configuri un layout per fornitore, e ogni nuovo fornitore è un lavoro di setup. Appena un fornitore ridisegna la fattura, il template si rompe in silenzio e gli errori scorrono a valle fino alla contabilità.",
    ],
    fields: [
      { name: "Ragione sociale e indirizzo del fornitore", note: "Spesso diversi dal nome commerciale che hai in anagrafica: un Cleaner di ricerca può abbinarli al tuo elenco fornitori." },
      { name: "Numero fattura", note: "Tipizzato come testo, non come numero. Zeri iniziali e prefissi contano, e una conversione numerica li distrugge." },
      { name: "Data di emissione e di scadenza", note: "I formati cambiano da paese a paese. Un Cleaner per le date normalizza GG/MM e MM/GG in un unico formato di uscita." },
      { name: "Righe", note: "Una tabella ripetuta: descrizione, quantità, prezzo unitario, importo. La parte che la maggior parte degli strumenti salta o appiattisce." },
      { name: "Imponibile, imposte, sconto, totale", note: "Conviene estrarli tutti e quattro, così i conti si possono verificare invece di prenderli sulla fiducia." },
      { name: "Valuta", note: "Un Cleaner per le valute può convertire nella tua valuta di riferimento nello stesso passaggio." },
      { name: "Numero d'ordine", note: "Quando c'è, è ciò che ti permette di abbinare automaticamente la fattura a un ordine di acquisto." },
    ],
    gotchas: [
      {
        title: "Sulle righe l'estrazione di solito fallisce",
        body: "I campi di testata sono facili. Una tabella che scavalca un cambio pagina, ha celle unite o spezza le descrizioni su due righe è il punto in cui la maggior parte degli strumenti restituisce qualcosa di plausibile e sbagliato. I campi di tabella di un Flow gestiscono le righe ripetute come righe, quindi una fattura con cinque righe restituisce cinque record, non un unico blocco di testo.",
      },
      {
        title: "Un totale sbagliato sembra identico a uno giusto",
        body: "Non c'è alcuna differenza visiva tra 1.240,00 € letto correttamente e 1.240,00 € letto male che in realtà era 1.249,00 €. È l'argomento a favore della revisione condizionale: una regola del Cleaner può verificare che le righe sommino all'imponibile e mandare a una persona solo i casi che non tornano, così non devi rivedere tutto per scovare i pochi che contano.",
      },
      {
        title: "Più fatture arrivano in un solo PDF",
        body: "Un estratto conto del fornitore o un lotto scansionato contiene spesso più fatture in un unico file. Uno Splitter le separa prima, così ognuna diventa un'esecuzione a sé con il proprio record estratto, invece di un unico pasticcio unito.",
      },
    ],
    pipeline: [
      { label: "Integrazione email", href: "/docs/email-integration", why: "I fornitori inviano già le fatture via email. Inoltra in automatico la casella della contabilità e ogni allegato viene elaborato senza che nessuno apra l'app." },
      { label: "Splitter", href: "/docs/splitters", why: "Separa le scansioni in lotti o pinzate in singole fatture prima dell'estrazione." },
      { label: "Cleaner", href: "/docs/cleaners", why: "Normalizza le date, converte le valute, abbina i fornitori al tuo elenco e segnala i conti che non tornano." },
      { label: "Revisione umana", href: "/docs/human-in-the-loop", why: "Mette in attesa un'esecuzione per l'approvazione (ogni fattura, o solo quelle segnalate da una regola) con un registro non modificabile di chi ha approvato cosa." },
      { label: "Webhook", href: "/docs/webhooks", why: "Invia il record approvato direttamente al tuo gestionale contabile non appena supera la revisione." },
    ],
    faqs: [
      { q: "Gestisce fatture scansionate e fotografate?", a: "Sì. Scansioni, foto e PDF basati su immagini passano tutti dall'OCR prima dell'estrazione. La qualità conta comunque (una scansione nitida si estrae in modo più affidabile di una foto storta fatta col telefono), ed è per questo che esiste la revisione per i casi limite." },
      { q: "Devo configurare un template per ogni fornitore?", a: "No. Definisci una sola volta i campi che vuoi, e lo stesso Flow legge le fatture di qualsiasi fornitore in qualsiasi layout. Aggiungere un nuovo fornitore non richiede alcuna configurazione." },
      { q: "Può estrarre le righe, non solo i totali?", a: "Sì. Le righe sono definite come campi di tabella, quindi una tabella ripetuta restituisce un record per riga con descrizione, quantità, prezzo unitario e importo tipizzati separatamente." },
      { q: "Come gestisce le diverse valute?", a: "La valuta viene estratta come campo a sé, e un Cleaner può convertire gli importi nella tua valuta di riferimento durante l'elaborazione, così i sistemi a valle ricevono un'unica unità coerente." },
    ],
  },
  {
    slug: "contract-analysis",
    label: "Analisi dei contratti",
    badge: "Legale e acquisti",
    h1: "Estrazione dati dai contratti",
    title: "Estrazione dati dai contratti: condizioni e date di rinnovo",
    description:
      "Estrai parti, date di decorrenza e di rinnovo, termini di pagamento, periodi di preavviso e limiti di responsabilità da un portafoglio di contratti, in una tabella che puoi davvero interrogare.",
    summary:
      "Parti, date di rinnovo, periodi di preavviso e termini di pagamento estratti da un portafoglio di contratti in una tabella interrogabile.",
    lede: "Tavnit legge i contratti firmati e restituisce le clausole che comportano obblighi (parti, date di decorrenza e di rinnovo, periodi di preavviso, termini di pagamento, limiti di responsabilità) come campi strutturati. Il portafoglio diventa una tabella da interrogare invece di una cartella da leggere.",
    problem: [
      "La maggior parte delle organizzazioni non sa rispondere a domande elementari sui propri contratti. Quali accordi si rinnovano tacitamente il prossimo trimestre? Qual è la nostra esposizione complessiva in termini di responsabilità? Quali fornitori hanno un preavviso di 90 giorni? Le risposte esistono, sparse in centinaia di PDF che nessuno ha il tempo di aprire.",
      "Il costo non è la lettura: sono i rinnovi che passano inosservati e le clausole scoperte durante una controversia invece che prima.",
    ],
    fields: [
      { name: "Parti ed entità firmatarie", note: "L'entità giuridica spesso non coincide con il nome commerciale, e conviene acquisire entrambi." },
      { name: "Data di decorrenza e di scadenza", note: "La coppia che sta alla base di ogni domanda sui rinnovi che vorrai fare in seguito." },
      { name: "Rinnovo tacito e periodo di preavviso", note: "I due campi che decidono se un rinnovo è una scelta o una sorpresa." },
      { name: "Termini e importi di pagamento", note: "30 giorni, milestone, clausole di adeguamento. Spesso in forma discorsiva più che in una tabella." },
      { name: "Limite di responsabilità e manleve", note: "Di solito una clausola, non un numero. Conviene estrarla come testo più un valore numerico quando esiste." },
      { name: "Legge applicabile e foro competente", note: "Brevi, facili da estrarre e noiosi da cercare a mano in tutto un portafoglio." },
      { name: "Diritti di recesso", note: "Per comodità, per giusta causa, e il preavviso che ciascuno richiede." },
    ],
    gotchas: [
      {
        title: "La risposta sta nel testo, non in un campo",
        body: "Una fattura mette il totale in un riquadro. Un contratto nasconde il periodo di preavviso a metà di una clausola, a volte scritto in lettere invece che in cifre. Le istruzioni di estrazione ti permettono di dire al Flow cosa significa una clausola e dove tende a comparire, invece di sperare che un'etichetta corrisponda.",
      },
      {
        title: "Le modifiche cambiano la risposta",
        body: "Le condizioni in vigore si trovano spesso in un atto modificativo, non nell'originale. Tratta ogni documento come un'esecuzione a sé e conserva la data di firma come campo, così la situazione attuale è il risultato di una query e non un'ipotesi su quale file sia il più recente.",
      },
      {
        title: "Sbagliare costa caro, quindi la revisione non è facoltativa",
        body: "Una data di rinnovo letta male è un contratto da cui non sei uscito in tempo. È un caso d'uso in cui la revisione su ogni esecuzione è proporzionata, e in cui l'audit trail non modificabile conta quanto l'estrazione: puoi dimostrare chi ha confermato una clausola e quando.",
      },
    ],
    pipeline: [
      { label: "Flow", href: "/docs/flows", why: "Le istruzioni di estrazione dicono all'AI cosa significa una clausola, il che qui conta molto più che nei documenti con campi etichettati." },
      { label: "Revisione umana", href: "/docs/human-in-the-loop", why: "Revisione su ogni esecuzione, con un registro permanente di chi ha confermato ciascuna clausola." },
      { label: "Bucket", href: "/docs/buckets", why: "Trasforma il portafoglio in una tabella interrogabile: quali accordi si rinnovano il prossimo trimestre, ordinati per periodo di preavviso." },
      { label: "Cleaner", href: "/docs/cleaners", why: "Normalizza i formati di data e può calcolare la scadenza del preavviso a partire dalla data di scadenza e dal periodo di preavviso." },
    ],
    faqs: [
      { q: "Funziona con contratti senza una struttura coerente?", a: "Sì, è il caso normale. Non c'è alcun template da configurare. Descrivi le clausole che ti interessano e il Flow le individua ovunque compaiano, ed è per questo che le istruzioni di estrazione contano più qui che sui documenti strutturati." },
      { q: "E le modifiche e le lettere integrative?", a: "Elabora ciascuna come un'esecuzione a sé, con la data di firma acquisita come campo. La situazione attuale si ricava allora interrogando il tuo Bucket, non indovinando quale PDF sia il più recente." },
      { q: "I dati estratti sono interrogabili?", a: "Sì. I risultati finiscono in un Bucket come colonne tipizzate, così puoi filtrare, ordinare e creare grafici su tutto il portafoglio senza esportare nulla." },
    ],
  },
  {
    slug: "resume-screening",
    label: "Selezione dei CV",
    badge: "HR e recruiting",
    h1: "Analisi e selezione dei CV",
    title: "Software di parsing dei CV: dati strutturati sui candidati",
    description:
      "Trasforma CV in qualsiasi formato in schede candidato coerenti (contatti, competenze, ruoli, date, formazione), così la selezione diventa un filtro e non una lettura.",
    summary:
      "CV in qualsiasi formato trasformati in schede candidato coerenti, così la selezione diventa un filtro invece di una lettura.",
    lede: "Tavnit legge CV in qualsiasi layout e restituisce schede candidato coerenti: contatti, competenze, ruoli con date, formazione e certificazioni. Poiché ogni candidato è descritto con gli stessi campi, selezionare significa filtrare una tabella invece di aprire duecento PDF.",
    problem: [
      "I CV sono il documento meno standardizzato che la maggior parte dei team gestisce. Una colonna o due, tabelle o testo libero, un layout grafico con le date in una barra laterale. Una persona li legge tutti; un software di solito ne legge circa la metà.",
      "Il vero costo è l'incoerenza. Quando cento CV vengono riassunti ciascuno in modo leggermente diverso, confrontare i candidati sugli stessi criteri diventa impossibile, e la selezione finisce in silenzio per premiare chi è piaciuto al primo revisore.",
    ],
    fields: [
      { name: "Nome e contatti", note: "Spesso in un'intestazione, in una barra laterale o in un'immagine: uno dei fallimenti di estrazione più comuni." },
      { name: "Ruoli con datori di lavoro e date", note: "Una tabella ripetuta, non un valore singolo. I campi di tabella mantengono ogni ruolo come riga a sé." },
      { name: "Anni di esperienza totali", note: "Raramente indicati. Un Cleaner con formula può calcolarli dalle date dei ruoli invece di fidarsi di quanto dichiarato." },
      { name: "Competenze", note: "Meglio estrarle testualmente e poi normalizzarle: un Cleaner di categoria può ricondurre 'JS', 'JavaScript' ed 'ES6' a un unico valore." },
      { name: "Formazione e certificazioni", note: "Istituto, titolo, anno. Un'altra struttura ripetuta." },
      { name: "Località e permesso di lavoro", note: "Spesso il primo filtro rigido, e spesso nascosto nell'intestazione." },
    ],
    gotchas: [
      {
        title: "I layout a due colonne mandano in crisi i lettori ingenui",
        body: "Un CV grafico con barra laterale, letto dall'alto in basso, diventa un miscuglio senza senso per qualsiasi strumento che faccia una semplice estrazione di testo. L'estrazione consapevole del layout tiene separate la barra laterale e la colonna principale, ed è per questo che i contatti in una barra laterale finiscono comunque nel campo giusto.",
      },
      {
        title: "Le competenze vanno normalizzate, o il filtro non serve",
        body: "Estratte testualmente, ottieni 'JS', 'JavaScript', 'Javascript (ES6)' e 'JAVASCRIPT' come quattro valori distinti, e filtrando su uno perdi gli altri. Un Cleaner di categoria riconduce le varianti a un vocabolario controllato, così il filtro restituisce davvero tutti i candidati qualificati.",
      },
      {
        title: "Sono dati personali, e le regole sono più severe",
        body: "I CV sono dati personali per definizione, e in diverse giurisdizioni i dati dei candidati hanno limiti di conservazione e un diritto alla cancellazione. La visibilità dei Bucket e i permessi per singolo utente ti consentono di limitare le schede candidato a chi gestisce la selezione, invece di renderle visibili a tutta l'organizzazione.",
      },
    ],
    pipeline: [
      { label: "Flow", href: "/docs/flows", why: "I campi di tabella mantengono ogni ruolo e ogni titolo come riga a sé, invece di un unico blocco di testo." },
      { label: "Cleaner", href: "/docs/cleaners", why: "Riconduce i nomi delle competenze a un vocabolario controllato e calcola l'esperienza totale dalle date dei ruoli." },
      { label: "Bucket", href: "/docs/buckets", why: "Le schede candidato come tabella filtrabile, con accesso per Bucket così che i dati dei candidati non siano visibili a tutta l'organizzazione." },
      { label: "Integrazione email", href: "/docs/email-integration", why: "Le candidature che arrivano via email vengono elaborate all'arrivo, allegati compresi." },
    ],
    faqs: [
      { q: "Gestisce CV a due colonne e con layout grafici?", a: "Sì. L'estrazione tiene conto del layout invece di leggere il testo grezzo dall'alto in basso, quindi barre laterali e layout a più colonne non si mescolano in un testo senza senso." },
      { q: "Può uniformare i nomi delle competenze?", a: "Sì. Estrai testualmente, poi usa un Cleaner di categoria per ricondurre le varianti a un vocabolario controllato, così filtrando su una competenza ottieni tutti i candidati che la possiedono." },
      { q: "Come restano riservati i dati dei candidati?", a: "I Bucket possono essere privati invece che visibili a tutta l'organizzazione, con permessi di Viewer o Editor per singolo utente. Le schede candidato restano riservate a chi gestisce la selezione." },
    ],
  },
  {
    slug: "expense-reports",
    label: "Note spese",
    badge: "Finanza e dipendenti",
    h1: "Elaborazione di scontrini e note spese",
    title: "OCR degli scontrini e automazione delle note spese",
    description:
      "Trasforma gli scontrini fotografati in voci di spesa categorizzate (esercente, data, importo, imposte e categoria), così il rimborso diventa una verifica e non un inserimento dati.",
    summary:
      "Scontrini fotografati trasformati in voci di spesa categorizzate, così il rimborso è una verifica invece di un inserimento dati.",
    lede: "Tavnit legge gli scontrini, anche quelli stropicciati e fotografati con poca luce, e restituisce esercente, data, importo, imposte e categoria come campi tipizzati. Le spese arrivano già categorizzate e verificabili, quindi approvare una nota spese è una revisione e non un lavoro di trascrizione.",
    problem: [
      "L'elaborazione delle spese fallisce a entrambe le estremità. I dipendenti rimandano l'invio perché compilare il modulo è noioso, e la finanza poi ridigita ciò che è stato inviato perché il modulo è stato compilato in modo incoerente. I rimborsi slittano, e nessuno ne apprezza alcuna parte.",
      "Gli scontrini sono anche i documenti di qualità peggiore che la maggior parte delle aziende elabora: carta termica sbiadita, foto storte, pieghe, a volte in parte in un'altra lingua.",
    ],
    fields: [
      { name: "Nome dell'esercente", note: "Spesso un logo stilizzato più che un testo: uno dei campi più difficili di uno scontrino." },
      { name: "Data e ora della transazione", note: "L'ora conta più di quanto si pensi per le diarie e per individuare i duplicati." },
      { name: "Totale, imposte e mancia", note: "Separare le imposte conta per il recupero; separare la mancia conta per le policy aziendali." },
      { name: "Metodo di pagamento e ultime quattro cifre", note: "Ciò che ti permette di riconciliare automaticamente con l'estratto conto della carta." },
      { name: "Categoria di spesa", note: "Meglio dedotta da un Cleaner di categoria AI a partire da esercente e righe, invece di chiederla al dipendente." },
      { name: "Valuta", note: "Le spese di viaggio arrivano nella valuta in cui sono state sostenute; la conversione va fatta nella pipeline." },
    ],
    gotchas: [
      {
        title: "La qualità degli scontrini è davvero pessima",
        body: "Carta termica sbiadita, riflessi, pieghe e angolazioni sono la norma, non l'eccezione. L'estrazione ne gestisce la maggior parte, ma è un tipo di documento in cui la revisione condizionale si guadagna il posto: segnala a una persona gli importi a bassa confidenza o fuori policy e lascia passare quelli puliti.",
      },
      {
        title: "Il vero lavoro è la categorizzazione",
        body: "Leggere il totale è facile. Decidere se una spesa al ristorante è rappresentanza con un cliente o una cena di team è la parte che consuma il tempo della finanza. Un Cleaner di categoria AI assegna una categoria a partire da esercente e righe, così il dipendente non tira a indovinare e la finanza corregge invece di classificare.",
      },
      {
        title: "I duplicati sono frequenti e costosi",
        body: "Lo stesso scontrino inviato due volte (una volta fotografato, una volta come PDF dell'esercente) è una fonte abituale di rimborsi in eccesso. Estrarre esercente, importo esatto e orario basta per individuarlo nel Bucket invece di scoprirlo durante un audit.",
      },
    ],
    pipeline: [
      { label: "Integrazione email", href: "/docs/email-integration", why: "I dipendenti inoltrano gli scontrini a un indirizzo invece di imparare un'app. Le ricevute digitali possono essere inoltrate in automatico all'arrivo." },
      { label: "Cleaner", href: "/docs/cleaners", why: "Assegna una categoria con l'AI, converte le valute estere e uniforma i nomi degli esercenti." },
      { label: "Revisione umana", href: "/docs/human-in-the-loop", why: "Revisione condizionale: solo le spese oltre una soglia o fuori policy arrivano a chi approva." },
      { label: "Bucket", href: "/docs/buckets", why: "Le spese come tabella da raggruppare, visualizzare in grafici e controllare per i duplicati prima di pagare." },
    ],
    faqs: [
      { q: "Può leggere la foto di uno scontrino stropicciato?", a: "Di solito sì. Foto, carta termica sbiadita e scontrini piegati passano tutti dall'OCR, anche se la qualità pone un limite: per questo esiste la revisione condizionale per quelli su cui la pipeline è meno sicura." },
      { q: "Le spese si possono categorizzare in automatico?", a: "Sì. Un Cleaner di categoria AI assegna una categoria a partire da esercente e righe, così la finanza corregge qualche caso limite invece di classificare tutto." },
      { q: "E la valuta estera nelle spese di viaggio?", a: "La valuta è un campo estratto a sé, e un Cleaner di conversione può riesprimere gli importi nella tua valuta di riferimento durante l'elaborazione." },
    ],
  },
  {
    slug: "purchase-orders",
    label: "Ordini di acquisto",
    badge: "Acquisti e contabilità fornitori",
    h1: "Software di abbinamento agli ordini: abbina in automatico le fatture agli ordini di acquisto",
    title: "Abbinamento automatico tra fatture e ordini di acquisto",
    description:
      "Software di abbinamento agli ordini: estrai ordini di acquisto e fatture negli stessi campi, accoppia le righe in automatico e manda a un revisore solo le discrepanze.",
    summary:
      "Ordini di acquisto e fatture estratti nella stessa forma, abbinati riga per riga, con le sole discrepanze inviate a un revisore.",
    lede: "Tavnit legge gli ordini di acquisto e le fatture che li seguono, estrae numero d'ordine, fornitore, SKU, quantità e prezzi come campi tipizzati e accoppia in automatico le righe della fattura a quelle dell'ordine, anche quando il fornitore descrive un articolo in modo diverso. L'abbinamento di testata è una ricerca sul numero d'ordine; quello di riga è un confronto del Matcher; tutto ciò che non corrisponde va a un revisore designato invece che in contabilità.",
    problem: [
      "L'abbinamento agli ordini è il controllo che ciò che è stato fatturato sia ciò che è stato ordinato. Nella maggior parte dei team si fa ancora a occhio: un addetto della contabilità fornitori apre il PDF della fattura, trova l'ordine di acquisto e confronta quantità e prezzi riga per riga. È lento, ed è lì che passano i due errori costosi (una quantità sbagliata e un prezzo unitario sbagliato), perché sembrano identici a quelli giusti.",
      "Gli strumenti di abbinamento automatico degli ERP presuppongono che entrambi i documenti siano già strutturati. Non lo sono. L'ordine di acquisto è uscito dal tuo sistema, ma la fattura è uscita da quello del fornitore, come PDF, con i suoi codici articolo e il suo layout. Portarla in una forma confrontabile è la metà irrisolta del problema, ed è la metà di cui si occupa Tavnit.",
    ],
    fields: [
      { name: "Numero d'ordine", note: "La chiave su cui si collega tutto. Estrailo come testo: prefissi e zeri iniziali sono significativi, e i fornitori lo mettono in punti diversi della fattura." },
      { name: "Fornitore e acquirente", note: "Il nome del fornitore in fattura raramente coincide alla lettera con l'anagrafica. Un Cleaner di ricerca lo riconduce al tuo codice fornitore." },
      { name: "Righe: descrizione, SKU, quantità", note: "Una tabella ripetuta su entrambi i documenti. I codici articolo del fornitore di solito differiscono dai tuoi, e le descrizioni usano parole diverse: è ciò che rende difficile l'abbinamento delle righe." },
      { name: "Prezzo unitario e importo di riga", note: "Entrambi, così prezzo unitario × quantità si può verificare sulla fattura stessa prima di confrontarla con l'ordine." },
      { name: "Totali di fattura e ordine", note: "Abbinamento di testata. Un totale che coincide mentre una riga non coincide è uno scambio tra quantità e prezzo: il caso che un controllo sul solo totale non vede." },
      { name: "Data di consegna e riferimento al documento di trasporto", note: "Il terzo documento in un three-way match. I documenti di trasporto si estraggono allo stesso modo; vedi la pagina dedicata." },
      { name: "Termini di pagamento e valuta", note: "Campi brevi con conseguenze enormi quando la fattura non corrisponde all'ordine." },
    ],
    gotchas: [
      {
        title: "Two-way, three-way: l'abbinamento funziona solo se le forme coincidono",
        body: "Un two-way match confronta la fattura con l'ordine; un three-way match aggiunge il documento di ricevimento merce. Entrambi crollano quando i documenti vengono estratti con nomi di campo diversi. Far passare ordini, fatture e documenti di trasporto in Flow che condividono lo stesso schema (numero d'ordine, SKU, quantità, prezzo unitario) è ciò che trasforma l'abbinamento in un confronto invece che in una lettura di documenti.",
      },
      {
        title: "I codici articolo del fornitore non sono i tuoi",
        body: "L'ordine riporta il tuo SKU; la fattura quello del fornitore. Un Cleaner di ricerca converte i codici del fornitore nei tuoi SKU sulla base dei tuoi dati di riferimento durante l'elaborazione, così la fattura arriva già tradotta. Dove non esistono dati di riferimento, un Matcher accoppia le righe in base al significato della descrizione (in modo semantico, non esatto) con un LLM che decide i casi dubbi.",
      },
      {
        title: "Abbinamento per riga, non solo sui totali",
        body: "Imposta l'esecuzione dell'ordine come riferimento e la fattura come esecuzione da confrontare. Il Matcher accoppia ogni riga della fattura a una riga dell'ordine e affianca quantità e prezzo unitario, elencando come avvisi le righe senza corrispondenza invece di scartarle in silenzio. Un controllo sul solo totale approverebbe una fattura con l'importo giusto per gli articoli sbagliati.",
      },
      {
        title: "Solo le eccezioni devono arrivare a una persona",
        body: "Rivedere ogni fattura ricrea il processo manuale. Un Cleaner con formula verifica sulla fattura stessa che prezzo unitario × quantità corrisponda all'importo di riga, e una condizione segnala le righe fuori dalla tua tolleranza. La revisione umana scatta solo per le esecuzioni segnalate, così il revisore vede le tre fatture che non tornano, non le trecento che corrispondono.",
      },
    ],
    pipeline: [
      { label: "Collection", href: "/docs/collections", why: "I fornitori inviano ordini, fatture e documenti di trasporto a un unico indirizzo. Le Collection classificano ogni documento e lo indirizzano al Flow giusto." },
      { label: "Cleaner", href: "/docs/cleaners", why: "Riconducono codici articolo e nomi dei fornitori alle tue anagrafiche tramite ricerca, verificano i calcoli di riga e segnalano i valori fuori tolleranza." },
      { label: "Bucket", href: "/docs/buckets", why: "Conservano ordini e fatture nella stessa forma, così l'abbinamento di testata è una query sul numero d'ordine." },
      { label: "Revisione umana", href: "/docs/human-in-the-loop", why: "Solo le fatture segnalate si fermano per un revisore designato, con un audit trail non modificabile di chi ha approvato cosa." },
      { label: "Integrazione API", href: "/docs/api-integration", why: "Invia le fatture abbinate e approvate al tuo ERP o al sistema della contabilità fornitori senza passaggi manuali." },
    ],
    faqs: [
      { q: "Cos'è l'abbinamento agli ordini?", a: "È il controllo che una fattura corrisponda all'ordine di acquisto a cui si riferisce: stesso fornitore, stessi articoli, stesse quantità e prezzi. Un two-way match confronta fattura e ordine; un three-way match controlla anche il documento di ricevimento merce. È il controllo che impedisce di pagare un fornitore per qualcosa che non è stato ordinato o consegnato." },
      { q: "Tavnit può abbinare in automatico le fatture agli ordini di acquisto?", a: "Sì. Estrai entrambi nella stessa struttura di campi e l'abbinamento di testata diventa una query sul numero d'ordine nel tuo Bucket. Per l'abbinamento di riga, un Matcher in modalità riferimento prende l'ordine come base e vi accoppia ogni riga della fattura, mostrando quantità e prezzo unitario affiancati. Le righe che non si riescono ad accoppiare vengono elencate come avvisi." },
      { q: "E se il fornitore usa codici articolo o descrizioni propri?", a: "Un Cleaner di ricerca converte i codici del fornitore nei tuoi SKU durante l'elaborazione, quando hai dati di riferimento. Quando non li hai, il Matcher accoppia le righe in base al significato della descrizione e non al testo esatto, con un LLM che decide i casi dubbi, così \"Blue widget 10pk\" e \"WIDGET-BLU x10\" finiscono sulla stessa riga." },
      { q: "Cosa succede quando una fattura non corrisponde?", a: "Si ferma. Un Cleaner con condizione segnala l'esecuzione e la revisione umana la indirizza a un revisore designato, che vede la fattura, i valori estratti e la discrepanza. Le fatture che corrispondono passano direttamente al tuo ERP via API o webhook. Ogni visualizzazione, modifica e approvazione viene scritta in un audit trail non modificabile." },
      { q: "Fa il three-way matching con i documenti di trasporto?", a: "Documenti di trasporto e di ricevimento merce si estraggono come ordini e fatture (comprese le quantità scritte a mano sulle prove di consegna firmate) nella stessa forma di campi, quindi il terzo elemento dell'abbinamento è una terza esecuzione confrontata con l'ordine." },
      { q: "Dobbiamo cambiare ERP?", a: "No. Tavnit si posiziona a monte: i documenti arrivano via email o API, vengono estratti e abbinati, e i risultati approvati vengono consegnati al tuo ERP o al sistema della contabilità fornitori tramite API REST o webhook. Esistono ricette per Zapier, Make e n8n per i team che preferiscono non scrivere codice." },
      { q: "Le righe arrivano separate?", a: "Sì. Le righe sono campi di tabella, quindi ogni riga restituisce SKU, descrizione, quantità, prezzo unitario e importo come valori tipizzati separati, ed è proprio questo che rende possibile il confronto per riga." },
    ],
  },
  {
    slug: "customs-trade",
    label: "Dogane e commercio estero",
    badge: "Logistica e commercio",
    h1: "Automazione dei documenti doganali",
    title: "Automazione doganale con classificazione dei codici HS",
    description:
      "Estrai fatture commerciali, packing list e polizze di carico, e classifica le merci nei codici tariffari HS durante l'elaborazione, non dopo.",
    summary:
      "Fatture commerciali, packing list e polizze di carico estratte, con la classificazione tariffaria HS integrata nella pipeline.",
    lede: "Tavnit legge i documenti doganali (fatture commerciali, packing list, polizze di carico, certificati di origine) e restituisce speditore, destinatario, descrizioni delle merci, pesi e valori come campi tipizzati. Un Cleaner per codici HS classifica le merci nei codici tariffari durante l'elaborazione, così le dichiarazioni si preparano da dati strutturati invece di essere ridigitate.",
    problem: [
      "Una singola spedizione genera una pila di documenti che ripetono gli stessi fatti con layout diversi, e una dichiarazione doganale li richiede riconciliati e corretti. Il lavoro è trascrizione più classificazione, fatto sotto pressione, dove un errore significa una spedizione ferma o una sanzione.",
      "La classificazione è la parte specialistica. Decidere il codice tariffario per una data descrizione è un lavoro di giudizio che la maggior parte degli strumenti di estrazione non tenta nemmeno, lasciandolo come passaggio manuale dopo la fine dell'automazione.",
    ],
    fields: [
      { name: "Speditore e destinatario", note: "Ragioni sociali e indirizzi completi, su cui si basa la dichiarazione." },
      { name: "Descrizione della merce per riga", note: "Il testo da cui deriva la classificazione tariffaria: conviene estrarlo testualmente." },
      { name: "Codice tariffario HS", note: "Classificato a partire dalla descrizione da un Cleaner durante l'elaborazione, invece di essere cercato dopo." },
      { name: "Quantità, peso netto e lordo", note: "I pesi stanno sulla packing list mentre i valori stanno in fattura, quindi la coppia va riconciliata." },
      { name: "Paese di origine", note: "Determina i dazi e i trattamenti preferenziali. Spesso indicato per riga più che per spedizione." },
      { name: "Incoterms e valore dichiarato", note: "Stabiliscono cosa è soggetto a dazio e chi è responsabile di cosa." },
      { name: "Numeri di container e di polizza", note: "Le chiavi che permettono di ricondurre il set di documenti a un'unica spedizione." },
    ],
    gotchas: [
      {
        title: "La classificazione è la parte difficile, ed è integrata",
        body: "La maggior parte degli strumenti documentali si ferma all'estrazione e lascia la classificazione tariffaria come lavoro manuale. Tavnit include un Cleaner per codici HS che classifica le merci a partire dalla descrizione estratta durante l'esecuzione, così il passaggio specialistico avviene dentro la pipeline invece che dopo.",
      },
      {
        title: "Una spedizione, più documenti, una sola verità",
        body: "La fattura commerciale riporta i valori, la packing list i pesi, la polizza di carico il container. Una Collection indirizza ogni tipo di documento al proprio Flow, e un Bucket condiviso, con il riferimento della spedizione come chiave, li ricompone in un quadro unico.",
      },
      {
        title: "Qui gli errori sono sanzioni, non correzioni",
        body: "Un codice o un valore dichiarato male è un problema doganale, non contabile. È un caso d'uso in cui la revisione di ogni dichiarazione è proporzionata, e in cui l'audit trail non modificabile è davvero utile quando ti chiedono di dimostrare come si è arrivati a una classificazione.",
      },
    ],
    pipeline: [
      { label: "Collection", href: "/docs/collections", why: "Indirizzano in automatico fatture, packing list e polizze di carico da un'unica casella al Flow giusto." },
      { label: "Cleaner", href: "/docs/cleaners", why: "Classificano le merci nei codici tariffari HS, convertono le valute e uniformano pesi e unità di misura." },
      { label: "Splitter", href: "/docs/splitters", why: "I documenti di spedizione arrivano di solito in un unico PDF combinato. Gli Splitter li separano prima dell'estrazione." },
      { label: "Revisione umana", href: "/docs/human-in-the-loop", why: "Verifica ogni dichiarazione prima dell'invio, con un registro di chi ha approvato quale classificazione." },
    ],
    faqs: [
      { q: "Assegna davvero i codici tariffari HS?", a: "Sì. Un Cleaner per codici HS classifica le merci a partire dalla descrizione estratta durante l'esecuzione, così la classificazione avviene dentro la pipeline invece che come passaggio manuale successivo. Le dichiarazioni restano una tua responsabilità, ed è per questo che consigliamo una revisione prima dell'invio." },
      { q: "Può gestire l'intero set di documenti di una spedizione?", a: "Sì. Una Collection indirizza fatture commerciali, packing list e polizze di carico ai rispettivi Flow, e i risultati, con il riferimento della spedizione come chiave, si ricompongono in un unico record." },
      { q: "E se i documenti arrivano in un unico PDF combinato?", a: "Uno Splitter separa prima il file combinato nei documenti che lo compongono, così ciascuno viene estratto dal Flow creato apposta." },
    ],
  },
  {
    slug: "bank-statements",
    label: "Estratti conto bancari",
    badge: "Finanza e credito",
    h1: "Estrazione dati dagli estratti conto",
    title: "Estrazione degli estratti conto: dal PDF alle righe di movimento",
    description:
      "Trasforma i PDF degli estratti conto di qualsiasi banca in righe di movimento (data, descrizione, importo, saldo progressivo) pronte da riconciliare o valutare.",
    summary: "Estratti conto PDF di qualsiasi banca trasformati in righe di movimento da riconciliare, categorizzare o valutare.",
    lede: "Tavnit legge i PDF degli estratti conto di qualsiasi istituto e restituisce ogni movimento come una riga: data, descrizione, addebito o accredito e saldo progressivo. Poiché viene estratto anche il saldo, i conti si possono verificare invece di darli per buoni, ed è questo che rende il risultato sicuro da riconciliare.",
    problem: [
      "Ogni banca impagina gli estratti conto in modo diverso, e nessuna li impagina per le macchine. Le colonne si spostano, i movimenti vanno a capo su due righe e il saldo progressivo è l'unica cosa che tiene insieme la sequenza. Chiunque valuti richieste di credito, tenga la contabilità o faccia riconciliazioni finisce per ridigitare o per pagare un connettore per ogni banca.",
      "L'open banking risolve il problema dove è disponibile e il cliente dà il consenso. Per tutto il resto (periodi passati, conti aziendali, banche senza API, estratti forniti come documentazione) il PDF è l'unica fonte che esiste.",
    ],
    fields: [
      { name: "Intestatario, numero di conto e codice banca", note: "Di solito solo sulla prima pagina, quindi va riportato su tutte le pagine dell'estratto." },
      { name: "Periodo dell'estratto", note: "Definisce il significato dei totali, ed è ciò che più spesso manca quando qualcuno ridigita a mano." },
      { name: "Data del movimento", note: "Spesso abbreviata e senza anno: l'anno viene dal periodo dell'estratto, non dalla riga." },
      { name: "Descrizione o controparte", note: "Troncata e abbreviata dalla banca. Un Cleaner di categoria ne deduce esercente e tipo." },
      { name: "Addebito, accredito e saldo progressivo", note: "Estrai tutti e tre. Il saldo è ciò che ti permette di verificare che non manchi nessuna riga." },
      { name: "Saldo iniziale e finale", note: "Il controllo di quadratura dell'intero estratto." },
    ],
    gotchas: [
      {
        title: "Senza il saldo, una riga persa è invisibile",
        body: "Se l'estrazione salta un movimento, le righe rimanenti sembrano comunque del tutto plausibili. Estrarre il saldo progressivo trasforma questo in un errore rilevabile: un Cleaner con formula può verificare che il saldo di ogni riga sia uguale al saldo precedente più il movimento, e segnalare l'estratto invece di lasciarlo passare.",
      },
      {
        title: "I movimenti vanno a capo, e le righe a capo non sono nuovi movimenti",
        body: "I nomi lunghi delle controparti sconfinano su una seconda riga, e una lettura ingenua della tabella trasforma un pagamento in due righe, una senza importo. I campi di tabella trattano una riga come una riga, quindi una descrizione che va a capo resta collegata al suo importo.",
      },
      {
        title: "Le date raramente riportano l'anno",
        body: "La maggior parte degli estratti stampa '14 mar' e si affida al periodo indicato in alto per l'anno. Per una persona va bene, per un database no, soprattutto a cavallo d'anno in un estratto di gennaio. Estrai il periodo dell'estratto e ricava la data completa con un Cleaner con formula.",
      },
    ],
    pipeline: [
      { label: "Flow", href: "/docs/flows", why: "I movimenti sono campi di tabella, quindi ciascuno torna come riga tipizzata a sé invece che come blocco di testo." },
      { label: "Cleaner", href: "/docs/cleaners", why: "Ricavano le date complete dal periodo dell'estratto, verificano i saldi progressivi e categorizzano le controparti." },
      { label: "Bucket", href: "/docs/buckets", why: "I movimenti finiscono in una tabella interrogabile: filtra per controparte, raggruppa per mese, visualizza il saldo in un grafico." },
      { label: "Revisione umana", href: "/docs/human-in-the-loop", why: "Manda a una persona solo gli estratti che non superano il controllo del saldo, invece di rivederli tutti." },
    ],
    faqs: [
      { q: "Funziona con qualsiasi banca?", a: "Sì. Non c'è alcun template per banca da configurare: lo stesso Flow legge gli estratti di qualsiasi istituto, compresi i conti aziendali e i periodi passati che un'API di open banking non coprirebbe." },
      { q: "Come faccio a sapere che non è stato perso alcun movimento?", a: "Estrai il saldo progressivo insieme a ogni movimento, poi usa un Cleaner con formula per verificare che ogni riga quadri con la precedente. Un estratto che non supera il controllo viene segnalato invece di passare in silenzio." },
      { q: "I movimenti si possono categorizzare in automatico?", a: "Sì. Un Cleaner di categoria AI assegna una categoria a partire dalla descrizione, così la contabilità parte da righe già classificate invece che dal testo grezzo della banca." },
    ],
  },
  {
    slug: "supplier-quotes",
    label: "Preventivi dei fornitori",
    badge: "Acquisti e sourcing",
    h1: "Confronto dei preventivi dei fornitori",
    title: "Confronta i preventivi dei fornitori e fai benchmark dei prezzi",
    description:
      "Estrai le righe da preventivi concorrenti e confrontale in automatico, abbinando gli articoli equivalenti tra fornitori e indicando il prezzo migliore per ogni riga.",
    summary: "Preventivi concorrenti estratti e confrontati riga per riga, con il prezzo migliore indicato per ogni articolo.",
    lede: "Tavnit estrae le righe dai preventivi concorrenti dei fornitori, poi i Matcher accoppiano gli articoli equivalenti tra fornitori e indicano per ogni riga il vincitore sul prezzo. Ottieni una tabella di confronto invece di tre PDF e un foglio di calcolo costruito a mano.",
    problem: [
      "Confrontare i preventivi è la parte del sourcing che non diventa mai più facile. Tre fornitori mandano tre layout, descrivono lo stesso articolo in tre modi diversi e quotano confezioni diverse. Qualcuno costruisce un foglio di calcolo, ridigita tutto e spera di aver abbinato le righe giuste.",
      "La vera difficoltà è l'abbinamento. 'M8 hex bolt 50mm', 'Bolt, hex, M8x50' e 'HEX BOLT M8 50MM zinc' sono lo stesso articolo, e nessuna ricerca per corrispondenza esatta li accoppierà mai.",
    ],
    fields: [
      { name: "Identità del fornitore", note: "Il campo che identifica ogni partecipante al confronto. Un preventivo, un fornitore." },
      { name: "Descrizione dell'articolo", note: "Il testo che viene abbinato tra i fornitori. Estrailo testualmente: normalizzarlo troppo presto distrugge il segnale di cui l'abbinamento ha bisogno." },
      { name: "Prezzo unitario", note: "Il campo numerico su cui si decide il vincitore. Le voci non numeriche come 'su richiesta' vengono escluse e segnalate invece di essere ignorate in silenzio." },
      { name: "Quantità e unità di misura", note: "Usate come contesto per l'abbinamento, così una confezione da 12 non viene accoppiata a una singola unità." },
      { name: "Tempi di consegna", note: "Spesso il fattore decisivo quando i prezzi sono vicini, e raramente considerato nei confronti manuali." },
      { name: "Validità e termini di pagamento", note: "Un preventivo più economico con condizioni peggiori non è sempre più economico." },
    ],
    gotchas: [
      {
        title: "Lo stesso articolo non viene mai descritto due volte allo stesso modo",
        body: "Per questo la corrispondenza esatta fallisce e il confronto resta manuale quasi ovunque. I Matcher accoppiano le righe in modo semantico invece che per uguaglianza di testo, con un LLM che decide le coppie ambigue, così descrizioni diverse dello stesso articolo si allineano comunque.",
      },
      {
        title: "La dimensione della confezione falsa il confronto in silenzio",
        body: "Un preventivo per una scatola da 12 contro uno per una singola unità non è una differenza di prezzo, è un errore di unità, ed è lo sbaglio che sopravvive alla revisione perché entrambi i numeri sembrano ragionevoli. I campi di contesto ti permettono di includere quantità e unità di misura nell'abbinamento, così articoli diversi restano non abbinati invece di produrre un vincitore sbagliato.",
      },
      {
        title: "Non tutte le righe hanno un prezzo confrontabile",
        body: "I preventivi contengono 'su richiesta', 'incluso' e celle vuote. Invece di scartare quelle righe in silenzio, il confronto le esclude dalla gara e registra un avviso sulla riga, così vedi cosa non è stato confrontato invece di dare per scontato che lo sia stato tutto.",
      },
    ],
    pipeline: [
      { label: "Flow", href: "/docs/flows", why: "Un solo Flow legge il layout del preventivo di ogni fornitore nella stessa struttura di campi: la condizione necessaria per poterli confrontare." },
      { label: "Cleaner", href: "/docs/cleaners", why: "Convertono le valute, così preventivi in valute diverse vengono confrontati sulla stessa base." },
      { label: "Bucket", href: "/docs/buckets", why: "Conservano i preventivi nel tempo, così il prezzo di oggi si può confrontare con quello quotato dallo stesso fornitore il trimestre scorso." },
    ],
    faqs: [
      { q: "Come abbina articoli descritti in modo diverso da ogni fornitore?", a: "L'abbinamento è semantico, non esatto: le descrizioni degli articoli vengono confrontate in base al significato, con un LLM che risolve le coppie ambigue. 'M8 hex bolt 50mm' e 'Bolt, hex, M8x50' si accoppiano senza che tu debba mantenere un elenco di sinonimi." },
      { q: "Posso fare il benchmark rispetto a un solo fornitore invece di confrontarli tutti?", a: "Sì. La modalità riferimento tratta un preventivo come base e confronta tutti gli altri con quello: è la forma giusta quando hai un fornitore abituale e vuoi sondare il mercato." },
      { q: "Cosa succede alle righe che non si possono confrontare?", a: "Le righe con prezzi non numerici vengono escluse dalla gara e registrate come avvisi su quella riga, così le lacune del confronto restano visibili invece che nascoste." },
    ],
  },
  {
    slug: "compliance-checks",
    label: "Controlli di conformità",
    badge: "Compliance e rischio",
    h1: "Controlli di conformità sui documenti",
    title: "Checklist automatiche di conformità documentale",
    description:
      "Verifica un insieme di documenti rispetto a una checklist ramificata (c'è tutto, i dati sono coerenti, rispettano le policy?) e produci un report da consegnare a un revisore.",
    summary: "Un insieme di documenti verificato rispetto a una checklist ramificata, con un report di esito verificabile.",
    lede: "L'Inspector di Tavnit verifica un insieme di documenti rispetto a una checklist che definisci tu. Assegna ogni file caricato al posto previsto, estrae ciò che serve alle regole e valuta la checklist in modo deterministico: le stesse prove producono sempre lo stesso verdetto, con un report allegato.",
    problem: [
      "La revisione di conformità di solito è una persona con una checklist e una cartella, che conferma che ci siano i documenti giusti, che i valori coincidano tra loro e che nulla sia scaduto. È lenta, varia da un revisore all'altro, e la prova del perché qualcosa è stato approvato è ciò che quella persona ricorda.",
      "Il problema tipico non è un documento mancante. È un valore che non coincide tra due documenti che nessuno ha confrontato fianco a fianco.",
    ],
    fields: [
      { name: "Posti previsti per i documenti", note: "Cosa dovrebbe contenere l'insieme. Un posto obbligatorio vuoto è di per sé un rilievo, non solo un'assenza." },
      { name: "Campi di identità ed entità", note: "I valori che devono coincidere tra i documenti: nomi, numeri di registrazione, indirizzi." },
      { name: "Date e scadenze", note: "Certificati e licenze scadono. Se qualcosa è in corso di validità è una regola, non un campo." },
      { name: "Importi e valori dichiarati", note: "Qui stanno i controlli di coerenza tra documenti: il valore in fattura corrisponde a quello dichiarato?" },
      { name: "Presenza di firme e timbri", note: "Presenza più che contenuto, e uno dei controlli manuali più comuni." },
      { name: "Esito della checklist per voce", note: "Superato, non superato o non applicabile, per regola, con il valore che lo ha determinato." },
    ],
    gotchas: [
      {
        title: "Il vero controllo è tra documenti, non dentro uno solo",
        body: "Qualsiasi strumento sa leggere un valore da un certificato. Il rilievo che conta è che il valore sul certificato non coincide con quello in fattura. Poiché un'ispezione raccoglie l'intero insieme prima di valutarlo, le regole della checklist possono confrontare documenti diversi invece di verificarne solo uno alla volta.",
      },
      {
        title: "Le checklist si ramificano, e quelle piatte nascondono lacune",
        body: "Se una regola si applica dipende di solito da una risposta precedente: se la merce è soggetta a restrizioni, allora serve una licenza. Una checklist ramificata lo esprime direttamente, così un'ispezione chiede la licenza solo quando serve davvero e non la segna in silenzio come non applicabile.",
      },
      {
        title: "Un revisore chiede come hai deciso, non cosa hai deciso",
        body: "La valutazione è deterministica (gli stessi documenti producono lo stesso risultato, invece di un giudizio nuovo ogni volta) e l'esito viene scritto in un report. Insieme alla revisione, puoi mostrare quali valori sono stati estratti, quali regole sono scattate e chi ha approvato il risultato.",
      },
    ],
    pipeline: [
      { label: "Collection", href: "/docs/collections", why: "Le prove eterogenee che arrivano in un unico punto vengono classificate e indirizzate al Flow giusto prima di qualsiasi controllo." },
      { label: "Flow", href: "/docs/flows", why: "Ogni tipo di documento ha il proprio Flow, così una regola può fare riferimento a un campo con un nome invece di cercare nel testo libero." },
      { label: "Revisione umana", href: "/docs/human-in-the-loop", why: "Un revisore approva l'ispezione, e il registro non modificabile traccia chi ha accettato quale rilievo." },
      { label: "Bucket", href: "/docs/buckets", why: "Gli esiti nel tempo diventano rendicontabili: quanti insiemi non hanno superato i controlli, su quale regola, in quale mese." },
    ],
    faqs: [
      { q: "Può confrontare valori tra documenti diversi?", a: "Sì, è proprio questo lo scopo. Un'ispezione raccoglie l'intero insieme di documenti prima di valutarlo, quindi le regole possono verificare che un valore su un documento coincida con un valore su un altro, invece di convalidare ciascuno isolatamente." },
      { q: "Il risultato è ripetibile?", a: "La valutazione della checklist è deterministica. Gli stessi documenti e la stessa checklist producono lo stesso esito, ed è ciò che rende il risultato difendibile quando qualcuno chiede perché un insieme è stato approvato." },
      { q: "E se manca un documento obbligatorio?", a: "Un input obbligatorio mancante è di per sé un rilievo. L'ispezione lo segnala invece di completarsi con una lacuna, e i file caricati senza un posto indicato vengono assegnati in automatico o segnalati come non abbinati." },
    ],
  },
  {
    slug: "form-filling",
    label: "Compilazione di moduli",
    badge: "Operations e commercio",
    h1: "Compilazione automatica di moduli PDF",
    title: "Compila moduli PDF con i dati estratti dai documenti",
    description:
      "Compila in automatico moduli PDF ufficiali con i dati estratti da più documenti di origine, con un'approvazione prima che qualcosa venga emesso.",
    summary: "Moduli PDF ufficiali compilati in automatico con dati distribuiti su più documenti di origine.",
    lede: "Tavnit compila moduli PDF compilabili con i dati estratti da più documenti di origine contemporaneamente. Una dichiarazione può essere compilata da una fattura, una packing list e una polizza di carico in un solo passaggio, con una persona che approva i valori prima che il PDF compilato venga emesso.",
    problem: [
      "Una quantità sorprendente di lavoro d'ufficio consiste nel copiare valori da documenti ricevuti in un modulo richiesto da qualcun altro. Dichiarazioni doganali, moduli assicurativi, domande di finanziamento, adempimenti normativi: le informazioni esistono già, sparse su tre o quattro PDF, e una persona le sposta a mano.",
      "È anche il punto in cui gli errori si perdonano meno. Un errore di trascrizione su un modulo destinato a un'autorità significa un rigetto o una sanzione, non una correzione interna.",
    ],
    fields: [
      { name: "Insieme dei documenti di origine", note: "Un posto per ogni Flow di origine. Il modulo si compila quando ogni posto obbligatorio ha un'esecuzione completata." },
      { name: "Mappatura dei campi", note: "Quale campo estratto compila quale campo del PDF. Si configura una volta per template e si riusa ogni volta." },
      { name: "Output dei Cleaner come origine", note: "Un valore mappato può provenire da un Cleaner invece che dall'estrazione grezza, così nel modulo finiscono valori convertiti o calcolati." },
      { name: "Campi da compilare a mano", note: "Valori che nessuno estrae (un numero di riferimento, un firmatario) forniti al momento dell'approvazione." },
      { name: "Più template", note: "Un solo insieme di documenti di origine può compilare più moduli diversi nello stesso passaggio." },
    ],
    gotchas: [
      {
        title: "I dati sono sparsi tra più documenti, non in uno solo",
        body: "Per questo gli strumenti documentali generici non risolvono la compilazione di moduli: estraggono da un file alla volta. La compilazione prende un'esecuzione per ogni Flow di origine e compila il modulo da tutte insieme, così i pesi della packing list e i valori della fattura arrivano allo stesso output.",
      },
      {
        title: "I documenti arrivano nell'ordine in cui arrivano",
        body: "Raramente ricevi l'insieme completo tutto insieme. Una compilazione resta aperta, raccogliendo le esecuzioni man mano che arrivano i documenti, e parte quando ogni posto obbligatorio è soddisfatto. I file caricati senza indicare a quale posto appartengono vengono classificati e assegnati in automatico, e ciò che resta senza abbinamento si può assegnare a mano.",
      },
      {
        title: "Alcuni campi non sono mai nei documenti di origine",
        body: "Ogni modulo reale ha valori che non esistono da nessuna parte a monte: un riferimento interno, il nome del dichiarante, un riquadro firma. Sono campi da compilare a mano, forniti al passaggio di approvazione, che è anche il momento naturale per correggere ciò che l'estrazione ha sbagliato prima che il PDF venga emesso.",
      },
    ],
    pipeline: [
      { label: "Flow", href: "/docs/flows", why: "Un Flow per ogni tipo di documento di origine; il modulo attinge da tutti contemporaneamente." },
      { label: "Cleaner", href: "/docs/cleaners", why: "Convertono e calcolano i valori, così ciò che finisce nel modulo è già nell'unità o nel formato richiesto." },
      { label: "Revisione umana", href: "/docs/human-in-the-loop", why: "Approvazione prima dell'emissione, con correzioni e campi forniti a mano raccolti nello stesso passaggio." },
      { label: "Integrazione email", href: "/docs/email-integration", why: "I documenti di origine inoltrati a un indirizzo alimentano la compilazione senza che nessuno apra l'app." },
    ],
    faqs: [
      { q: "Un modulo si può compilare da più documenti?", a: "Sì. Ogni tipo di documento di origine ha il proprio posto, e il modulo viene compilato da tutti insieme: è il caso normale per dichiarazioni e richieste di rimborso." },
      { q: "E i campi che non si trovano in nessun documento?", a: "Sono campi da compilare a mano, inseriti al passaggio di approvazione insieme a eventuali correzioni, così il PDF finale viene verificato prima di essere emesso." },
      { q: "Un insieme di documenti può compilare più di un modulo?", a: "Sì. Una configurazione può contenere più template, e ciascuno viene compilato dallo stesso insieme di esecuzioni in un solo passaggio." },
    ],
  },
  {
    slug: "call-analytics",
    label: "Analisi delle chiamate",
    badge: "Vendite e assistenza",
    h1: "Trasforma le conversazioni registrate in dati",
    title: "Analisi delle chiamate: struttura le conversazioni registrate",
    description:
      "Trasforma le registrazioni di vendita, assistenza e sportello in una tabella: chi ha detto cosa, quali regole sono state rispettate e come si è conclusa ogni conversazione.",
    summary: "Registrazioni di vendita, assistenza e sportello trasformate in una tabella di interventi, regole ed esiti.",
    lede: "Tavnit Signals trasforma le registrazioni audio in una tabella piatta. Separa gli interlocutori, divide una registrazione nelle conversazioni distinte che contiene, classifica ciascuna e valuta le tue regole e i tuoi campi di estrazione intervento per intervento: una giornata di chiamate diventa righe da filtrare invece di ore da ascoltare.",
    problem: [
      "È nelle conversazioni che un'azienda impara la maggior parte di ciò che sa, e quasi nulla viene registrato come dato. Le registrazioni esistono, ma rivederle significa ascoltarle, quindi in pratica un responsabile ne campiona una manciata e generalizza.",
      "Dove il controllo qualità esiste, è una persona con una scheda di valutazione che compila un modulo dopo ogni chiamata: costoso, incoerente tra un valutatore e l'altro, e limitato a una frazione del volume.",
    ],
    fields: [
      { name: "Tipo di interazione", note: "Una registrazione contiene spesso più conversazioni. Ciascuna viene classificata (vendita, assistenza, reso) o segnata come altro." },
      { name: "Ruolo dell'interlocutore", note: "Gli interventi vengono attribuiti ai partecipanti attesi, come venditore o cliente; le voci inattese vengono etichettate come altro." },
      { name: "Regole per intervento", note: "Controlli sì/no applicati a ogni intervento: è stata menzionata la promozione, è stata letta l'informativa." },
      { name: "Campi di estrazione", note: "Dati ricavati da ogni intervento, come i prodotti citati o le obiezioni sollevate." },
      { name: "Categorie di contenuto", note: "Ogni intervento etichettato (obiezione, domanda, problema, soluzione, apprezzamento) così gli schemi diventano contabili." },
      { name: "Esito della conversazione", note: "Valutato una sola volta sull'intera conversazione: la vendita è stata chiusa, il problema è stato risolto." },
    ],
    gotchas: [
      {
        title: "Una registrazione non è una conversazione",
        body: "La registrazione di un turno allo sportello o in un servizio di assistenza contiene molti scambi separati. Trattare il file come un'unica conversazione produce medie che non descrivono nulla. Le registrazioni vengono prima divise in interazioni distinte, ciascuna classificata e valutata per conto suo: l'equivalente audio della divisione di un PDF con più documenti.",
      },
      {
        title: "Le domande sull'intervento e sulla conversazione sono domande diverse",
        body: "'È stato menzionato lo sconto' si chiede a ogni intervento e può essere vero più volte. 'La vendita si è conclusa' si chiede una sola volta sull'intero scambio. Confonderle ti dà una metrica che conta le menzioni quando volevi gli esiti, quindi le due vengono valutate separatamente e la risposta a livello di conversazione si ripete su tutte le righe di quell'interazione.",
      },
      {
        title: "Registrare le persone comporta delle regole",
        body: "I requisiti di consenso e conservazione per la registrazione delle chiamate variano da una giurisdizione all'altra e sono più severi che per i documenti. È un tuo obbligo, non qualcosa che decide la pipeline, ma la visibilità per Bucket e i permessi di accesso ti permettono di limitare trascrizioni ed esiti a chi ne ha bisogno.",
      },
    ],
    pipeline: [
      { label: "Bucket", href: "/docs/buckets", why: "Le registrazioni completate vengono esportate in automatico in un Bucket, così le chiamate si accumulano in qualcosa da interrogare e visualizzare in grafici." },
      { label: "Webhook", href: "/docs/webhooks", why: "Inviano la tabella risultante ai tuoi sistemi appena l'elaborazione di una registrazione termina." },
      { label: "Ruoli utente", href: "/docs/user-roles", why: "I dati delle conversazioni sono sensibili; ruoli e permessi per Bucket li limitano a chi gestisce il programma." },
    ],
    faqs: [
      { q: "Quali formati audio sono supportati?", a: "Si possono caricare ed elaborare registrazioni MP3, WAV e FLAC." },
      { q: "Può gestire una registrazione con molte conversazioni separate?", a: "Sì. Una registrazione viene prima divisa nelle sue interazioni distinte, e ciascuna viene classificata e valutata separatamente: un intero turno allo sportello produce risultati per conversazione invece di un'unica media indistinta." },
      { q: "Posso valutare ogni chiamata invece di un campione?", a: "Sì. Le regole vengono valutate su ogni intervento di ogni registrazione elaborata, ed è questa la differenza pratica rispetto al controllo qualità manuale: copertura completa invece di un campione." },
    ],
  },
  {
    slug: "delivery-notes",
    label: "Documenti di trasporto",
    badge: "Logistica e magazzino",
    h1: "Acquisizione di documenti di trasporto e prove di consegna",
    title: "Estrazione dei documenti di trasporto e controlli di ricevimento",
    description:
      "Acquisisci ciò che è stato effettivamente consegnato dai documenti di trasporto firmati e dalle prove di consegna, annotazioni a mano comprese, e confrontalo con ciò che era stato ordinato.",
    summary: "Ciò che è stato davvero consegnato, acquisito da documenti di trasporto firmati e prove di consegna, scrittura a mano compresa.",
    lede: "Tavnit legge documenti di trasporto e prove di consegna, comprese le annotazioni a mano aggiunte da autisti e magazzinieri, e restituisce le quantità consegnate come righe strutturate. Poiché anche gli ordini di acquisto vengono estratti nella stessa forma, confrontare il consegnato con l'ordinato diventa una query.",
    problem: [
      "Il documento di trasporto è l'unica traccia di ciò che è arrivato fisicamente, e di solito è il documento di qualità peggiore della catena: fotografato in un piazzale, firmato sopra la stampa, annotato a mano dove le quantità non coincidevano.",
      "È anche il documento che conta di più nelle contestazioni. Se la fattura dice dodici e il documento di trasporto dice dieci, la prova è il documento di trasporto, ammesso che qualcuno abbia registrato cosa diceva.",
    ],
    fields: [
      { name: "Numero del documento di trasporto e dell'ordine", note: "Le chiavi che ricollegano la consegna a ciò che era stato ordinato." },
      { name: "Quantità consegnata per riga", note: "Il numero che conta davvero, e quello che più spesso viene corretto a mano." },
      { name: "Correzioni a mano", note: "Le quantità barrate e le note a margine riportano il dato reale. Ignorarle significa acquisire quello sbagliato." },
      { name: "Nome di chi riceve e presenza della firma", note: "La presenza di una firma è spesso il criterio di accettazione." },
      { name: "Data e ora di consegna", note: "Alla base della misurazione degli SLA e delle tempistiche delle contestazioni." },
      { name: "Note su stato o danni", note: "Testo libero, di solito scritto a mano, e base di qualsiasi reclamo." },
    ],
    gotchas: [
      {
        title: "La parte importante è quella scritta a mano",
        body: "Un documento di trasporto stampato dice cosa sarebbe dovuto arrivare. La correzione a mano dice cosa è arrivato. L'estrazione legge la scrittura a mano oltre alla stampa, ed è la differenza tra acquisire la spedizione come pianificata e acquisirla come consegnata.",
      },
      {
        title: "Fotografato in un piazzale, non scansionato in ufficio",
        body: "Le prove di consegna arrivano come foto storte fatte col telefono, con poca luce, a volte con un pollice nell'inquadratura. L'estrazione ne gestisce la maggior parte, ma è un tipo di documento per cui conviene mandare a una persona i risultati a bassa confidenza invece di fidarsi di ogni acquisizione.",
      },
      {
        title: "Il valore sta nel confronto, non nell'acquisizione",
        body: "Una quantità consegnata da sola dice poco. Estrarre i documenti di trasporto nella stessa struttura di campi degli ordini di acquisto trasforma il three-way matching in una query sul numero d'ordine, invece di tre documenti da esaminare controluce.",
      },
    ],
    pipeline: [
      { label: "Integrazione email", href: "/docs/email-integration", why: "Autisti e vettori inviano via email le foto delle prove di consegna; inoltrandole, ciascuna viene elaborata all'arrivo." },
      { label: "Flow", href: "/docs/flows", why: "Le righe consegnate sono campi di tabella, con la stessa struttura usata per gli ordini di acquisto." },
      { label: "Bucket", href: "/docs/buckets", why: "Conservano consegne e ordini nello stesso posto, così le discrepanze emergono con una query invece che con un audit." },
      { label: "Revisione umana", href: "/docs/human-in-the-loop", why: "Verifica le acquisizioni scadenti e le quantità corrette, dove sbagliare costa una contestazione." },
    ],
    faqs: [
      { q: "Può leggere le correzioni scritte a mano?", a: "Sì. La scrittura a mano viene estratta insieme al testo stampato, il che qui conta perché la quantità scritta a mano è di solito quella corretta." },
      { q: "Funziona con le foto fatte col telefono?", a: "Di solito sì. Foto, angolazioni e luce scarsa sono la norma per le prove di consegna. Conviene attivare la revisione condizionale, così le acquisizioni incerte arrivano a una persona invece di passare in silenzio." },
      { q: "Le consegne si possono confrontare con gli ordini?", a: "Estrai entrambi nella stessa struttura di campi e il confronto diventa una query sul numero d'ordine nel tuo Bucket, invece di un controllo manuale documento per documento." },
    ],
  },
  {
    slug: "insurance-claims",
    label: "Sinistri assicurativi",
    badge: "Assicurazioni e sinistri",
    h1: "Elaborazione dei documenti dei sinistri",
    title: "Estrazione dei documenti dei sinistri assicurativi",
    description:
      "Elabora insieme le denunce di sinistro e la documentazione a supporto (preventivi, fatture, relazioni e foto) in un unico record strutturato e verificabile.",
    summary: "Denunce di sinistro e documentazione a supporto elaborate insieme in un unico record strutturato e verificabile.",
    lede: "Tavnit elabora un sinistro e la documentazione che lo supporta come un unico insieme: il modulo di denuncia, i preventivi di riparazione, le fatture e le relazioni. Ogni tipo di documento viene indirizzato al proprio Flow, e i risultati si ricompongono in un unico record che il liquidatore può valutare invece di una cartella da leggere.",
    problem: [
      "Un sinistro non è mai un solo documento. È un modulo più tutto ciò che il richiedente ha inviato (preventivi, ricevute, un verbale di polizia, fotografie) che arriva nell'arco di giorni, senza un ordine, via email.",
      "I liquidatori passano la maggior parte del tempo a ricomporre invece che a valutare: aprire allegati, trovare gli importi, verificare che la cifra richiesta corrisponda a quella del preventivo.",
    ],
    fields: [
      { name: "Numero di sinistro e di polizza", note: "Le chiavi su cui si collega tutto l'insieme, e spesso l'unico elemento coerente tra i documenti." },
      { name: "Dati del richiedente e dell'evento", note: "Data, luogo e descrizione del danno, di solito distribuiti tra il modulo e una descrizione testuale." },
      { name: "Importo richiesto", note: "Ciò che dice il modulo. Conviene estrarlo separatamente da ciò che la documentazione giustifica." },
      { name: "Importi documentati", note: "I totali di preventivi e fatture: le cifre con cui l'importo richiesto dovrebbe quadrare." },
      { name: "Dati delle controparti", note: "Altre parti coinvolte, assicuratori e numeri di riferimento, necessari per la rivalsa." },
      { name: "Tipo di documento per allegato", note: "Sapere cos'è ogni file determina quale Flow lo legge." },
    ],
    gotchas: [
      {
        title: "La documentazione arriva in ritardo e in disordine",
        body: "La valutazione non può iniziare finché l'insieme non è completo, e l'insieme si completa nell'arco di giorni. Le Collection classificano ogni allegato appena arriva, così il record si costruisce man mano, invece di qualcuno che rilegge l'intera cartella ogni volta che arriva qualcosa di nuovo.",
      },
      {
        title: "Importo richiesto e importo documentato sono campi diversi",
        body: "Estrarre un solo numero per sinistro perde il controllo che conta. Acquisisci ciò che è stato richiesto e ciò che preventivi e fatture effettivamente totalizzano, e la discrepanza diventa un valore su cui filtrare invece di qualcosa che un liquidatore deve notare.",
      },
      {
        title: "I fascicoli dei sinistri sono personali, e spesso sanitari",
        body: "I sinistri contengono abitualmente informazioni sanitarie, documenti d'identità e dati finanziari. I Bucket privati con permessi per singolo utente rendono un sinistro visibile ai liquidatori che lo seguono invece che a tutta l'organizzazione.",
      },
    ],
    pipeline: [
      { label: "Collection", href: "/docs/collections", why: "Classificano ogni allegato (modulo, preventivo, fattura, relazione) e lo indirizzano al Flow creato apposta." },
      { label: "Integrazione email", href: "/docs/email-integration", why: "I sinistri arrivano via email; inoltrandoli a un indirizzo di Collection, ogni allegato viene elaborato appena arriva." },
      { label: "Cleaner", href: "/docs/cleaners", why: "Normalizzano date e valute e calcolano la differenza tra importo richiesto e importo documentato." },
      { label: "Revisione umana", href: "/docs/human-in-the-loop", why: "I liquidatori approvano o respingono con un registro permanente della decisione e di chi l'ha presa." },
    ],
    faqs: [
      { q: "Può gestire un sinistro con molti allegati diversi?", a: "Sì. Una Collection classifica ogni allegato e lo indirizza al Flow giusto, così modulo di denuncia, preventivo e fattura vengono letti ciascuno dal Flow creato per quel tipo di documento." },
      { q: "Può segnalare i sinistri in cui i numeri non coincidono?", a: "Estrai l'importo richiesto e i totali documentati come campi separati, poi usa un Cleaner per calcolare la differenza. I sinistri che non superano il controllo possono essere mandati in revisione in automatico." },
      { q: "Come sono protetti i dati sensibili dei sinistri?", a: "I Bucket possono essere privati invece che visibili a tutta l'organizzazione, con permessi di Viewer o Editor per singolo utente, così un sinistro è visibile solo ai liquidatori che lo gestiscono." },
    ],
  },
  {
    slug: "identity-verification",
    label: "Identità e onboarding",
    badge: "KYC e onboarding",
    h1: "Acquisizione dei documenti di identità e di onboarding",
    title: "Estrazione dei documenti KYC per l'onboarding dei clienti",
    description:
      "Acquisisci documenti di identità e di prova della residenza durante l'onboarding, verifica che i dati coincidano tra loro e conserva un registro verificabile della decisione.",
    summary: "Documenti di identità e di residenza acquisiti, verificati per coerenza e registrati in modo verificabile.",
    lede: "Tavnit legge i documenti raccolti durante l'onboarding (documenti di identità, prove di residenza, atti costitutivi) e restituisce nomi, numeri, date e indirizzi come campi strutturati. Poiché l'intero insieme viene elaborato insieme, verificare che i dati coincidano tra i documenti diventa un controllo invece di un'ipotesi.",
    problem: [
      "Fare l'onboarding di un cliente significa raccogliere documenti, leggerli e confermare che descrivano la stessa persona o la stessa entità. La lettura è noiosa; la conferma è la parte che comporta rischi, e si fa a occhio.",
      "Il volume peggiora le cose. Un team che fa onboarding con continuità finisce con criteri diversi da un revisore all'altro e nessun registro affidabile di cosa è stato verificato e quando.",
    ],
    fields: [
      { name: "Nome completo come stampato", note: "Estrailo testualmente. Ordine e traslitterazione cambiano da un documento all'altro, e quella differenza è il controllo." },
      { name: "Data di nascita", note: "Il campo singolo più utile per la coerenza tra documenti." },
      { name: "Numero e tipo di documento", note: "Passaporto, carta d'identità, patente: ciascuno con le proprie convenzioni di numerazione." },
      { name: "Date di rilascio e di scadenza", note: "La scadenza è una regola più che un campo: un documento scaduto è un rilievo." },
      { name: "Indirizzo", note: "Dalle prove di residenza, che devono coincidere con quanto dichiarato dal cliente." },
      { name: "Dati di registrazione dell'entità", note: "Per l'onboarding aziendale: numero di registrazione, sede legale, amministratori." },
    ],
    gotchas: [
      {
        title: "I nomi non coincidono, ed è normale",
        body: "La stessa persona compare come 'Jose Garcia Lopez', 'J. García' e 'GARCIA LOPEZ, JOSE' in tre documenti. Estrai i nomi testualmente invece di normalizzarli durante l'estrazione, poi confrontali consapevolmente: normalizzare troppo presto butta via proprio la differenza che devi valutare.",
      },
      {
        title: "I documenti fotografati sono la norma e la qualità varia",
        body: "I clienti fotografano i documenti con il telefono, spesso con un riflesso proprio sulla zona a lettura ottica. Dato quanto costa un errore, la revisione in fase di onboarding è proporzionata, e l'audit trail registra poi chi ha accettato quale documento.",
      },
      {
        title: "Sono i dati più regolamentati che elaborerai",
        body: "I documenti di identità comportano limiti di conservazione, diritti di cancellazione e obblighi di accesso che i normali documenti aziendali non hanno. I Bucket privati e i permessi per singolo utente limitano i fascicoli di onboarding al team compliance, e il registro non modificabile documenta chi ha avuto accesso a cosa.",
      },
    ],
    pipeline: [
      { label: "Collection", href: "/docs/collections", why: "Classificano qualunque cosa il cliente abbia inviato (passaporto, bolletta, certificato di costituzione) e indirizzano ciascuna al Flow giusto." },
      { label: "Flow", href: "/docs/flows", why: "Un Flow per tipo di documento, così un controllo può fare riferimento a un campo con un nome invece di cercare nel testo." },
      { label: "Revisione umana", href: "/docs/human-in-the-loop", why: "Approvazione di ogni onboarding, con un registro permanente di chi ha approvato quale documento." },
      { label: "Ruoli utente", href: "/docs/user-roles", why: "Limitano i documenti di identità al team che ne ha bisogno invece che a tutta l'organizzazione." },
    ],
    faqs: [
      { q: "Verifica che un documento sia autentico?", a: "No. Tavnit estrae e struttura ciò che dicono i documenti e ti permette di verificarne la coerenza all'interno di un insieme. La verifica dell'autenticità presso le autorità emittenti è una specializzazione a parte, e questo non la sostituisce." },
      { q: "Può verificare che i dati coincidano tra i documenti?", a: "Sì. Elabora l'insieme e confronta i campi estratti (nome, data di nascita, indirizzo), così una discrepanza emerge come valore invece di essere qualcosa che un revisore deve notare." },
      { q: "Come restano riservati i dati di identità?", a: "I Bucket privati con permessi di accesso per singolo utente limitano la visibilità al team compliance, e l'audit trail non modificabile registra ogni visualizzazione, modifica e approvazione." },
    ],
  },
  {
    slug: "lease-agreements",
    label: "Locazioni e immobili",
    badge: "Real estate e facility",
    h1: "Estrazione dati dai contratti di locazione",
    title: "Sintesi dei contratti di locazione: canone, durata e date di recesso",
    description:
      "Sintetizza i contratti di locazione in record strutturati (canone, date di revisione, clausole di recesso, oneri accessori e obblighi di manutenzione) su un intero portafoglio.",
    summary: "Contratti di locazione sintetizzati in record strutturati: canone, revisioni, date di recesso e obblighi.",
    lede: "Tavnit sintetizza i contratti di locazione in record strutturati: parti, immobile locato, durata, canone e date di revisione, clausole di recesso, criteri degli oneri accessori e obblighi di manutenzione. Un portafoglio conservato in PDF diventa una tabella in cui la prossima revisione del canone è un filtro invece di un esercizio di lettura.",
    problem: [
      "La sintesi dei contratti di locazione è un lavoro manuale consolidato proprio perché le risposte sono sepolte nella redazione del testo e non stampate in campi. Le aziende la pagano, più volte, e il foglio di calcolo che ne risulta diventa obsoleto appena un contratto viene modificato.",
      "Il costo di non averla è specifico e salato: una data di recesso mancata, un'opzione non esercitata, una revisione del canone passata senza contestazioni.",
    ],
    fields: [
      { name: "Locatore, conduttore e garante", note: "Entità giuridiche più che nomi commerciali, e spesso modificate da atti successivi." },
      { name: "Immobile locato", note: "Descritto a parole e con riferimento a una planimetria, raramente come indirizzo pulito." },
      { name: "Durata, decorrenza e scadenza", note: "La spina dorsale di ogni altra data del documento." },
      { name: "Canone e date di revisione", note: "Il criterio di revisione (valore di mercato, indicizzato, a scaglioni) conta quanto l'importo." },
      { name: "Clausole di recesso e relative condizioni", note: "Un diritto di recesso con condizioni non soddisfatte non è un diritto di recesso. Estrai entrambi." },
      { name: "Oneri accessori e obblighi di manutenzione", note: "Dove sta davvero la responsabilità, e di solito le clausole più lunghe del documento." },
    ],
    gotchas: [
      {
        title: "Le date sono definite, non indicate",
        body: "Un contratto di locazione raramente stampa la data di recesso. Dice che il conduttore può recedere al quinto anniversario della decorrenza, con sei mesi di preavviso. Estrai la decorrenza, l'anniversario e il periodo di preavviso come campi, poi lascia che un Cleaner con formula calcoli la scadenza effettiva, che è la data che ti serviva.",
      },
      {
        title: "Il documento in vigore spesso non è il contratto",
        body: "Atti modificativi, autorizzazioni a eseguire lavori e lettere integrative cambiano la situazione, e il contratto originale continua a leggersi come se non esistessero. Elabora ciascuno come un'esecuzione a sé con la sua data, così la situazione attuale deriva dall'insieme completo e non dal PDF che qualcuno ha aperto.",
      },
      {
        title: "Un diritto condizionato letto come incondizionato è un rischio",
        body: "Le clausole di recesso sono spesso subordinate alla riconsegna dell'immobile libero o al pagamento regolare del canone. Acquisire il diritto senza le condizioni produce una tabella di portafoglio sbagliata con sicurezza, il che è peggio di nessuna tabella. Estrai le condizioni come campo a sé e verificale.",
      },
    ],
    pipeline: [
      { label: "Flow", href: "/docs/flows", why: "Qui le istruzioni di estrazione sono essenziali: il modello deve sapere cos'è una condizione di recesso, non solo dove cercarla." },
      { label: "Cleaner", href: "/docs/cleaners", why: "Calcolano le scadenze di revisione e di recesso a partire dalle date di decorrenza e dai periodi di preavviso." },
      { label: "Bucket", href: "/docs/buckets", why: "Il portafoglio come tabella: quali contratti consentono il recesso l'anno prossimo, ordinati per scadenza del preavviso." },
      { label: "Revisione umana", href: "/docs/human-in-the-loop", why: "Verifica ogni sintesi. Qui il costo di una data sbagliata si misura in anni di canone." },
    ],
    faqs: [
      { q: "Può calcolare le date di recesso e di revisione?", a: "Sì. Estrai la data di decorrenza, l'anniversario a cui è legato il diritto e il periodo di preavviso, poi un Cleaner con formula ricava la scadenza effettiva, che di solito è ciò che ti serve più della clausola in sé." },
      { q: "E gli atti modificativi?", a: "Elabora ogni documento come un'esecuzione a sé con la data acquisita come campo. La situazione attuale si ricava allora interrogando l'intero insieme invece di dare per scontato che il file più recente sia quello valido." },
      { q: "Acquisisce le condizioni legate a una clausola di recesso?", a: "Dovrebbe, e secondo noi deve: un diritto di recesso registrato senza le sue condizioni produce una tabella di portafoglio che sembra certa e non lo è. Estrai le condizioni come campo a sé e verificale." },
    ],
  },
  {
    slug: "timesheets",
    label: "Fogli presenze",
    badge: "Paghe e personale",
    h1: "Acquisizione di fogli presenze e turni",
    title: "Estrazione dei dati dai fogli presenze per le paghe",
    description:
      "Acquisisci le ore dai fogli presenze consegnati (stampati, scritti a mano o fotografati) e verificale con delle regole prima che arrivino alle paghe.",
    summary: "Ore acquisite da fogli presenze stampati, scritti a mano e fotografati, verificate prima delle paghe.",
    lede: "Tavnit legge i fogli presenze consegnati, anche quelli scritti a mano e fotografati, e restituisce lavoratore, data, ore e centro di costo come righe. Le regole possono verificare i totali prima che qualcosa arrivi alle paghe, così gli errori che diventano conguagli vengono intercettati quando costano ancora poco.",
    problem: [
      "Le paghe hanno una scadenza, e i fogli presenze arrivano nella forma che usa ogni cantiere o agenzia: la stampa di un foglio di calcolo, un foglio di carta fotografato a fine turno, un PDF dal sistema di un subappaltatore.",
      "Qualcuno li ridigita sotto pressione, che è esattamente la condizione in cui nascono gli errori di trascrizione. Un dato sbagliato scoperto dopo l'elaborazione delle paghe significa una correzione, un conguaglio e una conversazione spiacevole.",
    ],
    fields: [
      { name: "Nome o matricola del lavoratore", note: "I nomi sui fogli presenze raramente coincidono con l'anagrafica delle paghe: un Cleaner di ricerca li abbina." },
      { name: "Data o settimana di riferimento", note: "Determina il periodo di paga a cui appartengono le ore, ed è facile leggerla male a cavallo tra due periodi." },
      { name: "Orari di inizio, fine e pausa", note: "Estrarre i singoli componenti invece del solo totale permette di verificare il totale." },
      { name: "Ore totali", note: "Conviene estrarle come dichiarate e confrontarle con il totale calcolato." },
      { name: "Straordinari e ore maggiorate", note: "Tariffe diverse, quindi una classificazione sbagliata è un errore di paga, non di arrotondamento." },
      { name: "Centro di costo o commessa", note: "Alla base del controllo dei costi per commessa, ed è il campo lasciato vuoto più spesso." },
    ],
    gotchas: [
      {
        title: "Il totale dichiarato e quello reale non coincidono più spesso di quanto pensi",
        body: "Le persone sommano da sole le proprie ore, e sbagliano. Estrarre orari di inizio, fine e pausa insieme al totale dichiarato permette a un Cleaner con formula di calcolare le ore e confrontarle: le discrepanze che emergono sono di solito veri errori di calcolo, non errori di estrazione.",
      },
      {
        title: "I fogli scritti a mano sono il caso difficile, e sono comuni",
        body: "Il lavoro in cantiere e a turni si basa ancora sulla carta fotografata a fine giornata. La scrittura a mano viene estratta, ma la confidenza varia, ed è un caso d'uso in cui mandare in revisione le acquisizioni incerte è meglio che scoprire il problema in busta paga.",
      },
      {
        title: "I nomi sui fogli presenze non sono i nomi delle paghe",
        body: "'Dave S.', 'David Smith' e un numero di matricola indicano tutti la stessa persona, e alle paghe serve la matricola. Un Cleaner di ricerca abbina i nomi dichiarati al tuo elenco dei lavoratori durante l'elaborazione, così le voci senza corrispondenza vengono segnalate invece di essere attribuite a caso.",
      },
    ],
    pipeline: [
      { label: "Integrazione email", href: "/docs/email-integration", why: "Cantieri e agenzie inviano i fogli via email a fine settimana; inoltrandoli, vengono elaborati all'arrivo." },
      { label: "Splitter", href: "/docs/splitters", why: "Un unico PDF con i fogli di un'intera squadra diventa un'esecuzione per lavoratore." },
      { label: "Cleaner", href: "/docs/cleaners", why: "Calcolano le ore dagli orari, abbinano i nomi all'anagrafica delle paghe e segnalano i totali che non quadrano." },
      { label: "Revisione umana", href: "/docs/human-in-the-loop", why: "Solo i fogli che non superano un controllo arrivano a una persona, ed è questo che rende la cosa sostenibile con la scadenza delle paghe." },
    ],
    faqs: [
      { q: "Può leggere fogli presenze scritti a mano?", a: "Sì. La scrittura a mano viene estratta insieme al testo stampato, anche se la confidenza varia con la leggibilità: per questo qui conviene attivare l'invio in revisione dei fogli incerti." },
      { q: "Può verificare che le ore tornino?", a: "Sì. Estrai orari di inizio, fine e pausa insieme al totale dichiarato, e un Cleaner con formula calcola le ore e segnala qualsiasi foglio in cui i due valori non coincidono." },
      { q: "E se i nomi non corrispondono al nostro sistema paghe?", a: "Un Cleaner di ricerca abbina i nomi dichiarati al tuo elenco dei lavoratori durante l'elaborazione. Le voci che non riesce ad abbinare vengono segnalate invece di essere indovinate, così nulla arriva alle paghe senza un'attribuzione." },
    ],
  },
  {
    slug: "utility-bills",
    label: "Bollette delle utenze",
    badge: "Facility ed ESG",
    h1: "Estrazione dati da bollette e contatori",
    title: "Estrazione delle bollette per costi ed emissioni",
    description:
      "Estrai consumi, tariffe e letture dei contatori dalle bollette di un intero portafoglio immobiliare, per il controllo dei costi e la rendicontazione delle emissioni.",
    summary: "Consumi, tariffe e letture dei contatori estratti su tutto il portafoglio, per la rendicontazione di costi ed emissioni.",
    lede: "Tavnit legge le bollette di elettricità, gas, acqua e rifiuti e restituisce consumi, tariffa, letture dei contatori e importi per sito. Le bollette di un portafoglio diventano una tabella di cui seguire l'andamento, che è ciò che richiedono davvero sia il controllo dei costi sia la rendicontazione delle emissioni.",
    problem: [
      "Chiunque gestisca più di una manciata di siti riceve bollette da diversi fornitori in diversi formati, e l'unica cosa che succede sempre è che vengono pagate. I dati di consumo, cioè la parte con valore analitico, restano nel PDF.",
      "La rendicontazione delle emissioni ha reso la cosa urgente. La rendicontazione Scope 1 e 2 richiede i consumi in kWh per sito e per periodo, e per la maggior parte delle organizzazioni quei dati esistono solo come una pila di bollette che nessuno ha trascritto.",
    ],
    fields: [
      { name: "Indirizzo di fornitura e codice del contatore (POD/PDR)", note: "L'identificativo che collega una bolletta a un sito. Gli indirizzi da soli non sono affidabili tra fornitori diversi." },
      { name: "Periodo di fatturazione", note: "Le bollette raramente coincidono con i mesi di calendario, il che conta quando aggreghi per trimestre." },
      { name: "Consumo con unità di misura", note: "kWh, m³ o litri. L'unità è importante quanto il numero e non è sempre indicata allo stesso modo." },
      { name: "Letture del contatore e indicazione di stima", note: "Una lettura stimata non è una misurazione, e trattarla come tale falsa l'andamento." },
      { name: "Tariffa e quota fissa", note: "Ciò che distingue una variazione di prezzo da una variazione di consumo." },
      { name: "Importi totali e imposte", note: "Per riconciliare i costi con quanto effettivamente pagato." },
    ],
    gotchas: [
      {
        title: "Le letture stimate non sono dati",
        body: "I fornitori stimano quando non riescono a leggere un contatore, poi correggono alla lettura reale successiva. Un andamento costruito senza distinguere le due cose mostra un picco mai avvenuto seguito da un calo mai avvenuto. Estrai l'indicazione di stima come campo a sé, così le stime si possono escludere o trattare separatamente.",
      },
      {
        title: "I periodi di fatturazione non coincidono con niente",
        body: "Un fornitore fattura ogni mese, un altro ogni 28 giorni, un terzo ogni trimestre, e nessuno coincide con i tuoi periodi di rendicontazione. Estrai inizio e fine del periodo invece di una sola data, così i consumi si possono ripartire sui periodi su cui rendiconti davvero.",
      },
      {
        title: "Le unità cambiano, e il gas è la trappola",
        body: "Il gas viene spesso fatturato in metri cubi e rendicontato in kWh, e la conversione dipende da un potere calorifico stampato in bolletta. Estrai l'unità e il coefficiente di conversione invece di darli per scontati, poi lascia che un Cleaner per le unità faccia la conversione: presumere un coefficiente standard è il punto in cui la maggior parte dei dati sulle emissioni sbaglia in silenzio.",
      },
    ],
    pipeline: [
      { label: "Collection", href: "/docs/collections", why: "Le bollette di utenze e fornitori diversi arrivano insieme e vengono indirizzate in automatico al Flow giusto." },
      { label: "Cleaner", href: "/docs/cleaners", why: "Convertono le unità in un'unica base di rendicontazione e calcolano i consumi ripartiti per periodo." },
      { label: "Bucket", href: "/docs/buckets", why: "Consumi per sito e periodo come tabella visualizzabile in grafici: il formato che serve sia alla finanza sia alla rendicontazione ESG." },
      { label: "Integrazione email", href: "/docs/email-integration", why: "I fornitori inviano le bollette via email; inoltrandole, costruisci il dataset senza un progetto di inserimento dati." },
    ],
    faqs: [
      { q: "Può gestire bollette di utenze e fornitori diversi?", a: "Sì. Una Collection classifica ogni bolletta e la indirizza al Flow giusto, così le bollette di elettricità, gas e acqua vengono lette ciascuna dal Flow creato per loro, qualunque sia il layout del fornitore." },
      { q: "I dati sono utilizzabili per la rendicontazione delle emissioni?", a: "Producono i consumi per sito e periodo con le unità acquisite, che è l'input di cui quella rendicontazione ha bisogno. Estrai l'indicazione di stima e il coefficiente di conversione invece di presumerne uno standard: è quell'ipotesi a far sbagliare la maggior parte dei dati sulle emissioni." },
      { q: "Può distinguere un aumento di prezzo da un aumento dei consumi?", a: "Estrai tariffa e quota fissa insieme ai consumi, e diventano colonne separate di cui puoi seguire l'andamento in modo indipendente." },
    ],
  },
];

const it: UseCasesContent = {
  hub: {
    title: "Casi d'uso — fatture, contratti, CV e altro",
    description:
      "Come i team usano Tavnit per tipo di documento: fatture, contratti, CV, scontrini, ordini di acquisto e documenti doganali, con ciò che ciascuno tende a sbagliare.",
    ogTitle: "Casi d'uso di Tavnit",
    breadcrumbHome: "Home",
    breadcrumb: "Casi d'uso",
    h1: "Casi d'uso",
    intro:
      "La pipeline è la stessa qualunque cosa le invii: estrai, pulisci, verifica, agisci. Ciò che cambia è quali campi contano e cosa tende ad andare storto.",
    introMore:
      "Ogni pagina qui sotto spiega quali campi conviene estrarre da quel tipo di documento, quali parti si rompono puntualmente e quale fase della pipeline fa davvero la differenza.",
    notSeeingHeading: "Non trovi il tuo tipo di documento?",
    notSeeing:
      "Questi sono i tipi su cui i team ci fanno più domande, non l'elenco di ciò che Tavnit supporta. Non c'è alcuna configurazione da costruire per ogni tipo di documento: descrivi i campi che vuoi e la stessa estrazione legge qualsiasi PDF o immagine, scansioni e scrittura a mano comprese.",
    notSeeingMore:
      "Documenti di trasporto, estratti conto, sinistri assicurativi, moduli sanitari, certificati e domande di ogni tipo funzionano allo stesso modo. Parti dalla [guida introduttiva](/docs) e definisci i campi che contano per te.",
    finalHeading: "Inizia con un solo documento",
    finalBody:
      "Crea un Flow, fai passare un documento reale e giudica il risultato prima di collegare qualsiasi cosa. Crediti gratuiti per iniziare.",
    finalCta: "Inizia gratis",
  },
  items,
};

export default it;
