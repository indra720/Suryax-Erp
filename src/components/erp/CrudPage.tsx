import { useMemo, useState } from "react";
import { Download, Plus, Printer, Search, Upload } from "lucide-react";
import { toast } from "sonner";
import { PageHeader, Card } from "./ui";
import { DataTable, type Column } from "./DataTable";
import { RecordModal, type Field } from "./RecordModal";
import { ConfirmDialog } from "./ConfirmDialog";
import { exportCsv, useCollection, type Row } from "@/lib/erp/store";

export type CrudConfig = {
  storeKey: string;
  title: string;
  description: string;
  seed: Row[];
  columns: Column[];
  fields: Field[];
  filterKey?: string;
};

export function CrudPage({
  config,
  stats,
  extra,
}: {
  config: CrudConfig;
  stats?: React.ReactNode;
  extra?: React.ReactNode;
}) {
  const { rows, create, update, remove } = useCollection(config.storeKey, config.seed);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [modal, setModal] = useState<{ mode: "add" | "edit" | "view"; row?: Row } | null>(null);
  const [toDelete, setToDelete] = useState<Row | null>(null);

  const filterKey = config.filterKey ?? "status";
  const filterOptions = useMemo(
    () => ["All", ...Array.from(new Set(config.seed.map((r) => String(r[filterKey] ?? ""))))].filter(Boolean),
    [config.seed, filterKey],
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      const matchQ = !q || Object.values(r).some((v) => String(v).toLowerCase().includes(q));
      const matchF = filter === "All" || String(r[filterKey]) === filter;
      return matchQ && matchF;
    });
  }, [rows, query, filter, filterKey]);

  return (
    <>
      <PageHeader
        title={config.title}
        description={config.description}
        actions={
          <>
            <button
              onClick={() => setModal({ mode: "add" })}
              className="inline-flex h-10 items-center gap-1.5 rounded-[10px] bg-brand px-3.5 text-[13px] font-semibold text-white transition-colors hover:bg-brand-bright"
            >
              <Plus className="size-4" /> Add New
            </button>
            <button
              onClick={() => toast.success("Import template downloaded")}
              className="inline-flex h-10 items-center gap-1.5 rounded-[10px] border border-border bg-card px-3.5 text-[13px] font-semibold text-text-secondary hover:bg-accent"
            >
              <Upload className="size-4" /> Import
            </button>
            <button
              onClick={() => {
                exportCsv(config.storeKey, visible, config.columns);
                toast.success("CSV exported");
              }}
              className="inline-flex h-10 items-center gap-1.5 rounded-[10px] border border-border bg-card px-3.5 text-[13px] font-semibold text-text-secondary hover:bg-accent"
            >
              <Download className="size-4" /> Export
            </button>
            <button
              onClick={() => window.print()}
              className="inline-flex h-10 items-center gap-1.5 rounded-[10px] border border-border bg-card px-3.5 text-[13px] font-semibold text-text-secondary hover:bg-accent"
            >
              <Printer className="size-4" /> Print
            </button>
          </>
        }
      />

      {stats}
      {extra}

      <DataTable
        columns={config.columns}
        rows={visible}
        onView={(row) => setModal({ mode: "view", row })}
        onEdit={(row) => setModal({ mode: "edit", row })}
        onDelete={(row) => setToDelete(row)}
        toolbar={
          <div className="flex flex-wrap items-center gap-2 border-b border-border p-4">
            <div className="relative min-w-[220px] flex-1">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-text-muted" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search records..."
                className="h-10 w-full rounded-[10px] border border-input bg-card pr-3 pl-9 text-[13px] outline-none placeholder:text-text-muted focus:border-brand focus:shadow-[0_0_0_3px_rgba(79,32,216,0.08)]"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="h-10 rounded-[10px] border border-input bg-card px-3 text-[13px] font-medium outline-none focus:border-brand"
            >
              {filterOptions.map((o) => (
                <option key={o} value={o}>
                  {o === "All" ? "All Status" : o}
                </option>
              ))}
            </select>
          </div>
        }
      />

      {modal && (
        <RecordModal
          mode={modal.mode}
          title={config.title}
          fields={config.fields}
          row={modal.row}
          onClose={() => setModal(null)}
          onSubmit={(values) => {
            if (modal.mode === "edit" && modal.row) {
              update(modal.row.id, values);
              toast.success("Record updated successfully");
            } else {
              create({ ...values, id: `${config.storeKey.toUpperCase().slice(0, 3)}${Date.now().toString().slice(-5)}` });
              toast.success("Record created successfully");
            }
            setModal(null);
          }}
        />
      )}

      <ConfirmDialog
        open={!!toDelete}
        title="Delete record?"
        description={`This will permanently remove ${toDelete?.id ?? ""} from ${config.title}.`}
        onCancel={() => setToDelete(null)}
        onConfirm={() => {
          if (toDelete) remove(toDelete.id);
          setToDelete(null);
          toast.success("Record deleted");
        }}
      />
    </>
  );
}

export { Card };
