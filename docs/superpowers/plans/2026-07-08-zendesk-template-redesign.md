# Zendesk-Template Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild both pages on the measured zendesk.com system (type, color-blocking, section flow) in the Forest & Volt palette, recomposing existing interactive machinery into Zendesk-shaped containers, to a standard that survives side-by-side comparison with zendesk.com.

**Architecture:** New `components/zd/` primitive kit encodes the measured system once (Pill, Eyebrow, Display, SectionCard, GlowFrame, ConnectorNode); every section is rebuilt on those primitives in `components/sections/`; all logic modules (sim, pricing, checkout, faq, links) and interactive internals (Playground, PricingCalculator, checkout API) are retained and re-skinned. Continuous review: after each visual task, screenshot at 1440/375 and grade against the captured zendesk tiles before proceeding.

**Tech Stack:** Next 14, Tailwind 3, framer-motion 11, Schibsted Grotesk + IBM Plex Mono via next/font, vitest. No new dependencies.

**Spec:** `docs/superpowers/specs/2026-07-08-zendesk-template-redesign-design.md` (§2 measured table, §3 exact flow/copy, §6 review protocol, §7 gates).

## Global Constraints

- Tokens exactly: ink `#11110D`, cream `#F5F5F2`, gray `#F5F5F2` (bg-cream used for both roles), forest `#1C3626`, volt `#A8F26B`, green-deep `#17834A`, hairline `#E8E8E4`; amber `#E8A13A` / signal `#D64545` states only.
- Type scale exactly (spec §2): display-1 68/1.05/500 (40 mobile), display-2 44/1.1/500 (32 mobile), card-title 26/1.25/500, body 16/1.45/400, eyebrow 14/700/.75px caps, buttons 18/600 pad 10×20 radius 16px.
- One typeface (Schibsted Grotesk); IBM Plex Mono only inside product vignettes/log/prices.
- Section cards rounded-3xl (24px), inset (`mx-auto max-w-[1400px] px-4 sm:px-6`), section padding generous (py-24 to py-40 desktop).
- Grep gate (updated): `Alltel|VoIPline|Notifyre|360dialog|Twilio|free trial|\$149|\$349|\$699|cyan|gradient-to-|backdrop-blur` zero matches in app/ components/ lib/ (radial-gradient arbitrary values allowed; `gradient-to-` with trailing hyphen blocks Tailwind directional gradients only).
- Truthfulness: no fake logos/testimonials; SIMULATION badge stays; photos from public/photos with credits.
- Every task: `npm run build` green, then screenshot review vs zd tiles before commit.

---

### Task 1: Foundation — tokens, fonts, zd primitives

**Files:**
- Modify: `tailwind.config.ts`, `app/globals.css`, `app/layout.tsx`
- Create: `components/zd/Pill.tsx`, `components/zd/Eyebrow.tsx`, `components/zd/Display.tsx`, `components/zd/SectionCard.tsx`, `components/zd/GlowFrame.tsx`
- Create: `public/credits.txt`

**Interfaces (produced, consumed by all section tasks):**
- Tailwind: `bg-ink text-ink`, `bg-cream text-cream`, `bg-forest`, `bg-volt text-volt`, `text-green-deep`, `border-hairline`, `font-sans` (Schibsted var), `font-mono`.
- `Pill({ href?, onClick?, variant: "volt" | "outline" | "cream", children, className? })` — volt: `bg-volt text-ink hover:brightness-95`; outline: `border border-ink/20 text-ink hover:bg-ink/5`; cream: `border border-cream/30 text-cream hover:bg-cream/10`; all `rounded-2xl px-5 py-2.5 text-lg font-semibold` (radius 16px = rounded-2xl).
- `Eyebrow({ tone: "ink" | "cream" | "volt" | "green", children })` — `text-sm font-bold uppercase tracking-[0.75px]`.
- `Display({ level: 1 | 2, className?, children })` — 1: `text-[40px] lg:text-[68px] leading-[1.05] font-medium tracking-[-0.01em]`; 2: `text-[32px] lg:text-[44px] leading-[1.1] font-medium tracking-[-0.01em]`.
- `SectionCard({ tone: "ink" | "forest" | "gray", className?, children })` — `rounded-3xl` + `bg-ink text-cream` / `bg-forest text-cream` / `bg-cream text-ink`; parent supplies inset wrapper.
- `GlowFrame({ children, className? })` — relative wrapper painting `bg-[radial-gradient(closest-side,rgba(168,242,107,0.28),transparent)]` blurred oversize behind children (volt glow), children in `rounded-xl overflow-hidden ring-1 ring-cream/10`.
- Layout fonts: `Schibsted_Grotesk({ subsets:["latin"], weight:["400","500","600","700"], variable:"--font-sans" })`; IBM_Plex_Mono 400/500 `--font-mono`. tailwind fontFamily: sans → var(--font-sans), mono → var(--font-mono). (font-display alias removed; Display component owns scale.)

- [ ] **Step 1:** Rewrite tailwind config palette/typography per Global Constraints (keep content globs, keep amber/signal).
- [ ] **Step 2:** globals.css: white body, ink text, `::selection { background: rgba(168,242,107,0.45) }`, keep `.font-mono` tabular-nums.
- [ ] **Step 3:** layout.tsx fonts swap (title/description/OG metadata unchanged).
- [ ] **Step 4:** Write the five zd primitives exactly to interface.
- [ ] **Step 5:** credits.txt: three Unsplash attributions (Tan Kaninthanond — hero-truck-dusk; paws and prints — night-headlights; Rodrigo Rodrigues | WOLF ΛRT — ops-supervisor; each with unsplash.com/photos/<id> URL and "Unsplash License").
- [ ] **Step 6:** Build (site will look broken mid-flight — old sections reference removed tokens `paper/card/muted/panel/green`: add TEMPORARY compat aliases in tailwind config `paper:"#FFFFFF", card:"#F5F5F2", muted:"#5B6472", panel:"#11110D", green:{DEFAULT:"#1FA45B",deep:"#17834A"}` — removed in Task 8). Commit `feat(zd): forest-and-volt tokens, Schibsted Grotesk, zd primitive kit`.

---

### Task 2: Page frame — Announcement, Nav, Footer

**Files:**
- Create: `components/sections/Announcement.tsx` (client, dismissible), rewrite `components/sections/Header.tsx`, `components/sections/Footer.tsx`

**Interfaces:** consumes zd kit + XiaroLogo (recolor: mark tile stays ink, keep volt dot: circle fill → `#A8F26B`; logo text ink or cream via prop `onDark?: boolean`).

- [ ] **Step 1:** Announcement: ink bar, 13px cream/80, centered "New — driver-approved location check-ins. Privacy is the point. →" link to /#product; X button right; hidden when `localStorage.xiaro-announce-dismissed`.
- [ ] **Step 2:** Header per spec §3.2 (white, hairline border, Pill CTAs, Log in link; mobile hamburger → full-screen ink sheet with links + pills, focus-trapped, Escape closes).
- [ ] **Step 3:** Footer per spec §3.13 (ink; three columns; giant Display-2 "Who's on shift right now? Find out" — "Find out" `text-volt underline underline-offset-8` → BOOKING_URL; legal row incl. `Photos: Unsplash contributors (credits.txt)` link).
- [ ] **Step 4:** Build; screenshot nav+footer vs zd tiles 0/tail-3; commit `feat(zd): announcement bar, nav, ink footer`.

---

### Task 3: Hero card + Trust strip + Statement

**Files:**
- Rewrite: `components/sections/Hero.tsx` → `HeroCard`; `components/sections/TrustStrip → zd version inside `components/sections/TrustRow.tsx`; create `components/sections/Statement.tsx`
- Uses `public/photos/hero-truck-dusk.jpg`

- [ ] **Step 1:** HeroCard per spec §3.3. Grid `lg:grid-cols-[1.05fr_0.95fr]`, min-h ~640px. Photo column: `next/image` fill, rounded-2xl, `after: bg-ink/25` duotone overlay + `saturate-[.85]`. Vignette A (top-left over photo, `-translate-x-6`): white rounded-xl shadow-xl p-4, chat line "Truck 41 — flat tyre on the M7, need a tow" + mono `02:47`; Vignette B (bottom-right, translate-y-6): white card "Roster check → Emma Wilson · night shift" + green dot + Chip green "ON SHIFT", wrapped in GlowFrame. Motion: vignettes `initial {opacity:0, y:16}` staggered 0.15; reduced-motion static.
- [ ] **Step 2:** TrustRow per §3.4 — flex row, label left (Eyebrow ink), four items `text-ink/70 text-sm font-semibold` separated by generous gap, wrap on mobile.
- [ ] **Step 3:** Statement per §3.5 (max-w-4xl centered, Display-2, "answers." in green-deep, Pill volt).
- [ ] **Step 4:** Build; screenshot hero at 1440/375 vs zd tile-0; check: headline scale ≥ Zendesk optical size, vignettes overlap photo edge, CTA prominence. Fix then commit `feat(zd): ink hero card with photo and floating vignettes, trust row, statement`.

---

### Task 4: Story spine + Stats band

**Files:**
- Create: `components/sections/StorySpine.tsx` (client), `components/sections/StatsBand.tsx` (client, count-up)
- Reuses: ChatMock-style bubble markup (local), `RosterMini` (from components/hero/JourneyLoop), `EscalationLadderCard` (from HowItWorks)

- [ ] **Step 1:** StorySpine per spec §3.6: center vertical line (absolute, w-px bg-hairline, scroll-linked scaleY via useScroll/useTransform origin-top), three SectionCard gray cards `grid lg:grid-cols-2 items-center gap-10 p-10 lg:p-14`, ConnectorNode discs between (ink disc 40px, lucide icon cream, centered on the line), volt radial glow behind card 2 (absolute -inset-8 …radial…), end node volt disc with Check. `id="how-it-works"` on section. Copy exactly per spec. Reduced motion: line static full height.
- [ ] **Step 2:** StatsBand per §3.7: Display-2 centered + three numbers `text-[64px] font-medium text-green-deep` count-up (requestAnimationFrame from 0 over 1.2s when in view once; "100%" counts 0→100; reduced-motion renders final).
- [ ] **Step 3:** Build; screenshots vs zd tiles 1–3 (statement rhythm, connector motif, count-up scale). Commit `feat(zd): story spine with drawn connector, count-up stats band`.

---

### Task 5: Forest tour + Audience cards

**Files:**
- Create: `components/sections/ForestTour.tsx` (client tabs), `components/sections/AudienceCards.tsx`
- Delete after port: `components/sections/ProductTour.tsx`, `HowItWorks.tsx` scrolly path — **keep** `HowItWorks.tsx` exports consumed elsewhere? StorySpine replaced it: delete `HowItWorksScrolly.tsx`, keep `EscalationLadderCard` by moving it into `components/zd/EscalationLadderCard.tsx` first; delete `Industries.tsx` (industries folded into audience copy), `PricingSummary.tsx`, `FinalCta.tsx` (replaced Task 6), old `TrustStrip`/`MoneyBackBadge` when no importers remain.

- [ ] **Step 1:** Move EscalationLadderCard → components/zd/, update imports (StorySpine).
- [ ] **Step 2:** ForestTour per spec §3.8: SectionCard forest p-10 lg:p-16; tabs = five buttons stacked (border-l-2, active `border-volt text-cream`, inactive `border-transparent text-cream/50 hover:text-cream/80`); right panel `AnimatePresence mode="wait"` fade; GlowFrame around next/image (real PNGs w/ correct dims) or LocationMock (moved from ProductTour into ForestTour file) for the location tab; caption `text-cream/70 text-sm mt-4`. Auto-advance 6s interval, cleared on first user click (ref flag), paused off-view. Tab list `role="tablist"` with aria-selected + keyboard arrows. Mobile (<lg): accordion — tab title rows, active expands panel under it.
- [ ] **Step 3:** AudienceCards per §3.9: grid 2, SectionCard gray overflow-hidden; top = `bg-forest p-10 grid place-items-center min-h-[260px]` with vignette (ops: mini stat row card cream "37 messages today · 2 open alerts · chain ✓ verified" in GlowFrame; drivers: white WhatsApp bubble card "No app. No login. Just WhatsApp." + Chip green "ON SHIFT"); bottom p-10: card-title, copy, Pills (ops: volt "See pricing" /pricing + outline "Book a demo"; drivers: volt "How routing works" #how-it-works + outline "Try the simulation" #try-it).
- [ ] **Step 4:** Build; screenshot vs zd tiles 5–6 (tab rail treatment, glow frames, two-up rhythm). Commit `feat(zd): forest tab tour and audience cards`.

---

### Task 6: Playground story card, Pricing teaser, Final CTA, page composition

**Files:**
- Rewrite: `components/sections/Playground.tsx` (restyle wrapper; keep all state/log/timers), create `components/sections/PricingTeaser.tsx`, `components/sections/FinalCtaBand.tsx`
- Rewrite: `app/page.tsx` composition per spec §3 order; delete now-unreferenced old sections + `components/hero/JourneyLoop.tsx` if unused (RosterMini consumed by StorySpine → move RosterMini into `components/zd/RosterMini.tsx`), `CostAndScenarios.tsx` (loss math not in new flow — pricing teaser links out; ROI calculator retirement approved by template fidelity; keep lib/pricing).

- [ ] **Step 1:** Move RosterMini → components/zd/RosterMini.tsx; update imports; delete JourneyLoop + CostAndScenarios + HowItWorks + HowItWorksScrolly + Industries + PricingSummary + FinalCta + ProductTour + TrustStrip + MoneyBackBadge + ChatMock/PhoneFrame/BrowserFrame IF unreferenced after rebuild (PhoneFrame/LocationMock still used by ForestTour location tab; ChatMock dies with JourneyLoop).
- [ ] **Step 2:** Playground restyle per §3.10: outer SectionCard gray grid `lg:grid-cols-[0.4fr_0.6fr]`; photo panel: night-headlights.jpg fill + ink/40 overlay, Chip amber SIMULATION top-left, bottom ink strip (bg-ink/85) with three cream mini-stats; right: heading Display-2 above card (section level), controls white on gray (inputs `bg-white border-hairline`), Run button = Pill volt full-width, log unchanged mono, Replay ghost. `id="try-it"`.
- [ ] **Step 3:** PricingTeaser + FinalCtaBand per §3.11–12 (exact copy from spec).
- [ ] **Step 4:** app/page.tsx order: Announcement, Header, HeroCard, TrustRow, Statement, StorySpine, StatsBand, ForestTour, AudienceCards, Playground, PricingTeaser, FinalCtaBand, Footer.
- [ ] **Step 5:** Build + full-page screenshot (scroll-through then force-final-state, 1440 + 375) — full grade vs zd flow. Commit `feat(zd): playground story card, pricing teaser, final CTA, new landing composition`.

---

### Task 7: Pricing page + thanks page reskin

**Files:**
- Modify: `app/pricing/page.tsx`, `components/pricing/PricingCalculator.tsx` (styles only), `app/thanks/page.tsx`

- [ ] **Step 1:** Pricing page per spec §4: white ground; heading row Display-1; calculator SectionCard gray (toggle: active segment `bg-ink text-cream`; Get started → Pill volt styles; prices stay mono); right-rail: included list (gray card), forest card "Why there are no message fees" (cream text, volt accent), enterprise row gray; FAQ white + hairline dividers (keep details/summary + JSON-LD); TrustRow above FAQ; Footer/Header shared.
- [ ] **Step 2:** thanks: white, Display-2, Pill volt home.
- [ ] **Step 3:** Build; screenshot 1440/375; verify calculator math unchanged (spot 25/40/100 via Playwright as before) + checkout 503 smoke. Commit `feat(zd): pricing and thanks pages on the new system`.

---

### Task 8: OG image, compat-alias removal, gates

- [ ] **Step 1:** Remove temporary token aliases (paper/card/muted/panel/green) from tailwind config; fix any stragglers the build surfaces.
- [ ] **Step 2:** Regenerate `public/og.png` via Playwright: ink ground, volt accent phrase, Schibsted Grotesk (google fonts import in scratch HTML), same headline; verify by reading image.
- [ ] **Step 3:** Full gate: lint, vitest (16), build, updated grep gate zero, overflow scan 375/768/1440 both pages, playground run both paths, `?drivers=120` prefill, tab tour click-through + accordion at 375, Lighthouse `/` ≥95/≥95/100 and `/pricing` a11y ≥95, first-load `/` ≤150 kB.
- [ ] **Step 4:** Full-page final review both pages vs zendesk tiles; list and fix any sub-$150K tells (spacing meanness, radius drift, contrast failures, orphan words in display lines).
- [ ] **Step 5:** Commit `chore(zd): verification pass`, then superpowers:verification-before-completion → superpowers:finishing-a-development-branch (PR; note it supersedes PR #2 scope — PR #2 branch is the base, so this PR contains Phase B + redesign; recommend closing PR #2 in favor of this one).
