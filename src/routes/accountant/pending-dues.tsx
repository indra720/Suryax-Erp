import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Clock,
  Search,
  Download,
  AlertTriangle,
  Send,
  Phone,
  Calendar,
  CheckCircle,
} from "lucide-react";
import { initialPendingDues, type PendingDue } from "@/lib/services/accountant";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const Route = createFileRoute("/accountant/pending-dues")({
  head: () => ({
    meta: [
      { title: "Pending & Overdue Receivables | Vrindavan Accounts" },
      { name: "description", content: "Overdue installment aging and automated payment reminder dispatch." },
    ],
  }),
  component: PendingDuesPage,
});

export function PendingDuesPage() {
  const [dues, setDues] = useState<PendingDue[]>(initialPendingDues);
  const [search, setSearch] = useState("");

  const filtered = dues.filter(
    (d) =>
      d.clientName.toLowerCase().includes(search.toLowerCase()) ||
      d.unitNo.toLowerCase().includes(search.toLowerCase()) ||
      d.phone.includes(search)
  );

  const handleSendReminder = (name: string, phone: string) => {
    toast.success(`Automated Payment Reminder & Tax Invoice dispatched to ${name} (${phone})`);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
              <Clock className="size-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Pending & Overdue Receivables
            </h1>
          </div>
          <p className="mt-1 text-xs text-text-secondary">
            Monitor delinquent buyer accounts, aging slabs and trigger instant WhatsApp/SMS demand reminders.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => toast.success("Exporting Overdue Aging Report...")}
          className="h-9 gap-1.5 text-xs"
        >
          <Download className="size-3.5" /> Export Overdue Aging (CSV)
        </Button>
      </div>

      <Card className="p-5 bg-card border border-border shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-border/60">
          <h2 className="text-sm font-semibold text-foreground">Delinquent Account Reminders</h2>
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 size-4 text-text-muted" />
            <Input
              placeholder="Search by buyer, phone or unit..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-8 text-xs"
            />
          </div>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-xs text-left">
            <thead className="bg-muted/60 text-text-secondary uppercase tracking-wider text-[11px] border-b border-border">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Buyer Name</th>
                <th className="py-2.5 px-3 font-semibold">Unit & Project</th>
                <th className="py-2.5 px-3 font-semibold">Amount Overdue</th>
                <th className="py-2.5 px-3 font-semibold">Scheduled Due Date</th>
                <th className="py-2.5 px-3 font-semibold">Days Overdue</th>
                <th className="py-2.5 px-3 font-semibold">Last Reminder</th>
                <th className="py-2.5 px-3 font-semibold">Severity</th>
                <th className="py-2.5 px-3 font-semibold text-right">Send Notice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-foreground font-medium">
              {filtered.map((d) => (
                <tr key={d.id} className="hover:bg-muted/40 transition-colors">
                  <td className="py-2.5 px-3">
                    <span className="font-bold text-foreground block">{d.clientName}</span>
                    <span className="text-[10.5px] text-text-muted flex items-center gap-1">
                      <Phone className="size-3 text-brand" /> {d.phone}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-text-secondary">
                    <span className="font-semibold block">{d.unitNo}</span>
                    <span className="text-[10px] text-text-muted">{d.project}</span>
                  </td>
                  <td className="py-2.5 px-3 font-bold text-rose-600 text-sm">
                    ₹{d.amountDue.toLocaleString()}
                  </td>
                  <td className="py-2.5 px-3 text-text-muted">{d.dueDate}</td>
                  <td className="py-2.5 px-3 font-bold text-rose-700">{d.daysOverdue} Days</td>
                  <td className="py-2.5 px-3 text-text-secondary">{d.lastReminderDate}</td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-[10.5px] font-semibold ${
                        d.status === "Critical"
                          ? "bg-rose-50 text-rose-700 border border-rose-200"
                          : d.status === "Warning"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-blue-50 text-blue-700 border border-blue-200"
                      }`}
                    >
                      {d.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <Button
                      size="sm"
                      onClick={() => handleSendReminder(d.clientName, d.phone)}
                      className="h-7 text-xs gap-1 bg-brand text-white shadow-sm"
                    >
                      <Send className="size-3" /> Remind
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
