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
  TrendingUp,
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
    if (!newDeal.leadName.trim()) {
      toast.error("Please fill in customer name");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(newDeal.phone)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }
    if (newDeal.budget <= 0) {
      toast.error("Budget must be greater than zero");
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
      lastFollowUp: new Date().toISOString().slice(0, 10),
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
        if (currentIndex >= 0 && currentIndex < stages.length - 1) {
          const nextStage = stages[currentIndex + 1];
          if (nextStage) {
            toast.success(`${d.leadName} moved to stage: ${nextStage}`);
            return { ...d, stage: nextStage };
          }
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
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="inline-flex size-8 sm:size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md shrink-0">
              <FolderKanban className="size-4 sm:size-5" />
            </span>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-foreground">
              Deals Pipeline & Kanban
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-text-secondary line-clamp-2 sm:line-clamp-none">
            End-to-end buyer progression from initial enquiry to token payment and registration.
          </p>
        </div>

        <div className="w-full sm:w-auto">
          <Button
            onClick={() => setModalOpen(true)}
            size="sm"
            className="w-full sm:w-auto h-9 gap-1.5 text-xs bg-brand text-white shadow-sm"
          >
            <Plus className="size-3.5" /> Add Deal to Pipeline
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <Card className="p-3 sm:p-3.5 bg-card border border-border flex flex-col sm:flex-row gap-2.5 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 size-4 text-text-muted" />
          <Input
            placeholder="Search deals, clients, phones..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-8.5 sm:h-9 text-xs"
          />
        </div>
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto no-scrollbar pb-1 sm:pb-0 -mx-1 px-1">
          {["All", "Vrindavan Heights", "Vrindavan Green Valley", "Vrindavan Royale", "Vrindavan Commercial Plaza"].map(
            (proj) => (
              <Button
                key={proj}
                variant={projectFilter === proj ? "default" : "outline"}
                size="sm"
                onClick={() => setProjectFilter(proj)}
                className="h-8 text-xs shrink-0 whitespace-nowrap"
              >
                {proj}
              </Button>
            )
          )}
        </div>
      </Card>

      <div className="flex items-center justify-between lg:hidden pt-1">
        <span className="text-[11px] text-text-muted font-medium flex items-center gap-1">Swipe columns horizontally →</span>
      </div>

      {/* Kanban Board Columns */}
      <div className="flex lg:grid lg:grid-cols-6 gap-3.5 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
        {stages.map((stage) => {
          const stageDeals = filteredDeals.filter((d) => d.stage === stage);
          const stageValue = stageDeals.reduce((sum, d) => sum + d.budget, 0);

          return (
            <div key={stage} className="bg-muted/40 rounded-xl p-3 border border-border flex flex-col w-[260px] sm:w-[280px] lg:w-auto shrink-0">
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
        <DialogContent className="w-[94vw] sm:max-w-xl md:max-w-2xl lg:max-w-3xl max-h-[90vh] p-6 sm:p-8 rounded-2xl shadow-2xl flex flex-col bg-card border-border overflow-hidden">
          <DialogHeader className="pb-3 border-b border-border shrink-0">
            <DialogTitle className="text-lg sm:text-xl font-bold flex items-center gap-2.5 text-foreground">
              <span className="p-2 rounded-xl bg-brand/10 text-brand">
                <TrendingUp className="size-5" />
              </span>
              Register New Sales Deal
            </DialogTitle>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Add a new qualified prospect into the active sales negotiation pipeline.
            </p>
          </DialogHeader>

          <form onSubmit={handleCreateDeal} className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Customer Full Name *</Label>
                  <Input
                    placeholder="e.g. Ramesh Chandra Agnihotri"
                    value={newDeal.leadName}
                    onChange={(e) => setNewDeal({ ...newDeal, leadName: e.target.value })}
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
                    value={newDeal.phone}
                    onChange={(e) =>
                      setNewDeal({
                        ...newDeal,
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
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Interested Project *</Label>
                  <Input
                    value={newDeal.project}
                    onChange={(e) => setNewDeal({ ...newDeal, project: e.target.value })}
                    className="h-10 sm:h-11 text-sm rounded-xl"
                    required
                  />
                </div>
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Budget Allocation (₹) *</Label>
                  <Input
                    type="number"
                    min={100000}
                    value={newDeal.budget}
                    onChange={(e) => setNewDeal({ ...newDeal, budget: Number(e.target.value) })}
                    className="h-10 sm:h-11 text-sm rounded-xl font-semibold"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Unit Preference</Label>
                  <Input
                    value={newDeal.unitPreference}
                    onChange={(e) => setNewDeal({ ...newDeal, unitPreference: e.target.value })}
                    className="h-10 sm:h-11 text-sm rounded-xl"
                    placeholder="e.g. 3 BHK Luxury Flat"
                  />
                </div>
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Assigned Sales Executive *</Label>
                  <Input
                    value={newDeal.assignedRep}
                    onChange={(e) => setNewDeal({ ...newDeal, assignedRep: e.target.value })}
                    className="h-10 sm:h-11 text-sm rounded-xl"
                    required
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="pt-3 border-t border-border shrink-0 gap-2">
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)} className="rounded-xl h-10 px-5 text-sm">
                Cancel
              </Button>
              <Button type="submit" className="bg-brand hover:bg-brand/90 text-white rounded-xl h-10 px-6 text-sm font-semibold shadow-md">
                Launch Deal
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
