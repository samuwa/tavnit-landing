import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { Guide } from "@/lib/guides";
import { intlTag, localeHome, type Locale } from "@/lib/locales";
import { localizedPath } from "@/lib/routes";
import { TRY_COPY } from "@/components/UseCaseArticle";
import { toolsForGuide } from "@/lib/lite/related";
import { APP_URL } from "@/lib/site";

/**
 * Body of a guide, shared by /guides/[slug], /es/guias/[slug] and
 * /<lang>/guides/[slug] (links in the data are English paths, localised;
 * Spanish data keeps its own). Same
 * reasoning as UseCaseArticle: the article is the data, the chrome is shared,
 * and the two routes differ only in metadata, schema and data source.
 */

type GuideChrome = {
  home: string;
  hub: string;
  /** Inline link to the English guide (Spanish only). */
  readOther: string | null;
  minRead: (m: number) => string;
  updated: string;
  faq: string;
  more: string;
  finalTitle: string;
  finalBody: string;
  finalCta: string;
  /** Spanish closes on the demo; everyone else on self-serve. */
  leadWithDemo: boolean;
  breadcrumbAria: string;
};

const COPY: Record<Locale, GuideChrome> = {
  en: {
    home: "Home",
    hub: "Guides",
    readOther: null,
    minRead: (m: number) => `${m} min read`,
    updated: "Updated",
    faq: "Common questions",
    more: "More guides",
    finalTitle: "Try it on one document",
    finalBody: "Build a flow, send a real document through it, and see what comes back. Free credits to start.",
    finalCta: "Start free",
    leadWithDemo: false,
    breadcrumbAria: "Breadcrumb",
  },
  es: {
    home: "Inicio",
    hub: "Guías",
    readOther: "Read in English",
    minRead: (m: number) => `${m} min de lectura`,
    updated: "Actualizado el",
    faq: "Preguntas frecuentes",
    more: "Más guías",
    finalTitle: "Pruébalo con uno de tus documentos",
    finalBody: "Trae un documento real. En la demostración armamos tu primer Flow y ves los datos salir en vivo.",
    finalCta: "Agendar una demostración",
    leadWithDemo: true,
    breadcrumbAria: "Ruta de navegación",
  },
  "pt-BR": {
    home: "Início",
    hub: "Guias",
    readOther: null,
    minRead: (m: number) => `${m} min de leitura`,
    updated: "Atualizado em",
    faq: "Perguntas frequentes",
    more: "Mais guias",
    finalTitle: "Teste com um documento",
    finalBody: "Crie um flow, envie um documento real por ele e veja o que volta. Créditos grátis para começar.",
    finalCta: "Começar grátis",
    leadWithDemo: false,
    breadcrumbAria: "Navegação estrutural",
  },
  fr: {
    home: "Accueil",
    hub: "Guides",
    readOther: null,
    minRead: (m: number) => `${m} min de lecture`,
    updated: "Mis à jour le",
    faq: "Questions fréquentes",
    more: "Plus de guides",
    finalTitle: "Essayez sur un document",
    finalBody: "Créez un flow, envoyez-y un vrai document et voyez ce qui en ressort. Crédits gratuits pour commencer.",
    finalCta: "Commencer gratuitement",
    leadWithDemo: false,
    breadcrumbAria: "Fil d’Ariane",
  },
  de: {
    home: "Startseite",
    hub: "Leitfäden",
    readOther: null,
    minRead: (m: number) => `${m} Min. Lesezeit`,
    updated: "Aktualisiert am",
    faq: "Häufige Fragen",
    more: "Weitere Leitfäden",
    finalTitle: "Probieren Sie es mit einem Dokument",
    finalBody: "Erstellen Sie einen Flow, schicken Sie ein echtes Dokument hindurch und sehen Sie, was zurückkommt. Kostenlose Credits zum Start.",
    finalCta: "Kostenlos starten",
    leadWithDemo: false,
    breadcrumbAria: "Brotkrümelnavigation",
  },
  it: {
    home: "Home",
    hub: "Guide",
    readOther: null,
    minRead: (m: number) => `${m} min di lettura`,
    updated: "Aggiornato il",
    faq: "Domande frequenti",
    more: "Altre guide",
    finalTitle: "Provalo su un documento",
    finalBody: "Crea un flow, inviaci un documento reale e guarda cosa ne esce. Crediti gratuiti per iniziare.",
    finalCta: "Inizia gratis",
    leadWithDemo: false,
    breadcrumbAria: "Percorso di navigazione",
  },
  nl: {
    home: "Home",
    hub: "Gidsen",
    readOther: null,
    minRead: (m: number) => `${m} min lezen`,
    updated: "Bijgewerkt op",
    faq: "Veelgestelde vragen",
    more: "Meer gidsen",
    finalTitle: "Probeer het met één document",
    finalBody: "Bouw een flow, stuur er een echt document doorheen en kijk wat er terugkomt. Gratis credits om te beginnen.",
    finalCta: "Gratis beginnen",
    leadWithDemo: false,
    breadcrumbAria: "Kruimelpad",
  },
  pl: {
    home: "Strona główna",
    hub: "Poradniki",
    readOther: null,
    minRead: (m: number) => `${m} min czytania`,
    updated: "Zaktualizowano",
    faq: "Częste pytania",
    more: "Więcej poradników",
    finalTitle: "Wypróbuj na jednym dokumencie",
    finalBody: "Zbuduj flow, prześlij przez niego prawdziwy dokument i zobacz, co wróci. Darmowe kredyty na start.",
    finalCta: "Zacznij za darmo",
    leadWithDemo: false,
    breadcrumbAria: "Ścieżka nawigacji",
  },
  tr: {
    home: "Ana sayfa",
    hub: "Rehberler",
    readOther: null,
    minRead: (m: number) => `${m} dk okuma`,
    updated: "Güncellenme:",
    faq: "Sık sorulan sorular",
    more: "Diğer rehberler",
    finalTitle: "Tek bir belgeyle deneyin",
    finalBody: "Bir flow oluşturun, içinden gerçek bir belge geçirin ve ne döndüğünü görün. Başlamak için ücretsiz kredi.",
    finalCta: "Ücretsiz başlayın",
    leadWithDemo: false,
    breadcrumbAria: "İçerik yolu",
  },
  "zh-Hans": {
    home: "首页",
    hub: "指南",
    readOther: null,
    minRead: (m: number) => `阅读约 ${m} 分钟`,
    updated: "更新于",
    faq: "常见问题",
    more: "更多指南",
    finalTitle: "用一份文档试试",
    finalBody: "创建一个 flow，用真实文档跑一遍，看看结果如何。注册即送免费额度。",
    finalCta: "免费开始",
    leadWithDemo: false,
    breadcrumbAria: "面包屑导航",
  },
  ja: {
    home: "ホーム",
    hub: "ガイド",
    readOther: null,
    minRead: (m: number) => `${m} 分で読めます`,
    updated: "更新日:",
    faq: "よくある質問",
    more: "その他のガイド",
    finalTitle: "まずは 1 件の文書で",
    finalBody: "Flow を作成し、実際の文書を処理して結果を確認しましょう。無料クレジット付きで始められます。",
    finalCta: "無料で始める",
    leadWithDemo: false,
    breadcrumbAria: "パンくずリスト",
  },
  ko: {
    home: "홈",
    hub: "가이드",
    readOther: null,
    minRead: (m: number) => `${m}분 읽기`,
    updated: "업데이트:",
    faq: "자주 묻는 질문",
    more: "더 많은 가이드",
    finalTitle: "문서 하나로 시험해 보세요",
    finalBody: "Flow를 만들고 실제 문서를 처리해 결과를 확인하세요. 무료 크레딧으로 시작할 수 있습니다.",
    finalCta: "무료로 시작하기",
    leadWithDemo: false,
    breadcrumbAria: "탐색 경로",
  },
};

export type RelatedGuide = { h1: string; readingMinutes: number; href: string };

export default function GuideArticle({
  g,
  locale,
  alternateHref,
  others,
}: {
  g: Guide;
  locale: Locale;
  alternateHref: string;
  others: RelatedGuide[];
}) {
  const t = COPY[locale];
  const finalHref = t.leadWithDemo ? localizedPath("/schedule", locale) : APP_URL;
  const dateFmt = new Intl.DateTimeFormat(intlTag(locale), {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  return (
    <article className="max-w-[760px] mx-auto px-4 sm:px-6">
      <nav aria-label={t.breadcrumbAria} className="mb-6 text-sm text-fg-5 flex flex-wrap items-center gap-x-2">
        <Link href={localeHome(locale)} className="hover:text-fg-3 transition-colors">{t.home}</Link>
        <span aria-hidden="true">/</span>
        <Link href={localizedPath("/guides", locale)} className="hover:text-fg-3 transition-colors">{t.hub}</Link>
        {t.readOther && (
          <span className="ml-auto">
            <Link href={alternateHref} hrefLang="en" lang="en" className="hover:text-fg-3 transition-colors">
              {t.readOther}
            </Link>
          </span>
        )}
      </nav>

      <h1 className="text-3xl md:text-5xl font-extrabold text-fg mb-5 tracking-tight leading-tight">
        {g.h1}
      </h1>

      <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-fg-5 mb-8">
        <span className="inline-flex items-center gap-1">
          <Clock size={13} /> {t.minRead(g.readingMinutes)}
        </span>
        <time dateTime={g.updated}>
          {t.updated} {dateFmt.format(new Date(g.updated))}
        </time>
      </p>

      {/* Self-contained lead answer — the passage most likely to be extracted. */}
      <p className="text-lg text-fg-3 leading-relaxed mb-12">{g.lede}</p>

      {g.sections.map((section) => (
        <section key={section.heading} className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-fg mb-4">{section.heading}</h2>
          <div className="space-y-4 text-fg-4 leading-relaxed">
            {section.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            {section.bullets && (
              <ul className="list-disc pl-5 space-y-2 marker:text-accent">
                {section.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            )}
          </div>
        </section>
      ))}

      <section className="mb-14 glass-card rounded-2xl p-6 md:p-8 border border-[#3b82f6]/30">
        <h2 className="text-2xl font-bold text-fg mb-4">{g.tavnit.heading}</h2>
        <div className="space-y-4 text-fg-4 leading-relaxed mb-5">
          {g.tavnit.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {g.tavnit.links.map((l) => (
            <li key={l.href}>
              <Link
                href={locale === "es" ? l.href : localizedPath(l.href, locale)}
                className="inline-flex items-center gap-1 text-sm text-accent font-medium hover:underline"
              >
                {l.label} <ArrowRight size={14} />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-14">
        <h2 className="text-2xl md:text-3xl font-bold text-fg mb-6">{t.faq}</h2>
        <dl className="space-y-4">
          {g.faqs.map((faq) => (
            <div key={faq.q} className="glass-card rounded-xl p-5">
              <dt className="text-base font-semibold text-fg mb-2">{faq.q}</dt>
              <dd className="text-sm text-fg-4 leading-relaxed">{faq.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      {others.length > 0 && (
        <section className="mb-14">
          <h2 className="text-xl font-bold text-fg mb-4">{t.more}</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {others.map((o) => (
              <Link
                key={o.href}
                href={o.href}
                className="glass-card glass-card-hover rounded-xl p-4 transition-all"
              >
                <span className="text-sm font-semibold text-fg">{o.h1}</span>
                <span className="block text-xs text-fg-5 mt-1 leading-relaxed">
                  {t.minRead(o.readingMinutes)}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {toolsForGuide(g.slug, locale).length > 0 && (
        <section className="mb-14 glass-card rounded-2xl p-6 border border-emerald-400/30">
          <h2 className="text-xl font-bold text-fg mb-2">{TRY_COPY[locale].heading}</h2>
          <p className="text-sm text-fg-4 mb-4">{TRY_COPY[locale].body}</p>
          <div className="flex flex-wrap gap-3">
            {toolsForGuide(g.slug, locale).map((tool) => (
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
        <p className="text-fg-4 mb-6 max-w-[520px] mx-auto leading-relaxed">{t.finalBody}</p>
        <Link
          href={finalHref}
          className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white font-semibold shadow-md hover:-translate-y-0.5 transition-all"
        >
          {t.finalCta} <ArrowRight size={17} />
        </Link>
      </div>
    </article>
  );
}
