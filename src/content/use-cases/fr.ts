import type { UseCasesContent } from "@/content/types";

/** Use cases: the /use-cases hub copy and every use-case page — Français (fr). */
const fr: UseCasesContent = {
  hub: {
    title: "Cas d’usage — Factures, contrats, CV et plus encore",
    description:
      "Comment les équipes utilisent Tavnit selon le type de document — factures, contrats, CV, reçus, bons de commande et documents douaniers — et ce qui coince pour chacun.",
    ogTitle: "Cas d’usage Tavnit",
    breadcrumbHome: "Accueil",
    breadcrumb: "Cas d’usage",
    h1: "Cas d’usage",
    intro:
      "Le pipeline est le même quoi que vous lui envoyiez — extraire, nettoyer, vérifier, agir. Ce qui change, ce sont les champs qui comptent et ce qui a tendance à mal tourner.",
    introMore:
      "Chaque page ci-dessous présente les champs à extraire de ce type de document, les points qui cassent à coup sûr et l’étape du pipeline qui fait vraiment la différence.",
    notSeeingHeading: "Votre type de document n’y figure pas ?",
    notSeeing:
      "Ce sont les types sur lesquels les équipes nous interrogent le plus, pas la liste de ce que Tavnit prend en charge. Il n’y a aucune configuration par type de document à construire : vous décrivez les champs souhaités et la même extraction lit n’importe quel PDF ou image, scans et écriture manuscrite compris.",
    notSeeingMore:
      "Bons de livraison, relevés bancaires, déclarations de sinistre, formulaires médicaux, certificats et formulaires de demande fonctionnent tous de la même façon. Partez du [guide de démarrage](/docs) et définissez les champs qui comptent pour vous.",
    finalHeading: "Commencez par un document",
    finalBody:
      "Créez un flow, faites-y passer un vrai document et jugez le résultat avant de brancher quoi que ce soit. Des crédits offerts pour commencer.",
    finalCta: "Commencer gratuitement",
  },
  items: [
    {
      slug: "invoice-processing",
      label: "Traitement des factures",
      badge: "Finance et comptabilité fournisseurs",
      h1: "Extraction automatisée des données de factures",
      title: "Logiciel d’extraction de données de factures, lignes comprises",
      description:
        "Extrayez fournisseur, numéro de facture, dates, totaux et lignes complètes des factures fournisseurs, quelle que soit leur mise en page, avec une révision avant que quoi que ce soit n’arrive dans votre comptabilité.",
      summary:
        "Fournisseur, numéro, dates, totaux et lignes extraits de n’importe quelle mise en page — avec une révision avant l’entrée en comptabilité.",
      lede: "Tavnit lit les factures fournisseurs quelle que soit leur mise en page et restitue fournisseur, numéro de facture, dates, taxes, totaux et chaque ligne sous forme de champs typés. Aucun modèle à créer par fournisseur. Rien n’est passé en comptabilité tant qu’un vérificateur n’a pas approuvé, et chaque approbation est consignée.",
      problem: [
        "La comptabilité fournisseurs est la version classique de ce problème : les huit mêmes champs, ressaisis chaque mois depuis cent mises en page différentes. Chaque fournisseur a son format, certains envoient des scans, d’autres des photos de scans, et ceux qui changent de modèle le font sans prévenir.",
        "Les outils à modèles gèrent mal le premier problème — vous configurez une mise en page par fournisseur, et chaque nouveau fournisseur est une tâche de paramétrage. Dès qu’un fournisseur refait sa facture, le modèle casse sans rien signaler et les erreurs se propagent jusque dans votre comptabilité.",
      ],
      fields: [
        { name: "Nom et adresse du fournisseur", note: "Diffère souvent du nom commercial que vous avez enregistré — un Cleaner de recherche peut le rapprocher de votre liste de fournisseurs." },
        { name: "Numéro de facture", note: "Typé en texte, pas en nombre. Les zéros initiaux et les préfixes comptent, et une conversion numérique les détruit." },
        { name: "Dates d’émission et d’échéance", note: "Les formats varient selon les pays. Un Cleaner de dates ramène JJ/MM et MM/JJ à un seul format de sortie." },
        { name: "Lignes de facture", note: "Un tableau répétitif : description, quantité, prix unitaire, montant. La partie que la plupart des outils ignorent ou aplatissent." },
        { name: "Sous-total, taxes, remise, total", note: "Mieux vaut extraire les quatre, pour que le calcul soit vérifié plutôt que présumé." },
        { name: "Devise", note: "Un Cleaner de devises peut convertir dans votre devise de reporting au passage." },
        { name: "Numéro de bon de commande", note: "Lorsqu’il est présent, c’est lui qui permet de rapprocher automatiquement la facture d’un bon de commande." },
      ],
      gotchas: [
        {
          title: "C’est sur les lignes que l’extraction échoue le plus souvent",
          body: "Les champs d’en-tête sont faciles. Un tableau qui court sur un saut de page, comporte des cellules fusionnées ou répartit une description sur deux lignes, c’est là que la plupart des outils renvoient un résultat plausible et faux. Les champs de tableau d’un flow traitent les lignes répétées comme des lignes : une facture de cinq lignes donne cinq enregistrements, pas un bloc de texte.",
        },
        {
          title: "Un total erroné ressemble trait pour trait à un total juste",
          body: "Rien ne distingue visuellement 1 240,00 € bien lu de 1 240,00 € mal lu qui valait en réalité 1 249,00 €. C’est l’argument en faveur d’une révision conditionnelle : une règle de Cleaner vérifie que la somme des lignes donne le sous-total et n’envoie à une personne que les échecs — inutile de tout vérifier pour attraper les quelques cas qui comptent.",
        },
        {
          title: "Plusieurs factures arrivent dans un seul PDF",
          body: "Un relevé fournisseur ou un lot scanné contient souvent plusieurs factures dans un même fichier. Un Splitter les sépare d’abord, pour que chacune devienne un run distinct avec son propre enregistrement extrait, au lieu d’un tout fusionné et inexploitable.",
        },
      ],
      pipeline: [
        { label: "Intégration e-mail", href: "/docs/email-integration", why: "Les fournisseurs envoient déjà leurs factures par e-mail. Transférez automatiquement la boîte comptabilité et chaque pièce jointe est traitée sans que personne n’ouvre l’application." },
        { label: "Splitters", href: "/docs/splitters", why: "Sépare les scans groupés ou agrafés en factures individuelles avant l’extraction." },
        { label: "Cleaners", href: "/docs/cleaners", why: "Normalise les dates, convertit les devises, rapproche les fournisseurs de votre liste et signale les calculs qui ne tombent pas juste." },
        { label: "Révision humaine", href: "/docs/human-in-the-loop", why: "Met un run en attente d’approbation — chaque facture, ou seulement celles qu’une règle a signalées — avec une trace inaltérable de qui a approuvé quoi." },
        { label: "Webhooks", href: "/docs/webhooks", why: "Envoie l’enregistrement approuvé directement dans votre logiciel comptable dès qu’il a passé la révision." },
      ],
      faqs: [
        { q: "Gère-t-il les factures scannées et photographiées ?", a: "Oui. Scans, photos et PDF image passent tous par l’OCR avant l’extraction. La qualité compte quand même — un scan net s’extrait de façon plus fiable qu’une photo de téléphone prise de biais —, et c’est pour les cas limites que la révision existe." },
        { q: "Dois-je configurer un modèle par fournisseur ?", a: "Non. Vous définissez une seule fois les champs souhaités, et le même flow lit les factures de n’importe quel fournisseur, quelle que soit la mise en page. Ajouter un fournisseur ne demande aucune configuration." },
        { q: "Peut-il extraire les lignes, et pas seulement les totaux ?", a: "Oui. Les lignes sont définies comme des champs de tableau : un tableau répétitif donne un enregistrement par ligne, avec description, quantité, prix unitaire et montant typés séparément." },
        { q: "Comment gère-t-il les différentes devises ?", a: "La devise est extraite dans un champ à part, et un Cleaner peut convertir les montants dans votre devise de reporting pendant le traitement, pour que les systèmes en aval reçoivent une unité cohérente." },
      ],
    },
    {
      slug: "contract-analysis",
      label: "Analyse de contrats",
      badge: "Juridique et achats",
      h1: "Extraction de données de contrats",
      title: "Extraction de données de contrats — clauses et dates de renouvellement",
      description:
        "Sortez parties, dates d’effet et de renouvellement, conditions de paiement, préavis et plafonds de responsabilité de votre portefeuille de contrats, dans un tableau que vous pouvez vraiment interroger.",
      summary:
        "Parties, dates de renouvellement, préavis et conditions de paiement extraits d’un portefeuille de contrats dans un tableau interrogeable.",
      lede: "Tavnit lit les contrats signés et restitue sous forme de champs structurés les clauses qui engagent — parties, dates d’effet et de renouvellement, préavis, conditions de paiement, plafonds de responsabilité. Le portefeuille devient un tableau à interroger plutôt qu’un dossier à lire.",
      problem: [
        "La plupart des organisations sont incapables de répondre à des questions simples sur leurs propres contrats. Quels accords se renouvellent tacitement le trimestre prochain ? Quelle est notre exposition totale en responsabilité ? Quels fournisseurs ont un préavis de 90 jours ? Les réponses existent, éparpillées dans des centaines de PDF que personne n’a le temps d’ouvrir.",
        "Le coût, ce n’est pas la lecture — ce sont les renouvellements qui passent inaperçus et les clauses découvertes pendant un litige plutôt qu’avant.",
      ],
      fields: [
        { name: "Parties et entités signataires", note: "L’entité juridique n’est souvent pas le nom commercial, et les deux méritent d’être capturés." },
        { name: "Dates d’effet et d’échéance", note: "Le couple qui détermine toutes les questions de renouvellement que vous voudrez poser plus tard." },
        { name: "Tacite reconduction et préavis", note: "Les deux champs qui décident si un renouvellement est un choix ou une surprise." },
        { name: "Conditions et montants de paiement", note: "Paiement à 30 jours, jalons, clauses d’indexation. Souvent rédigés en texte plutôt que dans un tableau." },
        { name: "Plafond de responsabilité et indemnisations", note: "En général une clause, pas un chiffre. À extraire en texte, avec une valeur analysée lorsqu’elle existe." },
        { name: "Droit applicable et juridiction", note: "Court, facile à extraire, et fastidieux à retrouver à la main dans tout un portefeuille." },
        { name: "Droits de résiliation", note: "Pour convenance, pour faute, et le préavis que chacun exige." },
      ],
      gotchas: [
        {
          title: "La réponse est dans le texte, pas dans un champ",
          body: "Une facture met le total dans une case. Un contrat enfouit le préavis au milieu d’une clause, parfois en toutes lettres plutôt qu’en chiffres. Les consignes d’extraction vous permettent d’expliquer au flow ce que signifie la clause et où elle apparaît d’habitude, au lieu d’espérer qu’un libellé corresponde.",
        },
        {
          title: "Les avenants changent la réponse",
          body: "Les clauses en vigueur se trouvent souvent dans un avenant, pas dans l’original. Traitez chaque document comme un run distinct et conservez la date de signature dans un champ : la situation actuelle devient une requête plutôt qu’une hypothèse sur le fichier le plus récent.",
        },
        {
          title: "Une erreur coûte cher, la révision n’est donc pas facultative",
          body: "Une date de renouvellement mal lue, c’est un contrat dont vous n’êtes pas sorti à temps. C’est un cas d’usage où une révision à chaque run est proportionnée, et où la piste d’audit inaltérable compte autant que l’extraction — vous pouvez montrer qui a confirmé une clause, et quand.",
        },
      ],
      pipeline: [
        { label: "Flows", href: "/docs/flows", why: "Les consignes d’extraction expliquent à l’IA ce que signifie une clause, ce qui compte bien plus ici que sur des documents aux champs étiquetés." },
        { label: "Révision humaine", href: "/docs/human-in-the-loop", why: "Une révision à chaque run, avec une trace permanente de qui a confirmé chaque clause." },
        { label: "Buckets", href: "/docs/buckets", why: "Transforme le portefeuille en tableau interrogeable — quels accords se renouvellent le trimestre prochain, triés par préavis." },
        { label: "Cleaners", href: "/docs/cleaners", why: "Normalise les formats de date et peut calculer une date limite de préavis à partir d’une échéance et d’une durée de préavis." },
      ],
      faqs: [
        { q: "Peut-il traiter des contrats sans structure cohérente ?", a: "Oui — c’est le cas normal. Il n’y a aucun modèle à configurer. Vous décrivez les clauses souhaitées et le flow les repère où qu’elles se trouvent, c’est pourquoi les consignes d’extraction comptent davantage ici que sur des documents structurés." },
        { q: "Et les avenants et lettres annexes ?", a: "Traitez chacun comme un run distinct en capturant la date de signature dans un champ. La situation actuelle découle alors d’une requête sur votre Bucket, au lieu de deviner quel PDF est le plus récent." },
        { q: "Les données extraites sont-elles interrogeables ?", a: "Oui. Les résultats arrivent dans un Bucket sous forme de colonnes typées : vous pouvez filtrer, trier et représenter en graphiques tout le portefeuille sans rien exporter." },
      ],
    },
    {
      slug: "resume-screening",
      label: "Tri de CV",
      badge: "RH et recrutement",
      h1: "Analyse et tri de CV",
      title: "Logiciel d’analyse de CV — des données candidats structurées",
      description:
        "Transformez des CV de tous formats en fiches candidats homogènes — coordonnées, compétences, postes, dates, formation — pour que le tri devienne un filtre et non une lecture.",
      summary:
        "Des CV de tous formats transformés en fiches candidats homogènes : le tri devient un filtre plutôt qu’une lecture.",
      lede: "Tavnit lit les CV quelle que soit leur mise en page et restitue des fiches candidats homogènes : coordonnées, compétences, intitulés de poste avec dates, formation et certifications. Comme chaque candidat est décrit avec les mêmes champs, trier revient à filtrer un tableau plutôt qu’à ouvrir deux cents PDF.",
      problem: [
        "Le CV est le document le moins standardisé que la plupart des équipes manipulent. Une ou deux colonnes, des tableaux ou du texte, une mise en page graphique avec les dates dans une colonne latérale. Une personne les lit tous ; un logiciel, en général, à peu près la moitié.",
        "Le vrai coût, c’est l’incohérence. Quand cent CV sont résumés chacun un peu différemment, comparer les candidats sur les mêmes critères devient impossible, et le tri se résume discrètement aux préférences du premier lecteur.",
      ],
      fields: [
        { name: "Nom et coordonnées", note: "Souvent dans un en-tête, une colonne latérale ou une image — l’un des échecs d’extraction les plus courants." },
        { name: "Postes avec employeurs et dates", note: "Un tableau répétitif, pas une valeur unique. Les champs de tableau gardent chaque poste sur sa propre ligne." },
        { name: "Années d’expérience au total", note: "Rarement indiqué. Un Cleaner de formule peut le calculer à partir des dates des postes au lieu de se fier à une affirmation." },
        { name: "Compétences", note: "À extraire mot pour mot, puis à normaliser — un Cleaner de catégorie peut ramener « JS », « JavaScript » et « ES6 » à une seule valeur." },
        { name: "Formation et certifications", note: "Établissement, diplôme, année. Encore une structure répétitive." },
        { name: "Localisation et autorisation de travail", note: "Souvent le premier filtre éliminatoire, et souvent enfoui dans l’en-tête." },
      ],
      gotchas: [
        {
          title: "Les mises en page à deux colonnes piègent les lecteurs naïfs",
          body: "Un CV graphique avec une colonne latérale, lu de haut en bas par un outil qui extrait simplement le texte, devient un mélange incompréhensible. Une extraction qui tient compte de la mise en page garde la colonne latérale et la colonne principale séparées : les coordonnées placées sur le côté arrivent quand même dans le bon champ.",
        },
        {
          title: "Sans normalisation des compétences, le filtre est inutile",
          body: "Extraites telles quelles, vous obtenez « JS », « JavaScript », « Javascript (ES6) » et « JAVASCRIPT » comme quatre valeurs distinctes, et filtrer sur l’une manque les autres. Un Cleaner de catégorie ramène les variantes à un vocabulaire contrôlé, pour que le filtre renvoie vraiment tous les profils qualifiés.",
        },
        {
          title: "Ce sont des données personnelles, et les règles sont plus strictes",
          body: "Les CV sont par définition des données personnelles, et dans plusieurs juridictions les données des candidats sont soumises à des durées de conservation et à un droit à l’effacement. La visibilité des Buckets et les accès accordés par utilisateur vous permettent de réserver les fiches candidats aux personnes qui mènent le recrutement, au lieu de les rendre visibles dans toute l’organisation.",
        },
      ],
      pipeline: [
        { label: "Flows", href: "/docs/flows", why: "Les champs de tableau gardent chaque poste et chaque diplôme sur sa propre ligne plutôt que dans un bloc de texte." },
        { label: "Cleaners", href: "/docs/cleaners", why: "Ramène les noms de compétences à un vocabulaire contrôlé et calcule l’expérience totale à partir des dates des postes." },
        { label: "Buckets", href: "/docs/buckets", why: "Les fiches candidats sous forme de tableau filtrable, avec des accès par Bucket pour que les données des candidats ne soient pas visibles dans toute l’organisation." },
        { label: "Intégration e-mail", href: "/docs/email-integration", why: "Les candidatures reçues par e-mail sont traitées dès leur arrivée, pièces jointes comprises." },
      ],
      faqs: [
        { q: "Gère-t-il les CV à deux colonnes et les CV graphiques ?", a: "Oui. L’extraction tient compte de la mise en page au lieu de lire le texte brut de haut en bas : colonnes latérales et mises en page multicolonnes ne se mélangent pas." },
        { q: "Peut-il uniformiser les noms de compétences ?", a: "Oui. Extrayez-les mot pour mot, puis utilisez un Cleaner de catégorie pour ramener les variantes à un vocabulaire contrôlé : filtrer sur une compétence renvoie alors tous les candidats qui la possèdent." },
        { q: "Comment les données des candidats restent-elles confidentielles ?", a: "Les Buckets peuvent être privés plutôt que visibles par toute l’organisation, avec des accès Lecteur ou Éditeur accordés par utilisateur. Les fiches candidats restent réservées aux personnes qui mènent le recrutement." },
      ],
    },
    {
      slug: "expense-reports",
      label: "Notes de frais",
      badge: "Finance et collaborateurs",
      h1: "Traitement des reçus et des notes de frais",
      title: "OCR de reçus et automatisation des notes de frais",
      description:
        "Transformez des reçus photographiés en lignes de dépenses catégorisées — commerçant, date, montant, taxes et catégorie — pour que le remboursement soit une vérification et non de la saisie.",
      summary:
        "Des reçus photographiés transformés en lignes de dépenses catégorisées : le remboursement devient une vérification plutôt que de la saisie.",
      lede: "Tavnit lit les reçus — y compris ceux, froissés, photographiés sous un mauvais éclairage — et restitue commerçant, date, montant, taxes et catégorie sous forme de champs typés. Les dépenses arrivent catégorisées et vérifiables : approuver une note de frais devient une relecture plutôt qu’un travail de transcription.",
      problem: [
        "Le traitement des notes de frais échoue aux deux bouts. Les collaborateurs repoussent l’envoi parce que remplir le formulaire est fastidieux, puis la finance ressaisit ce qui a été envoyé parce que le formulaire a été rempli de façon incohérente. Les remboursements prennent du retard, et personne n’y trouve son compte.",
        "Les reçus sont aussi les documents de plus mauvaise qualité que traitent la plupart des entreprises : papier thermique décoloré, photographié de biais, plié, parfois en partie dans une autre langue.",
      ],
      fields: [
        { name: "Nom du commerçant", note: "Souvent un logo stylisé plutôt que du texte — l’un des champs les plus difficiles d’un reçu." },
        { name: "Date et heure de la transaction", note: "L’heure compte plus qu’on ne le pense pour les indemnités journalières et la détection des doublons." },
        { name: "Total, taxes et pourboire", note: "Isoler les taxes compte pour leur récupération ; isoler le pourboire compte pour la politique de dépenses." },
        { name: "Moyen de paiement et quatre derniers chiffres", note: "Ce qui permet un rapprochement automatique avec un relevé de carte." },
        { name: "Catégorie de dépense", note: "Mieux vaut la faire déduire par un Cleaner de catégorie IA à partir du commerçant et des lignes, plutôt que de la demander au collaborateur." },
        { name: "Devise", note: "Les frais de déplacement arrivent dans la devise dépensée ; la conversion a sa place dans le pipeline." },
      ],
      gotchas: [
        {
          title: "La qualité des reçus est vraiment mauvaise",
          body: "Papier thermique décoloré, reflets, plis et angles sont la norme plutôt que l’exception. L’extraction en gère la plus grande partie, mais c’est un type de document où la révision conditionnelle se justifie pleinement : signalez à une personne les montants à faible confiance ou hors politique, et laissez passer les reçus nets.",
        },
        {
          title: "La catégorisation, c’est le vrai travail",
          body: "Lire le total est facile. Décider si une note de restaurant relève du repas d’affaires ou du repas d’équipe, voilà ce qui consomme le temps de la finance. Un Cleaner de catégorie IA attribue une catégorie à partir du commerçant et des lignes : le collaborateur n’a plus à deviner, et la finance corrige au lieu de classer.",
        },
        {
          title: "Les doublons sont fréquents et coûteux",
          body: "Le même reçu soumis deux fois — une fois en photo, une fois en PDF envoyé par le commerçant — est une source classique de remboursement en trop. Extraire le commerçant, le montant exact et l’horodatage suffit pour le détecter dans le Bucket au lieu de le découvrir lors d’un audit.",
        },
      ],
      pipeline: [
        { label: "Intégration e-mail", href: "/docs/email-integration", why: "Les collaborateurs transfèrent leurs reçus à une adresse au lieu d’apprendre une application. Les reçus numériques peuvent être transférés automatiquement dès réception." },
        { label: "Cleaners", href: "/docs/cleaners", why: "Attribue une catégorie par IA, convertit les devises étrangères et uniformise les noms de commerçants." },
        { label: "Révision humaine", href: "/docs/human-in-the-loop", why: "Révision conditionnelle — seules les dépenses au-dessus d’un seuil ou hors politique arrivent chez un approbateur." },
        { label: "Buckets", href: "/docs/buckets", why: "Les dépenses sous forme de tableau à regrouper, représenter en graphiques et vérifier contre les doublons avant paiement." },
      ],
      faqs: [
        { q: "Peut-il lire la photo d’un reçu froissé ?", a: "En général, oui. Photos, papier thermique décoloré et reçus pliés passent tous par l’OCR, mais la qualité fixe la limite — c’est pourquoi la révision conditionnelle existe pour les cas dont le pipeline est le moins sûr." },
        { q: "Les dépenses peuvent-elles être catégorisées automatiquement ?", a: "Oui. Un Cleaner de catégorie IA attribue une catégorie à partir du commerçant et des lignes : la finance corrige les cas particuliers occasionnels au lieu de tout classer." },
        { q: "Et les devises étrangères des frais de déplacement ?", a: "La devise est un champ extrait à part, et un Cleaner de conversion peut exprimer les montants dans votre devise de reporting pendant le traitement." },
      ],
    },
    {
      slug: "purchase-orders",
      label: "Bons de commande",
      badge: "Achats et comptabilité fournisseurs",
      h1: "Logiciel de rapprochement : rapprochez automatiquement factures et bons de commande",
      title: "Rapprochement automatisé des factures et des bons de commande",
      description:
        "Logiciel de rapprochement des bons de commande : extrayez bons de commande et factures dans les mêmes champs, appariez les lignes automatiquement et n’envoyez à un vérificateur que les écarts.",
      summary:
        "Bons de commande et factures extraits sous une même forme, appariés ligne par ligne, avec seulement les écarts envoyés à un vérificateur.",
      lede: "Tavnit lit les bons de commande et les factures qui suivent, extrait numéro de bon de commande, fournisseur, codes articles, quantités et prix sous forme de champs typés, et apparie automatiquement les lignes de facture aux lignes du bon de commande — même quand le fournisseur décrit un article autrement. Le rapprochement au niveau de l’en-tête est une recherche sur le numéro de bon de commande ; au niveau des lignes, c’est une comparaison par Matcher ; tout ce qui ne concorde pas part chez un vérificateur désigné plutôt que dans votre comptabilité.",
      problem: [
        "Le rapprochement des bons de commande vérifie que ce qui est facturé correspond à ce qui a été commandé. Dans la plupart des équipes, il se fait encore à l’œil : un comptable fournisseurs ouvre le PDF de la facture, retrouve le bon de commande et compare quantités et prix ligne par ligne. C’est lent, et c’est là que passent les deux erreurs coûteuses — une quantité fausse et un prix unitaire faux —, parce qu’elles ressemblent trait pour trait à des valeurs justes.",
        "Les outils de rapprochement automatisé des ERP supposent que les deux documents sont déjà structurés. Ils ne le sont pas. Le bon de commande sort de votre système, mais la facture sort de celui du fournisseur, en PDF, avec ses références et sa mise en page. La mettre sous une forme comparable, c’est la moitié non résolue du problème, et c’est celle dont Tavnit se charge.",
      ],
      fields: [
        { name: "Numéro de bon de commande", note: "La clé sur laquelle tout se rattache. À extraire en texte — préfixes et zéros initiaux sont significatifs, et les fournisseurs le placent à des endroits différents sur la facture." },
        { name: "Fournisseur et acheteur", note: "Le nom du fournisseur sur la facture correspond rarement mot pour mot à la fiche fournisseur. Un Cleaner de recherche le ramène à votre identifiant fournisseur." },
        { name: "Lignes : description, référence, quantité", note: "Un tableau répétitif sur les deux documents. Les références fournisseur diffèrent généralement des vôtres ; les descriptions sont formulées différemment — c’est ce qui rend le rapprochement des lignes difficile." },
        { name: "Prix unitaire et montant de la ligne", note: "Les deux, pour vérifier prix unitaire × quantité sur la facture elle-même avant de la comparer au bon de commande." },
        { name: "Totaux de la facture et du bon de commande", note: "Rapprochement au niveau de l’en-tête. Un total qui concorde alors qu’une ligne diverge, c’est une inversion quantité/prix — le cas qu’un contrôle limité au total laisse passer." },
        { name: "Date de livraison et référence du bon de livraison", note: "Le troisième document d’un rapprochement à trois voies. Les bons de livraison sont extraits de la même façon ; voir la page consacrée aux bons de livraison." },
        { name: "Conditions de paiement et devise", note: "Des champs courts aux conséquences démesurées quand la facture contredit le bon de commande." },
      ],
      gotchas: [
        {
          title: "À deux ou trois voies, le rapprochement ne marche que si les formes concordent",
          body: "Un rapprochement à deux voies compare la facture au bon de commande ; un rapprochement à trois voies y ajoute le bon de réception. Les deux s’effondrent quand les documents sont extraits sous des noms de champs différents. Faire passer bons de commande, factures et bons de livraison dans des flows qui partagent le même schéma — numéro de bon de commande, référence, quantité, prix unitaire —, c’est ce qui transforme le rapprochement en comparaison plutôt qu’en lecture de documents.",
        },
        {
          title: "Les références du fournisseur ne sont pas les vôtres",
          body: "Le bon de commande indique votre code article ; la facture, celui du fournisseur. Un Cleaner de recherche fait correspondre les références fournisseur à vos codes articles d’après vos données de référence pendant le traitement : la facture arrive déjà traduite. Faute de référentiel, un Matcher apparie les lignes selon le sens de la description — sémantiquement, pas au mot près —, avec un LLM pour départager les cas limites.",
        },
        {
          title: "Un rapprochement ligne par ligne, pas seulement sur les totaux",
          body: "Définissez le run du bon de commande comme référence et la facture comme le run comparé. Le Matcher apparie chaque ligne de facture à une ligne du bon de commande et place quantité et prix unitaire côte à côte ; les lignes non appariées sont listées comme avertissements au lieu de disparaître sans bruit. Un contrôle limité au total validerait une facture du bon montant pour les mauvais articles.",
        },
        {
          title: "Seules les exceptions devraient arriver chez une personne",
          body: "Vérifier chaque facture recrée le processus manuel. Un Cleaner de formule vérifie que prix unitaire × quantité égale le montant de la ligne sur la facture elle-même, et une condition signale les lignes hors tolérance. La révision humaine ne se déclenche que pour les runs signalés : le vérificateur voit les trois factures qui divergent, pas les trois cents qui concordent.",
        },
      ],
      pipeline: [
        { label: "Collections", href: "/docs/collections", why: "Les fournisseurs envoient bons de commande, factures et bons de livraison à une seule adresse. Les Collections classent chaque document et l’acheminent vers le bon flow." },
        { label: "Cleaners", href: "/docs/cleaners", why: "Font correspondre références fournisseur et noms de fournisseurs à vos données de référence, vérifient les calculs des lignes et signalent les valeurs hors tolérance." },
        { label: "Buckets", href: "/docs/buckets", why: "Conservent bons de commande et factures sous la même forme : le rapprochement au niveau de l’en-tête devient une requête sur le numéro de bon de commande." },
        { label: "Révision humaine", href: "/docs/human-in-the-loop", why: "Seules les factures signalées attendent un vérificateur désigné, avec une piste d’audit inaltérable de qui a approuvé quoi." },
        { label: "Intégration API", href: "/docs/api-integration", why: "Envoie les factures rapprochées et approuvées dans votre ERP ou votre logiciel fournisseurs, sans étape manuelle." },
      ],
      faqs: [
        { q: "Qu’est-ce que le rapprochement des bons de commande ?", a: "C’est la vérification qu’une facture concorde avec le bon de commande auquel elle se rapporte — même fournisseur, mêmes articles, mêmes quantités et mêmes prix. Un rapprochement à deux voies compare la facture au bon de commande ; à trois voies, il vérifie aussi le bon de réception. C’est le contrôle qui évite de payer un fournisseur pour quelque chose qui n’a pas été commandé ou pas livré." },
        { q: "Tavnit peut-il rapprocher automatiquement factures et bons de commande ?", a: "Oui. Extrayez les deux dans la même structure de champs et le rapprochement au niveau de l’en-tête devient une requête sur le numéro de bon de commande dans votre Bucket. Pour le rapprochement ligne par ligne, un Matcher en mode référence prend le bon de commande comme base et y apparie chaque ligne de facture, en affichant quantité et prix unitaire côte à côte. Les lignes impossibles à apparier sont listées comme avertissements." },
        { q: "Et si le fournisseur utilise ses propres références ou descriptions ?", a: "Un Cleaner de recherche fait correspondre les références fournisseur à vos codes articles pendant le traitement lorsque vous disposez de données de référence. Sinon, le Matcher apparie les lignes selon le sens de la description plutôt que le texte exact, avec un LLM pour départager les cas limites : « Gadget bleu lot de 10 » et « GADGET-BLE x10 » se retrouvent sur la même ligne." },
        { q: "Que se passe-t-il quand une facture ne concorde pas ?", a: "Elle s’arrête. Un Cleaner de condition signale le run et la révision humaine l’envoie à un vérificateur désigné, qui voit la facture, les valeurs extraites et le désaccord. Les factures concordantes passent directement dans votre ERP par API ou webhook. Chaque consultation, modification et approbation est consignée dans une piste d’audit inaltérable." },
        { q: "Fait-il le rapprochement à trois voies avec les bons de livraison ?", a: "Les bons de livraison et bons de réception sont extraits comme les bons de commande et les factures — y compris les quantités manuscrites sur les preuves de livraison signées — dans la même forme de champs : la troisième branche du rapprochement est un troisième run comparé au bon de commande." },
        { q: "Faut-il changer d’ERP ?", a: "Non. Tavnit se place en amont : les documents arrivent par e-mail ou par API, sont extraits et rapprochés, et les résultats approuvés sont livrés à votre ERP ou votre logiciel fournisseurs par API REST ou webhook. Des recettes Zapier, Make et n8n existent pour les équipes qui préfèrent ne pas écrire de code." },
        { q: "Les lignes arrivent-elles séparément ?", a: "Oui. Les lignes sont des champs de tableau : chaque ligne restitue référence, description, quantité, prix unitaire et montant comme des valeurs typées distinctes — c’est ce qui rend possible la comparaison ligne par ligne." },
      ],
    },
    {
      slug: "customs-trade",
      label: "Douane et commerce international",
      badge: "Logistique et commerce",
      h1: "Automatisation des documents douaniers",
      title: "Automatisation douanière avec classement des codes SH",
      description:
        "Extrayez factures commerciales, listes de colisage et connaissements, et classez les marchandises dans les codes tarifaires SH pendant le traitement plutôt qu’après.",
      summary:
        "Factures commerciales, listes de colisage et connaissements extraits — avec le classement tarifaire SH intégré au pipeline.",
      lede: "Tavnit lit les documents douaniers — factures commerciales, listes de colisage, connaissements, certificats d’origine — et restitue expéditeur, destinataire, désignation des marchandises, poids et valeurs sous forme de champs typés. Un Cleaner de code SH classe les marchandises dans les codes tarifaires pendant le traitement : les déclarations se préparent à partir de données structurées au lieu d’être ressaisies.",
      problem: [
        "Une seule expédition génère une pile de documents qui répètent les mêmes informations dans des mises en page différentes, et une déclaration en douane exige qu’elles soient réconciliées et exactes. Le travail mêle transcription et classement, sous pression, et une erreur se paie d’une expédition retardée ou d’une pénalité.",
        "Le classement est la partie spécialisée. Déterminer le code tarifaire d’une désignation donnée relève du jugement, et la plupart des outils d’extraction ne s’y essaient même pas : il reste une étape manuelle une fois l’automatisation terminée.",
      ],
      fields: [
        { name: "Expéditeur et destinataire", note: "Raisons sociales et adresses complètes, qui conditionnent la déclaration." },
        { name: "Désignation des marchandises par ligne", note: "Le texte dont découle le classement tarifaire — à extraire mot pour mot." },
        { name: "Code tarifaire SH", note: "Classé à partir de la désignation par un Cleaner pendant le traitement, plutôt que recherché après coup." },
        { name: "Quantité, poids net et poids brut", note: "Les poids figurent sur la liste de colisage et les valeurs sur la facture : il faut réconcilier les deux." },
        { name: "Pays d’origine", note: "Détermine les taux de droits et le traitement préférentiel. Souvent par ligne plutôt que par expédition." },
        { name: "Incoterms et valeur déclarée", note: "Déterminent ce qui est taxable et qui est responsable de quoi." },
        { name: "Numéros de conteneur et de connaissement", note: "Les clés qui permettent de rattacher le jeu de documents à une seule expédition." },
      ],
      gotchas: [
        {
          title: "Le classement est la partie difficile, et il est intégré",
          body: "La plupart des outils documentaires s’arrêtent à l’extraction et laissent le classement tarifaire en travail manuel. Tavnit fournit un Cleaner de code SH qui classe les marchandises à partir de la désignation extraite pendant le run : l’étape spécialisée a lieu dans le pipeline et non après.",
        },
        {
          title: "Une expédition, plusieurs documents, une seule vérité",
          body: "La facture commerciale porte les valeurs, la liste de colisage les poids, le connaissement le conteneur. Une Collection achemine chaque type de document vers son propre flow, et un Bucket commun indexé sur la référence d’expédition les réassemble en une vue unique.",
        },
        {
          title: "Ici, les erreurs sont des pénalités, pas des corrections",
          body: "Un code ou une valeur mal déclarés sont une affaire douanière, pas comptable. C’est un cas d’usage où une révision à chaque déclaration est proportionnée, et où la piste d’audit inaltérable est vraiment utile quand on vous demande de montrer comment un classement a été établi.",
        },
      ],
      pipeline: [
        { label: "Collections", href: "/docs/collections", why: "Achemine automatiquement factures, listes de colisage et connaissements d’une même boîte de réception vers le bon flow." },
        { label: "Cleaners", href: "/docs/cleaners", why: "Classe les marchandises dans les codes tarifaires SH, convertit les devises et uniformise poids et unités." },
        { label: "Splitters", href: "/docs/splitters", why: "Les documents d’expédition arrivent souvent en un seul PDF combiné. Les Splitters les séparent avant l’extraction." },
        { label: "Révision humaine", href: "/docs/human-in-the-loop", why: "Vérifiez chaque déclaration avant son dépôt, avec une trace de qui a approuvé quel classement." },
      ],
      faqs: [
        { q: "Attribue-t-il réellement les codes tarifaires SH ?", a: "Oui. Un Cleaner de code SH classe les marchandises à partir de la désignation extraite pendant le run : le classement a lieu dans le pipeline et non comme une étape manuelle ensuite. Les déclarations restent sous votre responsabilité, c’est pourquoi une révision avant dépôt est recommandée." },
        { q: "Peut-il traiter le jeu complet de documents d’une expédition ?", a: "Oui. Une Collection achemine factures commerciales, listes de colisage et connaissements vers leurs propres flows, et les résultats indexés sur la référence d’expédition se réassemblent en un seul enregistrement." },
        { q: "Et si les documents arrivent en un seul PDF combiné ?", a: "Un Splitter sépare d’abord le fichier combiné en ses différents documents, pour que chacun soit extrait par le flow conçu pour lui." },
      ],
    },
    {
      slug: "bank-statements",
      label: "Relevés bancaires",
      badge: "Finance et crédit",
      h1: "Extraction de données de relevés bancaires",
      title: "Extraction de relevés bancaires — du PDF aux lignes de transactions",
      description:
        "Transformez les relevés PDF de n’importe quelle banque en lignes de transactions — date, libellé, montant, solde progressif — prêtes à rapprocher ou à analyser.",
      summary: "Les relevés PDF de n’importe quelle banque transformés en lignes de transactions à rapprocher, catégoriser ou analyser.",
      lede: "Tavnit lit les relevés bancaires PDF de n’importe quel établissement et restitue chaque transaction sous forme de ligne : date, libellé, débit ou crédit, et solde progressif. Comme le solde est extrait lui aussi, le calcul peut être vérifié plutôt que présumé — c’est ce qui permet de rapprocher le résultat en toute sécurité.",
      problem: [
        "Chaque banque présente ses relevés à sa façon, et aucune ne les conçoit pour des machines. Les colonnes se décalent, les transactions s’étalent sur deux lignes, et le solde progressif est le seul fil qui relie la séquence. Quiconque fait de l’analyse de crédit, de la tenue de comptes ou du rapprochement finit par ressaisir ou par payer un connecteur par banque.",
        "L’open banking résout le problème là où il est disponible et où le client consent. Pour tout le reste — périodes passées, comptes professionnels, banques sans API, relevés fournis comme justificatifs —, le PDF est la seule source disponible.",
      ],
      fields: [
        { name: "Titulaire, numéro de compte et code banque", note: "En général sur la première page seulement : il faut les reporter sur tout un relevé de plusieurs pages." },
        { name: "Période du relevé", note: "Donne leur sens aux totaux, et c’est l’élément le plus souvent oublié lors d’une ressaisie manuelle." },
        { name: "Date de transaction", note: "Souvent abrégée et sans année — l’année vient de la période du relevé, pas de la ligne." },
        { name: "Libellé ou contrepartie", note: "Tronqué et abrégé par la banque. Un Cleaner de catégorie en déduit le commerçant et le type d’opération." },
        { name: "Débit, crédit et solde progressif", note: "Extrayez les trois. C’est le solde qui permet de vérifier qu’aucune ligne n’a été perdue." },
        { name: "Solde d’ouverture et de clôture", note: "La somme de contrôle de tout le relevé." },
      ],
      gotchas: [
        {
          title: "Sans le solde, une ligne perdue est invisible",
          body: "Si l’extraction manque une transaction, les lignes restantes paraissent toujours parfaitement plausibles. Extraire le solde progressif en fait une erreur détectable : un Cleaner de formule vérifie que le solde de chaque ligne égale le solde précédent plus le mouvement, et signale le relevé au lieu de le laisser passer.",
        },
        {
          title: "Les transactions débordent, et une ligne qui déborde n’est pas une nouvelle transaction",
          body: "Les noms de contrepartie trop longs débordent sur une deuxième ligne, et une lecture de tableau naïve transforme un paiement en deux lignes, dont une sans montant. Les champs de tableau traitent une ligne comme une ligne : un libellé qui déborde reste rattaché à son montant.",
        },
        {
          title: "Les dates portent rarement l’année",
          body: "La plupart des relevés impriment « 14 mars » et comptent sur la période indiquée en haut pour l’année. Cela convient à une personne, pas à une base de données — surtout à cheval sur deux années dans un relevé de janvier. Extrayez la période du relevé et déduisez-en la date complète avec un Cleaner de formule.",
        },
      ],
      pipeline: [
        { label: "Flows", href: "/docs/flows", why: "Les transactions sont des champs de tableau : chacune revient comme une ligne typée plutôt que comme un bloc de texte." },
        { label: "Cleaners", href: "/docs/cleaners", why: "Déduit les dates complètes de la période du relevé, vérifie les soldes progressifs et catégorise les contreparties." },
        { label: "Buckets", href: "/docs/buckets", why: "Les transactions arrivent dans un tableau interrogeable — filtrez par contrepartie, regroupez par mois, tracez l’évolution du solde." },
        { label: "Révision humaine", href: "/docs/human-in-the-loop", why: "N’envoie à une personne que les relevés qui échouent au contrôle du solde, au lieu de tous les vérifier." },
      ],
      faqs: [
        { q: "Fonctionne-t-il avec n’importe quelle banque ?", a: "Oui. Il n’y a pas de modèle à configurer par banque — le même flow lit les relevés de n’importe quel établissement, y compris les comptes professionnels et les périodes passées qu’une API d’open banking ne couvrirait pas." },
        { q: "Comment savoir qu’aucune transaction n’a été manquée ?", a: "Extrayez le solde progressif avec chaque transaction, puis utilisez un Cleaner de formule pour vérifier que chaque ligne se rapproche de la précédente. Un relevé qui échoue au contrôle est signalé au lieu de passer sans bruit." },
        { q: "Les transactions peuvent-elles être catégorisées automatiquement ?", a: "Oui. Un Cleaner de catégorie IA attribue une catégorie à partir du libellé : la tenue des comptes part de lignes classées plutôt que du texte brut de la banque." },
      ],
    },
    {
      slug: "supplier-quotes",
      label: "Devis fournisseurs",
      badge: "Achats et sourcing",
      h1: "Comparaison de devis fournisseurs",
      title: "Comparer les devis fournisseurs et étalonner les prix",
      description:
        "Extrayez les lignes de devis concurrents et comparez-les automatiquement — en appariant les articles équivalents d’un fournisseur à l’autre et en désignant le meilleur prix par ligne.",
      summary: "Des devis concurrents extraits et comparés ligne par ligne, avec le meilleur prix désigné pour chaque article.",
      lede: "Tavnit extrait les lignes des devis fournisseurs concurrents, puis les Matchers apparient les articles équivalents d’un fournisseur à l’autre et désignent un gagnant par ligne sur le prix. Vous obtenez un tableau comparatif plutôt que trois PDF et un tableur construit à la main.",
      problem: [
        "Comparer des devis est la partie du sourcing qui ne devient jamais plus simple. Trois fournisseurs envoient trois mises en page, décrivent le même article de trois façons et proposent des conditionnements différents. Quelqu’un monte un tableur, ressaisit tout et espère avoir apparié les bonnes lignes.",
        "L’appariement est la vraie difficulté. « Boulon hexagonal M8 50 mm », « Boulon, hex, M8x50 » et « BOULON HEX M8 50MM zingué » désignent le même article, et aucune recherche par correspondance exacte ne les appariera jamais.",
      ],
      fields: [
        { name: "Identité du fournisseur", note: "Le champ qui nomme chaque participant à la comparaison. Un devis, un fournisseur." },
        { name: "Désignation de l’article", note: "Le texte apparié d’un fournisseur à l’autre. À extraire mot pour mot — normaliser trop tôt détruit le signal dont l’appariement a besoin." },
        { name: "Prix unitaire", note: "Le champ numérique sur lequel se décide le gagnant. Les mentions non numériques comme « sur demande » sont exclues et signalées plutôt qu’ignorées sans bruit." },
        { name: "Quantité et unité de mesure", note: "Utilisées comme contexte d’appariement, pour qu’un lot de 12 ne soit pas apparié à une unité." },
        { name: "Délai de livraison", note: "Souvent le facteur décisif quand les prix sont proches, et rarement capturé dans les comparaisons manuelles." },
        { name: "Date de validité et conditions de paiement", note: "Un devis moins cher assorti de moins bonnes conditions n’est pas toujours moins cher." },
      ],
      gotchas: [
        {
          title: "Le même article n’est jamais décrit deux fois de la même façon",
          body: "C’est pourquoi la correspondance exacte échoue et pourquoi la comparaison reste manuelle presque partout. Les Matchers apparient les lignes par le sens plutôt que par égalité de chaînes, avec un LLM pour départager les paires ambiguës : des descriptions formulées différemment pour un même article se retrouvent alignées.",
        },
        {
          title: "Le conditionnement fausse une comparaison sans prévenir",
          body: "Un devis pour une boîte de 12 face à un devis pour une unité, ce n’est pas un écart de prix, c’est une erreur d’unité — et c’est l’erreur qui survit à la relecture, parce que les deux chiffres paraissent raisonnables. Les champs de contexte permettent d’inclure quantité et unité de mesure dans l’appariement : des articles différents restent non appariés au lieu de produire un faux gagnant.",
        },
        {
          title: "Toutes les lignes n’ont pas un prix comparable",
          body: "Les devis contiennent des « sur demande », des « inclus » et des cellules vides. Plutôt que d’écarter ces lignes discrètement, la comparaison les exclut du classement et enregistre un avertissement sur la ligne : vous voyez ce qui n’a pas été comparé au lieu de supposer que tout l’a été.",
        },
      ],
      pipeline: [
        { label: "Flows", href: "/docs/flows", why: "Un seul flow lit la mise en page de chaque fournisseur dans la même structure de champs — la condition préalable pour pouvoir les comparer." },
        { label: "Cleaners", href: "/docs/cleaners", why: "Convertit les devises pour comparer sur la même base des devis libellés dans des monnaies différentes." },
        { label: "Buckets", href: "/docs/buckets", why: "Conserve les devis dans le temps : le prix du jour peut être comparé à ce que le même fournisseur proposait le trimestre dernier." },
      ],
      faqs: [
        { q: "Comment apparie-t-il des articles que chaque fournisseur décrit différemment ?", a: "L’appariement est sémantique plutôt qu’exact : les désignations sont comparées selon leur sens, avec un LLM pour trancher les paires ambiguës. « Boulon hexagonal M8 50 mm » et « Boulon, hex, M8x50 » s’apparient sans que vous ayez à tenir une liste de synonymes." },
        { q: "Puis-je comparer tout le monde à un seul fournisseur plutôt que tous entre eux ?", a: "Oui. Le mode référence prend un devis comme base et compare tous les autres à celui-ci, ce qui est la bonne approche quand vous avez un fournisseur en place et que vous sondez le marché." },
        { q: "Que deviennent les lignes impossibles à comparer ?", a: "Les lignes aux prix non numériques sont exclues du classement et enregistrées comme avertissements sur la ligne concernée : les lacunes de la comparaison sont visibles et non cachées." },
      ],
    },
    {
      slug: "compliance-checks",
      label: "Contrôles de conformité",
      badge: "Conformité et risques",
      h1: "Contrôles de conformité documentaire",
      title: "Checklists de conformité documentaire automatisées",
      description:
        "Contrôlez un jeu de documents selon une checklist à branches — tout est-il présent, cohérent et conforme à la politique — et produisez un rapport à remettre à un auditeur.",
      summary: "Un jeu de documents contrôlé selon une checklist à branches, avec un rapport conforme/non conforme auditable.",
      lede: "L’Inspector de Tavnit contrôle un jeu de documents selon une checklist que vous définissez. Il achemine chaque fichier importé vers l’emplacement prévu, extrait ce dont les règles ont besoin et évalue la checklist de façon déterministe — les mêmes pièces produisent toujours le même verdict, rapport à l’appui.",
      problem: [
        "La revue de conformité, c’est généralement une personne avec une checklist et un dossier, qui confirme que les bons documents sont présents, que les valeurs concordent d’un document à l’autre et que rien n’a expiré. C’est lent, cela varie d’un vérificateur à l’autre, et la preuve de la conformité se limite à ce dont cette personne se souvient.",
        "L’échec type n’est généralement pas un document manquant. C’est une valeur qui diverge entre deux documents que personne n’a comparés côte à côte.",
      ],
      fields: [
        { name: "Emplacements de documents attendus", note: "Ce que le jeu doit contenir. Un emplacement obligatoire vide est en soi un constat, pas une simple absence." },
        { name: "Champs d’identité et d’entité", note: "Les valeurs qui doivent concorder d’un document à l’autre — noms, numéros d’immatriculation, adresses." },
        { name: "Dates et expiration", note: "Certificats et licences expirent. La validité d’un document est une règle, pas un champ." },
        { name: "Montants et valeurs déclarées", note: "C’est ici que vivent les contrôles de cohérence entre documents : la valeur de la facture correspond-elle à celle de la déclaration ?" },
        { name: "Présence de signatures et de cachets", note: "La présence plutôt que le contenu, et l’un des contrôles manuels les plus courants." },
        { name: "Résultat de la checklist par point", note: "Conforme, non conforme ou sans objet, par règle, avec la valeur qui l’a déterminé." },
      ],
      gotchas: [
        {
          title: "Le vrai contrôle se fait entre documents, pas à l’intérieur d’un seul",
          body: "N’importe quel outil sait lire une valeur sur un certificat. Le constat qui compte, c’est que cette valeur contredit celle de la facture. Comme une inspection rassemble tout le jeu avant de l’évaluer, les règles de la checklist peuvent comparer des documents entre eux, et pas seulement chacun isolément.",
        },
        {
          title: "Les checklists ont des branches, et les checklists plates cachent des lacunes",
          body: "L’application d’une règle dépend généralement d’une réponse précédente — si les marchandises sont soumises à restriction, une licence est requise. Une checklist à branches l’exprime directement : l’inspection ne demande la licence que lorsqu’elle est réellement nécessaire, et ne la marque pas discrètement comme sans objet.",
        },
        {
          title: "Un auditeur demande comment vous avez décidé, pas ce que vous avez décidé",
          body: "L’évaluation est déterministe — les mêmes documents produisent le même résultat, et non un nouveau jugement à chaque fois — et le résultat est consigné dans un rapport. Avec la révision, vous pouvez montrer quelles valeurs ont été extraites, quelles règles se sont déclenchées et qui a approuvé le résultat.",
        },
      ],
      pipeline: [
        { label: "Collections", href: "/docs/collections", why: "Les pièces hétérogènes arrivées au même endroit sont classées et acheminées vers le bon flow avant tout contrôle." },
        { label: "Flows", href: "/docs/flows", why: "Chaque type de document a son propre flow : une règle peut viser un champ nommé au lieu de chercher dans du texte libre." },
        { label: "Révision humaine", href: "/docs/human-in-the-loop", why: "Un vérificateur valide l’inspection, et la trace inaltérable consigne qui a accepté quel constat." },
        { label: "Buckets", href: "/docs/buckets", why: "Les résultats deviennent exploitables dans le temps — combien de jeux ont échoué, sur quelle règle, quel mois." },
      ],
      faqs: [
        { q: "Peut-il comparer des valeurs entre différents documents ?", a: "Oui — c’est tout l’intérêt. Une inspection rassemble le jeu complet de documents avant l’évaluation : les règles peuvent vérifier qu’une valeur d’un document concorde avec celle d’un autre, au lieu de valider chacun isolément." },
        { q: "Le résultat est-il reproductible ?", a: "L’évaluation de la checklist est déterministe. Les mêmes documents et la même checklist produisent le même résultat, ce qui rend celui-ci défendable quand quelqu’un demande pourquoi un jeu a été jugé conforme." },
        { q: "Et si un document obligatoire manque ?", a: "Une pièce obligatoire manquante est en soi un constat. L’inspection la signale au lieu de se terminer avec une lacune, et les fichiers importés sans emplacement désigné sont acheminés automatiquement ou signalés comme non appariés." },
      ],
    },
    {
      slug: "form-filling",
      label: "Remplissage de formulaires",
      badge: "Opérations et commerce",
      h1: "Remplissage automatisé de formulaires PDF",
      title: "Remplir des formulaires PDF à partir de données extraites",
      description:
        "Remplissez automatiquement des formulaires PDF officiels à partir de données extraites de plusieurs documents sources, avec une approbation avant toute émission.",
      summary: "Des formulaires PDF officiels remplis automatiquement à partir de données réparties dans plusieurs documents sources.",
      lede: "Tavnit remplit des formulaires PDF remplissables à partir de données extraites de plusieurs documents sources à la fois. Une déclaration peut être complétée à partir d’une facture, d’une liste de colisage et d’un connaissement en une seule passe, une personne approuvant les valeurs avant l’émission du PDF rempli.",
      problem: [
        "Une part étonnante du travail de bureau consiste à recopier des valeurs de documents reçus dans un formulaire exigé par quelqu’un d’autre. Déclarations en douane, formulaires d’assurance, demandes de subvention, déclarations réglementaires — l’information existe déjà, répartie dans trois ou quatre PDF, et une personne la déplace à la main.",
        "C’est aussi là que les erreurs se pardonnent le moins. Une faute de transcription sur un formulaire destiné à une administration, c’est un rejet ou une pénalité, pas une correction interne.",
      ],
      fields: [
        { name: "Jeu de documents sources", note: "Un emplacement par flow source. Le formulaire se remplit dès que chaque emplacement obligatoire a un run terminé." },
        { name: "Correspondances de champs", note: "Quel champ extrait alimente quel champ du PDF. Configurées une fois par modèle, réutilisées à chaque fois." },
        { name: "Sorties de Cleaner comme sources", note: "Une valeur mise en correspondance peut provenir d’un Cleaner plutôt que de l’extraction brute : les valeurs converties ou calculées arrivent dans le formulaire." },
        { name: "Champs à remplir à la main", note: "Les valeurs que personne n’extrait — un numéro de référence, un signataire — fournies au moment de l’approbation." },
        { name: "Plusieurs modèles", note: "Un même jeu de documents sources peut remplir plusieurs formulaires différents en une seule passe." },
      ],
      gotchas: [
        {
          title: "Les données sont réparties entre plusieurs documents, pas réunies dans un seul",
          body: "C’est pourquoi les outils documentaires génériques ne résolvent pas le remplissage de formulaires : ils extraient un fichier à la fois. Le remplissage prend un run par flow source et complète le formulaire à partir de tous ensemble : les poids d’une liste de colisage et les valeurs d’une facture aboutissent dans le même document.",
        },
        {
          title: "Les documents arrivent dans l’ordre où ils arrivent",
          body: "Vous recevez rarement le jeu complet d’un coup. Un remplissage reste ouvert, recueille les runs au fil de l’arrivée des documents et se déclenche quand chaque emplacement obligatoire est rempli. Les fichiers importés sans préciser leur emplacement sont classés et acheminés automatiquement, et tout ce qui reste non apparié peut être affecté à la main.",
        },
        {
          title: "Certains champs ne figurent jamais dans les documents sources",
          body: "Tout formulaire réel comporte des valeurs qui n’existent nulle part en amont — une référence interne, le nom du déclarant, un bloc de signature. Ce sont des champs à remplir à la main, fournis à l’étape d’approbation, qui est aussi le moment naturel pour corriger toute erreur d’extraction avant l’émission du PDF.",
        },
      ],
      pipeline: [
        { label: "Flows", href: "/docs/flows", why: "Un flow par type de document source ; le formulaire puise dans tous à la fois." },
        { label: "Cleaners", href: "/docs/cleaners", why: "Convertit et calcule les valeurs, pour que ce qui arrive dans le formulaire soit déjà dans l’unité ou le format requis." },
        { label: "Révision humaine", href: "/docs/human-in-the-loop", why: "Une approbation avant émission, avec corrections et champs fournis à la main saisis à la même étape." },
        { label: "Intégration e-mail", href: "/docs/email-integration", why: "Les documents sources transférés à une adresse alimentent le remplissage sans que personne n’ouvre l’application." },
      ],
      faqs: [
        { q: "Un formulaire peut-il être rempli à partir de plusieurs documents ?", a: "Oui. Chaque type de document source a son emplacement, et le formulaire est complété à partir de tous ensemble — c’est le cas normal pour les déclarations et les demandes d’indemnisation." },
        { q: "Et les champs qui ne figurent dans aucun document ?", a: "Ce sont des champs à remplir à la main, saisis à l’étape d’approbation avec les éventuelles corrections : le PDF final est vérifié avant son émission." },
        { q: "Un même jeu de documents peut-il remplir plusieurs formulaires ?", a: "Oui. Une configuration peut contenir plusieurs modèles, et chacun est rempli à partir du même ensemble de runs en une seule passe." },
      ],
    },
    {
      slug: "call-analytics",
      label: "Analyse d’appels",
      badge: "Ventes et support",
      h1: "Transformez les conversations enregistrées en données",
      title: "Analyse d’appels — structurer les conversations enregistrées",
      description:
        "Transformez les enregistrements de ventes, de support et de comptoir en tableau — qui a dit quoi, quelles règles ont été respectées et comment chaque conversation s’est conclue.",
      summary: "Des enregistrements de ventes, de support et de comptoir transformés en tableau de tours de parole, de règles et de résultats.",
      lede: "Tavnit Signals transforme des enregistrements audio en un tableau à plat. Il sépare les interlocuteurs, découpe un enregistrement en conversations distinctes, classe chacune et évalue vos règles et champs d’extraction tour de parole par tour de parole — une journée d’appels devient des lignes à filtrer plutôt que des heures à écouter.",
      problem: [
        "C’est dans les conversations que se joue l’essentiel de ce qu’une entreprise apprend, et presque rien n’en est conservé. Les enregistrements existent, mais les passer en revue suppose de les écouter : en pratique, un manager en écoute une poignée et généralise.",
        "Là où un contrôle qualité existe, c’est une personne munie d’une grille qui remplit un formulaire après chaque appel — coûteux, variable d’un évaluateur à l’autre, et limité à une fraction du volume.",
      ],
      fields: [
        { name: "Type d’interaction", note: "Un enregistrement contient souvent plusieurs conversations. Chacune est classée — vente, support, retour — ou marquée comme autre." },
        { name: "Rôle de l’interlocuteur", note: "Les tours de parole sont attribués aux participants attendus, comme le vendeur ou le client ; les voix inattendues sont étiquetées autre." },
        { name: "Règles par tour de parole", note: "Des contrôles oui/non appliqués à chaque tour — la promotion a-t-elle été mentionnée, la mention légale a-t-elle été lue." },
        { name: "Champs d’extraction", note: "Des données tirées de chaque tour, comme les produits cités ou les objections soulevées." },
        { name: "Catégories de contenu", note: "Chaque tour est étiqueté — objection, question, problème, solution, remerciement — pour que les tendances soient comptables." },
        { name: "Issue de la conversation", note: "Jugée une seule fois sur l’ensemble de la conversation : la vente a-t-elle été conclue, le problème résolu." },
      ],
      gotchas: [
        {
          title: "Un enregistrement n’est pas une conversation",
          body: "L’enregistrement d’une journée au comptoir ou sur une ligne de support contient de nombreux échanges distincts. Traiter le fichier comme une seule conversation produit des moyennes qui ne décrivent rien. Les enregistrements sont d’abord découpés en interactions distinctes, chacune classée et évaluée séparément — l’équivalent audio du découpage d’un PDF contenant plusieurs documents.",
        },
        {
          title: "Questions par tour et questions par conversation sont deux choses différentes",
          body: "« La remise a-t-elle été mentionnée » se pose pour chaque tour et peut être vrai plusieurs fois. « La vente a-t-elle abouti » se pose une seule fois pour tout l’échange. Les confondre donne un indicateur qui compte des mentions quand vous vouliez des résultats : les deux sont donc évalués séparément, et la réponse au niveau de la conversation se répète sur toutes les lignes de cette interaction.",
        },
        {
          title: "Enregistrer des personnes est soumis à des règles",
          body: "Les exigences de consentement et de conservation pour l’enregistrement des appels varient selon les juridictions et sont plus strictes que pour les documents. C’est votre obligation, pas une décision du pipeline — mais la visibilité par Bucket et les accès accordés vous permettent de réserver transcriptions et résultats aux personnes qui en ont besoin.",
        },
      ],
      pipeline: [
        { label: "Buckets", href: "/docs/buckets", why: "Les enregistrements traités sont exportés automatiquement vers un Bucket : les appels s’accumulent en un ensemble que vous pouvez interroger et représenter en graphiques." },
        { label: "Webhooks", href: "/docs/webhooks", why: "Envoie le tableau de résultats vers vos propres systèmes dès qu’un enregistrement a fini d’être traité." },
        { label: "Rôles utilisateur", href: "/docs/user-roles", why: "Les données de conversation sont sensibles ; les rôles et les accès par Bucket les réservent aux personnes qui pilotent le programme." },
      ],
      faqs: [
        { q: "Quels formats audio sont pris en charge ?", a: "Les enregistrements MP3, WAV et FLAC peuvent être importés et traités." },
        { q: "Peut-il traiter un enregistrement contenant de nombreuses conversations distinctes ?", a: "Oui. Un enregistrement est d’abord découpé en interactions distinctes, chacune classée et évaluée séparément — une journée complète au comptoir produit des résultats par conversation plutôt qu’une moyenne globale." },
        { q: "Puis-je évaluer chaque appel plutôt qu’un échantillon ?", a: "Oui. Les règles sont évaluées sur chaque tour de chaque enregistrement traité, et c’est la différence concrète avec le contrôle qualité manuel — une couverture complète plutôt qu’un échantillon." },
      ],
    },
    {
      slug: "delivery-notes",
      label: "Bons de livraison",
      badge: "Logistique et entrepôt",
      h1: "Saisie des bons et preuves de livraison",
      title: "Extraction des bons de livraison et contrôle des réceptions",
      description:
        "Capturez ce qui a réellement été livré à partir des bons de livraison signés et des preuves de livraison, annotations manuscrites comprises, et comparez-le à ce qui a été commandé.",
      summary: "Ce qui a réellement été livré, capturé à partir des bons et preuves de livraison signés — écriture manuscrite comprise.",
      lede: "Tavnit lit les bons de livraison et les preuves de livraison, y compris les annotations manuscrites qu’ajoutent chauffeurs et réceptionnaires, et restitue les quantités livrées sous forme de lignes structurées. Comme les bons de commande sont extraits sous la même forme, comparer le livré au commandé devient une requête.",
      problem: [
        "Le bon de livraison est le seul document qui atteste de ce qui est physiquement arrivé, et c’est généralement le document de plus mauvaise qualité de la chaîne : photographié dans une cour, signé par-dessus le texte imprimé, annoté à la main là où les quantités différaient.",
        "C’est aussi le document qui compte le plus en cas de litige. Si la facture dit douze et le bon dit dix, c’est le bon qui fait foi — à condition que quelqu’un ait capturé ce qu’il indiquait.",
      ],
      fields: [
        { name: "Numéro du bon de livraison et du bon de commande", note: "Les clés qui rattachent la livraison à ce qui a été commandé." },
        { name: "Quantité livrée par ligne", note: "Le chiffre qui compte vraiment, et celui qui est le plus souvent corrigé à la main." },
        { name: "Corrections manuscrites", note: "Les quantités barrées et les notes en marge portent le vrai chiffre. Les ignorer, c’est capturer le mauvais." },
        { name: "Nom du réceptionnaire et présence de la signature", note: "La présence d’une signature est souvent le critère d’acceptation." },
        { name: "Date et heure de livraison", note: "Conditionne la mesure des niveaux de service et les délais de réclamation." },
        { name: "Mentions d’état ou de dommages", note: "Du texte libre, généralement manuscrit, et la base de toute réclamation." },
      ],
      gotchas: [
        {
          title: "L’écriture manuscrite, c’est la partie importante",
          body: "Un bon de livraison imprimé indique ce qui devait arriver. La correction manuscrite indique ce qui est arrivé. L’extraction lit l’écriture manuscrite autant que l’imprimé : c’est toute la différence entre capturer l’expédition prévue et capturer l’expédition livrée.",
        },
        {
          title: "Photographié dans une cour, pas scanné dans un bureau",
          body: "Les preuves de livraison arrivent sous forme de photos de téléphone prises de biais, mal éclairées, parfois avec un pouce dans le cadre. L’extraction en gère la plupart, mais c’est un type de document où il vaut la peine d’envoyer les résultats à faible confiance à une personne plutôt que de se fier à chaque capture.",
        },
        {
          title: "La valeur est dans la comparaison, pas dans la capture",
          body: "Une quantité livrée seule ne dit pas grand-chose. Extraire les bons de livraison dans la même structure de champs que vos bons de commande transforme le rapprochement à trois voies en requête sur le numéro de bon de commande, au lieu de trois documents examinés à la loupe.",
        },
      ],
      pipeline: [
        { label: "Intégration e-mail", href: "/docs/email-integration", why: "Chauffeurs et transporteurs envoient les preuves de livraison photographiées par e-mail ; en les transférant, chacune est traitée dès son arrivée." },
        { label: "Flows", href: "/docs/flows", why: "Les lignes livrées sont des champs de tableau, sur la même structure que celle des bons de commande." },
        { label: "Buckets", href: "/docs/buckets", why: "Réunit livraisons et commandes au même endroit : les écarts ressortent par une requête plutôt que lors d’un audit." },
        { label: "Révision humaine", href: "/docs/human-in-the-loop", why: "Vérifie les captures de mauvaise qualité et les quantités corrigées, là où une erreur se paie d’un litige." },
      ],
      faqs: [
        { q: "Peut-il lire les corrections manuscrites ?", a: "Oui. L’écriture manuscrite est extraite avec le texte imprimé, ce qui compte ici car c’est généralement la quantité manuscrite qui est exacte." },
        { q: "Fonctionnera-t-il avec des photos prises au téléphone ?", a: "En général, oui. Photos, angles et mauvais éclairage sont la norme pour les preuves de livraison. Il vaut la peine d’activer la révision conditionnelle, pour que les captures limites arrivent chez une personne au lieu de passer sans bruit." },
        { q: "Les livraisons peuvent-elles être comparées aux commandes ?", a: "Extrayez les deux dans la même structure de champs et la comparaison devient une requête sur le numéro de bon de commande dans votre Bucket, au lieu d’une vérification manuelle document par document." },
      ],
    },
    {
      slug: "insurance-claims",
      label: "Sinistres d’assurance",
      badge: "Assurance et sinistres",
      h1: "Traitement des documents de sinistres",
      title: "Extraction des documents de sinistres d’assurance",
      description:
        "Traitez ensemble les déclarations de sinistre et leurs justificatifs — devis, factures, rapports et photos — dans un seul enregistrement structuré et vérifiable.",
      summary: "Déclarations de sinistre et justificatifs traités ensemble dans un seul enregistrement structuré et vérifiable.",
      lede: "Tavnit traite un sinistre et ses justificatifs comme un seul ensemble : la déclaration, les devis de réparation, les factures et les rapports. Chaque type de document est acheminé vers son propre flow, et les résultats s’assemblent en un enregistrement unique que le gestionnaire peut évaluer, plutôt qu’un dossier à lire.",
      problem: [
        "Un sinistre n’est jamais un seul document. C’est un formulaire plus tout ce que l’assuré a envoyé — devis, reçus, procès-verbal de police, photos —, qui arrive sur plusieurs jours, dans le désordre, par e-mail.",
        "Les gestionnaires passent l’essentiel de leur temps à assembler plutôt qu’à évaluer : ouvrir les pièces jointes, trouver les montants, vérifier que le montant réclamé correspond à celui du devis.",
      ],
      fields: [
        { name: "Numéro de sinistre et de police", note: "Les clés sur lesquelles se rattache tout le dossier, et souvent le seul élément constant d’un document à l’autre." },
        { name: "Assuré et circonstances du sinistre", note: "Date, lieu et description du dommage, généralement répartis entre le formulaire et un récit." },
        { name: "Montant réclamé", note: "Ce que dit le formulaire. À extraire séparément de ce que justifient les pièces." },
        { name: "Montants justificatifs", note: "Les totaux des devis et des factures — les chiffres avec lesquels le montant réclamé doit concorder." },
        { name: "Informations sur les tiers", note: "Autres parties, assureurs et numéros de référence, nécessaires au recours." },
        { name: "Type de document par pièce jointe", note: "Savoir ce qu’est chaque fichier détermine quel flow le lit." },
      ],
      gotchas: [
        {
          title: "Les justificatifs arrivent tard et dans le désordre",
          body: "L’évaluation ne peut pas commencer tant que le dossier n’est pas complet, et il se complète sur plusieurs jours. Les Collections classent chaque pièce jointe dès son arrivée : l’enregistrement se construit au fil de l’eau, au lieu que quelqu’un relise tout le dossier à chaque nouvelle pièce.",
        },
        {
          title: "Montant réclamé et montant justifié sont deux champs différents",
          body: "Extraire un seul chiffre par sinistre fait perdre le contrôle qui compte. Capturez ce qui a été réclamé et ce que totalisent réellement devis et factures : l’écart devient une valeur sur laquelle filtrer, plutôt qu’un détail que le gestionnaire doit remarquer.",
        },
        {
          title: "Les dossiers de sinistre sont personnels, et souvent médicaux",
          body: "Les sinistres contiennent couramment des informations de santé, des pièces d’identité et des données financières. Les Buckets privés avec accès accordés par utilisateur réservent un sinistre aux gestionnaires qui le traitent, au lieu de le rendre visible à toute l’organisation.",
        },
      ],
      pipeline: [
        { label: "Collections", href: "/docs/collections", why: "Classe chaque pièce jointe — formulaire, devis, facture, rapport — et l’achemine vers le flow conçu pour elle." },
        { label: "Intégration e-mail", href: "/docs/email-integration", why: "Les sinistres arrivent par e-mail ; un transfert vers l’adresse d’une Collection traite chaque pièce jointe dès son arrivée." },
        { label: "Cleaners", href: "/docs/cleaners", why: "Normalise dates et devises, et calcule l’écart entre montant réclamé et montant justifié." },
        { label: "Révision humaine", href: "/docs/human-in-the-loop", why: "Les gestionnaires approuvent ou rejettent, avec une trace permanente de la décision et de son auteur." },
      ],
      faqs: [
        { q: "Peut-il traiter un sinistre comportant de nombreuses pièces jointes différentes ?", a: "Oui. Une Collection classe chaque pièce jointe et l’achemine vers le bon flow : déclaration, devis et facture sont chacun lus par le flow conçu pour ce type de document." },
        { q: "Peut-il signaler les sinistres dont les chiffres ne concordent pas ?", a: "Extrayez le montant réclamé et les totaux justificatifs dans des champs distincts, puis utilisez un Cleaner pour calculer la différence. Les sinistres qui échouent au contrôle peuvent être envoyés automatiquement en révision." },
        { q: "Comment les données sensibles des sinistres sont-elles protégées ?", a: "Les Buckets peuvent être privés plutôt que visibles par toute l’organisation, avec des accès Lecteur ou Éditeur accordés par utilisateur : un sinistre n’est visible que des gestionnaires qui le traitent." },
      ],
    },
    {
      slug: "identity-verification",
      label: "Identité et entrée en relation",
      badge: "KYC et entrée en relation",
      h1: "Capture des documents d’identité et d’entrée en relation",
      title: "Extraction de documents KYC pour l’entrée en relation client",
      description:
        "Capturez les pièces d’identité et justificatifs de domicile lors de l’entrée en relation, vérifiez que les informations concordent entre elles et conservez une trace auditable de la décision.",
      summary: "Pièces d’identité et justificatifs de domicile capturés, recoupés pour vérifier leur cohérence et consignés de façon auditable.",
      lede: "Tavnit lit les documents recueillis lors de l’entrée en relation — pièces d’identité, justificatifs de domicile, documents de constitution — et restitue noms, numéros, dates et adresses sous forme de champs structurés. Comme tout le jeu est traité ensemble, la concordance des informations d’un document à l’autre devient un contrôle plutôt qu’une hypothèse.",
      problem: [
        "Entrer en relation avec un client, c’est recueillir des documents, les lire et confirmer qu’ils décrivent la même personne ou la même entité. La lecture est fastidieuse ; la confirmation est la partie risquée, et elle se fait à l’œil.",
        "Le volume aggrave les choses. Une équipe qui intègre des clients en continu finit avec des pratiques qui varient d’un vérificateur à l’autre et aucune trace fiable de ce qui a été vérifié, et quand.",
      ],
      fields: [
        { name: "Nom complet tel qu’imprimé", note: "À extraire mot pour mot. L’ordre et la translittération diffèrent d’un document à l’autre, et cette différence est justement l’objet du contrôle." },
        { name: "Date de naissance", note: "Le champ le plus utile pour vérifier la cohérence entre documents." },
        { name: "Numéro et type de document", note: "Passeport, carte d’identité, permis — chacun avec ses propres conventions de numérotation." },
        { name: "Dates de délivrance et d’expiration", note: "L’expiration est une règle plutôt qu’un champ : un document expiré est un constat." },
        { name: "Adresse", note: "Issue des justificatifs de domicile, qui doivent concorder avec ce que le client a déclaré." },
        { name: "Informations d’immatriculation de l’entité", note: "Pour l’entrée en relation d’entreprises — numéro d’immatriculation, siège social, dirigeants." },
      ],
      gotchas: [
        {
          title: "Les noms ne concordent pas, et c’est normal",
          body: "La même personne apparaît comme « Jose Garcia Lopez », « J. García » et « GARCIA LOPEZ, JOSE » sur trois documents. Extrayez les noms mot pour mot au lieu de les normaliser pendant l’extraction, puis comparez délibérément — normaliser trop tôt efface précisément la différence que vous devez évaluer.",
        },
        {
          title: "Les pièces d’identité photographiées sont la norme, et la qualité varie",
          body: "Les clients photographient leurs documents au téléphone, avec un reflet sur la bande de lecture automatique une fois sur deux. Vu le coût d’une erreur, une révision à chaque entrée en relation est proportionnée, et la piste d’audit consigne alors qui a accepté quel document.",
        },
        {
          title: "Ce sont les données les plus réglementées que vous traiterez",
          body: "Les pièces d’identité sont soumises à des durées de conservation, des droits à l’effacement et des obligations d’accès que les documents professionnels ordinaires ignorent. Les Buckets privés et les accès accordés par utilisateur réservent les dossiers d’entrée en relation à l’équipe conformité, et la trace inaltérable atteste de qui a consulté quoi.",
        },
      ],
      pipeline: [
        { label: "Collections", href: "/docs/collections", why: "Classe tout ce que le client a envoyé — passeport, facture d’électricité, extrait d’immatriculation — et l’achemine vers le bon flow." },
        { label: "Flows", href: "/docs/flows", why: "Un flow par type de document : un contrôle peut viser un champ nommé au lieu de chercher dans le texte." },
        { label: "Révision humaine", href: "/docs/human-in-the-loop", why: "Une validation pour chaque entrée en relation, avec une trace permanente de qui a approuvé quel document." },
        { label: "Rôles utilisateur", href: "/docs/user-roles", why: "Réserve les pièces d’identité à l’équipe qui en a besoin plutôt qu’à toute l’organisation." },
      ],
      faqs: [
        { q: "Vérifie-t-il qu’un document est authentique ?", a: "Non. Tavnit extrait et structure ce que disent les documents, et vous permet de vérifier leur cohérence au sein d’un jeu. La vérification d’authenticité auprès des autorités émettrices est une spécialité à part, que Tavnit ne remplace pas." },
        { q: "Peut-il vérifier que les informations concordent entre documents ?", a: "Oui. Traitez le jeu ensemble et comparez les champs extraits — nom, date de naissance, adresse — : une non-concordance ressort comme une valeur, au lieu d’être un détail qu’un vérificateur doit repérer." },
        { q: "Comment l’accès aux données d’identité est-il restreint ?", a: "Les Buckets privés avec accès accordés par utilisateur limitent la visibilité à l’équipe conformité, et la piste d’audit inaltérable consigne chaque consultation, modification et approbation." },
      ],
    },
    {
      slug: "lease-agreements",
      label: "Baux et immobilier",
      badge: "Immobilier et services généraux",
      h1: "Extraction de données de baux",
      title: "Synthèse de baux — loyer, durée et dates de résiliation",
      description:
        "Synthétisez les baux en fiches structurées — loyer, dates de révision, clauses de résiliation anticipée, charges et obligations d’entretien — sur tout un portefeuille.",
      summary: "Des baux synthétisés en fiches structurées : loyer, révisions, dates de résiliation et obligations.",
      lede: "Tavnit synthétise les baux en fiches structurées : parties, locaux loués, durée, loyer et dates de révision, clauses de résiliation anticipée, base des charges et obligations d’entretien. Un portefeuille conservé en PDF devient un tableau où la prochaine révision de loyer est un filtre plutôt qu’un exercice de lecture.",
      problem: [
        "La synthèse de baux est un travail manuel bien établi, précisément parce que les réponses sont enfouies dans la rédaction au lieu de figurer dans des champs. Les entreprises la paient, encore et encore, et le tableur qui en résulte est périmé dès qu’un bail est modifié.",
        "Le coût de son absence est précis et élevé : une date de résiliation manquée, une option non exercée, une révision de loyer passée sans contestation.",
      ],
      fields: [
        { name: "Bailleur, preneur et garant", note: "Des entités juridiques plutôt que des noms commerciaux, et souvent modifiées par des actes ultérieurs." },
        { name: "Locaux loués", note: "Décrits en texte et par référence à un plan, rarement par une adresse nette." },
        { name: "Durée, prise d’effet et échéance", note: "La colonne vertébrale de toutes les autres dates du document." },
        { name: "Loyer et dates de révision", note: "La base de révision — valeur locative de marché, indexation, paliers — compte autant que le montant." },
        { name: "Clauses de résiliation anticipée et conditions", note: "Un droit de résiliation dont les conditions ne sont pas remplies n’en est pas un. Extrayez les deux." },
        { name: "Charges et obligations d’entretien", note: "Là où se situe réellement la responsabilité, et généralement les clauses les plus longues du document." },
      ],
      gotchas: [
        {
          title: "Les dates sont définies, pas énoncées",
          body: "Un bail imprime rarement la date de résiliation. Il indique que le preneur peut résilier au cinquième anniversaire de la prise d’effet, moyennant un préavis de six mois. Extrayez la prise d’effet, l’anniversaire et le préavis dans des champs, puis laissez un Cleaner de formule calculer la date limite réelle — celle dont vous aviez besoin.",
        },
        {
          title: "Le document qui fait foi n’est souvent pas le bail",
          body: "Avenants, autorisations de travaux et lettres annexes modifient la situation, et le bail d’origine se lit toujours comme s’ils n’existaient pas. Traitez chacun comme un run distinct en capturant sa date : la situation actuelle découle de l’ensemble du jeu plutôt que du PDF que quelqu’un a ouvert.",
        },
        {
          title: "Un droit conditionnel lu comme inconditionnel est un risque",
          body: "Les clauses de résiliation sont couramment subordonnées à la libération des locaux ou au paiement à jour du loyer. Capturer le droit sans ses conditions produit un tableau de portefeuille faux avec aplomb, ce qui est pire que pas de tableau du tout. Extrayez les conditions dans un champ à part et vérifiez-les.",
        },
      ],
      pipeline: [
        { label: "Flows", href: "/docs/flows", why: "Les consignes d’extraction sont essentielles ici — le modèle doit savoir ce qu’est une condition de résiliation, pas seulement où chercher." },
        { label: "Cleaners", href: "/docs/cleaners", why: "Calcule les dates limites de révision et de résiliation à partir des dates de prise d’effet et des préavis." },
        { label: "Buckets", href: "/docs/buckets", why: "Le portefeuille sous forme de tableau : quels baux sont résiliables l’an prochain, triés par date limite de préavis." },
        { label: "Révision humaine", href: "/docs/human-in-the-loop", why: "Vérifiez chaque synthèse. Ici, une date erronée se mesure en années de loyer." },
      ],
      faqs: [
        { q: "Peut-il calculer les dates de résiliation et de révision ?", a: "Oui. Extrayez la date de prise d’effet, l’anniversaire auquel le droit est rattaché et le préavis, puis un Cleaner de formule en déduit la date limite réelle — c’est généralement ce que vous vouliez, plutôt que la clause elle-même." },
        { q: "Et les avenants ?", a: "Traitez chaque document comme un run distinct en capturant sa date dans un champ. La situation actuelle découle alors d’une requête sur l’ensemble du jeu, au lieu de supposer que le fichier le plus récent fait foi." },
        { q: "Capture-t-il les conditions attachées à une clause de résiliation ?", a: "Il le devrait, et cette page soutient que c’est indispensable — un droit de résiliation consigné sans ses conditions produit un tableau de portefeuille qui paraît certain et ne l’est pas. Extrayez les conditions dans un champ à part et vérifiez-les." },
      ],
    },
    {
      slug: "timesheets",
      label: "Feuilles de temps",
      badge: "Paie et intérim",
      h1: "Saisie des feuilles de temps et relevés de postes",
      title: "Extraction des feuilles de temps pour la paie",
      description:
        "Capturez les heures des feuilles de temps remises — imprimées, manuscrites ou photographiées — et contrôlez-les selon des règles avant qu’elles n’arrivent en paie.",
      summary: "Les heures capturées à partir de feuilles de temps imprimées, manuscrites et photographiées, contrôlées avant la paie.",
      lede: "Tavnit lit les feuilles de temps remises, y compris manuscrites et photographiées, et restitue collaborateur, date, heures et code analytique sous forme de lignes. Des règles peuvent contrôler les totaux avant que quoi que ce soit n’arrive en paie : les erreurs qui deviendraient des régularisations de salaire sont repérées tant qu’elles coûtent peu.",
      problem: [
        "La paie tourne avec une échéance, et les feuilles de temps arrivent sous la forme qu’utilise chaque site ou agence — un tableur imprimé, une feuille papier photographiée en fin de poste, un PDF issu du système d’un sous-traitant.",
        "Quelqu’un les ressaisit dans l’urgence, exactement les conditions dans lesquelles se produisent les erreurs de transcription. Un chiffre faux découvert après la paie, c’est une correction, une régularisation et une conversation désagréable.",
      ],
      fields: [
        { name: "Nom ou matricule du collaborateur", note: "Les noms sur les feuilles de temps correspondent rarement exactement aux fiches de paie — un Cleaner de recherche fait la correspondance." },
        { name: "Date ou semaine se terminant le", note: "Détermine la période de paie à laquelle appartiennent les heures, et se lit facilement de travers à cheval sur deux périodes." },
        { name: "Heures de début, de fin et de pause", note: "Extraire les composantes plutôt que le seul total permet de vérifier le total." },
        { name: "Total des heures", note: "À extraire tel que déclaré et à comparer au total calculé." },
        { name: "Heures supplémentaires et majorées", note: "Des taux différents : une erreur de classement est une erreur de paie, pas d’arrondi." },
        { name: "Code analytique ou projet", note: "Alimente le suivi des coûts par chantier, et c’est le champ le plus souvent laissé vide." },
      ],
      gotchas: [
        {
          title: "Le total déclaré et le total réel divergent plus qu’on ne le croit",
          body: "Les gens additionnent eux-mêmes leurs heures, et se trompent. Extraire les heures de début, de fin et de pause en plus du total déclaré permet à un Cleaner de formule de calculer les heures et de comparer — les écarts qui ressortent sont généralement de vraies erreurs de calcul plutôt que des erreurs d’extraction.",
        },
        {
          title: "Les feuilles manuscrites sont le cas difficile, et elles sont courantes",
          body: "Le travail posté et les chantiers fonctionnent encore avec du papier photographié en fin de journée. L’écriture manuscrite est extraite, mais la confiance varie, et c’est un cas d’usage où envoyer les captures incertaines en révision vaut mieux que de découvrir le problème sur une fiche de paie.",
        },
        {
          title: "Les noms sur les feuilles ne sont pas les noms de la paie",
          body: "« Dave S. », « David Smith » et un matricule désignent la même personne, et la paie a besoin du matricule. Un Cleaner de recherche rapproche les noms déclarés de votre liste de collaborateurs pendant le traitement : les entrées sans correspondance sont signalées au lieu d’être devinées.",
        },
      ],
      pipeline: [
        { label: "Intégration e-mail", href: "/docs/email-integration", why: "Sites et agences envoient les feuilles par e-mail en fin de semaine ; en les transférant, elles sont traitées dès leur arrivée." },
        { label: "Splitters", href: "/docs/splitters", why: "Un seul PDF contenant les feuilles de toute une équipe devient un run par collaborateur." },
        { label: "Cleaners", href: "/docs/cleaners", why: "Calcule les heures à partir des horaires, rapproche les noms des fiches de paie et signale les totaux qui ne concordent pas." },
        { label: "Révision humaine", href: "/docs/human-in-the-loop", why: "Seules les feuilles qui échouent à un contrôle arrivent chez une personne, ce qui rend la démarche tenable face à une échéance de paie." },
      ],
      faqs: [
        { q: "Peut-il lire des feuilles de temps manuscrites ?", a: "Oui. L’écriture manuscrite est extraite avec le texte imprimé, même si la confiance varie selon la lisibilité — c’est pourquoi il vaut la peine d’activer ici l’envoi en révision des feuilles incertaines." },
        { q: "Peut-il vérifier que les heures tombent juste ?", a: "Oui. Extrayez les heures de début, de fin et de pause avec le total déclaré, et un Cleaner de formule calcule les heures et signale toute feuille où les deux divergent." },
        { q: "Et si les noms ne correspondent pas à notre système de paie ?", a: "Un Cleaner de recherche rapproche les noms déclarés de votre liste de collaborateurs pendant le traitement. Les entrées qu’il ne peut pas rapprocher sont signalées plutôt que devinées : rien n’arrive en paie sans être attribué." },
      ],
    },
    {
      slug: "utility-bills",
      label: "Factures d’énergie",
      badge: "Services généraux et ESG",
      h1: "Extraction des données de factures d’énergie et de compteurs",
      title: "Extraction des factures d’énergie pour les coûts et les émissions",
      description:
        "Extrayez consommations, tarifs et relevés de compteurs des factures d’énergie et de fluides de tout un parc immobilier, pour maîtriser les coûts et déclarer les émissions.",
      summary: "Consommations, tarifs et relevés de compteurs extraits sur tout un parc, pour le suivi des coûts et des émissions.",
      lede: "Tavnit lit les factures d’électricité, de gaz, d’eau et de déchets et restitue consommation, tarif, relevés de compteurs et montants par site. Les factures d’un parc deviennent un tableau dont vous pouvez suivre les tendances — ce qu’exigent réellement la maîtrise des coûts comme la déclaration des émissions.",
      problem: [
        "Quiconque gère plus d’une poignée de sites reçoit des factures de plusieurs fournisseurs dans plusieurs formats, et la seule chose qui leur arrive de façon fiable, c’est d’être payées. Les données de consommation — la partie qui a une valeur analytique — restent dans le PDF.",
        "La déclaration des émissions a rendu le sujet urgent. Le reporting des scopes 1 et 2 exige la consommation en kWh par site et par période, et pour la plupart des organisations ces données n’existent que sous forme d’une pile de factures que personne n’a transcrites.",
      ],
      fields: [
        { name: "Adresse de fourniture et numéro de compteur (MPAN/MPRN)", note: "L’identifiant qui rattache une facture à un site. Les adresses seules ne sont pas fiables d’un fournisseur à l’autre." },
        { name: "Période de facturation", note: "Les factures s’alignent rarement sur les mois civils, ce qui compte quand vous agrégez par trimestre." },
        { name: "Consommation avec unité", note: "kWh, m³ ou litres. L’unité compte autant que le nombre, et elle n’est pas toujours indiquée de la même façon." },
        { name: "Relevés de compteur et indicateur d’estimation", note: "Un relevé estimé n’est pas une mesure, et le traiter comme tel fausse une tendance." },
        { name: "Tarif et abonnement", note: "Ce qui distingue une variation de prix d’une variation de consommation." },
        { name: "Montant total et taxes", note: "Pour rapprocher les coûts de ce qui a réellement été payé." },
      ],
      gotchas: [
        {
          title: "Les relevés estimés ne sont pas des données",
          body: "Les fournisseurs estiment quand ils ne peuvent pas relever un compteur, puis régularisent au relevé réel suivant. Une tendance construite sans distinguer les deux montre un pic qui n’a jamais eu lieu, suivi d’une baisse qui n’a jamais eu lieu non plus. Extrayez l’indicateur d’estimation dans un champ à part, pour pouvoir exclure les estimations ou les traiter séparément.",
        },
        {
          title: "Les périodes de facturation ne s’alignent sur rien",
          body: "Un fournisseur facture tous les mois, un autre tous les 28 jours, un troisième tous les trimestres, et aucun ne s’aligne sur vos périodes de reporting. Extrayez le début et la fin de période plutôt qu’une date unique, pour répartir la consommation sur les périodes que vous déclarez réellement.",
        },
        {
          title: "Les unités diffèrent, et le gaz est le piège",
          body: "Le gaz est souvent facturé en mètres cubes et déclaré en kWh, et la conversion dépend d’un pouvoir calorifique imprimé sur la facture. Extrayez l’unité et le coefficient de conversion au lieu de les supposer, puis laissez un Cleaner d’unités faire la conversion — supposer un coefficient standard, c’est là que la plupart des chiffres d’émissions dérapent sans bruit.",
        },
      ],
      pipeline: [
        { label: "Collections", href: "/docs/collections", why: "Les factures de différents fluides et fournisseurs arrivent ensemble et sont acheminées automatiquement vers le bon flow." },
        { label: "Cleaners", href: "/docs/cleaners", why: "Convertit les unités vers une base de reporting unique et calcule la consommation répartie par période." },
        { label: "Buckets", href: "/docs/buckets", why: "La consommation par site et par période dans un tableau à représenter en graphiques — le format dont ont besoin la finance comme le reporting ESG." },
        { label: "Intégration e-mail", href: "/docs/email-integration", why: "Les fournisseurs envoient leurs factures par e-mail ; en les transférant, le jeu de données se construit sans projet de saisie." },
      ],
      faqs: [
        { q: "Peut-il traiter les factures de différents fluides et fournisseurs ?", a: "Oui. Une Collection classe chaque facture et l’achemine vers le bon flow : factures d’électricité, de gaz et d’eau sont chacune lues par le flow conçu pour elles, quelle que soit la mise en page du fournisseur." },
        { q: "Les données sont-elles exploitables pour la déclaration des émissions ?", a: "Il produit la consommation par site et par période avec les unités capturées, ce dont ce type de reporting a besoin. Extrayez l’indicateur d’estimation et le coefficient de conversion plutôt que de supposer un coefficient standard — c’est sur cette hypothèse que la plupart des chiffres d’émissions dérapent." },
        { q: "Peut-il distinguer une hausse de prix d’une hausse de consommation ?", a: "Extrayez le tarif et l’abonnement avec la consommation : ils deviennent des colonnes distinctes dont vous suivez les tendances séparément." },
      ],
    },
  ],
};

export default fr;
