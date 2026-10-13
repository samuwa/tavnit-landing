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

/** /ko/docs/mcp-connector — translated from src/app/docs/mcp-connector/page.tsx. */

/** Mirrors the numbered steps rendered under "claude.ai 연결하기". */
export const schema: DocsPageSchemaData = {
  howTo: {
    name: "MCP 커넥터로 Tavnit을 claude.ai에 연결하기",
    description:
      "통합 페이지에서 Tavnit 커넥터 URL을 생성하고 claude.ai에 사용자 지정 커넥터로 추가하면, 어시스턴트가 Tavnit 데이터로 작업할 수 있어요.",
    steps: [
      {
        name: "Tavnit에서 통합 열기",
        text: "Tavnit 앱에 로그인하고 사이드바에서 통합을 여세요. 어시스턴트가 접근해야 할 데이터가 있는 조직에 있는지 확인하세요.",
      },
      {
        name: "커넥터 URL 생성",
        text: "사용자 지정 커넥터 카드에서 커넥터 URL 생성을 선택하세요. Tavnit이 API 키로 URL을 발급하고, 생성 시각과 만료 시각을 보여 줘요.",
      },
      {
        name: "URL 복사",
        text: "복사 버튼으로 커넥터 URL을 복사하세요. URL은 비밀번호처럼 다루세요.",
      },
      {
        name: "claude.ai에 사용자 지정 커넥터로 추가",
        text: "claude.ai에서 Settings, Connectors, Add custom connector 순서로 이동한 뒤 URL을 붙여 넣으세요. 사용자 지정 커넥터는 Claude Pro 이상 플랜이 필요해요.",
      },
      {
        name: "연결 확인",
        text: "새 채팅을 시작하고 어시스턴트에게 어떤 Tavnit 도구가 있는지 물어보세요. 도구 목록을 보여 주면 커넥터가 작동하는 거예요.",
      },
    ],
  },
};

export default function McpConnectorKo() {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        MCP 커넥터
      </h1>

      <DocCard icon={<Plug size={24} />} title="MCP 커넥터가 하는 일">
        <Lead>
          MCP 커넥터는 Tavnit 조직을 AI 어시스턴트 안의 도구로 추가해요. 연결하고 나면 Tavnit
          데이터에 대해 평소 말투로 질문할 수 있고, 어시스턴트는 추측하는 대신 실제 계정의 데이터로
          답해요.
        </Lead>
        <p>
          MCP(Model Context Protocol)는 AI 어시스턴트가 외부 도구를 호출할 수 있게 해 주는 개방형
          표준이에요. Tavnit은 <InlineCode>mcp.tavnit.io</InlineCode>에서 MCP 서버를 운영하고,
          커넥터 URL은 클라이언트를 내 조직으로 연결해 주는 자격 증명이에요.{" "}
          <strong>claude.ai</strong>(Pro 이상), <strong>Cursor</strong>, 그리고 원격 MCP 서버
          URL을 받는 모든 클라이언트에서 작동해요.
        </p>
        <p>
          커넥터의 용도와 채팅에 파일을 붙여 넣는 방식과의 차이는{" "}
          <Link href={localizedPath("/integrations/mcp", "ko")} className="text-accent hover:underline">
            MCP 커넥터 개요
          </Link>
          에서 확인하세요.
        </p>
        <InfoBox color="blue" icon={<Info size={20} />} title="요청 시 활성화">
          커넥터는 조직별로 활성화돼요. 통합 페이지에 사용자 지정 커넥터 카드가 보이지 않으면
          지원팀에 조직의 커넥터 활성화를 요청하세요.
        </InfoBox>
      </DocCard>

      <DocCard icon={<KeyRound size={24} />} title="시작하기 전에">
        <Lead>
          세 가지가 필요해요. 커넥터가 활성화된 조직, API 키, 그리고 MCP 클라이언트예요. 커넥터는
          본인의 키로 발급되므로 생성할 때 있던 조직에만 접근하고, 어시스턴트는 그 키로 작업해요.
        </Lead>
        <DataTable
          head={["필요한 것", "확인하는 곳"]}
          rows={[
            [
              "사용자 지정 커넥터 카드",
              <Fragment key="f0">
                <strong>통합</strong> 페이지에 있어요. 조직에 커넥터가 활성화된 경우에만 보여요.
                보이지 않으면 지원팀에 문의하세요.
              </Fragment>,
            ],
            [
              "API 키",
              <Fragment key="f1">
                같은 페이지의 <strong>API 키</strong> 카드예요. 키는 조직마다 멤버 한 명당 하나예요.{" "}
                <em>No API key found. Please log in again.</em>라고 표시되면 로그아웃했다가 다시
                로그인하세요.
              </Fragment>,
            ],
            [
              "MCP 클라이언트",
              <Fragment key="f2">
                Pro 이상 플랜의 claude.ai, Cursor, 또는 원격 MCP 서버 URL을 받는 모든 클라이언트.
              </Fragment>,
            ],
            [
              "역할",
              <Fragment key="f3">
                어시스턴트는 내 API 키를 사용하므로 키로 할 수 있는 일만 할 수 있어요. 예를 들어{" "}
                <strong>HITL 전용</strong> 역할의 키는 처리 요청에서 거부돼요.{" "}
                <DocLink href="/docs/user-roles">사용자 역할</DocLink>과{" "}
                <DocLink href="/docs/api-integration">API 페이지</DocLink>를 참고하세요.
              </Fragment>,
            ],
          ]}
        />
      </DocCard>

      <DocCard icon={<Settings2 size={24} />} title="claude.ai 연결하기">
        <Lead>
          Tavnit에서 URL을 생성한 다음 claude.ai에 사용자 지정 커넥터로 붙여 넣으세요. 설치할 것도,
          수정할 설정 파일도 없어요.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f4">
              Tavnit 사이드바에서 <strong>통합</strong>을 여세요. 먼저 조직 전환기를 확인하세요.
              커넥터는 현재 있는 조직에 연결돼요.
            </Fragment>,
            <Fragment key="f5">
              <strong>사용자 지정 커넥터</strong> 카드에서 <strong>커넥터 URL 생성</strong>을
              선택하세요.
            </Fragment>,
            <Fragment key="f6">복사 버튼으로 URL을 복사하세요.</Fragment>,
            <Fragment key="f7">
              claude.ai에서 <strong>Settings → Connectors → Add custom connector</strong>로 이동해
              URL을 붙여 넣으세요.
            </Fragment>,
            <Fragment key="f8">
              새 채팅을 열고 어시스턴트에게 어떤 Tavnit 도구가 있는지 물어보세요. 도구 목록을 보여
              주면 커넥터가 작동하는 거예요.
            </Fragment>,
          ]}
        />
      </DocCard>

      <DocCard icon={<Settings2 size={24} />} title="Cursor 또는 다른 MCP 클라이언트 연결하기">
        <Lead>
          원격 MCP 서버를 지원하는 클라이언트라면 같은 URL을 사용해요. 명령 기반 서버가 아니라 원격
          (URL) 서버로 추가하세요. 커넥터는 호스팅된 서버를 가리키므로 로컬에서 실행할 프로세스가
          없어요.
        </Lead>
        <NumberedList
          items={[
            "위와 같이 통합 페이지에서 커넥터 URL을 생성하고 복사하세요.",
            <Fragment key="f9">
              Cursor에서 MCP 설정을 열고 <strong>remote</strong> / URL 유형의 새 서버를 추가하세요.
            </Fragment>,
            <Fragment key="f10">
              커넥터 URL을 서버 URL로 붙여 넣으세요. URL에 자격 증명이 이미 들어 있으므로 별도의 API
              키 입력란은 필요 없어요.
            </Fragment>,
            "클라이언트를 다시 불러오고 도구 목록에 Tavnit이 나타나는지 확인하세요.",
          ]}
        />
        <InfoBox color="blue" icon={<Info size={20} />} title="URL 하나, 여러 클라이언트">
          커넥터 URL은 한 번에 하나만 가질 수 있고, 여러 클라이언트에 붙여 넣을 수 있어요. 모든
          클라이언트가 같은 조직에서 나로서 작업하므로, 새로 고치면 모두 한꺼번에 연결이 끊겨요.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Sparkles size={24} />} title="어시스턴트가 할 수 있는 일">
        <Lead>
          커넥터를 통해 어시스턴트는 내 API 키로 조직의 Tavnit 데이터를 다뤄요. Flow, Cleaner,
          Pipeline, 팀을 만들고 구성하는 일은 앱에서 해요.
        </Lead>
        <p>
          커넥터가 제공하는 도구는 MCP 클라이언트에 나열되며, 가장 빨리 확인하는 방법은
          어시스턴트에게 물어보는 거예요. 평소 말투로 질문하고, 가리키는 Flow, Bucket, Run의 이름을
          앱에 표시된 그대로 말하세요.
        </p>
        <InfoBox color="blue" icon={<Info size={20} />} title="내 데이터, 내 조직">
          커넥터는 생성된 조직에만 접근해요. 다른 조직에서 작업하려면 Tavnit에서 그 조직으로 전환해
          거기서 URL을 생성하세요. 어시스턴트에서 시작한 작업도 다른 Run과 똑같이 설정을 따라요.
          Flow에 <DocLink href="/docs/human-in-the-loop">사람 검토</DocLink>가 설정되어 있으면 Run은
          여전히 검토를 기다려요.
        </InfoBox>
      </DocCard>

      <DocCard icon={<RefreshCw size={24} />} title="만료와 새로 고침">
        <Lead>
          커넥터 URL에는 유효 기간이 있어요. 사용자 지정 커넥터 카드에는 URL의 생성 시각과 남은
          기간이 표시되고, 마지막 24시간 동안에는 경고가 나타나요. 새로 고치면 새 URL이 발급되고
          이전 URL은 즉시 무효화돼요.
        </Lead>
        <DataTable
          head={["상태", "표시되는 내용", "해야 할 일"]}
          rows={[
            [
              "활성",
              <Fragment key="s0">
                URL, 생성 시각(<em>created …</em>), 만료까지 남은 일수(<em>expires in …d</em>).
              </Fragment>,
              "없음.",
            ],
            [
              "곧 만료(24시간 미만)",
              <Fragment key="f16">
                시간 또는 분 단위의 남은 시간과 노란색 알림:{" "}
                <em>커넥터가 곧 만료돼요 — 중단을 피하려면 지금 새로 고치세요.</em>
              </Fragment>,
              "새로 고친 다음, 이 URL을 쓰는 모든 클라이언트에 새 URL을 붙여 넣으세요.",
            ],
            [
              "만료됨",
              <Fragment key="f17">
                빨간색 알림: <em>이 커넥터가 만료됐어요. 새로 고쳐 새 URL을 생성하세요.</em>
              </Fragment>,
              "새로 고치고 다시 붙여 넣으세요. 이전 URL을 쓰는 클라이언트는 이미 작동을 멈췄어요.",
            ],
          ]}
        />
        <p>
          새로 고치려면 <strong>URL 새로 고침</strong>을 선택하고{" "}
          <em>커넥터 URL을 새로 고칠까요?</em> 대화 상자에서 <strong>새로 고침</strong>으로
          확인하세요.
        </p>
        <WarningBox>
          새로 고침은 단계적으로 준비할 수 있는 교체가 아니에요. 확인하는 순간 이전 URL은 작동을
          멈추고, 그 URL을 쓰는 모든 어시스턴트는 새 URL을 붙여 넣을 때까지 실패해요. 클라이언트를
          바로 업데이트할 수 있을 때 새로 고치세요.
        </WarningBox>
      </DocCard>

      <DocCard icon={<AlertTriangle size={24} />} title="URL은 비밀번호처럼 다루세요">
        <Lead>
          커넥터 URL은 자격 증명이에요. URL을 가진 사람은 누구나 로그인하지 않고도 나로서 조직의
          데이터에 접근할 수 있어요. MCP 클라이언트 설정에 붙여 넣는 것은 안전하지만, 티켓, 채팅
          메시지, 스크린샷으로 공유하는 것은 안전하지 않아요.
        </Lead>
        <BulletList
          items={[
            "저장소에 커밋하거나 공유 문서에 붙여 넣지 마세요.",
            "스크린샷을 공유하기 전에 URL을 흐리게 처리하거나 잘라 내세요.",
            "유출됐다면 즉시 새로 고치세요. 노출된 URL이 그 자리에서 무효화돼요.",
            "API 키 재생성은 같은 페이지에 있는 별도의 작업이에요. 키 자체가 노출됐다고 생각되면 이것도 하세요.",
          ]}
        />
      </DocCard>

      <DocCard icon={<LifeBuoy size={24} />} title="문제 해결">
        <Lead>
          커넥터 문제는 대부분 네 가지 중 하나예요. 기능이 활성화되지 않았거나, 세션이 만료됐거나,
          URL이 만료됐거나, 클라이언트가 새로 고침으로 대체된 URL을 쓰고 있는 경우예요.
        </Lead>
        <DataTable
          head={["증상", "원인", "해결 방법"]}
          rows={[
            [
              "통합에 사용자 지정 커넥터 카드가 없음",
              "조직에 커넥터가 활성화되지 않았어요.",
              "지원팀에 활성화를 요청하세요.",
            ],
            [
              <Fragment key="f18"><InlineCode>사용자 지정 커넥터에는 유효한 Tavnit 세션이 필요해요. 로그아웃 후 다시 로그인해 보세요.</InlineCode></Fragment>,
              "Tavnit이 URL을 발급하거나 읽기 위해 키를 검증하지 못했어요.",
              "로그아웃했다가 다시 로그인한 뒤 URL을 다시 생성하세요.",
            ],
            [
              "어시스턴트에서 Tavnit이 더 이상 보이지 않음",
              "URL이 만료됐거나 누군가 새로 고쳤어요.",
              "카드에 만료 또는 곧 만료 알림이 있는지 확인하고, 새로 고친 뒤 모든 클라이언트에 다시 붙여 넣으세요.",
            ],
            [
              "어시스턴트가 엉뚱한 데이터를 봄",
              "다른 조직에 있을 때 URL을 생성했어요.",
              "Tavnit에서 조직을 전환하고 새 URL을 생성해 이전 URL을 교체하세요.",
            ],
            [
              "어시스턴트가 작업을 수행하지 못함",
              "내 역할로는 허용되지 않는 작업이에요.",
              "커넥터 오류라고 판단하기 전에 역할을 확인하세요.",
            ],
          ]}
        />
      </DocCard>

      <DocCard icon={<MessageSquare size={24} />} title="API 대신 커넥터를 쓸 때">
        <Lead>
          대화형으로 그때그때 하는 작업에는 커넥터를 쓰세요. 일회성 질문, 저장된 데이터 탐색, 빠른
          확인 같은 작업이에요. 예약 실행, 대량 처리, 다른 시스템에 내장되어 명시적인 오류 처리와
          재시도가 필요한 작업에는 REST API를 쓰세요.
        </Lead>
        <DataTable
          head={["상황", "사용할 것"]}
          rows={[
            ["동료가 지난 분기에 공급업체가 청구한 금액을 물어볼 때", "MCP 커넥터"],
            ["채팅에서 데이터를 탐색하고 싶을 때", "MCP 커넥터"],
            ["공급업체 포털의 모든 송장을 매일 밤 처리할 때", "REST API 또는 이메일 트리거"],
            ["자체 제품에서 추출한 데이터가 필요할 때", "REST API와 webhook"],
          ]}
        />
      </DocCard>

      <Related
        links={[
          {
            href: "/docs/api-integration",
            label: "Tavnit REST API 레퍼런스",
            description:
              "API 키 인증, 요청 필드, 응답, Python과 JavaScript 예제를 포함한 모든 엔드포인트.",
          },
          {
            href: "/docs/buckets",
            label: "추출한 데이터를 Bucket에 저장하기",
            description: "추출한 데이터가 저장되는 구조화된 테이블.",
          },
          {
            href: "/docs/user-roles",
            label: "사용자 역할과 권한",
            description: "소유자, 관리자, 멤버, HITL 전용이 각각 할 수 있는 일.",
          },
        ]}
      />
    </section>
  );
}
