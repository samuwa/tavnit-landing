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

/** /it/docs/flows — translated from src/app/docs/flows/page.tsx. */

/** Mirrors the visible numbered steps under "Costruisci lo schema". */
export const schema: DocsPageSchemaData = {
  howTo: {
    name: "Costruire un Flow di Tavnit che estrae dati strutturati da un documento",
    description:
      "Crea un Flow, definisci i suoi campi di metadati e di tabella, aggiungi suggerimenti di estrazione solo dove servono e provalo su un documento reale.",
    steps: [
      {
        name: "Crea il Flow e descrivilo",
        text: "Nella pagina Flows, fai clic su Crea Flow e scegli un modello, un suggerimento AI o un Flow vuoto. Dagli un nome e una descrizione dei documenti che gestisce — la descrizione aiuta anche l'AI a estrarre in modo più preciso.",
      },
      {
        name: "Aggiungi i campi di metadati",
        text: "Aggiungi un campo per ogni valore che compare una volta per documento, come numero fattura, data di emissione o fornitore, e impostane il tipo di dati.",
      },
      {
        name: "Aggiungi i campi di tabella",
        text: "Aggiungi un campo per ogni colonna della tabella di righe che si ripete, come descrizione, quantità, prezzo unitario e importo.",
      },
      {
        name: "Aggiungi suggerimenti di estrazione dove servono",
        text: "Aggiungi suggerimenti solo ai campi che ne hanno bisogno: valori di esempio reali, l'etichetta accanto a cui si trova un valore, l'area della pagina in cui compare o l'intestazione di colonna stampata.",
      },
      {
        name: "Prova su un documento reale",
        text: "Un nuovo Flow è già Attivo. Fai clic su Esegui, elabora un documento reale, confronta il risultato con l'originale e precisa i suggerimenti di ogni campo che è tornato sbagliato.",
      },
    ],
  },
  primaryImage: {
    url: "/assets/docs-flow-schema-2026-08.jpg",
    caption:
      "Lo schema dati di un Flow di Tavnit, con i campi di metadati e i campi di tabella definiti fianco a fianco.",
    width: 1327,
    height: 801,
  },
};

export default function FlowsIt() {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        Flows
      </h1>

      <DocCard icon={<Sparkles size={24} />} title="Cos'è un Flow">
        <Lead>
          Un Flow è la definizione di un tipo di documento: i campi che vuoi estrarre, i suggerimenti
          che dicono all&apos;AI dove trovarli e tutto ciò che vi è collegato a valle. È
          l&apos;oggetto di Tavnit che trasforma un documento in dati — Collections, Subjects,
          Splitters e Cleaners esistono tutti per alimentare o rifinire ciò che un Flow produce.
        </Lead>
        <p>
          Non c&apos;è un modello da disegnare né coordinate da mappare. Descrivi i campi a parole e
          il Flow funziona su layout diversi, quindi un solo Flow <em>Fatture fornitori</em> può
          gestire venti fornitori le cui fatture non si somigliano affatto. È anche per questo che lo
          schema e i suoi suggerimenti sono il punto in cui si vince o si perde quasi tutta la qualità
          dell&apos;estrazione.
        </p>
        <Screenshot
          src="/assets/docs-flow-schema-2026-08.jpg"
          alt="Lo schema dati di un Flow di Tavnit chiamato Invoice Processor. Un pannello Campi di metadati elenca nove campi a valore singolo, come Invoice Number, Due Date e Total, con i loro tipi di dati, accanto a un pannello Campi di tabella con Description, Quantity, Price e Amount. La barra a sinistra raggruppa Run recenti, Trigger email, Collections, Cleaner, Agent, Modelli di modulo, Output email, Webhook, Esportazione nel Bucket, Revisione umana e ID del Flow."
          caption="Lo schema dati di un Flow. I campi di metadati a sinistra, i campi di tabella che si ripetono a destra e tutto ciò che si può collegare al Flow nella barra laterale."
        />
        <InfoBox color="blue" icon={<Info size={20} />} title="Serve solo lo schema">
          Un Flow ha bisogno di almeno un campo. Tutto il resto nella barra laterale — Cleaner, Agent,
          webhook, email, esportazione nel Bucket, revisione — è facoltativo e si può aggiungere in
          seguito senza ricostruire nulla. Owner e Admin possono creare e modificare i Flow.
        </InfoBox>
      </DocCard>

      <DocCard icon={<FilePlus size={24} />} title="Crea un Flow">
        <Lead>
          Fai clic su <strong>Crea Flow</strong> nella pagina Flows e Tavnit ti chiede{" "}
          <em>“Come vuoi iniziare?”</em>. Tutte e tre le strade portano allo stesso Flow modificabile,
          quindi scegli quella che ti porta più in fretta a una buona prima bozza.
        </Lead>
        <DataTable
          head={["Opzione", "Cosa fa", "Ideale quando"]}
          rows={[
            [
              "Da un modello",
              <Fragment key="c0">
                Apre una galleria con due schede. I <strong>Modelli Tavnit</strong> sono Flow pronti,
                con campi e suggerimenti già compilati; <strong>I miei Flow</strong> ti permette di
                usare <strong>Crea copia</strong> su uno dei tuoi Flow attivi.
              </Fragment>,
              "Il tuo documento è di un tipo comune o simile a un Flow che hai già.",
            ],
            [
              "Suggerimento AI",
              "Carica un PDF o un'immagine di esempio. L'AI lo legge, rileva i campi e propone un nome, una descrizione e uno schema con suggerimenti. Deseleziona ciò che non ti serve e modifica qualsiasi campo prima di creare il Flow.",
              "Il tuo documento è specifico della tua attività e vuoi partire avvantaggiato.",
            ],
            [
              "Parti da zero",
              "Uno schema vuoto. Definisci tu ogni campo.",
              "Sai esattamente cosa ti serve o stai ricostruendo un processo esistente.",
            ],
          ]}
        />
        <p>
          I modelli Tavnit coprono fatture, ordini d&apos;acquisto, scontrini, estratti conto bancari,
          documenti di trasporto, referti di laboratorio, contratti, preventivi, note di credito,
          documenti d&apos;identità e curriculum. Se hai risposto alle domande di benvenuto quando hai
          configurato la tua organizzazione, i modelli adatti ai tuoi documenti vengono mostrati per
          primi e la pagina Flows vuota ti propone di crearli tutti con un clic tramite{" "}
          <strong>Crea questi Flow</strong>.
        </p>
        <p>
          Ogni strada si conclude con un nome (almeno 3 caratteri) e una descrizione (almeno 10
          caratteri). Il Flow si apre nell&apos;editor con una breve guida{" "}
          <em>“Configura il tuo Flow”</em> ed è <strong>Attivo</strong> fin dall&apos;inizio — usa
          l&apos;interruttore nella barra superiore per disattivarlo. Un Flow inattivo non si può
          eseguire.
        </p>
        <InfoBox color="green" icon={<Info size={20} />} title="Il Suggerimento AI non crea un Run">
          Creare la bozza di un Flow da un documento di esempio non crea un Run. Considera la bozza un
          punto di partenza — elimina ciò che non userai, perché ogni campo in più è altro da
          controllare e altro che può andare storto.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Table2 size={24} />} title="Campi di metadati e campi di tabella">
        <Lead>
          Ogni campo è di uno di due tipi, a seconda che il valore compaia una volta per documento o
          una volta per riga. È la scelta con più conseguenze dello schema: determina la forma del
          payload del tuo webhook, delle righe del tuo Bucket, del tuo CSV e della tua schermata di
          revisione.
        </Lead>
        <DataTable
          head={["", "Campo di metadati", "Campo di tabella"]}
          rows={[
            ["Compare", "Una volta per documento", "Una volta per riga di una tabella che si ripete"],
            [
              "In una fattura",
              "Numero fattura, data di emissione, fornitore, totale",
              "Descrizione, quantità, prezzo unitario, importo",
            ],
            [
              "Nell'output",
              <Fragment key="f0">
                L&apos;oggetto <InlineCode>metadata</InlineCode>
              </Fragment>,
              <Fragment key="f1">
                Una voce per riga in <InlineCode>rows</InlineCode>
              </Fragment>,
            ],
            [
              "In un Bucket",
              "Ripetuto su ogni riga esportata da quel documento",
              "Una riga del Bucket ciascuno",
            ],
          ]}
        />
        <InfoBox color="violet" icon={<Info size={20} />} title="Sbagliare il tipo è l'errore classico">
          Definire una colonna delle righe come campo di metadati ti dà un solo valore da una tabella
          di venti. Definire il totale di una fattura come campo di tabella ripete lo stesso numero su
          ogni riga. Se hai dubbi, chiediti se una seconda copia del valore potrebbe mai comparire
          nello stesso documento.
        </InfoBox>
        <p>
          Un Flow con <strong>soli campi di metadati</strong> — un documento d&apos;identità, un
          certificato, un modulo di una pagina — restituisce una sola riga per documento con quei
          valori, quindi il risultato arriva comunque nella tua vista tabellare, nel Bucket, nel
          webhook e nell&apos;email come qualsiasi altro Run.
        </p>
        <p>
          Un Flow può anche aggiungere delle <strong>Colonne di sistema</strong> a ogni riga che
          produce — l&apos;ID del Flow, il nome del Flow e l&apos;ID del Run. Attivale quando più Flow
          scrivono in un unico <DocLink href="/docs/buckets">Bucket</DocLink> e devi sapere da quale
          documento proviene una riga.
        </p>
      </DocCard>

      <DocCard icon={<Type size={24} />} title="Tipi di dati">
        <Lead>
          Ogni campo ha un tipo. I tipi non sono un dettaglio estetico: decidono se un valore si
          ordina, si somma, si confronta in una regola del Cleaner e finisce correttamente in un
          grafico. Impostarli bene già nel Flow fa risparmiare lavoro in ogni fase successiva.
        </Lead>
        <DataTable
          head={["Tipo", "Da usare per", "Note"]}
          rows={[
            ["Testo", "Nomi, indirizzi, descrizioni, codici di riferimento", "La scelta predefinita sicura."],
            [
              "Numero",
              "Totali, quantità, prezzi, tariffe",
              "Necessario se in seguito vuoi sommare, confrontare o rappresentare il valore in un grafico.",
            ],
            [
              "Data",
              "Date di emissione, di scadenza, di consegna",
              <Fragment key="f2">
                Riformattare in un formato di output coerente è compito di un{" "}
                <DocLink href="/docs/cleaners">Cleaner</DocLink>, non dell&apos;estrazione.
              </Fragment>,
            ],
            [
              "Misto/Alfanumerico",
              "Valori che mescolano lettere e cifre — codici articolo, codici container, partite IVA",
              "Usalo al posto di Numero quando zeri iniziali o lettere devono restare intatti.",
            ],
            [
              "Immagine",
              "Figure stampate nel documento: foto, loghi, firme, timbri",
              "Estratte e archiviate in modo sicuro, poi consegnate come link a tempo limitato.",
            ],
          ]}
        />
        <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Estrai come è stampato, normalizza dopo">
          Non usare il tipo per riformattare. Prendi il valore così come lo mostra il documento, poi
          lascia che un Cleaner converta le valute, riscriva le date e corregga i separatori
          decimali. Un&apos;estrazione che trasforma anche i dati è più difficile da analizzare quando
          un numero torna sbagliato.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Crosshair size={24} />} title="Suggerimenti di estrazione">
        <Lead>
          I suggerimenti sono il modo per togliere ambiguità a un campo senza scrivere un modello.
          Contano soprattutto quando un documento contiene più valori simili — tre date, due totali,
          un numero d&apos;ordine e un numero di fattura nello stesso blocco di intestazione.
        </Lead>
        <p>
          <strong>Per un campo di metadati</strong> puoi combinare uno qualsiasi di questi:
        </p>
        <DataTable
          head={["Suggerimento", "Cosa dice all'AI", "Utile per"]}
          rows={[
            [
              "Valori di esempio",
              "Valori reali copiati dai tuoi documenti.",
              "Quasi tutto. È il suggerimento più prezioso — mostra formato, lunghezza e forma in un colpo solo.",
            ],
            [
              "Accanto a un'etichetta",
              <Fragment key="f3">
                L&apos;etichetta stampata accanto a cui si trova il valore. Elenca le varianti:{" "}
                <em>Numero fattura, Fattura n., N. fatt.</em>.
              </Fragment>,
              "Campi di intestazione che i diversi fornitori etichettano in modo diverso.",
            ],
            [
              "In un'area specifica della pagina",
              "Una di nove zone — da in alto a sinistra a in basso a destra.",
              "Valori che stanno sempre nello stesso angolo, come un numero di documento in alto a destra.",
            ],
            [
              "Intervallo previsto",
              "Un minimo, un massimo o entrambi. Trattato come indicazione, non come regola rigida.",
              "Individuare un errore di lettura del separatore decimale — un totale di 27.030 dove si intendeva 270,30.",
            ],
            [
              "Suggerimenti aggiuntivi",
              "Testo libero per tutto ciò che le opzioni precedenti non coprono.",
              "Regole come “usa l'importo netto, mai quello lordo”.",
            ],
          ]}
        />
        <p>
          <strong>Per un campo di tabella</strong> i suggerimenti sono diversi, perché l&apos;AI sta
          individuando una colonna e non un punto della pagina:
        </p>
        <DataTable
          head={["Suggerimento", "Cosa dice all'AI"]}
          rows={[
            [
              "Tipo di origine",
              "Tabella per i dati in una vera tabella con colonne; Testo libero per valori simili a righe in un testo non strutturato, come un contratto.",
            ],
            [
              "Intestazioni di colonna",
              "Il testo dell'intestazione così come è stampato. Elenca ogni variante usata dai tuoi fornitori, così un solo campo le riconosce tutte.",
            ],
            ["Intervallo previsto", "Un intervallo di plausibilità per i numeri di quella colonna."],
            ["Valori di esempio", "Valori reali delle celle presi dai tuoi documenti."],
            [
              "Informazioni aggiuntive",
              "Cosa rappresenta davvero la colonna, quando l'intestazione da sola è ambigua — “prezzo unitario prima dello sconto”.",
            ],
          ]}
        />
        <InfoBox color="green" icon={<Info size={20} />} title="Inizia senza suggerimenti">
          Aggiungi i campi, esegui un documento reale e aggiungi suggerimenti solo dove il risultato
          era sbagliato. Mettere suggerimenti ovunque fin dall&apos;inizio fa perdere tempo su campi
          che non sono mai stati ambigui, e un suggerimento troppo specifico può peggiorare
          l&apos;estrazione escludendo un layout che non avevi previsto. Quando il Flow ha qualche
          Run, <strong>Diagnostica</strong> può proporti dei suggerimenti.
        </InfoBox>
        <p>
          I valori di esempio non si usano per i campi <strong>Data</strong> e{" "}
          <strong>Immagine</strong>, quindi metti eventuali indicazioni sulle date nella casella dei
          suggerimenti aggiuntivi.
        </p>
      </DocCard>

      <DocCard icon={<Puzzle size={24} />} title="Campi compositi">
        <Lead>
          Alcune colonne di tabella contengono più valori in una sola cella — una suddivisione per
          taglia e quantità come <em>S:2 M:5 L:3</em> stampata in un unico riquadro. Un campo
          composito divide quella cella in sottocampi, così ogni parte diventa un valore a sé invece
          di una stringa da analizzare in seguito.
        </Lead>
        <NumberedList
          items={[
            "Aggiungi un campo di tabella e attiva Campo composito.",
            <Fragment key="f4">
              Definisci i sottocampi che compongono la cella — per esempio{" "}
              <InlineCode>size</InlineCode> come testo e <InlineCode>quantity</InlineCode> come
              numero.
            </Fragment>,
            "Aggiungi valori di esempio che mostrano come appare il raggruppamento nei tuoi documenti.",
          ]}
        />
        <p>
          I sottocampi contengono valori singoli, quindi possono essere Testo, Numero, Data o
          Misto/Alfanumerico — ma non Immagine. I campi compositi sono disponibili solo per i campi di
          tabella, perché il loro scopo è proprio scomporre una cella che si ripete.
        </p>
        <InfoBox color="blue" icon={<Boxes size={20} />} title="Campi di metadati multivalore">
          L&apos;equivalente per i metadati è <strong>Accetta più valori</strong>. Attivalo quando un
          singolo documento può legittimamente contenere più elementi dello stesso tipo — una serie di
          numeri di scontrino, diversi riferimenti a ordini d&apos;acquisto — e il campo restituisce un
          elenco invece di un solo valore. Non è disponibile per i campi Immagine.
        </InfoBox>
      </DocCard>

      <DocCard icon={<ImageIcon size={24} />} title="Estrarre immagini">
        <Lead>
          Un campo Immagine estrae dal documento una figura invece di un testo: la foto di un
          prodotto, una firma, un timbro, un logo. Un campo immagine di metadati contiene
          un&apos;immagine per documento; un campo immagine di tabella assegna a ogni riga
          l&apos;immagine che le appartiene.
        </Lead>
        <BulletList
          items={[
            "Le immagini sono archiviate in modo privato, quindi arrivano a valle come link a tempo limitato e non come byte grezzi",
            "Lo stesso tipo di link compare nel payload del webhook, nell'output email e nella cella del CSV; un'esportazione dalla pagina del Run genera link nuovi",
            "I link nelle consegne restano validi per sette giorni — scarica l'immagine invece di salvare il link",
            "I campi Immagine non possono essere compositi né accettare più valori, e i suggerimenti con valori di esempio non si applicano a loro",
          ]}
        />
      </DocCard>

      <DocCard icon={<FilePlus size={24} />} title="Costruisci lo schema">
        <Lead>
          Crea prima i campi di metadati, poi i campi di tabella, poi i suggerimenti. Prova presto su
          un documento reale — uno schema che sembra giusto sulla carta e uno schema che regge i tuoi
          documenti veri sono due cose diverse.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f5">
              Fai clic su <strong>Crea Flow</strong> e scegli un modello, un suggerimento AI o un Flow
              vuoto. Dagli un nome che descriva il documento (<em>Fatture fornitori</em>) e una
              descrizione vera — migliora la precisione dell&apos;estrazione ed è ciò su cui una{" "}
              <DocLink href="/docs/collections">Collection</DocLink> fa il confronto in seguito.
            </Fragment>,
            <Fragment key="f6">
              In <strong>Campi di metadati</strong>, fai clic su <strong>Aggiungi campo</strong> per
              ogni valore che compare una volta per documento, impostando il tipo di dati man mano.
            </Fragment>,
            <Fragment key="f7">
              In <strong>Campi di tabella</strong>, aggiungi un campo per ogni colonna della tabella
              di righe che si ripete.
            </Fragment>,
            <Fragment key="f8">
              Aggiungi <strong>suggerimenti di estrazione</strong> solo ai campi che ne hanno bisogno.
            </Fragment>,
            <Fragment key="f9">
              Il Flow è già <strong>Attivo</strong>. Fai clic su <strong>Esegui</strong>, elabora un
              documento reale e confronta il risultato con l&apos;originale.
            </Fragment>,
          ]}
        />
        <p>Trascina i campi dalla loro maniglia per riordinarli.</p>
        <WarningBox>
          Rinominare un campo cambia la chiave in ogni consumatore a valle: il payload del webhook, la
          mappatura delle colonne del Bucket, l&apos;intestazione del CSV e qualsiasi{" "}
          <DocLink href="/docs/cleaners">Cleaner</DocLink> che lo legge. Controlla cosa è collegato
          prima di rinominare un campo in un Flow già in uso.
        </WarningBox>
      </DocCard>

      <DocCard icon={<FileInput size={24} />} title="Quali file legge un Flow">
        <Lead>
          Un Flow accetta PDF, immagini e fogli di calcolo, da ogni via — caricamento, email e API.
          Tavnit decide come leggere ogni file, quindi non devi configurare nulla per formato.
        </Lead>
        <DataTable
          head={["File", "Formati", "Come viene letto"]}
          rows={[
            [
              "PDF",
              "PDF",
              "I PDF digitali vengono letti direttamente. I PDF scansionati vengono rilevati automaticamente e letti prima con l'OCR.",
            ],
            [
              "Immagine",
              "PNG, JPG, JPEG, JFIF",
              "Letta come una pagina scansionata. JFIF è la variante di JPEG che alcuni browser su Windows salvano per impostazione predefinita, e funziona come qualsiasi JPEG.",
            ],
            [
              "Foglio di calcolo",
              "XLSX, XLS, CSV",
              "Viene letto il primo foglio visibile. Gli altri fogli e quelli nascosti vengono ignorati, quindi metti i dati che ti servono nel primo foglio.",
            ],
          ]}
        />
        <p>
          I fogli molto grandi vengono rifiutati con un errore chiaro. Per elaborare ogni foglio di una
          cartella di lavoro come documento a sé, inviala invece a uno{" "}
          <DocLink href="/docs/splitters">Splitter</DocLink>.
        </p>
        <InfoBox color="blue" icon={<Info size={20} />} title="Scansione scadente: forza l'OCR per i file che si estraggono male">
          I documenti scansionati ricevono già l&apos;OCR in automatico. Alcuni file sembrano digitali
          ma hanno un livello di testo difettoso — una scansione con una trascrizione incorporata
          scadente, un PDF esportato da uno strumento insolito. Per questi, apri{" "}
          <strong>Scansione scadente</strong> nelle impostazioni del Flow e attivala: ogni file del
          Flow viene quindi letto prima con l&apos;OCR e l&apos;estrazione lavora sul testo
          recuperato. Se l&apos;OCR non è disponibile o non riesce, il Run torna automaticamente alla
          pipeline standard.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Braces size={24} />} title="Cosa puoi collegare a un Flow">
        <Lead>
          Lo schema decide cosa esce; il resto del Flow decide cosa ne succede. Ogni elemento qui sotto
          è indipendente — collega solo ciò che ti serve, in qualsiasi ordine e in qualsiasi momento.
        </Lead>
        <DataTable
          head={["Fase", "Collegamento", "Cosa fa"]}
          rows={[
            [
              "Input",
              <Fragment key="f10">
                <DocLink href="/docs/email-integration">Trigger email</DocLink>
              </Fragment>,
              "Dà al Flow un proprio indirizzo email, così i documenti inoltrati (PDF, immagine o foglio di calcolo) vengono elaborati automaticamente.",
            ],
            [
              "Input",
              <Fragment key="f11">
                <DocLink href="/docs/collections">Collections</DocLink>
              </Fragment>,
              "Elenca le Collections che possono indirizzare documenti a questo Flow.",
            ],
            [
              "Elaborazione",
              <Fragment key="f12">
                <DocLink href="/docs/cleaners">Cleaner</DocLink>
              </Fragment>,
              "Passa in rassegna le righe di ogni Run: riformatta, converte, calcola, cerca e attiva regole.",
            ],
            [
              "Elaborazione",
              <Fragment key="f13">
                <DocLink href="/docs/agents">Agent</DocLink>
              </Fragment>,
              "Si avvia dopo l'estrazione, usando i campi estratti come input.",
            ],
            [
              "Elaborazione",
              "Modelli di modulo",
              "Compila un modello PDF con i valori estratti di un Run.",
            ],
            [
              "Output",
              <Fragment key="f14">
                <DocLink href="/docs/email-integration">Output email</DocLink>
              </Fragment>,
              "Invia i risultati via email a uno o più indirizzi dopo ogni Run riuscito, con allegati facoltativi: JSON, CSV, moduli compilati e documento originale.",
            ],
            [
              "Output",
              <Fragment key="f15">
                <DocLink href="/docs/webhooks">Webhook</DocLink>
              </Fragment>,
              "Invia i risultati con una POST al tuo endpoint. Solo HTTPS.",
            ],
            [
              "Output",
              <Fragment key="f16">
                <DocLink href="/docs/buckets">Esportazione nel Bucket</DocLink>
              </Fragment>,
              "Aggiunge le righe di ogni Run a una tabella strutturata, con i campi mappati sulle colonne.",
            ],
            [
              "Impostazioni",
              <Fragment key="f17">
                <DocLink href="/docs/human-in-the-loop">Revisione umana</DocLink>
              </Fragment>,
              "Mette in pausa i Run per un revisore prima che venga consegnato qualsiasi cosa.",
            ],
            ["Impostazioni", "Scansione scadente", "Forza l'OCR per ogni file del Flow (vedi sopra)."],
            [
              "Impostazioni",
              "ID del Flow",
              <Fragment key="f18">
                L&apos;identificativo da passare quando chiami l&apos;
                <DocLink href="/docs/api-integration">API</DocLink>.
              </Fragment>,
            ],
          ]}
        />
        <p>
          <strong>Opzioni del Trigger email.</strong> Una volta attivato il trigger, il pannello
          mostra l&apos;indirizzo email del Flow e due impostazioni. <strong>Mittenti consentiti</strong>{" "}
          limita chi può avviare un Run via email; lascialo vuoto per accettare qualsiasi mittente.{" "}
          <strong>Elabora il corpo dell&apos;email</strong> estrae anche dal testo del messaggio,{" "}
          <em>Solo quando non ci sono allegati</em> (l&apos;impostazione predefinita, così un
          messaggio di accompagnamento non avvia mai un secondo Run) oppure <em>Sempre</em>.
          L&apos;indirizzo del mittente viene registrato su ogni Run e mostrato nella pagina Runs.{" "}
          <DocLink href="/docs/email-integration">Integrazione email</DocLink> spiega i dettagli.
        </p>
      </DocCard>

      <DocCard icon={<HeartPulse size={24} />} title="Diagnosticare un Flow">
        <Lead>
          Quando un Flow ha elaborato qualche documento, il pulsante <strong>Diagnostica</strong>{" "}
          nella barra superiore del Flow apre il <strong>Dottore del Flow</strong>. Studia i tuoi Run
          completati più recenti, trova i campi che continuano a tornare vuoti o con il tipo
          sbagliato e propone correzioni.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="d0">
              Apri il Flow e fai clic su <strong>Diagnostica</strong>. Il pulsante compare quando il
              Flow ha almeno un campo, per Owner e Admin.
            </Fragment>,
            "Tavnit legge i Run recenti, rilegge alcuni dei documenti in cui i campi non sono riusciti e prepara le correzioni. Ci vuole un momento.",
            <Fragment key="d1">
              Esamina il risultato. Ogni campo problematico mostra quanto spesso era vuoto o aveva il
              tipo sbagliato, con il suggerimento <strong>Attuale</strong> accanto a quello{" "}
              <strong>Proposto</strong>. Può anche offrire una{" "}
              <strong>Descrizione suggerita</strong>.
            </Fragment>,
            <Fragment key="d2">
              Mantieni o modifica le correzioni con cui sei d&apos;accordo e fai clic su{" "}
              <strong>Applica</strong>. Non cambia nulla finché non applichi; chiudere il pannello
              scarta le proposte.
            </Fragment>,
          ]}
        />
        <p>
          Se tutto è a posto vedrai <em>“L&apos;estrazione sembra in buona salute”</em>. Diagnostica
          si avvia solo quando fai clic. Dopo aver applicato le correzioni, esegui di nuovo un
          documento reale per confermare che abbiano aiutato.
        </p>
      </DocCard>

      <div id="runs" className="scroll-mt-24">
        <DocCard icon={<Play size={24} />} title="Runs: cosa succede quando un documento viene elaborato">
          <Lead>
            Ogni documento diventa un Run e ogni Run attraversa la stessa sequenza. Conoscere
            l&apos;ordine ti dice dove guardare quando qualcosa arriva in ritardo, arriva sbagliato o
            non arriva affatto.
          </Lead>
          <NumberedList
            items={[
              "Il documento viene archiviato e il Run viene messo in coda.",
              "L'estrazione lo legge e produce valori di metadati e righe di tabella.",
              "Se è collegato un Cleaner, passa in rassegna quelle righe — conversioni, colonne calcolate, ricerche.",
              "Scattano le regole condizionali: le righe possono essere scartate, possono partire notifiche, può essere richiesta una revisione.",
              "Se serve una revisione, il Run si mette in pausa e non viene consegnato nulla finché un revisore non approva.",
              "Partono gli output: email, esportazione nel Bucket e webhook. Il Run viene quindi segnato come completato e, se c'è un Agent collegato, questo si avvia.",
            ]}
          />
          <DataTable
            head={["Stato del Run", "Significato"]}
            rows={[
              ["In sospeso (in coda)", "Archiviato e in attesa di un worker."],
              ["In elaborazione", "In fase di estrazione, pulizia o consegna. La pagina del Run mostra la fase corrente."],
              [
                "Nuovo tentativo",
                "Un tentativo precedente non è riuscito per un motivo temporaneo e il Run è stato rimesso in coda automaticamente (vedi sotto).",
              ],
              [
                "In attesa di revisione HITL",
                <Fragment key="f19">
                  In pausa per la <DocLink href="/docs/human-in-the-loop">revisione umana</DocLink>.
                  Non è stato ancora consegnato nulla.
                </Fragment>,
              ],
              ["Completato", "L'estrazione è terminata e ogni output configurato è stato eseguito."],
              [
                "Annullato",
                "Qualcuno ha annullato il Run mentre era in coda o in elaborazione, oppure un revisore lo ha rifiutato. Non viene consegnato nient'altro.",
              ],
              ["Non riuscito", "Non è stato possibile elaborare il documento. Il log del Run spiega perché."],
            ]}
          />
        </DocCard>
      </div>

      <DocCard icon={<History size={24} />} title="Lavorare con i Run">
        <Lead>
          La pagina <strong>Runs</strong> elenca ogni Run della tua organizzazione; ogni Flow ha anche
          la sua scheda <strong>Run recenti</strong>. Usa <strong>Filtra</strong> per restringere per
          stato, intervallo di date, Flow, utente, origine o un ID di Run incollato.
        </Lead>
        <DataTable
          head={["Azione", "Dove", "Note"]}
          rows={[
            [
              "Vedi dettagli",
              "Menu delle azioni del Run, oppure fai clic sulla riga",
              "I dati estratti accanto al file di origine, le informazioni del Run e il log di elaborazione.",
            ],
            [
              "Scarica CSV",
              "Menu delle azioni del Run",
              "Solo per i Run completati. Esporta CSV ed Esporta JSON si trovano anche nella pagina del Run.",
            ],
            [
              "Scarica file",
              "Menu delle azioni del Run, oppure Scarica nella pagina del Run",
              "Il file di origine. I fogli di calcolo non si possono visualizzare in anteprima, quindi scaricali per vederli.",
            ],
            [
              "Annulla Run",
              "Menu delle azioni del Run",
              "Solo per i Run ancora in coda o in esecuzione.",
            ],
          ]}
        />
        <p>
          La colonna <strong>Avviata da</strong> mostra chi ha avviato il Run — l&apos;utente per un
          caricamento, o l&apos;indirizzo del mittente per un Run arrivato via email. La colonna{" "}
          <strong>Origine</strong> dice come è arrivato: caricamento manuale, API, email e così via.
        </p>
      </DocCard>

      <DocCard icon={<RotateCcw size={24} />} title="Run non riusciti e nuovi tentativi automatici">
        <Lead>
          La maggior parte degli errori dipende dal documento — un file illeggibile o un tipo non
          supportato — e riprovare non servirebbe. Alcuni no: un worker di elaborazione si riavvia a
          metà Run, oppure un fornitore di AI ha un&apos;interruzione temporanea. Per questi casi,
          un&apos;organizzazione può far riprovare Tavnit da solo.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="r0">
              Vai in <strong>Impostazioni</strong> → <strong>Organizzazione</strong> →{" "}
              <strong>Run non riuscite</strong>. Solo l&apos;Owner vede questa scheda.
            </Fragment>,
            <Fragment key="r1">
              Attiva <strong>Riprova automaticamente le Run non riuscite</strong>.
            </Fragment>,
            <Fragment key="r2">
              Imposta <strong>Numero massimo di tentativi per Run</strong> su 1, 2 o 3.
            </Fragment>,
          ]}
        />
        <BulletList
          items={[
            "Un Run ritentato mantiene lo stesso ID di Run, quindi il polling via API, i webhook e i link continuano a funzionare.",
            "Gli output partono solo quando un Run viene completato, quindi un nuovo tentativo non consegna mai due volte un documento.",
            "Mai ritentati: file non validi, tipi non supportati, Run annullati, Run in pausa per revisione e Run creati più di un giorno prima.",
            "Un Run perso per il riavvio di un worker viene rilevato automaticamente. Con i nuovi tentativi automatici attivi viene rimesso in coda; con l'opzione disattivata viene segnato come Non riuscito.",
            "La pagina del Run elenca i Tentativi precedenti, ciascuno segnato come Worker perso o Non riuscito con il suo errore, e l'elenco dei Run mostra un badge di nuovo tentativo.",
          ]}
        />
        <p>
          Per essere avvisato dei Run che finiscono con un errore, aggiungi degli indirizzi in{" "}
          <strong>Notifiche di Run non riuscite</strong> nella stessa scheda.
        </p>
      </DocCard>

      <DocCard icon={<LifeBuoy size={24} />} title="Migliorare la qualità dell'estrazione">
        <Lead>
          Quando un campo torna sbagliato, la soluzione sta quasi sempre nella definizione di quel
          campo e non nel documento. Parti da <strong>Diagnostica</strong> se il Flow ha dei Run, poi
          procedi con questi punti — i primi due risolvono la maggior parte dei casi.
        </Lead>
        <DataTable
          head={["Sintomo", "Causa probabile", "Soluzione"]}
          rows={[
            [
              "Il valore sbagliato tra diversi valori simili",
              "Niente li distingue.",
              "Aggiungi l'etichetta accanto a cui si trova il valore o l'area della pagina in cui compare.",
            ],
            [
              "Un campo torna vuoto",
              "Il solo nome del campo non bastava a identificarlo.",
              "Aggiungi due o tre valori di esempio reali — di solito basta questo.",
            ],
            [
              "Una sola riga, quando ce ne sono molte",
              "È stato definito come campo di metadati.",
              "Ridefiniscilo come campo di tabella.",
            ],
            [
              "Lo stesso valore ripetuto su ogni riga",
              "Un valore a livello di documento è stato definito come campo di tabella.",
              "Ridefiniscilo come campo di metadati.",
            ],
            [
              "Numeri sbagliati di un fattore cento",
              "Separatori decimali e delle migliaia letti al contrario.",
              "Imposta un intervallo previsto e normalizza il formato in un Cleaner.",
            ],
            [
              "Zeri iniziali o lettere persi",
              "Il campo è tipizzato come Numero.",
              "Cambialo in Misto/Alfanumerico.",
            ],
            [
              "Colonne confuse tra loro",
              "Due colonne hanno intestazioni simili.",
              "Aggiungi le intestazioni di colonna stampate e descrivi la colonna in Informazioni aggiuntive.",
            ],
            [
              "Buono con alcuni fornitori, scarso con altri",
              "I suggerimenti descrivono il layout di un solo fornitore.",
              "Aggiungi allo stesso campo le varianti di etichette e intestazioni degli altri fornitori.",
            ],
            [
              "Testo illeggibile da un file che sembra digitale",
              "Il livello di testo incorporato nel PDF è difettoso.",
              "Attiva Scansione scadente, così il Flow lo legge con l'OCR.",
            ],
            [
              "Un foglio di calcolo torna vuoto o incompleto",
              "I dati non sono nel primo foglio visibile.",
              "Spostali nel primo foglio, oppure usa uno Splitter per le cartelle di lavoro con più fogli.",
            ],
          ]}
        />
        <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Cambia una cosa alla volta">
          Esegui di nuovo lo stesso documento dopo ogni modifica. Se modifichi quattro suggerimenti
          insieme e poi riesegui, scopri che il risultato è migliorato ma non quale modifica lo ha
          migliorato — e una delle quattro potrebbe aver peggiorato le cose.
        </InfoBox>
        <InfoBox color="blue" icon={<Wand2 size={20} />} title="Correggi i dati, non l'estrazione">
          Se il valore è giusto ma il formato no — date, valute, unità, maiuscole — lascia stare il
          Flow e aggiungi un <DocLink href="/docs/cleaners">Cleaner</DocLink>.
        </InfoBox>
      </DocCard>

      <Related
        links={[
          {
            href: "/docs/cleaners",
            label: "Normalizza e arricchisci ciò che un Flow estrae",
            description:
              "Riformatta le date, converti le valute, calcola i totali e segnala le righe che violano una regola.",
          },
          {
            href: "/docs/email-integration",
            label: "Invia documenti a un Flow via email",
            description:
              "L'indirizzo email, i mittenti consentiti, l'elaborazione del corpo dell'email e l'output email.",
          },
          {
            href: "/docs/collections",
            label: "Indirizza automaticamente i documenti al Flow giusto",
            description:
              "Perché il nome e la descrizione di un Flow contano anche oltre la precisione dell'estrazione.",
          },
          {
            href: "/docs/api-integration",
            label: "Avvia un Flow dal tuo codice",
            description:
              "L'ID del Flow, l'autenticazione con chiave API ed esempi in Python e JavaScript.",
          },
          {
            href: "/docs/webhooks",
            label: "Guarda il payload che produce un Flow",
            description:
              "Come compaiono i campi di metadati e i campi di tabella nel JSON che riceve il tuo endpoint.",
          },
        ]}
      />
    </section>
  );
}
