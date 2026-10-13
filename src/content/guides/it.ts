import type { GuidesContent } from "@/content/types";
import type { Guide } from "@/lib/guides";

/** Guides: the /guides hub copy and every guide — Italiano (it). */
const items: Guide[] = [
  {
    slug: "how-to-match-invoices-to-purchase-orders",
    title: "Come abbinare le fatture agli ordini di acquisto (two-way e three-way)",
    h1: "Come abbinare le fatture agli ordini di acquisto",
    description:
      "Cos'è l'abbinamento fattura-ordine, in cosa differiscono il two-way e il three-way matching, dove fallisce l'abbinamento manuale e come automatizzarlo senza sostituire il tuo ERP.",
    lede: "L'abbinamento tra fattura e ordine di acquisto verifica che la fattura del fornitore corrisponda all'ordine a cui si riferisce: stesso fornitore, stessi articoli, stesse quantità, stessi prezzi. Il two-way matching confronta fattura e ordine; il three-way matching aggiunge il documento di ricevimento merce. È il controllo che impedisce a un'azienda di pagare ciò che non ha ordinato o non ha ricevuto.",
    published: "2026-09-08",
    updated: "2026-09-08",
    readingMinutes: 7,
    sections: [
      {
        heading: "Cosa verifica davvero l'abbinamento",
        paragraphs: [
          "Un ordine di acquisto è un impegno a comprare; una fattura è una richiesta di pagamento. Abbinarli risponde a una sola domanda (questa fattura chiede esattamente ciò che avevamo concordato?) su quattro dimensioni: il fornitore, gli articoli, le quantità e i prezzi unitari. Una quinta, i totali, è una conseguenza delle altre quattro ed è la cosa meno utile da controllare da sola.",
          "I totali sono un controllo debole perché coincidono per caso più spesso di quanto si pensi. Una fattura che addebita dieci unità a 12 $ invece di dodici unità a 10 $ ha il totale giusto e tutto il resto sbagliato. L'abbinamento a livello di testata intercetta la fattura senza ordine; solo l'abbinamento a livello di riga intercetta la fattura con le righe sbagliate.",
        ],
      },
      {
        heading: "Two-way e three-way matching a confronto",
        paragraphs: [
          "Il two-way matching confronta la fattura con l'ordine di acquisto. Conferma che hai accettato di comprare quella merce a quel prezzo. Non conferma che l'hai ricevuta, ed è per questo che di solito si riserva a servizi, abbonamenti e beni di basso valore, dove il costo di un passaggio di ricevimento supera il rischio.",
          "Il three-way matching aggiunge il documento di ricevimento merce: il documento di trasporto, la packing list o la ricevuta di magazzino che registra ciò che è arrivato fisicamente. Ora la fattura deve corrispondere sia a ciò che è stato ordinato sia a ciò che è stato ricevuto. Un fornitore che spedisce otto unità e ne fattura dieci viene scoperto qui e da nessun'altra parte. È lo standard per i beni fisici, e la maggior parte dei framework di audit lo richiede oltre una soglia di rilevanza.",
          "Alcuni team parlano di four-way matching, aggiungendo un verbale di ispezione o di accettazione qualità. È la stessa idea con un documento in più, e la meccanica è identica.",
        ],
      },
      {
        heading: "Perché l'abbinamento manuale si inceppa",
        paragraphs: [
          "L'ordine di acquisto è strutturato: esce dal tuo sistema. La fattura no. Arriva come PDF dal sistema del fornitore, con il suo layout, i suoi codici articolo e la sua descrizione di ogni voce. Prima di qualsiasi confronto, qualcuno deve leggere quel PDF e tradurlo nella stessa forma dell'ordine. Nella maggior parte dei reparti contabilità fornitori, questa traduzione è una persona con due finestre aperte.",
          "È lì che entrano gli errori. Il confronto in sé non è difficile: lo fa anche un foglio di calcolo. La trascrizione è difficile, perché è ripetitiva, i layout cambiano da fornitore a fornitore e una quantità sbagliata sembra identica a una giusta. Il fallimento dell'abbinamento che vivono quasi tutte le aziende non è un difetto della logica di confronto. È un difetto dell'inserimento dati a monte.",
        ],
        bullets: [
          "I codici articolo del fornitore differiscono dagli SKU interni, quindi l'accoppiamento delle righe richiede una tabella di conversione che nessuno aggiorna.",
          "Le descrizioni usano parole diverse (\"Blue widget 10pk\" contro \"WIDGET-BLU x10\"), quindi il confronto testuale esatto fallisce su articoli che sono gli stessi.",
          "Unità di misura e confezionamento cambiano i conti: 1 cartone da 12 contro 12 unità.",
          "Consegne parziali e fatture frazionate fanno sì che un ordine corrisponda a più fatture, e l'abbinamento diventa molti-a-uno.",
          "Trasporto, supplementi e imposte compaiono in fattura ma non nell'ordine, e vanno classificati come differenze accettabili, non come discrepanze.",
        ],
      },
      {
        heading: "Tolleranze: decidere cosa conta come discrepanza",
        paragraphs: [
          "Nella realtà nessun abbinamento è esatto. I prezzi si quotano prima che il cambio si muova, i fornitori arrotondano, il trasporto è stimato. Un processo che blocca ogni fattura con un centesimo di differenza verrà disattivato entro un mese. La soluzione è una politica di tolleranza: una regola, concordata in anticipo, su quanta differenza è accettabile per ciascuna dimensione prima di bloccare la fattura.",
          "Le politiche tipiche ammettono una piccola differenza percentuale o assoluta sul prezzo unitario, nessuna differenza sulle quantità per i beni fisici e una franchigia separata per le righe di trasporto e supplementi. Ciò che conta è che la regola sia scritta e applicata dal sistema, non decisa da chi fa l'abbinamento quel giorno. Le fatture entro la tolleranza passano; quelle fuori si fermano e vanno a una persona.",
        ],
      },
      {
        heading: "Come automatizzarlo, passo per passo",
        paragraphs: [
          "L'automazione non inizia da un software di abbinamento. Inizia portando entrambi i documenti nella stessa forma strutturata, così che il confronto diventi una query invece di una lettura.",
        ],
        bullets: [
          "Definisci un unico schema di campi per i documenti d'ordine: numero d'ordine, fornitore, SKU di riga, descrizione, quantità, prezzo unitario, importo di riga, totale. Usalo per ordini, fatture e documenti di trasporto.",
          "Estrai ogni fattura in arrivo in quello schema. È il passaggio che la maggior parte dei team salta, ed è quello che rende possibile tutto il resto.",
          "Normalizza i codici articolo del fornitore sui tuoi SKU con una ricerca nell'anagrafica articoli; dove manca la corrispondenza, accoppia le righe per somiglianza semantica della descrizione invece che per testo esatto.",
          "Verifica prima la fattura rispetto a se stessa: il prezzo unitario per la quantità dà l'importo di riga, e le righe sommano al totale? Gli errori di calcolo sono i più economici da intercettare e i più imbarazzanti da pagare.",
          "Abbina i campi di testata sul numero d'ordine, poi abbina le righe all'interno dell'ordine trovato. Applica la tua politica di tolleranza per ciascuna dimensione.",
          "Invia a un revisore solo le eccezioni, con la fattura, l'ordine e la discrepanza specifica sotto gli occhi. Registra gli abbinamenti riusciti direttamente nell'ERP.",
          "Conserva un audit trail di chi ha approvato cosa e quando. Lo chiedono i revisori contabili, e lo chiede anche il fornitore quando contesta un pagamento ridotto.",
        ],
      },
    ],
    tavnit: {
      heading: "Dove entra in gioco Tavnit",
      paragraphs: [
        "Tavnit si occupa dell'estrazione e della strutturazione. Ordini di acquisto, fatture e documenti di trasporto arrivano via email o API e vengono estratti negli stessi campi tipizzati, qualunque sia il layout del fornitore. Un Cleaner di ricerca converte i codici articolo del fornitore nei tuoi SKU; un Cleaner con formula controlla i calcoli di riga; una condizione segnala tutto ciò che esce dalla tua tolleranza.",
        "Per l'abbinamento a livello di riga, un Matcher prende l'esecuzione dell'ordine come riferimento e vi accoppia ogni riga della fattura, in modo semantico e con un LLM che decide i casi dubbi, affiancando quantità e prezzo unitario ed elencando come avvisi le righe senza corrispondenza. Le fatture segnalate si fermano per un revisore designato, con un audit trail non modificabile; le altre arrivano al tuo ERP via API o webhook.",
      ],
      links: [
        { label: "Software per l'abbinamento agli ordini", href: "/use-cases/purchase-orders" },
        { label: "Elaborazione delle fatture", href: "/use-cases/invoice-processing" },
        { label: "Documenti di trasporto e controlli di ricevimento", href: "/use-cases/delivery-notes" },
      ],
    },
    faqs: [
      { q: "Qual è la differenza tra two-way e three-way matching?", a: "Il two-way matching confronta la fattura con l'ordine di acquisto: avevamo accettato di comprare questo a questo prezzo? Il three-way matching la confronta anche con il documento di ricevimento merce: è arrivato davvero? Il three-way è lo standard per i beni fisici; il two-way è comune per servizi e acquisti di basso valore." },
      { q: "L'abbinamento agli ordini si può automatizzare del tutto?", a: "Il confronto sì. La parte che resiste all'automazione è portare il PDF della fattura del fornitore nella stessa forma strutturata del tuo ordine, perché layout, codici articolo e descrizioni cambiano da un fornitore all'altro. Una volta automatizzata l'estrazione, l'abbinamento è una query, e solo le eccezioni richiedono una persona." },
      { q: "Che tolleranza devo impostare?", a: "Non esiste un numero universale. La maggior parte delle politiche ammette una piccola differenza percentuale o assoluta sul prezzo unitario, nessuna differenza sulle quantità per i beni fisici, e tratta trasporto e supplementi come righe accettabili a parte. L'importante è che la regola sia scritta e applicata in modo coerente dal sistema." },
    ],
  },
  {
    slug: "line-item-extraction-from-invoices",
    title: "Estrazione delle righe dalle fatture: cos'è e perché è difficile",
    h1: "Estrazione delle righe dalle fatture",
    description:
      "Perché estrarre le righe di una fattura è più difficile che estrarne i totali, cosa deve restituire una buona estrazione delle righe e come ottenere i dati delle tabelle da qualsiasi layout senza template.",
    lede: "L'estrazione delle righe recupera la tabella ripetuta di una fattura (ogni riga di prodotto o servizio con descrizione, SKU, quantità, prezzo unitario e importo) sotto forma di righe strutturate, invece dei soli campi di testata come fornitore, data e totale. È ciò che rende possibili l'abbinamento agli ordini, l'analisi della spesa e la riconciliazione del magazzino, ed è la parte che la maggior parte degli OCR sbaglia.",
    published: "2026-09-08",
    updated: "2026-09-08",
    readingMinutes: 6,
    sections: [
      {
        heading: "Campi di testata e righe",
        paragraphs: [
          "Ogni fattura ha una manciata di campi di testata (fornitore, numero, data, scadenza, valuta, totale) che compaiono una volta e sono facili da trovare. Poi c'è una tabella. Può avere tre righe o trecento, può estendersi su più pagine, può avere colonne diverse da quelle di ogni altro fornitore. Estrarre la testata ti dice quanto pagare. Estrarre le righe ti dice che cosa stai pagando, che è la domanda che ogni processo a valle si pone davvero.",
          "L'analisi della spesa ha bisogno delle categorie di riga. L'abbinamento agli ordini ha bisogno di quantità e prezzi di riga. Il magazzino ha bisogno degli SKU di riga. Il fisco ha bisogno delle aliquote per riga. Una fattura estratta senza le sue righe è un ordine di pagamento senza contenuto.",
        ],
      },
      {
        heading: "Perché le tabelle sono la parte difficile",
        paragraphs: [
          "Un totale è un singolo valore in una zona prevedibile della pagina. Una tabella è una struttura, e la struttura cambia ovunque. L'OCR classico legge caratteri e posizioni; non sa che il numero sotto \"Qtà\" appartiene alla descrizione due celle più a sinistra, che la descrizione è andata a capo su una seconda riga o che le ultime tre righe sono subtotali e non articoli.",
        ],
        bullets: [
          "Le colonne cambiano da fornitore a fornitore: alcuni hanno SKU e descrizione, altri solo la descrizione, altri dividono il prezzo unitario in netto e lordo.",
          "Le descrizioni su più righe vanno a capo, e per un parser basato sulle posizioni la seconda riga sembra una nuova voce.",
          "Le tabelle si estendono su più pagine, con o senza intestazioni ripetute, e con riporti a fondo pagina.",
          "Le righe che non sono articoli (subtotali, sconti, trasporto, imposte, \"segue\") stanno dentro la tabella e vanno classificate, non estratte come prodotti.",
          "Celle unite, numeri allineati a destra che sconfinano nella colonna successiva e scansioni storte mandano in crisi l'analisi basata sulle coordinate.",
          "Unità e confezionamenti si nascondono nella descrizione (\"per cartone da 12\") invece di avere una colonna propria.",
        ],
      },
      {
        heading: "Estrazione con template e senza template",
        paragraphs: [
          "Gli strumenti basati su template risolvono le tabelle facendoti disegnare l'area della tabella e le colonne per il layout di ogni fornitore. Funziona, per quel fornitore, finché non cambia il formato della fattura: da lì in poi produce righe sbagliate in silenzio finché qualcuno non se ne accorge. Il costo di manutenzione cresce con il numero dei fornitori, ed è per questo che i team con centinaia di fornitori abbandonano questi strumenti.",
          "L'estrazione senza template usa un modello che capisce cos'è una riga di fattura, come la capirebbe una persona, e restituisce righe secondo uno schema che definisci una sola volta (descrizione, quantità, prezzo unitario, importo) qualunque sia il layout. Il rovescio della medaglia è che un modello può leggere male, ed è per questo che il risultato va verificato e non preso sulla fiducia: controlli aritmetici su ogni riga e revisione umana quando un controllo fallisce.",
        ],
      },
      {
        heading: "Com'è un buon risultato",
        paragraphs: [
          "Il risultato deve essere una tabella, non testo: una riga per articolo, una colonna tipizzata per campo, con i numeri come numeri e le date come date. Ogni riga deve contenere i campi che servono al processo a valle e niente che appartenga alla testata. Le righe che non sono articoli vanno escluse o segnalate, non mescolate. E il risultato deve essere verificabile: se prezzo unitario per quantità non dà l'importo di riga, quella riga è sbagliata e deve dirlo.",
        ],
        bullets: [
          "Descrizione, testuale, perché è da lì che deriva ogni abbinamento o categorizzazione successiva.",
          "SKU o codice articolo: quello del fornitore, più il tuo se una ricerca riesce a ricavarlo.",
          "Quantità e unità di misura, come campi separati.",
          "Prezzo unitario e importo di riga, entrambi, così da poter controllare i conti.",
          "Aliquota o codice IVA per riga, dove la normativa lo richiede.",
          "Uno stato di verifica per riga: calcolo corretto, oppure segnalato con il motivo.",
        ],
      },
    ],
    tavnit: {
      heading: "Dove entra in gioco Tavnit",
      paragraphs: [
        "In Tavnit le righe sono campi di tabella di un Flow: dai un nome alle colonne una sola volta e ogni fattura di ogni fornitore viene estratta in quelle colonne come righe tipizzate, senza template per fornitore. Un Cleaner con formula verifica prezzo unitario per quantità su ogni riga; un Cleaner di ricerca converte i codici articolo del fornitore nei tuoi SKU; un Cleaner di categoria assegna le categorie di spesa. Le righe che non superano un controllo mandano l'esecuzione a un revisore. I risultati finiscono in un Bucket che puoi interrogare o trasformare in grafici, oppure vanno direttamente ai tuoi sistemi via API o webhook.",
      ],
      links: [
        { label: "Estrazione dei dati dalle fatture", href: "/use-cases/invoice-processing" },
        { label: "Flow: definire i campi di tabella", href: "/docs/flows" },
        { label: "Cleaner: campi con formula e di ricerca", href: "/docs/cleaners" },
      ],
    },
    faqs: [
      { q: "L'OCR può estrarre le righe dalle fatture?", a: "L'OCR puro estrae caratteri e posizioni; non capisce la struttura della tabella, quindi produce testo che va ancora scomposto in righe. Un'estrazione affidabile delle righe richiede un livello che capisca cos'è una riga di fattura: un template per fornitore oppure un modello che generalizza su qualsiasi layout." },
      { q: "Come estraggo le tabelle delle fatture senza un template per fornitore?", a: "Usa un modello di estrazione che restituisca righe secondo uno schema che definisci tu (descrizione, quantità, prezzo unitario, importo) qualunque sia il layout, poi verifica ogni riga con un controllo aritmetico e manda gli errori a un revisore. È ciò che fanno i campi di tabella di Tavnit." },
      { q: "Come vanno gestite le tabelle su più pagine?", a: "L'estrazione deve trattare la tabella come un'unica tabella logica su più pagine, ignorando le intestazioni ripetute e i riporti di pagina, e restituire un solo insieme di righe. Controlla che le righe sommino al totale della fattura per essere certo che nulla sia andato perso a un cambio pagina." },
    ],
  },
  {
    slug: "hs-code-classification-explained",
    title: "Classificazione dei codici HS spiegata, e come automatizzarla",
    h1: "Classificazione dei codici HS: cos'è e come automatizzarla",
    description:
      "Come funziona il Sistema Armonizzato, perché la classificazione doganale è un lavoro di giudizio, dove entrano in gioco le Regole generali di interpretazione e come automatizzarla in modo responsabile.",
    lede: "La classificazione HS assegna a ogni prodotto commerciato un codice del Sistema Armonizzato, la nomenclatura internazionale che le autorità doganali usano per determinare dazi, imposte e controlli. Le prime sei cifre sono globali; i singoli paesi le estendono a otto, dieci o più cifre per le voci tariffarie nazionali. Sbagliare codice significa pagare il dazio sbagliato, ritardare una spedizione o incorrere in una sanzione.",
    published: "2026-09-08",
    updated: "2026-09-08",
    readingMinutes: 7,
    sections: [
      {
        heading: "Come è costruito il Sistema Armonizzato",
        paragraphs: [
          "Il Sistema Armonizzato è gestito dall'Organizzazione mondiale delle dogane e rivisto circa ogni cinque anni; l'edizione in vigore è l'HS 2022. È organizzato in 21 sezioni, 97 capitoli (2 cifre), voci (4 cifre) e sottovoci (6 cifre). Quelle sei cifre sono identiche in ogni paese aderente, ed è questo che rende il sistema armonizzato. Oltre le sei cifre ogni paese aggiunge le proprie suddivisioni, le voci tariffarie nazionali, a cui si legano i dazi effettivi e le imposte interne.",
          "L'Arancel Nacional de Importación di Panama, per esempio, estende la nomenclatura HS 2022 in circa 9.700 voci tariffarie nazionali, ognuna con il proprio dazio all'importazione (DAI), l'imposta sulle vendite (ITBMS) e, dove applicabile, l'imposta selettiva sui consumi (ISC). Una classificazione non è finita a sei cifre: è finita quando arriva alla voce nazionale che determina quanto si deve pagare.",
        ],
      },
      {
        heading: "Perché classificare è giudizio, non consultazione",
        paragraphs: [
          "Se la classificazione fosse una consultazione di dizionario (nome del prodotto in entrata, codice in uscita) sarebbe stata automatizzata decenni fa. Non lo è, perché la nomenclatura classifica le merci in base a ciò di cui sono fatte, a ciò che fanno e a come sono presentate, e una stessa descrizione di prodotto può rientrare plausibilmente in più voci. Un coprisedile riscaldato per auto è un articolo tessile, una parte di veicolo o un apparecchio elettrico di riscaldamento? Ognuno ha un'aliquota diversa.",
          "A dirimere i casi sono le Regole generali per l'interpretazione del Sistema Armonizzato, le RGI. La Regola 1 stabilisce che prevalgono i testi delle voci e le note legali di sezione e di capitolo. La Regola 2 riguarda le merci incomplete e le miscele. La Regola 3 gestisce le merci che potrebbero rientrare in due o più voci: prima la descrizione più specifica, poi il carattere essenziale, poi la voce che viene per ultima in ordine numerico. Le Regole da 4 a 6 trattano le merci non classificate altrove, gli imballaggi e la classificazione a livello di sottovoce. Una classificazione difendibile cita la regola su cui si basa.",
          "Poi ci sono le note legali: note di capitolo e di sezione che includono o escludono merci specifiche da una voce, a prescindere da ciò che il testo della voce sembra dire. Un classificatore che legge i titoli delle voci e ignora le note sbaglierà con sicurezza su un insieme prevedibile di prodotti.",
        ],
      },
      {
        heading: "Dove la classificazione sbaglia nella pratica",
        paragraphs: [
          "La maggior parte degli errori di classificazione non riguarda casi difficili da RGI 3. Riguarda prodotti ordinari descritti male. La fattura commerciale dice \"parti\" o \"campioni\" o riporta un marchio, e chi classifica tira a indovinare o si ferma a chiedere. La descrizione è la materia prima della classificazione, e di solito è l'input più debole dell'intero processo.",
        ],
        bullets: [
          "Descrizioni vaghe sulla fattura commerciale: un marchio o un numero di modello senza dire che cos'è l'articolo o di cosa è fatto.",
          "Spedizioni miste in cui una riga di fattura copre più prodotti distinti che si classificano in modo diverso.",
          "Affidarsi al codice HS dichiarato dal fornitore, classificato secondo la tariffa di un altro paese e magari per uno scopo diverso.",
          "Riutilizzare il codice dell'anno scorso dopo che un cambio di edizione HS ha spostato il prodotto.",
          "Ignorare le note di capitolo e classificare in base al solo titolo della voce.",
          "Nessuna traccia del perché è stato scelto un codice, così lo stesso prodotto viene classificato in tre modi da tre persone.",
        ],
      },
      {
        heading: "Com'è un'automazione responsabile",
        paragraphs: [
          "L'obiettivo non è una macchina che classifichi senza supervisione. La normativa doganale attribuisce la dichiarazione all'importatore o allo spedizioniere doganale abilitato, e continuerà a farlo. L'obiettivo è un sistema che proponga una classificazione con il suo ragionamento nel momento in cui vengono elaborati i documenti della spedizione, così che lo specialista verifichi invece di fare ricerca.",
        ],
        bullets: [
          "Parti dalla descrizione della merce estratta, testuale, più tutti i dettagli su materiale, funzione e composizione presenti in fattura o nella packing list.",
          "Classifica rispetto alla tariffa nazionale, con l'insieme completo delle voci nazionali e delle relative aliquote, non solo rispetto all'HS a sei cifre, e sull'edizione in vigore.",
          "Applica le note legali di capitolo e di sezione e le RGI, e registra quale regola e quale nota hanno deciso il caso.",
          "Restituisci un codice, un grado di confidenza e il ragionamento; manda le righe a bassa confidenza o di alto valore a uno spedizioniere doganale per la revisione prima di presentare la dichiarazione.",
          "Conserva un audit trail per ogni classificazione. Quando la dogana contesta un codice due anni dopo, il ragionamento è la tua difesa.",
          "Impara dalle correzioni dello spedizioniere: un prodotto classificato una volta deve essere classificato allo stesso modo la volta successiva.",
        ],
      },
    ],
    tavnit: {
      heading: "Dove entra in gioco Tavnit",
      paragraphs: [
        "Tavnit estrae il set di documenti della spedizione (fattura commerciale, packing list, polizza di carico, certificato di origine) in campi tipizzati, poi un Cleaner per codici HS classifica ogni riga di merce a partire dalla descrizione estratta, nella stessa esecuzione. Per Panama, il classificatore lavora sull'Arancel Nacional ufficiale (VII Enmienda, HS 2022) con le sue voci nazionali e le aliquote DAI, ITBMS e ISC, applicando le note legali di capitolo e le RGI: il risultato è una voce tariffaria nazionale motivata, non un'ipotesi a sei cifre.",
        "Le classificazioni passano dalla revisione umana prima di qualsiasi dichiarazione, con un audit trail non modificabile di chi ha approvato quale codice. I dati strutturati e classificati possono poi precompilare il modulo di dichiarazione invece di essere ridigitati.",
      ],
      links: [
        { label: "Automazione doganale con classificazione HS", href: "/use-cases/customs-trade" },
        { label: "Aduanas y clasificación arancelaria (Panamá), in spagnolo", href: "/es/aduanas" },
        { label: "Cleaner: tipo di campo codice HS", href: "/docs/cleaners" },
      ],
    },
    faqs: [
      { q: "Qual è la differenza tra codice HS e codice tariffario?", a: "Il codice HS è il codice internazionale a sei cifre definito dall'Organizzazione mondiale delle dogane. Un codice tariffario è l'estensione nazionale di quel codice (otto, dieci o più cifre) a cui si legano i dazi e le imposte nazionali. L'Arancel Nacional di Panama, la TARIC dell'UE e l'HTS degli Stati Uniti sono tutte tariffe nazionali costruite sull'HS." },
      { q: "L'AI può classificare i codici HS con precisione?", a: "Può proporre buone classificazioni quando lavora su una buona descrizione del prodotto, sulla tariffa nazionale completa con le sue note legali, e quando spiega il suo ragionamento. Non deve presentare dichiarazioni senza supervisione: l'approccio responsabile è una proposta con confidenza e ragionamento, verificata da uno spedizioniere doganale abilitato per le righe a bassa confidenza o di alto valore." },
      { q: "Posso usare semplicemente il codice HS indicato dal fornitore in fattura?", a: "Consideralo un indizio, non una risposta. Il fornitore ha classificato secondo la tariffa del proprio paese, forse per i controlli all'esportazione e non per il dazio all'importazione, e magari su un'edizione HS precedente. La responsabilità del codice sulla dichiarazione di importazione è dell'importatore o dello spedizioniere doganale." },
    ],
  },
];

const it: GuidesContent = {
  hub: {
    title: "Guide — abbinamento agli ordini, righe di fattura, codici HS e automazione documentale",
    description:
      "Guide chiare sui problemi che stanno dietro all'automazione documentale: abbinare le fatture agli ordini di acquisto, estrarre le righe delle fatture, classificare i codici HS e altro ancora.",
    ogTitle: "Guide Tavnit",
    ogDescription:
      "Guide chiare su abbinamento agli ordini, estrazione delle righe, classificazione dei codici HS e il resto delle operazioni documentali.",
    breadcrumbHome: "Home",
    name: "Guide",
    h1: "Guide all'automazione documentale",
    intro:
      "I problemi che stanno dietro al prodotto, spiegati per quello che sono: cosa verifica l'abbinamento agli ordini, perché le tabelle delle fatture sono difficili da estrarre, come funziona davvero la classificazione doganale. Neutrali rispetto ai fornitori fino all'ultima sezione, dove diciamo cosa automatizza Tavnit.",
    minRead: "{m} min di lettura",
    read: "Leggi",
  },
  items,
};

export default it;
