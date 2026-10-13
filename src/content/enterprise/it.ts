import type { EnterpriseCopy } from "@/content/types";

/** Enterprise services (/enterprise) — Italiano (it). */
const it: EnterpriseCopy = {
  title: "Servizi Enterprise — Implementazione, controllo e consulenza aziendale",
  description:
    "Tavnit Enterprise: contratti alle tue condizioni, implementazione affiancata, ruoli utente e audit trail, supporto diretto e Business Advisory per ottimizzare i processi di digitalizzazione dei documenti e inserimento dati.",
  home: "Home",
  breadcrumbLabel: "Percorso di navigazione",
  crumb: "Enterprise",
  eyebrow: "Tavnit Enterprise",
  h1: "Servizi Enterprise",
  lead:
    "Per le organizzazioni che elaborano un grande volume di documenti o hanno bisogno di condizioni su misura: un contratto, un aiuto concreto per portare Tavnit in produzione e una consulenza sul processo che lo circonda, oltre alla piattaforma.",
  servicesHeading: "Cosa include Enterprise",
  services: [
    {
      title: "Contratto alle tue condizioni",
      body: "Volume, condizioni commerciali e pagamento definiti in un contratto dimensionato sui tuoi documenti, invece di un piano self-service.",
    },
    {
      title: "Implementazione affiancata",
      body: "Configuriamo con te Flow, Cleaner, regole di revisione e integrazioni (API, webhook, email) sui tuoi documenti reali, e li lasciamo operativi in produzione.",
    },
    {
      title: "Controllo e audit",
      body: "Ruoli utente, incluso un ruolo di sola revisione, revisione umana condizionale e un audit trail non modificabile di ogni visualizzazione, modifica e approvazione.",
      links: [
        { label: "Ruoli utente", href: "/docs/user-roles" },
        { label: "Revisione umana", href: "/docs/human-in-the-loop" },
      ],
    },
    {
      title: "Supporto diretto",
      body: "Una linea diretta con il team che sviluppa il prodotto, in inglese e in spagnolo.",
    },
  ],
  advisory: {
    eyebrow: "Business Advisory",
    heading: "Business Advisory",
    subheading: "Ottimizzazione dei processi di digitalizzazione dei documenti e inserimento dati",
    intro:
      "Oltre alla piattaforma, offriamo consulenza alle aziende che vogliono riordinare e migliorare il modo in cui ricevono, digitalizzano e registrano le informazioni contenute nei loro documenti, che il risultato finale venga automatizzato con Tavnit oppure no.",
    scopeHeading: "Cosa comprende",
    scope: [
      { title: "Analisi del processo attuale", body: "Quali documenti arrivano, attraverso quali canali e in che volume; chi li inserisce, quanto tempo richiede e da dove nascono gli errori." },
      { title: "Digitalizzazione", body: "Criteri di scansione e acquisizione, organizzazione e denominazione dei file, separazione dei lotti misti e tracciabilità degli originali." },
      { title: "Inserimento dati", body: "Quali campi servono davvero, formati standard per date, importi e valute, convalide e confronti con le anagrafiche." },
      { title: "Controlli", body: "Dove serve la revisione umana, separazione dei compiti e l'audit trail che un revisore contabile o un'autorità di vigilanza ti chiederà." },
      { title: "Integrazione", body: "Come i dati arrivano al tuo ERP, alla contabilità o ai fogli di calcolo, e quali passaggi conviene automatizzare e quali no." },
      { title: "Avvio e formazione", body: "Un piano di implementazione per fasi e la formazione per chi inserisce, verifica e utilizza i dati." },
    ],
    deliverablesHeading: "Cosa ricevi",
    deliverables:
      "Un'analisi scritta del processo attuale, il disegno del processo proposto con i relativi controlli e un piano di implementazione per fasi con indicatori per misurare il risultato: tempo di inserimento per documento, tasso di correzione, documenti in attesa di revisione.",
  },
  ctaHeading: "Parliamone",
  ctaBody: "Raccontaci dei tuoi documenti e del tuo volume, e ti diremo quale di questi servizi fa al caso tuo.",
  ctaButton: "Prenota un incontro",
  ctaEmail: "oppure scrivi a",
};

export default it;
