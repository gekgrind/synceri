"use client";

import { useState } from "react";
import { domains, today } from "@/lib/mock/dashboard";

const SIZE = 340;
const CENTER = SIZE / 2;
const ORBIT_R = 118;
const CORE_R = 46;
const NODE_R = 25;

const CORE_C = 2 * Math.PI * CORE_R;
const NODE_C = 2 * Math.PI * (NODE_R - 3);

/** Evenly spaced, starting at the top and moving clockwise. */
function nodePosition(index: number, total: number) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  return {
    x: CENTER + Math.cos(angle) * ORBIT_R,
    y: CENTER + Math.sin(angle) * ORBIT_R,
  };
}

/**
 * Where the person's life is actually balanced, as one shape. Work is one node
 * among six — the composition itself is the argument that Synceri is not a
 * work tool.
 *
 * Nodes are keyboard reachable; the caption below is the live description, so
 * the reading does not depend on hovering.
 */
export default function AlignmentOrbit() {
  const [activeId, setActiveId] = useState<string | null>(null);

  // Default caption calls out the domain that is furthest out of alignment.
  const weakest = domains.reduce((a, b) => (a.value <= b.value ? a : b));
  const active = domains.find((domain) => domain.id === activeId) ?? weakest;

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-baseline justify-between">
        <h2
          id="alignment-heading"
          className="font-display text-[15px] font-medium uppercase tracking-[0.14em] text-primary"
        >
          Life alignment
        </h2>
        <span className="text-[12px] text-muted">Last 7 days</span>
      </div>

      <div className="relative mt-1 min-h-[280px] flex-1">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 h-full w-full"
          role="group"
          aria-labelledby="alignment-heading"
        >
          <circle
            cx={CENTER}
            cy={CENTER}
            r={ORBIT_R}
            fill="none"
            stroke="var(--grid-line-major)"
            strokeWidth="1"
            strokeDasharray="2 6"
          />

          {domains.map((domain, index) => {
            const point = nodePosition(index, domains.length);
            const isActive = active.id === domain.id;
            return (
              <line
                key={`link-${domain.id}`}
                x1={CENTER}
                y1={CENTER}
                x2={point.x}
                y2={point.y}
                stroke={isActive ? domain.color : "var(--grid-line-major)"}
                strokeWidth="1"
                opacity={isActive ? 0.55 : 0.35}
                style={{ transition: "opacity 240ms ease, stroke 240ms ease" }}
              />
            );
          })}

          {/* Core: overall alignment */}
          <circle cx={CENTER} cy={CENTER} r={CORE_R + 10} fill="var(--surface-elevated)" opacity="0.55" />
          <circle
            cx={CENTER}
            cy={CENTER}
            r={CORE_R}
            fill="var(--surface-raised)"
            stroke="var(--border-subtle)"
            strokeWidth="1"
          />
          <circle
            cx={CENTER}
            cy={CENTER}
            r={CORE_R}
            fill="none"
            stroke="var(--grid-line-major)"
            strokeWidth="3"
          />
          <circle
            cx={CENTER}
            cy={CENTER}
            r={CORE_R}
            fill="none"
            stroke="var(--time-now)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${(today.alignmentScore / 100) * CORE_C} ${CORE_C}`}
            transform={`rotate(-90 ${CENTER} ${CENTER})`}
            className="syn-orbit-core"
          />
          <text
            x={CENTER}
            y={CENTER - 2}
            textAnchor="middle"
            className="font-display"
            fontSize="30"
            fontWeight="600"
            fill="var(--text-primary)"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {today.alignmentScore}
          </text>
          <text
            x={CENTER}
            y={CENTER + 18}
            textAnchor="middle"
            fontSize="10"
            letterSpacing="1.6"
            fill="var(--text-muted)"
          >
            ALIGNED
          </text>

          {/* Domain nodes */}
          {domains.map((domain, index) => {
            const point = nodePosition(index, domains.length);
            const isActive = active.id === domain.id;
            return (
              <g
                key={domain.id}
                // Focusable and labelled, but deliberately not role="button":
                // these reveal the caption on hover/focus and have no action
                // behind them, so announcing a button would promise an
                // Enter/Space behaviour that does not exist.
                tabIndex={0}
                aria-label={`${domain.label}, ${domain.value} percent aligned. ${domain.note}`}
                onMouseEnter={() => setActiveId(domain.id)}
                onMouseLeave={() => setActiveId(null)}
                onFocus={() => setActiveId(domain.id)}
                onBlur={() => setActiveId(null)}
                style={{ cursor: "pointer" }}
              >
                <circle cx={point.x} cy={point.y} r={NODE_R + 8} fill="transparent" />
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={NODE_R}
                  fill="var(--surface-raised)"
                  stroke={isActive ? domain.color : "var(--border-subtle)"}
                  strokeWidth="1"
                  style={{ transition: "stroke 240ms ease" }}
                />
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={NODE_R - 3}
                  fill="none"
                  stroke="var(--grid-line-major)"
                  strokeWidth="3"
                />
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={NODE_R - 3}
                  fill="none"
                  stroke={domain.color}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${(domain.value / 100) * NODE_C} ${NODE_C}`}
                  transform={`rotate(-90 ${point.x} ${point.y})`}
                  className="syn-orbit-node"
                  style={{ animationDelay: `${120 + index * 90}ms` }}
                />
                <text
                  x={point.x}
                  y={point.y + 4}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="600"
                  fill={isActive ? "var(--text-primary)" : "var(--text-secondary)"}
                  style={{ fontVariantNumeric: "tabular-nums", transition: "fill 240ms ease" }}
                >
                  {domain.value}
                </text>
                <text
                  x={point.x}
                  y={point.y + NODE_R + 15}
                  textAnchor="middle"
                  fontSize="11"
                  letterSpacing="0.6"
                  fill={isActive ? "var(--text-secondary)" : "var(--text-muted)"}
                  style={{ transition: "fill 240ms ease" }}
                >
                  {domain.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-1 flex items-center gap-2.5 border-t border-subtle pt-3">
        <span
          aria-hidden="true"
          className="h-2 w-2 shrink-0 rounded-full"
          style={{ background: active.color, transition: "background 240ms ease" }}
        />
        <p aria-live="polite" className="truncate text-[13px] text-secondary">
          <span className="text-primary">{active.label}</span>
          <span className="text-muted"> · {active.note}</span>
        </p>
      </div>
    </div>
  );
}
