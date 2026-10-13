import { Fragment } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  HelpCircle,
  Inbox,
  Info,
  Layers,
  PenLine,
  Settings2,
  Shield,
  SplitSquareHorizontal,
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
  WarningBox,
} from "@/components/docs/ui";
import type { DocsPageSchemaData } from "../types";

/**
 * /fr/docs/human-in-the-loop — translated from
 * src/app/docs/human-in-the-loop/page.tsx. "Human in the Loop" is
 * "Révision humaine", as in the app's French dictionary.
 */

/** Mirrors the visible numbered steps under "Activer la révision pour un Flow". */
export const schema: DocsPageSchemaData = {
  howTo: {
    name: "Ajouter une étape de révision humaine à un Flow Tavnit",
    description:
      "Activez la Révision humaine sur un Flow et assignez des réviseurs pour que chaque Run se mette en pause en attendant une approbation avant que ses résultats soient livrés en aval.",
    steps: [
      {
        name: "Ouvrir le panneau Révision humaine du Flow",
        text: "Dans l’application Tavnit, allez dans Flows, ouvrez le Flow et sélectionnez le panneau Révision humaine dans sa barre latérale.",
      },
      {
        name: "Activer la révision",
        text: "Activez la Révision humaine. À partir de ce moment, les nouveaux Runs du Flow se mettent en pause au lieu de livrer leurs résultats.",
      },
      {
        name: "Assigner des réviseurs",
        text: "Sous Réviseurs, choisissez un ou plusieurs membres de votre organisation. Seuls les réviseurs assignés peuvent approuver ou rejeter les Runs en pause du Flow.",
      },
      {
        name: "Traiter un document et vérifier la file",
        text: "Traitez un document. Il doit apparaître comme En attente de révision dans la file Révision humaine de chaque réviseur assigné.",
      },
    ],
  },
  primaryImage: {
    url: "/assets/docs-hitl-review-2026-08.jpg",
    caption:
      "L’écran de révision humaine de Tavnit : une grille de données modifiable à côté du document source, avec les actions Approuver et Rejeter.",
    width: 1327,
    height: 801,
  },
};

export default function HumanInTheLoopFr() {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        Révision humaine
      </h1>

      <DocCard icon={<ClipboardCheck size={24} />} title="Ce que fait la Révision humaine">
        <Lead>
          La Révision humaine (Human in the Loop) place un point de contrôle entre l’extraction et la
          livraison. Un Run qui doit être révisé s’arrête après l’extraction et le nettoyage avec le
          statut <strong>En attente d’approbation</strong> : aucun e-mail n’est envoyé, aucun webhook
          ne se déclenche, aucune ligne de Bucket n’est écrite et aucun Agent lié ne démarre tant
          qu’un réviseur désigné ne l’a pas approuvé.
        </Lead>
        <p>
          Le mot important est <em>avant</em>. La révision n’est pas une correction que vous appliquez
          une fois que des données erronées ont déjà atteint votre ERP ; l’étape de livraison n’a pas
          encore eu lieu. Quand le réviseur approuve, le Run reprend exactement là où il s’était
          arrêté, avec ses modifications.
        </p>
        <BulletList
          items={[
            "Des données à forte valeur qui doivent être vérifiées avant de partir en aval",
            "Une exigence de conformité imposant une étape d’approbation manuelle documentée",
            "Des documents dont l’extraction est généralement juste, mais où une erreur occasionnelle coûte cher",
            "Des valeurs que seule une personne peut fournir, comme un centre de coûts interne ou un code d’approbation",
            "De nouveaux fournisseurs ou de nouveaux formats, le temps d’avoir confiance dans le Flow",
          ]}
        />
        <p>
          Les Runs de Flow sont le cas principal, mais la même file recueille aussi les{" "}
          <DocLink href="/docs/matchers">rapprochements</DocLink>, les{" "}
          <DocLink href="/docs/inspectors">inspections</DocLink> et les{" "}
          <DocLink href="/docs/fillers">remplissages</DocLink> en pause. Voir{" "}
          <em>Autres éléments qui attendent une révision</em> plus bas.
        </p>
      </DocCard>

      <DocCard icon={<Settings2 size={24} />} title="Trois façons de mettre un Run de Flow en pause">
        <Lead>
          L’interrupteur au niveau du Flow est une façon d’envoyer des Runs en révision, pas la seule.
          Un <DocLink href="/docs/cleaners">Cleaner</DocLink> rattaché au Flow peut mettre des Runs en
          pause de lui-même, même avec l’interrupteur désactivé. Quand plusieurs déclencheurs
          s’appliquent au même Run, leurs listes de réviseurs sont combinées.
        </Lead>
        <DataTable
          head={["Déclencheur", "Ce qui est mis en pause", "Idéal pour"]}
          rows={[
            [
              "Paramètre du Flow (panneau Révision humaine)",
              "Chaque Run du Flow, quel que soit le contenu extrait.",
              "Un type de document qui exige toujours une validation, ou un Flow que vous venez de créer et auquel vous ne faites pas encore confiance.",
            ],
            [
              "Règle d’Actions conditionnelles du Cleaner avec l’action Révision humaine",
              "Seulement les Runs où une ligne correspond à la règle, par exemple un total au-dessus d’un seuil ou un numéro fiscal manquant.",
              "Les gros volumes où la plupart des Runs sont corrects et où vous voulez seulement surveiller les exceptions.",
            ],
            [
              "Champ de Saisie humaine du Cleaner",
              "Chaque Run qui passe par le Cleaner, car une personne doit saisir ou choisir la valeur.",
              "Des données qui ne figurent pas du tout dans le document et que quelqu’un doit ajouter.",
            ],
          ]}
        />
        <InfoBox color="blue" icon={<Info size={20} />} title="Inutile de tout réviser">
          Réviser chaque Run va à l’encontre de l’automatisation de l’extraction. La voie
          conditionnelle est généralement la bonne : dans le Cleaner, ajoutez un champ Actions
          conditionnelles, donnez-lui une condition comme <em>total &gt; 10 000</em>, ajoutez l’action
          Révision humaine et choisissez ses réviseurs. Seuls les Runs concernés s’arrêtent.
          L’interrupteur du Flow peut rester désactivé.
        </InfoBox>
        <p>
          Quand une règle de Cleaner déclenche la pause, Tavnit enregistre quelles lignes et quels
          champs correspondaient. L’écran de révision signale exactement ces cellules : le réviseur
          commence donc par la raison pour laquelle le Run a été retenu, au lieu de lire tout le
          tableau. Si la règle s’appuie sur un champ Détection d’anomalies, le réviseur voit aussi
          pourquoi chaque valeur a été signalée.
        </p>
      </DocCard>

      <DocCard icon={<Settings2 size={24} />} title="Activer la révision pour un Flow">
        <Lead>
          L’interrupteur se trouve dans les paramètres du Flow lui-même. Seul un Propriétaire ou un
          Admin peut le modifier. Les réviseurs sont choisis parmi les membres de votre organisation.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f0">
              Ouvrez le Flow et sélectionnez le panneau <strong>Révision humaine</strong> dans sa barre
              latérale.
            </Fragment>,
            <Fragment key="f1">Activez la révision.</Fragment>,
            <Fragment key="f2">
              Sous <strong>Réviseurs</strong>, choisissez un ou plusieurs membres de votre
              organisation.
            </Fragment>,
            <Fragment key="f3">
              Traitez un document et vérifiez qu’il apparaît comme{" "}
              <strong>En attente de révision</strong> dans la file <strong>Révision humaine</strong>{" "}
              des réviseurs.
            </Fragment>,
          ]}
        />
        <WarningBox>
          Si la révision est activée sans réviseur assigné, le panneau avertit{" "}
          <em>« Aucun réviseur sélectionné — les approbations n’atteindront personne. »</em> Les Runs
          en pause n’ont alors personne pour les approuver. Assignez au moins un réviseur avant
          d’envoyer des documents.
        </WarningBox>
        <InfoBox
          color="violet"
          icon={<Info size={20} />}
          title="Avec un Cleaner rattaché, les réviseurs voient les données nettoyées"
        >
          Quand le Flow a un Cleaner, la pause intervient après le nettoyage : le tableau en révision
          est donc la sortie nettoyée, avec les devises converties, les dates reformatées et les
          colonnes calculées. C’est ce qui sera livré, et donc ce qu’il faut vérifier.
        </InfoBox>
      </DocCard>

      <DocCard icon={<PenLine size={24} />} title="Champs de saisie humaine">
        <Lead>
          Un champ de Saisie humaine est une colonne de Cleaner qui n’est jamais extraite : un
          réviseur la remplit sur l’écran de révision. Utilisez-le pour un centre de coûts, un compte
          général, un code d’approbation interne ou toute autre information que le document ne peut
          pas vous donner.
        </Lead>
        <DataTable
          head={["Option", "Ce qu’elle fait"]}
          rows={[
            ["Texte libre", "Le réviseur saisit la valeur."],
            [
              "Menu",
              "Le réviseur choisit parmi les valeurs distinctes d’une colonne de Bucket (Bucket des options et Colonne des options), éventuellement filtrées par des conditions, y compris des conditions sur les champs de la ligne en cours.",
            ],
            [
              "Valeur obligatoire",
              "L’approbation est bloquée tant que chaque ligne n’a pas de valeur. Désactivez cette option pour autoriser les cellules vides.",
            ],
            ["Réviseurs", "Qui peut remplir le champ et approuver ; combinés avec les réviseurs du Flow."],
          ]}
        />
        <p>
          Chaque Run qui passe par un Cleaner doté d’un champ de Saisie humaine se met en pause pour
          révision, que l’interrupteur du Flow soit activé ou non. Sur l’écran de révision, la colonne
          est marquée <strong>Saisie humaine requise</strong> avec le nombre de lignes remplies, et
          Approuver reste bloqué (
          <em>« Remplissez toutes les valeurs de saisie humaine obligatoires pour approuver »</em>)
          tant que chaque valeur obligatoire n’est pas renseignée.
        </p>
      </DocCard>

      <DocCard icon={<Inbox size={24} />} title="La file de révision">
        <Lead>
          La page <strong>Révision humaine</strong> de la barre latérale liste tout ce qui vous
          attend, du plus récent au plus ancien. Elle n’affiche que les éléments dont vous êtes
          réviseur ; les réviseurs ne voient pas les files des autres.
        </Lead>
        <BulletList
          items={[
            "Des indicateurs récapitulatifs en haut : En attente de révision, Plus ancien en attente, Votre rôle et Flows avec HITL",
            "Une carte par élément : le nom du fichier et le Flow pour un Run, avec une puce Rapprochement ou Remplissage pour ces types-là, et le statut En attente de révision",
            "Un point rouge sur l’icône de la barre latérale dès que quelque chose vous attend. Il se met à jour en temps réel, sans recharger la page",
            "Les réviseurs assignés reçoivent aussi un e-mail avec un lien direct dès qu’un Run, un rapprochement, une inspection ou un remplissage a besoin d’eux",
          ]}
        />
      </DocCard>

      <DocCard icon={<SplitSquareHorizontal size={24} />} title="Réviser un Run">
        <Lead>
          L’écran de révision est une vue partagée : le tableau extrait à gauche, le document
          d’origine à droite. Vous vérifiez une valeur par rapport à la source sans quitter la page,
          vous la corrigez sur place et vous approuvez. Le séparateur peut être déplacé, et sur mobile
          vous basculez entre les deux panneaux.
        </Lead>
        <Screenshot
          src="/assets/docs-hitl-review-2026-08.jpg"
          alt="L’écran de révision de Tavnit pour un Run en attente de révision : une grille de données modifiable à gauche avec les colonnes Subtotal, Amount et Weight et des cases à cocher par ligne, la facture source affichée à droite, et les boutons Rejeter et Approuver dans l’en-tête."
          caption="Un Run en attente de révision. La grille de gauche est la sortie nettoyée qui sera livrée ; le document source est affiché à côté pour la vérification."
        />
        <DataTable
          head={["Dans la grille de données, vous pouvez", "Comment"]}
          rows={[
            ["Modifier une valeur", "Double-cliquez sur la cellule et saisissez."],
            [
              "Modifier plusieurs cellules à la fois",
              "Sélectionnez en faisant glisser, avec Maj+clic ou en cliquant sur un en-tête de colonne, puis Appliquer à la sélection.",
            ],
            ["Retirer une ligne de la sortie", "Décochez-la. Les lignes exclues ne sont pas livrées."],
            [
              "Ajouter ou retirer une colonne",
              "Utilisez Ajouter une colonne ou Retirer la colonne. Une colonne retirée peut être rétablie avant l’approbation.",
            ],
            ["Voir ce qui a déclenché la pause", "Les cellules correspondant à une règle de Cleaner sont signalées."],
            ["Remplir les champs de Saisie humaine", "Saisissez la valeur ou choisissez-la dans le menu."],
            ["Voir ce que vous avez modifié", "Les cellules modifiées restent surlignées jusqu’à l’approbation."],
          ]}
        />
        <BulletList
          items={[
            "Le panneau du document affiche les PDF avec navigation entre les pages ainsi que les fichiers image ; les tableurs peuvent être téléchargés",
            "Ajuster à la largeur, Ajuster à la hauteur et zoom manuel ; faites glisser pour vous déplacer",
            "Ctrl/Cmd + et − pour zoomer, Ctrl/Cmd + 0 pour réinitialiser",
          ]}
        />
      </DocCard>

      <DocCard icon={<CheckCircle2 size={24} />} title="Approuver et rejeter">
        <Lead>
          Approuver intègre vos modifications au Run et le libère vers l’aval. Rejeter annule le Run
          et ne livre rien. Les deux décisions sont définitives pour ce Run : la pause est un point de
          passage unique, pas un état que l’on peut basculer dans un sens puis dans l’autre.
        </Lead>
        <DataTable
          head={["Décision", "Ce qui arrive au Run", "Ce qui est livré"]}
          rows={[
            [
              "Approuver",
              "Votre tableau modifié remplace la sortie extraite et le Run reprend jusqu’à Terminé, avec un badge Approuvé (HITL).",
              <Fragment key="f4">
                Tout ce que le Flow est configuré pour faire : sortie e-mail, webhook, export vers un{" "}
                <DocLink href="/docs/buckets">Bucket</DocLink>, remplissage de formulaires et{" "}
                <DocLink href="/docs/agents">Agent</DocLink> lié, le tout avec les données approuvées.
              </Fragment>,
            ],
            [
              "Rejeter",
              "Le Run passe à Annulé, avec un badge Rejeté (HITL), et votre motif (facultatif mais recommandé) est enregistré.",
              "Rien. Ni e-mail, ni webhook, ni ligne de Bucket, ni Run d’Agent.",
            ],
          ]}
        />
        <InfoBox color="green" icon={<CheckCircle2 size={20} />} title="La première décision l’emporte">
          Il n’est pas nécessaire que tous les réviseurs assignés valident. La première approbation ou
          le premier rejet tranche le Run ; si un deuxième réviseur l’avait ouvert, sa décision est
          refusée, car le Run n’est plus en attente d’approbation. Rechargez la file pour voir l’état
          actuel.
        </InfoBox>
        <p>
          La page du Run indique qui a décidé (<strong>Approuvé par</strong> ou{" "}
          <strong>Rejeté par</strong>).
        </p>
      </DocCard>

      <DocCard icon={<Layers size={24} />} title="Autres éléments qui attendent une révision">
        <Lead>
          Les Matchers, Inspectors et Fillers ont leurs propres paramètres de révision, et leurs
          éléments en pause arrivent dans la même file, avec la même règle de la première décision et
          le même journal d’audit.
        </Lead>
        <DataTable
          head={["Élément", "Quand il se met en pause", "Ce que fait le réviseur"]}
          rows={[
            [
              <DocLink key="o0" href="/docs/matchers">Rapprochement</DocLink>,
              "Quand la révision humaine est activée sur le Matcher : chaque rapprochement.",
              "Vérifie et corrige l’appariement des lignes entre documents fait par l’IA, peut exclure des lignes, puis approuve ou rejette.",
            ],
            [
              <DocLink key="o1" href="/docs/inspectors">Inspection</DocLink>,
              "Quand la révision humaine est activée sur l’Inspector, ou quand un contrôle en échec demande une révision via ses actions en cas d’échec.",
              "Lève les contrôles en échec en indiquant un motif, puis approuve pour finaliser le verdict, ou rejette pour annuler l’inspection.",
            ],
            [
              <DocLink key="o2" href="/docs/fillers">Remplissage</DocLink>,
              "Quand la révision humaine est activée sur le Filler, ou dès qu’il a des champs de Saisie humaine mappés.",
              "Révise les formulaires remplis, saisit les valeurs de Saisie humaine, puis approuve pour libérer les formulaires, ou rejette.",
            ],
          ]}
        />
      </DocCard>

      <DocCard icon={<Eye size={24} />} title="Qui peut réviser">
        <Lead>
          Seules les personnes assignées comme réviseurs peuvent approuver ou rejeter un Run de Flow.
          Être Admin ne suffit pas : un Admin qui ne figure pas dans la liste des réviseurs ne reçoit
          pas le Run dans sa file et ne peut pas l’approuver.
        </Lead>
        <BulletList
          items={[
            "Les listes de réviseurs des Flows sont gérées par un Propriétaire ou un Admin",
            "L’action Révision humaine d’un Cleaner et chaque champ de Saisie humaine ont leurs propres réviseurs, combinés avec ceux du Flow",
            "N’importe quel membre peut être réviseur, quel que soit son rôle",
            "Le rôle HITL uniquement est conçu pour les réviseurs : ces membres ne voient que la file Révision humaine et peuvent réviser, mais ne peuvent rien exécuter ni modifier d’autre",
          ]}
        />
        <p>
          Consultez <DocLink href="/docs/user-roles">les rôles utilisateur et les permissions</DocLink>{" "}
          pour savoir ce que chaque rôle peut modifier.
        </p>
      </DocCard>

      <DocCard icon={<Shield size={24} />} title="Le journal d’audit inaltérable">
        <Lead>
          Chaque action de révision est écrite dans un journal permanent, en ajout seul, avec un
          horodatage et l’identité du réviseur. Les entrées ne peuvent être ni modifiées ni
          supprimées : la trace de qui a changé quoi, et de l’état des données avant leur
          intervention, survit à la révision.
        </Lead>
        <DataTable
          head={["Événement enregistré", "Quand il est écrit"]}
          rows={[
            ["Réviseurs notifiés", "Le Run entre dans la file de révision et les réviseurs reçoivent un e-mail."],
            ["Cellule modifiée", "Une valeur est changée, avec l’ancienne et la nouvelle valeur."],
            ["Ligne ajoutée / ligne retirée", "Le réviseur ajoute une ligne ou en exclut une."],
            ["Colonne ajoutée / colonne retirée", "Le réviseur modifie la forme du tableau."],
            ["Approuvé", "La décision, le réviseur et le nombre de modifications effectuées."],
            ["Rejeté", "La décision, le réviseur et le motif indiqué."],
          ]}
        />
        <InfoBox color="purple" icon={<Shield size={20} />} title="Les données d’avant la révision sont aussi conservées">
          Tavnit stocke la sortie telle qu’elle était avant l’intervention du réviseur, à côté de la
          version approuvée. Un auditeur peut comparer l’extraction au résultat livré sans avoir à la
          reconstituer à partir du journal des événements.
        </InfoBox>
      </DocCard>

      <DocCard icon={<HelpCircle size={24} />} title="Dépannage">
        <DataTable
          head={["Symptôme", "Cause probable et solution"]}
          rows={[
            [
              "Des Runs se mettent en pause alors que l’interrupteur du Flow est désactivé",
              "Le Cleaner du Flow a une règle d’Actions conditionnelles avec l’action Révision humaine, ou un champ de Saisie humaine.",
            ],
            [
              "Un Run est En attente d’approbation mais n’est pas dans ma file",
              "Vous ne figurez pas dans sa liste de réviseurs. Demandez à un Propriétaire ou à un Admin de vous ajouter au Flow (ou à la règle de Cleaner qui l’a mis en pause).",
            ],
            [
              "L’approbation est refusée parce que vous n’êtes pas un réviseur configuré",
              "Seuls les réviseurs assignés peuvent décider. Si aucun réviseur n’a été assigné, ajoutez-en un sur le Flow ; personne d’autre ne peut libérer le Run.",
            ],
            [
              "L’approbation est refusée parce que le Run n’est pas en attente d’approbation",
              "Un autre réviseur a décidé en premier. Rechargez la file.",
            ],
            [
              "L’approbation est bloquée faute de saisie humaine",
              "Un champ de Saisie humaine obligatoire est encore vide sur certaines lignes. Remplissez-les, ou rendez le champ facultatif dans le Cleaner.",
            ],
            [
              "L’Agent lié ne s’est pas exécuté",
              "Il ne s’exécute qu’après l’approbation. Un Run rejeté ne le démarre jamais.",
            ],
          ]}
        />
        <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="La révision prend du temps">
          Un Run en pause attend aussi longtemps qu’il le faut. Si les résultats alimentent un
          processus sensible aux délais, assurez-vous que les réviseurs surveillent leur file ou leurs
          e-mails, ou limitez la pause aux exceptions grâce à une règle de Cleaner.
        </InfoBox>
      </DocCard>

      <Related
        links={[
          {
            href: "/docs/cleaners",
            label: "Déclencher la révision de façon conditionnelle avec un Cleaner",
            description:
              "Les Actions conditionnelles ne mettent en pause que les Runs qui enfreignent une règle ; les champs de Saisie humaine recueillent des valeurs auprès d’un réviseur.",
          },
          {
            href: "/docs/user-roles",
            label: "Rôles utilisateur et permissions",
            description: "Qui peut assigner des réviseurs, et ce que peut faire le rôle HITL uniquement.",
          },
          {
            href: "/docs/agents",
            label: "Agir sur les données approuvées avec des Agents",
            description: "Un Agent lié ne démarre qu’après l’approbation du réviseur.",
          },
          {
            href: "/docs/webhooks",
            label: "Livrer les résultats approuvés avec des webhooks",
            description: "Ce qui se déclenche une fois qu’un réviseur approuve, et ce qui ne se déclenche jamais s’il rejette.",
          },
          {
            href: "/docs/buckets",
            label: "Stocker les données approuvées dans des Buckets",
            description: "Les tables structurées qui ne reçoivent que les lignes validées par un réviseur.",
          },
        ]}
      />
    </section>
  );
}
