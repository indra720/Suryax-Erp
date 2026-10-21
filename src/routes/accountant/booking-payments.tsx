import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Receipt,
  Plus,
  Search,
  Filter,
  Download,
  Printer,
  Calendar,
  CheckCircle,
  Clock,
  Eye,
} from "lucide-react";
import { initialBookingPayments, type BookingPayment } from "@/lib/services/accountant";
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

export const Route = createFileRoute("/accountant/booking-payments")({
  head: () => ({
    meta: [
      { title: "Booking Payments & Receipts | Vrindavan Accounts" },
      { name: "description", content: "Customer payment register, tax receipts and bank verification." },
    ],
  }),
  component: BookingPaymentsPage,
});

export function BookingPaymentsPage() {
  const [payments, setPayments] = useState<BookingPayment[]>(initialBookingPayments);
  const [search, setSearch] = useState("");
  const [modeFilter, setModeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedReceipt, setSelectedReceipt] = useState<BookingPayment | null>(null);

  const filtered = payments.filter((p) => {
    const matchSearch =
      p.clientName.toLowerCase().includes(search.toLowerCase()) ||
      p.receiptNo.toLowerCase().includes(search.toLowerCase()) ||
      p.unitNo.toLowerCase().includes(search.toLowerCase());
    const matchMode = modeFilter === "All" || p.paymentMode === modeFilter;
    const matchStatus = statusFilter === "All" || p.status === statusFilter;
    return matchSearch && matchMode && matchStatus;
  });

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="inline-flex size-8 sm:size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md shrink-0">
              <Receipt className="size-4 sm:size-5" />
            </span>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-foreground">
              Booking Payments & Official Receipts
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-text-secondary line-clamp-2 sm:line-clamp-none">
            Master register of all buyer installments, token advances and official stamped RERA receipts.
          </p>
        </div>

        <div className="w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.success("Exporting Receipts Register (Excel)...")}
            className="w-full sm:w-auto h-9 gap-1.5 text-xs border-border justify-center"
          >
            <Download className="size-3.5" /> Export Receipts (CSV)
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-3.5 sm:p-4 bg-card border border-border">
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-2.5 size-4 text-text-muted" />
            <Input
              placeholder="Search by receipt no, buyer name or flat unit..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-8.5 sm:h-9 text-xs"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Select value={modeFilter} onValueChange={setModeFilter}>
              <SelectTrigger className="flex-1 sm:w-[140px] h-8.5 sm:h-9 text-xs">
                <SelectValue placeholder="Payment Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Modes</SelectItem>
                <SelectItem value="NEFT/RTGS">NEFT / RTGS</SelectItem>
                <SelectItem value="Cheque">Cheque</SelectItem>
                <SelectItem value="UPI">UPI</SelectItem>
                <SelectItem value="Demand Draft">Demand Draft</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="flex-1 sm:w-[140px] h-8.5 sm:h-9 text-xs">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Cleared">Cleared</SelectItem>
                <SelectItem value="Pending Clearance">Pending</SelectItem>
                <SelectItem value="Bounced">Bounced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card className="p-3.5 sm:p-5 bg-card border border-border shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-border/60">
          <h2 className="text-xs sm:text-sm font-semibold text-foreground">Payment Transactions</h2>
          <span className="text-[10px] sm:hidden text-text-muted flex items-center gap-1 font-normal">Swipe horizontally →</span>
        </div>
        <div className="overflow-x-auto mt-3 -mx-3.5 px-3.5 sm:mx-0 sm:px-0">
          <table className="w-full text-xs text-left min-w-[850px] whitespace-nowrap">
            <thead className="bg-muted/60 text-text-secondary uppercase tracking-wider text-[11px] border-b border-border">
              <tr>
                <th className="py-3 px-3 font-semibold">Receipt Number</th>
                <th className="py-3 px-3 font-semibold">Client Name</th>
                <th className="py-3 px-3 font-semibold">Unit & Project</th>
                <th className="py-3 px-3 font-semibold">Amount Paid</th>
                <th className="py-3 px-3 font-semibold">Mode</th>
                <th className="py-3 px-3 font-semibold">Bank Reference</th>
                <th className="py-3 px-3 font-semibold">Date</th>
                <th className="py-3 px-3 font-semibold">Status</th>
                <th className="py-3 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-foreground font-medium">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-muted/40 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-brand">{p.receiptNo}</td>
                  <td className="py-3 px-3">
                    <span className="font-semibold block">{p.clientName}</span>
                    <span className="text-[10px] text-text-muted">{p.phone}</span>
                  </td>
                  <td className="py-3 px-3 text-text-secondary">
                    <span className="font-semibold block">{p.unitNo}</span>
                    <span className="text-[10.5px] text-text-muted">{p.project}</span>
                  </td>
                  <td className="py-3 px-3 font-bold text-emerald-600 text-sm">
                    ₹{p.amount.toLocaleString()}
                  </td>
                  <td className="py-3 px-3">
                    <span className="inline-flex px-2 py-0.5 rounded text-[11px] font-semibold bg-brand/10 text-brand">
                      {p.paymentMode}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-[11px] text-text-secondary">{p.bankRef}</td>
                  <td className="py-3 px-3 text-text-muted whitespace-nowrap">{p.date}</td>
                  <td className="py-3 px-3">
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
                  <td className="py-3 px-3 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedReceipt(p)}
                      className="size-7 p-0 text-text-muted hover:text-brand"
                      title="View & Print Receipt"
                    >
                      <Eye className="size-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Printable Receipt Preview Modal */}
      {selectedReceipt && (
        <Dialog open={Boolean(selectedReceipt)} onOpenChange={() => setSelectedReceipt(null)}>
          <DialogContent className="max-w-lg bg-card text-foreground">
            <DialogHeader>
              <DialogTitle className="text-base font-bold flex items-center justify-between border-b pb-2">
                <span>Official Payment Receipt</span>
                <span className="font-mono text-xs text-brand">{selectedReceipt.receiptNo}</span>
              </DialogTitle>
            </DialogHeader>

            <div className="py-3 space-y-4 text-xs">
              <div className="p-3 bg-muted/40 rounded-lg border border-border flex justify-between">
                <div>
                  <h3 className="font-bold text-foreground">VRINDAVAN DEVELOPERS PVT LTD</h3>
                  <p className="text-[11px] text-text-muted">Gomti Nagar, Lucknow, UP</p>
                  <p className="text-[10px] text-text-muted">GSTIN: 09AAACV1294K1Z0 | RERA Approved</p>
                </div>
                <div className="text-right">
                  <span className="text-[10.5px] text-text-muted block">Receipt Date</span>
                  <span className="font-semibold text-foreground">{selectedReceipt.date}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 border rounded-lg">
                <div>
                  <span className="text-[10px] text-text-muted block uppercase font-semibold">Received From</span>
                  <span className="font-bold text-foreground text-sm">{selectedReceipt.clientName}</span>
                  <span className="text-[11px] text-text-secondary block">{selectedReceipt.phone}</span>
                </div>
                <div>
                  <span className="text-[10px] text-text-muted block uppercase font-semibold">Unit Allotment</span>
                  <span className="font-bold text-foreground text-sm">{selectedReceipt.unitNo}</span>
                  <span className="text-[11px] text-brand block">{selectedReceipt.project}</span>
                </div>
              </div>

              <div className="p-4 bg-emerald-50/60 rounded-lg border border-emerald-200 flex justify-between items-center">
                <div>
                  <span className="text-xs text-emerald-800 block font-medium">Amount Received</span>
                  <span className="text-xl font-extrabold text-emerald-700">
                    ₹{selectedReceipt.amount.toLocaleString()}
                  </span>
                </div>
                <div className="text-right text-[11px] text-emerald-800">
                  <span className="block font-semibold">Mode: {selectedReceipt.paymentMode}</span>
                  <span className="font-mono">{selectedReceipt.bankRef}</span>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" size="sm" onClick={() => setSelectedReceipt(null)}>
                Close
              </Button>
              <Button
                size="sm"
                onClick={() => toast.success("Printing Official Receipt Document...")}
                className="bg-brand text-white gap-1.5"
              >
                <Printer className="size-3.5" /> Print Tax Receipt
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
