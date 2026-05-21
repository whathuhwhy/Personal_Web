import { Mail, Download } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

const LINKS = [
  { href: "https://github.com/whathuhwhy", icon: GithubIcon, label: "GitHub" },
  { href: "https://www.linkedin.com/in/daniel-napitu/", icon: LinkedinIcon, label: "LinkedIn" },
  { href: "mailto:daniel.parsaulian.napitu@gmail.com", icon: Mail, label: "Email" },
];

export default function Footer() {
  return (
    <footer
      id="footer"
      className="px-6 py-16 border-t max-w-6xl mx-auto w-full"
      style={{ borderColor: "var(--border)" }}
      aria-label="Contact and footer"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        {/* Left: branding + tagline */}
        <div>
          <div className="mb-2">
            <span
              className="text-[11px] uppercase tracking-[0.2em]"
              style={{ fontFamily: "var(--font-jetbrains-mono)", color: "var(--text-4)" }}
            >
              daniel<span style={{ color: "var(--text-3)" }}>.</span>dev
            </span>
          </div>
          <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
            Open to full-time roles and interesting contracts.
          </p>
          <p
            className="text-xs mt-1"
            style={{ color: "var(--text-tertiary)", fontFamily: "var(--font-jetbrains-mono)" }}
          >
            daniel.parsaulian.napitu@gmail.com
          </p>
        </div>

        {/* Right: links */}
        <div className="flex items-center gap-3">
          {LINKS.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={label}
              className="icon-link flex items-center gap-2 px-3 py-2 rounded-lg border btn-press"
            >
              <Icon size={14} />
              <span
                className="text-[10px] uppercase tracking-[0.2em]"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                {label}
              </span>
            </a>
          ))}

          <a
            href="/resume.pdf"
            download="daniel-napitu-resume.pdf"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold btn-press"
            style={{
              background: "var(--text-1)",
              color: "var(--bg)",
            }}
            aria-label="Download résumé PDF"
          >
            <Download size={14} />
            <span>Résumé</span>
          </a>
        </div>
      </div>

      <div
        className="mt-12 pt-6 border-t flex items-center justify-between"
        style={{ borderColor: "var(--border)" }}
      >
        <p
          className="text-xs"
          style={{ color: "var(--text-tertiary)", fontFamily: "var(--font-jetbrains-mono)" }}
        >
          © 2026 Daniel Napitu · Built with Next.js + Tailwind
        </p>
        <p
          className="text-xs"
          style={{ color: "var(--text-tertiary)", fontFamily: "var(--font-jetbrains-mono)" }}
        >
          Press{" "}
          <kbd
            className="px-1 py-0.5 rounded border"
            style={{ borderColor: "var(--border)" }}
          >
            ⌘K
          </kbd>{" "}
          to navigate
        </p>
      </div>
    </footer>
  );
}
