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
    if (!newExp.vendorName.trim()) {
      toast.error("Please enter vendor name");
      return;
    }
    const amt = Number(newExp.amount);
    if (isNaN(amt) || amt <= 0) {
      toast.error("Expense amount must be greater than zero");
      return;
    }
    const created: VendorExpense = {
      id: `VEXP-${Date.now().toString().slice(-4)}`,
      voucherNo: `VCH-2026-0${Math.floor(200 + Math.random() * 200)}`,
      vendorName: newExp.vendorName,
      category: newExp.category,
      invoiceRef: newExp.invoiceRef || `INV/${Date.now().toString().slice(-4)}`,
      amount: amt,
      date: new Date().toISOString().slice(0, 10),
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
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="inline-flex size-8 sm:size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md shrink-0">
              <Wallet className="size-4 sm:size-5" />
            </span>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-foreground">
              Expenses & Vendor Disbursements
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-text-secondary line-clamp-2 sm:line-clamp-none">
            Process construction contractor bills, supplier invoices, cement & steel procurement and marketing payments.
          </p>
        </div>

        <div className="w-full sm:w-auto">
          <Button
            size="sm"
            onClick={() => setModal(true)}
            className="w-full sm:w-auto h-9 gap-1.5 text-xs bg-brand text-white shadow-sm justify-center"
          >
            <Plus className="size-3.5" /> New Expense Voucher
          </Button>
        </div>
      </div>

      <Card className="p-3.5 sm:p-5 bg-card border border-border shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-border/60 gap-2.5">
          <div className="flex items-center justify-between">
            <h2 className="text-xs sm:text-sm font-semibold text-foreground">Disbursement Vouchers</h2>
            <span className="text-[10px] sm:hidden text-text-muted flex items-center gap-1 font-normal">Swipe horizontally →</span>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 size-4 text-text-muted" />
            <Input
              placeholder="Search vendor or voucher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-8.5 text-xs"
            />
          </div>
        </div>

        <div className="overflow-x-auto mt-3 -mx-3.5 px-3.5 sm:mx-0 sm:px-0">
          <table className="w-full text-xs sm:text-sm text-left min-w-[850px] whitespace-nowrap">
            <thead className="bg-muted/60 text-text-secondary uppercase tracking-wider text-[11px] border-b border-border">
              <tr>
                <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">Voucher No</th>
                <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">Vendor Name</th>
                <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">Expense Category</th>
                <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">Invoice Ref</th>
                <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">Amount</th>
                <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">Disbursal Mode</th>
                <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">Date</th>
                <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-foreground font-medium">
              {filtered.map((e) => (
                <tr key={e.id} className="hover:bg-muted/40 transition-colors">
                  <td className="py-3 px-3.5 font-mono font-bold text-brand whitespace-nowrap">{e.voucherNo}</td>
                  <td className="py-3 px-3.5 font-semibold text-foreground whitespace-nowrap">{e.vendorName}</td>
                  <td className="py-3 px-3.5 whitespace-nowrap">
                    <span className="inline-flex px-2 py-0.5 rounded text-[11px] font-semibold bg-brand/10 text-brand">
                      {e.category}
                    </span>
                  </td>
                  <td className="py-3 px-3.5 font-mono text-[11px] text-text-secondary whitespace-nowrap">{e.invoiceRef}</td>
                  <td className="py-3 px-3.5 font-bold text-foreground whitespace-nowrap">₹{e.amount.toLocaleString()}</td>
                  <td className="py-3 px-3.5 text-text-secondary whitespace-nowrap">{e.paymentMode}</td>
                  <td className="py-3 px-3.5 text-text-muted whitespace-nowrap">{e.date}</td>
                  <td className="py-3 px-3.5 whitespace-nowrap">
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
        <DialogContent className="w-[95vw] sm:max-w-xl md:max-w-2xl max-h-[90vh] p-0 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col bg-card border-border overflow-hidden">
          <DialogHeader className="px-5 sm:px-6 pt-5 pb-4 border-b border-border shrink-0 text-left">
            <DialogTitle className="text-lg sm:text-xl font-bold flex items-center gap-2.5 text-foreground">
              <span className="p-2 rounded-xl bg-brand/10 text-brand">
                <Wallet className="size-5" />
              </span>
              Create Expense Voucher
            </DialogTitle>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Record construction, vendor, marketing or operational expense vouchers for treasury sign-off.
            </p>
          </DialogHeader>

          <form onSubmit={handleCreate} className="flex flex-col flex-1 min-h-0 overflow-hidden">
            <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4 space-y-4 scrollbar-thin">
              <div>
                <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Vendor / Beneficiary Name *</Label>
                <Input
                  required
                  value={newExp.vendorName}
                  onChange={(e) => setNewExp({ ...newExp, vendorName: e.target.value })}
                  className="h-10 sm:h-11 text-sm rounded-xl"
                  placeholder="e.g. UltraTech Cement Corp"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Expense Category</Label>
                  <Select
                    value={newExp.category}
                    onValueChange={(val: any) => setNewExp({ ...newExp, category: val })}
                  >
                    <SelectTrigger className="h-10 sm:h-11 text-sm rounded-xl">
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
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Bill / Invoice Reference *</Label>
                  <Input
                    required
                    value={newExp.invoiceRef}
                    onChange={(e) => setNewExp({ ...newExp, invoiceRef: e.target.value })}
                    className="h-10 sm:h-11 text-sm rounded-xl font-mono"
                    placeholder="e.g. BILL-99201"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Voucher Amount (₹) *</Label>
                  <Input
                    type="number"
                    min={1}
                    required
                    value={newExp.amount}
                    onChange={(e) => setNewExp({ ...newExp, amount: Number(e.target.value) })}
                    className="h-10 sm:h-11 text-sm rounded-xl font-semibold text-rose-600"
                    placeholder="e.g. 150000"
                  />
                </div>
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Payment Mode</Label>
                  <Select
                    value={newExp.paymentMode}
                    onValueChange={(val: any) => setNewExp({ ...newExp, paymentMode: val })}
                  >
                    <SelectTrigger className="h-10 sm:h-11 text-sm rounded-xl">
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
            </div>

            <DialogFooter className="px-5 sm:px-6 py-3.5 border-t border-border bg-muted/20 shrink-0 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3">
              <Button type="button" variant="outline" onClick={() => setModal(false)} className="rounded-xl h-10 px-5 text-sm w-full sm:w-auto">
                Cancel
              </Button>
              <Button type="submit" className="bg-brand hover:bg-brand/90 text-white rounded-xl h-10 px-6 text-sm font-semibold shadow-md w-full sm:w-auto">
                Authorize Voucher
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
