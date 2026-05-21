import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/data";

export default function ProjectShowcase() {
  return (
    <section
      id="projects"
      className="px-8 py-24 max-w-6xl mx-auto w-full"
      aria-labelledby="projects-heading"
    >
      <div className="mb-12">
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
          Selected work
        </h2>
        <p
          className="mt-3 text-base max-w-xl"
          style={{ color: "var(--text-secondary)" }}
        >
          Toggle between the product story and the engineering reality.
        </p>
      </div>

      <div
        className="border-t"
        style={{ borderColor: "var(--border)" }}
      >
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
