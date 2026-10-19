import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Boxes,
  Plus,
  AlertTriangle,
  CheckCircle,
  Truck,
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
import { siteEngineerService, type MaterialItem } from "@/lib/services/site-engineer";
import { toast } from "sonner";

export const Route = createFileRoute("/site-engineer/materials")({
  head: () => ({
    meta: [
      { title: "Material Indents & Inventory | Vrindavan Engineering" },
      { name: "description", content: "Site stock levels for cement, TMT steel, sand, and indent requisition." },
    ],
  }),
  component: SiteMaterialsPage,
});

export function SiteMaterialsPage() {
  const [materials, setMaterials] = useState<MaterialItem[]>(siteEngineerService.getMaterials());
  const [modalOpen, setModalOpen] = useState(false);

  const [newIndent, setNewIndent] = useState({
    materialName: "",
    quantity: 100,
    unit: "Bags",
    preferredSupplier: "UltraTech Depot",
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIndent.materialName) {
      toast.error("Please enter material name");
      return;
    }
    toast.success(`Indent requisition for ${newIndent.quantity} ${newIndent.unit} of ${newIndent.materialName} submitted to Purchase Dept!`);
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
              <Boxes className="size-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Site Material Stock & Indents
            </h1>
          </div>
          <p className="mt-1 text-xs text-text-secondary">
            Live stock audits, minimum reorder thresholds, and procurement dispatch indents.
          </p>
        </div>

        <Button
          onClick={() => setModalOpen(true)}
          size="sm"
          className="h-9 gap-1.5 text-xs bg-brand text-white shadow-sm"
        >
          <Plus className="size-3.5" /> Raise Material Indent
        </Button>
      </div>

      <Card className="bg-card border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-muted/50 border-b border-border text-text-secondary font-semibold">
              <tr>
                <th className="py-3 px-4">Material Name & Category</th>
                <th className="py-3 px-4">Current Stock</th>
                <th className="py-3 px-4">Threshold</th>
                <th className="py-3 px-4">Preferred Supplier</th>
                <th className="py-3 px-4">Last Delivery</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {materials.map((m) => (
                <tr key={m.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-foreground">{m.materialName}</p>
                    <p className="text-[11px] text-text-secondary">{m.category}</p>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-foreground">
                    {m.currentStock} {m.unit}
                  </td>
                  <td className="py-3.5 px-4 text-text-muted">
                    Min {m.minimumThreshold} {m.unit}
                  </td>
                  <td className="py-3.5 px-4 text-text-secondary">{m.preferredSupplier}</td>
                  <td className="py-3.5 px-4 text-text-secondary">{m.lastDeliveredDate}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        m.status === "Adequate"
                          ? "bg-emerald-500/10 text-emerald-600"
                          : m.status === "Shipment En Route"
                          ? "bg-blue-500/10 text-blue-600"
                          : "bg-amber-500/10 text-amber-600"
                      }`}
                    >
                      {m.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Indent Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md bg-card text-foreground border-border">
          <DialogHeader>
            <DialogTitle>Raise Material Indent Requisition</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreate} className="space-y-3.5 py-2">
            <div>
              <Label className="text-xs">Material Specification</Label>
              <Input
                placeholder="e.g. UltraTech Cement OPC 53 Grade"
                value={newIndent.materialName}
                onChange={(e) => setNewIndent({ ...newIndent, materialName: e.target.value })}
                className="h-9 text-xs mt-1"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Requisition Quantity</Label>
                <Input
                  type="number"
                  value={newIndent.quantity}
                  onChange={(e) => setNewIndent({ ...newIndent, quantity: Number(e.target.value) })}
                  className="h-9 text-xs mt-1"
                  required
                />
              </div>
              <div>
                <Label className="text-xs">Unit of Measurement</Label>
                <Input
                  value={newIndent.unit}
                  onChange={(e) => setNewIndent({ ...newIndent, unit: e.target.value })}
                  className="h-9 text-xs mt-1"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs">Supplier / Plant Recommendation</Label>
              <Input
                value={newIndent.preferredSupplier}
                onChange={(e) => setNewIndent({ ...newIndent, preferredSupplier: e.target.value })}
                className="h-9 text-xs mt-1"
              />
            </div>
            <DialogFooter className="mt-4">
              <Button type="button" variant="outline" size="sm" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-brand text-white">
                Dispatch Indent
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
