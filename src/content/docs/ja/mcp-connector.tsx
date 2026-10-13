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

/** /ja/docs/mcp-connector — translated from src/app/docs/mcp-connector/page.tsx. */

/** Mirrors the numbered steps rendered under "claude.ai を接続する". */
export const schema: DocsPageSchemaData = {
  howTo: {
    name: "MCP コネクタで Tavnit を claude.ai に接続する",
    description:
      "連携ページで Tavnit のコネクタ URL を生成し、claude.ai にカスタムコネクタとして追加すると、アシスタントが Tavnit のデータを扱えるようになります。",
    steps: [
      {
        name: "Tavnit で連携を開く",
        text: "Tavnit アプリにサインインし、サイドバーから連携を開きます。アシスタントにアクセスさせたいデータを持つ組織にいることを確認してください。",
      },
      {
        name: "コネクタ URL を生成する",
        text: "カスタムコネクタのカードで「コネクタ URL を生成」を選択します。Tavnit はお使いの API キーから URL を発行し、作成日時と有効期限を表示します。",
      },
      {
        name: "URL をコピーする",
        text: "コピーボタンでコネクタ URL をコピーします。パスワードと同じように扱ってください。",
      },
      {
        name: "claude.ai にカスタムコネクタとして追加する",
        text: "claude.ai で Settings、Connectors、Add custom connector の順に開き、URL を貼り付けます。カスタムコネクタには Claude Pro 以上のプランが必要です。",
      },
      {
        name: "接続を確認する",
        text: "新しいチャットを開始し、使える Tavnit のツールをアシスタントに尋ねます。ツールが一覧表示されれば、コネクタは有効です。",
      },
    ],
  },
};

export default function McpConnectorJa() {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        MCP コネクタ
      </h1>

      <DocCard icon={<Plug size={24} />} title="MCP コネクタでできること">
        <Lead>
          MCP コネクタは、Tavnit の組織を AI アシスタントの中のツールとして追加します。接続すると、
          Tavnit のデータについて普段の言葉でアシスタントに質問でき、アシスタントは推測ではなく実際の
          アカウントのデータをもとに答えます。
        </Lead>
        <p>
          MCP（Model Context Protocol）は、AI アシスタントが外部のツールを呼び出すためのオープン標準です。
          Tavnit は <InlineCode>mcp.tavnit.io</InlineCode> で MCP サーバーを運用しており、コネクタ URL
          はクライアントをお使いの組織に向けるための認証情報です。<strong>claude.ai</strong>（Pro
          以上）、<strong>Cursor</strong>、そしてリモート MCP サーバーの URL を受け付けるあらゆるクライアントで
          動作します。
        </p>
        <p>
          コネクタの用途や、ファイルをチャットに貼り付ける方法との違いについては、
          <Link href={localizedPath("/integrations/mcp", "ja")} className="text-accent hover:underline">
            MCP コネクタの概要
          </Link>
          をご覧ください。
        </p>
        <InfoBox color="blue" icon={<Info size={20} />} title="リクエストに応じて有効化">
          コネクタは組織ごとに有効化されます。連携ページにカスタムコネクタのカードが表示されない場合は、
          サポートに連絡して組織で有効にしてもらってください。
        </InfoBox>
      </DocCard>

      <DocCard icon={<KeyRound size={24} />} title="始める前に">
        <Lead>
          必要なものは 3 つです。コネクタが有効になっている組織、お使いの API キー、そして MCP
          クライアントです。コネクタはご自身のキーから発行されるため、生成したときにいた組織にしか
          アクセスできず、アシスタントはそのキーで操作します。
        </Lead>
        <DataTable
          head={["必要なもの", "入手場所"]}
          rows={[
            [
              "カスタムコネクタのカード",
              <Fragment key="f0">
                <strong>連携</strong>ページにあります。組織でコネクタが有効になっている場合にのみ表示されます。
                見当たらない場合はサポートにお問い合わせください。
              </Fragment>,
            ],
            [
              "お使いの API キー",
              <Fragment key="f1">
                同じページの <strong>API キー</strong>カードです。キーはメンバーごと、組織ごとに 1 つです。
                <em>API キーが見つかりません。もう一度ログインしてください。</em>と表示される場合は、
                サインアウトしてから再度サインインしてください。
              </Fragment>,
            ],
            [
              "MCP クライアント",
              <Fragment key="f2">
                Pro 以上のプランの claude.ai、Cursor、またはリモート MCP サーバーの URL を受け付ける任意の
                クライアントです。
              </Fragment>,
            ],
            [
              "あなたのロール",
              <Fragment key="f3">
                アシスタントはあなたの API キーを使うため、そのキーでできることしかできません。たとえば
                <strong>HITL のみ</strong>ロールのキーは、処理のリクエストで拒否されます。
                <DocLink href="/docs/user-roles">ユーザーロール</DocLink>と
                <DocLink href="/docs/api-integration">API のページ</DocLink>をご覧ください。
              </Fragment>,
            ],
          ]}
        />
      </DocCard>

      <DocCard icon={<Settings2 size={24} />} title="claude.ai を接続する">
        <Lead>
          Tavnit で URL を生成し、claude.ai にカスタムコネクタとして貼り付けます。インストールするものも、
          編集する設定ファイルもありません。
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f4">
              Tavnit のサイドバーで<strong>連携</strong>を開きます。まず組織の切り替えを確認してください。
              コネクタは、そのときにいる組織に紐づきます。
            </Fragment>,
            <Fragment key="f5">
              <strong>カスタムコネクタ</strong>のカードで<strong>コネクタ URL を生成</strong>を選択します。
            </Fragment>,
            <Fragment key="f6">コピーボタンで URL をコピーします。</Fragment>,
            <Fragment key="f7">
              claude.ai で <strong>Settings → Connectors → Add custom connector</strong>{" "}
              を開き、URL を貼り付けます。
            </Fragment>,
            <Fragment key="f8">
              新しいチャットを開き、使える Tavnit のツールをアシスタントに尋ねます。ツールが一覧表示されれば、
              コネクタは有効です。
            </Fragment>,
          ]}
        />
      </DocCard>

      <DocCard icon={<Settings2 size={24} />} title="Cursor やほかの MCP クライアントを接続する">
        <Lead>
          リモート MCP サーバーに対応したクライアントなら、同じ URL を使えます。コマンド型ではなく、リモート
          （URL）サーバーとして追加してください。コネクタはホストされたサーバーを指しているため、ローカルで
          実行するプロセスはありません。
        </Lead>
        <NumberedList
          items={[
            "上記と同じ手順で、連携ページからコネクタ URL を生成してコピーします。",
            <Fragment key="f9">
              Cursor で MCP の設定を開き、<strong>remote</strong> / URL タイプの新しいサーバーを追加します。
            </Fragment>,
            <Fragment key="f10">
              コネクタ URL をサーバー URL として貼り付けます。URL に認証情報が含まれているため、API
              キーの欄を別に用意する必要はありません。
            </Fragment>,
            "クライアントを再読み込みし、ツールの一覧に Tavnit が表示されることを確認します。",
          ]}
        />
        <InfoBox color="blue" icon={<Info size={20} />} title="1 つの URL を複数のクライアントで">
          コネクタ URL は一度に 1 つだけ持てますが、複数のクライアントに貼り付けられます。どのクライアントも
          同じ組織であなたとして操作するため、更新するとすべてのクライアントの接続が一度に切れます。
        </InfoBox>
      </DocCard>

      <DocCard icon={<Sparkles size={24} />} title="アシスタントにできること">
        <Lead>
          コネクタを通じて、アシスタントはあなたの API キーを使って組織の Tavnit データを扱います。Flow、
          Cleaner、Pipeline、チームの構築や設定はアプリで行います。
        </Lead>
        <p>
          コネクタが提供するツールは MCP クライアントに一覧表示されます。いちばん早く確認する方法は、
          アシスタントに尋ねることです。普段の言葉で質問し、対象の Flow、Bucket、Run はアプリでの表示名で
          指定してください。
        </p>
        <InfoBox color="blue" icon={<Info size={20} />} title="あなたのデータ、あなたの組織">
          コネクタがアクセスできるのは、生成した組織だけです。別の組織で作業するには、Tavnit でその組織に
          切り替え、そこで URL を生成してください。アシスタントから開始した処理も、ほかの Run と同じように
          設定に従います。Flow が<DocLink href="/docs/human-in-the-loop">人によるレビュー</DocLink>
          を求める場合、Run はそのレビューを待ちます。
        </InfoBox>
      </DocCard>

      <DocCard icon={<RefreshCw size={24} />} title="有効期限と更新">
        <Lead>
          コネクタ URL には有効期限があります。カスタムコネクタのカードには URL の作成日時と残りの有効期間が
          表示され、最後の 24 時間になると警告が出ます。更新すると新しい URL が発行され、古い URL はすぐに
          無効になります。
        </Lead>
        <DataTable
          head={["状態", "表示される内容", "対応"]}
          rows={[
            [
              "有効",
              <Fragment key="s0">URL、<em>作成日時</em>、<em>有効期限までの日数</em>。</Fragment>,
              "対応は不要です。",
            ],
            [
              "まもなく期限切れ（残り 24 時間未満）",
              <Fragment key="f16">
                時間または分単位の残り時間と、黄色のお知らせ：
                <em>コネクタの有効期限が近づいています — 中断を避けるため今すぐ更新してください。</em>
              </Fragment>,
              "更新し、その URL を使っているすべてのクライアントに新しい URL を貼り付けます。",
            ],
            [
              "期限切れ",
              <Fragment key="f17">
                赤色のお知らせ：
                <em>このコネクタは期限切れです。更新して新しい URL を生成してください。</em>
              </Fragment>,
              "更新して貼り直します。古い URL を使っているクライアントはすでに動作していません。",
            ],
          ]}
        />
        <p>
          更新するには <strong>URL を更新</strong>を選択し、<em>コネクタ URL を更新しますか？</em>
          ダイアログで<strong>更新</strong>を選んで確定します。
        </p>
        <WarningBox>
          更新は、段階的に切り替えられるローテーションではありません。確定した瞬間に以前の URL は動作しなくなり、
          それを使っているアシスタントは新しい URL を貼り付けるまですべて失敗します。クライアントをすぐに
          更新できるときに実行してください。
        </WarningBox>
      </DocCard>

      <DocCard icon={<AlertTriangle size={24} />} title="URL はパスワードと同じように扱う">
        <Lead>
          コネクタ URL は認証情報です。URL を持っている人は誰でも、サインインせずにあなたとして組織の
          データにアクセスできます。MCP クライアントの設定に貼り付けるのは安全ですが、チケット、
          チャットのメッセージ、スクリーンショットで共有するのは安全ではありません。
        </Lead>
        <BulletList
          items={[
            "リポジトリにコミットしたり、共有ドキュメントに貼り付けたりしないでください。",
            "スクリーンショットを共有する前に、URL をぼかすか切り取ってください。",
            "漏えいした場合はすぐに更新してください。漏れた URL はその場で無効になります。",
            "API キーの再生成は、同じページにある別の操作です。キー自体が漏れた可能性がある場合は、こちらも実行してください。",
          ]}
        />
      </DocCard>

      <DocCard icon={<LifeBuoy size={24} />} title="トラブルシューティング">
        <Lead>
          コネクタの問題のほとんどは、次の 4 つのいずれかです。機能が有効になっていない、セッションが
          切れている、URL の有効期限が切れている、または更新で置き換えられた URL をクライアントが使い
          続けている、のいずれかです。
        </Lead>
        <DataTable
          head={["症状", "原因", "対処法"]}
          rows={[
            [
              "連携にカスタムコネクタのカードがない",
              "組織でコネクタが有効になっていません。",
              "サポートに連絡して有効にしてもらってください。",
            ],
            [
              <Fragment key="f18"><InlineCode>カスタムコネクタには有効な Tavnit セッションが必要です。一度サインアウトしてから再度サインインしてください。</InlineCode></Fragment>,
              "URL の発行または読み取りのために、Tavnit がキーを検証できませんでした。",
              "サインアウトしてから再度サインインし、もう一度 URL を生成してください。",
            ],
            [
              "アシスタントから Tavnit が見えなくなった",
              "URL の有効期限が切れたか、誰かが更新しました。",
              "カードに期限切れまたは期限間近のお知らせがないか確認し、更新して、すべてのクライアントに貼り直してください。",
            ],
            [
              "アシスタントが別のデータを参照している",
              "別の組織にいるときに URL が生成されました。",
              "Tavnit で組織を切り替え、新しい URL を生成して古い URL と置き換えてください。",
            ],
            [
              "アシスタントが操作を実行できない",
              "あなたのロールでは許可されていません。",
              "コネクタの不具合を疑う前に、ご自身のロールを確認してください。",
            ],
          ]}
        />
      </DocCard>

      <DocCard icon={<MessageSquare size={24} />} title="API ではなくコネクタを使う場面">
        <Lead>
          会話形式のその場の作業、たとえば単発の質問、保存済みデータの探索、ちょっとした確認には
          コネクタを使います。定期実行するもの、大量に処理するもの、ほかのシステムに組み込むもので、
          明示的なエラー処理や再試行が必要な場合は REST API を使います。
        </Lead>
        <DataTable
          head={["状況", "使うもの"]}
          rows={[
            ["同僚から、あるサプライヤーが前四半期にいくら請求したかを聞かれた", "MCP コネクタ"],
            ["チャットでデータを探索したい", "MCP コネクタ"],
            ["ベンダーポータルからの請求書をすべて、毎晩処理したい", "REST API またはメールトリガー"],
            ["自社の製品で抽出データが必要", "REST API と webhook"],
          ]}
        />
      </DocCard>

      <Related
        links={[
          {
            href: "/docs/api-integration",
            label: "Tavnit REST API リファレンス",
            description:
              "すべてのエンドポイントを、API キー認証、リクエストフィールド、レスポンス、Python と JavaScript の例とともに紹介します。",
          },
          {
            href: "/docs/buckets",
            label: "抽出データを Buckets に保存する",
            description: "抽出したデータを格納する構造化テーブルです。",
          },
          {
            href: "/docs/user-roles",
            label: "ユーザーロールと権限",
            description: "オーナー、管理者、メンバー、HITL のみのそれぞれができること。",
          },
        ]}
      />
    </section>
  );
}
