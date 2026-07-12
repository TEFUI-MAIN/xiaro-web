# Xiaro Design System — MASTER
### Identity: "Hi-Vis Signage" · adopted 2026-07-12

This file is law for every page, component, and future build session in this
repo. Page-specific overrides live in `design-system/pages/<page>.md` and
override this file only where they explicitly say so. If a change conflicts
with this file, change this file first (one commit), then the code.

**Concept.** Xiaro's customers live in a world of road signage, hi-vis
vests, asphalt, and pre-dawn depots. The site borrows that world's visual
language: signage typography, one hi-vis amber accent used like a road
sign — sparingly and always meaning "read this" — warm paper grounds,
sharp confident type, tabular numbers. Calm, legible, industrial-honest.
Never playful-cartoon, never tech-glossy.

---

## 1. Color tokens

Define as CSS custom properties on `:root`; dark theme redefines tokens
under `@media (prefers-color-scheme: dark)` AND `:root[data-theme="dark"]`.
Components consume tokens only — never raw hex in components.

| Token | Light | Dark | Role |
|---|---|---|---|
| `--paper` | `#FAF8F3` | `#0E141D` | page ground (warm paper / asphalt night) |
| `--panel` | `#FFFFFF` | `#16202C` | cards, surfaces |
| `--ink` | `#14202E` | `#EEF2F6` | headings, body |
| `--ink-soft` | `#4A5A6D` | `#93A3B5` | secondary text (AA on ground — never lighter) |
| `--line` | `#E4DDD0` | `#263444` | borders, rules |
| `--amber` | `#F0A51E` | `#F0A51E` | THE accent. Panels, rules, badges, focus — never body text |
| `--amber-panel` | `#F6B53A` | `#EDA92C` | sign-panel fill |
| `--amber-ink` | `#8A5C07` | `#7A5206` | small amber-tinted labels on ground |
| `--sign-ink` | `#1C1607` | `#1C1607` | text ON amber panels (always dark, both themes) |
| `--good` | `#237A58` | `#4CC492` | ticks, success (semantic, not an accent) |
| `--danger` | `#B3372B` | `#E06A5B` | errors only |

**Rules.** Amber text on paper/panel is forbidden (contrast); amber is a
*surface and rule* color — text on it is `--sign-ink`. One accent: no volt
green, no sky/azure blue, no gradients of any kind. Semantic green/red never
decorates.

**Replaces (hunt down and remove):** `volt #84F27A`, `sky #18D9FF`,
`azure #1677FF`, `cream #F5F5F2` → `--paper`, `night #07111F` → dark
`--paper`, old `amber #E8A13A` → `--amber`.

## 2. Typography

Loaded via `next/font/google`. **Inter is banned in this repo.**

| Role | Face | Weights | Usage |
|---|---|---|---|
| Display | **Barlow Semi Condensed** | 600, 700 | h1–h3, prices, stat numbers. Tight leading (1.05–1.15), `letter-spacing: -0.01em`, `text-wrap: balance` |
| Body | **Barlow** | 400, 500 | paragraphs, UI. 16–18px, line-height 1.55–1.7, max 65ch |
| Data/mono | IBM Plex Mono (keep) | 400, 500 | code, API snippets only |

Barlow descends from US highway signage lettering — the pairing IS the
brand story. Eyebrows/labels: Barlow 600, 12px, uppercase,
`letter-spacing: .12em`, `--ink-soft` or `--amber-ink`. All aligned digits
(prices, rates, tables): `font-variant-numeric: tabular-nums`.

Type scale (desktop → mobile): hero 56→36 · h2 34→26 · h3 22→19 ·
body 17→16 · small 14 · label 12. Hero headlines are statements, oversized,
max ~14ch, left-aligned. **Never center body text.**

## 3. Shape, space, elevation

- Radii: buttons/inputs **6px**, cards **12px**, sign panels **16px**.
  Never `rounded-full` on rectangles; pills only for tiny badges.
- Borders: cards `1px var(--line)`; sign panels `3px solid var(--sign-ink)`;
  highlighted card `2px var(--ink)` (light) / `2px var(--amber)` (dark).
- Shadow (one, subtle): `0 1px 2px rgb(20 32 46 / .05), 0 8px 28px rgb(20 32 46 / .07)`.
  No glows, no colored shadows.
- Spacing rhythm: sections 96px apart (64 mobile); intra-section gaps via
  flex/grid `gap` (16/24/40), not stacked margins. Content max-width 1060px.

## 4. Signature motifs (use these, not generic SaaS furniture)

1. **The Sign Panel** — amber `--amber-panel` block, `3px --sign-ink`
   border, 16px radius, dark text. Reserved for THE key message per page
   (e.g. "At cost. Zero markup."). Maximum one per page.
2. **Promise rules** — key commitments as text blocks with a
   `3px solid var(--amber)` left rule. Never icon cards.
3. **Eyebrow labels** — every section opens with an uppercase letterspaced
   label. Structure over decoration.
4. **Tabular number blocks** — rates and stats set big in Barlow Semi
   Condensed with tabular-nums, unit text small in `--ink-soft`.
5. **Ticks, not icon zoos** — feature lists use a `--good` ✓ (SVG) +
   plain text. No emoji, no illustration-per-feature.

## 5. Components

- **Primary button:** `--ink` bg, `--paper` text (dark theme: `--amber-panel`
  bg, `--sign-ink` text), 6px radius, Barlow 600, no gradient, hover =
  slight darken (`transition: background-color 200ms`), visible focus ring
  `2px solid var(--amber)` offset 2px.
- **Secondary button:** transparent, `1.5px var(--ink)` border.
- **Nav:** `--paper` with 1px bottom `--line`; wordmark XIARO in Barlow
  Semi Condensed 700 letterspaced. No floating glass bars.
- **Cards:** `--panel`, 1px line, 12px radius, shadow token. Hover: border
  → `--ink-soft`, background unchanged — no scale transforms.
- **Footer:** dark ground (`#0E141D` both themes) with `--paper` text —
  the "night bookend" idea survives, re-toned to this palette.

## 6. Imagery & graphics

Prefer none over generic. When needed: real Australian transport
photography, duotoned to ink/amber, or flat signage-style diagrams built
from these tokens. **Banned:** 3D blob illustrations, stock "team at
laptop" photos, isometric city graphics, screenshot-in-perspective-browser
mockups.

## 7. Motion

150–250ms, `ease-out`, `transform`/`opacity` only. One orchestrated moment
per page maximum (e.g. hero stats counting up). Always honor
`prefers-reduced-motion` (skip counts, keep fades ≤150ms). No parallax,
no scroll-jacking, no perpetual pulse animations.

## 8. Accessibility floor (non-negotiable)

Text contrast ≥ 4.5:1 both themes (`--ink-soft` is the lightest body
color); focus visible on everything interactive; 44px touch targets;
keyboard order = visual order; SVG icons with aria-labels when standalone;
color never the only signal.

## 9. Anti-patterns — instant PR rejection

Inter/Space Grotesk anywhere · purple-to-blue (or any) gradient · glass/
blur cards · rounded-2xl-everything · emoji as icons · centered long-form
text · more than one accent hue · dark-section/light-section zebra striping
without purpose · marketing superlatives in place of the actual numbers
(this brand's voice IS the numbers).

## 10. Voice (words are design material)

Plain, confident, specific. Numbers over adjectives ("7¢ a message, at
cost" beats "incredibly affordable"). Australian spelling. Sentence case
everywhere except eyebrow labels. The reader is an operations manager at
5am — respect their time.
