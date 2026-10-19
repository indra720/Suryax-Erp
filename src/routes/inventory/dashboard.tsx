import React, { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Boxes,
  Building2,
  Building,
  CheckCircle,
  Clock,
  Sparkles,
  ArrowUpRight,
  Plus,
  RefreshCw,
  IndianRupee,
  Layers,
} from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { inventoryService } from "@/lib/services/inventory";
import { toast } from "sonner";

export const Route = createFileRoute("/inventory/dashboard")({
  head: () => ({
    meta: [
      { title: "Inventory & Property Manager Dashboard | Vrindavan ERP" },
      { name: "description", content: "Units occupancy matrix, availability telemetry, and property stock management." },
    ],
  }),
  component: InventoryDashboardPage,
});

export function InventoryDashboardPage() {
  const [kpis] = useState(inventoryService.getKpi());
  const [projects] = useState(inventoryService.getProjects());
  const [towers] = useState(inventoryService.getTowers());
  const [heldUnits] = useState(inventoryService.getHeldUnits());

  const occupancyPieData = [
    { name: "Sold / Booked", value: kpis.unitsSold, color: "#10b981" },
    { name: "Available Stock", value: kpis.unitsAvailable, color: "#6732F2" },
    { name: "Held / Reserved", value: kpis.unitsOnHold, color: "#f59e0b" },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
              <Boxes className="size-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Inventory & Availability Dashboard
            </h1>
          </div>
          <p className="mt-1 text-xs text-text-secondary">
            Floor-by-floor unit matrices, availability status, block quotas, and unsold inventory valuation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/inventory/grid">
            <Button size="sm" className="h-9 gap-1.5 text-xs bg-brand text-white shadow-sm">
              <Boxes className="size-3.5" /> Interactive Unit Grid
            </Button>
          </Link>
          <Link to="/inventory/hold-units">
            <Button size="sm" variant="outline" className="h-9 gap-1.5 text-xs">
              <Clock className="size-3.5" /> Hold / Block Unit
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-card border border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-text-secondary">Total Inventory</span>
            <span className="size-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <Building2 className="size-4" />
            </span>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-extrabold text-foreground">{kpis.totalInventoryUnits} Units</span>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">Across 4 Active Projects</p>
          </div>
        </Card>

        <Card className="p-4 bg-card border border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-text-secondary">Available for Sale</span>
            <span className="size-8 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <Boxes className="size-4" />
            </span>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-extrabold text-foreground">{kpis.unitsAvailable} Units</span>
            <p className="text-[11px] text-purple-600 font-semibold mt-1">Ready to book immediately</p>
          </div>
        </Card>

        <Card className="p-4 bg-card border border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-text-secondary">Occupancy Rate</span>
            <span className="size-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <CheckCircle className="size-4" />
            </span>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-extrabold text-foreground">{kpis.inventoryOccupancyRate}%</span>
            <p className="text-[11px] text-blue-600 font-semibold mt-1">{kpis.unitsSold} Units Booked</p>
          </div>
        </Card>

        <Card className="p-4 bg-card border border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-text-secondary">Unsold Stock Value</span>
            <span className="size-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <IndianRupee className="size-4" />
            </span>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-extrabold text-foreground">
              ₹{(kpis.unsoldStockValue / 10000000).toFixed(1)} Cr
            </span>
            <p className="text-[11px] text-text-secondary mt-1">Revenue Potential</p>
          </div>
        </Card>
      </div>

      {/* Two Column Layout: Project Breakdown & Occupancy Share */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="p-5 bg-card border border-border lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Project Inventory Breakdown</h3>
            <Link to="/inventory/projects" className="text-xs text-brand hover:underline font-medium">
              View All Projects
            </Link>
          </div>
          <div className="space-y-3">
            {projects.map((p) => (
              <div key={p.id} className="p-3 rounded-xl bg-muted/40 border border-border space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-foreground">{p.name}</h4>
                    <p className="text-[11px] text-text-secondary">{p.location}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-600">{p.availableUnits} Available</span>
                    <span className="text-[10px] text-text-muted block">of {p.totalUnits} Total</span>
                  </div>
                </div>
                <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#4F20D8] to-[#6732F2]"
                    style={{ width: `${(p.soldUnits / p.totalUnits) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Occupancy Donut Chart */}
        <Card className="p-5 bg-card border border-border flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Inventory Distribution</h3>
            <p className="text-xs text-text-secondary mt-0.5">Live allocation share</p>
          </div>

          <div className="h-[180px] w-full my-auto">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={occupancyPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {occupancyPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#10184A",
                    borderColor: "rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-border text-xs">
            {occupancyPieData.map((d) => (
              <div key={d.name} className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-text-secondary">
                  <span className="size-2 rounded-full" style={{ backgroundColor: d.color }} />
                  {d.name}
                </span>
                <span className="font-bold text-foreground">{d.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
