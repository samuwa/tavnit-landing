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

/** /ja/docs — translated from src/app/docs/page.tsx. */

/** Mirrors the visible numbered steps under "ステップ 1：Flow を作成する". */
export const schema: DocsPageSchemaData = {
  howTo: {
    name: "Tavnit でドキュメントから構造化データを抽出する",
    description:
      "テンプレート、サンプルドキュメント、またはゼロから Tavnit の Flow を作成し、フィールドを確認し、ドキュメントを処理して構造化された結果を読み取ります。テンプレートを描く必要もコードも不要です。",
    steps: [
      {
        name: "作成ダイアログを開く",
        text: "Flows ページで「Flow を作成」をクリックします。",
      },
      {
        name: "出発点を選ぶ",
        text: "「テンプレートから」（Tavnit のテンプレート、または自分の Flow のコピー）、「AI の提案」（サンプルの PDF または画像をアップロードすると AI がフィールドの下書きを作成）、または「ゼロから始める」を選びます。",
      },
      {
        name: "Flow に名前と説明を付ける",
        text: "Flow に 3 文字以上の名前と、どのドキュメントを扱うかを示す 10 文字以上の説明を付けます。",
      },
      {
        name: "データスキーマを確認する",
        text: "ビルダーでフィールドを追加・編集・削除し、スキーマを必要なとおりに仕上げます。新しい Flow は最初から「有効」です。",
      },
      {
        name: "ドキュメントを処理する",
        text: "「実行」をクリックし、実際のドキュメントを 1 つアップロードして結果を確認します。",
      },
    ],
  },
  primaryImage: {
    url: "/assets/tour2-runs.jpg",
    caption:
      "Tavnit の Runs ページ。処理されたすべてのドキュメントを、その Flow、ソース、ステータスとともに一覧表示します。",
    width: 1327,
    height: 801,
  },
};

export default function GettingStartedJa() {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        はじめに
      </h1>

      <DocCard icon={<Sparkles size={24} />} title="Tavnit でできること">
        <Lead>
          Tavnit はドキュメントを読み取り、構造化データとして返します。必要なフィールドを一度定義し、請求書、領収書、発注書、取引明細書、スプレッドシート、フォームを送るだけで、型付きの行が得られます。レイアウトごとにテンプレートを作る必要も、解析コードを書く必要もありません。
        </Lead>
        <p>
          抽出は製品のすべてではなく、出発点です。その周りで Tavnit は、受信したファイルを仕分けて分割し、行をクリーニングして補強し、ドキュメント同士を比較・照合し、フォームに記入し、人のレビューのために一時停止し、結果をテーブルに保存し、お使いのシステムに配信し、それをもとに操作するブラウザエージェントに引き渡すことができます。このページでは全体像を示し、最初のドキュメントの処理を順を追って説明します。
        </p>
        <InfoBox color="violet" icon={<FlaskConical size={20} />} title="一部の機能はベータ版です">
          Pipelines、Subjects、Matchers、Inspectors、Fillers、Signals、Nets には、アプリ内で
          <strong>ベータ</strong>ラベルが付いています。現在でも使用できますが、画面やオプションは今後変更される可能性があります。
        </InfoBox>
      </DocCard>

      <DocCard icon={<Compass size={24} />} title="Tavnit の全体像">
        <Lead>
          アプリのサイドバーは、ドキュメントの取り込みからデータに基づく操作まで、各機能を役割ごとにグループ分けしています。ドキュメントも同じグループに沿っているので、この表は目次としても使えます。
        </Lead>
        <DataTable
          head={["グループ", "機能", "できること"]}
          rows={[
            [
              "入力",
              <Fragment key="m0">
                <DocLink href="/docs/collections">Collections</DocLink>
              </Fragment>,
              "種類の混在したドキュメントを受け付ける 1 つの受信箱またはエンドポイント。各ドキュメントを分類し、適切な Flow に振り分けます。",
            ],
            [
              "入力",
              <Fragment key="m1">
                <DocLink href="/docs/subjects">Subjects</DocLink>
              </Fragment>,
              "購買や患者などのエンティティをモデル化し、そのドキュメントを参照番号でケースにまとめます。",
            ],
            [
              "入力",
              <Fragment key="m2">
                <DocLink href="/docs/splitters">Splitters</DocLink>
              </Fragment>,
              "複数のドキュメントを含む 1 つのファイルを個別のドキュメントに分割し、それぞれを次の処理に送ります。",
            ],
            [
              "処理",
              <Fragment key="m3">
                <DocLink href="/docs/flows">Flows</DocLink>
              </Fragment>,
              "1 種類のドキュメントのスキーマ。抽出するフィールドと、それに付随するすべての設定です。すべてはここから始まります。",
            ],
            [
              "処理",
              <Fragment key="m4">
                <DocLink href="/docs/cleaners">Cleaners</DocLink>
              </Fragment>,
              "抽出した行の書式変更、変換、計算、参照、検証を行い、問題がありそうなときにアクションを実行します。",
            ],
            [
              "処理",
              <Fragment key="m5">
                <DocLink href="/docs/agents">Agents</DocLink>
              </Fragment>,
              "平易な言葉で書かれたミッションをウェブサイト上で実行するブラウザエージェント。抽出したデータを入力に使うことがよくあります。",
            ],
            [
              "インテリジェンス",
              <Fragment key="m6">
                <DocLink href="/docs/matchers">Matchers</DocLink>
              </Fragment>,
              "ドキュメントをまたいでレコードを行ごとに比較します。見積書同士、請求書とその発注書などです。",
            ],
            [
              "インテリジェンス",
              <Fragment key="m7">
                <DocLink href="/docs/inspectors">Inspectors</DocLink>
              </Fragment>,
              "関連するドキュメント一式に対してチェックリストを実行し、合格または不合格の判定を得ます。",
            ],
            [
              "インテリジェンス",
              <Fragment key="m8">
                <DocLink href="/docs/fillers">Fillers</DocLink>
              </Fragment>,
              "ドキュメントから抽出したデータで PDF フォームのテンプレートに記入します。",
            ],
            [
              "オーケストレーション",
              <Fragment key="m9">
                <DocLink href="/docs/pipelines">Pipelines</DocLink>
              </Fragment>,
              "ビジュアルキャンバス上で、ステップを最初から最後までつなげます。",
            ],
            [
              "オーケストレーション",
              <Fragment key="m10">
                <DocLink href="/docs/pipeline-map">Pipeline マップ</DocLink>
              </Fragment>,
              "ドキュメントが組織内をどう流れるかを 1 枚の図で示します。",
            ],
            [
              "データとアクティビティ",
              <Fragment key="m11">
                <DocLink href="/docs/buckets">Buckets</DocLink>
              </Fragment>,
              "Run をまたいで結果が蓄積されるテーブル。クエリ、グラフ化、エクスポートにすぐ使えます。",
            ],
            [
              "データとアクティビティ",
              <Fragment key="m12">
                <DocLink href="/docs/flows#runs">Runs</DocLink>
              </Fragment>,
              "処理されたすべてのドキュメントの履歴。結果、元のファイル、ログを確認できます。",
            ],
            [
              "データとアクティビティ",
              <Fragment key="m13">
                <DocLink href="/docs/human-in-the-loop">人によるレビュー</DocLink>
              </Fragment>,
              "結果が配信される前に、人が承認・編集・却下するレビューキュー。",
            ],
            [
              "音声",
              <Fragment key="m14">
                <DocLink href="/docs/signals">Signals</DocLink>
              </Fragment>,
              "録音された会話を構造化された行に変換します。",
            ],
            [
              "ソーシャル",
              <Fragment key="m15">
                <DocLink href="/docs/nets">Nets</DocLink>
              </Fragment>,
              "ソーシャルメディアの投稿を構造化された行とトレンドに変換します。",
            ],
          ]}
        />
        <InfoBox color="blue" icon={<Info size={20} />} title="Agents、Signals、Nets が表示されない場合">
          この 3 つの機能は組織ごとに有効化されます。サイドバーに表示されていない場合は、Tavnit
          チームに連絡して有効にしてもらってください。
        </InfoBox>
        <InfoBox color="violet" icon={<Info size={20} />} title="ドキュメントの仕分けにはどれを使う？">
          各ファイルに 1 つのドキュメントが入っているものの種類がわからない場合は、
          <DocLink href="/docs/collections">Collection</DocLink> を使います。1 つのファイルに複数のドキュメントが入っている場合は、<DocLink href="/docs/splitters">Splitter</DocLink>{" "}
          を使います。同じ購買、同じ患者など、ドキュメント同士がひとまとまりになる場合は、
          <DocLink href="/docs/subjects">Subject</DocLink> を使います。ドキュメントの種類がすでにわかっている場合は、Flow に直接送り、この 3 つはどれも使わなくてかまいません。
        </InfoBox>
      </DocCard>

      <DocCard icon={<Rocket size={24} />} title="最初の数分間">
        <Lead>
          新しい組織は短いセットアップの手順から始まるので、空の画面を前に途方に暮れることはほとんどありません。
        </Lead>
        <BulletList
          items={[
            <Fragment key="o0">
              <strong>ウェルカム質問。</strong>組織を作成すると、Tavnit が 4 つの簡単な質問をします。どのようなドキュメントを処理するか、何を実現したいか、現在ドキュメントがどのように届いているか、そして月におよそ何件扱うかです。所要時間は約 30 秒で、
              <strong>スキップ</strong>することもできます。
            </Fragment>,
            <Fragment key="o1">
              <strong>ワンクリックのスターター Flow。</strong>質問に回答した場合、空の Flows ページに
              <em>「回答に基づいて、これらを設定できます：」</em>
              という見出しで、お使いのドキュメントに合うテンプレートが表示されます。
              <strong>これらの Flow を作成</strong>をクリックすると Flow が作成され、すぐに編集できます。
            </Fragment>,
            <Fragment key="o2">
              <strong>スターターテンプレート。</strong>Tavnit には、請求書、発注書、領収書、銀行取引明細書、納品書、検査結果、契約書、見積書、クレジットノート、身分証明書、履歴書向けの既製の Flow が用意されています。回答に合うテンプレートが先頭に表示されます。
            </Fragment>,
            <Fragment key="o3">
              <strong>はじめにガイド。</strong>アプリの隅に表示される小さなパネルで、3 つのタブがあります。<strong>チェックリスト</strong>（完了すると自動でチェックが付くセットアップ手順）、
              <strong>この画面</strong>（今開いているページのヒント）、<strong>機能</strong>
              （利用できるすべての機能）です。非表示にした場合は、<strong>ヘルプとサポート</strong>
              メニューから再び開けます。
            </Fragment>,
          ]}
        />
      </DocCard>

      <DocCard icon={<FilePlus size={24} />} title="ステップ 1：Flow を作成する">
        <Lead>
          Flow は 1 種類のドキュメントのスキーマです。プロジェクト名ではなくドキュメント名を付けてください（<em>Q1 自動化</em>ではなく<em>仕入先請求書</em>）。名前と説明は、Collection がドキュメントをその Flow に振り分ける際の手がかりにもなるからです。
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f5">
              <strong>Flows</strong> ページで<strong>Flow を作成</strong>をクリックします。
            </Fragment>,
            <Fragment key="f6">
              出発点を選びます。<strong>テンプレートから</strong>（Tavnit のテンプレート、または
              <strong>自分の Flow</strong> にある自分の Flow のコピー）、<strong>AI の提案</strong>
              （サンプルの PDF または画像をアップロードすると AI がフィールドの下書きを作成）、または<strong>ゼロから始める</strong>のいずれかです。
            </Fragment>,
            <Fragment key="f7">
              Flow に 3 文字以上の名前と、どのドキュメントを扱うかを示す 10 文字以上の説明を付けます。
            </Fragment>,
            <Fragment key="f8">
              ビルダーでフィールドを追加・編集・削除し、スキーマを必要なとおりに仕上げます。新しい
              Flow は最初から<strong>有効</strong>です。
            </Fragment>,
            <Fragment key="f9">
              <strong>実行</strong>をクリックし、実際のドキュメントを 1 つアップロードして結果を確認します。
            </Fragment>,
          ]}
        />
        <p>
          <DocLink href="/docs/flows">Flows</DocLink> では、これらの各ステップを詳しく説明しています。フィールドの種類、データ型、AI に探す場所を伝えるヒント、そして Flow に実際の Run がたまると修正案を提示する<strong>診断</strong>ボタンです。
        </p>
        <InfoBox color="blue" icon={<Info size={20} />} title="説明が重要です">
          説明は必須で、2 つの点で役立ちます。AI がより正確に抽出できるようになり、
          <DocLink href="/docs/collections">Collection</DocLink> がドキュメントをその Flow に振り分けられるようになります。説明があいまいだと、どちらの精度も下がります。
        </InfoBox>
      </DocCard>

      <DocCard icon={<Table2 size={24} />} title="ステップ 2：メタデータフィールドとテーブルフィールド">
        <Lead>
          Tavnit は、ドキュメントごとに 1 回だけ現れる値と、繰り返し現れる値を区別します。この 1 つの区別が、その後に続くすべての形を決めます。Webhook のペイロード、Bucket の行、CSV はすべてこれに従います。
        </Lead>
        <DataTable
          head={["フィールドの種類", "出現回数", "請求書の場合"]}
          rows={[
            [
              "メタデータフィールド",
              "ドキュメントごとに 1 回",
              "請求書番号、発行日、仕入先、合計",
            ],
            [
              "テーブルフィールド",
              "明細行ごとに 1 回",
              "品目説明、数量、単価、金額",
            ],
          ]}
        />
        <p>
          各フィールドにはデータ型（テキスト、数値、日付、混合／英数字、画像）もあり、これを正しく設定することは見た目以上に重要です。テキスト型の合計は、合算も比較もグラフ化もできません。メタデータフィールドだけの Flow は、ドキュメントごとに 1 行を返します。
          <DocLink href="/docs/flows">Flows</DocLink> では、抽出ヒント、複合フィールド、誤った値が返ってくるフィールドの直し方を含め、スキーマ全体を説明しています。
        </p>
      </DocCard>

      <DocCard icon={<Clock size={24} />} title="ステップ 3：ドキュメントを送る">
        <Lead>
          取り込み方法は 4 つあり、どれも同じ種類の Run を生成します。まず手動アップロードで Flow が動くことを確かめてから、実際にドキュメントが届く経路に合った方法に切り替えましょう。
        </Lead>
        <DataTable
          head={["経路", "向いている用途", "設定"]}
          rows={[
            [
              "アプリでアップロード",
              "テストや単発のドキュメント",
              "不要。複数のファイルを一度に選択でき、それぞれが個別の Run になります",
            ],
            [
              <Fragment key="f10">
                <DocLink href="/docs/email-integration">メール</DocLink>
              </Fragment>,
              "すでに受信箱に届いているドキュメント",
              "Flow のメールトリガーをオンにして、そのアドレスにメールを転送します",
            ],
            [
              <Fragment key="f11">
                <DocLink href="/docs/api-integration">REST API</DocLink>
              </Fragment>,
              "自社のシステムや大量処理",
              "API キーと POST リクエスト 1 つ",
            ],
            [
              <Fragment key="f12">
                <DocLink href="/docs/mcp-connector">MCP コネクタ</DocLink>
              </Fragment>,
              "AI アシスタントからの随時の作業",
              "リクエストに応じて組織ごとに有効化され、その後「連携」からコネクタ URL を取得します",
            ],
          ]}
        />
        <p>
          Flow は PDF、画像（PNG、JPG、JPEG、JFIF）、スプレッドシート（XLSX、XLS、CSV）を受け付けます。スプレッドシートの場合、Flow は最初に表示されているシートを読み取ります。スキャンされたドキュメントは自動で検出され、OCR で読み取られます。
        </p>
        <Screenshot
          src="/assets/tour2-runs.jpg"
          alt="Tavnit の Runs ページ。処理されたドキュメントが、それぞれの Flow、実行したユーザー、ソース、ステータスとともに一覧表示され、その上に完了した Run、実行中の Run、Run の総数を示す集計タイルが並んでいます。"
          caption="すべてのドキュメントが Run になります。Runs ページでは、何が処理され、どのように届き、どう終わったかを確認できます。"
        />
        <p>
          任意の Run を開くと、抽出されたフィールドが元のドキュメントと並んで表示され、処理中に何が起きたかを示すログも確認できます。結果が期待どおりでないときは、まずこのログを確認してください。
        </p>
      </DocCard>

      <DocCard icon={<Map size={24} />} title="次のステップ">
        <Lead>
          抽出がうまく動いたら、次のステップは、データのどこに問題があるか、またはデータで何をする必要があるかによって変わります。
        </Lead>
        <DataTable
          head={["やりたいこと", "読むページ"]}
          rows={[
            [
              "抽出するフィールドを増やしたい、または誤った値が返ってくるフィールドを直したい",
              <Fragment key="f17">
                <DocLink href="/docs/flows">Flows</DocLink>
              </Fragment>,
            ],
            [
              "書式を整えたい、通貨を換算したい、合計を計算したい、または問題のある行にフラグを付けたい",
              <Fragment key="f18">
                <DocLink href="/docs/cleaners">Cleaners</DocLink>
              </Fragment>,
            ],
            [
              "結果をどこかに送る前に人に確認してもらいたい",
              <Fragment key="f19">
                <DocLink href="/docs/human-in-the-loop">人によるレビュー</DocLink>
              </Fragment>,
            ],
            [
              "データを自社のシステムに取り込みたい",
              <Fragment key="f20">
                <DocLink href="/docs/webhooks">Webhooks</DocLink> または{" "}
                <DocLink href="/docs/api-integration">REST API</DocLink>
              </Fragment>,
            ],
            [
              "結果をまとめて保管し、クエリしたい",
              <Fragment key="f21">
                <DocLink href="/docs/buckets">Buckets</DocLink>
              </Fragment>,
            ],
            [
              "ドキュメントを比較したい、またはルールの一覧と照合したい",
              <Fragment key="f24">
                <DocLink href="/docs/matchers">Matchers</DocLink> と{" "}
                <DocLink href="/docs/inspectors">Inspectors</DocLink>
              </Fragment>,
            ],
            [
              "複数のステップを 1 つのプロセスにつなげたい",
              <Fragment key="f25">
                <DocLink href="/docs/pipelines">Pipelines</DocLink>
              </Fragment>,
            ],
            [
              "ウェブ上の別の場所でデータに基づいて操作したい",
              <Fragment key="f22">
                <DocLink href="/docs/agents">Agents</DocLink>
              </Fragment>,
            ],
            [
              "誰が何を閲覧・変更できるかを管理したい",
              <Fragment key="f23">
                <DocLink href="/docs/user-roles">ユーザーロール</DocLink>
              </Fragment>,
            ],
          ]}
        />
      </DocCard>

      <Related
        links={[
          {
            href: "/docs/flows",
            label: "Flow のデータスキーマを詳しく構築する",
            description:
              "フィールドの種類、データ型、抽出ヒント、複合フィールド、Run、そして Flow に追加できるすべての機能。",
          },
          {
            href: "/docs/api-integration",
            label: "Tavnit REST API でドキュメントを処理する",
            description:
              "マルチパートと base64 によるアップロード、API キー認証、Python と JavaScript の例、ノーコードのレシピ。",
          },
          {
            href: "/docs/email-integration",
            label: "メールの添付ファイルから抽出する",
            description: "Flow に専用の受信箱を用意し、そこにドキュメントを転送します。",
          },
          {
            href: "/docs/pipeline-map",
            label: "すべてのつながりを確認する",
            description:
              "Flows、Collections、Splitters、Cleaners、Buckets のライブマップ。",
          },
        ]}
      />
    </section>
  );
}
