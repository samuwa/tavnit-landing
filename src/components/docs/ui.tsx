"use client";

/**
 * Shared docs UI primitives.
 *
 * Extracted verbatim from the former single-file docs page. Marked "use client"
 * because CodeBlock owns copy-to-clipboard state; the rest are pure and simply
 * ride along. Markup and classNames are unchanged, so the rendered design is
 * byte-identical to before the route split.
 */

import { useState } from "react";
import { AlertTriangle, Check, CheckCircle, Copy, XCircle } from "lucide-react";

/* ─── Reusable sub-components ─── */

export function InfoBox({
  color,
  icon,
  title,
  children,
}: {
  color: "purple" | "violet" | "green" | "blue" | "yellow";
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  const styles: Record<string, string> = {
    purple: "border-[#3b82f6] bg-[#3b82f6]/10",
    violet: "border-[#6c42f0] bg-[#6c42f0]/10",
    green: "border-emerald-500 bg-emerald-500/10",
    blue: "border-blue-500 bg-blue-500/10",
    yellow: "border-yellow-500 bg-yellow-500/10",
  };
  return (
    <div className={`flex gap-4 p-4 rounded-lg border-l-4 ${styles[color]} my-4`}>
      <div className="flex-shrink-0 mt-0.5 opacity-80">{icon}</div>
      <div>
        <strong className="text-gray-100 block mb-1">{title}</strong>
        <p className="text-gray-400 text-sm leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

export function WarningBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 p-4 rounded-lg border-l-4 border-yellow-500 bg-yellow-500/10 my-4">
      <AlertTriangle size={20} className="flex-shrink-0 mt-0.5 text-yellow-500" />
      <p className="text-gray-300 text-sm leading-relaxed">{children}</p>
    </div>
  );
}

export function DocCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm rounded-xl p-6 md:p-8 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-[#3b82f6]">{icon}</span>
        <h2 className="text-xl font-bold text-gray-100">{title}</h2>
      </div>
      <div className="text-gray-300 leading-relaxed space-y-3 text-[15px]">{children}</div>
    </div>
  );
}

export function NumberedList({ items }: { items: React.ReactNode[] }) {
  return (
    <ol className="space-y-3 my-4">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#6c42f0] flex items-center justify-center text-xs font-bold text-white">
            {i + 1}
          </span>
          <span className="text-gray-300 text-[15px] leading-relaxed pt-0.5">{item}</span>
        </li>
      ))}
    </ol>
  );
}

export function BulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-2 my-3 ml-1">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-gray-300 text-[15px]">
          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#3b82f6] mt-2" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function CodeBlock({ lang, code }: { lang: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg overflow-hidden my-4 border border-white/[0.08]">
      <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.06] border-b border-white/[0.08]">
        <span className="text-sm font-medium text-gray-400">{lang}</span>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors px-2.5 py-1 rounded hover:bg-white/10"
        >
          {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto bg-black/40 text-[13px] leading-relaxed">
        <code className="text-gray-300 font-mono">{code}</code>
      </pre>
    </div>
  );
}

export function InlineCode({ children }: { children: string }) {
  return (
    <code className="px-2.5 py-1 bg-black/40 border border-white/[0.08] rounded text-[#3b82f6] text-sm font-mono">
      {children}
    </code>
  );
}

export function PermissionRow({ label, owner, admin, member, note }: { label: string; owner: boolean; admin: boolean; member: boolean; note?: string }) {
  const cell = (allowed: boolean) => (
    <div className="w-16 flex justify-center">
      {allowed ? <CheckCircle size={16} className="text-emerald-400" /> : <XCircle size={16} className="text-gray-600" />}
    </div>
  );
  return (
    <div className="flex items-center py-2 border-b border-white/[0.04]">
      <div className="flex-1">
        <span className="text-gray-300 text-sm">{label}</span>
        {note && <span className="text-gray-500 text-xs block italic">{note}</span>}
      </div>
      {cell(owner)}
      {cell(admin)}
      {cell(member)}
    </div>
  );
}

export function PermissionGroupHeader({ label }: { label: string }) {
  return (
    <div className="pt-4 pb-1">
      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</span>
    </div>
  );
}

export function RoleBadge({ label, color, icon, subtitle }: { label: string; color: string; icon: React.ReactNode; subtitle: string }) {
  return (
    <div className={`flex flex-col items-center p-4 rounded-xl border ${color} text-center`}>
      <div className="mb-2">{icon}</div>
      <span className="text-sm font-bold text-gray-100">{label}</span>
      <span className="text-xs text-gray-400 mt-1">{subtitle}</span>
    </div>
  );
}

/* ─── Main page ─── */
