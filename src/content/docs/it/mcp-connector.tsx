import Link from "next/link";
import { Fragment } from "react";
import {
  AlertTriangle,
  Info,
  KeyRound,
  LifeBuoy,
  MessageSquare,
  Plug,
  RefreshCw,
  Settings2,
  Sparkles,
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
import { localizedPath } from "@/lib/routes";
import type { DocsPageSchemaData } from "../types";

/** /it/docs/mcp-connector — translated from src/app/docs/mcp-connector/page.tsx. */

/** Mirrors the numbered steps rendered under "Collegare claude.ai". */
export const schema: DocsPageSchemaData = {
  howTo: {
    name: "Collegare Tavnit a claude.ai con il connettore MCP",
    description:
      "Genera un URL del connettore Tavnit nella pagina Integrazioni e aggiungilo a claude.ai come connettore personalizzato, così il tuo assistente può lavorare con i tuoi dati Tavnit.",
    steps: [
      {
        name: "Apri Integrazioni in Tavnit",
        text: "Accedi all'app Tavnit e apri Integrazioni dalla barra laterale. Verifica di trovarti nell'organizzazione i cui dati l'assistente deve raggiungere.",
      },
      {
        name: "Genera l'URL del connettore",
        text: "Nella scheda Connettore personalizzato, seleziona Genera URL del connettore. Tavnit emette l'URL a partire dalla tua chiave API e mostra quando è stato creato e quando scade.",
      },
      {
        name: "Copia l'URL",
        text: "Copia l'URL del connettore con il pulsante di copia. Trattalo come una password.",
      },
      {
        name: "Aggiungilo come connettore personalizzato in claude.ai",
        text: "In claude.ai vai su Settings, poi Connectors, poi Add custom connector, e incolla l'URL. I connettori personalizzati richiedono un piano Claude Pro o superiore.",
      },
      {
        name: "Conferma la connessione",
        text: "Avvia una nuova chat e chiedi all'assistente quali strumenti Tavnit ha a disposizione. Se li elenca, il connettore è attivo.",
      },
    ],
  },
};

export default function McpConnectorIt() {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        Connettore MCP
      </h1>

      <DocCard icon={<Plug size={24} />} title="Cosa fa il connettore MCP">
        <Lead>
          Il connettore MCP aggiunge la tua organizzazione Tavnit come strumento all&apos;interno di
          un assistente AI. Una volta collegato, puoi fare domande all&apos;assistente sui tuoi dati
          Tavnit in linguaggio naturale, e lui risponde a partire dal tuo account reale invece di
          tirare a indovinare.
        </Lead>
        <p>
          MCP (Model Context Protocol) è lo standard aperto che permette agli assistenti AI di
          chiamare strumenti esterni. Tavnit gestisce un server MCP su{" "}
          <InlineCode>mcp.tavnit.io</InlineCode>, e l&apos;URL del connettore è la credenziale che
          indirizza un client verso la tua organizzazione. Funziona con <strong>claude.ai</strong>{" "}
          (da Pro in su), <strong>Cursor</strong> e qualsiasi altro client che accetti l&apos;URL di
          un server MCP remoto.
        </p>
        <p>
          Per sapere a cosa serve il connettore e come si confronta con l&apos;incollare un file in
          una chat, consulta la{" "}
          <Link href={localizedPath("/integrations/mcp", "it")} className="text-accent hover:underline">
            panoramica del connettore MCP
          </Link>
          .
        </p>
        <InfoBox color="blue" icon={<Info size={20} />} title="Abilitato su richiesta">
          Il connettore viene attivato per organizzazione. Se non vedi la scheda Connettore
          personalizzato nella pagina Integrazioni, contatta il supporto per farlo abilitare per la
          tua organizzazione.
        </InfoBox>
      </DocCard>

      <DocCard icon={<KeyRound size={24} />} title="Prima di iniziare">
        <Lead>
          Ti servono tre cose: un&apos;organizzazione con il connettore abilitato, la tua chiave API
          e un client MCP. Il connettore viene emesso a partire dalla tua chiave, quindi raggiunge
          solo l&apos;organizzazione in cui ti trovavi quando l&apos;hai generato, e l&apos;assistente
          agisce con quella chiave.
        </Lead>
        <DataTable
          head={["Requisito", "Da dove viene"]}
          rows={[
            [
              "Scheda Connettore personalizzato",
              <Fragment key="f0">
                Nella pagina <strong>Integrazioni</strong>, solo quando il connettore è abilitato per
                la tua organizzazione. Chiedi al supporto se manca.
              </Fragment>,
            ],
            [
              "La tua chiave API",
              <Fragment key="f1">
                La scheda <strong>Chiave API</strong> nella stessa pagina: una chiave per membro per
                organizzazione. Se mostra <em>No API key found. Please log in again.</em>, esci e
                accedi di nuovo.
              </Fragment>,
            ],
            [
              "Un client MCP",
              <Fragment key="f2">
                claude.ai con un piano Pro o superiore, Cursor o qualsiasi client che accetti
                l&apos;URL di un server MCP remoto.
              </Fragment>,
            ],
            [
              "Il tuo ruolo",
              <Fragment key="f3">
                L&apos;assistente usa la tua chiave API, quindi può fare solo ciò che può fare la tua
                chiave. Per esempio, una chiave del ruolo <strong>Solo HITL</strong> viene respinta
                dalle richieste di elaborazione. Vedi{" "}
                <DocLink href="/docs/user-roles">ruoli utente</DocLink> e{" "}
                <DocLink href="/docs/api-integration">la pagina dell&apos;API</DocLink>.
              </Fragment>,
            ],
          ]}
        />
      </DocCard>

      <DocCard icon={<Settings2 size={24} />} title="Collegare claude.ai">
        <Lead>
          Genera l&apos;URL in Tavnit, poi incollalo in claude.ai come connettore personalizzato. Non
          c&apos;è nulla da installare né alcun file di configurazione da modificare.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f4">
              Apri <strong>Integrazioni</strong> nella barra laterale di Tavnit. Controlla prima il
              selettore dell&apos;organizzazione: il connettore è legato all&apos;organizzazione in cui
              ti trovi.
            </Fragment>,
            <Fragment key="f5">
              Nella scheda <strong>Connettore personalizzato</strong>, seleziona{" "}
              <strong>Genera URL del connettore</strong>.
            </Fragment>,
            <Fragment key="f6">Copia l&apos;URL con il pulsante di copia.</Fragment>,
            <Fragment key="f7">
              In claude.ai, vai su <strong>Settings → Connectors → Add custom connector</strong> e
              incolla l&apos;URL.
            </Fragment>,
            <Fragment key="f8">
              Apri una nuova chat e chiedi all&apos;assistente quali strumenti Tavnit ha a
              disposizione. Se li elenca, il connettore è attivo.
            </Fragment>,
          ]}
        />
      </DocCard>

      <DocCard icon={<Settings2 size={24} />} title="Collegare Cursor o un altro client MCP">
        <Lead>
          Qualsiasi client che supporti i server MCP remoti accetta lo stesso URL. Aggiungilo come
          server remoto (URL), non come server basato su un comando: non c&apos;è alcun processo
          locale da eseguire, perché il connettore punta a un server ospitato.
        </Lead>
        <NumberedList
          items={[
            "Genera e copia l'URL del connettore dalla pagina Integrazioni, come sopra.",
            <Fragment key="f9">
              In Cursor, apri le impostazioni MCP e aggiungi un nuovo server di tipo{" "}
              <strong>remote</strong> / URL.
            </Fragment>,
            <Fragment key="f10">
              Incolla l&apos;URL del connettore come URL del server. Non serve un campo separato per
              la chiave API: l&apos;URL contiene già la credenziale.
            </Fragment>,
            "Ricarica il client e verifica che Tavnit compaia nel suo elenco di strumenti.",
          ]}
        />
        <InfoBox color="blue" icon={<Info size={20} />} title="Un URL, più client">
          Hai un solo URL del connettore alla volta, e puoi incollarlo in più di un client. Agiscono
          tutti come te nella stessa organizzazione, quindi un aggiornamento li scollega tutti
          contemporaneamente.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Sparkles size={24} />} title="Cosa può fare il tuo assistente">
        <Lead>
          Tramite il connettore, l&apos;assistente lavora con i dati Tavnit della tua organizzazione
          usando la tua chiave API. La creazione e la configurazione di Flows, Cleaners, Pipelines e
          del tuo team restano nell&apos;app.
        </Lead>
        <p>
          Gli strumenti offerti dal connettore sono elencati dal tuo client MCP, e il modo più rapido
          per vederli è chiederlo all&apos;assistente. Chiedi in linguaggio naturale e indica il Flow,
          il Bucket o il Run a cui ti riferisci, con il nome che ha nell&apos;app.
        </p>
        <InfoBox color="blue" icon={<Info size={20} />} title="I tuoi dati, la tua organizzazione">
          Il connettore raggiunge solo l&apos;organizzazione in cui è stato generato. Per lavorare
          con un&apos;altra organizzazione, passa a quella in Tavnit e genera lì un URL. Il lavoro
          avviato dall&apos;assistente segue la tua configurazione come qualsiasi altro Run: se un
          Flow richiede la <DocLink href="/docs/human-in-the-loop">revisione umana</DocLink>, il Run
          la attende comunque.
        </InfoBox>
      </DocCard>

      <DocCard icon={<RefreshCw size={24} />} title="Scadenza e aggiornamento">
        <Lead>
          Gli URL del connettore hanno una durata limitata. La scheda Connettore personalizzato
          mostra quando l&apos;URL è stato creato e quanto tempo gli resta, e ti avvisa nelle ultime
          24 ore. L&apos;aggiornamento emette un nuovo URL e invalida subito quello vecchio.
        </Lead>
        <DataTable
          head={["Stato", "Cosa vedi", "Cosa fare"]}
          rows={[
            [
              "Attivo",
              <Fragment key="s0">L&apos;URL, quando è stato creato e i giorni che mancano alla scadenza.</Fragment>,
              "Niente.",
            ],
            [
              "In scadenza (meno di 24 ore)",
              <Fragment key="f16">
                Il tempo rimanente in ore o minuti e un avviso ambra:{" "}
                <em>Il connettore scade a breve — aggiornalo ora per evitare interruzioni.</em>
              </Fragment>,
              "Aggiornalo, poi incolla il nuovo URL in ogni client che lo usa.",
            ],
            [
              "Scaduto",
              <Fragment key="f17">
                Un avviso rosso:{" "}
                <em>Questo connettore è scaduto. Aggiornalo per generare un nuovo URL.</em>
              </Fragment>,
              "Aggiornalo e incollalo di nuovo. I client che usano il vecchio URL hanno già smesso di funzionare.",
            ],
          ]}
        />
        <p>
          Per aggiornarlo, seleziona <strong>Aggiorna URL</strong> e conferma con{" "}
          <strong>Aggiorna</strong> nella finestra <em>Aggiornare l&apos;URL del connettore?</em>.
        </p>
        <WarningBox>
          L&apos;aggiornamento non è una rotazione che puoi preparare per gradi. Nel momento in cui
          confermi, l&apos;URL precedente smette di funzionare e ogni assistente che lo usa fallisce
          finché non incolli quello nuovo. Aggiornalo quando puoi aggiornare subito i client.
        </WarningBox>
      </DocCard>

      <DocCard icon={<AlertTriangle size={24} />} title="Tratta l'URL come una password">
        <Lead>
          L&apos;URL del connettore è una credenziale. Chiunque lo abbia può raggiungere i dati della
          tua organizzazione a nome tuo, senza accedere. È sicuro incollarlo nelle
          impostazioni di un client MCP; non è sicuro condividerlo in un ticket, in un messaggio di
          chat o in uno screenshot.
        </Lead>
        <BulletList
          items={[
            "Non salvarlo in un repository e non incollarlo in un documento condiviso.",
            "Sfocalo o ritaglialo da qualsiasi screenshot prima di condividerlo.",
            "Se trapela, aggiornalo subito: così l'URL esposto viene invalidato all'istante.",
            "Rigenerare la tua chiave API è un'azione separata nella stessa pagina; fallo anche se pensi che sia esposta la chiave stessa.",
          ]}
        />
      </DocCard>

      <DocCard icon={<LifeBuoy size={24} />} title="Risoluzione dei problemi">
        <Lead>
          La maggior parte dei problemi del connettore rientra in uno di quattro casi: la
          funzionalità non è abilitata, la sessione è scaduta, l&apos;URL è scaduto, oppure il client
          usa un URL che un aggiornamento ha sostituito.
        </Lead>
        <DataTable
          head={["Sintomo", "Causa", "Soluzione"]}
          rows={[
            [
              "Nessuna scheda Connettore personalizzato in Integrazioni",
              "Il connettore non è abilitato per la tua organizzazione.",
              "Contatta il supporto per farlo attivare.",
            ],
            [
              <Fragment key="f18"><InlineCode>I connettori personalizzati richiedono una sessione Tavnit valida. Prova a uscire e accedere di nuovo.</InlineCode></Fragment>,
              "Tavnit non è riuscito a convalidare la tua chiave per emettere o leggere l'URL.",
              "Esci e accedi di nuovo, poi genera di nuovo l'URL.",
            ],
            [
              "L'assistente non vede più Tavnit",
              "L'URL è scaduto, oppure qualcuno lo ha aggiornato.",
              "Controlla se la scheda mostra un avviso di scadenza, aggiornalo e incollalo di nuovo in ogni client.",
            ],
            [
              "L'assistente vede i dati sbagliati",
              "L'URL è stato generato mentre ti trovavi in un'altra organizzazione.",
              "Cambia organizzazione in Tavnit, genera un nuovo URL e sostituisci quello vecchio.",
            ],
            [
              "L'assistente non riesce a eseguire un'azione",
              "Il tuo ruolo non lo consente.",
              "Controlla il tuo ruolo prima di pensare a un guasto del connettore.",
            ],
          ]}
        />
      </DocCard>

      <DocCard icon={<MessageSquare size={24} />} title="Quando usare il connettore invece dell'API">
        <Lead>
          Usa il connettore per il lavoro conversazionale e occasionale: domande una tantum,
          esplorazione dei dati salvati, verifiche rapide. Usa l&apos;API REST per tutto ciò che è
          pianificato, ad alto volume o integrato in un altro sistema, dove servono una gestione
          esplicita degli errori e i nuovi tentativi.
        </Lead>
        <DataTable
          head={["Situazione", "Cosa usare"]}
          rows={[
            ["Un collega chiede quanto ha fatturato un fornitore nell'ultimo trimestre", "Connettore MCP"],
            ["Vuoi esplorare i tuoi dati in una chat", "Connettore MCP"],
            ["Ogni fattura da un portale fornitori, ogni notte", "API REST o un trigger email"],
            ["Il tuo prodotto ha bisogno dei dati estratti", "API REST più webhook"],
          ]}
        />
      </DocCard>

      <Related
        links={[
          {
            href: "/docs/api-integration",
            label: "Riferimento dell'API REST di Tavnit",
            description:
              "Ogni endpoint, con autenticazione tramite chiave API, campi della richiesta, risposte ed esempi in Python e JavaScript.",
          },
          {
            href: "/docs/buckets",
            label: "Salvare i dati estratti nei Buckets",
            description:
              "Le tabelle strutturate in cui vivono i tuoi dati estratti.",
          },
          {
            href: "/docs/user-roles",
            label: "Ruoli utente e permessi",
            description:
              "Cosa possono fare Proprietario, Admin, Membro e Solo HITL.",
          },
        ]}
      />
    </section>
  );
}
