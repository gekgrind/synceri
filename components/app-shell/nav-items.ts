import {
  CalendarDays,
  Flag,
  Layers,
  ListChecks,
  Repeat,
  Sparkles,
  Sun,
  Target,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
  /** Shown in the mobile tab bar. The rest live behind "More". */
  primary?: boolean;
};

/**
 * The application's information architecture. Destinations are not routed yet
 * — selecting one only moves the active state — so that the shell can be
 * reviewed before any of these screens exist.
 */
export const NAV_ITEMS: NavItem[] = [
  { id: "today", label: "Today", icon: Sun, primary: true },
  { id: "my-life", label: "My Life", icon: Layers },
  { id: "calendar", label: "Calendar", icon: CalendarDays, primary: true },
  { id: "priorities", label: "Priorities", icon: Target, badge: 3, primary: true },
  { id: "goals", label: "Goals", icon: Flag },
  { id: "routines", label: "Routines", icon: Repeat },
  { id: "tasks", label: "Tasks", icon: ListChecks, badge: 8, primary: true },
  { id: "insights", label: "Insights", icon: Sparkles },
];

export const PRIMARY_NAV_ITEMS = NAV_ITEMS.filter((item) => item.primary);
export const SECONDARY_NAV_ITEMS = NAV_ITEMS.filter((item) => !item.primary);
