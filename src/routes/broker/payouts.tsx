import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  IndianRupee,
  Download,
  CheckCircle,
  FileText,
  Building,
  Calendar,
} from "lucide-react";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { brokerService, type BrokerPayout } from "@/lib/services/broker";
import { toast } from "sonner";

export const Route = createFileRoute("/broker/payouts")({
  head: () => ({
    meta: [
      { title: "Payout History & Invoices | Vrindavan Channel Partner" },
      { name: "description", content: "Bank disbursement logs, transaction UTRs, and GST TDS invoices." },
    ],
  }),
  component: BrokerPayoutsPage,
});

export function BrokerPayoutsPage() {
  const [payouts] = useState<BrokerPayout[]>(brokerService.getPayouts());

  const downloadReceipt = (inv: string) => {
    toast.success(`Disbursement Voucher & Tax Certificate for ${inv} downloaded!`);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
              <IndianRupee className="size-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Disbursed Payout History
            </h1>
          </div>
          <p className="mt-1 text-xs text-text-secondary">
            Bank transfer records, transaction references, and withholding tax certificates.
          </p>
        </div>
      </div>

      <Card className="bg-card border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-muted/50 border-b border-border text-text-secondary font-semibold">
              <tr>
                <th className="py-3 px-4">Payout Ref</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Gross Claim</th>
                <th className="py-3 px-4">TDS (5%)</th>
                <th className="py-3 px-4">Net Disbursed</th>
                <th className="py-3 px-4">Bank Ref & UTR</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {payouts.map((p) => (
                <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-brand">{p.id}</td>
                  <td className="py-3.5 px-4 text-text-secondary">{p.payoutDate}</td>
                  <td className="py-3.5 px-4 font-semibold text-foreground">
                    ₹{p.amountRequested.toLocaleString("en-IN")}
                  </td>
                  <td className="py-3.5 px-4 text-text-muted">
                    -₹{p.tdsDeducted.toLocaleString("en-IN")}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-emerald-600">
                    ₹{p.netDisbursed.toLocaleString("en-IN")}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-mono text-[11px] text-foreground block">{p.bankRef}</span>
                    <span className="font-mono text-[10px] text-text-muted block">UTR: {p.utrNumber}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600">
                      <CheckCircle className="size-3" /> {p.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => downloadReceipt(p.invoiceNumber)}
                      className="h-7 px-2 gap-1 text-[11px]"
                    >
                      <Download className="size-3" /> Receipt
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
