import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ShieldCheck,
  Search,
  Download,
  Clock,
  User,
  Filter,
} from "lucide-react";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const Route = createFileRoute("/accountant/audit-logs")({
  head: () => ({
    meta: [
      { title: "Financial Audit Logs | Vrindavan Accounts" },
      { name: "description", content: "Statutory RERA and financial audit trail of ledger modifications." },
    ],
  }),
  component: AuditLogsPage,
});

export function AuditLogsPage() {
  const [logs] = useState([
    { id: "LOG-901", timestamp: "2026-04-18 16:42:10", user: "Sunil Agnihotri (Accountant)", action: "Payment Receipt Generated", module: "Booking Payments", details: "Recorded ₹7,50,000 for Unit A-1204 (RCPT-2026-089)", ip: "192.168.1.45" },
    { id: "LOG-902", timestamp: "2026-04-18 14:10:05", user: "Sunil Agnihotri (Accountant)", action: "BRS Reconciliation Verified", module: "Bank Reconciliation", details: "Matched HDFC Escrow statement balance ₹4.32 Cr", ip: "192.168.1.45" },
    { id: "LOG-903", timestamp: "2026-04-17 11:32:44", user: "Vikram Rathore (Director)", action: "Commission Payout Authorized", module: "Brokerage", details: "Approved ₹2,40,000 to Key Stone Property Hub", ip: "192.168.1.10" },
    { id: "LOG-904", timestamp: "2026-04-16 17:15:20", user: "Sunil Agnihotri (Accountant)", action: "Vendor Voucher Approved", module: "Expenses", details: "Cleared UltraTech Cement bill ₹8,50,000", ip: "192.168.1.45" },
  ]);

  const [search, setSearch] = useState("");

  const filtered = logs.filter(
    (l) =>
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.details.toLowerCase().includes(search.toLowerCase()) ||
      l.user.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="inline-flex size-8 sm:size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md shrink-0">
              <ShieldCheck className="size-4 sm:size-5" />
            </span>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-foreground">
              Financial Audit Logs
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-text-secondary line-clamp-2 sm:line-clamp-none">
            Tamper-evident audit trail of all journal entries, payment approvals, cancellations and bank reconciliations.
          </p>
        </div>

        <div className="w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.success("Exporting Audit Log Archive (CSV)...")}
            className="w-full sm:w-auto h-9 gap-1.5 text-xs border-border justify-center"
          >
            <Download className="size-3.5" /> Export Audit Trail (CSV)
          </Button>
        </div>
      </div>

      <Card className="p-3.5 sm:p-5 bg-card border border-border shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-border/60 gap-2.5">
          <div className="flex items-center justify-between">
            <h2 className="text-xs sm:text-sm font-semibold text-foreground">Activity Log Stream</h2>
            <span className="text-[10px] sm:hidden text-text-muted flex items-center gap-1 font-normal">Swipe horizontally →</span>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 size-4 text-text-muted" />
            <Input
              placeholder="Search audit trail..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-8.5 text-xs"
            />
          </div>
        </div>

        <div className="overflow-x-auto mt-3 -mx-3.5 px-3.5 sm:mx-0 sm:px-0">
          <table className="w-full text-xs text-left min-w-[850px] whitespace-nowrap">
            <thead className="bg-muted/60 text-text-secondary uppercase tracking-wider text-[11px] border-b border-border">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Timestamp</th>
                <th className="py-2.5 px-3 font-semibold">User</th>
                <th className="py-2.5 px-3 font-semibold">Action</th>
                <th className="py-2.5 px-3 font-semibold">Module</th>
                <th className="py-2.5 px-3 font-semibold">Audit Details</th>
                <th className="py-2.5 px-3 font-semibold">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-foreground font-medium">
              {filtered.map((l) => (
                <tr key={l.id} className="hover:bg-muted/40 transition-colors">
                  <td className="py-2.5 px-3 text-text-muted whitespace-nowrap">{l.timestamp}</td>
                  <td className="py-2.5 px-3 font-bold text-foreground">{l.user}</td>
                  <td className="py-2.5 px-3">
                    <span className="inline-flex px-2 py-0.5 rounded text-[11px] font-semibold bg-brand/10 text-brand">
                      {l.action}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-text-secondary">{l.module}</td>
                  <td className="py-2.5 px-3 text-foreground">{l.details}</td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-text-muted">{l.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
