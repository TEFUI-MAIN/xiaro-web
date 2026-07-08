# Xiaro Marketing Site — Zendesk-Template Redesign (Design Spec)

Date: 2026-07-08
Branch: feat/zendesk-redesign (off feat/phase-b-motion — inherits sim core, playground, pricing calculator, checkout)
Status: Approved by owner 2026-07-08 (with stock photography)

## 1. Overview

Full visual rebuild of the marketing site on the zendesk.com (2026) template:
its measured type scale, color-blocking system, section flow and storytelling
machinery — re-skinned to a Xiaro palette ("Forest & Volt"), with original
copy, our real product screenshots, curated licensed photography, and the
existing interactive machinery (journey loop, playground, ROI calculator,
Stripe checkout) recomposed into Zendesk-shaped containers. Target: reads as
a premium, $150K-tier site side-by-side with zendesk.com.

Emulate the template; never copy Zendesk assets, copy text, illustrations or
fonts. All claims stay truthful (no fake customer logos/testimonials).

## 2. Measured Zendesk system (research reference, captured 2026-07-08)

| Element | Measured value | Xiaro adaptation |
|---|---|---|
| Typeface | "Vanilla Sans" (proprietary), one family everywhere | Schibsted Grotesk (Google Fonts), one family |
| Display | 68px / 1.05 / weight 500 | identical (clamp to 40px mobile) |
| Card titles | 26px / 1.25 / 500 | identical |
| Body | 16px / 1.45 / 400 | identical |
| Eyebrow | 14px / 700 / 0.75px tracking / uppercase | identical |
| Buttons | 18px / 600, padding 10×20, radius 16px | identical |
| Ink | #11110D warm black | #11110D |
| Light text | #F5F5F2 warm white | #F5F5F2 (token `cream`) |
| Card gray | #F5F5F2 backgrounds | #F5F5F2 |
| Feature band | #203524 forest green | `forest` #1C3626 |
| CTA accent | #D1F470 electric lime, ink text | `volt` #A8F26B, ink text |
| Accent on white | darker green for accented headline words | `green-deep` #17834A |
| Section cards | radius 24px, inset from page edges | identical (`rounded-3xl`, mx to max-w-[1400px]) |
| Glow motif | lime radial glow behind frames/cards on dark | volt radial glow |

Retired from previous design: paper #FAFAF7 ground (→ white), Bricolage
Grotesque + Inter (→ Schibsted Grotesk), mono-as-brand (IBM Plex Mono remains
ONLY inside product-style vignettes: chat stamps, event log, roster windows,
prices in the calculator).

## 3. Page flow — `/` (mirrors zendesk.com structure 1:1)

1. **Announcement bar** — ink, thin: "New — driver-approved location
   check-ins. Privacy is the point. →" (links #product). Dismissible (X,
   localStorage).
2. **Nav** — white, hairline bottom border #E8E8E4: logo (ink recolor) ·
   links Product (#product), How it works (#how-it-works), Try it (#try-it),
   Pricing (/pricing) · right: "Log in" text link, outline pill "Book a
   demo", volt pill "Get started". Mobile: hamburger → full-screen ink sheet.
3. **Hero card** — ink #11110D, rounded-3xl, inset: left column: eyebrow
   "ROSTER-ROUTED FLEET MESSAGING" (cream, 14/700/0.75px caps), display-1
   "Every message finds the right person. Every shift." with "right person"
   in volt; sub (cream/80) "One company number on WhatsApp and SMS. Routed by
   who's on shift, escalated when nobody answers, logged forever."; proof
   row "✓ AU$79/mo to 25 drivers · ✓ No message markups · ✓ No apps"; volt
   pill "Get started" + cream-outline pill "Book a demo". Right column:
   photo `public/photos/hero-truck-dusk.jpg` (rounded-2xl, object-cover,
   full column height) with two floating UI vignettes overlapping it:
   WhatsApp inbound card (white, chat bubble + 02:47 stamp) upper-left of
   photo, and roster-match card (white, "Roster check → Emma Wilson · night"
   + green dot) lower-right with volt glow. Vignettes float in staggered.
4. **Trust strip** — white: small caps label left "BUILT FOR AUSTRALIAN
   FLEET OPERATIONS", right: four ink badges in a row (Official WhatsApp
   Business API · Carrier-grade SMS delivery · Audit-grade logging · 30-day
   money-back) — text-only, logo-strip rhythm, no fake customer logos.
5. **Statement** — centered display-2: "Group chats deflect blame. Fleets
   need answers." with "answers." in green-deep; sub line; volt pill "See
   how it works" (#how-it-works).
6. **Story spine** (`id="how-it-works"`) — the Zendesk connector motif:
   vertical hairline line down the center threading three warm-gray
   (#F5F5F2) rounded-3xl cards, connector nodes between them (ink circle
   icons: 💬 message → 📋 roster → ⏱ timer, rendered with lucide
   MessageCircle/CalendarCheck/TimerReset on ink discs), volt radial glow
   behind card 2. Cards (each: title 26/500 left + vignette right,
   min-h ~420px):
   1. "02:47. Truck 41 hits trouble." — WhatsApp thread vignette (reuse
      ChatMock visual language, white card on gray).
   2. "Xiaro reads the roster, not a contact list." — RosterMini vignette
      locking Emma Wilson, volt glow behind.
   3. "Silence climbs the ladder until a human owns it." — EscalationLadderCard.
   Line ends in a volt ✓ node. Scroll: cards rise in; connector line draws
   (scaleY scroll-linked); reduced-motion: static.
7. **Stats band** — white, centered: display-2 "One number. Zero apps.
   Everything on the record."; three huge green-deep numbers (count-up in
   view, mono NOT used — Schibsted 64/500): "1 / company number", "0 / apps
   to install", "100% / of messages logged".
8. **Forest tour band** (`id="product"`) — forest #1C3626 full-width
   rounded-3xl inset card: eyebrow (volt) "INSIDE THE PRODUCT", display-2
   cream "The dashboard your ops team watches."; vertical tab list left
   (Conversations / Rosters / Audit trail / Location check-in / Dashboard) —
   active: cream text + volt left rail; inactive: cream/50; right: active
   screenshot in a glow frame (rounded-xl, ring of volt/30 blur) + caption
   cream/70 under. Screenshots: existing /product/*.png (4 real) + location
   tab shows the coded LocationMock phone on forest. Tabs advance on click;
   auto-advance every 6s until first interaction; mobile: accordion.
9. **Two-up audience cards** — warm-gray cards, tops are forest panels with
   glowing UI vignettes (per Zendesk tile-6): "For operations managers"
   (mini dashboard stat row vignette) / "For drivers and supervisors"
   (WhatsApp bubble vignette + "No app. No login." chip). Bottoms: title,
   copy, volt pill + outline pill.
10. **Playground story card** (`id="try-it"`) — one giant warm-gray
    rounded-3xl card (Zendesk customer-story shape): left 40%: photo
    `night-headlights.jpg` with ink overlay strip at bottom carrying three
    cream stats (02:47 inbound · 5:00 escalation armed · 100% logged) and
    an amber "SIMULATION" chip top-left; right 60%: the existing Playground
    controls + event log restyled (white inputs, volt Run button, log stays
    mono). Section heading above: display-2 "Watch a message find its
    owner." CTA under: "Book a demo" outline.
11. **Pricing teaser** — white, centered: display-2 "Pricing built for
    fleets, not seats."; single warm-gray card: "AU$79/mo — first 25 drivers
    included · AU$3/driver after · every feature, every plan"; money-back
    badge (restyled volt-outline chip); volt pill "See pricing" (/pricing) +
    outline "Talk to us" (BOOKING_URL).
12. **Final CTA band** — forest rounded-3xl: display-2 cream "Stop chasing
    who's on shift."; volt pill "Get started" + cream-outline "Book a demo".
13. **Footer** — ink: 3 link columns (Product / Resources→(How it works,
    Try it, Pricing) / Company→(Contact, Book a demo, Log in)); hairline
    rule; display-2 line "Who's on shift right now? Find out" with "Find
    out" volt underlined → BOOKING_URL; legal row "© 2026 Xiaro Pty Ltd ·
    xiaro.com.au · Photos: Unsplash (see /credits.txt)".

## 4. `/pricing` — same skin

White ground; hero row (eyebrow + display-1 "One plan. Your own accounts.
No markups."); calculator card restyled: warm-gray card, ink segmented
toggle, volt Get-started button, prices stay mono; right rail cards
warm-gray; "why no message fees" card becomes forest with cream text; FAQ
on white with hairline dividers; footer shared. All calculator/checkout
logic untouched.

## 5. Components & files

```
tailwind.config.ts        replace palette: ink #11110D, cream #F5F5F2, gray #F5F5F2 (alias warm),
                          forest #1C3626, volt #A8F26B, green-deep #17834A, hairline #E8E8E4,
                          amber/signal kept for states; font-display/sans → Schibsted Grotesk var
app/globals.css           white body, ink text, ::selection volt
app/layout.tsx            next/font Schibsted_Grotesk weights 400–700 (--font-sans, used for display too) + IBM_Plex_Mono (--font-mono, vignettes only)
components/zd/*           new primitive set: Pill (volt|outline|cream-outline), Eyebrow,
                          Display (levels 1|2), SectionCard (ink|forest|gray wrapper),
                          GlowFrame, ConnectorNode, VignetteCard
components/sections/*     all rewritten to §3 flow (Announcement, Nav, HeroCard, TrustStrip,
                          Statement, StorySpine, StatsBand, ForestTour, AudienceCards,
                          PlaygroundCard, PricingTeaser, FinalCta, Footer)
Retained logic: lib/sim.ts, lib/pricing.ts, lib/checkout.ts, lib/faq.ts, lib/links.ts,
PricingCalculator (restyle), Playground internals (restyle), api/checkout, thanks page (restyle),
JsonLd, sitemap, robots. OG image regenerated in new language.
Deleted: previous section components not reused; TrustStrip/MoneyBackBadge replaced by zd/ set.
Chip is RETAINED (state stamps inside vignettes, SIMULATION badge, playground log) — it already
speaks product-language (mono, uppercase) which stays correct inside vignettes.
public/photos/            hero-truck-dusk.jpg, night-headlights.jpg, ops-supervisor.jpg (spare)
public/credits.txt        Unsplash attribution (Tan Kaninthanond; paws and prints; Rodrigo Rodrigues)
```

## 6. Continuous review protocol (the "$150K gate")

After each major section lands: `next start` + Playwright screenshot at 1440
and 375, then side-by-side grade against the captured zendesk tiles
(scratchpad zd/*.png) on: type scale fidelity, spacing generosity (Zendesk
uses ~120–160px section padding), color-block rhythm (white → gray card →
forest → white), radius consistency (24px), CTA prominence. Fix before
moving on. Final pass: full-page capture review of both pages + mobile.

## 7. Quality gates

- Lighthouse desktop `/`: Performance ≥ 95, Accessibility ≥ 95, SEO 100;
  `/pricing` Accessibility ≥ 95. (Volt on ink and cream on forest must pass
  contrast — volt #A8F26B on ink 11110D ≈ 10:1 ✓; cream on forest ≈ 9:1 ✓;
  ink on volt ≈ 12:1 ✓; green-deep on white ≈ 5.6:1 ✓.)
- vitest suites all green (sim, pricing, checkout untouched).
- Grep gate unchanged (vendor names, old prices, "free trial", cyan,
  gradient-to backdrop-blur — note: volt glow uses radial-gradient via
  arbitrary bg-[radial-gradient(...)]; amend gate regex to allow
  `radial-gradient` but still block `gradient-to` Tailwind directional
  gradient classes).
- No fake logos, no fabricated testimonials/metrics; simulation clearly
  badged; photos licensed (Unsplash free tier, credits recorded).
- Zero horizontal overflow 375/768/1440; reduced-motion static paths
  everywhere; `/` first-load JS ≤ 150 kB.

## 8. Risks

- Schibsted Grotesk at 68/500 may need letter-spacing -0.01em to match the
  Vanilla Sans density — tune at review.
- Photo art direction: hero photo is dusk-teal; if it fights the ink card,
  apply a subtle ink duotone overlay (bg-ink/30 + saturate-75).
- The forest tour band is the heaviest section (5 screenshots) — lazy-load
  non-active tab images (next/image loading="lazy" default already).
