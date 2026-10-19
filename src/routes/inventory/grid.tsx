import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Boxes,
  CheckCircle,
  Clock,
  Lock,
  Building,
  Info,
  IndianRupee,
  Compass,
} from "lucide-react";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { inventoryService, type UnitGridItem } from "@/lib/services/inventory";
import { toast } from "sonner";

export const Route = createFileRoute("/inventory/grid")({
  head: () => ({
    meta: [
      { title: "Unit Availability Grid Matrix | Vrindavan Inventory" },
      { name: "description", content: "Interactive floor-by-floor unit matrix with real-time status and pricing inspection." },
    ],
  }),
  component: InventoryGridPage,
});

export function InventoryGridPage() {
  const [units] = useState<UnitGridItem[]>(inventoryService.getUnitGrid());
  const [selectedUnit, setSelectedUnit] = useState<UnitGridItem | null>(null);
  const [filterStatus, setFilterStatus] = useState("All");

  const getStatusColor = (status: UnitGridItem["status"]) => {
    switch (status) {
      case "Available":
        return "bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-600";
      case "Booked":
        return "bg-rose-500 hover:bg-rose-600 text-white border-rose-600";
      case "On Hold":
        return "bg-amber-500 hover:bg-amber-600 text-white border-amber-600";
      case "Management Blocked":
        return "bg-purple-600 hover:bg-purple-700 text-white border-purple-700";
    }
  };

  const filteredUnits = units.filter(
    (u) => filterStatus === "All" || u.status === filterStatus
  );

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
              <Boxes className="size-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Interactive Unit Availability Grid
            </h1>
          </div>
          <p className="mt-1 text-xs text-text-secondary">
            Floor-by-floor visual inventory. Click on any unit box to inspect technical specs, facing, and pricing.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
          <span className="flex items-center gap-1.5">
            <span className="size-3 rounded-md bg-emerald-500" /> Available
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-3 rounded-md bg-rose-500" /> Booked
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-3 rounded-md bg-amber-500" /> On Hold
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-3 rounded-md bg-purple-600" /> Blocked
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {["All", "Available", "Booked", "On Hold", "Management Blocked"].map((st) => (
          <Button
            key={st}
            variant={filterStatus === st ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus(st)}
            className="h-8 text-xs shrink-0"
          >
            {st}
          </Button>
        ))}
      </div>

      {/* Visual Unit Matrix Cards */}
      <Card className="p-6 bg-card border border-border">
        <h3 className="text-sm font-bold text-foreground mb-4">Tower A (Skyline Crest) - Floors 14 to 16</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
          {filteredUnits.map((u) => (
            <button
              key={u.id}
              type="button"
              onClick={() => setSelectedUnit(u)}
              className={`p-3 rounded-xl border flex flex-col justify-between transition-all cursor-pointer shadow-sm hover:scale-105 ${getStatusColor(
                u.status
              )}`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-extrabold text-sm leading-none">{u.unitNo}</span>
                <span className="text-[10px] opacity-80">{u.tower.split(" ")[1]}</span>
              </div>
              <span className="text-[10px] font-medium mt-2 block truncate w-full text-left">
                {u.unitType}
              </span>
              <span className="text-[9px] opacity-90 truncate w-full text-left mt-0.5">
                ₹{(u.totalCost / 100000).toFixed(1)}L
              </span>
            </button>
          ))}
        </div>
      </Card>

      {/* Unit Detail Modal */}
      <Dialog open={!!selectedUnit} onOpenChange={() => setSelectedUnit(null)}>
        {selectedUnit && (
          <DialogContent className="max-w-md bg-card text-foreground border-border">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>Unit {selectedUnit.unitNo} ({selectedUnit.tower})</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    selectedUnit.status === "Available"
                      ? "bg-emerald-500/10 text-emerald-600"
                      : "bg-rose-500/10 text-rose-600"
                  }`}
                >
                  {selectedUnit.status}
                </span>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-3 py-2 text-xs">
              <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-muted/40">
                <div>
                  <span className="text-text-secondary">Type:</span>
                  <p className="font-bold text-foreground">{selectedUnit.unitType}</p>
                </div>
                <div>
                  <span className="text-text-secondary">Floor:</span>
                  <p className="font-bold text-foreground">{selectedUnit.floor}th Floor</p>
                </div>
                <div>
                  <span className="text-text-secondary">Super Area:</span>
                  <p className="font-bold text-foreground">{selectedUnit.superBuiltUpArea} sq.ft</p>
                </div>
                <div>
                  <span className="text-text-secondary">Carpet Area:</span>
                  <p className="font-bold text-foreground">{selectedUnit.carpetArea} sq.ft</p>
                </div>
              </div>

              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-text-secondary">Facing & View:</span>
                <strong className="text-foreground">{selectedUnit.facing}</strong>
              </div>

              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-text-secondary">All-Inclusive Total Cost:</span>
                <strong className="text-brand font-bold text-sm">
                  ₹{(selectedUnit.totalCost / 100000).toFixed(2)} Lakh
                </strong>
              </div>

              {selectedUnit.customerName && (
                <div className="p-2.5 rounded-lg bg-rose-500/10 text-rose-700 text-xs">
                  <strong>Booked by:</strong> {selectedUnit.customerName} (Exec: {selectedUnit.salesExecutive})
                </div>
              )}
            </div>

            <DialogFooter className="mt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setSelectedUnit(null)}>
                Close
              </Button>
              {selectedUnit.status === "Available" && (
                <Button
                  type="button"
                  size="sm"
                  onClick={() => {
                    toast.success(`Unit ${selectedUnit.unitNo} held for 48 hours!`);
                    setSelectedUnit(null);
                  }}
                  className="bg-brand text-white"
                >
                  Hold Unit (48h)
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
