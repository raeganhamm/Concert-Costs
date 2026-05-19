import { AlertCircle } from "lucide-react";

type ErrorStateProps = {
  message: string;
  onRetry?: () => void;
};

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="card bg-base-100 border border-error/30 shadow-sm rounded-2xl">
      <div className="card-body items-center text-center gap-4">
        <AlertCircle className="h-10 w-10 text-error" aria-hidden />
        <p className="max-w-md text-base leading-relaxed">{message}</p>
        {onRetry && (
          <button type="button" className="btn btn-outline btn-sm min-h-11" onClick={onRetry}>
            Try again
          </button>
        )}
      </div>
    </div>
  );
}
