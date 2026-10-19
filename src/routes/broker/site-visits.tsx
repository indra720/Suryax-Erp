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
    scheduledDate: new Date().toISOString().split("T")[0],
    timeSlot: "11:00 AM",
    cabRequested: true,
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVisit.clientName || !newVisit.phone) {
      toast.error("Please fill in client details");
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
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-muted/50 border-b border-border text-text-secondary font-semibold">
              <tr>
                <th className="py-3 px-4">Client Name & Contact</th>
                <th className="py-3 px-4">Project Destination</th>
                <th className="py-3 px-4">Schedule Date & Time</th>
                <th className="py-3 px-4">Cab Facility</th>
                <th className="py-3 px-4">Assigned Escort</th>
                <th className="py-3 px-4">Booking Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {visits.map((v) => (
                <tr key={v.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-foreground">{v.clientName}</p>
                    <p className="text-[11px] text-text-secondary">{v.phone}</p>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-foreground">{v.projectName}</td>
                  <td className="py-3.5 px-4">
                    <span className="font-medium text-foreground">{v.scheduledDate}</span>
                    <span className="text-[11px] text-text-muted block">{v.timeSlot}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    {v.cabRequested ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-600 bg-blue-500/10 px-2 py-0.5 rounded-full">
                        <Car className="size-3" /> VIP Cab Dispatched
                      </span>
                    ) : (
                      <span className="text-[11px] text-text-muted">Own Transport</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-foreground">{v.escortExecutive}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
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
        <DialogContent className="max-w-md bg-card text-foreground border-border">
          <DialogHeader>
            <DialogTitle>Book Client Site Visit & Escort</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreate} className="space-y-3.5 py-2">
            <div>
              <Label className="text-xs">Client Full Name</Label>
              <Input
                placeholder="Client Name"
                value={newVisit.clientName}
                onChange={(e) => setNewVisit({ ...newVisit, clientName: e.target.value })}
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
                <Label className="text-xs">Destination Project</Label>
                <Input
                  value={newVisit.projectName}
                  onChange={(e) => setNewVisit({ ...newVisit, projectName: e.target.value })}
                  className="h-9 text-xs mt-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Visit Date</Label>
                <Input
                  type="date"
                  value={newVisit.scheduledDate}
                  onChange={(e) => setNewVisit({ ...newVisit, scheduledDate: e.target.value })}
                  className="h-9 text-xs mt-1"
                />
              </div>
              <div>
                <Label className="text-xs">Time Slot</Label>
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
                Request Cab & Visit
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
