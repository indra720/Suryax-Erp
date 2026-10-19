import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Building2,
  MapPin,
  Calendar,
  Boxes,
  CheckCircle,
} from "lucide-react";
import { Card } from "@/components/erp/ui";
import { inventoryService, type InventoryProject } from "@/lib/services/inventory";

export const Route = createFileRoute("/inventory/projects")({
  head: () => ({
    meta: [
      { title: "Projects Master | Vrindavan Inventory" },
      { name: "description", content: "Master repository of projects, towers count, and total units." },
    ],
  }),
  component: InventoryProjectsPage,
});

export function InventoryProjectsPage() {
  const [projects] = useState<InventoryProject[]>(inventoryService.getProjects());

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center gap-2">
        <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
          <Building2 className="size-5" />
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Projects Inventory Master
          </h1>
          <p className="text-xs text-text-secondary">
            Project launch dates, target possession milestones, and unit distribution.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((p) => (
          <Card key={p.id} className="p-5 bg-card border border-border space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-bold text-foreground">{p.name}</h3>
                <p className="text-xs text-text-secondary flex items-center gap-1 mt-0.5">
                  <MapPin className="size-3 text-text-muted" /> {p.location}
                </p>
              </div>
              <span className="font-mono text-[10px] bg-muted px-2 py-0.5 rounded text-text-secondary">
                {p.reraNumber}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs pt-2 border-t border-border">
              <div className="p-2 rounded-lg bg-muted/40">
                <span className="text-[10px] text-text-secondary">Total Units</span>
                <p className="font-bold text-foreground mt-0.5">{p.totalUnits}</p>
              </div>
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <span className="text-[10px] text-emerald-700">Sold / Booked</span>
                <p className="font-bold text-emerald-700 mt-0.5">{p.soldUnits}</p>
              </div>
              <div className="p-2 rounded-lg bg-purple-500/10">
                <span className="text-[10px] text-purple-700">Available</span>
                <p className="font-bold text-purple-700 mt-0.5">{p.availableUnits}</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-text-secondary pt-1">
              <span>Launched: {p.launchDate}</span>
              <span>Target Handover: <strong className="text-foreground">{p.possessionTarget}</strong></span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
