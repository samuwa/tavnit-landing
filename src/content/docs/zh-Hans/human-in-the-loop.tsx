import { Fragment } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  HelpCircle,
  Inbox,
  Info,
  Layers,
  PenLine,
  Settings2,
  Shield,
  SplitSquareHorizontal,
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
  WarningBox,
} from "@/components/docs/ui";
import type { DocsPageSchemaData } from "../types";

/**
 * /zh-Hans/docs/human-in-the-loop — translated from
 * src/app/docs/human-in-the-loop/page.tsx. The app calls the area "人工审核"
 * in Simplified Chinese; HITL stays as in the app's labels.
 */

/** Mirrors the visible numbered steps under "为 Flow 开启审核". */
export const schema: DocsPageSchemaData = {
  howTo: {
    name: "为 Tavnit Flow 添加人工审核步骤",
    description:
      "在 Flow 上启用人工审核并指派审核者，让每个 Run 在结果交付到下游之前先暂停等待批准。",
    steps: [
      {
        name: "打开 Flow 的“人工审核”面板",
        text: "在 Tavnit 应用中前往 Flows，打开该 Flow，并在它的侧边栏中选择“人工审核”面板。",
      },
      {
        name: "开启审核",
        text: "打开“人工审核”开关。从此刻起，该 Flow 的新 Run 会暂停，而不是交付结果。",
      },
      {
        name: "指派审核者",
        text: "在“审核者”下选择组织中的一名或多名成员。只有被指派的审核者才能批准或拒绝该 Flow 暂停的 Run。",
      },
      {
        name: "处理一份文档并查看队列",
        text: "处理一份文档。它应以“待审核”状态出现在每位被指派审核者的“人工审核”队列中。",
      },
    ],
  },
  primaryImage: {
    url: "/assets/docs-hitl-review-2026-08.jpg",
    caption: "Tavnit 的人工审核界面：源文档旁边是可编辑的数据表格，并提供“批准”和“拒绝”操作。",
    width: 1327,
    height: 801,
  },
};

export default function HumanInTheLoopZhHans() {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        人工审核（Human in the Loop）
      </h1>

      <DocCard icon={<ClipboardCheck size={24} />} title="人工审核的作用">
        <Lead>
          人工审核在提取和交付之间设置了一个审核检查点。需要审核的 Run 会在提取和清洗之后停下，状态为
          <strong>待批准</strong>：在指定的审核者批准之前，不会发送邮件，不会触发 webhook，不会写入
          Bucket 数据行，关联的 Agent 也不会启动。
        </Lead>
        <p>
          关键在于<em>之前</em>。审核不是在错误数据已经进入你的 ERP
          之后才做的更正；此时交付步骤还没有执行。审核者批准后，Run 会从暂停的确切位置继续，并带上他们所做的修改。
        </p>
        <BulletList
          items={[
            "在流向下游之前必须核实的高价值数据",
            "需要有书面记录的人工审批步骤的合规要求",
            "提取通常正确、但偶尔出错代价高昂的文档",
            "只有人才能提供的值，例如内部成本中心或审批代码",
            "新供应商或新格式，直到你信任这个 Flow 为止",
          ]}
        />
        <p>
          Flow 的 Run 是主要场景，但同一个队列还会收集暂停的{" "}
          <DocLink href="/docs/matchers">匹配</DocLink>、
          <DocLink href="/docs/inspectors">检查</DocLink>和
          <DocLink href="/docs/fillers">填写</DocLink>。请参阅下文的<em>其他等待审核的内容</em>。
        </p>
      </DocCard>

      <DocCard icon={<Settings2 size={24} />} title="Flow 的 Run 被暂停的三种方式">
        <Lead>
          Flow 级别的开关是把 Run 送去审核的一种方式，但不是唯一的方式。附加到 Flow 上的{" "}
          <DocLink href="/docs/cleaners">Cleaner</DocLink>{" "}
          即使在开关关闭时也能自行暂停 Run。当同一个 Run 适用多个触发条件时，它们的审核者名单会合并。
        </Lead>
        <DataTable
          head={["触发方式", "暂停哪些 Run", "适用于"]}
          rows={[
            [
              "Flow 设置（“人工审核”面板）",
              "Flow 的每个 Run，无论提取出了什么。",
              "始终需要签核的文档类型，或你刚构建、尚未信任的 Flow。",
            ],
            [
              "带有“人工审核”操作的 Cleaner 条件操作规则",
              "只有某一行与规则匹配的 Run，例如总额超过阈值或缺少税号。",
              "处理量大、大多数 Run 都没问题、你只想关注例外情况的场景。",
            ],
            [
              "Cleaner 人工输入字段",
              "经过该 Cleaner 的每个 Run，因为必须由人输入或选择该值。",
              "文档中根本没有、必须由人补充的数据。",
            ],
          ]}
        />
        <InfoBox color="blue" icon={<Info size={20} />} title="不必审核所有内容">
          审核每个 Run 违背了自动化提取的初衷。条件触发通常才是正确的方式：在 Cleaner
          中添加一个条件操作字段，为它设置一个条件，例如 <em>total &gt; 10,000</em>
          ，添加“人工审核”操作并选择审核者。只有匹配的 Run 才会停下。Flow 的开关可以保持关闭。
        </InfoBox>
        <p>
          当 Cleaner 规则触发暂停时，Tavnit
          会记录匹配的是哪些行和哪些字段。审核界面会准确标记这些单元格，让审核者从 Run
          被拦下的原因入手，而不必通读整张表格。如果该规则的数据来自异常检查字段，审核者还能看到每个值被标记的原因。
        </p>
      </DocCard>

      <DocCard icon={<Settings2 size={24} />} title="为 Flow 开启审核">
        <Lead>
          Flow 的开关位于 Flow 自己的设置中。只有所有者或管理员可以更改它。审核者从你组织的成员中选择。
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f0">
              打开 Flow，并在它的侧边栏中选择<strong>人工审核</strong>面板。
            </Fragment>,
            <Fragment key="f1">打开审核开关。</Fragment>,
            <Fragment key="f2">
              在<strong>审核者</strong>下，选择组织中的一名或多名成员。
            </Fragment>,
            <Fragment key="f3">
              处理一份文档，确认它以<strong>待审核</strong>状态出现在审核者的
              <strong>人工审核</strong>队列中。
            </Fragment>,
          ]}
        />
        <WarningBox>
          如果开启了审核却没有指派审核者，面板会警告
          <em>“未选择审核者——批准请求将不会发送给任何人。”</em>
          这样暂停的 Run 就没有人能批准。在发送文档之前，请至少指派一名审核者。
        </WarningBox>
        <InfoBox color="violet" icon={<Info size={20} />} title="附加了 Cleaner 时，审核者看到的是清洗后的数据">
          当 Flow 附加了 Cleaner 时，暂停发生在清洗之后，因此待审核的表格是清洗后的输出，包含已换算的货币、已调整格式的日期和计算列。这正是将要交付的内容，所以检查它才是对的。
        </InfoBox>
      </DocCard>

      <DocCard icon={<PenLine size={24} />} title="人工输入字段">
        <Lead>
          人工输入字段是一种从不提取的 Cleaner
          列：由审核者在审核界面中填写。可用于成本中心、总账科目、内部审批代码，或任何文档无法告诉你的信息。
        </Lead>
        <DataTable
          head={["选项", "作用"]}
          rows={[
            ["自由文本", "审核者输入该值。"],
            [
              "菜单",
              "审核者从某个 Bucket 列的不重复值中选择（选项 Bucket 和选项列），可选择按条件筛选，包括基于当前行字段的条件。",
            ],
            ["值为必填", "在每一行都有值之前无法批准。关闭此选项即可允许留空。"],
            ["审核者", "谁可以填写该字段并批准；与 Flow 的审核者合并。"],
          ]}
        />
        <p>
          经过带有人工输入字段的 Cleaner 的每个 Run 都会暂停等待审核，无论 Flow
          的开关是否开启。在审核界面中，该列会被标记为<strong>需要人工输入</strong>
          并显示已填写的行数；在所有必填值都填好之前，“批准”会一直被阻止（
          <em>“请填写所有必填的人工输入值后再批准”</em>）。
        </p>
      </DocCard>

      <DocCard icon={<Inbox size={24} />} title="审核队列">
        <Lead>
          侧边栏中的<strong>人工审核</strong>页面列出所有等待你处理的内容，最新的排在最前面。它只显示你担任审核者的项目；审核者之间看不到彼此的队列。
        </Lead>
        <BulletList
          items={[
            "顶部的汇总数据：待审核、最早待处理、你的角色和启用 HITL 的 Flow",
            "每个项目一张卡片：Run 显示文件名和 Flow，匹配和填写类项目带有“匹配”或“填写”标签，状态为“待审核”",
            "只要有内容在等你处理，侧边栏图标上就会出现一个红点。它实时更新，无需刷新页面",
            "一旦有 Run、匹配、检查或填写需要处理，被指派的审核者还会立即收到一封带有直达链接的邮件",
          ]}
        />
      </DocCard>

      <DocCard icon={<SplitSquareHorizontal size={24} />} title="审核 Run">
        <Lead>
          审核界面是分屏视图：左侧是提取出的表格，右侧是原始文档。你无需离开页面就能对照源文档核对值、就地修正，然后批准。中间的分隔条可以拖动；在移动设备上，你可以在两个面板之间切换。
        </Lead>
        <Screenshot
          src="/assets/docs-hitl-review-2026-08.jpg"
          alt="Tavnit 中一个待审核 Run 的审核界面：左侧是可编辑的数据表格，显示 Subtotal、Amount 和 Weight 列以及行复选框；右侧呈现源发票；顶部有“拒绝”和“批准”按钮。"
          caption="一个待审核的 Run。左侧表格是将要交付的清洗后输出；源文档就在旁边，方便核对。"
        />
        <DataTable
          head={["在数据表格中你可以", "方法"]}
          rows={[
            ["编辑值", "双击单元格并输入。"],
            ["一次修改多个单元格", "通过拖动、Shift 加点击或点击列标题进行选择，然后点击“应用到所选”。"],
            ["从输出中删除一行", "取消勾选。被排除的行不会被交付。"],
            ["添加或移除列", "使用“添加列”或“移除列”。被移除的列在批准之前可以恢复。"],
            ["查看触发暂停的原因", "Cleaner 规则匹配到的单元格会被标记。"],
            ["填写人工输入字段", "输入值，或从菜单中选择。"],
            ["查看你改了什么", "编辑过的单元格会一直高亮，直到你批准。"],
          ]}
        />
        <BulletList
          items={[
            "文档面板可显示带翻页功能的 PDF 以及图片文件；电子表格可以下载",
            "适应宽度、适应高度和手动缩放；拖动可平移",
            "Ctrl/Cmd + 和 − 缩放，Ctrl/Cmd + 0 重置",
          ]}
        />
      </DocCard>

      <DocCard icon={<CheckCircle2 size={24} />} title="批准与拒绝">
        <Lead>
          批准会把你的修改并入 Run，并将其放行到下游。拒绝会取消 Run，不交付任何内容。两种决定对该
          Run 都是最终的：暂停是一次性的关卡，而不是可以来回切换的状态。
        </Lead>
        <DataTable
          head={["决定", "Run 会怎样", "交付什么"]}
          rows={[
            [
              "批准",
              "你编辑后的表格替换提取输出，Run 继续执行直到“已完成”，并带有“HITL 已批准”标记。",
              <Fragment key="f4">
                Flow 配置要做的一切：邮件输出、webhook、
                <DocLink href="/docs/buckets">Bucket</DocLink> 导出、表单填写以及关联的{" "}
                <DocLink href="/docs/agents">Agent</DocLink>，全部使用已批准的数据。
              </Fragment>,
            ],
            [
              "拒绝",
              "Run 变为“已取消”，并带有“HITL 已拒绝”标记，你填写的原因（可选但建议填写）会被记录。",
              "什么都不交付。没有邮件，没有 webhook，没有 Bucket 数据行，也不会运行 Agent。",
            ],
          ]}
        />
        <InfoBox color="green" icon={<CheckCircle2 size={20} />} title="第一个决定生效">
          不需要每位被指派的审核者都签核。第一个批准或拒绝就会决定该 Run
          的结果；如果另一位审核者当时也打开了它，其决定会被拒绝，因为该 Run
          已不再处于待批准状态。刷新队列即可查看当前状态。
        </InfoBox>
        <p>
          Run 的页面会显示是谁做出的决定（<strong>批准者</strong>或<strong>拒绝者</strong>）。
        </p>
      </DocCard>

      <DocCard icon={<Layers size={24} />} title="其他等待审核的内容">
        <Lead>
          Matchers、Inspectors 和 Fillers
          有各自的审核设置，它们暂停的项目会进入同一个队列，同样遵循“第一个决定生效”规则，并记录在同样的审计记录中。
        </Lead>
        <DataTable
          head={["项目", "何时暂停", "审核者做什么"]}
          rows={[
            [
              <DocLink key="o0" href="/docs/matchers">匹配</DocLink>,
              "当 Matcher 开启人工审核时：每次匹配。",
              "检查并修正 AI 对跨文档数据行的配对，可以排除行，然后批准或拒绝。",
            ],
            [
              <DocLink key="o1" href="/docs/inspectors">检查</DocLink>,
              "当 Inspector 开启人工审核时，或当某项未通过的检查通过其失败操作请求审核时。",
              "填写原因豁免未通过的检查，然后批准以确定最终结论，或拒绝以取消该检查。",
            ],
            [
              <DocLink key="o2" href="/docs/fillers">填写</DocLink>,
              "当 Filler 开启人工审核时，或只要它映射了人工填写字段。",
              "审核已填写的表单，输入人工填写的值，然后批准以发布表单，或拒绝。",
            ],
          ]}
        />
      </DocCard>

      <DocCard icon={<Eye size={24} />} title="谁可以审核">
        <Lead>
          只有被指派为审核者的人才能批准或拒绝 Flow 的 Run。仅仅是管理员还不够：不在审核者名单上的管理员，队列中不会出现该
          Run，也无法批准它。
        </Lead>
        <BulletList
          items={[
            "Flow 的审核者名单由所有者或管理员管理",
            "Cleaner 的“人工审核”操作和每个人工输入字段都有各自的审核者，并与 Flow 的审核者合并",
            "任何成员都可以担任审核者，无论其角色如何",
            "“仅 HITL”角色专为审核者设计：这些成员只能看到人工审核队列并进行审核，不能运行或更改其他任何内容",
          ]}
        />
        <p>
          请参阅<DocLink href="/docs/user-roles">用户角色与权限</DocLink>，了解每个角色可以更改什么。
        </p>
      </DocCard>

      <DocCard icon={<Shield size={24} />} title="只增不改的审计记录">
        <Lead>
          每一项审核操作都会写入一份永久的、只增不改的日志，并附带时间戳和审核者身份。条目无法编辑或删除，因此谁改了什么、数据在被改动之前是什么样子，这些记录在审核结束后依然保留。
        </Lead>
        <DataTable
          head={["记录的事件", "何时写入"]}
          rows={[
            ["已通知审核者", "Run 进入审核队列，并向审核者发送邮件。"],
            ["单元格已编辑", "某个值被修改，记录旧值和新值。"],
            ["行已添加 / 行已移除", "审核者添加了一行或排除了一行。"],
            ["列已添加 / 列已移除", "审核者改变了表格的结构。"],
            ["已批准", "决定、审核者，以及做了多少处修改。"],
            ["已拒绝", "决定、审核者，以及给出的原因。"],
          ]}
        />
        <InfoBox color="purple" icon={<Shield size={20} />} title="审核前的数据也会保留">
          Tavnit
          会把审核者改动之前的输出与批准后的版本一起保存。审计人员可以直接把提取结果与交付结果进行对比，而无需从事件日志中重建。
        </InfoBox>
      </DocCard>

      <DocCard icon={<HelpCircle size={24} />} title="故障排除">
        <DataTable
          head={["症状", "可能原因与解决方法"]}
          rows={[
            [
              "Flow 开关已关闭，Run 却仍然暂停",
              "该 Flow 的 Cleaner 中有一条带“人工审核”操作的条件操作规则，或有一个人工输入字段。",
            ],
            [
              "某个 Run 处于待批准状态，却不在我的队列中",
              "你不在它的审核者名单上。请所有者或管理员把你添加到该 Flow（或暂停它的 Cleaner 规则）中。",
            ],
            [
              "批准被拒绝，提示你不是已配置的审核者",
              "只有被指派的审核者才能做决定。如果没有指派审核者，请在 Flow 上添加一名；其他人都无法放行该 Run。",
            ],
            ["批准被拒绝，因为该 Run 并不处于待批准状态", "另一位审核者已先做出决定。请刷新队列。"],
            [
              "因缺少人工输入而无法批准",
              "某个必填的人工输入字段在部分行中仍为空。请填写它们，或在 Cleaner 中把该字段设为可选。",
            ],
            ["关联的 Agent 没有运行", "它只在批准之后运行。被拒绝的 Run 永远不会启动它。"],
          ]}
        />
        <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="审核需要时间">
          暂停的 Run 会一直等待，直到被处理。如果结果要用于对时间敏感的流程，请确保审核者关注他们的队列或邮件，或者用
          Cleaner 规则把暂停范围缩小到例外情况。
        </InfoBox>
      </DocCard>

      <Related
        links={[
          {
            href: "/docs/cleaners",
            label: "用 Cleaner 按条件触发审核",
            description: "条件操作只暂停违反规则的 Run；人工输入字段从审核者那里收集值。",
          },
          {
            href: "/docs/user-roles",
            label: "用户角色与权限",
            description: "谁可以指派审核者，以及“仅 HITL”角色能做什么。",
          },
          {
            href: "/docs/agents",
            label: "用 Agents 处理已批准的数据",
            description: "关联的 Agent 只在审核者批准之后才会启动。",
          },
          {
            href: "/docs/webhooks",
            label: "用 webhook 交付已批准的结果",
            description: "审核者批准后会触发什么，以及拒绝后永远不会触发什么。",
          },
          {
            href: "/docs/buckets",
            label: "把已批准的数据存入 Buckets",
            description: "只接收经审核者签核的数据行的结构化表格。",
          },
        ]}
      />
    </section>
  );
}
