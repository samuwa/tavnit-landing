"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ArrowUpRight, Check, X } from "lucide-react";
import { bannerStore, trackEvent } from "@/lib/analytics";
import type { Locale } from "@/lib/locale";
import { CHATGPT_CONNECTORS_URL, MCP_SERVER_URL, claudeAddConnectorUrl } from "@/lib/assistant-links";

/**
 * Floating "Set up Tavnit with Claude / ChatGPT" bubble, on every page.
 *
 * Collapsed it is a small stack of two coins carrying the Claude and ChatGPT
 * marks. Hovering (or tapping, on touch) fans the coins out into two full
 * cards — the same coin elements, moved by framer-motion's shared layout —
 * each saying where the click goes and why. The click opens the assistant
 * with the Tavnit connector ready to add: a signed-out visitor signs in or
 * creates their organisation on app.tavnit.io and lands back on the consent
 * screen, so the whole thing is "add, sign up, approve".
 *
 * Mounted from the root layout; the Spanish strings follow the /es prefix.
 * Bottom-left so it never fights the cookie banner (bottom-right), hidden on
 * phones while the banner spans the bottom edge, and below the header and
 * any modal in z-order.
 */

type Assistant = "claude" | "chatgpt";

const COPY: Record<
  Locale,
  {
    aria: string;
    chip: string;
    title: string;
    subtitle: string;
    close: string;
    copied: string;
    note: string;
    items: Record<Assistant, { label: string; tag: string }>;
  }
> = {
  en: {
    aria: "Set up Tavnit with Claude or ChatGPT",
    chip: "Set up with Claude or ChatGPT",
    title: "Set up Tavnit with your AI assistant",
    subtitle: "No code. Add the connector, sign in or create your organization, approve.",
    close: "Close",
    copied: "Server address copied — paste it in ChatGPT",
    note: "Custom connectors are available on paid Claude and ChatGPT plans.",
    items: {
      claude: {
        label: "Set up with Claude",
        tag: "Opens claude.ai with the Tavnit connector prefilled. Confirm it, sign in or create your organization, and Claude can design flows and query your documents.",
      },
      chatgpt: {
        label: "Set up with ChatGPT",
        tag: "Opens ChatGPT's connector settings and copies the Tavnit server address for you to paste. Sign in or create your organization, then approve.",
      },
    },
  },
  es: {
    aria: "Configura Tavnit con Claude o ChatGPT",
    chip: "Configúralo con Claude o ChatGPT",
    title: "Configura Tavnit con tu asistente de IA",
    subtitle: "Sin código. Agrega el conector, inicia sesión o crea tu organización y aprueba.",
    close: "Cerrar",
    copied: "Dirección del servidor copiada — pégala en ChatGPT",
    note: "Los conectores personalizados están disponibles en los planes de pago de Claude y ChatGPT.",
    items: {
      claude: {
        label: "Configurar con Claude",
        tag: "Abre claude.ai con el conector de Tavnit ya cargado. Confírmalo, inicia sesión o crea tu organización, y Claude podrá diseñar flujos y consultar tus documentos.",
      },
      chatgpt: {
        label: "Configurar con ChatGPT",
        tag: "Abre la configuración de conectores de ChatGPT y copia la dirección del servidor de Tavnit para que la pegues. Inicia sesión o crea tu organización y aprueba.",
      },
    },
  },
};

const ORDER: Assistant[] = ["claude", "chatgpt"];

function ClaudeMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.65 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.63-.012-.043-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z" />
    </svg>
  );
}

function ChatGptMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
    </svg>
  );
}

const COIN: Record<Assistant, { className: string; Mark: typeof ClaudeMark }> = {
  claude: { className: "bg-[#d97757] text-white ring-white/40", Mark: ClaudeMark },
  chatgpt: { className: "bg-white text-black ring-black/10", Mark: ChatGptMark },
};

function Coin({ id, className = "" }: { id: Assistant; className?: string }) {
  const { className: look, Mark } = COIN[id];
  return (
    <motion.span
      layoutId={`tavnit-connect-coin-${id}`}
      className={`flex size-11 shrink-0 items-center justify-center rounded-full shadow-(--shadow-circle) ring-1 ${look} ${className}`}
    >
      <Mark className="size-6" />
    </motion.span>
  );
}

export default function ConnectAssistant() {
  const pathname = usePathname() ?? "/";
  const locale: Locale = pathname === "/es" || pathname.startsWith("/es/") ? "es" : "en";
  const t = COPY[locale];

  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [copied, setCopied] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const expanded = open || hover;

  // Cookie banner spans the bottom edge on phones; stay out of its way.
  const bannerOpen = useSyncExternalStore(
    bannerStore.subscribe,
    bannerStore.getSnapshot,
    bannerStore.getServerSnapshot
  );

  // Tap-to-open closes on outside click / Escape (hover closes by itself).
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const onPick = useCallback(
    (id: Assistant) => {
      trackEvent("assistant_connect_click", { assistant: id, location: pathname });
      if (id === "chatgpt") {
        // No prefilled "add connector" link exists for ChatGPT: hand the URL
        // over on the clipboard so the settings page is a paste away.
        try {
          void navigator.clipboard?.writeText(MCP_SERVER_URL);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 4000);
        } catch {
          // Clipboard blocked: the card's tag still names what to paste.
        }
      }
    },
    [pathname]
  );

  const href: Record<Assistant, string> = {
    claude: claudeAddConnectorUrl(),
    chatgpt: CHATGPT_CONNECTORS_URL,
  };

  return (
    <LayoutGroup id="tavnit-connect">
      <div
        ref={rootRef}
        className={`fixed bottom-4 left-4 z-40 sm:bottom-5 sm:left-5 ${bannerOpen ? "max-sm:hidden" : ""}`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <AnimatePresence initial={false}>
          {expanded ? (
            <motion.div
              key="card"
              role="dialog"
              aria-label={t.title}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="w-[min(92vw,352px)] rounded-2xl border border-tint/10 bg-panel/95 p-3 text-fg shadow-(--shadow-sheet) backdrop-blur-md"
            >
              <div className="flex items-start gap-2 px-1.5 pb-2">
                <div className="min-w-0 flex-1">
                  <p className="font-heading text-sm font-semibold leading-snug">{t.title}</p>
                  <p className="mt-0.5 text-xs text-fg-4">{t.subtitle}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setHover(false);
                  }}
                  aria-label={t.close}
                  className="-mr-1 -mt-1 flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-fg-4 transition-colors hover:bg-tint/5 hover:text-fg"
                >
                  <X size={15} aria-hidden />
                </button>
              </div>

              <div className="space-y-1">
                {ORDER.map((id) => (
                  <a
                    key={id}
                    href={href[id]}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => onPick(id)}
                    className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-tint/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/50"
                  >
                    <Coin id={id} />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-1 text-sm font-semibold">
                        {t.items[id].label}
                        <ArrowUpRight
                          size={14}
                          aria-hidden
                          className="text-fg-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-fg-4">
                        {id === "chatgpt" && copied ? (
                          <span className="inline-flex items-center gap-1 text-ok">
                            <Check size={12} aria-hidden />
                            {t.copied}
                          </span>
                        ) : (
                          t.items[id].tag
                        )}
                      </span>
                    </span>
                  </a>
                ))}
              </div>

              <p className="px-2.5 pt-2 text-[11px] leading-snug text-fg-4/80">{t.note}</p>
            </motion.div>
          ) : (
            <motion.button
              key="stack"
              type="button"
              layout
              aria-label={t.aria}
              aria-haspopup="dialog"
              onClick={() => setOpen(true)}
              onFocus={() => setOpen(true)}
              className="group flex cursor-pointer items-end gap-2 focus-visible:outline-none"
            >
              <span className="relative block h-14 w-[66px]">
                <Coin id="chatgpt" className="absolute bottom-3 left-5 rotate-6" />
                <Coin id="claude" className="absolute bottom-0 left-0 -rotate-6" />
              </span>
              <span className="mb-1 hidden rounded-full border border-tint/10 bg-panel/90 px-3 py-1.5 text-xs font-medium text-fg-3 shadow-(--shadow-card) backdrop-blur-md transition-colors group-hover:text-fg group-focus-visible:ring-2 group-focus-visible:ring-[#3b82f6]/50 sm:block">
                {t.chip}
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </LayoutGroup>
  );
}
