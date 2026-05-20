"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal } from "lucide-react";

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
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-200"
      style={{
        backdropFilter: scrolled ? "blur(16px) saturate(1.5)" : "none",
        background: scrolled
          ? "rgba(10, 10, 10, 0.85)"
          : "transparent",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      {/* Scroll progress bar */}
      <div
        className="absolute bottom-0 left-0 h-px transition-none"
        style={{
          width: `${progress}%`,
          background: "var(--accent)",
          boxShadow: "0 0 6px var(--accent-glow)",
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
          className="flex items-center gap-2 group"
          aria-label="Scroll to top"
        >
          <Terminal
            size={16}
            className="transition-colors duration-150"
            style={{ color: "var(--accent)" }}
          />
          <span
            className="text-sm font-semibold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            daniel<span style={{ color: "var(--accent)" }}>.</span>dev
          </span>
        </button>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className="px-3 py-1.5 text-sm rounded-md transition-colors duration-150 btn-press"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")
              }
            >
              {item.label}
            </button>
          ))}

          {/* Cmd+K trigger */}
          <button
            onClick={onCmdK}
            className="ml-2 flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs btn-press"
            style={{
              color: "var(--text-tertiary)",
              borderColor: "var(--border)",
              background: "var(--surface)",
              fontFamily: "var(--font-geist-mono)",
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
