import type { DocsNavCopy } from "../types";

/**
 * Korean docs: sidebar, chrome and page titles. Product nouns stay English as
 * the README asks (Flow, Collection, Cleaner, Bucket, Agent…); UI labels follow
 * the app's Korean dictionary (tavnit-nextjs src/lib/i18n/translations.ko.ts),
 * e.g. "사람 검토" for the Human in the Loop page (nav.hitl).
 */
const ko: DocsNavCopy = {
  docsName: "문서",
  home: "홈",
  description:
    "Tavnit 문서: AI 기반 문서 추출, 사람 검토, AI 어시스턴트용 MCP 커넥터, REST API, 이메일 트리거 등을 안내해요.",
  chrome: {
    back: "홈으로 돌아가기",
    toggle: "메뉴 열기/닫기",
    goHome: "홈으로 이동",
    contents: "목차",
    close: "메뉴 닫기",
    nav: "문서",
    languages: "이 페이지를 다른 언어로 읽기",
    englishOnly: "영어로만 제공",
    copy: "복사",
    copied: "복사했어요!",
    related: "관련 문서",
    keepReading: "더 읽어 보기",
  },
  groupLabels: {
    start: "시작하기",
    orchestration: "오케스트레이션",
    input: "입력",
    processing: "처리",
    intelligence: "인텔리전스",
    verticals: "오디오 및 소셜",
    data: "데이터 및 검토",
    integrate: "통합",
    organization: "조직",
  },
  labels: {
    "getting-started": "시작하기",
    pipelines: "Pipelines",
    "pipeline-map": "Pipeline 맵",
    collections: "Collections",
    subjects: "Subjects",
    splitters: "Splitters",
    flows: "Flows",
    cleaners: "Cleaners",
    agents: "Agents",
    matchers: "Matchers",
    inspectors: "Inspectors",
    fillers: "Fillers",
    signals: "Signals",
    nets: "Nets",
    buckets: "Buckets",
    "human-in-the-loop": "사람 검토",
    "email-integration": "이메일 통합",
    "api-integration": "API 통합",
    webhooks: "Webhooks",
    "mcp-connector": "MCP 커넥터",
    "user-roles": "사용자 역할",
  },
  pages: {
    "getting-started": {
      heading: "시작하기",
      title: "Tavnit 문서: AI 문서 추출 시작하기",
      description:
        "Tavnit에서 첫 Flow를 설정해 보세요. 필드를 정의하고 문서를 업로드하면 구조화된 데이터를 받을 수 있어요. 템플릿도 코드도 필요 없어요.",
    },
    flows: {
      heading: "Flows",
      title: "Flows: Tavnit이 각 문서에서 추출할 항목 정의하기",
      description:
        "Flow의 데이터 스키마: 메타데이터 필드와 테이블 필드, 데이터 유형, AI를 위한 추출 힌트, 복합 필드와 다중 값 필드를 설명해요.",
    },
    "api-integration": {
      heading: "API 통합",
      title: "문서 추출 REST API: Python, JS, 노코드",
      description:
        "Tavnit REST API 레퍼런스: Flow, Collection, Splitter, Cleaner, Bucket, Agent, Pipeline 등 모든 엔드포인트와 노코드 레시피를 담았어요.",
    },
    "email-integration": {
      heading: "이메일 통합",
      title: "이메일 첨부 파일에서 데이터 자동 추출하기",
      description:
        "Flow, Collection, Splitter의 주소로 문서를 전달하면 모든 첨부 파일이 자동으로 추출돼요.",
    },
    "mcp-connector": {
      heading: "MCP 커넥터",
      title: "MCP 커넥터: Tavnit을 Claude와 Cursor에 연결하기",
      description:
        "단계별 안내: 커넥터 URL을 만들고, claude.ai나 Cursor에 추가하고, 만료 전에 갱신하고, 자주 발생하는 오류를 해결하는 방법을 알려 드려요.",
    },
    "human-in-the-loop": {
      heading: "사람 검토(Human in the Loop)",
      title: "사람 검토: 추가 전용 감사 기록으로 데이터 승인하기",
      description:
        "전달 전에 Flow를 일시 중지해 검토받으세요. 모든 Run 또는 표시된 Run만 대상으로 할 수 있어요. 검토자를 지정하고 편집, 승인, 거부하세요.",
    },
  },
};

export default ko;
