"use client";

import { trackEvent } from "@/lib/analytics";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, CalendarCheck, Loader2, Mail, PartyPopper } from "lucide-react";
import type { Locale } from "@/lib/locales";

/**
 * The /schedule flow: a short lead form first, then the sales rep's Calendly
 * inline, prefilled with what the visitor just typed. The form is what makes
 * the lead ours (name, company, topic land in meeting_requests + the rep's
 * inbox) even if the visitor never picks a slot.
 */

/** Calendly/Cal.com URL tuned for a dark in-page embed, with the visitor's
 *  details prefilled so they don't type them twice. */
function embedUrl(
  url: string,
  prefill: { name: string; email: string; details: string },
): string {
  try {
    const u = new URL(url);
    if (u.hostname.endsWith("calendly.com")) {
      u.searchParams.set("embed_domain", window.location.hostname);
      u.searchParams.set("embed_type", "Inline");
      u.searchParams.set("hide_gdpr_banner", "1");
      // Default light theme on purpose: Calendly paints input VALUES with
      // text_color but keeps the fields white, so a dark-theme text_color
      // makes everything typed or prefilled look like ghost placeholder text.
      u.searchParams.set("primary_color", "3b82f6");
      // a1 prefills the event's FIRST custom question (a2 the second, …).
      // With no custom questions on the event it's silently ignored, so the
      // company + topic land in the meeting details as soon as the rep adds
      // one free-text question ("Anything to help us prepare?") in Calendly.
      if (prefill.details) u.searchParams.set("a1", prefill.details);
    } else if (u.hostname.endsWith("cal.com")) {
      u.searchParams.set("embed", "true");
      u.searchParams.set("theme", "dark");
      if (prefill.details) u.searchParams.set("notes", prefill.details);
    }
    if (prefill.name) u.searchParams.set("name", prefill.name);
    if (prefill.email) u.searchParams.set("email", prefill.email);
    return u.toString();
  } catch {
    return url;
  }
}

interface ScheduleCopy {
  genericError: string;
  booked: (first: string, email: string) => string;
  thanks: (first: string, below: boolean) => string;
  iframeTitle: string;
  noScheduler: string;
  name: string;
  namePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  company: string;
  companyPlaceholder: string;
  topic: string;
  topicPlaceholder: string;
  sending: string;
  submit: string;
  preferEmail: string;
}

/** UI strings only — the API payload and the sales notification are unchanged. */
const COPY: Record<Locale, ScheduleCopy> = {
  en: {
    genericError: "Something went wrong — please try again.",
    booked: (first: string, email: string) => `You're booked, ${first || "thanks"} — the invite is on its way to ${email}.`,
    thanks: (first: string, below: boolean) => `Thanks, ${first || "there"} — now pick a time that works for you${below ? " below" : ""}.`,
    iframeTitle: "Pick a meeting time",
    noScheduler: "We got your request and will reach out shortly to find a time.",
    name: "Name *",
    namePlaceholder: "Ana García",
    email: "Work email *",
    emailPlaceholder: "ana@company.com",
    company: "Company",
    companyPlaceholder: "Company name",
    topic: "What would you like to discuss?",
    topicPlaceholder: "e.g. We process ~500 supplier invoices a month and want them in our ERP without re-typing.",
    sending: "Sending…",
    submit: "Continue to pick a time",
    preferEmail: "Prefer email?",
  },
  es: {
    genericError: "Algo salió mal — inténtalo de nuevo.",
    booked: (first: string, email: string) => `Listo, ${first || "gracias"} — la invitación va en camino a ${email}.`,
    thanks: (first: string, below: boolean) => `Gracias${first ? `, ${first}` : ""} — ahora elige la hora que te convenga${below ? " aquí abajo" : ""}.`,
    iframeTitle: "Elige la hora de la reunión",
    noScheduler: "Recibimos tu solicitud y te escribimos en breve para coordinar la hora.",
    name: "Nombre *",
    namePlaceholder: "Ana García",
    email: "Correo de trabajo *",
    emailPlaceholder: "ana@empresa.com",
    company: "Empresa",
    companyPlaceholder: "Nombre de la empresa",
    topic: "¿De qué te gustaría hablar?",
    topicPlaceholder: "ej. Procesamos unas 500 facturas de proveedores al mes y queremos pasarlas al ERP sin re-tipear.",
    sending: "Enviando…",
    submit: "Continuar y elegir hora",
    preferEmail: "¿Prefieres escribirnos?",
  },
  "pt-BR": {
    genericError: "Algo deu errado — tente novamente.",
    booked: (first: string, email: string) => `Tudo certo, ${first || "obrigado"} — o convite está a caminho de ${email}.`,
    thanks: (first: string, below: boolean) => `Obrigado${first ? `, ${first}` : ""} — agora escolha um horário que funcione para você${below ? " abaixo" : ""}.`,
    iframeTitle: "Escolha o horário da reunião",
    noScheduler: "Recebemos sua solicitação e entraremos em contato em breve para combinar um horário.",
    name: "Nome *",
    namePlaceholder: "Ana Souza",
    email: "E-mail corporativo *",
    emailPlaceholder: "ana@empresa.com",
    company: "Empresa",
    companyPlaceholder: "Nome da empresa",
    topic: "Sobre o que você gostaria de conversar?",
    topicPlaceholder: "ex. Processamos cerca de 500 notas de fornecedores por mês e queremos levá-las ao ERP sem redigitar.",
    sending: "Enviando…",
    submit: "Continuar e escolher horário",
    preferEmail: "Prefere e-mail?",
  },
  fr: {
    genericError: "Une erreur s’est produite — veuillez réessayer.",
    booked: (first: string, email: string) => `C’est réservé, ${first || "merci"} — l’invitation part vers ${email}.`,
    thanks: (first: string, below: boolean) => `Merci${first ? `, ${first}` : ""} — choisissez maintenant un créneau qui vous convient${below ? " ci-dessous" : ""}.`,
    iframeTitle: "Choisissez l’horaire de la réunion",
    noScheduler: "Nous avons bien reçu votre demande et vous recontactons rapidement pour fixer un horaire.",
    name: "Nom *",
    namePlaceholder: "Claire Martin",
    email: "E-mail professionnel *",
    emailPlaceholder: "claire@entreprise.com",
    company: "Entreprise",
    companyPlaceholder: "Nom de l’entreprise",
    topic: "De quoi aimeriez-vous parler ?",
    topicPlaceholder: "ex. Nous traitons environ 500 factures fournisseurs par mois et voulons les intégrer à notre ERP sans ressaisie.",
    sending: "Envoi…",
    submit: "Continuer et choisir un créneau",
    preferEmail: "Vous préférez l’e-mail ?",
  },
  de: {
    genericError: "Etwas ist schiefgelaufen — bitte versuchen Sie es erneut.",
    booked: (first: string, email: string) => `Gebucht, ${first || "danke"} — die Einladung ist unterwegs an ${email}.`,
    thanks: (first: string, below: boolean) => `Danke${first ? `, ${first}` : ""} — wählen Sie jetzt einen passenden Termin${below ? " unten" : ""}.`,
    iframeTitle: "Termin auswählen",
    noScheduler: "Wir haben Ihre Anfrage erhalten und melden uns in Kürze, um einen Termin zu finden.",
    name: "Name *",
    namePlaceholder: "Anna Schmidt",
    email: "Geschäftliche E-Mail *",
    emailPlaceholder: "anna@firma.de",
    company: "Unternehmen",
    companyPlaceholder: "Name des Unternehmens",
    topic: "Worüber möchten Sie sprechen?",
    topicPlaceholder: "z. B. Wir verarbeiten rund 500 Lieferantenrechnungen im Monat und wollen sie ohne Abtippen in unser ERP bringen.",
    sending: "Wird gesendet…",
    submit: "Weiter zur Terminauswahl",
    preferEmail: "Lieber per E-Mail?",
  },
  it: {
    genericError: "Qualcosa è andato storto — riprova.",
    booked: (first: string, email: string) => `Fatto, ${first || "grazie"} — l’invito è in arrivo a ${email}.`,
    thanks: (first: string, below: boolean) => `Grazie${first ? `, ${first}` : ""} — ora scegli l’orario che preferisci${below ? " qui sotto" : ""}.`,
    iframeTitle: "Scegli l’orario della riunione",
    noScheduler: "Abbiamo ricevuto la tua richiesta e ti contatteremo a breve per fissare un orario.",
    name: "Nome *",
    namePlaceholder: "Giulia Rossi",
    email: "E-mail di lavoro *",
    emailPlaceholder: "giulia@azienda.it",
    company: "Azienda",
    companyPlaceholder: "Nome dell’azienda",
    topic: "Di cosa vorresti parlare?",
    topicPlaceholder: "es. Elaboriamo circa 500 fatture fornitori al mese e vogliamo portarle nel nostro ERP senza ridigitarle.",
    sending: "Invio in corso…",
    submit: "Continua e scegli l’orario",
    preferEmail: "Preferisci l’e-mail?",
  },
  nl: {
    genericError: "Er ging iets mis — probeer het opnieuw.",
    booked: (first: string, email: string) => `Geboekt, ${first || "bedankt"} — de uitnodiging is onderweg naar ${email}.`,
    thanks: (first: string, below: boolean) => `Bedankt${first ? `, ${first}` : ""} — kies nu een tijdstip dat je uitkomt${below ? " hieronder" : ""}.`,
    iframeTitle: "Kies een tijdstip voor de afspraak",
    noScheduler: "We hebben je aanvraag ontvangen en nemen snel contact op om een tijdstip te vinden.",
    name: "Naam *",
    namePlaceholder: "Sanne de Vries",
    email: "Zakelijk e-mailadres *",
    emailPlaceholder: "sanne@bedrijf.nl",
    company: "Bedrijf",
    companyPlaceholder: "Bedrijfsnaam",
    topic: "Waar wil je het over hebben?",
    topicPlaceholder: "bijv. We verwerken zo’n 500 leveranciersfacturen per maand en willen ze zonder overtypen in ons ERP krijgen.",
    sending: "Verzenden…",
    submit: "Verder naar een tijdstip kiezen",
    preferEmail: "Liever per e-mail?",
  },
  pl: {
    genericError: "Coś poszło nie tak — spróbuj ponownie.",
    booked: (first: string, email: string) => `Zarezerwowane, ${first || "dziękujemy"} — zaproszenie jest w drodze na ${email}.`,
    thanks: (first: string, below: boolean) => `Dziękujemy${first ? `, ${first}` : ""} — teraz wybierz dogodny termin${below ? " poniżej" : ""}.`,
    iframeTitle: "Wybierz termin spotkania",
    noScheduler: "Otrzymaliśmy Twoje zgłoszenie i wkrótce się odezwiemy, aby ustalić termin.",
    name: "Imię i nazwisko *",
    namePlaceholder: "Anna Kowalska",
    email: "Służbowy e-mail *",
    emailPlaceholder: "anna@firma.pl",
    company: "Firma",
    companyPlaceholder: "Nazwa firmy",
    topic: "O czym chcesz porozmawiać?",
    topicPlaceholder: "np. Przetwarzamy ok. 500 faktur od dostawców miesięcznie i chcemy przenosić je do ERP bez przepisywania.",
    sending: "Wysyłanie…",
    submit: "Dalej: wybierz termin",
    preferEmail: "Wolisz e-mail?",
  },
  tr: {
    genericError: "Bir şeyler ters gitti — lütfen tekrar deneyin.",
    booked: (first: string, email: string) => `Randevunuz alındı${first ? `, ${first}` : ""} — davet ${email} adresine gönderiliyor.`,
    thanks: (first: string, below: boolean) => `Teşekkürler${first ? `, ${first}` : ""} — şimdi${below ? " aşağıdan" : ""} size uygun bir saat seçin.`,
    iframeTitle: "Toplantı saatini seçin",
    noScheduler: "Talebinizi aldık; uygun bir saat belirlemek için kısa süre içinde size ulaşacağız.",
    name: "Ad soyad *",
    namePlaceholder: "Ayşe Yılmaz",
    email: "İş e-postası *",
    emailPlaceholder: "ayse@sirket.com",
    company: "Şirket",
    companyPlaceholder: "Şirket adı",
    topic: "Neyi konuşmak istersiniz?",
    topicPlaceholder: "örn. Ayda yaklaşık 500 tedarikçi faturası işliyoruz ve bunları yeniden yazmadan ERP’ye aktarmak istiyoruz.",
    sending: "Gönderiliyor…",
    submit: "Devam edin ve saat seçin",
    preferEmail: "E-postayı mı tercih edersiniz?",
  },
  "zh-Hans": {
    genericError: "出了点问题，请重试。",
    booked: (first: string, email: string) => `${first ? `${first}，` : ""}预约成功 — 邀请已发送至 ${email}。`,
    thanks: (first: string, below: boolean) => `${first ? `${first}，` : ""}谢谢 — 现在请${below ? "在下方" : ""}选择方便的时间。`,
    iframeTitle: "选择会议时间",
    noScheduler: "我们已收到您的请求，会尽快联系您确定时间。",
    name: "姓名 *",
    namePlaceholder: "王芳",
    email: "工作邮箱 *",
    emailPlaceholder: "wangfang@company.com",
    company: "公司",
    companyPlaceholder: "公司名称",
    topic: "您想聊些什么？",
    topicPlaceholder: "例如：我们每月处理约 500 张供应商发票，希望无需手动录入就能导入 ERP。",
    sending: "发送中…",
    submit: "继续选择时间",
    preferEmail: "更喜欢邮件？",
  },
  ja: {
    genericError: "問題が発生しました。もう一度お試しください。",
    booked: (first: string, email: string) => `${first ? `${first} 様、` : ""}ご予約ありがとうございます。招待状を ${email} にお送りしています。`,
    thanks: (first: string, below: boolean) => `${first ? `${first} 様、` : ""}ありがとうございます。${below ? "下の" : ""}カレンダーからご都合のよい日時をお選びください。`,
    iframeTitle: "打ち合わせの日時を選択",
    noScheduler: "リクエストを受け付けました。日程調整のため、追ってご連絡します。",
    name: "お名前 *",
    namePlaceholder: "山田 花子",
    email: "勤務先のメールアドレス *",
    emailPlaceholder: "hanako@company.co.jp",
    company: "会社名",
    companyPlaceholder: "会社名",
    topic: "どのようなことをご相談されたいですか？",
    topicPlaceholder: "例：毎月約 500 件の仕入先請求書を処理しており、手入力せずに ERP へ取り込みたい。",
    sending: "送信中…",
    submit: "次へ：日時を選ぶ",
    preferEmail: "メールでのご連絡をご希望ですか？",
  },
  ko: {
    genericError: "문제가 발생했습니다. 다시 시도해 주세요.",
    booked: (first: string, email: string) => `${first ? `${first}님, ` : ""}예약이 완료되었습니다. 초대장을 ${email}(으)로 보내고 있습니다.`,
    thanks: (first: string, below: boolean) => `${first ? `${first}님, ` : ""}감사합니다. 이제 ${below ? "아래에서 " : ""}편한 시간을 선택해 주세요.`,
    iframeTitle: "미팅 시간 선택",
    noScheduler: "요청을 접수했습니다. 시간을 정하기 위해 곧 연락드리겠습니다.",
    name: "이름 *",
    namePlaceholder: "김지은",
    email: "업무용 이메일 *",
    emailPlaceholder: "jieun@company.com",
    company: "회사",
    companyPlaceholder: "회사명",
    topic: "어떤 이야기를 나누고 싶으신가요?",
    topicPlaceholder: "예: 매달 약 500건의 공급업체 송장을 처리하며, 다시 입력하지 않고 ERP로 옮기고 싶습니다.",
    sending: "보내는 중…",
    submit: "계속해서 시간 선택",
    preferEmail: "이메일이 더 편하신가요?",
  },
};

const inputClass =
  "w-full glass-card rounded-xl px-4 py-3 text-fg placeholder:text-fg-5 " +
  "focus:outline-none focus:border-[#3b82f6]/50 focus-visible:outline-2 focus-visible:outline-[#3b82f6]";

export default function ScheduleMeeting({
  schedulerUrl,
  salesEmail,
  locale = "en",
}: {
  schedulerUrl: string | null;
  salesEmail: string;
  locale?: Locale;
}) {
  const t = COPY[locale];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [topic, setTopic] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [booked, setBooked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestIdRef = useRef<string | null>(null);
  const reportedRef = useRef(false);

  // The Calendly iframe posts calendly.event_scheduled to the page when the
  // visitor books. Report it once so the admin panel can show which requests
  // became meetings and for when.
  useEffect(() => {
    if (!submitted) return;
    function onMessage(e: MessageEvent) {
      let host = "";
      try {
        host = new URL(e.origin).hostname;
      } catch {
        return;
      }
      if (!/(^|\.)calendly\.com$/.test(host)) return;
      const data = e.data as {
        event?: string;
        payload?: { event?: { uri?: string; start_time?: string }; invitee?: { uri?: string } };
      };
      if (data?.event !== "calendly.event_scheduled" || reportedRef.current) return;
      reportedRef.current = true;
      setBooked(true);
      if (requestIdRef.current) {
        void fetch("/api/schedule/scheduled", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: requestIdRef.current,
            eventUri: data.payload?.event?.uri ?? null,
            inviteeUri: data.payload?.invitee?.uri ?? null,
            startTime: data.payload?.event?.start_time ?? null,
          }),
        }).catch(() => {});
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [submitted]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, topic, website }),
      });
      const body = (await res.json().catch(() => null)) as
        | { error?: string; id?: string | null }
        | null;
      if (!res.ok) {
        setError(body?.error ?? t.genericError);
        return;
      }
      requestIdRef.current = body?.id ?? null;
      setSubmitted(true);
      trackEvent("generate_lead", { source: "schedule_form", locale });
    } catch {
      setError(t.genericError);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div>
        <div className="mb-6 flex items-center gap-3 glass-card rounded-xl px-5 py-4">
          {booked ? (
            <PartyPopper size={20} className="shrink-0 text-accent" aria-hidden />
          ) : (
            <CalendarCheck size={20} className="shrink-0 text-accent" aria-hidden />
          )}
          <p className="text-sm text-fg-3">
            {booked
              ? t.booked(name.split(" ")[0], email)
              : t.thanks(name.split(" ")[0], Boolean(schedulerUrl))}
          </p>
        </div>

        {schedulerUrl ? (
          <div className="overflow-hidden rounded-2xl border border-tint/15">
            {/* Calendly wants ~700px, but never taller than the viewport —
                on short screens the widget scrolls internally instead of
                pushing the page. */}
            <iframe
              src={embedUrl(schedulerUrl, {
                name,
                email,
                details: [company && `Company: ${company}`, topic]
                  .filter(Boolean)
                  .join(" — "),
              })}
              title={t.iframeTitle}
              className="h-[min(680px,calc(100svh-200px))] min-h-[420px] w-full bg-white"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="glass-card rounded-2xl px-6 py-8 text-center">
            <p className="mb-4 text-fg-3">
              {t.noScheduler}
            </p>
            <a
              href={`mailto:${salesEmail}`}
              className="inline-flex items-center gap-2 text-accent hover:underline"
            >
              <Mail size={16} aria-hidden />
              {salesEmail}
            </a>
          </div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="glass-card rounded-2xl p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-fg-3">{t.name}</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={120}
            autoComplete="name"
            placeholder={t.namePlaceholder}
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-fg-3">{t.email}</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            maxLength={200}
            autoComplete="email"
            placeholder={t.emailPlaceholder}
            className={inputClass}
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-fg-3">{t.company}</span>
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            maxLength={160}
            autoComplete="organization"
            placeholder={t.companyPlaceholder}
            className={inputClass}
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-fg-3">{t.topic}</span>
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            maxLength={2000}
            rows={3}
            placeholder={t.topicPlaceholder}
            className={`${inputClass} resize-none`}
          />
        </label>
        {/* Honeypot — hidden from people, tempting to bots. */}
        <input
          type="text"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
        />
      </div>

      {error && (
        <p role="alert" className="mt-4 text-sm text-red-400">
          {error}
        </p>
      )}

      <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={submitting || !name.trim() || !email.trim()}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] px-7 py-3.5 font-bold text-white shadow-lg shadow-[#3b82f6]/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#3b82f6]/30 disabled:pointer-events-none disabled:opacity-50"
        >
          {submitting ? (
            <Loader2 size={18} className="animate-spin" aria-hidden />
          ) : (
            <ArrowRight size={18} aria-hidden />
          )}
          {submitting ? t.sending : t.submit}
        </button>
        <p className="text-xs text-fg-5">
          {t.preferEmail}{" "}
          <a href={`mailto:${salesEmail}`} className="text-fg-4 hover:text-fg">
            {salesEmail}
          </a>
        </p>
      </div>
    </form>
  );
}
