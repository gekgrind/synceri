"use client";

import { useState } from "react";
import { CalendarClock, Check, ShieldCheck, Sparkles, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { insights, type InsightTone } from "@/lib/mock/dashboard";

const TONE: Record<InsightTone, { icon: LucideIcon; label: string; color: string }> = {
  conflict: { icon: CalendarClock, label: "Conflict", color: "var(--time-deadline)" },
  suggestion: { icon: Sparkles, label: "Suggestion", color: "var(--action-primary)" },
  protect: { icon: ShieldCheck, label: "Protecting", color: "var(--time-focus)" },
};

/**
 * Synceri's point of view on the day. It leads with a judgement — what is
 * about to collide, what is worth defending — rather than with data.
 *
 * Dismissing advances to the next observation; nothing here calls a model.
 */
export default function InsightCard({ delay = 0, className = "" }: { delay?: number; className?: string }) {
  const [index, setIndex] = useState(0);

  const insight = insights[index];

  // Working through every observation is a result, so the card resolves in
  // place. Unmounting it would leave a hole in the rail and read as a bug.
  if (!insight) {
    return (
      <Card delay={delay} ariaLabel="Synceri guidance" className={className}>
        <div className="mb-2.5 flex items-center gap-2">
          <Check size={15} strokeWidth={2.2} className="shrink-0 text-[color:var(--time-complete)]" />
          <h2 className="font-display text-[14px] font-medium uppercase tracking-[0.14em] text-primary">
            All clear
          </h2>
        </div>
        <p className="text-[13px] leading-relaxed text-secondary">
          Nothing else needs rethinking right now. Synceri will speak up if the
          day shifts.
        </p>
      </Card>
    );
  }

  const { icon: Icon, label, color } = TONE[insight.tone];
  const remaining = insights.length - index - 1;

  return (
    <Card
      delay={delay}
      ariaLabel="Synceri guidance"
      className={`border-[color:var(--action-border)] bg-[linear-gradient(160deg,var(--action-soft)_0%,var(--surface-raised)_62%)] ${className}`}
    >
      <div className="mb-3 flex items-center gap-2">
        <span
          aria-hidden="true"
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg"
          style={{ background: `color-mix(in srgb, ${color} 16%, transparent)` }}
        >
          <Icon size={14} strokeWidth={2} style={{ color }} />
        </span>
        <h2 className="font-display text-[13px] font-medium uppercase tracking-[0.16em] text-secondary">
          Synceri noticed
        </h2>
        <span
          className="ml-auto rounded px-1.5 py-0.5 text-[10px] uppercase tracking-[0.12em]"
          style={{
            color,
            background: `color-mix(in srgb, ${color} 12%, transparent)`,
          }}
        >
          {label}
        </span>
      </div>

      <p className="font-display text-[16px] font-medium leading-snug text-primary">
        {insight.headline}
      </p>
      <p className="mt-1.5 text-[13px] leading-relaxed text-secondary">{insight.body}</p>

      <div className="mt-3.5 flex items-center gap-2">
        <button
          type="button"
          className="rounded-lg bg-action px-3 py-2 text-[12px] font-semibold text-[color:var(--text-on-cyan)] transition-[background-color,transform] duration-200 hover:bg-[color:var(--action-hover)] active:scale-[0.98] active:bg-[color:var(--action-pressed)]"
        >
          {insight.primaryAction}
        </button>
        <button
          type="button"
          onClick={() => setIndex((current) => current + 1)}
          className="rounded-lg px-3 py-2 text-[12px] text-muted transition-colors duration-200 hover:text-secondary"
        >
          {insight.secondaryAction}
        </button>
        {remaining > 0 && (
          <span className="ml-auto text-[11px] tabular-nums text-muted">
            +{remaining} more
          </span>
        )}
      </div>
    </Card>
  );
}
