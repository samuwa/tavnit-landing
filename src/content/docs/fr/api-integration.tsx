"use client";

import { Fragment, useState, useSyncExternalStore } from "react";
import {
  AudioLines,
  Bot,
  Briefcase,
  CircleDot,
  ClipboardCheck,
  Code2,
  Database,
  Download,
  ExternalLink,
  FileOutput,
  FileText,
  FolderInput,
  Info,
  KeyRound,
  Layers,
  ListChecks,
  Lock,
  Paperclip,
  Radar,
  Route,
  Settings2,
  ShieldCheck,
  Split,
  Star,
  Target,
  UserCheck,
  Wand2,
  Webhook,
  Zap,
} from "lucide-react";
import {
  BulletList,
  CodeBlock,
  DataTable,
  DocCard,
  DocLink,
  InfoBox,
  InlineCode,
  NumberedList,
  Related,
  WarningBox,
} from "@/components/docs/ui";
import {
  AGENT_RUN_RESPONSE,
  AGENT_TRIGGER_REQUEST,
  API_ERROR_EXAMPLE,
  API_KEY_RESPONSE,
  BUCKET_READ_REQUEST,
  BUCKET_READ_RESPONSE,
  BUCKET_WRITE_RESPONSE,
  BUCKETS_JSON_EXAMPLE,
  CASE_REQUEST,
  CASE_RESPONSE,
  CLEANERS_JSON_EXAMPLE,
  COLLECTION_PROCESS_RESPONSE,
  COLLECTIONS_JSON_EXAMPLE,
  FILLER_REQUEST,
  HITL_RUN_APPROVE_REQUEST,
  INSPECTOR_PROCESS_REQUEST,
  JAVASCRIPT_BUCKETS_CODE,
  JAVASCRIPT_CLEANERS_CODE,
  JAVASCRIPT_CODE,
  JAVASCRIPT_COLLECTIONS_CODE,
  JAVASCRIPT_RUN_POLL_CODE,
  JAVASCRIPT_SPLITTERS_CODE,
  JSON_BODY_EXAMPLE,
  MATCHER_RUN_REQUEST,
  NET_CATCH_REQUEST,
  PIPELINE_EXECUTE_REQUEST,
  PYTHON_BUCKETS_CODE,
  PYTHON_CLEANERS_CODE,
  PYTHON_CODE,
  PYTHON_COLLECTIONS_CODE,
  PYTHON_RUN_POLL_CODE,
  PYTHON_SPLITTERS_CODE,
  RUN_GET_RESPONSE,
  RUN_PROCESS_RESPONSE,
  SIGNAL_RUN_REQUEST,
  SOURCE_FILE_RESPONSE,
  SPLIT_RUN_RESPONSE,
  SPLITTERS_JSON_EXAMPLE,
  SWEEP_RUN_RESPONSE,
} from "@/components/docs/code-samples";

/**
 * /fr/docs/api-integration — translated from components/docs/ApiIntegrationContent.tsx.
 * A client module (tab and language state), so it exports no `schema`; the
 * English page has none either. Code samples are shared and stay English.
 */

type ApiTab = "code" | "no-code";
type Lang = "python" | "javascript";

/* The app deep-links to the No-Code tab with #no-code. Reading the hash
 * through an external store keeps the server render on "code" (no hydration
 * mismatch) and also follows later hash changes. */
function subscribeHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}
const hashIsNoCode = () => window.location.hash === "#no-code";
const serverHash = () => false;

const H3 = "text-base font-semibold text-fg-2 mt-6 mb-1";

function Endpoint({ method, path }: { method: string; path: string }) {
  return (
    <div className="my-3 flex flex-wrap items-center gap-2 font-mono text-[13px]">
      <span className="rounded bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] px-2 py-0.5 text-[11px] font-bold text-white">
        {method}
      </span>
      <span className="break-all text-fg-2">{path}</span>
    </div>
  );
}

function LangToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="flex gap-1 p-1 bg-tint/[0.04] rounded-lg w-fit my-4 border border-tint/[0.08]">
      {(["python", "javascript"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
            lang === l
              ? "bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white shadow-lg"
              : "text-fg-4 hover:text-fg hover:bg-tint/5"
          }`}
        >
          {l === "python" ? "Python" : "JavaScript"}
        </button>
      ))}
    </div>
  );
}

const FIELD_HEAD = ["Champ", "Obligatoire", "Description"];

export default function ApiIntegrationFr() {
  const hashNoCode = useSyncExternalStore(subscribeHash, hashIsNoCode, serverHash);
  const [chosenTab, setChosenTab] = useState<ApiTab | null>(null);
  const apiTab: ApiTab = chosenTab ?? (hashNoCode ? "no-code" : "code");
  const [lang, setLang] = useState<Lang>("python");

  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        Intégration API
      </h1>

      {/* Sub-tabs */}
      <div className="flex gap-1 p-1 bg-tint/[0.04] rounded-lg w-fit mb-8 border border-tint/[0.08]" role="tablist">
        <button
          role="tab"
          aria-selected={apiTab === "code"}
          onClick={() => setChosenTab("code")}
          className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
            apiTab === "code"
              ? "bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white shadow-lg"
              : "text-fg-4 hover:text-fg hover:bg-tint/5"
          }`}
        >
          Code
        </button>
        <button
          role="tab"
          aria-selected={apiTab === "no-code"}
          onClick={() => setChosenTab("no-code")}
          className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
            apiTab === "no-code"
              ? "bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white shadow-lg"
              : "text-fg-4 hover:text-fg hover:bg-tint/5"
          }`}
        >
          No-Code
        </button>
      </div>

      {/* ── Code tab ── */}
      <div role="tabpanel" aria-label="Code" className={apiTab === "code" ? undefined : "hidden"}>
        <DocCard icon={<Info size={24} />} title="Fonctionnement de l'API">
          <p>
            L&apos;API REST de Tavnit permet à votre propre code de faire ce que vous faites dans
            l&apos;application : envoyer des documents à un Flow, une Collection, un Splitter ou un
            Pipeline, exécuter des Cleaners, Matchers, Inspectors, Fillers, Signals et Agents, lire et
            écrire dans des Buckets, gérer les dossiers d&apos;un Subject, et approuver ou rejeter des
            révisions humaines.
          </p>
          <BulletList
            items={[
              <Fragment key="b0">
                URL de base : <InlineCode>https://run.tavnit.io/api</InlineCode>. Tous les chemins
                ci-dessous sont relatifs à celle-ci.
              </Fragment>,
              <Fragment key="b1">
                Chaque requête transporte votre clé API dans l&apos;en-tête{" "}
                <InlineCode>X-API-Key</InlineCode>.
              </Fragment>,
              <Fragment key="b2">
                Le traitement est asynchrone. Les endpoints qui lancent un travail répondent
                immédiatement <strong>202 Accepted</strong> avec un identifiant, et le travail
                s&apos;exécute en arrière-plan. Vous obtenez le résultat par interrogation périodique
                (Runs, Runs d&apos;Agent, Catches, dossiers) ou sur un{" "}
                <DocLink href="/docs/webhooks">webhook</DocLink> configuré sur la fonctionnalité.
              </Fragment>,
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Fonctionnalités en bêta">
            Les Pipelines, Subjects, Matchers, Inspectors, Fillers, Signals et Nets sont en bêta. Leurs
            endpoints fonctionnent dès aujourd&apos;hui, mais certains détails peuvent encore changer.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Lock size={24} />} title="Authentification et identifiants">
          <h3 className="text-base font-semibold text-fg-2 mt-2 mb-1">Clé API</h3>
          <p>
            Ouvrez <strong>Intégrations</strong> dans la barre latérale de l&apos;application. La
            carte <strong>Clé API</strong> affiche votre clé (vous pouvez l&apos;y afficher et la
            copier). Chaque membre a sa propre clé dans chaque organisation, et une requête agit en
            tant que ce membre dans cette organisation.
          </p>
          <WarningBox>
            Gardez votre clé API secrète. <strong>Régénérer</strong>, sur la même carte, invalide
            immédiatement la clé actuelle, et tout ce qui l&apos;utilise encore cesse de fonctionner.
          </WarningBox>
          <p>Une requête sans clé valide reçoit :</p>
          <CodeBlock
            lang="401"
            code={`{
  "success": false,
  "error": "Authentication required",
  "message": "Please provide a valid X-API-Key header"
}`}
          />

          <h3 className={H3}>Rôles</h3>
          <p>
            La clé porte votre rôle. Les membres ayant le rôle <strong>HITL uniquement</strong> ne
            peuvent utiliser que les endpoints d&apos;approbation et de rejet des révisions humaines et
            les endpoints de clé API. Tous les endpoints de traitement et de données les refusent avec{" "}
            <strong>403</strong> et <InlineCode>Your role only permits HITL reviews</InlineCode>. Voir{" "}
            <DocLink href="/docs/user-roles">les rôles utilisateur</DocLink>.
          </p>

          <h3 className={H3}>Identifiants</h3>
          <p>
            Chaque Flow, Collection, Splitter, Cleaner, Bucket, Agent, Matcher, Inspector, Filler et
            Pipeline affiche son identifiant sur sa page de détail, avec un bouton de copie. Les
            ressources doivent appartenir à l&apos;organisation de votre clé : l&apos;identifiant
            d&apos;une autre organisation renvoie 403 ou 404.
          </p>
        </DocCard>

        <DocCard icon={<Download size={24} />} title="Envoyer des fichiers">
          <p>Les endpoints qui reçoivent un document l&apos;acceptent de l&apos;une de ces deux façons :</p>
          <InfoBox color="purple" icon={<Paperclip size={20} />} title="Envoi de fichier multipart">
            Envoyez le fichier en multipart/form-data dans un champ nommé file, avec les autres champs
            comme champs de formulaire. Fonctionne sur tous les endpoints de fichier.
          </InfoBox>
          <InfoBox color="violet" icon={<Code2 size={20} />} title="Base64 dans un corps JSON">
            Envoyez du JSON avec file_base64 (le contenu du fichier) et filename (avec son extension),
            plus les autres champs. Pratique lorsqu&apos;un outil d&apos;automatisation vous fournit du
            base64 au lieu d&apos;un fichier.
          </InfoBox>
          <DataTable
            head={["Endpoint", "Base64", "Fichiers acceptés"]}
            rows={[
              ["POST /runs/process", "Oui", "PDF, images (PNG, JPG, JPEG, JFIF, TIF, TIFF, WEBP, BMP, GIF), feuilles de calcul (XLSX, XLS, CSV)"],
              ["POST /collections/process", "Oui", "Comme pour les Runs"],
              ["POST /splits/run", "Oui", "Comme pour les Runs"],
              ["POST /pipelines/{id}/execute", "Oui", "PDF et images"],
              ["POST /signals/{id}/run", "Oui", "Audio : MP3, MP4, MPEG, MPGA, M4A, WAV, WEBM"],
              ["POST /sweeps/run", "Non", "Feuilles de calcul : CSV, XLSX, XLS"],
              ["Inspectors, Fillers, Subjects et dossiers", "Non", "Le document en tant que fichier multipart"],
            ]}
          />
          <p>Une requête peut atteindre 150 Mo. Le type de fichier est déduit de l&apos;extension du nom de fichier.</p>
        </DocCard>

        <DocCard icon={<ListChecks size={24} />} title="Réponses et erreurs">
          <p>
            Les réponses sont en JSON avec un indicateur <InlineCode>success</InlineCode>. Les erreurs
            contiennent une chaîne <InlineCode>error</InlineCode>, parfois un{" "}
            <InlineCode>message</InlineCode>, et des clés supplémentaires qui expliquent le problème :
          </p>
          <CodeBlock lang="Exemple 409" code={API_ERROR_EXAMPLE} />
          <DataTable
            head={["Statut", "Signification"]}
            rows={[
              ["200 / 201", "Terminé (lectures, annulations, approbations) / créé (dossiers, fills, inspections)."],
              ["202", "Accepté : le travail est en file d'attente. Conservez l'identifiant renvoyé."],
              ["400", "Un champ obligatoire est manquant ou invalide, le type de fichier n'est pas pris en charge, ou la ressource est inactive ou non configurée."],
              ["401", "X-API-Key manquant ou invalide."],
              ["402", "Votre organisation ne peut pas lancer de nouveau travail pour le moment ; contactez l'équipe Tavnit."],
              ["403", "La ressource appartient à une autre organisation, votre rôle est HITL uniquement, ou vous n'êtes pas réviseur de cet élément."],
              ["404", "L'identifiant n'existe pas dans votre organisation."],
              ["409", "Conflit avec l'état actuel : nom de Bucket qui ne correspond pas, déjà annulé ou terminé, dossier clôturé, emplacement déjà rempli."],
              ["429", "Trop de Runs attendent déjà un Agent."],
              ["500", "Erreur inattendue. Vous pouvez réessayer plus tard sans risque."],
            ]}
          />
        </DocCard>

        <DocCard icon={<Layers size={24} />} title="Référence des endpoints">
          <DataTable
            head={["Fonctionnalité", "Méthode et chemin", "Ce qu'il fait"]}
            rows={[
              ["Flows", "POST /runs/process", "Extraire un document avec un Flow"],
              ["Flows", "GET /runs/{run_id}", "Statut du Run et données extraites"],
              ["Flows", "GET /runs/{run_id}/source-file", "Le document original"],
              ["Collections", "POST /collections/process", "L'IA achemine un document vers le bon Flow ou Splitter"],
              ["Collections", "GET /collection-runs/{id}/source-file", "Le document original"],
              ["Splitters", "POST /splits/run", "Découper un fichier multi-documents"],
              ["Splitters", "GET /splits/{split_id}/source-file", "Le lot original"],
              ["Cleaners", "POST /sweeps/run", "Passer un Cleaner sur une feuille de calcul"],
              ["Cleaners", "POST /cleaners/{cleaner_id}/process", "Passer un Cleaner sur des lignes envoyées en JSON"],
              ["Buckets", "POST /buckets/write", "Ajouter ou remplacer des lignes"],
              ["Buckets", "GET /buckets/read", "Lire des lignes, avec pagination"],
              ["Agents", "POST /bots/{agent_id}/runs", "Lancer un Run d'Agent"],
              ["Agents", "GET /bot-runs/{bot_run_id}", "Interroger un Run d'Agent"],
              ["Agents", "GET /bots/{agent_id}/runs", "Lister les Runs d'un Agent"],
              ["Agents", "POST /bot-runs/{bot_run_id}/cancel", "Annuler un Run d'Agent"],
              ["Matchers", "POST /matchers/{matcher_id}/run", "Rapprocher des Runs terminés"],
              ["Inspectors", "POST /inspectors/{inspector_id}/process", "Ajouter un document à une inspection"],
              ["Fillers", "POST /fillers/{filler_id}/fills", "Ouvrir un fill et ajouter des documents"],
              ["Pipelines", "POST /pipelines/{pipeline_id}/execute", "Exécuter un Pipeline"],
              ["Signals", "POST /signals/{signal_id}/run", "Structurer un fichier audio (une Wave)"],
              ["Subjects", "POST /subjects/{subject_id}/process", "Acheminer un document vers un dossier"],
              ["Nets", "POST /nets/{net_id}/catch", "Lancer un Catch"],
              ["Révision humaine", "POST /runs/{run_id}/hitl/approve", "Approuver ou rejeter des éléments en pause"],
              ["Clé API", "GET /me/api-key", "Lire ou régénérer votre clé"],
            ]}
          />
          <p>Chaque fonctionnalité est détaillée ci-dessous, avec ses autres endpoints.</p>
        </DocCard>

        {/* ── Flows ── */}
        <DocCard icon={<FileText size={24} />} title="Flows : traiter un document">
          <p>Envoyez un document à un Flow. Tavnit crée un Run et l&apos;extrait en arrière-plan.</p>
          <Endpoint method="POST" path="/runs/process" />
          <DataTable
            head={FIELD_HEAD}
            rows={[
              ["flow_id", "Oui", "Le Flow qui extrait le document."],
              ["file", "Oui*", "Le document (multipart)."],
              ["file_base64 + filename", "Oui*", "À la place de file : le contenu en base64 et le nom du fichier avec son extension."],
              ["content_type", "Non", "Type MIME d'un fichier en base64."],
              ["source", "Non", "Libellé enregistré sur le Run : api (par défaut), email, manual_upload ou collection."],
            ]}
            caption="* Envoyez soit file, soit file_base64 + filename."
          />
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python" code={PYTHON_CODE} />
          ) : (
            <CodeBlock lang="JavaScript" code={JAVASCRIPT_CODE} />
          )}
          <CodeBlock lang="Réponse 202" code={RUN_PROCESS_RESPONSE} />
          <p>
            Erreurs : 400 (pas de fichier, pas de flow_id, fichier non pris en charge ou invalide), 403
            (Flow d&apos;une autre organisation), 404 (Flow introuvable). Une requête rejetée crée tout
            de même un Run en échec lorsque c&apos;est possible, et renvoie son{" "}
            <InlineCode>run_id</InlineCode> pour que vous puissiez le retrouver dans{" "}
            <strong>Runs</strong>.
          </p>

          <h3 className={H3}>Obtenir le Run et ses données</h3>
          <Endpoint method="GET" path="/runs/{run_id}" />
          <p>
            Interrogez jusqu&apos;à ce que <InlineCode>status</InlineCode> soit terminal. Statuts :{" "}
            <InlineCode>queued</InlineCode>, <InlineCode>running</InlineCode>,{" "}
            <InlineCode>awaiting_approval</InlineCode> (en pause pour une{" "}
            <DocLink href="/docs/human-in-the-loop">révision humaine</DocLink>),{" "}
            <InlineCode>completed</InlineCode>, <InlineCode>failed</InlineCode> et{" "}
            <InlineCode>cancelled</InlineCode>. <InlineCode>data</InlineCode> contient les lignes
            extraites et reste <InlineCode>null</InlineCode> tant que le Run n&apos;est pas terminé, y
            compris pendant qu&apos;il attend une approbation. Lorsque <InlineCode>columns</InlineCode>{" "}
            est renseigné, utilisez-le pour l&apos;ordre des colonnes. <InlineCode>attempt</InlineCode>{" "}
            et <InlineCode>previous_attempts</InlineCode> indiquent les nouvelles tentatives
            automatiques. Ajoutez <InlineCode>?include_document=true</InlineCode> pour obtenir aussi un
            lien signé vers le fichier original. Cela fonctionne pour tous les Runs, y compris ceux
            créés par des Collections, des Splitters, des Pipelines et par e-mail.
          </p>
          <CodeBlock lang="Réponse 200" code={RUN_GET_RESPONSE} />
          {lang === "python" ? (
            <CodeBlock lang="Python (envoyer et interroger)" code={PYTHON_RUN_POLL_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (envoyer et interroger)" code={JAVASCRIPT_RUN_POLL_CODE} />
          )}

          <h3 className={H3}>Obtenir le document original</h3>
          <Endpoint method="GET" path="/runs/{run_id}/source-file" />
          <p>
            Renvoie une URL signée vers le fichier tel qu&apos;il a été envoyé, quel que soit le statut
            du Run. Le paramètre facultatif <InlineCode>expires_in</InlineCode> définit la durée de vie
            du lien en secondes (de 60 à 604800, 7 jours par défaut). Avec{" "}
            <InlineCode>?download=true</InlineCode>, la réponse est le fichier lui-même.
          </p>
          <CodeBlock lang="Réponse 200" code={SOURCE_FILE_RESPONSE} />
        </DocCard>

        {/* ── Collections ── */}
        <DocCard icon={<FolderInput size={24} />} title="Collections : laisser l'IA acheminer le document">
          <p>
            Envoyez un document sans choisir le Flow : l&apos;IA choisit le meilleur Flow ou Splitter de
            la Collection. Utilisez-la lorsque vous recevez des types de documents variés.
          </p>
          <Endpoint method="POST" path="/collections/process" />
          <p>
            Même corps que <InlineCode>/runs/process</InlineCode>, avec{" "}
            <InlineCode>collection_id</InlineCode> au lieu de <InlineCode>flow_id</InlineCode> (ou
            placez l&apos;identifiant dans le chemin :{" "}
            <InlineCode>{"/collections/{collection_id}/process"}</InlineCode>). La Collection doit être
            active et avoir au moins un Flow ou un Splitter actif ; sinon, l&apos;appel répond 400.
          </p>
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python (Collections)" code={PYTHON_COLLECTIONS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Collections)" code={JAVASCRIPT_COLLECTIONS_CODE} />
          )}
          <CodeBlock lang="Réponse 202" code={COLLECTION_PROCESS_RESPONSE} />
          <p>
            Le Flow choisi crée un Run normal, et le payload de son webhook inclut{" "}
            <InlineCode>collection_run_id</InlineCode> pour que vous puissiez relier le résultat à
            votre requête. L&apos;original est disponible immédiatement sur{" "}
            <InlineCode>{"GET /collection-runs/{collection_run_id}/source-file"}</InlineCode> (mêmes
            options que pour le fichier source d&apos;un Run). Voir{" "}
            <DocLink href="/docs/collections">Collections</DocLink>.
          </p>
        </DocCard>

        {/* ── Splitters ── */}
        <DocCard icon={<Split size={24} />} title="Splitters : découper un fichier multi-documents">
          <p>
            Envoyez un fichier qui contient plusieurs documents. Le Splitter repère où chacun commence
            et se termine, le classe, et envoie chaque partie là où son type de document l&apos;indique.
          </p>
          <Endpoint method="POST" path="/splits/run" />
          <p>
            Même corps que <InlineCode>/runs/process</InlineCode>, avec{" "}
            <InlineCode>splitter_id</InlineCode>.
          </p>
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python (Splitters)" code={PYTHON_SPLITTERS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Splitters)" code={JAVASCRIPT_SPLITTERS_CODE} />
          )}
          <CodeBlock lang="Réponse 202" code={SPLIT_RUN_RESPONSE} />
          <p>
            Les parties envoyées à des Flows deviennent des Runs à part entière, et leurs webhooks
            transportent <InlineCode>split_id</InlineCode>. Le lot original se trouve sur{" "}
            <InlineCode>{"GET /splits/{split_id}/source-file"}</InlineCode>. Voir{" "}
            <DocLink href="/docs/splitters">Splitters</DocLink>.
          </p>
        </DocCard>

        {/* ── Cleaners ── */}
        <DocCard icon={<Wand2 size={24} />} title="Cleaners : lancer un sweep">
          <p>
            Un sweep passe un Cleaner sur des lignes de données pour normaliser, classer, rechercher ou
            enrichir des valeurs. Envoyez les lignes sous forme de feuille de calcul ou de JSON.
          </p>
          <Endpoint method="POST" path="/sweeps/run" />
          <DataTable
            head={FIELD_HEAD}
            rows={[
              ["cleaner_id", "Oui", "Le Cleaner à exécuter."],
              ["file", "Oui", "CSV, XLSX ou XLS, en multipart uniquement. En-têtes sur la première ligne ; chaque champ de base requis par le Cleaner doit être une colonne, sans doublons."],
              ["sheet_name", "Non", "La feuille du classeur à lire (par défaut : la première)."],
            ]}
          />
          <Endpoint method="POST" path="/cleaners/{cleaner_id}/process" />
          <p>
            Envoyez du JSON avec <InlineCode>rows</InlineCode> (un tableau d&apos;objets), ou un{" "}
            <InlineCode>file</InlineCode> multipart comme ci-dessus.
          </p>
          <CodeBlock lang="Corps JSON" code={CLEANERS_JSON_EXAMPLE} />
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python (Cleaners)" code={PYTHON_CLEANERS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Cleaners)" code={JAVASCRIPT_CLEANERS_CODE} />
          )}
          <CodeBlock lang="Réponse 202" code={SWEEP_RUN_RESPONSE} />
          <p>
            Un Cleaner dont la configuration est invalide répond 400 avec{" "}
            <InlineCode>validation_errors</InlineCode>. Voir{" "}
            <DocLink href="/docs/cleaners">Cleaners</DocLink>.
          </p>
        </DocCard>

        {/* ── Buckets ── */}
        <DocCard icon={<Database size={24} />} title="Buckets : écrire et lire des lignes">
          <p>
            Poussez des lignes dans un Bucket depuis vos propres systèmes, ou lisez ce que vos Flows y
            ont stocké. Trouvez l&apos;identifiant et le nom du Bucket en touchant l&apos;icône
            d&apos;information sur la page du Bucket. Le nom sert de contrôle de sécurité : s&apos;il ne
            correspond pas à l&apos;identifiant, l&apos;appel répond <strong>409</strong>.
          </p>
          <Endpoint method="POST" path="/buckets/write" />
          <DataTable
            head={FIELD_HEAD}
            rows={[
              ["bucket_id", "Oui", "Le Bucket."],
              ["bucket_name", "Oui", "Son nom exact."],
              ["overwrite", "Oui", "Booléen. false ajoute les lignes ; true remplace toutes les lignes existantes."],
              ["rows", "Oui", "Tableau d'objets, jusqu'à 50 000 par requête."],
            ]}
          />
          <p>
            Envoyez le corps en <InlineCode>application/json</InlineCode>. Chaque ligne doit contenir
            exactement les colonnes du Bucket, par nom de colonne ou par nom d&apos;affichage : une
            colonne manquante ou inconnue annule toute l&apos;écriture avec une erreur 400, qui liste{" "}
            <InlineCode>missing_columns</InlineCode> et <InlineCode>extra_columns</InlineCode>.
          </p>
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python (Buckets)" code={PYTHON_BUCKETS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Buckets)" code={JAVASCRIPT_BUCKETS_CODE} />
          )}
          <CodeBlock lang="Réponse 202" code={BUCKET_WRITE_RESPONSE} />

          <h3 className={H3}>Lire des lignes</h3>
          <Endpoint method="GET" path="/buckets/read" />
          <p>
            Paramètres de requête : <InlineCode>bucket_id</InlineCode> et{" "}
            <InlineCode>bucket_name</InlineCode> (obligatoires), <InlineCode>limit</InlineCode> (de 1 à
            1000, 100 par défaut) et <InlineCode>offset</InlineCode> (0 par défaut). Parcourez les pages
            avec <InlineCode>offset</InlineCode> tant que <InlineCode>has_more</InlineCode> vaut true ;{" "}
            <InlineCode>total_count</InlineCode> compte toutes les lignes. Les clés de{" "}
            <InlineCode>data</InlineCode> de chaque ligne sont les noms de colonnes ; utilisez{" "}
            <InlineCode>columns</InlineCode> pour les noms d&apos;affichage. Les liens de fichiers
            stockés sont renvoyés sous forme de nouvelles URL signées.
          </p>
          <CodeBlock lang="Requête" code={BUCKET_READ_REQUEST} />
          <CodeBlock lang="Réponse 200" code={BUCKET_READ_RESPONSE} />
          <p>
            Voir <DocLink href="/docs/buckets">Buckets</DocLink>.
          </p>
        </DocCard>

        {/* ── Agents ── */}
        <DocCard icon={<Bot size={24} />} title="Agents : déclencher et interroger des Runs">
          <p>
            Lancez un Agent depuis votre code et récupérez ce qu&apos;il a capturé. Les Agents sont
            activés par organisation, sur demande : contactez le support pour les activer.
          </p>
          <Endpoint method="POST" path="/bots/{agent_id}/runs" />
          <p>
            Le JSON facultatif <InlineCode>{'{"inputs": {...}}'}</InlineCode> remplace les variables
            d&apos;entrée de l&apos;Agent pour ce Run. Seules les variables déclarées par l&apos;Agent
            sont utilisées, et les valeurs secrètes ne sont jamais acceptées. Vous pouvez aussi appeler{" "}
            <InlineCode>POST /bots/runs</InlineCode> avec <InlineCode>bot_id</InlineCode> dans le
            corps. Chaque appel lance un nouveau Run.
          </p>
          <CodeBlock lang="Requête" code={AGENT_TRIGGER_REQUEST} />
          <p>
            <InlineCode>status</InlineCode> vaut <InlineCode>queued</InlineCode>, ou{" "}
            <InlineCode>waiting</InlineCode> lorsque l&apos;Agent exécute un Run à la fois et est
            occupé (il démarre de lui-même quand son tour arrive). 409 lorsque l&apos;Agent est archivé,
            429 lorsque trop de Runs attendent déjà.
          </p>

          <h3 className={H3}>Interroger, lister et annuler</h3>
          <DataTable
            head={["Endpoint", "Ce qu'il fait"]}
            rows={[
              ["GET /bot-runs/{bot_run_id}", "Un Run : statut, durées, entrées (secrets retirés) et sortie avec des liens de fichiers signés. Aussi disponible sur GET /bots/{agent_id}/runs/{bot_run_id}."],
              ["GET /bots/{agent_id}/runs", "Du plus récent au plus ancien, sans entrées ni sortie. Paramètres : status (queued, running, completed, failed, cancelled), limit (de 1 à 100, 20 par défaut), offset. Renvoie runs et total."],
              ["POST /bot-runs/{bot_run_id}/cancel", "Annule un Run en attente (waiting), en file d'attente ou en cours. 409 lorsque le Run est déjà terminé. Aussi disponible sur POST /bots/{agent_id}/runs/{bot_run_id}/cancel."],
            ]}
          />
          <CodeBlock lang="GET /bot-runs/{bot_run_id}" code={AGENT_RUN_RESPONSE} />
          <p>
            Voir <DocLink href="/docs/agents">Agents</DocLink>.
          </p>
        </DocCard>

        {/* ── Matchers ── */}
        <DocCard icon={<Target size={24} />} title="Matchers : rapprocher des Runs">
          <p>
            Comparez des Runs terminés du Flow du Matcher, par exemple des factures avec des bons de
            commande.
          </p>
          <Endpoint method="POST" path="/matchers/{matcher_id}/run" />
          <DataTable
            head={FIELD_HEAD}
            rows={[
              ["run_ids", "Oui", "Deux Runs terminés ou plus du Flow du Matcher."],
              ["benchmark_run_id", "En mode benchmark", "Le Run auquel les autres sont comparés."],
            ]}
          />
          <CodeBlock lang="Requête" code={MATCHER_RUN_REQUEST} />
          <p>
            Il n&apos;existe pas d&apos;endpoint d&apos;API pour lire un rapprochement : récupérez le
            résultat sur le webhook ou la sortie e-mail du Matcher, ou dans l&apos;application. Voir{" "}
            <DocLink href="/docs/matchers">Matchers</DocLink>.
          </p>
        </DocCard>

        {/* ── Inspectors ── */}
        <DocCard icon={<ShieldCheck size={24} />} title="Inspectors : contrôler un ensemble de documents">
          <p>
            Une inspection rassemble des documents, achemine chacun vers un emplacement de
            l&apos;Inspector, l&apos;extrait et évalue la checklist.
          </p>
          <Endpoint method="POST" path="/inspectors/{inspector_id}/process" />
          <p>
            <InlineCode>file</InlineCode> en multipart. Sans <InlineCode>inspection_id</InlineCode>,
            une nouvelle inspection est créée ; transmettez l&apos;<InlineCode>inspection_id</InlineCode>{" "}
            renvoyé pour y ajouter d&apos;autres documents (elle doit encore être en cours de collecte,
            sinon 409). L&apos;Inspector doit être actif.
          </p>
          <CodeBlock lang="Requête" code={INSPECTOR_PROCESS_REQUEST} />
          <DataTable
            head={["Endpoint", "Ce qu'il fait"]}
            rows={[
              ["POST /inspectors/{inspector_id}/inspections", "Crée une inspection vide (201) à laquelle ajouter des documents plus tard."],
              ["POST /inspections/{inspection_id}/fire", "Arrête la collecte et évalue immédiatement. 400 avec missing_inputs lorsqu'un emplacement obligatoire n'a pas de document."],
            ]}
          />
          <p>
            Le résultat arrive sur le webhook ou la sortie e-mail de l&apos;Inspector. Voir{" "}
            <DocLink href="/docs/inspectors">Inspectors</DocLink>.
          </p>
        </DocCard>

        {/* ── Fillers ── */}
        <DocCard icon={<FileOutput size={24} />} title="Fillers : remplir des formulaires PDF">
          <p>
            Un fill rassemble les documents dont un Filler a besoin, les extrait et écrit les valeurs
            dans les modèles PDF du Filler.
          </p>
          <DataTable
            head={["Endpoint", "Ce qu'il fait"]}
            rows={[
              ["POST /fillers/{filler_id}/fills", "Ouvre un fill (201, renvoie fill_id). Le Filler a besoin d'un modèle et de correspondances de champs."],
              ["POST /fills/{fill_id}/route-upload", "Fichier multipart ; l'IA l'achemine vers un emplacement libre (202)."],
              ["POST /fills/{fill_id}/inputs/{input_id}/upload", "Fichier multipart pour un emplacement précis ; lance le Run de cet emplacement (202)."],
              ["POST /fills/{fill_id}/inputs/{input_id}/attach-run", "run_id en JSON : réutilise un Run terminé pour un emplacement (202)."],
              ["POST /fills/{fill_id}/fire", "Remplit immédiatement au lieu d'attendre chaque emplacement. 400 avec missing_inputs lorsqu'un emplacement obligatoire est vide."],
              ["POST /fillers/{filler_id}/templates", "Ajoute un modèle PDF (fichier multipart, name facultatif). Associez ses champs dans l'application."],
            ]}
          />
          <CodeBlock lang="Requête" code={FILLER_REQUEST} />
          <p>
            Les PDF remplis arrivent sur le webhook ou la sortie e-mail du Filler. Voir{" "}
            <DocLink href="/docs/fillers">Fillers</DocLink>.
          </p>
        </DocCard>

        {/* ── Pipelines ── */}
        <DocCard icon={<Route size={24} />} title="Pipelines : exécuter">
          <p>Lancez une exécution d&apos;un Pipeline avec un document.</p>
          <Endpoint method="POST" path="/pipelines/{pipeline_id}/execute" />
          <p>
            <InlineCode>file</InlineCode> en multipart ou <InlineCode>file_base64</InlineCode> +{" "}
            <InlineCode>filename</InlineCode> ; PDF ou image. 400 lorsque le Pipeline est inactif ou que
            son graphe ne peut pas s&apos;exécuter (avec <InlineCode>validation_errors</InlineCode>).
          </p>
          <CodeBlock lang="Requête" code={PIPELINE_EXECUTE_REQUEST} />
          <p>
            Annulez avec <InlineCode>{"POST /pipelines/executions/{execution_id}/cancel"}</InlineCode>{" "}
            (409 lorsqu&apos;elle n&apos;est pas en cours). Les résultats sortent par les nœuds de
            sortie du Pipeline. Voir <DocLink href="/docs/pipelines">Pipelines</DocLink>.
          </p>
        </DocCard>

        {/* ── Signals ── */}
        <DocCard icon={<AudioLines size={24} />} title="Signals : structurer un fichier audio">
          <p>Envoyez un enregistrement et le Signal le transforme en données structurées (une Wave).</p>
          <Endpoint method="POST" path="/signals/{signal_id}/run" />
          <p>
            <InlineCode>file</InlineCode> en multipart ou base64. Audio jusqu&apos;à 150 Mo et 8
            heures, avec au plus 2 heures de parole détectée.
          </p>
          <CodeBlock lang="Requête" code={SIGNAL_RUN_REQUEST} />
          <p>
            Le résultat arrive sur le webhook du Signal ou dans l&apos;application. Voir{" "}
            <DocLink href="/docs/signals">Signals</DocLink>.
          </p>
        </DocCard>

        {/* ── Subjects ── */}
        <DocCard icon={<Briefcase size={24} />} title="Subjects et dossiers">
          <p>Classez des documents dans les dossiers d&apos;un Subject, et gérez les dossiers depuis votre code.</p>
          <DataTable
            head={["Endpoint", "Ce qu'il fait"]}
            rows={[
              ["POST /subjects/{subject_id}/process", "Fichier multipart ; Tavnit l'achemine vers un dossier (202, renvoie subject_doc_id)."],
              ["POST /cases/{case_id}/docs", "Fichier multipart directement dans un dossier, sans acheminement. doc_type_id est obligatoire, sauf si le Subject n'a qu'un seul type de document. Renvoie le run_id (202). 409 lorsque le dossier est clôturé ou que ce type de document est déjà rempli."],
              ["POST /subjects/{subject_id}/docs/{doc_id}/assign", "case_id et doc_type_id en JSON : classe à la main un document en attente (202)."],
              ["POST /subjects/{subject_id}/cases", "name (obligatoire, unique, jusqu'à 200 caractères) et params (objet facultatif) en JSON. Crée un dossier (201). 409 lorsque le nom existe déjà."],
              ["GET /subjects/{subject_id}/cases", "Paramètres : state (open ou closed), status, search, limit (jusqu'à 200, 50 par défaut), offset. Renvoie cases et total."],
              ["GET /cases/{case_id}", "Le dossier et ses documents, chacun avec le run_id à interroger sur GET /runs/{run_id}."],
              ["POST /cases/{case_id}/close", "Clôture le dossier (200). Les nouveaux documents qui le concernent sont mis en attente au lieu d'être classés. 409 lorsqu'il est déjà clôturé."],
              ["POST /cases/{case_id}/reopen", "Le rouvre (200). 409 lorsqu'il est ouvert."],
              ["POST /cases/{case_id}/inspections", "subject_inspector_id en JSON : exécute un Inspector lié sur les Runs terminés du dossier (202)."],
            ]}
          />
          <CodeBlock lang="Requête" code={CASE_REQUEST} />
          <CodeBlock lang="Réponse 201" code={CASE_RESPONSE} />
          <p>
            Voir <DocLink href="/docs/subjects">Subjects</DocLink>.
          </p>
        </DocCard>

        {/* ── Nets ── */}
        <DocCard icon={<Radar size={24} />} title="Nets : lancer un Catch">
          <p>Les Nets sont activés par organisation. Sans accès, ces endpoints répondent 403.</p>
          <Endpoint method="POST" path="/nets/{net_id}/catch" />
          <p>
            Sans corps, le Catch reprend là où le précédent s&apos;est arrêté. Envoyez{" "}
            <InlineCode>window_start</InlineCode> et/ou <InlineCode>window_end</InlineCode> (horodatages
            ISO) pour rattraper une plage à la place. 409 lorsque le Net est inactif ou qu&apos;un Catch
            qui reprend depuis le précédent est déjà en cours.
          </p>
          <CodeBlock lang="Requête" code={NET_CATCH_REQUEST} />
          <p>
            Interrogez <InlineCode>{"GET /catches/{catch_id}"}</InlineCode> : statut, étape, compteurs
            et, une fois terminé, <InlineCode>output</InlineCode> avec les colonnes et les lignes.
            Annulez avec <InlineCode>{"POST /catches/{catch_id}/cancel"}</InlineCode>. Voir{" "}
            <DocLink href="/docs/nets">Nets</DocLink>.
          </p>
        </DocCard>

        {/* ── HITL ── */}
        <DocCard icon={<UserCheck size={24} />} title="Révision humaine : approuver ou rejeter">
          <p>
            Les éléments mis en pause pour révision peuvent être approuvés ou rejetés depuis vos propres
            outils. Seul un réviseur configuré de ce Flow, Matcher, Inspector ou Filler peut agir (403
            sinon), et l&apos;élément doit être <InlineCode>awaiting_approval</InlineCode> (409 sinon).
            Ces endpoints sont ouverts au rôle HITL uniquement.
          </p>
          <DataTable
            head={["Endpoint", "Corps"]}
            rows={[
              ["POST /runs/{run_id}/hitl/approve", "output_json (obligatoire) : les lignes finales ; diff (liste facultative de modifications). 400 avec missing_fields lorsqu'un champ de saisie humaine obligatoire est vide."],
              ["POST /matches/{match_id}/hitl/approve", "groups (le regroupement final), excluded, diff."],
              ["POST /inspections/{inspection_id}/hitl/approve", "waivers (item_id et reason pour chaque élément en échec à exempter), diff."],
              ["POST /fills/{fill_id}/hitl/approve", "values (valeurs des champs par modèle), diff, allow_missing_human_fields."],
              [".../hitl/reject", "Les mêmes chemins se terminant par /hitl/reject, avec une raison (reason) facultative."],
            ]}
          />
          <CodeBlock lang="Requête" code={HITL_RUN_APPROVE_REQUEST} />
          <p>
            L&apos;approbation reprend la livraison (webhook, e-mail, Bucket). Le rejet d&apos;un Run
            l&apos;annule. Voir <DocLink href="/docs/human-in-the-loop">Révision humaine</DocLink>.
          </p>
        </DocCard>

        {/* ── API key ── */}
        <DocCard icon={<KeyRound size={24} />} title="Endpoints de clé API">
          <DataTable
            head={["Endpoint", "Ce qu'il fait"]}
            rows={[
              ["GET /me/api-key", "Renvoie votre clé pour l'organisation."],
              ["POST /me/api-key/regenerate", "Émet une nouvelle clé et invalide immédiatement l'ancienne. Mettez à jour chaque intégration."],
            ]}
          />
          <CodeBlock lang="Réponse 200" code={API_KEY_RESPONSE} />
        </DocCard>
      </div>

      {/* ── No-Code tab ── */}
      <div role="tabpanel" aria-label="No-Code" className={apiTab === "no-code" ? undefined : "hidden"}>
        <DocCard icon={<Star size={24} />} title="Aperçu des outils d'automatisation">
          <p>
            Vous n&apos;avez pas besoin d&apos;écrire de code pour connecter Tavnit à vos workflows.
            Toute plateforme d&apos;automatisation capable d&apos;envoyer une requête HTTP peut lancer
            un travail dans Tavnit, et toute plateforme capable de recevoir un webhook peut en récupérer
            les résultats.
          </p>
          <InfoBox color="purple" icon={<CircleDot size={20} />} title="Make">
            Scénarios visuels : un module HTTP appelle Tavnit et un Custom webhook reçoit les
            résultats.
          </InfoBox>
          <InfoBox color="yellow" icon={<Zap size={20} />} title="Zapier">
            Webhooks by Zapier : Catch Hook reçoit les résultats et une action POST lance les Runs.
          </InfoBox>
          <InfoBox color="green" icon={<CircleDot size={20} />} title="n8n">
            Auto-hébergé ou dans le cloud : un nœud Webhook reçoit les résultats et un nœud HTTP
            Request lance les Runs.
          </InfoBox>
          <InfoBox color="blue" icon={<CircleDot size={20} />} title="Power Automate">
            Une action HTTP appelle l&apos;API de la même manière.
          </InfoBox>
          <p>
            Chaque requête a besoin de l&apos;en-tête <InlineCode>X-API-Key</InlineCode> avec votre clé,
            disponible dans <strong>Intégrations</strong>.
          </p>
        </DocCard>

        <DocCard icon={<Webhook size={24} />} title="Recevoir les résultats dans votre automatisation">
          <NumberedList
            items={[
              "Sur votre plateforme, créez un déclencheur webhook (Make : Custom webhook ; Zapier : Webhooks by Zapier → Catch Hook ; n8n : nœud Webhook, POST) et copiez son URL.",
              "Dans Tavnit, collez-la comme webhook d'un Flow (panneau Webhook) ou d'un nœud de sortie de Pipeline.",
              "Traitez un document pour que la plateforme apprenne la structure du payload, puis associez les champs à Sheets, un CRM, un ERP, etc.",
            ]}
          />
          <p>
            Le payload est décrit sur la <DocLink href="/docs/webhooks">page des webhooks</DocLink>.
          </p>
        </DocCard>

        <DocCard icon={<CircleDot size={24} />} title="Intégration Make">
          <p>
            Make (anciennement Integromat) est une plateforme d&apos;automatisation visuelle qui vous
            permet de connecter des applications et d&apos;automatiser des workflows sans écrire de
            code.
          </p>
          <a
            href="https://www.make.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-2 transition-colors text-sm font-medium mt-1"
          >
            Visiter Make <ExternalLink size={14} />
          </a>
        </DocCard>

        <DocCard icon={<Layers size={24} />} title="Premiers pas avec Make">
          <NumberedList
            items={[
              "Rendez-vous sur make.com et créez un compte",
              "Cliquez sur « Create a new scenario » depuis votre tableau de bord",
              "Une zone de travail vierge s'affiche, dans laquelle vous pouvez ajouter des modules",
              "Recherchez « HTTP » et ajoutez le module « Make a request »",
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Qu'est-ce qu'un scénario ?">
            Un scénario est un workflow automatisé dans Make. Il se compose de modules (applications)
            reliés entre eux. Lorsqu&apos;un module se déclenche ou reçoit des données, il transmet ces
            données au module suivant.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Configurer le module HTTP">
          <p>
            Une fois le module HTTP ajouté, configurez-le pour envoyer des documents à Tavnit. Vous
            pouvez utiliser l&apos;une de ces deux approches :
          </p>

          <h3 className="text-base font-semibold text-accent mt-6 mb-3">
            Option 1 : multipart/form-data (lorsque vous disposez d&apos;un objet fichier)
          </h3>
          <NumberedList
            items={[
              "Ajoutez un module HTTP « Make a request » à votre scénario",
              <Fragment key="f14">
                Configurez la requête :
                <BulletList
                  items={[
                    <>URL : <InlineCode>https://run.tavnit.io/api/runs/process</InlineCode></>,
                    "Method : POST",
                  ]}
                />
              </Fragment>,
              <Fragment key="f15">
                Dans l&apos;onglet Headers, ajoutez :
                <BulletList
                  items={[
                    "Header name : X-API-Key",
                    "Header value : YOUR_API_KEY",
                  ]}
                />
              </Fragment>,
              "Réglez Body type sur « multipart/form-data »",
              <Fragment key="f16">
                Ajoutez les champs de formulaire :
                <BulletList
                  items={[
                    "flow_id : YOUR_FLOW_ID",
                    "file : (mappé depuis le module précédent)",
                    "source : api (facultatif)",
                  ]}
                />
              </Fragment>,
              "Exécutez votre scénario pour le tester",
            ]}
          />

          <h3 className="text-base font-semibold text-[#6c42f0] mt-8 mb-3">
            Option 2 : JSON + base64 (lorsque vous disposez d&apos;une chaîne base64)
          </h3>
          <p>
            Si votre module précédent produit une chaîne base64 au lieu d&apos;un fichier, utilisez
            cette approche :
          </p>
          <NumberedList
            items={[
              "Réglez Body type sur « Raw » et sélectionnez « JSON (application/json) »",
              <Fragment key="f17">
                Dans l&apos;onglet Headers, ajoutez aussi :
                <BulletList
                  items={[
                    "Header name : Content-Type",
                    "Header value : application/json",
                  ]}
                />
              </Fragment>,
              "Définissez le corps JSON ainsi :",
            ]}
          />
          <CodeBlock lang="JSON" code={JSON_BODY_EXAMPLE} />

          <InfoBox color="blue" icon={<Info size={20} />} title="Mapper le contenu base64">
            Remplacez {"{{previous_module.base64_content}}"} par le mappage réel de votre module
            précédent. Dans Make, cliquez dans le champ et sélectionnez la sortie base64 du module qui
            fournit votre fichier. Conservez l&apos;extension dans filename : Tavnit s&apos;en sert pour
            détecter le type de fichier.
          </InfoBox>
          <p>
            L&apos;appel répond immédiatement avec un <InlineCode>run_id</InlineCode>. Les données
            extraites arrivent plus tard sur le webhook du Flow, ou vous pouvez les récupérer avec un
            second module HTTP qui appelle{" "}
            <InlineCode>{"GET https://run.tavnit.io/api/runs/{run_id}"}</InlineCode>.
          </p>
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Autres plateformes (Zapier, Power Automate, n8n)">
          <p>La même approche fonctionne avec toute plateforme d&apos;automatisation qui prend en charge les requêtes HTTP :</p>
          <InfoBox color="purple" icon={<Paperclip size={20} />} title="Si votre plateforme vous fournit un objet fichier">
            Utilisez multipart/form-data avec un champ « file » contenant le fichier, plus le champ
            flow_id.
          </InfoBox>
          <InfoBox color="violet" icon={<Code2 size={20} />} title="Si votre plateforme vous fournit une chaîne base64">
            Utilisez un corps JSON avec flow_id, filename et file_base64 (le contenu base64 de
            l&apos;étape précédente).
          </InfoBox>
          <p>
            Les deux méthodes appellent le même endpoint et produisent des résultats d&apos;extraction
            identiques. Pour traiter les fichiers qui arrivent dans Google Drive, OneDrive ou Dropbox,
            déclenchez sur « Nouveau fichier dans un dossier » et envoyez le fichier en POST de la même
            manière.
          </p>
        </DocCard>

        <DocCard icon={<FolderInput size={24} />} title="Utiliser l'API des Collections">
          <p>
            Si vous recevez différents types de documents et voulez que l&apos;IA achemine chacun vers
            le bon Flow, appelez la Collection plutôt qu&apos;un Flow.
          </p>
          <BulletList
            items={[
              <Fragment key="f18">URL : <InlineCode>https://run.tavnit.io/api/collections/process</InlineCode></Fragment>,
              <Fragment key="f19">Utilisez <InlineCode>collection_id</InlineCode> au lieu de <InlineCode>flow_id</InlineCode></Fragment>,
            ]}
          />
          <CodeBlock lang="JSON" code={COLLECTIONS_JSON_EXAMPLE} />
        </DocCard>

        <DocCard icon={<Split size={24} />} title="Utiliser l'API des Splitters">
          <p>
            Si vous recevez des PDF combinés contenant plusieurs documents et devez les séparer,
            appelez le Splitter.
          </p>
          <BulletList
            items={[
              <Fragment key="f22">URL : <InlineCode>https://run.tavnit.io/api/splits/run</InlineCode></Fragment>,
              <Fragment key="f23">Utilisez <InlineCode>splitter_id</InlineCode> au lieu de <InlineCode>flow_id</InlineCode></Fragment>,
            ]}
          />
          <CodeBlock lang="JSON" code={SPLITTERS_JSON_EXAMPLE} />
        </DocCard>

        <DocCard icon={<Route size={24} />} title="Lancer un Pipeline">
          <p>
            Pour exécuter tout un Pipeline plutôt qu&apos;un seul Flow, envoyez le fichier en POST
            (<InlineCode>file</InlineCode> en multipart, ou <InlineCode>file_base64</InlineCode> +{" "}
            <InlineCode>filename</InlineCode> en JSON) à{" "}
            <InlineCode>https://run.tavnit.io/api/pipelines/YOUR_PIPELINE_ID/execute</InlineCode>{" "}
            avec le même en-tête. L&apos;identifiant du Pipeline figure dans l&apos;URL.
          </p>
        </DocCard>

        <DocCard icon={<Wand2 size={24} />} title="Utiliser l'API des Cleaners">
          <p>
            Pour nettoyer des lignes de données depuis votre automatisation, envoyez-les en JSON au
            Cleaner. Un fichier de feuille de calcul va plutôt à{" "}
            <InlineCode>https://run.tavnit.io/api/sweeps/run</InlineCode>, en multipart avec{" "}
            <InlineCode>cleaner_id</InlineCode> (cet endpoint n&apos;accepte pas le base64).
          </p>
          <BulletList
            items={[
              <Fragment key="f20">URL : <InlineCode>https://run.tavnit.io/api/cleaners/YOUR_CLEANER_ID/process</InlineCode></Fragment>,
              "Method : POST, Content-Type : application/json",
            ]}
          />
          <CodeBlock lang="JSON" code={CLEANERS_JSON_EXAMPLE} />
        </DocCard>

        <DocCard icon={<Database size={24} />} title="Utiliser l'API des Buckets">
          <p>
            Pour pousser des lignes dans un Bucket sans envoyer de document, utilisez l&apos;endpoint
            d&apos;écriture. Chaque ligne doit contenir toutes les colonnes du Bucket.
          </p>
          <BulletList
            items={[
              <Fragment key="f24">URL : <InlineCode>https://run.tavnit.io/api/buckets/write</InlineCode></Fragment>,
              "Method : POST, Content-Type : application/json",
              <Fragment key="f25">En-tête : <InlineCode>X-API-Key: YOUR_API_KEY</InlineCode></Fragment>,
            ]}
          />
          <CodeBlock lang="JSON" code={BUCKETS_JSON_EXAMPLE} />
          <InfoBox color="purple" icon={<Info size={20} />} title="Trouver l'identifiant et le nom de votre Bucket">
            Ouvrez la page de détail du Bucket et touchez l&apos;icône d&apos;information. Les deux
            valeurs se copient d&apos;une seule touche.
          </InfoBox>
        </DocCard>

        <DocCard icon={<ClipboardCheck size={24} />} title="Autres fonctionnalités">
          <p>
            Les Agents, Matchers, Inspectors, Fillers, Signals, Subjects et Nets se lancent de la même
            manière : une requête HTTP avec l&apos;en-tête <InlineCode>X-API-Key</InlineCode>. Passez à
            l&apos;onglet <strong>Code</strong> pour voir les champs de chaque endpoint.
          </p>
        </DocCard>
      </div>

      <Related
        links={[
          {
            href: "/docs/webhooks",
            label: "Recevoir les résultats avec des webhooks",
            description: "Le payload que Tavnit envoie lorsqu'un Run se termine, et comment construire un récepteur.",
          },
          {
            href: "/docs/mcp-connector",
            label: "Connecter un assistant d'IA avec le connecteur MCP",
            description: "Utilisez Tavnit depuis claude.ai, Cursor ou un autre client MCP.",
          },
          {
            href: "/docs/user-roles",
            label: "Rôles utilisateur et autorisations",
            description: "Pourquoi une clé du rôle HITL uniquement peut réviser mais pas traiter.",
          },
        ]}
      />
    </section>
  );
}
