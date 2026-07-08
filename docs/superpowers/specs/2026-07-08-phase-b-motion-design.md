# Xiaro Marketing Site — Phase B: Motion & Interactivity (Design Spec)

Date: 2026-07-08
Repo: TEFUI-MAIN/xiaro-web, branch feat/phase-b-motion (off main @ a2327f7, Phase A merged)
Status: Approved by owner 2026-07-08

## 1. Overview

Phase B layers motion and interactivity onto the Phase A paper-and-ink base:
an animated hero telling the message-journey story, scrollytelling
how-it-works on desktop, an upgraded ROI calculator that hands off to the
pricing page, and a client-side simulated demo playground. All animation uses
framer-motion (already a dependency); every animated surface has a
reduced-motion/static fallback.

## 2. Decisions log (owner-approved)

| Topic | Decision |
|---|---|
| Demo widget | Client-side simulated playground, badged "SIMULATION"; no real numbers, no backend |
| ROI leads | No email gate; frictionless results + hand-off button to /pricing with driver count |
| Animation stack | framer-motion only; no GSAP, no CSS scroll-timelines, no new deps |
| Scrollytelling | Desktop (lg+) enhancement only; mobile and reduced-motion keep Phase A static layout |
| Design language | Phase A tokens unchanged (paper/ink/green/amber/signal, display/sans/mono) |

## 3. Non-goals

- No real SMS/WhatsApp demo number, no backend services, no lead capture.
- No changes to pricing model, checkout, SEO structure, or the product repo.
- No redesign of Phase A sections beyond the four features below.
- No new npm dependencies.

## 4. Shared core: `lib/sim.ts` (pure, tested)

One module feeds the hero loop, the scrollytelling panel, and the playground,
so the whole page tells one coherent story with the same fictional people as
the real product screenshots (Paramour fixtures).

```ts
export type Supervisor = { name: string; shift: "day" | "afternoon" | "night" };
// Roster fixture (matches screenshots):
//   Sarah Ng    — day       06:00–14:00
//   James Patel — afternoon 14:00–22:00
//   Emma Wilson — night     22:00–06:00 (overnight wrap)

resolveShift(minutesSinceMidnight: number): Supervisor
// boundary rule: start-inclusive, end-exclusive; overnight wraps.

export type SimEvent = {
  atSec: number;              // seconds since send, drives playback timing
  clock: string;              // "02:47:00" wall-clock stamp for display
  kind: "inbound" | "roster" | "delivered" | "reply" | "escalate" | "logged";
  text: string;               // human line for the event log
  tone: "ink" | "green" | "amber" | "signal";
};

buildTimeline(opts: {
  message: string;            // trimmed, sliced to 80 chars
  sendMinutes: number;        // time of day chosen
  answers: boolean;           // supervisor answers or misses it
}): SimEvent[]
// answers=true : inbound → roster → delivered → reply(+2m) → logged
// answers=false: inbound → roster → delivered → escalate(+5m, escalation
//                contact) → escalate(+15m, duty manager) → reply from duty
//                manager(+16m) → logged
// Playback compresses minutes to ~1.2s per event via atSec (0,1,2,3.5,…);
// clock stamps show the honest wall-clock times.
```

Escalation ladder times mirror the Phase A ladder copy: +5:00 escalation
contact, +15:00 duty manager (the +25:00 admin-alert rung is not simulated —
the duty manager answers in the demo so every run ends resolved).

Tests (vitest): shift boundaries (05:59→night, 06:00→day, 13:59→day,
14:00→afternoon, 21:59→afternoon, 22:00→night, 02:47→night), answered
timeline event sequence, missed timeline includes both escalation rungs and
ends logged, message trimming/slicing.

## 5. Feature A — Animated hero ("journey loop")

Replaces the static `PhoneFrame(ChatMock)` right column of the Hero with
`components/hero/JourneyLoop.tsx` (client):

- Four scenes, cross-faded with AnimatePresence inside the same mat card the
  phone occupies today (fixed height ≈ 600px to prevent layout shift):
  1. **Inbound** — WhatsApp-style bubble ("Truck 41 — flat tyre on the M7,
     need a tow" · 02:47) slides in.
  2. **Roster scan** — mini roster grid (3 rows: Sarah/James/Emma with shift
     times in mono); a scan highlight sweeps and locks on Emma Wilson
     (night), green "ON SHIFT" chip stamps in.
  3. **Delivered** — small phone header (Emma's initials), message bubble
     lands, typing dots, reply bubble ("Tow booked, ETA 40 min.") with ✓✓.
  4. **Escalation branch** — banner "If Emma hadn't answered:" then the
     ladder rungs light in sequence with amber mono timers (+5:00, +15:00),
     ending chip "NOBODY FALLS THROUGH".
- Mono timestamp rail under the card advances per scene (02:47:00 →
  02:47:01 → 02:49:12 → alternate timeline).
- Timing: ~3s per scene, ~12s loop; driven by a `useEffect` interval holding
  a scene index; pauses when off-viewport (whileInView gate) and on hover.
- `useReducedMotion()` → render the Phase A static `ChatMock` in a
  `PhoneFrame` exactly as today (ChatMock is kept for this purpose).
- Scene visuals are subcomponents in the same file unless they exceed ~80
  lines each; the roster mini-grid is exported (`RosterMini`) for reuse by
  the scrolly panel.

## 6. Feature B — Scrollytelling how-it-works (desktop enhancement)

`components/sections/HowItWorksScrolly.tsx` (client) wraps the existing
static content:

- **lg+ and motion allowed:** a `min-h-[320vh]` section; left column: four
  step blocks (the three Phase A steps + "Nobody answers? It climbs the
  ladder.") each occupying ~80vh so one is centred at a time; right column:
  `sticky top-24` panel that cross-fades between four visuals keyed to the
  active step — (1) inbound bubble, (2) `RosterMini` locking a row, (3)
  delivered/reply chips ("READ 02:47", "REPLY LOGGED 02:49"), (4) the Phase A
  escalation ladder card as-is.
- Active step from `useScroll` progress over the section mapped to index
  (thresholds at 0.25/0.5/0.75); both columns react (inactive step text at
  40% opacity).
- **Mobile (<lg) or reduced motion:** render the existing Phase A
  `HowItWorks` markup unchanged (the static component remains the single
  source of the copy and ladder; scrolly imports its pieces rather than
  duplicating copy — step copy array is exported from a shared
  `components/sections/how-it-works-content.ts`).
- The `#how-it-works` anchor stays on the section wrapper.

## 7. Feature C — ROI calculator upgrade

Edits to `components/sections/CostAndScenarios.tsx`:

- **Breakdown bar:** above the results row, a single stacked horizontal bar
  (height 12px, rounded) showing the four loss components (mis-routes /
  SLA breaches / breakdown response / admin time) as proportional segments
  in signal/amber/muted tones; a mono legend underneath shows each label +
  annual $ value. Segments animate width via framer-motion `layout`/spring
  on slider change. Percentages derive from the existing loss formula terms.
- **Hand-off:** primary Button "See your price for {drivers} drivers →"
  linking to `/pricing?drivers={drivers}` placed with the results.
- `components/pricing/PricingCalculator.tsx` reads the `drivers` query param
  on mount (via `useSearchParams`, clamped 1–1000, integer) as the initial
  driver count. The pricing page wraps the calculator in `<Suspense>` (Next
  requirement for useSearchParams in a static page).

## 8. Feature D — Simulated demo playground

New section `components/sections/Playground.tsx` (client), placed between
HowItWorks and ProductTour on `/`, `id="try-it"`. The header nav gains a
fifth link "Try it" (`/#try-it`) between "Product" and "Industries".

Layout: SectionHeading № 04 / eyebrow "Try it" / title "Watch a message find
its owner." Playground takes № 04; ProductTour, Industries and
PricingSummary renumber to № 05, 06, 07.

- Badge row: `Chip tone="amber"` "SIMULATION" + caption "Fixture roster —
  the real product does this with your roster, on your number."
- **Controls (left column):**
  - Scenario select: three canned messages (flat tyre 02:47 AM night ·
    "Customer not at dock 4" 10:18 AM day · "Temperature alarm on trailer
    display" 2:05 PM changeover) — picking one sets message + time; plus a
    free-text input (maxLength 80) and a time-of-day select (the three
    times) for custom runs.
  - Toggle: "Supervisor answers" / "Supervisor misses it" (segmented control
    like the pricing interval toggle).
  - `Button` "Run the routing ▶" (disabled while playing).
- **Event log (right column):** paper card, mono text; events from
  `buildTimeline` appear sequentially (each at its `atSec`, via timeouts;
  all timers cleaned up on unmount/re-run) as rows: `clock` stamp + text +
  tone-coloured dot; ends with a green "LOGGED · AUDIT ROW WRITTEN" chip.
  Container is `aria-live="polite"`; a "Replay" ghost button appears when
  done; reduced motion renders the full list instantly (no staggering).
- Under the log: Button outline "Book a demo" → BOOKING_URL.

## 9. Files

```
lib/sim.ts, lib/sim.test.ts                       new — pure core + tests
components/hero/JourneyLoop.tsx                    new — hero loop (+RosterMini export)
components/sections/how-it-works-content.ts        new — shared step copy
components/sections/HowItWorksScrolly.tsx          new — scrolly wrapper
components/sections/Playground.tsx                 new — simulation
components/sections/Hero.tsx                       edit — JourneyLoop, keep reduced-motion ChatMock path
components/sections/HowItWorks.tsx                 edit — consume shared content module
components/sections/CostAndScenarios.tsx           edit — breakdown bar + hand-off
components/pricing/PricingCalculator.tsx           edit — ?drivers= prefill
app/pricing/page.tsx                               edit — Suspense wrapper
app/page.tsx                                       edit — Playground placement, HowItWorksScrolly
components/sections/Header.tsx                     edit — "Try it" nav link
components/sections/ProductTour.tsx / Industries.tsx / PricingSummary.tsx — edit № renumber
```

## 10. Quality gates

- No new npm dependencies; `/` first-load JS ≤ 145 kB (Phase A: 133 kB).
- Lighthouse (desktop) on `/`: Performance ≥ 95, Accessibility ≥ 96, SEO 100;
  `/pricing` Accessibility 100.
- Every animated surface: `useReducedMotion` static fallback; playground log
  `aria-live`; all controls keyboard-operable with visible focus.
- vitest: existing 10 tests plus lib/sim suite, all green.
- Phase A grep gate unchanged and still zero matches.
- Playwright pass at 375/768/1440 on `/` and `/pricing`; scrolly verified by
  scripted scroll (step 2 visual active at mid-section); playground verified
  by scripted run (final "LOGGED" chip appears for both toggle states);
  `?drivers=120` prefill verified.
- `npm run build` green at every commit.

## 11. Risks

- **Scroll-jank risk on the pinned section**: mitigated by transform/opacity
  animations only (no layout properties) and desktop-only scope.
- **Hero loop LCP**: hero headline remains the LCP element; JourneyLoop
  mounts with the page but first scene is lightweight DOM (no images).
- **useSearchParams static rendering**: requires Suspense boundary — spec'd
  in §7; watch for prerender warnings in build output.
