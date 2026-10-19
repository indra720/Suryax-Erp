import React, { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Wallet,
  Users,
  IndianRupee,
  Building2,
  MapPin,
  TrendingUp,
  Sparkles,
  ArrowUpRight,
  Plus,
  RefreshCw,
  Award,
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
import { brokerService } from "@/lib/services/broker";
import { toast } from "sonner";

export const Route = createFileRoute("/broker/dashboard")({
  head: () => ({
    meta: [
      { title: "Channel Partner (Broker) Dashboard | Vrindavan ERP" },
      { name: "description", content: "Broker commission wallet, lead tracking, and deal payouts." },
    ],
  }),
  component: BrokerDashboardPage,
});

export function BrokerDashboardPage() {
  const [kpis] = useState(brokerService.getKpi());
  const [leads] = useState(brokerService.getLeads());
  const [projects] = useState(brokerService.getProjects());
  const [transactions] = useState(brokerService.getTransactions());

  const chartData = [
    { month: "Dec", commission: 4.5 },
    { month: "Jan", commission: 6.2 },
    { month: "Feb", commission: 8.8 },
    { month: "Mar", commission: 12.5 },
    { month: "Apr (MTD)", commission: 6.5 },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md">
              <Wallet className="size-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Channel Partner & Broker Portal
            </h1>
          </div>
          <p className="mt-1 text-xs text-text-secondary">
            Commission wallet balance, buyer client tracking, project marketing collaterals, and payout claims.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/broker/leads">
            <Button size="sm" className="h-9 gap-1.5 text-xs bg-brand text-white shadow-sm">
              <Plus className="size-3.5" /> Register Client Lead
            </Button>
          </Link>
          <Link to="/broker/wallet">
            <Button size="sm" variant="outline" className="h-9 gap-1.5 text-xs">
              <Wallet className="size-3.5" /> Payout Wallet
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-card border border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-text-secondary">Wallet Available</span>
            <span className="size-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <IndianRupee className="size-4" />
            </span>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-extrabold text-foreground">
              ₹{(kpis.walletAvailableBalance / 100000).toFixed(2)} L
            </span>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">Ready for Instant Withdrawal</p>
          </div>
        </Card>

        <Card className="p-4 bg-card border border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-text-secondary">Total Commission</span>
            <span className="size-8 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <Award className="size-4" />
            </span>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-extrabold text-foreground">
              ₹{(kpis.totalCommissionEarned / 100000).toFixed(2)} L
            </span>
            <p className="text-[11px] text-purple-600 font-semibold mt-1">{kpis.dealsClosed} Deals Closed</p>
          </div>
        </Card>

        <Card className="p-4 bg-card border border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-text-secondary">Registered Clients</span>
            <span className="size-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <Users className="size-4" />
            </span>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-extrabold text-foreground">{kpis.totalLeadsSubmitted}</span>
            <p className="text-[11px] text-blue-600 font-semibold mt-1">{kpis.activeProspects} Active in Pipeline</p>
          </div>
        </Card>

        <Card className="p-4 bg-card border border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-text-secondary">Partner Tier</span>
            <span className="size-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Sparkles className="size-4" />
            </span>
          </div>
          <div className="mt-2">
            <span className="text-base font-extrabold text-foreground">{kpis.currentSlab}</span>
            <p className="text-[10px] text-text-secondary mt-1 truncate">{kpis.nextTierRequirement}</p>
          </div>
        </Card>
      </div>

      {/* Commission Earnings Velocity Chart */}
      <Card className="p-5 bg-card border border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Monthly Brokerage Disbursed (₹ Lakhs)</h3>
            <p className="text-xs text-text-secondary">Real-time track record of channel payouts</p>
          </div>
        </div>
        <div className="h-[220px] w-full">
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
              <Bar dataKey="commission" fill="#6732F2" radius={[4, 4, 0, 0]} barSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Two Columns: Recent Client Registrations & Projects with High Commission */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card className="p-5 bg-card border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Active Buyer Leads</h3>
            <Link to="/broker/leads" className="text-xs text-brand hover:underline font-medium">
              View All Leads
            </Link>
          </div>
          <div className="space-y-3">
            {leads.slice(0, 3).map((l) => (
              <div
                key={l.id}
                className="p-3 rounded-xl bg-muted/40 border border-border flex items-center justify-between"
              >
                <div>
                  <h4 className="text-xs font-bold text-foreground">{l.clientName}</h4>
                  <p className="text-[11px] text-text-secondary mt-0.5">
                    {l.interestedProject} • {l.unitType}
                  </p>
                  <span className="text-[10px] text-brand font-semibold">{l.budgetRange}</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600">
                  {l.stage}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5 bg-card border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Top Commission Projects</h3>
            <Link to="/broker/properties" className="text-xs text-brand hover:underline font-medium">
              Browse Catalog
            </Link>
          </div>
          <div className="space-y-3">
            {projects.slice(0, 3).map((p) => (
              <div
                key={p.id}
                className="p-3 rounded-xl bg-muted/40 border border-border flex items-center justify-between"
              >
                <div>
                  <h4 className="text-xs font-bold text-foreground">{p.name}</h4>
                  <p className="text-[11px] text-text-secondary mt-0.5">{p.location}</p>
                  <span className="text-[10px] font-bold text-emerald-600">{p.promotionalIncentive}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-extrabold text-foreground block">{p.baseCommission}</span>
                  <span className="text-[10px] text-text-muted">{p.unitsAvailable} Units Left</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
