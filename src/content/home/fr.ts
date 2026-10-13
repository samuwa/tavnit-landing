import type { HomeCopy } from "@/content/types";

/** Home (components/LocalizedHome.tsx) — Français (fr). */
const fr: HomeCopy = {
  title: "Tavnit — Extrayez les données de vos documents avec l’IA, vérifiez-les, passez à l’action",
  description:
    "Transformez factures, listes de colisage, contrats et formulaires en données structurées, sans modèle par fournisseur. Votre équipe vérifie et approuve avant que quoi que ce soit ne soit enregistré. API, e-mail et MCP.",
  schemaName: "Tavnit en français",
  breadcrumbHome: "Accueil",
  readInEnglish: null,
  eyebrow: "Opérations documentaires par l’IA",
  h1: "Extrayez les données de vos documents avec l’IA, vérifiez-les en équipe et passez à l’action",
  lede:
    "Tavnit transforme factures, listes de colisage, contrats et formulaires en données structurées — sans modèle à créer pour chaque fournisseur. Votre équipe vérifie et approuve avant tout enregistrement, et les données validées rejoignent vos systèmes par API, webhook ou e-mail.",
  ctaDemo: "Réserver une démo",
  ctaTry: "Essayer gratuitement",
  ids: { howItWorks: "how-it-works", useCases: "use-cases", integrations: "integrations", faq: "faq" },
  problemHeading: "Le problème",
  problems: [
    "Les mêmes champs, ressaisis chaque mois depuis cent mises en page différentes. Chaque fournisseur présente sa facture à sa façon, et quelqu’un dans votre équipe la recopie à la main dans un tableur ou dans le système.",
    "Les outils d’OCR à modèles fonctionnent jusqu’au jour où un fournisseur change sa mise en page — et là, ils échouent sans prévenir. Les outils pour « discuter avec votre PDF » inventent des chiffres, sans révision, sans piste d’audit et sans moyen d’alimenter vos systèmes.",
    "Un total erroné ressemble trait pour trait à un total juste. Le vrai coût, ce ne sont pas les heures de saisie : c’est l’erreur qui atterrit dans votre comptabilité ou votre déclaration en douane sans que personne ne la voie.",
  ],
  stepsHeading: "Comment ça marche : extraire, vérifier, agir",
  steps: [
    {
      title: "Extraire",
      body: "Vous définissez une seule fois les champs dont vous avez besoin — numéro de facture, fournisseur, lignes avec quantité et prix — et Tavnit les extrait de n’importe quel PDF, scan ou photo, quelle que soit la mise en page. Aucun modèle par fournisseur.",
    },
    {
      title: "Vérifier",
      body: "Les Cleaners nettoient et valident : formats de date, devises, calculs des lignes, rapprochement avec vos données de référence. Tout ce qui ne colle pas s’arrête et part chez un vérificateur désigné. Chaque action est consignée dans une piste d’audit inaltérable.",
    },
    {
      title: "Agir",
      body: "Les données approuvées rejoignent votre ERP ou votre comptabilité par API ou webhook, sont stockées dans un Bucket interrogeable, remplissent des formulaires PDF ou alimentent un agent qui travaille pour vous sur un portail web.",
    },
  ],
  useCasesHeading: "Cas d’usage",
  useCasesIntro:
    "Chaque page détaille les champs qui comptent pour ce type de document et ce qui coince le plus souvent — ce qui rend un type de document plus difficile qu’un autre.",
  useCasesAll: "Voir les {count} cas d’usage",
  integrationsHeading: "Compatible avec les outils que vous utilisez déjà",
  integrations: [
    "E-mail : transférez le PDF à une adresse Tavnit et recevez les données en retour. Aucune intégration.",
    "API REST et webhooks : envoyez des documents depuis votre système et recevez les résultats dès qu’ils sont prêts. Recettes pour Zapier, Make, n8n et Power Automate.",
    "Connecteur MCP : connectez Tavnit à claude.ai ou à Cursor et demandez à votre assistant de traiter des documents ou d’interroger vos données extraites.",
    "Buckets : un stockage structuré intégré, que vous pouvez interroger en langage naturel et représenter en graphiques, sans rien exporter.",
  ],
  integrationsAll: "Toutes les intégrations",
  faqHeading: "Questions fréquentes",
  faqs: [
    {
      q: "Dois-je créer un modèle pour chaque fournisseur ?",
      a: "Non. Vous définissez les champs une seule fois dans un Flow et Tavnit les retrouve quelle que soit la mise en page. Si un fournisseur change le format de sa facture, vous n’avez rien à faire.",
    },
    {
      q: "Comment empêcher une valeur erronée d’entrer dans mon système ?",
      a: "Grâce à la révision humaine. Vous pouvez exiger une approbation pour chaque document, ou seulement quand une règle de Cleaner détecte une anomalie — par exemple, quand la quantité multipliée par le prix unitaire ne correspond pas au total de la ligne. Le vérificateur voit le document et les données extraites, corrige ou approuve, et chaque action est consignée dans la piste d’audit.",
    },
    {
      q: "Comment envoyer les documents ?",
      a: "Comme vous préférez : transférez l’e-mail avec le PDF en pièce jointe à une adresse Tavnit, importez-les dans l’application ou envoyez-les par API. Les résultats repartent par webhook, API ou e-mail, ou sont stockés dans un Bucket que vous pouvez interroger et représenter en graphiques.",
    },
    {
      q: "Est-ce que ça fonctionne dans ma langue ?",
      a: "Oui. Tavnit extrait des documents rédigés dans n’importe quelle langue, et vous pouvez restituer les données avec les noms de champs qu’utilise votre système. L’application elle-même est disponible en plusieurs langues.",
    },
    {
      q: "Combien ça coûte ?",
      a: "La tarification repose sur des crédits : 1 crédit correspond à 1 page traitée. Réservez une démo et nous examinerons votre volume et vos vrais documents.",
    },
  ],
  finalHeading: "Essayez-le sur l’un de vos documents",
  finalBody:
    "Apportez une vraie facture ou une liste de colisage. Pendant la démo, nous construisons ensemble votre premier Flow et vous voyez les données sortir en direct.",
};

export default fr;
