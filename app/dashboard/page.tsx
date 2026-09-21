import AppShell from "@/components/app-shell/AppShell";
import TodayDashboard from "@/components/dashboard/TodayDashboard";

export const metadata = {
  title: "Today · Synceri",
};

export default function DashboardPage() {
  return (
    <AppShell>
      <TodayDashboard />
    </AppShell>
  );
}
