import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export function Card({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("erp-card", className)} {...rest}>
      {children}
    </div>
  );
}

export function CardHead({
  title,
  action,
  className,
}: {
  title: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-between px-4 pt-4 pb-3", className)}>
      <h3 className="text-[15px] font-semibold tracking-tight">{title}</h3>
      {action}
    </div>
  );
}

const badgeMap: Record<string, string> = {
  new: "bg-success-soft text-success",
  confirmed: "bg-success-soft text-success",
  completed: "bg-success-soft text-success",
  available: "bg-success-soft text-success",
  active: "bg-success-soft text-success",
  "in progress": "bg-info-soft text-info",
  scheduled: "bg-info-soft text-info",
  booked: "bg-info-soft text-info",
  interested: "bg-brand-soft text-brand",
  hold: "bg-brand-soft text-brand",
  review: "bg-brand-soft text-brand",
  pending: "bg-warning-soft text-warning",
  rescheduled: "bg-warning-soft text-warning",
  "to do": "bg-warning-soft text-warning",
  cancelled: "bg-danger-soft text-danger",
  blocked: "bg-danger-soft text-danger",
  overdue: "bg-danger-soft text-danger",
  sold: "bg-navy/10 text-navy dark:bg-brand-soft dark:text-brand",
};

export function StatusBadge({ value, className }: { value: string; className?: string }) {
  const tone = badgeMap[String(value).toLowerCase()] ?? "bg-brand-soft text-brand";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-[3px] text-[11px] font-semibold whitespace-nowrap",
        tone,
        className,
      )}
    >
      {value}
    </span>
  );
}

export function PageHeader({
  title,
  description,
  breadcrumb,
  actions,
}: {
  title: string;
  description?: string;
  breadcrumb?: string[];
  actions?: ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <nav className="mb-1.5 flex items-center gap-1 text-[12px] text-text-muted">
          <Link to="/" className="hover:text-brand">
            Home
          </Link>
          {(breadcrumb ?? [title]).map((b) => (
            <span key={b} className="flex items-center gap-1">
              <ChevronRight className="size-3" />
              <span className="text-text-secondary">{b}</span>
            </span>
          ))}
        </nav>
        <h1 className="text-[22px] leading-tight font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="mt-1 text-[13px] text-text-secondary">{description}</p>
        )}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function MiniStat({
  label,
  value,
  hint,
  tone = "brand",
  icon: Icon,
}: {
  label: string;
  value: string | number;
  hint?: string;
  tone?: "brand" | "success" | "info" | "warning" | "danger";
  icon?: React.ComponentType<{ className?: string }>;
}) {
  const tones: Record<string, string> = {
    brand: "bg-brand-soft text-brand",
    success: "bg-success-soft text-success",
    info: "bg-info-soft text-info",
    warning: "bg-warning-soft text-warning",
    danger: "bg-danger-soft text-danger",
  };
  return (
    <Card className="flex items-center gap-3 p-4">
      {Icon && (
        <span className={cn("grid size-11 shrink-0 place-items-center rounded-xl", tones[tone])}>
          <Icon className="size-5" />
        </span>
      )}
      <div className="min-w-0">
        <p className="truncate text-[12px] font-medium text-text-secondary">{label}</p>
        <p className="text-[22px] leading-tight font-bold tracking-tight">{value}</p>
        {hint && <p className="text-[11px] font-medium text-success">{hint}</p>}
      </div>
    </Card>
  );
}

export function EmptyState({ label = "No records found" }: { label?: string }) {
  return (
    <div className="py-14 text-center">
      <p className="text-[13px] text-text-muted">{label}</p>
    </div>
  );
}
