import type { IntegrationsContent } from "@/content/types";

/** Integrations: the /integrations hub (cards included) and /integrations/mcp — Français (fr). */
const fr: IntegrationsContent = {
  hub: {
    title: "Intégrations — API, e-mail, webhooks et MCP",
    description:
      "Toutes les façons de faire entrer des documents dans Tavnit et d’en faire sortir les données : un connecteur MCP pour les assistants IA, une API REST, le transfert d’e-mails, des webhooks et des recettes Zapier, Make et n8n.",
    ogTitle: "Intégrations Tavnit",
    breadcrumbHome: "Accueil",
    h1: "Intégrations",
    intro:
      "Les documents arrivent dans Tavnit de la façon qui convient à l’équipe qui les envoie — déposés dans l’application, transférés à une adresse, envoyés à un endpoint ou demandés par un assistant IA. Les données extraites repartent par les mêmes chemins.",
    introMore:
      "Chaque voie exécute les mêmes flows : le schéma, les règles de nettoyage et les étapes de révision que vous avez configurés s’appliquent quelle que soit la façon dont un document arrive.",
    whichHeading: "Laquelle choisir ?",
    which: [
      "**Si ce sont des personnes qui envoient les documents** — par exemple une boîte comptabilité qui reçoit les factures fournisseurs —, utilisez l’[e-mail](/docs/email-integration). Personne n’a à apprendre un nouvel outil : on transfère comme on le fait déjà.",
      "**Si c’est un système qui les envoie**, utilisez l’[API REST](/docs/api-integration) et recevez les résultats par [webhook](/docs/webhooks). Si vous préférez ne pas écrire le code d’intégration, les mêmes endpoints fonctionnent depuis Zapier, Make, n8n et Power Automate.",
      "**Si vous travaillez avec un assistant IA**, utilisez le [connecteur MCP](/integrations/mcp). Il donne à claude.ai ou à Cursor l’ensemble du pipeline, pas seulement une porte d’entrée : votre assistant peut créer des flows d’extraction, y associer des règles de nettoyage, y faire passer des documents et interroger ce que vous avez déjà extrait — sans que vous ayez à déplacer des fichiers à la main.",
    ],
    finalHeading: "Commencez par un document",
    finalBody:
      "Créez un flow, faites-y passer un document et branchez la livraison une fois le résultat sous les yeux. Des crédits offerts pour commencer.",
    finalCta: "Commencer gratuitement",
  },
  items: [
    {
      label: "Connecteur MCP",
      href: "/integrations/mcp",
      summary:
        "Ajoutez Tavnit à claude.ai, à Cursor ou à tout client MCP. Votre assistant peut créer des flows d’extraction, y associer des règles de nettoyage, y faire passer des documents et interroger les données extraites — le tout par chat.",
      own: true,
    },
    {
      label: "API REST",
      href: "/docs/api-integration",
      summary:
        "Envoyez des documents par programme avec une clé API. Import multipart ou base64, avec des exemples en Python et en JavaScript.",
      own: false,
    },
    {
      label: "E-mail",
      href: "/docs/email-integration",
      summary:
        "Transférez des documents, manuellement ou automatiquement, à une adresse dédiée et chaque pièce jointe est extraite — avec les résultats renvoyés par e-mail à qui en a besoin, sans jamais ouvrir l’application.",
      own: false,
    },
    {
      label: "Webhooks",
      href: "/docs/webhooks",
      summary:
        "Envoyez des résultats typés vers votre propre endpoint dès qu’un run se termine, pour que les données extraites arrivent automatiquement dans vos systèmes.",
      own: false,
    },
    {
      label: "Zapier, Make, n8n et Power Automate",
      href: "/docs/api-integration",
      summary:
        "Des recettes sans code qui appellent les mêmes endpoints, pour les équipes qui préfèrent tout connecter visuellement plutôt qu’écrire du code.",
      own: false,
    },
    {
      label: "Buckets",
      href: "/docs/buckets",
      summary:
        "Conservez les lignes extraites dans un stockage structuré intégré — modifiez-les sur place, interrogez-les, représentez-les en graphiques ou exportez-les en CSV et Excel.",
      own: false,
    },
  ],
  mcp: {
    title: "Extraction de documents par MCP pour Claude et Cursor",
    description:
      "Connectez Tavnit à claude.ai ou à Cursor via MCP. Votre assistant peut créer des flows d’extraction, y faire passer des documents et interroger les résultats — typés et nettoyés.",
    ogTitle: "Serveur MCP pour l’extraction de documents | Tavnit",
    schemaHeadline: "Serveur MCP pour l’extraction de documents — Claude et Cursor",
    schemaName: "Connecteur MCP",
    breadcrumbHome: "Accueil",
    breadcrumbHub: "Intégrations",
    breadcrumbSelf: "Connecteur MCP",
    badge: "Model Context Protocol",
    h1: "Donnez à votre assistant IA un vrai pipeline documentaire",
    lede:
      "Tavnit exploite un serveur MCP. Connectez-le à claude.ai ou à Cursor et votre assistant dispose de tout le pipeline documentaire : il peut créer des flows d’extraction, y associer des règles de nettoyage, y faire passer des documents et en relire les résultats — exactement les champs que vous avez définis, nettoyés et typés, plutôt que son interprétation d’un fichier qu’on lui a confié.",
    ledeMore: "La configuration se résume à une URL à coller dans les paramètres de votre assistant. Pas de SDK, pas de serveur à faire tourner, pas de code.",
    ctaStart: "Commencer gratuitement",
    ctaSetup: "Guide de configuration",
    problemHeading: "Pourquoi les assistants peinent avec les documents",
    problem: [
      "Les assistants IA excellent à raisonner et sont médiocres comme pipeline de données. Confiez-leur une facture scannée et ils la liront — sans doute correctement, parfois non, et différemment la deuxième fois. Il n’y a pas de schéma, donc les noms de champs varient d’une fois à l’autre. Il n’y a pas de validation, donc un total mal lu ressemble trait pour trait à un total juste. Et il ne reste aucune trace de ce qui s’est passé, ce qui pose problème dès que le résultat touche à la comptabilité ou à la conformité.",
      "Cela convient pour une question ponctuelle, mais pas comme processus. Ce dont un assistant a vraiment besoin, c’est d’un outil qui sait déjà lire vos documents.",
    ],
    compareHeading: "Coller un PDF ou appeler un flow",
    compareCapability: "Fonctionnalité",
    compareChat: "Coller le fichier dans le chat",
    compareMcp: "Via le connecteur MCP",
    compareRows: [
      ["Forme du résultat", "Ce que le modèle renvoie cette fois-là", "Les champs définis par votre flow, à chaque fois"],
      ["Noms des champs", "Varient d’une fois à l’autre", "Fixés par votre schéma"],
      ["Règles de nettoyage", "Aucune", "Cleaners appliqués automatiquement"],
      ["Révision humaine", "Impossible", "En option, avec une piste d’audit"],
      ["Destination des résultats", "Dans le chat", "Buckets, webhook, e-mail ou API"],
      ["Reproductible à grande échelle", "Non", "Oui — le même flow, quel que soit le nombre de documents"],
    ],
    capabilitiesHeading: "Ce que votre assistant peut faire une fois connecté",
    capabilities: [
      {
        title: "Créer un flow en le décrivant",
        body: "Dites à l’assistant quoi capturer — fournisseur, dates, totaux, lignes — et il crée le flow d’extraction dans votre organisation, prêt à l’emploi. Monter un pipeline devient un message dans le chat, pas un après-midi de configuration.",
      },
      {
        title: "Associer des règles de nettoyage",
        body: "Demandez des totaux convertis en USD, des dates normalisées ou des valeurs rapprochées de données de référence, et l’assistant crée le Cleaner et l’associe au flow — les mêmes règles s’appliquent ensuite à chaque nouveau document, quelle que soit sa voie d’arrivée.",
      },
      {
        title: "Faire passer un document dans un flow",
        body: "Demandez à l’assistant de traiter une facture, un contrat ou un formulaire avec l’un de vos flows d’extraction. Il renvoie les champs que vous avez définis, typés et nettoyés, et non un paragraphe qui les décrit.",
      },
      {
        title: "Interroger ce que vous avez déjà extrait",
        body: "Posez des questions à vos Buckets — combien vous avez payé tel fournisseur le trimestre dernier, quels contrats se renouvellent le mois prochain — et la réponse vient de vos données à jour, pas de la mémoire du modèle.",
      },
    ],
    askHeading: "Ce que vous pouvez lui demander :",
    ask: [
      "Crée un flow qui capture le fournisseur, les dates, les totaux et les lignes de nos factures de transport.",
      "Ajoute à ce flow un cleaner qui convertit chaque total en USD.",
      "Fais passer cette facture dans mon flow Factures fournisseurs et montre-moi les lignes.",
      "Combien avons-nous payé Acme Corp le trimestre dernier, d’après mon bucket Factures ?",
      "Extrais les dates de renouvellement de ces trois contrats et compare-les.",
      "Quels runs attendent une révision en ce moment ?",
    ],
    fitsHeading: "Il utilise le pipeline que vous avez déjà construit",
    fitsIntro:
      "Le connecteur n’est pas un moteur d’extraction à part. Il appelle les mêmes flows que le reste de Tavnit — que vous les ayez créés dans l’application ou que l’assistant les ait créés pour vous —, si bien que chaque règle configurée s’applique toujours lorsque c’est un assistant qui fait la demande.",
    fits: [
      "Les [Collections](/docs/collections) continuent de classer chaque document entrant et de l’acheminer vers le bon flow.",
      "Les [Cleaners](/docs/cleaners) continuent de standardiser les formats, de convertir les devises et d’appliquer vos tables de correspondance.",
      "La [révision humaine](/docs/human-in-the-loop) continue de mettre un run en pause quand vous l’avez demandé — un assistant ne peut pas contourner votre étape d’approbation.",
      "Les [Buckets](/docs/buckets) continuent de recevoir les résultats : ce que l’assistant extrait reste interrogeable par la suite.",
    ],
    scopeHeading: "Périmètre et accès",
    scopeCards: [
      {
        title: "Vos permissions, rien de plus",
        body: "Le connecteur est émis à partir de votre propre clé API et n’accède qu’à l’organisation dans laquelle vous l’avez généré. L’assistant hérite de votre rôle — il ne peut rien faire que vous ne pourriez faire dans l’application.",
      },
      {
        title: "Traitez l’URL comme un identifiant",
        body: "Toute personne qui détient l’URL du connecteur peut accéder à vos flows et à vos Buckets. Les URL ont une durée de validité limitée, et en régénérer une invalide immédiatement la précédente.",
      },
    ],
    scopeMore:
      "Tous les détails dans la [documentation du connecteur](/docs/mcp-connector) et la [référence des rôles utilisateur](/docs/user-roles). L’endpoint du serveur est `{mcpUrl}`.",
    setupHeading: "Le connecter",
    setupBody:
      "Générez une URL de connecteur sur la page Intégrations de Tavnit, puis collez-la dans claude.ai sous Paramètres → Connecteurs, ou ajoutez-la à Cursor comme serveur MCP distant. Cela prend quelques minutes et ne demande aucun code.",
    setupLink: "Lire le guide de configuration pas à pas",
    faqHeading: "Questions fréquentes",
    faqs: [
      {
        q: "En quoi est-ce différent de coller un PDF dans Claude ?",
        a: "Coller un PDF, c’est demander à l’assistant de lire un document qu’il n’a jamais vu, dans un format qu’il n’est pas conçu pour analyser, sans schéma ni moyen de vérifier le résultat. Le connecteur MCP fait passer le document par un flow d’extraction que vous avez défini : vous obtenez à chaque fois les mêmes champs nommés, dans les mêmes types, avec les mêmes règles de nettoyage et la même étape de révision. L’assistant reçoit des données structurées plutôt qu’une interprétation.",
      },
      {
        q: "L’assistant peut-il créer des flows et des cleaners, ou seulement les exécuter ?",
        a: "Les deux. Via le connecteur, l’assistant peut créer des flows d’extraction et des règles de nettoyage comme vous le feriez dans l’application : décrivez en langage courant les champs, tableaux et transformations souhaités, et ils sont créés dans votre organisation, prêts à s’appliquer à chaque nouveau document. La création suit votre rôle — les propriétaires et les administrateurs peuvent créer, les membres et les lecteurs restent limités à l’exécution ou à la lecture.",
      },
      {
        q: "Quels assistants IA sont compatibles ?",
        a: "claude.ai à partir de l’offre Pro, Cursor, et tout client qui accepte l’URL d’un serveur MCP distant. MCP est un protocole ouvert : la compatibilité ne se limite pas à un éditeur en particulier.",
      },
      {
        q: "Dois-je écrire du code ?",
        a: "Non. Vous générez une URL de connecteur dans Tavnit et la collez dans les paramètres de votre assistant. Créer le flow qu’il appelle se fait aussi sans code — vous décrivez les champs souhaités et Tavnit les extrait.",
      },
      {
        q: "L’assistant peut-il voir tout le compte de mon entreprise ?",
        a: "Non. Le connecteur est émis à partir de votre propre clé API : il n’accède qu’à l’organisation dans laquelle vous étiez connecté, avec les permissions de votre rôle. Un membre ne peut pas faire faire à un assistant ce qu’un membre ne peut pas faire dans l’application, et les Buckets privés restent privés, sauf si l’accès vous a été accordé.",
      },
      {
        q: "L’utilisation du connecteur coûte-t-elle plus cher ?",
        a: "Non. Les documents traités via le connecteur consomment des crédits au tarif normal d’un crédit par page, comme un import dans l’application ou un appel à l’API. L’accès MCP n’est pas facturé à part.",
      },
      {
        q: "Que se passe-t-il quand l’URL du connecteur expire ?",
        a: "Les URL de connecteur ont une durée de validité limitée, et Tavnit indique quand la vôtre a été créée et quand elle expire. La régénérer émet une nouvelle URL et invalide immédiatement la précédente : tout client qui détient encore l’ancienne cesse de fonctionner jusqu’à ce que vous colliez la nouvelle.",
      },
    ],
    finalHeading: "Mettez votre assistant face à de vrais documents",
    finalBody:
      "Créez un flow, générez une URL de connecteur et commencez à poser vos questions. Des crédits offerts pour commencer, sans carte bancaire.",
    finalPricing: "Voir les tarifs",
    finalDemo: "Réserver une démo",
  },
};

export default fr;
