"use client";

export default function BLETrackerArch() {
  return (
    <svg
      viewBox="0 0 780 210"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
      aria-label="BLE Asset Tracker system architecture diagram"
      role="img"
    >
      <defs>
        <marker id="ble-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#00ff88" />
        </marker>
        <filter id="ble-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <style>{`
          .ble-node { fill: #111; stroke: #2a2a2a; stroke-width: 1; rx: 8; }
          .ble-label { font-family: var(--font-geist-sans, system-ui); font-size: 11px; fill: #fafafa; }
          .ble-sub { font-family: var(--font-geist-mono, monospace); font-size: 9px; fill: #555; }
          .ble-proto { font-family: var(--font-geist-mono, monospace); font-size: 8.5px; fill: #00ff88; }
          .ble-edge { stroke: #00ff88; stroke-width: 1.5; fill: none; stroke-dasharray: 6 3; marker-end: url(#ble-arrow); }
        `}</style>
      </defs>

      {/* ── Row 1: ESP32 → Gateway → IoT Core → Lambda → DynamoDB ── */}

      {/* Node: ESP32-C6 */}
      <rect x="4" y="44" width="116" height="48" rx="8" className="ble-node" />
      <text x="62" y="64" textAnchor="middle" className="ble-label" fontWeight="600">ESP32-C6</text>
      <text x="62" y="79" textAnchor="middle" className="ble-sub">BLE Scanner</text>
      <circle cx="20" cy="68" r="5" fill="#00ff88" opacity="0.6" className="glow-pulse" />

      {/* Edge: ESP32 → Gateway */}
      <line x1="120" y1="68" x2="146" y2="68" className="ble-edge arch-flow" />
      <text x="133" y="62" textAnchor="middle" className="ble-proto">BLE</text>

      {/* Node: IoT Gateway */}
      <rect x="148" y="44" width="116" height="48" rx="8" className="ble-node" />
      <text x="206" y="64" textAnchor="middle" className="ble-label" fontWeight="600">IoT Gateway</text>
      <text x="206" y="79" textAnchor="middle" className="ble-sub">Raspberry Pi 4</text>
      <circle cx="164" cy="68" r="5" fill="#00ff88" opacity="0.6" className="glow-pulse" style={{ animationDelay: "0.3s" }} />

      {/* Edge: Gateway → IoT Core */}
      <line x1="264" y1="68" x2="290" y2="68" className="ble-edge arch-flow" style={{ animationDelay: "0.15s" }} />
      <text x="277" y="62" textAnchor="middle" className="ble-proto">MQTT</text>

      {/* Node: AWS IoT Core */}
      <rect x="292" y="44" width="116" height="48" rx="8" className="ble-node" />
      <text x="350" y="64" textAnchor="middle" className="ble-label" fontWeight="600">AWS IoT Core</text>
      <text x="350" y="79" textAnchor="middle" className="ble-sub">Rule Engine</text>
      <circle cx="308" cy="68" r="5" fill="#ff9933" opacity="0.7" className="glow-pulse" style={{ animationDelay: "0.6s" }} />

      {/* Edge: IoT Core → Lambda */}
      <line x1="408" y1="68" x2="434" y2="68" className="ble-edge arch-flow" style={{ animationDelay: "0.3s" }} />
      <text x="421" y="62" textAnchor="middle" className="ble-proto">Trigger</text>

      {/* Node: Lambda */}
      <rect x="436" y="44" width="116" height="48" rx="8" className="ble-node" />
      <text x="494" y="64" textAnchor="middle" className="ble-label" fontWeight="600">Lambda</text>
      <text x="494" y="79" textAnchor="middle" className="ble-sub">Trilateration</text>
      <circle cx="452" cy="68" r="5" fill="#ff9933" opacity="0.7" className="glow-pulse" style={{ animationDelay: "0.9s" }} />

      {/* Edge: Lambda → DynamoDB */}
      <line x1="552" y1="68" x2="578" y2="68" className="ble-edge arch-flow" style={{ animationDelay: "0.45s" }} />
      <text x="565" y="62" textAnchor="middle" className="ble-proto">Write</text>

      {/* Node: DynamoDB */}
      <rect x="580" y="44" width="116" height="48" rx="8" className="ble-node" />
      <text x="638" y="64" textAnchor="middle" className="ble-label" fontWeight="600">DynamoDB</text>
      <text x="638" y="79" textAnchor="middle" className="ble-sub">Asset positions</text>
      <circle cx="596" cy="68" r="5" fill="#ff9933" opacity="0.7" className="glow-pulse" style={{ animationDelay: "1.2s" }} />

      {/* ── Vertical connector: DynamoDB → API Gateway ── */}
      <line x1="638" y1="92" x2="638" y2="142" className="ble-edge arch-flow-slow" style={{ animationDelay: "0.6s" }} />
      <text x="648" y="120" textAnchor="start" className="ble-proto">REST</text>

      {/* ── Row 2: API Gateway → Dashboard ── */}

      {/* Node: API Gateway */}
      <rect x="580" y="144" width="116" height="48" rx="8" className="ble-node" />
      <text x="638" y="164" textAnchor="middle" className="ble-label" fontWeight="600">API Gateway</text>
      <text x="638" y="179" textAnchor="middle" className="ble-sub">HTTP REST</text>

      {/* Edge: API Gateway → Dashboard (left) */}
      <line x1="580" y1="168" x2="458" y2="168" className="ble-edge arch-flow" style={{ animationDelay: "0.75s" }} />
      <text x="519" y="162" textAnchor="middle" className="ble-proto">HTTPS</text>

      {/* Node: React Dashboard */}
      <rect x="340" y="144" width="116" height="48" rx="8" className="ble-node" />
      <text x="398" y="164" textAnchor="middle" className="ble-label" fontWeight="600">Dashboard</text>
      <text x="398" y="179" textAnchor="middle" className="ble-sub">React + WebSocket</text>
      <circle cx="356" cy="168" r="5" fill="#00ff88" opacity="0.6" className="glow-pulse" style={{ animationDelay: "1.5s" }} />
    </svg>
  );
}
