import type { LucideIcon } from "lucide-react";
import { sectionCardClassName } from "@/lib/ui-classes";

type SectionCardProps = {
  title: string;
  description?: React.ReactNode;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
};

export function SectionCard({
  title,
  description,
  icon: Icon,
  children,
  className = "",
}: SectionCardProps) {
  return (
    <section className={`${sectionCardClassName} ${className}`}>
      <div className="card-body gap-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {Icon && <Icon className="h-5 w-5 text-primary shrink-0" aria-hidden />}
            <h2 className="section-title">{title}</h2>
          </div>
          {description &&
            (typeof description === "string" ? (
              <p className="text-helper">{description}</p>
            ) : (
              <div className="text-helper">{description}</div>
            ))}
        </div>
        {children}
      </div>
    </section>
  );
}
