import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Wallet,
  IndianRupee,
  ArrowUpRight,
  Download,
  CheckCircle,
  Clock,
  Sparkles,
  CreditCard,
  Building,
} from "lucide-react";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { brokerService, type CommissionTransaction } from "@/lib/services/broker";
import { toast } from "sonner";

export const Route = createFileRoute("/broker/wallet")({
  head: () => ({
    meta: [
      { title: "Commission Wallet & Payouts | Vrindavan Channel Partner" },
      { name: "description", content: "Instant brokerage withdrawals, TDS ledger, and deal commission credits." },
    ],
  }),
  component: BrokerWalletPage,
});

export function BrokerWalletPage() {
  const [kpis] = useState(brokerService.getKpi());
  const [transactions, setTransactions] = useState<CommissionTransaction[]>(brokerService.getTransactions());
  const [modalOpen, setModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(kpis.walletAvailableBalance);

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    if (withdrawAmount <= 0 || withdrawAmount > kpis.walletAvailableBalance) {
      toast.error("Invalid withdrawal amount");
      return;
    }
    toast.success(`Withdrawal request of ₹${withdrawAmount.toLocaleString("en-IN")} submitted! Crediting to registered HDFC bank account within 24 hours.`);
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
              <Wallet className="size-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Commission Wallet & Ledger
            </h1>
          </div>
          <p className="mt-1 text-xs text-text-secondary">
            Verified deal commissions, 5% TDS deductions, and bank withdrawal requests.
          </p>
        </div>

        <Button
          onClick={() => setModalOpen(true)}
          size="sm"
          className="h-9 gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
        >
          <ArrowUpRight className="size-3.5" /> Request Bank Payout
        </Button>
      </div>

      {/* Wallet Balance Hero Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5 bg-gradient-to-br from-[#10184A] to-[#1C1B50] text-white border-0 shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-xs text-purple-200 font-medium">Available Wallet Balance</span>
            <h2 className="text-3xl font-extrabold mt-1 text-white">
              ₹{(kpis.walletAvailableBalance).toLocaleString("en-IN")}
            </h2>
            <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <CheckCircle className="size-4" /> Ready for Immediate Transfer
            </div>
          </div>
          <div className="absolute right-[-10px] bottom-[-10px] opacity-10">
            <Wallet className="size-32" />
          </div>
        </Card>

        <Card className="p-5 bg-card border border-border">
          <span className="text-xs text-text-secondary font-medium">Lifetime Gross Earned</span>
          <h3 className="text-2xl font-bold text-foreground mt-1">
            ₹{(kpis.totalCommissionEarned).toLocaleString("en-IN")}
          </h3>
          <p className="text-[11px] text-purple-600 font-medium mt-3">From {kpis.dealsClosed} successfully closed property sales</p>
        </Card>

        <Card className="p-5 bg-card border border-border">
          <span className="text-xs text-text-secondary font-medium">Registered Bank Account</span>
          <h3 className="text-sm font-bold text-foreground mt-1 flex items-center gap-1.5">
            <Building className="size-4 text-brand" /> HDFC Bank Ltd • Current A/c
          </h3>
          <p className="text-[11px] text-text-secondary mt-1 font-mono">A/c: 50200039281928 • IFSC: HDFC0000128</p>
          <span className="text-[10px] text-emerald-600 font-bold bg-emerald-500/10 px-2 py-0.5 rounded mt-2 inline-block">
            Verified for Instant NEFT/RTGS
          </span>
        </Card>
      </div>

      {/* Commission Ledger Table */}
      <Card className="bg-card border border-border overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Commission Credits & Ledger History</h3>
          <span className="text-xs text-text-secondary">Standard TDS: 5% Under Sec 194H</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-muted/50 border-b border-border text-text-secondary font-semibold">
              <tr>
                <th className="py-3 px-4">Deal Reference</th>
                <th className="py-3 px-4">Buyer & Unit</th>
                <th className="py-3 px-4">Sale Value</th>
                <th className="py-3 px-4">Rate (%)</th>
                <th className="py-3 px-4">Gross Comm.</th>
                <th className="py-3 px-4">TDS (5%)</th>
                <th className="py-3 px-4">Net Payable</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-brand">{tx.bookingRef}</td>
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-foreground">{tx.clientName}</p>
                    <p className="text-[11px] text-text-muted">
                      {tx.project} • {tx.unitNo}
                    </p>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-foreground">
                    ₹{(tx.dealValue / 100000).toFixed(1)} Lakh
                  </td>
                  <td className="py-3.5 px-4 font-bold text-brand">{tx.commissionPercentage}%</td>
                  <td className="py-3.5 px-4 font-semibold text-foreground">
                    ₹{tx.grossCommission.toLocaleString("en-IN")}
                  </td>
                  <td className="py-3.5 px-4 text-text-muted">
                    -₹{((tx.grossCommission * tx.tdsPercentage) / 100).toLocaleString("en-IN")}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-emerald-600">
                    ₹{tx.netPayable.toLocaleString("en-IN")}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        tx.status === "Credited to Wallet"
                          ? "bg-emerald-500/10 text-emerald-600"
                          : "bg-amber-500/10 text-amber-600"
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Payout Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="w-[95vw] sm:max-w-md max-h-[90vh] p-0 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col bg-card border-border overflow-hidden">
          <DialogHeader className="px-5 sm:px-6 pt-5 pb-4 border-b border-border shrink-0 text-left">
            <DialogTitle className="text-base sm:text-lg font-bold text-foreground">
              Request Payout to Bank Account
            </DialogTitle>
            <p className="text-xs text-muted-foreground mt-0.5">Direct IMPS settlement to your registered verified corporate account.</p>
          </DialogHeader>
          <form onSubmit={handleWithdraw} className="flex flex-col flex-1 min-h-0 overflow-hidden">
            <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4 space-y-4 scrollbar-thin">
              <div>
                <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Withdrawal Amount (INR)</Label>
                <Input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                  max={kpis.walletAvailableBalance}
                  className="h-10 sm:h-11 text-sm rounded-xl"
                  required
                />
                <span className="text-xs text-muted-foreground mt-1.5 block">
                  Available to withdraw: ₹{kpis.walletAvailableBalance.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-muted/40 border border-border text-xs sm:text-sm text-muted-foreground space-y-1">
                <p className="font-semibold text-foreground">Receiving Bank Account:</p>
                <p>HDFC Bank Ltd • Current Account</p>
                <p className="font-mono text-xs">A/c: 50200039281928 | IFSC: HDFC0000128</p>
              </div>
            </div>
            <DialogFooter className="px-5 sm:px-6 py-3.5 border-t border-border bg-muted/20 shrink-0 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3">
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)} className="w-full sm:w-auto rounded-xl h-10 px-5 text-sm">
                Cancel
              </Button>
              <Button type="submit" className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-10 px-6 text-sm font-semibold shadow-md">
                Disburse Payout
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
