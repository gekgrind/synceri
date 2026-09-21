import { today, user } from "@/lib/mock/dashboard";

/**
 * The greeting. Deliberately personal rather than administrative — it names
 * the person and the day before it names anything the product does.
 */
export default function DashboardHeader() {
  return (
    <header className="mt-5 sm:mt-6">
      <p className="text-[11px] uppercase tracking-[0.22em] text-muted">{today.dateLabel}</p>
      <h1 className="mt-1.5 font-display text-[24px] font-semibold leading-tight text-primary sm:text-[28px]">
        {today.greeting}, {user.firstName}.
      </h1>
      <p className="mt-1 text-[14px] text-secondary">{today.subline}</p>
    </header>
  );
}
