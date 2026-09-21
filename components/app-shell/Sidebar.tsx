"use client";

import { NAV_ITEMS } from "./nav-items";
import { user } from "@/lib/mock/dashboard";

type SidebarProps = {
  activeId: string;
  onSelect: (id: string) => void;
};

/**
 * Desktop navigation. An icon rail from lg, expanding to labels at xl so that
 * laptop widths keep the workspace wide without losing the IA.
 */
export default function Sidebar({ activeId, onSelect }: SidebarProps) {
  return (
    <aside className="sticky top-0 hidden h-screen w-[72px] shrink-0 flex-col border-r border-subtle bg-base px-2.5 py-6 lg:flex xl:w-[228px] xl:px-4">
      <div className="flex items-center justify-center gap-2.5 xl:justify-start xl:px-2">
        <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-strong">
          <span className="h-2.5 w-2.5 rounded-full bg-volt shadow-[0_0_10px_var(--syn-volt-glow)]" />
        </span>
        <span className="hidden font-display text-[17px] font-semibold uppercase leading-none tracking-[0.22em] text-primary xl:block">
          Synceri
        </span>
      </div>
      <p className="mt-2.5 hidden px-2 text-[9px] uppercase tracking-[0.22em] text-muted xl:block">
        Align · Amplify · Achieve
      </p>

      <nav aria-label="Primary" className="mt-8 flex flex-col gap-0.5">
        {NAV_ITEMS.map(({ id, label, icon: Icon, badge }) => {
          const isActive = activeId === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelect(id)}
              title={label}
              aria-current={isActive ? "page" : undefined}
              className={`group relative flex items-center justify-center gap-3 rounded-lg px-2 py-2.5 text-left text-[14px] transition-colors duration-200 xl:justify-start xl:px-3 ${
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
              <span className="hidden xl:inline">{label}</span>
              {badge ? (
                <span className="ml-auto hidden rounded-full bg-active px-1.5 py-0.5 text-[10px] tabular-nums text-secondary xl:block">
                  {badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto flex items-center justify-center gap-3 rounded-xl px-0 py-2.5 xl:justify-start xl:border xl:border-subtle xl:px-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-active font-display text-[12px] tracking-wider text-primary">
          {user.initials}
        </span>
        <span className="hidden min-w-0 xl:block">
          <span className="block truncate text-[13px] text-primary">{user.fullName}</span>
          <span className="block truncate text-[11px] text-muted">{user.role}</span>
        </span>
      </div>
    </aside>
  );
}
