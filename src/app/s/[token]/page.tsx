import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Questionnaire from "@/components/followup/Questionnaire";
import { getInviteByToken } from "@/lib/followup/store";
import { SALES_EMAIL } from "@/lib/site";
import { DEFAULT_LANG, type Lang } from "@/lib/followup/flow";
import { UI } from "@/lib/followup/i18n";

// Every token is different and answers accumulate — never cache.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tu siguiente paso con Tavnit",
  description: "Un par de preguntas para preparar tu demo personalizado.",
  // Personal links for sales prospects — search engines have no business here.
  robots: { index: false, follow: false },
};

export default async function FollowupPage(props: { params: Promise<{ token: string }> }) {
  const { token } = await props.params;
  const invite = await getInviteByToken(token).catch(() => null);
  const lang: Lang = invite?.lang === "en" ? "en" : DEFAULT_LANG;

  if (!invite) {
    const t = UI[lang];
    return (
      <div className="min-h-dvh bg-[#0a0a1a] text-slate-200 flex flex-col overflow-x-clip">
        <header className="flex items-center px-6 sm:px-10 py-5">
          <Link href="/" className="hover:opacity-85 transition-opacity">
            <Image src="/assets/tavnit_logo.png" alt="Tavnit" width={110} height={28} className="h-7 w-auto" />
          </Link>
        </header>
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="glass-card rounded-2xl p-10 max-w-md text-center">
            <h1 className="font-heading text-2xl font-bold text-slate-100 mb-3">{t.invalidTitle}</h1>
            <p className="text-slate-400 leading-relaxed">
              {t.invalidBody1}
              <a href={`mailto:${SALES_EMAIL}`} className="text-[#3b82f6] hover:underline">
                {SALES_EMAIL}
              </a>
              {t.invalidBody2}
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-[#0a0a1a] text-slate-200 flex flex-col overflow-x-clip">
      <Questionnaire
        token={invite.token}
        clientName={invite.client_name}
        company={invite.company}
        lang={lang}
        salesEmail={invite.sales_rep_email ?? SALES_EMAIL}
        schedulerUrl={process.env.FOLLOWUP_SCHEDULER_URL ?? null}
        initialAnswers={invite.answers}
        alreadyCompleted={Boolean(invite.completed_at)}
      />
    </div>
  );
}
