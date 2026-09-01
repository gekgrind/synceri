/**
 * Deterministic mock data for the Synceri dashboard shell.
 * One coherent day: Monday, September 1 — launch week for Entrepreneuria.
 */

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
};

export type Domain = {
  id: string;
  label: string;
  /** 0-100 — how aligned this life domain is right now */
  value: number;
  color: string;
  note: string;
};

export const domains: Domain[] = [
  { id: "business", label: "Business", value: 88, color: "var(--cat-01)", note: "Launch week on track" },
  { id: "growth", label: "Growth", value: 74, color: "var(--cat-02)", note: "2 of 3 sessions done" },
  { id: "health", label: "Health", value: 61, color: "var(--cat-07)", note: "Movement slipping" },
  { id: "home", label: "Home", value: 45, color: "var(--cat-05)", note: "Contractor unanswered" },
  { id: "relationships", label: "Relationships", value: 79, color: "var(--cat-04)", note: "Dinner Thursday" },
  { id: "personal", label: "Personal", value: 68, color: "var(--cat-03)", note: "Insurance call pending" },
];

export const focus = {
  title: "Finalize homepage polish",
  window: "10:00 AM – 12:00 PM",
  priority: "High",
  category: "Entrepreneuria",
  progressLabel: "Protected focus block",
  why: "Last blocker before Thursday's launch review.",
};

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
    title: "Sync with design work",
    meta: "Today · after focus block",
    domain: "Business",
    color: "var(--cat-02)",
    done: false,
  },
  {
    id: "p3",
    title: "Call the insurance office",
    meta: "Before 4:00 PM",
    domain: "Personal",
    color: "var(--cat-03)",
    done: false,
  },
];

export type ScheduleItem = {
  id: string;
  time: string;
  title: string;
  kind: "business" | "focus" | "personal" | "recovery";
  duration: string;
  now?: boolean;
};

export const schedule: ScheduleItem[] = [
  { id: "s1", time: "9:30 AM", title: "Homepage design review", kind: "business", duration: "30m" },
  { id: "s2", time: "10:00 AM", title: "Deep work · homepage", kind: "focus", duration: "2h", now: true },
  { id: "s3", time: "1:00 PM", title: "Channelwright roadmap", kind: "business", duration: "45m" },
  { id: "s4", time: "3:30 PM", title: "Personal errands", kind: "personal", duration: "1h" },
  { id: "s5", time: "6:00 PM", title: "Reset & recharge", kind: "recovery", duration: "1h" },
];

export const scheduleKindLabel: Record<ScheduleItem["kind"], string> = {
  business: "Business",
  focus: "Focus",
  personal: "Personal",
  recovery: "Recovery",
};

export const scheduleKindColor: Record<ScheduleItem["kind"], string> = {
  business: "var(--cat-01)",
  focus: "var(--time-focus)",
  personal: "var(--cat-03)",
  recovery: "var(--cat-07)",
};

export type AdminItem = {
  id: string;
  title: string;
  timing: string;
  status: "urgent" | "soon" | "waiting";
};

export const needsAttention: AdminItem[] = [
  { id: "a1", title: "Renew entrepreneuria.io domain", timing: "In 5 days", status: "soon" },
  { id: "a2", title: "Insurance payment due", timing: "Friday", status: "urgent" },
  { id: "a3", title: "Follow up with contractor", timing: "Waiting 6 days", status: "waiting" },
  { id: "a4", title: "Schedule annual appointment", timing: "This month", status: "waiting" },
];

export const adminStatusColor: Record<AdminItem["status"], string> = {
  urgent: "var(--time-deadline)",
  soon: "var(--time-tentative)",
  waiting: "var(--text-muted)",
};

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

export const insight = {
  title: "Synceri noticed",
  body: "Three high-focus tasks are stacked after 3 PM. Moving the Channelwright roadmap to tomorrow at 9:30 clears your afternoon.",
  primaryAction: "Adjust schedule",
  secondaryAction: "Dismiss",
};
