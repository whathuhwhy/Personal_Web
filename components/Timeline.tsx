"use client";

/* Hallmark · genre: atmospheric · macrostructure: Long Document (section rhythm)
 * design-system: design.md · redesigned: 2026-05-21
 * pre-emit critique: P5 H5 E5 S4 R5 V5
 */

import { useRef, useEffect, useState } from "react";
import { experience } from "@/lib/data";

const TYPE_COLOR: Record<string, string> = {
  engineering: "var(--accent)",
  data: "var(--color-data)",
  strategy: "var(--color-strategy)",
};

const TYPE_LABEL: Record<string, string> = {
  engineering: "Engineering",
  data: "Data",
  strategy: "Strategy",
};

export default function Timeline() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="experience"
      ref={ref}
      className="px-8 py-24 max-w-6xl mx-auto w-full"
      aria-labelledby="experience-heading"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(10px)",
        transition: "opacity var(--dur-long) var(--ease-out), transform var(--dur-long) var(--ease-out)",
      }}
    >
      {/* Section header */}
      <div className="mb-16">
        <h2
          id="experience-heading"
          className="font-normal"
          style={{
            fontFamily: "var(--font-fraunces)",
            fontSize: "clamp(28px, 4vw, 44px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "var(--text-1)",
          }}
        >
          Experience
        </h2>
        <p
          className="mt-3 max-w-xl"
          style={{ fontSize: "1rem", color: "var(--text-secondary)" }}
        >
          From data &amp; strategy to systems engineering — building on each layer.
        </p>
      </div>

      {/* Entries */}
      <div>
        {experience.map((entry, i) => (
          <article
            key={`${entry.company}-${i}`}
            className="border-t py-10"
            style={{ borderColor: "var(--border)" }}
          >
            {/* Meta row: period + type badge on left, location on right */}
            <div
              className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 mb-6"
            >
              <div className="flex items-center gap-3">
                <span
                  style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: "0.6rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    color: "var(--text-4)",
                  }}
                >
                  {entry.period}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: "0.6rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    padding: "0.2rem 0.5rem",
                    borderRadius: "var(--radius-sm)",
                    background: `color-mix(in oklch, ${TYPE_COLOR[entry.type]} 8%, transparent)`,
                    color: TYPE_COLOR[entry.type],
                    border: `1px solid color-mix(in oklch, ${TYPE_COLOR[entry.type]} 15%, transparent)`,
                  }}
                >
                  {TYPE_LABEL[entry.type]}
                </span>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: "0.6rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--text-4)",
                }}
              >
                {entry.location}
              </span>
            </div>

            {/* Role + company — left accent border signals type */}
            <div
              className="pl-4 mb-7"
              style={{
                borderLeft: `2px solid ${TYPE_COLOR[entry.type]}`,
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-fraunces)",
                  fontSize: "clamp(1rem, 2vw, 1.25rem)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                  color: "var(--text-1)",
                  fontWeight: "normal",
                  marginBottom: "0.25rem",
                  overflowWrap: "anywhere",
                  minWidth: 0,
                }}
              >
                {entry.role}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: "0.6rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "var(--text-4)",
                  lineHeight: 1.6,
                }}
              >
                {entry.company}
              </p>
            </div>

            {/* Highlights — plain prose, no decorators */}
            <ul className="space-y-2.5 mb-6 max-w-2xl" aria-label="Key highlights">
              {entry.highlights.map((hl, j) => (
                <li
                  key={j}
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {hl}
                </li>
              ))}
            </ul>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: "0.6rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    padding: "0.2rem 0.45rem",
                    borderRadius: "var(--radius-sm)",
                    background: "var(--surface-2)",
                    color: "var(--text-tertiary)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}

        <div className="border-t" style={{ borderColor: "var(--border)" }} aria-hidden="true" />
      </div>
    </section>
  );
}
