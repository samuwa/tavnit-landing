import { Fragment } from "react";
import {
  AlertTriangle,
  AtSign,
  Code2,
  Copy,
  ExternalLink,
  FileSpreadsheet,
  Info,
  LifeBuoy,
  Mail,
  Paperclip,
  Send,
  ShieldCheck,
  Workflow,
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
  WarningBox,
} from "@/components/docs/ui";
import type { DocsPageSchemaData } from "../types";


/** /it/docs/email-integration — translated from src/app/docs/email-integration/page.tsx. */

/** Mirrors the visible numbered steps under "Attivare il trigger email". */
export const schema: DocsPageSchemaData = {
  howTo: {
    name: "Estrarre dati dagli allegati email con un trigger email di Tavnit",
    description:
      "Attiva il trigger email su un Flow di Tavnit per ottenere un indirizzo di casella dedicato, poi inoltra i documenti a quell'indirizzo. Ogni allegato supportato diventa un proprio Run di estrazione.",
    steps: [
      {
        name: "Apri il Flow",
        text: "Vai su Flows nell'app Tavnit e apri il Flow che deve ricevere i documenti.",
      },
      {
        name: "Attiva il trigger email",
        text: "Apri il pannello Trigger email nella pagina di dettaglio del Flow e attivalo. Compare l'Indirizzo della casella del Flow.",
      },
      {
        name: "Copia l'indirizzo",
        text: "Fai clic su Copia accanto all'Indirizzo della casella. Facoltativamente, nello stesso pannello aggiungi Mittenti consentiti o attiva Elabora il corpo dell'email.",
      },
      {
        name: "Invia un documento di prova",
        text: "Invia un singolo PDF all'indirizzo e controlla la pagina Runs. Compare un nuovo Run con l'origine Email.",
      },
      {
        name: "Automatizza l'inoltro",
        text: "Quando la prova funziona, aggiungi nel tuo client di posta o nella casella condivisa una regola che inoltra automaticamente all'indirizzo i messaggi corrispondenti.",
      },
    ],
  },
};

export default function EmailIntegrationIt() {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        Integrazione email
      </h1>

      <DocCard icon={<Mail size={24} />} title="Come funziona l'elaborazione via email">
        <Lead>
          Ogni Flow di Tavnit può avere un proprio indirizzo di casella. Quando attivi il trigger
          email e invii un documento a quell&apos;indirizzo, Tavnit prende ogni allegato supportato,
          crea per ciascuno un Run di estrazione separato e lo elabora esattamente come se lo avessi
          caricato nell&apos;app.
        </Lead>
        <p>
          Non si installa nulla e nulla controlla la tua casella: inoltri la posta all&apos;indirizzo
          e Tavnit reagisce. È la strada più breve da &ldquo;le fatture arrivano per email&rdquo; a
          &ldquo;le fatture arrivano come righe strutturate&rdquo;, senza codice. Anche Collections,
          Splitters, Pipelines, Matchers e Subjects hanno i propri indirizzi.
        </p>
        <BulletList
          items={[
            "Inoltrare fatture o ricevute direttamente dalla tua casella",
            "Una casella condivisa della contabilità fornitori con una regola di inoltro automatico",
            "Permettere ai fornitori di inviare documenti senza dare loro un accesso a Tavnit",
            "Estrarre dati che arrivano nel messaggio stesso, come conferme d'ordine senza allegato",
          ]}
        />
      </DocCard>

      <DocCard icon={<ExternalLink size={24} />} title="Attivare il trigger email">
        <Lead>
          Il trigger è disattivato per impostazione predefinita. Attivalo dalla pagina di dettaglio
          del Flow, copia l&apos;indirizzo che ti fornisce e invia un documento di prova prima di
          puntarvi una regola di inoltro.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f0">
              Vai su <strong>Flows</strong> e apri il Flow che deve ricevere i documenti.
            </Fragment>,
            <Fragment key="f1">
              Apri il pannello <strong>Trigger email</strong> e attivalo. Compare l&apos;
              <strong>Indirizzo della casella</strong> del Flow.
            </Fragment>,
            <Fragment key="f2">
              Fai clic su <strong>Copia</strong> accanto all&apos;indirizzo. Nello stesso pannello puoi
              aggiungere <strong>Mittenti consentiti</strong> o attivare{" "}
              <strong>Elabora il corpo dell&apos;email</strong> (entrambi spiegati più avanti).
            </Fragment>,
            <Fragment key="f3">
              Invia un PDF all&apos;indirizzo e controlla la pagina <strong>Runs</strong>. Compare un
              nuovo Run con l&apos;origine <strong>Email</strong>, e l&apos;indirizzo del mittente
              viene registrato sul Run.
            </Fragment>,
            "Quando funziona, aggiungi la regola di inoltro nel tuo client di posta o nella casella condivisa.",
          ]}
        />
        <InfoBox color="blue" icon={<Info size={20} />} title="Un Run per ogni allegato">
          Un&apos;email con tre fatture allegate produce tre Run separati, ciascuno con il proprio
          risultato e la propria riga nell&apos;elenco dei Run. Non produce un unico Run con tre
          documenti.
        </InfoBox>
        <WarningBox>
          La posta inviata a un indirizzo il cui trigger è disattivato (o a una Collection inattiva)
          viene accettata e scartata: il mittente non riceve alcun rimbalzo né alcun errore. Se i
          documenti sembrano sparire, controlla prima l&apos;interruttore.
        </WarningBox>
      </DocCard>

      <DocCard icon={<ShieldCheck size={24} />} title="Mittenti consentiti">
        <Lead>
          Per impostazione predefinita qualsiasi mittente può avviare un Run scrivendo
          all&apos;indirizzo. Aggiungi indirizzi a <strong>Mittenti consentiti</strong> nel pannello
          Trigger email e verranno accettati solo quei mittenti; la posta di chiunque altro viene
          scartata senza avviso.
        </Lead>
        <BulletList
          items={[
            "Le voci sono indirizzi email completi, non domini. Il confronto ignora maiuscole e minuscole e i nomi visualizzati.",
            "Lascia l'elenco vuoto per accettare email da qualsiasi mittente.",
            "L'elenco è disponibile nel trigger email di Flows, Collections, Splitters, Pipelines, Matchers e Subjects.",
            <Fragment key="f4">
              Quando inoltri tramite una casella condivisa, il mittente che Tavnit vede è di solito la
              casella che esegue l&apos;inoltro, quindi è quello l&apos;indirizzo da consentire.
            </Fragment>,
          ]}
        />
      </DocCard>

      <DocCard icon={<Mail size={24} />} title="Elaborare il corpo dell'email">
        <Lead>
          Alcuni dati non arrivano mai come allegato: una conferma d&apos;ordine, un avviso di
          prenotazione, un fornitore che scrive le quantità nel messaggio. Attiva{" "}
          <strong>Elabora il corpo dell&apos;email</strong> e Tavnit converte il corpo del messaggio
          in un PDF e lo elabora come qualsiasi altro documento. È disponibile su Flows e
          Collections.
        </Lead>
        <DataTable
          head={["Modalità", "Cosa succede"]}
          rows={[
            [
              <Fragment key="f5"><strong>Solo quando non ci sono allegati</strong> (predefinita)</Fragment>,
              "Il corpo viene elaborato solo quando l'email non ha documenti allegati. Un messaggio di accompagnamento come “vedi allegato” accanto a una fattura viene saltato, così un'email non avvia mai due Run.",
            ],
            [
              <Fragment key="f6"><strong>Sempre</strong></Fragment>,
              "Il corpo viene elaborato insieme a ogni allegato, ciascuno nel proprio Run.",
            ],
          ]}
        />
        <BulletList
          items={[
            "Il PDF del corpo compare in revisione come qualsiasi altro documento, e il Run viene contrassegnato come proveniente dal corpo dell'email.",
            "Le catene di risposte citate e le firme vengono eliminate quando il provider di posta riesce a identificarle.",
            "Le immagini all'interno del messaggio non vengono lette. Le immagini inline delle firme non contano come allegati quando si decide se elaborare il corpo.",
            "Un corpo quasi senza testo (“ok”, “grazie”, un inoltro vuoto) non viene elaborato.",
          ]}
        />
      </DocCard>

      <DocCard icon={<AtSign size={24} />} title="Quali funzionalità hanno un indirizzo email">
        <Lead>
          Il trigger email non è limitato ai Flows. Punta un indirizzo verso un&apos;intera fase di
          smistamento, una Pipeline o un confronto invece che verso un singolo tipo di documento.
        </Lead>
        <DataTable
          head={["Invia a", "Formato dell'indirizzo", "Cosa succede"]}
          rows={[
            [
              "Un Flow",
              <Fragment key="f7"><InlineCode>flow-name-&lt;id&gt;@mg.tavnit.io</InlineCode></Fragment>,
              "Ogni allegato viene estratto da quel Flow.",
            ],
            [
              "Una Collection",
              <Fragment key="f8"><InlineCode>name-&lt;id&gt;-collection@mg.tavnit.io</InlineCode></Fragment>,
              <Fragment key="f9">
                Ogni allegato viene classificato e instradato al Flow o allo Splitter giusto. Vedi{" "}
                <DocLink href="/docs/collections">come le Collections instradano i documenti</DocLink>.
              </Fragment>,
            ],
            [
              "Uno Splitter",
              <Fragment key="f10"><InlineCode>&lt;id&gt;-splitter@mg.tavnit.io</InlineCode></Fragment>,
              <Fragment key="f11">
                Ogni allegato viene prima suddiviso nei suoi documenti separati. Vedi{" "}
                <DocLink href="/docs/splitters">dividere file con più documenti</DocLink>.
              </Fragment>,
            ],
            [
              "Una Pipeline",
              <Fragment key="f12"><InlineCode>&lt;id&gt;-pipeline@mg.tavnit.io</InlineCode></Fragment>,
              <Fragment key="f13">
                Ogni allegato PDF o immagine avvia un&apos;esecuzione. Vedi{" "}
                <DocLink href="/docs/pipelines">Pipelines</DocLink>.
              </Fragment>,
            ],
            [
              "Un Matcher",
              <Fragment key="f14"><InlineCode>&lt;id&gt;-matcher@mg.tavnit.io</InlineCode></Fragment>,
              <Fragment key="f15">
                Tutti gli allegati PDF o immagine di un&apos;email vengono confrontati insieme in un
                unico confronto (sempre in modalità multilaterale), e il risultato viene inviato come
                risposta nello stesso thread. Vedi <DocLink href="/docs/matchers">Matchers</DocLink>.
              </Fragment>,
            ],
            [
              "Un Subject",
              <Fragment key="f16"><InlineCode>&lt;id&gt;-subject@mg.tavnit.io</InlineCode></Fragment>,
              <Fragment key="f17">
                Ogni allegato viene archiviato nel caso giusto grazie a un riferimento nell&apos;oggetto,
                nel corpo o nel nome del file, oppure tramite il plus-address del caso stesso. Vedi{" "}
                <DocLink href="/docs/subjects">Subjects</DocLink>.
              </Fragment>,
            ],
          ]}
          caption="Copia l'indirizzo esatto dal pannello Trigger email della funzionalità; i formati qui sopra servono solo a distinguerli."
        />
        <InfoBox color="violet" icon={<Workflow size={20} />} title="Quale indirizzo devono usare i fornitori?">
          Se un mittente invia sempre un solo tipo di documento, dagli l&apos;indirizzo del Flow. Se
          invia un misto (fatture, ordini d&apos;acquisto, documenti di trasporto), dagli
          l&apos;indirizzo della Collection e lascia che sia Tavnit a smistare. Se invia un PDF che
          contiene più documenti, dagli l&apos;indirizzo dello Splitter.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Paperclip size={24} />} title="Cosa accetta Tavnit">
        <Lead>
          Flows, Collections, Splitters e Subjects leggono PDF, le immagini più comuni e fogli di
          calcolo. Pipelines e Matchers leggono solo PDF e immagini. Qualsiasi altra cosa nel
          messaggio viene saltata senza far fallire il resto: un file non supportato non impedisce
          l&apos;elaborazione degli altri allegati.
        </Lead>
        <DataTable
          head={["Accettati", "Estensioni"]}
          rows={[
            ["Documenti PDF", <Fragment key="f18"><InlineCode>.pdf</InlineCode></Fragment>],
            [
              "Immagini",
              <Fragment key="f19"><InlineCode>.png .jpg .jpeg .jfif .tif .tiff .webp .bmp .gif</InlineCode></Fragment>,
            ],
            [
              "Fogli di calcolo (non per Pipelines o Matchers)",
              <Fragment key="f20"><InlineCode>.xlsx .xls .csv</InlineCode></Fragment>,
            ],
          ]}
        />
        <p>Un allegato viene saltato invece che elaborato quando vale una di queste condizioni:</p>
        <DataTable
          head={["Motivo dello scarto", "Come si presenta"]}
          rows={[
            [
              "Tipo di file non supportato",
              "Documenti Word, archivi, inoltri .eml e qualsiasi file senza un'estensione riconosciuta.",
            ],
            ["Allegato vuoto", "Un file di zero byte, di solito un inoltro non riuscito."],
            [
              "File illeggibile",
              "Il file ha un'estensione valida ma non si riesce ad aprirlo: un download troncato, un file rinominato o un foglio di calcolo che non si riesce a interpretare.",
            ],
          ]}
        />
        <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Le immagini delle firme contano come allegati">
          Un logo nella firma di un&apos;email arriva spesso come immagine allegata, e un Flow la
          elabora come qualsiasi altra immagine. Se questo crea Run indesiderati, inoltra solo i
          documenti, oppure usa Mittenti consentiti e una regola di inoltro che rimuove le immagini
          inline.
        </InfoBox>
        <p>
          Il limite di dimensione degli allegati del tuo provider di posta si applica prima ancora
          che Tavnit veda il messaggio. Se una scansione di grandi dimensioni viene respinta
          all&apos;invio, caricala nell&apos;app o inviala tramite l&apos;
          <DocLink href="/docs/api-integration">API REST</DocLink>.
        </p>
      </DocCard>

      <DocCard icon={<FileSpreadsheet size={24} />} title="Come vengono gestiti i fogli di calcolo">
        <Lead>
          Un foglio di calcolo allegato viene trattato come un documento, non come una tabella da
          importare. Cosa succede dipende da dove lo invii.
        </Lead>
        <DataTable
          head={["Inviato a", "Cosa fa Tavnit"]}
          rows={[
            [
              "Un Flow",
              "Estrae dal primo foglio visibile.",
            ],
            [
              "Una Collection",
              "Classifica il file in base al primo foglio, poi lo passa al Flow scelto, che legge il primo foglio visibile.",
            ],
            [
              "Uno Splitter",
              "Tratta ogni foglio visibile e non vuoto come un documento a sé, classifica ciascuno e lo inoltra come file di un solo foglio.",
            ],
          ]}
        />
        <p>
          I fogli molto grandi vengono rifiutati con un errore. Per caricare invece un foglio di
          calcolo come righe strutturate, usa uno sweep di un{" "}
          <DocLink href="/docs/cleaners">Cleaner</DocLink>.
        </p>
      </DocCard>

      <DocCard icon={<Copy size={24} />} title="Protezione dai duplicati">
        <Lead>
          I server di posta a volte consegnano lo stesso messaggio più di una volta, per esempio
          dopo un timeout. Tavnit riconosce un messaggio riconsegnato allo stesso indirizzo e non lo
          elabora di nuovo, così un nuovo tentativo non crea mai Run duplicati.
        </Lead>
        <BulletList
          items={[
            "Tavnit conferma la ricezione del messaggio in pochi secondi ed elabora gli allegati in background, quindi puoi inviare senza problemi un'email con molti allegati.",
            "Se l'elaborazione si interrompe, riprende da dove si era fermata invece di ricominciare da capo.",
            "Un messaggio inviato a due indirizzi Tavnit diversi viene elaborato una volta per ciascun indirizzo.",
            "Inviare di nuovo lo stesso file in una nuova email è un nuovo messaggio e viene elaborato di nuovo.",
          ]}
        />
      </DocCard>

      <DocCard icon={<Send size={24} />} title="Rispedire i risultati via email">
        <Lead>
          L&apos;Output email è il viaggio di ritorno: quando un Run termina correttamente, Tavnit
          invia il risultato per email agli indirizzi che configuri. È indipendente dal trigger
          email: puoi usare l&apos;uno o l&apos;altro da solo, oppure entrambi per creare un ciclo
          completo di invio e ritorno.
        </Lead>
        <NumberedList
          items={[
            "Apri la pagina di dettaglio del Flow.",
            <Fragment key="f21">
              Apri il pannello <strong>Output email</strong>.
            </Fragment>,
            <Fragment key="f22">
              Aggiungi uno o più <strong>Indirizzi dei destinatari</strong>.
            </Fragment>,
            <Fragment key="f23">
              Scegli cosa contiene ogni messaggio in <strong>Allegati</strong>, poi salva.
            </Fragment>,
          ]}
        />
        <DataTable
          head={["Opzione", "Cosa arriva"]}
          rows={[
            ["Estrazione JSON", "Il risultato estratto come JSON formattato nel corpo del messaggio."],
            [
              "Estrazione CSV",
              <Fragment key="f24">
                Le righe come allegato <InlineCode>rows.csv</InlineCode>, il modo più rapido per
                portare i risultati in un foglio di calcolo.
              </Fragment>,
            ],
            ["Risultati dei moduli", "I PDF compilati, quando il Flow compila un modello di modulo."],
            [
              "Documento originale",
              "Il file sorgente (PDF, immagine o foglio di calcolo) che è stato elaborato, allegato insieme ai risultati.",
            ],
          ]}
        />
        <InfoBox color="purple" icon={<Code2 size={20} />} title="I campi file arrivano come link">
          I campi che contengono un file o un&apos;immagine non sono incorporati nel JSON. Arrivano
          come link a tempo, perché Tavnit mantiene privati i documenti salvati: un percorso di
          archiviazione grezzo non sarebbe scaricabile da una casella di posta.
        </InfoBox>
        <BulletList
          items={[
            "L'email di output parte solo per i Run completati correttamente. Un Run fallito non invia nulla.",
            "L'oggetto contiene il nome del Flow più un dettaglio specifico del Run, così i client di posta non raggruppano tutti i Run di un Flow in un unico thread.",
            <Fragment key="f25">
              Se il Flow ha la <DocLink href="/docs/human-in-the-loop">revisione umana</DocLink>{" "}
              attiva, l&apos;email attende che un revisore approvi il Run.
            </Fragment>,
            <Fragment key="f26">
              Per la consegna da macchina a macchina, un{" "}
              <DocLink href="/docs/webhooks">webhook</DocLink> è più adatto dell&apos;email.
            </Fragment>,
          ]}
        />
      </DocCard>

      <DocCard icon={<Workflow size={24} />} title="Esempio pratico: una casella della contabilità fornitori">
        <Lead>
          La configurazione più comune è una casella condivisa che riceve già le fatture dei
          fornitori, inoltrate a una Collection così che il formato di ogni fornitore arrivi al Flow
          giusto, con i risultati inviati per email al team finanziario e salvati in un Bucket.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f27">
              Crea un Flow per ogni tipo di documento che ricevi, per esempio{" "}
              <em>Fatture fornitori</em> e <em>Documenti di trasporto</em>, e dai a ciascuno una
              descrizione chiara.
            </Fragment>,
            <Fragment key="f28">
              Metti entrambi i Flow in una <DocLink href="/docs/collections">Collection</DocLink> e
              attiva il trigger email della Collection. Aggiungi la casella condivisa ai Mittenti
              consentiti.
            </Fragment>,
            <Fragment key="f29">
              Nella casella condivisa, inoltra all&apos;indirizzo della Collection ogni messaggio con
              un allegato proveniente dai domini dei tuoi fornitori.
            </Fragment>,
            <Fragment key="f30">
              Su ogni Flow, attiva l&apos;<strong>Output email</strong> con l&apos;allegato CSV per il
              team finanziario, e aggiungi un{" "}
              <DocLink href="/docs/buckets">export verso un Bucket</DocLink> così che i dati si
              accumulino in un&apos;unica tabella.
            </Fragment>,
            <Fragment key="f31">
              Aggiungi un <DocLink href="/docs/cleaners">Cleaner</DocLink> con un&apos;azione
              condizionale che invia alla{" "}
              <DocLink href="/docs/human-in-the-loop">revisione umana</DocLink> tutto ciò che supera
              la tua soglia di approvazione prima che venga consegnato.
            </Fragment>,
          ]}
        />
        <p>
          Nessuno in amministrazione deve aprire Tavnit. Le fatture arrivano dove sono sempre
          arrivate, e i dati strutturati tornano nella stessa casella.
        </p>
      </DocCard>

      <DocCard icon={<LifeBuoy size={24} />} title="Risoluzione dei problemi">
        <Lead>
          Poiché la posta in arrivo viene accettata senza avvisi, un documento che non compare non
          lascia alcun errore nella tua casella. Segui questo elenco dall&apos;alto: la causa è quasi
          sempre l&apos;interruttore del trigger, i Mittenti consentiti, il tipo di allegato o una
          regola di inoltro che rimuove gli allegati.
        </Lead>
        <DataTable
          head={["Sintomo", "Causa probabile", "Soluzione"]}
          rows={[
            [
              "Non compare nessun Run",
              "Il trigger email è disattivato, l'indirizzo appartiene a un altro Flow, oppure il mittente non è nei Mittenti consentiti.",
              "Ricontrolla l'interruttore e l'elenco dei Mittenti consentiti, e copia di nuovo l'indirizzo dal pannello Trigger email.",
            ],
            [
              "Alcuni allegati elaborati, altri no",
              "Quelli mancanti sono di un tipo non supportato, vuoti o illeggibili.",
              "Confronta le estensioni con l'elenco dei file accettati più sopra.",
            ],
            [
              "È stata elaborata solo l'immagine della firma",
              "Il documento vero non era allegato: era un link, oppure l'inoltro lo ha perso.",
              "Inoltra come allegato invece che inline, e verifica che la regola conservi gli allegati.",
            ],
            [
              "Un'email senza allegati non ha prodotto nulla",
              "Elabora il corpo dell'email è disattivato, oppure il corpo non aveva quasi testo.",
              "Attiva Elabora il corpo dell'email nel pannello Trigger email (Flows e Collections).",
            ],
            [
              "Il messaggio di accompagnamento ha prodotto un proprio Run",
              "Elabora il corpo dell'email è impostato su Sempre.",
              "Cambia la modalità in Solo quando non ci sono allegati.",
            ],
            [
              "I Run compaiono ma falliscono",
              "Il problema è il documento stesso, non il percorso via email.",
              "Apri il Run e leggi il suo log; l'errore riguarda l'estrazione.",
            ],
            [
              "I risultati non arrivano mai per email",
              "L'Output email non è configurato, il Run è fallito oppure è in attesa di revisione.",
              "Controlla prima lo stato del Run, poi la configurazione dell'Output email.",
            ],
          ]}
        />
      </DocCard>

      <Related
        links={[
          {
            href: "/docs/collections",
            label: "Instradare automaticamente documenti misti con le Collections",
            description:
              "Punta un indirizzo email verso più Flow e lascia che Tavnit scelga quello giusto per ogni documento.",
          },
          {
            href: "/docs/splitters",
            label: "Dividere i file con più documenti prima dell'estrazione",
            description: "Per i mittenti che raggruppano più documenti in un unico allegato.",
          },
          {
            href: "/docs/webhooks",
            label: "Consegnare i risultati ai tuoi sistemi con i webhook",
            description:
              "L'alternativa leggibile dalle macchine all'Output email, con nuovi tentativi automatici.",
          },
          {
            href: "/docs/api-integration",
            label: "Inviare documenti tramite l'API REST",
            description:
              "Per volumi e dimensioni di file che l'email non può gestire, con una gestione esplicita degli errori.",
          },
        ]}
      />
    </section>
  );
}
