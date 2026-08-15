/**
 * Post-meeting follow-up questionnaire — the sales flowchart as data.
 *
 * The branching mirrors the sales team's diagram exactly; the two `extra`
 * groups (docs_goal/volume for hot leads, usecase_hint for undecided ones) are
 * additions that map answers onto things sales can act on: which pipeline
 * stages to demo, which pricing tier fits, which use case to prepare.
 *
 * Bilingual by design: every client-facing string is a `Localized` pair.
 * Spanish is the default (current clients are in Panama); English is one
 * toggle away. The admin panel always reads Spanish.
 *
 * Kept as plain data (no React) so the questionnaire, the API validation and
 * the admin panel all read the same source. Answer keys are stable identifiers
 * stored in `followup_invites.answers` — renaming one orphans stored data.
 */

export type Lang = "es" | "en";
export const DEFAULT_LANG: Lang = "es";

export type Localized = { es: string; en: string };

/** Resolve a localized string, tolerating optional fields. */
export function tr(text: Localized | undefined, lang: Lang): string {
  return text ? text[lang] : "";
}

export type Sentiment = "loved" | "unsure" | "not_needed";

/** Lead temperature the admin panel derives from the first answer. */
export const SENTIMENT_META: Record<
  Sentiment,
  { label: string; temperature: "Caliente" | "Tibio" | "Frío"; color: string }
> = {
  loved: { label: "Le gustó, tiene casos de uso", temperature: "Caliente", color: "#10b981" },
  unsure: { label: "Le gusta, no sabe dónde usarlo", temperature: "Tibio", color: "#f59e0b" },
  not_needed: { label: "No lo necesita", temperature: "Frío", color: "#94a3b8" },
};

export type StepOption = {
  value: string;
  label: Localized;
  /** Secondary line under the label. */
  hint?: Localized;
  /** Lucide icon name resolved by the questionnaire component. */
  icon?: string;
};

export type Step = {
  id: string;
  /** Question or message headline shown to the client. */
  title: Localized;
  /** Supporting line under the title. */
  subtitle?: Localized;
  kind: "choice" | "chips" | "text" | "date" | "upload";
  /** For choice/chips steps. */
  options?: StepOption[];
  /** chips only: allow multiple selections. */
  multi?: boolean;
  /** text only: placeholder. */
  placeholder?: Localized;
  /** Steps sales can live without — renders an "Omitir"/"Skip" escape. */
  optional?: boolean;
  /** Label shown in the live "registro" panel and in the admin answer list. */
  recordLabel?: Localized;
};

/**
 * Every step in the flow, keyed by id. Navigation lives in `nextStep` below so
 * the branching reads like the diagram instead of being scattered per-step.
 */
export const STEPS: Record<string, Step> = {
  sentiment: {
    id: "sentiment",
    title: { es: "¿Cómo te pareció Tavnit?", en: "What did you think of Tavnit?" },
    subtitle: {
      es: "Sin compromiso — tu respuesta nos ayuda a preparar lo que sigue.",
      en: "No strings attached — your answer helps us prepare what comes next.",
    },
    kind: "choice",
    recordLabel: { es: "Impresión", en: "Impression" },
    options: [
      {
        value: "loved",
        label: { es: "Me gustó y lo veo muy útil", en: "I liked it and find it very useful" },
        hint: { es: "Ya tengo en mente casos de uso", en: "I already have use cases in mind" },
        icon: "sparkles",
      },
      {
        value: "unsure",
        label: {
          es: "Me gusta, pero no termino de decidir dónde lo usaría",
          en: "I like it, but I'm not sure where I'd use it yet",
        },
        icon: "compass",
      },
      {
        value: "not_needed",
        label: { es: "No lo necesito", en: "I don't need it" },
        icon: "circle-slash",
      },
    ],
  },

  // ── Rama: le gustó ────────────────────────────────────────────────
  docs_have: {
    id: "docs_have",
    title: {
      es: "¿Tienes documentos de los casos de uso que te imaginas ahora?",
      en: "Do you have documents for the use cases you have in mind?",
    },
    subtitle: {
      es: "Con documentos reales podemos armarte un demo con tus propios datos.",
      en: "With real documents we can build you a demo on your own data.",
    },
    kind: "choice",
    recordLabel: { es: "Documentos", en: "Documents" },
    options: [
      {
        value: "yes",
        label: { es: "Sí, los tengo a la mano", en: "Yes, I have them handy" },
        icon: "file-check",
      },
      {
        value: "can_get",
        label: { es: "No, pero puedo conseguirlos", en: "No, but I can get them" },
        icon: "clock",
      },
    ],
  },
  docs_upload: {
    id: "docs_upload",
    title: { es: "Puedes subir tus documentos aquí", en: "You can upload your documents here" },
    subtitle: {
      // {email} is replaced at render time with the invite's sales rep inbox.
      es: "PDF, imágenes o Excel. Si prefieres, mándalos a {email} — como te quede más cómodo.",
      en: "PDF, images or Excel. If you prefer, send them to {email} — whatever is easiest.",
    },
    kind: "upload",
    optional: true,
    recordLabel: { es: "Archivos", en: "Files" },
  },
  docs_eta: {
    id: "docs_eta",
    title: {
      es: "¿Qué día crees que puedes tenerlos?",
      en: "When do you think you could have them?",
    },
    subtitle: {
      es: "Vamos a hacerte un demo personalizado — recuerda enviar tus documentos con tiempo.",
      en: "We'll build you a personalized demo — remember to send your documents ahead of time.",
    },
    kind: "date",
    optional: true,
    recordLabel: { es: "Documentos para", en: "Documents by" },
  },
  docs_goal: {
    id: "docs_goal",
    title: {
      es: "¿Qué te gustaría que Tavnit hiciera con esos documentos?",
      en: "What would you like Tavnit to do with those documents?",
    },
    subtitle: {
      es: "Marca todo lo que aplique — así el demo va directo a lo tuyo.",
      en: "Pick everything that applies — so the demo goes straight to your case.",
    },
    kind: "chips",
    multi: true,
    optional: true,
    recordLabel: { es: "Objetivo", en: "Goal" },
    options: [
      { value: "extract", label: { es: "Extraer los datos a tablas", en: "Extract data into tables" } },
      { value: "clean", label: { es: "Limpiar y validar datos", en: "Clean and validate data" } },
      {
        value: "review",
        label: { es: "Que mi equipo revise y apruebe", en: "Have my team review and approve" },
      },
      {
        value: "agents",
        label: { es: "Que agentes de IA actúen con ellos", en: "Have AI agents act on them" },
      },
      {
        value: "integrate",
        label: { es: "Conectarlo a mis sistemas (API / MCP)", en: "Connect it to my systems (API / MCP)" },
      },
    ],
  },
  volume: {
    id: "volume",
    title: {
      es: "¿Más o menos cuántas páginas procesan al mes?",
      en: "Roughly how many pages do you process per month?",
    },
    subtitle: {
      es: "Un estimado basta — nos ayuda a recomendarte el plan correcto.",
      en: "A rough estimate is fine — it helps us recommend the right plan.",
    },
    kind: "chips",
    optional: true,
    recordLabel: { es: "Volumen mensual", en: "Monthly volume" },
    options: [
      { value: "lt100", label: { es: "Menos de 100", en: "Under 100" } },
      { value: "100-500", label: { es: "100 a 500", en: "100 to 500" } },
      { value: "500-1000", label: { es: "500 a 1,000", en: "500 to 1,000" } },
      { value: "gt1000", label: { es: "Más de 1,000", en: "Over 1,000" } },
    ],
  },

  // ── Rama: le gusta pero no sabe dónde ─────────────────────────────
  discovery: {
    id: "discovery",
    title: {
      es: "¿Quieres agendar un demo tipo discovery con el resto de tu equipo?",
      en: "Would you like a discovery demo with the rest of your team?",
    },
    subtitle: {
      es: "A veces el caso de uso lo tiene claro otra persona del equipo.",
      en: "Sometimes someone else on the team is the one who sees the use case clearly.",
    },
    kind: "choice",
    recordLabel: { es: "Demo discovery", en: "Discovery demo" },
    options: [
      { value: "yes", label: { es: "Sí, me interesa", en: "Yes, I'm interested" }, icon: "users" },
      {
        value: "no",
        label: { es: "Lo quiero pensar o consultarlo", en: "I want to think it over or ask around" },
        icon: "message-circle",
      },
    ],
  },
  discovery_who: {
    id: "discovery_who",
    title: { es: "¿Con quiénes te gustaría hacerlo?", en: "Who would you like to include?" },
    subtitle: {
      es: "Nombres, cargos o áreas — como lo tengas en mente.",
      en: "Names, roles or departments — however you think of them.",
    },
    kind: "text",
    placeholder: {
      es: "Ej.: María de operaciones, el equipo de contabilidad…",
      en: "E.g.: María from operations, the accounting team…",
    },
    recordLabel: { es: "Participantes", en: "Participants" },
  },
  usecase_hint: {
    id: "usecase_hint",
    title: {
      es: "¿Cuál de estos se parece más a los documentos que manejan?",
      en: "Which of these looks most like the documents you handle?",
    },
    subtitle: {
      es: "Con esto preparamos ejemplos que se sientan como tu día a día.",
      en: "This lets us prepare examples that feel like your day-to-day.",
    },
    kind: "chips",
    multi: true,
    optional: true,
    recordLabel: { es: "Documentos del día a día", en: "Day-to-day documents" },
    options: [
      { value: "invoices", label: { es: "Facturas de proveedores", en: "Supplier invoices" } },
      { value: "customs", label: { es: "Aduanas y logística", en: "Customs & logistics" } },
      { value: "contracts", label: { es: "Contratos", en: "Contracts" } },
      { value: "bank", label: { es: "Estados de cuenta", en: "Bank statements" } },
      { value: "hr", label: { es: "Documentos de RR. HH.", en: "HR documents" } },
      { value: "orders", label: { es: "Órdenes de compra", en: "Purchase orders" } },
      { value: "other", label: { es: "Otro", en: "Other" } },
    ],
  },

  // ── Rama: no lo necesita ──────────────────────────────────────────
  why_not: {
    id: "why_not",
    title: {
      es: "Se vale — ¿cuál se acerca más a tu caso?",
      en: "Fair enough — which is closest to your case?",
    },
    kind: "choice",
    recordLabel: { es: "Motivo", en: "Reason" },
    options: [
      {
        value: "have_similar",
        label: {
          es: "Ya tengo algo similar y funciona bien",
          en: "I already have something similar and it works well",
        },
        icon: "layers",
      },
      {
        value: "no_problem",
        label: {
          es: "No tengo este problema / tenemos pocos documentos",
          en: "I don't have this problem / we handle few documents",
        },
        icon: "inbox",
      },
    ],
  },
  platform_name: {
    id: "platform_name",
    title: {
      es: "Si no te molesta, ¿cómo se llama la plataforma con la que trabajan?",
      en: "If you don't mind — what's the platform you work with called?",
    },
    subtitle: {
      es: "Solo por curiosidad profesional — nos gusta saber qué funciona bien.",
      en: "Just professional curiosity — we like knowing what works well.",
    },
    kind: "text",
    optional: true,
    placeholder: { es: "Nombre de la herramienta", en: "Name of the tool" },
    recordLabel: { es: "Usan hoy", en: "Using today" },
  },
};

/**
 * The diagram's arrows. Returns the next step id, or "end" when the path is
 * done. `answers` holds everything answered so far, keyed by step id.
 */
export function nextStep(current: string, answers: Record<string, unknown>): string {
  switch (current) {
    case "sentiment":
      switch (answers.sentiment) {
        case "loved":
          return "docs_have";
        case "unsure":
          return "discovery";
        default:
          return "why_not";
      }
    case "docs_have":
      return answers.docs_have === "yes" ? "docs_upload" : "docs_eta";
    case "docs_upload":
      return "docs_goal";
    case "docs_eta":
      return "docs_goal";
    case "docs_goal":
      return "volume";
    case "volume":
      return "end";
    case "discovery":
      return answers.discovery === "yes" ? "discovery_who" : "usecase_hint";
    case "discovery_who":
      return "usecase_hint";
    case "usecase_hint":
      return "end";
    case "why_not":
      return answers.why_not === "have_similar" ? "platform_name" : "end";
    case "platform_name":
      return "end";
    default:
      return "end";
  }
}

/** First question after the welcome screen. */
export const FIRST_STEP = "sentiment";

/**
 * Longest remaining chain from a step, counting the step itself. Drives the
 * "quedan ~N preguntas" hint without pretending to know the exact path.
 */
export function stepsRemaining(current: string): number {
  const longest: Record<string, number> = {
    sentiment: 5,
    docs_have: 4,
    docs_upload: 3,
    docs_eta: 3,
    docs_goal: 2,
    volume: 1,
    discovery: 3,
    discovery_who: 2,
    usecase_hint: 1,
    why_not: 2,
    platform_name: 1,
  };
  return longest[current] ?? 1;
}

/** Human-readable value for the record panel and the admin answer list. */
export function formatAnswer(stepId: string, value: unknown, lang: Lang = "es"): string {
  const step = STEPS[stepId];
  if (value == null || value === "") return "—";
  if (Array.isArray(value)) {
    const labels = value.map((v) => {
      const opt = step?.options?.find((o) => o.value === v);
      return opt ? tr(opt.label, lang) : String(v);
    });
    return labels.join(", ");
  }
  const opt = step?.options?.find((o) => o.value === value);
  if (opt) return tr(opt.label, lang);
  if (stepId === "docs_eta" && typeof value === "string") {
    // Noon avoids the off-by-one-day shift when a bare date parses as UTC.
    const date = new Date(`${value}T12:00:00`);
    if (!Number.isNaN(date.getTime())) {
      return date.toLocaleDateString(lang === "es" ? "es" : "en", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
  }
  return String(value);
}
