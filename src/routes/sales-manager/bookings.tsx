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
    if (!newBooking.customerName || !newBooking.unitNo) {
      toast.error("Please fill in customer and unit details");
      return;
    }
    const created: Booking = {
      id: `BK-2026-${Date.now().toString().slice(-3)}`,
      bookingNumber: `VRN-${newBooking.project.split(" ")[1].toUpperCase()}-${newBooking.unitNo}`,
      customerName: newBooking.customerName,
      project: newBooking.project,
      tower: newBooking.tower,
      unitNo: newBooking.unitNo,
      unitType: newBooking.unitType,
      agreementValue: Number(newBooking.agreementValue),
      bookingAmountPaid: Number(newBooking.bookingAmountPaid),
      paymentMode: newBooking.paymentMode,
      bookingDate: new Date().toISOString().split("T")[0],
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
          <div className="flex items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
              <BookMarked className="size-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Bookings & Allotments Ledger
            </h1>
          </div>
          <p className="mt-1 text-xs text-text-secondary">
            Verified unit bookings, token money receipts, and agreement values.
          </p>
        </div>

        <Button
          onClick={() => setModalOpen(true)}
          size="sm"
          className="h-9 gap-1.5 text-xs bg-brand text-white shadow-sm"
        >
          <Plus className="size-3.5" /> New Unit Booking
        </Button>
      </div>

      {/* Search and Summary */}
      <Card className="p-3 bg-card border border-border flex items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 size-4 text-text-muted" />
          <Input
            placeholder="Search booking number, buyer, or unit..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 text-xs"
          />
        </div>
        <div className="text-xs text-text-secondary font-medium">
          Total Bookings: <span className="font-bold text-foreground">{bookings.length} Units</span>
        </div>
      </Card>

      {/* Bookings Table */}
      <Card className="bg-card border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-muted/50 border-b border-border text-text-secondary font-semibold">
              <tr>
                <th className="py-3 px-4">Booking Ref</th>
                <th className="py-3 px-4">Buyer Name</th>
                <th className="py-3 px-4">Project & Unit</th>
                <th className="py-3 px-4">Agreement Value</th>
                <th className="py-3 px-4">Token Paid</th>
                <th className="py-3 px-4">Booking Date</th>
                <th className="py-3 px-4">Executive</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((b) => (
                <tr key={b.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-brand">{b.bookingNumber}</td>
                  <td className="py-3.5 px-4 font-bold text-foreground">{b.customerName}</td>
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-foreground">{b.project}</p>
                    <p className="text-[11px] text-text-muted">
                      {b.tower} • Unit {b.unitNo} ({b.unitType})
                    </p>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-foreground">
                    ₹{(b.agreementValue / 100000).toFixed(1)} Lakh
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-emerald-600">
                      ₹{(b.bookingAmountPaid / 1000).toFixed(0)}k
                    </span>
                    <span className="text-[10px] text-text-muted block">{b.paymentMode}</span>
                  </td>
                  <td className="py-3.5 px-4 text-text-secondary">{b.bookingDate}</td>
                  <td className="py-3.5 px-4 text-foreground font-medium">{b.salesExecutive}</td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600">
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
        <DialogContent className="max-w-md bg-card text-foreground border-border">
          <DialogHeader>
            <DialogTitle>Issue New Property Booking</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreate} className="space-y-3.5 py-2">
            <div>
              <Label className="text-xs">Customer Name</Label>
              <Input
                placeholder="Full Legal Name"
                value={newBooking.customerName}
                onChange={(e) => setNewBooking({ ...newBooking, customerName: e.target.value })}
                className="h-9 text-xs mt-1"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Project</Label>
                <Input
                  value={newBooking.project}
                  onChange={(e) => setNewBooking({ ...newBooking, project: e.target.value })}
                  className="h-9 text-xs mt-1"
                />
              </div>
              <div>
                <Label className="text-xs">Unit Number</Label>
                <Input
                  placeholder="e.g. 1402"
                  value={newBooking.unitNo}
                  onChange={(e) => setNewBooking({ ...newBooking, unitNo: e.target.value })}
                  className="h-9 text-xs mt-1"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Agreement Cost (INR)</Label>
                <Input
                  type="number"
                  value={newBooking.agreementValue}
                  onChange={(e) => setNewBooking({ ...newBooking, agreementValue: Number(e.target.value) })}
                  className="h-9 text-xs mt-1"
                />
              </div>
              <div>
                <Label className="text-xs">Token Received (INR)</Label>
                <Input
                  type="number"
                  value={newBooking.bookingAmountPaid}
                  onChange={(e) => setNewBooking({ ...newBooking, bookingAmountPaid: Number(e.target.value) })}
                  className="h-9 text-xs mt-1"
                />
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button type="button" variant="outline" size="sm" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-brand text-white">
                Record Booking
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
