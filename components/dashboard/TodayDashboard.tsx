import { Card } from "@/components/ui/Card";
import AlignmentOrbit from "./AlignmentOrbit";
import DailyRhythm from "./DailyRhythm";
import DashboardHeader from "./DashboardHeader";
import FocusHero from "./FocusHero";
import InsightCard from "./InsightCard";
import Momentum from "./Momentum";
import NeedsAttention from "./NeedsAttention";
import ScheduleTimeline from "./ScheduleTimeline";

/**
 * The Today screen.
 *
 * Three layouts, one set of markup:
 *
 *   < lg   single column, re-ranked for a phone
 *   lg     workspace + supporting rail, orbit stacked above the rhythm
 *   xl     the full composition — orbit beside the rhythm and momentum
 *
 * Below lg the column wrappers collapse to `display: contents`, which promotes
 * every card to a direct child of the outer flex container so the `order-*` on
 * each card can re-rank them. The wrappers become real boxes from lg and the
 * cards reset to `lg:order-none`.
 *
 * `order` has no effect on a `display: contents` element, so it must live on
 * the cards themselves — never on the wrappers.
 *
 * Mobile order: focus → what Synceri noticed → the day → routines → admin →
 * alignment → goals.
 */
export default function TodayDashboard() {
  return (
    <>
      <DashboardHeader />

      <div className="mt-4 flex flex-1 flex-col gap-4 lg:grid lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_336px]">
        {/* Workspace column */}
        <div className="contents lg:flex lg:min-w-0 lg:flex-col lg:gap-4">
          <FocusHero className="order-1 lg:order-none" />

          <div className="contents lg:flex lg:flex-col lg:gap-4 xl:grid xl:h-[500px] xl:grid-cols-[minmax(0,1fr)_290px]">
            <Card
              delay={90}
              className="order-6 flex min-h-[334px] flex-col lg:order-none xl:min-h-0"
            >
              <AlignmentOrbit />
            </Card>

            <div className="contents lg:flex lg:flex-col lg:gap-4">
              <DailyRhythm delay={150} className="order-4 lg:order-none" />
              <Momentum delay={210} className="order-7 lg:order-none" />
            </div>
          </div>
        </div>

        {/* Supporting rail */}
        <div className="contents lg:flex lg:min-w-0 lg:flex-col lg:gap-4">
          <InsightCard delay={60} className="order-2 lg:order-none" />

          <Card delay={120} className="order-3 flex min-h-0 flex-col lg:order-none">
            <ScheduleTimeline />
          </Card>

          <NeedsAttention delay={180} className="order-5 lg:order-none" />
        </div>
      </div>
    </>
  );
}
