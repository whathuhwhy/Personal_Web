# Portfolio Intro + Tier 2 Vibe Pass — Build Spec

**Project:** danielnapitu.vercel.app (Next.js App Router + Tailwind + Framer Motion)
**Scope:** Tier 2 — Add a new full-viewport intro section, harmonize colors / type
across existing hero, no structural changes to Projects / Experience / Footer.
**Build order:** Steps 1 → 2 → 3. Each ships independently.

---

## Concept

The site opens on a near-black full viewport. Centered: a compact grid (~42 cols ×
11 rows) of monospace characters, drawn *only* from the letters of "DANIELNAPITU".
Most characters are dim and gently swap with neighbors at slow random intervals.
The center row already contains "DANIEL NAPITU" in correct order, but at reduced
opacity — your name is camouflaged inside the noise from the first frame.

Below the field, two pieces of identity copy:
- `SUTD Design and AI student` (visible always, even during drift)
- `Software Engineer · AWS · GCP · ML Applications` (fades in after resolve)

At the bottom of the section: a `Click to settle` pill and a small `↓ scroll` cue.

On click, the noise cells fade fast, the name cells brighten slowly with an
overshoot pop, letter-spacing tightens slightly, and the system settles. The
field is then static — no looping animation, no background motion.

The metaphor: your name was always there. Attention resolved it.

---

## Step 1 — Intro section (the new component)

### Files to create

```
src/components/intro/Intro.tsx         // section wrapper, top bar, copy, hint
src/components/intro/LetterField.tsx   // the grid + drift + settle + pop logic
src/components/intro/useReducedMotion.ts
src/lib/seededRandom.ts                // mulberry32 PRNG for SSR-safe randoms
```

### File to modify

```
src/app/page.tsx  →  render <Intro /> ABOVE the existing <Hero />
```

### Intro.tsx — layout

Full-viewport section, flex column, three rows: top bar → centered stack → bottom hints.

```tsx
<section
  className="relative min-h-screen flex flex-col px-8 py-7 bg-[#0a0a0a] text-[#f5f5f0]"
  aria-label="Introduction"
>
  {/* Top bar */}
  <div className="flex justify-between items-center font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-500">
    <span>daniel.dev</span>
    <nav className="flex gap-6 text-neutral-400">
      <a href="#projects">Projects</a>
      <a href="#experience">Experience</a>
      <a href="#contact">Contact</a>
    </nav>
    <span>⌘K</span>
  </div>

  {/* Centered stack */}
  <div className="flex-1 flex flex-col justify-center items-center gap-11 py-8">
    <LetterField />
    <p
      data-sutd
      className="font-mono text-[11px] tracking-[0.3em] uppercase text-neutral-500"
    >
      SUTD Design and AI student
    </p>
    <p
      data-tagline
      className="font-mono text-[11px] tracking-[0.3em] uppercase text-neutral-400 opacity-0 transition-opacity duration-700"
    >
      Software Engineer · AWS · GCP · ML Applications
    </p>
  </div>

  {/* Bottom hints */}
  <div className="flex flex-col items-center gap-3.5">
    <div
      data-hint
      className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-500 transition-opacity"
    >
      <span className="inline-block px-3.5 py-1.5 border-[0.5px] border-neutral-800 rounded-full">
        Click to settle
      </span>
    </div>
    <div className="font-mono text-[9px] tracking-[0.4em] uppercase text-neutral-700">
      ↓ scroll
    </div>
  </div>

  {/* sr-only headline for accessibility */}
  <h1 className="sr-only">
    Daniel Napitu — Software Engineer · AWS, GCP, ML Applications · SUTD Design and AI student
  </h1>
</section>
```

The intro is `min-h-screen` (full viewport on load) but scrollable — user
can pass through it without clicking. No fixed positioning, no scroll trap.

### LetterField.tsx — implementation

Renders the grid + runs the drift loop + handles click → settle → pop → resolve.

```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { mulberry32 } from "@/lib/seededRandom";
import { useReducedMotion } from "./useReducedMotion";

const TARGET = "DANIEL NAPITU";
const LETTERS = "DANIELNAPITU";
const COLS = 42;
const ROWS = 11;

type Mode = "drifting" | "settling" | "resolved";

type Cell = {
  letter: string;
  isTarget: boolean;
  targetLetter: string | null;
  swapTimer: number;
  swapInterval: number;
  opacity: number;
};

function buildCells(): Cell[] {
  const targetRow = Math.floor(ROWS / 2);
  const targetStartCol = Math.floor((COLS - TARGET.length) / 2);
  const targetMap = new Map<string, string>();
  for (let i = 0; i < TARGET.length; i++) {
    if (TARGET[i] !== " ") {
      targetMap.set(`${targetRow},${targetStartCol + i}`, TARGET[i]);
    }
  }

  const cells: Cell[] = [];
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const seedRng = mulberry32(y * COLS + x + 1);
      const isTarget = targetMap.has(`${y},${x}`);
      cells.push({
        letter: LETTERS[Math.floor(seedRng() * LETTERS.length)],
        isTarget,
        targetLetter: targetMap.get(`${y},${x}`) ?? null,
        swapTimer: seedRng() * 5000,
        swapInterval: 3500 + seedRng() * 4500,
        opacity: isTarget ? 0.32 : 0.1 + seedRng() * 0.22,
      });
    }
  }
  return cells;
}

export function LetterField() {
  const preRef = useRef<HTMLPreElement>(null);
  const [mode, setMode] = useState<Mode>("drifting");
  const modeRef = useRef<Mode>("drifting");
  const cellsRef = useRef<Cell[]>(buildCells());
  const resolveStartRef = useRef<number>(0);
  const reduce = useReducedMotion();

  // Mode ref sync
  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  // Skip if already seen this session
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("intro-seen") === "1") {
      const cells = cellsRef.current;
      for (const cell of cells) {
        if (cell.isTarget) {
          cell.letter = cell.targetLetter!;
          cell.opacity = 1;
        } else {
          cell.opacity = 0;
        }
      }
      setMode("resolved");
      resolveStartRef.current = performance.now() - 2000;
    }
  }, []);

  // Reduced motion: render resolved immediately, no loop
  useEffect(() => {
    if (!reduce) return;
    const cells = cellsRef.current;
    for (const cell of cells) {
      if (cell.isTarget) {
        cell.letter = cell.targetLetter!;
        cell.opacity = 1;
      } else {
        cell.opacity = 0;
      }
    }
    setMode("resolved");
  }, [reduce]);

  // Main animation loop
  useEffect(() => {
    if (reduce) {
      renderOnce();
      return;
    }

    let raf = 0;
    let last = performance.now();
    let stopped = false;

    function tick(now: number) {
      if (stopped) return;
      const dt = now - last;
      last = now;
      const cells = cellsRef.current;
      const m = modeRef.current;

      if (m === "drifting") {
        for (const cell of cells) {
          cell.swapTimer += dt;
          if (cell.swapTimer >= cell.swapInterval) {
            cell.swapTimer = 0;
            cell.swapInterval = 3500 + Math.random() * 4500;
            cell.letter = LETTERS[Math.floor(Math.random() * LETTERS.length)];
          }
        }
      } else if (m === "settling") {
        for (const cell of cells) {
          if (cell.isTarget) {
            cell.letter = cell.targetLetter!;
            cell.opacity += (1 - cell.opacity) * 0.035; // slow brighten
          } else {
            cell.opacity += (0 - cell.opacity) * 0.07; // fast fade — asymmetric
          }
        }
      }

      render(now);

      // Stop loop ~1.8s after resolve (pop animation has finished)
      if (m === "resolved" && now - resolveStartRef.current > 1800) {
        stopped = true;
        return;
      }
      raf = requestAnimationFrame(tick);
    }

    function renderOnce() {
      render(performance.now());
    }

    function render(now: number) {
      const pre = preRef.current;
      if (!pre) return;
      const cells = cellsRef.current;
      const m = modeRef.current;

      // Pop calculations
      let nameScale = 1;
      let letterSpacing = 4;
      let nameBrightness = 1;

      if (m === "settling" || m === "resolved") {
        const elapsed = now - resolveStartRef.current;
        const t = Math.min(1, elapsed / 1400);
        // Tracking tightens 4px → 3px
        letterSpacing = 4 - 1 * (1 - Math.pow(2, -10 * t));
        // Pop window: 900–1400ms after resolve
        const popT = Math.max(0, Math.min(1, (elapsed - 900) / 500));
        if (popT > 0 && popT < 1) {
          const bell = Math.sin(popT * Math.PI);
          nameScale = 1 + 0.035 * bell;
          nameBrightness = 1 + 0.15 * bell;
        }
      }

      pre.style.letterSpacing = `${letterSpacing.toFixed(2)}px`;
      pre.style.transform = `scale(${nameScale.toFixed(4)})`;

      // Build HTML once per frame
      const lines: string[] = [];
      for (let y = 0; y < ROWS; y++) {
        const parts: string[] = [];
        for (let x = 0; x < COLS; x++) {
          const cell = cells[y * COLS + x];
          const alpha = cell.opacity;
          if (alpha < 0.02) {
            parts.push(" ");
            continue;
          }
          const isResolvedTarget =
            (m === "settling" || m === "resolved") && cell.isTarget;
          if (isResolvedTarget) {
            const finalAlpha = Math.min(1, alpha * nameBrightness);
            parts.push(
              `<span style="color:rgba(245,245,240,${finalAlpha.toFixed(3)})">${cell.letter}</span>`
            );
          } else {
            parts.push(
              `<span style="color:rgba(140,140,130,${alpha.toFixed(3)})">${cell.letter}</span>`
            );
          }
        }
        lines.push(parts.join(""));
      }
      pre.innerHTML = lines.join("\n");
    }

    raf = requestAnimationFrame(tick);
    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  function handleClick() {
    if (modeRef.current !== "drifting") return;
    setMode("settling");
    resolveStartRef.current = performance.now();
    sessionStorage.setItem("intro-seen", "1");

    // Surface tagline + scroll cue, hide hint pill
    const root = preRef.current?.closest("section");
    if (root) {
      root.querySelector<HTMLElement>("[data-hint]")?.style.setProperty("opacity", "0");
      root.querySelector<HTMLElement>("[data-tagline]")?.style.setProperty("opacity", "1");
      const sutd = root.querySelector<HTMLElement>("[data-sutd]");
      if (sutd) sutd.style.color = "#a8a8a0";
    }

    setTimeout(() => setMode("resolved"), 1500);
  }

  return (
    <pre
      ref={preRef}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label="Resolve intro animation"
      className="font-mono text-[18px] leading-[22px] text-neutral-600 cursor-pointer select-none text-center whitespace-pre origin-center will-change-transform outline-none focus-visible:ring-1 focus-visible:ring-neutral-700 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a0a] rounded"
      style={{ letterSpacing: "4px" }}
    />
  );
}
```

### seededRandom.ts

```ts
export function mulberry32(seed: number) {
  let s = seed >>> 0;
  return function () {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
```

### useReducedMotion.ts

```ts
"use client";
import { useEffect, useState } from "react";

export function useReducedMotion(): boolean {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduce(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduce;
}
```

### Behavior summary

| Phase | Trigger | Duration | Easing | Notes |
| --- | --- | --- | --- | --- |
| Drift | Mount | Indefinite (until click) | linear per-cell swaps every 3.5–8s | Ambient. Center row is pre-aligned but dim. |
| Settle — noise fade | Click | ~1.5s | exponential approach (`*0.07` per frame) | Twice as fast as name brighten |
| Settle — name brighten | Click | ~1.5s | exponential approach (`*0.035` per frame) | Slow build for suspense |
| Pop | 900–1400ms post-click | 500ms | `Math.sin(t·π)` bell curve | Scale 1 → 1.035 → 1, brightness 1 → 1.15 → 1 |
| Tracking tighten | Click | 1.4s | ease-out exponential | Letter-spacing 4px → 3px |
| Tagline fade-in | Click + 800ms | 700ms | `cubic-bezier(0.23, 1, 0.32, 1)` | Snap curve |
| Resolved | Click + 1500ms | — | — | Loop terminates at 1800ms |

---

## Step 2 — Hero demotion + identity rewrite

The existing hero must change to make room for the intro. Two things: visual
demotion of the headline, and content rewrite to match the CV.

### File to modify

`src/components/Hero.tsx` (or wherever the existing hero lives)

### Changes

1. **Section label** above the headline:
   - Was: `Full-Stack Engineer · Data Systems`
   - Becomes: `[00] · About`
   - Reason: "Full-Stack Engineer" duplicates the intro's tagline. `[00] · About` ties
     the page to the intro's monospace vocabulary and frames the section as numbered.

2. **Headline scale + font**:
   - Keep the existing copy: `I build systems that scale & interfaces that breathe.`
   - Keep the blinking `▊` cursor.
   - Was: large display (likely 48–72px).
   - Becomes: `font-display` (Fraunces), `clamp(22px, 3.4vw, 34px)`, weight 400,
     line-height 1.35, color `text-neutral-300` (#d4d4d0). Smaller, calmer, more
     conversational. The `&` rendered in a slightly dimmer neutral.

3. **Body copy rewrite** (more accurate to CV):
   - Was: `SUTD Design and AI student. I turn ambiguous problems into shipped products —
     from hardware-level IoT pipelines to multimodal ML systems and consumer apps.`
   - Becomes: `SUTD Design and AI student turning ambiguous problems into shipped
     products — across serverless GCP and AWS pipelines, IoT hardware integrations,
     multimodal ML systems, and consumer apps.`
   - Reason: emphasizes AWS / GCP by name (CV-aligned, recruiter-scannable), removes
     the "I" repetition since the headline already says "I".

4. **CTAs** stay (`View work →`, `Résumé PDF`) but restyled in mono:
   - Font: `font-mono`
   - Size: 11px, tracking 0.15em, uppercase
   - Primary (`View work`): bg `#f5f5f0`, text `#0a0a0a`, rounded-full
   - Secondary (`Résumé PDF`): transparent bg, 0.5px border `#333`, text `#d4d4d0`
   - Padding: `px-5 py-3`
   - Active state: `transform: scale(0.97)` on press, 100ms

5. **Section padding**: top `80px`, bottom `96px` — generous breathing room since the
   intro just gave a full screen of negative space and we want the hero to feel like
   a natural continuation, not a sudden density shift.

6. **Remove any hairline divider** between the intro and hero. The bg color is the
   same (`#0a0a0a`) on both. Scroll should feel continuous. If `<Hero />` had a
   `border-t` or similar, kill it.

### Sample structure

```tsx
<section id="about" className="px-8 pt-20 pb-24 max-w-[760px] bg-[#0a0a0a] text-[#f5f5f0]">
  <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-500 mb-5">
    [00] · About
  </div>

  <p className="font-display text-[clamp(22px,3.4vw,34px)] leading-[1.35] font-normal text-neutral-300 max-w-[640px] mb-8 tracking-[-0.01em]">
    I build systems that scale <span className="text-neutral-500">&amp;</span> interfaces that breathe.
    <span className="inline-block w-[9px] h-[22px] bg-[#f5f5f0] align-[-3px] ml-1 animate-blink" />
  </p>

  <p className="text-[14.5px] leading-[1.65] text-neutral-400 max-w-[600px] mb-8">
    SUTD Design and AI student turning ambiguous problems into shipped products —
    across serverless GCP and AWS pipelines, IoT hardware integrations, multimodal
    ML systems, and consumer apps.
  </p>

  <div className="flex gap-3 items-center flex-wrap">
    <a href="#projects" className="font-mono text-[11px] tracking-[0.15em] uppercase bg-[#f5f5f0] text-[#0a0a0a] px-5 py-3 rounded-full active:scale-[0.97] transition-transform duration-100">
      View work →
    </a>
    <a href="/resume.pdf" className="font-mono text-[11px] tracking-[0.15em] uppercase bg-transparent text-neutral-300 border-[0.5px] border-neutral-700 px-5 py-3 rounded-full active:scale-[0.97] transition-transform duration-100">
      Résumé PDF
    </a>
  </div>
</section>
```

### Tailwind config additions (for the blink + custom easings)

```js
// tailwind.config.ts
extend: {
  fontFamily: {
    display: ['var(--font-display)', 'Georgia', 'serif'],
    mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
  },
  animation: {
    blink: 'blink 1s steps(2) infinite',
  },
  keyframes: {
    blink: {
      '0%, 50%': { opacity: '1' },
      '51%, 100%': { opacity: '0' },
    },
  },
  transitionTimingFunction: {
    resolve: 'cubic-bezier(0.16, 1, 0.3, 1)',
    snap: 'cubic-bezier(0.23, 1, 0.32, 1)',
  },
},
```

---

## Step 3 — Type & color harmonization

Add the two fonts and standardize colors. No structural changes elsewhere.

### Fonts

In `src/app/layout.tsx`:

```tsx
import { JetBrains_Mono, Fraunces } from "next/font/google";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const display = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${mono.variable} ${display.variable}`}>
      <body className="bg-[#0a0a0a] text-[#f5f5f0] antialiased">{children}</body>
    </html>
  );
}
```

- **JetBrains Mono** — small labels, mono blocks, the intro field, section numbers,
  CTA buttons. Weight 400 default, 500 for emphasis.
- **Fraunces** — display headlines only (the demoted hero headline, possibly section
  H2s like "Projects" and "Experience" if they currently use sans). Weight 400.
- **Body** — keeps the system sans (Inter or whatever's there now). Don't switch the
  body to serif.

### Color palette (apply globally)

| Token | Hex | Use |
| --- | --- | --- |
| `bg` | `#0a0a0a` | page background, all sections |
| `text-primary` | `#f5f5f0` | headlines, primary text |
| `text-secondary` | `#d4d4d0` | body copy, hero headline |
| `text-tertiary` | `#888` | secondary copy, labels |
| `text-quaternary` | `#555` | wordmarks, small labels, mono accents |
| `border-default` | `#2a2a2a` | hint pill, button borders |
| `border-subtle` | `#1a1a1a` | (rarely used — only if a true divider is needed) |

Add as CSS variables in `globals.css`:

```css
:root {
  --bg: #0a0a0a;
  --text-1: #f5f5f0;
  --text-2: #d4d4d0;
  --text-3: #888888;
  --text-4: #555555;
  --border-1: #2a2a2a;
  --border-2: #1a1a1a;
}
```

Or extend Tailwind theme directly. Either works — pick one and be consistent.

### Apply across existing sections

- **Projects section heading** (`## Projects`): wrap in `font-display`, add a
  mono label above (`[01] · Selected work` — replacing the current "Selected work"
  positioning). Existing project card structure unchanged.
- **Experience section heading** (`## Experience`): same treatment — add `[02] · Career`
  mono label above, headline in `font-display`. Existing cards unchanged.
- **Footer**: small labels (email, github, linkedin) in `font-mono`, uppercase,
  tracking 0.2em, color `var(--text-4)`. Email link text stays in its current style.

### What stays unchanged

- ⌘K command palette: no animation changes, no font changes. Instant. (Emil
  principle: keyboard-initiated, high-frequency, must stay instant.)
- Project card body content + the product/engineering toggle.
- Experience timeline structure.
- All routing.

---

## Things NOT to do

- Don't add scroll-driven progress to the intro resolve. Click is the only trigger.
  Scroll just passes through.
- Don't add a replay button. Once per session, irreversible via sessionStorage.
- Don't loop the intro animation after resolve. The loop must terminate ~1.8s after
  click. Verify via Chrome DevTools Performance tab that rAF stops.
- Don't add page transitions between routes. Keep navigation instant.
- Don't put the intro on routes other than `/`. Home only.
- Don't add cursor-following decorations, gradients, or particle effects elsewhere.
  The restraint is the point.
- Don't change the project card toggle animation — it's hit many times per session
  and must stay fast. (Leave whatever crossfade is there now.)
- Don't add WebGL or Canvas unless DOM perf actually fails on mobile. Start with the
  DOM-based implementation above; profile before optimizing.

---

## QA checklist

Before merging, verify each:

1. Reload `/` → intro shows drift state → click anywhere on field → settle → pop → resolved → still.
2. Reload `/` → scroll past without clicking → page works, intro stays in drift, no perf hit when off-screen.
3. Navigate to `/resume.pdf` (or any other route) and back → intro is already in resolved state (sessionStorage).
4. Open in incognito / new session → intro plays again.
5. DevTools > Rendering > emulate `prefers-reduced-motion: reduce` → intro shows resolved name immediately, no drift, no settle animation. SUTD line + tagline both visible.
6. DevTools > Performance: after resolve, requestAnimationFrame loop terminates within 2 seconds. CPU usage drops to baseline.
7. Lighthouse on `/`: performance ≥ 95, no CLS from intro mount.
8. Mobile 375px (iPhone SE): grid stays centered and readable. Letter size may need to drop to 14–16px on small screens — add a media query if it doesn't fit.
9. Tab to intro field: focus ring visible, Enter / Space triggers settle.
10. Slow scroll over the drifting intro: no jank, no layout shift, no flicker.
11. View source / screen reader: `<h1 className="sr-only">` text is present and contains full identity string.
12. Both fonts (JetBrains Mono, Fraunces) load without FOUT — `disptrylay: "swap"` is set on both.

---

## Build order recap

1. **Step 1**: Build LetterField + Intro. Get drift + settle + pop working. Ship.
2. **Step 2**: Demote hero + rewrite copy. Apply Fraunces to the headline. Ship.
3. **Step 3**: Add font variables, normalize color palette across remaining sections, add mono accents to Projects / Experience headers. Ship.

Each step is independently shippable. Don't try to ship all three in one PR.