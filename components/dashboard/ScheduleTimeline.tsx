"use client";

import { useEffect, useRef, useState } from "react";
import { CardTitle } from "@/components/ui/Card";
import {
  blockMeta,
  dayWindow,
  formatDuration,
  formatTime,
  schedule,
  today,
  type ScheduleBlock,
} from "@/lib/mock/dashboard";

/** Vertical scale. 0.9px per minute keeps a 30-minute block readable. */
const PX_PER_MIN = 0.9;
const TRACK_HEIGHT = (dayWindow.end - dayWindow.start) * PX_PER_MIN;
const GUTTER = 52;

const offsetOf = (minute: number) => (minute - dayWindow.start) * PX_PER_MIN;

const HOURS = Array.from(
  { length: Math.floor((dayWindow.end - dayWindow.start) / 60) + 1 },
  (_, i) => dayWindow.start + i * 60,
);

function blockStatus(block: ScheduleBlock) {
  if (today.now >= block.end) return "past" as const;
  if (today.now >= block.start) return "now" as const;
  return "upcoming" as const;
}

/**
 * The day as time rather than as a list. Position and height carry the
 * information — a two-hour focus block looks like two hours, and the gaps
 * between commitments are visible instead of implied.
 */
export default function ScheduleTimeline() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Open on the current moment rather than at 7am. Jumped, not animated, so
  // the card never appears to scroll by itself.
  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;
    node.scrollTop = Math.max(0, offsetOf(today.now) - node.clientHeight * 0.38);
  }, []);

  return (
    <>
      <CardTitle aside={formatTime(today.now)}>Today</CardTitle>

      <div
        ref={scrollRef}
        className="relative -mx-1 max-h-[420px] min-h-0 flex-1 overflow-y-auto px-1 xl:max-h-[330px]"
      >
        <div className="relative" style={{ height: TRACK_HEIGHT }}>
          {/* Hour grid */}
          {HOURS.map((hour) => (
            // The now-line owns its slot; an hour label under it would collide.
            Math.abs(hour - today.now) < 25 ? null : (
            <div
              key={hour}
              aria-hidden="true"
              className="absolute inset-x-0 flex items-center gap-2"
              style={{ top: offsetOf(hour) }}
            >
              <span
                className="shrink-0 text-right text-[10px] font-medium uppercase tracking-wider tabular-nums text-[color:var(--text-disabled)]"
                style={{ width: GUTTER - 10 }}
              >
                {formatTime(hour).replace(":00", "")}
              </span>
              <span className="h-px flex-1 bg-grid" />
            </div>
            )
          ))}

          {/* Blocks */}
          <ul>
            {schedule.map((block, index) => {
              const meta = blockMeta[block.kind];
              const status = blockStatus(block);
              const height = (block.end - block.start) * PX_PER_MIN;
              const compact = height < 40;
              const isSelected = selectedId === block.id;
              const isPast = status === "past";

              return (
                <li
                  key={block.id}
                  className="syn-block absolute"
                  style={{
                    top: offsetOf(block.start),
                    height,
                    left: GUTTER,
                    right: 0,
                    animationDelay: `${120 + index * 45}ms`,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedId(isSelected ? null : block.id)}
                    aria-pressed={isSelected}
                    className="group relative flex h-full w-full flex-col justify-center overflow-hidden rounded-lg pl-2.5 pr-2 text-left transition-[background-color,opacity,box-shadow] duration-200"
                    style={{
                      // Category colour as a 3px edge plus a ~12% wash, never a
                      // solid fill — that is how a calendar turns into confetti.
                      background: `color-mix(in srgb, ${meta.color} var(${
                        isSelected ? "--block-wash-active" : "--block-wash"
                      }), transparent)`,
                      borderLeft: `3px ${block.tentative ? "dashed" : "solid"} ${meta.color}`,
                      opacity: isPast ? "var(--block-past-opacity)" : 1,
                      boxShadow: isSelected
                        ? `inset 0 0 0 1px ${meta.color}`
                        : status === "now"
                          ? `inset 0 0 0 1px color-mix(in srgb, ${meta.color} 45%, transparent)`
                          : undefined,
                    }}
                  >
                    <span className="flex min-w-0 items-center gap-1.5">
                      <span
                        className={`truncate text-[12.5px] leading-tight ${
                          isPast ? "text-secondary" : "text-primary"
                        }`}
                      >
                        {block.title}
                      </span>
                      {status === "now" && (
                        <span className="shrink-0 rounded bg-volt-soft px-1.5 py-px text-[9px] uppercase tracking-[0.12em] text-[color:var(--syn-volt-text)]">
                          Now
                        </span>
                      )}
                    </span>
                    {!compact && (
                      <span className="mt-px flex min-w-0 items-center gap-1.5 text-[10.5px] tabular-nums text-muted">
                        <span className="truncate">
                          {formatTime(block.start)} · {formatDuration(block.end - block.start)}
                        </span>
                        <span className="truncate text-[10.5px] tracking-wide">
                          {isSelected && block.detail ? `· ${block.detail}` : `· ${meta.label}`}
                        </span>
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* The now-line. The only glowing element on the timeline. */}
          <div
            className="pointer-events-none absolute inset-x-0 z-10 flex items-center gap-1.5"
            style={{ top: offsetOf(today.now) }}
          >
            {/* Pure volt survives here in both themes: navy on lime is 16.9:1,
                which is the doc-prescribed light-mode treatment. */}
            <span
              className="shrink-0 rounded bg-volt-pure px-1 text-right text-[10px] font-semibold tabular-nums text-[color:var(--text-on-volt)]"
              style={{ width: GUTTER - 10 }}
            >
              {formatTime(today.now).replace(" AM", "").replace(" PM", "")}
            </span>
            <span
              aria-hidden="true"
              className="-mr-1 h-[5px] w-[5px] shrink-0 rounded-full"
              style={{ background: "var(--time-now)", boxShadow: "var(--now-glow)" }}
            />
            <span
              className="h-[2px] flex-1 rounded-full"
              style={{ background: "var(--time-now)", boxShadow: "var(--now-glow)" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
