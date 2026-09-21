"use client";

import { Bell, Command, Search } from "lucide-react";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { user } from "@/lib/mock/dashboard";

/**
 * The workspace's utility row: ask/search, notifications, theme.
 * On small screens the brand returns here, since the rail is hidden.
 */
export default function TopBar() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="mr-auto flex items-center gap-2.5 lg:hidden">
        <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-strong">
          <span className="h-2.5 w-2.5 rounded-full bg-volt shadow-[0_0_10px_var(--syn-volt-glow)]" />
        </span>
        <span className="font-display text-[15px] font-semibold uppercase leading-none tracking-[0.22em] text-primary">
          Synceri
        </span>
      </span>

      <label className="group hidden h-10 items-center gap-2.5 rounded-xl border border-subtle bg-raised px-3.5 transition-colors duration-200 focus-within:border-action hover:border-strong md:flex md:w-[240px] xl:w-[300px]">
        <Search size={15} strokeWidth={1.75} className="shrink-0 text-muted" />
        <span className="sr-only">Ask Synceri or find anything</span>
        <input
          className="min-w-0 flex-1 bg-transparent text-[13px] text-primary outline-none placeholder:text-muted"
          placeholder="Ask Synceri or find anything…"
        />
        <span className="hidden items-center gap-0.5 rounded border border-subtle px-1.5 py-0.5 text-[10px] text-muted xl:flex">
          <Command size={10} strokeWidth={2} />K
        </span>
      </label>

      <button
        type="button"
        aria-label="Ask Synceri or find anything"
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-subtle bg-raised text-secondary transition-colors duration-200 hover:border-strong hover:text-primary md:hidden"
      >
        <Search size={16} strokeWidth={1.75} />
      </button>

      <ThemeToggle />

      <button
        type="button"
        className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-subtle bg-raised text-secondary transition-colors duration-200 hover:border-strong hover:text-primary"
        aria-label="Notifications, 1 unread"
      >
        <Bell size={16} strokeWidth={1.75} />
        <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-volt" />
      </button>

      <span
        aria-hidden="true"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-active font-display text-[12px] tracking-wider text-primary lg:hidden"
      >
        {user.initials}
      </span>
    </div>
  );
}
