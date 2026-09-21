import { Check } from "lucide-react";

/**
 * The single completion affordance used by every checkable surface, so a task,
 * a priority and a routine all behave and animate identically.
 *
 * Purely presentational — the parent owns the state and the click target.
 */
export default function CompletionMark({
  done,
  size = 16,
}: {
  done: boolean;
  size?: number;
}) {
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size }}
      className={`flex shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${
        done
          ? "border-volt-deep bg-volt-deep"
          : "border-strong group-hover:border-action"
      }`}
    >
      <Check
        size={size - 5}
        strokeWidth={3}
        className="text-[color:var(--text-on-volt)] transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ transform: done ? "scale(1)" : "scale(0)" }}
      />
    </span>
  );
}
