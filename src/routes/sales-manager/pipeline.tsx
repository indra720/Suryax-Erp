import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  FolderKanban,
  Search,
  Filter,
  Plus,
  PhoneCall,
  Mail,
  DollarSign,
  Calendar,
  User,
  Sparkles,
  ChevronRight,
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
import { salesManagerService, type Deal } from "@/lib/services/sales-manager";
import { toast } from "sonner";

export const Route = createFileRoute("/sales-manager/pipeline")({
  head: () => ({
    meta: [
      { title: "Deals Pipeline & Kanban | Vrindavan Sales" },
      { name: "description", content: "Visual deal stages and lead movement tracking." },
    ],
  }),
  component: SalesPipelinePage,
});

export function SalesPipelinePage() {
  const [deals, setDeals] = useState<Deal[]>(salesManagerService.getDeals());
  const [search, setSearch] = useState("");
  const [projectFilter, setProjectFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);

  const [newDeal, setNewDeal] = useState({
    leadName: "",
    phone: "",
    email: "",
    project: "Vrindavan Heights",
    unitPreference: "3 BHK Premium",
    budget: 9500000,
    assignedRep: "Rajesh Malhotra",
  });

  const stages: Deal["stage"][] = [
    "New Enquiry",
    "Qualified",
    "Site Visit Scheduled",
    "Negotiation",
    "Token Paid",
    "Closed Won",
  ];

  const handleCreateDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeal.leadName || !newDeal.phone) {
      toast.error("Please fill in customer name and contact phone");
      return;
    }
    const created: Deal = {
      id: `DL-${Date.now().toString().slice(-4)}`,
      leadName: newDeal.leadName,
      phone: newDeal.phone,
      email: newDeal.email || "prospect@gmail.com",
      project: newDeal.project,
      unitPreference: newDeal.unitPreference,
      budget: Number(newDeal.budget),
      stage: "New Enquiry",
      assignedRep: newDeal.assignedRep,
      probability: 30,
      expectedClosingDate: "2026-05-30",
      lastFollowUp: new Date().toISOString().split("T")[0],
      notes: "Lead registered into active pipeline.",
    };
    setDeals([created, ...deals]);
    toast.success(`Deal created for ${created.leadName}!`);
    setModalOpen(false);
  };

  const advanceStage = (dealId: string) => {
    setDeals(
      deals.map((d) => {
        if (d.id !== dealId) return d;
        const currentIndex = stages.indexOf(d.stage);
        if (currentIndex < stages.length - 1) {
          const nextStage = stages[currentIndex + 1];
          toast.success(`${d.leadName} moved to stage: ${nextStage}`);
          return { ...d, stage: nextStage };
        }
        return d;
      })
    );
  };

  const filteredDeals = deals.filter((d) => {
    const matchSearch =
      d.leadName.toLowerCase().includes(search.toLowerCase()) ||
      d.phone.includes(search) ||
      d.project.toLowerCase().includes(search.toLowerCase());
    const matchProj = projectFilter === "All" || d.project === projectFilter;
    return matchSearch && matchProj;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
              <FolderKanban className="size-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Deals Pipeline & Kanban
            </h1>
          </div>
          <p className="mt-1 text-xs text-text-secondary">
            End-to-end buyer progression from initial enquiry to token payment and registration.
          </p>
        </div>

        <Button
          onClick={() => setModalOpen(true)}
          size="sm"
          className="h-9 gap-1.5 text-xs bg-brand text-white shadow-sm"
        >
          <Plus className="size-3.5" /> Add Deal to Pipeline
        </Button>
      </div>

      {/* Filter Bar */}
      <Card className="p-3 bg-card border border-border flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 size-4 text-text-muted" />
          <Input
            placeholder="Search deals, clients, phones..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 text-xs"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          {["All", "Vrindavan Heights", "Vrindavan Green Valley", "Vrindavan Royale", "Vrindavan Commercial Plaza"].map(
            (proj) => (
              <Button
                key={proj}
                variant={projectFilter === proj ? "default" : "outline"}
                size="sm"
                onClick={() => setProjectFilter(proj)}
                className="h-8 text-xs shrink-0"
              >
                {proj}
              </Button>
            )
          )}
        </div>
      </Card>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3.5 overflow-x-auto pb-4">
        {stages.map((stage) => {
          const stageDeals = filteredDeals.filter((d) => d.stage === stage);
          const stageValue = stageDeals.reduce((sum, d) => sum + d.budget, 0);

          return (
            <div key={stage} className="bg-muted/40 rounded-xl p-3 border border-border flex flex-col min-w-[220px]">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-border">
                <span className="text-xs font-bold text-foreground truncate">{stage}</span>
                <span className="size-5 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold text-foreground">
                  {stageDeals.length}
                </span>
              </div>
              <div className="text-[10px] text-text-secondary font-medium mb-2.5">
                Val: ₹{(stageValue / 100000).toFixed(1)}L
              </div>

              <div className="space-y-2.5 flex-1">
                {stageDeals.map((deal) => (
                  <Card
                    key={deal.id}
                    className="p-3 bg-card border border-border shadow-sm hover:border-brand/40 transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-1">
                      <span className="text-xs font-bold text-foreground leading-tight">{deal.leadName}</span>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                        {deal.probability}%
                      </span>
                    </div>

                    <p className="text-[11px] text-brand font-semibold mt-1">₹{(deal.budget / 100000).toFixed(1)} Lakh</p>
                    <p className="text-[10px] text-text-secondary truncate mt-0.5">{deal.project}</p>
                    <p className="text-[10px] text-text-muted truncate">{deal.unitPreference}</p>

                    <div className="mt-2.5 pt-2 border-t border-border flex items-center justify-between text-[10px] text-text-secondary">
                      <span className="truncate">{deal.assignedRep.split(" ")[0]}</span>
                      {stage !== "Closed Won" && (
                        <button
                          onClick={() => advanceStage(deal.id)}
                          title="Advance to next stage"
                          className="text-brand hover:text-brand/80 font-semibold flex items-center gap-0.5 cursor-pointer"
                        >
                          Next <ChevronRight className="size-3" />
                        </button>
                      )}
                    </div>
                  </Card>
                ))}

                {stageDeals.length === 0 && (
                  <div className="text-center py-6 text-[11px] text-text-muted italic">No deals</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Deal Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md bg-card text-foreground border-border">
          <DialogHeader>
            <DialogTitle>Register New Sales Deal</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateDeal} className="space-y-3.5 py-2">
            <div>
              <Label className="text-xs">Customer Full Name</Label>
              <Input
                placeholder="e.g. Ramesh Chandra Agnihotri"
                value={newDeal.leadName}
                onChange={(e) => setNewDeal({ ...newDeal, leadName: e.target.value })}
                className="h-9 text-xs mt-1"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Phone Number</Label>
                <Input
                  placeholder="+91 98390 XXXXX"
                  value={newDeal.phone}
                  onChange={(e) => setNewDeal({ ...newDeal, phone: e.target.value })}
                  className="h-9 text-xs mt-1"
                  required
                />
              </div>
              <div>
                <Label className="text-xs">Budget (INR)</Label>
                <Input
                  type="number"
                  value={newDeal.budget}
                  onChange={(e) => setNewDeal({ ...newDeal, budget: Number(e.target.value) })}
                  className="h-9 text-xs mt-1"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs">Interested Project</Label>
              <Input
                value={newDeal.project}
                onChange={(e) => setNewDeal({ ...newDeal, project: e.target.value })}
                className="h-9 text-xs mt-1"
              />
            </div>
            <div>
              <Label className="text-xs">Assigned Sales Executive</Label>
              <Input
                value={newDeal.assignedRep}
                onChange={(e) => setNewDeal({ ...newDeal, assignedRep: e.target.value })}
                className="h-9 text-xs mt-1"
              />
            </div>
            <DialogFooter className="mt-4">
              <Button type="button" variant="outline" size="sm" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-brand text-white">
                Launch Deal
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
