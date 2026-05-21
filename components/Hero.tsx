export default function Hero() {
  return (
    <section
      id="about"
      className="px-8 pt-28 pb-24 max-w-6xl mx-auto w-full"
      aria-label="About"
    >
      {/* Section label */}
      <div
        className="text-[10px] uppercase tracking-[0.3em] mb-5"
        style={{ fontFamily: "var(--font-jetbrains-mono)", color: "var(--text-4)" }}
      >
        [00] · About
      </div>

      {/* Headline */}
      <p
        className="leading-[1.35] font-normal max-w-[640px] mb-8 tracking-[-0.01em]"
        style={{
          fontFamily: "var(--font-fraunces)",
          fontSize: "clamp(28px, 4vw, 48px)",
          color: "var(--text-2)",
        }}
      >
        I build systems that scale{" "}
        <span style={{ color: "var(--text-3)" }}>&amp;</span>{" "}
        interfaces that breathe.
        <span
          className="cursor-blink inline-block ml-1 bg-[#f5f5f0]"
          style={{ width: "9px", height: "22px", verticalAlign: "-3px" }}
          aria-hidden="true"
        />
      </p>

      {/* Body copy */}
      <p
        className="text-[18px] leading-[1.7] max-w-[720px] mb-8"
        style={{ color: "var(--text-3)" }}
      >
        SUTD Design and AI student turning ambiguous problems into shipped
        products, across serverless GCP and AWS pipelines, IoT hardware
        integrations, multimodal ML systems, and consumer apps.
      </p>

      {/* CTAs */}
      <div className="flex gap-3 items-center flex-wrap">
        <a
          href="#projects"
          className="text-[11px] uppercase tracking-[0.15em] px-5 py-3 rounded-full active:scale-[0.97]"
          style={{
            fontFamily: "var(--font-jetbrains-mono)",
            background: "var(--text-1)",
            color: "var(--bg)",
            transition: "transform 100ms ease-out",
          }}
        >
          View work →
        </a>
        <a
          href="/resume.pdf"
          download
          className="text-[11px] uppercase tracking-[0.15em] px-5 py-3 rounded-full border-[0.5px] active:scale-[0.97]"
          style={{
            fontFamily: "var(--font-jetbrains-mono)",
            background: "transparent",
            color: "var(--text-2)",
            borderColor: "#333333",
            transition: "transform 100ms ease-out",
          }}
        >
          Résumé PDF
        </a>
      </div>
    </section>
  );
}
