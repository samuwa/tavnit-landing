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

/** /ko/docs/flows — translated from src/app/docs/flows/page.tsx. */

/** Mirrors the visible numbered steps under "스키마 만들기". */
export const schema: DocsPageSchemaData = {
  howTo: {
    name: "문서에서 구조화된 데이터를 추출하는 Tavnit Flow 만들기",
    description:
      "Flow를 만들고, 메타데이터 필드와 테이블 필드를 정의하고, 꼭 필요한 곳에만 추출 힌트를 추가한 뒤, 실제 문서로 테스트해요.",
    steps: [
      {
        name: "Flow를 만들고 설명하기",
        text: "Flows 페이지에서 Flow 만들기를 클릭하고 템플릿, AI 제안, 빈 Flow 중 하나를 골라요. 문서를 나타내는 이름과 처리할 문서에 대한 설명을 입력해요. 설명은 AI가 더 정확하게 추출하는 데에도 도움이 돼요.",
      },
      {
        name: "메타데이터 필드 추가하기",
        text: "송장 번호, 발행일, 공급업체처럼 문서당 한 번 나오는 값마다 필드를 추가하고 데이터 유형을 지정해요.",
      },
      {
        name: "테이블 필드 추가하기",
        text: "설명, 수량, 단가, 금액처럼 반복되는 품목 테이블의 열마다 필드를 추가해요.",
      },
      {
        name: "필요한 곳에 추출 힌트 추가하기",
        text: "힌트가 필요한 필드에만 추가해요. 실제 예시 값, 값 옆에 있는 라벨, 값이 나타나는 페이지 영역, 인쇄된 열 머리글 등을 지정할 수 있어요.",
      },
      {
        name: "실제 문서로 테스트하기",
        text: "새 Flow는 처음부터 활성 상태예요. 실행을 클릭해 실제 문서 하나를 처리하고, 결과를 원본과 비교한 뒤, 잘못 나온 필드의 힌트를 다듬어요.",
      },
    ],
  },
  primaryImage: {
    url: "/assets/docs-flow-schema-2026-08.jpg",
    caption:
      "Tavnit Flow의 데이터 스키마. 메타데이터 필드와 테이블 필드가 나란히 정의되어 있어요.",
    width: 1327,
    height: 801,
  },
};

export default function FlowsKo() {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        Flows
      </h1>

      <DocCard icon={<Sparkles size={24} />} title="Flow란">
        <Lead>
          Flow는 한 가지 문서 유형의 정의예요. 추출할 필드, AI에게 그 필드를 어디서 찾을지 알려 주는
          힌트, 그리고 그 뒤에 연결된 모든 것을 담아요. Tavnit에서 문서를 데이터로 바꾸는 객체가
          바로 Flow이고, Collection, Subject, Splitter, Cleaner는 모두 Flow에 문서를 공급하거나 Flow가
          만든 결과를 다듬기 위해 존재해요.
        </Lead>
        <p>
          그려야 할 템플릿도, 매핑할 좌표도 없어요. 필드를 쉬운 말로 설명하면 Flow가 다양한 레이아웃에
          대응하므로, <em>공급업체 송장</em> Flow 하나로 송장 모양이 전혀 다른 공급업체 스무 곳을
          처리할 수 있어요. 그래서 추출 품질은 거의 전적으로 스키마와 힌트에서 결정돼요.
        </p>
        <Screenshot
          src="/assets/docs-flow-schema-2026-08.jpg"
          alt="Invoice Processor라는 Tavnit Flow의 데이터 스키마. 메타데이터 필드 패널에는 Invoice Number, Due Date, Total 같은 단일 값 필드 9개가 데이터 유형과 함께 나열되어 있고, 그 옆 테이블 필드 패널에는 Description, Quantity, Price, Amount가 있어요. 왼쪽 레일에는 최근 Run, 이메일 트리거, 컬렉션, Cleaner, 에이전트, 양식 템플릿, 이메일 출력, Webhook, Bucket 내보내기, 사람 검토, Flow ID가 묶여 있어요."
          caption="Flow의 데이터 스키마. 왼쪽은 메타데이터 필드, 오른쪽은 반복되는 테이블 필드이고, 레일에는 Flow에 연결할 수 있는 모든 것이 있어요."
        />
        <InfoBox color="blue" icon={<Info size={20} />} title="필수는 스키마뿐이에요">
          Flow에는 필드가 하나 이상 있어야 해요. 레일의 나머지 항목(Cleaner, Agent, Webhook, 이메일,
          Bucket 내보내기, 검토)은 모두 선택 사항이고, 아무것도 다시 만들지 않고 나중에 추가할 수
          있어요. Flow는 소유자와 관리자가 만들고 편집할 수 있어요.
        </InfoBox>
      </DocCard>

      <DocCard icon={<FilePlus size={24} />} title="Flow 만들기">
        <Lead>
          Flows 페이지에서 <strong>Flow 만들기</strong>를 클릭하면 Tavnit이{" "}
          <em>“어떻게 시작할까요?”</em>라고 물어요. 세 가지 방법 모두 똑같이 편집 가능한 Flow로
          이어지므로, 좋은 첫 초안에 가장 빨리 도달하는 방법을 고르세요.
        </Lead>
        <DataTable
          head={["옵션", "하는 일", "이럴 때 좋아요"]}
          rows={[
            [
              "템플릿에서",
              <Fragment key="c0">
                탭이 두 개인 갤러리가 열려요. <strong>Tavnit 템플릿</strong>은 필드와 힌트가 이미
                채워진 완성형 Flow이고, <strong>내 Flow</strong>에서는 내 활성 Flow 중 하나를{" "}
                <strong>사본 만들기</strong>로 복사할 수 있어요.
              </Fragment>,
              "문서가 흔한 유형이거나, 이미 가진 Flow와 비슷할 때.",
            ],
            [
              "AI 제안",
              "샘플 PDF나 이미지를 업로드해요. AI가 문서를 읽고 필드를 감지해 이름, 설명, 힌트가 포함된 스키마 초안을 작성해요. Flow를 만들기 전에 필요 없는 항목은 체크를 해제하고 원하는 필드를 편집하세요.",
              "문서가 여러분의 업무에만 있는 형태이고, 빠르게 시작하고 싶을 때.",
            ],
            [
              "처음부터 시작",
              "빈 스키마예요. 모든 필드를 직접 정의해요.",
              "필요한 것을 정확히 알고 있거나, 기존 프로세스를 다시 만들 때.",
            ],
          ]}
        />
        <p>
          Tavnit 템플릿은 송장, 구매 주문서, 영수증, 은행 거래 내역서, 납품서, 검사 결과지, 계약서,
          견적서, 대변 메모, 신분증, 이력서를 다뤄요. 조직을 설정할 때 환영 질문에 답했다면 여러분의
          문서에 맞는 템플릿이 먼저 표시되고, 비어 있는 Flows 페이지에서{" "}
          <strong>이 Flow 만들기</strong>를 클릭해 한 번에 모두 만들 수 있어요.
        </p>
        <p>
          어떤 방법이든 마지막에 이름(3자 이상)과 설명(10자 이상)을 입력해요. Flow는 짧은{" "}
          <em>“Flow 설정하기”</em> 가이드와 함께 빌더에서 열리고, 처음부터 <strong>활성</strong>{" "}
          상태예요. 비활성화하려면 상단 바의 스위치를 쓰세요. 비활성 Flow는 실행할 수 없어요.
        </p>
        <InfoBox color="green" icon={<Info size={20} />} title="AI 제안은 Run을 만들지 않아요">
          샘플 문서로 Flow 초안을 작성해도 Run은 생기지 않아요. 초안은 출발점으로 생각하고, 쓰지 않을
          필드는 삭제하세요. 필드가 하나 늘 때마다 검토할 것도, 잘못될 수 있는 것도 늘어나요.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Table2 size={24} />} title="메타데이터 필드와 테이블 필드">
        <Lead>
          모든 필드는 두 종류 중 하나이고, 값이 문서당 한 번 나오는지 줄마다 한 번 나오는지로
          정해져요. 스키마에서 가장 영향이 큰 선택이에요. Webhook 페이로드, Bucket 행, CSV, 검토
          화면의 모양이 모두 여기에 따라 결정돼요.
        </Lead>
        <DataTable
          head={["", "메타데이터 필드", "테이블 필드"]}
          rows={[
            ["나타나는 빈도", "문서당 한 번", "반복되는 테이블의 행마다 한 번"],
            [
              "송장의 예",
              "송장 번호, 발행일, 공급업체, 합계",
              "설명, 수량, 단가, 금액",
            ],
            [
              "출력에서",
              <Fragment key="f0">
                <InlineCode>metadata</InlineCode> 객체
              </Fragment>,
              <Fragment key="f1">
                <InlineCode>rows</InlineCode>의 행마다 항목 하나
              </Fragment>,
            ],
            [
              "Bucket에서",
              "그 문서에서 내보낸 모든 행에 반복해서 들어가요",
              "각각 Bucket 행 하나",
            ],
          ]}
        />
        <InfoBox color="violet" icon={<Info size={20} />} title="종류를 잘못 고르는 것이 가장 흔한 실수예요">
          품목 열을 메타데이터 필드로 정의하면 스무 줄짜리 테이블에서 값 하나만 받게 돼요. 송장
          합계를 테이블 필드로 정의하면 모든 행에 같은 숫자가 반복돼요. 헷갈린다면 같은 문서에 그
          값이 두 번 나올 수 있는지 스스로 물어보세요.
        </InfoBox>
        <p>
          신분증, 증명서, 한 페이지짜리 양식처럼 <strong>메타데이터 필드만 있는</strong> Flow는
          문서당 그 값들을 담은 행 하나를 돌려주므로, 결과는 다른 Run과 마찬가지로 테이블 보기,
          Bucket, Webhook, 이메일에 그대로 전달돼요.
        </p>
        <p>
          Flow는 출력하는 모든 행에 <strong>시스템 열</strong>(Flow ID, Flow 이름, Run ID)을 붙일
          수도 있어요. 여러 Flow가 한{" "}
          <DocLink href="/docs/buckets">Bucket</DocLink>에 기록하고 각 행이 어느 문서에서 왔는지
          알아야 할 때 켜세요.
        </p>
      </DocCard>

      <DocCard icon={<Type size={24} />} title="데이터 유형">
        <Lead>
          각 필드에는 유형이 있어요. 유형은 겉모습만의 문제가 아니라, 값이 올바르게 정렬되고, 합산되고,
          Cleaner 규칙에서 비교되고, 차트로 표시되는지를 결정해요. Flow 단계에서 제대로 지정해 두면
          이후 모든 단계에서 수고를 덜 수 있어요.
        </Lead>
        <DataTable
          head={["유형", "용도", "참고"]}
          rows={[
            ["텍스트", "이름, 주소, 설명, 참조 코드", "가장 안전한 기본값이에요."],
            [
              "숫자",
              "합계, 수량, 가격, 요율",
              "나중에 값을 더하거나 비교하거나 차트로 만들려면 반드시 필요해요.",
            ],
            [
              "날짜",
              "발행일, 만기일, 배송일",
              <Fragment key="f2">
                일관된 출력 형식으로 바꾸는 일은 추출이 아니라{" "}
                <DocLink href="/docs/cleaners">Cleaner</DocLink>의 몫이에요.
              </Fragment>,
            ],
            [
              "혼합/영숫자",
              "부품 번호, 컨테이너 코드, 사업자 번호처럼 문자와 숫자가 섞인 값",
              "앞자리 0이나 문자가 사라지면 안 될 때는 숫자 대신 이 유형을 쓰세요.",
            ],
            [
              "이미지",
              "문서에 인쇄된 그림: 사진, 로고, 서명, 도장",
              "추출해 안전하게 저장한 뒤, 기간이 제한된 링크로 전달해요.",
            ],
          ]}
        />
        <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="인쇄된 그대로 추출하고, 정규화는 나중에">
          유형으로 형식을 바꾸려고 하지 마세요. 문서에 나온 그대로 값을 가져온 다음, Cleaner로 통화를
          변환하고, 날짜를 다시 표기하고, 소수점 구분 기호를 고치세요. 추출과 변환을 동시에 하면
          숫자가 잘못 나왔을 때 원인을 찾기가 더 어려워요.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Crosshair size={24} />} title="추출 힌트">
        <Lead>
          힌트는 템플릿을 만들지 않고도 필드를 명확히 구분하는 방법이에요. 한 머리글 영역에 날짜 세
          개, 합계 두 개, 주문 번호와 송장 번호가 함께 있는 것처럼, 문서에 비슷해 보이는 값이 여러 개
          있을 때 가장 중요해요.
        </Lead>
        <p>
          <strong>메타데이터 필드</strong>에는 다음 힌트를 자유롭게 조합할 수 있어요.
        </p>
        <DataTable
          head={["힌트", "AI에게 알려 주는 것", "이럴 때 좋아요"]}
          rows={[
            [
              "예시 값",
              "문서에서 복사한 실제 값.",
              "거의 모든 경우. 형식, 길이, 모양을 한 번에 보여 주는 가장 효과적인 힌트예요.",
            ],
            [
              "라벨 옆",
              <Fragment key="f3">
                값 옆에 인쇄된 라벨. 여러 변형을 나열하세요:{" "}
                <em>Invoice Number, Invoice #, Inv No</em>.
              </Fragment>,
              "공급업체마다 라벨이 다른 머리글 필드.",
            ],
            [
              "특정 페이지 영역",
              "왼쪽 위부터 오른쪽 아래까지 아홉 구역 중 하나.",
              "오른쪽 위의 문서 번호처럼 항상 같은 모서리에 있는 값.",
            ],
            [
              "예상 범위",
              "최솟값, 최댓값 또는 둘 다. 엄격한 규칙이 아니라 참고 정보로 다뤄요.",
              "소수점 오독 잡아내기 — 270.30이어야 할 합계가 27,030으로 읽힌 경우.",
            ],
            [
              "추가 힌트",
              "위 옵션으로 다룰 수 없는 내용을 적는 자유 텍스트.",
              "“총액이 아니라 항상 순액을 사용”과 같은 규칙.",
            ],
          ]}
        />
        <p>
          <strong>테이블 필드</strong>의 힌트는 달라요. AI가 페이지의 한 지점이 아니라 열을 찾기
          때문이에요.
        </p>
        <DataTable
          head={["힌트", "AI에게 알려 주는 것"]}
          rows={[
            [
              "소스 유형",
              "열이 있는 실제 테이블의 데이터라면 테이블, 계약서처럼 구조가 없는 텍스트 속에 행 형태로 들어 있는 값이라면 자유 형식.",
            ],
            [
              "열 머리글",
              "인쇄된 그대로의 머리글 텍스트. 공급업체들이 쓰는 모든 변형을 나열하면 필드 하나로 모두 맞출 수 있어요.",
            ],
            ["예상 범위", "그 열에 들어갈 숫자의 합리적인 범위."],
            ["예시 값", "문서에서 가져온 실제 셀 값."],
            [
              "추가 정보",
              "머리글만으로는 모호할 때 그 열이 실제로 무엇을 나타내는지 — “할인 전 단가”.",
            ],
          ]}
        />
        <InfoBox color="green" icon={<Info size={20} />} title="힌트 없이 시작하세요">
          필드를 추가하고 실제 문서 하나를 실행한 다음, 결과가 틀린 곳에만 힌트를 추가하세요.
          처음부터 모든 필드에 힌트를 달면 애초에 모호하지 않았던 필드에 시간을 쓰게 되고, 지나치게
          구체적인 힌트는 예상하지 못한 레이아웃을 배제해 오히려 추출을 나쁘게 만들 수 있어요. Flow에
          Run이 몇 개 쌓이면 <strong>진단</strong>이 힌트를 제안해 줄 수 있어요.
        </InfoBox>
        <p>
          <strong>날짜</strong>와 <strong>이미지</strong> 필드에는 예시 값이 적용되지 않으므로, 날짜에
          관한 안내는 추가 힌트 칸에 적으세요.
        </p>
      </DocCard>

      <DocCard icon={<Puzzle size={24} />} title="복합 필드">
        <Lead>
          어떤 테이블 열은 한 셀에 여러 값을 담고 있어요. 칸 하나에 <em>S:2 M:5 L:3</em>처럼 인쇄된
          사이즈별 수량이 그 예예요. 복합 필드는 그 셀을 하위 필드로 나누어, 나중에 파싱해야 하는
          문자열 대신 각 부분을 별도의 값으로 만들어 줘요.
        </Lead>
        <NumberedList
          items={[
            "테이블 필드를 추가하고 복합 필드를 켜요.",
            <Fragment key="f4">
              셀을 구성하는 하위 필드를 정의해요. 예를 들어 <InlineCode>size</InlineCode>는 텍스트로,{" "}
              <InlineCode>quantity</InlineCode>는 숫자로 정의해요.
            </Fragment>,
            "문서에서 묶음이 어떻게 나타나는지 보여 주는 예시 값을 추가해요.",
          ]}
        />
        <p>
          하위 필드는 단일 값을 담으므로 텍스트, 숫자, 날짜, 혼합/영숫자는 될 수 있지만 이미지는 될 수
          없어요. 복합 필드는 반복되는 셀을 풀어내는 것이 목적이므로 테이블 필드에서만 쓸 수 있어요.
        </p>
        <InfoBox color="blue" icon={<Boxes size={20} />} title="다중 값 메타데이터 필드">
          메타데이터 필드에서는 <strong>여러 값 허용</strong>이 같은 역할을 해요. 영수증 번호 여러
          개, 구매 주문 참조 여러 개처럼 한 문서에 같은 종류의 값이 정당하게 여러 개 있을 수 있을 때
          켜면, 필드가 값 하나 대신 목록을 돌려줘요. 이미지 필드에서는 쓸 수 없어요.
        </InfoBox>
      </DocCard>

      <DocCard icon={<ImageIcon size={24} />} title="이미지 추출하기">
        <Lead>
          이미지 필드는 텍스트가 아니라 문서 속 그림을 가져와요. 제품 사진, 서명, 도장, 로고 같은
          것이에요. 메타데이터 이미지 필드는 문서당 이미지 하나를 담고, 테이블 이미지 필드는 각 행에
          해당하는 이미지를 담아요.
        </Lead>
        <BulletList
          items={[
            "이미지는 비공개로 저장되므로, 이후 단계에는 원시 바이트가 아니라 기간이 제한된 링크로 전달돼요",
            "Webhook 페이로드, 이메일 출력, CSV 셀에도 같은 종류의 링크가 들어가요. Run 페이지에서 내보내면 새 링크가 생성돼요",
            "전달된 링크는 7일 동안 유효해요. 링크를 저장하지 말고 이미지를 다운로드해 두세요",
            "이미지 필드는 복합 필드나 다중 값 필드가 될 수 없고, 예시 값 힌트도 적용되지 않아요",
          ]}
        />
      </DocCard>

      <DocCard icon={<FilePlus size={24} />} title="스키마 만들기">
        <Lead>
          메타데이터 필드를 먼저, 그다음 테이블 필드, 마지막으로 힌트를 만드세요. 실제 문서로 일찍
          테스트하세요. 서류상으로 맞아 보이는 스키마와 실제 서류를 견뎌 내는 스키마는 다르니까요.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f5">
              <strong>Flow 만들기</strong>를 클릭하고 템플릿, AI 제안, 빈 Flow 중 하나를 골라요.
              문서를 나타내는 이름(<em>공급업체 송장</em>)과 제대로 된 설명을 입력해요. 설명은 추출
              정확도를 높이고, 나중에{" "}
              <DocLink href="/docs/collections">Collection</DocLink>이 문서를 맞춰 볼 때 기준이 돼요.
            </Fragment>,
            <Fragment key="f6">
              <strong>메타데이터 필드</strong> 아래에서 문서당 한 번 나오는 값마다{" "}
              <strong>필드 추가</strong>를 클릭하고, 그때그때 데이터 유형을 지정해요.
            </Fragment>,
            <Fragment key="f7">
              <strong>테이블 필드</strong> 아래에서 반복되는 품목 테이블의 열마다 필드를 추가해요.
            </Fragment>,
            <Fragment key="f8">
              <strong>추출 힌트</strong>는 필요한 필드에만 추가해요.
            </Fragment>,
            <Fragment key="f9">
              Flow는 이미 <strong>활성</strong> 상태예요. <strong>실행</strong>을 클릭해 실제 문서
              하나를 처리하고, 결과를 원본과 비교해요.
            </Fragment>,
          ]}
        />
        <p>필드의 핸들을 드래그하면 순서를 바꿀 수 있어요.</p>
        <WarningBox>
          필드 이름을 바꾸면 그 필드를 쓰는 모든 곳에서 키가 바뀌어요. Webhook 페이로드, Bucket 열
          매핑, CSV 머리글, 그리고 그 필드를 읽는 모든{" "}
          <DocLink href="/docs/cleaners">Cleaner</DocLink>가 영향을 받아요. 이미 운영 중인 Flow의 필드
          이름을 바꾸기 전에 무엇이 연결되어 있는지 확인하세요.
        </WarningBox>
      </DocCard>

      <DocCard icon={<FileInput size={24} />} title="Flow가 읽는 파일">
        <Lead>
          Flow는 업로드, 이메일, API 등 모든 경로로 PDF, 이미지, 스프레드시트를 받아요. 파일을 어떻게
          읽을지는 Tavnit이 정하므로 형식별로 따로 설정할 것이 없어요.
        </Lead>
        <DataTable
          head={["파일", "형식", "읽는 방식"]}
          rows={[
            [
              "PDF",
              "PDF",
              "디지털 PDF는 바로 읽어요. 스캔된 PDF는 자동으로 감지되어 먼저 OCR로 읽어요.",
            ],
            [
              "이미지",
              "PNG, JPG, JPEG, JFIF",
              "스캔된 페이지처럼 읽어요. JFIF는 일부 Windows 브라우저가 기본으로 저장하는 JPEG 변형이고, 다른 JPEG와 똑같이 작동해요.",
            ],
            [
              "스프레드시트",
              "XLSX, XLS, CSV",
              "처음 보이는 시트를 읽어요. 다른 시트와 숨겨진 시트는 무시하므로, 원하는 데이터는 첫 번째 시트에 두세요.",
            ],
          ]}
        />
        <p>
          너무 큰 시트는 명확한 오류와 함께 거부돼요. 통합 문서의 각 시트를 별도 문서로 처리하려면
          대신 <DocLink href="/docs/splitters">Splitter</DocLink>를 거쳐 보내세요.
        </p>
        <InfoBox color="blue" icon={<Info size={20} />} title="불량 스캔: 추출이 잘 안 되는 파일에 OCR 강제하기">
          스캔 문서에는 이미 OCR이 자동으로 적용돼요. 그런데 어떤 파일은 디지털처럼 보여도 텍스트
          레이어가 망가져 있어요. 품질이 낮은 텍스트가 포함된 스캔본이나, 특이한 도구로 내보낸 PDF가
          그래요. 이런 경우 Flow 설정에서 <strong>불량 스캔</strong>을 열어 켜세요. 그러면 Flow의 모든
          파일을 먼저 OCR로 읽고, 복원된 텍스트에서 추출해요. OCR을 사용할 수 없거나 실패하면 Run은
          자동으로 표준 처리 과정으로 돌아가요.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Braces size={24} />} title="Flow에 연결할 수 있는 것">
        <Lead>
          무엇이 나올지는 스키마가 정하고, 나온 결과에 무슨 일이 일어날지는 Flow의 나머지 부분이
          정해요. 아래 항목은 각각 독립적이에요. 필요한 것만, 원하는 순서로, 언제든 연결하세요.
        </Lead>
        <DataTable
          head={["단계", "연결 항목", "하는 일"]}
          rows={[
            [
              "입력",
              <Fragment key="f10">
                <DocLink href="/docs/email-integration">이메일 트리거</DocLink>
              </Fragment>,
              "Flow에 전용 수신함 주소를 만들어 주어, 전달된 문서(PDF, 이미지, 스프레드시트)가 자동으로 처리되게 해요.",
            ],
            [
              "입력",
              <Fragment key="f11">
                <DocLink href="/docs/collections">Collections</DocLink>
              </Fragment>,
              "이 Flow로 문서를 보낼 수 있는 Collection 목록이에요.",
            ],
            [
              "처리",
              <Fragment key="f12">
                <DocLink href="/docs/cleaners">Cleaner</DocLink>
              </Fragment>,
              "모든 Run의 행을 정리해요. 형식 변경, 변환, 계산, 조회, 규칙 실행을 해요.",
            ],
            [
              "처리",
              <Fragment key="f13">
                <DocLink href="/docs/agents">Agent</DocLink>
              </Fragment>,
              "추출이 끝난 뒤 추출된 필드를 입력으로 삼아 실행돼요.",
            ],
            [
              "처리",
              "양식 템플릿",
              "Run에서 추출한 값으로 PDF 템플릿을 채워요.",
            ],
            [
              "출력",
              <Fragment key="f14">
                <DocLink href="/docs/email-integration">이메일 출력</DocLink>
              </Fragment>,
              "Run이 성공할 때마다 하나 이상의 주소로 결과를 이메일로 보내요. JSON, CSV, 채워진 양식, 원본 문서를 선택적으로 첨부할 수 있어요.",
            ],
            [
              "출력",
              <Fragment key="f15">
                <DocLink href="/docs/webhooks">Webhook</DocLink>
              </Fragment>,
              "결과를 여러분의 엔드포인트로 POST해요. HTTPS만 지원해요.",
            ],
            [
              "출력",
              <Fragment key="f16">
                <DocLink href="/docs/buckets">Bucket 내보내기</DocLink>
              </Fragment>,
              "각 Run의 행을 구조화된 테이블에 추가해요. 필드는 열에 매핑돼요.",
            ],
            [
              "설정",
              <Fragment key="f17">
                <DocLink href="/docs/human-in-the-loop">사람 검토</DocLink>
              </Fragment>,
              "무엇이든 전달되기 전에 Run을 일시 중지하고 검토자를 기다려요.",
            ],
            ["설정", "불량 스캔", "Flow의 모든 파일에 OCR을 강제해요(위 참고)."],
            [
              "설정",
              "Flow ID",
              <Fragment key="f18">
                <DocLink href="/docs/api-integration">API</DocLink>를 호출할 때 전달하는 식별자예요.
              </Fragment>,
            ],
          ]}
        />
        <p>
          <strong>이메일 트리거 옵션.</strong> 트리거를 켜면 패널에 Flow의 수신함 주소와 설정 두 가지가
          표시돼요. <strong>허용된 발신자</strong>는 이메일로 Run을 시작할 수 있는 사람을 제한해요.
          비워 두면 모든 발신자를 받아요. <strong>이메일 본문 처리</strong>는 메시지 본문에서도
          추출하며, <em>첨부 파일이 없을 때만</em>(기본값이라 안내 메모가 두 번째 Run을 시작하지
          않아요) 또는 <em>항상</em> 중에서 고를 수 있어요. 발신자 주소는 각 Run에 기록되고 Runs
          페이지에 표시돼요. 자세한 내용은{" "}
          <DocLink href="/docs/email-integration">이메일 통합</DocLink>에서 다뤄요.
        </p>
      </DocCard>

      <DocCard icon={<HeartPulse size={24} />} title="Flow 진단하기">
        <Lead>
          Flow가 문서를 어느 정도 처리하고 나면, Flow 상단 바의 <strong>진단</strong> 버튼으로{" "}
          <strong>Flow 진단</strong>을 열 수 있어요. 최근 완료된 Run을 살펴보고, 자꾸 비어 있거나
          유형이 잘못 나오는 필드를 찾아 수정안을 제안해요.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="d0">
              Flow를 열고 <strong>진단</strong>을 클릭해요. 이 버튼은 Flow에 필드가 하나 이상 있을 때
              소유자와 관리자에게 표시돼요.
            </Fragment>,
            "Tavnit이 최근 Run을 읽고, 필드가 실패한 문서 몇 개를 다시 읽은 뒤 수정안을 작성해요. 잠시 시간이 걸려요.",
            <Fragment key="d1">
              결과를 검토해요. 문제가 있는 필드마다 얼마나 자주 비어 있었는지 또는 유형이 틀렸는지가
              표시되고, <strong>현재</strong> 힌트 옆에 <strong>제안</strong> 힌트가 나란히 보여요.{" "}
              <strong>추천 설명</strong>이 함께 제안될 수도 있어요.
            </Fragment>,
            <Fragment key="d2">
              동의하는 수정안은 그대로 두거나 편집한 뒤 <strong>적용</strong>을 클릭해요. 적용하기
              전에는 아무것도 바뀌지 않고, 패널을 닫으면 제안은 버려져요.
            </Fragment>,
          ]}
        />
        <p>
          모든 것이 괜찮다면 <em>“추출 상태가 양호해 보여요”</em>가 표시돼요. 진단은 클릭할 때만
          실행돼요. 수정안을 적용한 뒤에는 실제 문서를 다시 실행해 효과가 있었는지 확인하세요.
        </p>
      </DocCard>

      <div id="runs" className="scroll-mt-24">
        <DocCard icon={<Play size={24} />} title="Runs: 문서가 처리될 때 일어나는 일">
          <Lead>
            모든 문서는 Run이 되고, 모든 Run은 같은 순서를 거쳐요. 순서를 알면 결과가 늦게 오거나,
            틀리게 오거나, 아예 오지 않을 때 어디를 봐야 할지 알 수 있어요.
          </Lead>
          <NumberedList
            items={[
              "문서가 저장되고 Run이 대기열에 들어가요.",
              "추출 단계에서 문서를 읽고 메타데이터 값과 테이블 행을 만들어요.",
              "Cleaner가 연결되어 있으면 그 행을 정리해요. 변환, 계산된 열, 조회가 여기서 이루어져요.",
              "조건부 규칙이 실행돼요. 행을 제외하거나, 알림을 보내거나, 검토를 요청할 수 있어요.",
              "검토가 필요하면 Run이 일시 중지되고, 검토자가 승인할 때까지 아무것도 전달되지 않아요.",
              "출력이 실행돼요: 이메일, Bucket 내보내기, Webhook. 그다음 Run이 완료로 표시되고, 연결된 Agent가 있으면 시작돼요.",
            ]}
          />
          <DataTable
            head={["Run 상태", "의미"]}
            rows={[
              ["대기 중(대기열)", "저장되어 워커를 기다리는 중이에요."],
              ["처리 중", "추출, 정리 또는 전달이 진행 중이에요. Run 페이지에 현재 단계가 표시돼요."],
              [
                "다시 시도하는 중",
                "이전 시도가 일시적인 이유로 실패해 Run이 자동으로 다시 대기열에 들어갔어요(아래 참고).",
              ],
              [
                "HITL 검토 대기",
                <Fragment key="f19">
                  <DocLink href="/docs/human-in-the-loop">사람 검토</DocLink>를 위해 일시 중지된
                  상태예요. 아직 아무것도 전달되지 않았어요.
                </Fragment>,
              ],
              ["완료됨", "추출이 끝나고 설정된 모든 출력이 실행되었어요."],
              [
                "취소됨",
                "대기 중이거나 처리 중일 때 누군가 Run을 취소했거나, 검토자가 거부했어요. 더 이상 아무것도 전달되지 않아요.",
              ],
              ["실패", "문서를 처리할 수 없었어요. 이유는 Run 로그에 나와 있어요."],
            ]}
          />
        </DocCard>
      </div>

      <DocCard icon={<History size={24} />} title="Run 다루기">
        <Lead>
          <strong>Runs</strong> 페이지에는 조직의 모든 Run이 나열되고, 각 Flow에도 자체{" "}
          <strong>최근 Run</strong> 탭이 있어요. <strong>필터</strong>로 상태, 기간, Flow, 사용자,
          소스 또는 붙여 넣은 Run ID로 범위를 좁힐 수 있어요.
        </Lead>
        <DataTable
          head={["작업", "위치", "참고"]}
          rows={[
            [
              "세부 정보 보기",
              "Run 작업 메뉴, 또는 행 클릭",
              "원본 파일 옆에 추출된 데이터, Run 정보, 처리 로그가 표시돼요.",
            ],
            [
              "CSV 다운로드",
              "Run 작업 메뉴",
              "완료된 Run만 가능해요. CSV 내보내기와 JSON 내보내기는 Run 페이지에도 있어요.",
            ],
            [
              "파일 다운로드",
              "Run 작업 메뉴, 또는 Run 페이지의 다운로드",
              "원본 파일이에요. 스프레드시트는 바로 미리 볼 수 없으니 다운로드해서 보세요.",
            ],
            [
              "Run 취소",
              "Run 작업 메뉴",
              "아직 대기 중이거나 실행 중인 Run에만 가능해요.",
            ],
          ]}
        />
        <p>
          <strong>실행한 사람</strong> 열은 Run을 시작한 사람을 보여 줘요. 업로드라면 사용자,
          이메일로 들어온 Run이라면 발신자 주소예요. <strong>소스</strong> 열은 직접 업로드, API,
          이메일 등 Run이 어떻게 들어왔는지 알려 줘요.
        </p>
      </DocCard>

      <DocCard icon={<RotateCcw size={24} />} title="실패한 Run과 자동 재시도">
        <Lead>
          대부분의 실패는 읽을 수 없는 파일이나 지원하지 않는 유형처럼 문서 쪽 문제라서 다시 시도해도
          소용이 없어요. 하지만 처리 워커가 Run 도중에 재시작되거나 AI 제공업체에 일시적인 장애가
          생기는 경우처럼 그렇지 않은 실패도 있어요. 이런 경우를 위해 조직에서 Tavnit이 스스로 다시
          시도하도록 설정할 수 있어요.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="r0">
              <strong>설정</strong> → <strong>조직</strong> → <strong>실패한 Run</strong>으로
              이동해요. 이 탭은 소유자만 볼 수 있어요.
            </Fragment>,
            <Fragment key="r1">
              <strong>실패한 Run 자동 재시도</strong>를 켜요.
            </Fragment>,
            <Fragment key="r2">
              <strong>Run당 최대 재시도 횟수</strong>를 1, 2, 3 중에서 정해요.
            </Fragment>,
          ]}
        />
        <BulletList
          items={[
            "다시 시도한 Run은 같은 Run ID를 유지하므로 API 폴링, Webhook, 링크가 계속 작동해요.",
            "출력은 Run이 완료될 때만 실행되므로, 재시도 때문에 문서가 두 번 전달되는 일은 없어요.",
            "다시 시도하지 않는 경우: 잘못된 파일, 지원하지 않는 유형, 취소된 Run, 검토를 위해 일시 중지된 Run, 하루보다 오래전에 만들어진 Run.",
            "워커 재시작으로 유실된 Run은 자동으로 감지돼요. 자동 재시도가 켜져 있으면 다시 대기열에 들어가고, 꺼져 있으면 실패로 표시돼요.",
            "Run 페이지에는 이전 시도가 나열되고 각각 워커 유실 또는 실패와 그 오류가 표시되며, Runs 목록에는 재시도 배지가 표시돼요.",
          ]}
        />
        <p>
          실패로 끝난 Run에 대해 알림을 받으려면 같은 탭의 <strong>Run 실패 알림</strong>에 주소를
          추가하세요.
        </p>
      </DocCard>

      <DocCard icon={<LifeBuoy size={24} />} title="추출 품질 개선하기">
        <Lead>
          필드가 잘못 나올 때 해결책은 거의 항상 문서가 아니라 그 필드의 정의에 있어요. Flow에 Run이
          있다면 <strong>진단</strong>부터 시작하고, 그다음 아래 항목을 하나씩 확인하세요. 대부분은 처음
          두 가지로 해결돼요.
        </Lead>
        <DataTable
          head={["증상", "가능한 원인", "해결 방법"]}
          rows={[
            [
              "비슷한 값 여러 개 중 엉뚱한 값이 나와요",
              "값들을 구분할 단서가 없어요.",
              "값 옆에 있는 라벨이나 값이 나타나는 페이지 영역을 추가하세요.",
            ],
            [
              "필드가 비어 있어요",
              "필드 이름만으로는 값을 특정할 수 없었어요.",
              "실제 예시 값을 두세 개 추가하세요. 대개 그것만으로 충분해요.",
            ],
            [
              "품목이 여러 개인데 하나만 나와요",
              "메타데이터 필드로 정의되어 있어요.",
              "테이블 필드로 다시 정의하세요.",
            ],
            [
              "모든 행에 같은 값이 반복돼요",
              "문서 수준의 값이 테이블 필드로 정의되어 있어요.",
              "메타데이터 필드로 다시 정의하세요.",
            ],
            [
              "숫자가 100배 차이 나요",
              "소수점과 천 단위 구분 기호를 반대로 읽었어요.",
              "예상 범위를 지정하고, Cleaner에서 형식을 정규화하세요.",
            ],
            [
              "앞자리 0이나 문자가 사라져요",
              "필드 유형이 숫자로 되어 있어요.",
              "혼합/영숫자로 바꾸세요.",
            ],
            [
              "열이 서로 뒤섞여요",
              "두 열의 머리글이 비슷해요.",
              "인쇄된 열 머리글을 추가하고, 추가 정보에 그 열을 설명하세요.",
            ],
            [
              "어떤 공급업체에서는 잘 되고 다른 곳에서는 안 돼요",
              "힌트가 한 공급업체의 레이아웃만 설명하고 있어요.",
              "다른 공급업체의 라벨과 머리글 변형을 같은 필드에 추가하세요.",
            ],
            [
              "디지털처럼 보이는 파일에서 텍스트가 깨져 나와요",
              "PDF에 포함된 텍스트 레이어가 망가져 있어요.",
              "불량 스캔을 켜서 Flow가 OCR로 읽게 하세요.",
            ],
            [
              "스프레드시트 결과가 비어 있거나 일부만 나와요",
              "데이터가 처음 보이는 시트에 있지 않아요.",
              "데이터를 첫 번째 시트로 옮기거나, 시트가 여러 개인 통합 문서에는 Splitter를 쓰세요.",
            ],
          ]}
        />
        <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="한 번에 하나씩 바꾸세요">
          변경할 때마다 같은 문서를 다시 실행하세요. 힌트 네 개를 한꺼번에 고치고 다시 실행하면 결과가
          나아졌다는 것은 알 수 있어도 어떤 변경 덕분인지는 알 수 없고, 네 개 중 하나가 오히려 상황을
          나쁘게 만들었을 수도 있어요.
        </InfoBox>
        <InfoBox color="blue" icon={<Wand2 size={20} />} title="추출이 아니라 데이터를 고치세요">
          값은 맞는데 날짜, 통화, 단위, 대소문자 같은 형식이 문제라면 Flow는 그대로 두고{" "}
          <DocLink href="/docs/cleaners">Cleaner</DocLink>를 추가하세요.
        </InfoBox>
      </DocCard>

      <Related
        links={[
          {
            href: "/docs/cleaners",
            label: "Flow가 추출한 데이터 정규화하고 보강하기",
            description:
              "날짜 형식을 바꾸고, 통화를 변환하고, 합계를 계산하고, 규칙을 어긴 행을 표시해요.",
          },
          {
            href: "/docs/email-integration",
            label: "이메일로 Flow에 문서 보내기",
            description:
              "수신함 주소, 허용된 발신자, 이메일 본문 처리, 이메일 출력.",
          },
          {
            href: "/docs/collections",
            label: "문서를 알맞은 Flow로 자동 라우팅하기",
            description:
              "Flow의 이름과 설명이 추출 정확도 외에도 중요한 이유.",
          },
          {
            href: "/docs/api-integration",
            label: "직접 작성한 코드에서 Flow 실행하기",
            description:
              "Flow ID, API 키 인증, Python과 JavaScript 예제.",
          },
          {
            href: "/docs/webhooks",
            label: "Flow가 만드는 페이로드 살펴보기",
            description:
              "엔드포인트가 받는 JSON에 메타데이터 필드와 테이블 필드가 어떻게 나타나는지.",
          },
        ]}
      />
    </section>
  );
}
