import { Fragment } from "react";
import {
  Clock,
  Compass,
  FilePlus,
  FlaskConical,
  Info,
  Map,
  Rocket,
  Sparkles,
  Table2,
} from "lucide-react";
import {
  BulletList,
  DataTable,
  DocCard,
  DocLink,
  InfoBox,
  Lead,
  NumberedList,
  Related,
  Screenshot,
} from "@/components/docs/ui";
import type { DocsPageSchemaData } from "../types";

/** /zh-Hans/docs — translated from src/app/docs/page.tsx. */

/** Mirrors the visible numbered steps under "第 1 步：创建 Flow". */
export const schema: DocsPageSchemaData = {
  howTo: {
    name: "用 Tavnit 从文档中提取结构化数据",
    description:
      "从模板、示例文档或从头创建一个 Tavnit Flow，检查它的字段，处理一份文档并查看结构化结果——无需绘制模板，也无需编写代码。",
    steps: [
      {
        name: "打开创建对话框",
        text: "在 Flows 页面上，点击“创建 Flow”。",
      },
      {
        name: "选择起点",
        text: "选择“使用模板”（Tavnit 模板，或你自己某个 Flow 的副本）、“AI 建议”（上传一份示例 PDF 或图片，由 AI 起草字段）或“从头开始”。",
      },
      {
        name: "为 Flow 命名并填写描述",
        text: "为 Flow 起一个至少 3 个字符的名称，并写一段至少 10 个字符的描述，说明它处理哪些文档。",
      },
      {
        name: "检查数据结构",
        text: "在编辑器中添加、编辑或删除字段，直到数据结构完全符合你的需要。新建的 Flow 已经是“活跃”状态。",
      },
      {
        name: "处理一份文档",
        text: "点击“运行”，上传一份真实文档并检查结果。",
      },
    ],
  },
  primaryImage: {
    url: "/assets/tour2-runs.jpg",
    caption: "Tavnit 的 Runs 页面，列出每份已处理的文档及其 Flow、来源和状态。",
    width: 1327,
    height: 801,
  },
};

export default function GettingStartedZhHans() {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        快速入门
      </h1>

      <DocCard icon={<Sparkles size={24} />} title="Tavnit 能做什么">
        <Lead>
          Tavnit 读取文档并返回结构化数据。你只需描述一次想要的字段，然后把发票、收据、采购订单、对账单、电子表格或表单发给它，就能得到带类型的数据行——无需为每种版式制作模板，也无需编写任何解析代码。
        </Lead>
        <p>
          提取是起点，而不是产品的全部。围绕提取，Tavnit
          可以对传入的文件进行分类和拆分，清洗并丰富数据行，对文档进行相互比对和检查，填写表单，暂停等待人工审核，将结果存入表格，交付到你的系统，并交给在网页上执行操作的浏览器
          Agent。本页为你提供全景图，并带你处理第一份文档。
        </p>
        <InfoBox color="violet" icon={<FlaskConical size={20} />} title="部分功能处于 Beta 阶段">
          Pipelines、Subjects、Matchers、Inspectors、Fillers、Signals 和 Nets 在应用中带有{" "}
          <strong>Beta</strong> 标签。你现在就可以使用它们，但其界面和选项仍可能变化。
        </InfoBox>
      </DocCard>

      <DocCard icon={<Compass size={24} />} title="Tavnit 全景图">
        <Lead>
          应用的侧边栏按各功能承担的工作进行分组，从接收文档一直到根据数据采取行动。文档采用相同的分组，因此这张表同时也是目录。
        </Lead>
        <DataTable
          head={["分组", "功能", "作用"]}
          rows={[
            [
              "输入",
              <Fragment key="m0">
                <DocLink href="/docs/collections">Collections</DocLink>
              </Fragment>,
              "为混合文档提供一个收件箱或端点：每份文档都会被分类并路由到正确的 Flow。",
            ],
            [
              "输入",
              <Fragment key="m1">
                <DocLink href="/docs/subjects">Subjects</DocLink>
              </Fragment>,
              "为采购或患者等实体建模，并按参考号把它的文档归入案例。",
            ],
            [
              "输入",
              <Fragment key="m2">
                <DocLink href="/docs/splitters">Splitters</DocLink>
              </Fragment>,
              "把包含多份文档的一个文件切分成独立的文档，并将每份文档继续发送下去。",
            ],
            [
              "处理",
              <Fragment key="m3">
                <DocLink href="/docs/flows">Flows</DocLink>
              </Fragment>,
              "一种文档类型的数据结构：要提取的字段以及附加在它们上的一切。一切都从这里开始。",
            ],
            [
              "处理",
              <Fragment key="m4">
                <DocLink href="/docs/cleaners">Cleaners</DocLink>
              </Fragment>,
              "对提取出的数据行进行格式调整、转换、计算、查找和校验，并在发现异常时触发操作。",
            ],
            [
              "处理",
              <Fragment key="m5">
                <DocLink href="/docs/agents">Agents</DocLink>
              </Fragment>,
              "在网站上执行自然语言任务的浏览器 Agent，常以提取出的数据作为输入。",
            ],
            [
              "智能",
              <Fragment key="m6">
                <DocLink href="/docs/matchers">Matchers</DocLink>
              </Fragment>,
              "跨文档逐行比对记录——报价单之间互相比较，发票与其订单比较。",
            ],
            [
              "智能",
              <Fragment key="m7">
                <DocLink href="/docs/inspectors">Inspectors</DocLink>
              </Fragment>,
              "对一组相关文档运行检查清单，得到通过或不通过的结论。",
            ],
            [
              "智能",
              <Fragment key="m8">
                <DocLink href="/docs/fillers">Fillers</DocLink>
              </Fragment>,
              "用从文档中提取的数据填写 PDF 表单模板。",
            ],
            [
              "编排",
              <Fragment key="m9">
                <DocLink href="/docs/pipelines">Pipelines</DocLink>
              </Fragment>,
              "在可视化画布上把各个步骤首尾相连。",
            ],
            [
              "编排",
              <Fragment key="m10">
                <DocLink href="/docs/pipeline-map">Pipeline 地图</DocLink>
              </Fragment>,
              "用一张图展示文档如何在你的组织中流转。",
            ],
            [
              "数据与活动",
              <Fragment key="m11">
                <DocLink href="/docs/buckets">Buckets</DocLink>
              </Fragment>,
              "跨多个 Run 累积结果的表格，可随时查询、制作图表和导出。",
            ],
            [
              "数据与活动",
              <Fragment key="m12">
                <DocLink href="/docs/flows#runs">Runs</DocLink>
              </Fragment>,
              "每份已处理文档的历史记录，包括结果、源文件和日志。",
            ],
            [
              "数据与活动",
              <Fragment key="m13">
                <DocLink href="/docs/human-in-the-loop">人工审核</DocLink>
              </Fragment>,
              "审核队列：在结果交付之前，由人来批准、编辑或拒绝。",
            ],
            [
              "音频",
              <Fragment key="m14">
                <DocLink href="/docs/signals">Signals</DocLink>
              </Fragment>,
              "把录制的对话转换为结构化数据行。",
            ],
            [
              "社交",
              <Fragment key="m15">
                <DocLink href="/docs/nets">Nets</DocLink>
              </Fragment>,
              "把社交媒体帖子转换为结构化数据行和趋势。",
            ],
          ]}
        />
        <InfoBox color="blue" icon={<Info size={20} />} title="看不到 Agents、Signals 或 Nets？">
          这三个功能按组织单独开通。如果你的侧边栏中没有它们，请联系 Tavnit 团队为你启用。
        </InfoBox>
        <InfoBox color="violet" icon={<Info size={20} />} title="该用哪个来分拣我的文档？">
          如果每个文件只包含一份文档，但你不知道它的类型，请使用{" "}
          <DocLink href="/docs/collections">Collection</DocLink>。如果一个文件包含多份文档，请使用{" "}
          <DocLink href="/docs/splitters">Splitter</DocLink>
          。如果多份文档属于同一事项——同一笔采购、同一位患者——请使用{" "}
          <DocLink href="/docs/subjects">Subject</DocLink>
          。如果你已经知道文档是什么，就直接把它发送到 Flow，三者都不需要。
        </InfoBox>
      </DocCard>

      <DocCard icon={<Rocket size={24} />} title="最初的几分钟">
        <Lead>新组织会从一条简短的设置路径开始，所以你很少会面对空白页面。</Lead>
        <BulletList
          items={[
            <Fragment key="o0">
              <strong>欢迎问题。</strong>
              创建组织后，Tavnit
              会问你四个简短的问题：你要处理哪些文档，想达成什么目标，文档目前通过什么方式到达，以及每月大约处理多少份。回答大约需要
              30 秒，你也可以选择<strong>跳过</strong>。
            </Fragment>,
            <Fragment key="o1">
              <strong>一键创建入门 Flow。</strong>如果你回答了这些问题，空白的 Flows 页面会在{" "}
              <em>“根据你的回答，我们可以为你设置以下内容：”</em>下方列出与你的文档匹配的模板。点击{" "}
              <strong>创建这些 Flow</strong>，它们就会为你创建好，随时可以编辑。
            </Fragment>,
            <Fragment key="o2">
              <strong>入门模板。</strong>
              Tavnit
              提供现成的 Flow，涵盖发票、采购订单、收据、银行对账单、送货单、化验结果、合同、报价单、贷项通知单、身份证件和简历。与你的回答匹配的模板会排在最前面。
            </Fragment>,
            <Fragment key="o3">
              <strong>入门指南。</strong>应用角落里的一个小面板，包含三个标签页：
              <strong>清单</strong>（设置步骤，完成后会自动打勾）、<strong>当前页面</strong>
              （针对你所在页面的提示）和<strong>功能</strong>（你可以使用的所有功能）。如果你隐藏了它，可以从
              <strong>帮助与支持</strong>菜单重新打开。
            </Fragment>,
          ]}
        />
      </DocCard>

      <DocCard icon={<FilePlus size={24} />} title="第 1 步：创建 Flow">
        <Lead>
          Flow 是一种文档类型的数据结构。请按文档而不是项目来命名——用<em>供应商发票</em>，而不是
          <em>第一季度自动化</em>——因为 Collection 也是依据名称和描述把文档路由给它的。
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f5">
              在 <strong>Flows</strong> 页面上，点击<strong>创建 Flow</strong>。
            </Fragment>,
            <Fragment key="f6">
              选择起点：<strong>使用模板</strong>（Tavnit 模板，或<strong>我的 Flow</strong>
              下你自己某个 Flow 的副本）、<strong>AI 建议</strong>（上传一份示例 PDF 或图片，由 AI
              起草字段）或<strong>从头开始</strong>。
            </Fragment>,
            <Fragment key="f7">
              为 Flow 起一个至少 3 个字符的名称，并写一段至少 10 个字符的描述，说明它处理哪些文档。
            </Fragment>,
            <Fragment key="f8">
              在编辑器中添加、编辑或删除字段，直到数据结构完全符合你的需要。新建的 Flow 已经是
              <strong>活跃</strong>状态。
            </Fragment>,
            <Fragment key="f9">
              点击<strong>运行</strong>，上传一份真实文档并检查结果。
            </Fragment>,
          ]}
        />
        <p>
          <DocLink href="/docs/flows">Flows</DocLink>{" "}
          一文会深入讲解上述每个步骤——字段种类、数据类型、告诉 AI 去哪里找的提示，以及当 Flow
          有了真实 Run 后会提出修复建议的<strong>诊断</strong>按钮。
        </p>
        <InfoBox color="blue" icon={<Info size={20} />} title="描述很重要">
          描述是必填项，而且它有双重作用：它帮助 AI 更准确地提取，也是{" "}
          <DocLink href="/docs/collections">Collection</DocLink>{" "}
          能把文档路由到该 Flow 的依据。描述含糊，两方面都会变差。
        </InfoBox>
      </DocCard>

      <DocCard icon={<Table2 size={24} />} title="第 2 步：元数据字段和表格字段">
        <Lead>
          Tavnit
          会区分每份文档只出现一次的值和重复出现的值。这一个区分决定了后续一切的形态——你的 webhook
          载荷、Bucket 数据行和 CSV 都遵循它。
        </Lead>
        <DataTable
          head={["字段种类", "出现频率", "以发票为例"]}
          rows={[
            ["元数据字段", "每份文档一次", "发票号、开票日期、供应商、总额"],
            ["表格字段", "每个明细行一次", "描述、数量、单价、金额"],
          ]}
        />
        <p>
          每个字段还有一个数据类型——文本、数字、日期、混合/字母数字或图片——选对类型比看上去更重要：被设为文本类型的总额无法求和、比较或制作图表。只有元数据字段的
          Flow 每份文档只返回一行。<DocLink href="/docs/flows">Flows</DocLink>{" "}
          一文涵盖完整的数据结构，包括提取提示、组合字段，以及如何修正返回错误的字段。
        </p>
      </DocCard>

      <DocCard icon={<Clock size={24} />} title="第 3 步：发送文档">
        <Lead>
          有四种接收方式，产生的都是同一种 Run。先用手动上传证明 Flow
          可以正常工作，再切换到与文档实际到达方式相匹配的途径。
        </Lead>
        <DataTable
          head={["途径", "适用于", "设置"]}
          rows={[
            ["在应用中上传", "测试和一次性文档", "无需设置。可一次选择多个文件，每个文件各成为一个 Run"],
            [
              <Fragment key="f10">
                <DocLink href="/docs/email-integration">邮件</DocLink>
              </Fragment>,
              "已经发到某个收件箱的文档",
              "开启 Flow 的邮件触发，把邮件转发到它的地址",
            ],
            [
              <Fragment key="f11">
                <DocLink href="/docs/api-integration">REST API</DocLink>
              </Fragment>,
              "你自己的系统，以及大批量处理",
              "一个 API 密钥和一个 POST 请求",
            ],
            [
              <Fragment key="f12">
                <DocLink href="/docs/mcp-connector">MCP 连接器</DocLink>
              </Fragment>,
              "在 AI 助手中临时处理工作",
              "按组织申请开通，然后在“集成”中获取连接器 URL",
            ],
          ]}
        />
        <p>
          Flow 接受 PDF、图片（PNG、JPG、JPEG 和 JFIF）以及电子表格（XLSX、XLS 和
          CSV）。对于电子表格，Flow 读取第一个可见的工作表。扫描文档会被自动识别并通过 OCR 读取。
        </p>
        <Screenshot
          src="/assets/tour2-runs.jpg"
          alt="Tavnit 的 Runs 页面，列出已处理的文档，每份文档都显示其 Flow、触发人、来源和状态，上方是已完成 Run、运行中 Run 和 Run 总数的汇总卡片。"
          caption="每份文档都会成为一个 Run。Runs 页面显示处理了什么、通过什么方式到达，以及最终结果如何。"
        />
        <p>
          打开任意 Run，即可在源文档旁边看到提取出的字段，以及处理过程的日志。当结果不符合预期时，首先应该查看的就是这份日志。
        </p>
      </DocCard>

      <DocCard icon={<Map size={24} />} title="下一步去哪里">
        <Lead>提取正常工作后，下一步取决于数据有什么问题，或者你需要用它做什么。</Lead>
        <DataTable
          head={["如果你需要……", "请阅读"]}
          rows={[
            [
              "提取更多字段，或修正返回错误的字段",
              <Fragment key="f17">
                <DocLink href="/docs/flows">Flows</DocLink>
              </Fragment>,
            ],
            [
              "修正格式、换算货币、计算总额或标记有问题的数据行",
              <Fragment key="f18">
                <DocLink href="/docs/cleaners">Cleaners</DocLink>
              </Fragment>,
            ],
            [
              "在结果发往任何地方之前让人先检查",
              <Fragment key="f19">
                <DocLink href="/docs/human-in-the-loop">人工审核</DocLink>
              </Fragment>,
            ],
            [
              "把数据送进你自己的系统",
              <Fragment key="f20">
                <DocLink href="/docs/webhooks">Webhooks</DocLink> 或{" "}
                <DocLink href="/docs/api-integration">REST API</DocLink>
              </Fragment>,
            ],
            [
              "把结果集中保存并进行查询",
              <Fragment key="f21">
                <DocLink href="/docs/buckets">Buckets</DocLink>
              </Fragment>,
            ],
            [
              "比较文档，或按一组规则检查文档",
              <Fragment key="f24">
                <DocLink href="/docs/matchers">Matchers</DocLink> 和{" "}
                <DocLink href="/docs/inspectors">Inspectors</DocLink>
              </Fragment>,
            ],
            [
              "把多个步骤连接成一个流程",
              <Fragment key="f25">
                <DocLink href="/docs/pipelines">Pipelines</DocLink>
              </Fragment>,
            ],
            [
              "在网上的其他地方根据数据采取行动",
              <Fragment key="f22">
                <DocLink href="/docs/agents">Agents</DocLink>
              </Fragment>,
            ],
            [
              "控制谁可以查看和修改哪些内容",
              <Fragment key="f23">
                <DocLink href="/docs/user-roles">用户角色</DocLink>
              </Fragment>,
            ],
          ]}
        />
      </DocCard>

      <Related
        links={[
          {
            href: "/docs/flows",
            label: "深入构建 Flow 的数据结构",
            description: "字段种类、数据类型、提取提示、组合字段、Runs，以及可以附加到 Flow 上的一切。",
          },
          {
            href: "/docs/api-integration",
            label: "用 Tavnit REST API 处理文档",
            description: "Multipart 和 base64 上传、API 密钥认证、Python 和 JavaScript 示例，以及无代码方案。",
          },
          {
            href: "/docs/email-integration",
            label: "从邮件附件中提取",
            description: "为 Flow 配备专属收件箱，并把文档转发给它。",
          },
          {
            href: "/docs/pipeline-map",
            label: "查看一切如何连接",
            description: "你的 Flows、Collections、Splitters、Cleaners 和 Buckets 的实时地图。",
          },
        ]}
      />
    </section>
  );
}
