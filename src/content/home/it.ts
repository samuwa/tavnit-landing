import type { HomeCopy } from "@/content/types";

/** Home (components/LocalizedHome.tsx) — Italiano (it). */
const it: HomeCopy = {
  title: "Tavnit — Estrai i dati dai tuoi documenti con l'AI, verificali e mettili al lavoro",
  description:
    "Trasforma fatture, packing list, contratti e moduli in dati strutturati, senza template per ogni fornitore. Il tuo team verifica e approva prima che venga registrato qualsiasi dato. API, email e MCP.",
  schemaName: "Tavnit",
  breadcrumbHome: "Home",
  readInEnglish: "Read this page in English",
  eyebrow: "Operazioni documentali con l'AI",
  h1: "Estrai i dati dai tuoi documenti con l'AI, verificali con il tuo team e mettili al lavoro",
  lede:
    "Tavnit trasforma fatture, packing list, contratti e moduli in dati strutturati, senza template per ogni fornitore. Il tuo team verifica e approva prima che venga registrato qualsiasi dato, e i dati approvati arrivano ai tuoi sistemi via API, webhook o email.",
  ctaDemo: "Prenota una demo",
  ctaTry: "Provalo gratis",
  ids: { howItWorks: "how-it-works", useCases: "use-cases", integrations: "integrations", faq: "faq" },
  problemHeading: "Il problema",
  problems: [
    "Gli stessi campi, ridigitati ogni mese da cento layout diversi. Ogni fornitore impagina la fattura a modo suo, e qualcuno del tuo team la ricopia a mano in un foglio di calcolo o nel gestionale.",
    "Gli OCR basati su template funzionano finché un fornitore non cambia layout, e poi falliscono senza avvisare. Gli strumenti per “chattare con il PDF” si inventano i numeri e non offrono revisione, audit trail né un modo per portare i dati nei tuoi sistemi.",
    "Un totale sbagliato sembra identico a uno giusto. Il vero costo non sono le ore di inserimento dati: è l'errore che finisce nella contabilità o nella dichiarazione doganale senza che nessuno se ne accorga.",
  ],
  stepsHeading: "Come funziona: estrai, verifica, agisci",
  steps: [
    {
      title: "Estrai",
      body: "Definisci una sola volta i campi che ti servono (numero fattura, fornitore, righe con quantità e prezzo) e Tavnit li estrae da qualsiasi PDF, scansione o foto, qualunque sia il layout. Nessun template per fornitore.",
    },
    {
      title: "Verifica",
      body: "I Cleaner puliscono e convalidano: formati di data, valute, calcoli di riga, confronti con le tue anagrafiche. Tutto ciò che non torna si ferma e passa a un revisore designato. Ogni azione resta registrata in un audit trail non modificabile.",
    },
    {
      title: "Agisci",
      body: "I dati approvati arrivano al tuo ERP o al gestionale contabile via API o webhook, vengono salvati in un Bucket interrogabile, compilano moduli PDF o alimentano un agente che lavora per te su un portale web.",
    },
  ],
  useCasesHeading: "Casi d'uso",
  useCasesIntro:
    "Ogni pagina spiega quali campi contano in quel tipo di documento e cosa tende ad andare storto: ciò che rende un tipo di documento più difficile di un altro.",
  useCasesAll: "Vedi tutti i {count} casi d'uso",
  integrationsHeading: "Funziona con gli strumenti che usi già",
  integrations: [
    "Email: inoltra il PDF a un indirizzo Tavnit e ricevi i dati in risposta. Zero integrazione.",
    "API REST e webhook: invia i documenti dal tuo sistema e ricevi i risultati appena sono pronti. Ricette per Zapier, Make, n8n e Power Automate.",
    "Connettore MCP: collega Tavnit a claude.ai o Cursor e chiedi al tuo assistente di elaborare documenti o di interrogare i dati estratti.",
    "Bucket: archivio strutturato integrato che puoi interrogare in linguaggio naturale e trasformare in grafici, senza esportare nulla.",
  ],
  integrationsAll: "Tutte le integrazioni",
  faqHeading: "Domande frequenti",
  faqs: [
    {
      q: "Devo creare un template per ogni fornitore?",
      a: "No. Definisci i campi una sola volta in un Flow e Tavnit li trova in qualsiasi layout. Se un fornitore cambia il formato della fattura, non devi fare nulla.",
    },
    {
      q: "Come evito che un valore sbagliato finisca nel mio sistema?",
      a: "Con la revisione umana. Puoi richiedere l'approvazione su ogni documento, oppure solo quando una regola del Cleaner rileva qualcosa, per esempio che quantità per prezzo unitario non corrisponde al totale di riga. Il revisore vede il documento e i dati estratti, corregge o approva, e ogni azione resta registrata nell'audit trail.",
    },
    {
      q: "Come invio i documenti?",
      a: "Come preferisci: inoltra l'email con il PDF allegato a un indirizzo Tavnit, caricali nell'app o inviali via API. I risultati escono via webhook, API o email, oppure vengono salvati in un Bucket che puoi interrogare e visualizzare in grafici.",
    },
    {
      q: "Funziona nella mia lingua?",
      a: "Sì. Tavnit estrae documenti scritti in qualsiasi lingua e puoi restituire i dati con i nomi di campo usati dal tuo sistema. L'app stessa è disponibile in diverse lingue.",
    },
    {
      q: "Quanto costa?",
      a: "Il prezzo si basa sui crediti: 1 credito corrisponde a 1 pagina elaborata. Prenota una demo e valuteremo insieme il tuo volume e i tuoi documenti reali.",
    },
  ],
  finalHeading: "Provalo su uno dei tuoi documenti",
  finalBody:
    "Porta una fattura o una packing list reale. Nella demo costruiamo insieme il tuo primo Flow e vedi i dati uscire in diretta.",
};

export default it;
