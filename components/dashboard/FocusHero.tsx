"use client";

import { useState } from "react";
import { ArrowRight, ChevronRight, Clock } from "lucide-react";
import CompletionMark from "@/components/ui/CompletionMark";
import {
  focus,
  formatDuration,
  formatTime,
  priorities as seedPriorities,
} from "@/lib/mock/dashboard";

/**
 * The answer to "what should I be doing right now". It is the only surface on
 * the dashboard allowed to be this loud; everything else supports it.
 */
export default function FocusHero({ className = "" }: { className?: string }) {
  const [priorities, setPriorities] = useState(seedPriorities);

  const toggle = (id: string) =>
    setPriorities((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item)),
    );

  return (
    <section
      aria-labelledby="focus-heading"
      className={`syn-rise relative overflow-clip rounded-2xl border border-subtle p-4 shadow-[var(--shadow-card)] sm:p-5 ${className}`}
      style={{
        background: "linear-gradient(135deg, var(--surface-elevated) 0%, var(--surface-raised) 58%)",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full opacity-70"
        style={{ background: "radial-gradient(circle, var(--syn-volt-soft) 0%, transparent 70%)" }}
      />

      <div className="relative flex flex-wrap items-start justify-between gap-5 sm:gap-6">
        <div className="min-w-0 flex-1">
          <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[color:var(--syn-volt-text)]">
            <span className="h-1.5 w-1.5 rounded-full bg-volt" />
            Today&apos;s focus
          </span>
          <h2
            id="focus-heading"
            className="mt-2.5 font-display text-[22px] font-semibold leading-[1.15] text-primary sm:text-[27px]"
          >
            {focus.title}
          </h2>
          <p className="mt-2 max-w-[46ch] text-[14px] leading-relaxed text-secondary">{focus.why}</p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-subtle bg-[color:var(--surface-inset)] px-2.5 py-1.5 text-[12px] tabular-nums text-primary">
              <Clock size={13} strokeWidth={1.75} className="text-focus" />
              {formatTime(focus.start)} – {formatTime(focus.end)}
            </span>
            <span className="rounded-lg border border-[color:var(--time-deadline-border)] bg-[color:var(--time-deadline-soft)] px-2.5 py-1.5 text-[12px] text-deadline">
              {focus.priority} priority
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-subtle px-2.5 py-1.5 text-[12px] text-secondary">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: focus.categoryColor }}
              />
              {focus.category}
            </span>
          </div>
        </div>

        <div className="flex w-full shrink-0 flex-col items-stretch gap-2.5 sm:w-auto sm:flex-col sm:items-end sm:gap-3">
          {/* On a phone this collapses to one line — the stacked readout costs
              more vertical room than the number is worth at that size. */}
          <div className="flex items-baseline gap-1.5 rounded-xl border border-[color:var(--syn-volt-border)] bg-volt-soft px-3 py-2 sm:block sm:px-4 sm:py-3 sm:text-right">
            <p className="hidden text-[10px] uppercase tracking-[0.18em] text-[color:var(--syn-volt-text)] sm:block">
              In progress
            </p>
            <p className="font-display text-[20px] font-semibold leading-tight tabular-nums text-primary sm:text-[24px]">
              {formatDuration(focus.remaining)}
            </p>
            <p className="whitespace-nowrap text-[11px] text-secondary">of focus remaining</p>
          </div>
          <button
            type="button"
            className="group/cta inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-action px-3.5 py-2.5 sm:w-auto text-[13px] font-semibold text-[color:var(--text-on-cyan)] transition-[background-color,transform] duration-200 hover:bg-[color:var(--action-hover)] active:scale-[0.98] active:bg-[color:var(--action-pressed)]"
          >
            Enter focus mode
            <ArrowRight
              size={14}
              strokeWidth={2.2}
              className="transition-transform duration-200 group-hover/cta:translate-x-0.5"
            />
          </button>
        </div>
      </div>

      <div className="relative mt-4 border-t border-subtle pt-3.5">
        <div className="mb-3 flex items-baseline justify-between">
          <h3 className="text-[11px] uppercase tracking-[0.18em] text-muted">Then, in order</h3>
          <button
            type="button"
            className="inline-flex items-center gap-1 text-[12px] text-secondary transition-colors duration-200 hover:text-action"
          >
            All priorities <ChevronRight size={13} strokeWidth={2} />
          </button>
        </div>
        <ul className="grid gap-2 sm:grid-cols-3">
          {priorities.map((priority) => (
            <li key={priority.id}>
              <button
                type="button"
                onClick={() => toggle(priority.id)}
                aria-pressed={priority.done}
                className="group flex h-full w-full items-start gap-2.5 rounded-xl border border-subtle bg-[color:var(--surface-inset)] p-2.5 text-left transition-[background-color,border-color,transform] duration-200 hover:border-strong hover:bg-hover active:scale-[0.99]"
              >
                <span className="mt-0.5">
                  <CompletionMark done={priority.done} />
                </span>
                <span className="min-w-0">
                  <span
                    className={`block text-[13px] leading-snug transition-colors duration-200 ${
                      priority.done ? "text-muted line-through" : "text-primary"
                    }`}
                  >
                    {priority.title}
                  </span>
                  <span className="mt-1 flex items-center gap-1.5 text-[11px] text-muted">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: priority.color }}
                    />
                    {priority.meta}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
