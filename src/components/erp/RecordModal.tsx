import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import type { Row } from "@/lib/erp/store";

export type Field = {
  key: string;
  label?: string;
  title?: string;
  type?:
    | "text"
    | "email"
    | "tel"
    | "number"
    | "date"
    | "datetime-local"
    | "checkbox"
    | "password"
    | "select"
    | "textarea"
    | "file";
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
    "h-11 w-full rounded-xl border border-input bg-background/50 px-3.5 text-sm outline-none placeholder:text-text-muted focus:border-brand focus:bg-background focus:ring-2 focus:ring-brand/20 transition-all disabled:bg-muted";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/60 backdrop-blur-xs p-4 py-8 animate-in fade-in duration-150">
      <div className="w-full max-w-[640px] md:max-w-3xl lg:max-w-4xl xl:max-w-5xl rounded-[20px] border border-border bg-card shadow-2xl animate-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-6 py-4 shrink-0 bg-card">
          <h2 className="text-lg font-bold text-foreground">
            {mode === "add" ? "Add New" : mode === "edit" ? "Edit" : "View Details"} — {title}
          </h2>
          <button onClick={onClose} aria-label="Close" className="p-1 rounded-lg text-text-muted hover:text-foreground hover:bg-muted/60 transition-colors">
            <X className="size-5" />
          </button>
        </div>

        <form
          className="flex flex-col flex-1 overflow-hidden"
          onSubmit={(e) => {
            e.preventDefault();
            for (const f of fields) {
              if (f.type === "tel" && values[f.key]) {
                const clean = String(values[f.key]).replace(/\D/g, "");
                if (clean.length !== 10) {
                  toast.error(`${f.label || f.title || "Mobile number"} must be exactly 10 digits.`);
                  return;
                }
              }
            }
            onSubmit(values);
          }}
        >
          <div className="grid gap-4 sm:gap-5 p-6 sm:p-7 sm:grid-cols-2 lg:grid-cols-3 overflow-y-auto max-h-[calc(90vh-140px)] pr-2">
            {fields.map((f) => {
              const fieldLabel = f.label || f.title || f.key;
              return (
                <div key={f.key} className={f.full || f.type === "textarea" ? "sm:col-span-2 lg:col-span-3" : ""}>
                  <label className="mb-1.5 block text-xs sm:text-[13px] font-semibold text-text-secondary">
                    {fieldLabel}
                  </label>
                  {f.type === "select" ? (
                    <select
                      disabled={readOnly}
                      value={values[f.key] ?? ""}
                      onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                      className={inputCls}
                    >
                      <option value="">Select {fieldLabel}</option>
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
                      className={inputCls.replace("h-11", "min-h-[96px] py-2.5")}
                    />
                  ) : f.type === "checkbox" ? (
                    <div className="flex items-center gap-2 pt-2">
                      <input
                        disabled={readOnly}
                        type="checkbox"
                        checked={Boolean(values[f.key])}
                        onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.checked }))}
                        className="size-4 rounded border-border text-brand"
                      />
                      <span className="text-sm text-text-muted">{fieldLabel}</span>
                    </div>
                  ) : f.type === "tel" ? (
                    <input
                      disabled={readOnly}
                      type="tel"
                      maxLength={10}
                      value={values[f.key] ?? ""}
                      onChange={(e) =>
                        setValues((v) => ({
                          ...v,
                          [f.key]: e.target.value.replace(/\D/g, "").slice(0, 10),
                        }))
                      }
                      placeholder="10-digit mobile number"
                      className={inputCls}
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
                      placeholder={`Enter ${fieldLabel.toLowerCase()}`}
                      className={inputCls}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-border px-6 py-4 shrink-0 bg-muted/20">
            <button
              type="button"
              onClick={onClose}
              className="h-11 rounded-xl border border-border bg-card px-5 text-sm font-semibold text-text-secondary hover:bg-accent transition-colors"
            >
              {readOnly ? "Close" : "Cancel"}
            </button>
            {!readOnly && (
              <button
                type="submit"
                className="h-11 rounded-xl bg-brand hover:bg-brand/90 px-6 text-sm font-semibold text-white shadow-md transition-colors"
              >
                Save Changes
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
