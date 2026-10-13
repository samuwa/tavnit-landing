import { Fragment } from "react";
import {
  AlertTriangle,
  Boxes,
  Braces,
  Crosshair,
  FileInput,
  FilePlus,
  HeartPulse,
  History,
  Image as ImageIcon,
  Info,
  LifeBuoy,
  Play,
  Puzzle,
  RotateCcw,
  Sparkles,
  Table2,
  Type,
  Wand2,
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
  Screenshot,
  WarningBox,
} from "@/components/docs/ui";
import type { DocsPageSchemaData } from "../types";

/** /zh-Hans/docs/flows — translated from src/app/docs/flows/page.tsx. */

/** Mirrors the visible numbered steps under "构建数据结构". */
export const schema: DocsPageSchemaData = {
  howTo: {
    name: "构建一个从文档中提取结构化数据的 Tavnit Flow",
    description:
      "创建 Flow，定义它的元数据字段和表格字段，只在需要的地方添加提取提示，然后用一份真实文档进行测试。",
    steps: [
      {
        name: "创建 Flow 并填写描述",
        text: "在 Flows 页面上点击“创建 Flow”，选择模板、AI 建议或空白 Flow。为它起一个名称，并描述它处理的文档——描述也有助于 AI 更准确地提取。",
      },
      {
        name: "添加元数据字段",
        text: "为每份文档只出现一次的每个值添加一个字段，例如发票号、开票日期或供应商，并设置其数据类型。",
      },
      {
        name: "添加表格字段",
        text: "为重复出现的明细表中的每一列添加一个字段，例如描述、数量、单价和金额。",
      },
      {
        name: "在需要的地方添加提取提示",
        text: "只为需要的字段添加提示：真实的示例值、值旁边的标签、值所在的页面区域，或印刷的列标题。",
      },
      {
        name: "用真实文档测试",
        text: "新建的 Flow 已经是“活跃”状态。点击“运行”，处理一份真实文档，将结果与源文档对比，并收紧所有返回错误的字段的提示。",
      },
    ],
  },
  primaryImage: {
    url: "/assets/docs-flow-schema-2026-08.jpg",
    caption: "Tavnit Flow 的数据结构，元数据字段和表格字段并排定义。",
    width: 1327,
    height: 801,
  },
};

export default function FlowsZhHans() {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        Flows
      </h1>

      <DocCard icon={<Sparkles size={24} />} title="什么是 Flow">
        <Lead>
          Flow 是对一种文档类型的定义：你想提取的字段、告诉 AI
          去哪里找这些字段的提示，以及下游附加的一切。它是 Tavnit
          中把文档变成数据的对象——Collections、Subjects、Splitters 和 Cleaners
          的存在，都是为了给 Flow 输送文档或完善 Flow 的产出。
        </Lead>
        <p>
          不需要绘制模板，也不需要映射坐标。你用平实的语言描述字段，Flow
          就能适应各种版式，因此一个<em>供应商发票</em>Flow
          就能处理二十家发票样式完全不同的供应商。这也是为什么提取质量几乎完全取决于数据结构及其提示。
        </p>
        <Screenshot
          src="/assets/docs-flow-schema-2026-08.jpg"
          alt="名为 Invoice Processor 的 Tavnit Flow 的数据结构。元数据字段面板列出九个单值字段，例如 Invoice Number、Due Date 和 Total 及其数据类型；旁边的表格字段面板列出 Description、Quantity、Price 和 Amount。左侧边栏依次是最近的 Run、邮件触发、Collections、Cleaner、Agent、表单模板、邮件输出、Webhook、Bucket 导出、人工审核和 Flow ID。"
          caption="Flow 的数据结构。左侧是元数据字段，右侧是重复出现的表格字段，侧边栏中是可以附加到 Flow 上的一切。"
        />
        <InfoBox color="blue" icon={<Info size={20} />} title="只有数据结构是必需的">
          Flow 至少需要一个字段。侧边栏中的其他一切——Cleaner、Agent、webhook、邮件、Bucket
          导出、审核——都是可选的，可以之后再添加，无需重建任何内容。所有者和管理员可以创建和编辑 Flow。
        </InfoBox>
      </DocCard>

      <DocCard icon={<FilePlus size={24} />} title="创建 Flow">
        <Lead>
          在 Flows 页面上点击<strong>创建 Flow</strong>，Tavnit 会问你
          <em>“你想如何开始？”</em>。三条路径最终都会得到同样可编辑的 Flow，所以选择能最快得到一份好初稿的那条即可。
        </Lead>
        <DataTable
          head={["选项", "作用", "适用场景"]}
          rows={[
            [
              "使用模板",
              <Fragment key="c0">
                打开一个包含两个标签页的模板库。<strong>Tavnit 模板</strong>
                是已经填好字段和提示的现成 Flow；在<strong>我的 Flow</strong>
                中，你可以对自己的某个已启用 Flow 点击<strong>创建副本</strong>。
              </Fragment>,
              "你的文档是常见类型，或与你已有的某个 Flow 相近。",
            ],
            [
              "AI 建议",
              "上传一份示例 PDF 或图片。AI 会读取它、识别字段，并起草名称、描述以及带提示的数据结构。创建 Flow 之前，取消勾选不需要的字段，并可编辑任意字段。",
              "你的文档是你业务特有的，你希望快速起步。",
            ],
            [
              "从头开始",
              "一个空的数据结构。所有字段都由你自己定义。",
              "你清楚地知道自己需要什么，或者你正在重建现有流程。",
            ],
          ]}
        />
        <p>
          Tavnit
          模板涵盖发票、采购订单、收据、银行对账单、送货单、化验结果、合同、报价单、贷项通知单、身份证件和简历。如果你在设置组织时回答了欢迎问题，与你的文档匹配的模板会排在最前面，空白的
          Flows 页面还会提供<strong>创建这些 Flow</strong>，一键把它们全部创建出来。
        </p>
        <p>
          每条路径最后都需要填写名称（至少 3 个字符）和描述（至少 10 个字符）。Flow
          会在编辑器中打开，并附带一份简短的<em>“设置你的 Flow”</em>指南；它从一开始就是
          <strong>活跃</strong>状态——用顶栏中的开关可以停用它。未启用的 Flow 无法运行。
        </p>
        <InfoBox color="green" icon={<Info size={20} />} title="AI 建议不会创建 Run">
          用示例文档起草 Flow 不会创建 Run。把草稿当作起点——删掉你不会用到的字段，因为每多一个字段，就多一项需要审核、也多一处可能出错的地方。
        </InfoBox>
      </DocCard>

      <DocCard icon={<Table2 size={24} />} title="元数据字段和表格字段">
        <Lead>
          每个字段都属于两种类型之一，取决于该值是每份文档出现一次，还是每行出现一次。这是数据结构中影响最大的选择：它决定了你的
          webhook 载荷、Bucket 数据行、CSV 和审核界面的形态。
        </Lead>
        <DataTable
          head={["", "元数据字段", "表格字段"]}
          rows={[
            ["出现频率", "每份文档一次", "重复表格的每一行一次"],
            ["以发票为例", "发票号、开票日期、供应商、总额", "描述、数量、单价、金额"],
            [
              "在输出中",
              <Fragment key="f0">
                <InlineCode>metadata</InlineCode> 对象
              </Fragment>,
              <Fragment key="f1">
                <InlineCode>rows</InlineCode> 中每行一个条目
              </Fragment>,
            ],
            ["在 Bucket 中", "重复写入从该文档导出的每一行", "每个各占一行 Bucket 数据"],
          ]}
        />
        <InfoBox color="violet" icon={<Info size={20} />} title="选错字段种类是最典型的错误">
          把明细列定义为元数据字段，你只会从二十行的表格中得到一个值。把发票总额定义为表格字段，同一个数字会在每一行重复出现。如果拿不准，就问问自己：同一份文档上是否可能出现该值的第二份？
        </InfoBox>
        <p>
          <strong>只有元数据字段</strong>的 Flow——身份证件、证书、单页表单——每份文档会返回包含这些值的一行，因此结果仍会像其他
          Run 一样进入你的表格视图、Bucket、webhook 和邮件。
        </p>
        <p>
          Flow 还可以在输出的每一行上加上<strong>系统列</strong>——Flow ID、Flow 名称和 Run
          ID。当多个 Flow 写入同一个 <DocLink href="/docs/buckets">Bucket</DocLink>{" "}
          而你需要知道某一行来自哪份文档时，请开启它们。
        </p>
      </DocCard>

      <DocCard icon={<Type size={24} />} title="数据类型">
        <Lead>
          每个字段都带有一个类型。类型不只是外观：它决定了一个值能否正确排序、求和、在 Cleaner
          规则中比较以及制作图表。在 Flow 层面设置正确，可以在之后的每个阶段省去工作。
        </Lead>
        <DataTable
          head={["类型", "用于", "说明"]}
          rows={[
            ["文本", "名称、地址、描述、参考编码", "稳妥的默认选择。"],
            ["数字", "总额、数量、价格、费率", "如果之后要对该值求和、比较或制作图表，则必须使用。"],
            [
              "日期",
              "开票日期、到期日、交货日期",
              <Fragment key="f2">
                统一转换为一致的输出格式是 <DocLink href="/docs/cleaners">Cleaner</DocLink>{" "}
                的工作，而不是提取的工作。
              </Fragment>,
            ],
            [
              "混合/字母数字",
              "字母和数字混合的值——零件号、集装箱号、税号",
              "当前导零或字母必须保留时，请用它而不是数字。",
            ],
            [
              "图片",
              "文档中印有的图形：照片、标志、签名、印章",
              "提取后安全存储，然后以有时效的链接形式交付。",
            ],
          ]}
        />
        <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="按原样提取，之后再规范化">
          不要用类型来调整格式。按文档上显示的样子提取值，然后让 Cleaner
          去换算货币、改写日期、修正小数分隔符。如果提取时同时进行转换，一旦数字出错就更难排查。
        </InfoBox>
      </DocCard>

      <DocCard icon={<Crosshair size={24} />} title="提取提示">
        <Lead>
          提示让你无需编写模板就能消除字段的歧义。当一份文档包含多个看起来相似的值时——同一个表头区域里有三个日期、两个总额、一个订单号和一个发票号——提示最为重要。
        </Lead>
        <p>
          <strong>对于元数据字段</strong>，你可以任意组合以下提示：
        </p>
        <DataTable
          head={["提示", "告诉 AI 什么", "适用于"]}
          rows={[
            [
              "示例值",
              "从你的文档中复制的真实值。",
              "几乎所有情况。价值最高的单一提示——它一次性展示格式、长度和形态。",
            ],
            [
              "位于标签旁边",
              <Fragment key="f3">
                值旁边印刷的标签。列出各种变体：<em>Invoice Number、Invoice #、Inv No</em>。
              </Fragment>,
              "不同供应商标注方式各异的表头字段。",
            ],
            [
              "位于特定页面区域",
              "九个区域之一——从左上到右下。",
              "总是出现在同一角落的值，例如右上角的文档编号。",
            ],
            [
              "预期范围",
              "最小值、最大值，或两者兼有。作为参考，而不是硬性规则。",
              "发现小数点误读——本应是 270.30 的总额被读成了 27,030。",
            ],
            [
              "其他提示",
              "用自由文本说明以上选项未涵盖的任何内容。",
              "例如“使用净额，绝不用总额”这样的规则。",
            ],
          ]}
        />
        <p>
          <strong>对于表格字段</strong>，提示有所不同，因为 AI 要定位的是一列，而不是页面上的某一点：
        </p>
        <DataTable
          head={["提示", "告诉 AI 什么"]}
          rows={[
            [
              "来源类型",
              "“表格”用于带列的真正表格中的数据；“自由格式”用于非结构化文本（例如合同）中呈行状的值。",
            ],
            ["列标题", "按印刷原样填写的表头文字。列出供应商使用的每种变体，让一个字段能匹配所有变体。"],
            ["预期范围", "该列数字的合理范围。"],
            ["示例值", "来自你的文档的真实单元格值。"],
            ["附加信息", "当仅凭表头会产生歧义时，说明该列实际代表什么——“折扣前单价”。"],
          ]}
        />
        <InfoBox color="green" icon={<Info size={20} />} title="先不加提示">
          先添加字段，运行一份真实文档，只在结果出错的地方添加提示。一开始就给所有字段加提示，会把时间花在从未有歧义的字段上；而过度具体的提示可能会排除你没料到的版式，反而让提取变差。Flow
          有了几次 Run 之后，<strong>诊断</strong>可以为你提出提示建议。
        </InfoBox>
        <p>
          <strong>日期</strong>和<strong>图片</strong>字段不使用示例值，因此请把有关日期的说明写在“其他提示”框中。
        </p>
      </DocCard>

      <DocCard icon={<Puzzle size={24} />} title="组合字段">
        <Lead>
          有些表格列在一个单元格里包含多个值——例如印在同一个格子里的尺码与数量明细{" "}
          <em>S:2 M:5 L:3</em>
          。组合字段会把这个单元格拆分为子字段，让每个部分都成为独立的值，而不是一个你之后还得解析的字符串。
        </Lead>
        <NumberedList
          items={[
            "添加一个表格字段，并开启“组合字段”。",
            <Fragment key="f4">
              定义构成该单元格的子字段——例如文本类型的 <InlineCode>size</InlineCode> 和数字类型的{" "}
              <InlineCode>quantity</InlineCode>。
            </Fragment>,
            "添加示例值，展示这种组合在你的文档中是什么样子。",
          ]}
        />
        <p>
          子字段只保存单个值，因此可以是文本、数字、日期或混合/字母数字——但不能是图片。组合字段只能用于表格字段，因为它的意义就在于拆解重复出现的单元格。
        </p>
        <InfoBox color="blue" icon={<Boxes size={20} />} title="多值元数据字段">
          元数据字段的对应功能是<strong>接受多个值</strong>
          。当一份文档确实可能包含多个同类内容时——一组收据编号、多个采购订单参考号——请开启它，字段将返回一个列表而不是单个值。图片字段不支持此选项。
        </InfoBox>
      </DocCard>

      <DocCard icon={<ImageIcon size={24} />} title="提取图片">
        <Lead>
          图片字段从文档中提取的是图形而不是文字：产品照片、签名、印章、标志。元数据图片字段每份文档保存一张图片；表格图片字段为每一行提供属于该行的图片。
        </Lead>
        <BulletList
          items={[
            "图片以私有方式存储，因此传到下游时是有时效的链接，而不是原始字节",
            "webhook 载荷、邮件输出和 CSV 单元格中出现的都是同一类链接；从 Run 页面导出时会生成新的链接",
            "交付内容中的链接有效期为七天——请下载图片，而不是保存链接",
            "图片字段不能是组合字段，也不能接受多个值，示例值提示对它们不适用",
          ]}
        />
      </DocCard>

      <DocCard icon={<FilePlus size={24} />} title="构建数据结构">
        <Lead>
          先建元数据字段，再建表格字段，最后加提示。尽早用真实文档测试——纸面上看起来正确的数据结构，和经得起你实际单据考验的数据结构，是两回事。
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f5">
              点击<strong>创建 Flow</strong>，选择模板、AI 建议或空白 Flow。为它起一个描述文档的名称（
              <em>供应商发票</em>）并写一段真实的描述——它能提高提取准确度，也是之后{" "}
              <DocLink href="/docs/collections">Collection</DocLink> 进行匹配的依据。
            </Fragment>,
            <Fragment key="f6">
              在<strong>元数据字段</strong>下，为每份文档只出现一次的每个值点击
              <strong>添加字段</strong>，同时设置数据类型。
            </Fragment>,
            <Fragment key="f7">
              在<strong>表格字段</strong>下，为重复出现的明细表中的每一列添加一个字段。
            </Fragment>,
            <Fragment key="f8">
              只为需要的字段添加<strong>提取提示</strong>。
            </Fragment>,
            <Fragment key="f9">
              Flow 已经是<strong>活跃</strong>状态。点击<strong>运行</strong>
              ，处理一份真实文档，并将结果与源文档进行对比。
            </Fragment>,
          ]}
        />
        <p>拖动字段的手柄即可调整顺序。</p>
        <WarningBox>
          重命名字段会改变每个下游使用方中的键：webhook 载荷、Bucket 列映射、CSV
          表头，以及任何读取该字段的 <DocLink href="/docs/cleaners">Cleaner</DocLink>。在已经运行中的
          Flow 上重命名字段之前，请先检查都附加了哪些内容。
        </WarningBox>
      </DocCard>

      <DocCard icon={<FileInput size={24} />} title="Flow 能读取哪些文件">
        <Lead>
          Flow 通过所有途径——上传、邮件和 API——接受 PDF、图片和电子表格。Tavnit
          会决定如何读取每个文件，因此你无需针对格式做任何配置。
        </Lead>
        <DataTable
          head={["文件", "格式", "读取方式"]}
          rows={[
            ["PDF", "PDF", "数字 PDF 直接读取。扫描版 PDF 会被自动识别，并先通过 OCR 读取。"],
            [
              "图片",
              "PNG、JPG、JPEG、JFIF",
              "像扫描页一样读取。JFIF 是某些 Windows 浏览器默认保存的 JPEG 变体，处理方式与普通 JPEG 相同。",
            ],
            [
              "电子表格",
              "XLSX、XLS、CSV",
              "读取第一个可见的工作表。其他工作表和隐藏的工作表会被忽略，因此请把需要的数据放在第一个工作表上。",
            ],
          ]}
        />
        <p>
          过大的工作表会被拒绝，并给出明确的错误提示。如果要把工作簿的每个工作表作为单独的文档处理，请改为通过{" "}
          <DocLink href="/docs/splitters">Splitter</DocLink> 发送。
        </p>
        <InfoBox color="blue" icon={<Info size={20} />} title="劣质扫描：对提取效果差的文件强制使用 OCR">
          扫描文档已经会自动使用 OCR。有些文件看起来是数字文件，却带有损坏的文字层——内嵌转录很差的扫描件、由不常见的工具导出的
          PDF。对于这类文件，请在 Flow 的设置中打开<strong>劣质扫描</strong>并开启它：此后该 Flow
          中的每个文件都会先通过 OCR 读取，提取基于识别出的文字进行。如果 OCR
          不可用或失败，Run 会自动回退到标准处理流程。
        </InfoBox>
      </DocCard>

      <DocCard icon={<Braces size={24} />} title="可以附加到 Flow 上的内容">
        <Lead>
          数据结构决定产出什么；Flow 的其余部分决定产出之后发生什么。下面每一项都是独立的——只附加你需要的，顺序和时间都不限。
        </Lead>
        <DataTable
          head={["阶段", "附加项", "作用"]}
          rows={[
            [
              "输入",
              <Fragment key="f10">
                <DocLink href="/docs/email-integration">邮件触发</DocLink>
              </Fragment>,
              "为 Flow 提供专属收件箱地址，转发来的文档（PDF、图片或电子表格）会被自动处理。",
            ],
            [
              "输入",
              <Fragment key="f11">
                <DocLink href="/docs/collections">Collections</DocLink>
              </Fragment>,
              "列出可以把文档路由到此 Flow 的 Collections。",
            ],
            [
              "处理",
              <Fragment key="f12">
                <DocLink href="/docs/cleaners">Cleaner</DocLink>
              </Fragment>,
              "清洗每个 Run 的数据行：调整格式、转换、计算、查找，并触发规则。",
            ],
            [
              "处理",
              <Fragment key="f13">
                <DocLink href="/docs/agents">Agent</DocLink>
              </Fragment>,
              "在提取之后运行，以提取出的字段作为输入。",
            ],
            ["处理", "表单模板", "用 Run 提取出的值填写 PDF 模板。"],
            [
              "输出",
              <Fragment key="f14">
                <DocLink href="/docs/email-integration">邮件输出</DocLink>
              </Fragment>,
              "每次成功运行后把结果通过邮件发送到一个或多个地址，可选择附上 JSON、CSV、已填写的表单和原始文档。",
            ],
            [
              "输出",
              <Fragment key="f15">
                <DocLink href="/docs/webhooks">Webhook</DocLink>
              </Fragment>,
              "把结果 POST 到你的端点。仅支持 HTTPS。",
            ],
            [
              "输出",
              <Fragment key="f16">
                <DocLink href="/docs/buckets">Bucket 导出</DocLink>
              </Fragment>,
              "把每个 Run 的数据行追加到结构化表格中，字段映射到列。",
            ],
            [
              "设置",
              <Fragment key="f17">
                <DocLink href="/docs/human-in-the-loop">人工审核</DocLink>
              </Fragment>,
              "在交付任何内容之前暂停 Run，等待审核者处理。",
            ],
            ["设置", "劣质扫描", "对 Flow 中的每个文件强制使用 OCR（见上文）。"],
            [
              "设置",
              "Flow ID",
              <Fragment key="f18">
                调用 <DocLink href="/docs/api-integration">API</DocLink> 时传入的标识符。
              </Fragment>,
            ],
          ]}
        />
        <p>
          <strong>邮件触发选项。</strong>开启触发后，面板会显示 Flow 的收件箱地址和两项设置。
          <strong>允许的发件人</strong>限制谁可以通过邮件启动 Run；留空则接受任何发件人。
          <strong>处理邮件正文</strong>还会从邮件正文本身提取，可选<em>仅在没有附件时</em>
          （默认值，这样附言永远不会启动第二个 Run）或<em>始终</em>。发件人地址会记录在每个 Run
          上，并显示在 Runs 页面中。<DocLink href="/docs/email-integration">邮件集成</DocLink>{" "}
          一文介绍了详细信息。
        </p>
      </DocCard>

      <DocCard icon={<HeartPulse size={24} />} title="诊断 Flow">
        <Lead>
          当 Flow 处理过一些文档后，Flow 顶栏中的<strong>诊断</strong>按钮会打开
          <strong>Flow 医生</strong>。它会研究你最近已完成的 Run，找出总是返回空值或类型错误的字段，并提出修正建议。
        </Lead>
        <NumberedList
          items={[
            <Fragment key="d0">
              打开 Flow 并点击<strong>诊断</strong>。当 Flow 至少有一个字段时，所有者和管理员就能看到这个按钮。
            </Fragment>,
            "Tavnit 会读取最近的 Run，重新读取几份字段出错的文档，并起草修正方案。这需要一点时间。",
            <Fragment key="d1">
              查看结果。每个有问题的字段都会显示它为空或类型错误的频率，并把<strong>当前</strong>
              提示与<strong>建议</strong>提示并列显示。它还可能提供一份<strong>建议的描述</strong>。
            </Fragment>,
            <Fragment key="d2">
              保留或编辑你认可的修正，然后点击<strong>应用</strong>
              。在你应用之前什么都不会改变；关闭面板会丢弃这些建议。
            </Fragment>,
          ]}
        />
        <p>
          如果一切正常，你会看到<em>“提取状况良好”</em>
          。诊断只在你点击时运行。应用修正后，请重新运行一份真实文档，确认修正确实有效。
        </p>
      </DocCard>

      <div id="runs" className="scroll-mt-24">
        <DocCard icon={<Play size={24} />} title="Runs：处理文档时会发生什么">
          <Lead>
            每份文档都会成为一个 Run，每个 Run 都经历相同的顺序。了解这个顺序，就知道当某些内容来晚了、来错了或根本没来时该去哪里查看。
          </Lead>
          <NumberedList
            items={[
              "文档被存储，Run 进入队列。",
              "提取读取文档，生成元数据值和表格数据行。",
              "如果附加了 Cleaner，它会清洗这些数据行——转换、计算列、查找。",
              "条件规则触发：可以删除数据行、发送通知、请求审核。",
              "如果需要审核，Run 会暂停，在审核者批准之前不会交付任何内容。",
              "执行输出：邮件、Bucket 导出和 webhook。随后 Run 被标记为已完成，如有关联的 Agent，它会开始运行。",
            ]}
          />
          <DataTable
            head={["Run 状态", "含义"]}
            rows={[
              ["待处理（排队中）", "已存储，等待工作进程处理。"],
              ["处理中", "正在提取、清洗或交付。Run 页面会显示当前阶段。"],
              ["正在重试", "上一次尝试因临时原因失败，Run 已自动重新排队（见下文）。"],
              [
                "等待 HITL 审核",
                <Fragment key="f19">
                  已暂停，等待<DocLink href="/docs/human-in-the-loop">人工审核</DocLink>
                  。尚未交付任何内容。
                </Fragment>,
              ],
              ["已完成", "提取已结束，所有已配置的输出都已执行。"],
              ["已取消", "有人在 Run 排队或处理期间取消了它，或审核者拒绝了它。不会再交付任何内容。"],
              ["失败", "文档无法处理。Run 的日志会说明原因。"],
            ]}
          />
        </DocCard>
      </div>

      <DocCard icon={<History size={24} />} title="使用 Runs">
        <Lead>
          <strong>Runs</strong> 页面列出你组织中的每个 Run；每个 Flow 也有自己的
          <strong>最近的 Run</strong>标签页。使用<strong>筛选</strong>可按状态、日期范围、Flow、用户、来源或粘贴的
          Run ID 缩小范围。
        </Lead>
        <DataTable
          head={["操作", "位置", "说明"]}
          rows={[
            ["查看详情", "Run 操作菜单，或点击该行", "源文件旁的提取数据、Run 信息和处理日志。"],
            ["下载 CSV", "Run 操作菜单", "仅限已完成的 Run。Run 页面上也有“导出 CSV”和“导出 JSON”。"],
            [
              "下载文件",
              "Run 操作菜单，或 Run 页面上的“下载”",
              "原始源文件。电子表格无法在页面内预览，请下载后查看。",
            ],
            ["取消 Run", "Run 操作菜单", "仅适用于仍在排队或运行中的 Run。"],
          ]}
        />
        <p>
          <strong>触发者</strong>列显示是谁启动了 Run——上传时是用户，通过邮件到达的 Run
          则是发件人地址。<strong>来源</strong>列说明它是如何到达的：手动上传、API、邮件等。
        </p>
      </DocCard>

      <DocCard icon={<RotateCcw size={24} />} title="失败的 Run 与自动重试">
        <Lead>
          大多数失败是文档本身的问题——文件无法读取或类型不受支持——重试也无济于事。但也有少数不是：处理工作进程在运行中途重启，或
          AI 服务商出现临时故障。对于这类情况，组织可以让 Tavnit 自动重试。
        </Lead>
        <NumberedList
          items={[
            <Fragment key="r0">
              前往<strong>设置</strong> → <strong>组织</strong> → <strong>失败的 Run</strong>
              。只有所有者能看到这个标签页。
            </Fragment>,
            <Fragment key="r1">
              开启<strong>自动重试失败的 Run</strong>。
            </Fragment>,
            <Fragment key="r2">
              将<strong>每个 Run 的最大重试次数</strong>设为 1、2 或 3。
            </Fragment>,
          ]}
        />
        <BulletList
          items={[
            "重试的 Run 保持相同的 Run ID，因此 API 轮询、webhook 和链接都能继续正常工作。",
            "输出只在 Run 完成时触发，因此重试绝不会把同一份文档交付两次。",
            "永不重试：无效文件、不受支持的类型、已取消的 Run、因审核而暂停的 Run，以及创建超过一天的 Run。",
            "因工作进程重启而丢失的 Run 会被自动检测到。开启自动重试时，它会重新排队；关闭时，它会被标记为失败。",
            "Run 页面会列出“之前的尝试”，每次尝试都标记为“工作进程丢失”或“失败”并附带错误信息；Runs 列表会显示重试标记。",
          ]}
        />
        <p>
          如果想在 Run 最终失败时收到通知，请在同一标签页的<strong>Run 失败通知</strong>下添加邮件地址。
        </p>
      </DocCard>

      <DocCard icon={<LifeBuoy size={24} />} title="提升提取质量">
        <Lead>
          当某个字段返回错误时，修正方法几乎总是在该字段的定义里，而不在文档里。如果 Flow 已经有
          Run，先从<strong>诊断</strong>开始，然后逐项排查下表——前两项能解决大多数情况。
        </Lead>
        <DataTable
          head={["症状", "可能原因", "解决方法"]}
          rows={[
            ["在几个相似的值中取错了一个", "没有任何信息能区分它们。", "添加值旁边的标签，或它所在的页面区域。"],
            ["字段返回空值", "仅凭字段名称无法识别它。", "添加两三个真实的示例值——通常单靠这一点就够了。"],
            ["有很多明细行，却只得到一行", "它被定义成了元数据字段。", "把它重新定义为表格字段。"],
            ["同一个值在每一行重复出现", "文档级的值被定义成了表格字段。", "把它重新定义为元数据字段。"],
            ["数字相差一百倍", "小数分隔符和千位分隔符被读反了。", "设置预期范围，并在 Cleaner 中规范化格式。"],
            ["前导零或字母丢失", "字段类型被设为数字。", "改为混合/字母数字。"],
            ["列与列之间互相混淆", "两列的表头相似。", "添加印刷的列标题，并在“附加信息”中描述该列。"],
            ["对某些供应商效果好，对另一些效果差", "提示只描述了一家供应商的版式。", "在同一个字段中添加其他供应商的标签和表头变体。"],
            ["看起来是数字文件，提取出的文字却是乱码", "PDF 内嵌的文字层已损坏。", "开启“劣质扫描”，让 Flow 用 OCR 读取它。"],
            [
              "电子表格返回空值或不完整",
              "数据不在第一个可见的工作表上。",
              "把数据移到第一个工作表，或对多工作表的工作簿使用 Splitter。",
            ],
          ]}
        />
        <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="一次只改一处">
          每次修改后都用同一份文档重新运行。一次修改四个提示再重新运行，只能告诉你结果变好了，却不知道是哪一处改动起了作用——而且四处中可能有一处让情况变得更糟。
        </InfoBox>
        <InfoBox color="blue" icon={<Wand2 size={20} />} title="修正数据，而不是提取">
          如果值是对的但格式不对——日期、货币、单位、大小写——请不要改动 Flow，而是添加一个{" "}
          <DocLink href="/docs/cleaners">Cleaner</DocLink>。
        </InfoBox>
      </DocCard>

      <Related
        links={[
          {
            href: "/docs/cleaners",
            label: "规范化并丰富 Flow 提取的内容",
            description: "改写日期格式、换算货币、计算总额，并标记违反规则的数据行。",
          },
          {
            href: "/docs/email-integration",
            label: "通过邮件把文档发送到 Flow",
            description: "收件箱地址、允许的发件人、邮件正文处理和邮件输出。",
          },
          {
            href: "/docs/collections",
            label: "自动把文档路由到正确的 Flow",
            description: "为什么 Flow 的名称和描述不只关乎提取准确度。",
          },
          {
            href: "/docs/api-integration",
            label: "从你自己的代码中触发 Flow",
            description: "Flow ID、API 密钥认证，以及 Python 和 JavaScript 示例。",
          },
          {
            href: "/docs/webhooks",
            label: "查看 Flow 产出的载荷",
            description: "元数据字段和表格字段在你的端点收到的 JSON 中是什么样子。",
          },
        ]}
      />
    </section>
  );
}
