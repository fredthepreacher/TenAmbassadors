import type { SmsStage } from "@/lib/types";
import { cn } from "@/lib/cn";

const R = 150;
const C = 200;
const CIRC = 2 * Math.PI * R; // ≈ 942
// Stage nodes sit at 0, ⅓ and ⅔ of the way around, starting at the top.
const STAGE_AT = [0, 1 / 3, 2 / 3];

function at(fraction: number, r = R) {
  const a = fraction * 2 * Math.PI - Math.PI / 2;
  return { x: C + r * Math.cos(a), y: C + r * Math.sin(a) };
}

/**
 * The SMS cycle, drawn by scroll progress (0 → 1).
 * Ten quiet ticks around the ring (the "ring of ten") light up as the line
 * passes them; completing the cycle closes the circle and sends one gold
 * pulse around it. Decorative — the same information is in the text.
 */
export function SmsCycle({
  stages,
  progress,
  active,
  complete,
  centerLabels,
  finaleLabel,
  className,
}: {
  stages: SmsStage[];
  progress: number;
  active: number;
  complete: boolean;
  centerLabels: string[];
  finaleLabel: string;
  className?: string;
}) {
  const drawn = Math.max(0.001, Math.min(1, progress));
  const label = complete ? finaleLabel : centerLabels[active];

  return (
    <svg viewBox="-70 -10 540 440" className={cn("h-auto w-full overflow-visible", className)} aria-hidden="true">
      <defs>
        <filter id="sms-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* Track */}
      <circle cx={C} cy={C} r={R} fill="none" stroke="var(--color-line-strong)" strokeWidth="1" />

      {/* Completion glow */}
      {complete ? (
        <circle cx={C} cy={C} r={R} fill="none" stroke="var(--color-gold-400)" strokeWidth="6" filter="url(#sms-glow)" className="cycle-glow" />
      ) : null}

      {/* Progress line — drawn clockwise from the top */}
      <circle
        cx={C}
        cy={C}
        r={R}
        fill="none"
        stroke={complete ? "var(--color-gold-500)" : "var(--color-royal-700)"}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray={CIRC}
        strokeDashoffset={CIRC * (1 - drawn)}
        transform={`rotate(-90 ${C} ${C})`}
      />

      {/* One gold pulse travelling around the closed circle */}
      {complete ? (
        <circle
          cx={C}
          cy={C}
          r={R}
          fill="none"
          stroke="var(--color-gold-300)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={`60 ${CIRC}`}
          transform={`rotate(-90 ${C} ${C})`}
          className="cycle-pulse"
        />
      ) : null}

      {/* Ring of ten */}
      {Array.from({ length: 10 }, (_, i) => {
        const f = i / 10;
        if (STAGE_AT.some((s) => Math.abs(s - f) < 0.01)) return null;
        const p = at(f);
        const lit = drawn >= f;
        return (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={2.6}
            fill={lit ? (complete ? "var(--color-gold-500)" : "var(--color-royal-700)") : "var(--color-sand)"}
            style={{ transition: "fill 0.5s" }}
          />
        );
      })}

      {/* Stage nodes + labels */}
      {stages.map((s, i) => {
        const p = at(STAGE_AT[i]);
        const reached = drawn >= STAGE_AT[i] - 0.001;
        const on = i === active && !complete;
        const lp = i === 0 ? { x: p.x, y: p.y - 30, a: "middle" } : i === 1 ? { x: p.x + 20, y: p.y + 40, a: "start" } : { x: p.x - 20, y: p.y + 40, a: "end" };
        return (
          <g key={s.id}>
            {on ? <circle cx={p.x} cy={p.y} r={22} fill="var(--color-royal-700)" opacity="0.12" /> : null}
            <circle
              cx={p.x}
              cy={p.y}
              r={on ? 12 : 9}
              fill={complete ? "var(--color-gold-500)" : reached ? "var(--color-royal-700)" : "var(--color-paper)"}
              stroke={complete ? "var(--color-gold-600)" : "var(--color-royal-700)"}
              strokeWidth="1.5"
              style={{ transition: "all 0.5s" }}
            />
            <text
              x={lp.x}
              y={lp.y}
              textAnchor={lp.a as "middle" | "start" | "end"}
              className={cn("font-sans text-[17px] font-semibold tracking-[-0.01em]", reached ? "fill-navy-900" : "fill-muted")}
            >
              {s.title}
            </text>
          </g>
        );
      })}

      <text x={C} y={C - 10} textAnchor="middle" className="fill-gold-ink font-sans text-[11px] font-semibold tracking-[0.2em] uppercase">
        {complete ? "Complete" : `Stage ${active + 1} of 3`}
      </text>
      <text x={C} y={C + 24} textAnchor="middle" className={cn("font-serif text-[27px] italic", complete ? "fill-gold-ink" : "fill-royal-700")}>
        {label}
      </text>
    </svg>
  );
}
