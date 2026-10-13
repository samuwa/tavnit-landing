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
 * /ko/docs/human-in-the-loop — translated from
 * src/app/docs/human-in-the-loop/page.tsx. The app calls the area
 * "사람 검토" in Korean (nav.hitl); HITL stays as in the app's labels.
 */

/** Mirrors the visible numbered steps under "Flow에 검토 켜기". */
export const schema: DocsPageSchemaData = {
  howTo: {
    name: "Tavnit Flow에 사람 검토 단계 추가하기",
    description:
      "Flow에서 사람 검토를 켜고 검토자를 지정하면, 모든 Run이 결과를 다음 단계로 전달하기 전에 일시 중지되어 승인을 기다려요.",
    steps: [
      {
        name: "Flow의 사람 검토 패널 열기",
        text: "Tavnit 앱에서 Flows로 이동해 Flow를 열고, 사이드바에서 사람 검토 패널을 선택해요.",
      },
      {
        name: "검토 켜기",
        text: "사람 검토를 켜요. 그때부터 Flow의 새 Run은 결과를 전달하는 대신 일시 중지돼요.",
      },
      {
        name: "검토자 지정하기",
        text: "검토자에서 조직 구성원을 한 명 이상 골라요. 지정된 검토자만 Flow의 일시 중지된 Run을 승인하거나 거부할 수 있어요.",
      },
      {
        name: "문서를 실행하고 대기열 확인하기",
        text: "문서 하나를 처리해요. 지정된 모든 검토자의 사람 검토 대기열에 검토 대기 중으로 표시되어야 해요.",
      },
    ],
  },
  primaryImage: {
    url: "/assets/docs-hitl-review-2026-08.jpg",
    caption:
      "Tavnit의 사람 검토 화면: 원본 문서 옆에 편집 가능한 데이터 그리드가 있고, 승인과 거부 작업이 있어요.",
    width: 1327,
    height: 801,
  },
};

export default function HumanInTheLoopKo() {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        사람 검토(Human in the Loop)
      </h1>

      <DocCard icon={<ClipboardCheck size={24} />} title="사람 검토가 하는 일">
        <Lead>
          사람 검토는 추출과 전달 사이에 검토 체크포인트를 둬요. 검토가 필요한 Run은 추출과 정리가
          끝난 뒤 <strong>승인 대기</strong> 상태로 멈춰요. 지정된 검토자가 승인할 때까지 이메일도
          보내지 않고, Webhook도 실행되지 않고, Bucket 행도 기록되지 않고, 연결된 Agent도 시작되지
          않아요.
        </Lead>
        <p>
          핵심은 <em>전에</em>라는 말이에요. 검토는 잘못된 데이터가 이미 ERP에 들어간 뒤에 하는
          수정이 아니에요. 전달 단계는 아직 실행되지 않았어요. 검토자가 승인하면 Run은 멈췄던 바로 그
          지점에서 검토자의 수정 사항을 반영해 다시 진행돼요.
        </p>
        <BulletList
          items={[
            "다음 단계로 넘어가기 전에 반드시 확인해야 하는 고가치 데이터",
            "수동 승인 단계를 문서로 남겨야 하는 컴플라이언스 요건",
            "대체로 정확하게 추출되지만, 가끔 틀리면 비용이 큰 문서",
            "내부 비용 센터나 승인 코드처럼 사람만 입력할 수 있는 값",
            "Flow를 믿을 수 있을 때까지의 새 공급업체나 새 형식",
          ]}
        />
        <p>
          주된 대상은 Flow Run이지만, 같은 대기열에 일시 중지된{" "}
          <DocLink href="/docs/matchers">매칭</DocLink>,{" "}
          <DocLink href="/docs/inspectors">검사</DocLink>,{" "}
          <DocLink href="/docs/fillers">채우기</DocLink>도 모여요. 아래{" "}
          <em>검토를 기다리는 다른 항목</em>을 참고하세요.
        </p>
      </DocCard>

      <DocCard icon={<Settings2 size={24} />} title="Flow Run이 일시 중지되는 세 가지 경우">
        <Lead>
          Flow 수준의 스위치는 Run을 검토로 보내는 방법 중 하나일 뿐이에요. Flow에 연결된{" "}
          <DocLink href="/docs/cleaners">Cleaner</DocLink>는 스위치가 꺼져 있어도 스스로 Run을 일시
          중지할 수 있어요. 한 Run에 여러 트리거가 적용되면 각 트리거의 검토자 목록이 합쳐져요.
        </Lead>
        <DataTable
          head={["트리거", "일시 중지되는 대상", "이럴 때 좋아요"]}
          rows={[
            [
              "Flow 설정(사람 검토 패널)",
              "무엇이 추출되었든 Flow의 모든 Run.",
              "항상 승인이 필요한 문서 유형이거나, 막 만들어서 아직 믿기 어려운 Flow.",
            ],
            [
              "사람 검토 작업이 있는 Cleaner 조건부 작업 규칙",
              "합계가 기준값을 넘거나 사업자 번호가 없는 경우처럼, 어떤 행이 규칙에 맞은 Run만.",
              "대부분의 Run은 문제가 없고 예외만 확인하고 싶은 대량 처리.",
            ],
            [
              "Cleaner 사람 입력 필드",
              "Cleaner를 거치는 모든 Run. 사람이 값을 입력하거나 골라야 하기 때문이에요.",
              "문서에 전혀 없어서 누군가 추가해야 하는 데이터.",
            ],
          ]}
        />
        <InfoBox color="blue" icon={<Info size={20} />} title="모든 것을 검토할 필요는 없어요">
          모든 Run을 검토하면 추출을 자동화하는 의미가 없어져요. 보통은 조건부 방식이 맞아요. Cleaner에
          조건부 작업 필드를 추가하고, <em>total &gt; 10,000</em> 같은 조건을 지정하고, 사람 검토
          작업을 추가한 뒤 검토자를 고르세요. 조건에 맞는 Run만 멈춰요. Flow 스위치는 꺼 둔 채로 둬도
          돼요.
        </InfoBox>
        <p>
          Cleaner 규칙 때문에 일시 중지되면 Tavnit은 어떤 행과 어떤 필드가 규칙에 맞았는지 기록해요.
          검토 화면은 정확히 그 셀을 표시하므로, 검토자는 테이블 전체를 읽는 대신 Run이 멈춘 이유부터
          확인할 수 있어요. 규칙이 이상치 확인 필드를 기반으로 한다면, 검토자는 각 값이 왜 표시되었는지도
          볼 수 있어요.
        </p>
      </DocCard>

      <DocCard icon={<Settings2 size={24} />} title="Flow에 검토 켜기">
        <Lead>
          Flow 스위치는 Flow 자체 설정에 있어요. 소유자나 관리자만 바꿀 수 있어요. 검토자는 조직
          구성원 중에서 골라요.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f0">
              Flow를 열고 사이드바에서 <strong>사람 검토</strong> 패널을 선택해요.
            </Fragment>,
            <Fragment key="f1">검토를 켜요.</Fragment>,
            <Fragment key="f2">
              <strong>검토자</strong>에서 조직 구성원을 한 명 이상 골라요.
            </Fragment>,
            <Fragment key="f3">
              문서 하나를 처리하고, 검토자의 <strong>사람 검토</strong> 대기열에{" "}
              <strong>검토 대기 중</strong>으로 표시되는지 확인해요.
            </Fragment>,
          ]}
        />
        <WarningBox>
          검토를 켰는데 검토자를 지정하지 않으면 패널에{" "}
          <em>&ldquo;선택된 검토자가 없어요 — 승인 요청이 아무에게도 전달되지 않아요.&rdquo;</em>라는
          경고가 표시돼요. 그러면 일시 중지된 Run을 승인할 수 있는 사람이 아무도 없어요. 문서를 보내기
          전에 검토자를 한 명 이상 지정하세요.
        </WarningBox>
        <InfoBox
          color="violet"
          icon={<Info size={20} />}
          title="Cleaner가 연결되어 있으면 검토자는 정리된 데이터를 봐요"
        >
          Flow에 Cleaner가 있으면 정리가 끝난 뒤에 일시 중지되므로, 검토 대상 테이블은 통화가
          변환되고, 날짜 형식이 바뀌고, 계산된 열이 추가된 정리 결과예요. 실제로 전달될 데이터이니
          확인하기에 알맞은 대상이에요.
        </InfoBox>
      </DocCard>

      <DocCard icon={<PenLine size={24} />} title="사람 입력 필드">
        <Lead>
          사람 입력 필드는 추출되지 않는 Cleaner 열이에요. 검토자가 검토 화면에서 채워요. 비용 센터,
          총계정원장 계정, 내부 승인 코드처럼 문서로는 알 수 없는 값에 쓰세요.
        </Lead>
        <DataTable
          head={["옵션", "하는 일"]}
          rows={[
            ["자유 텍스트", "검토자가 값을 입력해요."],
            [
              "메뉴",
              "검토자가 Bucket 열의 고유 값 중에서 골라요(옵션 Bucket과 옵션 열). 현재 행의 필드에 대한 조건을 포함해 조건으로 필터링할 수도 있어요.",
            ],
            [
              "필수 값",
              "모든 행에 값이 들어갈 때까지 승인이 막혀요. 빈 값을 허용하려면 끄세요.",
            ],
            ["검토자", "필드를 채우고 승인할 수 있는 사람이에요. Flow의 검토자와 합쳐져요."],
          ]}
        />
        <p>
          사람 입력 필드가 있는 Cleaner를 거치는 모든 Run은 Flow 스위치가 켜져 있든 꺼져 있든 검토를
          위해 일시 중지돼요. 검토 화면에서 이 열에는 채워진 행 수와 함께{" "}
          <strong>사람의 입력이 필요해요</strong>라고 표시되고, 필수 값이 모두 채워질 때까지 승인이
          막혀 있어요(<em>&ldquo;승인하려면 필수 입력 값을 모두 채우세요&rdquo;</em>).
        </p>
      </DocCard>

      <DocCard icon={<Inbox size={24} />} title="검토 대기열">
        <Lead>
          사이드바의 <strong>사람 검토</strong> 페이지에는 여러분을 기다리는 모든 항목이 최신순으로
          나열돼요. 여러분이 검토자로 지정된 항목만 표시되고, 검토자끼리는 서로의 대기열을 볼 수
          없어요.
        </Lead>
        <BulletList
          items={[
            "상단의 요약 수치: 검토 대기, 가장 오래된 대기 항목, 내 역할, HITL이 있는 Flow",
            "항목마다 카드 하나: Run이라면 파일 이름과 Flow, 매칭이나 채우기라면 해당 칩, 그리고 검토 대기 중 상태",
            "기다리는 항목이 있으면 사이드바 아이콘에 빨간 점이 표시돼요. 페이지를 새로 고치지 않아도 실시간으로 업데이트돼요",
            "지정된 검토자는 Run, 매칭, 검사, 채우기가 검토를 필요로 하는 즉시 바로가기 링크가 담긴 이메일도 받아요",
          ]}
        />
      </DocCard>

      <DocCard icon={<SplitSquareHorizontal size={24} />} title="Run 검토하기">
        <Lead>
          검토 화면은 분할 보기예요. 왼쪽에는 추출된 테이블, 오른쪽에는 원본 문서가 있어요. 페이지를
          떠나지 않고 값을 원본과 대조하고, 그 자리에서 고치고, 승인할 수 있어요. 구분선은 드래그할 수
          있고, 모바일에서는 두 패널을 전환하며 봐요.
        </Lead>
        <Screenshot
          src="/assets/docs-hitl-review-2026-08.jpg"
          alt="검토 대기 중인 Run의 Tavnit 검토 화면: 왼쪽에는 행 체크박스와 함께 Subtotal, Amount, Weight 열이 있는 편집 가능한 데이터 그리드가, 오른쪽에는 원본 송장이 표시되고, 머리글에 거부와 승인 버튼이 있어요."
          caption="검토 대기 중인 Run. 왼쪽 그리드는 전달될 정리 결과이고, 확인할 수 있도록 원본 문서가 옆에 있어요."
        />
        <DataTable
          head={["데이터 그리드에서 할 수 있는 일", "방법"]}
          rows={[
            ["값 편집하기", "셀을 두 번 클릭하고 입력해요."],
            [
              "여러 셀을 한 번에 바꾸기",
              "드래그, Shift+클릭 또는 열 머리글 클릭으로 선택한 다음 선택 항목에 적용을 눌러요.",
            ],
            ["출력에서 행 제외하기", "체크를 해제해요. 제외된 행은 전달되지 않아요."],
            ["열 추가 또는 제거하기", "열 추가 또는 열 제거를 써요. 제거한 열은 승인하기 전까지 되돌릴 수 있어요."],
            ["일시 중지된 이유 보기", "Cleaner 규칙에 맞은 셀이 표시돼요."],
            ["사람 입력 필드 채우기", "값을 입력하거나 메뉴에서 골라요."],
            ["무엇을 바꿨는지 보기", "편집한 셀은 승인할 때까지 강조 표시돼요."],
          ]}
        />
        <BulletList
          items={[
            "문서 패널에는 페이지 이동이 가능한 PDF와 이미지 파일이 표시돼요. 스프레드시트는 다운로드할 수 있어요",
            "너비에 맞춤, 높이에 맞춤, 수동 확대/축소를 지원하고, 드래그해서 이동할 수 있어요",
            "Ctrl/Cmd + 와 − 로 확대/축소하고, Ctrl/Cmd + 0 으로 원래대로 되돌려요",
          ]}
        />
      </DocCard>

      <DocCard icon={<CheckCircle2 size={24} />} title="승인과 거부">
        <Lead>
          승인하면 수정 사항이 Run에 반영되고 다음 단계로 넘어가요. 거부하면 Run이 취소되고 아무것도
          전달되지 않아요. 두 결정 모두 그 Run에 대해 최종적이에요. 일시 중지는 한 번만 통과하는
          관문이지, 왔다 갔다 바꿀 수 있는 상태가 아니에요.
        </Lead>
        <DataTable
          head={["결정", "Run에 일어나는 일", "전달되는 것"]}
          rows={[
            [
              "승인",
              "편집한 테이블이 추출 결과를 대체하고, Run은 다시 진행되어 HITL 승인됨 배지와 함께 완료됨이 돼요.",
              <Fragment key="f4">
                Flow에 설정된 모든 것: 이메일 출력, Webhook,{" "}
                <DocLink href="/docs/buckets">Bucket</DocLink> 내보내기, 양식 채우기, 연결된{" "}
                <DocLink href="/docs/agents">Agent</DocLink>까지, 모두 승인된 데이터로 실행돼요.
              </Fragment>,
            ],
            [
              "거부",
              "Run은 HITL 거부됨 배지와 함께 취소됨이 되고, 입력한 사유(선택 사항이지만 권장)가 기록돼요.",
              "없어요. 이메일도, Webhook도, Bucket 행도, Agent 실행도 없어요.",
            ],
          ]}
        />
        <InfoBox color="green" icon={<CheckCircle2 size={20} />} title="첫 번째 결정이 적용돼요">
          지정된 검토자 모두가 승인할 필요는 없어요. 첫 승인이나 거부로 Run이 결정되고, 두 번째
          검토자가 그 Run을 열어 두고 있었다면 Run이 더 이상 승인 대기 상태가 아니므로 그 사람의 결정은
          거절돼요. 대기열을 새로 고쳐 현재 상태를 확인하세요.
        </InfoBox>
        <p>
          Run 페이지에는 누가 결정했는지 표시돼요(<strong>승인자</strong> 또는{" "}
          <strong>거부자</strong>).
        </p>
      </DocCard>

      <DocCard icon={<Layers size={24} />} title="검토를 기다리는 다른 항목">
        <Lead>
          Matcher, Inspector, Filler에는 각자의 검토 설정이 있고, 일시 중지된 항목은 같은 대기열에
          들어와요. 첫 번째 결정이 적용되는 규칙과 감사 기록도 똑같아요.
        </Lead>
        <DataTable
          head={["항목", "일시 중지되는 경우", "검토자가 하는 일"]}
          rows={[
            [
              <DocLink key="o0" href="/docs/matchers">매칭</DocLink>,
              "Matcher에서 사람 검토가 켜져 있으면: 모든 매칭.",
              "AI가 문서 간에 짝지은 행을 확인하고 수정하며, 행을 제외할 수도 있고, 그다음 승인하거나 거부해요.",
            ],
            [
              <DocLink key="o1" href="/docs/inspectors">검사</DocLink>,
              "Inspector에서 사람 검토가 켜져 있거나, 실패한 검사 항목이 실패 시 작업으로 검토를 요청할 때.",
              "실패한 검사 항목을 사유와 함께 면제한 뒤 승인해 판정을 확정하거나, 거부해 검사를 취소해요.",
            ],
            [
              <DocLink key="o2" href="/docs/fillers">채우기</DocLink>,
              "Filler에서 사람 검토가 켜져 있거나, 사람 입력 필드가 매핑되어 있을 때.",
              "채워진 양식을 검토하고 사람 입력 값을 입력한 뒤, 승인해 양식을 내보내거나 거부해요.",
            ],
          ]}
        />
      </DocCard>

      <DocCard icon={<Eye size={24} />} title="검토할 수 있는 사람">
        <Lead>
          Flow Run을 승인하거나 거부할 수 있는 사람은 검토자로 지정된 사람뿐이에요. 관리자라는 것만으로는
          충분하지 않아요. 검토자 목록에 없는 관리자는 대기열에서 그 Run을 받지 못하고 승인할 수도
          없어요.
        </Lead>
        <BulletList
          items={[
            "Flow 검토자 목록은 소유자나 관리자가 관리해요",
            "Cleaner의 사람 검토 작업과 각 사람 입력 필드에는 자체 검토자가 있고, Flow의 검토자와 합쳐져요",
            "역할과 관계없이 어떤 구성원이든 검토자가 될 수 있어요",
            "HITL 전용 역할은 검토자를 위한 역할이에요. 이 구성원은 사람 검토 대기열만 보고 검토할 수 있으며, 그 밖의 것은 실행하거나 변경할 수 없어요",
          ]}
        />
        <p>
          각 역할이 무엇을 바꿀 수 있는지는{" "}
          <DocLink href="/docs/user-roles">사용자 역할과 권한</DocLink>을 참고하세요.
        </p>
      </DocCard>

      <DocCard icon={<Shield size={24} />} title="추가 전용 감사 기록">
        <Lead>
          모든 검토 작업은 타임스탬프와 검토자 신원과 함께 영구적인 추가 전용 로그에 기록돼요. 항목은
          편집하거나 삭제할 수 없으므로, 누가 무엇을 바꿨는지, 그리고 손대기 전에 데이터가 어땠는지에
          대한 기록이 검토 후에도 그대로 남아요.
        </Lead>
        <DataTable
          head={["기록되는 이벤트", "기록되는 시점"]}
          rows={[
            ["검토자에게 알림", "Run이 검토 대기열에 들어가고 검토자에게 이메일이 발송될 때."],
            ["셀 편집", "값이 바뀔 때. 이전 값과 새 값이 함께 기록돼요."],
            ["행 추가 / 행 제거", "검토자가 행을 추가하거나 제외할 때."],
            ["열 추가 / 열 제거", "검토자가 테이블 구조를 바꿀 때."],
            ["승인됨", "결정, 검토자, 수정 횟수."],
            ["거부됨", "결정, 검토자, 입력한 사유."],
          ]}
        />
        <InfoBox color="purple" icon={<Shield size={20} />} title="검토 전 데이터도 보관돼요">
          Tavnit은 검토자가 손대기 전의 출력을 승인된 버전과 함께 저장해요. 감사자는 이벤트 로그에서
          재구성하지 않고도 추출 결과와 전달된 결과를 비교할 수 있어요.
        </InfoBox>
      </DocCard>

      <DocCard icon={<HelpCircle size={24} />} title="문제 해결">
        <DataTable
          head={["증상", "가능한 원인과 해결 방법"]}
          rows={[
            [
              "Flow 스위치가 꺼져 있는데도 Run이 일시 중지돼요",
              "Flow의 Cleaner에 사람 검토 작업이 있는 조건부 작업 규칙이나 사람 입력 필드가 있어요.",
            ],
            [
              "Run이 승인 대기 상태인데 내 대기열에 없어요",
              "그 Run의 검토자 목록에 없어요. 소유자나 관리자에게 Flow(또는 Run을 일시 중지한 Cleaner 규칙)에 추가해 달라고 요청하세요.",
            ],
            [
              "설정된 검토자가 아니라는 이유로 승인이 거절돼요",
              "지정된 검토자만 결정할 수 있어요. 지정된 검토자가 없다면 Flow에 추가하세요. 그 외에는 아무도 Run을 진행시킬 수 없어요.",
            ],
            [
              "Run이 승인 대기 상태가 아니라는 이유로 승인이 거절돼요",
              "다른 검토자가 먼저 결정했어요. 대기열을 새로 고치세요.",
            ],
            [
              "사람 입력이 누락되어 승인이 막혀요",
              "일부 행에서 필수 사람 입력 필드가 아직 비어 있어요. 채우거나, Cleaner에서 그 필드를 선택 사항으로 바꾸세요.",
            ],
            [
              "연결된 Agent가 실행되지 않았어요",
              "Agent는 승인 후에만 실행돼요. 거부된 Run은 Agent를 시작하지 않아요.",
            ],
          ]}
        />
        <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="검토에는 시간이 들어요">
          일시 중지된 Run은 얼마가 걸리든 기다려요. 결과가 시간에 민감한 프로세스로 이어진다면 검토자가
          대기열이나 이메일을 꼭 확인하도록 하거나, Cleaner 규칙으로 일시 중지 대상을 예외로만 좁히세요.
        </InfoBox>
      </DocCard>

      <Related
        links={[
          {
            href: "/docs/cleaners",
            label: "Cleaner로 조건부 검토 실행하기",
            description:
              "조건부 작업은 규칙을 어긴 Run만 일시 중지하고, 사람 입력 필드는 검토자에게서 값을 받아요.",
          },
          {
            href: "/docs/user-roles",
            label: "사용자 역할과 권한",
            description: "누가 검토자를 지정할 수 있는지, HITL 전용 역할이 무엇을 할 수 있는지.",
          },
          {
            href: "/docs/agents",
            label: "Agent로 승인된 데이터 활용하기",
            description: "연결된 Agent는 검토자가 승인한 뒤에만 시작돼요.",
          },
          {
            href: "/docs/webhooks",
            label: "Webhook으로 승인된 결과 전달하기",
            description: "검토자가 승인하면 무엇이 실행되고, 거부하면 무엇이 실행되지 않는지.",
          },
          {
            href: "/docs/buckets",
            label: "승인된 데이터를 Bucket에 저장하기",
            description: "검토자가 승인한 행만 받는 구조화된 테이블.",
          },
        ]}
      />
    </section>
  );
}
