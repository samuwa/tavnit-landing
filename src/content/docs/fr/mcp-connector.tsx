import Link from "next/link";
import { Fragment } from "react";
import {
  AlertTriangle,
  Info,
  KeyRound,
  LifeBuoy,
  MessageSquare,
  Plug,
  RefreshCw,
  Settings2,
  Sparkles,
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
import { localizedPath } from "@/lib/routes";
import type { DocsPageSchemaData } from "../types";

/** /fr/docs/mcp-connector — translated from src/app/docs/mcp-connector/page.tsx. */

/** Mirrors the numbered steps rendered under "Connecter claude.ai". */
export const schema: DocsPageSchemaData = {
  howTo: {
    name: "Connecter Tavnit à claude.ai avec le connecteur MCP",
    description:
      "Générez une URL de connecteur Tavnit sur la page Intégrations et ajoutez-la à claude.ai comme connecteur personnalisé, pour que votre assistant puisse travailler avec vos données Tavnit.",
    steps: [
      {
        name: "Ouvrir Intégrations dans Tavnit",
        text: "Connectez-vous à l'application Tavnit et ouvrez Intégrations depuis la barre latérale. Vérifiez que vous êtes dans l'organisation dont l'assistant doit atteindre les données.",
      },
      {
        name: "Générer l'URL du connecteur",
        text: "Dans la carte Connecteur personnalisé, sélectionnez Générer l'URL du connecteur. Tavnit émet l'URL à partir de votre clé API et indique quand elle a été créée et quand elle expire.",
      },
      {
        name: "Copier l'URL",
        text: "Copiez l'URL du connecteur avec le bouton de copie. Traitez-la comme un mot de passe.",
      },
      {
        name: "L'ajouter comme connecteur personnalisé dans claude.ai",
        text: "Dans claude.ai, allez dans Settings, puis Connectors, puis Add custom connector, et collez l'URL. Les connecteurs personnalisés nécessitent un forfait Claude Pro ou supérieur.",
      },
      {
        name: "Confirmer la connexion",
        text: "Démarrez une nouvelle conversation et demandez à l'assistant quels outils Tavnit il possède. S'il les liste, le connecteur est actif.",
      },
    ],
  },
};

export default function McpConnectorFr() {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        Connecteur MCP
      </h1>

      <DocCard icon={<Plug size={24} />} title="Ce que fait le connecteur MCP">
        <Lead>
          Le connecteur MCP ajoute votre organisation Tavnit comme outil dans un assistant d&apos;IA.
          Une fois connecté, vous pouvez interroger l&apos;assistant sur vos données Tavnit en langage
          courant, et il répond à partir de votre compte en direct au lieu de deviner.
        </Lead>
        <p>
          MCP (Model Context Protocol) est le standard ouvert qui permet aux assistants d&apos;IA
          d&apos;appeler des outils externes. Tavnit exploite un serveur MCP à l&apos;adresse{" "}
          <InlineCode>mcp.tavnit.io</InlineCode>, et l&apos;URL du connecteur est l&apos;identifiant
          qui dirige un client vers votre organisation. Il fonctionne avec <strong>claude.ai</strong>{" "}
          (Pro et au-delà), <strong>Cursor</strong> et tout autre client qui accepte l&apos;URL
          d&apos;un serveur MCP distant.
        </p>
        <p>
          Pour savoir à quoi sert le connecteur et en quoi il diffère du simple fait de coller un
          fichier dans une conversation, consultez la{" "}
          <Link href={localizedPath("/integrations/mcp", "fr")} className="text-accent hover:underline">
            présentation du connecteur MCP
          </Link>
          .
        </p>
        <InfoBox color="blue" icon={<Info size={20} />} title="Activé sur demande">
          Le connecteur est activé par organisation. Si vous ne voyez pas la carte Connecteur
          personnalisé sur la page Intégrations, contactez le support pour qu&apos;il soit activé pour
          votre organisation.
        </InfoBox>
      </DocCard>

      <DocCard icon={<KeyRound size={24} />} title="Avant de commencer">
        <Lead>
          Il vous faut trois choses : une organisation où le connecteur est activé, votre clé API et
          un client MCP. Le connecteur est émis à partir de votre propre clé : il n&apos;atteint donc
          que l&apos;organisation dans laquelle vous vous trouviez lorsque vous l&apos;avez généré, et
          l&apos;assistant agit avec cette clé.
        </Lead>
        <DataTable
          head={["Prérequis", "D'où il vient"]}
          rows={[
            [
              "Carte Connecteur personnalisé",
              <Fragment key="f0">
                Sur la page <strong>Intégrations</strong>, uniquement lorsque le connecteur est activé
                pour votre organisation. Demandez au support si elle n&apos;apparaît pas.
              </Fragment>,
            ],
            [
              "Votre clé API",
              <Fragment key="f1">
                La carte <strong>Clé API</strong> sur la même page : une clé par membre et par
                organisation. Si elle indique{" "}
                <em>Aucune clé API trouvée. Veuillez vous reconnecter.</em>, déconnectez-vous puis
                reconnectez-vous.
              </Fragment>,
            ],
            [
              "Un client MCP",
              <Fragment key="f2">
                claude.ai avec un forfait Pro ou supérieur, Cursor, ou tout client qui accepte
                l&apos;URL d&apos;un serveur MCP distant.
              </Fragment>,
            ],
            [
              "Votre rôle",
              <Fragment key="f3">
                L&apos;assistant utilise votre clé API : il ne peut donc faire que ce que votre clé
                permet. Par exemple, une clé du rôle <strong>HITL uniquement</strong> est refusée par
                les requêtes de traitement. Voir <DocLink href="/docs/user-roles">les rôles
                utilisateur</DocLink> et <DocLink href="/docs/api-integration">la page API</DocLink>.
              </Fragment>,
            ],
          ]}
        />
      </DocCard>

      <DocCard icon={<Settings2 size={24} />} title="Connecter claude.ai">
        <Lead>
          Générez l&apos;URL dans Tavnit, puis collez-la dans claude.ai comme connecteur
          personnalisé. Il n&apos;y a rien à installer ni aucun fichier de configuration à modifier.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f4">
              Ouvrez <strong>Intégrations</strong> dans la barre latérale de Tavnit. Vérifiez
              d&apos;abord le sélecteur d&apos;organisation : le connecteur est lié à
              l&apos;organisation dans laquelle vous vous trouvez.
            </Fragment>,
            <Fragment key="f5">
              Dans la carte <strong>Connecteur personnalisé</strong>, sélectionnez{" "}
              <strong>Générer l&apos;URL du connecteur</strong>.
            </Fragment>,
            <Fragment key="f6">Copiez l&apos;URL avec le bouton de copie.</Fragment>,
            <Fragment key="f7">
              Dans claude.ai, allez dans <strong>Settings → Connectors → Add custom connector</strong>{" "}
              et collez l&apos;URL.
            </Fragment>,
            <Fragment key="f8">
              Ouvrez une nouvelle conversation et demandez à l&apos;assistant quels outils Tavnit il
              possède. S&apos;il les liste, le connecteur est actif.
            </Fragment>,
          ]}
        />
      </DocCard>

      <DocCard icon={<Settings2 size={24} />} title="Connecter Cursor ou un autre client MCP">
        <Lead>
          Tout client qui prend en charge les serveurs MCP distants accepte la même URL. Ajoutez-la
          comme serveur distant (URL), et non comme serveur basé sur une commande : il n&apos;y a aucun
          processus local à lancer, car le connecteur pointe vers un serveur hébergé.
        </Lead>
        <NumberedList
          items={[
            "Générez et copiez l'URL du connecteur depuis la page Intégrations, comme ci-dessus.",
            <Fragment key="f9">
              Dans Cursor, ouvrez les paramètres MCP et ajoutez un nouveau serveur de type{" "}
              <strong>remote</strong> / URL.
            </Fragment>,
            <Fragment key="f10">
              Collez l&apos;URL du connecteur comme URL du serveur. Aucun champ séparé pour la clé API
              n&apos;est nécessaire : l&apos;URL contient déjà l&apos;identifiant.
            </Fragment>,
            "Rechargez le client et vérifiez que Tavnit apparaît dans sa liste d'outils.",
          ]}
        />
        <InfoBox color="blue" icon={<Info size={20} />} title="Une URL, plusieurs clients">
          Vous disposez d&apos;une seule URL de connecteur à la fois, et vous pouvez la coller dans
          plusieurs clients. Ils agissent tous en votre nom dans la même organisation : une
          actualisation les déconnecte donc tous en même temps.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Sparkles size={24} />} title="Ce que votre assistant peut faire">
        <Lead>
          Grâce au connecteur, l&apos;assistant travaille avec les données Tavnit de votre
          organisation en utilisant votre clé API. La création et la configuration des Flows, des
          Cleaners, des Pipelines et de votre équipe restent dans l&apos;application.
        </Lead>
        <p>
          Les outils proposés par le connecteur sont listés par votre client MCP, et le moyen le plus
          rapide de les voir est de demander à l&apos;assistant. Posez vos questions en langage
          courant et nommez le Flow, le Bucket ou le Run dont vous parlez tel qu&apos;il apparaît dans
          l&apos;application.
        </p>
        <InfoBox color="blue" icon={<Info size={20} />} title="Vos données, votre organisation">
          Le connecteur n&apos;atteint que l&apos;organisation dans laquelle il a été généré. Pour
          travailler avec une autre organisation, passez-y dans Tavnit et générez une URL là-bas. Le
          travail lancé depuis l&apos;assistant suit votre configuration comme n&apos;importe quel
          autre Run : si un Flow exige une{" "}
          <DocLink href="/docs/human-in-the-loop">révision humaine</DocLink>, le Run l&apos;attend
          toujours.
        </InfoBox>
      </DocCard>

      <DocCard icon={<RefreshCw size={24} />} title="Expiration et actualisation">
        <Lead>
          Les URL de connecteur ont une durée limitée. La carte Connecteur personnalisé indique quand
          l&apos;URL a été créée et combien de temps il lui reste, et vous avertit pendant ses
          dernières 24 heures. Une actualisation émet une nouvelle URL et invalide immédiatement
          l&apos;ancienne.
        </Lead>
        <DataTable
          head={["État", "Ce que vous voyez", "Que faire"]}
          rows={[
            [
              "Actif",
              <Fragment key="s0">L&apos;URL, <em>créée …</em> et <em>expire dans … j</em>.</Fragment>,
              "Rien.",
            ],
            [
              "Expire bientôt (moins de 24 heures)",
              <Fragment key="f16">
                Le temps restant en heures ou en minutes, et un avis orange :{" "}
                <em>Le connecteur expire bientôt — actualisez-le maintenant pour éviter toute interruption.</em>
              </Fragment>,
              "Actualisez, puis collez la nouvelle URL dans chaque client qui l'utilise.",
            ],
            [
              "Expiré",
              <Fragment key="f17">
                Un avis rouge :{" "}
                <em>Ce connecteur a expiré. Actualisez pour générer une nouvelle URL.</em>
              </Fragment>,
              "Actualisez et collez-la à nouveau. Les clients qui utilisent l'ancienne URL ont déjà cessé de fonctionner.",
            ],
          ]}
        />
        <p>
          Pour actualiser, sélectionnez <strong>Actualiser l&apos;URL</strong> et confirmez avec{" "}
          <strong>Actualiser</strong> dans la boîte de dialogue{" "}
          <em>Actualiser l&apos;URL du connecteur ?</em>.
        </p>
        <WarningBox>
          L&apos;actualisation n&apos;est pas une rotation que vous pouvez préparer par étapes. Dès
          que vous confirmez, l&apos;URL précédente cesse de fonctionner et chaque assistant qui
          l&apos;utilise échoue jusqu&apos;à ce que vous colliez la nouvelle. Actualisez lorsque vous
          pouvez mettre à jour les clients sans attendre.
        </WarningBox>
      </DocCard>

      <DocCard icon={<AlertTriangle size={24} />} title="Traitez l'URL comme un mot de passe">
        <Lead>
          L&apos;URL du connecteur est un identifiant. Quiconque la possède peut atteindre les données
          de votre organisation en votre nom, sans se connecter. Il est sûr de la coller dans les
          paramètres d&apos;un client MCP ; il ne l&apos;est pas de la partager dans un ticket, un
          message de discussion ou une capture d&apos;écran.
        </Lead>
        <BulletList
          items={[
            "Ne la commitez pas dans un dépôt et ne la collez pas dans un document partagé.",
            "Floutez-la ou recadrez-la hors de toute capture d'écran avant de la partager.",
            "Si elle fuite, actualisez-la immédiatement : cela invalide sur-le-champ l'URL exposée.",
            "Régénérer votre clé API est une action distincte sur la même page ; faites-le aussi si vous pensez que la clé elle-même est exposée.",
          ]}
        />
      </DocCard>

      <DocCard icon={<LifeBuoy size={24} />} title="Dépannage">
        <Lead>
          La plupart des problèmes de connecteur relèvent de l&apos;une de ces quatre causes : la
          fonctionnalité n&apos;est pas activée, la session a expiré, l&apos;URL a expiré, ou le
          client conserve une URL qu&apos;une actualisation a remplacée.
        </Lead>
        <DataTable
          head={["Symptôme", "Cause", "Solution"]}
          rows={[
            [
              "Pas de carte Connecteur personnalisé dans Intégrations",
              "Le connecteur n'est pas activé pour votre organisation.",
              "Contactez le support pour le faire activer.",
            ],
            [
              <Fragment key="f18"><InlineCode>Les connecteurs personnalisés nécessitent une session Tavnit valide. Essayez de vous déconnecter puis de vous reconnecter.</InlineCode></Fragment>,
              "Tavnit n'a pas pu valider votre clé pour émettre ou lire l'URL.",
              "Déconnectez-vous puis reconnectez-vous, puis générez à nouveau l'URL.",
            ],
            [
              "L'assistant ne voit plus Tavnit",
              "L'URL a expiré, ou quelqu'un l'a actualisée.",
              "Vérifiez si la carte affiche un avis d'expiration (expiré ou bientôt expiré), actualisez, puis collez à nouveau l'URL dans chaque client.",
            ],
            [
              "L'assistant voit les mauvaises données",
              "L'URL a été générée alors que vous étiez dans une autre organisation.",
              "Changez d'organisation dans Tavnit, générez une nouvelle URL et remplacez l'ancienne.",
            ],
            [
              "L'assistant ne peut pas effectuer une action",
              "Votre rôle ne le permet pas.",
              "Vérifiez votre rôle avant de supposer une défaillance du connecteur.",
            ],
          ]}
        />
      </DocCard>

      <DocCard icon={<MessageSquare size={24} />} title="Quand utiliser le connecteur plutôt que l'API">
        <Lead>
          Utilisez le connecteur pour un travail conversationnel et ponctuel : questions isolées,
          exploration des données stockées, vérifications rapides. Utilisez l&apos;API REST pour tout
          ce qui est planifié, à fort volume ou intégré à un autre système, là où vous avez besoin
          d&apos;une gestion explicite des erreurs et des nouvelles tentatives.
        </Lead>
        <DataTable
          head={["Situation", "Utiliser"]}
          rows={[
            ["Un collègue demande ce qu'un fournisseur a facturé le trimestre dernier", "Connecteur MCP"],
            ["Vous voulez explorer vos données dans une conversation", "Connecteur MCP"],
            ["Chaque facture d'un portail fournisseur, toutes les nuits", "API REST ou un déclencheur e-mail"],
            ["Votre propre produit a besoin des données extraites", "API REST plus webhooks"],
          ]}
        />
      </DocCard>

      <Related
        links={[
          {
            href: "/docs/api-integration",
            label: "Référence de l'API REST de Tavnit",
            description:
              "Chaque endpoint, avec l'authentification par clé API, les champs de requête, les réponses et des exemples en Python et JavaScript.",
          },
          {
            href: "/docs/buckets",
            label: "Stocker les données extraites dans des Buckets",
            description: "Les tableaux structurés dans lesquels vivent vos données extraites.",
          },
          {
            href: "/docs/user-roles",
            label: "Rôles utilisateur et autorisations",
            description: "Ce que peuvent faire Propriétaire, Admin, Membre et HITL uniquement.",
          },
        ]}
      />
    </section>
  );
}
