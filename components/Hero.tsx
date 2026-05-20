"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

const STACK_ITEMS = ["AWS", "GCP", "Python", "PostgreSQL", "React", "TypeScript"];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [typedStack, setTypedStack] = useState("");
  const stackStr = `$ stack: ${STACK_ITEMS.join(" / ")}`;
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    setMounted(true);
    let i = 0;
    const type = () => {
      if (i <= stackStr.length) {
        setTypedStack(stackStr.slice(0, i));
        i++;
        timerRef.current = setTimeout(type, 28);
      }
    };
    const delay = setTimeout(type, 800);
    return () => {
      clearTimeout(delay);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [stackStr]);

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center px-6 pt-20 pb-16 max-w-6xl mx-auto w-full"
      aria-label="Introduction"
    >
      {/* Eyebrow */}
      <div
        className="flex items-center gap-2 mb-8 transition-all duration-500"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(8px)",
          transitionDelay: "100ms",
        }}
      >
        <span
          className="h-px w-8"
          style={{ background: "var(--accent)" }}
          aria-hidden="true"
        />
        <span
          className="text-xs uppercase tracking-widest font-medium"
          style={{
            color: "var(--accent)",
            fontFamily: "var(--font-geist-mono)",
          }}
        >
          Full-Stack Engineer · Data Systems
        </span>
      </div>

      {/* Headline */}
      <h1
        className="transition-all duration-600"
        style={{
          fontSize: "clamp(2.6rem, 7vw, 5.5rem)",
          fontWeight: 900,
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
          color: "var(--text-primary)",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(16px)",
          transitionDelay: "200ms",
        }}
      >
        I build systems
        <br />
        <span style={{ color: "var(--text-tertiary)" }}>that scale </span>
        <span
          style={{
            color: "var(--accent)",
            textShadow: "0 0 40px var(--accent-glow)",
          }}
        >
          &amp;
        </span>
        <br />
        <span style={{ color: "var(--text-secondary)" }}>interfaces that</span>
        <br />
        breathe.
      </h1>

      {/* Terminal chip */}
      <div
        className="mt-10 transition-all duration-500"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(8px)",
          transitionDelay: "400ms",
        }}
      >
        <div
          className="inline-flex items-center gap-3 px-4 py-3 rounded-lg border"
          style={{
            background: "var(--surface)",
            borderColor: "var(--border)",
            fontFamily: "var(--font-geist-mono)",
          }}
        >
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 opacity-70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 opacity-70" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 opacity-70" />
          </div>
          <span
            className="text-sm"
            style={{ color: "var(--text-secondary)" }}
            aria-label={stackStr}
          >
            <span style={{ color: "var(--accent)" }}>
              {typedStack.startsWith("$") ? typedStack.slice(0, 1) : ""}
            </span>
            {typedStack.startsWith("$") ? typedStack.slice(1) : typedStack}
            {typedStack.length < stackStr.length && (
              <span className="cursor-blink" style={{ color: "var(--accent)" }}>
                ▊
              </span>
            )}
          </span>
        </div>
      </div>

      {/* Sub-copy */}
      <p
        className="mt-8 max-w-xl text-lg leading-relaxed transition-all duration-500"
        style={{
          color: "var(--text-secondary)",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(8px)",
          transitionDelay: "550ms",
        }}
      >
        SUTD Design and AI student. I turn ambiguous problems into shipped
        products — from hardware-level IoT pipelines to multimodal ML systems and
        consumer apps.
      </p>

      {/* CTAs */}
      <div
        className="mt-10 flex flex-wrap items-center gap-3 stagger transition-all duration-500"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(8px)",
          transitionDelay: "700ms",
        }}
      >
        <button
          onClick={() =>
            document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
          }
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold btn-press"
          style={{
            background: "var(--accent)",
            color: "#000",
          }}
        >
          View work
          <ArrowDown size={14} />
        </button>
        <a
          href="/resume.pdf"
          download
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border btn-press"
          style={{
            color: "var(--text-primary)",
            borderColor: "var(--border-2)",
            background: "var(--surface)",
          }}
        >
          Résumé PDF
        </a>

        <div className="flex items-center gap-2 ml-2">
          {[
            { href: "https://github.com/danielnapitu", icon: GithubIcon, label: "GitHub" },
            { href: "https://linkedin.com/in/danielnapitu", icon: LinkedinIcon, label: "LinkedIn" },
            {
              href: "mailto:daniel.parsaulian.napitu@gmail.com",
              icon: Mail,
              label: "Email",
            },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2 rounded-lg border btn-press"
              style={{
                color: "var(--text-tertiary)",
                borderColor: "var(--border)",
                background: "transparent",
                transition: "color 150ms ease-out, border-color 150ms ease-out",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = "var(--text-primary)";
                el.style.borderColor = "var(--border-2)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = "var(--text-tertiary)";
                el.style.borderColor = "var(--border)";
              }}
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="mt-20 flex items-center gap-2 transition-all duration-500"
        style={{
          opacity: mounted ? 0.4 : 0,
          transitionDelay: "1000ms",
        }}
        aria-hidden="true"
      >
        <ArrowDown size={12} style={{ color: "var(--text-tertiary)" }} />
        <span
          className="text-xs"
          style={{
            color: "var(--text-tertiary)",
            fontFamily: "var(--font-geist-mono)",
          }}
        >
          scroll
        </span>
      </div>
    </section>
  );
}
