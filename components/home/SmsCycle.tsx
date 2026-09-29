import type { SmsStage } from "@/lib/types";
import { cn } from "@/lib/cn";

const R = 150;
const C = 200;
// Nodes at top, lower-right, lower-left — a cycle that reads clockwise.
const ANGLES = [-90, 30, 150];

function point(deg: number, r = R) {
  const rad = (deg * Math.PI) / 180;
  return { x: C + r * Math.cos(rad), y: C + r * Math.sin(rad) };
}

function arc(from: number, to: number) {
  const a = point(from + 12);
  const b = point(to - 12);
  return `M ${a.x} ${a.y} A ${R} ${R} 0 0 1 ${b.x} ${b.y}`;
}

/**
 * The SMS cycle: Scholarship → Mentorship → Service → (new opportunity).
 * Decorative: the same information is in the text beside it.
 */
export function SmsCycle({
  stages,
  active,
  centerLabels,
  className,
}: {
  stages: SmsStage[];
  active: number;
  centerLabels: string[];
  className?: string;
}) {
  const segments = [
    arc(ANGLES[0], ANGLES[1]),
    arc(ANGLES[1], ANGLES[2]),
    arc(ANGLES[2], ANGLES[0] + 360),
  ];

  return (
    <svg viewBox="-60 0 520 430" className={cn("h-auto w-full", className)} aria-hidden="true">
      <defs>
        <marker id="sms-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M1 1 L8 5 L1 9" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </marker>
      </defs>

      <circle cx={C} cy={C} r={R} fill="none" stroke="var(--color-line)" strokeWidth="1" />

      {segments.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          markerEnd="url(#sms-arrow)"
          className={cn(
            "transition-[stroke,opacity] duration-700",
            i <= active ? "text-gold-500" : "text-sand",
          )}
          stroke="currentColor"
          style={{ opacity: i === 2 && active < 2 ? 0.5 : 1 }}
        />
      ))}

      {stages.map((s, i) => {
        const p = point(ANGLES[i]);
        const on = i === active;
        // Labels sit above the top node and below the two lower nodes.
        const lp =
          i === 0 ? { x: p.x, y: p.y - 26 } : i === 1 ? { x: p.x + 16, y: p.y + 38 } : { x: p.x - 16, y: p.y + 38 };
        return (
          <g key={s.id}>
            <circle
              cx={p.x}
              cy={p.y}
              r={on ? 15 : 9}
              className={cn(
                "transition-all duration-700",
                on ? "fill-evergreen-900" : i < active ? "fill-evergreen-700" : "fill-paper",
              )}
              stroke="var(--color-evergreen-900)"
              strokeWidth="1.5"
            />
            <text
              x={lp.x}
              y={lp.y}
              textAnchor={i === 0 ? "middle" : i === 1 ? "start" : "end"}
              className={cn(
                "font-serif text-[20px] transition-colors duration-700",
                on ? "fill-evergreen-900" : "fill-muted",
              )}
            >
              {s.title}
            </text>
          </g>
        );
      })}

      <text x={C} y={C - 6} textAnchor="middle" className="fill-gold-ink font-sans text-[11px] font-semibold tracking-[0.18em] uppercase">
        {active === 2 ? "Leads to" : "Stage"}
      </text>
      <text x={C} y={C + 26} textAnchor="middle" className="fill-evergreen-900 font-serif text-[26px] italic">
        {active === 2 ? centerLabels[3] : centerLabels[active]}
      </text>
    </svg>
  );
}
