"use client";

import { useRef, useEffect, useState } from "react";
import { experience } from "@/lib/data";

const TYPE_COLOR: Record<string, string> = {
  engineering: "var(--accent)",
  data: "#0ea5e9",
  strategy: "#a855f7",
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
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="experience"
      ref={ref}
      className="px-8 py-24 w-full"
      aria-labelledby="experience-heading"
    >
      {/* Section header */}
      <div
        className="mb-12"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 400ms ease-out, transform 400ms ease-out",
        }}
      >
        <p
          className="text-[10px] uppercase tracking-[0.3em] mb-2"
          style={{ fontFamily: "var(--font-jetbrains-mono)", color: "var(--text-4)" }}
        >
          [02] · Career
        </p>
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
          className="mt-3 text-base max-w-xl"
          style={{ color: "var(--text-secondary)" }}
        >
          From data &amp; strategy to systems engineering — building on each layer.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical spine */}
        <div
          className="absolute left-4 top-0 bottom-0 w-px"
          style={{
            background: "var(--border)",
            opacity: visible ? 1 : 0,
            transition: "opacity 700ms ease-out",
            transitionDelay: "200ms",
          }}
          aria-hidden="true"
        />

        <div className="space-y-0">
          {experience.map((entry, i) => (
            <div
              key={`${entry.company}-${i}`}
              className="relative pl-12 pb-10"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(10px)",
                transition: "opacity 400ms ease-out, transform 400ms ease-out",
                transitionDelay: `${i * 80 + 150}ms`,
              }}
            >
              {/* Dot */}
              <div
                className="absolute left-0 top-1 flex items-center justify-center w-8 h-8 rounded-full border"
                style={{
                  background: "var(--bg)",
                  borderColor: TYPE_COLOR[entry.type] ?? "var(--border)",
                  boxShadow: `0 0 12px ${TYPE_COLOR[entry.type] ?? "transparent"}44`,
                }}
                aria-hidden="true"
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: TYPE_COLOR[entry.type] ?? "var(--border)" }}
                />
              </div>

              {/* Card */}
              <div
                className="rounded-xl border p-6"
                style={{
                  background: "var(--surface)",
                  borderColor: "var(--border)",
                }}
              >
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3
                        className="text-base font-bold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {entry.role}
                      </h3>
                      <span
                        className="px-2 py-0.5 rounded text-xs font-medium"
                        style={{
                          background: `${TYPE_COLOR[entry.type]}15`,
                          color: TYPE_COLOR[entry.type],
                          border: `1px solid ${TYPE_COLOR[entry.type]}30`,
                        }}
                      >
                        {TYPE_LABEL[entry.type]}
                      </span>
                    </div>
                    <p
                      className="text-sm mt-0.5"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {entry.company} · {entry.location}
                    </p>
                  </div>
                  <span
                    className="text-xs shrink-0 mt-0.5"
                    style={{
                      color: "var(--text-tertiary)",
                      fontFamily: "var(--font-jetbrains-mono)",
                    }}
                  >
                    {entry.period}
                  </span>
                </div>

                {/* Highlights */}
                <ul className="space-y-2.5" aria-label="Key highlights">
                  {entry.highlights.map((hl, j) => (
                    <li
                      key={j}
                      className="flex gap-3 text-sm leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <span
                        className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full"
                        style={{ background: TYPE_COLOR[entry.type] ?? "var(--border)" }}
                        aria-hidden="true"
                      />
                      {hl}
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {entry.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-xs"
                      style={{
                        background: "var(--surface-2)",
                        color: "var(--text-tertiary)",
                        border: "1px solid var(--border)",
                        fontFamily: "var(--font-jetbrains-mono)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
