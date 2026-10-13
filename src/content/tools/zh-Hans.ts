import type { LiteLocaleCopy } from "@/lib/lite/copy-base";

/**
 * Free tools copy — 简体中文 (zh-Hans), translated from ./en.ts.
 *
 * One file per language: `base` is one complete tool written with document
 * tokens ({doc}, {a_doc}, {Doc}…, filled from each tool's `vocab`; {limit}
 * is the daily quota); `tools` supplies each tool's words and only the
 * strings that differ from the base; `hub`, `shell` and `related` are the
 * hub page, the Lite header/footer and the "when it is every document" block;
 * `og` is the subtitle of each tool's social card. Assembled by
 * src/lib/lite/copy.ts. Column names, flows and samples are NOT here: they
 * belong to the engine (src/lib/lite/defs, engineLocale()).
 */

const INVOICE_VOCAB = {
  doc: "发票",
  docs: "发票",
  a_doc: "一张发票",
  the_doc: "发票",
  the_docs: "这些发票",
  your_doc: "你的发票",
  your_docs: "你的发票",
  all_your_docs: "你所有的发票",
  all_docs: "所有发票",
  each_doc: "每一张发票",
  another_doc: "另一张发票",
  this_doc: "这张发票",
};

const SPREADSHEET_VOCAB = {
  doc: "表格",
  docs: "表格",
  a_doc: "一个表格",
  the_doc: "表格",
  the_docs: "这些表格",
  your_doc: "你的表格",
  your_docs: "你的表格",
  all_your_docs: "你所有的表格",
  all_docs: "所有表格",
  each_doc: "每一个表格",
  another_doc: "另一个表格",
  this_doc: "这个表格",
};

const copy: LiteLocaleCopy = {
  base: {
    title: "{Doc}转 Excel，免费：用 AI 提取任意{doc}的明细行",
    description:
      "上传{doc}的 PDF 或照片，即可得到 Excel 表格形式的明细行：描述、数量、单价和金额。免费，无需模板，无需注册即可查看结果。",
    label: "{Doc}转 Excel",
    h1: "把{doc}变成 Excel",
    intro:
      "上传 PDF 或照片。Tavnit 会读取表头和表格中的每一行，并以电子表格的形式交还给你。无需为每个供应商设置模板：同一个工具适用于{all_your_docs}。",
    trust: ["PDF、JPG 或 PNG · 最多 5 页", "每天 {limit} 份免费文档", "24 小时后全部删除"],
    drop: {
      title: "把{your_doc}拖到这里",
      hint: "或从电脑中选择文件",
      choose: "选择文件",
      sample: "用示例{doc}试试",
      formats: "PDF、JPG 或 PNG · 最大 4 MB、5 页",
    },
    stages: ["正在上传文档", "正在读取表头", "正在查找明细表", "正在整理列", "马上就好"],
    result: {
      heading: "完成：{file}",
      rowWord: ["行", "行"],
      pageWord: ["页", "页"],
      summary: "{rows} · {pages}",
      truncated: "显示 {total} 行中的 {shown} 行。Excel 中包含同样的 {shown} 行。",
      readyIn: "{s} 秒完成",
      sum: "合计",
      viewer: "你的文档",
      openDocument: "查看文档",
      closeDocument: "关闭",
      retention: "24 小时后自动删除",
      hideColumn: "移除列",
      hiddenCols: ["已移除 1 列，Excel 中不会包含它。", "已移除 {n} 列，Excel 中不会包含它们。"],
      restoreAll: "全部恢复",
      restoreOne: "恢复 {col}",
      ghostColumn: "+ 你的字段",
      ghostHint: "在 Tavnit 中，你可以添加任何需要的字段：采购单号、到期日、成本中心……",
      flowNote: "这 {fields} 列是一个固定的{doc} Flow 的字段。在你的账户中，字段由你决定。",
      flowNoteCta: "了解做法",
      download: "下载 Excel",
      downloading: "正在准备文件",
      another: "处理{another_doc}",
      empty: "我们没有在这份文档中找到明细表。请换一份每行都有数量和价格的{doc}试试。",
    },
    errors: {
      empty: "文件是空的。",
      too_large: "文件超过 4 MB。请压缩后再上传，或只上传{the_doc}所在的页面。",
      unsupported: "仅支持 PDF、JPG 或 PNG 文件。",
      unreadable: "我们无法打开这个 PDF。如果它设有密码，请先移除密码再试。",
      too_many_pages: "免费版每份文档最多处理 5 页。",
      captcha: "我们无法确认你不是机器人。请刷新页面后重试。",
      quota: "你今天的 {limit} 份免费文档已用完。明天会自动恢复，或者创建账户继续使用。",
      daily_cap: "免费工具今天的处理量已达上限。请明天再来，或者现在创建账户继续使用。",
      unavailable: "工具暂时不可用。请过几分钟再试。",
      backend: "处理文档时出了点问题。请重试。",
      failed: "我们无法提取这份文档。请换{another_doc}，或使用示例文件试试。",
      timeout: "处理时间比平时长。请稍等片刻再试。",
      forbidden: "此处不允许执行该操作。",
      bad_request: "文件缺失或无法读取。",
    },
    auth: {
      title: "创建免费账户即可下载",
      body: "Excel 会立即开始下载。有了账户，你还可以一次性处理{all_your_docs}。",
      google: "使用 Google 继续",
      or: "或使用邮箱",
      signin: "登录",
      signup: "创建账户",
      name: "姓名",
      email: "邮箱",
      password: "密码",
      submitSignin: "登录并下载",
      submitSignup: "创建账户并下载",
      switchToSignin: "我已有账户",
      switchToSignup: "我还没有账户",
      checkEmail: "我们已向你发送了一封确认账户的邮件。打开邮件完成确认，回来时 Excel 就可以下载了。",
      existing: "该邮箱已注册账户。请登录后下载。",
      forgot: "忘记密码",
      close: "关闭",
      generic: "注册未能完成。请检查邮箱和密码后重试。",
    },
    next: {
      heading: "然后呢？",
      lead: "刚才处理的只是{a_doc}。有了账户，{each_doc}一到达都会自动这样处理，而且数据不会停在 Excel 里：它们会自己继续流转。",
      source: "{Your_doc}",
      node: "Tavnit",
      nodeSub: "提取 Flow",
      items: [
        {
          short: "发到你的邮箱",
          via: "邮件",
          title: "结果直接发到你的邮箱",
          body: "提取完成后，Tavnit 会向你在 Flow 上设置的邮箱发送邮件，并以 rows.csv 附件的形式附上数据行。如果开启了审核，邮件会等审批通过后再发。",
          linkLabel: "邮件输出",
          href: "/docs/email-integration",
          scene: [{ label: "提取完成" }, { label: "Tavnit 撰写邮件" }, { label: "送达你指定的人", result: "附带 rows.csv" }],
        },
        {
          short: "进入你的 ERP",
          via: "webhook",
          title: "通过 webhook 进入你的 ERP",
          body: "每次运行完成后，Tavnit 会把数据行和 run_id 通过 POST 发送到你提供的 URL。Zapier、Make 和 n8n 用各自的 webhook 触发器即可接收，无需原生集成。",
          linkLabel: "Webhooks",
          href: "/docs/webhooks",
          scene: [{ label: "提取出的数据行" }, { label: "一次 POST，带上数据行和 run_id" }, { label: "数据出现在你的系统中", result: "6 行，无人手动录入" }],
        },
        {
          short: "入账前先审核",
          via: "审核",
          title: "入账前由人工审批",
          body: "为 Flow 开启审核后，每次运行都会暂停。审核人会在原始文档旁看到可编辑的表格：修改单元格、排除行、添加列，然后批准或驳回。只有批准后，邮件、webhook 和 Bucket 才会发出；每个决定都有记录。还可以设置仅审核角色，让相关人员只能看到审核内容。",
          linkLabel: "人工审核",
          href: "/docs/human-in-the-loop",
          scene: [{ label: "运行暂停，等待审核" }, { label: "审核人对照文档修正" }, { label: "批准后才交付", result: "修正 1 个单元格 · 已记录" }],
        },
        {
          short: "比较报价",
          via: "Matcher",
          title: "逐行比较多份报价",
          body: "Matcher 会取同一个 Flow 的多次运行结果，比如三家供应商的报价，按描述把各行配对，并在 Champion 列中标出每一行最便宜的那家。",
          linkLabel: "供应商报价",
          href: "/use-cases/supplier-quotes",
          scene: [{ label: "三份报价，同一个 Flow" }, { label: "Matcher 配对各行" }, { label: "Champion 列：每行最优", result: "供应商 B 赢下 5 行中的 4 行" }],
        },
        {
          short: "规则与校验",
          via: "Cleaner",
          title: "Cleaner 清洗并校验每一行",
          body: "日期格式、数字格式、计算字段、按公布汇率换算币种，以及条件动作：某一行未通过校验时，转人工审核、发邮件或触发 webhook。",
          linkLabel: "Cleaners",
          href: "/docs/cleaners",
          scene: [{ label: "原始到达的数据" }, { label: "Cleaner 应用你的规则" }, { label: "数据已清洗，问题已标记", result: "日期、数字和合计均无误" }],
        },
        {
          short: "Agent 打开门户网站",
          via: "Agent",
          title: "Agent 登录供应商门户",
          body: "你用日常语言写下任务，提供起始 URL，凭据存放在模型永远看不到的保险库中。提取完成后，Agent 会带着文档字段自动启动，并按你要求的类型带回结果：价格、交货期、文件。",
          linkLabel: "Agents",
          href: "/docs/agents",
          scene: [{ label: "提取完成" }, { label: "Agent 浏览门户网站" }, { label: "带回结构化数据", result: "价格 18.50 · 交货期 5 天" }],
        },
        {
          short: "对数据提问",
          via: "Bucket",
          title: "向{your_docs}提问",
          body: "数据行保存在 Bucket 中。你用日常语言提问，Tavnit 把问题转成一个计划（求和、筛选、按月），在数据库中执行后给出数字。模型从不亲自做算术。",
          linkLabel: "Buckets",
          href: "/docs/buckets",
          scene: [{ label: "“8 月份我们从 Istmo 采购了多少？”" }, { label: "计划：求和 · 供应商 · 月份" }, { label: "由数据库计算出的数字", result: "4 份{docs}，共 $12,480" }],
        },
      ],
      hint: "点选一个选项，或点击 Tavnit 标签，看看会发生什么。",
      flow: {
        title: "Flow：列由你来定",
        body: "Flow 是对一种文档类型的定义：列出你想提取的字段，每个字段有名称、数据类型，以及它是每份文档出现一次还是每行出现一次；必要时还可以附上提示，告诉它去哪里找。启用后，每份到达的文档都会按这些字段精准读取，输出的表格每个字段对应一列。这个工具使用的是一个固定的{doc} Flow，共 {fields} 个字段。在你的账户中，你可以添加、删除和重命名字段，也可以为任何其他文档创建 Flow。无需模板，无需坐标。",
        linkLabel: "Flow 是如何定义的",
        href: "/docs/flows",
        scene: [{ label: "你把字段分成两组定义：文档字段和表格字段" }, { label: "表头读一次，表格逐行读取" }, { label: "每个明细一行：文档值重复，表格值变化", result: "5 个字段 → 5 列" }],
        name: "{Doc}",
        kinds: ["文档字段", "表格字段"],
        add: { name: "purchase_order", type: "文本", hint: "位于“PO”旁边 · 例如 PO-2291", save: "保存", value: "PO-2291" },
        activate: "已启用",
      },
      inputs: {
        show: "{Your_doc}怎么进入 Tavnit？",
        hide: "隐藏输入方式",
        items: [
          {
            short: "通过邮件",
            via: "每个 Flow 一个地址",
            title: "转发邮件就搞定了",
            body: "每个 Flow 都有自己的专属地址，形如 xxx-lite-<id>@mg.tavnit.io。把附有{doc}的邮件转发过去，每个附件都会变成一次运行。邮件的主题和正文不会被读取。",
            linkLabel: "邮件接收",
            href: "/docs/email-integration",
            scene: [{ label: "你转发带附件的邮件" }, { label: "邮件到达 Flow 的地址" }, { label: "每个附件就是一次运行", result: "1 个附件 → 1 次运行" }],
          },
          {
            short: "手动上传",
            via: "在应用中",
            title: "在应用中上传",
            body: "把 PDF 或照片拖到 Flow 上，运行立即开始。和你在这里做的一样，只是用你自己的账户，而且没有每日限额。",
            linkLabel: "Flows",
            href: "/docs/flows",
            scene: [{ label: "你把文件拖到 Flow 上" }, { label: "运行开始" }, { label: "几秒内得到数据行", result: "和这里一样，没有上限" }],
          },
          {
            short: "API",
            via: "POST /api/runs/process",
            title: "从你的系统通过 API 接入",
            body: "使用你的 API key，向 /api/runs/process 发送一次 POST，带上文件和 flow_id。接口返回 202 和 run_id；你再 GET /api/runs/<id>，直到状态为 completed、数据行返回为止。",
            linkLabel: "API",
            href: "/docs/api-integration",
            scene: [{ label: "POST 文件和 flow_id" }, { label: "202：run_id，已排队" }, { label: "GET 直到完成", result: "status: completed · 6 行" }],
          },
          {
            short: "Zapier · Make · n8n",
            via: "一次 HTTP 调用",
            title: "从 Zapier、Make 或 n8n 接入",
            body: "没有原生应用，也不需要：一个 HTTP 步骤（Zapier 中的 Custom Request，Make 中的 Make a request）把文件发送到 /api/runs/process。数据行再通过 webhook 回到同一个工具的触发器中。",
            linkLabel: "集成",
            href: "/integrations",
            scene: [{ label: "场景中的一个 HTTP 步骤" }, { label: "Tavnit 进行处理" }, { label: "webhook 返回数据行", result: "回到 Zapier、Make 或 n8n" }],
          },
          {
            short: "一个 PDF 里有多份",
            via: "由 Splitter 拆分",
            title: "一个 PDF 里有多份文档",
            body: "Splitter 会找出每份文档从哪里开始，按你描述的类型对每一段进行分类，再把每一段送到对应的 Flow。一次扫描里有三份{docs}，最后就是三次运行。",
            linkLabel: "Splitters",
            href: "/docs/splitters",
            scene: [{ label: "一个 PDF，里面有三份{docs}" }, { label: "Splitter 切分并分类" }, { label: "三次运行，每份{doc}一次", result: "3 段 · 3 次运行" }],
          },
        ],
      },
      replay: "再看一遍",
      tryIt: "在 Tavnit 中试试",
      tryItSignedIn: "在我的账户中这样做",
      primary: "创建免费账户",
      primarySignedIn: "前往 Tavnit",
      sameLogin: "你已经有账户了。用同样的登录方式（{email}）登录 Tavnit 即可；因为是不同的网站，它会再询问一次。",
      secondary: "预约演示",
    },
    cleaners: {
      heading: "有了 Cleaner，你可以……",
      lead: "简单的规则，在提取完成后自动作用于{each_doc}。下面是用你自己的数据举的四个例子：",
      tag: "Cleaners",
      ideas: [
        { icon: "date", title: "统一日期写法", from: "{date}", to: "{iso}", note: "{each_doc}，同一种格式" },
        { icon: "sum", title: "明细行之和必须等于小计", from: "明细合计 {sum}", to: "小计 {subtotal}", note: "对不上，就不会在没人看过的情况下付款", check: "sum" },
        { icon: "money", title: "换算成你的币种", from: "{total} {currency}", to: "你的币种", note: "按{doc}日期当天的汇率" },
        { icon: "approve", title: "超过一定金额需审批", from: "总额 {total}", to: "付款前审批", note: "当金额超过 {threshold} 时" },
      ],
      ok: "一致",
      off: "待审核",
      outro: "Cleaner 在 Tavnit 中按你关心的字段来搭建。这些只是示例。",
      cta: "创建免费账户试一试",
      ctaSignedIn: "打开 Tavnit 试一试",
      learn: "什么是 Cleaner",
    },
    after: {
      title: "你的 Excel 已就绪",
      lead: "它来自一个有 {fields} 个字段的固定 Flow。在你的账户中，字段由你决定。下面是 Tavnit 处理{each_doc}时的样子：",
      close: "关闭",
      saved: "已保存到你的下载文件夹",
    },
    how: {
      heading: "使用方法",
      steps: [
        {
          title: "上传{doc}",
          body: "PDF、照片或扫描件均可。任何供应商、任何语言、任何版式。",
        },
        {
          title: "Tavnit 读取内容",
          body: "它会找到表头（供应商、编号、日期、合计）以及包含数量和价格的明细表。",
        },
        {
          title: "检查并下载",
          body: "表格会显示在屏幕上。创建免费账户后，即可把它下载为 Excel。",
        },
      ],
    },
    faqHeading: "常见问题",
    faqs: [
      {
        q: "免费版包含什么？",
        a: "每天 {limit} 份文档，并可在屏幕上查看完整结果。下载 Excel 需要一个 Tavnit 账户，账户是免费的。",
      },
      {
        q: "支持哪些格式？",
        a: "PDF（文本型或扫描型）、JPG 和 PNG，最大 4 MB、5 页。如果{your_doc}页数更多，可以分段上传，或者创建账户。",
      },
      {
        q: "我能选择其他列吗？",
        a: "这里不行：这个工具使用的是一个固定的{doc} Flow，共 13 个字段。在你的账户中，你可以为{docs}或任何其他文档创建自己的 Flow，字段完全按需设置：按文档（采购单号、到期日、成本中心）或按明细行（产品代码、折扣）。无需模板：你只需描述字段，必要时再给一个去哪里找的提示。",
      },
      {
        q: "需要为每个供应商设置模板吗？",
        a: "不需要。Tavnit 不使用模板：它按每份文档本来的样子去读，即使供应商明天改版了{doc}也没问题。",
      },
      {
        q: "我的文件会怎样处理？",
        a: "文件在一个专门用于免费工具、不作他用的 Tavnit 账户中处理。24 小时后，文件和提取出的数据行会自动删除；我们只保留曾经运行过一次的记录，不保留文档及其内容。如果你希望更早删除，请发邮件至 support@tavnit.io。",
      },
      {
        q: "为什么下载需要账户？",
        a: "因为免费版是用来试用的。有了账户，你可以对{all_your_docs}运行同样的提取，通过邮件接收文档，并把结果发送到你的系统。",
      },
      {
        q: "它能处理任何国家的{docs}吗？",
        a: "能。它可以处理英文、西班牙文及其他语言的{docs}，无论是否逐项列出税额。它已在美国、巴拿马、墨西哥和哥伦比亚等地的{docs}上测试过。",
      },
      {
        q: "怎样让它自动运行？",
        a: "创建账户，按你需要的字段搭建一个 Flow，然后把{docs}转发到它的邮箱地址，或者通过 API、webhook、Zapier、Make 或 n8n 接入。结果会进入你的 ERP 或 Google Sheets，无需任何人手动录入。",
      },
    ],
  },

  hub: {
    title: "免费 AI 文档工具：发票转 Excel 等",
    description: "基于 Tavnit 自有引擎打造的免费单一用途工具：把发票转成 Excel，以及更多功能。无需模板，无需注册即可查看结果。",
    h1: "免费工具",
    intro: "每个工具只对一份文档做一件事，并给你看真实的结果。它们运行在企业用 Tavnit 自动化处理文档的同一个引擎上，只不过一次处理一份。",
    breadcrumbHome: "首页",
    breadcrumbHub: "工具",
    groups: { extract: "文档转 Excel", compare: "文档比对", split: "整理扫描件", clean: "清洗表格" },
    outro: "所有工具都运行在企业用 Tavnit 自动化处理文档的同一个引擎上。当你希望它自动处理你的所有文档时，就该用上你的账户了。",
    outroCta: "创建免费账户",
  },

  shell: {
    lite: "Lite",
    tools: "工具",
    site: "关于 Tavnit",
    cta: "创建免费账户",
    ctaSignedIn: "前往 Tavnit",
    nav: { product: "产品", useCases: "使用场景", docs: "文档" },
    demo: "预约演示",
    signin: "登录",
    allTools: "查看全部工具",
    allToolsHint: "免费。无需注册即可查看真实结果；有账户就能下载带走。",
    groups: { extract: "文档转 Excel", compare: "文档比对", split: "整理扫描件", clean: "清洗表格" },
    account: {
      signedInAs: "当前登录",
      open: "前往 Tavnit",
      openHint: "完整平台：Flow、自动化，以及你的全部业务量",
      signOut: "退出登录",
      menu: "你的账户",
    },
    auth: {
      title: "创建你的免费账户",
      body: "同一个账户既能在这里下载结果，也能在 Tavnit 中自动处理你的所有文档。",
      submitSignin: "登录",
      submitSignup: "创建账户",
    },
    menu: "菜单",
    close: "关闭",
    privacy: "隐私",
    terms: "条款",
    contact: "联系我们",
    rights: "Tavnit。基于产品自有引擎打造的免费工具。",
  },

  related: {
    heading: "当要处理的是所有文档，而不只是一份",
    lead: "这个工具一次处理一份文档。同一个引擎可以通过邮件或 API 接收文档，让它们经过团队审核，再交付到你的系统中。",
    useCase: "如何实现自动化：",
    guide: "指南：",
  },

  tools: {
    /** Invoice → Excel. The base copy was written for this tool, so only the
     *  words — plus a <title> short enough not to be cut in search results. */
    "invoice-to-excel": {
      vocab: INVOICE_VOCAB,
      overrides: { title: "发票转 Excel，免费：AI 读取每一条明细" },
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
        title: "免费发票明细提取工具：逐行导出到 Excel",
        description:
          "把发票明细（描述、数量、单价和金额）提取为 Excel 行，每一行都带上供应商、发票号和日期。支持 PDF 或照片，无需模板，无需注册即可查看结果。",
        label: "发票明细提取",
        h1: "提取发票中的明细行",
        intro:
          "发票表格中的每一行（描述、数量、单位、单价和金额）都会变成一行数据，表头信息（供应商、发票号、日期、合计）在每一行重复出现。这正是会计和应付账款团队入账、对账或与采购订单核对时需要的明细格式。适用于 PDF、扫描件和照片，无需为每个供应商设置模板。",
        drop: {
          title: "把需要提取明细的发票拖到这里",
          sample: "用一张六行的发票试试",
        },
        stages: ["正在上传发票", "正在读取表头", "正在识别明细表", "正在逐行拆分", "马上就好"],
        result: {
          flowNote: "这 {fields} 列是一个固定发票 Flow 的字段：表头加明细行。在你的账户中，字段由你决定。",
        },
        how: {
          heading: "使用方法",
          steps: [
            {
              title: "上传发票",
              body: "文本型 PDF、扫描件或照片均可。单页或多页，最多 5 页。",
            },
            {
              title: "Tavnit 拆分出各行",
              body: "即使表格没有边框线，它也能找到表格，读取每一行（描述、数量、单位、价格、金额），并为每一行附上表头信息。",
            },
            {
              title: "检查并下载",
              body: "屏幕上每条明细一行。创建免费账户后，即可下载为 Excel，并去掉你不需要的列。",
            },
          ],
        },
        faqs: [
          {
            q: "什么是发票明细行？",
            a: "明细表中的每一行：一项产品或服务，包括描述、数量、单位、单价和金额。底部的合计（小计、税额、总额）不算明细行；它们作为表头字段输出，在每一行重复出现。",
          },
          {
            q: "为什么每一行都有供应商和发票号？",
            a: "这样每一行都能独立成立：你可以把多张发票的明细筛选、求和或粘贴到同一张表里，而不会弄丢它们来自哪张发票。这正是 ERP、数据透视表或对账所需要的格式。",
          },
          {
            q: "表格跨越多页时也能用吗？",
            a: "能。Tavnit 会跟着表格从一页读到下一页，按顺序返回所有明细行，不会把重复出现的列标题当成数据行。免费版最多处理 5 页。",
          },
          {
            q: "描述换行或单元格合并怎么办？",
            a: "延续到下一行的描述会合并到它所属的明细；合并的单元格会应用到它覆盖的各行。我们不依赖表格线，而是判断哪个数量、价格和金额属于哪条描述。",
          },
          {
            q: "每行的折扣和税额如何处理？",
            a: "每行的金额按印刷的原样输出。发票上单独成行的折扣或税额不会被当作明细行，而是作为文档合计处理。如果你的发票逐行列出税额，在账户中可以把该字段加到 Flow 里。",
          },
          {
            q: "能把明细和我的采购订单核对吗？",
            a: "能，使用免费的采购订单与发票核对工具（/tools/po-vs-invoice-check）：上传两份文档，它会标出价格或数量不同的行、缺失的行以及多出来的行。",
          },
          {
            q: "需要为每个供应商准备模板吗？",
            a: "不需要。Tavnit 按每张发票本来的样子去读；即使供应商明天改版，也照样能用。这也是它能同样处理不同国家、不同语言发票的原因。",
          },
          {
            q: "怎样处理成百上千张发票？",
            a: "有了账户，你可以用这些字段（或你自己的字段）创建一个 Flow，把发票转发到它的邮箱地址，或通过 API 发送。每张发票都会以数据行的形式进入你的 ERP、Google Sheets 或 Bucket，无需任何人手动录入。",
          },
        ],
      },
    },
    /**
     * PO vs invoice check. Two documents through one "purchase document" Flow,
     * then the Matcher pairs every PO line with the invoice line that means the
     * same thing and the page shows the differences: price, quantity, missing
     * on the invoice, not on the PO. The base's document word stays "invoice"
     * because that is what the shared blocks (email intake, review, agents…)
     * talk about; everything the visitor sees first is overridden here.
     */
    "po-invoice-check": {
      vocab: INVOICE_VOCAB,
      overrides: {
        title: "免费采购订单与发票核对工具：逐行比对",
        description:
          "上传采购订单和发票，Tavnit 会逐行比对：价格差异、数量差异、发票上缺失的行，以及采购订单上没有的行。免费，无需模板，无需注册即可查看结果。",
        label: "采购订单与发票核对",
        h1: "将发票与采购订单逐行核对",
        intro:
          "上传采购订单和发票，PDF 或照片均可。Tavnit 会读取两份文档，即使文字表述不同，也能把采购订单的每一行与发票上含义相同的那一行配对，并标出价格变了的地方、数量变了的地方、发票上缺了什么，以及哪些从来不在采购订单上。",
        trust: ["一份采购订单和一张发票 · PDF 或照片", "每天 {limit} 份免费文档", "24 小时后全部删除"],
        drop: {
          title: "把文档拖到这里",
          sample: "用示例采购订单和发票试试",
          formats: "PDF、JPG 或 PNG · 每份文档最大 4 MB、5 页",
        },
        stages: ["正在上传文档", "正在读取采购订单", "正在读取发票", "正在配对各行", "马上就好"],
        result: {
          another: "比对其他文档",
          download: "将比对结果下载为 Excel",
          flowNote: "这 {fields} 列是一个固定采购单据 Flow 的字段。在你的账户中，字段由你决定。",
          ghostHint: "在 Tavnit 中，你可以添加任何需要的字段：成本中心、收货单号、项目……",
        },
        errors: {
          no_lines: "我们在其中一份文档中没有找到带数量和价格的行。请确认它们是带有商品明细表的采购订单和发票。",
          not_ready: "我们还在读取文档。请稍等片刻再试。",
          failed: "我们无法读取其中一份文档。请换其他文件，或使用示例文件试试。",
          too_large: "其中一个文件超过 4 MB。请压缩后再上传，或只上传文档所在的页面。",
        },
        next: {
          lead: "刚才处理的只是一份采购订单和一张发票。有了账户，每张到达的发票都会自动与它的采购订单核对，而且结果不会停在 Excel 里：它会继续流转。",
          source: "你的采购订单和发票",
          flow: {
            name: "采购单据",
            add: { name: "receipt_number", type: "文本", hint: "位于“Receipt”旁边 · 例如 REC-1187", save: "保存", value: "REC-1187" },
          },
          inputs: { show: "你的文档怎么进入 Tavnit？" },
        },
        cleaners: {
          heading: "有了 Cleaner，你可以……",
          lead: "简单的规则，在每次核对后自动运行。四个例子：",
          ideas: [
            { icon: "alert", title: "价格上涨超过 2 % 时拦下发票", from: "采购订单价 22.40", to: "发票价 23.90", note: "在任何人付款前标出差异" },
            { icon: "approve", title: "数量不一致时需审批", from: "采购订单 300 件", to: "发票 280 件", note: "由采购部门确认是部分交货还是出错" },
            { icon: "mail", title: "把差异通过邮件发给采购部门", from: "核对完成", to: "邮件发送至 purchasing@", note: "只在有需要审核的内容时发送" },
            { icon: "sum", title: "发票总额对比采购订单总额", from: "采购订单 5,189.07", to: "发票 4,960.63", note: "对不上，就在入账前停下" },
          ],
          outro: "Cleaner 在 Tavnit 中按你关心的字段来搭建。这些只是示例。",
        },
        after: {
          lead: "它来自一个有 {fields} 个字段的固定 Flow 和一个 Matcher。在你的账户中，字段由你决定。下面是 Tavnit 核对每一张到达的发票时的样子：",
        },
        how: {
          heading: "使用方法",
          steps: [
            { title: "上传两份文档", body: "采购订单和发票，PDF 或照片均可。任何供应商、任何语言、任何版式。" },
            { title: "Tavnit 用同一个 Flow 读取两份文档", body: "两份文档的表头（编号、日期、供应商、合计）以及每一行的数量和价格。" },
            { title: "Matcher 配对各行", body: "采购订单的每一行都会与发票上含义相同的那一行配对，并比较价格和数量。有了账户，你可以把比对结果下载为 Excel。" },
          ],
        },
        faqs: [
          {
            q: "免费版包含什么？",
            a: "每天 {limit} 份文档（一次核对用两份），并可在屏幕上查看完整结果。将比对结果下载为 Excel 需要一个 Tavnit 账户，账户是免费的。",
          },
          {
            q: "文字不完全相同时，它怎么配对各行？",
            a: "Tavnit 的 Matcher 按含义比较描述，而不是逐字比对：“Long grain rice 20 lb”和“RICE L/GRAIN PREMIUM 20LB”是同一行。当两条描述相近但不够明确时，会有第二步来判断它们是否是同一商品。",
          },
          {
            q: "价格的容差是多少？",
            a: "价格变动超过 0.5 % 或超过一分钱时，就会被标记为不同。数量按精确值比较。有了账户，你可以用 Cleaner 设置自己的容差。",
          },
          {
            q: "“发票上缺失”和“不在采购订单上”是什么意思？",
            a: "“发票上缺失”是供应商没有开票的采购订单行（部分交货或待交货）。“不在采购订单上”是开了票、但这张采购订单上没人订过的行。",
          },
          {
            q: "能结合收货单做三方匹配吗？",
            a: "这里不行：免费版只比对两份文档。有了账户，你可以把收货单作为同一个 Flow 的第三份文档加入，由 Matcher 同时核对三份；或者搭建 Cleaner 规则，在收货单一致之前不让发票入账。",
          },
          {
            q: "支持哪些格式？",
            a: "PDF（文本型或扫描型）、JPG 和 PNG，每份文档最大 4 MB、5 页。适用于 ERP 导出的采购订单和任何供应商的发票。",
          },
          {
            q: "我的文件会怎样处理？",
            a: "文件在一个专门用于免费工具、不作他用的 Tavnit 账户中处理。24 小时后，文件和比对结果会自动删除；我们只保留曾经运行过一次的记录，不保留文档及其内容。",
          },
          {
            q: "怎样让它自动运行？",
            a: "创建账户，为你的采购单据搭建一个 Flow，再在其上建一个 Matcher。发票通过邮件或 API 到达，与对应的采购订单配对，差异通过邮件、webhook 发出或直接进入你的 ERP，无需任何人手动录入。",
          },
        ],
        compare: {
          slots: [
            { title: "采购订单", hint: "采购订单的 PDF 或照片", sample: "示例采购订单" },
            { title: "发票", hint: "发票的 PDF 或照片", sample: "示例发票" },
          ],
          run: "比对",
          sampleAll: "用示例采购订单和发票试试",
          stages: ["正在读取采购订单和发票", "正在整理各行", "Matcher 正在配对各行", "马上就好"],
          heading: "比对完成",
          summary: "{n} · {ref} 对比 {doc}",
          labels: {
            description: "描述",
            quantity: "数量",
            price: "价格",
            total: "金额",
            status: "状态",
            ref: "采购订单",
            doc: "发票",
            supplier: "供应商",
            champion: "Champion",
            wins: "赢下 {n} 行",
            lines: ["行", "行"],
          },
          status: {
            ok: "一致",
            price: "价格不同",
            qty: "数量不同",
            both: "价格和数量均不同",
            missing: "发票上缺失",
            extra: "不在采购订单上",
          },
          empty: "我们无法配对任何行。请确认两份文档都有带数量和价格的商品明细表。",
          another: "比对其他文档",
          download: "将比对结果下载为 Excel",
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
        doc: "扫描 PDF",
        docs: "扫描 PDF",
        a_doc: "一个扫描 PDF",
        the_doc: "PDF",
        the_docs: "这些 PDF",
        your_doc: "你的 PDF",
        your_docs: "你的 PDF",
        all_your_docs: "你所有的 PDF",
        all_docs: "所有 PDF",
        each_doc: "每一个 PDF",
        another_doc: "另一个 PDF",
        this_doc: "这个 PDF",
      },
      overrides: {
        title: "免费将扫描 PDF 拆分为单独文档（AI）",
        description:
          "上传一个把多份文档扫描在一起的 PDF（发票、采购订单、收据、合同），即可把每份文档单独拿回来，并按类型分好类。免费，无需手动标记页码。",
        label: "拆分扫描 PDF",
        h1: "把扫描 PDF 拆分成单独的文档",
        intro:
          "你把十张纸放进扫描仪，得到的却是一个 PDF。上传它：Tavnit 会读取每一页，找出每份文档从哪里开始，再把它们逐一交还给你，并标好类型（发票、采购订单、收据、装箱单、提单、合同……）。不按页数机械拆分，也不用手动标记。",
        trust: ["一个 PDF · 最多 12 页", "每天 {limit} 份免费文档", "24 小时后全部删除"],
        drop: {
          title: "把你的扫描 PDF 拖到这里",
          hint: "一个包含多份文档的 PDF",
          choose: "选择文件",
          sample: "用示例扫描件试试",
          formats: "PDF · 最大 4 MB、12 页",
        },
        stages: ["正在上传 PDF", "正在读取每一页", "正在查找每份文档的起始页", "正在分类", "马上就好"],
        result: {
          retention: "24 小时后自动删除",
          downloading: "正在准备文件",
          another: "拆分另一个 PDF",
          empty: "我们在这个 PDF 中只找到了一份文档。",
          flowNote: "这些类型属于这个工具的固定 Splitter。在你的账户中，类型由你定义。",
        },
        errors: {
          too_large: "文件超过 4 MB。请压缩，或把扫描件拆成两部分。",
          too_many_pages: "免费版每个 PDF 最多拆分 12 页。有了账户就没有限制。",
          unsupported: "仅支持 PDF、JPG 或 PNG。要拆分文档，请上传扫描仪生成的 PDF。",
          failed: "我们无法拆分这个 PDF。请换一个扫描件，或使用示例文件试试。",
          empty: "文件是空的。",
        },
        next: {
          lead: "刚才处理的只是一个 PDF。有了账户，Splitter 切出的每份文档都会进入各自的 Flow：发票进入发票提取，采购订单进入它自己的 Flow，收据进入报销单。从此再也不用手动分拣和分类。",
          source: "你的 PDF",
          flow: {
            title: "从 Splitter 到 Flow：每份文档各归其位",
            body: "Splitter 会找出每份文档从哪里开始，并按你用文字描述的类型对它分类。这个工具使用的是一个有八种类型、没有输出的固定 Splitter：它只把文档交给你。在你的账户中，你可以定义自己的类型，并为每种类型指定去向：进入提取其字段的 Flow（如下所示，共 {fields} 个字段）、发送到邮箱，或进入一个 Collection。无需模板，无需坐标。",
            linkLabel: "Splitter 如何工作",
            href: "/docs/splitters",
          },
          inputs: {
            show: "你的 PDF 怎么进入 Tavnit？",
          },
        },
        cleaners: {
          heading: "拆分之后，在 Tavnit 中……",
          lead: "每种文档类型都可以有自己的去向，无需任何人手动分拣。四个例子：",
          ideas: [
            { icon: "text", title: "每张发票进入它的 Flow，再进入 ERP", from: "发票（第 1–2 页）", to: "发票 Flow → ERP", note: "提取并入账，全程无人经手" },
            { icon: "mail", title: "收据进入报销单", from: "收据（第 5 页）", to: "expenses@yourcompany", note: "每张收据都送到负责对账的人手里" },
            { icon: "calendar", title: "合同连同日期进入法务档案", from: "合同（第 6–7 页）", to: "合同 Flow", note: "到期和续约日期，集中在一张表里" },
            { icon: "alert", title: "无法识别时发出提醒", from: "未分类页面", to: "人工审核", note: "没有任何文档会丢失或归错档" },
          ],
          outro: "去向在 Tavnit 中按文档类型设置。这些只是示例。",
          cta: "创建免费账户进行设置",
          ctaSignedIn: "打开 Tavnit 进行设置",
          learn: "什么是 Splitter",
        },
        after: {
          title: "你的文档已就绪",
          lead: "它们来自一个有八种类型的固定 Splitter。在你的账户中，类型由你定义，每份文档都会自动进入它的 Flow：",
          close: "关闭",
        },
        how: {
          heading: "使用方法",
          steps: [
            { title: "上传扫描件", body: "一个包含多份文档的 PDF，就是扫描仪生成的原样。任何顺序，每份文档任意页数。" },
            { title: "Tavnit 拆分并分类", body: "它读取每一页，检测每份文档从哪里开始，并为其指定类型：发票、采购订单、收据、装箱单、提单、合同、贷记单或其他。" },
            { title: "下载每份文档", body: "你会看到带页码范围和类型的列表。创建免费账户后，可以分别下载每个 PDF，或打包成 zip 一次下载。" },
          ],
        },
        faqs: [
          {
            q: "它怎么知道一份文档在哪里结束、下一份从哪里开始？",
            a: "AI 会像人一样把所有页面放在一起看：表头的变化、公司的变化、页码的变化、版式的变化。它不数页数，也不找标记，所以即使一张发票占两页、收据只有一页，它也能正确拆分。",
          },
          {
            q: "它能识别哪些文档类型？",
            a: "这里是八种：发票、采购订单、收据、装箱单、提单、合同、贷记单和其他。有了账户，你可以用文字描述来定义自己的类型，并为每种类型决定去向：进入提取数据的 Flow、发送到邮箱，或进入一个 Collection。",
          },
          {
            q: "免费版包含什么？",
            a: "每天 {limit} 份文档，并可在屏幕上查看完整结果。下载拆分后的 PDF 需要一个 Tavnit 账户，账户是免费的。",
          },
          {
            q: "我能上传多少页？",
            a: "免费版每个 PDF 最多 12 页，最大 4 MB。有了账户就没有页数限制，还可以把扫描件直接通过邮件发给 Splitter。",
          },
          {
            q: "扫描质量差或语言混杂时也能用吗？",
            a: "能。它可以处理歪斜、灰度和盖了章的扫描件，也能处理同一个 PDF 中混有英文、西班牙文或其他语言的文档。如果某一页无法读取，它会被标为未分类，而不是被随便安上一个类型。",
          },
          {
            q: "我的文件会怎样处理？",
            a: "文件在一个专门用于免费工具、不作他用的 Tavnit 账户中处理。24 小时后，PDF 和拆分出的文档会自动删除；我们只保留曾经运行过一次的记录，不保留文件及其内容。如果你希望更早删除，请发邮件至 support@tavnit.io。",
          },
          {
            q: "为什么下载需要账户？",
            a: "因为免费版是用来试用的。有了账户，你可以拆分每一份扫描件，把每份文档送进它的 Flow，并在 ERP 或邮箱中收到提取出的数据。",
          },
          {
            q: "怎样让它自动运行？",
            a: "创建账户，按你的文档类型搭建一个 Splitter，然后把扫描件转发到它的邮箱地址，或通过 API 接入。它切出的每份文档都会自动进入各自的 Flow，再从那里进入你的 ERP、Google Sheets 或收件箱。",
          },
        ],
        split: {
          heading: "完成：{file}",
          summary: "{n}，共 {pages}",
          segmentWord: ["份文档", "份文档"],
          pageWord: ["页", "页"],
          pages: "第 {from}–{to} 页",
          pageOne: "第 {from} 页",
          unmatched: "未分类",
          type: "类型",
          reason: "原因",
          download: "下载",
          downloadAll: "全部下载（zip）",
          stages: ["正在上传 PDF", "正在读取每一页", "正在查找每份文档的起始页", "正在分类", "马上就好"],
          empty: "我们在这个 PDF 中只找到了一份文档。",
          another: "拆分另一个 PDF",
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
        doc: "装箱单",
        docs: "装箱单",
        a_doc: "一份装箱单",
        the_doc: "装箱单",
        the_docs: "这些装箱单",
        your_doc: "你的装箱单",
        your_docs: "你的装箱单",
        all_your_docs: "你所有的装箱单",
        all_docs: "所有装箱单",
        each_doc: "每一份装箱单",
        another_doc: "另一份装箱单",
        this_doc: "这份装箱单",
      },
      overrides: {
        title: "装箱单转 Excel，免费：AI 提取每一行",
        description:
          "上传装箱单的 PDF 或照片，即可得到 Excel 表格形式的每一行：描述、数量、件数、净重和毛重、尺寸，以及发货人、收货人和港口。免费，无需模板，无需注册即可查看结果。",
        label: "装箱单转 Excel",
        h1: "把装箱单变成 Excel",
        intro:
          "上传 PDF 或照片。Tavnit 会读取货运表头（发货人、收货人、港口、合计）以及每一行货物的件数、重量和尺寸，并以电子表格的形式交还给你。无需为每个供应商设置模板：同一个工具适用于你所有货运的装箱单。",
        drop: {
          title: "把你的装箱单拖到这里",
          sample: "用示例装箱单试试",
        },
        stages: ["正在上传文档", "正在读取货运表头", "正在查找货物明细", "正在整理列", "马上就好"],
        result: {
          empty: "我们没有在这份文档中找到货物明细。请换一份每行都有件数、重量或数量的装箱单试试。",
          flowNote: "这 {fields} 列是一个固定装箱单 Flow 的字段。在你的账户中，字段由你决定。",
          ghostHint: "在 Tavnit 中，你可以添加任何需要的字段：集装箱号、唛头、HS 编码、提单号……",
        },
        next: {
          lead: "刚才处理的只是一份装箱单。有了账户，每一份到达的装箱单都会自动这样处理，而且数据不会停在 Excel 里：它们会自己继续流转。",
          source: "你的装箱单",
          flow: {
            name: "装箱单",
            add: { name: "container", type: "文本", hint: "位于“Container”旁边 · 例如 MSKU-4417", save: "保存", value: "MSKU-4417" },
          },
          inputs: { show: "你的装箱单怎么进入 Tavnit？" },
        },
        cleaners: {
          lead: "简单的规则，在提取完成后自动作用于每一份装箱单。下面是用你自己的数据举的四个例子：",
          ideas: [
            { icon: "date", title: "统一日期写法", from: "{date}", to: "{iso}", note: "每一份装箱单，同一种格式" },
            { icon: "alert", title: "毛重必须大于净重", from: "净重 > 毛重", to: "待审核", note: "写反的行绝不会在没人看过的情况下被申报" },
            { icon: "calendar", title: "开船前提醒", from: "发货日期", to: "提前 2 天提醒", note: "发给你的报关行和物流团队" },
            { icon: "mail", title: "抄送报关行", from: "提取出的装箱单", to: "附 Excel 的邮件", note: "连同相关发票一起发送" },
          ],
        },
        after: {
          lead: "它来自一个有 {fields} 个字段的固定 Flow。在你的账户中，字段由你决定。下面是 Tavnit 处理每一份装箱单时的样子：",
        },
        how: {
          steps: [
            { title: "上传装箱单", body: "PDF、照片或扫描件均可。任何发货人、任何语言、任何版式。" },
            {
              title: "Tavnit 读取内容",
              body: "它会找到表头（发货人、收货人、港口、合计）以及货物表，每行包含件数、净重、毛重和尺寸。",
            },
            { title: "检查并下载", body: "表格会显示在屏幕上。创建免费账户后，即可把它下载为 Excel。" },
          ],
        },
        faqs: [
          {
            q: "免费版包含什么？",
            a: "每天 {limit} 份文档，并可在屏幕上查看完整结果。下载 Excel 需要一个 Tavnit 账户，账户是免费的。",
          },
          {
            q: "支持哪些格式？",
            a: "PDF（文本型或扫描型）、JPG 和 PNG，最大 4 MB、5 页。如果你的装箱单页数更多，可以分段上传，或者创建账户。",
          },
          {
            q: "它会从装箱单中提取哪些列？",
            a: "按文档：发货人、收货人、编号、日期、相关发票、装货港、卸货港，以及件数和重量的合计。按行：描述、数量、单位、件数、净重、毛重和尺寸。文档级的值在每一行重复出现，所以表格可以直接筛选。",
          },
          {
            q: "我能选择其他列吗？",
            a: "这里不行：这个工具使用的是一个固定的装箱单 Flow，共 17 个字段。在你的账户中，你可以为装箱单或任何其他文档创建自己的 Flow，字段完全按需设置：按文档（集装箱号、封条号、提单号、贸易术语）或按行（唛头、HS 编码、体积）。无需模板：你只需描述字段，必要时再给一个去哪里找的提示。",
          },
          {
            q: "它能处理任何国家的装箱单吗？",
            a: "能。它可以处理英文、西班牙文及其他语言的装箱单，重量以 kg 或 lb、尺寸以 cm 或英寸为单位，均按印刷原样输出。它已在来自巴拿马、哥伦比亚、墨西哥、中国和美国等地的货运单据上测试过。",
          },
          {
            q: "需要为每个供应商设置模板吗？",
            a: "不需要。Tavnit 不使用模板：它按每份文档本来的样子去读，即使发货人明天改了装箱单的版式也没问题。",
          },
          {
            q: "我的文件会怎样处理？",
            a: "文件在一个专门用于免费工具、不作他用的 Tavnit 账户中处理。24 小时后，文件和提取出的数据行会自动删除；我们只保留曾经运行过一次的记录，不保留文档及其内容。如果你希望更早删除，请发邮件至 support@tavnit.io。",
          },
          {
            q: "怎样让它自动运行？",
            a: "创建账户，按你需要的字段搭建一个 Flow，然后把装箱单转发到它的邮箱地址，或者通过 API、webhook、Zapier、Make 或 n8n 接入。每一票货都会进入你的报关系统、ERP 或 Google Sheets，无需任何人手动录入。",
          },
        ],
      },
    },
    /**
     * Bill of lading → Excel. The words and everything that is specific to an
     * ocean B/L: header fields, one row per container line, customs and
     * forwarder use cases.
     */
    "bill-of-lading-to-excel": {
      vocab: {
        doc: "提单",
        docs: "提单",
        a_doc: "一份提单",
        the_doc: "提单",
        the_docs: "这些提单",
        your_doc: "你的提单",
        your_docs: "你的提单",
        all_your_docs: "你所有的提单",
        all_docs: "所有提单",
        each_doc: "每一份提单",
        another_doc: "另一份提单",
        this_doc: "这份提单",
      },
      overrides: {
        title: "提单转 Excel，免费：提取 B/L 数据",
        description:
          "上传提单（B/L）的 PDF 或照片，即可得到 Excel 表格形式的数据：提单号、承运人、发货人、收货人、船名、港口，以及每个集装箱一行，含封条号、货物、件数、重量和体积。免费，无需模板，无需注册即可查看结果。",
        label: "提单转 Excel",
        h1: "把提单变成 Excel",
        intro:
          "上传提单的 PDF 或照片。Tavnit 会读取表头（提单号、承运人、发货人、收货人、船名、航次、港口、装船日期）以及每一行货物的集装箱号、封条号、件数、毛重和体积，并以电子表格的形式交还给你。无需为每家承运人设置模板：同一个 Flow 就能读取 MSC、Maersk、Hapag-Lloyd 或任何 NVOCC 的提单。",
        drop: {
          title: "把你的提单拖到这里",
          sample: "用示例提单试试",
        },
        stages: ["正在上传文档", "正在读取提单表头", "正在查找货物明细", "正在整理列", "马上就好"],
        result: {
          empty: "我们没有在这份文档中找到货物明细。请换一份带有集装箱和货物表的提单试试。",
          flowNote: "这 {fields} 列是一个固定提单 Flow 的字段。在你的账户中，字段由你决定。",
          ghostHint: "在 Tavnit 中，你可以添加任何需要的字段：贸易术语、交货地、订舱号、ETA……",
          another: "处理另一份提单",
        },
        errors: {
          too_large: "文件超过 4 MB。请压缩后再上传，或只上传提单所在的页面。",
        },
        next: {
          lead: "刚才处理的只是一份提单。有了账户，来自每家承运人和代理的每一份提单都会自动这样处理，而且数据不会停在 Excel 里：它会自己继续流入你的报关或货代系统。",
          source: "你的提单",
          flow: {
            name: "提单",
            add: { name: "incoterm", type: "文本", hint: "位于“Incoterm”旁边 · 例如 CIF Manzanillo", save: "保存", value: "CIF" },
          },
          inputs: { show: "你的提单怎么进入 Tavnit？" },
        },
        cleaners: {
          lead: "简单的规则，在提取完成后自动作用于每一份提单。下面是用你自己的数据举的四个例子：",
          ideas: [
            { icon: "date", title: "统一装船日期写法", from: "{date}", to: "{iso}", note: "每一份提单，同一种格式" },
            { icon: "alert", title: "毛重超出范围", from: "每个集装箱的毛重", to: "超过 26,000 kg 时标记", note: "免得有人订了一辆装不下的卡车" },
            { icon: "calendar", title: "到港前提醒", from: "装船日期 + 航程时间", to: "提前 5 天提醒", note: "在船靠泊前完成报关" },
            { icon: "mail", title: "直接发给报关行", from: "提取出的提单", to: "附表格的邮件", note: "发给报关行，无需任何人转发" },
          ],
        },
        after: {
          lead: "它来自一个有 {fields} 个字段的固定 Flow。在你的账户中，字段由你决定。下面是 Tavnit 处理每一份提单时的样子：",
        },
        how: {
          steps: [
            { title: "上传提单", body: "PDF、照片或扫描件均可。任何承运人、任何代理、任何单证版式。" },
            { title: "Tavnit 读取内容", body: "它会找到表头（提单号、各方、船名、航次、港口、装船日期、运费条款）以及货物表：每个集装箱一行，含封条号、货物、件数、重量和体积。" },
            { title: "检查并下载", body: "表格会显示在屏幕上。创建免费账户后，即可把它下载为 Excel。" },
          ],
        },
        faqs: [
          {
            q: "免费版包含什么？",
            a: "每天 {limit} 份文档，并可在屏幕上查看完整结果。下载 Excel 需要一个 Tavnit 账户，账户是免费的。",
          },
          {
            q: "它会从提单中提取哪些内容？",
            a: "表头部分：提单号、承运人、发货人、收货人、通知方、船名、航次、装货港、卸货港、装船日期、运费条款以及集装箱清单。货物表部分，每行一条：集装箱号、封条号、货物描述、件数及包装种类、毛重和体积。表头的值在每一行重复出现，所以表格可以直接筛选和求和。",
          },
          {
            q: "我能选择其他列吗？",
            a: "这里不行：这个工具使用的是一个固定的提单 Flow，共 19 个字段。在你的账户中，你可以为提单或任何其他文档创建自己的 Flow，字段完全按需设置：按文档（贸易术语、交货地、订舱号、ETA）或按行（HS 编码、唛头、冷藏温度）。无需模板：你只需描述字段，必要时再给一个去哪里找的提示。",
          },
          {
            q: "支持哪些格式？",
            a: "PDF（文本型或扫描型）、JPG 和 PNG，最大 4 MB、5 页。如果你的提单页数更多，或者一个扫描件里有多份提单，可以分段上传，或者创建账户。",
          },
          {
            q: "它能处理任何承运人的提单吗？",
            a: "能。它不使用模板：无论是船公司的主提单、货代的分提单还是海运单，无论英文还是西班牙文，它都按本来的样子去读。它已在 MSC、Maersk、Hapag-Lloyd、CMA CGM、Evergreen 以及 NVOCC 的版式上测试过。",
          },
          {
            q: "我的文件会怎样处理？",
            a: "文件在一个专门用于免费工具、不作他用的 Tavnit 账户中处理。24 小时后，文件和提取出的数据行会自动删除；我们只保留曾经运行过一次的记录，不保留文档及其内容。如果你希望更早删除，请发邮件至 support@tavnit.io。",
          },
          {
            q: "为什么下载需要账户？",
            a: "因为免费版是用来试用的。有了账户，你可以对所有提单运行同样的提取，通过邮件接收结果，并把它发送到你的报关或货代系统。",
          },
          {
            q: "怎样让它自动运行？",
            a: "创建账户，按你需要的字段搭建一个 Flow，然后把提单转发到它的邮箱地址（就是承运人或货代发送提单的那个地址），或者通过 API、webhook、Zapier、Make 或 n8n 接入。数据会进入你的报关系统、ERP 或 Google Sheets，无需任何人手动录入。",
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
        doc: "报价单",
        docs: "报价单",
        a_doc: "一份报价单",
        the_doc: "报价单",
        the_docs: "这些报价单",
        your_doc: "你的报价单",
        your_docs: "你的报价单",
        all_your_docs: "你所有的报价单",
        all_docs: "所有报价单",
        each_doc: "每一份报价单",
        another_doc: "另一份报价单",
        this_doc: "这份报价单",
      },
      overrides: {
        title: "免费比较供应商报价：逐行对比表",
        description:
          "上传两到三份报价单的 PDF 或照片，即可得到一张对比表：每一行列出各供应商的价格，并标出最便宜的一家。免费，无需模板，无需注册即可查看结果。",
        label: "比较供应商报价",
        h1: "比较供应商报价",
        intro:
          "上传针对同一需求的两到三份报价单。Tavnit 会逐份读取，即使每家供应商的写法各不相同，也能把各行配对起来，生成一张表，列出每个价格以及每一行最便宜的选择。无需模板，也不用手动做表。",
        trust: ["2 或 3 份报价单 · PDF 或照片", "每天 {limit} 份免费文档", "24 小时后全部删除"],
        drop: {
          title: "把报价单拖到这里",
          hint: "PDF 或照片",
          sample: "用三份示例报价单试试",
          formats: "PDF、JPG 或 PNG · 每份报价单最大 4 MB、5 页",
        },
        stages: ["正在读取报价单", "正在整理各行", "Matcher 正在配对各行", "马上就好"],
        result: {
          flowNote: "每份报价单都经过一个有 {fields} 个字段的固定 Flow，再由 Matcher 进行交叉比对。在你的账户中，字段由你决定。",
          ghostHint: "在 Tavnit 中，你可以添加任何需要的字段：品牌、保修、每行的交货期……",
          download: "将比对结果下载为 Excel",
          another: "比较其他报价单",
          empty: "我们没有在这份报价单中找到带价格的行。请换一份每行都有品项、数量和价格的报价单试试。",
        },
        errors: {
          too_large: "其中一份报价单超过 4 MB。请压缩后再上传，或只上传有明细行的页面。",
          failed: "我们无法读取其中一份报价单。请换一份，或使用示例文件试试。",
          no_lines: "其中一份报价单没有带价格的行，所以无从比较。请确认每份报价单都有带单价的品项。",
          not_ready: "我们还在读取报价单。请稍等片刻再试。",
        },
        auth: {
          title: "创建免费账户，下载这张表",
          body: "Excel 会立即开始下载。有了账户，你还可以比较三份以上的报价单，并对每一次到来的招标都这样做。",
        },
        next: {
          lead: "刚才是手动处理的三份报价单。有了账户，每份通过邮件到达的报价单都会进入它的 Flow，Matcher 自动进行交叉比对，对比表继续流转：送到采购部门、ERP 或负责审批的人手里。",
          source: "你的报价单",
          flow: {
            name: "报价单",
            add: { name: "brand", type: "文本", hint: "位于“Brand”旁边或描述中", save: "保存", value: "Argos" },
          },
          inputs: { show: "你的报价单怎么进入 Tavnit？" },
        },
        cleaners: {
          lead: "简单的规则，在每份报价单读取完成后自动运行。四个例子：",
          ideas: [
            { icon: "date", title: "统一日期写法", from: "{date}", to: "{iso}", note: "每一份报价单，同一种格式" },
            { icon: "alert", title: "供应商涨价超过 5% 时提醒", from: "今天的价格", to: "对比上一次报价", note: "逐行比较，在定标之前" },
            { icon: "approve", title: "审批定标结果", from: "对比表", to: "决策人", note: "只有审批通过后才发出采购订单" },
            { icon: "calendar", title: "提醒报价有效期", from: "有效期至 {date}", to: "提前 5 天提醒", note: "以免错过这个价格" },
          ],
        },
        after: {
          title: "你的对比表已就绪",
          lead: "它来自一个有 {fields} 个字段的固定 Flow 和一个 Matcher。在你的账户中，字段由你决定。下面是 Tavnit 交叉比对每一份报价单时的样子：",
        },
        how: {
          steps: [
            { title: "上传两到三份报价单", body: "PDF 或照片，针对同一需求。任何供应商、任何版式、任何品项描述方式。" },
            { title: "Tavnit 读取并交叉比对", body: "它提取每份报价单的明细行，即使写法不同，Matcher 也能把品项配对起来。每一行最便宜的一家会被标记为 Champion。" },
            { title: "检查并下载", body: "表格会显示在屏幕上。创建免费账户后，即可把它下载为 Excel。" },
          ],
        },
        faqs: [
          {
            q: "免费版包含什么？",
            a: "每天 {limit} 份文档（比较三份报价单算三份），并可在屏幕上查看完整的表格。下载 Excel 需要一个 Tavnit 账户，账户是免费的。",
          },
          {
            q: "每家供应商写法都不同，它怎么配对各行？",
            a: "靠 Tavnit 的 Matcher。它比较的是每条描述的含义，而不是确切的文字：“grey cement 42.5 kg”和“Portland cement type I grey, 42.5 kg bag”会落在同一行。拿不准时，会有第二步来判断它们是否是同一品项。",
          },
          {
            q: "Champion 是什么意思？",
            a: "该行单价最低的供应商。价格相同时，两家都会显示。只有一家供应商报价的行没有竞争，也同样会显示。",
          },
          {
            q: "能比较三份以上的报价单吗？",
            a: "这里不行：免费版最多三份。在你的账户中，Matcher 可以比较同一个 Flow 的最多十次运行，你还可以把对比表通过邮件发出或送进你的 ERP。",
          },
          {
            q: "我能选择其他列吗？",
            a: "这里不行：这个工具使用的是一个固定的报价单 Flow。在你的账户中，你可以按需要的字段（品牌、保修、每行的交货期）创建自己的 Flow，并让 Matcher 比较你想要的任何字段：价格、交货期或任何数字。",
          },
          {
            q: "支持哪些格式？",
            a: "PDF（文本型或扫描型）、JPG 和 PNG，每份报价单最大 4 MB、5 页。",
          },
          {
            q: "我的文件会怎样处理？",
            a: "文件在一个专门用于免费工具、不作他用的 Tavnit 账户中处理。24 小时后，文件、提取出的明细行和对比表会自动删除；我们只保留曾经运行过一次的记录。",
          },
          {
            q: "怎样让它自动运行？",
            a: "创建账户，按你的字段搭建一个报价单 Flow，再在其上建一个 Matcher。把报价单转发到 Matcher 的邮箱地址，等所有报价单都到齐后，对比表就会自动生成：通过邮件、webhook 发出，或进入你的 ERP。",
          },
        ],
        compare: {
          slots: [
            { title: "报价单 A", hint: "PDF 或照片", sample: "示例报价单 A" },
            { title: "报价单 B", hint: "PDF 或照片", sample: "示例报价单 B" },
            { title: "报价单 C", hint: "PDF 或照片", sample: "示例报价单 C", optional: true },
          ],
          run: "比较",
          sampleAll: "用三份示例报价单试试",
          stages: ["正在读取报价单", "正在整理各行", "Matcher 正在配对各行", "马上就好"],
          heading: "对比表已就绪",
          summary: "{n} · {ref}",
          labels: {
            description: "描述",
            quantity: "数量",
            price: "单价",
            total: "金额",
            status: "状态",
            ref: "A",
            doc: "B",
            supplier: "供应商",
            champion: "Champion",
            wins: "赢下 {n} 行",
            lines: ["行", "行"],
          },
          status: { ok: "一致", price: "价格不同", qty: "数量不同", both: "价格和数量均不同", missing: "未报价", extra: "仅此报价单有" },
          empty: "Matcher 没有在这些报价单之间找到可比较的行。请确认它们针对同一需求，并且都有带单价的品项。",
          another: "比较其他报价单",
          download: "将比对结果下载为 Excel",
        },
      },
    },
    /**
     * Contract key dates. One row per contract (a metadata-only Flow), so the
     * copy talks about dates and parties, never about line items.
     */
    "contract-dates": {
      vocab: {
        doc: "合同",
        docs: "合同",
        a_doc: "一份合同",
        the_doc: "合同",
        the_docs: "这些合同",
        your_doc: "你的合同",
        your_docs: "你的合同",
        all_your_docs: "你所有的合同",
        all_docs: "所有合同",
        each_doc: "每一份合同",
        another_doc: "另一份合同",
        this_doc: "这份合同",
      },
      overrides: {
        title: "免费合同续约日期提取工具（AI）",
        description:
          "上传合同 PDF，即可在一行 Excel 中得到它的关键日期：合同各方、生效日、到期日、是否自动续约、通知期，以及发出通知的截止日。免费，无需模板，无需注册即可查看结果。",
        label: "合同关键日期",
        h1: "提取合同中的关键日期",
        intro:
          "上传 PDF。Tavnit 会读取合同，并交还给你一行数据：合同各方、签署日期、合同期的起止日期、是否自动续约、通知期，以及表示不再续约的最后期限。适用于服务、租赁、供货和许可协议，无论是什么格式。",
        drop: {
          title: "把你的合同拖到这里",
          sample: "用示例合同试试",
        },
        stages: ["正在上传文档", "正在读取合同各方", "正在查找合同期和续约条款", "正在计算通知截止日", "马上就好"],
        result: {
          empty: "我们没有在这份文档中找到合同方或日期。请换一份带有合同期条款的已签署合同试试。",
          flowNote: "这 {fields} 列是一个固定合同 Flow 的字段。在你的账户中，字段由你决定。",
          ghostHint: "在 Tavnit 中，你可以添加任何需要的字段：内部负责人、成本中心、违约条款……",
          another: "处理另一份合同",
        },
        next: {
          lead: "刚才处理的只是一份合同。有了账户，每一份到达的合同都会自动这样处理，而且日期不会停在 Excel 里：它们会在截止日之前发出提醒。",
          source: "你的合同",
          inputs: { show: "你的合同怎么进入 Tavnit？" },
          flow: {
            name: "合同",
            add: { name: "owner", type: "文本", hint: "我方由谁签署", save: "保存", value: "M. Perez" },
          },
        },
        cleaners: {
          lead: "简单的规则，在每份合同读取完成后自动运行。下面是用你自己的数据举的四个例子：",
          ideas: [
            { icon: "date", title: "统一日期写法", from: "{date}", to: "{iso}", note: "每一份合同，同一种格式" },
            { icon: "calendar", title: "到期前 60 天提醒", from: "end_date", to: "及时提醒", note: "赶在通知截止日之前" },
            { icon: "alert", title: "自动续约：先审核", from: "auto_renewal = Yes", to: "待审核", note: "确保没有合同在无人过目的情况下续约" },
            { icon: "mail", title: "邮件通知负责人", from: "合同已读取", to: "附带该行数据的邮件", note: "签署人会收到这些日期" },
          ],
        },
        after: {
          lead: "它来自一个有 {fields} 个字段的固定 Flow。在你的账户中，字段由你决定。下面是 Tavnit 读取每一份合同时的样子：",
        },
        how: {
          steps: [
            { title: "上传合同", body: "PDF，文本型或扫描型均可。任何类型的合同，无论由谁起草。" },
            { title: "Tavnit 读取内容", body: "它会找到合同各方、签署信息、合同期、续约条款和通知期，并计算出发出通知的截止日。" },
            { title: "检查并下载", body: "这一行会显示在屏幕上。创建免费账户后，即可把它下载为 Excel。" },
          ],
        },
        faqs: [
          {
            q: "免费版包含什么？",
            a: "每天 {limit} 份合同，并可在屏幕上查看完整结果。下载 Excel 需要一个 Tavnit 账户，账户是免费的。",
          },
          {
            q: "它会提取哪些日期和信息？",
            a: "合同各方、签署日期、合同期的起止日期、合同期长度、是否自动续约、通知期、发出不续约通知的截止日、合同金额及币种，以及适用法律。合同里没写的就留空：绝不会凭空编造日期。",
          },
          {
            q: "为什么结果只有一行？",
            a: "因为一份合同只有一个合同期、一个签署日期和一组合同方。有了账户，你可以处理一整个文件夹的合同，得到一张每份合同一行的表格，可以直接按到期日排序。",
          },
          {
            q: "支持哪些格式？",
            a: "PDF（文本型或扫描型）、JPG 和 PNG，最大 4 MB、5 页。如果你的合同页数更多，可以只上传包含合同期和续约条款的页面，或者创建账户。",
          },
          {
            q: "我能选择其他列吗？",
            a: "这里不行：这个工具使用的是一个固定的合同 Flow，共 14 个字段。在你的账户中，你可以为合同或任何其他文档创建自己的 Flow，字段完全按需设置：内部负责人、违约条款、担保。无需模板：你只需描述字段，必要时再给一个去哪里找的提示。",
          },
          {
            q: "我的文件会怎样处理？",
            a: "文件在一个专门用于免费工具、不作他用的 Tavnit 账户中处理。24 小时后，文件和提取出的数据行会自动删除；我们只保留曾经运行过一次的记录，不保留文档及其内容。如果你希望更早删除，请发邮件至 support@tavnit.io。",
          },
          {
            q: "它能处理任何国家的合同吗？",
            a: "能。它可以处理英文、西班牙文及其他语言的合同，支持任何日期格式。它已在美国、巴拿马、墨西哥和哥伦比亚等地的合同上测试过。",
          },
          {
            q: "怎样在到期前收到提醒？",
            a: "创建账户，按你需要的字段搭建一个 Flow，然后把合同转发到它的邮箱地址，或者通过 API、webhook、Zapier、Make 或 n8n 接入。Cleaner 会把通知截止日与今天比较，并把邮件或 webhook 发给需要做决定的人。",
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
        doc: "收据",
        docs: "收据",
        a_doc: "一张收据",
        the_doc: "收据",
        the_docs: "这些收据",
        your_doc: "你的收据",
        your_docs: "你的收据",
        all_your_docs: "你所有的收据",
        all_docs: "所有收据",
        each_doc: "每一张收据",
        another_doc: "另一张收据",
        this_doc: "这张收据",
      },
      overrides: {
        title: "收据转 Excel，免费：照片秒变表格",
        description:
          "上传收据的照片或 PDF，即可在 Excel 中得到它的各行：商家、日期、商品、数量、税额、小费和总额。免费，无需模板，无需注册即可查看结果。几秒钟完成收据 OCR 转表格。",
        label: "收据转 Excel",
        h1: "把收据变成 Excel",
        intro:
          "给收据拍张照，或上传 PDF。Tavnit 会读取商家、日期、每件商品及其价格以及各项合计，并以电子表格的形式交还给你。褪色、歪斜或皱巴巴的热敏小票也没问题：无需设置任何模板。",
        drop: {
          title: "把你的收据照片拖到这里",
          sample: "用示例收据试试",
        },
        stages: ["正在上传收据", "正在读取商家和日期", "正在查找商品", "正在整理列", "马上就好"],
        result: {
          empty: "我们没有在这张收据上找到任何商品。请拍一张更清晰的照片，让整张小票都在画面内，并避免阴影。",
          flowNote: "这 {fields} 列是一个固定收据 Flow 的字段。在你的账户中，字段由你决定。",
          ghostHint: "在 Tavnit 中，你可以添加任何需要的字段：成本中心、消费人、项目、类别……",
        },
        next: {
          lead: "刚才处理的只是一张收据。有了账户，每一张到达的收据都会自动这样处理，而且数据不会停在 Excel 里：它们会自己继续流转。",
          source: "你的收据",
          inputs: { show: "你的收据怎么进入 Tavnit？" },
          flow: {
            name: "收据",
            add: { name: "cost_center", type: "文本", hint: "消费人或所属项目", save: "保存", value: "Sales" },
          },
        },
        cleaners: {
          lead: "简单的规则，在每张收据读取完成后自动运行。下面是用你自己的数据举的四个例子：",
          ideas: [
            { icon: "date", title: "统一日期写法", from: "{date}", to: "{iso}", note: "每一张收据，报销单用同一种格式" },
            { icon: "sum", title: "商品之和必须等于小计", from: "商品合计 {sum}", to: "小计 {subtotal}", note: "对不上说明照片没读好，会有人来核对", check: "sum" },
            { icon: "approve", title: "超过一定金额需审批", from: "总额 {total}", to: "报销前审批", note: "当金额超过 {threshold} 时" },
            { icon: "money", title: "换算成你的币种", from: "{total} {currency}", to: "你的币种", note: "按收据日期当天的汇率，适合差旅" },
          ],
        },
        after: {
          lead: "它来自一个有 {fields} 个字段的固定 Flow。在你的账户中，字段由你决定。下面是 Tavnit 处理一次出差或一个月所有收据时的样子：",
        },
        how: {
          steps: [
            { title: "上传收据", body: "手机照片或 PDF。任何商家、任何语言，小票再褪色也没关系。" },
            { title: "Tavnit 读取内容", body: "它会找到商家、日期、编号、每件商品及其价格，以及小计、税额、小费和总额。" },
            { title: "检查并下载", body: "表格会显示在屏幕上。创建免费账户后，即可把它下载为 Excel。" },
          ],
        },
        faqs: [
          {
            q: "免费版包含什么？",
            a: "每天 {limit} 张收据，并可在屏幕上查看完整结果。下载 Excel 需要一个 Tavnit 账户，账户是免费的。",
          },
          {
            q: "用手机拍的照片可以吗？",
            a: "可以，这就是最常见的用法。支持最大 4 MB 的 JPG、PNG 和 PDF。最好让整张小票都在画面内、光线均匀、没有手指挡住；即使拍歪了或有点模糊，也照样能读。",
          },
          {
            q: "支持哪些格式？",
            a: "JPG、PNG 和 PDF（文本型或扫描型），最大 4 MB、5 页。一张长长的超市小票用一张照片就能拍下。",
          },
          {
            q: "需要为每个商家设置模板吗？",
            a: "不需要。Tavnit 不使用模板：它按每张收据本来的样子去读，无论是餐厅、药店、出租车还是加油站。",
          },
          {
            q: "我能选择其他列吗？",
            a: "这里不行：这个工具使用的是一个固定的收据 Flow，共 15 个字段。在你的账户中，你可以创建自己的 Flow，字段完全按需设置：按文档（成本中心、消费人、项目、类别）或按行（产品代码）。无需模板：你只需描述字段，必要时再给一个去哪里找的提示。",
          },
          {
            q: "我的文件会怎样处理？",
            a: "文件在一个专门用于免费工具、不作他用的 Tavnit 账户中处理。24 小时后，照片和提取出的数据行会自动删除；我们只保留曾经运行过一次的记录，不保留文档及其内容。如果你希望更早删除，请发邮件至 support@tavnit.io。",
          },
          {
            q: "一次出差攒了五十张收据，要一张一张传吗？",
            a: "在这里是的。有了账户，你可以一次全部发送：通过邮件转发给 Flow、批量拖入，或通过 API 接入，每张收据都会以数据行的形式进入同一个 Excel、Google Sheets 或你的报销系统。",
          },
          {
            q: "怎样让它自动运行？",
            a: "创建账户，按你需要的字段搭建一个 Flow，然后把收据照片转发到它的邮箱地址，或者通过 API、webhook、Zapier、Make 或 n8n 接入。报销单会自动生成。",
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
      vocab: SPREADSHEET_VOCAB,
      overrides: {
        title: "免费修复 Excel 或 CSV 中的数字格式",
        description:
          "上传含有 1.234,56 或 1,234.56 这类数字的 Excel 或 CSV 文件，即可把它们统一成一种格式，直接就能求和。列和格式由你选择。免费，无需注册即可查看结果。",
        label: "修复数字格式",
        h1: "修复表格中的数字格式",
        intro:
          "上传 Excel 或 CSV 文件。选择哪些列是数字，以及你想要的格式：1234.56、1,234.56 或 1.234,56。Tavnit 会逐一转换，并把文件原样交还给你，列和顺序都保持不变。",
        trust: ["CSV 或 Excel · 最多 500 行", "每天 {limit} 个免费文件", "24 小时后全部删除"],
        drop: {
          title: "把你的 Excel 或 CSV 文件拖到这里",
          hint: "或从电脑中选择文件",
          choose: "选择文件",
          sample: "用示例文件试试",
          formats: "CSV 或 .xlsx · 最大 4 MB、500 行",
        },
        errors: {
          unsupported: "仅支持 CSV 或 Excel（.xlsx）文件。",
          xls: "这是旧版 Excel 文件（.xls）。请在 Excel 中打开，另存为 .xlsx 或 .csv。",
          too_many_rows: "免费版最多处理 500 行。请上传文件的一部分。",
          too_many_columns: "每次最多选择 10 列。",
          no_columns: "请至少选择一列。",
          nothing_to_clean: "我们在这些列中没有找到需要转换的数字。",
          empty: "文件是空的，或者表头下面没有数据行。",
          unreadable: "我们无法读取这个文件。如果是 Excel 文件，请重新另存为 .xlsx。",
          failed: "我们无法转换这个文件。请重试，或使用示例文件试试。",
        },
        how: {
          heading: "使用方法",
          steps: [
            { title: "上传文件", body: "CSV 或 Excel 文件，逗号或分号分隔均可。" },
            { title: "选择列和格式", body: "我们会预先勾选看起来是数字的列。你告诉我们文件里的小数用逗号还是小数点，以及想要的格式。" },
            { title: "检查并下载", body: "发生变化的单元格会高亮显示。用你的免费账户，即可把文件下载为 Excel 或 CSV。" },
          ],
        },
        faqs: [
          { q: "为什么 Excel 不能对我的数字求和？", a: "因为它把这些数字当成了文本。当文件来自一个小数写法与你不同的系统或国家时就会这样：比如在设置为 1,234.56 的 Excel 里出现 1.234,56，或者反过来。把它们统一成一种格式，它们就重新变回数字了。" },
          { q: "你们怎么知道我的小数用的是逗号还是小数点？", a: "我们根据你的数值来判断：如果出现 1.234,56，小数点就是逗号。无法判断时，比如单独一个 1.234，就由你来选。这个选择决定了每个数字的读取方式。" },
          { q: "我应该选哪种格式？", a: "1234.56（不带千位分隔符）是所有系统、公式和导入都能顺利读取的格式。1,234.56 和 1.234,56 适合给人看，取决于你所在的国家。" },
          { q: "不是数字的单元格会怎样？", a: "保持原样。百分比（15%）、文本（N/A）或空单元格都不会被改动：只有明确是数字的内容才会变化。" },
          { q: "支持哪些格式？", a: "以逗号、分号或制表符分隔的 CSV，以及 Excel .xlsx，最大 4 MB、500 行。如果你的是旧版 Excel 文件（.xls），请另存为 .xlsx。" },
          { q: "我的文件会怎样处理？", a: "它只用于这次转换，24 小时后会连同结果一起删除。只有你的浏览器能看到结果。" },
          { q: "怎样让它自动完成？", a: "在 Tavnit 中，同样的规则就是一个 Cleaner：它会自动作用于你提取的每份文档，或通过邮件、API 到达的每个文件，与日期、币种和校验规则一起运行。" },
        ],
        clean: {
          setup: {
            heading: "选择列和格式",
            fileSummary: "{rows} · {cols}",
            columnsLabel: "包含数字的列",
            columnsHint: "最多 {max} 列。我们已勾选看起来是数字的列。",
            tooMany: "每次最多可以选择 {max} 列。",
            inputLabel: "你的文件中，小数使用",
            inputOptions: { comma: "逗号 · 1.234,56", dot: "小数点 · 1,234.56" },
            outputLabel: "我想要的数字格式",
            outputOptions: { plain: "1234.56 · 适用于公式和系统", us: "1,234.56", latam: "1.234,56" },
            preview: "前几行",
            run: "转换",
            change: "更换文件",
          },
          stages: ["正在上传文件", "正在读取各列", "正在转换数字", "正在生成你的文件"],
          heading: "完成：{file}",
          summary: "{cols}中共有 {cells}已更改",
          cellWord: ["个单元格", "个单元格"],
          columnWord: ["列", "列"],
          unchanged: "没有需要更改的单元格：它们已经是这种格式了。",
          highlight: "发生变化的单元格以蓝色显示。",
          shown: "显示 {total} 行中的 {shown} 行。下载的文件包含全部数据。",
          download: "下载",
          downloadXlsx: "Excel（.xlsx）",
          downloadCsv: "CSV（.csv）",
          another: "转换另一个文件",
          automate: {
            heading: "让每个文件都自动完成",
            body: "在 Tavnit 中，这条规则就是一个 Cleaner。只需设置一次，它就会自动作用于你提取的每张发票，或通过邮件、API 到达的每个文件，与日期、币种和校验规则一起运行。",
            cta: "创建免费账户",
            docs: "什么是 Cleaner",
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
      vocab: SPREADSHEET_VOCAB,
      overrides: {
        title: "免费修复 Excel 或 CSV 中的日期格式",
        description:
          "上传日期写法混杂（03/04/2024、March 12 2024、2024-03-12）的 Excel 或 CSV 文件，即可把它们全部统一成一种格式。列和格式由你选择。免费，无需注册即可查看结果。",
        label: "修复日期格式",
        h1: "把表格中的所有日期统一成一种格式",
        intro:
          "上传 Excel 或 CSV 文件。选择哪些列是日期，以及你想要的格式：2024-03-12、12/03/2024 或 03/12/2024。Tavnit 会逐一转换，用文字写的日期也不例外，并把文件交还给你，列保持不变。",
        trust: ["CSV 或 Excel · 最多 500 行", "每天 {limit} 个免费文件", "24 小时后全部删除"],
        drop: {
          title: "把你的 Excel 或 CSV 文件拖到这里",
          hint: "或从电脑中选择文件",
          choose: "选择文件",
          sample: "用示例文件试试",
          formats: "CSV 或 .xlsx · 最大 4 MB、500 行",
        },
        errors: {
          unsupported: "仅支持 CSV 或 Excel（.xlsx）文件。",
          xls: "这是旧版 Excel 文件（.xls）。请在 Excel 中打开，另存为 .xlsx 或 .csv。",
          too_many_rows: "免费版最多处理 500 行。请上传文件的一部分。",
          too_many_columns: "每次最多选择 10 列。",
          no_columns: "请至少选择一列。",
          nothing_to_clean: "我们在这些列中没有找到需要转换的日期。",
          empty: "文件是空的，或者表头下面没有数据行。",
          unreadable: "我们无法读取这个文件。如果是 Excel 文件，请重新另存为 .xlsx。",
          failed: "我们无法转换这个文件。请重试，或使用示例文件试试。",
        },
        how: {
          heading: "使用方法",
          steps: [
            { title: "上传文件", body: "CSV 或 Excel 文件，日期保持原样即可：斜杠、短横线、点号或文字。" },
            { title: "选择列和格式", body: "我们会预先勾选看起来是日期的列。你告诉我们文件里是日在前还是月在前，以及想要的格式。" },
            { title: "检查并下载", body: "发生变化的单元格会高亮显示。用你的免费账户，即可把文件下载为 Excel 或 CSV。" },
          ],
        },
        faqs: [
          { q: "你们怎么知道 03/04/2024 是 4 月 3 日还是 3 月 4 日？", a: "单看一个日期是无法判断的。所以我们会问你文件里是日在前还是月在前；如果这一列里有 15/04/2024 这种只有一种读法的日期，我们会给出建议答案。" },
          { q: "它能理解用文字写的日期吗？", a: "能。“March 5th 2024”“12 de marzo de 2024”或“1 Apr 2024”都会由 AI 读取，这正是 Excel 公式做不到的。数字形式的日期则按规则读取，不用 AI。" },
          { q: "我应该选哪种格式？", a: "2024-03-12（年、月、日）是所有系统都能无歧义读取、并且能正确排序的格式。03/12/2024 是美国的习惯；12/03/2024 在欧洲和拉丁美洲很常见。" },
          { q: "不是日期的单元格会怎样？", a: "和空单元格一样保持原样。当某个日期无法有把握地读取时，我们宁可保留原样，也不去猜。" },
          { q: "如果我的 Excel 文件已经把它们存成日期了呢？", a: "我们按原值接收，不重新解读，只更改格式。" },
          { q: "我的文件会怎样处理？", a: "它只用于这次转换，24 小时后会连同结果一起删除。只有你的浏览器能看到结果。" },
          { q: "怎样让它自动完成？", a: "在 Tavnit 中，同样的规则就是一个 Cleaner：它会自动作用于你提取的每份文档，或通过邮件、API 到达的每个文件，与数字、币种和校验规则一起运行。" },
        ],
        clean: {
          setup: {
            heading: "选择列和格式",
            fileSummary: "{rows} · {cols}",
            columnsLabel: "包含日期的列",
            columnsHint: "最多 {max} 列。我们已勾选看起来是日期的列。",
            tooMany: "每次最多可以选择 {max} 列。",
            inputLabel: "你的文件中，数字日期排在前面的是",
            inputOptions: { dmy: "日 · 31/12/2024", mdy: "月 · 12/31/2024" },
            outputLabel: "我想要的日期格式",
            outputOptions: { iso: "2024-03-12 · 年、月、日", dmy: "12/03/2024 · 日、月、年", mdy: "03/12/2024 · 月、日、年" },
            preview: "前几行",
            run: "转换",
            change: "更换文件",
          },
          stages: ["正在上传文件", "正在读取各列", "正在转换日期", "正在读取文字写的日期", "正在生成你的文件"],
          heading: "完成：{file}",
          summary: "{cols}中共有 {cells}已更改",
          cellWord: ["个单元格", "个单元格"],
          columnWord: ["列", "列"],
          unchanged: "没有需要更改的单元格：它们已经是这种格式了。",
          highlight: "发生变化的单元格以蓝色显示。",
          shown: "显示 {total} 行中的 {shown} 行。下载的文件包含全部数据。",
          download: "下载",
          downloadXlsx: "Excel（.xlsx）",
          downloadCsv: "CSV（.csv）",
          another: "转换另一个文件",
          automate: {
            heading: "让每个文件都自动完成",
            body: "在 Tavnit 中，这条规则就是一个 Cleaner。只需设置一次，它就会自动作用于每一张发票、每一份合同或每一个到达的文件，与数字、币种和校验规则一起运行。",
            cta: "创建免费账户",
            docs: "什么是 Cleaner",
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
      vocab: SPREADSHEET_VOCAB,
      overrides: {
        title: "免费按今日汇率换算 Excel 中的货币",
        description:
          "上传含有价格或金额的 Excel 或 CSV 文件，即可按当日参考汇率把每一列换算成美元、欧元、英镑或 30 种货币中的任意一种。免费，无需注册即可查看结果。",
        label: "货币换算",
        h1: "把表格中的金额换算成另一种货币",
        intro:
          "上传 Excel 或 CSV 文件。选择金额列、它们当前的币种以及目标币种。Tavnit 会按当日汇率在每一列旁边添加换算后的列，并把完整的文件交还给你。",
        trust: ["CSV 或 Excel · 最多 500 行", "每天 {limit} 个免费文件", "24 小时后全部删除"],
        drop: {
          title: "把你的 Excel 或 CSV 文件拖到这里",
          hint: "或从电脑中选择文件",
          choose: "选择文件",
          sample: "用示例文件试试",
          formats: "CSV 或 .xlsx · 最大 4 MB、500 行",
        },
        errors: {
          unsupported: "仅支持 CSV 或 Excel（.xlsx）文件。",
          xls: "这是旧版 Excel 文件（.xls）。请在 Excel 中打开，另存为 .xlsx 或 .csv。",
          too_many_rows: "免费版最多处理 500 行。请上传文件的一部分。",
          too_many_columns: "每次最多选择 10 列。",
          no_columns: "请至少选择一列。",
          nothing_to_clean: "我们在这些列中没有找到需要换算的金额。",
          empty: "文件是空的，或者表头下面没有数据行。",
          unreadable: "我们无法读取这个文件。如果是 Excel 文件，请重新另存为 .xlsx。",
          failed: "我们无法转换这个文件。请重试，或使用示例文件试试。",
        },
        how: {
          heading: "使用方法",
          steps: [
            { title: "上传文件", body: "包含价格、合计或任何金额列的 CSV 或 Excel 文件。" },
            { title: "选择币种", body: "我们会预先勾选看起来是金额的列。你告诉我们它们的币种、小数的写法，以及要换算成什么币种。" },
            { title: "检查并下载", body: "每个换算后的列都紧挨着原始列。用你的免费账户，即可把文件下载为 Excel 或 CSV。" },
          ],
        },
        faqs: [
          { q: "它使用什么汇率？", a: "欧洲中央银行公布的当日参考汇率。整个文件使用同一个汇率，它只是参考值，并非你所在银行的买入或卖出汇率。" },
          { q: "可以换算哪些货币？", a: "美元（USD）、欧元（EUR）、英镑（GBP）、墨西哥比索（MXN）、巴西雷亚尔（BRL）、人民币（CNY）、加元、日元、瑞士法郎，以及欧洲中央银行公布的其他货币，共 30 种。任意两种之间都可以互相换算。" },
          { q: "支持哥伦比亚比索、秘鲁索尔、智利比索或巴波亚吗？", a: "暂不支持：这些货币不在欧洲中央银行的汇率中。在巴拿马，巴波亚与美元等值，你可以选择 USD。" },
          { q: "我原来的列会怎样？", a: "保持原样。换算结果会作为新列添加在旁边，例如“Price (USD)”，方便你对比。" },
          { q: "不是金额的单元格会怎样？", a: "在换算列中留空。文本、百分比或空单元格都不会被换算。" },
          { q: "我的文件会怎样处理？", a: "它只用于这次转换，24 小时后会连同结果一起删除。只有你的浏览器能看到结果。" },
          { q: "怎样让它自动完成？", a: "在 Tavnit 中，货币换算就是一个 Cleaner：它会自动作用于你提取的每张发票，或通过邮件、API 到达的每个文件，与日期、数字和校验规则一起运行。" },
        ],
        clean: {
          setup: {
            heading: "选择列和币种",
            fileSummary: "{rows} · {cols}",
            columnsLabel: "包含金额的列",
            columnsHint: "最多 {max} 列。我们已勾选看起来是金额的列。",
            tooMany: "每次最多可以选择 {max} 列。",
            sourceLabel: "金额的币种",
            sourceHint: "有欧洲中央银行汇率的货币。",
            inputLabel: "小数使用",
            inputOptions: { comma: "逗号 · 1.234,56", dot: "小数点 · 1,234.56" },
            outputPopular: "常用",
            outputAll: "所有货币",
            outputLabel: "换算成",
            outputOptions: {},
            preview: "前几行",
            run: "转换",
            change: "更换文件",
          },
          stages: ["正在上传文件", "正在读取金额", "正在获取当日汇率", "正在换算", "正在生成你的文件"],
          heading: "完成：{file}",
          summary: "{cols}中共换算了 {cells}",
          cellWord: ["个单元格", "个单元格"],
          columnWord: ["列", "列"],
          unchanged: "我们在这些列中没有找到需要换算的金额。",
          highlight: "换算后的列以蓝色显示。",
          shown: "显示 {total} 行中的 {shown} 行。下载的文件包含全部数据。",
          download: "下载",
          downloadXlsx: "Excel（.xlsx）",
          downloadCsv: "CSV（.csv）",
          another: "转换另一个文件",
          automate: {
            heading: "让每张发票都自动完成",
            body: "在 Tavnit 中，货币换算就是一个 Cleaner。只需设置一次，每一张外币发票或报价单到达时就已经换算好了，与日期、数字和校验规则一起运行。",
            cta: "创建免费账户",
            docs: "什么是 Cleaner",
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
      vocab: SPREADSHEET_VOCAB,
      overrides: {
        title: "免费翻译 Excel 中的列",
        description:
          "上传 Excel 或 CSV 文件，把你选择的列翻译成 40 多种语言：英语、西班牙语、葡萄牙语、中文等。每一列的译文都会添加在它旁边。免费，无需注册即可查看结果。",
        label: "翻译列",
        h1: "翻译表格中的列",
        intro:
          "上传 Excel 或 CSV 文件。选择要翻译的列和目标语言。Tavnit 会自动检测源语言，在每一列旁边添加译文，文件的其余部分保持不变。",
        trust: ["CSV 或 Excel · 最多 200 行", "每天 {limit} 个免费文件", "24 小时后全部删除"],
        drop: {
          title: "把你的 Excel 或 CSV 文件拖到这里",
          hint: "或从电脑中选择文件",
          choose: "选择文件",
          sample: "用示例文件试试",
          formats: "CSV 或 .xlsx · 最大 4 MB、200 行",
        },
        errors: {
          unsupported: "仅支持 CSV 或 Excel（.xlsx）文件。",
          xls: "这是旧版 Excel 文件（.xls）。请在 Excel 中打开，另存为 .xlsx 或 .csv。",
          too_many_rows: "免费翻译最多处理 200 行。请上传文件的一部分。",
          too_many_columns: "每次最多选择 10 列。",
          no_columns: "请至少选择一列。",
          nothing_to_clean: "我们在这些列中没有找到需要翻译的文本。",
          empty: "文件是空的，或者表头下面没有数据行。",
          unreadable: "我们无法读取这个文件。如果是 Excel 文件，请重新另存为 .xlsx。",
          failed: "我们无法翻译这个文件。请重试，或使用示例文件试试。",
        },
        how: {
          heading: "使用方法",
          steps: [
            { title: "上传文件", body: "包含描述、说明、备注或任何文本列的 CSV 或 Excel 文件。" },
            { title: "选择列和语言", body: "我们会预先勾选包含文本的列。你选择目标语言；源语言会自动检测。" },
            { title: "检查并下载", body: "每列译文都紧挨着它的原始列。用你的免费账户，即可把文件下载为 Excel 或 CSV。" },
          ],
        },
        faqs: [
          { q: "可以选择哪些语言？", a: "40 多种：英语、西班牙语、葡萄牙语、法语、德语、中文、意大利语、日语、韩语、阿拉伯语、俄语、印地语、土耳其语、越南语等等。源语言按单元格逐一检测，所以即使文件中混有多种语言也能正常处理。" },
          { q: "代码、数字和专有名词会怎样？", a: "保持不变。翻译会保留格式、单位和代码；已经是目标语言的单元格保持原样。" },
          { q: "为什么限制为 200 行？", a: "因为每个单元格都要用语言模型翻译。免费版每个文件最多处理 200 行；账户没有这个限制。" },
          { q: "我原来的列会怎样？", a: "保持原样。译文会作为新列添加在旁边，例如“Description (ES)”。" },
          { q: "可以用它翻译报关用的商品描述吗？", a: "可以，这是很常见的用法：在给货物归类之前，把商业发票或装箱单上的描述翻译成英文或西班牙文。" },
          { q: "我的文件会怎样处理？", a: "它只用于这次翻译，24 小时后会连同结果一起删除。只有你的浏览器能看到结果。" },
          { q: "怎样让它自动完成？", a: "在 Tavnit 中，翻译就是一个 Cleaner：它会自动作用于你提取的每份文档，或通过邮件、API 到达的每个文件，与日期、数字和币种规则一起运行。" },
        ],
        clean: {
          setup: {
            heading: "选择列和语言",
            fileSummary: "{rows} · {cols}",
            columnsLabel: "包含文本的列",
            columnsHint: "最多 {max} 列。我们已勾选包含文本的列。",
            tooMany: "每次最多可以选择 {max} 列。",
            inputLabel: "",
            inputOptions: {},
            outputPopular: "常用",
            outputAll: "所有语言",
            outputLabel: "翻译成",
            outputOptions: {},
            preview: "前几行",
            run: "翻译",
            change: "更换文件",
          },
          stages: ["正在上传文件", "正在读取各列", "正在检测语言", "正在翻译", "正在生成你的文件"],
          heading: "完成：{file}",
          summary: "{cols}中共翻译了 {cells}",
          cellWord: ["个单元格", "个单元格"],
          columnWord: ["列", "列"],
          unchanged: "我们在这些列中没有找到需要翻译的文本。",
          highlight: "翻译后的列以蓝色显示。",
          shown: "显示 {total} 行中的 {shown} 行。下载的文件包含全部数据。",
          download: "下载",
          downloadXlsx: "Excel（.xlsx）",
          downloadCsv: "CSV（.csv）",
          another: "翻译另一个文件",
          automate: {
            heading: "让每份文档都自动完成",
            body: "在 Tavnit 中，翻译就是一个 Cleaner。只需设置一次，每一张发票、每一份装箱单或每一个到达的文件，其中的描述都会自动翻译好。",
            cta: "创建免费账户",
            docs: "什么是 Cleaner",
          },
        },
      },
    },
  },

  og: {
    "invoice-to-excel": "免费。无需模板。把发票明细变成电子表格。",
    "invoice-line-items": "免费。每条明细一行，每行都带表头信息。无需模板。",
    "po-invoice-check": "免费。采购订单逐行对照发票：价格、数量、缺失行和多出的行。",
    "split-scanned-pdf": "免费。一份扫描件进去，每份文档单独出来，各自分好类。",
    "packing-list-to-excel": "免费。无需模板。把装箱单的每一行变成电子表格。",
    "bill-of-lading-to-excel": "免费。无需模板。各方、船名、港口，每个集装箱一行。",
    "quote-comparison": "免费。两到三份报价单，一张表，标出每行最低价。",
    "contract-dates": "免费。合同各方、合同期、自动续约和通知截止日，一行搞定。",
    "receipt-to-excel": "免费。拍下收据，商品明细秒变电子表格。",
    "number-format": "免费。任意数字列统一格式：1234.56、1,234.56 或 1.234,56。",
    "date-format": "免费。混杂的日期进去，统一的格式出来，文字写的日期也行。",
    "currency-converter": "免费。任意价格列，按当日参考汇率换算。",
    "translate-columns": "免费。任意文本列，翻译成 40 多种语言中的任意一种。",
  },
};

export default copy;
