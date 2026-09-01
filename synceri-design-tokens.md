# Synceri Design Tokens — v1.0
**Entrepreneuria Founder OS · AI Time Management**
Signature accent: **Synceri Volt** `#DDFF00` · Dark-first (navy base), light mode variants included.

---

## 1. Design Rationale (read me before the brief)

Synceri needs more color than sibling apps because a calendar UI carries **semantic state** (scheduled, in-focus, done, overdue) and **user categories** (work, clients, personal…). The rule that keeps it coherent:

| Role | Color family | Job |
|---|---|---|
| **Interactive** | Cyan `#00D4FF` | Buttons, links, focus rings — identical across all Founder OS apps |
| **Temporal (signature)** | Volt lime `#DDFF00` | The "now" line, active timer, streaks, completed. Synceri's identity |
| **Structure** | Navy ladder | Backgrounds, cards, grid lines |
| **Semantic status** | Orange / gold / red | Deadline pressure, pending, conflict |
| **Categorical** | 8-hue set | User-assigned calendars & tags only |

**Never** use lime for buttons, and **never** use cyan for time states. That separation is the system.

---

## 2. Brand & Ecosystem Tokens (shared, do not fork)

| Token | Hex | Notes |
|---|---|---|
| `--eg-navy` | `#0A0E27` | Ecosystem base — unchanged |
| `--eg-cyan` | `#00D4FF` | Primary interactive |
| `--eg-cyan-deep` | `#22D3EE` | Pressed states, gradient stops (one step deeper than primary) |
| `--eg-coral` | `#FF6B5A` | Reserved — Prospra territory. Not used in Synceri UI |
| `--eg-gold` | `#F5C542` | Appears in Synceri only as `status-pending` |

## 3. Synceri Signature

| Token | Hex | Usage |
|---|---|---|
| `--syn-volt` | `#DDFF00` | The accent. Now-line, active timer ring, streak flames, logo mark |
| `--syn-volt-soft` | `#DDFF00` @ 14% | Completed block fills, free-time wash on dark |
| `--syn-volt-glow` | `#DDFF00` @ 35% | Box-shadow/glow on the now-line and active timer |
| `--syn-volt-ink` | `#5C6B00` | Lime-family text/icons on light surfaces (volt itself fails on white) |
| `--syn-volt-deep` | `#A8C400` | Hover/pressed state of volt elements on dark |

Contrast: `#DDFF00` on `#0A0E27` ≈ 16.9:1 ✓ · Navy text on volt fill ≈ 16.9:1 ✓ · Volt on white ✗ (use `--syn-volt-ink`).

## 4. Surface Ladder — Dark (default)

| Token | Hex | Usage |
|---|---|---|
| `--surface-base` | `#0A0E27` | App background |
| `--surface-raised` | `#10152E` | Cards, day columns |
| `--surface-elevated` | `#171D3A` | Modals, popovers, dragged block |
| `--surface-hover` | `#1E2547` | Row/slot hover |
| `--surface-active` | `#25305A` | Pressed / selected slot |
| `--grid-line` | `#1A2140` | Hour lines on calendar |
| `--grid-line-major` | `#242E55` | Day dividers, midnight line |
| `--border-subtle` | `#232B4F` | Card borders, glassmorphism edges |
| `--border-strong` | `#3A4677` | Inputs, focused containers |

## 5. Text — Dark

| Token | Hex | Usage |
|---|---|---|
| `--text-primary` | `#F4F6FB` | Headings (Oswald), event titles |
| `--text-secondary` | `#A9B4D0` | Body (Josefin Sans), times, metadata |
| `--text-muted` | `#6E7BA0` | Timestamps, past-day labels, placeholders |
| `--text-disabled` | `#4A5578` | Disabled controls |
| `--text-on-volt` | `#0A0E27` | Text sitting on lime fills |
| `--text-on-cyan` | `#0A0E27` | Text on cyan buttons |

## 6. Interactive (cyan family — ecosystem-consistent)

| Token | Hex | Usage |
|---|---|---|
| `--action-primary` | `#00D4FF` | Primary buttons, links |
| `--action-hover` | `#4AE0FF` | Hover on dark |
| `--action-pressed` | `#22D3EE` | Pressed (the deep cyan) |
| `--action-soft` | `#00D4FF` @ 12% | Selected nav item, subtle chips |
| `--focus-ring` | `#00D4FF` @ 60% | 2px focus ring, all modes |

## 7. Semantic Time States

| Token | Hex | State |
|---|---|---|
| `--time-scheduled` | `#057BC1` | Default committed block (fill @ 25%, border solid) |
| `--time-scheduled-lt` | `#4DD8FF` | Block text/edge on dark; light-mode fill tint |
| `--time-focus` | `#00D4FF` | AI-protected deep-work block |
| `--time-now` | `#DDFF00` | The now-line + current-block ring. Signature moment |
| `--time-complete` | `#DDFF00` @ 14% fill, `#A8C400` check | Done |
| `--time-free` | `#DDFF00` @ 6% | AI-identified open capacity |
| `--time-tentative` | `#F5C542` | Pending / unconfirmed / awaiting reply (system gold) |
| `--time-deadline` | `#ED7A2F` | Deadline within threshold, at-risk (the Image-1 burnt orange, earned here) |
| `--time-overdue` | `#E5484D` | Missed / hard conflict. True red — deliberately not coral |
| `--time-past` | `#6E7BA0` @ 40% | Elapsed blocks, desaturated |

## 8. Categorical Set (user calendars & tags — max 8)

Tuned to sit on navy without vibrating against the semantic colors.

| Token | Hex | Name |
|---|---|---|
| `--cat-01` | `#4DD8FF` | Sky |
| `--cat-02` | `#7C8CF8` | Iris |
| `--cat-03` | `#C77DFF` | Orchid |
| `--cat-04` | `#F06BA8` | Rose |
| `--cat-05` | `#ED7A2F` | Ember |
| `--cat-06` | `#F5C542` | Gold |
| `--cat-07` | `#54D6A8` | Mint |
| `--cat-08` | `#A8C400` | Moss (volt-adjacent, for the power user) |

Category colors apply as: 3px left border + 10% fill + full-strength dot. Never full-saturation fills — that's how calendars turn into confetti.

## 9. Light Mode Variants

| Token | Dark | Light |
|---|---|---|
| `--surface-base` | `#0A0E27` | `#F7F8FC` |
| `--surface-raised` | `#10152E` | `#FFFFFF` |
| `--surface-elevated` | `#171D3A` | `#FFFFFF` + shadow |
| `--surface-hover` | `#1E2547` | `#EEF1F9` |
| `--grid-line` | `#1A2140` | `#E4E8F4` |
| `--border-subtle` | `#232B4F` | `#DCE1F0` |
| `--text-primary` | `#F4F6FB` | `#0A0E27` |
| `--text-secondary` | `#A9B4D0` | `#3D4668` |
| `--text-muted` | `#6E7BA0` | `#6E7BA0` |
| `--action-primary` | `#00D4FF` | `#0093B8` |
| `--time-scheduled` fill | `#057BC1` @ 25% | `#4DD8FF` @ 18% |
| `--time-now` | `#DDFF00` | `#DDFF00` line + `#5C6B00` label text |
| `--time-deadline` | `#ED7A2F` | `#C75E1A` |
| `--time-overdue` | `#E5484D` | `#C93A3F` |

## 10. Typography (system-standard, roles mapped)

| Role | Face | Weight |
|---|---|---|
| Display / screen titles | Oswald | SemiBold |
| Section headers, day labels | Oswald | Medium |
| Body, event details | Josefin Sans | Regular |
| Emphasis, buttons | Josefin Sans | SemiBold |
| **Time digits / durations** | Josefin Sans SemiBold, tabular-nums | Use `font-variant-numeric: tabular-nums` so clock digits don't jitter |

## 11. CSS Custom Properties (drop-in)

```css
:root {
  /* Ecosystem */
  --eg-navy: #0A0E27;
  --eg-cyan: #00D4FF;
  --eg-cyan-deep: #22D3EE;
  --eg-gold: #F5C542;

  /* Synceri signature */
  --syn-volt: #DDFF00;
  --syn-volt-soft: rgba(221, 255, 0, 0.14);
  --syn-volt-glow: rgba(221, 255, 0, 0.35);
  --syn-volt-ink: #5C6B00;
  --syn-volt-deep: #A8C400;

  /* Surfaces (dark default) */
  --surface-base: #0A0E27;
  --surface-raised: #10152E;
  --surface-elevated: #171D3A;
  --surface-hover: #1E2547;
  --surface-active: #25305A;
  --grid-line: #1A2140;
  --grid-line-major: #242E55;
  --border-subtle: #232B4F;
  --border-strong: #3A4677;

  /* Text */
  --text-primary: #F4F6FB;
  --text-secondary: #A9B4D0;
  --text-muted: #6E7BA0;
  --text-disabled: #4A5578;
  --text-on-volt: #0A0E27;
  --text-on-cyan: #0A0E27;

  /* Interactive */
  --action-primary: #00D4FF;
  --action-hover: #4AE0FF;
  --action-pressed: #22D3EE;
  --action-soft: rgba(0, 212, 255, 0.12);
  --focus-ring: rgba(0, 212, 255, 0.6);

  /* Time semantics */
  --time-scheduled: #057BC1;
  --time-scheduled-lt: #4DD8FF;
  --time-focus: #00D4FF;
  --time-now: #DDFF00;
  --time-complete: #A8C400;
  --time-free: rgba(221, 255, 0, 0.06);
  --time-tentative: #F5C542;
  --time-deadline: #ED7A2F;
  --time-overdue: #E5484D;
  --time-past: rgba(110, 123, 160, 0.4);

  /* Categories */
  --cat-01: #4DD8FF; --cat-02: #7C8CF8; --cat-03: #C77DFF; --cat-04: #F06BA8;
  --cat-05: #ED7A2F; --cat-06: #F5C542; --cat-07: #54D6A8; --cat-08: #A8C400;
}

[data-theme="light"] {
  --surface-base: #F7F8FC;
  --surface-raised: #FFFFFF;
  --surface-elevated: #FFFFFF;
  --surface-hover: #EEF1F9;
  --surface-active: #E2E7F5;
  --grid-line: #E4E8F4;
  --grid-line-major: #CBD3EA;
  --border-subtle: #DCE1F0;
  --border-strong: #AEB9DB;
  --text-primary: #0A0E27;
  --text-secondary: #3D4668;
  --text-muted: #6E7BA0;
  --text-disabled: #AAB3CE;
  --action-primary: #0093B8;
  --action-hover: #00B5DB;
  --action-pressed: #007A9B;
  --time-deadline: #C75E1A;
  --time-overdue: #C93A3F;
}
```

## 12. Tailwind Extend (tailwind.config.ts)

```ts
extend: {
  colors: {
    navy: '#0A0E27',
    cyan: { DEFAULT: '#00D4FF', deep: '#22D3EE', pressedLight: '#0093B8' },
    volt: { DEFAULT: '#DDFF00', deep: '#A8C400', ink: '#5C6B00' },
    surface: { base: 'var(--surface-base)', raised: 'var(--surface-raised)',
               elevated: 'var(--surface-elevated)', hover: 'var(--surface-hover)' },
    time: { scheduled: '#057BC1', focus: '#00D4FF', now: '#DDFF00',
            tentative: '#F5C542', deadline: '#ED7A2F', overdue: '#E5484D' },
  },
  boxShadow: {
    'volt-glow': '0 0 12px 2px rgba(221,255,0,0.35)',
    'card': '0 4px 24px rgba(4, 7, 24, 0.45)',
  },
}
```

## 13. Usage Rules (paste into Template M scope lock)

1. Lime = time, cyan = interaction. No exceptions, no lime buttons, no cyan now-line.
2. The now-line (`--time-now` + `volt-glow`) is Synceri's signature element. It is the ONLY glowing element on the calendar view.
3. Coral `#FF6B5A` does not appear anywhere in Synceri UI.
4. Overdue red `#E5484D` is reserved for genuinely missed/conflicting items — never for emphasis.
5. Category colors render at ≤10% fill + border + dot; never solid blocks.
6. Marketing site palette stays tight: navy, cyan, volt, warm white. The full semantic set is product-only.
7. All time digits use tabular-nums.
