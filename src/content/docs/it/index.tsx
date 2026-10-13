import { Fragment } from "react";
import {
  Clock,
  Compass,
  FilePlus,
  FlaskConical,
  Info,
  Map,
  Rocket,
  Sparkles,
  Table2,
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
} from "@/components/docs/ui";
import type { DocsPageSchemaData } from "../types";

/** /it/docs — translated from src/app/docs/page.tsx. */

/** Mirrors the visible numbered steps under "Passo 1: crea un Flow". */
export const schema: DocsPageSchemaData = {
  howTo: {
    name: "Estrarre dati strutturati da un documento con Tavnit",
    description:
      "Crea un Flow di Tavnit da un modello, da un documento di esempio o da zero, controlla i suoi campi, elabora un documento e leggi il risultato strutturato — senza disegnare modelli e senza codice.",
    steps: [
      {
        name: "Apri la finestra di creazione",
        text: "Nella pagina Flows, fai clic su Crea Flow.",
      },
      {
        name: "Scegli un punto di partenza",
        text: "Scegli Da un modello (un modello di Tavnit o una copia di uno dei tuoi Flow), Suggerimento AI (carica un PDF o un'immagine di esempio e l'AI propone i campi) oppure Parti da zero.",
      },
      {
        name: "Dai un nome al Flow e descrivilo",
        text: "Dai al Flow un nome di almeno 3 caratteri e una descrizione di almeno 10 che dica quali documenti gestisce.",
      },
      {
        name: "Controlla lo schema dati",
        text: "Nell'editor, aggiungi, modifica o elimina campi finché lo schema non è esattamente quello che ti serve. Un nuovo Flow è già Attivo.",
      },
      {
        name: "Elabora un documento",
        text: "Fai clic su Esegui, carica un documento reale e controlla il risultato.",
      },
    ],
  },
  primaryImage: {
    url: "/assets/tour2-runs.jpg",
    caption:
      "La pagina Runs di Tavnit, con ogni documento elaborato, il suo Flow, la sua origine e il suo stato.",
    width: 1327,
    height: 801,
  },
};

export default function GettingStartedIt() {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        Primi passi
      </h1>

      <DocCard icon={<Sparkles size={24} />} title="Cosa fa Tavnit">
        <Lead>
          Tavnit legge i documenti e ti restituisce dati strutturati. Descrivi una volta i campi che
          ti servono, gli invii fatture, scontrini, ordini d&apos;acquisto, estratti conto, fogli di
          calcolo o moduli e ottieni righe tipizzate — senza costruire un modello per ogni layout né
          scrivere codice di parsing.
        </Lead>
        <p>
          L&apos;estrazione è il punto di partenza, non l&apos;intero prodotto. Intorno a essa,
          Tavnit può smistare e dividere i file in arrivo, pulire e arricchire le righe, confrontare e
          verificare i documenti tra loro, compilare moduli, fermarsi perché una persona controlli,
          salvare i risultati in tabelle, consegnarli ai tuoi sistemi e passarli a un agente browser
          che agisce su di essi. Questa pagina ti dà la mappa e ti accompagna nel tuo primo documento.
        </p>
        <InfoBox color="violet" icon={<FlaskConical size={20} />} title="Alcune aree sono in Beta">
          Pipelines, Subjects, Matchers, Inspectors, Fillers, Signals e Nets portano l&apos;etichetta{" "}
          <strong>Beta</strong> nell&apos;app. Puoi usarle già oggi, ma le loro schermate e opzioni
          possono ancora cambiare.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Compass size={24} />} title="Una mappa di Tavnit">
        <Lead>
          La barra laterale dell&apos;app raggruppa ogni area in base al lavoro che svolge, dalla
          ricezione dei documenti fino all&apos;azione sui dati. La documentazione segue gli stessi
          gruppi, quindi questa tabella fa anche da indice.
        </Lead>
        <DataTable
          head={["Gruppo", "Area", "Cosa fa"]}
          rows={[
            [
              "Input",
              <Fragment key="m0">
                <DocLink href="/docs/collections">Collections</DocLink>
              </Fragment>,
              "Una sola casella o un solo endpoint per documenti misti: ognuno viene classificato e indirizzato al Flow giusto.",
            ],
            [
              "Input",
              <Fragment key="m1">
                <DocLink href="/docs/subjects">Subjects</DocLink>
              </Fragment>,
              "Modella un'entità come un acquisto o un paziente e raccogli i suoi documenti in casi tramite un riferimento.",
            ],
            [
              "Input",
              <Fragment key="m2">
                <DocLink href="/docs/splitters">Splitters</DocLink>
              </Fragment>,
              "Dividi un file che contiene più documenti in documenti separati e inoltra ciascuno.",
            ],
            [
              "Elaborazione",
              <Fragment key="m3">
                <DocLink href="/docs/flows">Flows</DocLink>
              </Fragment>,
              "Lo schema di un tipo di documento: i campi da estrarre e tutto ciò che vi è collegato. Tutto parte da qui.",
            ],
            [
              "Elaborazione",
              <Fragment key="m4">
                <DocLink href="/docs/cleaners">Cleaners</DocLink>
              </Fragment>,
              "Riformatta, converti, calcola, cerca e convalida le righe estratte, e avvia azioni quando qualcosa non torna.",
            ],
            [
              "Elaborazione",
              <Fragment key="m5">
                <DocLink href="/docs/agents">Agents</DocLink>
              </Fragment>,
              "Agenti browser che svolgono su un sito web una missione scritta in linguaggio naturale, spesso usando dati estratti come input.",
            ],
            [
              "Intelligenza",
              <Fragment key="m6">
                <DocLink href="/docs/matchers">Matchers</DocLink>
              </Fragment>,
              "Confronta i record riga per riga tra documenti diversi — preventivi tra loro, una fattura con il suo ordine.",
            ],
            [
              "Intelligenza",
              <Fragment key="m7">
                <DocLink href="/docs/inspectors">Inspectors</DocLink>
              </Fragment>,
              "Applica una checklist a un insieme di documenti correlati e ottieni un esito superato o non superato.",
            ],
            [
              "Intelligenza",
              <Fragment key="m8">
                <DocLink href="/docs/fillers">Fillers</DocLink>
              </Fragment>,
              "Compila modelli di moduli PDF con i dati estratti dai tuoi documenti.",
            ],
            [
              "Orchestrazione",
              <Fragment key="m9">
                <DocLink href="/docs/pipelines">Pipelines</DocLink>
              </Fragment>,
              "Concatena i passaggi dall'inizio alla fine su un canvas visuale.",
            ],
            [
              "Orchestrazione",
              <Fragment key="m10">
                <DocLink href="/docs/pipeline-map">Mappa Pipeline</DocLink>
              </Fragment>,
              "Un'unica immagine di come i documenti si muovono nella tua organizzazione.",
            ],
            [
              "Dati e attività",
              <Fragment key="m11">
                <DocLink href="/docs/buckets">Buckets</DocLink>
              </Fragment>,
              "Tabelle in cui i risultati si accumulano Run dopo Run, pronti da interrogare, visualizzare in grafici ed esportare.",
            ],
            [
              "Dati e attività",
              <Fragment key="m12">
                <DocLink href="/docs/flows#runs">Runs</DocLink>
              </Fragment>,
              "Lo storico di ogni documento elaborato, con il suo risultato, il file di origine e il log.",
            ],
            [
              "Dati e attività",
              <Fragment key="m13">
                <DocLink href="/docs/human-in-the-loop">Revisione umana</DocLink>
              </Fragment>,
              "Una coda di revisione in cui una persona approva, modifica o rifiuta i risultati prima che vengano consegnati.",
            ],
            [
              "Audio",
              <Fragment key="m14">
                <DocLink href="/docs/signals">Signals</DocLink>
              </Fragment>,
              "Trasforma le conversazioni registrate in righe strutturate.",
            ],
            [
              "Social",
              <Fragment key="m15">
                <DocLink href="/docs/nets">Nets</DocLink>
              </Fragment>,
              "Trasforma i post sui social media in righe strutturate e tendenze.",
            ],
          ]}
        />
        <InfoBox color="blue" icon={<Info size={20} />} title="Non vedi Agents, Signals o Nets?">
          Queste tre aree vengono attivate per singola organizzazione. Se mancano nella tua barra
          laterale, contatta il team di Tavnit per farle abilitare.
        </InfoBox>
        <InfoBox color="violet" icon={<Info size={20} />} title="Quale smista i miei documenti?">
          Se ogni file contiene un documento ma non ne conosci il tipo, usa una{" "}
          <DocLink href="/docs/collections">Collection</DocLink>. Se un file contiene più documenti,
          usa uno <DocLink href="/docs/splitters">Splitter</DocLink>. Se i documenti vanno insieme —
          lo stesso acquisto, lo stesso paziente — usa un{" "}
          <DocLink href="/docs/subjects">Subject</DocLink>. Se sai già di che documento si tratta,
          invialo direttamente al Flow e salta tutti e tre.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Rocket size={24} />} title="I tuoi primi minuti">
        <Lead>
          Una nuova organizzazione parte con un breve percorso di configurazione, quindi raramente ti
          troverai davanti a una schermata vuota.
        </Lead>
        <BulletList
          items={[
            <Fragment key="o0">
              <strong>Domande di benvenuto.</strong> Dopo che hai creato la tua organizzazione, Tavnit
              ti fa quattro domande rapide: quali documenti elaborerai, cosa vuoi ottenere, come
              arrivano oggi i tuoi documenti e quanti ne gestisci all&apos;incirca al mese. Richiedono
              circa 30 secondi e puoi fare clic su <strong>Salta</strong>.
            </Fragment>,
            <Fragment key="o1">
              <strong>Flow iniziali con un clic.</strong> Se hai risposto, la pagina Flows vuota ti
              propone i modelli adatti ai tuoi documenti sotto{" "}
              <em>“In base alle tue risposte, possiamo configurarli per te:”</em>. Fai clic su{" "}
              <strong>Crea questi Flow</strong> e vengono creati per te, pronti da modificare.
            </Fragment>,
            <Fragment key="o2">
              <strong>Modelli iniziali.</strong> Tavnit include Flow pronti per fatture, ordini
              d&apos;acquisto, scontrini, estratti conto bancari, documenti di trasporto, referti di
              laboratorio, contratti, preventivi, note di credito, documenti d&apos;identità e
              curriculum. I modelli adatti alle tue risposte vengono mostrati per primi.
            </Fragment>,
            <Fragment key="o3">
              <strong>La guida introduttiva.</strong> Un piccolo pannello nell&apos;angolo
              dell&apos;app con tre schede: <strong>Checklist</strong> (passaggi di configurazione che
              si spuntano da soli man mano che li completi), <strong>Questa schermata</strong>{" "}
              (suggerimenti per la pagina in cui ti trovi) e <strong>Funzionalità</strong> (ogni area
              a tua disposizione). Se lo nascondi, riaprilo dal menu{" "}
              <strong>Aiuto e supporto</strong>.
            </Fragment>,
          ]}
        />
      </DocCard>

      <DocCard icon={<FilePlus size={24} />} title="Passo 1: crea un Flow">
        <Lead>
          Un Flow è lo schema di un tipo di documento. Chiamalo come il documento, non come il
          progetto — <em>Fatture fornitori</em>, non <em>Automazione Q1</em> — perché il nome e la
          descrizione sono anche ciò che una Collection usa per indirizzargli i documenti.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f5">
              Nella pagina <strong>Flows</strong>, fai clic su <strong>Crea Flow</strong>.
            </Fragment>,
            <Fragment key="f6">
              Scegli un punto di partenza: <strong>Da un modello</strong> (un modello di Tavnit o una
              copia di uno dei tuoi Flow sotto <strong>I miei Flow</strong>),{" "}
              <strong>Suggerimento AI</strong> (carica un PDF o un&apos;immagine di esempio e l&apos;AI
              propone i campi) oppure <strong>Parti da zero</strong>.
            </Fragment>,
            <Fragment key="f7">
              Dai al Flow un nome di almeno 3 caratteri e una descrizione di almeno 10 che dica quali
              documenti gestisce.
            </Fragment>,
            <Fragment key="f8">
              Nell&apos;editor, aggiungi, modifica o elimina campi finché lo schema non è esattamente
              quello che ti serve. Un nuovo Flow è già <strong>Attivo</strong>.
            </Fragment>,
            <Fragment key="f9">
              Fai clic su <strong>Esegui</strong>, carica un documento reale e controlla il risultato.
            </Fragment>,
          ]}
        />
        <p>
          <DocLink href="/docs/flows">Flows</DocLink> tratta ciascuno di questi passaggi in modo
          approfondito — tipi di campo, tipi di dati, i suggerimenti che dicono all&apos;AI dove
          guardare e il pulsante <strong>Diagnostica</strong>, che propone correzioni quando un Flow
          ha dei Run reali.
        </p>
        <InfoBox color="blue" icon={<Info size={20} />} title="La descrizione conta">
          La descrizione è obbligatoria e si guadagna il suo posto due volte: aiuta l&apos;AI a
          estrarre in modo più preciso ed è ciò che permette a una{" "}
          <DocLink href="/docs/collections">Collection</DocLink> di indirizzare i documenti al Flow.
          Una descrizione vaga peggiora entrambe le cose.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Table2 size={24} />} title="Passo 2: campi di metadati e campi di tabella">
        <Lead>
          Tavnit distingue i valori che compaiono una volta per documento da quelli che si ripetono.
          Questa sola distinzione decide la forma di tutto ciò che viene dopo — il payload del tuo
          webhook, le righe del tuo Bucket e il tuo CSV la seguono.
        </Lead>
        <DataTable
          head={["Tipo di campo", "Compare", "In una fattura"]}
          rows={[
            [
              "Campo di metadati",
              "Una volta per documento",
              "Numero fattura, data di emissione, fornitore, totale",
            ],
            [
              "Campo di tabella",
              "Una volta per riga",
              "Descrizione, quantità, prezzo unitario, importo",
            ],
          ]}
        />
        <p>
          Ogni campo ha anche un tipo di dati — Testo, Numero, Data, Misto/Alfanumerico o Immagine —
          e sceglierlo bene conta più di quanto sembri: un totale tipizzato come testo non si può
          sommare, confrontare né mettere in un grafico. Un Flow con soli campi di metadati
          restituisce una sola riga per documento. <DocLink href="/docs/flows">Flows</DocLink> tratta
          lo schema completo, compresi i suggerimenti di estrazione, i campi compositi e come
          correggere un campo che torna sbagliato.
        </p>
      </DocCard>

      <DocCard icon={<Clock size={24} />} title="Passo 3: invia i documenti">
        <Lead>
          Quattro vie d&apos;ingresso, che producono tutte lo stesso tipo di Run. Inizia con un
          caricamento manuale per dimostrare che il Flow funziona, poi passa alla via che corrisponde
          al modo in cui i documenti ti arrivano davvero.
        </Lead>
        <DataTable
          head={["Via", "Adatta per", "Configurazione"]}
          rows={[
            [
              "Caricamento nell'app",
              "Test e documenti occasionali",
              "Nessuna. Seleziona più file insieme e ognuno diventa un Run a sé",
            ],
            [
              <Fragment key="f10">
                <DocLink href="/docs/email-integration">Email</DocLink>
              </Fragment>,
              "Documenti che arrivano già in una casella di posta",
              "Attiva il Trigger email del Flow e inoltra la posta al suo indirizzo",
            ],
            [
              <Fragment key="f11">
                <DocLink href="/docs/api-integration">API REST</DocLink>
              </Fragment>,
              "I tuoi sistemi e i volumi elevati",
              "Una chiave API e una POST",
            ],
            [
              <Fragment key="f12">
                <DocLink href="/docs/mcp-connector">Connettore MCP</DocLink>
              </Fragment>,
              "Lavoro estemporaneo da un assistente AI",
              "Abilitato su richiesta per organizzazione, poi un URL del connettore da Integrazioni",
            ],
          ]}
        />
        <p>
          I Flow accettano PDF, immagini (PNG, JPG, JPEG e JFIF) e fogli di calcolo (XLSX, XLS e
          CSV). Per un foglio di calcolo, il Flow legge il primo foglio visibile. I documenti
          scansionati vengono rilevati e letti automaticamente con l&apos;OCR.
        </p>
        <Screenshot
          src="/assets/tour2-runs.jpg"
          alt="La pagina Runs di Tavnit con i documenti elaborati, ciascuno con il suo Flow, chi lo ha avviato, la sua origine e il suo stato, sopra i riquadri di riepilogo dei Run completati, in corso e totali."
          caption="Ogni documento diventa un Run. La pagina Runs mostra cosa è stato elaborato, come è arrivato e come è finito."
        />
        <p>
          Apri un Run qualsiasi per vedere i campi estratti accanto al documento di origine, insieme
          al log di ciò che è successo durante l&apos;elaborazione. Quel log è il primo posto da
          guardare quando un risultato non è quello che ti aspettavi.
        </p>
      </DocCard>

      <DocCard icon={<Map size={24} />} title="Dove andare dopo">
        <Lead>
          Quando l&apos;estrazione funziona, il passo successivo dipende da cosa non va nei dati o da
          cosa devi farci.
        </Lead>
        <DataTable
          head={["Se ti serve…", "Leggi"]}
          rows={[
            [
              "Estrarre più campi o correggerne uno che torna sbagliato",
              <Fragment key="f17">
                <DocLink href="/docs/flows">Flows</DocLink>
              </Fragment>,
            ],
            [
              "Correggere formati, convertire valute, calcolare totali o segnalare righe errate",
              <Fragment key="f18">
                <DocLink href="/docs/cleaners">Cleaners</DocLink>
              </Fragment>,
            ],
            [
              "Far controllare i risultati a una persona prima che vadano da qualche parte",
              <Fragment key="f19">
                <DocLink href="/docs/human-in-the-loop">Revisione umana</DocLink>
              </Fragment>,
            ],
            [
              "Portare i dati nei tuoi sistemi",
              <Fragment key="f20">
                <DocLink href="/docs/webhooks">Webhooks</DocLink> o l&apos;
                <DocLink href="/docs/api-integration">API REST</DocLink>
              </Fragment>,
            ],
            [
              "Tenere insieme i risultati e interrogarli",
              <Fragment key="f21">
                <DocLink href="/docs/buckets">Buckets</DocLink>
              </Fragment>,
            ],
            [
              "Confrontare documenti o verificarli rispetto a un elenco di regole",
              <Fragment key="f24">
                <DocLink href="/docs/matchers">Matchers</DocLink> e{" "}
                <DocLink href="/docs/inspectors">Inspectors</DocLink>
              </Fragment>,
            ],
            [
              "Collegare più passaggi in un unico processo",
              <Fragment key="f25">
                <DocLink href="/docs/pipelines">Pipelines</DocLink>
              </Fragment>,
            ],
            [
              "Agire sui dati da qualche altra parte sul web",
              <Fragment key="f22">
                <DocLink href="/docs/agents">Agents</DocLink>
              </Fragment>,
            ],
            [
              "Controllare chi può vedere e modificare cosa",
              <Fragment key="f23">
                <DocLink href="/docs/user-roles">Ruoli utente</DocLink>
              </Fragment>,
            ],
          ]}
        />
      </DocCard>

      <Related
        links={[
          {
            href: "/docs/flows",
            label: "Costruisci in dettaglio lo schema dati di un Flow",
            description:
              "Tipi di campo, tipi di dati, suggerimenti di estrazione, campi compositi, Runs e tutto ciò che puoi collegare a un Flow.",
          },
          {
            href: "/docs/api-integration",
            label: "Elabora documenti con l'API REST di Tavnit",
            description:
              "Caricamento multipart e base64, autenticazione con chiave API, esempi in Python e JavaScript e ricette no-code.",
          },
          {
            href: "/docs/email-integration",
            label: "Estrai dagli allegati email",
            description: "Dai a un Flow la sua casella di posta e inoltragli i documenti.",
          },
          {
            href: "/docs/pipeline-map",
            label: "Guarda come si collega tutto",
            description:
              "Una mappa in tempo reale dei tuoi Flows, Collections, Splitters, Cleaners e Buckets.",
          },
        ]}
      />
    </section>
  );
}
