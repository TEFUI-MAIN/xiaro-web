# Xiaro Marketing Site — Phase A Redesign (Design Spec)

Date: 2026-07-07
Repo: TEFUI-MAIN/xiaro-web (deploys to xiaro.vercel.app; canonical domain will be xiaro.com.au)
Status: Approved by owner 2026-07-07

## 1. Overview

Phase A overhauls the marketing site's visual identity away from the generic
dark-SaaS template, replaces AI concept art with real product screenshots,
corrects all content drift against product truth, rebuilds the pricing page on
the new AU$79 model, and adds proper SEO/OG. The information architecture is
kept: problem → cost → scenarios → before/after → how-it-works → pricing.

Phase B (out of scope here): animated message-journey hero, scrollytelling
how-it-works, upgraded interactive ROI calculator, mini live-demo widget.

## 2. Goals

- Distinctive light "paper & ink, industrial-editorial" identity (typography +
  palette overhaul; zero gradients/glow/glassmorphism).
- Real product screenshots from xiaro.io (seeded demo tenant) in reusable
  device frames.
- Pricing page and Stripe checkout rebuilt on: Base AU$79/mo (1 depot, 25
  drivers, all channels, escalation + audit included), +AU$3/driver/mo above
  25, annual = 2 months free, optional AU$399 once-off onboarding, Enterprise
  = talk to us, 30-day money-back guarantee.
- Content corrected to product truth (voice = roadmap; carrier-agnostic; GPS
  check-in privacy framing; escalation ladder; tamper-evident audit trail).
- SEO/OG: metadataBase, per-page metadata, OG image, sitemap, robots, JSON-LD.

## 3. Non-goals

- No changes to the xiaro.io product repo (read/run only, for screenshots).
- No framework upgrades (stay on Next 14 / Tailwind 3 / framer-motion 11).
- No Phase B features (animated hero, scrollytelling, live-demo widget).
- No free trial mechanics (decision: none — money-back guarantee instead).

## 4. Decisions log (owner-approved)

| Topic | Decision |
|---|---|
| Visual direction | Light, industrial-editorial ("paper & ink") |
| Build approach | Componentized rebuild on Tailwind token layer; same stack |
| Checkout | Keep Stripe: graduated price, quantity = driver count |
| Onboarding add-on | AU$399 once-off, optional one-time line item |
| Vendor naming | Carrier-agnostic everywhere; never name Twilio/Alltel/VoIPline/Notifyre/360dialog. Exception: "Official WhatsApp Business API" is used as a trust signal |
| Canonical domain | https://xiaro.com.au · contact hello@xiaro.com.au |
| Free trial | None. 30-day money-back guarantee badge; CTAs say "Get started" |
| Demo CTA | Scheduling link via NEXT_PUBLIC_BOOKING_URL env (Cal.com/Calendly), mailto fallback until the URL is provided |
| platform-prototype route | Delete |

## 5. Design language — "paper & ink"

Metaphor: dispatch paperwork / consignment note, not spaceship. An AU
operations company you can trust.

### 5.1 Palette (Tailwind tokens)

| Token | Hex | Use |
|---|---|---|
| paper | #FAFAF7 | Page background |
| card | #FFFFFF | Cards, panels |
| ink | #14181F | Primary text, logo |
| muted | #5B6472 | Secondary text |
| hairline | #E3E1DA | 1px rules, borders |
| green | #1FA45B | Primary CTA, WhatsApp, delivered/on-shift states |
| green-deep | #17834A | CTA hover |
| amber | #E8A13A | Escalation timers, warnings |
| signal-red | #D64545 | Missed/failed states only — used sparingly |
| panel | #10141B | Dark mat behind device frames only |

Rules: no gradients, no glow shadows, no glassmorphism, no cyan. Color carries
state meaning (green = handled, amber = escalating, red = missed).

### 5.2 Typography (all via next/font, self-hosted)

- Headlines: Bricolage Grotesque (Google Fonts), tight tracking, weights 600–800.
- Body: Inter (kept).
- Data: IBM Plex Mono for every number, price, timestamp, label chip, and
  audit row. `font-variant-numeric: tabular-nums`.

### 5.3 Texture & motion

- 1px hairline rules; numbered sections (01–06) like a waybill.
- Stamp-style chips: e.g. "LOGGED 14:32", "ESCALATED +5 MIN", "ON SHIFT".
- Motion: framer-motion retained, restrained — 12px fade-rise on scroll entry,
  ~0.4s, no parallax (ParallaxImage component is deleted).

## 6. Information architecture

### 6.1 `/` (landing)

Section order (kept from current site, per agreed IA):

1. **Header** — logo (recolored to ink/green), anchors (How it works,
   Features, Industries, Pricing → /pricing), CTAs: "Book a demo" (booking
   URL), "Get started" (→ /pricing).
2. **Hero** — typographic on paper, no hero photograph. Headline: "One
   number. Every channel. The right person, every shift." Subline on roster
   routing + escalation. Channel chips: WhatsApp — primary · SMS — fallback ·
   Voice — on the roadmap. Right side: PhoneFrame with a real WhatsApp
   conversation screenshot. CTAs: Get started / Book a demo.
3. **Problem** — restyled pain-point cards (existing copy is good), red/amber
   used as state colors, not decoration.
4. **Cost + Scenarios (RoiSection rework)** — keep stat cards, 4 scenario
   cards, before/after comparison and the calculator; re-skin to paper & ink;
   replace `getPlanForFleet` tier math with: cost = 79 + max(0, drivers − 25) × 3
   (AU$/mo, one pricing model — no tiers).
5. **How it works** — three-step routing (inbound → roster match → delivered)
   plus a new explicit **escalation ladder** visual: supervisor → escalation
   contact → duty manager → admin alert, with amber mono timer chips.
6. **Product tour** — replaces the six AI-image `draftSections`. 4–5 blocks,
   each: real screenshot in BrowserFrame (dark-theme dashboard) or PhoneFrame
   (light WhatsApp look) + copy:
   - Conversations & routing (dashboard conversation thread with escalation event)
   - Roster grid (who's on shift now)
   - Audit trail (tamper-evident, timestamped, dispute-ready)
   - GPS check-in — "Location when it matters. Never tracking." (driver-approved
     check-in; privacy is the differentiator)
   - Dashboard overview
7. **Trust strip** — Official WhatsApp Business API · Carrier-grade SMS
   delivery · Built in Australia · Audit-grade logging.
8. **Industries** — keep chip list; drop the AI industries image.
9. **Pricing summary** — single Base card summary + link to /pricing.
10. **Final CTA** — "Stop chasing who's on shift." Get started / Book a demo.
11. **Footer** — xiaro.com.au, hello@xiaro.com.au, real destinations only:
    section anchors, /pricing, mailto, and a "Log in" link to xiaro.io. Dead
    `#` links (Integrations, Support, Privacy, Terms) are removed until real
    pages exist.

### 6.2 `/pricing` (real page, no longer re-rendering Home)

- Base card: AU$79/mo — 1 depot, 25 drivers included, all channels,
  escalation + audit included.
- Driver-count input (default 25): live price in mono digits,
  `79 + max(0, n − 25) × 3`, feeds Stripe quantity.
- Monthly/Annual toggle: annual = 2 months free (10 × monthly price billed
  yearly, displayed as "AU$790/yr — 2 months free" at 25 drivers).
- Onboarding add-on checkbox: AU$399 once-off — "We connect your own carrier
  and WhatsApp Business accounts into Xiaro: number provisioning, SMS sender
  registration, WhatsApp Business verification, plus roster and escalation
  setup."
- Transparency block: "You own your accounts. You pay carriers directly. We
  never mark up your messages."
- 30-day money-back guarantee badge.
- Enterprise row: "Talk to us" → booking URL.
- FAQ (JSON-LD backed): BYO accounts, what's included, how escalation works,
  what the guarantee covers, do drivers need an app (no).

### 6.3 Deleted

- `app/platform-prototype/` (768-line mock dashboard) — replaced by real
  screenshots.
- `components/ParallaxImage.tsx`.
- `public/draft/*`, `public/generated/*`, `public/hero/hero1.png` once
  replaced.
- Old checkout plan IDs and `CheckoutPlan` union ("starter" | "operations" |
  "business").
- `public/Xiaro-ROI-Business-Case.pptx` and its download link — it carries
  the old $149/$349/$699 pricing (regenerating it is a post-Phase-A task).

## 7. Component architecture

```
components/
  ui/        Button, Chip (stamp style), SectionHeading, Stat,
             BrowserFrame, PhoneFrame, TrustStrip, MoneyBackBadge
  sections/  Header, Hero, Problem, CostAndScenarios, HowItWorks,
             EscalationLadder, ProductTour, Industries, PricingSummary,
             FinalCta, Footer
app/
  page.tsx          composition only
  pricing/page.tsx  full pricing page (client island for calculator/checkout)
  layout.tsx        fonts, metadata, JSON-LD (Organization + SoftwareApplication)
  sitemap.ts, robots.ts
  api/checkout/route.ts  rewritten (see §9)
  thanks/page.tsx   checkout success — sets "we'll contact you within 1
                    business day to schedule onboarding" expectation
```

Existing `Motion.tsx` (MotionSection/MotionCard) is kept with toned-down
values. `XiaroLogo` recolored to ink/green.

## 8. Screenshot production (first implementation task)

1. Run xiaro.io locally (`.env.local` exists); seed fictional demo data with
   `scripts/setup-skeleton-test-data.mjs`.
2. Capture at 2x DPR: dashboard overview, conversation thread showing an
   escalation event, roster grid, audit trail, location check-in detail.
   Dashboard screens in **dark theme**; conversation content styled by the
   product as-is.
3. Constraint: screenshots come only from the seeded demo tenant. No real
   customer names, numbers, or messages — ever (tenant-isolation discipline).
4. Store as optimized PNG/WebP under `public/product/`; rendered through
   `next/image` inside BrowserFrame (dark browser chrome on panel mat) and
   PhoneFrame (neutral phone outline).
5. If a wanted screen can't be produced (e.g. seeder doesn't create an
   escalation event), fall back to the closest real screen and adjust the
   product-tour copy — no mocked-up UI images.

## 9. Stripe

One product, two recurring prices + one one-time price (owner creates in
Stripe dashboard; exact settings provided at implementation):

- **Base monthly** — graduated tiers, quantity = driver count:
  tier 1 (1–25): flat AU$79.00, unit AU$0; tier 2 (26+): unit AU$3.00.
- **Base annual** — same graduation × 10 (flat AU$790, unit AU$30/yr).
- **Onboarding** — one-time AU$399.
- Currency: AUD. Tax handling stays whatever the Stripe account currently
  does (not a site concern).

Checkout API (`POST /api/checkout`): body `{ interval: "monthly" | "annual",
drivers: number (1–1000, validated; values below 25 bill the same flat AU$79
via tier 1), onboarding: boolean }` → Checkout
Session with base line item (quantity = drivers) + optional onboarding line
item; success → `/thanks`, cancel → `/pricing`. Env:
`STRIPE_BASE_MONTHLY_PRICE_ID`, `STRIPE_BASE_ANNUAL_PRICE_ID`,
`STRIPE_ONBOARDING_PRICE_ID`, `STRIPE_SECRET_KEY` (existing).

## 10. SEO / OG

- `metadataBase: https://xiaro.com.au`; canonical URLs; per-page
  title/description for `/` and `/pricing`.
- OG image 1200×630, designed in the paper-&-ink language (static file, not
  runtime-generated).
- `sitemap.ts` (/, /pricing), `robots.ts` (allow all; exclude /api, /thanks).
- JSON-LD: Organization + SoftwareApplication (layout), FAQPage (/pricing).
- Copy uses the phrases buyers search: "one company number for drivers",
  "WhatsApp roster routing", "after-hours escalation", "driver communication
  audit trail" — woven into headings naturally, no keyword stuffing.

## 11. Copy constraints (site ↔ product truth)

- WhatsApp is primary, SMS is fallback, voice is **roadmap only** — never
  presented as live.
- No vendor names anywhere except "Official WhatsApp Business API".
- GPS is driver-approved check-in, explicitly NOT tracking.
- Escalation ladder order: supervisor → escalation contact → duty manager →
  admin alert.
- Audit trail described as tamper-evident and timestamped.
- No app for drivers or supervisors — they keep WhatsApp/SMS.
- Pricing on the site must always match this spec's numbers (the product and
  the site must never tell different stories).

## 12. Environment variables (site)

| Var | Purpose |
|---|---|
| NEXT_PUBLIC_BOOKING_URL | Cal.com/Calendly demo link; when unset, CTAs fall back to mailto:hello@xiaro.com.au |
| NEXT_PUBLIC_APP_URL | https://xiaro.io — "Log in" link in header/footer |
| STRIPE_SECRET_KEY | existing |
| STRIPE_BASE_MONTHLY_PRICE_ID / STRIPE_BASE_ANNUAL_PRICE_ID / STRIPE_ONBOARDING_PRICE_ID | new prices |

## 13. Verification

- `npm run build` and `npm run lint` clean.
- Manual pass at 375px, 768px, 1440px: no horizontal scroll, frames scale,
  calculator math spot-checked (25 → $79, 40 → $124, 100 → $304).
- Checkout smoke test in Stripe test mode: monthly/annual × with/without
  onboarding → correct line items and totals.
- Lighthouse: no regression below 90 for Performance/SEO/Accessibility on `/`.
- Grep gate before merge: no occurrences of Alltel, VoIPline, Notifyre,
  360dialog, Twilio, "free trial", "$149", "$349", "$699" in app/ or
  components/.

## 14. Risks

- **Seeder coverage**: demo data may not produce an escalation event to
  screenshot — mitigation in §8.5.
- **Stripe dashboard dependency**: checkout can't be end-to-end tested until
  the owner creates the three prices; site ships with checkout behind valid
  env vars, and the pricing page degrades to "Book a setup call" CTA if they
  are missing.
- **Font pairing risk**: Bricolage Grotesque may read too playful at small
  sizes — it is used at display sizes only; Inter carries everything below
  ~24px.
