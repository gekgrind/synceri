"use client";

import { useState } from "react";
import { domains, today } from "./mock-data";

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

export default function AlignmentOrbit() {
  const [activeId, setActiveId] = useState<string | null>(null);

  // Default caption calls out the domain that is furthest out of alignment.
  const weakest = domains.reduce((a, b) => (a.value <= b.value ? a : b));
  const active = domains.find((d) => d.id === activeId) ?? weakest;

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-baseline justify-between">
        <h2 className="font-display text-[15px] font-medium uppercase tracking-[0.14em] text-primary">
          Life alignment
        </h2>
        <span className="text-[12px] text-muted">Last 7 days</span>
      </div>

      <div className="relative mt-1 min-h-0 flex-1">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 h-full w-full"
          role="img"
          aria-label={`Life alignment orbit, overall ${today.alignmentScore} percent`}
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

          {domains.map((d, i) => {
            const p = nodePosition(i, domains.length);
            const isActive = active.id === d.id;
            return (
              <line
                key={`link-${d.id}`}
                x1={CENTER}
                y1={CENTER}
                x2={p.x}
                y2={p.y}
                stroke={isActive ? d.color : "var(--grid-line-major)"}
                strokeWidth="1"
                opacity={isActive ? 0.55 : 0.35}
                style={{ transition: "opacity 240ms ease, stroke 240ms ease" }}
              />
            );
          })}

          {/* Core: overall alignment */}
          <circle cx={CENTER} cy={CENTER} r={CORE_R + 10} fill="var(--surface-elevated)" opacity="0.55" />
          <circle cx={CENTER} cy={CENTER} r={CORE_R} fill="var(--surface-raised)" stroke="var(--border-subtle)" strokeWidth="1" />
          <circle
            cx={CENTER}
            cy={CENTER}
            r={CORE_R}
            fill="none"
            stroke="var(--syn-volt)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${(today.alignmentScore / 100) * CORE_C} ${CORE_C}`}
            transform={`rotate(-90 ${CENTER} ${CENTER})`}
            className="syn-orbit-core"
            style={{ filter: "drop-shadow(0 0 6px var(--syn-volt-glow))" }}
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
          {domains.map((d, i) => {
            const p = nodePosition(i, domains.length);
            const isActive = active.id === d.id;
            return (
              <g
                key={d.id}
                onMouseEnter={() => setActiveId(d.id)}
                onMouseLeave={() => setActiveId(null)}
                style={{ cursor: "pointer" }}
              >
                <circle cx={p.x} cy={p.y} r={NODE_R + 8} fill="transparent" />
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={NODE_R}
                  fill="var(--surface-raised)"
                  stroke={isActive ? d.color : "var(--border-subtle)"}
                  strokeWidth="1"
                  style={{ transition: "stroke 240ms ease" }}
                />
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={NODE_R - 3}
                  fill="none"
                  stroke="var(--grid-line-major)"
                  strokeWidth="3"
                />
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={NODE_R - 3}
                  fill="none"
                  stroke={d.color}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${(d.value / 100) * NODE_C} ${NODE_C}`}
                  transform={`rotate(-90 ${p.x} ${p.y})`}
                  className="syn-orbit-node"
                  style={{ animationDelay: `${120 + i * 90}ms` }}
                />
                <text
                  x={p.x}
                  y={p.y + 4}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="600"
                  fill={isActive ? "var(--text-primary)" : "var(--text-secondary)"}
                  style={{ fontVariantNumeric: "tabular-nums", transition: "fill 240ms ease" }}
                >
                  {d.value}
                </text>
                <text
                  x={p.x}
                  y={p.y + NODE_R + 15}
                  textAnchor="middle"
                  fontSize="11"
                  letterSpacing="0.6"
                  fill={isActive ? "var(--text-secondary)" : "var(--text-muted)"}
                  style={{ transition: "fill 240ms ease" }}
                >
                  {d.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-1 flex items-center gap-2.5 border-t border-subtle pt-3">
        <span
          className="h-2 w-2 shrink-0 rounded-full"
          style={{ background: active.color, transition: "background 240ms ease" }}
        />
        <p className="truncate text-[13px] text-secondary">
          <span className="text-primary">{active.label}</span>
          <span className="text-muted"> · {active.note}</span>
        </p>
      </div>
    </div>
  );
}
