import type { DocsNavCopy } from "../types";

/**
 * Turkish docs: sidebar, chrome and page titles. Product nouns stay English as
 * in the rest of the site, with Turkish suffixes after an apostrophe (Flow'lar,
 * Cleaner'lar, Bucket'lar…); UI labels follow the app's Turkish dictionary
 * (tavnit-nextjs src/lib/i18n/translations.tr.ts), e.g. "İnsan incelemesi
 * (HITL)" for the Human in the Loop page.
 */
const tr: DocsNavCopy = {
  docsName: "Dokümantasyon",
  home: "Ana sayfa",
  description:
    "Tavnit dokümantasyonu: yapay zekâ destekli belge verisi çıkarma, insan incelemesi, yapay zekâ asistanları için MCP bağlayıcısı, REST API, e-posta tetikleyicileri ve daha fazlası.",
  chrome: {
    back: "Ana sayfaya dön",
    toggle: "Menüyü aç veya kapat",
    goHome: "Ana sayfaya git",
    contents: "İçindekiler",
    close: "Menüyü kapat",
    nav: "Dokümantasyon",
    languages: "Bu sayfayı başka bir dilde okuyun",
    englishOnly: "Yalnızca İngilizce",
    copy: "Kopyala",
    copied: "Kopyalandı!",
    related: "İlgili dokümantasyon",
    keepReading: "Okumaya devam edin",
  },
  groupLabels: {
    start: "Başlarken",
    orchestration: "Orkestrasyon",
    input: "Girdi",
    processing: "İşleme",
    intelligence: "Zekâ",
    verticals: "Ses ve sosyal medya",
    data: "Veri ve inceleme",
    integrate: "Entegrasyonlar",
    organization: "Organizasyon",
  },
  labels: {
    "getting-started": "Başlarken",
    pipelines: "Pipeline'lar",
    "pipeline-map": "Pipeline Haritası",
    collections: "Collection'lar",
    subjects: "Subject'ler",
    splitters: "Splitter'lar",
    flows: "Flow'lar",
    cleaners: "Cleaner'lar",
    agents: "Agent'lar",
    matchers: "Matcher'lar",
    inspectors: "Inspector'lar",
    fillers: "Filler'lar",
    signals: "Signal'lar",
    nets: "Net'ler",
    buckets: "Bucket'lar",
    "human-in-the-loop": "İnsan incelemesi (HITL)",
    "email-integration": "E-posta entegrasyonu",
    "api-integration": "API entegrasyonu",
    webhooks: "Webhook'lar",
    "mcp-connector": "MCP bağlayıcısı",
    "user-roles": "Kullanıcı rolleri",
  },
  pages: {
    "getting-started": {
      heading: "Başlarken",
      title: "Tavnit dokümantasyonu: yapay zekâ ile belge verisi çıkarma",
      description:
        "Tavnit'te ilk Flow'unuzu kurun: alanları tanımlayın, bir belge yükleyin, yapılandırılmış verileri alın. Şablon çizmeden ve kod yazmadan.",
    },
    flows: {
      heading: "Flow'lar",
      title: "Flow'lar: Tavnit'in her belgeden ne çıkaracağını belirleyin",
      description:
        "Bir Flow'un veri şeması: meta veri ve tablo alanları, veri türleri, yapay zekâ için çıkarma ipuçları, bileşik ve çok değerli alanlar.",
    },
    "api-integration": {
      heading: "API entegrasyonu",
      title: "Belge verisi çıkarma REST API'si: Python, JS ve kodsuz",
      description:
        "Tavnit REST API başvurusu: Flow, Collection, Splitter, Cleaner, Bucket, Agent, Pipeline ve daha fazlası için tüm uç noktalar, kodsuz tariflerle birlikte.",
    },
    "email-integration": {
      heading: "E-posta entegrasyonu",
      title: "E-posta eklerinden verileri otomatik olarak çıkarın",
      description:
        "Belgeleri bir Flow'un, Collection'ın veya Splitter'ın adresine iletin; her ekten veriler otomatik olarak çıkarılsın.",
    },
    "mcp-connector": {
      heading: "MCP bağlayıcısı",
      title: "MCP bağlayıcısı: Tavnit'i Claude ve Cursor'a bağlayın",
      description:
        "Adım adım: bağlayıcı URL'si oluşturun, claude.ai veya Cursor'a ekleyin, süresi dolmadan yenileyin ve sık karşılaşılan hataları giderin.",
    },
    "human-in-the-loop": {
      heading: "İnsan incelemesi (Human in the Loop)",
      title: "İnsan incelemesi: yalnızca eklemeli denetim iziyle",
      description:
        "Bir Flow'u teslimattan önce incelemeye alın: her Run'da veya yalnızca işaretlenenlerde. İnceleyici atayın, düzenleyin, onaylayın ya da reddedin.",
    },
  },
};

export default tr;
