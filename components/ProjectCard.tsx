"use client";

/* Hallmark · genre: atmospheric · macrostructure: Split Studio · tone: technical · anchor hue: phosphor-green
 * pre-emit critique: P5 H4 E4 S4 R5 V4
 */

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, TrendingUp, Cpu } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import type { Project, ProjectView } from "@/lib/data";

const PANEL_VARIANTS = {
  enter: (dir: number) => ({ opacity: 0, y: dir * 6 }),
  center: { opacity: 1, y: 0 },
  exit: (dir: number) => ({ opacity: 0, y: dir * -6 }),
};

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
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

  const num = String(index + 1).padStart(2, "0");

  return (
    <article
      aria-label={`Project: ${project.title}`}
      className="py-10 border-b"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-12 items-start">

        {/* LEFT — project identity */}
        <div className="md:col-span-2 flex flex-col gap-4">

          {/* Decorative numeral + title */}
          <div>
            <span
              aria-hidden="true"
              style={{
                display: "block",
                fontFamily: "var(--font-fraunces)",
                fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                lineHeight: 1,
                color: "var(--text-4)",
                letterSpacing: "-0.04em",
                marginBottom: "0.5rem",
                fontWeight: "normal",
              }}
            >
              {num}
            </span>

            <h3
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
                lineHeight: 1.25,
                letterSpacing: "-0.01em",
                color: "var(--text-1)",
                fontWeight: "normal",
                marginBottom: "0.3rem",
                overflowWrap: "anywhere",
                minWidth: 0,
              }}
            >
              {project.title}
            </h3>

            <p
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "0.65rem",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "var(--text-4)",
                lineHeight: 1.6,
              }}
            >
              {project.subtitle}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: "0.6rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  padding: "0.2rem 0.45rem",
                  borderRadius: "3px",
                  background: "var(--surface-2)",
                  color: "var(--text-tertiary)",
                  border: "1px solid var(--border)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* External links */}
          {(project.githubUrl || project.liveUrl) && (
            <div className="flex items-center gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} source code on GitHub`}
                  className="icon-link btn-press flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: "0.6rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  <GithubIcon width={11} height={11} />
                  <span>Code</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} live site`}
                  className="icon-link btn-press flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: "0.6rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  <ExternalLink size={11} />
                  <span>Live</span>
                </a>
              )}
            </div>
          )}
        </div>

        {/* RIGHT — content */}
        <div className="md:col-span-3" style={{ minWidth: 0 }}>

          {/* Toggle */}
          <div
            className="flex items-center gap-1 mb-5"
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
                className="btn-press flex items-center gap-1.5 px-3 py-1.5 rounded-md"
                style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: "0.65rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: view === v ? "var(--text-primary)" : "var(--text-tertiary)",
                  background: view === v ? "var(--surface-2)" : "transparent",
                  border: `1px solid ${view === v ? "var(--border-2)" : "transparent"}`,
                  transition:
                    "color 150ms var(--ease-out), background 150ms var(--ease-out), border-color 150ms var(--ease-out)",
                }}
              >
                {v === "impact" ? <TrendingUp size={11} /> : <Cpu size={11} />}
                {v === "impact" ? "Product Impact" : "System Architecture"}
              </button>
            ))}
          </div>

          {/* Panel — mode="wait" so panels don't overlap */}
          <div style={{ minHeight: "13rem", minWidth: 0 }}>
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
                  className="space-y-5"
                >
                  {/* Metrics */}
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-jetbrains-mono)",
                        fontSize: "0.6rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.15em",
                        color: "var(--text-tertiary)",
                        marginBottom: "0.6rem",
                      }}
                    >
                      Hard metrics
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.impact.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="px-3 py-2 rounded-md border"
                          style={{
                            background: "var(--accent-dim)",
                            borderColor: "var(--accent-border)",
                          }}
                        >
                          <p
                            className="text-sm font-bold"
                            style={{ color: "var(--accent)" }}
                          >
                            {m.value}
                          </p>
                          <p
                            style={{
                              fontSize: "0.6rem",
                              marginTop: "0.1rem",
                              color: "var(--text-tertiary)",
                              fontFamily: "var(--font-jetbrains-mono)",
                            }}
                          >
                            {m.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Problem */}
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-jetbrains-mono)",
                        fontSize: "0.6rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.15em",
                        color: "var(--text-tertiary)",
                        marginBottom: "0.4rem",
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
                      style={{
                        fontFamily: "var(--font-jetbrains-mono)",
                        fontSize: "0.6rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.15em",
                        color: "var(--text-tertiary)",
                        marginBottom: "0.4rem",
                      }}
                    >
                      Solution
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {project.impact.solution}
                    </p>
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
                  className="flex items-start pt-1"
                >
                  <p
                    style={{
                      fontFamily: "var(--font-jetbrains-mono)",
                      fontSize: "0.65rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.3em",
                      color: "var(--text-4)",
                    }}
                  >
                    Architecture diagram coming soon
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </article>
  );
}
