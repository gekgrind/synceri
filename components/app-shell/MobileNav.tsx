"use client";

import { useEffect, useRef } from "react";
import { MoreHorizontal, X } from "lucide-react";
import { PRIMARY_NAV_ITEMS, SECONDARY_NAV_ITEMS } from "./nav-items";
import { user } from "@/lib/mock/dashboard";

type MobileNavProps = {
  activeId: string;
  onSelect: (id: string) => void;
};

/**
 * Below lg the rail is replaced by a thumb-reachable tab bar. Four primary
 * destinations stay visible; the rest move into a sheet, so touch targets stay
 * at 44px instead of shrinking eight items into one row.
 */
export default function MobileNav({ activeId, onSelect }: MobileNavProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const close = () => {
    if (detailsRef.current) detailsRef.current.open = false;
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const isSecondaryActive = SECONDARY_NAV_ITEMS.some((item) => item.id === activeId);

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-subtle bg-raised/95 backdrop-blur-sm lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="flex items-stretch">
        {PRIMARY_NAV_ITEMS.map(({ id, label, icon: Icon, badge }) => {
          const isActive = activeId === id;
          return (
            <li key={id} className="flex-1">
              <button
                type="button"
                onClick={() => onSelect(id)}
                aria-current={isActive ? "page" : undefined}
                className={`relative flex min-h-[56px] w-full flex-col items-center justify-center gap-1 px-1 py-2 text-[10px] transition-colors duration-200 ${
                  isActive ? "text-primary" : "text-muted"
                }`}
              >
                {isActive && (
                  <span className="absolute inset-x-4 top-0 h-[2px] rounded-b bg-volt" />
                )}
                <span className="relative">
                  <Icon
                    size={19}
                    strokeWidth={1.75}
                    className={isActive ? "text-action" : undefined}
                  />
                  {badge ? (
                    <span className="absolute -right-2 -top-1 flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-active px-1 text-[9px] tabular-nums text-secondary">
                      {badge}
                    </span>
                  ) : null}
                </span>
                {label}
              </button>
            </li>
          );
        })}

        <li className="flex-1">
          <details ref={detailsRef} className="group">
            <summary
              className={`flex min-h-[56px] w-full cursor-pointer list-none flex-col items-center justify-center gap-1 px-1 py-2 text-[10px] transition-colors duration-200 [&::-webkit-details-marker]:hidden ${
                isSecondaryActive ? "text-primary" : "text-muted"
              }`}
              aria-label="More destinations"
            >
              <MoreHorizontal
                size={19}
                strokeWidth={1.75}
                className={isSecondaryActive ? "text-action" : undefined}
              />
              More
            </summary>

            <div className="fixed inset-0 z-50">
              <button
                type="button"
                aria-label="Close menu"
                onClick={close}
                className="syn-fade absolute inset-0 bg-[color:var(--scrim)]"
              />
              <div
                className="syn-sheet absolute inset-x-0 bottom-0 rounded-t-2xl border-t border-subtle bg-elevated p-4 shadow-[var(--shadow-raised)]"
                style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom))" }}
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-active font-display text-[12px] tracking-wider text-primary">
                      {user.initials}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[13px] text-primary">
                        {user.fullName}
                      </span>
                      <span className="block truncate text-[11px] text-muted">{user.role}</span>
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={close}
                    aria-label="Close menu"
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-subtle text-secondary transition-colors duration-200 hover:text-primary"
                  >
                    <X size={16} strokeWidth={1.75} />
                  </button>
                </div>

                <ul className="grid grid-cols-2 gap-1.5">
                  {SECONDARY_NAV_ITEMS.map(({ id, label, icon: Icon }) => {
                    const isActive = activeId === id;
                    return (
                      <li key={id}>
                        <button
                          type="button"
                          onClick={() => {
                            onSelect(id);
                            close();
                          }}
                          aria-current={isActive ? "page" : undefined}
                          className={`flex min-h-[48px] w-full items-center gap-2.5 rounded-xl border px-3 text-left text-[14px] transition-colors duration-200 ${
                            isActive
                              ? "border-[color:var(--action-border)] bg-[color:var(--action-soft)] text-primary"
                              : "border-subtle text-secondary hover:bg-hover hover:text-primary"
                          }`}
                        >
                          <Icon
                            size={17}
                            strokeWidth={1.75}
                            className={isActive ? "text-action" : "text-muted"}
                          />
                          {label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </details>
        </li>
      </ul>
    </nav>
  );
}
