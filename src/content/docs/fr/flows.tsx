import { Fragment } from "react";
import {
  AlertTriangle,
  Boxes,
  Braces,
  Crosshair,
  FileInput,
  FilePlus,
  HeartPulse,
  History,
  Image as ImageIcon,
  Info,
  LifeBuoy,
  Play,
  Puzzle,
  RotateCcw,
  Sparkles,
  Table2,
  Type,
  Wand2,
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
  Screenshot,
  WarningBox,
} from "@/components/docs/ui";
import type { DocsPageSchemaData } from "../types";

/** /fr/docs/flows — translated from src/app/docs/flows/page.tsx. */

/** Mirrors the visible numbered steps under "Construire le schéma". */
export const schema: DocsPageSchemaData = {
  howTo: {
    name: "Construire un Flow Tavnit qui extrait des données structurées d’un document",
    description:
      "Créez un Flow, définissez ses champs de métadonnées et de tableau, ajoutez des indices d’extraction seulement là où ils sont nécessaires, et testez-le sur un vrai document.",
    steps: [
      {
        name: "Créer le Flow et le décrire",
        text: "Sur la page Flows, cliquez sur Créer un Flow et choisissez un modèle, une suggestion de l’IA ou un Flow vierge. Donnez-lui un nom et une description des documents qu’il traite — la description aide aussi l’IA à extraire plus précisément.",
      },
      {
        name: "Ajouter les champs de métadonnées",
        text: "Ajoutez un champ pour chaque valeur qui apparaît une fois par document, comme le numéro de facture, la date d’émission ou le fournisseur, et définissez son type de données.",
      },
      {
        name: "Ajouter les champs de tableau",
        text: "Ajoutez un champ pour chaque colonne du tableau de lignes d’articles qui se répète, comme la description, la quantité, le prix unitaire et le montant.",
      },
      {
        name: "Ajouter des indices d’extraction là où c’est nécessaire",
        text: "Ajoutez des indices uniquement aux champs qui en ont besoin : de vraies valeurs d’exemple, le libellé à côté duquel se trouve une valeur, la zone de la page où elle apparaît ou l’en-tête de colonne imprimé.",
      },
      {
        name: "Tester sur un vrai document",
        text: "Un nouveau Flow est déjà Actif. Cliquez sur Exécuter, traitez un vrai document, comparez le résultat avec la source et précisez les indices de tout champ revenu faux.",
      },
    ],
  },
  primaryImage: {
    url: "/assets/docs-flow-schema-2026-08.jpg",
    caption:
      "Le schéma de données d’un Flow Tavnit, avec les champs de métadonnées et les champs de tableau définis côte à côte.",
    width: 1327,
    height: 801,
  },
};

export default function FlowsFr() {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        Flows
      </h1>

      <DocCard icon={<Sparkles size={24} />} title="Qu’est-ce qu’un Flow ?">
        <Lead>
          Un Flow est la définition d’un type de document : les champs que vous voulez extraire, les
          indices qui indiquent à l’IA où les trouver, et tout ce qui est rattaché en aval. C’est
          l’objet de Tavnit qui transforme un document en données — Collections, Subjects, Splitters
          et Cleaners existent tous pour alimenter ou affiner ce que produit un Flow.
        </Lead>
        <p>
          Il n’y a ni modèle à dessiner ni coordonnées à cartographier. Vous décrivez les champs en
          termes simples et le Flow fonctionne quelle que soit la mise en page : un seul Flow{" "}
          <em>Factures fournisseurs</em> peut traiter vingt fournisseurs dont les factures ne se
          ressemblent en rien. C’est aussi pour cela que le schéma et ses indices sont l’endroit où
          se joue presque toute la qualité de l’extraction.
        </p>
        <Screenshot
          src="/assets/docs-flow-schema-2026-08.jpg"
          alt="Le schéma de données d’un Flow Tavnit nommé Invoice Processor. Un panneau Champs de métadonnées liste neuf champs à valeur unique, comme Invoice Number, Due Date et Total, avec leurs types de données, à côté d’un panneau Champs de tableau listant Description, Quantity, Price et Amount. Le rail de gauche regroupe Runs récents, Déclencheur e-mail, Collections, Cleaner, Agent, Modèles de formulaire, Sortie e-mail, Webhook, Export vers un Bucket, Révision humaine et ID du Flow."
          caption="Le schéma de données d’un Flow. Les champs de métadonnées à gauche, les champs de tableau répétés à droite, et tout ce qu’on peut rattacher au Flow dans le rail."
        />
        <InfoBox color="blue" icon={<Info size={20} />} title="Seul le schéma est obligatoire">
          Un Flow a besoin d’au moins un champ. Tout le reste du rail — Cleaner, Agent, webhook,
          e-mail, export vers un Bucket, révision — est facultatif et peut être ajouté plus tard sans
          rien reconstruire. Les Propriétaires et les Admins peuvent créer et modifier des Flows.
        </InfoBox>
      </DocCard>

      <DocCard icon={<FilePlus size={24} />} title="Créer un Flow">
        <Lead>
          Cliquez sur <strong>Créer un Flow</strong> sur la page Flows et Tavnit vous demande{" "}
          <em>« Comment voulez-vous commencer ? »</em>. Les trois voies aboutissent au même Flow
          modifiable : choisissez celle qui vous mène le plus vite à un bon premier jet.
        </Lead>
        <DataTable
          head={["Option", "Ce qu’elle fait", "Idéale quand"]}
          rows={[
            [
              "À partir d’un modèle",
              <Fragment key="c0">
                Ouvre une galerie à deux onglets. Les <strong>Modèles Tavnit</strong> sont des Flows
                prêts à l’emploi, avec champs et indices déjà renseignés ; <strong>Mes Flows</strong>{" "}
                vous permet de <strong>Créer une copie</strong> de l’un de vos propres Flows actifs.
              </Fragment>,
              "Votre document est d’un type courant, ou proche d’un Flow que vous avez déjà.",
            ],
            [
              "Suggestion de l’IA",
              "Importez un PDF ou une image d’exemple. L’IA le lit, détecte les champs et propose un nom, une description et un schéma avec des indices. Décochez ce dont vous n’avez pas besoin et modifiez n’importe quel champ avant de créer le Flow.",
              "Votre document est propre à votre activité et vous voulez prendre une longueur d’avance.",
            ],
            [
              "Partir de zéro",
              "Un schéma vide. Vous définissez vous-même chaque champ.",
              "Vous savez exactement ce dont vous avez besoin, ou vous reconstruisez un processus existant.",
            ],
          ]}
        />
        <p>
          Les modèles Tavnit couvrent les factures, les bons de commande, les reçus, les relevés
          bancaires, les bons de livraison, les résultats d’analyses, les contrats, les devis, les
          avoirs, les pièces d’identité et les CV. Si vous avez répondu aux questions de bienvenue lors
          de la configuration de votre organisation, les modèles qui correspondent à vos documents
          s’affichent en premier, et la page Flows vide propose de tous les créer en un clic avec{" "}
          <strong>Créer ces Flows</strong>.
        </p>
        <p>
          Chaque voie se termine par un nom (au moins 3 caractères) et une description (au moins 10
          caractères). Le Flow s’ouvre dans l’éditeur avec un court guide{" "}
          <em>« Configurez votre Flow »</em>, et il est <strong>Actif</strong> dès le départ — utilisez
          l’interrupteur de la barre supérieure pour le désactiver. Un Flow inactif ne peut pas être
          exécuté.
        </p>
        <InfoBox color="green" icon={<Info size={20} />} title="La suggestion de l’IA ne crée pas de Run">
          Préparer un Flow à partir d’un document d’exemple ne crée pas de Run. Considérez le brouillon
          comme un point de départ — supprimez ce que vous n’utiliserez pas, car chaque champ en trop
          est un champ de plus à réviser et une source d’erreur de plus.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Table2 size={24} />} title="Champs de métadonnées et champs de tableau">
        <Lead>
          Chaque champ appartient à l’un de deux types, selon que la valeur apparaît une fois par
          document ou une fois par ligne. C’est le choix le plus lourd de conséquences du schéma : il
          détermine la forme de votre payload de webhook, de vos lignes de Bucket, de votre CSV et de
          votre écran de révision.
        </Lead>
        <DataTable
          head={["", "Champ de métadonnées", "Champ de tableau"]}
          rows={[
            ["Apparaît", "Une fois par document", "Une fois par ligne d’un tableau qui se répète"],
            [
              "Sur une facture",
              "Numéro de facture, date d’émission, fournisseur, total",
              "Description, quantité, prix unitaire, montant",
            ],
            [
              "Dans la sortie",
              <Fragment key="f0">
                L’objet <InlineCode>metadata</InlineCode>
              </Fragment>,
              <Fragment key="f1">
                Une entrée par ligne dans <InlineCode>rows</InlineCode>
              </Fragment>,
            ],
            [
              "Dans un Bucket",
              "Répété sur chaque ligne exportée depuis ce document",
              "Une ligne de Bucket chacun",
            ],
          ]}
        />
        <InfoBox color="violet" icon={<Info size={20} />} title="Se tromper de type est l’erreur classique">
          Définir une colonne de lignes d’articles comme champ de métadonnées ne vous donne qu’une
          valeur sur un tableau de vingt. Définir le total d’une facture comme champ de tableau répète
          le même nombre sur chaque ligne. En cas de doute, demandez-vous si une deuxième occurrence de
          la valeur pourrait un jour apparaître dans le même document.
        </InfoBox>
        <p>
          Un Flow qui n’a <strong>que des champs de métadonnées</strong> — une pièce d’identité, un
          certificat, un formulaire d’une page — renvoie une seule ligne par document contenant ces
          valeurs, si bien que le résultat arrive quand même dans votre vue tableau, votre Bucket,
          votre webhook et votre e-mail, comme n’importe quel autre Run.
        </p>
        <p>
          Un Flow peut aussi apposer des <strong>Colonnes système</strong> sur chaque ligne qu’il
          produit — l’ID du Flow, le nom du Flow et l’ID du Run. Activez-les quand plusieurs Flows
          écrivent dans un même <DocLink href="/docs/buckets">Bucket</DocLink> et que vous devez savoir
          de quel document provient une ligne.
        </p>
      </DocCard>

      <DocCard icon={<Type size={24} />} title="Types de données">
        <Lead>
          Chaque champ porte un type. Les types ne sont pas cosmétiques : ils décident si une valeur
          se trie, s’additionne, se compare dans une règle de Cleaner et s’affiche correctement en
          graphique. Les définir correctement dès le Flow évite du travail à chaque étape suivante.
        </Lead>
        <DataTable
          head={["Type", "À utiliser pour", "Remarques"]}
          rows={[
            ["Texte", "Noms, adresses, descriptions, codes de référence", "Le choix sûr par défaut."],
            [
              "Nombre",
              "Totaux, quantités, prix, taux",
              "Indispensable si vous voulez additionner, comparer ou représenter la valeur en graphique plus tard.",
            ],
            [
              "Date",
              "Dates d’émission, dates d’échéance, dates de livraison",
              <Fragment key="f2">
                Le reformatage vers un format de sortie homogène est le travail d’un{" "}
                <DocLink href="/docs/cleaners">Cleaner</DocLink>, pas de l’extraction.
              </Fragment>,
            ],
            [
              "Mixte/Alphanumérique",
              "Valeurs qui mêlent lettres et chiffres — références d’articles, codes de conteneurs, numéros fiscaux",
              "Utilisez-le plutôt que Nombre quand les zéros initiaux ou les lettres doivent être conservés.",
            ],
            [
              "Image",
              "Éléments visuels imprimés dans le document : photos, logos, signatures, tampons",
              "Extraites et stockées de façon sécurisée, puis livrées sous forme de lien à durée limitée.",
            ],
          ]}
        />
        <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Extraire tel qu’imprimé, normaliser ensuite">
          N’utilisez pas le type pour reformater. Récupérez la valeur telle que le document l’affiche,
          puis laissez un Cleaner convertir les devises, reformuler les dates et corriger les
          séparateurs décimaux. Une extraction qui transforme en même temps est plus difficile à
          déboguer quand un nombre revient faux.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Crosshair size={24} />} title="Indices d’extraction">
        <Lead>
          Les indices permettent de lever l’ambiguïté sur un champ sans écrire de modèle. Ils comptent
          surtout quand un document contient plusieurs valeurs qui se ressemblent — trois dates, deux
          totaux, un numéro de commande et un numéro de facture dans le même bloc d’en-tête.
        </Lead>
        <p>
          <strong>Pour un champ de métadonnées</strong>, vous pouvez combiner n’importe lesquels de
          ces indices :
        </p>
        <DataTable
          head={["Indice", "Ce qu’il indique à l’IA", "Idéal pour"]}
          rows={[
            [
              "Valeurs d’exemple",
              "De vraies valeurs copiées de vos documents.",
              "Presque tout. L’indice le plus utile de tous — il montre d’un coup le format, la longueur et la forme.",
            ],
            [
              "À côté d’un libellé",
              <Fragment key="f3">
                Le libellé imprimé à côté duquel se trouve la valeur. Listez les variantes :{" "}
                <em>Invoice Number, Invoice #, Inv No</em>.
              </Fragment>,
              "Les champs d’en-tête que chaque fournisseur libelle différemment.",
            ],
            [
              "Dans une zone précise de la page",
              "L’une de neuf zones — d’en haut à gauche jusqu’en bas à droite.",
              "Les valeurs qui sont toujours dans le même coin, comme un numéro de document en haut à droite.",
            ],
            [
              "Plage attendue",
              "Un minimum, un maximum, ou les deux. Traitée comme une indication, pas comme une règle stricte.",
              "Repérer une virgule mal lue — un total de 27 030 au lieu de 270,30.",
            ],
            [
              "Indices supplémentaires",
              "Du texte libre pour tout ce que les options ci-dessus ne couvrent pas.",
              "Des règles comme « utiliser le montant net, jamais le brut ».",
            ],
          ]}
        />
        <p>
          <strong>Pour un champ de tableau</strong>, les indices sont différents, car l’IA localise
          une colonne plutôt qu’un point de la page :
        </p>
        <DataTable
          head={["Indice", "Ce qu’il indique à l’IA"]}
          rows={[
            [
              "Type de source",
              "Tableau pour des données dans un vrai tableau à colonnes ; Forme libre pour des valeurs en lignes dans un texte non structuré, comme un contrat.",
            ],
            [
              "En-têtes de colonne",
              "Le texte de l’en-tête tel qu’imprimé. Listez toutes les variantes qu’utilisent vos fournisseurs pour qu’un seul champ les reconnaisse toutes.",
            ],
            ["Plage attendue", "Une plage de vraisemblance pour les nombres de cette colonne."],
            ["Valeurs d’exemple", "De vraies valeurs de cellules tirées de vos documents."],
            [
              "Informations supplémentaires",
              "Ce que la colonne représente réellement, quand l’en-tête seul est ambigu — « prix unitaire avant remise ».",
            ],
          ]}
        />
        <InfoBox color="green" icon={<Info size={20} />} title="Commencez sans indices">
          Ajoutez les champs, exécutez un vrai document et n’ajoutez des indices que là où le résultat
          était faux. Tout baliser d’emblée fait perdre du temps sur des champs qui n’ont jamais été
          ambigus, et un indice trop précis peut dégrader l’extraction en excluant une mise en page
          que vous n’aviez pas prévue. Dès que le Flow a quelques Runs,{" "}
          <strong>Diagnostiquer</strong> peut vous proposer des indices.
        </InfoBox>
        <p>
          Les valeurs d’exemple sont ignorées pour les champs <strong>Date</strong> et{" "}
          <strong>Image</strong> : mettez plutôt vos consignes sur les dates dans la zone des indices
          supplémentaires.
        </p>
      </DocCard>

      <DocCard icon={<Puzzle size={24} />} title="Champs composites">
        <Lead>
          Certaines colonnes de tableau contiennent plusieurs valeurs dans une même cellule — une
          répartition tailles et quantités comme <em>S:2 M:5 L:3</em> imprimée dans une seule case. Un
          champ composite découpe cette cellule en sous-champs, pour que chaque partie devienne une
          valeur à part entière au lieu d’une chaîne qu’il faudrait analyser plus tard.
        </Lead>
        <NumberedList
          items={[
            "Ajoutez un champ de tableau et activez Champ composite.",
            <Fragment key="f4">
              Définissez les sous-champs qui composent la cellule — par exemple{" "}
              <InlineCode>size</InlineCode> en texte et <InlineCode>quantity</InlineCode> en nombre.
            </Fragment>,
            "Ajoutez des valeurs d’exemple qui montrent comment le regroupement apparaît dans vos documents.",
          ]}
        />
        <p>
          Les sous-champs contiennent des valeurs uniques : ils peuvent être de type Texte, Nombre,
          Date ou Mixte/Alphanumérique — mais pas Image. Les champs composites ne sont disponibles que
          pour les champs de tableau, puisque tout l’intérêt est de décomposer une cellule qui se
          répète.
        </p>
        <InfoBox color="blue" icon={<Boxes size={20} />} title="Champs de métadonnées multivalués">
          L’équivalent pour les métadonnées est <strong>Accepter plusieurs valeurs</strong>.
          Activez-le quand un même document peut légitimement contenir plusieurs éléments du même
          genre — une série de numéros de reçus, plusieurs références de bons de commande — et le champ
          renvoie une liste au lieu d’une seule valeur. Cette option n’est pas disponible pour les
          champs Image.
        </InfoBox>
      </DocCard>

      <DocCard icon={<ImageIcon size={24} />} title="Extraire des images">
        <Lead>
          Un champ Image extrait du document un élément visuel plutôt que du texte : une photo de
          produit, une signature, un tampon, un logo. Un champ image de métadonnées contient une image
          par document ; un champ image de tableau donne à chaque ligne l’image qui lui correspond.
        </Lead>
        <BulletList
          items={[
            "Les images sont stockées de façon privée : elles arrivent donc en aval sous forme de liens à durée limitée, pas d’octets bruts",
            "Le même genre de lien figure dans le payload du webhook, la sortie e-mail et la cellule du CSV ; un export depuis la page du Run génère de nouveaux liens",
            "Les liens des livraisons sont valables sept jours — téléchargez l’image plutôt que de conserver le lien",
            "Les champs Image ne peuvent pas être composites ni accepter plusieurs valeurs, et les indices de valeurs d’exemple ne s’y appliquent pas",
          ]}
        />
      </DocCard>

      <DocCard icon={<FilePlus size={24} />} title="Construire le schéma">
        <Lead>
          Construisez d’abord les champs de métadonnées, puis les champs de tableau, puis les indices.
          Testez tôt sur un vrai document — un schéma qui semble juste sur le papier et un schéma qui
          résiste à vos vrais documents sont deux choses différentes.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f5">
              Cliquez sur <strong>Créer un Flow</strong> et choisissez un modèle, une suggestion de
              l’IA ou un Flow vierge. Donnez-lui un nom qui décrit le document (
              <em>Factures fournisseurs</em>) et une vraie description — elle améliore la précision de
              l’extraction et c’est sur elle qu’une{" "}
              <DocLink href="/docs/collections">Collection</DocLink> s’appuie ensuite.
            </Fragment>,
            <Fragment key="f6">
              Sous <strong>Champs de métadonnées</strong>, cliquez sur <strong>Ajouter un champ</strong>{" "}
              pour chaque valeur qui apparaît une fois par document, en définissant le type de données
              au fur et à mesure.
            </Fragment>,
            <Fragment key="f7">
              Sous <strong>Champs de tableau</strong>, ajoutez un champ pour chaque colonne du tableau
              de lignes d’articles qui se répète.
            </Fragment>,
            <Fragment key="f8">
              Ajoutez des <strong>indices d’extraction</strong> uniquement aux champs qui en ont
              besoin.
            </Fragment>,
            <Fragment key="f9">
              Le Flow est déjà <strong>Actif</strong>. Cliquez sur <strong>Exécuter</strong>, traitez
              un vrai document et comparez le résultat avec la source.
            </Fragment>,
          ]}
        />
        <p>Faites glisser les champs par leur poignée pour les réordonner.</p>
        <WarningBox>
          Renommer un champ change la clé chez chaque consommateur en aval : le payload du webhook, le
          mappage des colonnes du Bucket, l’en-tête du CSV et tout{" "}
          <DocLink href="/docs/cleaners">Cleaner</DocLink> qui le lit. Vérifiez ce qui est rattaché
          avant de renommer un champ dans un Flow déjà en service.
        </WarningBox>
      </DocCard>

      <DocCard icon={<FileInput size={24} />} title="Quels fichiers un Flow lit">
        <Lead>
          Un Flow accepte les PDF, les images et les tableurs, par toutes les voies — importation,
          e-mail et API. Tavnit décide comment lire chaque fichier : vous n’avez rien à configurer
          par format.
        </Lead>
        <DataTable
          head={["Fichier", "Formats", "Comment il est lu"]}
          rows={[
            [
              "PDF",
              "PDF",
              "Les PDF numériques sont lus directement. Les PDF numérisés sont détectés automatiquement et passent d’abord par l’OCR.",
            ],
            [
              "Image",
              "PNG, JPG, JPEG, JFIF",
              "Lue comme une page numérisée. JFIF est la variante de JPEG que certains navigateurs sous Windows enregistrent par défaut ; elle fonctionne comme n’importe quel JPEG.",
            ],
            [
              "Tableur",
              "XLSX, XLS, CSV",
              "La première feuille visible est lue. Les autres feuilles et les feuilles masquées sont ignorées : placez les données voulues sur la première feuille.",
            ],
          ]}
        />
        <p>
          Les feuilles très volumineuses sont refusées avec une erreur explicite. Pour traiter chaque
          feuille d’un classeur comme un document distinct, faites-le plutôt passer par un{" "}
          <DocLink href="/docs/splitters">Splitter</DocLink>.
        </p>
        <InfoBox color="blue" icon={<Info size={20} />} title="Mauvais scan : forcer l’OCR pour les fichiers qui s’extraient mal">
          Les documents numérisés passent déjà automatiquement par l’OCR. Certains fichiers semblent
          numériques mais portent une couche de texte défectueuse — un scan avec une transcription
          intégrée de mauvaise qualité, un PDF exporté par un outil inhabituel. Pour ceux-là, ouvrez{" "}
          <strong>Mauvais scan</strong> dans les paramètres du Flow et activez-le : chaque fichier du
          Flow est alors d’abord lu par OCR, et l’extraction travaille sur le texte récupéré. Si l’OCR
          n’est pas disponible ou échoue, le Run revient automatiquement au traitement standard.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Braces size={24} />} title="Ce que vous pouvez rattacher à un Flow">
        <Lead>
          Le schéma décide de ce qui sort ; le reste du Flow décide de ce qu’il en advient. Chaque
          élément ci-dessous est indépendant — rattachez uniquement ce dont vous avez besoin, dans
          n’importe quel ordre, à tout moment.
        </Lead>
        <DataTable
          head={["Étape", "Élément", "Ce qu’il fait"]}
          rows={[
            [
              "Entrées",
              <Fragment key="f10">
                <DocLink href="/docs/email-integration">Déclencheur e-mail</DocLink>
              </Fragment>,
              "Donne au Flow sa propre adresse de réception, pour que les documents transférés (PDF, image ou tableur) soient traités automatiquement.",
            ],
            [
              "Entrées",
              <Fragment key="f11">
                <DocLink href="/docs/collections">Collections</DocLink>
              </Fragment>,
              "Liste les Collections qui peuvent acheminer des documents vers ce Flow.",
            ],
            [
              "Traitement",
              <Fragment key="f12">
                <DocLink href="/docs/cleaners">Cleaner</DocLink>
              </Fragment>,
              "Passe sur les lignes de chaque Run : reformater, convertir, calculer, rechercher et déclencher des règles.",
            ],
            [
              "Traitement",
              <Fragment key="f13">
                <DocLink href="/docs/agents">Agent</DocLink>
              </Fragment>,
              "S’exécute après l’extraction, en utilisant les champs extraits comme entrées.",
            ],
            [
              "Traitement",
              "Modèles de formulaire",
              "Remplit un modèle PDF avec les valeurs extraites d’un Run.",
            ],
            [
              "Sorties",
              <Fragment key="f14">
                <DocLink href="/docs/email-integration">Sortie e-mail</DocLink>
              </Fragment>,
              "Envoie les résultats par e-mail à une ou plusieurs adresses après chaque Run réussi, avec en option des pièces jointes JSON, CSV, formulaires remplis et document d’origine.",
            ],
            [
              "Sorties",
              <Fragment key="f15">
                <DocLink href="/docs/webhooks">Webhook</DocLink>
              </Fragment>,
              "Envoie les résultats en POST à votre endpoint. HTTPS uniquement.",
            ],
            [
              "Sorties",
              <Fragment key="f16">
                <DocLink href="/docs/buckets">Export vers un Bucket</DocLink>
              </Fragment>,
              "Ajoute les lignes de chaque Run à une table structurée, avec les champs mappés sur des colonnes.",
            ],
            [
              "Paramètres",
              <Fragment key="f17">
                <DocLink href="/docs/human-in-the-loop">Révision humaine</DocLink>
              </Fragment>,
              "Met les Runs en pause pour un réviseur avant toute livraison.",
            ],
            ["Paramètres", "Mauvais scan", "Force l’OCR pour chaque fichier du Flow (voir ci-dessus)."],
            [
              "Paramètres",
              "ID du Flow",
              <Fragment key="f18">
                L’identifiant que vous transmettez lorsque vous appelez l’
                <DocLink href="/docs/api-integration">API</DocLink>.
              </Fragment>,
            ],
          ]}
        />
        <p>
          <strong>Options du Déclencheur e-mail.</strong> Une fois le déclencheur activé, le panneau
          affiche l’adresse de réception du Flow et deux réglages.{" "}
          <strong>Expéditeurs autorisés</strong> limite qui peut lancer un Run par e-mail ; laissez-le
          vide pour accepter tous les expéditeurs. <strong>Traiter le corps de l’e-mail</strong>{" "}
          extrait aussi les données du texte du message lui-même, soit{" "}
          <em>Uniquement sans pièce jointe</em> (le réglage par défaut, pour qu’un simple message
          d’accompagnement ne lance jamais un second Run), soit <em>Toujours</em>. L’adresse de
          l’expéditeur est enregistrée sur chaque Run et affichée sur la page Runs.{" "}
          <DocLink href="/docs/email-integration">Intégration e-mail</DocLink> donne tous les détails.
        </p>
      </DocCard>

      <DocCard icon={<HeartPulse size={24} />} title="Diagnostiquer un Flow">
        <Lead>
          Une fois qu’un Flow a traité quelques documents, le bouton <strong>Diagnostiquer</strong> de
          sa barre supérieure ouvre le <strong>Docteur du Flow</strong>. Il étudie vos Runs terminés
          récents, repère les champs qui reviennent régulièrement vides ou avec un type incorrect, et
          propose des corrections.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="d0">
              Ouvrez le Flow et cliquez sur <strong>Diagnostiquer</strong>. Le bouton apparaît dès que
              le Flow a au moins un champ, pour les Propriétaires et les Admins.
            </Fragment>,
            "Tavnit lit les Runs récents, relit quelques-uns des documents où des champs ont échoué et prépare des corrections. Cela prend un instant.",
            <Fragment key="d1">
              Examinez le résultat. Chaque champ problématique indique à quelle fréquence il était vide
              ou d’un type incorrect, avec l’indice <strong>Actuel</strong> à côté de l’indice{" "}
              <strong>Proposé</strong>. Il peut aussi proposer une{" "}
              <strong>Description suggérée</strong>.
            </Fragment>,
            <Fragment key="d2">
              Gardez ou modifiez les corrections avec lesquelles vous êtes d’accord et cliquez sur{" "}
              <strong>Appliquer</strong>. Rien ne change tant que vous n’appliquez pas ; fermer le
              panneau abandonne les propositions.
            </Fragment>,
          ]}
        />
        <p>
          Si tout va bien, vous verrez <em>« L’extraction semble en bonne santé »</em>. Le diagnostic
          ne s’exécute que lorsque vous cliquez. Après avoir appliqué des corrections, relancez un vrai
          document pour vérifier qu’elles ont aidé.
        </p>
      </DocCard>

      <div id="runs" className="scroll-mt-24">
        <DocCard icon={<Play size={24} />} title="Runs : ce qui se passe quand un document est traité">
          <Lead>
            Chaque document devient un Run, et chaque Run suit la même séquence. Connaître cet ordre
            vous dit où regarder quand quelque chose arrive en retard, arrive faux ou n’arrive pas du
            tout.
          </Lead>
          <NumberedList
            items={[
              "Le document est stocké et le Run est mis en file d’attente.",
              "L’extraction le lit et produit des valeurs de métadonnées et des lignes de tableau.",
              "Si un Cleaner est rattaché, il passe sur ces lignes — conversions, colonnes calculées, recherches.",
              "Les règles conditionnelles se déclenchent : des lignes peuvent être supprimées, des notifications envoyées, une révision demandée.",
              "Si une révision est requise, le Run se met en pause et rien n’est livré tant qu’un réviseur n’a pas approuvé.",
              "Les sorties s’exécutent : e-mail, export vers un Bucket et webhook. Le Run est ensuite marqué comme terminé, et l’Agent lié, s’il y en a un, démarre.",
            ]}
          />
          <DataTable
            head={["Statut du Run", "Signification"]}
            rows={[
              ["En attente (en file d’attente)", "Stocké et en attente d’un worker."],
              ["Traitement", "En cours d’extraction, de nettoyage ou de livraison. La page du Run affiche l’étape en cours."],
              [
                "Nouvelle tentative",
                "Une tentative précédente a échoué pour une raison temporaire et le Run a été remis automatiquement en file d’attente (voir ci-dessous).",
              ],
              [
                "En attente de révision HITL",
                <Fragment key="f19">
                  En pause pour une <DocLink href="/docs/human-in-the-loop">révision humaine</DocLink>.
                  Rien n’a encore été livré.
                </Fragment>,
              ],
              ["Terminé", "L’extraction est finie et toutes les sorties configurées se sont exécutées."],
              [
                "Annulé",
                "Quelqu’un a annulé le Run alors qu’il était en file d’attente ou en cours de traitement, ou un réviseur l’a rejeté. Plus rien n’est livré.",
              ],
              ["Échec", "Le document n’a pas pu être traité. Le journal du Run en donne la raison."],
            ]}
          />
        </DocCard>
      </div>

      <DocCard icon={<History size={24} />} title="Travailler avec les Runs">
        <Lead>
          La page <strong>Runs</strong> liste tous les Runs de votre organisation ; chaque Flow a aussi
          son propre onglet <strong>Runs récents</strong>. Utilisez <strong>Filtrer</strong> pour
          affiner par statut, période, Flow, utilisateur, source ou ID de Run collé.
        </Lead>
        <DataTable
          head={["Action", "Où", "Remarques"]}
          rows={[
            [
              "Voir les détails",
              "Menu Actions du Run, ou clic sur la ligne",
              "Les données extraites à côté du fichier source, les informations du Run et le journal de traitement.",
            ],
            [
              "Télécharger le CSV",
              "Menu Actions du Run",
              "Runs terminés uniquement. Exporter en CSV et Exporter en JSON se trouvent aussi sur la page du Run.",
            ],
            [
              "Télécharger le fichier",
              "Menu Actions du Run, ou Télécharger sur la page du Run",
              "Le fichier source d’origine. Les tableurs ne peuvent pas être prévisualisés directement : téléchargez-les pour les consulter.",
            ],
            [
              "Annuler le Run",
              "Menu Actions du Run",
              "Uniquement pour les Runs encore en file d’attente ou en cours.",
            ],
          ]}
        />
        <p>
          La colonne <strong>Déclenché par</strong> indique qui a lancé le Run — l’utilisateur pour une
          importation, ou l’adresse de l’expéditeur pour un Run arrivé par e-mail. La colonne{" "}
          <strong>Source</strong> indique comment il est arrivé : importation manuelle, API, e-mail,
          etc.
        </p>
      </DocCard>

      <DocCard icon={<RotateCcw size={24} />} title="Runs en échec et nouvelles tentatives automatiques">
        <Lead>
          La plupart des échecs viennent du document — un fichier illisible ou un type non pris en
          charge — et réessayer n’y changerait rien. Quelques-uns, non : un worker de traitement
          redémarre en plein Run, ou un fournisseur d’IA subit une panne temporaire. Pour ces cas-là,
          une organisation peut laisser Tavnit réessayer de lui-même.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="r0">
              Allez dans <strong>Paramètres</strong> → <strong>Organisation</strong> →{" "}
              <strong>Runs en échec</strong>. Seul le Propriétaire voit cet onglet.
            </Fragment>,
            <Fragment key="r1">
              Activez <strong>Relancer automatiquement les Runs en échec</strong>.
            </Fragment>,
            <Fragment key="r2">
              Réglez <strong>Nombre maximal de tentatives par Run</strong> sur 1, 2 ou 3.
            </Fragment>,
          ]}
        />
        <BulletList
          items={[
            "Un Run relancé garde le même ID de Run : l’interrogation par API, les webhooks et les liens continuent de fonctionner.",
            "Les sorties ne se déclenchent que lorsqu’un Run se termine : une nouvelle tentative ne livre donc jamais un document deux fois.",
            "Jamais relancés : les fichiers invalides, les types non pris en charge, les Runs annulés, les Runs en pause pour révision et les Runs créés il y a plus d’un jour.",
            "Un Run perdu à cause du redémarrage d’un worker est détecté automatiquement. Avec la relance automatique activée, il est remis en file d’attente ; sinon, il est marqué Échec.",
            "La page du Run liste les Tentatives précédentes, chacune marquée Worker perdu ou Échec avec son erreur, et la liste des Runs affiche un badge de nouvelle tentative.",
          ]}
        />
        <p>
          Pour être averti des Runs qui se terminent en échec, ajoutez des adresses sous{" "}
          <strong>Notifications d’échec de Run</strong> dans le même onglet.
        </p>
      </DocCard>

      <DocCard icon={<LifeBuoy size={24} />} title="Améliorer la qualité de l’extraction">
        <Lead>
          Quand un champ revient faux, la correction se trouve presque toujours dans la définition de
          ce champ plutôt que dans le document. Commencez par <strong>Diagnostiquer</strong> si le
          Flow a des Runs, puis passez en revue les cas ci-dessous — les deux premiers règlent la
          plupart des problèmes.
        </Lead>
        <DataTable
          head={["Symptôme", "Cause probable", "Correction"]}
          rows={[
            [
              "La mauvaise valeur parmi plusieurs valeurs similaires",
              "Rien ne les distingue.",
              "Ajoutez le libellé à côté duquel se trouve la valeur, ou la zone de la page où elle apparaît.",
            ],
            [
              "Un champ revient vide",
              "Le nom du champ seul ne suffisait pas à l’identifier.",
              "Ajoutez deux ou trois vraies valeurs d’exemple — cela suffit généralement à lui seul.",
            ],
            [
              "Une seule ligne d’article alors qu’il y en a plusieurs",
              "Le champ a été défini comme champ de métadonnées.",
              "Redéfinissez-le comme champ de tableau.",
            ],
            [
              "La même valeur répétée sur chaque ligne",
              "Une valeur propre au document a été définie comme champ de tableau.",
              "Redéfinissez-la comme champ de métadonnées.",
            ],
            [
              "Des nombres faux d’un facteur cent",
              "Séparateurs décimaux et de milliers lus à l’envers.",
              "Définissez une plage attendue et normalisez le format dans un Cleaner.",
            ],
            [
              "Zéros initiaux ou lettres perdus",
              "Le champ est de type Nombre.",
              "Passez-le en Mixte/Alphanumérique.",
            ],
            [
              "Des colonnes confondues entre elles",
              "Deux colonnes ont des en-têtes similaires.",
              "Ajoutez les en-têtes de colonne imprimés, et décrivez la colonne dans Informations supplémentaires.",
            ],
            [
              "Bon pour certains fournisseurs, médiocre pour d’autres",
              "Les indices décrivent la mise en page d’un seul fournisseur.",
              "Ajoutez au même champ les variantes de libellés et d’en-têtes des autres fournisseurs.",
            ],
            [
              "Texte illisible depuis un fichier qui semble numérique",
              "La couche de texte intégrée du PDF est défectueuse.",
              "Activez Mauvais scan pour que le Flow le lise par OCR.",
            ],
            [
              "Un tableur revient vide ou incomplet",
              "Les données ne sont pas sur la première feuille visible.",
              "Déplacez-les sur la première feuille, ou utilisez un Splitter pour les classeurs à plusieurs feuilles.",
            ],
          ]}
        />
        <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Changez une seule chose à la fois">
          Relancez le même document après chaque modification. Modifier quatre indices d’un coup puis
          relancer vous apprend que le résultat s’est amélioré, mais pas quel changement en est la
          cause — et l’un des quatre a peut-être aggravé les choses.
        </InfoBox>
        <InfoBox color="blue" icon={<Wand2 size={20} />} title="Corrigez les données, pas l’extraction">
          Si la valeur est juste mais que le format ne l’est pas — dates, devises, unités, casse —,
          ne touchez pas au Flow et ajoutez un <DocLink href="/docs/cleaners">Cleaner</DocLink>.
        </InfoBox>
      </DocCard>

      <Related
        links={[
          {
            href: "/docs/cleaners",
            label: "Normaliser et enrichir ce qu’un Flow extrait",
            description:
              "Reformater les dates, convertir les devises, calculer des totaux et signaler les lignes qui enfreignent une règle.",
          },
          {
            href: "/docs/email-integration",
            label: "Envoyer des documents à un Flow par e-mail",
            description:
              "L’adresse de réception, les expéditeurs autorisés, le traitement du corps de l’e-mail et la sortie e-mail.",
          },
          {
            href: "/docs/collections",
            label: "Acheminer automatiquement les documents vers le bon Flow",
            description:
              "Pourquoi le nom et la description d’un Flow comptent au-delà de la précision de l’extraction.",
          },
          {
            href: "/docs/api-integration",
            label: "Déclencher un Flow depuis votre propre code",
            description:
              "L’ID du Flow, l’authentification par clé API et des exemples en Python et JavaScript.",
          },
          {
            href: "/docs/webhooks",
            label: "Voir le payload produit par un Flow",
            description:
              "Comment les champs de métadonnées et les champs de tableau apparaissent dans le JSON que reçoit votre endpoint.",
          },
        ]}
      />
    </section>
  );
}
