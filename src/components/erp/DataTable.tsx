import { useMemo, useState, type ReactNode } from "react";
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import { Card, EmptyState, StatusBadge } from "./ui";
import { cn } from "@/lib/utils";
import type { Row } from "@/lib/erp/store";

export type Column = {
  key: string;
  label: string;
  badge?: boolean;
  render?: (row: Row) => ReactNode;
  className?: string;
};

export function DataTable({
  columns,
  rows,
  onView,
  onEdit,
  onDelete,
  pageSize = 8,
  toolbar,
}: {
  columns: Column[];
  rows: Row[];
  onView?: (row: Row) => void;
  onEdit?: (row: Row) => void;
  onDelete?: (row: Row) => void;
  pageSize?: number;
  toolbar?: ReactNode;
}) {
  const [sort, setSort] = useState<{ key: string; dir: 1 | -1 } | null>(null);
  const [page, setPage] = useState(1);

  const sorted = useMemo(() => {
    if (!sort) return rows;
    return [...rows].sort((a, b) =>
      String(a[sort.key] ?? "").localeCompare(String(b[sort.key] ?? ""), undefined, {
        numeric: true,
      }) * sort.dir,
    );
  }, [rows, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const current = Math.min(page, totalPages);
  const slice = sorted.slice((current - 1) * pageSize, current * pageSize);

  return (
    <Card className="overflow-hidden">
      {toolbar}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse">
          <thead>
            <tr className="bg-muted/70">
              {columns.map((c) => (
                <th
                  key={c.key}
                  onClick={() =>
                    setSort((s) =>
                      s?.key === c.key ? { key: c.key, dir: s.dir === 1 ? -1 : 1 } : { key: c.key, dir: 1 },
                    )
                  }
                  className="cursor-pointer px-4 py-3 text-left text-[12px] font-semibold whitespace-nowrap text-text-secondary select-none"
                >
                  <span className="inline-flex items-center gap-1">
                    {c.label}
                    <ArrowUpDown
                      className={cn(
                        "size-3",
                        sort?.key === c.key ? "text-brand" : "text-text-muted/50",
                      )}
                    />
                  </span>
                </th>
              ))}
              {(onView || onEdit || onDelete) && (
                <th className="px-4 py-3 text-right text-[12px] font-semibold text-text-secondary">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {slice.map((row) => (
              <tr
                key={row.id}
                className="border-b border-[#ECEEF4] transition-colors last:border-0 hover:bg-accent/50 dark:border-border"
              >
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className={cn(
                      "h-[56px] px-4 text-[13.5px] font-medium whitespace-nowrap",
                      c.className,
                    )}
                  >
                    {c.render ? (
                      c.render(row)
                    ) : c.badge ? (
                      <StatusBadge value={String(row[c.key] ?? "")} />
                    ) : (
                      String(row[c.key] ?? "—")
                    )}
                  </td>
                ))}
                {(onView || onEdit || onDelete) && (
                  <td className="px-4 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-1">
                      {onView && (
                        <button
                          onClick={() => onView(row)}
                          aria-label="View"
                          className="grid size-8 place-items-center rounded-lg text-text-secondary hover:bg-info-soft hover:text-info"
                        >
                          <Eye className="size-4" />
                        </button>
                      )}
                      {onEdit && (
                        <button
                          onClick={() => onEdit(row)}
                          aria-label="Edit"
                          className="grid size-8 place-items-center rounded-lg text-text-secondary hover:bg-brand-soft hover:text-brand"
                        >
                          <Pencil className="size-4" />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(row)}
                          aria-label="Delete"
                          className="grid size-8 place-items-center rounded-lg text-text-secondary hover:bg-danger-soft hover:text-danger"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {slice.length === 0 && <EmptyState />}

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border px-4 py-3">
        <p className="text-[12.5px] text-text-secondary">
          Showing {slice.length ? (current - 1) * pageSize + 1 : 0}–
          {(current - 1) * pageSize + slice.length} of {sorted.length} records
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage(Math.max(1, current - 1))}
            disabled={current === 1}
            className="grid size-8 place-items-center rounded-lg border border-border disabled:opacity-40"
            aria-label="Previous page"
          >
            <ChevronLeft className="size-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .slice(Math.max(0, current - 3), Math.max(0, current - 3) + 5)
            .map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={cn(
                  "size-8 rounded-lg border text-[12.5px] font-semibold",
                  p === current
                    ? "border-brand bg-brand text-white"
                    : "border-border text-text-secondary hover:bg-accent",
                )}
              >
                {p}
              </button>
            ))}
          <button
            onClick={() => setPage(Math.min(totalPages, current + 1))}
            disabled={current === totalPages}
            className="grid size-8 place-items-center rounded-lg border border-border disabled:opacity-40"
            aria-label="Next page"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </Card>
  );
}
