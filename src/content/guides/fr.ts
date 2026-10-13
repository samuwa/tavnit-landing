import type { GuidesContent } from "@/content/types";

/** Guides: the /guides hub copy and every guide — Français (fr). */
const fr: GuidesContent = {
  hub: {
    title: "Guides — Rapprochement des commandes, lignes de facture, codes SH et automatisation documentaire",
    description:
      "Des guides clairs sur les problèmes derrière l’automatisation documentaire : rapprocher les factures des bons de commande, extraire les lignes de facture, classer les codes SH, et plus encore.",
    ogTitle: "Guides Tavnit",
    ogDescription:
      "Des guides clairs sur le rapprochement des bons de commande, l’extraction des lignes de facture, le classement tarifaire SH et le reste des opérations documentaires.",
    breadcrumbHome: "Accueil",
    name: "Guides",
    h1: "Guides de l’automatisation documentaire",
    intro:
      "Les problèmes derrière le produit, expliqués pour eux-mêmes : ce que vérifie le rapprochement des bons de commande, pourquoi les tableaux de facture sont difficiles à extraire, comment fonctionne vraiment le classement tarifaire. Neutres vis-à-vis des éditeurs jusqu’à la dernière section, où nous précisons ce que Tavnit automatise.",
    minRead: "{m} min de lecture",
    read: "Lire",
  },
  items: [
    {
      slug: "how-to-match-invoices-to-purchase-orders",
      title: "Rapprocher les factures des bons de commande (à 2 et à 3 voies)",
      h1: "Comment rapprocher les factures des bons de commande",
      description:
        "Ce qu’est le rapprochement des bons de commande, en quoi diffèrent le rapprochement à deux et à trois voies, où le rapprochement manuel échoue, et comment l’automatiser sans remplacer votre ERP.",
      lede: "Le rapprochement facture–bon de commande vérifie qu’une facture fournisseur concorde avec le bon de commande auquel elle se rapporte : même fournisseur, mêmes articles, mêmes quantités, mêmes prix. Le rapprochement à deux voies compare la facture au bon de commande ; celui à trois voies y ajoute le bon de réception. C’est le contrôle qui empêche une entreprise de payer ce qu’elle n’a pas commandé ou pas reçu.",
      published: "2026-09-08",
      updated: "2026-09-08",
      readingMinutes: 7,
      sections: [
        {
          heading: "Ce que vérifie réellement le rapprochement",
          paragraphs: [
            "Un bon de commande est une promesse d’achat ; une facture est une demande de paiement. Les rapprocher répond à une seule question — cette facture demande-t-elle exactement ce dont nous avons convenu ? — selon quatre dimensions : le fournisseur, les articles, les quantités et les prix unitaires. Une cinquième, les totaux, découle des quatre autres et c’est la vérification la moins utile prise isolément.",
            "Les totaux sont un contrôle faible parce qu’ils concordent par hasard plus souvent qu’on ne le croit. Une facture qui facture dix unités à 12 $ au lieu de douze unités à 10 $ affiche le bon total et tout le reste faux. Le rapprochement au niveau de l’en-tête repère la facture sans bon de commande ; seul le rapprochement ligne par ligne repère la facture aux mauvaises lignes.",
          ],
        },
        {
          heading: "Rapprochement à deux voies ou à trois voies",
          paragraphs: [
            "Le rapprochement à deux voies compare la facture au bon de commande. Il confirme que vous avez accepté d’acheter cela, à ce prix. Il ne confirme pas que vous l’avez reçu, c’est pourquoi on le réserve généralement aux services, aux abonnements et aux biens de faible valeur, pour lesquels le coût d’une étape de réception dépasse le risque.",
            "Le rapprochement à trois voies ajoute le bon de réception — le bon de livraison, la liste de colisage ou le reçu d’entrepôt qui enregistre ce qui est physiquement arrivé. La facture doit alors concorder à la fois avec ce qui a été commandé et avec ce qui a été reçu. Un fournisseur qui livre huit et facture dix est repéré ici, et nulle part ailleurs. C’est la norme pour les biens physiques, et la plupart des référentiels d’audit l’attendent au-delà d’un seuil de matérialité.",
            "Certaines équipes parlent de rapprochement à quatre voies, en ajoutant un procès-verbal d’inspection ou de réception qualité. C’est la même idée avec un document de plus, et la même mécanique s’applique.",
          ],
        },
        {
          heading: "Pourquoi le rapprochement manuel ne tient pas",
          paragraphs: [
            "Le bon de commande est structuré — il sort de votre propre système. La facture, non. Elle arrive en PDF depuis le système du fournisseur, dans sa mise en page, avec ses références d’articles et sa propre description de chaque article. Avant toute comparaison, quelqu’un doit lire ce PDF et le traduire dans la même forme que le bon de commande. Dans la plupart des services fournisseurs, cette traduction, c’est une personne avec deux fenêtres ouvertes.",
            "C’est là que les erreurs s’introduisent. La comparaison elle-même n’est pas difficile ; un tableur s’en charge. La transcription l’est, parce qu’elle est répétitive, que les mises en page varient d’un fournisseur à l’autre et qu’une quantité fausse ressemble trait pour trait à une quantité juste. L’échec de rapprochement que vivent la plupart des entreprises n’est pas un échec de la logique de rapprochement. C’est un échec de la saisie en amont.",
          ],
          bullets: [
            "Les références fournisseur diffèrent de vos codes articles internes : apparier les lignes exige une table de correspondance que personne ne tient à jour.",
            "Les descriptions sont formulées différemment — « Gadget bleu lot de 10 » contre « GADGET-BLE x10 » — si bien qu’une comparaison au texte exact échoue sur des articles identiques.",
            "L’unité de mesure et le conditionnement changent le calcul : 1 carton de 12 contre 12 unités.",
            "Les livraisons partielles et les factures fractionnées font correspondre un bon de commande à plusieurs factures : le rapprochement devient plusieurs-à-un.",
            "Le fret, les suppléments et les taxes figurent sur la facture mais pas sur le bon de commande, et doivent être classés comme écarts acceptables plutôt que comme non-concordances.",
          ],
        },
        {
          heading: "Tolérances : décider ce qui constitue un écart",
          paragraphs: [
            "Aucun rapprochement réel n’est exact. Les prix sont cotés avant qu’une devise ne bouge ; les fournisseurs arrondissent ; le fret est estimé. Un processus qui bloque chaque facture pour un centime d’écart sera désactivé en moins d’un mois. La solution est une politique de tolérance : une règle, convenue à l’avance, qui fixe l’écart acceptable par dimension avant que la facture ne soit bloquée.",
            "Les politiques courantes admettent un petit écart en pourcentage ou en valeur absolue sur le prix unitaire, aucun écart sur la quantité pour les biens physiques, et une marge distincte pour les lignes de fret et de suppléments. L’essentiel est que la règle soit écrite et appliquée par le système, pas décidée par la personne qui fait le rapprochement ce jour-là. Les factures dans la tolérance passent ; celles qui en sortent s’arrêtent et partent chez une personne.",
          ],
        },
        {
          heading: "Comment l’automatiser, étape par étape",
          paragraphs: [
            "L’automatisation ne commence pas par un logiciel de rapprochement. Elle commence par mettre les deux documents dans la même forme structurée, pour que la comparaison devienne une requête plutôt qu’une lecture.",
          ],
          bullets: [
            "Définissez un seul schéma de champs pour les documents de commande : numéro de bon de commande, fournisseur, code article de la ligne, description, quantité, prix unitaire, montant de la ligne, total. Utilisez-le aussi bien pour les bons de commande que pour les factures et les bons de livraison.",
            "Extrayez chaque facture entrante dans ce schéma. C’est l’étape que la plupart des équipes sautent, et c’est elle qui rend possible tout ce qui suit.",
            "Normalisez les références fournisseur vers vos codes articles grâce à une recherche dans votre référentiel articles ; en l’absence de correspondance, appariez les lignes par similarité sémantique de la description plutôt que par texte exact.",
            "Vérifiez d’abord la facture par rapport à elle-même : le prix unitaire multiplié par la quantité donne-t-il le montant de la ligne, et la somme des lignes donne-t-elle le total ? Les erreurs de calcul sont les moins chères à repérer et les plus gênantes à payer.",
            "Rapprochez les champs d’en-tête sur le numéro de bon de commande, puis les lignes au sein du bon de commande correspondant. Appliquez votre politique de tolérance dimension par dimension.",
            "N’envoyez que les exceptions à un vérificateur, avec sous les yeux la facture, le bon de commande et le désaccord précis. Transmettez directement les factures concordantes à l’ERP.",
            "Conservez une piste d’audit de qui a approuvé quoi et quand. Les auditeurs la demandent ; le fournisseur aussi, lorsqu’il conteste un paiement partiel.",
          ],
        },
      ],
      tavnit: {
        heading: "La place de Tavnit",
        paragraphs: [
          "Tavnit se charge de l’extraction et de la mise en forme. Bons de commande, factures et bons de livraison arrivent par e-mail ou par API et sont extraits dans les mêmes champs typés, quelle que soit la mise en page du fournisseur. Un Cleaner de recherche fait correspondre les références fournisseur à vos codes articles ; un Cleaner de formule vérifie les calculs des lignes ; une condition signale tout ce qui sort de votre tolérance.",
          "Pour le rapprochement ligne par ligne, un Matcher prend le run du bon de commande comme référence et y apparie chaque ligne de facture — par le sens, avec un LLM pour départager les cas limites —, en plaçant quantité et prix unitaire côte à côte et en listant les lignes non appariées comme avertissements. Les factures signalées attendent un vérificateur désigné, avec une piste d’audit inaltérable ; les autres partent vers votre ERP par API ou webhook.",
        ],
        links: [
          { label: "Logiciel de rapprochement des bons de commande", href: "/use-cases/purchase-orders" },
          { label: "Traitement des factures", href: "/use-cases/invoice-processing" },
          { label: "Bons de livraison et contrôle des réceptions", href: "/use-cases/delivery-notes" },
        ],
      },
      faqs: [
        { q: "Quelle est la différence entre le rapprochement à deux voies et à trois voies ?", a: "Le rapprochement à deux voies compare la facture au bon de commande — avons-nous accepté d’acheter cela à ce prix ? Celui à trois voies la compare aussi au bon de réception — la marchandise est-elle réellement arrivée ? Le rapprochement à trois voies est la norme pour les biens physiques ; celui à deux voies est courant pour les services et les achats de faible valeur." },
        { q: "Le rapprochement des bons de commande peut-il être entièrement automatisé ?", a: "La comparaison, oui. Ce qui résiste à l’automatisation, c’est de mettre le PDF de la facture fournisseur dans la même forme structurée que votre bon de commande, car mises en page, références et descriptions varient d’un fournisseur à l’autre. Une fois l’extraction automatisée, le rapprochement devient une requête, et seules les exceptions demandent une intervention humaine." },
        { q: "Quelle tolérance fixer pour le rapprochement ?", a: "Il n’existe pas de chiffre universel. La plupart des politiques admettent un petit écart en pourcentage ou en valeur absolue sur le prix unitaire, aucun écart sur la quantité pour les biens physiques, et traitent le fret et les suppléments comme des lignes acceptables à part. L’important est que la règle soit écrite et appliquée de façon cohérente par le système." },
      ],
    },
    {
      slug: "line-item-extraction-from-invoices",
      title: "Extraction des lignes de facture : de quoi s’agit-il et pourquoi est-ce difficile",
      h1: "L’extraction des lignes de facture",
      description:
        "Pourquoi extraire les lignes d’une facture est plus difficile qu’extraire les totaux, ce que doit restituer une bonne extraction, et comment obtenir les données des tableaux de n’importe quel fournisseur sans modèles.",
      lede: "L’extraction des lignes de facture récupère le tableau répétitif d’une facture — chaque ligne de produit ou de service avec sa description, sa référence, sa quantité, son prix unitaire et son montant — sous forme de lignes structurées, au lieu des seuls champs d’en-tête comme le fournisseur, la date et le total. C’est ce qui rend possibles le rapprochement des bons de commande, l’analyse des dépenses et le rapprochement des stocks, et c’est la partie que la plupart des outils d’OCR ratent.",
      published: "2026-09-08",
      updated: "2026-09-08",
      readingMinutes: 6,
      sections: [
        {
          heading: "Champs d’en-tête et lignes de facture",
          paragraphs: [
            "Toute facture comporte une poignée de champs d’en-tête — fournisseur, numéro de facture, date, échéance, devise, total — qui apparaissent une seule fois et se repèrent facilement. Puis vient un tableau. Il peut compter trois lignes ou trois cents ; s’étendre sur plusieurs pages ; avoir des colonnes différentes de celles de tous les autres fournisseurs. Extraire l’en-tête vous dit combien payer. Extraire les lignes vous dit ce que vous payez, et c’est la question que pose réellement chaque processus en aval.",
            "L’analyse des dépenses a besoin des catégories de ligne. Le rapprochement des bons de commande a besoin des quantités et des prix par ligne. Les stocks ont besoin des codes articles. La fiscalité a besoin des taux par ligne. Une facture extraite sans ses lignes est un ordre de paiement sans contenu.",
          ],
        },
        {
          heading: "Pourquoi les tableaux sont la partie difficile",
          paragraphs: [
            "Un total est une valeur unique dans une zone prévisible de la page. Un tableau est une structure, et cette structure diffère partout. L’OCR classique lit des caractères et des positions ; il ne sait pas que le nombre sous « Qté » appartient à la description deux cellules plus à gauche, que la description s’est poursuivie sur une deuxième ligne, ni que les trois dernières lignes sont des sous-totaux et non des articles.",
          ],
          bullets: [
            "Les colonnes varient selon le fournisseur : certains indiquent la référence et la description, d’autres seulement la description, d’autres encore séparent le prix unitaire en HT et TTC.",
            "Les descriptions sur plusieurs lignes se poursuivent, et la deuxième ligne ressemble à une nouvelle ligne pour un analyseur fondé sur les positions.",
            "Les tableaux s’étendent sur plusieurs pages, avec ou sans en-têtes répétés, et des reports de totaux en bas de chaque page.",
            "Les lignes qui ne sont pas des articles — sous-totaux, remises, fret, taxes, « à reporter » — se trouvent dans le tableau et doivent être classées, pas extraites comme des produits.",
            "Les cellules fusionnées, les nombres alignés à droite qui débordent sur la colonne suivante et l’inclinaison des scans font échouer l’analyse par coordonnées.",
            "Les unités et conditionnements se cachent dans la description (« par carton de 12 ») plutôt que dans une colonne dédiée.",
          ],
        },
        {
          heading: "Extraction avec ou sans modèles",
          paragraphs: [
            "Les outils à modèles résolvent les tableaux en vous faisant dessiner la zone du tableau et ses colonnes pour la mise en page de chaque fournisseur. Cela fonctionne — pour ce fournisseur, jusqu’à ce qu’il change le format de sa facture ; l’outil produit alors des lignes fausses sans rien signaler, jusqu’à ce que quelqu’un s’en aperçoive. Le coût de maintenance croît avec le nombre de fournisseurs, c’est pourquoi les équipes qui en ont des centaines abandonnent ces outils.",
            "L’extraction sans modèles s’appuie sur un modèle qui comprend ce qu’est une ligne de facture, comme le ferait une personne, et restitue des lignes selon un schéma que vous définissez une seule fois — description, quantité, prix unitaire, montant — quelle que soit la mise en page. La contrepartie : un modèle peut mal lire, c’est pourquoi le résultat doit être vérifié plutôt que pris pour argent comptant — contrôles de calcul sur chaque ligne, et révision humaine en cas d’échec.",
          ],
        },
        {
          heading: "À quoi ressemble une bonne extraction des lignes",
          paragraphs: [
            "Le résultat doit être un tableau, pas du texte : une ligne par article, une colonne typée par champ, avec des nombres en nombres et des dates en dates. Chaque ligne doit porter les champs dont votre processus en aval a besoin, et rien de ce qui relève de l’en-tête. Les lignes qui ne sont pas des articles doivent être exclues ou signalées, pas mélangées au reste. Et le résultat doit être vérifiable : si le prix unitaire multiplié par la quantité ne donne pas le montant de la ligne, cette ligne est fausse et doit l’indiquer.",
          ],
          bullets: [
            "Description — mot pour mot, car c’est d’elle que découlent tout rapprochement ou toute catégorisation ultérieurs.",
            "Référence ou code article — celle du fournisseur, plus la vôtre si une recherche permet de la retrouver.",
            "Quantité et unité de mesure — dans deux champs distincts.",
            "Prix unitaire et montant de la ligne — les deux, pour pouvoir vérifier le calcul.",
            "Taux ou code de TVA par ligne, lorsque la réglementation l’exige.",
            "Un statut de vérification par ligne : calcul validé, ou ligne signalée avec la raison.",
          ],
        },
      ],
      tavnit: {
        heading: "La place de Tavnit",
        paragraphs: [
          "Dans Tavnit, les lignes de facture sont des champs de tableau d’un flow : vous nommez les colonnes une seule fois, et chaque facture de chaque fournisseur est extraite dans ces colonnes sous forme de lignes typées, sans modèle par fournisseur. Un Cleaner de formule vérifie le prix unitaire multiplié par la quantité sur chaque ligne ; un Cleaner de recherche fait correspondre les références fournisseur à vos codes articles ; un Cleaner de catégorie attribue les catégories de dépenses. Les lignes qui échouent à un contrôle envoient le run à un vérificateur. Les résultats arrivent dans un Bucket que vous pouvez interroger ou représenter en graphiques, ou partent directement vers vos systèmes par API ou webhook.",
        ],
        links: [
          { label: "Extraction de données de factures", href: "/use-cases/invoice-processing" },
          { label: "Flows — définir des champs de tableau", href: "/docs/flows" },
          { label: "Cleaners — champs de formule et de recherche", href: "/docs/cleaners" },
        ],
      },
      faqs: [
        { q: "L’OCR peut-il extraire les lignes d’une facture ?", a: "L’OCR seul extrait des caractères et leurs positions ; il ne comprend pas la structure d’un tableau et produit donc un texte qu’il faut encore découper en lignes. Une extraction fiable des lignes exige une couche qui comprend ce qu’est une ligne de facture : soit un modèle par fournisseur, soit un modèle d’IA qui généralise d’une mise en page à l’autre." },
        { q: "Comment extraire les tableaux de facture sans modèle par fournisseur ?", a: "Utilisez un modèle d’extraction qui restitue des lignes selon un schéma que vous définissez — description, quantité, prix unitaire, montant — quelle que soit la mise en page, puis vérifiez chaque ligne par un contrôle de calcul et envoyez les échecs à un vérificateur. C’est précisément ce que font les champs de tableau de Tavnit." },
        { q: "Comment traiter les tableaux de facture sur plusieurs pages ?", a: "L’extraction doit considérer le tableau comme un seul tableau logique réparti sur plusieurs pages, ignorer les en-têtes répétés et les reports de totaux, et restituer un seul ensemble de lignes. Vérifiez que la somme des lignes correspond au total de la facture pour vous assurer que rien ne s’est perdu à un saut de page." },
      ],
    },
    {
      slug: "hs-code-classification-explained",
      title: "Le classement tarifaire des codes SH expliqué — et comment l’automatiser",
      h1: "Classement des codes SH : de quoi s’agit-il et comment l’automatiser",
      description:
        "Comment fonctionne le Système harmonisé, pourquoi le classement tarifaire relève du jugement, à quoi servent les Règles générales interprétatives, et à quoi ressemble une automatisation responsable.",
      lede: "Le classement SH attribue à chaque produit échangé un code du Système harmonisé (HS), la nomenclature internationale qu’utilisent les autorités douanières pour déterminer les droits, les taxes et les contrôles applicables. Les six premiers chiffres sont mondiaux ; chaque pays les complète jusqu’à huit, dix chiffres ou plus pour ses lignes tarifaires nationales. Un code erroné, c’est un mauvais droit de douane, une expédition retardée ou une pénalité.",
      published: "2026-09-08",
      updated: "2026-09-08",
      readingMinutes: 7,
      sections: [
        {
          heading: "Comment le Système harmonisé est construit",
          paragraphs: [
            "Le Système harmonisé est géré par l’Organisation mondiale des douanes et révisé environ tous les cinq ans ; l’édition en vigueur est le SH 2022. Il s’organise en 21 sections, 97 chapitres (2 chiffres), positions (4 chiffres) et sous-positions (6 chiffres). Ces six chiffres sont identiques dans tous les pays membres, et c’est ce qui rend le système harmonisé. Au-delà de six chiffres, chaque pays ajoute ses propres subdivisions — les lignes tarifaires nationales — auxquelles se rattachent les taux de droits effectifs et les taxes intérieures.",
            "L’Arancel Nacional de Importación du Panama, par exemple, prolonge la nomenclature du SH 2022 en quelque 9 700 lignes tarifaires nationales, chacune assortie de son droit d’importation (DAI), de sa taxe sur les ventes (ITBMS) et, le cas échéant, de sa taxe sélective à la consommation (ISC). Un classement n’est pas terminé à six chiffres ; il l’est quand il aboutit à la ligne nationale qui détermine ce qui est dû.",
          ],
        },
        {
          heading: "Pourquoi le classement relève du jugement, pas d’une simple recherche",
          paragraphs: [
            "Si le classement était une recherche dans un dictionnaire — un nom de produit en entrée, un code en sortie —, il serait automatisé depuis des décennies. Ce n’est pas le cas, parce que la nomenclature classe les marchandises selon leur matière, leur fonction et leur présentation, et qu’une même description de produit peut raisonnablement correspondre à plusieurs positions. Une housse de siège auto chauffante est-elle un article textile, une pièce de véhicule ou un appareil de chauffage électrique ? Chacune a un taux différent.",
            "Pour trancher, il y a les Règles générales pour l’interprétation du Système harmonisé, les RGI. La règle 1 pose que ce sont les libellés des positions et les notes légales de section et de chapitre qui font foi. La règle 2 traite des articles incomplets et des mélanges. La règle 3 s’applique aux marchandises susceptibles de relever de deux positions ou plus — la description la plus spécifique d’abord, puis le caractère essentiel, puis la position placée en dernier dans l’ordre numérique. Les règles 4 à 6 couvrent les marchandises non dénommées ailleurs, les emballages et le classement au niveau des sous-positions. Un classement défendable cite la règle sur laquelle il repose.",
            "Viennent ensuite les notes légales : des notes de chapitre et de section qui incluent ou excluent certaines marchandises d’une position, quoi que semble dire son libellé. Un outil de classement qui lit les intitulés des positions en ignorant les notes se trompera avec aplomb sur un ensemble prévisible de produits.",
          ],
        },
        {
          heading: "Où le classement dérape en pratique",
          paragraphs: [
            "La plupart des erreurs de classement ne viennent pas d’un cas épineux de la RGI 3. Elles viennent d’un produit ordinaire mal décrit. La facture commerciale indique « pièces », « échantillons » ou un nom de marque, et la personne chargée du classement devine ou s’arrête pour demander. La description est la matière première du classement, et c’est généralement le maillon le plus faible du processus.",
          ],
          bullets: [
            "Des descriptions vagues sur la facture commerciale — une marque ou un numéro de modèle, sans indiquer ce qu’est l’article ni de quoi il est fait.",
            "Des envois mixtes où une même ligne de facture couvre plusieurs produits distincts qui se classent différemment.",
            "Se fier au code SH déclaré par le fournisseur, établi selon le tarif d’un autre pays et peut-être à une autre fin.",
            "Réutiliser le code de l’an dernier après qu’un changement d’édition du SH a déplacé le produit.",
            "Ignorer les notes de chapitre et classer à partir du seul intitulé de la position.",
            "Aucune trace de la raison d’un choix de code, si bien qu’un même produit est classé de trois façons par trois personnes.",
          ],
        },
        {
          heading: "À quoi ressemble une automatisation responsable",
          paragraphs: [
            "L’objectif n’est pas une machine qui classe sans supervision. Le droit douanier fait reposer la déclaration sur l’importateur ou le commissionnaire agréé, et il continuera de le faire. L’objectif est un système qui propose un classement assorti de son raisonnement, au moment où les documents de l’expédition sont traités, pour que le spécialiste vérifie au lieu de chercher.",
          ],
          bullets: [
            "Partir de la description des marchandises extraite mot pour mot, ainsi que des détails de matière, de fonction et de composition figurant sur la facture ou la liste de colisage.",
            "Classer selon le tarif national — l’ensemble des lignes nationales avec leurs taux —, pas seulement selon le SH à six chiffres, et selon l’édition en vigueur.",
            "Appliquer les notes légales de chapitre et de section ainsi que les RGI, et consigner quelle règle et quelle note ont tranché.",
            "Restituer un code, un niveau de confiance et le raisonnement ; envoyer les lignes à faible confiance ou à forte valeur à un commissionnaire pour révision avant le dépôt de la déclaration.",
            "Conserver une piste d’audit par classement. Quand la douane interroge un code deux ans plus tard, le raisonnement est votre défense.",
            "Apprendre des corrections du commissionnaire : un produit classé une fois doit être classé de la même façon la fois suivante.",
          ],
        },
      ],
      tavnit: {
        heading: "La place de Tavnit",
        paragraphs: [
          "Tavnit extrait le jeu de documents de l’expédition — facture commerciale, liste de colisage, connaissement, certificat d’origine — dans des champs typés, puis un Cleaner de code SH classe chaque ligne de marchandise à partir de sa description extraite, au cours du même run. Pour le Panama, l’outil de classement travaille sur l’Arancel Nacional officiel (VII Enmienda, SH 2022), avec ses lignes nationales et ses taux de DAI, d’ITBMS et d’ISC, en appliquant les notes légales de chapitre et les RGI : le résultat est une ligne tarifaire nationale assortie d’un raisonnement, et non une supposition à six chiffres.",
          "Les classements passent par la révision humaine avant tout dépôt, avec une piste d’audit inaltérable de qui a approuvé quel code. Les données structurées et classées peuvent ensuite préremplir le formulaire de déclaration au lieu d’y être ressaisies.",
        ],
        links: [
          { label: "Automatisation douanière avec classement SH", href: "/use-cases/customs-trade" },
          { label: "Douanes et classement tarifaire (Panama) — en espagnol", href: "/es/aduanas" },
          { label: "Cleaners — type de champ code SH", href: "/docs/cleaners" },
        ],
      },
      faqs: [
        { q: "Quelle est la différence entre un code SH et un code tarifaire ?", a: "Le code SH est le code international à six chiffres défini par l’Organisation mondiale des douanes. Un code tarifaire en est l’extension nationale — huit, dix chiffres ou plus — à laquelle se rattachent les taux de droits et de taxes du pays. L’Arancel Nacional du Panama, le TARIC de l’UE et le HTS des États-Unis sont tous des tarifs nationaux construits sur le SH." },
        { q: "L’IA peut-elle classer les codes SH avec précision ?", a: "Elle peut proposer de bons classements lorsqu’elle part d’une bonne description du produit, travaille sur le tarif national complet avec ses notes légales et explique son raisonnement. Elle ne doit pas déposer de déclarations sans supervision : l’approche responsable est une proposition assortie d’un niveau de confiance et d’un raisonnement, vérifiée par un commissionnaire agréé pour les lignes à faible confiance ou à forte valeur." },
        { q: "Puis-je simplement utiliser le code SH indiqué par mon fournisseur sur la facture ?", a: "Considérez-le comme un indice, pas comme une réponse. Le fournisseur a classé selon le tarif de son propre pays, peut-être pour le contrôle des exportations plutôt que pour les droits d’importation, et peut-être selon une édition plus ancienne du SH. C’est l’importateur ou le commissionnaire qui répond du code porté sur la déclaration d’importation." },
      ],
    },
  ],
};

export default fr;
