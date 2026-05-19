import { MyConcertsView } from "@/components/MyConcertsView";
import { PageHeader } from "@/components/PageHeader";

export default function MyConcertsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="My Concerts"
        description="Every show you have logged, with costs and fun scores."
      />
      <MyConcertsView />
    </div>
  );
}
