import React, { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Building,
  Users,
  Boxes,
  Camera,
  CheckCircle,
  Clock,
  Sparkles,
  ArrowUpRight,
  Plus,
  RefreshCw,
  HardHat,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { siteEngineerService } from "@/lib/services/site-engineer";
import { toast } from "sonner";

export const Route = createFileRoute("/site-engineer/dashboard")({
  head: () => ({
    meta: [
      { title: "Site Engineer & Construction Portal | Vrindavan ERP" },
      { name: "description", content: "Construction progress, contractor labor, concrete pouring, and daily reports." },
    ],
  }),
  component: SiteEngineerDashboardPage,
});

export function SiteEngineerDashboardPage() {
  const [kpis] = useState(siteEngineerService.getKpi());
  const [towers] = useState(siteEngineerService.getTowers());
  const [contractors] = useState(siteEngineerService.getContractors());
  const [materials] = useState(siteEngineerService.getMaterials());

  const progressData = towers.map((t) => ({
    name: t.towerName.split(" ")[1] || t.towerName,
    completion: t.overallPercent,
    floors: `${t.floorsCasted}/${t.totalFloors}`,
  }));

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
              <Building className="size-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Site Construction Dashboard
            </h1>
          </div>
          <p className="mt-1 text-xs text-text-secondary">
            On-site civil execution, slab casting velocity, safety metrics, and daily contractor deployments.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/site-engineer/daily-reports">
            <Button size="sm" className="h-9 gap-1.5 text-xs bg-brand text-white shadow-sm">
              <Plus className="size-3.5" /> File Daily DPR
            </Button>
          </Link>
          <Link to="/site-engineer/photos">
            <Button size="sm" variant="outline" className="h-9 gap-1.5 text-xs">
              <Camera className="size-3.5" /> Upload Site Photos
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-card border border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-text-secondary">Overall Completion</span>
            <span className="size-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <CheckCircle className="size-4" />
            </span>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-extrabold text-foreground">{kpis.overallCompletionPct}%</span>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">4 Active Towers</p>
          </div>
        </Card>

        <Card className="p-4 bg-card border border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-text-secondary">Active Labor On Site</span>
            <span className="size-8 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <Users className="size-4" />
            </span>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-extrabold text-foreground">{kpis.activeLaborOnSite} Workers</span>
            <p className="text-[11px] text-purple-600 font-semibold mt-1">Across 4 Subcontractors</p>
          </div>
        </Card>

        <Card className="p-4 bg-card border border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-text-secondary">Concrete Poured MTD</span>
            <span className="size-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <Building className="size-4" />
            </span>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-extrabold text-foreground">{kpis.concretePouredMTD} m³</span>
            <p className="text-[11px] text-blue-600 font-semibold mt-1">M35 Grade High Strength</p>
          </div>
        </Card>

        <Card className="p-4 bg-card border border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-text-secondary">Safety Record</span>
            <span className="size-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <ShieldCheck className="size-4" />
            </span>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-extrabold text-foreground">{kpis.accidentFreeDays} Days</span>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">Zero Lost Time Incidents</p>
          </div>
        </Card>
      </div>

      {/* Tower Progress Velocity */}
      <Card className="p-5 bg-card border border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Tower Construction Completion (%)</h3>
            <p className="text-xs text-text-secondary">Structural RCC casting and finishing milestones</p>
          </div>
        </div>
        <div className="h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={progressData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--text-muted))" fontSize={11} tickLine={false} />
              <YAxis stroke="hsl(var(--text-muted))" fontSize={11} tickLine={false} domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#10184A",
                  borderColor: "rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  color: "#fff",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="completion" fill="#6732F2" radius={[4, 4, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Two Columns: Tower Status & Material Stock Alert */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card className="p-5 bg-card border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Active Towers & Current Phase</h3>
            <Link to="/site-engineer/towers" className="text-xs text-brand hover:underline font-medium">
              View Tower Matrix
            </Link>
          </div>
          <div className="space-y-3">
            {towers.map((t) => (
              <div key={t.id} className="p-3 rounded-xl bg-muted/40 border border-border space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-foreground">{t.towerName}</h4>
                    <p className="text-[11px] text-text-secondary">{t.currentActivity}</p>
                  </div>
                  <span className="text-xs font-bold text-brand">{t.overallPercent}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#4F20D8] to-[#6732F2]"
                    style={{ width: `${t.overallPercent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5 bg-card border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Critical Materials on Site</h3>
            <Link to="/site-engineer/materials" className="text-xs text-brand hover:underline font-medium">
              Raise Material Indent
            </Link>
          </div>
          <div className="space-y-3">
            {materials.slice(0, 4).map((m) => (
              <div
                key={m.id}
                className="p-3 rounded-xl bg-muted/40 border border-border flex items-center justify-between"
              >
                <div>
                  <h4 className="text-xs font-bold text-foreground">{m.materialName}</h4>
                  <p className="text-[11px] text-text-secondary mt-0.5">
                    Stock: <span className="font-semibold text-foreground">{m.currentStock} {m.unit}</span>
                  </p>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    m.status === "Adequate"
                      ? "bg-emerald-500/10 text-emerald-600"
                      : "bg-amber-500/10 text-amber-600"
                  }`}
                >
                  {m.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
