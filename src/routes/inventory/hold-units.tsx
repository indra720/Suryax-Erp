import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Clock,
  Plus,
  Lock,
  Unlock,
  Building,
  User,
  Search,
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
import { inventoryService, type HeldUnitRecord } from "@/lib/services/inventory";
import { toast } from "sonner";

export const Route = createFileRoute("/inventory/hold-units")({
  head: () => ({
    meta: [
      { title: "Hold & Block Units | Vrindavan Inventory" },
      { name: "description", content: "Temporary customer holds, broker 48-hour reservations, and management blocks." },
    ],
  }),
  component: InventoryHoldUnitsPage,
});

export function InventoryHoldUnitsPage() {
  const [heldUnits, setHeldUnits] = useState<HeldUnitRecord[]>(inventoryService.getHeldUnits());
  const [modalOpen, setModalOpen] = useState(false);

  const [newHold, setNewHold] = useState({
    unitNo: "",
    tower: "Tower A",
    heldFor: "",
    holdReason: "Customer Token Verification" as HeldUnitRecord["holdReason"],
    heldByExecutive: "Pooja Verma",
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHold.unitNo || !newHold.heldFor) {
      toast.error("Please enter unit number and beneficiary name");
      return;
    }
    const created: HeldUnitRecord = {
      id: `HLD-0${heldUnits.length + 1}`,
      unitNo: newHold.unitNo,
      tower: newHold.tower,
      unitType: "3 BHK Premium",
      holdReason: newHold.holdReason,
      heldFor: newHold.heldFor,
      heldByExecutive: newHold.heldByExecutive,
      heldDate: new Date().toISOString().split("T")[0] + " 10:00",
      expiresInHours: 48,
      status: "Active Hold",
    };
    setHeldUnits([created, ...heldUnits]);
    toast.success(`Unit ${created.unitNo} successfully placed on hold!`);
    setModalOpen(false);
  };

  const releaseHold = (id: string, unitNo: string) => {
    setHeldUnits(heldUnits.filter((h) => h.id !== id));
    toast.success(`Hold released for Unit ${unitNo}. Returned to Available inventory.`);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
              <Clock className="size-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Hold & Block Units Management
            </h1>
          </div>
          <p className="mt-1 text-xs text-text-secondary">
            Manage temporary token holds with auto-expiry timers, management quotas, and broker allocations.
          </p>
        </div>

        <Button
          onClick={() => setModalOpen(true)}
          size="sm"
          className="h-9 gap-1.5 text-xs bg-brand text-white shadow-sm"
        >
          <Plus className="size-3.5" /> Place Unit On Hold
        </Button>
      </div>

      <Card className="bg-card border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-muted/50 border-b border-border text-text-secondary font-semibold">
              <tr>
                <th className="py-3 px-4">Unit & Tower</th>
                <th className="py-3 px-4">Beneficiary / Client</th>
                <th className="py-3 px-4">Hold Reason</th>
                <th className="py-3 px-4">Executive</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Expiry Timer</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {heldUnits.map((h) => (
                <tr key={h.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-foreground">Unit {h.unitNo}</p>
                    <p className="text-[11px] text-text-secondary">{h.tower}</p>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-foreground">{h.heldFor}</td>
                  <td className="py-3.5 px-4 text-text-secondary">{h.holdReason}</td>
                  <td className="py-3.5 px-4 font-medium text-foreground">{h.heldByExecutive}</td>
                  <td className="py-3.5 px-4 text-text-muted">{h.heldDate}</td>
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-amber-600">
                      {h.expiresInHours}h remaining
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600">
                      <Lock className="size-3" /> {h.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => releaseHold(h.id, h.unitNo)}
                      className="h-7 text-[11px] gap-1 text-rose-600 hover:text-rose-700"
                    >
                      <Unlock className="size-3" /> Release
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Hold Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md bg-card text-foreground border-border">
          <DialogHeader>
            <DialogTitle>Place Unit on Priority Hold</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreate} className="space-y-3.5 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Unit Number</Label>
                <Input
                  placeholder="e.g. 1403"
                  value={newHold.unitNo}
                  onChange={(e) => setNewHold({ ...newHold, unitNo: e.target.value })}
                  className="h-9 text-xs mt-1"
                  required
                />
              </div>
              <div>
                <Label className="text-xs">Tower</Label>
                <Input
                  value={newHold.tower}
                  onChange={(e) => setNewHold({ ...newHold, tower: e.target.value })}
                  className="h-9 text-xs mt-1"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs">Beneficiary / Buyer / Partner</Label>
              <Input
                placeholder="Client Name or Channel Partner"
                value={newHold.heldFor}
                onChange={(e) => setNewHold({ ...newHold, heldFor: e.target.value })}
                className="h-9 text-xs mt-1"
                required
              />
            </div>
            <div>
              <Label className="text-xs">Hold Reason</Label>
              <Input
                value={newHold.holdReason}
                onChange={(e) => setNewHold({ ...newHold, holdReason: e.target.value as any })}
                className="h-9 text-xs mt-1"
              />
            </div>
            <DialogFooter className="mt-4">
              <Button type="button" variant="outline" size="sm" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-brand text-white">
                Confirm Hold (48h)
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
