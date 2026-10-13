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

/** /ko/docs — translated from src/app/docs/page.tsx. */

/** Mirrors the visible numbered steps under "1단계: Flow 만들기". */
export const schema: DocsPageSchemaData = {
  howTo: {
    name: "Tavnit으로 문서에서 구조화된 데이터 추출하기",
    description:
      "템플릿, 샘플 문서 또는 빈 상태에서 Tavnit Flow를 만들고, 필드를 확인하고, 문서를 처리한 뒤 구조화된 결과를 확인해요. 템플릿을 그릴 필요도, 코드를 작성할 필요도 없어요.",
    steps: [
      {
        name: "만들기 대화 상자 열기",
        text: "Flows 페이지에서 Flow 만들기를 클릭해요.",
      },
      {
        name: "시작 방법 고르기",
        text: "템플릿에서(Tavnit 템플릿 또는 내 Flow의 사본), AI 제안(샘플 PDF나 이미지를 업로드하면 AI가 필드 초안을 작성해요), 처음부터 시작 중 하나를 선택해요.",
      },
      {
        name: "Flow 이름과 설명 입력하기",
        text: "Flow에 3자 이상의 이름과, 어떤 문서를 처리하는지 설명하는 10자 이상의 설명을 입력해요.",
      },
      {
        name: "데이터 스키마 검토하기",
        text: "빌더에서 스키마가 필요한 그대로가 될 때까지 필드를 추가, 편집, 삭제해요. 새 Flow는 처음부터 활성 상태예요.",
      },
      {
        name: "문서 처리하기",
        text: "실행을 클릭하고 실제 문서 하나를 업로드한 뒤 결과를 확인해요.",
      },
    ],
  },
  primaryImage: {
    url: "/assets/tour2-runs.jpg",
    caption:
      "Tavnit의 Runs 페이지: 처리된 모든 문서가 Flow, 소스, 상태와 함께 표시돼요.",
    width: 1327,
    height: 801,
  },
};

export default function GettingStartedKo() {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        시작하기
      </h1>

      <DocCard icon={<Sparkles size={24} />} title="Tavnit이 하는 일">
        <Lead>
          Tavnit은 문서를 읽고 구조화된 데이터를 돌려줘요. 원하는 필드를 한 번만 설명해 두고 송장,
          영수증, 구매 주문서, 거래 내역서, 스프레드시트, 양식을 보내면, 레이아웃마다 템플릿을
          만들거나 파싱 코드를 작성하지 않아도 유형이 지정된 행을 받을 수 있어요.
        </Lead>
        <p>
          추출은 제품의 전부가 아니라 출발점이에요. Tavnit은 추출을 중심으로 들어오는 파일을
          분류하고 나누고, 행을 정리하고 보강하고, 문서끼리 비교하고 검사하고, 양식을 채우고, 사람이
          검토할 수 있도록 일시 중지하고, 결과를 테이블에 저장하고, 여러분의 시스템으로 전달하고,
          그 데이터로 작업하는 브라우저 Agent에게 넘겨줄 수 있어요. 이 페이지에서는 전체 지도를
          보여 드리고 첫 문서를 처리하는 과정을 안내해요.
        </p>
        <InfoBox color="violet" icon={<FlaskConical size={20} />} title="일부 영역은 베타예요">
          Pipelines, Subjects, Matchers, Inspectors, Fillers, Signals, Nets에는 앱에서{" "}
          <strong>베타</strong> 라벨이 붙어 있어요. 지금 바로 사용할 수 있지만, 화면과 옵션은 아직
          바뀔 수 있어요.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Compass size={24} />} title="Tavnit 지도">
        <Lead>
          앱 사이드바는 문서를 받아들이는 일부터 데이터로 작업하는 일까지, 모든 영역을 하는 일에
          따라 묶어 보여 줘요. 문서도 같은 그룹을 따르므로 이 표는 목차 역할도 해요.
        </Lead>
        <DataTable
          head={["그룹", "영역", "하는 일"]}
          rows={[
            [
              "입력",
              <Fragment key="m0">
                <DocLink href="/docs/collections">Collections</DocLink>
              </Fragment>,
              "여러 종류의 문서를 받는 하나의 수신함 또는 엔드포인트예요. 각 문서를 분류해 알맞은 Flow로 보내요.",
            ],
            [
              "입력",
              <Fragment key="m1">
                <DocLink href="/docs/subjects">Subjects</DocLink>
              </Fragment>,
              "구매나 환자 같은 엔터티를 모델링하고, 참조 번호를 기준으로 관련 문서를 케이스로 모아요.",
            ],
            [
              "입력",
              <Fragment key="m2">
                <DocLink href="/docs/splitters">Splitters</DocLink>
              </Fragment>,
              "여러 문서가 담긴 파일 하나를 개별 문서로 나누고, 각각을 다음 단계로 보내요.",
            ],
            [
              "처리",
              <Fragment key="m3">
                <DocLink href="/docs/flows">Flows</DocLink>
              </Fragment>,
              "한 가지 문서 유형의 스키마예요. 추출할 필드와 거기에 연결된 모든 것을 정의해요. 모든 일이 여기서 시작돼요.",
            ],
            [
              "처리",
              <Fragment key="m4">
                <DocLink href="/docs/cleaners">Cleaners</DocLink>
              </Fragment>,
              "추출된 행의 형식을 바꾸고, 변환하고, 계산하고, 조회하고, 검증하며, 이상한 점이 있으면 작업을 실행해요.",
            ],
            [
              "처리",
              <Fragment key="m5">
                <DocLink href="/docs/agents">Agents</DocLink>
              </Fragment>,
              "일상 언어로 적은 미션을 웹사이트에서 수행하는 브라우저 Agent예요. 추출된 데이터를 입력으로 쓰는 경우가 많아요.",
            ],
            [
              "인텔리전스",
              <Fragment key="m6">
                <DocLink href="/docs/matchers">Matchers</DocLink>
              </Fragment>,
              "여러 문서의 레코드를 한 줄씩 비교해요. 견적서끼리 비교하거나 송장을 해당 주문서와 비교할 수 있어요.",
            ],
            [
              "인텔리전스",
              <Fragment key="m7">
                <DocLink href="/docs/inspectors">Inspectors</DocLink>
              </Fragment>,
              "관련 문서 묶음에 체크리스트를 실행하고 통과 또는 실패 판정을 받아요.",
            ],
            [
              "인텔리전스",
              <Fragment key="m8">
                <DocLink href="/docs/fillers">Fillers</DocLink>
              </Fragment>,
              "문서에서 추출한 데이터로 PDF 양식 템플릿을 채워요.",
            ],
            [
              "오케스트레이션",
              <Fragment key="m9">
                <DocLink href="/docs/pipelines">Pipelines</DocLink>
              </Fragment>,
              "시각적 캔버스에서 여러 단계를 처음부터 끝까지 연결해요.",
            ],
            [
              "오케스트레이션",
              <Fragment key="m10">
                <DocLink href="/docs/pipeline-map">Pipeline 맵</DocLink>
              </Fragment>,
              "문서가 조직 안에서 어떻게 이동하는지 한눈에 보여 주는 그림이에요.",
            ],
            [
              "데이터 및 활동",
              <Fragment key="m11">
                <DocLink href="/docs/buckets">Buckets</DocLink>
              </Fragment>,
              "여러 Run의 결과가 쌓이는 테이블이에요. 바로 조회하고, 차트로 만들고, 내보낼 수 있어요.",
            ],
            [
              "데이터 및 활동",
              <Fragment key="m12">
                <DocLink href="/docs/flows#runs">Runs</DocLink>
              </Fragment>,
              "처리된 모든 문서의 기록이에요. 결과, 원본 파일, 로그를 함께 볼 수 있어요.",
            ],
            [
              "데이터 및 활동",
              <Fragment key="m13">
                <DocLink href="/docs/human-in-the-loop">사람 검토</DocLink>
              </Fragment>,
              "결과가 전달되기 전에 사람이 승인, 편집, 거부하는 검토 대기열이에요.",
            ],
            [
              "오디오",
              <Fragment key="m14">
                <DocLink href="/docs/signals">Signals</DocLink>
              </Fragment>,
              "녹음된 대화를 구조화된 행으로 바꿔요.",
            ],
            [
              "소셜",
              <Fragment key="m15">
                <DocLink href="/docs/nets">Nets</DocLink>
              </Fragment>,
              "소셜 미디어 게시물을 구조화된 행과 트렌드로 바꿔요.",
            ],
          ]}
        />
        <InfoBox color="blue" icon={<Info size={20} />} title="Agents, Signals, Nets가 보이지 않나요?">
          이 세 영역은 조직별로 켜져요. 사이드바에 보이지 않으면 Tavnit 팀에 연락해 활성화를
          요청하세요.
        </InfoBox>
        <InfoBox color="violet" icon={<Info size={20} />} title="문서 분류에는 무엇을 써야 하나요?">
          파일마다 문서가 하나씩 들어 있지만 그 유형을 모른다면{" "}
          <DocLink href="/docs/collections">Collection</DocLink>을 쓰세요. 파일 하나에 문서가 여러
          개 들어 있다면 <DocLink href="/docs/splitters">Splitter</DocLink>를 쓰세요. 같은 구매,
          같은 환자처럼 문서끼리 함께 묶여야 한다면 <DocLink href="/docs/subjects">Subject</DocLink>를
          쓰세요. 어떤 문서인지 이미 알고 있다면 세 가지 모두 건너뛰고 Flow로 바로 보내면 돼요.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Rocket size={24} />} title="처음 몇 분">
        <Lead>
          새 조직은 짧은 설정 과정으로 시작하므로 빈 화면을 마주할 일이 거의 없어요.
        </Lead>
        <BulletList
          items={[
            <Fragment key="o0">
              <strong>환영 질문.</strong> 조직을 만들고 나면 Tavnit이 네 가지 짧은 질문을 해요. 어떤
              문서를 처리할지, 무엇을 이루고 싶은지, 지금 문서가 어떻게 들어오는지, 한 달에 대략 몇
              건을 처리하는지예요. 30초 정도면 끝나고, <strong>건너뛰기</strong>를 눌러도 돼요.
            </Fragment>,
            <Fragment key="o1">
              <strong>클릭 한 번으로 만드는 시작 Flow.</strong> 질문에 답했다면 비어 있는 Flows
              페이지가{" "}
              <em>“답변을 바탕으로 다음 항목을 설정해 드릴 수 있어요:”</em> 아래에 여러분의 문서에
              맞는 템플릿을 보여 줘요. <strong>이 Flow 만들기</strong>를 클릭하면 바로 편집할 수 있는
              상태로 만들어져요.
            </Fragment>,
            <Fragment key="o2">
              <strong>시작 템플릿.</strong> Tavnit은 송장, 구매 주문서, 영수증, 은행 거래 내역서,
              납품서, 검사 결과지, 계약서, 견적서, 대변 메모, 신분증, 이력서용으로 미리 만든 Flow를
              제공해요. 답변과 맞는 템플릿이 먼저 표시돼요.
            </Fragment>,
            <Fragment key="o3">
              <strong>시작 가이드.</strong> 앱 모서리에 있는 작은 패널로, 탭이 세 개 있어요.{" "}
              <strong>체크리스트</strong>(완료하면 저절로 체크되는 설정 단계),{" "}
              <strong>이 화면</strong>(지금 보고 있는 페이지에 대한 팁),{" "}
              <strong>기능</strong>(사용할 수 있는 모든 영역)이에요. 숨겼다면{" "}
              <strong>도움말 및 지원</strong> 메뉴에서 다시 열 수 있어요.
            </Fragment>,
          ]}
        />
      </DocCard>

      <DocCard icon={<FilePlus size={24} />} title="1단계: Flow 만들기">
        <Lead>
          Flow는 한 가지 문서 유형의 스키마예요. 프로젝트가 아니라 문서를 기준으로 이름을 지으세요.{" "}
          <em>Q1 자동화</em>가 아니라 <em>공급업체 송장</em>처럼요. 이름과 설명은 Collection이
          문서를 이 Flow로 보낼 때 참고하는 정보이기도 해요.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f5">
              <strong>Flows</strong> 페이지에서 <strong>Flow 만들기</strong>를 클릭해요.
            </Fragment>,
            <Fragment key="f6">
              시작 방법을 골라요. <strong>템플릿에서</strong>(Tavnit 템플릿, 또는{" "}
              <strong>내 Flow</strong> 아래에 있는 내 Flow의 사본),{" "}
              <strong>AI 제안</strong>(샘플 PDF나 이미지를 업로드하면 AI가 필드 초안을 작성해요),{" "}
              <strong>처음부터 시작</strong> 중에서 선택할 수 있어요.
            </Fragment>,
            <Fragment key="f7">
              Flow에 3자 이상의 이름과, 어떤 문서를 처리하는지 설명하는 10자 이상의 설명을 입력해요.
            </Fragment>,
            <Fragment key="f8">
              빌더에서 스키마가 필요한 그대로가 될 때까지 필드를 추가, 편집, 삭제해요. 새 Flow는
              처음부터 <strong>활성</strong> 상태예요.
            </Fragment>,
            <Fragment key="f9">
              <strong>실행</strong>을 클릭하고 실제 문서 하나를 업로드한 뒤 결과를 확인해요.
            </Fragment>,
          ]}
        />
        <p>
          <DocLink href="/docs/flows">Flows</DocLink> 문서에서 각 단계를 자세히 다뤄요. 필드 종류,
          데이터 유형, AI에게 어디를 봐야 하는지 알려 주는 힌트, 그리고 Flow에 실제 Run이 쌓이면
          수정안을 제안하는 <strong>진단</strong> 버튼까지 설명해요.
        </p>
        <InfoBox color="blue" icon={<Info size={20} />} title="설명이 중요해요">
          설명은 필수 항목이고, 두 가지 면에서 제 몫을 해요. AI가 더 정확하게 추출하도록 돕고,{" "}
          <DocLink href="/docs/collections">Collection</DocLink>이 문서를 이 Flow로 보낼 수 있게
          해 줘요. 설명이 모호하면 두 가지 모두 나빠져요.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Table2 size={24} />} title="2단계: 메타데이터 필드와 테이블 필드">
        <Lead>
          Tavnit은 문서당 한 번 나오는 값과 반복되는 값을 구분해요. 이 구분 하나가 이후 모든 것의
          모양을 결정해요. Webhook 페이로드, Bucket 행, CSV 모두 이 구분을 따라요.
        </Lead>
        <DataTable
          head={["필드 종류", "나타나는 빈도", "송장의 예"]}
          rows={[
            [
              "메타데이터 필드",
              "문서당 한 번",
              "송장 번호, 발행일, 공급업체, 합계",
            ],
            [
              "테이블 필드",
              "품목마다 한 번",
              "설명, 수량, 단가, 금액",
            ],
          ]}
        />
        <p>
          각 필드에는 데이터 유형도 있어요. 텍스트, 숫자, 날짜, 혼합/영숫자, 이미지 중 하나이고,
          생각보다 중요해요. 텍스트로 지정된 합계는 더하거나 비교하거나 차트로 만들 수 없어요.
          메타데이터 필드만 있는 Flow는 문서당 행 하나를 돌려줘요.{" "}
          <DocLink href="/docs/flows">Flows</DocLink> 문서에서 추출 힌트, 복합 필드, 잘못 나오는
          필드를 고치는 방법까지 전체 스키마를 다뤄요.
        </p>
      </DocCard>

      <DocCard icon={<Clock size={24} />} title="3단계: 문서 보내기">
        <Lead>
          문서를 보내는 방법은 네 가지이고, 모두 같은 종류의 Run을 만들어요. 먼저 직접 업로드해서
          Flow가 잘 작동하는지 확인한 다음, 실제로 문서가 들어오는 방식에 맞는 경로로 바꾸세요.
        </Lead>
        <DataTable
          head={["경로", "적합한 경우", "설정"]}
          rows={[
            [
              "앱에서 업로드",
              "테스트와 일회성 문서",
              "필요 없어요. 파일 여러 개를 한 번에 선택하면 각각 별도의 Run이 돼요",
            ],
            [
              <Fragment key="f10">
                <DocLink href="/docs/email-integration">이메일</DocLink>
              </Fragment>,
              "이미 메일함으로 들어오는 문서",
              "Flow의 이메일 트리거를 켜고 그 주소로 메일을 전달해요",
            ],
            [
              <Fragment key="f11">
                <DocLink href="/docs/api-integration">REST API</DocLink>
              </Fragment>,
              "자체 시스템과 대량 처리",
              "API 키와 POST 요청 하나",
            ],
            [
              <Fragment key="f12">
                <DocLink href="/docs/mcp-connector">MCP 커넥터</DocLink>
              </Fragment>,
              "AI 어시스턴트에서 하는 즉석 작업",
              "요청 시 조직별로 활성화한 뒤, 통합에서 커넥터 URL을 받아요",
            ],
          ]}
        />
        <p>
          Flow는 PDF, 이미지(PNG, JPG, JPEG, JFIF), 스프레드시트(XLSX, XLS, CSV)를 받아요.
          스프레드시트는 처음 보이는 시트를 읽어요. 스캔 문서는 자동으로 감지되어 OCR로 읽혀요.
        </p>
        <Screenshot
          src="/assets/tour2-runs.jpg"
          alt="처리된 문서 목록이 표시된 Tavnit의 Runs 페이지. 각 문서에 Flow, 실행한 사람, 소스, 상태가 표시되고, 위에는 완료된 Run, 실행 중인 Run, 전체 Run 요약 타일이 있어요."
          caption="모든 문서는 Run이 돼요. Runs 페이지에서 무엇이 처리되었고, 어떻게 들어왔고, 어떻게 끝났는지 볼 수 있어요."
        />
        <p>
          아무 Run이나 열면 추출된 필드를 원본 문서 옆에서 볼 수 있고, 처리 중에 일어난 일을 담은
          로그도 볼 수 있어요. 결과가 예상과 다를 때 가장 먼저 확인할 곳이 이 로그예요.
        </p>
      </DocCard>

      <DocCard icon={<Map size={24} />} title="다음 단계">
        <Lead>
          추출이 잘 작동하면, 다음 단계는 데이터에 어떤 문제가 있는지 또는 데이터로 무엇을 해야
          하는지에 따라 달라져요.
        </Lead>
        <DataTable
          head={["이런 경우라면…", "읽어 볼 문서"]}
          rows={[
            [
              "필드를 더 추출하거나, 잘못 나오는 필드를 고치고 싶어요",
              <Fragment key="f17">
                <DocLink href="/docs/flows">Flows</DocLink>
              </Fragment>,
            ],
            [
              "형식을 고치거나, 통화를 변환하거나, 합계를 계산하거나, 잘못된 행을 표시하고 싶어요",
              <Fragment key="f18">
                <DocLink href="/docs/cleaners">Cleaners</DocLink>
              </Fragment>,
            ],
            [
              "결과가 어디로든 가기 전에 사람이 확인하게 하고 싶어요",
              <Fragment key="f19">
                <DocLink href="/docs/human-in-the-loop">사람 검토</DocLink>
              </Fragment>,
            ],
            [
              "데이터를 자체 시스템으로 보내고 싶어요",
              <Fragment key="f20">
                <DocLink href="/docs/webhooks">Webhooks</DocLink> 또는{" "}
                <DocLink href="/docs/api-integration">REST API</DocLink>
              </Fragment>,
            ],
            [
              "결과를 한곳에 모아 두고 조회하고 싶어요",
              <Fragment key="f21">
                <DocLink href="/docs/buckets">Buckets</DocLink>
              </Fragment>,
            ],
            [
              "문서를 비교하거나 규칙 목록에 따라 검사하고 싶어요",
              <Fragment key="f24">
                <DocLink href="/docs/matchers">Matchers</DocLink> 및{" "}
                <DocLink href="/docs/inspectors">Inspectors</DocLink>
              </Fragment>,
            ],
            [
              "여러 단계를 하나의 프로세스로 연결하고 싶어요",
              <Fragment key="f25">
                <DocLink href="/docs/pipelines">Pipelines</DocLink>
              </Fragment>,
            ],
            [
              "웹의 다른 곳에서 데이터로 작업하고 싶어요",
              <Fragment key="f22">
                <DocLink href="/docs/agents">Agents</DocLink>
              </Fragment>,
            ],
            [
              "누가 무엇을 보고 바꿀 수 있는지 관리하고 싶어요",
              <Fragment key="f23">
                <DocLink href="/docs/user-roles">사용자 역할</DocLink>
              </Fragment>,
            ],
          ]}
        />
      </DocCard>

      <Related
        links={[
          {
            href: "/docs/flows",
            label: "Flow의 데이터 스키마 자세히 만들기",
            description:
              "필드 종류, 데이터 유형, 추출 힌트, 복합 필드, Run, 그리고 Flow에 연결할 수 있는 모든 것.",
          },
          {
            href: "/docs/api-integration",
            label: "Tavnit REST API로 문서 처리하기",
            description:
              "Multipart 및 Base64 업로드, API 키 인증, Python과 JavaScript 예제, 노코드 레시피.",
          },
          {
            href: "/docs/email-integration",
            label: "이메일 첨부 파일에서 추출하기",
            description: "Flow에 전용 수신함을 만들어 주고 문서를 그곳으로 전달하세요.",
          },
          {
            href: "/docs/pipeline-map",
            label: "모든 것이 어떻게 연결되는지 보기",
            description:
              "Flow, Collection, Splitter, Cleaner, Bucket을 보여 주는 실시간 지도.",
          },
        ]}
      />
    </section>
  );
}
