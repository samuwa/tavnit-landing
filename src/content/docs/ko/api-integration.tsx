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
 * /ko/docs/api-integration — translated from components/docs/ApiIntegrationContent.tsx.
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

const FIELD_HEAD = ["필드", "필수", "설명"];

export default function ApiIntegrationKo() {
  const hashNoCode = useSyncExternalStore(subscribeHash, hashIsNoCode, serverHash);
  const [chosenTab, setChosenTab] = useState<ApiTab | null>(null);
  const apiTab: ApiTab = chosenTab ?? (hashNoCode ? "no-code" : "code");
  const [lang, setLang] = useState<Lang>("python");

  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        API 연동
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
          코드
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
          노코드
        </button>
      </div>

      {/* ── Code tab ── */}
      <div role="tabpanel" aria-label="코드" className={apiTab === "code" ? undefined : "hidden"}>
        <DocCard icon={<Info size={24} />} title="API 작동 방식">
          <p>
            Tavnit REST API를 사용하면 앱에서 하는 일을 직접 작성한 코드로 할 수 있어요. Flow,
            Collection, Splitter, Pipeline으로 문서를 보내고, Cleaner, Matcher, Inspector, Filler,
            Signal, Agent를 실행하고, Bucket을 읽고 쓰고, Subject 케이스를 관리하고, 사람 검토를
            승인하거나 거부할 수 있어요.
          </p>
          <BulletList
            items={[
              <Fragment key="b0">
                기본 URL: <InlineCode>https://run.tavnit.io/api</InlineCode>. 아래의 모든 경로는 이
                URL을 기준으로 한 상대 경로예요.
              </Fragment>,
              <Fragment key="b1">
                모든 요청은 <InlineCode>X-API-Key</InlineCode> 헤더에 API 키를 담아요.
              </Fragment>,
              <Fragment key="b2">
                처리는 비동기로 이뤄져요. 작업을 시작하는 엔드포인트는 즉시 ID와 함께{" "}
                <strong>202 Accepted</strong>로 응답하고, 작업은 백그라운드에서 실행돼요. 결과는
                폴링(Run, Agent Run, Catch, 케이스)으로 받거나 해당 기능에 설정한{" "}
                <DocLink href="/docs/webhooks">webhook</DocLink>으로 받아요.
              </Fragment>,
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="베타 기능">
            Pipelines, Subjects, Matchers, Inspectors, Fillers, Signals, Nets는 베타예요. 엔드포인트는
            지금 작동하지만 세부 사항은 바뀔 수 있어요.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Lock size={24} />} title="인증과 ID">
          <h3 className="text-base font-semibold text-fg-2 mt-2 mb-1">API 키</h3>
          <p>
            앱 사이드바에서 <strong>통합</strong>을 여세요. <strong>API 키</strong> 카드에 키가
            표시돼요(여기서 키를 보고 복사할 수 있어요). 멤버마다 조직별로 자체 키가 있으며, 요청은
            해당 조직에서 그 멤버로서 실행돼요.
          </p>
          <WarningBox>
            API 키는 비밀로 유지하세요. 같은 카드의 <strong>다시 생성</strong>을 누르면 현재 키가
            즉시 무효화되고, 그 키를 아직 쓰는 모든 것이 작동을 멈춰요.
          </WarningBox>
          <p>유효한 키가 없는 요청은 다음 응답을 받아요.</p>
          <CodeBlock
            lang="401"
            code={`{
  "success": false,
  "error": "Authentication required",
  "message": "Please provide a valid X-API-Key header"
}`}
          />

          <h3 className={H3}>역할</h3>
          <p>
            키에는 내 역할이 담겨요. <strong>HITL 전용</strong> 역할의 멤버는 사람 검토 승인·거부
            엔드포인트와 API 키 엔드포인트만 쓸 수 있어요. 모든 처리 및 데이터 엔드포인트는{" "}
            <strong>403</strong>과 <InlineCode>Your role only permits HITL reviews</InlineCode>로
            거부해요. <DocLink href="/docs/user-roles">사용자 역할</DocLink>을 참고하세요.
          </p>

          <h3 className={H3}>ID</h3>
          <p>
            Flow, Collection, Splitter, Cleaner, Bucket, Agent, Matcher, Inspector, Filler,
            Pipeline은 각 상세 페이지에 복사 버튼과 함께 ID를 표시해요. 리소스는 키가 속한 조직의
            것이어야 해요. 다른 조직의 ID를 쓰면 403 또는 404로 응답해요.
          </p>
        </DocCard>

        <DocCard icon={<Download size={24} />} title="파일 보내기">
          <p>문서를 받는 엔드포인트는 두 가지 방식 중 하나로 문서를 받아요.</p>
          <InfoBox color="purple" icon={<Paperclip size={20} />} title="Multipart 파일 업로드">
            파일을 multipart/form-data로 file이라는 필드에 담아 보내고, 다른 필드는 폼 필드로
            보내세요. 모든 파일 엔드포인트에서 작동해요.
          </InfoBox>
          <InfoBox color="violet" icon={<Code2 size={20} />} title="JSON 본문의 Base64">
            file_base64(파일 내용)와 filename(확장자 포함), 그리고 다른 필드를 담은 JSON을
            보내세요. 자동화 도구가 파일 대신 base64를 줄 때 유용해요.
          </InfoBox>
          <DataTable
            head={["엔드포인트", "Base64", "지원 파일"]}
            rows={[
              ["POST /runs/process", "예", "PDF, 이미지(PNG, JPG, JPEG, JFIF, TIF, TIFF, WEBP, BMP, GIF), 스프레드시트(XLSX, XLS, CSV)"],
              ["POST /collections/process", "예", "Run과 동일"],
              ["POST /splits/run", "예", "Run과 동일"],
              ["POST /pipelines/{id}/execute", "예", "PDF와 이미지"],
              ["POST /signals/{id}/run", "예", "오디오: MP3, MP4, MPEG, MPGA, M4A, WAV, WEBM"],
              ["POST /sweeps/run", "아니요", "스프레드시트: CSV, XLSX, XLS"],
              ["Inspector, Filler, Subject, 케이스", "아니요", "multipart 파일로 보낸 문서"],
            ]}
          />
          <p>요청 하나는 최대 150MB까지 가능해요. 파일 형식은 파일 이름의 확장자로 판단해요.</p>
        </DocCard>

        <DocCard icon={<ListChecks size={24} />} title="응답과 오류">
          <p>
            응답은 <InlineCode>success</InlineCode> 플래그가 있는 JSON이에요. 오류에는{" "}
            <InlineCode>error</InlineCode> 문자열, 경우에 따라 <InlineCode>message</InlineCode>,
            그리고 문제를 설명하는 추가 키가 담겨요.
          </p>
          <CodeBlock lang="409 예시" code={API_ERROR_EXAMPLE} />
          <DataTable
            head={["상태", "의미"]}
            rows={[
              ["200 / 201", "완료(읽기, 취소, 승인) / 생성됨(케이스, 채우기, 검사)."],
              ["202", "접수됨: 작업이 대기열에 들어갔어요. 반환된 ID를 보관하세요."],
              ["400", "필수 필드가 없거나 잘못됐거나, 파일 형식이 지원되지 않거나, 리소스가 비활성 상태이거나 설정되지 않았어요."],
              ["401", "X-API-Key가 없거나 잘못됐어요."],
              ["402", "조직이 지금은 새 작업을 시작할 수 없어요. Tavnit 팀에 문의하세요."],
              ["403", "리소스가 다른 조직의 것이거나, 역할이 HITL 전용이거나, 해당 항목의 검토자가 아니에요."],
              ["404", "조직에 해당 ID가 없어요."],
              ["409", "현재 상태와 충돌해요: Bucket 이름 불일치, 이미 취소되었거나 완료됨, 케이스 종료됨, 슬롯이 이미 채워짐."],
              ["429", "Agent를 기다리는 Run이 이미 너무 많아요."],
              ["500", "예기치 않은 오류예요. 나중에 다시 시도해도 안전해요."],
            ]}
          />
        </DocCard>

        <DocCard icon={<Layers size={24} />} title="엔드포인트 레퍼런스">
          <DataTable
            head={["기능", "메서드와 경로", "하는 일"]}
            rows={[
              ["Flows", "POST /runs/process", "Flow로 문서 추출"],
              ["Flows", "GET /runs/{run_id}", "Run 상태와 추출된 데이터"],
              ["Flows", "GET /runs/{run_id}/source-file", "원본 문서"],
              ["Collections", "POST /collections/process", "AI가 문서를 알맞은 Flow나 Splitter로 라우팅"],
              ["Collections", "GET /collection-runs/{id}/source-file", "원본 문서"],
              ["Splitters", "POST /splits/run", "여러 문서가 든 파일 분할"],
              ["Splitters", "GET /splits/{split_id}/source-file", "원본 묶음 파일"],
              ["Cleaners", "POST /sweeps/run", "스프레드시트 스윕"],
              ["Cleaners", "POST /cleaners/{cleaner_id}/process", "JSON으로 보낸 행 스윕"],
              ["Buckets", "POST /buckets/write", "행 추가 또는 교체"],
              ["Buckets", "GET /buckets/read", "페이지 단위로 행 읽기"],
              ["Agents", "POST /bots/{agent_id}/runs", "Agent Run 시작"],
              ["Agents", "GET /bot-runs/{bot_run_id}", "Agent Run 하나 폴링"],
              ["Agents", "GET /bots/{agent_id}/runs", "Agent의 Run 목록"],
              ["Agents", "POST /bot-runs/{bot_run_id}/cancel", "Agent Run 취소"],
              ["Matchers", "POST /matchers/{matcher_id}/run", "완료된 Run 매칭"],
              ["Inspectors", "POST /inspectors/{inspector_id}/process", "검사에 문서 추가"],
              ["Fillers", "POST /fillers/{filler_id}/fills", "채우기를 열고 문서 추가"],
              ["Pipelines", "POST /pipelines/{pipeline_id}/execute", "Pipeline 실행"],
              ["Signals", "POST /signals/{signal_id}/run", "오디오 파일 구조화(Wave)"],
              ["Subjects", "POST /subjects/{subject_id}/process", "문서를 케이스로 라우팅"],
              ["Nets", "POST /nets/{net_id}/catch", "Catch 시작"],
              ["사람 검토", "POST /runs/{run_id}/hitl/approve", "일시 중지된 항목 승인 또는 거부"],
              ["API 키", "GET /me/api-key", "키 읽기 또는 다시 생성"],
            ]}
          />
          <p>각 기능은 다른 엔드포인트와 함께 아래에서 자세히 설명해요.</p>
        </DocCard>

        {/* ── Flows ── */}
        <DocCard icon={<FileText size={24} />} title="Flows: 문서 처리">
          <p>문서 하나를 Flow로 보내세요. Tavnit이 Run을 만들고 백그라운드에서 추출해요.</p>
          <Endpoint method="POST" path="/runs/process" />
          <DataTable
            head={FIELD_HEAD}
            rows={[
              ["flow_id", "예", "문서를 추출할 Flow."],
              ["file", "예*", "문서(multipart)."],
              ["file_base64 + filename", "예*", "file 대신: base64 내용과 확장자를 포함한 파일 이름."],
              ["content_type", "아니요", "base64 파일의 MIME 유형."],
              ["source", "아니요", "Run에 저장되는 라벨: api(기본값), email, manual_upload 또는 collection."],
            ]}
            caption="* file 또는 file_base64 + filename 중 하나를 보내세요."
          />
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python" code={PYTHON_CODE} />
          ) : (
            <CodeBlock lang="JavaScript" code={JAVASCRIPT_CODE} />
          )}
          <CodeBlock lang="202 응답" code={RUN_PROCESS_RESPONSE} />
          <p>
            오류: 400(파일 없음, flow_id 없음, 지원되지 않거나 잘못된 파일), 403(다른 조직의 Flow),
            404(Flow를 찾을 수 없음). 거부된 요청도 가능하면 실패한 Run을 만들고 그{" "}
            <InlineCode>run_id</InlineCode>를 반환하므로 <strong>Runs</strong>에서 찾을 수 있어요.
          </p>

          <h3 className={H3}>Run과 데이터 가져오기</h3>
          <Endpoint method="GET" path="/runs/{run_id}" />
          <p>
            <InlineCode>status</InlineCode>가 최종 상태가 될 때까지 폴링하세요. 상태:{" "}
            <InlineCode>queued</InlineCode>, <InlineCode>running</InlineCode>,{" "}
            <InlineCode>awaiting_approval</InlineCode>(
            <DocLink href="/docs/human-in-the-loop">사람 검토</DocLink>를 위해 일시 중지됨),{" "}
            <InlineCode>completed</InlineCode>, <InlineCode>failed</InlineCode>,{" "}
            <InlineCode>cancelled</InlineCode>. <InlineCode>data</InlineCode>에는 추출된 행이 담기며,
            Run이 완료될 때까지는 승인을 기다리는 동안을 포함해 <InlineCode>null</InlineCode>로
            남아요. <InlineCode>columns</InlineCode>가 있으면 열 순서는 이 값을 따르세요.{" "}
            <InlineCode>attempt</InlineCode>와 <InlineCode>previous_attempts</InlineCode>는 자동
            재시도를 보여 줘요. <InlineCode>?include_document=true</InlineCode>를 추가하면 원본
            파일의 서명된 링크도 받을 수 있어요. Collection, Splitter, Pipeline, 이메일로 생성된
            Run을 포함해 모든 Run에서 작동해요.
          </p>
          <CodeBlock lang="200 응답" code={RUN_GET_RESPONSE} />
          {lang === "python" ? (
            <CodeBlock lang="Python (제출 후 폴링)" code={PYTHON_RUN_POLL_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (제출 후 폴링)" code={JAVASCRIPT_RUN_POLL_CODE} />
          )}

          <h3 className={H3}>원본 문서 가져오기</h3>
          <Endpoint method="GET" path="/runs/{run_id}/source-file" />
          <p>
            Run 상태와 관계없이 업로드된 그대로의 파일에 대한 서명된 URL을 반환해요. 선택 사항인{" "}
            <InlineCode>expires_in</InlineCode>은 링크 유효 시간을 초 단위로 지정해요(60~604800,
            기본값 7일). <InlineCode>?download=true</InlineCode>를 쓰면 응답이 파일 자체예요.
          </p>
          <CodeBlock lang="200 응답" code={SOURCE_FILE_RESPONSE} />
        </DocCard>

        {/* ── Collections ── */}
        <DocCard icon={<FolderInput size={24} />} title="Collections: AI로 문서 라우팅">
          <p>
            Flow를 고르지 않고 문서를 보내세요. AI가 Collection에서 가장 알맞은 Flow나 Splitter를
            골라요. 여러 유형의 문서를 받을 때 쓰세요.
          </p>
          <Endpoint method="POST" path="/collections/process" />
          <p>
            본문은 <InlineCode>/runs/process</InlineCode>와 같고, <InlineCode>flow_id</InlineCode>{" "}
            대신 <InlineCode>collection_id</InlineCode>를 써요(또는 ID를 경로에 넣으세요:{" "}
            <InlineCode>{"/collections/{collection_id}/process"}</InlineCode>). Collection은 활성
            상태여야 하고 활성 Flow나 Splitter가 하나 이상 있어야 해요. 그렇지 않으면 400으로
            응답해요.
          </p>
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python (Collections)" code={PYTHON_COLLECTIONS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Collections)" code={JAVASCRIPT_COLLECTIONS_CODE} />
          )}
          <CodeBlock lang="202 응답" code={COLLECTION_PROCESS_RESPONSE} />
          <p>
            선택된 Flow는 일반 Run을 만들고, 그 webhook 페이로드에는{" "}
            <InlineCode>collection_run_id</InlineCode>가 들어 있어 결과를 요청과 연결할 수 있어요.
            원본은{" "}
            <InlineCode>{"GET /collection-runs/{collection_run_id}/source-file"}</InlineCode>에서
            바로 받을 수 있어요(Run 원본 파일과 같은 옵션).{" "}
            <DocLink href="/docs/collections">Collections</DocLink>를 참고하세요.
          </p>
        </DocCard>

        {/* ── Splitters ── */}
        <DocCard icon={<Split size={24} />} title="Splitters: 여러 문서가 든 파일 분할">
          <p>
            여러 문서가 든 파일을 보내세요. Splitter가 각 문서의 시작과 끝을 찾아 분류하고, 문서
            유형에 지정된 곳으로 각 부분을 보내요.
          </p>
          <Endpoint method="POST" path="/splits/run" />
          <p>
            본문은 <InlineCode>/runs/process</InlineCode>와 같고,{" "}
            <InlineCode>splitter_id</InlineCode>를 써요.
          </p>
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python (Splitters)" code={PYTHON_SPLITTERS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Splitters)" code={JAVASCRIPT_SPLITTERS_CODE} />
          )}
          <CodeBlock lang="202 응답" code={SPLIT_RUN_RESPONSE} />
          <p>
            Flow로 보낸 부분은 각각 별도의 Run이 되고, 그 webhook에는{" "}
            <InlineCode>split_id</InlineCode>가 담겨요. 원본 묶음 파일은{" "}
            <InlineCode>{"GET /splits/{split_id}/source-file"}</InlineCode>에 있어요.{" "}
            <DocLink href="/docs/splitters">Splitters</DocLink>를 참고하세요.
          </p>
        </DocCard>

        {/* ── Cleaners ── */}
        <DocCard icon={<Wand2 size={24} />} title="Cleaners: 스윕 실행">
          <p>
            스윕은 데이터 행에 Cleaner를 실행해 값을 정규화, 분류, 조회하거나 보강해요. 행은
            스프레드시트나 JSON으로 보내세요.
          </p>
          <Endpoint method="POST" path="/sweeps/run" />
          <DataTable
            head={FIELD_HEAD}
            rows={[
              ["cleaner_id", "예", "실행할 Cleaner."],
              ["file", "예", "CSV, XLSX 또는 XLS, multipart만 가능. 첫 행이 헤더이며, Cleaner가 요구하는 모든 기본 필드가 중복 없이 열로 있어야 해요."],
              ["sheet_name", "아니요", "통합 문서에서 읽을 시트(기본값: 첫 번째 시트)."],
            ]}
          />
          <Endpoint method="POST" path="/cleaners/{cleaner_id}/process" />
          <p>
            <InlineCode>rows</InlineCode>(객체 배열)를 담은 JSON을 보내거나, 위와 같이 multipart{" "}
            <InlineCode>file</InlineCode>을 보내세요.
          </p>
          <CodeBlock lang="JSON 본문" code={CLEANERS_JSON_EXAMPLE} />
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python (Cleaners)" code={PYTHON_CLEANERS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Cleaners)" code={JAVASCRIPT_CLEANERS_CODE} />
          )}
          <CodeBlock lang="202 응답" code={SWEEP_RUN_RESPONSE} />
          <p>
            설정이 잘못된 Cleaner는 <InlineCode>validation_errors</InlineCode>와 함께 400으로
            응답해요. <DocLink href="/docs/cleaners">Cleaners</DocLink>를 참고하세요.
          </p>
        </DocCard>

        {/* ── Buckets ── */}
        <DocCard icon={<Database size={24} />} title="Buckets: 행 쓰기와 읽기">
          <p>
            자체 시스템에서 Bucket으로 행을 넣거나, Flow가 저장한 내용을 읽으세요. Bucket ID와 이름은
            Bucket 페이지의 정보 아이콘을 탭하면 찾을 수 있어요. 이름은 안전 확인용이에요. ID와
            일치하지 않으면 <strong>409</strong>로 응답해요.
          </p>
          <Endpoint method="POST" path="/buckets/write" />
          <DataTable
            head={FIELD_HEAD}
            rows={[
              ["bucket_id", "예", "대상 Bucket."],
              ["bucket_name", "예", "Bucket의 정확한 이름."],
              ["overwrite", "예", "불리언. false는 행을 추가하고, true는 기존 행을 모두 교체해요."],
              ["rows", "예", "객체 배열, 요청당 최대 50,000개."],
            ]}
          />
          <p>
            본문은 <InlineCode>application/json</InlineCode>으로 보내세요. 모든 행에는 Bucket의
            열이 열 이름이나 표시 이름으로 정확히 있어야 해요. 열이 빠지거나 알 수 없는 열이 있으면
            쓰기 전체가 400으로 중단되고, <InlineCode>missing_columns</InlineCode>와{" "}
            <InlineCode>extra_columns</InlineCode>가 표시돼요.
          </p>
          <LangToggle lang={lang} setLang={setLang} />
          {lang === "python" ? (
            <CodeBlock lang="Python (Buckets)" code={PYTHON_BUCKETS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Buckets)" code={JAVASCRIPT_BUCKETS_CODE} />
          )}
          <CodeBlock lang="202 응답" code={BUCKET_WRITE_RESPONSE} />

          <h3 className={H3}>행 읽기</h3>
          <Endpoint method="GET" path="/buckets/read" />
          <p>
            쿼리 매개변수: <InlineCode>bucket_id</InlineCode>와{" "}
            <InlineCode>bucket_name</InlineCode>(필수), <InlineCode>limit</InlineCode>(1~1000,
            기본값 100), <InlineCode>offset</InlineCode>(기본값 0).{" "}
            <InlineCode>has_more</InlineCode>가 true인 동안 <InlineCode>offset</InlineCode>으로
            페이지를 넘기세요. <InlineCode>total_count</InlineCode>는 전체 행 수예요. 행{" "}
            <InlineCode>data</InlineCode>의 키는 열 이름이며, 표시 이름은{" "}
            <InlineCode>columns</InlineCode>를 쓰세요. 저장된 파일 링크는 새로 서명된 URL로
            반환돼요.
          </p>
          <CodeBlock lang="요청" code={BUCKET_READ_REQUEST} />
          <CodeBlock lang="200 응답" code={BUCKET_READ_RESPONSE} />
          <p>
            <DocLink href="/docs/buckets">Buckets</DocLink>를 참고하세요.
          </p>
        </DocCard>

        {/* ── Agents ── */}
        <DocCard icon={<Bot size={24} />} title="Agents: Run 시작과 폴링">
          <p>
            코드에서 Agent를 시작하고 Agent가 수집한 내용을 받으세요. Agent는 요청 시 조직별로
            활성화돼요. 사용하려면 지원팀에 문의하세요.
          </p>
          <Endpoint method="POST" path="/bots/{agent_id}/runs" />
          <p>
            선택 사항인 JSON <InlineCode>{'{"inputs": {...}}'}</InlineCode>은 이번 Run에 한해
            Agent의 입력 변수를 덮어써요. Agent가 선언한 변수만 사용되며, 비밀 값은 절대 받지
            않아요. 본문에 <InlineCode>bot_id</InlineCode>를 넣어{" "}
            <InlineCode>POST /bots/runs</InlineCode>를 호출할 수도 있어요. 호출할 때마다 새 Run이
            시작돼요.
          </p>
          <CodeBlock lang="요청" code={AGENT_TRIGGER_REQUEST} />
          <p>
            <InlineCode>status</InlineCode>는 <InlineCode>queued</InlineCode>이거나, Agent가 한
            번에 Run 하나만 실행하는데 사용 중이면 <InlineCode>waiting</InlineCode>이에요(차례가
            오면 자동으로 시작돼요). Agent가 보관 처리된 경우 409, 대기 중인 Run이 이미 너무 많으면
            429로 응답해요.
          </p>

          <h3 className={H3}>폴링, 목록, 취소</h3>
          <DataTable
            head={["엔드포인트", "하는 일"]}
            rows={[
              ["GET /bot-runs/{bot_run_id}", "Run 하나: 상태, 소요 시간, 입력(비밀 값 제외), 서명된 파일 링크가 포함된 출력. GET /bots/{agent_id}/runs/{bot_run_id}에서도 가능해요."],
              ["GET /bots/{agent_id}/runs", "최신순, 입력과 출력 제외. 쿼리: status(queued, running, completed, failed, cancelled), limit(1~100, 기본값 20), offset. runs와 total을 반환해요."],
              ["POST /bot-runs/{bot_run_id}/cancel", "waiting, queued 또는 running 상태의 Run을 취소해요. Run이 이미 끝났으면 409. POST /bots/{agent_id}/runs/{bot_run_id}/cancel에서도 가능해요."],
            ]}
          />
          <CodeBlock lang="GET /bot-runs/{bot_run_id}" code={AGENT_RUN_RESPONSE} />
          <p>
            <DocLink href="/docs/agents">Agents</DocLink>를 참고하세요.
          </p>
        </DocCard>

        {/* ── Matchers ── */}
        <DocCard icon={<Target size={24} />} title="Matchers: Run 매칭">
          <p>Matcher의 Flow에서 완료된 Run을 비교하세요. 예를 들어 송장과 구매 주문서를 대조할 수 있어요.</p>
          <Endpoint method="POST" path="/matchers/{matcher_id}/run" />
          <DataTable
            head={FIELD_HEAD}
            rows={[
              ["run_ids", "예", "Matcher의 Flow에서 완료된 Run 두 개 이상."],
              ["benchmark_run_id", "벤치마크 모드에서", "다른 Run과 비교할 기준 Run."],
            ]}
          />
          <CodeBlock lang="요청" code={MATCHER_RUN_REQUEST} />
          <p>
            매칭 결과를 읽는 API 엔드포인트는 없어요. 결과는 Matcher의 webhook이나 이메일 출력,
            또는 앱에서 확인하세요. <DocLink href="/docs/matchers">Matchers</DocLink>를
            참고하세요.
          </p>
        </DocCard>

        {/* ── Inspectors ── */}
        <DocCard icon={<ShieldCheck size={24} />} title="Inspectors: 문서 묶음 검사">
          <p>
            검사는 문서를 모아 각 문서를 Inspector의 슬롯에 배정하고, 추출한 뒤 체크리스트를
            평가해요.
          </p>
          <Endpoint method="POST" path="/inspectors/{inspector_id}/process" />
          <p>
            Multipart <InlineCode>file</InlineCode>. <InlineCode>inspection_id</InlineCode>가
            없으면 새 검사가 만들어져요. 반환된 <InlineCode>inspection_id</InlineCode>를 넘기면 그
            검사에 문서를 더 추가할 수 있어요(검사가 아직 수집 중이어야 하며, 아니면 409). Inspector는
            활성 상태여야 해요.
          </p>
          <CodeBlock lang="요청" code={INSPECTOR_PROCESS_REQUEST} />
          <DataTable
            head={["엔드포인트", "하는 일"]}
            rows={[
              ["POST /inspectors/{inspector_id}/inspections", "나중에 문서를 추가할 빈 검사를 만들어요(201)."],
              ["POST /inspections/{inspection_id}/fire", "수집을 멈추고 지금 평가해요. 필수 슬롯에 문서가 없으면 missing_inputs와 함께 400."],
            ]}
          />
          <p>
            결과는 Inspector의 webhook이나 이메일 출력으로 전달돼요.{" "}
            <DocLink href="/docs/inspectors">Inspectors</DocLink>를 참고하세요.
          </p>
        </DocCard>

        {/* ── Fillers ── */}
        <DocCard icon={<FileOutput size={24} />} title="Fillers: PDF 양식 채우기">
          <p>
            채우기는 Filler에 필요한 문서를 모아 추출하고, 그 값을 Filler의 PDF 템플릿에 기입해요.
          </p>
          <DataTable
            head={["엔드포인트", "하는 일"]}
            rows={[
              ["POST /fillers/{filler_id}/fills", "채우기를 열어요(201, fill_id 반환). Filler에 템플릿과 필드 매핑이 있어야 해요."],
              ["POST /fills/{fill_id}/route-upload", "Multipart 파일. AI가 비어 있는 슬롯에 배정해요(202)."],
              ["POST /fills/{fill_id}/inputs/{input_id}/upload", "특정 슬롯용 multipart 파일. 그 슬롯의 Run을 시작해요(202)."],
              ["POST /fills/{fill_id}/inputs/{input_id}/attach-run", "JSON run_id: 완료된 Run을 슬롯에 재사용해요(202)."],
              ["POST /fills/{fill_id}/fire", "모든 슬롯을 기다리지 않고 지금 채워요. 필수 슬롯이 비어 있으면 missing_inputs와 함께 400."],
              ["POST /fillers/{filler_id}/templates", "템플릿 PDF를 추가해요(multipart file, 선택 사항 name). 필드 매핑은 앱에서 하세요."],
            ]}
          />
          <CodeBlock lang="요청" code={FILLER_REQUEST} />
          <p>
            채워진 PDF는 Filler의 webhook이나 이메일 출력으로 전달돼요.{" "}
            <DocLink href="/docs/fillers">Fillers</DocLink>를 참고하세요.
          </p>
        </DocCard>

        {/* ── Pipelines ── */}
        <DocCard icon={<Route size={24} />} title="Pipelines: 실행">
          <p>문서 하나로 Pipeline 실행을 한 번 시작하세요.</p>
          <Endpoint method="POST" path="/pipelines/{pipeline_id}/execute" />
          <p>
            Multipart <InlineCode>file</InlineCode> 또는 <InlineCode>file_base64</InlineCode> +{" "}
            <InlineCode>filename</InlineCode>. PDF 또는 이미지. Pipeline이 비활성 상태이거나
            그래프를 실행할 수 없으면 400(<InlineCode>validation_errors</InlineCode> 포함)으로
            응답해요.
          </p>
          <CodeBlock lang="요청" code={PIPELINE_EXECUTE_REQUEST} />
          <p>
            취소는 <InlineCode>{"POST /pipelines/executions/{execution_id}/cancel"}</InlineCode>로
            해요(실행 중이 아니면 409). 결과는 Pipeline의 Output 노드로 나가요.{" "}
            <DocLink href="/docs/pipelines">Pipelines</DocLink>를 참고하세요.
          </p>
        </DocCard>

        {/* ── Signals ── */}
        <DocCard icon={<AudioLines size={24} />} title="Signals: 오디오 파일 구조화">
          <p>녹음 파일을 보내면 Signal이 구조화된 데이터(Wave)로 바꿔요.</p>
          <Endpoint method="POST" path="/signals/{signal_id}/run" />
          <p>
            Multipart <InlineCode>file</InlineCode> 또는 base64. 오디오는 최대 150MB, 8시간까지
            가능하며, 감지된 음성은 최대 2시간이에요.
          </p>
          <CodeBlock lang="요청" code={SIGNAL_RUN_REQUEST} />
          <p>
            결과는 Signal의 webhook이나 앱에서 확인할 수 있어요.{" "}
            <DocLink href="/docs/signals">Signals</DocLink>를 참고하세요.
          </p>
        </DocCard>

        {/* ── Subjects ── */}
        <DocCard icon={<Briefcase size={24} />} title="Subjects와 케이스">
          <p>Subject의 케이스에 문서를 정리하고, 코드에서 케이스를 관리하세요.</p>
          <DataTable
            head={["엔드포인트", "하는 일"]}
            rows={[
              ["POST /subjects/{subject_id}/process", "Multipart 파일. Tavnit이 케이스로 라우팅해요(202, subject_doc_id 반환)."],
              ["POST /cases/{case_id}/docs", "Multipart 파일을 라우팅 없이 케이스에 바로 넣어요. Subject의 문서 유형이 하나뿐인 경우가 아니면 doc_type_id가 필수예요. run_id를 반환해요(202). 케이스가 종료되었거나 그 문서 유형이 이미 채워졌으면 409."],
              ["POST /subjects/{subject_id}/docs/{doc_id}/assign", "JSON case_id와 doc_type_id: 보류된 문서를 직접 정리해요(202)."],
              ["POST /subjects/{subject_id}/cases", "JSON name(필수, 고유, 최대 200자)과 params(선택 사항, 객체). 케이스를 만들어요(201). 이름이 이미 있으면 409."],
              ["GET /subjects/{subject_id}/cases", "쿼리: state(open 또는 closed), status, search, limit(최대 200, 기본값 50), offset. cases와 total을 반환해요."],
              ["GET /cases/{case_id}", "케이스와 그 문서들. 각 문서에는 GET /runs/{run_id}로 폴링할 run_id가 있어요."],
              ["POST /cases/{case_id}/close", "케이스를 종료해요(200). 이후 들어오는 문서는 정리되지 않고 보류돼요. 이미 종료됐으면 409."],
              ["POST /cases/{case_id}/reopen", "케이스를 다시 열어요(200). 열려 있으면 409."],
              ["POST /cases/{case_id}/inspections", "JSON subject_inspector_id: 연결된 Inspector를 케이스의 완료된 Run에 실행해요(202)."],
            ]}
          />
          <CodeBlock lang="요청" code={CASE_REQUEST} />
          <CodeBlock lang="201 응답" code={CASE_RESPONSE} />
          <p>
            <DocLink href="/docs/subjects">Subjects</DocLink>를 참고하세요.
          </p>
        </DocCard>

        {/* ── Nets ── */}
        <DocCard icon={<Radar size={24} />} title="Nets: Catch 시작">
          <p>Nets는 조직별로 활성화돼요. 권한이 없으면 이 엔드포인트는 403으로 응답해요.</p>
          <Endpoint method="POST" path="/nets/{net_id}/catch" />
          <p>
            본문이 없으면 Catch는 마지막 Catch가 끝난 지점부터 이어서 수집해요. 대신 특정 범위를
            소급해서 수집하려면 <InlineCode>window_start</InlineCode>와/또는{" "}
            <InlineCode>window_end</InlineCode>(ISO 타임스탬프)를 보내세요. Net이 비활성 상태이거나
            마지막 Catch에 이어지는 Catch가 이미 진행 중이면 409로 응답해요.
          </p>
          <CodeBlock lang="요청" code={NET_CATCH_REQUEST} />
          <p>
            <InlineCode>{"GET /catches/{catch_id}"}</InlineCode>를 폴링하세요. 상태, 단계, 개수,
            그리고 완료되면 열과 행이 담긴 <InlineCode>output</InlineCode>을 받아요. 취소는{" "}
            <InlineCode>{"POST /catches/{catch_id}/cancel"}</InlineCode>로 해요.{" "}
            <DocLink href="/docs/nets">Nets</DocLink>를 참고하세요.
          </p>
        </DocCard>

        {/* ── HITL ── */}
        <DocCard icon={<UserCheck size={24} />} title="사람 검토: 승인 또는 거부">
          <p>
            검토를 위해 일시 중지된 항목은 자체 도구에서 승인하거나 거부할 수 있어요. 해당 Flow,
            Matcher, Inspector, Filler에 설정된 검토자만 처리할 수 있고(아니면 403), 항목은{" "}
            <InlineCode>awaiting_approval</InlineCode> 상태여야 해요(아니면 409). 이 엔드포인트는
            HITL 전용 역할도 쓸 수 있어요.
          </p>
          <DataTable
            head={["엔드포인트", "본문"]}
            rows={[
              ["POST /runs/{run_id}/hitl/approve", "output_json(필수): 최종 행. diff(선택 사항, 수정 목록). 필수 사람 입력 필드가 비어 있으면 missing_fields와 함께 400."],
              ["POST /matches/{match_id}/hitl/approve", "groups(최종 그룹), excluded, diff."],
              ["POST /inspections/{inspection_id}/hitl/approve", "waivers(면제할 실패 항목마다 item_id와 reason), diff."],
              ["POST /fills/{fill_id}/hitl/approve", "values(템플릿별 필드 값), diff, allow_missing_human_fields."],
              [".../hitl/reject", "같은 경로에서 끝이 /hitl/reject이며, 선택 사항으로 reason을 보낼 수 있어요."],
            ]}
          />
          <CodeBlock lang="요청" code={HITL_RUN_APPROVE_REQUEST} />
          <p>
            승인하면 전달(webhook, 이메일, Bucket)이 재개돼요. Run을 거부하면 Run이 취소돼요.{" "}
            <DocLink href="/docs/human-in-the-loop">사람 검토</DocLink>를 참고하세요.
          </p>
        </DocCard>

        {/* ── API key ── */}
        <DocCard icon={<KeyRound size={24} />} title="API 키 엔드포인트">
          <DataTable
            head={["엔드포인트", "하는 일"]}
            rows={[
              ["GET /me/api-key", "조직에서 쓰는 내 키를 반환해요."],
              ["POST /me/api-key/regenerate", "새 키를 발급하고 이전 키를 즉시 무효화해요. 모든 연동을 업데이트하세요."],
            ]}
          />
          <CodeBlock lang="200 응답" code={API_KEY_RESPONSE} />
        </DocCard>
      </div>

      {/* ── No-Code tab ── */}
      <div role="tabpanel" aria-label="노코드" className={apiTab === "no-code" ? undefined : "hidden"}>
        <DocCard icon={<Star size={24} />} title="자동화 도구 개요">
          <p>
            Tavnit을 워크플로에 연결하는 데 코드를 작성할 필요는 없어요. HTTP 요청을 보낼 수 있는
            자동화 플랫폼이라면 Tavnit에서 작업을 시작할 수 있고, webhook을 받을 수 있는 플랫폼이라면
            결과를 받을 수 있어요.
          </p>
          <InfoBox color="purple" icon={<CircleDot size={20} />} title="Make">
            시각적 시나리오: HTTP 모듈이 Tavnit을 호출하고 Custom webhook이 결과를 받아요.
          </InfoBox>
          <InfoBox color="yellow" icon={<Zap size={20} />} title="Zapier">
            Webhooks by Zapier: Catch Hook이 결과를 받고 POST 작업이 Run을 시작해요.
          </InfoBox>
          <InfoBox color="green" icon={<CircleDot size={20} />} title="n8n">
            자체 호스팅 또는 클라우드: Webhook 노드가 결과를 받고 HTTP Request 노드가 Run을
            시작해요.
          </InfoBox>
          <InfoBox color="blue" icon={<CircleDot size={20} />} title="Power Automate">
            HTTP 작업으로 같은 방식으로 API를 호출해요.
          </InfoBox>
          <p>
            모든 요청에는 <strong>통합</strong>에서 확인한 키를 담은{" "}
            <InlineCode>X-API-Key</InlineCode> 헤더가 필요해요.
          </p>
        </DocCard>

        <DocCard icon={<Webhook size={24} />} title="자동화에서 결과 받기">
          <NumberedList
            items={[
              "플랫폼에서 webhook 트리거를 만들고(Make: Custom webhook, Zapier: Webhooks by Zapier → Catch Hook, n8n: Webhook 노드, POST) URL을 복사하세요.",
              "Tavnit에서 그 URL을 Flow의 webhook(Webhook 패널)이나 Pipeline Output 노드의 webhook으로 붙여 넣으세요.",
              "문서 하나를 처리해 플랫폼이 페이로드를 인식하게 한 다음, 필드를 Sheets, CRM, ERP 등에 매핑하세요.",
            ]}
          />
          <p>
            페이로드는 <DocLink href="/docs/webhooks">webhook 페이지</DocLink>에서 설명해요.
          </p>
        </DocCard>

        <DocCard icon={<CircleDot size={24} />} title="Make 연동">
          <p>
            Make(구 Integromat)는 코드 없이 앱을 연결하고 워크플로를 자동화할 수 있는 시각적 자동화
            플랫폼이에요.
          </p>
          <a
            href="https://www.make.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-2 transition-colors text-sm font-medium mt-1"
          >
            Make 방문하기 <ExternalLink size={14} />
          </a>
        </DocCard>

        <DocCard icon={<Layers size={24} />} title="Make 시작하기">
          <NumberedList
            items={[
              "make.com에 가서 계정을 만드세요",
              '대시보드에서 "Create a new scenario"를 클릭하세요',
              "모듈을 추가할 수 있는 빈 캔버스가 나타나요",
              '"HTTP"를 검색해 "Make a request" 모듈을 추가하세요',
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="시나리오란 무엇인가요?">
            시나리오는 Make의 자동화된 워크플로예요. 서로 연결된 모듈(앱)로 이뤄지며, 한 모듈이
            트리거되거나 데이터를 받으면 그 데이터를 다음 모듈로 넘겨요.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="HTTP 모듈 구성하기">
          <p>
            HTTP 모듈을 추가했으면 Tavnit으로 문서를 보내도록 구성하세요. 다음 두 가지 방법 중 하나를
            쓸 수 있어요.
          </p>

          <h3 className="text-base font-semibold text-accent mt-6 mb-3">
            방법 1: Multipart/form-data(파일 객체가 있을 때)
          </h3>
          <NumberedList
            items={[
              '시나리오에 HTTP "Make a request" 모듈을 추가하세요',
              <Fragment key="f14">
                요청을 구성하세요.
                <BulletList
                  items={[
                    <>URL: <InlineCode>https://run.tavnit.io/api/runs/process</InlineCode></>,
                    "Method: POST",
                  ]}
                />
              </Fragment>,
              <Fragment key="f15">
                Headers 탭에서 다음을 추가하세요.
                <BulletList
                  items={[
                    "Header name: X-API-Key",
                    "Header value: YOUR_API_KEY",
                  ]}
                />
              </Fragment>,
              'Body type을 "multipart/form-data"로 설정하세요',
              <Fragment key="f16">
                폼 필드를 추가하세요.
                <BulletList
                  items={[
                    "flow_id: YOUR_FLOW_ID",
                    "file: (이전 모듈에서 매핑)",
                    "source: api (선택 사항)",
                  ]}
                />
              </Fragment>,
              "시나리오를 실행해 테스트하세요",
            ]}
          />

          <h3 className="text-base font-semibold text-[#6c42f0] mt-8 mb-3">
            방법 2: JSON + base64(base64 문자열이 있을 때)
          </h3>
          <p>이전 모듈이 파일 대신 base64 문자열을 출력한다면 이 방법을 쓰세요.</p>
          <NumberedList
            items={[
              'Body type을 "Raw"로 설정하고 "JSON (application/json)"을 선택하세요',
              <Fragment key="f17">
                Headers 탭에서 다음도 추가하세요.
                <BulletList
                  items={[
                    "Header name: Content-Type",
                    "Header value: application/json",
                  ]}
                />
              </Fragment>,
              "JSON 본문을 다음과 같이 설정하세요.",
            ]}
          />
          <CodeBlock lang="JSON" code={JSON_BODY_EXAMPLE} />

          <InfoBox color="blue" icon={<Info size={20} />} title="base64 내용 매핑하기">
            {"{{previous_module.base64_content}}"}를 이전 모듈의 실제 매핑으로 바꾸세요. Make에서는
            필드를 클릭한 다음 파일을 제공하는 모듈의 base64 출력을 선택하면 돼요. filename에는
            확장자를 남겨 두세요. Tavnit은 확장자로 파일 형식을 판단해요.
          </InfoBox>
          <p>
            호출하면 즉시 <InlineCode>run_id</InlineCode>로 응답해요. 추출된 데이터는 나중에 Flow의
            webhook으로 도착하며, 두 번째 HTTP 모듈에서{" "}
            <InlineCode>{"GET https://run.tavnit.io/api/runs/{run_id}"}</InlineCode>를 호출해
            가져올 수도 있어요.
          </p>
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="다른 플랫폼(Zapier, Power Automate, n8n)">
          <p>HTTP 요청을 지원하는 자동화 플랫폼이라면 같은 방법이 통해요.</p>
          <InfoBox color="purple" icon={<Paperclip size={20} />} title="플랫폼이 파일 객체를 줄 때">
            파일을 담은 &ldquo;file&rdquo; 필드와 flow_id 필드로 multipart/form-data를 쓰세요.
          </InfoBox>
          <InfoBox color="violet" icon={<Code2 size={20} />} title="플랫폼이 base64 문자열을 줄 때">
            flow_id, filename, file_base64(이전 단계의 base64 내용)를 담은 JSON 본문을 쓰세요.
          </InfoBox>
          <p>
            두 방법 모두 같은 엔드포인트를 호출하며 추출 결과도 같아요. Google Drive, OneDrive,
            Dropbox에 들어오는 파일을 처리하려면 &ldquo;New file in folder&rdquo;를 트리거로 삼고 같은
            방식으로 파일을 POST하세요.
          </p>
        </DocCard>

        <DocCard icon={<FolderInput size={24} />} title="Collections API 사용하기">
          <p>
            여러 유형의 문서를 받고 AI가 각 문서를 알맞은 Flow로 라우팅하게 하려면, Flow 대신
            Collection을 호출하세요.
          </p>
          <BulletList
            items={[
              <Fragment key="f18">URL: <InlineCode>https://run.tavnit.io/api/collections/process</InlineCode></Fragment>,
              <Fragment key="f19"><InlineCode>flow_id</InlineCode> 대신 <InlineCode>collection_id</InlineCode>를 쓰세요</Fragment>,
            ]}
          />
          <CodeBlock lang="JSON" code={COLLECTIONS_JSON_EXAMPLE} />
        </DocCard>

        <DocCard icon={<Split size={24} />} title="Splitters API 사용하기">
          <p>
            여러 문서가 합쳐진 PDF를 받아 분리해야 한다면 Splitter를 호출하세요.
          </p>
          <BulletList
            items={[
              <Fragment key="f22">URL: <InlineCode>https://run.tavnit.io/api/splits/run</InlineCode></Fragment>,
              <Fragment key="f23"><InlineCode>flow_id</InlineCode> 대신 <InlineCode>splitter_id</InlineCode>를 쓰세요</Fragment>,
            ]}
          />
          <CodeBlock lang="JSON" code={SPLITTERS_JSON_EXAMPLE} />
        </DocCard>

        <DocCard icon={<Route size={24} />} title="Pipeline 시작하기">
          <p>
            Flow 하나가 아니라 Pipeline 전체를 실행하려면, 같은 헤더로 파일(multipart{" "}
            <InlineCode>file</InlineCode> 또는 JSON <InlineCode>file_base64</InlineCode> +{" "}
            <InlineCode>filename</InlineCode>)을{" "}
            <InlineCode>https://run.tavnit.io/api/pipelines/YOUR_PIPELINE_ID/execute</InlineCode>로
            POST하세요. Pipeline ID는 URL에 넣어요.
          </p>
        </DocCard>

        <DocCard icon={<Wand2 size={24} />} title="Cleaners API 사용하기">
          <p>
            자동화에서 데이터 행을 정리하려면 행을 JSON으로 Cleaner에 보내세요. 스프레드시트 파일은
            대신 <InlineCode>https://run.tavnit.io/api/sweeps/run</InlineCode>으로{" "}
            <InlineCode>cleaner_id</InlineCode>와 함께 multipart로 보내세요(이 엔드포인트는 base64를
            받지 않아요).
          </p>
          <BulletList
            items={[
              <Fragment key="f20">URL: <InlineCode>https://run.tavnit.io/api/cleaners/YOUR_CLEANER_ID/process</InlineCode></Fragment>,
              "Method: POST, Content-Type: application/json",
            ]}
          />
          <CodeBlock lang="JSON" code={CLEANERS_JSON_EXAMPLE} />
        </DocCard>

        <DocCard icon={<Database size={24} />} title="Buckets API 사용하기">
          <p>
            문서를 보내지 않고 Bucket에 행을 넣으려면 쓰기 엔드포인트를 쓰세요. 각 행에는 Bucket의
            모든 열이 있어야 해요.
          </p>
          <BulletList
            items={[
              <Fragment key="f24">URL: <InlineCode>https://run.tavnit.io/api/buckets/write</InlineCode></Fragment>,
              "Method: POST, Content-Type: application/json",
              <Fragment key="f25">Header: <InlineCode>X-API-Key: YOUR_API_KEY</InlineCode></Fragment>,
            ]}
          />
          <CodeBlock lang="JSON" code={BUCKETS_JSON_EXAMPLE} />
          <InfoBox color="purple" icon={<Info size={20} />} title="Bucket ID와 이름 찾기">
            Bucket 상세 페이지를 열고 정보 아이콘을 탭하세요. 두 값 모두 한 번 탭으로 복사할 수
            있어요.
          </InfoBox>
        </DocCard>

        <DocCard icon={<ClipboardCheck size={24} />} title="기타 기능">
          <p>
            Agent, Matcher, Inspector, Filler, Signal, Subject, Nets도 같은 방식으로 시작해요.{" "}
            <InlineCode>X-API-Key</InlineCode> 헤더를 담은 HTTP 요청이에요. 각 엔드포인트의 필드는{" "}
            <strong>코드</strong> 탭에서 확인하세요.
          </p>
        </DocCard>
      </div>

      <Related
        links={[
          {
            href: "/docs/webhooks",
            label: "webhook으로 결과 받기",
            description: "Run이 완료될 때 Tavnit이 보내는 페이로드와 수신기를 만드는 방법.",
          },
          {
            href: "/docs/mcp-connector",
            label: "MCP 커넥터로 AI 어시스턴트 연결하기",
            description: "claude.ai, Cursor 또는 다른 MCP 클라이언트에서 Tavnit을 사용하세요.",
          },
          {
            href: "/docs/user-roles",
            label: "사용자 역할과 권한",
            description: "HITL 전용 키가 검토는 할 수 있지만 처리는 할 수 없는 이유.",
          },
        ]}
      />
    </section>
  );
}
