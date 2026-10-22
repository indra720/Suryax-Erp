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
    date: new Date().toISOString().slice(0, 10),
    timeSlot: "11:00 AM",
    salesExecutive: "Rajesh Malhotra",
    transportProvided: "Complimentary Cab" as SiteVisit["transportProvided"],
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVisit.customerName.trim()) {
      toast.error("Please fill in customer name");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(newVisit.phone)) {
      toast.error("Please enter a valid 10-digit mobile number");
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
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="inline-flex size-8 sm:size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md shrink-0">
              <MapPin className="size-4 sm:size-5" />
            </span>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-foreground">
              Site Visits Operations
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-text-secondary line-clamp-2 sm:line-clamp-none">
            Manage incoming site escort schedules, transport dispatch, and prospective buyer tours.
          </p>
        </div>

        <div className="w-full sm:w-auto">
          <Button
            onClick={() => setModalOpen(true)}
            size="sm"
            className="w-full sm:w-auto h-9 gap-1.5 text-xs bg-brand text-white shadow-sm"
          >
            <Plus className="size-3.5" /> Schedule Site Visit
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-3 sm:p-3.5 bg-card border border-border flex flex-col sm:flex-row gap-2.5 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 size-4 text-text-muted" />
          <Input
            placeholder="Search by visitor, phone, or project..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-8.5 sm:h-9 text-xs"
          />
        </div>

        <div className="flex items-center justify-between w-full sm:w-auto gap-2">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0 -mx-1 px-1">
            {["All", "Scheduled", "Completed", "Cancelled"].map((st) => (
              <Button
                key={st}
                variant={filter === st ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(st)}
                className="h-8 text-xs shrink-0 whitespace-nowrap"
              >
                {st}
              </Button>
            ))}
          </div>
          <span className="text-[10px] sm:hidden text-text-muted shrink-0">Swipe →</span>
        </div>
      </Card>

      {/* Visits Table */}
      <Card className="bg-card border border-border overflow-hidden">
        <div className="overflow-x-auto -mx-3.5 px-3.5 sm:mx-0 sm:px-0">
          <table className="w-full text-xs sm:text-sm text-left border-collapse min-w-[900px] whitespace-nowrap">
            <thead className="bg-muted/70 border-b border-border text-text-secondary font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4 font-semibold whitespace-nowrap">Visitor & Phone</th>
                <th className="py-3 px-4 font-semibold whitespace-nowrap">Project & Unit</th>
                <th className="py-3 px-4 font-semibold whitespace-nowrap">Date & Slot</th>
                <th className="py-3 px-4 font-semibold whitespace-nowrap">Transport</th>
                <th className="py-3 px-4 font-semibold whitespace-nowrap">Assigned Executive</th>
                <th className="py-3 px-4 font-semibold whitespace-nowrap text-center">Status</th>
                <th className="py-3 px-4 font-semibold whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((v) => (
                <tr key={v.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <p className="font-bold text-foreground">{v.customerName}</p>
                    <p className="text-[11px] text-text-secondary">{v.phone}</p>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <p className="font-semibold text-foreground">{v.project}</p>
                    <p className="text-[11px] text-text-muted">{v.preferredUnit}</p>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 font-medium text-foreground">
                      <Calendar className="size-3.5 text-text-muted" /> {v.date}
                    </div>
                    <span className="text-[11px] text-text-secondary flex items-center gap-1 mt-0.5">
                      <Clock className="size-3 text-text-muted" /> {v.timeSlot}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-blue-500/10 text-blue-600">
                      <Car className="size-3" /> {v.transportProvided}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-foreground whitespace-nowrap">{v.salesExecutive}</td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
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
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
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
        <DialogContent className="w-[95vw] sm:max-w-xl md:max-w-2xl max-h-[90vh] p-0 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col bg-card border-border overflow-hidden">
          <DialogHeader className="px-5 sm:px-6 pt-5 pb-4 border-b border-border shrink-0 text-left">
            <DialogTitle className="text-lg sm:text-xl font-bold flex items-center gap-2.5 text-foreground">
              <span className="p-2 rounded-xl bg-brand/10 text-brand">
                <MapPin className="size-5" />
              </span>
              Schedule Client Site Visit
            </DialogTitle>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Book a guided township inspection tour with complimentary executive cab transport.
            </p>
          </DialogHeader>

          <form onSubmit={handleCreate} className="flex flex-col flex-1 min-h-0 overflow-hidden">
            <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4 space-y-4 scrollbar-thin">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Visitor Full Name *</Label>
                  <Input
                    placeholder="Full Legal Name"
                    value={newVisit.customerName}
                    onChange={(e) => setNewVisit({ ...newVisit, customerName: e.target.value })}
                    className="h-10 sm:h-11 text-sm rounded-xl"
                    required
                  />
                </div>
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Phone Number (10 digits) *</Label>
                  <Input
                    type="tel"
                    maxLength={10}
                    placeholder="10-digit mobile"
                    value={newVisit.phone}
                    onChange={(e) =>
                      setNewVisit({
                        ...newVisit,
                        phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                      })
                    }
                    className="h-10 sm:h-11 text-sm rounded-xl font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Destination Project *</Label>
                  <Input
                    value={newVisit.project}
                    onChange={(e) => setNewVisit({ ...newVisit, project: e.target.value })}
                    className="h-10 sm:h-11 text-sm rounded-xl"
                    required
                  />
                </div>
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Preferred Unit Type</Label>
                  <Input
                    value={newVisit.preferredUnit}
                    onChange={(e) => setNewVisit({ ...newVisit, preferredUnit: e.target.value })}
                    className="h-10 sm:h-11 text-sm rounded-xl"
                    placeholder="e.g. 3 BHK Luxury Villa"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Inspection Date *</Label>
                  <Input
                    type="date"
                    value={newVisit.date}
                    onChange={(e) => setNewVisit({ ...newVisit, date: e.target.value })}
                    className="h-10 sm:h-11 text-sm rounded-xl"
                    required
                  />
                </div>
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Preferred Time Slot *</Label>
                  <Input
                    value={newVisit.timeSlot}
                    onChange={(e) => setNewVisit({ ...newVisit, timeSlot: e.target.value })}
                    className="h-10 sm:h-11 text-sm rounded-xl"
                    placeholder="e.g. 11:00 AM"
                    required
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="px-5 sm:px-6 py-3.5 border-t border-border bg-muted/20 shrink-0 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3">
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)} className="rounded-xl h-10 px-5 text-sm w-full sm:w-auto">
                Cancel
              </Button>
              <Button type="submit" className="bg-brand hover:bg-brand/90 text-white rounded-xl h-10 px-6 text-sm font-semibold shadow-md w-full sm:w-auto">
                Confirm Booking
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
