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
 * /it/docs/human-in-the-loop — translated from
 * src/app/docs/human-in-the-loop/page.tsx. The app calls the area
 * "Revisione umana" in Italian; HITL stays as in the app's labels.
 */

/** Mirrors the visible numbered steps under "Attivare la revisione per un Flow". */
export const schema: DocsPageSchemaData = {
  howTo: {
    name: "Aggiungere un passaggio di revisione umana a un Flow di Tavnit",
    description:
      "Attiva la Revisione umana su un Flow e assegna i revisori, così ogni Run si ferma in attesa di approvazione prima che i suoi risultati vengano consegnati a valle.",
    steps: [
      {
        name: "Apri il pannello Revisione umana del Flow",
        text: "Vai su Flows nell'app Tavnit, apri il Flow e seleziona il pannello Revisione umana nella sua barra laterale.",
      },
      {
        name: "Attiva la revisione",
        text: "Attiva la Revisione umana. Da quel momento, i nuovi Run del Flow si mettono in pausa invece di consegnare i loro risultati.",
      },
      {
        name: "Assegna i revisori",
        text: "In Revisori, scegli uno o più membri della tua organizzazione. Solo i revisori assegnati possono approvare o rifiutare i Run in pausa del Flow.",
      },
      {
        name: "Esegui un documento e controlla la coda",
        text: "Elabora un documento. Dovrebbe comparire come In attesa di revisione nella coda Revisione umana di ogni revisore assegnato.",
      },
    ],
  },
  primaryImage: {
    url: "/assets/docs-hitl-review-2026-08.jpg",
    caption:
      "La schermata di revisione umana di Tavnit: una griglia di dati modificabile accanto al documento di origine, con le azioni Approva e Rifiuta.",
    width: 1327,
    height: 801,
  },
};

export default function HumanInTheLoopIt() {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        Revisione umana (Human in the Loop)
      </h1>

      <DocCard icon={<ClipboardCheck size={24} />} title="Cosa fa la Revisione umana">
        <Lead>
          La Revisione umana inserisce un punto di controllo tra l&apos;estrazione e la consegna. Un
          Run che richiede una revisione si ferma dopo l&apos;estrazione e la pulizia con lo stato{" "}
          <strong>In attesa di approvazione</strong>: nessuna email viene inviata, nessun webhook
          parte, nessuna riga viene scritta nel Bucket e nessun Agent collegato si avvia finché un
          revisore designato non lo approva.
        </Lead>
        <p>
          La parola importante è <em>prima</em>. La revisione non è una correzione che applichi dopo
          che i dati sbagliati hanno già raggiunto il tuo ERP; la fase di consegna non è ancora
          partita. Quando il revisore approva, il Run riprende esattamente da dove si era fermato,
          portando con sé le sue modifiche.
        </p>
        <BulletList
          items={[
            "Dati di alto valore che devono essere verificati prima di proseguire a valle",
            "Un requisito di conformità che prevede un passaggio di approvazione manuale documentato",
            "Documenti in cui l'estrazione di solito è corretta, ma un errore occasionale costa caro",
            "Valori che solo una persona può fornire, come un centro di costo interno o un codice di approvazione",
            "Nuovi fornitori o nuovi formati, finché non ti fidi del Flow",
          ]}
        />
        <p>
          I Run dei Flow sono il caso principale, ma la stessa coda raccoglie anche{" "}
          <DocLink href="/docs/matchers">abbinamenti</DocLink>,{" "}
          <DocLink href="/docs/inspectors">ispezioni</DocLink> e{" "}
          <DocLink href="/docs/fillers">compilazioni</DocLink> in pausa. Vedi{" "}
          <em>Altri elementi in attesa di revisione</em> più sotto.
        </p>
      </DocCard>

      <DocCard icon={<Settings2 size={24} />} title="Tre modi in cui un Run di un Flow va in pausa">
        <Lead>
          L&apos;interruttore a livello di Flow è un modo per mandare i Run in revisione, non
          l&apos;unico. Un <DocLink href="/docs/cleaners">Cleaner</DocLink> collegato al Flow può
          mettere in pausa i Run da solo, anche con l&apos;interruttore spento. Quando più trigger
          si applicano allo stesso Run, i loro elenchi di revisori vengono uniti.
        </Lead>
        <DataTable
          head={["Trigger", "Cosa va in pausa", "Ideale per"]}
          rows={[
            [
              "Impostazione del Flow (pannello Revisione umana)",
              "Ogni Run del Flow, indipendentemente da ciò che è stato estratto.",
              "Un tipo di documento che richiede sempre un'approvazione, o un Flow che hai appena costruito e di cui non ti fidi ancora.",
            ],
            [
              "Regola Azioni condizionali del Cleaner con l'azione Revisione umana",
              "Solo i Run in cui una riga soddisfa la regola, per esempio un totale sopra una soglia o una partita IVA mancante.",
              "Volumi elevati in cui la maggior parte dei Run va bene e vuoi controllare solo le eccezioni.",
            ],
            [
              "Campo Input umano del Cleaner",
              "Ogni Run che passa per il Cleaner, perché una persona deve digitare o scegliere il valore.",
              "Dati che non sono affatto nel documento e che qualcuno deve aggiungere.",
            ],
          ]}
        />
        <InfoBox color="blue" icon={<Info size={20} />} title="Non devi rivedere tutto">
          Rivedere ogni Run vanifica lo scopo di automatizzare l&apos;estrazione. Di solito la via
          condizionale è quella giusta: nel Cleaner, aggiungi un campo Azioni condizionali, dagli una
          condizione come <em>total &gt; 10,000</em>, aggiungi l&apos;azione Revisione umana e
          scegline i revisori. Si fermano solo i Run che corrispondono. L&apos;interruttore del Flow
          può restare spento.
        </InfoBox>
        <p>
          Quando è una regola del Cleaner a provocare la pausa, Tavnit registra quali righe e quali
          campi l&apos;hanno soddisfatta. La schermata di revisione evidenzia esattamente quelle
          celle, così il revisore parte dal motivo per cui il Run è stato trattenuto invece di
          leggere l&apos;intera tabella. Se la regola è alimentata da un campo Controllo anomalie, il
          revisore vede anche perché ogni valore è stato segnalato.
        </p>
      </DocCard>

      <DocCard icon={<Settings2 size={24} />} title="Attivare la revisione per un Flow">
        <Lead>
          L&apos;interruttore si trova nelle impostazioni del Flow stesso. Solo un Owner o un Admin
          può modificarlo. I revisori si scelgono tra i membri della tua organizzazione.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f0">
              Apri il Flow e seleziona il pannello <strong>Revisione umana</strong> nella sua barra
              laterale.
            </Fragment>,
            <Fragment key="f1">Attiva la revisione.</Fragment>,
            <Fragment key="f2">
              In <strong>Revisori</strong>, scegli uno o più membri della tua organizzazione.
            </Fragment>,
            <Fragment key="f3">
              Elabora un documento e verifica che compaia come{" "}
              <strong>In attesa di revisione</strong> nella coda <strong>Revisione umana</strong> dei
              revisori.
            </Fragment>,
          ]}
        />
        <WarningBox>
          Con la revisione attiva e nessun revisore assegnato, il pannello avvisa{" "}
          <em>
            &ldquo;Nessun revisore selezionato — le approvazioni non raggiungeranno nessuno.&rdquo;
          </em>{" "}
          A quel punto nessuno può approvare i Run in pausa. Assegna almeno un revisore prima di
          inviare documenti.
        </WarningBox>
        <InfoBox
          color="violet"
          icon={<Info size={20} />}
          title="Con un Cleaner collegato, i revisori vedono i dati puliti"
        >
          Quando il Flow ha un Cleaner, la pausa avviene dopo la pulizia, quindi la tabella in
          revisione è l&apos;output pulito, con valute convertite, date riformattate e colonne
          calcolate. È ciò che verrà consegnato, quindi è la cosa giusta da controllare.
        </InfoBox>
      </DocCard>

      <DocCard icon={<PenLine size={24} />} title="Campi Input umano">
        <Lead>
          Un campo Input umano è una colonna del Cleaner che non viene mai estratta: la compila un
          revisore nella schermata di revisione. Usalo per un centro di costo, un conto di contabilità
          generale, un codice di approvazione interno o qualsiasi altra cosa che il documento non può
          dirti.
        </Lead>
        <DataTable
          head={["Opzione", "Cosa fa"]}
          rows={[
            ["Testo libero", "Il revisore digita il valore."],
            [
              "Menu",
              "Il revisore sceglie tra i valori distinti di una colonna di un Bucket (Bucket delle opzioni e Colonna delle opzioni), filtrati facoltativamente da condizioni, anche su campi della riga corrente.",
            ],
            [
              "Valore obbligatorio",
              "L'approvazione è bloccata finché ogni riga non ha un valore. Disattivalo per consentire celle vuote.",
            ],
            ["Revisori", "Chi può compilare il campo e approvare; si sommano ai revisori del Flow."],
          ]}
        />
        <p>
          Ogni Run che passa per un Cleaner con un campo Input umano va in pausa per la revisione,
          che l&apos;interruttore del Flow sia attivo o no. Nella schermata di revisione la colonna è
          contrassegnata con <strong>Richiede un intervento umano</strong> e il numero di righe
          compilate, e Approva resta bloccato (
          <em>&ldquo;Compila tutti i valori obbligatori di intervento umano per approvare&rdquo;</em>)
          finché non è inserito ogni valore obbligatorio.
        </p>
      </DocCard>

      <DocCard icon={<Inbox size={24} />} title="La coda di revisione">
        <Lead>
          La pagina <strong>Revisione umana</strong> nella barra laterale elenca tutto ciò che ti
          aspetta, dal più recente. Mostra solo gli elementi di cui sei revisore; i revisori non vedono
          le code degli altri.
        </Lead>
        <BulletList
          items={[
            "Dati di riepilogo in alto: In attesa di revisione, Più vecchia in sospeso, Il tuo ruolo e Flow con HITL",
            "Una scheda per elemento: il nome del file e il Flow per un Run, con un chip Abbinamento o Compilazione per quei tipi, e lo stato In attesa di revisione",
            "Un punto rosso sull'icona della barra laterale ogni volta che qualcosa ti aspetta. Si aggiorna in tempo reale, senza ricaricare la pagina",
            "I revisori assegnati ricevono anche un'email con un link diretto non appena un Run, un abbinamento, un'ispezione o una compilazione ha bisogno di loro",
          ]}
        />
      </DocCard>

      <DocCard icon={<SplitSquareHorizontal size={24} />} title="Rivedere un Run">
        <Lead>
          La schermata di revisione è una vista divisa: la tabella estratta a sinistra, il documento
          originale a destra. Controlli un valore rispetto all&apos;originale senza lasciare la
          pagina, lo correggi sul posto e approvi. Il divisore si può trascinare e, su mobile, passi
          da un pannello all&apos;altro.
        </Lead>
        <Screenshot
          src="/assets/docs-hitl-review-2026-08.jpg"
          alt="La schermata di revisione di Tavnit per un Run in attesa di revisione: a sinistra una griglia di dati modificabile con le colonne Subtotal, Amount e Weight e caselle di selezione per riga, a destra la fattura di origine, e i pulsanti Rifiuta e Approva nell'intestazione."
          caption="Un Run in attesa di revisione. La griglia a sinistra è l'output pulito che verrà consegnato; il documento di origine le sta accanto per il controllo."
        />
        <DataTable
          head={["Nella griglia di dati puoi", "Come"]}
          rows={[
            ["Modificare un valore", "Fai doppio clic sulla cella e digita."],
            [
              "Cambiare molte celle insieme",
              "Seleziona trascinando, con Maiusc+clic o facendo clic sull'intestazione di una colonna, poi Applica alla selezione.",
            ],
            ["Togliere una riga dall'output", "Deselezionala. Le righe escluse non vengono consegnate."],
            [
              "Aggiungere o rimuovere una colonna",
              "Usa Aggiungi colonna o Rimuovi colonna. Una colonna rimossa si può ripristinare prima di approvare.",
            ],
            ["Vedere cosa ha provocato la pausa", "Le celle che una regola del Cleaner ha soddisfatto sono evidenziate."],
            ["Compilare i campi Input umano", "Digita il valore o sceglilo dal menu."],
            ["Vedere cosa hai cambiato", "Le celle modificate restano evidenziate finché non approvi."],
          ]}
        />
        <BulletList
          items={[
            "Il pannello del documento mostra i PDF con la navigazione tra le pagine e i file immagine; i fogli di calcolo si possono scaricare",
            "Adatta alla larghezza, Adatta all'altezza e zoom manuale; trascina per spostarti",
            "Ctrl/Cmd + e − per lo zoom, Ctrl/Cmd + 0 per reimpostarlo",
          ]}
        />
      </DocCard>

      <DocCard icon={<CheckCircle2 size={24} />} title="Approvare e rifiutare">
        <Lead>
          Approvare incorpora le tue modifiche nel Run e lo rilascia a valle. Rifiutare annulla il Run
          e non consegna nulla. Entrambe le decisioni sono definitive per quel Run: la pausa è un
          punto di controllo unico, non uno stato che puoi attivare e disattivare a piacere.
        </Lead>
        <DataTable
          head={["Decisione", "Cosa succede al Run", "Cosa viene consegnato"]}
          rows={[
            [
              "Approva",
              "La tua tabella modificata sostituisce l'output estratto e il Run riprende fino a Completato, con un badge Approvato HITL.",
              <Fragment key="f4">
                Tutto ciò che il Flow è configurato per fare: output email, webhook, esportazione nel{" "}
                <DocLink href="/docs/buckets">Bucket</DocLink>, compilazione dei moduli e un{" "}
                <DocLink href="/docs/agents">Agent</DocLink> collegato, tutto con i dati approvati.
              </Fragment>,
            ],
            [
              "Rifiuta",
              "Il Run diventa Annullato, con un badge Rifiutato HITL, e il tuo motivo (facoltativo ma consigliato) viene registrato.",
              "Niente. Nessuna email, nessun webhook, nessuna riga nel Bucket, nessun Run dell'Agent.",
            ],
          ]}
        />
        <InfoBox color="green" icon={<CheckCircle2 size={20} />} title="Vince la prima decisione">
          Non serve che ogni revisore assegnato dia il suo via libera. La prima approvazione o il
          primo rifiuto risolve il Run; se un secondo revisore lo aveva aperto, la sua decisione viene
          rifiutata perché il Run non è più in attesa di approvazione. Aggiorna la coda per vedere lo
          stato attuale.
        </InfoBox>
        <p>
          La pagina del Run mostra chi ha deciso (<strong>Approvato da</strong> o{" "}
          <strong>Rifiutato da</strong>).
        </p>
      </DocCard>

      <DocCard icon={<Layers size={24} />} title="Altri elementi in attesa di revisione">
        <Lead>
          Matchers, Inspectors e Fillers hanno le proprie impostazioni di revisione, e i loro elementi
          in pausa finiscono nella stessa coda, con la stessa regola per cui vince la prima decisione
          e la stessa traccia di audit.
        </Lead>
        <DataTable
          head={["Elemento", "Quando va in pausa", "Cosa fa il revisore"]}
          rows={[
            [
              <DocLink key="o0" href="/docs/matchers">Abbinamento</DocLink>,
              "Quando la revisione umana è attiva per il Matcher: ogni abbinamento.",
              "Controlla e corregge l'abbinamento fatto dall'AI tra le righe dei documenti, può escludere righe, poi approva o rifiuta.",
            ],
            [
              <DocLink key="o1" href="/docs/inspectors">Ispezione</DocLink>,
              "Quando la revisione umana è attiva per l'Inspector, o quando un controllo non superato richiede una revisione tramite le sue azioni in caso di esito negativo.",
              "Ignora i controlli non superati indicando un motivo, poi approva per rendere definitivo l'esito, o rifiuta per annullare l'ispezione.",
            ],
            [
              <DocLink key="o2" href="/docs/fillers">Compilazione</DocLink>,
              "Quando la revisione umana è attiva per il Filler, o ogni volta che ha campi Compilazione manuale mappati.",
              "Esamina i moduli compilati, digita i valori di Compilazione manuale, poi approva per rilasciare i moduli, o rifiuta.",
            ],
          ]}
        />
      </DocCard>

      <DocCard icon={<Eye size={24} />} title="Chi può fare la revisione">
        <Lead>
          Solo le persone assegnate come revisori possono approvare o rifiutare il Run di un Flow.
          Essere Admin da solo non basta: un Admin che non è nell&apos;elenco dei revisori non riceve
          il Run nella sua coda e non può approvarlo.
        </Lead>
        <BulletList
          items={[
            "Gli elenchi dei revisori dei Flow sono gestiti da un Owner o da un Admin",
            "L'azione Revisione umana di un Cleaner e ogni campo Input umano hanno i propri revisori, che si sommano a quelli del Flow",
            "Qualsiasi membro può essere revisore, qualunque sia il suo ruolo",
            "Il ruolo Solo HITL è pensato per i revisori: questi membri vedono solo la coda Revisione umana e possono fare revisioni, ma non possono eseguire né modificare nient'altro",
          ]}
        />
        <p>
          Vedi <DocLink href="/docs/user-roles">ruoli utente e permessi</DocLink> per sapere cosa può
          modificare ogni ruolo.
        </p>
      </DocCard>

      <DocCard icon={<Shield size={24} />} title="La traccia di audit in sola aggiunta">
        <Lead>
          Ogni azione di revisione viene scritta in un registro permanente, in sola aggiunta, con
          data e ora e l&apos;identità del revisore. Le voci non si possono modificare né eliminare,
          quindi la traccia di chi ha cambiato cosa, e di come erano i dati prima che li toccasse,
          sopravvive alla revisione.
        </Lead>
        <DataTable
          head={["Evento registrato", "Quando viene scritto"]}
          rows={[
            ["Revisori avvisati", "Il Run entra nella coda di revisione e i revisori ricevono un'email."],
            ["Cella modificata", "Un valore viene cambiato, con il valore vecchio e quello nuovo."],
            ["Riga aggiunta / riga rimossa", "Il revisore aggiunge una riga o ne esclude una."],
            ["Colonna aggiunta / colonna rimossa", "Il revisore cambia la forma della tabella."],
            ["Approvato", "La decisione, il revisore e quante modifiche sono state fatte."],
            ["Rifiutato", "La decisione, il revisore e il motivo indicato."],
          ]}
        />
        <InfoBox color="purple" icon={<Shield size={20} />} title="Vengono conservati anche i dati precedenti alla revisione">
          Tavnit archivia l&apos;output così com&apos;era prima che il revisore lo toccasse, accanto
          alla versione approvata. Un revisore contabile può confrontare l&apos;estrazione con il
          risultato consegnato senza ricostruirlo dal registro degli eventi.
        </InfoBox>
      </DocCard>

      <DocCard icon={<HelpCircle size={24} />} title="Risoluzione dei problemi">
        <DataTable
          head={["Sintomo", "Causa probabile e soluzione"]}
          rows={[
            [
              "I Run vanno in pausa anche se l'interruttore del Flow è spento",
              "Il Cleaner del Flow ha una regola Azioni condizionali con l'azione Revisione umana, oppure un campo Input umano.",
            ],
            [
              "Un Run è In attesa di approvazione ma non è nella mia coda",
              "Non sei nel suo elenco di revisori. Chiedi a un Owner o a un Admin di aggiungerti al Flow (o alla regola del Cleaner che lo ha messo in pausa).",
            ],
            [
              "L'approvazione viene rifiutata perché non sei un revisore configurato",
              "Solo i revisori assegnati possono decidere. Se non è stato assegnato nessun revisore, aggiungine uno sul Flow; nessun altro può rilasciare il Run.",
            ],
            [
              "L'approvazione viene rifiutata perché il Run non è in attesa di approvazione",
              "Un altro revisore ha deciso prima di te. Aggiorna la coda.",
            ],
            [
              "L'approvazione è bloccata per input umano mancante",
              "Un campo Input umano obbligatorio è ancora vuoto in alcune righe. Compilale, oppure rendi il campo facoltativo nel Cleaner.",
            ],
            [
              "L'Agent collegato non è partito",
              "Parte solo dopo l'approvazione. Un Run rifiutato non lo avvia mai.",
            ],
          ]}
        />
        <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="La revisione richiede tempo">
          Un Run in pausa aspetta tutto il tempo necessario. Se i risultati alimentano un processo
          con scadenze strette, assicurati che i revisori tengano d&apos;occhio la loro coda o la
          loro email, oppure limita la pausa alle eccezioni con una regola del Cleaner.
        </InfoBox>
      </DocCard>

      <Related
        links={[
          {
            href: "/docs/cleaners",
            label: "Avvia la revisione in modo condizionale con un Cleaner",
            description:
              "Le Azioni condizionali mettono in pausa solo i Run che violano una regola; i campi Input umano raccolgono valori da un revisore.",
          },
          {
            href: "/docs/user-roles",
            label: "Ruoli utente e permessi",
            description: "Chi può assegnare i revisori e cosa può fare il ruolo Solo HITL.",
          },
          {
            href: "/docs/agents",
            label: "Agisci sui dati approvati con gli Agents",
            description: "Un Agent collegato si avvia solo dopo che il revisore ha approvato.",
          },
          {
            href: "/docs/webhooks",
            label: "Consegna i risultati approvati con i webhook",
            description: "Cosa parte quando un revisore approva e cosa non parte mai se rifiuta.",
          },
          {
            href: "/docs/buckets",
            label: "Archivia i dati approvati nei Buckets",
            description: "Le tabelle strutturate che ricevono solo le righe approvate da un revisore.",
          },
        ]}
      />
    </section>
  );
}
