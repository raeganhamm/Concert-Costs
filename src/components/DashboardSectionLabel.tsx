export function DashboardSectionLabel({ children }: { children: string }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-wider text-base-content/50">
      {children}
    </p>
  );
}
