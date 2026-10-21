import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Building,
  CheckCircle,
  Clock,
  Layers,
  Search,
} from "lucide-react";
import { Card } from "@/components/erp/ui";
import { siteEngineerService, type FloorMatrixItem } from "@/lib/services/site-engineer";

export const Route = createFileRoute("/site-engineer/towers")({
  head: () => ({
    meta: [
      { title: "Towers & Floors Matrix | Vrindavan Engineering" },
      { name: "description", content: "Floor-by-floor inspection matrix for RCC, brickwork, plumbing, and electrical." },
    ],
  }),
  component: SiteTowersPage,
});

export function SiteTowersPage() {
  const [matrix] = useState<FloorMatrixItem[]>(siteEngineerService.getFloorMatrix());

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-600">Done</span>;
      case "In Progress":
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-600">Active</span>;
      case "Curing":
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-600">Curing</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-muted text-text-muted">Pending</span>;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center gap-2">
        <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
          <Building className="size-5" />
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Towers & Floor Inspection Matrix
          </h1>
          <p className="text-xs text-text-secondary">
            Granular civil trade tracking: RCC Slab, AAC blockwork, internal plumbing, and electrical conduits.
          </p>
        </div>
      </div>

      <Card className="bg-card border border-border overflow-hidden">
        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <table className="w-full text-xs sm:text-sm text-left border-collapse min-w-[850px] whitespace-nowrap">
            <thead className="bg-muted/50 border-b border-border text-text-secondary font-semibold">
              <tr>
                <th className="py-3 px-4 whitespace-nowrap">Tower & Floor</th>
                <th className="py-3 px-4 whitespace-nowrap">RCC Slab Casting</th>
                <th className="py-3 px-4 whitespace-nowrap">AAC Blockwork</th>
                <th className="py-3 px-4 whitespace-nowrap">Internal Plumbing</th>
                <th className="py-3 px-4 whitespace-nowrap">Electrical Conduits</th>
                <th className="py-3 px-4 whitespace-nowrap">Tiling / Flooring</th>
                <th className="py-3 px-4 whitespace-nowrap">Last Inspected</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {matrix.map((m) => (
                <tr key={m.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-foreground whitespace-nowrap">
                    {m.tower} • {m.floor}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">{getStatusBadge(m.rccSlab)}</td>
                  <td className="py-3.5 px-4 whitespace-nowrap">{getStatusBadge(m.brickwork)}</td>
                  <td className="py-3.5 px-4 whitespace-nowrap">{getStatusBadge(m.plumbing)}</td>
                  <td className="py-3.5 px-4 whitespace-nowrap">{getStatusBadge(m.electrical)}</td>
                  <td className="py-3.5 px-4 whitespace-nowrap">{getStatusBadge(m.flooringTiling)}</td>
                  <td className="py-3.5 px-4 text-text-secondary whitespace-nowrap">{m.lastInspected}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
