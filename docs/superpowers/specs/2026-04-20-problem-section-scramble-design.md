# Problem Section — Text Scramble Transformation

## Overview

Replace the static problem cards with an interactive hover experience: when users hover a problem card, the text "decodes" into Tavnit's solution using a per-character scramble animation.

## Content Mapping

| # | Problem Title | Solution Title |
|---|---|---|
| 1 | Hours lost to manual data entry | Instant automated extraction |
| 2 | Errors multiply at scale | 99.9% accuracy, every time |
| 3 | No visibility or control | Full audit trail & approval flow |

| # | Problem Description | Solution Description |
|---|---|---|
| 1 | Your team re-types the same fields from PDFs into spreadsheets — every day, across dozens of document types | Tavnit extracts structured data from any document in seconds — no templates, no manual work |
| 2 | One typo in an invoice number cascades downstream. Different formats, handwriting, and layouts make mistakes inevitable | AI-powered validation catches errors before they propagate. Consistent output regardless of input format |
| 3 | No audit trail, no approval workflow, no way to know if extracted data was reviewed or who handled it | Every extraction logged, every change tracked. Built-in review workflows with role-based permissions |

## Animation Mechanics

### Text Scramble Effect

1. On `mouseenter`, fire scramble on title (immediately) and description (after 100ms delay)
2. Each character position cycles through 3-5 random characters from charset `!@#$%^&*0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ`
3. Characters resolve left-to-right with ~20ms stagger per character
4. Total animation duration: ~400-600ms depending on text length
5. On `mouseleave`, reverse — scramble back to problem text with same effect

### Implementation

- Use `useRef` for direct DOM manipulation of text content (avoids React re-renders)
- `requestAnimationFrame` loop drives the animation
- Track animation state to handle rapid hover/unhover (cancel in-flight animation, start new one from current state)
- Charset for scramble: `!@#$%^&*0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ`

### Icon Transition

- On hover: icon morphs from problem icon (red) to solution icon (emerald) with a quick scale pulse (1.0 → 1.2 → 1.0 over 300ms)
- Problem icons: `AlertCircle`, `AlertTriangle`, `Shield` (lucide-react, already imported)
- Solution icons: `Zap`, `Target`, `Eye` (lucide-react)
- Color transition: `red-400` → `emerald-400` (already partially implemented via `group-hover`)

### Card Visual Changes on Hover

- Border: subtle emerald glow (`rgba(16, 185, 129, 0.25)`) instead of current primary blue
- Background: slight emerald tint (`rgba(16, 185, 129, 0.03)`)
- A faint horizontal gradient line (~2px tall, emerald-to-transparent) sweeps left-to-right across the card as scramble fires (CSS animation, 600ms)

## Component Architecture

### Modified `Problem.tsx`

- Data structure changes from array of problems to array of `{ problem, solution }` pairs
- Each pair contains: `{ icon, title, description }` for both states
- Extract scramble logic into a custom hook: `useTextScramble(elementRef, targetText, options)`

### `useTextScramble` Hook

```typescript
interface ScrambleOptions {
  duration?: number;      // total ms, default 400
  stagger?: number;       // ms per char, default 20
  charset?: string;       // random char pool
  iterations?: number;    // cycles per char before resolving, default 4
}

function useTextScramble(ref: RefObject<HTMLElement>, options?: ScrambleOptions) {
  return {
    scrambleTo: (text: string) => void;  // trigger animation to target text
    cancel: () => void;                   // cancel in-flight animation
  };
}
```

### Scan Line Effect

- CSS `::after` pseudo-element on the card
- `translateX(-100%)` → `translateX(100%)` over 600ms on hover
- Thin (2px) gradient: transparent → emerald-400/30 → transparent
- `pointer-events: none`, `position: absolute`, `overflow: hidden` on card

## Mobile / Touch

- Detect touch via `@media (hover: none) and (pointer: coarse)` or `ontouchstart` check
- On touch devices: tap toggles between problem/solution state
- Use local state boolean `isShowingSolution` to track
- Same scramble animation plays on tap

## Performance

- No React state updates during animation (direct DOM via refs)
- `requestAnimationFrame` for timing
- Animation cleanup on unmount and on rapid state changes
- No layout thrashing — only `textContent` changes (paint-only, no reflow)

## Accessibility

- `aria-label` on each card with both problem and solution text
- `prefers-reduced-motion`: skip scramble, do instant text swap with a simple crossfade (opacity 0 → 1, 200ms)

## Files Modified

- `src/components/Problem.tsx` — main rewrite
- `src/app/globals.css` — add scan-line keyframe for problem cards, update hover colors

## Files Created

- `src/hooks/useTextScramble.ts` — reusable scramble hook
