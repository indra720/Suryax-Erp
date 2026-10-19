import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  BarChart3,
  Download,
  Calendar,
  Building,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/accountant/financial-statements")({
  head: () => ({
    meta: [
      { title: "Profit & Loss and Balance Sheet | Vrindavan Accounts" },
      { name: "description", content: "Audited financial statements, P&L, balance sheet and EBITDA margins." },
    ],
  }),
  component: FinancialStatementsPage,
});

export function FinancialStatementsPage() {
  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
              <BarChart3 className="size-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Profit & Loss and Balance Sheet (FY 2025-26)
            </h1>
          </div>
          <p className="mt-1 text-xs text-text-secondary">
            Audited financial health, EBITDA margins, WIP real estate inventory valuations and liability disclosures.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => toast.success("Downloading Audited Financial Statements (PDF)...")}
          className="h-9 gap-1.5 text-xs"
        >
          <Download className="size-3.5" /> Download Financials (PDF)
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Profit & Loss Statement */}
        <Card className="p-5 bg-card border border-border shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-border/60">
            <h2 className="text-sm font-bold text-foreground">Statement of Profit & Loss (P&L)</h2>
            <span className="text-xs font-semibold text-emerald-600">Net Margin: 22.8%</span>
          </div>

          <div className="divide-y divide-border/60 text-xs mt-3">
            <div className="py-2.5 flex justify-between font-bold text-foreground">
              <span>Gross Operating Revenue (Real Estate Sales)</span>
              <span>₹18,40,00,000</span>
            </div>
            <div className="py-2 flex justify-between text-rose-600 pl-3">
              <span>Less: Direct Land Acquisition & Approval Costs</span>
              <span>(₹4,80,00,000)</span>
            </div>
            <div className="py-2 flex justify-between text-rose-600 pl-3">
              <span>Less: Construction Material & Contractor Labour</span>
              <span>(₹5,20,00,000)</span>
            </div>
            <div className="py-2.5 flex justify-between font-bold text-brand bg-brand/5 px-2 rounded">
              <span>Gross Profit</span>
              <span>₹8,40,00,000</span>
            </div>
            <div className="py-2 flex justify-between text-rose-600 pl-3">
              <span>Less: Sales Commissions & Channel Partner Payouts</span>
              <span>(₹1,40,00,000)</span>
            </div>
            <div className="py-2 flex justify-between text-rose-600 pl-3">
              <span>Less: Digital Marketing, Ads & Media Spend</span>
              <span>(₹1,20,00,000)</span>
            </div>
            <div className="py-2 flex justify-between text-rose-600 pl-3">
              <span>Less: Staff Salaries & Office Overhead</span>
              <span>(₹1,60,00,000)</span>
            </div>
            <div className="py-3 flex justify-between font-extrabold text-sm text-emerald-700 bg-emerald-50/70 px-2 rounded mt-2 border border-emerald-200">
              <span>Net Profit Before Tax (EBITDA)</span>
              <span>₹4,20,00,000</span>
            </div>
          </div>
        </Card>

        {/* Balance Sheet */}
        <Card className="p-5 bg-card border border-border shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-border/60">
            <h2 className="text-sm font-bold text-foreground">Condensed Balance Sheet</h2>
            <span className="text-xs font-semibold text-brand">Assets = Liabilities</span>
          </div>

          <div className="divide-y divide-border/60 text-xs mt-3">
            <div className="py-2 font-bold text-foreground bg-muted/40 px-2 rounded">
              1. ASSETS
            </div>
            <div className="py-2 flex justify-between pl-3 text-text-secondary">
              <span>Bank & Escrow RERA Balances</span>
              <span className="font-semibold text-foreground">₹5,52,50,000</span>
            </div>
            <div className="py-2 flex justify-between pl-3 text-text-secondary">
              <span>Work-In-Progress (WIP) Construction Inventory</span>
              <span className="font-semibold text-foreground">₹32,40,00,000</span>
            </div>
            <div className="py-2 flex justify-between pl-3 text-text-secondary">
              <span>Customer Receivables (Milestone Invoices)</span>
              <span className="font-semibold text-foreground">₹2,80,00,000</span>
            </div>

            <div className="py-2 font-bold text-foreground bg-muted/40 px-2 rounded mt-2">
              2. LIABILITIES & EQUITY
            </div>
            <div className="py-2 flex justify-between pl-3 text-text-secondary">
              <span>Customer Booking Advances (Unbilled)</span>
              <span className="font-semibold text-foreground">₹14,20,00,000</span>
            </div>
            <div className="py-2 flex justify-between pl-3 text-text-secondary">
              <span>Trade Creditors & Subcontractor Dues</span>
              <span className="font-semibold text-foreground">₹3,45,00,000</span>
            </div>
            <div className="py-2 flex justify-between pl-3 text-text-secondary">
              <span>Statutory Dues (GST & TDS)</span>
              <span className="font-semibold text-foreground">₹48,50,000</span>
            </div>
            <div className="py-3 flex justify-between font-extrabold text-sm text-brand bg-brand/5 px-2 rounded mt-2 border border-brand/20">
              <span>Shareholder Equity & Reserves</span>
              <span>₹22,59,00,000</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
