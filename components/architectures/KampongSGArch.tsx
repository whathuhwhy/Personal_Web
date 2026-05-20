"use client";

export default function KampongSGArch() {
  return (
    <svg
      viewBox="0 0 780 210"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
      aria-label="KampongSG system architecture diagram"
      role="img"
    >
      <defs>
        <marker id="ksg-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#00ff88" />
        </marker>
        <style>{`
          .ksg-node { fill: #111; stroke: #2a2a2a; stroke-width: 1; }
          .ksg-label { font-family: var(--font-geist-sans, system-ui); font-size: 11px; fill: #fafafa; }
          .ksg-sub { font-family: var(--font-geist-mono, monospace); font-size: 9px; fill: #555; }
          .ksg-proto { font-family: var(--font-geist-mono, monospace); font-size: 8.5px; fill: #00ff88; }
          .ksg-edge { stroke: #00ff88; stroke-width: 1.5; fill: none; stroke-dasharray: 6 3; marker-end: url(#ksg-arrow); }
        `}</style>
      </defs>

      {/* ── Row 1: Client → Cloud Run → Firestore ── */}

      {/* Node: Next.js Frontend */}
      <rect x="4" y="44" width="126" height="48" rx="8" className="ksg-node" />
      <text x="67" y="64" textAnchor="middle" className="ksg-label" fontWeight="600">Next.js Client</text>
      <text x="67" y="79" textAnchor="middle" className="ksg-sub">React + tRPC</text>
      <circle cx="20" cy="68" r="5" fill="#00ff88" opacity="0.6" className="glow-pulse" />

      {/* Edge: Client → Cloud Run */}
      <line x1="130" y1="68" x2="158" y2="68" className="ksg-edge arch-flow" />
      <text x="144" y="62" textAnchor="middle" className="ksg-proto">HTTPS</text>

      {/* Node: Cloud Run */}
      <rect x="160" y="44" width="116" height="48" rx="8" className="ksg-node" />
      <text x="218" y="64" textAnchor="middle" className="ksg-label" fontWeight="600">Cloud Run</text>
      <text x="218" y="79" textAnchor="middle" className="ksg-sub">Node.js API</text>
      <circle cx="176" cy="68" r="5" fill="#4285f4" opacity="0.7" className="glow-pulse" style={{ animationDelay: "0.4s" }} />

      {/* Edge: Cloud Run → Firestore */}
      <line x1="276" y1="68" x2="302" y2="68" className="ksg-edge arch-flow" style={{ animationDelay: "0.2s" }} />
      <text x="289" y="62" textAnchor="middle" className="ksg-proto">SDK</text>

      {/* Node: Firestore */}
      <rect x="304" y="44" width="116" height="48" rx="8" className="ksg-node" />
      <text x="362" y="64" textAnchor="middle" className="ksg-label" fontWeight="600">Firestore</text>
      <text x="362" y="79" textAnchor="middle" className="ksg-sub">Realtime DB</text>
      <circle cx="320" cy="68" r="5" fill="#4285f4" opacity="0.7" className="glow-pulse" style={{ animationDelay: "0.8s" }} />

      {/* Edge: Firestore → Cloud Functions (vertical down-left) */}
      <path d="M 362 92 L 362 118 L 218 118 L 218 144" className="ksg-edge arch-flow-slow" style={{ animationDelay: "0.4s" }} />
      <text x="295" y="113" textAnchor="middle" className="ksg-proto">Trigger</text>

      {/* ── Row 2: Cloud Functions + Pub/Sub + Firebase Auth ── */}

      {/* Node: Cloud Functions */}
      <rect x="160" y="144" width="116" height="48" rx="8" className="ksg-node" />
      <text x="218" y="164" textAnchor="middle" className="ksg-label" fontWeight="600">Cloud Functions</text>
      <text x="218" y="179" textAnchor="middle" className="ksg-sub">Matching logic</text>
      <circle cx="176" cy="168" r="5" fill="#4285f4" opacity="0.7" className="glow-pulse" style={{ animationDelay: "1.2s" }} />

      {/* Edge: CF → Pub/Sub (right) */}
      <line x1="276" y1="168" x2="302" y2="168" className="ksg-edge arch-flow" style={{ animationDelay: "0.5s" }} />
      <text x="289" y="162" textAnchor="middle" className="ksg-proto">Publish</text>

      {/* Node: Pub/Sub */}
      <rect x="304" y="144" width="116" height="48" rx="8" className="ksg-node" />
      <text x="362" y="164" textAnchor="middle" className="ksg-label" fontWeight="600">Cloud Pub/Sub</text>
      <text x="362" y="179" textAnchor="middle" className="ksg-sub">Notifications</text>
      <circle cx="320" cy="168" r="5" fill="#4285f4" opacity="0.7" className="glow-pulse" style={{ animationDelay: "1.6s" }} />

      {/* Edge: CF ← Firebase Auth */}
      <line x1="158" y1="168" x2="130" y2="168" className="ksg-edge arch-flow" style={{ animationDelay: "0.3s" }} />
      <text x="144" y="162" textAnchor="middle" className="ksg-proto">Verify</text>

      {/* Node: Firebase Auth */}
      <rect x="4" y="144" width="124" height="48" rx="8" className="ksg-node" />
      <text x="66" y="164" textAnchor="middle" className="ksg-label" fontWeight="600">Firebase Auth</text>
      <text x="66" y="179" textAnchor="middle" className="ksg-sub">JWT tokens</text>
      <circle cx="20" cy="168" r="5" fill="#ff6d00" opacity="0.7" className="glow-pulse" style={{ animationDelay: "0.9s" }} />

      {/* Edge: Pub/Sub → Client (notification feedback loop) */}
      <path d="M 420 144 L 420 100 L 488 100" className="ksg-edge arch-flow-slow" fill="none" style={{ animationDelay: "0.6s" }} />

      {/* Node: FCM Push */}
      <rect x="490" y="76" width="116" height="48" rx="8" className="ksg-node" />
      <text x="548" y="96" textAnchor="middle" className="ksg-label" fontWeight="600">FCM Push</text>
      <text x="548" y="111" textAnchor="middle" className="ksg-sub">Caregiver alerts</text>
      <circle cx="506" cy="100" r="5" fill="#ff6d00" opacity="0.7" className="glow-pulse" style={{ animationDelay: "2s" }} />
    </svg>
  );
}
