/**
 * Geo point 3 — abstract artwork for "One community. Many networks." with no people.
 * Communities are clusters of points. Pathways bridge them, and a few gold
 * bridges carry a slow pulse (still with reduced motion). The geometry is
 * generated from a fixed seed at build time, so it is identical on every
 * render, crisp at any size, and weighs a few kilobytes instead of a photo.
 */

const W = 2100;
const H = 850;

function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Pt = { x: number; y: number; r: number; c: number };

const r = rng(1010);
/* Cluster centres: a loose arc, densest in the middle so phone crops (4:3 centre) stay rich. */
const centres = [
  { x: 210, y: 300, n: 9, s: 120 },
  { x: 470, y: 560, n: 11, s: 130 },
  { x: 700, y: 250, n: 12, s: 135 },
  { x: 930, y: 520, n: 14, s: 150 },
  { x: 1150, y: 240, n: 13, s: 140 },
  { x: 1380, y: 560, n: 12, s: 140 },
  { x: 1600, y: 300, n: 11, s: 130 },
  { x: 1820, y: 560, n: 9, s: 120 },
  { x: 1980, y: 220, n: 7, s: 100 },
];

const points: Pt[] = [];
const hubs: Pt[] = [];
centres.forEach((c, ci) => {
  hubs.push({ x: c.x, y: c.y, r: 5.5, c: ci });
  for (let i = 0; i < c.n; i++) {
    const a = r() * Math.PI * 2;
    const d = c.s * (0.35 + 0.65 * Math.sqrt(r()));
    points.push({ x: c.x + Math.cos(a) * d, y: c.y + Math.sin(a) * d * 0.78, r: 1.4 + r() * 2.2, c: ci });
  }
});

/* Intra-cluster spokes (hub → member) and a few member-to-member ties. */
const spokes = points.map((p) => ({ a: hubs[p.c], b: p }));
const ties: { a: Pt; b: Pt }[] = [];
for (let i = 0; i < points.length; i++) {
  const p = points[i];
  const q = points.find((o, j) => j !== i && o.c === p.c && Math.hypot(o.x - p.x, o.y - p.y) < 70 && r() > 0.5);
  if (q) ties.push({ a: p, b: q });
}

/* Bridges between neighbouring communities (curved), plus two long-range ones. */
const bridges: { a: Pt; b: Pt; gold: boolean; delay: number }[] = [];
for (let i = 0; i < hubs.length - 1; i++) {
  bridges.push({ a: hubs[i], b: hubs[i + 1], gold: i % 2 === 1, delay: i * 0.8 });
  if (i < hubs.length - 2 && i % 3 === 0) bridges.push({ a: hubs[i], b: hubs[i + 2], gold: false, delay: i * 0.5 + 0.3 });
}
bridges.push({ a: hubs[1], b: hubs[5], gold: true, delay: 2.6 });
bridges.push({ a: hubs[2], b: hubs[6], gold: false, delay: 4.1 });

const curve = (a: Pt, b: Pt, k = 0.18) => {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return `M${a.x.toFixed(1)} ${a.y.toFixed(1)} Q${(mx - dy * k).toFixed(1)} ${(my + dx * k).toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
};

/* Background dust. */
const dust = Array.from({ length: 140 }, () => ({ x: r() * W, y: r() * H, r: 0.5 + r() * 1.1, o: 0.15 + r() * 0.35 }));

export function NetworkConstellation({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={`constellation ${className ?? ""}`}
      role="img"
      aria-label="Abstract illustration: clusters of connected points linked by gold and blue pathways, representing many networks joining one community."
    >
      <defs>
        <radialGradient id="nc-glow-a" cx="30%" cy="20%" r="70%">
          <stop offset="0" stopColor="#2358c0" stopOpacity="0.55" />
          <stop offset="1" stopColor="#081b33" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="nc-glow-b" cx="78%" cy="85%" r="60%">
          <stop offset="0" stopColor="#c7a34b" stopOpacity="0.22" />
          <stop offset="1" stopColor="#081b33" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="nc-hub" r="0.5">
          <stop offset="0" stopColor="#f1e3bd" stopOpacity="0.95" />
          <stop offset="0.35" stopColor="#d8b866" stopOpacity="0.45" />
          <stop offset="1" stopColor="#d8b866" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="nc-bridge" x1="0" x2="1">
          <stop offset="0" stopColor="#3d72d6" stopOpacity="0.15" />
          <stop offset="0.5" stopColor="#9cb6ea" stopOpacity="0.6" />
          <stop offset="1" stopColor="#3d72d6" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      <rect width={W} height={H} fill="#060f20" />
      <rect width={W} height={H} fill="url(#nc-glow-a)" />
      <rect width={W} height={H} fill="url(#nc-glow-b)" />

      {/* faint meridians: the wider world the networks sit in */}
      <g fill="none" stroke="#9cb6ea" strokeOpacity="0.07" strokeWidth="1">
        {[260, 420, 580].map((ry) => (
          <ellipse key={ry} cx={W / 2} cy={H * 1.15} rx={W * 0.62} ry={ry} />
        ))}
      </g>

      <g fill="#f8f6f0">
        {dust.map((d, i) => (
          <circle key={i} cx={d.x.toFixed(1)} cy={d.y.toFixed(1)} r={d.r.toFixed(2)} opacity={d.o.toFixed(2)} />
        ))}
      </g>

      {/* community ties */}
      <g stroke="#f8f6f0" strokeOpacity="0.14" strokeWidth="1" fill="none">
        {spokes.map((s, i) => (
          <line key={i} x1={s.a.x.toFixed(1)} y1={s.a.y.toFixed(1)} x2={s.b.x.toFixed(1)} y2={s.b.y.toFixed(1)} />
        ))}
        {ties.map((s, i) => (
          <line key={`t${i}`} x1={s.a.x.toFixed(1)} y1={s.a.y.toFixed(1)} x2={s.b.x.toFixed(1)} y2={s.b.y.toFixed(1)} strokeOpacity="0.09" />
        ))}
      </g>

      {/* bridges between communities */}
      <g fill="none" strokeLinecap="round">
        {bridges.map((b, i) => (
          <path key={i} d={curve(b.a, b.b)} stroke={b.gold ? "#d8b866" : "url(#nc-bridge)"} strokeOpacity={b.gold ? 0.5 : 1} strokeWidth={b.gold ? 1.4 : 1.1} />
        ))}
        {/* travelling light along the gold bridges */}
        {bridges
          .filter((b) => b.gold)
          .map((b, i) => (
            <path
              key={`p${i}`}
              className="pulse"
              d={curve(b.a, b.b)}
              pathLength={1}
              stroke="#f1e3bd"
              strokeWidth="2.6"
              style={{ ["--pd" as string]: `${b.delay}s` }}
            />
          ))}
      </g>

      {/* members */}
      <g fill="#f8f6f0">
        {points.map((p, i) => (
          <circle key={i} cx={p.x.toFixed(1)} cy={p.y.toFixed(1)} r={p.r.toFixed(2)} opacity={0.55 + (i % 4) * 0.1} />
        ))}
      </g>

      {/* hubs: each organisation's anchor */}
      <g>
        {hubs.map((h, i) => (
          <g key={i}>
            <circle className="hub-glow" cx={h.x} cy={h.y} r={34} fill="url(#nc-hub)" opacity="0.8" style={{ ["--pd" as string]: `${i * 0.7}s` }} />
            <circle cx={h.x} cy={h.y} r={h.r} fill="#e6cf93" />
            <circle cx={h.x} cy={h.y} r={h.r + 7} fill="none" stroke="#e6cf93" strokeOpacity="0.35" />
          </g>
        ))}
      </g>
    </svg>
  );
}
