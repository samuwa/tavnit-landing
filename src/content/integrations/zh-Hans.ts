import type { IntegrationsContent } from "@/content/types";

/** Integrations: the /integrations hub (cards included) and /integrations/mcp — 简体中文 (zh-Hans). */
const zhHans: IntegrationsContent = {
  hub: {
    title: "集成 — API、电子邮件、Webhook 和 MCP",
    description:
      "进出 Tavnit 的所有方式：面向 AI 助手的 MCP 连接器、REST API、邮件转发、Webhook，以及 Zapier、Make 和 n8n 的现成方案。",
    ogTitle: "Tavnit 集成",
    breadcrumbHome: "首页",
    h1: "集成",
    intro:
      "文档可以用发送方团队最顺手的任何方式进入 Tavnit——在应用中拖放、转发到某个邮箱地址、提交到某个接口，或由 AI 助手发起请求。提取出的数据也以同样的方式送出。",
    introMore:
      "每条路径运行的都是同样的 Flow，所以无论文档从哪里来，你配置的字段结构、清洗规则和审核步骤都同样适用。",
    whichHeading: "该选哪一种？",
    which: [
      "**如果是人在发送文档**——比如一个接收供应商发票的财务邮箱——就用[电子邮件](/docs/email-integration)。谁都不需要学习新工具，照常转发即可。",
      "**如果是系统在发送文档**，就用 [REST API](/docs/api-integration)，并通过 [Webhook](/docs/webhooks) 把结果推送回来。如果你不想写衔接代码，同样的接口也可以在 Zapier、Make、n8n 和 Power Automate 中使用。",
      "**如果你在和 AI 助手协作**，就用 [MCP 连接器](/integrations/mcp)。它给 claude.ai 或 Cursor 的是整条流程，而不只是一个入口：你的助手可以搭建提取 Flow、添加清洗规则、让文档跑一遍，还能查询你已经提取的数据——全程无需你手动搬运文件。",
    ],
    finalHeading: "从一份文档开始",
    finalBody:
      "搭建一个 Flow，用一份文档跑一遍，看到输出之后再接通交付。开始时赠送免费积分。",
    finalCta: "免费开始",
  },
  items: [
    {
      label: "MCP 连接器",
      href: "/integrations/mcp",
      summary:
        "把 Tavnit 添加到 claude.ai、Cursor 或任何 MCP 客户端。你的助手可以搭建提取 Flow、添加清洗规则、处理文档并查询提取出的数据——全部通过聊天完成。",
      own: true,
    },
    {
      label: "REST API",
      href: "/docs/api-integration",
      summary:
        "使用 API 密钥以编程方式发送文档。支持 multipart 或 base64 上传，附 Python 和 JavaScript 示例。",
      own: false,
    },
    {
      label: "电子邮件",
      href: "/docs/email-integration",
      summary:
        "手动或自动把文档转发到专属邮箱地址，每个附件都会被提取——结果还能通过邮件发回给需要的人，全程无需打开应用。",
      own: false,
    },
    {
      label: "Webhook",
      href: "/docs/webhooks",
      summary:
        "运行一完成，就把类型化的结果推送到你自己的接口，让提取出的数据自动进入你的系统。",
      own: false,
    },
    {
      label: "Zapier、Make、n8n 和 Power Automate",
      href: "/docs/api-integration",
      summary:
        "调用同样接口的无代码方案，适合更愿意以可视化方式连接、而不是写代码的团队。",
      own: false,
    },
    {
      label: "Bucket",
      href: "/docs/buckets",
      summary:
        "把提取出的行保存在内置的结构化存储中——可以直接编辑、查询和生成图表，也可以导出为 CSV 和 Excel。",
      own: false,
    },
  ],
  mcp: {
    title: "面向 Claude 和 Cursor 的 MCP 文档提取",
    description:
      "通过 MCP 将 Tavnit 连接到 claude.ai 或 Cursor。你的助手可以搭建提取 Flow、处理文档并查询结果——类型化且经过清洗。",
    ogTitle: "用于文档提取的 MCP 服务器 | Tavnit",
    schemaHeadline: "用于文档提取的 MCP 服务器 — Claude 和 Cursor",
    schemaName: "MCP 连接器",
    breadcrumbHome: "首页",
    breadcrumbHub: "集成",
    breadcrumbSelf: "MCP 连接器",
    badge: "Model Context Protocol",
    h1: "给你的 AI 助手一条真正的文档处理流程",
    lede:
      "Tavnit 运行着一个 MCP 服务器。把它连接到 claude.ai 或 Cursor，你的助手就能使用整条文档处理流程：它可以搭建提取 Flow、添加清洗规则、把文档送进去处理，再读回结果——正是你定义的那些字段，经过清洗并且类型化，而不是对一份交给它的文件的自由解读。",
    ledeMore: "设置只需把一个 URL 粘贴到助手的设置中。无需 SDK，无需运行服务器，无需写代码。",
    ctaStart: "免费开始",
    ctaSetup: "设置指南",
    problemHeading: "为什么 AI 助手处理文档力不从心",
    problem: [
      "AI 助手擅长推理，却不擅长充当数据流水线。交给它一张扫描的发票，它会去读——大概率读对，有时读错，第二次读的结果还可能不一样。没有字段结构，所以字段名在不同次之间漂移。没有校验，所以读错的合计和正确的合计看起来一模一样。也没有任何过程记录，而一旦输出涉及财务或合规，这一点就至关重要。",
      "这对于偶尔问一个问题没什么问题，但作为一个流程却行不通。助手真正需要的，是一个已经知道如何读懂你的文档的工具。",
    ],
    compareHeading: "粘贴 PDF 与调用 Flow 的对比",
    compareCapability: "能力",
    compareChat: "把文件粘贴到聊天中",
    compareMcp: "通过 MCP 连接器",
    compareRows: [
      ["输出结构", "模型那一次返回什么就是什么", "每次都是你的 Flow 定义的字段"],
      ["字段名", "每次运行都可能变化", "由你的字段结构固定"],
      ["清洗规则", "无", "自动应用 Cleaner"],
      ["人工审核", "无法实现", "可选，并附审计日志"],
      ["结果去向", "留在聊天里", "Bucket、Webhook、电子邮件或 API"],
      ["可大批量重复执行", "否", "是——同一个 Flow，文档数量不限"],
    ],
    capabilitiesHeading: "连接之后，你的助手能做什么",
    capabilities: [
      {
        title: "描述一下就能搭建 Flow",
        body: "告诉助手要采集什么——供应商、日期、合计、明细行——它就会在你的组织中创建提取 Flow，随时可以运行。搭建一条流程从一下午的配置工作，变成了一条聊天消息。",
      },
      {
        title: "添加清洗规则",
        body: "要求把合计换算成美元、统一日期格式，或者与参考数据进行匹配，助手就会创建 Cleaner 并把它添加到 Flow 上——之后每一份文档，无论从哪里进来，都会应用同样的规则。",
      },
      {
        title: "让文档跑一遍 Flow",
        body: "让助手用你的某个提取 Flow 处理一张发票、一份合同或一张表单。它返回的是你定义的字段，类型化并经过清洗，而不是一段描述这些字段的文字。",
      },
      {
        title: "查询你已经提取的数据",
        body: "针对你的 Bucket 提问——上季度付给某家供应商多少钱、哪些合同下个月续约——答案来自你的实时数据，而不是模型的记忆。",
      },
    ],
    askHeading: "你可以这样问它：",
    ask: [
      "创建一个 Flow，从我们的货运发票中采集供应商、日期、合计和明细行。",
      "给那个 Flow 添加一个 Cleaner，把所有合计都换算成美元。",
      "用我的 Supplier Invoices Flow 处理这张发票，并给我看明细行。",
      "根据我的 Invoices Bucket，我们上季度付给 Acme Corp 多少钱？",
      "提取这三份合同的续约日期，并进行比较。",
      "现在有哪些运行在等待审核？",
    ],
    fitsHeading: "它使用的是你已经搭建好的流程",
    fitsIntro:
      "连接器并不是一个独立的提取引擎。它调用的是与 Tavnit 其他部分相同的 Flow——无论是你在应用中搭建的，还是助手替你创建的——这意味着当发起请求的是 AI 助手时，你配置的每一条规则依然有效。",
    fits: [
      "[Collection](/docs/collections) 依然会为进来的文档分类，并把它交给正确的 Flow。",
      "[Cleaner](/docs/cleaners) 依然会统一格式、换算币种，并执行你的查找规则。",
      "[人工审核](/docs/human-in-the-loop)依然会在你要求时暂停运行——助手无法跳过你的批准步骤。",
      "[Bucket](/docs/buckets) 依然会接收结果，所以助手提取的数据之后同样可以查询。",
    ],
    scopeHeading: "范围与访问权限",
    scopeCards: [
      {
        title: "只有你的权限，不多不少",
        body: "连接器由你自己的 API 密钥签发，只能访问你生成它时所在的组织。助手继承你的角色——你在应用里做不了的事，它也做不了。",
      },
      {
        title: "把 URL 当作凭证对待",
        body: "任何持有连接器 URL 的人都可以访问你的 Flow 和 Bucket。URL 有时效限制，刷新后旧的 URL 会立即失效。",
      },
    ],
    scopeMore:
      "完整细节请参阅[连接器文档](/docs/mcp-connector)和[用户角色参考](/docs/user-roles)。服务器端点为 `{mcpUrl}`。",
    setupHeading: "如何连接",
    setupBody:
      "在 Tavnit 的集成页面生成一个连接器 URL，然后在 claude.ai 的“设置 → 连接器”中粘贴，或者在 Cursor 中把它添加为远程 MCP 服务器。只需几分钟，无需写代码。",
    setupLink: "阅读分步设置指南",
    faqHeading: "常见问题",
    faqs: [
      {
        q: "这和把 PDF 粘贴到 Claude 里有什么不同？",
        a: "粘贴 PDF 是让助手去读一份它从未见过的文档，用的是它并非为解析而设计的格式，没有字段结构，也无法检查结果。MCP 连接器则让文档经过你定义的提取 Flow，所以你每次都能得到同样命名的字段、同样的类型，并应用同样的清洗规则和审核步骤。助手收到的是结构化数据，而不是一种解读。",
      },
      {
        q: "助手能搭建 Flow 和 Cleaner 吗，还是只能运行它们？",
        a: "两者都能。通过连接器，助手可以像你在应用中一样创建提取 Flow 和清洗规则：用自然语言描述你想要的字段、表格和转换，它们就会在你的组织中被创建出来，随时可以用于今后的每一份文档。创建权限遵循你的角色——所有者和管理员可以搭建，成员和查看者只能运行或只读。",
      },
      {
        q: "哪些 AI 助手可以使用？",
        a: "Pro 及以上方案的 claude.ai、Cursor，以及任何接受远程 MCP 服务器 URL 的客户端。MCP 是一个开放协议，所以支持范围不限于某一家厂商。",
      },
      {
        q: "需要写代码吗？",
        a: "不需要。你在 Tavnit 中生成一个连接器 URL，把它粘贴到助手的设置中即可。搭建它所调用的 Flow 同样无需代码——你描述想要的字段，Tavnit 就会把它们提取出来。",
      },
      {
        q: "助手能看到我公司账户里的所有内容吗？",
        a: "不能。连接器由你自己的 API 密钥签发，所以它只能访问你登录的那个组织，并且只拥有你的角色所具备的权限。成员无法让助手做成员在应用中做不了的事，私有 Bucket 也依然保持私有，除非你被授予了访问权限。",
      },
      {
        q: "使用连接器需要额外付费吗？",
        a: "不需要。通过连接器处理的文档按正常标准消耗积分，每页一个积分，与在应用中上传或调用 API 相同。MCP 访问不单独收费。",
      },
      {
        q: "连接器 URL 过期后会怎样？",
        a: "连接器 URL 有时效限制，Tavnit 会显示你的 URL 何时创建、何时过期。刷新会签发一个新的 URL，并立即使旧的失效，所以任何仍在使用旧 URL 的客户端都会停止工作，直到你粘贴新的 URL 为止。",
      },
    ],
    finalHeading: "让你的助手处理真实的文档",
    finalBody:
      "搭建一个 Flow，生成一个连接器 URL，然后开始提问。开始时赠送免费积分，无需信用卡。",
    finalPricing: "查看价格",
    finalDemo: "预约演示",
  },
};

export default zhHans;
