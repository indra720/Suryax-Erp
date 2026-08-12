export function ConfirmDialog({
  open,
  title,
  description,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  title: string;
  description?: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-[rgba(10,15,50,0.45)] p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-[440px] rounded-[16px] border border-border bg-card p-5 shadow-[var(--shadow-pop)] animate-in zoom-in-95 duration-150">
        <h3 className="text-[16px] font-semibold">{title}</h3>
        {description && <p className="mt-1.5 text-[13px] text-text-secondary">{description}</p>}
        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="h-10 rounded-[10px] border border-border bg-card px-4 text-[13px] font-semibold text-text-secondary hover:bg-accent"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="h-10 rounded-[10px] bg-danger px-4 text-[13px] font-semibold text-white hover:opacity-90"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
