import { ChevronRight } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/Card";
import { adminStatusColor, needsAttention } from "@/lib/mock/dashboard";

/**
 * Life admin — the small obligations that do not belong on a calendar but
 * quietly accumulate. Urgency is carried by a dot and the timing colour, not
 * by shouting at the whole row.
 */
export default function NeedsAttention({ delay = 0, className = "" }: { delay?: number; className?: string }) {
  return (
    <Card delay={delay} className={className}>
      <CardTitle aside={`${needsAttention.length} open`}>Needs attention</CardTitle>
      <ul className="flex flex-col gap-0.5">
        {needsAttention.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className="group flex min-h-[34px] w-full items-center gap-2.5 rounded-lg px-1.5 py-1 text-left transition-colors duration-200 hover:bg-hover"
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: adminStatusColor[item.status] }}
              />
              <span className="min-w-0 flex-1 truncate text-[13px] text-primary">{item.title}</span>
              <span
                className="shrink-0 text-[11px] tabular-nums"
                style={{ color: adminStatusColor[item.status] }}
              >
                {item.timing}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="mt-2.5 inline-flex items-center gap-1 border-t border-subtle pt-2.5 text-[12px] text-secondary transition-colors duration-200 hover:text-action"
      >
        Open life admin <ChevronRight size={13} strokeWidth={2} />
      </button>
    </Card>
  );
}
