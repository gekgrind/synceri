import { Card, CardTitle } from "@/components/ui/Card";
import { goals } from "@/lib/mock/dashboard";

/** Longer arcs, kept quiet. Tertiary information by design. */
export default function Momentum({ delay = 0, className = "" }: { delay?: number; className?: string }) {
  return (
    <Card delay={delay} className={className}>
      <CardTitle aside="September">Momentum</CardTitle>
      <ul className="flex flex-col gap-3">
        {goals.map((goal, index) => (
          <li key={goal.id}>
            <div className="flex items-baseline justify-between gap-3">
              <span className="truncate text-[13px] text-primary">{goal.label}</span>
              <span className="text-[13px] font-semibold tabular-nums text-primary">
                {goal.progress}%
              </span>
            </div>
            <div
              className="mt-1 h-1.5 overflow-hidden rounded-full bg-grid-major"
              role="progressbar"
              aria-label={goal.label}
              aria-valuenow={goal.progress}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="syn-bar h-full rounded-full"
                style={{
                  width: `${goal.progress}%`,
                  background: index === 0 ? "var(--syn-volt-deep)" : "var(--time-scheduled)",
                  animationDelay: `${260 + index * 110}ms`,
                }}
              />
            </div>
            <p className="mt-1 text-[11px] text-muted">{goal.meta}</p>
          </li>
        ))}
      </ul>
    </Card>
  );
}
