"use client";

import Link from "next/link";
import { ArrowRight, RotateCcw } from "lucide-react";
import type { ToolCopy } from "@/lib/lite/copy";
import { APP_URL } from "@/lib/site";
import { useLiteSession } from "@/components/lite/session";
import type { FlowExtra, SceneProps } from "@/components/lite/scenes";

/**
 * What happens when you pick an outcome in "and then what?": the outcome's
 * own little scene (see scenes.tsx), its explanation, a replay button and
 * one invitation into Tavnit.
 */

export interface SceneItem {
  title: string;
  body: string;
  linkLabel: string;
  href: string;
  scene: [{ label: string }, { label: string }, { label: string; result: string }];
}

export default function Scene({
  Stage,
  item,
  copy,
  playKey,
  onReplay,
  flow,
}: {
  /** The outcome's or input's own stage (see scenes.tsx / scenes-in.tsx). */
  Stage: (props: SceneProps) => React.JSX.Element;
  item: SceneItem;
  copy: ToolCopy["next"];
  /** Changing this restarts the animation. */
  playKey: number;
  onReplay: () => void;
  /** Extra data for the Flow scene (the visitor's own columns). */
  flow?: FlowExtra;
}) {
  const { email } = useLiteSession();

  return (
    <div className="lite-pop mt-4 rounded-2xl border border-[var(--lite-line)] bg-[var(--lite-white)] p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-heading text-lg font-bold">{item.title}</h3>
          <p className="mt-1 max-w-[560px] text-sm leading-relaxed text-[var(--lite-muted)]">{item.body}</p>
        </div>
        <button
          type="button"
          onClick={onReplay}
          className="inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-lg px-2 text-sm font-medium text-[var(--lite-blue-ink)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lite-blue)]/50"
        >
          <RotateCcw size={14} aria-hidden />
          {copy.replay}
        </button>
      </div>

      {/* the stage: a bespoke choreography per outcome, restarted by playKey */}
      <div key={playKey} className="mt-6">
        <Stage labels={[item.scene[0].label, item.scene[1].label, item.scene[2].label]} result={item.scene[2].result} flow={flow} />
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link
          href={APP_URL}
          className="lite-brand lite-press inline-flex min-h-11 items-center justify-center rounded-lg px-5 text-sm font-semibold text-white shadow-sm shadow-[#3b82f6]/30 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lite-blue)]/50"
        >
          {email ? copy.tryItSignedIn : copy.tryIt}
        </Link>
        <Link href={item.href} className="inline-flex items-center gap-1 text-sm font-medium text-[var(--lite-blue-ink)] hover:underline">
          {item.linkLabel}
          <ArrowRight size={14} aria-hidden />
        </Link>
      </div>
    </div>
  );
}
