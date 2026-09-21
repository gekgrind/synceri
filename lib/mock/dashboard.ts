/**
 * Mock data for the Synceri dashboard.
 *
 * Everything the dashboard renders comes from this module so that swapping in
 * real data later is a matter of replacing these exports with a data-access
 * layer of the same shape. Components never hardcode content.
 *
 * The day is deterministic on purpose: no `new Date()` anywhere, so server and
 * client render identically and screenshots stay stable.
 */

/* -------------------------------------------------------------------------- */
/* Time model                                                                  */
/* -------------------------------------------------------------------------- */

/** Minutes since midnight. The timeline positions everything from this. */
export type Minutes = number;

export const mins = (hour: number, minute = 0): Minutes => hour * 60 + minute;

/** 12-hour clock label, e.g. 630 -> "10:30 AM". */
export function formatTime(value: Minutes): string {
  const hour24 = Math.floor(value / 60) % 24;
  const minute = value % 60;
  const suffix = hour24 < 12 ? "AM" : "PM";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${hour12}:${String(minute).padStart(2, "0")} ${suffix}`;
}

/** Compact duration, e.g. 135 -> "2h 15m". */
export function formatDuration(value: Minutes): string {
  const hours = Math.floor(value / 60);
  const minutes = value % 60;
  if (hours && minutes) return `${hours}h ${minutes}m`;
  if (hours) return `${hours}h`;
  return `${minutes}m`;
}

/* -------------------------------------------------------------------------- */
/* Viewer + day                                                                */
/* -------------------------------------------------------------------------- */

export const user = {
  firstName: "Misti",
  fullName: "Misti Grinder",
  initials: "MG",
  role: "Founder · Entrepreneuria",
};

export const today = {
  greeting: "Good morning",
  dateLabel: "Monday, September 1",
  subline: "Here's what deserves your attention today.",
  alignmentScore: 82,
  /** "Now" for this mocked day — 10:48 AM. Drives the timeline's now-line. */
  now: mins(10, 48),
};

/* -------------------------------------------------------------------------- */
/* Life domains (alignment orbit)                                              */
/* -------------------------------------------------------------------------- */

export type Domain = {
  id: string;
  label: string;
  /** 0-100 — how aligned this life domain is right now. */
  value: number;
  color: string;
  note: string;
};

export const domains: Domain[] = [
  { id: "business", label: "Business", value: 88, color: "var(--cat-01)", note: "Launch week on track" },
  { id: "growth", label: "Growth", value: 74, color: "var(--cat-02)", note: "2 of 3 sessions done" },
  { id: "health", label: "Health", value: 61, color: "var(--cat-07)", note: "Movement slipping" },
  { id: "home", label: "Home", value: 45, color: "var(--cat-05)", note: "Contractor unanswered" },
  { id: "family", label: "Family", value: 79, color: "var(--cat-04)", note: "Mom's appointment at 2:30" },
  { id: "personal", label: "Personal", value: 68, color: "var(--cat-03)", note: "Insurance call pending" },
];

/* -------------------------------------------------------------------------- */
/* The one thing that matters right now                                        */
/* -------------------------------------------------------------------------- */

export const focus = {
  title: "Finish the quarterly proposal",
  start: mins(10),
  end: mins(12),
  remaining: mins(1, 12),
  priority: "High",
  category: "Business",
  categoryColor: "var(--cat-01)",
  why: "Last blocker before Thursday's launch review — and the only two clear hours you have today.",
};

/* -------------------------------------------------------------------------- */
/* Priorities                                                                  */
/* -------------------------------------------------------------------------- */

export type Priority = {
  id: string;
  title: string;
  meta: string;
  domain: string;
  color: string;
  done: boolean;
};

export const priorities: Priority[] = [
  {
    id: "p1",
    title: "Review Channelwright launch workflow",
    meta: "1:00 PM · 45 min",
    domain: "Business",
    color: "var(--cat-01)",
    done: false,
  },
  {
    id: "p2",
    title: "Call Sarah about the contractor",
    meta: "Before 4:30 PM",
    domain: "Home",
    color: "var(--cat-05)",
    done: false,
  },
  {
    id: "p3",
    title: "Pay the electric bill",
    meta: "Due today",
    domain: "Personal",
    color: "var(--cat-03)",
    done: false,
  },
];

/* -------------------------------------------------------------------------- */
/* Schedule                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Block kinds carry meaning, not decoration:
 *   focus     — AI-protected deep work (cyan, per the time-semantics scale)
 *   scheduled — a committed appointment
 *   personal / family / home — life, rendered with category colour
 *   routine   — a recurring anchor of the day
 */
export type BlockKind = "focus" | "scheduled" | "personal" | "family" | "home" | "routine";

export type ScheduleBlock = {
  id: string;
  title: string;
  detail?: string;
  start: Minutes;
  end: Minutes;
  kind: BlockKind;
  /** Unconfirmed / awaiting someone else. Rendered as a dashed edge. */
  tentative?: boolean;
};

export const blockMeta: Record<BlockKind, { label: string; color: string }> = {
  focus: { label: "Focus", color: "var(--time-focus)" },
  scheduled: { label: "Work", color: "var(--cat-01)" },
  personal: { label: "Personal", color: "var(--cat-03)" },
  family: { label: "Family", color: "var(--cat-04)" },
  home: { label: "Home", color: "var(--cat-05)" },
  routine: { label: "Routine", color: "var(--cat-07)" },
};

/** The timeline window. Blocks outside it are summarised, not clipped. */
export const dayWindow = { start: mins(7), end: mins(20) };

export const schedule: ScheduleBlock[] = [
  { id: "b1", title: "School drop-off", detail: "Both kids", start: mins(8, 10), end: mins(8, 40), kind: "family" },
  { id: "b2", title: "Homepage design review", detail: "With Dana", start: mins(9, 30), end: mins(10), kind: "scheduled" },
  { id: "b3", title: "Quarterly proposal", detail: "Protected focus block", start: mins(10), end: mins(12), kind: "focus" },
  { id: "b4", title: "Lunch + walk", start: mins(12, 15), end: mins(13), kind: "personal" },
  { id: "b5", title: "Channelwright roadmap", detail: "Team check-in", start: mins(13), end: mins(13, 45), kind: "scheduled" },
  { id: "b6", title: "Mom's cardiology appointment", detail: "Driving her", start: mins(14, 30), end: mins(15, 45), kind: "family" },
  { id: "b7", title: "School pickup", start: mins(15, 45), end: mins(16, 15), kind: "family" },
  { id: "b8", title: "Call Sarah — contractor", start: mins(16, 30), end: mins(16, 50), kind: "home", tentative: true },
  { id: "b9", title: "Groceries + dinner prep", start: mins(17, 30), end: mins(18, 30), kind: "home" },
  { id: "b10", title: "Evening walk", detail: "With Tom", start: mins(19), end: mins(19, 40), kind: "personal" },
];

/* -------------------------------------------------------------------------- */
/* AI guidance                                                                 */
/* -------------------------------------------------------------------------- */

export type InsightTone = "conflict" | "suggestion" | "protect";

export type Insight = {
  id: string;
  tone: InsightTone;
  headline: string;
  body: string;
  primaryAction: string;
  secondaryAction: string;
};

export const insights: Insight[] = [
  {
    id: "i1",
    tone: "conflict",
    headline: "Two things need you at 3:45",
    body: "Mom's appointment runs until 3:45 and school pickup starts at 3:45 across town. Moving the Channelwright roadmap to 9:00 tomorrow frees you to leave the appointment early.",
    primaryAction: "Reschedule roadmap",
    secondaryAction: "Not now",
  },
  {
    id: "i2",
    tone: "protect",
    headline: "Your only clear hours are right now",
    body: "After noon the day fragments into six short gaps. The proposal needs an uninterrupted stretch, so Synceri is holding 10:00–12:00 and muting notifications.",
    primaryAction: "Keep it protected",
    secondaryAction: "Release the block",
  },
];

/* -------------------------------------------------------------------------- */
/* Life admin                                                                  */
/* -------------------------------------------------------------------------- */

export type AdminStatus = "urgent" | "soon" | "waiting";

export type AdminItem = {
  id: string;
  title: string;
  timing: string;
  status: AdminStatus;
};

export const needsAttention: AdminItem[] = [
  { id: "a1", title: "Pay the electric bill", timing: "Due today", status: "urgent" },
  { id: "a2", title: "Insurance payment", timing: "Friday", status: "urgent" },
  { id: "a3", title: "Renew entrepreneuria.io", timing: "In 5 days", status: "soon" },
  { id: "a4", title: "Book the dentist", timing: "Waiting 3 weeks", status: "waiting" },
  { id: "a5", title: "Follow up with contractor", timing: "Waiting 6 days", status: "waiting" },
];

export const adminStatusColor: Record<AdminStatus, string> = {
  urgent: "var(--time-deadline)",
  soon: "var(--time-tentative)",
  waiting: "var(--text-muted)",
};

/* -------------------------------------------------------------------------- */
/* Routines + goals                                                            */
/* -------------------------------------------------------------------------- */

export type Routine = { id: string; label: string; time: string; done: boolean };

export const routines: Routine[] = [
  { id: "r1", label: "Morning planning", time: "7:15 AM", done: true },
  { id: "r2", label: "Deep work", time: "10:00 AM", done: true },
  { id: "r3", label: "Inbox reset", time: "2:30 PM", done: false },
  { id: "r4", label: "Evening shutdown", time: "7:00 PM", done: false },
];

export const routineStreak = 12;

export type Goal = { id: string; label: string; progress: number; meta: string };

export const goals: Goal[] = [
  { id: "g1", label: "Launch Entrepreneuria", progress: 72, meta: "Sept 18 · on pace" },
  { id: "g2", label: "Train three times a week", progress: 58, meta: "7 of 12 sessions" },
];
