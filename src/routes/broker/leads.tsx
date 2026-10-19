import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Users,
  Search,
  Plus,
  PhoneCall,
  Mail,
  Calendar,
  Building2,
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
import { brokerService, type BrokerLead } from "@/lib/services/broker";
import { toast } from "sonner";

export const Route = createFileRoute("/broker/leads")({
  head: () => ({
    meta: [
      { title: "My Broker Leads | Vrindavan Channel Partner" },
      { name: "description", content: "Register and track prospective buyer leads submitted by channel partner." },
    ],
  }),
  component: BrokerLeadsPage,
});

export function BrokerLeadsPage() {
  const [leads, setLeads] = useState<BrokerLead[]>(brokerService.getLeads());
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const [newLead, setNewLead] = useState({
    clientName: "",
    phone: "",
    email: "",
    interestedProject: "Vrindavan Heights",
    unitType: "3 BHK Premium",
    budgetRange: "₹85L - ₹1.1 Cr",
    notes: "",
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLead.clientName || !newLead.phone) {
      toast.error("Please fill in client name and contact phone");
      return;
    }
    const created: BrokerLead = {
      id: `BL-${Date.now().toString().slice(-3)}`,
      clientName: newLead.clientName,
      phone: newLead.phone,
      email: newLead.email || "buyer@gmail.com",
      interestedProject: newLead.interestedProject,
      unitType: newLead.unitType,
      budgetRange: newLead.budgetRange,
      stage: "Lead Submitted",
      assignedSalesManager: "Rajesh Malhotra",
      submittedAt: new Date().toISOString().split("T")[0],
      notes: newLead.notes || "Registered via Channel Partner Portal.",
    };
    setLeads([created, ...leads]);
    toast.success(`Client lead "${created.clientName}" registered successfully!`);
    setModalOpen(false);
  };

  const filtered = leads.filter(
    (l) =>
      l.clientName.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.includes(search) ||
      l.interestedProject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
              <Users className="size-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              My Registered Buyer Leads
            </h1>
          </div>
          <p className="mt-1 text-xs text-text-secondary">
            Protect your brokerage claims with 90-day buyer exclusivity and real-time stage updates.
          </p>
        </div>

        <Button
          onClick={() => setModalOpen(true)}
          size="sm"
          className="h-9 gap-1.5 text-xs bg-brand text-white shadow-sm"
        >
          <Plus className="size-3.5" /> Register New Buyer
        </Button>
      </div>

      <Card className="p-3 bg-card border border-border flex items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 size-4 text-text-muted" />
          <Input
            placeholder="Search by client name, project, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 text-xs"
          />
        </div>
        <div className="text-xs text-text-secondary font-medium">
          Active Leads: <span className="font-bold text-foreground">{leads.length}</span>
        </div>
      </Card>

      <Card className="bg-card border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-muted/50 border-b border-border text-text-secondary font-semibold">
              <tr>
                <th className="py-3 px-4">Client Name & Phone</th>
                <th className="py-3 px-4">Project & Unit</th>
                <th className="py-3 px-4">Budget Range</th>
                <th className="py-3 px-4">Sales Manager Assigned</th>
                <th className="py-3 px-4">Registered Date</th>
                <th className="py-3 px-4">Status / CRM Stage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((l) => (
                <tr key={l.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-foreground">{l.clientName}</p>
                    <p className="text-[11px] text-text-secondary">{l.phone}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-foreground">{l.interestedProject}</p>
                    <p className="text-[11px] text-text-muted">{l.unitType}</p>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-brand">{l.budgetRange}</td>
                  <td className="py-3.5 px-4 text-foreground font-medium">{l.assignedSalesManager}</td>
                  <td className="py-3.5 px-4 text-text-secondary">{l.submittedAt}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        l.stage === "Deal Closed Won"
                          ? "bg-emerald-500/10 text-emerald-600"
                          : l.stage === "Booking Token Received"
                          ? "bg-purple-500/10 text-purple-600"
                          : "bg-blue-500/10 text-blue-600"
                      }`}
                    >
                      {l.stage}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal to Register Lead */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md bg-card text-foreground border-border">
          <DialogHeader>
            <DialogTitle>Register New Prospective Buyer</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreate} className="space-y-3.5 py-2">
            <div>
              <Label className="text-xs">Client Full Name</Label>
              <Input
                placeholder="Client Name"
                value={newLead.clientName}
                onChange={(e) => setNewLead({ ...newLead, clientName: e.target.value })}
                className="h-9 text-xs mt-1"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Phone Number</Label>
                <Input
                  placeholder="+91 XXXXX XXXXX"
                  value={newLead.phone}
                  onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                  className="h-9 text-xs mt-1"
                  required
                />
              </div>
              <div>
                <Label className="text-xs">Budget Range</Label>
                <Input
                  value={newLead.budgetRange}
                  onChange={(e) => setNewLead({ ...newLead, budgetRange: e.target.value })}
                  className="h-9 text-xs mt-1"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs">Target Project</Label>
              <Input
                value={newLead.interestedProject}
                onChange={(e) => setNewLead({ ...newLead, interestedProject: e.target.value })}
                className="h-9 text-xs mt-1"
              />
            </div>
            <div>
              <Label className="text-xs">Remarks / Requirements</Label>
              <Input
                placeholder="e.g. Needs higher floor park facing"
                value={newLead.notes}
                onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
                className="h-9 text-xs mt-1"
              />
            </div>
            <DialogFooter className="mt-4">
              <Button type="button" variant="outline" size="sm" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-brand text-white">
                Submit Lead
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
