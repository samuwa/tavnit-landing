import type { EnterpriseCopy } from "@/content/types";

/** Enterprise services (/enterprise) — Français (fr). */
const fr: EnterpriseCopy = {
  title: "Services Entreprise — Mise en œuvre, contrôle et conseil aux entreprises",
  description:
    "Tavnit Enterprise : un contrat à vos conditions, une mise en œuvre accompagnée, des rôles utilisateur et une piste d’audit, un support direct, et un service de conseil pour optimiser vos processus de numérisation de documents et de saisie de données.",
  home: "Accueil",
  breadcrumbLabel: "Fil d’Ariane",
  crumb: "Entreprise",
  eyebrow: "Tavnit Enterprise",
  h1: "Services Entreprise",
  lead:
    "Pour les organisations qui traitent un grand volume de documents ou qui ont besoin de conditions propres : un contrat, une aide concrète pour mettre Tavnit en production et des conseils sur le processus qui l’entoure — en plus de la plateforme.",
  servicesHeading: "Ce que comprend l’offre Entreprise",
  services: [
    {
      title: "Un contrat à vos conditions",
      body: "Volume, conditions commerciales et modalités de paiement convenus dans un contrat dimensionné pour vos documents, plutôt qu’un abonnement en libre-service.",
    },
    {
      title: "Mise en œuvre accompagnée",
      body: "Nous configurons avec vous les Flows, les Cleaners, les règles de révision et les intégrations (API, webhooks, e-mail), sur vos vrais documents, et nous les laissons tourner en production.",
    },
    {
      title: "Contrôle et audit",
      body: "Des rôles utilisateur, dont un rôle réservé à la vérification, une révision humaine conditionnelle et une piste d’audit inaltérable de chaque consultation, modification et approbation.",
      links: [
        { label: "Rôles utilisateur", href: "/docs/user-roles" },
        { label: "Révision humaine", href: "/docs/human-in-the-loop" },
      ],
    },
    {
      title: "Support direct",
      body: "Une ligne directe avec l’équipe qui développe le produit, en anglais et en espagnol.",
    },
  ],
  advisory: {
    eyebrow: "Business Advisory",
    heading: "Conseil aux entreprises",
    subheading: "Optimisation des processus de numérisation de documents et de saisie de données",
    intro:
      "Au-delà de la plateforme, nous conseillons les entreprises qui veulent mettre de l’ordre et progresser dans la façon dont elles reçoivent, numérisent et enregistrent les informations de leurs documents — que le résultat final soit automatisé avec Tavnit ou non.",
    scopeHeading: "Ce que couvre la mission",
    scope: [
      { title: "Diagnostic du processus actuel", body: "Quels documents arrivent, par quels canaux et en quel volume ; qui les saisit, combien de temps cela prend et d’où viennent les erreurs." },
      { title: "Numérisation", body: "Critères de numérisation et de capture, organisation et nommage des fichiers, séparation des lots mélangés et traçabilité des originaux." },
      { title: "Saisie des données", body: "Quels champs sont réellement nécessaires, formats standard pour les dates, montants et devises, validations et contrôles par rapport aux données de référence." },
      { title: "Contrôles", body: "Où la révision humaine s’impose, séparation des tâches, et la piste d’audit qu’un auditeur ou un régulateur vous demandera." },
      { title: "Intégration", body: "Comment les données rejoignent votre ERP, votre comptabilité ou vos tableurs, et quelles étapes valent la peine d’être automatisées — et lesquelles non." },
      { title: "Déploiement et formation", body: "Un plan de mise en œuvre par étapes et une formation pour les personnes qui saisissent, vérifient et utilisent les données." },
    ],
    deliverablesHeading: "Livrables",
    deliverables:
      "Un diagnostic écrit du processus actuel, la conception du processus proposé avec ses contrôles, et un plan de mise en œuvre par étapes assorti d’indicateurs pour mesurer le résultat — temps de saisie par document, taux de correction, documents en attente de révision.",
  },
  ctaHeading: "Parlons-en",
  ctaBody: "Parlez-nous de vos documents et de votre volume, et nous vous dirons lequel de ces services vous convient.",
  ctaButton: "Réserver un rendez-vous",
  ctaEmail: "ou écrivez-nous à",
};

export default fr;
