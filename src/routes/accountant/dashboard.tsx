import React, { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Wallet,
  Receipt,
  IndianRupee,
  Calendar,
  AlertCircle,
  TrendingUp,
  Download,
  Plus,
  Building,
  CheckCircle,
  Clock,
  Printer,
  ChevronRight,
  Filter,
  Landmark,
  Calculator,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import {
  initialAccountantKpi,
  initialMonthlyCollections,
  initialRevenueByProject,
  initialExpenseSplit,
  initialAgingReport,
  initialBookingPayments,
  initialPendingDues,
  initialBankReconciliation,
  type BookingPayment,
} from "@/lib/services/accountant";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export const Route = createFileRoute("/accountant/dashboard")({
  head: () => ({
    meta: [
      { title: "Chief Accountant & Finance Dashboard | Vrindavan ERP" },
      {
        name: "description",
        content:
          "Real estate collections, buyer installments, GST tax compliance, contractor payouts and escrow reconciliation.",
      },
    ],
  }),
  component: AccountantDashboardPage,
});

export function AccountantDashboardPage() {
  const [kpis] = useState(initialAccountantKpi);
  const [payments, setPayments] = useState<BookingPayment[]>(initialBookingPayments);
  const [recordModal, setRecordModal] = useState(false);
  const [newPay, setNewPay] = useState({
    clientName: "",
    unitNo: "A-1204",
    project: "Vrindavan Heights",
    amount: 500000,
    paymentMode: "NEFT/RTGS" as BookingPayment["paymentMode"],
    bankRef: "",
  });

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPay.clientName) {
      toast.error("Please enter buyer/client name");
      return;
    }
    const created: BookingPayment = {
      id: `PAY-${Date.now().toString().slice(-4)}`,
      receiptNo: `RCPT-2026-${Math.floor(100 + Math.random() * 900)}`,
      clientName: newPay.clientName,
      phone: "+91 98000 00000",
      unitNo: newPay.unitNo,
      project: newPay.project,
      amount: Number(newPay.amount),
      paymentMode: newPay.paymentMode,
      bankRef: newPay.bankRef || "REF" + Math.floor(10000000 + Math.random() * 90000000),
      date: new Date().toISOString().split("T")[0],
      status: "Cleared",
    };
    setPayments([created, ...payments]);
    toast.success(`Payment receipt #${created.receiptNo} generated successfully!`);
    setRecordModal(false);
    setNewPay({
      clientName: "",
      unitNo: "A-1204",
      project: "Vrindavan Heights",
      amount: 500000,
      paymentMode: "NEFT/RTGS",
      bankRef: "",
    });
  };

  const handlePrintReceipt = (receiptNo: string) => {
    toast.info(`Printing Official Tax Receipt #${receiptNo}...`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
              <Receipt className="size-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Finance & Accounts Portal
            </h1>
          </div>
          <p className="mt-1 text-xs text-text-secondary">
            RERA escrow monitoring, buyer installment billing, broker payouts, GST compliance and vendor disbursements.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.success("Exporting Financial Ledger (Excel)...")}
            className="h-9 gap-1.5 text-xs border-border"
          >
            <Download className="size-3.5" /> Export Ledger
          </Button>
          <Button
            size="sm"
            onClick={() => setRecordModal(true)}
            className="h-9 gap-1.5 text-xs bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-sm"
          >
            <Plus className="size-3.5" /> Record Payment Receipt
          </Button>
        </div>
      </div>

      {/* 8 Primary KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <Card className="p-4 bg-card border border-border/70 hover:border-brand/40 transition-all shadow-sm">
          <div className="flex items-center justify-between text-text-secondary text-xs font-medium">
            <span>Total Revenue (YTD)</span>
            <IndianRupee className="size-4 text-brand" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">
              ₹{(kpis.totalRevenue / 10000000).toFixed(2)} Cr
            </span>
            <span className="text-[11px] font-semibold text-emerald-600 flex items-center">
              <ArrowUpRight className="size-3" />+24.2%
            </span>
          </div>
          <p className="text-[11px] text-text-muted mt-1">Total collections realized</p>
        </Card>

        <Card className="p-4 bg-card border border-border/70 hover:border-brand/40 transition-all shadow-sm">
          <div className="flex items-center justify-between text-text-secondary text-xs font-medium">
            <span>Collections Today</span>
            <Receipt className="size-4 text-emerald-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-emerald-600">
              ₹{(kpis.collectionsToday / 100000).toFixed(2)} L
            </span>
            <span className="text-[11px] text-brand font-medium">3 Receipts</span>
          </div>
          <p className="text-[11px] text-text-muted mt-1">Cleared in HDFC Escrow</p>
        </Card>

        <Card className="p-4 bg-card border border-border/70 hover:border-brand/40 transition-all shadow-sm">
          <div className="flex items-center justify-between text-text-secondary text-xs font-medium">
            <span>Pending Dues</span>
            <Clock className="size-4 text-amber-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">
              ₹{(kpis.pendingDues / 10000000).toFixed(2)} Cr
            </span>
            <span className="text-[11px] text-amber-600 font-medium">42 Buyers</span>
          </div>
          <p className="text-[11px] text-text-muted mt-1">Milestones invoiced</p>
        </Card>

        <Card className="p-4 bg-card border border-border/70 hover:border-brand/40 transition-all shadow-sm">
          <div className="flex items-center justify-between text-text-secondary text-xs font-medium">
            <span>Overdue (&gt;30 Days)</span>
            <AlertCircle className="size-4 text-rose-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-rose-600">
              ₹{(kpis.overdueAmount / 100000).toFixed(1)} L
            </span>
            <span className="text-[11px] font-semibold text-rose-600">Critical</span>
          </div>
          <p className="text-[11px] text-text-muted mt-1">Penalties applicable</p>
        </Card>

        <Card className="p-4 bg-card border border-border/70 hover:border-brand/40 transition-all shadow-sm">
          <div className="flex items-center justify-between text-text-secondary text-xs font-medium">
            <span>Brokerage Payable</span>
            <Wallet className="size-4 text-indigo-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">
              ₹{(kpis.commissionPayable / 100000).toFixed(1)} L
            </span>
            <span className="text-[11px] text-text-muted">14 Channel Partners</span>
          </div>
          <p className="text-[11px] text-text-muted mt-1">Pending approval</p>
        </Card>

        <Card className="p-4 bg-card border border-border/70 hover:border-brand/40 transition-all shadow-sm">
          <div className="flex items-center justify-between text-text-secondary text-xs font-medium">
            <span>Monthly Expenses</span>
            <TrendingUp className="size-4 text-blue-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">
              ₹{(kpis.monthlyExpenses / 100000).toFixed(1)} L
            </span>
            <span className="text-[11px] text-text-muted">Vendors & Labour</span>
          </div>
          <p className="text-[11px] text-text-muted mt-1">Raw material & contractors</p>
        </Card>

        <Card className="p-4 bg-card border border-border/70 hover:border-brand/40 transition-all shadow-sm">
          <div className="flex items-center justify-between text-text-secondary text-xs font-medium">
            <span>Net Profit (YTD)</span>
            <Calculator className="size-4 text-emerald-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-emerald-600">
              ₹{(kpis.netProfit / 10000000).toFixed(2)} Cr
            </span>
            <span className="text-[11px] font-semibold text-emerald-600">22.8% Margin</span>
          </div>
          <p className="text-[11px] text-text-muted mt-1">After direct & indirect costs</p>
        </Card>

        <Card className="p-4 bg-card border border-border/70 hover:border-brand/40 transition-all shadow-sm">
          <div className="flex items-center justify-between text-text-secondary text-xs font-medium">
            <span>GST Payable</span>
            <Landmark className="size-4 text-violet-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">
              ₹{(kpis.gstPayable / 100000).toFixed(1)} L
            </span>
            <span className="text-[11px] text-text-muted">Due 20th Apr</span>
          </div>
          <p className="text-[11px] text-emerald-600 font-medium mt-1">GSTR-3B Auto Reconciled</p>
        </Card>
      </div>

      {/* Row 2: Charts (Monthly Collections vs Target & Project Revenue Donut) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <Card className="p-5 bg-card border border-border lg:col-span-7 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-border/60">
            <div>
              <h2 className="text-sm font-semibold text-foreground">Monthly Inflow Collections vs Target</h2>
              <p className="text-xs text-text-muted mt-0.5">Realized bank credits against planned sales collection milestones</p>
            </div>
            <span className="text-xs font-medium px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
              Surpassed Target
            </span>
          </div>

          <div className="h-[280px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={initialMonthlyCollections} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fontSize: 11, fill: "#6B7280" }}
                  tickFormatter={(val) => `₹${(val / 10000000).toFixed(1)}Cr`}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(val: any) => [`₹${(Number(val) / 100000).toFixed(1)} Lakhs`, ""]}
                  contentStyle={{
                    backgroundColor: "#10184A",
                    borderColor: "#331fa3",
                    borderRadius: "10px",
                    color: "#FFFFFF",
                    fontSize: "12px",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
                <Bar dataKey="target" name="Collection Target" fill="#9CA3AF" radius={[4, 4, 0, 0]} />
                <Bar dataKey="collected" name="Realized Receipts" fill="#4F20D8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5 bg-card border border-border lg:col-span-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-border/60">
            <div>
              <h2 className="text-sm font-semibold text-foreground">Revenue Contribution by Project</h2>
              <p className="text-xs text-text-muted mt-0.5">Project-wise share of gross collections</p>
            </div>
          </div>

          <div className="h-[280px] w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={initialRevenueByProject}
                  dataKey="revenue"
                  nameKey="project"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={3}
                >
                  {initialRevenueByProject.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any) => [`₹${(Number(val) / 10000000).toFixed(2)} Cr`, ""]}
                  contentStyle={{
                    backgroundColor: "#10184A",
                    borderColor: "#331fa3",
                    borderRadius: "10px",
                    color: "#FFFFFF",
                    fontSize: "12px",
                  }}
                />
                <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  wrapperStyle={{ fontSize: "11px", paddingTop: "6px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Row 3: Expense Split & Aging Report */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <Card className="p-5 bg-card border border-border lg:col-span-6 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-border/60">
            <div>
              <h2 className="text-sm font-semibold text-foreground">Operational & Construction Expense Split</h2>
              <p className="text-xs text-text-muted mt-0.5">Disbursement across materials, labour and brokerage</p>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            {initialExpenseSplit.map((item) => {
              const totalExp = initialExpenseSplit.reduce((a, b) => a + b.amount, 0);
              const pct = ((item.amount / totalExp) * 100).toFixed(1);
              return (
                <div key={item.category} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-foreground">{item.category}</span>
                    <span className="font-bold text-text-secondary">
                      ₹{(item.amount / 100000).toFixed(1)}L ({pct}%)
                    </span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Aging Report Card */}
        <Card className="p-5 bg-card border border-border lg:col-span-6 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-border/60">
            <div>
              <h2 className="text-sm font-semibold text-foreground">Receivables Aging Analysis</h2>
              <p className="text-xs text-text-muted mt-0.5">Outstanding installment aging timeline</p>
            </div>
            <Link to="/accountant/pending-dues" className="text-xs text-brand font-medium hover:underline flex items-center gap-1">
              View Dues <ChevronRight className="size-3.5" />
            </Link>
          </div>

          <div className="space-y-3 pt-4">
            {initialAgingReport.map((ag) => (
              <div
                key={ag.range}
                className="flex items-center justify-between p-3 rounded-lg border border-border/70 hover:border-brand/30 bg-muted/20 transition-colors"
              >
                <div className="space-y-0.5">
                  <span className="text-xs font-semibold text-foreground block">{ag.range}</span>
                  <span className="text-[11px] text-text-muted">{ag.count} Buyer Accounts</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold block" style={{ color: ag.color }}>
                    ₹{(ag.amount / 100000).toFixed(1)} Lakhs
                  </span>
                  <span className="text-[10px] text-text-muted">Outstanding</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Row 4: Recent Payments Table */}
      <Card className="p-5 bg-card border border-border shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-border/60 gap-2">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Recent Booking Payments & Inflow Receipts</h2>
            <p className="text-xs text-text-muted mt-0.5">Live cleared credits, NEFT/RTGS transfers and cheque clearing status</p>
          </div>
          <Link
            to="/accountant/booking-payments"
            className="text-xs text-brand font-medium hover:underline flex items-center gap-1"
          >
            All Receipts Register <ChevronRight className="size-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-xs text-left">
            <thead className="bg-muted/60 text-text-secondary uppercase tracking-wider text-[11px] border-b border-border">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Receipt No</th>
                <th className="py-2.5 px-3 font-semibold">Buyer Name</th>
                <th className="py-2.5 px-3 font-semibold">Unit & Project</th>
                <th className="py-2.5 px-3 font-semibold">Amount</th>
                <th className="py-2.5 px-3 font-semibold">Mode</th>
                <th className="py-2.5 px-3 font-semibold">Bank Ref / Cheque</th>
                <th className="py-2.5 px-3 font-semibold">Date</th>
                <th className="py-2.5 px-3 font-semibold">Status</th>
                <th className="py-2.5 px-3 font-semibold text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-foreground font-medium">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-muted/40 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-brand">{p.receiptNo}</td>
                  <td className="py-2.5 px-3">
                    <span className="font-semibold text-foreground block">{p.clientName}</span>
                    <span className="text-[10px] text-text-muted">{p.phone}</span>
                  </td>
                  <td className="py-2.5 px-3 text-text-secondary">
                    <span className="font-semibold block">{p.unitNo}</span>
                    <span className="text-[10.5px] text-text-muted">{p.project}</span>
                  </td>
                  <td className="py-2.5 px-3 font-bold text-emerald-600 text-sm">
                    ₹{p.amount.toLocaleString()}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="inline-flex px-2 py-0.5 rounded text-[11px] font-semibold bg-brand/10 text-brand">
                      {p.paymentMode}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-text-secondary">{p.bankRef}</td>
                  <td className="py-2.5 px-3 text-text-muted whitespace-nowrap">{p.date}</td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-[10.5px] font-semibold ${
                        p.status === "Cleared"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : p.status === "Pending Clearance"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-rose-50 text-rose-700 border border-rose-200"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handlePrintReceipt(p.receiptNo)}
                      className="size-7 p-0 text-text-muted hover:text-brand"
                      title="Print Tax Receipt"
                    >
                      <Printer className="size-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Row 5: Bank Reconciliation Escrow Status */}
      <Card className="p-5 bg-card border border-border shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-border/60">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Escrow & Current Bank Account Balances</h2>
            <p className="text-xs text-text-muted mt-0.5">RERA mandatory 70% project escrow vs operational 30% account</p>
          </div>
          <Link to="/accountant/bank-reconciliation" className="text-xs text-brand font-medium hover:underline flex items-center gap-1">
            Reconciliation Details <ChevronRight className="size-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {initialBankReconciliation.map((bank) => (
            <div key={bank.id} className="p-4 rounded-xl border border-border/80 bg-muted/20 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-foreground">{bank.bankName}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10.5px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {bank.status}
                  </span>
                </div>
                <p className="text-[11px] font-mono text-text-muted">A/C: {bank.accountNumber}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-border/50 text-xs">
                <div>
                  <span className="text-[10.5px] text-text-muted block">Book Ledger Balance</span>
                  <span className="text-base font-bold text-brand">
                    ₹{(bank.bookBalance / 100000).toFixed(2)} Lakhs
                  </span>
                </div>
                <div>
                  <span className="text-[10.5px] text-text-muted block">Bank Statement Balance</span>
                  <span className="text-base font-bold text-emerald-600">
                    ₹{(bank.bankBalance / 100000).toFixed(2)} Lakhs
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Record Payment Dialog */}
      <Dialog open={recordModal} onOpenChange={setRecordModal}>
        <DialogContent className="max-w-md bg-card text-foreground">
          <DialogHeader>
            <DialogTitle className="text-base font-bold flex items-center gap-2">
              <Receipt className="size-4 text-brand" /> Record Customer Payment Receipt
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleRecordPayment} className="space-y-3 py-2 text-xs">
            <div>
              <Label className="text-xs">Client / Buyer Full Name</Label>
              <Input
                required
                value={newPay.clientName}
                onChange={(e) => setNewPay({ ...newPay, clientName: e.target.value })}
                className="h-8 text-xs mt-1"
                placeholder="e.g. Ramesh Chandra Verma"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs">Unit Number</Label>
                <Input
                  value={newPay.unitNo}
                  onChange={(e) => setNewPay({ ...newPay, unitNo: e.target.value })}
                  className="h-8 text-xs mt-1"
                  placeholder="e.g. Tower A-802"
                />
              </div>

              <div>
                <Label className="text-xs">Project</Label>
                <Select
                  value={newPay.project}
                  onValueChange={(val) => setNewPay({ ...newPay, project: val })}
                >
                  <SelectTrigger className="h-8 text-xs mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Vrindavan Heights">Vrindavan Heights</SelectItem>
                    <SelectItem value="Green Valley Villas">Green Valley Villas</SelectItem>
                    <SelectItem value="Cyber Techpark Tower">Cyber Techpark Tower</SelectItem>
                    <SelectItem value="Radha Govind City">Radha Govind City</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs">Receipt Amount (₹)</Label>
                <Input
                  type="number"
                  min={1000}
                  required
                  value={newPay.amount}
                  onChange={(e) => setNewPay({ ...newPay, amount: Number(e.target.value) })}
                  className="h-8 text-xs mt-1"
                />
              </div>

              <div>
                <Label className="text-xs">Payment Mode</Label>
                <Select
                  value={newPay.paymentMode}
                  onValueChange={(val: any) => setNewPay({ ...newPay, paymentMode: val })}
                >
                  <SelectTrigger className="h-8 text-xs mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NEFT/RTGS">NEFT / RTGS</SelectItem>
                    <SelectItem value="Cheque">Cheque</SelectItem>
                    <SelectItem value="UPI">UPI</SelectItem>
                    <SelectItem value="Demand Draft">Demand Draft</SelectItem>
                    <SelectItem value="Card">Debit/Credit Card</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-xs">Bank UTR / Cheque Number</Label>
              <Input
                value={newPay.bankRef}
                onChange={(e) => setNewPay({ ...newPay, bankRef: e.target.value })}
                className="h-8 text-xs mt-1"
                placeholder="e.g. HDFC0091240192"
              />
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setRecordModal(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-brand text-white">
                Generate Receipt
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
