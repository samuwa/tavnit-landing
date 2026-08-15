# Product Marketing Context

**Document version:** v2
**Last updated:** 2026-08-15

## Product Overview
**One-liner:** Tavnit turns messy documents (and even sales calls) into clean, reviewed, structured data your team and AI agents can act on.
**What it does:** An AI document-operations pipeline: extract typed fields and line items from any PDF/scan (no per-vendor templates), clean and validate them with rule- and AI-based Cleaners, route documents automatically, pause for human review when it matters, then act — fill PDF forms, compare quotes, drive browser agents into supplier portals, or push data anywhere via API/webhooks/MCP.
**Product category:** AI document processing / intelligent document automation (buyers search "invoice data extraction software", "document AI").
**Product type:** B2B SaaS, multi-tenant, EN/ES bilingual.
**Business model:** Credit-based subscriptions — Starter $16/100cr · Growth $77/550cr · Pro $138/1,150cr · Enterprise $599/6,000cr; 1 credit = 1 page; extra credits $0.16. Enterprise custom contracts with auto-sent monthly spend statements.

## Target Audience
**Target companies:** Import/export and customs brokerage (Panama-first), freight & logistics, procurement/AP teams, retail with field-sales ops, insurance. LatAm Spanish-speaking market is primary; product is fully bilingual.
**Decision-makers:** Operations managers, finance/AP leads, customs brokers, IT/integration owners.
**Primary use case:** Stop re-typing data from supplier documents (invoices, packing lists, customs forms) into spreadsheets and systems.
**Jobs to be done:**
- "Read these documents and give me clean tables — without building a template per vendor."
- "Don't let bad data through — my team approves before anything posts."
- "Act on the data: fill the customs declaration, compare the quotes, check the portal."

## Problems & Pain Points
**Core problem:** The same fields re-typed from a hundred different layouts, every month; template-based tools break silently when vendors change formats.
**Why alternatives fall short:** Template OCR tools need per-vendor setup; generic "chat with your PDF" tools hallucinate numbers and have no review, audit trail, or downstream actions.
**What it costs them:** Hours of data entry, errors flowing into ledgers/declarations, missed reconciliations.
**Emotional tension:** "A wrong total looks exactly like a right one." Fear of silent errors reaching customs or accounting.

## Differentiation (much of this is under-marketed today)
- **Panama HS-code / tariff classifier**: purpose-built cascade over the official Arancel Nacional (VII Enmienda, HS 2022), 9,671 national tariff lines with DAI/ITBMS/ISC taxes, legal chapter notes and GRI rules. Customs-broker-grade — a vertical product on its own.
- **Browser Agents**: bots with a mission ("log into the supplier portal, capture invoice status"), typed outputs, file downloads. 3 credits/min.
- **Email-native operation**: forward a PDF to a collection/splitter/flow address and get structured data back — zero integration.
- **Human-in-the-loop** with full audit trail, conditional review (only failures routed to humans), and a reviewer-only role.
- **Ask-your-data that can't hallucinate**: NL questions compile to validated plans executed in Postgres; the model never does arithmetic.
- **Signals/Waves**: field-sales call recordings → diarized, structured conversation data (companion Android recorder app).
- **Inspectors** (deterministic compliance checklists with PDF reports), **Fillers** (auto-complete customs declarations from extracted data), **Matchers** (quote comparison / invoice↔PO reconciliation with a Champion column).
- **Model-routing stack**: OpenAI + Claude fallback, Mistral OCR, Voyage rerank, Speechmatics — not a single-API wrapper.

## Objections
| Objection | Response |
|-----------|----------|
| "We already have an OCR tool" | Ask what happens when a vendor changes their layout, and who catches a wrong total. Tavnit needs no templates and routes only failures to review. |
| "We handle few documents" | Starter is $16/mo; email-forwarding means zero setup. Volume question in the follow-up form surfaces real fit. |
| "AI gets numbers wrong" | Review-before-post, arithmetic cross-checks via Cleaners, and analytics that only report what Postgres computed. |

**Anti-persona:** Teams with truly trivial document volume and no compliance/review needs.

## Customer Language
**Register:** Spanish "tú", friendly-professional, concrete examples ("ej. …"), product nouns kept in English (Flow, Cleaner, Bucket, Run). Exclamation marks only for real wins.
**Words to use:** "extraer", "tus documentos", "revisar y aprobar", "sin plantillas", "datos estructurados".
**Words to avoid:** hype ("revolucionario"), "usted", vague AI-speak.

## Brand Voice
**Tone:** Warm-professional, direct, example-driven. **Personality:** capable, precise, unpretentious, bilingual.
Visual: dark glassmorphism, accent #3b82f6 → #6c42f0 gradient (reserved for hero moments), Plus Jakarta Sans / DM Sans.

## Goals
**Business goal:** Convert first-demo prospects into personalized-demo bookings (post-meeting follow-up flow, Aug 2026).
**Conversion action:** Prospect completes the /s/[token] questionnaire and books the next meeting.

## Known gaps (facts, verified in code 2026-08-15)
- Sales contacts are **arie@tavnit.io** and **samuel@tavnit.io** (per the user, 2026-08-15). The follow-up form uses `SALES_EMAIL` in `src/lib/site.ts` (currently arie@). No `demo@`/`sales@` alias exists.
- No meeting-scheduler (Calendly/Cal.com) link exists in any repo — `FOLLOWUP_SCHEDULER_URL` must be provisioned.
- No CRM/leads table existed before `followup_invites` (2026-08-15).
- Timezone picker in-app lacks America/Panama despite the Panama tariff feature.

## Changelog
- v2 (2026-08-15) — Sales contacts identified: arie@tavnit.io / samuel@tavnit.io own sales; follow-up form now points at arie@ via SALES_EMAIL.
- v1 (2026-08-15) — Initial context, auto-drafted from tavnit-flask, tavnit-nextjs, tavnit-admin and the landing repo while building the post-meeting follow-up questionnaire.
