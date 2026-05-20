"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, TrendingUp, Cpu } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import type { Project, ProjectView } from "@/lib/data";
import BLETrackerArch from "@/components/architectures/BLETrackerArch";
import KampongSGArch from "@/components/architectures/KampongSGArch";
import KateCartArch from "@/components/architectures/KateCartArch";

const ARCH_MAP: Record<string, React.ComponentType> = {
  BLETrackerArch,
  KampongSGArch,
  KateCartArch,
};

const PANEL_VARIANTS = {
  enter: (dir: number) => ({
    opacity: 0,
    y: dir * 10,
  }),
  center: {
    opacity: 1,
    y: 0,
  },
  exit: (dir: number) => ({
    opacity: 0,
    y: dir * -10,
  }),
};

export default function ProjectCard({ project }: { project: Project }) {
  const [view, setView] = useState<ProjectView>("impact");
  const [dir, setDir] = useState(1);

  const switchView = useCallback(
    (next: ProjectView) => {
      if (next === view) return;
      setDir(next === "architecture" ? 1 : -1);
      setView(next);
    },
    [view]
  );

  const ArchComponent = ARCH_MAP[project.architectureComponent];

  return (
    <article
      className="rounded-xl border flex flex-col overflow-hidden"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
      }}
      aria-label={`Project: ${project.title}`}
    >
      {/* Card header */}
      <div className="px-6 pt-6 pb-4 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3
              className="text-lg font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              {project.title}
            </h3>
            <p
              className="text-sm mt-0.5"
              style={{ color: "var(--text-secondary)" }}
            >
              {project.subtitle}
            </p>
          </div>

          {/* External links */}
          <div className="flex items-center gap-2 shrink-0 mt-0.5">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} GitHub`}
                className="p-1.5 rounded-md border btn-press"
                style={{
                  color: "var(--text-tertiary)",
                  borderColor: "var(--border)",
                  transition: "color 150ms ease-out",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "var(--text-tertiary)")
                }
              >
                <GithubIcon width={14} height={14} />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live site`}
                className="p-1.5 rounded-md border btn-press"
                style={{
                  color: "var(--text-tertiary)",
                  borderColor: "var(--border)",
                  transition: "color 150ms ease-out",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "var(--text-tertiary)")
                }
              >
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded text-xs"
              style={{
                background: "var(--surface-2)",
                color: "var(--text-tertiary)",
                border: "1px solid var(--border)",
                fontFamily: "var(--font-geist-mono)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Toggle switcher */}
      <div
        className="flex items-center gap-1 px-6 py-3 border-b"
        style={{ borderColor: "var(--border)" }}
        role="tablist"
        aria-label="Project view toggle"
      >
        {(["impact", "architecture"] as const).map((v) => (
          <button
            key={v}
            role="tab"
            aria-selected={view === v}
            aria-controls={`panel-${project.id}-${v}`}
            onClick={() => switchView(v)}
            className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium btn-press"
            style={{
              color: view === v ? "var(--text-primary)" : "var(--text-tertiary)",
              background: view === v ? "var(--surface-2)" : "transparent",
              border: `1px solid ${view === v ? "var(--border-2)" : "transparent"}`,
              transition:
                "color 150ms ease-out, background 150ms ease-out, border-color 150ms ease-out",
            }}
          >
            {v === "impact" ? <TrendingUp size={12} /> : <Cpu size={12} />}
            {v === "impact" ? "Product Impact" : "System Architecture"}
          </button>
        ))}
      </div>

      {/* Panel content */}
      <div className="relative flex-1 overflow-hidden" style={{ minHeight: 240 }}>
        <AnimatePresence custom={dir} mode="wait">
          {view === "impact" ? (
            <motion.div
              key="impact"
              id={`panel-${project.id}-impact`}
              role="tabpanel"
              aria-label="Product impact"
              custom={dir}
              variants={PANEL_VARIANTS}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
              className="absolute inset-0 px-6 py-5 overflow-y-auto"
            >
              <div className="space-y-5">
                {/* Problem */}
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-wider mb-1.5"
                    style={{
                      color: "var(--text-tertiary)",
                      fontFamily: "var(--font-geist-mono)",
                    }}
                  >
                    Problem
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {project.impact.problem}
                  </p>
                </div>

                {/* Solution */}
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-wider mb-1.5"
                    style={{
                      color: "var(--text-tertiary)",
                      fontFamily: "var(--font-geist-mono)",
                    }}
                  >
                    Solution
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {project.impact.solution}
                  </p>
                </div>

                {/* Metrics */}
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-wider mb-2"
                    style={{
                      color: "var(--text-tertiary)",
                      fontFamily: "var(--font-geist-mono)",
                    }}
                  >
                    Hard metrics
                  </p>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {project.impact.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="px-3 py-2.5 rounded-lg border"
                        style={{
                          background: "var(--accent-dim)",
                          borderColor: "rgba(0,255,136,0.15)",
                        }}
                      >
                        <p
                          className="text-base font-bold"
                          style={{ color: "var(--accent)" }}
                        >
                          {m.value}
                        </p>
                        <p
                          className="text-xs mt-0.5"
                          style={{ color: "var(--text-tertiary)" }}
                        >
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="architecture"
              id={`panel-${project.id}-architecture`}
              role="tabpanel"
              aria-label="System architecture"
              custom={dir}
              variants={PANEL_VARIANTS}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
              className="absolute inset-0 px-4 py-5 flex items-center justify-center"
            >
              <div className="w-full">
                <p
                  className="text-xs mb-4 text-center"
                  style={{
                    color: "var(--text-tertiary)",
                    fontFamily: "var(--font-geist-mono)",
                  }}
                >
                  // data flow pipeline
                </p>
                {ArchComponent && <ArchComponent />}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </article>
  );
}
