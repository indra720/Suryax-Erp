import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  BookMarked,
  Search,
  Plus,
  Calendar,
  IndianRupee,
  Building,
  CheckCircle,
  FileText,
  User,
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
import { salesManagerService, type Booking } from "@/lib/services/sales-manager";
import { toast } from "sonner";

export const Route = createFileRoute("/sales-manager/bookings")({
  head: () => ({
    meta: [
      { title: "Bookings & Allotments | Vrindavan Sales" },
      { name: "description", content: "Master ledger of property bookings, tokens, and verified allotments." },
    ],
  }),
  component: SalesBookingsPage,
});

export function SalesBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(salesManagerService.getBookings());
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const [newBooking, setNewBooking] = useState({
    customerName: "",
    customerMobile: "",
    project: "Vrindavan Heights",
    tower: "Tower 3",
    unitNo: "1502",
    unitType: "3 BHK Premium",
    agreementValue: 9500000,
    bookingAmountPaid: 500000,
    paymentMode: "NEFT/RTGS" as Booking["paymentMode"],
    salesExecutive: "Rajesh Malhotra",
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBooking.customerName.trim() || !newBooking.unitNo.trim()) {
      toast.error("Please fill in customer and unit details");
      return;
    }
    if (newBooking.customerMobile && !/^[6-9]\d{9}$/.test(newBooking.customerMobile)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }
    if (newBooking.agreementValue <= 0 || newBooking.bookingAmountPaid <= 0) {
      toast.error("Please enter valid positive booking and agreement amounts");
      return;
    }
    const created: Booking = {
      id: `BK-2026-${Date.now().toString().slice(-3)}`,
      bookingNumber: `VRN-${(newBooking.project.split(" ")[1] || "PRJ").toUpperCase()}-${newBooking.unitNo}`,
      customerName: newBooking.customerName,
      project: newBooking.project,
      tower: newBooking.tower,
      unitNo: newBooking.unitNo,
      unitType: newBooking.unitType,
      agreementValue: Number(newBooking.agreementValue),
      bookingAmountPaid: Number(newBooking.bookingAmountPaid),
      paymentMode: newBooking.paymentMode,
      bookingDate: new Date().toISOString().slice(0, 10),
      salesExecutive: newBooking.salesExecutive,
      status: "Confirmed",
    };
    setBookings([created, ...bookings]);
    toast.success(`Booking ${created.bookingNumber} confirmed for ${created.customerName}!`);
    setModalOpen(false);
  };

  const filtered = bookings.filter(
    (b) =>
      b.customerName.toLowerCase().includes(search.toLowerCase()) ||
      b.bookingNumber.toLowerCase().includes(search.toLowerCase()) ||
      b.unitNo.includes(search)
  );

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="inline-flex size-8 sm:size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md shrink-0">
              <BookMarked className="size-4 sm:size-5" />
            </span>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-foreground">
              Bookings & Allotments
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-text-secondary line-clamp-2 sm:line-clamp-none">
            Verified unit bookings, token money receipts, and agreement values.
          </p>
        </div>

        <div className="w-full sm:w-auto">
          <Button
            onClick={() => setModalOpen(true)}
            size="sm"
            className="w-full sm:w-auto h-9 gap-1.5 text-xs bg-brand text-white shadow-sm"
          >
            <Plus className="size-3.5" /> New Unit Booking
          </Button>
        </div>
      </div>

      {/* Search and Summary */}
      <Card className="p-3 sm:p-3.5 bg-card border border-border flex flex-col sm:flex-row items-center justify-between gap-2.5">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 size-4 text-text-muted" />
          <Input
            placeholder="Search booking number, buyer, or unit..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-8.5 sm:h-9 text-xs"
          />
        </div>
        <div className="flex items-center justify-between w-full sm:w-auto text-xs text-text-secondary font-medium">
          <span className="text-[10px] sm:hidden text-text-muted flex items-center gap-1 font-normal">Swipe horizontally →</span>
          <span>Total: <span className="font-bold text-foreground">{bookings.length} Units</span></span>
        </div>
      </Card>

      {/* Bookings Table */}
      <Card className="bg-card border border-border overflow-hidden">
        <div className="overflow-x-auto -mx-3.5 px-3.5 sm:mx-0 sm:px-0">
          <table className="w-full text-xs sm:text-sm text-left border-collapse min-w-[920px] whitespace-nowrap">
            <thead className="bg-muted/70 border-b border-border text-text-secondary font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4 font-semibold whitespace-nowrap">Booking Ref</th>
                <th className="py-3 px-4 font-semibold whitespace-nowrap">Buyer Name</th>
                <th className="py-3 px-4 font-semibold whitespace-nowrap">Project & Unit</th>
                <th className="py-3 px-4 font-semibold whitespace-nowrap text-right">Agreement Value</th>
                <th className="py-3 px-4 font-semibold whitespace-nowrap text-right">Token Paid</th>
                <th className="py-3 px-4 font-semibold whitespace-nowrap">Booking Date</th>
                <th className="py-3 px-4 font-semibold whitespace-nowrap">Executive</th>
                <th className="py-3 px-4 font-semibold whitespace-nowrap text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((b) => (
                <tr key={b.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-brand whitespace-nowrap">{b.bookingNumber}</td>
                  <td className="py-3.5 px-4 font-bold text-foreground whitespace-nowrap">{b.customerName}</td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <p className="font-semibold text-foreground">{b.project}</p>
                    <p className="text-[11px] text-text-muted">
                      {b.tower} • Unit {b.unitNo} ({b.unitType})
                    </p>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-foreground text-right whitespace-nowrap">
                    ₹{(b.agreementValue / 100000).toFixed(1)} Lakh
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <span className="font-semibold text-emerald-600 block">
                      ₹{(b.bookingAmountPaid / 1000).toFixed(0)}k
                    </span>
                    <span className="text-[10px] text-text-muted">{b.paymentMode}</span>
                  </td>
                  <td className="py-3.5 px-4 text-text-secondary whitespace-nowrap">{b.bookingDate}</td>
                  <td className="py-3.5 px-4 text-foreground font-medium whitespace-nowrap">{b.salesExecutive}</td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-600">
                      <CheckCircle className="size-3" /> {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Booking Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="w-[95vw] sm:max-w-xl md:max-w-2xl max-h-[90vh] p-0 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col bg-card border-border overflow-hidden">
          <DialogHeader className="px-5 sm:px-6 pt-5 pb-4 border-b border-border shrink-0 text-left">
            <DialogTitle className="text-lg sm:text-xl font-bold flex items-center gap-2.5 text-foreground">
              Issue New Property Booking
            </DialogTitle>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Record new buyer registration, unit allocation, and initial token payment details.
            </p>
          </DialogHeader>

          <form onSubmit={handleCreate} className="flex flex-col flex-1 min-h-0 overflow-hidden">
            <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4 space-y-4 scrollbar-thin">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Customer Name</Label>
                  <Input
                    placeholder="Full Legal Name"
                    value={newBooking.customerName}
                    onChange={(e) => setNewBooking({ ...newBooking, customerName: e.target.value })}
                    className="h-10 sm:h-11 text-sm rounded-xl"
                    required
                  />
                </div>
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Customer Mobile (10 digits)</Label>
                  <Input
                    type="tel"
                    maxLength={10}
                    placeholder="10-digit mobile"
                    value={newBooking.customerMobile}
                    onChange={(e) =>
                      setNewBooking({
                        ...newBooking,
                        customerMobile: e.target.value.replace(/\D/g, "").slice(0, 10),
                      })
                    }
                    className="h-10 sm:h-11 text-sm rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Project</Label>
                  <Input
                    value={newBooking.project}
                    onChange={(e) => setNewBooking({ ...newBooking, project: e.target.value })}
                    className="h-10 sm:h-11 text-sm rounded-xl"
                  />
                </div>
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Unit Number</Label>
                  <Input
                    placeholder="e.g. 1402"
                    value={newBooking.unitNo}
                    onChange={(e) => setNewBooking({ ...newBooking, unitNo: e.target.value })}
                    className="h-10 sm:h-11 text-sm rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Agreement Cost (₹ INR)</Label>
                  <Input
                    type="number"
                    value={newBooking.agreementValue}
                    onChange={(e) => setNewBooking({ ...newBooking, agreementValue: Number(e.target.value) })}
                    className="h-10 sm:h-11 text-sm rounded-xl"
                  />
                </div>
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Token Received (₹ INR)</Label>
                  <Input
                    type="number"
                    value={newBooking.bookingAmountPaid}
                    onChange={(e) => setNewBooking({ ...newBooking, bookingAmountPaid: Number(e.target.value) })}
                    className="h-10 sm:h-11 text-sm rounded-xl"
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="px-5 sm:px-6 py-3.5 border-t border-border bg-muted/20 shrink-0 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3">
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)} className="rounded-xl h-10 px-5 text-sm w-full sm:w-auto">
                Cancel
              </Button>
              <Button type="submit" className="bg-brand hover:bg-brand/90 text-white rounded-xl h-10 px-6 text-sm font-semibold shadow-md w-full sm:w-auto">
                Record Booking
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
