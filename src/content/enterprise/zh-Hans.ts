import type { EnterpriseCopy } from "@/content/types";

/** Enterprise services (/enterprise) — 简体中文 (zh-Hans). */
const zhHans: EnterpriseCopy = {
  title: "企业服务 — 实施落地、管控审计与业务咨询",
  description:
    "Tavnit Enterprise：按你的条款签订合同、手把手实施、用户角色与审计日志、直接技术支持，以及优化文档数字化和数据录入流程的业务咨询服务。",
  home: "首页",
  breadcrumbLabel: "面包屑导航",
  crumb: "企业版",
  eyebrow: "Tavnit Enterprise",
  h1: "企业服务",
  lead:
    "面向文档处理量大或需要专属条款的组织：在平台之外，我们还提供合同、帮助 Tavnit 投入生产的实施支持，以及围绕整个流程的咨询建议。",
  servicesHeading: "企业版包含哪些内容",
  services: [
    {
      title: "按你的条款签约",
      body: "处理量、商务条款和付款方式都在一份根据你的文档量量身定制的合同中约定，而不是使用自助订阅方案。",
    },
    {
      title: "手把手实施",
      body: "我们与你一起，基于你的真实文档配置 Flow、Cleaner、审核规则和集成（API、Webhook、电子邮件），并确保它们在生产环境中稳定运行。",
    },
    {
      title: "管控与审计",
      body: "用户角色（包括仅限审核的角色）、按条件触发的人工审核，以及记录每一次查看、编辑和批准的只可追加审计日志。",
      links: [
        { label: "用户角色", href: "/docs/user-roles" },
        { label: "人工审核", href: "/docs/human-in-the-loop" },
      ],
    },
    {
      title: "直接支持",
      body: "直接对接打造产品的团队，提供英语和西班牙语支持。",
    },
  ],
  advisory: {
    eyebrow: "Business Advisory",
    heading: "业务咨询",
    subheading: "优化文档数字化与数据录入流程",
    intro:
      "除了平台本身，我们还为希望梳理和改进文档信息接收、数字化与录入方式的企业提供咨询——无论最终是否使用 Tavnit 实现自动化。",
    scopeHeading: "咨询范围",
    scope: [
      { title: "现有流程诊断", body: "收到哪些文档、通过哪些渠道、数量多少；由谁录入、耗时多久、错误从何而来。" },
      { title: "数字化", body: "扫描与采集标准、文件整理与命名、拆分混合批次，以及保持原件可追溯。" },
      { title: "数据录入", body: "真正需要哪些字段，日期、金额和币种的标准格式，校验规则，以及与主数据的核对。" },
      { title: "内部控制", body: "哪些环节需要人工审核、职责分离，以及审计师或监管机构会要求的审计记录。" },
      { title: "系统集成", body: "数据如何进入你的 ERP、财务系统或电子表格，哪些步骤值得自动化，哪些不值得。" },
      { title: "上线与培训", body: "分阶段的实施计划，并为负责录入、审核和使用数据的人员提供培训。" },
    ],
    deliverablesHeading: "交付成果",
    deliverables:
      "一份关于现有流程的书面诊断报告、包含管控措施的新流程设计方案，以及一份分阶段实施计划，并附带衡量成效的指标——每份文档的录入时间、更正率、待审核文档数量。",
  },
  ctaHeading: "联系我们",
  ctaBody: "告诉我们你的文档类型和处理量，我们会告诉你哪些服务最适合你。",
  ctaButton: "预约会议",
  ctaEmail: "或发送邮件至",
};

export default zhHans;
