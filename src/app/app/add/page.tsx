import { AddConcertForm } from "@/components/AddConcertForm";
import { PageHeader } from "@/components/PageHeader";

export default function AddConcertPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Add Concert"
        description="Log a show you attended and what you spent."
      />
      <AddConcertForm />
    </div>
  );
}
