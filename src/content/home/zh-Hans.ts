import type { HomeCopy } from "@/content/types";

/** Home (components/LocalizedHome.tsx) — 简体中文 (zh-Hans). */
const zhHans: HomeCopy = {
  title: "Tavnit — 用 AI 从文档中提取数据，审核后直接投入使用",
  description:
    "把发票、装箱单、合同和表单转换成结构化数据，无需为每家供应商制作模板。数据入账前由你的团队审核批准。支持 API、电子邮件和 MCP。",
  schemaName: "Tavnit 简体中文",
  breadcrumbHome: "首页",
  readInEnglish: "Read this page in English",
  eyebrow: "AI 文档运营",
  h1: "用 AI 从文档中提取数据，与团队一起审核，再付诸行动",
  lede:
    "Tavnit 把发票、装箱单、合同和表单转换成结构化数据——无需为每家供应商制作模板。任何数据入账之前都先经过你的团队审核批准，批准后的数据通过 API、Webhook 或电子邮件送达你的系统。",
  ctaDemo: "预约演示",
  ctaTry: "免费试用",
  ids: { howItWorks: "how-it-works", useCases: "use-cases", integrations: "integrations", faq: "faq" },
  problemHeading: "问题所在",
  problems: [
    "同样的字段，每个月都要从上百种不同版式里重新录入一遍。每家供应商的发票格式都不一样，总得有人手动把它们抄进电子表格或系统里。",
    "基于模板的 OCR 工具，一旦供应商改了版式就会悄无声息地出错。“和你的 PDF 聊天”这类工具会编造数字，既没有审核，也没有审计记录，更无法把数据送进你的系统。",
    "错误的合计和正确的合计看起来一模一样。真正的代价不是录入数据花掉的时间，而是错误悄悄进入你的账簿或报关单，却没有人发现。",
  ],
  stepsHeading: "工作原理：提取、审核、行动",
  steps: [
    {
      title: "提取",
      body: "你只需定义一次所需字段——发票号码、供应商、包含数量和单价的明细行——Tavnit 就能从任何 PDF、扫描件或照片中提取出来，不论版式如何。无需为每家供应商制作模板。",
    },
    {
      title: "审核",
      body: "Cleaner 负责清洗和校验：日期格式、币种、明细行计算、与主数据比对。任何对不上的数据都会停下来，交给指定的审核人。所有操作都记录在只可追加的审计日志中。",
    },
    {
      title: "行动",
      body: "批准后的数据通过 API 或 Webhook 送达你的 ERP 或财务系统，存入可查询的 Bucket，填写 PDF 表单，或交给一个替你在网页门户中操作的 Agent。",
    },
  ],
  useCasesHeading: "使用场景",
  useCasesIntro:
    "每个页面都会说明该类文档中哪些字段最重要、哪些地方最容易出错——正是这些让一种文档比另一种更难处理。",
  useCasesAll: "查看全部 {count} 个使用场景",
  integrationsHeading: "与你现有的工具无缝协作",
  integrations: [
    "电子邮件：把 PDF 转发到 Tavnit 的邮箱地址，就能收到提取好的数据。零集成。",
    "REST API 和 Webhook：从你的系统发送文档，处理完成的那一刻即可收到结果。提供 Zapier、Make、n8n 和 Power Automate 的现成方案。",
    "MCP 连接器：将 Tavnit 连接到 claude.ai 或 Cursor，让你的 AI 助手处理文档或查询已提取的数据。",
    "Bucket：内置的结构化存储，可以用自然语言查询并生成图表，无需导出任何数据。",
  ],
  integrationsAll: "全部集成",
  faqHeading: "常见问题",
  faqs: [
    {
      q: "需要为每家供应商制作一个模板吗？",
      a: "不需要。你在 Flow 中定义一次字段，Tavnit 就能在任何版式中找到它们。即使供应商更改了发票格式，你也什么都不用做。",
    },
    {
      q: "如何防止错误的数据进入我的系统？",
      a: "通过人工审核。你可以要求每份文档都经过批准，也可以只在 Cleaner 规则发现异常时才要求批准——例如数量乘以单价与该行金额不符。审核人会同时看到原始文档和提取出的数据，进行更正或批准，每一步操作都会记入审计日志。",
    },
    {
      q: "我该如何发送文档？",
      a: "随你喜欢：把带 PDF 附件的邮件转发到 Tavnit 的邮箱地址、在应用中上传，或通过 API 发送。结果可以通过 Webhook、API 或电子邮件发出，也可以存入可查询、可生成图表的 Bucket。",
    },
    {
      q: "支持我的语言吗？",
      a: "支持。Tavnit 可以提取任何语言撰写的文档，并且可以按照你的系统所用的字段名返回数据。应用本身也提供多种语言版本。",
    },
    {
      q: "费用是多少？",
      a: "按积分计费：1 积分等于处理 1 页。预约演示，我们会根据你的业务量和真实文档一起评估。",
    },
  ],
  finalHeading: "用你自己的文档试一试",
  finalBody:
    "带上一张真实的发票或装箱单。在演示中，我们会和你一起搭建第一个 Flow，你可以亲眼看到数据实时提取出来。",
};

export default zhHans;
