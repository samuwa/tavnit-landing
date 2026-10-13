import type { EnterpriseCopy } from "@/content/types";

/** Enterprise services — 한국어 (ko). Translated from ./en.ts. */
const ko: EnterpriseCopy = {
  title: "엔터프라이즈 서비스 — 도입 지원, 통제, 비즈니스 자문",
  description:
    "Tavnit Enterprise: 귀사 조건에 맞춘 계약, 실무 도입 지원, 사용자 역할과 감사 추적, 직접 지원, 그리고 문서 디지털화와 데이터 입력 프로세스를 최적화하는 비즈니스 자문.",
  home: "홈",
  breadcrumbLabel: "이동 경로",
  crumb: "엔터프라이즈",
  eyebrow: "Tavnit Enterprise",
  h1: "엔터프라이즈 서비스",
  lead:
    "대량의 문서를 처리하거나 자체 조건이 필요한 조직을 위해, 플랫폼에 더해 계약, Tavnit을 실제 운영에 올리는 실무 지원, 그리고 그 주변 프로세스에 대한 자문을 제공합니다.",
  servicesHeading: "엔터프라이즈에 포함된 것",
  services: [
    {
      title: "귀사 조건에 맞춘 계약",
      body: "셀프서비스 플랜 대신, 귀사의 문서 규모에 맞춘 계약으로 물량, 상업 조건, 결제 방식을 합의합니다.",
    },
    {
      title: "실무 도입 지원",
      body: "귀사의 실제 문서로 Flow, Cleaner, 검토 규칙, 연동(API, 웹훅, 이메일)을 함께 설정하고, 실제 운영 환경에서 돌아가도록 마무리합니다.",
    },
    {
      title: "통제와 감사",
      body: "검토 전용 역할을 포함한 사용자 역할, 조건부 사람 검토, 그리고 모든 조회, 수정, 승인을 남기는 추가 전용 감사 추적.",
      links: [
        { label: "사용자 역할", href: "/docs/user-roles" },
        { label: "사람 검토", href: "/docs/human-in-the-loop" },
      ],
    },
    {
      title: "직접 지원",
      body: "제품을 만드는 팀과 직접 연결되는 창구를 영어와 스페인어로 제공합니다.",
    },
  ],
  advisory: {
    eyebrow: "비즈니스 자문",
    heading: "비즈니스 자문",
    subheading: "문서 디지털화와 데이터 입력 프로세스 최적화",
    intro:
      "플랫폼과 별도로, 문서의 정보를 받고, 디지털화하고, 기록하는 방식을 정비하고 개선하려는 기업에 자문을 제공합니다. 최종 결과를 Tavnit으로 자동화하든 하지 않든 상관없습니다.",
    scopeHeading: "다루는 범위",
    scope: [
      { title: "현행 프로세스 진단", body: "어떤 문서가 어떤 경로로 얼마나 들어오는지, 누가 입력하고 얼마나 걸리며 오류는 어디서 생기는지." },
      { title: "디지털화", body: "스캔과 수집 기준, 파일 정리와 명명 규칙, 섞인 묶음의 분리, 원본의 추적 가능성 유지." },
      { title: "데이터 입력", body: "실제로 필요한 필드, 날짜·금액·통화의 표준 형식, 검증 규칙, 마스터 데이터 대조." },
      { title: "통제", body: "사람 검토가 필요한 지점, 직무 분리, 그리고 감사인이나 규제 기관이 요구할 감사 추적." },
      { title: "연동", body: "데이터가 ERP, 회계 시스템, 스프레드시트로 전달되는 방식, 그리고 자동화할 가치가 있는 단계와 그렇지 않은 단계." },
      { title: "도입과 교육", body: "단계적 도입 계획, 그리고 데이터를 입력하고, 검토하고, 활용하는 사람들을 위한 교육." },
    ],
    deliverablesHeading: "산출물",
    deliverables:
      "현행 프로세스에 대한 서면 진단, 통제 장치를 포함한 개선 프로세스 설계, 그리고 결과를 측정할 지표(문서당 입력 시간, 수정 비율, 검토 대기 문서 수)를 갖춘 단계적 도입 계획.",
  },
  ctaHeading: "상담하기",
  ctaBody: "귀사의 문서와 물량을 알려 주시면, 어떤 서비스가 맞는지 말씀드리겠습니다.",
  ctaButton: "미팅 예약하기",
  ctaEmail: "또는 이메일로 문의:",
};

export default ko;
