import type { DocsNavCopy } from "../types";

/**
 * Japanese docs: sidebar, chrome and page titles. Product nouns stay English as
 * the README asks (Flow, Collection, Cleaner, Bucket, Agent…); UI labels follow
 * the app's Japanese dictionary (tavnit-nextjs src/lib/i18n/translations.ja.ts),
 * e.g. "人によるレビュー" for the Human in the Loop page.
 */
const ja: DocsNavCopy = {
  docsName: "ドキュメント",
  home: "ホーム",
  description:
    "Tavnit のドキュメント：AI によるドキュメント抽出、人によるレビュー、AI アシスタント向け MCP コネクタ、REST API、メールトリガーなど。",
  chrome: {
    back: "ホームに戻る",
    toggle: "メニューを開く／閉じる",
    goHome: "ホームへ",
    contents: "目次",
    close: "メニューを閉じる",
    nav: "ドキュメント",
    languages: "このページを別の言語で読む",
    englishOnly: "英語のみ",
    copy: "コピー",
    copied: "コピーしました！",
    related: "関連ドキュメント",
    keepReading: "続けて読む",
  },
  groupLabels: {
    start: "はじめに",
    orchestration: "オーケストレーション",
    input: "入力",
    processing: "処理",
    intelligence: "インテリジェンス",
    verticals: "音声とソーシャル",
    data: "データとレビュー",
    integrate: "連携",
    organization: "組織",
  },
  labels: {
    "getting-started": "はじめに",
    pipelines: "Pipelines",
    "pipeline-map": "Pipeline マップ",
    collections: "Collections",
    subjects: "Subjects",
    splitters: "Splitters",
    flows: "Flows",
    cleaners: "Cleaners",
    agents: "Agents",
    matchers: "Matchers",
    inspectors: "Inspectors",
    fillers: "Fillers",
    signals: "Signals",
    nets: "Nets",
    buckets: "Buckets",
    "human-in-the-loop": "人によるレビュー",
    "email-integration": "メール連携",
    "api-integration": "API 連携",
    webhooks: "Webhooks",
    "mcp-connector": "MCP コネクタ",
    "user-roles": "ユーザーロール",
  },
  pages: {
    "getting-started": {
      heading: "はじめに",
      title: "Tavnit ドキュメント：AI ドキュメント抽出をはじめる",
      description:
        "Tavnit で最初の抽出 Flow を設定します。必要なフィールドを定義し、ドキュメントをアップロードして、構造化データを受け取りましょう。テンプレートもコードも不要です。",
    },
    flows: {
      heading: "Flows",
      title: "Flows：Tavnit が各ドキュメントから抽出する内容を定義する",
      description:
        "Flow のデータスキーマを構築します。メタデータフィールドとテーブルフィールド、データ型、AI に探す場所を伝える抽出ヒント、複合フィールドと複数値フィールド。",
    },
    "api-integration": {
      heading: "API 連携",
      title: "ドキュメント抽出 REST API：Python、JavaScript、ノーコード",
      description:
        "Tavnit REST API リファレンス：Flows、Collections、Splitters、Cleaners、Buckets、Agents、Pipelines などのすべてのエンドポイントと、ノーコードのレシピ。",
    },
    "email-integration": {
      heading: "メール連携",
      title: "メールの添付ファイルからデータを自動抽出する",
      description:
        "Tavnit の Flow、Collection、Splitter のアドレスにドキュメントを転送するだけで、すべての添付ファイルが自動で抽出されます。対応形式、スキップ理由、出力。",
    },
    "mcp-connector": {
      heading: "MCP コネクタ",
      title: "MCP コネクタの設定：Tavnit を Claude と Cursor に接続する",
      description:
        "Tavnit MCP コネクタの設定手順：コネクタ URL を生成し、claude.ai または Cursor に追加し、更新に対応し、よくあるエラーを解決します。",
    },
    "human-in-the-loop": {
      heading: "人によるレビュー（Human in the Loop）",
      title: "追記専用の監査証跡を備えた人によるレビュー",
      description:
        "結果を配信する前に Flow を一時停止して人がレビューします。すべての Run でも、Cleaner のルールがフラグを付けた Run だけでも。レビュアーを割り当て、編集、承認、却下。",
    },
  },
};

export default ja;
