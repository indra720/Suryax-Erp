import React, { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  FolderKanban,
  TrendingUp,
  Target,
  IndianRupee,
  Users,
  MapPin,
  BookMarked,
  Clock,
  Sparkles,
  ArrowUpRight,
  RefreshCw,
  Plus,
  CheckCircle,
  PhoneCall,
  Calendar,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";
import { Card } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { salesManagerService } from "@/lib/services/sales-manager";
import { toast } from "sonner";

export const Route = createFileRoute("/sales-manager/dashboard")({
  head: () => ({
    meta: [
      { title: "Sales Director & Manager Dashboard | Vrindavan ERP" },
      { name: "description", content: "Executive overview of deals pipeline, bookings, and team revenue." },
    ],
  }),
  component: SalesManagerDashboardPage,
});

export function SalesManagerDashboardPage() {
  const [kpis] = useState(salesManagerService.getKpi());
  const [deals] = useState(salesManagerService.getDeals());
  const [visits] = useState(salesManagerService.getSiteVisits());
  const [targets] = useState(salesManagerService.getTargets());
  const [followups] = useState(salesManagerService.getFollowups());

  const chartData = [
    { month: "Nov", target: 20, booked: 18, revenue: 15 },
    { month: "Dec", target: 25, booked: 24, revenue: 21 },
    { month: "Jan", target: 30, booked: 28, revenue: 24 },
    { month: "Feb", target: 32, booked: 35, revenue: 29 },
    { month: "Mar", target: 35, booked: 38, revenue: 32 },
    { month: "Apr (MTD)", target: 40, booked: 38, revenue: 28.45 },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="inline-flex size-8 sm:size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md shrink-0">
              <FolderKanban className="size-4 sm:size-5" />
            </span>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-foreground">
              Sales Management Dashboard
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-text-secondary line-clamp-2 sm:line-clamp-none">
            Live telemetry of active pipeline, team revenue attainment, site visits, and high-value deal conversions.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.success("Sales telemetry refreshed")}
            className="flex-1 sm:flex-none h-9 gap-1.5 text-xs border-border justify-center"
          >
            <RefreshCw className="size-3.5" /> Refresh
          </Button>
          <Link to="/sales-manager/pipeline" className="flex-1 sm:flex-none">
            <Button size="sm" className="w-full sm:w-auto h-9 gap-1.5 text-xs bg-brand text-white shadow-sm justify-center">
              <Plus className="size-3.5" /> New Deal / Lead
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5">
        <Card className="p-3.5 sm:p-4 bg-card border border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-text-secondary">Total Bookings MTD</span>
            <span className="size-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
              <BookMarked className="size-4" />
            </span>
          </div>
          <div className="mt-2">
            <span className="text-xl sm:text-2xl font-extrabold text-foreground">{kpis.totalBookingsMTD} Units</span>
            <div className="flex items-center gap-1 mt-1 text-[11px] text-emerald-600 font-semibold">
              <ArrowUpRight className="size-3" /> +18.4% vs last month
            </div>
          </div>
        </Card>

        <Card className="p-3.5 sm:p-4 bg-card border border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-text-secondary">Revenue Realized MTD</span>
            <span className="size-8 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center shrink-0">
              <IndianRupee className="size-4" />
            </span>
          </div>
          <div className="mt-2">
            <span className="text-xl sm:text-2xl font-extrabold text-foreground">
              ₹{(kpis.totalRevenueMTD / 10000000).toFixed(2)} Cr
            </span>
            <div className="flex items-center gap-1 mt-1 text-[11px] text-emerald-600 font-semibold">
              <Sparkles className="size-3" /> {kpis.targetAchievementRate}% of Target
            </div>
          </div>
        </Card>

        <Card className="p-3.5 sm:p-4 bg-card border border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-text-secondary">Active Pipeline Value</span>
            <span className="size-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
              <TrendingUp className="size-4" />
            </span>
          </div>
          <div className="mt-2">
            <span className="text-xl sm:text-2xl font-extrabold text-foreground">
              ₹{(kpis.pipelineValue / 10000000).toFixed(2)} Cr
            </span>
            <div className="flex items-center gap-1 mt-1 text-[11px] text-blue-600 font-semibold">
              {kpis.activeOpportunities} Active Deals
            </div>
          </div>
        </Card>

        <Card className="p-3.5 sm:p-4 bg-card border border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-text-secondary">Site Visits Completed</span>
            <span className="size-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
              <MapPin className="size-4" />
            </span>
          </div>
          <div className="mt-2">
            <span className="text-xl sm:text-2xl font-extrabold text-foreground">{kpis.siteVisitsCompleted}</span>
            <div className="flex items-center gap-1 mt-1 text-[11px] text-amber-600 font-semibold">
              Conversion Ratio: {kpis.conversionRate}%
            </div>
          </div>
        </Card>
      </div>

      {/* Revenue & Bookings Velocity Chart */}
      <Card className="p-5 bg-card border border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Monthly Bookings & Target Velocity</h3>
            <p className="text-xs text-text-secondary">Tracking booked units against organizational targets</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium text-text-secondary">
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-[#6732F2]" /> Booked Units
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-slate-400" /> Target Units
            </span>
          </div>
        </div>
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--text-muted))" fontSize={11} tickLine={false} />
              <YAxis stroke="hsl(var(--text-muted))" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#10184A",
                  borderColor: "rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  color: "#fff",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="target" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={20} />
              <Bar dataKey="booked" fill="#6732F2" radius={[4, 4, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Two Column Layout: Urgent Followups & Team Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Urgent Followups Queue */}
        <Card className="p-5 bg-card border border-border">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                <Clock className="size-4 text-amber-500" /> Urgent Action Queue
              </h3>
              <p className="text-xs text-text-secondary">High-priority leads requiring immediate intervention</p>
            </div>
            <Link to="/sales-manager/followups" className="text-xs text-brand hover:underline font-medium">
              View All ({followups.length})
            </Link>
          </div>

          <div className="space-y-2.5">
            {followups.map((f) => (
              <div
                key={f.id}
                className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border hover:bg-muted/60 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-foreground">{f.clientName}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        f.priority === "High" ? "bg-rose-500/10 text-rose-600" : "bg-amber-500/10 text-amber-600"
                      }`}
                    >
                      {f.priority}
                    </span>
                  </div>
                  <p className="text-[11px] text-text-secondary mt-0.5">
                    {f.project} • {f.actionType}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-medium text-foreground block">{f.dueTime}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-[11px] mt-1 gap-1"
                    onClick={() => toast.success(`Call initiated to ${f.clientName}`)}
                  >
                    <PhoneCall className="size-3" /> Call
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Team Leaderboard */}
        <Card className="p-5 bg-card border border-border">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                <Target className="size-4 text-purple-500" /> Executive Revenue Targets
              </h3>
              <p className="text-xs text-text-secondary">Monthly quota achievement breakdown</p>
            </div>
            <Link to="/sales-manager/targets" className="text-xs text-brand hover:underline font-medium">
              Full Targets
            </Link>
          </div>

          <div className="space-y-3.5">
            {targets.map((t) => (
              <div key={t.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-foreground">{t.repName}</span>
                  <span className="text-text-secondary">
                    ₹{(t.achievedValue / 10000000).toFixed(2)} Cr / ₹{(t.monthlyTargetValue / 10000000).toFixed(2)} Cr (
                    <span className="font-bold text-emerald-600">{t.completionPercentage}%</span>)
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#4F20D8] to-[#6732F2]"
                    style={{ width: `${Math.min(t.completionPercentage, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
