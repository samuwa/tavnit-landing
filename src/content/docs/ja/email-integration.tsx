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

/** /ja/docs/email-integration — translated from src/app/docs/email-integration/page.tsx. */

/** Mirrors the visible numbered steps under "メールトリガーをオンにする". */
export const schema: DocsPageSchemaData = {
  howTo: {
    name: "Tavnit のメールトリガーでメールの添付ファイルからデータを抽出する",
    description:
      "Tavnit の Flow でメールトリガーを有効にすると専用の受信箱アドレスが発行されるので、そこにドキュメントを転送します。サポートされている添付ファイルは、それぞれが個別の抽出 Run になります。",
    steps: [
      {
        name: "Flow を開く",
        text: "Tavnit アプリで Flows を開き、ドキュメントを受け取らせたい Flow を開きます。",
      },
      {
        name: "メールトリガーを有効にする",
        text: "Flow の詳細ページでメールトリガーのパネルを開き、オンにします。Flow の受信箱のアドレスが表示されます。",
      },
      {
        name: "アドレスをコピーする",
        text: "受信箱のアドレスの横にあるコピーをクリックします。必要に応じて、同じパネルで許可された送信者を追加したり、メール本文を処理をオンにしたりします。",
      },
      {
        name: "テスト用のドキュメントを送る",
        text: "PDF を 1 つだけアドレスにメールで送り、Runs ページを確認します。ソースがメールの新しい Run が表示されます。",
      },
      {
        name: "転送を自動化する",
        text: "テストがうまくいったら、メールクライアントや共有受信箱に、該当するメッセージをこのアドレスへ自動転送するルールを追加します。",
      },
    ],
  },
};

export default function EmailIntegrationJa() {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        メール連携
      </h1>

      <DocCard icon={<Mail size={24} />} title="メール処理のしくみ">
        <Lead>
          Tavnit の Flow は、それぞれ専用の受信箱アドレスを持てます。メールトリガーを有効にしてそのアドレスにドキュメントを送ると、Tavnit はサポートされている添付ファイルごとに個別の抽出 Run を作成し、アプリでアップロードした場合とまったく同じように処理します。
        </Lead>
        <p>
          インストールするものはなく、メールボックスを定期的に確認する仕組みもありません。アドレスにメールを転送すれば、Tavnit が反応します。そのため、「請求書がメールで届く」状態から「請求書が構造化された行として届く」状態への最短ルートであり、コードは一切必要ありません。Collections、Splitters、
          Pipelines、Matchers、Subjects にもそれぞれ専用のアドレスがあります。
        </p>
        <BulletList
          items={[
            "受信箱から請求書や領収書をそのまま転送する",
            "自動転送ルールを設定した買掛金の共有メールボックス",
            "サプライヤーに Tavnit のログインを渡さずにドキュメントを送ってもらう",
            "添付ファイルのない注文確認メールなど、メッセージ本文に届くデータを抽出する",
          ]}
        />
      </DocCard>

      <DocCard icon={<ExternalLink size={24} />} title="メールトリガーをオンにする">
        <Lead>
          トリガーは初期状態ではオフです。Flow の詳細ページでオンにし、表示されたアドレスをコピーして、転送ルールを向ける前にドキュメントを 1 つ送ってテストしてください。
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f0">
              <strong>Flows</strong> を開き、ドキュメントを受け取らせたい Flow を開きます。
            </Fragment>,
            <Fragment key="f1">
              <strong>メールトリガー</strong>のパネルを開き、オンにします。Flow の<strong>受信箱のアドレス</strong>が表示されます。
            </Fragment>,
            <Fragment key="f2">
              アドレスの横にある<strong>コピー</strong>をクリックします。同じパネルで<strong>許可された送信者</strong>を追加したり、<strong>メール本文を処理</strong>
              をオンにしたりできます（どちらも後述）。
            </Fragment>,
            <Fragment key="f3">
              PDF を 1 つ送り、<strong>Runs</strong> ページを確認します。ソースが<strong>メール</strong>
              の新しい Run が表示され、送信者のアドレスが Run に記録されます。
            </Fragment>,
            "うまくいったら、メールクライアントや共有受信箱に転送ルールを追加します。",
          ]}
        />
        <InfoBox color="blue" icon={<Info size={20} />} title="添付ファイル 1 つにつき 1 つの Run">
          請求書が 3 つ添付されたメールからは、別々の Run が 3 つ作成されます。それぞれに独自の結果があり、
          Runs の一覧にもそれぞれ 1 行ずつ表示されます。3 つのドキュメントを含む 1 つの Run にはなりません。
        </InfoBox>
        <WarningBox>
          トリガーがオフになっているアドレス（または無効な Collection）に送られたメールは、受け付けられたうえで破棄されます。送信者にはバウンスもエラーも届きません。ドキュメントが消えたように見える場合は、まずトグルを確認してください。
        </WarningBox>
      </DocCard>

      <DocCard icon={<ShieldCheck size={24} />} title="許可された送信者">
        <Lead>
          初期状態では、どの送信者もアドレスにメールを送るだけで Run を開始できます。メールトリガーのパネルで<strong>許可された送信者</strong>にアドレスを追加すると、その送信者だけが受け付けられ、それ以外からのメールは通知なしに破棄されます。
        </Lead>
        <BulletList
          items={[
            "登録するのはドメインではなく、完全なメールアドレスです。照合では大文字と小文字の違いや表示名は無視されます。",
            "一覧を空のままにすると、どの送信者からのメールも受け付けます。",
            "この一覧は、Flow、Collections、Splitters、Pipelines、Matchers、Subjects のメールトリガーで使えます。",
            <Fragment key="f4">
              共有メールボックス経由で転送する場合、Tavnit から見える送信者は通常、転送しているメールボックスです。許可するのはそのアドレスです。
            </Fragment>,
          ]}
        />
      </DocCard>

      <DocCard icon={<Mail size={24} />} title="メール本文を処理する">
        <Lead>
          添付ファイルとして届かないデータもあります。注文確認、予約の通知、メッセージ本文に数量を書いてくるサプライヤーなどです。<strong>メール本文を処理</strong>をオンにすると、Tavnit はメッセージ本文を PDF
          に変換し、ほかのドキュメントと同じように処理します。Flow と Collections で使えます。
        </Lead>
        <DataTable
          head={["モード", "動作"]}
          rows={[
            [
              <Fragment key="f5"><strong>添付ファイルがない場合のみ</strong>（既定）</Fragment>,
              "メールにドキュメントの添付ファイルがない場合にのみ、本文を処理します。請求書に添えられた「添付をご確認ください」といった送り状はスキップされるため、1 通のメールで 2 つの Run が始まることはありません。",
            ],
            [
              <Fragment key="f6"><strong>常に</strong></Fragment>,
              "すべての添付ファイルと並行して本文も処理し、それぞれを個別の Run にします。",
            ],
          ]}
        />
        <BulletList
          items={[
            "本文の PDF はほかのドキュメントと同じようにレビューに表示され、その Run にはメール本文から作成されたことが記録されます。",
            "引用された返信のやり取りや署名は、メールプロバイダーが識別できる範囲で取り除かれます。",
            "メッセージ内の画像は読み取られません。本文を処理するかどうかの判断では、インラインの署名画像は添付ファイルとして数えられません。",
            "ほとんどテキストのない本文（「了解です」「ありがとうございます」、空の転送など）は処理されません。",
          ]}
        />
      </DocCard>

      <DocCard icon={<AtSign size={24} />} title="メールアドレスを持つ機能">
        <Lead>
          メールトリガーは Flow だけのものではありません。1 つのドキュメントタイプの代わりに、仕分けの段階全体、
          Pipeline、比較処理にアドレスを向けることもできます。
        </Lead>
        <DataTable
          head={["送信先", "アドレスの形式", "動作"]}
          rows={[
            [
              "Flow",
              <Fragment key="f7"><InlineCode>flow-name-&lt;id&gt;@mg.tavnit.io</InlineCode></Fragment>,
              "各添付ファイルをその Flow が抽出します。",
            ],
            [
              "Collection",
              <Fragment key="f8"><InlineCode>name-&lt;id&gt;-collection@mg.tavnit.io</InlineCode></Fragment>,
              <Fragment key="f9">
                各添付ファイルを分類し、適切な Flow または Splitter に振り分けます。<DocLink href="/docs/collections">Collections によるドキュメントの振り分け</DocLink>
                をご覧ください。
              </Fragment>,
            ],
            [
              "Splitter",
              <Fragment key="f10"><InlineCode>&lt;id&gt;-splitter@mg.tavnit.io</InlineCode></Fragment>,
              <Fragment key="f11">
                各添付ファイルを、まず個別のドキュメントに分割します。<DocLink href="/docs/splitters">複数ドキュメントを含むファイルの分割</DocLink>
                をご覧ください。
              </Fragment>,
            ],
            [
              "Pipeline",
              <Fragment key="f12"><InlineCode>&lt;id&gt;-pipeline@mg.tavnit.io</InlineCode></Fragment>,
              <Fragment key="f13">
                PDF または画像の添付ファイル 1 つにつき、1 回の実行が始まります。<DocLink href="/docs/pipelines">Pipelines</DocLink> をご覧ください。
              </Fragment>,
            ],
            [
              "Matcher",
              <Fragment key="f14"><InlineCode>&lt;id&gt;-matcher@mg.tavnit.io</InlineCode></Fragment>,
              <Fragment key="f15">
                1 通のメールに添付された PDF や画像はすべて、1 回のマッチでまとめて比較され（常にマルチラテラルモード）、結果は同じスレッドに返信されます。<DocLink href="/docs/matchers">Matchers</DocLink> をご覧ください。
              </Fragment>,
            ],
            [
              "Subject",
              <Fragment key="f16"><InlineCode>&lt;id&gt;-subject@mg.tavnit.io</InlineCode></Fragment>,
              <Fragment key="f17">
                各添付ファイルは、件名、本文、ファイル名に含まれる参照番号、またはケース専用のプラスアドレスによって、適切なケースに登録されます。<DocLink href="/docs/subjects">Subjects</DocLink>
                をご覧ください。
              </Fragment>,
            ],
          ]}
          caption="正確なアドレスは各機能のメールトリガーのパネルからコピーしてください。上記の形式は見分けるための目安です。"
        />
        <InfoBox color="violet" icon={<Workflow size={20} />} title="サプライヤーにはどのアドレスを使ってもらうべきか">
          送信者が常に 1 種類のドキュメントだけを送るなら、Flow のアドレスを渡します。請求書、発注書、納品書など複数の種類を送るなら、Collection のアドレスを渡して Tavnit に仕分けさせます。複数のドキュメントを含む
          PDF を 1 つ送ってくるなら、Splitter のアドレスを渡します。
        </InfoBox>
      </DocCard>

      <DocCard icon={<Paperclip size={24} />} title="Tavnit が受け付けるファイル">
        <Lead>
          Flows、Collections、Splitters、Subjects は、PDF、一般的な画像、スプレッドシートを読み取ります。
          Pipelines と Matchers が読み取るのは PDF と画像だけです。メッセージ内のそれ以外のものは、ほかの処理を失敗させずにスキップされます。サポートされていないファイルが 1 つあっても、ほかの添付ファイルの処理は止まりません。
        </Lead>
        <DataTable
          head={["受け付ける形式", "拡張子"]}
          rows={[
            ["PDF ドキュメント", <Fragment key="f18"><InlineCode>.pdf</InlineCode></Fragment>],
            [
              "画像",
              <Fragment key="f19"><InlineCode>.png .jpg .jpeg .jfif .tif .tiff .webp .bmp .gif</InlineCode></Fragment>,
            ],
            [
              "スプレッドシート（Pipelines と Matchers を除く）",
              <Fragment key="f20"><InlineCode>.xlsx .xls .csv</InlineCode></Fragment>,
            ],
          ]}
        />
        <p>次のいずれかに当てはまる添付ファイルは、処理されずにスキップされます。</p>
        <DataTable
          head={["スキップされる理由", "具体例"]}
          rows={[
            [
              "サポートされていないファイル形式",
              "Word ドキュメント、アーカイブ、.eml 形式の転送、認識できる拡張子のないファイル。",
            ],
            ["空の添付ファイル", "0 バイトのファイル。たいていは転送の失敗によるものです。"],
            [
              "読み取れないファイル",
              "拡張子は有効でも開けないファイル。途中で切れたダウンロード、名前を変更したファイル、解析できないスプレッドシートなどです。",
            ],
          ]}
        />
        <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="署名の画像も添付ファイルとして扱われる">
          メールの署名にあるロゴは画像の添付ファイルとして届くことが多く、Flow はほかの画像と同じように処理します。不要な Run が作成される場合は、ドキュメントだけを転送するか、許可された送信者とインライン画像を取り除く転送ルールを組み合わせてください。
        </InfoBox>
        <p>
          添付ファイルのサイズ制限は、Tavnit がメッセージを受け取る前に、お使いのメールプロバイダー側で適用されます。大きなスキャンデータが送信側で戻ってくる場合は、アプリでアップロードするか、<DocLink href="/docs/api-integration">REST API</DocLink> に送信してください。
        </p>
      </DocCard>

      <DocCard icon={<FileSpreadsheet size={24} />} title="スプレッドシートの扱い">
        <Lead>
          スプレッドシートの添付ファイルは、インポートする表としてではなく、ドキュメントとして扱われます。どう処理されるかは送信先によって異なります。
        </Lead>
        <DataTable
          head={["送信先", "Tavnit の処理"]}
          rows={[
            [
              "Flow",
              "最初の表示シートから抽出します。",
            ],
            [
              "Collection",
              "最初のシートでファイルを分類し、選ばれた Flow に渡します。その Flow は最初の表示シートを読み取ります。",
            ],
            [
              "Splitter",
              "表示されている空でないシートをそれぞれ個別のドキュメントとして扱い、1 枚ずつ分類して、1 シートのファイルとして先に送ります。",
            ],
          ]}
        />
        <p>
          非常に大きなシートはエラーで拒否されます。スプレッドシートを構造化された行として読み込みたい場合は、<DocLink href="/docs/cleaners">Cleaner</DocLink> の Sweep を使ってください。
        </p>
      </DocCard>

      <DocCard icon={<Copy size={24} />} title="重複の防止">
        <Lead>
          メールサーバーは、タイムアウトの後などに同じメッセージを複数回配信することがあります。Tavnit は同じアドレスへの再配信メッセージを認識して再処理しないため、再送によって Run が重複することはありません。
        </Lead>
        <BulletList
          items={[
            "Tavnit は数秒以内にメッセージの受信を確認し、添付ファイルはバックグラウンドで処理します。そのため、添付ファイルの多いメールも安心して送れます。",
            "処理が中断された場合は、最初からやり直すのではなく、中断したところから再開します。",
            "1 通のメッセージを Tavnit の 2 つの異なるアドレスに送った場合は、それぞれのアドレスで 1 回ずつ処理されます。",
            "同じファイルを新しいメールで送り直すと新しいメッセージとして扱われ、もう一度処理されます。",
          ]}
        />
      </DocCard>

      <DocCard icon={<Send size={24} />} title="結果をメールで送り返す">
        <Lead>
          メール出力は帰り道にあたる機能です。Run が正常に完了すると、Tavnit は設定したアドレスに結果をメールで送ります。メールトリガーとは独立しているため、どちらか一方だけを使うことも、両方を使って「送る→受け取る」の流れを完結させることもできます。
        </Lead>
        <NumberedList
          items={[
            "Flow の詳細ページを開きます。",
            <Fragment key="f21">
              <strong>メール出力</strong>のパネルを開きます。
            </Fragment>,
            <Fragment key="f22">
              <strong>受信者のアドレス</strong>を 1 つ以上追加します。
            </Fragment>,
            <Fragment key="f23">
              <strong>添付ファイル</strong>で各メッセージに含める内容を選び、保存します。
            </Fragment>,
          ]}
        />
        <DataTable
          head={["オプション", "届く内容"]}
          rows={[
            ["JSON の抽出結果", "抽出結果を整形した JSON としてメッセージ本文に記載します。"],
            [
              "CSV の抽出結果",
              <Fragment key="f24">
                行を <InlineCode>rows.csv</InlineCode> の添付ファイルとして送ります。結果をスプレッドシートに取り込むいちばん早い方法です。
              </Fragment>,
            ],
            ["フォームの結果", "Flow がフォームテンプレートに入力する場合の、入力済みの PDF。"],
            [
              "元のドキュメント",
              "処理したソースファイル（PDF、画像、スプレッドシート）を、結果と一緒に添付します。",
            ],
          ]}
        />
        <InfoBox color="purple" icon={<Code2 size={20} />} title="ファイルのフィールドはリンクとして届く">
          ファイルや画像を保持するフィールドは JSON に埋め込まれず、有効期限付きのリンクとして届きます。Tavnit は保存したドキュメントを非公開にしているため、ストレージの生のパスでは受信箱から取得できないからです。
        </InfoBox>
        <BulletList
          items={[
            "出力メールが送られるのは、正常に完了した Run だけです。失敗した Run では何も送られません。",
            "件名には Flow 名と Run ごとの詳細が入るため、メールクライアントが Flow のすべての Run を 1 つのスレッドにまとめてしまうことはありません。",
            <Fragment key="f25">
              Flow で<DocLink href="/docs/human-in-the-loop">人によるレビュー</DocLink>
              が有効になっている場合、メールはレビュアーが Run を承認するまで送られません。
            </Fragment>,
            <Fragment key="f26">
              システム間での受け渡しには、メールよりも<DocLink href="/docs/webhooks">webhook</DocLink>
              が適しています。
            </Fragment>,
          ]}
        />
      </DocCard>

      <DocCard icon={<Workflow size={24} />} title="実例：買掛金の受信箱">
        <Lead>
          よくある構成は、すでにサプライヤーの請求書を受け取っている共有メールボックスから Collection に転送し、サプライヤーごとの書式を適切な Flow に振り分け、結果を経理チームにメールで送りつつ Bucket にも送り込むというものです。
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f27">
              受け取るドキュメントタイプごとに Flow を 1 つずつ作成します。たとえば<em>サプライヤーの請求書</em>と<em>納品書</em>です。それぞれにわかりやすい説明を付けてください。
            </Fragment>,
            <Fragment key="f28">
              両方の Flow を <DocLink href="/docs/collections">Collection</DocLink> に入れ、Collection
              のメールトリガーを有効にします。共有メールボックスを許可された送信者に追加します。
            </Fragment>,
            <Fragment key="f29">
              共有メールボックスで、サプライヤーのドメインから届いた添付ファイル付きのメッセージを、すべて
              Collection のアドレスに転送するようにします。
            </Fragment>,
            <Fragment key="f30">
              各 Flow で経理チーム向けに CSV 添付付きの<strong>メール出力</strong>をオンにし、データが 1 つのテーブルに蓄積されるよう <DocLink href="/docs/buckets">Bucket へのエクスポート</DocLink>
              を追加します。
            </Fragment>,
            <Fragment key="f31">
              承認のしきい値を超えるものを配信前に<DocLink href="/docs/human-in-the-loop">人によるレビュー</DocLink>
              に回す条件付きアクションを持つ <DocLink href="/docs/cleaners">Cleaner</DocLink> を追加します。
            </Fragment>,
          ]}
        />
        <p>
          経理チームの誰も Tavnit を開く必要はありません。請求書はこれまでどおりの場所に届き、構造化されたデータは同じ受信箱に戻ってきます。
        </p>
      </DocCard>

      <DocCard icon={<LifeBuoy size={24} />} title="トラブルシューティング">
        <Lead>
          受信メールは通知なしに受け付けられるため、ドキュメントが現れなくても受信箱にエラーは残りません。次の一覧を上から確認してください。原因はほとんどの場合、トリガーのトグル、許可された送信者、添付ファイルの形式、または添付ファイルを取り除いてしまう転送ルールのいずれかです。
        </Lead>
        <DataTable
          head={["症状", "考えられる原因", "対処法"]}
          rows={[
            [
              "Run がまったく表示されない",
              "メールトリガーがオフになっている、アドレスが別の Flow のものである、または送信者が許可された送信者に含まれていません。",
              "トグルと許可された送信者の一覧を確認し直し、メールトリガーのパネルからアドレスをもう一度コピーしてください。",
            ],
            [
              "一部の添付ファイルだけが処理された",
              "処理されなかったファイルは、サポートされていない形式、空、または読み取れないファイルです。",
              "拡張子を上記の受け付ける形式の一覧と照らし合わせてください。",
            ],
            [
              "署名の画像だけが処理された",
              "本来のドキュメントが添付されていませんでした。リンクとして送られたか、転送時に失われています。",
              "インラインではなく添付ファイルとして転送し、ルールが添付ファイルを保持することを確認してください。",
            ],
            [
              "添付ファイルのないメールで何も起きなかった",
              "メール本文を処理がオフになっているか、本文にほとんどテキストがありませんでした。",
              "メールトリガーのパネルでメール本文を処理をオンにしてください（Flow と Collections）。",
            ],
            [
              "送り状から独自の Run が作成された",
              "メール本文を処理が「常に」に設定されています。",
              "モードを「添付ファイルがない場合のみ」に切り替えてください。",
            ],
            [
              "Run は表示されるが失敗する",
              "問題はメールの経路ではなく、ドキュメント自体にあります。",
              "Run を開いてログを確認してください。失敗の原因は抽出の問題です。",
            ],
            [
              "結果がメールで届かない",
              "メール出力が設定されていない、Run が失敗した、またはレビュー待ちになっています。",
              "まず Run のステータスを確認し、次にメール出力の設定を確認してください。",
            ],
          ]}
        />
      </DocCard>

      <Related
        links={[
          {
            href: "/docs/collections",
            label: "Collections で種類の異なるドキュメントを自動で振り分ける",
            description:
              "1 つのメールアドレスを複数の Flow に向け、ドキュメントごとに適切な Flow を Tavnit に選ばせます。",
          },
          {
            href: "/docs/splitters",
            label: "抽出の前に複数ドキュメントを含むファイルを分割する",
            description: "複数のドキュメントを 1 つの添付ファイルにまとめて送ってくる送信者向けです。",
          },
          {
            href: "/docs/webhooks",
            label: "webhook で自社のシステムに結果を届ける",
            description:
              "メール出力に代わる機械可読な手段で、再試行の仕組みも備えています。",
          },
          {
            href: "/docs/api-integration",
            label: "REST API でドキュメントを送信する",
            description:
              "メールでは運べない量やファイルサイズに対応し、エラー処理も明示的に行えます。",
          },
        ]}
      />
    </section>
  );
}
