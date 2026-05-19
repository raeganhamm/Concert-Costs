import Link from "next/link";
import { Music2 } from "lucide-react";

type EmptyStateProps = {
  title?: string;
  message: string;
  actionLabel?: string;
  actionHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function EmptyState({
  title = "Nothing here yet",
  message,
  actionLabel = "Add Concert",
  actionHref = "/app/add",
  secondaryLabel,
  secondaryHref,
}: EmptyStateProps) {
  return (
    <div className="card bg-base-100 border border-base-300/60 shadow-sm rounded-2xl">
      <div className="card-body items-center text-center gap-5 py-10">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <Music2 className="h-10 w-10 text-primary opacity-90" aria-hidden />
        </div>
        <div className="space-y-2 max-w-md">
          <h3 className="section-title">{title}</h3>
          <p className="text-helper">{message}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {actionHref && (
            <Link href={actionHref} className="btn btn-primary min-h-11">
              {actionLabel}
            </Link>
          )}
          {secondaryHref && secondaryLabel && (
            <Link href={secondaryHref} className="btn btn-outline min-h-11">
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
