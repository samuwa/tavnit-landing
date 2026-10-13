import type { LiteLocaleCopy } from "@/lib/lite/copy-base";

/**
 * Free tools copy — Français (fr), translated from ./en.ts.
 *
 * One file per language: `base` is one complete tool written with document
 * tokens ({doc}, {a_doc}, {Doc}…, filled from each tool's `vocab`; {limit}
 * is the daily quota); `tools` supplies each tool's words and only the
 * strings that differ from the base; `hub`, `shell` and `related` are the
 * hub page, the Lite header/footer and the "when it is every document" block;
 * `og` is the subtitle of each tool's social card. Assembled by
 * src/lib/lite/copy.ts. Column names, flows and samples are NOT here: they
 * belong to the engine (src/lib/lite/defs, engineLocale()).
 *
 * French grammar and the tokens: the document words differ in gender
 * (facture, devis…), so the base never puts an adjective or a pronoun on a
 * token, writes "d'{a_doc}" / "d'{another_doc}" (every value starts with
 * "un"/"une") and never puts "de" or "à" before {the_doc} / {the_docs}.
 */

const INVOICE_VOCAB = {
  doc: "facture",
  docs: "factures",
  a_doc: "une facture",
  the_doc: "la facture",
  the_docs: "les factures",
  your_doc: "votre facture",
  your_docs: "vos factures",
  all_your_docs: "toutes vos factures",
  all_docs: "toutes les factures",
  each_doc: "chaque facture",
  another_doc: "une autre facture",
  this_doc: "cette facture",
};

const SPREADSHEET_VOCAB = {
  doc: "feuille de calcul",
  docs: "feuilles de calcul",
  a_doc: "une feuille de calcul",
  the_doc: "la feuille de calcul",
  the_docs: "les feuilles de calcul",
  your_doc: "votre feuille de calcul",
  your_docs: "vos feuilles de calcul",
  all_your_docs: "toutes vos feuilles de calcul",
  all_docs: "toutes les feuilles de calcul",
  each_doc: "chaque feuille de calcul",
  another_doc: "une autre feuille de calcul",
  this_doc: "cette feuille de calcul",
};

const copy: LiteLocaleCopy = {
  base: {
    title: "{Doc} en Excel, gratuit : l'IA extrait les lignes de {your_doc}",
    description:
      "Envoyez {a_doc} en PDF ou en photo et récupérez ses lignes dans un tableau Excel : désignation, quantité, prix unitaire et total. Gratuit, sans modèle, sans inscription pour voir le résultat.",
    label: "{Doc} en Excel",
    h1: "Convertissez {a_doc} en Excel",
    intro:
      "Envoyez le PDF ou la photo. Tavnit lit l'en-tête et chaque ligne du tableau, puis vous le rend sous forme de feuille de calcul. Pas de modèle par fournisseur : le même outil fonctionne pour {all_your_docs}.",
    trust: ["PDF, JPG ou PNG · jusqu'à 5 pages", "{limit} documents gratuits par jour", "Tout est supprimé au bout de 24 h"],
    drop: {
      title: "Déposez {your_doc} ici",
      hint: "ou choisissez un fichier sur votre ordinateur",
      choose: "Choisir un fichier",
      sample: "Essayer avec {a_doc} d'exemple",
      formats: "PDF, JPG ou PNG · jusqu'à 4 Mo et 5 pages",
    },
    stages: [
      "Envoi du document",
      "Lecture de l'en-tête",
      "Recherche du tableau des lignes",
      "Mise en ordre des colonnes",
      "Presque terminé",
    ],
    result: {
      heading: "Terminé : {file}",
      rowWord: ["ligne", "lignes"],
      pageWord: ["page", "pages"],
      summary: "{rows} · {pages}",
      truncated: "{shown} lignes affichées sur {total}. L'Excel contient les mêmes {shown}.",
      readyIn: "prêt en {s} s",
      sum: "Somme",
      viewer: "Votre document",
      openDocument: "Voir le document",
      closeDocument: "Fermer",
      retention: "supprimé automatiquement au bout de 24 h",
      hideColumn: "Retirer la colonne",
      hiddenCols: ["1 colonne retirée. L'Excel ne la contiendra pas.", "{n} colonnes retirées. L'Excel ne les contiendra pas."],
      restoreAll: "Tout restaurer",
      restoreOne: "Restaurer {col}",
      ghostColumn: "+ Votre champ",
      ghostHint: "Dans Tavnit, vous ajoutez les champs que vous voulez : numéro de bon de commande, date d'échéance, centre de coûts…",
      flowNote: "Ces {fields} colonnes sont les champs d'un Flow de {doc} fixe. Dans votre compte, c'est vous qui choisissez les champs.",
      flowNoteCta: "Voir comment",
      download: "Télécharger l'Excel",
      downloading: "Préparation du fichier",
      another: "Traiter {another_doc}",
      empty: "Nous n'avons trouvé aucun tableau de lignes dans ce document. Essayez avec {a_doc} qui indique des quantités et des prix par ligne.",
    },
    errors: {
      empty: "Le fichier est vide.",
      too_large: "Le fichier dépasse 4 Mo. Compressez-le ou n'envoyez que les pages utiles de {your_doc}.",
      unsupported: "Seuls les fichiers PDF, JPG ou PNG sont acceptés.",
      unreadable: "Impossible d'ouvrir ce PDF. S'il est protégé par un mot de passe, retirez-le et réessayez.",
      too_many_pages: "La version gratuite traite jusqu'à 5 pages par document.",
      captcha: "Nous n'avons pas pu vérifier que vous n'êtes pas un robot. Rechargez la page et réessayez.",
      quota: "Vous avez utilisé vos {limit} documents gratuits du jour. Ils reviennent demain, ou créez un compte pour continuer.",
      daily_cap: "L'outil gratuit a atteint sa capacité pour aujourd'hui. Revenez demain, ou créez un compte pour continuer dès maintenant.",
      unavailable: "L'outil n'est pas disponible pour le moment. Réessayez dans quelques minutes.",
      backend: "Une erreur s'est produite pendant le traitement du document. Réessayez.",
      failed: "Nous n'avons pas pu extraire ce document. Essayez avec {another_doc}, ou avec l'exemple.",
      timeout: "Cela prend plus de temps que d'habitude. Patientez un instant et réessayez.",
      forbidden: "Cette action n'est pas autorisée depuis cette page.",
      bad_request: "Le fichier est manquant ou illisible.",
    },
    auth: {
      title: "Créez un compte gratuit pour télécharger",
      body: "L'Excel se télécharge immédiatement. Avec un compte, vous pouvez aussi traiter {all_your_docs} d'un seul coup.",
      google: "Continuer avec Google",
      or: "ou avec votre e-mail",
      signin: "Se connecter",
      signup: "Créer un compte",
      name: "Nom",
      email: "E-mail",
      password: "Mot de passe",
      submitSignin: "Se connecter et télécharger",
      submitSignup: "Créer le compte et télécharger",
      switchToSignin: "J'ai déjà un compte",
      switchToSignup: "Je n'ai pas encore de compte",
      checkEmail:
        "Nous vous avons envoyé un e-mail pour confirmer le compte. Ouvrez-le : à votre retour, l'Excel sera prêt à télécharger.",
      existing: "Un compte existe déjà avec cet e-mail. Connectez-vous pour télécharger.",
      forgot: "Mot de passe oublié",
      close: "Fermer",
      generic: "L'inscription n'a pas abouti. Vérifiez l'e-mail et le mot de passe, puis réessayez.",
    },
    next: {
      heading: "Et ensuite ?",
      lead: "Vous venez de traiter {a_doc}. Avec un compte, il se passe la même chose pour {each_doc} qui arrive, et les lignes ne s'arrêtent pas à un Excel : elles poursuivent leur chemin toutes seules.",
      source: "{Your_doc}",
      node: "Tavnit",
      nodeSub: "Flow d'extraction",
      items: [
        {
          short: "Dans votre boîte mail",
          via: "e-mail",
          title: "Le résultat arrive dans votre boîte mail",
          body: "À la fin de l'extraction, Tavnit envoie un e-mail aux adresses définies sur le Flow, avec les lignes en pièce jointe dans rows.csv. Si la révision est activée, l'e-mail attend l'approbation.",
          linkLabel: "Sortie par e-mail",
          href: "/docs/email-integration",
          scene: [{ label: "L'extraction se termine" }, { label: "Tavnit rédige l'e-mail" }, { label: "Il parvient aux destinataires choisis", result: "rows.csv en pièce jointe" }],
        },
        {
          short: "Dans votre ERP",
          via: "webhook",
          title: "Directement dans votre ERP par webhook",
          body: "À la fin d'une exécution, Tavnit envoie un POST avec les lignes et le run_id à l'URL que vous indiquez. Zapier, Make et n8n le reçoivent avec leur déclencheur webhook ; aucune intégration native nécessaire.",
          linkLabel: "Webhooks",
          href: "/docs/webhooks",
          scene: [{ label: "Les lignes extraites" }, { label: "Un POST avec les lignes et le run_id" }, { label: "Elles apparaissent dans votre système", result: "6 lignes, zéro saisie" }],
        },
        {
          short: "Révision avant envoi",
          via: "révision",
          title: "Une personne valide avant l'envoi",
          body: "Activez la révision sur le Flow et chaque exécution se met en pause. Le réviseur voit le tableau modifiable à côté du document d'origine : il corrige des cellules, exclut des lignes, ajoute des colonnes, puis approuve ou rejette. L'e-mail, le webhook et le Bucket ne partent qu'après approbation, et chaque décision est tracée. Un rôle dédié à la révision existe pour les personnes qui ne doivent rien voir d'autre.",
          linkLabel: "Révision humaine",
          href: "/docs/human-in-the-loop",
          scene: [{ label: "L'exécution attend la révision" }, { label: "Une personne corrige à côté du document" }, { label: "Approuvé : alors seulement, envoyé", result: "1 cellule corrigée · tracée" }],
        },
        {
          short: "Comparer des devis",
          via: "Matcher",
          title: "Comparer plusieurs devis ligne par ligne",
          body: "Un Matcher prend plusieurs exécutions d'un même Flow, par exemple trois devis fournisseurs, apparie les lignes par désignation et signale la moins chère de chaque ligne dans une colonne Champion.",
          linkLabel: "Devis fournisseurs",
          href: "/use-cases/supplier-quotes",
          scene: [{ label: "Trois devis, un seul Flow" }, { label: "Le Matcher apparie les lignes" }, { label: "Colonne Champion : le meilleur par ligne", result: "Le fournisseur B gagne 4 lignes sur 5" }],
        },
        {
          short: "Règles et contrôles",
          via: "Cleaner",
          title: "Un Cleaner nettoie et vérifie chaque ligne",
          body: "Format de date, format des nombres, champs calculés, conversion de devises aux taux publiés et actions conditionnelles : quand une ligne ne passe pas, elle part en révision, par e-mail ou par webhook.",
          linkLabel: "Cleaners",
          href: "/docs/cleaners",
          scene: [{ label: "Les données telles qu'elles arrivent" }, { label: "Le Cleaner applique vos règles" }, { label: "Propres, anomalies signalées", result: "date, nombres et somme en ordre" }],
        },
        {
          short: "Un Agent ouvre le portail",
          via: "Agent",
          title: "Un Agent se connecte au portail fournisseur",
          body: "Vous rédigez la mission en langage courant, avec une URL de départ et des identifiants rangés dans un coffre que le modèle ne voit jamais. À la fin de l'extraction, l'Agent démarre tout seul avec les champs du document et rapporte ce que vous avez demandé, typé : prix, délai, fichiers.",
          linkLabel: "Agents",
          href: "/docs/agents",
          scene: [{ label: "L'extraction se termine" }, { label: "L'Agent parcourt le portail" }, { label: "Il rapporte les données, typées", result: "prix 18,50 · délai 5 jours" }],
        },
        {
          short: "Interroger vos données",
          via: "Bucket",
          title: "Posez des questions sur {your_docs}",
          body: "Les lignes sont stockées dans un Bucket. Vous posez votre question en langage courant ; Tavnit la transforme en plan (somme, filtre, mois), l'exécute sur la base de données et répond avec le chiffre. Le modèle ne fait jamais le calcul.",
          linkLabel: "Buckets",
          href: "/docs/buckets",
          scene: [{ label: "« Combien avons-nous acheté à Istmo en août ? »" }, { label: "Un plan : somme · fournisseur · mois" }, { label: "Le chiffre, calculé dans la base", result: "12 480 $ sur 4 {docs}" }],
        },
      ],
      hint: "Touchez une option, ou la puce Tavnit, pour voir ce qui se passe.",
      flow: {
        title: "Le Flow : c'est vous qui décidez des colonnes",
        body: "Un Flow définit un type de document : la liste des champs à extraire, chacun avec un nom, un type de donnée et l'indication s'il apparaît une fois par document ou une fois par ligne, plus un indice sur l'endroit où chercher si besoin. Activez-le, et chaque document reçu est lu pour exactement ces champs ; le tableau obtenu compte une colonne par champ. Cet outil utilise un Flow de {doc} fixe avec {fields} champs. Dans votre compte, vous ajoutez, supprimez et renommez des champs, et créez des Flows pour n'importe quel autre document. Pas de modèles, pas de coordonnées.",
        linkLabel: "Comment se définit un Flow",
        href: "/docs/flows",
        scene: [{ label: "Vous définissez les champs en deux groupes : document et tableau" }, { label: "Il lit l'en-tête une fois et le tableau ligne par ligne" }, { label: "Une ligne par article : les valeurs du document se répètent, celles du tableau changent", result: "5 champs → 5 colonnes" }],
        name: "{Doc}",
        kinds: ["Champs du document", "Champs du tableau"],
        add: { name: "purchase_order", type: "Texte", hint: "À côté de « BC » · ex. PO-2291", save: "Enregistrer", value: "PO-2291" },
        activate: "Actif",
      },
      inputs: {
        show: "Par où arrive {your_doc} ?",
        hide: "Masquer les entrées",
        items: [
          {
            short: "Par e-mail",
            via: "une adresse par Flow",
            title: "Transférez l'e-mail, c'est tout",
            body: "Chaque Flow a sa propre adresse, du type <flow>-lite-<id>@mg.tavnit.io. Transférez l'e-mail avec {the_doc} en pièce jointe : chaque pièce jointe devient une exécution. L'objet et le corps du message ne sont jamais lus.",
            linkLabel: "Réception par e-mail",
            href: "/docs/email-integration",
            scene: [{ label: "Vous transférez l'e-mail avec la pièce jointe" }, { label: "Il arrive à l'adresse du Flow" }, { label: "Chaque pièce jointe devient une exécution", result: "1 pièce jointe → 1 exécution" }],
          },
          {
            short: "Envoi manuel",
            via: "depuis l'application",
            title: "Envoyez-le depuis l'application",
            body: "Déposez le PDF ou la photo sur le Flow et l'exécution démarre aussitôt. Exactement comme ici, avec votre compte et sans limite quotidienne.",
            linkLabel: "Flows",
            href: "/docs/flows",
            scene: [{ label: "Vous déposez le fichier sur le Flow" }, { label: "L'exécution démarre" }, { label: "Les lignes en quelques secondes", result: "comme ici, sans plafond" }],
          },
          {
            short: "API",
            via: "POST /api/runs/process",
            title: "Depuis votre système, par l'API",
            body: "Un POST sur /api/runs/process avec le fichier et le flow_id, authentifié par votre clé API. La réponse est un 202 avec le run_id ; vous faites un GET sur /api/runs/<id> jusqu'à ce que le statut soit completed et que les lignes reviennent.",
            linkLabel: "API",
            href: "/docs/api-integration",
            scene: [{ label: "POST avec le fichier et le flow_id" }, { label: "202 : run_id, en file d'attente" }, { label: "GET jusqu'à completed", result: "status: completed · 6 lignes" }],
          },
          {
            short: "Zapier · Make · n8n",
            via: "un appel HTTP",
            title: "Depuis Zapier, Make ou n8n",
            body: "Pas d'application native, et pas besoin : une étape HTTP (Custom Request dans Zapier, Make a request dans Make) envoie le fichier à /api/runs/process. Les lignes reviennent par webhook dans le déclencheur du même outil.",
            linkLabel: "Intégrations",
            href: "/integrations",
            scene: [{ label: "Une étape HTTP dans votre scénario" }, { label: "Tavnit le traite" }, { label: "Le webhook renvoie les lignes", result: "de retour dans Zapier, Make ou n8n" }],
          },
          {
            short: "Plusieurs dans un PDF",
            via: "un Splitter les sépare",
            title: "Plusieurs documents dans un seul PDF",
            body: "Un Splitter repère où commence chaque document, classe chaque segment selon les types que vous décrivez et l'envoie à son Flow. Un scan contenant trois {docs} donne trois exécutions.",
            linkLabel: "Splitters",
            href: "/docs/splitters",
            scene: [{ label: "Un PDF avec trois {docs}" }, { label: "Le Splitter découpe et classe" }, { label: "Trois exécutions, une par {doc}", result: "3 segments · 3 exécutions" }],
          },
        ],
      },
      replay: "Rejouer",
      tryIt: "Essayer dans Tavnit",
      tryItSignedIn: "Le faire dans mon compte",
      primary: "Créer un compte gratuit",
      primarySignedIn: "Aller sur Tavnit",
      sameLogin: "Vous avez déjà un compte. Connectez-vous à Tavnit avec les mêmes identifiants ({email}) ; ils vous seront redemandés une fois, car il s'agit d'un autre site.",
      secondary: "Réserver une démo",
    },
    cleaners: {
      heading: "Avec un Cleaner, vous pourriez…",
      lead: "Des règles simples qui s'appliquent toutes seules à {each_doc} après l'extraction. Quatre idées avec vos propres données :",
      tag: "Cleaners",
      ideas: [
        { icon: "date", title: "Une seule façon d'écrire la date", from: "{date}", to: "{iso}", note: "{each_doc} au même format" },
        { icon: "sum", title: "Les lignes doivent égaler le sous-total", from: "lignes {sum}", to: "sous-total {subtotal}", note: "si ça ne correspond pas, personne ne paie sans vérifier", check: "sum" },
        { icon: "money", title: "Convertir dans votre devise", from: "{total} {currency}", to: "votre devise", note: "au taux en vigueur à la date de {this_doc}" },
        { icon: "approve", title: "Approbation au-delà d'un montant", from: "total {total}", to: "approuver avant de payer", note: "quand il dépasse {threshold}" },
      ],
      ok: "Correspond",
      off: "À vérifier",
      outro: "Les Cleaners se créent dans Tavnit avec les champs qui comptent pour vous. Ce ne sont que des exemples.",
      cta: "Créer un compte gratuit et les essayer",
      ctaSignedIn: "Ouvrir Tavnit et les essayer",
      learn: "Qu'est-ce qu'un Cleaner",
    },
    after: {
      title: "Votre Excel est prêt",
      lead: "Il provient d'un Flow fixe avec {fields} champs. Dans votre compte, c'est vous qui choisissez les champs, et voici à quoi cela ressemble quand Tavnit s'occupe de {each_doc} :",
      close: "Fermer",
      saved: "enregistré dans vos téléchargements",
    },
    how: {
      heading: "Comment ça marche",
      steps: [
        {
          title: "Envoyez {the_doc}",
          body: "PDF, photo ou scan. N'importe quel fournisseur, n'importe quelle langue, n'importe quelle mise en page.",
        },
        {
          title: "Tavnit lit le document",
          body: "Il repère l'en-tête (fournisseur, numéro, date, totaux) et le tableau des lignes avec quantités et prix.",
        },
        {
          title: "Vérifiez et téléchargez",
          body: "Le tableau s'affiche à l'écran. Avec un compte gratuit, vous l'emportez en Excel.",
        },
      ],
    },
    faqHeading: "Questions fréquentes",
    faqs: [
      {
        q: "Que comprend la version gratuite ?",
        a: "{limit} documents par jour, avec le résultat complet à l'écran. Pour télécharger l'Excel, il faut un compte Tavnit, qui est gratuit.",
      },
      {
        q: "Quels formats sont acceptés ?",
        a: "PDF (texte ou scanné), JPG et PNG, jusqu'à 4 Mo et 5 pages. Si votre document est plus long, envoyez-le en plusieurs parties ou créez un compte.",
      },
      {
        q: "Puis-je choisir d'autres colonnes ?",
        a: "Pas ici : cet outil utilise un Flow de {doc} fixe avec 13 champs. Dans votre compte, vous créez vos propres Flows, pour des {docs} ou tout autre document, avec les champs dont vous avez besoin : par document (numéro de bon de commande, date d'échéance, centre de coûts) ou par ligne (code produit, remise). Pas de modèles : vous décrivez le champ et, si besoin, vous indiquez où le chercher.",
      },
      {
        q: "Faut-il configurer un modèle par fournisseur ?",
        a: "Non. Tavnit n'utilise pas de modèles : il lit chaque document tel qu'il arrive, même si le fournisseur change la mise en page de ses {docs} demain.",
      },
      {
        q: "Que devient mon fichier ?",
        a: "Il est traité dans un compte Tavnit réservé aux outils gratuits et n'est utilisé à rien d'autre. Au bout de 24 heures, le fichier et les lignes extraites sont supprimés automatiquement ; nous ne gardons que la trace qu'une exécution a eu lieu, sans le document ni son contenu. Si vous voulez qu'il disparaisse plus tôt, écrivez à support@tavnit.io.",
      },
      {
        q: "Pourquoi faut-il un compte pour télécharger ?",
        a: "Parce que la version gratuite sert à essayer. Avec un compte, vous lancez la même extraction sur {all_your_docs}, vous les recevez par e-mail et vous envoyez le résultat vers votre système.",
      },
      {
        q: "Ça marche avec des {docs} de n'importe quel pays ?",
        a: "Oui. L'outil lit des {docs} en anglais, en espagnol, en français et dans d'autres langues, avec ou sans détail des taxes. Il est testé, entre autres, sur des {docs} des États-Unis, du Panama, du Mexique et de Colombie.",
      },
      {
        q: "Comment automatiser tout ça ?",
        a: "Créez un compte, construisez un Flow avec les champs voulus et transférez vos {docs} à son adresse e-mail, ou connectez-le par l'API, des webhooks, Zapier, Make ou n8n. Le résultat arrive dans votre ERP ou dans Google Sheets, sans aucune saisie.",
      },
    ],
  },

  hub: {
    title: "Outils IA gratuits pour vos documents : facture en Excel et plus",
    description:
      "Des outils gratuits à usage unique, construits sur le moteur de Tavnit : convertissez une facture en Excel, et bien plus. Sans modèle, sans inscription pour voir le résultat.",
    h1: "Outils gratuits",
    intro:
      "Chaque outil fait une seule chose sur un seul document et vous montre le vrai résultat. Ils tournent sur le moteur que les entreprises utilisent pour automatiser leurs documents avec Tavnit, un document à la fois.",
    breadcrumbHome: "Accueil",
    breadcrumbHub: "Outils",
    groups: { extract: "Document en Excel", compare: "Comparer des documents", split: "Organiser des scans", clean: "Nettoyer des tableurs" },
    outro: "Tous tournent sur le moteur que les entreprises utilisent pour automatiser leurs documents avec Tavnit. Quand vous voulez que tout se fasse tout seul, pour tous vos documents, votre compte est là.",
    outroCta: "Créer un compte gratuit",
  },

  shell: {
    lite: "Lite",
    tools: "Outils",
    site: "À propos de Tavnit",
    cta: "Créer un compte gratuit",
    ctaSignedIn: "Aller sur Tavnit",
    nav: { product: "Produit", useCases: "Cas d'usage", docs: "Docs" },
    demo: "Réserver une démo",
    signin: "Se connecter",
    allTools: "Voir tous les outils",
    allToolsHint: "Gratuits. Voyez le vrai résultat sans inscription ; emportez-le avec un compte.",
    groups: { extract: "Document en Excel", compare: "Comparer des documents", split: "Organiser des scans", clean: "Nettoyer des tableurs" },
    account: {
      signedInAs: "Connecté en tant que",
      open: "Aller sur Tavnit",
      openHint: "La plateforme complète : Flows, automatisations et tout votre volume",
      signOut: "Se déconnecter",
      menu: "Votre compte",
    },
    auth: {
      title: "Créez votre compte gratuit",
      body: "Le même compte télécharge vos résultats ici et automatise tous vos documents dans Tavnit.",
      submitSignin: "Se connecter",
      submitSignup: "Créer un compte",
    },
    menu: "Menu",
    close: "Fermer",
    privacy: "Confidentialité",
    terms: "Conditions",
    contact: "Contact",
    rights: "Tavnit. Des outils gratuits construits sur le moteur du produit.",
  },

  related: {
    heading: "Quand il s'agit de tous vos documents, pas d'un seul",
    lead: "Cet outil traite un document à la fois. Le même moteur peut les recevoir par e-mail ou par API, les faire passer par la révision de votre équipe et les livrer dans vos systèmes.",
    useCase: "Comment l'automatiser :",
    guide: "Guide :",
  },

  tools: {
    /** Invoice → Excel. The base copy was written for this tool, so only the
     *  words — plus a <title> short enough not to be cut in search results. */
    "invoice-to-excel": {
      vocab: INVOICE_VOCAB,
      overrides: { title: "Convertir une facture en Excel, gratuit : l'IA lit les lignes" },
    },
    /**
     * Invoice line item extractor. Same Flow and the same words as invoice →
     * Excel; a different page, written for the people who search "line item
     * extraction": what a line item is, one row per line, the header repeated
     * on every row, and what to do with the rows afterwards.
     */
    "invoice-line-items": {
      vocab: INVOICE_VOCAB,
      overrides: {
        title: "Extracteur gratuit de lignes de facture : lignes vers Excel",
        description:
          "Extrayez les lignes d'une facture (désignation, quantité, prix unitaire et montant) en lignes Excel, avec le fournisseur, le numéro et la date sur chaque ligne. PDF ou photo, sans modèle, sans inscription pour voir le résultat.",
        label: "Extracteur de lignes de facture",
        h1: "Extrayez les lignes d'une facture",
        intro:
          "Chaque ligne du tableau de la facture (désignation, quantité, unité, prix unitaire et montant) devient une ligne, et l'en-tête (fournisseur, numéro, date, totaux) est répété sur chacune. C'est sous cette forme que la comptabilité fournisseurs a besoin des lignes pour les comptabiliser, les rapprocher ou les contrôler par rapport à un bon de commande. Fonctionne avec les PDF, les scans et les photos, sans modèle par fournisseur.",
        drop: {
          title: "Déposez la facture dont vous voulez les lignes",
          sample: "Essayer avec une facture de six lignes",
        },
        stages: [
          "Envoi de la facture",
          "Lecture de l'en-tête",
          "Détection du tableau des lignes",
          "Découpage de chaque ligne",
          "Presque terminé",
        ],
        result: {
          flowNote: "Ces {fields} colonnes sont les champs d'un Flow de facture fixe : en-tête et lignes. Dans votre compte, c'est vous qui choisissez les champs.",
        },
        how: {
          heading: "Comment ça marche",
          steps: [
            {
              title: "Envoyez la facture",
              body: "PDF texte, scan ou photo. Une page ou plusieurs, jusqu'à 5.",
            },
            {
              title: "Tavnit découpe les lignes",
              body: "Il trouve le tableau même sans bordures, lit chaque ligne (désignation, quantité, unité, prix, montant) et y rattache l'en-tête.",
            },
            {
              title: "Vérifiez et téléchargez",
              body: "Une ligne par article à l'écran. Avec un compte gratuit, vous l'emportez en Excel, sans les colonnes dont vous n'avez pas besoin.",
            },
          ],
        },
        faqs: [
          {
            q: "Qu'est-ce qu'une ligne de facture ?",
            a: "Chaque ligne du tableau de détail : un produit ou un service avec sa désignation, sa quantité, son unité, son prix unitaire et son montant. Les totaux de bas de page (sous-total, TVA, total) ne sont pas des lignes ; ils sortent comme des champs d'en-tête répétés sur chaque ligne.",
          },
          {
            q: "Pourquoi le fournisseur et le numéro apparaissent-ils sur chaque ligne ?",
            a: "Pour que chaque ligne se suffise à elle-même : vous pouvez filtrer, additionner ou coller les lignes de nombreuses factures dans une même feuille sans perdre leur facture d'origine. C'est la forme qu'attendent un ERP, un tableau croisé dynamique ou un rapprochement.",
          },
          {
            q: "Ça marche quand le tableau s'étend sur plusieurs pages ?",
            a: "Oui. Tavnit suit le tableau d'une page à l'autre et renvoie toutes les lignes dans l'ordre, sans reprendre l'en-tête des colonnes comme s'il s'agissait d'une ligne. La version gratuite traite jusqu'à 5 pages.",
          },
          {
            q: "Et les désignations sur plusieurs lignes ou les cellules fusionnées ?",
            a: "Une désignation qui continue sur la ligne suivante est rattachée à sa ligne ; une cellule fusionnée s'applique aux lignes qu'elle couvre. Nous ne dépendons pas des traits du tableau, mais de la lecture de la quantité, du prix et du montant qui correspondent à chaque désignation.",
          },
          {
            q: "Comment sont traitées les remises et les taxes par ligne ?",
            a: "Le montant de chaque ligne sort tel qu'il est imprimé. Une remise ou une taxe que la facture affiche sur sa propre ligne ne devient pas une ligne d'article ; elle est traitée comme un total du document. Si vos factures détaillent la TVA par ligne, un compte vous permet d'ajouter ce champ au Flow.",
          },
          {
            q: "Puis-je contrôler les lignes par rapport à mon bon de commande ?",
            a: "Oui, avec le contrôle gratuit bon de commande vs facture (/tools/po-vs-invoice-check) : envoyez les deux documents et il signale les lignes dont le prix ou la quantité diffère, les lignes manquantes et les lignes ajoutées.",
          },
          {
            q: "Faut-il un modèle par fournisseur ?",
            a: "Non. Tavnit lit chaque facture telle qu'elle arrive ; si le fournisseur la refait demain, ça marche toujours. C'est aussi pour cela qu'il traite aussi bien des factures de pays et de langues différents.",
          },
          {
            q: "Comment faire pour des centaines de factures ?",
            a: "Avec un compte, vous créez un Flow avec ces mêmes champs (ou les vôtres) et transférez les factures à son adresse e-mail, ou vous les envoyez par l'API. Chaque facture ressort en lignes dans votre ERP, dans Google Sheets ou dans un Bucket, sans aucune saisie.",
          },
        ],
      },
    },
    /**
     * PO vs invoice check. Two documents through one "purchase document" Flow,
     * then the Matcher pairs every PO line with the invoice line that means the
     * same thing and the page shows the differences: price, quantity, missing
     * on the invoice, not on the PO. The base's document word stays "facture"
     * because that is what the shared blocks (email intake, review, agents…)
     * talk about; everything the visitor sees first is overridden here.
     */
    "po-invoice-check": {
      vocab: INVOICE_VOCAB,
      overrides: {
        title: "Contrôle gratuit bon de commande vs facture, ligne par ligne",
        description:
          "Envoyez le bon de commande et la facture : Tavnit les rapproche ligne par ligne. Écarts de prix, écarts de quantité, lignes absentes de la facture et lignes hors bon de commande. Gratuit, sans modèle, sans inscription pour voir le résultat.",
        label: "Contrôle bon de commande vs facture",
        h1: "Contrôlez une facture par rapport à son bon de commande",
        intro:
          "Envoyez le bon de commande et la facture, en PDF ou en photo. Tavnit lit les deux, associe chaque ligne du bon de commande à la ligne de facture qui désigne la même chose, même quand le libellé diffère, et signale où le prix a changé, où la quantité a changé, ce qui manque sur la facture et ce qui n'a jamais figuré sur le bon de commande.",
        trust: ["Un bon de commande et une facture · PDF ou photo", "{limit} documents gratuits par jour", "Tout est supprimé au bout de 24 h"],
        drop: {
          title: "Déposez le document ici",
          sample: "Essayer avec un bon de commande et une facture d'exemple",
          formats: "PDF, JPG ou PNG · jusqu'à 4 Mo et 5 pages par document",
        },
        stages: ["Envoi des documents", "Lecture du bon de commande", "Lecture de la facture", "Appariement des lignes", "Presque terminé"],
        result: {
          another: "Comparer d'autres documents",
          download: "Télécharger la comparaison en Excel",
          flowNote: "Ces {fields} colonnes sont les champs d'un Flow fixe de documents d'achat. Dans votre compte, c'est vous qui choisissez les champs.",
          ghostHint: "Dans Tavnit, vous ajoutez les champs que vous voulez : centre de coûts, numéro de bon de réception, projet…",
        },
        errors: {
          no_lines: "Nous n'avons trouvé aucune ligne avec quantités et prix dans l'un des deux documents. Vérifiez qu'il s'agit bien d'un bon de commande et d'une facture avec un tableau d'articles.",
          not_ready: "Nous lisons encore les documents. Patientez un instant et réessayez.",
          failed: "Nous n'avons pas pu lire l'un des documents. Essayez avec d'autres fichiers, ou avec les exemples.",
          too_large: "L'un des fichiers dépasse 4 Mo. Compressez-le ou n'envoyez que les pages utiles du document.",
        },
        next: {
          lead: "Vous venez de contrôler un bon de commande et une facture. Avec un compte, chaque facture qui arrive est contrôlée toute seule par rapport à son bon de commande, et le résultat ne s'arrête pas à un Excel : il poursuit son chemin.",
          source: "Votre bon de commande et votre facture",
          flow: {
            name: "Document d'achat",
            add: { name: "receipt_number", type: "Texte", hint: "À côté de « Réception » · ex. REC-1187", save: "Enregistrer", value: "REC-1187" },
          },
          inputs: { show: "Par où arrivent vos documents ?" },
        },
        cleaners: {
          heading: "Avec un Cleaner, vous pourriez…",
          lead: "Des règles simples qui s'appliquent toutes seules à chaque contrôle. Quatre idées :",
          ideas: [
            { icon: "alert", title: "Bloquer la facture si un prix augmente de plus de 2 %", from: "prix BC 22,40", to: "facture 23,90", note: "l'écart est signalé avant que quiconque le paie" },
            { icon: "approve", title: "Approbation quand la quantité diffère", from: "BC 300 unités", to: "facture 280", note: "les achats confirment une livraison partielle ou une erreur" },
            { icon: "mail", title: "Envoyer les écarts aux achats par e-mail", from: "contrôle terminé", to: "e-mail à achats@", note: "seulement s'il y a quelque chose à vérifier" },
            { icon: "sum", title: "Total facture vs total bon de commande", from: "BC 5 189,07", to: "facture 4 960,63", note: "si ça ne correspond pas, elle est bloquée avant comptabilisation" },
          ],
          outro: "Les Cleaners se créent dans Tavnit avec les champs qui comptent pour vous. Ce ne sont que des exemples.",
        },
        after: {
          lead: "Il provient d'un Flow fixe avec {fields} champs et d'un Matcher. Dans votre compte, c'est vous qui choisissez les champs, et voici à quoi cela ressemble quand Tavnit contrôle chaque facture qui arrive :",
        },
        how: {
          heading: "Comment ça marche",
          steps: [
            { title: "Envoyez les deux documents", body: "Le bon de commande et la facture, en PDF ou en photo. N'importe quel fournisseur, n'importe quelle langue, n'importe quelle mise en page." },
            { title: "Tavnit les lit avec un seul Flow", body: "L'en-tête (numéro, date, fournisseur, totaux) et chaque ligne avec sa quantité et son prix, sur les deux." },
            { title: "Le Matcher apparie les lignes", body: "Chaque ligne du bon de commande est associée à la ligne de facture qui désigne la même chose, et le prix et la quantité sont comparés. Avec votre compte, vous emportez la comparaison en Excel." },
          ],
        },
        faqs: [
          {
            q: "Que comprend la version gratuite ?",
            a: "{limit} documents par jour (un contrôle en utilise deux), avec le résultat complet à l'écran. Pour télécharger la comparaison en Excel, il faut un compte Tavnit, qui est gratuit.",
          },
          {
            q: "Comment apparie-t-il les lignes quand le libellé n'est pas identique ?",
            a: "Un Matcher Tavnit compare les désignations par leur sens, pas lettre par lettre : « Long grain rice 20 lb » et « RICE L/GRAIN PREMIUM 20LB » sont la même ligne. Quand deux désignations sont proches mais ambiguës, une seconde étape décide s'il s'agit du même article.",
          },
          {
            q: "Quelle tolérance applique-t-il sur les prix ?",
            a: "Un prix est signalé comme différent s'il varie de plus de 0,5 % ou de plus d'un centime. Les quantités sont comparées à l'identique. Avec votre compte, vous fixez votre propre tolérance avec un Cleaner.",
          },
          {
            q: "Que signifient « Absente de la facture » et « Hors bon de commande » ?",
            a: "« Absente de la facture » désigne une ligne du bon de commande que le fournisseur n'a pas facturée (livraison partielle ou en attente). « Hors bon de commande » désigne une ligne facturée que personne n'a commandée sur ce bon de commande.",
          },
          {
            q: "Puis-je faire un rapprochement à trois voies avec le bon de réception ?",
            a: "Pas ici : la version gratuite compare deux documents. Avec votre compte, vous ajoutez le bon de réception comme troisième document du même Flow et le Matcher contrôle les trois, ou vous créez des règles de Cleaner pour que la facture ne soit pas comptabilisée tant que la réception ne correspond pas.",
          },
          {
            q: "Quels formats sont acceptés ?",
            a: "PDF (texte ou scanné), JPG et PNG, jusqu'à 4 Mo et 5 pages par document. Ça marche avec des bons de commande issus d'un ERP et des factures de n'importe quel fournisseur.",
          },
          {
            q: "Que deviennent mes fichiers ?",
            a: "Ils sont traités dans un compte Tavnit réservé aux outils gratuits et ne sont utilisés à rien d'autre. Au bout de 24 heures, les fichiers et la comparaison sont supprimés ; nous ne gardons que la trace qu'une exécution a eu lieu, sans les documents ni leur contenu.",
          },
          {
            q: "Comment automatiser tout ça ?",
            a: "Créez un compte, construisez un Flow pour vos documents d'achat et un Matcher par-dessus. Les factures arrivent par e-mail ou par API, sont rapprochées de leur bon de commande, et les écarts partent par e-mail, par webhook ou vers votre ERP, sans aucune saisie.",
          },
        ],
        compare: {
          slots: [
            { title: "Bon de commande", hint: "PDF ou photo du bon de commande", sample: "Bon de commande d'exemple" },
            { title: "Facture", hint: "PDF ou photo de la facture", sample: "Facture d'exemple" },
          ],
          run: "Comparer",
          sampleAll: "Essayer avec un bon de commande et une facture d'exemple",
          stages: ["Lecture du bon de commande et de la facture", "Tri des lignes", "Le Matcher apparie les lignes", "Presque terminé"],
          heading: "Comparaison prête",
          summary: "{n} · {ref} vs {doc}",
          labels: {
            description: "Désignation",
            quantity: "Qté",
            price: "Prix",
            total: "Total",
            status: "Statut",
            ref: "BC",
            doc: "Facture",
            supplier: "Fournisseur",
            champion: "Champion",
            wins: "{n} lignes gagnées",
            lines: ["ligne", "lignes"],
          },
          status: {
            ok: "Correspond",
            price: "Prix différent",
            qty: "Quantité différente",
            both: "Prix et quantité différents",
            missing: "Absente de la facture",
            extra: "Hors bon de commande",
          },
          empty: "Nous n'avons pu apparier aucune ligne. Vérifiez que les deux documents comportent un tableau d'articles avec quantités et prix.",
          another: "Comparer d'autres documents",
          download: "Télécharger la comparaison en Excel",
        },
      },
    },
    /**
     * Split a scanned PDF into its documents. The one Lite tool that is a
     * Splitter, not a Flow: the result is a list of documents, each with its
     * page range and type, downloadable one by one or as a zip. The shared
     * blocks (auth, errors, the "and then what?" outcomes) stay; what talks
     * about rows and columns is overridden here.
     */
    "split-scanned-pdf": {
      vocab: {
        doc: "PDF scanné",
        docs: "PDF scannés",
        a_doc: "un PDF scanné",
        the_doc: "le PDF",
        the_docs: "les PDF",
        your_doc: "votre PDF",
        your_docs: "vos PDF",
        all_your_docs: "tous vos PDF",
        all_docs: "tous les PDF",
        each_doc: "chaque PDF",
        another_doc: "un autre PDF",
        this_doc: "ce PDF",
      },
      overrides: {
        title: "Séparer un PDF scanné en documents, gratuit (IA)",
        description:
          "Envoyez un PDF contenant plusieurs documents scannés ensemble (factures, bons de commande, reçus, contrats) et récupérez chaque document séparément, classé par type. Gratuit, sans marquer les pages.",
        label: "Séparer un PDF scanné",
        h1: "Séparez un PDF scanné en ses documents",
        intro:
          "Vous avez passé dix feuilles dans le scanner et obtenu un seul PDF. Envoyez-le : Tavnit lit chaque page, repère où commence chaque document et vous les rend un par un, chacun avec son type (facture, bon de commande, reçu, liste de colisage, connaissement, contrat…). Pas de découpage par nombre de pages, rien à marquer à la main.",
        trust: ["Un PDF · jusqu'à 12 pages", "{limit} documents gratuits par jour", "Tout est supprimé au bout de 24 h"],
        drop: {
          title: "Déposez votre PDF scanné ici",
          hint: "un PDF qui contient plusieurs documents",
          choose: "Choisir un fichier",
          sample: "Essayer avec un scan d'exemple",
          formats: "PDF · jusqu'à 4 Mo et 12 pages",
        },
        stages: ["Envoi du PDF", "Lecture de chaque page", "Recherche du début de chaque document", "Classement", "Presque terminé"],
        result: {
          retention: "supprimé automatiquement au bout de 24 h",
          downloading: "Préparation du fichier",
          another: "Séparer un autre PDF",
          empty: "Nous n'avons pas trouvé plus d'un document dans ce PDF.",
          flowNote: "Ces types appartiennent au Splitter fixe de cet outil. Dans votre compte, c'est vous qui définissez les types.",
        },
        errors: {
          too_large: "Le fichier dépasse 4 Mo. Compressez-le ou coupez le scan en deux.",
          too_many_pages: "La version gratuite sépare jusqu'à 12 pages par PDF. Avec un compte, il n'y a pas de limite.",
          unsupported: "Nous n'acceptons que les fichiers PDF, JPG ou PNG. Pour séparer des documents, envoyez le PDF issu du scanner.",
          failed: "Nous n'avons pas pu séparer ce PDF. Essayez avec un autre scan, ou avec l'exemple.",
          empty: "Le fichier est vide.",
        },
        next: {
          lead: "Vous venez de séparer un PDF. Avec un compte, chaque document découpé par le Splitter part vers son propre Flow : la facture vers l'extraction de factures, le bon de commande vers la sienne, le reçu vers la note de frais. Plus personne ne trie ni ne classe à la main.",
          source: "Votre PDF",
          flow: {
            title: "Du Splitter au Flow : chaque document vers son extraction",
            body: "Un Splitter repère où commence chaque document et le classe selon les types que vous décrivez avec des mots. Cet outil utilise un Splitter fixe avec huit types et aucune sortie : il se contente de vous rendre les documents. Dans votre compte, vous définissez vos propres types et, pour chacun, sa destination : un Flow qui extrait ses champs (comme ci-dessous, avec {fields} champs), un e-mail ou une Collection. Pas de modèles, pas de coordonnées.",
            linkLabel: "Comment fonctionne un Splitter",
            href: "/docs/splitters",
          },
          inputs: {
            show: "Par où arrive votre PDF ?",
          },
        },
        cleaners: {
          heading: "Après la séparation, dans Tavnit…",
          lead: "Chaque type de document peut avoir sa propre destination, sans que personne ne trie à la main. Quatre exemples :",
          ideas: [
            { icon: "text", title: "Chaque facture vers son Flow, puis vers l'ERP", from: "facture (p. 1–2)", to: "Flow Facture → ERP", note: "extraite et comptabilisée sans intervention" },
            { icon: "mail", title: "Les reçus vers la note de frais", from: "reçu (p. 5)", to: "frais@votreentreprise", note: "chaque reçu parvient à qui le rapproche" },
            { icon: "calendar", title: "Les contrats vers l'archive juridique, avec leurs dates", from: "contrat (p. 6–7)", to: "Flow Contrat", note: "échéance et renouvellement, dans un seul tableau" },
            { icon: "alert", title: "Une alerte quand un document n'est pas reconnu", from: "page non classée", to: "révision humaine", note: "rien ne se perd, rien n'est mal rangé" },
          ],
          outro: "Les destinations se règlent dans Tavnit pour chaque type de document. Ce ne sont que des exemples.",
          cta: "Créer un compte gratuit et le configurer",
          ctaSignedIn: "Ouvrir Tavnit et le configurer",
          learn: "Qu'est-ce qu'un Splitter",
        },
        after: {
          title: "Vos documents sont prêts",
          lead: "Ils proviennent d'un Splitter fixe avec huit types. Dans votre compte, vous définissez les types, et chaque document part tout seul vers son Flow :",
          close: "Fermer",
        },
        how: {
          heading: "Comment ça marche",
          steps: [
            { title: "Envoyez le scan", body: "Un PDF qui contient plusieurs documents, tel qu'il sort du scanner. N'importe quel ordre, n'importe quel nombre de pages par document." },
            { title: "Tavnit le sépare et le classe", body: "Il lit chaque page, détecte où commence chaque document et lui attribue un type : facture, bon de commande, reçu, liste de colisage, connaissement, contrat, avoir ou autre." },
            { title: "Téléchargez chaque document", body: "Vous voyez la liste avec les plages de pages et les types. Avec un compte gratuit, vous emportez chaque PDF séparément, ou tous dans un zip." },
          ],
        },
        faqs: [
          {
            q: "Comment sait-il où un document se termine et où le suivant commence ?",
            a: "L'IA regarde toutes les pages ensemble, comme le ferait une personne : changements d'en-tête, d'entreprise, de numérotation, de mise en page. Elle ne compte pas les pages et ne cherche pas de repères, et c'est pour cela que ça marche quand une facture fait deux pages et le reçu une seule.",
          },
          {
            q: "Quels types de documents reconnaît-il ?",
            a: "Ici, huit : facture, bon de commande, reçu, liste de colisage, connaissement, contrat, avoir et autre. Avec un compte, vous définissez vos propres types en les décrivant avec des mots, et pour chacun vous choisissez sa destination : un Flow qui extrait ses données, un e-mail ou une Collection.",
          },
          {
            q: "Que comprend la version gratuite ?",
            a: "{limit} documents par jour, avec le résultat complet à l'écran. Pour télécharger les PDF séparés, il faut un compte Tavnit, qui est gratuit.",
          },
          {
            q: "Combien de pages puis-je envoyer ?",
            a: "Jusqu'à 12 pages par PDF dans la version gratuite, jusqu'à 4 Mo. Avec un compte, il n'y a pas de limite de pages et vous pouvez envoyer vos scans par e-mail directement au Splitter.",
          },
          {
            q: "Ça marche avec des scans de mauvaise qualité ou des langues mélangées ?",
            a: "Oui. L'outil gère les scans de travers, en niveaux de gris ou tamponnés, et des documents en anglais, en espagnol ou dans d'autres langues mélangés dans le même PDF. Si une page est illisible, elle est marquée comme non classée plutôt que de recevoir un type inventé.",
          },
          {
            q: "Que devient mon fichier ?",
            a: "Il est traité dans un compte Tavnit réservé aux outils gratuits et n'est utilisé à rien d'autre. Au bout de 24 heures, le PDF et les documents séparés sont supprimés automatiquement ; nous ne gardons que la trace qu'une exécution a eu lieu, sans le fichier ni son contenu. Si vous voulez qu'il disparaisse plus tôt, écrivez à support@tavnit.io.",
          },
          {
            q: "Pourquoi faut-il un compte pour télécharger ?",
            a: "Parce que la version gratuite sert à essayer. Avec un compte, vous séparez tous vos scans, envoyez chaque document vers son Flow et recevez les données extraites dans votre ERP ou par e-mail.",
          },
          {
            q: "Comment automatiser tout ça ?",
            a: "Créez un compte, construisez un Splitter avec vos types de documents et transférez vos scans à son adresse e-mail, ou connectez-le par l'API. Chaque document découpé part tout seul vers son Flow, et de là vers votre ERP, Google Sheets ou une boîte mail.",
          },
        ],
        split: {
          heading: "Terminé : {file}",
          summary: "{n} sur {pages}",
          segmentWord: ["document", "documents"],
          pageWord: ["page", "pages"],
          pages: "p. {from}–{to}",
          pageOne: "p. {from}",
          unmatched: "Non classé",
          type: "Type",
          reason: "Pourquoi",
          download: "Télécharger",
          downloadAll: "Tout télécharger (zip)",
          stages: ["Envoi du PDF", "Lecture de chaque page", "Recherche du début de chaque document", "Classement", "Presque terminé"],
          empty: "Nous n'avons pas trouvé plus d'un document dans ce PDF.",
          another: "Séparer un autre PDF",
        },
      },
    },
    /**
     * Packing list → Excel. Shipment header (shipper, consignee, ports, totals)
     * once per document and one row per goods line with packages, net and gross
     * weight and dimensions. Everything not overridden here comes from the base
     * copy with the words below filled in.
     */
    "packing-list-to-excel": {
      vocab: {
        doc: "liste de colisage",
        docs: "listes de colisage",
        a_doc: "une liste de colisage",
        the_doc: "la liste de colisage",
        the_docs: "les listes de colisage",
        your_doc: "votre liste de colisage",
        your_docs: "vos listes de colisage",
        all_your_docs: "toutes vos listes de colisage",
        all_docs: "toutes les listes de colisage",
        each_doc: "chaque liste de colisage",
        another_doc: "une autre liste de colisage",
        this_doc: "cette liste de colisage",
      },
      overrides: {
        title: "Liste de colisage en Excel, gratuit : l'IA extrait chaque ligne",
        description:
          "Envoyez une liste de colisage (packing list) en PDF ou en photo et récupérez chaque ligne dans un tableau Excel : désignation, quantité, colis, poids net et brut, dimensions, avec l'expéditeur, le destinataire et les ports. Gratuit, sans modèle, sans inscription pour voir le résultat.",
        label: "Liste de colisage en Excel",
        h1: "Convertissez une liste de colisage en Excel",
        intro:
          "Envoyez le PDF ou la photo. Tavnit lit l'en-tête de l'expédition (expéditeur, destinataire, ports, totaux) et chaque ligne de marchandise avec ses colis, ses poids et ses dimensions, puis vous le rend sous forme de feuille de calcul. Pas de modèle par fournisseur : le même outil fonctionne pour les listes de colisage de toutes vos expéditions.",
        drop: {
          title: "Déposez votre liste de colisage ici",
          sample: "Essayer avec une liste de colisage d'exemple",
        },
        stages: ["Envoi du document", "Lecture de l'en-tête de l'expédition", "Recherche des lignes de marchandise", "Mise en ordre des colonnes", "Presque terminé"],
        result: {
          empty: "Nous n'avons trouvé aucune ligne de marchandise dans ce document. Essayez avec une liste de colisage qui indique des colis, des poids ou des quantités par ligne.",
          flowNote: "Ces {fields} colonnes sont les champs d'un Flow de liste de colisage fixe. Dans votre compte, c'est vous qui choisissez les champs.",
          ghostHint: "Dans Tavnit, vous ajoutez les champs que vous voulez : conteneur, marques, code SH, numéro de connaissement…",
        },
        next: {
          lead: "Vous venez de traiter une liste de colisage. Avec un compte, il se passe la même chose pour chaque liste de colisage qui arrive, et les lignes ne s'arrêtent pas à un Excel : elles poursuivent leur chemin toutes seules.",
          source: "Votre liste de colisage",
          flow: {
            name: "Liste de colisage",
            add: { name: "container", type: "Texte", hint: "À côté de « Conteneur » · ex. MSKU-4417", save: "Enregistrer", value: "MSKU-4417" },
          },
          inputs: { show: "Par où arrive votre liste de colisage ?" },
        },
        cleaners: {
          lead: "Des règles simples qui s'appliquent toutes seules à chaque liste de colisage après l'extraction. Quatre idées avec vos propres données :",
          ideas: [
            { icon: "date", title: "Une seule façon d'écrire la date", from: "{date}", to: "{iso}", note: "chaque liste de colisage au même format" },
            { icon: "alert", title: "Le poids brut doit dépasser le net", from: "net > brut", to: "à vérifier", note: "une ligne inversée n'est jamais déclarée sans contrôle" },
            { icon: "calendar", title: "Une alerte avant le départ", from: "date d'expédition", to: "rappel 2 jours avant", note: "à votre commissionnaire en douane et à la logistique" },
            { icon: "mail", title: "Copie au commissionnaire en douane", from: "liste de colisage extraite", to: "e-mail avec l'Excel", note: "avec la facture correspondante" },
          ],
        },
        after: {
          lead: "Il provient d'un Flow fixe avec {fields} champs. Dans votre compte, c'est vous qui choisissez les champs, et voici à quoi cela ressemble quand Tavnit s'occupe de chaque liste de colisage :",
        },
        how: {
          steps: [
            { title: "Envoyez la liste de colisage", body: "PDF, photo ou scan. N'importe quel expéditeur, n'importe quelle langue, n'importe quelle mise en page." },
            {
              title: "Tavnit lit le document",
              body: "Il repère l'en-tête (expéditeur, destinataire, ports, totaux) et le tableau des marchandises avec les colis, le poids net, le poids brut et les dimensions de chaque ligne.",
            },
            { title: "Vérifiez et téléchargez", body: "Le tableau s'affiche à l'écran. Avec un compte gratuit, vous l'emportez en Excel." },
          ],
        },
        faqs: [
          {
            q: "Que comprend la version gratuite ?",
            a: "{limit} documents par jour, avec le résultat complet à l'écran. Pour télécharger l'Excel, il faut un compte Tavnit, qui est gratuit.",
          },
          {
            q: "Quels formats sont acceptés ?",
            a: "PDF (texte ou scanné), JPG et PNG, jusqu'à 4 Mo et 5 pages. Si votre liste de colisage est plus longue, envoyez-la en plusieurs parties ou créez un compte.",
          },
          {
            q: "Quelles colonnes extrait-il d'une liste de colisage ?",
            a: "Par document : expéditeur, destinataire, numéro, date, facture associée, port de chargement, port de déchargement et totaux de colis et de poids. Par ligne : désignation, quantité, unité, colis, poids net, poids brut et dimensions. Les valeurs du document se répètent sur chaque ligne pour que le tableau se filtre tout seul.",
          },
          {
            q: "Puis-je choisir d'autres colonnes ?",
            a: "Pas ici : cet outil utilise un Flow de liste de colisage fixe avec 17 champs. Dans votre compte, vous créez vos propres Flows, pour des listes de colisage ou tout autre document, avec les champs dont vous avez besoin : par document (conteneur, scellé, numéro de connaissement, incoterm) ou par ligne (marques, code SH, volume). Pas de modèles : vous décrivez le champ et, si besoin, vous indiquez où le chercher.",
          },
          {
            q: "Ça marche avec des listes de colisage de n'importe quel pays ?",
            a: "Oui. L'outil lit des listes de colisage en anglais, en espagnol et dans d'autres langues, avec des poids en kg ou en lb et des dimensions en cm ou en pouces, exactement comme ils sont imprimés. Il est testé, entre autres, sur des expéditions du Panama, de Colombie, du Mexique, de Chine et des États-Unis.",
          },
          {
            q: "Faut-il configurer un modèle par fournisseur ?",
            a: "Non. Tavnit n'utilise pas de modèles : il lit chaque document tel qu'il arrive, même si l'expéditeur change la mise en page de sa liste de colisage demain.",
          },
          {
            q: "Que devient mon fichier ?",
            a: "Il est traité dans un compte Tavnit réservé aux outils gratuits et n'est utilisé à rien d'autre. Au bout de 24 heures, le fichier et les lignes extraites sont supprimés automatiquement ; nous ne gardons que la trace qu'une exécution a eu lieu, sans le document ni son contenu. Si vous voulez qu'il disparaisse plus tôt, écrivez à support@tavnit.io.",
          },
          {
            q: "Comment automatiser tout ça ?",
            a: "Créez un compte, construisez un Flow avec les champs voulus et transférez vos listes de colisage à son adresse e-mail, ou connectez-le par l'API, des webhooks, Zapier, Make ou n8n. Chaque expédition arrive dans votre système douanier, votre ERP ou Google Sheets, sans aucune saisie.",
          },
        ],
      },
    },
    /**
     * Bill of lading → Excel. The words ("connaissement"; B/L as the trade
     * abbreviation) and everything that is specific to an ocean B/L: header
     * fields, one row per container line, customs and forwarder use cases.
     */
    "bill-of-lading-to-excel": {
      vocab: {
        doc: "connaissement",
        docs: "connaissements",
        a_doc: "un connaissement",
        the_doc: "le connaissement",
        the_docs: "les connaissements",
        your_doc: "votre connaissement",
        your_docs: "vos connaissements",
        all_your_docs: "tous vos connaissements",
        all_docs: "tous les connaissements",
        each_doc: "chaque connaissement",
        another_doc: "un autre connaissement",
        this_doc: "ce connaissement",
      },
      overrides: {
        title: "Connaissement (B/L) en Excel, gratuit : extrayez ses données",
        description:
          "Envoyez un connaissement (B/L) en PDF ou en photo et récupérez ses données dans un tableau Excel : numéro de B/L, transporteur, chargeur, destinataire, navire, ports, et une ligne par conteneur avec scellé, marchandise, colis, poids et volume. Gratuit, sans modèle, sans inscription pour voir le résultat.",
        label: "Connaissement en Excel",
        h1: "Convertissez un connaissement en Excel",
        intro:
          "Envoyez le PDF ou la photo du B/L. Tavnit lit l'en-tête (numéro de B/L, transporteur, chargeur, destinataire, navire, voyage, ports, date de mise à bord) et chaque ligne de cargaison avec son conteneur, son scellé, ses colis, son poids brut et son volume, puis vous le rend sous forme de feuille de calcul. Pas de modèle par transporteur : le même Flow lit MSC, Maersk, Hapag-Lloyd ou n'importe quel NVOCC.",
        drop: {
          title: "Déposez votre connaissement ici",
          sample: "Essayer avec un B/L d'exemple",
        },
        stages: ["Envoi du document", "Lecture de l'en-tête du B/L", "Recherche des lignes de cargaison", "Mise en ordre des colonnes", "Presque terminé"],
        result: {
          empty: "Nous n'avons trouvé aucune ligne de cargaison dans ce document. Essayez avec un connaissement qui comporte le tableau des conteneurs et des marchandises.",
          flowNote: "Ces {fields} colonnes sont les champs d'un Flow de connaissement fixe. Dans votre compte, c'est vous qui choisissez les champs.",
          ghostHint: "Dans Tavnit, vous ajoutez les champs que vous voulez : incoterm, lieu de livraison, numéro de réservation, ETA…",
          another: "Traiter un autre connaissement",
        },
        errors: {
          too_large: "Le fichier dépasse 4 Mo. Compressez-le ou n'envoyez que les pages du B/L.",
        },
        next: {
          lead: "Vous venez de traiter un connaissement. Avec un compte, il se passe la même chose pour chaque B/L reçu de chaque transporteur et de chaque agent, et les données ne s'arrêtent pas à un Excel : elles poursuivent leur chemin toutes seules jusqu'à votre système douanier ou de fret.",
          source: "Votre B/L",
          flow: {
            name: "Connaissement",
            add: { name: "incoterm", type: "Texte", hint: "À côté de « Incoterm » · ex. CIF Manzanillo", save: "Enregistrer", value: "CIF" },
          },
          inputs: { show: "Par où arrive votre B/L ?" },
        },
        cleaners: {
          lead: "Des règles simples qui s'appliquent toutes seules à chaque connaissement après l'extraction. Quatre idées avec vos propres données :",
          ideas: [
            { icon: "date", title: "Une seule façon d'écrire la date de mise à bord", from: "{date}", to: "{iso}", note: "chaque B/L au même format" },
            { icon: "alert", title: "Poids brut hors limites", from: "poids brut par conteneur", to: "alerte au-delà de 26 000 kg", note: "pour que personne ne réserve un camion qui ne peut pas le prendre" },
            { icon: "calendar", title: "Une alerte avant l'arrivée", from: "date de mise à bord + temps de transit", to: "rappel 5 jours avant", note: "pour que la déclaration soit déposée avant l'accostage du navire" },
            { icon: "mail", title: "Directement au commissionnaire en douane", from: "B/L extrait", to: "e-mail avec le tableau en pièce jointe", note: "à l'agence en douane, sans que personne ne transfère quoi que ce soit" },
          ],
        },
        after: {
          lead: "Il provient d'un Flow fixe avec {fields} champs. Dans votre compte, c'est vous qui choisissez les champs, et voici à quoi cela ressemble quand Tavnit s'occupe de chaque connaissement :",
        },
        how: {
          steps: [
            { title: "Envoyez le B/L", body: "PDF, photo ou scan. N'importe quel transporteur, n'importe quel agent, n'importe quelle mise en page." },
            { title: "Tavnit lit le document", body: "Il repère l'en-tête (numéro de B/L, parties, navire, voyage, ports, date de mise à bord, conditions de fret) et le tableau de cargaison : une ligne par conteneur avec scellé, marchandise, colis, poids et volume." },
            { title: "Vérifiez et téléchargez", body: "Le tableau s'affiche à l'écran. Avec un compte gratuit, vous l'emportez en Excel." },
          ],
        },
        faqs: [
          {
            q: "Que comprend la version gratuite ?",
            a: "{limit} documents par jour, avec le résultat complet à l'écran. Pour télécharger l'Excel, il faut un compte Tavnit, qui est gratuit.",
          },
          {
            q: "Qu'extrait-il d'un connaissement ?",
            a: "De l'en-tête : numéro de B/L, transporteur, chargeur, destinataire, partie à notifier, navire, voyage, port de chargement, port de déchargement, date de mise à bord, conditions de fret et liste des conteneurs. Du tableau de cargaison, une ligne par article : conteneur, scellé, désignation des marchandises, nombre et type de colis, poids brut et volume. Les valeurs de l'en-tête se répètent sur chaque ligne pour que la feuille se filtre et s'additionne proprement.",
          },
          {
            q: "Puis-je choisir d'autres colonnes ?",
            a: "Pas ici : cet outil utilise un Flow de connaissement fixe avec 19 champs. Dans votre compte, vous créez vos propres Flows, pour des B/L ou tout autre document, avec les champs dont vous avez besoin : par document (incoterm, lieu de livraison, numéro de réservation, ETA) ou par ligne (code SH, marques, température reefer). Pas de modèles : vous décrivez le champ et, si besoin, vous indiquez où le chercher.",
          },
          {
            q: "Quels formats sont acceptés ?",
            a: "PDF (texte ou scanné), JPG et PNG, jusqu'à 4 Mo et 5 pages. Si votre B/L est plus long, ou si plusieurs B/L se trouvent dans un même scan, envoyez-les en plusieurs parties ou créez un compte.",
          },
          {
            q: "Ça marche avec le B/L de n'importe quel transporteur ?",
            a: "Oui. L'outil n'utilise pas de modèles : il lit chaque B/L tel qu'il arrive, qu'il s'agisse d'un master B/L de compagnie maritime, d'un house B/L de transitaire ou d'une lettre de transport maritime (sea waybill), en anglais ou en espagnol. Il est testé sur les mises en page de MSC, Maersk, Hapag-Lloyd, CMA CGM, Evergreen et de NVOCC.",
          },
          {
            q: "Que devient mon fichier ?",
            a: "Il est traité dans un compte Tavnit réservé aux outils gratuits et n'est utilisé à rien d'autre. Au bout de 24 heures, le fichier et les lignes extraites sont supprimés automatiquement ; nous ne gardons que la trace qu'une exécution a eu lieu, sans le document ni son contenu. Si vous voulez qu'il disparaisse plus tôt, écrivez à support@tavnit.io.",
          },
          {
            q: "Pourquoi faut-il un compte pour télécharger ?",
            a: "Parce que la version gratuite sert à essayer. Avec un compte, vous lancez la même extraction sur tous vos connaissements, recevez le résultat par e-mail et l'envoyez vers votre système douanier ou de fret.",
          },
          {
            q: "Comment automatiser tout ça ?",
            a: "Créez un compte, construisez un Flow avec les champs voulus et transférez vos B/L à son adresse e-mail (celle à laquelle le transporteur ou le transitaire les envoie), ou connectez-le par l'API, des webhooks, Zapier, Make ou n8n. Les données arrivent dans votre système douanier, votre ERP ou Google Sheets, sans aucune saisie.",
          },
        ],
      },
    },
    /**
     * Compare supplier quotes. Two or three quotes for the same request go
     * through the quote Flow; the Matcher pairs the lines across suppliers
     * (semantically, so "cemento gris 42.5 kg" meets "cemento Portland tipo I
     * gris") and marks the cheapest unit price per line as Champion. Nothing
     * here is an invoice, so most of the base is overridden.
     */
    "quote-comparison": {
      vocab: {
        doc: "devis",
        docs: "devis",
        a_doc: "un devis",
        the_doc: "le devis",
        the_docs: "les devis",
        your_doc: "votre devis",
        your_docs: "vos devis",
        all_your_docs: "tous vos devis",
        all_docs: "tous les devis",
        each_doc: "chaque devis",
        another_doc: "un autre devis",
        this_doc: "ce devis",
      },
      overrides: {
        title: "Comparer des devis fournisseurs, gratuit : tableau ligne par ligne",
        description:
          "Envoyez deux ou trois devis en PDF ou en photo et obtenez un seul tableau comparatif : chaque ligne avec le prix de chaque fournisseur et le moins cher signalé. Gratuit, sans modèle, sans inscription pour voir le résultat.",
        label: "Comparer des devis fournisseurs",
        h1: "Comparez des devis fournisseurs",
        intro:
          "Envoyez deux ou trois devis pour la même demande. Tavnit lit chacun, apparie les lignes même quand chaque fournisseur les formule autrement, et construit un seul tableau avec chaque prix et l'option la moins chère par ligne. Sans modèle, sans tableur fait à la main.",
        trust: ["2 ou 3 devis · PDF ou photo", "{limit} documents gratuits par jour", "Tout est supprimé au bout de 24 h"],
        drop: {
          title: "Déposez un devis ici",
          hint: "PDF ou photo",
          sample: "Essayer avec trois devis d'exemple",
          formats: "PDF, JPG ou PNG · jusqu'à 4 Mo et 5 pages par devis",
        },
        stages: ["Lecture des devis", "Tri des lignes", "Le Matcher apparie les lignes", "Presque terminé"],
        result: {
          flowNote: "Chaque devis passe par un Flow fixe avec {fields} champs et le Matcher les croise. Dans votre compte, c'est vous qui choisissez les champs.",
          ghostHint: "Dans Tavnit, vous ajoutez les champs que vous voulez : marque, garantie, délai de livraison par ligne…",
          download: "Télécharger la comparaison en Excel",
          another: "Comparer d'autres devis",
          empty: "Nous n'avons trouvé aucune ligne chiffrée dans ce devis. Essayez avec un devis qui indique articles, quantités et prix par ligne.",
        },
        errors: {
          too_large: "L'un des devis dépasse 4 Mo. Compressez-le ou n'envoyez que les pages qui contiennent les lignes.",
          failed: "Nous n'avons pas pu lire l'un des devis. Essayez avec un autre, ou avec les exemples.",
          no_lines: "L'un des devis ne contient aucune ligne chiffrée : il n'y a donc rien à comparer. Vérifiez que chacun comporte des articles avec un prix unitaire.",
          not_ready: "Nous lisons encore les devis. Patientez un instant et réessayez.",
        },
        auth: {
          title: "Créez votre compte gratuit pour télécharger le tableau",
          body: "L'Excel se télécharge immédiatement. Avec un compte, vous pouvez aussi comparer plus de trois devis, et le faire pour chaque appel d'offres qui arrive.",
        },
        next: {
          lead: "Vous venez de comparer trois devis à la main. Avec un compte, chaque devis reçu par e-mail entre dans son Flow, le Matcher les croise tout seul et le tableau poursuit son chemin : vers les achats, vers l'ERP ou vers la personne qui valide.",
          source: "Vos devis",
          flow: {
            name: "Devis",
            add: { name: "brand", type: "Texte", hint: "À côté de « Marque » ou dans la désignation", save: "Enregistrer", value: "Argos" },
          },
          inputs: { show: "Par où arrivent vos devis ?" },
        },
        cleaners: {
          lead: "Des règles simples qui s'appliquent toutes seules à chaque devis après sa lecture. Quatre idées :",
          ideas: [
            { icon: "date", title: "Une seule façon d'écrire la date", from: "{date}", to: "{iso}", note: "chaque devis au même format" },
            { icon: "alert", title: "Alerte quand un fournisseur augmente de plus de 5 %", from: "prix du jour", to: "vs le dernier devis", note: "ligne par ligne, avant d'attribuer" },
            { icon: "approve", title: "Valider l'attribution", from: "tableau comparatif", to: "la personne qui décide", note: "le bon de commande ne part qu'après approbation" },
            { icon: "calendar", title: "Se souvenir de la validité du devis", from: "valable jusqu'au {date}", to: "rappel 5 jours avant", note: "pour ne pas perdre le prix" },
          ],
        },
        after: {
          title: "Votre tableau comparatif est prêt",
          lead: "Il provient d'un Flow fixe avec {fields} champs et d'un Matcher. Dans votre compte, c'est vous qui choisissez les champs, et voici à quoi cela ressemble quand Tavnit croise chaque devis :",
        },
        how: {
          steps: [
            { title: "Envoyez deux ou trois devis", body: "En PDF ou en photo, pour la même demande. N'importe quel fournisseur, n'importe quelle mise en page, n'importe quelle façon de décrire les articles." },
            { title: "Tavnit les lit et les croise", body: "Il extrait les lignes de chacun et le Matcher apparie les articles même quand ils sont formulés différemment. Le moins cher de chaque ligne est signalé comme Champion." },
            { title: "Vérifiez et téléchargez", body: "Le tableau s'affiche à l'écran. Avec un compte gratuit, vous l'emportez en Excel." },
          ],
        },
        faqs: [
          {
            q: "Que comprend la version gratuite ?",
            a: "{limit} documents par jour (une comparaison de trois devis en compte trois), avec le tableau complet à l'écran. Pour télécharger l'Excel, il faut un compte Tavnit, qui est gratuit.",
          },
          {
            q: "Comment apparie-t-il les lignes quand chaque fournisseur les formule autrement ?",
            a: "Avec un Matcher Tavnit. Il compare le sens de chaque désignation, pas le texte exact : « ciment gris 42,5 kg » et « ciment Portland type I gris, sac de 42,5 kg » tombent sur la même ligne. En cas de doute, une seconde étape décide s'il s'agit du même article.",
          },
          {
            q: "Que signifie Champion ?",
            a: "Le fournisseur qui propose le prix unitaire le plus bas sur cette ligne. En cas d'égalité, les deux apparaissent. Les lignes chiffrées par un seul fournisseur n'ont pas de concurrence et s'affichent aussi.",
          },
          {
            q: "Puis-je comparer plus de trois devis ?",
            a: "Pas ici : la version gratuite en accepte jusqu'à trois. Dans votre compte, le Matcher compare jusqu'à dix exécutions d'un même Flow, et vous pouvez envoyer le tableau par e-mail ou vers votre ERP.",
          },
          {
            q: "Puis-je choisir d'autres colonnes ?",
            a: "Pas ici : cet outil utilise un Flow de devis fixe. Dans votre compte, vous créez votre propre Flow avec les champs dont vous avez besoin (marque, garantie, délai de livraison par ligne) et réglez le Matcher pour comparer le champ de votre choix : prix, délai ou n'importe quel nombre.",
          },
          {
            q: "Quels formats sont acceptés ?",
            a: "PDF (texte ou scanné), JPG et PNG, jusqu'à 4 Mo et 5 pages par devis.",
          },
          {
            q: "Que deviennent mes fichiers ?",
            a: "Ils sont traités dans un compte Tavnit réservé aux outils gratuits et ne sont utilisés à rien d'autre. Au bout de 24 heures, les fichiers, les lignes extraites et le tableau sont supprimés ; nous ne gardons que la trace qu'une exécution a eu lieu.",
          },
          {
            q: "Comment automatiser tout ça ?",
            a: "Créez un compte, construisez un Flow de devis avec vos champs et un Matcher par-dessus. Transférez les devis à l'adresse e-mail du Matcher et, une fois tous arrivés, le tableau comparatif sort tout seul : par e-mail, par webhook ou dans votre ERP.",
          },
        ],
        compare: {
          slots: [
            { title: "Devis A", hint: "PDF ou photo", sample: "Devis A d'exemple" },
            { title: "Devis B", hint: "PDF ou photo", sample: "Devis B d'exemple" },
            { title: "Devis C", hint: "PDF ou photo", sample: "Devis C d'exemple", optional: true },
          ],
          run: "Comparer",
          sampleAll: "Essayer avec trois devis d'exemple",
          stages: ["Lecture des devis", "Tri des lignes", "Le Matcher apparie les lignes", "Presque terminé"],
          heading: "Tableau comparatif prêt",
          summary: "{n} · {ref}",
          labels: {
            description: "Désignation",
            quantity: "Quantité",
            price: "Prix unitaire",
            total: "Total",
            status: "Statut",
            ref: "A",
            doc: "B",
            supplier: "Fournisseur",
            champion: "Champion",
            wins: "{n} lignes gagnées",
            lines: ["ligne", "lignes"],
          },
          status: { ok: "Correspond", price: "Prix différent", qty: "Quantité différente", both: "Prix et quantité différents", missing: "Non chiffré", extra: "Uniquement dans ce devis" },
          empty: "Le Matcher n'a trouvé aucune ligne comparable entre les devis. Vérifiez qu'ils portent sur la même demande et comportent des articles avec un prix unitaire.",
          another: "Comparer d'autres devis",
          download: "Télécharger la comparaison en Excel",
        },
      },
    },
    /**
     * Contract key dates. One row per contract (a metadata-only Flow), so the
     * copy talks about dates and parties, never about line items.
     */
    "contract-dates": {
      vocab: {
        doc: "contrat",
        docs: "contrats",
        a_doc: "un contrat",
        the_doc: "le contrat",
        the_docs: "les contrats",
        your_doc: "votre contrat",
        your_docs: "vos contrats",
        all_your_docs: "tous vos contrats",
        all_docs: "tous les contrats",
        each_doc: "chaque contrat",
        another_doc: "un autre contrat",
        this_doc: "ce contrat",
      },
      overrides: {
        title: "Extraire les dates de renouvellement d'un contrat, gratuit (IA)",
        description:
          "Envoyez un contrat en PDF et récupérez ses dates clés sur une ligne Excel : parties, début, fin, tacite reconduction, préavis et date limite pour le donner. Gratuit, sans modèle, sans inscription pour voir le résultat.",
        label: "Dates de contrat",
        h1: "Extrayez les dates clés d'un contrat",
        intro:
          "Envoyez le PDF. Tavnit lit le contrat et vous rend une ligne avec les parties, la date de signature, le début et la fin de la durée, la présence ou non d'une tacite reconduction, le préavis et le dernier jour pour signifier que vous ne renouvelez pas. Fonctionne avec les contrats de services, de bail, d'approvisionnement et de licence, quel que soit leur format.",
        drop: {
          title: "Déposez votre contrat ici",
          sample: "Essayer avec un contrat d'exemple",
        },
        stages: ["Envoi du document", "Lecture des parties", "Recherche de la durée et du renouvellement", "Calcul de la date limite de préavis", "Presque terminé"],
        result: {
          empty: "Nous n'avons trouvé ni parties ni dates dans ce document. Essayez avec un contrat signé qui comporte une clause de durée.",
          flowNote: "Ces {fields} colonnes sont les champs d'un Flow de contrat fixe. Dans votre compte, c'est vous qui choisissez les champs.",
          ghostHint: "Dans Tavnit, vous ajoutez les champs que vous voulez : responsable interne, centre de coûts, clause pénale…",
          another: "Traiter un autre contrat",
        },
        next: {
          lead: "Vous venez de traiter un contrat. Avec un compte, il se passe la même chose pour chaque contrat qui arrive, et les dates ne s'arrêtent pas à un Excel : elles donnent l'alerte avant l'échéance.",
          source: "Votre contrat",
          inputs: { show: "Par où arrive votre contrat ?" },
          flow: {
            name: "Contrat",
            add: { name: "owner", type: "Texte", hint: "Qui le signe de notre côté", save: "Enregistrer", value: "M. Perez" },
          },
        },
        cleaners: {
          lead: "Des règles simples qui s'appliquent toutes seules à chaque contrat après sa lecture. Quatre idées avec vos propres données :",
          ideas: [
            { icon: "date", title: "Une seule façon d'écrire la date", from: "{date}", to: "{iso}", note: "chaque contrat au même format" },
            { icon: "calendar", title: "Rappel 60 jours avant la fin", from: "end_date", to: "rappel à temps", note: "avant que la date limite de préavis ne passe" },
            { icon: "alert", title: "Tacite reconduction : vérifier d'abord", from: "auto_renewal = Yes", to: "à vérifier", note: "pour qu'aucun contrat ne se renouvelle sans que quelqu'un le regarde" },
            { icon: "mail", title: "Prévenir le responsable par e-mail", from: "contrat lu", to: "e-mail avec la ligne", note: "la personne qui l'a signé reçoit les dates" },
          ],
        },
        after: {
          lead: "Il provient d'un Flow fixe avec {fields} champs. Dans votre compte, c'est vous qui choisissez les champs, et voici à quoi cela ressemble quand Tavnit lit chaque contrat :",
        },
        how: {
          steps: [
            { title: "Envoyez le contrat", body: "PDF, texte ou scanné. N'importe quel type de contrat, quel que soit son rédacteur." },
            { title: "Tavnit lit le document", body: "Il repère les parties, la signature, la durée, la clause de renouvellement et le préavis, et calcule la date limite pour le donner." },
            { title: "Vérifiez et téléchargez", body: "La ligne s'affiche à l'écran. Avec un compte gratuit, vous l'emportez en Excel." },
          ],
        },
        faqs: [
          {
            q: "Que comprend la version gratuite ?",
            a: "{limit} contrats par jour, avec le résultat complet à l'écran. Pour télécharger l'Excel, il faut un compte Tavnit, qui est gratuit.",
          },
          {
            q: "Quelles dates et quelles informations extrait-il ?",
            a: "Les parties, la date de signature, le début et la fin de la durée, la durée elle-même, la présence d'une tacite reconduction, le préavis, la date limite pour signifier le non-renouvellement, le montant avec sa devise et le droit applicable. Ce que le contrat ne dit pas reste vide : aucune date n'est jamais inventée.",
          },
          {
            q: "Pourquoi le résultat tient-il sur une seule ligne ?",
            a: "Parce qu'un contrat a une seule durée, une seule date de signature et un seul ensemble de parties. Avec un compte, vous pouvez traiter tout un dossier de contrats et obtenir un tableau avec une ligne par contrat, prêt à trier par date de fin.",
          },
          {
            q: "Quels formats sont acceptés ?",
            a: "PDF (texte ou scanné), JPG et PNG, jusqu'à 4 Mo et 5 pages. Si votre contrat est plus long, envoyez les pages qui contiennent les clauses de durée et de renouvellement, ou créez un compte.",
          },
          {
            q: "Puis-je choisir d'autres colonnes ?",
            a: "Pas ici : cet outil utilise un Flow de contrat fixe avec 14 champs. Dans votre compte, vous créez vos propres Flows, pour des contrats ou tout autre document, avec les champs dont vous avez besoin : responsable interne, clause pénale, garantie. Pas de modèles : vous décrivez le champ et, si besoin, vous indiquez où le chercher.",
          },
          {
            q: "Que devient mon fichier ?",
            a: "Il est traité dans un compte Tavnit réservé aux outils gratuits et n'est utilisé à rien d'autre. Au bout de 24 heures, le fichier et la ligne extraite sont supprimés automatiquement ; nous ne gardons que la trace qu'une exécution a eu lieu, sans le document ni son contenu. Si vous voulez qu'il disparaisse plus tôt, écrivez à support@tavnit.io.",
          },
          {
            q: "Ça marche avec des contrats de n'importe quel pays ?",
            a: "Oui. L'outil lit des contrats en anglais, en espagnol et dans d'autres langues, avec n'importe quel format de date. Il est testé, entre autres, sur des contrats des États-Unis, du Panama, du Mexique et de Colombie.",
          },
          {
            q: "Comment être prévenu avant la date de fin ?",
            a: "Créez un compte, construisez un Flow avec les champs voulus et transférez vos contrats à son adresse e-mail, ou connectez-le par l'API, des webhooks, Zapier, Make ou n8n. Un Cleaner compare la date limite de préavis à la date du jour et envoie l'e-mail ou le webhook à la personne qui doit décider.",
          },
        ],
      },
    },
    /**
     * Receipt → Excel. Mostly photos of thermal tickets: restaurants, pharmacies,
     * taxis, supermarkets. What differs from the invoice base is the vocabulary,
     * the SEO text, the sample, the Cleaner ideas (expenses, not payables) and the
     * questions people actually ask about receipts.
     */
    "receipt-to-excel": {
      vocab: {
        doc: "reçu",
        docs: "reçus",
        a_doc: "un reçu",
        the_doc: "le reçu",
        the_docs: "les reçus",
        your_doc: "votre reçu",
        your_docs: "vos reçus",
        all_your_docs: "tous vos reçus",
        all_docs: "tous les reçus",
        each_doc: "chaque reçu",
        another_doc: "un autre reçu",
        this_doc: "ce reçu",
      },
      overrides: {
        title: "Reçu en Excel, gratuit : de la photo au tableur",
        description:
          "Envoyez la photo ou le PDF d'un reçu ou d'un ticket de caisse et récupérez ses lignes dans Excel : commerçant, date, articles, quantités, taxes, pourboire et total. Gratuit, sans modèle, sans inscription pour voir le résultat. L'OCR de reçus vers un tableur, en quelques secondes.",
        label: "Reçu en Excel",
        h1: "Convertissez un reçu en Excel",
        intro:
          "Prenez le reçu en photo ou envoyez le PDF. Tavnit lit le commerçant, la date, chaque article avec son prix et les totaux, puis vous les rend sous forme de feuille de calcul. Les tickets thermiques pâlis, de travers ou froissés passent aussi : il n'y a aucun modèle à configurer.",
        drop: {
          title: "Déposez la photo de votre reçu ici",
          sample: "Essayer avec un reçu d'exemple",
        },
        stages: ["Envoi du reçu", "Lecture du commerçant et de la date", "Recherche des articles", "Mise en ordre des colonnes", "Presque terminé"],
        result: {
          empty: "Nous n'avons trouvé aucun article sur ce reçu. Essayez avec une photo plus nette, le ticket entier dans le cadre et sans ombre.",
          flowNote: "Ces {fields} colonnes sont les champs d'un Flow de reçu fixe. Dans votre compte, c'est vous qui choisissez les champs.",
          ghostHint: "Dans Tavnit, vous ajoutez les champs que vous voulez : centre de coûts, auteur de la dépense, projet, catégorie…",
        },
        next: {
          lead: "Vous venez de traiter un reçu. Avec un compte, il se passe la même chose pour chaque reçu qui arrive, et les lignes ne s'arrêtent pas à un Excel : elles poursuivent leur chemin toutes seules.",
          source: "Votre reçu",
          inputs: { show: "Par où arrive votre reçu ?" },
          flow: {
            name: "Reçu",
            add: { name: "cost_center", type: "Texte", hint: "Qui a dépensé, ou le projet", save: "Enregistrer", value: "Ventes" },
          },
        },
        cleaners: {
          lead: "Des règles simples qui s'appliquent toutes seules à chaque reçu après sa lecture. Quatre idées avec vos propres données :",
          ideas: [
            { icon: "date", title: "Une seule façon d'écrire la date", from: "{date}", to: "{iso}", note: "chaque reçu au même format pour la note de frais" },
            { icon: "sum", title: "Les articles doivent égaler le sous-total", from: "articles {sum}", to: "sous-total {subtotal}", note: "si ça ne correspond pas, la photo a été mal lue et quelqu'un vérifie", check: "sum" },
            { icon: "approve", title: "Approbation au-delà d'un montant", from: "total {total}", to: "approuver avant de rembourser", note: "quand il dépasse {threshold}" },
            { icon: "money", title: "Convertir dans votre devise", from: "{total} {currency}", to: "votre devise", note: "au taux en vigueur à la date du reçu, pour les déplacements" },
          ],
        },
        after: {
          lead: "Il provient d'un Flow fixe avec {fields} champs. Dans votre compte, c'est vous qui choisissez les champs, et voici à quoi cela ressemble quand Tavnit s'occupe de chaque reçu d'un déplacement ou d'un mois :",
        },
        how: {
          steps: [
            { title: "Envoyez le reçu", body: "Une photo prise au téléphone ou un PDF. N'importe quel commerçant, n'importe quelle langue, même un ticket très pâli." },
            { title: "Tavnit lit le document", body: "Il repère le commerçant, la date, le numéro, chaque article avec son prix, ainsi que le sous-total, les taxes, le pourboire et le total." },
            { title: "Vérifiez et téléchargez", body: "Le tableau s'affiche à l'écran. Avec un compte gratuit, vous l'emportez en Excel." },
          ],
        },
        faqs: [
          {
            q: "Que comprend la version gratuite ?",
            a: "{limit} reçus par jour, avec le résultat complet à l'écran. Pour télécharger l'Excel, il faut un compte Tavnit, qui est gratuit.",
          },
          {
            q: "Ça marche avec une photo prise au téléphone ?",
            a: "Oui, c'est même le cas le plus courant. JPG, PNG et PDF jusqu'à 4 Mo. L'idéal : le ticket entier dans le cadre, un éclairage uniforme et pas de doigts dessus ; une photo de travers ou un peu floue se lit quand même.",
          },
          {
            q: "Quels formats sont acceptés ?",
            a: "JPG, PNG et PDF (texte ou scanné), jusqu'à 4 Mo et 5 pages. Un long ticket de supermarché tient sur une seule photo.",
          },
          {
            q: "Faut-il configurer un modèle par commerçant ?",
            a: "Non. Tavnit n'utilise pas de modèles : il lit chaque reçu tel qu'il arrive, qu'il vienne d'un restaurant, d'une pharmacie, d'un taxi ou d'une station-service.",
          },
          {
            q: "Puis-je choisir d'autres colonnes ?",
            a: "Pas ici : cet outil utilise un Flow de reçu fixe avec 15 champs. Dans votre compte, vous créez vos propres Flows avec les champs dont vous avez besoin : par document (centre de coûts, auteur de la dépense, projet, catégorie) ou par ligne (code produit). Pas de modèles : vous décrivez le champ et, si besoin, vous indiquez où le chercher.",
          },
          {
            q: "Que devient mon fichier ?",
            a: "Il est traité dans un compte Tavnit réservé aux outils gratuits et n'est utilisé à rien d'autre. Au bout de 24 heures, la photo et les lignes extraites sont supprimées automatiquement ; nous ne gardons que la trace qu'une exécution a eu lieu, sans le document ni son contenu. Si vous voulez qu'il disparaisse plus tôt, écrivez à support@tavnit.io.",
          },
          {
            q: "J'ai cinquante reçus d'un déplacement. Un par un ?",
            a: "Ici, oui. Avec un compte, vous les envoyez tous d'un coup : transférez-les par e-mail au Flow, déposez-les en lot ou connectez-vous par l'API, et chaque reçu ressort en lignes dans le même Excel, dans Google Sheets ou dans votre outil de notes de frais.",
          },
          {
            q: "Comment automatiser tout ça ?",
            a: "Créez un compte, construisez un Flow avec les champs voulus et transférez les photos de vos reçus à son adresse e-mail, ou connectez-le par l'API, des webhooks, Zapier, Make ou n8n. La note de frais se remplit toute seule.",
          },
        ],
      },
    },
    /**
     * Number format. A spreadsheet in, the chosen columns out in one number
     * format: a file exported with "1.234,56" that Excel reads as text, or the
     * other way round.
     */
    "number-format": {
      vocab: SPREADSHEET_VOCAB,
      overrides: {
        title: "Corriger le format des nombres dans Excel ou CSV, gratuit",
        description:
          "Envoyez un fichier Excel ou CSV avec des nombres comme 1.234,56 ou 1,234.56 et récupérez-les dans un format unique, prêts à être additionnés. Vous choisissez les colonnes et le format. Gratuit, sans inscription pour voir le résultat.",
        label: "Corriger le format des nombres",
        h1: "Corrigez le format des nombres de votre feuille de calcul",
        intro:
          "Envoyez le fichier Excel ou CSV. Choisissez les colonnes qui contiennent des nombres et le format voulu : 1234.56, 1,234.56 ou 1.234,56. Tavnit les convertit tous et vous rend votre fichier avec les mêmes colonnes, dans le même ordre.",
        trust: ["CSV ou Excel · jusqu'à 500 lignes", "{limit} fichiers gratuits par jour", "Tout est supprimé au bout de 24 h"],
        drop: {
          title: "Déposez votre fichier Excel ou CSV ici",
          hint: "ou choisissez un fichier sur votre ordinateur",
          choose: "Choisir un fichier",
          sample: "Essayer avec un fichier d'exemple",
          formats: "CSV ou .xlsx · jusqu'à 4 Mo et 500 lignes",
        },
        errors: {
          unsupported: "Fichiers CSV ou Excel (.xlsx) uniquement.",
          xls: "C'est un ancien fichier Excel (.xls). Ouvrez-le dans Excel et enregistrez-le en .xlsx ou en .csv.",
          too_many_rows: "La version gratuite traite jusqu'à 500 lignes. Envoyez une partie du fichier.",
          too_many_columns: "Choisissez jusqu'à 10 colonnes à la fois.",
          no_columns: "Choisissez au moins une colonne.",
          nothing_to_clean: "Nous n'avons trouvé aucun nombre à convertir dans ces colonnes.",
          empty: "Le fichier est vide ou n'a aucune ligne sous l'en-tête.",
          unreadable: "Nous n'avons pas pu lire le fichier. S'il s'agit d'un fichier Excel, enregistrez-le de nouveau en .xlsx.",
          failed: "Nous n'avons pas pu convertir ce fichier. Réessayez, ou essayez avec le fichier d'exemple.",
        },
        how: {
          heading: "Comment ça marche",
          steps: [
            { title: "Envoyez le fichier", body: "Un fichier CSV ou Excel, séparé par des virgules ou des points-virgules." },
            { title: "Choisissez les colonnes et le format", body: "Nous cochons les colonnes qui ressemblent à des nombres. Vous indiquez si vos décimales utilisent une virgule ou un point, et le format voulu." },
            { title: "Vérifiez et téléchargez", body: "Les cellules modifiées sont mises en évidence. Avec votre compte gratuit, vous emportez le fichier en Excel ou en CSV." },
          ],
        },
        faqs: [
          { q: "Pourquoi Excel n'additionne-t-il pas mes nombres ?", a: "Parce qu'il les lit comme du texte. Cela arrive quand le fichier vient d'un système ou d'un pays qui écrit les décimales autrement que vous : 1.234,56 dans un Excel réglé pour 1,234.56, ou l'inverse. Les mettre dans un format unique en refait des nombres." },
          { q: "Comment savez-vous si mes décimales utilisent une virgule ou un point ?", a: "Nous le déduisons de vos valeurs : si 1.234,56 apparaît, la décimale est la virgule. Quand c'est impossible à dire, par exemple 1.234 tout seul, c'est vous qui choisissez. Ce choix détermine la lecture de chaque nombre." },
          { q: "Quel format choisir ?", a: "1234.56, sans séparateur de milliers, est celui que tous les systèmes, formules et imports lisent sans problème. 1,234.56 et 1.234,56 servent à présenter le fichier à des personnes, selon votre pays." },
          { q: "Que deviennent les cellules qui ne sont pas des nombres ?", a: "Elles restent telles quelles. Un pourcentage (15 %), du texte (N/A) ou une cellule vide n'est pas touché : seul ce qui est clairement un nombre change." },
          { q: "Quels formats sont acceptés ?", a: "Les CSV séparés par des virgules, des points-virgules ou des tabulations, et les fichiers Excel .xlsx, jusqu'à 4 Mo et 500 lignes. Si vous avez un ancien fichier Excel (.xls), enregistrez-le en .xlsx." },
          { q: "Que devient mon fichier ?", a: "Il sert uniquement à cette conversion et il est supprimé au bout de 24 heures avec le résultat. Seul votre navigateur peut voir le résultat." },
          { q: "Comment faire pour que ça se fasse tout seul ?", a: "Dans Tavnit, la même règle est un Cleaner : elle s'applique toute seule à chaque document que vous extrayez ou à chaque fichier qui arrive par e-mail ou par API, avec les dates, les devises et les contrôles." },
        ],
        clean: {
          setup: {
            heading: "Choisissez les colonnes et le format",
            fileSummary: "{rows} · {cols}",
            columnsLabel: "Colonnes avec des nombres",
            columnsHint: "Jusqu'à {max}. Nous avons coché celles qui ressemblent à des nombres.",
            tooMany: "Vous pouvez choisir jusqu'à {max} colonnes à la fois.",
            inputLabel: "Dans votre fichier, les décimales utilisent",
            inputOptions: { comma: "la virgule · 1.234,56", dot: "le point · 1,234.56" },
            outputLabel: "Je veux les nombres au format",
            outputOptions: { plain: "1234.56 · pour formules et systèmes", us: "1,234.56", latam: "1.234,56" },
            preview: "Premières lignes",
            run: "Convertir",
            change: "Changer de fichier",
          },
          stages: ["Envoi du fichier", "Lecture des colonnes", "Conversion des nombres", "Création de votre fichier"],
          heading: "Terminé : {file}",
          summary: "Modifications : {cells} dans {cols}",
          cellWord: ["cellule", "cellules"],
          columnWord: ["colonne", "colonnes"],
          unchanged: "Aucune cellule n'a eu besoin d'être modifiée : elles étaient déjà dans ce format.",
          highlight: "Les cellules modifiées sont en bleu.",
          shown: "{shown} lignes affichées sur {total}. Le téléchargement les contient toutes.",
          download: "Télécharger",
          downloadXlsx: "Excel (.xlsx)",
          downloadCsv: "CSV (.csv)",
          another: "Convertir un autre fichier",
          automate: {
            heading: "Faites-le pour chaque fichier",
            body: "Dans Tavnit, cette règle est un Cleaner. Vous la configurez une fois et elle s'applique toute seule à chaque facture que vous extrayez ou à chaque fichier qui arrive par e-mail ou par API, avec les dates, les devises et les contrôles.",
            cta: "Créer un compte gratuit",
            docs: "Qu'est-ce qu'un Cleaner",
          },
        },
      },
    },
    /**
     * Date format. A spreadsheet in, the chosen date columns out in one format.
     * Numeric dates are read with the visitor's day/month order; dates written in
     * words go through the Cleaner's AI conversion, which is the part a formula
     * cannot do.
     */
    "date-format": {
      vocab: SPREADSHEET_VOCAB,
      overrides: {
        title: "Corriger le format des dates dans Excel ou CSV, gratuit",
        description:
          "Envoyez un fichier Excel ou CSV avec des dates mélangées (03/04/2024, March 12 2024, 2024-03-12) et récupérez-les toutes dans un format unique. Vous choisissez les colonnes et le format. Gratuit, sans inscription pour voir le résultat.",
        label: "Corriger le format des dates",
        h1: "Mettez toutes les dates de votre feuille de calcul au même format",
        intro:
          "Envoyez le fichier Excel ou CSV. Choisissez les colonnes qui contiennent des dates et le format voulu : 2024-03-12, 12/03/2024 ou 03/12/2024. Tavnit les convertit toutes, y compris les dates écrites en toutes lettres, et vous rend votre fichier avec les mêmes colonnes.",
        trust: ["CSV ou Excel · jusqu'à 500 lignes", "{limit} fichiers gratuits par jour", "Tout est supprimé au bout de 24 h"],
        drop: {
          title: "Déposez votre fichier Excel ou CSV ici",
          hint: "ou choisissez un fichier sur votre ordinateur",
          choose: "Choisir un fichier",
          sample: "Essayer avec un fichier d'exemple",
          formats: "CSV ou .xlsx · jusqu'à 4 Mo et 500 lignes",
        },
        errors: {
          unsupported: "Fichiers CSV ou Excel (.xlsx) uniquement.",
          xls: "C'est un ancien fichier Excel (.xls). Ouvrez-le dans Excel et enregistrez-le en .xlsx ou en .csv.",
          too_many_rows: "La version gratuite traite jusqu'à 500 lignes. Envoyez une partie du fichier.",
          too_many_columns: "Choisissez jusqu'à 10 colonnes à la fois.",
          no_columns: "Choisissez au moins une colonne.",
          nothing_to_clean: "Nous n'avons trouvé aucune date à convertir dans ces colonnes.",
          empty: "Le fichier est vide ou n'a aucune ligne sous l'en-tête.",
          unreadable: "Nous n'avons pas pu lire le fichier. S'il s'agit d'un fichier Excel, enregistrez-le de nouveau en .xlsx.",
          failed: "Nous n'avons pas pu convertir ce fichier. Réessayez, ou essayez avec le fichier d'exemple.",
        },
        how: {
          heading: "Comment ça marche",
          steps: [
            { title: "Envoyez le fichier", body: "Un fichier CSV ou Excel, avec les dates telles qu'elles sont : barres obliques, tirets, points ou en toutes lettres." },
            { title: "Choisissez les colonnes et le format", body: "Nous cochons les colonnes qui ressemblent à des dates. Vous indiquez si votre fichier met le jour ou le mois en premier, et le format voulu." },
            { title: "Vérifiez et téléchargez", body: "Les cellules modifiées sont mises en évidence. Avec votre compte gratuit, vous emportez le fichier en Excel ou en CSV." },
          ],
        },
        faqs: [
          { q: "Comment savoir si 03/04/2024 est le 3 avril ou le 4 mars ?", a: "Une date seule ne permet pas de le dire. Nous vous demandons donc si votre fichier met le jour ou le mois en premier, et nous suggérons la réponse quand la colonne contient une date comme 15/04/2024, qui ne se lit que d'une seule façon." },
          { q: "Comprend-il les dates écrites en toutes lettres ?", a: "Oui. « March 5th 2024 », « 12 de marzo de 2024 » ou « 1er avril 2024 » sont lues par l'IA, ce qu'une formule Excel ne sait pas faire. Les dates numériques sont lues par des règles, sans IA." },
          { q: "Quel format choisir ?", a: "2024-03-12 (année, mois, jour) est celui que tous les systèmes lisent sans confusion et celui qui se trie correctement. 03/12/2024 est l'usage américain ; 12/03/2024 est courant en Europe et en Amérique latine." },
          { q: "Que deviennent les cellules qui ne sont pas des dates ?", a: "Elles restent telles quelles, tout comme les cellules vides. Quand une date ne peut pas être lue avec certitude, nous la laissons telle qu'elle est plutôt que de deviner." },
          { q: "Et si mon fichier Excel les enregistre déjà comme des dates ?", a: "Nous les prenons telles quelles, sans les relire, et ne changeons que le format." },
          { q: "Que devient mon fichier ?", a: "Il sert uniquement à cette conversion et il est supprimé au bout de 24 heures avec le résultat. Seul votre navigateur peut voir le résultat." },
          { q: "Comment faire pour que ça se fasse tout seul ?", a: "Dans Tavnit, la même règle est un Cleaner : elle s'applique toute seule à chaque document que vous extrayez ou à chaque fichier qui arrive par e-mail ou par API, avec les nombres, les devises et les contrôles." },
        ],
        clean: {
          setup: {
            heading: "Choisissez les colonnes et le format",
            fileSummary: "{rows} · {cols}",
            columnsLabel: "Colonnes avec des dates",
            columnsHint: "Jusqu'à {max}. Nous avons coché celles qui ressemblent à des dates.",
            tooMany: "Vous pouvez choisir jusqu'à {max} colonnes à la fois.",
            inputLabel: "Dans votre fichier, les dates numériques commencent par",
            inputOptions: { dmy: "le jour · 31/12/2024", mdy: "le mois · 12/31/2024" },
            outputLabel: "Je veux les dates au format",
            outputOptions: { iso: "2024-03-12 · année, mois, jour", dmy: "12/03/2024 · jour, mois, année", mdy: "03/12/2024 · mois, jour, année" },
            preview: "Premières lignes",
            run: "Convertir",
            change: "Changer de fichier",
          },
          stages: ["Envoi du fichier", "Lecture des colonnes", "Conversion des dates", "Lecture des dates en toutes lettres", "Création de votre fichier"],
          heading: "Terminé : {file}",
          summary: "Modifications : {cells} dans {cols}",
          cellWord: ["cellule", "cellules"],
          columnWord: ["colonne", "colonnes"],
          unchanged: "Aucune cellule n'a eu besoin d'être modifiée : elles étaient déjà dans ce format.",
          highlight: "Les cellules modifiées sont en bleu.",
          shown: "{shown} lignes affichées sur {total}. Le téléchargement les contient toutes.",
          download: "Télécharger",
          downloadXlsx: "Excel (.xlsx)",
          downloadCsv: "CSV (.csv)",
          another: "Convertir un autre fichier",
          automate: {
            heading: "Faites-le pour chaque fichier",
            body: "Dans Tavnit, cette règle est un Cleaner. Vous la configurez une fois et elle s'applique toute seule à chaque facture, contrat ou fichier qui arrive, avec les nombres, les devises et les contrôles.",
            cta: "Créer un compte gratuit",
            docs: "Qu'est-ce qu'un Cleaner",
          },
        },
      },
    },
    /**
     * Currency converter. A spreadsheet in, a converted column next to each
     * amount column out, at the day's reference rate. The rates come from the
     * European Central Bank through Frankfurter (the engine's source), so the
     * copy says plainly which currencies are there and which are not.
     */
    "currency-converter": {
      vocab: SPREADSHEET_VOCAB,
      overrides: {
        title: "Convertir des devises dans Excel au taux du jour, gratuit",
        description:
          "Envoyez un fichier Excel ou CSV avec des prix ou des montants et récupérez chaque colonne convertie en dollars, en euros, en livres ou dans l'une des 30 devises disponibles, au taux de référence du jour. Gratuit, sans inscription pour voir le résultat.",
        label: "Convertir des devises",
        h1: "Convertissez les montants de votre feuille de calcul dans une autre devise",
        intro:
          "Envoyez le fichier Excel ou CSV. Choisissez les colonnes de montants, leur devise et celle que vous voulez. Tavnit ajoute la colonne convertie à côté de chacune, au taux du jour, et vous rend votre fichier complet.",
        trust: ["CSV ou Excel · jusqu'à 500 lignes", "{limit} fichiers gratuits par jour", "Tout est supprimé au bout de 24 h"],
        drop: {
          title: "Déposez votre fichier Excel ou CSV ici",
          hint: "ou choisissez un fichier sur votre ordinateur",
          choose: "Choisir un fichier",
          sample: "Essayer avec un fichier d'exemple",
          formats: "CSV ou .xlsx · jusqu'à 4 Mo et 500 lignes",
        },
        errors: {
          unsupported: "Fichiers CSV ou Excel (.xlsx) uniquement.",
          xls: "C'est un ancien fichier Excel (.xls). Ouvrez-le dans Excel et enregistrez-le en .xlsx ou en .csv.",
          too_many_rows: "La version gratuite traite jusqu'à 500 lignes. Envoyez une partie du fichier.",
          too_many_columns: "Choisissez jusqu'à 10 colonnes à la fois.",
          no_columns: "Choisissez au moins une colonne.",
          nothing_to_clean: "Nous n'avons trouvé aucun montant à convertir dans ces colonnes.",
          empty: "Le fichier est vide ou n'a aucune ligne sous l'en-tête.",
          unreadable: "Nous n'avons pas pu lire le fichier. S'il s'agit d'un fichier Excel, enregistrez-le de nouveau en .xlsx.",
          failed: "Nous n'avons pas pu convertir ce fichier. Réessayez, ou essayez avec le fichier d'exemple.",
        },
        how: {
          heading: "Comment ça marche",
          steps: [
            { title: "Envoyez le fichier", body: "Un fichier CSV ou Excel avec des prix, des totaux ou n'importe quelle colonne de montants." },
            { title: "Choisissez les devises", body: "Nous cochons les colonnes qui ressemblent à des montants. Vous indiquez leur devise, la façon dont leurs décimales sont écrites et la devise de conversion." },
            { title: "Vérifiez et téléchargez", body: "Chaque colonne convertie se place à côté de l'originale. Avec votre compte gratuit, vous emportez le fichier en Excel ou en CSV." },
          ],
        },
        faqs: [
          { q: "Quel taux de change utilise-t-il ?", a: "Le taux de référence du jour publié par la Banque centrale européenne. Il est le même pour tout le fichier et sert de référence : ce n'est pas le taux d'achat ou de vente de votre banque." },
          { q: "Quelles devises puis-je convertir ?", a: "Le dollar américain (USD), l'euro (EUR), la livre sterling (GBP), le peso mexicain (MXN), le real (BRL), le yuan (CNY), le dollar canadien, le yen, le franc suisse et les autres devises publiées par la Banque centrale européenne, 30 au total. Vous pouvez convertir de n'importe laquelle vers n'importe laquelle." },
          { q: "Ça marche avec les pesos colombiens, les soles, les pesos chiliens ou les balboas ?", a: "Pas encore : ces devises ne figurent pas dans les taux de la Banque centrale européenne. Au Panama, où le balboa est à parité avec le dollar, vous pouvez choisir USD." },
          { q: "Que deviennent mes colonnes d'origine ?", a: "Elles restent telles quelles. La conversion est ajoutée dans une nouvelle colonne à côté, par exemple « Price (USD) », pour que vous puissiez comparer." },
          { q: "Que deviennent les cellules qui ne sont pas des montants ?", a: "Elles restent vides dans la colonne convertie. Du texte, un pourcentage ou une cellule vide ne sont pas convertis." },
          { q: "Que devient mon fichier ?", a: "Il sert uniquement à cette conversion et il est supprimé au bout de 24 heures avec le résultat. Seul votre navigateur peut voir le résultat." },
          { q: "Comment faire pour que ça se fasse tout seul ?", a: "Dans Tavnit, la conversion de devises est un Cleaner : elle s'applique toute seule à chaque facture que vous extrayez ou à chaque fichier qui arrive par e-mail ou par API, avec les dates, les nombres et les contrôles." },
        ],
        clean: {
          setup: {
            heading: "Choisissez les colonnes et les devises",
            fileSummary: "{rows} · {cols}",
            columnsLabel: "Colonnes avec des montants",
            columnsHint: "Jusqu'à {max}. Nous avons coché celles qui ressemblent à des montants.",
            tooMany: "Vous pouvez choisir jusqu'à {max} colonnes à la fois.",
            sourceLabel: "Les montants sont en",
            sourceHint: "Devises disposant d'un taux de la Banque centrale européenne.",
            inputLabel: "Les décimales utilisent",
            inputOptions: { comma: "la virgule · 1.234,56", dot: "le point · 1,234.56" },
            outputPopular: "Les plus utilisées",
            outputAll: "Toutes les devises",
            outputLabel: "Convertir en",
            outputOptions: {},
            preview: "Premières lignes",
            run: "Convertir",
            change: "Changer de fichier",
          },
          stages: ["Envoi du fichier", "Lecture des montants", "Récupération du taux du jour", "Conversion", "Création de votre fichier"],
          heading: "Terminé : {file}",
          summary: "Conversions : {cells} dans {cols}",
          cellWord: ["cellule", "cellules"],
          columnWord: ["colonne", "colonnes"],
          unchanged: "Nous n'avons trouvé aucun montant à convertir dans ces colonnes.",
          highlight: "Les colonnes converties sont en bleu.",
          shown: "{shown} lignes affichées sur {total}. Le téléchargement les contient toutes.",
          download: "Télécharger",
          downloadXlsx: "Excel (.xlsx)",
          downloadCsv: "CSV (.csv)",
          another: "Convertir un autre fichier",
          automate: {
            heading: "Faites-le pour chaque facture",
            body: "Dans Tavnit, la conversion de devises est un Cleaner. Vous la configurez une fois et chaque facture ou devis dans une autre devise arrive déjà converti, avec les dates, les nombres et les contrôles.",
            cta: "Créer un compte gratuit",
            docs: "Qu'est-ce qu'un Cleaner",
          },
        },
      },
    },
    /**
     * Translate columns. A spreadsheet in, a translated column next to each
     * chosen text column out. Every cell goes through a model, so the free
     * allowance is 200 rows instead of 500.
     */
    "translate-columns": {
      vocab: SPREADSHEET_VOCAB,
      overrides: {
        title: "Traduire des colonnes Excel, gratuit",
        description:
          "Envoyez un fichier Excel ou CSV et traduisez les colonnes de votre choix dans plus de 40 langues : anglais, espagnol, portugais, chinois et bien d'autres. Chaque traduction est ajoutée à côté de sa colonne. Gratuit, sans inscription pour voir le résultat.",
        label: "Traduire des colonnes",
        h1: "Traduisez les colonnes de votre feuille de calcul",
        intro:
          "Envoyez le fichier Excel ou CSV. Choisissez les colonnes à traduire et la langue cible. Tavnit détecte la langue source et ajoute la traduction à côté de chaque colonne, sans toucher au reste de votre fichier.",
        trust: ["CSV ou Excel · jusqu'à 200 lignes", "{limit} fichiers gratuits par jour", "Tout est supprimé au bout de 24 h"],
        drop: {
          title: "Déposez votre fichier Excel ou CSV ici",
          hint: "ou choisissez un fichier sur votre ordinateur",
          choose: "Choisir un fichier",
          sample: "Essayer avec un fichier d'exemple",
          formats: "CSV ou .xlsx · jusqu'à 4 Mo et 200 lignes",
        },
        errors: {
          unsupported: "Fichiers CSV ou Excel (.xlsx) uniquement.",
          xls: "C'est un ancien fichier Excel (.xls). Ouvrez-le dans Excel et enregistrez-le en .xlsx ou en .csv.",
          too_many_rows: "La traduction gratuite traite jusqu'à 200 lignes. Envoyez une partie du fichier.",
          too_many_columns: "Choisissez jusqu'à 10 colonnes à la fois.",
          no_columns: "Choisissez au moins une colonne.",
          nothing_to_clean: "Nous n'avons trouvé aucun texte à traduire dans ces colonnes.",
          empty: "Le fichier est vide ou n'a aucune ligne sous l'en-tête.",
          unreadable: "Nous n'avons pas pu lire le fichier. S'il s'agit d'un fichier Excel, enregistrez-le de nouveau en .xlsx.",
          failed: "Nous n'avons pas pu traduire ce fichier. Réessayez, ou essayez avec le fichier d'exemple.",
        },
        how: {
          heading: "Comment ça marche",
          steps: [
            { title: "Envoyez le fichier", body: "Un fichier CSV ou Excel avec des désignations, des instructions, des commentaires ou n'importe quelle colonne de texte." },
            { title: "Choisissez les colonnes et la langue", body: "Nous cochons les colonnes qui contiennent du texte. Vous choisissez la langue ; la langue source est détectée pour vous." },
            { title: "Vérifiez et téléchargez", body: "Chaque traduction se place à côté de sa colonne d'origine. Avec votre compte gratuit, vous emportez le fichier en Excel ou en CSV." },
          ],
        },
        faqs: [
          { q: "Quelles langues puis-je choisir ?", a: "Plus de 40 : anglais, espagnol, portugais, français, allemand, chinois, italien, japonais, coréen, arabe, russe, hindi, turc, vietnamien et bien d'autres. La langue source est détectée cellule par cellule, donc ça marche même quand votre fichier mélange plusieurs langues." },
          { q: "Que deviennent les codes, les nombres et les noms propres ?", a: "Ils sont conservés. La traduction respecte la mise en forme, les unités et les codes ; une cellule déjà dans la langue cible reste telle quelle." },
          { q: "Pourquoi la limite est-elle de 200 lignes ?", a: "Parce que chaque cellule est traduite par un modèle de langage. La version gratuite traite jusqu'à 200 lignes par fichier ; un compte n'a pas cette limite." },
          { q: "Que deviennent mes colonnes d'origine ?", a: "Elles restent telles quelles. La traduction est ajoutée dans une nouvelle colonne à côté, par exemple « Description (ES) »." },
          { q: "Puis-je l'utiliser pour les désignations de produits en douane ?", a: "Oui, c'est un usage courant : mettre en anglais ou en espagnol les désignations d'une facture commerciale ou d'une liste de colisage avant de classer les marchandises." },
          { q: "Que devient mon fichier ?", a: "Il sert uniquement à cette traduction et il est supprimé au bout de 24 heures avec le résultat. Seul votre navigateur peut voir le résultat." },
          { q: "Comment faire pour que ça se fasse tout seul ?", a: "Dans Tavnit, la traduction est un Cleaner : elle s'applique toute seule à chaque document que vous extrayez ou à chaque fichier qui arrive par e-mail ou par API, avec les dates, les nombres et les devises." },
        ],
        clean: {
          setup: {
            heading: "Choisissez les colonnes et la langue",
            fileSummary: "{rows} · {cols}",
            columnsLabel: "Colonnes avec du texte",
            columnsHint: "Jusqu'à {max}. Nous avons coché celles qui contiennent du texte.",
            tooMany: "Vous pouvez choisir jusqu'à {max} colonnes à la fois.",
            inputLabel: "",
            inputOptions: {},
            outputPopular: "Les plus utilisées",
            outputAll: "Toutes les langues",
            outputLabel: "Traduire en",
            outputOptions: {},
            preview: "Premières lignes",
            run: "Traduire",
            change: "Changer de fichier",
          },
          stages: ["Envoi du fichier", "Lecture des colonnes", "Détection de la langue", "Traduction", "Création de votre fichier"],
          heading: "Terminé : {file}",
          summary: "Traductions : {cells} dans {cols}",
          cellWord: ["cellule", "cellules"],
          columnWord: ["colonne", "colonnes"],
          unchanged: "Nous n'avons trouvé aucun texte à traduire dans ces colonnes.",
          highlight: "Les colonnes traduites sont en bleu.",
          shown: "{shown} lignes affichées sur {total}. Le téléchargement les contient toutes.",
          download: "Télécharger",
          downloadXlsx: "Excel (.xlsx)",
          downloadCsv: "CSV (.csv)",
          another: "Traduire un autre fichier",
          automate: {
            heading: "Faites-le pour chaque document",
            body: "Dans Tavnit, la traduction est un Cleaner. Vous la configurez une fois et chaque facture, liste de colisage ou fichier qui arrive a déjà ses désignations traduites.",
            cta: "Créer un compte gratuit",
            docs: "Qu'est-ce qu'un Cleaner",
          },
        },
      },
    },
  },

  og: {
    "invoice-to-excel": "Gratuit. Sans modèle. Les lignes de votre facture dans un tableur.",
    "invoice-line-items": "Gratuit. Une ligne par article, l'en-tête sur chaque ligne. Sans modèle.",
    "po-invoice-check": "Gratuit. Chaque ligne du bon de commande face à la facture : prix, quantité, lignes manquantes ou en trop.",
    "split-scanned-pdf": "Gratuit. Un scan en entrée, chaque document en sortie, chacun classé.",
    "packing-list-to-excel": "Gratuit. Sans modèle. Chaque ligne de votre liste de colisage dans un tableur.",
    "bill-of-lading-to-excel": "Gratuit. Sans modèle. Parties, navire, ports et une ligne par conteneur.",
    "quote-comparison": "Gratuit. Deux ou trois devis, un tableau, le moins cher signalé à chaque ligne.",
    "contract-dates": "Gratuit. Parties, durée, tacite reconduction et date limite de préavis, sur une ligne.",
    "receipt-to-excel": "Gratuit. Photographiez un reçu, récupérez ses articles dans un tableur.",
    "number-format": "Gratuit. N'importe quelle colonne de nombres, un seul format : 1234.56, 1,234.56 ou 1.234,56.",
    "date-format": "Gratuit. Des dates mélangées en entrée, un seul format en sortie, même en toutes lettres.",
    "currency-converter": "Gratuit. N'importe quelle colonne de prix, convertie au taux de référence du jour.",
    "translate-columns": "Gratuit. N'importe quelle colonne de texte, traduite dans plus de 40 langues.",
  },
};

export default copy;
