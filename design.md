# Design — Daniel Napitu Portfolio

Locked design system. Every future Hallmark run reads this file before emitting code.
Do not regenerate per section — extend or amend this file when the system needs to grow.

## Genre
atmospheric

## Macrostructure family
- Single-page portfolio: Marquee Hero (centered, by author intent) — LetterField occupies the
  full first viewport; content sections below use Long Document rhythm (typographic section
  heads, no card-grid fanfare, no per-item scroll-reveals).

## Theme
Custom OKLCH — preserves Daniel's existing dark palette and phosphor-green accent.

- `--color-paper`        oklch(6% 0.005 250)
- `--color-paper-2`      oklch(9% 0.005 250)
- `--color-paper-3`      oklch(11% 0.005 250)
- `--color-rule`         oklch(14% 0.005 250)
- `--color-rule-2`       oklch(18% 0.005 250)
- `--color-ink`          oklch(98% 0.002 250)
- `--color-ink-2`        oklch(96% 0.003 85)
- `--color-ink-3`        oklch(87% 0.003 85)
- `--color-ink-4`        oklch(55% 0.003 250)
- `--color-ink-5`        oklch(36% 0.003 250)
- `--color-accent`       oklch(91% 0.23 157)   /* phosphor green */
- `--color-focus`        oklch(96% 0.003 85)
- `--color-data`         oklch(66% 0.18 215)   /* sky-blue — engineering tag */
- `--color-strategy`     oklch(67% 0.20 296)   /* purple — strategy tag */

Alpha variants via `color-mix()` — no hex-alpha appends:
- dim:    `color-mix(in oklch, var(--color-accent) 8%, transparent)`
- border: `color-mix(in oklch, var(--color-accent) 15%, transparent)`
- glow:   `color-mix(in oklch, var(--color-accent) 30%, transparent)`

## Typography
- Display: Fraunces, weight 400, italic-capable, `var(--font-fraunces)`
- Body: Geist Sans, weight 400–500, `var(--font-geist-sans)`
- Mono: JetBrains Mono, weight 400–500, `var(--font-jetbrains-mono)`
- Display tracking: −0.02em
- Body measure: max 65ch

## Spacing
4-point named scale. All tokens live in `tokens.css` and `app/globals.css :root`.
Components MUST use named tokens (`var(--space-md)`), never raw px/rem values for
layout spacing.

## Motion
- Easings: `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` (primary)
- Reveal pattern: one orchestrated section entrance via IntersectionObserver; content
  within the section appears without individual per-item reveals.
- LetterField: custom RAF loop — untouched by Hallmark.
- Reduced-motion fallback: all animations collapse to 0.01ms (globals.css).

## Microinteraction stance
- Silent success
- Hover delay 800ms · focus delay 0ms on tooltips
- Focus rings appear instantly — never animated
- `color-mix(in oklch, ...)` for all alpha variants — no hex-alpha string appends

## CTA voice
- Primary: filled, `background: var(--text-1)`, `color: var(--bg)`, rounded-lg, small padding.
- Secondary (links): border, rounded-md, mono uppercase label, 0.6rem / 0.1em tracking.

## Eyebrow policy
**OFF by default.** No `[NN] · Label` section eyebrows unless the content is genuinely
ordinal. The current site has zero eyebrows — keep it that way.

## What pages MUST share
- Font stack (Fraunces + Geist Sans + JetBrains Mono)
- OKLCH token system — no inline hex values anywhere
- Accent colour (phosphor green) at ≤ 5% per viewport
- `color-mix()` for all alpha/tint variants

## What pages MAY vary
- Section heading size and weight within the established scale
- Per-section motion (one entrance per section, not per item)
- ProjectCard view toggle (Impact / Architecture) — bespoke interaction, exempt

## Exports

### tokens.css
See `tokens.css` at project root — canonical OKLCH token definitions.

### Tailwind v4 `@theme`
See `app/globals.css` `@theme inline` block — maps Tailwind utilities to the token system.
