"use client";

import { Fragment, useState, useSyncExternalStore } from "react";
import {
  AudioLines,
  Bot,
  Briefcase,
  CircleDot,
  ClipboardCheck,
  Code2,
  Database,
  Download,
  ExternalLink,
  FileOutput,
  FileText,
  FolderInput,
  Info,
  KeyRound,
  Layers,
  ListChecks,
  Lock,
  Paperclip,
  Radar,
  Route,
  Settings2,
  ShieldCheck,
  Split,
  Star,
  Target,
  UserCheck,
  Wand2,
  Webhook,
  Zap,
} from "lucide-react";
import {
  BulletList,
  CodeBlock,
  DataTable,
  DocCard,
  DocLink,
  InfoBox,
  InlineCode,
  NumberedList,
  Related,
  WarningBox,
} from "@/components/docs/ui";
import {
  AGENT_RUN_RESPONSE,
  AGENT_TRIGGER_REQUEST,
  API_ERROR_EXAMPLE,
  API_KEY_RESPONSE,
  BUCKET_READ_REQUEST,
  BUCKET_READ_RESPONSE,
  BUCKET_WRITE_RESPONSE,
  BUCKETS_JSON_EXAMPLE,
  CASE_REQUEST,
  CASE_RESPONSE,
  CLEANERS_JSON_EXAMPLE,
  COLLECTION_PROCESS_RESPONSE,
  COLLECTIONS_JSON_EXAMPLE,
  FILLER_REQUEST,
  HITL_RUN_APPROVE_REQUEST,
  INSPECTOR_PROCESS_REQUEST,
  JAVASCRIPT_BUCKETS_CODE,
  JAVASCRIPT_CLEANERS_CODE,
  JAVASCRIPT_CODE,
  JAVASCRIPT_COLLECTIONS_CODE,
  JAVASCRIPT_RUN_POLL_CODE,
  JAVASCRIPT_SPLITTERS_CODE,
  JSON_BODY_EXAMPLE,
  MATCHER_RUN_REQUEST,
  NET_CATCH_REQUEST,
  PIPELINE_EXECUTE_REQUEST,
  PYTHON_BUCKETS_CODE,
  PYTHON_CLEANERS_CODE,
  PYTHON_CODE,
  PYTHON_COLLECTIONS_CODE,
  PYTHON_RUN_POLL_CODE,
  PYTHON_SPLITTERS_CODE,
  RUN_GET_RESPONSE,
  RUN_PROCESS_RESPONSE,
  SIGNAL_RUN_REQUEST,
  SOURCE_FILE_RESPONSE,
  SPLIT_RUN_RESPONSE,
  SPLITTERS_JSON_EXAMPLE,
  SWEEP_RUN_RESPONSE,
} from "@/components/docs/code-samples";

/**
 * /zh-hans/docs/api-integration — translated from components/docs/ApiIntegrationContent.tsx.
 * A client module (tab and language state), so it exports no `schema`; the
 * English page has none either. Code samples are shared and stay English.
 */

type ApiTab = "code" | "no-code";
type Lang = "python" | "javascript";

/* The app deep-links to the No-Code tab with #no-code. Reading the hash
 * through an external store keeps the server render on "code" (no hydration
 * mismatch) and also follows later hash changes. */
function subscribeHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}
const hashIsNoCode = () => window.location.hash === "#no-code";
const serverHash = () => false;

const H3 = "text-base font-semibold text-fg-2 mt-6 mb-1";

function Endpoint({ method, path }: { method: string; path: string }) {
  return (
    <div className="my-3 flex flex-wrap items-center gap-2 font-mono text-[13px]">
      <span className="rounded bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] px-2 py-0.5 text-[11px] font-bold text-white">
        {method}
      </span>
      <span className="break-all text-fg-2">{path}</span>
    </div>
  );
}

function LangToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="flex gap-1 p-1 bg-tint/[0.04] rounded-lg w-fit my-4 border border-tint/[0.08]">
      {(["python", "javascript"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
            lang === l
              ? "bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white shadow-lg"
              : "text-fg-4 hover:text-fg hover:bg-tint/5"
          }`}
        >
          {l === "python" ? "Python" : "JavaScript"}
        </button>
      ))}
    </div>
  );
}

const FIELD_HEAD = ["字段", "必填", "说明"];

export default function ApiIntegrationZhHans() {
  const hashNoCode = useSyncExternalStore(subscribeHash, hashIsNoCode, serverHash);
  const [chosenTab, setChosenTab] = useState<ApiTab | null>(null);
  const apiTab: ApiTab = chosenTab ?? (hashNoCode ? "no-code" : "code");
  const [lang, setLang] = useState<Lang>("python");

  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        API 集成
      </h1>

      {/* Sub-tabs */}
      <div className="flex gap-1 p-1 bg-tint/[0.04] rounded-lg w-fit mb-8 border border-tint/[0.08]" role="tablist">
        <button
          role="tab"
          aria-selected={apiTab === "code"}
          onClick={() => setChosenTab("code")}
          className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
            apiTab === "code"
              ? "bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white shadow-lg"
              : "text-fg-4 hover:text-fg hover:bg-tint/5"
          }`}
        >
          Code
        </button>
        <button
          role="tab"
          aria-selected={apiTab === "no-code"}
          onClick={() => setChosenTab("no-code")}
          className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
            apiTab === "no-code"
              ? "bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white shadow-lg"
              : "text-fg-4 hover:text-fg hover:bg-tint/5"
          }`}
        >
          No-Code
        </button>
      </div>

      {/* ── Code tab ── */}
      <div role="tabpanel" aria-label="Code" className={apiTab === "code" ? undefined : "hidden"}>
        <DocCard icon={<Info size={24} />} title="API 的工作方式">
          <p>
            借助 Tavnit REST API，你自己的代码可以完成你在应用中做的事：把文档发送到 Flow、Collection、Splitter 或
            Pipeline，运行 Cleaner、Matcher、Inspector、Filler、Signal 和 Agent，读写 Bucket，管理 Subject
            的案例，以及批准或拒绝人工审核。
          </p>
          <BulletList
            items={[
              <Fragment key="b0">
                基础 URL：<InlineCode>https://run.tavnit.io/api</InlineCode>。下文的每个路径都相对于它。
              </Fragment>,
              <Fragment key="b1">
                每个请求都在 <InlineCode>X-API-Key</InlineCode> 请求头中携带你的 API 密钥。
              </Fragment>,
              <Fragment key="b2">
                处理是异步的。启动工作的端点会立即返回 <strong>202 Accepted</strong>{" "}
                和一个 ID，工作在后台进行。你可以通过轮询（Run、Agent Run、Catch、案例）或通过在该功能上配置的{" "}
                <DocLink href="/docs/webhooks">webhook</DocLink> 获取结果。
              </Fragment>,
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Beta 功能">
            Pipelines、Subjects、Matchers、Inspectors、Fillers、Signals 和 Nets 处于 Beta 阶段。它们的端点现在已经可用，但细节仍可能变化。
          </InfoBox>
        </DocCard>

        <DocCard icon={<Lock size={24} />} title="认证与 ID">
          <h3 className="text-base font-semibold text-fg-2 mt-2 mb-1">API 密钥</h3>
          <p>
            在应用侧边栏中打开<strong>集成</strong>。<strong>API 密钥</strong>卡片会显示你的密钥（可在那里显示并复制）。每个成员在每个组织中都有自己的密钥，请求会以该成员的身份在该组织中执行。
          </p>
          <WarningBox>
            请妥善保管你的 API 密钥。同一卡片上的<strong>重新生成</strong>会立即使当前密钥失效，任何仍在使用它的东西都会停止工作。
          </WarningBox>
          <p>没有有效密钥的请求会收到：</p>
          <CodeBlock
            lang="401"
            code={`{
  "success": false,
  "error": "Authentication required",
  "message": "Please provide a valid X-API-Key header"
}`}
          />

          <h3 className={H3}>角色</h3>
          <p>
            密钥带有你的角色。<strong>仅 HITL</strong> 角色的成员只能使用人工审核的批准和拒绝端点以及 API
            密钥端点。所有处理和数据端点都会以 <strong>403</strong> 和{" "}
            <InlineCode>Your role only permits HITL reviews</InlineCode> 拒绝他们。参见
            <DocLink href="/docs/user-roles">用户角色</DocLink>。
          </p>

          <h3 className={H3}>ID</h3>
          <p>
            每个 Flow、Collection、Splitter、Cleaner、Bucket、Agent、Matcher、Inspector、Filler 和 Pipeline
            都在其详情页上显示自己的 ID，并带有复制按钮。资源必须属于你的密钥所在的组织：使用另一个组织的 ID 会返回 403 或 404。
          </p>
        </DocCard>

        <DocCard icon={<Download size={24} />} title="发送文件">
          <p>接收文档的端点支持以下两种方式之一：</p>
          <InfoBox color="purple" icon={<Paperclip size={20} />} title="Multipart 文件上传">
            以 multipart/form-data 的形式在名为 file 的字段中发送文件，其他字段作为表单字段。适用于所有文件端点。
          </InfoBox>
          <InfoBox color="violet" icon={<Code2 size={20} />} title="JSON 请求体中的 Base64">
            发送包含 file_base64（文件内容）和 filename（带扩展名）以及其他字段的 JSON。当自动化工具给你的是 base64
            而不是文件时很有用。
          </InfoBox>
          <DataTable
            head={["端点", "Base64", "接受的文件"]}
            rows={[
              ["POST /runs/process", "是", "PDF、图片（PNG、JPG、JPEG、JFIF、TIF、TIFF、WEBP、BMP、GIF）、电子表格（XLSX、XLS、CSV）"],
              ["POST /collections/process", "是", "与 Run 相同"],
              ["POST /splits/run", "是", "与 Run 相同"],
              ["POST /pipelines/{id}/execute", "是", "PDF 和图片"],
              ["POST /signals/{id}/run", "是", "音频：MP3、MP4、MPEG、MPGA、M4A、WAV、WEBM"],
              ["POST /sweeps/run", "否", "电子表格：CSV、XLSX、XLS"],
              ["Inspector、Filler、Subject 和案例", "否", "以 multipart 文件形式发送的文档"],
            ]}
          />
          <p>单个请求最大 150 MB。文件类型根据文件名的扩展名判断。</p>
        </DocCard>

        <DocCard icon={<ListChecks size={24} />} title="响应与错误">
          <p>
            响应是带有 <InlineCode>success</InlineCode> 标志的 JSON。错误包含一个{" "}
            <InlineCode>error</InlineCode> 字符串，有时还有 <InlineCode>message</InlineCode>，以及用于说明问题的额外键：
          </p>
          <CodeBlock lang="409 示例" code={API_ERROR_EXAMPLE} />
          <DataTable
            head={["状态码", "含义"]}
            rows={[
              ["200 / 201", "已完成（读取、取消、批准）/ 已创建（案例、填写、检查）。"],
              ["202", "已接受：工作已排队。请保存返回的 ID。"],
              ["400", "缺少必填字段或字段无效、文件类型不受支持，或资源未启用或未完成设置。"],
              ["401", "缺少 X-API-Key 或其无效。"],
              ["402", "你的组织目前无法启动新的工作；请联系 Tavnit 团队。"],
              ["403", "资源属于另一个组织、你的角色是仅 HITL，或你不是该项目的审核者。"],
              ["404", "该 ID 在你的组织中不存在。"],
              ["409", "与当前状态冲突：Bucket 名称不匹配、已取消或已完成、案例已关闭、槽位已被填满。"],
              ["429", "已有太多 Run 在等待某个 Agent。"],
              ["500", "意外错误。稍后重试是安全的。"],
            ]}
          />
        </DocCard>

        <DocCard icon={<Layers size={24} />} title="端点参考">
          <DataTable
            head={["功能", "方法和路径", "作用"]}
            rows={[
              ["Flows", "POST /runs/process", "用 Flow 提取一份文档"],
              ["Flows", "GET /runs/{run_id}", "Run 状态和提取的数据"],
              ["Flows", "GET /runs/{run_id}/source-file", "原始文档"],
              ["Collections", "POST /collections/process", "由 AI 把文档路由到正确的 Flow 或 Splitter"],
              ["Collections", "GET /collection-runs/{id}/source-file", "原始文档"],
              ["Splitters", "POST /splits/run", "拆分包含多份文档的文件"],
              ["Splitters", "GET /splits/{split_id}/source-file", "原始文件包"],
              ["Cleaners", "POST /sweeps/run", "清洗一个电子表格"],
              ["Cleaners", "POST /cleaners/{cleaner_id}/process", "清洗以 JSON 发送的行"],
              ["Buckets", "POST /buckets/write", "追加或替换行"],
              ["Buckets", "GET /buckets/read", "分页读取行"],
              ["Agents", "POST /bots/{agent_id}/runs", "启动一个 Agent Run"],
              ["Agents", "GET /bot-runs/{bot_run_id}", "轮询一个 Agent Run"],
              ["Agents", "GET /bots/{agent_id}/runs", "列出某个 Agent 的 Run"],
              ["Agents", "POST /bot-runs/{bot_run_id}/cancel", "取消一个 Agent Run"],
              ["Matchers", "POST /matchers/{matcher_id}/run", "匹配已完成的 Run"],
              ["Inspectors", "POST /inspectors/{inspector_id}/process", "向一次检查添加文档"],
              ["Fillers", "POST /fillers/{filler_id}/fills", "开启一次填写并添加文档"],
              ["Pipelines", "POST /pipelines/{pipeline_id}/execute", "执行一个 Pipeline"],
              ["Signals", "POST /signals/{signal_id}/run", "把音频文件结构化（一个 Wave）"],
              ["Subjects", "POST /subjects/{subject_id}/process", "把文档路由到某个案例"],
              ["Nets", "POST /nets/{net_id}/catch", "启动一次 Catch"],
              ["人工审核", "POST /runs/{run_id}/hitl/approve", "批准或拒绝已暂停的项目"],
              ["API 密钥", "GET /me/api-key", "读取或重新生成你的密钥"],
            ]}
          />
          <p>下文会详细介绍每个功能及其其他端点。</p>
        </DocCard>

        {/* ── Flows ── */}
        <DocCard icon={<FileText size={24} />} title="Flows：处理文档">
          <p>把一份文档发送到 Flow。Tavnit 会创建一个 Run 并在后台提取它。</p>
          <Endpoint method="POST" path="/runs/process" />
          <DataTable
            head={FIELD_HEAD}
            rows={[
              ["flow_id", "是", "提取该文档的 Flow。"],
              ["file", "是*", "文档（multipart）。"],
              ["file_base64 + filename", "是*", "代替 file：base64 内容和带扩展名的文件名。"],
              ["content_type", "否", "base64 文件的 MIME 类型。"],
              ["source", "否", "记录在 Run 上的标签：api（默认）、email、manual_upload 或 collection。"],
            ]}
            caption="* 发送 file 或 file_base64 + filename 二者之一。"
          />
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python" code={PYTHON_CODE} />
          ) : (
            <CodeBlock lang="JavaScript" code={JAVASCRIPT_CODE} />
          )}
          <CodeBlock lang="202 响应" code={RUN_PROCESS_RESPONSE} />
          <p>
            错误：400（没有文件、没有 flow_id、文件不受支持或无效）、403（属于另一个组织的 Flow）、404（找不到 Flow）。被拒绝的请求在可能的情况下仍会创建一个失败的
            Run，并返回其 <InlineCode>run_id</InlineCode>，方便你在 <strong>Runs</strong> 中找到它。
          </p>

          <h3 className={H3}>获取 Run 及其数据</h3>
          <Endpoint method="GET" path="/runs/{run_id}" />
          <p>
            轮询直到 <InlineCode>status</InlineCode> 进入终态。状态包括：<InlineCode>queued</InlineCode>、
            <InlineCode>running</InlineCode>、<InlineCode>awaiting_approval</InlineCode>（因
            <DocLink href="/docs/human-in-the-loop">人工审核</DocLink>而暂停）、
            <InlineCode>completed</InlineCode>、<InlineCode>failed</InlineCode> 和{" "}
            <InlineCode>cancelled</InlineCode>。<InlineCode>data</InlineCode> 保存提取出的行，在 Run
            完成之前（包括等待批准期间）一直为 <InlineCode>null</InlineCode>。设置了{" "}
            <InlineCode>columns</InlineCode> 时，请按它确定列的顺序。<InlineCode>attempt</InlineCode> 和{" "}
            <InlineCode>previous_attempts</InlineCode> 显示自动重试情况。加上{" "}
            <InlineCode>?include_document=true</InlineCode> 还可以获得指向原始文件的签名链接。这适用于所有 Run，包括由
            Collection、Splitter、Pipeline 和邮件创建的 Run。
          </p>
          <CodeBlock lang="200 响应" code={RUN_GET_RESPONSE} />
          {lang === "python" ? (
            <CodeBlock lang="Python（提交并轮询）" code={PYTHON_RUN_POLL_CODE} />
          ) : (
            <CodeBlock lang="JavaScript（提交并轮询）" code={JAVASCRIPT_RUN_POLL_CODE} />
          )}

          <h3 className={H3}>获取原始文档</h3>
          <Endpoint method="GET" path="/runs/{run_id}/source-file" />
          <p>
            无论 Run 处于什么状态，都会返回指向上传原文件的签名 URL。可选的{" "}
            <InlineCode>expires_in</InlineCode> 以秒为单位设置链接有效期（60 到 604800，默认 7 天）。使用{" "}
            <InlineCode>?download=true</InlineCode> 时，响应就是文件本身。
          </p>
          <CodeBlock lang="200 响应" code={SOURCE_FILE_RESPONSE} />
        </DocCard>

        {/* ── Collections ── */}
        <DocCard icon={<FolderInput size={24} />} title="Collections：让 AI 路由文档">
          <p>
            发送文档时无需选择 Flow：AI 会在 Collection 中挑选最合适的 Flow 或 Splitter。当你收到混合类型的文档时可以使用它。
          </p>
          <Endpoint method="POST" path="/collections/process" />
          <p>
            请求体与 <InlineCode>/runs/process</InlineCode> 相同，只是用{" "}
            <InlineCode>collection_id</InlineCode> 代替 <InlineCode>flow_id</InlineCode>（或者把 ID 放在路径中：
            <InlineCode>{"/collections/{collection_id}/process"}</InlineCode>）。Collection
            必须处于启用状态，并且至少有一个启用的 Flow 或 Splitter，否则调用会返回 400。
          </p>
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python (Collections)" code={PYTHON_COLLECTIONS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Collections)" code={JAVASCRIPT_COLLECTIONS_CODE} />
          )}
          <CodeBlock lang="202 响应" code={COLLECTION_PROCESS_RESPONSE} />
          <p>
            被选中的 Flow 会创建一个普通 Run，其 webhook 负载中包含{" "}
            <InlineCode>collection_run_id</InlineCode>，方便你把结果与请求对应起来。原始文件可立即通过{" "}
            <InlineCode>{"GET /collection-runs/{collection_run_id}/source-file"}</InlineCode>{" "}
            获取（选项与 Run 的源文件相同）。参见 <DocLink href="/docs/collections">Collections</DocLink>。
          </p>
        </DocCard>

        {/* ── Splitters ── */}
        <DocCard icon={<Split size={24} />} title="Splitters：拆分包含多份文档的文件">
          <p>
            发送一个包含多份文档的文件。Splitter 会找出每份文档的起止位置，对其分类，并按照其文档类型把每个部分发送到对应位置。
          </p>
          <Endpoint method="POST" path="/splits/run" />
          <p>
            请求体与 <InlineCode>/runs/process</InlineCode> 相同，改用{" "}
            <InlineCode>splitter_id</InlineCode>。
          </p>
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python (Splitters)" code={PYTHON_SPLITTERS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Splitters)" code={JAVASCRIPT_SPLITTERS_CODE} />
          )}
          <CodeBlock lang="202 响应" code={SPLIT_RUN_RESPONSE} />
          <p>
            发送到 Flow 的部分会成为各自独立的 Run，它们的 webhook 带有{" "}
            <InlineCode>split_id</InlineCode>。原始文件包位于{" "}
            <InlineCode>{"GET /splits/{split_id}/source-file"}</InlineCode>。参见{" "}
            <DocLink href="/docs/splitters">Splitters</DocLink>。
          </p>
        </DocCard>

        {/* ── Cleaners ── */}
        <DocCard icon={<Wand2 size={24} />} title="Cleaners：运行一次清洗">
          <p>
            清洗（sweep）会让 Cleaner 处理多行数据，对值进行规范化、分类、查找或补充。你可以把这些行作为电子表格或 JSON 发送。
          </p>
          <Endpoint method="POST" path="/sweeps/run" />
          <DataTable
            head={FIELD_HEAD}
            rows={[
              ["cleaner_id", "是", "要运行的 Cleaner。"],
              ["file", "是", "CSV、XLSX 或 XLS，仅支持 multipart。表头位于第一行；Cleaner 要求的每个基础字段都必须是一列，且不能重复。"],
              ["sheet_name", "否", "要读取工作簿中的哪个工作表（默认：第一个）。"],
            ]}
          />
          <Endpoint method="POST" path="/cleaners/{cleaner_id}/process" />
          <p>
            发送带有 <InlineCode>rows</InlineCode>（对象数组）的 JSON，或者像上面那样发送 multipart{" "}
            <InlineCode>file</InlineCode>。
          </p>
          <CodeBlock lang="JSON 请求体" code={CLEANERS_JSON_EXAMPLE} />
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python (Cleaners)" code={PYTHON_CLEANERS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Cleaners)" code={JAVASCRIPT_CLEANERS_CODE} />
          )}
          <CodeBlock lang="202 响应" code={SWEEP_RUN_RESPONSE} />
          <p>
            配置无效的 Cleaner 会返回 400 和{" "}
            <InlineCode>validation_errors</InlineCode>。参见{" "}
            <DocLink href="/docs/cleaners">Cleaners</DocLink>。
          </p>
        </DocCard>

        {/* ── Buckets ── */}
        <DocCard icon={<Database size={24} />} title="Buckets：写入和读取行">
          <p>
            从你自己的系统把行推送到 Bucket，或者读取你的 Flow 存储在那里的数据。点击 Bucket 页面上的信息图标即可找到
            Bucket 的 ID 和名称。名称是一项安全校验：如果它与 ID 不匹配，调用会返回 <strong>409</strong>。
          </p>
          <Endpoint method="POST" path="/buckets/write" />
          <DataTable
            head={FIELD_HEAD}
            rows={[
              ["bucket_id", "是", "目标 Bucket。"],
              ["bucket_name", "是", "它的准确名称。"],
              ["overwrite", "是", "布尔值。false 追加行；true 替换所有现有行。"],
              ["rows", "是", "对象数组，每个请求最多 50,000 行。"],
            ]}
          />
          <p>
            以 <InlineCode>application/json</InlineCode> 发送请求体。每一行都必须恰好包含 Bucket
            的各列（按列名或显示名称）：缺少列或出现未知列会以 400 中止整个写入，并列出{" "}
            <InlineCode>missing_columns</InlineCode> 和 <InlineCode>extra_columns</InlineCode>。
          </p>
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python (Buckets)" code={PYTHON_BUCKETS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Buckets)" code={JAVASCRIPT_BUCKETS_CODE} />
          )}
          <CodeBlock lang="202 响应" code={BUCKET_WRITE_RESPONSE} />

          <h3 className={H3}>读取行</h3>
          <Endpoint method="GET" path="/buckets/read" />
          <p>
            查询参数：<InlineCode>bucket_id</InlineCode> 和 <InlineCode>bucket_name</InlineCode>（必填）、
            <InlineCode>limit</InlineCode>（1 到 1000，默认 100）以及 <InlineCode>offset</InlineCode>（默认 0）。在{" "}
            <InlineCode>has_more</InlineCode> 为 true 时用 <InlineCode>offset</InlineCode> 翻页；
            <InlineCode>total_count</InlineCode> 统计所有行。行 <InlineCode>data</InlineCode>{" "}
            的键是列名；显示名称请使用 <InlineCode>columns</InlineCode>。存储的文件链接会以新的签名 URL 返回。
          </p>
          <CodeBlock lang="请求" code={BUCKET_READ_REQUEST} />
          <CodeBlock lang="200 响应" code={BUCKET_READ_RESPONSE} />
          <p>
            参见 <DocLink href="/docs/buckets">Buckets</DocLink>。
          </p>
        </DocCard>

        {/* ── Agents ── */}
        <DocCard icon={<Bot size={24} />} title="Agents：触发并轮询 Run">
          <p>
            从你的代码启动 Agent，并收集它捕获的内容。Agent 按组织应要求开通：请联系支持团队开启。
          </p>
          <Endpoint method="POST" path="/bots/{agent_id}/runs" />
          <p>
            可选的 JSON <InlineCode>{'{"inputs": {...}}'}</InlineCode> 会为本次 Run 覆盖 Agent
            的输入变量。只有 Agent 声明过的变量才会被使用，且绝不接受机密值。你也可以调用{" "}
            <InlineCode>POST /bots/runs</InlineCode> 并在请求体中提供 <InlineCode>bot_id</InlineCode>。每次调用都会启动一个新的
            Run。
          </p>
          <CodeBlock lang="请求" code={AGENT_TRIGGER_REQUEST} />
          <p>
            <InlineCode>status</InlineCode> 为 <InlineCode>queued</InlineCode>；如果 Agent 一次只运行一个 Run
            且正忙，则为 <InlineCode>waiting</InlineCode>（轮到它时会自动开始）。Agent 已归档时返回 409，等待中的 Run
            过多时返回 429。
          </p>

          <h3 className={H3}>轮询、列出和取消</h3>
          <DataTable
            head={["端点", "作用"]}
            rows={[
              ["GET /bot-runs/{bot_run_id}", "单个 Run：状态、时间、输入（已移除机密）以及带签名文件链接的输出。也可通过 GET /bots/{agent_id}/runs/{bot_run_id} 访问。"],
              ["GET /bots/{agent_id}/runs", "按从新到旧排列，不含输入和输出。查询参数：status（queued、running、completed、failed、cancelled）、limit（1 到 100，默认 20）、offset。返回 runs 和 total。"],
              ["POST /bot-runs/{bot_run_id}/cancel", "取消处于等待、排队或运行中的 Run。Run 已结束时返回 409。也可通过 POST /bots/{agent_id}/runs/{bot_run_id}/cancel 访问。"],
            ]}
          />
          <CodeBlock lang="GET /bot-runs/{bot_run_id}" code={AGENT_RUN_RESPONSE} />
          <p>
            参见 <DocLink href="/docs/agents">Agents</DocLink>。
          </p>
        </DocCard>

        {/* ── Matchers ── */}
        <DocCard icon={<Target size={24} />} title="Matchers：匹配 Run">
          <p>比较 Matcher 所用 Flow 的已完成 Run，例如把发票与采购订单进行比较。</p>
          <Endpoint method="POST" path="/matchers/{matcher_id}/run" />
          <DataTable
            head={FIELD_HEAD}
            rows={[
              ["run_ids", "是", "Matcher 所用 Flow 的两个或更多已完成 Run。"],
              ["benchmark_run_id", "基准模式下必填", "其他 Run 与之比较的那个 Run。"],
            ]}
          />
          <CodeBlock lang="请求" code={MATCHER_RUN_REQUEST} />
          <p>
            没有读取匹配结果的 API 端点：请通过 Matcher 的 webhook 或邮件输出，或在应用中获取结果。参见{" "}
            <DocLink href="/docs/matchers">Matchers</DocLink>。
          </p>
        </DocCard>

        {/* ── Inspectors ── */}
        <DocCard icon={<ShieldCheck size={24} />} title="Inspectors：检查一组文档">
          <p>
            一次检查会收集文档，把每份文档路由到 Inspector 的某个槽位，提取它并评估检查清单。
          </p>
          <Endpoint method="POST" path="/inspectors/{inspector_id}/process" />
          <p>
            Multipart <InlineCode>file</InlineCode>。不提供 <InlineCode>inspection_id</InlineCode>{" "}
            时会创建一次新的检查；传入返回的 <InlineCode>inspection_id</InlineCode>{" "}
            即可向其添加更多文档（它必须仍在收集中，否则返回 409）。Inspector 必须处于启用状态。
          </p>
          <CodeBlock lang="请求" code={INSPECTOR_PROCESS_REQUEST} />
          <DataTable
            head={["端点", "作用"]}
            rows={[
              ["POST /inspectors/{inspector_id}/inspections", "创建一次空的检查（201），稍后再向其添加文档。"],
              ["POST /inspections/{inspection_id}/fire", "停止收集并立即评估。必填槽位没有文档时返回 400 和 missing_inputs。"],
            ]}
          />
          <p>
            结果会通过 Inspector 的 webhook 或邮件输出送达。参见{" "}
            <DocLink href="/docs/inspectors">Inspectors</DocLink>。
          </p>
        </DocCard>

        {/* ── Fillers ── */}
        <DocCard icon={<FileOutput size={24} />} title="Fillers：填写 PDF 表单">
          <p>
            一次填写会收集 Filler 所需的文档，提取它们，并把值写入 Filler 的 PDF 模板。
          </p>
          <DataTable
            head={["端点", "作用"]}
            rows={[
              ["POST /fillers/{filler_id}/fills", "开启一次填写（201，返回 fill_id）。Filler 需要有模板和字段映射。"],
              ["POST /fills/{fill_id}/route-upload", "Multipart 文件；AI 会把它路由到一个空闲槽位（202）。"],
              ["POST /fills/{fill_id}/inputs/{input_id}/upload", "针对特定槽位的 multipart 文件；启动该槽位的 Run（202）。"],
              ["POST /fills/{fill_id}/inputs/{input_id}/attach-run", "JSON run_id：为某个槽位复用一个已完成的 Run（202）。"],
              ["POST /fills/{fill_id}/fire", "立即填写，而不是等待所有槽位。必填槽位为空时返回 400 和 missing_inputs。"],
              ["POST /fillers/{filler_id}/templates", "添加一个模板 PDF（multipart 文件，可选 name）。在应用中映射其字段。"],
            ]}
          />
          <CodeBlock lang="请求" code={FILLER_REQUEST} />
          <p>
            填好的 PDF 会通过 Filler 的 webhook 或邮件输出送达。参见{" "}
            <DocLink href="/docs/fillers">Fillers</DocLink>。
          </p>
        </DocCard>

        {/* ── Pipelines ── */}
        <DocCard icon={<Route size={24} />} title="Pipelines：执行">
          <p>用一份文档启动一次 Pipeline 执行。</p>
          <Endpoint method="POST" path="/pipelines/{pipeline_id}/execute" />
          <p>
            Multipart <InlineCode>file</InlineCode> 或 <InlineCode>file_base64</InlineCode> +{" "}
            <InlineCode>filename</InlineCode>；PDF 或图片。Pipeline 未启用或其图无法运行时返回 400（附带{" "}
            <InlineCode>validation_errors</InlineCode>）。
          </p>
          <CodeBlock lang="请求" code={PIPELINE_EXECUTE_REQUEST} />
          <p>
            使用 <InlineCode>{"POST /pipelines/executions/{execution_id}/cancel"}</InlineCode>{" "}
            取消（未在运行时返回 409）。结果通过 Pipeline 的输出节点发出。参见{" "}
            <DocLink href="/docs/pipelines">Pipelines</DocLink>。
          </p>
        </DocCard>

        {/* ── Signals ── */}
        <DocCard icon={<AudioLines size={24} />} title="Signals：把音频文件结构化">
          <p>发送一段录音，Signal 会把它转换为结构化数据（一个 Wave）。</p>
          <Endpoint method="POST" path="/signals/{signal_id}/run" />
          <p>
            Multipart <InlineCode>file</InlineCode> 或 base64。音频最大 150 MB、最长 8 小时，其中检测到的语音最多 2 小时。
          </p>
          <CodeBlock lang="请求" code={SIGNAL_RUN_REQUEST} />
          <p>
            结果会通过 Signal 的 webhook 送达，或在应用中查看。参见{" "}
            <DocLink href="/docs/signals">Signals</DocLink>。
          </p>
        </DocCard>

        {/* ── Subjects ── */}
        <DocCard icon={<Briefcase size={24} />} title="Subjects 与案例">
          <p>把文档归档到 Subject 的案例中，并通过代码管理案例。</p>
          <DataTable
            head={["端点", "作用"]}
            rows={[
              ["POST /subjects/{subject_id}/process", "Multipart 文件；Tavnit 会把它路由到某个案例（202，返回 subject_doc_id）。"],
              ["POST /cases/{case_id}/docs", "Multipart 文件直接放入某个案例，不经过路由。除非 Subject 只有一种文档类型，否则 doc_type_id 为必填。返回 run_id（202）。案例已关闭或该文档类型已填写时返回 409。"],
              ["POST /subjects/{subject_id}/docs/{doc_id}/assign", "JSON case_id 和 doc_type_id：手动归档一份被搁置的文档（202）。"],
              ["POST /subjects/{subject_id}/cases", "JSON name（必填，唯一，最多 200 个字符）和 params（可选对象）。创建一个案例（201）。名称已存在时返回 409。"],
              ["GET /subjects/{subject_id}/cases", "查询参数：state（open 或 closed）、status、search、limit（最多 200，默认 50）、offset。返回 cases 和 total。"],
              ["GET /cases/{case_id}", "案例及其文档，每份文档都带有可在 GET /runs/{run_id} 轮询的 run_id。"],
              ["POST /cases/{case_id}/close", "关闭案例（200）。之后发往该案例的新文档会被搁置而不是归档。已关闭时返回 409。"],
              ["POST /cases/{case_id}/reopen", "重新打开案例（200）。案例处于打开状态时返回 409。"],
              ["POST /cases/{case_id}/inspections", "JSON subject_inspector_id：对案例的已完成 Run 运行一个已绑定的 Inspector（202）。"],
            ]}
          />
          <CodeBlock lang="请求" code={CASE_REQUEST} />
          <CodeBlock lang="201 响应" code={CASE_RESPONSE} />
          <p>
            参见 <DocLink href="/docs/subjects">Subjects</DocLink>。
          </p>
        </DocCard>

        {/* ── Nets ── */}
        <DocCard icon={<Radar size={24} />} title="Nets：启动一次 Catch">
          <p>Nets 按组织开通。没有访问权限时，这些端点返回 403。</p>
          <Endpoint method="POST" path="/nets/{net_id}/catch" />
          <p>
            不带请求体时，Catch 会从上一次结束的地方继续。发送 <InlineCode>window_start</InlineCode> 和/或{" "}
            <InlineCode>window_end</InlineCode>（ISO 时间戳）则会改为回填一个时间范围。Net 未启用，或已有一次从上次继续的
            Catch 正在进行时，返回 409。
          </p>
          <CodeBlock lang="请求" code={NET_CATCH_REQUEST} />
          <p>
            轮询 <InlineCode>{"GET /catches/{catch_id}"}</InlineCode>：状态、阶段、计数，以及完成后包含列和行的{" "}
            <InlineCode>output</InlineCode>。使用 <InlineCode>{"POST /catches/{catch_id}/cancel"}</InlineCode>{" "}
            取消。参见 <DocLink href="/docs/nets">Nets</DocLink>。
          </p>
        </DocCard>

        {/* ── HITL ── */}
        <DocCard icon={<UserCheck size={24} />} title="人工审核：批准或拒绝">
          <p>
            已暂停等待审核的项目可以从你自己的工具中批准或拒绝。只有为该 Flow、Matcher、Inspector 或 Filler
            配置的审核者才能操作（否则返回 403），并且该项目必须处于 <InlineCode>awaiting_approval</InlineCode>{" "}
            状态（否则返回 409）。仅 HITL 角色可以使用这些端点。
          </p>
          <DataTable
            head={["端点", "请求体"]}
            rows={[
              ["POST /runs/{run_id}/hitl/approve", "output_json（必填）：最终的行；diff（可选的编辑列表）。必填的人工输入字段为空时返回 400 和 missing_fields。"],
              ["POST /matches/{match_id}/hitl/approve", "groups（最终分组）、excluded、diff。"],
              ["POST /inspections/{inspection_id}/hitl/approve", "waivers（每个要豁免的失败项的 item_id 和 reason）、diff。"],
              ["POST /fills/{fill_id}/hitl/approve", "values（每个模板的字段值）、diff、allow_missing_human_fields。"],
              [".../hitl/reject", "以 /hitl/reject 结尾的相同路径，可附带可选的 reason。"],
            ]}
          />
          <CodeBlock lang="请求" code={HITL_RUN_APPROVE_REQUEST} />
          <p>
            批准会恢复交付（webhook、邮件、Bucket）。拒绝 Run 会将其取消。参见{" "}
            <DocLink href="/docs/human-in-the-loop">人工审核</DocLink>。
          </p>
        </DocCard>

        {/* ── API key ── */}
        <DocCard icon={<KeyRound size={24} />} title="API 密钥端点">
          <DataTable
            head={["端点", "作用"]}
            rows={[
              ["GET /me/api-key", "返回你在该组织中的密钥。"],
              ["POST /me/api-key/regenerate", "签发一个新密钥，并立即使旧密钥失效。请更新所有集成。"],
            ]}
          />
          <CodeBlock lang="200 响应" code={API_KEY_RESPONSE} />
        </DocCard>
      </div>

      {/* ── No-Code tab ── */}
      <div role="tabpanel" aria-label="No-Code" className={apiTab === "no-code" ? undefined : "hidden"}>
        <DocCard icon={<Star size={24} />} title="自动化工具概览">
          <p>
            把 Tavnit 接入你的工作流程并不需要编写代码。任何能够发送 HTTP 请求的自动化平台都可以在 Tavnit
            中启动工作，任何能够接收 webhook 的平台都可以拿到结果。
          </p>
          <InfoBox color="purple" icon={<CircleDot size={20} />} title="Make">
            可视化场景：一个 HTTP 模块调用 Tavnit，一个 Custom webhook 接收结果。
          </InfoBox>
          <InfoBox color="yellow" icon={<Zap size={20} />} title="Zapier">
            Webhooks by Zapier：Catch Hook 接收结果，一个 POST 操作启动 Run。
          </InfoBox>
          <InfoBox color="green" icon={<CircleDot size={20} />} title="n8n">
            自托管或云端：一个 Webhook 节点接收结果，一个 HTTP Request 节点启动 Run。
          </InfoBox>
          <InfoBox color="blue" icon={<CircleDot size={20} />} title="Power Automate">
            用一个 HTTP 操作以同样的方式调用 API。
          </InfoBox>
          <p>
            每个请求都需要 <InlineCode>X-API-Key</InlineCode> 请求头，值为你在<strong>集成</strong>中获取的密钥。
          </p>
        </DocCard>

        <DocCard icon={<Webhook size={24} />} title="在自动化中接收结果">
          <NumberedList
            items={[
              "在你的平台中创建一个 webhook 触发器（Make：Custom webhook；Zapier：Webhooks by Zapier → Catch Hook；n8n：Webhook 节点，POST），并复制它的 URL。",
              "在 Tavnit 中，把它粘贴为某个 Flow 的 webhook（Webhook 面板）或某个 Pipeline 输出节点的 webhook。",
              "处理一份文档，让平台了解负载的结构，然后把字段映射到 Sheets、CRM、ERP 等。",
            ]}
          />
          <p>
            负载的说明见 <DocLink href="/docs/webhooks">webhook 页面</DocLink>。
          </p>
        </DocCard>

        <DocCard icon={<CircleDot size={24} />} title="Make 集成">
          <p>
            Make（前身为 Integromat）是一个可视化自动化平台，让你无需编写任何代码即可连接应用并实现工作流程自动化。
          </p>
          <a
            href="https://www.make.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-2 transition-colors text-sm font-medium mt-1"
          >
            访问 Make <ExternalLink size={14} />
          </a>
        </DocCard>

        <DocCard icon={<Layers size={24} />} title="Make 入门">
          <NumberedList
            items={[
              "前往 make.com 并创建账户",
              "在你的仪表板中点击“Create a new scenario”",
              "你会看到一块空白画布，可以在上面添加模块",
              "搜索“HTTP”，并添加“Make a request”模块",
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="什么是场景（Scenario）？">
            场景是 Make 中的自动化工作流程，由相互连接的模块（应用）组成。当一个模块触发或接收到数据时，会把数据传给下一个模块。
          </InfoBox>
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="配置 HTTP 模块">
          <p>
            添加 HTTP 模块后，请将其配置为把文档发送到 Tavnit。你可以使用以下两种方法之一：
          </p>

          <h3 className="text-base font-semibold text-accent mt-6 mb-3">
            方法 1：Multipart/form-data（当你有一个 File 对象时）
          </h3>
          <NumberedList
            items={[
              "在场景中添加一个 HTTP“Make a request”模块",
              <Fragment key="f14">
                配置请求：
                <BulletList
                  items={[
                    <>URL：<InlineCode>https://run.tavnit.io/api/runs/process</InlineCode></>,
                    "Method：POST",
                  ]}
                />
              </Fragment>,
              <Fragment key="f15">
                在 Headers 选项卡中添加：
                <BulletList
                  items={[
                    "Header name：X-API-Key",
                    "Header value：YOUR_API_KEY",
                  ]}
                />
              </Fragment>,
              "把 Body type 设为“multipart/form-data”",
              <Fragment key="f16">
                添加表单字段：
                <BulletList
                  items={[
                    "flow_id：YOUR_FLOW_ID",
                    "file：（从上一个模块映射）",
                    "source：api（可选）",
                  ]}
                />
              </Fragment>,
              "运行场景进行测试",
            ]}
          />

          <h3 className="text-base font-semibold text-[#6c42f0] mt-8 mb-3">
            方法 2：JSON + base64（当你有一个 base64 字符串时）
          </h3>
          <p>如果上一个模块输出的是 base64 字符串而不是文件，请使用这种方法：</p>
          <NumberedList
            items={[
              "把 Body type 设为“Raw”，并选择“JSON (application/json)”",
              <Fragment key="f17">
                在 Headers 选项卡中再添加：
                <BulletList
                  items={[
                    "Header name：Content-Type",
                    "Header value：application/json",
                  ]}
                />
              </Fragment>,
              "把 JSON 请求体设为：",
            ]}
          />
          <CodeBlock lang="JSON" code={JSON_BODY_EXAMPLE} />

          <InfoBox color="blue" icon={<Info size={20} />} title="映射 base64 内容">
            把 {"{{previous_module.base64_content}}"} 替换为上一个模块的实际映射。在 Make
            中，点击该字段，并选择提供文件的那个模块的 base64 输出。请在 filename 中保留扩展名：Tavnit 用它来识别文件类型。
          </InfoBox>
          <p>
            调用会立即返回一个 <InlineCode>run_id</InlineCode>。提取出的数据稍后会通过 Flow 的 webhook
            送达，你也可以用第二个 HTTP 模块调用{" "}
            <InlineCode>{"GET https://run.tavnit.io/api/runs/{run_id}"}</InlineCode> 来获取。
          </p>
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="其他平台（Zapier、Power Automate、n8n）">
          <p>同样的方法适用于任何支持 HTTP 请求的自动化平台：</p>
          <InfoBox color="purple" icon={<Paperclip size={20} />} title="如果你的平台给你的是文件对象">
            使用 multipart/form-data，在“file”字段中放入文件，并加上 flow_id 字段。
          </InfoBox>
          <InfoBox color="violet" icon={<Code2 size={20} />} title="如果你的平台给你的是 base64 字符串">
            使用包含 flow_id、filename 和 file_base64（上一步的 base64 内容）的 JSON 请求体。
          </InfoBox>
          <p>
            两种方法调用的是同一个端点，提取结果完全相同。要处理存入 Google Drive、OneDrive 或 Dropbox
            的文件，请以“文件夹中的新文件”作为触发条件，并以同样的方式 POST 该文件。
          </p>
        </DocCard>

        <DocCard icon={<FolderInput size={24} />} title="使用 Collections API">
          <p>
            如果你收到不同类型的文档，并希望由 AI 把每份文档路由到正确的 Flow，请调用 Collection 而不是 Flow。
          </p>
          <BulletList
            items={[
              <Fragment key="f18">URL：<InlineCode>https://run.tavnit.io/api/collections/process</InlineCode></Fragment>,
              <Fragment key="f19">用 <InlineCode>collection_id</InlineCode> 代替 <InlineCode>flow_id</InlineCode></Fragment>,
            ]}
          />
          <CodeBlock lang="JSON" code={COLLECTIONS_JSON_EXAMPLE} />
        </DocCard>

        <DocCard icon={<Split size={24} />} title="使用 Splitters API">
          <p>
            如果你收到包含多份文档的合并 PDF，并且需要把它们分开，请调用 Splitter。
          </p>
          <BulletList
            items={[
              <Fragment key="f22">URL：<InlineCode>https://run.tavnit.io/api/splits/run</InlineCode></Fragment>,
              <Fragment key="f23">用 <InlineCode>splitter_id</InlineCode> 代替 <InlineCode>flow_id</InlineCode></Fragment>,
            ]}
          />
          <CodeBlock lang="JSON" code={SPLITTERS_JSON_EXAMPLE} />
        </DocCard>

        <DocCard icon={<Route size={24} />} title="启动 Pipeline">
          <p>
            要运行整个 Pipeline 而不是单个 Flow，请使用同样的请求头，把文件（multipart{" "}
            <InlineCode>file</InlineCode>，或 JSON <InlineCode>file_base64</InlineCode> +{" "}
            <InlineCode>filename</InlineCode>）POST 到{" "}
            <InlineCode>https://run.tavnit.io/api/pipelines/YOUR_PIPELINE_ID/execute</InlineCode>。Pipeline ID 放在
            URL 中。
          </p>
        </DocCard>

        <DocCard icon={<Wand2 size={24} />} title="使用 Cleaners API">
          <p>
            要从你的自动化中清洗多行数据，请把它们以 JSON 形式发送给 Cleaner。电子表格文件则改为发送到{" "}
            <InlineCode>https://run.tavnit.io/api/sweeps/run</InlineCode>，使用 multipart 并附带{" "}
            <InlineCode>cleaner_id</InlineCode>（该端点不接受 base64）。
          </p>
          <BulletList
            items={[
              <Fragment key="f20">URL：<InlineCode>https://run.tavnit.io/api/cleaners/YOUR_CLEANER_ID/process</InlineCode></Fragment>,
              "Method：POST，Content-Type：application/json",
            ]}
          />
          <CodeBlock lang="JSON" code={CLEANERS_JSON_EXAMPLE} />
        </DocCard>

        <DocCard icon={<Database size={24} />} title="使用 Buckets API">
          <p>
            要在不发送文档的情况下把行推送到 Bucket，请使用写入端点。每一行都必须包含 Bucket 的所有列。
          </p>
          <BulletList
            items={[
              <Fragment key="f24">URL：<InlineCode>https://run.tavnit.io/api/buckets/write</InlineCode></Fragment>,
              "Method：POST，Content-Type：application/json",
              <Fragment key="f25">Header：<InlineCode>X-API-Key: YOUR_API_KEY</InlineCode></Fragment>,
            ]}
          />
          <CodeBlock lang="JSON" code={BUCKETS_JSON_EXAMPLE} />
          <InfoBox color="purple" icon={<Info size={20} />} title="查找 Bucket 的 ID 和名称">
            打开 Bucket 的详情页并点击信息图标。两个值都可以一键复制。
          </InfoBox>
        </DocCard>

        <DocCard icon={<ClipboardCheck size={24} />} title="其他功能">
          <p>
            Agent、Matcher、Inspector、Filler、Signal、Subject 和 Net 都以同样的方式启动：一个带有{" "}
            <InlineCode>X-API-Key</InlineCode> 请求头的 HTTP 请求。切换到 <strong>Code</strong>{" "}
            选项卡即可查看每个端点的字段。
          </p>
        </DocCard>
      </div>

      <Related
        links={[
          {
            href: "/docs/webhooks",
            label: "通过 webhook 接收结果",
            description: "Run 完成时 Tavnit 发送的负载，以及如何构建接收端。",
          },
          {
            href: "/docs/mcp-connector",
            label: "通过 MCP 连接器接入 AI 助手",
            description: "在 claude.ai、Cursor 或其他 MCP 客户端中使用 Tavnit。",
          },
          {
            href: "/docs/user-roles",
            label: "用户角色与权限",
            description: "为什么仅 HITL 的密钥可以审核却不能处理。",
          },
        ]}
      />
    </section>
  );
}
