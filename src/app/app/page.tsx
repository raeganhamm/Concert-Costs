import { DashboardView } from "@/components/DashboardView";
import { PageHeader } from "@/components/PageHeader";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Your concert spending and fun at a glance."
      />
      <DashboardView />
    </div>
  );
}
