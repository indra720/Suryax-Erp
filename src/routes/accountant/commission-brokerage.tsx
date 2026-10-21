import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  IndianRupee,
  Search,
  Download,
  CheckCircle,
  Clock,
  Briefcase,
  Users,
} from "lucide-react";
import { initialBrokerCommissions, type BrokerCommission } from "@/lib/services/accountant";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const Route = createFileRoute("/accountant/commission-brokerage")({
  head: () => ({
    meta: [
      { title: "Commission & Brokerage | Vrindavan Accounts" },
      { name: "description", content: "Channel partner commission calculation and payout approvals." },
    ],
  }),
  component: CommissionBrokeragePage,
});

export function CommissionBrokeragePage() {
  const [commissions, setCommissions] = useState<BrokerCommission[]>(initialBrokerCommissions);
  const [search, setSearch] = useState("");

  const filtered = commissions.filter(
    (c) =>
      c.brokerName.toLowerCase().includes(search.toLowerCase()) ||
      c.agency.toLowerCase().includes(search.toLowerCase()) ||
      c.bookingRef.toLowerCase().includes(search.toLowerCase())
  );

  const handleApprove = (id: string) => {
    setCommissions(
      commissions.map((c) => (c.id === id ? { ...c, status: "Paid", paidAmount: c.commissionAmount, balancePayable: 0 } : c))
    );
    toast.success("Brokerage payout authorized and disbursed via Escrow account!");
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="inline-flex size-8 sm:size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md shrink-0">
              <IndianRupee className="size-4 sm:size-5" />
            </span>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-foreground">
              Commission & Brokerage Disbursals
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-text-secondary line-clamp-2 sm:line-clamp-none">
            Authorized channel partner commission settlements, milestone slabs and RERA broker compliance.
          </p>
        </div>

        <div className="w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.success("Exporting Commission Ledger...")}
            className="w-full sm:w-auto h-9 gap-1.5 text-xs border-border justify-center"
          >
            <Download className="size-3.5" /> Export Payout Register (CSV)
          </Button>
        </div>
      </div>

      <Card className="p-3.5 sm:p-5 bg-card border border-border shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-border/60 gap-2.5">
          <div className="flex items-center justify-between">
            <h2 className="text-xs sm:text-sm font-semibold text-foreground">Broker Commission Settlements</h2>
            <span className="text-[10px] sm:hidden text-text-muted flex items-center gap-1 font-normal">Swipe horizontally →</span>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 size-4 text-text-muted" />
            <Input
              placeholder="Search broker, agency or booking ref..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-8.5 text-xs"
            />
          </div>
        </div>

        <div className="overflow-x-auto mt-3 -mx-3.5 px-3.5 sm:mx-0 sm:px-0">
          <table className="w-full text-xs sm:text-sm text-left min-w-[950px] whitespace-nowrap">
            <thead className="bg-muted/60 text-text-secondary uppercase tracking-wider text-[11px] border-b border-border">
              <tr>
                <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">Broker & Agency</th>
                <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">Booking Ref</th>
                <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">Unit Sold</th>
                <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">Deal Value</th>
                <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">Rate %</th>
                <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">Total Commission</th>
                <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">Paid</th>
                <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">Balance</th>
                <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">Status</th>
                <th className="py-2.5 px-3.5 font-semibold text-right whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-foreground font-medium">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-muted/40 transition-colors">
                  <td className="py-3 px-3.5 whitespace-nowrap">
                    <span className="font-bold text-foreground block">{c.brokerName}</span>
                    <span className="text-[10px] text-text-muted">{c.agency}</span>
                  </td>
                  <td className="py-3 px-3.5 font-mono text-brand font-semibold whitespace-nowrap">{c.bookingRef}</td>
                  <td className="py-3 px-3.5 text-text-secondary whitespace-nowrap">
                    <span>{c.unitNo}</span> - <span className="text-text-muted">{c.project}</span>
                  </td>
                  <td className="py-3 px-3.5 whitespace-nowrap">₹{c.bookingValue.toLocaleString()}</td>
                  <td className="py-3 px-3.5 font-bold text-brand whitespace-nowrap">{c.commissionPercentage}%</td>
                  <td className="py-3 px-3.5 font-bold text-foreground whitespace-nowrap">₹{c.commissionAmount.toLocaleString()}</td>
                  <td className="py-3 px-3.5 text-emerald-600 font-semibold whitespace-nowrap">₹{c.paidAmount.toLocaleString()}</td>
                  <td className="py-3 px-3.5 font-bold text-rose-600 whitespace-nowrap">₹{c.balancePayable.toLocaleString()}</td>
                  <td className="py-3 px-3.5 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-[10.5px] font-semibold ${
                        c.status === "Paid"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : c.status === "Approved"
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3 px-3.5 text-right whitespace-nowrap">
                    {c.status !== "Paid" && (
                      <Button
                        size="sm"
                        onClick={() => handleApprove(c.id)}
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
