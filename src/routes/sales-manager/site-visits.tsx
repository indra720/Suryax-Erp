import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  MapPin,
  Search,
  Plus,
  Calendar,
  Clock,
  PhoneCall,
  Car,
  CheckCircle,
  XCircle,
  AlertCircle,
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
import { salesManagerService, type SiteVisit } from "@/lib/services/sales-manager";
import { toast } from "sonner";

export const Route = createFileRoute("/sales-manager/site-visits")({
  head: () => ({
    meta: [
      { title: "Site Visits Operations | Vrindavan Sales" },
      { name: "description", content: "Schedule and manage customer site visits and transport logistics." },
    ],
  }),
  component: SalesSiteVisitsPage,
});

export function SalesSiteVisitsPage() {
  const [visits, setVisits] = useState<SiteVisit[]>(salesManagerService.getSiteVisits());
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const [newVisit, setNewVisit] = useState({
    customerName: "",
    phone: "",
    project: "Vrindavan Heights",
    preferredUnit: "3 BHK High-Rise",
    date: new Date().toISOString().split("T")[0],
    timeSlot: "11:00 AM",
    salesExecutive: "Rajesh Malhotra",
    transportProvided: "Complimentary Cab" as SiteVisit["transportProvided"],
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVisit.customerName || !newVisit.phone) {
      toast.error("Please fill in customer name and phone");
      return;
    }
    const created: SiteVisit = {
      id: `SV-${Date.now().toString().slice(-3)}`,
      customerName: newVisit.customerName,
      phone: newVisit.phone,
      project: newVisit.project,
      preferredUnit: newVisit.preferredUnit,
      date: newVisit.date,
      timeSlot: newVisit.timeSlot,
      salesExecutive: newVisit.salesExecutive,
      transportProvided: newVisit.transportProvided,
      status: "Scheduled",
      leadRating: "Hot",
    };
    setVisits([created, ...visits]);
    toast.success(`Site visit booked for ${created.customerName} on ${created.date}!`);
    setModalOpen(false);
  };

  const updateStatus = (id: string, status: SiteVisit["status"]) => {
    setVisits(visits.map((v) => (v.id === id ? { ...v, status } : v)));
    toast.success(`Visit marked as ${status}`);
  };

  const filtered = visits.filter((v) => {
    const matchStatus = filter === "All" || v.status === filter;
    const matchSearch =
      v.customerName.toLowerCase().includes(search.toLowerCase()) ||
      v.phone.includes(search) ||
      v.project.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
              <MapPin className="size-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Site Visits Operations
            </h1>
          </div>
          <p className="mt-1 text-xs text-text-secondary">
            Manage incoming site escort schedules, transport dispatch, and prospective buyer tours.
          </p>
        </div>

        <Button
          onClick={() => setModalOpen(true)}
          size="sm"
          className="h-9 gap-1.5 text-xs bg-brand text-white shadow-sm"
        >
          <Plus className="size-3.5" /> Schedule Site Visit
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-3 bg-card border border-border flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 size-4 text-text-muted" />
          <Input
            placeholder="Search by visitor, phone, or project..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 text-xs"
          />
        </div>

        <div className="flex items-center gap-2">
          {["All", "Scheduled", "Completed", "Cancelled"].map((st) => (
            <Button
              key={st}
              variant={filter === st ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(st)}
              className="h-8 text-xs"
            >
              {st}
            </Button>
          ))}
        </div>
      </Card>

      {/* Visits Table */}
      <Card className="bg-card border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-muted/50 border-b border-border text-text-secondary font-semibold">
              <tr>
                <th className="py-3 px-4">Visitor & Phone</th>
                <th className="py-3 px-4">Project & Unit</th>
                <th className="py-3 px-4">Date & Slot</th>
                <th className="py-3 px-4">Transport</th>
                <th className="py-3 px-4">Assigned Executive</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((v) => (
                <tr key={v.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-foreground">{v.customerName}</p>
                    <p className="text-[11px] text-text-secondary">{v.phone}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-foreground">{v.project}</p>
                    <p className="text-[11px] text-text-muted">{v.preferredUnit}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 font-medium text-foreground">
                      <Calendar className="size-3.5 text-text-muted" /> {v.date}
                    </div>
                    <span className="text-[11px] text-text-secondary flex items-center gap-1 mt-0.5">
                      <Clock className="size-3 text-text-muted" /> {v.timeSlot}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-blue-500/10 text-blue-600">
                      <Car className="size-3" /> {v.transportProvided}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-foreground">{v.salesExecutive}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        v.status === "Completed"
                          ? "bg-emerald-500/10 text-emerald-600"
                          : v.status === "Scheduled"
                          ? "bg-amber-500/10 text-amber-600"
                          : "bg-rose-500/10 text-rose-600"
                      }`}
                    >
                      {v.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {v.status === "Scheduled" && (
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateStatus(v.id, "Completed")}
                          className="h-7 px-2 text-[11px] text-emerald-600 hover:text-emerald-700"
                        >
                          Mark Completed
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => updateStatus(v.id, "Cancelled")}
                          className="h-7 px-2 text-[11px] text-rose-600 hover:text-rose-700"
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Schedule Visit Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md bg-card text-foreground border-border">
          <DialogHeader>
            <DialogTitle>Schedule Client Site Visit</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreate} className="space-y-3.5 py-2">
            <div>
              <Label className="text-xs">Visitor Name</Label>
              <Input
                placeholder="Full Name"
                value={newVisit.customerName}
                onChange={(e) => setNewVisit({ ...newVisit, customerName: e.target.value })}
                className="h-9 text-xs mt-1"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Phone Number</Label>
                <Input
                  placeholder="+91 XXXXX XXXXX"
                  value={newVisit.phone}
                  onChange={(e) => setNewVisit({ ...newVisit, phone: e.target.value })}
                  className="h-9 text-xs mt-1"
                  required
                />
              </div>
              <div>
                <Label className="text-xs">Project</Label>
                <Input
                  value={newVisit.project}
                  onChange={(e) => setNewVisit({ ...newVisit, project: e.target.value })}
                  className="h-9 text-xs mt-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Visit Date</Label>
                <Input
                  type="date"
                  value={newVisit.date}
                  onChange={(e) => setNewVisit({ ...newVisit, date: e.target.value })}
                  className="h-9 text-xs mt-1"
                />
              </div>
              <div>
                <Label className="text-xs">Preferred Time</Label>
                <Input
                  value={newVisit.timeSlot}
                  onChange={(e) => setNewVisit({ ...newVisit, timeSlot: e.target.value })}
                  className="h-9 text-xs mt-1"
                />
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button type="button" variant="outline" size="sm" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-brand text-white">
                Confirm Booking
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
