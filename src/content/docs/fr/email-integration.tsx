import { Fragment } from "react";
import {
  AlertTriangle,
  AtSign,
  Code2,
  Copy,
  ExternalLink,
  FileSpreadsheet,
  Info,
  LifeBuoy,
  Mail,
  Paperclip,
  Send,
  ShieldCheck,
  Workflow,
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
  WarningBox,
} from "@/components/docs/ui";
import type { DocsPageSchemaData } from "../types";

/** /fr/docs/email-integration — translated from src/app/docs/email-integration/page.tsx. */

/** Mirrors the visible numbered steps under "Activer le déclencheur e-mail". */
export const schema: DocsPageSchemaData = {
  howTo: {
    name: "Extraire les données des pièces jointes avec un déclencheur e-mail Tavnit",
    description:
      "Activez le déclencheur e-mail d'un Flow Tavnit pour obtenir une adresse de réception dédiée, puis transférez-y vos documents. Chaque pièce jointe prise en charge devient son propre Run d'extraction.",
    steps: [
      {
        name: "Ouvrir le Flow",
        text: "Allez dans Flows dans l'application Tavnit et ouvrez le Flow qui doit recevoir les documents.",
      },
      {
        name: "Activer le déclencheur e-mail",
        text: "Ouvrez le panneau Déclencheur e-mail sur la page de détail du Flow et activez-le. L'Adresse de réception du Flow apparaît.",
      },
      {
        name: "Copier l'adresse",
        text: "Cliquez sur Copier à côté de l'Adresse de réception. Vous pouvez aussi ajouter des Expéditeurs autorisés ou activer Traiter le corps de l'e-mail dans le même panneau.",
      },
      {
        name: "Envoyer un document de test",
        text: "Envoyez un seul PDF à l'adresse et surveillez la page Runs. Un nouveau Run apparaît avec la source E-mail.",
      },
      {
        name: "Automatiser le transfert",
        text: "Une fois le test réussi, ajoutez dans votre client de messagerie ou votre boîte partagée une règle qui transfère automatiquement les messages correspondants vers l'adresse.",
      },
    ],
  },
};

export default function EmailIntegrationFr() {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        Intégration e-mail
      </h1>

      <DocCard icon={<Mail size={24} />} title="Fonctionnement du traitement des e-mails">
        <Lead>
          Chaque Flow Tavnit peut avoir sa propre adresse de réception. Lorsque vous activez le
          déclencheur e-mail et envoyez un document à cette adresse, Tavnit prend chaque pièce jointe
          prise en charge, crée pour elle un Run d&apos;extraction distinct et la traite exactement
          comme si vous l&apos;aviez importée dans l&apos;application.
        </Lead>
        <p>
          Rien n&apos;est installé et rien n&apos;interroge votre boîte mail : vous transférez les
          messages vers l&apos;adresse et Tavnit réagit. C&apos;est le chemin le plus court entre
          « les factures arrivent par e-mail » et « les factures arrivent sous forme de lignes
          structurées », sans aucun code. Les Collections, Splitters, Pipelines, Matchers et Subjects
          ont eux aussi leurs propres adresses.
        </p>
        <BulletList
          items={[
            "Transférer des factures ou des reçus directement depuis votre boîte de réception",
            "Une boîte partagée de comptabilité fournisseurs avec une règle de transfert automatique",
            "Permettre aux fournisseurs d'envoyer des documents sans leur donner d'accès à Tavnit",
            "Extraire des données qui figurent dans le message lui-même, comme des confirmations de commande sans pièce jointe",
          ]}
        />
      </DocCard>

      <DocCard icon={<ExternalLink size={24} />} title="Activer le déclencheur e-mail">
        <Lead>
          Le déclencheur est désactivé par défaut. Activez-le depuis la page de détail du Flow,
          copiez l&apos;adresse qu&apos;il vous donne et envoyez un document de test avant d&apos;y
          diriger une règle de transfert.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f0">
              Allez dans <strong>Flows</strong> et ouvrez le Flow qui doit recevoir les documents.
            </Fragment>,
            <Fragment key="f1">
              Ouvrez le panneau <strong>Déclencheur e-mail</strong> et activez-le.
              L&apos;<strong>Adresse de réception</strong> du Flow apparaît.
            </Fragment>,
            <Fragment key="f2">
              Cliquez sur <strong>Copier</strong> à côté de l&apos;adresse. Dans le même panneau, vous
              pouvez ajouter des <strong>Expéditeurs autorisés</strong> ou activer{" "}
              <strong>Traiter le corps de l&apos;e-mail</strong> (tous deux expliqués plus bas).
            </Fragment>,
            <Fragment key="f3">
              Envoyez-y un PDF et consultez la page <strong>Runs</strong>. Un nouveau Run apparaît
              avec la source <strong>E-mail</strong>, et l&apos;adresse de l&apos;expéditeur est
              enregistrée sur le Run.
            </Fragment>,
            "Une fois que cela fonctionne, ajoutez la règle de transfert dans votre client de messagerie ou votre boîte partagée.",
          ]}
        />
        <InfoBox color="blue" icon={<Info size={20} />} title="Un Run par pièce jointe">
          Un e-mail contenant trois factures en pièces jointes produit trois Runs distincts, chacun
          avec son propre résultat et sa propre ligne dans la liste des Runs. Il ne produit pas un
          seul Run contenant trois documents.
        </InfoBox>
        <WarningBox>
          Un message envoyé à une adresse dont le déclencheur est désactivé (ou à une Collection
          inactive) est accepté puis ignoré : l&apos;expéditeur ne reçoit ni message de non-remise ni
          erreur. Si des documents semblent disparaître, vérifiez d&apos;abord l&apos;interrupteur.
        </WarningBox>
      </DocCard>

      <DocCard icon={<ShieldCheck size={24} />} title="Expéditeurs autorisés">
        <Lead>
          Par défaut, n&apos;importe quel expéditeur peut déclencher un Run en écrivant à
          l&apos;adresse. Ajoutez des adresses aux <strong>Expéditeurs autorisés</strong> dans le
          panneau Déclencheur e-mail et seuls ces expéditeurs sont acceptés ; les messages de toute
          autre personne sont ignorés sans avertissement.
        </Lead>
        <BulletList
          items={[
            "Les entrées sont des adresses e-mail complètes, pas des domaines. La correspondance ignore la casse et les noms d'affichage.",
            "Laissez la liste vide pour accepter les e-mails de n'importe quel expéditeur.",
            "La liste est disponible sur le déclencheur e-mail des Flows, Collections, Splitters, Pipelines, Matchers et Subjects.",
            <Fragment key="f4">
              Lorsque vous transférez via une boîte partagée, l&apos;expéditeur que voit Tavnit est
              généralement la boîte qui effectue le transfert : c&apos;est donc cette adresse
              qu&apos;il faut autoriser.
            </Fragment>,
          ]}
        />
      </DocCard>

      <DocCard icon={<Mail size={24} />} title="Traiter le corps de l'e-mail">
        <Lead>
          Certaines données n&apos;arrivent jamais en pièce jointe : une confirmation de commande, un
          avis de réservation, un fournisseur qui écrit les quantités dans le message. Activez{" "}
          <strong>Traiter le corps de l&apos;e-mail</strong> et Tavnit convertit le corps du message
          en PDF puis le traite comme n&apos;importe quel autre document. L&apos;option est disponible
          sur les Flows et les Collections.
        </Lead>
        <DataTable
          head={["Mode", "Ce qui se passe"]}
          rows={[
            [
              <Fragment key="f5"><strong>Uniquement sans pièce jointe</strong> (par défaut)</Fragment>,
              "Le corps n'est traité que lorsque l'e-mail ne contient aucun document en pièce jointe. Un mot d'accompagnement « voir pièce jointe » à côté d'une facture est ignoré : un e-mail ne lance donc jamais deux Runs.",
            ],
            [
              <Fragment key="f6"><strong>Toujours</strong></Fragment>,
              "Le corps est traité en plus de chaque pièce jointe, chacun dans son propre Run.",
            ],
          ]}
        />
        <BulletList
          items={[
            "Le PDF du corps apparaît en révision comme n'importe quel autre document, et le Run est marqué comme provenant du corps de l'e-mail.",
            "Les fils de réponses cités et les signatures sont supprimés lorsque le fournisseur de messagerie peut les identifier.",
            "Les images contenues dans le message ne sont pas lues. Les images de signature intégrées ne comptent pas comme des pièces jointes pour décider si le corps doit être traité.",
            "Un corps presque sans texte (« ok », « merci », un transfert vide) n'est pas traité.",
          ]}
        />
      </DocCard>

      <DocCard icon={<AtSign size={24} />} title="Quelles fonctionnalités ont une adresse e-mail">
        <Lead>
          Le déclencheur e-mail ne se limite pas aux Flows. Dirigez une adresse vers toute une étape
          de tri, un Pipeline ou une comparaison plutôt que vers un seul type de document.
        </Lead>
        <DataTable
          head={["Envoyer à", "Forme de l'adresse", "Ce qui se passe"]}
          rows={[
            [
              "Un Flow",
              <Fragment key="f7"><InlineCode>flow-name-&lt;id&gt;@mg.tavnit.io</InlineCode></Fragment>,
              "Chaque pièce jointe est extraite par ce Flow.",
            ],
            [
              "Une Collection",
              <Fragment key="f8"><InlineCode>name-&lt;id&gt;-collection@mg.tavnit.io</InlineCode></Fragment>,
              <Fragment key="f9">
                Chaque pièce jointe est classée et acheminée vers le bon Flow ou Splitter. Voir{" "}
                <DocLink href="/docs/collections">comment les Collections acheminent les documents</DocLink>.
              </Fragment>,
            ],
            [
              "Un Splitter",
              <Fragment key="f10"><InlineCode>&lt;id&gt;-splitter@mg.tavnit.io</InlineCode></Fragment>,
              <Fragment key="f11">
                Chaque pièce jointe est d&apos;abord découpée en ses différents documents. Voir{" "}
                <DocLink href="/docs/splitters">découper les fichiers multi-documents</DocLink>.
              </Fragment>,
            ],
            [
              "Un Pipeline",
              <Fragment key="f12"><InlineCode>&lt;id&gt;-pipeline@mg.tavnit.io</InlineCode></Fragment>,
              <Fragment key="f13">
                Chaque pièce jointe PDF ou image lance une exécution. Voir{" "}
                <DocLink href="/docs/pipelines">Pipelines</DocLink>.
              </Fragment>,
            ],
            [
              "Un Matcher",
              <Fragment key="f14"><InlineCode>&lt;id&gt;-matcher@mg.tavnit.io</InlineCode></Fragment>,
              <Fragment key="f15">
                Toutes les pièces jointes PDF ou image d&apos;un même e-mail sont comparées ensemble
                en un seul rapprochement (toujours en mode multilatéral), et le résultat est envoyé
                en réponse dans le même fil. Voir <DocLink href="/docs/matchers">Matchers</DocLink>.
              </Fragment>,
            ],
            [
              "Un Subject",
              <Fragment key="f16"><InlineCode>&lt;id&gt;-subject@mg.tavnit.io</InlineCode></Fragment>,
              <Fragment key="f17">
                Chaque pièce jointe est classée dans le bon dossier grâce à une référence dans
                l&apos;objet, le corps ou le nom du fichier, ou grâce à l&apos;adresse plus propre au
                dossier. Voir <DocLink href="/docs/subjects">Subjects</DocLink>.
              </Fragment>,
            ],
          ]}
          caption="Copiez l'adresse exacte depuis le panneau Déclencheur e-mail de la fonctionnalité ; les formes ci-dessus servent seulement à les distinguer."
        />
        <InfoBox color="violet" icon={<Workflow size={20} />} title="Quelle adresse donner aux fournisseurs ?">
          Si un expéditeur n&apos;envoie jamais qu&apos;un seul type de document, donnez-lui
          l&apos;adresse du Flow. S&apos;il envoie un mélange (factures, bons de commande, bons de
          livraison), donnez-lui l&apos;adresse de la Collection et laissez Tavnit faire le tri.
          S&apos;il envoie un PDF contenant plusieurs documents, donnez-lui l&apos;adresse du
          Splitter.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Paperclip size={24} />} title="Ce que Tavnit accepte">
        <Lead>
          Les Flows, Collections, Splitters et Subjects lisent les PDF, les images courantes et les
          feuilles de calcul. Les Pipelines et les Matchers ne lisent que les PDF et les images. Tout
          le reste du message est ignoré sans faire échouer le reste : un fichier non pris en charge
          n&apos;empêche pas le traitement des autres pièces jointes.
        </Lead>
        <DataTable
          head={["Accepté", "Extensions"]}
          rows={[
            ["Documents PDF", <Fragment key="f18"><InlineCode>.pdf</InlineCode></Fragment>],
            [
              "Images",
              <Fragment key="f19"><InlineCode>.png .jpg .jpeg .jfif .tif .tiff .webp .bmp .gif</InlineCode></Fragment>,
            ],
            [
              "Feuilles de calcul (pas pour les Pipelines ni les Matchers)",
              <Fragment key="f20"><InlineCode>.xlsx .xls .csv</InlineCode></Fragment>,
            ],
          ]}
        />
        <p>Une pièce jointe est ignorée au lieu d&apos;être traitée dans l&apos;un de ces cas :</p>
        <DataTable
          head={["Motif du rejet", "À quoi cela ressemble"]}
          rows={[
            [
              "Type de fichier non pris en charge",
              "Documents Word, archives, transferts .eml et tout fichier sans extension reconnue.",
            ],
            ["Pièce jointe vide", "Un fichier de zéro octet, généralement un transfert défectueux."],
            [
              "Fichier illisible",
              "Le fichier a une extension valide mais ne peut pas être ouvert : un téléchargement tronqué, un fichier renommé ou une feuille de calcul impossible à analyser.",
            ],
          ]}
        />
        <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="Les images de signature comptent comme des pièces jointes">
          Un logo dans une signature d&apos;e-mail arrive souvent sous forme d&apos;image jointe, et
          un Flow la traitera comme n&apos;importe quelle autre image. Si cela crée des Runs
          indésirables, transférez uniquement les documents, ou utilisez les Expéditeurs autorisés et
          une règle de transfert qui supprime les images intégrées.
        </InfoBox>
        <p>
          La limite de taille des pièces jointes de votre fournisseur de messagerie s&apos;applique
          avant même que Tavnit ne voie le message. Si un gros scan est rejeté à l&apos;envoi,
          importez-le dans l&apos;application ou envoyez-le plutôt à l&apos;
          <DocLink href="/docs/api-integration">API REST</DocLink>.
        </p>
      </DocCard>

      <DocCard icon={<FileSpreadsheet size={24} />} title="Traitement des feuilles de calcul">
        <Lead>
          Une feuille de calcul en pièce jointe est traitée comme un document, pas comme un tableau à
          importer. Ce qui se passe dépend de l&apos;endroit où vous l&apos;envoyez.
        </Lead>
        <DataTable
          head={["Envoyée à", "Ce que fait Tavnit"]}
          rows={[
            [
              "Un Flow",
              "Extrait les données de la première feuille visible.",
            ],
            [
              "Une Collection",
              "Classe le fichier d'après sa première feuille, puis le transmet au Flow choisi, qui lit la première feuille visible.",
            ],
            [
              "Un Splitter",
              "Traite chaque feuille visible et non vide comme un document à part, classe chacune d'elles et la transmet sous forme de fichier à une seule feuille.",
            ],
          ]}
        />
        <p>
          Les feuilles très volumineuses sont rejetées avec une erreur. Pour charger plutôt une feuille
          de calcul sous forme de lignes structurées, utilisez un passage de{" "}
          <DocLink href="/docs/cleaners">Cleaner</DocLink>.
        </p>
      </DocCard>

      <DocCard icon={<Copy size={24} />} title="Protection contre les doublons">
        <Lead>
          Les serveurs de messagerie livrent parfois le même message plusieurs fois, par exemple
          après un délai d&apos;attente dépassé. Tavnit reconnaît un message livré de nouveau à la
          même adresse et ne le traite pas une seconde fois : une nouvelle tentative ne crée donc
          jamais de Runs en double.
        </Lead>
        <BulletList
          items={[
            "Tavnit accuse réception du message en quelques secondes et traite les pièces jointes en arrière-plan : vous pouvez donc envoyer sans crainte un e-mail comportant de nombreuses pièces jointes.",
            "Si le traitement est interrompu, il reprend là où il s'est arrêté au lieu de tout recommencer.",
            "Un même message envoyé à deux adresses Tavnit différentes est traité une fois à chaque adresse.",
            "Renvoyer le même fichier dans un nouvel e-mail constitue un nouveau message, qui est traité à nouveau.",
          ]}
        />
      </DocCard>

      <DocCard icon={<Send size={24} />} title="Renvoyer les résultats par e-mail">
        <Lead>
          La Sortie e-mail est le trajet retour : lorsqu&apos;un Run se termine avec succès, Tavnit
          envoie le résultat par e-mail aux adresses que vous configurez. Elle est indépendante du
          déclencheur e-mail : vous pouvez utiliser l&apos;un ou l&apos;autre seul, ou les deux pour
          former une boucle complète d&apos;envoi et de retour.
        </Lead>
        <NumberedList
          items={[
            "Ouvrez la page de détail du Flow.",
            <Fragment key="f21">
              Ouvrez le panneau <strong>Sortie e-mail</strong>.
            </Fragment>,
            <Fragment key="f22">
              Ajoutez une ou plusieurs <strong>Adresses des destinataires</strong>.
            </Fragment>,
            <Fragment key="f23">
              Choisissez ce que contient chaque message sous <strong>Pièces jointes</strong>, puis
              enregistrez.
            </Fragment>,
          ]}
        />
        <DataTable
          head={["Option", "Ce que vous recevez"]}
          rows={[
            ["Extraction JSON", "Le résultat extrait, sous forme de JSON formaté dans le corps du message."],
            [
              "Extraction CSV",
              <Fragment key="f24">
                Les lignes en pièce jointe <InlineCode>rows.csv</InlineCode>, le moyen le plus rapide
                d&apos;importer les résultats dans une feuille de calcul.
              </Fragment>,
            ],
            ["Résultats des formulaires", "Les PDF remplis, lorsque le Flow remplit un modèle de formulaire."],
            [
              "Document original",
              "Le fichier source (PDF, image ou feuille de calcul) qui a été traité, joint aux résultats.",
            ],
          ]}
        />
        <InfoBox color="purple" icon={<Code2 size={20} />} title="Les champs de fichier arrivent sous forme de liens">
          Les champs contenant un fichier ou une image ne sont pas intégrés au JSON. Ils arrivent sous
          forme de liens à durée limitée, car Tavnit garde les documents stockés privés : un chemin de
          stockage brut ne serait pas accessible depuis une boîte de réception.
        </InfoBox>
        <BulletList
          items={[
            "L'e-mail de sortie n'est envoyé que pour les Runs terminés avec succès. Un Run en échec n'envoie rien.",
            "L'objet contient le nom du Flow et un détail propre à chaque Run, afin que les clients de messagerie ne regroupent pas tous les Runs d'un Flow dans un seul fil.",
            <Fragment key="f25">
              Si la <DocLink href="/docs/human-in-the-loop">révision humaine</DocLink> est activée sur
              le Flow, l&apos;e-mail attend qu&apos;un réviseur approuve le Run.
            </Fragment>,
            <Fragment key="f26">
              Pour une livraison de machine à machine, un{" "}
              <DocLink href="/docs/webhooks">webhook</DocLink> convient mieux qu&apos;un e-mail.
            </Fragment>,
          ]}
        />
      </DocCard>

      <DocCard icon={<Workflow size={24} />} title="Exemple concret : une boîte de comptabilité fournisseurs">
        <Lead>
          La configuration courante est une boîte partagée qui reçoit déjà les factures des
          fournisseurs, transférée vers une Collection pour que le format de chaque fournisseur
          aboutisse dans le bon Flow, avec des résultats envoyés par e-mail à l&apos;équipe financière
          et poussés dans un Bucket.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f27">
              Créez un Flow par type de document que vous recevez, par exemple{" "}
              <em>Factures fournisseurs</em> et <em>Bons de livraison</em>, et donnez à chacun une
              description claire.
            </Fragment>,
            <Fragment key="f28">
              Placez les deux Flows dans une <DocLink href="/docs/collections">Collection</DocLink> et
              activez le déclencheur e-mail de la Collection. Ajoutez la boîte partagée aux
              Expéditeurs autorisés.
            </Fragment>,
            <Fragment key="f29">
              Dans la boîte partagée, transférez vers l&apos;adresse de la Collection tout message
              comportant une pièce jointe et provenant des domaines de vos fournisseurs.
            </Fragment>,
            <Fragment key="f30">
              Sur chaque Flow, activez la <strong>Sortie e-mail</strong> avec la pièce jointe CSV pour
              l&apos;équipe financière, et ajoutez un{" "}
              <DocLink href="/docs/buckets">export vers un Bucket</DocLink> pour que les données
              s&apos;accumulent dans un seul tableau.
            </Fragment>,
            <Fragment key="f31">
              Ajoutez un <DocLink href="/docs/cleaners">Cleaner</DocLink> avec une action
              conditionnelle qui envoie tout ce qui dépasse votre seuil d&apos;approbation en{" "}
              <DocLink href="/docs/human-in-the-loop">révision humaine</DocLink> avant sa livraison.
            </Fragment>,
          ]}
        />
        <p>
          Personne au service financier n&apos;a besoin d&apos;ouvrir Tavnit. Les factures arrivent là
          où elles sont toujours arrivées, et les données structurées reviennent dans la même boîte.
        </p>
      </DocCard>

      <DocCard icon={<LifeBuoy size={24} />} title="Dépannage">
        <Lead>
          Comme les messages entrants sont acceptés sans avertissement, un document qui n&apos;arrive
          pas ne laisse aucune erreur dans votre boîte. Parcourez cette liste : la cause est presque
          toujours l&apos;interrupteur du déclencheur, les Expéditeurs autorisés, le type de pièce
          jointe ou une règle de transfert qui supprime les pièces jointes.
        </Lead>
        <DataTable
          head={["Symptôme", "Cause probable", "Solution"]}
          rows={[
            [
              "Aucun Run n'apparaît",
              "Le déclencheur e-mail est désactivé, l'adresse appartient à un autre Flow, ou l'expéditeur ne figure pas parmi les Expéditeurs autorisés.",
              "Revérifiez l'interrupteur et la liste des Expéditeurs autorisés, et copiez à nouveau l'adresse depuis le panneau Déclencheur e-mail.",
            ],
            [
              "Certaines pièces jointes traitées, d'autres non",
              "Celles qui manquent sont d'un type non pris en charge, vides ou illisibles.",
              "Comparez les extensions à la liste des formats acceptés ci-dessus.",
            ],
            [
              "Seule l'image de signature a été traitée",
              "Le vrai document n'était pas joint : il était lié, ou le transfert l'a perdu.",
              "Transférez en tant que pièce jointe plutôt qu'en ligne, et vérifiez que la règle conserve les pièces jointes.",
            ],
            [
              "Un e-mail sans pièce jointe n'a rien donné",
              "Traiter le corps de l'e-mail est désactivé, ou le corps ne contenait presque pas de texte.",
              "Activez Traiter le corps de l'e-mail dans le panneau Déclencheur e-mail (Flows et Collections).",
            ],
            [
              "Le mot d'accompagnement a produit son propre Run",
              "Traiter le corps de l'e-mail est réglé sur Toujours.",
              "Passez le mode sur Uniquement sans pièce jointe.",
            ],
            [
              "Des Runs apparaissent mais échouent",
              "Le problème vient du document lui-même, pas du circuit e-mail.",
              "Ouvrez le Run et lisez son journal ; l'échec est un problème d'extraction.",
            ],
            [
              "Les résultats n'arrivent jamais par e-mail",
              "La Sortie e-mail n'est pas configurée, le Run a échoué, ou il attend une révision.",
              "Vérifiez d'abord le statut du Run, puis la configuration de la Sortie e-mail.",
            ],
          ]}
        />
      </DocCard>

      <Related
        links={[
          {
            href: "/docs/collections",
            label: "Acheminer automatiquement des documents variés avec les Collections",
            description:
              "Dirigez une seule adresse e-mail vers plusieurs Flows et laissez Tavnit choisir le bon pour chaque document.",
          },
          {
            href: "/docs/splitters",
            label: "Découper les fichiers multi-documents avant l'extraction",
            description: "Pour les expéditeurs qui regroupent plusieurs documents dans une seule pièce jointe.",
          },
          {
            href: "/docs/webhooks",
            label: "Livrer les résultats à vos propres systèmes avec des webhooks",
            description:
              "L'alternative lisible par machine à la Sortie e-mail, avec nouvelles tentatives.",
          },
          {
            href: "/docs/api-integration",
            label: "Soumettre des documents via l'API REST",
            description:
              "Pour les volumes et les tailles de fichiers que l'e-mail ne peut pas transporter, avec une gestion explicite des erreurs.",
          },
        ]}
      />
    </section>
  );
}
