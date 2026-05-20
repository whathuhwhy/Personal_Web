"use client";

import { Mail, Download, Terminal } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

const LINKS = [
  { href: "https://github.com/danielnapitu", icon: GithubIcon, label: "GitHub" },
  { href: "https://linkedin.com/in/danielnapitu", icon: LinkedinIcon, label: "LinkedIn" },
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
          <div className="flex items-center gap-2 mb-2">
            <Terminal size={16} style={{ color: "var(--accent)" }} />
            <span
              className="text-sm font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              daniel<span style={{ color: "var(--accent)" }}>.</span>dev
            </span>
          </div>
          <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
            Open to full-time roles and interesting contracts.
          </p>
          <p
            className="text-xs mt-1"
            style={{
              color: "var(--text-tertiary)",
              fontFamily: "var(--font-geist-mono)",
            }}
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
              className="flex items-center gap-2 px-3 py-2 rounded-lg border text-sm btn-press"
              style={{
                color: "var(--text-secondary)",
                borderColor: "var(--border)",
                background: "var(--surface)",
                transition: "color 150ms ease-out, border-color 150ms ease-out",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = "var(--text-primary)";
                el.style.borderColor = "var(--border-2)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = "var(--text-secondary)";
                el.style.borderColor = "var(--border)";
              }}
            >
              <Icon size={14} />
              <span>{label}</span>
            </a>
          ))}

          <a
            href="/resume.pdf"
            download="daniel-napitu-resume.pdf"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold btn-press"
            style={{
              background: "var(--accent)",
              color: "#000",
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
          style={{
            color: "var(--text-tertiary)",
            fontFamily: "var(--font-geist-mono)",
          }}
        >
          © 2025 Daniel Napitu · Built with Next.js + Tailwind
        </p>
        <p
          className="text-xs"
          style={{
            color: "var(--text-tertiary)",
            fontFamily: "var(--font-geist-mono)",
          }}
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
