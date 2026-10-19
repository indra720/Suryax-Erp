import React, { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CalendarDays,
  IndianRupee,
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { customerService, type PaymentScheduleItem } from "@/lib/services/customer";
import { toast } from "sonner";

export const Route = createFileRoute("/customer/schedule")({
  head: () => ({
    meta: [
      { title: "Payment Schedule & Demands | Vrindavan Customer" },
      { name: "description", content: "Construction linked installment milestones and official demand letter receipts." },
    ],
  }),
  component: CustomerSchedulePage,
});

export function CustomerSchedulePage() {
  const [schedule] = useState<PaymentScheduleItem[]>(customerService.getSchedule());

  const downloadReceipt = (rec: string) => {
    toast.success(`Official Payment Receipt ${rec} downloaded!`);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
              <CalendarDays className="size-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Payment Schedule & Demand Letters
            </h1>
          </div>
          <p className="mt-1 text-xs text-text-secondary">
            Milestone-based payment plan linked with verified civil structural progress.
          </p>
        </div>

        <Link to="/customer/pay-online">
          <Button size="sm" className="h-9 gap-1.5 text-xs bg-brand text-white shadow-sm">
            <IndianRupee className="size-3.5" /> Pay Due Installment
          </Button>
        </Link>
      </div>

      <Card className="bg-card border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-muted/50 border-b border-border text-text-secondary font-semibold">
              <tr>
                <th className="py-3 px-4">Milestone Stage</th>
                <th className="py-3 px-4">Share (%)</th>
                <th className="py-3 px-4">Amount (INR)</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Payment Details</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {schedule.map((s) => (
                <tr key={s.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-foreground">{s.milestoneName}</td>
                  <td className="py-3.5 px-4 font-semibold text-brand">{s.stagePercentage}%</td>
                  <td className="py-3.5 px-4 font-bold text-foreground">
                    ₹{s.amountDue.toLocaleString("en-IN")}
                  </td>
                  <td className="py-3.5 px-4 text-text-secondary">{s.dueDate}</td>
                  <td className="py-3.5 px-4 text-text-secondary">
                    {s.paymentMode ? (
                      <div>
                        <span className="block font-medium text-foreground">{s.paymentMode}</span>
                        <span className="font-mono text-[10px] text-text-muted">{s.transactionRef}</span>
                      </div>
                    ) : (
                      <span className="text-[11px] text-text-muted italic">Awaiting clearance</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        s.status === "Paid"
                          ? "bg-emerald-500/10 text-emerald-600"
                          : s.status === "Due Now"
                          ? "bg-rose-500/10 text-rose-600"
                          : "bg-muted text-text-muted"
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {s.receiptNumber && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => downloadReceipt(s.receiptNumber!)}
                        className="h-7 px-2 text-[11px] gap-1"
                      >
                        <Download className="size-3" /> Receipt
                      </Button>
                    )}
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
