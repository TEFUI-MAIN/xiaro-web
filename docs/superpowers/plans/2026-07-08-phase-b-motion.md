# Phase B Motion & Interactivity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Animated message-journey hero, desktop scrollytelling how-it-works, ROI-to-pricing hand-off with animated loss breakdown, and a client-side simulated routing playground — all on the Phase A base.

**Architecture:** One pure, vitest-tested module (`lib/sim.ts`) generates roster resolutions and event timelines; four presentation layers (hero loop, scrolly panel, ROI bar, playground) render it with framer-motion. Scrollytelling and the hero loop are enhancement layers with `useReducedMotion`/mobile fallbacks to the existing Phase A static components, which remain the single source of copy.

**Tech Stack:** Next 14 app router, framer-motion 11 (`AnimatePresence`, `useScroll`, `useTransform`, `useReducedMotion`), vitest, existing Tailwind tokens. **No new dependencies.**

**Spec:** `docs/superpowers/specs/2026-07-08-phase-b-motion-design.md`

## Global Constraints

- No new npm dependencies; `/` first-load JS ≤ 145 kB (Phase A baseline 133 kB — check build output table each task).
- Phase A grep gate stays zero: `Alltel|VoIPline|Notifyre|360dialog|Twilio|free trial|\$149|\$349|\$699|cyan|gradient-to|backdrop-blur` in app/ components/ lib/.
- Every animated surface has a reduced-motion static path (`useReducedMotion()` from framer-motion); playground log is `aria-live="polite"`; all controls keyboard-operable.
- Fixture people (must match product screenshots): Sarah Ng — day 06:00–14:00 · James Patel — afternoon 14:00–22:00 · Emma Wilson — night 22:00–06:00.
- Escalation rungs in sim + copy: +5:00 escalation contact, +15:00 duty manager.
- Section №s after this phase: 01 Problem · 02 Cost · 03 How it works · 04 Try it · 05 Inside the product · 06 Industries · 07 Pricing.
- `npm run build` green before every commit; animations use transform/opacity only.

---

### Task 1: `lib/sim.ts` — pure sim core (TDD)

**Files:**
- Create: `lib/sim.ts`, `lib/sim.test.ts`

**Interfaces (produced, consumed by Tasks 3/4/6):**
- `type Supervisor = { name: string; shift: "day" | "afternoon" | "night" }`
- `type SimEvent = { atSec: number; clock: string; kind: "inbound" | "roster" | "delivered" | "reply" | "escalate" | "logged"; text: string; tone: "ink" | "green" | "amber" | "signal" }`
- `ROSTER: { name: string; shift: "day" | "afternoon" | "night"; window: string }[]` (display order Sarah, James, Emma; `window` e.g. `"06:00–14:00"`)
- `resolveShift(minutes: number): Supervisor` — start-inclusive/end-exclusive; night wraps 22:00–06:00.
- `buildTimeline({ message, sendMinutes, answers }: { message: string; sendMinutes: number; answers: boolean }): SimEvent[]`
- `clockAt(baseMinutes: number, offsetMinutes: number): string` — `"02:47"`-style 24h `HH:MM`, wraps midnight (exported for tests/UI).

- [ ] **Step 1: Write failing tests** in `lib/sim.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { buildTimeline, clockAt, resolveShift } from "./sim";

const m = (h: number, min = 0) => h * 60 + min;

describe("resolveShift", () => {
  it("resolves day/afternoon/night with inclusive starts", () => {
    expect(resolveShift(m(6)).name).toBe("Sarah Ng");
    expect(resolveShift(m(13, 59)).name).toBe("Sarah Ng");
    expect(resolveShift(m(14)).name).toBe("James Patel");
    expect(resolveShift(m(21, 59)).name).toBe("James Patel");
    expect(resolveShift(m(22)).name).toBe("Emma Wilson");
  });
  it("wraps overnight", () => {
    expect(resolveShift(m(2, 47)).name).toBe("Emma Wilson");
    expect(resolveShift(m(5, 59)).name).toBe("Emma Wilson");
  });
});

describe("clockAt", () => {
  it("formats and wraps midnight", () => {
    expect(clockAt(m(2, 47), 0)).toBe("02:47");
    expect(clockAt(m(23, 58), 5)).toBe("00:03");
  });
});

describe("buildTimeline", () => {
  it("answered: inbound→roster→delivered→reply→logged", () => {
    const t = buildTimeline({ message: "Flat tyre", sendMinutes: m(2, 47), answers: true });
    expect(t.map((e) => e.kind)).toEqual(["inbound", "roster", "delivered", "reply", "logged"]);
    expect(t[1].text).toContain("Emma Wilson");
    expect(t[3].clock).toBe("02:49");
    expect(t.every((e, i) => i === 0 || e.atSec > t[i - 1].atSec)).toBe(true);
  });
  it("missed: climbs both rungs then duty manager answers", () => {
    const t = buildTimeline({ message: "Flat tyre", sendMinutes: m(2, 47), answers: false });
    expect(t.map((e) => e.kind)).toEqual(["inbound", "roster", "delivered", "escalate", "escalate", "reply", "logged"]);
    expect(t[3].text).toContain("Escalation contact");
    expect(t[3].clock).toBe("02:52");
    expect(t[4].text).toContain("Duty manager");
    expect(t[4].clock).toBe("03:02");
  });
  it("trims and caps the message at 80 chars", () => {
    const t = buildTimeline({ message: "  " + "x".repeat(120), sendMinutes: m(10), answers: true });
    expect(t[0].text.length).toBeLessThanOrEqual(80 + 20); // "x…" payload + quoting
    expect(t[0].text).not.toMatch(/^\s/);
  });
});
```

- [ ] **Step 2:** `npx vitest run` → new file FAILS (module not found).
- [ ] **Step 3: Implement `lib/sim.ts`:**

```ts
export type Supervisor = { name: string; shift: "day" | "afternoon" | "night" };

export type SimEvent = {
  atSec: number;
  clock: string;
  kind: "inbound" | "roster" | "delivered" | "reply" | "escalate" | "logged";
  text: string;
  tone: "ink" | "green" | "amber" | "signal";
};

export const ROSTER = [
  { name: "Sarah Ng", shift: "day", window: "06:00–14:00" },
  { name: "James Patel", shift: "afternoon", window: "14:00–22:00" },
  { name: "Emma Wilson", shift: "night", window: "22:00–06:00" }
] as const;

const DAY = 24 * 60;

export function resolveShift(minutes: number): Supervisor {
  const t = ((minutes % DAY) + DAY) % DAY;
  if (t >= 6 * 60 && t < 14 * 60) return { name: "Sarah Ng", shift: "day" };
  if (t >= 14 * 60 && t < 22 * 60) return { name: "James Patel", shift: "afternoon" };
  return { name: "Emma Wilson", shift: "night" };
}

export function clockAt(baseMinutes: number, offsetMinutes: number): string {
  const t = (((baseMinutes + offsetMinutes) % DAY) + DAY) % DAY;
  const h = Math.floor(t / 60);
  const m = t % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function buildTimeline({
  message,
  sendMinutes,
  answers
}: {
  message: string;
  sendMinutes: number;
  answers: boolean;
}): SimEvent[] {
  const text = message.trim().slice(0, 80) || "Need a hand out here";
  const sup = resolveShift(sendMinutes);
  const at = (offsetMinutes: number) => clockAt(sendMinutes, offsetMinutes);

  const head: SimEvent[] = [
    { atSec: 0, clock: at(0), kind: "inbound", text: `Driver → company number: “${text}”`, tone: "ink" },
    { atSec: 1, clock: at(0), kind: "roster", text: `Roster check: ${sup.shift} shift → ${sup.name}`, tone: "green" },
    { atSec: 2, clock: at(0), kind: "delivered", text: `Delivered to ${sup.name}'s phone — reply timer armed`, tone: "green" }
  ];

  if (answers) {
    return [
      ...head,
      { atSec: 3.5, clock: at(2), kind: "reply", text: `${sup.name} replied — conversation resolved`, tone: "green" },
      { atSec: 4.5, clock: at(2), kind: "logged", text: "Audit row written — timestamped, tamper-evident", tone: "ink" }
    ];
  }
  return [
    ...head,
    { atSec: 3.5, clock: at(5), kind: "escalate", text: "No reply in 5:00 — Escalation contact notified", tone: "amber" },
    { atSec: 5, clock: at(15), kind: "escalate", text: "No reply in 15:00 — Duty manager notified", tone: "amber" },
    { atSec: 6.5, clock: at(16), kind: "reply", text: "Duty manager replied — conversation resolved", tone: "green" },
    { atSec: 7.5, clock: at(16), kind: "logged", text: "Audit row written — every hop recorded", tone: "ink" }
  ];
}
```

- [ ] **Step 4:** `npx vitest run` → all suites green (existing 10 + new).
- [ ] **Step 5:** Commit `feat: pure routing-sim core with tests`.

---

### Task 2: Shared how-it-works content + static refactor (no visual change)

**Files:**
- Create: `components/sections/how-it-works-content.ts`
- Modify: `components/sections/HowItWorks.tsx`

**Interfaces (produced):**
- `HOW_STEPS: { title: string; copy: string }[]` — the three Phase A steps verbatim, plus step 4 `{ title: "Nobody answers? It climbs the ladder.", copy: "Unanswered messages climb the escalation ladder until a human owns them. Timings are yours to set." }`
- `LADDER: { time: string; who: string; status: string; tone: "green" | "amber" | "signal" }[]` — moved verbatim from HowItWorks.
- `EscalationLadderCard` — the ladder card JSX extracted from HowItWorks as a named export (same file `HowItWorks.tsx`), so scrolly can reuse it.

- [ ] **Step 1:** Move step copy + ladder array into `how-it-works-content.ts`; export `EscalationLadderCard` from `HowItWorks.tsx`; consume both in the static section. Icons stay in `HowItWorks.tsx` (content module stays data-only, no JSX/lucide imports).
- [ ] **Step 2:** `npm run build` green; page renders identically (spot-check dev output of `/`).
- [ ] **Step 3:** Commit `refactor: extract how-it-works content and ladder card for reuse`.

---

### Task 3: Hero journey loop

**Files:**
- Create: `components/hero/JourneyLoop.tsx` (client)
- Modify: `components/sections/Hero.tsx`

**Interfaces:**
- Consumes: `ROSTER`, `resolveShift` from `lib/sim`; `Chip`, `PhoneFrame`, `ChatMock`.
- Produces: `JourneyLoop()` (no props); `RosterMini({ activeIndex }: { activeIndex: number | null })` exported for Task 4.

- [ ] **Step 1: Build `JourneyLoop`.** Client component:
  - `const reduce = useReducedMotion();` → if true, `return <div className="rotate-1 rounded-2xl border border-hairline bg-card p-4 sm:p-8"><PhoneFrame><ChatMock /></PhoneFrame></div>` (exact Phase A markup).
  - Scene state: `const [scene, setScene] = useState(0)`; `useEffect` interval 3000ms → `setScene(s => (s + 1) % 4)`; gate with `useInView(ref)` and hover (`onMouseEnter` clears, `onMouseLeave` resumes) — pause = don't advance.
  - Shell: fixed-size mat `<div ref={ref} className="relative h-[600px] w-[340px] sm:w-[380px] rounded-2xl border border-hairline bg-card p-5 overflow-hidden">`, `<AnimatePresence mode="wait">` with `<motion.div key={scene} initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} transition={{duration:0.35}}>` per scene.
  - Scene 0 **Inbound**: mono eyebrow `02:47 — INBOUND`, WhatsApp-style white bubble with "Truck 41 — flat tyre on the M7, need a tow", chip `ink` "Company number · WhatsApp".
  - Scene 1 **Roster scan**: eyebrow `02:47 — ROSTER CHECK`, `<RosterMini activeIndex={2} />`, chip `green` "Emma Wilson · ON SHIFT".
  - Scene 2 **Delivered**: eyebrow `02:47 — DELIVERED`, mini phone header (`EW` initial disc + "Emma Wilson · night shift"), inbound bubble, then reply bubble `#D9FDD3` "Tow booked, ETA 40 min. Sit tight." with `02:49 ✓✓`, chip `green` "REPLY LOGGED 02:49".
  - Scene 3 **Escalation branch**: eyebrow `IF EMMA HADN'T ANSWERED`, three rows staggered in (framer `transition={{delay: i * 0.5}}`): `+5:00 Escalation contact · NOTIFIED` (amber chip), `+15:00 Duty manager · NOTIFIED` (amber chip), then chip `green` "NOBODY FALLS THROUGH".
  - Timestamp rail under the mat (outside overflow-hidden): 4 mono labels (`02:47:00 · 02:47:01 · 02:49:12 · +5:00`), active one `text-ink`, others `text-muted/60`, indexed by scene.
  - Scene-dot progress: 4 dots, active `bg-green`.
- [ ] **Step 2: `RosterMini`** (same file, exported): three rows from `ROSTER` (`name` + mono `window`), `activeIndex` row gets `bg-green/5 border-green/40` + green dot; `null` = all neutral. Rows are plain divs inside a `rounded-lg border border-hairline bg-paper` card.
- [ ] **Step 3:** `Hero.tsx`: replace the right-column mat + PhoneFrame/ChatMock with `<JourneyLoop />` (JourneyLoop owns its own mat, keeps `justify-self` wrapper + MotionCard). ChatMock import moves into JourneyLoop.
- [ ] **Step 4:** Build green; dev-render `/`, confirm loop cycles 4 scenes, hover pauses, and `prefers-reduced-motion` (emulate via Playwright or devtools) shows static ChatMock.
- [ ] **Step 5:** Commit `feat: animated hero journey loop with reduced-motion fallback`.

---

### Task 4: Scrollytelling how-it-works (desktop enhancement)

**Files:**
- Create: `components/sections/HowItWorksScrolly.tsx` (client)
- Modify: `app/page.tsx` (swap `<HowItWorks />` → `<HowItWorksScrolly />`)

**Interfaces:**
- Consumes: `HOW_STEPS` from `how-it-works-content`, `HowItWorks` + `EscalationLadderCard` (static fallback + panel 4), `RosterMini` from `components/hero/JourneyLoop`, `Chip`, `SectionHeading`.
- Produces: `HowItWorksScrolly()` — renders `id="how-it-works"` wrapper.

- [ ] **Step 1: Structure.**
  - `const reduce = useReducedMotion();` plus an `lg` match via CSS only — render BOTH: `<div className="lg:hidden"><HowItWorks /></div>` and `<div className="hidden lg:block">…scrolly…</div>`; if `reduce`, render `<HowItWorks />` alone. The outer `HowItWorksScrolly` wrapper owns `id="how-it-works"`; change `HowItWorks` to accept `{ withId?: boolean }` (default true, passed false when embedded) so the anchor never duplicates.
  - Scrolly: `<section>` with `ref`, `className="relative"`, inner grid `lg:grid-cols-2 gap-12`; left column: `HOW_STEPS.map` blocks each `min-h-[80vh] flex items-center`, text opacity animated by active index (`opacity: active===i ? 1 : 0.35`, motion.div animate); right column: `<div className="sticky top-24 h-[70vh] flex items-center">` panel.
  - Active index: `const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.6", "end 0.8"] });` + `useMotionValueEvent(scrollYProgress, "change", v => setActive(Math.min(3, Math.floor(v * 4))))`.
- [ ] **Step 2: Panel visuals** keyed by active, `AnimatePresence mode="wait"` crossfade:
  0. inbound bubble card (same visual language as JourneyLoop scene 0 — inline here, small)
  1. `<RosterMini activeIndex={2} />` + green chip "ROUTED BY ROSTER"
  2. chips stack: `READ 02:47` (green) / `REPLY LOGGED 02:49` (green) / `TIMER ARMED` (amber) on a paper card
  3. `<EscalationLadderCard />`
- [ ] **Step 3:** SectionHeading (№ 03 / "How it works" / same title/copy as static) renders once above the grid in the scrolly variant.
- [ ] **Step 4:** Build green. Playwright scripted check: at 1440×900 scroll to section mid (`#how-it-works` offset + 1.5 * viewport) → screenshot shows RosterMini panel; mobile 375 shows static cards.
- [ ] **Step 5:** Commit `feat: scrollytelling how-it-works with static mobile/reduced-motion fallback`.

---

### Task 5: ROI breakdown bar + pricing hand-off

**Files:**
- Modify: `components/sections/CostAndScenarios.tsx`, `components/pricing/PricingCalculator.tsx`, `app/pricing/page.tsx`

**Interfaces:**
- Consumes: existing loss terms; `Button`.
- Produces: `/pricing?drivers=N` contract — PricingCalculator initial drivers from query param (clamped int 1–1000, invalid → 25).

- [ ] **Step 1: Breakdown bar.** In `CostAndScenarios`, the `useMemo` already computes `misrouteLoss`, `slaLoss`, `breakdownLoss`, `adminLoss` — return them in the memo. Above the results grid add:

```tsx
const parts = [
  { label: "Mis-routed calls", value: roi.misrouteLoss, cls: "bg-signal" },
  { label: "SLA breaches", value: roi.slaLoss, cls: "bg-amber" },
  { label: "Breakdown response", value: roi.breakdownLoss, cls: "bg-[#8A94A3]" },
  { label: "Admin overhead", value: roi.adminLoss, cls: "bg-hairline" }
];
// bar: flex h-3 w-full overflow-hidden rounded-full; each segment a
// motion.div with animate={{ width: `${(p.value / roi.annualLoss) * 100}%` }}
// transition={{ type: "spring", stiffness: 170, damping: 26 }}
// legend: grid sm:grid-cols-4, each = color dot + label + mono formatCurrency(value)
```

- [ ] **Step 2: Hand-off.** With the results, add `<Button href={`/pricing?drivers=${drivers}`}>See your price for {drivers} drivers →</Button>`.
- [ ] **Step 3: Prefill.** `PricingCalculator`: `const params = useSearchParams();` initial state via lazy initializer:

```tsx
const [drivers, setDrivers] = useState(() => {
  const q = Number(params.get("drivers"));
  return Number.isInteger(q) && q >= 1 && q <= MAX_DRIVERS ? q : INCLUDED_DRIVERS;
});
```

  `app/pricing/page.tsx`: wrap `<PricingCalculator />` in `<Suspense fallback={<div className="h-[560px] rounded-2xl border border-hairline bg-card" />}>`.
- [ ] **Step 4:** Tests still green (`npx vitest run`); build green — check `/pricing` still prerenders static (no `useSearchParams` bailout error in build output).
- [ ] **Step 5:** Commit `feat: animated loss breakdown and ROI→pricing driver hand-off`.

---

### Task 6: Simulation playground + nav + renumbering

**Files:**
- Create: `components/sections/Playground.tsx` (client)
- Modify: `app/page.tsx` (insert between HowItWorksScrolly and ProductTour), `components/sections/Header.tsx` (add "Try it" → `/#try-it` between Product and Industries), `components/sections/ProductTour.tsx` (№ 04→05), `components/sections/Industries.tsx` (05→06), `components/sections/PricingSummary.tsx` (06→07)

**Interfaces:**
- Consumes: `buildTimeline`, `SimEvent`, `clockAt` from `lib/sim`; `SectionHeading`, `Chip`, `Button`, `BOOKING_URL`.

- [ ] **Step 1: Controls.** Canned scenarios:

```ts
const SCENARIOS = [
  { label: "Flat tyre on the M7 — 2:47 AM", message: "Truck 41 — flat tyre on the M7, need a tow", minutes: 2 * 60 + 47 },
  { label: "Customer not at dock 4 — 10:18 AM", message: "Customer not at dock 4. Need alternate contact.", minutes: 10 * 60 + 18 },
  { label: "Temp alarm at changeover — 2:05 PM", message: "Temperature alarm showing on trailer display", minutes: 14 * 60 + 5 }
];
```

  State: `scenarioIdx` (select), `custom` (text input, `maxLength={80}`, overrides message when non-empty), `answers` (segmented toggle "Supervisor answers" / "Supervisor misses it", same pattern as pricing interval toggle), `events: SimEvent[]` shown so far, `playing: boolean`, `done: boolean`.
- [ ] **Step 2: Playback.** On "Run the routing ▶": clear log, `buildTimeline(...)`, then if `useReducedMotion()` show all instantly; else schedule each event with `setTimeout(ev.atSec * 1000)`; keep timeout ids in a ref, clear on unmount/re-run. Log rows: tone dot (`bg-green/bg-amber/bg-signal/bg-ink`), mono `clock`, text; container `aria-live="polite"` `min-h-[280px]`; when `done`, append green chip `LOGGED · AUDIT ROW WRITTEN` + ghost "Replay" button.
- [ ] **Step 3: Layout.** Section `id="try-it"`, `bg-card border-y border-hairline`, SectionHeading № 04 / "Try it" / "Watch a message find its owner." / copy "Pick a message and a time. This is a simulation — the real product does this with your roster, on your number." + `Chip tone="amber"` SIMULATION beside the eyebrow. Grid `lg:grid-cols-[0.9fr_1.1fr]`: controls card | log card. Below log: outline Button "Book a demo" → BOOKING_URL.
- [ ] **Step 4: Renumber** ProductTour/Industries/PricingSummary SectionHeading `number` props to "05"/"06"/"07"; add Header link.
- [ ] **Step 5:** Build green; Playwright: click Run with default scenario → within 6s log shows "Emma Wilson" + LOGGED chip; toggle "misses it" → log shows both escalation rungs. Verify at 375 (stacked, no overflow).
- [ ] **Step 6:** Commit `feat: simulated routing playground with nav link and section renumbering`.

---

### Task 7: Verification gate

- [ ] **Step 1:** `npm run lint && npx vitest run && npm run build` all green; `/` first-load JS ≤ 145 kB in build table.
- [ ] **Step 2:** Grep gate zero matches (Global Constraints regex).
- [ ] **Step 3:** `npm run start` + Playwright: overflow scan 375/768/1440 both pages (0px); scrolly panel check (Task 4 Step 4); playground run check (Task 6 Step 5); `?drivers=120` prefill shows `AU$364/mo`; hero loop advances scenes (scene index text changes over 4s) and reduced-motion emulation shows static ChatMock.
- [ ] **Step 4:** Lighthouse desktop: `/` Performance ≥ 95, Accessibility ≥ 96, SEO 100; `/pricing` Accessibility 100.
- [ ] **Step 5:** Fix findings, commit `chore: phase B verification pass`, then superpowers:verification-before-completion → superpowers:finishing-a-development-branch (PR to main).
