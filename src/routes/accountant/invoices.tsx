import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  FileText,
  Plus,
  Search,
  Download,
  Printer,
  Calendar,
  IndianRupee,
} from "lucide-react";
import { initialInvoices, type Invoice } from "@/lib/services/accountant";
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

export const Route = createFileRoute("/accountant/invoices")({
  head: () => ({
    meta: [
      { title: "Invoices & Demand Notes | Vrindavan Accounts" },
      { name: "description", content: "Construction milestone demand invoices and GST tax billing." },
    ],
  }),
  component: InvoicesPage,
});

export function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [newInv, setNewInv] = useState({
    clientName: "",
    unitNo: "A-501",
    project: "Vrindavan Heights",
    baseAmount: 1500000,
    dueDate: "2026-05-15",
  });

  const filtered = invoices.filter(
    (inv) =>
      inv.invoiceNo.toLowerCase().includes(search.toLowerCase()) ||
      inv.clientName.toLowerCase().includes(search.toLowerCase()) ||
      inv.unitNo.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInv.clientName.trim()) {
      toast.error("Please enter client name");
      return;
    }
    const base = Number(newInv.baseAmount);
    if (isNaN(base) || base <= 0) {
      toast.error("Base amount must be greater than zero");
      return;
    }
    const gst = Math.round(base * 0.05);
    const total = base + gst;
    const created: Invoice = {
      id: `INV-${Date.now().toString().slice(-4)}`,
      invoiceNo: `INV-2026-00${Math.floor(50 + Math.random() * 50)}`,
      clientName: newInv.clientName,
      unitNo: newInv.unitNo,
      project: newInv.project,
      date: new Date().toISOString().slice(0, 10),
      dueDate: newInv.dueDate,
      baseAmount: base,
      gstAmount: gst,
      totalAmount: total,
      status: "Unpaid",
    };
    setInvoices([created, ...invoices]);
    toast.success(`Tax Demand Invoice #${created.invoiceNo} generated!`);
    setModal(false);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="inline-flex size-8 sm:size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md shrink-0">
              <FileText className="size-4 sm:size-5" />
            </span>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-foreground">
              Invoices & Demand Notes
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-text-secondary line-clamp-2 sm:line-clamp-none">
            Generate and dispatch GST tax demand notes mapped to construction milestone certifications.
          </p>
        </div>

        <div className="w-full sm:w-auto">
          <Button
            size="sm"
            onClick={() => setModal(true)}
            className="w-full sm:w-auto h-9 gap-1.5 text-xs bg-brand text-white shadow-sm justify-center"
          >
            <Plus className="size-3.5" /> Raise Demand Invoice
          </Button>
        </div>
      </div>

      <Card className="p-3.5 sm:p-5 bg-card border border-border shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-border/60 gap-2.5">
          <div className="flex items-center justify-between">
            <h2 className="text-xs sm:text-sm font-semibold text-foreground">Tax Invoices Register</h2>
            <span className="text-[10px] sm:hidden text-text-muted flex items-center gap-1 font-normal">Swipe horizontally →</span>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 size-4 text-text-muted" />
            <Input
              placeholder="Search invoice or client..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-8.5 text-xs"
            />
          </div>
        </div>

        <div className="overflow-x-auto mt-3 -mx-3.5 px-3.5 sm:mx-0 sm:px-0">
          <table className="w-full text-xs sm:text-sm text-left min-w-[900px] whitespace-nowrap">
            <thead className="bg-muted/60 text-text-secondary uppercase tracking-wider text-[11px] border-b border-border">
              <tr>
                <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">Invoice No</th>
                <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">Buyer Name</th>
                <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">Unit & Project</th>
                <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">Base (₹)</th>
                <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">GST (5%)</th>
                <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">Total Payable</th>
                <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">Due Date</th>
                <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">Status</th>
                <th className="py-2.5 px-3.5 font-semibold text-right whitespace-nowrap">Print</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-foreground font-medium">
              {filtered.map((inv) => (
                <tr key={inv.id} className="hover:bg-muted/40 transition-colors">
                  <td className="py-3 px-3.5 font-mono font-bold text-brand whitespace-nowrap">{inv.invoiceNo}</td>
                  <td className="py-3 px-3.5 font-semibold text-foreground whitespace-nowrap">{inv.clientName}</td>
                  <td className="py-3 px-3.5 text-text-secondary whitespace-nowrap">
                    <span>{inv.unitNo}</span> - <span className="text-text-muted">{inv.project}</span>
                  </td>
                  <td className="py-3 px-3.5 whitespace-nowrap">₹{inv.baseAmount.toLocaleString()}</td>
                  <td className="py-3 px-3.5 text-text-muted whitespace-nowrap">₹{inv.gstAmount.toLocaleString()}</td>
                  <td className="py-3 px-3.5 font-bold text-foreground whitespace-nowrap">₹{inv.totalAmount.toLocaleString()}</td>
                  <td className="py-3 px-3.5 text-text-muted whitespace-nowrap">{inv.dueDate}</td>
                  <td className="py-3 px-3.5 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-[10.5px] font-semibold ${
                        inv.status === "Paid"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : inv.status === "Overdue"
                          ? "bg-rose-50 text-rose-700 border border-rose-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3 px-3.5 text-right whitespace-nowrap">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toast.success(`Printing Demand Note #${inv.invoiceNo}...`)}
                      className="size-7 p-0 text-text-muted hover:text-brand"
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

      <Dialog open={modal} onOpenChange={setModal}>
        <DialogContent className="w-[94vw] sm:max-w-xl md:max-w-2xl lg:max-w-3xl max-h-[90vh] p-6 sm:p-8 rounded-2xl shadow-2xl flex flex-col bg-card border-border overflow-hidden">
          <DialogHeader className="pb-3 border-b border-border shrink-0">
            <DialogTitle className="text-lg sm:text-xl font-bold flex items-center gap-2.5 text-foreground">
              <span className="p-2 rounded-xl bg-brand/10 text-brand">
                <FileText className="size-5" />
              </span>
              Raise Milestone Demand Invoice
            </DialogTitle>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Generate an official GST compliant tax demand invoice tied to a construction milestone.
            </p>
          </DialogHeader>

          <form onSubmit={handleCreate} className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
              <div>
                <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Client Full Name *</Label>
                <Input
                  required
                  value={newInv.clientName}
                  onChange={(e) => setNewInv({ ...newInv, clientName: e.target.value })}
                  className="h-10 sm:h-11 text-sm rounded-xl"
                  placeholder="e.g. Ramesh Chandra Verma"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Unit Number *</Label>
                  <Input
                    required
                    value={newInv.unitNo}
                    onChange={(e) => setNewInv({ ...newInv, unitNo: e.target.value })}
                    className="h-10 sm:h-11 text-sm rounded-xl"
                    placeholder="e.g. Tower A-802"
                  />
                </div>
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Destination Project *</Label>
                  <Input
                    required
                    value={newInv.project}
                    onChange={(e) => setNewInv({ ...newInv, project: e.target.value })}
                    className="h-10 sm:h-11 text-sm rounded-xl"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Base Milestone Amount (₹) *</Label>
                  <Input
                    type="number"
                    min={1}
                    required
                    value={newInv.baseAmount}
                    onChange={(e) => setNewInv({ ...newInv, baseAmount: Number(e.target.value) })}
                    className="h-10 sm:h-11 text-sm rounded-xl font-semibold"
                  />
                </div>
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Due Date *</Label>
                  <Input
                    type="date"
                    required
                    value={newInv.dueDate}
                    onChange={(e) => setNewInv({ ...newInv, dueDate: e.target.value })}
                    className="h-10 sm:h-11 text-sm rounded-xl"
                  />
                </div>
              </div>
              <div className="p-4 bg-muted/60 rounded-xl border border-border">
                <p className="text-xs sm:text-sm text-foreground/80">
                  GST @ 5% (<span className="font-semibold text-brand">₹{Math.round(newInv.baseAmount * 0.05).toLocaleString()}</span>) will automatically be appended. Total Payable: <span className="font-bold text-emerald-600">₹{(newInv.baseAmount * 1.05).toLocaleString()}</span>
                </p>
              </div>
            </div>

            <DialogFooter className="pt-3 border-t border-border shrink-0 gap-2">
              <Button type="button" variant="outline" onClick={() => setModal(false)} className="rounded-xl h-10 px-5 text-sm">
                Cancel
              </Button>
              <Button type="submit" className="bg-brand hover:bg-brand/90 text-white rounded-xl h-10 px-6 text-sm font-semibold shadow-md">
                Issue Invoice
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
