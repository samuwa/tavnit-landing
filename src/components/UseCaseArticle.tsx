import Link from "next/link";
import { ArrowRight, Check, TriangleAlert } from "lucide-react";
import type { UseCase } from "@/lib/use-cases";
import type { Locale } from "@/lib/locales";
import { localizedPath } from "@/lib/routes";
import { toolsForUseCase } from "@/lib/lite/related";
import { APP_URL } from "@/lib/site";
import SectionEyebrow from "@/components/SectionEyebrow";

/**
 * Body of a use-case page, shared by /use-cases/[slug] and the Spanish
 * routes. The data (`fields`, `gotchas`, FAQs) is what makes each page
 * specific; the chrome around it is the same in both languages, so it lives
 * once here and the two routes only differ in metadata, schema and which
 * data file they read.
 *
 * The CTA differs by market on purpose. English pages lead with self-serve
 * ("Start free"); Spanish pages lead with the demo, because Panama and
 * Latin America are sold through a demo and self-serve checkout is closed.
 * The other languages follow English. Site links in English and new-language
 * data are localised with localizedPath() (the docs stay English until they
 * are translated); Spanish data already holds its Spanish paths, verbatim.
 */

type ArticleCopy = {
  home: string;
  hub: string;
  /** Inline link to the English page (Spanish only; the switcher covers the rest). */
  readOther: string | null;
  primaryCta: string;
  /** Spanish leads with the demo; everyone else with self-serve. */
  leadWithDemo: boolean;
  seePricing: string;
  bookDemo: string;
  painful: string;
  extract: string;
  field: string;
  care: string;
  hard: (label: string) => string;
  pipeline: string;
  docsNote: string | null;
  faq: string;
  others: string;
  finalTitle: string;
  finalBody: (label: string) => string;
  finalCta: string;
  breadcrumbAria: string;
};

const COPY: Record<Locale, ArticleCopy> = {
  en: {
    home: "Home",
    hub: "Use Cases",
    readOther: null,
    primaryCta: "Start free",
    leadWithDemo: false,
    seePricing: "See pricing",
    bookDemo: "Book a demo",
    painful: "Why this is painful",
    extract: "What to extract",
    field: "Field",
    care: "Why it needs care",
    hard: (label: string) => `What makes ${label.toLowerCase()} hard`,
    pipeline: "How the pipeline handles it",
    docsNote: null,
    faq: "Common questions",
    others: "Other document types",
    finalTitle: "Try it on one document",
    finalBody: (label: string) =>
      `Build a flow, send a real ${label.toLowerCase().replace(/s$/, "")} through it, and see what comes back. Free credits to start.`,
    finalCta: "Start free",
    breadcrumbAria: "Breadcrumb",
  },
  es: {
    home: "Inicio",
    hub: "Casos de uso",
    readOther: "Read in English",
    primaryCta: "Agendar una demostración",
    leadWithDemo: true,
    seePricing: "Ver precios",
    bookDemo: "Probar gratis",
    painful: "Por qué duele",
    extract: "Qué se extrae",
    field: "Campo",
    care: "Por qué requiere cuidado",
    hard: () => "Dónde se complica",
    pipeline: "Cómo lo resuelve el proceso",
    docsNote: "La documentación técnica enlazada está en inglés.",
    faq: "Preguntas frecuentes",
    others: "Otros tipos de documento",
    finalTitle: "Pruébalo con uno de tus documentos",
    finalBody: () =>
      "Trae un documento real. En la demostración armamos tu primer Flow y ves los datos salir en vivo, con tus propios archivos.",
    finalCta: "Agendar una demostración",
    breadcrumbAria: "Ruta de navegación",
  },
  "pt-BR": {
    home: "Início",
    hub: "Casos de uso",
    readOther: null,
    primaryCta: "Começar grátis",
    leadWithDemo: false,
    seePricing: "Ver preços",
    bookDemo: "Agendar demo",
    painful: "Por que isso dói",
    extract: "O que extrair",
    field: "Campo",
    care: "Por que exige cuidado",
    hard: () => "Onde complica",
    pipeline: "Como o pipeline resolve",
    docsNote: "A documentação técnica vinculada está em inglês.",
    faq: "Perguntas frequentes",
    others: "Outros tipos de documento",
    finalTitle: "Teste com um documento",
    finalBody: () => "Crie um flow, envie um documento real por ele e veja o que volta. Créditos grátis para começar.",
    finalCta: "Começar grátis",
    breadcrumbAria: "Navegação estrutural",
  },
  fr: {
    home: "Accueil",
    hub: "Cas d’usage",
    readOther: null,
    primaryCta: "Commencer gratuitement",
    leadWithDemo: false,
    seePricing: "Voir les tarifs",
    bookDemo: "Réserver une démo",
    painful: "Pourquoi c’est pénible",
    extract: "Quoi extraire",
    field: "Champ",
    care: "Pourquoi il faut y faire attention",
    hard: () => "Ce qui complique les choses",
    pipeline: "Comment le pipeline s’en charge",
    docsNote: "La documentation technique liée est en anglais.",
    faq: "Questions fréquentes",
    others: "Autres types de documents",
    finalTitle: "Essayez sur un document",
    finalBody: () => "Créez un flow, envoyez-y un vrai document et voyez ce qui en ressort. Crédits gratuits pour commencer.",
    finalCta: "Commencer gratuitement",
    breadcrumbAria: "Fil d’Ariane",
  },
  de: {
    home: "Startseite",
    hub: "Anwendungsfälle",
    readOther: null,
    primaryCta: "Kostenlos starten",
    leadWithDemo: false,
    seePricing: "Preise ansehen",
    bookDemo: "Demo buchen",
    painful: "Warum das mühsam ist",
    extract: "Was extrahiert wird",
    field: "Feld",
    care: "Worauf zu achten ist",
    hard: () => "Wo es schwierig wird",
    pipeline: "Wie die Pipeline damit umgeht",
    docsNote: "Die verlinkte technische Dokumentation ist auf Englisch.",
    faq: "Häufige Fragen",
    others: "Weitere Dokumenttypen",
    finalTitle: "Probieren Sie es mit einem Dokument",
    finalBody: () => "Erstellen Sie einen Flow, schicken Sie ein echtes Dokument hindurch und sehen Sie, was zurückkommt. Kostenlose Credits zum Start.",
    finalCta: "Kostenlos starten",
    breadcrumbAria: "Brotkrümelnavigation",
  },
  it: {
    home: "Home",
    hub: "Casi d’uso",
    readOther: null,
    primaryCta: "Inizia gratis",
    leadWithDemo: false,
    seePricing: "Vedi i prezzi",
    bookDemo: "Prenota una demo",
    painful: "Perché è un problema",
    extract: "Cosa estrarre",
    field: "Campo",
    care: "Perché richiede attenzione",
    hard: () => "Dove si complica",
    pipeline: "Come la pipeline lo gestisce",
    docsNote: "La documentazione tecnica collegata è in inglese.",
    faq: "Domande frequenti",
    others: "Altri tipi di documento",
    finalTitle: "Provalo su un documento",
    finalBody: () => "Crea un flow, inviaci un documento reale e guarda cosa ne esce. Crediti gratuiti per iniziare.",
    finalCta: "Inizia gratis",
    breadcrumbAria: "Percorso di navigazione",
  },
  nl: {
    home: "Home",
    hub: "Toepassingen",
    readOther: null,
    primaryCta: "Gratis beginnen",
    leadWithDemo: false,
    seePricing: "Prijzen bekijken",
    bookDemo: "Demo plannen",
    painful: "Waarom dit pijn doet",
    extract: "Wat je extraheert",
    field: "Veld",
    care: "Waarom het aandacht vraagt",
    hard: () => "Waar het lastig wordt",
    pipeline: "Hoe de pipeline het aanpakt",
    docsNote: "De gelinkte technische documentatie is in het Engels.",
    faq: "Veelgestelde vragen",
    others: "Andere documenttypen",
    finalTitle: "Probeer het met één document",
    finalBody: () => "Bouw een flow, stuur er een echt document doorheen en kijk wat er terugkomt. Gratis credits om te beginnen.",
    finalCta: "Gratis beginnen",
    breadcrumbAria: "Kruimelpad",
  },
  pl: {
    home: "Strona główna",
    hub: "Zastosowania",
    readOther: null,
    primaryCta: "Zacznij za darmo",
    leadWithDemo: false,
    seePricing: "Zobacz cennik",
    bookDemo: "Umów demo",
    painful: "Dlaczego to boli",
    extract: "Co wyodrębnić",
    field: "Pole",
    care: "Na co uważać",
    hard: () => "Gdzie robi się trudno",
    pipeline: "Jak radzi sobie z tym pipeline",
    docsNote: "Podlinkowana dokumentacja techniczna jest po angielsku.",
    faq: "Częste pytania",
    others: "Inne typy dokumentów",
    finalTitle: "Wypróbuj na jednym dokumencie",
    finalBody: () => "Zbuduj flow, prześlij przez niego prawdziwy dokument i zobacz, co wróci. Darmowe kredyty na start.",
    finalCta: "Zacznij za darmo",
    breadcrumbAria: "Ścieżka nawigacji",
  },
  tr: {
    home: "Ana sayfa",
    hub: "Kullanım alanları",
    readOther: null,
    primaryCta: "Ücretsiz başlayın",
    leadWithDemo: false,
    seePricing: "Fiyatları görün",
    bookDemo: "Demo planlayın",
    painful: "Neden zahmetli",
    extract: "Neler çıkarılır",
    field: "Alan",
    care: "Neden dikkat ister",
    hard: () => "İşin zorlaştığı yer",
    pipeline: "Pipeline bunu nasıl ele alır",
    docsNote: "Bağlantı verilen teknik dokümantasyon İngilizcedir.",
    faq: "Sık sorulan sorular",
    others: "Diğer belge türleri",
    finalTitle: "Tek bir belgeyle deneyin",
    finalBody: () => "Bir flow oluşturun, içinden gerçek bir belge geçirin ve ne döndüğünü görün. Başlamak için ücretsiz kredi.",
    finalCta: "Ücretsiz başlayın",
    breadcrumbAria: "İçerik yolu",
  },
  "zh-Hans": {
    home: "首页",
    hub: "应用场景",
    readOther: null,
    primaryCta: "免费开始",
    leadWithDemo: false,
    seePricing: "查看价格",
    bookDemo: "预约演示",
    painful: "痛点在哪里",
    extract: "提取哪些字段",
    field: "字段",
    care: "为什么需要注意",
    hard: () => "难点在哪里",
    pipeline: "流程如何处理",
    docsNote: "链接的技术文档为英文。",
    faq: "常见问题",
    others: "其他文档类型",
    finalTitle: "用一份文档试试",
    finalBody: () => "创建一个 flow，用真实文档跑一遍，看看结果如何。注册即送免费额度。",
    finalCta: "免费开始",
    breadcrumbAria: "面包屑导航",
  },
  ja: {
    home: "ホーム",
    hub: "活用事例",
    readOther: null,
    primaryCta: "無料で始める",
    leadWithDemo: false,
    seePricing: "料金を見る",
    bookDemo: "デモを予約",
    painful: "何が課題か",
    extract: "抽出する項目",
    field: "項目",
    care: "注意が必要な理由",
    hard: () => "難しいポイント",
    pipeline: "パイプラインでの対処",
    docsNote: "リンク先の技術ドキュメントは英語です。",
    faq: "よくある質問",
    others: "その他の文書タイプ",
    finalTitle: "まずは 1 件の文書で",
    finalBody: () => "Flow を作成し、実際の文書を処理して結果を確認しましょう。無料クレジット付きで始められます。",
    finalCta: "無料で始める",
    breadcrumbAria: "パンくずリスト",
  },
  ko: {
    home: "홈",
    hub: "활용 사례",
    readOther: null,
    primaryCta: "무료로 시작하기",
    leadWithDemo: false,
    seePricing: "요금 보기",
    bookDemo: "데모 예약",
    painful: "왜 번거로운가",
    extract: "추출할 항목",
    field: "항목",
    care: "주의가 필요한 이유",
    hard: () => "어려운 부분",
    pipeline: "파이프라인의 처리 방식",
    docsNote: "연결된 기술 문서는 영어로 제공됩니다.",
    faq: "자주 묻는 질문",
    others: "다른 문서 유형",
    finalTitle: "문서 하나로 시험해 보세요",
    finalBody: () => "Flow를 만들고 실제 문서를 처리해 결과를 확인하세요. 무료 크레딧으로 시작할 수 있습니다.",
    finalCta: "무료로 시작하기",
    breadcrumbAria: "탐색 경로",
  },
};

export type RelatedUseCase = { label: string; badge: string; href: string };


/** The free tool(s) built for this document type, from the Lite registry (guides reuse it). */
export const TRY_COPY: Record<Locale, { heading: string; body: string }> = {
  es: { heading: "Pruébalo gratis, sin registro", body: "Sube un documento y ve el resultado en pantalla." },
  en: { heading: "Try it free, no sign-up", body: "Upload one document and see the result on screen." },
  "pt-BR": { heading: "Teste grátis, sem cadastro", body: "Envie um documento e veja o resultado na tela." },
  fr: { heading: "Essayez gratuitement, sans inscription", body: "Téléversez un document et voyez le résultat à l’écran." },
  de: { heading: "Kostenlos testen, ohne Anmeldung", body: "Laden Sie ein Dokument hoch und sehen Sie das Ergebnis sofort." },
  it: { heading: "Provalo gratis, senza registrazione", body: "Carica un documento e guarda il risultato sullo schermo." },
  nl: { heading: "Gratis proberen, zonder account", body: "Upload één document en zie het resultaat op je scherm." },
  pl: { heading: "Wypróbuj za darmo, bez rejestracji", body: "Prześlij jeden dokument i zobacz wynik na ekranie." },
  tr: { heading: "Ücretsiz deneyin, kayıt gerekmez", body: "Bir belge yükleyin, sonucu ekranda görün." },
  "zh-Hans": { heading: "免费试用，无需注册", body: "上传一份文档，即可在屏幕上看到结果。" },
  ja: { heading: "無料でお試し、登録不要", body: "文書を 1 件アップロードすると、結果がすぐに表示されます。" },
  ko: { heading: "가입 없이 무료로 체험", body: "문서 하나를 올리면 결과를 바로 화면에서 볼 수 있습니다." },
};

export default function UseCaseArticle({
  uc,
  locale,
  homeHref,
  hubHref,
  alternateHref,
  others,
  stripeOn,
}: {
  uc: UseCase;
  locale: Locale;
  homeHref: string;
  hubHref: string;
  /** The English page, for the Spanish inline "Read in English" link. */
  alternateHref: string;
  others: RelatedUseCase[];
  stripeOn: boolean;
}) {
  const t = COPY[locale];
  const demoHref = localizedPath("/schedule", locale);
  const primaryHref = t.leadWithDemo ? demoHref : APP_URL;
  // /pricing 307s to the homepage while Stripe self-serve is off; the
  // secondary CTA must not link into a redirect in that state. (Spanish
  // leads with the demo, so its secondary is the free trial.)
  const secondaryHref = stripeOn ? "/pricing" : t.leadWithDemo ? APP_URL : demoHref;
  const secondaryLabel = stripeOn ? t.seePricing : t.bookDemo;

  return (
    <div className="max-w-[860px] mx-auto px-4 sm:px-6">
      <nav aria-label={t.breadcrumbAria} className="mb-6 text-sm text-fg-5 flex flex-wrap items-center gap-x-2">
        <Link href={homeHref} className="hover:text-fg-3 transition-colors">{t.home}</Link>
        <span aria-hidden="true">/</span>
        <Link href={hubHref} className="hover:text-fg-3 transition-colors">{t.hub}</Link>
        <span aria-hidden="true">/</span>
        <span className="text-fg-4">{uc.label}</span>
        {t.readOther && (
          <span className="ml-auto">
            <Link href={alternateHref} hrefLang="en" lang="en" className="hover:text-fg-3 transition-colors">
              {t.readOther}
            </Link>
          </span>
        )}
      </nav>

      <SectionEyebrow className="mb-4">{uc.badge}</SectionEyebrow>

      <h1 className="text-3xl md:text-5xl font-extrabold text-fg mb-5 tracking-tight leading-tight">
        {uc.h1}
      </h1>

      {/* Self-contained lead answer — the passage most likely to be extracted. */}
      <p className="text-lg text-fg-3 leading-relaxed mb-10">{uc.lede}</p>

      <div className="flex flex-wrap gap-3 mb-16">
        <Link
          href={primaryHref}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white font-semibold shadow-md hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#3b82f6]/20 transition-all"
        >
          {t.primaryCta} <ArrowRight size={17} />
        </Link>
        <Link
          href={secondaryHref}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-tint/15 text-fg-3 font-semibold hover:bg-tint/5 hover:text-fg transition-all"
        >
          {secondaryLabel}
        </Link>
      </div>

      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-fg mb-4">{t.painful}</h2>
        <div className="space-y-4 text-fg-4 leading-relaxed">
          {uc.problem.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-fg mb-5">{t.extract}</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-tint/10">
                <th className="text-left py-3 pr-4 font-semibold text-fg-3 whitespace-nowrap">{t.field}</th>
                <th className="text-left py-3 font-semibold text-fg-3">{t.care}</th>
              </tr>
            </thead>
            <tbody className="text-fg-4">
              {uc.fields.map((f) => (
                <tr key={f.name} className="border-b border-tint/5 align-top">
                  <td className="py-3 pr-4 font-medium text-fg-2">{f.name}</td>
                  <td className="py-3 leading-relaxed">{f.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-fg mb-5">{t.hard(uc.label)}</h2>
        <div className="space-y-4">
          {uc.gotchas.map((g) => (
            <div key={g.title} className="glass-card rounded-xl p-5">
              <div className="flex items-center gap-2.5 mb-2">
                <TriangleAlert size={18} className="text-amber-400 flex-shrink-0" />
                <h3 className="text-base font-semibold text-fg">{g.title}</h3>
              </div>
              <p className="text-sm text-fg-4 leading-relaxed">{g.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-fg mb-5">{t.pipeline}</h2>
        <ul className="space-y-3">
          {uc.pipeline.map((step) => (
            <li key={step.label} className="flex gap-3 leading-relaxed">
              <Check size={18} className="text-ok flex-shrink-0 mt-1" />
              <span className="text-fg-4">
                <Link href={locale === "es" ? step.href : localizedPath(step.href, locale)} className="text-accent font-medium hover:underline">
                  {step.label}
                </Link>{" "}
                — {step.why}
              </span>
            </li>
          ))}
        </ul>
        {t.docsNote && <p className="text-xs text-fg-5 mt-4">{t.docsNote}</p>}
      </section>

      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-fg mb-6">{t.faq}</h2>
        <dl className="space-y-4">
          {uc.faqs.map((faq) => (
            <div key={faq.q} className="glass-card rounded-xl p-5">
              <dt className="text-base font-semibold text-fg mb-2">{faq.q}</dt>
              <dd className="text-sm text-fg-4 leading-relaxed">{faq.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      {others.length > 0 && (
        <section className="mb-14">
          <h2 className="text-xl font-bold text-fg mb-4">{t.others}</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {others.map((o) => (
              <Link
                key={o.href}
                href={o.href}
                className="glass-card glass-card-hover rounded-xl p-4 transition-all"
              >
                <span className="text-sm font-semibold text-fg">{o.label}</span>
                <span className="block text-xs text-fg-5 mt-1 leading-relaxed">{o.badge}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {toolsForUseCase(uc.slug, locale).length > 0 && (
        <section className="mb-14 glass-card rounded-2xl p-6 border border-emerald-400/30">
          <h2 className="text-xl font-bold text-fg mb-2">{TRY_COPY[locale].heading}</h2>
          <p className="text-sm text-fg-4 mb-4">{TRY_COPY[locale].body}</p>
          <div className="flex flex-wrap gap-3">
            {toolsForUseCase(uc.slug, locale).map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/15 text-sm font-semibold text-fg hover:bg-white/5 transition-colors"
              >
                {tool.label} <ArrowRight size={15} />
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="glass-card rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-fg mb-3">{t.finalTitle}</h2>
        <p className="text-fg-4 mb-6 max-w-[520px] mx-auto leading-relaxed">{t.finalBody(uc.label)}</p>
        <Link
          href={primaryHref}
          className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white font-semibold shadow-md hover:-translate-y-0.5 transition-all"
        >
          {t.finalCta} <ArrowRight size={17} />
        </Link>
      </div>
    </div>
  );
}
