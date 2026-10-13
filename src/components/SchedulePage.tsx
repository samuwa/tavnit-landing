import type { Metadata } from "next";
import { CalendarDays, Clock, MessageSquare } from "lucide-react";
import SquaresBackground from "@/components/SquaresBackground";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScheduleMeeting from "@/components/ScheduleMeeting";
import { getSalesSchedulerUrl } from "@/lib/schedule";
import { SALES_EMAIL } from "@/lib/site";
import { isStripeEnabled } from "@/lib/platform";
import { hreflangOf, type Locale } from "@/lib/locales";
import { languageLinksFor, localizedPath, pageAlternates, pageOgLocales } from "@/lib/routes";

/**
 * The book-a-demo page in every language: /schedule, /es/agendar and
 * /<lang>/schedule. Same form, same API route, same Calendly — only the UI
 * strings change, so a visitor never fills in a form in another language
 * to talk to sales. Routes are thin wrappers (each keeps `revalidate`).
 */

const EN_PATH = "/schedule";

const COPY: Record<
  Locale,
  {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    h1: string;
    lede: string;
    /** 30 minutes / your use case / no commitment — icons fixed by position. */
    expectations: [{ title: string; text: string }, { title: string; text: string }, { title: string; text: string }];
  }
> = {
  en: {
    title: "Book a Demo — Schedule a Meeting",
    description:
      "Book a 30-minute demo of Tavnit. Tell us about your documents, pick a time on the calendar, and see your own PDFs turned into structured data live.",
    ogTitle: "Book a Tavnit Demo",
    ogDescription: "Tell us about your documents, pick a time, and see your own PDFs turned into structured data live.",
    h1: "Book a Demo",
    lede: "Tell us a little about your documents, then pick a time straight on the calendar.",
    expectations: [
      { title: "30 minutes", text: "A live walkthrough, not a slide deck — bring one of your real documents." },
      { title: "Your use case", text: "We build a first extraction flow for your document type during the call." },
      { title: "No commitment", text: "Leave with your data extracted and a clear idea of what a rollout looks like." },
    ],
  },
  es: {
    title: "Agendar una demostración",
    description:
      "Agenda una demostración de 30 minutos de Tavnit. Cuéntanos de tus documentos, elige una hora en el calendario y mira tus propios PDFs convertidos en datos estructurados, en vivo.",
    ogTitle: "Agendar una demostración de Tavnit",
    ogDescription:
      "Cuéntanos de tus documentos, elige una hora y mira tus propios PDFs convertidos en datos estructurados, en vivo.",
    h1: "Agendar una demostración",
    lede: "Cuéntanos un poco de tus documentos y luego elige una hora directamente en el calendario.",
    expectations: [
      { title: "30 minutos", text: "Un recorrido en vivo, no una presentación — trae uno de tus documentos reales." },
      { title: "Tu caso", text: "Armamos un primer Flow de extracción para tu tipo de documento durante la llamada." },
      { title: "Sin compromiso", text: "Te vas con tus datos extraídos y una idea clara de cómo sería ponerlo en marcha." },
    ],
  },
  "pt-BR": {
    title: "Agendar uma demonstração",
    description:
      "Agende uma demonstração de 30 minutos do Tavnit. Conte sobre seus documentos, escolha um horário no calendário e veja seus próprios PDFs virarem dados estruturados, ao vivo.",
    ogTitle: "Agende uma demonstração do Tavnit",
    ogDescription: "Conte sobre seus documentos, escolha um horário e veja seus próprios PDFs virarem dados estruturados, ao vivo.",
    h1: "Agendar uma demonstração",
    lede: "Conte um pouco sobre seus documentos e escolha um horário direto no calendário.",
    expectations: [
      { title: "30 minutos", text: "Uma demonstração ao vivo, não uma apresentação de slides — traga um dos seus documentos reais." },
      { title: "Seu caso", text: "Montamos um primeiro flow de extração para o seu tipo de documento durante a chamada." },
      { title: "Sem compromisso", text: "Você sai com seus dados extraídos e uma ideia clara de como seria a implantação." },
    ],
  },
  fr: {
    title: "Réserver une démo",
    description:
      "Réservez une démo de 30 minutes de Tavnit. Parlez-nous de vos documents, choisissez un créneau dans le calendrier et voyez vos propres PDF transformés en données structurées, en direct.",
    ogTitle: "Réserver une démo de Tavnit",
    ogDescription: "Parlez-nous de vos documents, choisissez un créneau et voyez vos propres PDF transformés en données structurées, en direct.",
    h1: "Réserver une démo",
    lede: "Parlez-nous un peu de vos documents, puis choisissez un créneau directement dans le calendrier.",
    expectations: [
      { title: "30 minutes", text: "Une démonstration en direct, pas une présentation — apportez un de vos vrais documents." },
      { title: "Votre cas d’usage", text: "Nous construisons un premier flow d’extraction pour votre type de document pendant l’appel." },
      { title: "Sans engagement", text: "Vous repartez avec vos données extraites et une idée claire de ce que serait un déploiement." },
    ],
  },
  de: {
    title: "Demo buchen",
    description:
      "Buchen Sie eine 30-minütige Demo von Tavnit. Erzählen Sie uns von Ihren Dokumenten, wählen Sie einen Termin im Kalender und sehen Sie live, wie Ihre eigenen PDFs zu strukturierten Daten werden.",
    ogTitle: "Tavnit-Demo buchen",
    ogDescription: "Erzählen Sie uns von Ihren Dokumenten, wählen Sie einen Termin und sehen Sie live, wie Ihre eigenen PDFs zu strukturierten Daten werden.",
    h1: "Demo buchen",
    lede: "Erzählen Sie uns kurz von Ihren Dokumenten und wählen Sie dann direkt im Kalender einen Termin.",
    expectations: [
      { title: "30 Minuten", text: "Eine Live-Vorführung statt Folien — bringen Sie eines Ihrer echten Dokumente mit." },
      { title: "Ihr Anwendungsfall", text: "Wir bauen während des Gesprächs einen ersten Extraktions-Flow für Ihren Dokumenttyp." },
      { title: "Unverbindlich", text: "Sie gehen mit extrahierten Daten und einem klaren Bild davon, wie eine Einführung aussieht." },
    ],
  },
  it: {
    title: "Prenota una demo",
    description:
      "Prenota una demo di 30 minuti di Tavnit. Raccontaci dei tuoi documenti, scegli un orario sul calendario e guarda i tuoi PDF trasformarsi in dati strutturati, dal vivo.",
    ogTitle: "Prenota una demo di Tavnit",
    ogDescription: "Raccontaci dei tuoi documenti, scegli un orario e guarda i tuoi PDF trasformarsi in dati strutturati, dal vivo.",
    h1: "Prenota una demo",
    lede: "Raccontaci qualcosa dei tuoi documenti, poi scegli un orario direttamente sul calendario.",
    expectations: [
      { title: "30 minuti", text: "Una dimostrazione dal vivo, non una presentazione — porta uno dei tuoi documenti reali." },
      { title: "Il tuo caso", text: "Durante la chiamata costruiamo un primo flow di estrazione per il tuo tipo di documento." },
      { title: "Senza impegno", text: "Esci con i tuoi dati estratti e un’idea chiara di come sarebbe l’adozione." },
    ],
  },
  nl: {
    title: "Demo plannen",
    description:
      "Plan een demo van 30 minuten van Tavnit. Vertel ons over je documenten, kies een tijdstip in de agenda en zie live hoe je eigen pdf’s gestructureerde gegevens worden.",
    ogTitle: "Plan een Tavnit-demo",
    ogDescription: "Vertel ons over je documenten, kies een tijdstip en zie live hoe je eigen pdf’s gestructureerde gegevens worden.",
    h1: "Demo plannen",
    lede: "Vertel ons kort over je documenten en kies daarna direct een tijdstip in de agenda.",
    expectations: [
      { title: "30 minuten", text: "Een live demonstratie, geen slides — neem een van je echte documenten mee." },
      { title: "Jouw toepassing", text: "Tijdens het gesprek bouwen we een eerste extractie-flow voor jouw documenttype." },
      { title: "Vrijblijvend", text: "Je gaat weg met je gegevens geëxtraheerd en een helder beeld van hoe een uitrol eruitziet." },
    ],
  },
  pl: {
    title: "Umów demo",
    description:
      "Umów 30-minutowe demo Tavnit. Opowiedz nam o swoich dokumentach, wybierz termin w kalendarzu i zobacz na żywo, jak Twoje PDF-y zamieniają się w uporządkowane dane.",
    ogTitle: "Umów demo Tavnit",
    ogDescription: "Opowiedz nam o swoich dokumentach, wybierz termin i zobacz na żywo, jak Twoje PDF-y zamieniają się w uporządkowane dane.",
    h1: "Umów demo",
    lede: "Opowiedz nam krótko o swoich dokumentach, a potem wybierz termin bezpośrednio w kalendarzu.",
    expectations: [
      { title: "30 minut", text: "Pokaz na żywo, a nie prezentacja — przynieś jeden ze swoich prawdziwych dokumentów." },
      { title: "Twój przypadek", text: "Podczas rozmowy budujemy pierwszy flow ekstrakcji dla Twojego typu dokumentu." },
      { title: "Bez zobowiązań", text: "Wychodzisz z wyodrębnionymi danymi i jasnym obrazem wdrożenia." },
    ],
  },
  tr: {
    title: "Demo planlayın",
    description:
      "Tavnit için 30 dakikalık bir demo planlayın. Belgelerinizden bahsedin, takvimden bir saat seçin ve kendi PDF’lerinizin canlı olarak yapılandırılmış veriye dönüştüğünü görün.",
    ogTitle: "Tavnit demosu planlayın",
    ogDescription: "Belgelerinizden bahsedin, bir saat seçin ve kendi PDF’lerinizin canlı olarak yapılandırılmış veriye dönüştüğünü görün.",
    h1: "Demo planlayın",
    lede: "Bize belgelerinizden biraz bahsedin, ardından takvimden doğrudan bir saat seçin.",
    expectations: [
      { title: "30 dakika", text: "Slayt sunumu değil, canlı bir gösterim — gerçek belgelerinizden birini getirin." },
      { title: "Sizin senaryonuz", text: "Görüşme sırasında belge türünüz için ilk çıkarma flow’unu birlikte kuruyoruz." },
      { title: "Taahhüt yok", text: "Verileriniz çıkarılmış ve kurulumun nasıl olacağına dair net bir fikirle ayrılırsınız." },
    ],
  },
  "zh-Hans": {
    title: "预约演示",
    description: "预约 30 分钟的 Tavnit 演示。告诉我们您的文档情况，在日历上选择时间，现场看到您自己的 PDF 变成结构化数据。",
    ogTitle: "预约 Tavnit 演示",
    ogDescription: "告诉我们您的文档情况，选择时间，现场看到您自己的 PDF 变成结构化数据。",
    h1: "预约演示",
    lede: "简单介绍一下您的文档，然后直接在日历上选择时间。",
    expectations: [
      { title: "30 分钟", text: "现场演示，而不是幻灯片 — 请带上一份您的真实文档。" },
      { title: "您的场景", text: "我们会在通话中为您的文档类型搭建第一个提取 flow。" },
      { title: "无需承诺", text: "结束时您将拿到提取好的数据，并清楚了解上线的方式。" },
    ],
  },
  ja: {
    title: "デモを予約",
    description:
      "Tavnit の 30 分間のデモを予約できます。文書について教えていただき、カレンダーで日時を選ぶと、お手持ちの PDF が構造化データになる様子をその場でご覧いただけます。",
    ogTitle: "Tavnit のデモを予約",
    ogDescription: "文書について教えていただき、日時を選ぶと、お手持ちの PDF が構造化データになる様子をその場でご覧いただけます。",
    h1: "デモを予約",
    lede: "扱っている文書について簡単に教えてください。そのままカレンダーで日時を選べます。",
    expectations: [
      { title: "30 分", text: "スライドではなくライブでのご紹介です。実際の文書を 1 件お持ちください。" },
      { title: "お客様の業務に合わせて", text: "通話中に、お客様の文書タイプ向けの最初の抽出 Flow を作成します。" },
      { title: "契約の義務なし", text: "抽出済みのデータと、導入のイメージをお持ち帰りいただけます。" },
    ],
  },
  ko: {
    title: "데모 예약",
    description:
      "30분 Tavnit 데모를 예약하세요. 문서에 대해 알려 주시고 캘린더에서 시간을 고르면, 직접 가져온 PDF가 구조화된 데이터로 바뀌는 과정을 실시간으로 보실 수 있습니다.",
    ogTitle: "Tavnit 데모 예약",
    ogDescription: "문서에 대해 알려 주시고 시간을 고르면, 직접 가져온 PDF가 구조화된 데이터로 바뀌는 과정을 실시간으로 보실 수 있습니다.",
    h1: "데모 예약",
    lede: "문서에 대해 간단히 알려 주신 뒤 캘린더에서 바로 시간을 선택하세요.",
    expectations: [
      { title: "30분", text: "슬라이드가 아닌 라이브 시연입니다. 실제 문서 하나를 가져오세요." },
      { title: "고객 맞춤 사례", text: "통화 중에 고객님의 문서 유형에 맞는 첫 번째 추출 Flow를 만들어 드립니다." },
      { title: "부담 없이", text: "추출된 데이터와 도입 과정에 대한 명확한 그림을 얻어 가실 수 있습니다." },
    ],
  },
};

const ICONS = [Clock, MessageSquare, CalendarDays];

export function scheduleMetadata(locale: Locale): Metadata {
  const t = COPY[locale];
  return {
    title: t.title,
    description: t.description,
    alternates: pageAlternates(EN_PATH, locale),
    openGraph: {
      type: "website",
      url: localizedPath(EN_PATH, locale),
      title: t.ogTitle,
      description: t.ogDescription,
      siteName: "Tavnit",
      ...pageOgLocales(EN_PATH, locale),
      images: ["/opengraph-image"],
    },
  };
}

export default async function SchedulePage({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  // Header/Footer hide their pricing links while Stripe self-serve is off.
  const [schedulerUrl, stripeOn] = await Promise.all([getSalesSchedulerUrl(), isStripeEnabled()]);

  return (
    <>
      <SquaresBackground />
      <div lang={hreflangOf(locale)}>
        <Header locale={locale} languages={languageLinksFor(EN_PATH)} showPricing={stripeOn} />
        {/* Everything lives in one viewport: the pitch and the form sit side by
            side, vertically centered, so nothing important needs a scroll. */}
        <main
          role="main"
          className="relative z-10 flex min-h-svh flex-col justify-center px-4 pb-10 pt-24 sm:px-6 lg:pt-16"
        >
          <div className="mx-auto grid w-full max-w-[1080px] items-center gap-8 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)] lg:gap-12">
            <div className="text-center lg:text-left">
              <h1 className="mb-3 text-3xl font-bold leading-tight text-fg sm:text-4xl">{t.h1}</h1>
              <p className="mx-auto mb-6 max-w-[440px] text-base text-fg-3 lg:mx-0">{t.lede}</p>
              <ul className="hidden space-y-4 lg:block">
                {t.expectations.map(({ title, text }, i) => {
                  const Icon = ICONS[i];
                  return (
                    <li key={title} className="flex items-start gap-3">
                      <Icon size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                      <p className="text-sm text-fg-4">
                        <span className="font-semibold text-fg">{title}.</span> {text}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>

            <ScheduleMeeting schedulerUrl={schedulerUrl} salesEmail={SALES_EMAIL} locale={locale} />
          </div>
        </main>
        <Footer locale={locale} showPricing={stripeOn} />
      </div>
    </>
  );
}
