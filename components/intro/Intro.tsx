import { LetterField } from "./LetterField";

export function Intro() {
  return (
    <section
      className="relative min-h-screen w-full flex flex-col px-8 py-7 bg-[#0a0a0a] text-[#f5f5f0]"
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
      <div className="flex-1 flex flex-col justify-center items-center gap-4 py-8">
        <LetterField />
        <p
          data-sutd=""
          className="font-mono text-[11px] tracking-[0.3em] uppercase text-neutral-500"
        >
          SUTD Design and AI student
        </p>
        <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-neutral-400">
          Software Engineer · AWS · GCP · ML Applications
        </p>
        <hr className="w-16 border-neutral-700 my-6" />
        <div className="w-full text-left">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-600 mb-2">
            [00] · About
          </p>
          <p
            className="font-display text-[#d4d4d0] font-normal leading-[1.3] tracking-[-0.01em] max-w-[640px]"
            style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
          >
            I build systems that scale &amp; interfaces that breathe.
          </p>
        </div>
      </div>

      {/* Bottom hints */}
      <div className="flex flex-col items-center gap-3.5">
        <p
          data-hint=""
          className="font-mono text-[11px] tracking-[0.4em] uppercase text-neutral-600 animate-pulse"
        >
          tap anywhere
        </p>
        <div className="font-mono text-[9px] tracking-[0.4em] uppercase text-neutral-700">
          ↓ scroll
        </div>
      </div>

      {/* sr-only headline for accessibility */}
      <h1 className="sr-only">
        Daniel Napitu — Software Engineer · AWS, GCP, ML Applications · SUTD Design and AI student
      </h1>
    </section>
  );
}
