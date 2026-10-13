import type { LiteLocaleCopy } from "@/lib/lite/copy-base";

/**
 * Free tools: base tool copy, hub, Lite header/footer, every tool and its social card — 한국어 (ko).
 *
 * Translated from ./en.ts. Korean particles (을/를, 이/가, 은/는…) depend on
 * the last syllable of the word before them, and the document words differ
 * per tool (인보이스, 영수증, 견적서…), so the base copy never puts a particle
 * that changes with the final consonant right after a {doc} token: it uses
 * "{doc} 파일", "{doc}의", "{doc}에서", "{doc}마다" and the like instead.
 */

const INVOICE_VOCAB = {
  doc: "인보이스",
  docs: "인보이스",
  a_doc: "인보이스",
  the_doc: "인보이스",
  the_docs: "인보이스",
  your_doc: "인보이스",
  your_docs: "인보이스",
  all_your_docs: "모든 인보이스",
  all_docs: "모든 인보이스",
  each_doc: "인보이스마다",
  another_doc: "다른 인보이스",
  this_doc: "이 인보이스",
};

const copy: LiteLocaleCopy = {
  base: {
    title: "무료 {doc} Excel 변환: AI가 {doc}의 품목을 표로 추출",
    description:
      "{a_doc} PDF나 사진을 올리면 품목 내역(품명, 수량, 단가, 금액)을 Excel 표로 받아요. 무료이고 템플릿이 필요 없으며, 결과를 보는 데 가입하지 않아도 돼요.",
    label: "{doc} Excel 변환",
    h1: "{doc} 한 장을 Excel로 바꿔 보세요",
    intro:
      "PDF나 사진을 올리세요. Tavnit이 헤더와 표의 모든 줄을 읽어 스프레드시트로 돌려드려요. 공급업체별 템플릿은 필요 없어요. 같은 도구가 {all_your_docs}에 그대로 통해요.",
    trust: ["PDF, JPG, PNG · 최대 5페이지", "하루 {limit}건 무료", "24시간 후 모두 삭제"],
    drop: {
      title: "{your_doc} 파일을 여기에 놓으세요",
      hint: "또는 컴퓨터에서 파일을 선택하세요",
      choose: "파일 선택",
      sample: "{doc} 샘플로 체험하기",
      formats: "PDF, JPG, PNG · 최대 4MB, 5페이지",
    },
    stages: [
      "문서 업로드 중",
      "헤더 읽는 중",
      "품목 표 찾는 중",
      "열 정리 중",
      "거의 다 됐어요",
    ],
    result: {
      heading: "완료: {file}",
      rowWord: ["행", "행"],
      pageWord: ["페이지", "페이지"],
      summary: "{rows} · {pages}",
      truncated: "전체 {total}행 중 {shown}행을 보여 드려요. Excel에도 같은 {shown}행이 담겨요.",
      readyIn: "{s}초 만에 완료",
      sum: "합계",
      viewer: "내 문서",
      openDocument: "문서 보기",
      closeDocument: "닫기",
      retention: "24시간 후 자동 삭제",
      hideColumn: "열 제거",
      hiddenCols: ["열 1개를 제거했어요. Excel에서도 빠져요.", "열 {n}개를 제거했어요. Excel에서도 빠져요."],
      restoreAll: "모두 복원",
      restoreOne: "{col} 복원",
      ghostColumn: "+ 내 필드",
      ghostHint: "Tavnit에서는 원하는 필드를 직접 추가해요: 발주 번호, 지급 기한, 비용 센터…",
      flowNote: "이 {fields}개 열은 고정된 {doc} Flow의 필드예요. 계정에서는 필드를 직접 정할 수 있어요.",
      flowNoteCta: "방법 보기",
      download: "Excel 다운로드",
      downloading: "파일 준비 중",
      another: "{another_doc} 처리하기",
      empty: "이 문서에서 품목 표를 찾지 못했어요. 줄마다 수량과 가격이 적힌 {doc} 파일로 다시 시도해 보세요.",
    },
    errors: {
      empty: "파일이 비어 있어요.",
      too_large: "파일이 4MB를 넘어요. 압축하거나 {the_doc} 페이지만 올려 주세요.",
      unsupported: "PDF, JPG, PNG 파일만 받을 수 있어요.",
      unreadable: "이 PDF를 열 수 없어요. 비밀번호가 걸려 있다면 해제한 뒤 다시 시도해 주세요.",
      too_many_pages: "무료 버전은 문서당 최대 5페이지까지 처리해요.",
      captcha: "로봇이 아님을 확인하지 못했어요. 페이지를 새로고침한 뒤 다시 시도해 주세요.",
      quota: "오늘 무료 문서 {limit}건을 모두 사용했어요. 내일 다시 쓸 수 있어요. 지금 계속하려면 계정을 만드세요.",
      daily_cap: "무료 도구가 오늘 처리 한도에 도달했어요. 내일 다시 오시거나, 계정을 만들어 지금 바로 계속하세요.",
      unavailable: "지금은 도구를 사용할 수 없어요. 몇 분 후에 다시 시도해 주세요.",
      backend: "문서를 처리하는 중에 문제가 생겼어요. 다시 시도해 주세요.",
      failed: "이 문서에서 데이터를 추출하지 못했어요. {another_doc} 파일이나 샘플로 시도해 보세요.",
      timeout: "평소보다 오래 걸리고 있어요. 잠시 후 다시 시도해 주세요.",
      forbidden: "여기서는 허용되지 않는 작업이에요.",
      bad_request: "파일이 없거나 읽을 수 없어요.",
    },
    auth: {
      title: "무료 계정을 만들고 다운로드하세요",
      body: "Excel은 바로 다운로드돼요. 계정이 있으면 {all_your_docs}에 한 번에 같은 작업을 할 수도 있어요.",
      google: "Google로 계속하기",
      or: "또는 이메일로",
      signin: "로그인",
      signup: "계정 만들기",
      name: "이름",
      email: "이메일",
      password: "비밀번호",
      submitSignin: "로그인하고 다운로드",
      submitSignup: "계정 만들고 다운로드",
      switchToSignin: "이미 계정이 있어요",
      switchToSignup: "아직 계정이 없어요",
      checkEmail:
        "계정 확인 메일을 보냈어요. 메일을 열어 확인하고 돌아오면 Excel을 바로 다운로드할 수 있어요.",
      existing: "이미 계정이 있는 이메일이에요. 로그인하고 다운로드하세요.",
      forgot: "비밀번호를 잊었어요",
      close: "닫기",
      generic: "가입을 완료하지 못했어요. 이메일과 비밀번호를 확인하고 다시 시도해 주세요.",
    },
    next: {
      heading: "그다음은요?",
      lead: "방금은 {doc} 한 건이었어요. 계정이 있으면 들어오는 {each_doc} 똑같이 처리되고, 데이터는 Excel에서 멈추지 않아요. 알아서 다음 단계로 이어져요.",
      source: "{your_doc}",
      node: "Tavnit",
      nodeSub: "추출 Flow",
      items: [
        {
          short: "받은편지함으로",
          via: "이메일",
          title: "결과가 받은편지함에 도착해요",
          body: "추출이 끝나면 Tavnit이 Flow에 설정한 주소로 이메일을 보내고, 행 데이터는 rows.csv로 첨부돼요. 검토를 켜 두면 승인될 때까지 이메일은 대기해요.",
          linkLabel: "이메일 출력",
          href: "/docs/email-integration",
          scene: [{ label: "추출 완료" }, { label: "Tavnit이 이메일 작성" }, { label: "지정한 사람에게 도착", result: "rows.csv 첨부" }],
        },
        {
          short: "ERP로",
          via: "웹훅",
          title: "웹훅으로 ERP에 바로 들어가요",
          body: "실행이 완료되면 Tavnit이 지정한 URL로 행 데이터와 run_id를 POST해요. Zapier, Make, n8n은 웹훅 트리거로 받기만 하면 돼요. 네이티브 연동은 필요 없어요.",
          linkLabel: "웹훅",
          href: "/docs/webhooks",
          scene: [{ label: "추출된 행" }, { label: "행과 run_id를 담은 POST 한 번" }, { label: "내 시스템에 표시", result: "6줄, 아무도 입력하지 않음" }],
        },
        {
          short: "반영 전 검토",
          via: "사람 검토",
          title: "반영 전에 사람이 승인해요",
          body: "Flow에서 검토를 켜면 모든 실행이 잠시 멈춰요. 검토자는 원본 문서 옆에서 편집 가능한 표를 보며 셀을 고치고, 행을 제외하고, 열을 추가한 뒤 승인하거나 반려해요. 승인된 뒤에만 이메일, 웹훅, Bucket이 전송되고 모든 결정이 기록으로 남아요. 다른 것은 볼 필요가 없는 사람을 위한 검토 전용 역할도 있어요.",
          linkLabel: "사람 검토",
          href: "/docs/human-in-the-loop",
          scene: [{ label: "실행이 검토를 위해 대기" }, { label: "문서 옆에서 사람이 수정" }, { label: "승인 후에만 전달", result: "셀 1개 수정 · 기록 완료" }],
        },
        {
          short: "견적 비교",
          via: "Matcher",
          title: "여러 견적서를 줄 단위로 비교해요",
          body: "Matcher는 같은 Flow의 실행 여러 건(예: 공급업체 견적서 세 장)을 받아 품명으로 줄을 짝짓고, 줄마다 가장 저렴한 곳을 Champion 열에 표시해요.",
          linkLabel: "공급업체 견적",
          href: "/use-cases/supplier-quotes",
          scene: [{ label: "견적서 세 장, Flow 하나" }, { label: "Matcher가 줄을 짝지음" }, { label: "Champion 열: 줄별 최저가", result: "공급업체 B가 5개 중 4개 승리" }],
        },
        {
          short: "규칙과 검증",
          via: "Cleaner",
          title: "Cleaner가 모든 행을 정리하고 검증해요",
          body: "날짜 형식, 숫자 형식, 계산 필드, 공시 환율에 따른 통화 환산, 그리고 조건부 작업까지. 어떤 줄이 검증에 실패하면 검토로 보내거나 이메일, 웹훅을 보낼 수 있어요.",
          linkLabel: "Cleaner",
          href: "/docs/cleaners",
          scene: [{ label: "들어온 그대로의 데이터" }, { label: "Cleaner가 규칙 적용" }, { label: "정리 완료, 실패 항목 표시", result: "날짜, 숫자, 합계 이상 없음" }],
        },
        {
          short: "Agent가 포털 접속",
          via: "Agent",
          title: "Agent가 공급업체 포털에 로그인해요",
          body: "할 일을 평범한 문장으로 적고, 시작 URL과 자격 증명을 넣어 두세요. 자격 증명은 모델이 절대 볼 수 없는 금고에 보관돼요. 추출이 끝나면 Agent가 문서의 필드를 가지고 알아서 시작해, 요청한 정보(가격, 리드 타임, 파일)를 정해진 형식으로 가져와요.",
          linkLabel: "Agent",
          href: "/docs/agents",
          scene: [{ label: "추출 완료" }, { label: "Agent가 포털을 탐색" }, { label: "데이터를 형식에 맞춰 회수", result: "가격 18.50 · 리드 타임 5일" }],
        },
        {
          short: "데이터에 질문하기",
          via: "Bucket",
          title: "{your_docs}에 질문해 보세요",
          body: "행은 Bucket에 저장돼요. 평소 말투로 질문하면 Tavnit이 질문을 계획(합계, 필터, 월)으로 바꿔 데이터베이스에서 실행하고 수치로 답해요. 계산은 절대 모델이 하지 않아요.",
          linkLabel: "Bucket",
          href: "/docs/buckets",
          scene: [{ label: "“8월에 Istmo에서 얼마나 샀지?”" }, { label: "계획: 합계 · 공급업체 · 월" }, { label: "데이터베이스에서 계산한 수치", result: "{docs} 4건, $12,480" }],
        },
      ],
      hint: "옵션이나 Tavnit 칩을 눌러 어떻게 되는지 확인해 보세요.",
      flow: {
        title: "Flow: 열은 직접 정해요",
        body: "Flow는 한 가지 문서 유형의 정의예요. 뽑아낼 필드 목록으로, 필드마다 이름과 데이터 유형, 문서당 한 번 나오는지 줄마다 나오는지를 정하고, 필요하면 어디를 봐야 하는지 힌트도 줄 수 있어요. 켜 두면 들어오는 모든 문서에서 정확히 그 필드만 읽고, 결과 표에는 필드마다 열이 하나씩 생겨요. 이 도구는 필드 {fields}개짜리 고정된 {doc} Flow를 써요. 계정에서는 필드를 추가하고 지우고 이름을 바꿀 수 있고, 다른 어떤 문서용 Flow도 만들 수 있어요. 템플릿도 좌표도 필요 없어요.",
        linkLabel: "Flow 정의 방법",
        href: "/docs/flows",
        scene: [{ label: "필드를 문서와 표, 두 그룹으로 정의" }, { label: "헤더는 한 번, 표는 줄마다 읽음" }, { label: "줄마다 한 행: 문서 값은 반복, 표 값은 변경", result: "필드 5개 → 열 5개" }],
        name: "{doc}",
        kinds: ["문서 필드", "표 필드"],
        add: { name: "purchase_order", type: "텍스트", hint: "“PO” 옆 · 예: PO-2291", save: "저장", value: "PO-2291" },
        activate: "활성",
      },
      inputs: {
        show: "{your_doc} 파일은 어떻게 들어오나요?",
        hide: "입력 방법 숨기기",
        items: [
          {
            short: "이메일로",
            via: "Flow마다 주소 하나",
            title: "이메일을 전달하면 끝이에요",
            body: "Flow마다 <id>@mg.tavnit.io 형식의 고유 주소가 있어요. {the_doc} 파일을 첨부한 메일을 전달하면 첨부 파일 하나하나가 실행이 돼요. 제목과 본문은 읽지 않아요.",
            linkLabel: "이메일 수신",
            href: "/docs/email-integration",
            scene: [{ label: "첨부 파일이 있는 메일을 전달" }, { label: "Flow 주소에 도착" }, { label: "첨부 파일마다 실행 1건", result: "첨부 1개 → 실행 1건" }],
          },
          {
            short: "직접 업로드",
            via: "앱에서",
            title: "앱에서 바로 올려요",
            body: "PDF나 사진을 Flow에 끌어다 놓으면 바로 실행이 시작돼요. 여기서 해 본 것과 같지만, 내 계정에서 하루 한도 없이 할 수 있어요.",
            linkLabel: "Flow",
            href: "/docs/flows",
            scene: [{ label: "Flow에 파일을 놓음" }, { label: "실행 시작" }, { label: "몇 초 만에 행 생성", result: "여기처럼, 한도 없이" }],
          },
          {
            short: "API",
            via: "POST /api/runs/process",
            title: "내 시스템에서 API로",
            body: "API 키를 사용해 파일과 flow_id를 /api/runs/process로 POST 한 번만 보내면 돼요. 202와 함께 run_id가 돌아오고, completed가 될 때까지 /api/runs/<id>를 GET하면 행이 돌아와요.",
            linkLabel: "API",
            href: "/docs/api-integration",
            scene: [{ label: "파일과 flow_id를 POST" }, { label: "202: run_id, 대기열 등록" }, { label: "완료될 때까지 GET", result: "status: completed · 6행" }],
          },
          {
            short: "Zapier · Make · n8n",
            via: "HTTP 호출 한 번",
            title: "Zapier, Make, n8n에서",
            body: "네이티브 앱은 없고, 필요하지도 않아요. HTTP 단계(Zapier의 Custom Request, Make의 Make a request)로 파일을 /api/runs/process에 보내면 돼요. 행은 웹훅을 통해 같은 도구의 트리거로 돌아와요.",
            linkLabel: "연동",
            href: "/integrations",
            scene: [{ label: "시나리오 속 HTTP 단계" }, { label: "Tavnit이 처리" }, { label: "웹훅이 행을 반환", result: "Zapier, Make, n8n으로 복귀" }],
          },
          {
            short: "PDF 하나에 여러 건",
            via: "Splitter가 분리",
            title: "PDF 하나에 문서가 여러 건일 때",
            body: "Splitter가 각 문서가 시작되는 지점을 찾고, 구간마다 설명해 둔 유형으로 분류해 해당 Flow로 보내요. {docs} 세 건이 담긴 스캔 하나가 실행 세 건이 돼요.",
            linkLabel: "Splitter",
            href: "/docs/splitters",
            scene: [{ label: "{docs} 3건이 담긴 PDF 하나" }, { label: "Splitter가 자르고 분류" }, { label: "{doc}마다 하나씩, 실행 3건", result: "구간 3개 · 실행 3건" }],
          },
        ],
      },
      replay: "다시 재생",
      tryIt: "Tavnit에서 해 보기",
      tryItSignedIn: "내 계정에서 하기",
      primary: "무료 계정 만들기",
      primarySignedIn: "Tavnit으로 이동",
      sameLogin: "이미 계정이 있어요. 같은 로그인({email})으로 Tavnit에 로그인하세요. 다른 사이트라서 한 번 더 물어볼 거예요.",
      secondary: "데모 예약",
    },
    cleaners: {
      heading: "Cleaner가 있으면 이런 것도…",
      lead: "추출이 끝나면 {each_doc} 자동으로 실행되는 간단한 규칙이에요. 내 데이터를 활용한 아이디어 네 가지:",
      tag: "Cleaner",
      ideas: [
        { icon: "date", title: "날짜는 한 가지 형식으로", from: "{date}", to: "{iso}", note: "{each_doc} 같은 형식으로" },
        { icon: "sum", title: "품목 합계는 소계와 같아야 해요", from: "품목 {sum}", to: "소계 {subtotal}", note: "맞지 않으면 아무도 모른 채 지급되지 않아요", check: "sum" },
        { icon: "money", title: "내 통화로 환산", from: "{total} {currency}", to: "내 통화", note: "{the_doc} 날짜의 환율로" },
        { icon: "approve", title: "일정 금액 이상은 승인", from: "합계 {total}", to: "지급 전 승인", note: "{threshold} 초과 시" },
      ],
      ok: "일치",
      off: "검토 필요",
      outro: "Cleaner는 Tavnit에서 원하는 필드로 직접 만들어요. 여기 있는 건 예시일 뿐이에요.",
      cta: "무료 계정을 만들고 써 보기",
      ctaSignedIn: "Tavnit을 열고 써 보기",
      learn: "Cleaner란?",
    },
    after: {
      title: "Excel이 준비됐어요",
      lead: "필드 {fields}개짜리 고정 Flow로 만든 결과예요. 계정에서는 필드를 직접 정할 수 있어요. Tavnit이 {each_doc} 처리하면 이렇게 돼요:",
      close: "닫기",
      saved: "다운로드 폴더에 저장됨",
    },
    how: {
      heading: "작동 방식",
      steps: [
        {
          title: "{the_doc} 파일 올리기",
          body: "PDF, 사진, 스캔 모두 가능해요. 공급업체, 언어, 레이아웃은 상관없어요.",
        },
        {
          title: "Tavnit이 읽어요",
          body: "헤더(공급업체, 번호, 날짜, 합계)와 수량, 가격이 담긴 품목 표를 찾아요.",
        },
        {
          title: "확인하고 다운로드",
          body: "표가 화면에 바로 나타나요. 무료 계정이 있으면 Excel로 가져갈 수 있어요.",
        },
      ],
    },
    faqHeading: "자주 묻는 질문",
    faqs: [
      {
        q: "무료 버전에는 무엇이 포함되나요?",
        a: "하루 {limit}건까지 전체 결과를 화면에서 볼 수 있어요. Excel 다운로드에는 Tavnit 계정이 필요하고, 계정은 무료예요.",
      },
      {
        q: "어떤 형식을 지원하나요?",
        a: "PDF(텍스트 또는 스캔), JPG, PNG를 최대 4MB, 5페이지까지 받아요. {your_doc} 페이지가 더 많으면 나눠서 올리거나 계정을 만드세요.",
      },
      {
        q: "다른 열을 고를 수 있나요?",
        a: "여기서는 안 돼요. 이 도구는 필드 13개짜리 고정된 {doc} Flow를 써요. 계정에서는 {docs}용이든 다른 문서용이든 필요한 필드로 직접 Flow를 만들 수 있어요. 문서 단위(발주 번호, 지급 기한, 비용 센터)도, 줄 단위(제품 코드, 할인)도 가능해요. 템플릿은 없어요. 필드를 설명하고, 필요하면 어디를 봐야 하는지 힌트만 주면 돼요.",
      },
      {
        q: "공급업체마다 템플릿을 설정해야 하나요?",
        a: "아니요. Tavnit은 템플릿을 쓰지 않아요. 공급업체가 내일 {doc} 양식을 바꿔도 문서를 있는 그대로 읽어요.",
      },
      {
        q: "제 파일은 어떻게 되나요?",
        a: "무료 도구 전용 Tavnit 계정에서 처리되고, 다른 용도로는 전혀 쓰이지 않아요. 24시간이 지나면 파일과 추출된 행은 자동으로 삭제돼요. 실행이 있었다는 사실만 남고 문서나 그 내용은 보관하지 않아요. 더 빨리 지우고 싶다면 support@tavnit.io로 메일을 보내 주세요.",
      },
      {
        q: "다운로드에 왜 계정이 필요한가요?",
        a: "무료 버전은 체험용이기 때문이에요. 계정이 있으면 {all_your_docs}에 같은 추출을 실행하고, 이메일로 받고, 결과를 내 시스템으로 보낼 수 있어요.",
      },
      {
        q: "어느 나라 {docs}에도 쓸 수 있나요?",
        a: "네. 영어, 스페인어 등 여러 언어로 된 {docs}도, 세금이 항목별로 표시되든 아니든 처리해요. 미국, 파나마, 멕시코, 콜롬비아 등의 {docs}에서 테스트했어요.",
      },
      {
        q: "어떻게 자동화하나요?",
        a: "계정을 만들고 원하는 필드로 Flow를 구성한 뒤 {docs} 파일을 그 이메일 주소로 전달하거나, API, 웹훅, Zapier, Make, n8n으로 연결하세요. 결과는 아무도 입력하지 않아도 ERP나 Google Sheets에 들어가요.",
      },
    ],
  },

  hub: {
    title: "무료 AI 문서 도구: 인보이스 Excel 변환 외",
    description:
      "Tavnit 엔진으로 만든 무료 단일 기능 도구: 인보이스를 Excel로 바꾸는 것부터 다양하게. 템플릿 없이, 가입 없이 결과를 바로 확인하세요.",
    h1: "무료 도구",
    intro:
      "각 도구는 문서 하나에 한 가지 일을 하고, 실제 결과를 보여 줘요. 기업들이 Tavnit으로 문서를 자동화할 때 쓰는 바로 그 엔진으로, 한 번에 하나씩 돌아가요.",
    breadcrumbHome: "홈",
    breadcrumbHub: "도구",
    groups: { extract: "문서를 Excel로", compare: "문서 비교", split: "스캔 정리", clean: "스프레드시트 정리" },
    outro: "모든 도구는 기업들이 Tavnit으로 문서를 자동화할 때 쓰는 엔진 위에서 돌아가요. 모든 문서에 자동으로 적용하고 싶다면, 계정을 만드세요.",
    outroCta: "무료 계정 만들기",
  },

  shell: {
    lite: "Lite",
    tools: "도구",
    site: "Tavnit 소개",
    cta: "무료 계정 만들기",
    ctaSignedIn: "Tavnit으로 이동",
    nav: { product: "제품", useCases: "활용 사례", docs: "문서" },
    demo: "데모 예약",
    signin: "로그인",
    allTools: "모든 도구 보기",
    allToolsHint: "무료예요. 가입 없이 실제 결과를 보고, 계정을 만들면 가져갈 수 있어요.",
    groups: { extract: "문서를 Excel로", compare: "문서 비교", split: "스캔 정리", clean: "스프레드시트 정리" },
    account: {
      signedInAs: "로그인 계정",
      open: "Tavnit으로 이동",
      openHint: "전체 플랫폼: Flow, 자동화, 모든 처리량",
      signOut: "로그아웃",
      menu: "내 계정",
    },
    auth: {
      title: "무료 계정을 만드세요",
      body: "같은 계정으로 여기서 결과를 다운로드하고, Tavnit에서 모든 문서를 자동화할 수 있어요.",
      submitSignin: "로그인",
      submitSignup: "계정 만들기",
    },
    menu: "메뉴",
    close: "닫기",
    privacy: "개인정보 처리방침",
    terms: "이용약관",
    contact: "문의",
    rights: "Tavnit. 제품과 같은 엔진으로 만든 무료 도구.",
  },

  related: {
    heading: "문서 한 건이 아니라 모든 문서라면",
    lead: "이 도구는 한 번에 문서 하나를 처리해요. 같은 엔진이 이메일이나 API로 문서를 받고, 팀의 검토를 거쳐, 내 시스템으로 전달할 수 있어요.",
    useCase: "자동화 방법:",
    guide: "가이드:",
  },

  tools: {
    /** Invoice → Excel. The base copy was written for this tool, so only the
     *  words — plus a <title> short enough not to be cut in search results. */
    "invoice-to-excel": {
      vocab: INVOICE_VOCAB,
      overrides: { title: "인보이스 Excel 변환 무료: AI가 품목을 읽어요" },
    },
    /**
     * Invoice line item extractor. Same Flow and the same words as invoice →
     * Excel; a different page, written for the people who search "line item
     * extraction".
     */
    "invoice-line-items": {
      vocab: INVOICE_VOCAB,
      overrides: {
        title: "무료 인보이스 품목 추출기: 품목을 Excel 행으로",
        description:
          "인보이스 품목(품명, 수량, 단가, 금액)을 Excel 행으로 추출하고, 모든 행에 공급업체, 번호, 날짜를 함께 담아요. PDF나 사진 모두 가능, 템플릿 없음, 결과 확인에 가입 불필요.",
        label: "인보이스 품목 추출기",
        h1: "인보이스에서 품목을 추출하세요",
        intro:
          "인보이스 표의 모든 줄(품명, 수량, 단위, 단가, 금액)이 각각 한 행이 되고, 헤더(공급업체, 번호, 날짜, 합계)는 행마다 반복돼요. 회계와 매입 채무 부서가 품목을 전기하고, 대사하고, 발주서와 대조할 때 필요한 바로 그 형태예요. PDF, 스캔, 사진 모두 공급업체별 템플릿 없이 처리해요.",
        drop: {
          title: "품목이 필요한 인보이스를 여기에 놓으세요",
          sample: "6줄짜리 인보이스로 체험하기",
        },
        stages: [
          "인보이스 업로드 중",
          "헤더 읽는 중",
          "품목 표 감지 중",
          "행을 하나씩 분리하는 중",
          "거의 다 됐어요",
        ],
        result: {
          flowNote: "이 {fields}개 열은 헤더와 품목으로 이루어진 고정 인보이스 Flow의 필드예요. 계정에서는 필드를 직접 정할 수 있어요.",
        },
        how: {
          heading: "작동 방식",
          steps: [
            {
              title: "인보이스 올리기",
              body: "텍스트 PDF, 스캔, 사진 모두 가능해요. 한 페이지든 여러 페이지든 최대 5페이지까지.",
            },
            {
              title: "Tavnit이 줄을 분리해요",
              body: "괘선이 없는 표도 찾아내고, 각 행(품명, 수량, 단위, 가격, 금액)을 읽은 뒤 헤더를 붙여요.",
            },
            {
              title: "확인하고 다운로드",
              body: "품목마다 한 행씩 화면에 나타나요. 무료 계정이 있으면 필요 없는 열을 빼고 Excel로 가져갈 수 있어요.",
            },
          ],
        },
        faqs: [
          {
            q: "인보이스 품목이란 무엇인가요?",
            a: "상세 표의 각 행, 즉 품명, 수량, 단위, 단가, 금액이 적힌 제품이나 서비스 하나예요. 하단의 합계(소계, 세금, 총액)는 품목이 아니라 헤더 필드로 추출되어 모든 행에 반복돼요.",
          },
          {
            q: "공급업체와 번호가 왜 모든 행에 나오나요?",
            a: "각 행이 그 자체로 완결되도록 하기 위해서예요. 여러 인보이스의 줄을 한 시트에 붙이고 필터링하거나 합산해도 어느 인보이스에서 왔는지 잃지 않아요. ERP, 피벗 테이블, 대사 작업이 기대하는 형태예요.",
          },
          {
            q: "표가 여러 페이지에 걸쳐 있어도 되나요?",
            a: "네. Tavnit은 페이지를 넘어 표를 따라가며 모든 줄을 순서대로 돌려드리고, 열 머리글을 행처럼 반복하지 않아요. 무료 버전은 최대 5페이지까지 처리해요.",
          },
          {
            q: "줄바꿈된 품명이나 병합된 셀은요?",
            a: "다음 행으로 이어지는 품명은 원래 줄에 합쳐지고, 병합된 셀은 그 셀이 걸친 줄에 모두 적용돼요. 표의 괘선에 의존하지 않고, 어떤 수량, 가격, 금액이 어느 품명에 속하는지를 읽어 내요.",
          },
          {
            q: "줄별 할인과 세금은 어떻게 처리하나요?",
            a: "각 줄의 금액은 인쇄된 그대로 추출돼요. 인보이스에 별도 행으로 표시된 할인이나 세금은 품목으로 바뀌지 않고 문서 합계로 처리돼요. 인보이스에 줄별 세금이 있다면 계정에서 그 필드를 Flow에 추가할 수 있어요.",
          },
          {
            q: "품목을 발주서와 대조할 수 있나요?",
            a: "네, 무료 발주서-인보이스 대조 도구(/tools/po-vs-invoice-check)를 쓰면 돼요. 두 문서를 올리면 가격이나 수량이 다른 줄, 빠진 줄, 추가된 줄을 표시해 줘요.",
          },
          {
            q: "공급업체마다 템플릿이 필요한가요?",
            a: "아니요. Tavnit은 인보이스를 있는 그대로 읽어요. 공급업체가 내일 양식을 바꿔도 계속 작동해요. 그래서 여러 나라, 여러 언어의 인보이스도 똑같이 처리할 수 있어요.",
          },
          {
            q: "인보이스 수백 건은 어떻게 처리하나요?",
            a: "계정에서 같은 필드(또는 원하는 필드)로 Flow를 만들고 인보이스를 그 이메일 주소로 전달하거나 API로 보내세요. 인보이스마다 행으로 변환되어 아무도 입력하지 않아도 ERP, Google Sheets, Bucket에 들어가요.",
          },
        ],
      },
    },
    /**
     * PO vs invoice check. Two documents through one "purchase document" Flow,
     * then the Matcher pairs every PO line with the invoice line that means the
     * same thing and the page shows the differences.
     */
    "po-invoice-check": {
      vocab: INVOICE_VOCAB,
      overrides: {
        title: "무료 발주서-인보이스 대조: 줄 단위로 맞춰 봐요",
        description:
          "발주서와 인보이스를 올리면 Tavnit이 줄 단위로 맞춰 봐요. 가격 차이, 수량 차이, 인보이스에 빠진 줄, 발주서에 없는 줄까지. 무료, 템플릿 없음, 결과 확인에 가입 불필요.",
        label: "발주서-인보이스 대조",
        h1: "인보이스를 발주서와 대조하세요",
        intro:
          "발주서와 인보이스를 PDF나 사진으로 올리세요. Tavnit이 두 문서를 읽고, 문구가 달라도 같은 뜻의 줄끼리 짝지은 뒤, 가격이 바뀐 곳, 수량이 바뀐 곳, 인보이스에 빠진 것, 발주서에 처음부터 없던 것을 표시해요.",
        trust: ["발주서 1건과 인보이스 1건 · PDF 또는 사진", "하루 {limit}건 무료", "24시간 후 모두 삭제"],
        drop: {
          title: "문서를 여기에 놓으세요",
          sample: "샘플 발주서와 인보이스로 체험하기",
          formats: "PDF, JPG, PNG · 문서당 최대 4MB, 5페이지",
        },
        stages: ["문서 업로드 중", "발주서 읽는 중", "인보이스 읽는 중", "줄 짝짓는 중", "거의 다 됐어요"],
        result: {
          another: "다른 문서 비교하기",
          download: "비교 결과를 Excel로 다운로드",
          flowNote: "이 {fields}개 열은 고정된 구매 문서 Flow의 필드예요. 계정에서는 필드를 직접 정할 수 있어요.",
          ghostHint: "Tavnit에서는 원하는 필드를 직접 추가해요: 비용 센터, 입고 번호, 프로젝트…",
        },
        errors: {
          no_lines: "두 문서 중 하나에서 수량과 가격이 있는 줄을 찾지 못했어요. 품목 표가 있는 발주서와 인보이스인지 확인해 주세요.",
          not_ready: "아직 문서를 읽고 있어요. 잠시 후 다시 시도해 주세요.",
          failed: "문서 중 하나를 읽지 못했어요. 다른 파일이나 샘플로 시도해 보세요.",
          too_large: "파일 중 하나가 4MB를 넘어요. 압축하거나 문서 페이지만 올려 주세요.",
        },
        next: {
          lead: "방금은 발주서 한 건과 인보이스 한 건이었어요. 계정이 있으면 들어오는 인보이스마다 발주서와 자동으로 대조되고, 결과는 Excel에서 멈추지 않고 다음 단계로 이어져요.",
          source: "발주서와 인보이스",
          flow: {
            name: "구매 문서",
            add: { name: "receipt_number", type: "텍스트", hint: "“Receipt” 옆 · 예: REC-1187", save: "저장", value: "REC-1187" },
          },
          inputs: { show: "문서는 어떻게 들어오나요?" },
        },
        cleaners: {
          heading: "Cleaner가 있으면 이런 것도…",
          lead: "대조할 때마다 자동으로 실행되는 간단한 규칙이에요. 아이디어 네 가지:",
          ideas: [
            { icon: "alert", title: "가격이 2% 넘게 오르면 인보이스 보류", from: "발주 가격 22.40", to: "인보이스 23.90", note: "누가 지급하기 전에 차이를 표시해요" },
            { icon: "approve", title: "수량이 다르면 승인 요청", from: "발주 300개", to: "인보이스 280개", note: "구매팀이 분할 납품인지 오류인지 확인해요" },
            { icon: "mail", title: "차이를 구매팀에 메일로", from: "대조 완료", to: "purchasing@ 앞 메일", note: "검토할 것이 있을 때만" },
            { icon: "sum", title: "인보이스 총액과 발주 총액 비교", from: "발주 5,189.07", to: "인보이스 4,960.63", note: "맞지 않으면 전기 전에 멈춰요" },
          ],
          outro: "Cleaner는 Tavnit에서 원하는 필드로 직접 만들어요. 여기 있는 건 예시일 뿐이에요.",
        },
        after: {
          lead: "필드 {fields}개짜리 고정 Flow와 Matcher로 만든 결과예요. 계정에서는 필드를 직접 정할 수 있어요. Tavnit이 들어오는 인보이스마다 대조하면 이렇게 돼요:",
        },
        how: {
          heading: "작동 방식",
          steps: [
            { title: "두 문서 올리기", body: "발주서와 인보이스를 PDF나 사진으로. 공급업체, 언어, 레이아웃은 상관없어요." },
            { title: "Tavnit이 Flow 하나로 두 문서를 읽어요", body: "두 문서 모두에서 헤더(번호, 날짜, 공급업체, 합계)와 수량, 가격이 담긴 모든 줄을 읽어요." },
            { title: "Matcher가 줄을 짝지어요", body: "발주서의 각 줄을 같은 뜻의 인보이스 줄과 연결하고 가격과 수량을 비교해요. 계정이 있으면 비교 결과를 Excel로 가져갈 수 있어요." },
          ],
        },
        faqs: [
          {
            q: "무료 버전에는 무엇이 포함되나요?",
            a: "하루 {limit}건(대조 한 번에 2건 사용)까지 전체 결과를 화면에서 볼 수 있어요. 비교 결과 Excel 다운로드에는 Tavnit 계정이 필요하고, 계정은 무료예요.",
          },
          {
            q: "문구가 똑같지 않은데 어떻게 줄을 짝짓나요?",
            a: "Tavnit Matcher는 품명을 글자 단위가 아니라 의미로 비교해요. “Long grain rice 20 lb”와 “RICE L/GRAIN PREMIUM 20LB”는 같은 줄이에요. 두 품명이 비슷하지만 애매하면 두 번째 단계에서 같은 품목인지 판단해요.",
          },
          {
            q: "가격 허용 오차는 얼마인가요?",
            a: "가격이 0.5% 넘게 또는 1센트 넘게 달라지면 차이로 표시해요. 수량은 정확히 비교해요. 계정에서는 Cleaner로 원하는 허용 오차를 설정할 수 있어요.",
          },
          {
            q: "“인보이스에 없음”과 “발주서에 없음”은 무슨 뜻인가요?",
            a: "“인보이스에 없음”은 공급업체가 청구하지 않은 발주서 줄(분할 납품 또는 미납품)이에요. “발주서에 없음”은 그 발주서에서 아무도 주문하지 않았는데 청구된 줄이에요.",
          },
          {
            q: "입고증까지 포함한 3자 대조도 되나요?",
            a: "여기서는 안 돼요. 무료 버전은 문서 두 개를 비교해요. 계정에서는 입고증을 같은 Flow의 세 번째 문서로 추가해 Matcher가 세 문서를 모두 확인하게 하거나, 입고증이 맞을 때까지 인보이스가 전기되지 않도록 Cleaner 규칙을 만들 수 있어요.",
          },
          {
            q: "어떤 형식을 지원하나요?",
            a: "PDF(텍스트 또는 스캔), JPG, PNG를 문서당 최대 4MB, 5페이지까지 받아요. ERP에서 출력한 발주서와 어느 공급업체의 인보이스든 처리해요.",
          },
          {
            q: "제 파일은 어떻게 되나요?",
            a: "무료 도구 전용 Tavnit 계정에서 처리되고, 다른 용도로는 전혀 쓰이지 않아요. 24시간이 지나면 파일과 비교 결과는 자동으로 삭제돼요. 실행이 있었다는 사실만 남고 문서나 그 내용은 보관하지 않아요.",
          },
          {
            q: "어떻게 자동화하나요?",
            a: "계정을 만들고 구매 문서용 Flow와 그 위에 Matcher를 구성하세요. 인보이스가 이메일이나 API로 들어오면 발주서와 짝지어지고, 차이는 아무도 입력하지 않아도 이메일, 웹훅, ERP로 전달돼요.",
          },
        ],
        compare: {
          slots: [
            { title: "발주서", hint: "발주서 PDF 또는 사진", sample: "샘플 발주서" },
            { title: "인보이스", hint: "인보이스 PDF 또는 사진", sample: "샘플 인보이스" },
          ],
          run: "비교하기",
          sampleAll: "샘플 발주서와 인보이스로 체험하기",
          stages: ["발주서와 인보이스 읽는 중", "줄 정리 중", "Matcher가 줄을 짝짓는 중", "거의 다 됐어요"],
          heading: "비교 완료",
          summary: "{n} · {ref} vs {doc}",
          labels: {
            description: "품명",
            quantity: "수량",
            price: "가격",
            total: "합계",
            status: "상태",
            ref: "발주서",
            doc: "인보이스",
            supplier: "공급업체",
            champion: "Champion",
            wins: "{n}줄 최저가",
            lines: ["줄", "줄"],
          },
          status: {
            ok: "일치",
            price: "가격 다름",
            qty: "수량 다름",
            both: "가격과 수량 다름",
            missing: "인보이스에 없음",
            extra: "발주서에 없음",
          },
          empty: "짝지을 수 있는 줄이 없어요. 두 문서 모두 수량과 가격이 있는 품목 표가 있는지 확인해 주세요.",
          another: "다른 문서 비교하기",
          download: "비교 결과를 Excel로 다운로드",
        },
      },
    },
    /**
     * Split a scanned PDF into its documents. The one Lite tool that is a
     * Splitter, not a Flow: the result is a list of documents, each with its
     * page range and type, downloadable one by one or as a zip.
     */
    "split-scanned-pdf": {
      vocab: {
        doc: "스캔 PDF",
        docs: "스캔 PDF",
        a_doc: "스캔 PDF",
        the_doc: "PDF",
        the_docs: "PDF",
        your_doc: "PDF",
        your_docs: "PDF",
        all_your_docs: "모든 PDF",
        all_docs: "모든 PDF",
        each_doc: "PDF마다",
        another_doc: "다른 PDF",
        this_doc: "이 PDF",
      },
      overrides: {
        title: "스캔 PDF를 문서별로 무료 분리 (AI)",
        description:
          "여러 문서(인보이스, 발주서, 영수증, 계약서)를 한꺼번에 스캔한 PDF 하나를 올리면, 문서마다 따로 유형별로 분류해 돌려드려요. 무료, 페이지 표시 작업 필요 없음.",
        label: "스캔 PDF 분리",
        h1: "스캔 PDF를 문서별로 나누세요",
        intro:
          "종이 열 장을 스캐너에 넣었더니 PDF 하나가 나왔나요? 그대로 올리세요. Tavnit이 모든 페이지를 읽고 각 문서가 시작되는 지점을 찾아, 유형(인보이스, 발주서, 영수증, 패킹 리스트, 선하증권, 계약서…)과 함께 하나씩 돌려드려요. 페이지 수로 자르지 않고, 손으로 표시할 것도 없어요.",
        trust: ["PDF 1개 · 최대 12페이지", "하루 {limit}건 무료", "24시간 후 모두 삭제"],
        drop: {
          title: "스캔 PDF를 여기에 놓으세요",
          hint: "여러 문서가 들어 있는 PDF 하나",
          choose: "파일 선택",
          sample: "샘플 스캔으로 체험하기",
          formats: "PDF · 최대 4MB, 12페이지",
        },
        stages: ["PDF 업로드 중", "모든 페이지 읽는 중", "문서 시작 지점 찾는 중", "분류 중", "거의 다 됐어요"],
        result: {
          retention: "24시간 후 자동 삭제",
          downloading: "파일 준비 중",
          another: "다른 PDF 분리하기",
          empty: "이 PDF에서 두 건 이상의 문서를 찾지 못했어요.",
          flowNote: "이 유형들은 이 도구의 고정 Splitter에 속해요. 계정에서는 유형을 직접 정의할 수 있어요.",
        },
        errors: {
          too_large: "파일이 4MB를 넘어요. 압축하거나 스캔을 둘로 나눠 주세요.",
          too_many_pages: "무료 버전은 PDF당 최대 12페이지까지 분리해요. 계정이 있으면 제한이 없어요.",
          unsupported: "PDF, JPG, PNG만 받을 수 있어요. 문서를 분리하려면 스캐너에서 나온 PDF를 올려 주세요.",
          failed: "이 PDF를 분리하지 못했어요. 다른 스캔이나 샘플로 시도해 보세요.",
          empty: "파일이 비어 있어요.",
        },
        next: {
          lead: "방금은 PDF 하나였어요. 계정이 있으면 Splitter가 잘라 낸 문서마다 각자의 Flow로 가요. 인보이스는 인보이스 추출로, 발주서는 발주서 추출로, 영수증은 경비 보고서로. 이제 아무도 손으로 나누거나 분류하지 않아요.",
          source: "내 PDF",
          flow: {
            title: "Splitter에서 Flow로: 문서마다 각자의 추출로",
            body: "Splitter는 각 문서가 시작되는 지점을 찾고, 말로 설명해 둔 유형으로 분류해요. 이 도구는 유형 8개에 출력이 없는 고정 Splitter를 써서 문서만 돌려드려요. 계정에서는 유형을 직접 정의하고, 유형마다 어디로 보낼지 정해요. 필드를 추출하는 Flow(아래처럼 필드 {fields}개), 이메일, Collection 중에서요. 템플릿도 좌표도 필요 없어요.",
            linkLabel: "Splitter 작동 방식",
            href: "/docs/splitters",
          },
          inputs: {
            show: "PDF는 어떻게 들어오나요?",
          },
        },
        cleaners: {
          heading: "분리한 다음, Tavnit에서는…",
          lead: "문서 유형마다 목적지를 따로 둘 수 있어서 아무도 손으로 분류할 필요가 없어요. 예시 네 가지:",
          ideas: [
            { icon: "text", title: "인보이스는 Flow를 거쳐 ERP로", from: "인보이스 (1–2쪽)", to: "인보이스 Flow → ERP", note: "손대지 않고 추출해 전기해요" },
            { icon: "mail", title: "영수증은 경비 보고서로", from: "영수증 (5쪽)", to: "expenses@yourcompany", note: "영수증마다 정산 담당자에게 도착해요" },
            { icon: "calendar", title: "계약서는 날짜와 함께 법무 보관함으로", from: "계약서 (6–7쪽)", to: "계약서 Flow", note: "만료일과 갱신일을 한 표에" },
            { icon: "alert", title: "인식하지 못한 문서는 알림", from: "분류되지 않은 페이지", to: "사람 검토", note: "잃어버리거나 잘못 보관되는 문서가 없어요" },
          ],
          outro: "목적지는 Tavnit에서 문서 유형별로 설정해요. 여기 있는 건 예시일 뿐이에요.",
          cta: "무료 계정을 만들고 설정하기",
          ctaSignedIn: "Tavnit을 열고 설정하기",
          learn: "Splitter란?",
        },
        after: {
          title: "문서가 준비됐어요",
          lead: "유형 8개짜리 고정 Splitter로 만든 결과예요. 계정에서는 유형을 직접 정의하고, 문서마다 알아서 해당 Flow로 이어져요:",
          close: "닫기",
        },
        how: {
          heading: "작동 방식",
          steps: [
            { title: "스캔 올리기", body: "스캐너에서 나온 그대로, 여러 문서가 담긴 PDF 하나. 순서도, 문서당 페이지 수도 상관없어요." },
            { title: "Tavnit이 나누고 분류해요", body: "모든 페이지를 읽고 각 문서가 시작되는 지점을 찾아 유형을 지정해요: 인보이스, 발주서, 영수증, 패킹 리스트, 선하증권, 계약서, 대변 메모, 기타." },
            { title: "문서별로 다운로드", body: "페이지 범위와 유형이 담긴 목록이 보여요. 무료 계정이 있으면 PDF를 하나씩 받거나 zip으로 한꺼번에 받을 수 있어요." },
          ],
        },
        faqs: [
          {
            q: "한 문서가 어디서 끝나고 다음 문서가 어디서 시작되는지 어떻게 아나요?",
            a: "AI가 사람처럼 모든 페이지를 함께 봐요. 헤더, 회사, 페이지 번호, 레이아웃이 바뀌는 지점을 살피죠. 페이지 수를 세거나 표시를 찾지 않기 때문에, 인보이스가 두 페이지이고 영수증이 한 페이지여도 잘 작동해요.",
          },
          {
            q: "어떤 문서 유형을 인식하나요?",
            a: "여기서는 8가지예요: 인보이스, 발주서, 영수증, 패킹 리스트, 선하증권, 계약서, 대변 메모, 기타. 계정에서는 유형을 말로 설명해 직접 정의하고, 유형마다 데이터를 추출하는 Flow, 이메일, Collection 중 어디로 보낼지 정해요.",
          },
          {
            q: "무료 버전에는 무엇이 포함되나요?",
            a: "하루 {limit}건까지 전체 결과를 화면에서 볼 수 있어요. 분리된 PDF 다운로드에는 Tavnit 계정이 필요하고, 계정은 무료예요.",
          },
          {
            q: "몇 페이지까지 올릴 수 있나요?",
            a: "무료 버전은 PDF당 최대 12페이지, 4MB까지예요. 계정이 있으면 페이지 제한이 없고, 스캔을 Splitter로 바로 메일로 보낼 수 있어요.",
          },
          {
            q: "스캔 품질이 나쁘거나 여러 언어가 섞여 있어도 되나요?",
            a: "네. 기울어진 스캔, 흑백 스캔, 도장이 찍힌 스캔도 처리하고, 같은 PDF에 영어, 스페인어 등 여러 언어 문서가 섞여 있어도 괜찮아요. 읽을 수 없는 페이지는 임의의 유형을 붙이지 않고 미분류로 표시해요.",
          },
          {
            q: "제 파일은 어떻게 되나요?",
            a: "무료 도구 전용 Tavnit 계정에서 처리되고, 다른 용도로는 전혀 쓰이지 않아요. 24시간이 지나면 PDF와 분리된 문서는 자동으로 삭제돼요. 실행이 있었다는 사실만 남고 파일이나 그 내용은 보관하지 않아요. 더 빨리 지우고 싶다면 support@tavnit.io로 메일을 보내 주세요.",
          },
          {
            q: "다운로드에 왜 계정이 필요한가요?",
            a: "무료 버전은 체험용이기 때문이에요. 계정이 있으면 모든 스캔을 분리하고, 문서마다 해당 Flow로 보내고, 추출된 데이터를 ERP나 이메일로 받을 수 있어요.",
          },
          {
            q: "어떻게 자동화하나요?",
            a: "계정을 만들고 내 문서 유형으로 Splitter를 구성한 뒤 스캔을 그 이메일 주소로 전달하거나 API로 연결하세요. 잘라 낸 문서는 알아서 각자의 Flow로 가고, 거기서 ERP, Google Sheets, 받은편지함으로 이어져요.",
          },
        ],
        split: {
          heading: "완료: {file}",
          summary: "{pages}에서 문서 {n}",
          segmentWord: ["건", "건"],
          pageWord: ["페이지", "페이지"],
          pages: "{from}–{to}쪽",
          pageOne: "{from}쪽",
          unmatched: "미분류",
          type: "유형",
          reason: "근거",
          download: "다운로드",
          downloadAll: "모두 다운로드 (zip)",
          stages: ["PDF 업로드 중", "모든 페이지 읽는 중", "문서 시작 지점 찾는 중", "분류 중", "거의 다 됐어요"],
          empty: "이 PDF에서 두 건 이상의 문서를 찾지 못했어요.",
          another: "다른 PDF 분리하기",
        },
      },
    },
    /**
     * Packing list → Excel. Shipment header (shipper, consignee, ports, totals)
     * once per document and one row per goods line with packages, net and gross
     * weight and dimensions.
     */
    "packing-list-to-excel": {
      vocab: {
        doc: "패킹 리스트",
        docs: "패킹 리스트",
        a_doc: "패킹 리스트",
        the_doc: "패킹 리스트",
        the_docs: "패킹 리스트",
        your_doc: "패킹 리스트",
        your_docs: "패킹 리스트",
        all_your_docs: "모든 패킹 리스트",
        all_docs: "모든 패킹 리스트",
        each_doc: "패킹 리스트마다",
        another_doc: "다른 패킹 리스트",
        this_doc: "이 패킹 리스트",
      },
      overrides: {
        title: "패킹 리스트 Excel 변환 무료: AI가 모든 줄을 추출",
        description:
          "패킹 리스트를 PDF나 사진으로 올리면 모든 줄을 Excel 표로 받아요: 품명, 수량, 포장 수, 순중량과 총중량, 치수, 그리고 송하인, 수하인, 항구까지. 무료, 템플릿 없음, 결과 확인에 가입 불필요.",
        label: "패킹 리스트 Excel 변환",
        h1: "패킹 리스트를 Excel로 바꾸세요",
        intro:
          "PDF나 사진을 올리세요. Tavnit이 선적 헤더(송하인, 수하인, 항구, 합계)와 포장 수, 중량, 치수가 담긴 모든 화물 줄을 읽어 스프레드시트로 돌려드려요. 공급업체별 템플릿은 필요 없어요. 같은 도구가 모든 선적의 패킹 리스트에 그대로 통해요.",
        drop: {
          title: "패킹 리스트를 여기에 놓으세요",
          sample: "샘플 패킹 리스트로 체험하기",
        },
        stages: ["문서 업로드 중", "선적 헤더 읽는 중", "화물 줄 찾는 중", "열 정리 중", "거의 다 됐어요"],
        result: {
          empty: "이 문서에서 화물 줄을 찾지 못했어요. 줄마다 포장 수, 중량, 수량이 적힌 패킹 리스트로 시도해 보세요.",
          flowNote: "이 {fields}개 열은 고정된 패킹 리스트 Flow의 필드예요. 계정에서는 필드를 직접 정할 수 있어요.",
          ghostHint: "Tavnit에서는 원하는 필드를 직접 추가해요: 컨테이너, 화인, HS 코드, B/L 번호…",
        },
        next: {
          lead: "방금은 패킹 리스트 한 건이었어요. 계정이 있으면 들어오는 패킹 리스트마다 똑같이 처리되고, 데이터는 Excel에서 멈추지 않아요. 알아서 다음 단계로 이어져요.",
          source: "패킹 리스트",
          flow: {
            name: "패킹 리스트",
            add: { name: "container", type: "텍스트", hint: "“Container” 옆 · 예: MSKU-4417", save: "저장", value: "MSKU-4417" },
          },
          inputs: { show: "패킹 리스트는 어떻게 들어오나요?" },
        },
        cleaners: {
          lead: "추출이 끝나면 패킹 리스트마다 자동으로 실행되는 간단한 규칙이에요. 내 데이터를 활용한 아이디어 네 가지:",
          ideas: [
            { icon: "date", title: "날짜는 한 가지 형식으로", from: "{date}", to: "{iso}", note: "패킹 리스트마다 같은 형식으로" },
            { icon: "alert", title: "총중량은 순중량보다 커야 해요", from: "순중량 > 총중량", to: "검토 필요", note: "뒤바뀐 줄이 아무도 모른 채 신고되지 않아요" },
            { icon: "calendar", title: "출항 전 알림", from: "선적일", to: "2일 전 리마인더", note: "관세사와 물류팀에" },
            { icon: "mail", title: "관세사에게 사본 전송", from: "추출된 패킹 리스트", to: "Excel 첨부 메일", note: "관련 인보이스와 함께" },
          ],
        },
        after: {
          lead: "필드 {fields}개짜리 고정 Flow로 만든 결과예요. 계정에서는 필드를 직접 정할 수 있어요. Tavnit이 패킹 리스트마다 처리하면 이렇게 돼요:",
        },
        how: {
          steps: [
            { title: "패킹 리스트 올리기", body: "PDF, 사진, 스캔 모두 가능해요. 송하인, 언어, 레이아웃은 상관없어요." },
            {
              title: "Tavnit이 읽어요",
              body: "헤더(송하인, 수하인, 항구, 합계)와 줄마다 포장 수, 순중량, 총중량, 치수가 담긴 화물 표를 찾아요.",
            },
            { title: "확인하고 다운로드", body: "표가 화면에 바로 나타나요. 무료 계정이 있으면 Excel로 가져갈 수 있어요." },
          ],
        },
        faqs: [
          {
            q: "무료 버전에는 무엇이 포함되나요?",
            a: "하루 {limit}건까지 전체 결과를 화면에서 볼 수 있어요. Excel 다운로드에는 Tavnit 계정이 필요하고, 계정은 무료예요.",
          },
          {
            q: "어떤 형식을 지원하나요?",
            a: "PDF(텍스트 또는 스캔), JPG, PNG를 최대 4MB, 5페이지까지 받아요. 패킹 리스트 페이지가 더 많으면 나눠서 올리거나 계정을 만드세요.",
          },
          {
            q: "패킹 리스트에서 어떤 열을 추출하나요?",
            a: "문서 단위로는 송하인, 수하인, 번호, 날짜, 관련 인보이스, 선적항, 양하항, 포장 수와 중량의 합계를 추출해요. 줄 단위로는 품명, 수량, 단위, 포장 수, 순중량, 총중량, 치수예요. 문서 값은 모든 행에 반복되어 표를 그대로 필터링할 수 있어요.",
          },
          {
            q: "다른 열을 고를 수 있나요?",
            a: "여기서는 안 돼요. 이 도구는 필드 17개짜리 고정 패킹 리스트 Flow를 써요. 계정에서는 패킹 리스트용이든 다른 문서용이든 필요한 필드로 직접 Flow를 만들 수 있어요. 문서 단위(컨테이너, 봉인, B/L 번호, 인코텀즈)도, 줄 단위(화인, HS 코드, 부피)도 가능해요. 템플릿은 없어요. 필드를 설명하고, 필요하면 어디를 봐야 하는지 힌트만 주면 돼요.",
          },
          {
            q: "어느 나라 패킹 리스트에도 쓸 수 있나요?",
            a: "네. 영어, 스페인어 등 여러 언어의 패킹 리스트를 처리하고, kg이나 lb 단위 중량과 cm나 인치 단위 치수도 인쇄된 그대로 가져와요. 파나마, 콜롬비아, 멕시코, 중국, 미국 등의 선적에서 테스트했어요.",
          },
          {
            q: "공급업체마다 템플릿을 설정해야 하나요?",
            a: "아니요. Tavnit은 템플릿을 쓰지 않아요. 송하인이 내일 패킹 리스트 레이아웃을 바꿔도 문서를 있는 그대로 읽어요.",
          },
          {
            q: "제 파일은 어떻게 되나요?",
            a: "무료 도구 전용 Tavnit 계정에서 처리되고, 다른 용도로는 전혀 쓰이지 않아요. 24시간이 지나면 파일과 추출된 행은 자동으로 삭제돼요. 실행이 있었다는 사실만 남고 문서나 그 내용은 보관하지 않아요. 더 빨리 지우고 싶다면 support@tavnit.io로 메일을 보내 주세요.",
          },
          {
            q: "어떻게 자동화하나요?",
            a: "계정을 만들고 원하는 필드로 Flow를 구성한 뒤 패킹 리스트를 그 이메일 주소로 전달하거나, API, 웹훅, Zapier, Make, n8n으로 연결하세요. 모든 선적 데이터가 아무도 입력하지 않아도 통관 시스템, ERP, Google Sheets에 들어가요.",
          },
        ],
      },
    },
    /**
     * Bill of lading → Excel. Everything that is specific to an ocean B/L:
     * header fields, one row per container line, customs and forwarder use
     * cases. Korean trade says "B/L" (or 선하증권) for it.
     */
    "bill-of-lading-to-excel": {
      vocab: {
        doc: "B/L",
        docs: "B/L",
        a_doc: "B/L",
        the_doc: "B/L",
        the_docs: "B/L",
        your_doc: "B/L",
        your_docs: "B/L",
        all_your_docs: "모든 B/L",
        all_docs: "모든 B/L",
        each_doc: "B/L마다",
        another_doc: "다른 B/L",
        this_doc: "이 B/L",
      },
      overrides: {
        title: "선하증권(B/L) Excel 변환 무료: B/L 데이터 추출",
        description:
          "선하증권(B/L)을 PDF나 사진으로 올리면 데이터를 Excel 표로 받아요: B/L 번호, 운송사, 송하인, 수하인, 선박, 항구, 그리고 컨테이너마다 봉인, 화물, 포장 수, 중량, 부피를 한 행씩. 무료, 템플릿 없음, 결과 확인에 가입 불필요.",
        label: "선하증권 Excel 변환",
        h1: "선하증권(B/L)을 Excel로 바꾸세요",
        intro:
          "B/L의 PDF나 사진을 올리세요. Tavnit이 헤더(B/L 번호, 운송사, 송하인, 수하인, 선박, 항차, 항구, 본선 적재일)와 컨테이너, 봉인, 포장 수, 총중량, 부피가 담긴 모든 화물 줄을 읽어 스프레드시트로 돌려드려요. 운송사별 템플릿은 필요 없어요. 같은 Flow가 MSC, Maersk, Hapag-Lloyd는 물론 어떤 NVOCC의 B/L도 읽어요.",
        drop: {
          title: "B/L을 여기에 놓으세요",
          sample: "샘플 B/L로 체험하기",
        },
        stages: ["문서 업로드 중", "B/L 헤더 읽는 중", "화물 줄 찾는 중", "열 정리 중", "거의 다 됐어요"],
        result: {
          empty: "이 문서에서 화물 줄을 찾지 못했어요. 컨테이너와 화물 표가 있는 선하증권으로 시도해 보세요.",
          flowNote: "이 {fields}개 열은 고정된 선하증권 Flow의 필드예요. 계정에서는 필드를 직접 정할 수 있어요.",
          ghostHint: "Tavnit에서는 원하는 필드를 직접 추가해요: 인코텀즈, 인도 장소, 부킹 번호, ETA…",
          another: "다른 B/L 처리하기",
        },
        errors: {
          too_large: "파일이 4MB를 넘어요. 압축하거나 B/L 페이지만 올려 주세요.",
        },
        next: {
          lead: "방금은 B/L 한 건이었어요. 계정이 있으면 모든 운송사와 대리점에서 들어오는 B/L마다 똑같이 처리되고, 데이터는 Excel에서 멈추지 않고 통관 시스템이나 포워딩 시스템으로 알아서 이어져요.",
          source: "내 B/L",
          flow: {
            name: "선하증권",
            add: { name: "incoterm", type: "텍스트", hint: "“Incoterm” 옆 · 예: CIF Manzanillo", save: "저장", value: "CIF" },
          },
          inputs: { show: "B/L은 어떻게 들어오나요?" },
        },
        cleaners: {
          lead: "추출이 끝나면 B/L마다 자동으로 실행되는 간단한 규칙이에요. 내 데이터를 활용한 아이디어 네 가지:",
          ideas: [
            { icon: "date", title: "본선 적재일은 한 가지 형식으로", from: "{date}", to: "{iso}", note: "B/L마다 같은 형식으로" },
            { icon: "alert", title: "범위를 벗어난 총중량", from: "컨테이너별 총중량", to: "26,000kg 초과 시 표시", note: "감당할 수 없는 트럭을 예약하는 일이 없도록" },
            { icon: "calendar", title: "도착 전 알림", from: "적재일 + 운송 기간", to: "5일 전 리마인더", note: "선박이 접안하기 전에 신고를 마치도록" },
            { icon: "mail", title: "관세사에게 바로", from: "추출된 B/L", to: "표를 첨부한 메일", note: "아무도 전달하지 않아도 관세사무소로" },
          ],
        },
        after: {
          lead: "필드 {fields}개짜리 고정 Flow로 만든 결과예요. 계정에서는 필드를 직접 정할 수 있어요. Tavnit이 B/L마다 처리하면 이렇게 돼요:",
        },
        how: {
          steps: [
            { title: "B/L 올리기", body: "PDF, 사진, 스캔 모두 가능해요. 운송사, 대리점, 양식 레이아웃은 상관없어요." },
            { title: "Tavnit이 읽어요", body: "헤더(B/L 번호, 당사자, 선박, 항차, 항구, 적재일, 운임 조건)와 화물 표를 찾아요. 화물 표는 컨테이너마다 한 줄로, 봉인, 화물, 포장 수, 중량, 부피가 담겨요." },
            { title: "확인하고 다운로드", body: "표가 화면에 바로 나타나요. 무료 계정이 있으면 Excel로 가져갈 수 있어요." },
          ],
        },
        faqs: [
          {
            q: "무료 버전에는 무엇이 포함되나요?",
            a: "하루 {limit}건까지 전체 결과를 화면에서 볼 수 있어요. Excel 다운로드에는 Tavnit 계정이 필요하고, 계정은 무료예요.",
          },
          {
            q: "선하증권에서 무엇을 추출하나요?",
            a: "헤더에서는 B/L 번호, 운송사, 송하인, 수하인, 통지처, 선박, 항차, 선적항, 양하항, 본선 적재일, 운임 조건, 컨테이너 목록을 추출해요. 화물 표에서는 줄마다 한 행으로 컨테이너, 봉인, 화물 품명, 포장 수와 종류, 총중량, 부피를 추출해요. 헤더 값은 모든 행에 반복되어 시트를 깔끔하게 필터링하고 합산할 수 있어요.",
          },
          {
            q: "다른 열을 고를 수 있나요?",
            a: "여기서는 안 돼요. 이 도구는 필드 19개짜리 고정 선하증권 Flow를 써요. 계정에서는 B/L용이든 다른 문서용이든 필요한 필드로 직접 Flow를 만들 수 있어요. 문서 단위(인코텀즈, 인도 장소, 부킹 번호, ETA)도, 줄 단위(HS 코드, 화인, 냉동 컨테이너 온도)도 가능해요. 템플릿은 없어요. 필드를 설명하고, 필요하면 어디를 봐야 하는지 힌트만 주면 돼요.",
          },
          {
            q: "어떤 형식을 지원하나요?",
            a: "PDF(텍스트 또는 스캔), JPG, PNG를 최대 4MB, 5페이지까지 받아요. B/L 페이지가 더 많거나 스캔 하나에 B/L이 여러 건이면 나눠서 올리거나 계정을 만드세요.",
          },
          {
            q: "어느 운송사의 B/L이든 되나요?",
            a: "네. 템플릿을 쓰지 않고 B/L을 있는 그대로 읽어요. 운송사의 Master B/L이든, 포워더의 House B/L이든, 해상 화물 운송장(Sea Waybill)이든, 영어든 스페인어든 상관없어요. MSC, Maersk, Hapag-Lloyd, CMA CGM, Evergreen, NVOCC 양식으로 테스트했어요.",
          },
          {
            q: "제 파일은 어떻게 되나요?",
            a: "무료 도구 전용 Tavnit 계정에서 처리되고, 다른 용도로는 전혀 쓰이지 않아요. 24시간이 지나면 파일과 추출된 행은 자동으로 삭제돼요. 실행이 있었다는 사실만 남고 문서나 그 내용은 보관하지 않아요. 더 빨리 지우고 싶다면 support@tavnit.io로 메일을 보내 주세요.",
          },
          {
            q: "다운로드에 왜 계정이 필요한가요?",
            a: "무료 버전은 체험용이기 때문이에요. 계정이 있으면 모든 선하증권에 같은 추출을 실행하고, 결과를 이메일로 받고, 통관 시스템이나 포워딩 시스템으로 보낼 수 있어요.",
          },
          {
            q: "어떻게 자동화하나요?",
            a: "계정을 만들고 원하는 필드로 Flow를 구성한 뒤 B/L을 그 이메일 주소(운송사나 포워더가 B/L을 보내는 주소)로 전달하거나, API, 웹훅, Zapier, Make, n8n으로 연결하세요. 데이터가 아무도 입력하지 않아도 통관 시스템, ERP, Google Sheets에 들어가요.",
          },
        ],
      },
    },
    /**
     * Compare supplier quotes. Two or three quotes for the same request go
     * through the quote Flow; the Matcher pairs the lines across suppliers and
     * marks the cheapest unit price per line as Champion.
     */
    "quote-comparison": {
      vocab: {
        doc: "견적서",
        docs: "견적서",
        a_doc: "견적서",
        the_doc: "견적서",
        the_docs: "견적서",
        your_doc: "견적서",
        your_docs: "견적서",
        all_your_docs: "모든 견적서",
        all_docs: "모든 견적서",
        each_doc: "견적서마다",
        another_doc: "다른 견적서",
        this_doc: "이 견적서",
      },
      overrides: {
        title: "공급업체 견적 비교 무료: 줄 단위 비교표",
        description:
          "견적서 두세 장을 PDF나 사진으로 올리면 비교표 하나로 받아요. 줄마다 공급업체별 가격과 최저가가 표시돼요. 무료, 템플릿 없음, 결과 확인에 가입 불필요.",
        label: "공급업체 견적 비교",
        h1: "공급업체 견적을 비교하세요",
        intro:
          "같은 요청에 대한 견적서 두세 장을 올리세요. Tavnit이 각 견적서를 읽고, 공급업체마다 표현이 달라도 줄을 짝지어, 가격과 줄별 최저가가 담긴 표 하나를 만들어요. 템플릿도, 손으로 만드는 스프레드시트도 필요 없어요.",
        trust: ["견적서 2~3장 · PDF 또는 사진", "하루 {limit}건 무료", "24시간 후 모두 삭제"],
        drop: {
          title: "견적서를 여기에 놓으세요",
          hint: "PDF 또는 사진",
          sample: "샘플 견적서 세 장으로 체험하기",
          formats: "PDF, JPG, PNG · 견적서당 최대 4MB, 5페이지",
        },
        stages: ["견적서 읽는 중", "줄 정리 중", "Matcher가 줄을 짝짓는 중", "거의 다 됐어요"],
        result: {
          flowNote: "견적서마다 필드 {fields}개짜리 고정 Flow를 거치고 Matcher가 교차 비교해요. 계정에서는 필드를 직접 정할 수 있어요.",
          ghostHint: "Tavnit에서는 원하는 필드를 직접 추가해요: 브랜드, 보증, 줄별 리드 타임…",
          download: "비교 결과를 Excel로 다운로드",
          another: "다른 견적서 비교하기",
          empty: "이 견적서에서 가격이 있는 줄을 찾지 못했어요. 줄마다 품목, 수량, 가격이 있는 견적서로 시도해 보세요.",
        },
        errors: {
          too_large: "견적서 중 하나가 4MB를 넘어요. 압축하거나 품목이 있는 페이지만 올려 주세요.",
          failed: "견적서 중 하나를 읽지 못했어요. 다른 견적서나 샘플로 시도해 보세요.",
          no_lines: "견적서 중 하나에 가격이 있는 줄이 없어서 비교할 것이 없어요. 견적서마다 단가가 있는 품목이 있는지 확인해 주세요.",
          not_ready: "아직 견적서를 읽고 있어요. 잠시 후 다시 시도해 주세요.",
        },
        auth: {
          title: "무료 계정을 만들고 표를 다운로드하세요",
          body: "Excel은 바로 다운로드돼요. 계정이 있으면 견적서를 세 장 넘게 비교할 수 있고, 들어오는 입찰마다 같은 작업을 할 수 있어요.",
        },
        next: {
          lead: "방금은 견적서 세 장을 직접 올렸어요. 계정이 있으면 이메일로 들어오는 견적서마다 Flow에 들어가고, Matcher가 알아서 교차 비교하고, 비교표는 구매팀, ERP, 승인권자에게로 이어져요.",
          source: "견적서",
          flow: {
            name: "견적서",
            add: { name: "brand", type: "텍스트", hint: "“Brand” 옆 또는 품명 안", save: "저장", value: "Argos" },
          },
          inputs: { show: "견적서는 어떻게 들어오나요?" },
        },
        cleaners: {
          lead: "견적서를 읽고 나면 견적서마다 자동으로 실행되는 간단한 규칙이에요. 아이디어 네 가지:",
          ideas: [
            { icon: "date", title: "날짜는 한 가지 형식으로", from: "{date}", to: "{iso}", note: "견적서마다 같은 형식으로" },
            { icon: "alert", title: "공급업체 가격이 5% 넘게 오르면 알림", from: "오늘 가격", to: "지난 견적 대비", note: "낙찰 전에 줄마다" },
            { icon: "approve", title: "낙찰 승인", from: "비교표", to: "결정권자", note: "승인되어야만 발주서가 나가요" },
            { icon: "calendar", title: "견적 유효 기간 알림", from: "{date}까지 유효", to: "5일 전 리마인더", note: "가격을 놓치지 않도록" },
          ],
        },
        after: {
          title: "비교표가 준비됐어요",
          lead: "필드 {fields}개짜리 고정 Flow와 Matcher로 만든 결과예요. 계정에서는 필드를 직접 정할 수 있어요. Tavnit이 견적서마다 교차 비교하면 이렇게 돼요:",
        },
        how: {
          steps: [
            { title: "견적서 두세 장 올리기", body: "같은 요청에 대한 PDF나 사진. 공급업체, 레이아웃, 품목을 적는 방식은 상관없어요." },
            { title: "Tavnit이 읽고 교차 비교해요", body: "견적서마다 줄을 추출하고, 표현이 달라도 Matcher가 품목을 짝지어요. 줄마다 가장 저렴한 곳이 Champion으로 표시돼요." },
            { title: "확인하고 다운로드", body: "표가 화면에 바로 나타나요. 무료 계정이 있으면 Excel로 가져갈 수 있어요." },
          ],
        },
        faqs: [
          {
            q: "무료 버전에는 무엇이 포함되나요?",
            a: "하루 {limit}건(견적서 세 장 비교는 3건)까지 전체 표를 화면에서 볼 수 있어요. Excel 다운로드에는 Tavnit 계정이 필요하고, 계정은 무료예요.",
          },
          {
            q: "공급업체마다 표현이 다른데 어떻게 줄을 짝짓나요?",
            a: "Tavnit Matcher가 해요. 정확한 문구가 아니라 각 품명의 의미를 비교해요. “grey cement 42.5 kg”와 “Portland cement type I grey, 42.5 kg bag”은 같은 행에 들어가요. 애매하면 두 번째 단계에서 같은 품목인지 판단해요.",
          },
          {
            q: "Champion은 무슨 뜻인가요?",
            a: "그 줄에서 단가가 가장 낮은 공급업체예요. 동률이면 둘 다 표시돼요. 한 공급업체만 견적을 낸 줄은 경쟁이 없지만 함께 보여 드려요.",
          },
          {
            q: "견적서를 세 장 넘게 비교할 수 있나요?",
            a: "여기서는 안 돼요. 무료 버전은 최대 세 장까지예요. 계정에서는 Matcher가 같은 Flow의 실행을 최대 열 건까지 비교하고, 표를 이메일이나 ERP로 보낼 수 있어요.",
          },
          {
            q: "다른 열을 고를 수 있나요?",
            a: "여기서는 안 돼요. 이 도구는 고정된 견적서 Flow를 써요. 계정에서는 필요한 필드(브랜드, 보증, 줄별 리드 타임)로 직접 Flow를 만들고, Matcher가 원하는 필드(가격, 리드 타임 등 어떤 숫자든)를 비교하도록 설정할 수 있어요.",
          },
          {
            q: "어떤 형식을 지원하나요?",
            a: "PDF(텍스트 또는 스캔), JPG, PNG를 견적서당 최대 4MB, 5페이지까지 받아요.",
          },
          {
            q: "제 파일은 어떻게 되나요?",
            a: "무료 도구 전용 Tavnit 계정에서 처리되고, 다른 용도로는 전혀 쓰이지 않아요. 24시간이 지나면 파일, 추출된 줄, 비교표는 자동으로 삭제돼요. 실행이 있었다는 사실만 남아요.",
          },
          {
            q: "어떻게 자동화하나요?",
            a: "계정을 만들고 원하는 필드로 견적서 Flow를, 그 위에 Matcher를 구성하세요. 견적서를 Matcher의 이메일 주소로 전달하면, 모두 도착하는 대로 비교표가 알아서 나와요. 이메일, 웹훅, ERP로요.",
          },
        ],
        compare: {
          slots: [
            { title: "견적서 A", hint: "PDF 또는 사진", sample: "샘플 견적서 A" },
            { title: "견적서 B", hint: "PDF 또는 사진", sample: "샘플 견적서 B" },
            { title: "견적서 C", hint: "PDF 또는 사진", sample: "샘플 견적서 C", optional: true },
          ],
          run: "비교하기",
          sampleAll: "샘플 견적서 세 장으로 체험하기",
          stages: ["견적서 읽는 중", "줄 정리 중", "Matcher가 줄을 짝짓는 중", "거의 다 됐어요"],
          heading: "비교표 완료",
          summary: "{n} · {ref}",
          labels: {
            description: "품명",
            quantity: "수량",
            price: "단가",
            total: "합계",
            status: "상태",
            ref: "A",
            doc: "B",
            supplier: "공급업체",
            champion: "Champion",
            wins: "{n}줄 최저가",
            lines: ["줄", "줄"],
          },
          status: { ok: "일치", price: "가격 다름", qty: "수량 다름", both: "가격과 수량 다름", missing: "견적 없음", extra: "이 견적서에만 있음" },
          empty: "Matcher가 견적서 간에 비교할 수 있는 줄을 찾지 못했어요. 같은 요청에 대한 견적서이고 단가가 있는 품목이 있는지 확인해 주세요.",
          another: "다른 견적서 비교하기",
          download: "비교 결과를 Excel로 다운로드",
        },
      },
    },
    /**
     * Contract key dates. One row per contract (a metadata-only Flow), so the
     * copy talks about dates and parties, never about line items.
     */
    "contract-dates": {
      vocab: {
        doc: "계약서",
        docs: "계약서",
        a_doc: "계약서",
        the_doc: "계약서",
        the_docs: "계약서",
        your_doc: "계약서",
        your_docs: "계약서",
        all_your_docs: "모든 계약서",
        all_docs: "모든 계약서",
        each_doc: "계약서마다",
        another_doc: "다른 계약서",
        this_doc: "이 계약서",
      },
      overrides: {
        title: "계약 갱신일 추출기 무료 (AI)",
        description:
          "계약서를 PDF로 올리면 핵심 날짜를 Excel 한 행으로 받아요: 당사자, 시작일, 종료일, 자동 갱신 여부, 통지 기간, 통지 마감일. 무료, 템플릿 없음, 결과 확인에 가입 불필요.",
        label: "계약서 날짜 추출",
        h1: "계약서에서 핵심 날짜를 추출하세요",
        intro:
          "PDF를 올리세요. Tavnit이 계약서를 읽고 당사자, 서명일, 계약 기간의 시작과 끝, 자동 갱신 여부, 통지 기간, 갱신 거절을 알려야 하는 마지막 날을 한 행으로 돌려드려요. 용역, 임대, 공급, 라이선스 계약서를 형식에 상관없이 처리해요.",
        drop: {
          title: "계약서를 여기에 놓으세요",
          sample: "샘플 계약서로 체험하기",
        },
        stages: ["문서 업로드 중", "당사자 읽는 중", "계약 기간과 갱신 조항 찾는 중", "통지 마감일 계산 중", "거의 다 됐어요"],
        result: {
          empty: "이 문서에서 당사자나 날짜를 찾지 못했어요. 계약 기간 조항이 있는 서명된 계약서로 시도해 보세요.",
          flowNote: "이 {fields}개 열은 고정된 계약서 Flow의 필드예요. 계정에서는 필드를 직접 정할 수 있어요.",
          ghostHint: "Tavnit에서는 원하는 필드를 직접 추가해요: 내부 담당자, 비용 센터, 위약금 조항…",
          another: "다른 계약서 처리하기",
        },
        next: {
          lead: "방금은 계약서 한 건이었어요. 계정이 있으면 들어오는 계약서마다 똑같이 처리되고, 날짜는 Excel에서 멈추지 않아요. 마감일 전에 알려 줘요.",
          source: "계약서",
          inputs: { show: "계약서는 어떻게 들어오나요?" },
          flow: {
            name: "계약서",
            add: { name: "owner", type: "텍스트", hint: "우리 쪽 서명자", save: "저장", value: "M. Perez" },
          },
        },
        cleaners: {
          lead: "계약서를 읽고 나면 계약서마다 자동으로 실행되는 간단한 규칙이에요. 내 데이터를 활용한 아이디어 네 가지:",
          ideas: [
            { icon: "date", title: "날짜는 한 가지 형식으로", from: "{date}", to: "{iso}", note: "계약서마다 같은 형식으로" },
            { icon: "calendar", title: "종료 60일 전 리마인더", from: "end_date", to: "제때 리마인더", note: "통지 마감일이 지나기 전에" },
            { icon: "alert", title: "자동 갱신이면 먼저 검토", from: "auto_renewal = Yes", to: "검토 필요", note: "아무도 보지 않은 채 갱신되는 계약이 없도록" },
            { icon: "mail", title: "담당자에게 메일", from: "계약서 읽기 완료", to: "행을 담은 메일", note: "서명한 사람이 날짜를 받아요" },
          ],
        },
        after: {
          lead: "필드 {fields}개짜리 고정 Flow로 만든 결과예요. 계정에서는 필드를 직접 정할 수 있어요. Tavnit이 계약서마다 읽으면 이렇게 돼요:",
        },
        how: {
          steps: [
            { title: "계약서 올리기", body: "텍스트 PDF나 스캔 PDF. 누가 작성했든 어떤 종류의 계약서든 괜찮아요." },
            { title: "Tavnit이 읽어요", body: "당사자, 서명, 계약 기간, 갱신 조항, 통지 기간을 찾고, 통지 마감일을 계산해요." },
            { title: "확인하고 다운로드", body: "행이 화면에 바로 나타나요. 무료 계정이 있으면 Excel로 가져갈 수 있어요." },
          ],
        },
        faqs: [
          {
            q: "무료 버전에는 무엇이 포함되나요?",
            a: "하루 계약서 {limit}건까지 전체 결과를 화면에서 볼 수 있어요. Excel 다운로드에는 Tavnit 계정이 필요하고, 계정은 무료예요.",
          },
          {
            q: "어떤 날짜와 정보를 추출하나요?",
            a: "당사자, 서명일, 계약 기간의 시작과 끝, 계약 기간 길이, 자동 갱신 여부, 통지 기간, 갱신 거절 통지 마감일, 통화를 포함한 계약 금액, 준거법이에요. 계약서에 없는 내용은 비워 둬요. 날짜를 지어내는 일은 절대 없어요.",
          },
          {
            q: "결과가 왜 한 행인가요?",
            a: "계약서에는 계약 기간 하나, 서명일 하나, 당사자 한 세트가 있기 때문이에요. 계정이 있으면 계약서 폴더 전체를 실행해 계약서마다 한 행씩 담긴 표를 받고, 종료일 순으로 바로 정렬할 수 있어요.",
          },
          {
            q: "어떤 형식을 지원하나요?",
            a: "PDF(텍스트 또는 스캔), JPG, PNG를 최대 4MB, 5페이지까지 받아요. 계약서가 더 길면 계약 기간과 갱신 조항이 있는 페이지만 올리거나 계정을 만드세요.",
          },
          {
            q: "다른 열을 고를 수 있나요?",
            a: "여기서는 안 돼요. 이 도구는 필드 14개짜리 고정 계약서 Flow를 써요. 계정에서는 계약서용이든 다른 문서용이든 필요한 필드(내부 담당자, 위약금 조항, 보증)로 직접 Flow를 만들 수 있어요. 템플릿은 없어요. 필드를 설명하고, 필요하면 어디를 봐야 하는지 힌트만 주면 돼요.",
          },
          {
            q: "제 파일은 어떻게 되나요?",
            a: "무료 도구 전용 Tavnit 계정에서 처리되고, 다른 용도로는 전혀 쓰이지 않아요. 24시간이 지나면 파일과 추출된 행은 자동으로 삭제돼요. 실행이 있었다는 사실만 남고 문서나 그 내용은 보관하지 않아요. 더 빨리 지우고 싶다면 support@tavnit.io로 메일을 보내 주세요.",
          },
          {
            q: "어느 나라 계약서에도 쓸 수 있나요?",
            a: "네. 영어, 스페인어 등 여러 언어의 계약서를 어떤 날짜 형식이든 처리해요. 미국, 파나마, 멕시코, 콜롬비아 등의 계약서로 테스트했어요.",
          },
          {
            q: "종료일 전에 알림을 받으려면 어떻게 하나요?",
            a: "계정을 만들고 원하는 필드로 Flow를 구성한 뒤 계약서를 그 이메일 주소로 전달하거나, API, 웹훅, Zapier, Make, n8n으로 연결하세요. Cleaner가 통지 마감일을 오늘 날짜와 비교해 결정해야 할 사람에게 이메일이나 웹훅을 보내요.",
          },
        ],
      },
    },
    /**
     * Receipt → Excel. Mostly photos of thermal tickets: restaurants, pharmacies,
     * taxis, supermarkets. 영수증 ends in a final consonant, unlike the other
     * document words, which is why the base copy avoids 를/가 after {doc}.
     */
    "receipt-to-excel": {
      vocab: {
        doc: "영수증",
        docs: "영수증",
        a_doc: "영수증",
        the_doc: "영수증",
        the_docs: "영수증",
        your_doc: "영수증",
        your_docs: "영수증",
        all_your_docs: "모든 영수증",
        all_docs: "모든 영수증",
        each_doc: "영수증마다",
        another_doc: "다른 영수증",
        this_doc: "이 영수증",
      },
      overrides: {
        title: "영수증 Excel 변환 무료: 사진을 스프레드시트로",
        description:
          "영수증 사진이나 PDF를 올리면 내역을 Excel로 받아요: 가맹점, 날짜, 품목, 수량, 세금, 팁, 합계. 무료, 템플릿 없음, 결과 확인에 가입 불필요. 영수증 OCR로 몇 초 만에 스프레드시트를 만드세요.",
        label: "영수증 Excel 변환",
        h1: "영수증을 Excel로 바꾸세요",
        intro:
          "영수증을 사진으로 찍거나 PDF를 올리세요. Tavnit이 가맹점, 날짜, 가격이 붙은 모든 품목, 합계를 읽어 스프레드시트로 돌려드려요. 흐려지거나 비뚤어지거나 구겨진 감열지 영수증도 문제없어요. 설정할 템플릿이 없거든요.",
        drop: {
          title: "영수증 사진을 여기에 놓으세요",
          sample: "샘플 영수증으로 체험하기",
        },
        stages: ["영수증 업로드 중", "가맹점과 날짜 읽는 중", "품목 찾는 중", "열 정리 중", "거의 다 됐어요"],
        result: {
          empty: "이 영수증에서 품목을 찾지 못했어요. 그림자 없이 영수증 전체가 나오도록 더 선명한 사진으로 시도해 보세요.",
          flowNote: "이 {fields}개 열은 고정된 영수증 Flow의 필드예요. 계정에서는 필드를 직접 정할 수 있어요.",
          ghostHint: "Tavnit에서는 원하는 필드를 직접 추가해요: 비용 센터, 사용자, 프로젝트, 분류…",
        },
        next: {
          lead: "방금은 영수증 한 장이었어요. 계정이 있으면 들어오는 영수증마다 똑같이 처리되고, 데이터는 Excel에서 멈추지 않아요. 알아서 다음 단계로 이어져요.",
          source: "영수증",
          inputs: { show: "영수증은 어떻게 들어오나요?" },
          flow: {
            name: "영수증",
            add: { name: "cost_center", type: "텍스트", hint: "사용한 사람 또는 프로젝트", save: "저장", value: "영업" },
          },
        },
        cleaners: {
          lead: "영수증을 읽고 나면 영수증마다 자동으로 실행되는 간단한 규칙이에요. 내 데이터를 활용한 아이디어 네 가지:",
          ideas: [
            { icon: "date", title: "날짜는 한 가지 형식으로", from: "{date}", to: "{iso}", note: "경비 보고서를 위해 영수증마다 같은 형식으로" },
            { icon: "sum", title: "품목 합계는 소계와 같아야 해요", from: "품목 {sum}", to: "소계 {subtotal}", note: "맞지 않으면 사진이 잘못 읽힌 것이니 누군가 확인해요", check: "sum" },
            { icon: "approve", title: "일정 금액 이상은 승인", from: "합계 {total}", to: "환급 전 승인", note: "{threshold} 초과 시" },
            { icon: "money", title: "내 통화로 환산", from: "{total} {currency}", to: "내 통화", note: "출장용으로, 영수증 날짜의 환율로" },
          ],
        },
        after: {
          lead: "필드 {fields}개짜리 고정 Flow로 만든 결과예요. 계정에서는 필드를 직접 정할 수 있어요. Tavnit이 출장 한 번, 한 달 치 영수증을 모두 처리하면 이렇게 돼요:",
        },
        how: {
          steps: [
            { title: "영수증 올리기", body: "휴대폰 사진이나 PDF. 가맹점, 언어는 상관없고, 영수증이 아무리 흐려져도 괜찮아요." },
            { title: "Tavnit이 읽어요", body: "가맹점, 날짜, 번호, 가격이 붙은 모든 품목, 그리고 소계, 세금, 팁, 합계를 찾아요." },
            { title: "확인하고 다운로드", body: "표가 화면에 바로 나타나요. 무료 계정이 있으면 Excel로 가져갈 수 있어요." },
          ],
        },
        faqs: [
          {
            q: "무료 버전에는 무엇이 포함되나요?",
            a: "하루 영수증 {limit}건까지 전체 결과를 화면에서 볼 수 있어요. Excel 다운로드에는 Tavnit 계정이 필요하고, 계정은 무료예요.",
          },
          {
            q: "휴대폰으로 찍은 사진도 되나요?",
            a: "네, 그게 일반적인 경우예요. JPG, PNG, PDF를 최대 4MB까지 받아요. 영수증 전체가 화면에 들어오고, 조명이 고르고, 손가락이 가리지 않으면 좋아요. 약간 기울거나 흐린 사진도 읽혀요.",
          },
          {
            q: "어떤 형식을 지원하나요?",
            a: "JPG, PNG, PDF(텍스트 또는 스캔)를 최대 4MB, 5페이지까지 받아요. 긴 마트 영수증도 사진 한 장이면 돼요.",
          },
          {
            q: "가맹점마다 템플릿을 설정해야 하나요?",
            a: "아니요. Tavnit은 템플릿을 쓰지 않아요. 식당, 약국, 택시, 주유소 어디 영수증이든 있는 그대로 읽어요.",
          },
          {
            q: "다른 열을 고를 수 있나요?",
            a: "여기서는 안 돼요. 이 도구는 필드 15개짜리 고정 영수증 Flow를 써요. 계정에서는 필요한 필드로 직접 Flow를 만들 수 있어요. 문서 단위(비용 센터, 사용자, 프로젝트, 분류)도, 줄 단위(제품 코드)도 가능해요. 템플릿은 없어요. 필드를 설명하고, 필요하면 어디를 봐야 하는지 힌트만 주면 돼요.",
          },
          {
            q: "제 파일은 어떻게 되나요?",
            a: "무료 도구 전용 Tavnit 계정에서 처리되고, 다른 용도로는 전혀 쓰이지 않아요. 24시간이 지나면 사진과 추출된 행은 자동으로 삭제돼요. 실행이 있었다는 사실만 남고 문서나 그 내용은 보관하지 않아요. 더 빨리 지우고 싶다면 support@tavnit.io로 메일을 보내 주세요.",
          },
          {
            q: "출장 영수증이 50장인데, 한 장씩 해야 하나요?",
            a: "여기서는 그래요. 계정이 있으면 한꺼번에 보낼 수 있어요. Flow로 메일을 전달하거나, 여러 장을 한 번에 끌어다 놓거나, API로 연결하면 영수증마다 같은 Excel, Google Sheets, 경비 시스템에 행으로 들어가요.",
          },
          {
            q: "어떻게 자동화하나요?",
            a: "계정을 만들고 원하는 필드로 Flow를 구성한 뒤 영수증 사진을 그 이메일 주소로 전달하거나, API, 웹훅, Zapier, Make, n8n으로 연결하세요. 경비 보고서가 저절로 만들어져요.",
          },
        ],
      },
    },
    /**
     * Number format. A spreadsheet in, the chosen columns out in one number
     * format: a file exported with "1.234,56" that Excel reads as text, or the
     * other way round.
     */
    "number-format": {
      vocab: {
        doc: "스프레드시트",
        docs: "스프레드시트",
        a_doc: "스프레드시트",
        the_doc: "스프레드시트",
        the_docs: "스프레드시트",
        your_doc: "스프레드시트",
        your_docs: "스프레드시트",
        all_your_docs: "모든 스프레드시트",
        all_docs: "모든 스프레드시트",
        each_doc: "스프레드시트마다",
        another_doc: "다른 스프레드시트",
        this_doc: "이 스프레드시트",
      },
      overrides: {
        title: "Excel·CSV 숫자 형식 무료 변환",
        description:
          "1.234,56이나 1,234.56 같은 숫자가 담긴 Excel 또는 CSV 파일을 올리면 한 가지 형식으로 통일해 바로 합산할 수 있게 돌려드려요. 열과 형식은 직접 골라요. 무료, 결과 확인에 가입 불필요.",
        label: "숫자 형식 변환",
        h1: "스프레드시트의 숫자 형식을 바로잡으세요",
        intro:
          "Excel이나 CSV 파일을 올리세요. 숫자가 든 열과 원하는 형식(1234.56, 1,234.56, 1.234,56)을 고르면, Tavnit이 모든 숫자를 변환해 같은 열, 같은 순서 그대로 파일을 돌려드려요.",
        trust: ["CSV 또는 Excel · 최대 500행", "하루 {limit}개 파일 무료", "24시간 후 모두 삭제"],
        drop: {
          title: "Excel이나 CSV 파일을 여기에 놓으세요",
          hint: "또는 컴퓨터에서 파일을 선택하세요",
          choose: "파일 선택",
          sample: "샘플 파일로 체험하기",
          formats: "CSV 또는 .xlsx · 최대 4MB, 500행",
        },
        errors: {
          unsupported: "CSV나 Excel(.xlsx) 파일만 받을 수 있어요.",
          xls: "오래된 Excel 파일(.xls)이에요. Excel에서 열어 .xlsx나 .csv로 저장해 주세요.",
          too_many_rows: "무료 버전은 최대 500행까지 처리해요. 파일의 일부만 올려 주세요.",
          too_many_columns: "한 번에 최대 10개 열까지 고를 수 있어요.",
          no_columns: "열을 하나 이상 골라 주세요.",
          nothing_to_clean: "선택한 열에서 변환할 숫자를 찾지 못했어요.",
          empty: "파일이 비어 있거나 머리글 아래에 행이 없어요.",
          unreadable: "파일을 읽지 못했어요. Excel 파일이라면 .xlsx로 다시 저장해 주세요.",
          failed: "이 파일을 변환하지 못했어요. 다시 시도하거나 샘플 파일로 해 보세요.",
        },
        how: {
          heading: "작동 방식",
          steps: [
            { title: "파일 올리기", body: "쉼표나 세미콜론으로 구분된 CSV 또는 Excel 파일." },
            { title: "열과 형식 고르기", body: "숫자처럼 보이는 열은 미리 체크해 둬요. 소수점이 쉼표인지 마침표인지, 어떤 형식을 원하는지 알려 주세요." },
            { title: "확인하고 다운로드", body: "바뀐 셀이 강조 표시돼요. 무료 계정이 있으면 Excel이나 CSV로 가져갈 수 있어요." },
          ],
        },
        faqs: [
          { q: "Excel에서 숫자가 왜 합산되지 않나요?", a: "숫자를 텍스트로 읽기 때문이에요. 소수점을 다르게 쓰는 시스템이나 나라에서 온 파일일 때 생겨요. 1,234.56으로 설정된 Excel에 1.234,56이 들어 있거나 그 반대인 경우죠. 한 가지 형식으로 통일하면 다시 숫자가 돼요." },
          { q: "소수점이 쉼표인지 마침표인지 어떻게 아나요?", a: "값을 보고 추정해요. 1.234,56이 있으면 소수점은 쉼표예요. 1.234처럼 단독으로는 구분할 수 없을 때는 직접 골라요. 이 선택에 따라 모든 숫자를 읽는 방식이 정해져요." },
          { q: "어떤 형식을 골라야 하나요?", a: "천 단위 구분 기호가 없는 1234.56은 모든 시스템, 수식, 가져오기 기능이 문제없이 읽는 형식이에요. 1,234.56과 1.234,56은 나라에 따라 사람에게 보여 줄 파일에 써요." },
          { q: "숫자가 아닌 셀은 어떻게 되나요?", a: "그대로 남아요. 백분율(15%), 텍스트(N/A), 빈 셀은 건드리지 않고, 확실히 숫자인 것만 바뀌어요." },
          { q: "어떤 형식을 지원하나요?", a: "쉼표, 세미콜론, 탭으로 구분된 CSV와 Excel .xlsx를 최대 4MB, 500행까지 받아요. 오래된 Excel 파일(.xls)은 .xlsx로 저장해 주세요." },
          { q: "제 파일은 어떻게 되나요?", a: "이 변환에만 쓰이고, 24시간 후 결과와 함께 삭제돼요. 결과는 내 브라우저에서만 볼 수 있어요." },
          { q: "이 작업을 자동으로 하려면요?", a: "Tavnit에서는 같은 규칙이 Cleaner예요. 추출하는 모든 문서나 이메일, API로 들어오는 모든 파일에 날짜, 통화, 검증과 함께 알아서 실행돼요." },
        ],
        clean: {
          setup: {
            heading: "열과 형식을 고르세요",
            fileSummary: "{rows} · {cols}",
            columnsLabel: "숫자가 든 열",
            columnsHint: "최대 {max}개. 숫자처럼 보이는 열을 미리 체크해 뒀어요.",
            tooMany: "한 번에 최대 {max}개 열까지 고를 수 있어요.",
            inputLabel: "내 파일의 소수점 기호",
            inputOptions: { comma: "쉼표 · 1.234,56", dot: "마침표 · 1,234.56" },
            outputLabel: "원하는 숫자 형식",
            outputOptions: { plain: "1234.56 · 수식과 시스템용", us: "1,234.56", latam: "1.234,56" },
            preview: "처음 몇 행",
            run: "변환하기",
            change: "파일 바꾸기",
          },
          stages: ["파일 업로드 중", "열 읽는 중", "숫자 변환 중", "파일 만드는 중"],
          heading: "완료: {file}",
          summary: "{cols}에서 {cells} 변경",
          cellWord: ["셀", "셀"],
          columnWord: ["열", "열"],
          unchanged: "바꿀 셀이 없었어요. 이미 그 형식이었어요.",
          highlight: "바뀐 셀은 파란색으로 표시돼요.",
          shown: "전체 {total}행 중 {shown}행을 보여 드려요. 다운로드에는 모두 담겨요.",
          download: "다운로드",
          downloadXlsx: "Excel (.xlsx)",
          downloadCsv: "CSV (.csv)",
          another: "다른 파일 변환하기",
          automate: {
            heading: "모든 파일에 자동으로",
            body: "Tavnit에서는 이 규칙이 Cleaner예요. 한 번 설정하면 추출하는 모든 인보이스나 이메일, API로 들어오는 모든 파일에 날짜, 통화, 검증과 함께 알아서 실행돼요.",
            cta: "무료 계정 만들기",
            docs: "Cleaner란?",
          },
        },
      },
    },
    /**
     * Date format. A spreadsheet in, the chosen date columns out in one format.
     * Numeric dates are read with the visitor's day/month order; dates written in
     * words go through the Cleaner's AI conversion.
     */
    "date-format": {
      vocab: {
        doc: "스프레드시트",
        docs: "스프레드시트",
        a_doc: "스프레드시트",
        the_doc: "스프레드시트",
        the_docs: "스프레드시트",
        your_doc: "스프레드시트",
        your_docs: "스프레드시트",
        all_your_docs: "모든 스프레드시트",
        all_docs: "모든 스프레드시트",
        each_doc: "스프레드시트마다",
        another_doc: "다른 스프레드시트",
        this_doc: "이 스프레드시트",
      },
      overrides: {
        title: "Excel·CSV 날짜 형식 무료 변환",
        description:
          "뒤섞인 날짜(03/04/2024, March 12 2024, 2024-03-12)가 담긴 Excel 또는 CSV 파일을 올리면 모두 한 가지 형식으로 통일해 돌려드려요. 열과 형식은 직접 골라요. 무료, 결과 확인에 가입 불필요.",
        label: "날짜 형식 변환",
        h1: "스프레드시트의 모든 날짜를 한 가지 형식으로",
        intro:
          "Excel이나 CSV 파일을 올리세요. 날짜가 든 열과 원하는 형식(2024-03-12, 12/03/2024, 03/12/2024)을 고르면, Tavnit이 글자로 쓴 날짜까지 모두 변환해 같은 열 그대로 파일을 돌려드려요.",
        trust: ["CSV 또는 Excel · 최대 500행", "하루 {limit}개 파일 무료", "24시간 후 모두 삭제"],
        drop: {
          title: "Excel이나 CSV 파일을 여기에 놓으세요",
          hint: "또는 컴퓨터에서 파일을 선택하세요",
          choose: "파일 선택",
          sample: "샘플 파일로 체험하기",
          formats: "CSV 또는 .xlsx · 최대 4MB, 500행",
        },
        errors: {
          unsupported: "CSV나 Excel(.xlsx) 파일만 받을 수 있어요.",
          xls: "오래된 Excel 파일(.xls)이에요. Excel에서 열어 .xlsx나 .csv로 저장해 주세요.",
          too_many_rows: "무료 버전은 최대 500행까지 처리해요. 파일의 일부만 올려 주세요.",
          too_many_columns: "한 번에 최대 10개 열까지 고를 수 있어요.",
          no_columns: "열을 하나 이상 골라 주세요.",
          nothing_to_clean: "선택한 열에서 변환할 날짜를 찾지 못했어요.",
          empty: "파일이 비어 있거나 머리글 아래에 행이 없어요.",
          unreadable: "파일을 읽지 못했어요. Excel 파일이라면 .xlsx로 다시 저장해 주세요.",
          failed: "이 파일을 변환하지 못했어요. 다시 시도하거나 샘플 파일로 해 보세요.",
        },
        how: {
          heading: "작동 방식",
          steps: [
            { title: "파일 올리기", body: "날짜가 슬래시, 하이픈, 마침표, 글자 등 어떤 방식으로 적혀 있든 CSV나 Excel 파일이면 돼요." },
            { title: "열과 형식 고르기", body: "날짜처럼 보이는 열은 미리 체크해 둬요. 파일에서 일이 먼저인지 월이 먼저인지, 어떤 형식을 원하는지 알려 주세요." },
            { title: "확인하고 다운로드", body: "바뀐 셀이 강조 표시돼요. 무료 계정이 있으면 Excel이나 CSV로 가져갈 수 있어요." },
          ],
        },
        faqs: [
          { q: "03/04/2024가 4월 3일인지 3월 4일인지 어떻게 아나요?", a: "날짜 하나만으로는 알 수 없어요. 그래서 파일에서 일이 먼저인지 월이 먼저인지 물어보고, 열에 15/04/2024처럼 한 가지로만 읽히는 날짜가 있으면 답을 제안해 드려요." },
          { q: "글자로 쓴 날짜도 알아듣나요?", a: "네. “March 5th 2024”, “12 de marzo de 2024”, “1 Apr 2024” 같은 날짜는 AI로 읽어요. Excel 수식으로는 할 수 없는 일이죠. 숫자로 된 날짜는 AI 없이 규칙으로 읽어요." },
          { q: "어떤 형식을 골라야 하나요?", a: "2024-03-12(연, 월, 일)는 모든 시스템이 헷갈림 없이 읽고 정렬도 올바르게 되는 형식이에요. 03/12/2024는 미국식이고, 12/03/2024는 유럽과 중남미에서 흔히 써요." },
          { q: "날짜가 아닌 셀은 어떻게 되나요?", a: "빈 셀처럼 그대로 남아요. 날짜를 확신을 갖고 읽을 수 없으면 추측하지 않고 원래대로 둬요." },
          { q: "Excel 파일에 이미 날짜로 저장돼 있으면요?", a: "다시 읽지 않고 그대로 받아서 형식만 바꿔요." },
          { q: "제 파일은 어떻게 되나요?", a: "이 변환에만 쓰이고, 24시간 후 결과와 함께 삭제돼요. 결과는 내 브라우저에서만 볼 수 있어요." },
          { q: "이 작업을 자동으로 하려면요?", a: "Tavnit에서는 같은 규칙이 Cleaner예요. 추출하는 모든 문서나 이메일, API로 들어오는 모든 파일에 숫자, 통화, 검증과 함께 알아서 실행돼요." },
        ],
        clean: {
          setup: {
            heading: "열과 형식을 고르세요",
            fileSummary: "{rows} · {cols}",
            columnsLabel: "날짜가 든 열",
            columnsHint: "최대 {max}개. 날짜처럼 보이는 열을 미리 체크해 뒀어요.",
            tooMany: "한 번에 최대 {max}개 열까지 고를 수 있어요.",
            inputLabel: "내 파일의 숫자 날짜에서 먼저 오는 것",
            inputOptions: { dmy: "일 · 31/12/2024", mdy: "월 · 12/31/2024" },
            outputLabel: "원하는 날짜 형식",
            outputOptions: { iso: "2024-03-12 · 연, 월, 일", dmy: "12/03/2024 · 일, 월, 연", mdy: "03/12/2024 · 월, 일, 연" },
            preview: "처음 몇 행",
            run: "변환하기",
            change: "파일 바꾸기",
          },
          stages: ["파일 업로드 중", "열 읽는 중", "날짜 변환 중", "글자로 쓴 날짜 읽는 중", "파일 만드는 중"],
          heading: "완료: {file}",
          summary: "{cols}에서 {cells} 변경",
          cellWord: ["셀", "셀"],
          columnWord: ["열", "열"],
          unchanged: "바꿀 셀이 없었어요. 이미 그 형식이었어요.",
          highlight: "바뀐 셀은 파란색으로 표시돼요.",
          shown: "전체 {total}행 중 {shown}행을 보여 드려요. 다운로드에는 모두 담겨요.",
          download: "다운로드",
          downloadXlsx: "Excel (.xlsx)",
          downloadCsv: "CSV (.csv)",
          another: "다른 파일 변환하기",
          automate: {
            heading: "모든 파일에 자동으로",
            body: "Tavnit에서는 이 규칙이 Cleaner예요. 한 번 설정하면 들어오는 모든 인보이스, 계약서, 파일에 숫자, 통화, 검증과 함께 알아서 실행돼요.",
            cta: "무료 계정 만들기",
            docs: "Cleaner란?",
          },
        },
      },
    },
    /**
     * Currency converter. A spreadsheet in, a converted column next to each
     * amount column out, at the day's reference rate (European Central Bank,
     * through Frankfurter).
     */
    "currency-converter": {
      vocab: {
        doc: "스프레드시트",
        docs: "스프레드시트",
        a_doc: "스프레드시트",
        the_doc: "스프레드시트",
        the_docs: "스프레드시트",
        your_doc: "스프레드시트",
        your_docs: "스프레드시트",
        all_your_docs: "모든 스프레드시트",
        all_docs: "모든 스프레드시트",
        each_doc: "스프레드시트마다",
        another_doc: "다른 스프레드시트",
        this_doc: "이 스프레드시트",
      },
      overrides: {
        title: "Excel 통화 환산, 오늘 환율로 무료",
        description:
          "가격이나 금액이 담긴 Excel 또는 CSV 파일을 올리면 열마다 달러, 유로, 파운드 등 30개 통화 중 원하는 통화로 당일 기준 환율에 따라 환산해 드려요. 무료, 결과 확인에 가입 불필요.",
        label: "통화 환산",
        h1: "스프레드시트의 금액을 다른 통화로 환산하세요",
        intro:
          "Excel이나 CSV 파일을 올리세요. 금액 열, 현재 통화, 원하는 통화를 고르면 Tavnit이 당일 환율로 환산한 열을 각 열 옆에 추가해 파일 전체를 돌려드려요.",
        trust: ["CSV 또는 Excel · 최대 500행", "하루 {limit}개 파일 무료", "24시간 후 모두 삭제"],
        drop: {
          title: "Excel이나 CSV 파일을 여기에 놓으세요",
          hint: "또는 컴퓨터에서 파일을 선택하세요",
          choose: "파일 선택",
          sample: "샘플 파일로 체험하기",
          formats: "CSV 또는 .xlsx · 최대 4MB, 500행",
        },
        errors: {
          unsupported: "CSV나 Excel(.xlsx) 파일만 받을 수 있어요.",
          xls: "오래된 Excel 파일(.xls)이에요. Excel에서 열어 .xlsx나 .csv로 저장해 주세요.",
          too_many_rows: "무료 버전은 최대 500행까지 처리해요. 파일의 일부만 올려 주세요.",
          too_many_columns: "한 번에 최대 10개 열까지 고를 수 있어요.",
          no_columns: "열을 하나 이상 골라 주세요.",
          nothing_to_clean: "선택한 열에서 환산할 금액을 찾지 못했어요.",
          empty: "파일이 비어 있거나 머리글 아래에 행이 없어요.",
          unreadable: "파일을 읽지 못했어요. Excel 파일이라면 .xlsx로 다시 저장해 주세요.",
          failed: "이 파일을 환산하지 못했어요. 다시 시도하거나 샘플 파일로 해 보세요.",
        },
        how: {
          heading: "작동 방식",
          steps: [
            { title: "파일 올리기", body: "가격, 합계 등 금액 열이 있는 CSV나 Excel 파일." },
            { title: "통화 고르기", body: "금액처럼 보이는 열은 미리 체크해 둬요. 어떤 통화인지, 소수점을 어떻게 쓰는지, 어떤 통화로 바꿀지 알려 주세요." },
            { title: "확인하고 다운로드", body: "환산된 열이 원래 열 바로 옆에 붙어요. 무료 계정이 있으면 Excel이나 CSV로 가져갈 수 있어요." },
          ],
        },
        faqs: [
          { q: "어떤 환율을 쓰나요?", a: "유럽중앙은행이 발표하는 당일 기준 환율이에요. 파일 전체에 같은 환율이 적용되며, 은행의 매입·매도 환율이 아닌 참고용 환율이에요." },
          { q: "어떤 통화를 환산할 수 있나요?", a: "미국 달러(USD), 유로(EUR), 파운드(GBP), 멕시코 페소(MXN), 헤알(BRL), 위안(CNY), 캐나다 달러, 엔, 스위스 프랑 등 유럽중앙은행이 발표하는 통화 총 30개예요. 이 중 어느 통화에서 어느 통화로든 환산할 수 있어요." },
          { q: "콜롬비아 페소, 솔, 칠레 페소, 발보아도 되나요?", a: "아직은 안 돼요. 이 통화들은 유럽중앙은행 환율에 없어요. 발보아가 달러와 1:1로 고정된 파나마에서는 USD를 고르면 돼요." },
          { q: "원래 열은 어떻게 되나요?", a: "그대로 남아요. 환산 결과는 “Price (USD)”처럼 바로 옆에 새 열로 추가되어 비교할 수 있어요." },
          { q: "금액이 아닌 셀은 어떻게 되나요?", a: "환산된 열에서 비어 있어요. 텍스트, 백분율, 빈 셀은 환산하지 않아요." },
          { q: "제 파일은 어떻게 되나요?", a: "이 환산에만 쓰이고, 24시간 후 결과와 함께 삭제돼요. 결과는 내 브라우저에서만 볼 수 있어요." },
          { q: "이 작업을 자동으로 하려면요?", a: "Tavnit에서는 통화 환산이 Cleaner예요. 추출하는 모든 인보이스나 이메일, API로 들어오는 모든 파일에 날짜, 숫자, 검증과 함께 알아서 실행돼요." },
        ],
        clean: {
          setup: {
            heading: "열과 통화를 고르세요",
            fileSummary: "{rows} · {cols}",
            columnsLabel: "금액이 든 열",
            columnsHint: "최대 {max}개. 금액처럼 보이는 열을 미리 체크해 뒀어요.",
            tooMany: "한 번에 최대 {max}개 열까지 고를 수 있어요.",
            sourceLabel: "현재 금액의 통화",
            sourceHint: "유럽중앙은행 환율이 있는 통화예요.",
            inputLabel: "소수점 기호",
            inputOptions: { comma: "쉼표 · 1.234,56", dot: "마침표 · 1,234.56" },
            outputPopular: "자주 쓰는 통화",
            outputAll: "모든 통화",
            outputLabel: "환산할 통화",
            outputOptions: {},
            preview: "처음 몇 행",
            run: "환산하기",
            change: "파일 바꾸기",
          },
          stages: ["파일 업로드 중", "금액 읽는 중", "당일 환율 가져오는 중", "환산 중", "파일 만드는 중"],
          heading: "완료: {file}",
          summary: "{cols}에서 {cells} 환산",
          cellWord: ["셀", "셀"],
          columnWord: ["열", "열"],
          unchanged: "선택한 열에서 환산할 금액을 찾지 못했어요.",
          highlight: "환산된 열은 파란색으로 표시돼요.",
          shown: "전체 {total}행 중 {shown}행을 보여 드려요. 다운로드에는 모두 담겨요.",
          download: "다운로드",
          downloadXlsx: "Excel (.xlsx)",
          downloadCsv: "CSV (.csv)",
          another: "다른 파일 환산하기",
          automate: {
            heading: "모든 인보이스에 자동으로",
            body: "Tavnit에서는 통화 환산이 Cleaner예요. 한 번 설정하면 다른 통화로 된 인보이스나 견적서가 날짜, 숫자, 검증과 함께 환산된 채로 들어와요.",
            cta: "무료 계정 만들기",
            docs: "Cleaner란?",
          },
        },
      },
    },
    /**
     * Translate columns. A spreadsheet in, a translated column next to each
     * chosen text column out. Every cell goes through a model, so the free
     * allowance is 200 rows instead of 500.
     */
    "translate-columns": {
      vocab: {
        doc: "스프레드시트",
        docs: "스프레드시트",
        a_doc: "스프레드시트",
        the_doc: "스프레드시트",
        the_docs: "스프레드시트",
        your_doc: "스프레드시트",
        your_docs: "스프레드시트",
        all_your_docs: "모든 스프레드시트",
        all_docs: "모든 스프레드시트",
        each_doc: "스프레드시트마다",
        another_doc: "다른 스프레드시트",
        this_doc: "이 스프레드시트",
      },
      overrides: {
        title: "Excel 열 무료 번역",
        description:
          "Excel 또는 CSV 파일을 올리고 고른 열을 영어, 스페인어, 포르투갈어, 중국어 등 40개 이상의 언어로 번역하세요. 번역은 각 열 옆에 추가돼요. 무료, 결과 확인에 가입 불필요.",
        label: "열 번역",
        h1: "스프레드시트의 열을 번역하세요",
        intro:
          "Excel이나 CSV 파일을 올리세요. 번역할 열과 언어를 고르면 Tavnit이 원문 언어를 감지해 각 열 옆에 번역을 추가하고, 나머지는 그대로 둬요.",
        trust: ["CSV 또는 Excel · 최대 200행", "하루 {limit}개 파일 무료", "24시간 후 모두 삭제"],
        drop: {
          title: "Excel이나 CSV 파일을 여기에 놓으세요",
          hint: "또는 컴퓨터에서 파일을 선택하세요",
          choose: "파일 선택",
          sample: "샘플 파일로 체험하기",
          formats: "CSV 또는 .xlsx · 최대 4MB, 200행",
        },
        errors: {
          unsupported: "CSV나 Excel(.xlsx) 파일만 받을 수 있어요.",
          xls: "오래된 Excel 파일(.xls)이에요. Excel에서 열어 .xlsx나 .csv로 저장해 주세요.",
          too_many_rows: "무료 번역은 최대 200행까지 처리해요. 파일의 일부만 올려 주세요.",
          too_many_columns: "한 번에 최대 10개 열까지 고를 수 있어요.",
          no_columns: "열을 하나 이상 골라 주세요.",
          nothing_to_clean: "선택한 열에서 번역할 텍스트를 찾지 못했어요.",
          empty: "파일이 비어 있거나 머리글 아래에 행이 없어요.",
          unreadable: "파일을 읽지 못했어요. Excel 파일이라면 .xlsx로 다시 저장해 주세요.",
          failed: "이 파일을 번역하지 못했어요. 다시 시도하거나 샘플 파일로 해 보세요.",
        },
        how: {
          heading: "작동 방식",
          steps: [
            { title: "파일 올리기", body: "설명, 지침, 메모 등 텍스트 열이 있는 CSV나 Excel 파일." },
            { title: "열과 언어 고르기", body: "텍스트가 든 열은 미리 체크해 둬요. 언어만 고르세요. 원문 언어는 알아서 감지해요." },
            { title: "확인하고 다운로드", body: "번역이 원래 열 바로 옆에 붙어요. 무료 계정이 있으면 Excel이나 CSV로 가져갈 수 있어요." },
          ],
        },
        faqs: [
          { q: "어떤 언어를 고를 수 있나요?", a: "40개 이상이에요: 영어, 스페인어, 포르투갈어, 프랑스어, 독일어, 중국어, 이탈리아어, 일본어, 한국어, 아랍어, 러시아어, 힌디어, 튀르키예어, 베트남어 등. 원문 언어는 셀마다 감지하므로 파일에 여러 언어가 섞여 있어도 괜찮아요." },
          { q: "코드, 숫자, 고유 명사는 어떻게 되나요?", a: "그대로 유지돼요. 번역은 서식, 단위, 코드를 존중하고, 이미 목표 언어로 된 셀은 그대로 둬요." },
          { q: "왜 200행이 한도인가요?", a: "모든 셀을 언어 모델로 번역하기 때문이에요. 무료 버전은 파일당 최대 200행까지 처리하고, 계정에는 이런 한도가 없어요." },
          { q: "원래 열은 어떻게 되나요?", a: "그대로 남아요. 번역은 “Description (ES)”처럼 바로 옆에 새 열로 추가돼요." },
          { q: "통관용 품명 번역에도 쓸 수 있나요?", a: "네, 흔한 사용 사례예요. 물품을 분류하기 전에 상업 송장이나 패킹 리스트의 품명을 영어나 스페인어로 옮길 때 써요." },
          { q: "제 파일은 어떻게 되나요?", a: "이 번역에만 쓰이고, 24시간 후 결과와 함께 삭제돼요. 결과는 내 브라우저에서만 볼 수 있어요." },
          { q: "이 작업을 자동으로 하려면요?", a: "Tavnit에서는 번역이 Cleaner예요. 추출하는 모든 문서나 이메일, API로 들어오는 모든 파일에 날짜, 숫자, 통화와 함께 알아서 실행돼요." },
        ],
        clean: {
          setup: {
            heading: "열과 언어를 고르세요",
            fileSummary: "{rows} · {cols}",
            columnsLabel: "텍스트가 든 열",
            columnsHint: "최대 {max}개. 텍스트가 든 열을 미리 체크해 뒀어요.",
            tooMany: "한 번에 최대 {max}개 열까지 고를 수 있어요.",
            inputLabel: "",
            inputOptions: {},
            outputPopular: "자주 쓰는 언어",
            outputAll: "모든 언어",
            outputLabel: "번역할 언어",
            outputOptions: {},
            preview: "처음 몇 행",
            run: "번역하기",
            change: "파일 바꾸기",
          },
          stages: ["파일 업로드 중", "열 읽는 중", "언어 감지 중", "번역 중", "파일 만드는 중"],
          heading: "완료: {file}",
          summary: "{cols}에서 {cells} 번역",
          cellWord: ["셀", "셀"],
          columnWord: ["열", "열"],
          unchanged: "선택한 열에서 번역할 텍스트를 찾지 못했어요.",
          highlight: "번역된 열은 파란색으로 표시돼요.",
          shown: "전체 {total}행 중 {shown}행을 보여 드려요. 다운로드에는 모두 담겨요.",
          download: "다운로드",
          downloadXlsx: "Excel (.xlsx)",
          downloadCsv: "CSV (.csv)",
          another: "다른 파일 번역하기",
          automate: {
            heading: "모든 문서에 자동으로",
            body: "Tavnit에서는 번역이 Cleaner예요. 한 번 설정하면 들어오는 모든 인보이스, 패킹 리스트, 파일의 품명이 이미 번역된 채로 들어와요.",
            cta: "무료 계정 만들기",
            docs: "Cleaner란?",
          },
        },
      },
    },
  },

  og: {
    "invoice-to-excel": "무료. 템플릿 없이. 인보이스 품목을 스프레드시트로.",
    "invoice-line-items": "무료. 품목마다 한 행, 모든 행에 헤더. 템플릿 없이.",
    "po-invoice-check": "무료. 발주서의 모든 줄을 인보이스와 대조: 가격, 수량, 누락, 추가.",
    "split-scanned-pdf": "무료. 스캔 하나를 넣으면 문서별로 분류해 나눠 드려요.",
    "packing-list-to-excel": "무료. 템플릿 없이. 패킹 리스트의 모든 줄을 스프레드시트로.",
    "bill-of-lading-to-excel": "무료. 템플릿 없이. 당사자, 선박, 항구, 컨테이너마다 한 행.",
    "quote-comparison": "무료. 견적서 두세 장을 표 하나로, 줄별 최저가 표시.",
    "contract-dates": "무료. 당사자, 계약 기간, 자동 갱신, 통지 마감일을 한 행으로.",
    "receipt-to-excel": "무료. 영수증을 찍으면 품목이 스프레드시트로.",
    "number-format": "무료. 어떤 숫자 열이든 한 형식으로: 1234.56, 1,234.56, 1.234,56.",
    "date-format": "무료. 뒤섞인 날짜를 한 형식으로, 글자로 쓴 날짜까지.",
    "currency-converter": "무료. 어떤 가격 열이든 당일 기준 환율로 환산.",
    "translate-columns": "무료. 어떤 텍스트 열이든 40개 이상의 언어로 번역.",
  },
};

export default copy;
