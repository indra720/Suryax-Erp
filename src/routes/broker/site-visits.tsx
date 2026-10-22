import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  MapPin,
  Calendar,
  Clock,
  Car,
  Plus,
  Search,
  CheckCircle,
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
import { brokerService, type BrokerSiteVisit } from "@/lib/services/broker";
import { toast } from "sonner";

export const Route = createFileRoute("/broker/site-visits")({
  head: () => ({
    meta: [
      { title: "Client Site Visit Requests | Vrindavan Broker" },
      { name: "description", content: "Schedule site inspections and complimentary client escort vehicles." },
    ],
  }),
  component: BrokerSiteVisitsPage,
});

export function BrokerSiteVisitsPage() {
  const [visits, setVisits] = useState<BrokerSiteVisit[]>(brokerService.getSiteVisits());
  const [modalOpen, setModalOpen] = useState(false);

  const [newVisit, setNewVisit] = useState({
    clientName: "",
    phone: "",
    projectName: "Vrindavan Heights",
    scheduledDate: new Date().toISOString().slice(0, 10),
    timeSlot: "11:00 AM",
    cabRequested: true,
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVisit.clientName.trim()) {
      toast.error("Please fill in client name");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(newVisit.phone)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }
    const created: BrokerSiteVisit = {
      id: `BSV-${Date.now().toString().slice(-3)}`,
      clientName: newVisit.clientName,
      phone: newVisit.phone,
      projectName: newVisit.projectName,
      scheduledDate: newVisit.scheduledDate,
      timeSlot: newVisit.timeSlot,
      cabRequested: newVisit.cabRequested,
      status: "Awaiting Confirmation",
      escortExecutive: "Rajesh Malhotra",
    };
    setVisits([created, ...visits]);
    toast.success(`Site visit requested for ${created.clientName}!`);
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
              <MapPin className="size-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Client Site Visit Requests
            </h1>
          </div>
          <p className="mt-1 text-xs text-text-secondary">
            Complimentary VIP cab logistics and dedicated sales manager escorts for your clients.
          </p>
        </div>

        <Button
          onClick={() => setModalOpen(true)}
          size="sm"
          className="h-9 gap-1.5 text-xs bg-brand text-white shadow-sm"
        >
          <Plus className="size-3.5" /> Book Client Visit
        </Button>
      </div>

      <Card className="bg-card border border-border overflow-hidden">
        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <table className="w-full text-xs sm:text-sm text-left border-collapse min-w-[850px] whitespace-nowrap">
            <thead className="bg-muted/70 border-b border-border text-text-secondary font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4 font-semibold whitespace-nowrap">Client Name & Contact</th>
                <th className="py-3 px-4 font-semibold whitespace-nowrap">Project Destination</th>
                <th className="py-3 px-4 font-semibold whitespace-nowrap">Schedule Date & Time</th>
                <th className="py-3 px-4 font-semibold whitespace-nowrap">Cab Facility</th>
                <th className="py-3 px-4 font-semibold whitespace-nowrap">Assigned Escort</th>
                <th className="py-3 px-4 font-semibold whitespace-nowrap text-center">Booking Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {visits.map((v) => (
                <tr key={v.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <p className="font-bold text-foreground">{v.clientName}</p>
                    <p className="text-[11px] text-text-secondary">{v.phone}</p>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-foreground whitespace-nowrap">{v.projectName}</td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="font-medium text-foreground">{v.scheduledDate}</span>
                    <span className="text-[11px] text-text-muted block">{v.timeSlot}</span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {v.cabRequested ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-600 bg-blue-500/10 px-2 py-0.5 rounded-full">
                        <Car className="size-3" /> VIP Cab Dispatched
                      </span>
                    ) : (
                      <span className="text-[11px] text-text-muted">Own Transport</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-foreground whitespace-nowrap">{v.escortExecutive}</td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        v.status === "Confirmed"
                          ? "bg-emerald-500/10 text-emerald-600"
                          : "bg-amber-500/10 text-amber-600"
                      }`}
                    >
                      {v.status}
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
        <DialogContent className="w-[95vw] sm:max-w-xl md:max-w-2xl lg:max-w-3xl max-h-[90vh] p-0 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col bg-card border-border overflow-hidden">
          <DialogHeader className="px-5 sm:px-6 pt-5 pb-4 border-b border-border shrink-0 text-left">
            <DialogTitle className="text-lg sm:text-xl font-bold flex items-center gap-2.5 text-foreground">
              Book Client Site Visit & Escort
            </DialogTitle>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Schedule site inspection, allocate complimentary developer cab pickup, and assign relationship manager.
            </p>
          </DialogHeader>

          <form onSubmit={handleCreate} className="flex flex-col flex-1 min-h-0 overflow-hidden">
            <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4 space-y-4 scrollbar-thin">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Client Full Name</Label>
                  <Input
                    placeholder="Full legal name"
                    value={newVisit.clientName}
                    onChange={(e) => setNewVisit({ ...newVisit, clientName: e.target.value })}
                    className="h-10 sm:h-11 text-sm rounded-xl"
                    required
                  />
                </div>
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Phone Number (10 digits)</Label>
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
                    className="h-10 sm:h-11 text-sm rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Destination Project</Label>
                  <Input
                    placeholder="e.g. Vrindavan Heights"
                    value={newVisit.projectName}
                    onChange={(e) => setNewVisit({ ...newVisit, projectName: e.target.value })}
                    className="h-10 sm:h-11 text-sm rounded-xl"
                  />
                </div>
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Visit Date</Label>
                  <Input
                    type="date"
                    value={newVisit.scheduledDate}
                    onChange={(e) => setNewVisit({ ...newVisit, scheduledDate: e.target.value })}
                    className="h-10 sm:h-11 text-sm rounded-xl"
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Preferred Time Slot</Label>
                <Input
                  placeholder="e.g. 11:30 AM - 01:00 PM"
                  value={newVisit.timeSlot}
                  onChange={(e) => setNewVisit({ ...newVisit, timeSlot: e.target.value })}
                  className="h-10 sm:h-11 text-sm rounded-xl"
                />
              </div>
            </div>

            <DialogFooter className="px-5 sm:px-6 py-3.5 border-t border-border bg-muted/20 shrink-0 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3">
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)} className="w-full sm:w-auto rounded-xl h-10 px-5 text-sm">
                Cancel
              </Button>
              <Button type="submit" className="w-full sm:w-auto bg-brand hover:bg-brand/90 text-white rounded-xl h-10 px-6 text-sm font-semibold shadow-md">
                Request Cab & Visit
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
