import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Calculator,
  Download,
  FileSpreadsheet,
  CheckCircle,
  AlertCircle,
  Landmark,
} from "lucide-react";
import { initialGstReports, type GstTaxReport } from "@/lib/services/accountant";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/accountant/gst-reports")({
  head: () => ({
    meta: [
      { title: "GST & Tax Compliance Reports | Vrindavan Accounts" },
      { name: "description", content: "Real estate GST GSTR-3B filings, input tax credit and tax calculations." },
    ],
  }),
  component: GstReportsPage,
});

export function GstReportsPage() {
  const [reports] = useState<GstTaxReport[]>(initialGstReports);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
              <Calculator className="size-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              GST Returns & Statutory Tax Filings
            </h1>
          </div>
          <p className="mt-1 text-xs text-text-secondary">
            RERA & GST council compliant 5% residential construction output tax calculations and supplier ITC tracking.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => toast.success("Exporting GSTR-3B JSON & Excel summary...")}
          className="h-9 gap-1.5 text-xs"
        >
          <Download className="size-3.5" /> Export GSTR Pack (JSON)
        </Button>
      </div>

      <Card className="p-5 bg-card border border-border shadow-sm">
        <h2 className="text-sm font-semibold text-foreground mb-4">Monthly GSTR-3B Filing Schedule</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-muted/60 text-text-secondary uppercase tracking-wider text-[11px] border-b border-border">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Filing Period</th>
                <th className="py-2.5 px-3 font-semibold">Taxable Supplies</th>
                <th className="py-2.5 px-3 font-semibold">CGST (2.5%)</th>
                <th className="py-2.5 px-3 font-semibold">SGST (2.5%)</th>
                <th className="py-2.5 px-3 font-semibold">Gross Tax</th>
                <th className="py-2.5 px-3 font-semibold">ITC Claimed</th>
                <th className="py-2.5 px-3 font-semibold">Net Cash Payable</th>
                <th className="py-2.5 px-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-foreground font-medium">
              {reports.map((r, idx) => (
                <tr key={idx} className="hover:bg-muted/40 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-foreground">{r.period}</td>
                  <td className="py-2.5 px-3">₹{r.taxableValue.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-text-secondary">₹{r.cgst.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-text-secondary">₹{r.sgst.toLocaleString()}</td>
                  <td className="py-2.5 px-3 font-bold text-foreground">₹{r.totalTax.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-semibold">₹{r.itcClaimed.toLocaleString()}</td>
                  <td className="py-2.5 px-3 font-bold text-brand text-sm">₹{r.netGstPayable.toLocaleString()}</td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-[10.5px] font-semibold ${
                        r.status === "Filed"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {r.status}
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
