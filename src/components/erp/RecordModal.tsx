import { useState } from "react";
import { X } from "lucide-react";
import type { Row } from "@/lib/erp/store";

export type Field = {
  key: string;
  label: string;
  type?: "text" | "email" | "tel" | "number" | "date" | "select" | "textarea" | "file";
  options?: string[];
  full?: boolean;
};

export function RecordModal({
  mode,
  title,
  fields,
  row,
  onClose,
  onSubmit,
}: {
  mode: "add" | "edit" | "view";
  title: string;
  fields: Field[];
  row?: Row | undefined;
  onClose: () => void;
  onSubmit: (values: Record<string, any>) => void;
}) {
  const [values, setValues] = useState<Record<string, any>>(() =>
    Object.fromEntries(fields.map((f) => [f.key, row?.[f.key] ?? ""])),
  );
  const readOnly = mode === "view";

  const inputCls =
    "h-11 w-full rounded-[10px] border border-input bg-card px-3 text-[13.5px] outline-none placeholder:text-text-muted focus:border-brand focus:shadow-[0_0_0_3px_rgba(79,32,216,0.08)] disabled:bg-muted";

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-[rgba(10,15,50,0.45)] p-4 py-10 animate-in fade-in duration-150">
      <div className="w-full max-w-[640px] rounded-[16px] border border-border bg-card shadow-[var(--shadow-pop)] animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-[16px] font-semibold">
            {mode === "add" ? "Add" : mode === "edit" ? "Edit" : "View"} — {title}
          </h2>
          <button onClick={onClose} aria-label="Close" className="text-text-muted hover:text-foreground">
            <X className="size-5" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(values);
          }}
        >
          <div className="grid gap-4 p-5 sm:grid-cols-2">
            {fields.map((f) => (
              <div key={f.key} className={f.full || f.type === "textarea" ? "sm:col-span-2" : ""}>
                <label className="mb-1.5 block text-[12.5px] font-medium text-text-secondary">
                  {f.label}
                </label>
                {f.type === "select" ? (
                  <select
                    disabled={readOnly}
                    value={values[f.key] ?? ""}
                    onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                    className={inputCls}
                  >
                    <option value="">Select {f.label}</option>
                    {(f.options ?? []).map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                ) : f.type === "textarea" ? (
                  <textarea
                    disabled={readOnly}
                    rows={3}
                    value={values[f.key] ?? ""}
                    onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                    className={inputCls.replace("h-11", "min-h-[88px] py-2.5")}
                  />
                ) : (
                  <input
                    disabled={readOnly}
                    type={f.type ?? "text"}
                    value={f.type === "file" ? undefined : (values[f.key] ?? "")}
                    onChange={(e) =>
                      setValues((v) => ({
                        ...v,
                        [f.key]: f.type === "file" ? e.target.value.split("\\").pop() : e.target.value,
                      }))
                    }
                    placeholder={`Enter ${f.label.toLowerCase()}`}
                    className={inputCls}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2 border-t border-border px-5 py-4">
            <button
              type="button"
              onClick={onClose}
              className="h-10 rounded-[10px] border border-border bg-card px-4 text-[13px] font-semibold text-text-secondary hover:bg-accent"
            >
              {readOnly ? "Close" : "Cancel"}
            </button>
            {!readOnly && (
              <button
                type="submit"
                className="h-10 rounded-[10px] bg-brand px-4 text-[13px] font-semibold text-white hover:bg-brand-bright"
              >
                Save
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
