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

/** /zh-hans/docs/email-integration — translated from src/app/docs/email-integration/page.tsx. */

/** Mirrors the visible numbered steps under "开启邮件触发". */
export const schema: DocsPageSchemaData = {
  howTo: {
    name: "使用 Tavnit 邮件触发从邮件附件中提取数据",
    description:
      "在 Tavnit Flow 上开启邮件触发，获得一个专用的收件箱地址，然后把文档转发到这个地址。每个受支持的附件都会成为一个独立的提取 Run。",
    steps: [
      {
        name: "打开 Flow",
        text: "在 Tavnit 应用中进入 Flows，打开你希望接收文档的 Flow。",
      },
      {
        name: "开启邮件触发",
        text: "在 Flow 详情页打开“邮件触发”面板并将其开启。Flow 的收件箱地址随即显示。",
      },
      {
        name: "复制地址",
        text: "点击收件箱地址旁的“复制”。你也可以在同一面板中添加允许的发件人，或开启处理邮件正文。",
      },
      {
        name: "发送一份测试文档",
        text: "向该地址发送一个 PDF，然后查看 Runs 页面。一个来源为“邮件”的新 Run 会出现。",
      },
      {
        name: "自动转发",
        text: "测试成功后，在你的邮件客户端或共享邮箱中添加一条规则，把符合条件的邮件自动转发到该地址。",
      },
    ],
  },
};

export default function EmailIntegrationZhHans() {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        邮件集成
      </h1>

      <DocCard icon={<Mail size={24} />} title="邮件处理的工作方式">
        <Lead>
          每个 Tavnit Flow 都可以拥有自己的收件箱地址。开启邮件触发并向该地址发送文档后，Tavnit
          会取出每个受支持的附件，为它单独创建一个提取 Run，处理方式与你在应用中上传完全相同。
        </Lead>
        <p>
          无需安装任何东西，也不会轮询你的邮箱：你把邮件转发到这个地址，Tavnit 就会响应。这是从“发票通过邮件到达”到“发票以结构化行的形式到达”的最短路径，完全不涉及代码。Collection、Splitter、Pipeline、Matcher
          和 Subject 也都有各自的地址。
        </p>
        <BulletList
          items={[
            "直接从收件箱转发发票或收据",
            "带有自动转发规则的共享应付账款邮箱",
            "让供应商无需 Tavnit 账号即可发送文档",
            "提取邮件正文中的数据，例如没有附件的订单确认",
          ]}
        />
      </DocCard>

      <DocCard icon={<ExternalLink size={24} />} title="开启邮件触发">
        <Lead>
          触发默认是关闭的。在 Flow 详情页将其开启，复制它给出的地址，并在把转发规则指向它之前先发送一份文档进行测试。
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f0">
              进入 <strong>Flows</strong>，打开你希望接收文档的 Flow。
            </Fragment>,
            <Fragment key="f1">
              打开<strong>邮件触发</strong>面板并将其开启。Flow 的<strong>收件箱地址</strong>随即显示。
            </Fragment>,
            <Fragment key="f2">
              点击地址旁的<strong>复制</strong>。在同一面板中，你可以添加<strong>允许的发件人</strong>，或开启
              <strong>处理邮件正文</strong>（两者均在下文说明）。
            </Fragment>,
            <Fragment key="f3">
              向该地址发送一个 PDF，然后查看 <strong>Runs</strong> 页面。一个来源为
              <strong>邮件</strong>的新 Run 会出现，发件人的地址也会记录在该 Run 上。
            </Fragment>,
            "测试成功后，在你的邮件客户端或共享邮箱中添加转发规则。",
          ]}
        />
        <InfoBox color="blue" icon={<Info size={20} />} title="每个附件一个 Run">
          一封附有三张发票的邮件会生成三个独立的 Run，每个都有自己的结果，并在 Runs 列表中各占一行。它不会生成一个包含三份文档的
          Run。
        </InfoBox>
        <WarningBox>
          发送到触发已关闭的地址（或未启用的 Collection）的邮件会被接收后丢弃：发件人不会收到退信，也不会看到错误。如果文档似乎凭空消失，请先检查开关。
        </WarningBox>
      </DocCard>

      <DocCard icon={<ShieldCheck size={24} />} title="允许的发件人">
        <Lead>
          默认情况下，任何发件人都可以通过向该地址发送邮件来触发 Run。在邮件触发面板的
          <strong>允许的发件人</strong>中添加地址后，只有这些发件人会被接受；其他人发来的邮件会被静默丢弃。
        </Lead>
        <BulletList
          items={[
            "条目是完整的邮件地址，而不是域名。匹配时忽略大小写和显示名称。",
            "列表留空即可接受任何发件人的邮件。",
            "Flow、Collection、Splitter、Pipeline、Matcher 和 Subject 的邮件触发都提供此列表。",
            <Fragment key="f4">
              通过共享邮箱转发时，Tavnit 看到的发件人通常是执行转发的那个邮箱，因此应允许的是这个地址。
            </Fragment>,
          ]}
        />
      </DocCard>

      <DocCard icon={<Mail size={24} />} title="处理邮件正文">
        <Lead>
          有些数据从不以附件形式到达：订单确认、预订通知、在邮件里写明数量的供应商。开启
          <strong>处理邮件正文</strong>后，Tavnit 会把邮件正文转换为 PDF，并像处理其他文档一样处理它。此功能适用于 Flow 和
          Collection。
        </Lead>
        <DataTable
          head={["模式", "会发生什么"]}
          rows={[
            [
              <Fragment key="f5"><strong>仅在没有附件时</strong>（默认）</Fragment>,
              "仅当邮件没有文档附件时才处理正文。发票旁边一句“见附件”的说明会被跳过，因此一封邮件绝不会启动两个 Run。",
            ],
            [
              <Fragment key="f6"><strong>始终</strong></Fragment>,
              "正文与每个附件一起处理，各自在独立的 Run 中。",
            ],
          ]}
        />
        <BulletList
          items={[
            "正文 PDF 会像其他文档一样出现在审核中，该 Run 会被标记为来自邮件正文。",
            "在邮件服务商能够识别的情况下，引用的回复链和签名会被去除。",
            "邮件中的图片不会被读取。在判断是否应处理正文时，内嵌的签名图片不计为附件。",
            "几乎没有文字的正文（“好的”、“谢谢”、空白的转发）不会被处理。",
          ]}
        />
      </DocCard>

      <DocCard icon={<AtSign size={24} />} title="哪些功能拥有邮件地址">
        <Lead>
          邮件触发并不限于 Flow。你可以把地址指向整个分拣环节、一个 Pipeline 或一次比较，而不只是单一文档类型。
        </Lead>
        <DataTable
          head={["发送到", "地址格式", "会发生什么"]}
          rows={[
            [
              "Flow",
              <Fragment key="f7"><InlineCode>flow-name-&lt;id&gt;@mg.tavnit.io</InlineCode></Fragment>,
              "每个附件都由该 Flow 提取。",
            ],
            [
              "Collection",
              <Fragment key="f8"><InlineCode>name-&lt;id&gt;-collection@mg.tavnit.io</InlineCode></Fragment>,
              <Fragment key="f9">
                每个附件都会被分类并路由到正确的 Flow 或 Splitter。参见{" "}
                <DocLink href="/docs/collections">Collection 如何路由文档</DocLink>。
              </Fragment>,
            ],
            [
              "Splitter",
              <Fragment key="f10"><InlineCode>&lt;id&gt;-splitter@mg.tavnit.io</InlineCode></Fragment>,
              <Fragment key="f11">
                每个附件会先被拆分为各自独立的文档。参见
                <DocLink href="/docs/splitters">拆分包含多份文档的文件</DocLink>。
              </Fragment>,
            ],
            [
              "Pipeline",
              <Fragment key="f12"><InlineCode>&lt;id&gt;-pipeline@mg.tavnit.io</InlineCode></Fragment>,
              <Fragment key="f13">
                每个 PDF 或图片附件启动一次执行。参见 <DocLink href="/docs/pipelines">Pipelines</DocLink>。
              </Fragment>,
            ],
            [
              "Matcher",
              <Fragment key="f14"><InlineCode>&lt;id&gt;-matcher@mg.tavnit.io</InlineCode></Fragment>,
              <Fragment key="f15">
                一封邮件的所有 PDF 或图片附件会在一次匹配中一起比较（始终为多边模式），结果会在同一邮件会话中回复。参见{" "}
                <DocLink href="/docs/matchers">Matchers</DocLink>。
              </Fragment>,
            ],
            [
              "Subject",
              <Fragment key="f16"><InlineCode>&lt;id&gt;-subject@mg.tavnit.io</InlineCode></Fragment>,
              <Fragment key="f17">
                每个附件会根据邮件主题、正文或文件名中的参考编号，或根据案例自己的加号地址，归档到正确的案例中。参见{" "}
                <DocLink href="/docs/subjects">Subjects</DocLink>。
              </Fragment>,
            ],
          ]}
          caption="请从对应功能的邮件触发面板中复制准确的地址；上面的格式只是帮助你区分它们。"
        />
        <InfoBox color="violet" icon={<Workflow size={20} />} title="供应商应该使用哪个地址？">
          如果某个发件人只发送一种文档类型，就给他 Flow 地址。如果他发送的是混合文档（发票、采购订单、送货单），就给他
          Collection 地址，让 Tavnit 来分拣。如果他发送的是一个包含多份文档的 PDF，就给他 Splitter 地址。
        </InfoBox>
      </DocCard>

      <DocCard icon={<Paperclip size={24} />} title="Tavnit 接受哪些文件">
        <Lead>
          Flow、Collection、Splitter 和 Subject 可以读取 PDF、常见图片和电子表格。Pipeline 和 Matcher 只读取 PDF
          和图片。邮件中的其他内容会被跳过，但不会导致其余部分失败：一个不受支持的文件不会阻止其他附件被处理。
        </Lead>
        <DataTable
          head={["接受的类型", "扩展名"]}
          rows={[
            ["PDF 文档", <Fragment key="f18"><InlineCode>.pdf</InlineCode></Fragment>],
            [
              "图片",
              <Fragment key="f19"><InlineCode>.png .jpg .jpeg .jfif .tif .tiff .webp .bmp .gif</InlineCode></Fragment>,
            ],
            [
              "电子表格（Pipeline 和 Matcher 除外）",
              <Fragment key="f20"><InlineCode>.xlsx .xls .csv</InlineCode></Fragment>,
            ],
          ]}
        />
        <p>满足以下任一条件时，附件会被跳过而不被处理：</p>
        <DataTable
          head={["跳过原因", "具体表现"]}
          rows={[
            [
              "不受支持的文件类型",
              "Word 文档、压缩包、.eml 转发邮件，以及任何没有可识别扩展名的文件。",
            ],
            ["空附件", "零字节的文件，通常是转发出错所致。"],
            [
              "无法读取的文件",
              "文件扩展名有效但无法打开：下载不完整、被改名的文件，或无法解析的电子表格。",
            ],
          ]}
        />
        <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="签名图片也算附件">
          邮件签名中的徽标经常以图片附件的形式到达，Flow 会像处理其他图片一样处理它。如果因此产生了不需要的
          Run，请只转发文档本身，或者使用允许的发件人，并配合一条去除内嵌图片的转发规则。
        </InfoBox>
        <p>
          在 Tavnit 看到邮件之前，你的邮件服务商的附件大小限制就已生效。如果一份较大的扫描件在发送端被退回，请改为在应用中上传，或通过{" "}
          <DocLink href="/docs/api-integration">REST API</DocLink> 提交。
        </p>
      </DocCard>

      <DocCard icon={<FileSpreadsheet size={24} />} title="电子表格的处理方式">
        <Lead>
          电子表格附件会被当作一份文档，而不是要导入的表格。具体如何处理取决于你把它发送到哪里。
        </Lead>
        <DataTable
          head={["发送到", "Tavnit 的处理方式"]}
          rows={[
            [
              "Flow",
              "从第一个可见工作表中提取。",
            ],
            [
              "Collection",
              "根据第一个工作表对文件分类，然后交给选定的 Flow，由它读取第一个可见工作表。",
            ],
            [
              "Splitter",
              "把每个可见且非空的工作表视为一份独立文档，分别分类，并作为单工作表文件向下传递。",
            ],
          ]}
        />
        <p>
          超大的工作表会被拒绝并报错。如果要把电子表格作为结构化行导入，请改用{" "}
          <DocLink href="/docs/cleaners">Cleaner</DocLink> 清洗（sweep）。
        </p>
      </DocCard>

      <DocCard icon={<Copy size={24} />} title="重复保护">
        <Lead>
          邮件服务器有时会多次投递同一封邮件，例如在超时之后。Tavnit 能识别发送到同一地址的重复投递邮件，不会再次处理，因此重试绝不会产生重复的
          Run。
        </Lead>
        <BulletList
          items={[
            "Tavnit 会在几秒内确认收到邮件，并在后台处理附件，因此发送带有大量附件的邮件也是安全的。",
            "如果处理被中断，会从中断处继续，而不是从头开始。",
            "同一封邮件发送到两个不同的 Tavnit 地址时，会在每个地址各处理一次。",
            "在一封新邮件中再次发送同一个文件属于新邮件，会被再次处理。",
          ]}
        />
      </DocCard>

      <DocCard icon={<Send size={24} />} title="通过邮件发回结果">
        <Lead>
          邮件输出是回程：Run 成功完成后，Tavnit 会把结果通过邮件发送到你配置的地址。它与邮件触发相互独立：你可以单独使用其中任何一个，也可以同时使用两者，形成完整的“发进去、取回来”闭环。
        </Lead>
        <NumberedList
          items={[
            "打开 Flow 详情页。",
            <Fragment key="f21">
              打开<strong>邮件输出</strong>面板。
            </Fragment>,
            <Fragment key="f22">
              添加一个或多个<strong>收件人地址</strong>。
            </Fragment>,
            <Fragment key="f23">
              在<strong>附件</strong>下选择每封邮件携带的内容，然后保存。
            </Fragment>,
          ]}
        />
        <DataTable
          head={["选项", "收到的内容"]}
          rows={[
            ["JSON 提取结果", "提取结果以格式化 JSON 的形式放在邮件正文中。"],
            [
              "CSV 提取结果",
              <Fragment key="f24">
                各行数据作为 <InlineCode>rows.csv</InlineCode> 附件，这是把结果导入电子表格的最快方式。
              </Fragment>,
            ],
            ["表单结果", "当 Flow 填写表单模板时，附上填好的 PDF。"],
            [
              "原始文档",
              "被处理的源文件（PDF、图片或电子表格），与结果一起作为附件。",
            ],
          ]}
        />
        <InfoBox color="purple" icon={<Code2 size={20} />} title="文件字段以链接形式到达">
          保存文件或图片的字段不会嵌入 JSON 中，而是以限时链接的形式提供，因为 Tavnit
          会对存储的文档保密：原始存储路径无法从收件箱中获取。
        </InfoBox>
        <BulletList
          items={[
            "输出邮件只在成功完成的 Run 上发送。失败的 Run 不会发送任何内容。",
            "邮件主题包含 Flow 名称和每个 Run 的具体信息，因此邮件客户端不会把一个 Flow 的所有 Run 折叠到同一个会话中。",
            <Fragment key="f25">
              如果 Flow 开启了<DocLink href="/docs/human-in-the-loop">人工审核</DocLink>，邮件会等到审核者批准该 Run 后才发送。
            </Fragment>,
            <Fragment key="f26">
              对于系统之间的交付，<DocLink href="/docs/webhooks">webhook</DocLink> 比邮件更合适。
            </Fragment>,
          ]}
        />
      </DocCard>

      <DocCard icon={<Workflow size={24} />} title="实例：应付账款收件箱">
        <Lead>
          常见的配置是：一个已经在接收供应商发票的共享邮箱，把邮件转发到一个 Collection，让每个供应商的格式进入正确的
          Flow，结果通过邮件发给财务团队，并推送到一个 Bucket 中。
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f27">
              为你接收的每种文档类型各建一个 Flow，例如<em>供应商发票</em>和<em>送货单</em>，并为每个 Flow 写一段清晰的描述。
            </Fragment>,
            <Fragment key="f28">
              把这两个 Flow 放进一个 <DocLink href="/docs/collections">Collection</DocLink>，并开启该 Collection
              的邮件触发。把共享邮箱添加到允许的发件人中。
            </Fragment>,
            <Fragment key="f29">
              在共享邮箱中，把来自供应商域名、带有附件的邮件转发到 Collection 地址。
            </Fragment>,
            <Fragment key="f30">
              在每个 Flow 上开启<strong>邮件输出</strong>并为财务团队附上 CSV，同时添加{" "}
              <DocLink href="/docs/buckets">Bucket 导出</DocLink>，让数据汇集到同一张表中。
            </Fragment>,
            <Fragment key="f31">
              添加一个 <DocLink href="/docs/cleaners">Cleaner</DocLink>，配置一个条件操作，把超过审批阈值的内容在交付前送去
              <DocLink href="/docs/human-in-the-loop">人工审核</DocLink>。
            </Fragment>,
          ]}
        />
        <p>
          财务部门的任何人都不必打开 Tavnit。发票照旧到达原来的地方，结构化数据也会回到同一个收件箱。
        </p>
      </DocCard>

      <DocCard icon={<LifeBuoy size={24} />} title="故障排查">
        <Lead>
          由于收到的邮件会被静默接收，没有出现的文档不会在你的收件箱里留下任何错误。请按下面的列表逐项排查：原因几乎总是触发开关、允许的发件人、附件类型，或者一条去除了附件的转发规则。
        </Lead>
        <DataTable
          head={["现象", "可能原因", "解决方法"]}
          rows={[
            [
              "完全没有出现 Run",
              "邮件触发已关闭、地址属于另一个 Flow，或发件人不在允许的发件人中。",
              "重新检查开关和允许的发件人列表，并从邮件触发面板重新复制地址。",
            ],
            [
              "部分附件被处理，其他没有",
              "缺失的附件类型不受支持、为空或无法读取。",
              "对照上面的接受列表检查扩展名。",
            ],
            [
              "只有签名图片被处理了",
              "真正的文档没有作为附件：它是以链接形式发送的，或者在转发时丢失了。",
              "以附件而非内嵌方式转发，并检查规则是否保留了附件。",
            ],
            [
              "一封没有附件的邮件没有产生任何结果",
              "处理邮件正文已关闭，或正文几乎没有文字。",
              "在邮件触发面板中开启处理邮件正文（Flow 和 Collection）。",
            ],
            [
              "说明文字生成了自己的 Run",
              "处理邮件正文被设为“始终”。",
              "把模式切换为“仅在没有附件时”。",
            ],
            [
              "Run 出现了但失败",
              "问题出在文档本身，而不是邮件路径。",
              "打开该 Run 并阅读其日志；失败属于提取问题。",
            ],
            [
              "结果始终没有通过邮件到达",
              "未设置邮件输出、Run 失败，或它正在等待审核。",
              "先检查 Run 的状态，再检查邮件输出的配置。",
            ],
          ]}
        />
      </DocCard>

      <Related
        links={[
          {
            href: "/docs/collections",
            label: "使用 Collection 自动路由混合文档",
            description:
              "把一个邮件地址指向多个 Flow，让 Tavnit 为每份文档选出正确的 Flow。",
          },
          {
            href: "/docs/splitters",
            label: "在提取前拆分包含多份文档的文件",
            description: "适用于把多份文档打包进单个附件的发件人。",
          },
          {
            href: "/docs/webhooks",
            label: "通过 webhook 把结果交付到你自己的系统",
            description:
              "邮件输出的机器可读替代方案，带有重试机制。",
          },
          {
            href: "/docs/api-integration",
            label: "通过 REST API 提交文档",
            description:
              "适用于邮件无法承载的数量和文件大小，并提供明确的错误处理。",
          },
        ]}
      />
    </section>
  );
}
