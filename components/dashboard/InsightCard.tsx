"use client";

import { useState } from "react";
import { CalendarClock, ShieldCheck, Sparkles, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { insights, type InsightTone } from "@/lib/mock/dashboard";

const TONE: Record<InsightTone, { icon: LucideIcon; label: string }> = {
  conflict: { icon: CalendarClock, label: "Conflict" },
  suggestion: { icon: Sparkles, label: "Suggestion" },
  protect: { icon: ShieldCheck, label: "Protecting" },
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
  if (!insight) return null;

  const { icon: Icon, label } = TONE[insight.tone];
  const remaining = insights.length - index - 1;

  return (
    <Card
      delay={delay}
      ariaLabel="Synceri guidance"
      className={`border-[color:var(--action-border)] bg-[linear-gradient(160deg,var(--action-soft)_0%,var(--surface-raised)_62%)] ${className}`}
    >
      <div className="mb-2.5 flex items-center gap-2">
        <Icon size={15} strokeWidth={1.9} className="shrink-0 text-action" />
        <h2 className="font-display text-[14px] font-medium uppercase tracking-[0.14em] text-primary">
          Synceri noticed
        </h2>
        <span className="ml-auto rounded border border-subtle px-1.5 py-0.5 text-[10px] uppercase tracking-[0.12em] text-muted">
          {label}
        </span>
      </div>

      <p className="text-[14px] font-medium leading-snug text-primary">{insight.headline}</p>
      <p className="mt-1.5 text-[13px] leading-relaxed text-secondary">{insight.body}</p>

      <div className="mt-3.5 flex items-center gap-2">
        <button
          type="button"
          className="rounded-lg bg-action px-3 py-2 text-[12px] font-semibold text-[color:var(--text-on-cyan)] transition-colors duration-200 hover:bg-[color:var(--action-hover)] active:bg-[color:var(--action-pressed)]"
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
