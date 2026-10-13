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
 * /ja/docs/api-integration — translated from components/docs/ApiIntegrationContent.tsx.
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

const FIELD_HEAD = ["フィールド", "必須", "説明"];

export default function ApiIntegrationJa() {
  const hashNoCode = useSyncExternalStore(subscribeHash, hashIsNoCode, serverHash);
  const [chosenTab, setChosenTab] = useState<ApiTab | null>(null);
  const apiTab: ApiTab = chosenTab ?? (hashNoCode ? "no-code" : "code");
  const [lang, setLang] = useState<Lang>("python");

  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        API 連携
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
          コード
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
          ノーコード
        </button>
      </div>

      {/* ── Code tab ── */}
      <div role="tabpanel" aria-label="コード" className={apiTab === "code" ? undefined : "hidden"}>
        <DocCard icon={<Info size={24} />} title="API のしくみ">
          <p>
            Tavnit REST API を使うと、アプリで行う操作を自分のコードから実行できます。Flow、Collection、
            Splitter、Pipeline へのドキュメント送信、Cleaner、Matcher、Inspector、Filler、Signal、Agent の
            実行、Bucket の読み書き、Subject のケース管理、人によるレビューの承認や却下が行えます。
          </p>
          <BulletList
            items={[
              <Fragment key="b0">
                ベース URL：<InlineCode>https://run.tavnit.io/api</InlineCode>。以下のパスはすべて、この URL
                からの相対パスです。
              </Fragment>,
              <Fragment key="b1">
                すべてのリクエストには、<InlineCode>X-API-Key</InlineCode> ヘッダーに API キーを含めます。
              </Fragment>,
              <Fragment key="b2">
                処理は非同期です。処理を開始するエンドポイントは、すぐに ID とともに{" "}
                <strong>202 Accepted</strong> を返し、処理はバックグラウンドで実行されます。結果はポーリング
                （Run、Agent の Run、Catch、ケース）で取得するか、機能に設定した{" "}
                <DocLink href="/docs/webhooks">webhook</DocLink> で受け取ります。
              </Fragment>,
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="ベータ版の機能">
            Pipelines、Subjects、Matchers、Inspectors、Fillers、Signals、Nets はベータ版です。
            エンドポイントは現在も利用できますが、細部は今後変更される可能性があります。
          </InfoBox>
        </DocCard>

        <DocCard icon={<Lock size={24} />} title="認証と ID">
          <h3 className="text-base font-semibold text-fg-2 mt-2 mb-1">API キー</h3>
          <p>
            アプリのサイドバーで<strong>連携</strong>を開きます。<strong>API キー</strong>カードに
            キーが表示されます（そこで表示とコピーができます）。キーは組織ごとにメンバー一人ひとりに
            発行され、リクエストはその組織のそのメンバーとして実行されます。
          </p>
          <WarningBox>
            API キーは秘密にしてください。同じカードの<strong>再生成</strong>を使うと現在のキーはすぐに
            無効になり、まだそのキーを使っているものはすべて動作しなくなります。
          </WarningBox>
          <p>有効なキーのないリクエストには、次のレスポンスが返ります。</p>
          <CodeBlock
            lang="401"
            code={`{
  "success": false,
  "error": "Authentication required",
  "message": "Please provide a valid X-API-Key header"
}`}
          />

          <h3 className={H3}>ロール</h3>
          <p>
            キーにはあなたのロールが反映されます。<strong>HITL のみ</strong>ロールのメンバーが使えるのは、
            人によるレビューの承認・却下エンドポイントと API キーのエンドポイントだけです。処理やデータの
            エンドポイントはすべて、<strong>403</strong> と{" "}
            <InlineCode>Your role only permits HITL reviews</InlineCode> で拒否します。
            <DocLink href="/docs/user-roles">ユーザーロール</DocLink>をご覧ください。
          </p>

          <h3 className={H3}>ID</h3>
          <p>
            Flow、Collection、Splitter、Cleaner、Bucket、Agent、Matcher、Inspector、Filler、Pipeline の
            ID は、それぞれの詳細ページにコピーボタンとともに表示されます。リソースはキーの組織に属している
            必要があり、ほかの組織の ID には 403 または 404 が返ります。
          </p>
        </DocCard>

        <DocCard icon={<Download size={24} />} title="ファイルの送信">
          <p>ドキュメントを受け取るエンドポイントは、次の 2 つの方法のどちらかで受け付けます。</p>
          <InfoBox color="purple" icon={<Paperclip size={20} />} title="マルチパートでのファイルアップロード">
            ファイルを multipart/form-data として file という名前のフィールドで送り、ほかのフィールドは
            フォームフィールドとして送ります。すべてのファイル用エンドポイントで使えます。
          </InfoBox>
          <InfoBox color="violet" icon={<Code2 size={20} />} title="JSON 本文での Base64">
            file_base64（ファイルの内容）と filename（拡張子付き）、そしてほかのフィールドを含む JSON
            を送ります。自動化ツールからファイルではなく Base64 が渡される場合に便利です。
          </InfoBox>
          <DataTable
            head={["エンドポイント", "Base64", "受け付けるファイル"]}
            rows={[
              ["POST /runs/process", "可", "PDF、画像（PNG、JPG、JPEG、JFIF、TIF、TIFF、WEBP、BMP、GIF）、スプレッドシート（XLSX、XLS、CSV）"],
              ["POST /collections/process", "可", "Run と同じ"],
              ["POST /splits/run", "可", "Run と同じ"],
              ["POST /pipelines/{id}/execute", "可", "PDF と画像"],
              ["POST /signals/{id}/run", "可", "音声：MP3、MP4、MPEG、MPGA、M4A、WAV、WEBM"],
              ["POST /sweeps/run", "不可", "スプレッドシート：CSV、XLSX、XLS"],
              ["Inspector、Filler、Subject、ケース", "不可", "ドキュメントをマルチパートのファイルとして"],
            ]}
          />
          <p>1 回のリクエストは最大 150 MB です。ファイル形式はファイル名の拡張子から判定されます。</p>
        </DocCard>

        <DocCard icon={<ListChecks size={24} />} title="レスポンスとエラー">
          <p>
            レスポンスは <InlineCode>success</InlineCode> フラグを持つ JSON です。エラーには{" "}
            <InlineCode>error</InlineCode> 文字列が含まれ、場合によっては <InlineCode>message</InlineCode>{" "}
            と、問題を説明する追加のキーも含まれます。
          </p>
          <CodeBlock lang="409 の例" code={API_ERROR_EXAMPLE} />
          <DataTable
            head={["ステータス", "意味"]}
            rows={[
              ["200 / 201", "完了（読み取り、キャンセル、承認）/ 作成済み（ケース、入力、検査）。"],
              ["202", "受付済み：処理がキューに入りました。返された ID を保存してください。"],
              ["400", "必須フィールドがないか無効である、ファイル形式がサポートされていない、またはリソースが無効か未設定です。"],
              ["401", "X-API-Key がないか無効です。"],
              ["402", "組織で現在新しい処理を開始できません。Tavnit チームにお問い合わせください。"],
              ["403", "リソースがほかの組織に属している、ロールが HITL のみである、またはその項目のレビュアーではありません。"],
              ["404", "その ID は組織内に存在しません。"],
              ["409", "現在の状態と競合しています：Bucket 名の不一致、すでにキャンセル済みまたは完了済み、ケースがクローズ済み、スロットが入力済みなど。"],
              ["429", "Agent の待機中の Run が多すぎます。"],
              ["500", "予期しないエラーです。時間をおいて再試行しても問題ありません。"],
            ]}
          />
        </DocCard>

        <DocCard icon={<Layers size={24} />} title="エンドポイント一覧">
          <DataTable
            head={["機能", "メソッドとパス", "内容"]}
            rows={[
              ["Flows", "POST /runs/process", "Flow でドキュメントを抽出する"],
              ["Flows", "GET /runs/{run_id}", "Run のステータスと抽出データ"],
              ["Flows", "GET /runs/{run_id}/source-file", "元のドキュメント"],
              ["Collections", "POST /collections/process", "AI がドキュメントを適切な Flow または Splitter に振り分ける"],
              ["Collections", "GET /collection-runs/{id}/source-file", "元のドキュメント"],
              ["Splitters", "POST /splits/run", "複数ドキュメントを含むファイルを分割する"],
              ["Splitters", "GET /splits/{split_id}/source-file", "元のまとめファイル"],
              ["Cleaners", "POST /sweeps/run", "スプレッドシートに Sweep を実行する"],
              ["Cleaners", "POST /cleaners/{cleaner_id}/process", "JSON で送った行に Sweep を実行する"],
              ["Buckets", "POST /buckets/write", "行を追加または置き換える"],
              ["Buckets", "GET /buckets/read", "行をページ単位で読み取る"],
              ["Agents", "POST /bots/{agent_id}/runs", "Agent の Run を開始する"],
              ["Agents", "GET /bot-runs/{bot_run_id}", "Agent の Run を 1 件ポーリングする"],
              ["Agents", "GET /bots/{agent_id}/runs", "Agent の Run を一覧表示する"],
              ["Agents", "POST /bot-runs/{bot_run_id}/cancel", "Agent の Run をキャンセルする"],
              ["Matchers", "POST /matchers/{matcher_id}/run", "完了した Run をマッチングする"],
              ["Inspectors", "POST /inspectors/{inspector_id}/process", "検査にドキュメントを追加する"],
              ["Fillers", "POST /fillers/{filler_id}/fills", "入力を開始してドキュメントを追加する"],
              ["Pipelines", "POST /pipelines/{pipeline_id}/execute", "Pipeline を実行する"],
              ["Signals", "POST /signals/{signal_id}/run", "音声ファイルを構造化する（Wave）"],
              ["Subjects", "POST /subjects/{subject_id}/process", "ドキュメントをケースに振り分ける"],
              ["Nets", "POST /nets/{net_id}/catch", "Catch を開始する"],
              ["人によるレビュー", "POST /runs/{run_id}/hitl/approve", "一時停止中の項目を承認または却下する"],
              ["API キー", "GET /me/api-key", "キーを読み取る、または再生成する"],
            ]}
          />
          <p>各機能の詳細と、そのほかのエンドポイントは以下で説明します。</p>
        </DocCard>

        {/* ── Flows ── */}
        <DocCard icon={<FileText size={24} />} title="Flows：ドキュメントを処理する">
          <p>ドキュメントを 1 つ Flow に送ります。Tavnit が Run を作成し、バックグラウンドで抽出します。</p>
          <Endpoint method="POST" path="/runs/process" />
          <DataTable
            head={FIELD_HEAD}
            rows={[
              ["flow_id", "はい", "ドキュメントを抽出する Flow。"],
              ["file", "はい*", "ドキュメント（マルチパート）。"],
              ["file_base64 + filename", "はい*", "file の代わりに、Base64 の内容と拡張子付きのファイル名。"],
              ["content_type", "いいえ", "Base64 ファイルの MIME タイプ。"],
              ["source", "いいえ", "Run に保存されるラベル：api（既定）、email、manual_upload、collection。"],
            ]}
            caption="* file か、file_base64 + filename のどちらかを送ってください。"
          />
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python" code={PYTHON_CODE} />
          ) : (
            <CodeBlock lang="JavaScript" code={JAVASCRIPT_CODE} />
          )}
          <CodeBlock lang="202 レスポンス" code={RUN_PROCESS_RESPONSE} />
          <p>
            エラー：400（ファイルがない、flow_id がない、ファイルがサポートされていないか無効）、403（ほかの
            組織の Flow）、404（Flow が見つからない）。拒否されたリクエストでも、可能な場合は失敗した Run
            が作成され、その <InlineCode>run_id</InlineCode> が返されるので、<strong>Runs</strong>{" "}
            で見つけられます。
          </p>

          <h3 className={H3}>Run とそのデータを取得する</h3>
          <Endpoint method="GET" path="/runs/{run_id}" />
          <p>
            <InlineCode>status</InlineCode> が終了状態になるまでポーリングします。ステータス：
            <InlineCode>queued</InlineCode>、<InlineCode>running</InlineCode>、
            <InlineCode>awaiting_approval</InlineCode>（
            <DocLink href="/docs/human-in-the-loop">人によるレビュー</DocLink>のため一時停止中）、
            <InlineCode>completed</InlineCode>、<InlineCode>failed</InlineCode>、
            <InlineCode>cancelled</InlineCode>。<InlineCode>data</InlineCode> には抽出された行が入り、
            承認待ちの間も含めて、Run が完了するまでは <InlineCode>null</InlineCode> のままです。
            <InlineCode>columns</InlineCode> が設定されている場合は、列の順序にそれを使ってください。
            <InlineCode>attempt</InlineCode> と <InlineCode>previous_attempts</InlineCode>{" "}
            は自動再試行を示します。<InlineCode>?include_document=true</InlineCode>{" "}
            を付けると、元のファイルへの署名付きリンクも取得できます。これは Collection、Splitter、
            Pipeline、メールで作成された Run を含め、すべての Run で使えます。
          </p>
          <CodeBlock lang="200 レスポンス" code={RUN_GET_RESPONSE} />
          {lang === "python" ? (
            <CodeBlock lang="Python（送信とポーリング）" code={PYTHON_RUN_POLL_CODE} />
          ) : (
            <CodeBlock lang="JavaScript（送信とポーリング）" code={JAVASCRIPT_RUN_POLL_CODE} />
          )}

          <h3 className={H3}>元のドキュメントを取得する</h3>
          <Endpoint method="GET" path="/runs/{run_id}/source-file" />
          <p>
            Run のステータスにかかわらず、アップロードされたままのファイルへの署名付き URL を返します。
            省略可能な <InlineCode>expires_in</InlineCode> でリンクの有効期間を秒単位で指定できます（60〜604800、
            既定は 7 日）。<InlineCode>?download=true</InlineCode> を付けると、レスポンスはファイルそのものに
            なります。
          </p>
          <CodeBlock lang="200 レスポンス" code={SOURCE_FILE_RESPONSE} />
        </DocCard>

        {/* ── Collections ── */}
        <DocCard icon={<FolderInput size={24} />} title="Collections：AI にドキュメントを振り分けさせる">
          <p>
            Flow を選ばずにドキュメントを送ります。AI が Collection の中から最適な Flow または Splitter
            を選びます。種類の異なるドキュメントを受け取る場合に使います。
          </p>
          <Endpoint method="POST" path="/collections/process" />
          <p>
            本文は <InlineCode>/runs/process</InlineCode> と同じで、<InlineCode>flow_id</InlineCode>{" "}
            の代わりに <InlineCode>collection_id</InlineCode> を使います（ID をパスに入れることもできます：
            <InlineCode>{"/collections/{collection_id}/process"}</InlineCode>）。Collection が有効で、
            有効な Flow または Splitter が少なくとも 1 つ含まれている必要があります。そうでない場合は 400
            が返ります。
          </p>
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python (Collections)" code={PYTHON_COLLECTIONS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Collections)" code={JAVASCRIPT_COLLECTIONS_CODE} />
          )}
          <CodeBlock lang="202 レスポンス" code={COLLECTION_PROCESS_RESPONSE} />
          <p>
            選ばれた Flow が通常の Run を作成し、その webhook のペイロードには{" "}
            <InlineCode>collection_run_id</InlineCode> が含まれるため、結果をリクエストと照合できます。
            元のファイルは{" "}
            <InlineCode>{"GET /collection-runs/{collection_run_id}/source-file"}</InlineCode>{" "}
            ですぐに取得できます（Run の元ファイルと同じオプション）。
            <DocLink href="/docs/collections">Collections</DocLink> をご覧ください。
          </p>
        </DocCard>

        {/* ── Splitters ── */}
        <DocCard icon={<Split size={24} />} title="Splitters：複数ドキュメントを含むファイルを分割する">
          <p>
            複数のドキュメントを含むファイルを送ります。Splitter は各ドキュメントの始まりと終わりを見つけて
            分類し、ドキュメントタイプの設定に従って各部分を送ります。
          </p>
          <Endpoint method="POST" path="/splits/run" />
          <p>
            本文は <InlineCode>/runs/process</InlineCode> と同じで、
            <InlineCode>splitter_id</InlineCode> を使います。
          </p>
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python (Splitters)" code={PYTHON_SPLITTERS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Splitters)" code={JAVASCRIPT_SPLITTERS_CODE} />
          )}
          <CodeBlock lang="202 レスポンス" code={SPLIT_RUN_RESPONSE} />
          <p>
            Flow に送られた部分はそれぞれ独自の Run になり、その webhook には{" "}
            <InlineCode>split_id</InlineCode> が含まれます。元のまとめファイルは{" "}
            <InlineCode>{"GET /splits/{split_id}/source-file"}</InlineCode> で取得できます。
            <DocLink href="/docs/splitters">Splitters</DocLink> をご覧ください。
          </p>
        </DocCard>

        {/* ── Cleaners ── */}
        <DocCard icon={<Wand2 size={24} />} title="Cleaners：Sweep を実行する">
          <p>
            Sweep は、データの行に Cleaner を適用して値の正規化、分類、照合、補完を行います。行は
            スプレッドシートまたは JSON で送ります。
          </p>
          <Endpoint method="POST" path="/sweeps/run" />
          <DataTable
            head={FIELD_HEAD}
            rows={[
              ["cleaner_id", "はい", "実行する Cleaner。"],
              ["file", "はい", "CSV、XLSX、XLS（マルチパートのみ）。1 行目に見出しを置き、Cleaner が必要とする基本フィールドはすべて、重複なく列として含める必要があります。"],
              ["sheet_name", "いいえ", "ブックのどのシートを読み取るか（既定：最初のシート）。"],
            ]}
          />
          <Endpoint method="POST" path="/cleaners/{cleaner_id}/process" />
          <p>
            <InlineCode>rows</InlineCode>（オブジェクトの配列）を含む JSON か、上記と同じくマルチパートの{" "}
            <InlineCode>file</InlineCode> を送ります。
          </p>
          <CodeBlock lang="JSON 本文" code={CLEANERS_JSON_EXAMPLE} />
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python (Cleaners)" code={PYTHON_CLEANERS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Cleaners)" code={JAVASCRIPT_CLEANERS_CODE} />
          )}
          <CodeBlock lang="202 レスポンス" code={SWEEP_RUN_RESPONSE} />
          <p>
            設定が無効な Cleaner は、<InlineCode>validation_errors</InlineCode> とともに 400 を返します。
            <DocLink href="/docs/cleaners">Cleaners</DocLink> をご覧ください。
          </p>
        </DocCard>

        {/* ── Buckets ── */}
        <DocCard icon={<Database size={24} />} title="Buckets：行を書き込む・読み取る">
          <p>
            自社のシステムから Bucket に行を送り込んだり、Flow が保存した内容を読み取ったりできます。Bucket
            の ID と名前は、Bucket のページで情報アイコンをタップすると確認できます。名前は安全確認のための
            ものです。ID と一致しない場合、呼び出しは <strong>409</strong> を返します。
          </p>
          <Endpoint method="POST" path="/buckets/write" />
          <DataTable
            head={FIELD_HEAD}
            rows={[
              ["bucket_id", "はい", "対象の Bucket。"],
              ["bucket_name", "はい", "その正確な名前。"],
              ["overwrite", "はい", "ブール値。false は行を追加し、true は既存の行をすべて置き換えます。"],
              ["rows", "はい", "オブジェクトの配列。1 回のリクエストで最大 50,000 件。"],
            ]}
          />
          <p>
            本文は <InlineCode>application/json</InlineCode> で送ります。各行は、列名または表示名で、
            Bucket の列と過不足なく一致している必要があります。不足している列や未知の列があると書き込み全体が
            400 で中止され、<InlineCode>missing_columns</InlineCode> と{" "}
            <InlineCode>extra_columns</InlineCode> が一覧で返されます。
          </p>
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python (Buckets)" code={PYTHON_BUCKETS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Buckets)" code={JAVASCRIPT_BUCKETS_CODE} />
          )}
          <CodeBlock lang="202 レスポンス" code={BUCKET_WRITE_RESPONSE} />

          <h3 className={H3}>行を読み取る</h3>
          <Endpoint method="GET" path="/buckets/read" />
          <p>
            クエリパラメーター：<InlineCode>bucket_id</InlineCode> と{" "}
            <InlineCode>bucket_name</InlineCode>（必須）、<InlineCode>limit</InlineCode>（1〜1000、
            既定は 100）、<InlineCode>offset</InlineCode>（既定は 0）。<InlineCode>has_more</InlineCode>{" "}
            が true の間は <InlineCode>offset</InlineCode> を使ってページを送ります。
            <InlineCode>total_count</InlineCode> はすべての行数です。行の <InlineCode>data</InlineCode>{" "}
            のキーは列名です。表示名には <InlineCode>columns</InlineCode> を使ってください。保存された
            ファイルのリンクは、新しく発行された署名付き URL として返されます。
          </p>
          <CodeBlock lang="リクエスト" code={BUCKET_READ_REQUEST} />
          <CodeBlock lang="200 レスポンス" code={BUCKET_READ_RESPONSE} />
          <p>
            <DocLink href="/docs/buckets">Buckets</DocLink> をご覧ください。
          </p>
        </DocCard>

        {/* ── Agents ── */}
        <DocCard icon={<Bot size={24} />} title="Agents：Run を開始してポーリングする">
          <p>
            コードから Agent を開始し、取得した内容を回収します。Agents はリクエストに応じて組織ごとに有効化
            されます。有効にするにはサポートにお問い合わせください。
          </p>
          <Endpoint method="POST" path="/bots/{agent_id}/runs" />
          <p>
            省略可能な JSON <InlineCode>{'{"inputs": {...}}'}</InlineCode> で、この Run に限り Agent
            の入力変数を上書きできます。使われるのは Agent が宣言している変数だけで、シークレットの値は
            受け付けられません。<InlineCode>bot_id</InlineCode> を本文に入れて{" "}
            <InlineCode>POST /bots/runs</InlineCode> を呼び出すこともできます。呼び出すたびに新しい Run
            が開始されます。
          </p>
          <CodeBlock lang="リクエスト" code={AGENT_TRIGGER_REQUEST} />
          <p>
            <InlineCode>status</InlineCode> は <InlineCode>queued</InlineCode> です。Agent が一度に 1 つの
            Run しか実行しない設定で実行中の場合は <InlineCode>waiting</InlineCode> になります（順番が
            来ると自動的に開始します）。Agent がアーカイブされている場合は 409、待機中の Run が多すぎる
            場合は 429 が返ります。
          </p>

          <h3 className={H3}>ポーリング、一覧表示、キャンセル</h3>
          <DataTable
            head={["エンドポイント", "内容"]}
            rows={[
              ["GET /bot-runs/{bot_run_id}", "1 件の Run：ステータス、所要時間、入力（シークレットは除外）、署名付きファイルリンクを含む出力。GET /bots/{agent_id}/runs/{bot_run_id} でも取得できます。"],
              ["GET /bots/{agent_id}/runs", "新しい順、入力と出力は含みません。クエリ：status（queued、running、completed、failed、cancelled）、limit（1〜100、既定は 20）、offset。runs と total を返します。"],
              ["POST /bot-runs/{bot_run_id}/cancel", "待機中、キュー内、実行中の Run をキャンセルします。Run がすでに終了している場合は 409。POST /bots/{agent_id}/runs/{bot_run_id}/cancel でも実行できます。"],
            ]}
          />
          <CodeBlock lang="GET /bot-runs/{bot_run_id}" code={AGENT_RUN_RESPONSE} />
          <p>
            <DocLink href="/docs/agents">Agents</DocLink> をご覧ください。
          </p>
        </DocCard>

        {/* ── Matchers ── */}
        <DocCard icon={<Target size={24} />} title="Matchers：Run をマッチングする">
          <p>Matcher の Flow の完了した Run を比較します。たとえば請求書と発注書の照合です。</p>
          <Endpoint method="POST" path="/matchers/{matcher_id}/run" />
          <DataTable
            head={FIELD_HEAD}
            rows={[
              ["run_ids", "はい", "Matcher の Flow の完了した Run を 2 つ以上。"],
              ["benchmark_run_id", "ベンチマークモードの場合", "ほかの Run の比較対象となる Run。"],
            ]}
          />
          <CodeBlock lang="リクエスト" code={MATCHER_RUN_REQUEST} />
          <p>
            マッチの結果を読み取る API エンドポイントはありません。結果は Matcher の webhook やメール出力、
            またはアプリで確認してください。<DocLink href="/docs/matchers">Matchers</DocLink> をご覧ください。
          </p>
        </DocCard>

        {/* ── Inspectors ── */}
        <DocCard icon={<ShieldCheck size={24} />} title="Inspectors：一連のドキュメントをチェックする">
          <p>
            検査はドキュメントを集め、それぞれを Inspector のスロットに振り分けて抽出し、チェックリストを
            評価します。
          </p>
          <Endpoint method="POST" path="/inspectors/{inspector_id}/process" />
          <p>
            マルチパートの <InlineCode>file</InlineCode> を送ります。<InlineCode>inspection_id</InlineCode>{" "}
            を指定しない場合は新しい検査が作成されます。返された <InlineCode>inspection_id</InlineCode>{" "}
            を渡すと、その検査にドキュメントを追加できます（検査がまだ収集中である必要があり、そうでない場合は
            409）。Inspector は有効になっている必要があります。
          </p>
          <CodeBlock lang="リクエスト" code={INSPECTOR_PROCESS_REQUEST} />
          <DataTable
            head={["エンドポイント", "内容"]}
            rows={[
              ["POST /inspectors/{inspector_id}/inspections", "後からドキュメントを追加するための空の検査を作成します（201）。"],
              ["POST /inspections/{inspection_id}/fire", "収集を終了し、すぐに評価します。必須のスロットにドキュメントがない場合は missing_inputs とともに 400。"],
            ]}
          />
          <p>
            結果は Inspector の webhook またはメール出力に届きます。
            <DocLink href="/docs/inspectors">Inspectors</DocLink> をご覧ください。
          </p>
        </DocCard>

        {/* ── Fillers ── */}
        <DocCard icon={<FileOutput size={24} />} title="Fillers：PDF フォームに入力する">
          <p>
            入力（fill）は Filler が必要とするドキュメントを集めて抽出し、その値を Filler の PDF
            テンプレートに書き込みます。
          </p>
          <DataTable
            head={["エンドポイント", "内容"]}
            rows={[
              ["POST /fillers/{filler_id}/fills", "入力を開始します（201、fill_id を返します）。Filler にはテンプレートとフィールドのマッピングが必要です。"],
              ["POST /fills/{fill_id}/route-upload", "マルチパートのファイル。AI が空いているスロットに振り分けます（202）。"],
              ["POST /fills/{fill_id}/inputs/{input_id}/upload", "特定のスロット用のマルチパートのファイル。そのスロットの Run を開始します（202）。"],
              ["POST /fills/{fill_id}/inputs/{input_id}/attach-run", "JSON の run_id：完了した Run をスロットに再利用します（202）。"],
              ["POST /fills/{fill_id}/fire", "すべてのスロットを待たずに、すぐに入力します。必須のスロットが空の場合は missing_inputs とともに 400。"],
              ["POST /fillers/{filler_id}/templates", "テンプレートの PDF を追加します（マルチパートのファイル、name は省略可）。フィールドのマッピングはアプリで行います。"],
            ]}
          />
          <CodeBlock lang="リクエスト" code={FILLER_REQUEST} />
          <p>
            入力済みの PDF は Filler の webhook またはメール出力に届きます。
            <DocLink href="/docs/fillers">Fillers</DocLink> をご覧ください。
          </p>
        </DocCard>

        {/* ── Pipelines ── */}
        <DocCard icon={<Route size={24} />} title="Pipelines：実行する">
          <p>ドキュメントを渡して Pipeline の実行を 1 回開始します。</p>
          <Endpoint method="POST" path="/pipelines/{pipeline_id}/execute" />
          <p>
            マルチパートの <InlineCode>file</InlineCode>、または <InlineCode>file_base64</InlineCode> +{" "}
            <InlineCode>filename</InlineCode>。PDF または画像です。Pipeline が無効な場合や、グラフを実行
            できない場合は 400 が返ります（<InlineCode>validation_errors</InlineCode> 付き）。
          </p>
          <CodeBlock lang="リクエスト" code={PIPELINE_EXECUTE_REQUEST} />
          <p>
            <InlineCode>{"POST /pipelines/executions/{execution_id}/cancel"}</InlineCode>{" "}
            でキャンセルできます（実行中でない場合は 409）。結果は Pipeline の出力ノードから送られます。
            <DocLink href="/docs/pipelines">Pipelines</DocLink> をご覧ください。
          </p>
        </DocCard>

        {/* ── Signals ── */}
        <DocCard icon={<AudioLines size={24} />} title="Signals：音声ファイルを構造化する">
          <p>録音を送ると、Signal がそれを構造化データ（Wave）に変換します。</p>
          <Endpoint method="POST" path="/signals/{signal_id}/run" />
          <p>
            マルチパートの <InlineCode>file</InlineCode> または Base64。音声は最大 150 MB・8 時間で、
            検出される発話は最大 2 時間です。
          </p>
          <CodeBlock lang="リクエスト" code={SIGNAL_RUN_REQUEST} />
          <p>
            結果は Signal の webhook またはアプリで確認できます。
            <DocLink href="/docs/signals">Signals</DocLink> をご覧ください。
          </p>
        </DocCard>

        {/* ── Subjects ── */}
        <DocCard icon={<Briefcase size={24} />} title="Subjects とケース">
          <p>Subject のケースにドキュメントを登録し、コードからケースを管理します。</p>
          <DataTable
            head={["エンドポイント", "内容"]}
            rows={[
              ["POST /subjects/{subject_id}/process", "マルチパートのファイル。Tavnit がケースに振り分けます（202、subject_doc_id を返します）。"],
              ["POST /cases/{case_id}/docs", "マルチパートのファイルを、振り分けなしで直接ケースに登録します。Subject のドキュメントタイプが 1 つでない限り doc_type_id は必須です。run_id を返します（202）。ケースがクローズ済みの場合や、そのドキュメントタイプがすでに入力済みの場合は 409。"],
              ["POST /subjects/{subject_id}/docs/{doc_id}/assign", "JSON の case_id と doc_type_id：保留中のドキュメントを手動で登録します（202）。"],
              ["POST /subjects/{subject_id}/cases", "JSON の name（必須、一意、最大 200 文字）と params（省略可能なオブジェクト）。ケースを作成します（201）。名前がすでに存在する場合は 409。"],
              ["GET /subjects/{subject_id}/cases", "クエリ：state（open または closed）、status、search、limit（最大 200、既定は 50）、offset。cases と total を返します。"],
              ["GET /cases/{case_id}", "ケースとそのドキュメント。各ドキュメントには GET /runs/{run_id} でポーリングするための run_id が含まれます。"],
              ["POST /cases/{case_id}/close", "ケースをクローズします（200）。以降に届くそのケースのドキュメントは、登録されずに保留されます。すでにクローズ済みの場合は 409。"],
              ["POST /cases/{case_id}/reopen", "ケースを再オープンします（200）。オープン中の場合は 409。"],
              ["POST /cases/{case_id}/inspections", "JSON の subject_inspector_id：ケースの完了した Run に対して、紐づけられた Inspector を実行します（202）。"],
            ]}
          />
          <CodeBlock lang="リクエスト" code={CASE_REQUEST} />
          <CodeBlock lang="201 レスポンス" code={CASE_RESPONSE} />
          <p>
            <DocLink href="/docs/subjects">Subjects</DocLink> をご覧ください。
          </p>
        </DocCard>

        {/* ── Nets ── */}
        <DocCard icon={<Radar size={24} />} title="Nets：Catch を開始する">
          <p>Nets は組織ごとに有効化されます。アクセス権がない場合、これらのエンドポイントは 403 を返します。</p>
          <Endpoint method="POST" path="/nets/{net_id}/catch" />
          <p>
            本文なしで呼び出すと、Catch は前回の Catch が終わったところから再開します。代わりに期間を
            さかのぼって取得するには、<InlineCode>window_start</InlineCode> と
            <InlineCode>window_end</InlineCode> の一方または両方（ISO 形式のタイムスタンプ）を送ります。Net
            が無効な場合や、前回から続く Catch がすでに進行中の場合は 409 が返ります。
          </p>
          <CodeBlock lang="リクエスト" code={NET_CATCH_REQUEST} />
          <p>
            <InlineCode>{"GET /catches/{catch_id}"}</InlineCode> をポーリングします。ステータス、段階、件数、
            そして完了後は列と行を含む <InlineCode>output</InlineCode> が返ります。
            <InlineCode>{"POST /catches/{catch_id}/cancel"}</InlineCode> でキャンセルできます。
            <DocLink href="/docs/nets">Nets</DocLink> をご覧ください。
          </p>
        </DocCard>

        {/* ── HITL ── */}
        <DocCard icon={<UserCheck size={24} />} title="人によるレビュー：承認または却下する">
          <p>
            レビューのために一時停止している項目は、自社のツールから承認または却下できます。操作できるのは、
            その Flow、Matcher、Inspector、Filler に設定されたレビュアーだけで（それ以外は 403）、項目が{" "}
            <InlineCode>awaiting_approval</InlineCode> である必要があります（それ以外は 409）。これらの
            エンドポイントは HITL のみロールでも使えます。
          </p>
          <DataTable
            head={["エンドポイント", "本文"]}
            rows={[
              ["POST /runs/{run_id}/hitl/approve", "output_json（必須）：最終的な行。diff（省略可能な編集内容のリスト）。人が入力する必須フィールドが空の場合は missing_fields とともに 400。"],
              ["POST /matches/{match_id}/hitl/approve", "groups（最終的なグループ分け）、excluded、diff。"],
              ["POST /inspections/{inspection_id}/hitl/approve", "waivers（免除する不合格項目ごとの item_id と reason）、diff。"],
              ["POST /fills/{fill_id}/hitl/approve", "values（テンプレートごとのフィールド値）、diff、allow_missing_human_fields。"],
              [".../hitl/reject", "同じパスの末尾を /hitl/reject にしたもの。reason は省略可能です。"],
            ]}
          />
          <CodeBlock lang="リクエスト" code={HITL_RUN_APPROVE_REQUEST} />
          <p>
            承認すると配信（webhook、メール、Bucket）が再開されます。Run を却下するとキャンセルされます。
            <DocLink href="/docs/human-in-the-loop">人によるレビュー</DocLink>をご覧ください。
          </p>
        </DocCard>

        {/* ── API key ── */}
        <DocCard icon={<KeyRound size={24} />} title="API キーのエンドポイント">
          <DataTable
            head={["エンドポイント", "内容"]}
            rows={[
              ["GET /me/api-key", "組織でのあなたのキーを返します。"],
              ["POST /me/api-key/regenerate", "新しいキーを発行し、古いキーをただちに無効にします。すべての連携を更新してください。"],
            ]}
          />
          <CodeBlock lang="200 レスポンス" code={API_KEY_RESPONSE} />
        </DocCard>
      </div>

      {/* ── No-Code tab ── */}
      <div role="tabpanel" aria-label="ノーコード" className={apiTab === "no-code" ? undefined : "hidden"}>
        <DocCard icon={<Star size={24} />} title="自動化ツールの概要">
          <p>
            Tavnit をワークフローにつなぐのに、コードを書く必要はありません。HTTP リクエストを送れる自動化
            プラットフォームなら Tavnit で処理を開始でき、webhook を受け取れるプラットフォームなら結果を
            受け取れます。
          </p>
          <InfoBox color="purple" icon={<CircleDot size={20} />} title="Make">
            ビジュアルなシナリオ：HTTP モジュールが Tavnit を呼び出し、Custom webhook が結果を受け取ります。
          </InfoBox>
          <InfoBox color="yellow" icon={<Zap size={20} />} title="Zapier">
            Webhooks by Zapier：Catch Hook が結果を受け取り、POST アクションで Run を開始します。
          </InfoBox>
          <InfoBox color="green" icon={<CircleDot size={20} />} title="n8n">
            セルフホストでもクラウドでも：Webhook ノードが結果を受け取り、HTTP Request ノードで Run
            を開始します。
          </InfoBox>
          <InfoBox color="blue" icon={<CircleDot size={20} />} title="Power Automate">
            HTTP アクションで同じように API を呼び出します。
          </InfoBox>
          <p>
            すべてのリクエストには、<strong>連携</strong>で確認できるキーを{" "}
            <InlineCode>X-API-Key</InlineCode> ヘッダーに含める必要があります。
          </p>
        </DocCard>

        <DocCard icon={<Webhook size={24} />} title="自動化で結果を受け取る">
          <NumberedList
            items={[
              "プラットフォームで webhook トリガーを作成し（Make：Custom webhook、Zapier：Webhooks by Zapier → Catch Hook、n8n：Webhook ノード、POST）、その URL をコピーします。",
              "Tavnit で、その URL を Flow の webhook（Webhook パネル）または Pipeline の出力ノードの webhook として貼り付けます。",
              "ドキュメントを 1 つ処理してプラットフォームにペイロードを学習させ、フィールドを Sheets、CRM、ERP などにマッピングします。",
            ]}
          />
          <p>
            ペイロードについては <DocLink href="/docs/webhooks">webhook のページ</DocLink>で説明しています。
          </p>
        </DocCard>

        <DocCard icon={<CircleDot size={24} />} title="Make との連携">
          <p>
            Make（旧 Integromat）は、コードを書かずにアプリをつないでワークフローを自動化できるビジュアルな
            自動化プラットフォームです。
          </p>
          <a
            href="https://www.make.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-2 transition-colors text-sm font-medium mt-1"
          >
            Make を開く <ExternalLink size={14} />
          </a>
        </DocCard>

        <DocCard icon={<Layers size={24} />} title="Make を始める">
          <NumberedList
            items={[
              "make.com にアクセスしてアカウントを作成します",
              "ダッシュボードで「Create a new scenario」をクリックします",
              "モジュールを追加できる空のキャンバスが表示されます",
              "「HTTP」を検索し、「Make a request」モジュールを追加します",
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="シナリオとは">
            シナリオは Make における自動化されたワークフローです。互いにつながったモジュール（アプリ）で構成
            されます。あるモジュールが起動したりデータを受け取ったりすると、そのデータを次のモジュールに
            渡します。
          </InfoBox>
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="HTTP モジュールを設定する">
          <p>
            HTTP モジュールを追加したら、Tavnit にドキュメントを送るように設定します。次の 2 つの方法の
            どちらかを使えます。
          </p>

          <h3 className="text-base font-semibold text-accent mt-6 mb-3">
            方法 1：multipart/form-data（File オブジェクトがある場合）
          </h3>
          <NumberedList
            items={[
              "シナリオに HTTP の「Make a request」モジュールを追加します",
              <Fragment key="f14">
                リクエストを設定します：
                <BulletList
                  items={[
                    <>URL：<InlineCode>https://run.tavnit.io/api/runs/process</InlineCode></>,
                    "Method：POST",
                  ]}
                />
              </Fragment>,
              <Fragment key="f15">
                Headers タブで次を追加します：
                <BulletList
                  items={[
                    "Header name：X-API-Key",
                    "Header value：YOUR_API_KEY",
                  ]}
                />
              </Fragment>,
              "Body type を「multipart/form-data」に設定します",
              <Fragment key="f16">
                フォームフィールドを追加します：
                <BulletList
                  items={[
                    "flow_id：YOUR_FLOW_ID",
                    "file：（前のモジュールからマッピング）",
                    "source：api（省略可）",
                  ]}
                />
              </Fragment>,
              "シナリオを実行してテストします",
            ]}
          />

          <h3 className="text-base font-semibold text-[#6c42f0] mt-8 mb-3">
            方法 2：JSON + Base64（Base64 文字列がある場合）
          </h3>
          <p>前のモジュールがファイルではなく Base64 文字列を出力する場合は、次の方法を使います。</p>
          <NumberedList
            items={[
              "Body type を「Raw」に設定し、「JSON (application/json)」を選択します",
              <Fragment key="f17">
                Headers タブで、次も追加します：
                <BulletList
                  items={[
                    "Header name：Content-Type",
                    "Header value：application/json",
                  ]}
                />
              </Fragment>,
              "JSON 本文を次のように設定します：",
            ]}
          />
          <CodeBlock lang="JSON" code={JSON_BODY_EXAMPLE} />

          <InfoBox color="blue" icon={<Info size={20} />} title="Base64 の内容をマッピングする">
            {"{{previous_module.base64_content}}"} を、前のモジュールからの実際のマッピングに置き換えます。
            Make ではフィールドをクリックし、ファイルを提供するモジュールの Base64 出力を選択します。filename
            には拡張子を残してください。Tavnit はそれを使ってファイル形式を判定します。
          </InfoBox>
          <p>
            呼び出しはすぐに <InlineCode>run_id</InlineCode> を返します。抽出データは後で Flow の webhook
            に届きます。または、2 つ目の HTTP モジュールで{" "}
            <InlineCode>{"GET https://run.tavnit.io/api/runs/{run_id}"}</InlineCode> を呼び出して取得する
            こともできます。
          </p>
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="ほかのプラットフォーム（Zapier、Power Automate、n8n）">
          <p>HTTP リクエストに対応した自動化プラットフォームなら、同じ方法が使えます。</p>
          <InfoBox color="purple" icon={<Paperclip size={20} />} title="プラットフォームからファイルオブジェクトが渡される場合">
            ファイルを入れた「file」フィールドと flow_id フィールドを含む multipart/form-data を使います。
          </InfoBox>
          <InfoBox color="violet" icon={<Code2 size={20} />} title="プラットフォームから Base64 文字列が渡される場合">
            flow_id、filename、file_base64（前のステップからの Base64 の内容）を含む JSON 本文を使います。
          </InfoBox>
          <p>
            どちらの方法も同じエンドポイントを呼び出し、同じ抽出結果になります。Google Drive、OneDrive、
            Dropbox に置かれたファイルを処理するには、「フォルダー内の新しいファイル」をトリガーにして、
            同じようにファイルを POST します。
          </p>
        </DocCard>

        <DocCard icon={<FolderInput size={24} />} title="Collections API を使う">
          <p>
            種類の異なるドキュメントを受け取り、それぞれを AI に適切な Flow へ振り分けさせたい場合は、Flow
            ではなく Collection を呼び出します。
          </p>
          <BulletList
            items={[
              <Fragment key="f18">URL：<InlineCode>https://run.tavnit.io/api/collections/process</InlineCode></Fragment>,
              <Fragment key="f19"><InlineCode>flow_id</InlineCode> の代わりに <InlineCode>collection_id</InlineCode> を使います</Fragment>,
            ]}
          />
          <CodeBlock lang="JSON" code={COLLECTIONS_JSON_EXAMPLE} />
        </DocCard>

        <DocCard icon={<Split size={24} />} title="Splitters API を使う">
          <p>
            複数のドキュメントがまとめられた PDF を受け取り、それらを分ける必要がある場合は、Splitter
            を呼び出します。
          </p>
          <BulletList
            items={[
              <Fragment key="f22">URL：<InlineCode>https://run.tavnit.io/api/splits/run</InlineCode></Fragment>,
              <Fragment key="f23"><InlineCode>flow_id</InlineCode> の代わりに <InlineCode>splitter_id</InlineCode> を使います</Fragment>,
            ]}
          />
          <CodeBlock lang="JSON" code={SPLITTERS_JSON_EXAMPLE} />
        </DocCard>

        <DocCard icon={<Route size={24} />} title="Pipeline を開始する">
          <p>
            1 つの Flow ではなく Pipeline 全体を実行するには、同じヘッダーを付けて、ファイル（マルチパートの{" "}
            <InlineCode>file</InlineCode>、または JSON の <InlineCode>file_base64</InlineCode> +{" "}
            <InlineCode>filename</InlineCode>）を{" "}
            <InlineCode>https://run.tavnit.io/api/pipelines/YOUR_PIPELINE_ID/execute</InlineCode>{" "}
            に POST します。Pipeline の ID は URL に入れます。
          </p>
        </DocCard>

        <DocCard icon={<Wand2 size={24} />} title="Cleaners API を使う">
          <p>
            自動化からデータの行をクリーニングするには、行を JSON で Cleaner に送ります。スプレッドシートの
            ファイルの場合は、代わりに <InlineCode>cleaner_id</InlineCode> を付けたマルチパートで{" "}
            <InlineCode>https://run.tavnit.io/api/sweeps/run</InlineCode> に送ります（このエンドポイントは
            Base64 を受け付けません）。
          </p>
          <BulletList
            items={[
              <Fragment key="f20">URL：<InlineCode>https://run.tavnit.io/api/cleaners/YOUR_CLEANER_ID/process</InlineCode></Fragment>,
              "Method：POST、Content-Type：application/json",
            ]}
          />
          <CodeBlock lang="JSON" code={CLEANERS_JSON_EXAMPLE} />
        </DocCard>

        <DocCard icon={<Database size={24} />} title="Buckets API を使う">
          <p>
            ドキュメントを送らずに Bucket に行を送り込むには、書き込みエンドポイントを使います。各行には
            Bucket のすべての列が含まれている必要があります。
          </p>
          <BulletList
            items={[
              <Fragment key="f24">URL：<InlineCode>https://run.tavnit.io/api/buckets/write</InlineCode></Fragment>,
              "Method：POST、Content-Type：application/json",
              <Fragment key="f25">Header：<InlineCode>X-API-Key: YOUR_API_KEY</InlineCode></Fragment>,
            ]}
          />
          <CodeBlock lang="JSON" code={BUCKETS_JSON_EXAMPLE} />
          <InfoBox color="purple" icon={<Info size={20} />} title="Bucket の ID と名前を確認する">
            Bucket の詳細ページを開き、情報アイコンをタップします。どちらの値もワンタップでコピーできます。
          </InfoBox>
        </DocCard>

        <DocCard icon={<ClipboardCheck size={24} />} title="そのほかの機能">
          <p>
            Agent、Matcher、Inspector、Filler、Signal、Subject、Net も同じ方法で開始します。
            <InlineCode>X-API-Key</InlineCode> ヘッダーを付けた HTTP リクエストです。各エンドポイントの
            フィールドは<strong>コード</strong>タブで確認してください。
          </p>
        </DocCard>
      </div>

      <Related
        links={[
          {
            href: "/docs/webhooks",
            label: "webhook で結果を受け取る",
            description: "Run の完了時に Tavnit が送信するペイロードと、受信側の作り方。",
          },
          {
            href: "/docs/mcp-connector",
            label: "MCP コネクタで AI アシスタントを接続する",
            description: "claude.ai、Cursor、そのほかの MCP クライアントから Tavnit を使います。",
          },
          {
            href: "/docs/user-roles",
            label: "ユーザーロールと権限",
            description: "HITL のみのキーでレビューはできても処理はできない理由。",
          },
        ]}
      />
    </section>
  );
}
