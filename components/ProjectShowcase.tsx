"use client";

import { useRef, useEffect, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/data";

export default function ProjectShowcase() {
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
      id="projects"
      ref={ref}
      className="px-6 py-24 max-w-6xl mx-auto w-full"
      aria-labelledby="projects-heading"
    >
      {/* Section header */}
      <div
        className="mb-12 transition-all duration-500"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(12px)",
        }}
      >
        <p
          className="text-xs uppercase tracking-widest font-medium mb-2"
          style={{
            color: "var(--accent)",
            fontFamily: "var(--font-geist-mono)",
          }}
        >
          Selected work
        </p>
        <h2
          id="projects-heading"
          className="text-4xl font-black"
          style={{ letterSpacing: "-0.03em", color: "var(--text-primary)" }}
        >
          Projects
        </h2>
        <p
          className="mt-3 text-base max-w-xl"
          style={{ color: "var(--text-secondary)" }}
        >
          Toggle between the product story and the engineering reality for each project.
        </p>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {projects.map((project, i) => (
          <div
            key={project.id}
            className="transition-all duration-500"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transitionDelay: `${i * 80}ms`,
            }}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </section>
  );
}
