import { useState } from "react";
import { toast } from "sonner";
import { Card, PageHeader, StatusBadge } from "@/components/erp/ui";

const seed = [
  { id: "1", title: "New lead assigned", desc: "Rahul Sharma • Suryax Greens", time: "2m ago", status: "New" },
  { id: "2", title: "Payment received", desc: "₹12.50 Lakh • BK1024", time: "1h ago", status: "Confirmed" },
  { id: "3", title: "Site visit scheduled", desc: "Royal Residency • 11:30 AM", time: "3h ago", status: "Scheduled" },
  { id: "4", title: "Invoice overdue", desc: "INV-2026-104 • ₹5.25 Lakh", time: "1d ago", status: "Pending" },
  { id: "5", title: "Booking cancelled", desc: "BK1027 • Sunrise Villas", time: "2d ago", status: "Cancelled" },
];

export function NotificationsPage() {
  const [items, setItems] = useState(seed);

  return (
    <>
      <PageHeader
        title="Notifications"
        description="All system notifications and activity log."
        breadcrumb={["Notifications"]}
        actions={
          <button
            onClick={() => {
              setItems([]);
              toast.success("All notifications cleared");
            }}
            className="h-10 rounded-[10px] border border-border bg-card px-3.5 text-[13px] font-semibold text-text-secondary hover:bg-accent"
          >
            Clear All
          </button>
        }
      />
      <Card>
        <ul className="p-4">
          {items.map((n) => (
            <li key={n.id} className="flex items-center gap-3 border-b border-border py-3 last:border-0">
              <div className="min-w-0">
                <p className="text-[13.5px] font-semibold">{n.title}</p>
                <p className="text-[12px] text-text-muted">
                  {n.desc} • {n.time}
                </p>
              </div>
              <span className="ml-auto flex items-center gap-2">
                <StatusBadge value={n.status} />
                <button
                  onClick={() => setItems((s) => s.filter((i) => i.id !== n.id))}
                  className="text-[12px] font-semibold text-brand"
                >
                  Dismiss
                </button>
              </span>
            </li>
          ))}
          {items.length === 0 && <p className="py-10 text-center text-[13px] text-text-muted">You're all caught up</p>}
        </ul>
      </Card>
    </>
  );
}
