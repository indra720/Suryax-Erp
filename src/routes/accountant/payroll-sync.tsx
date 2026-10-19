import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Users,
  RefreshCw,
  Download,
  CheckCircle,
  IndianRupee,
  ShieldCheck,
} from "lucide-react";
import { initialPayrollSync, type PayrollSyncItem } from "@/lib/services/accountant";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/accountant/payroll-sync")({
  head: () => ({
    meta: [
      { title: "Payroll & Salary Sync | Vrindavan Accounts" },
      { name: "description", content: "HRMS attendance synchronized salary disbursement and TDS deductions." },
    ],
  }),
  component: PayrollSyncPage,
});

export function PayrollSyncPage() {
  const [payroll, setPayroll] = useState<PayrollSyncItem[]>(initialPayrollSync);

  const handleSync = () => {
    toast.success("Synchronized with HR Attendance & Biometric Face Punches!");
  };

  const handleDisburseAll = () => {
    setPayroll(payroll.map((p) => ({ ...p, status: "Disbursed" })));
    toast.success("Bank salary transfer batch file processed via Corporate NetBanking!");
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
              <Users className="size-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              HR Payroll & Salary Disbursals
            </h1>
          </div>
          <p className="mt-1 text-xs text-text-secondary">
            Bi-directional sync between HR attendance punches, telecaller sales incentives and accountant bank disbursement batches.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSync}
            className="h-9 gap-1.5 text-xs"
          >
            <RefreshCw className="size-3.5" /> Sync from HRMS
          </Button>
          <Button
            size="sm"
            onClick={handleDisburseAll}
            className="h-9 gap-1.5 text-xs bg-brand text-white shadow-sm"
          >
            <ShieldCheck className="size-3.5" /> Process Bank Batch
          </Button>
        </div>
      </div>

      <Card className="p-5 bg-card border border-border shadow-sm">
        <h2 className="text-sm font-semibold text-foreground mb-4">Verified Monthly Payroll Batch</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-muted/60 text-text-secondary uppercase tracking-wider text-[11px] border-b border-border">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Emp ID</th>
                <th className="py-2.5 px-3 font-semibold">Employee Name</th>
                <th className="py-2.5 px-3 font-semibold">Department</th>
                <th className="py-2.5 px-3 font-semibold">Salary Month</th>
                <th className="py-2.5 px-3 font-semibold">Gross Salary</th>
                <th className="py-2.5 px-3 font-semibold">Sales Incentives</th>
                <th className="py-2.5 px-3 font-semibold">TDS/Deductions</th>
                <th className="py-2.5 px-3 font-semibold">Net Disbursable</th>
                <th className="py-2.5 px-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-foreground font-medium">
              {payroll.map((p) => (
                <tr key={p.id} className="hover:bg-muted/40 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-brand">{p.employeeId}</td>
                  <td className="py-2.5 px-3">
                    <span className="font-bold text-foreground block">{p.name}</span>
                    <span className="text-[10px] text-text-muted">{p.role}</span>
                  </td>
                  <td className="py-2.5 px-3 text-text-secondary">{p.department}</td>
                  <td className="py-2.5 px-3 text-text-muted">{p.month}</td>
                  <td className="py-2.5 px-3">₹{p.grossSalary.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-semibold">+₹{p.incentives.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-rose-600 font-semibold">-₹{p.deductions.toLocaleString()}</td>
                  <td className="py-2.5 px-3 font-bold text-brand text-sm">₹{p.netPayable.toLocaleString()}</td>
                  <td className="py-2.5 px-3">
                    <span className="inline-flex px-2 py-0.5 rounded-full text-[10.5px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {p.status}
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
