import { cn } from "@/lib/cn";

/**
 * The "ring of ten" — Ten Ambassadors' quiet recurring mark: ten nodes on a
 * circle (ten ambassadors, one connected cycle). Purely decorative.
 */
export function RingOfTen({
  className,
  tone = "gold",
  strokeOpacity = 0.35,
  highlight,
}: {
  className?: string;
  tone?: "gold" | "light" | "royal";
  strokeOpacity?: number;
  /** Index of one node to emphasize (0–9). */
  highlight?: number;
}) {
  const color = { gold: "var(--color-gold-400)", light: "var(--color-paper)", royal: "var(--color-royal-600)" }[tone];
  const nodes = Array.from({ length: 10 }, (_, i) => {
    const a = ((i * 36 - 90) * Math.PI) / 180;
    return { x: 100 + 90 * Math.cos(a), y: 100 + 90 * Math.sin(a) };
  });
  return (
    <svg viewBox="0 0 200 200" className={cn("pointer-events-none", className)} aria-hidden="true">
      <circle cx="100" cy="100" r="90" fill="none" stroke={color} strokeOpacity={strokeOpacity} strokeWidth="0.6" />
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={i === highlight ? 3.2 : 1.8}
          fill={color}
          fillOpacity={i === highlight ? 1 : Math.min(1, strokeOpacity * 2.2)}
        />
      ))}
    </svg>
  );
}

/** Oversized outline numeral used as editorial punctuation (e.g. "01"). */
export function OutlineNumeral({ children, className, tone = "royal" }: { children: string; className?: string; tone?: "royal" | "light" | "gold" }) {
  const stroke = { royal: "rgb(23 70 162 / 0.28)", light: "rgb(255 255 255 / 0.28)", gold: "rgb(216 184 102 / 0.55)" }[tone];
  return (
    <span
      aria-hidden="true"
      className={cn("pointer-events-none block font-sans leading-none font-semibold tracking-[-0.06em] text-transparent select-none", className)}
      style={{ WebkitTextStroke: `1px ${stroke}` }}
    >
      {children}
    </span>
  );
}
