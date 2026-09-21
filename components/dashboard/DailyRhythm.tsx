"use client";

import { useState } from "react";
import { Card, CardTitle } from "@/components/ui/Card";
import CompletionMark from "@/components/ui/CompletionMark";
import { routines as seedRoutines, routineStreak } from "@/lib/mock/dashboard";

/** The recurring anchors of the day, plus the streak that makes them stick. */
export default function DailyRhythm({ delay = 0, className = "" }: { delay?: number; className?: string }) {
  const [routines, setRoutines] = useState(seedRoutines);
  const done = routines.filter((routine) => routine.done).length;

  const toggle = (id: string) =>
    setRoutines((prev) =>
      prev.map((routine) => (routine.id === id ? { ...routine, done: !routine.done } : routine)),
    );

  return (
    <Card delay={delay} className={`flex flex-1 flex-col ${className}`}>
      <CardTitle aside={`${done}/${routines.length}`}>Daily rhythm</CardTitle>

      <ul className="flex flex-col gap-0.5">
        {routines.map((routine) => (
          <li key={routine.id}>
            <button
              type="button"
              onClick={() => toggle(routine.id)}
              aria-pressed={routine.done}
              className="group flex min-h-[36px] w-full items-center gap-2.5 rounded-lg px-1.5 py-1 text-left transition-colors duration-200 hover:bg-hover"
            >
              <CompletionMark done={routine.done} />
              <span
                className={`flex-1 text-[13px] transition-colors duration-200 ${
                  routine.done ? "text-muted" : "text-primary"
                }`}
              >
                {routine.label}
              </span>
              <span className="text-[11px] tabular-nums text-muted">{routine.time}</span>
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-center gap-2 border-t border-subtle pt-2.5">
        <div
          className="h-1 flex-1 overflow-hidden rounded-full bg-grid-major"
          role="progressbar"
          aria-label="Routines completed today"
          aria-valuenow={done}
          aria-valuemin={0}
          aria-valuemax={routines.length}
        >
          <div
            className="syn-bar h-full rounded-full bg-volt transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ width: `${(done / routines.length) * 100}%` }}
          />
        </div>
        <span className="text-[11px] tabular-nums text-secondary">{routineStreak}-day streak</span>
      </div>
    </Card>
  );
}
