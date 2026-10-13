import { LITE_HUB_PATHS, LITE_TOOLS, LITE_TOOL_IDS } from "@/lib/lite/tools";
import { TOOL_COPY } from "@/lib/lite/copy";
import Logo from "@/components/Logo";
import Link from "next/link";
import { ArrowRight, Github, Linkedin } from "lucide-react";
import CookieSettingsLink from "@/components/CookieSettingsLink";
import { GITHUB_URL, LINKEDIN_URL, SUPPORT_EMAIL } from "@/lib/site";
import { docsForFooterColumn, type DocSlug } from "@/components/docs/nav";
import { USE_CASES } from "@/lib/use-cases";
import { USE_CASES_ES, esUseCasePath } from "@/lib/use-cases.es";
import { NEW_LOCALES, engineLocale, localeHome, prefixedPath, type Locale, type NewLocale } from "@/lib/locales";
import { localizedPath } from "@/lib/routes";
import { USE_CASE_CONTENT } from "@/content/use-cases";

/**
 * Site footer.
 *
 * Layout (2026-09-24 redesign): the brand block with the two calls to action
 * and the social icons on the left; four short columns on the right
 * (product, free tools, use cases, resources); the documentation sections as
 * one compact row of links (they are the long tail, kept for crawlers and
 * for people looking for a specific page, without a ten-row column); legal,
 * language and contact in the bottom bar. Seven equal columns did not fit,
 * wrapped labels onto two lines and pushed "Company" to a row of its own.
 *
 * This is the primary internal-linking surface. The previous version had four
 * columns of same-page "#anchor" links plus a GitHub URL — so a crawler landing
 * on the homepage found almost no routes to follow, and the documentation pages
 * were reachable only from inside /docs.
 *
 * Two rules here:
 *  - All links are root-relative ("/#features", not "#features") so they resolve
 *    correctly from /pricing, /docs/* and the legal pages.
 *  - The same columns render on mobile and desktop. The old markup duplicated
 *    the list into a mobile-only "Quick Links" block and desktop-only columns,
 *    which meant mobile users never saw Connect, and the two lists drifted.
 *
 * Enterprise services (/enterprise, /es/empresas) are linked from Resources
 * only: findable, but not presented as the main offer.
 *
 * The Spanish footer links Spanish routes, the Spanish docs included
 * (/es/documentacion); /pricing is the one English page it still points to.
 * The new languages follow the Spanish layout (their compact home has the
 * same sections) and link their own pages where the [lang] tree has them,
 * English otherwise (docs, pricing, legal).
 */

type FooterLink = { label: string; href: string; external?: boolean };
type FooterColumn = { title: string; links: FooterLink[]; more?: FooterLink };

/** Free tools: the hub, then the tools, capped; the hub has the rest. */
const FREE_TOOLS_SHOWN = 5;
function freeTools(locale: Locale): FooterColumn {
  const all = LITE_TOOL_IDS.map((id) => ({ label: TOOL_COPY[id][locale].label, href: localizedPath(LITE_TOOLS[id].paths.en, locale) }));
  const t = L[locale];
  return {
    title: t.freeTools,
    links: all.slice(0, FREE_TOOLS_SHOWN),
    more:
      all.length > FREE_TOOLS_SHOWN
        ? { label: t.seeAll.replace("{n}", String(all.length)), href: localizedPath(LITE_HUB_PATHS.en, locale) }
        : undefined,
  };
}

/**
 * Use cases: derived, but capped. Every footer link appears on every page, so
 * listing all of them would spread link equity thin; the hub carries the set.
 */
const USE_CASES_SHOWN = 5;

/**
 * Documentation sections, derived from the docs nav so a new page is linked
 * the day it exists, laid out in four themed lists (any section not placed
 * below lands in the last one). Thirteen links in a plain four-column grid
 * always left one alone on its own row.
 */
const DOC_GROUPS: DocSlug[][] = [
  ["getting-started", "flows", "collections", "splitters", "subjects"],
  ["cleaners", "agents", "matchers", "inspectors", "fillers"],
  ["buckets", "human-in-the-loop", "pipelines", "pipeline-map", "user-roles"],
  ["email-integration", "api-integration", "webhooks", "signals", "nets"],
];
function docLinks(locale: "en" | "es"): FooterLink[][] {
  const all = [...docsForFooterColumn("documentation", locale), ...docsForFooterColumn("integrations", locale)].filter((s) => s.slug !== "mcp-connector");
  const placed = new Set(DOC_GROUPS.flat());
  return DOC_GROUPS.map((group, i) => [
    ...group.flatMap((slug) => all.filter((s) => s.slug === slug)),
    ...(i === DOC_GROUPS.length - 1 ? all.filter((s) => !placed.has(s.slug)) : []),
  ].map((s) => ({ label: s.label, href: s.href })));
}
const DOCS: Record<"en" | "es", FooterLink[][]> = { en: docLinks("en"), es: docLinks("es") };

/** Column titles and the labels the new languages need (en/es columns below keep theirs). */
const L: Record<
  Locale,
  { product: string; howItWorks: string; integrations: string; mcp: string; pricing: string; freeTools: string; seeAll: string; useCases: string; allUseCases: string; resources: string; docs: string; guides: string; enterprise: string; demo: string }
> = {
  en: { product: "Product", howItWorks: "How it works", integrations: "Integrations", mcp: "MCP connector", pricing: "Pricing", freeTools: "Free tools", seeAll: "See all {n}", useCases: "Use cases", allUseCases: "All use cases", resources: "Resources", docs: "Documentation", guides: "Guides", enterprise: "Enterprise", demo: "Book a demo" },
  es: { product: "Producto", howItWorks: "Cómo funciona", integrations: "Integraciones", mcp: "Conector MCP", pricing: "Precios", freeTools: "Herramientas gratis", seeAll: "Ver las {n}", useCases: "Casos de uso", allUseCases: "Todos los casos de uso", resources: "Recursos", docs: "Documentación", guides: "Guías", enterprise: "Enterprise y asesoría", demo: "Agendar una demostración" },
  "pt-BR": { product: "Produto", howItWorks: "Como funciona", integrations: "Integrações", mcp: "Conector MCP", pricing: "Preços", freeTools: "Ferramentas grátis", seeAll: "Ver todas as {n}", useCases: "Casos de uso", allUseCases: "Todos os casos de uso", resources: "Recursos", docs: "Documentação", guides: "Guias", enterprise: "Enterprise e consultoria", demo: "Agendar uma demonstração" },
  fr: { product: "Produit", howItWorks: "Comment ça marche", integrations: "Intégrations", mcp: "Connecteur MCP", pricing: "Tarifs", freeTools: "Outils gratuits", seeAll: "Voir les {n}", useCases: "Cas d’usage", allUseCases: "Tous les cas d’usage", resources: "Ressources", docs: "Documentation", guides: "Guides", enterprise: "Enterprise et conseil", demo: "Réserver une démo" },
  de: { product: "Produkt", howItWorks: "So funktioniert es", integrations: "Integrationen", mcp: "MCP-Connector", pricing: "Preise", freeTools: "Kostenlose Tools", seeAll: "Alle {n} ansehen", useCases: "Anwendungsfälle", allUseCases: "Alle Anwendungsfälle", resources: "Ressourcen", docs: "Dokumentation", guides: "Leitfäden", enterprise: "Enterprise und Beratung", demo: "Demo buchen" },
  it: { product: "Prodotto", howItWorks: "Come funziona", integrations: "Integrazioni", mcp: "Connettore MCP", pricing: "Prezzi", freeTools: "Strumenti gratuiti", seeAll: "Vedi tutti i {n}", useCases: "Casi d’uso", allUseCases: "Tutti i casi d’uso", resources: "Risorse", docs: "Documentazione", guides: "Guide", enterprise: "Enterprise e consulenza", demo: "Prenota una demo" },
  nl: { product: "Product", howItWorks: "Hoe het werkt", integrations: "Integraties", mcp: "MCP-connector", pricing: "Prijzen", freeTools: "Gratis tools", seeAll: "Alle {n} bekijken", useCases: "Toepassingen", allUseCases: "Alle toepassingen", resources: "Bronnen", docs: "Documentatie", guides: "Gidsen", enterprise: "Enterprise en advies", demo: "Demo plannen" },
  pl: { product: "Produkt", howItWorks: "Jak to działa", integrations: "Integracje", mcp: "Konektor MCP", pricing: "Cennik", freeTools: "Darmowe narzędzia", seeAll: "Zobacz wszystkie ({n})", useCases: "Zastosowania", allUseCases: "Wszystkie zastosowania", resources: "Zasoby", docs: "Dokumentacja", guides: "Poradniki", enterprise: "Enterprise i doradztwo", demo: "Umów demo" },
  tr: { product: "Ürün", howItWorks: "Nasıl çalışır", integrations: "Entegrasyonlar", mcp: "MCP bağlayıcısı", pricing: "Fiyatlar", freeTools: "Ücretsiz araçlar", seeAll: "{n} aracın tümü", useCases: "Kullanım alanları", allUseCases: "Tüm kullanım alanları", resources: "Kaynaklar", docs: "Dokümantasyon", guides: "Rehberler", enterprise: "Kurumsal ve danışmanlık", demo: "Demo planlayın" },
  "zh-Hans": { product: "产品", howItWorks: "工作原理", integrations: "集成", mcp: "MCP 连接器", pricing: "价格", freeTools: "免费工具", seeAll: "查看全部 {n} 个", useCases: "应用场景", allUseCases: "全部应用场景", resources: "资源", docs: "文档", guides: "指南", enterprise: "企业版与咨询", demo: "预约演示" },
  ja: { product: "製品", howItWorks: "仕組み", integrations: "連携", mcp: "MCP コネクタ", pricing: "料金", freeTools: "無料ツール", seeAll: "全 {n} 件を見る", useCases: "活用事例", allUseCases: "すべての活用事例", resources: "リソース", docs: "ドキュメント", guides: "ガイド", enterprise: "エンタープライズとコンサルティング", demo: "デモを予約" },
  ko: { product: "제품", howItWorks: "작동 방식", integrations: "연동", mcp: "MCP 커넥터", pricing: "요금", freeTools: "무료 도구", seeAll: "{n}개 모두 보기", useCases: "활용 사례", allUseCases: "모든 활용 사례", resources: "리소스", docs: "문서", guides: "가이드", enterprise: "엔터프라이즈 및 컨설팅", demo: "데모 예약" },
};

/** The new languages: the Spanish layout, their own pages where they exist. */
function newLocaleColumns(locale: NewLocale): FooterColumn[] {
  const t = L[locale];
  const p = (enPath: string) => localizedPath(enPath, locale);
  return [
    {
      title: t.product,
      links: [
        { label: t.howItWorks, href: prefixedPath(locale, "/#how-it-works") },
        { label: t.integrations, href: p("/integrations") },
        { label: t.mcp, href: p("/integrations/mcp") },
        { label: t.pricing, href: "/pricing" },
      ],
    },
    freeTools(locale),
    {
      title: t.useCases,
      links: USE_CASE_CONTENT[locale].items.slice(0, USE_CASES_SHOWN).map((uc) => ({ label: uc.label, href: p(`/use-cases/${uc.slug}`) })),
      more: { label: t.allUseCases, href: p("/use-cases") },
    },
    {
      title: t.resources,
      links: [
        { label: t.docs, href: "/docs" },
        { label: t.guides, href: p("/guides") },
        { label: t.enterprise, href: p("/enterprise") },
        { label: t.demo, href: p("/schedule") },
      ],
    },
  ];
}

const COLUMNS: Record<Locale, FooterColumn[]> = {
  ...(Object.fromEntries(NEW_LOCALES.map((l) => [l, newLocaleColumns(l)])) as Record<NewLocale, FooterColumn[]>),
  en: [
    {
      title: "Product",
      links: [
        { label: "How it works", href: "/#how-it-works" },
        { label: "Features", href: "/#features" },
        { label: "Agents", href: "/#agents" },
        { label: "Human in the loop", href: "/#human-in-the-loop" },
        { label: "Pricing", href: "/pricing" },
      ],
    },
    freeTools("en"),
    {
      title: "Use cases",
      links: USE_CASES.slice(0, USE_CASES_SHOWN).map((uc) => ({ label: uc.label, href: `/use-cases/${uc.slug}` })),
      more: { label: "All use cases", href: "/use-cases" },
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "/docs" },
        { label: "Integrations", href: "/integrations" },
        { label: "MCP connector", href: "/integrations/mcp" },
        { label: "Guides", href: "/guides" },
        { label: "Enterprise", href: "/enterprise" },
        { label: "Book a demo", href: "/schedule" },
      ],
    },
  ],
  es: [
    {
      title: "Producto",
      links: [
        { label: "Cómo funciona", href: "/es#como-funciona" },
        { label: "Integraciones", href: "/es/integraciones" },
        { label: "Conector MCP", href: "/es/integraciones/mcp" },
        { label: "Precios", href: "/pricing" },
      ],
    },
    freeTools("es"),
    {
      title: "Casos de uso",
      links: USE_CASES_ES.slice(0, USE_CASES_SHOWN).map((uc) => ({ label: uc.label, href: esUseCasePath(uc) })),
      more: { label: "Todos los casos de uso", href: "/es/casos-de-uso" },
    },
    {
      title: "Recursos",
      links: [
        { label: "Documentación", href: "/es/documentacion" },
        { label: "Guías", href: "/es/guias" },
        { label: "Enterprise y asesoría", href: "/es/empresas" },
        { label: "Agendar una demostración", href: "/es/agendar" },
      ],
    },
  ],
};

const T: Record<Locale, { tagline: string; start: string; demo: string; docs: string; docsLead: string; copyright: string; privacy: string; terms: string }> = {
  en: {
    tagline: "AI document operations: extract, clean, review and act on the data in any document.",
    start: "Get started",
    demo: "Book a demo",
    docs: "Documentation",
    docsLead: "How each piece works, from your first Flow to the API.",
    copyright: "© 2026 Tavnit",
    privacy: "Privacy",
    terms: "Terms",
  },
  es: {
    tagline: "Operaciones documentales con IA: extrae, limpia, revisa y actúa sobre los datos de cualquier documento.",
    start: "Empezar",
    demo: "Agendar demo",
    docs: "Documentación",
    docsLead: "Cómo funciona cada pieza, del primer Flow a la API.",
    copyright: "© 2026 Tavnit",
    privacy: "Privacidad",
    terms: "Términos",
  },
  "pt-BR": {
    tagline: "Operações documentais com IA: extraia, limpe, revise e aja sobre os dados de qualquer documento.",
    start: "Começar",
    demo: "Agendar demo",
    docs: "Documentação",
    docsLead: "Como cada peça funciona, do primeiro Flow à API.",
    copyright: "© 2026 Tavnit",
    privacy: "Privacidade",
    terms: "Termos",
  },
  fr: {
    tagline: "Opérations documentaires avec l’IA : extrayez, nettoyez, vérifiez et exploitez les données de n’importe quel document.",
    start: "Commencer",
    demo: "Réserver une démo",
    docs: "Documentation",
    docsLead: "Comment fonctionne chaque brique, du premier Flow à l’API.",
    copyright: "© 2026 Tavnit",
    privacy: "Confidentialité",
    terms: "Conditions",
  },
  de: {
    tagline: "Dokumentenprozesse mit KI: Daten aus jedem Dokument extrahieren, bereinigen, prüfen und nutzen.",
    start: "Loslegen",
    demo: "Demo buchen",
    docs: "Dokumentation",
    docsLead: "Wie jeder Baustein funktioniert, vom ersten Flow bis zur API.",
    copyright: "© 2026 Tavnit",
    privacy: "Datenschutz",
    terms: "Nutzungsbedingungen",
  },
  it: {
    tagline: "Operazioni documentali con l’IA: estrai, pulisci, verifica e usa i dati di qualsiasi documento.",
    start: "Inizia",
    demo: "Prenota una demo",
    docs: "Documentazione",
    docsLead: "Come funziona ogni componente, dal primo Flow all’API.",
    copyright: "© 2026 Tavnit",
    privacy: "Privacy",
    terms: "Termini",
  },
  nl: {
    tagline: "Documentverwerking met AI: haal de gegevens uit elk document, schoon ze op, controleer ze en zet ze aan het werk.",
    start: "Aan de slag",
    demo: "Demo plannen",
    docs: "Documentatie",
    docsLead: "Hoe elk onderdeel werkt, van je eerste Flow tot de API.",
    copyright: "© 2026 Tavnit",
    privacy: "Privacy",
    terms: "Voorwaarden",
  },
  pl: {
    tagline: "Obsługa dokumentów z AI: wyodrębniaj, porządkuj, weryfikuj i wykorzystuj dane z dowolnego dokumentu.",
    start: "Zacznij",
    demo: "Umów demo",
    docs: "Dokumentacja",
    docsLead: "Jak działa każdy element, od pierwszego Flow po API.",
    copyright: "© 2026 Tavnit",
    privacy: "Prywatność",
    terms: "Regulamin",
  },
  tr: {
    tagline: "Yapay zekâ ile belge operasyonları: her belgedeki verileri çıkarın, temizleyin, inceleyin ve kullanın.",
    start: "Başlayın",
    demo: "Demo planlayın",
    docs: "Dokümantasyon",
    docsLead: "İlk Flow’unuzdan API’ye kadar her parçanın nasıl çalıştığı.",
    copyright: "© 2026 Tavnit",
    privacy: "Gizlilik",
    terms: "Koşullar",
  },
  "zh-Hans": {
    tagline: "AI 文档处理：提取、清洗、审核任何文档中的数据，并据此采取行动。",
    start: "开始使用",
    demo: "预约演示",
    docs: "文档",
    docsLead: "从第一个 Flow 到 API，了解每个部分如何运作。",
    copyright: "© 2026 Tavnit",
    privacy: "隐私",
    terms: "条款",
  },
  ja: {
    tagline: "AI によるドキュメント業務：あらゆる文書のデータを抽出・整形・確認し、活用します。",
    start: "始める",
    demo: "デモを予約",
    docs: "ドキュメント",
    docsLead: "最初の Flow から API まで、各機能の仕組み。",
    copyright: "© 2026 Tavnit",
    privacy: "プライバシー",
    terms: "利用規約",
  },
  ko: {
    tagline: "AI 문서 운영: 모든 문서의 데이터를 추출하고, 정리하고, 검토하고, 활용하세요.",
    start: "시작하기",
    demo: "데모 예약",
    docs: "문서",
    docsLead: "첫 Flow부터 API까지, 각 기능이 작동하는 방식.",
    copyright: "© 2026 Tavnit",
    privacy: "개인정보처리방침",
    terms: "이용약관",
  },
};

/** The bottom bar's language link: Spanish from English, English from everything else. */
const OTHER: Record<"en" | "es", { label: string; lang: string; href: string }> = {
  en: { label: "Español", lang: "es", href: localeHome("es") },
  es: { label: "English", lang: "en", href: localeHome("en") },
};

const LINK = "text-sm text-fg-5 transition-colors hover:text-fg";

export default function Footer({
  showPricing = true,
  locale = "en",
}: {
  /** False while Stripe self-serve is off platform-wide (platform_config). */
  showPricing?: boolean;
  locale?: Locale;
}) {
  const t = T[locale];
  const other = OTHER[locale === "en" ? "en" : "es"];
  const columns = COLUMNS[locale].map((c) => (showPricing ? c : { ...c, links: c.links.filter((l) => l.href !== "/pricing") }));
  return (
    <footer className="border-t border-tint/5 bg-well/40 pb-8 pt-14 text-fg-4 backdrop-blur-sm md:pt-20">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Logo height={40} alt="Tavnit - AI Document Data Extraction Platform" />
            <p className="mt-5 max-w-[320px] text-sm leading-relaxed text-fg-5">{t.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="https://app.tavnit.io"
                className="inline-flex h-10 items-center rounded-full bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] px-5 text-sm font-semibold text-white shadow-[0_6px_18px_-8px_rgba(76,99,246,0.7)] transition-[filter] hover:brightness-[1.06]"
              >
                {t.start}
              </Link>
              <Link href={localizedPath("/schedule", locale)} className="inline-flex h-10 items-center rounded-full border border-tint/10 px-5 text-sm font-semibold text-fg-2 transition-colors hover:border-tint/25 hover:text-fg">
                {t.demo}
              </Link>
            </div>
            <div className="mt-6 flex items-center gap-2">
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid h-9 w-9 place-items-center rounded-lg border border-tint/10 text-fg-5 transition-colors hover:border-tint/30 hover:text-fg">
                <Linkedin size={16} aria-hidden />
              </a>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="grid h-9 w-9 place-items-center rounded-lg border border-tint/10 text-fg-5 transition-colors hover:border-tint/30 hover:text-fg">
                <Github size={16} aria-hidden />
              </a>
            </div>
          </div>

          {/* Four short columns */}
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-8">
            {columns.map((column) => (
              <div key={column.title}>
                <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-fg">{column.title}</h4>
                <ul className="space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className={LINK}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                  {column.more && (
                    <li>
                      <Link href={column.more.href} className="inline-flex items-center gap-1 text-sm font-medium text-fg-4 transition-colors hover:text-fg">
                        {column.more.label}
                        <ArrowRight size={13} aria-hidden />
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* The documentation: same grid as the columns above, so it lines up with them */}
        <div className="mt-14 grid gap-6 border-t border-tint/5 pt-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-fg">{t.docs}</h4>
            <p className="mt-2 max-w-[320px] text-sm leading-relaxed text-fg-6">{t.docsLead}</p>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4 lg:col-span-8">
            {DOCS[engineLocale(locale)].map((group, i) => (
              <ul key={i} className="space-y-2.5">
                {group.map((d) => (
                  <li key={d.href}>
                    <Link href={d.href} className={LINK}>
                      {d.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col gap-3 border-t border-tint/5 pt-6 text-xs text-fg-6 sm:flex-row sm:items-center sm:justify-between">
          <p>{t.copyright}</p>
          <p className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href={localizedPath("/privacy", locale)} className="transition-colors hover:text-fg-4">{t.privacy}</Link>
            <Link href={localizedPath("/terms", locale)} className="transition-colors hover:text-fg-4">{t.terms}</Link>
            <CookieSettingsLink className="transition-colors hover:text-fg-4" locale={locale} />
            <Link href={`mailto:${SUPPORT_EMAIL}`} className="transition-colors hover:text-fg-4">{SUPPORT_EMAIL}</Link>
            <Link href={other.href} hrefLang={other.lang} lang={other.lang} className="font-semibold transition-colors hover:text-fg-4">{other.label}</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
