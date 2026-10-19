import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Wallet,
  Plus,
  Search,
  Download,
  Calendar,
  Building,
  CheckCircle,
} from "lucide-react";
import { initialVendorExpenses, type VendorExpense } from "@/lib/services/accountant";
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

export const Route = createFileRoute("/accountant/expenses")({
  head: () => ({
    meta: [
      { title: "Expenses & Vendor Payments | Vrindavan Accounts" },
      { name: "description", content: "Construction vendor payouts, contractor bills and operating expenses." },
    ],
  }),
  component: ExpensesPage,
});

export function ExpensesPage() {
  const [expenses, setExpenses] = useState<VendorExpense[]>(initialVendorExpenses);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [newExp, setNewExp] = useState({
    vendorName: "",
    category: "Construction Material" as VendorExpense["category"],
    invoiceRef: "",
    amount: 250000,
    paymentMode: "Bank Transfer" as VendorExpense["paymentMode"],
  });

  const filtered = expenses.filter(
    (e) =>
      e.vendorName.toLowerCase().includes(search.toLowerCase()) ||
      e.voucherNo.toLowerCase().includes(search.toLowerCase()) ||
      e.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExp.vendorName) {
      toast.error("Please enter vendor name");
      return;
    }
    const created: VendorExpense = {
      id: `VEXP-${Date.now().toString().slice(-4)}`,
      voucherNo: `VCH-2026-0${Math.floor(200 + Math.random() * 200)}`,
      vendorName: newExp.vendorName,
      category: newExp.category,
      invoiceRef: newExp.invoiceRef || `INV/${Date.now().toString().slice(-4)}`,
      amount: Number(newExp.amount),
      date: new Date().toISOString().split("T")[0],
      paymentMode: newExp.paymentMode,
      status: "Approved",
    };
    setExpenses([created, ...expenses]);
    toast.success(`Expense voucher #${created.voucherNo} created!`);
    setModal(false);
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
              Expenses & Vendor Disbursements
            </h1>
          </div>
          <p className="mt-1 text-xs text-text-secondary">
            Process construction contractor bills, supplier invoices, cement & steel procurement and marketing payments.
          </p>
        </div>

        <Button
          size="sm"
          onClick={() => setModal(true)}
          className="h-9 gap-1.5 text-xs bg-brand text-white shadow-sm"
        >
          <Plus className="size-3.5" /> New Expense Voucher
        </Button>
      </div>

      <Card className="p-5 bg-card border border-border shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-border/60">
          <h2 className="text-sm font-semibold text-foreground">Disbursement Vouchers</h2>
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 size-4 text-text-muted" />
            <Input
              placeholder="Search vendor or voucher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-8 text-xs"
            />
          </div>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-xs text-left">
            <thead className="bg-muted/60 text-text-secondary uppercase tracking-wider text-[11px] border-b border-border">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Voucher No</th>
                <th className="py-2.5 px-3 font-semibold">Vendor Name</th>
                <th className="py-2.5 px-3 font-semibold">Expense Category</th>
                <th className="py-2.5 px-3 font-semibold">Invoice Ref</th>
                <th className="py-2.5 px-3 font-semibold">Amount</th>
                <th className="py-2.5 px-3 font-semibold">Disbursal Mode</th>
                <th className="py-2.5 px-3 font-semibold">Date</th>
                <th className="py-2.5 px-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-foreground font-medium">
              {filtered.map((e) => (
                <tr key={e.id} className="hover:bg-muted/40 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-brand">{e.voucherNo}</td>
                  <td className="py-2.5 px-3 font-semibold text-foreground">{e.vendorName}</td>
                  <td className="py-2.5 px-3">
                    <span className="inline-flex px-2 py-0.5 rounded text-[11px] font-semibold bg-brand/10 text-brand">
                      {e.category}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-text-secondary">{e.invoiceRef}</td>
                  <td className="py-2.5 px-3 font-bold text-foreground">₹{e.amount.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-text-secondary">{e.paymentMode}</td>
                  <td className="py-2.5 px-3 text-text-muted">{e.date}</td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-[10.5px] font-semibold ${
                        e.status === "Processed"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-blue-50 text-blue-700 border border-blue-200"
                      }`}
                    >
                      {e.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Dialog open={modal} onOpenChange={setModal}>
        <DialogContent className="max-w-md bg-card text-foreground">
          <DialogHeader>
            <DialogTitle className="text-base font-bold flex items-center gap-2">
              <Wallet className="size-4 text-brand" /> Create Expense Voucher
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCreate} className="space-y-3 py-2 text-xs">
            <div>
              <Label className="text-xs">Vendor / Beneficiary Name</Label>
              <Input
                required
                value={newExp.vendorName}
                onChange={(e) => setNewExp({ ...newExp, vendorName: e.target.value })}
                className="h-8 text-xs mt-1"
                placeholder="e.g. UltraTech Cement Corp"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs">Category</Label>
                <Select
                  value={newExp.category}
                  onValueChange={(val: any) => setNewExp({ ...newExp, category: val })}
                >
                  <SelectTrigger className="h-8 text-xs mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Construction Material">Construction Material</SelectItem>
                    <SelectItem value="Contractor Fees">Contractor Fees</SelectItem>
                    <SelectItem value="Marketing & Ads">Marketing & Ads</SelectItem>
                    <SelectItem value="Legal & Statutory">Legal & Statutory</SelectItem>
                    <SelectItem value="Office Admin">Office Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs">Bill/Invoice Ref</Label>
                <Input
                  value={newExp.invoiceRef}
                  onChange={(e) => setNewExp({ ...newExp, invoiceRef: e.target.value })}
                  className="h-8 text-xs mt-1"
                  placeholder="e.g. BILL-99201"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs">Amount (₹)</Label>
                <Input
                  type="number"
                  value={newExp.amount}
                  onChange={(e) => setNewExp({ ...newExp, amount: Number(e.target.value) })}
                  className="h-8 text-xs mt-1"
                />
              </div>
              <div>
                <Label className="text-xs">Payment Mode</Label>
                <Select
                  value={newExp.paymentMode}
                  onValueChange={(val: any) => setNewExp({ ...newExp, paymentMode: val })}
                >
                  <SelectTrigger className="h-8 text-xs mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bank Transfer">Bank Transfer (RTGS)</SelectItem>
                    <SelectItem value="Cheque">Cheque</SelectItem>
                    <SelectItem value="Online">Online Gateway</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setModal(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-brand text-white">
                Authorize Voucher
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
