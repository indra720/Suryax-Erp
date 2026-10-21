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
        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <table className="w-full text-xs sm:text-sm text-left border-collapse min-w-[850px] whitespace-nowrap">
            <thead className="bg-muted/50 border-b border-border text-text-secondary font-semibold">
              <tr>
                <th className="py-3 px-4 whitespace-nowrap">Material Name & Category</th>
                <th className="py-3 px-4 whitespace-nowrap">Current Stock</th>
                <th className="py-3 px-4 whitespace-nowrap">Threshold</th>
                <th className="py-3 px-4 whitespace-nowrap">Preferred Supplier</th>
                <th className="py-3 px-4 whitespace-nowrap">Last Delivery</th>
                <th className="py-3 px-4 whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {materials.map((m) => (
                <tr key={m.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <p className="font-bold text-foreground">{m.materialName}</p>
                    <p className="text-[11px] text-text-secondary">{m.category}</p>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-foreground whitespace-nowrap">
                    {m.currentStock} {m.unit}
                  </td>
                  <td className="py-3.5 px-4 text-text-muted whitespace-nowrap">
                    Min {m.minimumThreshold} {m.unit}
                  </td>
                  <td className="py-3.5 px-4 text-text-secondary whitespace-nowrap">{m.preferredSupplier}</td>
                  <td className="py-3.5 px-4 text-text-secondary whitespace-nowrap">{m.lastDeliveredDate}</td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
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
        <DialogContent className="w-[94vw] sm:max-w-xl md:max-w-2xl lg:max-w-3xl max-h-[90vh] p-6 sm:p-8 rounded-2xl shadow-2xl flex flex-col bg-card border-border overflow-hidden">
          <DialogHeader className="pb-3 border-b border-border shrink-0">
            <DialogTitle className="text-lg sm:text-xl font-bold flex items-center gap-2.5 text-foreground">
              Raise Material Indent Requisition
            </DialogTitle>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Issue procurement request for construction raw materials, steel rebar, and cement mixes.
            </p>
          </DialogHeader>

          <form onSubmit={handleCreate} className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
              <div>
                <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Material Specification</Label>
                <Input
                  placeholder="e.g. UltraTech Cement OPC 53 Grade / Fe550D TMT Rebar 16mm"
                  value={newIndent.materialName}
                  onChange={(e) => setNewIndent({ ...newIndent, materialName: e.target.value })}
                  className="h-10 sm:h-11 text-sm rounded-xl"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Requisition Quantity</Label>
                  <Input
                    type="number"
                    value={newIndent.quantity}
                    onChange={(e) => setNewIndent({ ...newIndent, quantity: Number(e.target.value) })}
                    className="h-10 sm:h-11 text-sm rounded-xl"
                    required
                  />
                </div>
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Unit of Measurement (UoM)</Label>
                  <Input
                    placeholder="e.g. Bags, Metric Tonnes, Cubic Meters"
                    value={newIndent.unit}
                    onChange={(e) => setNewIndent({ ...newIndent, unit: e.target.value })}
                    className="h-10 sm:h-11 text-sm rounded-xl"
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Supplier / Plant Recommendation</Label>
                <Input
                  placeholder="e.g. UltraTech Direct Plant / JSW Steel Yard"
                  value={newIndent.preferredSupplier}
                  onChange={(e) => setNewIndent({ ...newIndent, preferredSupplier: e.target.value })}
                  className="h-10 sm:h-11 text-sm rounded-xl"
                />
              </div>
            </div>

            <DialogFooter className="pt-3 border-t border-border shrink-0 gap-2">
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)} className="rounded-xl h-10 px-5 text-sm">
                Cancel
              </Button>
              <Button type="submit" className="bg-brand hover:bg-brand/90 text-white rounded-xl h-10 px-6 text-sm font-semibold shadow-md">
                Dispatch Indent
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
