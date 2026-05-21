"use client";

export default function KateCartArch() {
  return (
    <svg
      viewBox="0 0 780 210"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
      aria-label="KateCart multimodal sentiment pipeline architecture"
      role="img"
    >
      <defs>
        <marker id="kc-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#00ff88" />
        </marker>
        <style>{`
          .kc-node { fill: #111; stroke: #2a2a2a; stroke-width: 1; }
          .kc-label { font-family: var(--font-geist-sans, system-ui); font-size: 11px; fill: #fafafa; }
          .kc-sub { font-family: var(--font-jetbrains-mono, monospace); font-size: 9px; fill: #555; }
          .kc-proto { font-family: var(--font-jetbrains-mono, monospace); font-size: 8.5px; fill: #00ff88; }
          .kc-edge { stroke: #00ff88; stroke-width: 1.5; fill: none; stroke-dasharray: 6 3; marker-end: url(#kc-arrow); }
        `}</style>
      </defs>

      {/* ── Row 1: Input → FFmpeg → Whisper → GPT-4V → Sentiment ── */}

      {/* Node: Video/Audio Input */}
      <rect x="4" y="44" width="116" height="48" rx="8" className="kc-node" />
      <text x="62" y="64" textAnchor="middle" className="kc-label" fontWeight="600">Video/Audio</text>
      <text x="62" y="79" textAnchor="middle" className="kc-sub">Checkout feed</text>
      <circle cx="20" cy="68" r="5" fill="#00ff88" opacity="0.6" className="glow-pulse" />

      {/* Edge: Input → FFmpeg */}
      <line x1="120" y1="68" x2="146" y2="68" className="kc-edge arch-flow" />
      <text x="133" y="62" textAnchor="middle" className="kc-proto">async</text>

      {/* Node: FFmpeg */}
      <rect x="148" y="44" width="100" height="48" rx="8" className="kc-node" />
      <text x="198" y="64" textAnchor="middle" className="kc-label" fontWeight="600">FFmpeg</text>
      <text x="198" y="79" textAnchor="middle" className="kc-sub">Preprocess</text>
      <circle cx="163" cy="68" r="5" fill="#a855f7" opacity="0.7" className="glow-pulse" style={{ animationDelay: "0.3s" }} />

      {/* Edge: FFmpeg → Whisper */}
      <line x1="248" y1="68" x2="272" y2="68" className="kc-edge arch-flow" style={{ animationDelay: "0.15s" }} />
      <text x="260" y="62" textAnchor="middle" className="kc-proto">audio</text>

      {/* Node: Whisper */}
      <rect x="274" y="44" width="100" height="48" rx="8" className="kc-node" />
      <text x="324" y="64" textAnchor="middle" className="kc-label" fontWeight="600">Whisper</text>
      <text x="324" y="79" textAnchor="middle" className="kc-sub">Transcription</text>
      <circle cx="289" cy="68" r="5" fill="#a855f7" opacity="0.7" className="glow-pulse" style={{ animationDelay: "0.6s" }} />

      {/* Edge: Whisper → Fusion (down to row 2) */}
      <line x1="324" y1="92" x2="324" y2="144" className="kc-edge arch-flow-slow" style={{ animationDelay: "0.3s" }} />

      {/* Edge: FFmpeg → GPT-4V */}
      <path d="M 198 92 L 198 118 L 432 118 L 432 92" className="kc-edge arch-flow-slow" fill="none" style={{ animationDelay: "0.2s" }} />
      <text x="316" y="113" textAnchor="middle" className="kc-proto">frames</text>

      {/* Node: GPT-4V */}
      <rect x="382" y="44" width="100" height="48" rx="8" className="kc-node" />
      <text x="432" y="64" textAnchor="middle" className="kc-label" fontWeight="600">GPT-4V</text>
      <text x="432" y="79" textAnchor="middle" className="kc-sub">Visual emotion</text>
      <circle cx="397" cy="68" r="5" fill="#a855f7" opacity="0.7" className="glow-pulse" style={{ animationDelay: "0.9s" }} />

      {/* Edge: GPT-4V → Fusion */}
      <line x1="432" y1="92" x2="432" y2="144" className="kc-edge arch-flow-slow" style={{ animationDelay: "0.45s" }} />

      {/* ── Row 2: Fusion → PostgreSQL → FastAPI → Dashboard ── */}

      {/* Node: Sentiment Fusion */}
      <rect x="274" y="144" width="116" height="48" rx="8" className="kc-node" />
      <text x="332" y="164" textAnchor="middle" className="kc-label" fontWeight="600">Sentiment Engine</text>
      <text x="332" y="179" textAnchor="middle" className="kc-sub">Fusion model</text>
      <circle cx="290" cy="168" r="5" fill="#00ff88" opacity="0.6" className="glow-pulse" style={{ animationDelay: "1.2s" }} />

      {/* Edge: Fusion → PostgreSQL */}
      <line x1="390" y1="168" x2="420" y2="168" className="kc-edge arch-flow" style={{ animationDelay: "0.6s" }} />
      <text x="405" y="162" textAnchor="middle" className="kc-proto">Write</text>

      {/* Node: PostgreSQL */}
      <rect x="422" y="144" width="116" height="48" rx="8" className="kc-node" />
      <text x="480" y="164" textAnchor="middle" className="kc-label" fontWeight="600">PostgreSQL</text>
      <text x="480" y="179" textAnchor="middle" className="kc-sub">Session store</text>
      <circle cx="438" cy="168" r="5" fill="#0ea5e9" opacity="0.7" className="glow-pulse" style={{ animationDelay: "1.5s" }} />

      {/* Edge: PostgreSQL → FastAPI */}
      <line x1="538" y1="168" x2="568" y2="168" className="kc-edge arch-flow" style={{ animationDelay: "0.75s" }} />
      <text x="553" y="162" textAnchor="middle" className="kc-proto">Query</text>

      {/* Node: FastAPI */}
      <rect x="570" y="144" width="100" height="48" rx="8" className="kc-node" />
      <text x="620" y="164" textAnchor="middle" className="kc-label" fontWeight="600">FastAPI</text>
      <text x="620" y="179" textAnchor="middle" className="kc-sub">REST + WS</text>
      <circle cx="585" cy="168" r="5" fill="#0ea5e9" opacity="0.7" className="glow-pulse" style={{ animationDelay: "1.8s" }} />

      {/* Edge: FastAPI → Dashboard */}
      <line x1="670" y1="168" x2="700" y2="168" className="kc-edge arch-flow" style={{ animationDelay: "0.9s" }} />

      {/* Node: React Dashboard */}
      <rect x="702" y="144" width="74" height="48" rx="8" className="kc-node" />
      <text x="739" y="164" textAnchor="middle" className="kc-label" fontWeight="600">Dashboard</text>
      <text x="739" y="179" textAnchor="middle" className="kc-sub">React</text>
      <circle cx="717" cy="168" r="5" fill="#00ff88" opacity="0.6" className="glow-pulse" style={{ animationDelay: "2.1s" }} />
    </svg>
  );
}
