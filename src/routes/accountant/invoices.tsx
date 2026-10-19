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
    if (!newInv.clientName) {
      toast.error("Please enter client name");
      return;
    }
    const base = Number(newInv.baseAmount);
    const gst = Math.round(base * 0.05);
    const total = base + gst;
    const created: Invoice = {
      id: `INV-${Date.now().toString().slice(-4)}`,
      invoiceNo: `INV-2026-00${Math.floor(50 + Math.random() * 50)}`,
      clientName: newInv.clientName,
      unitNo: newInv.unitNo,
      project: newInv.project,
      date: new Date().toISOString().split("T")[0],
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
          <div className="flex items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
              <FileText className="size-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Invoices & Construction Demand Notes
            </h1>
          </div>
          <p className="mt-1 text-xs text-text-secondary">
            Generate and dispatch GST tax demand notes mapped to construction milestone certifications.
          </p>
        </div>

        <Button
          size="sm"
          onClick={() => setModal(true)}
          className="h-9 gap-1.5 text-xs bg-brand text-white shadow-sm"
        >
          <Plus className="size-3.5" /> Raise Demand Invoice
        </Button>
      </div>

      <Card className="p-5 bg-card border border-border shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-border/60">
          <h2 className="text-sm font-semibold text-foreground">Tax Invoices Register</h2>
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 size-4 text-text-muted" />
            <Input
              placeholder="Search invoice or client..."
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
                <th className="py-2.5 px-3 font-semibold">Invoice No</th>
                <th className="py-2.5 px-3 font-semibold">Buyer Name</th>
                <th className="py-2.5 px-3 font-semibold">Unit & Project</th>
                <th className="py-2.5 px-3 font-semibold">Base (₹)</th>
                <th className="py-2.5 px-3 font-semibold">GST (5%)</th>
                <th className="py-2.5 px-3 font-semibold">Total Payable</th>
                <th className="py-2.5 px-3 font-semibold">Due Date</th>
                <th className="py-2.5 px-3 font-semibold">Status</th>
                <th className="py-2.5 px-3 font-semibold text-right">Print</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-foreground font-medium">
              {filtered.map((inv) => (
                <tr key={inv.id} className="hover:bg-muted/40 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-brand">{inv.invoiceNo}</td>
                  <td className="py-2.5 px-3 font-semibold text-foreground">{inv.clientName}</td>
                  <td className="py-2.5 px-3 text-text-secondary">
                    <span>{inv.unitNo}</span> - <span className="text-text-muted">{inv.project}</span>
                  </td>
                  <td className="py-2.5 px-3">₹{inv.baseAmount.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-text-muted">₹{inv.gstAmount.toLocaleString()}</td>
                  <td className="py-2.5 px-3 font-bold text-foreground">₹{inv.totalAmount.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-text-muted">{inv.dueDate}</td>
                  <td className="py-2.5 px-3">
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
                  <td className="py-2.5 px-3 text-right">
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
        <DialogContent className="max-w-md bg-card text-foreground">
          <DialogHeader>
            <DialogTitle className="text-base font-bold flex items-center gap-2">
              <FileText className="size-4 text-brand" /> Raise Milestone Demand Invoice
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCreate} className="space-y-3 py-2 text-xs">
            <div>
              <Label className="text-xs">Client Full Name</Label>
              <Input
                required
                value={newInv.clientName}
                onChange={(e) => setNewInv({ ...newInv, clientName: e.target.value })}
                className="h-8 text-xs mt-1"
                placeholder="e.g. Ramesh Chandra Verma"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs">Unit No</Label>
                <Input
                  value={newInv.unitNo}
                  onChange={(e) => setNewInv({ ...newInv, unitNo: e.target.value })}
                  className="h-8 text-xs mt-1"
                />
              </div>
              <div>
                <Label className="text-xs">Project</Label>
                <Input
                  value={newInv.project}
                  onChange={(e) => setNewInv({ ...newInv, project: e.target.value })}
                  className="h-8 text-xs mt-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs">Base Milestone Amount (₹)</Label>
                <Input
                  type="number"
                  value={newInv.baseAmount}
                  onChange={(e) => setNewInv({ ...newInv, baseAmount: Number(e.target.value) })}
                  className="h-8 text-xs mt-1"
                />
              </div>
              <div>
                <Label className="text-xs">Due Date</Label>
                <Input
                  type="date"
                  value={newInv.dueDate}
                  onChange={(e) => setNewInv({ ...newInv, dueDate: e.target.value })}
                  className="h-8 text-xs mt-1"
                />
              </div>
            </div>
            <p className="text-[11px] text-text-muted bg-muted p-2 rounded">
              GST @ 5% (₹{Math.round(newInv.baseAmount * 0.05).toLocaleString()}) will automatically be appended. Total: ₹{(newInv.baseAmount * 1.05).toLocaleString()}
            </p>
            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setModal(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-brand text-white">
                Issue Invoice
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
