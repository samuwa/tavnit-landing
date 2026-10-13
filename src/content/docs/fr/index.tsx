import { Fragment } from "react";
import {
  Clock,
  Compass,
  FilePlus,
  FlaskConical,
  Info,
  Map,
  Rocket,
  Sparkles,
  Table2,
} from "lucide-react";
import {
  BulletList,
  DataTable,
  DocCard,
  DocLink,
  InfoBox,
  Lead,
  NumberedList,
  Related,
  Screenshot,
} from "@/components/docs/ui";
import type { DocsPageSchemaData } from "../types";

/** /fr/docs — translated from src/app/docs/page.tsx. */

/** Mirrors the visible numbered steps under "Étape 1 : créer un Flow". */
export const schema: DocsPageSchemaData = {
  howTo: {
    name: "Extraire des données structurées d’un document avec Tavnit",
    description:
      "Créez un Flow Tavnit à partir d’un modèle, d’un document d’exemple ou de zéro, vérifiez ses champs, traitez un document et lisez le résultat structuré — sans modèles à dessiner et sans code.",
    steps: [
      {
        name: "Ouvrir la fenêtre de création",
        text: "Sur la page Flows, cliquez sur Créer un Flow.",
      },
      {
        name: "Choisir un point de départ",
        text: "Choisissez À partir d’un modèle (un modèle Tavnit ou une copie de l’un de vos Flows), Suggestion de l’IA (importez un PDF ou une image d’exemple et l’IA propose les champs) ou Partir de zéro.",
      },
      {
        name: "Nommer et décrire le Flow",
        text: "Donnez au Flow un nom d’au moins 3 caractères et une description d’au moins 10 caractères qui indique quels documents il traite.",
      },
      {
        name: "Vérifier le schéma de données",
        text: "Dans l’éditeur, ajoutez, modifiez ou supprimez des champs jusqu’à ce que le schéma corresponde exactement à vos besoins. Un nouveau Flow est déjà Actif.",
      },
      {
        name: "Traiter un document",
        text: "Cliquez sur Exécuter, importez un vrai document et vérifiez le résultat.",
      },
    ],
  },
  primaryImage: {
    url: "/assets/tour2-runs.jpg",
    caption:
      "La page Runs de Tavnit : chaque document traité avec son Flow, sa source et son statut.",
    width: 1327,
    height: 801,
  },
};

export default function GettingStartedFr() {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        Premiers pas
      </h1>

      <DocCard icon={<Sparkles size={24} />} title="Ce que fait Tavnit">
        <Lead>
          Tavnit lit des documents et vous renvoie des données structurées. Vous décrivez une seule
          fois les champs dont vous avez besoin, vous lui envoyez des factures, des reçus, des bons de
          commande, des relevés, des tableurs ou des formulaires, et vous obtenez des lignes typées —
          sans construire un modèle par mise en page ni écrire de code d’analyse.
        </Lead>
        <p>
          L’extraction est le point de départ, pas le produit tout entier. Autour d’elle, Tavnit peut
          trier et découper les fichiers entrants, nettoyer et enrichir les lignes, comparer et
          contrôler les documents entre eux, remplir des formulaires, faire une pause pour qu’une
          personne révise, stocker les résultats dans des tables, les livrer à vos systèmes et les
          confier à un agent de navigateur qui agit à partir d’eux. Cette page vous donne la carte et
          vous guide pour votre premier document.
        </p>
        <InfoBox color="violet" icon={<FlaskConical size={20} />} title="Certaines zones sont en bêta">
          Pipelines, Subjects, Matchers, Inspectors, Fillers, Signals et Nets portent l’étiquette{" "}
          <strong>Bêta</strong> dans l’application. Vous pouvez les utiliser dès aujourd’hui, mais
          leurs écrans et leurs options peuvent encore évoluer.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Compass size={24} />} title="Une carte de Tavnit">
        <Lead>
          La barre latérale de l’application regroupe chaque zone selon sa fonction, de la réception
          des documents jusqu’à l’action sur les données. La documentation suit les mêmes groupes :
          ce tableau sert donc aussi de sommaire.
        </Lead>
        <DataTable
          head={["Groupe", "Zone", "Ce qu’elle fait"]}
          rows={[
            [
              "Entrée",
              <Fragment key="m0">
                <DocLink href="/docs/collections">Collections</DocLink>
              </Fragment>,
              "Une boîte de réception ou un endpoint pour des documents variés : chacun est classé et acheminé vers le bon Flow.",
            ],
            [
              "Entrée",
              <Fragment key="m1">
                <DocLink href="/docs/subjects">Subjects</DocLink>
              </Fragment>,
              "Modélisez une entité, comme un achat ou un patient, et regroupez ses documents en dossiers grâce à une référence.",
            ],
            [
              "Entrée",
              <Fragment key="m2">
                <DocLink href="/docs/splitters">Splitters</DocLink>
              </Fragment>,
              "Découpez un fichier qui contient plusieurs documents en documents distincts et envoyez chacun vers la suite.",
            ],
            [
              "Traitement",
              <Fragment key="m3">
                <DocLink href="/docs/flows">Flows</DocLink>
              </Fragment>,
              "Le schéma d’un type de document : les champs à extraire et tout ce qui s’y rattache. Tout commence ici.",
            ],
            [
              "Traitement",
              <Fragment key="m4">
                <DocLink href="/docs/cleaners">Cleaners</DocLink>
              </Fragment>,
              "Reformatez, convertissez, calculez, recherchez et validez les lignes extraites, et déclenchez des actions quand quelque chose semble anormal.",
            ],
            [
              "Traitement",
              <Fragment key="m5">
                <DocLink href="/docs/agents">Agents</DocLink>
              </Fragment>,
              "Des agents de navigateur qui accomplissent une mission décrite en langage courant sur un site web, souvent à partir de données extraites.",
            ],
            [
              "Intelligence",
              <Fragment key="m6">
                <DocLink href="/docs/matchers">Matchers</DocLink>
              </Fragment>,
              "Comparez des enregistrements ligne par ligne d’un document à l’autre — des devis entre eux, une facture avec sa commande.",
            ],
            [
              "Intelligence",
              <Fragment key="m7">
                <DocLink href="/docs/inspectors">Inspectors</DocLink>
              </Fragment>,
              "Appliquez une checklist à un ensemble de documents liés et obtenez un verdict conforme ou non conforme.",
            ],
            [
              "Intelligence",
              <Fragment key="m8">
                <DocLink href="/docs/fillers">Fillers</DocLink>
              </Fragment>,
              "Remplissez des modèles de formulaires PDF avec les données extraites de vos documents.",
            ],
            [
              "Orchestration",
              <Fragment key="m9">
                <DocLink href="/docs/pipelines">Pipelines</DocLink>
              </Fragment>,
              "Enchaînez les étapes de bout en bout sur un canevas visuel.",
            ],
            [
              "Orchestration",
              <Fragment key="m10">
                <DocLink href="/docs/pipeline-map">Carte des Pipelines</DocLink>
              </Fragment>,
              "Une vue d’ensemble de la circulation des documents dans votre organisation.",
            ],
            [
              "Données et activité",
              <Fragment key="m11">
                <DocLink href="/docs/buckets">Buckets</DocLink>
              </Fragment>,
              "Des tables où les résultats s’accumulent d’un Run à l’autre, prêts à être interrogés, représentés en graphiques et exportés.",
            ],
            [
              "Données et activité",
              <Fragment key="m12">
                <DocLink href="/docs/flows#runs">Runs</DocLink>
              </Fragment>,
              "L’historique de chaque document traité, avec son résultat, son fichier source et son journal.",
            ],
            [
              "Données et activité",
              <Fragment key="m13">
                <DocLink href="/docs/human-in-the-loop">Révision humaine</DocLink>
              </Fragment>,
              "Une file de révision où une personne approuve, modifie ou rejette les résultats avant leur livraison.",
            ],
            [
              "Audio",
              <Fragment key="m14">
                <DocLink href="/docs/signals">Signals</DocLink>
              </Fragment>,
              "Transformez des conversations enregistrées en lignes structurées.",
            ],
            [
              "Réseaux sociaux",
              <Fragment key="m15">
                <DocLink href="/docs/nets">Nets</DocLink>
              </Fragment>,
              "Transformez des publications sur les réseaux sociaux en lignes structurées et en tendances.",
            ],
          ]}
        />
        <InfoBox color="blue" icon={<Info size={20} />} title="Vous ne voyez pas Agents, Signals ou Nets ?">
          Ces trois zones sont activées organisation par organisation. Si elles n’apparaissent pas
          dans votre barre latérale, contactez l’équipe Tavnit pour les faire activer.
        </InfoBox>
        <InfoBox color="violet" icon={<Info size={20} />} title="Lequel trie mes documents ?">
          Si chaque fichier contient un seul document mais que vous ne connaissez pas son type,
          utilisez une <DocLink href="/docs/collections">Collection</DocLink>. Si un fichier contient
          plusieurs documents, utilisez un <DocLink href="/docs/splitters">Splitter</DocLink>. Si des
          documents vont ensemble — le même achat, le même patient —, utilisez un{" "}
          <DocLink href="/docs/subjects">Subject</DocLink>. Si vous savez déjà de quel document il
          s’agit, envoyez-le directement au Flow et passez-vous des trois.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Rocket size={24} />} title="Vos premières minutes">
        <Lead>
          Une nouvelle organisation démarre avec un court parcours de configuration : vous vous
          retrouvez rarement devant un écran vide.
        </Lead>
        <BulletList
          items={[
            <Fragment key="o0">
              <strong>Questions de bienvenue.</strong> Après la création de votre organisation, Tavnit
              pose quatre questions rapides : quels documents vous allez traiter, ce que vous voulez
              accomplir, comment vos documents arrivent aujourd’hui et combien vous en traitez
              environ par mois. Cela prend une trentaine de secondes, et vous pouvez{" "}
              <strong>Passer</strong>.
            </Fragment>,
            <Fragment key="o1">
              <strong>Flows de démarrage en un clic.</strong> Si vous avez répondu, la page Flows vide
              propose les modèles qui correspondent à vos documents sous{" "}
              <em>« D’après vos réponses, nous pouvons configurer ceci pour vous »</em>. Cliquez sur{" "}
              <strong>Créer ces Flows</strong> et ils sont créés pour vous, prêts à être modifiés.
            </Fragment>,
            <Fragment key="o2">
              <strong>Modèles de démarrage.</strong> Tavnit fournit des Flows prêts à l’emploi pour
              les factures, les bons de commande, les reçus, les relevés bancaires, les bons de
              livraison, les résultats d’analyses, les contrats, les devis, les avoirs, les pièces
              d’identité et les CV. Les modèles qui correspondent à vos réponses s’affichent en
              premier.
            </Fragment>,
            <Fragment key="o3">
              <strong>Le guide de démarrage.</strong> Un petit panneau dans un coin de l’application,
              avec trois onglets : <strong>Liste de contrôle</strong> (des étapes de configuration qui
              se cochent toutes seules à mesure que vous les terminez), <strong>Cet écran</strong>{" "}
              (des conseils pour la page où vous vous trouvez) et <strong>Fonctionnalités</strong>{" "}
              (toutes les zones dont vous disposez). Si vous le masquez, rouvrez-le depuis le menu{" "}
              <strong>Aide et support</strong>.
            </Fragment>,
          ]}
        />
      </DocCard>

      <DocCard icon={<FilePlus size={24} />} title="Étape 1 : créer un Flow">
        <Lead>
          Un Flow est le schéma d’un type de document. Nommez-le d’après le document plutôt que
          d’après le projet — <em>Factures fournisseurs</em>, pas <em>Automatisation T1</em> —, car
          le nom et la description sont aussi ce qu’une Collection utilise pour lui acheminer des
          documents.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f5">
              Sur la page <strong>Flows</strong>, cliquez sur <strong>Créer un Flow</strong>.
            </Fragment>,
            <Fragment key="f6">
              Choisissez un point de départ : <strong>À partir d’un modèle</strong> (un modèle Tavnit,
              ou une copie de l’un de vos propres Flows sous <strong>Mes Flows</strong>),{" "}
              <strong>Suggestion de l’IA</strong> (importez un PDF ou une image d’exemple et l’IA
              propose les champs) ou <strong>Partir de zéro</strong>.
            </Fragment>,
            <Fragment key="f7">
              Donnez au Flow un nom d’au moins 3 caractères et une description d’au moins 10
              caractères qui indique quels documents il traite.
            </Fragment>,
            <Fragment key="f8">
              Dans l’éditeur, ajoutez, modifiez ou supprimez des champs jusqu’à ce que le schéma
              corresponde exactement à vos besoins. Un nouveau Flow est déjà <strong>Actif</strong>.
            </Fragment>,
            <Fragment key="f9">
              Cliquez sur <strong>Exécuter</strong>, importez un vrai document et vérifiez le résultat.
            </Fragment>,
          ]}
        />
        <p>
          <DocLink href="/docs/flows">Flows</DocLink> détaille chacune de ces étapes — types de
          champs, types de données, les indices qui indiquent à l’IA où chercher, et le bouton{" "}
          <strong>Diagnostiquer</strong> qui propose des corrections dès qu’un Flow a de vrais Runs.
        </p>
        <InfoBox color="blue" icon={<Info size={20} />} title="La description compte">
          La description est obligatoire, et elle se rend utile deux fois : elle aide l’IA à
          extraire plus précisément, et c’est elle qui permet à une{" "}
          <DocLink href="/docs/collections">Collection</DocLink> d’acheminer des documents vers le
          Flow. Une description vague dégrade les deux.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Table2 size={24} />} title="Étape 2 : champs de métadonnées et champs de tableau">
        <Lead>
          Tavnit distingue les valeurs qui apparaissent une fois par document de celles qui se
          répètent. Cette seule distinction détermine la forme de tout ce qui suit — votre payload de
          webhook, vos lignes de Bucket et votre CSV la respectent tous.
        </Lead>
        <DataTable
          head={["Type de champ", "Apparaît", "Sur une facture"]}
          rows={[
            [
              "Champ de métadonnées",
              "Une fois par document",
              "Numéro de facture, date d’émission, fournisseur, total",
            ],
            [
              "Champ de tableau",
              "Une fois par ligne d’article",
              "Description, quantité, prix unitaire, montant",
            ],
          ]}
        />
        <p>
          Chaque champ a aussi un type de données — Texte, Nombre, Date, Mixte/Alphanumérique ou
          Image —, et bien le choisir compte plus qu’il n’y paraît : un total typé comme texte ne se
          laisse ni additionner, ni comparer, ni représenter en graphique. Un Flow qui n’a que des
          champs de métadonnées renvoie une seule ligne par document.{" "}
          <DocLink href="/docs/flows">Flows</DocLink> couvre le schéma complet, y compris les indices
          d’extraction, les champs composites et la façon de corriger un champ qui revient faux.
        </p>
      </DocCard>

      <DocCard icon={<Clock size={24} />} title="Étape 3 : envoyer des documents">
        <Lead>
          Quatre voies d’entrée, qui produisent toutes le même genre de Run. Commencez par une
          importation manuelle pour prouver que le Flow fonctionne, puis passez à la voie qui
          correspond à la façon dont vos documents arrivent réellement.
        </Lead>
        <DataTable
          head={["Voie", "Idéale pour", "Configuration"]}
          rows={[
            [
              "Importation dans l’application",
              "Les tests et les documents ponctuels",
              "Aucune. Sélectionnez plusieurs fichiers à la fois et chacun devient son propre Run",
            ],
            [
              <Fragment key="f10">
                <DocLink href="/docs/email-integration">E-mail</DocLink>
              </Fragment>,
              "Les documents qui arrivent déjà dans une boîte de réception",
              "Activer le Déclencheur e-mail du Flow et transférer les e-mails à son adresse",
            ],
            [
              <Fragment key="f11">
                <DocLink href="/docs/api-integration">API REST</DocLink>
              </Fragment>,
              "Vos propres systèmes et les gros volumes",
              "Une clé API et un POST",
            ],
            [
              <Fragment key="f12">
                <DocLink href="/docs/mcp-connector">Connecteur MCP</DocLink>
              </Fragment>,
              "Le travail ponctuel depuis un assistant IA",
              "Activé par organisation sur demande, puis une URL de connecteur depuis Intégrations",
            ],
          ]}
        />
        <p>
          Les Flows acceptent les PDF, les images (PNG, JPG, JPEG et JFIF) et les tableurs (XLSX, XLS
          et CSV). Pour un tableur, le Flow lit la première feuille visible. Les documents numérisés
          sont détectés et lus automatiquement par OCR.
        </p>
        <Screenshot
          src="/assets/tour2-runs.jpg"
          alt="La page Runs de Tavnit listant les documents traités, chacun avec son Flow, la personne qui l’a déclenché, sa source et son statut, au-dessus de vignettes récapitulant les Runs terminés, en cours et au total."
          caption="Chaque document devient un Run. La page Runs montre ce qui a été traité, comment c’est arrivé et comment cela s’est terminé."
        />
        <p>
          Ouvrez n’importe quel Run pour voir les champs extraits à côté du document source, ainsi
          que le journal de ce qui s’est passé pendant le traitement. Ce journal est le premier
          endroit à consulter quand un résultat ne correspond pas à vos attentes.
        </p>
      </DocCard>

      <DocCard icon={<Map size={24} />} title="Et ensuite ?">
        <Lead>
          Une fois l’extraction au point, l’étape suivante dépend de ce qui ne va pas dans les données
          ou de ce que vous devez en faire.
        </Lead>
        <DataTable
          head={["Si vous voulez…", "Lisez"]}
          rows={[
            [
              "Extraire plus de champs, ou corriger un champ qui revient faux",
              <Fragment key="f17">
                <DocLink href="/docs/flows">Flows</DocLink>
              </Fragment>,
            ],
            [
              "Corriger des formats, convertir des devises, calculer des totaux ou signaler des lignes erronées",
              <Fragment key="f18">
                <DocLink href="/docs/cleaners">Cleaners</DocLink>
              </Fragment>,
            ],
            [
              "Faire vérifier les résultats par une personne avant qu’ils n’aillent plus loin",
              <Fragment key="f19">
                <DocLink href="/docs/human-in-the-loop">Révision humaine</DocLink>
              </Fragment>,
            ],
            [
              "Faire entrer les données dans vos propres systèmes",
              <Fragment key="f20">
                <DocLink href="/docs/webhooks">Webhooks</DocLink> ou l’
                <DocLink href="/docs/api-integration">API REST</DocLink>
              </Fragment>,
            ],
            [
              "Garder les résultats ensemble et les interroger",
              <Fragment key="f21">
                <DocLink href="/docs/buckets">Buckets</DocLink>
              </Fragment>,
            ],
            [
              "Comparer des documents, ou les contrôler par rapport à une liste de règles",
              <Fragment key="f24">
                <DocLink href="/docs/matchers">Matchers</DocLink> et{" "}
                <DocLink href="/docs/inspectors">Inspectors</DocLink>
              </Fragment>,
            ],
            [
              "Relier plusieurs étapes en un seul processus",
              <Fragment key="f25">
                <DocLink href="/docs/pipelines">Pipelines</DocLink>
              </Fragment>,
            ],
            [
              "Agir sur les données ailleurs sur le web",
              <Fragment key="f22">
                <DocLink href="/docs/agents">Agents</DocLink>
              </Fragment>,
            ],
            [
              "Contrôler qui peut voir et modifier quoi",
              <Fragment key="f23">
                <DocLink href="/docs/user-roles">Rôles utilisateur</DocLink>
              </Fragment>,
            ],
          ]}
        />
      </DocCard>

      <Related
        links={[
          {
            href: "/docs/flows",
            label: "Construire en détail le schéma de données d’un Flow",
            description:
              "Types de champs, types de données, indices d’extraction, champs composites, Runs et tout ce que vous pouvez rattacher à un Flow.",
          },
          {
            href: "/docs/api-integration",
            label: "Traiter des documents avec l’API REST Tavnit",
            description:
              "Import en multipart et en base64, authentification par clé API, exemples en Python et JavaScript, et recettes no-code.",
          },
          {
            href: "/docs/email-integration",
            label: "Extraire les pièces jointes des e-mails",
            description: "Donnez à un Flow sa propre boîte de réception et transférez-y vos documents.",
          },
          {
            href: "/docs/pipeline-map",
            label: "Voir comment tout s’articule",
            description:
              "Une carte en direct de vos Flows, Collections, Splitters, Cleaners et Buckets.",
          },
        ]}
      />
    </section>
  );
}
