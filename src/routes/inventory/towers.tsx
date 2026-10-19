import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Building,
  Boxes,
  CheckCircle,
  Layers,
} from "lucide-react";
import { Card } from "@/components/erp/ui";
import { inventoryService, type InventoryTower } from "@/lib/services/inventory";

export const Route = createFileRoute("/inventory/towers")({
  head: () => ({
    meta: [
      { title: "Towers & Wings Management | Vrindavan Inventory" },
      { name: "description", content: "Tower floor layouts, units per floor, and availability counts." },
    ],
  }),
  component: InventoryTowersPage,
});

export function InventoryTowersPage() {
  const [towers] = useState<InventoryTower[]>(inventoryService.getTowers());

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center gap-2">
        <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
          <Building className="size-5" />
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Towers & Wings Master
          </h1>
          <p className="text-xs text-text-secondary">
            Floor configurations, units per level, and live construction stages.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {towers.map((t) => (
          <Card key={t.id} className="p-5 bg-card border border-border space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-bold text-foreground">{t.towerName}</h3>
                <p className="text-xs text-text-secondary">{t.projectName}</p>
              </div>
              <span className="text-[10px] font-bold text-brand bg-brand/10 px-2 py-0.5 rounded">
                {t.constructionStage}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs pt-2 border-t border-border">
              <div className="p-2 rounded-lg bg-muted/40">
                <span className="text-[10px] text-text-secondary">Total Floors</span>
                <p className="font-bold text-foreground mt-0.5">{t.floorsCount} Floors</p>
              </div>
              <div className="p-2 rounded-lg bg-muted/40">
                <span className="text-[10px] text-text-secondary">Units / Floor</span>
                <p className="font-bold text-foreground mt-0.5">{t.unitsPerFloor} Units</p>
              </div>
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <span className="text-[10px] text-emerald-700">Available</span>
                <p className="font-bold text-emerald-700 mt-0.5">{t.availableUnits} Left</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
