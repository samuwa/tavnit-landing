import type { Lang } from "./flow";

/**
 * UI chrome for the questionnaire (everything that isn't a question — those
 * live next to their step in flow.ts). Spanish is the source copy; English
 * mirrors it. Same shape per language so a missing key is a type error.
 */
export const UI: Record<
  Lang,
  {
    lessThanAMinute: string;
    welcomeKicker: (company: string | null) => string;
    welcomeTitle: (name: string) => [string, string, string];
    welcomeBody1: string;
    welcomeBodyEmphasis: string;
    welcomeBody2: string;
    start: string;
    back: string;
    lastQuestion: string;
    remaining: (n: number) => string;
    continueLabel: string;
    readyContinue: string;
    skip: string;
    dontKnowYet: string;
    preferEmail: string;
    dropzoneTitle: string;
    dropzoneHint: string;
    fileTooLarge: (name: string, email: string) => string;
    uploadFailed: (name: string, email: string) => string;
    filesAnswer: (n: number) => string;
    doneColdTitle: (name: string) => string;
    doneColdBody: string;
    doneColdCta: string;
    doneWarmTitle: (name: string) => string;
    doneWarmDocs: string;
    doneWarmDiscovery: string;
    doneWarmDefault: string;
    doneWarmCta: string;
    seeYouSoon: string;
    recordHeader: string;
    recordClient: string;
    recordCompany: string;
    recordFiles: (n: number) => string;
    recordDone: string;
    recordWorking: string;
    recordFootnote: string;
    invalidTitle: string;
    invalidBody1: string;
    invalidBody2: string;
  }
> = {
  es: {
    lessThanAMinute: "Menos de un minuto",
    welcomeKicker: (company) => (company ? `Tavnit × ${company}` : "Tavnit"),
    welcomeTitle: (name) => ["Gracias, ", name, ", por tu valioso tiempo el día de hoy."],
    welcomeBody1: "Sabemos que una implementación es un proceso que puede demorar — ",
    welcomeBodyEmphasis: "este formulario no",
    welcomeBody2: ". Son 3 a 5 preguntas y nos ayudan a preparar exactamente lo que necesitas.",
    start: "Empezar",
    back: "Volver",
    lastQuestion: "Última pregunta",
    remaining: (n) => `Quedan ~${n} preguntas`,
    continueLabel: "Continuar",
    readyContinue: "Listo, continuar",
    skip: "Omitir",
    dontKnowYet: "Aún no lo sé",
    preferEmail: "Prefiero mandarlos por correo",
    dropzoneTitle: "Arrastra tus documentos o haz clic para elegirlos",
    dropzoneHint: "PDF, imágenes o Excel · hasta 10 MB por archivo",
    fileTooLarge: (name, email) => `"${name}" pasa de 10 MB — mándalo mejor a ${email}.`,
    uploadFailed: (name, email) => `No pudimos subir "${name}". Inténtalo de nuevo o mándalo a ${email}.`,
    filesAnswer: (n) => `${n} archivo(s)`,
    doneColdTitle: (name) => `Muchas gracias por tu tiempo, ${name}.`,
    doneColdBody:
      "Esperamos vernos pronto. Si el volumen de documentos crece o el problema aparece, ya sabes dónde encontrarnos.",
    doneColdCta: "Agendar una reunión de todos modos",
    doneWarmTitle: (name) => `¡Listo, ${name}! Agenda tu próxima reunión.`,
    doneWarmDocs: "Vamos a hacerte un demo personalizado — recuerda enviar tus documentos con tiempo.",
    doneWarmDiscovery: "Preparamos un demo discovery para ti y tu equipo.",
    doneWarmDefault: "Con lo que nos contaste, la próxima sesión va directa a tu caso.",
    doneWarmCta: "Agenda tu demo personalizado",
    seeYouSoon: "¡Gracias, nos vemos pronto!",
    recordHeader: "Registro · Tavnit",
    recordClient: "cliente",
    recordCompany: "empresa",
    recordFiles: (n) => `${n} recibido${n > 1 ? "s" : ""}`,
    recordDone: "✓ registro completo — listo para tu demo",
    recordWorking: "estructurando respuestas…",
    recordFootnote:
      "Así se ve un documento después de pasar por Tavnit: campos estructurados, listos para revisar y actuar.",
    invalidTitle: "Este link no está activo",
    invalidBody1: "Puede que haya expirado o que la dirección esté incompleta. Escríbenos a ",
    invalidBody2: " y te lo reenviamos.",
  },
  en: {
    lessThanAMinute: "Less than a minute",
    welcomeKicker: (company) => (company ? `Tavnit × ${company}` : "Tavnit"),
    welcomeTitle: (name) => ["Thank you, ", name, ", for your valuable time today."],
    welcomeBody1: "We know an implementation can take a while — ",
    welcomeBodyEmphasis: "this form won't",
    welcomeBody2: ". It's 3 to 5 questions, and they help us prepare exactly what you need.",
    start: "Start",
    back: "Back",
    lastQuestion: "Last question",
    remaining: (n) => `~${n} questions left`,
    continueLabel: "Continue",
    readyContinue: "Done, continue",
    skip: "Skip",
    dontKnowYet: "I don't know yet",
    preferEmail: "I'd rather send them by email",
    dropzoneTitle: "Drag your documents here or click to choose",
    dropzoneHint: "PDF, images or Excel · up to 10 MB per file",
    fileTooLarge: (name, email) => `"${name}" is over 10 MB — better send it to ${email}.`,
    uploadFailed: (name, email) => `We couldn't upload "${name}". Try again or send it to ${email}.`,
    filesAnswer: (n) => `${n} file(s)`,
    doneColdTitle: (name) => `Thank you so much for your time, ${name}.`,
    doneColdBody:
      "We hope to see you soon. If document volume grows or the problem shows up, you know where to find us.",
    doneColdCta: "Schedule a meeting anyway",
    doneWarmTitle: (name) => `All set, ${name}! Schedule your next meeting.`,
    doneWarmDocs: "We'll build you a personalized demo — remember to send your documents ahead of time.",
    doneWarmDiscovery: "We'll prepare a discovery demo for you and your team.",
    doneWarmDefault: "With what you told us, the next session goes straight to your case.",
    doneWarmCta: "Schedule your personalized demo",
    seeYouSoon: "Thank you — see you soon!",
    recordHeader: "Record · Tavnit",
    recordClient: "client",
    recordCompany: "company",
    recordFiles: (n) => `${n} received`,
    recordDone: "✓ record complete — ready for your demo",
    recordWorking: "structuring answers…",
    recordFootnote:
      "This is what a document looks like after Tavnit: structured fields, ready to review and act on.",
    invalidTitle: "This link isn't active",
    invalidBody1: "It may have expired, or the address may be incomplete. Write to us at ",
    invalidBody2: " and we'll resend it.",
  },
};
