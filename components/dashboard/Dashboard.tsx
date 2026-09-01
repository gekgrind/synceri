"use client";

import { useState } from "react";
import {
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  ChevronRight,
  Clock,
  Command,
  Flag,
  Layers,
  ListChecks,
  Repeat,
  Search,
  Sparkles,
  Sun,
  Target,
  type LucideIcon,
} from "lucide-react";
import AlignmentOrbit from "./AlignmentOrbit";
import {
  adminStatusColor,
  focus,
  goals,
  insight,
  needsAttention,
  priorities as seedPriorities,
  routines as seedRoutines,
  routineStreak,
  schedule,
  scheduleKindColor,
  scheduleKindLabel,
  today,
  user,
} from "./mock-data";

const NAV: { label: string; icon: LucideIcon; badge?: number }[] = [
  { label: "Today", icon: Sun },
  { label: "My Life", icon: Layers },
  { label: "Calendar", icon: CalendarDays },
  { label: "Priorities", icon: Target, badge: 3 },
  { label: "Goals", icon: Flag },
  { label: "Routines", icon: Repeat },
  { label: "Tasks", icon: ListChecks, badge: 8 },
  { label: "Insights", icon: Sparkles },
];

function Card({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <section
      className={`syn-rise rounded-2xl border border-subtle bg-raised p-4 transition-colors duration-300 hover:border-strong ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </section>
  );
}

function CardTitle({ children, aside }: { children: React.ReactNode; aside?: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-baseline justify-between gap-3">
      <h2 className="font-display text-[15px] font-medium uppercase tracking-[0.14em] text-primary">
        {children}
      </h2>
      {aside ? <span className="text-[12px] text-muted">{aside}</span> : null}
    </div>
  );
}

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState("Today");
  const [priorities, setPriorities] = useState(seedPriorities);
  const [routines, setRoutines] = useState(seedRoutines);
  const [insightOpen, setInsightOpen] = useState(true);

  const routinesDone = routines.filter((r) => r.done).length;

  return (
    <div className="flex min-h-screen w-full bg-base font-sans text-primary">
      <style>{`
        @keyframes syn-rise-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes syn-draw {
          from { stroke-dashoffset: 240; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes syn-grow {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        .syn-rise { animation: syn-rise-in 620ms cubic-bezier(0.22, 1, 0.36, 1) both; }
        .syn-orbit-core, .syn-orbit-node { animation: syn-draw 1100ms cubic-bezier(0.22, 1, 0.36, 1) both; }
        .syn-bar { transform-origin: left center; animation: syn-grow 900ms cubic-bezier(0.22, 1, 0.36, 1) both; }
        @media (prefers-reduced-motion: reduce) {
          .syn-rise, .syn-orbit-core, .syn-orbit-node, .syn-bar { animation: none !important; }
        }
      `}</style>

      {/* Sidebar */}
      <aside className="sticky top-0 flex h-screen w-[68px] shrink-0 flex-col border-r border-subtle bg-base px-2.5 py-6 lg:w-[228px] lg:px-4">
        <div className="flex items-center justify-center gap-2.5 lg:justify-start lg:px-2">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-strong">
            <span className="h-2.5 w-2.5 rounded-full bg-volt shadow-[0_0_10px_var(--syn-volt-glow)]" />
          </span>
          <span className="hidden font-display text-[17px] font-semibold uppercase leading-none tracking-[0.22em] text-primary lg:block">
            Synceri
          </span>
        </div>
        <p className="mt-2.5 hidden px-2 text-[9px] uppercase tracking-[0.22em] text-muted lg:block">
          Align · Amplify · Achieve
        </p>

        <nav className="mt-8 flex flex-col gap-0.5">
          {NAV.map(({ label, icon: Icon, badge }) => {
            const isActive = activeNav === label;
            return (
              <button
                key={label}
                type="button"
                onClick={() => setActiveNav(label)}
                title={label}
                className={`group relative flex items-center justify-center gap-3 rounded-lg px-2 py-2.5 text-left text-[14px] transition-colors duration-200 lg:justify-start lg:px-3 ${
                  isActive
                    ? "bg-[color:var(--action-soft)] text-primary"
                    : "text-secondary hover:bg-hover hover:text-primary"
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r bg-volt" />
                )}
                <Icon
                  size={17}
                  strokeWidth={1.75}
                  className={isActive ? "text-action" : "text-muted group-hover:text-secondary"}
                />
                <span className="hidden lg:inline">{label}</span>
                {badge ? (
                  <span className="ml-auto hidden rounded-full bg-active px-1.5 py-0.5 text-[10px] tabular-nums text-secondary lg:block">
                    {badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto flex items-center justify-center gap-3 rounded-xl border-subtle px-0 py-2.5 lg:justify-start lg:border lg:px-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-active font-display text-[12px] tracking-wider text-primary">
            {user.initials}
          </span>
          <span className="hidden min-w-0 lg:block">
            <span className="block truncate text-[13px] text-primary">{user.fullName}</span>
            <span className="block truncate text-[11px] text-muted">{user.role}</span>
          </span>
        </div>
      </aside>

      {/* Workspace */}
      <main className="flex min-w-0 flex-1 flex-col px-6 py-5 xl:px-9">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted">{today.dateLabel}</p>
            <h1 className="mt-1.5 font-display text-[28px] font-semibold leading-tight text-primary">
              {today.greeting}, {user.firstName}.
            </h1>
            <p className="mt-1 text-[14px] text-secondary">{today.subline}</p>
          </div>

          <div className="flex items-center gap-2.5">
            <label className="group flex h-10 w-[300px] items-center gap-2.5 rounded-xl border border-subtle bg-raised px-3.5 transition-colors duration-200 focus-within:border-action hover:border-strong">
              <Search size={15} strokeWidth={1.75} className="shrink-0 text-muted" />
              <input
                className="min-w-0 flex-1 bg-transparent text-[13px] text-primary outline-none placeholder:text-muted"
                placeholder="Ask Synceri or find anything…"
              />
              <span className="flex items-center gap-0.5 rounded border border-subtle px-1.5 py-0.5 text-[10px] text-muted">
                <Command size={10} strokeWidth={2} />K
              </span>
            </label>
            <button
              type="button"
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-subtle bg-raised text-secondary transition-colors duration-200 hover:border-strong hover:text-primary"
              aria-label="Notifications"
            >
              <Bell size={16} strokeWidth={1.75} />
              <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-volt" />
            </button>
          </div>
        </header>

        <div className="mt-4 grid flex-1 gap-4 xl:grid-cols-[minmax(0,1fr)_336px]">
          {/* Left column */}
          <div className="flex min-w-0 flex-col gap-4">
            {/* Today's focus hero */}
            <section
              className="syn-rise relative overflow-clip rounded-2xl border border-subtle p-5"
              style={{
                background:
                  "linear-gradient(135deg, var(--surface-elevated) 0%, var(--surface-raised) 58%)",
              }}
            >
              <div
                className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(221,255,0,0.07) 0%, transparent 68%)",
                }}
              />
              <div className="relative flex flex-wrap items-start justify-between gap-6">
                <div className="min-w-0">
                  <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-volt">
                    <span className="h-1.5 w-1.5 rounded-full bg-volt shadow-[0_0_8px_var(--syn-volt-glow)]" />
                    Today&apos;s focus
                  </span>
                  <h2 className="mt-2.5 font-display text-[25px] font-semibold leading-snug text-primary">
                    {focus.title}
                  </h2>
                  <p className="mt-1.5 max-w-[46ch] text-[14px] text-secondary">{focus.why}</p>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-subtle bg-raised px-2.5 py-1.5 text-[12px] tabular-nums text-secondary">
                      <Clock size={13} strokeWidth={1.75} className="text-focus" />
                      {focus.window}
                    </span>
                    <span className="rounded-lg border border-[rgba(237,122,47,0.35)] bg-[rgba(237,122,47,0.12)] px-2.5 py-1.5 text-[12px] text-deadline">
                      {focus.priority} priority
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-subtle px-2.5 py-1.5 text-[12px] text-secondary">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: "var(--cat-01)" }}
                      />
                      {focus.category}
                    </span>
                  </div>
                </div>

                <div className="flex shrink-0 flex-col items-end gap-3">
                  <div className="rounded-xl border border-[rgba(221,255,0,0.22)] bg-volt-soft px-4 py-3 text-right">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-volt">In progress</p>
                    <p className="font-display text-[24px] font-semibold leading-tight tabular-nums text-primary">
                      1h 12m
                    </p>
                    <p className="text-[11px] text-secondary">of focus remaining</p>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-action px-3.5 py-2 text-[13px] font-semibold text-[color:var(--text-on-cyan)] transition-colors duration-200 hover:bg-[color:var(--action-hover)]"
                  >
                    Enter focus mode
                    <ArrowRight size={14} strokeWidth={2.2} />
                  </button>
                </div>
              </div>

              <div className="relative mt-4 border-t border-subtle pt-3.5">
                <div className="mb-3 flex items-baseline justify-between">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
                    Then, in order
                  </p>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 text-[12px] text-secondary transition-colors duration-200 hover:text-action"
                  >
                    All priorities <ChevronRight size={13} strokeWidth={2} />
                  </button>
                </div>
                <ul className="grid gap-2 sm:grid-cols-3">
                  {priorities.map((p) => (
                    <li key={p.id}>
                      <button
                        type="button"
                        onClick={() =>
                          setPriorities((prev) =>
                            prev.map((x) => (x.id === p.id ? { ...x, done: !x.done } : x)),
                          )
                        }
                        className="group flex h-full w-full items-start gap-2.5 rounded-xl border border-subtle bg-raised p-2.5 text-left transition-colors duration-200 hover:border-strong hover:bg-hover"
                      >
                        <span
                          className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${
                            p.done
                              ? "border-volt-deep bg-volt-deep"
                              : "border-strong group-hover:border-action"
                          }`}
                        >
                          {p.done && (
                            <Check
                              size={11}
                              strokeWidth={3}
                              className="text-[color:var(--text-on-volt)]"
                            />
                          )}
                        </span>
                        <span className="min-w-0">
                          <span
                            className={`block text-[13px] leading-snug transition-colors duration-200 ${
                              p.done ? "text-muted line-through" : "text-primary"
                            }`}
                          >
                            {p.title}
                          </span>
                          <span className="mt-1 flex items-center gap-1.5 text-[11px] text-muted">
                            <span
                              className="h-1.5 w-1.5 rounded-full"
                              style={{ background: p.color }}
                            />
                            {p.meta}
                          </span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Orbit + rhythm/momentum */}
            <div className="grid flex-1 gap-4 lg:grid-cols-[minmax(0,1fr)_290px]">
              <Card delay={90} className="flex min-h-[334px] flex-col">
                <AlignmentOrbit />
              </Card>

              <div className="flex flex-col gap-4">
                <Card delay={150} className="flex flex-1 flex-col">
                  <CardTitle aside={`${routinesDone}/${routines.length}`}>Daily rhythm</CardTitle>
                  <ul className="flex flex-1 flex-col justify-between gap-0.5">
                    {routines.map((r) => (
                      <li key={r.id}>
                        <button
                          type="button"
                          onClick={() =>
                            setRoutines((prev) =>
                              prev.map((x) => (x.id === r.id ? { ...x, done: !x.done } : x)),
                            )
                          }
                          className="group flex w-full items-center gap-2.5 rounded-lg px-1.5 py-1 text-left transition-colors duration-200 hover:bg-hover"
                        >
                          <span
                            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${
                              r.done
                                ? "border-volt-deep bg-volt-deep"
                                : "border-strong group-hover:border-action"
                            }`}
                          >
                            {r.done && (
                              <Check
                                size={11}
                                strokeWidth={3}
                                className="text-[color:var(--text-on-volt)]"
                              />
                            )}
                          </span>
                          <span
                            className={`flex-1 text-[13px] ${r.done ? "text-muted" : "text-primary"}`}
                          >
                            {r.label}
                          </span>
                          <span className="text-[11px] tabular-nums text-muted">{r.time}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-2.5 flex items-center gap-2 border-t border-subtle pt-2.5">
                    <div className="h-1 flex-1 overflow-hidden rounded-full bg-[color:var(--grid-line-major)]">
                      <div
                        className="syn-bar h-full rounded-full bg-volt"
                        style={{ width: `${(routinesDone / routines.length) * 100}%` }}
                      />
                    </div>
                    <span className="text-[11px] tabular-nums text-secondary">
                      {routineStreak}-day streak
                    </span>
                  </div>
                </Card>

                <Card delay={210}>
                  <CardTitle aside="September">Momentum</CardTitle>
                  <ul className="flex flex-col gap-3">
                    {goals.map((g, i) => (
                      <li key={g.id}>
                        <div className="flex items-baseline justify-between gap-3">
                          <span className="truncate text-[13px] text-primary">{g.label}</span>
                          <span className="text-[13px] font-semibold tabular-nums text-primary">
                            {g.progress}%
                          </span>
                        </div>
                        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[color:var(--grid-line-major)]">
                          <div
                            className="syn-bar h-full rounded-full"
                            style={{
                              width: `${g.progress}%`,
                              background: i === 0 ? "var(--syn-volt)" : "var(--time-scheduled-lt)",
                              animationDelay: `${260 + i * 110}ms`,
                            }}
                          />
                        </div>
                        <p className="mt-1 text-[11px] text-muted">{g.meta}</p>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="flex min-w-0 flex-col gap-4">
            {insightOpen && (
              <Card
                delay={60}
                className="border-[rgba(0,212,255,0.28)] bg-[linear-gradient(160deg,rgba(0,212,255,0.09)_0%,var(--surface-raised)_62%)]"
              >
                <div className="mb-2.5 flex items-center gap-2">
                  <Sparkles size={15} strokeWidth={1.9} className="text-action" />
                  <h2 className="font-display text-[14px] font-medium uppercase tracking-[0.14em] text-primary">
                    {insight.title}
                  </h2>
                </div>
                <p className="text-[13px] leading-relaxed text-secondary">{insight.body}</p>
                <div className="mt-3.5 flex items-center gap-2">
                  <button
                    type="button"
                    className="rounded-lg bg-action px-3 py-1.5 text-[12px] font-semibold text-[color:var(--text-on-cyan)] transition-colors duration-200 hover:bg-[color:var(--action-hover)]"
                  >
                    {insight.primaryAction}
                  </button>
                  <button
                    type="button"
                    onClick={() => setInsightOpen(false)}
                    className="rounded-lg px-3 py-1.5 text-[12px] text-muted transition-colors duration-200 hover:text-secondary"
                  >
                    {insight.secondaryAction}
                  </button>
                </div>
              </Card>
            )}

            <Card delay={120} className="flex flex-1 flex-col">
              <CardTitle aside="Today">Schedule</CardTitle>
              <ul className="flex flex-1 flex-col justify-between">
                {schedule.map((s, i) => (
                  <li
                    key={s.id}
                    className={`group flex gap-3 rounded-lg px-1.5 py-1.5 transition-colors duration-200 hover:bg-hover ${
                      i !== schedule.length - 1 ? "border-b border-grid" : ""
                    }`}
                  >
                    <span className="w-[62px] shrink-0 pt-0.5 text-[12px] tabular-nums text-muted">
                      {s.time}
                    </span>
                    <span
                      className="w-[3px] shrink-0 rounded-full"
                      style={{ background: scheduleKindColor[s.kind], opacity: s.now ? 1 : 0.55 }}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="truncate text-[13px] text-primary">{s.title}</span>
                        {s.now && (
                          <span className="shrink-0 rounded bg-volt-soft px-1.5 py-0.5 text-[9px] uppercase tracking-[0.12em] text-volt">
                            Now
                          </span>
                        )}
                      </span>
                      <span className="mt-0.5 block text-[11px] text-muted">
                        {scheduleKindLabel[s.kind]} · {s.duration}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card delay={180}>
              <CardTitle aside={`${needsAttention.length} open`}>Needs attention</CardTitle>
              <ul className="flex flex-col gap-0.5">
                {needsAttention.map((a) => (
                  <li
                    key={a.id}
                    className="group flex items-center gap-2.5 rounded-lg px-1.5 py-1 transition-colors duration-200 hover:bg-hover"
                  >
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: adminStatusColor[a.status] }}
                    />
                    <span className="min-w-0 flex-1 truncate text-[13px] text-primary">
                      {a.title}
                    </span>
                    <span
                      className="shrink-0 text-[11px] tabular-nums"
                      style={{ color: adminStatusColor[a.status] }}
                    >
                      {a.timing}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="mt-2.5 inline-flex items-center gap-1 border-t border-subtle pt-2.5 text-[12px] text-secondary transition-colors duration-200 hover:text-action"
              >
                Open life admin <ChevronRight size={13} strokeWidth={2} />
              </button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
