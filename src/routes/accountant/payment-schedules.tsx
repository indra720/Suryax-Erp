import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  CalendarDays,
  Search,
  Filter,
  Download,
  CheckCircle,
  Clock,
  ArrowRight,
} from "lucide-react";
import { initialPaymentSchedules, type PaymentScheduleItem } from "@/lib/services/accountant";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const Route = createFileRoute("/accountant/payment-schedules")({
  head: () => ({
    meta: [
      { title: "Installment & Payment Schedules | Vrindavan Accounts" },
      { name: "description", content: "Construction linked payment milestones and installment tracking." },
    ],
  }),
  component: PaymentSchedulesPage,
});

export function PaymentSchedulesPage() {
  const [schedules] = useState<PaymentScheduleItem[]>(initialPaymentSchedules);
  const [search, setSearch] = useState("");

  const filtered = schedules.filter(
    (s) =>
      s.clientName.toLowerCase().includes(search.toLowerCase()) ||
      s.unitNo.toLowerCase().includes(search.toLowerCase()) ||
      s.milestone.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
              <CalendarDays className="size-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Installment & Payment Schedules (CLP Plans)
            </h1>
          </div>
          <p className="mt-1 text-xs text-text-secondary">
            Buyer-wise construction linked payment milestones, percentage completions, and scheduled due dates.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => toast.success("Exported Payment Schedules (CSV)")}
          className="h-9 gap-1.5 text-xs"
        >
          <Download className="size-3.5" /> Export Schedule (CSV)
        </Button>
      </div>

      <Card className="p-5 bg-card border border-border shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-border/60">
          <h2 className="text-sm font-semibold text-foreground">Milestones Installment Ledger</h2>
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 size-4 text-text-muted" />
            <Input
              placeholder="Search buyer, unit or milestone..."
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
                <th className="py-2.5 px-3 font-semibold">Milestone Stage</th>
                <th className="py-2.5 px-3 font-semibold">Share %</th>
                <th className="py-2.5 px-3 font-semibold">Due Amount</th>
                <th className="py-2.5 px-3 font-semibold">Paid Amount</th>
                <th className="py-2.5 px-3 font-semibold">Due Date</th>
                <th className="py-2.5 px-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-foreground font-medium">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-muted/40 transition-colors">
                  <td className="py-2.5 px-3 font-semibold text-foreground">{s.clientName}</td>
                  <td className="py-2.5 px-3 text-text-secondary">
                    <span>{s.unitNo}</span> - <span className="text-text-muted">{s.project}</span>
                  </td>
                  <td className="py-2.5 px-3 font-medium text-foreground">{s.milestone}</td>
                  <td className="py-2.5 px-3 font-bold text-brand">{s.percentage}%</td>
                  <td className="py-2.5 px-3 font-bold text-foreground">₹{s.dueAmount.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-bold">₹{s.paidAmount.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-text-muted">{s.dueDate}</td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-[10.5px] font-semibold ${
                        s.status === "Completed"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : s.status === "Pending"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-blue-50 text-blue-700 border border-blue-200"
                      }`}
                    >
                      {s.status}
                    </span>
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
