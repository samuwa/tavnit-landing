import type { DocsNavCopy } from "../types";

/**
 * Simplified Chinese docs: sidebar, chrome and page titles. Product nouns stay
 * English as the docs README asks (Flow, Collection, Cleaner, Bucket, Agent…);
 * UI labels follow the app's Simplified Chinese dictionary (tavnit-nextjs
 * src/lib/i18n/translations.zh-Hans.ts), e.g. "人工审核" for the Human in the
 * Loop page.
 */
const zhHans: DocsNavCopy = {
  docsName: "文档",
  home: "首页",
  description:
    "Tavnit 文档：AI 驱动的文档数据提取、人工审核、面向 AI 助手的 MCP 连接器、REST API、邮件触发等。",
  chrome: {
    back: "返回首页",
    toggle: "打开或关闭菜单",
    goHome: "前往首页",
    contents: "目录",
    close: "关闭菜单",
    nav: "文档",
    languages: "用其他语言阅读本页",
    englishOnly: "仅提供英文版",
    copy: "复制",
    copied: "已复制！",
    related: "相关文档",
    keepReading: "继续阅读",
  },
  groupLabels: {
    start: "入门",
    orchestration: "编排",
    input: "输入",
    processing: "处理",
    intelligence: "智能",
    verticals: "音频与社交",
    data: "数据与审核",
    integrate: "集成",
    organization: "组织",
  },
  labels: {
    "getting-started": "快速入门",
    pipelines: "Pipelines",
    "pipeline-map": "Pipeline 地图",
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
    "human-in-the-loop": "人工审核",
    "email-integration": "邮件集成",
    "api-integration": "API 集成",
    webhooks: "Webhooks",
    "mcp-connector": "MCP 连接器",
    "user-roles": "用户角色",
  },
  pages: {
    "getting-started": {
      heading: "快速入门",
      title: "Tavnit 文档：AI 文档数据提取快速入门",
      description:
        "设置你的第一个 Tavnit 提取 Flow：定义所需字段，上传文档，获取结构化数据。无需模板，也无需编写代码。",
    },
    flows: {
      heading: "Flows",
      title: "Flows：定义 Tavnit 从每份文档中提取的内容",
      description:
        "构建 Flow 的数据结构：元数据字段与表格字段、数据类型、告诉 AI 去哪里找的提取提示，以及组合字段和多值字段。",
    },
    "api-integration": {
      heading: "API 集成",
      title: "文档提取 REST API：Python、JavaScript 与无代码",
      description:
        "Tavnit REST API 参考：Flows、Collections、Splitters、Cleaners、Buckets、Agents、Pipelines 等的全部端点，另附无代码方案。",
    },
    "email-integration": {
      heading: "邮件集成",
      title: "自动从邮件附件中提取数据",
      description:
        "把文档转发到 Tavnit Flow、Collection 或 Splitter 的地址，每个附件都会被自动提取。支持的文件类型、跳过原因与输出。",
    },
    "mcp-connector": {
      heading: "MCP 连接器",
      title: "MCP 连接器设置：将 Tavnit 连接到 Claude 和 Cursor",
      description:
        "Tavnit MCP 连接器分步设置：生成连接器 URL，添加到 claude.ai 或 Cursor，按时刷新，并排查常见错误。",
    },
    "human-in-the-loop": {
      heading: "人工审核（Human in the Loop）",
      title: "人工审核，附带只增不改的审计记录",
      description:
        "在结果交付前暂停 Flow 进行人工审核：每个 Run 都审核，或仅审核 Cleaner 规则标记的 Run。指派审核者，编辑、批准或拒绝。",
    },
  },
};

export default zhHans;
