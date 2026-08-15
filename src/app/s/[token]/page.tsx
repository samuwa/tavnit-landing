import { cache } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Questionnaire from "@/components/followup/Questionnaire";
import { getInviteByToken } from "@/lib/followup/store";
import { DEFAULT_LANG, type Lang } from "@/lib/followup/flow";
import { UI } from "@/lib/followup/i18n";
import { SALES_EMAIL } from "@/lib/site";

// Every token is different and answers accumulate — never cache.
export const dynamic = "force-dynamic";

// One fetch shared by generateMetadata and the page within a single request.
const getInvite = cache((token: string) => getInviteByToken(token).catch(() => null));

function isExpired(expiresAt: string | null): boolean {
  return Boolean(expiresAt) && new Date(expiresAt as string).getTime() < Date.now();
}

export async function generateMetadata(props: {
  params: Promise<{ token: string }>;
}): Promise<Metadata> {
  const { token } = await props.params;
  const invite = await getInvite(token);
  // The title is what WhatsApp/iMessage previews show — personalize it, but
  // never leak the client's own name into link previews others might see.
  const title = invite?.company ? `Tavnit × ${invite.company}` : "Tu siguiente paso con Tavnit";
  return {
    title,
    description: "Un par de preguntas para preparar tu demo personalizado.",
    // Personal links for sales prospects — search engines have no business here.
    robots: { index: false, follow: false },
  };
}

export default async function FollowupPage(props: { params: Promise<{ token: string }> }) {
  const { token } = await props.params;
  const invite = await getInvite(token);
  const expired = invite ? isExpired(invite.expires_at) : false;
  const lang: Lang = invite?.lang === "en" ? "en" : DEFAULT_LANG;

  if (!invite || expired) {
    const t = UI[lang];
    const email = invite?.sales_rep_email ?? SALES_EMAIL;
    return (
      <div className="min-h-dvh bg-[#0a0a1a] text-slate-200 flex flex-col overflow-x-clip">
        <header className="flex items-center px-6 sm:px-10 py-5">
          <Link href="/" className="hover:opacity-85 transition-opacity">
            <Image src="/assets/tavnit_logo.png" alt="Tavnit" width={110} height={28} className="h-7 w-auto" />
          </Link>
        </header>
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="glass-card rounded-2xl p-10 max-w-md text-center">
            <h1 className="font-heading text-2xl font-bold text-slate-100 mb-3">
              {expired ? t.expiredTitle : t.invalidTitle}
            </h1>
            <p className="text-slate-400 leading-relaxed">
              {t.invalidBody1}
              <a href={`mailto:${email}`} className="text-[#3b82f6] hover:underline">
                {email}
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
        schedulerUrl={invite.scheduler_url ?? process.env.FOLLOWUP_SCHEDULER_URL ?? null}
        initialAnswers={invite.answers}
        alreadyCompleted={Boolean(invite.completed_at)}
      />
    </div>
  );
}
