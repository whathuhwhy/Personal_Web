"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, ArrowRight, Mail, Download, Hash } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { commandItems } from "@/lib/data";

interface Props {
  open: boolean;
  onClose: () => void;
}

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string; width?: number; height?: number }>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  email: Mail,
  resume: Download,
};

function getIcon(id: string) {
  return ICON_MAP[id] ?? Hash;
}

export default function CommandPalette({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filtered = commandItems.filter(
    (item) =>
      query === "" ||
      item.label.toLowerCase().includes(query.toLowerCase())
  );

  const execute = useCallback(
    (item: (typeof commandItems)[number]) => {
      if (item.href) {
        if (item.href.startsWith("mailto")) {
          window.location.href = item.href;
        } else if (item.href === "/resume.pdf") {
          const a = document.createElement("a");
          a.href = item.href;
          a.download = "daniel-napitu-resume.pdf";
          a.click();
        } else {
          window.open(item.href, "_blank", "noopener,noreferrer");
        }
      } else if (item.section) {
        document.getElementById(item.section)?.scrollIntoView({ behavior: "smooth" });
      }
      onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const item = filtered[activeIndex];
        if (item) execute(item);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, filtered, activeIndex, execute, onClose]);

  // Scroll active item into view
  useEffect(() => {
    const li = listRef.current?.children[activeIndex] as HTMLElement | undefined;
    li?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50"
            style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            role="dialog"
            aria-label="Command palette"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="fixed z-50 left-1/2 -translate-x-1/2 w-full max-w-lg rounded-xl border overflow-hidden"
            style={{
              top: "20vh",
              background: "var(--surface)",
              borderColor: "var(--border-2)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04)",
            }}
          >
            {/* Search input */}
            <div
              className="flex items-center gap-3 px-4 py-3 border-b"
              style={{ borderColor: "var(--border)" }}
            >
              <Search size={16} style={{ color: "var(--text-tertiary)", flexShrink: 0 }} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search commands…"
                className="flex-1 bg-transparent text-sm outline-none"
                style={{
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-geist-sans)",
                }}
                aria-label="Search commands"
                aria-autocomplete="list"
                aria-controls="cmd-list"
              />
              <kbd
                className="px-1.5 py-0.5 rounded text-xs border"
                style={{
                  color: "var(--text-tertiary)",
                  borderColor: "var(--border)",
                  fontFamily: "var(--font-geist-mono)",
                  background: "var(--surface-2)",
                }}
              >
                ESC
              </kbd>
            </div>

            {/* Results */}
            <ul
              id="cmd-list"
              ref={listRef}
              role="listbox"
              aria-label="Commands"
              className="py-1.5 max-h-72 overflow-y-auto"
            >
              {filtered.length === 0 ? (
                <li
                  className="px-4 py-3 text-sm"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  No results for &quot;{query}&quot;
                </li>
              ) : (
                filtered.map((item, i) => {
                  const Icon = getIcon(item.id);
                  const isActive = i === activeIndex;
                  return (
                    <li
                      key={item.id}
                      role="option"
                      aria-selected={isActive}
                      onClick={() => execute(item)}
                      onMouseEnter={() => setActiveIndex(i)}
                      className="flex items-center gap-3 mx-1.5 px-3 py-2.5 rounded-lg cursor-pointer"
                      style={{
                        background: isActive ? "var(--surface-2)" : "transparent",
                        transition: "background 100ms ease-out",
                      }}
                    >
                      <span
                        className="p-1.5 rounded-md border"
                        style={{
                          color: isActive ? "var(--accent)" : "var(--text-tertiary)",
                          borderColor: isActive ? "rgba(0,255,136,0.2)" : "var(--border)",
                          background: isActive ? "var(--accent-dim)" : "transparent",
                          transition: "color 100ms, border-color 100ms, background 100ms",
                        }}
                      >
                        <Icon size={13} />
                      </span>
                      <span
                        className="flex-1 text-sm"
                        style={{
                          color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                        }}
                      >
                        {item.label}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {item.shortcut && (
                          <span
                            className="text-xs"
                            style={{
                              color: "var(--text-tertiary)",
                              fontFamily: "var(--font-geist-mono)",
                            }}
                          >
                            {item.shortcut}
                          </span>
                        )}
                        {isActive && (
                          <ArrowRight size={12} style={{ color: "var(--accent)" }} />
                        )}
                      </div>
                    </li>
                  );
                })
              )}
            </ul>

            {/* Footer hint */}
            <div
              className="px-4 py-2.5 border-t flex items-center gap-4"
              style={{ borderColor: "var(--border)" }}
              aria-hidden="true"
            >
              {[
                ["↑↓", "navigate"],
                ["↵", "select"],
                ["esc", "close"],
              ].map(([key, label]) => (
                <span
                  key={key}
                  className="flex items-center gap-1.5 text-xs"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  <kbd
                    className="px-1.5 py-0.5 rounded border"
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      borderColor: "var(--border)",
                      background: "var(--surface-2)",
                    }}
                  >
                    {key}
                  </kbd>
                  {label}
                </span>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
