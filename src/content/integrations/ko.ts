import type { IntegrationsContent } from "@/content/types";
import type { Integration } from "@/lib/integrations";

/**
 * Integrations: the /integrations hub (cards included) and /integrations/mcp — 한국어 (ko).
 * Translated from ./en.ts and the cards of src/lib/integrations.ts (label and summary only).
 */
const items: Integration[] = [
  {
    label: "MCP 커넥터",
    href: "/integrations/mcp",
    summary:
      "Tavnit을 claude.ai, Cursor 또는 모든 MCP 클라이언트에 추가하세요. 어시스턴트가 채팅만으로 추출 Flow를 만들고, 정리 규칙을 붙이고, 문서를 처리하고, 추출된 데이터를 조회할 수 있습니다.",
    own: true,
  },
  {
    label: "REST API",
    href: "/docs/api-integration",
    summary:
      "API 키로 문서를 프로그래밍 방식으로 보내세요. multipart 또는 base64 업로드를 지원하며, Python과 JavaScript 예제가 있습니다.",
    own: false,
  },
  {
    label: "이메일",
    href: "/docs/email-integration",
    summary:
      "전용 주소로 문서를 전달하거나 자동 전달하면 모든 첨부 파일이 추출되고, 결과는 필요한 사람에게 이메일로 돌아갑니다. 앱을 열 필요도 없습니다.",
    own: false,
  },
  {
    label: "웹훅",
    href: "/docs/webhooks",
    summary:
      "실행이 끝나는 즉시 타입이 지정된 결과를 귀사 엔드포인트로 보내, 추출된 데이터가 자동으로 귀사 시스템에 들어가게 합니다.",
    own: false,
  },
  {
    label: "Zapier, Make, n8n, Power Automate",
    href: "/docs/api-integration",
    summary:
      "같은 엔드포인트를 호출하는 노코드 레시피입니다. 코드를 쓰기보다 시각적으로 연결하고 싶은 팀을 위한 방법입니다.",
    own: false,
  },
  {
    label: "Bucket",
    href: "/docs/buckets",
    summary:
      "추출된 행을 내장 구조화 저장소에 보관하세요. 그 자리에서 수정하고, 조회하고, 차트로 보거나, CSV와 Excel로 내보낼 수 있습니다.",
    own: false,
  },
];

const ko: IntegrationsContent = {
  hub: {
    title: "연동 — API, 이메일, 웹훅, MCP",
    description:
      "Tavnit으로 들어오고 나가는 모든 방법: AI 어시스턴트용 MCP 커넥터, REST API, 이메일 전달, 웹훅, 그리고 Zapier, Make, n8n 레시피.",
    ogTitle: "Tavnit 연동",
    breadcrumbHome: "홈",
    h1: "연동",
    intro:
      "문서는 보내는 팀에 맞는 방식으로 Tavnit에 들어옵니다. 앱에 끌어다 놓거나, 주소로 전달하거나, 엔드포인트로 보내거나, AI 어시스턴트가 요청할 수 있습니다. 추출된 데이터도 같은 방식으로 나갑니다.",
    introMore:
      "모든 경로가 같은 Flow를 실행하므로, 설정한 스키마, 정리 규칙, 검토 단계는 문서가 어떻게 들어오든 똑같이 적용됩니다.",
    whichHeading: "어떤 방법을 써야 할까요?",
    which: [
      "**사람이 문서를 보내는 경우** — 예를 들어 공급업체 인보이스를 받는 경리 수신함이라면 — [이메일](/docs/email-integration)을 쓰세요. 아무도 새 도구를 배울 필요가 없습니다. 지금처럼 전달하기만 하면 됩니다.",
      "**시스템이 문서를 보내는 경우**에는 [REST API](/docs/api-integration)를 쓰고 결과는 [웹훅](/docs/webhooks)으로 돌려받으세요. 연결 코드를 쓰고 싶지 않다면 같은 엔드포인트를 Zapier, Make, n8n, Power Automate에서도 쓸 수 있습니다.",
      "**AI 어시스턴트와 함께 일하는 경우**에는 [MCP 커넥터](/integrations/mcp)를 쓰세요. 단순한 입구가 아니라 파이프라인 전체를 claude.ai나 Cursor에 제공합니다. 파일을 손으로 옮기지 않아도 어시스턴트가 추출 Flow를 만들고, 정리 규칙을 붙이고, 문서를 처리하고, 이미 추출한 데이터를 조회할 수 있습니다.",
    ],
    finalHeading: "문서 하나로 시작하세요",
    finalBody:
      "Flow를 만들고, 문서를 넣어 보고, 결과를 확인한 뒤에 전달 방식을 연결하세요. 무료 크레딧으로 시작할 수 있습니다.",
    finalCta: "무료로 시작하기",
  },
  items,
  mcp: {
    title: "Claude와 Cursor를 위한 MCP 문서 추출",
    description:
      "MCP로 Tavnit을 claude.ai나 Cursor에 연결하세요. 어시스턴트가 추출 Flow를 만들고, 문서를 처리하고, 타입이 지정되고 정리된 결과를 조회할 수 있습니다.",
    ogTitle: "문서 추출용 MCP 서버 | Tavnit",
    schemaHeadline: "문서 추출용 MCP 서버 — Claude와 Cursor",
    schemaName: "MCP 커넥터",
    breadcrumbHome: "홈",
    breadcrumbHub: "연동",
    breadcrumbSelf: "MCP 커넥터",
    badge: "Model Context Protocol",
    h1: "AI 어시스턴트에게 진짜 문서 파이프라인을",
    lede:
      "Tavnit은 MCP 서버를 운영합니다. claude.ai나 Cursor에 연결하면 어시스턴트가 문서 파이프라인 전체를 갖게 됩니다. 추출 Flow를 만들고, 정리 규칙을 붙이고, 문서를 처리하고, 결과를 읽어 옵니다. 건네받은 파일을 나름대로 해석한 결과가 아니라, 정의한 그대로의 필드를 정리되고 타입이 지정된 상태로 받습니다.",
    ledeMore: "설정은 어시스턴트 설정에 URL 하나를 붙여 넣는 것이 전부입니다. SDK도, 운영할 서버도, 코드도 필요 없습니다.",
    ctaStart: "무료로 시작하기",
    ctaSetup: "설정 가이드",
    problemHeading: "어시스턴트가 문서에 약한 이유",
    problem: [
      "AI 어시스턴트는 추론에는 강하지만 데이터 파이프라인 역할에는 약합니다. 스캔한 인보이스를 건네면 읽기는 합니다. 아마 맞게, 가끔은 틀리게, 그리고 두 번째에는 다르게요. 스키마가 없으니 필드명이 실행마다 달라집니다. 검증이 없으니 잘못 읽은 합계가 맞는 합계와 똑같아 보입니다. 그리고 무슨 일이 있었는지 기록이 없는데, 결과가 회계나 컴플라이언스에 닿는 순간 이것이 문제가 됩니다.",
      "일회성 질문에는 괜찮지만 업무 프로세스로는 쓸 수 없습니다. 어시스턴트에게 실제로 필요한 것은 귀사의 문서를 읽는 법을 이미 아는 도구입니다.",
    ],
    compareHeading: "PDF 붙여 넣기 vs. Flow 호출",
    compareCapability: "기능",
    compareChat: "채팅에 파일 붙여 넣기",
    compareMcp: "MCP 커넥터 사용",
    compareRows: [
      ["결과 형태", "그때그때 모델이 내놓는 대로", "Flow가 정의한 필드, 매번 똑같이"],
      ["필드명", "실행마다 달라짐", "스키마로 고정"],
      ["정리 규칙", "없음", "Cleaner가 자동 적용"],
      ["사람 검토", "불가능", "선택 가능, 감사 추적 포함"],
      ["결과가 저장되는 곳", "채팅 안", "Bucket, 웹훅, 이메일, API"],
      ["대량 반복 처리", "불가", "가능 — 같은 Flow로 문서 수 제한 없이"],
    ],
    capabilitiesHeading: "연결하면 어시스턴트가 할 수 있는 일",
    capabilities: [
      {
        title: "설명만으로 Flow 만들기",
        body: "공급업체, 날짜, 합계, 품목 등 무엇을 추출할지 말하면 어시스턴트가 조직에 바로 실행 가능한 추출 Flow를 만듭니다. 파이프라인 설정이 오후 내내 걸리는 구성 작업이 아니라 채팅 메시지 하나가 됩니다.",
      },
      {
        title: "정리 규칙 붙이기",
        body: "합계를 USD로 환산하거나, 날짜를 통일하거나, 값을 참조 데이터와 대조해 달라고 하면 어시스턴트가 Cleaner를 만들어 Flow에 붙입니다. 이후 들어오는 모든 문서에 어떤 경로로 들어오든 같은 규칙이 적용됩니다.",
      },
      {
        title: "Flow로 문서 처리하기",
        body: "인보이스, 계약서, 양식을 추출 Flow 중 하나로 처리해 달라고 요청하세요. 필드를 설명하는 문단이 아니라, 정의한 필드를 타입이 지정되고 정리된 상태로 돌려줍니다.",
      },
      {
        title: "이미 추출한 데이터 조회하기",
        body: "지난 분기에 특정 공급업체에 얼마를 지급했는지, 다음 달에 갱신되는 계약은 무엇인지 Bucket에 질문하세요. 답은 모델의 기억이 아니라 실시간 데이터에서 나옵니다.",
      },
    ],
    askHeading: "이런 것을 물어볼 수 있습니다:",
    ask: [
      "운송 인보이스에서 공급업체, 날짜, 합계, 품목을 추출하는 Flow를 만들어 줘.",
      "그 Flow에 모든 합계를 USD로 환산하는 Cleaner를 추가해 줘.",
      "이 인보이스를 Supplier Invoices Flow로 처리하고 품목을 보여 줘.",
      "Invoices Bucket 기준으로, 지난 분기에 Acme Corp에 얼마를 지급했어?",
      "이 계약서 세 개에서 갱신일을 추출해서 비교해 줘.",
      "지금 검토를 기다리는 실행은 어떤 것들이야?",
    ],
    fitsHeading: "이미 만든 파이프라인을 그대로 사용합니다",
    fitsIntro:
      "커넥터는 별도의 추출 엔진이 아닙니다. 앱에서 직접 만들었든 어시스턴트가 만들어 주었든, Tavnit의 나머지 부분과 같은 Flow를 호출합니다. 따라서 어시스턴트가 요청하는 경우에도 설정한 모든 규칙이 그대로 적용됩니다.",
    fits: [
      "[Collection](/docs/collections)은 여전히 들어오는 문서를 분류해 알맞은 Flow로 보냅니다.",
      "[Cleaner](/docs/cleaners)는 여전히 형식을 표준화하고, 통화를 환산하고, 조회를 적용합니다.",
      "[사람 검토](/docs/human-in-the-loop)는 요청해 둔 경우 여전히 실행을 멈춥니다. 어시스턴트가 승인 단계를 건너뛸 수는 없습니다.",
      "[Bucket](/docs/buckets)은 여전히 결과를 받으므로, 어시스턴트가 추출한 데이터는 나중에도 조회할 수 있습니다.",
    ],
    scopeHeading: "범위와 접근 권한",
    scopeCards: [
      {
        title: "본인 권한 이상은 없습니다",
        body: "커넥터는 본인의 API 키로 발급되며, 발급한 조직에만 접근합니다. 어시스턴트는 본인의 역할을 그대로 물려받으므로, 앱에서 본인이 할 수 없는 일은 할 수 없습니다.",
      },
      {
        title: "URL을 자격 증명처럼 다루세요",
        body: "커넥터 URL을 가진 사람은 누구나 귀사의 Flow와 Bucket에 접근할 수 있습니다. URL에는 유효 기간이 있으며, 새로 발급하면 이전 값은 즉시 무효화됩니다.",
      },
    ],
    scopeMore:
      "자세한 내용은 [커넥터 문서](/docs/mcp-connector)와 [사용자 역할 안내](/docs/user-roles)를 참고하세요. 서버 엔드포인트는 `{mcpUrl}`입니다.",
    setupHeading: "연결 방법",
    setupBody:
      "Tavnit의 연동 페이지에서 커넥터 URL을 생성한 뒤, claude.ai의 설정 → 커넥터에 붙여 넣거나 Cursor에 원격 MCP 서버로 추가하세요. 몇 분이면 되고 코드는 필요 없습니다.",
    setupLink: "단계별 설정 가이드 읽기",
    faqHeading: "자주 묻는 질문",
    faqs: [
      {
        q: "Claude에 PDF를 붙여 넣는 것과 무엇이 다른가요?",
        a: "PDF를 붙여 넣으면 어시스턴트는 처음 보는 문서를, 파싱하도록 설계되지 않은 형식으로, 스키마도 결과를 확인할 방법도 없이 읽어야 합니다. MCP 커넥터는 문서를 정의한 추출 Flow로 보내므로, 매번 같은 이름의 필드를 같은 타입으로, 같은 정리 규칙과 같은 검토 단계를 거쳐 받게 됩니다. 어시스턴트는 해석이 아니라 구조화된 데이터를 받습니다.",
      },
      {
        q: "어시스턴트가 Flow와 Cleaner를 만들 수도 있나요, 실행만 하나요?",
        a: "둘 다 가능합니다. 커넥터를 통해 어시스턴트는 앱에서 하는 것과 같은 방식으로 추출 Flow와 정리 규칙을 만들 수 있습니다. 원하는 필드, 표, 변환을 자연어로 설명하면 조직에 만들어지고, 이후 모든 문서에 실행할 준비가 됩니다. 생성 권한은 역할을 따릅니다. Owner와 Admin은 만들 수 있고, Member와 Viewer는 실행 전용 또는 읽기 전용입니다.",
      },
      {
        q: "어떤 AI 어시스턴트와 함께 쓸 수 있나요?",
        a: "Pro 플랜 이상의 claude.ai, Cursor, 그리고 원격 MCP 서버 URL을 지원하는 모든 클라이언트입니다. MCP는 개방형 프로토콜이므로 특정 업체에 한정되지 않습니다.",
      },
      {
        q: "코드를 써야 하나요?",
        a: "아니요. Tavnit에서 커넥터 URL을 생성해 어시스턴트 설정에 붙여 넣으면 됩니다. 어시스턴트가 호출하는 Flow를 만드는 것도 노코드입니다. 원하는 필드를 설명하면 Tavnit이 추출합니다.",
      },
      {
        q: "어시스턴트가 회사 계정의 모든 것을 볼 수 있나요?",
        a: "아니요. 커넥터는 본인의 API 키로 발급되므로, 로그인한 조직에만 본인 역할의 권한으로 접근합니다. Member는 앱에서 Member가 할 수 없는 일을 어시스턴트에게 시킬 수 없으며, 비공개 Bucket은 접근 권한을 받지 않는 한 비공개로 유지됩니다.",
      },
      {
        q: "커넥터를 쓰면 추가 비용이 드나요?",
        a: "아니요. 커넥터로 처리한 문서는 앱 업로드나 API 호출과 마찬가지로 페이지당 1크레딧의 일반 요율로 크레딧을 소모합니다. MCP 접근에 대한 별도 요금은 없습니다.",
      },
      {
        q: "커넥터 URL이 만료되면 어떻게 되나요?",
        a: "커넥터 URL에는 유효 기간이 있으며, Tavnit은 생성 시각과 만료 시각을 보여 줍니다. 새로 발급하면 새 URL이 나오고 이전 URL은 즉시 무효화되므로, 이전 URL을 가진 클라이언트는 새 값을 붙여 넣을 때까지 작동하지 않습니다.",
      },
    ],
    finalHeading: "어시스턴트에게 실제 문서를 맡겨 보세요",
    finalBody:
      "Flow를 만들고, 커넥터 URL을 생성하고, 질문을 시작하세요. 무료 크레딧으로 시작할 수 있고 카드는 필요 없습니다.",
    finalPricing: "요금 보기",
    finalDemo: "데모 예약하기",
  },
};

export default ko;
