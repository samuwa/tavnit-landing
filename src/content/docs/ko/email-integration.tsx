import { Fragment } from "react";
import {
  AlertTriangle,
  AtSign,
  Code2,
  Copy,
  ExternalLink,
  FileSpreadsheet,
  Info,
  LifeBuoy,
  Mail,
  Paperclip,
  Send,
  ShieldCheck,
  Workflow,
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
import type { DocsPageSchemaData } from "../types";

/** /ko/docs/email-integration — translated from src/app/docs/email-integration/page.tsx. */

/** Mirrors the visible numbered steps under "이메일 트리거 켜기". */
export const schema: DocsPageSchemaData = {
  howTo: {
    name: "Tavnit 이메일 트리거로 이메일 첨부 파일에서 데이터 추출하기",
    description:
      "Tavnit Flow의 이메일 트리거를 켜서 전용 수신함 주소를 받은 다음, 그 주소로 문서를 전달하세요. 지원되는 첨부 파일마다 별도의 추출 Run이 만들어져요.",
    steps: [
      {
        name: "Flow 열기",
        text: "Tavnit 앱에서 Flows로 이동해 문서를 받을 Flow를 여세요.",
      },
      {
        name: "이메일 트리거 켜기",
        text: "Flow 상세 페이지에서 이메일 트리거 패널을 열고 켜세요. Flow의 수신함 주소가 나타나요.",
      },
      {
        name: "주소 복사",
        text: "수신함 주소 옆의 복사를 클릭하세요. 필요하면 같은 패널에서 허용된 발신자를 추가하거나 이메일 본문 처리를 켜세요.",
      },
      {
        name: "테스트 문서 보내기",
        text: "PDF 한 개를 그 주소로 보내고 Runs 페이지를 확인하세요. 소스가 이메일인 새 Run이 나타나요.",
      },
      {
        name: "전달 자동화",
        text: "테스트가 성공하면 메일 클라이언트나 공유 수신함에 해당 메시지를 그 주소로 자동 전달하는 규칙을 추가하세요.",
      },
    ],
  },
};

export default function EmailIntegrationKo() {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-fg to-fg-4 bg-clip-text text-transparent">
        이메일 연동
      </h1>

      <DocCard icon={<Mail size={24} />} title="이메일 처리 방식">
        <Lead>
          Tavnit의 모든 Flow는 자체 수신함 주소를 가질 수 있어요. 이메일 트리거를 켜고 그 주소로
          문서를 보내면, Tavnit은 지원되는 첨부 파일마다 별도의 추출 Run을 만들어 앱에서 업로드한
          것과 똑같이 처리해요.
        </Lead>
        <p>
          설치할 것도 없고 메일함을 주기적으로 확인하지도 않아요. 그 주소로 메일을 전달하면 Tavnit이
          반응해요. 그래서 &ldquo;송장이 이메일로 도착한다&rdquo;에서 &ldquo;송장이 구조화된 행으로
          도착한다&rdquo;까지 코드 없이 가장 짧게 가는 방법이에요. Collection, Splitter, Pipeline,
          Matcher, Subject에도 각자의 주소가 있어요.
        </p>
        <BulletList
          items={[
            "수신함에서 송장이나 영수증을 바로 전달하기",
            "자동 전달 규칙을 건 공유 매입 채무(AP) 메일함",
            "공급업체에 Tavnit 로그인을 주지 않고 문서를 보내게 하기",
            "첨부 파일 없는 주문 확인처럼 메시지 본문에 담긴 데이터 추출하기",
          ]}
        />
      </DocCard>

      <DocCard icon={<ExternalLink size={24} />} title="이메일 트리거 켜기">
        <Lead>
          트리거는 기본적으로 꺼져 있어요. Flow 상세 페이지에서 켜고, 표시되는 주소를 복사한 다음,
          전달 규칙을 연결하기 전에 문서 하나를 테스트로 보내 보세요.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f0">
              <strong>Flows</strong>로 이동해 문서를 받을 Flow를 여세요.
            </Fragment>,
            <Fragment key="f1">
              <strong>이메일 트리거</strong> 패널을 열고 켜세요. Flow의{" "}
              <strong>수신함 주소</strong>가 나타나요.
            </Fragment>,
            <Fragment key="f2">
              주소 옆의 <strong>복사</strong>를 클릭하세요. 같은 패널에서{" "}
              <strong>허용된 발신자</strong>를 추가하거나 <strong>이메일 본문 처리</strong>를 켤 수
              있어요(둘 다 아래에서 설명해요).
            </Fragment>,
            <Fragment key="f3">
              그 주소로 PDF 한 개를 보내고 <strong>Runs</strong> 페이지를 확인하세요. 소스가{" "}
              <strong>이메일</strong>인 새 Run이 나타나고, 발신자 주소가 Run에 기록돼요.
            </Fragment>,
            "테스트가 성공하면 메일 클라이언트나 공유 수신함에 전달 규칙을 추가하세요.",
          ]}
        />
        <InfoBox color="blue" icon={<Info size={20} />} title="첨부 파일 하나당 Run 하나">
          송장 세 개가 첨부된 이메일은 Run 세 개를 따로 만들고, 각 Run은 자체 결과와 Runs 목록의
          자체 행을 가져요. 문서 세 개를 담은 Run 하나를 만들지 않아요.
        </InfoBox>
        <WarningBox>
          트리거가 꺼진 주소(또는 비활성 Collection)로 보낸 메일은 수신된 뒤 폐기돼요. 발신자는 반송
          메일도 오류도 받지 않아요. 문서가 사라지는 것 같다면 먼저 토글을 확인하세요.
        </WarningBox>
      </DocCard>

      <DocCard icon={<ShieldCheck size={24} />} title="허용된 발신자">
        <Lead>
          기본적으로는 누구든 그 주소로 이메일을 보내 Run을 시작할 수 있어요. 이메일 트리거 패널의{" "}
          <strong>허용된 발신자</strong>에 주소를 추가하면 그 발신자만 허용되고, 다른 사람이 보낸
          메일은 아무 알림 없이 폐기돼요.
        </Lead>
        <BulletList
          items={[
            "항목은 도메인이 아니라 전체 이메일 주소예요. 대소문자와 표시 이름은 비교할 때 무시돼요.",
            "목록을 비워 두면 모든 발신자의 이메일을 받아요.",
            "이 목록은 Flow, Collection, Splitter, Pipeline, Matcher, Subject의 이메일 트리거에서 쓸 수 있어요.",
            <Fragment key="f4">
              공유 메일함을 거쳐 전달하면 Tavnit에 보이는 발신자는 대개 전달하는 메일함이므로, 그
              주소를 허용해야 해요.
            </Fragment>,
          ]}
        />
      </DocCard>

      <DocCard icon={<Mail size={24} />} title="이메일 본문 처리">
        <Lead>
          어떤 데이터는 첨부 파일로 오지 않아요. 주문 확인, 예약 알림, 메시지에 수량을 적어 보내는
          공급업체 같은 경우예요. <strong>이메일 본문 처리</strong>를 켜면 Tavnit이 메시지 본문을
          PDF로 변환해 다른 문서와 똑같이 처리해요. Flow와 Collection에서 쓸 수 있어요.
        </Lead>
        <DataTable
          head={["모드", "동작"]}
          rows={[
            [
              <Fragment key="f5"><strong>첨부 파일이 없을 때만</strong>(기본값)</Fragment>,
              "이메일에 문서 첨부 파일이 없을 때만 본문을 처리해요. 송장 옆에 붙은 “첨부 파일 참고” 같은 안내 문구는 건너뛰므로, 이메일 하나가 Run 두 개를 시작하는 일이 없어요.",
            ],
            [
              <Fragment key="f6"><strong>항상</strong></Fragment>,
              "모든 첨부 파일과 함께 본문도 처리하며, 각각 별도의 Run으로 처리해요.",
            ],
          ]}
        />
        <BulletList
          items={[
            "본문 PDF는 다른 문서처럼 검토 화면에 나타나고, Run에는 이메일 본문에서 왔다는 표시가 붙어요.",
            "인용된 답장 내역과 서명은 메일 제공업체가 식별할 수 있는 경우 제외돼요.",
            "메시지 안의 이미지는 읽지 않아요. 본문 처리 여부를 판단할 때 인라인 서명 이미지는 첨부 파일로 치지 않아요.",
            "텍스트가 거의 없는 본문(“ok”, “감사합니다”, 빈 전달 메일)은 처리하지 않아요.",
          ]}
        />
      </DocCard>

      <DocCard icon={<AtSign size={24} />} title="이메일 주소가 있는 기능">
        <Lead>
          이메일 트리거는 Flow에만 있는 게 아니에요. 문서 유형 하나 대신 분류 단계 전체, Pipeline,
          비교 작업에 주소를 연결할 수 있어요.
        </Lead>
        <DataTable
          head={["보낼 곳", "주소 형식", "동작"]}
          rows={[
            [
              "Flow",
              <Fragment key="f7"><InlineCode>flow-name-&lt;id&gt;@mg.tavnit.io</InlineCode></Fragment>,
              "각 첨부 파일을 그 Flow가 추출해요.",
            ],
            [
              "Collection",
              <Fragment key="f8"><InlineCode>name-&lt;id&gt;-collection@mg.tavnit.io</InlineCode></Fragment>,
              <Fragment key="f9">
                각 첨부 파일을 분류해 알맞은 Flow나 Splitter로 보내요.{" "}
                <DocLink href="/docs/collections">Collection이 문서를 라우팅하는 방식</DocLink>을
                참고하세요.
              </Fragment>,
            ],
            [
              "Splitter",
              <Fragment key="f10"><InlineCode>&lt;id&gt;-splitter@mg.tavnit.io</InlineCode></Fragment>,
              <Fragment key="f11">
                각 첨부 파일을 먼저 개별 문서로 나눠요.{" "}
                <DocLink href="/docs/splitters">여러 문서가 든 파일 분할하기</DocLink>를 참고하세요.
              </Fragment>,
            ],
            [
              "Pipeline",
              <Fragment key="f12"><InlineCode>&lt;id&gt;-pipeline@mg.tavnit.io</InlineCode></Fragment>,
              <Fragment key="f13">
                PDF 또는 이미지 첨부 파일마다 실행을 하나씩 시작해요.{" "}
                <DocLink href="/docs/pipelines">Pipelines</DocLink>를 참고하세요.
              </Fragment>,
            ],
            [
              "Matcher",
              <Fragment key="f14"><InlineCode>&lt;id&gt;-matcher@mg.tavnit.io</InlineCode></Fragment>,
              <Fragment key="f15">
                이메일 하나에 담긴 PDF와 이미지 첨부 파일을 모두 한 번의 매칭에서 함께 비교하고(항상
                다자간 모드), 결과는 같은 스레드에 답장으로 보내요.{" "}
                <DocLink href="/docs/matchers">Matchers</DocLink>를 참고하세요.
              </Fragment>,
            ],
            [
              "Subject",
              <Fragment key="f16"><InlineCode>&lt;id&gt;-subject@mg.tavnit.io</InlineCode></Fragment>,
              <Fragment key="f17">
                제목, 본문, 파일 이름에 있는 참조 번호나 케이스 고유의 플러스 주소로 각 첨부 파일을
                알맞은 케이스에 정리해요. <DocLink href="/docs/subjects">Subjects</DocLink>를
                참고하세요.
              </Fragment>,
            ],
          ]}
          caption="정확한 주소는 각 기능의 이메일 트리거 패널에서 복사하세요. 위의 형식은 주소를 구별하는 데만 도움이 돼요."
        />
        <InfoBox color="violet" icon={<Workflow size={20} />} title="공급업체에게 어떤 주소를 줘야 할까요?">
          발신자가 항상 한 가지 문서 유형만 보낸다면 Flow 주소를 주세요. 여러 유형(송장, 구매 주문서,
          납품서)을 섞어 보낸다면 Collection 주소를 주고 Tavnit이 분류하게 하세요. 여러 문서가 든
          PDF 하나를 보낸다면 Splitter 주소를 주세요.
        </InfoBox>
      </DocCard>

      <DocCard icon={<Paperclip size={24} />} title="Tavnit이 받는 파일">
        <Lead>
          Flow, Collection, Splitter, Subject는 PDF, 일반적인 이미지, 스프레드시트를 읽어요.
          Pipeline과 Matcher는 PDF와 이미지만 읽어요. 메시지의 다른 파일은 나머지 처리를 실패시키지
          않고 건너뛰어요. 지원되지 않는 파일 하나가 있어도 다른 첨부 파일은 처리돼요.
        </Lead>
        <DataTable
          head={["지원 형식", "확장자"]}
          rows={[
            ["PDF 문서", <Fragment key="f18"><InlineCode>.pdf</InlineCode></Fragment>],
            [
              "이미지",
              <Fragment key="f19"><InlineCode>.png .jpg .jpeg .jfif .tif .tiff .webp .bmp .gif</InlineCode></Fragment>,
            ],
            [
              "스프레드시트(Pipeline, Matcher 제외)",
              <Fragment key="f20"><InlineCode>.xlsx .xls .csv</InlineCode></Fragment>,
            ],
          ]}
        />
        <p>다음 중 하나에 해당하면 첨부 파일은 처리되지 않고 건너뛰어요.</p>
        <DataTable
          head={["건너뛴 이유", "예시"]}
          rows={[
            [
              "지원되지 않는 파일 형식",
              "Word 문서, 압축 파일, .eml 전달 메일, 인식할 수 있는 확장자가 없는 파일.",
            ],
            ["빈 첨부 파일", "0바이트 파일. 대개 전달이 깨진 경우예요."],
            [
              "읽을 수 없는 파일",
              "확장자는 올바르지만 열 수 없는 파일. 다운로드가 중간에 끊긴 파일, 이름만 바꾼 파일, 파싱되지 않는 스프레드시트 등이에요.",
            ],
          ]}
        />
        <InfoBox color="yellow" icon={<AlertTriangle size={20} />} title="서명 이미지도 첨부 파일로 취급돼요">
          이메일 서명의 로고는 이미지 첨부 파일로 도착하는 경우가 많고, Flow는 이를 다른 이미지처럼
          처리해요. 원치 않는 Run이 생긴다면 문서만 전달하거나, 허용된 발신자와 인라인 이미지를
          제거하는 전달 규칙을 함께 쓰세요.
        </InfoBox>
        <p>
          Tavnit이 메시지를 받기 전에 메일 제공업체의 첨부 파일 크기 제한이 먼저 적용돼요. 큰 스캔
          파일이 보내는 쪽에서 반송된다면 앱에서 업로드하거나{" "}
          <DocLink href="/docs/api-integration">REST API</DocLink>로 보내세요.
        </p>
      </DocCard>

      <DocCard icon={<FileSpreadsheet size={24} />} title="스프레드시트 처리 방식">
        <Lead>
          스프레드시트 첨부 파일은 가져올 테이블이 아니라 문서로 취급돼요. 어떻게 처리되는지는
          보내는 곳에 따라 달라요.
        </Lead>
        <DataTable
          head={["보낸 곳", "Tavnit의 처리"]}
          rows={[
            [
              "Flow",
              "첫 번째로 보이는 시트에서 추출해요.",
            ],
            [
              "Collection",
              "첫 번째 시트로 파일을 분류한 다음 선택된 Flow에 넘기고, 그 Flow가 첫 번째로 보이는 시트를 읽어요.",
            ],
            [
              "Splitter",
              "보이면서 비어 있지 않은 시트를 각각 별도의 문서로 보고, 하나씩 분류해 시트 하나짜리 파일로 다음 단계에 보내요.",
            ],
          ]}
        />
        <p>
          아주 큰 시트는 오류와 함께 거부돼요. 스프레드시트를 구조화된 행으로 불러오려면{" "}
          <DocLink href="/docs/cleaners">Cleaner</DocLink> 스윕을 쓰세요.
        </p>
      </DocCard>

      <DocCard icon={<Copy size={24} />} title="중복 방지">
        <Lead>
          메일 서버는 시간 초과 후처럼 같은 메시지를 두 번 이상 전달하기도 해요. Tavnit은 같은 주소로
          다시 전달된 메시지를 알아보고 다시 처리하지 않으므로, 재시도 때문에 Run이 중복 생성되는
          일은 없어요.
        </Lead>
        <BulletList
          items={[
            "Tavnit은 몇 초 안에 메시지 수신을 확인하고 첨부 파일은 백그라운드에서 처리하므로, 첨부 파일이 많은 이메일도 안심하고 보낼 수 있어요.",
            "처리가 중단되면 처음부터 다시 시작하지 않고 멈춘 지점부터 이어서 처리해요.",
            "메시지 하나를 Tavnit 주소 두 개로 보내면 주소마다 한 번씩 처리돼요.",
            "같은 파일을 새 이메일로 다시 보내면 새 메시지이므로 다시 처리돼요.",
          ]}
        />
      </DocCard>

      <DocCard icon={<Send size={24} />} title="결과를 이메일로 다시 보내기">
        <Lead>
          이메일 출력은 돌아가는 길이에요. Run이 성공적으로 끝나면 Tavnit이 설정한 주소로 결과를
          이메일로 보내요. 이메일 트리거와는 별개라서 둘 중 하나만 쓸 수도 있고, 둘 다 써서 보내고
          돌려받는 전체 흐름을 만들 수도 있어요.
        </Lead>
        <NumberedList
          items={[
            "Flow 상세 페이지를 여세요.",
            <Fragment key="f21">
              <strong>이메일 출력</strong> 패널을 여세요.
            </Fragment>,
            <Fragment key="f22">
              <strong>수신자 주소</strong>를 하나 이상 추가하세요.
            </Fragment>,
            <Fragment key="f23">
              <strong>첨부 파일</strong>에서 각 메시지에 담을 내용을 고른 다음 저장하세요.
            </Fragment>,
          ]}
        />
        <DataTable
          head={["옵션", "받게 되는 내용"]}
          rows={[
            ["JSON 추출", "추출 결과를 서식이 적용된 JSON으로 메시지 본문에 담아요."],
            [
              "CSV 추출",
              <Fragment key="f24">
                행을 <InlineCode>rows.csv</InlineCode> 첨부 파일로 보내요. 결과를 스프레드시트로
                옮기는 가장 빠른 방법이에요.
              </Fragment>,
            ],
            ["양식 결과", "Flow가 양식 템플릿을 채우는 경우 채워진 PDF."],
            [
              "원본 문서",
              "처리된 원본 파일(PDF, 이미지 또는 스프레드시트)을 결과와 함께 첨부해요.",
            ],
          ]}
        />
        <InfoBox color="purple" icon={<Code2 size={20} />} title="파일 필드는 링크로 전달돼요">
          파일이나 이미지를 담은 필드는 JSON에 포함되지 않고 유효 기간이 있는 링크로 전달돼요.
          Tavnit은 저장된 문서를 비공개로 유지하므로, 원시 저장소 경로로는 수신함에서 파일을 가져올
          수 없기 때문이에요.
        </InfoBox>
        <BulletList
          items={[
            "출력 이메일은 성공적으로 완료된 Run에서만 발송돼요. 실패한 Run은 아무것도 보내지 않아요.",
            "제목에는 Flow 이름과 Run별 세부 정보가 들어가므로, 메일 클라이언트가 한 Flow의 모든 Run을 한 스레드로 묶지 않아요.",
            <Fragment key="f25">
              Flow에 <DocLink href="/docs/human-in-the-loop">사람 검토</DocLink>가 켜져 있으면
              검토자가 Run을 승인할 때까지 이메일이 대기해요.
            </Fragment>,
            <Fragment key="f26">
              시스템 간 전달에는 이메일보다{" "}
              <DocLink href="/docs/webhooks">webhook</DocLink>이 더 적합해요.
            </Fragment>,
          ]}
        />
      </DocCard>

      <DocCard icon={<Workflow size={24} />} title="예시: 매입 채무(AP) 수신함">
        <Lead>
          흔한 구성은 이미 공급업체 송장을 받고 있는 공유 메일함이에요. 메일을 Collection으로
          전달해 공급업체마다 다른 형식이 알맞은 Flow로 가게 하고, 결과는 재무팀에 이메일로 보내면서
          Bucket에도 쌓아요.
        </Lead>
        <NumberedList
          items={[
            <Fragment key="f27">
              받는 문서 유형마다 Flow를 하나씩 만드세요. 예를 들어 <em>공급업체 송장</em>과{" "}
              <em>납품서</em>를 만들고, 각각에 명확한 설명을 붙이세요.
            </Fragment>,
            <Fragment key="f28">
              두 Flow를 <DocLink href="/docs/collections">Collection</DocLink>에 넣고 Collection의
              이메일 트리거를 켜세요. 허용된 발신자에 공유 메일함을 추가하세요.
            </Fragment>,
            <Fragment key="f29">
              공유 메일함에서 공급업체 도메인이 보낸 첨부 파일이 있는 메시지를 모두 Collection
              주소로 전달하세요.
            </Fragment>,
            <Fragment key="f30">
              각 Flow에서 재무팀용 CSV 첨부 파일과 함께 <strong>이메일 출력</strong>을 켜고, 데이터가
              테이블 하나에 쌓이도록 <DocLink href="/docs/buckets">Bucket 내보내기</DocLink>를
              추가하세요.
            </Fragment>,
            <Fragment key="f31">
              승인 기준 금액을 넘는 건을 전달 전에{" "}
              <DocLink href="/docs/human-in-the-loop">사람 검토</DocLink>로 보내는 조건부 작업이 있는{" "}
              <DocLink href="/docs/cleaners">Cleaner</DocLink>를 추가하세요.
            </Fragment>,
          ]}
        />
        <p>
          재무팀은 아무도 Tavnit을 열 필요가 없어요. 송장은 늘 오던 곳으로 오고, 구조화된 데이터는
          같은 수신함으로 돌아와요.
        </p>
      </DocCard>

      <DocCard icon={<LifeBuoy size={24} />} title="문제 해결">
        <Lead>
          수신 메일은 아무 알림 없이 받아들여지므로, 문서가 나타나지 않아도 수신함에 오류가 남지
          않아요. 이 목록을 위에서부터 확인하세요. 원인은 거의 항상 트리거 토글, 허용된 발신자,
          첨부 파일 형식, 또는 첨부 파일을 제거하는 전달 규칙이에요.
        </Lead>
        <DataTable
          head={["증상", "예상 원인", "해결 방법"]}
          rows={[
            [
              "Run이 전혀 나타나지 않음",
              "이메일 트리거가 꺼져 있거나, 주소가 다른 Flow의 것이거나, 발신자가 허용된 발신자에 없어요.",
              "토글과 허용된 발신자 목록을 다시 확인하고, 이메일 트리거 패널에서 주소를 다시 복사하세요.",
            ],
            [
              "일부 첨부 파일만 처리됨",
              "누락된 파일이 지원되지 않는 형식이거나, 비어 있거나, 읽을 수 없어요.",
              "확장자를 위의 지원 목록과 비교해 보세요.",
            ],
            [
              "서명 이미지만 처리됨",
              "실제 문서가 첨부되지 않았어요. 링크로 걸려 있었거나 전달 과정에서 빠졌어요.",
              "인라인이 아니라 첨부 파일로 전달하고, 규칙이 첨부 파일을 유지하는지 확인하세요.",
            ],
            [
              "첨부 파일 없는 이메일이 아무 동작도 하지 않음",
              "이메일 본문 처리가 꺼져 있거나, 본문에 텍스트가 거의 없었어요.",
              "이메일 트리거 패널에서 이메일 본문 처리를 켜세요(Flow와 Collection).",
            ],
            [
              "안내 문구가 별도의 Run을 만듦",
              "이메일 본문 처리가 항상으로 설정되어 있어요.",
              "모드를 첨부 파일이 없을 때만으로 바꾸세요.",
            ],
            [
              "Run이 나타나지만 실패함",
              "이메일 경로가 아니라 문서 자체가 문제예요.",
              "Run을 열어 로그를 읽어 보세요. 추출 문제로 인한 실패예요.",
            ],
            [
              "결과가 이메일로 오지 않음",
              "이메일 출력이 설정되지 않았거나, Run이 실패했거나, 검토를 기다리고 있어요.",
              "먼저 Run의 상태를 확인한 다음 이메일 출력 설정을 확인하세요.",
            ],
          ]}
        />
      </DocCard>

      <Related
        links={[
          {
            href: "/docs/collections",
            label: "Collection으로 여러 종류의 문서를 자동 라우팅하기",
            description:
              "이메일 주소 하나를 여러 Flow에 연결하고, 문서마다 알맞은 Flow를 Tavnit이 고르게 하세요.",
          },
          {
            href: "/docs/splitters",
            label: "추출 전에 여러 문서가 든 파일 분할하기",
            description: "여러 문서를 첨부 파일 하나로 묶어 보내는 발신자를 위한 기능.",
          },
          {
            href: "/docs/webhooks",
            label: "webhook으로 자체 시스템에 결과 전달하기",
            description: "재시도 동작을 갖춘, 이메일 출력의 기계 판독용 대안.",
          },
          {
            href: "/docs/api-integration",
            label: "REST API로 문서 제출하기",
            description:
              "이메일로는 감당할 수 없는 양과 파일 크기를 위한 방법으로, 명시적인 오류 처리를 지원해요.",
          },
        ]}
      />
    </section>
  );
}
