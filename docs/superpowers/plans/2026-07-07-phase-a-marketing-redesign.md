# Phase A Marketing Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Xiaro marketing site in the approved "paper & ink" design language with real product screenshots, the AU$79 + $3/driver pricing model on Stripe graduated pricing, corrected product-truth copy, and full SEO/OG.

**Architecture:** Componentized rebuild on the existing stack. A Tailwind token layer + `next/font` carries the design language; sections live in `components/sections/*`, primitives in `components/ui/*`; `app/page.tsx` becomes pure composition. `/pricing` is a real page with a client-island calculator feeding a rewritten Stripe checkout route. Screenshots are produced first from a locally-run xiaro.io with seeded demo data.

**Tech Stack:** Next.js 14 (app router), Tailwind 3, framer-motion 11, stripe 17, next/font (Bricolage Grotesque, Inter, IBM Plex Mono), vitest (new, for pricing/checkout logic only), Playwright via npx (screenshot capture only, not a repo dependency).

**Spec:** `docs/superpowers/specs/2026-07-07-phase-a-marketing-redesign-design.md`

## Global Constraints

- Palette tokens exactly: paper `#FAFAF7`, card `#FFFFFF`, ink `#14181F`, muted `#5B6472`, hairline `#E3E1DA`, green `#1FA45B`, green-deep `#17834A`, amber `#E8A13A`, signal-red `#D64545`, panel `#10141B`.
- No gradients, no glow shadows, no glassmorphism, no cyan anywhere in app/ or components/.
- Pricing math everywhere: `AU$ 79 + max(0, drivers − 25) × 3` per month; annual = 10 × monthly (2 months free). Currency label "AU$".
- Copy rules: never name Twilio/Alltel/VoIPline/Notifyre/360dialog. Allowed vendor phrase: "Official WhatsApp Business API". Voice = roadmap only. GPS = driver-approved check-in, "never tracking". No "free trial" anywhere; guarantee = 30-day money-back. CTAs: "Get started" / "Book a demo".
- Escalation ladder order: supervisor → escalation contact → duty manager → admin alert.
- Canonical domain `https://xiaro.com.au`; contact `hello@xiaro.com.au`; app login `https://xiaro.io`.
- Booking link: `NEXT_PUBLIC_BOOKING_URL` env; fall back to `mailto:hello@xiaro.com.au?subject=Xiaro%20demo%20request` when unset.
- Screenshots only from a seeded demo tenant of xiaro.io — never real customer data. Product repo is read/run-only.
- Merge grep gate: zero matches in app/ and components/ for: `Alltel|VoIPline|Notifyre|360dialog|Twilio|free trial|\$149|\$349|\$699|cyan|gradient-to|backdrop-blur`.
- Every task ends with `npm run build` green (in xiaro-web) before commit.

---

### Task 1: Product screenshots from seeded demo tenant

**Files:**
- Create: `public/product/dashboard.png`, `public/product/conversation.png`, `public/product/roster.png`, `public/product/audit.png`, `public/product/location.png` (2x DPR, dark theme)
- Scratch: capture script in scratchpad dir (not committed)

**Interfaces:**
- Produces: the five PNGs above; Task 8 (ProductTour) consumes them by exact filename. If a screen can't be produced, produce the closest real screen, keep the filename, and note the substitution for Task 8 copy adjustment.

- [ ] **Step 1: Safety inspection before touching the product.** Read `xiaro.io/scripts/setup-skeleton-test-data.mjs` fully and `xiaro.io/.env.local` (URL only, not keys). Determine: (a) which Supabase project it targets, (b) whether the seeder creates an isolated demo company/tenant, (c) what login it creates or requires. **Gate:** only proceed with seeding if the seeder creates clearly-named fictional demo data in its own tenant. If it targets production and is not tenant-isolated, do NOT run it — instead check `docs/handover.md` for an existing demo/test tenant login and screenshot that tenant only.
- [ ] **Step 2: Start the product locally.** `cd xiaro.io && npm run dev` (background, port 3000; use 3010 if 3000 is taken). Verify login page renders via curl.
- [ ] **Step 3: Seed demo data** (if gate passed): `node scripts/setup-skeleton-test-data.mjs`, note the credentials/tenant it reports.
- [ ] **Step 4: Capture.** `npx playwright install chromium` if needed, then a script that: logs in with demo credentials, sets dark theme (the app stores the choice; toggle via UI or localStorage key found in the theme inline script), sets viewport 1440×900 deviceScaleFactor 2, and captures `/dashboard`, `/conversations` (open a thread with messages — ideally one showing escalation), `/rosters`, `/audit`, `/locations` to the five PNGs.
- [ ] **Step 5: Review each PNG by reading the image files.** Check: dark theme active, no empty states, no real-looking personal data (fictional names only), legible at 50% size. Re-shoot failures.
- [ ] **Step 6: Optimize + commit.** `sips` or keep PNGs if <400KB each. `git add public/product && git commit -m "feat: real product screenshots from seeded demo tenant"`.

---

### Task 2: Design-token foundation (Tailwind, fonts, globals, base layout)

**Files:**
- Modify: `tailwind.config.ts`, `app/globals.css`, `app/layout.tsx`

**Interfaces:**
- Produces: Tailwind classes `bg-paper`, `bg-card`, `text-ink`, `text-muted`, `border-hairline`, `bg-green`, `hover:bg-green-deep`, `text-amber`, `text-signal`, `bg-panel`; CSS vars `--font-display`, `--font-sans`, `--font-mono` and Tailwind families `font-display`, `font-sans`, `font-mono`. All later tasks consume these.

- [ ] **Step 1: Replace `tailwind.config.ts` theme:**

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FAFAF7",
        card: "#FFFFFF",
        ink: "#14181F",
        muted: "#5B6472",
        hairline: "#E3E1DA",
        green: { DEFAULT: "#1FA45B", deep: "#17834A" },
        amber: "#E8A13A",
        signal: "#D64545",
        panel: "#10141B"
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"]
      }
    }
  },
  plugins: []
};

export default config;
```

- [ ] **Step 2: Replace `app/globals.css`** — light scheme, paper body, tabular numerals on `.font-mono`, selection green; delete `.glass` and `.soft-grid`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root { color-scheme: light; }
html { scroll-behavior: smooth; }
body { margin: 0; background: #FAFAF7; color: #14181F; }
.font-mono { font-variant-numeric: tabular-nums; }
::selection { background: rgba(31, 164, 91, 0.25); }
```

- [ ] **Step 3: Rewrite `app/layout.tsx`** with next/font (Bricolage Grotesque 600/700/800 as `--font-display`, Inter as `--font-sans`, IBM Plex Mono 400/500 as `--font-mono`) applied to `<html>` className, `<body className="font-sans">`, and base metadata:

```tsx
import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-display" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://xiaro.com.au"),
  title: { default: "Xiaro — One number for your whole fleet", template: "%s | Xiaro" },
  description:
    "Drivers message one company number on WhatsApp or SMS. Xiaro routes it to the on-shift supervisor, escalates until someone answers, and logs everything in a tamper-evident audit trail.",
  openGraph: {
    type: "website", locale: "en_AU", url: "https://xiaro.com.au", siteName: "Xiaro",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Xiaro — roster-routed messaging for transport teams" }]
  },
  alternates: { canonical: "/" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
```

- [ ] **Step 4:** `npm run build` — expect success (page still renders with old classes; old cyan/navy tokens removed from config will fall back — old page.tsx classes like `bg-[#0a0a0f]` are arbitrary values and still compile).
- [ ] **Step 5: Commit** `feat: paper-and-ink design tokens, fonts, base metadata`.

---

### Task 3: UI primitives

**Files:**
- Create: `components/ui/Button.tsx`, `components/ui/Chip.tsx`, `components/ui/SectionHeading.tsx`, `components/ui/Stat.tsx`, `components/ui/BrowserFrame.tsx`, `components/ui/PhoneFrame.tsx`, `components/ui/ChatMock.tsx`, `components/ui/TrustStrip.tsx`, `components/ui/MoneyBackBadge.tsx`
- Modify: `components/XiaroLogo.tsx` (recolor to ink/green), `components/Motion.tsx` (tone down: y offset 12, duration 0.4)

**Interfaces (consumed by all section tasks):**
- `Button({ href, variant: "primary" | "outline", children, className? })` — anchor-based; primary = `bg-green hover:bg-green-deep text-white`, outline = `border border-ink/20 text-ink hover:bg-ink/5`; both `rounded-md px-6 py-3 text-sm font-semibold`.
- `Chip({ tone: "green" | "amber" | "ink" | "signal", children })` — stamp style: `font-mono text-[11px] uppercase tracking-[0.14em] border rounded-[3px] px-2 py-1`; green tone `border-green/40 text-green-deep bg-green/5`, amber `border-amber/50 text-amber bg-amber/10` (text amber darkened `text-[#9A6A1F]` for contrast), ink `border-ink/25 text-ink/70 bg-transparent`, signal `border-signal/40 text-signal bg-signal/5`.
- `SectionHeading({ number, eyebrow, title, copy, center? })` — number rendered `font-mono text-xs text-muted` as `№ 01`, eyebrow `uppercase tracking-[0.18em] text-green-deep text-xs font-semibold`, title `font-display text-3xl sm:text-4xl tracking-tight text-ink`, copy `text-muted leading-7`.
- `Stat({ value, label, tone?: "ink" | "signal" | "amber" })` — value `font-mono text-3xl`, label `text-sm text-muted`.
- `BrowserFrame({ src, alt, priority? })` — dark browser chrome: outer `rounded-xl bg-panel p-2 shadow-[0_1px_0_#E3E1DA,0_12px_32px_rgba(20,24,31,0.10)]`, top bar with three `bg-white/20` dots + mono URL `app.xiaro.io`, inner `next/image` (1440×900 intrinsic) `rounded-md`.
- `PhoneFrame({ children })` — neutral phone outline `w-[300px] rounded-[2.2rem] border border-ink/15 bg-panel p-2` with inner `rounded-[1.8rem] bg-white overflow-hidden`; children = screen content.
- `ChatMock()` — coded WhatsApp-style conversation (NOT an image; honest illustration): light chat background `#EFEAE2`, header bar "Acme Freight — 1 number" with green dot, bubbles: inbound white left ("Truck 41 — flat tyre on the M7, need a tow" / mono time "02:47"), outbound green-tinted right `#D9FDD3` ("Marco (on shift): Tow booked, ETA 40 min. Sit tight." / "02:49 ✓✓"), then a `Chip tone="amber"` row "ESCALATION ARMED · REPLY LOGGED". All names fictional.
- `TrustStrip()` — full-width hairline-bordered band, 4 items separated by hairlines, each `font-mono text-xs uppercase tracking-[0.12em] text-muted` with a small lucide icon (`BadgeCheck`, `Radio`, `MapPin`→`Flag` for AU, `FileCheck`): "Official WhatsApp Business API", "Carrier-grade SMS delivery", "Built in Australia", "Audit-grade logging".
- `MoneyBackBadge()` — inline flex `Chip`-like: `ShieldCheck` icon + "30-day money-back guarantee".

- [ ] **Step 1:** Implement all files above exactly to those contracts.
- [ ] **Step 2:** `XiaroLogo`: replace cyan/blue fills with `#14181F` mark + `#1FA45B` accent; keep `compact` prop API unchanged.
- [ ] **Step 3:** `Motion.tsx`: initial `{ opacity: 0, y: 12 }`, transition `{ duration: 0.4, ease: "easeOut" }`; keep MotionSection/MotionCard exports unchanged.
- [ ] **Step 4:** `npm run build` green. Commit `feat: paper-and-ink UI primitives (frames, chips, trust strip)`.

---

### Task 4: Pricing math library (TDD) + vitest

**Files:**
- Create: `lib/pricing.ts`, `lib/pricing.test.ts`, `vitest.config.ts`
- Modify: `package.json` (add `vitest` devDependency, `"test": "vitest run"`)

**Interfaces:**
- Produces (consumed by Tasks 5, 7, 10):
  - `INCLUDED_DRIVERS = 25`, `BASE_MONTHLY_AUD = 79`, `PER_DRIVER_AUD = 3`, `ONBOARDING_AUD = 399`
  - `monthlyPriceAud(drivers: number): number` — `79 + max(0, ceil(drivers) − 25) × 3`; clamps drivers to [1, 1000]; throws on non-finite.
  - `annualPriceAud(drivers: number): number` — `monthlyPriceAud(drivers) × 10`.
  - `formatAud(value: number): string` — `"AU$79"` style, thousands separators, no decimals.

- [ ] **Step 1: Write failing tests** in `lib/pricing.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { annualPriceAud, formatAud, monthlyPriceAud } from "./pricing";

describe("monthlyPriceAud", () => {
  it("bills flat AU$79 up to 25 drivers", () => {
    expect(monthlyPriceAud(1)).toBe(79);
    expect(monthlyPriceAud(25)).toBe(79);
  });
  it("adds AU$3 per driver above 25", () => {
    expect(monthlyPriceAud(26)).toBe(82);
    expect(monthlyPriceAud(40)).toBe(124);
    expect(monthlyPriceAud(100)).toBe(304);
  });
  it("clamps to 1..1000 and rejects garbage", () => {
    expect(monthlyPriceAud(0)).toBe(79);
    expect(monthlyPriceAud(2000)).toBe(monthlyPriceAud(1000));
    expect(() => monthlyPriceAud(NaN)).toThrow();
  });
});

describe("annualPriceAud", () => {
  it("is 10x monthly (two months free)", () => {
    expect(annualPriceAud(25)).toBe(790);
    expect(annualPriceAud(40)).toBe(1240);
  });
});

describe("formatAud", () => {
  it("formats with AU$ prefix and separators", () => {
    expect(formatAud(79)).toBe("AU$79");
    expect(formatAud(1240)).toBe("AU$1,240");
  });
});
```

- [ ] **Step 2:** `npm install -D vitest`, add script, minimal `vitest.config.ts` (`test: { environment: "node" }`). Run `npm test` — expect FAIL (module missing).
- [ ] **Step 3: Implement `lib/pricing.ts`:**

```ts
export const INCLUDED_DRIVERS = 25;
export const BASE_MONTHLY_AUD = 79;
export const PER_DRIVER_AUD = 3;
export const ONBOARDING_AUD = 399;
export const MAX_DRIVERS = 1000;

export function monthlyPriceAud(drivers: number): number {
  if (!Number.isFinite(drivers)) throw new Error("drivers must be a finite number");
  const n = Math.min(MAX_DRIVERS, Math.max(1, Math.ceil(drivers)));
  return BASE_MONTHLY_AUD + Math.max(0, n - INCLUDED_DRIVERS) * PER_DRIVER_AUD;
}

export function annualPriceAud(drivers: number): number {
  return monthlyPriceAud(drivers) * 10;
}

export function formatAud(value: number): string {
  return `AU$${Math.round(value).toLocaleString("en-AU")}`;
}
```

- [ ] **Step 4:** `npm test` — all pass. `npm run build` green. Commit `feat: pricing math library with tests (AU$79 + $3/driver)`.

---

### Task 5: Stripe checkout rewrite + /thanks page

**Files:**
- Rewrite: `lib/checkout.ts`, `app/api/checkout/route.ts`
- Create: `lib/checkout.test.ts`, `app/thanks/page.tsx`
- Delete: `components/CheckoutButton.tsx` (replaced in Task 10 by PricingCheckout)

**Interfaces:**
- `lib/checkout.ts` produces (consumed by route + Task 10):
  - `type CheckoutRequest = { interval: "monthly" | "annual"; drivers: number; onboarding: boolean }`
  - `parseCheckoutRequest(body: unknown): CheckoutRequest | null` — validates shape, drivers finite 1–1000 integer.
  - `checkoutEnvReady(): boolean` — true when `STRIPE_SECRET_KEY`, `STRIPE_BASE_MONTHLY_PRICE_ID`, `STRIPE_BASE_ANNUAL_PRICE_ID`, `STRIPE_ONBOARDING_PRICE_ID` all set (onboarding ID only required when used — keep simple: all four required).
- Route: `POST /api/checkout` → `{ url }` of a Stripe Checkout Session: line 1 = interval price with `quantity: max(drivers, 1)`, line 2 (if onboarding) = onboarding price qty 1; `mode: "subscription"`, `success_url: /thanks`, `cancel_url: /pricing`, `currency` implied by prices. Returns 400 on invalid body, 503 with `{ error: "checkout_unconfigured" }` when env missing.
- `/thanks`: paper page, `SectionHeading` "You're in." + copy: "Payment received. We'll contact you within 1 business day to schedule your onboarding — connecting your own carrier and WhatsApp Business accounts into Xiaro." + Button to `/`.

- [ ] **Step 1:** Failing tests for `parseCheckoutRequest` (valid monthly/annual, rejects bad interval, drivers 0/1001/NaN/string, missing fields → null) in `lib/checkout.test.ts`.
- [ ] **Step 2:** Run `npm test` — new tests FAIL.
- [ ] **Step 3:** Implement `lib/checkout.ts` + rewrite route:

```ts
// app/api/checkout/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { checkoutEnvReady, parseCheckoutRequest } from "@/lib/checkout";

export async function POST(request: Request) {
  if (!checkoutEnvReady()) {
    return NextResponse.json({ error: "checkout_unconfigured" }, { status: 503 });
  }
  const parsed = parseCheckoutRequest(await request.json().catch(() => null));
  if (!parsed) return NextResponse.json({ error: "invalid_request" }, { status: 400 });

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  const basePrice =
    parsed.interval === "annual"
      ? (process.env.STRIPE_BASE_ANNUAL_PRICE_ID as string)
      : (process.env.STRIPE_BASE_MONTHLY_PRICE_ID as string);

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    { price: basePrice, quantity: parsed.drivers }
  ];
  if (parsed.onboarding) {
    line_items.push({ price: process.env.STRIPE_ONBOARDING_PRICE_ID as string, quantity: 1 });
  }

  const origin = request.headers.get("origin") ?? "https://xiaro.com.au";
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items,
    success_url: `${origin}/thanks`,
    cancel_url: `${origin}/pricing`
  });
  return NextResponse.json({ url: session.url });
}
```

- [ ] **Step 4:** `npm test` all pass; `npm run build` green (delete CheckoutButton import from old page only when Task 9 rewrites page.tsx — if build breaks now, leave CheckoutButton file in place until Task 9, then delete). Commit `feat: graduated-pricing Stripe checkout (interval + drivers + onboarding)`.

---

### Task 6: Header, Footer, Hero sections

**Files:**
- Create: `components/sections/Header.tsx`, `components/sections/Footer.tsx`, `components/sections/Hero.tsx`
- Create: `lib/links.ts` — `export const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL ?? "mailto:hello@xiaro.com.au?subject=Xiaro%20demo%20request"; export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://xiaro.io";`

**Interfaces:**
- Consumes: Button, Chip, XiaroLogo, ChatMock, PhoneFrame, Motion, links.
- Produces: `<Header />`, `<Footer />`, `<Hero />` (no props) for Task 9 composition.

- [ ] **Step 1: Header** — sticky, `bg-paper/90 backdrop-saturate-150 border-b border-hairline` (no backdrop-blur), left logo, center anchors (How it works `#how-it-works`, Product `#product`, Industries `#industries`, Pricing `/pricing`), right: "Log in" text link → APP_URL, Button outline "Book a demo" → BOOKING_URL, Button primary "Get started" → `/pricing`.
- [ ] **Step 2: Hero** — paper, two-column ≥lg. Left: Chip row (`green`: "WhatsApp — primary", `ink`: "SMS — fallback", `amber`: "Voice — on the roadmap"); H1 `font-display text-5xl sm:text-6xl lg:text-7xl tracking-[-0.03em]`: "One number. Every channel. The right person, every shift."; sub `text-lg text-muted max-w-xl`: "Drivers message one company number on WhatsApp or SMS. Xiaro routes it to whoever is on shift — and if nobody answers, it escalates until someone does."; CTAs Get started (primary → /pricing) + Book a demo (outline → BOOKING_URL); proof row under hairline, three `Stat`s in mono: "1 / number for everything", "0 / apps to install", "100% / of messages logged". Right: `PhoneFrame><ChatMock /></PhoneFrame>` on a subtle `bg-card border border-hairline rounded-2xl` mat, slight rotate-1.
- [ ] **Step 3: Footer** — hairline top border, 3 columns: brand (logo, "Right person. First time.", "Workforce communications for shift-based operations, built in Australia."), Product (anchors + Pricing → /pricing + Log in → APP_URL), Contact (hello@xiaro.com.au mailto, Book a demo → BOOKING_URL). Bottom row: `© 2026 Xiaro Pty Ltd` + `xiaro.com.au`, mono text-xs. NO dead `#` links.
- [ ] **Step 4:** Build green. Commit `feat: header, hero with coded WhatsApp illustration, footer`.

---

### Task 7: Problem + Cost/Scenarios sections

**Files:**
- Create: `components/sections/Problem.tsx`, `components/sections/CostAndScenarios.tsx`
- Delete (in Task 9): `components/RoiSection.tsx` — port its copy here now.

**Interfaces:**
- Consumes: SectionHeading (№ 01 Problem, № 02 The cost), Chip, Stat, Motion, `monthlyPriceAud`/`formatAud` from lib/pricing.
- Produces: `<Problem />`, `<CostAndScenarios />` (CostAndScenarios is a client component — calculator state).

- [ ] **Step 1: Problem** — SectionHeading № 01 / "The problem" / "A shift changes. The responsibility trail disappears." / existing lead copy. Grid of the six existing pain cards (keep titles+copy verbatim from old page.tsx `painPoints`), restyled: `bg-card border border-hairline rounded-lg p-6`, icon in `text-signal` chip-box, index `font-mono text-xs text-muted`.
- [ ] **Step 2: CostAndScenarios** — SectionHeading № 02 / "The cost" / "Every unanswered message has a dollar value." Port from RoiSection: 3 stat cards ("$130,156 / Annual loss — 100-driver fleet" tone signal, "$1,300 / Per SLA breach" tone amber, "2–4 hrs / Lost per mis-routed call" tone signal) — DROP the old "29x ROI" card, replace with Stat "AU$79/mo / Xiaro base price — less than one hour of roadside idle time" tone ink. Port the four scenario cards verbatim (M7 breakdown, 2pm changeover, public holiday, disputed delivery) as `bg-card border-hairline` cards with amber/signal Chips for tags. Calculator: driver slider 5–500 → shows `formatAud(monthlyPriceAud(n))`/mo vs estimated monthly loss (port RoiSection's loss model as-is if simple; otherwise: loss = drivers × $108/mo, the figure implied by $130,156/yr ÷ 100 drivers ÷ 12) with mono digits; REMOVE the PPTX download button. Also port RoiSection's before/after comparison (the Check/X columns) as a two-column `bg-card border-hairline` table — "Without Xiaro" rows with `X` in `text-signal`, "With Xiaro" rows with `Check` in `text-green-deep`, copy carried over verbatim.
- [ ] **Step 3:** Build green. Commit `feat: problem and cost sections with re-plumbed calculator`.

---

### Task 8: HowItWorks + EscalationLadder + ProductTour + Industries

**Files:**
- Create: `components/sections/HowItWorks.tsx`, `components/sections/ProductTour.tsx`, `components/sections/Industries.tsx`

**Interfaces:**
- Consumes: SectionHeading (№ 03 Scenarios→covered in Task 7; here № 03 "How it works", № 04 "Inside the product", № 05 "Industries"), BrowserFrame + the five Task 1 PNGs, Chip, TrustStrip.
- Produces: `<HowItWorks />` (includes escalation ladder), `<ProductTour />`, `<Industries />`.

- [ ] **Step 1: HowItWorks** (`id="how-it-works"`) — three numbered steps on cards: 01 "A driver messages the company number" ("WhatsApp or SMS — same number, same thread."), 02 "Xiaro checks the roster" ("Site, shift window, time of day. The message lands with the supervisor actually on duty."), 03 "Delivered — and watched" ("Read receipts, reply tracking, and a timer. Everything logged."). Below: **escalation ladder** — vertical rail, four rows with mono timers and Chips: `0:00 — Supervisor (on shift) · NOTIFIED` (green), `+5:00 — Escalation contact · NOTIFIED` (amber), `+15:00 — Duty manager · NOTIFIED` (amber), `+25:00 — Admin alert · FLAGGED` (signal). Caption: "Unanswered messages climb the ladder until a human owns them. Timings are yours to set."
- [ ] **Step 2: ProductTour** (`id="product"`) — five alternating blocks, each BrowserFrame(PNG) + copy:
  1. `conversation.png` — "Every conversation in one thread — whatever the channel." / "WhatsApp and SMS from the same driver land in the same thread, tagged with who was on shift when it arrived."
  2. `roster.png` — "The roster is the routing table." / "You already keep a roster. Xiaro reads it: change the roster and you've changed the routing. No contact lists to chase."
  3. `audit.png` — "When there's a dispute, you have the receipts." / "Every message, route decision and escalation is written to a tamper-evident audit trail. Timestamped, exportable, dispute-ready."
  4. `location.png` — "Location when it matters. Never tracking." / "Drivers approve a one-off GPS check-in when you ask for one. No background tracking, no surveillance — and drivers know it."
  5. `dashboard.png` — "The whole operation on one screen." / "Who's on shift, what's unanswered, what escalated, and what it cost you not to know last month."
  Insert `<TrustStrip />` directly after block 5.
- [ ] **Step 3: Industries** (`id="industries"`) — SectionHeading center + existing chip list (Transport, Warehousing, Field Services, Manufacturing, Security, Facilities, Local Government) as `Chip tone="ink"` grid; NO industries image.
- [ ] **Step 4:** Build green. Commit `feat: how-it-works with escalation ladder, product tour with real screenshots, industries`.

---

### Task 9: Landing composition + PricingSummary + FinalCta + old-code deletion

**Files:**
- Create: `components/sections/PricingSummary.tsx`, `components/sections/FinalCta.tsx`
- Rewrite: `app/page.tsx` (composition only, ~40 lines)
- Delete: `components/RoiSection.tsx`, `components/ParallaxImage.tsx`, `components/CheckoutButton.tsx`, `app/platform-prototype/`, `public/draft/`, `public/generated/`, `public/hero/`, `public/Xiaro-ROI-Business-Case.pptx`

**Interfaces:**
- Consumes: every section component from Tasks 6–8; MoneyBackBadge; pricing lib.
- Produces: final `/` page: Header → Hero → Problem → CostAndScenarios → HowItWorks → ProductTour(+TrustStrip) → Industries → PricingSummary → FinalCta → Footer.

- [ ] **Step 1: PricingSummary** — single `bg-card border border-hairline rounded-2xl` card: "Base — AU$79/mo" mono display, bullets (1 depot · 25 drivers included · all channels · escalation + audit included · +AU$3/driver/mo after 25 · annual = 2 months free), MoneyBackBadge, line "You bring your own carrier and WhatsApp Business accounts and pay them directly. We never mark up your messages.", Buttons: "See full pricing" primary → /pricing, "Talk to us (Enterprise)" outline → BOOKING_URL.
- [ ] **Step 2: FinalCta** — display headline "Stop chasing who's on shift.", sub "One number for the whole fleet. Routed by roster, escalated on silence, logged forever.", Get started + Book a demo.
- [ ] **Step 3:** Rewrite `app/page.tsx` as pure composition; delete all listed files/dirs.
- [ ] **Step 4:** `npm run build` + `npm test` green; `git rm` deletions. Commit `feat: compose new landing page; remove prototype, drafts and dead code`.

---

### Task 10: /pricing page

**Files:**
- Rewrite: `app/pricing/page.tsx` (server: metadata + layout + FAQ)
- Create: `components/pricing/PricingCalculator.tsx` (client island)

**Interfaces:**
- Consumes: pricing lib, checkout API (`POST /api/checkout` with `CheckoutRequest`), MoneyBackBadge, TrustStrip, SectionHeading, Button, Chip.
- Produces: `/pricing` with metadata `{ title: "Pricing", description: "AU$79/month for your first 25 drivers — every channel, escalation and audit included. AU$3 per extra driver. No message markups, ever.", alternates: { canonical: "/pricing" } }`.

- [ ] **Step 1: PricingCalculator (client)** — state: `drivers` (default 25, input + slider 1–1000), `interval` (monthly/annual toggle: "Annual — 2 months free" Chip green), `onboarding` (checkbox card: "Onboarding — AU$399 once-off. We connect your own carrier and WhatsApp Business accounts into Xiaro: number provisioning, SMS sender registration, WhatsApp Business verification, plus roster and escalation setup."). Price display: mono 5xl `formatAud(monthly)` + "/mo", annual shows `formatAud(annual)` + "/yr" + strikethrough `formatAud(monthly × 12)`. Breakdown line: "AU$79 base (25 drivers included)" + when >25: "+ N × AU$3". Submit: POST /api/checkout → redirect to `url`; on 503 render fallback Button "Book a setup call" → BOOKING_URL; on other errors inline `text-signal` message. Disable button while pending.
- [ ] **Step 2: Page assembly** — Header/Footer reused; hero row: SectionHeading "Pricing" / "One plan. Your own accounts. No markups."; calculator card + right rail: what's included list (1 depot, all channels — WhatsApp primary + SMS fallback, escalation ladder, tamper-evident audit trail, GPS check-in, no apps to install), MoneyBackBadge, transparency block ("You own your accounts. You pay carriers directly. We never mark up your messages."), Enterprise row ("Multiple depots, custom integrations, SLAs — Talk to us" → BOOKING_URL). FAQ (6 items, exact copy):
  1. "Do drivers or supervisors need to install anything?" → "No. Drivers and supervisors keep using WhatsApp and SMS on the phones they already have. Only ops managers use the dashboard."
  2. "What do we pay for messages?" → "You bring your own carrier and WhatsApp Business accounts and pay them directly at their rates. Xiaro never marks up a message."
  3. "What happens if a message isn't answered?" → "It climbs the escalation ladder: on-shift supervisor, then the escalation contact, then the duty manager, then an admin alert. Timings are configurable."
  4. "What does the AU$399 onboarding cover?" → "We connect your own accounts into Xiaro end-to-end: number provisioning, SMS sender registration, WhatsApp Business verification, plus roster and escalation setup."
  5. "What does the 30-day guarantee cover?" → "If Xiaro isn't routing your messages within 30 days of onboarding, we refund your subscription in full."
  6. "Is voice calling included?" → "Voice routing is on the roadmap. Today Xiaro routes WhatsApp (primary) and SMS (fallback)."
- [ ] **Step 3:** Build + tests green. Commit `feat: real pricing page with driver calculator and checkout`.

---

### Task 11: SEO — OG image, sitemap, robots, JSON-LD

**Files:**
- Create: `public/og.png` (1200×630, generated via Playwright from a scratchpad HTML in the design language: paper ground, ink display headline "One number. Every channel. The right person, every shift.", green chip row, xiaro.com.au mono), `app/sitemap.ts`, `app/robots.ts`, `components/seo/JsonLd.tsx`

**Interfaces:**
- `JsonLd()` renders two `<script type="application/ld+json">`: Organization (name Xiaro, url https://xiaro.com.au, email hello@xiaro.com.au, logo /og.png, areaServed AU) and SoftwareApplication (name Xiaro, applicationCategory BusinessApplication, offers: AUD 79/month). Mounted in `app/layout.tsx` body. FAQPage JSON-LD lives in `app/pricing/page.tsx` built from the same FAQ array (single source: export the FAQ array from a `lib/faq.ts`).

- [ ] **Step 1:** `app/sitemap.ts` → `/` and `/pricing` with `https://xiaro.com.au` base; `app/robots.ts` → allow all, disallow `/api/`, `/thanks`, sitemap URL.
- [ ] **Step 2:** Generate `public/og.png`, verify by reading the image.
- [ ] **Step 3:** JsonLd + FAQ single-sourcing; pricing page renders FAQPage JSON-LD from `lib/faq.ts`.
- [ ] **Step 4:** Build green; `curl localhost:3000/sitemap.xml` and `/robots.txt` correct in `next start` smoke. Commit `feat: OG image, sitemap, robots, JSON-LD`.

---

### Task 12: Verification gate

**Files:** none (fixes only if failures found)

- [ ] **Step 1: Grep gate:** `grep -rInE "Alltel|VoIPline|Notifyre|360dialog|Twilio|free trial|\\$149|\\$349|\\$699|cyan|gradient-to|backdrop-blur" app components lib` → expect zero matches (fix any).
- [ ] **Step 2:** `npm run lint && npm test && npm run build` all green.
- [ ] **Step 3: Visual pass** — `npm run start`, Playwright screenshots of `/` and `/pricing` at 375, 768, 1440 wide; read each image; check: no horizontal scroll, frames scale, type hierarchy holds, calculator shows AU$79 at 25 / AU$124 at 40 / AU$304 at 100.
- [ ] **Step 4:** Checkout smoke: POST /api/checkout without env → 503 JSON; with fake env vars → parse-level 400 on bad body. (Full Stripe test-mode run happens once owner creates prices.)
- [ ] **Step 4b:** Lighthouse (`npx lighthouse http://localhost:3000 --preset=desktop --quiet`): Performance, SEO, Accessibility each ≥ 90; fix regressions before merging.
- [ ] **Step 5:** Fix anything found, commit `chore: phase A verification pass`, then invoke superpowers:verification-before-completion and superpowers:finishing-a-development-branch (PR to main).

---

## Post-merge owner checklist (handoff)

1. Create Stripe prices (click-by-click provided in PR description): Base monthly graduated (tier 1 ≤25 flat AU$79, tier 2 unit AU$3), Base annual (flat AU$790 / unit AU$30), Onboarding one-time AU$399 → set the three env vars in Vercel.
2. Set `NEXT_PUBLIC_BOOKING_URL` (Cal.com/Calendly) in Vercel.
3. Point xiaro.com.au DNS at the Vercel project.
4. Regenerate the ROI business-case deck with new pricing (deleted stale PPTX).
