"use client";

import { useEffect, useRef, useState } from "react";

const NAV_ITEMS = [
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#footer" },
];

export default function Navigation({ onCmdK }: { onCmdK: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const update = () => {
      const y = window.scrollY;
      const max = document.body.scrollHeight - window.innerHeight;
      setScrolled(y > 20);
      setProgress(max > 0 ? (y / max) * 100 : 0);
    };
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40"
      style={{
        backdropFilter: scrolled ? "blur(16px) saturate(1.5)" : "none",
        background: scrolled ? "color-mix(in oklch, var(--bg) 90%, transparent)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        transition: "background 200ms ease-out, border-color 200ms ease-out",
      }}
    >
      {/* Scroll progress bar */}
      <div
        className="absolute bottom-0 left-0 h-px"
        style={{
          width: `${progress}%`,
          background: "color-mix(in oklch, var(--text-1) 25%, transparent)",
        }}
        aria-hidden="true"
      />

      <nav
        className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2"
          aria-label="Scroll to top"
        >
          <span
            className="text-sm tracking-tight"
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              color: "var(--text-4)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontSize: "10px",
            }}
          >
            daniel<span style={{ color: "var(--text-3)" }}>.</span>dev
          </span>
        </button>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className="nav-link px-3 py-1.5 text-sm rounded-md btn-press"
            >
              {item.label}
            </button>
          ))}

          {/* Cmd+K trigger */}
          <button
            onClick={onCmdK}
            className="ml-2 flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs btn-press"
            style={{
              color: "var(--text-4)",
              borderColor: "var(--border)",
              background: "transparent",
              fontFamily: "var(--font-jetbrains-mono)",
            }}
            aria-label="Open command palette"
          >
            <span>⌘K</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
