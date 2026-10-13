import type { LiteLocaleCopy } from "@/lib/lite/copy-base";

/**
 * Free tools copy — 日本語 (ja), translated from ./en.ts.
 *
 * One file per language: `base` is one complete tool written with document
 * tokens ({doc}, {a_doc}, {Doc}…, filled from each tool's `vocab`; {limit}
 * is the daily quota); `tools` supplies each tool's words and only the
 * strings that differ from the base; `hub`, `shell` and `related` are the
 * hub page, the Lite header/footer and the "when it is every document" block;
 * `og` is the subtitle of each tool's social card. Assembled by
 * src/lib/lite/copy.ts. Column names, flows and samples are NOT here: they
 * belong to the engine (src/lib/lite/defs, engineLocale()).
 *
 * Japanese has no articles or plurals, so most vocab forms share one word;
 * the base sentences are written so every form reads naturally.
 */

const INVOICE_VOCAB = {
  doc: "請求書",
  docs: "請求書",
  a_doc: "請求書",
  the_doc: "請求書",
  the_docs: "請求書",
  your_doc: "お手元の請求書",
  your_docs: "お手元の請求書",
  all_your_docs: "すべての請求書",
  all_docs: "すべての請求書",
  each_doc: "すべての請求書",
  another_doc: "別の請求書",
  this_doc: "この請求書",
};

const copy: LiteLocaleCopy = {
  base: {
    title: "{Doc}をExcelに無料変換：AIでどんな{doc}からも明細行を抽出",
    description:
      "{a_doc}をPDFか写真でアップロードするだけで、明細行（品目、数量、単価、金額）をExcelの表で受け取れます。無料、テンプレート不要、結果を見るのに登録も不要です。",
    label: "{Doc}をExcelに",
    h1: "{a_doc}をExcelに変換",
    intro:
      "PDFか写真をアップロードしてください。Tavnitがヘッダーと表の各行を読み取り、スプレッドシートにしてお返しします。取引先ごとのテンプレートは不要で、同じツールが{all_your_docs}に使えます。",
    trust: ["PDF・JPG・PNG · 最大5ページ", "1日{limit}件まで無料", "24時間後にすべて削除"],
    drop: {
      title: "{your_doc}をここにドロップ",
      hint: "またはパソコンからファイルを選択",
      choose: "ファイルを選択",
      sample: "サンプルの{doc}で試す",
      formats: "PDF・JPG・PNG · 最大4 MB・5ページ",
    },
    stages: [
      "ドキュメントをアップロード中",
      "ヘッダーを読み取り中",
      "明細表を探しています",
      "列を整えています",
      "もうすぐ完了です",
    ],
    result: {
      heading: "完了：{file}",
      rowWord: ["行", "行"],
      pageWord: ["ページ", "ページ"],
      summary: "{rows} · {pages}",
      truncated: "{total}行中{shown}行を表示しています。Excelにも同じ{shown}行が入ります。",
      readyIn: "{s}秒で完了",
      sum: "合計",
      viewer: "あなたのドキュメント",
      openDocument: "ドキュメントを表示",
      closeDocument: "閉じる",
      retention: "24時間後に自動削除",
      hideColumn: "列を削除",
      hiddenCols: ["1列を削除しました。Excelには含まれません。", "{n}列を削除しました。Excelには含まれません。"],
      restoreAll: "すべて元に戻す",
      restoreOne: "{col}を元に戻す",
      ghostColumn: "+ 独自の項目",
      ghostHint: "Tavnitでは必要な項目を自由に追加できます：発注番号、支払期日、コストセンター…",
      flowNote: "この{fields}列は、固定の{doc} Flowの項目です。ご自身のアカウントでは、項目を自由に選べます。",
      flowNoteCta: "詳しく見る",
      download: "Excelをダウンロード",
      downloading: "ファイルを準備中",
      another: "{another_doc}を処理する",
      empty: "このドキュメントには明細表が見つかりませんでした。行ごとに数量と価格が記載された{doc}でお試しください。",
    },
    errors: {
      empty: "ファイルが空です。",
      too_large: "ファイルが4 MBを超えています。圧縮するか、{the_doc}のページだけをアップロードしてください。",
      unsupported: "PDF・JPG・PNGファイルのみ対応しています。",
      unreadable: "このPDFを開けませんでした。パスワードで保護されている場合は、解除してからもう一度お試しください。",
      too_many_pages: "無料版で処理できるのは、1ドキュメントあたり5ページまでです。",
      captcha: "ボットではないことを確認できませんでした。ページを再読み込みして、もう一度お試しください。",
      quota: "本日の無料枠（{limit}件）を使い切りました。明日また利用できます。続けるには、アカウントを作成してください。",
      daily_cap: "無料ツールは本日の処理上限に達しました。明日またお越しいただくか、アカウントを作成して今すぐ続けてください。",
      unavailable: "現在、ツールをご利用いただけません。数分後にもう一度お試しください。",
      backend: "ドキュメントの処理中に問題が発生しました。もう一度お試しください。",
      failed: "このドキュメントからデータを抽出できませんでした。{another_doc}かサンプルでお試しください。",
      timeout: "通常より時間がかかっています。少し待ってから、もう一度お試しください。",
      forbidden: "この操作はここからは実行できません。",
      bad_request: "ファイルがないか、読み取れませんでした。",
    },
    auth: {
      title: "無料アカウントを作成してダウンロード",
      body: "Excelはすぐにダウンロードされます。アカウントがあれば、{all_your_docs}をまとめて処理することもできます。",
      google: "Googleで続行",
      or: "またはメールアドレスで",
      signin: "ログイン",
      signup: "アカウント作成",
      name: "お名前",
      email: "メールアドレス",
      password: "パスワード",
      submitSignin: "ログインしてダウンロード",
      submitSignup: "アカウントを作成してダウンロード",
      switchToSignin: "すでにアカウントをお持ちの方",
      switchToSignup: "まだアカウントをお持ちでない方",
      checkEmail:
        "アカウント確認用のメールをお送りしました。メールを開いてからこのページに戻ると、Excelをダウンロードできます。",
      existing: "このメールアドレスはすでに登録されています。ログインしてダウンロードしてください。",
      forgot: "パスワードをお忘れの方",
      close: "閉じる",
      generic: "登録を完了できませんでした。メールアドレスとパスワードを確認して、もう一度お試しください。",
    },
    next: {
      heading: "その先は？",
      lead: "今回は{doc}1件でした。アカウントがあれば、届く{each_doc}に同じ処理が行われ、明細はExcelで終わらずに、その先へ自動で流れていきます。",
      source: "{Your_doc}",
      node: "Tavnit",
      nodeSub: "抽出Flow",
      items: [
        {
          short: "受信トレイに届く",
          via: "メール",
          title: "結果が受信トレイに届く",
          body: "抽出が終わると、TavnitはFlowに設定した宛先へメールを送り、行データをrows.csvとして添付します。レビューを有効にしている場合、メールは承認されるまで送信されません。",
          linkLabel: "メール出力",
          href: "/docs/email-integration",
          scene: [{ label: "抽出が完了" }, { label: "Tavnitがメールを作成" }, { label: "指定した相手に届く", result: "rows.csvを添付" }],
        },
        {
          short: "ERPに届く",
          via: "webhook",
          title: "webhookでERPに届く",
          body: "実行が完了すると、Tavnitは指定されたURLに行データとrun_idをPOSTします。Zapier、Make、n8nはそれぞれのwebhookトリガーで受け取れるので、ネイティブ連携は必要ありません。",
          linkLabel: "Webhook",
          href: "/docs/webhooks",
          scene: [{ label: "抽出された行データ" }, { label: "行データとrun_idを1回POST" }, { label: "お使いのシステムに反映", result: "6行、手入力ゼロ" }],
        },
        {
          short: "登録前にレビュー",
          via: "レビュー",
          title: "登録前に人が承認",
          body: "Flowでレビューを有効にすると、すべての実行がいったん停止します。レビュー担当者は元のドキュメントの横に表示される編集可能な表で、セルの修正、行の除外、列の追加を行い、承認または却下します。メール、webhook、Bucketへの送信は承認後にのみ行われ、すべての判断が記録に残ります。ほかの画面を見せる必要のない人向けに、レビュー専用のロールも用意しています。",
          linkLabel: "人によるレビュー",
          href: "/docs/human-in-the-loop",
          scene: [{ label: "実行がレビュー待ちで停止" }, { label: "ドキュメントを見ながら人が修正" }, { label: "承認後にのみ送信", result: "1セル修正 · 記録済み" }],
        },
        {
          short: "見積を比較",
          via: "Matcher",
          title: "複数の見積を行ごとに比較",
          body: "Matcherは同じFlowの複数の実行結果（たとえば3社の見積書）を受け取り、品目の説明で行を突き合わせ、行ごとの最安値をChampion列に示します。",
          linkLabel: "仕入先の見積",
          href: "/use-cases/supplier-quotes",
          scene: [{ label: "3件の見積、1つのFlow" }, { label: "Matcherが行を突き合わせ" }, { label: "Champion列：行ごとの最良値", result: "B社が5行中4行で最安" }],
        },
        {
          short: "ルールと検証",
          via: "Cleaner",
          title: "Cleanerがすべての行を整えて検証",
          body: "日付形式、数値形式、計算項目、公表レートでの通貨換算、そして条件付きアクション。ある行がチェックに通らなければ、レビューに回したり、メールやwebhookを送ったりできます。",
          linkLabel: "Cleaner",
          href: "/docs/cleaners",
          scene: [{ label: "届いたままのデータ" }, { label: "Cleanerがルールを適用" }, { label: "整形済み、不備には目印", result: "日付・数値・合計すべて正常" }],
        },
        {
          short: "Agentがポータルを操作",
          via: "Agent",
          title: "Agentが仕入先ポータルにログイン",
          body: "やってほしいことを普通の言葉で書き、開始URLと、モデルからは決して見えない保管庫に入れた認証情報を設定します。抽出が完了するとAgentがドキュメントの項目を使って自動で動き出し、価格、リードタイム、ファイルなど、依頼した情報を型付きで持ち帰ります。",
          linkLabel: "Agent",
          href: "/docs/agents",
          scene: [{ label: "抽出が完了" }, { label: "Agentがポータルを操作" }, { label: "データを型付きで持ち帰る", result: "価格 18.50 · リードタイム5日" }],
        },
        {
          short: "データに質問",
          via: "Bucket",
          title: "{your_docs}に質問する",
          body: "行データはBucketに保存されます。普通の言葉で質問すると、Tavnitが質問を計画（合計、絞り込み、月）に変換してデータベースで実行し、数値で答えます。計算をモデルに任せることはありません。",
          linkLabel: "Bucket",
          href: "/docs/buckets",
          scene: [{ label: "「8月にIstmoからいくら仕入れた？」" }, { label: "計画：合計 · 仕入先 · 月" }, { label: "データベースで計算した数値", result: "{docs}4件で$12,480" }],
        },
      ],
      hint: "選択肢かTavnitのチップをタップすると、何が起きるかを確認できます。",
      flow: {
        title: "Flow：列はあなたが決める",
        body: "Flowは1種類のドキュメントの定義です。取り出したい項目のリストで、項目ごとに名前、データ型、1ドキュメントに1回出るのか明細1行ごとに出るのかを設定し、必要なら探す場所のヒントも添えます。有効にすると、届いたドキュメントからまさにその項目だけが読み取られ、出力される表には項目ごとに1列が並びます。このツールでは{fields}項目の固定{doc} Flowを使っています。ご自身のアカウントでは項目の追加・削除・名前の変更が自由にでき、ほかのどんなドキュメントにもFlowを作れます。テンプレートも座標指定も不要です。",
        linkLabel: "Flowの定義方法",
        href: "/docs/flows",
        scene: [{ label: "項目を2つのグループで定義：ドキュメントと表" }, { label: "ヘッダーは1回、表は1行ずつ読み取り" }, { label: "明細1行につき1行：ドキュメントの値は繰り返し、表の値は行ごとに変化", result: "5項目 → 5列" }],
        name: "{Doc}",
        kinds: ["ドキュメント項目", "表の項目"],
        add: { name: "purchase_order", type: "テキスト", hint: "「PO」の横 · 例：PO-2291", save: "保存", value: "PO-2291" },
        activate: "有効",
      },
      inputs: {
        show: "{your_doc}はどうやって取り込む？",
        hide: "取り込み方法を閉じる",
        items: [
          {
            short: "メールで",
            via: "Flowごとに1つのアドレス",
            title: "メールを転送するだけ",
            body: "Flowにはそれぞれ専用のアドレス（<Flow名>-lite-<id>@mg.tavnit.io など）があります。{the_doc}が添付されたメールを転送すれば、添付ファイルごとに1件の実行になります。件名と本文は読み取りません。",
            linkLabel: "メール取り込み",
            href: "/docs/email-integration",
            scene: [{ label: "添付付きのメールを転送" }, { label: "Flowのアドレスに届く" }, { label: "添付ファイルごとに1件の実行", result: "添付1件 → 実行1件" }],
          },
          {
            short: "手動アップロード",
            via: "アプリから",
            title: "アプリからアップロード",
            body: "PDFや写真をFlowにドロップすれば、すぐに実行が始まります。ここで試したのと同じことを、ご自身のアカウントで、1日の上限なしに行えます。",
            linkLabel: "Flow",
            href: "/docs/flows",
            scene: [{ label: "ファイルをFlowにドロップ" }, { label: "実行が開始" }, { label: "数秒で行データ", result: "ここと同じ、上限なし" }],
          },
          {
            short: "API",
            via: "POST /api/runs/process",
            title: "自社システムからAPIで",
            body: "APIキーを使い、ファイルとflow_idを付けて/api/runs/processに1回POSTします。202とrun_idが返るので、completedになるまで/api/runs/<id>をGETすれば、行データが返ってきます。",
            linkLabel: "API",
            href: "/docs/api-integration",
            scene: [{ label: "ファイルとflow_idをPOST" }, { label: "202：run_id、キュー投入" }, { label: "completedになるまでGET", result: "status: completed · 6行" }],
          },
          {
            short: "Zapier · Make · n8n",
            via: "HTTP呼び出し1回",
            title: "Zapier、Make、n8nから",
            body: "ネイティブアプリはありませんが、必要もありません。HTTPステップ（ZapierのCustom Request、MakeのMake a request）でファイルを/api/runs/processに送ります。行データはwebhookで同じツールのトリガーに戻ってきます。",
            linkLabel: "連携",
            href: "/integrations",
            scene: [{ label: "シナリオ内のHTTPステップ" }, { label: "Tavnitが処理" }, { label: "webhookが行データを返す", result: "Zapier・Make・n8nに戻る" }],
          },
          {
            short: "1つのPDFに複数",
            via: "Splitterが分割",
            title: "1つのPDFに複数のドキュメント",
            body: "Splitterは各ドキュメントの始まりを見つけ、各セグメントをあなたが説明した種類に分類し、それぞれを対応するFlowに送ります。{docs}3件をまとめてスキャンしたファイルは、3件の実行になります。",
            linkLabel: "Splitter",
            href: "/docs/splitters",
            scene: [{ label: "{docs}3件入りのPDF" }, { label: "Splitterが分割・分類" }, { label: "{doc}1件につき1件、計3件の実行", result: "3セグメント · 3実行" }],
          },
        ],
      },
      replay: "もう一度再生",
      tryIt: "Tavnitで試す",
      tryItSignedIn: "自分のアカウントで実行",
      primary: "無料アカウントを作成",
      primarySignedIn: "Tavnitへ移動",
      sameLogin: "すでにアカウントをお持ちです。同じログイン情報（{email}）でTavnitにログインしてください。別のサイトのため、もう一度だけ確認が求められます。",
      secondary: "デモを予約",
    },
    cleaners: {
      heading: "Cleanerを使えば…",
      lead: "抽出後、{each_doc}に自動で適用されるシンプルなルール。あなたのデータを使った4つのアイデアです：",
      tag: "Cleaner",
      ideas: [
        { icon: "date", title: "日付の書き方を統一", from: "{date}", to: "{iso}", note: "{each_doc}が同じ形式に" },
        { icon: "sum", title: "明細の合計は小計と一致すること", from: "明細 {sum}", to: "小計 {subtotal}", note: "一致しなければ、確認なしに支払われることはありません", check: "sum" },
        { icon: "money", title: "自国通貨に換算", from: "{total} {currency}", to: "自国通貨", note: "{the_doc}の日付のレートで" },
        { icon: "approve", title: "一定額を超えたら承認", from: "合計 {total}", to: "支払前に承認", note: "{threshold}を超えたとき" },
      ],
      ok: "一致",
      off: "要確認",
      outro: "Cleanerは、重視する項目に合わせてTavnitで作成します。ここに挙げたのはあくまで一例です。",
      cta: "無料アカウントを作成して試す",
      ctaSignedIn: "Tavnitを開いて試す",
      learn: "Cleanerとは",
    },
    after: {
      title: "Excelの準備ができました",
      lead: "これは{fields}項目の固定Flowから出力されたものです。ご自身のアカウントでは項目を自由に選べます。Tavnitが{each_doc}を処理すると、こうなります：",
      close: "閉じる",
      saved: "ダウンロードフォルダに保存しました",
    },
    how: {
      heading: "使い方",
      steps: [
        {
          title: "{the_doc}をアップロード",
          body: "PDF、写真、スキャン。取引先、言語、レイアウトを問いません。",
        },
        {
          title: "Tavnitが読み取る",
          body: "ヘッダー（取引先、番号、日付、合計）と、数量・価格を含む明細表を見つけます。",
        },
        {
          title: "確認してダウンロード",
          body: "表が画面に表示されます。無料アカウントがあれば、Excelとして持ち帰れます。",
        },
      ],
    },
    faqHeading: "よくある質問",
    faqs: [
      {
        q: "無料版には何が含まれますか？",
        a: "1日{limit}件まで、結果のすべてを画面で確認できます。Excelのダウンロードには、無料で作れるTavnitアカウントが必要です。",
      },
      {
        q: "どの形式に対応していますか？",
        a: "PDF（テキストまたはスキャン）、JPG、PNGで、最大4 MB・5ページです。{your_doc}がそれより長い場合は、分割してアップロードするか、アカウントを作成してください。",
      },
      {
        q: "ほかの列を選べますか？",
        a: "ここではできません。このツールは13項目の固定{doc} Flowを使っています。ご自身のアカウントでは、{docs}でもほかのどんなドキュメントでも、必要な項目で独自のFlowを作れます。ドキュメント単位（発注番号、支払期日、コストセンター）でも、明細行単位（商品コード、値引き）でも設定できます。テンプレートは不要で、項目を説明し、必要に応じて探す場所のヒントを添えるだけです。",
      },
      {
        q: "取引先ごとにテンプレートを設定する必要はありますか？",
        a: "いいえ。Tavnitはテンプレートを使いません。取引先が明日{doc}のデザインを変えても、各ドキュメントを届いたままの状態で読み取ります。",
      },
      {
        q: "アップロードしたファイルはどうなりますか？",
        a: "無料ツール専用のTavnitアカウントで処理され、それ以外の目的には使われません。24時間後にファイルと抽出された行は自動で削除されます。残るのは実行があったという記録だけで、ドキュメントやその内容は保持しません。もっと早く削除したい場合は、support@tavnit.ioまでメールでご連絡ください。",
      },
      {
        q: "なぜダウンロードにアカウントが必要なのですか？",
        a: "無料版はお試し用だからです。アカウントがあれば、{all_your_docs}に同じ抽出を実行し、メールで受け取り、結果を自社システムに送ることができます。",
      },
      {
        q: "どの国の{docs}にも対応していますか？",
        a: "はい。英語、スペイン語など、さまざまな言語の{docs}に対応し、税額の内訳があってもなくても処理できます。米国、パナマ、メキシコ、コロンビアなどの{docs}でテスト済みです。",
      },
      {
        q: "自動化するには？",
        a: "アカウントを作成し、必要な項目でFlowを作り、そのメールアドレスに{docs}を転送するか、API、webhook、Zapier、Make、n8nで接続します。結果は誰も手入力することなく、ERPやGoogle スプレッドシートに届きます。",
      },
    ],
  },

  hub: {
    title: "無料AIドキュメントツール：請求書をExcelに変換ほか",
    description:
      "Tavnit独自のエンジンで動く、目的特化型の無料ツール。請求書のExcel変換などをすぐに試せます。テンプレート不要、結果を見るのに登録も不要です。",
    h1: "無料ツール",
    intro:
      "各ツールは1つのドキュメントに1つの処理を行い、実際の結果をお見せします。企業がTavnitでドキュメントを自動化しているのと同じエンジンで、1件ずつ動きます。",
    breadcrumbHome: "ホーム",
    breadcrumbHub: "ツール",
    groups: { extract: "ドキュメントをExcelに", compare: "ドキュメントを比較", split: "スキャンを整理", clean: "スプレッドシートを整形" },
    outro: "どのツールも、企業がTavnitでドキュメントを自動化しているのと同じエンジンで動いています。すべてのドキュメントを自動で処理したくなったら、アカウントをご利用ください。",
    outroCta: "無料アカウントを作成",
  },

  shell: {
    lite: "Lite",
    tools: "ツール",
    site: "Tavnitについて",
    cta: "無料アカウント作成",
    ctaSignedIn: "Tavnitへ移動",
    nav: { product: "製品", useCases: "活用事例", docs: "ドキュメント" },
    demo: "デモを予約",
    signin: "ログイン",
    allTools: "すべてのツールを見る",
    allToolsHint: "無料。登録なしで実際の結果を確認でき、アカウントがあれば持ち帰れます。",
    groups: { extract: "ドキュメントをExcelに", compare: "ドキュメントを比較", split: "スキャンを整理", clean: "スプレッドシートを整形" },
    account: {
      signedInAs: "ログイン中のアカウント",
      open: "Tavnitへ移動",
      openHint: "フル機能のプラットフォーム：Flow、自動化、そしてあらゆる処理量に対応",
      signOut: "ログアウト",
      menu: "アカウント",
    },
    auth: {
      title: "無料アカウントを作成",
      body: "同じアカウントで、ここでの結果をダウンロードし、Tavnitですべてのドキュメントを自動化できます。",
      submitSignin: "ログイン",
      submitSignup: "アカウント作成",
    },
    menu: "メニュー",
    close: "閉じる",
    privacy: "プライバシー",
    terms: "利用規約",
    contact: "お問い合わせ",
    rights: "Tavnit。製品と同じエンジンで作られた無料ツール。",
  },

  related: {
    heading: "1件ではなく、すべてのドキュメントなら",
    lead: "このツールは1件ずつ処理します。同じエンジンで、メールやAPIでドキュメントを受け取り、チームのレビューを経て、お使いのシステムに届けることができます。",
    useCase: "自動化の方法：",
    guide: "ガイド：",
  },

  tools: {
    /** Invoice → Excel. The base copy was written for this tool, so only the
     *  words — plus a <title> short enough not to be cut in search results. */
    "invoice-to-excel": {
      vocab: INVOICE_VOCAB,
      overrides: { title: "請求書をExcelに無料変換：AIが明細行を読み取り" },
    },
    /**
     * Invoice line item extractor. Same Flow and the same words as invoice →
     * Excel; a different page, written for the people who search "line item
     * extraction": what a line item is, one row per line, the header repeated
     * on every row, and what to do with the rows afterwards.
     */
    "invoice-line-items": {
      vocab: INVOICE_VOCAB,
      overrides: {
        title: "無料の請求書明細抽出ツール：明細行をExcelに",
        description:
          "請求書の明細行（品目、数量、単価、金額）をExcelの行として抽出。取引先、番号、日付は各行に入ります。PDFでも写真でもOK、テンプレート不要、結果を見るのに登録も不要です。",
        label: "請求書明細の抽出",
        h1: "請求書から明細行を抽出",
        intro:
          "請求書の表の各行（品目、数量、単位、単価、金額）がそれぞれ1行になり、ヘッダー（取引先、番号、日付、合計）が各行に繰り返し入ります。経理や買掛金の担当者が明細を仕訳したり、照合したり、発注書と突き合わせたりするのに必要な形です。PDF、スキャン、写真に対応し、取引先ごとのテンプレートは不要です。",
        drop: {
          title: "明細を取り出したい請求書をドロップ",
          sample: "6行の請求書で試す",
        },
        stages: [
          "請求書をアップロード中",
          "ヘッダーを読み取り中",
          "明細表を検出中",
          "各行を切り出しています",
          "もうすぐ完了です",
        ],
        result: {
          flowNote: "この{fields}列は、固定の請求書Flow（ヘッダーと明細行）の項目です。ご自身のアカウントでは、項目を自由に選べます。",
        },
        how: {
          heading: "使い方",
          steps: [
            {
              title: "請求書をアップロード",
              body: "テキストPDF、スキャン、写真。1ページでも複数ページでも、最大5ページまで対応します。",
            },
            {
              title: "Tavnitが明細行を切り出す",
              body: "罫線のない表でも見つけ出し、各行（品目、数量、単位、価格、金額）を読み取って、ヘッダーを付け加えます。",
            },
            {
              title: "確認してダウンロード",
              body: "明細1行につき1行が画面に表示されます。無料アカウントがあれば、不要な列を除いてExcelとして持ち帰れます。",
            },
          ],
        },
        faqs: [
          {
            q: "請求書の明細行とは何ですか？",
            a: "明細表の各行のことで、品目の説明、数量、単位、単価、金額を持つ1つの商品やサービスを指します。フッターの合計（小計、税、合計）は明細行ではなく、各行に繰り返されるヘッダー項目として出力されます。",
          },
          {
            q: "なぜ取引先と番号が各行に表示されるのですか？",
            a: "各行が単独で意味を持つようにするためです。多数の請求書の明細を1枚のシートに貼り付けたり、絞り込んだり、合計したりしても、どの請求書のものかがわからなくなりません。ERP、ピボットテーブル、照合作業が求める形です。",
          },
          {
            q: "表が複数ページにまたがっていても大丈夫ですか？",
            a: "はい。Tavnitはページをまたいで表を追いかけ、列見出しを行と取り違えて繰り返すことなく、すべての明細を順番に返します。無料版は最大5ページまで対応しています。",
          },
          {
            q: "折り返された説明や結合セルはどうなりますか？",
            a: "次の行に続く説明はその明細にまとめられ、結合セルは対象となる明細すべてに適用されます。表の罫線に頼るのではなく、どの数量・価格・金額がどの説明に対応するかを読み取っています。",
          },
          {
            q: "行ごとの値引きや税はどう扱われますか？",
            a: "各行の金額は印字されているとおりに出力されます。請求書に独立した行として記載された値引きや税は明細行にはせず、ドキュメント全体の合計として扱います。行ごとに税額が記載されている請求書なら、アカウントでその項目をFlowに追加できます。",
          },
          {
            q: "明細を発注書と照合できますか？",
            a: "はい。無料の発注書と請求書の照合ツール（/tools/po-vs-invoice-check）を使えば可能です。両方のドキュメントをアップロードすると、価格や数量が異なる行、欠けている行、追加された行を指摘します。",
          },
          {
            q: "取引先ごとにテンプレートが必要ですか？",
            a: "いいえ。Tavnitは各請求書を届いたままの状態で読み取るので、取引先が明日デザインを変えても問題なく動作します。国や言語が異なる請求書にも同じように対応できるのは、そのためです。",
          },
          {
            q: "数百件の請求書でこれを行うには？",
            a: "アカウントで同じ項目（または独自の項目）のFlowを作成し、そのメールアドレスに請求書を転送するか、APIで送ります。各請求書は行データとなり、誰も手入力することなくERP、Google スプレッドシート、Bucketに届きます。",
          },
        ],
      },
    },
    /**
     * PO vs invoice check. Two documents through one "purchase document" Flow,
     * then the Matcher pairs every PO line with the invoice line that means the
     * same thing and the page shows the differences: price, quantity, missing
     * on the invoice, not on the PO. The base's document word stays "請求書"
     * because that is what the shared blocks (email intake, review, agents…)
     * talk about; everything the visitor sees first is overridden here.
     */
    "po-invoice-check": {
      vocab: INVOICE_VOCAB,
      overrides: {
        title: "発注書と請求書の照合ツール（無料）：明細行ごとに突き合わせ",
        description:
          "発注書と請求書をアップロードすると、Tavnitが明細行ごとに突き合わせます。価格の差異、数量の差異、請求書にない行、発注書にない行がひと目でわかります。無料、テンプレート不要、結果を見るのに登録も不要です。",
        label: "発注書と請求書の照合",
        h1: "請求書を発注書と照合",
        intro:
          "発注書と請求書を、PDFか写真でアップロードしてください。Tavnitが両方を読み取り、文言が違っても同じ意味の行同士を対応づけ、価格が変わった箇所、数量が変わった箇所、請求書に欠けているもの、そもそも発注書になかったものを指摘します。",
        trust: ["発注書と請求書 · PDFまたは写真", "1日{limit}件まで無料", "24時間後にすべて削除"],
        drop: {
          title: "ここにドキュメントをドロップ",
          sample: "サンプルの発注書と請求書で試す",
          formats: "PDF・JPG・PNG · 1ドキュメントあたり最大4 MB・5ページ",
        },
        stages: ["ドキュメントをアップロード中", "発注書を読み取り中", "請求書を読み取り中", "明細行を突き合わせ中", "もうすぐ完了です"],
        result: {
          another: "別のドキュメントを比較",
          download: "比較結果をExcelでダウンロード",
          flowNote: "この{fields}列は、固定の購買ドキュメントFlowの項目です。ご自身のアカウントでは、項目を自由に選べます。",
          ghostHint: "Tavnitでは必要な項目を自由に追加できます：コストセンター、検収番号、プロジェクト…",
        },
        errors: {
          no_lines: "どちらかのドキュメントで、数量と価格のある明細行が見つかりませんでした。品目の表がある発注書と請求書かどうかをご確認ください。",
          not_ready: "まだドキュメントを読み取っています。少し待ってから、もう一度お試しください。",
          failed: "どちらかのドキュメントを読み取れませんでした。別のファイルかサンプルでお試しください。",
          too_large: "どちらかのファイルが4 MBを超えています。圧縮するか、ドキュメントのページだけをアップロードしてください。",
        },
        next: {
          lead: "今回は発注書と請求書が1件ずつでした。アカウントがあれば、届くすべての請求書が自動で発注書と照合され、結果はExcelで終わらずに、その先へ流れていきます。",
          source: "お手元の発注書と請求書",
          flow: {
            name: "購買ドキュメント",
            add: { name: "receipt_number", type: "テキスト", hint: "「検収」の横 · 例：REC-1187", save: "保存", value: "REC-1187" },
          },
          inputs: { show: "ドキュメントはどうやって取り込む？" },
        },
        cleaners: {
          heading: "Cleanerを使えば…",
          lead: "照合のたびに自動で適用されるシンプルなルール。4つのアイデアです：",
          ideas: [
            { icon: "alert", title: "価格が2 %を超えて上がったら請求書を保留", from: "発注価格 22.40", to: "請求 23.90", note: "支払われる前に差額を指摘" },
            { icon: "approve", title: "数量が異なる場合は承認", from: "発注 300個", to: "請求 280個", note: "分納か誤りかを購買部門が確認" },
            { icon: "mail", title: "差異を購買部門にメール", from: "照合完了", to: "purchasing@ へメール", note: "確認すべき点があるときだけ" },
            { icon: "sum", title: "請求合計と発注合計を照合", from: "発注 5,189.07", to: "請求 4,960.63", note: "一致しなければ、登録前に止まります" },
          ],
          outro: "Cleanerは、重視する項目に合わせてTavnitで作成します。ここに挙げたのはあくまで一例です。",
        },
        after: {
          lead: "これは{fields}項目の固定FlowとMatcherから出力されたものです。ご自身のアカウントでは項目を自由に選べます。Tavnitが届くすべての請求書を照合すると、こうなります：",
        },
        how: {
          heading: "使い方",
          steps: [
            { title: "両方のドキュメントをアップロード", body: "発注書と請求書を、PDFか写真で。取引先、言語、レイアウトを問いません。" },
            { title: "Tavnitが1つのFlowで両方を読み取る", body: "両方について、ヘッダー（番号、日付、仕入先、合計）と、数量・価格を含む各明細行を読み取ります。" },
            { title: "Matcherが明細行を突き合わせる", body: "発注書の各行を同じ意味の請求書の行と対応づけ、価格と数量を比較します。アカウントがあれば、比較結果をExcelとして持ち帰れます。" },
          ],
        },
        faqs: [
          {
            q: "無料版には何が含まれますか？",
            a: "1日{limit}件まで（1回の照合で2件を使用）、結果のすべてを画面で確認できます。比較結果のExcelダウンロードには、無料で作れるTavnitアカウントが必要です。",
          },
          {
            q: "文言が同じでない場合、どうやって行を対応づけるのですか？",
            a: "TavnitのMatcherは、説明を1文字ずつではなく意味で比較します。「Long grain rice 20 lb」と「RICE L/GRAIN PREMIUM 20LB」は同じ行です。2つの説明が近いものの判断しにくい場合は、2段階目で同じ品目かどうかを判定します。",
          },
          {
            q: "価格の許容差はどれくらいですか？",
            a: "価格が0.5 %を超えて、または1セントを超えて変動した場合に差異として指摘します。数量は完全一致で比較します。アカウントがあれば、Cleanerで独自の許容差を設定できます。",
          },
          {
            q: "「請求書に記載なし」と「発注書に記載なし」はどういう意味ですか？",
            a: "「請求書に記載なし」は、仕入先が請求しなかった発注書の行（一部納品または未納品）です。「発注書に記載なし」は、その発注書では誰も注文していないのに請求された行です。",
          },
          {
            q: "検収書との3者照合はできますか？",
            a: "ここではできません。無料版で比較できるのは2つのドキュメントです。アカウントがあれば、検収書を同じFlowの3つ目のドキュメントとして追加してMatcherで3つすべてを照合するか、検収書と一致するまで請求書を登録しないCleanerのルールを作れます。",
          },
          {
            q: "どの形式に対応していますか？",
            a: "PDF（テキストまたはスキャン）、JPG、PNGで、1ドキュメントあたり最大4 MB・5ページです。ERPから出力した発注書にも、どの取引先の請求書にも対応しています。",
          },
          {
            q: "アップロードしたファイルはどうなりますか？",
            a: "無料ツール専用のTavnitアカウントで処理され、それ以外の目的には使われません。24時間後にファイルと比較結果は自動で削除されます。残るのは実行があったという記録だけで、ドキュメントやその内容は保持しません。",
          },
          {
            q: "自動化するには？",
            a: "アカウントを作成し、購買ドキュメント用のFlowと、その上にMatcherを作ります。請求書はメールやAPIで届いて発注書と対応づけられ、差異は誰も手入力することなく、メール、webhook、またはERPへ送られます。",
          },
        ],
        compare: {
          slots: [
            { title: "発注書", hint: "発注書のPDFまたは写真", sample: "サンプルの発注書" },
            { title: "請求書", hint: "請求書のPDFまたは写真", sample: "サンプルの請求書" },
          ],
          run: "比較する",
          sampleAll: "サンプルの発注書と請求書で試す",
          stages: ["発注書と請求書を読み取り中", "明細行を整理中", "Matcherが明細行を突き合わせ中", "もうすぐ完了です"],
          heading: "比較が完了しました",
          summary: "{n} · {ref}と{doc}",
          labels: {
            description: "品目",
            quantity: "数量",
            price: "価格",
            total: "合計",
            status: "ステータス",
            ref: "発注書",
            doc: "請求書",
            supplier: "仕入先",
            champion: "Champion",
            wins: "{n}行で最安",
            lines: ["行", "行"],
          },
          status: {
            ok: "一致",
            price: "価格が異なる",
            qty: "数量が異なる",
            both: "価格と数量が異なる",
            missing: "請求書に記載なし",
            extra: "発注書に記載なし",
          },
          empty: "明細行を1つも対応づけられませんでした。両方のドキュメントに、数量と価格のある品目の表があるかご確認ください。",
          another: "別のドキュメントを比較",
          download: "比較結果をExcelでダウンロード",
        },
      },
    },
    /**
     * Split a scanned PDF into its documents. The one Lite tool that is a
     * Splitter, not a Flow: the result is a list of documents, each with its
     * page range and type, downloadable one by one or as a zip. The shared
     * blocks (auth, errors, the "and then what?" outcomes) stay; what talks
     * about rows and columns is overridden here.
     */
    "split-scanned-pdf": {
      vocab: {
        doc: "スキャンPDF",
        docs: "スキャンPDF",
        a_doc: "スキャンPDF",
        the_doc: "PDF",
        the_docs: "PDF",
        your_doc: "お手元のPDF",
        your_docs: "お手元のPDF",
        all_your_docs: "すべてのPDF",
        all_docs: "すべてのPDF",
        each_doc: "すべてのPDF",
        another_doc: "別のPDF",
        this_doc: "このPDF",
      },
      overrides: {
        title: "スキャンPDFをドキュメントごとに無料で分割（AI）",
        description:
          "複数のドキュメント（請求書、発注書、領収書、契約書）をまとめてスキャンした1つのPDFをアップロードすると、ドキュメントを1件ずつ、種類別に分類してお返しします。無料、ページの指定も不要です。",
        label: "スキャンPDFを分割",
        h1: "スキャンPDFをドキュメントごとに分割",
        intro:
          "10枚の書類をスキャナーに通したら、1つのPDFになってしまった。そんなときはアップロードしてください。Tavnitが全ページを読み取って各ドキュメントの始まりを見つけ、1件ずつ種類（請求書、発注書、領収書、パッキングリスト、船荷証券、契約書…）付きでお返しします。ページ数での分割も、手作業での目印付けも不要です。",
        trust: ["PDF 1件 · 最大12ページ", "1日{limit}件まで無料", "24時間後にすべて削除"],
        drop: {
          title: "スキャンしたPDFをここにドロップ",
          hint: "複数のドキュメントが入ったPDF 1件",
          choose: "ファイルを選択",
          sample: "サンプルのスキャンで試す",
          formats: "PDF · 最大4 MB・12ページ",
        },
        stages: ["PDFをアップロード中", "全ページを読み取り中", "各ドキュメントの始まりを探しています", "分類中", "もうすぐ完了です"],
        result: {
          retention: "24時間後に自動削除",
          downloading: "ファイルを準備中",
          another: "別のPDFを分割",
          empty: "このPDFには、複数のドキュメントが見つかりませんでした。",
          flowNote: "これらの種類は、このツールの固定Splitterのものです。ご自身のアカウントでは、種類を自由に定義できます。",
        },
        errors: {
          too_large: "ファイルが4 MBを超えています。圧縮するか、スキャンを2つに分けてください。",
          too_many_pages: "無料版で分割できるのは、1つのPDFあたり12ページまでです。アカウントがあれば上限はありません。",
          unsupported: "PDF・JPG・PNGのみ対応しています。ドキュメントを分割するには、スキャナーで作成したPDFをアップロードしてください。",
          failed: "このPDFを分割できませんでした。別のスキャンかサンプルでお試しください。",
          empty: "ファイルが空です。",
        },
        next: {
          lead: "今回はPDF 1件でした。アカウントがあれば、Splitterが切り出した各ドキュメントがそれぞれのFlowへ送られます。請求書は請求書の抽出へ、発注書は発注書の抽出へ、領収書は経費精算へ。手作業での仕分けや分類は、もう必要ありません。",
          source: "お手元のPDF",
          flow: {
            title: "SplitterからFlowへ：各ドキュメントをそれぞれの抽出へ",
            body: "Splitterは各ドキュメントの始まりを見つけ、あなたが言葉で説明した種類に分類します。このツールでは8種類・出力なしの固定Splitterを使っており、ドキュメントを分けてお渡しするだけです。ご自身のアカウントでは独自の種類を定義し、種類ごとに送り先を決められます。項目を抽出するFlow（下の例では{fields}項目）、メール、Collectionのいずれかです。テンプレートも座標指定も不要です。",
            linkLabel: "Splitterの仕組み",
            href: "/docs/splitters",
          },
          inputs: {
            show: "PDFはどうやって取り込む？",
          },
        },
        cleaners: {
          heading: "分割のあと、Tavnitでは…",
          lead: "ドキュメントの種類ごとに送り先を設定でき、手作業での仕分けは不要です。4つの例：",
          ideas: [
            { icon: "text", title: "請求書はFlowへ、そしてERPへ", from: "請求書（1〜2ページ）", to: "請求書Flow → ERP", note: "手を触れずに抽出・登録" },
            { icon: "mail", title: "領収書は経費精算へ", from: "領収書（5ページ）", to: "expenses@yourcompany", note: "各領収書が精算担当者に届く" },
            { icon: "calendar", title: "契約書は日付付きで法務アーカイブへ", from: "契約書（6〜7ページ）", to: "契約書Flow", note: "満了日と更新日を1つの表に" },
            { icon: "alert", title: "認識できないものがあれば通知", from: "未分類のページ", to: "人によるレビュー", note: "紛失も誤った保管も起きません" },
          ],
          outro: "送り先は、ドキュメントの種類ごとにTavnitで設定します。ここに挙げたのはあくまで一例です。",
          cta: "無料アカウントを作成して設定する",
          ctaSignedIn: "Tavnitを開いて設定する",
          learn: "Splitterとは",
        },
        after: {
          title: "ドキュメントの準備ができました",
          lead: "これは8種類の固定Splitterから出力されたものです。ご自身のアカウントでは種類を自由に定義でき、各ドキュメントは自動でそれぞれのFlowへ進みます：",
          close: "閉じる",
        },
        how: {
          heading: "使い方",
          steps: [
            { title: "スキャンをアップロード", body: "複数のドキュメントが入ったPDF 1件を、スキャナーから出てきたそのままの状態で。順番も、1ドキュメントあたりのページ数も自由です。" },
            { title: "Tavnitが分割して分類", body: "全ページを読み取り、各ドキュメントの始まりを検出して種類を割り当てます：請求書、発注書、領収書、パッキングリスト、船荷証券、契約書、クレジットノート、その他。" },
            { title: "各ドキュメントをダウンロード", body: "ページ範囲と種類の一覧が表示されます。無料アカウントがあれば、PDFを1件ずつ、またはまとめてzipで持ち帰れます。" },
          ],
        },
        faqs: [
          {
            q: "1つのドキュメントの終わりと次の始まりは、どうやって判断するのですか？",
            a: "AIが人と同じように、すべてのページをまとめて見ています。ヘッダー、会社名、ページ番号、レイアウトの変化などです。ページ数を数えたり目印を探したりはしないので、請求書が2ページ、領収書が1ページといった場合でも正しく分割できます。",
          },
          {
            q: "どの種類のドキュメントを認識しますか？",
            a: "ここでは8種類です：請求書、発注書、領収書、パッキングリスト、船荷証券、契約書、クレジットノート、その他。アカウントがあれば言葉で説明するだけで独自の種類を定義でき、種類ごとに送り先（データを抽出するFlow、メール、Collection）を決められます。",
          },
          {
            q: "無料版には何が含まれますか？",
            a: "1日{limit}件まで、結果のすべてを画面で確認できます。分割したPDFのダウンロードには、無料で作れるTavnitアカウントが必要です。",
          },
          {
            q: "何ページまでアップロードできますか？",
            a: "無料版では1つのPDFあたり12ページ・4 MBまでです。アカウントがあればページ数の上限はなく、スキャンを直接Splitterにメールで送ることもできます。",
          },
          {
            q: "画質の悪いスキャンや、複数の言語が混在していても大丈夫ですか？",
            a: "はい。傾いたスキャン、グレースケール、押印のあるスキャンに対応し、英語、スペイン語などのドキュメントが同じPDFに混在していても処理できます。読み取れないページには、推測で種類を割り当てず、未分類として表示します。",
          },
          {
            q: "アップロードしたファイルはどうなりますか？",
            a: "無料ツール専用のTavnitアカウントで処理され、それ以外の目的には使われません。24時間後にPDFと分割されたドキュメントは自動で削除されます。残るのは実行があったという記録だけで、ファイルやその内容は保持しません。もっと早く削除したい場合は、support@tavnit.ioまでメールでご連絡ください。",
          },
          {
            q: "なぜダウンロードにアカウントが必要なのですか？",
            a: "無料版はお試し用だからです。アカウントがあれば、すべてのスキャンを分割し、各ドキュメントをそれぞれのFlowに送り、抽出されたデータをERPやメールで受け取れます。",
          },
          {
            q: "自動化するには？",
            a: "アカウントを作成し、ドキュメントの種類を設定したSplitterを作り、そのメールアドレスにスキャンを転送するか、APIで接続します。切り出された各ドキュメントは自動でそれぞれのFlowへ送られ、そこからERP、Google スプレッドシート、受信トレイへ届きます。",
          },
        ],
        split: {
          heading: "完了：{file}",
          summary: "{pages}から{n}",
          segmentWord: ["件のドキュメント", "件のドキュメント"],
          pageWord: ["ページ", "ページ"],
          pages: "{from}〜{to}ページ",
          pageOne: "{from}ページ",
          unmatched: "未分類",
          type: "種類",
          reason: "理由",
          download: "ダウンロード",
          downloadAll: "すべてダウンロード（zip）",
          stages: ["PDFをアップロード中", "全ページを読み取り中", "各ドキュメントの始まりを探しています", "分類中", "もうすぐ完了です"],
          empty: "このPDFには、複数のドキュメントが見つかりませんでした。",
          another: "別のPDFを分割",
        },
      },
    },
    /**
     * Packing list → Excel. Shipment header (shipper, consignee, ports, totals)
     * once per document and one row per goods line with packages, net and gross
     * weight and dimensions. Everything not overridden here comes from the base
     * copy with the words below filled in.
     */
    "packing-list-to-excel": {
      vocab: {
        doc: "パッキングリスト",
        docs: "パッキングリスト",
        a_doc: "パッキングリスト",
        the_doc: "パッキングリスト",
        the_docs: "パッキングリスト",
        your_doc: "お手元のパッキングリスト",
        your_docs: "お手元のパッキングリスト",
        all_your_docs: "すべてのパッキングリスト",
        all_docs: "すべてのパッキングリスト",
        each_doc: "すべてのパッキングリスト",
        another_doc: "別のパッキングリスト",
        this_doc: "このパッキングリスト",
      },
      overrides: {
        title: "パッキングリストをExcelに無料変換：AIが全明細を抽出",
        description:
          "パッキングリストをPDFか写真でアップロードするだけで、すべての明細をExcelの表で受け取れます。品名、数量、梱包数、正味重量・総重量、寸法に加え、荷送人、荷受人、港も入ります。無料、テンプレート不要、結果を見るのに登録も不要です。",
        label: "パッキングリストをExcelに",
        h1: "パッキングリストをExcelに変換",
        intro:
          "PDFか写真をアップロードしてください。Tavnitが出荷ヘッダー（荷送人、荷受人、港、合計）と、梱包数・重量・寸法を含む各貨物明細を読み取り、スプレッドシートにしてお返しします。仕入先ごとのテンプレートは不要で、同じツールがすべての出荷のパッキングリストに使えます。",
        drop: {
          title: "パッキングリストをここにドロップ",
          sample: "サンプルのパッキングリストで試す",
        },
        stages: ["ドキュメントをアップロード中", "出荷ヘッダーを読み取り中", "貨物明細を探しています", "列を整えています", "もうすぐ完了です"],
        result: {
          empty: "このドキュメントには貨物明細が見つかりませんでした。行ごとに梱包数、重量、数量が記載されたパッキングリストでお試しください。",
          flowNote: "この{fields}列は、固定のパッキングリストFlowの項目です。ご自身のアカウントでは、項目を自由に選べます。",
          ghostHint: "Tavnitでは必要な項目を自由に追加できます：コンテナ、荷印、HSコード、B/L番号…",
        },
        next: {
          lead: "今回はパッキングリスト1件でした。アカウントがあれば、届くすべてのパッキングリストに同じ処理が行われ、明細はExcelで終わらずに、その先へ自動で流れていきます。",
          source: "お手元のパッキングリスト",
          flow: {
            name: "パッキングリスト",
            add: { name: "container", type: "テキスト", hint: "「Container」の横 · 例：MSKU-4417", save: "保存", value: "MSKU-4417" },
          },
          inputs: { show: "パッキングリストはどうやって取り込む？" },
        },
        cleaners: {
          lead: "抽出後、すべてのパッキングリストに自動で適用されるシンプルなルール。あなたのデータを使った4つのアイデアです：",
          ideas: [
            { icon: "date", title: "日付の書き方を統一", from: "{date}", to: "{iso}", note: "すべてのパッキングリストが同じ形式に" },
            { icon: "alert", title: "総重量は正味重量より大きいこと", from: "正味 > 総重量", to: "要確認", note: "逆になった行が見過ごされたまま申告されることはありません" },
            { icon: "calendar", title: "出港前に通知", from: "出荷日", to: "2日前にリマインダー", note: "通関業者と物流担当へ" },
            { icon: "mail", title: "通関業者にコピーを送付", from: "抽出したパッキングリスト", to: "Excel付きのメール", note: "関連する請求書と一緒に" },
          ],
        },
        after: {
          lead: "これは{fields}項目の固定Flowから出力されたものです。ご自身のアカウントでは項目を自由に選べます。Tavnitがすべてのパッキングリストを処理すると、こうなります：",
        },
        how: {
          steps: [
            { title: "パッキングリストをアップロード", body: "PDF、写真、スキャン。荷送人、言語、レイアウトを問いません。" },
            {
              title: "Tavnitが読み取る",
              body: "ヘッダー（荷送人、荷受人、港、合計）と、行ごとに梱包数、正味重量、総重量、寸法を含む貨物の表を見つけます。",
            },
            { title: "確認してダウンロード", body: "表が画面に表示されます。無料アカウントがあれば、Excelとして持ち帰れます。" },
          ],
        },
        faqs: [
          {
            q: "無料版には何が含まれますか？",
            a: "1日{limit}件まで、結果のすべてを画面で確認できます。Excelのダウンロードには、無料で作れるTavnitアカウントが必要です。",
          },
          {
            q: "どの形式に対応していますか？",
            a: "PDF（テキストまたはスキャン）、JPG、PNGで、最大4 MB・5ページです。パッキングリストがそれより長い場合は、分割してアップロードするか、アカウントを作成してください。",
          },
          {
            q: "パッキングリストからどの列を抽出しますか？",
            a: "ドキュメント単位では、荷送人、荷受人、番号、日付、関連する請求書、積込港、荷揚港、梱包数と重量の合計。明細行単位では、品名、数量、単位、梱包数、正味重量、総重量、寸法です。ドキュメントの値は各行に繰り返し入るので、表をそのまま絞り込めます。",
          },
          {
            q: "ほかの列を選べますか？",
            a: "ここではできません。このツールは17項目の固定パッキングリストFlowを使っています。ご自身のアカウントでは、パッキングリストでもほかのどんなドキュメントでも、必要な項目で独自のFlowを作れます。ドキュメント単位（コンテナ、シール、B/L番号、インコタームズ）でも、明細行単位（荷印、HSコード、容積）でも設定できます。テンプレートは不要で、項目を説明し、必要に応じて探す場所のヒントを添えるだけです。",
          },
          {
            q: "どの国のパッキングリストにも対応していますか？",
            a: "はい。英語、スペイン語など、さまざまな言語のパッキングリストに対応し、kgやlbの重量、cmやインチの寸法も印字どおりに読み取ります。パナマ、コロンビア、メキシコ、中国、米国などからの出荷でテスト済みです。",
          },
          {
            q: "仕入先ごとにテンプレートを設定する必要はありますか？",
            a: "いいえ。Tavnitはテンプレートを使いません。荷送人が明日パッキングリストのレイアウトを変えても、各ドキュメントを届いたままの状態で読み取ります。",
          },
          {
            q: "アップロードしたファイルはどうなりますか？",
            a: "無料ツール専用のTavnitアカウントで処理され、それ以外の目的には使われません。24時間後にファイルと抽出された行は自動で削除されます。残るのは実行があったという記録だけで、ドキュメントやその内容は保持しません。もっと早く削除したい場合は、support@tavnit.ioまでメールでご連絡ください。",
          },
          {
            q: "自動化するには？",
            a: "アカウントを作成し、必要な項目でFlowを作り、そのメールアドレスにパッキングリストを転送するか、API、webhook、Zapier、Make、n8nで接続します。すべての出荷データが、誰も手入力することなく、通関システム、ERP、Google スプレッドシートに届きます。",
          },
        ],
      },
    },
    /**
     * Bill of lading → Excel. Everything that is specific to an ocean B/L:
     * header fields, one row per container line, customs and forwarder use
     * cases.
     */
    "bill-of-lading-to-excel": {
      vocab: {
        doc: "船荷証券",
        docs: "船荷証券",
        a_doc: "船荷証券",
        the_doc: "船荷証券",
        the_docs: "船荷証券",
        your_doc: "お手元の船荷証券",
        your_docs: "お手元の船荷証券",
        all_your_docs: "すべての船荷証券",
        all_docs: "すべての船荷証券",
        each_doc: "すべての船荷証券",
        another_doc: "別の船荷証券",
        this_doc: "この船荷証券",
      },
      overrides: {
        title: "船荷証券（B/L）をExcelに無料変換：B/Lデータを抽出",
        description:
          "船荷証券（B/L）をPDFか写真でアップロードするだけで、データをExcelの表で受け取れます。B/L番号、船会社、荷送人、荷受人、本船、港に加え、コンテナごとに1行でシール、品名、梱包数、重量、容積が入ります。無料、テンプレート不要、結果を見るのに登録も不要です。",
        label: "船荷証券をExcelに",
        h1: "船荷証券をExcelに変換",
        intro:
          "B/LのPDFか写真をアップロードしてください。Tavnitがヘッダー（B/L番号、船会社、荷送人、荷受人、本船、航海番号、港、船積日）と、コンテナ、シール、梱包数、総重量、容積を含む各貨物明細を読み取り、スプレッドシートにしてお返しします。船会社ごとのテンプレートは不要で、同じFlowがMSC、Maersk、Hapag-Lloyd、どのNVOCCのB/Lも読み取ります。",
        drop: {
          title: "船荷証券をここにドロップ",
          sample: "サンプルのB/Lで試す",
        },
        stages: ["ドキュメントをアップロード中", "B/Lのヘッダーを読み取り中", "貨物明細を探しています", "列を整えています", "もうすぐ完了です"],
        result: {
          empty: "このドキュメントには貨物明細が見つかりませんでした。コンテナと貨物の表がある船荷証券でお試しください。",
          flowNote: "この{fields}列は、固定の船荷証券Flowの項目です。ご自身のアカウントでは、項目を自由に選べます。",
          ghostHint: "Tavnitでは必要な項目を自由に追加できます：インコタームズ、引渡地、ブッキング番号、ETA…",
          another: "別の船荷証券を処理する",
        },
        errors: {
          too_large: "ファイルが4 MBを超えています。圧縮するか、B/Lのページだけをアップロードしてください。",
        },
        next: {
          lead: "今回は船荷証券1件でした。アカウントがあれば、あらゆる船会社や代理店から届くすべてのB/Lに同じ処理が行われ、データはExcelで終わらずに、通関システムやフォワーディングシステムへ自動で流れていきます。",
          source: "お手元のB/L",
          flow: {
            name: "船荷証券",
            add: { name: "incoterm", type: "テキスト", hint: "「Incoterm」の横 · 例：CIF Manzanillo", save: "保存", value: "CIF" },
          },
          inputs: { show: "B/Lはどうやって取り込む？" },
        },
        cleaners: {
          lead: "抽出後、すべての船荷証券に自動で適用されるシンプルなルール。あなたのデータを使った4つのアイデアです：",
          ideas: [
            { icon: "date", title: "船積日の書き方を統一", from: "{date}", to: "{iso}", note: "すべてのB/Lが同じ形式に" },
            { icon: "alert", title: "総重量が範囲外", from: "コンテナごとの総重量", to: "26,000 kg超で警告", note: "積めないトラックを手配してしまわないように" },
            { icon: "calendar", title: "到着前に通知", from: "船積日 + 輸送日数", to: "5日前にリマインダー", note: "本船の着岸前に輸入申告を済ませるために" },
            { icon: "mail", title: "通関業者へ直接送付", from: "抽出したB/L", to: "表を添付したメール", note: "誰も転送しなくても通関業者に届く" },
          ],
        },
        after: {
          lead: "これは{fields}項目の固定Flowから出力されたものです。ご自身のアカウントでは項目を自由に選べます。Tavnitがすべての船荷証券を処理すると、こうなります：",
        },
        how: {
          steps: [
            { title: "B/Lをアップロード", body: "PDF、写真、スキャン。船会社、代理店、書式のレイアウトを問いません。" },
            { title: "Tavnitが読み取る", body: "ヘッダー（B/L番号、関係者、本船、航海番号、港、船積日、運賃条件）と貨物の表を見つけます。コンテナごとに1行で、シール、品名、梱包数、重量、容積を読み取ります。" },
            { title: "確認してダウンロード", body: "表が画面に表示されます。無料アカウントがあれば、Excelとして持ち帰れます。" },
          ],
        },
        faqs: [
          {
            q: "無料版には何が含まれますか？",
            a: "1日{limit}件まで、結果のすべてを画面で確認できます。Excelのダウンロードには、無料で作れるTavnitアカウントが必要です。",
          },
          {
            q: "船荷証券から何を抽出しますか？",
            a: "ヘッダーからは、B/L番号、船会社、荷送人、荷受人、着荷通知先、本船、航海番号、積込港、荷揚港、船積日、運賃条件、コンテナの一覧。貨物の表からは1明細につき1行で、コンテナ、シール、品名、梱包の数と種類、総重量、容積です。ヘッダーの値は各行に繰り返し入るので、シートをそのまま絞り込み・集計できます。",
          },
          {
            q: "ほかの列を選べますか？",
            a: "ここではできません。このツールは19項目の固定船荷証券Flowを使っています。ご自身のアカウントでは、B/Lでもほかのどんなドキュメントでも、必要な項目で独自のFlowを作れます。ドキュメント単位（インコタームズ、引渡地、ブッキング番号、ETA）でも、明細行単位（HSコード、荷印、リーファー温度）でも設定できます。テンプレートは不要で、項目を説明し、必要に応じて探す場所のヒントを添えるだけです。",
          },
          {
            q: "どの形式に対応していますか？",
            a: "PDF（テキストまたはスキャン）、JPG、PNGで、最大4 MB・5ページです。B/Lがそれより長い場合や、1つのスキャンに複数のB/Lが入っている場合は、分割してアップロードするか、アカウントを作成してください。",
          },
          {
            q: "どの船会社のB/Lにも対応していますか？",
            a: "はい。テンプレートを使わず、各B/Lを届いたままの状態で読み取ります。船会社のマスターB/L、フォワーダーのハウスB/L、海上運送状（Sea Waybill）のいずれも、英語でもスペイン語でも対応します。MSC、Maersk、Hapag-Lloyd、CMA CGM、Evergreen、NVOCCのレイアウトでテスト済みです。",
          },
          {
            q: "アップロードしたファイルはどうなりますか？",
            a: "無料ツール専用のTavnitアカウントで処理され、それ以外の目的には使われません。24時間後にファイルと抽出された行は自動で削除されます。残るのは実行があったという記録だけで、ドキュメントやその内容は保持しません。もっと早く削除したい場合は、support@tavnit.ioまでメールでご連絡ください。",
          },
          {
            q: "なぜダウンロードにアカウントが必要なのですか？",
            a: "無料版はお試し用だからです。アカウントがあれば、すべての船荷証券に同じ抽出を実行し、結果をメールで受け取り、通関システムやフォワーディングシステムに送れます。",
          },
          {
            q: "自動化するには？",
            a: "アカウントを作成し、必要な項目でFlowを作り、そのメールアドレス（船会社やフォワーダーがB/Lを送る宛先）にB/Lを転送するか、API、webhook、Zapier、Make、n8nで接続します。データは誰も手入力することなく、通関システム、ERP、Google スプレッドシートに届きます。",
          },
        ],
      },
    },
    /**
     * Compare supplier quotes. Two or three quotes for the same request go
     * through the quote Flow; the Matcher pairs the lines across suppliers
     * (semantically) and marks the cheapest unit price per line as Champion.
     * Nothing here is an invoice, so most of the base is overridden.
     */
    "quote-comparison": {
      vocab: {
        doc: "見積書",
        docs: "見積書",
        a_doc: "見積書",
        the_doc: "見積書",
        the_docs: "見積書",
        your_doc: "お手元の見積書",
        your_docs: "お手元の見積書",
        all_your_docs: "すべての見積書",
        all_docs: "すべての見積書",
        each_doc: "すべての見積書",
        another_doc: "別の見積書",
        this_doc: "この見積書",
      },
      overrides: {
        title: "仕入先の見積書を無料で比較：明細行ごとの比較表",
        description:
          "2〜3件の見積書をPDFか写真でアップロードするだけで、1つの比較表を受け取れます。各明細行に仕入先ごとの価格が並び、最安値に印が付きます。無料、テンプレート不要、結果を見るのに登録も不要です。",
        label: "仕入先の見積書を比較",
        h1: "仕入先の見積書を比較",
        intro:
          "同じ依頼に対する2〜3件の見積書をアップロードしてください。Tavnitがそれぞれを読み取り、仕入先ごとに書き方が違っても明細行を突き合わせ、各価格と明細行ごとの最安値を1つの表にまとめます。テンプレートも、手作業のスプレッドシートも不要です。",
        trust: ["見積書2〜3件 · PDFまたは写真", "1日{limit}件まで無料", "24時間後にすべて削除"],
        drop: {
          title: "ここに見積書をドロップ",
          hint: "PDFまたは写真",
          sample: "3件のサンプル見積書で試す",
          formats: "PDF・JPG・PNG · 見積書1件あたり最大4 MB・5ページ",
        },
        stages: ["見積書を読み取り中", "明細行を整理中", "Matcherが明細行を突き合わせ中", "もうすぐ完了です"],
        result: {
          flowNote: "各見積書は{fields}項目の固定Flowで処理され、Matcherが突き合わせます。ご自身のアカウントでは、項目を自由に選べます。",
          ghostHint: "Tavnitでは必要な項目を自由に追加できます：ブランド、保証、明細行ごとの納期…",
          download: "比較結果をExcelでダウンロード",
          another: "別の見積書を比較",
          empty: "この見積書には価格付きの明細行が見つかりませんでした。行ごとに品目、数量、価格が記載された見積書でお試しください。",
        },
        errors: {
          too_large: "どれかの見積書が4 MBを超えています。圧縮するか、明細行のあるページだけをアップロードしてください。",
          failed: "どれかの見積書を読み取れませんでした。別の見積書かサンプルでお試しください。",
          no_lines: "価格付きの明細行がない見積書があるため、比較できません。各見積書に単価付きの品目があるかご確認ください。",
          not_ready: "まだ見積書を読み取っています。少し待ってから、もう一度お試しください。",
        },
        auth: {
          title: "無料アカウントを作成して比較表をダウンロード",
          body: "Excelはすぐにダウンロードされます。アカウントがあれば、4件以上の見積書を比較したり、届くすべての入札で同じことを行ったりできます。",
        },
        next: {
          lead: "今回は3件の見積書を手動で比較しました。アカウントがあれば、メールで届く見積書がそれぞれFlowに入り、Matcherが自動で突き合わせ、比較表は購買部門、ERP、承認者へとその先に流れていきます。",
          source: "お手元の見積書",
          flow: {
            name: "見積書",
            add: { name: "brand", type: "テキスト", hint: "「Brand」の横、または品目の説明内", save: "保存", value: "Argos" },
          },
          inputs: { show: "見積書はどうやって取り込む？" },
        },
        cleaners: {
          lead: "読み取り後、すべての見積書に自動で適用されるシンプルなルール。4つのアイデアです：",
          ideas: [
            { icon: "date", title: "日付の書き方を統一", from: "{date}", to: "{iso}", note: "すべての見積書が同じ形式に" },
            { icon: "alert", title: "仕入先が5%を超えて値上げしたら警告", from: "今回の価格", to: "前回の見積と比較", note: "発注先を決める前に、明細行ごとに" },
            { icon: "approve", title: "発注先の決定を承認", from: "比較表", to: "決裁者", note: "承認されて初めて発注書を送付" },
            { icon: "calendar", title: "見積の有効期限をリマインド", from: "{date}まで有効", to: "5日前にリマインダー", note: "提示価格を逃さないように" },
          ],
        },
        after: {
          title: "比較表の準備ができました",
          lead: "これは{fields}項目の固定FlowとMatcherから出力されたものです。ご自身のアカウントでは項目を自由に選べます。Tavnitがすべての見積書を突き合わせると、こうなります：",
        },
        how: {
          steps: [
            { title: "2〜3件の見積書をアップロード", body: "同じ依頼に対する見積書を、PDFか写真で。仕入先、レイアウト、品目の書き方を問いません。" },
            { title: "Tavnitが読み取って突き合わせる", body: "各見積書の明細行を抽出し、書き方が違っても、Matcherが同じ品目同士を対応づけます。明細行ごとの最安値がChampionとして示されます。" },
            { title: "確認してダウンロード", body: "表が画面に表示されます。無料アカウントがあれば、Excelとして持ち帰れます。" },
          ],
        },
        faqs: [
          {
            q: "無料版には何が含まれますか？",
            a: "1日{limit}件まで（3件の見積書を比較すると3件として計算）、表のすべてを画面で確認できます。Excelのダウンロードには、無料で作れるTavnitアカウントが必要です。",
          },
          {
            q: "仕入先ごとに書き方が違う場合、どうやって明細行を対応づけるのですか？",
            a: "TavnitのMatcherを使います。説明の文字列そのものではなく意味を比較するので、「grey cement 42.5 kg」と「Portland cement type I grey, 42.5 kg bag」は同じ行になります。判断に迷う場合は、2段階目で同じ品目かどうかを判定します。",
          },
          {
            q: "Championとはどういう意味ですか？",
            a: "その明細行で単価が最も安い仕入先です。同額の場合は両方が表示されます。1社しか見積もっていない明細行は比較対象がありませんが、それも表示されます。",
          },
          {
            q: "4件以上の見積書を比較できますか？",
            a: "ここではできません。無料版で扱えるのは3件までです。ご自身のアカウントでは、Matcherが同じFlowの実行結果を最大10件まで比較でき、比較表をメールやERPに送ることもできます。",
          },
          {
            q: "ほかの列を選べますか？",
            a: "ここではできません。このツールは固定の見積書Flowを使っています。ご自身のアカウントでは、必要な項目（ブランド、保証、明細行ごとの納期）で独自のFlowを作り、価格、納期、任意の数値など、比較したい項目をMatcherに設定できます。",
          },
          {
            q: "どの形式に対応していますか？",
            a: "PDF（テキストまたはスキャン）、JPG、PNGで、見積書1件あたり最大4 MB・5ページです。",
          },
          {
            q: "アップロードしたファイルはどうなりますか？",
            a: "無料ツール専用のTavnitアカウントで処理され、それ以外の目的には使われません。24時間後にファイル、抽出された明細行、比較表は自動で削除されます。残るのは実行があったという記録だけです。",
          },
          {
            q: "自動化するには？",
            a: "アカウントを作成し、独自の項目で見積書Flowを作り、その上にMatcherを設定します。Matcherのメールアドレスに見積書を転送すれば、すべて揃った時点で比較表が自動で作成され、メール、webhook、またはERPに届きます。",
          },
        ],
        compare: {
          slots: [
            { title: "見積書A", hint: "PDFまたは写真", sample: "サンプル見積書A" },
            { title: "見積書B", hint: "PDFまたは写真", sample: "サンプル見積書B" },
            { title: "見積書C", hint: "PDFまたは写真", sample: "サンプル見積書C", optional: true },
          ],
          run: "比較する",
          sampleAll: "3件のサンプル見積書で試す",
          stages: ["見積書を読み取り中", "明細行を整理中", "Matcherが明細行を突き合わせ中", "もうすぐ完了です"],
          heading: "比較表が完成しました",
          summary: "{n} · {ref}",
          labels: {
            description: "品目",
            quantity: "数量",
            price: "単価",
            total: "合計",
            status: "ステータス",
            ref: "A",
            doc: "B",
            supplier: "仕入先",
            champion: "Champion",
            wins: "{n}行で最安",
            lines: ["行", "行"],
          },
          status: { ok: "一致", price: "価格が異なる", qty: "数量が異なる", both: "価格と数量が異なる", missing: "見積なし", extra: "この見積書のみ" },
          empty: "Matcherは見積書間で比較できる明細行を見つけられませんでした。同じ依頼に対する見積書で、単価付きの品目があるかご確認ください。",
          another: "別の見積書を比較",
          download: "比較結果をExcelでダウンロード",
        },
      },
    },
    /**
     * Contract key dates. One row per contract (a metadata-only Flow), so the
     * copy talks about dates and parties, never about line items.
     */
    "contract-dates": {
      vocab: {
        doc: "契約書",
        docs: "契約書",
        a_doc: "契約書",
        the_doc: "契約書",
        the_docs: "契約書",
        your_doc: "お手元の契約書",
        your_docs: "お手元の契約書",
        all_your_docs: "すべての契約書",
        all_docs: "すべての契約書",
        each_doc: "すべての契約書",
        another_doc: "別の契約書",
        this_doc: "この契約書",
      },
      overrides: {
        title: "契約書の更新日を無料で抽出（AI）",
        description:
          "契約書をPDFでアップロードするだけで、重要な日付をExcelの1行で受け取れます。当事者、開始日、終了日、自動更新、通知期間、更新拒絶の通知期限まで。無料、テンプレート不要、結果を見るのに登録も不要です。",
        label: "契約書の日付",
        h1: "契約書から重要な日付を抽出",
        intro:
          "PDFをアップロードしてください。Tavnitが契約書を読み取り、当事者、署名日、契約期間の開始日と終了日、自動更新の有無、通知期間、更新しない旨を伝える最終日を1行にまとめてお返しします。業務委託、賃貸借、供給、ライセンスなどの契約に、どんな形式でも対応します。",
        drop: {
          title: "契約書をここにドロップ",
          sample: "サンプルの契約書で試す",
        },
        stages: ["ドキュメントをアップロード中", "当事者を読み取り中", "契約期間と更新条項を探しています", "通知期限を計算中", "もうすぐ完了です"],
        result: {
          empty: "このドキュメントには当事者や日付が見つかりませんでした。契約期間の条項がある署名済みの契約書でお試しください。",
          flowNote: "この{fields}列は、固定の契約書Flowの項目です。ご自身のアカウントでは、項目を自由に選べます。",
          ghostHint: "Tavnitでは必要な項目を自由に追加できます：社内担当者、コストセンター、違約金条項…",
          another: "別の契約書を処理する",
        },
        next: {
          lead: "今回は契約書1件でした。アカウントがあれば、届くすべての契約書に同じ処理が行われ、日付はExcelで終わらずに、期限が来る前にアラートを出します。",
          source: "お手元の契約書",
          inputs: { show: "契約書はどうやって取り込む？" },
          flow: {
            name: "契約書",
            add: { name: "owner", type: "テキスト", hint: "自社側の署名者", save: "保存", value: "M. Perez" },
          },
        },
        cleaners: {
          lead: "読み取り後、すべての契約書に自動で適用されるシンプルなルール。あなたのデータを使った4つのアイデアです：",
          ideas: [
            { icon: "date", title: "日付の書き方を統一", from: "{date}", to: "{iso}", note: "すべての契約書が同じ形式に" },
            { icon: "calendar", title: "終了の60日前にリマインダー", from: "end_date", to: "余裕を持ってリマインド", note: "通知期限を過ぎる前に" },
            { icon: "alert", title: "自動更新：まず確認", from: "auto_renewal = Yes", to: "要確認", note: "誰も確認しないまま更新される契約をなくす" },
            { icon: "mail", title: "担当者にメール", from: "読み取った契約書", to: "行データ付きのメール", note: "署名した人に日付が届く" },
          ],
        },
        after: {
          lead: "これは{fields}項目の固定Flowから出力されたものです。ご自身のアカウントでは項目を自由に選べます。Tavnitがすべての契約書を読み取ると、こうなります：",
        },
        how: {
          steps: [
            { title: "契約書をアップロード", body: "テキストまたはスキャンのPDF。誰が作成したものでも、どんな種類の契約書でも対応します。" },
            { title: "Tavnitが読み取る", body: "当事者、署名、契約期間、更新条項、通知期間を見つけ、更新拒絶の通知期限を算出します。" },
            { title: "確認してダウンロード", body: "1行のデータが画面に表示されます。無料アカウントがあれば、Excelとして持ち帰れます。" },
          ],
        },
        faqs: [
          {
            q: "無料版には何が含まれますか？",
            a: "1日{limit}件の契約書まで、結果のすべてを画面で確認できます。Excelのダウンロードには、無料で作れるTavnitアカウントが必要です。",
          },
          {
            q: "どの日付や情報を抽出しますか？",
            a: "当事者、署名日、契約期間の開始日と終了日、契約期間の長さ、自動更新の有無、通知期間、更新拒絶の通知期限、通貨付きの契約金額、準拠法です。契約書に記載のない項目は空欄のままで、日付をでっち上げることはありません。",
          },
          {
            q: "なぜ結果は1行だけなのですか？",
            a: "契約書には、契約期間、署名日、当事者がそれぞれ1つずつしかないからです。アカウントがあれば、フォルダ内のすべての契約書を処理して、契約書ごとに1行の表を作成でき、終了日順にすぐ並べ替えられます。",
          },
          {
            q: "どの形式に対応していますか？",
            a: "PDF（テキストまたはスキャン）、JPG、PNGで、最大4 MB・5ページです。契約書がそれより長い場合は、契約期間と更新条項のあるページをアップロードするか、アカウントを作成してください。",
          },
          {
            q: "ほかの列を選べますか？",
            a: "ここではできません。このツールは14項目の固定契約書Flowを使っています。ご自身のアカウントでは、契約書でもほかのどんなドキュメントでも、社内担当者、違約金条項、保証など、必要な項目で独自のFlowを作れます。テンプレートは不要で、項目を説明し、必要に応じて探す場所のヒントを添えるだけです。",
          },
          {
            q: "アップロードしたファイルはどうなりますか？",
            a: "無料ツール専用のTavnitアカウントで処理され、それ以外の目的には使われません。24時間後にファイルと抽出された行は自動で削除されます。残るのは実行があったという記録だけで、ドキュメントやその内容は保持しません。もっと早く削除したい場合は、support@tavnit.ioまでメールでご連絡ください。",
          },
          {
            q: "どの国の契約書にも対応していますか？",
            a: "はい。英語、スペイン語など、さまざまな言語の契約書に対応し、日付の形式も問いません。米国、パナマ、メキシコ、コロンビアなどの契約書でテスト済みです。",
          },
          {
            q: "終了日の前に通知を受け取るには？",
            a: "アカウントを作成し、必要な項目でFlowを作り、そのメールアドレスに契約書を転送するか、API、webhook、Zapier、Make、n8nで接続します。Cleanerが通知期限と今日の日付を比較し、判断すべき人にメールやwebhookを送ります。",
          },
        ],
      },
    },
    /**
     * Receipt → Excel. Mostly photos of thermal tickets: restaurants, pharmacies,
     * taxis, supermarkets. What differs from the invoice base is the vocabulary,
     * the SEO text, the sample, the Cleaner ideas (expenses, not payables) and the
     * questions people actually ask about receipts.
     */
    "receipt-to-excel": {
      vocab: {
        doc: "レシート",
        docs: "レシート",
        a_doc: "レシート",
        the_doc: "レシート",
        the_docs: "レシート",
        your_doc: "お手元のレシート",
        your_docs: "お手元のレシート",
        all_your_docs: "すべてのレシート",
        all_docs: "すべてのレシート",
        each_doc: "すべてのレシート",
        another_doc: "別のレシート",
        this_doc: "このレシート",
      },
      overrides: {
        title: "レシートをExcelに無料変換：写真からスプレッドシートへ",
        description:
          "レシートの写真かPDFをアップロードするだけで、明細をExcelで受け取れます。店名、日付、品目、数量、税、チップ、合計まで。無料、テンプレート不要、結果を見るのに登録も不要です。レシートのOCRからスプレッドシートまで数秒で。",
        label: "レシートをExcelに",
        h1: "レシートをExcelに変換",
        intro:
          "レシートを写真に撮るか、PDFをアップロードしてください。Tavnitが店名、日付、価格付きの各品目、合計を読み取り、スプレッドシートにしてお返しします。色あせたり、傾いたり、しわくちゃになったりした感熱紙のレシートでも大丈夫。設定するテンプレートはありません。",
        drop: {
          title: "レシートの写真をここにドロップ",
          sample: "サンプルのレシートで試す",
        },
        stages: ["レシートをアップロード中", "店名と日付を読み取り中", "品目を探しています", "列を整えています", "もうすぐ完了です"],
        result: {
          empty: "このレシートには品目が見つかりませんでした。レシート全体が写り、影のない、より鮮明な写真でお試しください。",
          flowNote: "この{fields}列は、固定のレシートFlowの項目です。ご自身のアカウントでは、項目を自由に選べます。",
          ghostHint: "Tavnitでは必要な項目を自由に追加できます：コストセンター、使用者、プロジェクト、カテゴリ…",
        },
        next: {
          lead: "今回はレシート1件でした。アカウントがあれば、届くすべてのレシートに同じ処理が行われ、明細はExcelで終わらずに、その先へ自動で流れていきます。",
          source: "お手元のレシート",
          inputs: { show: "レシートはどうやって取り込む？" },
          flow: {
            name: "レシート",
            add: { name: "cost_center", type: "テキスト", hint: "使用者、またはプロジェクト", save: "保存", value: "Sales" },
          },
        },
        cleaners: {
          lead: "読み取り後、すべてのレシートに自動で適用されるシンプルなルール。あなたのデータを使った4つのアイデアです：",
          ideas: [
            { icon: "date", title: "日付の書き方を統一", from: "{date}", to: "{iso}", note: "すべてのレシートが経費精算用の同じ形式に" },
            { icon: "sum", title: "品目の合計は小計と一致すること", from: "品目 {sum}", to: "小計 {subtotal}", note: "一致しなければ写真の読み取りミスなので、誰かが確認", check: "sum" },
            { icon: "approve", title: "一定額を超えたら承認", from: "合計 {total}", to: "精算前に承認", note: "{threshold}を超えたとき" },
            { icon: "money", title: "自国通貨に換算", from: "{total} {currency}", to: "自国通貨", note: "出張精算用に、レシートの日付のレートで" },
          ],
        },
        after: {
          lead: "これは{fields}項目の固定Flowから出力されたものです。ご自身のアカウントでは項目を自由に選べます。Tavnitが出張1回分や1か月分のすべてのレシートを処理すると、こうなります：",
        },
        how: {
          steps: [
            { title: "レシートをアップロード", body: "スマートフォンの写真かPDF。店舗、言語を問わず、色あせたレシートでも対応します。" },
            { title: "Tavnitが読み取る", body: "店名、日付、番号、価格付きの各品目、そして小計、税、チップ、合計を見つけます。" },
            { title: "確認してダウンロード", body: "表が画面に表示されます。無料アカウントがあれば、Excelとして持ち帰れます。" },
          ],
        },
        faqs: [
          {
            q: "無料版には何が含まれますか？",
            a: "1日{limit}件のレシートまで、結果のすべてを画面で確認できます。Excelのダウンロードには、無料で作れるTavnitアカウントが必要です。",
          },
          {
            q: "スマートフォンで撮った写真でも使えますか？",
            a: "はい、それが一番よくある使い方です。JPG、PNG、PDFで最大4 MBまで。レシート全体が写り、明るさが均一で、指がかかっていないと読み取りやすくなりますが、少し傾いたりぼやけたりした写真でも読み取れます。",
          },
          {
            q: "どの形式に対応していますか？",
            a: "JPG、PNG、PDF（テキストまたはスキャン）で、最大4 MB・5ページです。スーパーの長いレシートも1枚の写真に収まります。",
          },
          {
            q: "店舗ごとにテンプレートを設定する必要はありますか？",
            a: "いいえ。Tavnitはテンプレートを使いません。レストラン、薬局、タクシー、ガソリンスタンドなど、どんなレシートも届いたままの状態で読み取ります。",
          },
          {
            q: "ほかの列を選べますか？",
            a: "ここではできません。このツールは15項目の固定レシートFlowを使っています。ご自身のアカウントでは、必要な項目で独自のFlowを作れます。ドキュメント単位（コストセンター、使用者、プロジェクト、カテゴリ）でも、明細行単位（商品コード）でも設定できます。テンプレートは不要で、項目を説明し、必要に応じて探す場所のヒントを添えるだけです。",
          },
          {
            q: "アップロードしたファイルはどうなりますか？",
            a: "無料ツール専用のTavnitアカウントで処理され、それ以外の目的には使われません。24時間後に写真と抽出された行は自動で削除されます。残るのは実行があったという記録だけで、ドキュメントやその内容は保持しません。もっと早く削除したい場合は、support@tavnit.ioまでメールでご連絡ください。",
          },
          {
            q: "出張のレシートが50枚あります。1枚ずつですか？",
            a: "ここではそうなります。アカウントがあれば、まとめて送れます。メールでFlowに転送する、一括でドロップする、APIで接続するなどの方法で、すべてのレシートが同じExcel、Google スプレッドシート、経費精算システムに行データとして届きます。",
          },
          {
            q: "自動化するには？",
            a: "アカウントを作成し、必要な項目でFlowを作り、そのメールアドレスにレシートの写真を転送するか、API、webhook、Zapier、Make、n8nで接続します。経費精算書が自動で出来上がります。",
          },
        ],
      },
    },
    /**
     * Number format. A spreadsheet in, the chosen columns out in one number
     * format: a file exported with "1.234,56" that Excel reads as text, or the
     * other way round.
     */
    "number-format": {
      vocab: {
        doc: "スプレッドシート",
        docs: "スプレッドシート",
        a_doc: "スプレッドシート",
        the_doc: "スプレッドシート",
        the_docs: "スプレッドシート",
        your_doc: "お手元のスプレッドシート",
        your_docs: "お手元のスプレッドシート",
        all_your_docs: "すべてのスプレッドシート",
        all_docs: "すべてのスプレッドシート",
        each_doc: "すべてのスプレッドシート",
        another_doc: "別のスプレッドシート",
        this_doc: "このスプレッドシート",
      },
      overrides: {
        title: "ExcelやCSVの数値形式を無料で修正",
        description:
          "1.234,56や1,234.56のような数値を含むExcelやCSVファイルをアップロードすると、1つの形式に揃えて、すぐ合計できる状態でお返しします。列と形式はあなたが選べます。無料、結果を見るのに登録は不要です。",
        label: "数値形式を修正",
        h1: "スプレッドシートの数値形式を修正",
        intro:
          "ExcelかCSVファイルをアップロードしてください。数値が入っている列と、希望する形式（1234.56、1,234.56、1.234,56）を選びます。Tavnitがすべての数値を変換し、列も順番もそのままのファイルをお返しします。",
        trust: ["CSVまたはExcel · 最大500行", "1日{limit}ファイルまで無料", "24時間後にすべて削除"],
        drop: {
          title: "ExcelかCSVファイルをここにドロップ",
          hint: "またはパソコンからファイルを選択",
          choose: "ファイルを選択",
          sample: "サンプルファイルで試す",
          formats: "CSVまたは.xlsx · 最大4 MB・500行",
        },
        errors: {
          unsupported: "CSVまたはExcel（.xlsx）ファイルのみ対応しています。",
          xls: "古い形式のExcelファイル（.xls）です。Excelで開き、.xlsxか.csvで保存し直してください。",
          too_many_rows: "無料版で扱えるのは500行までです。ファイルの一部をアップロードしてください。",
          too_many_columns: "一度に選べるのは10列までです。",
          no_columns: "少なくとも1列を選んでください。",
          nothing_to_clean: "選んだ列には、変換できる数値が見つかりませんでした。",
          empty: "ファイルが空か、見出しの下に行がありません。",
          unreadable: "ファイルを読み取れませんでした。Excelファイルの場合は、.xlsxで保存し直してください。",
          failed: "このファイルを変換できませんでした。もう一度お試しいただくか、サンプルファイルをお試しください。",
        },
        how: {
          heading: "使い方",
          steps: [
            { title: "ファイルをアップロード", body: "カンマ区切りまたはセミコロン区切りのCSV、またはExcelファイル。" },
            { title: "列と形式を選ぶ", body: "数値らしい列にはあらかじめチェックを入れています。ファイルの小数点がカンマかピリオドか、そしてどの形式にしたいかを選んでください。" },
            { title: "確認してダウンロード", body: "変更されたセルがハイライト表示されます。無料アカウントがあれば、ExcelまたはCSVとして持ち帰れます。" },
          ],
        },
        faqs: [
          { q: "なぜExcelで数値を合計できないのですか？", a: "Excelがそれらをテキストとして読み込んでいるからです。小数の書き方が異なるシステムや国から来たファイルで起こります。たとえば、1,234.56の設定のExcelに1.234,56が入っている場合や、その逆です。1つの形式に揃えれば、再び数値として扱われます。" },
          { q: "小数点がカンマかピリオドか、どうやって判断するのですか？", a: "値から推測します。1.234,56があれば、小数点はカンマです。たとえば1.234だけのように判断できない場合は、あなたに選んでいただきます。その選択によって、すべての数値の読み取り方が決まります。" },
          { q: "どの形式を選べばよいですか？", a: "桁区切りのない1234.56は、どのシステム、数式、インポートでも問題なく読み込める形式です。1,234.56と1.234,56は、国に応じて人に見せるための形式です。" },
          { q: "数値ではないセルはどうなりますか？", a: "そのまま残ります。パーセンテージ（15%）、テキスト（N/A）、空のセルには手を加えず、明らかに数値であるものだけを変更します。" },
          { q: "どの形式に対応していますか？", a: "カンマ、セミコロン、タブ区切りのCSVと、Excelの.xlsxで、最大4 MB・500行です。古い形式のExcelファイル（.xls）は、.xlsxで保存し直してください。" },
          { q: "アップロードしたファイルはどうなりますか？", a: "この変換にのみ使用され、24時間後に結果とともに削除されます。結果を見られるのは、あなたのブラウザだけです。" },
          { q: "これを自動で行うには？", a: "Tavnitでは、同じルールがCleanerになります。抽出したすべてのドキュメントや、メールやAPIで届くすべてのファイルに、日付、通貨、チェックとあわせて自動で適用されます。" },
        ],
        clean: {
          setup: {
            heading: "列と形式を選ぶ",
            fileSummary: "{rows} · {cols}",
            columnsLabel: "数値が入っている列",
            columnsHint: "最大{max}列。数値らしい列にはチェックを入れています。",
            tooMany: "一度に選べるのは{max}列までです。",
            inputLabel: "ファイルの小数点は",
            inputOptions: { comma: "カンマ · 1.234,56", dot: "ピリオド · 1,234.56" },
            outputLabel: "数値の希望形式",
            outputOptions: { plain: "1234.56 · 数式やシステム向け", us: "1,234.56", latam: "1.234,56" },
            preview: "最初の数行",
            run: "変換する",
            change: "ファイルを変更",
          },
          stages: ["ファイルをアップロード中", "列を読み取り中", "数値を変換中", "ファイルを作成中"],
          heading: "完了：{file}",
          summary: "{cols}で{cells}を変更",
          cellWord: ["セル", "セル"],
          columnWord: ["列", "列"],
          unchanged: "変更が必要なセルはありませんでした。すでにその形式になっています。",
          highlight: "変更されたセルは青で表示されています。",
          shown: "{total}行中{shown}行を表示しています。ダウンロードにはすべての行が含まれます。",
          download: "ダウンロード",
          downloadXlsx: "Excel（.xlsx）",
          downloadCsv: "CSV（.csv）",
          another: "別のファイルを変換",
          automate: {
            heading: "すべてのファイルで自動化",
            body: "Tavnitでは、このルールがCleanerになります。一度設定すれば、抽出したすべての請求書や、メールやAPIで届くすべてのファイルに、日付、通貨、チェックとあわせて自動で適用されます。",
            cta: "無料アカウントを作成",
            docs: "Cleanerとは",
          },
        },
      },
    },
    /**
     * Date format. A spreadsheet in, the chosen date columns out in one format.
     * Numeric dates are read with the visitor's day/month order; dates written in
     * words go through the Cleaner's AI conversion, which is the part a formula
     * cannot do.
     */
    "date-format": {
      vocab: {
        doc: "スプレッドシート",
        docs: "スプレッドシート",
        a_doc: "スプレッドシート",
        the_doc: "スプレッドシート",
        the_docs: "スプレッドシート",
        your_doc: "お手元のスプレッドシート",
        your_docs: "お手元のスプレッドシート",
        all_your_docs: "すべてのスプレッドシート",
        all_docs: "すべてのスプレッドシート",
        each_doc: "すべてのスプレッドシート",
        another_doc: "別のスプレッドシート",
        this_doc: "このスプレッドシート",
      },
      overrides: {
        title: "ExcelやCSVの日付形式を無料で修正",
        description:
          "形式がばらばらな日付（03/04/2024、March 12 2024、2024-03-12）を含むExcelやCSVファイルをアップロードすると、すべて1つの形式に揃えてお返しします。列と形式はあなたが選べます。無料、結果を見るのに登録は不要です。",
        label: "日付形式を修正",
        h1: "スプレッドシートの日付を1つの形式に統一",
        intro:
          "ExcelかCSVファイルをアップロードしてください。日付の列と、希望する形式（2024-03-12、12/03/2024、03/12/2024）を選びます。Tavnitが文字で書かれた日付も含めてすべてを変換し、列はそのままのファイルをお返しします。",
        trust: ["CSVまたはExcel · 最大500行", "1日{limit}ファイルまで無料", "24時間後にすべて削除"],
        drop: {
          title: "ExcelかCSVファイルをここにドロップ",
          hint: "またはパソコンからファイルを選択",
          choose: "ファイルを選択",
          sample: "サンプルファイルで試す",
          formats: "CSVまたは.xlsx · 最大4 MB・500行",
        },
        errors: {
          unsupported: "CSVまたはExcel（.xlsx）ファイルのみ対応しています。",
          xls: "古い形式のExcelファイル（.xls）です。Excelで開き、.xlsxか.csvで保存し直してください。",
          too_many_rows: "無料版で扱えるのは500行までです。ファイルの一部をアップロードしてください。",
          too_many_columns: "一度に選べるのは10列までです。",
          no_columns: "少なくとも1列を選んでください。",
          nothing_to_clean: "選んだ列には、変換できる日付が見つかりませんでした。",
          empty: "ファイルが空か、見出しの下に行がありません。",
          unreadable: "ファイルを読み取れませんでした。Excelファイルの場合は、.xlsxで保存し直してください。",
          failed: "このファイルを変換できませんでした。もう一度お試しいただくか、サンプルファイルをお試しください。",
        },
        how: {
          heading: "使い方",
          steps: [
            { title: "ファイルをアップロード", body: "CSVまたはExcelファイル。スラッシュ、ハイフン、ピリオド、文字など、日付はどんな書き方でも構いません。" },
            { title: "列と形式を選ぶ", body: "日付らしい列にはあらかじめチェックを入れています。ファイルが日と月のどちらを先に書いているか、そしてどの形式にしたいかを選んでください。" },
            { title: "確認してダウンロード", body: "変更されたセルがハイライト表示されます。無料アカウントがあれば、ExcelまたはCSVとして持ち帰れます。" },
          ],
        },
        faqs: [
          { q: "03/04/2024が4月3日なのか3月4日なのか、どうやって判断するのですか？", a: "日付1つだけでは判断できません。そこで、ファイルが日と月のどちらを先に書いているかをお尋ねします。列に15/04/2024のように1通りにしか読めない日付があれば、答えを提案します。" },
          { q: "文字で書かれた日付も理解できますか？", a: "はい。「March 5th 2024」「12 de marzo de 2024」「1 Apr 2024」のような日付はAIで読み取ります。これはExcelの数式ではできないことです。数字だけの日付はルールで読み取り、AIは使いません。" },
          { q: "どの形式を選べばよいですか？", a: "2024-03-12（年・月・日）は、どのシステムでも混乱なく読み込め、正しく並べ替えられる形式です。03/12/2024は米国の慣習、12/03/2024はヨーロッパや中南米で一般的です。" },
          { q: "日付ではないセルはどうなりますか？", a: "空のセルと同様に、そのまま残ります。確信を持って読み取れない日付は、推測せずに元のまま残します。" },
          { q: "Excelファイルにすでに日付として保存されている場合は？", a: "読み直すことなくそのまま受け取り、形式だけを変更します。" },
          { q: "アップロードしたファイルはどうなりますか？", a: "この変換にのみ使用され、24時間後に結果とともに削除されます。結果を見られるのは、あなたのブラウザだけです。" },
          { q: "これを自動で行うには？", a: "Tavnitでは、同じルールがCleanerになります。抽出したすべてのドキュメントや、メールやAPIで届くすべてのファイルに、数値、通貨、チェックとあわせて自動で適用されます。" },
        ],
        clean: {
          setup: {
            heading: "列と形式を選ぶ",
            fileSummary: "{rows} · {cols}",
            columnsLabel: "日付が入っている列",
            columnsHint: "最大{max}列。日付らしい列にはチェックを入れています。",
            tooMany: "一度に選べるのは{max}列までです。",
            inputLabel: "ファイルの数字の日付で先に来るのは",
            inputOptions: { dmy: "日 · 31/12/2024", mdy: "月 · 12/31/2024" },
            outputLabel: "日付の希望形式",
            outputOptions: { iso: "2024-03-12 · 年・月・日", dmy: "12/03/2024 · 日・月・年", mdy: "03/12/2024 · 月・日・年" },
            preview: "最初の数行",
            run: "変換する",
            change: "ファイルを変更",
          },
          stages: ["ファイルをアップロード中", "列を読み取り中", "日付を変換中", "文字で書かれた日付を読み取り中", "ファイルを作成中"],
          heading: "完了：{file}",
          summary: "{cols}で{cells}を変更",
          cellWord: ["セル", "セル"],
          columnWord: ["列", "列"],
          unchanged: "変更が必要なセルはありませんでした。すでにその形式になっています。",
          highlight: "変更されたセルは青で表示されています。",
          shown: "{total}行中{shown}行を表示しています。ダウンロードにはすべての行が含まれます。",
          download: "ダウンロード",
          downloadXlsx: "Excel（.xlsx）",
          downloadCsv: "CSV（.csv）",
          another: "別のファイルを変換",
          automate: {
            heading: "すべてのファイルで自動化",
            body: "Tavnitでは、このルールがCleanerになります。一度設定すれば、届くすべての請求書、契約書、ファイルに、数値、通貨、チェックとあわせて自動で適用されます。",
            cta: "無料アカウントを作成",
            docs: "Cleanerとは",
          },
        },
      },
    },
    /**
     * Currency converter. A spreadsheet in, a converted column next to each
     * amount column out, at the day's reference rate. The rates come from the
     * European Central Bank through Frankfurter (the engine's source), so the
     * copy says plainly which currencies are there and which are not.
     */
    "currency-converter": {
      vocab: {
        doc: "スプレッドシート",
        docs: "スプレッドシート",
        a_doc: "スプレッドシート",
        the_doc: "スプレッドシート",
        the_docs: "スプレッドシート",
        your_doc: "お手元のスプレッドシート",
        your_docs: "お手元のスプレッドシート",
        all_your_docs: "すべてのスプレッドシート",
        all_docs: "すべてのスプレッドシート",
        each_doc: "すべてのスプレッドシート",
        another_doc: "別のスプレッドシート",
        this_doc: "このスプレッドシート",
      },
      overrides: {
        title: "Excelの通貨を今日のレートで無料換算",
        description:
          "価格や金額を含むExcelやCSVファイルをアップロードすると、各列をドル、ユーロ、ポンドなど30通貨のいずれかに、その日の参照レートで換算します。無料、結果を見るのに登録は不要です。",
        label: "通貨を換算",
        h1: "スプレッドシートの金額を別の通貨に換算",
        intro:
          "ExcelかCSVファイルをアップロードしてください。金額の列、その通貨、換算先の通貨を選びます。Tavnitがその日のレートで換算した列を各列の横に追加し、ファイル全体をお返しします。",
        trust: ["CSVまたはExcel · 最大500行", "1日{limit}ファイルまで無料", "24時間後にすべて削除"],
        drop: {
          title: "ExcelかCSVファイルをここにドロップ",
          hint: "またはパソコンからファイルを選択",
          choose: "ファイルを選択",
          sample: "サンプルファイルで試す",
          formats: "CSVまたは.xlsx · 最大4 MB・500行",
        },
        errors: {
          unsupported: "CSVまたはExcel（.xlsx）ファイルのみ対応しています。",
          xls: "古い形式のExcelファイル（.xls）です。Excelで開き、.xlsxか.csvで保存し直してください。",
          too_many_rows: "無料版で扱えるのは500行までです。ファイルの一部をアップロードしてください。",
          too_many_columns: "一度に選べるのは10列までです。",
          no_columns: "少なくとも1列を選んでください。",
          nothing_to_clean: "選んだ列には、換算できる金額が見つかりませんでした。",
          empty: "ファイルが空か、見出しの下に行がありません。",
          unreadable: "ファイルを読み取れませんでした。Excelファイルの場合は、.xlsxで保存し直してください。",
          failed: "このファイルを換算できませんでした。もう一度お試しいただくか、サンプルファイルをお試しください。",
        },
        how: {
          heading: "使い方",
          steps: [
            { title: "ファイルをアップロード", body: "価格、合計など、金額の列があるCSVまたはExcelファイル。" },
            { title: "通貨を選ぶ", body: "金額らしい列にはあらかじめチェックを入れています。その通貨、小数の書き方、換算先の通貨を選んでください。" },
            { title: "確認してダウンロード", body: "換算された列が元の列の横に並びます。無料アカウントがあれば、ExcelまたはCSVとして持ち帰れます。" },
          ],
        },
        faqs: [
          { q: "どの為替レートを使っていますか？", a: "欧州中央銀行が公表するその日の参照レートです。ファイル全体で同じレートを使います。あくまで参照レートであり、取引銀行の買値・売値ではありません。" },
          { q: "どの通貨を換算できますか？", a: "米ドル（USD）、ユーロ（EUR）、英ポンド（GBP）、メキシコペソ（MXN）、ブラジルレアル（BRL）、人民元（CNY）、カナダドル、日本円、スイスフランなど、欧州中央銀行が公表する計30通貨です。どの通貨からどの通貨へも換算できます。" },
          { q: "コロンビアペソ、ソル、チリペソ、バルボアにも対応していますか？", a: "まだ対応していません。これらの通貨は欧州中央銀行のレートに含まれていないためです。バルボアが米ドルと等価のパナマでは、USDを選べます。" },
          { q: "元の列はどうなりますか？", a: "そのまま残ります。換算結果は、たとえば「Price (USD)」のような新しい列として横に追加されるので、比較できます。" },
          { q: "金額ではないセルはどうなりますか？", a: "換算後の列では空欄になります。テキスト、パーセンテージ、空のセルは換算しません。" },
          { q: "アップロードしたファイルはどうなりますか？", a: "この換算にのみ使用され、24時間後に結果とともに削除されます。結果を見られるのは、あなたのブラウザだけです。" },
          { q: "これを自動で行うには？", a: "Tavnitでは、通貨換算がCleanerになります。抽出したすべての請求書や、メールやAPIで届くすべてのファイルに、日付、数値、チェックとあわせて自動で適用されます。" },
        ],
        clean: {
          setup: {
            heading: "列と通貨を選ぶ",
            fileSummary: "{rows} · {cols}",
            columnsLabel: "金額が入っている列",
            columnsHint: "最大{max}列。金額らしい列にはチェックを入れています。",
            tooMany: "一度に選べるのは{max}列までです。",
            sourceLabel: "金額の通貨",
            sourceHint: "欧州中央銀行のレートがある通貨。",
            inputLabel: "小数点は",
            inputOptions: { comma: "カンマ · 1.234,56", dot: "ピリオド · 1,234.56" },
            outputPopular: "よく使われる通貨",
            outputAll: "すべての通貨",
            outputLabel: "換算先",
            outputOptions: {},
            preview: "最初の数行",
            run: "換算する",
            change: "ファイルを変更",
          },
          stages: ["ファイルをアップロード中", "金額を読み取り中", "その日のレートを取得中", "換算中", "ファイルを作成中"],
          heading: "完了：{file}",
          summary: "{cols}で{cells}を換算",
          cellWord: ["セル", "セル"],
          columnWord: ["列", "列"],
          unchanged: "選んだ列には、換算できる金額が見つかりませんでした。",
          highlight: "換算された列は青で表示されています。",
          shown: "{total}行中{shown}行を表示しています。ダウンロードにはすべての行が含まれます。",
          download: "ダウンロード",
          downloadXlsx: "Excel（.xlsx）",
          downloadCsv: "CSV（.csv）",
          another: "別のファイルを換算",
          automate: {
            heading: "すべての請求書で自動化",
            body: "Tavnitでは、通貨換算がCleanerになります。一度設定すれば、他通貨建ての請求書や見積書がすべて換算済みで届きます。日付、数値、チェックもあわせて処理できます。",
            cta: "無料アカウントを作成",
            docs: "Cleanerとは",
          },
        },
      },
    },
    /**
     * Translate columns. A spreadsheet in, a translated column next to each
     * chosen text column out. Every cell goes through a model, so the free
     * allowance is 200 rows instead of 500.
     */
    "translate-columns": {
      vocab: {
        doc: "スプレッドシート",
        docs: "スプレッドシート",
        a_doc: "スプレッドシート",
        the_doc: "スプレッドシート",
        the_docs: "スプレッドシート",
        your_doc: "お手元のスプレッドシート",
        your_docs: "お手元のスプレッドシート",
        all_your_docs: "すべてのスプレッドシート",
        all_docs: "すべてのスプレッドシート",
        each_doc: "すべてのスプレッドシート",
        another_doc: "別のスプレッドシート",
        this_doc: "このスプレッドシート",
      },
      overrides: {
        title: "Excelの列を無料で翻訳",
        description:
          "ExcelやCSVファイルをアップロードし、選んだ列を英語、スペイン語、ポルトガル語、中国語など40以上の言語に翻訳します。翻訳は各列の横に追加されます。無料、結果を見るのに登録は不要です。",
        label: "列を翻訳",
        h1: "スプレッドシートの列を翻訳",
        intro:
          "ExcelかCSVファイルをアップロードしてください。翻訳する列と翻訳先の言語を選びます。Tavnitが元の言語を検出して各列の横に翻訳を追加し、ファイルのほかの部分には手を加えません。",
        trust: ["CSVまたはExcel · 最大200行", "1日{limit}ファイルまで無料", "24時間後にすべて削除"],
        drop: {
          title: "ExcelかCSVファイルをここにドロップ",
          hint: "またはパソコンからファイルを選択",
          choose: "ファイルを選択",
          sample: "サンプルファイルで試す",
          formats: "CSVまたは.xlsx · 最大4 MB・200行",
        },
        errors: {
          unsupported: "CSVまたはExcel（.xlsx）ファイルのみ対応しています。",
          xls: "古い形式のExcelファイル（.xls）です。Excelで開き、.xlsxか.csvで保存し直してください。",
          too_many_rows: "無料の翻訳で扱えるのは200行までです。ファイルの一部をアップロードしてください。",
          too_many_columns: "一度に選べるのは10列までです。",
          no_columns: "少なくとも1列を選んでください。",
          nothing_to_clean: "選んだ列には、翻訳できるテキストが見つかりませんでした。",
          empty: "ファイルが空か、見出しの下に行がありません。",
          unreadable: "ファイルを読み取れませんでした。Excelファイルの場合は、.xlsxで保存し直してください。",
          failed: "このファイルを翻訳できませんでした。もう一度お試しいただくか、サンプルファイルをお試しください。",
        },
        how: {
          heading: "使い方",
          steps: [
            { title: "ファイルをアップロード", body: "品名、指示、コメントなど、テキストの列があるCSVまたはExcelファイル。" },
            { title: "列と言語を選ぶ", body: "テキストの列にはあらかじめチェックを入れています。翻訳先の言語を選んでください。元の言語は自動で検出します。" },
            { title: "確認してダウンロード", body: "各翻訳が元の列の横に並びます。無料アカウントがあれば、ExcelまたはCSVとして持ち帰れます。" },
          ],
        },
        faqs: [
          { q: "どの言語を選べますか？", a: "40以上の言語です：英語、スペイン語、ポルトガル語、フランス語、ドイツ語、中国語、イタリア語、日本語、韓国語、アラビア語、ロシア語、ヒンディー語、トルコ語、ベトナム語など。元の言語はセルごとに検出するので、ファイル内に複数の言語が混在していても使えます。" },
          { q: "コード、数値、固有名詞はどうなりますか？", a: "そのまま保持されます。翻訳では書式、単位、コードを尊重し、すでに翻訳先の言語で書かれたセルはそのまま残します。" },
          { q: "なぜ上限が200行なのですか？", a: "すべてのセルを言語モデルで翻訳するからです。無料版では1ファイルあたり200行まで扱えます。アカウントにはこの上限はありません。" },
          { q: "元の列はどうなりますか？", a: "そのまま残ります。翻訳は、たとえば「Description (ES)」のような新しい列として横に追加されます。" },
          { q: "通関用の品名に使えますか？", a: "はい、よくある使い方です。貨物を分類する前に、インボイスやパッキングリストの品名を英語やスペイン語にするといった用途です。" },
          { q: "アップロードしたファイルはどうなりますか？", a: "この翻訳にのみ使用され、24時間後に結果とともに削除されます。結果を見られるのは、あなたのブラウザだけです。" },
          { q: "これを自動で行うには？", a: "Tavnitでは、翻訳がCleanerになります。抽出したすべてのドキュメントや、メールやAPIで届くすべてのファイルに、日付、数値、通貨とあわせて自動で適用されます。" },
        ],
        clean: {
          setup: {
            heading: "列と言語を選ぶ",
            fileSummary: "{rows} · {cols}",
            columnsLabel: "テキストが入っている列",
            columnsHint: "最大{max}列。テキストの列にはチェックを入れています。",
            tooMany: "一度に選べるのは{max}列までです。",
            inputLabel: "",
            inputOptions: {},
            outputPopular: "よく使われる言語",
            outputAll: "すべての言語",
            outputLabel: "翻訳先",
            outputOptions: {},
            preview: "最初の数行",
            run: "翻訳する",
            change: "ファイルを変更",
          },
          stages: ["ファイルをアップロード中", "列を読み取り中", "言語を検出中", "翻訳中", "ファイルを作成中"],
          heading: "完了：{file}",
          summary: "{cols}で{cells}を翻訳",
          cellWord: ["セル", "セル"],
          columnWord: ["列", "列"],
          unchanged: "選んだ列には、翻訳できるテキストが見つかりませんでした。",
          highlight: "翻訳された列は青で表示されています。",
          shown: "{total}行中{shown}行を表示しています。ダウンロードにはすべての行が含まれます。",
          download: "ダウンロード",
          downloadXlsx: "Excel（.xlsx）",
          downloadCsv: "CSV（.csv）",
          another: "別のファイルを翻訳",
          automate: {
            heading: "すべてのドキュメントで自動化",
            body: "Tavnitでは、翻訳がCleanerになります。一度設定すれば、届くすべての請求書、パッキングリスト、ファイルが、品名を翻訳済みの状態で届きます。",
            cta: "無料アカウントを作成",
            docs: "Cleanerとは",
          },
        },
      },
    },
  },

  og: {
    "invoice-to-excel": "無料。テンプレート不要。請求書の明細行をスプレッドシートに。",
    "invoice-line-items": "無料。明細1行につき1行、ヘッダーは各行に。テンプレート不要。",
    "po-invoice-check": "無料。発注書の全明細を請求書と照合：価格、数量、欠落行、追加行。",
    "split-scanned-pdf": "無料。スキャン1件から、すべてのドキュメントを種類別に。",
    "packing-list-to-excel": "無料。テンプレート不要。パッキングリストの全明細をスプレッドシートに。",
    "bill-of-lading-to-excel": "無料。テンプレート不要。関係者、本船、港、コンテナごとに1行。",
    "quote-comparison": "無料。2〜3件の見積書を1つの表に、明細行ごとの最安値に印。",
    "contract-dates": "無料。当事者、契約期間、自動更新、通知期限を1行に。",
    "receipt-to-excel": "無料。レシートを撮るだけで、品目をスプレッドシートに。",
    "number-format": "無料。どんな数値の列も1つの形式に：1234.56、1,234.56、1.234,56。",
    "date-format": "無料。ばらばらの日付を1つの形式に。文字で書かれた日付も。",
    "currency-converter": "無料。どんな価格の列も、その日の参照レートで換算。",
    "translate-columns": "無料。どんなテキストの列も、40以上の言語に翻訳。",
  },
};

export default copy;
