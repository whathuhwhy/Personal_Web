"use client";
import { useEffect, useRef, useState } from "react";
import { mulberry32 } from "@/lib/seededRandom";
import { useReducedMotion } from "./useReducedMotion";

const TARGET = "DANIEL NAPITU";
const LETTERS = "DANIELNAPITU";
const COLS = 84;
const ROWS = 22;

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
        swapInterval: 50 + seedRng() * 100,
        opacity: isTarget ? 0.32 : 0.1 + seedRng() * 0.22,
      });
    }
  }
  return cells;
}

function showHeadline(el: HTMLHeadingElement) {
  el.style.opacity = "1";
  el.style.transform = "scale(1)";
}

export function LetterField() {
  const preRef = useRef<HTMLPreElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [mode, setMode] = useState<Mode>("drifting");
  const modeRef = useRef<Mode>("drifting");
  const [revertKey, setRevertKey] = useState(0);
  const mousePosRef = useRef<{ col: number; row: number } | null>(null);
  const cellsRef = useRef<Cell[]>(buildCells());
  const resolveStartRef = useRef<number>(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  // Skip animation if already seen this session
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("intro-seen") === "1") {
      for (const cell of cellsRef.current) cell.opacity = 0;
      if (headlineRef.current) showHeadline(headlineRef.current);
      setMode("resolved");
      resolveStartRef.current = performance.now() - 2000;
    }
  }, []);

  // Reduced motion: resolve immediately, no loop
  useEffect(() => {
    if (!reduce) return;
    for (const cell of cellsRef.current) cell.opacity = 0;
    if (headlineRef.current) showHeadline(headlineRef.current);
    setMode("resolved");
  }, [reduce]);

  // Main animation loop
  useEffect(() => {
    if (reduce) {
      renderFrame();
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
        const mp = mousePosRef.current;
        for (let i = 0; i < cells.length; i++) {
          const cell = cells[i];
          // Update interval every tick for smooth continuous falloff
          if (mp) {
            const cellCol = i % COLS;
            const cellRow = Math.floor(i / COLS);
            const dx = cellCol - mp.col;
            const dy = cellRow - mp.row;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const t = Math.max(0, 1 - dist / 12);
            cell.swapInterval = 60 + t * t * 940; // quadratic: 60ms at edge → 1000ms at center
          } else {
            cell.swapInterval = 60;
          }
          cell.swapTimer += dt;
          if (cell.swapTimer >= cell.swapInterval) {
            cell.swapTimer = 0;
            cell.letter = LETTERS[Math.floor(Math.random() * LETTERS.length)];
          }
        }
      } else if (m === "settling") {
        for (const cell of cells) {
          const factor = cell.isTarget ? 0.05 : 0.07;
          cell.opacity += (0 - cell.opacity) * factor;
        }
      }

      renderFrame();

      if (m === "resolved" && now - resolveStartRef.current > 1800) {
        stopped = true;
        return;
      }
      raf = requestAnimationFrame(tick);
    }

    function renderFrame() {
      const pre = preRef.current;
      if (!pre) return;
      const cells = cellsRef.current;
      const mp = mousePosRef.current;

      // Build "CLICK ME" overlay centered on mouse position
      const CLICK_ME = "CLICK ME";
      const overlay = new Map<number, string>();
      if (mp && modeRef.current === "drifting") {
        const centerRow = Math.round(mp.row);
        const startCol = Math.round(mp.col) - Math.floor(CLICK_ME.length / 2);
        for (let i = 0; i < CLICK_ME.length; i++) {
          const col = startCol + i;
          if (col >= 0 && col < COLS && centerRow >= 0 && centerRow < ROWS) {
            overlay.set(centerRow * COLS + col, CLICK_ME[i]);
          }
        }
      }

      const lines: string[] = [];
      for (let y = 0; y < ROWS; y++) {
        const parts: string[] = [];
        for (let x = 0; x < COLS; x++) {
          const idx = y * COLS + x;
          const overrideLetter = overlay.get(idx);
          if (overrideLetter !== undefined) {
            parts.push(
              overrideLetter === " "
                ? " "
                : `<span style="color:rgba(245,245,240,0.85)">${overrideLetter}</span>`
            );
            continue;
          }
          const cell = cells[idx];
          const alpha = cell.opacity;
          if (alpha < 0.02) {
            parts.push(" ");
            continue;
          }
          parts.push(
            `<span style="color:rgba(140,140,130,${alpha.toFixed(3)})">${cell.letter}</span>`
          );
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, revertKey]);

  function handleRevert() {
    cellsRef.current = buildCells();
    sessionStorage.removeItem("intro-seen");
    if (headlineRef.current) {
      headlineRef.current.style.opacity = "0";
      headlineRef.current.style.transform = "scale(0.97)";
    }
    const root = preRef.current?.closest("section");
    if (root) {
      const hint = root.querySelector<HTMLElement>("[data-hint]");
      if (hint) hint.style.opacity = "1";
    }
    setMode("drifting");
    setRevertKey((k) => k + 1);
  }

  function handleClick() {
    if (modeRef.current === "resolved") {
      handleRevert();
      return;
    }
    if (modeRef.current !== "drifting") return;
    setMode("settling");
    resolveStartRef.current = performance.now();
    sessionStorage.setItem("intro-seen", "1");

    const root = preRef.current?.closest("section");
    if (root) {
      root.querySelector<HTMLElement>("[data-hint]")?.style.setProperty("opacity", "0");
      root.querySelector<HTMLElement>("[data-tagline]")?.style.setProperty("opacity", "1");
      const sutd = root.querySelector<HTMLElement>("[data-sutd]");
      if (sutd) sutd.style.color = "#a8a8a0";
    }

    setTimeout(() => {
      if (headlineRef.current) showHeadline(headlineRef.current);
    }, 700);

    setTimeout(() => setMode("resolved"), 1500);
  }

  return (
    <div
      className="relative w-full cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-neutral-700 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a0a] rounded"
      onClick={handleClick}
      onMouseMove={(e) => {
        const pre = preRef.current;
        if (!pre) return;
        const rect = pre.getBoundingClientRect();
        mousePosRef.current = {
          col: ((e.clientX - rect.left) / rect.width) * COLS,
          row: ((e.clientY - rect.top) / rect.height) * ROWS,
        };
      }}
      onMouseLeave={() => { mousePosRef.current = null; }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label="Resolve intro animation"
    >
      <pre
        ref={preRef}
        className="font-mono text-[18px] leading-[22px] text-neutral-600 select-none text-center whitespace-pre origin-center will-change-transform pointer-events-none"
        style={{ letterSpacing: "4px" }}
      />
      <h2
        ref={headlineRef}
        className="absolute inset-0 flex items-center justify-center font-display font-normal text-[#f5f5f0] pointer-events-none select-none opacity-0 tracking-[-0.02em]"
        style={{
          fontSize: "clamp(56px, 9vw, 140px)",
          lineHeight: 1,
          transition:
            "opacity 700ms cubic-bezier(0.16, 1, 0.3, 1), transform 900ms cubic-bezier(0.16, 1, 0.3, 1)",
          transform: "scale(0.97)",
        }}
      >
        DANIEL NAPITU
      </h2>
    </div>
  );
}
