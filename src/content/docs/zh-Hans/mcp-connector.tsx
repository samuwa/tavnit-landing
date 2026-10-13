import Link from "next/link";
import { Fragment } from "react";
import {
  AlertTriangle,
  Info,
  KeyRound,
  LifeBuoy,
  MessageSquare,
  Plug,
  RefreshCw,
  Settings2,
  Sparkles,
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
import { localizedPath } from "@/lib/routes";
import type { DocsPageSchemaData } from "../types";

/** /zh-hans/docs/mcp-connector — translated from src/app/docs/mcp-connector/page.tsx. */

/** Mirrors the numbered steps rendered under "连接 claude.ai". */
export const schema: DocsPageSchemaData = {
  howTo: {
    name: "使用 MCP 连接器把 Tavnit 连接到 claude.ai",
    description:
      "在“集成”页面生成 Tavnit 连接器 URL，并把它作为自定义连接器添加到 claude.ai，让你的助手可以使用你的 Tavnit 数据。",
    steps: [
      {
        name: "在 Tavnit 中打开“集成”",
        text: "登录 Tavnit 应用，从侧边栏打开“集成”。确认你当前所在的组织正是助手需要访问其数据的组织。",
      },
      {
        name: "生成连接器 URL",
        text: "在“自定义连接器”卡片中选择“生成连接器 URL”。Tavnit 会根据你的 API 密钥签发该 URL，并显示它的创建时间和过期时间。",
      },
      {
        name: "复制 URL",
        text: "用复制按钮复制连接器 URL。请像对待密码一样对待它。",
      },
      {
        name: "在 claude.ai 中将其添加为自定义连接器",
        text: "在 claude.ai 中依次进入 Settings、Connectors、Add custom connector，然后粘贴该 URL。自定义连接器需要 Claude Pro 或更高级别的套餐。",
      },
      {
        name: "确认连接",
        text: "开始一个新对话，询问助手它有哪些 Tavnit 工具。如果它能列出这些工具，连接器就已生效。",
      },
    ],
  },
};

export default function McpConnectorZhHans() {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        MCP 连接器
      </h1>

      <DocCard icon={<Plug size={24} />} title="MCP 连接器的作用">
        <Lead>
          MCP 连接器把你的 Tavnit 组织作为一个工具添加到 AI 助手中。连接之后，你可以用日常语言向助手询问你的 Tavnit
          数据，它会根据你的实时账户作答，而不是凭空猜测。
        </Lead>
        <p>
          MCP（Model Context Protocol）是让 AI 助手调用外部工具的开放标准。Tavnit 在{" "}
          <InlineCode>mcp.tavnit.io</InlineCode> 运行一个 MCP 服务器，而连接器 URL 就是把客户端指向你的组织的凭据。它适用于{" "}
          <strong>claude.ai</strong>（Pro 及以上）、<strong>Cursor</strong>，以及任何接受远程 MCP 服务器 URL 的客户端。
        </p>
        <p>
          关于连接器的用途，以及它与把文件粘贴到对话中有何不同，请参阅
          <Link href={localizedPath("/integrations/mcp", "zh-Hans")} className="text-accent hover:underline">
            MCP 连接器概览
          </Link>
          。
        </p>
        <InfoBox color="blue" icon={<Info size={20} />} title="按需开通">
          连接器按组织开通。如果你在“集成”页面上看不到“自定义连接器”卡片，请联系支持团队为你的组织开通。
        </InfoBox>
      </DocCard>

      <DocCard icon={<KeyRound size={24} />} title="开始之前">
        <Lead>
          你需要三样东西：一个已开通连接器的组织、你的 API 密钥，以及一个 MCP 客户端。连接器由你自己的密钥签发，因此它只能访问你生成它时所在的组织，助手也会以该密钥的身份执行操作。
        </Lead>
        <DataTable
          head={["前提条件", "从哪里获得"]}
          rows={[
            [
              "“自定义连接器”卡片",
              <Fragment key="f0">
                位于<strong>集成</strong>页面，仅在你的组织已开通连接器时显示。如果看不到，请询问支持团队。
              </Fragment>,
            ],
            [
              "你的 API 密钥",
              <Fragment key="f1">
                同一页面上的 <strong>API 密钥</strong>卡片：每个成员在每个组织中有一个密钥。如果显示{" "}
                <em>No API key found. Please log in again.</em>，请退出后重新登录。
              </Fragment>,
            ],
            [
              "一个 MCP 客户端",
              <Fragment key="f2">
                Pro 或更高级别套餐的 claude.ai、Cursor，或任何接受远程 MCP 服务器 URL 的客户端。
              </Fragment>,
            ],
            [
              "你的角色",
              <Fragment key="f3">
                助手使用你的 API 密钥，因此只能做你的密钥能做的事。例如，<strong>仅 HITL</strong>{" "}
                角色的密钥会被处理请求拒绝。参见<DocLink href="/docs/user-roles">用户角色</DocLink>和
                <DocLink href="/docs/api-integration">API 页面</DocLink>。
              </Fragment>,
            ],
          ]}
        />
      </DocCard>

      <DocCard icon={<Settings2 size={24} />} title="连接 claude.ai">
        <Lead>
          在 Tavnit 中生成 URL，然后把它作为自定义连接器粘贴到 claude.ai 中。无需安装任何东西，也无需编辑配置文件。
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f4">
              在 Tavnit 侧边栏中打开<strong>集成</strong>。先检查组织切换器：连接器会绑定到你当前所在的组织。
            </Fragment>,
            <Fragment key="f5">
              在<strong>自定义连接器</strong>卡片中选择<strong>生成连接器 URL</strong>。
            </Fragment>,
            <Fragment key="f6">用复制按钮复制 URL。</Fragment>,
            <Fragment key="f7">
              在 claude.ai 中进入 <strong>Settings → Connectors → Add custom connector</strong>，然后粘贴该 URL。
            </Fragment>,
            <Fragment key="f8">
              打开一个新对话，询问助手它有哪些 Tavnit 工具。如果它能列出这些工具，连接器就已生效。
            </Fragment>,
          ]}
        />
      </DocCard>

      <DocCard icon={<Settings2 size={24} />} title="连接 Cursor 或其他 MCP 客户端">
        <Lead>
          任何支持远程 MCP 服务器的客户端都使用同一个 URL。请把它添加为远程（URL）服务器，而不是基于命令的服务器：连接器指向的是托管服务器，因此不需要运行任何本地进程。
        </Lead>
        <NumberedList
          items={[
            "按上述方法，在“集成”页面生成并复制连接器 URL。",
            <Fragment key="f9">
              在 Cursor 中打开 MCP 设置，添加一个<strong>远程</strong> / URL 类型的新服务器。
            </Fragment>,
            <Fragment key="f10">
              把连接器 URL 粘贴为服务器 URL。不需要单独的 API 密钥字段：URL 本身已经包含了凭据。
            </Fragment>,
            "重新加载客户端，检查 Tavnit 是否出现在它的工具列表中。",
          ]}
        />
        <InfoBox color="blue" icon={<Info size={20} />} title="一个 URL，多个客户端">
          你同一时间只有一个连接器 URL，但可以把它粘贴到多个客户端中。它们都在同一个组织中以你的身份执行操作，因此一次刷新会同时断开所有客户端。
        </InfoBox>
      </DocCard>

      <DocCard icon={<Sparkles size={24} />} title="你的助手能做什么">
        <Lead>
          通过连接器，助手会使用你的 API 密钥处理你所在组织的 Tavnit 数据。构建和配置 Flow、Cleaner、Pipeline
          以及管理团队仍然在应用中完成。
        </Lead>
        <p>
          连接器提供的工具由你的 MCP 客户端列出，查看它们最快的方法就是直接问助手。请用日常语言提问，并按应用中显示的名称说明你指的是哪个
          Flow、Bucket 或 Run。
        </p>
        <InfoBox color="blue" icon={<Info size={20} />} title="你的数据，你的组织">
          连接器只能访问生成它的那个组织。要处理另一个组织的数据，请在 Tavnit 中切换到该组织并在那里生成 URL。从助手发起的工作和其他
          Run 一样遵循你的配置：如果某个 Flow 需要<DocLink href="/docs/human-in-the-loop">人工审核</DocLink>，Run
          仍然会等待审核。
        </InfoBox>
      </DocCard>

      <DocCard icon={<RefreshCw size={24} />} title="过期与刷新">
        <Lead>
          连接器 URL 有时间限制。“自定义连接器”卡片会显示 URL 的创建时间和剩余有效期，并在最后 24
          小时内向你发出提醒。刷新会签发一个新 URL，并立即使旧 URL 失效。
        </Lead>
        <DataTable
          head={["状态", "你看到的内容", "该怎么做"]}
          rows={[
            [
              "有效",
              <Fragment key="s0">URL、创建时间，以及距离过期还剩的天数。</Fragment>,
              "无需操作。",
            ],
            [
              "即将过期（不足 24 小时）",
              <Fragment key="f16">以小时或分钟显示的剩余时间，以及一条琥珀色提示：<em>连接器即将过期——请立即刷新以免中断。</em></Fragment>,
              "刷新，然后把新 URL 粘贴到每个正在使用它的客户端中。",
            ],
            [
              "已过期",
              <Fragment key="f17">一条红色提示：<em>此连接器已过期。请刷新以生成新的 URL。</em></Fragment>,
              "刷新并重新粘贴。使用旧 URL 的客户端已经停止工作。",
            ],
          ]}
        />
        <p>
          要刷新，请选择<strong>刷新 URL</strong>，然后在<em>刷新连接器 URL？</em>对话框中点击<strong>刷新</strong>确认。
        </p>
        <WarningBox>
          刷新不是可以分阶段进行的轮换。一旦确认，之前的 URL 就会停止工作，所有持有它的助手都会失败，直到你粘贴新的 URL。请在能够立即更新客户端时再刷新。
        </WarningBox>
      </DocCard>

      <DocCard icon={<AlertTriangle size={24} />} title="像对待密码一样对待这个 URL">
        <Lead>
          连接器 URL 是一种凭据。任何拥有它的人都可以不经登录、以你的身份访问你所在组织的数据。把它粘贴到 MCP
          客户端的设置中是安全的；但在工单、聊天消息或截图中分享它是不安全的。
        </Lead>
        <BulletList
          items={[
            "不要把它提交到代码仓库，也不要粘贴到共享文档中。",
            "分享任何截图之前，先把它模糊处理或裁掉。",
            "如果它泄露了，请立即刷新：这会当场使暴露的 URL 失效。",
            "重新生成 API 密钥是同一页面上的另一项操作；如果你认为密钥本身已经暴露，也请重新生成。",
          ]}
        />
      </DocCard>

      <DocCard icon={<LifeBuoy size={24} />} title="故障排查">
        <Lead>
          大多数连接器问题都属于以下四种情况之一：功能未开通、会话已失效、URL 已过期，或者客户端持有的是已被刷新替换掉的 URL。
        </Lead>
        <DataTable
          head={["现象", "原因", "解决方法"]}
          rows={[
            [
              "“集成”页面上没有“自定义连接器”卡片",
              "你的组织尚未开通连接器。",
              "联系支持团队为你开通。",
            ],
            [
              <Fragment key="f18"><InlineCode>自定义连接器需要有效的 Tavnit 会话。请尝试退出后重新登录。</InlineCode></Fragment>,
              "Tavnit 无法验证你的密钥，因而无法签发或读取 URL。",
              "退出后重新登录，然后再次生成 URL。",
            ],
            [
              "助手不再能看到 Tavnit",
              "URL 已过期，或者有人刷新了它。",
              "检查卡片上是否有已过期或即将过期的提示，刷新后重新粘贴到每个客户端中。",
            ],
            [
              "助手看到的数据不对",
              "URL 是在你处于另一个组织时生成的。",
              "在 Tavnit 中切换组织，生成一个新的 URL，并替换旧的 URL。",
            ],
            [
              "助手无法执行某项操作",
              "你的角色不允许该操作。",
              "在怀疑连接器故障之前，先检查你的角色。",
            ],
          ]}
        />
      </DocCard>

      <DocCard icon={<MessageSquare size={24} />} title="何时使用连接器而不是 API">
        <Lead>
          连接器适用于对话式的临时工作：一次性的问题、浏览已存储的数据、快速核对。对于任何定时、大批量或嵌入其他系统的工作，请使用
          REST API，因为这类工作需要明确的错误处理和重试。
        </Lead>
        <DataTable
          head={["场景", "使用"]}
          rows={[
            ["同事询问某个供应商上个季度开了多少账单", "MCP 连接器"],
            ["你想在对话中浏览自己的数据", "MCP 连接器"],
            ["每晚处理供应商门户中的每一张发票", "REST API 或邮件触发"],
            ["你自己的产品需要提取出的数据", "REST API 加 webhook"],
          ]}
        />
      </DocCard>

      <Related
        links={[
          {
            href: "/docs/api-integration",
            label: "Tavnit REST API 参考",
            description:
              "每个端点的说明，包括 API 密钥认证、请求字段、响应以及 Python 和 JavaScript 示例。",
          },
          {
            href: "/docs/buckets",
            label: "把提取的数据存储在 Bucket 中",
            description:
              "存放你所提取数据的结构化表格。",
          },
          {
            href: "/docs/user-roles",
            label: "用户角色与权限",
            description:
              "所有者、管理员、成员和仅 HITL 各自能做什么。",
          },
        ]}
      />
    </section>
  );
}
