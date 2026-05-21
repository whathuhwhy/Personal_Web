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
      className="px-8 py-24 max-w-6xl mx-auto w-full"
      aria-labelledby="projects-heading"
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
          [01] · Selected work
        </p>
        <h2
          id="projects-heading"
          className="font-normal"
          style={{
            fontFamily: "var(--font-fraunces)",
            fontSize: "clamp(28px, 4vw, 44px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "var(--text-1)",
          }}
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
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 400ms ease-out, transform 400ms ease-out",
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
