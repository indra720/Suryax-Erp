import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  RotateCcw,
  Search,
  Download,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const Route = createFileRoute("/accountant/refunds")({
  head: () => ({
    meta: [
      { title: "Refunds & Booking Cancellations | Vrindavan Accounts" },
      { name: "description", content: "Unit cancellation ledger, forfeiture deductions and refund disbursements." },
    ],
  }),
  component: RefundsPage,
});

export function RefundsPage() {
  const [refunds, setRefunds] = useState([
    { id: "REF-01", bookingId: "BK-VH-1029", clientName: "Praveen Tiwari", unitNo: "B-204 (2 BHK)", project: "Vrindavan Heights", totalPaid: 850000, deductionAmount: 85000, netRefundAmount: 765000, requestDate: "2026-04-02", status: "Approved" },
    { id: "REF-02", bookingId: "BK-GV-2019", clientName: "Harishankar Shukla", unitNo: "Plot-12", project: "Radha Govind City", totalPaid: 350000, deductionAmount: 35000, netRefundAmount: 315000, requestDate: "2026-04-08", status: "Processing" },
  ]);

  const handleProcessRefund = (id: string) => {
    setRefunds(
      refunds.map((r) => (r.id === id ? { ...r, status: "Completed" } : r))
    );
    toast.success("Refund amount dispatched to buyer's verified bank account!");
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
              <RotateCcw className="size-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Refunds & Booking Cancellations
            </h1>
          </div>
          <p className="mt-1 text-xs text-text-secondary">
            Process buyer cancellation requests, enforce statutory earnest money deductions, and issue settlement credits.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => toast.success("Exporting Cancellation Register...")}
          className="h-9 gap-1.5 text-xs"
        >
          <Download className="size-3.5" /> Export Ledger (CSV)
        </Button>
      </div>

      <Card className="p-5 bg-card border border-border shadow-sm">
        <h2 className="text-sm font-semibold text-foreground mb-4">Cancellation Settlement Register</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-muted/60 text-text-secondary uppercase tracking-wider text-[11px] border-b border-border">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Booking Ref</th>
                <th className="py-2.5 px-3 font-semibold">Buyer Name</th>
                <th className="py-2.5 px-3 font-semibold">Unit & Project</th>
                <th className="py-2.5 px-3 font-semibold">Total Paid</th>
                <th className="py-2.5 px-3 font-semibold">Statutory Deduction</th>
                <th className="py-2.5 px-3 font-semibold">Net Refund Amount</th>
                <th className="py-2.5 px-3 font-semibold">Request Date</th>
                <th className="py-2.5 px-3 font-semibold">Status</th>
                <th className="py-2.5 px-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-foreground font-medium">
              {refunds.map((r) => (
                <tr key={r.id} className="hover:bg-muted/40 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-brand">{r.bookingId}</td>
                  <td className="py-2.5 px-3 font-semibold text-foreground">{r.clientName}</td>
                  <td className="py-2.5 px-3 text-text-secondary">
                    <span>{r.unitNo}</span> - <span className="text-text-muted">{r.project}</span>
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-foreground">₹{r.totalPaid.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-rose-600 font-semibold">-₹{r.deductionAmount.toLocaleString()}</td>
                  <td className="py-2.5 px-3 font-bold text-emerald-600 text-sm">₹{r.netRefundAmount.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-text-muted">{r.requestDate}</td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-[10.5px] font-semibold ${
                        r.status === "Completed"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    {r.status !== "Completed" && (
                      <Button
                        size="sm"
                        onClick={() => handleProcessRefund(r.id)}
                        className="h-7 text-xs bg-brand text-white shadow-sm"
                      >
                        Disburse
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
