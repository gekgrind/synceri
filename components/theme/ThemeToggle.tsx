"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, pending, toggleTheme } = useTheme();
  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
      className={`relative flex h-10 w-10 items-center justify-center rounded-xl border border-subtle bg-raised text-secondary transition-colors duration-200 hover:border-strong hover:text-primary ${className}`}
    >
      {/* Both icons are mounted and cross-faded so the swap has no layout
          jump; `pending` keeps SSR output theme-neutral until hydration. */}
      <span
        className="grid place-items-center transition-opacity duration-200"
        style={{ opacity: pending ? 0 : 1 }}
        aria-hidden="true"
      >
        <Sun
          size={16}
          strokeWidth={1.75}
          className="col-start-1 row-start-1 transition-[opacity,transform] duration-300"
          style={{
            opacity: theme === "dark" ? 1 : 0,
            transform: theme === "dark" ? "rotate(0deg)" : "rotate(-45deg)",
          }}
        />
        <Moon
          size={16}
          strokeWidth={1.75}
          className="col-start-1 row-start-1 transition-[opacity,transform] duration-300"
          style={{
            opacity: theme === "light" ? 1 : 0,
            transform: theme === "light" ? "rotate(0deg)" : "rotate(45deg)",
          }}
        />
      </span>
    </button>
  );
}
