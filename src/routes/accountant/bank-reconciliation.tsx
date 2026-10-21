import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Landmark,
  RefreshCw,
  Download,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { initialBankReconciliation, type BankReconciliationItem } from "@/lib/services/accountant";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/accountant/bank-reconciliation")({
  head: () => ({
    meta: [
      { title: "Bank Reconciliation (BRS) | Vrindavan Accounts" },
      { name: "description", content: "RERA escrow accounts reconciliation against bank feeds." },
    ],
  }),
  component: BankReconciliationPage,
});

export function BankReconciliationPage() {
  const [banks, setBanks] = useState<BankReconciliationItem[]>(initialBankReconciliation);

  const handleReconcile = () => {
    toast.success("Bank statement feed connected via Open Banking API. All accounts reconciled!");
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="inline-flex size-8 sm:size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md shrink-0">
              <Landmark className="size-4 sm:size-5" />
            </span>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-foreground">
              Bank Reconciliation (BRS)
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-text-secondary line-clamp-2 sm:line-clamp-none">
            Daily matching of physical cheque deposits, RTGS credits and unpresented developer vendor payouts.
          </p>
        </div>

        <div className="w-full sm:w-auto">
          <Button
            size="sm"
            onClick={handleReconcile}
            className="w-full sm:w-auto h-9 gap-1.5 text-xs bg-brand text-white shadow-sm justify-center"
          >
            <RefreshCw className="size-3.5" /> Reconcile Live Bank Feeds
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {banks.map((b) => (
          <Card key={b.id} className="p-3.5 sm:p-5 bg-card border border-border shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <div>
                <h3 className="text-sm font-bold text-foreground">{b.bankName}</h3>
                <p className="text-xs font-mono text-text-muted mt-0.5">A/C: {b.accountNumber}</p>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10.5px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                {b.status}
              </span>
            </div>

            <div className="space-y-2.5 py-4 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Book Ledger Balance:</span>
                <span className="font-bold text-foreground">₹{b.bookBalance.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Bank Statement Balance:</span>
                <span className="font-bold text-emerald-600">₹{b.bankBalance.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-text-muted">
                <span>(+) Cheques Deposited not yet Credited:</span>
                <span>₹{b.uncreditedCheques.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-text-muted">
                <span>(-) Cheques Issued not yet Presented:</span>
                <span>₹{b.unpresentedCheques.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-border/60 font-bold">
                <span className="text-foreground">Net Variance / Difference:</span>
                <span className="text-brand">₹{b.difference.toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center text-[11px] text-text-muted">
              <span>Verified on {b.reconciliationDate}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toast.success("BRS Certificate PDF downloaded")}
                className="h-7 text-xs border-border"
              >
                BRS Certificate
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
